/**
 * ============================================================================
 * GOOGLE DRIVE AUTO-SYNC SCRIPT FOR KIDS SHORTS (DriveShortsSync.gs)
 * ============================================================================
 * Folder Name: "Ai Studio - Kids Mode Data Save"
 * Folder ID:   "1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4"
 * 
 * 📌 KYUN SAVE NAHI HO RHA THA? (ASAL WAJAH):
 * Web App ke andar Google Login se "Firebase Auth Token" milta hai, jo Google Drive
 * API ko access nahi kar sakta (Google Drive ko alag OAuth scope chahiye hota hai).
 * Is liye jab web app se request jati thi, to server upload nahi kar pata tha.
 *
 * 💡 SOLUTION (100% WORKING):
 * Yeh script Google Apps Script ke andar chalta hai jahan Google Drive ki
 * DIRECT NATIVE PERMISSION hoti hai. Yeh script app ke backend se video manifest
 * uthata hai aur tamam MP4 files ko direct Google Drive folder mein save kar deta hai!
 * ============================================================================
 */

const DRIVE_CONFIG = {
  FOLDER_ID: "1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4",
  API_BASE_URL: "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",
  GOOGLE_PROJECT: "enter-the-world-web-app",
  APPS_SCRIPT_CLIENT_ID: "886208799724-j34q9po6ms87og6ocper2fmrn4vg51k9.apps.googleusercontent.com",
  WEB_CLIENT_ID: "886208799724-u0vmh04v159p52j5873jtvveld5labbm.apps.googleusercontent.com"
};

/**
 * 1. MANUAL YA SCHEDULED AUTO-SYNC FUNCTION
 * Is function ko Apps Script mein 'Run' karein ya Time-driven Trigger laga dein.
 */
function syncAllShortsToDriveFolder() {
  Logger.log("🚀 Starting Shorts Sync to Google Drive Folder: " + DRIVE_CONFIG.FOLDER_ID);

  // 1. Google Drive Folder access karein
  const folder = DriveApp.getFolderById(DRIVE_CONFIG.FOLDER_ID);
  if (!folder) {
    Logger.log("❌ Error: Google Drive Folder nahi mila. Folder ID check karein.");
    return;
  }
  Logger.log("📁 Found Folder: " + folder.getName());

  // 2. App backend se Kids Videos Pipeline Manifest fetch karein
  const manifestUrl = DRIVE_CONFIG.API_BASE_URL + "/api/kids-video/pipeline";
  let videos = [];
  try {
    const res = UrlFetchApp.fetch(manifestUrl, { muteHttpExceptions: true });
    if (res.getResponseCode() === 200) {
      const parsed = JSON.parse(res.getContentText());
      videos = Array.isArray(parsed) ? parsed : (parsed.items || []);
      Logger.log("📹 Found " + videos.length + " videos in pipeline.");
    }
  } catch (e) {
    Logger.log("⚠️ Pipeline fetch error: " + e.message);
  }

  // 3. Agar pipeline videos hain to ek ek karke Drive mein check aur upload karein
  let uploadedCount = 0;
  let alreadyExistCount = 0;

  for (let i = 0; i < videos.length; i++) {
    const item = videos[i];
    if (!item.videoUrl) continue;

    const filename = item.videoUrl.split("/").pop();
    
    // Check karein kya yeh file pehle se Drive folder mein mojood hai?
    const existingFiles = folder.getFilesByName(filename);
    if (existingFiles.hasNext()) {
      Logger.log("⏩ Already exists in Drive: " + filename);
      alreadyExistCount++;
      continue;
    }

    // Video URL build karein
    const fullVideoUrl = item.videoUrl.startsWith("http") 
      ? item.videoUrl 
      : DRIVE_CONFIG.API_BASE_URL + item.videoUrl;

    Logger.log("⬇️ Downloading & Uploading to Drive: " + filename + " (" + fullVideoUrl + ")");

    try {
      const videoResponse = UrlFetchApp.fetch(fullVideoUrl, { muteHttpExceptions: true });
      if (videoResponse.getResponseCode() === 200) {
        const blob = videoResponse.getBlob().setName(filename);
        const createdFile = folder.createFile(blob);
        createdFile.setDescription("Kids Educational Short: " + item.topic + " (" + item.category + ")");
        Logger.log("✅ Successfully saved into Drive: " + filename + " (File ID: " + createdFile.getId() + ")");
        uploadedCount++;
      } else {
        Logger.log("⚠️ Could not download file " + filename + ". Status: " + videoResponse.getResponseCode());
      }
    } catch (uploadErr) {
      Logger.log("❌ Upload failed for " + filename + ": " + uploadErr.message);
    }
  }

  // 4. Promo videos pipeline ko bhi sync karein
  syncPromoVideosToDrive(folder);

  Logger.log("🎉 SYNC SUMMARY: Uploaded: " + uploadedCount + ", Already present: " + alreadyExistCount);
}

/**
 * 2. PROMO SHORTS BHI DRIVE MEIN SYNC KARNA
 */
function syncPromoVideosToDrive(folder) {
  const promoUrl = DRIVE_CONFIG.API_BASE_URL + "/api/promo-video/pipeline";
  try {
    const res = UrlFetchApp.fetch(promoUrl, { muteHttpExceptions: true });
    if (res.getResponseCode() === 200) {
      const data = JSON.parse(res.getContentText());
      const promoVideos = Array.isArray(data) ? data : (data.items || data.records || []);
      
      for (let i = 0; i < promoVideos.length; i++) {
        const item = promoVideos[i];
        if (!item.videoUrl) continue;
        const filename = item.videoUrl.split("/").pop();
        const existing = folder.getFilesByName(filename);
        if (!existing.hasNext()) {
          const fullUrl = item.videoUrl.startsWith("http") ? item.videoUrl : DRIVE_CONFIG.API_BASE_URL + item.videoUrl;
          const vRes = UrlFetchApp.fetch(fullUrl, { muteHttpExceptions: true });
          if (vRes.getResponseCode() === 200) {
            const blob = vRes.getBlob().setName(filename);
            folder.createFile(blob);
            Logger.log("✅ Promo Short saved: " + filename);
          }
        }
      }
    }
  } catch (e) {
    Logger.log("Promo sync info: " + e.message);
  }
}

/**
 * 3. WEB APP ENTRY POINTS (Instant Trigger from Web App or Webhook)
 */
function doGet(e) {
  try {
    syncAllShortsToDriveFolder();
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Drive sync executed successfully" })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  return doGet(e);
}

/**
 * 3. AUTOMATIC DAILY TRIGGER SETUP (Ek baar run karein)
 * Yeh function har 4 ghante baad khud-ba-khud Drive mein naye shorts save karega.
 */
function setupAutoDriveSyncTrigger() {
  // Purane triggers delete karein
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "syncAllShortsToDriveFolder") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Naya 4-hour trigger banayein
  ScriptApp.newTrigger("syncAllShortsToDriveFolder")
    .timeBased()
    .everyHours(4)
    .create();

  Logger.log("⏰ Automatic 4-Hour Drive Sync Trigger Successfully Configured!");
}
