import React from 'react';
import { X, Flame, Sparkles, BookOpen, Bell, CheckCircle2 } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDaily: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onNavigateToDaily,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: "Today's Couplet of Light Released!",
      subtitle: 'Allama Iqbal on self-discovery & confidence',
      time: '15m ago',
      unread: true,
      icon: Sparkles,
      iconBg: 'bg-amber-100 text-amber-700',
    },
    {
      id: '2',
      title: 'Streak Alert: 7-Day Flame Kept Alive! 🔥',
      subtitle: 'Complete today’s practice challenge to reach 8 days.',
      time: '2h ago',
      unread: true,
      icon: Flame,
      iconBg: 'bg-orange-100 text-orange-600',
    },
    {
      id: '3',
      title: 'New Story Added: The Brave Firefly',
      subtitle: 'A sweet moral bedtime story for young readers & families.',
      time: 'Yesterday',
      unread: false,
      icon: BookOpen,
      iconBg: 'bg-sky-100 text-sky-600',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-end p-3 sm:p-6 sm:pt-20 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-sky-600" />
            <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 divide-y divide-slate-100 max-h-[70vh] overflow-y-auto">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                onClick={() => {
                  onNavigateToDaily();
                  onClose();
                }}
                className="p-3 hover:bg-slate-50 rounded-2xl cursor-pointer transition-colors flex items-start gap-3"
              >
                <div className={`p-2 rounded-xl shrink-0 ${n.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {n.title}
                    </p>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {n.subtitle}
                  </p>
                </div>
                {n.unread && (
                  <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0 mt-1.5" />
                )}
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={() => {
              onNavigateToDaily();
              onClose();
            }}
            className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-colors"
          >
            View Daily Learning Feed
          </button>
        </div>
      </div>
    </div>
  );
};
