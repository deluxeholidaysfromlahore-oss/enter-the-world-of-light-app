import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ThumbsUp,
  ExternalLink,
} from 'lucide-react';
import { ContentItem } from '../../types';

interface VideoPlayerModalProps {
  item: ContentItem | null;
  onClose: () => void;
  onOpenRelated?: (item: ContentItem) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  item,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState(1280);
  const [hasLiked, setHasLiked] = useState(false);

  if (!item) return null;

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 text-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-800">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <span className="text-sky-400 font-bold">{item.category}</span>
            <span aria-hidden="true">·</span>
            <span>Enter the World of Light</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mock Video Canvas Area */}
        <div className="relative aspect-video w-full bg-slate-950 flex flex-col justify-between p-6 sm:p-8 overflow-hidden">
          {/* Animated Background Atmosphere */}
          <div
            className={`absolute inset-0 bg-gradient-to-tr ${
              item.gradient || 'from-sky-700 via-indigo-900 to-slate-950'
            } opacity-80`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-black/80" />

          {/* Center Play Indicator */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-sky-500/95 hover:bg-sky-400 text-white flex items-center justify-center shadow-xl shadow-sky-500/30 hover:scale-105 transition-all mb-4"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              )}
            </button>
            <p className="text-sm sm:text-base font-bold text-slate-200">
              {isPlaying ? 'Playing Preview Stream' : 'Video Paused'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              High Definition 1080p • Crystal Clear Audio
            </p>
          </div>

          {/* Bottom Player Controls Overlay */}
          <div className="relative z-10 bg-slate-950/80 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-2.5">
            {/* Scrubber Bar */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div className="bg-sky-400 h-full w-2/5 rounded-full" />
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <span className="font-mono text-xs text-slate-400">
                  03:42 / {item.duration || '12:00'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-2.5 py-0.5 rounded bg-white/10 text-white font-mono font-bold">
                  HD
                </span>
                <button className="hover:text-white">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info & Description */}
        <div className="p-6 sm:p-8 bg-slate-900 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              {item.titleUrdu && (
                <p className="font-urdu text-xl text-amber-300 leading-normal font-bold">
                  {item.titleUrdu}
                </p>
              )}
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {item.title}
              </h2>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                <span>{item.views || '12.4K'} views</span>
                <span aria-hidden="true">·</span>
                <span>Published on World of Light</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                  hasLiked
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{likes.toLocaleString()}</span>
              </button>

              <a
                href="https://www.youtube.com/@EntertheWorldofLight"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm"
              >
                <span>YouTube Channel</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-sm text-slate-300 leading-relaxed font-normal">
            {item.description}
          </div>
        </div>
      </div>
    </div>
  );
};
