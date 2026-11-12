import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  BookOpen,
  Volume2,
  Lightbulb,
  Heart,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { KIDS_LEARN_CATEGORIES } from '../../data/kidsData';
import { KidsLearnCategory, KidsLearnItem } from '../../types/kids';
import { KidsAudioButton } from './KidsAudioButton';
import { kidsAudio } from '../../services/kidsAudio';
import { kidsStorage } from '../../services/kidsStorage';
import { useKidsTheme } from '../../services/kidsTheme';
import { activityPointsService } from '../../services/activityPointsService';

interface KidsLearnSectionProps {
  onEarnStar: () => void;
  onOpenItem?: (item: KidsLearnItem) => void;
  onOpenVideos?: () => void;
}

export const KidsLearnSection: React.FC<KidsLearnSectionProps> = ({
  onEarnStar,
  onOpenItem,
  onOpenVideos,
}) => {
  const { currentTheme } = useKidsTheme();
  const [selectedCatId, setSelectedCatId] = useState<string>('english');
  const scrollCatRef = React.useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    kidsAudio.playPopSound();
    if (scrollCatRef.current) {
      scrollCatRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    kidsAudio.playPopSound();
    if (scrollCatRef.current) {
      scrollCatRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };
  const [favorites, setFavorites] = useState<{ [id: string]: boolean }>(() => {
    const list = kidsStorage.getFavorites();
    const map: { [id: string]: boolean } = {};
    list.forEach((f) => (map[f.contentId] = true));
    return map;
  });

  const [savedItems, setSavedItems] = useState<{ [id: string]: boolean }>(() => {
    const list = kidsStorage.getSaved();
    const map: { [id: string]: boolean } = {};
    list.forEach((s) => (map[s.contentId] = true));
    return map;
  });

  const [learnedMap, setLearnedMap] = useState<{ [id: string]: boolean }>({});

  const activeCategory =
    KIDS_LEARN_CATEGORIES.find((c) => c.id === selectedCatId) || KIDS_LEARN_CATEGORIES[0];

  const handleToggleFav = (item: KidsLearnItem, e: React.MouseEvent) => {
    e.stopPropagation();
    kidsAudio.playPopSound();
    const isNowFav = kidsStorage.toggleFavorite({
      contentId: item.id,
      title: item.title,
      titleUrdu: item.titleUrdu,
      category: activeCategory.name,
      type: 'lesson',
      emoji: item.emoji,
    });
    setFavorites((prev) => ({ ...prev, [item.id]: isNowFav }));
  };

  const handleToggleSave = (item: KidsLearnItem, e: React.MouseEvent) => {
    e.stopPropagation();
    kidsAudio.playPopSound();
    const isNowSaved = kidsStorage.toggleSaved({
      contentId: item.id,
      title: item.title,
      titleUrdu: item.titleUrdu,
      category: activeCategory.name,
      type: 'lesson',
      emoji: item.emoji,
    });
    setSavedItems((prev) => ({ ...prev, [item.id]: isNowSaved }));
  };

  const handleCardTap = (item: KidsLearnItem) => {
    kidsAudio.playItemAudio(item);
    // Record in recently viewed & continue learning
    kidsStorage.addRecentlyViewed({
      contentId: item.id,
      title: item.title,
      titleUrdu: item.titleUrdu,
      category: activeCategory.name,
      type: 'lesson',
      emoji: item.emoji,
    });
    kidsStorage.updateContinueLearning({
      contentId: item.id,
      title: item.title,
      titleUrdu: item.titleUrdu,
      category: activeCategory.name,
      section: 'learn',
      progressPercent: 80,
      emoji: item.emoji,
    });
    if (onOpenItem) onOpenItem(item);
  };

  return (
    <div className="space-y-6">
      {/* Featured Kids Phonics Video Banner */}
      {onOpenVideos && (
        <div
          onClick={() => {
            kidsAudio.playPopSound();
            onOpenVideos();
          }}
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-4 sm:p-5 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 active:scale-99"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner shrink-0">
              🎬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/25 px-2.5 py-0.5 rounded-full">
                  New Animated Video
                </span>
                <span className="text-[10px] font-black text-amber-200">
                  HD 1080p • 9:16
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-snug">
                Letter A • A for Apple Phonics Video! 🍎
              </h3>
              <p className="text-xs text-amber-100 font-bold font-urdu">
                متحرک کارٹون ویڈیو دیکھیں اور صوتیات سنیں
              </p>
            </div>
          </div>

          <button className="px-4 py-2 bg-white text-orange-600 font-black text-xs rounded-xl shadow-xs self-stretch sm:self-auto shrink-0 flex items-center justify-center gap-1.5">
            <span>Watch Video</span>
            <span>▶</span>
          </button>
        </div>
      )}

      {/* 16 Category Scrollable Selector with Forward/Back Arrows */}
      <div className="relative flex items-center gap-2">
        <button
          onClick={scrollLeft}
          aria-label="Peeche scroll karein"
          title="Scroll Left"
          className="p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200/80 shadow-sm active:scale-95 transition-all shrink-0 z-10"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>

        <div
          ref={scrollCatRef}
          className="flex-1 flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none scroll-smooth"
        >
          {KIDS_LEARN_CATEGORIES.map((cat) => {
            const isSelected = selectedCatId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCatId(cat.id);
                  kidsAudio.playPopSound();
                }}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-all border-2 shadow-sm ${
                  isSelected
                    ? `bg-gradient-to-r ${currentTheme.gradient} text-white border-transparent shadow-md scale-102 ring-2 ring-white/50`
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <div className="text-left">
                  <div>{cat.name}</div>
                  <div className="text-[10px] font-urdu opacity-90">{cat.nameUrdu}</div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          aria-label="Aagay scroll karein"
          title="Scroll Right"
          className="p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200/80 shadow-sm active:scale-95 transition-all shrink-0 z-10"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      {/* Active Category Header Bar in Soft Blue */}
      <div className="flex items-center justify-between bg-gradient-to-r from-sky-50 to-blue-50/80 p-4 sm:p-5 rounded-3xl border border-sky-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white border border-sky-200 flex items-center justify-center text-3xl shadow-sm">
            {activeCategory.icon}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-sky-950">
              {activeCategory.name}
            </h2>
            <p className="text-xs font-bold text-sky-700 font-urdu">
              {activeCategory.nameUrdu}
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-sky-800 bg-white px-3 py-1.5 rounded-xl border border-sky-200 shadow-sm">
          {activeCategory.items.length} Lessons Available
        </span>
      </div>

      {/* Responsive Cards Grid (1 col mobile, 2 col tablet/desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeCategory.items.map((item) => {
          const isFav = !!favorites[item.id];
          const isSaved = !!savedItems[item.id];

          return (
            <div
              key={item.id}
              onClick={() => handleCardTap(item)}
              className="bg-white rounded-3xl p-5 border-2 border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 cursor-pointer"
            >
              {/* Top row */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-3xl sm:text-4xl shadow-inner shrink-0">
                  {item.emoji}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                      {item.title}
                    </h3>

                    {/* Action buttons: Fav & Save */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => handleToggleFav(item, e)}
                        className={`p-1.5 rounded-xl border transition-colors ${
                          isFav
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : 'bg-slate-50 text-slate-400 hover:text-rose-500 border-slate-200'
                        }`}
                        title={isFav ? 'Remove Favorite' : 'Save to Favorites'}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`}
                        />
                      </button>

                      <button
                        onClick={(e) => handleToggleSave(item, e)}
                        className={`p-1.5 rounded-xl border transition-colors ${
                          isSaved
                            ? 'bg-sky-100 text-sky-700 border-sky-300'
                            : 'bg-slate-50 text-slate-400 hover:text-sky-600 border-slate-200'
                        }`}
                        title={isSaved ? 'Remove Bookmark' : 'Save for Later'}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${isSaved ? 'fill-sky-600' : ''}`}
                        />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-sky-800 font-urdu text-right">
                    {item.titleUrdu}
                  </h4>

                  {item.pronunciation && (
                    <p className="text-xs font-mono font-bold text-sky-700">
                      🗣️ {item.pronunciation}
                    </p>
                  )}
                </div>
              </div>

              {/* Description bilingual */}
              <div className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                <p>{item.description}</p>
                <p className="text-right font-urdu text-sky-950 font-bold">
                  {item.descriptionUrdu}
                </p>
              </div>

              {/* Example words tags if available */}
              {item.exampleWords && item.exampleWords.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {item.exampleWords.map((w, wi) => (
                    <span
                      key={wi}
                      className="px-2 py-0.5 rounded-lg bg-sky-50 text-sky-800 text-[11px] font-bold border border-sky-100"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              )}

              {/* 3-4 Simple child-friendly sentences if provided */}
              {item.sentences && item.sentences.length > 0 && (
                <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1 text-xs text-slate-700">
                  <div className="font-bold text-sky-900 text-[11px]">✨ Little Sentences:</div>
                  <ul className="space-y-0.5 list-disc list-inside">
                    {item.sentences.map((s, si) => (
                      <li key={si} className="leading-snug">{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fun Fact pill in very soft blue */}
              {item.funFact && (
                <div className="p-3 bg-sky-50/70 rounded-2xl border border-sky-100 flex items-start gap-2 text-xs text-sky-950 font-medium">
                  <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sky-900">Wonder Fact: </span>
                    {item.funFact}
                  </div>
                </div>
              )}

              {/* Actions row: Smart Multilingual Voice & Real Animal Sounds */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <KidsAudioButton
                  item={item}
                  textToSpeak={`${item.title}. ${item.description}`}
                  label={activeCategory.id === 'animals' ? 'Sound & Voice 🦁' : 'Pronounce'}
                  size="sm"
                  className="bg-sky-50 hover:bg-sky-100 text-sky-900 border-sky-200"
                />

                {kidsStorage.isLearned(item.id) || learnedMap[item.id] ? (
                  <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Learned ✓ (سیکھ لیا)</span>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newlyLearned = kidsStorage.markLearned(item.id);
                      if (newlyLearned) {
                        kidsAudio.playRewardChime();
                        onEarnStar();
                        setLearnedMap((prev) => ({ ...prev, [item.id]: true }));
                        activityPointsService.trackActivity({
                          category: 'alphabet',
                          isAlphabetSound: true,
                          title: item.title,
                          itemId: item.id,
                          xpEarned: 25,
                        }).catch(() => {});
                      }
                    }}
                    className="text-xs font-bold text-sky-800 hover:text-sky-950 flex items-center gap-1.5 py-1 px-3 bg-sky-50 hover:bg-sky-100 rounded-xl border border-sky-200 transition-colors active:scale-95"
                  >
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                    <span>Learned (+1 Star)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
