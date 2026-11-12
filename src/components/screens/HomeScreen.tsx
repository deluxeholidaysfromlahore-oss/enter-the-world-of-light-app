import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Gamepad2,
  PenTool,
  Feather,
  ArrowRight,
  TrendingUp,
  BookmarkCheck,
  Video,
  Calendar,
  Baby,
  Play,
  Flame,
  Star,
  ShieldCheck,
  Volume2,
  Maximize2,
  Smile,
} from 'lucide-react';
import { ContentItem, ScreenType } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { ContentCard } from '../common/ContentCard';
import { SocialLinks } from '../common/SocialLinks';
import {
  LEARN_ITEMS,
  POETRY_ITEMS,
  STORIES_ITEMS,
  VIDEOS_ITEMS,
  SHORTS_ITEMS,
  FEATURED_COLLECTIONS,
} from '../../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectContent: (item: ContentItem) => void;
  onSelectPoetry: (item: ContentItem) => void;
  onSelectVideo: (item: ContentItem) => void;
  onToggleKidsMode: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectContent,
  onSelectPoetry,
  onSelectVideo,
  onToggleKidsMode,
}) => {
  const quickAccess = [
    { label: 'Kids Learning', screen: 'kids' as ScreenType, icon: Baby, color: 'text-amber-700 bg-amber-100/90' },
    { label: 'English & Urdu', screen: 'learn' as ScreenType, icon: BookOpen, color: 'text-sky-700 bg-sky-100/90' },
    { label: 'Mind Games', screen: 'play' as ScreenType, icon: Gamepad2, color: 'text-emerald-700 bg-emerald-100/90' },
    { label: 'Practice Lab', screen: 'practice' as ScreenType, icon: PenTool, color: 'text-indigo-700 bg-indigo-100/90' },
    { label: 'Urdu Shayari', screen: 'poetry' as ScreenType, icon: Feather, color: 'text-rose-700 bg-rose-100/90' },
    { label: 'Stories & Fables', screen: 'stories' as ScreenType, icon: BookmarkCheck, color: 'text-orange-700 bg-orange-100/90' },
    { label: 'Video Lessons', screen: 'videos' as ScreenType, icon: Video, color: 'text-red-700 bg-red-100/90' },
    { label: 'Daily Sparks', screen: 'daily' as ScreenType, icon: Calendar, color: 'text-teal-700 bg-teal-100/90' },
  ];

  const [kidsPreviewTab, setKidsPreviewTab] = useState<'qaida' | 'phonics' | 'games' | 'stories'>('qaida');
  const [kidsShorts, setKidsShorts] = useState<any[]>([]);
  const [rotationInfo, setRotationInfo] = useState<{ cycleTitle?: string; hoursRemaining?: number } | null>(null);
  const [activeShortModal, setActiveShortModal] = useState<any | null>(null);
  const [showCreatorSeoHome, setShowCreatorSeoHome] = useState<boolean>(false);
  const [homeCopiedField, setHomeCopiedField] = useState<'title' | 'desc' | 'tags' | 'all' | null>(null);

  React.useEffect(() => {
    // 1. Fetch 24-Hour Active Rotation Batch to sync Home Screen frame with Kids Mode
    fetch('/api/kids-video/daily-rotation')
      .then((res) => res.json())
      .then((data) => {
        if (data.rotation) {
          setRotationInfo({
            cycleTitle: data.rotation.cycleTitle,
            hoursRemaining: data.rotation.hoursRemaining,
          });
          if (data.rotation.activeItems && data.rotation.activeItems.length > 0) {
            setKidsShorts(data.rotation.activeItems);
            return;
          }
        }
        // Fallback to general pipeline if rotation items pending
        return fetch('/api/kids-video/pipeline')
          .then((r) => r.json())
          .then((pData) => {
            if (pData.items && pData.items.length > 0) {
              setKidsShorts(pData.items);
            }
          });
      })
      .catch((err) => console.error('Failed to load shorts on home screen:', err));
  }, []);

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* 1. Hero / Featured Content */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-sky-800 via-sky-700 to-indigo-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-sky-600/30">
        {/* Soft atmospheric ambient halos */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-80 h-80 rounded-full bg-sky-400/25 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase bg-white/20 px-4 py-1.5 rounded-full text-amber-200 backdrop-blur-md border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Multi-Purpose Cultural & Learning Platform</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
                Enter the World of Light & Laughter
              </h1>
              <p className="text-lg sm:text-2xl font-extrabold text-amber-300 tracking-wide">
                Learn • Play • Practice • Read • Listen • Explore
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-100 max-w-2xl leading-relaxed font-normal">
              Welcome to your vibrant digital wonderland! Step into our dedicated <strong className="font-extrabold text-amber-300 underline decoration-amber-400/50 underline-offset-4">Kids Learning Portal</strong> — a 100% child-safe, joyful universe of bilingual Urdu & English phonetics, moral tales, and fun brain games, alongside timeless classical poetry, literature, and daily wisdom.
            </p>

            {/* Kids Portal Special Feature Highlights */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-amber-100 bg-amber-400/15 border border-amber-300/30 px-4 py-2.5 rounded-2xl backdrop-blur-sm max-w-2xl">
              <span className="inline-flex items-center gap-1.5 font-bold text-amber-300">
                <Baby className="w-4 h-4" /> Kids Portal Highlights:
              </span>
              <span className="text-white">Bilingual Urdu & English</span>
              <span className="text-amber-300/70" aria-hidden="true">•</span>
              <span className="text-white">Moral Stories</span>
              <span className="text-amber-300/70" aria-hidden="true">•</span>
              <span className="text-white">Brain Games</span>
              <span className="text-amber-300/70" aria-hidden="true">•</span>
              <span className="text-emerald-300 font-bold">100% Safe & Ad-Free</span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onToggleKidsMode}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 active:scale-[0.98] text-slate-950 font-black text-sm sm:text-base rounded-2xl transition-all shadow-xl shadow-amber-500/25 flex items-center gap-3 border-2 border-amber-200/90 ring-4 ring-amber-400/25 cursor-pointer"
              >
                <div className="w-7 h-7 rounded-xl bg-slate-950 text-amber-300 flex items-center justify-center shrink-0">
                  <Baby className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="leading-tight font-black">Open Kids Portal</div>
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Safe & Interactive</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigate('learn')}
                className="px-5 py-3.5 bg-white/20 hover:bg-white/30 text-white font-extrabold text-sm sm:text-base rounded-2xl transition-all backdrop-blur-md border border-white/30 flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-sky-200" />
                <span>Start Learning</span>
              </button>

              <button
                onClick={() => onNavigate('daily')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-2xl transition-all backdrop-blur-md border border-white/20 cursor-pointer"
              >
                Today's Highlights
              </button>
            </div>
          </div>

          {/* Right Column: Kids Mode Screen Frame */}
          <div className="lg:col-span-5 xl:col-span-5 w-full flex justify-center">
            <div className="w-full max-w-[420px] relative group">
              {/* Soft colorful backdrop glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-pink-400 to-sky-400 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-500" />

              {/* Physical Tablet Bezel Frame */}
              <div className="relative rounded-[2.2rem] bg-slate-950 p-3 sm:p-4 border-2 border-slate-700/80 shadow-2xl shadow-indigo-950/80">
                {/* Tablet Top Notch / Camera Bar */}
                <div className="flex items-center justify-between px-2.5 pb-2.5 text-xs text-slate-400 select-none">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] tracking-wide">KIDS TABLET</span>
                  </div>
                  {/* Front camera lens */}
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-sky-400/60" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Safe Zone</span>
                  </div>
                </div>

                {/* Simulated Kids Mode Screen Inside Tablet */}
                <div className="rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-sky-400 via-sky-500 to-indigo-600 p-3.5 sm:p-4 text-white shadow-inner flex flex-col justify-between min-h-[380px] sm:min-h-[410px]">
                  {/* Kids Screen Top Header */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/20">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-lg shadow-md ring-2 ring-white/40">
                        ☀️
                      </div>
                      <div>
                        <div className="text-xs font-black leading-tight text-white flex items-center gap-1">
                          <span>Sunny Kids Mode</span>
                          <Sparkles className="w-3 h-3 text-amber-300" />
                        </div>
                        <div className="text-[10px] text-sky-100 font-semibold">Fun Learning World</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 bg-amber-400 text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-full shadow-xs">
                        <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                        <span>12 Stars</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Kids Category Tabs */}
                  <div className="grid grid-cols-4 gap-1.5 my-2.5 bg-black/20 p-1 rounded-xl backdrop-blur-xs">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setKidsPreviewTab('qaida');
                      }}
                      className={`text-[10px] font-extrabold py-1.5 rounded-lg transition-all ${
                        kidsPreviewTab === 'qaida'
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      🔤 قاعدہ
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setKidsPreviewTab('phonics');
                      }}
                      className={`text-[10px] font-extrabold py-1.5 rounded-lg transition-all ${
                        kidsPreviewTab === 'phonics'
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      🅰️ Phonics
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setKidsPreviewTab('games');
                      }}
                      className={`text-[10px] font-extrabold py-1.5 rounded-lg transition-all ${
                        kidsPreviewTab === 'games'
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      🎮 Games
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setKidsPreviewTab('stories');
                      }}
                      className={`text-[10px] font-extrabold py-1.5 rounded-lg transition-all ${
                        kidsPreviewTab === 'stories'
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      📖 Stories
                    </button>
                  </div>

                  {/* Dynamic Interactive Preview Card */}
                  <div
                    onClick={onToggleKidsMode}
                    className="flex-1 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 p-3 flex flex-col justify-between cursor-pointer hover:bg-white/20 transition-all group/card shadow-sm"
                  >
                    {kidsPreviewTab === 'qaida' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-black text-amber-200">Urdu Qaida & Phonetics</span>
                          <span className="text-[10px] bg-amber-400/30 text-amber-100 px-2 py-0.5 rounded-full font-bold">بنیادی حروف</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 pt-1">
                          <div className="bg-white text-slate-900 rounded-xl p-2 text-center shadow-md transform hover:scale-105 transition-transform">
                            <div className="text-xl font-black text-rose-600 font-serif">ا</div>
                            <div className="text-[9px] font-bold text-slate-500">الف (انار)</div>
                          </div>
                          <div className="bg-white text-slate-900 rounded-xl p-2 text-center shadow-md transform hover:scale-105 transition-transform">
                            <div className="text-xl font-black text-sky-600 font-serif">ب</div>
                            <div className="text-[9px] font-bold text-slate-500">بے (بلی)</div>
                          </div>
                          <div className="bg-white text-slate-900 rounded-xl p-2 text-center shadow-md transform hover:scale-105 transition-transform">
                            <div className="text-xl font-black text-amber-600 font-serif">پ</div>
                            <div className="text-[9px] font-bold text-slate-500">پے (پتنگ)</div>
                          </div>
                          <div className="bg-white text-slate-900 rounded-xl p-2 text-center shadow-md transform hover:scale-105 transition-transform">
                            <div className="text-xl font-black text-emerald-600 font-serif">ت</div>
                            <div className="text-[9px] font-bold text-slate-500">تے (تتلی)</div>
                          </div>
                        </div>
                        <p className="text-[11px] text-sky-100 font-medium text-center pt-1">
                          Touch letters to hear native pronunciation & trace letters!
                        </p>
                      </div>
                    )}

                    {kidsPreviewTab === 'phonics' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-black text-amber-200">English ABC Phonics</span>
                          <span className="text-[10px] bg-sky-400/30 text-sky-100 px-2 py-0.5 rounded-full font-bold">Interactive Sound</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 pt-1">
                          <div className="bg-white text-slate-900 rounded-xl p-2 text-center shadow-md">
                            <div className="text-base font-black text-rose-500">Aa</div>
                            <div className="text-[13px]">🍎</div>
                            <div className="text-[8px] font-bold text-slate-500">Apple</div>
                          </div>
                          <div className="bg-white text-slate-900 rounded-xl p-2 text-center shadow-md">
                            <div className="text-base font-black text-sky-500">Bb</div>
                            <div className="text-[13px]">🎈</div>
                            <div className="text-[8px] font-bold text-slate-500">Ball</div>
                          </div>
                          <div className="bg-white text-slate-900 rounded-xl p-2 text-center shadow-md">
                            <div className="text-base font-black text-amber-500">Cc</div>
                            <div className="text-[13px]">🐱</div>
                            <div className="text-[8px] font-bold text-slate-500">Cat</div>
                          </div>
                          <div className="bg-white text-slate-900 rounded-xl p-2 text-center shadow-md">
                            <div className="text-base font-black text-emerald-500">Dd</div>
                            <div className="text-[13px]">🦆</div>
                            <div className="text-[8px] font-bold text-slate-500">Duck</div>
                          </div>
                        </div>
                        <p className="text-[11px] text-sky-100 font-medium text-center pt-1">
                          Animated flashcards with real voice sound phonics!
                        </p>
                      </div>
                    )}

                    {kidsPreviewTab === 'games' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-black text-amber-200">Mind Games & Puzzles</span>
                          <span className="text-[10px] bg-emerald-400/30 text-emerald-100 px-2 py-0.5 rounded-full font-bold">Earn ⭐</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div className="bg-white/20 rounded-xl p-2.5 flex items-center gap-2 border border-white/30">
                            <div className="text-2xl">🧠</div>
                            <div>
                              <div className="text-xs font-bold leading-tight">Memory Match</div>
                              <div className="text-[9px] text-amber-200">+5 Stars</div>
                            </div>
                          </div>
                          <div className="bg-white/20 rounded-xl p-2.5 flex items-center gap-2 border border-white/30">
                            <div className="text-2xl">🎨</div>
                            <div>
                              <div className="text-xs font-bold leading-tight">Color Splash</div>
                              <div className="text-[9px] text-amber-200">+5 Stars</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-sky-100 font-medium text-center pt-1">
                          Fun educational challenges designed for young minds!
                        </p>
                      </div>
                    )}

                    {kidsPreviewTab === 'stories' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-black text-amber-200">Moral Tales & Fables</span>
                          <span className="text-[10px] bg-purple-400/30 text-purple-100 px-2 py-0.5 rounded-full font-bold">سبق آموز کہانیاں</span>
                        </div>
                        <div className="bg-white/20 rounded-xl p-2.5 flex items-center gap-3 border border-white/30">
                          <div className="text-3xl">🦁🐭</div>
                          <div>
                            <div className="text-xs font-black">شیر اور چوہا (The Lion & Mouse)</div>
                            <div className="text-[10px] text-sky-100">Dosti aur ehsaan ka anmol sabaq</div>
                          </div>
                        </div>
                        <p className="text-[11px] text-sky-100 font-medium text-center pt-1">
                          Rich voice narration with bedtime story illustrations!
                        </p>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between text-[10px] text-amber-200 font-bold border-t border-white/10 mt-1">
                      <span>Click to open in Kids Mode</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Tablet Screen Bottom Action Bar */}
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={onToggleKidsMode}
                      className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 active:scale-[0.98] text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all border border-amber-200"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-slate-900" />
                      <span>Launch Full Kids Mode Screen</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Little bottom pill tag */}
              <div className="text-center pt-2 text-xs font-semibold text-sky-200/90 flex items-center justify-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-amber-300" />
                <span>Child-Friendly • Ad-Free • Parental Lock Protected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Access Categories */}
      <section>
        <SectionHeader
          kicker="Navigation Hub"
          title="Quick Access"
          description="Explore topics curated for learning, intellect, wisdom, and wholesome entertainment."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5 sm:gap-4">
          {quickAccess.map((qa) => {
            const Icon = qa.icon;
            return (
              <button
                key={qa.label}
                onClick={() => onNavigate(qa.screen)}
                className="group flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-400 hover:shadow-lg transition-all min-h-[110px] justify-center focus:outline-none"
              >
                <div
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 shadow-2xs ${qa.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-tight">
                  {qa.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Continue Learning Bar */}
      <section className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-inner">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-extrabold uppercase tracking-wider">
              <span>Continue Learning</span>
              <span aria-hidden="true">·</span>
              <span>Lesson 4 of 15</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              Urdu Alphabet & Phonetics Mastery
            </h3>
            <div className="w-56 sm:w-72 bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-emerald-400 h-full w-[28%] rounded-full" />
            </div>
          </div>
        </div>

        <button
          onClick={() => onSelectContent(LEARN_ITEMS[0])}
          className="self-start md:self-center px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-extrabold rounded-2xl transition-all shadow-md flex items-center gap-2 shrink-0"
        >
          <span>Resume Lesson</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* 4. Today's Highlights */}
      <section>
        <SectionHeader
          kicker="Daily Selection"
          title="Today's Highlights"
          titleUrdu="آج کی جھلکیاں"
          description="A refreshing thought, a timeless verse, and a quick scientific wonder for today."
          actionText="View Daily Hub"
          onAction={() => onNavigate('daily')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Highlight 1: Poetry */}
          <div
            onClick={() => onSelectPoetry(POETRY_ITEMS[0])}
            className="p-6 sm:p-7 rounded-2xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between poetry-paper text-left"
          >
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-800 font-bold mb-3 pb-2 border-b border-amber-100">
                <span>Today's Couplet</span>
                <span aria-hidden="true">·</span>
                <span>Allama Iqbal</span>
              </div>
              <p className="font-urdu text-2xl text-stone-900 text-right leading-loose mb-3 dir-rtl font-bold">
                ستاروں سے آگے جہاں اور بھی ہیں
                <br />
                ابھی عشق کے امتحاں اور بھی ہیں
              </p>
              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                "Beyond the stars there are yet other worlds; there are still further trials for love to endure."
              </p>
            </div>
            <span className="text-sm font-extrabold text-amber-800 mt-5 inline-flex items-center gap-1.5 group">
              <span>Read Full Ghazal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Highlight 2: Science */}
          <div
            onClick={() => onSelectContent(LEARN_ITEMS[1])}
            className="p-6 sm:p-7 rounded-2xl bg-white border border-sky-200 hover:border-sky-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-sky-800 font-bold mb-3 pb-2 border-b border-sky-100">
                <span>Science Wonder</span>
                <span aria-hidden="true">·</span>
                <span>Astronomy</span>
              </div>
              <h4 className="text-lg font-extrabold text-slate-900 mb-2 leading-snug">
                The Great Solar System Expedition
              </h4>
              <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                Why does sunlight take 8 minutes and 20 seconds to reach Earth? Discover the staggering scale and wonders of our cosmic neighborhood.
              </p>
            </div>
            <span className="text-sm font-extrabold text-sky-700 mt-5 inline-flex items-center gap-1.5 group">
              <span>Start Module</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Highlight 3: Moral Story */}
          <div
            onClick={() => onSelectContent(STORIES_ITEMS[0])}
            className="p-6 sm:p-7 rounded-2xl bg-white border border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-800 font-bold mb-3 pb-2 border-b border-emerald-100">
                <span>Moral Story</span>
                <span aria-hidden="true">·</span>
                <span>Bedtime Tales</span>
              </div>
              <h4 className="text-lg font-extrabold text-slate-900 mb-2 leading-snug">
                The Brave Little Firefly's Lantern
              </h4>
              <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                Greatness is not about the loudness of your flare, but the warmth and patience with which you light the path for others.
              </p>
            </div>
            <span className="text-sm font-extrabold text-emerald-700 mt-5 inline-flex items-center gap-1.5 group">
              <span>Read Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </section>

      {/* 5. Featured Collections */}
      <section>
        <SectionHeader
          kicker="Curated Series"
          title="Featured Collections"
          titleUrdu="منتخب مجموعے"
          description="Hand-picked suites of lessons, literary anthologies, and audio-visual journeys."
          actionText="Explore All"
          onAction={() => onNavigate('explore')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => onNavigate('explore')}
              className={`group p-6 rounded-2xl bg-gradient-to-br ${col.gradient} text-white shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between min-h-[220px]`}
            >
              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm text-white/90 mb-2 font-medium">
                  <span className="font-bold">{col.category}</span>
                  <span className="font-mono">{col.itemsCount} items</span>
                </div>
                {col.titleUrdu && (
                  <p className="font-urdu text-base text-amber-200 text-right leading-normal mb-1">
                    {col.titleUrdu}
                  </p>
                )}
                <h3 className="text-lg font-extrabold text-white group-hover:text-amber-200 transition-colors leading-snug">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 line-clamp-2 mt-2 leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/20 flex items-center justify-between text-xs sm:text-sm text-white font-bold">
                <span>Open Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Latest Content */}
      <section>
        <SectionHeader
          kicker="Fresh Releases"
          title="Latest Content"
          titleUrdu="تازہ ترین مواد"
          description="Recent additions across English, Urdu, Science, and Creative Expression."
          actionText="View All Learn"
          onAction={() => onNavigate('learn')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARN_ITEMS.slice(0, 3).map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onClick={onSelectContent}
            />
          ))}
        </div>
      </section>

      {/* 7. Recommended Content (Videos & Poetry) */}
      <section>
        <SectionHeader
          kicker="Recommended For You"
          title="Watch & Listen"
          titleUrdu="دیکھئے اور سنئے"
          description="High quality educational video series and melodious recitation."
          actionText="View All Videos"
          onAction={() => onNavigate('videos')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS_ITEMS.slice(0, 3).map((vid) => (
            <ContentCard
              key={vid.id}
              item={vid}
              onClick={onSelectVideo}
            />
          ))}
        </div>
      </section>

      {/* 8. What's New in Shorts - Linked Directly to Kids Mode */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
          <SectionHeader
            kicker="Bite-Sized Sparks"
            title="What's New in Shorts"
            titleUrdu="مختصر و دلچسپ ویڈیوز"
            description="1080x1920 3D Animated Phonics, Urdu Letters, and Early Literacy Shorts."
            actionText="Open Kids Mode 🎨"
            onAction={() => onNavigate('kids')}
            className="mb-0"
          />
          {rotationInfo && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold self-start sm:self-auto shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>{rotationInfo.cycleTitle || "24-Hour Active Rotation"}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(kidsShorts.length > 0 ? kidsShorts.slice(0, 4) : SHORTS_ITEMS.slice(0, 4)).map((short) => {
            const isPipeline = Boolean(short.videoUrl);
            const title = short.topic || short.title;
            const category = short.category || 'Kids';
            const duration = short.durationSeconds ? `${short.durationSeconds}s` : short.duration;
            const thumb = short.thumbnailUrl;

            return (
              <div
                key={short.contentId || short.id}
                onClick={() => {
                  if (isPipeline) {
                    setActiveShortModal(short);
                  } else {
                    onNavigate('kids');
                  }
                }}
                className="group relative aspect-[9/16] rounded-2xl bg-slate-900 text-white flex flex-col justify-between overflow-hidden shadow-lg cursor-pointer hover:scale-[1.02] transition-transform border border-amber-300/40"
              >
                {/* Background Poster Image */}
                {thumb && (
                  <img
                    src={thumb}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                )}

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/50" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between text-xs p-3">
                  <span className="font-extrabold bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-[11px] shadow-sm">
                    {category}
                  </span>
                  <span className="font-mono text-white/90 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold">
                    {duration}
                  </span>
                </div>

                {/* Center Play Icon on Hover */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-slate-950 translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 p-3 space-y-1">
                  <div className="flex items-baseline justify-between gap-1">
                    <h4 className="text-xs sm:text-sm font-extrabold text-white line-clamp-2 leading-tight">
                      {title}
                    </h4>
                    {(short.shortUrdu || short.urduTitle) && (
                      <span className="text-[11px] font-urdu font-bold text-amber-300 shrink-0" dir="rtl">
                        {short.shortUrdu || short.urduTitle}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-amber-200 pt-0.5">
                    <span className="flex items-center gap-1 font-bold">
                      <span>▶ Play Short</span>
                    </span>
                    <span className="text-white/70 text-[10px]">Kids Mode 🎨</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal: Direct In-Page Short Player for Home Screen */}
      {activeShortModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md"
        >
          <div className="relative w-full max-w-md max-h-[95vh] bg-slate-900 text-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border-2 border-amber-400">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950">
              <div>
                <span className="text-xs font-black text-amber-400">
                  🎬 {activeShortModal.topic || activeShortModal.title}
                </span>
                <p className="text-[10px] text-slate-400">1080x1920 (9:16) • Kids Mode HD</p>
              </div>
              <button
                onClick={() => {
                  setActiveShortModal(null);
                  setShowCreatorSeoHome(false);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-[9/16] w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                key={activeShortModal.contentId || activeShortModal.id}
                src={activeShortModal.videoUrl}
                preload="metadata"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 bg-slate-950 space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => {
                    setActiveShortModal(null);
                    onNavigate('kids');
                  }}
                  className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🎨 Kids Mode</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setShowCreatorSeoHome(!showCreatorSeoHome)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold rounded-xl text-[11px] cursor-pointer"
                  title="YouTube SEO Metadata"
                >
                  🔑 SEO Kit
                </button>

                <a
                  href={`/api/download/video?file=${activeShortModal.topicSlug || activeShortModal.videoUrl?.split('/').pop() || 'short'}.mp4`}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-xs text-xs"
                >
                  Download MP4
                </a>
              </div>

              {/* Private Creator SEO Kit in Home Modal */}
              {showCreatorSeoHome && (
                <div className="p-3 bg-slate-900 border border-sky-500/40 rounded-2xl space-y-2.5 text-xs text-left animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sky-400 text-[11px]">
                      YouTube Upload Package (Creator)
                    </span>
                    <button
                      onClick={() => {
                        const title = activeShortModal.youtubeSeoTitle || `${activeShortModal.topic} | 3D Short #Shorts`;
                        const desc = activeShortModal.youtubeSeoDescription || `Learn ${activeShortModal.topic}!`;
                        const tags = `Shorts, YouTube Shorts, Learn ABC, Phonics, ${activeShortModal.topic}, Kids 3D Animation`;
                        navigator.clipboard.writeText(`TITLE:\n${title}\n\nDESCRIPTION:\n${desc}\n\nTAGS:\n${tags}`);
                        setHomeCopiedField('all');
                        setTimeout(() => setHomeCopiedField(null), 2500);
                      }}
                      className="px-2 py-1 rounded bg-sky-500 text-slate-950 font-black text-[10px] cursor-pointer"
                    >
                      {homeCopiedField === 'all' ? 'Copied Full Kit! ✓' : '📋 Copy All'}
                    </button>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Title:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(activeShortModal.youtubeSeoTitle || `${activeShortModal.topic} | 3D Short #Shorts`);
                          setHomeCopiedField('title');
                          setTimeout(() => setHomeCopiedField(null), 2000);
                        }}
                        className="text-sky-300 hover:underline cursor-pointer"
                      >
                        {homeCopiedField === 'title' ? 'Copied ✓' : 'Copy'}
                      </button>
                    </div>
                    <p className="p-2 bg-black/60 rounded-lg text-slate-200 font-mono text-[10px] select-all truncate border border-slate-800">
                      {activeShortModal.youtubeSeoTitle || `${activeShortModal.topic} 🍎 | Learn ABC #Shorts`}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Description:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(activeShortModal.youtubeSeoDescription || `Learn ${activeShortModal.topic}!`);
                          setHomeCopiedField('desc');
                          setTimeout(() => setHomeCopiedField(null), 2000);
                        }}
                        className="text-sky-300 hover:underline cursor-pointer"
                      >
                        {homeCopiedField === 'desc' ? 'Copied ✓' : 'Copy'}
                      </button>
                    </div>
                    <textarea
                      readOnly
                      rows={3}
                      value={activeShortModal.youtubeSeoDescription || `Learn ${activeShortModal.topic}! #Shorts`}
                      className="w-full p-2 bg-black/60 rounded-lg text-slate-300 font-mono text-[10px] resize-none select-all border border-slate-800"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 9. Brand Ecosystem Links */}
      <section className="pt-8 border-t border-slate-200/90">
        <SectionHeader
          kicker="Connect Across The Web"
          title="Official Channels & Communities"
          description="Follow Enter the World of Light across our verified platforms for daily notifications and resources."
        />
        <SocialLinks layout="cards" showDescriptions={true} />
      </section>
    </div>
  );
};
