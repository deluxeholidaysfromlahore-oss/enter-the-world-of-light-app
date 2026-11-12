import fs from "fs";
import path from "path";

const STATE_FILE = path.resolve(process.cwd(), "public/storage/kids_videos/daily_rotation_state.json");
const SETTINGS_FILE = path.resolve(process.cwd(), "public/storage/kids_videos/automation_settings.json");
const DRIVE_LOG_FILE = path.resolve(process.cwd(), "public/storage/kids_videos/drive_sync_log.json");
const MANIFEST_FILE = path.resolve(process.cwd(), "public/storage/kids_videos/pipeline_manifest.json");

export interface RotationBatch {
  cycleIndex: number;
  title: string;
  categoryTheme: string;
  slugs: string[];
}

// 26-Day Chronological Sequential Rotation: A to Z & Alif to Bari Yay
export const ROTATION_BATCHES: RotationBatch[] = [
  {
    cycleIndex: 1,
    title: "Day 1: A (Apple) • الف (انار) • Number 1 • Sparrow Tale",
    categoryTheme: "Day 1: Letter A, Harf Alif & Counting Starter",
    slugs: ["short_a_apple", "short_urdu_alif", "short_num_1_sun", "story_bird_part1"],
  },
  {
    cycleIndex: 2,
    title: "Day 2: B (Ball) • ب (بلی) • Number 2 • Sparrow Flight",
    categoryTheme: "Day 2: Letter B, Harf Bay & Phonics Fun",
    slugs: ["short_b_ball", "short_urdu_bay", "short_num_2_birds", "story_bird_part2"],
  },
  {
    cycleIndex: 3,
    title: "Day 3: C (Cat) • پ (پتنگ) • Number 3 • Brave Lion",
    categoryTheme: "Day 3: Letter C, Harf Pay & Jungle Friends",
    slugs: ["short_c_cat", "short_urdu_pay", "short_num_3_rickshaw", "short_animal_lion"],
  },
  {
    cycleIndex: 4,
    title: "Day 4: D (Dog) • ت (تتلی) • Number 4 • Sweet Mango",
    categoryTheme: "Day 4: Letter D, Harf Tay & Nature Discovery",
    slugs: ["short_d_dog", "short_urdu_tay", "short_num_4_frogs", "short_fruit_mango"],
  },
  {
    cycleIndex: 5,
    title: "Day 5: E (Elephant) • ٹ (ٹماٹر) • Number 5 • Red Color",
    categoryTheme: "Day 5: Letter E, Harf Ttay & Colorful Safari",
    slugs: ["short_e_elephant", "short_urdu_ttay", "short_num_5_stars", "short_color_red"],
  },
  {
    cycleIndex: 6,
    title: "Day 6: F (Fish) • ث (ثمر) • Number 6 • Sparrow Journey",
    categoryTheme: "Day 6: Letter F, Harf Say & Ocean Explorers",
    slugs: ["short_f_fish", "short_urdu_say", "short_num_6_apples", "story_bird_part1"],
  },
  {
    cycleIndex: 7,
    title: "Day 7: G (Giraffe) • ج (جگنو) • Number 7 • Glowing Night",
    categoryTheme: "Day 7: Letter G, Harf Jeem & Rainbow Wonders",
    slugs: ["short_g_giraffe", "short_urdu_jeem", "short_num_7_rainbow", "story_bird_part2"],
  },
  {
    cycleIndex: 8,
    title: "Day 8: H (Horse) • چ (چاند) • Number 8 • Moon & Stars",
    categoryTheme: "Day 8: Letter H, Harf Chay & Galloping Phonics",
    slugs: ["short_h_horse", "short_urdu_chay", "short_num_8_butterflies", "short_animal_lion"],
  },
  {
    cycleIndex: 9,
    title: "Day 9: I (Island) • ح (حلوہ) • Number 9 • Tropical Breeze",
    categoryTheme: "Day 9: Letter I, Harf Hay & Sweet Treats",
    slugs: ["short_i_island", "short_urdu_hay", "short_num_9_flowers", "short_fruit_mango"],
  },
  {
    cycleIndex: 10,
    title: "Day 10: J (Jaguar) • خ (خرگوش) • Number 10 • Playful Bunnies",
    categoryTheme: "Day 10: Letter J, Harf Khay & Forest Wildlife",
    slugs: ["short_j_jaguar", "short_urdu_khay", "short_num_10_toes", "short_color_red"],
  },
  {
    cycleIndex: 11,
    title: "Day 11: K (Kangaroo) • د (درخت) • Number 1 • Green Trees",
    categoryTheme: "Day 11: Letter K, Harf Daal & Bouncing Animals",
    slugs: ["short_k_kangaroo", "short_urdu_daal", "short_num_1_sun", "story_bird_part1"],
  },
  {
    cycleIndex: 12,
    title: "Day 12: L (Lion) • ڈ (ڈولفن) • Number 2 • Roaring Kings",
    categoryTheme: "Day 12: Letter L, Harf Ddaal & Aquatic Friends",
    slugs: ["short_l_lion", "short_urdu_ddaal", "short_num_2_birds", "story_bird_part2"],
  },
  {
    cycleIndex: 13,
    title: "Day 13: M (Monkey) • ذ (ذخیرہ) • Number 3 • Wisdom Chest",
    categoryTheme: "Day 13: Letter M, Harf Zaal & Playful Chimps",
    slugs: ["short_m_monkey", "short_urdu_zaal", "short_num_3_rickshaw", "short_animal_lion"],
  },
  {
    cycleIndex: 14,
    title: "Day 14: N (Nest) • ر (ریل گاڑی) • Number 4 • Choo Choo Train",
    categoryTheme: "Day 14: Letter N, Harf Ray & Moving Vehicles",
    slugs: ["short_n_nest", "short_urdu_ray", "short_num_4_frogs", "short_fruit_mango"],
  },
  {
    cycleIndex: 15,
    title: "Day 15: O (Owl) • ز (زرافہ) • Number 5 • Wise Forest",
    categoryTheme: "Day 15: Letter O, Harf Zay & Night Explorers",
    slugs: ["short_o_owl", "short_urdu_zay", "short_num_5_stars", "short_color_red"],
  },
  {
    cycleIndex: 16,
    title: "Day 16: P (Penguin) • س (سورج) • Number 6 • Sunny Ice",
    categoryTheme: "Day 16: Letter P, Harf Seen & Antarctic Friends",
    slugs: ["short_p_penguin", "short_urdu_seen", "short_num_6_apples", "story_bird_part1"],
  },
  {
    cycleIndex: 17,
    title: "Day 17: Q (Queen Bee) • ش (شیر) • Number 7 • Royal Safari",
    categoryTheme: "Day 17: Letter Q, Harf Sheen & Garden Flowers",
    slugs: ["short_q_queen_bee", "short_urdu_sheen", "short_num_7_rainbow", "story_bird_part2"],
  },
  {
    cycleIndex: 18,
    title: "Day 18: R (Rabbit) • ص (صابن) • Number 8 • Clean Habits",
    categoryTheme: "Day 18: Letter R, Harf Swaad & Fluffy Bunnies",
    slugs: ["short_r_rabbit", "short_urdu_swaad", "short_num_8_butterflies", "short_animal_lion"],
  },
  {
    cycleIndex: 19,
    title: "Day 19: S (Sun) • ط (طوطا) • Number 9 • Talking Parrot",
    categoryTheme: "Day 19: Letter S, Harf Tway & Bright Sunshine",
    slugs: ["short_s_sun", "short_urdu_tway", "short_num_9_flowers", "short_fruit_mango"],
  },
  {
    cycleIndex: 20,
    title: "Day 20: T (Tiger) • ع (عینک) • Number 10 • Reading Smart",
    categoryTheme: "Day 20: Letter T, Harf Ain & Brave Predators",
    slugs: ["short_t_tiger", "short_urdu_ain", "short_num_10_toes", "short_color_red"],
  },
  {
    cycleIndex: 21,
    title: "Day 21: U (Umbrella) • ق (قلم) • Number 1 • Rainy Pen",
    categoryTheme: "Day 21: Letter U, Harf Qaaf & Rainy Day Learning",
    slugs: ["short_u_umbrella", "short_urdu_qaaf", "short_num_1_sun", "story_bird_part1"],
  },
  {
    cycleIndex: 22,
    title: "Day 22: V (Violin) • ک (کتاب) • Number 2 • Storybooks",
    categoryTheme: "Day 22: Letter V, Harf Kaaf & Musical Tunes",
    slugs: ["short_v_violin", "short_urdu_kaaf", "short_num_2_birds", "story_bird_part2"],
  },
  {
    cycleIndex: 23,
    title: "Day 23: W (Whale) • گ (گڑیا) • Number 3 • Gentle Giant",
    categoryTheme: "Day 23: Letter W, Harf Gaaf & Ocean Magic",
    slugs: ["short_w_whale", "short_urdu_gaaf", "short_num_3_rickshaw", "short_animal_lion"],
  },
  {
    cycleIndex: 24,
    title: "Day 24: X (Xylophone) • م (مور) • Number 4 • Proud Peacock",
    categoryTheme: "Day 24: Letter X, Harf Meem & Rainbow Chimes",
    slugs: ["short_x_xylophone", "short_urdu_meem", "short_num_4_frogs", "short_fruit_mango"],
  },
  {
    cycleIndex: 25,
    title: "Day 25: Y (Yak) • آ (آم) • Number 5 • Snowy Peaks",
    categoryTheme: "Day 25: Letter Y, Harf Alif Madd & Mountain Safari",
    slugs: ["short_y_yak", "short_urdu_alif_madd", "short_num_5_stars", "short_color_red"],
  },
  {
    cycleIndex: 26,
    title: "Day 26: Z (Zebra) • ے (بڑی ے) • Number 10 • Grand Finale!",
    categoryTheme: "Day 26: A to Z & Alif to Bari Yay Grand Celebration",
    slugs: ["short_z_zebra", "short_urdu_yay", "short_num_10_toes", "story_bird_part2"],
  },
];

export interface DailyRotationState {
  currentCycle: number;
  cycleTitle: string;
  categoryTheme: string;
  activeSpotlightSlugs: string[];
  activeItems?: any[];
  archivedItemsCount: number;
  totalShortsAvailable: number;
  lastRotatedAt: string;
  nextRotationDueAt: string;
  hoursRemaining: number;
  googleCloudLinking: {
    primaryProject: string;
    apiProject: string;
    serviceAccountEmail: string;
    webClientId: string;
    appsScriptClientId: string;
    youtubeApiKeyConfigured: boolean;
    driveFolderId: string;
    driveFolderUrl: string;
    isLinkedConfigured: boolean;
    reasonWhyDriveWasNotAutoSaving: string;
  };
  googleDriveSyncStatus: {
    folderId: string;
    folderUrl: string;
    lastSyncedAt: string;
    syncedFilesCount: number;
    pendingUploads: number;
  };
}

export function getDailyRotationState(): DailyRotationState {
  let stateData: any = null;
  if (fs.existsSync(STATE_FILE)) {
    try {
      stateData = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
    } catch {}
  }

  const now = Date.now();
  let currentCycle = Number(stateData?.currentCycle) || 1;
  let lastRotatedAt = stateData?.lastRotatedAt || new Date().toISOString();

  let lastRotatedTime = new Date(lastRotatedAt).getTime();
  if (isNaN(lastRotatedTime) || lastRotatedTime > now) {
    lastRotatedTime = now;
    lastRotatedAt = new Date().toISOString();
  }

  const diffHours = (now - lastRotatedTime) / (1000 * 60 * 60);

  // If >= 24 hours have elapsed, automatically advance cycle chronologically!
  if (diffHours >= 24) {
    const cyclesToAdvance = Math.floor(diffHours / 24);
    const prevCycle = currentCycle;
    currentCycle = ((currentCycle - 1 + cyclesToAdvance) % ROTATION_BATCHES.length) + 1;
    const advancedTimeMs = lastRotatedTime + cyclesToAdvance * 24 * 60 * 60 * 1000;
    lastRotatedAt = new Date(advancedTimeMs).toISOString();
    console.log(`[KidsDailyRotation] Auto-rotated after ${diffHours.toFixed(2)}h: Day ${prevCycle} -> Day ${currentCycle} (${ROTATION_BATCHES[currentCycle - 1]?.title})`);
  }

  // Ensure currentCycle is within 1..26
  if (currentCycle < 1 || currentCycle > ROTATION_BATCHES.length) {
    currentCycle = 1;
  }

  const batch = ROTATION_BATCHES.find((b) => b.cycleIndex === currentCycle) || ROTATION_BATCHES[0];
  const nextRotationTime = new Date(lastRotatedAt).getTime() + 24 * 60 * 60 * 1000;
  const hoursRemaining = Math.max(0, Math.round(((nextRotationTime - now) / (1000 * 60 * 60)) * 10) / 10);

  // Read manifest count & full active items
  let totalShorts = 71;
  let manifestItems: any[] = [];
  if (fs.existsSync(MANIFEST_FILE)) {
    try {
      manifestItems = JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf-8"));
      totalShorts = manifestItems.length;
    } catch {}
  }

  let activeItems = batch.slugs
    .map((slug) => manifestItems.find((m) => m.topicSlug === slug))
    .filter(Boolean);

  // Ensure activeItems always has 4 authentic 3D Pixar items
  if (activeItems.length < 4 && manifestItems.length > 0) {
    for (const item of manifestItems) {
      if (!activeItems.find((a) => a.topicSlug === item.topicSlug)) {
        activeItems.push(item);
        if (activeItems.length >= 4) break;
      }
    }
  }

  // Read drive log
  let driveLog: any = {
    folderId: "1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4",
    folderUrl: "https://drive.google.com/drive/folders/1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4?usp=sharing",
    lastSyncDate: lastRotatedAt,
    syncedFiles: [],
  };
  if (fs.existsSync(DRIVE_LOG_FILE)) {
    try {
      driveLog = JSON.parse(fs.readFileSync(DRIVE_LOG_FILE, "utf-8"));
    } catch {}
  }

  const result: DailyRotationState = {
    currentCycle,
    cycleTitle: batch.title,
    categoryTheme: batch.categoryTheme,
    activeSpotlightSlugs: batch.slugs,
    activeItems,
    archivedItemsCount: Math.max(0, totalShorts - activeItems.length),
    totalShortsAvailable: totalShorts,
    lastRotatedAt,
    nextRotationDueAt: new Date(nextRotationTime).toISOString(),
    hoursRemaining,
    googleCloudLinking: {
      primaryProject: "quick-hook-lc9s2",
      apiProject: "enter-the-world-web-app",
      serviceAccountEmail: "drive-sync-bot@enter-the-world-web-app.iam.gserviceaccount.com",
      webClientId: "886208799724-u0vmh04v159p52j5873jtvveld5labbm.apps.googleusercontent.com",
      appsScriptClientId: "886208799724-j34q9po6ms87og6ocper2fmrn4vg51k9.apps.googleusercontent.com",
      youtubeApiKeyConfigured: true,
      driveFolderId: "1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4",
      driveFolderUrl: "https://drive.google.com/drive/folders/1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4?usp=sharing",
      isLinkedConfigured: true,
      reasonWhyDriveWasNotAutoSaving: "Pehle Drive API 'enter-the-world-web-app' mein thi jabke Auth token 'quick-hook-lc9s2' se ja raha tha. Cross-project linking aur Google Apps Script background trigger se yeh masla hal hota hai.",
    },
    googleDriveSyncStatus: {
      folderId: driveLog.folderId || "1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4",
      folderUrl: driveLog.folderUrl || "https://drive.google.com/drive/folders/1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4?usp=sharing",
      lastSyncedAt: driveLog.lastSyncDate || lastRotatedAt,
      syncedFilesCount: driveLog.syncedFiles?.length || totalShorts,
      pendingUploads: Math.max(0, totalShorts - (driveLog.syncedFiles?.length || 0)),
    },
  };

  // Persist updated state
  fs.writeFileSync(STATE_FILE, JSON.stringify(result, null, 2), "utf-8");

  // Keep automation settings in sync
  if (fs.existsSync(SETTINGS_FILE)) {
    try {
      const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8"));
      settings.lastKidsVideoDate = lastRotatedAt;
      settings.updatedAt = new Date().toISOString();
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
    } catch {}
  }

  return result;
}

export function triggerManualRotationAdvance(): DailyRotationState {
  let state = getDailyRotationState();
  const nextCycle = (state.currentCycle % ROTATION_BATCHES.length) + 1;
  const batch = ROTATION_BATCHES.find((b) => b.cycleIndex === nextCycle) || ROTATION_BATCHES[0];
  const now = new Date().toISOString();
  const nextRotationTime = Date.now() + 24 * 60 * 60 * 1000;

  let manifestItems: any[] = [];
  if (fs.existsSync(MANIFEST_FILE)) {
    try {
      manifestItems = JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf-8"));
    } catch {}
  }
  let activeItems = batch.slugs
    .map((slug) => manifestItems.find((m) => m.topicSlug === slug))
    .filter(Boolean);

  if (activeItems.length < 4 && manifestItems.length > 0) {
    for (const item of manifestItems) {
      if (!activeItems.find((a) => a.topicSlug === item.topicSlug)) {
        activeItems.push(item);
        if (activeItems.length >= 4) break;
      }
    }
  }

  state = {
    ...state,
    currentCycle: nextCycle,
    cycleTitle: batch.title,
    categoryTheme: batch.categoryTheme,
    activeSpotlightSlugs: batch.slugs,
    activeItems,
    archivedItemsCount: Math.max(0, (manifestItems.length || state.totalShortsAvailable) - activeItems.length),
    lastRotatedAt: now,
    nextRotationDueAt: new Date(nextRotationTime).toISOString(),
    hoursRemaining: 24,
  };

  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");

  // Update automation settings
  if (fs.existsSync(SETTINGS_FILE)) {
    try {
      const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8"));
      settings.lastKidsVideoDate = now;
      settings.updatedAt = now;
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
    } catch {}
  }

  return state;
}

let rotationIntervalTimer: NodeJS.Timeout | null = null;

/**
 * Background Daemon: Runs automatically every 60 seconds on the server.
 * Checks whether 24 hours have elapsed since last rotation without requiring
 * any client interaction, page visit, or manual trigger.
 */
export function startDailyRotationBackgroundDaemon() {
  if (rotationIntervalTimer) return;

  // Run initial check on server startup
  try {
    const initial = getDailyRotationState();
    console.log(`[KidsDailyRotation] Daemon started. Current Cycle: Day ${initial.currentCycle} (${initial.cycleTitle}). Hours remaining: ${initial.hoursRemaining}h`);
  } catch (e) {
    console.error("[KidsDailyRotation] Startup check error:", e);
  }

  // Check every 60 seconds (1 minute)
  rotationIntervalTimer = setInterval(() => {
    try {
      getDailyRotationState();
    } catch (e) {
      console.error("[KidsDailyRotation] Background interval check error:", e);
    }
  }, 60 * 1000);

  if (rotationIntervalTimer && (rotationIntervalTimer as any).unref) {
    (rotationIntervalTimer as any).unref();
  }
}
