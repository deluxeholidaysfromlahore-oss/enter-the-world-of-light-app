import React, { useState, useRef, useEffect, UIEvent } from 'react';
import {
  X,
  Heart,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Type,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { ContentItem } from '../../types';
import { activityPointsService } from '../../services/activityPointsService';

interface ReaderModalProps {
  item: ContentItem | null;
  onClose: () => void;
  onFavorite?: (item: ContentItem) => void;
  isFavorited?: boolean;
}

export const ReaderModal: React.FC<ReaderModalProps> = ({
  item,
  onClose,
  onFavorite,
  isFavorited = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'urdu' | 'english'>('all');
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackedItemsRef = useRef<Set<string>>(new Set());

  // Reset scroll and progress when item or activeTab changes, and track activity
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    setScrollProgress(0);

    if (item && !trackedItemsRef.current.has(item.id)) {
      trackedItemsRef.current.add(item.id);
      const isUrdu =
        item.category?.toLowerCase().includes('urdu') ||
        item.subcategory?.toLowerCase().includes('urdu') ||
        Boolean(item.contentBodyUrdu);

      activityPointsService.trackActivity({
        category: 'reading',
        itemId: item.id,
        title: item.title,
        isUrduStory: isUrdu,
        xpEarned: isUrdu ? 35 : 25,
      }).catch(() => {});
    }

    // After render, check if the content already fits without scroll
    const timer = setTimeout(() => {
      calculateProgress();
    }, 50);
    return () => clearTimeout(timer);
  }, [item?.id, activeTab, fontSize]);

  const calculateProgress = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll <= 0) {
      setScrollProgress(100);
    } else {
      const percentage = Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100)));
      setScrollProgress(percentage);
    }
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll <= 0) {
      setScrollProgress(100);
    } else {
      const percentage = Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100)));
      setScrollProgress(percentage);
    }
  };

  if (!item) return null;

  const handleCopy = () => {
    const textToCopy = `${item.title}\n\n${item.contentBodyUrdu ? item.contentBodyUrdu + '\n\n' : ''}${item.contentBody || ''}\n\n— Enter the World of Light & Laughter`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'huge':
        return 'text-xl sm:text-2xl leading-relaxed';
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  const getUrduFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-3xl sm:text-4xl leading-loose';
      case 'huge':
        return 'text-4xl sm:text-5xl leading-loose';
      default:
        return 'text-2xl sm:text-3xl leading-loose';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/90">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 truncate mr-2">
            <span className="font-bold text-slate-900">{item.category}</span>
            {item.subcategory && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-700 font-medium">{item.subcategory}</span>
              </>
            )}
            {item.author && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="truncate text-slate-700">{item.author}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Reading Progress Pill in Header */}
            <div
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 shadow-2xs"
              title="Reading Progress"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span className="font-mono text-sky-700">{scrollProgress}%</span>
              <span className="text-slate-400 font-normal">read</span>
            </div>

            {/* Audio Read Mockup */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              title={isPlayingAudio ? 'Pause Narration' : 'Listen with Audio'}
              className={`p-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isPlayingAudio
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden md:inline">Playing...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                  <span className="hidden md:inline">Listen</span>
                </>
              )}
            </button>

            {/* Font Size Toggle */}
            <button
              onClick={() => {
                const sizes: ('normal' | 'large' | 'huge')[] = ['normal', 'large', 'huge'];
                const next = sizes[(sizes.indexOf(fontSize) + 1) % sizes.length];
                setFontSize(next);
              }}
              title="Adjust Font Size"
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              title="Copy to clipboard"
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            {/* Favorite */}
            {onFavorite && (
              <button
                onClick={() => onFavorite(item)}
                title="Save"
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorited ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
              </button>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Reading Progress Bar at the top of the content */}
        <div
          role="progressbar"
          aria-valuenow={scrollProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading progress"
          className="w-full h-1.5 bg-slate-100 relative overflow-hidden shrink-0"
        >
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Scrollable Reader Content */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6"
        >
          {/* Title Area */}
          <div className="text-center max-w-xl mx-auto space-y-2 border-b border-slate-100 pb-6">
            {item.titleUrdu && (
              <h2 className="font-urdu text-3xl sm:text-4xl text-slate-900 font-bold leading-normal">
                {item.titleUrdu}
              </h2>
            )}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {item.title}
            </h1>
            {(item.author || item.poetName) && (
              <p className="text-sm font-bold text-sky-800 pt-1">
                By {item.poetName || item.author}
              </p>
            )}
          </div>

          {/* Embedded YouTube Video Player if video item */}
          {(item.videoId || item.videoUrl) && (
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-video bg-black relative">
                <iframe
                  src={
                    item.embedUrl ||
                    (item.videoId
                      ? `https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&modestbranding=1&rel=0`
                      : `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(item.title)}`)
                  }
                  title={item.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-end">
                <a
                  href={item.videoUrl || (item.videoId ? `https://www.youtube.com/watch?v=${item.videoId}` : 'https://www.youtube.com/@EntertheWorldofLight')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
                >
                  <span>Watch directly on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Bilingual Filter Tabs if Urdu is present */}
          {item.contentBodyUrdu && (
            <div className="flex justify-center">
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/60">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Both Languages
                </button>
                <button
                  onClick={() => setActiveTab('urdu')}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'urdu'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  اردو متن
                </button>
                <button
                  onClick={() => setActiveTab('english')}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'english'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  English Text
                </button>
              </div>
            </div>
          )}

          {/* Urdu Body */}
          {item.contentBodyUrdu && (activeTab === 'all' || activeTab === 'urdu') && (
            <div className="p-7 sm:p-9 rounded-2xl bg-amber-50/60 border border-amber-200/80 shadow-xs">
              <div
                className={`font-urdu font-bold text-stone-950 text-right whitespace-pre-line ${getUrduFontSizeClass()}`}
              >
                {item.contentBodyUrdu}
              </div>
            </div>
          )}

          {/* English / Story Body */}
          {item.contentBody && (activeTab === 'all' || activeTab === 'english') && (
            <div className="p-7 sm:p-9 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
              <div
                className={`font-sans text-slate-800 whitespace-pre-line leading-relaxed ${getFontSizeClass()}`}
              >
                {item.contentBody}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar with reading completion indicator */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Reading Progress:</span>
            <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/80">
              {scrollProgress}%
            </span>
            {scrollProgress >= 95 ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Complete
              </span>
            ) : (
              <span className="text-slate-400 hidden sm:inline">
                Scroll to continue reading
              </span>
            )}
          </div>
          <span className="text-slate-500 font-medium">Enter the World of Light</span>
        </div>
      </div>
    </div>
  );
};
