import React from 'react';
import {
  Youtube,
  BookOpen,
  Instagram,
  Facebook,
  Pin,
  AtSign,
  Twitter,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { BRAND_LINKS } from '../../data/mockData';

interface SocialLinksProps {
  layout?: 'grid' | 'row' | 'cards';
  showDescriptions?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  layout = 'cards',
  showDescriptions = true,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'YouTube':
        return <Youtube className="w-5 h-5 text-red-600" />;
      case 'Blog':
        return <BookOpen className="w-5 h-5 text-amber-600" />;
      case 'Instagram':
        return <Instagram className="w-5 h-5 text-pink-600" />;
      case 'Facebook':
        return <Facebook className="w-5 h-5 text-blue-600" />;
      case 'Pinterest':
        return <Pin className="w-5 h-5 text-red-600" />;
      case 'Threads':
        return <AtSign className="w-5 h-5 text-slate-800" />;
      case 'X (Twitter)':
        return <Twitter className="w-5 h-5 text-slate-900" />;
      case 'WhatsApp Channel':
        return <MessageCircle className="w-5 h-5 text-emerald-600" />;
      default:
        return <ExternalLink className="w-5 h-5 text-slate-600" />;
    }
  };

  if (layout === 'row') {
    return (
      <div className="flex flex-wrap items-center gap-2.5">
        {BRAND_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${link.name} - Enter the World of Light`}
            className="p-3 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 hover:shadow-md text-slate-700 transition-all hover:scale-105 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {getIcon(link.name)}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {BRAND_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 hover:shadow-lg transition-all flex items-start gap-3.5"
        >
          <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-sky-50 transition-colors shrink-0 border border-slate-100">
            {getIcon(link.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                {link.name}
              </span>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors shrink-0" />
            </div>
            {showDescriptions && (
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                {link.description}
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};
