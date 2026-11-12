import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  titleUrdu?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  titleUrdu,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 ${className}`}>
      <div className="space-y-1.5">
        {kicker && (
          <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-sky-700">
            {kicker}
          </p>
        )}
        <div className="flex flex-wrap items-baseline gap-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>
          {titleUrdu && (
            <span className="font-urdu text-xl sm:text-2xl text-slate-700 font-bold leading-normal">
              {titleUrdu}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-sky-600 hover:text-sky-700 transition-colors shrink-0 group self-start sm:self-end pt-1"
        >
          <span>{actionText}</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      )}
    </div>
  );
};
