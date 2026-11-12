import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import {
  ActivityCategory,
  UserStats,
  MilestoneBadge,
  LearningProgressTier,
  AchievementNotification,
} from '../types/achievements';

const STATS_STORAGE_KEY = 'ewl_user_activity_points_stats_v2';
const CLAIMED_BADGES_KEY = 'ewl_unlocked_badges_v2';

const DEFAULT_STATS: UserStats = {
  userId: 'guest_user',
  totalPoints: 240,
  learningPoints: 80,
  learningCount: 3,
  readingPoints: 90,
  readingCount: 4,
  urduStoriesRead: 4,
  englishStoriesRead: 2,
  playingPoints: 70,
  quizzesCompleted: 2,
  gamesPlayed: 2,
  alphabetSoundsMastered: 2,
  streakDays: 2,
  lastActiveDate: new Date().toISOString().split('T')[0],
  unlockedBadgeIds: [],
  badgeUnlockedDates: {},
};

export const LEARNING_PROGRESS_TIERS: LearningProgressTier[] = [
  {
    level: 1,
    name: 'Curious Explorer',
    nameUrdu: 'ابتدائی سیاح',
    minXp: 0,
    maxXp: 249,
    badgeIcon: 'Compass',
    badgeColor: 'text-sky-600',
    gradient: 'from-sky-500 to-indigo-600',
    tagline: 'Beginning your journey through light & laughter',
    taglineUrdu: 'علم اور خوشی کا پہلا قدم',
    description: 'Explore lessons, read bilingual fables, and listen to authentic alphabet phonics.',
  },
  {
    level: 2,
    name: 'Active Learner',
    nameUrdu: 'متلاشیِ علم',
    minXp: 250,
    maxXp: 499,
    badgeIcon: 'Sparkles',
    badgeColor: 'text-indigo-600',
    gradient: 'from-indigo-500 to-purple-600',
    tagline: 'Expanding your vocabulary and reading comprehension',
    taglineUrdu: 'الفاظ اور کہانیاں سمجھنے کا سفر',
    description: 'Consistently completes activities, answers quizzes, and masters phonics sounds.',
  },
  {
    level: 3,
    name: 'Rising Scholar',
    nameUrdu: 'ہونہار طالبِ علم',
    minXp: 500,
    maxXp: 999,
    badgeIcon: 'Award',
    badgeColor: 'text-amber-600',
    gradient: 'from-amber-500 to-orange-600',
    tagline: 'Demonstrating rich bilingual skills and steady daily streak',
    taglineUrdu: 'اردو اور انگریزی میں کمال کی مہارت',
    description: 'Master of classical verses, Urdu stories, science quizzes, and writing practice.',
  },
  {
    level: 4,
    name: 'Knowledge Champion',
    nameUrdu: 'علم کا چیمپئن',
    minXp: 1000,
    maxXp: 1999,
    badgeIcon: 'Trophy',
    badgeColor: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-700',
    tagline: 'High fluency in literature, science, and phonetics',
    taglineUrdu: 'ادب، سائنس اور صوتیات میں نمایاں مقام',
    description: 'Outstanding dedication with over 1,000 XP points earned across all chambers.',
  },
  {
    level: 5,
    name: 'Grand Master of Light',
    nameUrdu: 'استادِ نور و حکمت',
    minXp: 2000,
    maxXp: 99999,
    badgeIcon: 'Crown',
    badgeColor: 'text-violet-600',
    gradient: 'from-violet-600 via-fuchsia-600 to-rose-600',
    tagline: 'Supreme milestone of wisdom, culture, and learning',
    taglineUrdu: 'علم، حکمت اور شعور کا اعلیٰ ترین درجہ',
    description: 'The highest tier of honor. True torchbearer inspiring future generations.',
  },
];

type StatsListener = (stats: UserStats) => void;
type BadgeListener = (badge: MilestoneBadge) => void;

class ActivityPointsService {
  private stats: UserStats;
  private listeners: Set<StatsListener> = new Set();
  private badgeListeners: Set<BadgeListener> = new Set();
  private isFirebaseSyncing: boolean = false;

  constructor() {
    this.stats = this.loadLocalStats();
    this.checkAndUpdateStreak();
  }

  private loadLocalStats(): UserStats {
    try {
      const data = localStorage.getItem(STATS_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          ...DEFAULT_STATS,
          ...parsed,
          badgeUnlockedDates: parsed.badgeUnlockedDates || {},
          unlockedBadgeIds: parsed.unlockedBadgeIds || [],
        };
      }
    } catch {
      // Fallback
    }
    return { ...DEFAULT_STATS };
  }

  private saveLocalStats(): void {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(this.stats));
    } catch {
      // Ignore
    }
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.getStats());
      } catch (e) {
        console.warn('Listener error in ActivityPointsService:', e);
      }
    });
  }

  public subscribe(listener: StatsListener): () => void {
    this.listeners.add(listener);
    listener(this.getStats());
    return () => this.listeners.delete(listener);
  }

  public onBadgeUnlocked(listener: BadgeListener): () => void {
    this.badgeListeners.add(listener);
    return () => this.badgeListeners.delete(listener);
  }

  public getStats(): UserStats {
    return { ...this.stats };
  }

  public getCurrentTier(): LearningProgressTier {
    const xp = this.stats.totalPoints;
    const tier =
      LEARNING_PROGRESS_TIERS.slice()
        .reverse()
        .find((t) => xp >= t.minXp) || LEARNING_PROGRESS_TIERS[0];
    return tier;
  }

  public getNextTier(): LearningProgressTier | null {
    const current = this.getCurrentTier();
    return LEARNING_PROGRESS_TIERS.find((t) => t.level === current.level + 1) || null;
  }

  public getTierProgress(): { currentXp: number; targetXp: number; percent: number } {
    const currentTier = this.getCurrentTier();
    const nextTier = this.getNextTier();

    if (!nextTier) {
      return { currentXp: this.stats.totalPoints, targetXp: this.stats.totalPoints, percent: 100 };
    }

    const range = nextTier.minXp - currentTier.minXp;
    const progress = this.stats.totalPoints - currentTier.minXp;
    const percent = Math.min(100, Math.max(0, Math.round((progress / range) * 100)));

    return {
      currentXp: this.stats.totalPoints,
      targetXp: nextTier.minXp,
      percent,
    };
  }

  public getBadges(): MilestoneBadge[] {
    const s = this.stats;

    const badges: MilestoneBadge[] = [
      {
        id: 'badge-urdu-10-stories',
        title: 'Urdu Dastaan Master',
        titleUrdu: 'اردو داستان گو',
        description: 'Read 10 rich Urdu stories & fables across the library',
        descriptionUrdu: 'کتاب خانے سے دس سبق آموز اردو کہانیاں پڑھیں',
        category: 'reading',
        icon: 'BookOpen',
        xpReward: 150,
        targetCount: 10,
        currentCount: s.urduStoriesRead,
        progressPercent: Math.min(100, Math.round((s.urduStoriesRead / 10) * 100)),
        isUnlocked: s.urduStoriesRead >= 10 || s.unlockedBadgeIds.includes('badge-urdu-10-stories'),
        unlockedAt: s.badgeUnlockedDates['badge-urdu-10-stories'],
        badgeGradient: 'from-amber-500 via-orange-500 to-rose-600',
        accentColor: 'text-amber-600',
      },
      {
        id: 'badge-master-5-alphabets',
        title: 'Phonics & Alphabet Virtuoso',
        titleUrdu: 'صوتیات کا استاد',
        description: 'Master 5 alphabet phonics sounds in Kids & Learn section',
        descriptionUrdu: 'صوتیات اور حروف کی پانچ درست آوازیں سیکھیں',
        category: 'alphabet',
        icon: 'Volume2',
        xpReward: 120,
        targetCount: 5,
        currentCount: s.alphabetSoundsMastered,
        progressPercent: Math.min(100, Math.round((s.alphabetSoundsMastered / 5) * 100)),
        isUnlocked: s.alphabetSoundsMastered >= 5 || s.unlockedBadgeIds.includes('badge-master-5-alphabets'),
        unlockedAt: s.badgeUnlockedDates['badge-master-5-alphabets'],
        badgeGradient: 'from-sky-500 via-blue-600 to-indigo-600',
        accentColor: 'text-sky-600',
      },
      {
        id: 'badge-torchbearer-streak',
        title: 'Torchbearer of Light',
        titleUrdu: 'روشن چراغ',
        description: 'Maintain a 3-day continuous daily exploration streak',
        descriptionUrdu: 'مسلسل تین دن روزانہ تعلیمی سرگرمیوں میں حصہ لیں',
        category: 'streak',
        icon: 'Flame',
        xpReward: 100,
        targetCount: 3,
        currentCount: s.streakDays,
        progressPercent: Math.min(100, Math.round((s.streakDays / 3) * 100)),
        isUnlocked: s.streakDays >= 3 || s.unlockedBadgeIds.includes('badge-torchbearer-streak'),
        unlockedAt: s.badgeUnlockedDates['badge-torchbearer-streak'],
        badgeGradient: 'from-orange-500 to-red-600',
        accentColor: 'text-orange-600',
      },
      {
        id: 'badge-quiz-champion',
        title: 'Cosmos & Quiz Champion',
        titleUrdu: 'کوئز فاتح',
        description: 'Complete 3 interactive knowledge quizzes with success',
        descriptionUrdu: 'سائنس اور جنرل نالج کے تین کوئز کامیابی سے مکمل کریں',
        category: 'playing',
        icon: 'Trophy',
        xpReward: 150,
        targetCount: 3,
        currentCount: s.quizzesCompleted,
        progressPercent: Math.min(100, Math.round((s.quizzesCompleted / 3) * 100)),
        isUnlocked: s.quizzesCompleted >= 3 || s.unlockedBadgeIds.includes('badge-quiz-champion'),
        unlockedAt: s.badgeUnlockedDates['badge-quiz-champion'],
        badgeGradient: 'from-emerald-500 via-teal-600 to-cyan-700',
        accentColor: 'text-emerald-600',
      },
      {
        id: 'badge-curious-scholar',
        title: 'Curious Mind Scholar',
        titleUrdu: 'کائناتی محقق',
        description: 'Explore and finish 5 lessons in the Learning Hub',
        descriptionUrdu: 'لرننگ ہب کے پانچ جامع اسباق مکمل کریں',
        category: 'learning',
        icon: 'Sparkles',
        xpReward: 140,
        targetCount: 5,
        currentCount: s.learningCount,
        progressPercent: Math.min(100, Math.round((s.learningCount / 5) * 100)),
        isUnlocked: s.learningCount >= 5 || s.unlockedBadgeIds.includes('badge-curious-scholar'),
        unlockedAt: s.badgeUnlockedDates['badge-curious-scholar'],
        badgeGradient: 'from-indigo-500 via-purple-600 to-pink-600',
        accentColor: 'text-indigo-600',
      },
      {
        id: 'badge-500-xp',
        title: 'Rising Luminary',
        titleUrdu: 'چمکتا ستارہ',
        description: 'Accumulate 500 total XP points across all chambers',
        descriptionUrdu: 'مجموعی طور پر پانچ سو پوائنٹس (XP) حاصل کریں',
        category: 'special',
        icon: 'Award',
        xpReward: 200,
        targetCount: 500,
        currentCount: s.totalPoints,
        progressPercent: Math.min(100, Math.round((s.totalPoints / 500) * 100)),
        isUnlocked: s.totalPoints >= 500 || s.unlockedBadgeIds.includes('badge-500-xp'),
        unlockedAt: s.badgeUnlockedDates['badge-500-xp'],
        badgeGradient: 'from-yellow-400 via-amber-500 to-orange-600',
        accentColor: 'text-amber-500',
      },
      {
        id: 'badge-play-puzzles',
        title: 'Puzzles & Logic Pro',
        titleUrdu: 'ذہانت کا ماہر',
        description: 'Solve 3 memory matching or logic games in Play mode',
        descriptionUrdu: 'پلے موڈ میں میموری یا پزل گیمز کھیلیں اور جیتیں',
        category: 'playing',
        icon: 'Gamepad2',
        xpReward: 110,
        targetCount: 3,
        currentCount: s.gamesPlayed,
        progressPercent: Math.min(100, Math.round((s.gamesPlayed / 3) * 100)),
        isUnlocked: s.gamesPlayed >= 3 || s.unlockedBadgeIds.includes('badge-play-puzzles'),
        unlockedAt: s.badgeUnlockedDates['badge-play-puzzles'],
        badgeGradient: 'from-teal-500 to-emerald-600',
        accentColor: 'text-teal-600',
      },
      {
        id: 'badge-1000-xp',
        title: 'Grand Master of Light',
        titleUrdu: 'استادِ نور و حکمت',
        description: 'Reach 1,000 Total XP and enter the Hall of Wisdom',
        descriptionUrdu: 'ایک ہزار پوائنٹس مکمل کر کے اعلیٰ ترین مقام پائیں',
        category: 'special',
        icon: 'Crown',
        xpReward: 350,
        targetCount: 1000,
        currentCount: s.totalPoints,
        progressPercent: Math.min(100, Math.round((s.totalPoints / 1000) * 100)),
        isUnlocked: s.totalPoints >= 1000 || s.unlockedBadgeIds.includes('badge-1000-xp'),
        unlockedAt: s.badgeUnlockedDates['badge-1000-xp'],
        badgeGradient: 'from-purple-600 via-fuchsia-600 to-rose-600',
        accentColor: 'text-purple-600',
      },
    ];

    return badges;
  }

  private checkAndUpdateStreak(): void {
    const today = new Date().toISOString().split('T')[0];
    if (this.stats.lastActiveDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (this.stats.lastActiveDate === yesterday) {
      this.stats.streakDays += 1;
    } else {
      // Streak reset or fresh start
      this.stats.streakDays = Math.max(1, this.stats.streakDays > 0 ? 1 : 1);
    }
    this.stats.lastActiveDate = today;
    this.saveLocalStats();
  }

  public async trackActivity(params: {
    category: ActivityCategory;
    title?: string;
    itemId?: string;
    xpEarned?: number;
    isUrduStory?: boolean;
    isAlphabetSound?: boolean;
    isQuizSuccess?: boolean;
    isGamePlayed?: boolean;
    customNote?: string;
  }): Promise<{ xpEarned: number; newBadges: MilestoneBadge[] }> {
    const {
      category,
      title = 'General Activity',
      itemId = `act_${Date.now()}`,
      xpEarned,
      isUrduStory = false,
      isAlphabetSound = false,
      isQuizSuccess = false,
      isGamePlayed = false,
    } = params;

    this.checkAndUpdateStreak();

    // Determine Points awarded
    let points = xpEarned;
    if (points === undefined) {
      switch (category) {
        case 'learning':
          points = 25;
          break;
        case 'reading':
        case 'stories':
        case 'poetry':
          points = isUrduStory ? 35 : 20;
          break;
        case 'playing':
        case 'quiz':
          points = isQuizSuccess ? 40 : 25;
          break;
        case 'alphabet':
        case 'practice':
          points = 20;
          break;
        default:
          points = 15;
      }
    }

    // Apply points to categories
    this.stats.totalPoints += points;

    if (category === 'learning') {
      this.stats.learningPoints += points;
      this.stats.learningCount += 1;
    } else if (category === 'reading' || category === 'stories' || category === 'poetry') {
      this.stats.readingPoints += points;
      this.stats.readingCount += 1;
      if (isUrduStory) {
        this.stats.urduStoriesRead += 1;
      } else {
        this.stats.englishStoriesRead += 1;
      }
    } else if (category === 'playing' || category === 'quiz') {
      this.stats.playingPoints += points;
      if (isQuizSuccess || category === 'quiz') {
        this.stats.quizzesCompleted += 1;
      }
      if (isGamePlayed) {
        this.stats.gamesPlayed += 1;
      }
    } else if (category === 'alphabet' || category === 'practice') {
      this.stats.learningPoints += points;
      if (isAlphabetSound) {
        this.stats.alphabetSoundsMastered += 1;
      } else {
        this.stats.gamesPlayed += 1;
      }
    }

    // Check milestone badge unlocking
    const newBadges: MilestoneBadge[] = [];
    const currentBadges = this.getBadges();

    for (const badge of currentBadges) {
      if (badge.isUnlocked && !this.stats.unlockedBadgeIds.includes(badge.id)) {
        this.stats.unlockedBadgeIds.push(badge.id);
        const dateStr = new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
        this.stats.badgeUnlockedDates[badge.id] = dateStr;
        badge.unlockedAt = dateStr;
        newBadges.push(badge);

        // Notify badge listeners
        this.badgeListeners.forEach((fn) => {
          try {
            fn(badge);
          } catch (e) {
            console.warn('Error in badge listener:', e);
          }
        });
      }
    }

    this.saveLocalStats();

    // Synchronize to Firebase and backend asynchronously
    this.syncToFirebaseAndBackend({
      category,
      itemId,
      title,
      points,
      newBadges,
    }).catch((err) => {
      console.warn('Background sync error (safe fallback in place):', err);
    });

    return { xpEarned: points, newBadges };
  }

  // Quick Simulation method for testing & instant review
  public async simulateActivity(type: 'urdu_story' | 'alphabet_sound' | 'quiz' | 'lesson'): Promise<MilestoneBadge[]> {
    let res: { xpEarned: number; newBadges: MilestoneBadge[] };
    switch (type) {
      case 'urdu_story':
        res = await this.trackActivity({
          category: 'reading',
          isUrduStory: true,
          title: `Urdu Story #${this.stats.urduStoriesRead + 1}`,
          itemId: `urdu_story_${Date.now()}`,
          xpEarned: 30,
        });
        break;
      case 'alphabet_sound':
        res = await this.trackActivity({
          category: 'alphabet',
          isAlphabetSound: true,
          title: `Alphabet Sound #${this.stats.alphabetSoundsMastered + 1}`,
          itemId: `sound_${Date.now()}`,
          xpEarned: 25,
        });
        break;
      case 'quiz':
        res = await this.trackActivity({
          category: 'playing',
          isQuizSuccess: true,
          title: `Speed Quiz #${this.stats.quizzesCompleted + 1}`,
          itemId: `quiz_${Date.now()}`,
          xpEarned: 40,
        });
        break;
      case 'lesson':
        res = await this.trackActivity({
          category: 'learning',
          title: `Curriculum Lesson #${this.stats.learningCount + 1}`,
          itemId: `lesson_${Date.now()}`,
          xpEarned: 35,
        });
        break;
    }
    return res.newBadges;
  }

  // Sync to Firebase Firestore and Backend API
  private async syncToFirebaseAndBackend(params: {
    category: ActivityCategory;
    itemId: string;
    title: string;
    points: number;
    newBadges: MilestoneBadge[];
  }) {
    if (this.isFirebaseSyncing) return;
    this.isFirebaseSyncing = true;

    try {
      const user = auth.currentUser;
      const userId = user ? user.uid : 'guest_session';

      // 1. Sync to Firebase Firestore if logged in
      if (user) {
        // Save user progress in user-scoped 'progress' collection
        const progressDocId = `${user.uid}_${params.category}_${params.itemId.slice(-20)}`;
        try {
          await setDoc(
            doc(db, 'progress', progressDocId),
            {
              id: progressDocId,
              userId: user.uid,
              moduleType: params.category,
              moduleId: params.itemId,
              score: params.points,
              xpEarned: params.points,
              completed: true,
              title: params.title,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (e) {
          console.warn('Firestore progress save notice:', e);
        }

        // Save unlocked badges in user-scoped 'badges' collection
        for (const b of params.newBadges) {
          const badgeDocId = `${user.uid}_${b.id}`;
          try {
            await setDoc(
              doc(db, 'badges', badgeDocId),
              {
                id: badgeDocId,
                userId: user.uid,
                badgeId: b.id,
                title: b.title,
                unlockedAt: b.unlockedAt || new Date().toISOString(),
                milestone: b.description,
              },
              { merge: true }
            );
          } catch (e) {
            console.warn('Firestore badge save notice:', e);
          }
        }

        // Update total points in user record (matching firestore.rules isValidUser)
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            xp: this.stats.totalPoints,
            streak: this.stats.streakDays,
            updatedAt: new Date().toISOString(),
          });
        } catch {
          // May not exist yet, safe ignore
        }
      }

      // 2. Sync to Server-Side Express API route
      await fetch('/api/user/track-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          category: params.category,
          itemId: params.itemId,
          title: params.title,
          points: params.points,
          totalPoints: this.stats.totalPoints,
          stats: this.stats,
          unlockedBadgeIds: this.stats.unlockedBadgeIds,
        }),
      }).catch(() => {
        // Safe offline fallback
      });
    } finally {
      this.isFirebaseSyncing = false;
    }
  }

  // Load from Firebase when user logs in
  public async loadFromFirebase(userId: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        if (data.xp && data.xp > this.stats.totalPoints) {
          this.stats.totalPoints = data.xp;
        }
        if (data.streak && data.streak > this.stats.streakDays) {
          this.stats.streakDays = data.streak;
        }
        this.saveLocalStats();
      }
    } catch (e) {
      console.warn('Firebase load user stats notice:', e);
    }
  }
}

export const activityPointsService = new ActivityPointsService();
