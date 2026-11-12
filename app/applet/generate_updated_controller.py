import os

content = r'''/**
 * ============================================================================
 * ENTER THE WORLD OF LIGHT & LAUGHTER
 * MASTER CONTROLLER ENGINE (Master Controller.gs)
 * ============================================================================
 * Official Autonomous Multi-Track Publishing Engine for Google Blogger & YouTube
 * Channel Ecosystem: @EntertheWorldofLight (Channel ID: UCvCzFP5EPsV4Vp6l6GGuvyg)
 * 
 * 4 Autonomous Content Tracks:
 * - Track 1 (Primary 1 Post): App Features & Interactive Tools Hub
 * - Track 2 (Primary 2 Page): Comprehensive Evergreen Urdu Curriculum & Pillar Guide
 * - Track 3 (Secondary 1 Post): Kids Light World, 3D Stories, Urdu Letters & Phonics
 * - Track 4 (Secondary 2 Page): YouTube Shorts Direct Hub & Motor Skills Center
 * 
 * CORE ARCHITECTURAL SENTINELS:
 * 1. 🛡️ DEDUPLICATION SENTINEL: Pre-checks existing Blogger posts (via Blogger API).
 *    If Video ID, Title, or Shorts URL already exists on the blog, it is SKIPPED
 *    automatically and the next unposted video is selected (Zero Double Posting).
 * 2. 📱 TOP APP SHOWCASE HERO: Embeds the official high-resolution App Tablet Showcase
 *    banner with interactive launch triggers.
 * 3. 📡 LIVE YOUTUBE RSS SYNC: Automatically queries @EntertheWorldofLight for
 *    the freshest shorts, titles, and thumbnails.
 * 4. 📢 UNIVERSAL SOCIAL SHARE & JOIN US FOOTER: Full WhatsApp, Facebook, Twitter,
 *    Telegram sharing bar + Official WhatsApp Channel & YouTube Subscribe buttons.
 * ============================================================================
 */

// ⚙️ MASTER CONFIGURATION
var MASTER_CONFIG = {
  // 1. Google Blogger IDs
  PRIMARY_BLOG_ID: "5550406854147347257",      // Main Web App Hub (Posts & Pages)
  SECONDARY_BLOG_ID: "3870971020533851761",    // Kids Mode & YouTube Shorts Hub

  // 2. Official Social & Community Endpoints
  WHATSAPP_CHANNEL_URL: "https://whatsapp.com/channel/0029VasZV4a60eBd8TwfTg1f",
  YOUTUBE_CHANNEL_ID: "UCvCzFP5EPsV4Vp6l6GGuvyg",
  YOUTUBE_HANDLE: "@EntertheWorldofLight",
  YOUTUBE_URL: "https://www.youtube.com/@EntertheWorldofLight",
  YOUTUBE_FEED_URL: "https://www.youtube.com/feeds/videos.xml?channel_id=UCvCzFP5EPsV4Vp6l6GGuvyg",

  // 3. Web App Production Hosting URLs
  API_BASE_URL: "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",
  SHARED_APP_URL: "https://ais-pre-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",

  // 4. Primary Blog Live Web Domain
  PRIMARY_BLOG_DOMAIN: "https://entertheworldoflightandlaughter.blogspot.com",
  SECONDARY_BLOG_DOMAIN: "https://www.blogger.com/blog/pages/3870971020533851761",

  // 5. Google Drive Shared Folder for Storage Backup
  DRIVE_FOLDER_ID: "1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4",

  // 6. Verified Real Videos from @EntertheWorldofLight (Channel Catalog Cache)
  VERIFIED_CHANNEL_VIDEOS: [
    { id: "-jDY3iPtUD0", title: "A for Apple 3D Drawing Short 🍎 | Learn ABC Phonics for Kids", category: "Kids Phonics" },
    { id: "Y3chQfrAAxM", title: "Hazrat Ali (RA) Ka Farman ❤️ | Sakhawat Rizq Kam Nahi Karti, Barkat Deti Hai", category: "Moral Wisdom" },
    { id: "WRZHGeT3Vvw", title: "Hazrat Ali (RA) Ka Qoul | Insaf Har Hukumat Ki Bunyad Hai", category: "Urdu Adab" },
    { id: "W_YPLdeY9cQ", title: "Hazrat Ali (RA) Ka Qoul | Paak Dil Har Neki Ki Bunyad Hai", category: "Moral Wisdom" },
    { id: "CZLC_RvQYVU", title: "Hazrat Ali (RA) Ka Qoul | Apni Zuban Ki Hifazat Karo", category: "Islamic Quotes" },
    { id: "GSsRt56n8C4", title: "Hazrat Ali (RA) Ka Qoul | Har Amal Ki Khoobsurti Ikhlas Mein Hai", category: "Moral Wisdom" },
    { id: "LP0RwYKVqzE", title: "Hazrat Ali (RA) Farmate Hain: Shukr Karo, Nematein Barhti Jayengi", category: "Moral Wisdom" },
    { id: "9TpCUfrVZYs", title: "Dua Momin Ka Mazboot Sahara Hai | Hazrat Ali (RA) Ka Qoul ❤️", category: "Islamic Reminder" },
    { id: "LYw8PJpvmsE", title: "Waqt Ki Qadar Karo | Hazrat Ali RA Ka Qaul | Waqt Ki Ahmiyat", category: "Life Wisdom" },
    { id: "nTH3sWICvic", title: "Hazrat Ali RA Ka Qoul | Sacha Dost Wohi Hai Jo Mushkil Waqt Mein Saath De", category: "Friendship" },
    { id: "Bf--UwoZfYI", title: "Hazrat Ali RA Ne Farmaya | Allah Ke Liye Jhuk Jao Allah Buland Kar Dega", category: "Spiritual" },
    { id: "7AKjhQXbEb4", title: "Gussa Aqal Ka Sab Se Bara Dushman Hai | Hazrat Ali (RA) Ka Qoul", category: "Self Control" },
    { id: "N-0zIrSvh9U", title: "Hazrat Ali Quotes | Khamoshi Par Aik Zabardast Qoul", category: "Moral Wisdom" },
    { id: "ew1mWQxy9K4", title: "Hazrat Ali RA Ne Farmaya - Sab se behtareen zeenat achha akhlaq hai", category: "Character" },
    { id: "Uf1YRUxAyGk", title: "Hazrat Ali RA Ne Farmaya: Sach insaan ko izzat deta hai aur jhoot zaleel kar deta hai", category: "Truth & Honesty" }
  ],

  // 7. Anti-Spam Safety: Minimum 3.5 hours spacing between automated posts
  MIN_POST_SPACING_HOURS: 3.5,
  TIMEZONE: "Asia/Karachi"
};

var CONFIG = MASTER_CONFIG;

/**
 * ============================================================================
 * 🛡️ MODULE 1: DEDUPLICATION SENTINEL (Prevents Double Posting)
 * ============================================================================
 * Fetches recent posts from Blogger and verifies whether the video ID or
 * title has ALREADY been published on the blog.
 */
function isPostAlreadyPublishedOnBlogger(blogId, videoId, videoTitle) {
  try {
    var token = ScriptApp.getOAuthToken();
    var url = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts?maxResults=50&fetchBodies=true";
    var response = UrlFetchApp.fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
      muteHttpExceptions: true
    });

    if (response.getResponseCode() === 200) {
      var json = JSON.parse(response.getContentText());
      var posts = json.items || [];
      var cleanTargetTitle = (videoTitle || "").toLowerCase().replace(/[^a-z0-9]/g, "");

      for (var i = 0; i < posts.length; i++) {
        var p = posts[i];
        var pTitle = (p.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        var pContent = p.content || "";

        // 1. Check if exact Video ID is in post title, content, iframe or thumbnail
        if (videoId && (pContent.indexOf(videoId) !== -1 || (p.title && p.title.indexOf(videoId) !== -1))) {
          Logger.log("⚠️ [DUPLICATE FOUND] Video ID " + videoId + " already published in post: '" + p.title + "'.");
          return true;
        }

        // 2. Check if clean titles match strongly (ignoring case, spaces, symbols)
        if (cleanTargetTitle.length > 15 && pTitle.indexOf(cleanTargetTitle.substring(0, 25)) !== -1) {
          Logger.log("⚠️ [DUPLICATE FOUND] Title match with existing post: '" + p.title + "'.");
          return true;
        }
      }
    }
  } catch (err) {
    Logger.log("⚠️ [DEDUPLICATION WARNING] Could not verify existing posts: " + err.message);
  }
  return false;
}

/**
 * ============================================================================
 * 📡 MODULE 2: LIVE YOUTUBE CHANNEL FEED ENGINE (@EntertheWorldofLight)
 * ============================================================================
 */
function fetchChannelVideosFromYouTube() {
  var videos = [];
  try {
    var response = UrlFetchApp.fetch(MASTER_CONFIG.YOUTUBE_FEED_URL, {
      muteHttpExceptions: true,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GoogleAppsScript)" }
    });
    if (response.getResponseCode() === 200) {
      var xml = response.getContentText();
      var entryRegex = /<entry[\s\S]*?<\/entry>/g;
      var entries = xml.match(entryRegex) || [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        var idMatch = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        var titleMatch = e.match(/<title>([^<]+)<\/title>/);
        if (idMatch && idMatch[1]) {
          var vId = idMatch[1].trim();
          var rawTitle = titleMatch ? titleMatch[1].trim() : "Enter the World of Light Video";
          var cleanTitle = rawTitle
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
          videos.push({
            id: vId,
            title: cleanTitle,
            thumbnailUrl: "https://i.ytimg.com/vi/" + vId + "/hqdefault.jpg",
            url: "https://www.youtube.com/shorts/" + vId
          });
        }
      }
      if (videos.length > 0) {
        Logger.log("✅ [YOUTUBE SYNC] Fetched " + videos.length + " live videos from @EntertheWorldofLight");
        return videos;
      }
    }
  } catch (err) {
    Logger.log("⚠️ [YOUTUBE SYNC WARNING] Live feed failed (" + err.message + "). Using verified catalog.");
  }

  // Fallback to verified catalog from channel
  var fallback = MASTER_CONFIG.VERIFIED_CHANNEL_VIDEOS.map(function(item) {
    return {
      id: item.id,
      title: item.title,
      thumbnailUrl: "https://i.ytimg.com/vi/" + item.id + "/hqdefault.jpg",
      url: "https://www.youtube.com/shorts/" + item.id
    };
  });
  return fallback;
}

/**
 * 🎯 UNPUBLISHED VIDEO SELECTOR WITH AUTOMATIC DEDUPLICATION
 * Loops through the channel's videos starting from the slot index.
 * Automatically SKIPS any video already published on Blogger to prevent double posting.
 */
function selectUnpublishedChannelVideo(slotName, trackType, blogId) {
  var videos = fetchChannelVideosFromYouTube();
  if (!videos || videos.length === 0) {
    return {
      id: "-jDY3iPtUD0",
      title: "A for Apple 3D Drawing Short 🍎 | Learn ABC Phonics for Kids",
      thumbnailUrl: "https://i.ytimg.com/vi/-jDY3iPtUD0/hqdefault.jpg",
      url: "https://www.youtube.com/shorts/-jDY3iPtUD0"
    };
  }

  slotName = (slotName || "morning").toLowerCase();
  var now = new Date();
  var startOfYear = new Date(now.getFullYear(), 0, 0);
  var dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));

  var slotOffset = (slotName === "afternoon") ? 1 : ((slotName === "evening") ? 2 : 0);
  var trackOffset = (trackType === "primary_page") ? 3 : ((trackType === "secondary_post") ? 5 : ((trackType === "secondary_page") ? 7 : 0));
  var baseIndex = (dayOfYear * 3 + slotOffset + trackOffset) % videos.length;

  // Search for the first video that is NOT yet published on Blogger
  for (var attempt = 0; attempt < videos.length; attempt++) {
    var candidateIndex = (baseIndex + attempt) % videos.length;
    var candidate = videos[candidateIndex];

    var alreadyExists = isPostAlreadyPublishedOnBlogger(blogId, candidate.id, candidate.title);
    if (!alreadyExists) {
      Logger.log("🎯 [FRESH UNPOSTED VIDEO APPROVED] Index: " + candidateIndex + " | Title: '" + candidate.title + "' | ID: " + candidate.id);
      return candidate;
    } else {
      Logger.log("⏭️ [DEDUPLICATION SKIP] Video ID: " + candidate.id + " ('" + candidate.title + "') is already published. Moving to next...");
    }
  }

  // If all 15 are already published, return the base candidate to avoid breaking
  Logger.log("ℹ️ All recent videos exist on blog. Using rotating video candidate.");
  return videos[baseIndex];
}

/**
 * ============================================================================
 * LUXURY RESPONSIVE HTML GENERATOR (Web App Themed, Top Showcase & Full Footer)
 * ============================================================================
 */
function buildLuxuryArticleHtml(options) {
  options = options || {};
  var isKidsTheme = options.isKidsTheme || false;
  var videoId = options.videoId || "-jDY3iPtUD0";
  var videoTitle = options.videoTitle || "Enter the World of Light Short Feature";
  var heroThumbUrl = options.heroThumbUrl || ("https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg");
  var trackTitle = options.title || (videoTitle + " – Enter the World of Light & Laughter");
  var trackSubtitle = options.subtitle || "Authentic Urdu heritage, interactive stroke tracing, moral wisdom and child-safe learning.";
  var crossLinkUrl = options.crossLinkUrl || MASTER_CONFIG.PRIMARY_BLOG_DOMAIN;
  var crossLinkLabel = options.crossLinkLabel || "Visit Evergreen Syllabus Guide";
  var slotLabel = (options.slotName || "DAILY").toUpperCase();
  var webAppUrl = MASTER_CONFIG.API_BASE_URL;
  var whatsappUrl = MASTER_CONFIG.WHATSAPP_CHANNEL_URL;
  var encodedTitle = encodeURIComponent(trackTitle);
  var encodedUrl = encodeURIComponent(crossLinkUrl);

  // App Showcase Hero Banner Image
  var appHeroBannerUrl = webAppUrl + "/storage/app_showcase_hero.png";

  var headerBg = isKidsTheme
    ? "linear-gradient(135deg, #f59e0b 0%, #d97706 40%, #ea580c 100%)"
    : "linear-gradient(135deg, #0284c7 0%, #0369a1 40%, #1e3a8a 100%)";
  var themePillText = isKidsTheme ? "KIDS LIGHT WORLD 🦄" : "OFFICIAL APP HUB 🌟";
  var taglineUrdu = isKidsTheme
    ? "بچوں کی پیاری دنیا، اخلاقی کہانیاں اور ہنستی مسکراتی تعلیم"
    : "تعلیم، تفریح، کلاسیکی ادب اور اخلاقی تربیت کا روشن جہان";

  // Native Vector Brand Emblem
  var brandLogoSvg = 
    '<div style="display:inline-flex;align-items:center;justify-content:center;width:84px;height:84px;border-radius:24px;background:linear-gradient(135deg, #0284c7, #38bdf8, #fde047);padding:8px;box-shadow:0 10px 25px rgba(0,0,0,0.25);border:2px solid rgba(255,255,255,0.4);margin-bottom:14px;">' +
      '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">' +
        '<circle cx="50" cy="50" r="32" fill="#FDE047" />' +
        '<circle cx="50" cy="50" r="28" fill="#F59E0B" />' +
        '<circle cx="50" cy="24" fill="#FBBF24" />' +
        '<g stroke="#FDE047" stroke-width="4.5" stroke-linecap="round" opacity="0.95">' +
          '<line x1="50" y1="8" x2="50" y2="16" />' +
          '<line x1="50" y1="84" x2="50" y2="92" />' +
          '<line x1="8" y1="50" x2="16" y2="50" />' +
          '<line x1="84" y1="50" x2="92" y2="50" />' +
          '<line x1="20" y1="20" x2="26" y2="26" />' +
          '<line x1="74" y1="74" x2="80" y2="80" />' +
          '<line x1="20" y1="80" x2="26" y2="74" />' +
          '<line x1="74" y1="26" x2="80" y2="20" />' +
        '</g>' +
        '<path d="M26 62C34 54 44 55 50 60C56 55 66 54 74 62C67 72 57 71 50 67C43 71 33 72 26 62Z" fill="#FFFFFF" opacity="0.98" />' +
        '<path d="M38 48C42 54 58 54 62 48" stroke="#0F172A" stroke-width="3.5" stroke-linecap="round" />' +
        '<circle cx="50" cy="34" r="3.5" fill="#FFFFFF" />' +
        '<circle cx="36" cy="40" r="2" fill="#FFFFFF" />' +
        '<circle cx="64" cy="40" r="2" fill="#FFFFFF" />' +
      '</svg>' +
    '</div>';

  var html = 
    '<div style="background-color:#ffffff !important;color:#0f172a !important;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif !important;line-height:1.8;max-width:820px;margin:0 auto;padding:28px 24px;border-radius:24px;box-shadow:0 14px 40px rgba(0,0,0,0.08);border:1px solid #e2e8f0;text-align:left;">' +

    '<!-- 🌟 1. NATIVE BRAND BANNER (Sunburst Logo & Mission) -->' +
    '<div style="background:' + headerBg + ';border-radius:22px;padding:32px 22px;margin-bottom:26px;text-align:center;color:#ffffff;box-shadow:0 12px 30px rgba(2,132,199,0.25);border:1px solid rgba(255,255,255,0.2);">' +
      brandLogoSvg +
      '<div style="display:inline-block;background:rgba(255,255,255,0.2);padding:5px 16px;border-radius:9999px;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px;border:1px solid rgba(255,255,255,0.35);">' +
        themePillText + ' • ' + slotLabel + ' 2026' +
      '</div>' +
      '<h1 style="margin:0 0 8px 0;font-size:28px;font-weight:900;letter-spacing:-0.5px;line-height:1.3;color:#ffffff;">' +
        'Enter the World of <span style="color:#38bdf8;">Light</span> <span style="color:#fde047;">&amp;</span> <span style="color:#fbbf24;">Laughter</span>' +
      '</h1>' +
      '<p style="margin:0 0 6px 0;font-size:14px;color:#f8fafc;opacity:0.95;font-weight:600;">' +
        'Interactive Bilingual Education • Classical Urdu Adab • Child-Safe Wonder' +
      '</p>' +
      '<div style="font-family:Noto Nastaliq Urdu,Jameel Noori Nastaleeq,serif;font-size:16px;color:#fde047;direction:rtl;margin-top:6px;">' +
        taglineUrdu +
      '</div>' +
    '</div>' +

    '<!-- 🌟 2. OFFICIAL APP TABLET SHOWCASE HERO (High-Resolution App Image) -->' +
    '<div style="background:linear-gradient(135deg, #0f172a, #1e293b);border-radius:20px;padding:18px;margin-bottom:26px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.15);">' +
      '<div style="position:relative;max-width:760px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 12px 28px rgba(0,0,0,0.35);border:2px solid rgba(255,255,255,0.15);">' +
        '<a href="' + webAppUrl + '" target="_blank" style="display:block;text-decoration:none;">' +
          '<img src="' + appHeroBannerUrl + '" alt="Enter the World of Light &amp; Laughter - Interactive Learning Platform" style="width:100%;height:auto;max-height:440px;object-fit:cover;display:block;" onerror="this.src=\'' + heroThumbUrl + '\';" />' +
          '<div style="background:linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.95) 100%);padding:14px 18px;color:#ffffff;text-align:center;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">' +
            '<span style="font-size:13px;font-weight:700;color:#fde047;">✨ Multi-Purpose Cultural &amp; Learning Platform</span>' +
            '<span style="background:linear-gradient(135deg, #0284c7, #38bdf8);color:#ffffff;font-size:12px;font-weight:800;padding:6px 16px;border-radius:20px;">Launch Full Web App ➔</span>' +
          '</div>' +
        '</a>' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 3. ARTICLE TITLE & EXECUTIVE SUMMARY -->' +
    '<div style="margin-bottom:28px;">' +
      '<h2 style="font-size:24px;font-weight:800;color:#0f172a;margin:0 0 10px 0;line-height:1.35;">' +
        trackTitle +
      '</h2>' +
      '<p style="font-size:15px;color:#475569;margin:0 0 16px 0;line-height:1.7;">' +
        trackSubtitle +
      '</p>' +
      '<div style="background:#f8fafc;border-left:4px solid #0284c7;padding:14px 18px;border-radius:0 14px 14px 0;font-size:14px;color:#334155;line-height:1.7;">' +
        '💡 <strong>Platform Overview:</strong> Enter the World of Light &amp; Laughter unites interactive browser technology with South Asian literary heritage. From guided Urdu stroke tracing and bilingual vocabulary drills to classical Allama Iqbal poetry recitations, Hazrat Ali (RA) moral wisdom, and child-safe moral fables, explore an educational ecosystem designed for young learners, students, and culture enthusiasts.' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 4. THE 4 APP-THEMED FEATURE OPTION CARDS -->' +
    '<div style="margin-bottom:32px;">' +
      '<div style="font-size:20px;font-weight:900;color:#0f172a;margin-bottom:18px;display:flex;align-items:center;gap:10px;">' +
        '<span style="font-size:24px;">⚡</span> <span>Explore 4 Core Interactive Pillars</span>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr;gap:18px;">' +

        '<!-- CARD 1: URDU TRACING -->' +
        '<div style="background:linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%);border:2px solid #c7d2fe;border-radius:18px;padding:22px;box-shadow:0 8px 24px rgba(99,102,241,0.08);">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
            '<div style="display:inline-block;background:linear-gradient(135deg, #6366f1, #4f46e5);color:#ffffff;padding:5px 14px;border-radius:9999px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;">Pillar 1: Interactive Practice</div>' +
            '<span style="font-size:26px;">✏️</span>' +
          '</div>' +
          '<h3 style="margin:0 0 6px 0;font-size:19px;font-weight:800;color:#1e1b4b;">Urdu Haroof-e-Tahajji &amp; Tracing Canvas (حروف تہجی ٹریسنگ کینوس)</h3>' +
          '<div style="font-family:Noto Nastaliq Urdu,serif;font-size:20px;color:#4338ca;direction:rtl;margin:8px 0 10px 0;background:#ffffff;padding:8px 14px;border-radius:10px;border:1px solid #e0e7ff;text-align:center;">ا ب پ ت ٹ ث ج چ ح خ</div>' +
          '<p style="margin:0 0 14px 0;font-size:13px;color:#475569;line-height:1.6;">Full interactive stroke-order tracing canvas for all 38 Urdu alphabets. Includes guided arrow animations, real-time stroke validation, native phonetics audio, and reward stars.</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">' +
            '<span style="background:#e0e7ff;color:#3730a3;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">✏️ Haptic Stroke Order</span>' +
            '<span style="background:#e0e7ff;color:#3730a3;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">🔊 Native Audio</span>' +
            '<span style="background:#e0e7ff;color:#3730a3;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">⭐ Star XP Points</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/#practice" target="_blank" style="display:inline-block;background:linear-gradient(135deg, #4f46e5, #4338ca);color:#ffffff;text-decoration:none;font-size:13px;font-weight:800;padding:10px 20px;border-radius:10px;box-shadow:0 4px 12px rgba(79,70,229,0.35);">Launch Tracing Canvas ➔</a>' +
        '</div>' +

        '<!-- CARD 2: CLASSICAL URDU ADAB -->' +
        '<div style="background:linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%);border:2px solid #bae6fd;border-radius:18px;padding:22px;box-shadow:0 8px 24px rgba(2,132,199,0.08);">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
            '<div style="display:inline-block;background:linear-gradient(135deg, #0284c7, #0369a1);color:#ffffff;padding:5px 14px;border-radius:9999px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;">Pillar 2: Rekhta Heritage</div>' +
            '<span style="font-size:26px;">📚</span>' +
          '</div>' +
          '<h3 style="margin:0 0 6px 0;font-size:19px;font-weight:800;color:#082f49;">Classical Urdu Literature &amp; Rekhta Heritage (اقبال، غالب و فیض)</h3>' +
          '<div style="font-family:Noto Nastaliq Urdu,serif;font-size:17px;color:#0c4a6e;direction:rtl;margin:8px 0 10px 0;background:#ffffff;padding:10px 14px;border-radius:10px;border-right:4px solid #0284c7;line-height:2;">خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے<br/>خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے</div>' +
          '<p style="margin:0 0 14px 0;font-size:13px;color:#475569;line-height:1.6;">Curated anthology of Allama Iqbal, Mirza Ghalib, and Faiz Ahmad Faiz. Features line-by-line Tashreeh, literal English translations, audio recitations, and high-contrast Nastaliq reader.</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">' +
            '<span style="background:#e0f2fe;color:#0369a1;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">📖 Line Tashreeh</span>' +
            '<span style="background:#e0f2fe;color:#0369a1;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">🎙️ Audio Recitation</span>' +
            '<span style="background:#e0f2fe;color:#0369a1;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">🏛️ Rekhta Heritage</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/#poetry" target="_blank" style="display:inline-block;background:linear-gradient(135deg, #0284c7, #0369a1);color:#ffffff;text-decoration:none;font-size:13px;font-weight:800;padding:10px 20px;border-radius:10px;box-shadow:0 4px 12px rgba(2,132,199,0.35);">Explore Urdu Poetry Reader ➔</a>' +
        '</div>' +

        '<!-- CARD 3: KIDS LIGHT WORLD -->' +
        '<div style="background:linear-gradient(180deg, #ffffff 0%, #fffbeb 100%);border:2px solid #fde68a;border-radius:18px;padding:22px;box-shadow:0 8px 24px rgba(245,158,11,0.08);">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
            '<div style="display:inline-block;background:linear-gradient(135deg, #f59e0b, #d97706);color:#ffffff;padding:5px 14px;border-radius:9999px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;">Pillar 3: Kids Wonder</div>' +
            '<span style="font-size:26px;">🦄</span>' +
          '</div>' +
          '<h3 style="margin:0 0 6px 0;font-size:19px;font-weight:800;color:#78350f;">Kids Light World &amp; 3D Animated Moral Stories (بچوں کی پیاری دنیا)</h3>' +
          '<div style="font-family:Noto Nastaliq Urdu,serif;font-size:17px;color:#92400e;direction:rtl;margin:8px 0 10px 0;background:#ffffff;padding:8px 14px;border-radius:10px;border:1px solid #fef3c7;text-align:center;">سچائی، ہمدردی، بہادری اور والدین کی عزت کی پیاری کہانیاں</div>' +
          '<p style="margin:0 0 14px 0;font-size:13px;color:#475569;line-height:1.6;">Wholesome 3D animated bedtime tales, animal adventures, interactive animal sounds, and AI companion Sunny. Zero unfiltered web content with single-click parent gate.</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">' +
            '<span style="background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">🧸 3D Animated Fables</span>' +
            '<span style="background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">🔒 Parent Security Lock</span>' +
            '<span style="background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">🤖 Sunny AI Guide</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/#kids" target="_blank" style="display:inline-block;background:linear-gradient(135deg, #f59e0b, #d97706);color:#ffffff;text-decoration:none;font-size:13px;font-weight:800;padding:10px 20px;border-radius:10px;box-shadow:0 4px 12px rgba(245,158,11,0.35);">Enter Kids Light World ➔</a>' +
        '</div>' +

        '<!-- CARD 4: INTERACTIVE MIND GYM -->' +
        '<div style="background:linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%);border:2px solid #bbf7d0;border-radius:18px;padding:22px;box-shadow:0 8px 24px rgba(16,185,129,0.08);">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
            '<div style="display:inline-block;background:linear-gradient(135deg, #10b981, #059669);color:#ffffff;padding:5px 14px;border-radius:9999px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;">Pillar 4: Cognitive Skills</div>' +
            '<span style="font-size:26px;">🧠</span>' +
          '</div>' +
          '<h3 style="margin:0 0 6px 0;font-size:19px;font-weight:800;color:#064e3b;">Interactive Mind Gym &amp; Bilingual Quizzes (ذہنی آزمائش اور کوئز)</h3>' +
          '<div style="font-family:Noto Nastaliq Urdu,serif;font-size:17px;color:#065f46;direction:rtl;margin:8px 0 10px 0;background:#ffffff;padding:8px 14px;border-radius:10px;border:1px solid #dcfce7;text-align:center;">الفاظ کا ذخیرہ، یادداشت کے کھیل اور روزانہ کے چیلنجز</div>' +
          '<p style="margin:0 0 14px 0;font-size:13px;color:#475569;line-height:1.6;">Cognitive exercises, dual-language word pairing, memory match games, daily challenge streaks, and unlockable achievement medals.</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">' +
            '<span style="background:#dcfce7;color:#065f46;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">🧩 Bilingual Memory Drills</span>' +
            '<span style="background:#dcfce7;color:#065f46;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">⚡ Streak Counter &amp; XP</span>' +
            '<span style="background:#dcfce7;color:#065f46;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">🏅 Level Badges</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/#play" target="_blank" style="display:inline-block;background:linear-gradient(135deg, #10b981, #059669);color:#ffffff;text-decoration:none;font-size:13px;font-weight:800;padding:10px 20px;border-radius:10px;box-shadow:0 4px 12px rgba(16,185,129,0.35);">Play Mind Gym Quizzes ➔</a>' +
        '</div>' +

      '</div>' +
    '</div>' +

    '<!-- 🌟 5. EMBEDDED 9:16 RESPONSIVE YOUTUBE SHORT PLAYER (Synced to @EntertheWorldofLight) -->' +
    '<div style="background:#0f172a;border-radius:20px;padding:24px 16px;margin-bottom:26px;text-align:center;color:#ffffff;box-shadow:0 10px 30px rgba(0,0,0,0.2);">' +
      '<div style="display:inline-block;background:#ef4444;color:#ffffff;padding:4px 12px;border-radius:9999px;font-size:11px;font-weight:800;text-transform:uppercase;margin-bottom:12px;">🎬 OFFICIAL YOUTUBE SHORT</div>' +
      '<h4 style="margin:0 0 14px 0;font-size:16px;font-weight:700;color:#f8fafc;">' + videoTitle + '</h4>' +
      '<div style="max-width:320px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.5);aspect-ratio:9/16;background:#000000;">' +
        '<iframe src="https://www.youtube.com/embed/' + videoId + '?rel=0&modestbranding=1" title="' + videoTitle + '" style="width:100%;height:100%;border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
      '</div>' +
      '<div style="margin-top:14px;">' +
        '<a href="https://www.youtube.com/@EntertheWorldofLight?sub_confirmation=1" target="_blank" style="display:inline-block;background:#ef4444;color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;padding:8px 18px;border-radius:8px;">Subscribe on YouTube (@EntertheWorldofLight) ↗</a>' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 6. OFFICIAL WHITE BOX FOOTER (SHARE BUTTONS & JOIN US CHANNELS) -->' +
    '<div style="background:#ffffff;border:2px solid #e2e8f0;border-radius:20px;box-shadow:0 10px 25px rgba(0,0,0,0.06);margin-bottom:26px;padding:26px 20px;text-align:center;color:#1e293b;">' +

      '<!-- 📢 6A. SHARE WITH FRIENDS & FAMILY SECTION -->' +
      '<div style="margin-bottom:22px;">' +
        '<h4 style="color:#1e293b;font-size:15px;font-weight:800;margin:0 0 14px 0;text-transform:uppercase;letter-spacing:0.5px;">' +
          '📢 Share This Guide With Friends &amp; Family' +
        '</h4>' +
        '<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;">' +
          '<a href="https://api.whatsapp.com/send?text=' + encodedTitle + '%20' + encodedUrl + '" target="_blank" style="background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:9px 16px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(37,211,102,0.3);">' +
            '💬 Share on WhatsApp' +
          '</a>' +
          '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl + '" target="_blank" style="background:#1877F2;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:9px 16px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(24,119,242,0.3);">' +
            '📘 Facebook' +
          '</a>' +
          '<a href="https://twitter.com/intent/tweet?text=' + encodedTitle + '&url=' + encodedUrl + '" target="_blank" style="background:#000000;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:9px 16px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">' +
            '𝕏 Twitter' +
          '</a>' +
          '<a href="https://t.me/share/url?url=' + encodedUrl + '&text=' + encodedTitle + '" target="_blank" style="background:#229ED9;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:9px 16px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">' +
            '✈️ Telegram' +
          '</a>' +
          '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl + '" target="_blank" style="background:#0A66C2;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:9px 16px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">' +
            '💼 LinkedIn' +
          '</a>' +
          '<a href="https://pinterest.com/pin/create/button/?url=' + encodedUrl + '&description=' + encodedTitle + '" target="_blank" style="background:#BD081C;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:9px 16px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">' +
            '📌 Pinterest' +
          '</a>' +
        '</div>' +
      '</div>' +

      '<!-- 🌟 6B. JOIN US & OFFICIAL COMMUNITY CHANNELS SECTION -->' +
      '<div style="border-top:1px solid #e2e8f0;padding-top:20px;">' +
        '<h4 style="color:#0f172a;font-size:16px;font-weight:800;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:0.5px;">' +
          '✨ Join Us &amp; Stay Connected' +
        '</h4>' +
        '<p style="margin:0 0 16px 0;font-size:13px;color:#64748b;">' +
          'Get daily Urdu lessons, bedtime stories, classical recitations &amp; live app updates directly:' +
        '</p>' +
        '<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;">' +
          '<a href="' + whatsappUrl + '" target="_blank" style="background:linear-gradient(135deg, #059669, #047857);color:#ffffff;text-decoration:none;font-weight:800;font-size:13px;padding:11px 22px;border-radius:10px;box-shadow:0 4px 12px rgba(5,150,105,0.25);display:inline-flex;align-items:center;gap:8px;">' +
            '📢 Join Official WhatsApp Channel ↗' +
          '</a>' +
          '<a href="https://www.youtube.com/@EntertheWorldofLight?sub_confirmation=1" target="_blank" style="background:linear-gradient(135deg, #dc2626, #b91c1c);color:#ffffff;text-decoration:none;font-weight:800;font-size:13px;padding:11px 22px;border-radius:10px;box-shadow:0 4px 12px rgba(220,38,38,0.25);display:inline-flex;align-items:center;gap:8px;">' +
            '🔴 Subscribe YouTube Channel ↗' +
          '</a>' +
        '</div>' +
      '</div>' +

    '</div>' +

    '<!-- 🌟 7. PRIMARY APP LAUNCH CALL-TO-ACTION -->' +
    '<div style="text-align:center;margin-bottom:24px;">' +
      '<a href="' + webAppUrl + '" target="_blank" style="display:inline-block;background:linear-gradient(135deg, #0284c7 0%, #4338ca 100%);color:#ffffff;text-decoration:none;font-size:16px;font-weight:800;padding:14px 34px;border-radius:12px;box-shadow:0 6px 20px rgba(2,132,199,0.35);letter-spacing:0.5px;">' +
        '🚀 Launch Interactive Web Portal Now' +
      '</a>' +
    '</div>' +

    '<!-- 🌟 8. CANONICAL CROSS-LINK FOOTER -->' +
    '<div style="border-top:1px solid #e2e8f0;padding-top:16px;text-align:center;font-size:12px;color:#64748b;">' +
      'Related Resource: <a href="' + crossLinkUrl + '" style="color:#0284c7;text-decoration:none;font-weight:600;">' + crossLinkLabel + '</a> | ' +
      'Published by <strong>Enter the World of Light &amp; Laughter</strong> • © 2026' +
    '</div>' +

    '<!-- 🌟 9. JSON-LD STRUCTURED SCHEMA -->' +
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalArticle',
      'headline': trackTitle,
      'description': trackSubtitle,
      'image': heroThumbUrl,
      'author': {
        '@type': 'Organization',
        'name': 'Enter the World of Light & Laughter',
        'url': webAppUrl
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Enter the World of Light & Laughter',
        'logo': {
          '@type': 'ImageObject',
          'url': heroThumbUrl
        }
      },
      'educationalUse': 'Interactive Bilingual Tracing & Urdu Adab',
      'inLanguage': ['en', 'ur'],
      'audience': {
        '@type': 'EducationalAudience',
        'educationalRole': 'student'
      }
    }) +
    '</script>' +
  '</div>';

  return html;
}

/**
 * ============================================================================
 * BLOGGER API PUBLISHING ENGINE
 * ============================================================================
 */
function publishItem(blogId, title, content, labels, isPage) {
  var baseUrl = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + (isPage ? "/pages" : "/posts");
  var token = ScriptApp.getOAuthToken();
  var payload = {
    title: title,
    content: content
  };
  if (!isPage && labels && labels.length) {
    payload.labels = labels;
  }

  var response = UrlFetchApp.fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  var code = response.getResponseCode();
  var resText = response.getContentText();

  if (code >= 200 && code < 300) {
    var json = JSON.parse(resText);
    Logger.log("🎉 [SUCCESS] Item published successfully!");
    Logger.log("🆔 ID: " + json.id);
    Logger.log("🔗 URL: " + json.url);
    return json;
  } else {
    Logger.log("❌ [BLOGGER ERROR] HTTP " + code + ": " + resText);
    throw new Error("Blogger API Error (" + code + "): " + resText);
  }
}

/**
 * ============================================================================
 * 4 CONTENT TRACK PUBLISHERS (With Deduplication & Live YouTube Sync)
 * ============================================================================
 */

// TRACK 1: Primary 1 (App Hub Post)
function publishPrimary_1_Post(slotName) {
  slotName = slotName || "morning";
  Logger.log("▶️ [TRACK 1] Publishing Primary 1 (App Hub Post) for slot: " + slotName);

  // 1. Select the first UNPUBLISHED video from @EntertheWorldofLight
  var video = selectUnpublishedChannelVideo(slotName, "primary_post", MASTER_CONFIG.PRIMARY_BLOG_ID);
  var title = video.title + " – Enter the World of Light & Laughter (" + slotName.toUpperCase() + " 2026 Edition)";
  var subtitle = "Master Urdu Haroof-e-Tahajji tracing, classical poetry recitations, child-safe moral stories and bilingual memory games.";

  var html = buildLuxuryArticleHtml({
    slotName: slotName,
    title: title,
    subtitle: subtitle,
    isKidsTheme: false,
    videoId: video.id,
    videoTitle: video.title,
    heroThumbUrl: video.thumbnailUrl,
    crossLinkUrl: MASTER_CONFIG.PRIMARY_BLOG_DOMAIN,
    crossLinkLabel: "View Full Evergreen Syllabus Guide"
  });

  return publishItem(
    MASTER_CONFIG.PRIMARY_BLOG_ID,
    title,
    html,
    ["Web App Hub", "YouTube Shorts", "Urdu Tracing", "App Features", "Google 2026"],
    false
  );
}

// TRACK 2: Primary 2 (App Evergreen Syllabus Static Page)
function publishPrimary_2_Page(slotName) {
  slotName = slotName || "afternoon";
  Logger.log("▶️ [TRACK 2] Publishing Primary 2 (Evergreen Page) for slot: " + slotName);

  var video = selectUnpublishedChannelVideo(slotName, "primary_page", MASTER_CONFIG.PRIMARY_BLOG_ID);
  var title = "Complete Interactive Urdu Curriculum & Bilingual Pillar Guide – Enter the World of Light & Laughter";
  var subtitle = "Permanent resource index covering Urdu phonetics, Rekhta heritage, interactive tracing sheets and brain exercises.";

  var html = buildLuxuryArticleHtml({
    slotName: slotName,
    title: title,
    subtitle: subtitle,
    isKidsTheme: false,
    videoId: video.id,
    videoTitle: video.title,
    heroThumbUrl: video.thumbnailUrl,
    crossLinkUrl: MASTER_CONFIG.PRIMARY_BLOG_DOMAIN,
    crossLinkLabel: "Read Today's Featured Article"
  });

  return publishItem(
    MASTER_CONFIG.PRIMARY_BLOG_ID,
    title,
    html,
    [],
    true
  );
}

// TRACK 3: Secondary 1 (Kids Mode Shorts Post)
function publishSecondary_1_Post(slotName) {
  slotName = slotName || "evening";
  Logger.log("▶️ [TRACK 3] Publishing Secondary 1 (Kids Post) for slot: " + slotName);

  var video = selectUnpublishedChannelVideo(slotName, "secondary_post", MASTER_CONFIG.SECONDARY_BLOG_ID);
  var title = video.title + " (" + slotName.toUpperCase() + " Edition)";
  var subtitle = "Chunky, joyful, non-violent early learning experience with Sunny AI guide and interactive rewards.";

  var html = buildLuxuryArticleHtml({
    slotName: slotName,
    title: title,
    subtitle: subtitle,
    isKidsTheme: true,
    videoId: video.id,
    videoTitle: video.title,
    heroThumbUrl: video.thumbnailUrl,
    crossLinkUrl: MASTER_CONFIG.SECONDARY_BLOG_DOMAIN,
    crossLinkLabel: "Explore Kids Mode Resource Hub"
  });

  return publishItem(
    MASTER_CONFIG.SECONDARY_BLOG_ID,
    title,
    html,
    ["Kids Light World", "YouTube Shorts", "Urdu Letters", "Moral Stories", "Kids Fun"],
    false
  );
}

// TRACK 4: Secondary 2 (Kids Mode YouTube Shorts Promotion Static Page)
function publishSecondary_2_Page(slotName) {
  slotName = slotName || "evening";
  Logger.log("▶️ [TRACK 4] Publishing Secondary 2 (Kids Page) for slot: " + slotName);

  var video = selectUnpublishedChannelVideo(slotName, "secondary_page", MASTER_CONFIG.SECONDARY_BLOG_ID);
  var title = "Kids Mode Master Resource Directory & YouTube Shorts Learning Hub";
  var subtitle = "Pillar resource directory connecting interactive YouTube Shorts with Urdu motor skills exercises.";

  var html = buildLuxuryArticleHtml({
    slotName: slotName,
    title: title,
    subtitle: subtitle,
    isKidsTheme: true,
    videoId: video.id,
    videoTitle: video.title,
    heroThumbUrl: video.thumbnailUrl,
    crossLinkUrl: MASTER_CONFIG.PRIMARY_BLOG_DOMAIN,
    crossLinkLabel: "Launch Web App Primary Hub"
  });

  return publishItem(
    MASTER_CONFIG.SECONDARY_BLOG_ID,
    title,
    html,
    [],
    true
  );
}

/**
 * ============================================================================
 * LEGACY DISPATCHERS
 * ============================================================================
 */
function executePrimaryYouTubePost() {
  return publishPrimary_1_Post("morning");
}

function executeSecondaryBloggerPage() {
  return publishSecondary_2_Page("evening");
}

function executeAlternatingDaySlot(slotName) {
  slotName = slotName || "afternoon";
  var dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  if (dayOfYear % 2 === 0) {
    return publishPrimary_1_Post(slotName);
  } else {
    return publishSecondary_1_Post(slotName);
  }
}
'''

with open('apps-script/Master Controller.gs', 'w') as f:
    f.write(content)

print('Updated apps-script/Master Controller.gs with deduplication, app hero showcase, and full share footer!')
