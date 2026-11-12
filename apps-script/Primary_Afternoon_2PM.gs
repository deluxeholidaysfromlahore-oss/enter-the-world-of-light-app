/**
 * ============================================================================
 * PRIMARY TRACK - SLOT 2: DOPAHAR / AFTERNOON (BLOGGER POST)
 * File Name: Primary_Afternoon_2PM.gs
 * ============================================================================
 * Publishes Primary Blog 2 Afternoon Post: Distinct App Pillar & Rekhta Heritage.
 * Upon success, dynamically arms paired Secondary Afternoon Page (60-120 min delay).
 */
function runPrimary_Afternoon_2PM() {
  Logger.log("☀️ [SLOT 2] Executing Primary Afternoon Post (Distinct App Pillar)...");
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) {
    Logger.log("🔒 [CONCURRENCY LOCK] Slot 2 is already executing. Aborting concurrent run.");
    return { skipped: true, reason: "Lock busy" };
  }
  try {
    if (typeof publishPrimarySlot2_AfternoonPost !== "function") {
      throw new Error("publishPrimarySlot2_AfternoonPost is not defined. Please ensure 'Master Controller.gs' is saved in your Apps Script project.");
    }
    var result = publishPrimarySlot2_AfternoonPost();
    if (result && !result.skipped && result.id) {
      Logger.log("✅ [SLOT 2 COMPLETED] Published: " + result.title);
      Logger.log("🔗 URL: " + result.url);
      var delayMins = 70 + Math.floor(Math.random() * 40);
      schedulePairedSecondarySlot("runSecondary_Afternoon_2PM", delayMins);
    }
    return result;
  } catch (err) {
    Logger.log("❌ [SLOT 2 ERROR]: " + err.message);
    throw err;
  } finally {
    lock.releaseLock();
  }
}
