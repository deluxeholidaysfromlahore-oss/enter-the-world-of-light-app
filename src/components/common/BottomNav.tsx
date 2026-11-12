import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Gamepad2,
  Compass,
  LayoutGrid,
  X,
  PenTool,
  Feather,
  BookmarkCheck,
  Video,
  Zap,
  Calendar,
  User,
  Baby,
  Bot,
  Globe,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { ScreenType } from '../../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onToggleKidsMode?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onToggleKidsMode,
}) => {
  const [isAllTabsOpen, setIsAllTabsOpen] = useState(false);

  // Meta for all 16 app screens
  const allTabsCatalog: {
    s: ScreenType;
    label: string;
    labelUrdu: string;
    description: string;
    icon: React.FC<{ className?: string }>;
    color: string;
    bgColor: string;
    isKids?: boolean;
  }[] = [
    {
      s: 'home',
      label: 'Home',
      labelUrdu: 'مرکزی صفحہ (ہوم)',
      description: 'Welcome portal, highlights, featured collections & quick access',
      icon: Home,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50 border-sky-200',
    },
    {
      s: 'learn',
      label: 'Learn Hub',
      labelUrdu: 'تعلیمی میدان (سیکھنا)',
      description: 'Urdu & English language, science wonders & math concepts',
      icon: BookOpen,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-200',
    },
    {
      s: 'play',
      label: 'Play & Quizzes',
      labelUrdu: 'کھیل، معرکے اور کوئز',
      description: 'Mind games, memory match, speed math and word challenges',
      icon: Gamepad2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200',
    },
    {
      s: 'practice',
      label: 'Practice Studio',
      labelUrdu: 'مشق، املا اور لکھائی',
      description: 'Daily drills, flashcard recall, vocabulary & spelling exercises',
      icon: PenTool,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50 border-violet-200',
    },
    {
      s: 'poetry',
      label: 'Urdu Shayari',
      labelUrdu: 'شاعری اور کلامِ سخن',
      description: 'Classical & modern poets, Rekhta index, ghazals and nazms',
      icon: Feather,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50 border-amber-200',
    },
    {
      s: 'stories',
      label: 'Stories & Fables',
      labelUrdu: 'کہانیاں اور فسانہ',
      description: 'Moral parables, bedtime tales, wisdom traditions & adventures',
      icon: BookmarkCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200',
    },
    {
      s: 'videos',
      label: 'Video Lessons',
      labelUrdu: 'ویڈیو اسباق و دستاویزی',
      description: 'Curated animations, cultural documentaries & YouTube feed',
      icon: Video,
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
    },
    {
      s: 'shorts',
      label: 'Shorts & Reels',
      labelUrdu: 'شارٹس اور فوری کلپس',
      description: 'Vertical quick bite-sized video learning and poetic couplets',
      icon: Zap,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 border-rose-200',
    },
    {
      s: 'daily',
      label: 'Daily Sparks',
      labelUrdu: 'روزانہ کی حکمت و اسٹریک',
      description: 'Daily enlightenment, 7-day streak tracker & XP points',
      icon: Calendar,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 border-teal-200',
    },
    {
      s: 'explore',
      label: 'Explore Catalog',
      labelUrdu: 'دریافت اور مجموعات',
      description: 'Deep dive into cultural tags, authors, and curated collections',
      icon: Compass,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50 border-cyan-200',
    },
    {
      s: 'kids',
      label: 'Kids Mode',
      labelUrdu: 'بچوں کی دنیا (کڈز پورٹل)',
      description: 'A-Z tracing, animal phonics, Sudoku, safety lock & eye rest',
      icon: Baby,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100 border-amber-300',
      isKids: true,
    },
    {
      s: 'ai',
      label: 'AI Assistant',
      labelUrdu: 'اے آئی علمی مددگار',
      description: 'Ask questions, get explanations, rhymes & learning assistance',
      icon: Bot,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
    },
    {
      s: 'profile',
      label: 'Profile & Saved',
      labelUrdu: 'پروفائل اور پسندیدہ',
      description: 'Saved verses, reading history, streak record & user settings',
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
    },
    {
      s: 'blogger',
      label: 'Blogger Chat',
      labelUrdu: 'بلاگر اور پبلشنگ چیٹ',
      description: 'Blogger syndication, live publishing channel & shorts feeds',
      icon: Globe,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50 border-emerald-200',
    },
    {
      s: 'admin',
      label: 'Admin Console',
      labelUrdu: 'ایڈمن کنٹرول پینل',
      description: 'Platform metrics, content analytics & management controls',
      icon: ShieldCheck,
      color: 'text-slate-700',
      bgColor: 'bg-slate-100 border-slate-300',
    },
  ];

  // Dynamic 4th tab based on what user is currently viewing
  const getDynamicSlotItem = () => {
    switch (currentScreen) {
      case 'poetry':
        return { label: 'Poetry', screen: 'poetry' as ScreenType, icon: Feather };
      case 'stories':
        return { label: 'Stories', screen: 'stories' as ScreenType, icon: BookmarkCheck };
      case 'practice':
        return { label: 'Practice', screen: 'practice' as ScreenType, icon: PenTool };
      case 'videos':
        return { label: 'Videos', screen: 'videos' as ScreenType, icon: Video };
      case 'shorts':
        return { label: 'Shorts', screen: 'shorts' as ScreenType, icon: Zap };
      case 'daily':
        return { label: 'Daily', screen: 'daily' as ScreenType, icon: Calendar };
      case 'ai':
        return { label: 'AI Help', screen: 'ai' as ScreenType, icon: Bot };
      case 'profile':
        return { label: 'Profile', screen: 'profile' as ScreenType, icon: User };
      case 'blogger':
        return { label: 'Blogger', screen: 'blogger' as ScreenType, icon: Globe };
      case 'admin':
        return { label: 'Admin', screen: 'admin' as ScreenType, icon: ShieldCheck };
      default:
        return { label: 'Explore', screen: 'explore' as ScreenType, icon: Compass };
    }
  };

  const dynamicSlot = getDynamicSlotItem();

  const handleSelectTab = (screen: ScreenType, isKids?: boolean) => {
    setIsAllTabsOpen(false);
    if (isKids && onToggleKidsMode) {
      onToggleKidsMode();
    } else {
      onNavigate(screen);
    }
  };

  return (
    <>
      {/* 1. FIXED BOTTOM NAVIGATION BAR DOCK */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe transition-all"
      >
        <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1">
          {/* Tab 1: Home */}
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative focus:outline-none cursor-pointer"
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                currentScreen === 'home'
                  ? 'text-sky-700 bg-sky-100 scale-110 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Home className="w-5 h-5" />
            </div>
            <span
              className={`text-[11px] tracking-tight mt-0.5 ${
                currentScreen === 'home' ? 'text-sky-700 font-black' : 'text-slate-500 font-semibold'
              }`}
            >
              Home
            </span>
            {currentScreen === 'home' && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-sky-600" />
            )}
          </button>

          {/* Tab 2: Learn */}
          <button
            onClick={() => onNavigate('learn')}
            className="flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative focus:outline-none cursor-pointer"
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                currentScreen === 'learn'
                  ? 'text-indigo-700 bg-indigo-100 scale-110 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <span
              className={`text-[11px] tracking-tight mt-0.5 ${
                currentScreen === 'learn' ? 'text-indigo-700 font-black' : 'text-slate-500 font-semibold'
              }`}
            >
              Learn
            </span>
            {currentScreen === 'learn' && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-indigo-600" />
            )}
          </button>

          {/* Tab 3: Play */}
          <button
            onClick={() => onNavigate('play')}
            className="flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative focus:outline-none cursor-pointer"
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                currentScreen === 'play'
                  ? 'text-emerald-700 bg-emerald-100 scale-110 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Gamepad2 className="w-5 h-5" />
            </div>
            <span
              className={`text-[11px] tracking-tight mt-0.5 ${
                currentScreen === 'play' ? 'text-emerald-700 font-black' : 'text-slate-500 font-semibold'
              }`}
            >
              Play
            </span>
            {currentScreen === 'play' && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-600" />
            )}
          </button>

          {/* Tab 4: Dynamic Slot (Adapts to current screen or Explore) */}
          {(() => {
            const SlotIcon = dynamicSlot.icon;
            const isSlotActive = currentScreen === dynamicSlot.screen;

            return (
              <button
                onClick={() => onNavigate(dynamicSlot.screen)}
                className="flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative focus:outline-none cursor-pointer"
              >
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isSlotActive
                      ? 'text-amber-700 bg-amber-100 scale-110 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <SlotIcon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[11px] tracking-tight mt-0.5 line-clamp-1 max-w-[62px] text-center ${
                    isSlotActive ? 'text-amber-700 font-black' : 'text-slate-500 font-semibold'
                  }`}
                >
                  {dynamicSlot.label}
                </span>
                {isSlotActive && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-amber-600" />
                )}
              </button>
            );
          })()}

          {/* Tab 5: All Tabs Modal Trigger (تمام ٹیپس) */}
          <button
            onClick={() => setIsAllTabsOpen(!isAllTabsOpen)}
            className="flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative focus:outline-none cursor-pointer"
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                isAllTabsOpen
                  ? 'text-sky-700 bg-sky-200 scale-110 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span
              className={`text-[11px] tracking-tight mt-0.5 ${
                isAllTabsOpen ? 'text-sky-700 font-black' : 'text-slate-700 font-bold'
              }`}
            >
              All Tabs
            </span>
            <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
          </button>
        </div>
      </nav>

      {/* 2. SLIDE-UP BOTTOM SHEET: ALL TABS & SECTIONS (تمام ٹیپس) */}
      {isAllTabsOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          {/* Backdrop Click to dismiss */}
          <div
            className="flex-1"
            onClick={() => setIsAllTabsOpen(false)}
          />

          {/* Modal Container */}
          <div className="w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 pb-safe">
            {/* Sheet Handle & Header */}
            <div className="pt-3 px-5 pb-3 border-b border-slate-100 shrink-0">
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-sky-600" />
                    <span>All App Tabs & Sections</span>
                  </h3>
                  <p className="text-xs font-urdu font-bold text-slate-500 mt-0.5">
                    تمام سیکشنز اور صفحات تک فوری رسائی
                  </p>
                </div>
                <button
                  onClick={() => setIsAllTabsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* List of All Sections */}
            <div className="overflow-y-auto p-4 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {allTabsCatalog.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = currentScreen === tab.s;

                  return (
                    <button
                      key={tab.s}
                      onClick={() => handleSelectTab(tab.s, tab.isKids)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer active:scale-98 ${
                        isActive
                          ? 'bg-sky-50 border-sky-300 shadow-xs ring-2 ring-sky-200'
                          : `${tab.bgColor} hover:shadow-xs`
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl bg-white shadow-2xs shrink-0 ${tab.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1">
                            {tab.label}
                          </h4>
                          {isActive && (
                            <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-sky-600 text-white rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="font-urdu text-[11px] font-bold text-slate-700 mt-0.5 line-clamp-1">
                          {tab.labelUrdu}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {tab.description}
                        </p>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom quick action bar */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Light & Laughter • 16 Active Hubs</span>
              <button
                onClick={() => setIsAllTabsOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
