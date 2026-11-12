/**
 * ============================================================================
 * SECONDARY TRACK - SLOT 6: SHAAM / EVENING (PERMANENT STATIC PAGE)
 * File Name: Secondary_Evening_7PM.gs
 * ============================================================================
 * Publishes Secondary Kids Blog Evening Static Page (~1-2h after Slot 3).
 * Requires verified successful Primary Slot 3 post published today.
 */
function runSecondary_Evening_7PM() {
  Logger.log("🌙 [SLOT 6] Executing Secondary Evening Static Page (Paired with Slot 3)...");
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) {
    Logger.log("🔒 [CONCURRENCY LOCK] Slot 6 is already executing. Aborting concurrent run.");
    return { skipped: true, reason: "Lock busy" };
  }
  try {
    var ledger = getPersistentLedger();
    var todayStr = new Date().toISOString().slice(0, 10);
    var primaryFound = false;
    for (var i = ledger.length - 1; i >= 0; i--) {
      if (ledger[i].slot === "primary_evening" && ledger[i].slotDate === todayStr && ledger[i].id) {
        primaryFound = true;
        break;
      }
    }
    if (!primaryFound) {
      Logger.log("🛑 [SLOT 6 ABORTED] Primary Evening Post for today was NOT published. Refusing to publish orphaned Secondary Page.");
      return { skipped: true, reason: "Orphaned secondary: Primary Slot 3 not found" };
    }

    if (typeof publishSecondarySlot3_EveningPage !== "function") {
      throw new Error("publishSecondarySlot3_EveningPage is not defined. Please ensure 'Master Controller.gs' is saved in your Apps Script project.");
    }
    var result = publishSecondarySlot3_EveningPage();
    if (result && !result.skipped) {
      Logger.log("✅ [SLOT 6 COMPLETED] Published Static Page: " + result.title);
      Logger.log("🔗 URL: " + result.url);
    }
    return result;
  } catch (err) {
    Logger.log("❌ [SLOT 6 ERROR]: " + err.message);
    throw err;
  } finally {
    lock.releaseLock();
  }
}
