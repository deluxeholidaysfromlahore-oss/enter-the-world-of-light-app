import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  SkipBack,
  SkipForward,
  Star,
  Check,
  Copy,
  Search,
  BookOpen,
  Headphones,
  Sparkles,
  Heart,
  Music,
  ShieldCheck,
  Info,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { kidsAudio } from '../../services/kidsAudio';
import { useKidsTheme } from '../../services/kidsTheme';
import {
  AudioLibraryItem,
  AudioTypeId,
  ALL_13_CATEGORIES,
  TYPE_A_CATEGORIES,
  TYPE_B_CATEGORIES,
  MASTER_AUDIO_LIBRARY_ITEMS,
  getMasterAuditReport,
} from '../../data/kidsAudioLibraryData';

// Backward compatibility exports
export const DUA_NAZM_LIBRARY = MASTER_AUDIO_LIBRARY_ITEMS;
export type DuaNazmTopic = AudioLibraryItem;

interface KidsMusicSectionProps {
  onEarnStar: () => void;
}

export type ViewNavigationMode = 'TYPE_A' | 'TYPE_B' | 'ALL_13_CATEGORIES';

export const KidsMusicSection: React.FC<KidsMusicSectionProps> = ({ onEarnStar }) => {
  const { currentTheme } = useKidsTheme();

  // Navigation state: Audio Type A vs Audio Type B vs All 13 Categories
  const [navMode, setNavMode] = useState<ViewNavigationMode>('TYPE_A');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<AudioLibraryItem | null>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Search & interaction state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [earnedStars, setEarnedStars] = useState<{ [id: string]: boolean }>({});
  const [showLicensingDetails, setShowLicensingDetails] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // HTML5 Audio Lifecycle
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    // CRITICAL REQUIREMENT: Single Track Execution
    // When the selected track ends, the player MUST STOP completely at 0:00.
    // Do NOT trigger auto-play for the next track in the list!
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    const handleError = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, []);

  // Update volume & mute on audioRef
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle Navigation Mode Switch (Type A / Type B / All 13 Categories)
  const handleSwitchNavMode = (mode: ViewNavigationMode) => {
    if (mode === navMode) return;
    kidsAudio.playPopSound();
    setNavMode(mode);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  // Resolve active category list
  const activeNavCategories =
    navMode === 'TYPE_A'
      ? TYPE_A_CATEGORIES
      : navMode === 'TYPE_B'
      ? TYPE_B_CATEGORIES
      : ALL_13_CATEGORIES;

  // Resolve base topic dataset
  const baseDataset =
    navMode === 'TYPE_A'
      ? MASTER_AUDIO_LIBRARY_ITEMS.filter((i) => i.audioTypeId === 'TYPE_A_DUA_AZKAR')
      : navMode === 'TYPE_B'
      ? MASTER_AUDIO_LIBRARY_ITEMS.filter((i) => i.audioTypeId === 'TYPE_B_NASHEED_SONGS')
      : MASTER_AUDIO_LIBRARY_ITEMS;

  // Filter topics based on active category & search query
  const filteredTopics = baseDataset.filter((item) => {
    if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.titleUrdu.includes(q) ||
        item.romanDescription.toLowerCase().includes(q) ||
        item.contentType.toLowerCase().includes(q) ||
        item.sourceReference.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Track list navigation inside active category
  // CRITICAL REQUIREMENT (Phase 7): Category boundary cannot be crossed.
  // Back is disabled on index 0, Next is disabled on last index.
  const activeCategoryList =
    selectedCategory !== 'all'
      ? baseDataset.filter((i) => i.categoryId === selectedCategory)
      : filteredTopics.length > 0
      ? filteredTopics
      : baseDataset;

  const currentTrackIndex = selectedTopic
    ? activeCategoryList.findIndex((t) => t.id === selectedTopic.id)
    : -1;

  const isFirstTrack = currentTrackIndex <= 0;
  const isLastTrack = currentTrackIndex === -1 || currentTrackIndex >= activeCategoryList.length - 1;

  // ON-CLICK ITEM BEHAVIOR:
  // Load selected topic record and initialize playback safely
  const handleSelectTopic = (topic: AudioLibraryItem) => {
    setSelectedTopic(topic);

    if (topic.audioStatus === 'available') {
      playTopicAudio(topic);
    } else {
      // Audio is pending / unavailable: Stop previous audio and reset timer
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }

    // Reward star on visit/listen
    if (!earnedStars[topic.id]) {
      setEarnedStars((prev) => ({ ...prev, [topic.id]: true }));
      kidsAudio.playRewardChime();
      onEarnStar();
    }
  };

  // Play a specific topic's MP3 file directly mapped from its record
  const playTopicAudio = (topic: AudioLibraryItem) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (topic.audioStatus !== 'available') {
      return;
    }

    if (audio.src !== window.location.origin + topic.audioSrc && !audio.src.endsWith(topic.audioSrc)) {
      audio.src = topic.audioSrc;
      audio.currentTime = 0;
      setCurrentTime(0);
    }

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  };

  // Explicit Play control: Resumes from exact timestamp
  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio || !selectedTopic) return;

    if (selectedTopic.audioStatus !== 'available') return;

    if (!audio.src || (!audio.src.endsWith(selectedTopic.audioSrc) && audio.src !== window.location.origin + selectedTopic.audioSrc)) {
      audio.src = selectedTopic.audioSrc;
    }

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  };

  // Explicit Pause control: Freezes audio stream at current timestamp
  const handlePause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  };

  // Explicit Stop control: Resets track to 0:00 and completely releases audio focus
  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // Previous track in active category
  const handlePreviousTrack = () => {
    if (isFirstTrack || activeCategoryList.length === 0) return;
    const prevTopic = activeCategoryList[currentTrackIndex - 1];
    handleSelectTopic(prevTopic);
  };

  // Next track in active category
  const handleNextTrack = () => {
    if (isLastTrack || activeCategoryList.length === 0) return;
    const nextTopic = activeCategoryList[currentTrackIndex + 1];
    handleSelectTopic(nextTopic);
  };

  // Scrub progress slider
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (audio && selectedTopic?.audioStatus === 'available') {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCopyText = (topic: AudioLibraryItem) => {
    const fullText = [
      `🎵 ${topic.title} (${topic.contentType})`,
      `Category: ${topic.categoryTitle}`,
      `Reference: ${topic.sourceReference}`,
      `Authenticity / Creator: ${topic.authenticityGrade || topic.creatorArtist || 'Verified Islamic Content'}`,
      `Audio Status: ${topic.audioStatus === 'available' ? 'Verified Recording' : 'Recording in Studio Production'}`,
      '',
      ...topic.lyrics.map((l) => `${l.original}\n${l.roman}\n(Meaning: ${l.english})\n`),
      '🌟 Enter the World of Light — Kids Light World Islamic Library',
    ].join('\n');

    navigator.clipboard.writeText(fullText);
    setCopiedId(topic.id);
    kidsAudio.playPopSound();
    setTimeout(() => setCopiedId(null), 2500);
  };

  const auditStats = getMasterAuditReport();

  return (
    <div className="space-y-6">
      {/* =========================================================================
          TOP BANNER: Kids Light World Complete Islamic Audio Library 2026
          ========================================================================= */}
      <div
        style={{
          boxShadow: `0 14px 40px -10px ${currentTheme.fromHex}44, 0 4px 16px -2px rgba(0,0,0,0.1)`,
          borderColor: currentTheme.fromHex,
        }}
        className="bg-gradient-to-r from-emerald-700 via-teal-800 to-sky-800 rounded-3xl p-6 sm:p-7 text-white border-3 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden transition-all duration-300"
      >
        {/* Soft decorative glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />

        <div className="space-y-2 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-black border border-white/25 shadow-sm">
            <span>🤲 Kids Light World 2026</span>
            <span>•</span>
            <span>13 Master Categories • 91 Verified Topics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
            <span>Islamic Audio & Supplications Library</span>
            <span className="text-amber-300">✨</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-50 font-medium max-w-xl">
            Clean, strictly classified Islamic content: Verified Masnoon & Quranic Duas (Type A) and Hamd, Naat, Nasheed & Moral Rhymes (Type B).
          </p>
        </div>

        {/* Audit Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 relative z-10">
          <div className="px-3.5 py-2 bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 text-center shadow-xs">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-200 block">
              13 Categories
            </span>
            <span className="text-base font-black text-white">91 Topics</span>
          </div>
          <div className="px-3.5 py-2 bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 text-center shadow-xs">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-200 block">
              Verified Duas (A)
            </span>
            <span className="text-base font-black text-white">{auditStats.typeACount}</span>
          </div>
          <div className="px-3.5 py-2 bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 text-center shadow-xs">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-sky-200 block">
              Nasheeds & Songs (B)
            </span>
            <span className="text-base font-black text-white">{auditStats.typeBCount}</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          AUDIO TYPE SELECTOR TABS (TYPE A vs TYPE B vs ALL 13 CATEGORIES)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* AUDIO TYPE A TAB */}
        <button
          onClick={() => handleSwitchNavMode('TYPE_A')}
          className={`p-4 rounded-3xl text-left transition-all cursor-pointer border-3 relative overflow-hidden active:scale-98 shadow-md flex items-start gap-3.5 ${
            navMode === 'TYPE_A'
              ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 text-white border-amber-300 ring-4 ring-emerald-300/40 shadow-xl'
              : 'bg-white hover:bg-emerald-50/50 text-slate-800 border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-inner shrink-0 ${
              navMode === 'TYPE_A' ? 'bg-amber-400 text-slate-900' : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            🤲
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                  navMode === 'TYPE_A' ? 'bg-white/20 text-amber-200' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                TYPE A
              </span>
              <span className="text-[10px] font-black text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Duas</span>
              </span>
            </div>
            <h4 className="text-sm font-black leading-tight">
              Verified Duas & Azkar (دعائیں)
            </h4>
            <p className={`text-[11px] font-medium line-clamp-2 ${navMode === 'TYPE_A' ? 'text-emerald-100' : 'text-slate-500'}`}>
              Masnoon daily duas, Quranic prayers, and authentic morning & evening azkar with grading.
            </p>
          </div>
        </button>

        {/* AUDIO TYPE B TAB */}
        <button
          onClick={() => handleSwitchNavMode('TYPE_B')}
          className={`p-4 rounded-3xl text-left transition-all cursor-pointer border-3 relative overflow-hidden active:scale-98 shadow-md flex items-start gap-3.5 ${
            navMode === 'TYPE_B'
              ? 'bg-gradient-to-br from-amber-500 via-orange-600 to-teal-700 text-white border-amber-300 ring-4 ring-amber-300/40 shadow-xl'
              : 'bg-white hover:bg-amber-50/50 text-slate-800 border-slate-200 hover:border-amber-300'
          }`}
        >
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-inner shrink-0 ${
              navMode === 'TYPE_B' ? 'bg-white text-slate-900' : 'bg-amber-100 text-amber-800'
            }`}
          >
            🎵
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                  navMode === 'TYPE_B' ? 'bg-white/20 text-amber-200' : 'bg-amber-100 text-amber-800'
                }`}
              >
                TYPE B
              </span>
              <span className="text-[10px] font-black text-amber-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Songs & Rhymes</span>
              </span>
            </div>
            <h4 className="text-sm font-black leading-tight">
              Hamd, Naat & Moral Rhymes (نظمیں)
            </h4>
            <p className={`text-[11px] font-medium line-clamp-2 ${navMode === 'TYPE_B' ? 'text-amber-100' : 'text-slate-500'}`}>
              Hamd, Naat-e-Rasool ﷺ, Allama Iqbal poems, alphabet songs, and character building.
            </p>
          </div>
        </button>

        {/* ALL 13 CATEGORIES OVERVIEW TAB */}
        <button
          onClick={() => handleSwitchNavMode('ALL_13_CATEGORIES')}
          className={`p-4 rounded-3xl text-left transition-all cursor-pointer border-3 relative overflow-hidden active:scale-98 shadow-md flex items-start gap-3.5 ${
            navMode === 'ALL_13_CATEGORIES'
              ? 'bg-gradient-to-br from-sky-600 via-indigo-700 to-purple-800 text-white border-amber-300 ring-4 ring-sky-300/40 shadow-xl'
              : 'bg-white hover:bg-sky-50/50 text-slate-800 border-slate-200 hover:border-sky-300'
          }`}
        >
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-inner shrink-0 ${
              navMode === 'ALL_13_CATEGORIES' ? 'bg-white text-slate-900' : 'bg-sky-100 text-sky-800'
            }`}
          >
            📚
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                  navMode === 'ALL_13_CATEGORIES' ? 'bg-white/20 text-sky-200' : 'bg-sky-100 text-sky-800'
                }`}
              >
                COMPLETE
              </span>
              <span className="text-[10px] font-black text-sky-300 flex items-center gap-1">
                <Layers className="w-3 h-3" />
                <span>Categories 1–13</span>
              </span>
            </div>
            <h4 className="text-sm font-black leading-tight">
              All 13 Categories View (تمام ۱۳ کیٹیگریز)
            </h4>
            <p className={`text-[11px] font-medium line-clamp-2 ${navMode === 'ALL_13_CATEGORIES' ? 'text-sky-100' : 'text-slate-500'}`}>
              Explore all 13 categories directly: Routine, Hamd, Naat, Manners, Masjid, Safar, Hifazat, Sehat, Nature, etc.
            </p>
          </div>
        </button>
      </div>

      {/* =========================================================================
          VIEW SWITCHER: DEDICATED DETAIL VIEW vs BROWSE VIEW
          ========================================================================= */}
      {selectedTopic ? (
        /* =========================================================================
            DEDICATED TOPIC DETAIL VIEW (MATCHING THEME, NEXT/BACK BUTTONS, LYRICS)
            ========================================================================= */
        <div className="space-y-6">
          {/* Back to Library Header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <button
              onClick={() => {
                kidsAudio.playPopSound();
                setSelectedTopic(null);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-amber-50 text-slate-800 rounded-2xl border-2 border-amber-300 text-xs font-black shadow-sm transition-all active:scale-95 cursor-pointer hover:border-amber-400"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-600" />
              <span>Back to Topics List (فہرست میں واپس)</span>
            </button>

            {/* Quick Track Position Counter & Category Name */}
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-white text-slate-800 border-2 border-slate-200 text-xs font-black shadow-xs">
                {selectedTopic.categoryEmoji} Category {selectedTopic.categoryNumber}
              </span>
              <span className="text-xs font-black text-slate-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                {currentTrackIndex + 1} / {activeCategoryList.length}
              </span>
            </div>
          </div>

          {/* DEDICATED THEMATIC PLAYER CARD WITH DYNAMIC THEME BORDER & GLOW SHADOW */}
          <div
            style={{
              borderColor: currentTheme.fromHex,
              boxShadow: `0 20px 50px -10px ${currentTheme.fromHex}66, 0 10px 25px -5px rgba(0,0,0,0.15)`,
            }}
            className="bg-gradient-to-br from-amber-500 via-emerald-600 to-teal-700 rounded-3xl p-5 sm:p-7 text-white shadow-2xl border-4 relative overflow-hidden space-y-6 transition-all duration-300"
          >
            {/* Playful background stars & crescent motifs */}
            <div className="absolute top-2 right-4 text-amber-200/20 text-7xl select-none pointer-events-none font-serif">
              ✨
            </div>
            <div className="absolute -bottom-6 -left-4 text-emerald-300/20 text-8xl select-none pointer-events-none font-serif">
              🌙
            </div>

            {/* Header of Detail Card */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/20 relative z-10">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3.5 py-1 rounded-full bg-amber-300 text-slate-900 text-xs font-black shadow-sm flex items-center gap-1.5">
                    <span>{selectedTopic.categoryEmoji}</span>
                    <span>{selectedTopic.contentType}</span>
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-xs">
                    Cat {selectedTopic.categoryNumber}: {selectedTopic.categoryTitle.replace(/^Category \d+:\s*/, '')}
                  </span>
                  {selectedTopic.authenticityGrade && (
                    <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-200 text-xs font-bold border border-emerald-400/40 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedTopic.authenticityGrade}</span>
                    </span>
                  )}
                  {selectedTopic.creatorArtist && (
                    <span className="px-3 py-1 rounded-full bg-orange-950/50 text-amber-200 text-xs font-bold border border-amber-400/30">
                      Poet / Artist: {selectedTopic.creatorArtist}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 drop-shadow-sm">
                  {selectedTopic.title}
                </h3>
                <p className="text-xl sm:text-2xl font-black text-amber-200 font-urdu leading-relaxed">
                  {selectedTopic.titleUrdu}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-emerald-50 italic">
                  “{selectedTopic.romanDescription}”
                </p>

                {/* Canonical reference pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/20 text-white/90 text-xs font-mono font-medium border border-white/15">
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>Ref: {selectedTopic.sourceReference}</span>
                </div>
              </div>

              {/* Action Badges */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyText(selectedTopic)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/20 hover:bg-white/30 active:scale-95 text-white rounded-2xl text-xs font-black transition-colors cursor-pointer border border-white/30 shadow-xs"
                  title="Copy Text to Clipboard"
                >
                  {copiedId === selectedTopic.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span className="text-emerald-200">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>

                {earnedStars[selectedTopic.id] && (
                  <div className="px-3.5 py-2 bg-amber-400 text-slate-900 rounded-2xl border-2 border-white/50 flex items-center gap-1 text-xs font-black shadow-sm">
                    <Star className="w-4 h-4 fill-slate-900" />
                    <span>+1 ⭐ Star!</span>
                  </div>
                )}
              </div>
            </div>

            {/* HIGH-VISIBILITY MEDIA CONTROLLER BOX */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 text-slate-900 border-3 border-amber-300/90 shadow-xl space-y-4 relative z-10">
              {/* Audio Status Banner if pending */}
              {selectedTopic.audioStatus !== 'available' && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 flex items-center gap-2.5 text-xs text-amber-900 font-bold">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Audio Recording In Preparation — Text, Roman Urdu pronunciation & translation are fully active!
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Explicit Media Controls: Back (Previous), Play/Pause, Stop, Next */}
                <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                  {/* PREVIOUS TRACK BUTTON (Strictly disabled on first item of category) */}
                  <button
                    onClick={handlePreviousTrack}
                    disabled={isFirstTrack}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs transition-all border-2 shadow-xs active:scale-95 cursor-pointer ${
                      isFirstTrack
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
                        : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-200'
                    }`}
                    title={isFirstTrack ? 'First item in this category' : 'Previous Track (پچھلا)'}
                  >
                    <SkipBack className="w-4 h-4 text-amber-800" />
                    <span>Back (پچھلا)</span>
                  </button>

                  {/* PLAY / PAUSE BUTTON */}
                  {selectedTopic.audioStatus === 'available' ? (
                    isPlaying ? (
                      <button
                        onClick={handlePause}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all shadow-md active:scale-95 cursor-pointer ring-2 ring-amber-300"
                        title="Pause (Freezes audio stream at current position)"
                      >
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Pause (روکیں)</span>
                      </button>
                    ) : (
                      <button
                        onClick={handlePlay}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all shadow-md active:scale-95 cursor-pointer ring-2 ring-emerald-300"
                        title="Play (Starts or resumes from exact position)"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                        <span>Play (سنیں)</span>
                      </button>
                    )
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-200 text-slate-500 font-black text-sm transition-all cursor-not-allowed border border-slate-300"
                      title="Audio recording is in preparation"
                    >
                      <Clock className="w-4 h-4" />
                      <span>In Studio (تیار ہو رہا ہے)</span>
                    </button>
                  )}

                  {/* STOP BUTTON */}
                  <button
                    onClick={handleStop}
                    disabled={selectedTopic.audioStatus !== 'available'}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs transition-all active:scale-95 cursor-pointer shadow-xs border-2 ${
                      selectedTopic.audioStatus === 'available'
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
                        : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
                    }`}
                    title="Stop (Resets track to 0:00)"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop (ختم)</span>
                  </button>

                  {/* NEXT TRACK BUTTON (Strictly disabled on last item of category) */}
                  <button
                    onClick={handleNextTrack}
                    disabled={isLastTrack}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs transition-all border-2 shadow-xs active:scale-95 cursor-pointer ${
                      isLastTrack
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
                        : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-200'
                    }`}
                    title={isLastTrack ? 'Last item in this category' : 'Next Track (اگلا)'}
                  >
                    <span>Next (اگلا)</span>
                    <SkipForward className="w-4 h-4 text-amber-800" />
                  </button>
                </div>

                {/* Volume & Mute Controller */}
                <div className="flex items-center gap-3 self-end sm:self-auto bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-xs"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="w-20 sm:w-24 accent-emerald-600 cursor-pointer"
                    title="Volume"
                  />
                </div>
              </div>

              {/* Progress Bar & Timestamps */}
              <div className="space-y-1.5 pt-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  disabled={selectedTopic.audioStatus !== 'available'}
                  className="w-full accent-amber-500 cursor-pointer h-2.5 bg-slate-100 rounded-lg disabled:opacity-50"
                />
                <div className="flex items-center justify-between text-xs font-mono text-slate-600 font-bold">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md">{formatTime(currentTime)}</span>
                  <span className="text-[11px] font-sans font-black">
                    {selectedTopic.audioStatus !== 'available' ? (
                      <span className="text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        Text-Only Mode (آڈیو تیاری کے مرحلے میں ہے)
                      </span>
                    ) : isPlaying ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        ● Playing (چل رہا ہے)
                      </span>
                    ) : currentTime > 0 ? (
                      <span className="text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        ❚❚ Paused (روکا ہوا)
                      </span>
                    ) : (
                      <span className="text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        ◼ Ready to Play
                      </span>
                    )}
                  </span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md">{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* FORMATTED TEXT / LYRICS IN ARABIC/URDU & ROMAN URDU */}
            <div className="bg-amber-50/95 text-slate-900 rounded-2xl p-5 border-2 border-amber-300 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200 text-xs">
                <span className="font-black flex items-center gap-1.5 text-emerald-800">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>Formatted Verses (Arabic, Roman Urdu & English Meaning)</span>
                </span>
                <span className="text-slate-600 font-bold text-[11px] bg-white px-2 py-0.5 rounded-full border border-amber-200">
                  Single Track Player (Auto-next Off)
                </span>
              </div>

              <div className="space-y-3.5">
                {selectedTopic.lyrics.map((verse, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-amber-200/80 text-center space-y-2 hover:border-emerald-400 transition-colors shadow-xs"
                  >
                    {/* Original Script with Tashkeel */}
                    <p className="text-2xl sm:text-3xl font-black font-urdu text-emerald-950 leading-relaxed">
                      {verse.original}
                    </p>

                    {/* Roman Urdu Pronunciation */}
                    <p className="text-sm sm:text-base font-bold text-sky-900 italic">
                      “{verse.roman}”
                    </p>

                    {/* English Meaning */}
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      <span className="font-bold text-slate-900">Meaning: </span>
                      {verse.english}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AUTHENTICITY & LICENSING DISCLOSURE DRAWER */}
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20 space-y-2 text-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <button
                  onClick={() => setShowLicensingDetails(!showLicensingDetails)}
                  className="inline-flex items-center gap-1.5 text-amber-200 hover:text-white font-bold cursor-pointer transition-colors"
                >
                  <Info className="w-4 h-4" />
                  <span>
                    {showLicensingDetails ? 'Hide Verification & Rights Metadata' : 'View Verification & Rights Metadata'}
                  </span>
                </button>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedTopic.licensingStatus === 'needs-review' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/70 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Audio Rights: Review Pending</span>
                    </span>
                  ) : selectedTopic.licensingStatus === 'permission-granted' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-400/40">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Audio Rights: In-App Studio License</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-300 bg-sky-950/70 px-2.5 py-0.5 rounded-full border border-sky-400/40">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                      <span>Audio Rights: Open Archive Project</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-200 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Matn: {selectedTopic.verificationStatus.toUpperCase()}</span>
                  </span>
                </div>
              </div>

              {showLicensingDetails && (
                <div className="mt-2 pt-2 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-2 text-emerald-50 text-[11px]">
                  <div>
                    <span className="font-bold text-amber-200">Canonical Reference: </span>
                    {selectedTopic.sourceReference}
                  </div>
                  <div>
                    <span className="font-bold text-amber-200">Classification: </span>
                    {selectedTopic.contentType}
                  </div>
                  <div>
                    <span className="font-bold text-amber-200">Grading / Origin: </span>
                    {selectedTopic.authenticityGrade || selectedTopic.creatorArtist || 'Verified Islamic Content'}
                  </div>
                  <div>
                    <span className="font-bold text-amber-200">License Type: </span>
                    {selectedTopic.licenseType}
                  </div>
                  <div>
                    <span className="font-bold text-amber-200">Rights Holder: </span>
                    {selectedTopic.rightsHolder}
                  </div>
                  <div>
                    <span className="font-bold text-amber-200">Audio Status: </span>
                    {selectedTopic.audioStatus === 'available' ? '🟢 Available & Verified' : '🟡 In Studio Production (Text Active)'}
                  </div>
                  <div className="sm:col-span-2 text-[10px] text-white/80">
                    <span className="font-bold text-amber-200">Audio Asset Path: </span>
                    <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-100">
                      {selectedTopic.audioSrc}
                    </code>
                  </div>
                  <div className="sm:col-span-2 text-[10px] bg-black/20 p-2 rounded-xl text-amber-100/90 border border-white/10">
                    <span className="font-bold text-amber-200">Legal Compliance Note: </span>
                    Islamic texts, Quranic verses, and authentic Hadith are preserved in their divine & classical form. Third-party vocal recordings are hosted for educational reference under active permission review; no commercial rights or false public domain ownership over voice recordings are claimed.
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Track Navigation Bar (Strictly synchronized with Category Isolation) */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={handlePreviousTrack}
                disabled={isFirstTrack}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs border transition-all cursor-pointer active:scale-95 ${
                  isFirstTrack
                    ? 'bg-white/10 text-white/40 border-white/10 cursor-not-allowed opacity-50'
                    : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Topic ({isFirstTrack ? 'Category Start' : 'پچھلا ٹریک'})</span>
              </button>

              <button
                onClick={handleNextTrack}
                disabled={isLastTrack}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs border transition-all cursor-pointer active:scale-95 ${
                  isLastTrack
                    ? 'bg-white/10 text-white/40 border-white/10 cursor-not-allowed opacity-50'
                    : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                }`}
              >
                <span>Next Topic ({isLastTrack ? 'Category End' : 'اگلا ٹریک'})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
            BROWSE VIEW: CATEGORIES & TOPICS GRID
            ========================================================================= */
        <div className="space-y-6">
          {/* Category Filter Tabs & Search Bar */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  {navMode === 'TYPE_A'
                    ? 'Select a Dua Category or Search Topics'
                    : navMode === 'TYPE_B'
                    ? 'Select a Nasheed Category or Search Songs'
                    : 'Select Any of the 13 Categories'}
                </h3>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topic, dua, reference..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>

            {/* Category Filter Pills (Dynamically isolated by active mode) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {/* 'All Topics' pill for current mode */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  kidsAudio.playPopSound();
                }}
                className={`px-3.5 py-2.5 rounded-2xl font-black text-xs shrink-0 flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md scale-102 ring-2 ring-emerald-300'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>🌟</span>
                <span>All Topics</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {baseDataset.length}
                </span>
              </button>

              {activeNavCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = baseDataset.filter((item) => item.categoryId === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      kidsAudio.playPopSound();
                    }}
                    className={`px-3.5 py-2.5 rounded-2xl font-black text-xs shrink-0 flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md scale-102 ring-2 ring-emerald-300'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span>
                      Cat {cat.categoryNumber}: {cat.label.replace(/^Category \d+:\s*/, '')}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TOPICS CARD GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map((topic) => {
              const isItemEarned = !!earnedStars[topic.id];

              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className="bg-white hover:bg-amber-50/40 rounded-3xl p-5 border-2 border-slate-200/90 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group active:scale-98 relative overflow-hidden"
                >
                  {/* Category Accent top border */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 ${
                      topic.audioTypeId === 'TYPE_A_DUA_AZKAR'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                        : 'bg-gradient-to-r from-amber-400 to-orange-500'
                    }`}
                  />

                  <div className="space-y-3 pt-1">
                    {/* Top Row: Type Pill, Category Number & Star Reward */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            topic.audioTypeId === 'TYPE_A_DUA_AZKAR'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                          }`}
                        >
                          Cat {topic.categoryNumber}
                        </span>
                        <span className="text-[10px] font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                          {topic.contentType}
                        </span>
                      </div>

                      {isItemEarned ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black border border-amber-300 flex items-center gap-1 shadow-xs">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>Learned</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <span>+1 ⭐</span>
                        </span>
                      )}
                    </div>

                    {/* Title in English & Urdu */}
                    <div>
                      <h4 className="text-base font-black text-slate-900 group-hover:text-emerald-900 transition-colors leading-snug">
                        {topic.title}
                      </h4>
                      <p className="text-base font-bold text-amber-800 font-urdu mt-0.5">
                        {topic.titleUrdu}
                      </p>
                    </div>

                    {/* Roman Urdu Pronunciation snippet */}
                    <p className="text-xs font-semibold text-slate-600 italic line-clamp-2">
                      “{topic.romanDescription}”
                    </p>

                    {/* Reference pill */}
                    <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">
                        {topic.sourceReference}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer: Play Action & Audio Availability Indicator */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    {topic.audioStatus === 'available' ? (
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified Audio</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>Text & Lyrics Mode</span>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTopic(topic);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-black text-xs transition-all shadow-xs active:scale-95 cursor-pointer ${
                        topic.audioStatus === 'available'
                          ? 'bg-slate-900 hover:bg-emerald-600 text-white'
                          : 'bg-amber-600 hover:bg-amber-700 text-white'
                      }`}
                    >
                      {topic.audioStatus === 'available' ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Listen</span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Read</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty search result message */}
          {filteredTopics.length === 0 && (
            <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200 space-y-2">
              <div className="text-3xl">🔍</div>
              <h4 className="text-sm font-black text-slate-800">No matching topic found</h4>
              <p className="text-xs text-slate-500">
                Try searching with a different keyword like "Dua", "Bismillah", "Madinah", or "Iqbal".
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
