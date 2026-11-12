import re

# 1. Update Master Controller.gs with chronological sequence
with open('apps-script/Master Controller.gs', 'r') as f:
    mc = f.read()

# Replace fetchChannelVideosFromYouTube to ensure videos are reversed (oldest first)
old_fetch = r'''      if (videos.length > 0) {
        Logger.log("✅ [YOUTUBE SYNC] Fetched " + videos.length + " live videos from @EntertheWorldofLight");
        return videos;
      }'''

new_fetch = r'''      if (videos.length > 0) {
        // RSS feed gives newest first (index 0 = latest).
        // Reverse so index 0 is the VERY FIRST short ever uploaded to the channel!
        videos.reverse();
        Logger.log("✅ [YOUTUBE SYNC] Fetched " + videos.length + " live videos in CHRONOLOGICAL SEQUENCE (Oldest #1 to Newest #15)");
        for (var idx = 0; idx < videos.length; idx++) {
          Logger.log("   #" + (idx + 1) + ": \"" + videos[idx].title + "\" [ID: " + videos[idx].id + "]");
        }
        return videos;
      }'''

if old_fetch in mc:
    mc = mc.replace(old_fetch, new_fetch)
    print("Replaced fetchChannelVideosFromYouTube chronological sorting.")
else:
    print("WARNING: old_fetch not found in Master Controller.gs")

# Update selectChannelVideoForSlot to pick the FIRST unposted video in sequence
old_selector_start = "function selectChannelVideoForSlot(slotName, trackType, targetBlogId) {"
idx_start = mc.find(old_selector_start)
idx_end = mc.find("function buildLuxuryArticleHtml(options) {")

new_selector = r'''function selectChannelVideoForSlot(slotName, trackType, targetBlogId) {
  var videos = fetchChannelVideosFromYouTube();
  if (!videos || videos.length === 0) {
    Logger.log("⚠️ No videos available from YouTube feed or catalog.");
    return null;
  }

  // Fetch existing posts from target blog
  var blogId = targetBlogId || MASTER_CONFIG.PRIMARY_BLOG_ID;
  var existingPosts = fetchRecentBloggerPosts(blogId);

  Logger.log("🔍 [SEQUENTIAL SEARCH] Searching " + videos.length + " videos in chronological order (Oldest -> Newest)...");

  // Find the VERY FIRST video in sequence that has NOT yet been published
  for (var i = 0; i < videos.length; i++) {
    var v = videos[i];
    if (!isVideoAlreadyPublished(v, existingPosts)) {
      Logger.log("🎬 [NEXT IN SEQUENCE SELECTED] Day Post #" + (i + 1) + " of " + videos.length);
      Logger.log("   Title: \"" + v.title + "\"");
      Logger.log("   ID: " + v.id + " | Shorts URL: " + v.url);
      return v;
    } else {
      Logger.log("   ✓ Post #" + (i + 1) + " already published: \"" + v.title + "\" (Checking next in line...)");
    }
  }

  Logger.log("🛑 [ALL POSTS COMPLETED] All " + videos.length + " videos from @EntertheWorldofLight have been published on this blog in full sequence!");
  return null;
}

'''

if idx_start != -1 and idx_end != -1:
    mc = mc[:idx_start] + new_selector + mc[idx_end:]
    print("Updated selectChannelVideoForSlot for strict chronological Day 1, Day 2 sequence!")
else:
    print("WARNING: Could not find selectChannelVideoForSlot boundaries")

with open('apps-script/Master Controller.gs', 'w') as f:
    f.write(mc)

print("Saved apps-script/Master Controller.gs")
