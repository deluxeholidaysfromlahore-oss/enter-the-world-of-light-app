/**
 * ============================================================================
 * PRIMARY TRACK - SLOT 1: SUBAH / MORNING (BLOGGER POST)
 * File Name: Primary_Morning_9AM.gs
 * ============================================================================
 * Publishes Primary Blog 1 Morning Post: Web App Feature Deep-Dive.
 * Upon success, dynamically arms paired Secondary Morning Page (60-120 min delay).
 */
function runPrimary_Morning_9AM() {
  Logger.log("🌅 [SLOT 1] Executing Primary Morning Post (Web App Feature)...");
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) {
    Logger.log("🔒 [CONCURRENCY LOCK] Slot 1 is already executing. Aborting concurrent run.");
    return { skipped: true, reason: "Lock busy" };
  }
  try {
    if (typeof publishPrimarySlot1_MorningPost !== "function") {
      throw new Error("publishPrimarySlot1_MorningPost is not defined. Please ensure 'Master Controller.gs' is saved in your Apps Script project.");
    }
    var result = publishPrimarySlot1_MorningPost();
    if (result && !result.skipped && result.id) {
      Logger.log("✅ [SLOT 1 COMPLETED] Published: " + result.title);
      Logger.log("🔗 URL: " + result.url);
      var delayMins = 70 + Math.floor(Math.random() * 40);
      schedulePairedSecondarySlot("runSecondary_Morning_9AM", delayMins);
    }
    return result;
  } catch (err) {
    Logger.log("❌ [SLOT 1 ERROR]: " + err.message);
    throw err;
  } finally {
    lock.releaseLock();
  }
}
