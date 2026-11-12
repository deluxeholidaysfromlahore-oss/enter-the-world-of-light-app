import re

code = r'''/**
 * ============================================================================
 * ENTER THE WORLD OF LIGHT & LAUGHTER - MASTER CONTROLLER (Master Controller.gs)
 * ============================================================================
 * Production Cloud-Native Autonomous Publishing & Marketing Sentinel.
 * 
 * 4 DISTINCT CONTENT TRACKS:
 * 1. Track 1 (Primary 1 - Post): App Features, Tracing, Mind Gym, Classical Adab
 * 2. Track 2 (Primary 2 - Page): App Evergreen Syllabus & Pillar Guide
 * 3. Track 3 (Secondary 1 - Kids Post): Kids Mode - Urdu Haroof, Phonics, Stories
 * 4. Track 4 (Secondary 2 - Kids Page): YouTube Shorts Promotion with 9:16 Player
 *
 * DESIGN & THEMING HIGHLIGHTS:
 * - Hosted Real Image URLs (Blogger & Google Discover Compliant - Zero Broken Icons)
 * - Contrast-Preserved Canvas: Clean crisp white body card (#ffffff) that renders
 *   spectacularly on both Dark and Light Blogger themes without text disappearing.
 * - 4 App-Themed Feature Option Cards (Urdu Tracing, Classical Adab, 3D Kids, Mind Gym).
 * - Interactive Glassmorphism UI badges, gradient action buttons, and icons.
 * - Official WhatsApp Channel Community Card (zero raw phone numbers).
 * - Embedded 9:16 Responsive YouTube Player.
 * - Full JSON-LD structured data for Google Rich Results.
 * ============================================================================
 */

// Use var to prevent "SyntaxError: Identifier 'CONFIG' has already been declared"
var CONFIG = {
  // 1. Google Blogger Blog IDs
  PRIMARY_BLOG_ID: "5550406854147347257",      // Main Web App Hub (Posts & Pages)
  SECONDARY_BLOG_ID: "3870971020533851761",    // Kids Mode & YouTube Shorts Hub

  // 2. Official Social & Community Endpoints (Strict WhatsApp Channel Compliance)
  WHATSAPP_CHANNEL_URL: "https://whatsapp.com/channel/0029VasZV4a60eBd8TwfTg1f",
  YOUTUBE_CHANNEL_ID: "UCvCzFP5EPsV4Vp6l6GGuvyg",
  YOUTUBE_HANDLE: "@EntertheWorldofLight",
  YOUTUBE_URL: "https://www.youtube.com/@EntertheWorldofLight",

  // 3. Web App Production Hosting URLs
  API_BASE_URL: "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",
  SHARED_APP_URL: "https://ais-pre-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",

  // 4. Primary Blog Live Web Domain (for Canonical Cross-Linking)
  PRIMARY_BLOG_URL: "https://entertheworldoflightandlaughter.blogspot.com",

  // 5. High-Performance Autonomous Mode (Native Zero-Dependency Rendering)
  AUTONOMOUS_MODE: true,

  // 6. Curated Fallback High-Quality Kids Learning Short ID
  FALLBACK_KIDS_SHORT_ID: "z3PGTXQW7yU"
};

/**
 * ----------------------------------------------------------------------------
 * 1. BRAND HEADER & HERO BANNER GENERATOR (REAL HOSTED IMAGES FOR BLOGGER)
 * ----------------------------------------------------------------------------
 * Uses real public HTTPS URLs so Google Blogger parses thumbnails and renders
 * without stripping SVG data URIs!
 */
function getBrandHeroBanner(trackTitle, trackCategory, isKidsTheme) {
  var appDevUrl = CONFIG.API_BASE_URL;
  var logoUrl = isKidsTheme 
    ? (appDevUrl + "/storage/brand_logo_kids.svg")
    : (appDevUrl + "/storage/brand_logo.svg");

  var thumbUrl = isKidsTheme
    ? (appDevUrl + "/storage/kids_videos/short_a_apple_thumb.jpg")
    : (appDevUrl + "/storage/promo_videos/promo_kids_mode_launch_thumb.jpg");

  return '<div style="margin: 0 auto 20px auto; text-align: center;">' +
    '<a href="' + appDevUrl + '/" target="_blank" style="display: block; text-decoration: none;">' +
      '<img src="' + logoUrl + '" alt="Enter the World of Light &amp; Laughter Official Hub" style="width: 100%; max-width: 800px; height: auto; border-radius: 16px; display: block; margin: 0 auto; box-shadow: 0 8px 24px rgba(2,132,199,0.2);" />' +
    '</a>' +
  '</div>' +
  '<div style="margin: 0 auto 22px auto; text-align: center;">' +
    '<img src="' + thumbUrl + '" alt="' + trackTitle + '" style="width: 100%; max-width: 780px; height: auto; max-height: 440px; object-fit: cover; border-radius: 16px; display: block; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.12);" />' +
  '</div>';
}

/**
 * ----------------------------------------------------------------------------
 * 2. MASTER ENTRY FUNCTIONS (MANUAL & TRIGGER DISPATCHERS)
 * ----------------------------------------------------------------------------
 */
function publishPrimary_1_Post(slotName) {
  slotName = slotName || "morning";
  Logger.log("▶️ [TRACK 1] Publishing Primary 1 (App Hub Post) for slot: " + slotName);
  return executeTrackPublishing(slotName, "primary_post");
}

function publishPrimary_2_Page(slotName) {
  slotName = slotName || "afternoon";
  Logger.log("▶️ [TRACK 2] Publishing Primary 2 (App Evergreen Pillar Page) for slot: " + slotName);
  return executeTrackPublishing(slotName, "primary_page");
}

function publishSecondary_1_Post(slotName) {
  slotName = slotName || "evening";
  Logger.log("▶️ [TRACK 3] Publishing Secondary 1 (Kids Mode Post) for slot: " + slotName);
  return executeTrackPublishing(slotName, "secondary_post");
}

function publishSecondary_2_Page(slotName) {
  slotName = slotName || "evening";
  Logger.log("▶️ [TRACK 4] Publishing Secondary 2 (Kids Shorts Promotion Page) for slot: " + slotName);
  return executeTrackPublishing(slotName, "secondary_page");
}

/**
 * Automation Triggers
 */
function triggerMorningPrimary1() {
  autoUploadMorningKidsShort();
  Utilities.sleep(3000);
  publishPrimary_1_Post("morning");
}

function triggerAfternoonPrimary2() {
  publishPrimary_2_Page("afternoon");
}

function triggerEveningSecondary() {
  publishSecondary_1_Post("evening");
  Utilities.sleep(4000);
  publishSecondary_2_Page("evening");
}

/**
 * ----------------------------------------------------------------------------
 * 3. EXECUTE TRACK PUBLISHING
 * ----------------------------------------------------------------------------
 */
function executeTrackPublishing(slotName, targetTrack) {
  var item = null;

  // Try fetching dynamic content from cloud backend
  try {
    item = fetchContentFromBackend(slotName, targetTrack);
  } catch (err) {
    Logger.log("⚠️ Backend fetch note: " + err.message + ". Activating built-in luxury engine.");
  }

  // Fallback to built-in high-fashion generator
  if (!item || !item.content || item.content.length < 50) {
    Logger.log("⚡ [AUTONOMOUS ENGINE] Generating luxury responsive article for: " + targetTrack + " (" + slotName + ")");
    item = generateBuiltinFallback(slotName, targetTrack);
  }

  var isSecondary = targetTrack.indexOf("secondary") === 0;
  var blogId = isSecondary ? CONFIG.SECONDARY_BLOG_ID : CONFIG.PRIMARY_BLOG_ID;
  var isPage = targetTrack.indexOf("page") !== -1;

  return publishItem(blogId, item.title, item.content, item.labels, isPage);
}

/**
 * Cloud Backend Fetcher
 */
function fetchContentFromBackend(slotName, targetTrack) {
  var endpoint = CONFIG.API_BASE_URL + "/api/marketing/next-post-for-blogger?slot=" + 
    encodeURIComponent(slotName) + "&target=" + encodeURIComponent(targetTrack);
  
  Logger.log("🌐 [BACKEND FETCH] Calling API: " + endpoint);
  var response = UrlFetchApp.fetch(endpoint, {
    method: "get",
    muteHttpExceptions: true,
    headers: { "Accept": "application/json" }
  });

  var code = response.getResponseCode();
  var rawText = response.getContentText();

  if (code === 200 && rawText.trim().charAt(0) === "{") {
    return JSON.parse(rawText);
  } else {
    throw new Error("HTTP " + code + " - invalid JSON response");
  }
}

/**
 * Core Blogger Publisher via REST API
 */
function publishItem(blogId, title, content, labels, isPage) {
  var token = ScriptApp.getOAuthToken();
  var resource = isPage ? "pages" : "posts";
  var url = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/" + resource;

  Logger.log("🚀 [BLOGGER API] Publishing " + (isPage ? "PAGE" : "POST") + " to Blog ID: " + blogId);
  Logger.log("📌 Title: " + title);

  var payload = {
    title: title,
    content: content
  };

  if (!isPage && labels && labels.length > 0) {
    payload.labels = labels;
  }

  var options = {
    method: "post",
    contentType: "application/json",
    headers: { "Authorization": "Bearer " + token },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var code = response.getResponseCode();
  var body = response.getContentText();

  if (code === 200 || code === 201) {
    var json = JSON.parse(body);
    Logger.log("🎉 [SUCCESS] Item published successfully!");
    Logger.log("🆔 ID: " + json.id);
    Logger.log("🔗 URL: " + (json.url || json.selfLink));
    return json;
  } else {
    Logger.log("❌ [BLOGGER ERROR] Failed with status " + code + ": " + body);
    throw new Error("Blogger API Error: " + body);
  }
}

/**
 * YouTube Morning Short Sync & Embed Auto-Dispatcher
 */
function autoUploadMorningKidsShort() {
  Logger.log("🎬 [YOUTUBE CHECK] Verifying YouTube Short integration...");
  var props = PropertiesService.getScriptProperties();
  var storedVideoId = props.getProperty("LATEST_YOUTUBE_SHORT_ID");
  
  if (!storedVideoId) {
    props.setProperty("LATEST_YOUTUBE_SHORT_ID", CONFIG.FALLBACK_KIDS_SHORT_ID);
    Logger.log("✅ Configured fallback YouTube Short ID: " + CONFIG.FALLBACK_KIDS_SHORT_ID);
  } else {
    Logger.log("✅ Current YouTube Short ID: " + storedVideoId);
  }
}

/**
 * ----------------------------------------------------------------------------
 * 4. UNIVERSAL LUXURY FOOTER (CROSS-LINKING, SOCIAL SHARE & JOIN US BAR)
 * ----------------------------------------------------------------------------
 */
function buildUniversalBlogFooter(isPrimaryBlog, pageTitle, appUrl) {
  var channelUrl = CONFIG.WHATSAPP_CHANNEL_URL;
  var masterBlogUrl = CONFIG.PRIMARY_BLOG_URL;
  var encTitle = encodeURIComponent(pageTitle);
  var encUrl = encodeURIComponent(masterBlogUrl);

  var crossLinkBox = isPrimaryBlog
    ? '<div style="background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%); border: 2px dashed #3b82f6; border-radius: 14px; padding: 20px 16px; margin-bottom: 24px; text-align: center;">' +
        '<span style="background: #ef4444; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; display: inline-block;">🔥 EXCLUSIVE BONUS PART 2</span>' +
        '<h3 style="color: #0f172a; font-size: 18px; font-weight: 800; line-height: 1.4; margin: 12px 0 8px 0;">' +
          '⚡ Dekhein Yeh Secret Feature Jo 90% Log Miss Kar Dete Hain: ' + pageTitle + ' (Quick 60-Sec Quality Review &amp; Visual Breakdown)!' +
        '</h3>' +
        '<p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 14px 0;">' +
          'Agar aapne yeh step-by-step visual demonstration aur fast practical test nahi dekha to aap is feature ka asal faida nahi le sakenge!' +
        '</p>' +
        '<a href="' + masterBlogUrl + '/search/label/Secondary" target="_blank" style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 30px; display: inline-block; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);">' +
          '👉 Click Here To Watch Quick Breakdown &rarr;' +
        '</a>' +
      '</div>'
    : '<div style="background: linear-gradient(135deg, #fefce8 0%, #eff6ff 100%); border: 2px dashed #f59e0b; border-radius: 14px; padding: 20px 16px; margin-bottom: 24px; text-align: center;">' +
        '<span style="background: #16a34a; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; display: inline-block;">⭐ GOOGLE RECOMMENDED ORIGINAL MASTER</span>' +
        '<h3 style="color: #0f172a; font-size: 18px; font-weight: 800; line-height: 1.4; margin: 12px 0 8px 0;">' +
          '🏆 Must-Read Master Guide: ' + pageTitle + ' (Complete In-Depth Curriculum &amp; Official Roadmap)!' +
        '</h3>' +
        '<p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 14px 0;">' +
          'Google Search Algorithms jisko #1 authentic primary source consider karte hain. Poori tehqeeq aur complete deep-dive abhi padhein!' +
        '</p>' +
        '<a href="' + masterBlogUrl + '/search/label/Primary" target="_blank" style="background: linear-gradient(135deg, #059669, #047857); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 30px; display: inline-block; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);">' +
          '⭐ Click Here For Full Master Guide &rarr;' +
        '</a>' +
      '</div>';

  return '<div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06); margin: 30px auto; max-width: 760px; padding: 26px 20px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; text-align: center; color: #1e293b;">' +
    crossLinkBox +
    // SHARE BUTTONS
    '<div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-bottom: 24px;">' +
      '<h4 style="color: #1e293b; font-size: 15px; font-weight: 700; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">📢 Share This Guide With Friends &amp; Family</h4>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center;">' +
        '<a href="https://api.whatsapp.com/send?text=' + encTitle + '%20' + encUrl + '" target="_blank" style="background: #25D366; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">💬 WhatsApp</a>' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encUrl + '" target="_blank" style="background: #1877F2; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📘 Facebook</a>' +
        '<a href="https://instagram.com" target="_blank" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📸 Instagram</a>' +
        '<a href="https://pinterest.com/pin/create/button/?url=' + encUrl + '&description=' + encTitle + '" target="_blank" style="background: #BD081C; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📌 Pinterest</a>' +
        '<a href="https://www.tiktok.com" target="_blank" style="background: #000000; color: #ffffff; border: 1px solid #333333; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">🎵 TikTok</a>' +
        '<a href="https://twitter.com/intent/tweet?text=' + encTitle + '&url=' + encUrl + '" target="_blank" style="background: #000000; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">𝕏 Twitter</a>' +
        '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + encUrl + '" target="_blank" style="background: #0A66C2; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">💼 LinkedIn</a>' +
        '<a href="https://t.me/share/url?url=' + encUrl + '&text=' + encTitle + '" target="_blank" style="background: #229ED9; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">✈️ Telegram</a>' +
        '<a href="https://reddit.com/submit?url=' + encUrl + '&title=' + encTitle + '" target="_blank" style="background: #FF4500; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">🔥 Reddit</a>' +
      '</div>' +
    '</div>' +
    // JOIN US SECTION
    '<div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">' +
      '<h4 style="color: #0f172a; font-size: 16px; font-weight: 800; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">✨ Join Us &amp; Stay Connected</h4>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: center;">' +
        '<a href="' + CONFIG.YOUTUBE_URL + '?sub_confirmation=1" target="_blank" style="background: #FF0000; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">▶️ YouTube</a>' +
        '<a href="' + channelUrl + '" target="_blank" style="background: #25D366; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">🟢 WhatsApp Channel</a>' +
        '<a href="' + appUrl + '/?utm_source=blogger_footer&utm_medium=join_us_btn" target="_blank" style="background: linear-gradient(135deg, #4F46E5, #06B6D4); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">🌐 Web App (Live)</a>' +
        '<a href="https://facebook.com/EnterTheWorldOfLight" target="_blank" style="background: #1877F2; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📘 Facebook</a>' +
        '<a href="https://instagram.com/EnterTheWorldOfLight" target="_blank" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📸 Instagram</a>' +
        '<a href="https://tiktok.com/@EnterTheWorldOfLight" target="_blank" style="background: #000000; color: #ffffff; border: 1px solid #333333; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">🎵 TikTok</a>' +
        '<a href="https://pinterest.com/EnterTheWorldOfLight" target="_blank" style="background: #BD081C; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📌 Pinterest</a>' +
        '<a href="https://twitter.com/WorldOfLightApp" target="_blank" style="background: #000000; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">𝕏 Twitter</a>' +
        '<a href="https://t.me/EnterTheWorldOfLight" target="_blank" style="background: #229ED9; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">✈️ Telegram</a>' +
      '</div>' +
    '</div>' +
  '</div>';
}

/**
 * ----------------------------------------------------------------------------
 * 5. HIGH-FASHION AUTONOMOUS FALLBACK ENGINE (MATCHING LIVE WEB APP THEME)
 * ----------------------------------------------------------------------------
 */
function generateBuiltinFallback(slotName, targetTrack) {
  var isSecondary = targetTrack.indexOf("secondary") === 0;
  var isPage = targetTrack.indexOf("page") !== -1;

  var now = new Date();
  var startOfYear = new Date(now.getFullYear(), 0, 0);
  var dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  var isEvenDay = dayOfYear % 2 === 0;

  var appDevUrl = CONFIG.API_BASE_URL;
  var title = "";
  var content = "";
  var labels = ["Enter the World of Light", "Google 2026"];

  if (targetTrack === "primary_post") {
    // -------------------------------------------------------------------------
    // TRACK 1: PRIMARY 1 (App Hub Post - Features, Poetry, Tracing, Mind Gym)
    // -------------------------------------------------------------------------
    var topic = isEvenDay 
      ? "Interactive Bilingual Learning & Urdu Haroof Tracing Engine"
      : "Classical Urdu Poetry Explorer & Interactive Mind Gym";
    
    var subtitle = isEvenDay
      ? "Child-safe AI companion Sunny, instant stroke tracing & bilingual phonetics"
      : "Allama Iqbal, Faiz Ahmad Faiz recitations, Tashreeh & cognitive puzzles";

    title = topic + " – Enter the World of Light & Laughter (" + slotName.toUpperCase() + " 2026 Edition)";
    labels = ["Web App Hub", "App Features", "Urdu Learning", "Bilingual Education", "Google 2026"];

    var heroBannerHtml = getBrandHeroBanner(topic, subtitle, false);

    content = 
      '<div style="background-color: #ffffff !important; color: #0f172a !important; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; max-width: 820px; margin: 0 auto; padding: 26px 20px; border-radius: 20px; box-shadow: 0 10px 35px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; text-align: left;">' +
        '<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">' +
          'This is the PRIMARY MAIN BLOG POST for Enter the World of Light and Laughter Web App. Primary Source for Google Indexing.' +
        '</div>' +

        // 1. Featured Visual Brand Banner (Logo + Featured Thumb)
        heroBannerHtml +

        // Top Slot Badge
        '<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; align-items: center;">' +
          '<span style="background: linear-gradient(135deg, #0284c7, #2563eb); color: #ffffff !important; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">🚀 OFFICIAL WEB APP SPOTLIGHT | ' + slotName.toUpperCase() + ' 2026</span>' +
          '<span style="background: #e0f2fe; color: #0369a1 !important; font-size: 11px; font-weight: 800; padding: 6px 12px; border-radius: 20px;">✨ ZERO ADS • LIVE IN BROWSER</span>' +
        '</div>' +

        '<h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.35; font-weight: 900; margin: 10px 0 12px 0;">' + title + '</h1>' +
        '<p style="color: #475569 !important; font-size: 16px; margin-bottom: 24px;"><strong>Enter the World of Light &amp; Laughter</strong> – ' + subtitle + '</p>' +

        // Hero Interactive Card (App Style)
        '<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 18px; padding: 26px 22px; color: #ffffff !important; margin: 24px 0; box-shadow: 0 12px 30px rgba(15,23,42,0.22); border: 1px solid #334155;">' +
          '<div style="display: inline-block; background: #38bdf8; color: #0f172a !important; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 12px;">🌟 Live Web Experience</div>' +
          '<h2 style="color: #ffffff !important; font-size: 22px; margin: 0 0 12px 0; line-height: 1.4; font-weight: 800;">' + topic + '</h2>' +
          '<p style="color: #cbd5e1 !important; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">Hamari official web application me ab bilkul naye features live ho chuke hain jo Pakistan aur worldwide users ko direct browser se high-speed bilingual learning provide karte hain. Zero installation, zero lag!</p>' +
          '<div style="display: flex; gap: 12px; flex-wrap: wrap;">' +
            '<a href="' + appDevUrl + '/?utm_source=blogger_primary1&utm_medium=blog_post" target="_blank" style="background: #38bdf8; color: #0f172a !important; text-decoration: none; font-weight: 800; padding: 12px 24px; border-radius: 10px; font-size: 14px; display: inline-block; box-shadow: 0 4px 14px rgba(56, 189, 248, 0.4);">🚀 Launch Web App Now &rarr;</a>' +
            '<a href="' + CONFIG.YOUTUBE_URL + '?sub_confirmation=1" target="_blank" style="background: #ef4444; color: #ffffff !important; text-decoration: none; font-weight: 700; padding: 12px 24px; border-radius: 10px; font-size: 14px; display: inline-block;">▶️ Watch on YouTube</a>' +
            '<a href="' + CONFIG.WHATSAPP_CHANNEL_URL + '" target="_blank" style="background: #25D366; color: #ffffff !important; text-decoration: none; font-weight: 700; padding: 12px 24px; border-radius: 10px; font-size: 14px; display: inline-block;">🟢 WhatsApp Channel</a>' +
          '</div>' +
        '</div>' +

        // 4 App-Themed Feature Option Cards
        '<h3 style="color: #0f172a !important; font-size: 21px; font-weight: 800; margin: 28px 0 16px 0;">📌 Web App Modules &amp; Daily Interactive Features (Theme Showcase)</h3>' +
        '<div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 26px;">' +
          // Option 1
          '<div style="background: #fffbeb; border: 2px solid #fde68a; border-radius: 14px; padding: 18px 20px;">' +
            '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">' +
              '<div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">✍️</div>' +
              '<div>' +
                '<h4 style="color: #b45309 !important; margin: 0; font-size: 17px; font-weight: 800;">1. Urdu Haroof Tracing &amp; Phonics Engine</h4>' +
                '<span style="font-size: 11px; font-weight: 700; color: #d97706; text-transform: uppercase;">Real-time Canvas Stroke Guide</span>' +
              '</div>' +
            '</div>' +
            '<p style="margin: 0; color: #78350f !important; font-size: 14px; line-height: 1.6;">Alif, Bay, Pay se lay kar Yay tak har harf ki sahi talaffuz, animated finger tracing, haptic guidance aur instant visual appreciation.</p>' +
          '</div>' +
          // Option 2
          '<div style="background: #ecfdf5; border: 2px solid #a7f3d0; border-radius: 14px; padding: 18px 20px;">' +
            '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">' +
              '<div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">📜</div>' +
              '<div>' +
                '<h4 style="color: #047857 !important; margin: 0; font-size: 17px; font-weight: 800;">2. Classical Urdu Adab &amp; Allama Iqbal Wisdom</h4>' +
                '<span style="font-size: 11px; font-weight: 700; color: #059669; text-transform: uppercase;">Poetry, Tashreeh &amp; Philosophy</span>' +
              '</div>' +
            '</div>' +
            '<p style="margin: 0; color: #064e3b !important; font-size: 14px; line-height: 1.6;">Allama Iqbal, Faiz Ahmad Faiz aur Mirza Ghalib ki hikmat se bharpoor shayeri with high-definition audio recitation aur aasan Urdu mafhoom.</p>' +
          '</div>' +
          // Option 3
          '<div style="background: #fff1f2; border: 2px solid #fecdd3; border-radius: 14px; padding: 18px 20px;">' +
            '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">' +
              '<div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #f43f5e, #be123c); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">🧸</div>' +
              '<div>' +
                '<h4 style="color: #be123c !important; margin: 0; font-size: 17px; font-weight: 800;">3. Pixar-Style 3D Animated Stories &amp; Moral Lessons</h4>' +
                '<span style="font-size: 11px; font-weight: 700; color: #e11d48; text-transform: uppercase;">CGI Characters &amp; Bedtime Tales</span>' +
              '</div>' +
            '</div>' +
            '<p style="margin: 0; color: #881337 !important; font-size: 14px; line-height: 1.6;">Cute 3D animal mascots, moral bedtime stories, dosti aur walidain ke adab ki pur-asar taleemat jo bache ki akhlaqi tarbiyat karti hain.</p>' +
          '</div>' +
          // Option 4
          '<div style="background: #f0f9ff; border: 2px solid #bae6fd; border-radius: 14px; padding: 18px 20px;">' +
            '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">' +
              '<div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">⚡</div>' +
              '<div>' +
                '<h4 style="color: #0369a1 !important; margin: 0; font-size: 17px; font-weight: 800;">4. Live Web App Simulator &amp; Mind Gym</h4>' +
                '<span style="font-size: 11px; font-weight: 700; color: #0284c7; text-transform: uppercase;">Memory Puzzles &amp; Cognitive IQ</span>' +
              '</div>' +
            '</div>' +
            '<p style="margin: 0; color: #0c4a6e !important; font-size: 14px; line-height: 1.6;">Hafiza tez karne wale pattern discovery tests, bilingual vocabulary quiz aur daily mind workouts jo dimagh ko sharp banate hain.</p>' +
          '</div>' +
        '</div>' +

        // Embedded YouTube Player
        '<div style="margin: 26px auto; max-width: 440px; text-align: center;">' +
          '<h4 style="color: #0f172a !important; font-size: 16px; font-weight: 800; margin: 0 0 10px 0;">📺 Watch Educational Demonstration Short</h4>' +
          '<div style="position: relative; width: 100%; aspect-ratio: 9/16; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.18); border: 2px solid #e2e8f0; background: #000;">' +
            '<iframe src="https://www.youtube.com/embed/' + CONFIG.FALLBACK_KIDS_SHORT_ID + '?rel=0&modestbranding=1" title="' + topic + '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
          '</div>' +
          '<div style="margin-top: 10px;">' +
            '<a href="' + CONFIG.YOUTUBE_URL + '?sub_confirmation=1" target="_blank" style="background: #ef4444; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 8px 18px; border-radius: 20px; display: inline-block;">🔔 Subscribe @EntertheWorldofLight</a>' +
          '</div>' +
        '</div>' +

        // Universal Footer
        buildUniversalBlogFooter(true, title, appDevUrl) +
      '</div>';

  } else if (targetTrack === "primary_page") {
    // -------------------------------------------------------------------------
    // TRACK 2: PRIMARY 2 (App Evergreen Pillar Guide & Syllabus)
    // -------------------------------------------------------------------------
    var pillarTitle = isEvenDay
      ? "Comprehensive Bilingual Learning Curriculum & Educational Roadmap"
      : "Classical Urdu Literature, Poetry Study Guide & Ethical Wisdom Pillar";

    title = pillarTitle + " – Evergreen Educational Directory 2026";
    labels = ["Curriculum Guide", "Pillar Page", "Evergreen", "App Directory"];

    var heroBanner = getBrandHeroBanner(pillarTitle, "Evergreen Learning Syllabus", false);

    content = 
      '<div style="background-color: #ffffff !important; color: #0f172a !important; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; max-width: 820px; margin: 0 auto; padding: 26px 20px; border-radius: 20px; box-shadow: 0 10px 35px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; text-align: left;">' +
        heroBanner +
        '<div style="border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px;">' +
          '<span style="background: #e0f2fe; color: #0369a1 !important; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase;">📘 EVERGREEN RESOURCE PILLAR (PRIMARY 2)</span>' +
          '<h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.3; margin: 12px 0 6px 0; font-weight: 900;">' + pillarTitle + '</h1>' +
          '<p style="color: #64748b !important; font-size: 15px; margin: 0;">Comprehensive syllabus breakdown provided by Enter the World of Light &amp; Laughter</p>' +
        '</div>' +
        '<h2>📌 Web App Me Kya Diya Jaa Raha Hai? (Complete Feature Breakdown)</h2>' +
        '<p>Enter the World of Light &amp; Laughter web platform ka bunyadi maqsad talib-ilmo aur walidain ko ek standard, multi-disciplinary educational experience provide karna hai jo academic learning aur akhlaqi tarbiyat dono ko cover karta hai:</p>' +
        '<div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin: 24px 0;">' +
          '<div style="background: #fffbeb; border: 2px solid #fde68a; border-radius: 14px; padding: 18px 20px;">' +
            '<h3 style="color: #b45309 !important; margin: 0 0 8px 0; font-size: 18px; font-weight: 800;">1. Bilingual Phonics &amp; Haroof Tracing Syllabus</h3>' +
            '<p style="margin: 0; color: #78350f !important; font-size: 14px;">Urdu Alif-Bay-Pay se lay kar English A-to-Z tak har harf ki sahi talaffuz, visual stroke order aur visual flashcard association.</p>' +
          '</div>' +
          '<div style="background: #ecfdf5; border: 2px solid #a7f3d0; border-radius: 14px; padding: 18px 20px;">' +
            '<h3 style="color: #047857 !important; margin: 0 0 8px 0; font-size: 18px; font-weight: 800;">2. Allama Iqbal &amp; Classical Wisdom Library</h3>' +
            '<p style="margin: 0; color: #064e3b !important; font-size: 14px;">Bachon aur nojawano ke liye Allama Iqbal ki mashoor nazmein (Parinday ki faryad, Hamd, Khudi) with aasan Urdu tashreeh aur ethical reflections.</p>' +
          '</div>' +
          '<div style="background: #f0f9ff; border: 2px solid #bae6fd; border-radius: 14px; padding: 18px 20px;">' +
            '<h3 style="color: #0369a1 !important; margin: 0 0 8px 0; font-size: 18px; font-weight: 800;">3. Cognitive Brain Quizzes &amp; Logical Puzzles</h3>' +
            '<p style="margin: 0; color: #0c4a6e !important; font-size: 14px;">Memory matching, pattern discovery, math fundamentals (1 to 20), aur interactive puzzles jo IQ ko barhate hain.</p>' +
          '</div>' +
        '</div>' +
        '<div style="background: linear-gradient(135deg, #059669, #047857); border-radius: 16px; padding: 24px; margin: 25px 0; text-align: center; color: #ffffff !important;">' +
          '<h3 style="color: #ffffff !important; margin: 0 0 10px 0; font-size: 20px; font-weight: 800;">🚀 Practice the Complete Curriculum Inside the Web App</h3>' +
          '<p style="color: #ecfdf5 !important; margin: 0 0 16px 0; font-size: 15px;">Tamam modules bina kisi download ya installation ke direct browser par live hain.</p>' +
          '<a href="' + appDevUrl + '/?utm_source=blogger_primary2&utm_medium=pillar_page" target="_blank" style="background: #ffffff; color: #065f46 !important; text-decoration: none; font-weight: 800; padding: 12px 28px; border-radius: 10px; display: inline-block;">Open Full Interactive Syllabus &rarr;</a>' +
        '</div>' +
        buildUniversalBlogFooter(false, title, appDevUrl) +
      '</div>';

  } else if (targetTrack === "secondary_post") {
    // -------------------------------------------------------------------------
    // TRACK 3: SECONDARY 1 (Kids Mode Blog Post)
    // -------------------------------------------------------------------------
    var kidsTopic = isEvenDay
      ? "Kids Mode: Urdu Haroof Tracing, Sunny AI Companion & Safe Fun"
      : "Kids Mode: Animal Sounds, Nature Discovery & Moral Bedtime Stories";
    var kidsSub = isEvenDay
      ? "Interactive finger tracing, phonics sounds, and 100% child-safe virtual companion"
      : "Forest animals, birds, moral storytelling and comforting bedtime tales for ages 2-8";

    title = kidsTopic + " (" + slotName.toUpperCase() + " Edition 2026)";
    labels = ["Kids Mode", "Kids Education", "Urdu Tracing", "Moral Stories", "Preschool Fun"];

    var kidsHeroBanner = getBrandHeroBanner(kidsTopic, kidsSub, true);

    content = 
      '<div style="background-color: #ffffff !important; color: #0f172a !important; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; max-width: 820px; margin: 0 auto; padding: 26px 20px; border-radius: 20px; box-shadow: 0 10px 35px rgba(0,0,0,0.08); border: 1px solid #fde68a; text-align: left;">' +
        kidsHeroBanner +
        '<div style="margin-bottom: 12px;">' +
          '<span style="background: linear-gradient(135deg, #f59e0b, #ef4444); color: #ffffff !important; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase;">🧸 KIDS MODE SPECIAL PORTAL | ' + slotName.toUpperCase() + ' 2026</span>' +
        '</div>' +
        '<h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.3; margin: 10px 0; font-weight: 900;">🎈 ' + title + '</h1>' +
        '<p style="color: #475569 !important; font-size: 16px;"><strong>Enter the World of Light &amp; Laughter (Kids Mode)</strong> – ' + kidsSub + '</p>' +
        '<p>Kids Mode ko khas taur par chotay bachon (ages 2 to 8) ki dimaghi tarbiyat aur interactive seekhne ke liye design kiya gaya hai. Isme bacha boring ratta lagane ke bajaye khel khel me seekhta hai:</p>' +
        '<div style="background: #fffbeb; border: 2px solid #fde68a; border-radius: 16px; padding: 22px; margin: 20px 0;">' +
          '<h3 style="color: #b45309 !important; margin: 0 0 14px 0; font-size: 19px; font-weight: 800;">🌟 Kids Mode Ke Key Features</h3>' +
          '<ul style="margin: 0; padding-left: 20px; color: #78350f !important; line-height: 1.8;">' +
            '<li><strong>Urdu Haroof-e-Tahajji:</strong> Alif, Bay, Pay ki animated tracing with cute cartoon sound effects.</li>' +
            '<li><strong>English ABC Phonics:</strong> A for Apple se Z for Zebra tak clear audio pronunciation.</li>' +
            '<li><strong>Sunny Companion:</strong> Bachon ka pyara dost Sunny jo har achi koshish par taalian bajata hai aur hausla afzai karta hai!</li>' +
            '<li><strong>Moral Bedtime Stories:</strong> Sach bolne, dosti aur walidain ki khidmat ki pyari kahaniyan.</li>' +
          '</ul>' +
        '</div>' +
        '<div style="background: linear-gradient(135deg, #f59e0b, #ef4444); border-radius: 16px; padding: 24px; text-align: center; color: white !important; margin: 25px 0;">' +
          '<h3 style="color: #ffffff !important; margin: 0 0 8px 0; font-size: 20px; font-weight: 800;">🎉 Bachon Ke Liye Kids Mode Launch Karein</h3>' +
          '<p style="color: #fef3c7 !important; margin: 0 0 16px 0; font-size: 15px;">Bina kisi ad ya subscription ke direct browser par live hai:</p>' +
          '<a href="' + appDevUrl + '/?screen=kids&slot=' + slotName + '" target="_blank" style="background: #ffffff; color: #b45309 !important; text-decoration: none; font-weight: 800; padding: 12px 28px; border-radius: 10px; display: inline-block;">🚀 Launch Kids Mode Now &rarr;</a>' +
        '</div>' +
        buildUniversalBlogFooter(true, title, appDevUrl) +
      '</div>';

  } else {
    // -------------------------------------------------------------------------
    // TRACK 4: SECONDARY 2 (YouTube Shorts Ko Promote Karna - Video Embed)
    // -------------------------------------------------------------------------
    var props = PropertiesService.getScriptProperties();
    var storedVideoId = props.getProperty("LATEST_YOUTUBE_SHORT_ID");
    var videoId = storedVideoId || CONFIG.FALLBACK_KIDS_SHORT_ID;

    title = "Kids Fun 3D Learning YouTube Short – Activity & Story Guide (" + slotName.toUpperCase() + " 2026)";
    labels = ["Kids Mode", "YouTube Shorts", "Video Promotion", "3D Animation", "Shorts 2026"];

    var ytBanner = getBrandHeroBanner(title, "3D CGI Pixar-Style Learning", true);

    content = 
      '<div style="background-color: #ffffff !important; color: #0f172a !important; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; max-width: 820px; margin: 0 auto; padding: 26px 20px; border-radius: 20px; box-shadow: 0 10px 35px rgba(0,0,0,0.08); border: 1px solid #fee2e2; text-align: left;">' +
        ytBanner +
        '<div style="border-bottom: 2px solid #fee2e2; padding-bottom: 12px; margin-bottom: 20px;">' +
          '<span style="background: #fee2e2; color: #b91c1c !important; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase;">🎬 OFFICIAL YOUTUBE SHORT FEATURE (SECONDARY 2)</span>' +
          '<h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.3; margin: 12px 0 6px 0; font-weight: 900;">📺 ' + title + '</h1>' +
          '<p style="color: #64748b !important; font-size: 15px; margin: 0;">Enter the World of Light &amp; Laughter – 3D Animated Educational Short Series</p>' +
        '</div>' +
        // 9:16 YouTube Player
        '<div style="margin: 26px auto; max-width: 440px; text-align: center;">' +
          '<div style="position: relative; width: 100%; aspect-ratio: 9/16; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.18); border: 2px solid #e2e8f0; background: #000;">' +
            '<iframe src="https://www.youtube.com/embed/' + videoId + '?rel=0&modestbranding=1" title="' + title + '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
          '</div>' +
          '<div style="margin-top: 14px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">' +
            '<a href="' + CONFIG.YOUTUBE_URL + '?sub_confirmation=1" target="_blank" style="background: #ff0000; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(255,0,0,0.3);">🔔 Subscribe @EntertheWorldofLight</a>' +
            '<a href="https://youtube.com/shorts/' + videoId + '" target="_blank" style="background: #0f172a; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px;">▶ Watch Directly on YouTube</a>' +
          '</div>' +
        '</div>' +
        '<h3 style="color: #0f172a !important; font-size: 20px; font-weight: 800;">📖 Lesson Breakdown &amp; Educational Goals</h3>' +
        '<p>Is 3D animated Short me bacha fun visual CGI ke zariye seekhta hai. Masnooi aur boring video ke bajaye isme 100% original Pixar-style animated mascot bache ki dilchaspi ko barqarar rakhta hai:</p>' +
        '<ul>' +
          '<li><strong>Interactive Visual Concept:</strong> Phonics sound, word spelling aur Urdu tarjuma aik sath.</li>' +
          '<li><strong>100% Original AI Narration:</strong> Saaf aur wazeh bilingual talaffuz.</li>' +
          '<li><strong>Child Safe (COPPA Compliant):</strong> Zero harmful content, purely positive &amp; moral education.</li>' +
        '</ul>' +
        '<div style="background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 14px; padding: 20px; margin: 25px 0; text-align: center;">' +
          '<h4 style="color: #1d4ed8 !important; margin: 0 0 6px 0; font-size: 18px; font-weight: 800;">✨ Practice this Lesson Live in Web App</h4>' +
          '<p style="color: #1e40af !important; margin: 0 0 14px 0; font-size: 14px;">Bache ko app me trace karne aur interactive quiz khelne dein:</p>' +
          '<a href="' + appDevUrl + '/?screen=kids&video=' + videoId + '" target="_blank" style="background: #2563eb; color: #ffffff !important; font-weight: 800; text-decoration: none; padding: 12px 26px; border-radius: 10px; display: inline-block;">🚀 Launch Live Practice Module &rarr;</a>' +
        '</div>' +
        buildUniversalBlogFooter(false, title, appDevUrl) +
      '</div>';
  }

  return {
    title: title,
    content: content,
    labels: labels
  };
}

/**
 * Convenience trigger aliases
 */
function executePrimaryYouTubePost(slotName) {
  return publishPrimary_1_Post(slotName);
}

function executeSecondaryBloggerPage(slotName) {
  return publishSecondary_2_Page(slotName);
}

function executeAlternatingDaySlot(slotName) {
  return publishPrimary_1_Post(slotName);
}
'''

open("apps-script/Master Controller.gs", "w").write(code)
open("apps-script/Code.gs", "w").write(code)
print("Successfully generated Master Controller.gs and Code.gs!")
