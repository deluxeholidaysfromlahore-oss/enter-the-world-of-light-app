// -----------------------------------------------------------------------------
// SEO & Discoverability System Type Definitions
// Architecture: App <-> YouTube <-> Google Blogger Cross-Promotion Engine 2026
// -----------------------------------------------------------------------------

export type SeoAudience = 'kids' | 'main_app' | 'global';

export type SeoPriority = 'primary' | 'secondary' | 'long_tail';

export type SeoIntent = 'informational' | 'educational' | 'navigational' | 'transactional';

export type SeoStatus = 'strong' | 'stable' | 'emerging' | 'declining';

export type SeoVolumeTier = 'high' | 'medium' | 'niche';

export type SeoDifficulty = 'easy' | 'medium' | 'hard';

export interface SeoKeyword {
  id: string;
  keyword: string;
  keywordUrdu?: string;
  category: string;
  audience: SeoAudience;
  priority: SeoPriority;
  intent: SeoIntent;
  volumeTier: SeoVolumeTier;
  difficulty: SeoDifficulty;
  status: SeoStatus;
  monthlySearchesEstimated: number;
  impressions: number;
  clicks: number;
  ctr: number; // e.g. 4.2%
  avgPosition: number; // e.g. 3.4
  targetPages: string[]; // ['/kids', '/learn']
  mappedYouTubeVideoId?: string;
  mappedBloggerSlug?: string;
  hashtags: string[];
  trendingScore: number; // 0 to 100
  aiRecommendedAction?: string;
  lastEvaluatedAt: string;
  createdAt: string;
}

export interface GscQueryInsight {
  id: string;
  query: string;
  pageUrl: string;
  category: string;
  audience: SeoAudience;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  status: 'opportunity' | 'top_performing' | 'declining' | 'emerging';
  opportunityNote: string;
  recommendedTitle?: string;
  recommendedMetaDescription?: string;
  detectedAt: string;
}

export interface CrossPromotionTriad {
  id: string;
  topic: string;
  topicUrdu?: string;
  audience: SeoAudience;
  category: string;
  appRoute: string;
  appTitle: string;
  youtubeVideoId: string;
  youtubeTitle: string;
  youtubeUrl: string;
  bloggerUrl: string;
  bloggerTitle: string;
  focusKeywords: string[];
  backlinkStatus: 'verified' | 'pending' | 'syncing';
  utmAppUrl: string;
  lastSyncedAt: string;
}

export interface SeoChangeLog {
  id: string;
  timestamp: string;
  keyword: string;
  targetPage: string;
  changeType: 'addition' | 'upgrade' | 'downgrade' | 'prune' | 'metadata_update';
  oldValue: string;
  newValue: string;
  reason: string;
  source: 'gemini_ai' | 'gsc_data' | 'youtube_analytics' | 'manual_admin';
  trigger: 'automated_cycle' | 'admin_action';
  appliedBy: string;
}

export interface SeoAuditSummary {
  healthScore: number; // 0 to 100
  totalKeywords: number;
  kidsKeywordsCount: number;
  mainAppKeywordsCount: number;
  strongKeywordsCount: number;
  emergingKeywordsCount: number;
  decliningKeywordsCount: number;
  opportunitiesDetected: number;
  totalImpressions30d: number;
  totalClicks30d: number;
  avgCtr30d: number;
  avgPosition30d: number;
  lastDiscoveryCycleAt: string;
  nextScheduledCycleAt: string;
  autoSchedulerEnabled: boolean;
  schedulerIntervalHours: number;
  sitemapIndexedUrls: number;
  robotsTxtStatus: 'active' | 'warning' | 'error';
}

export interface PageSeoMetadata {
  slug: string;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  structuredDataJsonLd: Record<string, any>;
  h1: string;
  subheadings: string[];
  internalLinks: { label: string; href: string }[];
  crossPromotionLinks: {
    youtube?: { title: string; url: string };
    blogger?: { title: string; url: string };
  };
}
