import { ContentItem } from './index';

export type PastelTone =
  | 'emerald'
  | 'sky'
  | 'amber'
  | 'purple'
  | 'rose'
  | 'teal'
  | 'orange'
  | 'slate';

export interface DirectorySubcategory {
  id: string;
  title: string;
  titleUrdu?: string;
  description?: string;
  countLabel?: string;
  items: ContentItem[];
}

export interface DirectoryCategory {
  id: string;
  key?: 'poetry' | 'poems' | 'books' | 'themes' | 'naat' | 'sher' | 'prose';
  title: string;
  titleUrdu?: string;
  countLabel: string; // e.g. "124 entries", "12 books", "24 topics"
  count?: number;
  description?: string;
  tone?: PastelTone;
  group?: string; // Optional logical grouping: "Primary Forms", "Anthologies", "Thematic Studies"
  subcategories?: DirectorySubcategory[];
  items?: ContentItem[]; // Direct items if no nested subcategories
}

export interface DirectoryMetaStat {
  label: string;
  value: string | number;
}

export interface DirectoryPoetCounts {
  sher?: number;
  ghazal?: number;
  nazm?: number;
  ebook?: number;
  theme?: number;
  naat?: number;
  quote?: number;
}

export type PoetEraType =
  | 'all'
  | 'classical'
  | 'modern'
  | 'women'
  | 'young'
  | 'progressive';

export interface DirectoryProfile {
  id: string;
  name: string;
  nameUrdu?: string;
  takhallus?: string;
  dates?: string; // e.g. "1877 – 1938"
  location?: string; // e.g. "Lahore", "Karachi", "Delhi", "Lucknow"
  era?: PoetEraType;
  roleOrSubtitle?: string; // e.g. "Shaair-e-Mashriq • Philosopher & Visionary"
  introduction: string; // 1–3 line concise introduction
  introductionUrdu?: string;
  secondaryInfo?: string; // e.g. "Origin: Sialkot / Lahore"
  imageUrl?: string;
  imageAlt?: string;
  counts?: DirectoryPoetCounts;
  stats?: DirectoryMetaStat[];
  defaultCategoryGroup?: string;
  categories: DirectoryCategory[];
}

export type DirectoryViewLevel =
  | { level: 'directory' }
  | { level: 'profile'; profileId: string }
  | { level: 'category'; profileId: string; categoryId: string; subcategoryId?: string }
  | { level: 'reader'; profileId: string; categoryId: string; subcategoryId?: string; item: ContentItem };

export type DirectoryTileViewMode = 'grid' | 'compact' | 'rekhta-list';
