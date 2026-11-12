import React, { useRef, useState, useEffect } from 'react';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Palette,
  Eraser,
  Star,
} from 'lucide-react';
import { KidsPracticeItem } from '../../types/kids';
import { kidsAudio } from '../../services/kidsAudio';
import { kidsStorage } from '../../services/kidsStorage';
import { KidsAudioButton } from './KidsAudioButton';

interface KidsTracingCanvasProps {
  items: KidsPracticeItem[];
  onEarnStar: () => void;
}

export const KidsTracingCanvas: React.FC<KidsTracingCanvasProps> = ({
  items,
  onEarnStar,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [strokeColor, setStrokeColor] = useState('#0284c7'); // sky-600
  const [isDrawing, setIsDrawing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Filter items by category
  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'english') return item.type === 'abc';
    if (selectedCategory === 'urdu') return item.type === 'urdu';
    if (selectedCategory === 'number') return item.type === 'number';
    if (selectedCategory === 'shape') return item.type === 'shape' || item.type === 'nature';
    return true;
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetCellsRef = useRef<{ [key: string]: boolean }>({});
  const coveredCellsRef = useRef<Set<string>>(new Set());
  const activeItem = filteredItems[currentIndex] || filteredItems[0] || items[0];

  const colors = ['#0284c7', '#3b82f6', '#10b981', '#a855f7', '#ec4899', '#f59e0b'];

  const GRID_SIZE = 36; // 36x36 grid for fine-grained accurate spatial coverage

  // Analyze letter path on offscreen canvas to find exact target regions
  const calculateTargetCells = (width: number, height: number) => {
    try {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.fillStyle = '#ffffff';
      offCtx.fillRect(0, 0, width, height);

      offCtx.font =
        activeItem.type === 'urdu'
          ? 'bold 150px "Noto Nastaliq Urdu", serif'
          : 'bold 170px sans-serif';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillStyle = '#000000';
      offCtx.fillText(
        activeItem.char,
        width / 2,
        height / 2 + (activeItem.type === 'urdu' ? -15 : 10)
      );

      const imgData = offCtx.getImageData(0, 0, width, height).data;
      const targets: { [key: string]: boolean } = {};

      const cellW = width / GRID_SIZE;
      const cellH = height / GRID_SIZE;

      for (let cy = 0; cy < GRID_SIZE; cy++) {
        for (let cx = 0; cx < GRID_SIZE; cx++) {
          // Check pixel samples inside this fine grid cell
          let blackPixelCount = 0;
          const startX = Math.floor(cx * cellW);
          const startY = Math.floor(cy * cellH);

          for (let py = startY; py < startY + cellH; py += 2) {
            for (let px = startX; px < startX + cellW; px += 2) {
              const idx = (py * width + px) * 4;
              const r = imgData[idx];
              if (r < 110) {
                blackPixelCount++;
              }
            }
          }

          if (blackPixelCount >= 2) {
            targets[`${cx}_${cy}`] = true;
          }
        }
      }

      targetCellsRef.current = targets;
      coveredCellsRef.current = new Set();
    } catch {
      targetCellsRef.current = {};
    }
  };

  const drawGuide = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Notebook guideline dashes
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);

    ctx.beginPath();
    ctx.moveTo(30, canvas.height * 0.25);
    ctx.lineTo(canvas.width - 30, canvas.height * 0.25);
    ctx.moveTo(30, canvas.height * 0.5);
    ctx.lineTo(canvas.width - 30, canvas.height * 0.5);
    ctx.moveTo(30, canvas.height * 0.75);
    ctx.lineTo(canvas.width - 30, canvas.height * 0.75);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.font =
      activeItem.type === 'urdu'
        ? 'bold 160px "Noto Nastaliq Urdu", serif'
        : 'bold 180px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Soft letter background
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(
      activeItem.char,
      canvas.width / 2,
      canvas.height / 2 + (activeItem.type === 'urdu' ? -15 : 10)
    );

    // Dashed guide border
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 8]);
    ctx.strokeText(
      activeItem.char,
      canvas.width / 2,
      canvas.height / 2 + (activeItem.type === 'urdu' ? -15 : 10)
    );
    ctx.setLineDash([]);

    // Initialize spatial targets
    calculateTargetCells(canvas.width, canvas.height);
  };

  useEffect(() => {
    setProgressPercent(0);
    setIsCompleted(false);
    drawGuide();

    // Track in recently viewed
    kidsStorage.addRecentlyViewed({
      contentId: activeItem.id,
      title: `${activeItem.name} (${activeItem.char})`,
      titleUrdu: activeItem.nameUrdu,
      category: 'Practice',
      type: 'practice',
      emoji: activeItem.exampleEmoji,
    });
  }, [currentIndex, activeItem]);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const milestoneSpokenRef = useRef<boolean>(false);

  const recordCoverage = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const totalTargets = Object.keys(targetCellsRef.current).length;
    if (totalTargets === 0) return;

    // Check cells surrounding brush tip with fine precision (radius of 10px)
    const brushRadius = 11;
    const cellW = canvas.width / GRID_SIZE;
    const cellH = canvas.height / GRID_SIZE;

    for (let dx = -brushRadius; dx <= brushRadius; dx += 5) {
      for (let dy = -brushRadius; dy <= brushRadius; dy += 5) {
        const cx = Math.floor((x + dx) / cellW);
        const cy = Math.floor((y + dy) / cellH);
        const key = `${cx}_${cy}`;

        if (targetCellsRef.current[key]) {
          coveredCellsRef.current.add(key);
        }
      }
    }

    const currentCovered = coveredCellsRef.current.size;
    const rawPct = Math.round((currentCovered / totalTargets) * 100);
    const capped = Math.min(100, rawPct);
    setProgressPercent(capped);

    // Optional milestone encouragement at 50%
    if (capped >= 50 && !milestoneSpokenRef.current && !isCompleted) {
      milestoneSpokenRef.current = true;
      kidsAudio.playRewardChime();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    recordCoverage(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();

    recordCoverage(x, y);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);

    // Accurate completion requires at least 88% (~90%) of target stroke path traced
    if (progressPercent >= 88 && !isCompleted) {
      setIsCompleted(true);
      kidsAudio.playCelebrationFanfare();
      onEarnStar();

      kidsStorage.updateContinueLearning({
        contentId: activeItem.id,
        title: `Tracing ${activeItem.name}`,
        titleUrdu: activeItem.nameUrdu,
        category: 'Practice',
        section: 'practice',
        progressPercent: 100,
        emoji: activeItem.exampleEmoji,
      });
    }
  };

  const handleClear = () => {
    drawGuide();
    setProgressPercent(0);
    setIsCompleted(false);
    milestoneSpokenRef.current = false;
    kidsAudio.playPopSound();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    kidsAudio.playPopSound();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    kidsAudio.playPopSound();
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border-2 border-sky-200 space-y-4 max-w-2xl mx-auto">
      {/* Category Filter Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center">
        {[
          { id: 'all', label: 'All Items (سب)', icon: '✨' },
          { id: 'english', label: 'English ABC', icon: '🔤' },
          { id: 'urdu', label: 'Urdu Haroof', icon: '📖' },
          { id: 'number', label: 'Numbers 1-10', icon: '🔢' },
          { id: 'shape', label: 'Shapes & Nature', icon: '🔺' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentIndex(0);
              kidsAudio.playPopSound();
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 shrink-0 border transition-all ${
              selectedCategory === cat.id
                ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Top Practice Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          aria-label="Previous item"
          className="p-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 active:scale-95 transition-all shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center space-y-0.5">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">{activeItem.exampleEmoji}</span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {activeItem.name}
            </h3>
            <span className="text-xl sm:text-2xl font-urdu font-bold text-sky-900">
              {activeItem.nameUrdu}
            </span>
            <button
              onClick={() => {
                kidsAudio.playItemAudio({
                  title: activeItem.name,
                  titleUrdu: activeItem.nameUrdu,
                  pronunciation: activeItem.guideHint,
                });
              }}
              className="p-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors"
              title="Hear Pronunciation & Guide"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            </button>
          </div>
          <p className="text-xs font-bold text-slate-500">
            {activeItem.guideHint}
          </p>
        </div>

        <button
          onClick={handleNext}
          aria-label="Next item"
          className="p-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 active:scale-95 transition-all shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Real-time Tracing Coverage Progress Bar */}
      <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between text-xs font-black">
          <span className="text-slate-700 flex items-center gap-1.5">
            <span>Tracing Accuracy & Coverage:</span>
            {isCompleted && <span className="text-emerald-600">✓ Done!</span>}
          </span>
          <span className={progressPercent >= 65 ? 'text-emerald-600' : 'text-sky-700'}>
            {progressPercent}% {progressPercent >= 65 ? '🎉 (Ready!)' : '(Keep filling)'}
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-150 ${
              progressPercent >= 65
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                : 'bg-gradient-to-r from-sky-400 to-blue-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-500">
          💡 Trace across the whole letter. When you reach 65%+, lift your finger to complete!
        </p>
      </div>

      {/* Main Drawing Canvas Container */}
      <div className="relative rounded-3xl overflow-hidden border-3 border-sky-200 bg-white shadow-inner flex items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          width={400}
          height={320}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="touch-none cursor-crosshair max-w-full rounded-2xl bg-white"
        />

        {/* Completion Celebration Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-[2px] rounded-3xl flex items-center justify-center pointer-events-none animate-in fade-in">
            <div className="bg-white/95 px-6 py-4 rounded-3xl shadow-2xl border-3 border-emerald-400 text-center space-y-1 animate-bounce pointer-events-auto">
              <div className="flex items-center justify-center gap-1 text-amber-400">
                <Star className="w-6 h-6 fill-amber-400" />
                <Star className="w-7 h-7 fill-amber-400" />
                <Star className="w-6 h-6 fill-amber-400" />
              </div>
              <h4 className="text-lg font-black text-emerald-900">
                Splendid Tracing! +1 Star ⭐
              </h4>
              <p className="text-xs font-bold text-slate-600">
                You mastered the letter {activeItem.char}!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tool Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Color Palette Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
          <Palette className="w-4 h-4 text-slate-500 ml-1" />
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => {
                setStrokeColor(c);
                kidsAudio.playPopSound();
              }}
              style={{ backgroundColor: c }}
              className={`w-7 h-7 rounded-xl transition-all ${
                strokeColor === c ? 'ring-3 ring-sky-300 scale-110 shadow-sm' : 'opacity-80 hover:opacity-100'
              }`}
            />
          ))}
        </div>

        {/* Pronunciation & Clear Actions */}
        <div className="flex items-center gap-2">
          <KidsAudioButton
            textToSpeak={`${activeItem.name}. ${activeItem.char}. ${activeItem.exampleWord}`}
            lang={activeItem.type === 'urdu' ? 'ur' : 'en'}
            label="Phonics"
            size="sm"
          />

          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors active:scale-95 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
};
