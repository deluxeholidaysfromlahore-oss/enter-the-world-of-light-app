import React, { useState } from 'react';
import {
  PenTool,
  SpellCheck,
  Feather,
  Sparkles,
  RotateCw,
  Check,
  ChevronRight,
  Calculator,
  BookMarked,
  ArrowRight,
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { PRACTICE_MODULES } from '../../data/mockData';

export const PracticeScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeWorksheet, setActiveWorksheet] = useState<{
    id: string;
    title: string;
    titleUrdu?: string;
    category: string;
    difficulty: string;
    description: string;
    cardCount: number;
  } | null>(null);

  // Interactive Flashcard Drill state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userSpellingInput, setUserSpellingInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const flashcards = [
    {
      word: 'Accommodate',
      urdu: 'جگہ دینا / نباہنا',
      definition: 'To provide lodging or sufficient space for; to fit in with wishes or needs.',
      example: 'The hall was large enough to accommodate 500 visitors.',
      rule: 'Remember: double "c" and double "m" (2 Cats and 2 Mice).',
    },
    {
      word: 'Tabassum (تبسم)',
      urdu: 'ہلکی مسکراہٹ',
      definition: 'A soft, dignified gentle smile (graceful and gentle expression).',
      example: 'ان کے چہرے پر ایک پروقار تبسم نمودار ہوا۔',
      rule: 'Pronounced: Ta-bas-sum, derived from root b-s-m.',
    },
    {
      word: 'Serendipity',
      urdu: 'غیر متوقع خوشگوار دریافت',
      definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
      example: 'Finding this rare poetry manuscript was pure serendipity.',
      rule: 'Coined by Horace Walpole from the fairy tale of the Three Princes of Serendip.',
    },
  ];

  const categories = [
    'All',
    'Writing',
    'Spelling',
    'Vocabulary',
    'English Practice',
    'Urdu Practice',
    'Daily Practice',
  ];

  const filteredModules =
    activeCategory === 'All'
      ? PRACTICE_MODULES
      : PRACTICE_MODULES.filter(
          (m) =>
            m.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
            activeCategory.toLowerCase().includes(m.category.toLowerCase())
        );

  const checkSpelling = () => {
    const current = flashcards[flashcardIndex];
    if (
      userSpellingInput.trim().toLowerCase() === current.word.toLowerCase()
    ) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const nextFlashcard = () => {
    setIsFlipped(false);
    setFeedback(null);
    setUserSpellingInput('');
    setFlashcardIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="space-y-8 pb-16">
      <SectionHeader
        kicker="Deliberate Exercise"
        title="Practice Studio"
        titleUrdu="مشق اور ریاضت"
        description="Daily drills in writing clarity, English and Urdu spelling, vocabulary expansion, and structural grammar."
      />

      {/* Category selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
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

      {/* Interactive Flashcard / Spelling Drill */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-800 text-white shadow-lg">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs sm:text-sm text-sky-200">
            <span className="font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
              Interactive Vocabulary Flashcard
            </span>
            <span className="font-mono font-bold">
              Card {flashcardIndex + 1} of {flashcards.length}
            </span>
          </div>

          {/* Flashcard container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-6 sm:p-8 rounded-2xl bg-white text-slate-900 shadow-xl cursor-pointer transition-all hover:shadow-2xl border border-white/20 min-h-[200px] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400 mb-2">
                <span>Click to Flip Card</span>
                <RotateCw className="w-4 h-4 text-sky-600" />
              </div>

              {!isFlipped ? (
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {flashcards[flashcardIndex].word}
                  </h3>
                  <p className="font-urdu text-2xl text-amber-700 font-bold mt-2">
                    {flashcards[flashcardIndex].urdu}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
                    Tap card to reveal full definition, mnemonic rule & example sentence.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {flashcards[flashcardIndex].definition}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 italic">
                    "{flashcards[flashcardIndex].example}"
                  </p>
                  <p className="text-xs sm:text-sm text-sky-700 font-bold pt-1">
                    💡 {flashcards[flashcardIndex].rule}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500 font-medium">
              <span>Enter the World of Light Practice Lab</span>
              <span className="text-sky-600 font-bold">
                {isFlipped ? 'View Word' : 'View Meaning'}
              </span>
            </div>
          </div>

          {/* Spelling Check Input */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 space-y-2.5">
            <p className="text-xs sm:text-sm text-sky-100 font-semibold">
              Type the word to test active recall:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userSpellingInput}
                onChange={(e) => setUserSpellingInput(e.target.value)}
                placeholder="Type word here..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
              />
              <button
                onClick={checkSpelling}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
              >
                Check
              </button>
              <button
                onClick={nextFlashcard}
                className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>

            {feedback === 'correct' && (
              <p className="text-xs sm:text-sm font-bold text-emerald-300 flex items-center gap-1.5 mt-1">
                <Check className="w-4 h-4" /> Perfect! Spelling verified.
              </p>
            )}
            {feedback === 'incorrect' && (
              <p className="text-xs sm:text-sm font-bold text-rose-300 mt-1">
                Almost! Check the card spelling and try again.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Practice Modules Catalog */}
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <PenTool className="w-5 h-5 text-sky-600" />
          <span>Curated Practice Worksheets</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredModules.map((mod) => (
            <div
              key={mod.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-2.5">
                  <span className="font-bold text-slate-700">{mod.category}</span>
                  <span className="font-bold text-sky-600">
                    {mod.difficulty}
                  </span>
                </div>

                {mod.titleUrdu && (
                  <p className="font-urdu text-lg font-bold text-slate-800 text-right mb-1">
                    {mod.titleUrdu}
                  </p>
                )}

                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1.5 leading-snug">
                  {mod.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                  {mod.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-500 font-mono font-medium">
                  {mod.cardCount} Exercises
                </span>
                <button
                  onClick={() => setActiveWorksheet(mod)}
                  className="font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Start Practice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Worksheet Modal */}
      {activeWorksheet && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden border border-slate-200 text-left">
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-4 pb-3 border-b border-slate-100">
              <span className="font-bold text-sky-600 uppercase tracking-wider">
                {activeWorksheet.category} Practice
              </span>
              <button
                onClick={() => setActiveWorksheet(null)}
                className="text-slate-400 hover:text-slate-700 font-bold px-2 py-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center">
                <PenTool className="w-7 h-7" />
              </div>

              <div>
                {activeWorksheet.titleUrdu && (
                  <p className="font-urdu text-xl font-bold text-slate-800 text-right">
                    {activeWorksheet.titleUrdu}
                  </p>
                )}
                <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {activeWorksheet.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                  {activeWorksheet.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Curriculum Level:</span>
                  <span className="font-bold text-sky-700">{activeWorksheet.difficulty}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Total Exercises:</span>
                  <span className="font-bold text-slate-800">{activeWorksheet.cardCount} interactive questions</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Evaluation:</span>
                  <span className="font-bold text-emerald-600">Instant Real-time Feedback</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setActiveWorksheet(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => setActiveWorksheet(null)}
                  className="flex-1 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-md shadow-sky-600/25 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Begin Exercises</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
