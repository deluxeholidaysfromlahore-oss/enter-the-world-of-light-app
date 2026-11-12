import React, { useRef, useState, useEffect } from 'react';
import {
  Palette,
  Eraser,
  RotateCcw,
  Download,
  Sparkles,
  Sticker,
  Star,
} from 'lucide-react';
import { kidsAudio } from '../../services/kidsAudio';

interface KidsCreateCanvasProps {
  onEarnStar: () => void;
}

export const KidsCreateCanvas: React.FC<KidsCreateCanvasProps> = ({ onEarnStar }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState('#0284c7');
  const [lineWidth, setLineWidth] = useState(8);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [strokesCount, setStrokesCount] = useState(0);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const colors = [
    '#0284c7', // Sky Blue
    '#3b82f6', // Blue
    '#10b981', // Green
    '#a855f7', // Purple
    '#ec4899', // Pink
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#78350f', // Brown
    '#0f172a', // Slate Dark
  ];

  const stickers = ['🦁', '🚀', '⭐', '🌈', '🌸', '🎈', '🐱', '🐘', '🦋', '🍎'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
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

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);

    if (selectedSticker) {
      ctx.font = '48px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedSticker, x, y);
      kidsAudio.playPopSound();
      checkStrokesProgress();
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || selectedSticker) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      checkStrokesProgress();
    }
  };

  const checkStrokesProgress = () => {
    setStrokesCount((c) => {
      const next = c + 1;
      if (next >= 8 && !rewardClaimed) {
        setRewardClaimed(true);
        kidsAudio.playRewardChime();
        onEarnStar();
      }
      return next;
    });
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    kidsAudio.playPopSound();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-kids-masterpiece.png';
    link.href = canvas.toDataURL();
    link.click();
    kidsAudio.playCelebrationFanfare();
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-sky-200 space-y-4 max-w-2xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-sky-950 flex items-center gap-2">
            <span>🎨 Magic Art & Sticker Canvas</span>
          </h3>
          <p className="text-xs font-bold text-sky-700">
            Draw, splash colors, and place cute wonder stickers!
          </p>
        </div>

        {rewardClaimed && (
          <span className="px-3 py-1 bg-sky-50 text-sky-900 border border-sky-200 rounded-full text-xs font-black flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
            <span>Creative Star Unlocked!</span>
          </span>
        )}
      </div>

      {/* Canvas */}
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={520}
          height={340}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full max-w-[520px] h-[300px] sm:h-[340px] rounded-3xl border-4 border-sky-300 shadow-inner bg-white touch-none cursor-crosshair"
        />
      </div>

      {/* Colors & Brush Size in Soft Sky */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-sky-50/70 p-3 rounded-2xl border border-sky-200">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Palette className="w-4 h-4 text-sky-800" />
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setSelectedSticker(null);
                kidsAudio.playPopSound();
              }}
              style={{ backgroundColor: c }}
              className={`w-6 h-6 rounded-full transition-transform ${
                color === c && !selectedSticker ? 'scale-125 ring-2 ring-sky-500 shadow-md' : 'hover:scale-110'
              }`}
            />
          ))}
          <button
            onClick={() => {
              setColor('#ffffff');
              setSelectedSticker(null);
              kidsAudio.playPopSound();
            }}
            className={`p-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 ${
              color === '#ffffff' && !selectedSticker
                ? 'bg-sky-600 text-white'
                : 'bg-white text-slate-700'
            }`}
            title="Eraser"
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
          <span>Brush:</span>
          {[4, 8, 14, 20].map((size) => (
            <button
              key={size}
              onClick={() => {
                setLineWidth(size);
                setSelectedSticker(null);
              }}
              className={`w-6 h-6 rounded-xl border flex items-center justify-center font-black ${
                lineWidth === size && !selectedSticker ? 'bg-sky-600 text-white' : 'bg-white'
              }`}
            >
              <div
                style={{ width: size, height: size }}
                className="bg-current rounded-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Stickers Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-black text-sky-900 shrink-0 flex items-center gap-1">
          <Sticker className="w-3.5 h-3.5 text-sky-600" />
          <span>Stickers:</span>
        </span>
        {stickers.map((stk) => (
          <button
            key={stk}
            onClick={() => {
              setSelectedSticker(selectedSticker === stk ? null : stk);
              kidsAudio.playPopSound();
            }}
            className={`w-9 h-9 rounded-2xl text-xl flex items-center justify-center border-2 transition-all shrink-0 ${
              selectedSticker === stk
                ? 'bg-sky-200 border-sky-500 scale-110 ring-2 ring-sky-300'
                : 'bg-white border-sky-100 hover:bg-sky-50'
            }`}
          >
            {stk}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-1">
        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-black transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Canvas</span>
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-2xl shadow-md transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Save Art! 🖼️</span>
        </button>
      </div>
    </div>
  );
};
