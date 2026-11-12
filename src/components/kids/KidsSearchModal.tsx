import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, BookOpen, Gamepad2, PenTool, Compass, Star } from 'lucide-react';
import { KIDS_LEARN_CATEGORIES, KIDS_STORIES_DATA, KIDS_PRACTICE_ITEMS } from '../../data/kidsData';
import { DUA_NAZM_LIBRARY } from './KidsMusicSection';
import { kidsAudio } from '../../services/kidsAudio';

interface KidsSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: any, sectionType: string) => void;
}

export const KidsSearchModal: React.FC<KidsSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Collect all searchable internal items
  const allSearchable = useMemo(() => {
    const list: any[] = [];

    // Lessons
    KIDS_LEARN_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        list.push({
          id: item.id,
          title: item.title,
          titleUrdu: item.titleUrdu,
          category: cat.name,
          categoryUrdu: cat.nameUrdu,
          emoji: item.emoji,
          description: item.description,
          type: 'learn',
          itemRef: item,
        });
      });
    });

    // Stories
    KIDS_STORIES_DATA.forEach((st) => {
      list.push({
        id: st.id,
        title: st.title,
        titleUrdu: st.titleUrdu,
        category: st.category,
        categoryUrdu: 'کہانی',
        emoji: '✨',
        description: st.description,
        type: 'stories',
        itemRef: st,
      });
    });

    // Practice items
    KIDS_PRACTICE_ITEMS.forEach((pr) => {
      list.push({
        id: pr.id,
        title: `${pr.name} (${pr.char})`,
        titleUrdu: pr.nameUrdu,
        category: 'Practice & Tracing',
        categoryUrdu: 'خوش خطی',
        emoji: pr.exampleEmoji,
        description: pr.guideHint,
        type: 'practice',
        itemRef: pr,
      });
    });

    // Games
    const games = [
      { id: 'gm-memory', title: 'Animal Memory Match', titleUrdu: 'میموری گیم', category: 'Play Arcade', emoji: '🃏', type: 'play' },
      { id: 'gm-balloon', title: 'Color Balloon Pop', titleUrdu: 'غبارے پھوڑیں', category: 'Play Arcade', emoji: '🎈', type: 'play' },
      { id: 'gm-count', title: 'Star Count Safari', titleUrdu: 'گنتی کا سفر', category: 'Play Arcade', emoji: '🔢', type: 'play' },
      { id: 'gm-rhythm', title: 'Xylophone Beats', titleUrdu: 'موسیقی اور دھنیں', category: 'Play Arcade', emoji: '🎵', type: 'play' },
      { id: 'gm-pattern', title: 'Think Patterns', titleUrdu: 'ذہنی معمہ', category: 'Think & Logic', emoji: '🧩', type: 'think' },
    ];
    games.forEach((g) => list.push(g));

    // Dua, Azkar & Nazm tracks (Audio Type A & B)
    DUA_NAZM_LIBRARY.forEach((d) => {
      list.push({
        id: d.id,
        title: d.title,
        titleUrdu: d.titleUrdu,
        category: d.categoryTitle,
        categoryUrdu: d.contentType,
        emoji: d.categoryEmoji,
        description: d.romanDescription,
        type: 'music',
        itemRef: d,
      });
    });

    return list;
  }, []);

  const results = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    return allSearchable.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.titleUrdu && item.titleUrdu.includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [searchTerm, allSearchable]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-3 border-sky-300 space-y-4 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 bg-sky-50 border-2 border-sky-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-sky-400">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search lessons, stories, letters, games..."
            className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Suggestions if search is empty */}
        {!searchTerm && (
          <div className="space-y-2 py-2">
            <span className="text-xs font-black uppercase text-sky-800 tracking-wider">
              Popular Safe Topics:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Alphabet A-Z', 'Alif Bay Pay', 'Animals', 'Planets', 'Counting', 'Stories', 'Colors'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-xl text-xs font-bold border border-sky-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {searchTerm && results.length === 0 ? (
            <div className="text-center py-10 space-y-2 text-slate-400">
              <div className="text-3xl">🔍</div>
              <h4 className="text-sm font-black text-slate-700">No match found</h4>
              <p className="text-xs text-slate-500">
                Try searching for "Lion", "Alif", "Numbers", or "Story".
              </p>
            </div>
          ) : (
            results.map((res) => (
              <div
                key={`${res.type}-${res.id}`}
                onClick={() => {
                  kidsAudio.playPopSound();
                  onSelectItem(res.itemRef || res, res.type);
                  onClose();
                }}
                className="p-3 bg-white hover:bg-sky-50 border-2 border-sky-100 hover:border-sky-300 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-2xl shadow-inner shrink-0">
                    {res.emoji}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900">
                      {res.title}
                    </h4>
                    <p className="text-[11px] font-urdu font-bold text-sky-800">
                      {res.titleUrdu}
                    </p>
                    <span className="text-[10px] font-bold text-sky-600 bg-sky-100/60 px-2 py-0.5 rounded-md">
                      {res.category}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-sky-700">Open ➡️</span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-[10px] text-center text-slate-400 font-bold border-t border-sky-100 pt-2">
          🔒 100% Curated Child-Safe Internal Search
        </div>
      </div>
    </div>
  );
};
