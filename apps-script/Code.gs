/**
 * ============================================================================
 * ENTER THE WORLD OF LIGHT & LAUGHTER – APPS SCRIPT MASTER ORCHESTRATOR (Code.gs)
 * ============================================================================
 * Production 2026 Edition: Dynamic Organic Time Dispatcher & UI Controller
 *
 * RESPONSIBILITIES:
 * 1. UI Dropdown Menu (Standalone execution & diagnostic audits)
 * 2. Dynamic Organic Time Dispatcher (Asia/Karachi natural variable windows)
 * 3. 60-120 min paired execution for Secondary Static Pages
 * 4. Safe Trigger Management (Only creates/deletes managed automation triggers)
 * ============================================================================
 */

/**
 * ============================================================================
 * 1. GOOGLE SHEETS / DOCS / FORMS UI MENU (IF BOUND) OR STANDALONE NOTICE
 * ============================================================================
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu("🌟 Marketing Sentinel 2026")
      .addItem("🌅 1. Publish Primary Morning Post (Slot 1)", "runPrimary_Morning_9AM")
      .addItem("📄 2. Publish Secondary Morning Page (Slot 4)", "runSecondary_Morning_9AM")
      .addSeparator()
      .addItem("☀️ 3. Publish Primary Afternoon Post (Slot 2)", "runPrimary_Afternoon_2PM")
      .addItem("📄 4. Publish Secondary Afternoon Page (Slot 5)", "runSecondary_Afternoon_2PM")
      .addSeparator()
      .addItem("🌙 5. Publish Primary Evening Video Post (Slot 3)", "runPrimary_Evening_7PM")
      .addItem("📄 6. Publish Secondary Evening Page (Slot 6)", "runSecondary_Evening_7PM")
      .addSeparator()
      .addItem("🚀 Run Today's Full Sequential Cycle (All 6 Slots)", "runFullDailyPublishingCycle")
      .addSeparator()
      .addItem("⚡ Install Dynamic Daily Triggers (Asia/Karachi)", "setupDynamicDailyTriggers")
      .addItem("🛑 Remove Managed Automation Triggers", "removeAllManagedTriggers")
      .addItem("🩺 Run System Diagnostics & Read-Only Audit", "runSystemDiagnostics")
      .addToUi();
  } catch (e) {
    Logger.log("Standalone Apps Script project - standard execution available via editor function dropdown.");
  }
}

/**
 * ============================================================================
 * 2. FULL SEQUENTIAL CYCLE RUNNER (MANUAL TEST / COMPLETE AUDIT)
 * ============================================================================
 */
function runFullDailyPublishingCycle() {
  Logger.log("==================================================");
  Logger.log("🚀 STARTING TODAY'S FULL 6-SLOT PUBLISHING CYCLE");
  Logger.log("==================================================");

  // 1. Primary Morning Post
  Logger.log("--- SLOT 1: Primary Morning Post ---");
  var r1 = publishPrimarySlot1_MorningPost();

  // 2. Secondary Morning Page (Paired)
  Logger.log("--- SLOT 4: Secondary Morning Page (Paired with Slot 1) ---");
  var r2 = publishSecondarySlot1_MorningPage();

  // 3. Primary Afternoon Post
  Logger.log("--- SLOT 2: Primary Afternoon Post ---");
  var r3 = publishPrimarySlot2_AfternoonPost();

  // 4. Secondary Afternoon Page (Paired)
  Logger.log("--- SLOT 5: Secondary Afternoon Page (Paired with Slot 2) ---");
  var r4 = publishSecondarySlot2_AfternoonPage();

  // 5. Primary Evening Post (Chronological YouTube Short)
  Logger.log("--- SLOT 3: Primary Evening Short Deep-Dive ---");
  var r5 = publishPrimarySlot3_EveningPost();

  // 6. Secondary Evening Page (Paired)
  Logger.log("--- SLOT 6: Secondary Evening Page (Paired with Slot 3) ---");
  var r6 = publishSecondarySlot3_EveningPage();

  Logger.log("==================================================");
  Logger.log("🎉 FULL 6-SLOT CYCLE COMPLETED SUCCESSFULLY!");
  Logger.log("==================================================");
  return { r1: r1, r2: r2, r3: r3, r4: r4, r5: r5, r6: r6 };
}

/**
 * Compatibility trigger aliases
 */
function publishTodayPrimaryPost() {
  return publishPrimarySlot1_MorningPost();
}

function publishTodaySecondaryKidsPost() {
  return publishSecondarySlot1_MorningPage();
}

function triggerMorningSlot() {
  return publishPrimarySlot1_MorningPost();
}

function triggerAfternoonSlot() {
  return publishPrimarySlot2_AfternoonPost();
}

function triggerEveningSlot() {
  return publishPrimarySlot3_EveningPost();
}

/**
 * ============================================================================
 * 3. DYNAMIC ORGANIC TIMING SCHEDULER (ASIA/KARACHI NATURAL TIME WINDOWS)
 * ============================================================================
 * Sets up organic posting times each morning at 5:00 AM PKT:
 * - Morning Post: 9:15 AM - 10:45 AM PKT
 * - Morning Page: 60-120 mins after Morning Post
 * - Afternoon Post: 1:30 PM - 2:45 PM PKT
 * - Afternoon Page: 60-120 mins after Afternoon Post
 * - Evening Post: 6:30 PM - 7:45 PM PKT
 * - Evening Page: 60-120 mins after Evening Post
 */
function dailyMasterDispatcher() {
  Logger.log("🧭 [DISPATCHER] Setting up today's organic variable post times in Asia/Karachi timezone...");

  // Remove previous day's slot-specific one-shot triggers
  var managedSlots = [
    "runPrimary_Morning_9AM", "runSecondary_Morning_9AM",
    "runPrimary_Afternoon_2PM", "runSecondary_Afternoon_2PM",
    "runPrimary_Evening_7PM", "runSecondary_Evening_7PM"
  ];

  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var fn = triggers[i].getHandlerFunction();
    if (managedSlots.indexOf(fn) !== -1) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var date = now.getDate();

  // 1. Morning Primary Post: 9:15 AM to 10:45 AM PKT
  var mHour = 9;
  var mMin = 15 + Math.floor(Math.random() * 70);
  if (mMin >= 60) { mHour += 1; mMin -= 60; }
  var morningPostTime = new Date(year, month, date, mHour, mMin, 0);

  ScriptApp.newTrigger("runPrimary_Morning_9AM")
    .timeBased()
    .at(morningPostTime)
    .inTimezone("Asia/Karachi")
    .create();
  Logger.log("⏰ Morning Primary Post scheduled at: " + mHour + ":" + (mMin < 10 ? "0" : "") + mMin + " PKT");

  // 2. Afternoon Primary Post: 1:30 PM to 2:45 PM PKT (13:30 to 14:45)
  var aHour = 13;
  var aMin = 30 + Math.floor(Math.random() * 60);
  if (aMin >= 60) { aHour += 1; aMin -= 60; }
  var afternoonPostTime = new Date(year, month, date, aHour, aMin, 0);

  ScriptApp.newTrigger("runPrimary_Afternoon_2PM")
    .timeBased()
    .at(afternoonPostTime)
    .inTimezone("Asia/Karachi")
    .create();
  Logger.log("⏰ Afternoon Primary Post scheduled at: " + aHour + ":" + (aMin < 10 ? "0" : "") + aMin + " PKT");

  // 3. Evening Primary Post (YouTube Short): 6:30 PM to 7:45 PM PKT (18:30 to 19:45)
  var eHour = 18;
  var eMin = 30 + Math.floor(Math.random() * 60);
  if (eMin >= 60) { eHour += 1; eMin -= 60; }
  var eveningPostTime = new Date(year, month, date, eHour, eMin, 0);

  ScriptApp.newTrigger("runPrimary_Evening_7PM")
    .timeBased()
    .at(eveningPostTime)
    .inTimezone("Asia/Karachi")
    .create();
  Logger.log("⏰ Evening Primary Short Post scheduled at: " + eHour + ":" + (eMin < 10 ? "0" : "") + eMin + " PKT");

  Logger.log("🎉 Primary dynamic anchors armed for today! Secondary Pages will be dynamically triggered 60-120m after each primary completion.");
}

/**
 * Automatically sets up the natural dynamic scheduler
 */
function setupDynamicDailyTriggers() {
  Logger.log("⚡ [SETUP] Installing Dynamic Organic Daily Triggers...");
  removeAllManagedTriggers();

  // Daily dispatcher trigger runs every morning at 5:00 AM PKT
  ScriptApp.newTrigger("dailyMasterDispatcher")
    .timeBased()
    .atHour(5)
    .nearMinute(0)
    .everyDays(1)
    .inTimezone("Asia/Karachi")
    .create();

  // Run dispatcher immediately to schedule remaining slots for today
  dailyMasterDispatcher();
  Logger.log("🎉 Dynamic Scheduler successfully installed! Har roz natural variable timing par post hoga.");
}

/**
 * Remove only managed automation triggers (safe trigger removal)
 */
function removeAllManagedTriggers() {
  var managedFns = [
    "dailyMasterDispatcher",
    "runPrimary_Morning_9AM", "runSecondary_Morning_9AM",
    "runPrimary_Afternoon_2PM", "runSecondary_Afternoon_2PM",
    "runPrimary_Evening_7PM", "runSecondary_Evening_7PM",
    "publishTodayPrimaryPost", "publishTodaySecondaryKidsPost"
  ];

  var triggers = ScriptApp.getProjectTriggers();
  var removed = 0;
  Logger.log("🛑 Checking " + triggers.length + " project triggers for managed automation tasks...");

  for (var i = 0; i < triggers.length; i++) {
    var fn = triggers[i].getHandlerFunction();
    if (managedFns.indexOf(fn) !== -1) {
      ScriptApp.deleteTrigger(triggers[i]);
      removed++;
      Logger.log("  ✓ Removed managed trigger for: " + fn);
    }
  }

  Logger.log("✅ Managed trigger cleanup complete. Removed " + removed + " triggers.");
}

// Backward compatibility alias
function removeAllTriggers() {
  return removeAllManagedTriggers();
}

function checkActiveTriggersStatus() {
  var triggers = ScriptApp.getProjectTriggers();
  Logger.log("📊 [ACTIVE TRIGGERS COUNT]: " + triggers.length);
  for (var i = 0; i < triggers.length; i++) {
    var t = triggers[i];
    Logger.log("  #" + (i + 1) + " -> Function: " + t.getHandlerFunction() + " | Trigger ID: " + t.getUniqueId());
  }
  return triggers.length;
}

/**
 * ============================================================================
 * 4. SYSTEM DIAGNOSTICS & READ-ONLY BLOG AUDIT
 * ============================================================================
 */
function runSystemDiagnostics() {
  Logger.log("==================================================");
  Logger.log("🩺 RUNNING SYSTEM DIAGNOSTICS & BLOG AUDIT");
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
      Logger.log("✅ [PRIMARY BLOG CONNECTED]: " + b1.name + " (" + b1.url + ")");
      Logger.log("   Posts Count: " + (b1.posts ? b1.posts.totalItems : 0) + " | Pages Count: " + (b1.pages ? b1.pages.totalItems : 0));
    } else {
      Logger.log("⚠️ [PRIMARY BLOG WARNING] Status " + res1.getResponseCode() + ": " + res1.getContentText());
    }
  } catch (e) {
    Logger.log("❌ [PRIMARY BLOG ERROR]: " + e.message);
  }

  // 3. Check Secondary Kids Blog Access
  try {
    var secUrl = "https://www.googleapis.com/blogger/v3/blogs/" + MASTER_CONFIG.SECONDARY_BLOG_ID;
    var res2 = UrlFetchApp.fetch(secUrl, {
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      muteHttpExceptions: true
    });
    if (res2.getResponseCode() === 200) {
      var b2 = JSON.parse(res2.getContentText());
      Logger.log("✅ [SECONDARY BLOG CONNECTED]: " + b2.name + " (" + b2.url + ")");
      Logger.log("   Posts Count: " + (b2.posts ? b2.posts.totalItems : 0) + " | Pages Count: " + (b2.pages ? b2.pages.totalItems : 0));
    } else {
      Logger.log("⚠️ [SECONDARY BLOG WARNING] Status " + res2.getResponseCode() + ": " + res2.getContentText());
    }
  } catch (e) {
    Logger.log("❌ [SECONDARY BLOG ERROR]: " + e.message);
  }

  // 4. Check Persistent Ledger
  var ledger = getPersistentLedger();
  Logger.log("💾 [PERSISTENT LEDGER]: " + ledger.length + " historical records stored in ScriptProperties.");

  // 5. Check Active Triggers
  checkActiveTriggersStatus();

  Logger.log("==================================================");
  Logger.log("🎉 DIAGNOSTICS COMPLETE");
  Logger.log("==================================================");
}
