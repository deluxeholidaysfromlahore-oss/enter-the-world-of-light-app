import React from 'react';
import { CheckCircle2, Circle, Star, Flame, Trophy, Sparkles } from 'lucide-react';
import { KidsDailyQuestItem } from '../../types/kids';
import { kidsAudio } from '../../services/kidsAudio';
import { kidsStorage } from '../../services/kidsStorage';
import { useKidsTheme } from '../../services/kidsTheme';

interface KidsDailyQuestProps {
  quests: KidsDailyQuestItem[];
  streakDays: number;
  onSelectQuestSection: (section: any) => void;
  onClaimAll: () => void;
}

export const KidsDailyQuest: React.FC<KidsDailyQuestProps> = ({
  quests,
  streakDays,
  onSelectQuestSection,
  onClaimAll,
}) => {
  const { currentTheme } = useKidsTheme();
  const completedCount = quests.filter((q) => q.completed).length;
  const progressPercent = Math.round((completedCount / quests.length) * 100);
  const allCompleted = completedCount === quests.length;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${currentTheme.gradient} rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-4 border-2 border-white/30 transition-all duration-700`}
    >
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-8 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
            ☀️
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5">
              <span>Daily Wonder Quest</span>
              <Sparkles className="w-4 h-4 text-white/80" />
            </h3>
            <p className="text-xs text-white/90 font-bold">
              Complete today's learning missions to grow your wonder streak!
            </p>
          </div>
        </div>

        {/* Small Premium Streak Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-xs font-black shadow-sm">
          <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
          <span>{streakDays} Day Streak!</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 space-y-1.5">
        <div className="flex justify-between text-xs font-black text-white/90">
          <span>
            {completedCount} of {quests.length} missions done
          </span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div className="w-full h-3 bg-black/20 backdrop-blur-sm rounded-full overflow-hidden p-0.5 border border-white/25">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-white/90 to-amber-200 rounded-full transition-all duration-500 shadow-sm"
          />
        </div>
      </div>

      {/* 5 Quest Mission Cards - Crisp White with subtle hover */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
        {quests.map((q) => (
          <div
            key={q.id}
            onClick={() => {
              kidsAudio.playPopSound();
              onSelectQuestSection(q.section);
            }}
            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between sm:flex-col sm:items-start sm:justify-between gap-2 shadow-sm ${
              q.completed
                ? 'bg-white text-slate-800 border-emerald-300 ring-2 ring-emerald-200/60'
                : 'bg-white/95 hover:bg-white text-slate-800 border-white/80 hover:border-white hover:shadow-md'
            }`}
          >
            <div className="flex items-center sm:items-start gap-2.5 sm:gap-2">
              <span className="text-2xl sm:text-2xl">{q.icon}</span>
              <div>
                <h4 className="text-xs sm:text-xs font-black text-slate-900 line-clamp-1">
                  {q.title}
                </h4>
                <p className="text-[10px] font-urdu font-bold text-slate-600">
                  {q.titleUrdu}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full pt-1 border-t border-slate-100 sm:pt-1">
              <span className="text-[10px] font-black text-amber-600">
                +{q.stars} ⭐
              </span>
              {q.completed ? (
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  <span>Done</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <Circle className="w-3.5 h-3.5 text-slate-300" />
                  <span>Start</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* All Complete Celebration Banner */}
      {allCompleted && (
        <div className="relative z-10 pt-1 flex flex-wrap items-center justify-between bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/30 gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-black">
              All 5 Quests Completed Today! Fantastic Learning!
            </span>
          </div>
          {kidsStorage.isQuestClaimedToday() ? (
            <div className="px-3.5 py-1.5 bg-emerald-100/90 text-emerald-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Claimed Today ✓ (انعام موصول ہو گیا)</span>
            </div>
          ) : (
            <button
              onClick={onClaimAll}
              className="px-4 py-2 bg-white hover:bg-slate-50 active:scale-95 text-slate-900 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <span>Collect Daily Reward (+2 Stars)</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
