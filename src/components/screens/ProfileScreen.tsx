import React, { useState, useEffect } from 'react';
import {
  User,
  Flame,
  Award,
  BookOpen,
  Clock,
  Heart,
  Settings,
  History,
  Shield,
  Bell,
  Sparkles,
  ChevronRight,
  TrendingUp,
  LogIn,
  LogOut,
  Zap,
  Trash2,
  CheckCircle2,
  Loader2,
  Trophy,
  Volume2,
  Gamepad2,
  Lock,
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { ScreenType } from '../../types';
import { logoutUser } from '../../services/firebase';
import { clearAppCache, CacheClearResult } from '../../services/contentService';
import { activityPointsService } from '../../services/activityPointsService';
import { UserStats, MilestoneBadge } from '../../types/achievements';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
  user?: FirebaseUser | null;
  onOpenAuth?: () => void;
  favoritesCount?: number;
  onOpenAchievements?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  user,
  onOpenAuth,
  favoritesCount = 3,
  onOpenAchievements,
}) => {
  const [activeTab, setActiveTab] = useState<'progress' | 'badges' | 'favorites' | 'history' | 'settings'>('progress');
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [cacheResult, setCacheResult] = useState<CacheClearResult | null>(null);
  const [stats, setStats] = useState<UserStats>(activityPointsService.getStats());

  useEffect(() => {
    const unsub = activityPointsService.subscribe((s) => {
      setStats(s);
    });

    if (user?.uid) {
      activityPointsService.loadFromFirebase(user.uid).catch(() => {});
    }

    return () => unsub();
  }, [user?.uid]);

  const currentTier = activityPointsService.getCurrentTier();
  const nextTier = activityPointsService.getNextTier();
  const tierProgress = activityPointsService.getTierProgress();
  const liveBadges = activityPointsService.getBadges();
  const unlockedBadgesCount = liveBadges.filter((b) => b.isUnlocked).length;

  const handleClearCache = async () => {
    setIsClearingCache(true);
    try {
      const res = await clearAppCache();
      setCacheResult(res);
      setTimeout(() => setCacheResult(null), 5000);
    } catch (e) {
      console.warn('Cache clear error:', e);
    } finally {
      setIsClearingCache(false);
    }
  };

  const historyItems = [
    { title: 'Urdu Alphabet & Phonetics Mastery', type: 'Lesson', time: 'Today, 10:30 AM' },
    { title: 'The Great Solar System Expedition', type: 'Science', time: 'Yesterday' },
    { title: 'Allama Iqbal: Sitaron Se Aage', type: 'Poetry', time: '2 days ago' },
    { title: 'Why Do We Dream? Sleep Science', type: 'Video', time: '3 days ago' },
  ];

  const favoriteItems = [
    { title: 'Sitaron Se Aage Jahan Aur Bhi Hain', poet: 'Allama Iqbal', cat: 'Urdu Poetry' },
    { title: 'The Brave Little Firefly’s Lantern', poet: 'Story Studio', cat: 'Kids Stories' },
    { title: 'Dil-e-Nadaan Tujhe Hua Kya Hai', poet: 'Mirza Ghalib', cat: 'Shayari' },
  ];

  const handleSignOut = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.warn('Sign out error:', e);
    }
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Guest Learner';
  const displayEmail = user?.email || 'Guest explorer session';
  const initial = (displayName[0] || 'G').toUpperCase();

  return (
    <div className="space-y-8 pb-16">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md shadow-sky-500/20 shrink-0 border-2 border-white"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-sky-500 via-sky-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-sky-500/20 shrink-0">
              {initial}
            </div>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {displayName}
              </h2>
              <span className="text-xs font-extrabold text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
                {user ? 'Verified Explorer' : 'Guest Explorer'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {displayEmail} {user ? '· Connected with Firebase' : '· Offline / Guest Mode'}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-1.5 font-bold text-amber-600">
                <Flame className="w-4 h-4 fill-amber-500" />
                {stats.streakDays}-Day Streak
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-900 font-bold">{stats.totalPoints} Total XP</span>
              <span className="text-slate-300">|</span>
              <span className="text-sky-700">{unlockedBadgesCount} Badges Unlocked</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">{favoritesCount} Favorites</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAchievements && (
            <button
              onClick={onOpenAchievements}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-amber-500/20"
              title="Open Dedicated Achievements Drawer"
            >
              <Trophy className="w-4 h-4" />
              <span>Achievements</span>
            </button>
          )}

          {user ? (
            <button
              onClick={handleSignOut}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm shadow-sky-600/30"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Register</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('settings')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>

      {/* DEDICATED 'LEARNING PROGRESS' BADGE & TIER CARD */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-indigo-900/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Badge Emblem & Title */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-500 to-orange-500 text-slate-950 flex items-center justify-center text-3xl sm:text-4xl shadow-xl shadow-amber-500/30 shrink-0 border-2 border-amber-300">
              ⭐
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/15 px-3 py-1 rounded-full border border-amber-400/30">
                  Learning Progress Badge • Level {currentTier.level}
                </span>
                <span className="text-xs font-urdu font-bold text-amber-200">
                  {currentTier.nameUrdu}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                {currentTier.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {currentTier.tagline} • <span className="font-urdu text-amber-200/90">{currentTier.taglineUrdu}</span>
              </p>
            </div>
          </div>

          {/* Quick Points & Open Drawer Action */}
          <div className="flex items-center gap-4 self-start lg:self-center">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center min-w-[110px]">
              <span className="text-2xl font-black text-amber-400 block">{stats.totalPoints}</span>
              <span className="text-[10px] uppercase font-bold text-slate-300">Total Points (XP)</span>
            </div>

            {onOpenAchievements && (
              <button
                onClick={onOpenAchievements}
                className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                <span>View All Badges ({unlockedBadgesCount}/{liveBadges.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress bar to next level */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300">Progress to Next Tier</span>
            {nextTier ? (
              <span className="text-amber-300 font-bold">
                {tierProgress.currentXp} / {tierProgress.targetXp} XP ({tierProgress.percent}%)
              </span>
            ) : (
              <span className="text-amber-400 font-bold">Supreme Tier Achieved! ✓</span>
            )}
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700/80">
            <div
              className="bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${tierProgress.percent}%` }}
            />
          </div>
          {nextTier && (
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Next Level: {nextTier.name} ({nextTier.nameUrdu})</span>
              <span className="text-amber-400 font-semibold">{nextTier.minXp - stats.totalPoints} XP remaining</span>
            </div>
          )}
        </div>

        {/* Live Multi-Screen Activity Breakdown */}
        <div className="relative z-10 mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              📚
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Learning Activity</span>
              <span className="text-sm font-black text-sky-400">{stats.learningPoints} XP</span>
              <span className="text-[11px] text-slate-300 block">{stats.learningCount} Lessons • {stats.alphabetSoundsMastered} Sounds</span>
            </div>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              📖
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Reading Stories</span>
              <span className="text-sm font-black text-amber-400">{stats.readingPoints} XP</span>
              <span className="text-[11px] text-amber-200 block font-semibold">{stats.urduStoriesRead} Urdu Stories Read (Target: 10)</span>
            </div>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              🎮
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Play & Quizzes</span>
              <span className="text-sm font-black text-emerald-400">{stats.playingPoints} XP</span>
              <span className="text-[11px] text-slate-300 block">{stats.quizzesCompleted} Quizzes • {stats.gamesPlayed} Puzzles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
        {[
          { key: 'progress', label: 'My Progress', icon: TrendingUp },
          { key: 'badges', label: `Achievements & Badges (${unlockedBadgesCount}/${liveBadges.length})`, icon: Award },
          { key: 'favorites', label: 'Favorites', icon: Heart },
          { key: 'history', label: 'Watch & Read History', icon: History },
          { key: 'settings', label: 'Preferences', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-colors min-h-[40px] cursor-pointer ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Progress */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
              <span className="text-xs text-slate-500">Urdu & English Fluency</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {Math.min(100, Math.round(((stats.urduStoriesRead + stats.learningCount) / 15) * 100))}%
              </p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-sky-600 h-full"
                  style={{ width: `${Math.min(100, Math.round(((stats.urduStoriesRead + stats.learningCount) / 15) * 100))}%` }}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
              <span className="text-xs text-slate-500">Phonics & Alphabet Mastery</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {Math.min(100, Math.round((stats.alphabetSoundsMastered / 5) * 100))}%
              </p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full"
                  style={{ width: `${Math.min(100, Math.round((stats.alphabetSoundsMastered / 5) * 100))}%` }}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
              <span className="text-xs text-slate-500">Quizzes & Play Challenges</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {Math.min(100, Math.round((stats.quizzesCompleted / 3) * 100))}%
              </p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${Math.min(100, Math.round((stats.quizzesCompleted / 3) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Weekly Learning Activity Log
            </h3>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className="space-y-2">
                  <div className="h-28 bg-slate-100 rounded-xl flex items-end justify-center p-1.5">
                    <div
                      className="w-full bg-sky-500 rounded-lg transition-all"
                      style={{ height: `${[45, 60, 30, 80, 55, 90, 70][idx]}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Badges (Live Achievements Module with Milestones) */}
      {activeTab === 'badges' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Complete milestones across reading, learning, and play chambers to unlock virtual medals.
            </p>
            {onOpenAchievements && (
              <button
                onClick={onOpenAchievements}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Open Drawer View</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  badge.isUnlocked
                    ? 'bg-white border-amber-200/90 shadow-xs'
                    : 'bg-slate-50/80 border-slate-200 opacity-80'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-3 rounded-xl shrink-0 ${
                      badge.isUnlocked
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {badge.isUnlocked ? <Award className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {badge.title}
                      </h4>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                        +{badge.xpReward} XP
                      </span>
                    </div>
                    <span className="text-[11px] font-urdu font-bold text-slate-500 block">
                      {badge.titleUrdu}
                    </span>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>

                {/* Milestone Progress Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className={badge.isUnlocked ? 'text-emerald-700' : 'text-slate-600'}>
                      {badge.isUnlocked ? '✓ Milestone Achieved' : `Progress: ${badge.currentCount} / ${badge.targetCount}`}
                    </span>
                    <span className="text-slate-500">{badge.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        badge.isUnlocked ? 'bg-emerald-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${badge.progressPercent}%` }}
                    />
                  </div>
                  <p className="text-[10px] font-semibold text-amber-700 pt-0.5">
                    {badge.isUnlocked ? `Unlocked ${badge.unlockedAt || 'Recently'}` : 'Locked Milestone'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-3">
          {favoriteItems.map((fav, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between hover:border-sky-300 transition-colors"
            >
              <div>
                <span className="text-[11px] font-semibold text-sky-600 uppercase">
                  {fav.cat}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{fav.title}</h4>
                <p className="text-xs text-slate-500">{fav.poet}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: History */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {historyItems.map((item, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-slate-400">
                  {item.type}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-400">{item.time}</p>
              </div>
              <span className="text-xs font-semibold text-sky-600">Revisit</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Settings */}
      {activeTab === 'settings' && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 space-y-4 max-w-xl">
          <h3 className="text-base font-bold text-slate-900">App Preferences</h3>
          <div className="space-y-3 text-sm">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <span className="text-slate-700 font-medium">Daily Learning Reminders</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-sky-600" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <span className="text-slate-700 font-medium">Urdu Calligraphy Font Size (Large)</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-sky-600" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <span className="text-slate-700 font-medium">Auto-play Audio Pronunciation</span>
              <input type="checkbox" className="w-4 h-4 text-sky-600" />
            </label>
          </div>

          {/* Public Storage & Memory Optimizer */}
          <div className="pt-4 border-t border-slate-100">
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-500 text-white rounded-xl shadow-2xs">
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-amber-950">App Memory &amp; Cache Cleaner (Public Tool)</h4>
                  <p className="text-xs text-amber-800">Clear temporary storage &amp; query caches without losing your favorites or login.</p>
                </div>
              </div>

              {cacheResult && (
                <div className="p-2.5 bg-emerald-100/80 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{cacheResult.serverMessage} ({cacheResult.clearedServerEntries} entries freed)</span>
                </div>
              )}

              <button
                onClick={handleClearCache}
                disabled={isClearingCache}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                {isClearingCache ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memory clean ho rahi hai...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Clear Extra Cache Now (Free App Memory)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
