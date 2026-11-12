import React from 'react';
import {
  Bell,
  X,
  Check,
  CheckCheck,
  Trash2,
  Sparkles,
  BookOpen,
  Trophy,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { KidsNotificationItem } from '../../types/kids';
import { kidsAudio } from '../../services/kidsAudio';

interface KidsNotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: KidsNotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClear: (id: string) => void;
  onSelectAction?: (notif: KidsNotificationItem) => void;
}

export const KidsNotificationsModal: React.FC<KidsNotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClear,
  onSelectAction,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIconForType = (type: string, fallback: string) => {
    switch (type) {
      case 'story':
        return <BookOpen className="w-5 h-5 text-sky-600" />;
      case 'quest':
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'streak':
        return <Flame className="w-5 h-5 text-orange-500" />;
      case 'parent':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      default:
        return <span className="text-xl">{fallback}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-3 border-sky-300 space-y-4 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sky-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-inner">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-sky-950">
                  Kids Announcements
                </h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-sky-500 text-white rounded-full text-[10px] font-black">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <p className="text-xs text-sky-700 font-bold">
                محفوظ اعلانات اور تعلیمی یاد دہانی
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={() => {
                  kidsAudio.playPopSound();
                  onMarkAllAsRead();
                }}
                className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 px-2.5 py-1 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Read all</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {notifications.length === 0 ? (
            <div className="text-center py-12 space-y-2 text-slate-400">
              <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center mx-auto text-2xl">
                🌟
              </div>
              <h4 className="text-sm font-black text-slate-700">All caught up!</h4>
              <p className="text-xs text-slate-500">
                You have no active alerts right now. Enjoy learning!
              </p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  if (!n.read) onMarkAsRead(n.id);
                  if (onSelectAction) onSelectAction(n);
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  n.read
                    ? 'bg-slate-50/70 border-slate-200 opacity-80'
                    : 'bg-sky-50/80 border-sky-300 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-sky-200 flex items-center justify-center shrink-0 shadow-sm">
                    {getIconForType(n.type, n.icon)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">
                        {n.title}
                      </h4>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-sky-500" />
                      )}
                    </div>
                    <p className="text-[11px] font-urdu font-bold text-sky-800">
                      {n.titleUrdu}
                    </p>
                    <p className="text-xs text-slate-600 leading-snug">
                      {n.message}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 block pt-0.5">
                      {n.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 pt-1">
                  {!n.read && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        kidsAudio.playPopSound();
                        onMarkAsRead(n.id);
                      }}
                      className="p-1 text-sky-600 hover:text-sky-800 hover:bg-sky-100 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      kidsAudio.playPopSound();
                      onClear(n.id);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Dismiss"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 text-center text-[11px] text-slate-500 font-bold border-t border-sky-100">
          🛡️ Safe Announcements • No commercial ads or external trackers
        </div>
      </div>
    </div>
  );
};
