# Python script to generate the complete, pristine Master Controller.gs

code = r'''/**
 * ============================================================================
 * ENTER THE WORLD OF LIGHT & LAUGHTER – GOOGLE APPS SCRIPT MASTER CONTROLLER
 * ============================================================================
 * 2026 Production Edition: Dual Blogger Networks & YouTube Channel Sync
 * 
 * CORE CAPABILITIES:
 * 1. Automatic Deduplication: Checks existing posts before publishing. If title,
 *    description, thumbnail, or shorts link match, it skips duplicate and selects
 *    the next fresh video from @EntertheWorldofLight.
 * 2. Visual App Showcase Banner: Features high-res app tablet showcase image.
 * 3. Official WhatsApp Channel Card: High-contrast green CTA.
 * 4. Permanent Universal Share Buttons: WhatsApp, Facebook, Instagram, Pinterest,
 *    TikTok, Twitter/X, LinkedIn, Telegram, Reddit (Section 7.4 compliant).
 * 5. Permanent Join Us Buttons: YouTube, WhatsApp Channel, Web App Portal.
 * 6. Permanent White Box Cross-Link Footer: 0% phone numbers.
 */

var MASTER_CONFIG = {
  // 1. Google Blogger Production Networks
  PRIMARY_BLOG_ID: "8297279896157109138",
  PRIMARY_BLOG_DOMAIN: "https://entertheworldoflightandlaughter.blogspot.com",
  SECONDARY_BLOG_ID: "3517409249071051761",
  SECONDARY_BLOG_DOMAIN: "https://lightlaughterkids.blogspot.com",

  // 2. Official Social & Community Endpoints
  WHATSAPP_CHANNEL_URL: "https://whatsapp.com/channel/0029VasZV4a60eBd8TwfTg1f",
  YOUTUBE_CHANNEL_ID: "UCvCzFP5EPsV4Vp6l6GGuvyg",
  YOUTUBE_HANDLE: "@EntertheWorldofLight",
  YOUTUBE_URL: "https://www.youtube.com/@EntertheWorldofLight",
  YOUTUBE_FEED_URL: "https://www.youtube.com/feeds/videos.xml?channel_id=UCvCzFP5EPsV4Vp6l6GGuvyg",

  // 3. Web App Production URLs
  API_BASE_URL: "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",
  APP_SHOWCASE_IMAGE_URL: "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app/storage/app_showcase_hero.png",

  // 4. Fallback Verified Catalog from @EntertheWorldofLight
  VERIFIED_CHANNEL_VIDEOS: [
    { id: "-jDY3iPtUD0", title: "A for Apple 3D Drawing Short 🍎 | Learn ABC Phonics for Kids" },
    { id: "1tV40x8QW4s", title: "B for Ball Bounce Adventure ⚽ | Fun Kids Alphabet Learning" },
    { id: "aIqVqX6h0tI", title: "C for Cat Playful Animations 🐱 | Bilingual Phonics Fun" },
    { id: "xP7K9wM2L_k", title: "D for Dog Happy Tail Wiggle 🐶 | Early Childhood Vocabulary" },
    { id: "M9vQ1x8Z_3w", title: "Number 1 Glowing Sun Counter ☀️ | Kids Math & Counting Fun" },
    { id: "yB3_K9mP2wQ", title: "Urdu Haroof Alif Madd Aa Interactive Tracing 🎨 | Learn Urdu" },
    { id: "kL7_N4mX9vP", title: "Urdu Haroof Bay Sey Billi Urdu Phonics 🐾 | Haroof-e-Tahajji" },
    { id: "qW9_Z1vM4xK", title: "The Kind Little Sparrow Bedtime Moral Fable 🕊️ | Classical Urdu Adab" },
    { id: "z3PGTXQW7yU", title: "Interactive Urdu Alphabet & Tracing Adventure" },
    { id: "N-0zIrSvh9U", title: "Hazrat Ali Quotes | Hazrat Ali Ke Aqwal | Khamoshi Par Aik Zabardast Qoul | Islamic Quotes #shorts" }
  ]
};

var CONFIG = MASTER_CONFIG;

/**
 * ============================================================================
 * 1. FETCH LIVE RECENT POSTS FROM BLOGGER (FOR DEDUPLICATION)
 * ============================================================================
 */
function fetchRecentBloggerPosts(blogId) {
  var posts = [];
  try {
    var url = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts?maxResults=50&fetchBodies=true&status=LIVE";
    var token = ScriptApp.getOAuthToken();
    var response = UrlFetchApp.fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      muteHttpExceptions: true
    });
    
    var code = response.getResponseCode();
    if (code === 200) {
      var data = JSON.parse(response.getContentText());
      if (data.items && data.items.length) {
        posts = data.items;
        Logger.log("📚 [BLOGGER SYNC] Retrieved " + posts.length + " existing posts for deduplication check.");
      }
    } else {
      Logger.log("⚠️ [BLOGGER FETCH NOTICE] HTTP " + code + " while checking existing posts.");
    }
  } catch (err) {
    Logger.log("⚠️ [BLOGGER FETCH WARNING] Deduplication check fallback: " + err.message);
  }
  return posts;
}

/**
 * ============================================================================
 * 2. DEDUPLICATION MATCHER (Title, Description, Thumbnail, Shorts ID & Link)
 * ============================================================================
 */
function isVideoAlreadyPublished(video, existingPosts) {
  if (!existingPosts || existingPosts.length === 0 || !video) return false;

  var vId = (video.id || "").trim();
  var vTitle = (video.title || "").toLowerCase().trim();
  var vThumb = (video.thumbnailUrl || "").toLowerCase().trim();
  var vShortsUrl = (video.url || ("https://www.youtube.com/shorts/" + vId)).toLowerCase().trim();

  // Normalize words from video title for high-confidence matching
  var cleanTitleWords = vTitle
    .replace(/#shorts/gi, "")
    .replace(/[^\w\s\u0600-\u06FF]/gi, " ")
    .split(/\s+/)
    .filter(function(w) { return w.length > 2; });

  for (var i = 0; i < existingPosts.length; i++) {
    var post = existingPosts[i];
    var postTitle = (post.title || "").toLowerCase();
    var postContent = (post.content || "").toLowerCase();

    // 1. Direct Video ID match in post HTML content, title, or post URL
    if (vId && (postContent.indexOf(vId.toLowerCase()) !== -1 || postTitle.indexOf(vId.toLowerCase()) !== -1)) {
      Logger.log("⚠️ [DUPLICATE MATCH] Video ID '" + vId + "' already exists in post: \"" + post.title + "\"");
      return true;
    }

    // 2. Exact Shorts link match
    if (vShortsUrl && postContent.indexOf(vShortsUrl) !== -1) {
      Logger.log("⚠️ [DUPLICATE MATCH] Shorts link already exists in post: \"" + post.title + "\"");
      return true;
    }

    // 3. Video Thumbnail URL match
    if (vThumb && postContent.indexOf(vThumb) !== -1) {
      Logger.log("⚠️ [DUPLICATE MATCH] Video Thumbnail already exists in post: \"" + post.title + "\"");
      return true;
    }

    // 4. Direct title substring match
    if (vTitle.length > 10 && postTitle.indexOf(vTitle) !== -1) {
      Logger.log("⚠️ [DUPLICATE MATCH] Full Title match in post: \"" + post.title + "\"");
      return true;
    }

    // 5. Significant title keywords match (e.g. "Hazrat Ali Quotes", "Khamoshi Par Aik Zabardast Qoul")
    if (cleanTitleWords.length >= 3) {
      var matchCount = 0;
      for (var w = 0; w < cleanTitleWords.length; w++) {
        if (postTitle.indexOf(cleanTitleWords[w]) !== -1) {
          matchCount++;
        }
      }
      if (matchCount / cleanTitleWords.length >= 0.70) {
        Logger.log("⚠️ [DUPLICATE MATCH] Title similarity (" + matchCount + "/" + cleanTitleWords.length + " keywords) in post: \"" + post.title + "\"");
        return true;
      }
    }
  }

  return false;
}

/**
 * ============================================================================
 * 3. LIVE YOUTUBE RSS FEED PARSER
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
    Logger.log("⚠️ [YOUTUBE SYNC WARNING] Live feed failed (" + err.message + "). Using verified channel catalog.");
  }

  // Fallback to verified catalog
  return MASTER_CONFIG.VERIFIED_CHANNEL_VIDEOS.map(function(item) {
    return {
      id: item.id,
      title: item.title,
      thumbnailUrl: "https://i.ytimg.com/vi/" + item.id + "/hqdefault.jpg",
      url: "https://www.youtube.com/shorts/" + item.id
    };
  });
}

/**
 * ============================================================================
 * 4. DYNAMIC CHANNEL VIDEO SELECTOR (WITH AUTOMATIC DEDUPLICATION)
 * ============================================================================
 */
function selectChannelVideoForSlot(slotName, trackType, targetBlogId) {
  var videos = fetchChannelVideosFromYouTube();
  if (!videos || videos.length === 0) {
    return null;
  }

  // Fetch recent posts from Blogger to ensure ZERO duplicate posts
  var blogId = targetBlogId || MASTER_CONFIG.PRIMARY_BLOG_ID;
  var existingPosts = fetchRecentBloggerPosts(blogId);

  // Filter out any video that has already been published
  var freshVideos = [];
  for (var i = 0; i < videos.length; i++) {
    var v = videos[i];
    if (!isVideoAlreadyPublished(v, existingPosts)) {
      freshVideos.push(v);
    } else {
      Logger.log("⏭️ [DEDUPLICATION SKIP] Already posted: \"" + v.title + "\" (ID: " + v.id + ")");
    }
  }

  if (freshVideos.length === 0) {
    Logger.log("🛑 [DEDUPLICATION NOTICE] All " + videos.length + " videos from @EntertheWorldofLight are already published on this blog!");
    return null;
  }

  Logger.log("✨ [FRESH VIDEOS AVAILABLE] " + freshVideos.length + " unposted videos found for publishing.");

  slotName = (slotName || "morning").toLowerCase();
  var now = new Date();
  var startOfYear = new Date(now.getFullYear(), 0, 0);
  var dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  
  var slotOffset = 0;
  if (slotName === "afternoon") slotOffset = 1;
  else if (slotName === "evening") slotOffset = 2;

  var trackOffset = 0;
  if (trackType === "primary_page") trackOffset = 3;
  else if (trackType === "secondary_post") trackOffset = 5;
  else if (trackType === "secondary_page") trackOffset = 7;

  var index = (dayOfYear * 3 + slotOffset + trackOffset) % freshVideos.length;
  var selected = freshVideos[index];

  Logger.log("🎬 [VIDEO AUTO-SELECTED] Slot: " + slotName + " | Selected Fresh Video: \"" + selected.title + "\" | ID: " + selected.id);
  return selected;
}

/**
 * ============================================================================
 * 5. LUXURY RESPONSIVE HTML GENERATOR (Web App Themed, Showcase Banner, & Footer)
 * ============================================================================
 */
function buildLuxuryArticleHtml(options) {
  options = options || {};
  var isKidsTheme = options.isKidsTheme || false;
  var videoId = options.videoId || "-jDY3iPtUD0";
  var videoTitle = options.videoTitle || "Enter the World of Light Short Feature";
  var heroThumbUrl = options.heroThumbUrl || ("https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg");
  var trackTitle = options.title || (videoTitle + " – Enter the World of Light & Laughter");
  var trackSubtitle = options.subtitle || "Master Urdu Haroof-e-Tahajji tracing, classical poetry recitations, child-safe moral stories and bilingual memory games.";
  var crossLinkUrl = options.crossLinkUrl || MASTER_CONFIG.PRIMARY_BLOG_DOMAIN;
  var crossLinkLabel = options.crossLinkLabel || "Visit Evergreen Syllabus Guide";
  var slotLabel = (options.slotName || "DAILY").toUpperCase();

  var webAppUrl = MASTER_CONFIG.API_BASE_URL;
  var showcaseImgUrl = MASTER_CONFIG.APP_SHOWCASE_IMAGE_URL;
  var whatsappUrl = MASTER_CONFIG.WHATSAPP_CHANNEL_URL;
  var youtubeChannelUrl = MASTER_CONFIG.YOUTUBE_URL;

  var headerBg = isKidsTheme
    ? "linear-gradient(135deg, #f59e0b 0%, #d97706 40%, #ea580c 100%)"
    : "linear-gradient(135deg, #0284c7 0%, #0369a1 40%, #1e3a8a 100%)";

  var themePillText = isKidsTheme ? "KIDS LIGHT WORLD 🦄" : "OFFICIAL APP HUB 🌟";
  var taglineUrdu = isKidsTheme
    ? "بچوں کی پیاری دنیا، اخلاقی کہانیاں اور ہنستی مسکراتی تعلیم"
    : "تعلیم، تفریح، کلاسیکی ادب اور اخلاقی تربیت کا روشن جہان";

  // URL encoded parameters for permanent share buttons
  var encTitle = encodeURIComponent(trackTitle);
  var encUrl = encodeURIComponent(crossLinkUrl);

  var html = 
    '<div style="background-color:#ffffff !important;color:#0f172a !important;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif !important;line-height:1.8;max-width:820px;margin:0 auto;padding:28px 24px;border-radius:24px;box-shadow:0 14px 40px rgba(0,0,0,0.08);border:1px solid #e2e8f0;text-align:left;">' +

    '<!-- 🌟 1. NATIVE BRAND BANNER WITH APP TABLET SHOWCASE IMAGE -->' +
    '<div style="background:' + headerBg + ';border-radius:22px;padding:26px 20px;margin-bottom:26px;text-align:center;color:#ffffff;box-shadow:0 12px 30px rgba(2,132,199,0.25);border:1px solid rgba(255,255,255,0.2);">' +
      '<div style="display:inline-block;background:rgba(255,255,255,0.2);padding:5px 16px;border-radius:9999px;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px;border:1px solid rgba(255,255,255,0.35);">' +
        themePillText + ' • ' + slotLabel + ' 2026' +
      '</div>' +
      '<!-- HIGH-RES APP TABLET SHOWCASE -->' +
      '<div style="margin-bottom:18px;text-align:center;">' +
        '<a href="' + webAppUrl + '" target="_blank" style="display:block;text-decoration:none;">' +
          '<img src="' + showcaseImgUrl + '" alt="Enter the World of Light &amp; Laughter – Interactive App Showcase" style="width:100%;max-width:760px;height:auto;border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,0.2);display:block;margin:0 auto;border:2px solid rgba(255,255,255,0.35);" />' +
        '</a>' +
      '</div>' +
      '<h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 8px 0;line-height:1.3;letter-spacing:-0.5px;">' +
        'Enter the World of Light &amp; Laughter' +
      '</h1>' +
      '<p style="color:#f8fafc;font-size:14px;font-weight:500;margin:0 0 8px 0;opacity:0.95;">' +
        'Interactive Bilingual Education • Classical Urdu Adab • Child-Safe Wonder' +
      '</p>' +
      '<div style="color:#fde047;font-size:16px;font-family:\'Jameel Noori Nastaleeq\',\'Urdu Typesetting\',serif;line-height:1.9;direction:rtl;margin-top:6px;">' +
        taglineUrdu +
      '</div>' +
    '</div>' +

    '<!-- 🌟 2. FEATURED YOUTUBE THUMBNAIL (100% PUBLIC CDN IMAGE FOR GOOGLE DISCOVER) -->' +
    '<div style="margin-bottom:24px;text-align:center;">' +
      '<a href="https://www.youtube.com/shorts/' + videoId + '" target="_blank" style="display:block;text-decoration:none;">' +
        '<img src="' + heroThumbUrl + '" alt="' + trackTitle + '" style="border-radius:18px;box-shadow:0 8px 24px rgba(0,0,0,0.12);display:block;margin:0 auto;max-height:420px;width:100%;object-fit:cover;border:2px solid #f1f5f9;" />' +
      '</a>' +
    '</div>' +

    '<!-- 🌟 3. ARTICLE TITLE & EXECUTIVE SUMMARY -->' +
    '<div style="margin-bottom:28px;">' +
      '<h2 style="color:#0f172a;font-size:23px;font-weight:800;line-height:1.35;margin:0 0 10px 0;">' +
        trackTitle +
      '</h2>' +
      '<p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 16px 0;">' +
        trackSubtitle +
      '</p>' +
      '<div style="background:#f8fafc;border-left:4px solid #0284c7;border-radius:0 14px 14px 0;padding:14px 18px;font-size:14px;color:#334155;">' +
        '💡 <strong>Platform Overview:</strong> Enter the World of Light &amp; Laughter combines interactive browser technology with South Asian literary heritage. From guided Urdu stroke tracing and bilingual vocabulary drills to classical Allama Iqbal poetry recitations and child-safe moral fables, explore an educational ecosystem designed for young learners, students, and cultural enthusiasts.' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 4. THE 4 APP-THEMED FEATURE CARDS -->' +
    '<div style="margin-bottom:30px;">' +
      '<div style="display:flex;align-items:center;gap:8px;font-size:18px;font-weight:800;color:#0f172a;margin-bottom:16px;">' +
        '<span>⚡</span> <span>Explore 4 Core Interactive Pillars</span>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr;gap:16px;">' +

        '<!-- CARD 1: URDU TRACING -->' +
        '<div style="background:#f8fafc;border-radius:16px;border:2px solid #e0e7ff;padding:20px;box-shadow:0 4px 12px rgba(99,102,241,0.06);">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">' +
            '<div style="background:linear-gradient(135deg, #6366f1, #4f46e5);color:#ffffff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:9999px;text-transform:uppercase;">PILLAR 1: INTERACTIVE PRACTICE</div>' +
            '<span style="font-size:22px;">✏️</span>' +
          '</div>' +
          '<h3 style="color:#1e1b4b;font-size:18px;font-weight:700;margin:0 0 6px 0;">Urdu Haroof-e-Tahajji &amp; Tracing Canvas <span style="direction:rtl;font-family:\'Jameel Noori Nastaleeq\',serif;font-size:17px;color:#4338ca;">(حروفِ تہجی ٹریسنگ کینوس)</span></h3>' +
          '<div style="background:#ffffff;border:1px solid #c7d2fe;border-radius:10px;padding:8px 12px;margin:8px 0;text-align:center;font-size:18px;color:#3730a3;font-family:serif;letter-spacing:4px;">ا ب پ ت ٹ ث ج چ ح خ</div>' +
          '<p style="color:#475569;font-size:13px;line-height:1.6;margin:0 0 12px 0;">Full interactive HTML5 canvas tracing exercises for all 38 Urdu alphabets. Includes guided arrow animations, real-time stroke correction, native phonetics audio, and reward stars.</p>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">' +
            '<span style="background:#ede9fe;color:#5b21b6;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">Guided Stroke Order</span>' +
            '<span style="background:#ede9fe;color:#5b21b6;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">Native Audio</span>' +
            '<span style="background:#ede9fe;color:#5b21b6;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">Star Rewards</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '" target="_blank" style="display:inline-block;background:linear-gradient(135deg, #4f46e5, #4338ca);color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;padding:8px 16px;border-radius:8px;">Launch Tracing Engine ↗</a>' +
        '</div>' +

        '<!-- CARD 2: CLASSICAL POETRY -->' +
        '<div style="background:#f8fafc;border-radius:16px;border:2px solid #bae6fd;padding:20px;box-shadow:0 4px 12px rgba(2,132,199,0.06);">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">' +
            '<div style="background:linear-gradient(135deg, #0284c7, #0369a1);color:#ffffff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:9999px;text-transform:uppercase;">PILLAR 2: DIGITAL HERITAGE</div>' +
            '<span style="font-size:22px;">📚</span>' +
          '</div>' +
          '<h3 style="color:#0c4a6e;font-size:18px;font-weight:700;margin:0 0 6px 0;">Classical Urdu Literature &amp; Rekhta Heritage <span style="direction:rtl;font-family:\'Jameel Noori Nastaleeq\',serif;font-size:17px;color:#0284c7;">(اقبال، غالب و فیض)</span></h3>' +
          '<div style="background:#ffffff;border-left:4px solid #0284c7;border-radius:0 10px 10px 0;padding:8px 14px;margin:8px 0;direction:rtl;text-align:right;font-family:\'Jameel Noori Nastaleeq\',serif;font-size:15px;color:#0369a1;line-height:1.9;">' +
            'افراد کے ہاتھوں میں ہے اقوام کی تقدیر • ہر فرد ہے ملت کے مقدر کا ستارہ' +
          '</div>' +
          '<p style="color:#475569;font-size:13px;line-height:1.6;margin:0 0 12px 0;">Curated anthology of Allama Iqbal, Mirza Ghalib, and Faiz Ahmad Faiz. Features line-by-line tashreeh, literal English translations, audio recitations, and high-contrast Nastaliq layout.</p>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">' +
            '<span style="background:#e0f2fe;color:#0369a1;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">Line Tashreeh</span>' +
            '<span style="background:#e0f2fe;color:#0369a1;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">Audio Recitation</span>' +
            '<span style="background:#e0f2fe;color:#0369a1;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">Rekhta Heritage</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '" target="_blank" style="display:inline-block;background:linear-gradient(135deg, #0284c7, #0369a1);color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;padding:8px 16px;border-radius:8px;">Explore Urdu Poetry Library ↗</a>' +
        '</div>' +

        '<!-- CARD 3: KIDS MORAL STORIES -->' +
        '<div style="background:#f8fafc;border-radius:16px;border:2px solid #fde68a;padding:20px;box-shadow:0 4px 12px rgba(245,158,11,0.06);">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">' +
            '<div style="background:linear-gradient(135deg, #f59e0b, #d97706);color:#ffffff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:9999px;text-transform:uppercase;">PILLAR 3: KIDS WONDER</div>' +
            '<span style="font-size:22px;">🦄</span>' +
          '</div>' +
          '<h3 style="color:#78350f;font-size:18px;font-weight:700;margin:0 0 6px 0;">Kids Light World &amp; 2D Animated Moral Stories <span style="direction:rtl;font-family:\'Jameel Noori Nastaleeq\',serif;font-size:17px;color:#d97706;">(بچوں کی پیاری دنیا)</span></h3>' +
          '<div style="background:#ffffff;border:1px solid #fde68a;border-radius:10px;padding:8px 14px;margin:8px 0;direction:rtl;text-align:right;font-family:\'Jameel Noori Nastaleeq\',serif;font-size:15px;color:#b45309;line-height:1.9;">' +
            'سچائی، ہمدردی، بہادری اور والدین کی عزت کی پیاری کہانیاں' +
          '</div>' +
          '<p style="color:#475569;font-size:13px;line-height:1.6;margin:0 0 12px 0;">Wholesome 2D animated bedtime tales, animal adventures, interactive animal sounds, and a computable Sunny Kids Universe lock screen with single-click parent gate.</p>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">' +
            '<span style="background:#fef3c7;color:#92400e;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">2D Animated Fables</span>' +
            '<span style="background:#fef3c7;color:#92400e;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">Parent Security Lock</span>' +
            '<span style="background:#fef3c7;color:#92400e;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">Sunny AI Guide</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '" target="_blank" style="display:inline-block;background:linear-gradient(135deg, #f59e0b, #d97706);color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;padding:8px 16px;border-radius:8px;">Enter Kids Light World ↗</a>' +
        '</div>' +

        '<!-- CARD 4: COGNITIVE MIND GYM -->' +
        '<div style="background:#f8fafc;border-radius:16px;border:2px solid #a7f3d0;padding:20px;box-shadow:0 4px 12px rgba(16,185,129,0.06);">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">' +
            '<div style="background:linear-gradient(135deg, #10b981, #059669);color:#ffffff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:9999px;text-transform:uppercase;">PILLAR 4: COGNITIVE SKILLS</div>' +
            '<span style="font-size:22px;">🧠</span>' +
          '</div>' +
          '<h3 style="color:#064e3b;font-size:18px;font-weight:700;margin:0 0 6px 0;">Interactive Mind Gym &amp; Bilingual Quizzes <span style="direction:rtl;font-family:\'Jameel Noori Nastaleeq\',serif;font-size:17px;color:#059669;">(ذہنی آزمائش اور کوئز)</span></h3>' +
          '<div style="background:#ffffff;border:1px solid #a7f3d0;border-radius:10px;padding:8px 14px;margin:8px 0;direction:rtl;text-align:right;font-family:\'Jameel Noori Nastaleeq\',serif;font-size:15px;color:#047857;line-height:1.9;">' +
            'الفاظ اور عقل کی جگل بندی • ذہانت اور یادداشت کے دلچسپ مقابلے' +
          '</div>' +
          '<p style="color:#475569;font-size:13px;line-height:1.6;margin:0 0 12px 0;">Cognitive exercises, dual-language word pairing, memory match games, daily challenge streaks, and unlockable achievement badges.</p>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">' +
            '<span style="background:#d1fae5;color:#065f46;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">Bilingual Memory Grids</span>' +
            '<span style="background:#d1fae5;color:#065f46;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">Streak Counter &amp; XP</span>' +
            '<span style="background:#d1fae5;color:#065f46;font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;">Level Badges</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '" target="_blank" style="display:inline-block;background:linear-gradient(135deg, #10b981, #059669);color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;padding:8px 16px;border-radius:8px;">Play Mind Gym Games ↗</a>' +
        '</div>' +

      '</div>' +
    '</div>' +

    '<!-- 🌟 5. YOUTUBE SHORTS SPOTLIGHT -->' +
    '<div style="background:#0f172a;border-radius:20px;padding:24px 20px;margin-bottom:28px;text-align:center;color:#ffffff;box-shadow:0 10px 30px rgba(15,23,42,0.25);">' +
      '<div style="display:inline-block;background:rgba(239,68,68,0.2);color:#fca5a5;padding:4px 14px;border-radius:9999px;font-size:11px;font-weight:700;text-transform:uppercase;margin-bottom:10px;border:1px solid rgba(239,68,68,0.4);">' +
        '▶ OFFICIAL YOUTUBE SHORT' +
      '</div>' +
      '<h4 style="color:#ffffff;font-size:17px;font-weight:700;margin:0 0 16px 0;">' + videoTitle + '</h4>' +
      '<div style="max-width:320px;margin:0 auto 16px auto;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.5);border:2px solid #334155;">' +
        '<div style="position:relative;padding-bottom:177.77%;height:0;overflow:hidden;">' +
          '<iframe src="https://www.youtube.com/embed/' + videoId + '?rel=0&modestbranding=1" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
        '</div>' +
      '</div>' +
      '<a href="https://www.youtube.com/@EntertheWorldofLight?sub_confirmation=1" target="_blank" style="display:inline-block;background:#ef4444;color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;padding:8px 18px;border-radius:8px;">Subscribe on YouTube (@EntertheWorldofLight) ↗</a>' +
    '</div>' +

    '<!-- 🌟 6. OFFICIAL WHATSAPP CHANNEL JOIN CARD -->' +
    '<div style="background:linear-gradient(135deg, #059669 0%, #047857 100%);border-radius:18px;padding:22px 20px;margin-bottom:24px;color:#ffffff;text-align:center;box-shadow:0 8px 24px rgba(5,150,105,0.2);">' +
      '<div style="font-size:28px;margin-bottom:8px;">📢</div>' +
      '<h4 style="margin:0 0 6px 0;font-size:18px;font-weight:800;color:#ffffff;">Join Our Official WhatsApp Channel</h4>' +
      '<p style="margin:0 0 14px 0;font-size:13px;color:#ecfdf5;opacity:0.95;">Receive daily Urdu lessons, animated videos, bedtime moral stories and interactive learning challenges directly on WhatsApp.</p>' +
      '<a href="' + whatsappUrl + '" target="_blank" style="display:inline-block;background:#ffffff;color:#047857;text-decoration:none;font-size:13px;font-weight:800;padding:10px 22px;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">Follow Official WhatsApp Channel ↗</a>' +
    '</div>' +

    '<!-- 🌟 7. PERMANENT UNIVERSAL SHARE BUTTONS (SECTION 7.4 COMPLIANT) -->' +
    '<div style="background:#ffffff;border:2px solid #e2e8f0;border-radius:16px;padding:20px;margin-bottom:24px;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,0.04);">' +
      '<h4 style="color:#0f172a;font-size:14px;font-weight:800;margin:0 0 14px 0;text-transform:uppercase;letter-spacing:0.8px;">📢 Share This Guide With Friends &amp; Family</h4>' +
      '<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;">' +
        '<a href="https://api.whatsapp.com/send?text=' + encTitle + '%20' + encUrl + '" target="_blank" style="background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;padding:8px 14px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">💬 WhatsApp</a>' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encUrl + '" target="_blank" style="background:#1877F2;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;padding:8px 14px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">📘 Facebook</a>' +
        '<a href="https://instagram.com" target="_blank" style="background:linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;padding:8px 14px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">📸 Instagram</a>' +
        '<a href="https://pinterest.com/pin/create/button/?url=' + encUrl + '&description=' + encTitle + '" target="_blank" style="background:#BD081C;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;padding:8px 14px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">📌 Pinterest</a>' +
        '<a href="https://www.tiktok.com" target="_blank" style="background:#000000;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;padding:8px 14px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">🎵 TikTok</a>' +
        '<a href="https://twitter.com/intent/tweet?text=' + encTitle + '&url=' + encUrl + '" target="_blank" style="background:#000000;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;padding:8px 14px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">𝕏 Twitter</a>' +
        '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + encUrl + '" target="_blank" style="background:#0A66C2;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;padding:8px 14px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">💼 LinkedIn</a>' +
        '<a href="https://t.me/share/url?url=' + encUrl + '&text=' + encTitle + '" target="_blank" style="background:#229ED9;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;padding:8px 14px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">✈️ Telegram</a>' +
        '<a href="https://reddit.com/submit?url=' + encUrl + '&title=' + encTitle + '" target="_blank" style="background:#FF4500;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;padding:8px 14px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">🔥 Reddit</a>' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 8. OFFICIAL JOIN US & STAY CONNECTED BUTTONS -->' +
    '<div style="background:#ffffff;border:2px solid #e2e8f0;border-radius:16px;padding:20px;margin-bottom:24px;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,0.04);">' +
      '<h4 style="color:#0f172a;font-size:14px;font-weight:800;margin:0 0 14px 0;text-transform:uppercase;letter-spacing:0.8px;">✨ Join Us &amp; Stay Connected</h4>' +
      '<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;">' +
        '<a href="' + youtubeChannelUrl + '?sub_confirmation=1" target="_blank" style="background:#ef4444;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:9px 18px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">📺 YouTube Channel</a>' +
        '<a href="' + whatsappUrl + '" target="_blank" style="background:#059669;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:9px 18px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">💬 WhatsApp Channel</a>' +
        '<a href="' + webAppUrl + '" target="_blank" style="background:#0284c7;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:9px 18px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">🚀 Web App Portal</a>' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 9. PRIMARY APP LAUNCH CALL-TO-ACTION -->' +
    '<div style="text-align:center;margin-bottom:24px;">' +
      '<a href="' + webAppUrl + '" target="_blank" style="display:inline-block;background:linear-gradient(135deg, #0284c7 0%, #4338ca 100%);color:#ffffff;text-decoration:none;font-size:16px;font-weight:800;padding:14px 32px;border-radius:12px;box-shadow:0 6px 20px rgba(2,132,199,0.35);letter-spacing:0.5px;">🚀 Launch Interactive Web Portal Now</a>' +
    '</div>' +

    '<!-- 🌟 10. CANONICAL CROSS-LINK & COPYRIGHT FOOTER (0% PHONE NUMBERS) -->' +
    '<div style="border-top:1px solid #e2e8f0;padding-top:16px;text-align:center;font-size:12px;color:#64748b;">' +
      'Related Resource: <a href="' + crossLinkUrl + '" style="color:#0284c7;text-decoration:none;font-weight:600;">' + crossLinkLabel + '</a> | ' +
      'Published by <strong>Enter the World of Light &amp; Laughter</strong> • © 2026' +
    '</div>' +

    '<!-- 🌟 11. JSON-LD STRUCTURED SCHEMA -->' +
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
          'url': showcaseImgUrl
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
 * 6. BLOGGER API PUBLISHER
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
 * 7. THE 4 AUTOMATED CONTENT TRACKS (WITH ZERO DUPLICATE PUBLISHING)
 * ============================================================================
 */

// TRACK 1: Primary 1 (App Hub Post)
function publishPrimary_1_Post(slotName) {
  slotName = slotName || "morning";
  Logger.log("▶️ [TRACK 1] Publishing Primary 1 (App Hub Post) for slot: " + slotName);
  
  var video = selectChannelVideoForSlot(slotName, "primary_post", MASTER_CONFIG.PRIMARY_BLOG_ID);
  if (!video) {
    Logger.log("🛑 [SKIPPED] Track 1 skipped: Content already published on Blogger (Deduplication verified).");
    return { skipped: true, reason: "Duplicate prevented - already published" };
  }

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
    crossLinkUrl: MASTER_CONFIG.SECONDARY_BLOG_DOMAIN,
    crossLinkLabel: "View Full Evergreen Kids Syllabus Guide"
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
  Logger.log("▶️ [TRACK 2] Publishing Primary 2 (App Evergreen Syllabus Page) for slot: " + slotName);

  var video = selectChannelVideoForSlot(slotName, "primary_page", MASTER_CONFIG.PRIMARY_BLOG_ID);
  if (!video) {
    Logger.log("🛑 [SKIPPED] Track 2 skipped: Content already published on Blogger (Deduplication verified).");
    return { skipped: true, reason: "Duplicate prevented - already published" };
  }

  var title = "Evergreen Master Curriculum & Digital Learning Syllabus – " + video.title;
  var subtitle = "Complete bilingual roadmap spanning Urdu Haroof stroke mechanics, classical poetry analysis, and cognitive memory drills.";

  var html = buildLuxuryArticleHtml({
    slotName: slotName,
    title: title,
    subtitle: subtitle,
    isKidsTheme: false,
    videoId: video.id,
    videoTitle: video.title,
    heroThumbUrl: video.thumbnailUrl,
    crossLinkUrl: MASTER_CONFIG.SECONDARY_BLOG_DOMAIN,
    crossLinkLabel: "Explore Kids Light World Portal"
  });

  return publishItem(
    MASTER_CONFIG.PRIMARY_BLOG_ID,
    title,
    html,
    [],
    true
  );
}

// TRACK 3: Secondary 1 (Kids Mode & Moral Stories Post)
function publishSecondary_1_Post(slotName) {
  slotName = slotName || "morning";
  Logger.log("▶️ [TRACK 3] Publishing Secondary 1 (Kids Mode Post) for slot: " + slotName);

  var video = selectChannelVideoForSlot(slotName, "secondary_post", MASTER_CONFIG.SECONDARY_BLOG_ID);
  if (!video) {
    Logger.log("🛑 [SKIPPED] Track 3 skipped: Content already published on Blogger (Deduplication verified).");
    return { skipped: true, reason: "Duplicate prevented - already published" };
  }

  var title = "Kids Light World: " + video.title + " – Moral Stories & Fun Phonics";
  var subtitle = "Ad-free, child-friendly 2D animations, animal adventures, interactive Urdu tracing, and character-building tales.";

  var html = buildLuxuryArticleHtml({
    slotName: slotName,
    title: title,
    subtitle: subtitle,
    isKidsTheme: true,
    videoId: video.id,
    videoTitle: video.title,
    heroThumbUrl: video.thumbnailUrl,
    crossLinkUrl: MASTER_CONFIG.PRIMARY_BLOG_DOMAIN,
    crossLinkLabel: "Visit Primary Literature & Poetry Portal"
  });

  return publishItem(
    MASTER_CONFIG.SECONDARY_BLOG_ID,
    title,
    html,
    ["Kids Light World", "Bedtime Stories", "Urdu Qaida", "Child Safe", "YouTube Shorts"],
    false
  );
}

// TRACK 4: Secondary 2 (Kids Evergreen Static Page)
function publishSecondary_2_Page(slotName) {
  slotName = slotName || "evening";
  Logger.log("▶️ [TRACK 4] Publishing Secondary 2 (Kids Evergreen Page) for slot: " + slotName);

  var video = selectChannelVideoForSlot(slotName, "secondary_page", MASTER_CONFIG.SECONDARY_BLOG_ID);
  if (!video) {
    Logger.log("🛑 [SKIPPED] Track 4 skipped: Content already published on Blogger (Deduplication verified).");
    return { skipped: true, reason: "Duplicate prevented - already published" };
  }

  var title = "Child-Safe Digital Nursery & Phonics Directory – " + video.title;
  var subtitle = "Safe-screen bilingual curriculum designed for preschool to early primary learners.";

  var html = buildLuxuryArticleHtml({
    slotName: slotName,
    title: title,
    subtitle: subtitle,
    isKidsTheme: true,
    videoId: video.id,
    videoTitle: video.title,
    heroThumbUrl: video.thumbnailUrl,
    crossLinkUrl: MASTER_CONFIG.PRIMARY_BLOG_DOMAIN,
    crossLinkLabel: "Return to Main App Hub"
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
 * 8. COMPATIBILITY ALIASES FOR INDIVIDUAL TIME-BASED RUNNERS
 * ============================================================================
 */
function executePrimaryYouTubePost() {
  return publishPrimary_1_Post("morning");
}

function executeSecondaryBloggerPage() {
  return publishSecondary_2_Page("evening");
}

function executeAlternatingDaySlot(slotName) {
  slotName = slotName || "morning";
  var day = new Date().getDay();
  if (day % 2 === 0) {
    return publishPrimary_1_Post(slotName);
  } else {
    return publishSecondary_1_Post(slotName);
  }
}
'''

with open('apps-script/Master Controller.gs', 'w') as f:
    f.write(code)

print("Generated apps-script/Master Controller.gs successfully! Length:", len(code))
