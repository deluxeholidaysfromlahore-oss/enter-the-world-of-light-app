import React from 'react';
import { BookOpen, Play, Clock, Heart, ArrowRight } from 'lucide-react';
import { ContentItem } from '../../types';

interface ContentCardProps {
  item: ContentItem;
  onClick: (item: ContentItem) => void;
  onFavorite?: (item: ContentItem) => void;
  isFavorited?: boolean;
  variant?: 'standard' | 'compact' | 'featured' | 'poetry';
}

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  onClick,
  onFavorite,
  isFavorited = false,
  variant = 'standard',
}) => {
  if (variant === 'poetry') {
    return (
      <div
        onClick={() => onClick(item)}
        className="group relative flex flex-col justify-between p-6 sm:p-7 bg-white rounded-2xl border border-stone-200/90 hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer text-left overflow-hidden poetry-paper"
      >
        <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500 mb-4 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-amber-800">{item.subcategory || item.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-700">{item.author || item.poetName}</span>
          </div>
          {onFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavorite(item);
              }}
              className="p-2 text-stone-400 hover:text-rose-500 rounded-xl hover:bg-stone-100 transition-colors"
              title="Save to favorites"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorited ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Couplet Preview */}
        {item.contentBodyUrdu ? (
          <div className="font-urdu text-xl sm:text-2xl text-stone-900 font-bold text-right leading-loose my-2 px-2 dir-rtl">
            {item.contentBodyUrdu.split('\n').slice(0, 2).join('\n')}
          </div>
        ) : (
          <div className="font-serif italic text-base sm:text-lg text-stone-800 my-2 px-2 line-clamp-3 leading-relaxed">
            {item.contentBody}
          </div>
        )}

        <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
            {item.title}
          </h3>
          <span className="text-xs sm:text-sm text-amber-800 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            <span>Read Couplet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onClick(item)}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xl transition-all cursor-pointer overflow-hidden text-left"
    >
      {/* Visual Cover / Backdrop */}
      <div
        className={`relative h-48 sm:h-52 w-full bg-gradient-to-tr ${
          item.gradient || 'from-sky-600 to-indigo-800'
        } p-5 flex flex-col justify-between text-white overflow-hidden`}
      >
        <div className="flex items-center justify-between z-10">
          <span className="text-xs sm:text-sm font-semibold tracking-wide bg-black/35 px-3 py-1 rounded-full backdrop-blur-xs text-white">
            {item.category}
          </span>
          {onFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavorite(item);
              }}
              className="p-2 rounded-xl bg-black/25 hover:bg-black/50 text-white backdrop-blur-xs transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorited ? 'fill-rose-400 text-rose-400' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Ambient subtle light glow in background */}
        <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-white/20 blur-2xl group-hover:scale-125 transition-transform" />

        <div className="z-10 space-y-1">
          {item.titleUrdu && (
            <p className="font-urdu text-base sm:text-lg text-amber-200 text-right font-bold leading-normal">
              {item.titleUrdu}
            </p>
          )}
          <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-amber-200 transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Zero-Pill Unboxed Metadata with · separator */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2 truncate">
            {item.duration ? (
              <span className="flex items-center gap-1.5 font-mono text-slate-700">
                <Play className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
                {item.duration}
              </span>
            ) : item.readTime ? (
              <span className="flex items-center gap-1.5 text-slate-700">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {item.readTime}
              </span>
            ) : (
              <span className="text-slate-700">{item.level || 'All Levels'}</span>
            )}
            {item.views && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{item.views} views</span>
              </>
            )}
          </div>

          <span className="text-xs sm:text-sm font-bold text-sky-600 group-hover:text-sky-700 inline-flex items-center gap-1 shrink-0">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
