import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  Trophy,
  Sparkles,
  BookOpen,
  Volume2,
  Flame,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  Star,
  Play,
  Heart,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import {
  activityPointsService,
  LEARNING_PROGRESS_TIERS,
} from '../../services/activityPointsService';
import { MilestoneBadge, UserStats } from '../../types/achievements';
import { kidsAudio } from '../../services/kidsAudio';

interface AchievementsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToScreen?: (screen: any) => void;
}

export const AchievementsDrawer: React.FC<AchievementsDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToScreen,
}) => {
  const [stats, setStats] = useState<UserStats>(activityPointsService.getStats());
  const [activeFilter, setActiveFilter] = useState<'all' | 'unlocked' | 'progress' | 'reading' | 'alphabet' | 'playing'>('all');
  const [celebrationBadge, setCelebrationBadge] = useState<MilestoneBadge | null>(null);
  const [showSimulator, setShowSimulator] = useState(false);

  useEffect(() => {
    const unsubscribe = activityPointsService.subscribe((updatedStats) => {
      setStats(updatedStats);
    });

    const unsubscribeBadge = activityPointsService.onBadgeUnlocked((badge) => {
      setCelebrationBadge(badge);
      try {
        kidsAudio.playRewardChime();
      } catch {
        // Safe audio
      }
    });

    return () => {
      unsubscribe();
      unsubscribeBadge();
    };
  }, []);

  if (!isOpen) return null;

  const badges = activityPointsService.getBadges();
  const currentTier = activityPointsService.getCurrentTier();
  const nextTier = activityPointsService.getNextTier();
  const tierProgress = activityPointsService.getTierProgress();

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  const filteredBadges = badges.filter((b) => {
    if (activeFilter === 'unlocked') return b.isUnlocked;
    if (activeFilter === 'progress') return !b.isUnlocked;
    if (activeFilter === 'reading') return b.category === 'reading';
    if (activeFilter === 'alphabet') return b.category === 'alphabet';
    if (activeFilter === 'playing') return b.category === 'playing';
    return true;
  });

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'Volume2':
        return <Volume2 className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  const handleSimulate = async (type: 'urdu_story' | 'alphabet_sound' | 'quiz' | 'lesson') => {
    kidsAudio.playPopSound();
    await activityPointsService.simulateActivity(type);
  };

  const handleQuickUnlockAllDemo = async () => {
    kidsAudio.playRewardChime();
    for (let i = 0; i < 7; i++) {
      await activityPointsService.simulateActivity('urdu_story');
      await activityPointsService.simulateActivity('alphabet_sound');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-xl bg-slate-50 h-full shadow-2xl flex flex-col z-10 overflow-hidden border-l border-slate-200">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Trophy className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>Achievements & Badges</span>
                <span className="text-xs bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-full border border-amber-200">
                  {unlockedCount} / {badges.length}
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                کامیابیاں اور تمغے • Live Points & Milestone Tracking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Celebration Toast Modal if newly unlocked */}
        {celebrationBadge && (
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-4 mx-4 mt-3 rounded-2xl shadow-lg flex items-center justify-between gap-3 animate-bounce">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0">
                🎉
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/25 px-2 py-0.5 rounded-full">
                  New Badge Unlocked!
                </span>
                <h4 className="text-sm font-black leading-tight mt-0.5">
                  {celebrationBadge.title} ({celebrationBadge.titleUrdu})
                </h4>
                <p className="text-xs text-amber-100 font-semibold">
                  +{celebrationBadge.xpReward} Bonus XP Earned!
                </p>
              </div>
            </div>
            <button
              onClick={() => setCelebrationBadge(null)}
              className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold text-white cursor-pointer"
            >
              Claimed ✓
            </button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Learning Progress Badge Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 shadow-lg border border-indigo-900/60 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-sky-500/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 font-black text-xl shrink-0 border-2 border-amber-300">
                    ⭐
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                        Level {currentTier.level} Badge
                      </span>
                      <span className="text-xs text-slate-300 font-urdu font-bold">
                        {currentTier.nameUrdu}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white">
                      {currentTier.name}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-amber-400">
                    {stats.totalPoints}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Total XP Points
                  </div>
                </div>
              </div>

              {/* Tier Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>{currentTier.tagline}</span>
                  {nextTier && (
                    <span className="text-amber-300 font-bold">
                      {tierProgress.currentXp} / {tierProgress.targetXp} XP ({tierProgress.percent}%)
                    </span>
                  )}
                </div>
                <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden border border-slate-700/60">
                  <div
                    className="bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${tierProgress.percent}%` }}
                  />
                </div>
                {nextTier && (
                  <p className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Next: {nextTier.name} ({nextTier.nameUrdu})</span>
                    <span className="text-amber-400 font-semibold">
                      {nextTier.minXp - stats.totalPoints} XP needed
                    </span>
                  </p>
                )}
              </div>

              {/* Stats Breakdown Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                <div className="bg-slate-800/60 rounded-xl p-2.5 text-center border border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-bold block">📚 Learning</span>
                  <span className="text-sm font-black text-sky-400">{stats.learningPoints} XP</span>
                  <span className="text-[9px] text-slate-400 block">{stats.learningCount} activities</span>
                </div>
                <div className="bg-slate-800/60 rounded-xl p-2.5 text-center border border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-bold block">📖 Reading</span>
                  <span className="text-sm font-black text-amber-400">{stats.readingPoints} XP</span>
                  <span className="text-[9px] text-slate-400 block">{stats.urduStoriesRead} Urdu stories</span>
                </div>
                <div className="bg-slate-800/60 rounded-xl p-2.5 text-center border border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-bold block">🎮 Playing</span>
                  <span className="text-sm font-black text-emerald-400">{stats.playingPoints} XP</span>
                  <span className="text-[9px] text-slate-400 block">{stats.quizzesCompleted} quizzes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Simulation / Testing Panel (for User to easily test milestones) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-800">
                  Quick Milestone Practice / Live Testing
                </span>
              </div>
              <button
                onClick={() => setShowSimulator(!showSimulator)}
                className="text-[11px] font-bold text-sky-600 hover:text-sky-700 cursor-pointer"
              >
                {showSimulator ? 'Hide Controls' : 'Test Points & Badges'}
              </button>
            </div>

            {showSimulator && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Tap any action to simulate points and live milestone badge unlocking:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => handleSimulate('urdu_story')}
                    className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-left transition-colors cursor-pointer"
                  >
                    📖 Read 1 Urdu Story (+30 XP)
                    <span className="block text-[10px] text-amber-700 font-medium">
                      Current: {stats.urduStoriesRead} / 10
                    </span>
                  </button>

                  <button
                    onClick={() => handleSimulate('alphabet_sound')}
                    className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-left transition-colors cursor-pointer"
                  >
                    🔊 Master 1 Phonics Sound (+25 XP)
                    <span className="block text-[10px] text-sky-700 font-medium">
                      Current: {stats.alphabetSoundsMastered} / 5
                    </span>
                  </button>

                  <button
                    onClick={() => handleSimulate('quiz')}
                    className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-left transition-colors cursor-pointer"
                  >
                    🏆 Ace Speed Quiz (+40 XP)
                    <span className="block text-[10px] text-emerald-700 font-medium">
                      Current: {stats.quizzesCompleted} / 3
                    </span>
                  </button>

                  <button
                    onClick={() => handleSimulate('lesson')}
                    className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-left transition-colors cursor-pointer"
                  >
                    📚 Finish Lesson (+35 XP)
                    <span className="block text-[10px] text-indigo-700 font-medium">
                      Current: {stats.learningCount} / 5
                    </span>
                  </button>
                </div>

                <button
                  onClick={handleQuickUnlockAllDemo}
                  className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-xs font-black shadow-xs hover:from-amber-600 hover:to-orange-600 transition-all cursor-pointer"
                >
                  ⚡ Fast Unlock "10 Urdu Stories" & "5 Alphabet Sounds" Badges
                </button>
              </div>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: `All (${badges.length})` },
              { id: 'unlocked', label: `Unlocked (${unlockedCount})` },
              { id: 'progress', label: `In Progress (${badges.length - unlockedCount})` },
              { id: 'reading', label: 'Reading' },
              { id: 'alphabet', label: 'Alphabet' },
              { id: 'playing', label: 'Playing' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Badges List */}
          <div className="space-y-3">
            {filteredBadges.map((badge) => {
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    badge.isUnlocked
                      ? 'bg-white border-amber-300/80 shadow-xs'
                      : 'bg-white/80 border-slate-200/80 opacity-90'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Badge Icon Emblem */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 ${
                        badge.isUnlocked
                          ? `bg-gradient-to-tr ${badge.badgeGradient} text-white border-white shadow-md shadow-amber-500/20`
                          : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                    >
                      {badge.isUnlocked ? (
                        getBadgeIcon(badge.icon)
                      ) : (
                        <Lock className="w-5 h-5 text-slate-400" />
                      )}
                    </div>

                    {/* Badge Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-sm font-black text-slate-900 leading-snug">
                              {badge.title}
                            </h4>
                            <span className="text-xs font-urdu font-bold text-slate-600">
                              ({badge.titleUrdu})
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                            {badge.description}
                          </p>
                          <p className="text-[11px] font-urdu text-slate-400 mt-0.5">
                            {badge.descriptionUrdu}
                          </p>
                        </div>

                        {/* XP Tag */}
                        <div className="text-right shrink-0">
                          <span
                            className={`text-[11px] font-black px-2 py-0.5 rounded-full border ${
                              badge.isUnlocked
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            +{badge.xpReward} XP
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span
                            className={
                              badge.isUnlocked
                                ? 'text-emerald-700 flex items-center gap-1'
                                : 'text-slate-600'
                            }
                          >
                            {badge.isUnlocked ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Unlocked {badge.unlockedAt ? `on ${badge.unlockedAt}` : '✓'}</span>
                              </>
                            ) : (
                              <span>
                                Milestone Progress: {badge.currentCount} / {badge.targetCount}
                              </span>
                            )}
                          </span>
                          <span className="text-slate-500 font-semibold">
                            {badge.progressPercent}%
                          </span>
                        </div>

                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              badge.isUnlocked
                                ? 'bg-emerald-500'
                                : 'bg-gradient-to-r from-sky-500 to-indigo-600'
                            }`}
                            style={{ width: `${badge.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drawer Bottom Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-medium">
            🔥 {stats.streakDays}-Day Learning Streak Active
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
