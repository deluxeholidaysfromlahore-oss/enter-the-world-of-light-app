import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Trophy,
  RotateCcw,
  Star,
  CheckCircle2,
  Heart,
  Volume2,
} from 'lucide-react';
import { kidsAudio } from '../../services/kidsAudio';
import { kidsStorage } from '../../services/kidsStorage';

interface KidsGameShellProps {
  onEarnStar: () => void;
}

type GameType = 'memory' | 'balloon' | 'counting' | 'rhythm' | 'pattern';

export const KidsGameShell: React.FC<KidsGameShellProps> = ({ onEarnStar }) => {
  const [activeGame, setActiveGame] = useState<GameType>('memory');

  return (
    <div className="space-y-6">
      {/* Game Selector Tabs in Soft Blue Design */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { id: 'memory', title: 'Memory Arcade (6 Games)', icon: '🃏' },
          { id: 'balloon', title: 'Color Pop Adventure', icon: '🎨' },
          { id: 'counting', title: 'Number Safari (6 Games)', icon: '🔢' },
          { id: 'rhythm', title: 'Rainbow Xylophone', icon: '🎵' },
          { id: 'pattern', title: 'Think Patterns', icon: '🧩' },
        ].map((g) => (
          <button
            key={g.id}
            onClick={() => {
              setActiveGame(g.id as GameType);
              kidsAudio.playPopSound();
              kidsStorage.addRecentlyViewed({
                contentId: `game-${g.id}`,
                title: g.title,
                titleUrdu: 'کھیل اور تفریح',
                category: 'Play Arcade',
                type: 'game',
                emoji: g.icon,
              });
            }}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 transition-all shadow-sm ${
              activeGame === g.id
                ? 'bg-sky-600 text-white border-sky-700 ring-2 ring-sky-200 scale-105 shadow-md'
                : 'bg-white text-slate-700 border-sky-100 hover:bg-sky-50'
            }`}
          >
            <span>{g.icon}</span>
            <span>{g.title}</span>
          </button>
        ))}
      </div>

      {/* Active Game Canvas */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border-2 border-sky-200 min-h-[380px] flex flex-col justify-center">
        {activeGame === 'memory' && <MemoryGame onEarnStar={onEarnStar} />}
        {activeGame === 'balloon' && <BalloonGame onEarnStar={onEarnStar} />}
        {activeGame === 'counting' && <CountingGame onEarnStar={onEarnStar} />}
        {activeGame === 'rhythm' && <RhythmGame onEarnStar={onEarnStar} />}
        {activeGame === 'pattern' && <PatternGame onEarnStar={onEarnStar} />}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   1. MEMORY MATCH GAME (Multi-Round Themed Memory)
------------------------------------------------------------------------- */
const MEMORY_THEMES = [
  { id: 1, name: 'Animal Friends (پیارے جانور)', cards: ['🦁', '🦁', '🐱', '🐱', '🐘', '🐘', '🐰', '🐰'] },
  { id: 2, name: 'Cosmic Sky (خلائی دنیا)', cards: ['🚀', '🚀', '⭐', '⭐', '🌙', '🌙', '🪐', '🪐'] },
  { id: 3, name: 'Sweet Fruits (لذیذ پھل)', cards: ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓'] },
  { id: 4, name: 'Rainbow Colors (رنگ برنگی دنیا)', cards: ['🔴', '🔴', '🔵', '🔵', '🟢', '🟢', '🟡', '🟡'] },
  { id: 5, name: 'Ocean Wonders (سمندری دوست)', cards: ['🐬', '🐬', '🐙', '🐙', '🐢', '🐢', '🐟', '🐟'] },
  { id: 6, name: 'Garden Nature (قدرتی پھول)', cards: ['🌲', '🌲', '🌸', '🌸', '🌻', '🌻', '🍄', '🍄'] },
];

const MemoryGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [themeIdx, setThemeIdx] = useState(0);
  const currentTheme = MEMORY_THEMES[themeIdx];
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);

  const initGame = (theme = currentTheme) => {
    const shuffled = [...theme.cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setIsWon(false);
  };

  useEffect(() => {
    initGame(currentTheme);
  }, [themeIdx]);

  const handleCardClick = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;

    kidsAudio.playGameSound('card_flip');
    const nextFlipped = [...flipped, idx];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      const [first, second] = nextFlipped;
      if (cards[first] === cards[second]) {
        kidsAudio.playRewardChime();
        const nextMatched = [...matched, first, second];
        setMatched(nextMatched);
        setFlipped([]);

        if (nextMatched.length === cards.length) {
          setIsWon(true);
          kidsAudio.playCelebrationFanfare();
          onEarnStar();
        }
      } else {
        kidsAudio.playGentleRetrySound();
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const nextRound = () => {
    const next = (themeIdx + 1) % MEMORY_THEMES.length;
    setThemeIdx(next);
    kidsAudio.playPopSound();
  };

  return (
    <div className="space-y-5 text-center max-w-md mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-900 rounded-full text-xs font-black mb-1">
          <span>Round {currentTheme.id} of {MEMORY_THEMES.length}: {currentTheme.name}</span>
        </div>
        <h3 className="text-xl font-black text-sky-950">
          Memory Match Challenge
        </h3>
        <p className="text-xs font-bold text-sky-700">
          Find all matching pairs! Tap cards to flip.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((emoji, idx) => {
          const isCardFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`h-20 sm:h-24 rounded-2xl text-3xl sm:text-4xl flex items-center justify-center border-2 transition-all transform duration-200 active:scale-95 shadow-sm ${
                isCardFlipped
                  ? 'bg-sky-100 border-sky-300'
                  : 'bg-sky-600 hover:bg-sky-700 border-sky-700 text-white font-black'
              }`}
            >
              {isCardFlipped ? emoji : '❓'}
            </button>
          );
        })}
      </div>

      {isWon && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2 animate-bounce">
          <h4 className="text-base font-black text-emerald-900">
            🎉 Super Genius! Round {currentTheme.id} Won! +2 Stars ⭐
          </h4>
          <div className="flex justify-center gap-2 pt-1">
            {themeIdx < MEMORY_THEMES.length - 1 ? (
              <button
                onClick={nextRound}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all"
              >
                Next Memory Round ➡️ (اگلا راؤنڈ)
              </button>
            ) : (
              <button
                onClick={() => {
                  setThemeIdx(0);
                  kidsAudio.playCelebrationFanfare();
                }}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all"
              >
                All 3 Rounds Cleared! Replay 🔄
              </button>
            )}
            <button
              onClick={() => initGame()}
              className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200"
            >
              Replay Round
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   2. BALLOON POP / COLOR MATCH GAME (Wave-Based Rewards)
------------------------------------------------------------------------- */
const BALLOONS = [
  { colorName: 'Red', nameUrdu: 'لال', bg: 'bg-rose-500' },
  { colorName: 'Blue', nameUrdu: 'نیلا', bg: 'bg-sky-500' },
  { colorName: 'Yellow', nameUrdu: 'پیلا', bg: 'bg-amber-400' },
  { colorName: 'Green', nameUrdu: 'سبز', bg: 'bg-emerald-500' },
  { colorName: 'Purple', nameUrdu: 'جامنی', bg: 'bg-purple-500' },
];

const BalloonGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [targetColor, setTargetColor] = useState(BALLOONS[0]);
  const [waveScore, setWaveScore] = useState(0);
  const [waveNumber, setWaveNumber] = useState(1);
  const [isWaveComplete, setIsWaveComplete] = useState(false);
  const [feedback, setFeedback] = useState<string>('Pop 5 matching balloons to finish the wave!');

  const pickNewTarget = () => {
    const next = BALLOONS[Math.floor(Math.random() * BALLOONS.length)];
    setTargetColor(next);
  };

  const handlePop = (balloon: typeof BALLOONS[0]) => {
    if (isWaveComplete) return;

    if (balloon.colorName === targetColor.colorName) {
      kidsAudio.playGameSound('balloon_pop');
      const nextScore = waveScore + 1;
      setWaveScore(nextScore);

      if (nextScore >= 5) {
        setIsWaveComplete(true);
        kidsAudio.playCelebrationFanfare();
        onEarnStar();
        setFeedback(`🎉 Magnificent! Wave ${waveNumber} Complete! +2 Stars ⭐`);
      } else {
        setFeedback(`Super! That's ${balloon.colorName} (${balloon.nameUrdu})! (${nextScore}/5) 🎈`);
        pickNewTarget();
      }
    } else {
      kidsAudio.playGentleRetrySound();
      setFeedback(`That was ${balloon.colorName}. Look for ${targetColor.colorName}! 🌈`);
    }
  };

  const nextWave = () => {
    setWaveNumber((w) => w + 1);
    setWaveScore(0);
    setIsWaveComplete(false);
    setFeedback('Pop 5 matching balloons to finish the wave!');
    pickNewTarget();
    kidsAudio.playPopSound();
  };

  return (
    <div className="space-y-5 text-center max-w-lg mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black mb-1">
          <span>Wave {waveNumber} (Goal: 5 Color Matches)</span>
        </div>
        <h3 className="text-xl font-black text-sky-950">Color Pop Adventure 🎨 (رنگوں کا ایڈونچر)</h3>
        <p className="text-xs font-bold text-sky-700">{feedback}</p>
      </div>

      <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-sky-50 border-2 border-sky-200 rounded-3xl shadow-sm">
        <span className="text-xs font-black text-slate-700">Find & Pop:</span>
        <div className={`w-5 h-5 rounded-full ${targetColor.bg} border-2 border-white shadow-sm`} />
        <span className="text-base font-black text-sky-950">
          {targetColor.colorName} / {targetColor.nameUrdu}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 py-2">
        {BALLOONS.map((b) => (
          <button
            key={b.colorName}
            onClick={() => handlePop(b)}
            disabled={isWaveComplete}
            className={`w-20 h-24 sm:w-24 sm:h-28 rounded-full ${b.bg} text-white flex flex-col items-center justify-center shadow-lg transform hover:-translate-y-2 active:scale-90 transition-all border-2 border-white`}
          >
            <span className="text-2xl">🎈</span>
            <span className="text-[11px] font-black">{b.colorName}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 text-xs font-black text-slate-600 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
        <span>Wave Progress: {waveScore} / 5</span>
        {isWaveComplete && (
          <button
            onClick={nextWave}
            className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl shadow-md font-bold active:scale-95"
          >
            Next Wave ➡️
          </button>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   3. COUNTING GAME
------------------------------------------------------------------------- */
const CountingGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [count, setCount] = useState(4);
  const [emoji, setEmoji] = useState('🍎');
  const [feedback, setFeedback] = useState('How many do you see?');

  const generateRound = () => {
    const emojis = ['🍎', '⭐', '🦁', '🚀', '🐬', '🌸'];
    const nextEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const nextCount = Math.floor(Math.random() * 6) + 1;
    setCount(nextCount);
    setEmoji(nextEmoji);
    setFeedback('How many do you see?');
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleGuess = (val: number) => {
    if (val === count) {
      kidsAudio.playRewardChime();
      setFeedback(`Correct! Exactly ${count}! +1 Star ⭐`);
      onEarnStar();
      setTimeout(generateRound, 1200);
    } else {
      kidsAudio.playGentleRetrySound();
      setFeedback(`Count one by one gently. Try again!`);
    }
  };

  return (
    <div className="space-y-6 text-center max-w-md mx-auto">
      <div>
        <h3 className="text-xl font-black text-sky-950">Number Counting Safari</h3>
        <p className="text-xs font-bold text-sky-700">{feedback}</p>
      </div>

      <div className="min-h-28 bg-sky-50 rounded-3xl p-6 border-2 border-sky-200 flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className="text-4xl sm:text-5xl animate-bounce">
            {emoji}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-2">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleGuess(num)}
            className="py-3 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-black text-xl rounded-2xl shadow-md transition-all border-2 border-sky-700"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   4. RHYTHM & XYLOPHONE GAME
------------------------------------------------------------------------- */
const NOTES = [
  { note: 'Do', freq: 261.63, color: 'bg-rose-500' },
  { note: 'Re', freq: 293.66, color: 'bg-orange-500' },
  { note: 'Mi', freq: 329.63, color: 'bg-amber-500' },
  { note: 'Fa', freq: 349.23, color: 'bg-emerald-500' },
  { note: 'Sol', freq: 392.0, color: 'bg-teal-500' },
  { note: 'La', freq: 440.0, color: 'bg-sky-500' },
  { note: 'Ti', freq: 493.88, color: 'bg-indigo-500' },
  { note: 'High Do', freq: 523.25, color: 'bg-purple-500' },
];

const RhythmGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [tapCount, setTapCount] = useState(0);

  const handlePlayKey = (freq: number) => {
    kidsAudio.playMusicNote(freq);
    setTapCount((c) => {
      const next = c + 1;
      if (next === 10) {
        kidsAudio.playRewardChime();
        onEarnStar();
      }
      return next;
    });
  };

  return (
    <div className="space-y-6 text-center max-w-lg mx-auto">
      <div>
        <h3 className="text-xl font-black text-sky-950">Wonder Rainbow Xylophone</h3>
        <p className="text-xs font-bold text-sky-700">
          Tap colorful keys to play sweet melodies! Tap 10 keys for a musical star! 🎵
        </p>
      </div>

      <div className="flex justify-center items-end gap-1.5 sm:gap-2 h-48 bg-slate-100 p-4 rounded-3xl border-2 border-slate-300">
        {NOTES.map((n, i) => (
          <button
            key={n.note}
            onClick={() => handlePlayKey(n.freq)}
            style={{ height: `${65 + i * 4}%` }}
            className={`flex-1 rounded-2xl ${n.color} text-white font-black text-xs flex flex-col justify-end pb-3 shadow-md hover:opacity-90 active:scale-95 transition-transform`}
          >
            <span>{n.note}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   5. PATTERN & SEQUENCE GAME (THINK)
------------------------------------------------------------------------- */
const PATTERNS = [
  { sequence: ['🍎', '🍌', '🍎', '🍌'], answer: '🍎', choices: ['🍎', '🍇', '🍌'] },
  { sequence: ['🔴', '🔵', '🔴', '🔵'], answer: '🔴', choices: ['🟢', '🔴', '🟡'] },
  { sequence: ['⭐', '🌙', '⭐', '🌙'], answer: '⭐', choices: ['☀️', '🌙', '⭐'] },
];

const PatternGame: React.FC<{ onEarnStar: () => void }> = ({ onEarnStar }) => {
  const [pIndex, setPIndex] = useState(0);
  const [feedback, setFeedback] = useState('What comes next in the sequence?');
  const activePattern = PATTERNS[pIndex];

  const handlePick = (choice: string) => {
    if (choice === activePattern.answer) {
      kidsAudio.playRewardChime();
      setFeedback('Awesome logic! +1 Star ⭐');
      onEarnStar();
      setTimeout(() => {
        setPIndex((i) => (i + 1) % PATTERNS.length);
        setFeedback('What comes next in the sequence?');
      }, 1000);
    } else {
      kidsAudio.playGentleRetrySound();
      setFeedback('Look closely at the pattern order!');
    }
  };

  return (
    <div className="space-y-6 text-center max-w-md mx-auto">
      <div>
        <h3 className="text-xl font-black text-sky-950">Think & Sequence Puzzle</h3>
        <p className="text-xs font-bold text-sky-700">{feedback}</p>
      </div>

      <div className="flex items-center justify-center gap-3 bg-sky-50 p-6 rounded-3xl border-2 border-sky-200">
        {activePattern.sequence.map((item, idx) => (
          <span key={idx} className="text-3xl sm:text-4xl">
            {item}
          </span>
        ))}
        <span className="w-12 h-12 bg-white border-2 border-dashed border-sky-400 rounded-2xl flex items-center justify-center text-xl font-black text-sky-800">
          ?
        </span>
      </div>

      <div className="flex justify-center gap-4">
        {activePattern.choices.map((c, i) => (
          <button
            key={i}
            onClick={() => handlePick(c)}
            className="w-16 h-16 rounded-2xl bg-white hover:bg-sky-50 border-2 border-sky-200 text-3xl shadow-md active:scale-90 transition-transform"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};
