import React, { useState } from 'react';
import { Heart, Sparkles, CheckCircle2, Star, Volume2 } from 'lucide-react';
import { KIDS_GROW_DATA } from '../../data/kidsData';
import { KidsGrowItem } from '../../types/kids';
import { KidsAudioButton } from './KidsAudioButton';
import { kidsAudio } from '../../services/kidsAudio';
import { kidsStorage } from '../../services/kidsStorage';

interface KidsGrowSectionProps {
  onEarnStar: () => void;
}

export const KidsGrowSection: React.FC<KidsGrowSectionProps> = ({ onEarnStar }) => {
  const [completedActions, setCompletedActions] = useState<string[]>(() => {
    return KIDS_GROW_DATA.filter((item) => kidsStorage.isHabitDone(item.id)).map((i) => i.id);
  });

  const handleCompleteAction = (id: string) => {
    if (completedActions.includes(id) || kidsStorage.isHabitDone(id)) return;
    const isNew = kidsStorage.markHabitDone(id);
    if (isNew) {
      kidsAudio.playRewardChime();
      setCompletedActions((prev) => [...prev, id]);
      onEarnStar();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl font-black text-rose-950 flex items-center justify-center gap-2">
          <span>❤️ Grow & Bloom (پیاری عادات اور ہمدردی)</span>
        </h2>
        <p className="text-xs sm:text-sm font-bold text-rose-800">
          Discover big feelings, golden daily habits, personal safety, and the joy of sharing!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {KIDS_GROW_DATA.map((item) => {
          const isDone = completedActions.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border-2 border-rose-200 hover:border-rose-300 shadow-md space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-3xl shadow-inner">
                      {item.emoji}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {item.title}
                      </h3>
                      <h4 className="text-sm font-bold text-rose-800 font-urdu text-right">
                        {item.titleUrdu}
                      </h4>
                    </div>
                  </div>

                  <KidsAudioButton
                    textToSpeak={`${item.title}. ${item.description}`}
                    lang="en"
                    size="sm"
                  />
                </div>

                <div className="space-y-1 text-xs sm:text-sm text-slate-700">
                  <p>{item.description}</p>
                  <p className="font-urdu text-right text-rose-950 font-bold">
                    {item.descriptionUrdu}
                  </p>
                </div>

                {/* Helpful tips checklist */}
                <div className="p-3 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-rose-800 tracking-wider">
                    Good Growth Tips:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {item.tips.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span>•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action mission */}
              <div className="pt-2 border-t border-rose-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-rose-900">
                  {item.actionPrompt}
                </span>

                <button
                  onClick={() => handleCompleteAction(item.id)}
                  disabled={isDone}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-500 hover:bg-rose-600 text-white shadow-md active:scale-95'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Completed ⭐</span>
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4 fill-white" />
                      <span>I Did This! (+1 Star)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
