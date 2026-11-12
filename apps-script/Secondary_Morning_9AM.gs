/**
 * ============================================================================
 * SECONDARY TRACK - SLOT 4: SUBAH / MORNING (PERMANENT STATIC PAGE)
 * File Name: Secondary_Morning_9AM.gs
 * ============================================================================
 * Publishes Secondary Kids Blog Morning Static Page (~1-2h after Slot 1).
 * Requires verified successful Primary Slot 1 post published today.
 */
function runSecondary_Morning_9AM() {
  Logger.log("🌅 [SLOT 4] Executing Secondary Morning Static Page (Paired with Slot 1)...");
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) {
    Logger.log("🔒 [CONCURRENCY LOCK] Slot 4 is already executing. Aborting concurrent run.");
    return { skipped: true, reason: "Lock busy" };
  }
  try {
    var ledger = getPersistentLedger();
    var todayStr = new Date().toISOString().slice(0, 10);
    var primaryFound = false;
    for (var i = ledger.length - 1; i >= 0; i--) {
      if (ledger[i].slot === "primary_morning" && ledger[i].slotDate === todayStr && ledger[i].id) {
        primaryFound = true;
        break;
      }
    }
    if (!primaryFound) {
      Logger.log("🛑 [SLOT 4 ABORTED] Primary Morning Post for today was NOT published. Refusing to publish orphaned Secondary Page.");
      return { skipped: true, reason: "Orphaned secondary: Primary Slot 1 not found" };
    }

    if (typeof publishSecondarySlot1_MorningPage !== "function") {
      throw new Error("publishSecondarySlot1_MorningPage is not defined. Please ensure 'Master Controller.gs' is saved in your Apps Script project.");
    }
    var result = publishSecondarySlot1_MorningPage();
    if (result && !result.skipped) {
      Logger.log("✅ [SLOT 4 COMPLETED] Published Static Page: " + result.title);
      Logger.log("🔗 URL: " + result.url);
    }
    return result;
  } catch (err) {
    Logger.log("❌ [SLOT 4 ERROR]: " + err.message);
    throw err;
  } finally {
    lock.releaseLock();
  }
}
