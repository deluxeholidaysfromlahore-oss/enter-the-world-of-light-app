import React, { useState } from 'react';
import { BookOpen, Sparkles, Clock, LayoutGrid, ScrollText } from 'lucide-react';
import { ContentItem } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { STORIES_ITEMS } from '../../data/mockData';
import { STORIES_PROFILES } from '../../data/directoryData';
import { CategoryDirectory } from '../common/CategoryDirectory';

interface StoriesScreenProps {
  onSelectStory: (item: ContentItem) => void;
  onFavorite?: (item: ContentItem) => void;
  favorites?: Record<string, boolean>;
}

export const StoriesScreen: React.FC<StoriesScreenProps> = ({
  onSelectStory,
  onFavorite,
  favorites = {},
}) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'feed'>('directory');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Kids Stories',
    'Moral Stories',
    'Urdu Stories',
    'English Stories',
    'Bedtime Stories',
    'Short Stories',
  ];

  const filteredStories =
    selectedCategory === 'All'
      ? STORIES_ITEMS
      : STORIES_ITEMS.filter(
          (item) =>
            item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            (item.subcategory &&
              item.subcategory
                .toLowerCase()
                .includes(selectedCategory.toLowerCase())) ||
            item.tags.some((t) =>
              t.toLowerCase().includes(selectedCategory.toLowerCase())
            )
        );

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeader
          kicker="Moral & Fable Chamber"
          title="Stories & Tales"
          titleUrdu="کہانیاں اور داستانیں"
          description="Imaginative, heartwarming fables that foster empathy, resilience, curiosity, and good manners."
        />

        {/* View Mode Switcher */}
        <div className="shrink-0 flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/60 self-start sm:self-center">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'directory'
                ? 'bg-white text-stone-900 shadow-2xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Traditions Directory</span>
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'feed'
                ? 'bg-white text-stone-900 shadow-2xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>Stories Feed</span>
          </button>
        </div>
      </div>

      {activeTab === 'directory' ? (
        /* REUSABLE CATEGORY DIRECTORY COMPONENT FOR STORIES */
        <CategoryDirectory
          profiles={STORIES_PROFILES}
          initialProfileId="fables-tradition"
          sectionKicker="Classical Heritage & Parables"
          sectionTitle="Fables & Stories Directory"
          sectionTitleUrdu="داستانوی مجموعے اور زمرہ جات"
          onOpenReaderModal={onSelectStory}
          onFavorite={onFavorite}
          favorites={favorites}
        />
      ) : (
        /* FLAT STORIES FEED */
        <div className="space-y-6">
          {/* Category selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-colors min-h-[40px] cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stories list / card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="group flex flex-col justify-between p-7 bg-white rounded-3xl border border-slate-200/90 hover:border-sky-400 hover:shadow-xl transition-all cursor-pointer text-left"
              >
                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-3.5 pb-2 border-b border-slate-100">
                    <span className="font-bold text-sky-700">{story.category}</span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {story.readTime || '5 min read'}
                    </span>
                  </div>

                  {story.titleUrdu && (
                    <p className="font-urdu text-lg sm:text-xl font-bold text-slate-800 text-right mb-2">
                      {story.titleUrdu}
                    </p>
                  )}

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed font-normal">
                    {story.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-500 font-medium">{story.author || 'Folklore'}</span>
                  <span className="font-extrabold text-sky-600 group-hover:text-sky-700 flex items-center gap-1">
                    <span>Read Full Story</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
