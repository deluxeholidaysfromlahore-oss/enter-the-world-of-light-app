import { ScreenType } from './index';

export type FeaturePriority = 'high' | 'medium' | 'normal';
export type FeatureStatus = 'active' | 'new' | 'updated';
export type MarketingSlotType = 'morning' | 'afternoon' | 'evening';
export type MarketingCampaignType = 'primary' | 'secondary';

export type MarketingContentType =
  | 'Blog Article'
  | 'Useful Guide'
  | 'Feature Explanation'
  | 'Tutorial'
  | 'Educational Post'
  | 'Product Update'
  | 'Kids Mode Article'
  | 'How-To Article'
  | 'Free Resource'
  | 'Feature Use Case'
  | 'App Tip';

export interface FeaturePromotionStats {
  totalPromotions: number;
  lastPromotedAt: string | null;
  blogsCount: number;
  shortsCount: number;
  primaryCount: number;
  secondaryCount: number;
  nextEligibleDate: string;
}

export interface AppFeatureItem {
  id: string;
  tab: ScreenType;
  tabName: string;
  functionName: string;
  description: string;
  targetAudience: string;
  marketingAngle: string;
  primaryHook: string;
  secondaryHook: string;
  category: string;
  priority: FeaturePriority;
  status: FeatureStatus;
  isKidsMode: boolean;
  addedAt: string;
  updatedAt: string;
  promotionStats: FeaturePromotionStats;
}

export interface MarketingShortPackage {
  shortId: string;
  title: string;
  script: string;
  description: string;
  hashtags: string[];
  durationEstimateSeconds: number;
  youtubeVideoId?: string;
  youtubeUrl?: string;
  status: 'draft' | 'uploaded';
  relatedBlogId?: string;
  relatedFeatureId: string;
  campaignType: MarketingCampaignType;
}

export interface MarketingBlogPackage {
  contentId: string;
  title: string;
  titleUrdu?: string;
  slug: string;
  contentType: MarketingContentType;
  summary: string;
  contentHtml: string;
  labels: string[];
  bloggerUrl?: string;
  publishedAt?: string;
  relatedShortId?: string;
  relatedFeatureId: string;
  campaignType: MarketingCampaignType;
}

export interface ScheduledMarketingSlot {
  id: string;
  date: string; // YYYY-MM-DD
  slot: MarketingSlotType;
  windowTime: string; // e.g. "8:40 AM"
  windowLabel: string; // "Morning Window (7:30 - 10:00 AM)"
  featureId: string;
  featureName: string;
  tab: ScreenType;
  isKidsMode: boolean;
  campaignType: MarketingCampaignType;
  contentType: MarketingContentType;
  status: 'scheduled' | 'generated' | 'published';
  blogPackage?: MarketingBlogPackage;
  shortPackage?: MarketingShortPackage;
  createdAt: string;
  publishedAt?: string;
}

export interface DailyMarketingSummary {
  date: string;
  totalSlotsToday: number;
  publishedSlotsToday: number;
  scheduledSlotsToday: number;
  pendingSlotsToday: number;
  shortsGeneratedToday: number;
  shortsUploadedToday: number;
  kidsModePriorityStatus: string;
  kidsModePercentage: number;
  newFeaturesCount: number;
  pendingPromotionsCount: number;
}
