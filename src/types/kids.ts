export type KidsSectionType =
  | 'learn'
  | 'videos'
  | 'play'
  | 'practice'
  | 'stories'
  | 'create'
  | 'think'
  | 'grow'
  | 'music'
  | 'sunny'
  | 'myworld'
  | 'parent';

export interface KidsAudioItem {
  audioUrl?: string | null;
  audioTitle: string;
  audioType?: 'voice' | 'pronunciation' | 'effect' | 'story' | 'song';
  duration?: string;
  voiceLanguage?: 'en' | 'ur';
  textToSpeak?: string;
  soundType?: string;
}

export interface KidsLearnItem {
  id: string;
  title: string;
  titleUrdu: string;
  pronunciation?: string;
  emoji: string;
  category: string;
  description: string;
  descriptionUrdu: string;
  funFact?: string;
  funFactUrdu?: string;
  audioUrl?: string | null;
  sentences?: string[];
  exampleWords?: string[];
  letterCase?: string;
}

export interface KidsLearnCategory {
  id: string;
  name: string;
  nameUrdu: string;
  icon: string;
  badgeColor: string;
  items: KidsLearnItem[];
}

export interface KidsStoryItem {
  id: string;
  title: string;
  titleUrdu: string;
  category: string;
  subcategory: string;
  readTime: string;
  lengthCategory?: '3min' | '5min' | '10min' | 'longer';
  description: string;
  descriptionUrdu: string;
  contentEn: string;
  contentUrdu: string;
  moral: string;
  moralUrdu: string;
  gradient: string;
  audioUrl?: string | null;
  question: {
    question: string;
    questionUrdu: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  rewardStars: number;
}

export interface KidsPracticeItem {
  id: string;
  char: string;
  charUrdu?: string;
  name: string;
  nameUrdu: string;
  type: 'abc' | 'urdu' | 'number' | 'animal' | 'bird' | 'nature' | 'shape' | 'object';
  categoryGroup?: 'english' | 'urdu' | 'number' | 'animal' | 'bird' | 'nature' | 'shape';
  guideHint: string;
  guideHintUrdu: string;
  exampleWord: string;
  exampleWordUrdu: string;
  exampleEmoji: string;
  audioUrl?: string | null;
}

export interface KidsGrowItem {
  id: string;
  title: string;
  titleUrdu: string;
  category: 'emotions' | 'habits' | 'kindness' | 'safety' | 'sharing';
  emoji: string;
  description: string;
  descriptionUrdu: string;
  tips: string[];
  actionPrompt: string;
}

export interface KidsDailyQuestItem {
  id: string;
  title: string;
  titleUrdu: string;
  section: KidsSectionType;
  icon: string;
  stars: number;
  completed: boolean;
}

export interface KidsParentSettings {
  screenTimeMinutes: number; // 0 for unlimited, or 15, 30, 45, 60
  soundMuted: boolean;
  voiceEnabled: boolean;
  pin: string;
}

export interface KidsProgressData {
  stars: number;
  completedQuests: string[];
  lastActiveDate: string;
  streakDays: number;
  completedStories: string[];
  practicedLetters: string[];
  playedGames: string[];
  earnedBadges: string[];
}

export interface KidsNotificationItem {
  id: string;
  title: string;
  titleUrdu: string;
  message: string;
  messageUrdu: string;
  type: 'activity' | 'quest' | 'story' | 'badge' | 'streak' | 'practice' | 'parent';
  read: boolean;
  timestamp: string;
  icon: string;
}

export interface KidsSavedItem {
  id: string;
  contentId: string;
  title: string;
  titleUrdu: string;
  category: string;
  type: 'lesson' | 'story' | 'practice' | 'game';
  dateSaved: string;
  emoji?: string;
  isFavorite?: boolean;
  isSaved?: boolean;
}

export interface KidsRecentItem {
  id: string;
  contentId: string;
  title: string;
  titleUrdu: string;
  category: string;
  type: 'lesson' | 'story' | 'practice' | 'game';
  lastVisited: string;
  emoji?: string;
}

export interface KidsContinueItem {
  id: string;
  contentId: string;
  title: string;
  titleUrdu: string;
  category: string;
  section: KidsSectionType;
  progressPercent: number;
  lastVisited: string;
  emoji?: string;
}

