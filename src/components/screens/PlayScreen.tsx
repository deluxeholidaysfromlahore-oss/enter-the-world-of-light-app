import React, { useState } from 'react';
import {
  Gamepad2,
  Trophy,
  Brain,
  Timer,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { PLAY_QUIZZES } from '../../data/mockData';
import { QuizItem } from '../../types';
import { activityPointsService } from '../../services/activityPointsService';

export const PlayScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeQuiz, setActiveQuiz] = useState<QuizItem | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Playable interactive memory game preview
  const [memoryCards, setMemoryCards] = useState([
    { id: 1, val: '☀️', matched: false, flipped: false },
    { id: 2, val: '📖', matched: false, flipped: false },
    { id: 3, val: '🕊️', matched: false, flipped: false },
    { id: 4, val: '⭐', matched: false, flipped: false },
    { id: 5, val: '☀️', matched: false, flipped: false },
    { id: 6, val: '📖', matched: false, flipped: false },
    { id: 7, val: '🕊️', matched: false, flipped: false },
    { id: 8, val: '⭐', matched: false, flipped: false },
  ]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);

  // State for game launcher simulation modal
  const [selectedGameForPlay, setSelectedGameForPlay] = useState<{
    id: string;
    title: string;
    category: string;
    difficulty: string;
    description: string;
  } | null>(null);

  const categories = [
    'All',
    'Quizzes',
    'Games',
    'Puzzles',
    'Memory Games',
    'Word Games',
    'Number Games',
    'Challenges',
  ];

  const gamesCatalog = [
    {
      id: 'g-1',
      title: 'Memory Match: Light & Wisdom Symbols',
      category: 'Memory Games',
      difficulty: 'Easy',
      players: 'Solo',
      gradient: 'from-amber-500 to-amber-700',
      description: 'Find matching pairs of symbols from classical poetry and cosmic light.',
      isInteractiveDemo: true,
    },
    {
      id: 'g-2',
      title: 'Urdu Word Scramble (حروف کا جال)',
      category: 'Word Games',
      difficulty: 'Medium',
      players: 'Solo',
      gradient: 'from-emerald-500 to-teal-700',
      description: 'Rearrange scattered Urdu harf to form meaningful words.',
    },
    {
      id: 'g-3',
      title: 'Speed Math Arithmetic Sprint',
      category: 'Number Games',
      difficulty: 'Hard',
      players: 'Solo',
      gradient: 'from-sky-500 to-indigo-700',
      description: 'Beat the 60-second timer answering mental arithmetic equations.',
    },
    {
      id: 'g-4',
      title: 'Cosmic Constellation Puzzle',
      category: 'Puzzles',
      difficulty: 'Medium',
      players: 'Solo',
      gradient: 'from-indigo-600 to-purple-800',
      description: 'Connect stars to reveal the ancient mythical constellations.',
    },
    {
      id: 'g-5',
      title: '7-Day Vocabulary Championship',
      category: 'Challenges',
      difficulty: 'All Ages',
      players: 'Community',
      gradient: 'from-rose-500 to-red-700',
      description: 'Daily competitive riddle & crossword streak tournament.',
    },
  ];

  const handleCardClick = (id: number) => {
    if (flippedIds.length === 2) return;
    const clicked = memoryCards.find((c) => c.id === id);
    if (!clicked || clicked.flipped || clicked.matched) return;

    const newCards = memoryCards.map((c) =>
      c.id === id ? { ...c, flipped: true } : c
    );
    setMemoryCards(newCards);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      const first = memoryCards.find((c) => c.id === firstId);
      const second = memoryCards.find((c) => c.id === secondId);

      if (first && second && first.val === second.val) {
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, matched: true } : c
            )
          );
          setFlippedIds([]);
        }, 500);
      } else {
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c
            )
          );
          setFlippedIds([]);
        }, 800);
      }
    }
  };

  const resetMemoryGame = () => {
    setMemoryCards(
      memoryCards.map((c) => ({ ...c, matched: false, flipped: false }))
    );
    setFlippedIds([]);
  };

  const startQuiz = (quiz: QuizItem) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsQuizCompleted(false);
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered || !activeQuiz) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = activeQuiz.questions[currentQuestionIndex];
    if (index === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (!activeQuiz) return;
    if (currentQuestionIndex + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizCompleted(true);
      activityPointsService.trackActivity({
        category: 'quiz',
        isQuizSuccess: score >= 1,
        title: activeQuiz.title,
        itemId: activeQuiz.id,
        xpEarned: activeQuiz.xpReward || 40,
      }).catch(() => {});
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <SectionHeader
        kicker="Interactive Arena"
        title="Play & Challenge"
        titleUrdu="کھیل اور معرکے"
        description="Sharpen your mind with logic puzzles, memory matchups, word scrambles, and timed quizzes."
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

      {/* Featured Interactive Mini-Game Demo (Memory Cards) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-black/10 px-3 py-1 rounded-full mb-1.5">
              <Brain className="w-4 h-4" />
              <span>Interactive Minigame Preview</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Memory Match: Match The Symbols
            </h3>
            <p className="text-sm font-medium text-slate-900 mt-0.5">
              Flip the cards to pair matching symbols of light, wisdom, and peace.
            </p>
          </div>

          <button
            onClick={resetMemoryGame}
            className="px-4 py-2 bg-white/95 hover:bg-white text-slate-950 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Shuffle Cards</span>
          </button>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 max-w-2xl">
          {memoryCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`h-16 rounded-xl flex items-center justify-center text-2xl font-bold shadow-sm transition-all transform active:scale-95 ${
                card.flipped || card.matched
                  ? 'bg-white text-slate-900 scale-105'
                  : 'bg-amber-600 hover:bg-amber-700 text-transparent'
              }`}
            >
              {card.flipped || card.matched ? card.val : '?'}
            </button>
          ))}
        </div>
      </div>

      {/* Speed Quizzes Section */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Knowledge & Speed Quizzes</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLAY_QUIZZES.map((quiz) => (
            <div
              key={quiz.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>{quiz.category}</span>
                  <span className="flex items-center gap-1 font-mono text-amber-600 font-bold">
                    <Timer className="w-3 h-3" />
                    {quiz.timeLimit}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 mb-1">
                  {quiz.title}
                </h4>

                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <span>{quiz.totalQuestions} Questions</span>
                  <span aria-hidden="true">·</span>
                  <span>{quiz.level} Level</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-sky-600 font-semibold">+{quiz.xpReward} XP</span>
                </div>
              </div>

              <button
                onClick={() => startQuiz(quiz)}
                className="mt-5 w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Quiz</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Logic & Puzzle Games */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-indigo-500" />
          <span>Games & Challenges Catalog</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gamesCatalog.map((game) => (
            <div
              key={game.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>{game.category}</span>
                  <span className="font-semibold text-indigo-600">{game.difficulty}</span>
                </div>

                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1.5 leading-snug">
                  {game.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                  {game.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-500 font-medium">{game.players}</span>
                <button
                  onClick={() => setSelectedGameForPlay(game)}
                  className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Play Game</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Play Modal */}
      {activeQuiz && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden border border-slate-200">
            {!isQuizCompleted ? (
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span className="font-semibold text-sky-600">
                    Question {currentQuestionIndex + 1} of{' '}
                    {activeQuiz.questions.length}
                  </span>
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    Exit
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-6">
                  <div
                    className="bg-sky-600 h-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) /
                          activeQuiz.questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

                {activeQuiz.questions[currentQuestionIndex].questionUrdu && (
                  <p className="font-urdu text-lg text-slate-800 text-right leading-loose mb-2">
                    {activeQuiz.questions[currentQuestionIndex].questionUrdu}
                  </p>
                )}

                <h3 className="text-lg font-bold text-slate-900 mb-6">
                  {activeQuiz.questions[currentQuestionIndex].question}
                </h3>

                {/* Options */}
                <div className="space-y-2.5">
                  {activeQuiz.questions[currentQuestionIndex].options.map(
                    (opt, idx) => {
                      const isCorrect =
                        idx ===
                        activeQuiz.questions[currentQuestionIndex].correctIndex;
                      const isChosen = selectedOption === idx;

                      let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                      if (isAnswered) {
                        if (isCorrect) {
                          style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                        } else if (isChosen) {
                          style = 'bg-rose-50 border-rose-500 text-rose-900';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          disabled={isAnswered}
                          onClick={() => handleOptionSelect(idx)}
                          className={`w-full p-3.5 rounded-xl border text-sm text-left flex items-center justify-between transition-all ${style}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                          {isAnswered && isChosen && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600" />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    <p className="font-semibold text-slate-800 mb-0.5">
                      Explanation:
                    </p>
                    {activeQuiz.questions[currentQuestionIndex].explanation}
                  </div>
                )}

                {/* Action button */}
                <div className="mt-6 flex justify-end">
                  {isAnswered && (
                    <button
                      onClick={nextQuestion}
                      className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      {currentQuestionIndex + 1 < activeQuiz.questions.length
                        ? 'Next Question →'
                        : 'Finish Quiz'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Completion */
              <div className="text-center py-6 space-y-4">
                <Trophy className="w-16 h-16 text-amber-500 mx-auto" />
                <h3 className="text-2xl font-bold text-slate-900">
                  Quiz Completed!
                </h3>
                <p className="text-sm text-slate-600">
                  You scored <span className="font-bold text-sky-600">{score}</span> out of{' '}
                  {activeQuiz.questions.length} questions.
                </p>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-semibold inline-block">
                  +{score * 25} XP Earned
                </div>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => startQuiz(activeQuiz)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Launcher Simulation Modal */}
      {selectedGameForPlay && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden border border-slate-200 text-left">
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-4 pb-3 border-b border-slate-100">
              <span className="font-bold text-indigo-600 uppercase tracking-wider">
                {selectedGameForPlay.category}
              </span>
              <button
                onClick={() => setSelectedGameForPlay(null)}
                className="text-slate-400 hover:text-slate-700 font-bold px-2 py-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                <Gamepad2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {selectedGameForPlay.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                  {selectedGameForPlay.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Difficulty Level:</span>
                  <span className="font-bold text-indigo-700">{selectedGameForPlay.difficulty}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">XP Reward:</span>
                  <span className="font-bold text-amber-600">+50 XP on completion</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Status:</span>
                  <span className="font-bold text-emerald-600">Ready to Play</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSelectedGameForPlay(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Start simulated game
                    setSelectedGameForPlay(null);
                  }}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-md shadow-indigo-600/25 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Game</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
