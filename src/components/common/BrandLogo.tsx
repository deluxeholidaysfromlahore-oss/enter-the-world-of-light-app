import React from 'react';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'splash';
  showText?: boolean;
  showTaglines?: boolean;
  inverted?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  showTaglines = false,
  inverted = false,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    splash: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  const textSizes = {
    xs: 'text-sm font-bold tracking-tight',
    sm: 'text-base sm:text-lg font-extrabold tracking-tight',
    md: 'text-lg sm:text-xl font-black tracking-tight',
    lg: 'text-2xl sm:text-3xl font-black tracking-tight',
    splash: 'text-3xl sm:text-4xl font-black text-center tracking-tight',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${size === 'splash' ? 'flex-col justify-center' : ''} ${className}`}
    >
      {/* Brand Icon SVG: Sunburst of Light, Radiant Rays, Open Book of Learning & Laughter */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 rounded-2xl flex items-center justify-center p-1.5 shadow-sm transition-transform hover:scale-105 ${
          inverted
            ? 'bg-white/10 ring-1 ring-white/20'
            : 'bg-gradient-to-tr from-sky-500 via-sky-400 to-amber-300 shadow-sky-500/20 ring-1 ring-sky-400/30'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Radiant Sun Corona */}
          <circle cx="50" cy="50" r="32" fill="#FDE047" />
          <circle cx="50" cy="50" r="28" fill="#F59E0B" />
          <circle cx="50" cy="50" r="24" fill="#FBBF24" />

          {/* Surrounding Sunrays */}
          <g stroke="#FDE047" strokeWidth="4.5" strokeLinecap="round" opacity="0.95">
            <line x1="50" y1="8" x2="50" y2="16" />
            <line x1="50" y1="84" x2="50" y2="92" />
            <line x1="8" y1="50" x2="16" y2="50" />
            <line x1="84" y1="50" x2="92" y2="50" />
            <line x1="20" y1="20" x2="26" y2="26" />
            <line x1="74" y1="74" x2="80" y2="80" />
            <line x1="20" y1="80" x2="26" y2="74" />
            <line x1="74" y1="26" x2="80" y2="20" />
          </g>

          {/* Open Wings / Open Book Motif */}
          <path
            d="M26 62C34 54 44 55 50 60C56 55 66 54 74 62C67 72 57 71 50 67C43 71 33 72 26 62Z"
            fill="#FFFFFF"
            opacity="0.98"
          />

          {/* Joyful Laughter Smile Arc */}
          <path
            d="M38 48C42 54 58 54 62 48"
            stroke="#0F172A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Spark of Wisdom / Star of Dawn */}
          <circle cx="50" cy="34" r="3.5" fill="#FFFFFF" />
          <circle cx="36" cy="40" r="2" fill="#FFFFFF" />
          <circle cx="64" cy="40" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      {showText && (
        <div className={`leading-tight ${size === 'splash' ? 'text-center' : ''}`}>
          <div
            className={`font-sans ${textSizes[size]} ${
              inverted ? 'text-white' : 'text-slate-900'
            }`}
          >
            <span className="hidden md:inline">Enter the </span>
            <span className="hidden sm:inline">World of </span>
            <span className="text-sky-600">Light</span>
            <span className="text-amber-500 font-semibold"> & </span>
            <span className="text-amber-600">Laughter</span>
          </div>

          {showTaglines && (
            <div className="mt-2.5 space-y-1">
              <p className="text-sm sm:text-base font-bold tracking-wide text-sky-800">
                Learn • Play • Practice
              </p>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Read • Listen • Explore
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
