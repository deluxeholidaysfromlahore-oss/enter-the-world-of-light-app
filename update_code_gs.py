code_gs = r'''/**
 * ============================================================================
 * ENTER THE WORLD OF LIGHT & LAUGHTER – APPS SCRIPT CONTROLLER (Code.gs)
 * ============================================================================
 * 2026 Production Edition: Sequential Chronological Publishing & Organic Timing
 * 
 * CORE FEATURES:
 * 1. deleteOldIftttPosts() -> Clean up old IFTTT posts with 1 click.
 * 2. Sequential Posting -> Starts from Short #1 (oldest upload) on Day 1,
 *    Short #2 on Day 2, Short #3 on Day 3, with ZERO repetition.
 * 3. Organic Dynamic Timing -> No robotic fixed timestamps. Daily morning and
 *    evening slots run with natural variable timing.
 * 4. Dual Networks -> Primary (Web App Hub) & Secondary (Kids Light World).
 * ============================================================================
 */

/**
 * ============================================================================
 * 🧹 1. ONE-CLICK CLEANUP: Delete Old Low-Quality IFTTT Posts
 * ============================================================================
 * Run this function once from the dropdown to delete old IFTTT posts
 * whose title starts with "New video by on YouTube".
 */
function deleteOldIftttPosts() {
  Logger.log("🧹 [CLEANUP STARTED] Scanning Primary Blog for old IFTTT posts...");
  var blogId = MASTER_CONFIG.PRIMARY_BLOG_ID;
  var url = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts?maxResults=50";
  var token = ScriptApp.getOAuthToken();

  var response = UrlFetchApp.fetch(url, {
    headers: { Authorization: "Bearer " + token },
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    Logger.log("❌ Failed to fetch posts: " + response.getContentText());
    return 0;
  }

  var data = JSON.parse(response.getContentText());
  var items = data.items || [];
  var count = 0;

  for (var i = 0; i < items.length; i++) {
    var p = items[i];
    if (p.title && p.title.indexOf("New video by on YouTube") !== -1) {
      Logger.log("🗑️ Deleting old IFTTT post (" + (count + 1) + "): \"" + p.title + "\" | ID: " + p.id);
      var delUrl = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts/" + p.id;
      UrlFetchApp.fetch(delUrl, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
        muteHttpExceptions: true
      });
      count++;
      Utilities.sleep(400); // Polite rate limit
    }
  }

  Logger.log("==================================================");
  Logger.log("🎉 [CLEANUP COMPLETE] Successfully deleted " + count + " old IFTTT posts!");
  Logger.log("✨ Ab blog par starting se Short #1, #2, #3 sequence se publish honge!");
  Logger.log("==================================================");
  return count;
}

/**
 * ============================================================================
 * 🌟 2. WORKSPACE MENU HOOK (For Google Sheets / Docs)
 * ============================================================================
 */
function onOpen() {
  try {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("🌟 Light & Laughter Automation")
      .addItem("🧹 Delete Old IFTTT Posts", "deleteOldIftttPosts")
      .addSeparator()
      .addItem("🌅 Publish Primary Post (Today in Sequence)", "publishTodayPrimaryPost")
      .addItem("🌙 Publish Kids Secondary Post (Today in Sequence)", "publishTodaySecondaryKidsPost")
      .addSeparator()
      .addItem("⚡ Setup Dynamic Natural Daily Triggers", "setupDynamicDailyTriggers")
      .addItem("🛑 Clear All Triggers", "removeAllTriggers")
      .addItem("🩺 Run System Diagnostics", "runSystemDiagnostics")
      .addToUi();
  } catch (e) {
    Logger.log("Standalone project - UI menu skipped.");
  }
}

/**
 * ============================================================================
 * 🚀 3. SEQUENTIAL DAILY PUBLISHERS (Day 1 -> Short 1, Day 2 -> Short 2)
 * ============================================================================
 */

// Primary Blog (Web App Hub + Tracing + Classical Poetry + Quizzes)
function publishTodayPrimaryPost() {
  Logger.log("🌅 [PRIMARY TRACK] Starting today's sequential Primary Blog post...");
  try {
    var result = publishPrimary_1_Post("morning");
    if (result && !result.skipped) {
      Logger.log("✅ [PRIMARY PUBLISHED]: " + result.title);
      Logger.log("🔗 URL: " + result.url);
    }
    return result;
  } catch (err) {
    Logger.log("❌ [PRIMARY ERROR]: " + err.message);
    throw err;
  }
}

// Secondary Blog (Kids Light World + 2D Animated Fables + Bedtime Stories)
function publishTodaySecondaryKidsPost() {
  Logger.log("🌙 [KIDS TRACK] Starting today's sequential Secondary Kids Blog post...");
  try {
    var result = publishSecondary_1_Post("evening");
    if (result && !result.skipped) {
      Logger.log("✅ [KIDS PUBLISHED]: " + result.title);
      Logger.log("🔗 URL: " + result.url);
    }
    return result;
  } catch (err) {
    Logger.log("❌ [KIDS ERROR]: " + err.message);
    throw err;
  }
}

/**
 * Compatibility trigger aliases
 */
function triggerMorningSlot() {
  return publishTodayPrimaryPost();
}

function triggerEveningSlot() {
  return publishTodaySecondaryKidsPost();
}

function triggerAfternoonSlot() {
  return publishPrimary_2_Page("afternoon");
}

function testTrack1_AppPost() {
  return publishTodayPrimaryPost();
}

function testTrack2_EvergreenPage() {
  return publishPrimary_2_Page("afternoon");
}

function testTrack3_KidsPost() {
  return publishTodaySecondaryKidsPost();
}

function testTrack4_KidsPage() {
  return publishSecondary_2_Page("evening");
}

/**
 * ============================================================================
 * ⏰ 4. DYNAMIC ORGANIC TIMING SCHEDULER (Natural Variable Time Windows)
 * ============================================================================
 * Is scheduler se posts fixed robotic seconds par nahi balke har din natural
 * insani timing (e.g. 9:20 AM, 10:15 AM, 11:05 AM) par aage-peechay post hoti hain.
 */

/**
 * Rozana subah 5:00 AM PKT par ek master scheduler chalta hai jo
 * aaj ke din ki Primary aur Secondary posts ke liye randomized time set karta hai.
 */
function dailyMasterDispatcher() {
  Logger.log("🧭 [DISPATCHER] Setting up today's organic variable post times...");

  // Purane temporary one-shot triggers delete karein
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var fn = triggers[i].getHandlerFunction();
    if (fn === "publishTodayPrimaryPost" || fn === "publishTodaySecondaryKidsPost") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  var now = new Date();

  // 1. Primary Post: Subah 9:15 AM se 11:30 AM PKT ke darmiyan kisi random minute par
  var primaryHour = 9 + Math.floor(Math.random() * 3); // 9, 10, ya 11
  var primaryMin = 15 + Math.floor(Math.random() * 40); // 15 se 54 mins
  var primaryTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), primaryHour, primaryMin, 0);

  ScriptApp.newTrigger("publishTodayPrimaryPost")
    .timeBased()
    .at(primaryTime)
    .inTimezone("Asia/Karachi")
    .create();

  Logger.log("⏰ Today's Primary Post scheduled at natural time: " + primaryHour + ":" + (primaryMin < 10 ? "0" : "") + primaryMin + " PKT");

  // 2. Secondary Kids Post: Sham 6:15 PM se 8:45 PM PKT ke darmiyan kisi random minute par
  var kidsHour = 18 + Math.floor(Math.random() * 3); // 18 (6 PM), 19 (7 PM), ya 20 (8 PM)
  var kidsMin = 10 + Math.floor(Math.random() * 45); // 10 se 55 mins
  var kidsTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), kidsHour, kidsMin, 0);

  ScriptApp.newTrigger("publishTodaySecondaryKidsPost")
    .timeBased()
    .at(kidsTime)
    .inTimezone("Asia/Karachi")
    .create();

  Logger.log("⏰ Today's Kids Secondary Post scheduled at natural time: " + kidsHour + ":" + (kidsMin < 10 ? "0" : "") + kidsMin + " PKT");
  Logger.log("🎉 Both daily organic triggers armed successfully!");
}

/**
 * Automatically sets up the natural dynamic scheduler
 */
function setupDynamicDailyTriggers() {
  Logger.log("⚡ [SETUP] Installing Dynamic Organic Daily Triggers...");
  removeAllTriggers();

  // Master dispatcher runs every day at 5:00 AM PKT to set today's random posting times
  ScriptApp.newTrigger("dailyMasterDispatcher")
    .timeBased()
    .atHour(5)
    .nearMinute(0)
    .everyDays(1)
    .inTimezone("Asia/Karachi")
    .create();

  // Run it immediately once to schedule today's upcoming slots!
  dailyMasterDispatcher();

  Logger.log("🎉 Organic Natural Triggers Installed! Har roz natural time par post hoga.");
}

/**
 * Remove all active triggers
 */
function removeAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  Logger.log("🛑 Removing " + triggers.length + " existing triggers...");
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  Logger.log("✅ All triggers cleared.");
}

function checkActiveTriggersStatus() {
  var triggers = ScriptApp.getProjectTriggers();
  Logger.log("📊 [ACTIVE TRIGGERS COUNT]: " + triggers.length);
  for (var i = 0; i < triggers.length; i++) {
    var t = triggers[i];
    Logger.log("  #" + (i + 1) + " -> Function: " + t.getHandlerFunction() + " | Type: " + t.getEventType());
  }
  return triggers.length;
}

/**
 * ============================================================================
 * 🩺 5. SYSTEM DIAGNOSTICS & HEALTH AUDIT
 * ============================================================================
 */
function runSystemDiagnostics() {
  Logger.log("==================================================");
  Logger.log("🩺 RUNNING SYSTEM DIAGNOSTICS");
  Logger.log("==================================================");

  // 1. Check OAuth Token
  try {
    var token = ScriptApp.getOAuthToken();
    Logger.log("✅ [AUTH] OAuth Token retrieved: " + (token ? "Valid (Length: " + token.length + ")" : "Empty"));
  } catch (e) {
    Logger.log("❌ [AUTH ERROR] Failed to get OAuth Token: " + e.message);
  }

  // 2. Check Primary Blog Access
  try {
    var primaryUrl = "https://www.googleapis.com/blogger/v3/blogs/" + MASTER_CONFIG.PRIMARY_BLOG_ID;
    var res1 = UrlFetchApp.fetch(primaryUrl, {
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      muteHttpExceptions: true
    });
    if (res1.getResponseCode() === 200) {
      var b1 = JSON.parse(res1.getContentText());
      Logger.log("✅ [BLOGGER 1 CONNECTED]: " + b1.name + " (" + b1.url + ")");
    } else {
      Logger.log("⚠️ [BLOGGER 1 WARNING] Status " + res1.getResponseCode() + ": " + res1.getContentText());
    }
  } catch (e) {
    Logger.log("❌ [BLOGGER 1 ERROR]: " + e.message);
  }

  // 3. Check Secondary Blog Access
  try {
    var secUrl = "https://www.googleapis.com/blogger/v3/blogs/" + MASTER_CONFIG.SECONDARY_BLOG_ID;
    var res2 = UrlFetchApp.fetch(secUrl, {
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      muteHttpExceptions: true
    });
    if (res2.getResponseCode() === 200) {
      var b2 = JSON.parse(res2.getContentText());
      Logger.log("✅ [BLOGGER 2 CONNECTED]: " + b2.name + " (" + b2.url + ")");
    } else {
      Logger.log("⚠️ [BLOGGER 2 WARNING] Status " + res2.getResponseCode() + ": " + res2.getContentText());
    }
  } catch (e) {
    Logger.log("❌ [BLOGGER 2 ERROR]: " + e.message);
  }

  // 4. Check Active Triggers
  checkActiveTriggersStatus();

  Logger.log("==================================================");
  Logger.log("🎉 DIAGNOSTICS COMPLETE");
  Logger.log("==================================================");
}
'''

with open('apps-script/Code.gs', 'w') as f:
    f.write(code_gs)

print("Saved apps-script/Code.gs successfully! Length:", len(code_gs))
