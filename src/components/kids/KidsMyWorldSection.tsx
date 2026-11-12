import React, { useState } from 'react';
import {
  Star,
  Award,
  Flame,
  CheckCircle2,
  Trophy,
  Sparkles,
  BookOpen,
  Heart,
  Bookmark,
  Clock,
  ChevronRight,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { kidsAudio } from '../../services/kidsAudio';
import { kidsStorage } from '../../services/kidsStorage';
import { useKidsTheme } from '../../services/kidsTheme';
import { KidsSavedItem, KidsRecentItem, KidsContinueItem } from '../../types/kids';

interface KidsMyWorldSectionProps {
  starsCollected: number;
  streakDays: number;
  onNavigateSection: (sec: any) => void;
  onOpenItem?: (item: any) => void;
}

export const KidsMyWorldSection: React.FC<KidsMyWorldSectionProps> = ({
  starsCollected,
  streakDays,
  onNavigateSection,
  onOpenItem,
}) => {
  const { currentTheme } = useKidsTheme();
  const [activeTab, setActiveTab] = useState<
    'continue' | 'favorites' | 'saved' | 'recent' | 'badges'
  >('continue');

  const favorites = kidsStorage.getFavorites();
  const savedItems = kidsStorage.getSaved();
  const recentItems = kidsStorage.getRecentlyViewed();
  const continueItems = kidsStorage.getContinueLearning();

  const level = Math.floor(starsCollected / 10) + 1;
  const starsIntoLevel = starsCollected % 10;

  const badges = [
    {
      id: 'b1',
      title: 'First Light Star',
      titleUrdu: 'پہلا ستارہ',
      icon: '⭐',
      unlocked: starsCollected >= 1,
      requirement: 'Earn 1 star',
    },
    {
      id: 'b2',
      title: 'Story Explorer',
      titleUrdu: 'کہانیوں کا مسافر',
      icon: '📖',
      unlocked: starsCollected >= 5,
      requirement: 'Earn 5 stars',
    },
    {
      id: 'b3',
      title: 'Tracing Champion',
      titleUrdu: 'خوش خطی چیمپئن',
      icon: '✍️',
      unlocked: starsCollected >= 10,
      requirement: 'Earn 10 stars',
    },
    {
      id: 'b4',
      title: 'Sunny Best Friend',
      titleUrdu: 'سنی کا پکا دوست',
      icon: '☀️',
      unlocked: starsCollected >= 15,
      requirement: 'Earn 15 stars',
    },
    {
      id: 'b5',
      title: 'Wonder Master',
      titleUrdu: 'تعلیم کا چمکتا ستارہ',
      icon: '🏆',
      unlocked: starsCollected >= 25,
      requirement: 'Earn 25 stars',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero Badge Profile Card with Dynamic Rotating Theme Gradient */}
      <div className={`bg-gradient-to-r ${currentTheme.gradient} rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4 border border-white/30 transition-all duration-700`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/30">
              🌟
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black">
                  Level {level} Little Explorer
                </h2>
                <span className="px-2.5 py-0.5 bg-white/25 rounded-full text-xs font-bold">
                  Rank {level}
                </span>
              </div>
              <p className="text-xs text-sky-100 font-bold">
                Enter the World of Light & Laughter Junior Member
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-xs sm:text-sm font-black">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>{starsCollected} Stars</span>
            </div>

            <div className="flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-xs sm:text-sm font-black">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>{streakDays} Days</span>
            </div>
          </div>
        </div>

        {/* Progress to next level */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-bold text-sky-100">
            <span>Progress to Level {level + 1}</span>
            <span>{starsIntoLevel} / 10 Stars</span>
          </div>
          <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/25">
            <div
              style={{ width: `${(starsIntoLevel / 10) * 100}%` }}
              className="h-full bg-gradient-to-r from-sky-200 to-amber-200 rounded-full transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs for My World */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'continue', label: 'Continue Learning', icon: '📚', count: continueItems.length },
          { id: 'favorites', label: 'Favorites', icon: '❤️', count: favorites.length },
          { id: 'saved', label: 'Saved Activities', icon: '🔖', count: savedItems.length },
          { id: 'recent', label: 'Recently Viewed', icon: '🕘', count: recentItems.length },
          { id: 'badges', label: 'Badges', icon: '🏆', count: badges.filter((b) => b.unlocked).length },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                kidsAudio.playPopSound();
              }}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-all border-2 shadow-sm ${
                isActive
                  ? 'bg-sky-600 text-white border-sky-700 scale-102 ring-2 ring-sky-200'
                  : 'bg-white text-slate-700 border-sky-100 hover:bg-sky-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-800'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-sm min-h-[300px]">
        {/* 1. CONTINUE LEARNING */}
        {activeTab === 'continue' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-sky-100">
              <h3 className="text-base sm:text-lg font-black text-sky-950 flex items-center gap-2">
                <span>📚 Continue Where You Left Off</span>
              </h3>
              <span className="text-xs text-slate-500 font-bold">
                {continueItems.length} in progress
              </span>
            </div>

            {continueItems.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm font-bold">No active activities yet.</p>
                <p className="text-xs">Start a lesson or story to track progress here!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {continueItems.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      kidsAudio.playPopSound();
                      onNavigateSection(c.section);
                    }}
                    className="p-4 bg-sky-50/70 hover:bg-sky-100/80 border-2 border-sky-200 rounded-2xl transition-all cursor-pointer flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-inner shrink-0">
                        {c.emoji || '📖'}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1">
                          {c.title}
                        </h4>
                        <p className="text-[11px] font-urdu font-bold text-sky-800">
                          {c.titleUrdu}
                        </p>
                        <span className="text-[10px] font-bold text-sky-600">
                          {c.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>Progress</span>
                        <span>{c.progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-sky-200">
                        <div
                          style={{ width: `${c.progressPercent}%` }}
                          className="h-full bg-sky-500 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-black text-sky-700 pt-1">
                      <span>Resume</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. FAVORITES */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-sky-100">
              <h3 className="text-base sm:text-lg font-black text-sky-950 flex items-center gap-2">
                <span>❤️ My Favorite Learning Cards</span>
              </h3>
              <span className="text-xs text-slate-500 font-bold">
                {favorites.length} Saved to Favorites
              </span>
            </div>

            {favorites.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Heart className="w-12 h-12 text-rose-300 mx-auto" />
                <p className="text-sm font-bold text-slate-600">No favorites saved yet!</p>
                <p className="text-xs text-slate-500">
                  Tap the heart icon (❤️) on any lesson or story to keep it here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {favorites.map((fav) => (
                  <div
                    key={fav.id}
                    onClick={() => {
                      kidsAudio.playPopSound();
                      onNavigateSection(fav.type === 'story' ? 'stories' : 'learn');
                    }}
                    className="p-4 bg-rose-50/50 hover:bg-rose-50 border-2 border-rose-200 rounded-2xl transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-2xl shadow-inner shrink-0">
                        {fav.emoji || '❤️'}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1">
                          {fav.title}
                        </h4>
                        <p className="text-[10px] font-urdu font-bold text-rose-800">
                          {fav.titleUrdu}
                        </p>
                        <span className="text-[10px] font-bold text-slate-400">
                          {fav.category}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. SAVED / BOOKMARKS */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-sky-100">
              <h3 className="text-base sm:text-lg font-black text-sky-950 flex items-center gap-2">
                <span>🔖 Saved for Later</span>
              </h3>
              <span className="text-xs text-slate-500 font-bold">
                {savedItems.length} Bookmarks
              </span>
            </div>

            {savedItems.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Bookmark className="w-12 h-12 text-sky-300 mx-auto" />
                <p className="text-sm font-bold text-slate-600">No saved items yet!</p>
                <p className="text-xs text-slate-500">
                  Tap the bookmark icon (🔖) to save interesting lessons or stories.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {savedItems.map((sv) => (
                  <div
                    key={sv.id}
                    onClick={() => {
                      kidsAudio.playPopSound();
                      onNavigateSection(sv.type === 'story' ? 'stories' : 'learn');
                    }}
                    className="p-4 bg-sky-50/60 hover:bg-sky-100/70 border-2 border-sky-200 rounded-2xl transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-sky-200 flex items-center justify-center text-2xl shadow-inner shrink-0">
                        {sv.emoji || '🔖'}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1">
                          {sv.title}
                        </h4>
                        <p className="text-[10px] font-urdu font-bold text-sky-800">
                          {sv.titleUrdu}
                        </p>
                        <span className="text-[10px] font-bold text-slate-400">
                          {sv.category}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. RECENTLY VIEWED */}
        {activeTab === 'recent' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-sky-100">
              <h3 className="text-base sm:text-lg font-black text-sky-950 flex items-center gap-2">
                <span>🕘 Recently Viewed</span>
              </h3>
              <span className="text-xs text-slate-500 font-bold">
                Last {recentItems.length} opened
              </span>
            </div>

            {recentItems.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-600">No recently opened items yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {recentItems.map((rc) => (
                  <div
                    key={rc.id}
                    onClick={() => {
                      kidsAudio.playPopSound();
                      onNavigateSection(rc.type === 'story' ? 'stories' : 'learn');
                    }}
                    className="p-4 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-2xl transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-inner shrink-0">
                        {rc.emoji || '📖'}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1">
                          {rc.title}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400">
                          {rc.lastVisited}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. BADGES */}
        {activeTab === 'badges' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-sky-100">
              <h3 className="text-base sm:text-lg font-black text-sky-950 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Achievement Badges (تمغے)</span>
              </h3>
              <span className="text-xs font-bold text-sky-700">
                {badges.filter((b) => b.unlocked).length} / {badges.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border-2 text-center space-y-2 transition-all ${
                    b.unlocked
                      ? 'bg-sky-50/80 border-sky-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-50'
                  }`}
                >
                  <div className="text-4xl">{b.unlocked ? b.icon : '🔒'}</div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 line-clamp-1">
                      {b.title}
                    </h4>
                    <p className="text-[10px] font-urdu text-sky-800 font-bold">
                      {b.titleUrdu}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {b.requirement}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
