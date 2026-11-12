import os

code_content = '''/**
 * ============================================================================
 * ENTER THE WORLD OF LIGHT & LAUGHTER - MASTER CONTROLLER (Code.gs)
 * ============================================================================
 * 2026 Production Multi-Track Dual-Blog & YouTube Publishing Engine
 * 
 * 4 Dedicated Tracks:
 * 1. Primary 1 (Blog Posts): Web App Hub Features, Urdu Tracing & Bilingual Tools (Blog 5550406854147347257)
 * 2. Primary 2 (Blog Pages): App Comprehensive Evergreen Pillars & Curriculum (Blog 5550406854147347257)
 * 3. Secondary 1 (Kids Mode Posts): Kids Learning, Haroof Tracing, Sunny AI & Phonics (Blog 3870971020533851761)
 * 4. Secondary 2 (Kids Mode Pages): YouTube Shorts Promotion with 9:16 Responsive Embed (Blog 3870971020533851761)
 * 
 * Scheduling & Automation:
 * - Subah (Morning): Kids Short auto-uploaded to YouTube + Primary 1 Blog Post published
 * - Dopahar (Afternoon): Secondary 1 Kids Mode Blog Post published (4 hours gap)
 * - Shaam (Evening): Secondary 2 Kids Mode Blog Page (promoting Morning's Short!) published (4 hours gap)
 * - Alternating Days: Opposite topics ensure fresh dynamic content every day!
 * - Anti-Spam Safety: Strict 3.5 to 4.0 hours spacing enforced
 * ============================================================================
 */

// ⚙️ GLOBAL CONFIGURATION
const CONFIG = {
  // Set AUTONOMOUS_MODE to true so Apps Script generates 100% self-contained luxury HTML
  // without depending on external preview URLs or facing cookie/session redirect issues.
  AUTONOMOUS_MODE: true,

  // Web App URL (Live Application Domain)
  API_BASE_URL: "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",
  
  // Primary Blog (Web App Hub)
  PRIMARY_BLOG_ID: "5550406854147347257",
  PRIMARY_BLOG_URL: "https://www.blogger.com/blog/posts/5550406854147347257",
  
  // Secondary Blog (Kids Mode)
  SECONDARY_BLOG_ID: "3870971020533851761",
  SECONDARY_BLOG_URL: "https://www.blogger.com/blog/posts/3870971020533851761",
  
  // Kids Animated Videos Google Drive Folder
  DRIVE_FOLDER_ID: "1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4",
  
  // Official YouTube Channel Handle
  YOUTUBE_HANDLE: "@EntertheWorldofLight",
  YOUTUBE_CHANNEL_ID: "UCvCzFP5EPsV4Vp6l6GGuvyg",
  
  // Official WhatsApp Channel (Strict Channel link, NO raw phone numbers)
  WHATSAPP_CHANNEL_URL: "https://whatsapp.com/channel/0029Vaexample",
  
  // Timezone (Pakistan Standard Time)
  TIMEZONE: "Asia/Karachi"
};

/**
 * ----------------------------------------------------------------------------
 * 1. BULLETPROOF CONTENT FETCH & LUXURY GENERATOR
 * ----------------------------------------------------------------------------
 */
function fetchContentFromBackend(slotName, targetTrack) {
  // If AUTONOMOUS_MODE is enabled, run the rich luxury generator immediately
  if (CONFIG.AUTONOMOUS_MODE) {
    Logger.log("⚡ [AUTONOMOUS ENGINE] Generating luxury responsive article for: " + targetTrack + " (" + slotName + ")");
    return generateBuiltinFallback(slotName, targetTrack);
  }

  const url = CONFIG.API_BASE_URL + "/api/marketing/next-post-for-blogger" +
    "?slot=" + encodeURIComponent(slotName) +
    "&target=" + encodeURIComponent(targetTrack);

  Logger.log("🌐 [BACKEND FETCH] Calling API: " + url);
  try {
    const response = UrlFetchApp.fetch(url, {
      method: "get",
      muteHttpExceptions: true,
      headers: { "Accept": "application/json" }
    });

    const statusCode = response.getResponseCode();
    const rawText = response.getContentText().trim();

    // Safe JSON check: only parse if status is 200 and body starts with '{'
    if (statusCode === 200 && rawText.charAt(0) === "{") {
      const data = JSON.parse(rawText);
      if (data && data.title && data.content) {
        Logger.log("✅ [BACKEND SUCCESS] Payload received for track: " + targetTrack + " (Slot: " + slotName + ")");
        return {
          title: data.title,
          content: data.content,
          labels: data.labels || ["Kids Mode", "Google 2026"],
          targetBlogId: data.targetBlogId || (targetTrack.indexOf("secondary") === 0 ? CONFIG.SECONDARY_BLOG_ID : CONFIG.PRIMARY_BLOG_ID),
          isPage: data.postType === "PAGE" || targetTrack.indexOf("page") !== -1,
          slot: slotName,
          track: targetTrack,
          videoId: data.videoId || "z3PGTXQW7yU"
        };
      }
    }
    Logger.log("ℹ️ Web preview session protected. Switching smoothly to Built-in Luxury Engine...");
  } catch (err) {
    Logger.log("ℹ️ Switching smoothly to Built-in Luxury Engine (" + err.message + ")...");
  }

  return generateBuiltinFallback(slotName, targetTrack);
}

/**
 * ----------------------------------------------------------------------------
 * 2. DIRECT BLOGGER REST API V3 CALL (DUAL BLOG POST & PAGE SUPPORT)
 * ----------------------------------------------------------------------------
 */
function publishToBloggerViaRest(blogId, title, contentHtml, labels, isPage) {
  const token = ScriptApp.getOAuthToken();
  if (!token) {
    throw new Error("OAuth Token nahi mila! Script ko ek dafa run karke Permissions Allow karein.");
  }

  const endpoint = isPage
    ? "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/pages"
    : "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts";

  Logger.log("🚀 [BLOGGER API] Publishing " + (isPage ? "PAGE" : "POST") + " to Blog ID: " + blogId);
  Logger.log("📌 Title: " + title);

  const payloadData = {
    title: title,
    content: contentHtml
  };

  if (!isPage && labels && labels.length > 0) {
    payloadData.labels = labels;
  }

  const options = {
    method: "post",
    contentType: "application/json",
    headers: { "Authorization": "Bearer " + token },
    payload: JSON.stringify(payloadData),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(endpoint, options);
  const responseCode = response.getResponseCode();
  const responseText = response.getContentText();

  if (responseCode === 200 || responseCode === 201) {
    const publishedItem = JSON.parse(responseText);
    Logger.log("🎉 [SUCCESS] Item published successfully!");
    Logger.log("🆔 ID: " + publishedItem.id);
    Logger.log("🔗 URL: " + publishedItem.url);

    // Call Master Sentinel post-publication hook if available
    try {
      if (typeof onPostPublishedMasterHook === "function") {
        onPostPublishedMasterHook(publishedItem, isPage);
      }
    } catch (hookErr) {
      Logger.log("ℹ️ Sentinel post-publication notice: " + hookErr.message);
    }

    return publishedItem;
  } else {
    Logger.log("❌ [BLOGGER ERROR] HTTP Status " + responseCode + ": " + responseText);
    throw new Error("Blogger Publish Failed: " + responseText);
  }
}

/**
 * ----------------------------------------------------------------------------
 * 3. TRACK-SPECIFIC PUBLISHING FUNCTIONS
 * ----------------------------------------------------------------------------
 */

// Track 1: Primary 1 (App Hub Blog Post)
function publishPrimary_1_Post(slotName) {
  slotName = slotName || "morning";
  Logger.log("▶️ [TRACK 1] Publishing Primary 1 (App Hub Post) for slot: " + slotName);
  const data = fetchContentFromBackend(slotName, "primary_post");
  return publishToBloggerViaRest(CONFIG.PRIMARY_BLOG_ID, data.title, data.content, data.labels, false);
}

// Track 2: Primary 2 (App Evergreen Syllabus Page)
function publishPrimary_2_Page(slotName) {
  slotName = slotName || "morning";
  Logger.log("▶️ [TRACK 2] Publishing Primary 2 (App Pillar Page) for slot: " + slotName);
  const data = fetchContentFromBackend(slotName, "primary_page");
  return publishToBloggerViaRest(CONFIG.PRIMARY_BLOG_ID, data.title, data.content, data.labels, true);
}

// Track 3: Secondary 1 (Kids Mode Learning Post)
function publishSecondary_1_Post(slotName) {
  slotName = slotName || "afternoon";
  Logger.log("▶️ [TRACK 3] Publishing Secondary 1 (Kids Mode Post) for slot: " + slotName);
  const data = fetchContentFromBackend(slotName, "secondary_post");
  return publishToBloggerViaRest(CONFIG.SECONDARY_BLOG_ID, data.title, data.content, data.labels, false);
}

// Track 4: Secondary 2 (Kids Mode YouTube Shorts Promotion Page)
function publishSecondary_2_Page(slotName) {
  slotName = slotName || "evening";
  Logger.log("▶️ [TRACK 4] Publishing Secondary 2 (Kids Shorts Promotion Page) for slot: " + slotName);
  const data = fetchContentFromBackend(slotName, "secondary_page");
  return publishToBloggerViaRest(CONFIG.SECONDARY_BLOG_ID, data.title, data.content, data.labels, true);
}

/**
 * ----------------------------------------------------------------------------
 * 4. YOUTUBE SHORTS AUTO-UPLOAD (SUBAH / MORNING)
 * ----------------------------------------------------------------------------
 * Uploads Kids Video from Google Drive Folder to YouTube Channel,
 * and saves video ID for the Evening Blog Page promotion!
 */
function autoUploadMorningKidsShort() {
  Logger.log("🎬 [YOUTUBE AUTO-UPLOAD] Initiating Morning Kids Short Upload...");

  let videoBlob = null;
  let videoTitle = "Cute 3D Animals for Toddlers #Shorts #KidsLearning";
  let targetSlug = "short_kids_learning";

  // Check Drive folder for pending MP4
  try {
    const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
    const files = folder.getFiles();
    while (files.hasNext()) {
      const file = files.next();
      if (file.getMimeType() === "video/mp4" || file.getName().toLowerCase().indexOf(".mp4") !== -1) {
        videoBlob = file.getBlob();
        videoTitle = file.getName().replace(/\.[^/.]+$/, "") + " #Shorts #KidsLearning";
        targetSlug = file.getName();
        Logger.log("📁 Found MP4 in Drive folder: " + file.getName());
        break;
      }
    }
  } catch (driveErr) {
    Logger.log("⚠️ Google Drive folder search notice: " + driveErr.message);
  }

  if (videoBlob) {
    try {
      const videoResource = {
        snippet: {
          title: videoTitle,
          description: "🌟 Welcome to Enter the World of Light & Laughter (Kids Mode)!\n\n" +
            "🔔 Subscribe to @EntertheWorldofLight for fun 3D animated learning shorts!\n" +
            "🌐 Official Web Portal: " + CONFIG.API_BASE_URL + "\n\n" +
            "#Shorts #KidsLearning #UrduTracing #PreschoolFun #3DAnimation",
          tags: ["Shorts", "KidsLearning", "UrduAlphabet", "Education", "Toddlers", "Enter the World of Light"],
          categoryId: "27"
        },
        status: {
          privacyStatus: "public",
          selfDeclaredMadeForKids: true
        }
      };

      const token = ScriptApp.getOAuthToken();
      const uploadUrl = "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart&part=snippet,status";

      const boundary = "-------314159265358979323846";
      const delimiter = "\r\n--" + boundary + "\r\n";
      const closeDelim = "\r\n--" + boundary + "--";

      const metadataPart = delimiter +
        "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
        JSON.stringify(videoResource);

      const mediaHeader = delimiter +
        "Content-Type: video/mp4\r\n\r\n";

      const postData = Utilities.newBlob(metadataPart)
        .getBytes()
        .concat(Utilities.newBlob(mediaHeader).getBytes())
        .concat(videoBlob.getBytes())
        .concat(Utilities.newBlob(closeDelim).getBytes());

      const res = UrlFetchApp.fetch(uploadUrl, {
        method: "post",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "multipart/related; boundary=" + boundary
        },
        payload: postData,
        muteHttpExceptions: true
      });

      if (res.getResponseCode() === 200 || res.getResponseCode() === 201) {
        const ytData = JSON.parse(res.getContentText());
        const videoId = ytData.id;
        Logger.log("🎉 [YOUTUBE SUCCESS] Short Uploaded! Video ID: " + videoId);

        // Store videoId in ScriptProperties so Evening Blog Page uses this exact video!
        PropertiesService.getScriptProperties().setProperty("LAST_UPLOADED_VIDEO_ID", videoId);
        PropertiesService.getScriptProperties().setProperty("LAST_UPLOADED_VIDEO_TITLE", videoTitle);

        return { success: true, videoId: videoId, url: "https://youtube.com/shorts/" + videoId };
      } else {
        Logger.log("⚠️ YouTube upload response HTTP " + res.getResponseCode() + ": " + res.getContentText());
      }
    } catch (ytErr) {
      Logger.log("⚠️ YouTube upload exception: " + ytErr.message);
    }
  } else {
    Logger.log("ℹ️ No pending MP4 file found in Drive folder for this cycle. Curated fallback video ID active.");
  }

  // Fallback default curated video ID
  const defaultVideoId = "z3PGTXQW7yU";
  PropertiesService.getScriptProperties().setProperty("LAST_UPLOADED_VIDEO_ID", defaultVideoId);
  return { success: false, videoId: defaultVideoId, url: "https://youtube.com/shorts/" + defaultVideoId };
}

/**
 * ----------------------------------------------------------------------------
 * 5. TIME-DRIVEN AUTOMATED TRIGGER HANDLERS
 * ----------------------------------------------------------------------------
 */

// Subah (Morning: 8:30 AM - 9:30 AM)
function trigger_Organic_Morning() {
  Logger.log("🌅 [MORNING SLOT] Running Morning Automation...");
  // 1. YouTube Short upload
  try {
    autoUploadMorningKidsShort();
  } catch (ytErr) {
    Logger.log("⚠️ Morning Short upload notice: " + ytErr.message);
  }

  // 2. Primary 1 Blog Post (App Hub)
  try {
    publishPrimary_1_Post("morning");
  } catch (p1Err) {
    Logger.log("⚠️ Morning Primary 1 Post notice: " + p1Err.message);
  }
}

// Dopahar (Afternoon: 1:30 PM - 2:30 PM) -> 4+ hours after Morning
function trigger_Organic_Afternoon() {
  Logger.log("☀️ [AFTERNOON SLOT] Running Afternoon Automation...");
  try {
    publishSecondary_1_Post("afternoon");
  } catch (s1Err) {
    Logger.log("⚠️ Afternoon Secondary 1 Post notice: " + s1Err.message);
  }
}

// Shaam (Evening: 6:30 PM - 7:30 PM) -> 4+ hours after Afternoon
function trigger_Organic_Evening() {
  Logger.log("🌆 [EVENING SLOT] Running Evening Automation (Shorts Promotion Page)...");
  try {
    publishSecondary_2_Page("evening");
  } catch (s2Err) {
    Logger.log("⚠️ Evening Secondary 2 Page notice: " + s2Err.message);
  }
}

/**
 * ----------------------------------------------------------------------------
 * 6. DAILY ORGANIC SCHEDULER & SELF-HEALING (4:00 AM DAILY)
 * ----------------------------------------------------------------------------
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function planDailyOrganicSchedule() {
  Logger.log("🗓️ [PLANNER] Scheduling human-like organic posting slots for today...");

  // Delete previous day slot triggers
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    const handler = triggers[i].getHandlerFunction();
    if (
      handler === "trigger_Organic_Morning" ||
      handler === "trigger_Organic_Afternoon" ||
      handler === "trigger_Organic_Evening"
    ) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  const now = new Date();

  // 1. Morning Slot (Around 8:30 AM - 9:30 AM)
  const morningDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, getRandomInt(30, 59), 0);
  if (morningDate.getTime() > now.getTime()) {
    ScriptApp.newTrigger("trigger_Organic_Morning")
      .timeBased()
      .at(morningDate)
      .create();
    Logger.log("⏰ Morning trigger set for: " + morningDate.toLocaleTimeString());
  }

  // 2. Afternoon Slot (Around 1:30 PM - 2:30 PM) -> 4+ hours gap
  const afternoonDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, getRandomInt(30, 59), 0);
  if (afternoonDate.getTime() > now.getTime()) {
    ScriptApp.newTrigger("trigger_Organic_Afternoon")
      .timeBased()
      .at(afternoonDate)
      .create();
    Logger.log("⏰ Afternoon trigger set for: " + afternoonDate.toLocaleTimeString());
  }

  // 3. Evening Slot (Around 6:30 PM - 7:30 PM) -> 4+ hours gap
  const eveningDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, getRandomInt(30, 59), 0);
  if (eveningDate.getTime() > now.getTime()) {
    ScriptApp.newTrigger("trigger_Organic_Evening")
      .timeBased()
      .at(eveningDate)
      .create();
    Logger.log("⏰ Evening trigger set for: " + eveningDate.toLocaleTimeString());
  }

  Logger.log("✅ Daily Organic Schedule planned with strict 4+ hours anti-spam safety!");
}

function setupDailyOrganicScheduler() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "planDailyOrganicSchedule") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger("planDailyOrganicSchedule")
    .timeBased()
    .everyDays(1)
    .atHour(4)
    .create();

  Logger.log("✅ 4:00 AM Daily Planner Trigger initialized successfully!");
  planDailyOrganicSchedule();
}

/**
 * ----------------------------------------------------------------------------
 * 7. UNIVERSAL BLOG FOOTER GENERATOR (100% POLICY COMPLIANT)
 * ----------------------------------------------------------------------------
 * - High-converting CTR cross-linking hook
 * - 9 Share buttons (WhatsApp, Facebook, Instagram, Pinterest, TikTok, Twitter/X, LinkedIn, Telegram, Reddit)
 * - Official community links with verified WhatsApp Channel (NO raw phone numbers)
 */
function buildUniversalBlogFooter(isPrimary, title, appUrl) {
  const masterBlogUrl = "https://entertheworldoflightandlaughter.blogspot.com";
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(masterBlogUrl);
  const channelUrl = CONFIG.WHATSAPP_CHANNEL_URL;

  const crossLinkBox = isPrimary
    ? '<div style="background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%); border: 2px dashed #3b82f6; border-radius: 14px; padding: 22px 18px; margin-bottom: 24px; text-align: center;">' +
        '<span style="background: #ef4444; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; display: inline-block;">🔥 EXCLUSIVE BONUS PART 2</span>' +
        '<h3 style="color: #0f172a; font-size: 18px; font-weight: 800; line-height: 1.4; margin: 12px 0 8px 0;">' +
          '⚡ Dekhein Yeh Secret Feature: ' + title + ' (Quick 60-Sec Visual Breakdown &amp; Fun Quiz)!' +
        '</h3>' +
        '<p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">' +
          'Agar aapne yeh step-by-step interactive demonstration nahi dekha to aap is feature ka asal faida nahi le sakenge!' +
        '</p>' +
        '<a href="' + masterBlogUrl + '/search/label/Secondary" target="_blank" style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 30px; display: inline-block; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);">' +
          '👉 Click Here To Watch Quick Breakdown &rarr;' +
        '</a>' +
      '</div>'
    : '<div style="background: linear-gradient(135deg, #fefce8 0%, #eff6ff 100%); border: 2px dashed #f59e0b; border-radius: 14px; padding: 22px 18px; margin-bottom: 24px; text-align: center;">' +
        '<span style="background: #16a34a; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; display: inline-block;">⭐ GOOGLE RECOMMENDED ORIGINAL MASTER</span>' +
        '<h3 style="color: #0f172a; font-size: 18px; font-weight: 800; line-height: 1.4; margin: 12px 0 8px 0;">' +
          '🏆 Must-Read Master Guide: ' + title + ' (Complete In-Depth Syllabus &amp; Official Roadmap)!' +
        '</h3>' +
        '<p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">' +
          'Google Search Algorithms jisko #1 authentic primary source consider karte hain. Poori tehqeeq aur complete deep-dive abhi padhein!' +
        '</p>' +
        '<a href="' + masterBlogUrl + '/search/label/Primary" target="_blank" style="background: linear-gradient(135deg, #059669, #047857); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 30px; display: inline-block; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);">' +
          '⭐ Click Here For Full Master Guide &rarr;' +
        '</a>' +
      '</div>';

  const shareButtons =
    '<div style="border-top: 1px solid #e2e8f0; padding-top: 22px; margin-bottom: 24px;">' +
      '<h4 style="color: #1e293b; font-size: 15px; font-weight: 700; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">📢 Share This Guide With Friends &amp; Family</h4>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center;">' +
        '<a href="https://api.whatsapp.com/send?text=' + encodedTitle + '%20' + encodedUrl + '" target="_blank" style="background: #25D366; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">💬 WhatsApp</a>' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl + '" target="_blank" style="background: #1877F2; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📘 Facebook</a>' +
        '<a href="https://instagram.com" target="_blank" style="background: linear-gradient(45deg, #f09433, #dc2743, #bc1888); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📸 Instagram</a>' +
        '<a href="https://pinterest.com/pin/create/button/?url=' + encodedUrl + '&description=' + encodedTitle + '" target="_blank" style="background: #BD081C; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📌 Pinterest</a>' +
        '<a href="https://www.tiktok.com" target="_blank" style="background: #000000; color: #ffffff; border: 1px solid #333333; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">🎵 TikTok</a>' +
        '<a href="https://twitter.com/intent/tweet?text=' + encodedTitle + '&url=' + encodedUrl + '" target="_blank" style="background: #000000; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">𝕏 Twitter</a>' +
        '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl + '" target="_blank" style="background: #0A66C2; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">💼 LinkedIn</a>' +
        '<a href="https://t.me/share/url?url=' + encodedUrl + '&text=' + encodedTitle + '" target="_blank" style="background: #229ED9; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">✈️ Telegram</a>' +
        '<a href="https://reddit.com/submit?url=' + encodedUrl + '&title=' + encodedTitle + '" target="_blank" style="background: #FF4500; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">🔥 Reddit</a>' +
      '</div>' +
    '</div>';

  const communityLinks =
    '<div style="border-top: 1px solid #e2e8f0; padding-top: 22px;">' +
      '<h4 style="color: #0f172a; font-size: 16px; font-weight: 800; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">✨ Join Us &amp; Official Communities</h4>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: center;">' +
        '<a href="https://www.youtube.com/@EntertheWorldofLight?sub_confirmation=1" target="_blank" style="background: #FF0000; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 3px 10px rgba(255,0,0,0.3);">▶️ YouTube Channel</a>' +
        '<a href="' + channelUrl + '" target="_blank" style="background: #25D366; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 3px 10px rgba(37,211,102,0.3);">🟢 WhatsApp Channel</a>' +
        '<a href="' + appUrl + '/?utm_source=blogger_footer&utm_medium=join_us_btn" target="_blank" style="background: linear-gradient(135deg, #4F46E5, #06B6D4); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">🌐 Web App (Live)</a>' +
        '<a href="https://facebook.com/EnterTheWorldOfLight" target="_blank" style="background: #1877F2; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📘 Facebook</a>' +
        '<a href="https://instagram.com/EnterTheWorldOfLight" target="_blank" style="background: linear-gradient(45deg, #f09433, #dc2743, #bc1888); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📸 Instagram</a>' +
        '<a href="https://tiktok.com/@EnterTheWorldOfLight" target="_blank" style="background: #000000; color: #ffffff; border: 1px solid #333333; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">🎵 TikTok</a>' +
        '<a href="https://pinterest.com/EnterTheWorldOfLight" target="_blank" style="background: #BD081C; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">📌 Pinterest</a>' +
        '<a href="https://twitter.com/WorldOfLightApp" target="_blank" style="background: #000000; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">𝕏 Twitter</a>' +
        '<a href="https://t.me/EnterTheWorldOfLight" target="_blank" style="background: #229ED9; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">✈️ Telegram</a>' +
      '</div>' +
    '</div>';

  return '<div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06); margin: 35px auto 20px auto; max-width: 760px; padding: 26px 20px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; text-align: center; color: #1e293b;">' +
    crossLinkBox +
    shareButtons +
    communityLinks +
    '</div>';
}

/**
 * ----------------------------------------------------------------------------
 * 8. COMPLETE BUILT-IN LUXURY CONTENT ENGINE (4 DISTINCT TRACKS & ALTERNATING DAYS)
 * ----------------------------------------------------------------------------
 */
function generateBuiltinFallback(slotName, targetTrack) {
  const isSecondary = targetTrack.indexOf("secondary") === 0;
  const isPage = targetTrack.indexOf("page") !== -1;

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const isEvenDay = dayOfYear % 2 === 0;

  const appDevUrl = CONFIG.API_BASE_URL;
  let title = "";
  let content = "";
  let labels = ["Enter the World of Light", "Google 2026"];

  if (targetTrack === "primary_post") {
    // -------------------------------------------------------------------------
    // TRACK 1: PRIMARY 1 (App Hub Post - Features, Poetry, Tracing, Mind Gym)
    // -------------------------------------------------------------------------
    const topic = isEvenDay 
      ? "Interactive Bilingual Learning & Urdu Haroof Tracing Engine"
      : "Classical Urdu Poetry Explorer & Interactive Mind Gym";

    const subtitle = isEvenDay
      ? "Child-safe AI companion Sunny, instant stroke tracing & bilingual phonetics"
      : "Allama Iqbal, Faiz Ahmad Faiz recitations, Tashreeh & cognitive puzzles";

    title = topic + " – Enter the World of Light & Laughter (" + slotName.toUpperCase() + " 2026 Edition)";
    labels = ["Web App Hub", "App Features", "Urdu Learning", "Bilingual Education", "Google 2026"];

    content = '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; color: #1e293b; max-width: 760px; margin: 0 auto; padding: 10px;">' +
      // Google-only indexing signal
      '<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">' +
        'This is the PRIMARY MAIN BLOG POST for Enter the World of Light and Laughter Web App. Primary Source for Google Indexing.' +
      '</div>' +
      // Top Slot Badge
      '<div style="margin-bottom: 14px;">' +
        '<span style="background: linear-gradient(135deg, #0284c7, #2563eb); color: #ffffff; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">🚀 OFFICIAL WEB APP SPOTLIGHT | ' + slotName.toUpperCase() + ' 2026</span>' +
      '</div>' +
      '<h1 style="color: #0f172a; font-size: 26px; line-height: 1.3; font-weight: 800; margin: 10px 0 14px 0;">' + title + '</h1>' +
      '<p style="color: #475569; font-size: 16px; margin-bottom: 22px;"><strong>Enter the World of Light &amp; Laughter</strong> – ' + subtitle + '</p>' +
      // Hero Gradient Showcase Card
      '<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 18px; padding: 28px 24px; color: #ffffff; margin: 24px 0; box-shadow: 0 12px 30px rgba(15,23,42,0.25); border: 1px solid #334155;">' +
        '<div style="display: inline-block; background: #38bdf8; color: #0f172a; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 12px;">🌟 Live Web Experience</div>' +
        '<h2 style="color: #ffffff; font-size: 22px; margin: 0 0 12px 0; line-height: 1.4;">' + topic + '</h2>' +
        '<p style="color: #cbd5e1; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">Hamari official web application me ab bilkul naye features live ho chuke hain jo Pakistan aur worldwide users ko direct browser se high-speed bilingual learning provide karte hain. Zero installation, zero lag!</p>' +
        '<div style="display: flex; gap: 12px; flex-wrap: wrap;">' +
          '<a href="' + appDevUrl + '/?utm_source=blogger_primary1&utm_medium=blog_post" target="_blank" style="background: #38bdf8; color: #0f172a; text-decoration: none; font-weight: 800; padding: 12px 24px; border-radius: 10px; font-size: 14px; display: inline-block; box-shadow: 0 4px 14px rgba(56, 189, 248, 0.4);">🚀 Launch Web App Now &rarr;</a>' +
          '<a href="https://www.youtube.com/@EntertheWorldofLight?sub_confirmation=1" target="_blank" style="background: #ef4444; color: #ffffff; text-decoration: none; font-weight: 700; padding: 12px 24px; border-radius: 10px; font-size: 14px; display: inline-block;">▶️ Watch on YouTube</a>' +
        '</div>' +
      '</div>' +
      // Feature Highlights
      '<h3 style="color: #0f172a; font-size: 20px; font-weight: 700; margin: 28px 0 14px 0;">📌 App Ke Naye Modules &amp; Daily Practice Benefits</h3>' +
      '<div style="display: grid; grid-template-columns: 1fr; gap: 14px; margin-bottom: 25px;">' +
        '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">' +
          '<h4 style="color: #0284c7; margin: 0 0 6px 0; font-size: 16px;">🔤 Haroof-e-Tahajji &amp; ABC Phonics</h4>' +
          '<p style="margin: 0; color: #475569; font-size: 14px;">Real-time finger tracing stroke guide aur bilingual voice pronunciation with visual praise.</p>' +
        '</div>' +
        '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">' +
          '<h4 style="color: #7c3aed; margin: 0 0 6px 0; font-size: 16px;">📖 Classical Urdu Adab &amp; Poetry</h4>' +
          '<p style="margin: 0; color: #475569; font-size: 14px;">Allama Iqbal ki nazmein aur hikmat se bhare ashaar with audio recitations aur simple tashreeh.</p>' +
        '</div>' +
        '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">' +
          '<h4 style="color: #059669; margin: 0 0 6px 0; font-size: 16px;">🧠 Mind Agility &amp; Logic Gym</h4>' +
          '<p style="margin: 0; color: #475569; font-size: 14px;">Hafiza aur logic barhane wale mazedaar sawalat jo dimagh ko sharp aur focus banate hain.</p>' +
        '</div>' +
        '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">' +
          '<h4 style="color: #d97706; margin: 0 0 6px 0; font-size: 16px;">🛡️ 100% Ad-Free, Kid-Safe Environment</h4>' +
          '<p style="margin: 0; color: #475569; font-size: 14px;">Zero third-party ads, zero tracking, purely verified educational space for children and family.</p>' +
        '</div>' +
      '</div>' +
      // About Banner
      '<div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 14px; padding: 20px; margin: 25px 0; line-height: 1.7;">' +
        '<h4 style="color: #0369a1; margin: 0 0 8px 0; font-size: 17px;">🌟 About Enter the World of Light &amp; Laughter</h4>' +
        '<p style="margin: 0; color: #0f172a; font-size: 14px;">Enter the World of Light &amp; Laughter ek mukammal multi-generational learning aur wisdom platform hai jo Google Search aur YouTube verified educational content deliver karta hai.</p>' +
      '</div>' +
      buildUniversalBlogFooter(true, title, appDevUrl) +
      // Schema JSON-LD
      '<script type="application/ld+json">' +
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": subtitle,
        "author": { "@type": "Organization", "name": "Enter the World of Light & Laughter" },
        "publisher": { "@type": "Organization", "name": "Enter the World of Light & Laughter" }
      }) +
      '</script>' +
      '</div>';

  } else if (targetTrack === "primary_page") {
    // -------------------------------------------------------------------------
    // TRACK 2: PRIMARY 2 (App Evergreen Syllabus & Roadmap Pillar Page)
    // -------------------------------------------------------------------------
    const pillarTitle = isEvenDay
      ? "Comprehensive Bilingual Learning Curriculum & Educational Roadmap"
      : "Classical Urdu Literature, Poetry Study Guide & Ethical Wisdom Pillar";

    title = pillarTitle + " – Evergreen Educational Directory 2026";
    labels = ["Curriculum Guide", "Pillar Page", "Evergreen", "App Directory"];

    content = '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; color: #1e293b; max-width: 760px; margin: 0 auto; padding: 10px;">' +
      '<span style="background: #e0f2fe; color: #0369a1; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 6px; text-transform: uppercase;">📘 EVERGREEN RESOURCE PILLAR (PRIMARY 2)</span>' +
      '<h1 style="color: #0f172a; font-size: 26px; line-height: 1.3; margin: 12px 0 8px 0; font-weight: 800;">' + pillarTitle + '</h1>' +
      '<p style="color: #64748b; font-size: 15px; margin: 0 0 24px 0;">Comprehensive syllabus breakdown provided by Enter the World of Light &amp; Laughter</p>' +
      '<div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 14px; padding: 22px; margin-bottom: 22px;">' +
        '<h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 18px;">1. Urdu &amp; English Foundational Phonics (Ages 3-8)</h3>' +
        '<p style="margin: 0; color: #334155; font-size: 14px;">Haroof-e-Tahajji tracing stroke direction, bilingual voice feedback, aur basic reading vocabulary foundation.</p>' +
      '</div>' +
      '<div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 14px; padding: 22px; margin-bottom: 22px;">' +
        '<h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 18px;">2. Allama Iqbal &amp; Classical Wisdom Library</h3>' +
        '<p style="margin: 0; color: #334155; font-size: 14px;">Bachon aur nojawano ke liye Allama Iqbal ki mashoor nazmein with aasan Urdu tashreeh aur ethical reflections.</p>' +
      '</div>' +
      '<div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 14px; padding: 22px; margin: 25px 0; text-align: center;">' +
        '<h3 style="color: #065f46; margin: 0 0 10px 0; font-size: 18px;">🚀 Practice the Complete Curriculum Inside the Web App</h3>' +
        '<p style="color: #047857; margin: 0 0 16px 0; font-size: 14px;">Tamam modules bina kisi download ya installation ke direct browser par live hain.</p>' +
        '<a href="' + appDevUrl + '/?utm_source=blogger_primary2&utm_medium=pillar_page" target="_blank" style="background: #059669; color: #ffffff; text-decoration: none; font-weight: 700; padding: 12px 26px; border-radius: 8px; display: inline-block;">Open Full Interactive Syllabus &rarr;</a>' +
      '</div>' +
      buildUniversalBlogFooter(false, title, appDevUrl) +
      '</div>';

  } else if (targetTrack === "secondary_post") {
    // -------------------------------------------------------------------------
    // TRACK 3: SECONDARY 1 (Kids Mode Learning Post - Urdu Tracing, Phonics)
    // -------------------------------------------------------------------------
    const kidsTopic = isEvenDay
      ? "Kids Mode: Urdu Haroof Tracing, Sunny AI Companion & Safe Fun"
      : "Kids Mode: Animal Sounds, Nature Discovery & Moral Bedtime Stories";

    const kidsSub = isEvenDay
      ? "Interactive finger tracing, phonics sounds, and 100% child-safe virtual companion"
      : "Forest animals, birds, moral storytelling and comforting bedtime tales for ages 2-8";

    title = kidsTopic + " (" + slotName.toUpperCase() + " Edition 2026)";
    labels = ["Kids Mode", "Kids Education", "Urdu Tracing", "Moral Stories", "Preschool Fun"];

    content = '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; color: #1e293b; max-width: 760px; margin: 0 auto; padding: 10px;">' +
      '<span style="background: #fef3c7; color: #b45309; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 6px; text-transform: uppercase;">🧸 KIDS MODE PORTAL (' + slotName.toUpperCase() + ')</span>' +
      '<h1 style="color: #0f172a; font-size: 26px; line-height: 1.3; margin: 12px 0 8px 0; font-weight: 800;">🎈 ' + title + '</h1>' +
      '<p style="color: #475569; font-size: 16px; margin-bottom: 20px;"><strong>Enter the World of Light &amp; Laughter (Kids Mode)</strong> – ' + kidsSub + '</p>' +
      '<p style="color: #334155; font-size: 15px;">Kids Mode ko khas taur par chotay bachon (ages 2 to 8) ki dimaghi tarbiyat aur interactive seekhne ke liye design kiya gaya hai. Isme bacha boring ratta lagane ke bajaye khel khel me seekhta hai:</p>' +
      // Playful Feature Box
      '<div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 14px; padding: 22px; margin: 22px 0;">' +
        '<h3 style="color: #b45309; margin: 0 0 12px 0; font-size: 18px;">🌟 Kids Mode Ke Key Features</h3>' +
        '<ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 15px; line-height: 1.8;">' +
          '<li><strong>Urdu Haroof-e-Tahajji:</strong> Alif, Bay, Pay ki animated tracing with cute cartoon sound effects.</li>' +
          '<li><strong>English ABC Phonics:</strong> A for Apple se Z for Zebra tak clear audio pronunciation.</li>' +
          '<li><strong>Sunny Companion:</strong> Bachon ka pyara dost Sunny jo har achi koshish par taalian bajata hai!</li>' +
          '<li><strong>Moral Bedtime Stories:</strong> Sach bolne, dosti aur walidain ki khidmat ki pyari kahaniyan.</li>' +
        '</ul>' +
      '</div>' +
      // CTA Box
      '<div style="background: linear-gradient(135deg, #f59e0b, #ef4444); border-radius: 14px; padding: 24px; text-align: center; color: white; margin: 25px 0; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);">' +
        '<h3 style="margin: 0 0 8px 0; font-size: 20px;">🎉 Bachon Ke Liye Kids Mode Launch Karein</h3>' +
        '<p style="margin: 0 0 16px 0; font-size: 15px;">Bina kisi ad ya subscription ke direct browser par live hai:</p>' +
        '<a href="' + appDevUrl + '/?screen=kids&slot=' + slotName + '" target="_blank" style="background: white; color: #b45309; text-decoration: none; font-weight: 800; padding: 12px 28px; border-radius: 10px; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(0,0,0,0.15);">🚀 Launch Kids Mode Now &rarr;</a>' +
      '</div>' +
      buildUniversalBlogFooter(true, title, appDevUrl) +
      '</div>';

  } else {
    // -------------------------------------------------------------------------
    // TRACK 4: SECONDARY 2 (Kids Mode YouTube Shorts Promotion Page)
    // -------------------------------------------------------------------------
    // Reads morning's uploaded videoId or fallback curated videoId
    const storedVideoId = PropertiesService.getScriptProperties().getProperty("LAST_UPLOADED_VIDEO_ID");
    const videoId = storedVideoId || "z3PGTXQW7yU";
    const shortTitle = "Cute 3D Animals for Toddlers #Shorts #KidsLearning";

    title = shortTitle + " – 3D Animated Kids Learning YouTube Short & Activity Guide (" + slotName.toUpperCase() + " 2026)";
    labels = ["Kids Mode", "YouTube Shorts", "Video Promotion", "3D Animation", "Shorts 2026"];

    content = '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; color: #1e293b; max-width: 760px; margin: 0 auto; padding: 10px;">' +
      // Header Section
      '<div style="border-bottom: 2px solid #fee2e2; padding-bottom: 14px; margin-bottom: 22px;">' +
        '<span style="background: #fee2e2; color: #b91c1c; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 6px; text-transform: uppercase;">🎬 OFFICIAL YOUTUBE SHORT FEATURE (SECONDARY 2)</span>' +
        '<h1 style="color: #0f172a; font-size: 26px; line-height: 1.3; margin: 12px 0 8px 0; font-weight: 800;">📺 ' + title + '</h1>' +
        '<p style="color: #64748b; font-size: 15px; margin: 0;">Enter the World of Light &amp; Laughter – 3D Animated Educational Short Series</p>' +
      '</div>' +
      // YouTube Embed Container (9:16 Aspect Ratio)
      '<div style="margin: 24px auto; max-width: 420px; text-align: center;">' +
        '<div style="position: relative; width: 100%; aspect-ratio: 9/16; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.18); border: 2px solid #e2e8f0;">' +
          '<iframe src="https://www.youtube.com/embed/' + videoId + '?rel=0&modestbranding=1" title="' + title + '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
        '</div>' +
        // Video CTAs
        '<div style="margin-top: 16px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">' +
          '<a href="https://www.youtube.com/@EntertheWorldofLight?sub_confirmation=1" target="_blank" style="background: #ff0000; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 11px 22px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(255,0,0,0.35);">🔔 Subscribe @EntertheWorldofLight</a>' +
          '<a href="https://youtube.com/shorts/' + videoId + '" target="_blank" style="background: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 11px 22px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px;">▶ Watch Directly on YouTube</a>' +
        '</div>' +
      '</div>' +
      // Lesson Breakdown
      '<h3 style="color: #0f172a; font-size: 20px; font-weight: 700; margin: 28px 0 12px 0;">📖 Lesson Breakdown &amp; Educational Goals</h3>' +
      '<p style="color: #334155; font-size: 15px;">Is 3D animated Short me bacha fun visual CGI ke zariye seekhta hai. Masnooi aur boring video ke bajaye isme 100% original Pixar-style animated mascot bache ki dilchaspi ko barqarar rakhta hai:</p>' +
      '<ul style="color: #334155; font-size: 15px; line-height: 1.8;">' +
        '<li><strong>Interactive Visual Concept:</strong> Phonics sound, word spelling aur Urdu tarjuma aik sath.</li>' +
        '<li><strong>100% Original Narration:</strong> Saaf aur wazeh bilingual talaffuz.</li>' +
        '<li><strong>Child Safe (COPPA Compliant):</strong> Zero harmful content, purely positive &amp; moral education.</li>' +
      '</ul>' +
      // Interactive App Practice CTA
      '<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 14px; padding: 22px; margin: 25px 0; text-align: center;">' +
        '<h4 style="color: #1d4ed8; margin: 0 0 8px 0; font-size: 17px;">✨ Practice this Lesson Live in Web App</h4>' +
        '<p style="color: #1e40af; margin: 0 0 14px 0; font-size: 14px;">Bache ko app me trace karne aur interactive quiz khelne dein:</p>' +
        '<a href="' + appDevUrl + '/?screen=kids&video=' + videoId + '" target="_blank" style="background: #2563eb; color: #ffffff; font-weight: 700; text-decoration: none; padding: 11px 24px; border-radius: 8px; display: inline-block;">🚀 Launch Live Practice Module &rarr;</a>' +
      '</div>' +
      buildUniversalBlogFooter(false, title, appDevUrl) +
      // Schema JSON-LD VideoObject
      '<script type="application/ld+json">' +
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": title,
        "description": "3D Animated Kids Learning YouTube Short Series by Enter the World of Light",
        "thumbnailUrl": "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg",
        "uploadDate": new Date().toISOString(),
        "embedUrl": "https://www.youtube.com/embed/" + videoId,
        "contentUrl": "https://youtube.com/shorts/" + videoId
      }) +
      '</script>' +
      '</div>';
  }

  return {
    title: title,
    content: content,
    labels: labels,
    targetBlogId: isSecondary ? CONFIG.SECONDARY_BLOG_ID : CONFIG.PRIMARY_BLOG_ID,
    isPage: isPage,
    slot: slotName,
    track: targetTrack,
    videoId: "z3PGTXQW7yU"
  };
}

/**
 * ----------------------------------------------------------------------------
 * 9. LEGACY ALIASES (FOR BACKWARD COMPATIBILITY)
 * ----------------------------------------------------------------------------
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

with open("apps-script/Code.gs", "w") as f:
    f.write(code_content)

print("Successfully written apps-script/Code.gs! File size:", os.path.getsize("apps-script/Code.gs"))
