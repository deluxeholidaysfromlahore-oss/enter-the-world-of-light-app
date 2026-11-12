import React, { useState } from 'react';
import { Feather, Heart, Copy, Check, ArrowRight, LayoutGrid, ScrollText } from 'lucide-react';
import { ContentItem } from '../../types';
import { POETRY_ITEMS } from '../../data/mockData';
import { POETRY_PROFILES } from '../../data/directoryData';
import { CategoryDirectory } from '../common/CategoryDirectory';

interface PoetryScreenProps {
  onSelectPoetry: (item: ContentItem) => void;
  onFavorite?: (item: ContentItem) => void;
  favorites?: Record<string, boolean>;
}

export const PoetryScreen: React.FC<PoetryScreenProps> = ({
  onSelectPoetry,
  onFavorite,
  favorites = {},
}) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'feed'>('directory');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const tags = [
    'All',
    'Urdu',
    'English',
    'Shayari',
    'Love',
    'Sad',
    'Friendship',
    'Motivation',
    'Nature',
    'Life',
    'Inspirational',
  ];

  const filteredPoetry =
    selectedTag === 'All'
      ? POETRY_ITEMS
      : POETRY_ITEMS.filter((item) =>
          item.tags.some(
            (t) => t.toLowerCase() === selectedTag.toLowerCase()
          ) ||
          item.category.toLowerCase() === selectedTag.toLowerCase() ||
          (item.subcategory &&
            item.subcategory.toLowerCase() === selectedTag.toLowerCase())
        );

  const handleQuickCopy = (e: React.MouseEvent, item: ContentItem) => {
    e.stopPropagation();
    const text = `${item.titleUrdu ? item.titleUrdu + '\n' : ''}${
      item.contentBodyUrdu || item.contentBody
    }\n— ${item.poetName || item.author}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Editorial Header */}
      <div className="p-7 sm:p-12 rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 text-white shadow-xl border border-stone-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
            <Feather className="w-4 h-4 text-amber-400" />
            <span>Chamber of Poetic Radiance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50">
            Urdu & English Poetry
          </h1>
          <p className="font-urdu text-2xl sm:text-3xl text-amber-200 font-bold leading-relaxed">
            سخن شناسی، فکرو فلسفہ اور لافانی اشعار کا گلدستہ
          </p>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl font-normal">
            Immerse yourself in verses of Iqbal, Ghalib, Faiz, Faraz, and classical voices.
            Explore through structured poet profiles, anthologies, and themes, or browse the rapid verses stream.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 min-h-[40px] ${
                activeTab === 'directory'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Poets & Category Directory</span>
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 min-h-[40px] ${
                activeTab === 'feed'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ScrollText className="w-4 h-4" />
              <span>Verses Feed</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area based on Active Mode */}
      {activeTab === 'directory' ? (
        /* REUSABLE CATEGORY DIRECTORY COMPONENT */
        <CategoryDirectory
          profiles={POETRY_PROFILES}
          sectionKicker="INDEX OF POETS"
          sectionTitle="Selected poetry of hundreds of poets"
          sectionTitleUrdu="منتخب شعراء کا اشاریہ و دیوان"
          onOpenReaderModal={onSelectPoetry}
          onFavorite={onFavorite}
          favorites={favorites}
        />
      ) : (
        /* CLASSIC VERSES FEED (Existing 100% Preserved) */
        <div className="space-y-6">
          {/* Filter Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs scrollbar-none">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-colors min-h-[40px] cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Poetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {filteredPoetry.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectPoetry(item)}
                className="group relative flex flex-col justify-between p-7 sm:p-8 bg-white rounded-3xl border border-stone-200 hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer text-left overflow-hidden poetry-paper"
              >
                {/* Top metadata */}
                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-stone-600 mb-5 pb-3.5 border-b border-stone-100">
                    <div className="flex items-center gap-2 font-medium">
                      <span className="font-bold text-amber-800">
                        {item.subcategory || 'Poetry'}
                      </span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-stone-800 font-semibold">
                        {item.poetName || item.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleQuickCopy(e, item)}
                        title="Copy couplet"
                        className="p-2 text-stone-400 hover:text-stone-800 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Copied
                          </span>
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {onFavorite && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onFavorite(item);
                          }}
                          title="Save verse"
                          className="p-2 text-stone-400 hover:text-rose-500 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites[item.id] ? 'fill-rose-500 text-rose-500' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title Lockup */}
                  <div className="mb-4">
                    {item.titleUrdu && (
                      <h3 className="font-urdu text-2xl font-bold text-stone-900 text-right leading-normal mb-1">
                        {item.titleUrdu}
                      </h3>
                    )}
                    <h4 className="text-lg font-extrabold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  {/* Couplets Box with large readable Urdu Nastaliq */}
                  {item.contentBodyUrdu ? (
                    <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 font-urdu text-2xl sm:text-3xl text-stone-950 font-bold text-right leading-loose whitespace-pre-line dir-rtl mb-5 shadow-xs">
                      {item.contentBodyUrdu}
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 font-serif italic text-base sm:text-lg text-stone-900 whitespace-pre-line leading-relaxed mb-5">
                      {item.contentBody}
                    </div>
                  )}

                  {/* English Interpretation */}
                  {item.contentBody && item.contentBodyUrdu && (
                    <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed italic pl-3 border-l-3 border-amber-400">
                      {item.contentBody}
                    </p>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm text-stone-500 font-medium">
                  <div className="flex items-center gap-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-stone-400 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="font-extrabold text-amber-800 group-hover:text-amber-900 inline-flex items-center gap-1.5">
                    <span>Full Reading & Audio</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
