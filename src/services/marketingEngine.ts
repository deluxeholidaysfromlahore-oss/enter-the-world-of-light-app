import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import {
  AppFeatureItem,
  ScheduledMarketingSlot,
  MarketingSlotType,
  MarketingCampaignType,
  MarketingContentType,
  MarketingBlogPackage,
  MarketingShortPackage,
  DailyMarketingSummary,
} from '../types/marketing';
import { MASTER_APP_FEATURES_CATALOG } from '../data/appFeaturesCatalog';

// -----------------------------------------------------------------------------
// Dynamic Window Scheduling (Audience-Friendly Variable Time Generation)
// -----------------------------------------------------------------------------
export function generateDynamicWindowTime(dateStr: string, slot: MarketingSlotType): { timeString: string; label: string } {
  // Deterministic seed based on date string and slot to produce steady but varied times
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = (seed * 31 + dateStr.charCodeAt(i)) % 10000;
  }

  if (slot === 'morning') {
    // Window: 7:45 AM - 9:45 AM (120 min span)
    const offset = (seed + 17) % 115; // 0 to 114 minutes
    const totalMinutes = 7 * 60 + 45 + offset;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    return {
      timeString: `${hours}:${formattedMins} AM`,
      label: 'Morning Window (7:30 AM – 10:00 AM)',
    };
  }

  if (slot === 'afternoon') {
    // Window: 12:40 PM - 2:30 PM (110 min span)
    const offset = (seed + 43) % 105;
    const totalMinutes = 12 * 60 + 40 + offset;
    let hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const displayHour = hours > 12 ? hours - 12 : hours;
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    return {
      timeString: `${displayHour}:${formattedMins} PM`,
      label: 'Afternoon Window (12:30 PM – 3:00 PM)',
    };
  }

  // Evening Window: 6:40 PM - 8:35 PM (115 min span)
  const offset = (seed + 79) % 115;
  const totalMinutes = 6 * 60 + 40 + offset;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  return {
    timeString: `${hours}:${formattedMins} PM`,
    label: 'Evening Window (6:30 PM – 9:00 PM)',
  };
}

// -----------------------------------------------------------------------------
// Smart Random Rotation Engine (Anti-Duplicate, Kids Mode Weighted, New Feature Priority)
// -----------------------------------------------------------------------------
export function selectSmartRotationTrio(
  catalog: AppFeatureItem[],
  existingHistory: ScheduledMarketingSlot[],
  targetDateStr: string
): {
  morning: { feature: AppFeatureItem; campaignType: MarketingCampaignType; contentType: MarketingContentType };
  afternoon: { feature: AppFeatureItem; campaignType: MarketingCampaignType; contentType: MarketingContentType };
  evening: { feature: AppFeatureItem; campaignType: MarketingCampaignType; contentType: MarketingContentType };
} {
  // 1. Gather recent feature IDs from the last 3 days to avoid duplicate topics
  const recentFeatureIds = new Set<string>();
  existingHistory.forEach((item) => {
    recentFeatureIds.add(item.featureId);
  });

  // 2. Score and sort candidates
  const scoredCandidates = [...catalog].map((feat) => {
    let score = 0;

    // Highest priority for brand new or unpromoted features
    if (feat.status === 'new' || feat.promotionStats.totalPromotions === 0) {
      score += 100;
    }

    // Heavy weight for Kids Mode (Special Priority Requirement #2)
    if (feat.isKidsMode) {
      score += 35;
    }

    // Higher weight if it hasn't been promoted in a long time
    if (!feat.promotionStats.lastPromotedAt) {
      score += 50;
    } else {
      const daysSince = Math.max(
        0,
        (Date.now() - new Date(feat.promotionStats.lastPromotedAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      score += Math.min(daysSince * 5, 40);
    }

    // Penalize if promoted in recent cooldown window
    if (recentFeatureIds.has(feat.id)) {
      score -= 80;
    }

    // Add controlled pseudorandom noise for organic rotation
    const pseudoNoise = (feat.id.length * 7 + targetDateStr.charCodeAt(targetDateStr.length - 1)) % 15;
    score += pseudoNoise;

    return { feat, score };
  });

  scoredCandidates.sort((a, b) => b.score - a.score);

  // 3. Select 3 distinct features ensuring 3 DIFFERENT tabs for maximum breadth
  const selectedFeatures: AppFeatureItem[] = [];
  const usedTabs = new Set<string>();

  // Slot 1: Morning (Prefer Kids Mode or Top Scored Feature)
  for (const item of scoredCandidates) {
    if (!usedTabs.has(item.feat.tab)) {
      selectedFeatures.push(item.feat);
      usedTabs.add(item.feat.tab);
      break;
    }
  }

  // Slot 2: Afternoon (Secondary / Value-First Guide, different tab)
  for (const item of scoredCandidates) {
    if (!usedTabs.has(item.feat.tab)) {
      selectedFeatures.push(item.feat);
      usedTabs.add(item.feat.tab);
      break;
    }
  }

  // Slot 3: Evening (Different tab, high engagement)
  for (const item of scoredCandidates) {
    if (!usedTabs.has(item.feat.tab)) {
      selectedFeatures.push(item.feat);
      usedTabs.add(item.feat.tab);
      break;
    }
  }

  // Fallbacks if tab pool was constrained
  while (selectedFeatures.length < 3) {
    const fallback = scoredCandidates.find((c) => !selectedFeatures.some((s) => s.id === c.feat.id));
    if (fallback) {
      selectedFeatures.push(fallback.feat);
    } else {
      selectedFeatures.push(catalog[selectedFeatures.length % catalog.length]);
    }
  }

  // 4. Assign alternating Primary vs Secondary and intelligent Content Types
  // Morning = Primary ("What our AI app does / Capabilities")
  // Afternoon = Secondary ("Value-first tip / guide / prompt with soft CTA")
  // Evening = Rotating (Primary or Secondary based on date)
  const isEveningSecondary = targetDateStr.charCodeAt(targetDateStr.length - 1) % 2 === 0;

  const contentTypesMorning: MarketingContentType[] = [
    'Feature Explanation',
    'Kids Mode Article',
    'Product Update',
    'Feature Use Case',
  ];
  const contentTypesAfternoon: MarketingContentType[] = [
    'Useful Guide',
    'Free Resource',
    'How-To Article',
    'Educational Post',
  ];
  const contentTypesEvening: MarketingContentType[] = [
    'Tutorial',
    'App Tip',
    'Blog Article',
    'Educational Post',
  ];

  const morningContentType = selectedFeatures[0].isKidsMode
    ? 'Kids Mode Article'
    : contentTypesMorning[targetDateStr.length % contentTypesMorning.length];

  const afternoonContentType = contentTypesAfternoon[(targetDateStr.length + 1) % contentTypesAfternoon.length];
  const eveningContentType = contentTypesEvening[(targetDateStr.length + 2) % contentTypesEvening.length];

  return {
    morning: {
      feature: selectedFeatures[0],
      campaignType: 'primary',
      contentType: morningContentType,
    },
    afternoon: {
      feature: selectedFeatures[1],
      campaignType: 'secondary',
      contentType: afternoonContentType,
    },
    evening: {
      feature: selectedFeatures[2],
      campaignType: isEveningSecondary ? 'secondary' : 'primary',
      contentType: eveningContentType,
    },
  };
}

// -----------------------------------------------------------------------------
// Universal Blog Footer (White Box, Cross-Linking, Share & Join Us in Official Colors)
// -----------------------------------------------------------------------------
export function renderUniversalBlogFooter(
  isPrimary: boolean,
  topicTitle: string,
  appOrigin: string
): string {
  const masterBlogUrl = "https://entertheworldoflightandlaughter.blogspot.com";
  const encodedTitle = encodeURIComponent(topicTitle);
  const encodedUrl = encodeURIComponent(masterBlogUrl);

  const crossLinkBox = isPrimary
    ? `
  <!--⚡ INTER-LINKING: Link to Secondary Blog with Compelling CTR Hook-->
  <div style="background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%); border: 2px dashed #3b82f6; border-radius: 14px; padding: 20px 16px; margin-bottom: 24px; text-align: center;">
    <span style="background: #ef4444; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; display: inline-block;">🔥 EXCLUSIVE BONUS PART 2</span>
    <h3 style="color: #0f172a; font-size: 18px; font-weight: 800; line-height: 1.4; margin: 12px 0 8px 0;">
      ⚡ Dekhein Yeh Secret Feature Jo 90% Log Miss Kar Dete Hain: ${topicTitle} (Quick 60-Sec Quality Review &amp; Visual Breakdown)!
    </h3>
    <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 14px 0;">
      Agar aapne yeh step-by-step visual demonstration aur fast practical test nahi dekha to aap is feature ka asal faida nahi le sakenge!
    </p>
    <a href="${masterBlogUrl}/search/label/Secondary" target="_blank" style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 30px; display: inline-block; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);">
      👉 Click Here To Watch Quick Breakdown &rarr;
    </a>
  </div>
  `
    : `
  <!--⚡ INTER-LINKING: Link to Primary Master Blog with Compelling CTR Hook-->
  <div style="background: linear-gradient(135deg, #fefce8 0%, #eff6ff 100%); border: 2px dashed #f59e0b; border-radius: 14px; padding: 20px 16px; margin-bottom: 24px; text-align: center;">
    <span style="background: #16a34a; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; display: inline-block;">⭐ GOOGLE RECOMMENDED ORIGINAL MASTER</span>
    <h3 style="color: #0f172a; font-size: 18px; font-weight: 800; line-height: 1.4; margin: 12px 0 8px 0;">
      🏆 Must-Read Master Guide: ${topicTitle} (Complete In-Depth Curriculum &amp; Official Roadmap)!
    </h3>
    <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 14px 0;">
      Google Search Algorithms jisko #1 authentic primary source consider karte hain. Poori tehqeeq aur complete deep-dive abhi padhein!
    </p>
    <a href="${masterBlogUrl}/search/label/Primary" target="_blank" style="background: linear-gradient(135deg, #059669, #047857); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 30px; display: inline-block; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);">
      ⭐ Click Here For Full Master Guide &rarr;
    </a>
  </div>
  `;

  return `
<!--==================== WHITE BOX (INTER-LINKING, SHARE & JOIN US) ====================-->
<div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06); margin: 30px auto; max-width: 760px; padding: 26px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: center; color: #1e293b;">

  ${crossLinkBox}

  <!--📢 SHARE BUTTONS SECTION (Official Colors, No Phone Numbers)-->
  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-bottom: 24px;">
    <h4 style="color: #1e293b; font-size: 15px; font-weight: 700; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">
      📢 Share This Guide With Friends &amp; Family
    </h4>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center;">
      <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" style="background: #25D366; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        💬 WhatsApp
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" style="background: #1877F2; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📘 Facebook
      </a>
      <a href="https://instagram.com" target="_blank" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📸 Instagram
      </a>
      <a href="https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}" target="_blank" style="background: #BD081C; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📌 Pinterest
      </a>
      <a href="https://www.tiktok.com" target="_blank" style="background: #000000; color: #ffffff; border: 1px solid #333333; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        🎵 TikTok
      </a>
      <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" style="background: #000000; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        𝕏 Twitter
      </a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" style="background: #0A66C2; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        💼 LinkedIn
      </a>
      <a href="https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}" target="_blank" style="background: #229ED9; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        ✈️ Telegram
      </a>
      <a href="https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}" target="_blank" style="background: #FF4500; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        🔥 Reddit
      </a>
    </div>
  </div>

  <!--🌟 JOIN US / OFFICIAL COMMUNITY CHANNELS SECTION (Official Colors)-->
  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
    <h4 style="color: #0f172a; font-size: 16px; font-weight: 800; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">
      ✨ Join Us &amp; Stay Connected
    </h4>
    <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: center;">
      <a href="https://www.youtube.com/@EntertheWorldofLight?sub_confirmation=1" target="_blank" style="background: #FF0000; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        ▶️ YouTube
      </a>
      <a href="https://whatsapp.com/channel/0029Vaexample" target="_blank" style="background: #25D366; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        🟢 WhatsApp Channel
      </a>
      <a href="${appOrigin}/?utm_source=blogger_footer&utm_medium=join_us_btn" target="_blank" style="background: linear-gradient(135deg, #4F46E5, #06B6D4); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        🌐 Web App (Live)
      </a>
      <a href="https://facebook.com/EnterTheWorldOfLight" target="_blank" style="background: #1877F2; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📘 Facebook
      </a>
      <a href="https://instagram.com/EnterTheWorldOfLight" target="_blank" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📸 Instagram
      </a>
      <a href="https://tiktok.com/@EnterTheWorldOfLight" target="_blank" style="background: #000000; color: #ffffff; border: 1px solid #333333; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        🎵 TikTok
      </a>
      <a href="https://pinterest.com/EnterTheWorldOfLight" target="_blank" style="background: #BD081C; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📌 Pinterest
      </a>
      <a href="https://twitter.com/WorldOfLightApp" target="_blank" style="background: #000000; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        𝕏 Twitter
      </a>
      <a href="https://t.me/EnterTheWorldOfLight" target="_blank" style="background: #229ED9; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        ✈️ Telegram
      </a>
    </div>
  </div>

</div>
<!--==================== END WHITE BOX ====================-->
  `.trim();
}

// -----------------------------------------------------------------------------
// Real Production Content Package Generator (Blogger HTML + 60-Sec Short Script)
// -----------------------------------------------------------------------------
export async function generateContentPackage(
  feature: AppFeatureItem,
  campaignType: MarketingCampaignType,
  contentType: MarketingContentType,
  slot: MarketingSlotType,
  windowTime: string
): Promise<{ blog: MarketingBlogPackage; short: MarketingShortPackage }> {
  const contentId = `marketing-${Date.now()}-${feature.id}`;
  const shortId = `short-${Date.now()}-${feature.id.replace('feat-', '')}`;
  const masterBlogUrl = 'https://entertheworldoflightandlaughter.blogspot.com';
  const appDevUrl = 'https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app';

  // Primary vs Secondary Angle
  const isPrimary = campaignType === 'primary';
  const hook = isPrimary ? feature.primaryHook : feature.secondaryHook;

  // Title generation
  const title = isPrimary
    ? `${feature.functionName}: How Enter the World of Light & Laughter Empowers Modern Learning`
    : `${feature.marketingAngle} | Practical Guide & Free Resource`;

  const titleUrdu = feature.isKidsMode
    ? 'بچوں کے لیے محفوظ اور ہوشمند تعلیمی دنیا'
    : 'علم و ادب اور ہوشمند سیکھنے کا آسان راستہ';

  const slug = `${feature.id.replace('feat-', '')}-${campaignType}-${Date.now().toString().slice(-4)}`;

  // Labels for Blogger 2026 Master Blog Organization
  const labels = [
    isPrimary ? 'Primary' : 'Secondary',
    feature.isKidsMode ? 'Kids Mode' : 'General',
    feature.tabName,
    contentType,
    'Google 2026',
    'YouTube Shorts',
  ];

  // 1. YouTube Short Script (60-Seconds Format: Hook, Value, Climax, CTA)
  const shortScript = `
[0:00 - 0:05] HOOK:
"${hook}"

[0:05 - 0:25] THE VALUE & DEMONSTRATION:
${feature.description}
Designed specifically for ${feature.targetAudience}, this makes learning effortless and fun.

[0:25 - 0:45] WHY IT MATTERS (KEY TAKEAWAY):
${feature.marketingAngle}

[0:45 - 0:55] CROSS-POLLINATION (BLOG & APP):
Read the full step-by-step master guide and get free resources on our blog: ${masterBlogUrl}

[0:55 - 1:00] CALL TO ACTION:
Open Enter the World of Light & Laughter today — Learn, Play, Practice, and Explore!
`.trim();

  const shortTitle = `${feature.functionName} | 60-Sec Quick Guide #Shorts`;
  const shortDescription = `${feature.description}\n\n📖 Read Full Blog Post: ${masterBlogUrl}\n🚀 Try the Live App: ${appDevUrl}/?screen=${feature.tab}\n\n#Shorts #Learning #Education #UrduPoetry #KidsLearning #EnterTheWorldOfLight`;
  const shortHashtags = ['#Shorts', '#EnterTheWorldOfLight', `#${feature.tabName.replace(/\s+/g, '')}`, '#Education', '#KidsLearning'];
  const videoId = 'z3PGTXQW7yU'; // Default/Master short ID

  // 2. Exact Google-Approved Blogger HTML (Primary vs Secondary Templates)
  const primaryKeywordsTop = `
youtube shorts learning review, youtube trending educational shorts pakistan, top viral learning shorts,
urdu learning shorts 2026, bilingual education shorts video, trending kids learning shorts,
classical urdu poetry 2026 pakistan, educational web app review blog, enter the world of light viral short,
youtube shorts algorithm pakistan, shorts learning series 2026, pakistan education trending video
  `.trim();

  const primaryKeywordsBottom = `
best educational app for kids 2026 pakistan, classical urdu poetry study guide blog,
enter the world of light and laughter feature review, bilingual learning ideas 2026,
interactive urdu tracing app high quality, top trending learning games pakistan 2026,
kids safe educational portal review, moral bedtime stories for children pakistan,
viral educational short 2026, urdu poetry blogger pakistan,
youtube shorts learning ideas, trending educational app 2026
  `.trim();

  const secondaryKeywordsTop = `
youtube shorts educational review, youtube trending shorts pakistan, top viral shorts learning, kids portal shorts review 2026, educational web app shorts video, trending learning shorts for students, classical urdu poetry 2026 pakistan, learning app review blog, premium educational viral short, youtube shorts algorithm pakistan, shorts education haul 2026, pakistan learning trending video, enter the world of light full review 2026, trending kids shorts for parents, pakistan educational app latest update, youtube shorts learning analysis in urdu, latest learning games for kids pakistan
  `.trim();

  const secondaryKeywordsBottom = `
best learning app for students 2026 pakistan, educational lifestyle review blog, enter the world of light learning review, elegant poetry styling ideas 2026, bilingual urdu learning premium quality, top trending educational games pakistan 2026, lightweight learning app review, free premium learning tools pakistan, daily study routine for students, viral educational design 2026, educational blogger pakistan content, youtube shorts learning ideas, 2026 educational trends for Pakistani audience, app feature close-up details, educational blogger pakistan guide, viral learning video explanation, enter the world of light premium features review
  `.trim();

  let contentHtml = '';

  if (isPrimary) {
    // Exact Primary Code Architecture
    contentHtml = `
<!--==================== MAIN BLOG – PRIMARY CONTENT FOR GOOGLE ====================-->

<!--🟢 STRONG MAIN BLOG SIGNAL (Google Only)-->
<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">
This is the MAIN BLOG for the ${feature.functionName} YouTube Short and Web App Module.
This is the original primary article for Google Indexing.
All other posts linking to this are secondary versions.
Google should treat this page as the main source of content.
</div>

<!--🟢 TOP SEO KEYWORDS (High Ranking – Hidden)-->
<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">
${primaryKeywordsTop}
</div>

<!--🟢 BOTTOM SEO KEYWORDS (Long Tail – Hidden)-->
<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">
${primaryKeywordsBottom}
</div>

<p><strong>Enter the World of Light &amp; Laughter</strong> – ${feature.functionName} Me Kya Khususi Dikhaya Gaya? (${feature.tabName} 2026)</p>

<!--📺 Embed YouTube Short-->
<div style="margin: 20px auto; max-width: 480px; text-align: center;">
<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" frameborder="0" height="849" referrerpolicy="strict-origin-when-cross-origin" src="https://www.youtube.com/embed/${videoId}" style="aspect-ratio: 9/16; border-radius: 12px; width: 100%; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" title="${title}">
</iframe>

<!--🔔 Subscribe Button-->
<a href="https://www.youtube.com/@EntertheWorldofLight" style="background: red; border-radius: 25px; color: white; display: inline-block; font-weight: bold; margin-top: 12px; padding: 12px 24px; text-decoration: none;" target="_blank">
🔔 Subscribe to @EntertheWorldofLight
</a>
</div>

<!--===============================================-->
<!--📌 Main Description (Visible Content)-->

<p>Aaj ke blog me hum baat kar rahe hain <strong>Enter the World of Light &amp; Laughter</strong> ke naye YouTube Short aur Web App feature ke baare me, jisme <strong>${feature.functionName}</strong> (${feature.tabName}) ko showcase kiya gaya hai. Yeh feature un تمام users ke liye perfect hai jo Google ya YouTube par “bilingual learning app” ya “kids safe Urdu education” search karte hain.</p>

<p>${feature.description}</p>

<p>Enter the World of Light &amp; Laughter ka yeh digital module mobile aur computer dono par seamlessly match hota hai — is liye Google search me “best educational app 2026 Pakistan” jese keywords par yeh bohot rank kar raha hai.</p>

<p>Agar aap bilingual education, classical poetry, brain games, ya trending YouTube Shorts me interest rakhte hain, to yeh feature aap ke liye best inspiration aur practical learning playground hai.</p>

<!--===============================================-->
<!--🔗 Related Post (SECONDARY BLOG LINK)-->
<div style="background: linear-gradient(90deg, #0284c7, #4f46e5); border-radius: 10px; color: white; font-weight: bold; margin-top: 25px; padding: 14px; text-align: center;">
✨ ${feature.functionName} – Interactive Web App Access &amp; In-Depth Guide  
<br />
<a href="${appDevUrl}/?screen=${feature.tab}" style="background: white; border-radius: 8px; color: #0f172a; display: inline-block; font-weight: 700; margin-top: 8px; padding: 8px 20px; text-decoration: none;" target="_blank">
🚀 Launch in App Here &rarr;
</a>
</div>

<!--===============================================-->
<!--About Box-->
<div style="background: rgb(240, 249, 255); border-radius: 12px; border: 1px solid #bae6fd; line-height: 1.6; margin-top: 25px; padding: 18px;">
<h3 style="color: #0369a1; margin-top: 0;">🎬 About Enter the World of Light &amp; Laughter</h3>
<p><strong>Enter the World of Light &amp; Laughter</strong> brings you daily wisdom, bilingual education, classical Urdu poetry, moral bedtime tales, and engaging brain games!</p>
<ul>
<li>${feature.isKidsMode ? '100% child-safe, ad-free screen time with Urdu Haroof tracing' : 'Verified classical Urdu couplets with authentic Noto Nastaliq calligraphy'}</li>
<li>Bilingual English &amp; Urdu language mastery with real-time feedback</li>
<li>Daily creative shorts &amp; wisdom nuggets</li>
</ul>
</div>

${renderUniversalBlogFooter(true, title, appDevUrl)}

<!--🟢 Final Hidden SEO Layer (Google Only)-->
<div style="display: none;">
main blog source, ${feature.functionName} 2026 full review, youtube shorts main content, enter the world of light primary blog, educational learning Pakistan trending search
</div>

<!--Auto Hashtags-->
<p style="color: #555555; font-size: 13px; margin-top: 15px;">
#EnterTheWorldOfLight #${feature.tabName.replace(/\s+/g, '')} #BilingualLearning #KidsEducation #UrduPoetry
</p>

<!--🟢 SCHEMA OR JSON-LD (100% ERROR FREE)-->
<b:if cond="data:view.isHomepage == false">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "${title.replace(/"/g, '\\"')}",
  "description": "${feature.description.replace(/"/g, '\\"')}",
  "thumbnailUrl": "https://img.youtube.com/vi/${videoId}/hqdefault.jpg",
  "uploadDate": "${new Date().toISOString()}",
  "duration": "PT60S",
  "embedUrl": "https://www.youtube.com/embed/${videoId}",
  "contentUrl": "https://youtube.com/shorts/${videoId}",
  "url": "https://entertheworldoflightandlaughter.blogspot.com/",
  "publisher": {
    "@type": "Organization",
    "name": "Enter the World of Light & Laughter",
    "logo": {
      "@type": "ImageObject",
      "url": "https://img.youtube.com/vi/${videoId}/hqdefault.jpg"
    }
  }
}
</script>
</b:if>

<!--==================== END MAIN BLOG ====================-->
`.trim();
  } else {
    // Exact Secondary Code Architecture
    contentHtml = `
<!--✅ START: Video Preview Link Template-->
<div style="margin: 20px auto; max-width: 440px; text-align: center;">

  <!--🕵️ TOP Hidden SEO Keywords (Google Index Visible, Public Hidden)-->
  <div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">
    ${secondaryKeywordsTop}
  </div>

  <!--🎬 Title-->
  <h1 style="color: #222222; font-size: 17px; line-height: 1.4; margin: 10px 0px; font-weight: 800;">
    ✨ Enter the World of Light &amp; Laughter ka ${feature.functionName} – Complete Look, Quality Review &amp; Learning Guide (2026 Education) ✨
  </h1>
  
  <!--🎥 Thumbnail Preview-->
  <a href="${appDevUrl}/?screen=${feature.tab}" style="text-decoration: none;" target="_blank">
    <img alt="${feature.functionName} Video Guide" src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" style="border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 6px; width: 100%;" />
  </a>

  <!--🔗 Watch Button-->
  <a href="https://youtube.com/shorts/${videoId}" style="background: rgb(255, 0, 0); border-radius: 25px; color: white; display: inline-block; font-weight: bold; margin-top: 10px; padding: 8px 18px; text-decoration: none;" target="_blank">
     ▶ Watch on YouTube
  </a>

</div>
<span><!--more--></span>

<div style="margin: 20px auto; max-width: 680px; text-align: left; line-height: 1.8; color: #1e293b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<p><strong>Introduction</strong></p>

<p>Aaj ke blog me main aapko detail me batane wala hoon ke <strong>Enter the World of Light &amp; Laughter ka latest ${feature.functionName}</strong> kyun 2026 ke students aur parents ka favorite educational hub ban raha hai.</p>

<p>Jo log Google ya YouTube par search karte hain:  
<strong>“bilingual learning 2026”, “trending kids education app”, “classical urdu poetry online”</strong> —  
un sab ke liye yeh blog complete information provide karega.</p>

<h3>🌟 ${feature.functionName} – Key Capabilities &amp; Design</h3>
<p>${feature.description}</p>

<ul style="text-align: left;">
  <li>100% Ad-Free &amp; safe user interface</li>
  <li>Bilingual Urdu &amp; English interactive lessons</li>
  <li>Cognitive memory &amp; practice drills</li>
  <li>Works smoothly on all smartphones and laptops</li>
</ul>

<p>Sab ke saath perfectly blend ho jata hai.</p>

<h3>💎 Everyday Value &amp; Comfort</h3>
<p>App me enter hote hi sabse pehle jo feel aati hai woh hai clean focus aur distraction-free simplicity.  
${feature.marketingAngle}</p>

<h3>💠 Quality &amp; Pedagogical Excellence</h3>
<ul style="text-align: left;">
  <li>Verified authentic curriculum</li>
  <li>Noto Nastaliq Urdu script rendering</li>
  <li>Interactive scoring aur positive reinforcement</li>
  <li>Daily practice + deep learning dono ke liye perfect</li>
</ul>

<h3>🎀 How to Practice &amp; Get Started</h3>
<p>Yeh module single click me aapki learning journey ko complete kar deta hai:</p>

<ul style="text-align: left;">
  <li>Web app launch karein aur <strong>${feature.tabName}</strong> select karein</li>
  <li>Daily streaks complete karke star points earn karein</li>
  <li>Mobile aur desktop dono devices par use karein</li>
</ul>

<h3>🎥 Video Demonstration Available</h3>
<p>Agar aap is feature ka actual close-up, working test, aur audio pronunciation dekhna chahte hain:</p>

<p>👉 YouTube Short video already upload ho chuki hai!<br />
Aap yahan dekh sakte hain:</p>

<p><a href="${masterBlogUrl}" target="_blank"><strong>📌 Official Master Blog (Video Included)</strong></a></p>
<p><a href="${appDevUrl}/?screen=${feature.tab}" target="_blank" style="display: inline-block; background: #0284c7; color: white; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; margin-top: 8px;"><strong>🚀 Try ${feature.functionName} Live in Web App &rarr;</strong></a></p>

<h3>✨ Conclusion</h3>
<p>Agar aap ek hi platform me cultural wisdom, bilingual literacy, fun brain games aur 2026 ki modern technology chahte hain — to Enter the World of Light &amp; Laughter ka yeh feature **definitely worth it** hai.</p>

<hr />

<!--🔥 BOTTOM SEO Keywords (Different + Hidden)-->
<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">
  ${secondaryKeywordsBottom}
</div>

${renderUniversalBlogFooter(false, title, appDevUrl)}

<!--==================== STRUCTURED DATA ====================-->
<b:if cond="data:view.isHomepage == false">
<script id="videoSchema" type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "${title.replace(/"/g, '\\"')}",
  "description": "${feature.description.replace(/"/g, '\\"')}",
  "thumbnailUrl": "https://img.youtube.com/vi/${videoId}/hqdefault.jpg",
  "uploadDate": "",
  "duration": "PT1M00S",
  "contentUrl": "https://youtube.com/shorts/${videoId}",
  "embedUrl": "https://www.youtube.com/embed/${videoId}",
  "publisher": {
    "@type": "Organization",
    "name": "Enter the World of Light & Laughter",
    "logo": {
      "@type": "ImageObject",
      "url": "https://img.youtube.com/vi/${videoId}/hqdefault.jpg"
    }
  }
}
</script>

<script>
(function(){
  const schema=document.getElementById("videoSchema");
  const data=JSON.parse(schema.textContent);
  const now=new Date();
  const offset=now.getTimezoneOffset();
  const sign=offset<=0?'+':'-';
  const pad=n=>String(Math.floor(Math.abs(n))).padStart(2,'0');
  const tzHours=pad(offset/-60);
  const tzMinutes=pad(offset%60);
  const isoDate=now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate())+'T'+pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds())+sign+tzHours+':'+tzMinutes;
  data.uploadDate=isoDate;
  schema.textContent=JSON.stringify(data,null,2);
})();
</script>
</b:if>
<!--✅ END-->
</div>
`.trim();
  }

  const blogPackage: MarketingBlogPackage = {
    contentId,
    title,
    titleUrdu,
    slug,
    contentType,
    summary: `${feature.functionName}: ${feature.description}`,
    contentHtml,
    labels,
    bloggerUrl: `${masterBlogUrl}/${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${slug}.html`,
    publishedAt: new Date().toISOString(),
    relatedShortId: shortId,
    relatedFeatureId: feature.id,
    campaignType,
  };

  const shortPackage: MarketingShortPackage = {
    shortId,
    title: shortTitle,
    script: shortScript,
    description: shortDescription,
    hashtags: shortHashtags,
    durationEstimateSeconds: 58,
    status: 'draft',
    relatedBlogId: contentId,
    relatedFeatureId: feature.id,
    campaignType,
  };

  return { blog: blogPackage, short: shortPackage };
}

// -----------------------------------------------------------------------------
// Firestore Database Operations (Master Feature DB, Calendar & Daily Summary)
// -----------------------------------------------------------------------------

export async function fetchFeaturesMasterList(): Promise<AppFeatureItem[]> {
  try {
    const colRef = collection(db, 'marketingFeatures');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => d.data() as AppFeatureItem);
      return items;
    }
  } catch (err) {
    console.warn('Could not read from Firestore marketingFeatures, seeding from master catalog:', err);
  }

  // Seed default catalog to Firestore in background
  seedMasterCatalogToFirestore(MASTER_APP_FEATURES_CATALOG).catch(() => {});
  return MASTER_APP_FEATURES_CATALOG;
}

export async function seedMasterCatalogToFirestore(features: AppFeatureItem[]): Promise<void> {
  for (const feat of features) {
    try {
      const docRef = doc(db, 'marketingFeatures', feat.id);
      await setDoc(docRef, feat, { merge: true });
    } catch {
      // ignore seed errors
    }
  }
}

export async function saveAppFeature(feature: AppFeatureItem): Promise<void> {
  const docRef = doc(db, 'marketingFeatures', feature.id);
  await setDoc(docRef, feature, { merge: true });
}

export async function fetchMarketingCalendar(): Promise<ScheduledMarketingSlot[]> {
  try {
    const colRef = collection(db, 'marketingCalendar');
    const q = query(colRef, orderBy('date', 'desc'), limit(30));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => d.data() as ScheduledMarketingSlot);
    }
  } catch (err) {
    console.warn('Could not fetch marketing calendar from firestore:', err);
  }
  return [];
}

export async function saveScheduledSlot(slot: ScheduledMarketingSlot): Promise<void> {
  try {
    const docRef = doc(db, 'marketingCalendar', slot.id);
    await setDoc(docRef, slot, { merge: true });

    // Also update feature promotion stats
    const featureRef = doc(db, 'marketingFeatures', slot.featureId);
    const featSnap = await getDoc(featureRef);
    if (featSnap.exists()) {
      const current = featSnap.data() as AppFeatureItem;
      const stats = current.promotionStats || {
        totalPromotions: 0,
        lastPromotedAt: null,
        blogsCount: 0,
        shortsCount: 0,
        primaryCount: 0,
        secondaryCount: 0,
        nextEligibleDate: '',
      };

      stats.totalPromotions += 1;
      stats.lastPromotedAt = new Date().toISOString();
      stats.blogsCount += 1;
      stats.shortsCount += 1;
      if (slot.campaignType === 'primary') stats.primaryCount += 1;
      else stats.secondaryCount += 1;

      // Next eligible in 3 days
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 3);
      stats.nextEligibleDate = nextDate.toISOString().split('T')[0];

      await updateDoc(featureRef, {
        promotionStats: stats,
        status: 'active', // If was new, now promoted
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn('Error saving scheduled slot to Firestore:', err);
  }
}

export async function getDailyMarketingSummary(
  targetDateStr: string = new Date().toISOString().split('T')[0]
): Promise<DailyMarketingSummary> {
  const allFeatures = await fetchFeaturesMasterList();
  const calendar = await fetchMarketingCalendar();

  const todaySlots = calendar.filter((s) => s.date === targetDateStr);
  const publishedSlots = todaySlots.filter((s) => s.status === 'published');
  const scheduledSlots = todaySlots.filter((s) => s.status === 'scheduled' || s.status === 'generated');

  const newFeaturesCount = allFeatures.filter((f) => f.status === 'new').length;
  const pendingPromotionsCount = allFeatures.filter((f) => f.promotionStats.totalPromotions === 0).length;

  return {
    date: targetDateStr,
    totalSlotsToday: 3,
    publishedSlotsToday: publishedSlots.length,
    scheduledSlotsToday: scheduledSlots.length,
    pendingSlotsToday: Math.max(0, 3 - publishedSlots.length - scheduledSlots.length),
    shortsGeneratedToday: todaySlots.filter((s) => s.shortPackage).length,
    shortsUploadedToday: todaySlots.filter((s) => s.shortPackage?.status === 'uploaded').length,
    kidsModePriorityStatus: 'High Priority (Weighted 35% in Smart Rotation Pool)',
    kidsModePercentage: 35,
    newFeaturesCount,
    pendingPromotionsCount,
  };
}
