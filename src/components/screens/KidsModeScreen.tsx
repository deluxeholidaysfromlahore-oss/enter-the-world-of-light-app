import React, { useState, useEffect } from 'react';
import {
  Star,
  LogOut,
  ShieldCheck,
  Volume2,
  VolumeX,
  Clock,
  Sparkles,
  BookOpen,
  Gamepad2,
  PenTool,
  Smile,
  Palette,
  Brain,
  Heart,
  Music,
  User,
  ChevronRight,
  Flame,
  Bell,
  Search,
  Bookmark,
  Globe,
} from 'lucide-react';
import { ContentItem } from '../../types';
import { KidsSectionType, KidsStoryItem } from '../../types/kids';
import {
  KIDS_PRACTICE_ITEMS,
  KIDS_STORIES_DATA,
  KIDS_DAILY_QUESTS,
} from '../../data/kidsData';
import { kidsAudio, KIDS_SUPPORTED_LANGUAGES, KidsVoiceLang } from '../../services/kidsAudio';
import { kidsStorage } from '../../services/kidsStorage';
import { KidsThemeProvider, useKidsTheme } from '../../services/kidsTheme';

// Subcomponents
import { KidsLearnSection } from '../kids/KidsLearnSection';
import { KidsGameShell } from '../kids/KidsGameShell';
import { KidsThinkShell } from '../kids/KidsThinkShell';
import { KidsTracingCanvas } from '../kids/KidsTracingCanvas';
import { KidsStoryReader } from '../kids/KidsStoryReader';
import { KidsCreateCanvas } from '../kids/KidsCreateCanvas';
import { SunnyKidsMode } from '../kids/SunnyKidsMode';
import { KidsGrowSection } from '../kids/KidsGrowSection';
import { KidsMusicSection } from '../kids/KidsMusicSection';
import { KidsMyWorldSection } from '../kids/KidsMyWorldSection';
import { KidsParentArea } from '../kids/KidsParentArea';
import { KidsParentGate } from '../kids/KidsParentGate';
import { KidsDailyQuest } from '../kids/KidsDailyQuest';
import { KidsNotificationsModal } from '../kids/KidsNotificationsModal';
import { KidsSearchModal } from '../kids/KidsSearchModal';
import { KidsLanguageModal } from '../kids/KidsLanguageModal';
import { KidsAudioButton } from '../kids/KidsAudioButton';
import { User as FirebaseUser } from 'firebase/auth';
import { KidsVideoLessonsSection } from '../kids/KidsVideoLessonsSection';

interface KidsModeScreenProps {
  onExit: () => void;
  onSelectStory: (item: ContentItem) => void;
  onSelectContent: (item: ContentItem) => void;
  currentUser?: FirebaseUser | null;
  isAdmin?: boolean;
}

const KidsModeScreenContent: React.FC<KidsModeScreenProps> = ({
  onExit,
  onSelectStory,
  onSelectContent,
  currentUser,
  isAdmin,
}) => {
  const { currentTheme, nextTheme, themeIndex } = useKidsTheme();

  // Navigation & View State
  const [activeSection, setActiveSection] = useState<KidsSectionType>('learn');
  const [activeStory, setActiveStory] = useState<KidsStoryItem | null>(null);

  // Gamification & Quest State
  const [starsCollected, setStarsCollected] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kids_stars_collected');
      return saved ? parseInt(saved, 10) : 12;
    } catch {
      return 12;
    }
  });

  const [quests, setQuests] = useState(KIDS_DAILY_QUESTS);
  const [streakDays, setStreakDays] = useState(3);
  const [isMuted, setIsMuted] = useState(kidsAudio.getMuted());

  // Screen Time Limiter
  const [screenTimeLimitMinutes, setScreenTimeLimitMinutes] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kids_screen_limit');
      return saved ? parseInt(saved, 10) : 30;
    } catch {
      return 30;
    }
  });
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const [isTimeExpired, setIsTimeExpired] = useState(false);

  // Parental Gate state
  const [isParentGateOpen, setIsParentGateOpen] = useState(false);
  const [pendingGateAction, setPendingGateAction] = useState<
    'exit' | 'parent_area' | 'extend_time' | 'youtube' | 'whatsapp' | null
  >(null);

  // Notifications State
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => kidsStorage.getNotifications());

  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Multilingual Voice Language State
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [voiceLang, setVoiceLang] = useState<KidsVoiceLang>(() => kidsAudio.getVoiceLanguage());
  const activeLangConfig =
    KIDS_SUPPORTED_LANGUAGES.find((l) => l.code === voiceLang) || KIDS_SUPPORTED_LANGUAGES[0];

  // Favorites & Saved Stories tracking
  const [storyFavorites, setStoryFavorites] = useState<{ [id: string]: boolean }>(() => {
    const list = kidsStorage.getFavorites();
    const map: { [id: string]: boolean } = {};
    list.forEach((f) => (map[f.contentId] = true));
    return map;
  });

  const [storyBookmarks, setStoryBookmarks] = useState<{ [id: string]: boolean }>(() => {
    const list = kidsStorage.getSaved();
    const map: { [id: string]: boolean } = {};
    list.forEach((s) => (map[s.contentId] = true));
    return map;
  });

  // Story length filter: 'all' | '3min' | '5min' | '10min'
  const [storyLengthFilter, setStoryLengthFilter] = useState<'all' | '3min' | '5min' | '10min'>('all');

  const handleEarnStar = () => {
    setStarsCollected((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('kids_stars_collected', next.toString());
      } catch {}
      return next;
    });

    setQuests((prev) =>
      prev.map((q) => (q.section === activeSection ? { ...q, completed: true } : q))
    );
  };

  // Screen time tracking interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpentSeconds((prev) => {
        const next = prev + 1;
        if (screenTimeLimitMinutes > 0 && next >= screenTimeLimitMinutes * 60) {
          setIsTimeExpired(true);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screenTimeLimitMinutes]);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    kidsAudio.setMuted(next);
  };

  const handleUpdateScreenTime = (mins: number) => {
    setScreenTimeLimitMinutes(mins);
    try {
      localStorage.setItem('kids_screen_limit', mins.toString());
    } catch {}
    if (mins === 0 || timeSpentSeconds < mins * 60) {
      setIsTimeExpired(false);
    }
  };

  const triggerParentGate = (
    action: 'exit' | 'parent_area' | 'extend_time' | 'youtube' | 'whatsapp'
  ) => {
    setPendingGateAction(action);
    setIsParentGateOpen(true);
  };

  const handleGateSuccess = () => {
    setIsParentGateOpen(false);
    if (pendingGateAction === 'exit') {
      onExit();
    } else if (pendingGateAction === 'parent_area') {
      setActiveSection('parent');
      setActiveStory(null);
    } else if (pendingGateAction === 'extend_time') {
      setIsTimeExpired(false);
      setTimeSpentSeconds(0);
    } else if (pendingGateAction === 'youtube') {
      window.open('https://www.youtube.com/@EntertheWorldofLight', '_blank', 'noopener,noreferrer');
    } else if (pendingGateAction === 'whatsapp') {
      window.open('https://whatsapp.com/channel/0029VasZV4a60eBd8TwfTg1f', '_blank', 'noopener,noreferrer');
    }
    setPendingGateAction(null);
  };

  const handleSelectNavSection = (sec: KidsSectionType) => {
    if (sec === 'parent') {
      triggerParentGate('parent_area');
      return;
    }
    setActiveStory(null);
    setActiveSection(sec);
    kidsAudio.playPopSound();
  };

  const handleOpenFromSearch = (item: any, type: string) => {
    if (type === 'stories') {
      setActiveStory(item);
    } else if (type === 'learn') {
      setActiveSection('learn');
    } else if (type === 'practice') {
      setActiveSection('practice');
    } else if (type === 'play' || type === 'think') {
      setActiveSection('play');
    } else if (type === 'music' || type === 'dua' || type === 'nazm') {
      setActiveSection('music');
    }
  };

  const handleStoryFav = (st: KidsStoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    kidsAudio.playPopSound();
    const isNow = kidsStorage.toggleFavorite({
      contentId: st.id,
      title: st.title,
      titleUrdu: st.titleUrdu,
      category: st.category,
      type: 'story',
      emoji: '✨',
    });
    setStoryFavorites((prev) => ({ ...prev, [st.id]: isNow }));
  };

  const handleStorySave = (st: KidsStoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    kidsAudio.playPopSound();
    const isNow = kidsStorage.toggleSaved({
      contentId: st.id,
      title: st.title,
      titleUrdu: st.titleUrdu,
      category: st.category,
      type: 'story',
      emoji: '✨',
    });
    setStoryBookmarks((prev) => ({ ...prev, [st.id]: isNow }));
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;
  const timeSpentMins = Math.floor(timeSpentSeconds / 60);

  // 12 Main Navigation Tabs
  const navTabs = [
    { id: 'learn', label: 'Learn', icon: '📚' },
    { id: 'videos', label: 'Videos', icon: '🎬' },
    { id: 'play', label: 'Play', icon: '🎮' },
    { id: 'practice', label: 'Practice', icon: '✏️' },
    { id: 'stories', label: 'Stories', icon: '✨' },
    { id: 'create', label: 'Create', icon: '🎨' },
    { id: 'think', label: 'Think', icon: '🧩' },
    { id: 'grow', label: 'Grow', icon: '❤️' },
    { id: 'music', label: 'Dua & Nazm', icon: '🤲' },
    { id: 'sunny', label: 'Sunny AI', icon: '☀️' },
    { id: 'myworld', label: 'My World', icon: '⭐' },
    { id: 'parent', label: 'Parent Area', icon: '👨‍👩‍👧' },
  ];

  return (
    <div
      style={{
        backgroundColor: currentTheme.softBg,
        transition: 'background-color 0.8s ease',
      }}
      className="min-h-screen -mx-4 -mt-6 -mb-16 p-3 sm:p-5 lg:p-7 kids-pattern space-y-5"
    >
      {/* 1. PROFESSIONAL KIDS HEADER WITH DYNAMIC GRADIENT AND MAGIC PALETTE SWITCHER */}
      <header className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl shadow-sm border-2 border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${currentTheme.gradient} text-white flex items-center justify-center text-2xl shadow-sm shrink-0 transition-all duration-700`}
          >
            ☀️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                Kids Light World!
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                Child Safe
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-slate-600 font-urdu">
              روشنی اور علم کی خوشگوار دنیا
            </p>
          </div>
        </div>

        {/* Action Controls & Badges */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
          {/* Dynamic Palette / Auto Theme Indicator */}
          <button
            onClick={() => {
              kidsAudio.playPopSound();
              nextTheme();
            }}
            className="p-2 sm:px-3 sm:py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-2xl border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            title={`Active Theme: ${currentTheme.name} (${currentTheme.nameUrdu}). Rotates every 3-4 minutes automatically, or tap here to switch now!`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${currentTheme.gradient} shadow-sm shrink-0 border border-white`}
            />
            <span className="hidden sm:inline font-bold text-slate-700">
              {currentTheme.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
              3m ⏳
            </span>
          </button>

          {/* Multilingual Voice Language Selector Button */}
          <button
            onClick={() => {
              kidsAudio.playPopSound();
              setIsLanguageModalOpen(true);
            }}
            className="p-2 sm:px-3 sm:py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-2xl border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            title={`Active Voice Language: ${activeLangConfig.name} (${activeLangConfig.nativeName}). Tap to switch!`}
          >
            <Globe className="w-4 h-4 text-sky-600" />
            <span className="text-sm">{activeLangConfig.flag}</span>
            <span className="hidden sm:inline font-bold text-slate-700">
              {activeLangConfig.name}
            </span>
          </button>

          {/* Safe Internal Search */}
          <button
            onClick={() => {
              kidsAudio.playPopSound();
              setIsSearchOpen(true);
            }}
            className="p-2 sm:px-3 sm:py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-2xl border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            title="Search Safe Content"
          >
            <Search className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">Search</span>
          </button>

          {/* Dedicated Kids Notifications Bell */}
          <button
            onClick={() => {
              kidsAudio.playPopSound();
              setIsNotificationsOpen(true);
            }}
            className="relative p-2 sm:px-3 sm:py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-2xl border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            title="Announcements & Reminders"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">Alerts</span>
            {unreadNotifCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r ${currentTheme.gradient} text-white rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm`}
              >
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* Stars Counter */}
          <div
            onClick={() => handleSelectNavSection('myworld')}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-amber-50 hover:bg-amber-100 rounded-2xl border border-amber-200 cursor-pointer shadow-sm transition-colors"
            title="View My World & Stars"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
            <span className="text-xs sm:text-sm font-black text-amber-950">
              {starsCollected}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 sm:px-3 sm:py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isMuted
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden lg:inline">{isMuted ? 'Muted' : 'Sound'}</span>
          </button>

          {/* Screen Time Indicator */}
          {screenTimeLimitMinutes > 0 && (
            <div className="hidden xl:flex items-center gap-1 px-3 py-2 bg-slate-50 rounded-2xl text-xs font-bold text-slate-700 border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              <span>
                {timeSpentMins}/{screenTimeLimitMinutes}m
              </span>
            </div>
          )}

          {/* Video Lessons Quick Tab Button */}
          <button
            onClick={() => handleSelectNavSection('videos')}
            className="p-1.5 sm:px-3 sm:py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-2xl border border-amber-300 text-xs font-extrabold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            title="Watch Animated Kids Videos"
          >
            <span className="text-base">🎬</span>
            <span className="hidden sm:inline">Video Lessons</span>
          </button>

          {/* Official YouTube Channel (Distinct Red Button) */}
          <button
            onClick={() => triggerParentGate('youtube')}
            className="p-1.5 sm:px-3 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            title="Parents: Official YouTube Channel (@EntertheWorldofLight)"
          >
            <span className="text-sm">▶️</span>
            <span className="hidden sm:inline">YouTube</span>
          </button>

          {/* Official WhatsApp Channel (Distinct Green Button) */}
          <button
            onClick={() => triggerParentGate('whatsapp')}
            className="p-1.5 sm:px-3 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            title="Parents: Follow Official WhatsApp Channel"
          >
            <span className="text-sm">💬</span>
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          {/* Profile / My World Quick Button */}
          <button
            onClick={() => handleSelectNavSection('myworld')}
            className="p-2 sm:px-3 sm:py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-2xl border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            title="My World"
          >
            <User className="w-4 h-4 text-slate-600" />
            <span className="hidden lg:inline">My World</span>
          </button>

          {/* Parent Gate Exit Button */}
          <button
            onClick={() => triggerParentGate('exit')}
            className="flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-700 rounded-2xl text-xs font-bold transition-all border border-rose-200 shadow-sm"
            title="Exit Kids Mode"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* 2. DYNAMIC ROTATING DAILY WONDER QUEST */}
      <KidsDailyQuest
        quests={quests}
        streakDays={streakDays}
        onSelectQuestSection={handleSelectNavSection}
        onClaimAll={() => {
          if (!kidsStorage.isQuestClaimedToday()) {
            kidsStorage.markQuestClaimedToday();
            kidsAudio.playCelebrationFanfare();
            handleEarnStar();
            handleEarnStar();
          }
        }}
      />

      {/* 3. RESPONSIVE NAVIGATION TABS (DYNAMIC THEME SELECTION) */}
      {/* Desktop & Tablet: Top grid layout */}
      <nav
        aria-label="Kids Sections Desktop"
        className="hidden sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2"
      >
        {navTabs.map((tab) => {
          const isActive = activeSection === tab.id && !activeStory;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelectNavSection(tab.id as KidsSectionType)}
              className={`p-3 rounded-2xl font-black flex flex-col items-center justify-center gap-1 border-2 transition-all shrink-0 sm:shrink min-w-[76px] sm:min-w-0 shadow-sm active:scale-95 cursor-pointer ${
                isActive
                  ? `bg-gradient-to-r ${currentTheme.gradient} text-white border-transparent ring-2 ring-white/50 scale-102 shadow-md`
                  : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <span className="text-xl sm:text-2xl">{tab.icon}</span>
              <span className="text-[11px] sm:text-xs tracking-tight line-clamp-1">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Screen: Fixed Bottom Dock (Tabs neche ajate hai on mobile screen) */}
      <nav
        aria-label="Kids Sections Mobile Bottom Dock"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t-2 border-amber-300 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] px-2 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none pb-safe"
      >
        {navTabs.map((tab) => {
          const isActive = activeSection === tab.id && !activeStory;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelectNavSection(tab.id as KidsSectionType)}
              className={`py-2 px-3 rounded-2xl font-black flex flex-col items-center justify-center gap-0.5 border transition-all shrink-0 min-w-[70px] shadow-xs active:scale-95 cursor-pointer ${
                isActive
                  ? `bg-gradient-to-r ${currentTheme.gradient} text-white border-transparent ring-2 ring-amber-400 scale-105 shadow-sm`
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[10px] tracking-tight whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* 4. DYNAMIC CONTENT CANVAS */}
      <main className="space-y-6 pb-28 sm:pb-8">
        {/* Story Reader Fullscreen View */}
        {activeStory ? (
          <KidsStoryReader
            story={activeStory}
            onBack={() => setActiveStory(null)}
            onEarnStar={handleEarnStar}
          />
        ) : (
          <>
            {/* LEARN SECTION */}
            {activeSection === 'learn' && (
              <KidsLearnSection
                onEarnStar={handleEarnStar}
                onOpenVideos={() => handleSelectNavSection('videos')}
              />
            )}

            {/* VIDEO LESSONS SECTION (Automated Animated Videos) */}
            {activeSection === 'videos' && (
              <KidsVideoLessonsSection
                onEarnStar={handleEarnStar}
                currentUser={currentUser}
                isAdmin={isAdmin}
              />
            )}

            {/* PLAY SECTION */}
            {activeSection === 'play' && (
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
                    <span>🎮 Play & Joy Arcade</span>
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-slate-600">
                    Friendly educational minigames with joyful sound rewards and zero penalties!
                  </p>
                </div>
                <KidsGameShell onEarnStar={handleEarnStar} />
              </div>
            )}

            {/* PRACTICE SECTION */}
            {activeSection === 'practice' && (
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
                    <span>✏️ Interactive Handwriting & Tracing</span>
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-slate-600">
                    Trace English letters, Urdu Haroof-e-Tahajji, and numbers with finger or mouse!
                  </p>
                </div>
                <KidsTracingCanvas
                  items={KIDS_PRACTICE_ITEMS}
                  onEarnStar={handleEarnStar}
                />
              </div>
            )}

            {/* STORIES SECTION */}
            {activeSection === 'stories' && (
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
                    <span>✨ Magical Bedtime & Moral Fables</span>
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-slate-600">
                    Bilingual English and Urdu stories with voice narration, morals, and fun quiz rewards!
                  </p>
                </div>

                {/* Story Length Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center">
                  {[
                    { id: 'all', label: 'All Stories (تمام کہانیاں)', icon: '📚' },
                    { id: '3min', label: '3-Min Quick (مختصر)', icon: '⚡' },
                    { id: '5min', label: '5-Min Bedtime (سوتے وقت)', icon: '🌙' },
                    { id: '10min', label: '10-Min Adventure (ایڈونچر)', icon: '🏔️' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setStoryLengthFilter(f.id as any);
                        kidsAudio.playPopSound();
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 border transition-all ${
                        storyLengthFilter === f.id
                          ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span>{f.icon}</span>
                      <span>{f.label}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {KIDS_STORIES_DATA.filter((st) => {
                    if (storyLengthFilter === 'all') return true;
                    return st.lengthCategory === storyLengthFilter;
                  }).map((st) => {
                    const isFav = !!storyFavorites[st.id];
                    const isSaved = !!storyBookmarks[st.id];

                    return (
                      <div
                        key={st.id}
                        className="bg-white rounded-3xl p-5 border-2 border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 bg-slate-50 text-slate-700 text-[10px] font-black rounded-xl border border-slate-200">
                              {st.category}
                            </span>

                            {/* Action buttons: Favorite & Bookmark */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => handleStoryFav(st, e)}
                                className={`p-1.5 rounded-xl border transition-colors ${
                                  isFav
                                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                                    : 'bg-slate-50 text-slate-400 hover:text-rose-500 border-slate-200'
                                }`}
                                title={isFav ? 'Remove Favorite' : 'Save to Favorites'}
                              >
                                <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                              </button>

                              <button
                                onClick={(e) => handleStorySave(st, e)}
                                className={`p-1.5 rounded-xl border transition-colors ${
                                  isSaved
                                    ? 'bg-sky-100 text-sky-700 border-sky-300'
                                    : 'bg-slate-50 text-slate-400 hover:text-sky-600 border-slate-200'
                                }`}
                                title={isSaved ? 'Remove Bookmark' : 'Save Story'}
                              >
                                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-sky-600' : ''}`} />
                              </button>

                              <span className="text-xs font-bold text-amber-600 pl-1">
                                +{st.rewardStars}⭐
                              </span>
                            </div>
                          </div>

                          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                            {st.title}
                          </h3>

                          <h4 className="text-sm font-bold text-slate-700 font-urdu text-right">
                            {st.titleUrdu}
                          </h4>

                          <p className="text-xs text-slate-600 line-clamp-2">
                            {st.description}
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                          <KidsAudioButton
                            textToSpeak={`${st.title}. ${st.description}`}
                            lang="en"
                            label="Preview"
                            size="sm"
                            className="bg-slate-50 text-slate-800 border-slate-200"
                          />

                          <button
                            onClick={() => {
                              kidsAudio.playPopSound();
                              kidsStorage.addRecentlyViewed({
                                contentId: st.id,
                                title: st.title,
                                titleUrdu: st.titleUrdu,
                                category: 'Stories',
                                type: 'story',
                                emoji: '✨',
                              });
                              kidsStorage.updateContinueLearning({
                                contentId: st.id,
                                title: st.title,
                                titleUrdu: st.titleUrdu,
                                category: 'Stories',
                                section: 'stories',
                                progressPercent: 50,
                                emoji: '✨',
                              });
                              setActiveStory(st);
                            }}
                            className={`px-4 py-2 bg-gradient-to-r ${currentTheme.gradient} hover:opacity-90 active:scale-95 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1`}
                          >
                            <span>Read & Listen</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CREATE SECTION */}
            {activeSection === 'create' && (
              <KidsCreateCanvas onEarnStar={handleEarnStar} />
            )}

            {/* THINK SECTION (Dedicated Brain, Logic, Sudoku, Maze, Math Puzzles, Riddles & Memory Games) */}
            {activeSection === 'think' && (
              <KidsThinkShell onEarnStar={handleEarnStar} />
            )}

            {/* GROW SECTION */}
            {activeSection === 'grow' && (
              <KidsGrowSection onEarnStar={handleEarnStar} />
            )}

            {/* MUSIC SECTION */}
            {activeSection === 'music' && (
              <KidsMusicSection onEarnStar={handleEarnStar} />
            )}

            {/* SUNNY AI SECTION */}
            {activeSection === 'sunny' && <SunnyKidsMode />}

            {/* MY WORLD SECTION */}
            {activeSection === 'myworld' && (
              <KidsMyWorldSection
                starsCollected={starsCollected}
                streakDays={streakDays}
                onNavigateSection={handleSelectNavSection}
                onOpenItem={(item) => handleOpenFromSearch(item, item.type || 'learn')}
              />
            )}

            {/* PARENT AREA SECTION */}
            {activeSection === 'parent' && (
              <KidsParentArea
                starsCollected={starsCollected}
                screenTimeMinutes={screenTimeLimitMinutes}
                onUpdateScreenTime={handleUpdateScreenTime}
                onExitKidsMode={onExit}
                timeSpentMinutes={timeSpentMins}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Parental Gate Modal */}
      <KidsParentGate
        isOpen={isParentGateOpen}
        onSuccess={handleGateSuccess}
        onClose={() => {
          setIsParentGateOpen(false);
          setPendingGateAction(null);
        }}
      />

      {/* Kids Announcements Modal */}
      <KidsNotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={(id) => {
          const updated = kidsStorage.markNotificationAsRead(id);
          setNotifications(updated);
        }}
        onMarkAllAsRead={() => {
          const updated = kidsStorage.markAllNotificationsAsRead();
          setNotifications(updated);
        }}
        onClear={(id) => {
          const updated = kidsStorage.clearNotification(id);
          setNotifications(updated);
        }}
        onSelectAction={(notif) => {
          setIsNotificationsOpen(false);
          if (notif.type === 'story') setActiveSection('stories');
          else if (notif.type === 'quest') setActiveSection('learn');
          else if (notif.type === 'practice') setActiveSection('practice');
        }}
      />

      {/* Internal Safe Search Modal */}
      <KidsSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={handleOpenFromSearch}
      />

      {/* Multilingual Voice Language Selector Modal */}
      <KidsLanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        onLanguageChanged={(newLang) => setVoiceLang(newLang)}
      />

      {/* Screen Time Expiration Gentle Rest Break Overlay */}
      {isTimeExpired && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-5 shadow-2xl border-4 border-slate-300 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
              🌙
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-950">
                Eye Rest & Stretch Time!
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed">
                You played and learned so well today! Time to drink some water, look at green trees, and rest your eyes.
              </p>
              <p className="text-xs font-urdu font-bold text-slate-800">
                آنکھوں کے آرام اور پانی پینے کا وقت!
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsTimeExpired(false);
                  setTimeSpentSeconds(0);
                  kidsAudio.playPopSound();
                }}
                className={`w-full py-3 bg-gradient-to-r ${currentTheme.gradient} text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-colors`}
              >
                Done Resting — Continue Learning 😊 (جاری رکھیں)
              </button>
              <button
                onClick={() => {
                  setIsTimeExpired(false);
                  // Give 5 more minutes before reminding again
                  setTimeSpentSeconds(Math.max(0, screenTimeLimitMinutes * 60 - 300));
                  kidsAudio.playPopSound();
                }}
                className="w-full py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 font-black text-xs rounded-2xl border border-sky-200 transition-colors"
              >
                Remind Me in 5 Minutes ⏳ (پانچ منٹ بعد یاد دلائیں)
              </button>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => triggerParentGate('exit')}
                  className="flex-1 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-2xl border border-rose-200 transition-colors"
                >
                  Parents: Exit
                </button>
                <button
                  onClick={() => triggerParentGate('extend_time')}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors"
                >
                  Parents: +15 Mins
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const KidsModeScreen: React.FC<KidsModeScreenProps> = (props) => {
  return (
    <KidsThemeProvider>
      <KidsModeScreenContent {...props} />
    </KidsThemeProvider>
  );
};
