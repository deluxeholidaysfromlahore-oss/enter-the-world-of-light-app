/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { ScreenType, ContentItem } from './types';
import { Header } from './components/common/Header';
import { AppSubNav } from './components/common/AppSubNav';
import { BottomNav } from './components/common/BottomNav';
import { ReaderModal } from './components/common/ReaderModal';
import { VideoPlayerModal } from './components/common/VideoPlayerModal';
import { SearchModal } from './components/common/SearchModal';
import { NotificationModal } from './components/common/NotificationModal';
import { AuthModal } from './components/common/AuthModal';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { LearnScreen } from './components/screens/LearnScreen';
import { PlayScreen } from './components/screens/PlayScreen';
import { PracticeScreen } from './components/screens/PracticeScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { PoetryScreen } from './components/screens/PoetryScreen';
import { StoriesScreen } from './components/screens/StoriesScreen';
import { VideosScreen } from './components/screens/VideosScreen';
import { ShortsScreen } from './components/screens/ShortsScreen';
import { DailyScreen } from './components/screens/DailyScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { KidsModeScreen } from './components/screens/KidsModeScreen';
import { AIAssistantScreen } from './components/screens/AIAssistantScreen';
import { AdminPanelScreen } from './components/screens/AdminPanelScreen';
import { BloggerChatScreen } from './components/chat/BloggerChatScreen';
import { CacheCleanerModal } from './components/common/CacheCleanerModal';
import { AdminLockGate } from './components/common/AdminLockGate';
import { SEOHead } from './components/common/SEOHead';
import { BlogPromotionHub } from './components/common/BlogPromotionHub';

// Firebase services
import {
  subscribeToAuth,
  getFavorites,
  addFavorite,
  removeFavorite,
  logWatchHistory,
} from './services/firebase';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [isKidsMode, setIsKidsMode] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);

  const ADMIN_EMAILS = ['deluxeholidaysfromlahore@gmail.com'];
  const isAdmin = Boolean(
    (currentUser?.email && ADMIN_EMAILS.includes(currentUser.email.toLowerCase().trim())) ||
      isAdminUnlocked
  );

  // Modals state
  const [activeReaderItem, setActiveReaderItem] = useState<ContentItem | null>(null);
  const [activeVideoItem, setActiveVideoItem] = useState<ContentItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCacheCleanerOpen, setIsCacheCleanerOpen] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'poet-1': true,
    'story-1': true,
  });

  // Subscribe to real Firebase Authentication
  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userFavs = await getFavorites(user.uid);
          if (userFavs && userFavs.length > 0) {
            const favMap: Record<string, boolean> = {};
            userFavs.forEach((f) => {
              favMap[f.contentId] = true;
            });
            setFavorites(favMap);
          }
        } catch (e) {
          console.warn('Could not fetch user favorites from cloud:', e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = async (item: ContentItem) => {
    const isNowFav = !favorites[item.id];
    setFavorites((prev) => ({
      ...prev,
      [item.id]: isNowFav,
    }));

    if (currentUser) {
      try {
        if (isNowFav) {
          await addFavorite(currentUser.uid, item.id, item.category, item.title);
        } else {
          await removeFavorite(currentUser.uid, item.id);
        }
      } catch (err) {
        console.warn('Sync favorite error:', err);
      }
    }
  };

  const handleSelectVideo = (item: ContentItem) => {
    setActiveVideoItem(item);
    if (currentUser) {
      logWatchHistory(currentUser.uid, item.id, item.title, 0, false).catch(() => {});
    }
  };

  // Keyboard shortcut ⌘K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (screen: ScreenType) => {
    if (screen === 'kids') {
      setIsKidsMode(true);
    } else {
      setIsKidsMode(false);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleKidsMode = () => {
    if (!isKidsMode) {
      setIsKidsMode(true);
      setCurrentScreen('kids');
    } else {
      setIsKidsMode(false);
      setCurrentScreen('home');
    }
  };

  // If user chooses Splash Screen preview
  if (currentScreen === 'splash') {
    return (
      <>
        <SplashScreen
          onGetStarted={() => setCurrentScreen('home')}
          onSignIn={() => setIsAuthOpen(true)}
        />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={() => {
            setIsAuthOpen(false);
            setCurrentScreen('home');
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Dynamic SEO Meta Tags, Canonical URL & Schema.org JSON-LD */}
      <SEOHead currentScreen={currentScreen} isKidsMode={isKidsMode} />

      {/* Global Top Header (Hidden in dedicated Kids Mode for simplified experience) */}
      {!isKidsMode && (
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenCacheCleaner={() => setIsCacheCleanerOpen(true)}
          isKidsMode={isKidsMode}
          onToggleKidsMode={handleToggleKidsMode}
          user={currentUser}
          onOpenAuth={() => setIsAuthOpen(true)}
          isAdmin={isAdmin}
        />
      )}

      {/* Responsive Horizontal Sub-Nav Pill Bar across all screens */}
      {!isKidsMode && (
        <AppSubNav
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onToggleKidsMode={handleToggleKidsMode}
        />
      )}

      {/* Screen Router with responsive padding for mobile bottom nav */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-6 pb-28 lg:pb-12">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectContent={(item) => setActiveReaderItem(item)}
            onSelectPoetry={(item) => setActiveReaderItem(item)}
            onSelectVideo={handleSelectVideo}
            onToggleKidsMode={handleToggleKidsMode}
          />
        )}

        {currentScreen === 'learn' && (
          <LearnScreen
            onSelectContent={(item) => setActiveReaderItem(item)}
          />
        )}

        {currentScreen === 'play' && <PlayScreen />}

        {currentScreen === 'practice' && <PracticeScreen />}

        {currentScreen === 'explore' && (
          <ExploreScreen
            onNavigate={handleNavigate}
            onSelectContent={(item) => setActiveReaderItem(item)}
            onSelectPoetry={(item) => setActiveReaderItem(item)}
            onFavorite={toggleFavorite}
            favorites={favorites}
          />
        )}

        {currentScreen === 'poetry' && (
          <PoetryScreen
            onSelectPoetry={(item) => setActiveReaderItem(item)}
            onFavorite={toggleFavorite}
            favorites={favorites}
          />
        )}

        {currentScreen === 'stories' && (
          <StoriesScreen
            onSelectStory={(item) => setActiveReaderItem(item)}
            onFavorite={toggleFavorite}
            favorites={favorites}
          />
        )}

        {currentScreen === 'videos' && (
          <VideosScreen
            onSelectVideo={handleSelectVideo}
          />
        )}

        {currentScreen === 'shorts' && <ShortsScreen />}

        {currentScreen === 'daily' && <DailyScreen />}

        {currentScreen === 'profile' && (
          <ProfileScreen
            onNavigate={handleNavigate}
            user={currentUser}
            onOpenAuth={() => setIsAuthOpen(true)}
            favoritesCount={Object.values(favorites).filter(Boolean).length}
          />
        )}

        {currentScreen === 'kids' && (
          <KidsModeScreen
            onExit={() => {
              setIsKidsMode(false);
              setCurrentScreen('home');
            }}
            onSelectStory={(item) => setActiveReaderItem(item)}
            onSelectContent={(item) => setActiveReaderItem(item)}
            currentUser={currentUser}
            isAdmin={isAdmin}
          />
        )}

        {currentScreen === 'ai' && (
          <AIAssistantScreen isKidsMode={isKidsMode} onNavigate={handleNavigate} />
        )}

        {currentScreen === 'blogger' &&
          (isAdmin ? (
            <BloggerChatScreen onNavigate={handleNavigate} />
          ) : (
            <AdminLockGate
              currentUser={currentUser}
              onOpenAuth={() => setIsAuthOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
              onAdminVerified={() => setIsAdminUnlocked(true)}
            />
          ))}

        {currentScreen === 'admin' &&
          (isAdmin ? (
            <AdminPanelScreen />
          ) : (
            <AdminLockGate
              currentUser={currentUser}
              onOpenAuth={() => setIsAuthOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
              onAdminVerified={() => setIsAdminUnlocked(true)}
            />
          ))}
      </main>

      {/* Mobile Fixed Bottom Navigation (Tabs neche ajate hai) */}
      {!isKidsMode && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onToggleKidsMode={handleToggleKidsMode}
        />
      )}

      {/* Global Modals & Drawers */}
      <ReaderModal
        item={activeReaderItem}
        onClose={() => setActiveReaderItem(null)}
        onFavorite={toggleFavorite}
        isFavorited={activeReaderItem ? !!favorites[activeReaderItem.id] : false}
      />

      <VideoPlayerModal
        item={activeVideoItem}
        onClose={() => setActiveVideoItem(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectContent={(item) => setActiveReaderItem(item)}
        onNavigate={handleNavigate}
      />

      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateToDaily={() => handleNavigate('daily')}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => setIsAuthOpen(false)}
      />

      <CacheCleanerModal
        isOpen={isCacheCleanerOpen}
        onClose={() => setIsCacheCleanerOpen(false)}
      />

      {/* Official Blogger Network & SEO Promotion Hub */}
      {!isKidsMode && <BlogPromotionHub />}

      {/* Quick Nav Footer Bar for Development & Exploration */}
      {!isKidsMode && (
        <footer className="w-full bg-white border-t border-slate-200/90 mt-20 py-8 text-sm text-slate-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left">
              <p className="font-bold text-base text-slate-900">
                Enter the World of Light & Laughter
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Learn • Play • Practice &bull; Read • Listen • Explore
              </p>
            </div>

            {/* Quick Screen Switcher for reviewing all screens */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-2xl">
              <span className="text-xs uppercase font-extrabold text-slate-400 mr-1.5">
                Screens:
              </span>
              {[
                { s: 'splash', label: 'Splash' },
                { s: 'home', label: 'Home' },
                { s: 'learn', label: 'Learn' },
                { s: 'play', label: 'Play' },
                { s: 'practice', label: 'Practice' },
                { s: 'explore', label: 'Explore' },
                { s: 'poetry', label: 'Poetry' },
                { s: 'stories', label: 'Stories' },
                { s: 'videos', label: 'Videos' },
                { s: 'shorts', label: 'Shorts' },
                { s: 'daily', label: 'Daily' },
                { s: 'profile', label: 'Profile' },
                { s: 'kids', label: 'Kids Mode' },
                { s: 'ai', label: 'AI Assistant' },
                ...(isAdmin
                  ? [
                      { s: 'blogger', label: 'Blogger Chat (15)' },
                      { s: 'admin', label: 'Admin Console' },
                    ]
                  : []),
              ].map((item) => (
                <button
                  key={item.s}
                  onClick={() => handleNavigate(item.s as ScreenType)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentScreen === item.s
                      ? 'bg-sky-600 text-white shadow-xs font-extrabold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
