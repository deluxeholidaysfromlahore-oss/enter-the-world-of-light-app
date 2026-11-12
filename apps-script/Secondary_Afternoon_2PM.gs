/**
 * ============================================================================
 * SECONDARY TRACK - SLOT 5: DOPAHAR / AFTERNOON (PERMANENT STATIC PAGE)
 * File Name: Secondary_Afternoon_2PM.gs
 * ============================================================================
 * Publishes Secondary Kids Blog Afternoon Static Page (~1-2h after Slot 2).
 * Requires verified successful Primary Slot 2 post published today.
 */
function runSecondary_Afternoon_2PM() {
  Logger.log("☀️ [SLOT 5] Executing Secondary Afternoon Static Page (Paired with Slot 2)...");
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) {
    Logger.log("🔒 [CONCURRENCY LOCK] Slot 5 is already executing. Aborting concurrent run.");
    return { skipped: true, reason: "Lock busy" };
  }
  try {
    var ledger = getPersistentLedger();
    var todayStr = new Date().toISOString().slice(0, 10);
    var primaryFound = false;
    for (var i = ledger.length - 1; i >= 0; i--) {
      if (ledger[i].slot === "primary_afternoon" && ledger[i].slotDate === todayStr && ledger[i].id) {
        primaryFound = true;
        break;
      }
    }
    if (!primaryFound) {
      Logger.log("🛑 [SLOT 5 ABORTED] Primary Afternoon Post for today was NOT published. Refusing to publish orphaned Secondary Page.");
      return { skipped: true, reason: "Orphaned secondary: Primary Slot 2 not found" };
    }

    if (typeof publishSecondarySlot2_AfternoonPage !== "function") {
      throw new Error("publishSecondarySlot2_AfternoonPage is not defined. Please ensure 'Master Controller.gs' is saved in your Apps Script project.");
    }
    var result = publishSecondarySlot2_AfternoonPage();
    if (result && !result.skipped) {
      Logger.log("✅ [SLOT 5 COMPLETED] Published Static Page: " + result.title);
      Logger.log("🔗 URL: " + result.url);
    }
    return result;
  } catch (err) {
    Logger.log("❌ [SLOT 5 ERROR]: " + err.message);
    throw err;
  } finally {
    lock.releaseLock();
  }
}
