import React, { useState } from 'react';
import {
  Flame,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  HelpCircle,
  Feather,
  Quote,
  Target,
  Trophy,
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { DAILY_ACTIVITIES } from '../../data/mockData';
import { DailyActivity } from '../../types';

export const DailyScreen: React.FC = () => {
  const [activities, setActivities] = useState<DailyActivity[]>(DAILY_ACTIVITIES);

  const toggleComplete = (id: string) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const completedCount = activities.filter((a) => a.completed).length;
  const totalXP = activities
    .filter((a) => a.completed)
    .reduce((acc, curr) => acc + curr.xp, 0);

  const getTypeIcon = (type: DailyActivity['type']) => {
    switch (type) {
      case 'learning':
        return <BookOpen className="w-5 h-5 text-sky-600" />;
      case 'quiz':
        return <HelpCircle className="w-5 h-5 text-purple-600" />;
      case 'poetry':
        return <Feather className="w-5 h-5 text-amber-600" />;
      case 'quote':
        return <Quote className="w-5 h-5 text-emerald-600" />;
      case 'story':
        return <Sparkles className="w-5 h-5 text-rose-600" />;
      case 'challenge':
        return <Target className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Daily Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
              <Flame className="w-4 h-4 fill-amber-200 text-amber-200" />
              <span>7-Day Active Streak</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Daily Enlightenment Feed
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 max-w-lg leading-relaxed">
              Every sunrise brings a new poem, a spark of knowledge, a quick quiz, and an uplifting challenge.
            </p>
          </div>

          {/* Daily Progress summary ring */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 flex items-center gap-4 shrink-0">
            <div>
              <p className="text-xs font-bold text-amber-100 uppercase tracking-wide">
                Daily Completion
              </p>
              <p className="text-2xl font-black font-mono">
                {completedCount} / {activities.length} Done
              </p>
              <p className="text-xs sm:text-sm font-bold text-amber-200 mt-0.5">+{totalXP} XP Earned Today</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center font-black text-base">
              {Math.round((completedCount / activities.length) * 100)}%
            </div>
          </div>
        </div>
      </div>

      <SectionHeader
        kicker="Today's Disciplines"
        title="Sparks of the Day"
        titleUrdu="آج کا وظیفۂ علم"
        description="Tap any card checkmark to mark as completed for today."
      />

      {/* Grid of the 6 items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((act) => (
          <div
            key={act.id}
            className={`p-7 rounded-3xl bg-white border transition-all text-left flex flex-col justify-between ${
              act.completed
                ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                : 'border-slate-200/90 hover:border-sky-400 hover:shadow-lg'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-100">{getTypeIcon(act.type)}</div>
                  <div>
                    <span className="text-sm font-extrabold text-slate-900">{act.title}</span>
                    {act.titleUrdu && (
                      <span className="font-urdu text-sm text-slate-600 ml-2 font-bold">
                        {act.titleUrdu}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toggleComplete(act.id)}
                  title={act.completed ? 'Mark incomplete' : 'Mark complete'}
                  className="p-1 rounded-xl text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  {act.completed ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-7 h-7 text-slate-300 hover:text-slate-500" />
                  )}
                </button>
              </div>

              {/* Subtitle */}
              <p className="text-base font-bold text-slate-900 mb-2.5">{act.subtitle}</p>

              {/* Urdu Couplet or Content */}
              {act.contentUrdu && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 font-urdu text-xl text-stone-900 text-right leading-loose mb-3.5 dir-rtl font-bold">
                  {act.contentUrdu}
                </div>
              )}

              {/* Content Body */}
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {act.content}
              </p>

              {act.authorOrSource && (
                <p className="text-xs sm:text-sm font-bold text-sky-700 mt-2.5">
                  — {act.authorOrSource}
                </p>
              )}
            </div>

            {/* Bottom Reward Bar */}
            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-bold text-amber-600">+{act.xp} XP</span>
              <span
                className={`font-bold ${
                  act.completed ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {act.completed ? 'Completed ✓' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
