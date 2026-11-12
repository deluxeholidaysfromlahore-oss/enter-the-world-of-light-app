import re

server_code = open("server.ts").read()

# Locate app.get("/api/marketing/next-post-for-blogger", ...)
start_marker = 'app.get("/api/marketing/next-post-for-blogger", (req, res) => {'
end_marker = 'res.json({\n    title,\n    track,\n    campaignType: isSecondary ? "secondary" : "primary",\n    postType: isPage ? "PAGE" : "POST",\n    slot: currentSlot,\n    labels,\n    targetBlogId,\n    content,\n    videoId,\n    isOppositeCycle: !isEvenDay,\n    generatedAt: new Date().toISOString(),\n  });\n});'

start_idx = server_code.find(start_marker)
if start_idx == -1:
    print("Could not find start_marker!")
    exit(1)

# Find the end of this handler
handler_end_pattern = r'res\.json\(\{\s+title,\s+track,[\s\S]+?\}\);\s*\}\);'
m = re.search(handler_end_pattern, server_code[start_idx:])
if not m:
    print("Could not find end of handler!")
    exit(1)

end_idx = start_idx + m.end()

new_handler = r'''app.get("/api/marketing/next-post-for-blogger", (req, res) => {
  const slotParam = ((req.query.slot as string) || "morning").toLowerCase();
  const typeParam = ((req.query.type as string) || "").toLowerCase();
  const formatParam = ((req.query.format as string) || "").toLowerCase();
  const targetParam = ((req.query.target as string) || "").toLowerCase(); // "primary_post", "primary_page", "secondary_post", "secondary_page"

  let currentSlot = "morning";
  if (slotParam === "afternoon") {
    currentSlot = "afternoon";
  } else if (slotParam === "evening") {
    currentSlot = "evening";
  } else {
    currentSlot = "morning";
  }

  // Determine Track:
  // Primary Blog ID: 5550406854147347257 (App Hub)
  // Secondary Blog ID: 3870971020533851761 (Kids Mode)
  const PRIMARY_BLOG_ID = "5550406854147347257";
  const SECONDARY_BLOG_ID = "3870971020533851761";

  let track: "primary_post" | "primary_page" | "secondary_post" | "secondary_page" = "primary_post";
  if (targetParam === "primary_post" || targetParam === "primary_page" || targetParam === "secondary_post" || targetParam === "secondary_page") {
    track = targetParam;
  } else if (typeParam === "secondary") {
    track = formatParam === "page" ? "secondary_page" : "secondary_post";
  } else if (typeParam === "primary") {
    track = formatParam === "page" ? "primary_page" : "primary_post";
  } else {
    track = currentSlot === "morning" ? "primary_post" : (currentSlot === "afternoon" ? "secondary_post" : "secondary_page");
  }

  const isPage = track === "primary_page" || track === "secondary_page";
  const isSecondary = track === "secondary_post" || track === "secondary_page";
  const targetBlogId = isSecondary ? SECONDARY_BLOG_ID : PRIMARY_BLOG_ID;
  const appDevUrl = "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app";
  const masterBlogUrl = isSecondary 
    ? "https://www.blogger.com/blog/pages/3870971020533851761"
    : "https://entertheworldoflightandlaughter.blogspot.com";

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const isEvenDay = dayOfYear % 2 === 0;

  // Manifest inspection for YouTube video embedding
  const manifest = getLocalManifest();
  const uploadedWithYt = manifest.filter((m: any) => m.youtubeVideoId && m.youtubeVideoId.length > 5);
  const featuredShort = uploadedWithYt.length > 0 
    ? uploadedWithYt[uploadedWithYt.length - 1] 
    : (manifest.find((m: any) => m.topicSlug === "short_animal_lion") || manifest[0]);
  const videoId = (featuredShort as any)?.youtubeVideoId || "z3PGTXQW7yU";
  const shortTitle = (featuredShort as any)?.youtubeSeoTitle || featuredShort?.topic || "Kids Fun Educational Short";

  let title = "";
  let content = "";
  let labels: string[] = [];

  // Hosted Brand Logos & Featured Image Thumbnails
  const brandLogoUrl = isSecondary
    ? `${appDevUrl}/storage/brand_logo_kids.svg`
    : `${appDevUrl}/storage/brand_logo.svg`;

  const featuredThumbUrl = isSecondary
    ? `${appDevUrl}/storage/kids_videos/short_a_apple_thumb.jpg`
    : `${appDevUrl}/storage/promo_videos/promo_kids_mode_launch_thumb.jpg`;

  if (track === "primary_post") {
    // -------------------------------------------------------------------------
    // TRACK 1: PRIMARY 1 (App Hub Blog Post) - High Fashion App Design
    // -------------------------------------------------------------------------
    const featureTopic = isEvenDay 
      ? "Interactive Bilingual Learning & Urdu Haroof Tracing Engine"
      : "Classical Urdu Poetry Explorer & Interactive Mind Gym";
    const featureSubtitle = isEvenDay
      ? "Child-safe AI companion Sunny, instant haptic stroke tracing & bilingual phonetics"
      : "Allama Iqbal, Faiz Ahmad Faiz, Mirza Ghalib recitations, Tashreeh & cognitive puzzles";

    title = `${featureTopic} – Enter the World of Light & Laughter (${currentSlot.toUpperCase()} 2026 Edition)`;
    labels = ["Web App Hub", "App Features", "Urdu Learning", "Bilingual Education", "Google 2026"];

    content = `
<!--==================== PRIMARY 1: APP HUB BLOG POST ====================-->
<div style="background-color: #ffffff !important; color: #0f172a !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; line-height: 1.8; max-width: 820px; margin: 0 auto; padding: 26px 20px; border-radius: 20px; box-shadow: 0 10px 35px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; text-align: left;">

  <!--Google Indexing Signal-->
  <div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">
    Official Web App Feature Spotlight: "${featureTopic}". Slot: ${currentSlot.toUpperCase()} (Primary App Hub Syndication).
    Published by Enter the World of Light & Laughter. Bilingual English & Urdu educational web portal.
  </div>

  <!--🌟 1. OFFICIAL BRAND LOGO BANNER (Real SVG Image)-->
  <div style="margin: 0 auto 20px auto; text-align: center;">
    <a href="${appDevUrl}/?utm_source=blogger_brand_logo&utm_medium=banner" target="_blank" style="display: block; text-decoration: none;">
      <img src="${brandLogoUrl}" alt="Enter the World of Light &amp; Laughter Official Hub" style="width: 100%; max-width: 800px; height: auto; border-radius: 16px; display: block; margin: 0 auto; box-shadow: 0 8px 24px rgba(2,132,199,0.2);" />
    </a>
  </div>

  <!--🌟 2. FEATURED IMAGE (Real JPEG Image for Blogger Homepage & Google Thumbnail)-->
  <div style="margin: 0 auto 22px auto; text-align: center;">
    <img src="${featuredThumbUrl}" alt="${featureTopic}" style="width: 100%; max-width: 780px; height: auto; max-height: 440px; object-fit: cover; border-radius: 16px; display: block; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.12);" />
  </div>

  <!--🌟 3. SLOT & CATEGORY PILL BADGES-->
  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; align-items: center;">
    <span style="background: linear-gradient(135deg, #0284c7, #2563eb); color: #ffffff !important; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
      🚀 OFFICIAL WEB APP SPOTLIGHT | ${currentSlot.toUpperCase()} 2026
    </span>
    <span style="background: #e0f2fe; color: #0369a1 !important; font-size: 11px; font-weight: 800; padding: 6px 12px; border-radius: 20px;">
      ✨ ZERO ADS • LIVE IN BROWSER
    </span>
  </div>

  <h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.35; font-weight: 900; margin: 10px 0 12px 0;">
    ${title}
  </h1>
  <p style="color: #475569 !important; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
    <strong>Enter the World of Light &amp; Laughter</strong> – ${featureSubtitle}
  </p>

  <!--🌟 4. HERO SPOTLIGHT CARD (App Style Gradient & Launch Buttons)-->
  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 18px; padding: 26px 22px; color: #ffffff !important; margin: 24px 0; box-shadow: 0 12px 30px rgba(15,23,42,0.22); border: 1px solid #334155;">
    <div style="display: inline-block; background: #38bdf8; color: #0f172a !important; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 12px;">
      🌟 Live Web App Interactive Experience
    </div>
    <h2 style="color: #ffffff !important; font-size: 22px; margin: 0 0 12px 0; line-height: 1.4; font-weight: 800;">
      ${featureTopic}
    </h2>
    <p style="color: #cbd5e1 !important; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">
      Hamari official web application me ab bilkul naye interactive features live ho chuke hain jo Pakistan aur worldwide users ko direct browser se high-speed bilingual learning provide karte hain. Zero lag, zero installation!
    </p>
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <a href="${appDevUrl}/?utm_source=blogger_primary1&utm_medium=blog_post" target="_blank" style="background: #38bdf8; color: #0f172a !important; text-decoration: none; font-weight: 800; padding: 12px 24px; border-radius: 10px; font-size: 14px; display: inline-block; box-shadow: 0 4px 14px rgba(56, 189, 248, 0.4);">
        🚀 Launch Web App Now &rarr;
      </a>
      <a href="https://www.youtube.com/@EntertheWorldofLight?sub_confirmation=1" target="_blank" style="background: #ef4444; color: #ffffff !important; text-decoration: none; font-weight: 700; padding: 12px 24px; border-radius: 10px; font-size: 14px; display: inline-block;">
        ▶️ Watch on YouTube
      </a>
      <a href="https://whatsapp.com/channel/0029VasZV4a60eBd8TwfTg1f" target="_blank" style="background: #25D366; color: #ffffff !important; text-decoration: none; font-weight: 700; padding: 12px 24px; border-radius: 10px; font-size: 14px; display: inline-block;">
        🟢 WhatsApp Channel
      </a>
    </div>
  </div>

  <!--🌟 5. APP-THEMED 4 FEATURE SHOWCASE CARDS (Matching src/App.tsx)-->
  <h3 style="color: #0f172a !important; font-size: 21px; font-weight: 800; margin: 28px 0 16px 0;">
    📌 Web App Modules &amp; Daily Interactive Features (Theme Showcase)
  </h3>
  
  <div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 26px;">
    <!-- Option 1: Urdu Haroof Tracing -->
    <div style="background: #fffbeb; border: 2px solid #fde68a; border-radius: 14px; padding: 18px 20px; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.08);">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">
          ✍️
        </div>
        <div>
          <h4 style="color: #b45309 !important; margin: 0; font-size: 17px; font-weight: 800;">
            1. Urdu Haroof Tracing &amp; Phonics Engine
          </h4>
          <span style="font-size: 11px; font-weight: 700; color: #d97706; text-transform: uppercase;">Real-time Canvas Stroke Guide</span>
        </div>
      </div>
      <p style="margin: 0; color: #78350f !important; font-size: 14px; line-height: 1.6;">
        Alif, Bay, Pay se lay kar Yay tak har harf ki sahi talaffuz, animated finger tracing, haptic guidance aur instant visual appreciation.
      </p>
    </div>

    <!-- Option 2: Classical Urdu Adab -->
    <div style="background: #ecfdf5; border: 2px solid #a7f3d0; border-radius: 14px; padding: 18px 20px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.08);">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">
          📜
        </div>
        <div>
          <h4 style="color: #047857 !important; margin: 0; font-size: 17px; font-weight: 800;">
            2. Classical Urdu Adab &amp; Allama Iqbal Wisdom
          </h4>
          <span style="font-size: 11px; font-weight: 700; color: #059669; text-transform: uppercase;">Poetry, Tashreeh &amp; Philosophy</span>
        </div>
      </div>
      <p style="margin: 0; color: #064e3b !important; font-size: 14px; line-height: 1.6;">
        Allama Iqbal, Faiz Ahmad Faiz aur Mirza Ghalib ki hikmat se bharpoor shayeri with high-definition audio recitation aur aasan Urdu mafhoom.
      </p>
    </div>

    <!-- Option 3: Pixar 3D Kids World -->
    <div style="background: #fff1f2; border: 2px solid #fecdd3; border-radius: 14px; padding: 18px 20px; box-shadow: 0 4px 14px rgba(244, 63, 94, 0.08);">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #f43f5e, #be123c); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">
          🧸
        </div>
        <div>
          <h4 style="color: #be123c !important; margin: 0; font-size: 17px; font-weight: 800;">
            3. Pixar-Style 3D Animated Stories &amp; Moral Lessons
          </h4>
          <span style="font-size: 11px; font-weight: 700; color: #e11d48; text-transform: uppercase;">CGI Characters &amp; Bedtime Tales</span>
        </div>
      </div>
      <p style="margin: 0; color: #881337 !important; font-size: 14px; line-height: 1.6;">
        Cute 3D animal mascots, moral bedtime stories, dosti aur walidain ke adab ki pur-asar taleemat jo bache ki akhlaqi tarbiyat karti hain.
      </p>
    </div>

    <!-- Option 4: Mind Agility & Logic Gym -->
    <div style="background: #f0f9ff; border: 2px solid #bae6fd; border-radius: 14px; padding: 18px 20px; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.08);">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">
          ⚡
        </div>
        <div>
          <h4 style="color: #0369a1 !important; margin: 0; font-size: 17px; font-weight: 800;">
            4. Live Web App Simulator &amp; Mind Gym
          </h4>
          <span style="font-size: 11px; font-weight: 700; color: #0284c7; text-transform: uppercase;">Memory Puzzles &amp; Cognitive IQ</span>
        </div>
      </div>
      <p style="margin: 0; color: #0c4a6e !important; font-size: 14px; line-height: 1.6;">
        Hafiza tez karne wale pattern discovery tests, bilingual vocabulary quiz aur daily mind workouts jo dimagh ko sharp banate hain.
      </p>
    </div>
  </div>

  <!--🌟 6. EMBEDDED YOUTUBE PLAYER FOR THIS LESSON-->
  <div style="margin: 26px auto; max-width: 440px; text-align: center;">
    <h4 style="color: #0f172a !important; font-size: 16px; font-weight: 800; margin: 0 0 10px 0;">
      📺 Watch Educational Demonstration Short
    </h4>
    <div style="position: relative; width: 100%; aspect-ratio: 9/16; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.18); border: 2px solid #e2e8f0; background: #000;">
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" 
        title="${featureTopic}" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    </div>
    <div style="margin-top: 10px;">
      <a href="https://www.youtube.com/@EntertheWorldofLight?sub_confirmation=1" target="_blank" style="background: #ef4444; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 8px 18px; border-radius: 20px; display: inline-block;">
        🔔 Subscribe @EntertheWorldofLight
      </a>
    </div>
  </div>

  <!--🌟 7. UNIVERSAL FOOTER (Cross-Linking, Social Share, Join Us)-->
  ${renderUniversalBlogFooter(true, title, appDevUrl)}

</div>
<!--==================== END PRIMARY 1 BLOG POST ====================-->
    `.trim();

  } else if (track === "primary_page") {
    // -------------------------------------------------------------------------
    // TRACK 2: PRIMARY 2 (App Evergreen Pillar Guide & Syllabus)
    // -------------------------------------------------------------------------
    const pillarTitle = isEvenDay
      ? "Comprehensive Bilingual Learning Curriculum & Educational Roadmap"
      : "Classical Urdu Literature, Poetry Study Guide & Ethical Wisdom Pillar";

    title = `${pillarTitle} – Evergreen Educational Directory 2026`;
    labels = ["Curriculum Guide", "Pillar Page", "Evergreen", "App Directory"];

    content = `
<!--==================== PRIMARY 2: APP HUB BLOG PAGE ====================-->
<div style="background-color: #ffffff !important; color: #0f172a !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; line-height: 1.8; max-width: 820px; margin: 0 auto; padding: 26px 20px; border-radius: 20px; box-shadow: 0 10px 35px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; text-align: left;">

  <!--1. Brand Banner-->
  <div style="margin: 0 auto 20px auto; text-align: center;">
    <a href="${appDevUrl}/" target="_blank" style="display: block;">
      <img src="${brandLogoUrl}" alt="Enter the World of Light &amp; Laughter" style="width: 100%; max-width: 800px; height: auto; border-radius: 16px; display: block; margin: 0 auto; box-shadow: 0 8px 24px rgba(2,132,199,0.2);" />
    </a>
  </div>

  <!--2. Featured Thumbnail-->
  <div style="margin: 0 auto 22px auto; text-align: center;">
    <img src="${featuredThumbUrl}" alt="${pillarTitle}" style="width: 100%; max-width: 780px; height: auto; max-height: 440px; object-fit: cover; border-radius: 16px; display: block; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.12);" />
  </div>

  <!--Pillar Header-->
  <div style="border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px;">
    <span style="background: #e0f2fe; color: #0369a1 !important; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase;">
      📘 EVERGREEN RESOURCE PILLAR (PRIMARY 2)
    </span>
    <h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.3; margin: 12px 0 6px 0; font-weight: 900;">
      ${pillarTitle}
    </h1>
    <p style="color: #64748b !important; font-size: 15px; margin: 0;">Comprehensive syllabus breakdown provided by Enter the World of Light &amp; Laughter</p>
  </div>

  <h2>📌 Web App Me Kya Diya Jaa Raha Hai? (Complete Feature Breakdown)</h2>
  <p>
    Enter the World of Light &amp; Laughter web platform ka bunyadi maqsad talib-ilmo aur walidain ko ek standard, multi-disciplinary educational experience provide karna hai jo academic learning aur akhlaqi tarbiyat dono ko cover karta hai:
  </p>

  <div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin: 24px 0;">
    <div style="background: #fffbeb; border: 2px solid #fde68a; border-radius: 14px; padding: 18px 20px;">
      <h3 style="color: #b45309 !important; margin: 0 0 8px 0; font-size: 18px; font-weight: 800;">1. Bilingual Phonics &amp; Haroof Tracing Syllabus</h3>
      <p style="margin: 0; color: #78350f !important; font-size: 14px;">Urdu Alif-Bay-Pay se lay kar English A-to-Z tak har harf ki sahi talaffuz, visual stroke order aur visual flashcard association.</p>
    </div>
    <div style="background: #ecfdf5; border: 2px solid #a7f3d0; border-radius: 14px; padding: 18px 20px;">
      <h3 style="color: #047857 !important; margin: 0 0 8px 0; font-size: 18px; font-weight: 800;">2. Allama Iqbal &amp; Classical Wisdom Library</h3>
      <p style="margin: 0; color: #064e3b !important; font-size: 14px;">Bachon aur nojawano ke liye Allama Iqbal ki mashoor nazmein (Parinday ki faryad, Hamd, Khudi) with aasan Urdu tashreeh aur ethical reflections.</p>
    </div>
    <div style="background: #f0f9ff; border: 2px solid #bae6fd; border-radius: 14px; padding: 18px 20px;">
      <h3 style="color: #0369a1 !important; margin: 0 0 8px 0; font-size: 18px; font-weight: 800;">3. Cognitive Brain Quizzes &amp; Logical Puzzles</h3>
      <p style="margin: 0; color: #0c4a6e !important; font-size: 14px;">Memory matching, pattern discovery, math fundamentals (1 to 20), aur interactive puzzles jo IQ ko barhate hain.</p>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #059669, #047857); border-radius: 16px; padding: 24px; margin: 25px 0; text-align: center; color: #ffffff !important;">
    <h3 style="color: #ffffff !important; margin: 0 0 10px 0; font-size: 20px; font-weight: 800;">🚀 Practice the Complete Curriculum Inside the Web App</h3>
    <p style="color: #ecfdf5 !important; margin: 0 0 16px 0; font-size: 15px;">Tamam modules bina kisi download ya installation ke direct browser par live hain.</p>
    <a href="${appDevUrl}/?utm_source=blogger_primary2&utm_medium=pillar_page" target="_blank" style="background: #ffffff; color: #065f46 !important; text-decoration: none; font-weight: 800; padding: 12px 28px; border-radius: 10px; display: inline-block;">
      Open Full Interactive Syllabus &rarr;
    </a>
  </div>

  ${renderUniversalBlogFooter(false, title, appDevUrl)}
</div>
<!--==================== END PRIMARY 2 BLOG PAGE ====================-->
    `.trim();

  } else if (track === "secondary_post") {
    // -------------------------------------------------------------------------
    // TRACK 3: SECONDARY 1 (Kids Mode Blog Post)
    // -------------------------------------------------------------------------
    const kidsTopic = isEvenDay
      ? "Kids Mode: Urdu Haroof Tracing, Sunny AI Companion & Safe Fun"
      : "Kids Mode: Animal Sounds, Nature Discovery & Moral Bedtime Stories";
    const kidsSub = isEvenDay
      ? "Interactive finger tracing, phonics sounds, and 100% child-safe virtual companion"
      : "Forest animals, birds, moral storytelling and comforting bedtime tales for ages 2-8";

    title = `${kidsTopic} (${currentSlot.toUpperCase()} Edition 2026)`;
    labels = ["Kids Mode", "Kids Education", "Urdu Tracing", "Moral Stories", "Preschool Fun"];

    content = `
<!--==================== SECONDARY 1: KIDS MODE BLOG POST ====================-->
<div style="background-color: #ffffff !important; color: #0f172a !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; line-height: 1.8; max-width: 820px; margin: 0 auto; padding: 26px 20px; border-radius: 20px; box-shadow: 0 10px 35px rgba(0,0,0,0.08); border: 1px solid #fde68a; text-align: left;">

  <!--1. Brand Banner (Kids Edition)-->
  <div style="margin: 0 auto 20px auto; text-align: center;">
    <a href="${appDevUrl}/?screen=kids" target="_blank" style="display: block;">
      <img src="${brandLogoUrl}" alt="Enter the World of Light &amp; Laughter - Kids World" style="width: 100%; max-width: 800px; height: auto; border-radius: 16px; display: block; margin: 0 auto; box-shadow: 0 8px 24px rgba(245,158,11,0.25);" />
    </a>
  </div>

  <!--2. Featured Thumbnail-->
  <div style="margin: 0 auto 22px auto; text-align: center;">
    <img src="${featuredThumbUrl}" alt="${kidsTopic}" style="width: 100%; max-width: 780px; height: auto; max-height: 440px; object-fit: cover; border-radius: 16px; display: block; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.12);" />
  </div>

  <div style="margin-bottom: 12px;">
    <span style="background: linear-gradient(135deg, #f59e0b, #ef4444); color: #ffffff !important; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase;">
      🧸 KIDS MODE SPECIAL PORTAL | ${currentSlot.toUpperCase()} 2026
    </span>
  </div>

  <h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.3; margin: 10px 0; font-weight: 900;">
    🎈 ${title}
  </h1>
  <p style="color: #475569 !important; font-size: 16px;"><strong>Enter the World of Light &amp; Laughter (Kids Mode)</strong> – ${kidsSub}</p>

  <p>
    Kids Mode ko khas taur par chotay bachon (ages 2 to 8) ki dimaghi tarbiyat aur interactive seekhne ke liye design kiya gaya hai. Isme bacha boring ratta lagane ke bajaye khel khel me seekhta hai:
  </p>

  <!--Kids Feature Options-->
  <div style="background: #fffbeb; border: 2px solid #fde68a; border-radius: 16px; padding: 22px; margin: 20px 0;">
    <h3 style="color: #b45309 !important; margin: 0 0 14px 0; font-size: 19px; font-weight: 800;">🌟 Kids Mode Ke Key Features</h3>
    <ul style="margin: 0; padding-left: 20px; color: #78350f !important; line-height: 1.8;">
      <li><strong>Urdu Haroof-e-Tahajji:</strong> Alif, Bay, Pay ki animated tracing with cute cartoon sound effects.</li>
      <li><strong>English ABC Phonics:</strong> A for Apple se Z for Zebra tak clear audio pronunciation.</li>
      <li><strong>Sunny Companion:</strong> Bachon ka pyara dost Sunny jo har achi koshish par taalian bajata hai aur hausla afzai karta hai!</li>
      <li><strong>Moral Bedtime Stories:</strong> Sach bolne, dosti aur walidain ki khidmat ki pyari kahaniyan.</li>
    </ul>
  </div>

  <!--Launch Button-->
  <div style="background: linear-gradient(135deg, #f59e0b, #ef4444); border-radius: 16px; padding: 24px; text-align: center; color: white !important; margin: 25px 0;">
    <h3 style="color: #ffffff !important; margin: 0 0 8px 0; font-size: 20px; font-weight: 800;">🎉 Bachon Ke Liye Kids Mode Launch Karein</h3>
    <p style="color: #fef3c7 !important; margin: 0 0 16px 0; font-size: 15px;">Bina kisi ad ya subscription ke direct browser par live hai:</p>
    <a href="${appDevUrl}/?screen=kids&slot=${currentSlot}" target="_blank" style="background: #ffffff; color: #b45309 !important; text-decoration: none; font-weight: 800; padding: 12px 28px; border-radius: 10px; display: inline-block;">
      🚀 Launch Kids Mode Now &rarr;
    </a>
  </div>

  ${renderUniversalBlogFooter(true, title, appDevUrl)}
</div>
<!--==================== END SECONDARY 1 BLOG POST ====================-->
    `.trim();

  } else {
    // -------------------------------------------------------------------------
    // TRACK 4: SECONDARY 2 (YouTube Shorts Ko Promote Karna - Video Embed)
    // -------------------------------------------------------------------------
    title = `${shortTitle} – 3D Animated Kids Learning YouTube Short & Activity Guide (${currentSlot.toUpperCase()} 2026)`;
    labels = ["Kids Mode", "YouTube Shorts", "Video Promotion", "3D Animation", "Shorts 2026"];

    content = `
<!--==================== SECONDARY 2: KIDS YOUTUBE SHORTS PROMOTION PAGE ====================-->
<div style="background-color: #ffffff !important; color: #0f172a !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; line-height: 1.8; max-width: 820px; margin: 0 auto; padding: 26px 20px; border-radius: 20px; box-shadow: 0 10px 35px rgba(0,0,0,0.08); border: 1px solid #fee2e2; text-align: left;">

  <!--1. Brand Banner-->
  <div style="margin: 0 auto 20px auto; text-align: center;">
    <a href="${appDevUrl}/?screen=kids" target="_blank" style="display: block;">
      <img src="${brandLogoUrl}" alt="Enter the World of Light &amp; Laughter - Kids World" style="width: 100%; max-width: 800px; height: auto; border-radius: 16px; display: block; margin: 0 auto; box-shadow: 0 8px 24px rgba(245,158,11,0.25);" />
    </a>
  </div>

  <!--2. Featured Thumbnail-->
  <div style="margin: 0 auto 22px auto; text-align: center;">
    <img src="${featuredThumbUrl}" alt="${shortTitle}" style="width: 100%; max-width: 780px; height: auto; max-height: 440px; object-fit: cover; border-radius: 16px; display: block; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.12);" />
  </div>

  <div style="border-bottom: 2px solid #fee2e2; padding-bottom: 12px; margin-bottom: 20px;">
    <span style="background: #fee2e2; color: #b91c1c !important; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase;">
      🎬 OFFICIAL YOUTUBE SHORT FEATURE (SECONDARY 2)
    </span>
    <h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.3; margin: 12px 0 6px 0; font-weight: 900;">
      📺 ${title}
    </h1>
    <p style="color: #64748b !important; font-size: 15px; margin: 0;">Enter the World of Light &amp; Laughter – 3D Animated Educational Short Series</p>
  </div>

  <!--📺 Responsive Vertical 9:16 YouTube Player-->
  <div style="margin: 26px auto; max-width: 440px; text-align: center;">
    <div style="position: relative; width: 100%; aspect-ratio: 9/16; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.18); border: 2px solid #e2e8f0; background: #000;">
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" 
        title="${title}" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    </div>
    
    <!--🔔 Official Subscribe & Watch Buttons-->
    <div style="margin-top: 14px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
      <a href="https://www.youtube.com/@EntertheWorldofLight?sub_confirmation=1" target="_blank" style="background: #ff0000; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(255,0,0,0.3);">
        🔔 Subscribe @EntertheWorldofLight
      </a>
      <a href="https://youtube.com/shorts/${videoId}" target="_blank" style="background: #0f172a; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px;">
        ▶ Watch Directly on YouTube
      </a>
    </div>
  </div>

  <h3 style="color: #0f172a !important; font-size: 20px; font-weight: 800;">📖 Lesson Breakdown &amp; Educational Goals</h3>
  <p>
    Is 3D animated Short me bacha fun visual CGI ke zariye seekhta hai. Masnooi aur boring video ke bajaye isme 100% original Pixar-style animated mascot bache ki dilchaspi ko barqarar rakhta hai:
  </p>
  <ul>
    <li><strong>Interactive Visual Concept:</strong> Phonics sound, word spelling aur Urdu tarjuma aik sath.</li>
    <li><strong>100% Original AI Narration:</strong> Saaf aur wazeh bilingual talaffuz.</li>
    <li><strong>Child Safe (COPPA Compliant):</strong> Zero harmful content, purely positive &amp; moral education.</li>
  </ul>

  <!--🚀 Interactive Practice Link Inside App-->
  <div style="background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 14px; padding: 20px; margin: 25px 0; text-align: center;">
    <h4 style="color: #1d4ed8 !important; margin: 0 0 6px 0; font-size: 18px; font-weight: 800;">✨ Practice this Lesson Live in Web App</h4>
    <p style="color: #1e40af !important; margin: 0 0 14px 0; font-size: 14px;">Bache ko app me trace karne aur interactive quiz khelne dein:</p>
    <a href="${appDevUrl}/?screen=kids&video=${videoId}" target="_blank" style="background: #2563eb; color: #ffffff !important; font-weight: 800; text-decoration: none; padding: 12px 26px; border-radius: 10px; display: inline-block;">
      🚀 Launch Live Practice Module &rarr;
    </a>
  </div>

  ${renderUniversalBlogFooter(false, title, appDevUrl)}

  <!--Schema VideoObject-->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "${title}",
    "description": "${shortTitle} 3D animated kids educational short by Enter the World of Light & Laughter",
    "thumbnailUrl": "${featuredThumbUrl}",
    "uploadDate": "${new Date().toISOString()}",
    "duration": "PT60S",
    "embedUrl": "https://www.youtube.com/embed/${videoId}",
    "contentUrl": "https://youtube.com/shorts/${videoId}",
    "url": "${masterBlogUrl}",
    "publisher": {
      "@type": "Organization",
      "name": "Enter the World of Light & Laughter",
      "logo": {
        "@type": "ImageObject",
        "url": "${brandLogoUrl}"
      }
    }
  }
  </script>
</div>
<!--==================== END SECONDARY 2 BLOG PAGE ====================-->
    `.trim();
  }

  res.json({
    title,
    track,
    campaignType: isSecondary ? "secondary" : "primary",
    postType: isPage ? "PAGE" : "POST",
    slot: currentSlot,
    labels,
    targetBlogId,
    content,
    videoId,
    isOppositeCycle: !isEvenDay,
    generatedAt: new Date().toISOString(),
  });
});'''

updated_server_code = server_code[:start_idx] + new_handler + server_code[end_idx:]
open("server.ts", "w").write(updated_server_code)
print("Updated server.ts successfully!")
