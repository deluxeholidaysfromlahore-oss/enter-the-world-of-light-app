/**
 * ============================================================================
 * PRIMARY TRACK - SLOT 3: SHAAM / EVENING (BLOGGER POST - YOUTUBE SHORT)
 * File Name: Primary_Evening_7PM.gs
 * ============================================================================
 * Publishes Primary Blog 3 Evening Post: Chronological YouTube Short Deep-Dive.
 * Upon success, dynamically arms paired Secondary Evening Page (60-120 min delay).
 */
function runPrimary_Evening_7PM() {
  Logger.log("🌙 [SLOT 3] Executing Primary Evening Post (YouTube Short Deep-Dive)...");
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) {
    Logger.log("🔒 [CONCURRENCY LOCK] Slot 3 is already executing. Aborting concurrent run.");
    return { skipped: true, reason: "Lock busy" };
  }
  try {
    if (typeof publishPrimarySlot3_EveningPost !== "function") {
      throw new Error("publishPrimarySlot3_EveningPost is not defined. Please ensure 'Master Controller.gs' is saved in your Apps Script project.");
    }
    var result = publishPrimarySlot3_EveningPost();
    if (result && !result.skipped && result.id) {
      Logger.log("✅ [SLOT 3 COMPLETED] Published: " + result.title);
      Logger.log("🔗 URL: " + result.url);
      var delayMins = 70 + Math.floor(Math.random() * 40);
      schedulePairedSecondarySlot("runSecondary_Evening_7PM", delayMins);
    }
    return result;
  } catch (err) {
    Logger.log("❌ [SLOT 3 ERROR]: " + err.message);
    throw err;
  } finally {
    lock.releaseLock();
  }
}
