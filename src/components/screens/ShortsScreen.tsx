import React, { useState, useEffect } from 'react';
import {
  Film,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Sparkles,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { SHORTS_ITEMS } from '../../data/mockData';
import { fetchYouTubeVideos } from '../../services/contentService';
import { ContentItem } from '../../types';

export const ShortsScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortsList, setShortsList] = useState<ContentItem[]>(SHORTS_ITEMS);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>({
    'short-1': 2400,
    'short-2': 5120,
    'short-3': 1890,
    'short-4': 3450,
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadShorts = async () => {
    setIsLoading(true);
    try {
      const res = await fetchYouTubeVideos(true);
      if (res.items && res.items.length > 0) {
        setShortsList(res.items);
        setIsLive(res.source === 'live');
      } else {
        setShortsList(SHORTS_ITEMS);
        setIsLive(false);
      }
    } catch {
      setShortsList(SHORTS_ITEMS);
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadShorts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const categories = ['All', 'Latest', 'Educational', 'Kids', 'Poetry', 'Entertainment'];

  const filteredShorts =
    activeCategory === 'All'
      ? shortsList
      : shortsList.filter(
          (s) =>
            s.category?.toLowerCase() === activeCategory.toLowerCase() ||
            (s.tags && s.tags.some((t) => t.toLowerCase() === activeCategory.toLowerCase()))
        );

  const safeList = filteredShorts.length > 0 ? filteredShorts : shortsList;
  const currentShort = safeList[currentIndex] || safeList[0] || SHORTS_ITEMS[0];

  const handleLike = (id: string) => {
    setIsLiked((prev) => {
      const currentlyLiked = prev[id] || false;
      const count = likesCount[id] || 1000;
      setLikesCount((lc) => ({
        ...lc,
        [id]: currentlyLiked ? count - 1 : count + 1,
      }));
      return { ...prev, [id]: !currentlyLiked };
    });
  };

  const handleNext = () => {
    if (currentIndex + 1 < safeList.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(safeList.length - 1);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <SectionHeader
            kicker="Bite-Sized Radiance"
            title="Shorts Chamber"
            titleUrdu="مختصر و پر اثر ویڈیوز"
            description="Fast, focused 60-second micro-learnings, riddles, math hacks, and poetic couplets."
            className="mb-0"
          />
          {/* Live indicator */}
          <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Channel Shorts Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Curated Shorts Library (Fallback Active)
              </span>
            )}
            <button
              onClick={loadShorts}
              title="Refresh shorts"
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <a
          href="https://www.youtube.com/@EntertheWorldofLight/shorts"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 self-start sm:self-end transition-colors shrink-0 shadow-xs"
        >
          <span>YouTube Shorts</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Category selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-colors min-h-[40px] ${
              activeCategory === cat
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Shorts Player Container (Centered phone/vertical card layout) */}
      <div className="max-w-md mx-auto relative flex items-center justify-center">
        {/* Main Vertical Short Card */}
        <div
          className={`relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr ${
            currentShort.gradient || 'from-sky-700 via-indigo-900 to-slate-950'
          } p-6 flex flex-col justify-between text-white border border-slate-800`}
        >
          {/* Real YouTube Video Embed or Thumbnail Backdrop */}
          {currentShort.videoId && isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentShort.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${currentShort.videoId}&controls=1&modestbranding=1&rel=0`}
              title={currentShort.title}
              className="absolute inset-0 w-full h-full border-0 z-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            (currentShort.imageUrl || currentShort.thumbnailUrl) && (
              <img
                src={currentShort.imageUrl || currentShort.thumbnailUrl}
                alt={currentShort.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
              />
            )
          )}

          {/* Gradient overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none z-5" />

          {/* Top Bar inside short */}
          <div className="flex items-center justify-between z-10 text-xs sm:text-sm">
            <span className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full font-bold">
              {currentShort.category || 'Shorts'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-rose-300" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white fill-current" />
                )}
              </button>
            </div>
          </div>

          {/* Toast Notification overlay inside Short */}
          {toastMessage && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full border border-white/20 shadow-xl backdrop-blur-md animate-in fade-in">
              {toastMessage}
            </div>
          )}

          {/* Center Info when paused or fallback */}
          {!isPlaying && (
            <div className="my-auto text-center z-10 px-4">
              <div
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/40 cursor-pointer hover:scale-110 transition-transform"
              >
                <Play className="w-8 h-8 text-white fill-current translate-x-0.5" />
              </div>
              <p className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-1">
                Enter the World of Light
              </p>
              <p className="text-sm font-medium text-white/90">Paused · Tap to Play</p>
            </div>
          )}

          {/* Bottom Info & Action overlay */}
          <div className="z-10 flex items-end justify-between gap-4 mt-auto">
            <div className="flex-1 space-y-2">
              {currentShort.titleUrdu && (
                <p className="font-urdu text-xl text-amber-200 font-bold leading-snug drop-shadow-md">
                  {currentShort.titleUrdu}
                </p>
              )}
              <h3 className="text-lg font-extrabold text-white leading-tight drop-shadow-md line-clamp-2">
                {currentShort.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/90 line-clamp-2 leading-relaxed font-normal drop-shadow-xs">
                {currentShort.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-white/80 pt-1 font-medium">
                <span>{currentShort.views || 'Official Short'}</span>
                <span aria-hidden="true">·</span>
                <span>{currentShort.duration || '0:59'}</span>
              </div>
            </div>

            {/* Right Vertical Action Buttons */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <button
                onClick={() => handleLike(currentShort.id)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div
                  className={`p-3.5 rounded-full backdrop-blur-md transition-all ${
                    isLiked[currentShort.id]
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-black/50 hover:bg-black/70 text-white'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isLiked[currentShort.id] ? 'fill-current' : ''
                    }`}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-white/95">
                  {likesCount[currentShort.id] || 2400}
                </span>
              </button>

              <button
                onClick={() => showToast('Comments community preview open!')}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div className="p-3.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-white/95">84</span>
              </button>

              <button
                onClick={() => {
                  const shareUrl = currentShort.videoId
                    ? `https://www.youtube.com/shorts/${currentShort.videoId}`
                    : `https://www.youtube.com/@EntertheWorldofLight`;
                  navigator.clipboard?.writeText(
                    `Watch "${currentShort.title}" on Enter the World of Light: ${shareUrl}`
                  );
                  showToast('Link copied to clipboard! ✓');
                }}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div className="p-3.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white/95">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Up / Down Navigation Controls on Desktop */}
        <div className="hidden lg:flex flex-col gap-2 absolute -right-16 top-1/2 -translate-y-1/2">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:text-sky-600 transition-colors cursor-pointer"
            title="Previous Short"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:text-sky-600 transition-colors cursor-pointer"
            title="Next Short"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile next/prev controls */}
      <div className="flex lg:hidden justify-center items-center gap-3">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs cursor-pointer"
        >
          Previous Short
        </button>
        <span className="text-xs font-mono font-bold text-slate-500">
          {currentIndex + 1} / {safeList.length}
        </span>
        <button
          onClick={handleNext}
          className="px-6 py-2 rounded-xl bg-sky-600 text-xs font-semibold text-white shadow-xs cursor-pointer"
        >
          Next Short
        </button>
      </div>
    </div>
  );
};
