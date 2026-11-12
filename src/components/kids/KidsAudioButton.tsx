import React, { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { kidsAudio, KidsVoiceLang } from '../../services/kidsAudio';

interface KidsAudioButtonProps {
  item?: any; // Auto-detects animals and multi-language
  textToSpeak?: string;
  lang?: KidsVoiceLang;
  audioUrl?: string | null;
  soundType?: 'animal' | 'chime' | 'pop' | 'retry' | 'celebration';
  animalName?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const KidsAudioButton: React.FC<KidsAudioButtonProps> = ({
  item,
  textToSpeak,
  lang,
  audioUrl,
  soundType,
  animalName,
  label = 'Listen',
  size = 'md',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying || isLoading) return;

    if (kidsAudio.getMuted()) {
      kidsAudio.setMuted(false);
    }

    // 1. If full item is passed (Future-proof Auto Audio)
    if (item) {
      setIsPlaying(true);
      await kidsAudio.playItemAudio(item);
      setIsPlaying(false);
      return;
    }

    // 2. Direct MP3 URL
    if (audioUrl) {
      try {
        setIsLoading(true);
        const audio = new Audio(audioUrl);
        audio.oncanplaythrough = () => {
          setIsLoading(false);
          setIsPlaying(true);
          audio.play().catch(() => setIsPlaying(false));
        };
        audio.onended = () => {
          setIsPlaying(false);
        };
        audio.onerror = () => {
          setIsLoading(false);
          setIsPlaying(false);
          if (textToSpeak) {
            kidsAudio.speakWord(textToSpeak, lang);
          } else {
            kidsAudio.playRewardChime();
          }
        };
        return;
      } catch {
        setIsLoading(false);
      }
    }

    // 3. Animal Sound
    if (soundType === 'animal' || animalName) {
      const targetAnimal = animalName || textToSpeak || 'animal';
      kidsAudio.playAnimalSound(targetAnimal);
      if (textToSpeak) {
        setIsPlaying(true);
        setTimeout(async () => {
          await kidsAudio.speakWord(textToSpeak, lang);
          setIsPlaying(false);
        }, 400);
      }
      return;
    }

    if (soundType === 'celebration') {
      kidsAudio.playCelebrationFanfare();
      return;
    }

    if (soundType === 'retry') {
      kidsAudio.playGentleRetrySound();
      return;
    }

    // 4. Multilingual Speech
    if (textToSpeak) {
      setIsPlaying(true);
      await kidsAudio.speakWord(textToSpeak, lang);
      setIsPlaying(false);
    } else {
      kidsAudio.playPopSound();
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1 rounded-xl',
    md: 'px-3 py-1.5 text-xs sm:text-sm gap-1.5 rounded-2xl',
    lg: 'px-4 py-2 text-sm sm:text-base gap-2 rounded-2xl font-bold',
  }[size];

  return (
    <button
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center font-bold transition-all shadow-sm active:scale-95 border ${
        isPlaying
          ? 'bg-sky-600 text-white border-sky-700 ring-2 ring-sky-300 animate-pulse'
          : 'bg-sky-50 hover:bg-sky-100 text-sky-900 border-sky-200'
      } ${sizeClasses} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 animate-bounce" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-sky-700" />
      )}
      {label && <span>{isPlaying ? 'Playing...' : label}</span>}
    </button>
  );
};
