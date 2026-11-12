import React, { useState } from 'react';
import {
  Search,
  Bell,
  ShieldCheck,
  Flame,
  Baby,
  User as UserIcon,
  Zap,
  Globe,
  Menu,
  X,
  BookOpen,
  Gamepad2,
  PenTool,
  Feather,
  BookmarkCheck,
  Video,
  Calendar,
  Sparkles,
  Compass,
  ChevronRight,
  ExternalLink,
  Youtube,
  MessageCircle,
  Share2,
  Trophy,
  Award,
  RotateCcw,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { BrandLogo } from './BrandLogo';
import { ScreenType } from '../../types';
import { AppPromotionModal } from './AppPromotionModal';
import { reloadApp } from '../../services/contentService';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenCacheCleaner?: () => void;
  onOpenAchievements?: () => void;
  isKidsMode: boolean;
  onToggleKidsMode: () => void;
  unreadCount?: number;
  user?: User | null;
  onOpenAuth?: () => void;
  isAdmin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenSearch,
  onOpenNotifications,
  onOpenCacheCleaner,
  onOpenAchievements,
  isKidsMode,
  onToggleKidsMode,
  unreadCount = 3,
  user,
  onOpenAuth,
  isAdmin: propIsAdmin,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Learner';
  const initial = (displayName[0] || 'U').toUpperCase();
  const ADMIN_EMAILS = ['deluxeholidaysfromlahore@gmail.com'];
  const isAdmin = Boolean(propIsAdmin || (user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase().trim())));

  const handleNavClick = (screen: ScreenType) => {
    setIsMobileMenuOpen(false);
    onNavigate(screen);
  };

  const navItems: { s: ScreenType; label: string }[] = [
    { s: 'home', label: 'Home' },
    { s: 'learn', label: 'Learn' },
    { s: 'play', label: 'Play' },
    { s: 'practice', label: 'Practice' },
    { s: 'poetry', label: 'Poetry' },
    { s: 'stories', label: 'Stories' },
    { s: 'videos', label: 'Videos' },
    { s: 'explore', label: 'Explore' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <div className="flex items-center shrink-0 min-w-0">
          <BrandLogo
            size="sm"
            showText={true}
            onClick={() => onNavigate('home')}
          />
        </div>

        {/* Zone 2: Primary Desktop & Tablet Navigation Links (Visible on xl) */}
        <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold text-slate-600">
          {navItems.map((item) => {
            const isActive = currentScreen === item.s;
            return (
              <button
                key={item.s}
                onClick={() => onNavigate(item.s)}
                className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-sky-700 bg-sky-50 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Responsive on Mobile, Tablet & Desktop) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search repository"
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors border border-slate-200/60 shadow-xs min-h-[38px] sm:min-h-[40px] cursor-pointer"
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden xl:inline text-[10px] font-mono bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-500 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Public Memory & Cache Cleaner Option (Responsive) */}
          {onOpenCacheCleaner && (
            <button
              onClick={onOpenCacheCleaner}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all border border-amber-200/90 shadow-2xs min-h-[38px] sm:min-h-[40px] cursor-pointer"
              title="Clear Extra Cache & Free Memory (App Memory & Cache Saver)"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
              <span className="hidden sm:inline">Free Memory</span>
            </button>
          )}

          {/* Quick Reload App Button (Direct 1-click refresh to prevent memory exhaustion) */}
          <button
            onClick={() => reloadApp(true)}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 rounded-xl transition-all border border-sky-200/90 shadow-2xs min-h-[38px] sm:min-h-[40px] cursor-pointer"
            title="Reload App (ایپ ری لوڈ کریں) - Frees all browser memory"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span className="hidden xl:inline">Reload</span>
          </button>

          {/* Desktop Only: Google Blogger Syndication Chat 15 (Admin only) */}
          {isAdmin && (
            <button
              onClick={() => onNavigate('blogger')}
              className={`hidden 2xl:flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] cursor-pointer ${
                currentScreen === 'blogger'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/80'
              }`}
              title="Chat 15: Google Blogger & YouTube Shorts Syndication"
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>Blogger Chat</span>
            </button>
          )}

          {/* Official YouTube Channel (Distinct Red Button) */}
          <a
            href="https://www.youtube.com/@EntertheWorldofLight"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs transition-colors min-h-[40px] cursor-pointer shrink-0"
            title="Official YouTube Channel (@EntertheWorldofLight)"
          >
            <Youtube className="w-4 h-4 fill-white text-red-600" />
            <span className="hidden xl:inline">YouTube</span>
          </a>

          {/* Official WhatsApp Channel (Distinct Green Button) */}
          <a
            href="https://whatsapp.com/channel/0029VasZV4a60eBd8TwfTg1f"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors min-h-[40px] cursor-pointer shrink-0"
            title="Official WhatsApp Community Channel"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>

          {/* Promote & Share App Button */}
          <button
            onClick={() => setIsPromoteModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-xs transition-all min-h-[38px] sm:min-h-[40px] cursor-pointer shrink-0 active:scale-95"
            title="Promote & Share App on WhatsApp, Facebook, X, QR Code"
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            <span className="hidden sm:inline">Promote App</span>
            <span className="sm:hidden text-[11px] font-black">Share</span>
          </button>

          {/* Kids Mode Switcher (Fully responsive on mobile, tablet & desktop) */}
          <button
            onClick={onToggleKidsMode}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[38px] sm:min-h-[40px] shadow-xs cursor-pointer ${
              isKidsMode
                ? 'bg-amber-400 text-amber-950 shadow-md shadow-amber-300/50 ring-2 ring-amber-300'
                : 'bg-amber-100/90 hover:bg-amber-200 text-amber-950 border border-amber-300/70'
            }`}
            title="Switch to Kids Mode"
          >
            <Baby className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">Kids Mode</span>
            <span className="sm:hidden text-[11px] font-black">Kids</span>
          </button>

          {/* Desktop Only: Admin Panel Toggle (Admin only) */}
          {isAdmin && (
            <button
              onClick={() => onNavigate(currentScreen === 'admin' ? 'home' : 'admin')}
              className={`hidden lg:flex p-2.5 rounded-xl text-xs font-semibold transition-colors min-h-[40px] min-w-[40px] items-center justify-center cursor-pointer ${
                currentScreen === 'admin'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
              }`}
              title="Admin Console"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}

          {/* Achievements & Badges Drawer Trigger */}
          {onOpenAchievements && (
            <button
              onClick={onOpenAchievements}
              aria-label="Achievements & Badges"
              className="p-2 sm:p-2.5 text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200/90 transition-colors min-h-[38px] sm:min-h-[40px] min-w-[38px] sm:min-w-[40px] flex items-center justify-center cursor-pointer shadow-2xs"
              title="Achievements & Virtual Badges"
            >
              <Trophy className="w-4 h-4 fill-amber-400 text-amber-600" />
            </button>
          )}

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative p-2 sm:p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200/60 transition-colors min-h-[38px] sm:min-h-[40px] min-w-[38px] sm:min-w-[40px] flex items-center justify-center cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Desktop / Tablet: User Avatar or Sign In */}
          <div className="hidden sm:flex items-center">
            {user ? (
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-xs transition-colors min-h-[38px] cursor-pointer"
                title={`Signed in as ${displayName}`}
              >
                <span className="flex items-center text-xs font-extrabold text-amber-600">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-0.5" />
                  7
                </span>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={displayName}
                    className="w-6 h-6 rounded-xl object-cover shadow-xs border border-white"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                    {initial}
                  </div>
                )}
              </button>
            ) : (
              <button
                onClick={onOpenAuth || (() => onNavigate('profile'))}
                className="flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs min-h-[38px] cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile & Tablet Navigation Drawer Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer / Sheet */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in">
          {/* Backdrop Click to close */}
          <div
            className="flex-1"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-out Menu Panel */}
          <div className="w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-4 sm:p-6 space-y-5 animate-in slide-in-from-right">
            {/* User Account / Profile Card */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              {user ? (
                <div
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center text-sm font-black shadow-xs">
                    {initial}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 line-clamp-1">
                      {displayName}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 font-bold">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      7 Day Streak
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth();
                    else onNavigate('profile');
                  }}
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Sign In / Create Account</span>
                </button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Kids Mode Feature Card */}
            <div
              onClick={() => {
                setIsMobileMenuOpen(false);
                onToggleKidsMode();
              }}
              className="p-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 rounded-2xl shadow-sm cursor-pointer flex items-center justify-between transition-transform active:scale-98"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/30 backdrop-blur-xs flex items-center justify-center text-lg">
                  👶
                </div>
                <div>
                  <h4 className="text-xs font-black">Kids Light World</h4>
                  <p className="text-[11px] font-bold opacity-90">Safe Learning & Fun Games</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-900" />
            </div>

            {/* Primary Navigation Sections */}
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 pb-1">
                Navigation Hub
              </p>
              {[
                { s: 'home' as ScreenType, label: 'Home Page', icon: Sparkles, color: 'text-sky-600' },
                { s: 'learn' as ScreenType, label: 'Learn & Phonics', icon: BookOpen, color: 'text-blue-600' },
                { s: 'play' as ScreenType, label: 'Play Arcade', icon: Gamepad2, color: 'text-emerald-600' },
                { s: 'practice' as ScreenType, label: 'Practice Lab', icon: PenTool, color: 'text-indigo-600' },
                { s: 'poetry' as ScreenType, label: 'Urdu Poetry & Shayari', icon: Feather, color: 'text-rose-600' },
                { s: 'stories' as ScreenType, label: 'Stories & Fables', icon: BookmarkCheck, color: 'text-amber-600' },
                { s: 'videos' as ScreenType, label: 'Video Lessons', icon: Video, color: 'text-red-600' },
                { s: 'shorts' as ScreenType, label: 'Shorts & Wisdom', icon: Video, color: 'text-purple-600' },
                { s: 'daily' as ScreenType, label: 'Daily Sparks', icon: Calendar, color: 'text-teal-600' },
                { s: 'explore' as ScreenType, label: 'Explore All Collections', icon: Compass, color: 'text-slate-700' },
              ].map((item) => {
                const isActive = currentScreen === item.s;
                const Icon = item.icon;
                return (
                  <button
                    key={item.s}
                    onClick={() => handleNavClick(item.s)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-sky-50 text-sky-900 font-black'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />}
                  </button>
                );
              })}
            </div>

            {/* Utility Tools & Console */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 pb-1">
                Utilities & Socials
              </p>

              {onOpenAchievements && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAchievements();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-amber-900 hover:bg-amber-50"
                >
                  <Trophy className="w-4 h-4 text-amber-600 fill-amber-400" />
                  <span>Achievements & Badges</span>
                </button>
              )}

              {onOpenCacheCleaner && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCacheCleaner();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-amber-900 hover:bg-amber-50"
                >
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>Free Memory & Clear Cache</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  reloadApp(true);
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-sky-800 hover:bg-sky-50"
              >
                <RotateCcw className="w-4 h-4 text-sky-600" />
                <span>Reload App (ایپ ری لوڈ کریں)</span>
              </button>

              {isAdmin && (
                <>
                  <button
                    onClick={() => handleNavClick('blogger')}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-sky-800 hover:bg-sky-50"
                  >
                    <Globe className="w-4 h-4 text-sky-600" />
                    <span>Blogger Chat (15)</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
                  >
                    <ShieldCheck className="w-4 h-4 text-slate-600" />
                    <span>Admin Console</span>
                  </button>
                </>
              )}

              {/* YouTube Channel Link */}
              <a
                href="https://www.youtube.com/@EntertheWorldofLight"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50"
              >
                <div className="flex items-center gap-2">
                  <span>▶️</span>
                  <span>YouTube Channel</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              {/* WhatsApp Channel Link */}
              <a
                href="https://whatsapp.com/channel/0029VasZV4a60eBd8TwfTg1f"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-emerald-800 hover:bg-emerald-50"
              >
                <div className="flex items-center gap-2">
                  <span>💬</span>
                  <span>WhatsApp Community</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              {/* Promote & Share App Modal Trigger */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPromoteModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  <span>Promote App (ایپ شیئر کریں)</span>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Share</span>
              </button>
            </div>

            {/* Close Button at bottom */}
            <div className="pt-2">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Close Menu (بند کریں)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive App Promotion & Viral Sharing Modal */}
      <AppPromotionModal
        isOpen={isPromoteModalOpen}
        onClose={() => setIsPromoteModalOpen(false)}
      />
    </header>
  );
};
