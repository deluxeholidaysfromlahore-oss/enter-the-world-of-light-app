/**
 * ============================================================================
 * YOUTUBE AUTOMATION ENGINE (YouTubeAutomationGuide.gs)
 * ============================================================================
 * Is file mein Google Drive se YouTube par video auto-upload karne ka complete
 * setup aur step-by-step test function mojood hai.
 * 
 * 📌 HOW IT WORKS:
 * 1. Google Drive Folder ID: "1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4" ("Ai Studio - Kids Mode Data Save")
 * 2. Apps Script folder se MP4 file uthata hai.
 * 3. YouTube par upload karta hai (#Shorts, Education category, Made For Kids = true).
 * 4. Naya YouTube Video ID wapis hamare Web App backend me save karta hai (/api/kids-video/record-youtube-upload).
 * 5. Shaam ke waqt Secondary 2 Blogger Page khud-ba-khud is video ko embed karke post kar deta hai!
 */

const YT_CONFIG = {
  FOLDER_ID: "1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4",
  API_BASE_URL: "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app"
};

/**
 * 🧪 1-CLICK TEST FUNCTION: Google Drive se pehli video upload karke check karein!
 */
function testUploadFirstShortFromDriveFolder() {
  Logger.log("🎬 [TEST] Finding first MP4 video in Google Drive folder: " + YT_CONFIG.FOLDER_ID);
  
  const folder = DriveApp.getFolderById(YT_CONFIG.FOLDER_ID);
  const files = folder.getFiles();
  let targetFile = null;

  while (files.hasNext()) {
    const f = files.next();
    if (f.getMimeType() === "video/mp4" || f.getName().indexOf(".mp4") !== -1) {
      targetFile = f;
      break;
    }
  }

  if (!targetFile) {
    Logger.log("⚠️ Drive folder mein koi MP4 file nahi mili. Pehle DriveShortsSync.gs chalayein.");
    return { success: false, message: "No video found in drive" };
  }

  Logger.log("📁 Video Mili: " + targetFile.getName() + " (Size: " + (targetFile.getSize() / 1024 / 1024).toFixed(2) + " MB)");

  const title = "Kids Learning Fun Short #Shorts";
  const desc = "🌟 Subscribe @EntertheWorldofLight for fun animated learning videos!\nWebsite: " + YT_CONFIG.API_BASE_URL;

  return uploadShortToYouTubeDirectRest(targetFile.getId(), title, desc, ["Shorts", "KidsLearning", "Education"]);
}

/**
 * REST API DIRECT UPLOAD (Zero 'Services +' Dependency)
 */
function uploadShortToYouTubeDirectRest(driveFileId, title, description, tags) {
  Logger.log("🚀 [REST UPLOAD] Preparing multipart YouTube upload...");
  const token = ScriptApp.getOAuthToken();
  if (!token) throw new Error("OAuth token not available.");

  const videoFile = DriveApp.getFileById(driveFileId);
  const videoBlob = videoFile.getBlob();

  const metadata = {
    snippet: {
      title: title || "Kids Fun Educational Short #Shorts",
      description: description || "Subscribe @EntertheWorldofLight for more fun kids learning!",
      tags: tags || ["Shorts", "KidsLearning", "UrduAlphabet"],
      categoryId: "27"
    },
    status: {
      privacyStatus: "public",
      selfDeclaredMadeForKids: true
    }
  };

  const boundary = "-------314159265358979323846";
  const delimiter = "\r\n--" + boundary + "\r\n";
  const closeDelim = "\r\n--" + boundary + "--";

  const metaPart = delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata);

  const mediaPart = delimiter +
    "Content-Type: video/mp4\r\n\r\n";

  const postData = Utilities.newBlob(metaPart)
    .getBytes()
    .concat(Utilities.newBlob(mediaPart).getBytes())
    .concat(videoBlob.getBytes())
    .concat(Utilities.newBlob(closeDelim).getBytes());

  const uploadUrl = "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart&part=snippet,status";

  const response = UrlFetchApp.fetch(uploadUrl, {
    method: "post",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "multipart/related; boundary=" + boundary
    },
    payload: postData,
    muteHttpExceptions: true
  });

  const statusCode = response.getResponseCode();
  const resText = response.getContentText();

  if (statusCode === 200 || statusCode === 201) {
    const data = JSON.parse(resText);
    Logger.log("🎉 [SUCCESS] YouTube Short Upload Ho Gaya!");
    Logger.log("🆔 Video ID: " + data.id);
    Logger.log("🔗 YouTube URL: https://youtube.com/shorts/" + data.id);

    // Save into Web App Backend
    try {
      UrlFetchApp.fetch(YT_CONFIG.API_BASE_URL + "/api/kids-video/record-youtube-upload", {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify({
          videoId: data.id,
          youtubeUrl: "https://youtube.com/shorts/" + data.id,
          title: title
        }),
        muteHttpExceptions: true
      });
      Logger.log("✅ Web App Backend mein record save ho gaya!");
    } catch (apiErr) {
      Logger.log("⚠️ Backend record sync notice: " + apiErr.message);
    }

    return { success: true, videoId: data.id, url: "https://youtube.com/shorts/" + data.id };
  } else {
    Logger.log("❌ [UPLOAD ERROR] HTTP " + statusCode + ": " + resText);
    throw new Error("YouTube Upload Failed (" + statusCode + "): " + resText);
  }
}
