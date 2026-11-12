import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Compass, Gamepad2, Heart, Feather } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface SplashScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onGetStarted,
  onSignIn,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-amber-50/50 flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden">
      {/* Decorative celestial background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top minimal status */}
      <div className="relative z-10 flex justify-between items-center max-w-5xl mx-auto w-full">
        <span className="text-xs font-semibold tracking-wider uppercase text-sky-700 bg-sky-100/80 px-3 py-1 rounded-full">
          Welcome Edition
        </span>
        <button
          onClick={onSignIn}
          className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors"
        >
          Sign In
        </button>
      </div>

      {/* Center Hero Identity */}
      <div className="relative z-10 max-w-2xl mx-auto text-center my-auto py-8">
        <div className="mb-6 flex justify-center">
          <BrandLogo size="splash" showText={false} />
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Enter the World of{' '}
          <span className="text-sky-600">Light</span> &{' '}
          <span className="text-amber-500">Laughter</span>
        </h1>

        {/* Dual Taglines */}
        <div className="mt-5 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xs border border-sky-100">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span className="text-sm sm:text-base font-bold text-sky-800 tracking-wide">
              Learn • Play • Practice
            </span>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-600 tracking-wider">
              Read • Listen • Explore
            </p>
          </div>
        </div>

        <p className="mt-6 text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
          An uplifting independent sanctuary for curious minds—blending kids learning,
          classical Urdu & English poetry, moral stories, interactive quizzes, and daily inspiration.
        </p>

        {/* 4 Feature Pillars preview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 mt-9 max-w-xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs">
            <BookOpen className="w-5 h-5 text-sky-600 mb-1.5" />
            <p className="text-sm font-extrabold text-slate-900">Learn</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Urdu & English</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs">
            <Gamepad2 className="w-5 h-5 text-amber-500 mb-1.5" />
            <p className="text-sm font-extrabold text-slate-900">Play</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Mind Quizzes</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs">
            <Feather className="w-5 h-5 text-rose-500 mb-1.5" />
            <p className="text-sm font-extrabold text-slate-900">Poetry</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Shayari & Verse</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs">
            <Compass className="w-5 h-5 text-emerald-600 mb-1.5" />
            <p className="text-sm font-extrabold text-slate-900">Explore</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Stories & Science</p>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-extrabold text-base rounded-2xl transition-all shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onSignIn}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-base rounded-2xl transition-all shadow-xs cursor-pointer"
          >
            Sign In to Account
          </button>
        </div>
      </div>

      {/* Footer minimal info */}
      <div className="relative z-10 text-center text-xs text-slate-400">
        <p>© Enter the World of Light & Laughter • Modern Cultural & Learning Platform</p>
      </div>
    </div>
  );
};
