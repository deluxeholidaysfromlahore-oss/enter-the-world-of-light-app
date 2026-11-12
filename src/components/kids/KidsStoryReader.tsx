import React, { useState } from 'react';
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Heart,
  Bookmark,
  Star,
  CheckCircle2,
  Sparkles,
  Type,
} from 'lucide-react';
import { KidsStoryItem } from '../../types/kids';
import { KidsAudioPlayer } from './KidsAudioPlayer';
import { kidsAudio } from '../../services/kidsAudio';
import { kidsStorage } from '../../services/kidsStorage';

interface KidsStoryReaderProps {
  story: KidsStoryItem;
  onBack: () => void;
  onNextStory?: () => void;
  onPrevStory?: () => void;
  onEarnStar: () => void;
}

export const KidsStoryReader: React.FC<KidsStoryReaderProps> = ({
  story,
  onBack,
  onNextStory,
  onPrevStory,
  onEarnStar,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [claimedStars, setClaimedStars] = useState(() => kidsStorage.isStoryClaimed(story.id));
  const [fontSizeLarge, setFontSizeLarge] = useState(false);

  const [isFav, setIsFav] = useState(() => kidsStorage.isFavorite(story.id));
  const [isSaved, setIsSaved] = useState(() => kidsStorage.isSaved(story.id));
  const [narrationLang, setNarrationLang] = useState<'en' | 'ur'>('en');

  const handleToggleFav = () => {
    kidsAudio.playPopSound();
    const next = kidsStorage.toggleFavorite({
      contentId: story.id,
      title: story.title,
      titleUrdu: story.titleUrdu,
      category: story.category,
      type: 'story',
      emoji: '✨',
    });
    setIsFav(next);
  };

  const handleToggleSave = () => {
    kidsAudio.playPopSound();
    const next = kidsStorage.toggleSaved({
      contentId: story.id,
      title: story.title,
      titleUrdu: story.titleUrdu,
      category: story.category,
      type: 'story',
      emoji: '✨',
    });
    setIsSaved(next);
  };

  const handleOptionSelect = (idx: number) => {
    if (quizAnswered) return;
    setSelectedOption(idx);
    setQuizAnswered(true);

    if (idx === story.question.correctIndex) {
      setIsCorrect(true);
      kidsAudio.playRewardChime();
    } else {
      setIsCorrect(false);
      kidsAudio.playGentleRetrySound();
    }
  };

  const handleClaimReward = () => {
    if (claimedStars || kidsStorage.isStoryClaimed(story.id)) return;
    const claimed = kidsStorage.markStoryClaimed(story.id);
    if (claimed) {
      setClaimedStars(true);
      kidsAudio.playCelebrationFanfare();
      onEarnStar();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-sky-200 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-950 font-black text-xs rounded-2xl border border-sky-200 shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Stories</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Font Size Toggle */}
          <button
            onClick={() => setFontSizeLarge(!fontSizeLarge)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-colors ${
              fontSizeLarge
                ? 'bg-sky-600 text-white border-sky-700'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50'
            }`}
            title="Toggle Larger Text"
          >
            <Type className="w-3.5 h-3.5" />
            <span>{fontSizeLarge ? 'Standard Text' : 'Larger Text'}</span>
          </button>

          {/* Favorite */}
          <button
            onClick={handleToggleFav}
            className={`p-2 rounded-xl border transition-colors ${
              isFav
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-slate-50 text-slate-500 hover:text-rose-600 border-slate-200'
            }`}
            title={isFav ? 'Favorited' : 'Add to Favorites'}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Bookmark */}
          <button
            onClick={handleToggleSave}
            className={`p-2 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-sky-100 text-sky-700 border-sky-300'
                : 'bg-slate-50 text-slate-500 hover:text-sky-600 border-slate-200'
            }`}
            title={isSaved ? 'Saved' : 'Save Story'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-sky-600' : ''}`} />
          </button>

          {onPrevStory && (
            <button
              onClick={onPrevStory}
              className="p-2 bg-slate-50 hover:bg-sky-50 text-slate-700 rounded-xl border border-slate-200"
              title="Previous Story"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          {onNextStory && (
            <button
              onClick={onNextStory}
              className="p-2 bg-slate-50 hover:bg-sky-50 text-slate-700 rounded-xl border border-slate-200"
              title="Next Story"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Story Main Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-sky-200 space-y-6">
        {/* Story Hero Header with Soft Blue/Purple Gradient */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-700 text-white space-y-3 shadow-md">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl w-fit">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{story.category} • {story.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {story.title}
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold font-urdu leading-relaxed">
            {story.titleUrdu}
          </h2>

          <p className="text-xs sm:text-sm text-sky-100 opacity-95">
            {story.description}
          </p>
        </div>

        {/* Bilingual Voice Narration Controls */}
        <div className="flex items-center justify-between gap-2 p-2 bg-sky-50 rounded-2xl border border-sky-200">
          <span className="text-xs font-bold text-sky-950 pl-2">Narration Voice:</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => {
                setNarrationLang('en');
                kidsAudio.playPopSound();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                narrationLang === 'en'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              🇬🇧 English Voice
            </button>
            <button
              onClick={() => {
                setNarrationLang('ur');
                kidsAudio.playPopSound();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-urdu transition-all ${
                narrationLang === 'ur'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              🇵🇰 اردو آواز
            </button>
          </div>
        </div>

        {/* Audio Narration Bar in Soft Blue */}
        <KidsAudioPlayer
          audioUrl={story.audioUrl}
          audioTitle={`${narrationLang === 'ur' ? story.titleUrdu : story.title} (Audio Narration)`}
          voiceTextFallback={
            narrationLang === 'ur'
              ? `${story.titleUrdu}. ${story.contentUrdu}`
              : `${story.title}. ${story.contentEn}`
          }
          voiceLang={narrationLang}
        />

        {/* Story Content - English and Urdu Nastaliq */}
        <div className="space-y-6 text-slate-800 leading-relaxed">
          {/* English Paragraphs */}
          <div className={`p-5 sm:p-6 bg-sky-50/50 rounded-2xl border border-sky-100 space-y-3 ${fontSizeLarge ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
            <h3 className="text-xs font-black uppercase text-sky-800 tracking-wider">
              English Story:
            </h3>
            {story.contentEn.split('\n\n').map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Urdu Nastaliq Paragraphs */}
          <div className="p-6 sm:p-7 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-4">
            <h3 className="text-xs font-black uppercase text-emerald-800 tracking-wider">
              اردو کہانی (خوبصورت نستعلیق میں):
            </h3>
            <div className={`font-urdu text-emerald-950 text-right leading-loose ${fontSizeLarge ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
              {story.contentUrdu.split('\n\n').map((p, idx) => (
                <p key={idx} className="mb-4">{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Moral Takeaway Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-200 space-y-2">
          <div className="flex items-center gap-2 text-sky-900 font-black text-sm">
            <Sparkles className="w-5 h-5 text-sky-600" />
            <span>Moral of the Story / سبق آموز پیغام</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-sky-950">
            "{story.moral}"
          </p>
          <p className="font-urdu text-base sm:text-lg text-sky-900 text-right">
            "{story.moralUrdu}"
          </p>
        </div>

        {/* End of Story Comprehension Question */}
        <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-black text-slate-900">
              🎯 Quick Story Question:
            </h4>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              +{story.rewardStars} Stars Reward!
            </span>
          </div>

          <p className="text-sm font-bold text-slate-700">
            {story.question.question}
          </p>
          <p className="font-urdu text-sm font-bold text-emerald-800 text-right">
            {story.question.questionUrdu}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {story.question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isTargetCorrect = idx === story.question.correctIndex;
              let btnClass = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800';

              if (quizAnswered) {
                if (isTargetCorrect) {
                  btnClass = 'bg-emerald-500 text-white border-emerald-600';
                } else if (isSelected) {
                  btnClass = 'bg-rose-100 text-rose-800 border-rose-300';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={quizAnswered}
                  className={`p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold text-left transition-all ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {quizAnswered && (
            <div className="pt-2 text-center space-y-3">
              <p className={`text-xs font-black ${isCorrect ? 'text-emerald-700' : 'text-sky-800'}`}>
                {isCorrect ? '✨ That is right! Excellent reading!' : '💡 Good try! The moral of the story shows us the right way.'}
              </p>
              {!claimedStars && (
                <button
                  onClick={handleClaimReward}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-2xl shadow-lg animate-bounce"
                >
                  Claim +{story.rewardStars} Stars ⭐
                </button>
              )}
              {claimedStars && (
                <span className="text-xs font-black text-emerald-600 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Reward Collected!</span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
