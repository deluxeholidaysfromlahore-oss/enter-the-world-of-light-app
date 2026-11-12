import os

# ==============================================================================
# 1. MASTER CONTROLLER.GS
# ==============================================================================
master_controller_code = r'''/**
 * ============================================================================
 * ENTER THE WORLD OF LIGHT & LAUGHTER
 * MASTER CONTROLLER ENGINE (Master Controller.gs)
 * ============================================================================
 * Role: Coordinates AI Studio Web App + YouTube Shorts + Google Blogger API.
 * Autonomous publishing engine for Posts and Static Pages across 4 content tracks.
 *
 * NOTE: Google Apps Script combines all .gs files in the project into one global
 * scope. This file declares MASTER_CONFIG using 'var' to prevent redeclaration errors.
 * ============================================================================
 */

// ⚙️ MASTER CONFIGURATION (Autonomous Sentinel)
var MASTER_CONFIG = {
  // 1. Google Blogger IDs
  PRIMARY_BLOG_ID: "5550406854147347257",      // Main Web App Hub (Posts & Pages)
  SECONDARY_BLOG_ID: "3870971020533851761",    // Kids Mode & YouTube Shorts Hub

  // 2. Official Social & Community Endpoints (Strict WhatsApp Channel Compliance)
  WHATSAPP_CHANNEL_URL: "https://whatsapp.com/channel/0029VasZV4a60eBd8TwfTg1f",
  YOUTUBE_CHANNEL_ID: "UCvCzFP5EPsV4Vp6l6GGuvyg",
  YOUTUBE_HANDLE: "@EntertheWorldofLight",
  YOUTUBE_URL: "https://www.youtube.com/@EntertheWorldofLight",

  // 3. Web App Production URLs
  API_BASE_URL: "https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",
  SHARED_APP_URL: "https://ais-pre-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app",

  // 4. Primary Blog Live Web Domain (for Canonical Cross-Linking)
  PRIMARY_BLOG_DOMAIN: "https://entertheworldoflightandlaughter.blogspot.com",
  SECONDARY_BLOG_DOMAIN: "https://www.blogger.com/blog/pages/3870971020533851761",

  // 5. Verified Working YouTube Video IDs (100% public, HTTP 200 thumbnails)
  CURATED_YOUTUBE_VIDEOS: [
    {
      id: "z3PGTXQW7yU",
      title: "Interactive Urdu Alphabet & Tracing Adventure",
      category: "Kids Phonics"
    },
    {
      id: "f5w_QoR0D2I",
      title: "Classical Urdu Literature & Moral Wisdom",
      category: "Urdu Adab"
    }
  ],

  // 6. Anti-Spam Safety: Minimum 3.5 hours spacing between automated posts
  MIN_POST_SPACING_HOURS: 3.5,
  TIMEZONE: "Asia/Karachi"
};

// Safe alias so legacy calls referencing CONFIG will work without syntax error
var CONFIG = MASTER_CONFIG;

/**
 * ============================================================================
 * LUXURY TEMPLATE BUILDER: Web App Themed Responsive Article
 * ============================================================================
 * Generates rich HTML that matches the Web App UI:
 * - Radiant Brand Header with sunburst emblem
 * - Valid YouTube CDN Featured Image (100% public HTTP 200 OK for Blogger thumbnails)
 * - 4 App-Themed Feature Option Cards (Urdu Tracing, Classical Adab, Kids World, Mind Gym)
 * - Embedded Responsive 9:16 YouTube Short Player
 * - Verified Official WhatsApp Channel Card (Strictly channel link, NO phone number)
 * - Live App Launch Action CTA Button
 * - JSON-LD Structured SEO Schema
 */
function buildLuxuryArticleHtml(options) {
  var isKidsTheme = options.isKidsTheme || false;
  var trackTitle = options.title || 'Interactive Bilingual Learning & Urdu Haroof Tracing';
  var trackSubtitle = options.subtitle || 'Modern web portal for bilingual education, classical literature and child-safe moral stories.';
  var videoId = options.videoId || MASTER_CONFIG.CURATED_YOUTUBE_VIDEOS[0].id;
  var videoTitle = options.videoTitle || 'Enter the World of Light & Laughter Video Feature';
  var crossLinkUrl = options.crossLinkUrl || MASTER_CONFIG.PRIMARY_BLOG_DOMAIN;
  var crossLinkLabel = options.crossLinkLabel || 'Visit Evergreen Syllabus Guide';
  var slotLabel = (options.slotName || 'DAILY').toUpperCase();
  var heroThumbUrl = 'https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
  var webAppUrl = MASTER_CONFIG.API_BASE_URL;
  var whatsappUrl = MASTER_CONFIG.WHATSAPP_CHANNEL_URL;

  // Header Gradient Theme (Brand Blue or Joyful Amber)
  var headerBg = isKidsTheme
    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 40%, #ea580c 100%)'
    : 'linear-gradient(135deg, #0284c7 0%, #0369a1 40%, #1e3a8a 100%)';
  var themePillText = isKidsTheme ? 'KIDS LIGHT WORLD 🦄' : 'OFFICIAL APP HUB 🌟';
  var taglineUrdu = isKidsTheme
    ? 'بچوں کی پیاری دنیا، اخلاقی کہانیاں اور ہنستی مسکراتی تعلیم'
    : 'تعلیم، تفریح، کلاسیکی ادب اور اخلاقی تربیت کا روشن جہان';

  // 100% Native Inline Brand Logo SVG (Derived directly from BrandLogo.tsx - Never blocks, zero CDN dependencies)
  var brandLogoSvg = 
    '<div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 22px; background: linear-gradient(135deg, #0284c7, #38bdf8, #fde047); padding: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.25); border: 2px solid rgba(255,255,255,0.4); margin-bottom: 12px;">' +
      '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; display: block;">' +
        '<circle cx="50" cy="50" r="32" fill="#FDE047" />' +
        '<circle cx="50" cy="50" r="28" fill="#F59E0B" />' +
        '<circle cx="50" cy="50" r="24" fill="#FBBF24" />' +
        '<g stroke="#FDE047" stroke-width="4.5" stroke-linecap="round" opacity="0.95">' +
          '<line x1="50" y1="8" x2="50" y2="16" />' +
          '<line x1="50" y1="84" x2="50" y2="92" />' +
          '<line x1="8" y1="50" x2="16" y2="50" />' +
          '<line x1="84" y1="50" x2="92" y2="50" />' +
          '<line x1="20" y1="20" x2="26" y2="26" />' +
          '<line x1="74" y1="74" x2="80" y2="80" />' +
          '<line x1="20" y1="80" x2="26" y2="74" />' +
          '<line x1="74" y1="26" x2="80" y2="20" />' +
        '</g>' +
        '<path d="M26 62C34 54 44 55 50 60C56 55 66 54 74 62C67 72 57 71 50 67C43 71 33 72 26 62Z" fill="#FFFFFF" opacity="0.98" />' +
        '<path d="M38 48C42 54 58 54 62 48" stroke="#0F172A" stroke-width="3.5" stroke-linecap="round" />' +
        '<circle cx="50" cy="34" r="3.5" fill="#FFFFFF" />' +
        '<circle cx="36" cy="40" r="2" fill="#FFFFFF" />' +
        '<circle cx="64" cy="40" r="2" fill="#FFFFFF" />' +
      '</svg>' +
    '</div>';

  return '<div style="background-color: #ffffff !important; color: #0f172a !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; line-height: 1.8; max-width: 820px; margin: 0 auto; padding: 28px 24px; border-radius: 24px; box-shadow: 0 14px 40px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; text-align: left;">' +
    '<!-- 🌟 1. NATIVE BRAND BANNER (With Authentic Logo & Typography) -->' +
    '<div style="background: ' + headerBg + '; border-radius: 22px; padding: 30px 20px; margin-bottom: 26px; text-align: center; color: #ffffff; box-shadow: 0 12px 30px rgba(2,132,199,0.25); border: 1px solid rgba(255,255,255,0.2);">' +
      brandLogoSvg +
      '<div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 5px 16px; border-radius: 9999px; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.35);">' +
        themePillText + ' • ' + slotLabel + ' 2026' +
      '</div>' +
      '<h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 900; letter-spacing: -0.5px; line-height: 1.3; color: #ffffff;">' +
        'Enter the World of <span style="color: #38bdf8;">Light</span> <span style="color: #fde047;">&amp;</span> <span style="color: #fbbf24;">Laughter</span>' +
      '</h1>' +
      '<p style="margin: 0 0 6px 0; font-size: 14px; color: #f8fafc; opacity: 0.95; font-weight: 600;">' +
        'Interactive Bilingual Education • Classical Urdu Adab • Child-Safe Wonder' +
      '</p>' +
      '<div style="font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif; font-size: 16px; color: #fde047; direction: rtl; margin-top: 6px;">' +
        taglineUrdu +
      '</div>' +
    '</div>' +

    '<!-- 🌟 2. FEATURED HERO APP SHOWCASE (High-Resolution App Preview) -->' +
    '<div style="background: linear-gradient(135deg, #f8fafc, #f1f5f9); border: 2px solid #e2e8f0; border-radius: 20px; padding: 18px; margin-bottom: 26px; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.06);">' +
      '<div style="position: relative; max-width: 740px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.15); border: 2px solid #ffffff;">' +
        '<a href="' + webAppUrl + '" target="_blank" style="display: block; position: relative; text-decoration: none;">' +
          '<img src="' + heroThumbUrl + '" alt="' + trackTitle + '" style="width: 100%; height: auto; max-height: 400px; object-fit: cover; display: block;" />' +
          '<div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.92) 100%); padding: 20px 18px 14px 18px; color: #ffffff; text-align: left;">' +
            '<div style="display: inline-block; background: #0284c7; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; margin-bottom: 6px;">LIVE INTERACTIVE WEB APP</div>' +
            '<div style="font-size: 16px; font-weight: 800; color: #ffffff;">Click to Launch Live Interactive Experience ➔</div>' +
          '</div>' +
        '</a>' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 3. ARTICLE TITLE & EXECUTIVE SUMMARY -->' +
    '<div style="margin-bottom: 28px;">' +
      '<h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 10px 0; line-height: 1.35;">' +
        trackTitle +
      '</h2>' +
      '<p style="font-size: 15px; color: #475569; margin: 0 0 16px 0; line-height: 1.7;">' +
        trackSubtitle +
      '</p>' +
      '<div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 14px 18px; border-radius: 0 14px 14px 0; font-size: 14px; color: #334155; line-height: 1.7;">' +
        '💡 <strong>Platform Overview:</strong> Enter the World of Light &amp; Laughter unites interactive browser technology with South Asian literary heritage. From guided Urdu stroke tracing and bilingual vocabulary drills to classical Allama Iqbal poetry recitations and child-safe moral fables, explore an educational ecosystem designed for young learners, students, and culture enthusiasts.' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 4. THE 4 APP-THEMED FEATURE OPTION CARDS (Matching Web App UI) -->' +
    '<div style="margin-bottom: 32px;">' +
      '<div style="font-size: 20px; font-weight: 900; color: #0f172a; margin-bottom: 18px; display: flex; align-items: center; gap: 10px;">' +
        '<span style="font-size: 24px;">⚡</span> <span>Explore 4 Core Interactive Pillars</span>' +
      '</div>' +
      '<div style="display: grid; grid-template-columns: 1fr; gap: 18px;">' +

        '<!-- CARD 1: URDU TRACING (Indigo Theme) -->' +
        '<div style="background: linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%); border: 2px solid #c7d2fe; border-radius: 18px; padding: 22px; box-shadow: 0 8px 24px rgba(99,102,241,0.08);">' +
          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">' +
            '<div style="display: inline-block; background: linear-gradient(135deg, #6366f1, #4f46e5); color: #ffffff; padding: 5px 14px; border-radius: 9999px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">' +
              'Pillar 1: Interactive Practice' +
            '</div>' +
            '<span style="font-size: 26px;">✏️</span>' +
          '</div>' +
          '<h3 style="margin: 0 0 6px 0; font-size: 19px; font-weight: 800; color: #1e1b4b;">' +
            'Urdu Haroof-e-Tahajji &amp; Tracing Canvas (حروف تہجی ٹریسنگ کینوس)' +
          '</h3>' +
          '<div style="font-family: 'Noto Nastaliq Urdu', serif; font-size: 20px; color: #4338ca; direction: rtl; margin: 8px 0 10px 0; background: #ffffff; padding: 8px 14px; border-radius: 10px; border: 1px solid #e0e7ff; text-align: center;">' +
            'ا ب پ ت ٹ ث ج چ ح خ' +
          '</div>' +
          '<p style="margin: 0 0 14px 0; font-size: 13px; color: #475569; line-height: 1.6;">' +
            'Full interactive stroke-order tracing canvas for all 38 Urdu alphabets. Includes guided arrow animations, real-time stroke validation, native phonetics audio, and reward stars.' +
          '</p>' +
          '<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px;">' +
            '<span style="background: #e0e7ff; color: #3730a3; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">✏️ Haptic Stroke Order</span>' +
            '<span style="background: #e0e7ff; color: #3730a3; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">🔊 Native Audio</span>' +
            '<span style="background: #e0e7ff; color: #3730a3; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">⭐ Star XP Points</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/#practice" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #4f46e5, #4338ca); color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 800; padding: 10px 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(79,70,229,0.35);">' +
            'Launch Tracing Canvas ➔' +
          '</a>' +
        '</div>' +

        '<!-- CARD 2: CLASSICAL URDU ADAB (Sapphire Theme) -->' +
        '<div style="background: linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%); border: 2px solid #bae6fd; border-radius: 18px; padding: 22px; box-shadow: 0 8px 24px rgba(2,132,199,0.08);">' +
          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">' +
            '<div style="display: inline-block; background: linear-gradient(135deg, #0284c7, #0369a1); color: #ffffff; padding: 5px 14px; border-radius: 9999px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">' +
              'Pillar 2: Rekhta Heritage' +
            '</div>' +
            '<span style="font-size: 26px;">📚</span>' +
          '</div>' +
          '<h3 style="margin: 0 0 6px 0; font-size: 19px; font-weight: 800; color: #082f49;">' +
            'Classical Urdu Literature &amp; Rekhta Heritage (اقبال، غالب و فیض)' +
          '</h3>' +
          '<div style="font-family: 'Noto Nastaliq Urdu', serif; font-size: 17px; color: #0c4a6e; direction: rtl; margin: 8px 0 10px 0; background: #ffffff; padding: 10px 14px; border-radius: 10px; border-right: 4px solid #0284c7; line-height: 2;">' +
            'خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے<br/>خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے' +
          '</div>' +
          '<p style="margin: 0 0 14px 0; font-size: 13px; color: #475569; line-height: 1.6;">' +
            'Curated anthology of Allama Iqbal, Mirza Ghalib, and Faiz Ahmad Faiz. Features line-by-line Tashreeh, literal English translations, audio recitations, and high-contrast Nastaliq reader.' +
          '</p>' +
          '<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px;">' +
            '<span style="background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">📖 Line Tashreeh</span>' +
            '<span style="background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">🎙️ Audio Recitation</span>' +
            '<span style="background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">🏛️ Rekhta Heritage</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/#poetry" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #0284c7, #0369a1); color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 800; padding: 10px 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(2,132,199,0.35);">' +
            'Explore Urdu Poetry Reader ➔' +
          '</a>' +
        '</div>' +

        '<!-- CARD 3: KIDS LIGHT WORLD (Amber Theme) -->' +
        '<div style="background: linear-gradient(180deg, #ffffff 0%, #fffbeb 100%); border: 2px solid #fde68a; border-radius: 18px; padding: 22px; box-shadow: 0 8px 24px rgba(245,158,11,0.08);">' +
          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">' +
            '<div style="display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: #ffffff; padding: 5px 14px; border-radius: 9999px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">' +
              'Pillar 3: Kids Wonder' +
            '</div>' +
            '<span style="font-size: 26px;">🦄</span>' +
          '</div>' +
          '<h3 style="margin: 0 0 6px 0; font-size: 19px; font-weight: 800; color: #78350f;">' +
            'Kids Light World &amp; 3D Animated Moral Stories (بچوں کی پیاری دنیا)' +
          '</h3>' +
          '<div style="font-family: 'Noto Nastaliq Urdu', serif; font-size: 17px; color: #92400e; direction: rtl; margin: 8px 0 10px 0; background: #ffffff; padding: 8px 14px; border-radius: 10px; border: 1px solid #fef3c7; text-align: center;">' +
            'سچائی، ہمدردی، بہادری اور والدین کی عزت کی پیاری کہانیاں' +
          '</div>' +
          '<p style="margin: 0 0 14px 0; font-size: 13px; color: #475569; line-height: 1.6;">' +
            'Wholesome 3D animated bedtime tales, animal adventures, interactive animal sounds, and AI companion Sunny. Zero unfiltered web content with single-click parent gate.' +
          '</p>' +
          '<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px;">' +
            '<span style="background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">🧸 3D Animated Fables</span>' +
            '<span style="background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">🔒 Parent Security Lock</span>' +
            '<span style="background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">🤖 Sunny AI Guide</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/#kids" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 800; padding: 10px 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(245,158,11,0.35);">' +
            'Enter Kids Light World ➔' +
          '</a>' +
        '</div>' +

        '<!-- CARD 4: INTERACTIVE MIND GYM (Emerald Theme) -->' +
        '<div style="background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%); border: 2px solid #bbf7d0; border-radius: 18px; padding: 22px; box-shadow: 0 8px 24px rgba(16,185,129,0.08);">' +
          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">' +
            '<div style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; padding: 5px 14px; border-radius: 9999px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">' +
              'Pillar 4: Cognitive Skills' +
            '</div>' +
            '<span style="font-size: 26px;">🧠</span>' +
          '</div>' +
          '<h3 style="margin: 0 0 6px 0; font-size: 19px; font-weight: 800; color: #064e3b;">' +
            'Interactive Mind Gym &amp; Bilingual Quizzes (ذہنی آزمائش اور کوئز)' +
          '</h3>' +
          '<div style="font-family: 'Noto Nastaliq Urdu', serif; font-size: 17px; color: #065f46; direction: rtl; margin: 8px 0 10px 0; background: #ffffff; padding: 8px 14px; border-radius: 10px; border: 1px solid #dcfce7; text-align: center;">' +
            'الفاظ کا ذخیرہ، یادداشت کے کھیل اور روزانہ کے چیلنجز' +
          '</div>' +
          '<p style="margin: 0 0 14px 0; font-size: 13px; color: #475569; line-height: 1.6;">' +
            'Cognitive exercises, dual-language word pairing, memory match games, daily challenge streaks, and unlockable achievement medals.' +
          '</p>' +
          '<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px;">' +
            '<span style="background: #dcfce7; color: #065f46; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">🧩 Bilingual Memory Drills</span>' +
            '<span style="background: #dcfce7; color: #065f46; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">⚡ Streak Counter &amp; XP</span>' +
            '<span style="background: #dcfce7; color: #065f46; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">🏅 Level Badges</span>' +
          '</div>' +
          '<a href="' + webAppUrl + '/#play" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 800; padding: 10px 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(16,185,129,0.35);">' +
            'Play Mind Gym Quizzes ➔' +
          '</a>' +
        '</div>' +

      '</div>' +
    '</div>' +

    '<!-- 🌟 5. EMBEDDED 9:16 RESPONSIVE YOUTUBE SHORT PLAYER -->' +
    '<div style="background: #0f172a; border-radius: 20px; padding: 24px 16px; margin-bottom: 26px; text-align: center; color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">' +
      '<div style="display: inline-block; background: #ef4444; color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">' +
        '🎬 OFFICIAL YOUTUBE SHORT' +
      '</div>' +
      '<h4 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 700; color: #f8fafc;">' +
        videoTitle +
      '</h4>' +
      '<div style="max-width: 320px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); aspect-ratio: 9/16; background: #000000;">' +
        '<iframe src="https://www.youtube.com/embed/' + videoId + '?rel=0&modestbranding=1" title="' + videoTitle + '" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
      '</div>' +
      '<div style="margin-top: 14px;">' +
        '<a href="https://www.youtube.com/' + MASTER_CONFIG.YOUTUBE_HANDLE + '?sub_confirmation=1" target="_blank" style="display: inline-block; background: #ef4444; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; padding: 8px 18px; border-radius: 8px;">' +
          'Subscribe on YouTube (' + MASTER_CONFIG.YOUTUBE_HANDLE + ') ↗' +
        '</a>' +
      '</div>' +
    '</div>' +

    '<!-- 🌟 6. OFFICIAL WHATSAPP CHANNEL JOIN CARD (Strict Channel Compliance) -->' +
    '<div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); border-radius: 18px; padding: 22px 20px; margin-bottom: 26px; color: #ffffff; text-align: center; box-shadow: 0 8px 24px rgba(5,150,105,0.2);">' +
      '<div style="font-size: 28px; margin-bottom: 8px;">📢</div>' +
      '<h4 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 800; color: #ffffff;">' +
        'Join Our Official WhatsApp Channel' +
      '</h4>' +
      '<p style="margin: 0 0 14px 0; font-size: 13px; color: #ecfdf5; opacity: 0.95;">' +
        'Receive daily Urdu lessons, animated videos, bedtime moral stories and interactive learning challenges directly on WhatsApp.' +
      '</p>' +
      '<a href="' + whatsappUrl + '" target="_blank" style="display: inline-block; background: #ffffff; color: #047857; text-decoration: none; font-size: 13px; font-weight: 800; padding: 10px 22px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">' +
        'Follow Official WhatsApp Channel ↗' +
      '</a>' +
    '</div>' +

    '<!-- 🌟 7. PRIMARY APP LAUNCH CALL-TO-ACTION -->' +
    '<div style="text-align: center; margin-bottom: 24px;">' +
      '<a href="' + webAppUrl + '" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #0284c7 0%, #4338ca 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 800; padding: 14px 32px; border-radius: 12px; box-shadow: 0 6px 20px rgba(2,132,199,0.35); letter-spacing: 0.5px;">' +
        '🚀 Launch Interactive Web Portal Now' +
      '</a>' +
    '</div>' +

    '<!-- 🌟 8. CANONICAL CROSS-LINK FOOTER -->' +
    '<div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center; font-size: 12px; color: #64748b;">' +
      'Related Resource: <a href="' + crossLinkUrl + '" style="color: #0284c7; text-decoration: none; font-weight: 600;">' + crossLinkLabel + '</a> | ' +
      'Published by <strong>Enter the World of Light &amp; Laughter</strong> • © 2026' +
    '</div>' +

    '<!-- 🌟 9. JSON-LD STRUCTURED SCHEMA FOR GOOGLE RICH RESULTS -->' +
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalArticle',
      'headline': trackTitle,
      'description': trackSubtitle,
      'image': heroThumbUrl,
      'author': {
        '@type': 'Organization',
        'name': 'Enter the World of Light & Laughter',
        'url': webAppUrl
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Enter the World of Light & Laughter',
        'logo': {
          '@type': 'ImageObject',
          'url': heroThumbUrl
        }
      },
      'educationalUse': 'Interactive Bilingual Tracing & Urdu Adab',
      'inLanguage': ['en', 'ur'],
      'audience': {
        '@type': 'EducationalAudience',
        'educationalRole': 'student'
      }
    }) +
    '</script>' +
  '</div>';
}

/**
 * ============================================================================
 * BLOGGER API PUBLISHING ENGINE
 * ============================================================================
 */
function publishItem(blogId, title, content, labels, isPage) {
  var baseUrl = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + (isPage ? "/pages" : "/posts");
  var token = ScriptApp.getOAuthToken();
  var payload = {
    title: title,
    content: content
  };
  if (!isPage && labels && labels.length) {
    payload.labels = labels;
  }

  var response = UrlFetchApp.fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  var code = response.getResponseCode();
  var resText = response.getContentText();

  if (code >= 200 && code < 300) {
    var json = JSON.parse(resText);
    Logger.log("🎉 [SUCCESS] Item published successfully!");
    Logger.log("🆔 ID: " + json.id);
    Logger.log("🔗 URL: " + json.url);
    return json;
  } else {
    Logger.log("❌ [BLOGGER ERROR] HTTP " + code + ": " + resText);
    throw new Error("Blogger API Error (" + code + "): " + resText);
  }
}

/**
 * ============================================================================
 * 4 CONTENT TRACK PUBLISHERS (Invoked by Triggers or Menu)
 * ============================================================================
 */

// TRACK 1: Primary 1 (App Hub Post)
function publishPrimary_1_Post(slotName) {
  slotName = slotName || "morning";
  Logger.log("▶️ [TRACK 1] Publishing Primary 1 (App Hub Post) for slot: " + slotName);

  var video = MASTER_CONFIG.CURATED_YOUTUBE_VIDEOS[0];
  var title = "Interactive Bilingual Learning & Urdu Haroof Tracing Engine – Enter the World of Light & Laughter (" + slotName.toUpperCase() + " 2026 Edition)";
  var subtitle = "Master Urdu Haroof-e-Tahajji tracing, classical poetry recitations, child-safe moral stories and bilingual memory games.";

  var html = buildLuxuryArticleHtml({
    slotName: slotName,
    title: title,
    subtitle: subtitle,
    isKidsTheme: false,
    videoId: video.id,
    videoTitle: video.title,
    crossLinkUrl: MASTER_CONFIG.PRIMARY_BLOG_DOMAIN,
    crossLinkLabel: "View Full Evergreen Syllabus Guide"
  });

  return publishItem(
    MASTER_CONFIG.PRIMARY_BLOG_ID,
    title,
    html,
    ["Web App Hub", "Urdu Tracing", "Bilingual Education", "App Features", "Google 2026"],
    false
  );
}

// TRACK 2: Primary 2 (App Evergreen Syllabus Static Page)
function publishPrimary_2_Page(slotName) {
  slotName = slotName || "afternoon";
  Logger.log("▶️ [TRACK 2] Publishing Primary 2 (Evergreen Page) for slot: " + slotName);

  var video = MASTER_CONFIG.CURATED_YOUTUBE_VIDEOS[1];
  var title = "Complete Interactive Urdu Curriculum & Bilingual Pillar Guide – Enter the World of Light & Laughter";
  var subtitle = "Permanent resource index covering Urdu phonetics, Rekhta heritage, interactive tracing sheets and brain exercises.";

  var html = buildLuxuryArticleHtml({
    slotName: slotName,
    title: title,
    subtitle: subtitle,
    isKidsTheme: false,
    videoId: video.id,
    videoTitle: video.title,
    crossLinkUrl: MASTER_CONFIG.PRIMARY_BLOG_DOMAIN,
    crossLinkLabel: "Read Today's Featured Article"
  });

  return publishItem(
    MASTER_CONFIG.PRIMARY_BLOG_ID,
    title,
    html,
    [],
    true
  );
}

// TRACK 3: Secondary 1 (Kids Mode Shorts Post)
function publishSecondary_1_Post(slotName) {
  slotName = slotName || "evening";
  Logger.log("▶️ [TRACK 3] Publishing Secondary 1 (Kids Post) for slot: " + slotName);

  var video = MASTER_CONFIG.CURATED_YOUTUBE_VIDEOS[0];
  var title = "Kids Light World: Joyful Urdu Letters, Animal Adventures & Moral Bedtime Fables (" + slotName.toUpperCase() + " Edition)";
  var subtitle = "Chunky, joyful, non-violent early learning experience with Sunny AI guide and interactive rewards.";

  var html = buildLuxuryArticleHtml({
    slotName: slotName,
    title: title,
    subtitle: subtitle,
    isKidsTheme: true,
    videoId: video.id,
    videoTitle: video.title,
    crossLinkUrl: MASTER_CONFIG.SECONDARY_BLOG_DOMAIN,
    crossLinkLabel: "Explore Kids Mode Resource Hub"
  });

  return publishItem(
    MASTER_CONFIG.SECONDARY_BLOG_ID,
    title,
    html,
    ["Kids Light World", "Urdu Letters", "Moral Stories", "Sunny AI", "Kids Fun"],
    false
  );
}

// TRACK 4: Secondary 2 (Kids Evergreen Static Page)
function publishSecondary_2_Page(slotName) {
  slotName = slotName || "evening";
  Logger.log("▶️ [TRACK 4] Publishing Secondary 2 (Kids Evergreen Page) for slot: " + slotName);

  var video = MASTER_CONFIG.CURATED_YOUTUBE_VIDEOS[0];
  var title = "Kids Early Learning Portal & Urdu Nursery Rhymes Index – Official Resource Page";
  var subtitle = "Permanent curriculum sheet for parents and early learners: Haroof tracing, number counting and moral lessons.";

  var html = buildLuxuryArticleHtml({
    slotName: slotName,
    title: title,
    subtitle: subtitle,
    isKidsTheme: true,
    videoId: video.id,
    videoTitle: video.title,
    crossLinkUrl: MASTER_CONFIG.PRIMARY_BLOG_DOMAIN,
    crossLinkLabel: "Back to Main App Portal"
  });

  return publishItem(
    MASTER_CONFIG.SECONDARY_BLOG_ID,
    title,
    html,
    [],
    true
  );
}

/**
 * ============================================================================
 * COMPATIBILITY DISPATCHERS (For slot files Primary_*.gs & Secondary_*.gs)
 * ============================================================================
 */
function executePrimaryYouTubePost(slotName) {
  return publishPrimary_1_Post(slotName);
}

function executeSecondaryBloggerPage(slotName) {
  return publishPrimary_2_Page(slotName);
}

function executeAlternatingDaySlot(slotName) {
  var day = new Date().getDay();
  if (day % 2 === 0) {
    return publishPrimary_1_Post(slotName);
  } else {
    return publishSecondary_1_Post(slotName);
  }
}
'''

# ==============================================================================
# 2. CODE.GS (Apps Script Environment, Scheduler, Triggers, & Custom Menu)
# ==============================================================================
code_gs_code = r'''/**
 * ============================================================================
 * ENTER THE WORLD OF LIGHT & LAUGHTER
 * APPS SCRIPT ENVIRONMENT & SCHEDULER CONTROLLER (Code.gs)
 * ============================================================================
 * Role: Controls Google Apps Script environment, time-driven daily triggers,
 * custom Workspace UI menus, manual test runners, and system health checks.
 *
 * NOTE: This file delegates all content generation and publishing logic to
 * Master Controller.gs and does NOT declare duplicate CONFIG variables.
 * ============================================================================
 */

/**
 * 🌟 Workspace Menu Hook (Runs when Google Sheet / Doc is opened)
 */
function onOpen() {
  try {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("🌟 Light & Laughter Automation")
      .addItem("🌅 Run Morning Slot (9:00 AM)", "triggerMorningSlot")
      .addItem("☀️ Run Afternoon Slot (2:00 PM)", "triggerAfternoonSlot")
      .addItem("🌙 Run Evening Slot (7:00 PM)", "triggerEveningSlot")
      .addSeparator()
      .addItem("▶️ Test Track 1: App Hub Post", "testTrack1_AppPost")
      .addItem("▶️ Test Track 2: Evergreen Page", "testTrack2_EvergreenPage")
      .addItem("▶️ Test Track 3: Kids Shorts Post", "testTrack3_KidsPost")
      .addItem("▶️ Test Track 4: Kids Evergreen Page", "testTrack4_KidsPage")
      .addSeparator()
      .addItem("⚡ Setup 3-Slot Daily Triggers", "installAllAutomatedTriggers")
      .addItem("🛑 Clear All Triggers", "removeAllTriggers")
      .addItem("🩺 Run System Diagnostics", "runSystemDiagnostics")
      .addToUi();
  } catch (e) {
    // Standalone script project (not bound to Sheets), menu creation is skipped
    Logger.log("Standalone Apps Script project - UI menu skipped.");
  }
}

/**
 * ============================================================================
 * TIME-DRIVEN TRIGGER DISPATCHERS (Executed automatically by Apps Script triggers)
 * ============================================================================
 */

// Morning Slot: 9:00 AM PKT
function triggerMorningSlot() {
  Logger.log("🌅 [TRIGGER] Executing Morning 9:00 AM Slot...");
  try {
    var result = publishPrimary_1_Post("morning");
    Logger.log("✅ Morning Post Published: " + result.title);
    return result;
  } catch (err) {
    Logger.log("❌ Morning Slot Failed: " + err.message);
    throw err;
  }
}

// Afternoon Slot: 2:00 PM PKT
function triggerAfternoonSlot() {
  Logger.log("☀️ [TRIGGER] Executing Afternoon 2:00 PM Slot...");
  try {
    var result = publishPrimary_2_Page("afternoon");
    Logger.log("✅ Afternoon Page Published: " + result.title);
    return result;
  } catch (err) {
    Logger.log("❌ Afternoon Slot Failed: " + err.message);
    throw err;
  }
}

// Evening Slot: 7:00 PM PKT
function triggerEveningSlot() {
  Logger.log("🌙 [TRIGGER] Executing Evening 7:00 PM Slot...");
  try {
    var result = publishSecondary_1_Post("evening");
    Logger.log("✅ Evening Kids Post Published: " + result.title);
    return result;
  } catch (err) {
    Logger.log("❌ Evening Slot Failed: " + err.message);
    throw err;
  }
}

/**
 * ============================================================================
 * TRIGGER MANAGEMENT (Install / Delete / Status)
 * ============================================================================
 */

/**
 * Automatically configures all 3 daily triggers (9 AM, 2 PM, 7 PM Asia/Karachi)
 */
function installAllAutomatedTriggers() {
  Logger.log("⚡ [INSTALLING] Setting up 3-Slot Daily Publishing Triggers...");
  
  // Clean up any existing triggers first to avoid duplicates
  removeAllTriggers();

  // 1. Morning 9:00 AM
  ScriptApp.newTrigger("triggerMorningSlot")
    .timeBased()
    .atHour(9)
    .nearMinute(0)
    .everyDays(1)
    .inTimezone("Asia/Karachi")
    .create();
  Logger.log("✅ Created Trigger: triggerMorningSlot (9:00 AM PKT)");

  // 2. Afternoon 2:00 PM
  ScriptApp.newTrigger("triggerAfternoonSlot")
    .timeBased()
    .atHour(14)
    .nearMinute(0)
    .everyDays(1)
    .inTimezone("Asia/Karachi")
    .create();
  Logger.log("✅ Created Trigger: triggerAfternoonSlot (2:00 PM PKT)");

  // 3. Evening 7:00 PM
  ScriptApp.newTrigger("triggerEveningSlot")
    .timeBased()
    .atHour(19)
    .nearMinute(0)
    .everyDays(1)
    .inTimezone("Asia/Karachi")
    .create();
  Logger.log("✅ Created Trigger: triggerEveningSlot (7:00 PM PKT)");

  Logger.log("🎉 All 3 daily automated triggers installed successfully!");
  return checkActiveTriggersStatus();
}

/**
 * Removes all triggers created in this project
 */
function removeAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  Logger.log("🛑 Removing " + triggers.length + " existing triggers...");
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  Logger.log("✅ All triggers removed.");
}

/**
 * Checks and logs the status of all active project triggers
 */
function checkActiveTriggersStatus() {
  var triggers = ScriptApp.getProjectTriggers();
  Logger.log("📊 [ACTIVE TRIGGERS COUNT]: " + triggers.length);
  for (var i = 0; i < triggers.length; i++) {
    var t = triggers[i];
    Logger.log("  #" + (i + 1) + " -> Function: " + t.getHandlerFunction() + " | Type: " + t.getEventType());
  }
  return triggers.length;
}

/**
 * ============================================================================
 * MANUAL TEST RUNNERS (For UI menu or manual execution)
 * ============================================================================
 */
function testTrack1_AppPost() {
  return publishPrimary_1_Post("morning");
}

function testTrack2_EvergreenPage() {
  return publishPrimary_2_Page("afternoon");
}

function testTrack3_KidsPost() {
  return publishSecondary_1_Post("evening");
}

function testTrack4_KidsPage() {
  return publishSecondary_2_Page("evening");
}

/**
 * ============================================================================
 * SYSTEM DIAGNOSTICS & HEALTH AUDIT
 * ============================================================================
 */
function runSystemDiagnostics() {
  Logger.log("==================================================");
  Logger.log("🩺 RUNNING SYSTEM DIAGNOSTICS & PERMISSION AUDIT");
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
      Logger.log("✅ [BLOGGER 1] Primary Blog Connected: " + b1.name + " (" + b1.url + ")");
    } else {
      Logger.log("⚠️ [BLOGGER 1 WARNING] Status " + res1.getResponseCode() + ": " + res1.getContentText());
    }
  } catch (e) {
    Logger.log("❌ [BLOGGER 1 ERROR]: " + e.message);
  }

  // 3. Check Secondary Blog Access
  try {
    var secUrl = "https://www.googleapis.com/blogger/v3/blogs/" + MASTER_CONFIG.SECONDARY_BLOG_ID;
    var res2 = UrlFetchApp.fetch(secUrl, {
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      muteHttpExceptions: true
    });
    if (res2.getResponseCode() === 200) {
      var b2 = JSON.parse(res2.getContentText());
      Logger.log("✅ [BLOGGER 2] Secondary Blog Connected: " + b2.name + " (" + b2.url + ")");
    } else {
      Logger.log("⚠️ [BLOGGER 2 WARNING] Status " + res2.getResponseCode() + ": " + res2.getContentText());
    }
  } catch (e) {
    Logger.log("❌ [BLOGGER 2 ERROR]: " + e.message);
  }

  // 4. Check Active Triggers
  checkActiveTriggersStatus();

  Logger.log("==================================================");
  Logger.log("🎉 DIAGNOSTICS COMPLETE");
  Logger.log("==================================================");
}
'''

with open("apps-script/Master Controller.gs", "w") as f:
    f.write(master_controller_code.strip() + "\n")
print("Successfully written apps-script/Master Controller.gs")

with open("apps-script/Code.gs", "w") as f:
    f.write(code_gs_code.strip() + "\n")
print("Successfully written apps-script/Code.gs")
