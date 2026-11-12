import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { kidsAudio } from '../../services/kidsAudio';

interface KidsAudioPlayerProps {
  audioUrl?: string | null;
  audioTitle: string;
  voiceTextFallback?: string;
  voiceLang?: 'en' | 'ur';
  onEnded?: () => void;
  autoPlay?: boolean;
  loop?: boolean;
}

export const KidsAudioPlayer: React.FC<KidsAudioPlayerProps> = ({
  audioUrl,
  audioTitle,
  voiceTextFallback,
  voiceLang = 'en',
  onEnded,
  autoPlay = false,
  loop = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(kidsAudio.getMuted());
  const [isSpeakingFallback, setIsSpeakingFallback] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setHasError(false);

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.volume = volume;
      audio.loop = loop;

      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        setIsLoading(false);
      };
      const handleEnded = () => {
        setIsPlaying(false);
        if (onEnded) onEnded();
      };
      const handleError = () => {
        setIsLoading(false);
        setHasError(true);
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      if (autoPlay) {
        setIsLoading(true);
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsLoading(false));
      }

      return () => {
        audio.pause();
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [audioUrl, autoPlay, loop]);

  const handlePlayPause = async () => {
    if (audioUrl && audioRef.current && !hasError) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          setIsLoading(true);
          await audioRef.current.play();
          setIsLoading(false);
          setIsPlaying(true);
        } catch {
          setIsLoading(false);
          setHasError(true);
        }
      }
      return;
    }

    // Fallback: Voice narration
    if (voiceTextFallback) {
      if (isSpeakingFallback) {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        setIsSpeakingFallback(false);
      } else {
        setIsSpeakingFallback(true);
        await kidsAudio.speakWord(voiceTextFallback, voiceLang);
        setIsSpeakingFallback(false);
        if (onEnded) onEnded();
      }
    } else {
      kidsAudio.playRewardChime();
    }
  };

  const handleReplay = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true));
    } else if (voiceTextFallback) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeakingFallback(true);
      kidsAudio.speakWord(voiceTextFallback, voiceLang).then(() => {
        setIsSpeakingFallback(false);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    kidsAudio.setMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || sec <= 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-sky-50 border-2 border-sky-200 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
      {/* Top Title & Mode Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-sky-950 line-clamp-1">
              {audioTitle}
            </h4>
            <p className="text-[11px] font-bold text-sky-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-500" />
              {audioUrl ? 'Official MP3 Narration' : 'Clear Voice Audio & Pronunciation'}
            </p>
          </div>
        </div>

        <button
          onClick={toggleMute}
          className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-colors ${
            isMuted
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
          }`}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isMuted ? 'Muted' : 'Sound On'}</span>
        </button>
      </div>

      {/* Progress slider if duration is known */}
      {duration > 0 && (
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <div className="flex justify-between text-[11px] font-bold text-sky-800">
            <span>{formatSeconds(currentTime)}</span>
            <span>{formatSeconds(duration)}</span>
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePlayPause}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm transition-transform"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isPlaying || isSpeakingFallback ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white" />
            )}
            <span>
              {isPlaying || isSpeakingFallback ? 'Pause Narration' : 'Listen Now'}
            </span>
          </button>

          <button
            onClick={handleReplay}
            className="p-2.5 bg-white hover:bg-sky-50 text-sky-900 border border-sky-200 rounded-2xl transition-colors shadow-sm"
            title="Replay from start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {hasError && (
          <div className="text-xs text-slate-500 font-bold flex items-center gap-1">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>Using Clear Voice Narration</span>
          </div>
        )}
      </div>
    </div>
  );
};
