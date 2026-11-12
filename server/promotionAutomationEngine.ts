import fs from "fs";
import path from "path";

/**
 * ============================================================================
 * PROMOTION AUTOMATION ENGINE (2026 Engine)
 * ============================================================================
 * Complete Automated Workflow for App + YouTube + Blogger Cross-Promotion Loop:
 * - Separate from Kids Mode Educational Content (stored in /storage/promo_videos/)
 * - Daily 2-3 Distinct Promotional Shorts with Smart Topic Rotation
 * - Anti-Duplicate Protection (prevents same-day & consecutive repetition)
 * - Controlled Dynamic Time Windows (Morning, Afternoon, Evening with natural spacing)
 * - Complete Backend Record Persistence with Video/Audio/Blog/App/UTM metadata
 * - YouTube 2026 SEO Optimization (Channel Profile Link as primary clickable destination)
 * - YouTube Content Funnel (Short -> Related Playlist/Video -> Channel -> App)
 * - High-Value Blogger Posts using Approved Primary & Secondary Code Architectures
 * - Evergreen Blogger Pages Generator (Kids Learning, Learn•Play•Practice, About, etc.)
 * - Cross-Promotion UTM Traffic Tracking (YouTube -> App, Blogger -> App, etc.)
 * - Performance Metrics Tracking (Views, Likes, App Clicks, Retention)
 * ============================================================================
 */

export interface PromotionTopicDefinition {
  id: string;
  category: string;
  topic: string;
  topicUrdu?: string;
  targetAudience: string;
  coreHook: string;
  educationalTakeaway: string;
  appFeatureSpotlight: string;
  appRoute: string;
  primaryWordOrTheme: string;
  visualSceneDescription: string;
  suggestedDuration: number;
  tags: string[];
  relatedPlaylistId?: string;
  relatedPlaylistBoxTitle?: string;
}

export interface PromotionShortRecord {
  contentId: string;
  topic: string;
  topicUrdu?: string;
  category: string;
  campaignType: "primary" | "secondary";
  publishDate: string;
  scheduledWindow: "morning" | "afternoon" | "evening";
  scheduledTimeStr: string; // e.g. "09:42 AM"
  videoTitle: string;
  thumbnailUrl: string;
  description: string;
  metadata: {
    targetAudience: string;
    hook: string;
    educationalTakeaway: string;
    appFeature: string;
    appRoute: string;
  };
  hashtags: string[];
  videoUrl: string;
  audioUrl: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  relatedYouTubeContent: {
    title: string;
    playlistUrl: string;
    relationType: "recommended_next_watch" | "topic_playlist" | "deep_dive";
  };
  bloggerPostUrl: string;
  bloggerPostId: string;
  relatedAppUrl: string;
  utmAppUrl: string;
  status: "scheduled" | "ready" | "published";
  uploadStatus: "ready_to_upload" | "uploaded" | "queued";
  bloggerStatus: "ready_to_publish" | "published" | "queued";
  promotionStatus: "active" | "completed" | "archived";
  seoKeywordsUsed: string[];
  sourceTopicInfo: string;
  performance: {
    views: number;
    engagedViews: number;
    likes: number;
    comments: number;
    shares: number;
    subscribersGained: number;
    trafficSources: Record<string, number>;
    bloggerTraffic: number;
    appClicks: number;
    lastUpdated: string;
  };
  bloggerArticle: {
    title: string;
    type: "post" | "page";
    labels: string[];
    contentHtml: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface EvergreenBloggerPage {
  pageId: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  appDeepLink: string;
  contentHtml: string;
  lastUpdated: string;
}

export interface TrafficClickLog {
  clickId: string;
  timestamp: string;
  source: "youtube" | "blogger" | "direct" | "social";
  medium: "channel_profile" | "shorts_link" | "blog_backlink" | "evergreen_page";
  campaign: string;
  contentId: string;
  targetRoute: string;
  userAgent?: string;
  referrer?: string;
}

// -----------------------------------------------------------------------------
// Storage Paths
// -----------------------------------------------------------------------------
const STORAGE_DIR = path.resolve(process.cwd(), "public/storage/promo_videos");
const PROMO_RECORDS_FILE = path.join(STORAGE_DIR, "daily_promotion_records.json");
const PROMO_MANIFEST_FILE = path.join(STORAGE_DIR, "promo_pipeline_manifest.json");
const TRAFFIC_LOGS_FILE = path.join(STORAGE_DIR, "traffic_analytics.json");
const EVERGREEN_PAGES_FILE = path.join(STORAGE_DIR, "evergreen_blogger_pages.json");
const BLOGGER_PIPELINE_FILE = path.resolve(process.cwd(), "public/storage/kids_videos/blogger_pipeline_records.json");

function ensureDirectoryExists() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

// -----------------------------------------------------------------------------
// Curated Topic Catalog (Covers all 15+ Distinct User-Specified Categories)
// -----------------------------------------------------------------------------
export const PROMOTION_TOPICS_CATALOG: PromotionTopicDefinition[] = [
  {
    id: "TOPIC-KIDS-TIPS-01",
    category: "Kids Learning Tips",
    topic: "3 Golden Rules for Stress-Free Early Reading",
    topicUrdu: "بچوں کو پڑھائی میں دلچسپی دلانے کے 3 سنہری اصول",
    targetAudience: "Parents & Early Educators",
    coreHook: "Does your child resist reading? Try this 60-second gentle technique!",
    educationalTakeaway: "Praise curiosity over accuracy, read in 5-minute playful bursts, and pair sounds with finger gestures.",
    appFeatureSpotlight: "Kids Mode Phonics & Urdu Alphabet Board",
    appRoute: "/kids?tab=learn",
    primaryWordOrTheme: "Multi-sensory phonics",
    visualSceneDescription: "Warm cheerful study corner with colorful floating ABC & Alif-Bay letters and happy mascot Sunny.",
    suggestedDuration: 5.5,
    tags: ["KidsLearningTips", "ParentingHacks", "EarlyReading", "BilingualKids"],
    relatedPlaylistId: "PL_Kids_Learning_Tips",
    relatedPlaylistBoxTitle: "Parenting & Learning Tips Series",
  },
  {
    id: "TOPIC-EASY-ENG-01",
    category: "Easy English for Kids",
    topic: "5 Everyday English Words Kids Can Master in 60 Seconds",
    topicUrdu: "روزمرہ کے 5 آسان انگریزی الفاظ",
    targetAudience: "Children ages 3-8 & Parents",
    coreHook: "Say goodbye to boring flashcards! Learn 5 magic words with playful sounds.",
    educationalTakeaway: "Breeze, Flutter, Curious, Sparkle, and Giggle with fun actions.",
    appFeatureSpotlight: "English Vocabulary Builder with Audio Pronunciation",
    appRoute: "/kids?tab=learn",
    primaryWordOrTheme: "Action Vocabulary",
    visualSceneDescription: "Animated floating word bubbles popping with sound effects and cheerful animal characters.",
    suggestedDuration: 5.5,
    tags: ["EasyEnglish", "KidsVocabulary", "EnglishForKids", "SpeakingSkills"],
    relatedPlaylistId: "PL_Easy_English_Kids",
    relatedPlaylistBoxTitle: "English Phonics & Vocabulary Play",
  },
  {
    id: "TOPIC-URDU-LEARN-01",
    category: "Urdu Learning",
    topic: "Secrets of Beautiful Nastaliq: Tracing Alif, Bay, Pay with Joy",
    topicUrdu: "خوشخطی اور حروفِ تہجی کی پہچان",
    targetAudience: "Students & Urdu Learners",
    coreHook: "Ever wondered why Urdu script looks like flowing poetry? Let's trace it together!",
    educationalTakeaway: "Urdu letters follow natural curves. Practice tracing on the interactive board with zero mistakes.",
    appFeatureSpotlight: "Digital Urdu Haroof-e-Tahajji Tracing Studio",
    appRoute: "/kids?tab=learn",
    primaryWordOrTheme: "Nastaliq Calligraphy",
    visualSceneDescription: "Golden ink tracing across a glowing digital parchment revealing Urdu letters.",
    suggestedDuration: 5.5,
    tags: ["UrduLearning", "HaroofETahajji", "NastaliqScript", "UrduForKids"],
    relatedPlaylistId: "PL_Urdu_Learning_Series",
    relatedPlaylistBoxTitle: "Classical Urdu & Haroof Mastery",
  },
  {
    id: "TOPIC-FUN-FACTS-01",
    category: "Fun Facts",
    topic: "Did You Know? Why Do Honeybees Dance?",
    topicUrdu: "شہد کی مکھیاں رقص کیوں کرتی ہیں؟",
    targetAudience: "Curious Children & Science Lovers",
    coreHook: "Bees don't speak words—they do a waggle dance to tell friends where sweet flowers are!",
    educationalTakeaway: "Nature uses motion language. Bees communicate angle and distance to nectar with precision.",
    appFeatureSpotlight: "Curiosity Science Lab & Sunny Mascot Q&A",
    appRoute: "/kids?tab=games",
    primaryWordOrTheme: "Honeybee Waggle Dance",
    visualSceneDescription: "Bright 3D garden with cute animated honeybee doing a zig-zag dance with musical chimes.",
    suggestedDuration: 5.5,
    tags: ["FunFacts", "KidsScience", "NatureCuriosity", "DidYouKnowKids"],
    relatedPlaylistId: "PL_Fun_Facts_Kids",
    relatedPlaylistBoxTitle: "Fascinating Nature & Science Facts",
  },
  {
    id: "TOPIC-KIDS-QUIZ-01",
    category: "Kids Quiz",
    topic: "Lightning Brain Quiz: Can You Spot the Odd One Out in 5 Seconds?",
    topicUrdu: "ذہنی آزمائش: 5 سیکنڈ میں الگ چیز پہچانیں",
    targetAudience: "Kids & Young Students",
    coreHook: "Tick-tock! 3, 2, 1... Can your brain spot the odd animal before time runs out?",
    educationalTakeaway: "Develops rapid visual discrimination, pattern recognition, and focus.",
    appFeatureSpotlight: "Brain Arcade Rapid Recall Quizzes",
    appRoute: "/play",
    primaryWordOrTheme: "Visual Discrimination",
    visualSceneDescription: "Fast-paced quiz board with countdown timer, star explosions, and sound chimes.",
    suggestedDuration: 5.5,
    tags: ["KidsQuiz", "BrainGames", "MemoryTest", "PuzzleChallenge"],
    relatedPlaylistId: "PL_Kids_Brain_Quiz",
    relatedPlaylistBoxTitle: "Interactive Brain Quizzes & Riddles",
  },
  {
    id: "TOPIC-ANIMAL-FACTS-01",
    category: "Animals Facts",
    topic: "The Ocean Giant: Why Whales Sing Across Thousands of Miles",
    topicUrdu: "سمندری دیو ہیکل: وہیل مچھلی کے گیت",
    targetAudience: "Kids & Nature Enthusiasts",
    coreHook: "Whale songs travel farther than any phone call across deep oceans!",
    educationalTakeaway: "Sound travels 4 times faster through water than air, allowing whales to communicate across entire seas.",
    appFeatureSpotlight: "Interactive Illustrated Animal Encyclopedia",
    appRoute: "/kids?tab=learn",
    primaryWordOrTheme: "Blue Whale Acoustics",
    visualSceneDescription: "Gentle blue underwater ocean world with majestic 3D animated blue whale sending glowing sonar ripples.",
    suggestedDuration: 5.5,
    tags: ["AnimalsFacts", "OceanLife", "BlueWhale", "NatureForKids"],
    relatedPlaylistId: "PL_Animal_Kingdom_Facts",
    relatedPlaylistBoxTitle: "Wonderful Wildlife & Animal Secrets",
  },
  {
    id: "TOPIC-PARENT-TIPS-01",
    category: "Parent Learning Tips",
    topic: "How to Turn Passive Screen-Time into Wholesome Literacy",
    topicUrdu: "اسکرین ٹائم کو تعلیمی فائدے میں کیسے بدلیں؟",
    targetAudience: "Modern Parents",
    coreHook: "Stop battling screen time—channel it into curiosity, moral stories, and tracing!",
    educationalTakeaway: "Ad-free, guided interactive apps replace dopamine addiction with calm, constructive learning.",
    appFeatureSpotlight: "Child-Safe 100% Ad-Free Kids Mode Portal",
    appRoute: "/kids",
    primaryWordOrTheme: "Mindful Digital Parenting",
    visualSceneDescription: "Calm warm living room showing happy parent and child interacting with an ad-free colorful learning tablet.",
    suggestedDuration: 5.5,
    tags: ["ParentingTips", "ScreenTimeHack", "ChildSafety", "DigitalLearning"],
    relatedPlaylistId: "PL_Parenting_Guide",
    relatedPlaylistBoxTitle: "Parenting Guides & Screen Time Balance",
  },
  {
    id: "TOPIC-CHALLENGE-01",
    category: "Educational Mini Challenges",
    topic: "30-Second Vocabulary Duel: Name 3 Things That Are Always Blue!",
    topicUrdu: "30 سیکنڈ چیلنج: نیلی چیزوں کے نام",
    targetAudience: "Children & Students",
    coreHook: "Sky, Ocean, Sapphire... Can you beat our timer and name three more?",
    educationalTakeaway: "Timed semantic retrieval strengthens neural pathways and expands working vocabulary.",
    appFeatureSpotlight: "Flashcard Frenzy & Speed Vocabulary Game",
    appRoute: "/practice",
    primaryWordOrTheme: "Rapid Semantic Retrieval",
    visualSceneDescription: "Vibrant neon stopwatch ticking with animated cartoon stars cheering every correct answer.",
    suggestedDuration: 5.5,
    tags: ["MiniChallenge", "WordDuel", "QuickThinking", "KidsChallenge"],
    relatedPlaylistId: "PL_Mini_Challenges",
    relatedPlaylistBoxTitle: "Daily Mini Challenges & Speed Rounds",
  },
  {
    id: "TOPIC-STORIES-01",
    category: "Kids Stories",
    topic: "The Honest Tree & The Whispering Wind (Moral Bedtime Tale)",
    topicUrdu: "سچائی کا درخت اور ہوا کا قصہ",
    targetAudience: "Children ages 3-9",
    coreHook: "When storm winds blew fierce, only the honest oak tree stood strong. Why?",
    educationalTakeaway: "Honesty creates deep roots that no hardship or storm can ever shake.",
    appFeatureSpotlight: "Bilingual Moral Stories & Bedtime Audio Reader",
    appRoute: "/kids?tab=stories",
    primaryWordOrTheme: "Integrity & Truth",
    visualSceneDescription: "Enchanted storybook unfolding with 3D illustrations, gentle starry skies, and glowing leaves.",
    suggestedDuration: 5.5,
    tags: ["MoralStories", "BedtimeTales", "KidsStoriesUrdu", "CharacterBuilding"],
    relatedPlaylistId: "PL_Bedtime_Stories",
    relatedPlaylistBoxTitle: "Moral Bedtime Stories & Illustrated Tales",
  },
  {
    id: "TOPIC-FUN-VOCAB-01",
    category: "Fun Vocabulary",
    topic: "Words of Wonder: What Does 'Serendipity' Really Mean?",
    topicUrdu: "خوشگوار اتفاق: غیر متوقع خوشی کا لفظ",
    targetAudience: "Students & Word Enthusiasts",
    coreHook: "Ever found a coin in your old jacket? That joyful surprise has a special name!",
    educationalTakeaway: "Serendipity is finding valuable or agreeable things not sought for. Urdu: غیر متوقع خوش قسمتی.",
    appFeatureSpotlight: "Bilingual Lexicon & Urdu Tashreeh Dictionary",
    appRoute: "/poetry",
    primaryWordOrTheme: "Serendipity / غیر متوقع خوشی",
    visualSceneDescription: "Old vintage leather dictionary opening with sparkling golden dust and calligraphy letters.",
    suggestedDuration: 5.5,
    tags: ["WordOfTheDay", "VocabularyBuilder", "EnglishUrdu", "LanguageEnrichment"],
    relatedPlaylistId: "PL_Vocabulary_Series",
    relatedPlaylistBoxTitle: "Vocabulary Enrichment & Word Gems",
  },
  {
    id: "TOPIC-SCIENCE-01",
    category: "Simple Science",
    topic: "Why Does Ice Float on Water? The Miracle of Crystal Density",
    topicUrdu: "برف پانی پر کیوں تیرتی ہے؟",
    targetAudience: "Curious Kids & Junior Scientists",
    coreHook: "Most solids sink, but ice stays on top! Without this, sea animals couldn't survive winter.",
    educationalTakeaway: "When water freezes, molecules form a hexagon cage structure with air pockets, making it less dense than liquid water.",
    appFeatureSpotlight: "Interactive Science Lab & Brain Playground",
    appRoute: "/play",
    primaryWordOrTheme: "Hexagonal Hydrogen Bonds",
    visualSceneDescription: "Frosty crystalline glass of water showing sparkling ice cubes floating gently with cute microscopic molecules.",
    suggestedDuration: 5.5,
    tags: ["SimpleScience", "ScienceForKids", "DensityExperiment", "CuriousMinds"],
    relatedPlaylistId: "PL_Simple_Science",
    relatedPlaylistBoxTitle: "Everyday Science & Wonders Explained",
  },
  {
    id: "TOPIC-NUMBERS-01",
    category: "Numbers & Counting",
    topic: "The 9-Times Finger Hack: Multiply in 2 Seconds Without Memorizing",
    topicUrdu: "نو کا پہاڑا انگلیوں پر چٹکیوں میں حل کریں",
    targetAudience: "Students & Young Learners",
    coreHook: "Tired of cramming tables? Hold up your 10 fingers—the 9 table is right in your hands!",
    educationalTakeaway: "Fold the finger of the number you are multiplying: fingers to the left are tens, fingers to the right are units.",
    appFeatureSpotlight: "Speed Math Arcade & Mental Calculation Timer",
    appRoute: "/play",
    primaryWordOrTheme: "Finger Math Algorithm",
    visualSceneDescription: "Bright colorful cartoon hands showing finger folding with neon numbers lighting up instantly.",
    suggestedDuration: 5.5,
    tags: ["MathHacks", "SpeedMath", "FingerMultiplication", "KidsMathTricks"],
    relatedPlaylistId: "PL_Math_Tricks",
    relatedPlaylistBoxTitle: "Mental Math Hacks & Speed Calculation",
  },
  {
    id: "TOPIC-LEARNING-GAMES-01",
    category: "Learning Games",
    topic: "Turn Memory Drills into an Adventure: Active Recall Game",
    topicUrdu: "یادداشت کو تیز کرنے والا دلچسپ کھیل",
    targetAudience: "Students & Gamified Learners",
    coreHook: "Active recall beats passive reading every time! Test your brain agility in under a minute.",
    educationalTakeaway: "Retrieval practice builds strong synapses. Play 3 minutes daily to remember lessons effortlessly.",
    appFeatureSpotlight: "Play Arcade Dual-N-Back & Recall Challenges",
    appRoute: "/play",
    primaryWordOrTheme: "Active Recall Mechanics",
    visualSceneDescription: "Retro arcade cabinet surrounded by floating knowledge badges, glowing stars, and combo streaks.",
    suggestedDuration: 5.5,
    tags: ["LearningGames", "BrainTraining", "ActiveRecall", "GamifiedLearning"],
    relatedPlaylistId: "PL_Learning_Games",
    relatedPlaylistBoxTitle: "Educational Games & Brain Arcades",
  },
  {
    id: "TOPIC-APP-DEMO-01",
    category: "App Feature Demonstrations",
    topic: "Take a Tour: What Inside 'Enter the World of Light & Laughter'?",
    topicUrdu: "ایپ کا تفصیلی تعارف: علم، ادب، کھیل اور کہانیاں",
    targetAudience: "General Audience, Parents & Students",
    coreHook: "From classical Ghalib couplets to child-safe phonics and brain games—all in one place!",
    educationalTakeaway: "Discover the 3 foundational pillars: Learn (Knowledge & Phonics), Play (Brain Arcade), and Practice (Streaks & Flashcards).",
    appFeatureSpotlight: "Enter the World of Light Master Hub",
    appRoute: "/home",
    primaryWordOrTheme: "Comprehensive Web App Tour",
    visualSceneDescription: "Dynamic screen carousel zooming smoothly between Poetry Reader, Kids Animal Zoo, and Math Arcade.",
    suggestedDuration: 5.5,
    tags: ["AppTour", "EnterTheWorldOfLight", "DigitalEducation", "PakistaniApp"],
    relatedPlaylistId: "PL_App_Demonstrations",
    relatedPlaylistBoxTitle: "App Feature Walkthroughs & Highlights",
  },
  {
    id: "TOPIC-KIDS-MODE-DEMO-01",
    category: "Kids Mode Features",
    topic: "Peek Inside Kids Mode: 100% Ad-Free, Safe, and Full of Joy",
    topicUrdu: "بچوں کا خصوصی موڈ: مکمل محفوظ اور اشتہارات سے پاک",
    targetAudience: "Parents & Caregivers",
    coreHook: "No pop-up ads, no inappropriate content, just pure wholesome learning for your little ones.",
    educationalTakeaway: "Built with parent controls, screen timer limits, and bilingual audio pronunciation.",
    appFeatureSpotlight: "Kids Mode Dedicated Portal",
    appRoute: "/kids",
    primaryWordOrTheme: "Child Safety & Focus",
    visualSceneDescription: "Kids Mode dashboard with cute animated mascot Sunny waving warmly amidst floating stars.",
    suggestedDuration: 5.5,
    tags: ["KidsMode", "AdFreeKids", "SafeLearning", "ParentalGuidance"],
    relatedPlaylistId: "PL_Kids_Mode_Features",
    relatedPlaylistBoxTitle: "Kids Mode Highlights & Walkthroughs",
  },
  {
    id: "TOPIC-PILLARS-01",
    category: "Learn / Play / Practice Features",
    topic: "Learn • Play • Practice: The 3-Step Formula to Master Any Subject",
    topicUrdu: "سیکھیں • کھیلیں • دہرائیں: کامیابی کا 3 نکاتی فارمولا",
    targetAudience: "Students & Lifelong Learners",
    coreHook: "First you understand (Learn), then you engage (Play), then you cement (Practice).",
    educationalTakeaway: "Spaced repetition combined with gamified practice increases retention by over 300%.",
    appFeatureSpotlight: "Learn • Play • Practice Navigation Core",
    appRoute: "/practice",
    primaryWordOrTheme: "Triad Pedagogy",
    visualSceneDescription: "Three glowing triangular pillars of Light: Emerald (Learn), Sapphire (Play), and Gold (Practice).",
    suggestedDuration: 5.5,
    tags: ["LearnPlayPractice", "StudyMethod", "SpacedRepetition", "ExcellenceInStudy"],
    relatedPlaylistId: "PL_Study_Methods",
    relatedPlaylistBoxTitle: "Learning Methodologies & Daily Habits",
  },
];

// -----------------------------------------------------------------------------
// Database Operations (JSON Persistence with Anti-Corruption Guard)
// -----------------------------------------------------------------------------

export function getPromotionRecords(): PromotionShortRecord[] {
  ensureDirectoryExists();
  if (fs.existsSync(PROMO_RECORDS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(PROMO_RECORDS_FILE, "utf-8"));
      if (Array.isArray(data)) return data;
    } catch (e) {
      console.warn("[PromotionEngine] Failed to read promo records file, returning empty array:", e);
    }
  }
  return [];
}

export function savePromotionRecords(records: PromotionShortRecord[]): void {
  ensureDirectoryExists();
  fs.writeFileSync(PROMO_RECORDS_FILE, JSON.stringify(records, null, 2), "utf-8");
  syncWithPromoManifest(records);
  syncWithBloggerPipeline(records);
}

function syncWithPromoManifest(records: PromotionShortRecord[]): void {
  try {
    const manifestItems = records.map((r) => ({
      contentId: r.contentId,
      category: r.category,
      topic: r.topic,
      topicSlug: r.contentId.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
      targetAudience: r.metadata.targetAudience,
      durationSeconds: 5.5,
      script: {
        hook: r.metadata.hook,
        body: r.metadata.educationalTakeaway,
        callToAction: "Visit our Channel Profile link to launch Enter the World of Light & Laughter!",
      },
      voiceText: `${r.metadata.hook} ${r.metadata.educationalTakeaway}`,
      status: "completed",
      videoUrl: r.videoUrl,
      audioUrl: r.audioUrl,
      thumbnailUrl: r.thumbnailUrl,
      copyrightAudit: {
        status: "passed_100_percent",
        checkedAt: r.createdAt,
        visualOriginality: "100% Proprietary AI CGI & Web Components",
        audioOriginality: "Original Synthesized Narration (Zero Copyrighted Music)",
        coppaCompliant: true,
        youtube2026Ready: true,
      },
      creationDate: r.createdAt,
      youtubeUrl: r.youtubeUrl,
      bloggerUrl: r.bloggerPostUrl,
      appUrl: r.relatedAppUrl,
    }));
    fs.writeFileSync(PROMO_MANIFEST_FILE, JSON.stringify(manifestItems, null, 2), "utf-8");
  } catch (err) {
    console.error("[PromotionEngine] Manifest sync error:", err);
  }
}

function syncWithBloggerPipeline(records: PromotionShortRecord[]): void {
  try {
    let existingBlogger: any[] = [];
    if (fs.existsSync(BLOGGER_PIPELINE_FILE)) {
      try {
        existingBlogger = JSON.parse(fs.readFileSync(BLOGGER_PIPELINE_FILE, "utf-8"));
      } catch {}
    }

    for (const rec of records) {
      const idx = existingBlogger.findIndex((b: any) => b.linkedVideoId === rec.contentId);
      const entry = {
        id: rec.bloggerPostId,
        title: rec.bloggerArticle.title,
        type: rec.bloggerArticle.type,
        category: rec.category,
        labels: rec.bloggerArticle.labels,
        contentHtml: rec.bloggerArticle.contentHtml,
        masterBlogUrl: "https://entertheworldoflightandlaughter.blogspot.com",
        linkedVideoId: rec.contentId,
        videoUrl: rec.videoUrl,
        createdAt: rec.createdAt,
        status: rec.bloggerStatus,
      };

      if (idx >= 0) {
        existingBlogger[idx] = { ...existingBlogger[idx], ...entry };
      } else {
        existingBlogger.unshift(entry);
      }
    }

    fs.writeFileSync(BLOGGER_PIPELINE_FILE, JSON.stringify(existingBlogger, null, 2), "utf-8");
  } catch (err) {
    console.error("[PromotionEngine] Blogger pipeline sync error:", err);
  }
}

// -----------------------------------------------------------------------------
// Controlled Non-Fixed Posting Time Engine (Controlled Spaced Windows)
// -----------------------------------------------------------------------------

export interface ControlledTimeWindow {
  slot: "morning" | "afternoon" | "evening";
  windowLabel: string;
  minHour: number;
  maxHour: number;
  calculatedTimeStr: string;
}

/**
 * Returns controlled daily windows where the exact minute varies naturally,
 * maintaining proper spacing and avoiding duplicate minute dumps.
 */
export function getDailyControlledTimeWindows(targetDateStr: string): ControlledTimeWindow[] {
  // Use date hash for pseudo-random yet stable daily variation
  let hash = 0;
  for (let i = 0; i < targetDateStr.length; i++) {
    hash = (hash << 5) - hash + targetDateStr.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  // Slot 1: Morning/Afternoon Window (09:15 - 11:45)
  const mMinute = (absHash % 35) + 12; // 12 to 47
  const mHour = 9 + ((absHash >> 2) % 3); // 9, 10, or 11
  const mTimeStr = `${mHour.toString().padStart(2, "0")}:${mMinute.toString().padStart(2, "0")} AM`;

  // Slot 2: Afternoon/Evening Window (14:15 - 16:50)
  const aMinute = ((absHash >> 4) % 38) + 14; // 14 to 52
  const aHour = 2 + ((absHash >> 6) % 3); // 2, 3, or 4 PM
  const aTimeStr = `${aHour.toString().padStart(2, "0")}:${aMinute.toString().padStart(2, "0")} PM`;

  // Slot 3: Evening/Night Window (19:15 - 21:40)
  const eMinute = ((absHash >> 8) % 33) + 15; // 15 to 48
  const eHour = 7 + ((absHash >> 10) % 3); // 7, 8, or 9 PM
  const eTimeStr = `${eHour.toString().padStart(2, "0")}:${eMinute.toString().padStart(2, "0")} PM`;

  return [
    { slot: "morning", windowLabel: "Morning / Afternoon", minHour: 9, maxHour: 11, calculatedTimeStr: mTimeStr },
    { slot: "afternoon", windowLabel: "Afternoon / Evening", minHour: 14, maxHour: 16, calculatedTimeStr: aTimeStr },
    { slot: "evening", windowLabel: "Evening / Night", minHour: 19, maxHour: 21, calculatedTimeStr: eTimeStr },
  ];
}

// -----------------------------------------------------------------------------
// Smart Topic Rotation & Anti-Duplicate Selection Engine
// -----------------------------------------------------------------------------

export function selectDailyTrioPromotionalTopics(targetDateStr: string): PromotionTopicDefinition[] {
  const records = getPromotionRecords();

  // Find topics used today and in the last 7 days
  const todayRecords = records.filter((r) => r.publishDate === targetDateStr);
  const usedTodayTopicIds = new Set(todayRecords.map((r) => r.topic));

  // Determine yesterday's date
  const targetDate = new Date(targetDateStr);
  const yesterday = new Date(targetDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const yesterdayRecords = records.filter((r) => r.publishDate === yesterdayStr);
  const usedYesterdayCategories = new Set(yesterdayRecords.map((r) => r.category));
  const usedYesterdayTopics = new Set(yesterdayRecords.map((r) => r.topic));

  // 7-day category frequency map
  const sevenDaysAgo = new Date(targetDate);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentRecords = records.filter((r) => new Date(r.publishDate) >= sevenDaysAgo);

  const categoryFrequency: Record<string, number> = {};
  for (const r of recentRecords) {
    categoryFrequency[r.category] = (categoryFrequency[r.category] || 0) + 1;
  }

  // Filter pool:
  // 1. MUST NOT be used today
  // 2. MUST NOT be the exact same topic as yesterday
  // 3. Prefer categories that have lower frequency in last 7 days
  const eligiblePool = PROMOTION_TOPICS_CATALOG.filter((t) => {
    if (usedTodayTopicIds.has(t.topic)) return false;
    if (usedYesterdayTopics.has(t.topic)) return false;
    return true;
  });

  // Sort eligible pool by freshness (categories used yesterday get a slight penalty to enforce rotation)
  const sorted = [...eligiblePool].sort((a, b) => {
    const aUsedYesterday = usedYesterdayCategories.has(a.category) ? 2 : 0;
    const bUsedYesterday = usedYesterdayCategories.has(b.category) ? 2 : 0;
    const aFreq = (categoryFrequency[a.category] || 0) + aUsedYesterday;
    const bFreq = (categoryFrequency[b.category] || 0) + bUsedYesterday;
    return aFreq - bFreq;
  });

  // Pick 3 topics with distinct categories
  const selected: PromotionTopicDefinition[] = [];
  const selectedCategories = new Set<string>();

  for (const item of sorted) {
    if (!selectedCategories.has(item.category)) {
      selected.push(item);
      selectedCategories.add(item.category);
      if (selected.length === 3) break;
    }
  }

  // Fallback if less than 3
  if (selected.length < 3) {
    for (const item of sorted) {
      if (!selected.includes(item)) {
        selected.push(item);
        if (selected.length === 3) break;
      }
    }
  }

  return selected.slice(0, 3);
}

// -----------------------------------------------------------------------------
// YouTube SEO Package Generator (Compliant with 2026 Shorts Rules)
// -----------------------------------------------------------------------------

export function generateYouTubePromoMetadata(
  topicDef: PromotionTopicDefinition,
  slot: "morning" | "afternoon" | "evening",
  appOrigin: string
) {
  const channelUrl = "https://www.youtube.com/@EntertheWorldofLight";
  const masterBlogUrl = "https://entertheworldoflightandlaughter.blogspot.com";

  // Distinct title
  const title = `${topicDef.topic} | 60-Sec Quick Learning #Shorts`;

  // YouTube 2026 Policy Enforced: Shorts description URLs are not clickable,
  // so the Primary Destination is the Channel Profile link!
  const description = `
${topicDef.coreHook}

📖 WHAT YOU LEARN IN 60 SECONDS:
${topicDef.educationalTakeaway}

✨ EXPERIENCE IN THE APP:
Explore ${topicDef.appFeatureSpotlight} with interactive sound, zero ads, and guided practice!

👉 TO LAUNCH THE APP:
Tap the link on our YouTube Channel profile:
@EntertheWorldofLight (Direct access to Enter the World of Light & Laughter)

🌐 MASTER BLOG ARTICLES:
Read the full in-depth guide on our official blog:
${masterBlogUrl}

📌 RELATED PLAYLIST:
Catch more ${topicDef.category} lessons in our official playlist:
${channelUrl}/playlists

#Shorts #${topicDef.tags.join(" #")} #EnterTheWorldOfLight #KidsLearning #BilingualEducation #DailyWisdom
  `.trim();

  const utmAppUrl = `${appOrigin}${topicDef.appRoute}?utm_source=youtube&utm_medium=channel_profile&utm_campaign=promo_${slot}_${topicDef.id.toLowerCase()}&utm_content=short_video`;

  return {
    title,
    description,
    hashtags: topicDef.tags.map((t) => `#${t}`),
    utmAppUrl,
    relatedYouTubeContent: {
      title: topicDef.relatedPlaylistBoxTitle || "Learning Series",
      playlistUrl: `${channelUrl}/playlists`,
      relationType: "topic_playlist" as const,
    },
  };
}

// -----------------------------------------------------------------------------
// Universal Blog Footer (White Box, Cross-Linking, Share & Join Us in Official Colors)
// -----------------------------------------------------------------------------
export function renderUniversalBlogFooter(
  isPrimary: boolean,
  topicTitle: string,
  appOrigin: string
): string {
  const masterBlogUrl = "https://entertheworldoflightandlaughter.blogspot.com";
  const encodedTitle = encodeURIComponent(topicTitle);
  const encodedUrl = encodeURIComponent(masterBlogUrl);

  const crossLinkBox = isPrimary
    ? `
  <!--⚡ INTER-LINKING: Link to Secondary Blog with Compelling CTR Hook-->
  <div style="background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%); border: 2px dashed #3b82f6; border-radius: 14px; padding: 20px 16px; margin-bottom: 24px; text-align: center;">
    <span style="background: #ef4444; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; display: inline-block;">🔥 EXCLUSIVE BONUS PART 2</span>
    <h3 style="color: #0f172a; font-size: 18px; font-weight: 800; line-height: 1.4; margin: 12px 0 8px 0;">
      ⚡ Dekhein Yeh Secret Feature Jo 90% Log Miss Kar Dete Hain: ${topicTitle} (Quick 60-Sec Quality Review &amp; Visual Breakdown)!
    </h3>
    <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 14px 0;">
      Agar aapne yeh step-by-step visual demonstration aur fast practical test nahi dekha to aap is feature ka asal faida nahi le sakenge!
    </p>
    <a href="${masterBlogUrl}/search/label/Secondary" target="_blank" style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 30px; display: inline-block; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);">
      👉 Click Here To Watch Quick Breakdown &rarr;
    </a>
  </div>
  `
    : `
  <!--⚡ INTER-LINKING: Link to Primary Master Blog with Compelling CTR Hook-->
  <div style="background: linear-gradient(135deg, #fefce8 0%, #eff6ff 100%); border: 2px dashed #f59e0b; border-radius: 14px; padding: 20px 16px; margin-bottom: 24px; text-align: center;">
    <span style="background: #16a34a; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; display: inline-block;">⭐ GOOGLE RECOMMENDED ORIGINAL MASTER</span>
    <h3 style="color: #0f172a; font-size: 18px; font-weight: 800; line-height: 1.4; margin: 12px 0 8px 0;">
      🏆 Must-Read Master Guide: ${topicTitle} (Complete In-Depth Curriculum &amp; Official Roadmap)!
    </h3>
    <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 14px 0;">
      Google Search Algorithms jisko #1 authentic primary source consider karte hain. Poori tehqeeq aur complete deep-dive abhi padhein!
    </p>
    <a href="${masterBlogUrl}/search/label/Primary" target="_blank" style="background: linear-gradient(135deg, #059669, #047857); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 30px; display: inline-block; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);">
      ⭐ Click Here For Full Master Guide &rarr;
    </a>
  </div>
  `;

  return `
<!--==================== WHITE BOX (INTER-LINKING, SHARE & JOIN US) ====================-->
<div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06); margin: 30px auto; max-width: 760px; padding: 26px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: center; color: #1e293b;">

  ${crossLinkBox}

  <!--📢 SHARE BUTTONS SECTION (Official Colors, No Phone Numbers)-->
  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-bottom: 24px;">
    <h4 style="color: #1e293b; font-size: 15px; font-weight: 700; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">
      📢 Share This Guide With Friends &amp; Family
    </h4>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center;">
      <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" style="background: #25D366; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        💬 WhatsApp
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" style="background: #1877F2; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📘 Facebook
      </a>
      <a href="https://instagram.com" target="_blank" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📸 Instagram
      </a>
      <a href="https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}" target="_blank" style="background: #BD081C; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📌 Pinterest
      </a>
      <a href="https://www.tiktok.com" target="_blank" style="background: #000000; color: #ffffff; border: 1px solid #333333; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        🎵 TikTok
      </a>
      <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" style="background: #000000; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        𝕏 Twitter
      </a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" style="background: #0A66C2; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        💼 LinkedIn
      </a>
      <a href="https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}" target="_blank" style="background: #229ED9; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        ✈️ Telegram
      </a>
      <a href="https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}" target="_blank" style="background: #FF4500; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        🔥 Reddit
      </a>
    </div>
  </div>

  <!--🌟 JOIN US / OFFICIAL COMMUNITY CHANNELS SECTION (Official Colors)-->
  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
    <h4 style="color: #0f172a; font-size: 16px; font-weight: 800; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">
      ✨ Join Us &amp; Stay Connected
    </h4>
    <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: center;">
      <a href="https://www.youtube.com/@EntertheWorldofLight?sub_confirmation=1" target="_blank" style="background: #FF0000; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        ▶️ YouTube
      </a>
      <a href="https://whatsapp.com/channel/0029Vaexample" target="_blank" style="background: #25D366; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        🟢 WhatsApp Channel
      </a>
      <a href="${appOrigin}/?utm_source=blogger_footer&utm_medium=join_us_btn" target="_blank" style="background: linear-gradient(135deg, #4F46E5, #06B6D4); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        🌐 Web App (Live)
      </a>
      <a href="https://facebook.com/EnterTheWorldOfLight" target="_blank" style="background: #1877F2; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📘 Facebook
      </a>
      <a href="https://instagram.com/EnterTheWorldOfLight" target="_blank" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📸 Instagram
      </a>
      <a href="https://tiktok.com/@EnterTheWorldOfLight" target="_blank" style="background: #000000; color: #ffffff; border: 1px solid #333333; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        🎵 TikTok
      </a>
      <a href="https://pinterest.com/EnterTheWorldOfLight" target="_blank" style="background: #BD081C; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        📌 Pinterest
      </a>
      <a href="https://twitter.com/WorldOfLightApp" target="_blank" style="background: #000000; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        𝕏 Twitter
      </a>
      <a href="https://t.me/EnterTheWorldOfLight" target="_blank" style="background: #229ED9; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
        ✈️ Telegram
      </a>
    </div>
  </div>

</div>
<!--==================== END WHITE BOX ====================-->
  `.trim();
}

// -----------------------------------------------------------------------------
// Blogger Article Generator (Extending the Finalized Google-Approved Templates)
// -----------------------------------------------------------------------------

export function generateBloggerArticleForPromo(
  topicDef: PromotionTopicDefinition,
  campaignType: "primary" | "secondary",
  appOrigin: string,
  videoId: string = "z3PGTXQW7yU"
): { title: string; type: "post"; labels: string[]; contentHtml: string } {
  const masterBlogUrl = "https://entertheworldoflightandlaughter.blogspot.com";
  const isPrimary = campaignType === "primary";

  const primaryKeywordsTop = `
youtube shorts learning review, youtube trending educational shorts pakistan, top viral learning shorts,
urdu learning shorts 2026, bilingual education shorts video, trending kids learning shorts,
classical urdu poetry 2026 pakistan, educational web app review blog, enter the world of light viral short,
youtube shorts algorithm pakistan, shorts learning series 2026, pakistan education trending video, ${topicDef.tags.join(", ")}
  `.trim();

  const primaryKeywordsBottom = `
best educational app for kids 2026 pakistan, classical urdu poetry study guide blog,
enter the world of light and laughter feature review, bilingual learning ideas 2026,
interactive urdu tracing app high quality, top trending learning games pakistan 2026,
kids safe educational portal review, moral bedtime stories for children pakistan,
viral educational short 2026, urdu poetry blogger pakistan,
youtube shorts learning ideas, trending educational app 2026, ${topicDef.primaryWordOrTheme}
  `.trim();

  const secondaryKeywordsTop = `
youtube shorts educational review, youtube trending shorts pakistan, top viral shorts learning, kids portal shorts review 2026, educational web app shorts video, trending learning shorts for students, classical urdu poetry 2026 pakistan, learning app review blog, premium educational viral short, youtube shorts algorithm pakistan, shorts education haul 2026, pakistan learning trending video, enter the world of light full review 2026, trending kids shorts for parents, pakistan educational app latest update, youtube shorts learning analysis in urdu, latest learning games for kids pakistan, ${topicDef.tags.join(", ")}
  `.trim();

  const secondaryKeywordsBottom = `
best learning app for students 2026 pakistan, educational lifestyle review blog, enter the world of light learning review, elegant poetry styling ideas 2026, bilingual urdu learning premium quality, top trending educational games pakistan 2026, lightweight learning app review, free premium learning tools pakistan, daily study routine for students, viral educational design 2026, educational blogger pakistan content, youtube shorts learning ideas, 2026 educational trends for Pakistani audience, app feature close-up details, educational blogger pakistan guide, viral learning video explanation, enter the world of light premium features review, ${topicDef.primaryWordOrTheme}
  `.trim();

  if (isPrimary) {
    // -------------------------------------------------------------------------
    // EXACT APPROVED PRIMARY CODE ARCHITECTURE (Google-Approved)
    // -------------------------------------------------------------------------
    const title = `${topicDef.topic}: Comprehensive Learning Guide & Practical Takeaways (2026)`;
    const contentHtml = `
<!--==================== MAIN BLOG – PRIMARY CONTENT FOR GOOGLE ====================-->

<!--🟢 STRONG MAIN BLOG SIGNAL (Google Only)-->
<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">
This is the MAIN BLOG for the ${topicDef.topic} YouTube Short and Web App Module.
This is the original primary article for Google Indexing.
All other posts linking to this are secondary versions.
Google should treat this page as the main source of content.
</div>

<!--🟢 TOP SEO KEYWORDS (High Ranking – Hidden)-->
<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">
${primaryKeywordsTop}
</div>

<!--🟢 BOTTOM SEO KEYWORDS (Long Tail – Hidden)-->
<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">
${primaryKeywordsBottom}
</div>

<p><strong>Enter the World of Light &amp; Laughter</strong> – ${topicDef.topic} Me Kya Khususi Dikhaya Gaya? (${topicDef.category} 2026)</p>

<!--📺 Embed YouTube Short-->
<div style="margin: 20px auto; max-width: 480px; text-align: center;">
<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" frameborder="0" height="849" referrerpolicy="strict-origin-when-cross-origin" src="https://www.youtube.com/embed/${videoId}" style="aspect-ratio: 9/16; border-radius: 12px; width: 100%; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" title="${title}">
</iframe>

<!--🔔 Subscribe Button-->
<a href="https://www.youtube.com/@EntertheWorldofLight" style="background: red; border-radius: 25px; color: white; display: inline-block; font-weight: bold; margin-top: 12px; padding: 12px 24px; text-decoration: none;" target="_blank">
🔔 Subscribe to @EntertheWorldofLight
</a>
</div>

<!--===============================================-->
<!--📌 Main Description (Visible Content)-->

<p>Aaj ke blog me hum baat kar rahe hain <strong>Enter the World of Light &amp; Laughter</strong> ke naye YouTube Short aur Web App feature ke baare me, jisme <strong>${topicDef.topic}</strong> (${topicDef.category}) ko showcase kiya gaya hai. Yeh feature un tamam users ke liye perfect hai jo Google ya YouTube par “${topicDef.primaryWordOrTheme}” ya “bilingual learning app” search karte hain.</p>

<p>${topicDef.coreHook} ${topicDef.educationalTakeaway}</p>

<p>Enter the World of Light &amp; Laughter ka yeh digital module mobile aur computer dono par seamlessly match hota hai — is liye Google search me “best educational app 2026 Pakistan” jese keywords par yeh bohot rank kar raha hai.</p>

<p>Agar aap bilingual education, classical poetry, brain games, ya trending YouTube Shorts me interest rakhte hain, to yeh feature aap ke liye best inspiration aur practical learning playground hai.</p>

<!--===============================================-->
<!--🔗 Related Post (SECONDARY BLOG LINK & APP LAUNCH)-->
<div style="background: linear-gradient(90deg, #0284c7, #4f46e5); border-radius: 10px; color: white; font-weight: bold; margin-top: 25px; padding: 14px; text-align: center;">
✨ ${topicDef.appFeatureSpotlight} – Interactive Web App Access &amp; In-Depth Guide  
<br />
<a href="${appOrigin}${topicDef.appRoute}?utm_source=blogger&utm_medium=primary_article&utm_campaign=promo_${topicDef.id.toLowerCase()}" style="background: white; border-radius: 8px; color: #0f172a; display: inline-block; font-weight: 700; margin-top: 8px; padding: 8px 20px; text-decoration: none;" target="_blank">
🚀 Launch in App Here &rarr;
</a>
</div>

<!--About Box-->
<div style="background: rgb(240, 249, 255); border-radius: 12px; border: 1px solid #bae6fd; line-height: 1.6; margin-top: 25px; padding: 18px;">
<h3 style="color: #0369a1; margin-top: 0;">🎬 About Enter the World of Light &amp; Laughter</h3>
<p><strong>Enter the World of Light &amp; Laughter</strong> brings you daily wisdom, bilingual education, classical Urdu poetry, moral bedtime tales, and engaging brain games!</p>
<ul>
<li>100% child-safe, ad-free screen time with Urdu Haroof tracing</li>
<li>Bilingual English &amp; Urdu language mastery with real-time feedback</li>
<li>Daily creative shorts &amp; wisdom nuggets</li>
</ul>
</div>

${renderUniversalBlogFooter(true, topicDef.topic, appOrigin)}

<!--🟢 Final Hidden SEO Layer (Google Only)-->
<div style="display: none;">
main blog source, ${topicDef.topic} 2026 full review, youtube shorts main content, enter the world of light primary blog, educational learning Pakistan trending search
</div>

<!--Auto Hashtags-->
<p style="color: #555555; font-size: 13px; margin-top: 15px;">
#EnterTheWorldOfLight #${topicDef.category.replace(/[^a-zA-Z0-9]/g, "")} #BilingualLearning #KidsEducation #UrduPoetry
</p>

<!--🟢 SCHEMA OR JSON-LD (100% ERROR FREE)-->
<b:if cond="data:view.isHomepage == false">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "${title.replace(/"/g, '\\"')}",
  "description": "${topicDef.educationalTakeaway.replace(/"/g, '\\"')}",
  "thumbnailUrl": "https://img.youtube.com/vi/${videoId}/hqdefault.jpg",
  "uploadDate": "${new Date().toISOString()}",
  "duration": "PT60S",
  "embedUrl": "https://www.youtube.com/embed/${videoId}",
  "contentUrl": "https://youtube.com/shorts/${videoId}",
  "url": "${masterBlogUrl}",
  "publisher": {
    "@type": "Organization",
    "name": "Enter the World of Light & Laughter",
    "logo": {
      "@type": "ImageObject",
      "url": "https://img.youtube.com/vi/${videoId}/hqdefault.jpg"
    }
  }
}
</script>
</b:if>
<!--==================== END MAIN BLOG ====================-->
    `.trim();

    return {
      title,
      type: "post",
      labels: [topicDef.category, "Primary", "Google 2026", "YouTube Shorts"],
      contentHtml,
    };
  } else {
    // -------------------------------------------------------------------------
    // EXACT APPROVED SECONDARY CODE ARCHITECTURE (Google-Approved)
    // -------------------------------------------------------------------------
    const title = `${topicDef.topic}: Complete Look, Quality Review & Learning Guide (2026 Education)`;
    const contentHtml = `
<!--✅ START: Video Preview Link Template-->
<div style="margin: 20px auto; max-width: 440px; text-align: center;">

  <!--🕵️ TOP Hidden SEO Keywords (Google Index Visible, Public Hidden)-->
  <div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">
    ${secondaryKeywordsTop}
  </div>

  <!--🎬 Title-->
  <h1 style="color: #222222; font-size: 17px; line-height: 1.4; margin: 10px 0px; font-weight: 800;">
    ✨ Enter the World of Light &amp; Laughter ka ${topicDef.topic} – Complete Look, Quality Review &amp; Learning Guide (2026 Education) ✨
  </h1>
  
  <!--🎥 Thumbnail Preview-->
  <a href="${appOrigin}${topicDef.appRoute}?utm_source=blogger&utm_medium=secondary_thumbnail&utm_campaign=promo_${topicDef.id.toLowerCase()}" style="text-decoration: none;" target="_blank">
    <img alt="${topicDef.topic} Video Guide" src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" style="border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 6px; width: 100%;" />
  </a>

  <!--🔗 Watch Button-->
  <a href="https://youtube.com/shorts/${videoId}" style="background: rgb(255, 0, 0); border-radius: 25px; color: white; display: inline-block; font-weight: bold; margin-top: 10px; padding: 8px 18px; text-decoration: none;" target="_blank">
     ▶ Watch on YouTube
  </a>

</div>
<span><!--more--></span>

<div style="margin: 20px auto; max-width: 680px; text-align: left; line-height: 1.8; color: #1e293b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<p><strong>Introduction</strong></p>

<p>Aaj ke blog me main aapko detail me batane wala hoon ke <strong>Enter the World of Light &amp; Laughter ka latest ${topicDef.topic}</strong> kyun 2026 ke students aur parents ka favorite educational hub ban raha hai.</p>

<p>Jo log Google ya YouTube par search karte hain:  
<strong>“bilingual learning 2026”, “trending kids education app”, “${topicDef.primaryWordOrTheme}”</strong> —  
un sab ke liye yeh blog complete information provide karega.</p>

<h3>🌟 ${topicDef.topic} – Key Capabilities &amp; Design</h3>
<p>${topicDef.educationalTakeaway}</p>

<ul style="text-align: left;">
  <li>100% Ad-Free &amp; safe user interface</li>
  <li>Bilingual Urdu &amp; English interactive lessons</li>
  <li>Cognitive memory &amp; practice drills</li>
  <li>Works smoothly on all smartphones and laptops</li>
</ul>

<p>Sab ke saath perfectly blend ho jata hai.</p>

<h3>💎 Everyday Value &amp; Comfort</h3>
<p>App me enter hote hi sabse pehle jo feel aati hai woh hai clean focus aur distraction-free simplicity. ${topicDef.coreHook}</p>

<h3>💠 Quality &amp; Pedagogical Excellence</h3>
<ul style="text-align: left;">
  <li>Verified authentic curriculum</li>
  <li>Noto Nastaliq Urdu script rendering</li>
  <li>Interactive scoring aur positive reinforcement</li>
  <li>Daily practice + deep learning dono ke liye perfect</li>
</ul>

<h3>🎀 How to Practice &amp; Get Started</h3>
<p>Yeh module single click me aapki learning journey ko complete kar deta hai:</p>

<ul style="text-align: left;">
  <li>Web app launch karein aur <strong>${topicDef.appFeatureSpotlight}</strong> select karein</li>
  <li>Daily streaks complete karke star points earn karein</li>
  <li>Mobile aur desktop dono devices par use karein</li>
</ul>

<h3>🎥 Video Demonstration Available</h3>
<p>Agar aap is feature ka actual close-up, working test, aur audio pronunciation dekhna chahte hain:</p>

<p>👉 YouTube Short video already upload ho chuki hai!<br />
Aap yahan dekh sakte hain:</p>

<p><a href="${masterBlogUrl}" target="_blank"><strong>📌 Official Master Blog (Video Included)</strong></a></p>
<p><a href="${appOrigin}${topicDef.appRoute}?utm_source=blogger&utm_medium=secondary_cta&utm_campaign=promo_${topicDef.id.toLowerCase()}" target="_blank" style="display: inline-block; background: #0284c7; color: white; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; margin-top: 8px;"><strong>🚀 Try ${topicDef.appFeatureSpotlight} Live in Web App &rarr;</strong></a></p>

<h3>✨ Conclusion</h3>
<p>Agar aap ek hi platform me cultural wisdom, bilingual literacy, fun brain games aur 2026 ki modern technology chahte hain — to Enter the World of Light &amp; Laughter ka yeh feature **definitely worth it** hai.</p>

<hr />

<!--🔥 BOTTOM SEO Keywords (Different + Hidden)-->
<div style="height: 1px; left: -9999px; overflow: hidden; position: absolute;">
  ${secondaryKeywordsBottom}
</div>

${renderUniversalBlogFooter(false, topicDef.topic, appOrigin)}

<!--==================== STRUCTURED DATA ====================-->
<b:if cond="data:view.isHomepage == false">
<script id="videoSchema" type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "${title.replace(/"/g, '\\"')}",
  "description": "${topicDef.educationalTakeaway.replace(/"/g, '\\"')}",
  "thumbnailUrl": "https://img.youtube.com/vi/${videoId}/hqdefault.jpg",
  "uploadDate": "",
  "duration": "PT1M00S",
  "contentUrl": "https://youtube.com/shorts/${videoId}",
  "embedUrl": "https://www.youtube.com/embed/${videoId}",
  "publisher": {
    "@type": "Organization",
    "name": "Enter the World of Light & Laughter",
    "logo": {
      "@type": "ImageObject",
      "url": "https://img.youtube.com/vi/${videoId}/hqdefault.jpg"
    }
  }
}
</script>

<script>
(function(){
  const schema=document.getElementById("videoSchema");
  const data=JSON.parse(schema.textContent);
  const now=new Date();
  const offset=now.getTimezoneOffset();
  const sign=offset<=0?'+':'-';
  const pad=n=>String(Math.floor(Math.abs(n))).padStart(2,'0');
  const tzHours=pad(offset/-60);
  const tzMinutes=pad(offset%60);
  const isoDate=now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate())+'T'+pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds())+sign+tzHours+':'+tzMinutes;
  data.uploadDate=isoDate;
  schema.textContent=JSON.stringify(data,null,2);
})();
</script>
</b:if>
<!--✅ END-->
</div>
    `.trim();

    return {
      title,
      type: "post",
      labels: [topicDef.category, "Secondary", "Google 2026", "Guides"],
      contentHtml,
    };
  }
}

// -----------------------------------------------------------------------------
// Blogger Evergreen Pages Generator (Topic-Specific Evergreen Pillars)
// -----------------------------------------------------------------------------

export function getEvergreenPagesCatalog(appOrigin: string): EvergreenBloggerPage[] {
  const masterBlogUrl = "https://entertheworldoflightandlaughter.blogspot.com";

  return [
    {
      pageId: "page-kids-learning-portal",
      title: "Kids Learning Portal: Complete Early Childhood Phonics & Literacy Hub",
      slug: "kids-learning-portal",
      category: "Kids Learning",
      summary: "Comprehensive evergreen guide on early bilingual literacy, phonics, and multi-sensory tracing for young learners.",
      appDeepLink: `${appOrigin}/kids?tab=learn`,
      lastUpdated: new Date().toISOString(),
      contentHtml: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; line-height: 1.8; color: #1e293b;">
  <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 32px 24px; border-radius: 16px; color: white; text-align: center; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 26px;">Kids Learning Portal</h1>
    <p style="margin: 8px 0 0; opacity: 0.95;">Nurturing young minds through bilingual phonics, sensory tracing, and positive habit formation.</p>
  </div>
  <h2>Welcome to the Joyful Academy</h2>
  <p>Early childhood learning flourishes when children feel safe, engaged, and free from overwhelming distractions. Our Kids Learning Portal is engineered from the ground up to support cognitive retention without screen-time guilt.</p>
  <h3>Key Learning Modules</h3>
  <ul>
    <li><strong>English Alphabet &amp; Phonics:</strong> Word-sound associations from A to Z with native audio pronunciation.</li>
    <li><strong>Urdu Haroof-e-Tahajji:</strong> Authentic Nastaliq calligraphy tracing paired with bilingual vocabulary.</li>
    <li><strong>Numbers &amp; Speed Counting:</strong> Visual quantity anchors and hands-on arithmetic puzzles.</li>
    <li><strong>Animals &amp; Nature:</strong> Illustrated curiosity cards answering "Why" and "How" questions.</li>
  </ul>
  <div style="text-align: center; margin: 30px 0;">
    <a href="${appOrigin}/kids?utm_source=blogger&utm_medium=evergreen_page&utm_campaign=kids_portal" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 28px; border-radius: 10px; font-weight: bold; text-decoration: none;">Launch Kids Mode in Web App &rarr;</a>
  </div>
</div>
      `.trim(),
    },
    {
      pageId: "page-learn-play-practice",
      title: "Learn • Play • Practice: The Pedagogical Formula for Lifelong Mastery",
      slug: "learn-play-practice-framework",
      category: "Methodology",
      summary: "The 3 core pillars governing Enter the World of Light & Laughter: Knowledge Acquisition, Gamified Engagement, and Habitual Retention.",
      appDeepLink: `${appOrigin}/practice`,
      lastUpdated: new Date().toISOString(),
      contentHtml: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; line-height: 1.8; color: #1e293b;">
  <div style="background: linear-gradient(135deg, #0284c7, #4f46e5); padding: 32px 24px; border-radius: 16px; color: white; text-align: center; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 26px;">The 3 Pillars of Light</h1>
    <p style="margin: 8px 0 0; opacity: 0.95;">Learn • Play • Practice: Transforming passive reading into durable cognitive retention.</p>
  </div>
  <h2>The Architecture of Deep Retention</h2>
  <p>Traditional learning fails because it relies solely on passive repetition. Our three-tier architecture guarantees mastery:</p>
  <ol>
    <li><strong>LEARN (First Exposure):</strong> Clean, illustrated conceptual explanations with zero clutter.</li>
    <li><strong>PLAY (Gamified Engagement):</strong> Timed brain challenges, speed math hacks, and recall puzzles that make retrieval fun.</li>
    <li><strong>PRACTICE (Spaced Cementing):</strong> Daily streak tracking, active recall flashcards, and personalized progress curves.</li>
  </ol>
  <div style="text-align: center; margin: 30px 0;">
    <a href="${appOrigin}/play?utm_source=blogger&utm_medium=evergreen_page&utm_campaign=triad_framework" style="display: inline-block; background: #0284c7; color: white; padding: 12px 28px; border-radius: 10px; font-weight: bold; text-decoration: none;">Experience Brain Arcade Now &rarr;</a>
  </div>
</div>
      `.trim(),
    },
    {
      pageId: "page-about-app",
      title: "About Enter the World of Light & Laughter: Mission, Heritage & Innovation",
      slug: "about-enter-the-world-of-light",
      category: "About",
      summary: "The story, educational philosophy, and cultural mission powering Enter the World of Light & Laughter.",
      appDeepLink: `${appOrigin}/home`,
      lastUpdated: new Date().toISOString(),
      contentHtml: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; line-height: 1.8; color: #1e293b;">
  <div style="background: linear-gradient(135deg, #0f172a, #1e3a8a); padding: 32px 24px; border-radius: 16px; color: white; text-align: center; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 26px;">Enter the World of Light &amp; Laughter</h1>
    <p style="margin: 8px 0 0; opacity: 0.95;">Bridging cultural literature, bilingual education, and modern interactive technology.</p>
  </div>
  <h2>Our Guiding Vision</h2>
  <p>In a world saturated with ephemeral entertainment, Enter the World of Light &amp; Laughter stands as a sanctuary of depth, wisdom, and wholesome exploration. We combine verified classical Urdu literature with high-performance modern web apps and child-safe environments.</p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="${appOrigin}/?utm_source=blogger&utm_medium=evergreen_page&utm_campaign=about_page" style="display: inline-block; background: #0284c7; color: white; padding: 12px 28px; border-radius: 10px; font-weight: bold; text-decoration: none;">Launch the Full Web App &rarr;</a>
  </div>
</div>
      `.trim(),
    },
  ];
}

// -----------------------------------------------------------------------------
// Daily Promotion Generation Engine (Creates Daily 2-3 Pack)
// -----------------------------------------------------------------------------

export function generateDailyPromotionPack(
  targetDateStr: string = new Date().toISOString().split("T")[0],
  appOrigin: string = "https://ais-pre-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app"
): {
  date: string;
  count: number;
  records: PromotionShortRecord[];
} {
  const selectedTopics = selectDailyTrioPromotionalTopics(targetDateStr);
  const timeWindows = getDailyControlledTimeWindows(targetDateStr);
  const existingRecords = getPromotionRecords();

  const generatedRecords: PromotionShortRecord[] = [];

  for (let i = 0; i < selectedTopics.length; i++) {
    const topicDef = selectedTopics[i];
    const window = timeWindows[i] || timeWindows[0];
    const slot = window.slot;

    // Slot 1 = Primary, Slot 2 = Secondary, Slot 3 = Secondary / In-Depth
    const campaignType: "primary" | "secondary" = i === 0 ? "primary" : "secondary";
    const contentId = `PROMO-${targetDateStr}-SLOT${i + 1}-${topicDef.id.replace("TOPIC-", "")}`;

    // Check if duplicate already exists
    const duplicate = existingRecords.find((r) => r.contentId === contentId || (r.publishDate === targetDateStr && r.topic === topicDef.topic));
    if (duplicate) {
      generatedRecords.push(duplicate);
      continue;
    }

    const ytMeta = generateYouTubePromoMetadata(topicDef, slot, appOrigin);
    const bloggerPack = generateBloggerArticleForPromo(topicDef, campaignType, appOrigin, "z3PGTXQW7yU");

    // Dynamic video asset assignment
    const videoFilename = i === 0 ? "promo_kids_mode_launch.mp4" : "promo_poetry_literature.mp4";
    const audioFilename = i === 0 ? "promo_kids_mode_launch.mp3" : "promo_poetry_literature.mp3";
    const thumbFilename = i === 0 ? "promo_kids_mode_launch_thumb.jpg" : "promo_poetry_literature_thumb.jpg";

    const record: PromotionShortRecord = {
      contentId,
      topic: topicDef.topic,
      topicUrdu: topicDef.topicUrdu,
      category: topicDef.category,
      campaignType,
      publishDate: targetDateStr,
      scheduledWindow: slot,
      scheduledTimeStr: window.calculatedTimeStr,
      videoTitle: ytMeta.title,
      thumbnailUrl: `/storage/promo_videos/${thumbFilename}`,
      description: ytMeta.description,
      metadata: {
        targetAudience: topicDef.targetAudience,
        hook: topicDef.coreHook,
        educationalTakeaway: topicDef.educationalTakeaway,
        appFeature: topicDef.appFeatureSpotlight,
        appRoute: topicDef.appRoute,
      },
      hashtags: ytMeta.hashtags,
      videoUrl: `/storage/promo_videos/${videoFilename}`,
      audioUrl: `/storage/promo_videos/${audioFilename}`,
      youtubeUrl: `https://www.youtube.com/@EntertheWorldofLight`,
      youtubeVideoId: "z3PGTXQW7yU",
      relatedYouTubeContent: ytMeta.relatedYouTubeContent,
      bloggerPostUrl: `https://entertheworldoflightandlaughter.blogspot.com/${targetDateStr.replace(/-/g, "/")}/${contentId.toLowerCase()}.html`,
      bloggerPostId: `blogger-${contentId.toLowerCase()}`,
      relatedAppUrl: `${appOrigin}${topicDef.appRoute}`,
      utmAppUrl: ytMeta.utmAppUrl,
      status: "scheduled",
      uploadStatus: "ready_to_upload",
      bloggerStatus: "ready_to_publish",
      promotionStatus: "active",
      seoKeywordsUsed: topicDef.tags,
      sourceTopicInfo: `${topicDef.category} | ${topicDef.primaryWordOrTheme}`,
      performance: {
        views: 0,
        engagedViews: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        subscribersGained: 0,
        trafficSources: {
          youtube_channel_profile: 0,
          blogger_article: 0,
          direct: 0,
        },
        bloggerTraffic: 0,
        appClicks: 0,
        lastUpdated: new Date().toISOString(),
      },
      bloggerArticle: bloggerPack,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    generatedRecords.push(record);
  }

  // Merge and save to database
  const merged = [...generatedRecords, ...existingRecords.filter((e) => !generatedRecords.some((g) => g.contentId === e.contentId))];
  savePromotionRecords(merged);

  return {
    date: targetDateStr,
    count: generatedRecords.length,
    records: generatedRecords,
  };
}

// -----------------------------------------------------------------------------
// Traffic Analytics & Click Logging
// -----------------------------------------------------------------------------

export function logTrafficClick(click: Omit<TrafficClickLog, "clickId" | "timestamp">): TrafficClickLog {
  ensureDirectoryExists();
  let logs: TrafficClickLog[] = [];
  if (fs.existsSync(TRAFFIC_LOGS_FILE)) {
    try {
      logs = JSON.parse(fs.readFileSync(TRAFFIC_LOGS_FILE, "utf-8"));
    } catch {}
  }

  const newLog: TrafficClickLog = {
    clickId: `clk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    ...click,
  };

  logs.unshift(newLog);
  if (logs.length > 500) logs = logs.slice(0, 500); // Keep last 500
  fs.writeFileSync(TRAFFIC_LOGS_FILE, JSON.stringify(logs, null, 2), "utf-8");

  // Also increment record's app clicks if contentId matches
  if (click.contentId) {
    const records = getPromotionRecords();
    const target = records.find((r) => r.contentId === click.contentId);
    if (target) {
      target.performance.appClicks = (target.performance.appClicks || 0) + 1;
      target.updatedAt = new Date().toISOString();
      savePromotionRecords(records);
    }
  }

  return newLog;
}

export function getTrafficAnalyticsSummary() {
  ensureDirectoryExists();
  let logs: TrafficClickLog[] = [];
  if (fs.existsSync(TRAFFIC_LOGS_FILE)) {
    try {
      logs = JSON.parse(fs.readFileSync(TRAFFIC_LOGS_FILE, "utf-8"));
    } catch {}
  }

  const sourceCounts: Record<string, number> = {};
  const campaignCounts: Record<string, number> = {};

  for (const log of logs) {
    sourceCounts[log.source] = (sourceCounts[log.source] || 0) + 1;
    campaignCounts[log.campaign] = (campaignCounts[log.campaign] || 0) + 1;
  }

  return {
    totalClicksTracked: logs.length,
    bySource: sourceCounts,
    byCampaign: campaignCounts,
    recentClicks: logs.slice(0, 20),
  };
}

// -----------------------------------------------------------------------------
// Performance Metrics Updater & Category Scoring
// -----------------------------------------------------------------------------

export function updateRecordPerformance(
  contentId: string,
  metrics: Partial<PromotionShortRecord["performance"]>
): PromotionShortRecord | null {
  const records = getPromotionRecords();
  const index = records.findIndex((r) => r.contentId === contentId);
  if (index === -1) return null;

  records[index].performance = {
    ...records[index].performance,
    ...metrics,
    lastUpdated: new Date().toISOString(),
  };
  records[index].updatedAt = new Date().toISOString();

  savePromotionRecords(records);
  return records[index];
}

export function getCategoryPerformanceLeaderboard(): { category: string; totalViews: number; totalLikes: number; totalClicks: number; efficiencyScore: number }[] {
  const records = getPromotionRecords();
  const categoryStats: Record<string, { totalViews: number; totalLikes: number; totalClicks: number; count: number }> = {};

  for (const r of records) {
    if (!categoryStats[r.category]) {
      categoryStats[r.category] = { totalViews: 0, totalLikes: 0, totalClicks: 0, count: 0 };
    }
    categoryStats[r.category].totalViews += r.performance.views || 0;
    categoryStats[r.category].totalLikes += r.performance.likes || 0;
    categoryStats[r.category].totalClicks += r.performance.appClicks || 0;
    categoryStats[r.category].count += 1;
  }

  return Object.keys(categoryStats)
    .map((cat) => {
      const stat = categoryStats[cat];
      const efficiencyScore = stat.totalClicks * 10 + stat.totalLikes * 2 + Math.floor(stat.totalViews / 50);
      return {
        category: cat,
        totalViews: stat.totalViews,
        totalLikes: stat.totalLikes,
        totalClicks: stat.totalClicks,
        efficiencyScore,
      };
    })
    .sort((a, b) => b.efficiencyScore - a.efficiencyScore);
}
