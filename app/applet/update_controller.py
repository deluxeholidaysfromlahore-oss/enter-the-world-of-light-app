import json

# Read channel shorts catalog
with open('channel_shorts_catalog.json', 'r', encoding='utf-8') as f:
    catalog = json.load(f)

print(f"Loaded {len(catalog)} shorts from catalog.")

with open('apps-script/Master Controller.gs', 'r', encoding='utf-8') as f:
    code = f.read()

# Build JavaScript array of all 48 shorts in chronological order
js_items = []
for item in catalog:
    safe_title = json.dumps(item['title'])
    js_items.append(f"    {{ id: \"{item['id']}\", title: {safe_title} }}")

catalog_js = "[\n" + ",\n".join(js_items) + "\n  ]"

# 1. Update MASTER_CONFIG in code
config_replacement = f'''var MASTER_CONFIG = {{
  // 1. Google Blogger Production Networks
  PRIMARY_BLOG_ID: "5550406854147347257",
  PRIMARY_BLOG_DOMAIN: "https://entertheworldoflightandlaughter.blogspot.com",
  SECONDARY_BLOG_ID: "3870971020533851761",
  SECONDARY_BLOG_DOMAIN: "https://lightlaughterkids.blogspot.com",

  // 2. Official Social & Community Endpoints
  WHATSAPP_CHANNEL_URL: "https://whatsapp.com/channel/0029VasZV4a60eBd8TwfTg1f",
  YOUTUBE_CHANNEL_ID: "UCvCzFP5EPsV4Vp6l6GGuvyg",
  YOUTUBE_HANDLE: "@EntertheWorldofLight",
  YOUTUBE_URL: "https://www.youtube.com/@EntertheWorldofLight",
  YOUTUBE_FEED_URL: "https://www.youtube.com/feeds/videos.xml?channel_id=UCvCzFP5EPsV4Vp6l6GGuvyg",

  // 3. Official Brand Logo URL (Hosted on Google/YouTube CDN - 100% Reliable & Permanent)
  BRAND_LOGO_URL: "https://yt3.googleusercontent.com/yVGmLgoCPpJUTFfUEU1pBLiRcPabd1aoJb5xuO71qI1E7F_MX8ykyrIKLOF5Pv4BVR8v3yC-4Gk=s900-c-k-c0x00ffffff-no-rj",

  // 4. Web App Production URLs
  API_BASE_URL: "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",

  // 5. Complete Chronological YouTube Shorts Catalog from @EntertheWorldofLight (48 Videos)
  // Index 0 is the VERY FIRST short uploaded to the channel; Index 47 is the latest upload.
  CHRONOLOGICAL_SHORTS_CATALOG: {catalog_js}
}};'''

import re
code = re.sub(r'var MASTER_CONFIG = \{[\s\S]*?\n\};\n\nvar CONFIG = MASTER_CONFIG;', config_replacement + '\n\nvar CONFIG = MASTER_CONFIG;', code)

# 2. Update fetchChannelVideosFromYouTube to use the full chronological catalog
new_fetch_fn = '''function fetchChannelVideosFromYouTube() {
  // Use the verified, complete chronological catalog (Oldest #1 to Newest #48)
  var catalog = MASTER_CONFIG.CHRONOLOGICAL_SHORTS_CATALOG || [];
  var videos = [];
  for (var i = 0; i < catalog.length; i++) {
    var item = catalog[i];
    videos.push({
      id: item.id,
      title: item.title,
      thumbnailUrl: "https://i.ytimg.com/vi/" + item.id + "/hqdefault.jpg",
      url: "https://www.youtube.com/shorts/" + item.id
    });
  }
  Logger.log("✅ [CATALOG SYNC] Loaded " + videos.length + " verified channel videos in CHRONOLOGICAL SEQUENCE (Oldest #1 to Newest #" + videos.length + ")");
  return videos;
}'''

code = re.sub(r'function fetchChannelVideosFromYouTube\(\) \{[\s\S]*?\n\}', new_fetch_fn, code)

# 3. Update buildLuxuryArticleHtml blue box:
# Replace the broken showcaseImgUrl pill with the official brand logo!
old_box_pattern = r'<!-- HIGH-RES APP TABLET SHOWCASE -->[\s\S]*?</div>\s*</div>'
# Let's inspect how the header banner is structured in buildLuxuryArticleHtml
header_banner_replacement = '''<!-- 🌟 1. NATIVE BRAND BANNER WITH OFFICIAL CHANNEL LOGO -->
    <div style="background:' + headerBg + ';border-radius:22px;padding:28px 22px;margin-bottom:26px;text-align:center;color:#ffffff;box-shadow:0 12px 30px rgba(2,132,199,0.25);border:1px solid rgba(255,255,255,0.2);">
      <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:5px 18px;border-radius:9999px;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:18px;border:1px solid rgba(255,255,255,0.35);">
        ' + themePillText + ' • ' + slotLabel + ' 2026
      </div>
      <!-- OFFICIAL CHANNEL BRAND LOGO (HIGH-RES 900x900 CDN) -->
      <div style="margin-bottom:16px;text-align:center;">
        <a href="' + webAppUrl + '" target="_blank" style="display:inline-block;text-decoration:none;">
          <img src="' + brandLogoUrl + '" alt="Enter the World of Light &amp; Laughter Official Logo" style="width:115px;height:115px;border-radius:50%;box-shadow:0 10px 28px rgba(0,0,0,0.35);display:block;margin:0 auto;border:4px solid #ffffff;object-fit:cover;" />
        </a>
      </div>
      <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 8px 0;line-height:1.3;letter-spacing:-0.5px;">
        Enter the World of Light &amp; Laughter
      </h1>
      <p style="color:#f8fafc;font-size:14px;font-weight:500;margin:0 0 8px 0;opacity:0.95;">
        Interactive Bilingual Education • Classical Urdu Adab • Child-Safe Wonder
      </p>
      <div style="color:#fde047;font-size:16px;font-family:\'Jameel Noori Nastaleeq\',\'Urdu Typesetting\',serif;line-height:1.9;direction:rtl;margin-top:6px;">
        ' + taglineUrdu + '
      </div>
    </div>'''

code = re.sub(r'<\!-- 🌟 1\. NATIVE BRAND BANNER WITH APP TABLET SHOWCASE IMAGE -->[\s\S]*?<\!-- 🌟 2\. FEATURED YOUTUBE THUMBNAIL', header_banner_replacement + "\n    '<!-- 🌟 2. FEATURED YOUTUBE THUMBNAIL", code)

# Ensure brandLogoUrl is defined in buildLuxuryArticleHtml options
if 'var brandLogoUrl =' not in code:
    code = code.replace(
        'var showcaseImgUrl = MASTER_CONFIG.APP_SHOWCASE_IMAGE_URL;',
        'var brandLogoUrl = MASTER_CONFIG.BRAND_LOGO_URL;\n  var showcaseImgUrl = MASTER_CONFIG.BRAND_LOGO_URL;'
    )

with open('apps-script/Master Controller.gs', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully updated apps-script/Master Controller.gs!")
