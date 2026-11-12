import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  Trophy,
  RotateCcw,
  Star,
  CheckCircle2,
  HelpCircle,
  Eye,
  Grid,
  Search,
  Compass,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { kidsAudio } from '../../services/kidsAudio';
import { useKidsTheme } from '../../services/kidsTheme';

interface KidsThinkShellProps {
  onEarnStar: () => void;
}

type ThinkGameType =
  | 'sudoku'
  | 'brain_teasers'
  | 'math_puzzles'
  | 'maze'
  | 'spot_difference'
  | 'jigsaw'
  | 'word_search'
  | 'riddles'
  | 'flashcard_recall';

export const KidsThinkShell: React.FC<KidsThinkShellProps> = ({ onEarnStar }) => {
  const { currentTheme } = useKidsTheme();
  const [activeTab, setActiveTab] = useState<ThinkGameType>('sudoku');
  const scrollTabsRef = React.useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    kidsAudio.playPopSound();
    if (scrollTabsRef.current) {
      scrollTabsRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    kidsAudio.playPopSound();
    if (scrollTabsRef.current) {
      scrollTabsRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  const thinkGames = [
    { id: 'sudoku', title: '4x4 Sudoku', icon: '🔢', tag: 'Logic & Memory' },
    { id: 'brain_teasers', title: 'Brain Teasers', icon: '🧠', tag: 'Lateral Thinking' },
    { id: 'math_puzzles', title: 'Math Puzzles', icon: '➕', tag: 'Problem Solving' },
    { id: 'maze', title: 'Maze Runner', icon: '🌀', tag: 'Spatial Skills' },
    { id: 'spot_difference', title: 'Spot Difference', icon: '🔍', tag: 'Observation' },
    { id: 'jigsaw', title: 'Jigsaw Tile', icon: '🧩', tag: 'Spatial Puzzle' },
    { id: 'word_search', title: 'Word Search', icon: '🔤', tag: 'Vocabulary' },
    { id: 'riddles', title: 'Riddles (پہیلیاں)', icon: '💡', tag: 'Mental Exercise' },
    { id: 'flashcard_recall', title: 'Flashcard Recall', icon: '🃏', tag: 'Working Memory' },
  ];

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="text-center max-w-2xl mx-auto space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
          <span>🧠 Think & Brain Wonders (سوچ اور ذہانت)</span>
        </h2>
        <p className="text-xs sm:text-sm font-bold text-slate-600">
          Stimulate logical thinking, lateral problem solving, spatial skills & sharp concentration!
        </p>
      </div>

      {/* Think Games Horizontal Selector Tabs with Scroll Arrows */}
      <div className="relative flex items-center gap-2">
        {/* Left Arrow Button */}
        <button
          onClick={scrollLeft}
          aria-label="Peeche scroll karein (Scroll left)"
          title="Scroll Left (پیچھے کریں)"
          className="p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200/80 shadow-sm active:scale-95 transition-all shrink-0 z-10"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>

        {/* Scrollable Options Track */}
        <div
          ref={scrollTabsRef}
          className="flex-1 flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none scroll-smooth"
        >
          {thinkGames.map((g) => {
            const isActive = activeTab === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  setActiveTab(g.id as ThinkGameType);
                  kidsAudio.playPopSound();
                }}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shrink-0 border-2 transition-all shadow-sm ${
                  isActive
                    ? `bg-gradient-to-r ${currentTheme.gradient} text-white border-transparent ring-2 ring-white/50 scale-102 shadow-md`
                    : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg">{g.icon}</span>
                <div className="text-left">
                  <div>{g.title}</div>
                  <div className={`text-[9px] font-medium opacity-80 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {g.tag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={scrollRight}
          aria-label="Aagay scroll karein (Scroll right)"
          title="Scroll Right (آگے کریں)"
          className="p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200/80 shadow-sm active:scale-95 transition-all shrink-0 z-10"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      {/* Active Game Container */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-slate-200/80 min-h-[420px] flex flex-col justify-center">
        {activeTab === 'sudoku' && <SudokuGame onEarnStar={onEarnStar} />}
        {activeTab === 'brain_teasers' && <BrainTeaserGame onEarnStar={onEarnStar} />}
        {activeTab === 'math_puzzles' && <MathPuzzleGame onEarnStar={onEarnStar} />}
        {activeTab === 'maze' && <MazeGame onEarnStar={onEarnStar} />}
        {activeTab === 'spot_difference' && <SpotDifferenceGame onEarnStar={onEarnStar} />}
        {activeTab === 'jigsaw' && <JigsawGame onEarnStar={onEarnStar} />}
        {activeTab === 'word_search' && <WordSearchGame onEarnStar={onEarnStar} />}
        {activeTab === 'riddles' && <RiddlesGame onEarnStar={onEarnStar} />}
        {activeTab === 'flashcard_recall' && <FlashcardRecallGame onEarnStar={onEarnStar} />}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   1. 4x4 MINI SUDOKU (Multi-Level Classic Logic)
------------------------------------------------------------------------- */
interface SudokuLevel {
  id: number;
  title: string;
  initial: number[][];
  solution: number[][];
}

const SUDOKU_LEVELS: SudokuLevel[] = [
  {
    id: 1,
    title: 'Board 1: Gentle Starter',
    initial: [
      [1, 0, 3, 0],
      [0, 4, 0, 2],
      [2, 0, 4, 0],
      [0, 3, 0, 1],
    ],
    solution: [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1],
    ],
  },
  {
    id: 2,
    title: 'Board 2: Clever Logic',
    initial: [
      [0, 2, 0, 4],
      [4, 0, 2, 0],
      [0, 3, 0, 1],
      [1, 0, 3, 0],
    ],
    solution: [
      [3, 2, 1, 4],
      [4, 1, 2, 3],
      [2, 3, 4, 1],
      [1, 4, 3, 2],
    ],
  },
  {
    id: 3,
    title: 'Board 3: Master Thinker',
    initial: [
      [2, 0, 4, 0],
      [0, 1, 0, 3],
      [3, 0, 1, 0],
      [0, 4, 0, 2],
    ],
    solution: [
      [2, 3, 4, 1],
      [4, 1, 2, 3],
      [3, 2, 1, 4],
      [1, 4, 3, 2],
    ],
  },
];

const SudokuGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const currentLvl = SUDOKU_LEVELS[levelIndex];

  const [grid, setGrid] = useState<number[][]>(currentLvl.initial);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>([0, 1]);
  const [isSolved, setIsSolved] = useState(false);
  const [feedback, setFeedback] = useState('Fill each row, column & 2x2 box with numbers 1 to 4!');

  useEffect(() => {
    setGrid(currentLvl.initial);
    setIsSolved(false);
    setSelectedCell([0, 1]);
    setFeedback('Fill each row, column & 2x2 box with numbers 1 to 4!');
  }, [levelIndex]);

  const handleCellClick = (r: number, c: number) => {
    if (currentLvl.initial[r][c] !== 0) return; // Cannot edit pre-filled cells
    kidsAudio.playPopSound();
    setSelectedCell([r, c]);
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;

    kidsAudio.playGameSound('sudoku_place');
    const newGrid = grid.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? num : cell))
    );
    setGrid(newGrid);

    // Validate if complete
    let allFilled = true;
    let correctlySolved = true;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (newGrid[i][j] === 0) allFilled = false;
        if (newGrid[i][j] !== currentLvl.solution[i][j]) correctlySolved = false;
      }
    }

    if (allFilled && correctlySolved) {
      setIsSolved(true);
      kidsAudio.playCelebrationFanfare();
      onEarnStar();
      setFeedback('Brilliant logical thinking! Sudoku Solved! +2 Stars ⭐');
    } else if (allFilled && !correctlySolved) {
      kidsAudio.playGentleRetrySound();
      setFeedback('Some numbers repeat in a row or column. Look closely and try again!');
    }
  };

  const nextLevel = () => {
    const next = (levelIndex + 1) % SUDOKU_LEVELS.length;
    setLevelIndex(next);
    kidsAudio.playPopSound();
  };

  const resetBoard = () => {
    setGrid(currentLvl.initial);
    setSelectedCell([0, 1]);
    setIsSolved(false);
    setFeedback('Fill each row, column & 2x2 box with numbers 1 to 4!');
  };

  return (
    <div className="space-y-4 text-center max-w-md mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-900 rounded-full text-xs font-black mb-1">
          <span>{currentLvl.title}</span>
        </div>
        <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
          <span>🔢 4x4 Mini Sudoku Puzzle</span>
        </h3>
        <p className="text-xs font-bold text-slate-600">{feedback}</p>
      </div>

      {/* 4x4 Grid Container */}
      <div className="inline-grid grid-cols-4 gap-1.5 p-3 bg-slate-100 rounded-3xl border-3 border-slate-300 shadow-inner">
        {grid.map((row, r) =>
          row.map((val, c) => {
            const isPrefilled = currentLvl.initial[r][c] !== 0;
            const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
            // Draw 2x2 box divider lines
            const isRightBorder = c === 1 ? 'border-r-3 border-r-slate-400' : '';
            const isBottomBorder = r === 1 ? 'border-b-3 border-b-slate-400' : '';

            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-xl sm:text-2xl font-black flex items-center justify-center transition-all ${isRightBorder} ${isBottomBorder} ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-md ring-4 ring-sky-200 scale-105'
                    : isPrefilled
                    ? 'bg-slate-200 text-slate-900 cursor-not-allowed'
                    : val !== 0
                    ? 'bg-sky-100 text-sky-900 border border-sky-300'
                    : 'bg-white text-slate-400 hover:bg-sky-50'
                }`}
              >
                {val !== 0 ? val : ''}
              </button>
            );
          })
        )}
      </div>

      {/* Number Choices 1 to 4 */}
      <div className="flex justify-center gap-3">
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => handleNumberInput(n)}
            disabled={!selectedCell || isSolved}
            className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-sky-100 text-slate-800 text-xl font-black border-2 border-slate-200 active:scale-95 transition-all shadow-sm"
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-2 pt-1">
        {isSolved && (
          levelIndex < SUDOKU_LEVELS.length - 1 ? (
            <button
              onClick={nextLevel}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-95"
            >
              <span>Next Sudoku Board ➡️</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setLevelIndex(0);
                kidsAudio.playCelebrationFanfare();
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-95"
            >
              <span>🏆 All Boards Solved! Replay Sudoku 🔄</span>
            </button>
          )
        )}
        <button
          onClick={resetBoard}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Board</span>
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   2. BRAIN TEASERS (Lateral Thinking)
------------------------------------------------------------------------- */
const BRAIN_TEASERS = [
  {
    q: 'What has hands but cannot clap? (کس کے ہاتھ ہیں مگر وہ تالی نہیں بجا سکتی؟)',
    options: ['A Clock ⏰', 'A Glove 🧤', 'A Tree 🌳', 'A Mirror 🪞'],
    correct: 0,
    explanation: 'A clock has hour and minute hands that point to the numbers!',
  },
  {
    q: 'What goes up when rain comes down? (جب بارش نیچے آتی ہے تو کیا اوپر جاتا ہے؟)',
    options: ['An Umbrella ☂️', 'A Bird 🐦', 'Smoke 💨', 'A Balloon 🎈'],
    correct: 0,
    explanation: 'An umbrella opens and goes up to keep you safe and dry!',
  },
  {
    q: 'I have a neck but no head, and I hold water. What am I?',
    options: ['A Bottle 🍶', 'A Snake 🐍', 'A River 🌊', 'A Teapot 🫖'],
    correct: 0,
    explanation: 'A water bottle has a neck at the top!',
  },
];

const BrainTeaserGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const activeTeaser = BRAIN_TEASERS[index];

  const handlePick = (idx: number) => {
    if (answered) return;
    setChosen(idx);
    setAnswered(true);

    if (idx === activeTeaser.correct) {
      kidsAudio.playRewardChime();
      onEarnStar();
    } else {
      kidsAudio.playGentleRetrySound();
    }
  };

  const nextTeaser = () => {
    kidsAudio.playPopSound();
    setChosen(null);
    setAnswered(false);
    setIndex((i) => (i + 1) % BRAIN_TEASERS.length);
  };

  return (
    <div className="space-y-6 text-center max-w-lg mx-auto">
      <div>
        <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
          <span>🧠 Lateral Thinking Brain Teaser</span>
        </h3>
        <p className="text-xs font-bold text-slate-600">
          Think outside the box and solve creative questions!
        </p>
      </div>

      <div className="p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl space-y-3">
        <span className="text-xs font-black uppercase text-sky-700 tracking-wider">
          Question {index + 1} of {BRAIN_TEASERS.length}
        </span>
        <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
          {activeTeaser.q}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {activeTeaser.options.map((opt, i) => {
          let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
          if (answered) {
            if (i === activeTeaser.correct) {
              btnStyle = 'bg-emerald-500 text-white border-emerald-600';
            } else if (chosen === i) {
              btnStyle = 'bg-rose-100 text-rose-800 border-rose-300';
            }
          }
          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              disabled={answered}
              className={`p-4 rounded-2xl border-2 font-bold text-sm text-left transition-all ${btnStyle}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="space-y-3 p-4 bg-sky-50 rounded-2xl border border-sky-200 animate-in fade-in">
          <p className="text-xs font-bold text-slate-800">
            💡 {activeTeaser.explanation}
          </p>
          <button
            onClick={nextTeaser}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-xl shadow-md transition-all"
          >
            Next Brain Teaser ➡️
          </button>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   3. MATH PUZZLES (Equation Balancing)
------------------------------------------------------------------------- */
const MATH_PUZZLES = [
  {
    equation: '🍎 + 🍎 = 6',
    subEquation: '🍎 + 🍌 = 7',
    question: 'What is the value of 🍌 (Banana)?',
    options: [3, 4, 5, 2],
    answer: 4,
    explanation: 'Since 3 + 3 = 6, Apple = 3. Then 3 + 4 = 7, so Banana = 4!',
  },
  {
    equation: '⭐ + ⭐ = 10',
    subEquation: '⭐ + 🌙 = 8',
    question: 'What is the value of 🌙 (Moon)?',
    options: [2, 3, 5, 4],
    answer: 3,
    explanation: 'Star = 5 (5 + 5 = 10). Then 5 + 3 = 8, so Moon = 3!',
  },
];

const MathPuzzleGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const p = MATH_PUZZLES[index];

  const handlePick = (val: number) => {
    if (answered) return;
    setSelected(val);
    setAnswered(true);

    if (val === p.answer) {
      kidsAudio.playRewardChime();
      onEarnStar();
    } else {
      kidsAudio.playGentleRetrySound();
    }
  };

  const nextPuzzle = () => {
    kidsAudio.playPopSound();
    setAnswered(false);
    setSelected(null);
    setIndex((i) => (i + 1) % MATH_PUZZLES.length);
  };

  return (
    <div className="space-y-6 text-center max-w-md mx-auto">
      <div>
        <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
          <span>➕ Math Logic & Symbol Puzzle</span>
        </h3>
        <p className="text-xs font-bold text-slate-600">
          Crack the secret code of symbols using arithmetic!
        </p>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 space-y-3">
        <div className="text-2xl font-black text-slate-800">{p.equation}</div>
        <div className="text-2xl font-black text-slate-800">{p.subEquation}</div>
        <p className="text-xs font-bold text-sky-800 pt-1">{p.question}</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {p.options.map((opt) => {
          let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
          if (answered) {
            if (opt === p.answer) {
              btnStyle = 'bg-emerald-500 text-white border-emerald-600';
            } else if (selected === opt) {
              btnStyle = 'bg-rose-100 text-rose-800 border-rose-300';
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handlePick(opt)}
              disabled={answered}
              className={`py-3.5 rounded-2xl border-2 font-black text-lg transition-all ${btnStyle}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="space-y-3 p-4 bg-sky-50 rounded-2xl border border-sky-200">
          <p className="text-xs font-bold text-slate-700">💡 {p.explanation}</p>
          <button
            onClick={nextPuzzle}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-xl shadow-md transition-all"
          >
            Next Puzzle ➡️
          </button>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   4. MAZE RUNNER (Multi-Stage Animal Adventure)
------------------------------------------------------------------------- */
interface MazeStage {
  id: number;
  heroName: string;
  heroEmoji: string;
  targetName: string;
  targetEmoji: string;
  soundAnimal: string;
  startPos: [number, number];
  exitPos: [number, number];
  grid: string[][]; // 'W' = wall, 'O' = path
}

const MAZE_STAGES: MazeStage[] = [
  {
    id: 1,
    heroName: 'Little Rabbit (خرگوش)',
    heroEmoji: '🐰',
    targetName: 'Crunchy Carrot (گاجر)',
    targetEmoji: '🥕',
    soundAnimal: 'rabbit',
    startPos: [0, 0],
    exitPos: [4, 4],
    grid: [
      ['O', 'O', 'W', 'O', 'O'],
      ['W', 'O', 'W', 'O', 'W'],
      ['O', 'O', 'O', 'O', 'W'],
      ['O', 'W', 'W', 'O', 'O'],
      ['O', 'O', 'W', 'W', 'O'],
    ],
  },
  {
    id: 2,
    heroName: 'Playful Kitten (بلی)',
    heroEmoji: '🐱',
    targetName: 'Fresh Milk Bowl (دودھ)',
    targetEmoji: '🥛',
    soundAnimal: 'cat',
    startPos: [4, 0],
    exitPos: [0, 4],
    grid: [
      ['O', 'O', 'O', 'W', 'O'],
      ['W', 'W', 'O', 'W', 'O'],
      ['O', 'O', 'O', 'O', 'O'],
      ['O', 'W', 'W', 'W', 'O'],
      ['O', 'O', 'O', 'O', 'O'],
    ],
  },
  {
    id: 3,
    heroName: 'Loyal Puppy (کتا)',
    heroEmoji: '🐶',
    targetName: 'Yummy Bone (ہڈی)',
    targetEmoji: '🦴',
    soundAnimal: 'dog',
    startPos: [0, 4],
    exitPos: [4, 0],
    grid: [
      ['W', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'W', 'W', 'O'],
      ['O', 'W', 'O', 'O', 'O'],
      ['O', 'W', 'O', 'W', 'W'],
      ['O', 'O', 'O', 'O', 'O'],
    ],
  },
  {
    id: 4,
    heroName: 'Clever Monkey (بندر)',
    heroEmoji: '🐵',
    targetName: 'Golden Banana (کیلا)',
    targetEmoji: '🍌',
    soundAnimal: 'monkey',
    startPos: [2, 0],
    exitPos: [2, 4],
    grid: [
      ['W', 'O', 'O', 'O', 'W'],
      ['W', 'O', 'W', 'O', 'W'],
      ['O', 'O', 'W', 'O', 'O'],
      ['W', 'O', 'W', 'O', 'W'],
      ['W', 'O', 'O', 'O', 'W'],
    ],
  },
  {
    id: 5,
    heroName: 'Brave Little Lion (شیر)',
    heroEmoji: '🦁',
    targetName: 'Royal Crown (تاج)',
    targetEmoji: '👑',
    soundAnimal: 'lion',
    startPos: [0, 2],
    exitPos: [4, 2],
    grid: [
      ['W', 'W', 'O', 'W', 'W'],
      ['O', 'O', 'O', 'O', 'O'],
      ['O', 'W', 'W', 'W', 'O'],
      ['O', 'O', 'O', 'O', 'O'],
      ['W', 'W', 'O', 'W', 'W'],
    ],
  },
  {
    id: 6,
    heroName: 'Sweet Bear (ریچھ)',
    heroEmoji: '🐻',
    targetName: 'Pure Honey Jar (شہد)',
    targetEmoji: '🍯',
    soundAnimal: 'bee',
    startPos: [4, 4],
    exitPos: [0, 0],
    grid: [
      ['O', 'O', 'O', 'W', 'W'],
      ['W', 'W', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'W', 'O'],
      ['O', 'W', 'O', 'W', 'O'],
      ['O', 'W', 'O', 'O', 'O'],
    ],
  },
];

const MazeGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [stageIndex, setStageIndex] = useState(0);
  const currentStage = MAZE_STAGES[stageIndex];

  const [playerPos, setPlayerPos] = useState<[number, number]>(currentStage.startPos);
  const [hasWon, setHasWon] = useState(false);

  // Sync player position when stage changes
  useEffect(() => {
    setPlayerPos(currentStage.startPos);
    setHasWon(false);
  }, [stageIndex]);

  const move = (dr: number, dc: number) => {
    if (hasWon) return;
    const [r, c] = playerPos;
    const nr = r + dr;
    const nc = c + dc;

    // Check bounds
    if (nr < 0 || nr > 4 || nc < 0 || nc > 4) return;
    // Check wall
    if (currentStage.grid[nr][nc] === 'W') {
      kidsAudio.playGameSound('wall_bump');
      return;
    }

    kidsAudio.playGameSound('footstep');
    setPlayerPos([nr, nc]);

    // Check win condition against current stage exit
    if (nr === currentStage.exitPos[0] && nc === currentStage.exitPos[1]) {
      setHasWon(true);
      kidsAudio.playCelebrationFanfare();
      onEarnStar();
    }
  };

  const nextStage = () => {
    const nextIdx = (stageIndex + 1) % MAZE_STAGES.length;
    setStageIndex(nextIdx);
    setHasWon(false);
    // Play animal sound of the new friend
    kidsAudio.playAnimalSound(MAZE_STAGES[nextIdx].soundAnimal);
  };

  const restartCurrentStage = () => {
    setPlayerPos(currentStage.startPos);
    setHasWon(false);
    kidsAudio.playPopSound();
  };

  return (
    <div className="space-y-4 text-center max-w-sm mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black mb-1">
          <span>Stage {currentStage.id} of {MAZE_STAGES.length}</span>
          <span>•</span>
          <span>{currentStage.heroName}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center justify-center gap-2">
          <span>{currentStage.heroEmoji} Maze Quest to {currentStage.targetEmoji}</span>
        </h3>
        <p className="text-xs font-bold text-slate-600">
          Guide {currentStage.heroEmoji} through the maze to reach {currentStage.targetEmoji} ({currentStage.targetName})!
        </p>
      </div>

      {/* Maze Grid */}
      <div className="inline-grid grid-cols-5 gap-1.5 p-3 bg-slate-100 rounded-3xl border-2 border-slate-300 shadow-inner">
        {currentStage.grid.map((row, r) =>
          row.map((cell, c) => {
            const isPlayer = playerPos[0] === r && playerPos[1] === c;
            const isExit = currentStage.exitPos[0] === r && currentStage.exitPos[1] === c;
            const isWall = cell === 'W';

            return (
              <div
                key={`${r}-${c}`}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                  isPlayer
                    ? 'bg-amber-300 ring-4 ring-amber-200 shadow-md scale-105 animate-bounce'
                    : isExit
                    ? 'bg-emerald-200 border-2 border-emerald-400 shadow-sm'
                    : isWall
                    ? 'bg-slate-700 shadow-inner'
                    : 'bg-white border border-slate-200'
                }`}
              >
                {isPlayer ? currentStage.heroEmoji : isExit ? currentStage.targetEmoji : isWall ? '🧱' : ''}
              </div>
            );
          })
        )}
      </div>

      {/* Controller Buttons */}
      <div className="flex flex-col items-center gap-1.5 pt-1">
        <button
          onClick={() => move(-1, 0)}
          aria-label="Up"
          className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl active:scale-95 shadow-sm border border-slate-200"
        >
          <ArrowUp className="w-5 h-5 text-slate-700" />
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => move(0, -1)}
            aria-label="Left"
            className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl active:scale-95 shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <button
            onClick={() => move(1, 0)}
            aria-label="Down"
            className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl active:scale-95 shadow-sm border border-slate-200"
          >
            <ArrowDown className="w-5 h-5 text-slate-700" />
          </button>
          <button
            onClick={() => move(0, 1)}
            aria-label="Right"
            className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl active:scale-95 shadow-sm border border-slate-200"
          >
            <ArrowRight className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {/* Level Success Celebration Bar */}
      {hasWon && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2 animate-bounce">
          <h4 className="text-sm font-black text-emerald-900">
            {stageIndex < MAZE_STAGES.length - 1
              ? `🎉 Stage ${currentStage.id} Won! ${currentStage.heroEmoji} got the ${currentStage.targetEmoji}! +2 Stars ⭐`
              : '🌟 Adventure Complete! All 6 Animal Friends Rescued! +2 Stars ⭐'}
          </h4>
          <p className="text-xs font-bold text-slate-600">
            {stageIndex < MAZE_STAGES.length - 1
              ? 'Next Animal Friend is eager to explore!'
              : 'مبارک ہو! آپ نے بھول بھلیوں کے تمام 6 مراحل کامیابی سے مکمل کر لیے ہیں۔'}
          </p>
          <div className="flex justify-center gap-2 pt-1">
            {stageIndex < MAZE_STAGES.length - 1 ? (
              <button
                onClick={nextStage}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all"
              >
                Next Stage ➡️ (اگلا مرحلہ)
              </button>
            ) : (
              <button
                onClick={() => {
                  setStageIndex(0);
                  setHasWon(false);
                  kidsAudio.playCelebrationFanfare();
                }}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all"
              >
                Replay Adventure 🔄 (دوبارہ کھیلیں)
              </button>
            )}
            <button
              onClick={restartCurrentStage}
              className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200"
            >
              Replay Stage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   5. SPOT THE DIFFERENCE (Multi-Scene Observation)
------------------------------------------------------------------------- */
interface DiffScene {
  id: number;
  title: string;
  titleUrdu: string;
  cardA: {
    top: [string, string];
    center: string;
    bottom: [string, string];
  };
  cardB: {
    top: [string, { id: number; emoji: string; hint: string }];
    center: { id: number; emoji: string; hint: string };
    bottom: [string, { id: number; emoji: string; hint: string }];
  };
}

const DIFF_SCENES: DiffScene[] = [
  {
    id: 1,
    title: 'Sunny Garden Park',
    titleUrdu: 'سرسبز پارک',
    cardA: {
      top: ['☀️', '⭐'],
      center: '👦🧢',
      bottom: ['🌳', '🌸 🌸'],
    },
    cardB: {
      top: ['☀️', { id: 1, emoji: '☁️', hint: 'Look in upper right sky!' }],
      center: { id: 2, emoji: '👦🎩', hint: 'Look at the child’s cap!' },
      bottom: ['🌳', { id: 3, emoji: '🌸 🍄', hint: 'Look at the flowers!' }],
    },
  },
  {
    id: 2,
    title: 'Cosmic Space Explorer',
    titleUrdu: 'خلائی سفر',
    cardA: {
      top: ['🚀', '🪐'],
      center: '👨‍🚀✨',
      bottom: ['🌙', '🛰️ 🛰️'],
    },
    cardB: {
      top: ['🚀', { id: 1, emoji: '🌕', hint: 'Look at the planet!' }],
      center: { id: 2, emoji: '👽✨', hint: 'Look who is in the suit!' },
      bottom: ['🌙', { id: 3, emoji: '🛰️ 🛸', hint: 'Look at the satellite!' }],
    },
  },
  {
    id: 3,
    title: 'Deep Ocean Coral Reef',
    titleUrdu: 'سمندری دنیا',
    cardA: {
      top: ['🐬', '🫧'],
      center: '🐠🪸',
      bottom: ['🌊', '🐚 🐚'],
    },
    cardB: {
      top: ['🐬', { id: 1, emoji: '⭐', hint: 'Look at the bubbles!' }],
      center: { id: 2, emoji: '🐙🪸', hint: 'Look who is near the coral!' },
      bottom: ['🌊', { id: 3, emoji: '🐚 🦀', hint: 'Look at the shells!' }],
    },
  },
];

const SpotDifferenceGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const currentScene = DIFF_SCENES[sceneIndex];
  const [foundDiffs, setFoundDiffs] = useState<number[]>([]);

  useEffect(() => {
    setFoundDiffs([]);
  }, [sceneIndex]);

  const handleSpot = (id: number) => {
    if (foundDiffs.includes(id)) return;
    kidsAudio.playRewardChime();
    const next = [...foundDiffs, id];
    setFoundDiffs(next);

    if (next.length === 3) {
      kidsAudio.playCelebrationFanfare();
      onEarnStar();
    }
  };

  const nextScene = () => {
    const next = (sceneIndex + 1) % DIFF_SCENES.length;
    setSceneIndex(next);
    kidsAudio.playPopSound();
  };

  return (
    <div className="space-y-5 text-center max-w-xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black mb-1">
          <span>Scene {currentScene.id} of {DIFF_SCENES.length}: {currentScene.title}</span>
        </div>
        <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
          <span>🔍 Spot the 3 Differences</span>
        </h3>
        <p className="text-xs font-bold text-slate-600">
          Compare Picture A and Picture B, tap all 3 differences! ({foundDiffs.length}/3 found)
        </p>
      </div>

      {/* Two Comparison Frames */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card A (Original) */}
        <div className="p-6 bg-sky-50 rounded-3xl border-2 border-sky-200 relative text-left space-y-3">
          <span className="text-[10px] font-black uppercase text-sky-800 tracking-wider">
            Picture A (Original)
          </span>
          <div className="text-4xl flex justify-between items-center">
            <span>{currentScene.cardA.top[0]}</span>
            <span>{currentScene.cardA.top[1]}</span>
          </div>
          <div className="text-5xl text-center py-2">{currentScene.cardA.center}</div>
          <div className="text-4xl flex justify-between items-center">
            <span>{currentScene.cardA.bottom[0]}</span>
            <span>{currentScene.cardA.bottom[1]}</span>
          </div>
        </div>

        {/* Card B (Differences to tap) */}
        <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-300 relative text-left space-y-3">
          <span className="text-[10px] font-black uppercase text-slate-700 tracking-wider">
            Picture B (Tap differences!)
          </span>
          <div className="text-4xl flex justify-between items-center">
            <span>{currentScene.cardB.top[0]}</span>
            <button
              onClick={() => handleSpot(1)}
              className={`p-1 rounded-xl transition-all ${
                foundDiffs.includes(1) ? 'ring-4 ring-emerald-400 bg-emerald-100' : 'hover:scale-110'
              }`}
              title={currentScene.cardB.top[1].hint}
            >
              {foundDiffs.includes(1) ? currentScene.cardA.top[1] : currentScene.cardB.top[1].emoji}
            </button>
          </div>
          <div className="text-5xl text-center py-2">
            <button
              onClick={() => handleSpot(2)}
              className={`p-1 rounded-xl transition-all ${
                foundDiffs.includes(2) ? 'ring-4 ring-emerald-400 bg-emerald-100' : 'hover:scale-110'
              }`}
              title={currentScene.cardB.center.hint}
            >
              {foundDiffs.includes(2) ? currentScene.cardA.center : currentScene.cardB.center.emoji}
            </button>
          </div>
          <div className="text-4xl flex justify-between items-center">
            <span>{currentScene.cardB.bottom[0]}</span>
            <button
              onClick={() => handleSpot(3)}
              className={`p-1 rounded-xl transition-all ${
                foundDiffs.includes(3) ? 'ring-4 ring-emerald-400 bg-emerald-100' : 'hover:scale-110'
              }`}
              title={currentScene.cardB.bottom[1].hint}
            >
              {foundDiffs.includes(3) ? currentScene.cardA.bottom[1] : currentScene.cardB.bottom[1].emoji}
            </button>
          </div>
        </div>
      </div>

      {foundDiffs.length === 3 && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2 animate-bounce">
          <h4 className="text-sm font-black text-emerald-900">
            🎉 Incredible Observation! You spotted all 3 differences in Scene {currentScene.id}! +2 Stars ⭐
          </h4>
          <div className="flex justify-center gap-2 pt-1">
            {sceneIndex < DIFF_SCENES.length - 1 ? (
              <button
                onClick={nextScene}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all"
              >
                Next Scene ➡️ (اگلا منظر)
              </button>
            ) : (
              <button
                onClick={() => {
                  setSceneIndex(0);
                  kidsAudio.playCelebrationFanfare();
                }}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all"
              >
                All 3 Scenes Cleared! Replay 🔄
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   6. JIGSAW / TILE SLIDE PUZZLE (Multi-Theme Spatial Assembly)
------------------------------------------------------------------------- */
interface JigsawTheme {
  id: number;
  title: string;
  goal: string[];
  initial: string[];
}

const JIGSAW_THEMES: JigsawTheme[] = [
  {
    id: 1,
    title: 'Lion Safari (شیر کا جنگل)',
    goal: ['🦁', '👑', '🌿', '🐾', '🌴', '☀️', '🌺', '✨', ''],
    initial: ['👑', '🦁', '🌿', '🐾', '', '🌴', '🌺', '☀️', '✨'],
  },
  {
    id: 2,
    title: 'Space Odyssey (خلائی سفر)',
    goal: ['🚀', '⭐', '🌙', '🪐', '🛸', '🛰️', '☄️', '🌌', ''],
    initial: ['⭐', '🚀', '🌙', '🪐', '', '🛸', '☄️', '🛰️', '🌌'],
  },
  {
    id: 3,
    title: 'Ocean Coral (سمندری دنیا)',
    goal: ['🐬', '🐠', '🐙', '🦀', '🌊', '🐚', '🐋', '🪸', ''],
    initial: ['🐠', '🐬', '🐙', '🦀', '', '🌊', '🐋', '🐚', '🪸'],
  },
];

const JigsawGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [themeIndex, setThemeIndex] = useState(0);
  const currentTheme = JIGSAW_THEMES[themeIndex];
  const [tiles, setTiles] = useState<string[]>(currentTheme.initial);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setTiles(currentTheme.initial);
    setIsCompleted(false);
  }, [themeIndex]);

  const handleTileClick = (index: number) => {
    if (isCompleted) return;
    const emptyIdx = tiles.indexOf('');

    // Check if adjacent in 3x3 grid
    const validMoves: { [key: number]: number[] } = {
      0: [1, 3],
      1: [0, 2, 4],
      2: [1, 5],
      3: [0, 4, 6],
      4: [1, 3, 5, 7],
      5: [2, 4, 8],
      6: [3, 7],
      7: [4, 6, 8],
      8: [5, 7],
    };

    if (validMoves[emptyIdx]?.includes(index)) {
      kidsAudio.playGameSound('tile_slide');
      const newTiles = [...tiles];
      newTiles[emptyIdx] = newTiles[index];
      newTiles[index] = '';
      setTiles(newTiles);

      // Check win against current theme goal
      if (newTiles.every((t, i) => t === currentTheme.goal[i])) {
        setIsCompleted(true);
        kidsAudio.playCelebrationFanfare();
        onEarnStar();
      }
    } else {
      kidsAudio.playGentleRetrySound();
    }
  };

  const nextPuzzle = () => {
    const next = (themeIndex + 1) % JIGSAW_THEMES.length;
    setThemeIndex(next);
    kidsAudio.playPopSound();
  };

  return (
    <div className="space-y-5 text-center max-w-sm mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-900 rounded-full text-xs font-black mb-1">
          <span>Puzzle {currentTheme.id} of {JIGSAW_THEMES.length}: {currentTheme.title}</span>
        </div>
        <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
          <span>🧩 Jigsaw Tile Puzzle</span>
        </h3>
        <p className="text-xs font-bold text-slate-600">
          Slide tiles next to the empty space to assemble the picture!
        </p>
      </div>

      <div className="inline-grid grid-cols-3 gap-2 p-3 bg-slate-100 rounded-3xl border-2 border-slate-300">
        {tiles.map((emoji, idx) => (
          <button
            key={idx}
            onClick={() => handleTileClick(idx)}
            className={`w-20 h-20 rounded-2xl text-3xl font-black flex items-center justify-center transition-all ${
              emoji === ''
                ? 'bg-slate-200 border-2 border-dashed border-slate-400'
                : 'bg-white shadow-md border-2 border-slate-200 hover:bg-slate-50 active:scale-95'
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {isCompleted && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2 animate-bounce">
          <h4 className="text-sm font-black text-emerald-900">
            🎉 Complete! Wonderful spatial reconstruction! +2 Stars ⭐
          </h4>
          <div className="flex justify-center gap-2 pt-1">
            {themeIndex < JIGSAW_THEMES.length - 1 ? (
              <button
                onClick={nextPuzzle}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all"
              >
                Next Jigsaw Puzzle ➡️ (اگلا پزل)
              </button>
            ) : (
              <button
                onClick={() => {
                  setThemeIndex(0);
                  kidsAudio.playCelebrationFanfare();
                }}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all"
              >
                All 3 Puzzles Solved! Replay 🔄
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   7. WORD SEARCH / WORD HUNT (Multi-Round Vocabulary)
------------------------------------------------------------------------- */
interface WordRound {
  id: number;
  category: string;
  targetWords: string[];
  gridLetters: string[][];
}

const WORD_ROUNDS: WordRound[] = [
  {
    id: 1,
    category: 'Animal Friends',
    targetWords: ['CAT', 'DOG', 'LION'],
    gridLetters: [
      ['C', 'A', 'T', 'S', 'B'],
      ['D', 'O', 'G', 'L', 'O'],
      ['L', 'I', 'O', 'N', 'K'],
      ['P', 'E', 'T', 'S', 'M'],
      ['Z', 'O', 'O', 'F', 'U'],
    ],
  },
  {
    id: 2,
    category: 'Nature & Garden',
    targetWords: ['SUN', 'TREE', 'RAIN'],
    gridLetters: [
      ['S', 'U', 'N', 'A', 'B'],
      ['T', 'R', 'E', 'E', 'O'],
      ['R', 'A', 'I', 'N', 'K'],
      ['F', 'L', 'O', 'W', 'M'],
      ['G', 'R', 'A', 'S', 'S'],
    ],
  },
  {
    id: 3,
    category: 'Night Sky & Cosmos',
    targetWords: ['STAR', 'MOON', 'MARS'],
    gridLetters: [
      ['S', 'T', 'A', 'R', 'B'],
      ['M', 'O', 'O', 'N', 'O'],
      ['M', 'A', 'R', 'S', 'K'],
      ['S', 'K', 'Y', 'U', 'P'],
      ['N', 'I', 'G', 'H', 'T'],
    ],
  },
];

const WordSearchGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [roundIndex, setRoundIndex] = useState(0);
  const currentRound = WORD_ROUNDS[roundIndex];
  const [foundWords, setFoundWords] = useState<string[]>([]);

  useEffect(() => {
    setFoundWords([]);
  }, [roundIndex]);

  const handleWordFound = (w: string) => {
    if (foundWords.includes(w)) return;
    kidsAudio.playGameSound('word_found');
    const next = [...foundWords, w];
    setFoundWords(next);

    if (next.length === currentRound.targetWords.length) {
      kidsAudio.playCelebrationFanfare();
      onEarnStar();
    }
  };

  const nextRound = () => {
    const next = (roundIndex + 1) % WORD_ROUNDS.length;
    setRoundIndex(next);
    kidsAudio.playPopSound();
  };

  return (
    <div className="space-y-5 text-center max-w-sm mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black mb-1">
          <span>Round {currentRound.id} of {WORD_ROUNDS.length}: {currentRound.category}</span>
        </div>
        <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
          <span>🔤 Word Search & Hunt</span>
        </h3>
        <p className="text-xs font-bold text-slate-600">
          Find all hidden vocabulary words! Tap each word below when found.
        </p>
      </div>

      {/* Target Word Badges */}
      <div className="flex justify-center gap-2">
        {currentRound.targetWords.map((w) => (
          <button
            key={w}
            onClick={() => handleWordFound(w)}
            className={`px-3.5 py-1.5 rounded-xl font-black text-xs border transition-all active:scale-95 shadow-sm ${
              foundWords.includes(w)
                ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {w} {foundWords.includes(w) ? '✓' : ''}
          </button>
        ))}
      </div>

      {/* 5x5 Grid */}
      <div className="inline-grid grid-cols-5 gap-1.5 p-3 bg-slate-100 rounded-3xl border-2 border-slate-300">
        {currentRound.gridLetters.map((row, r) =>
          row.map((ch, c) => (
            <div
              key={`${r}-${c}`}
              className="w-12 h-12 rounded-xl bg-white text-slate-800 text-lg font-black flex items-center justify-center shadow-sm border border-slate-200"
            >
              {ch}
            </div>
          ))
        )}
      </div>

      {foundWords.length === currentRound.targetWords.length && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2 animate-bounce">
          <h4 className="text-sm font-black text-emerald-900">
            🎉 All Words Hunted in Round {currentRound.id}! +2 Stars ⭐
          </h4>
          <div className="flex justify-center gap-2 pt-1">
            {roundIndex < WORD_ROUNDS.length - 1 ? (
              <button
                onClick={nextRound}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all"
              >
                Next Word Round ➡️ (اگلا راؤنڈ)
              </button>
            ) : (
              <button
                onClick={() => {
                  setRoundIndex(0);
                  kidsAudio.playCelebrationFanfare();
                }}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all"
              >
                All 3 Rounds Finished! Replay 🔄
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   8. RIDDLES (پہیلیاں)
------------------------------------------------------------------------- */
const RIDDLES_LIST = [
  {
    urdu: 'وہ کون سی چیز ہے جو جتنی زیادہ ہو، اتنی ہی کم دکھائی دیتی ہے؟',
    english: 'What gets bigger the more you take away from it, or harder to see the more there is?',
    options: ['اندھیرا (Darkness)', 'پانی (Water)', 'روشنی (Light)'],
    correct: 0,
    hint: 'Think of nighttime when lights go out!',
  },
  {
    urdu: 'وہ کون ہے جو بولتا نہیں مگر دنیا بھر کا علم دیتا ہے؟',
    english: 'It does not speak words out loud, but gives knowledge of the whole universe?',
    options: ['کتاب (Book)', 'ٹیلی ویژن (TV)', 'درخت (Tree)'],
    correct: 0,
    hint: 'You turn pages to read its wisdom!',
  },
];

const RiddlesGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const r = RIDDLES_LIST[index];

  const handlePick = (idx: number) => {
    if (answered) return;
    setPicked(idx);
    setAnswered(true);

    if (idx === r.correct) {
      kidsAudio.playRewardChime();
      onEarnStar();
    } else {
      kidsAudio.playGentleRetrySound();
    }
  };

  const nextRiddle = () => {
    kidsAudio.playPopSound();
    setAnswered(false);
    setPicked(null);
    setShowHint(false);
    setIndex((i) => (i + 1) % RIDDLES_LIST.length);
  };

  return (
    <div className="space-y-6 text-center max-w-lg mx-auto">
      <div>
        <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
          <span>💡 Classical Urdu & English Riddles (پہیلیاں)</span>
        </h3>
        <p className="text-xs font-bold text-slate-600">
          Solve timeless wisdom riddles with creative lateral thinking!
        </p>
      </div>

      <div className="p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl space-y-3">
        <h4 className="text-lg font-bold font-urdu text-emerald-950 leading-relaxed">
          {r.urdu}
        </h4>
        <p className="text-xs sm:text-sm font-medium text-slate-600">
          "{r.english}"
        </p>

        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs text-sky-700 font-bold flex items-center justify-center gap-1 mx-auto pt-1"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{showHint ? r.hint : 'Need a Hint?'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {r.options.map((opt, i) => {
          let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
          if (answered) {
            if (i === r.correct) {
              btnStyle = 'bg-emerald-500 text-white border-emerald-600';
            } else if (picked === i) {
              btnStyle = 'bg-rose-100 text-rose-800 border-rose-300';
            }
          }
          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              disabled={answered}
              className={`p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm transition-all ${btnStyle}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="pt-2">
          <button
            onClick={nextRiddle}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-xl shadow-md transition-all"
          >
            Next Riddle ➡️
          </button>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   9. FLASHCARD MEMORY RECALL
------------------------------------------------------------------------- */
const FlashcardRecallGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [phase, setPhase] = useState<'memorize' | 'recall' | 'result'>('memorize');
  const [countdown, setCountdown] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const cardItems = ['🦁 Lion', '🚀 Rocket', '🍎 Red Apple'];
  const question = 'Which object was in the middle of the card?';
  const options = ['🚀 Rocket', '🦁 Lion', '🍎 Red Apple', '⭐ Star'];
  const answer = '🚀 Rocket';

  useEffect(() => {
    if (phase === 'memorize') {
      if (countdown > 0) {
        const t = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(t);
      } else {
        setPhase('recall');
      }
    }
  }, [phase, countdown]);

  const handlePick = (opt: string) => {
    setSelectedAnswer(opt);
    setPhase('result');
    if (opt === answer) {
      kidsAudio.playRewardChime();
      onEarnStar();
    } else {
      kidsAudio.playGentleRetrySound();
    }
  };

  const restart = () => {
    kidsAudio.playPopSound();
    setCountdown(5);
    setSelectedAnswer(null);
    setPhase('memorize');
  };

  return (
    <div className="space-y-6 text-center max-w-md mx-auto">
      <div>
        <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
          <span>🃏 Flashcard Memory Recall</span>
        </h3>
        <p className="text-xs font-bold text-slate-600">
          Memorize the objects before the card flips, then answer the question!
        </p>
      </div>

      {phase === 'memorize' && (
        <div className="p-8 bg-sky-50 rounded-3xl border-3 border-sky-300 space-y-4 animate-pulse">
          <span className="text-xs font-black text-sky-800 uppercase">
            Memorize this in {countdown} seconds!
          </span>
          <div className="flex justify-center gap-4 text-3xl sm:text-4xl">
            {cardItems.map((item, idx) => (
              <span key={idx} className="p-3 bg-white rounded-2xl shadow-sm border border-sky-200">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {phase === 'recall' && (
        <div className="space-y-4">
          <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-200">
            <h4 className="text-base font-black text-slate-900">{question}</h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handlePick(opt)}
                className="p-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 font-bold text-sm text-slate-800 transition-all active:scale-95 shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'result' && (
        <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-200 space-y-3">
          <h4
            className={`text-base font-black ${
              selectedAnswer === answer ? 'text-emerald-700' : 'text-slate-800'
            }`}
          >
            {selectedAnswer === answer
              ? '🎉 Sharp Memory! Exactly the Rocket! +2 Stars ⭐'
              : 'Good try! The rocket was in the middle.'}
          </h4>
          <button
            onClick={restart}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-xl shadow-md transition-all"
          >
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  );
};
