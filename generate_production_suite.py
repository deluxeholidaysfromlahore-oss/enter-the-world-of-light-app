#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Production Suite Generator for Google Apps Script
Enterprise-Grade Blogger Automation with Strict Architectural Separation:
- 3 Daily Primary Blogger Posts (Morning, Afternoon, Evening Short Deep-Dive) on Primary Blog
- 3 Daily Permanent Secondary Static Pages (Morning, Afternoon, Evening) on Secondary Kids Blog
- 60-120 min paired execution delay after Primary publication
- Chronological YouTube shorts ordering from Short #1 to #48
- Fail-safe duplicate protection (Live Blogger API + Persistent ScriptProperties ledger)
- Universal Brand Logo, Hero Media, WhatsApp card, Social Share, Reciprocal Links
- Zero new .gs files; maintains existing inventory with 100% clean syntax
"""

import json, subprocess, os, shutil, base64

# 1. Load verified chronological catalog (412 items from YouTube Data API v3 uploads playlist)
with open("verified_youtube_inventory.json", "r", encoding="utf-8") as f:
    catalog = json.load(f)

# Format catalog as JavaScript array literal
js_catalog_items = []
for item in catalog:
    title_escaped = json.dumps(item["title"], ensure_ascii=False)
    pub_escaped = json.dumps(item.get("publishedAt", ""), ensure_ascii=False)
    js_catalog_items.append(f'    {{ id: "{item["id"]}", title: {title_escaped}, publishedAt: {pub_escaped} }}')
catalog_js = "[\n" + ",\n".join(js_catalog_items) + "\n  ]"

# 2. Master configuration clean definitions
# (No multi-megabyte base64 strings to guarantee 100% stable parsing in Apps Script)

# ==============================================================================
# 2. MASTER CONTROLLER.GS CONTENT
# ==============================================================================
master_controller_code = f'''/**
 * ============================================================================
 * ENTER THE WORLD OF LIGHT & LAUGHTER – GOOGLE APPS SCRIPT MASTER CONTROLLER
 * File: Master Controller.gs
 * ============================================================================
 * Production Edition: Autonomous Dual Blogger Network & YouTube Shorts Suite
 *
 * DAILY CONTENT ARCHITECTURE:
 * 1. Primary Blog (entertheworldoflightandlaughter.blogspot.com | ID: 5550406854147347257)
 *    - 3 Daily POSTS:
 *      • Slot 1 (Subah / Morning): Web App Feature Deep Dive (Urdu Tracing, Phonics)
 *      • Slot 2 (Dopahar / Afternoon): Distinct App Pillar (Classical Rekhta, Literature, Mind Gym)
 *      • Slot 3 (Shaam / Evening): Mandatory YouTube Short Deep-Dive (Chronological Oldest to Newest)
 *
 * 2. Secondary Kids Blog (lightlaughterkids.blogspot.com | ID: 3870971020533851761)
 *    - 3 Daily PERMANENT STATIC PAGES (via /pages resource):
 *      • Slot 4 (Subah / Morning): Value-First Guide for Parents/Learners (~1-2h after Slot 1)
 *      • Slot 5 (Dopahar / Afternoon): Value-First Curriculum/Worksheet Guide (~1-2h after Slot 2)
 *      • Slot 6 (Shaam / Evening): Value-First Life Lessons/Moral Discussion (~1-2h after Slot 3)
 *
 * BRANDING & QUALITY STANDARDS:
 * - Hosted Google CDN Brand Logo (900x900 avatar: yt3.googleusercontent.com)
 * - User-Provided App Showcase Tablet Hero Image (/app_showcase_hero.png)
 * - YouTube 9:16 Responsive Player & HQ Thumbnails
 * - Official WhatsApp Channel Join Card & Universal Share Buttons
 * - Compulsory Reciprocal Links (Primary -> Secondary Kids; Secondary -> Primary)
 * - 0% Personal Phone Numbers
 * - Dual Deduplication (Live Blogger Posts/Pages API + ScriptProperties Ledger)
 * ============================================================================
 */

var MASTER_CONFIG = {{
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

  // 3. Official Brand Assets (Hosted on Google/YouTube CDN - 100% Reliable & Permanent)
  BRAND_LOGO_URL: "https://yt3.googleusercontent.com/yVGmLgoCPpJUTFfUEU1pBLiRcPabd1aoJb5xuO71qI1E7F_MX8ykyrIKLOF5Pv4BVR8v3yC-4Gk=s900-c-k-c0x00ffffff-no-rj",
  APP_SHOWCASE_TABLET_URL: "https://entertheworldoflightandlaughter.blogspot.com/favicon.ico",
  API_BASE_URL: "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",

  // 4. Web App Core Features & Educational Pillars (Rotational Catalog for Slots 1 & 2)
  APP_FEATURES_CATALOG: [
    {{
      id: "URDU_TRACING_CANVAS",
      name: "Urdu Haroof-e-Tahajji & Tracing Canvas",
      urduTitle: "اردو حروفِ تہجی ٹریسنگ کینوس اور صوتیات",
      summary: "Interactive digital stroke tracing exercises for all 38 Urdu alphabets. Includes guided stroke animations, live audio stroke correction, phonics pronunciation, and rewarding visual feedback.",
      actionUrl: "/learn/urdu-tracing",
      category: "Urdu Literacy & Digital Qaida",
      badgeText: "INTERACTIVE STROKE MECHANICS",
      secondaryGuideTitle: "Parent's Practical Manual: Teaching Urdu Alphabet Strokes at Home Without Stress",
      secondaryGuideTakeaway: "Break practice into 5-minute playful bursts, celebrate stroke confidence before perfection, and connect letter shapes with sensory finger tracing."
    }},
    {{
      id: "CLASSICAL_REKHTA_HERITAGE",
      name: "Classical Urdu Literature & Rekhta Heritage",
      urduTitle: "کلاسیکی اردو شاعری اور ریختہ ادب کا روشن جہان",
      summary: "Curated poetic anthology of Allama Iqbal, Mirza Ghalib, and Mir Taqi Mir. Features line-by-line poetic recitations, high-contrast Nastaliq layout, bilingual contextual explanations, and moral reflection prompts.",
      actionUrl: "/literature/classical-poetry",
      category: "Classical Literature & Culture",
      badgeText: "POETRY RECITATION & ANALYSIS",
      secondaryGuideTitle: "Family Anthology Guide: Introducing Classical Urdu Poetry & Moral Wisdom to Young Readers",
      secondaryGuideTakeaway: "Read poems aloud for rhythm, discuss the central ethical question of each stanza, and explore the timeless lessons of character and humility."
    }},
    {{
      id: "KIDS_LIGHT_WORLD_FABLES",
      name: "Kids Light World & 2D Animated Moral Stories",
      urduTitle: "بچوں کی پیاری کہانیاں اور اخلاقی تربیت کا روشن سرچشمہ",
      summary: "Wholesome 2D animated bedtime fables, animal adventures, interactive Urdu read-alouds, and child-safe moral lessons with single-click parent gate controls and zero commercial ads.",
      actionUrl: "/kids/animated-stories",
      category: "Child-Safe Stories & Ethics",
      badgeText: "2D ANIMATED MORAL FABLES",
      secondaryGuideTitle: "Bedtime Storytelling Handbook: Character Building & Empathy Through Meaningful Fables",
      secondaryGuideTakeaway: "Ask your child open-ended reflection questions after every fable, encourage them to imagine alternative endings, and celebrate kind actions in daily life."
    }},
    {{
      id: "COGNITIVE_MIND_GYM",
      name: "Interactive Mind Gym & Bilingual Quizzes",
      urduTitle: "ذہنی آزمائش، علمی معمہ اور دو لسانی کوئز",
      summary: "Gamified cognitive exercises, root-language word pairing, memory match games, daily challenge streaks, and unlockable achievement badges in Urdu and English.",
      actionUrl: "/quizzes/mind-gym",
      category: "Cognitive Skills & Brain Games",
      badgeText: "COGNITIVE MEMORY & LOGIC",
      secondaryGuideTitle: "15-Minute Daily Brain Gym: Engaging Word-Matching & Memory Activities for Early Learners",
      secondaryGuideTakeaway: "Stimulate dual-language cognitive recall with 10-minute daily memory challenges, pairing words with mental pictures and playful speed rounds."
    }}
  ],

  // 5. Complete Chronological YouTube Inventory from @EntertheWorldofLight (412 Uploads)
  // START_FROM_2026_SERIES: true starts from 2026 Educational Series (#365: tBchpfjzUog).
  // Set to false to start from the channel's absolute first upload in 2024 (#1: i-J3tY-DQgk).
  START_FROM_2026_SERIES: true,
  CHRONOLOGICAL_SHORTS_CATALOG: {catalog_js}
}};

var CONFIG = MASTER_CONFIG;

/**
 * ============================================================================
 * 1. PERSISTENT SCRIPTPROPERTIES LEDGER (CROSS-RUN PERSISTENCE & AUDIT)
 * ============================================================================
 */
function getPersistentLedger() {{
  var props = PropertiesService.getScriptProperties();
  var raw = props.getProperty("POSTED_ITEMS_LEDGER");
  if (!raw) return [];
  try {{
    return JSON.parse(raw);
  }} catch (e) {{
    Logger.log("⚠️ Failed to parse ledger JSON, resetting: " + e.message);
    return [];
  }}
}}

function recordPublicationInLedger(record) {{
  var props = PropertiesService.getScriptProperties();
  var ledger = getPersistentLedger();
  record.recordedAt = new Date().toISOString();
  ledger.push(record);
  // Keep last 300 records
  if (ledger.length > 300) {{
    ledger = ledger.slice(ledger.length - 300);
  }}
  props.setProperty("POSTED_ITEMS_LEDGER", JSON.stringify(ledger));
  Logger.log("💾 [LEDGER SAVED] Stored record: " + record.title + " | ID: " + record.id + " | Resource: " + record.resourceType);
}}

/**
 * ============================================================================
 * 2. LIVE BLOGGER API FETCHER (READ-ONLY INSPECTION FOR DEDUPLICATION)
 * ============================================================================
 */
function fetchRecentBloggerPosts(blogId) {{
  var token = ScriptApp.getOAuthToken();
  if (!token) {{
    return {{ success: false, error: "OAuth Token not available", items: [] }};
  }}
  var url = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts?maxResults=50&fetchBodies=true";
  try {{
    var response = UrlFetchApp.fetch(url, {{
      method: "GET",
      headers: {{
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }},
      muteHttpExceptions: true
    }});
    var code = response.getResponseCode();
    if (code === 200) {{
      var data = JSON.parse(response.getContentText());
      var items = data.items || [];
      Logger.log("📚 [BLOGGER SYNC] Retrieved " + items.length + " existing POSTS from Blog ID: " + blogId);
      return {{ success: true, items: items }};
    }} else {{
      var err = "Blogger API returned HTTP " + code + ": " + response.getContentText();
      Logger.log("⚠️ [BLOGGER FETCH ERROR] " + err);
      return {{ success: false, error: err, items: [] }};
    }}
  }} catch (err) {{
    Logger.log("❌ [BLOGGER FETCH EXCEPTION] Failed to fetch posts: " + err.message);
    return {{ success: false, error: err.message, items: [] }};
  }}
}}

function fetchRecentBloggerPages(blogId) {{
  var token = ScriptApp.getOAuthToken();
  if (!token) {{
    return {{ success: false, error: "OAuth Token not available", items: [] }};
  }}
  var url = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/pages?maxResults=50&fetchBodies=true";
  try {{
    var response = UrlFetchApp.fetch(url, {{
      method: "GET",
      headers: {{
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }},
      muteHttpExceptions: true
    }});
    var code = response.getResponseCode();
    if (code === 200) {{
      var data = JSON.parse(response.getContentText());
      var items = data.items || [];
      Logger.log("📄 [BLOGGER SYNC] Retrieved " + items.length + " existing STATIC PAGES from Blog ID: " + blogId);
      return {{ success: true, items: items }};
    }} else {{
      var err = "Blogger API returned HTTP " + code + ": " + response.getContentText();
      Logger.log("⚠️ [BLOGGER FETCH ERROR] " + err);
      return {{ success: false, error: err, items: [] }};
    }}
  }} catch (err) {{
    Logger.log("❌ [BLOGGER FETCH EXCEPTION] Failed to fetch pages: " + err.message);
    return {{ success: false, error: err.message, items: [] }};
  }}
}}

/**
 * ============================================================================
 * 3. FAIL-SAFE DEDUPLICATION MATCHER (LIVE BLOGGER + LEDGER)
 * ============================================================================
 */
function isItemAlreadyPublished(itemMeta, isPage, targetBlogId) {{
  if (!itemMeta) return false;

  var vId = (itemMeta.videoId || itemMeta.id || "").trim();
  var vTitle = (itemMeta.title || "").toLowerCase().trim();
  var featureId = (itemMeta.featureId || "").trim();

  // 1. Check persistent script ledger (Layer 1)
  var ledger = getPersistentLedger();
  var todayStr = new Date().toISOString().slice(0, 10);
  for (var k = 0; k < ledger.length; k++) {{
    var rec = ledger[k];
    if (rec.blogId === targetBlogId && rec.resourceType === (isPage ? "PAGE" : "POST")) {{
      if (vId && rec.videoId === vId) {{
        Logger.log("⚠️ [LEDGER DUPLICATE] Video ID '" + vId + "' recorded on " + rec.recordedAt);
        return true;
      }}
      if (featureId && rec.featureId === featureId && rec.slotDate === todayStr) {{
        Logger.log("⚠️ [LEDGER DUPLICATE] Feature '" + featureId + "' already published today.");
        return true;
      }}
    }}
  }}

  // 2. Check live Blogger published items (Layer 2 - Fail-Closed: throws if unreachable)
  var fetchResult = isPage ? fetchRecentBloggerPages(targetBlogId) : fetchRecentBloggerPosts(targetBlogId);
  if (!fetchResult.success) {{
    throw new Error("Deduplication check failed (Blogger API unreachable): " + fetchResult.error + ". Aborting publication to prevent duplicate posts.");
  }}

  var existingItems = fetchResult.items || [];
  for (var i = 0; i < existingItems.length; i++) {{
    var liveItem = existingItems[i];
    var postTitle = (liveItem.title || "").toLowerCase();
    var postContent = (liveItem.content || "").toLowerCase();

    // Check exact video ID in content or title
    if (vId && (postContent.indexOf(vId.toLowerCase()) !== -1 || postTitle.indexOf(vId.toLowerCase()) !== -1)) {{
      Logger.log("⚠️ [BLOGGER DUPLICATE] Video ID '" + vId + "' found in live item: \\"" + liveItem.title + "\\"");
      return true;
    }}

    // Check exact title match
    if (vTitle.length > 10 && postTitle.indexOf(vTitle) !== -1) {{
      Logger.log("⚠️ [BLOGGER DUPLICATE] Title match in live item: \\"" + liveItem.title + "\\"");
      return true;
    }}
  }}

  return false;
}}

/**
 * Dynamic dependent scheduler: schedules paired Secondary Static Page 60-120 mins
 * after the actual successful publication of the Primary Post.
 */
function schedulePairedSecondarySlot(handlerFunction, delayMinutes) {{
  delayMinutes = delayMinutes || (70 + Math.floor(Math.random() * 40));
  var targetTime = new Date(Date.now() + delayMinutes * 60 * 1000);
  
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {{
    if (triggers[i].getHandlerFunction() === handlerFunction) {{
      ScriptApp.deleteTrigger(triggers[i]);
    }}
  }}

  ScriptApp.newTrigger(handlerFunction)
    .timeBased()
    .at(targetTime)
    .inTimezone("Asia/Karachi")
    .create();

  Logger.log("⏰ [DYNAMIC PAIRED TRIGGER] " + handlerFunction + " armed for " + targetTime.toISOString() + " (" + delayMinutes + " minutes from actual Primary publication).");
}}

/**
 * ============================================================================
 * 4. SEQUENTIAL CHRONOLOGICAL SHORT SELECTOR (OLDEST -> NEWEST)
 * ============================================================================
 */
function selectNextChronologicalShort() {{
  var catalog = MASTER_CONFIG.CHRONOLOGICAL_SHORTS_CATALOG || [];
  if (!catalog || catalog.length === 0) {{
    Logger.log("❌ [CATALOG EMPTY] No shorts found in catalog.");
    return null;
  }}

  var targetBlogId = MASTER_CONFIG.PRIMARY_BLOG_ID;
  var startIdx = (MASTER_CONFIG.START_FROM_2026_SERIES && catalog.length >= 365) ? 364 : 0;

  Logger.log("🔍 [CHRONOLOGICAL SEARCH] Scanning " + catalog.length + " channel uploads starting from index " + startIdx + " (Oldest-to-Newest)...");

  for (var i = startIdx; i < catalog.length; i++) {{
    var shortItem = catalog[i];
    var videoMeta = {{
      id: shortItem.id,
      videoId: shortItem.id,
      title: shortItem.title,
      publishedAt: shortItem.publishedAt,
      thumbnailUrl: "https://i.ytimg.com/vi/" + shortItem.id + "/hqdefault.jpg",
      shortsUrl: "https://www.youtube.com/shorts/" + shortItem.id
    }};

    if (!isItemAlreadyPublished(videoMeta, false, targetBlogId)) {{
      Logger.log("🎬 [CHRONOLOGICAL SHORT SELECTED] Upload #" + (i + 1) + " of " + catalog.length);
      Logger.log("   Title: \\"" + videoMeta.title + "\\"");
      Logger.log("   ID: " + videoMeta.id + " | Date: " + videoMeta.publishedAt);
      videoMeta.sequenceIndex = i;
      return videoMeta;
    }} else {{
      Logger.log("   ✓ Upload #" + (i + 1) + " already published: \\"" + shortItem.title + "\\" (Checking next...)");
    }}
  }}

  Logger.log("🛑 [ALL SHORTS PUBLISHED] All channel uploads from index " + startIdx + " have been posted!");
  return null;
}}

/**
 * ============================================================================
 * 5. ROTATIONAL WEB APP FEATURE SELECTOR (FOR SLOTS 1 & 2)
 * ============================================================================
 */
function selectAppFeatureForSlot(slotName) {{
  var features = MASTER_CONFIG.APP_FEATURES_CATALOG || [];
  var targetBlogId = MASTER_CONFIG.PRIMARY_BLOG_ID;
  var ledger = getPersistentLedger();
  var todayStr = new Date().toISOString().slice(0, 10);

  // Index based on slot and day to provide natural variation
  var dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  var offset = slotName === "morning" ? 0 : 2; // Morning gets feature 0 or 1, afternoon gets 2 or 3

  for (var i = 0; i < features.length; i++) {{
    var idx = (dayOfYear + offset + i) % features.length;
    var candidate = features[idx];

    // Check if this feature was already published today in another slot
    var alreadyUsedToday = false;
    for (var k = 0; k < ledger.length; k++) {{
      if (ledger[k].featureId === candidate.id && ledger[k].slotDate === todayStr) {{
        alreadyUsedToday = true;
        break;
      }}
    }}

    if (!alreadyUsedToday) {{
      Logger.log("🎯 [FEATURE SELECTED] Slot: " + slotName + " | Selected: " + candidate.name + " (" + candidate.id + ")");
      return candidate;
    }}
  }}

  // Default to first feature if all used
  return features[0];
}}

/**
 * ============================================================================
 * 6. HTML BUILDERS (PRIMARY POSTS & SECONDARY STATIC PAGES)
 * ============================================================================
 */
function buildLuxuryArticleHtml(options) {{
  options = options || {{}};
  var isKidsTheme = options.isKidsTheme || false;
  var videoId = options.videoId || "";
  var videoTitle = options.videoTitle || "Enter the World of Light Feature";
  var heroThumbUrl = options.heroThumbUrl || (videoId ? ("https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg") : "");
  var trackTitle = options.title || videoTitle;
  var trackSubtitle = options.subtitle || "Master Urdu Haroof-e-Tahajji tracing, classical poetry recitations, child-safe moral stories and bilingual memory games.";
  var crossLinkUrl = options.crossLinkUrl || MASTER_CONFIG.SECONDARY_BLOG_DOMAIN;
  var crossLinkLabel = options.crossLinkLabel || "Visit Kids Light World – Educational Nursery & Phonics Directory";
  var slotLabel = (options.slotName || "DAILY").toUpperCase();
  var webAppUrl = MASTER_CONFIG.API_BASE_URL;
  var brandLogoUrl = MASTER_CONFIG.BRAND_LOGO_URL;
  var whatsappUrl = MASTER_CONFIG.WHATSAPP_CHANNEL_URL;
  var youtubeChannelUrl = MASTER_CONFIG.YOUTUBE_URL;

  var headerBg = isKidsTheme
    ? "linear-gradient(135deg, #f59e0b 0%, #d97706 40%, #ea580c 100%)"
    : "linear-gradient(135deg, #0284c7 0%, #0369a1 40%, #1e3a8a 100%)";

  var themePillText = isKidsTheme ? "KIDS LIGHT WORLD 🦄" : "OFFICIAL APP HUB 🌟";
  var taglineUrdu = isKidsTheme
    ? "بچوں کی پیاری دنیا، اخلاقی کہانیاں اور ہنستی مسکراتی تعلیم"
    : "تعلیم، تفریح، کلاسیکی ادب اور اخلاقی تربیت کا روشن جہان";

  var encTitle = encodeURIComponent(trackTitle);
  var encUrl = encodeURIComponent(crossLinkUrl);

  var html = 
    '<div style="background-color:#ffffff !important;color:#0f172a !important;font-family:Arial,sans-serif !important;line-height:1.8;max-width:820px;margin:0 auto;padding:28px 24px;border-radius:24px;box-shadow:0 14px 40px rgba(0,0,0,0.08);border:1px solid #e2e8f0;text-align:left;">' +

    '<!-- 🌟 1. NATIVE BRAND BANNER WITH OFFICIAL CHANNEL LOGO -->' +
    '<div style="background:' + headerBg + ';border-radius:22px;padding:28px 22px;margin-bottom:26px;text-align:center;color:#ffffff;box-shadow:0 12px 30px rgba(2,132,199,0.25);border:1px solid rgba(255,255,255,0.2);">' +
      '<div style="display:inline-block;background:rgba(255,255,255,0.2);padding:5px 18px;border-radius:9999px;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:18px;border:1px solid rgba(255,255,255,0.35);">' +
        themePillText + ' • ' + slotLabel + ' 2026' +
      '</div>' +
      '<!-- OFFICIAL CHANNEL BRAND LOGO (HIGH-RES 900x900 CDN) -->' +
      '<div style="margin-bottom:16px;text-align:center;">' +
        '<a href="' + webAppUrl + '" target="_blank" style="display:inline-block;text-decoration:none;">' +
          '<img src="' + brandLogoUrl + '" alt="Enter the World of Light &amp; Laughter Official Logo" style="width:115px;height:115px;border-radius:50%;box-shadow:0 10px 28px rgba(0,0,0,0.35);display:block;margin:0 auto;border:4px solid #ffffff;object-fit:cover;" />' +
        '</a>' +
      '</div>' +
      '<h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 8px 0;line-height:1.3;letter-spacing:-0.5px;">' +
        'Enter the World of Light &amp; Laughter' +
      '</h1>' +
      '<p style="color:#f8fafc;font-size:14px;font-weight:500;margin:0 0 8px 0;opacity:0.95;">' +
        'Interactive Bilingual Education • Classical Urdu Adab • Child-Safe Wonder' +
      '</p>' +
      '<div style="color:#fde047;font-size:16px;font-family:Arial,sans-serif;line-height:1.9;direction:rtl;margin-top:6px;">' +
        taglineUrdu +
      '</div>' +
    '</div>';

  // 🌟 2. HERO MEDIA SECTION
  if (videoId && heroThumbUrl) {{
    html += 
      '<!-- 🌟 2. FEATURED YOUTUBE THUMBNAIL -->' +
      '<div style="margin-bottom:24px;text-align:center;">' +
        '<a href="https://www.youtube.com/shorts/' + videoId + '" target="_blank" style="display:block;text-decoration:none;">' +
          '<img src="' + heroThumbUrl + '" alt="' + trackTitle + '" style="border-radius:18px;box-shadow:0 8px 24px rgba(0,0,0,0.12);display:block;margin:0 auto;max-height:420px;width:100%;object-fit:cover;border:2px solid #f1f5f9;" />' +
        '</a>' +
      '</div>';
  }} else {{
    html += 
      '<!-- 🌟 2. OFFICIAL APP SHOWCASE TABLET HERO -->' +
      '<div style="margin-bottom:24px;text-align:center;">' +
        '<a href="' + webAppUrl + '" target="_blank" style="display:block;text-decoration:none;">' +
          '<img src="' + (MASTER_CONFIG.APP_SHOWCASE_TABLET_URL || MASTER_CONFIG.BRAND_LOGO_URL) + '" alt="Enter the World of Light &amp; Laughter Tablet App Showcase" style="border-radius:18px;box-shadow:0 12px 30px rgba(0,0,0,0.14);display:block;margin:0 auto;max-height:420px;width:100%;max-width:760px;object-fit:cover;border:2px solid #e2e8f0;" />' +
        '</a>' +
        '<div style="color:#64748b;font-size:12px;margin-top:8px;font-weight:600;">📱 Interactive Web &amp; Tablet Experience — Enter the World of Light &amp; Laughter</div>' +
      '</div>';
  }}

  // 🌟 3. ARTICLE TITLE & EXECUTIVE SUMMARY
  html += 
    '<!-- 🌟 3. ARTICLE TITLE & EXECUTIVE SUMMARY -->' +
    '<div style="margin-bottom:28px;">' +
      '<h2 style="color:#0f172a;font-size:23px;font-weight:800;line-height:1.35;margin:0 0 10px 0;">' +
        trackTitle +
      '</h2>' +
      '<p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 16px 0;">' +
        trackSubtitle +
      '</p>' +
      '<div style="background:#f8fafc;border-left:4px solid #0284c7;border-radius:0 14px 14px 0;padding:14px 18px;font-size:14px;color:#334155;">' +
        '💡 <strong>Platform Overview:</strong> Enter the World of Light &amp; Laughter combines interactive browser technology with South Asian literary heritage. From guided Urdu stroke tracing and bilingual vocabulary drills to classical Allama Iqbal poetry recitations and child-safe moral fables, explore an educational ecosystem designed for young learners, students, and cultural enthusiasts.' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 4. THE 4 APP-THEMED FEATURE CARDS -->' +
    '<div style="margin-bottom:30px;">' +
      '<h3 style="color:#0f172a;font-size:17px;font-weight:800;margin:0 0 16px 0;display:flex;align-items:center;">' +
        '<span style="color:#0284c7;margin-right:8px;">✦</span> Explore 4 Core Interactive Pillars' +
      '</h3>' +
      '<div style="display:grid;grid-template-columns:1fr;gap:14px;">' +

        '<!-- CARD 1: URDU TRACING -->' +
        '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:18px 20px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">' +
            '<span style="background:#e0f2fe;color:#0369a1;font-size:11px;font-weight:700;padding:3px 10px;border-radius:9999px;text-transform:uppercase;">PILLAR 1: FOUNDATION PRACTICE</span>' +
            '<span style="font-size:18px;">✏️</span>' +
          '</div>' +
          '<h4 style="color:#0f172a;font-size:17px;font-weight:700;margin:0 0 6px 0;">' +
            'Urdu Haroof-e-Tahajji &amp; Tracing Canvas <span style="color:#0284c7;font-size:14px;direction:rtl;display:inline-block;margin-left:6px;">حروفِ تہجی ٹریسنگ کینوس</span>' +
          '</h4>' +
          '<p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 12px 0;">' +
            'Full interactive HTML5 canvas tracing exercises for all 38 Urdu alphabets. Includes guided arrow animations, real-time stroke correction, native phonetics audio, and reward stars.' +
          '</p>' +
          '<div style="margin-bottom:12px;">' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-right:6px;margin-bottom:6px;">Guided Stroke Order</span>' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-right:6px;margin-bottom:6px;">Native Audio</span>' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-bottom:6px;">Star Rewards</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/learn/urdu-tracing" target="_blank" style="display:inline-block;background:#0284c7;color:#ffffff;padding:8px 16px;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none;">' +
            'Launch Tracing Engine ↗' +
          '</a>' +
        '</div>' +

        '<!-- CARD 2: CLASSICAL POETRY -->' +
        '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:18px 20px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">' +
            '<span style="background:#f0fdf4;color:#15803d;font-size:11px;font-weight:700;padding:3px 10px;border-radius:9999px;text-transform:uppercase;">PILLAR 2: LITERARY HERITAGE</span>' +
            '<span style="font-size:18px;">📜</span>' +
          '</div>' +
          '<h4 style="color:#0f172a;font-size:17px;font-weight:700;margin:0 0 6px 0;">' +
            'Classical Urdu Literature &amp; Rekhta Heritage <span style="color:#16a34a;font-size:14px;direction:rtl;display:inline-block;margin-left:6px;">ریختہ و ادبِ عالیہ</span>' +
          '</h4>' +
          '<p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 12px 0;">' +
            'Curated anthology of Allama Iqbal, Mirza Ghalib, and Mir Taqi Mir. Features line-by-line poetic recitations, line-by-line Urdu/English translations, useful vocabularies, and high-contrast Nastaliq layout.' +
          '</p>' +
          '<div style="margin-bottom:12px;">' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-right:6px;margin-bottom:6px;">Line Recitation</span>' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-right:6px;margin-bottom:6px;">Audio Recitation</span>' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-bottom:6px;">Nastaliq Heritage</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/literature/classical-poetry" target="_blank" style="display:inline-block;background:#16a34a;color:#ffffff;padding:8px 16px;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none;">' +
            'Explore Urdu Poetry Library ↗' +
          '</a>' +
        '</div>' +

        '<!-- CARD 3: KIDS MORAL STORIES -->' +
        '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:18px 20px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">' +
            '<span style="background:#fef3c7;color:#b45309;font-size:11px;font-weight:700;padding:3px 10px;border-radius:9999px;text-transform:uppercase;">PILLAR 3: KIDS SAFE HAVEN</span>' +
            '<span style="font-size:18px;">🦄</span>' +
          '</div>' +
          '<h4 style="color:#0f172a;font-size:17px;font-weight:700;margin:0 0 6px 0;">' +
            'Kids Light World &amp; 2D Animated Moral Stories <span style="color:#d97706;font-size:14px;direction:rtl;display:inline-block;margin-left:6px;">بچوں کی پیاری دنیا</span>' +
          '</h4>' +
          '<p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 12px 0;">' +
            'Wholesome 2D animated bedtime tales, animal adventures, interactive animal sounds, and a recognizable Safety First screen time lock with single-click parent gate.' +
          '</p>' +
          '<div style="margin-bottom:12px;">' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-right:6px;margin-bottom:6px;">2D Animated Tales</span>' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-right:6px;margin-bottom:6px;">Parent Security Lock</span>' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-bottom:6px;">Safety-1st Audio</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/kids/animated-stories" target="_blank" style="display:inline-block;background:#d97706;color:#ffffff;padding:8px 16px;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none;">' +
            'Enter Kids Light World ↗' +
          '</a>' +
        '</div>' +

        '<!-- CARD 4: COGNITIVE MIND GYM -->' +
        '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:18px 20px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">' +
            '<span style="background:#ccfbf1;color:#0f766e;font-size:11px;font-weight:700;padding:3px 10px;border-radius:9999px;text-transform:uppercase;">PILLAR 4: COGNITIVE SKILLS</span>' +
            '<span style="font-size:18px;">🧠</span>' +
          '</div>' +
          '<h4 style="color:#0f172a;font-size:17px;font-weight:700;margin:0 0 6px 0;">' +
            'Interactive Mind Gym &amp; Bilingual Quizzes <span style="color:#0d9488;font-size:14px;direction:rtl;display:inline-block;margin-left:6px;">ذہنی آزمائش اور کوئز</span>' +
          '</h4>' +
          '<p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 12px 0;">' +
            'Cognitive exercises, root-language word pairing, memory match games, daily challenge streaks, and unlockable achievement badges.' +
          '</p>' +
          '<div style="margin-bottom:12px;">' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-right:6px;margin-bottom:6px;">Bilingual Memory Grids</span>' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-right:6px;margin-bottom:6px;">Streak Counter &amp; XP</span>' +
            '<span style="display:inline-block;background:#ffffff;border:1px solid #cbd5e1;color:#475569;font-size:11px;padding:3px 8px;border-radius:6px;margin-bottom:6px;">Icon Badges</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/quizzes/mind-gym" target="_blank" style="display:inline-block;background:#0d9488;color:#ffffff;padding:8px 16px;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none;">' +
            'Play Mind Gym Games ↗' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</div>';

  // 🌟 5. YOUTUBE SHORTS SPOTLIGHT
  if (videoId) {{
    html += 
      '<!-- 🌟 5. YOUTUBE SHORTS SPOTLIGHT -->' +
      '<div style="background:#0f172a;border-radius:20px;padding:26px 20px;margin-bottom:28px;text-align:center;color:#ffffff;box-shadow:0 12px 30px rgba(15,23,42,0.3);">' +
        '<div style="display:inline-block;background:#dc2626;color:#ffffff;font-size:11px;font-weight:800;letter-spacing:1px;padding:4px 14px;border-radius:9999px;text-transform:uppercase;margin-bottom:12px;">' +
          '▶ OFFICIAL YOUTUBE SHORT' +
        '</div>' +
        '<h3 style="color:#ffffff;font-size:17px;font-weight:700;margin:0 0 16px 0;line-height:1.4;">' +
          videoTitle +
        '</h3>' +
        '<div style="max-width:320px;margin:0 auto 18px auto;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.5);border:2px solid #334155;aspect-ratio:9/16;background:#000000;">' +
          '<iframe src="https://www.youtube.com/embed/' + videoId + '?rel=0&modestbranding=1" title="' + videoTitle + '" style="width:100%;height:100%;border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
        '</div>' +
        '<div>' +
          '<a href="' + youtubeChannelUrl + '?sub_confirmation=1" target="_blank" style="display:inline-block;background:#dc2626;color:#ffffff;font-size:13px;font-weight:800;padding:10px 22px;border-radius:9999px;text-decoration:none;box-shadow:0 4px 14px rgba(220,38,38,0.4);">' +
            'Subscribe on YouTube @EntertheWorldofLight ↗' +
          '</a>' +
        '</div>' +
      '</div>';
  }}

  // 🌟 6. OFFICIAL WHATSAPP CHANNEL JOIN CARD
  html += 
    '<!-- 🌟 6. OFFICIAL WHATSAPP CHANNEL JOIN CARD -->' +
    '<div style="background:linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%);border-radius:20px;padding:26px 22px;margin-bottom:28px;text-align:center;color:#ffffff;box-shadow:0 10px 25px rgba(5,150,105,0.25);border:1px solid rgba(255,255,255,0.2);">' +
      '<div style="font-size:26px;margin-bottom:8px;">📢</div>' +
      '<h3 style="color:#ffffff;font-size:19px;font-weight:800;margin:0 0 6px 0;">' +
        'Join Our Official WhatsApp Channel' +
      '</h3>' +
      '<p style="color:#d1fae5;font-size:13px;margin:0 0 16px 0;line-height:1.6;max-width:560px;margin-left:auto;margin-right:auto;">' +
        'Receive daily Urdu lessons, animated videos, bedtime moral stories and interactive learning challenges directly on WhatsApp.' +
      '</p>' +
      '<a href="' + whatsappUrl + '" target="_blank" style="display:inline-block;background:#ffffff;color:#047857;padding:11px 26px;border-radius:9999px;font-size:14px;font-weight:800;text-decoration:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);">' +
        'Follow Official WhatsApp Channel ↗' +
      '</a>' +
    '</div>' +

    '<!-- 🌟 7. PERMANENT UNIVERSAL SHARE BUTTONS (SECTION 7.4 COMPLIANT) -->' +
    '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:20px 18px;margin-bottom:24px;text-align:center;box-shadow:0 4px 14px rgba(0,0,0,0.04);">' +
      '<div style="color:#475569;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px;">' +
        '📢 SHARE THIS GUIDE WITH FRIENDS &amp; FAMILY' +
      '</div>' +
      '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;">' +
        '<a href="https://api.whatsapp.com/send?text=' + encTitle + '%20' + encUrl + '" target="_blank" style="display:inline-block;background:#25D366;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">WhatsApp</a>' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encUrl + '" target="_blank" style="display:inline-block;background:#1877F2;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">Facebook</a>' +
        '<a href="https://www.instagram.com" target="_blank" style="display:inline-block;background:#E4405F;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">Instagram</a>' +
        '<a href="https://pinterest.com/pin/create/button/?url=' + encUrl + '&description=' + encTitle + '" target="_blank" style="display:inline-block;background:#BD081C;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">Pinterest</a>' +
        '<a href="https://www.tiktok.com" target="_blank" style="display:inline-block;background:#000000;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">TikTok</a>' +
        '<a href="https://twitter.com/intent/tweet?text=' + encTitle + '&url=' + encUrl + '" target="_blank" style="display:inline-block;background:#000000;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">Twitter</a>' +
        '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + encUrl + '" target="_blank" style="display:inline-block;background:#0A66C2;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">LinkedIn</a>' +
        '<a href="https://t.me/share/url?url=' + encUrl + '&text=' + encTitle + '" target="_blank" style="display:inline-block;background:#229ED9;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">Telegram</a>' +
        '<a href="https://reddit.com/submit?url=' + encUrl + '&title=' + encTitle + '" target="_blank" style="display:inline-block;background:#FF4500;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">Reddit</a>' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 8. OFFICIAL JOIN US & STAY CONNECTED BUTTONS -->' +
    '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:20px 18px;margin-bottom:24px;text-align:center;box-shadow:0 4px 14px rgba(0,0,0,0.04);">' +
      '<div style="color:#475569;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px;">' +
        '✨ JOIN US &amp; STAY CONNECTED' +
      '</div>' +
      '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;">' +
        '<a href="' + youtubeChannelUrl + '?sub_confirmation=1" target="_blank" style="display:inline-block;background:#ea4335;color:#ffffff;padding:9px 18px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">📺 YouTube Channel</a>' +
        '<a href="' + whatsappUrl + '" target="_blank" style="display:inline-block;background:#059669;color:#ffffff;padding:9px 18px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">💬 WhatsApp Channel</a>' +
        '<a href="' + webAppUrl + '" target="_blank" style="display:inline-block;background:#0284c7;color:#ffffff;padding:9px 18px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">🌐 Web App Portal</a>' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 9. PRIMARY APP LAUNCH CALL-TO-ACTION -->' +
    '<div style="text-align:center;margin-bottom:26px;">' +
      '<a href="' + webAppUrl + '" target="_blank" style="display:inline-block;background:linear-gradient(135deg, #0284c7 0%, #4338ca 100%);color:#ffffff;padding:14px 34px;border-radius:9999px;font-size:15px;font-weight:800;text-decoration:none;box-shadow:0 8px 22px rgba(2,132,199,0.35);letter-spacing:0.5px;">' +
        '🚀 Launch Interactive Web Portal Now' +
      '</a>' +
    '</div>' +

    '<!-- 🌟 10. COMPULSORY RECIPROCAL SISTER BLOG FOOTER (0% PHONE NUMBERS) -->' +
    '<div style="background:#f8fafc;border-top:2px solid #e2e8f0;padding:18px 16px;border-radius:14px;text-align:center;font-size:12px;color:#64748b;line-height:1.7;">' +
      '🌟 <strong>Explore Our Sister Portal:</strong> <a href="' + crossLinkUrl + '" target="_blank" style="color:#0284c7;font-weight:700;text-decoration:none;">' + crossLinkLabel + ' ↗</a>' +
      '<br />' +
      'Published by <strong>Enter the World of Light &amp; Laughter</strong> • 2026 Production Edition • All Rights Reserved.' +
    '</div>' +

    '<!-- 🌟 11. JSON-LD STRUCTURED SCHEMA -->' +
    '<script type="application/ld+json">' +
    JSON.stringify({{
      "@context": "https://schema.org",
      "@type": videoId ? "VideoObject" : "Article",
      "headline": trackTitle,
      "description": trackSubtitle,
      "thumbnailUrl": heroThumbUrl || brandLogoUrl,
      "author": {{
        "@type": "Organization",
        "name": "Enter the World of Light & Laughter",
        "url": MASTER_CONFIG.PRIMARY_BLOG_DOMAIN
      }}
    }}) +
    '</script>' +
    '</div>';

  return html;
}}

/**
 * Secondary Static Page Builder (Permanent Educational Guides for Kids Blog)
 */
function buildStaticPageHtml(options) {{
  options = options || {{}};
  var title = options.title || "Kids Educational Guide & Practical Syllabus";
  var takeaway = options.takeaway || "Practical parenting and student learning tips.";
  var bodyContent = options.bodyContent || "";
  var primaryBlogUrl = MASTER_CONFIG.PRIMARY_BLOG_DOMAIN;
  var webAppUrl = MASTER_CONFIG.API_BASE_URL;
  var brandLogoUrl = MASTER_CONFIG.BRAND_LOGO_URL;
  var whatsappUrl = MASTER_CONFIG.WHATSAPP_CHANNEL_URL;
  var encTitle = encodeURIComponent(title);
  var encUrl = encodeURIComponent(primaryBlogUrl);

  var html = 
    '<div style="background-color:#ffffff !important;color:#0f172a !important;font-family:Arial,sans-serif !important;line-height:1.8;max-width:820px;margin:0 auto;padding:28px 24px;border-radius:24px;box-shadow:0 14px 40px rgba(0,0,0,0.08);border:1px solid #e2e8f0;text-align:left;">' +
    '<!-- STATIC PAGE HEADER -->' +
    '<div style="background:linear-gradient(135deg, #059669 0%, #047857 40%, #065f46 100%);border-radius:22px;padding:26px 20px;margin-bottom:26px;text-align:center;color:#ffffff;box-shadow:0 12px 30px rgba(5,150,105,0.25);">' +
      '<div style="display:inline-block;background:rgba(255,255,255,0.2);padding:5px 18px;border-radius:9999px;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px;">' +
        'PERMANENT CURRICULUM GUIDE • KIDS LIGHT WORLD' +
      '</div>' +
      '<div style="margin-bottom:14px;text-align:center;">' +
        '<img src="' + brandLogoUrl + '" alt="Kids Light World" style="width:90px;height:90px;border-radius:50%;box-shadow:0 8px 22px rgba(0,0,0,0.3);display:block;margin:0 auto;border:3px solid #ffffff;object-fit:cover;" />' +
      '</div>' +
      '<h1 style="color:#ffffff;font-size:24px;font-weight:800;margin:0 0 8px 0;line-height:1.3;">' +
        title +
      '</h1>' +
      '<p style="color:#d1fae5;font-size:14px;margin:0;">' +
        takeaway +
      '</p>' +
    '</div>' +

    '<!-- APP SHOWCASE TABLET HERO -->' +
    '<div style="margin-bottom:24px;text-align:center;">' +
      '<a href="' + primaryBlogUrl + '" target="_blank" style="display:block;text-decoration:none;">' +
        '<img src="' + (MASTER_CONFIG.APP_SHOWCASE_TABLET_URL || MASTER_CONFIG.BRAND_LOGO_URL) + '" alt="Kids Light World Interactive App Suite" style="border-radius:18px;box-shadow:0 10px 26px rgba(0,0,0,0.1);display:block;margin:0 auto;max-height:360px;width:100%;max-width:720px;object-fit:cover;border:2px solid #e2e8f0;" />' +
      '</a>' +
      '<div style="color:#64748b;font-size:12px;margin-top:6px;font-weight:600;">🎨 Official Digital Learning Companion &amp; Practice Canvas</div>' +
    '</div>' +

    '<!-- VALUE-FIRST BODY CONTENT -->' +
    '<div style="margin-bottom:30px;font-size:15px;color:#334155;line-height:1.8;">' +
      bodyContent +
    '</div>' +

    '<!-- COMPULSORY RECIPROCAL LINK BACK TO MAIN PRIMARY HUB -->' +
    '<div style="background:#f0f9ff;border:2px dashed #0284c7;border-radius:18px;padding:22px 20px;margin-bottom:26px;text-align:center;">' +
      '<div style="font-size:24px;margin-bottom:6px;">🌟</div>' +
      '<h4 style="color:#0369a1;font-size:16px;font-weight:800;margin:0 0 8px 0;">' +
        'Access the Complete Interactive App &amp; Classical Literature Hub' +
      '</h4>' +
      '<p style="color:#475569;font-size:13px;line-height:1.6;margin:0 0 16px 0;">' +
        'Practice live stroke tracing on the interactive digital canvas, explore Allama Iqbal &amp; Mirza Ghalib recitations, and test your skills in the bilingual Mind Gym.' +
      '</p>' +
      '<a href="' + primaryBlogUrl + '" target="_blank" style="display:inline-block;background:#0284c7;color:#ffffff;padding:11px 24px;border-radius:9999px;font-size:13px;font-weight:800;text-decoration:none;">' +
        'Visit Main App Hub: Enter the World of Light &amp; Laughter ↗' +
      '</a>' +
    '</div>' +

    '<!-- PERMANENT UNIVERSAL SHARE BUTTONS -->' +
    '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:20px 18px;margin-bottom:24px;text-align:center;">' +
      '<div style="color:#475569;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px;">' +
        '📢 SHARE THIS PERMANENT GUIDE' +
      '</div>' +
      '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;">' +
        '<a href="https://api.whatsapp.com/send?text=' + encTitle + '%20' + encUrl + '" target="_blank" style="display:inline-block;background:#25D366;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">WhatsApp</a>' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encUrl + '" target="_blank" style="display:inline-block;background:#1877F2;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">Facebook</a>' +
        '<a href="https://pinterest.com/pin/create/button/?url=' + encUrl + '&description=' + encTitle + '" target="_blank" style="display:inline-block;background:#BD081C;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">Pinterest</a>' +
        '<a href="https://twitter.com/intent/tweet?text=' + encTitle + '&url=' + encUrl + '" target="_blank" style="display:inline-block;background:#000000;color:#ffffff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">Twitter</a>' +
      '</div>' +
    '</div>' +

    '<!-- FOOTER COPYRIGHT -->' +
    '<div style="border-top:1px solid #e2e8f0;padding-top:16px;text-align:center;font-size:12px;color:#94a3b8;">' +
      'Published by <strong>Kids Light World</strong> • Permanent Static Reference • 0% Personal Phone Numbers.' +
    '</div>' +
    '</div>';

  return html;
}}

/**
 * ============================================================================
 * 7. CORE BLOGGER API PUBLISHER (POSTS VS PAGES SEPARATION)
 * ============================================================================
 */
function publishBloggerItem(blogId, title, content, labels, isPage) {{
  var baseUrl = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + (isPage ? "/pages" : "/posts");
  var token = ScriptApp.getOAuthToken();

  var payload = {{
    title: title,
    content: content
  }};

  if (!isPage && labels && labels.length) {{
    payload.labels = labels;
  }}

  var response = UrlFetchApp.fetch(baseUrl, {{
    method: "POST",
    headers: {{
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }},
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  }});

  var code = response.getResponseCode();
  var resText = response.getContentText();

  if (code >= 200 && code < 300) {{
    var json = JSON.parse(resText);
    Logger.log("🎉 [SUCCESS] " + (isPage ? "Static Page" : "Blog Post") + " published successfully!");
    Logger.log("🆔 ID: " + json.id);
    Logger.log("🔗 URL: " + json.url);
    return json;
  }} else {{
    Logger.log("❌ [BLOGGER ERROR] HTTP " + code + ": " + resText);
    throw new Error("Blogger API Error (" + code + "): " + resText);
  }}
}}

// Backward compatibility alias
function publishItem(blogId, title, content, labels, isPage) {{
  return publishBloggerItem(blogId, title, content, labels, isPage);
}}

/**
 * ============================================================================
 * 8. THE 6 PRIMARY & SECONDARY DAILY SLOTS
 * ============================================================================
 */

// SLOT 1: Primary Blog 1 — Subah (Morning App Feature Post)
function publishPrimarySlot1_MorningPost() {{
  Logger.log("▶️ [SLOT 1] Starting Primary Blog 1 Morning Post (Web App Feature Deep-Dive)...");
  var feature = selectAppFeatureForSlot("morning");
  var blogId = MASTER_CONFIG.PRIMARY_BLOG_ID;

  var title = feature.name + " – Enter the World of Light & Laughter (MORNING 2026 Edition)";
  var subtitle = feature.summary;

  var checkMeta = {{
    featureId: feature.id,
    title: title
  }};

  if (isItemAlreadyPublished(checkMeta, false, blogId)) {{
    Logger.log("🛑 [SLOT 1 SKIPPED] Primary Morning Post already published today. Skipping duplicate.");
    return {{ skipped: true, reason: "Duplicate prevented" }};
  }}

  var html = buildLuxuryArticleHtml({{
    slotName: "morning",
    title: title,
    subtitle: subtitle,
    isKidsTheme: false,
    crossLinkUrl: MASTER_CONFIG.SECONDARY_BLOG_DOMAIN,
    crossLinkLabel: "Explore Kids Light World – Educational Nursery & Phonics Directory"
  }});

  var res = publishBloggerItem(blogId, title, html, ["Web App Hub", "Urdu Tracing", "App Features", "Morning Edition"], false);

  recordPublicationInLedger({{
    slot: "primary_morning",
    slotDate: new Date().toISOString().slice(0, 10),
    resourceType: "POST",
    blogId: blogId,
    featureId: feature.id,
    title: title,
    id: res.id,
    url: res.url
  }});

  return res;
}}

// SLOT 2: Primary Blog 2 — Dopahar (Afternoon Distinct App Pillar Post)
function publishPrimarySlot2_AfternoonPost() {{
  Logger.log("▶️ [SLOT 2] Starting Primary Blog 2 Afternoon Post (Distinct App Pillar)...");
  var feature = selectAppFeatureForSlot("afternoon");
  var blogId = MASTER_CONFIG.PRIMARY_BLOG_ID;

  var title = feature.name + " & Rekhta Heritage – Master Syllabus (AFTERNOON 2026 Edition)";
  var subtitle = feature.summary;

  var checkMeta = {{
    featureId: feature.id,
    title: title
  }};

  if (isItemAlreadyPublished(checkMeta, false, blogId)) {{
    Logger.log("🛑 [SLOT 2 SKIPPED] Primary Afternoon Post already published today. Skipping duplicate.");
    return {{ skipped: true, reason: "Duplicate prevented" }};
  }}

  var html = buildLuxuryArticleHtml({{
    slotName: "afternoon",
    title: title,
    subtitle: subtitle,
    isKidsTheme: false,
    crossLinkUrl: MASTER_CONFIG.SECONDARY_BLOG_DOMAIN,
    crossLinkLabel: "Explore Kids Light World – Educational Nursery & Phonics Directory"
  }});

  var res = publishBloggerItem(blogId, title, html, ["Classical Literature", "Bilingual Education", "App Features", "Afternoon Edition"], false);

  recordPublicationInLedger({{
    slot: "primary_afternoon",
    slotDate: new Date().toISOString().slice(0, 10),
    resourceType: "POST",
    blogId: blogId,
    featureId: feature.id,
    title: title,
    id: res.id,
    url: res.url
  }});

  return res;
}}

// SLOT 3: Primary Blog 3 — Shaam (Evening YouTube Short Deep-Dive Post)
function publishPrimarySlot3_EveningPost() {{
  Logger.log("▶️ [SLOT 3] Starting Primary Blog 3 Evening Post (Chronological YouTube Short Deep-Dive)...");
  var video = selectNextChronologicalShort();
  if (!video) {{
    Logger.log("🛑 [SLOT 3 SKIPPED] No unprocessed shorts found or all shorts already published.");
    return {{ skipped: true, reason: "No unprocessed shorts" }};
  }}

  var blogId = MASTER_CONFIG.PRIMARY_BLOG_ID;
  var cleanHeading = video.title.replace(/#\\w+/g, "").replace(/\\s+/g, " ").trim();
  var title = cleanHeading + " – Enter the World of Light & Laughter (EVENING 2026 Edition)";
  var subtitle = "Official video deep-dive featuring authentic Urdu wisdom, moral teachings, and interactive web application resources.";

  var html = buildLuxuryArticleHtml({{
    slotName: "evening",
    title: title,
    subtitle: subtitle,
    isKidsTheme: false,
    videoId: video.id,
    videoTitle: cleanHeading,
    heroThumbUrl: video.thumbnailUrl,
    crossLinkUrl: MASTER_CONFIG.SECONDARY_BLOG_DOMAIN,
    crossLinkLabel: "View Full Evergreen Kids Syllabus Guide"
  }});

  var res = publishBloggerItem(blogId, title, html, ["YouTube Shorts", "Moral Guidance", "Urdu Wisdom", "Evening Edition"], false);

  recordPublicationInLedger({{
    slot: "primary_evening",
    slotDate: new Date().toISOString().slice(0, 10),
    resourceType: "POST",
    blogId: blogId,
    videoId: video.id,
    sequenceIndex: video.sequenceIndex,
    title: title,
    id: res.id,
    url: res.url
  }});

  return res;
}}

// SLOT 4: Secondary Page 1 — Subah (Morning Permanent Static Page on Kids Blog)
function publishSecondarySlot1_MorningPage() {{
  Logger.log("▶️ [SLOT 4] Starting Secondary Page 1 (Morning Permanent Static Guide on Kids Blog)...");
  var blogId = MASTER_CONFIG.SECONDARY_BLOG_ID;
  var feature = selectAppFeatureForSlot("morning");

  var title = feature.secondaryGuideTitle;
  var takeaway = feature.secondaryGuideTakeaway;

  var checkMeta = {{
    featureId: feature.id + "_GUIDE",
    title: title
  }};

  if (isItemAlreadyPublished(checkMeta, true, blogId)) {{
    Logger.log("🛑 [SLOT 4 SKIPPED] Secondary Morning Page already published. Skipping duplicate.");
    return {{ skipped: true, reason: "Duplicate prevented" }};
  }}

  var bodyContent = 
    '<h3>1. The Golden Rule of Early Urdu Stroke Practice</h3>' +
    '<p>When young learners begin tracing Urdu alphabets like Alif, Bay, and Pay, motor memory develops through deliberate repetition rather than speed. Practice in brief 5 to 7 minute sessions with visual arrows to avoid cognitive fatigue.</p>' +
    '<h3>2. Phonics Sound Pairing</h3>' +
    '<p>Never teach the letter shape in isolation. Pair each stroke with its native sound and a high-frequency everyday object (e.g. ب - بلی - Billi). This anchors visual recognition with auditory reinforcement.</p>' +
    '<h3>3. Interactive Digital Reinforcement</h3>' +
    '<p>Encourage children to trace the stroke on our interactive digital canvas, where instant feedback and star rewards build self-motivation without the frustration of erasing paper mistakes.</p>';

  var html = buildStaticPageHtml({{
    title: title,
    takeaway: takeaway,
    bodyContent: bodyContent
  }});

  var res = publishBloggerItem(blogId, title, html, [], true);

  recordPublicationInLedger({{
    slot: "secondary_morning",
    slotDate: new Date().toISOString().slice(0, 10),
    resourceType: "PAGE",
    blogId: blogId,
    featureId: feature.id + "_GUIDE",
    title: title,
    id: res.id,
    url: res.url
  }});

  return res;
}}

// SLOT 5: Secondary Page 2 — Dopahar (Afternoon Permanent Static Page on Kids Blog)
function publishSecondarySlot2_AfternoonPage() {{
  Logger.log("▶️ [SLOT 5] Starting Secondary Page 2 (Afternoon Permanent Static Guide on Kids Blog)...");
  var blogId = MASTER_CONFIG.SECONDARY_BLOG_ID;
  var feature = selectAppFeatureForSlot("afternoon");

  var title = feature.secondaryGuideTitle;
  var takeaway = feature.secondaryGuideTakeaway;

  var checkMeta = {{
    featureId: feature.id + "_GUIDE",
    title: title
  }};

  if (isItemAlreadyPublished(checkMeta, true, blogId)) {{
    Logger.log("🛑 [SLOT 5 SKIPPED] Secondary Afternoon Page already published. Skipping duplicate.");
    return {{ skipped: true, reason: "Duplicate prevented" }};
  }}

  var bodyContent = 
    '<h3>1. Nurturing Cultural Literacy in Modern Education</h3>' +
    '<p>Introducing classical Urdu literature and poetry to young minds builds rich vocabulary and emotional maturity. Selected couplets from Allama Iqbal teach self-belief, courage, and perseverance in simple, musical language.</p>' +
    '<h3>2. Daily Reflection Prompts</h3>' +
    '<p>Spend 10 minutes at the dining table discussing one simple poetic line. Ask your children what they think the poet felt when writing it, and how they can apply that moral courage at school today.</p>' +
    '<h3>3. Bilingual Memory Drills</h3>' +
    '<p>Reinforce conceptual understanding by exploring bilingual English translations and cognitive root-word quizzes on our web platform.</p>';

  var html = buildStaticPageHtml({{
    title: title,
    takeaway: takeaway,
    bodyContent: bodyContent
  }});

  var res = publishBloggerItem(blogId, title, html, [], true);

  recordPublicationInLedger({{
    slot: "secondary_afternoon",
    slotDate: new Date().toISOString().slice(0, 10),
    resourceType: "PAGE",
    blogId: blogId,
    featureId: feature.id + "_GUIDE",
    title: title,
    id: res.id,
    url: res.url
  }});

  return res;
}}

// SLOT 6: Secondary Page 3 — Shaam (Evening Permanent Static Page on Kids Blog)
function publishSecondarySlot3_EveningPage() {{
  Logger.log("▶️ [SLOT 6] Starting Secondary Page 3 (Evening Permanent Static Guide expanding YouTube Short topic)...");
  var blogId = MASTER_CONFIG.SECONDARY_BLOG_ID;
  var ledger = getPersistentLedger();

  // Find the primary evening post published today to pair with
  var eveningPost = null;
  var todayStr = new Date().toISOString().slice(0, 10);
  for (var i = ledger.length - 1; i >= 0; i--) {{
    if (ledger[i].slot === "primary_evening" && ledger[i].slotDate === todayStr) {{
      eveningPost = ledger[i];
      break;
    }}
  }}

  var topicName = eveningPost ? eveningPost.title.replace("– Enter the World of Light & Laughter (EVENING 2026 Edition)", "").trim() : "Universal Wisdom & Moral Reflection";
  var title = "Family Reflection Guide: " + topicName;
  var takeaway = "Practical takeaways, character discussions, and everyday ethical lessons inspired by today's educational video.";

  var checkMeta = {{
    title: title,
    videoId: eveningPost ? eveningPost.videoId : ""
  }};

  if (isItemAlreadyPublished(checkMeta, true, blogId)) {{
    Logger.log("🛑 [SLOT 6 SKIPPED] Secondary Evening Page already published. Skipping duplicate.");
    return {{ skipped: true, reason: "Duplicate prevented" }};
  }}

  var bodyContent = 
    '<h3>1. Core Life Lesson & Character Building</h3>' +
    '<p>Today&#39;s educational video focuses on: <strong>' + topicName + '</strong>. True education goes beyond memorization—it transforms speech, patience, and how we treat those around us in moments of difficulty.</p>' +
    '<h3>2. Family Discussion Points</h3>' +
    '<ul>' +
      '<li>How can we practice patience and truthfulness in our daily conversations?</li>' +
      '<li>What is the difference between speaking words that help others versus words that cause harm?</li>' +
      '<li>Why is quiet reflection often more powerful than hasty reactions?</li>' +
    '</ul>' +
    '<h3>3. Interactive Learning Next Steps</h3>' +
    '<p>Revisit the full video recitation on YouTube and explore the interactive bilingual activities and moral fables on the official Enter the World of Light &amp; Laughter web portal.</p>';

  var html = buildStaticPageHtml({{
    title: title,
    takeaway: takeaway,
    bodyContent: bodyContent
  }});

  var res = publishBloggerItem(blogId, title, html, [], true);

  recordPublicationInLedger({{
    slot: "secondary_evening",
    slotDate: todayStr,
    resourceType: "PAGE",
    blogId: blogId,
    primaryPairId: eveningPost ? eveningPost.id : null,
    title: title,
    id: res.id,
    url: res.url
  }});

  return res;
}}

/**
 * ============================================================================
 * 9. BACKWARD COMPATIBILITY RUNNER ALIASES
 * ============================================================================
 */
function publishPrimary_1_Post(slotName) {{
  if (slotName === "afternoon") return publishPrimarySlot2_AfternoonPost();
  if (slotName === "evening") return publishPrimarySlot3_EveningPost();
  return publishPrimarySlot1_MorningPost();
}}

function publishPrimary_2_Page(slotName) {{
  return publishSecondarySlot2_AfternoonPage();
}}

function publishSecondary_1_Post(slotName) {{
  if (slotName === "morning") return publishSecondarySlot1_MorningPage();
  if (slotName === "afternoon") return publishSecondarySlot2_AfternoonPage();
  return publishSecondarySlot3_EveningPage();
}}

function publishSecondary_2_Page(slotName) {{
  return publishSecondarySlot3_EveningPage();
}}

function executePrimaryYouTubePost(slotName) {{
  if (slotName === "evening") return publishPrimarySlot3_EveningPost();
  if (slotName === "afternoon") return publishPrimarySlot2_AfternoonPost();
  return publishPrimarySlot1_MorningPost();
}}

function executeSecondaryBloggerPage(slotName) {{
  if (slotName === "evening") return publishSecondarySlot3_EveningPage();
  if (slotName === "afternoon") return publishSecondarySlot2_AfternoonPage();
  return publishSecondarySlot1_MorningPage();
}}

function deleteOldIftttPosts() {{
  Logger.log("ℹ️ [CLEANUP NOTICE] Blogger posts have already been cleared manually by user (0 posts, 0 pages).");
  Logger.log("✨ Cleanup is skipped to protect clean starting state and prevent accidental deletion.");
  return 0;
}}
'''

# ==============================================================================
# 3. CODE.GS CONTENT (CLEAN ORCHESTRATOR & DYNAMIC TIME DISPATCHER)
# ==============================================================================
code_gs_code = '''/**
 * ============================================================================
 * ENTER THE WORLD OF LIGHT & LAUGHTER – APPS SCRIPT MASTER ORCHESTRATOR (Code.gs)
 * ============================================================================
 * Production 2026 Edition: Dynamic Organic Time Dispatcher & UI Controller
 *
 * RESPONSIBILITIES:
 * 1. UI Dropdown Menu (Standalone execution & diagnostic audits)
 * 2. Dynamic Organic Time Dispatcher (Asia/Karachi natural variable windows)
 * 3. 60-120 min paired execution for Secondary Static Pages
 * 4. Safe Trigger Management (Only creates/deletes managed automation triggers)
 * ============================================================================
 */

/**
 * ============================================================================
 * 1. GOOGLE SHEETS / DOCS / FORMS UI MENU (IF BOUND) OR STANDALONE NOTICE
 * ============================================================================
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu("🌟 Marketing Sentinel 2026")
      .addItem("🌅 1. Publish Primary Morning Post (Slot 1)", "runPrimary_Morning_9AM")
      .addItem("📄 2. Publish Secondary Morning Page (Slot 4)", "runSecondary_Morning_9AM")
      .addSeparator()
      .addItem("☀️ 3. Publish Primary Afternoon Post (Slot 2)", "runPrimary_Afternoon_2PM")
      .addItem("📄 4. Publish Secondary Afternoon Page (Slot 5)", "runSecondary_Afternoon_2PM")
      .addSeparator()
      .addItem("🌙 5. Publish Primary Evening Video Post (Slot 3)", "runPrimary_Evening_7PM")
      .addItem("📄 6. Publish Secondary Evening Page (Slot 6)", "runSecondary_Evening_7PM")
      .addSeparator()
      .addItem("🚀 Run Today's Full Sequential Cycle (All 6 Slots)", "runFullDailyPublishingCycle")
      .addSeparator()
      .addItem("⚡ Install Dynamic Daily Triggers (Asia/Karachi)", "setupDynamicDailyTriggers")
      .addItem("🛑 Remove Managed Automation Triggers", "removeAllManagedTriggers")
      .addItem("🩺 Run System Diagnostics & Read-Only Audit", "runSystemDiagnostics")
      .addToUi();
  } catch (e) {
    Logger.log("Standalone Apps Script project - standard execution available via editor function dropdown.");
  }
}

/**
 * ============================================================================
 * 2. FULL SEQUENTIAL CYCLE RUNNER (MANUAL TEST / COMPLETE AUDIT)
 * ============================================================================
 */
function runFullDailyPublishingCycle() {
  Logger.log("==================================================");
  Logger.log("🚀 STARTING TODAY'S FULL 6-SLOT PUBLISHING CYCLE");
  Logger.log("==================================================");

  // 1. Primary Morning Post
  Logger.log("--- SLOT 1: Primary Morning Post ---");
  var r1 = publishPrimarySlot1_MorningPost();

  // 2. Secondary Morning Page (Paired)
  Logger.log("--- SLOT 4: Secondary Morning Page (Paired with Slot 1) ---");
  var r2 = publishSecondarySlot1_MorningPage();

  // 3. Primary Afternoon Post
  Logger.log("--- SLOT 2: Primary Afternoon Post ---");
  var r3 = publishPrimarySlot2_AfternoonPost();

  // 4. Secondary Afternoon Page (Paired)
  Logger.log("--- SLOT 5: Secondary Afternoon Page (Paired with Slot 2) ---");
  var r4 = publishSecondarySlot2_AfternoonPage();

  // 5. Primary Evening Post (Chronological YouTube Short)
  Logger.log("--- SLOT 3: Primary Evening Short Deep-Dive ---");
  var r5 = publishPrimarySlot3_EveningPost();

  // 6. Secondary Evening Page (Paired)
  Logger.log("--- SLOT 6: Secondary Evening Page (Paired with Slot 3) ---");
  var r6 = publishSecondarySlot3_EveningPage();

  Logger.log("==================================================");
  Logger.log("🎉 FULL 6-SLOT CYCLE COMPLETED SUCCESSFULLY!");
  Logger.log("==================================================");
  return { r1: r1, r2: r2, r3: r3, r4: r4, r5: r5, r6: r6 };
}

/**
 * Compatibility trigger aliases
 */
function publishTodayPrimaryPost() {
  return publishPrimarySlot1_MorningPost();
}

function publishTodaySecondaryKidsPost() {
  return publishSecondarySlot1_MorningPage();
}

function triggerMorningSlot() {
  return publishPrimarySlot1_MorningPost();
}

function triggerAfternoonSlot() {
  return publishPrimarySlot2_AfternoonPost();
}

function triggerEveningSlot() {
  return publishPrimarySlot3_EveningPost();
}

/**
 * ============================================================================
 * 3. DYNAMIC ORGANIC TIMING SCHEDULER (ASIA/KARACHI NATURAL TIME WINDOWS)
 * ============================================================================
 * Sets up organic posting times each morning at 5:00 AM PKT:
 * - Morning Post: 9:15 AM - 10:45 AM PKT
 * - Morning Page: 60-120 mins after Morning Post
 * - Afternoon Post: 1:30 PM - 2:45 PM PKT
 * - Afternoon Page: 60-120 mins after Afternoon Post
 * - Evening Post: 6:30 PM - 7:45 PM PKT
 * - Evening Page: 60-120 mins after Evening Post
 */
function dailyMasterDispatcher() {
  Logger.log("🧭 [DISPATCHER] Setting up today's organic variable post times in Asia/Karachi timezone...");

  // Remove previous day's slot-specific one-shot triggers
  var managedSlots = [
    "runPrimary_Morning_9AM", "runSecondary_Morning_9AM",
    "runPrimary_Afternoon_2PM", "runSecondary_Afternoon_2PM",
    "runPrimary_Evening_7PM", "runSecondary_Evening_7PM"
  ];

  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var fn = triggers[i].getHandlerFunction();
    if (managedSlots.indexOf(fn) !== -1) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var date = now.getDate();

  // 1. Morning Primary Post: 9:15 AM to 10:45 AM PKT
  var mHour = 9;
  var mMin = 15 + Math.floor(Math.random() * 70);
  if (mMin >= 60) { mHour += 1; mMin -= 60; }
  var morningPostTime = new Date(year, month, date, mHour, mMin, 0);

  ScriptApp.newTrigger("runPrimary_Morning_9AM")
    .timeBased()
    .at(morningPostTime)
    .inTimezone("Asia/Karachi")
    .create();
  Logger.log("⏰ Morning Primary Post scheduled at: " + mHour + ":" + (mMin < 10 ? "0" : "") + mMin + " PKT");

  // 2. Afternoon Primary Post: 1:30 PM to 2:45 PM PKT (13:30 to 14:45)
  var aHour = 13;
  var aMin = 30 + Math.floor(Math.random() * 60);
  if (aMin >= 60) { aHour += 1; aMin -= 60; }
  var afternoonPostTime = new Date(year, month, date, aHour, aMin, 0);

  ScriptApp.newTrigger("runPrimary_Afternoon_2PM")
    .timeBased()
    .at(afternoonPostTime)
    .inTimezone("Asia/Karachi")
    .create();
  Logger.log("⏰ Afternoon Primary Post scheduled at: " + aHour + ":" + (aMin < 10 ? "0" : "") + aMin + " PKT");

  // 3. Evening Primary Post (YouTube Short): 6:30 PM to 7:45 PM PKT (18:30 to 19:45)
  var eHour = 18;
  var eMin = 30 + Math.floor(Math.random() * 60);
  if (eMin >= 60) { eHour += 1; eMin -= 60; }
  var eveningPostTime = new Date(year, month, date, eHour, eMin, 0);

  ScriptApp.newTrigger("runPrimary_Evening_7PM")
    .timeBased()
    .at(eveningPostTime)
    .inTimezone("Asia/Karachi")
    .create();
  Logger.log("⏰ Evening Primary Short Post scheduled at: " + eHour + ":" + (eMin < 10 ? "0" : "") + eMin + " PKT");

  Logger.log("🎉 Primary dynamic anchors armed for today! Secondary Pages will be dynamically triggered 60-120m after each primary completion.");
}

/**
 * Automatically sets up the natural dynamic scheduler
 */
function setupDynamicDailyTriggers() {
  Logger.log("⚡ [SETUP] Installing Dynamic Organic Daily Triggers...");
  removeAllManagedTriggers();

  // Daily dispatcher trigger runs every morning at 5:00 AM PKT
  ScriptApp.newTrigger("dailyMasterDispatcher")
    .timeBased()
    .atHour(5)
    .nearMinute(0)
    .everyDays(1)
    .inTimezone("Asia/Karachi")
    .create();

  // Run dispatcher immediately to schedule remaining slots for today
  dailyMasterDispatcher();
  Logger.log("🎉 Dynamic Scheduler successfully installed! Har roz natural variable timing par post hoga.");
}

/**
 * Remove only managed automation triggers (safe trigger removal)
 */
function removeAllManagedTriggers() {
  var managedFns = [
    "dailyMasterDispatcher",
    "runPrimary_Morning_9AM", "runSecondary_Morning_9AM",
    "runPrimary_Afternoon_2PM", "runSecondary_Afternoon_2PM",
    "runPrimary_Evening_7PM", "runSecondary_Evening_7PM",
    "publishTodayPrimaryPost", "publishTodaySecondaryKidsPost"
  ];

  var triggers = ScriptApp.getProjectTriggers();
  var removed = 0;
  Logger.log("🛑 Checking " + triggers.length + " project triggers for managed automation tasks...");

  for (var i = 0; i < triggers.length; i++) {
    var fn = triggers[i].getHandlerFunction();
    if (managedFns.indexOf(fn) !== -1) {
      ScriptApp.deleteTrigger(triggers[i]);
      removed++;
      Logger.log("  ✓ Removed managed trigger for: " + fn);
    }
  }

  Logger.log("✅ Managed trigger cleanup complete. Removed " + removed + " triggers.");
}

// Backward compatibility alias
function removeAllTriggers() {
  return removeAllManagedTriggers();
}

function checkActiveTriggersStatus() {
  var triggers = ScriptApp.getProjectTriggers();
  Logger.log("📊 [ACTIVE TRIGGERS COUNT]: " + triggers.length);
  for (var i = 0; i < triggers.length; i++) {
    var t = triggers[i];
    Logger.log("  #" + (i + 1) + " -> Function: " + t.getHandlerFunction() + " | Trigger ID: " + t.getUniqueId());
  }
  return triggers.length;
}

/**
 * ============================================================================
 * 4. SYSTEM DIAGNOSTICS & READ-ONLY BLOG AUDIT
 * ============================================================================
 */
function runSystemDiagnostics() {
  Logger.log("==================================================");
  Logger.log("🩺 RUNNING SYSTEM DIAGNOSTICS & BLOG AUDIT");
  Logger.log("==================================================");

  // 1. Check OAuth Token
  try {
    var token = ScriptApp.getOAuthToken();
    Logger.log("✅ [AUTH] OAuth Token retrieved: " + (token ? "Valid (Length: " + token.length + ")" : "Empty"));
  } catch (e) {
    Logger.log("❌ [AUTH ERROR] Failed to get OAuth Token: " + e.message);
  }

  // 2. Check Primary Blog Access
  try {
    var primaryUrl = "https://www.googleapis.com/blogger/v3/blogs/" + MASTER_CONFIG.PRIMARY_BLOG_ID;
    var res1 = UrlFetchApp.fetch(primaryUrl, {
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      muteHttpExceptions: true
    });
    if (res1.getResponseCode() === 200) {
      var b1 = JSON.parse(res1.getContentText());
      Logger.log("✅ [PRIMARY BLOG CONNECTED]: " + b1.name + " (" + b1.url + ")");
      Logger.log("   Posts Count: " + (b1.posts ? b1.posts.totalItems : 0) + " | Pages Count: " + (b1.pages ? b1.pages.totalItems : 0));
    } else {
      Logger.log("⚠️ [PRIMARY BLOG WARNING] Status " + res1.getResponseCode() + ": " + res1.getContentText());
    }
  } catch (e) {
    Logger.log("❌ [PRIMARY BLOG ERROR]: " + e.message);
  }

  // 3. Check Secondary Kids Blog Access
  try {
    var secUrl = "https://www.googleapis.com/blogger/v3/blogs/" + MASTER_CONFIG.SECONDARY_BLOG_ID;
    var res2 = UrlFetchApp.fetch(secUrl, {
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      muteHttpExceptions: true
    });
    if (res2.getResponseCode() === 200) {
      var b2 = JSON.parse(res2.getContentText());
      Logger.log("✅ [SECONDARY BLOG CONNECTED]: " + b2.name + " (" + b2.url + ")");
      Logger.log("   Posts Count: " + (b2.posts ? b2.posts.totalItems : 0) + " | Pages Count: " + (b2.pages ? b2.pages.totalItems : 0));
    } else {
      Logger.log("⚠️ [SECONDARY BLOG WARNING] Status " + res2.getResponseCode() + ": " + res2.getContentText());
    }
  } catch (e) {
    Logger.log("❌ [SECONDARY BLOG ERROR]: " + e.message);
  }

  // 4. Check Persistent Ledger
  var ledger = getPersistentLedger();
  Logger.log("💾 [PERSISTENT LEDGER]: " + ledger.length + " historical records stored in ScriptProperties.");

  // 5. Check Active Triggers
  checkActiveTriggersStatus();

  Logger.log("==================================================");
  Logger.log("🎉 DIAGNOSTICS COMPLETE");
  Logger.log("==================================================");
}
'''

# ==============================================================================
# 4. RUNNER FILES CONTENT (SUBAH, DOPAHAR, SHAAM - PRIMARY & SECONDARY)
# ==============================================================================
runner_files = {
    "Primary_Morning_9AM.gs": '''/**
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
''',

    "Primary_Afternoon_2PM.gs": '''/**
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
''',

    "Primary_Evening_7PM.gs": '''/**
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
''',

    "Secondary_Morning_9AM.gs": '''/**
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
''',

    "Secondary_Afternoon_2PM.gs": '''/**
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
''',

    "Secondary_Evening_7PM.gs": '''/**
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
'''
}

# 5. Write all files to apps-script/
with open("apps-script/Master Controller.gs", "w", encoding="utf-8") as f:
    f.write(master_controller_code)
print("✅ Saved apps-script/Master Controller.gs")

with open("apps-script/Code.gs", "w", encoding="utf-8") as f:
    f.write(code_gs_code)
print("✅ Saved apps-script/Code.gs")

for fname, content in runner_files.items():
    with open("apps-script/" + fname, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Saved apps-script/{fname}")

# 6. Syntax validation with Node.js
all_passed = True
for fpath in ["apps-script/Master Controller.gs", "apps-script/Code.gs"] + ["apps-script/" + k for k in runner_files.keys()]:
    temp_js = "temp_check.js"
    shutil.copyfile(fpath, temp_js)
    res = subprocess.run(["node", "--check", temp_js], capture_output=True, text=True)
    if os.path.exists(temp_js):
        os.remove(temp_js)
    if res.returncode == 0:
        print(f"  ✓ Syntax check passed: {fpath}")
    else:
        print(f"  ❌ Syntax check failed: {fpath}\n{res.stderr}")
        all_passed = False

if all_passed:
    print("\n🎉 ALL 8 FILES GENERATED AND PASSED NODE.JS SYNTAX VALIDATION WITH ZERO ERRORS!")
else:
    print("\n❌ SOME FILES FAILED SYNTAX VALIDATION.")
