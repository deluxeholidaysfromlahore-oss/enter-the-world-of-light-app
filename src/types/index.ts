export type ScreenType =
  | 'splash'
  | 'home'
  | 'learn'
  | 'play'
  | 'practice'
  | 'explore'
  | 'poetry'
  | 'stories'
  | 'videos'
  | 'shorts'
  | 'daily'
  | 'profile'
  | 'kids'
  | 'ai'
  | 'blogger'
  | 'admin';

export interface BrandLink {
  name: string;
  url: string;
  icon: string;
  color: string;
  description: string;
}

export interface ContentItem {
  id: string;
  title: string;
  titleUrdu?: string;
  category: string;
  subcategory?: string;
  description: string;
  descriptionUrdu?: string;
  author?: string;
  readTime?: string;
  duration?: string;
  views?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Ages';
  tags: string[];
  imageUrl?: string;
  gradient: string;
  isFeatured?: boolean;
  isNew?: boolean;
  rating?: number;
  contentBody?: string;
  contentBodyUrdu?: string;
  poetName?: string;
  videoUrl?: string;
  videoId?: string;
  embedUrl?: string;
  publishedAt?: string;
  thumbnailUrl?: string;
  isShort?: boolean;
  type?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionUrdu?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizItem {
  id: string;
  title: string;
  category: string;
  totalQuestions: number;
  timeLimit: string;
  level: string;
  xpReward: number;
  gradient: string;
  questions: QuizQuestion[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface DailyActivity {
  id: string;
  type: 'learning' | 'quiz' | 'poetry' | 'quote' | 'story' | 'challenge';
  title: string;
  titleUrdu?: string;
  subtitle: string;
  content: string;
  contentUrdu?: string;
  authorOrSource?: string;
  completed: boolean;
  xp: number;
}

export interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin' | 'kid';
  xp: number;
  streak: number;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfileData {
  uid: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  preferredLanguage?: 'en' | 'ur' | 'both';
  ageGroup?: 'kids' | 'teens' | 'adults' | 'all';
  badges?: string[];
  updatedAt?: string;
}

export interface FavoriteRecord {
  id: string;
  userId: string;
  contentId: string;
  contentType: string;
  title: string;
  createdAt: string;
}

export interface LearningProgressRecord {
  id: string;
  userId: string;
  moduleType: string;
  moduleId: string;
  score?: number;
  xpEarned?: number;
  completed: boolean;
  scrollProgress?: number;
  updatedAt?: string;
}

export interface WatchHistoryRecord {
  id: string;
  userId: string;
  videoId: string;
  title: string;
  watchedSeconds?: number;
  completed?: boolean;
  updatedAt: string;
}

export interface KidsProfileRecord {
  id: string;
  parentId: string;
  name: string;
  age?: number;
  avatar?: string;
  dailyLimitMinutes: number;
  lockedMode: boolean;
  createdAt: string;
}

export interface IntegrationServiceStatus {
  status: 'CONNECTED' | 'NOT CONNECTED' | 'REQUIRES MANUAL ACTION' | 'TEST FAILED';
  details: string;
  channelId?: string;
}

export interface IntegrationAuditReport {
  timestamp: string;
  services: {
    firebase: IntegrationServiceStatus;
    firestore: IntegrationServiceStatus;
    authentication: IntegrationServiceStatus;
    gemini: IntegrationServiceStatus;
    youtube: IntegrationServiceStatus;
  };
}

export type BloggerContentType = 'post' | 'page';
export type BloggerPublishStatus = 'draft' | 'published' | 'scheduled';

export interface BloggerItemRecord {
  id: string;
  type: BloggerContentType;
  title: string;
  titleUrdu?: string;
  slug: string;
  category?: string;
  labels: string[];
  youtubeShortId?: string;
  relatedContentId?: string;
  contentHtml: string;
  summary: string;
  status: BloggerPublishStatus;
  bloggerUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BloggerWorkflowPayload {
  workflowType: 'app_shorts_record_page' | 'shorts_app_post';
  title: string;
  titleUrdu?: string;
  category: string;
  appModule: 'poetry' | 'stories' | 'learn' | 'kids' | 'explore' | 'general';
  youtubeShortId?: string;
  shortScript?: {
    hook: string;
    body: string;
    callToAction: string;
    audioVoicePrompt?: string;
  };
  contentBodyText?: string;
  contentBodyUrdu?: string;
  labels: string[];
  status: BloggerPublishStatus;
}


