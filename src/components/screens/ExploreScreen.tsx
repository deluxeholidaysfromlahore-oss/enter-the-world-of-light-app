import React, { useState } from 'react';
import {
  Compass,
  Feather,
  BookOpen,
  Video,
  Film,
  Globe,
  Rocket,
  Atom,
  Clock,
  Cpu,
  Trees,
  Sparkles,
  ArrowRight,
  LayoutGrid,
} from 'lucide-react';
import { ScreenType, ContentItem } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { SocialLinks } from '../common/SocialLinks';
import { FEATURED_COLLECTIONS } from '../../data/mockData';
import { KNOWLEDGE_PROFILES, POETRY_PROFILES, STORIES_PROFILES } from '../../data/directoryData';
import { CategoryDirectory } from '../common/CategoryDirectory';

interface ExploreScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectContent: (item: ContentItem) => void;
  onSelectPoetry: (item: ContentItem) => void;
  onFavorite?: (item: ContentItem) => void;
  favorites?: Record<string, boolean>;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onNavigate,
  onSelectContent,
  onSelectPoetry,
  onFavorite,
  favorites = {},
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [directoryDomain, setDirectoryDomain] = useState<'cosmos' | 'poets' | 'stories'>('cosmos');

  const topics = [
    { label: 'All', icon: Compass },
    { label: 'Poetry', icon: Feather, targetScreen: 'poetry' as ScreenType },
    { label: 'Stories', icon: BookOpen, targetScreen: 'stories' as ScreenType },
    { label: 'Videos', icon: Video, targetScreen: 'videos' as ScreenType },
    { label: 'Shorts', icon: Film, targetScreen: 'shorts' as ScreenType },
    { label: 'Animals', icon: Globe },
    { label: 'Space', icon: Rocket },
    { label: 'Science', icon: Atom },
    { label: 'History', icon: Clock },
    { label: 'Technology', icon: Cpu },
    { label: 'Nature', icon: Trees },
  ];

  const currentDirectoryProfiles =
    directoryDomain === 'cosmos'
      ? KNOWLEDGE_PROFILES
      : directoryDomain === 'poets'
      ? POETRY_PROFILES
      : STORIES_PROFILES;

  return (
    <div className="space-y-10 pb-16">
      <SectionHeader
        kicker="Vast Horizons"
        title="Explore Everything"
        titleUrdu="علم و آگہی کی دنیا"
        description="Discover literature, universe mysteries, natural wonders, and technological revolutions."
      />

      {/* Topics pills / button grid */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
        {topics.map((t) => {
          const Icon = t.icon;
          const isSelected = selectedTopic === t.label;

          return (
            <button
              key={t.label}
              onClick={() => {
                setSelectedTopic(t.label);
                if (t.targetScreen) {
                  onNavigate(t.targetScreen);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all min-h-[40px] cursor-pointer ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* REUSABLE CATEGORY DIRECTORY SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-stone-500 block">
              Multi-Domain Category Directory
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Browse High-Category Collections
            </h3>
          </div>

          {/* Domain switcher to show full reusability */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/60 self-start sm:self-auto">
            <button
              onClick={() => setDirectoryDomain('cosmos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                directoryDomain === 'cosmos'
                  ? 'bg-white text-stone-900 shadow-2xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Cosmos & Science
            </button>
            <button
              onClick={() => setDirectoryDomain('poets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                directoryDomain === 'poets'
                  ? 'bg-white text-stone-900 shadow-2xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Master Poets
            </button>
            <button
              onClick={() => setDirectoryDomain('stories')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                directoryDomain === 'stories'
                  ? 'bg-white text-stone-900 shadow-2xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Fables & Traditions
            </button>
          </div>
        </div>

        {/* The Reusable Category Directory Component */}
        <CategoryDirectory
          profiles={currentDirectoryProfiles}
          onOpenReaderModal={onSelectContent}
          onFavorite={onFavorite}
          favorites={favorites}
        />
      </div>

      {/* Featured Explorations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Classical Poetry Gateway */}
        <div
          onClick={() => onNavigate('poetry')}
          className="group p-6 rounded-3xl bg-gradient-to-br from-amber-700 to-stone-900 text-white shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-amber-200 mb-2">
              <span className="font-semibold uppercase tracking-wider">Literary Gateway</span>
              <Feather className="w-4 h-4 text-amber-300" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
              Urdu & English Poetry
            </h3>
            <p className="font-urdu text-sm text-amber-100/90 text-right mt-1">
              شاعری، غزلیں اور نظمیں
            </p>
            <p className="text-xs text-stone-300 mt-2 leading-relaxed">
              Explore Iqbal, Ghalib, Faiz, and modern contemplative verses with translations and commentary.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-200 font-semibold">
            <span>Open Poetry Chamber</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Moral Stories Gateway */}
        <div
          onClick={() => onNavigate('stories')}
          className="group p-6 rounded-3xl bg-gradient-to-br from-emerald-700 to-teal-950 text-white shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-emerald-200 mb-2">
              <span className="font-semibold uppercase tracking-wider">Narrative Sanctuary</span>
              <BookOpen className="w-4 h-4 text-emerald-300" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-200 transition-colors">
              Stories & Moral Fables
            </h3>
            <p className="font-urdu text-sm text-emerald-100/90 text-right mt-1">
              سبق آموز کہانیاں
            </p>
            <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
              Bedtime stories, Eastern folklore, and character-building adventures for young and lifelong readers.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200 font-semibold">
            <span>Read Stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Video Hub Gateway */}
        <div
          onClick={() => onNavigate('videos')}
          className="group p-6 rounded-3xl bg-gradient-to-br from-sky-700 to-indigo-950 text-white shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-sky-200 mb-2">
              <span className="font-semibold uppercase tracking-wider">Video Hub</span>
              <Video className="w-4 h-4 text-sky-300" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-sky-200 transition-colors">
              Videos & Masterclasses
            </h3>
            <p className="font-urdu text-sm text-sky-100/90 text-right mt-1">
              ویڈیو اسباق اور دستاویزی فلمیں
            </p>
            <p className="text-xs text-sky-100/80 mt-2 leading-relaxed">
              High definition lessons, scientific phenomena breakdowns, and animated kid sing-alongs.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-sky-200 font-semibold">
            <span>Watch Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Featured Collections Gallery */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Curated Topic Collections</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_COLLECTIONS.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-sky-600 uppercase tracking-wide">
                  {c.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                  {c.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {c.description}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{c.itemsCount} curated items</span>
                <span className="text-sky-600 font-semibold">Explore</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Community & Brand Ecosystem */}
      <div className="pt-6 border-t border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-sky-600" />
          <span>Enter the World of Light Brand Ecosystem</span>
        </h3>
        <p className="text-xs text-slate-500 max-w-2xl">
          Follow our verified channels for live broadcasts, discussions, printable educational PDFs, and daily poetic inspirations.
        </p>
        <SocialLinks layout="cards" showDescriptions={true} />
      </div>
    </div>
  );
};
