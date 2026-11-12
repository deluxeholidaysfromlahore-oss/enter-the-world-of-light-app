import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { ContentItem, ScreenType } from '../../types';
import {
  LEARN_ITEMS,
  POETRY_ITEMS,
  STORIES_ITEMS,
  VIDEOS_ITEMS,
  SHORTS_ITEMS,
} from '../../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectContent: (item: ContentItem) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectContent,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const allItems: ContentItem[] = useMemo(() => {
    return [
      ...LEARN_ITEMS,
      ...POETRY_ITEMS,
      ...STORIES_ITEMS,
      ...VIDEOS_ITEMS,
      ...SHORTS_ITEMS,
    ];
  }, []);

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ||
        item.category.toLowerCase() === activeCategory.toLowerCase();

      if (!matchesCategory) return false;
      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        (item.titleUrdu && item.titleUrdu.includes(q)) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        (item.author && item.author.toLowerCase().includes(q))
      );
    });
  }, [allItems, query, activeCategory]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, Urdu poetry, stories, quizzes, videos..."
            className="w-full text-base sm:text-lg text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-100 overflow-x-auto text-xs sm:text-sm">
          {['all', 'Urdu', 'English', 'Science', 'Poetry', 'Kids Stories', 'Educational'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200/80'
                }`}
              >
                {cat === 'all' ? 'All Content' : cat}
              </button>
            )
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-2">
          {filteredItems.length === 0 ? (
            <div className="py-14 text-center text-slate-400 space-y-2">
              <Sparkles className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-base font-bold text-slate-700">No results matching "{query}"</p>
              <p className="text-xs sm:text-sm text-slate-500">
                Try searching for "Iqbal", "Solar System", "Spelling", or "Moral Story"
              </p>
            </div>
          ) : (
            filteredItems.slice(0, 8).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectContent(item);
                  onClose();
                }}
                className="group flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${
                      item.gradient || 'from-sky-500 to-indigo-600'
                    } flex items-center justify-center text-white shrink-0 shadow-xs`}
                  >
                    <BookOpen className="w-5 h-5 text-white/90" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-600 truncate">
                        {item.title}
                      </h4>
                      {item.titleUrdu && (
                        <span className="font-urdu text-sm text-slate-500 shrink-0">
                          {item.titleUrdu}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-0.5">
                      <span className="font-semibold text-sky-700">{item.category}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{item.duration || item.readTime || 'Lesson'}</span>
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </div>
            ))
          )}
        </div>

        {/* Footer Quick Categories */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
          <span>Explore Enter the World of Light</span>
          <div className="flex items-center gap-3 font-semibold">
            <button
              onClick={() => {
                onNavigate('poetry');
                onClose();
              }}
              className="hover:text-sky-600"
            >
              Poetry
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={() => {
                onNavigate('stories');
                onClose();
              }}
              className="hover:text-sky-600"
            >
              Stories
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={() => {
                onNavigate('play');
                onClose();
              }}
              className="hover:text-sky-600"
            >
              Quizzes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
