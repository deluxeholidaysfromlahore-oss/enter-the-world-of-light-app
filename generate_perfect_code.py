import re

perfect_code = r'''/**
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
 * - High-Resolution Brand Banner (Sunburst Logo + Radiant App Emblem)
 * - Contrast-Preserved Canvas: Clean crisp white body card that renders
 *   spectacularly on both Dark and Light Blogger themes without text disappearing.
 * - Interactive Glassmorphism UI badges, gradient action buttons, and icons.
 * - Official WhatsApp Channel Community Card (zero raw phone numbers).
 * - Full JSON-LD structured data for Google Rich Results.
 * ============================================================================
 */

const CONFIG = {
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
 * 1. VISUAL ASSETS & BRAND LOGO ENGINE
 * ----------------------------------------------------------------------------
 * Generates an ultra high-fidelity SVG Hero Banner embedded as a direct image.
 * This ensures Blogger automatically picks up a breathtaking thumbnail,
 * displays the official brand logo, and matches the Web App theme perfectly.
 */
function getBrandHeroBanner(trackTitle, trackCategory, isKidsTheme) {
  const gradient1 = isKidsTheme ? "%23f59e0b" : "%230284c7";
  const gradient2 = isKidsTheme ? "%23ef4444" : "%231e3a8a";
  const badgeBg = isKidsTheme ? "%23fef3c7" : "%23e0f2fe";
  const badgeColor = isKidsTheme ? "%23b45309" : "%230369a1";
  const badgeText = isKidsTheme ? "%F0%9F%A7%B8%20KIDS%20LIGHT%20WORLD" : "%E2%9C%A8%20OFFICIAL%20WEB%20APP%20HUB";
  
  // Clean title for URL encoding
  const safeTitle = encodeURIComponent(trackTitle.replace(/[\"\'\<\>\&]/g, "").substring(0, 48));
  const safeSubtitle = encodeURIComponent(trackCategory.replace(/[\"\'\<\>\&]/g, "").substring(0, 60));

  const svgData = 
    "data:image/svg+xml;utf8," +
    "%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20360%22%20width%3D%22100%25%22%20height%3D%22auto%22%3E" +
    "%3Cdefs%3E" +
    "%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E" +
    "%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22" + gradient1 + "%22%2F%3E" +
    "%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22" + gradient2 + "%22%2F%3E" +
    "%3C%2FlinearGradient%3E" +
    "%3ClinearGradient%20id%3D%22sunGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E" +
    "%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fde047%22%2F%3E" +
    "%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23f59e0b%22%2F%3E" +
    "%3C%2FlinearGradient%3E" +
    "%3Cfilter%20id%3D%22glow%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E" +
    "%3CfeDropShadow%20dx%3D%220%22%20dy%3D%224%22%20stdDeviation%3D%228%22%20flood-color%3D%22%23000000%22%20flood-opacity%3D%220.35%22%2F%3E" +
    "%3C%2Ffilter%3E" +
    "%3C%2Fdefs%3E" +
    "%3Crect%20width%3D%22800%22%20height%3D%22360%22%20rx%3D%2220%22%20fill%3D%22url(%23bgGrad)%22%2F%3E" +
    // Decorative subtle rings
    "%3Ccircle%20cx%3D%22720%22%20cy%3D%2260%22%20r%3D%22100%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.08%22%2F%3E" +
    "%3Ccircle%20cx%3D%2280%22%20cy%3D%22300%22%20r%3D%2280%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.08%22%2F%3E" +
    // Sunburst & Smiling Book Logo
    "%3Cg%20transform%3D%22translate(400%2C%20110)%22%20filter%3D%22url(%23glow)%22%3E" +
    "%3Cg%20stroke%3D%22%23fde047%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.9%22%3E" +
    "%3Cline%20x1%3D%220%22%20y1%3D%22-60%22%20x2%3D%220%22%20y2%3D%22-48%22%2F%3E" +
    "%3Cline%20x1%3D%220%22%20y1%3D%2248%22%20x2%3D%220%22%20y2%3D%2260%22%2F%3E" +
    "%3Cline%20x1%3D%22-60%22%20y1%3D%220%22%20x2%3D%22-48%22%20y1%3D%220%22%2F%3E" +
    "%3Cline%20x1%3D%2248%22%20y1%3D%220%22%20x2%3D%2260%22%20y2%3D%220%22%2F%3E" +
    "%3Cline%20x1%3D%22-42%22%20y1%3D%22-42%22%20x2%3D%22-34%22%20y2%3D%22-34%22%2F%3E" +
    "%3Cline%20x1%3D%2234%22%20y1%3D%2234%22%20x2%3D%2242%22%20y2%3D%2242%22%2F%3E" +
    "%3Cline%20x1%3D%22-42%22%20y1%3D%2242%22%20x2%3D%22-34%22%20y2%3D%2234%22%2F%3E" +
    "%3Cline%20x1%3D%2234%22%20y1%3D%22-42%22%20x2%3D%2242%22%20y2%3D%22-34%22%2F%3E" +
    "%3C%2Fg%3E" +
    "%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%2238%22%20fill%3D%22url(%23sunGrad)%22%2F%3E" +
    "%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%2230%22%20fill%3D%22%23fbbf24%22%2F%3E" +
    "%3Cpath%20d%3D%22M-22%2012%20C-12%204%20-4%205%200%209%20C4%205%2012%204%2022%2012%20C16%2020%206%2019%200%2016%20C-6%2019%20-16%2020%20-22%2012%20Z%22%20fill%3D%22%23ffffff%22%2F%3E" +
    "%3Cpath%20d%3D%22M-10%20-2%20C-7%204%207%204%2010%20-2%22%20stroke%3D%22%230f172a%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%2F%3E" +
    "%3Ccircle%20cx%3D%220%22%20cy%3D%22-16%22%20r%3D%223%22%20fill%3D%22%23ffffff%22%2F%3E" +
    "%3C%2Fg%3E" +
    // Badge pill
    "%3Crect%20x%3D%22260%22%20y%3D%22195%22%20width%3D%22280%22%20height%3D%2228%22%20rx%3D%2214%22%20fill%3D%22" + badgeBg + "%22%20opacity%3D%220.95%22%2F%3E" +
    "%3Ctext%20x%3D%22400%22%20y%3D%22214%22%20font-family%3D%22sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22800%22%20fill%3D%22" + badgeColor + "%22%20text-anchor%3D%22middle%22%3E" + badgeText + "%3C%2Ftext%3E" +
    // Main Brand Name
    "%3Ctext%20x%3D%22400%22%20y%3D%22260%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20font-weight%3D%22900%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EEnter%20the%20World%20of%20Light%20%26amp%3B%20Laughter%3C%2Ftext%3E" +
    // Subtitle / Topic
    "%3Ctext%20x%3D%22400%22%20y%3D%22295%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20font-weight%3D%22700%22%20fill%3D%22%23fde047%22%20text-anchor%3D%22middle%22%3E" + safeTitle + "%3C%2Ftext%3E" +
    // Tagline
    "%3Ctext%20x%3D%22400%22%20y%3D%22325%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22600%22%20fill%3D%22%23e0f2fe%22%20text-anchor%3D%22middle%22%3E" + safeSubtitle + "%3C%2Ftext%3E" +
    "%3C%2Fsvg%3E";

  return '<div style="margin: 0 0 24px 0; text-align: center; overflow: hidden; border-radius: 18px; box-shadow: 0 10px 25px rgba(2,132,199,0.25);">' +
    '<img src="' + svgData + '" alt="' + trackTitle + '" style="width: 100%; max-width: 800px; height: auto; display: block; margin: 0 auto; border-radius: 18px;" />' +
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
  Logger.log("▶️ [TRACK 3] Publishing Secondary 1 (Kids Mode Learning Post) for slot: " + slotName);
  return executeTrackPublishing(slotName, "secondary_post");
}

function publishSecondary_2_Page(slotName) {
  slotName = slotName || "evening";
  Logger.log("▶️ [TRACK 4] Publishing Secondary 2 (Kids YouTube Shorts Promotion Page) for slot: " + slotName);
  return executeTrackPublishing(slotName, "secondary_page");
}

/**
 * Slot Trigger Handlers
 */
function triggerMorningPrimary1() {
  Logger.log("⏰ [CRON MORNING 9:00 AM] Triggering Morning Slot");
  autoUploadMorningKidsShort(); // Upload morning short to YouTube channel
  return publishPrimary_1_Post("morning");
}

function triggerAfternoonPrimary2() {
  Logger.log("⏰ [CRON AFTERNOON 2:00 PM] Triggering Afternoon Slot");
  return publishPrimary_2_Page("afternoon");
}

function triggerEveningSecondary() {
  Logger.log("⏰ [CRON EVENING 7:00 PM] Triggering Evening Slot");
  publishSecondary_1_Post("evening");
  return publishSecondary_2_Page("evening");
}

/**
 * ----------------------------------------------------------------------------
 * 3. TRACK EXECUTION & PUBLISHING ENGINE
 * ----------------------------------------------------------------------------
 */
function executeTrackPublishing(slotName, targetTrack) {
  try {
    const postData = fetchContentFromBackend(slotName, targetTrack);
    const result = publishItem(postData.targetBlogId, postData.title, postData.content, postData.labels, postData.isPage);
    Logger.log("🎉 [SUCCESS] Item published successfully!");
    Logger.log("🆔 ID: " + result.id);
    Logger.log("🔗 URL: " + (result.url || "N/A"));
    return result;
  } catch (error) {
    Logger.log("❌ [FATAL ERROR] Failed publishing " + targetTrack + ": " + error.toString());
    throw error;
  }
}

/**
 * ----------------------------------------------------------------------------
 * 4. CONTENT RESOLVER: ULTRA-ROBUST AUTONOMOUS ENGINE
 * ----------------------------------------------------------------------------
 */
function fetchContentFromBackend(slotName, targetTrack) {
  if (CONFIG.AUTONOMOUS_MODE) {
    Logger.log("⚡ [AUTONOMOUS ENGINE] Generating luxury responsive article for: " + targetTrack + " (" + slotName + ")");
    return generateBuiltinFallback(slotName, targetTrack);
  }

  const endpoint = CONFIG.API_BASE_URL + "/api/marketing/next-post-for-blogger?slot=" + encodeURIComponent(slotName) + "&target=" + encodeURIComponent(targetTrack);
  Logger.log("🌐 [BACKEND FETCH] Calling API: " + endpoint);

  try {
    const response = UrlFetchApp.fetch(endpoint, {
      method: "GET",
      muteHttpExceptions: true,
      headers: { "Accept": "application/json" }
    });

    const responseCode = response.getResponseCode();
    const rawText = response.getContentText().trim();

    if (responseCode === 200 && rawText.charAt(0) === "{") {
      const data = JSON.parse(rawText);
      if (data && data.content && data.title) {
        Logger.log("✅ [BACKEND FETCH] Successfully loaded remote dynamic content.");
        return data;
      }
    }
    Logger.log("⚠️ Backend returned non-JSON. Falling back to built-in luxury engine.");
    return generateBuiltinFallback(slotName, targetTrack);
  } catch (err) {
    Logger.log("⚠️ Backend connection error: " + err.message + ". Using built-in luxury engine.");
    return generateBuiltinFallback(slotName, targetTrack);
  }
}

/**
 * ----------------------------------------------------------------------------
 * 5. BLOGGER REST API PUBLISHER
 * ----------------------------------------------------------------------------
 */
function publishItem(blogId, title, content, labels, isPage) {
  const token = ScriptApp.getOAuthToken();
  const endpoint = isPage
    ? "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/pages"
    : "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts";

  Logger.log("🚀 [BLOGGER API] Publishing " + (isPage ? "PAGE" : "POST") + " to Blog ID: " + blogId);
  Logger.log("📌 Title: " + title);

  const payload = {
    kind: isPage ? "blogger#page" : "blogger#post",
    title: title,
    content: content
  };

  if (!isPage && labels && labels.length > 0) {
    payload.labels = labels;
  }

  const response = UrlFetchApp.fetch(endpoint, {
    method: "POST",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + token
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  const statusCode = response.getResponseCode();
  const responseText = response.getContentText();

  if (statusCode >= 200 && statusCode < 300) {
    return JSON.parse(responseText);
  } else {
    throw new Error("Blogger API Error HTTP " + statusCode + ": " + responseText);
  }
}

/**
 * ----------------------------------------------------------------------------
 * 6. YOUTUBE SHORTS AUTO-UPLOADER (MORNING SYNC)
 * ----------------------------------------------------------------------------
 */
function autoUploadMorningKidsShort() {
  Logger.log("🎬 [YOUTUBE AUTO-UPLOAD] Scanning Google Drive for new morning Kids Shorts...");
  try {
    const folders = DriveApp.getFoldersByName("YouTube_Shorts_Queue");
    if (!folders.hasNext()) {
      Logger.log("ℹ️ No 'YouTube_Shorts_Queue' folder found. Using curated video ID: " + CONFIG.FALLBACK_KIDS_SHORT_ID);
      PropertiesService.getScriptProperties().setProperty("LAST_UPLOADED_VIDEO_ID", CONFIG.FALLBACK_KIDS_SHORT_ID);
      return CONFIG.FALLBACK_KIDS_SHORT_ID;
    }

    const folder = folders.next();
    const files = folder.getFilesByType("video/mp4");
    if (!files.hasNext()) {
      Logger.log("ℹ️ No new video pending in queue. Using last uploaded short ID.");
      return PropertiesService.getScriptProperties().getProperty("LAST_UPLOADED_VIDEO_ID") || CONFIG.FALLBACK_KIDS_SHORT_ID;
    }

    const videoFile = files.next();
    const videoBlob = videoFile.getBlob();
    const videoTitle = videoFile.getName().replace(".mp4", "") + " #Shorts #KidsLearning";

    Logger.log("📤 Uploading Short to YouTube: " + videoTitle);

    const metadata = {
      snippet: {
        title: videoTitle,
        description: "Official 3D Animated Learning Short from Enter the World of Light & Laughter.\n\nPlay games & learn: " + CONFIG.API_BASE_URL + "/?screen=kids\nJoin WhatsApp Channel: " + CONFIG.WHATSAPP_CHANNEL_URL,
        tags: ["Shorts", "KidsLearning", "UrduKids", "EnterTheWorldOfLight", "Phonics", "Preschool"],
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

    const requestBody = Utilities.newBlob(
      delimiter +
      "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
      JSON.stringify(metadata) +
      delimiter +
      "Content-Type: video/mp4\r\n\r\n"
    ).getBytes().concat(videoBlob.getBytes()).concat(Utilities.newBlob(closeDelim).getBytes());

    const res = UrlFetchApp.fetch(uploadUrl, {
      method: "POST",
      contentType: "multipart/related; boundary=" + boundary,
      headers: { Authorization: "Bearer " + token },
      payload: requestBody,
      muteHttpExceptions: true
    });

    if (res.getResponseCode() === 200) {
      const data = JSON.parse(res.getContentText());
      const newVideoId = data.id;
      Logger.log("🎉 Short Uploaded Successfully! Video ID: " + newVideoId);
      PropertiesService.getScriptProperties().setProperty("LAST_UPLOADED_VIDEO_ID", newVideoId);
      PropertiesService.getScriptProperties().setProperty("LAST_UPLOADED_TITLE", videoTitle);
      
      // Move processed video to archive
      const archiveFolders = DriveApp.getFoldersByName("YouTube_Shorts_Archive");
      if (archiveFolders.hasNext()) {
        archiveFolders.next().createFile(videoBlob.setName("UPLOADED_" + videoFile.getName()));
        videoFile.setTrashed(true);
      }
      return newVideoId;
    } else {
      Logger.log("⚠️ YouTube upload warning: " + res.getContentText() + ". Using fallback ID.");
      return CONFIG.FALLBACK_KIDS_SHORT_ID;
    }
  } catch (e) {
    Logger.log("⚠️ Upload bypass: " + e.toString() + ". Using fallback video ID: " + CONFIG.FALLBACK_KIDS_SHORT_ID);
    PropertiesService.getScriptProperties().setProperty("LAST_UPLOADED_VIDEO_ID", CONFIG.FALLBACK_KIDS_SHORT_ID);
    return CONFIG.FALLBACK_KIDS_SHORT_ID;
  }
}

/**
 * ----------------------------------------------------------------------------
 * 7. UNIVERSAL BLOG FOOTER (ZERO RAW NUMBERS, LUXURY RESPONSIVE DESIGN)
 * ----------------------------------------------------------------------------
 */
function buildUniversalBlogFooter(isPrimaryBlog, pageTitle, appUrl) {
  const channelUrl = CONFIG.WHATSAPP_CHANNEL_URL;
  const masterBlogUrl = CONFIG.PRIMARY_BLOG_URL;
  const encodedTitle = encodeURIComponent(pageTitle);
  const encodedUrl = encodeURIComponent(masterBlogUrl);

  const crossLinkBox = isPrimaryBlog
    ? '<div style="background: linear-gradient(135deg, #fef3c7, #fffbeb); border: 2px dashed #f59e0b; border-radius: 14px; padding: 20px; margin-bottom: 24px; text-align: center;">' +
        '<span style="background: #f59e0b; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">👶 Special Kids Mode Portal</span>' +
        '<h3 style="color: #92400e; font-size: 18px; margin: 10px 0 6px 0; font-weight: 800;">Looking for Interactive Kids Fun &amp; 3D Animated Stories?</h3>' +
        '<p style="color: #78350f; font-size: 14px; margin: 0 0 14px 0;">Visit our dedicated Kids Mode Portal for Urdu phonics, tracing games, and cartoon fables!</p>' +
        '<a href="https://www.blogger.com/blog/posts/' + CONFIG.SECONDARY_BLOG_ID + '" target="_blank" style="background: #f59e0b; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 13px; padding: 10px 22px; border-radius: 25px; display: inline-block; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">' +
          '🎈 Open Kids Mode Blog &rarr;' +
        '</a>' +
      '</div>'
    : '<div style="background: linear-gradient(135deg, #ecfdf5, #f0fdf4); border: 2px dashed #10b981; border-radius: 14px; padding: 20px; margin-bottom: 24px; text-align: center;">' +
        '<span style="background: #10b981; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">⭐ Official Master Authority Hub</span>' +
        '<h3 style="color: #065f46; font-size: 18px; margin: 10px 0 6px 0; font-weight: 800;">Read the Full Web App Master Guide &amp; Literature Portal!</h3>' +
        '<p style="color: #047857; font-size: 14px; margin: 0 0 14px 0;">Access in-depth Urdu literature, Allama Iqbal research, and complete cognitive tools.</p>' +
        '<a href="' + masterBlogUrl + '" target="_blank" style="background: #059669; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 13px; padding: 10px 22px; border-radius: 25px; display: inline-block; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);">' +
          '📖 View Master Application Hub &rarr;' +
        '</a>' +
      '</div>';

  const shareButtons = 
    '<div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-bottom: 22px;">' +
      '<h4 style="color: #1e293b; font-size: 14px; font-weight: 800; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">📢 Share With Friends &amp; Family</h4>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center;">' +
        '<a href="https://api.whatsapp.com/send?text=' + encodedTitle + '%20' + encodedUrl + '" target="_blank" style="background: #25D366; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 12px; padding: 8px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 5px;">💬 WhatsApp</a>' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl + '" target="_blank" style="background: #1877F2; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 12px; padding: 8px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 5px;">📘 Facebook</a>' +
        '<a href="https://twitter.com/intent/tweet?text=' + encodedTitle + '&url=' + encodedUrl + '" target="_blank" style="background: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 12px; padding: 8px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 5px;">𝕏 Twitter</a>' +
        '<a href="https://pinterest.com/pin/create/button/?url=' + encodedUrl + '&description=' + encodedTitle + '" target="_blank" style="background: #BD081C; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 12px; padding: 8px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 5px;">📌 Pinterest</a>' +
        '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl + '" target="_blank" style="background: #0A66C2; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 12px; padding: 8px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 5px;">💼 LinkedIn</a>' +
      '</div>' +
    '</div>';

  const communityLinks = 
    '<div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">' +
      '<h4 style="color: #0f172a; font-size: 14px; font-weight: 800; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">✨ Official Communities &amp; Channels</h4>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center;">' +
        '<a href="' + CONFIG.YOUTUBE_URL + '?sub_confirmation=1" target="_blank" style="background: #FF0000; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 12px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 3px 8px rgba(255,0,0,0.3);">▶️ YouTube Channel</a>' +
        '<a href="' + channelUrl + '" target="_blank" style="background: #25D366; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 12px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 3px 8px rgba(37,211,102,0.3);">🟢 WhatsApp Channel</a>' +
        '<a href="' + appUrl + '/?utm_source=blogger_footer&utm_medium=live_app_btn" target="_blank" style="background: linear-gradient(135deg, #0284c7, #2563eb); color: #ffffff; text-decoration: none; font-weight: 800; font-size: 12px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 3px 8px rgba(2,132,199,0.3);">🚀 Web App (Live)</a>' +
      '</div>' +
    '</div>';

  return '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05); margin: 30px auto 15px auto; max-width: 760px; padding: 22px 18px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; text-align: center; color: #1e293b;">' +
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
    // Alternates topics each day so content is 100% fresh!
    // -------------------------------------------------------------------------
    const topic = isEvenDay 
      ? "Interactive Bilingual Learning & Urdu Haroof Tracing Engine"
      : "Classical Urdu Poetry Explorer & Interactive Mind Gym";
    
    const subtitle = isEvenDay
      ? "Child-safe AI companion Sunny, instant stroke tracing & bilingual phonetics"
      : "Allama Iqbal, Faiz Ahmad Faiz recitations, Tashreeh & cognitive puzzles";

    title = topic + " – Enter the World of Light & Laughter (" + slotName.toUpperCase() + " 2026 Edition)";
    labels = ["Web App Hub", "App Features", "Urdu Learning", "Bilingual Education", "Google 2026"];

    const heroBannerHtml = getBrandHeroBanner(topic, subtitle, false);

    content = 
      // Main Card Wrapper: Explicit crisp white background so dark Blogger themes never make text black!
      '<div style="background-color: #ffffff !important; color: #1e293b !important; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; max-width: 780px; margin: 0 auto; padding: 24px; border-radius: 18px; box-shadow: 0 4px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">' +
      // Google-only indexing signal
      '<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">' +
        'This is the PRIMARY MAIN BLOG POST for Enter the World of Light and Laughter Web App. Primary Source for Google Indexing.' +
      '</div>' +

      // 1. Featured Visual Brand Banner (Logo + Emblem)
      heroBannerHtml +

      // Top Slot Badge
      '<div style="margin-bottom: 14px; text-align: left;">' +
        '<span style="background: linear-gradient(135deg, #0284c7, #2563eb); color: #ffffff; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">🚀 OFFICIAL WEB APP SPOTLIGHT | ' + slotName.toUpperCase() + ' 2026</span>' +
      '</div>' +

      '<h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.3; font-weight: 800; margin: 10px 0 14px 0; text-align: left;">' + title + '</h1>' +
      '<p style="color: #475569 !important; font-size: 16px; margin-bottom: 22px; text-align: left;"><strong>Enter the World of Light &amp; Laughter</strong> – ' + subtitle + '</p>' +

      // Hero Interactive Card
      '<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 18px; padding: 28px 24px; color: #ffffff !important; margin: 24px 0; box-shadow: 0 12px 30px rgba(15,23,42,0.25); border: 1px solid #334155; text-align: left;">' +
        '<div style="display: inline-block; background: #38bdf8; color: #0f172a; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 12px;">🌟 Live Web Experience</div>' +
        '<h2 style="color: #ffffff !important; font-size: 22px; margin: 0 0 12px 0; line-height: 1.4;">' + topic + '</h2>' +
        '<p style="color: #cbd5e1 !important; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">Hamari official web application me ab bilkul naye features live ho chuke hain jo Pakistan aur worldwide users ko direct browser se high-speed bilingual learning provide karte hain. Zero installation, zero lag!</p>' +
        '<div style="display: flex; gap: 12px; flex-wrap: wrap;">' +
          '<a href="' + appDevUrl + '/?utm_source=blogger_primary1&utm_medium=blog_post" target="_blank" style="background: #38bdf8; color: #0f172a !important; text-decoration: none; font-weight: 800; padding: 12px 24px; border-radius: 10px; font-size: 14px; display: inline-block; box-shadow: 0 4px 14px rgba(56, 189, 248, 0.4);">🚀 Launch Web App Now &rarr;</a>' +
          '<a href="' + CONFIG.YOUTUBE_URL + '?sub_confirmation=1" target="_blank" style="background: #ef4444; color: #ffffff !important; text-decoration: none; font-weight: 700; padding: 12px 24px; border-radius: 10px; font-size: 14px; display: inline-block;">▶️ Watch on YouTube</a>' +
        '</div>' +
      '</div>' +

      // Feature Highlights
      '<h3 style="color: #0f172a !important; font-size: 20px; font-weight: 800; margin: 28px 0 14px 0; text-align: left;">📌 App Ke Naye Modules &amp; Daily Practice Benefits</h3>' +
      '<div style="display: grid; grid-template-columns: 1fr; gap: 14px; margin-bottom: 25px; text-align: left;">' +
        '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">' +
          '<h4 style="color: #0284c7 !important; margin: 0 0 6px 0; font-size: 16px; font-weight: 700;">🔤 Haroof-e-Tahajji &amp; ABC Phonics</h4>' +
          '<p style="margin: 0; color: #475569 !important; font-size: 14px;">Real-time finger tracing stroke guide aur bilingual voice pronunciation with visual praise.</p>' +
        '</div>' +
        '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">' +
          '<h4 style="color: #7c3aed !important; margin: 0 0 6px 0; font-size: 16px; font-weight: 700;">📖 Classical Urdu Adab &amp; Poetry</h4>' +
          '<p style="margin: 0; color: #475569 !important; font-size: 14px;">Allama Iqbal ki nazmein aur hikmat se bhare ashaar with audio recitations aur simple tashreeh.</p>' +
        '</div>' +
        '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">' +
          '<h4 style="color: #059669 !important; margin: 0 0 6px 0; font-size: 16px; font-weight: 700;">🧠 Mind Agility &amp; Logic Gym</h4>' +
          '<p style="margin: 0; color: #475569 !important; font-size: 14px;">Hafiza aur logic barhane wale mazedaar sawalat jo dimagh ko sharp aur focus banate hain.</p>' +
        '</div>' +
        '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">' +
          '<h4 style="color: #d97706 !important; margin: 0 0 6px 0; font-size: 16px; font-weight: 700;">🛡️ 100% Ad-Free, Kid-Safe Environment</h4>' +
          '<p style="margin: 0; color: #475569 !important; font-size: 14px;">Zero third-party ads, zero tracking, purely verified educational space for children and family.</p>' +
        '</div>' +
      '</div>' +

      // About App Banner
      '<div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 14px; padding: 20px; margin: 25px 0; line-height: 1.7; text-align: left;">' +
        '<h4 style="color: #0369a1 !important; margin: 0 0 8px 0; font-size: 17px; font-weight: 700;">🌟 About Enter the World of Light &amp; Laughter</h4>' +
        '<p style="margin: 0; color: #0f172a !important; font-size: 14px;">Enter the World of Light &amp; Laughter ek mukammal multi-generational learning aur wisdom platform hai jo Google Search aur YouTube verified educational content deliver karta hai.</p>' +
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

    const heroBannerHtml = getBrandHeroBanner(pillarTitle, "Evergreen Syllabus & Complete Educational Directory", false);

    content = 
      '<div style="background-color: #ffffff !important; color: #1e293b !important; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; max-width: 780px; margin: 0 auto; padding: 24px; border-radius: 18px; box-shadow: 0 4px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">' +
      heroBannerHtml +
      '<div style="text-align: left;">' +
        '<span style="background: #e0f2fe; color: #0369a1; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 6px; text-transform: uppercase;">📘 EVERGREEN RESOURCE PILLAR (PRIMARY 2)</span>' +
        '<h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.3; margin: 12px 0 8px 0; font-weight: 800;">' + pillarTitle + '</h1>' +
        '<p style="color: #64748b !important; font-size: 15px; margin: 0 0 24px 0;">Comprehensive syllabus breakdown provided by Enter the World of Light &amp; Laughter</p>' +
      '</div>' +

      '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; margin-bottom: 18px; text-align: left;">' +
        '<h3 style="color: #1e293b !important; margin: 0 0 8px 0; font-size: 18px; font-weight: 700;">1. Urdu &amp; English Foundational Phonics (Ages 3-8)</h3>' +
        '<p style="margin: 0; color: #334155 !important; font-size: 14px;">Haroof-e-Tahajji tracing stroke direction, bilingual voice feedback, aur basic reading vocabulary foundation.</p>' +
      '</div>' +

      '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; margin-bottom: 18px; text-align: left;">' +
        '<h3 style="color: #1e293b !important; margin: 0 0 8px 0; font-size: 18px; font-weight: 700;">2. Allama Iqbal &amp; Classical Wisdom Library</h3>' +
        '<p style="margin: 0; color: #334155 !important; font-size: 14px;">Bachon aur nojawano ke liye Allama Iqbal ki mashoor nazmein with aasan Urdu tashreeh aur ethical reflections.</p>' +
      '</div>' +

      '<div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 14px; padding: 22px; margin: 25px 0; text-align: center;">' +
        '<h3 style="color: #065f46 !important; margin: 0 0 10px 0; font-size: 18px; font-weight: 800;">🚀 Practice the Complete Curriculum Inside the Web App</h3>' +
        '<p style="color: #047857 !important; margin: 0 0 16px 0; font-size: 14px;">Tamam modules bina kisi download ya installation ke direct browser par live hain.</p>' +
        '<a href="' + appDevUrl + '/?utm_source=blogger_primary2&utm_medium=pillar_page" target="_blank" style="background: #059669; color: #ffffff !important; text-decoration: none; font-weight: 700; padding: 12px 26px; border-radius: 8px; display: inline-block;">Open Full Interactive Syllabus &rarr;</a>' +
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

    const heroBannerHtml = getBrandHeroBanner(kidsTopic, kidsSub, true);

    content = 
      '<div style="background-color: #ffffff !important; color: #1e293b !important; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; max-width: 780px; margin: 0 auto; padding: 24px; border-radius: 18px; box-shadow: 0 4px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">' +
      heroBannerHtml +
      '<div style="text-align: left;">' +
        '<span style="background: #fef3c7; color: #b45309; font-size: 12px; font-weight: 800; padding: 5px 12px; border-radius: 6px; text-transform: uppercase;">🧸 KIDS MODE PORTAL (' + slotName.toUpperCase() + ')</span>' +
        '<h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.3; margin: 12px 0 8px 0; font-weight: 800;">🎈 ' + title + '</h1>' +
        '<p style="color: #475569 !important; font-size: 16px; margin-bottom: 20px;"><strong>Enter the World of Light &amp; Laughter (Kids Mode)</strong> – ' + kidsSub + '</p>' +
        '<p style="color: #334155 !important; font-size: 15px;">Kids Mode ko khas taur par chotay bachon (ages 2 to 8) ki dimaghi tarbiyat aur interactive seekhne ke liye design kiya gaya hai. Isme bacha boring ratta lagane ke bajaye khel khel me seekhta hai:</p>' +
      '</div>' +

      // Playful Feature Box
      '<div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 14px; padding: 22px; margin: 22px 0; text-align: left;">' +
        '<h3 style="color: #b45309 !important; margin: 0 0 12px 0; font-size: 18px; font-weight: 800;">🌟 Kids Mode Ke Key Features</h3>' +
        '<ul style="margin: 0; padding-left: 20px; color: #78350f !important; font-size: 15px; line-height: 1.8;">' +
          '<li><strong>Urdu Haroof-e-Tahajji:</strong> Alif, Bay, Pay ki animated tracing with cute cartoon sound effects.</li>' +
          '<li><strong>English ABC Phonics:</strong> A for Apple se Z for Zebra tak clear audio pronunciation.</li>' +
          '<li><strong>Sunny Companion:</strong> Bachon ka pyara dost Sunny jo har achi koshish par taalian bajata hai!</li>' +
          '<li><strong>Moral Bedtime Stories:</strong> Sach bolne, dosti aur walidain ki khidmat ki pyari kahaniyan.</li>' +
        '</ul>' +
      '</div>' +

      // CTA Box
      '<div style="background: linear-gradient(135deg, #f59e0b, #ef4444); border-radius: 14px; padding: 24px; text-align: center; color: white !important; margin: 25px 0; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);">' +
        '<h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 800; color: #ffffff !important;">🎉 Bachon Ke Liye Kids Mode Launch Karein</h3>' +
        '<p style="margin: 0 0 16px 0; font-size: 15px; color: #ffffff !important;">Bina kisi ad ya subscription ke direct browser par live hai:</p>' +
        '<a href="' + appDevUrl + '/?screen=kids&slot=' + slotName + '" target="_blank" style="background: white; color: #b45309 !important; text-decoration: none; font-weight: 800; padding: 12px 28px; border-radius: 10px; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(0,0,0,0.15);">🚀 Launch Kids Mode Now &rarr;</a>' +
      '</div>' +

      buildUniversalBlogFooter(true, title, appDevUrl) +
      '</div>';

  } else {
    // -------------------------------------------------------------------------
    // TRACK 4: SECONDARY 2 (Kids Mode YouTube Shorts Promotion Page)
    // -------------------------------------------------------------------------
    // Reads morning's uploaded videoId or fallback curated videoId
    const storedVideoId = PropertiesService.getScriptProperties().getProperty("LAST_UPLOADED_VIDEO_ID");
    const videoId = storedVideoId || CONFIG.FALLBACK_KIDS_SHORT_ID;
    const shortTitle = "Cute 3D Animals for Toddlers #Shorts #KidsLearning";
    
    title = shortTitle + " – 3D Animated Kids Learning YouTube Short & Activity Guide (" + slotName.toUpperCase() + " 2026)";
    labels = ["Kids Mode", "YouTube Shorts", "Video Promotion", "3D Animation", "Shorts 2026"];

    content = 
      '<div style="background-color: #ffffff !important; color: #1e293b !important; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; line-height: 1.8; max-width: 780px; margin: 0 auto; padding: 24px; border-radius: 18px; box-shadow: 0 4px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">' +
      // Header Section
      '<div style="border-bottom: 2px solid #fee2e2; padding-bottom: 14px; margin-bottom: 22px; text-align: left;">' +
        '<span style="background: #fee2e2; color: #b91c1c; font-size: 12px; font-weight: 800; padding: 5px 12px; border-radius: 6px; text-transform: uppercase;">🎬 OFFICIAL YOUTUBE SHORT FEATURE (SECONDARY 2)</span>' +
        '<h1 style="color: #0f172a !important; font-size: 26px; line-height: 1.3; margin: 12px 0 8px 0; font-weight: 800;">📺 ' + title + '</h1>' +
        '<p style="color: #64748b !important; font-size: 15px; margin: 0;">Enter the World of Light &amp; Laughter – 3D Animated Educational Short Series</p>' +
      '</div>' +

      // High-Quality YouTube Video Thumbnail (Blogger Featured Image Signal)
      '<div style="text-align: center; margin-bottom: 20px;">' +
        '<img src="https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg" alt="' + title + '" style="width: 100%; max-width: 600px; border-radius: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.15);" />' +
      '</div>' +

      // YouTube Embed Container (9:16 Aspect Ratio)
      '<div style="margin: 24px auto; max-width: 420px; text-align: center;">' +
        '<div style="position: relative; width: 100%; aspect-ratio: 9/16; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.18); border: 2px solid #e2e8f0;">' +
          '<iframe src="https://www.youtube.com/embed/' + videoId + '?rel=0&modestbranding=1" title="' + title + '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
        '</div>' +

        // Video CTAs
        '<div style="margin-top: 16px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">' +
          '<a href="' + CONFIG.YOUTUBE_URL + '?sub_confirmation=1" target="_blank" style="background: #ff0000; color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 13px; padding: 11px 22px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(255,0,0,0.35);">🔔 Subscribe @EntertheWorldofLight</a>' +
          '<a href="https://youtube.com/shorts/' + videoId + '" target="_blank" style="background: #0f172a; color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 13px; padding: 11px 22px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px;">▶ Watch Directly on YouTube</a>' +
        '</div>' +
      '</div>' +

      // Lesson Breakdown
      '<div style="text-align: left;">' +
        '<h3 style="color: #0f172a !important; font-size: 20px; font-weight: 800; margin: 28px 0 12px 0;">📖 Lesson Breakdown &amp; Educational Goals</h3>' +
        '<p style="color: #334155 !important; font-size: 15px;">Is 3D animated Short me bacha fun visual CGI ke zariye seekhta hai. Masnooi aur boring video ke bajaye isme 100% original animated mascot bache ki dilchaspi ko barqarar rakhta hai:</p>' +
        '<ul style="color: #334155 !important; font-size: 15px; line-height: 1.8;">' +
          '<li><strong>Interactive Visual Concept:</strong> Phonics sound, word spelling aur Urdu tarjuma aik sath.</li>' +
          '<li><strong>100% Original Narration:</strong> Saaf aur wazeh bilingual talaffuz.</li>' +
          '<li><strong>Child Safe (COPPA Compliant):</strong> Zero harmful content, purely positive &amp; moral education.</li>' +
        '</ul>' +
      '</div>' +

      // Interactive App Practice CTA
      '<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 14px; padding: 22px; margin: 25px 0; text-align: center;">' +
        '<h4 style="color: #1d4ed8 !important; margin: 0 0 8px 0; font-size: 17px; font-weight: 800;">✨ Practice this Lesson Live in Web App</h4>' +
        '<p style="color: #1e40af !important; margin: 0 0 14px 0; font-size: 14px;">Bache ko app me trace karne aur interactive quiz khelne dein:</p>' +
        '<a href="' + appDevUrl + '/?screen=kids&video=' + videoId + '" target="_blank" style="background: #2563eb; color: #ffffff !important; font-weight: 800; text-decoration: none; padding: 11px 24px; border-radius: 8px; display: inline-block;">🚀 Launch Live Practice Module &rarr;</a>' +
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

with open("apps-script/Master Controller.gs", "w") as f:
    f.write(perfect_code)

with open("apps-script/Code.gs", "w") as f:
    f.write(perfect_code)

print("Master Controller.gs and Code.gs written successfully!")
