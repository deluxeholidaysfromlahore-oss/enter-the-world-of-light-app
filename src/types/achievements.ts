export type ActivityCategory =
  | 'learning'
  | 'reading'
  | 'playing'
  | 'practice'
  | 'alphabet'
  | 'stories'
  | 'poetry'
  | 'quiz';

export interface UserStats {
  userId: string;
  totalPoints: number;
  learningPoints: number;
  learningCount: number;
  readingPoints: number;
  readingCount: number;
  urduStoriesRead: number;
  englishStoriesRead: number;
  playingPoints: number;
  quizzesCompleted: number;
  gamesPlayed: number;
  alphabetSoundsMastered: number;
  streakDays: number;
  lastActiveDate: string;
  unlockedBadgeIds: string[];
  badgeUnlockedDates: Record<string, string>;
}

export interface MilestoneBadge {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  category: 'reading' | 'alphabet' | 'streak' | 'learning' | 'playing' | 'special';
  icon: string;
  xpReward: number;
  targetCount: number;
  currentCount: number;
  progressPercent: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  badgeGradient: string;
  accentColor: string;
}

export interface LearningProgressTier {
  level: number;
  name: string;
  nameUrdu: string;
  minXp: number;
  maxXp: number;
  badgeIcon: string;
  badgeColor: string;
  gradient: string;
  tagline: string;
  taglineUrdu: string;
  description: string;
}

export interface AchievementNotification {
  id: string;
  badgeId: string;
  title: string;
  titleUrdu: string;
  description: string;
  icon: string;
  xpReward: number;
  timestamp: string;
}
