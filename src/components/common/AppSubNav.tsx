import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Home,
  BookOpen,
  Gamepad2,
  PenTool,
  Feather,
  BookmarkCheck,
  Video,
  Zap,
  Calendar,
  Compass,
  Baby,
  Bot,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ScreenType } from '../../types';

interface AppSubNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onToggleKidsMode: () => void;
}

export const AppSubNav: React.FC<AppSubNavProps> = ({
  currentScreen,
  onNavigate,
  onToggleKidsMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const tabs: {
    s: ScreenType;
    label: string;
    labelUrdu: string;
    icon: React.FC<{ className?: string }>;
    accentColor: string;
    isKids?: boolean;
  }[] = [
    { s: 'home', label: 'Home', labelUrdu: 'ہوم', icon: Home, accentColor: 'bg-sky-600' },
    { s: 'learn', label: 'Learn', labelUrdu: 'تعلیم', icon: BookOpen, accentColor: 'bg-indigo-600' },
    { s: 'play', label: 'Play', labelUrdu: 'کھیلیں', icon: Gamepad2, accentColor: 'bg-emerald-600' },
    { s: 'practice', label: 'Practice', labelUrdu: 'مشق', icon: PenTool, accentColor: 'bg-violet-600' },
    { s: 'poetry', label: 'Poetry', labelUrdu: 'شاعری', icon: Feather, accentColor: 'bg-amber-700' },
    { s: 'stories', label: 'Stories', labelUrdu: 'کہانیاں', icon: BookmarkCheck, accentColor: 'bg-orange-600' },
    { s: 'videos', label: 'Videos', labelUrdu: 'ویڈیوز', icon: Video, accentColor: 'bg-red-600' },
    { s: 'shorts', label: 'Shorts', labelUrdu: 'شارٹس', icon: Zap, accentColor: 'bg-rose-600' },
    { s: 'daily', label: 'Daily Sparks', labelUrdu: 'روزانہ', icon: Calendar, accentColor: 'bg-teal-600' },
    { s: 'explore', label: 'Explore', labelUrdu: 'دریافت', icon: Compass, accentColor: 'bg-cyan-600' },
    { s: 'ai', label: 'AI Helper', labelUrdu: 'اے آئی', icon: Bot, accentColor: 'bg-purple-600' },
    { s: 'kids', label: 'Kids Portal', labelUrdu: 'بچے', icon: Baby, accentColor: 'bg-amber-500', isKids: true },
  ];

  // Check scroll position to show/hide/disable arrows
  const checkScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);

    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [checkScrollState]);

  // Auto-scroll the active tab into view horizontally on mobile/tablet/desktop
  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.querySelector<HTMLElement>('[data-active="true"]');
    if (activeEl) {
      const container = containerRef.current;
      const scrollLeft =
        activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
      setTimeout(checkScrollState, 350);
    }
  }, [currentScreen, checkScrollState]);

  // Scroll left and right functions
  const handleScrollLeft = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    setTimeout(checkScrollState, 320);
  };

  const handleScrollRight = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    setTimeout(checkScrollState, 320);
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-16 sm:top-20 z-30 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative flex items-center">
        {/* Left Arrow Button (Aagay / Peechay Scroll Button) */}
        <button
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
          aria-label="Scroll navigation tabs left"
          title="Previous tabs (پیچھے)"
          className={`shrink-0 z-10 p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer mr-1.5 sm:mr-2 shadow-xs ${
            canScrollLeft
              ? 'bg-white hover:bg-sky-50 text-slate-800 hover:text-sky-700 border-slate-300 hover:border-sky-300 active:scale-95 opacity-100'
              : 'bg-slate-100/70 text-slate-300 border-slate-200 cursor-not-allowed opacity-40'
          }`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Horizontal Scrollable Tabs Container */}
        <div
          ref={containerRef}
          className="flex-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none text-xs font-bold scroll-smooth"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentScreen === tab.s;

            return (
              <button
                key={tab.s}
                data-active={isActive ? 'true' : 'false'}
                onClick={() => {
                  if (tab.isKids) {
                    onToggleKidsMode();
                  } else {
                    onNavigate(tab.s);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shrink-0 transition-all cursor-pointer select-none active:scale-95 ${
                  isActive
                    ? `${tab.accentColor} text-white shadow-sm ring-2 ring-white/40 scale-102`
                    : tab.isKids
                    ? 'bg-amber-100/90 text-amber-950 border border-amber-300/80 hover:bg-amber-200/80'
                    : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                <span className="hidden sm:inline font-urdu text-[11px] opacity-80">
                  ({tab.labelUrdu})
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button (Aagay Scroll Button) */}
        <button
          onClick={handleScrollRight}
          disabled={!canScrollRight}
          aria-label="Scroll navigation tabs right"
          title="Next tabs (آگے)"
          className={`shrink-0 z-10 p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer ml-1.5 sm:ml-2 shadow-xs ${
            canScrollRight
              ? 'bg-white hover:bg-sky-50 text-slate-800 hover:text-sky-700 border-slate-300 hover:border-sky-300 active:scale-95 opacity-100'
              : 'bg-slate-100/70 text-slate-300 border-slate-200 cursor-not-allowed opacity-40'
          }`}
        >
          <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>
      </div>
    </div>
  );
};
