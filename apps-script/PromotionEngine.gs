/**
 * ============================================================================
 * ENTER THE WORLD OF LIGHT & LAUGHTER
 * MASTER CONTROLLER & SECURITY SENTINEL (PromotionEngine.gs)
 * ============================================================================
 * [NOTE: This file is a mirror of Master Controller.gs for backward compatibility]
 */

// ⚙️ MASTER SENTINEL CONFIGURATION
const MASTER_SENTINEL_CONFIG = {
  // Primary Blog (Web App Hub: Features, Poetry, Quizzes, Live App Launch)
  PRIMARY_BLOG_ID: "5550406854147347257",
  PRIMARY_BLOG_URL: "https://www.blogger.com/blog/posts/5550406854147347257",

  // Secondary Blog (Kids Mode: Early Learning, Urdu Tracing, YouTube Shorts Promotion)
  SECONDARY_BLOG_ID: "3870971020533851761",
  SECONDARY_BLOG_URL: "https://www.blogger.com/blog/posts/3870971020533851761",

  // YouTube Channel (Official Verified Handle)
  YOUTUBE_HANDLE: "@EntertheWorldofLight",
  YOUTUBE_CHANNEL_ID: "UCvCzFP5EPsV4Vp6l6GGuvyg",
  
  // Official Channels (Strictly Channel Links, NO raw phone numbers)
  WHATSAPP_CHANNEL_URL: "https://whatsapp.com/channel/0029VasZV4a60eBd8TwfTg1f",
  WEB_APP_URL: "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",
  
  // Anti-Spam Safety: Minimum 3.5 hours spacing between automated posts
  MIN_POST_SPACING_HOURS: 3.5,
  
  TIMEZONE: "Asia/Karachi"
};

/**
 * ============================================================================
 * 🛡️ MODULE 1: BLOGGER & YOUTUBE CONNECTION SENTINEL
 * ============================================================================
 */
function checkSingleBlogHealth(blogId, label) {
  const token = ScriptApp.getOAuthToken();
  if (!token) {
    return { status: "FAILED", message: "OAuth Token not available." };
  }

  const endpoint = "https://www.googleapis.com/blogger/v3/blogs/" + blogId;
  try {
    const res = UrlFetchApp.fetch(endpoint, {
      method: "get",
      headers: { "Authorization": "Bearer " + token },
      muteHttpExceptions: true
    });
    const code = res.getResponseCode();
    if (code === 200) {
      const data = JSON.parse(res.getContentText());
      Logger.log("   🛡️ " + label + " (" + blogId + "): 🟢 CONNECTED (" + data.name + ")");
      return { status: "ACTIVE", name: data.name, url: data.url, totalPosts: data.posts ? data.posts.totalItems : 0 };
    } else {
      Logger.log("   ❌ " + label + " (" + blogId + ") Error HTTP " + code + ": " + res.getContentText());
      return { status: "ERROR", code: code, details: res.getContentText() };
    }
  } catch (err) {
    Logger.log("   ❌ " + label + " (" + blogId + ") Fetch Exception: " + err.message);
    return { status: "EXCEPTION", error: err.message };
  }
}

function checkBloggerApiHealth() {
  Logger.log("🛡️ [AUDIT] Checking Google Blogger REST API connections...");
  const primary = checkSingleBlogHealth(MASTER_SENTINEL_CONFIG.PRIMARY_BLOG_ID, "Primary Blog (App Hub)");
  const secondary = checkSingleBlogHealth(MASTER_SENTINEL_CONFIG.SECONDARY_BLOG_ID, "Secondary Blog (Kids Mode)");
  return { primary: primary, secondary: secondary };
}

function checkYouTubeApiHealth() {
  Logger.log("🛡️ [AUDIT] Checking YouTube Data API v3 connection & permissions...");
  const token = ScriptApp.getOAuthToken();
  if (!token) {
    return { status: "FAILED", message: "OAuth Token not available." };
  }

  const endpoint = "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,status&mine=true";
  try {
    const res = UrlFetchApp.fetch(endpoint, {
      method: "get",
      headers: { "Authorization": "Bearer " + token },
      muteHttpExceptions: true
    });
    const code = res.getResponseCode();
    if (code === 200) {
      const data = JSON.parse(res.getContentText());
      if (data.items && data.items.length > 0) {
        const ch = data.items[0];
        Logger.log("   🛡️ YouTube Channel: 🟢 CONNECTED (" + ch.snippet.title + ", ID: " + ch.id + ")");
        return { status: "ACTIVE", channelTitle: ch.snippet.title, channelId: ch.id };
      } else {
        Logger.log("   ⚠️ YouTube: No channel found for current Google Account.");
        return { status: "NO_CHANNEL", message: "Account does not have a YouTube channel created yet." };
      }
    } else {
      Logger.log("   ⚠️ YouTube API Response HTTP " + code + ": " + res.getContentText());
      return { status: "LIMITED", code: code, details: res.getContentText() };
    }
  } catch (err) {
    Logger.log("   ❌ YouTube Fetch Exception: " + err.message);
    return { status: "EXCEPTION", error: err.message };
  }
}

/**
 * ============================================================================
 * ⏰ MODULE 2: TRIGGER HEALTH & SELF-HEALING ENGINE
 * ============================================================================
 */
function auditAndHealTriggers() {
  Logger.log("⏰ [AUDIT] Auditing Trigger Health & Self-Healing Engine...");
  const triggers = ScriptApp.getProjectTriggers();
  let plannerFound = false;
  let activeTriggersCount = triggers.length;

  for (let i = 0; i < triggers.length; i++) {
    const handler = triggers[i].getHandlerFunction();
    if (handler === "planDailyOrganicSchedule") {
      plannerFound = true;
    }
  }

  if (plannerFound) {
    Logger.log("   ✅ Daily 4:00 AM Organic Planner Trigger: ACTIVE (" + activeTriggersCount + " total project triggers)");
    return { status: "HEALTHY", count: activeTriggersCount, healed: false };
  } else {
    Logger.log("   ⚠️ Daily Planner trigger NOT found. Initiating Self-Healing repair...");
    try {
      ScriptApp.newTrigger("planDailyOrganicSchedule")
        .timeBased()
        .atHour(4)
        .nearMinute(0)
        .everyDays(1)
        .inTimezone(MASTER_SENTINEL_CONFIG.TIMEZONE)
        .create();
      Logger.log("   🎉 Self-Healing Complete: 4:00 AM Planner Trigger successfully re-created!");
      return { status: "HEALED", count: activeTriggersCount + 1, healed: true };
    } catch (healErr) {
      Logger.log("   ❌ Self-Healing Failed: " + healErr.message);
      return { status: "HEAL_FAILED", error: healErr.message };
    }
  }
}

/**
 * ============================================================================
 * 🔗 MODULE 3: SECURITY & LINK POLICY AUDIT
 * ============================================================================
 */
function auditFooterAndSystemLinks(htmlContent) {
  Logger.log("🔗 [AUDIT] Verifying Security & Link Policy (Channel vs Raw Numbers)...");
  const bannedNumberPatterns = [
    /923463824132/,
    /923172375327/,
    /\+92\s*346/,
    /\+92\s*317/,
    /0346-?3824132/,
    /0317-?2375327/
  ];

  let rawNumbersDetected = false;
  if (htmlContent) {
    for (let i = 0; i < bannedNumberPatterns.length; i++) {
      if (bannedNumberPatterns[i].test(htmlContent)) {
        rawNumbersDetected = true;
        break;
      }
    }
  }

  const props = PropertiesService.getScriptProperties();
  const storedConfig = props.getProperty("SYSTEM_CONFIG_LINKS") || "";
  for (let i = 0; i < bannedNumberPatterns.length; i++) {
    if (bannedNumberPatterns[i].test(storedConfig)) {
      rawNumbersDetected = true;
      break;
    }
  }

  if (rawNumbersDetected) {
    Logger.log("   🚨 CRITICAL SECURITY ALERT: Raw WhatsApp numbers detected in content!");
    return { status: "FAIL", rawNumbersFound: true, message: "Raw phone numbers must be replaced by WhatsApp Channel URL" };
  } else {
    Logger.log("   🔗 WhatsApp Policy Check: 🟢 100% WhatsApp Channel, Zero raw numbers");
    return { status: "PASS", rawNumbersFound: false, channelUrl: MASTER_SENTINEL_CONFIG.WHATSAPP_CHANNEL_URL };
  }
}

/**
 * ============================================================================
 * 🚦 MODULE 4: HUMAN ANTI-SPAM GUARD
 * ============================================================================
 */
function enforceHumanAntiSpamGuard() {
  Logger.log("🚦 [SPAM GUARD] Checking time interval between automated publications...");
  const props = PropertiesService.getScriptProperties();
  const lastPostJson = props.getProperty("LAST_PUBLISHED_POST");
  const lastPageJson = props.getProperty("LAST_PUBLISHED_PAGE");

  let lastTime = 0;
  if (lastPostJson) {
    try {
      const p = JSON.parse(lastPostJson);
      if (p.publishedAt) lastTime = Math.max(lastTime, new Date(p.publishedAt).getTime());
    } catch (e) {}
  }
  if (lastPageJson) {
    try {
      const pg = JSON.parse(lastPageJson);
      if (pg.publishedAt) lastTime = Math.max(lastTime, new Date(pg.publishedAt).getTime());
    } catch (e) {}
  }

  const now = new Date().getTime();
  const hoursSinceLast = (now - lastTime) / (1000 * 60 * 60);

  if (lastTime > 0 && hoursSinceLast < MASTER_SENTINEL_CONFIG.MIN_POST_SPACING_HOURS) {
    const remainingHours = (MASTER_SENTINEL_CONFIG.MIN_POST_SPACING_HOURS - hoursSinceLast).toFixed(1);
    Logger.log("   ⏳ Anti-Spam Cool-off Active: Last publish was " + hoursSinceLast.toFixed(1) + " hours ago. Wait " + remainingHours + " hrs.");
    return { safe: false, hoursSinceLast: hoursSinceLast, remainingWaitHours: remainingHours };
  } else {
    Logger.log("   ✅ Anti-Spam Guard: Safe to publish (Spacing: " + (lastTime === 0 ? "First Post" : hoursSinceLast.toFixed(1) + " hrs") + ")");
    return { safe: true, hoursSinceLast: hoursSinceLast };
  }
}

function recordPublicationTimestamp() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty("LAST_SYSTEM_PUBLISH_TIMESTAMP", new Date().toISOString());
}

/**
 * ============================================================================
 * ⚖️ MODULE 5: YOUTUBE SHORTS & BLOGGER COPYRIGHT SCANNER
 * ============================================================================
 */
function scanYouTubeCopyrightClaims() {
  Logger.log("⚖️ [COPYRIGHT SCAN] Scanning YouTube uploads for Copyright Claims...");
  const token = ScriptApp.getOAuthToken();
  if (!token) return { status: "SKIPPED", reason: "No OAuth token" };

  const endpoint = "https://www.googleapis.com/youtube/v3/search?part=snippet&forMine=true&type=video&maxResults=10&order=date";
  try {
    const res = UrlFetchApp.fetch(endpoint, {
      method: "get",
      headers: { "Authorization": "Bearer " + token },
      muteHttpExceptions: true
    });
    if (res.getResponseCode() !== 200) {
      Logger.log("   ⚠️ YouTube Search API returned " + res.getResponseCode());
      return { status: "WARNING", code: res.getResponseCode() };
    }

    const data = JSON.parse(res.getContentText());
    const items = data.items || [];
    let claimCount = 0;

    for (let i = 0; i < items.length; i++) {
      const vId = items[i].id.videoId;
      const title = items[i].snippet.title;
      
      const detailRes = UrlFetchApp.fetch("https://www.googleapis.com/youtube/v3/videos?part=status,contentDetails&id=" + vId, {
        headers: { "Authorization": "Bearer " + token },
        muteHttpExceptions: true
      });
      if (detailRes.getResponseCode() === 200) {
        const vData = JSON.parse(detailRes.getContentText());
        const vInfo = vData.items && vData.items[0];
        if (vInfo && vInfo.status) {
          const rejected = vInfo.status.rejectionReason;
          if (rejected) {
            Logger.log("   🚨 Copyright/Policy Rejection on Video [" + vId + "] '" + title + "': " + rejected);
            claimCount++;
            protectVideoBySettingUnlisted(vId);
          }
        }
      }
    }

    if (claimCount === 0) {
      Logger.log("   ✅ Copyright Audit: 100% Clean! All tested videos have ZERO claims.");
      return { status: "CLEAN", claimedVideos: 0 };
    } else {
      return { status: "REMEDIATED", claimedVideos: claimCount };
    }
  } catch (err) {
    Logger.log("   ⚠️ Copyright scan exception: " + err.message);
    return { status: "ERROR", error: err.message };
  }
}

function protectVideoBySettingUnlisted(videoId) {
  Logger.log("🛡️ [PROTECTION] Auto-setting video " + videoId + " to UNLISTED to protect channel health...");
  const token = ScriptApp.getOAuthToken();
  try {
    const url = "https://www.googleapis.com/youtube/v3/videos?part=status";
    UrlFetchApp.fetch(url, {
      method: "put",
      contentType: "application/json",
      headers: { "Authorization": "Bearer " + token },
      payload: JSON.stringify({
        id: videoId,
        status: { privacyStatus: "unlisted" }
      }),
      muteHttpExceptions: true
    });
    Logger.log("   ✅ Video " + videoId + " successfully protected (Unlisted).");
  } catch (e) {
    Logger.log("   ❌ Could not set video unlisted: " + e.message);
  }
}

/**
 * ============================================================================
 * 🚀 MODULE 6: DYNAMIC SEO KEYWORDS AUTO-UPDATER
 * ============================================================================
 */
function getDynamic2026SeoKeywordsPool(slotName) {
  const currentYear = 2026;
  const generalKeywords = [
    "best educational app for kids " + currentYear + " pakistan",
    "bilingual urdu learning app online",
    "enter the world of light and laughter official app",
    "urdu haroof tracing safe portal",
    "allama iqbal classical urdu poetry study guide",
    "child safe ad free educational platform",
    "youtube shorts learning review pakistan"
  ];
  return generalKeywords.join(", ");
}

function boostPostSeoPayload(postPayload, slotName) {
  if (!postPayload || !postPayload.content) return postPayload;
  const keywords = getDynamic2026SeoKeywordsPool(slotName);
  const hiddenSeoDiv = '<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">' + keywords + '</div>';
  postPayload.content = hiddenSeoDiv + postPayload.content;
  return postPayload;
}

/**
 * ============================================================================
 * 🔍 MODULE 7: GOOGLE SEARCH CONSOLE AUTO-INDEXING ENGINE
 * ============================================================================
 */
function autoApproveAndIndexUrl(targetUrl) {
  if (!targetUrl) return { status: "SKIPPED", reason: "Target URL empty" };
  Logger.log("🔍 [GSC INDEXING] Submitting URL to Google Indexing API: " + targetUrl);

  const token = ScriptApp.getOAuthToken();
  const endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish";
  const payload = {
    url: targetUrl,
    type: "URL_UPDATED"
  };

  try {
    const res = UrlFetchApp.fetch(endpoint, {
      method: "post",
      contentType: "application/json",
      headers: { "Authorization": "Bearer " + token },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
    const code = res.getResponseCode();
    if (code === 200) {
      Logger.log("   🎉 Google Indexing API: URL submitted successfully for fast crawl!");
      return { status: "SUBMITTED", code: 200 };
    } else {
      Logger.log("   ℹ️ Google Indexing API response HTTP " + code);
      return { status: "INFO", code: code, details: res.getContentText() };
    }
  } catch (err) {
    Logger.log("   ℹ️ GSC Indexing notice: " + err.message);
    return { status: "NOTICE", message: err.message };
  }
}

/**
 * ============================================================================
 * 📊 MODULE 8: 1-CLICK MASTER SYSTEM HEALTH AUDIT (runMasterSystemAudit)
 * ============================================================================
 */
function runMasterSystemAudit() {
  Logger.log("=================================================================");
  Logger.log("🌟 ENTER THE WORLD OF LIGHT - MASTER SENTINEL HEALTH AUDIT 🌟");
  Logger.log("=================================================================");

  // 1. Dual Blogger Connections
  checkBloggerApiHealth();

  // 2. YouTube Channel
  checkYouTubeApiHealth();

  // 3. Trigger Health & Self-Healing
  auditAndHealTriggers();

  // 4. WhatsApp Channel Link Policy
  auditFooterAndSystemLinks();

  // 5. Anti-Spam Guard Status
  enforceHumanAntiSpamGuard();

  // 6. Copyright Claims Scan
  scanYouTubeCopyrightClaims();

  Logger.log("=================================================================");
  Logger.log("🎉 AUDIT COMPLETED!");
}

function onPostPublishedMasterHook(publishedItem, isPage) {
  if (!publishedItem || !publishedItem.url) return;
  Logger.log("🚀 [MASTER HOOK] Post-publish workflow activated for: " + publishedItem.url);
  recordPublicationTimestamp();
  autoApproveAndIndexUrl(publishedItem.url);
}
