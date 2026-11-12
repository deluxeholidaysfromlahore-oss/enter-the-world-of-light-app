import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { ContentItem } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { ContentCard } from '../common/ContentCard';
import { LEARN_ITEMS } from '../../data/mockData';

interface LearnScreenProps {
  onSelectContent: (item: ContentItem) => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({ onSelectContent }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Kids', 'English', 'Urdu', 'Math', 'Science', 'General Knowledge'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Ages'];

  const filteredItems = useMemo(() => {
    return LEARN_ITEMS.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchLevel = selectedLevel === 'All' || item.level === selectedLevel;
      const matchQuery =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.titleUrdu && item.titleUrdu.includes(searchQuery)) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchLevel && matchQuery;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <SectionHeader
          kicker="Curriculum & Exploration"
          title="Learning Hub"
          titleUrdu="سیکھنے کا میدان"
          description="Master linguistic fluency in Urdu and English, explore science and cosmos, and sharpen mathematical acumen."
        />

        {/* Filter Controls (Interactive Buttons as per skill) */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-colors min-h-[40px] ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level Filter & Search Bar */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl === 'All' ? 'All Levels' : lvl}
                </option>
              ))}
            </select>

            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons..."
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Learning modules */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No lessons found</p>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your category or level filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onClick={onSelectContent}
            />
          ))}
        </div>
      )}

      {/* Micro-learning callout */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 border border-amber-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Self-Paced, Structured Mastery
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Every module includes vocabulary drills, illustrated examples, and an instant assessment quiz.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Tracked in Profile History</span>
        </div>
      </div>
    </div>
  );
};
