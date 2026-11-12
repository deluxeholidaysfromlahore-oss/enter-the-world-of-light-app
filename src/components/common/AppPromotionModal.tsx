import React, { useState } from 'react';
import {
  Share2,
  X,
  Copy,
  Check,
  QrCode,
  Sparkles,
  Download,
  Smartphone,
  ExternalLink,
  Globe,
  Heart,
  MessageCircle,
} from 'lucide-react';

interface AppPromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppPromotionModal: React.FC<AppPromotionModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'share' | 'qr' | 'install'>('share');

  if (!isOpen) return null;

  const publicAppUrl = 'https://ais-pre-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app';
  const shareTitle = 'Enter the World of Light & Laughter';
  const shareText =
    '🌟 Assalam-o-Alaikum! Explore "Enter the World of Light & Laughter" — an educational app with 3D kids animated phonics, Urdu Qaida, moral stories, and classical Urdu poetry! Free & 100% child safe:\n' +
    publicAppUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicAppUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToPlatform = (platform: 'whatsapp' | 'facebook' | 'twitter' | 'telegram') => {
    const encodedUrl = encodeURIComponent(publicAppUrl);
    const encodedText = encodeURIComponent(shareText);

    let url = '';
    if (platform === 'whatsapp') {
      url = `https://api.whatsapp.com/send?text=${encodedText}`;
    } else if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    } else if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(
        '🌟 Discover Enter the World of Light & Laughter — Kids Urdu Qaida, 3D phonics, moral stories & classical Urdu poetry!'
      )}`;
    } else if (platform === 'telegram') {
      url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Generate a clean QR code URL using standard public QR API for offline/phone scanning
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    publicAppUrl
  )}&bgcolor=ffffff&color=0f172a&margin=10`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-amber-300 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Promote & Share App
              </h3>
              <p className="text-xs text-amber-700 font-bold font-urdu">
                ایپ کو فروغ دیں اور دوستوں کے ساتھ شیئر کریں
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-2xl text-xs font-black">
          <button
            onClick={() => setActiveTab('share')}
            className={`py-2 px-2.5 rounded-xl transition-all ${
              activeTab === 'share' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            Social Share
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`py-2 px-2.5 rounded-xl transition-all ${
              activeTab === 'qr' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            Mobile QR
          </button>
          <button
            onClick={() => setActiveTab('install')}
            className={`py-2 px-2.5 rounded-xl transition-all ${
              activeTab === 'install' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            Install App
          </button>
        </div>

        {/* TAB 1: SOCIAL SHARE */}
        {activeTab === 'share' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Share the app with family, teachers, and WhatsApp groups to promote kids learning and classical Urdu literature!
            </p>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => shareToPlatform('whatsapp')}
                className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-2xl flex items-center gap-2.5 text-emerald-800 font-black text-xs transition-all active:scale-95 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
                  📱
                </div>
                <div className="text-left">
                  <span>WhatsApp</span>
                  <p className="text-[10px] text-emerald-600 font-normal">Groups & Contacts</p>
                </div>
              </button>

              <button
                onClick={() => shareToPlatform('facebook')}
                className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-2xl flex items-center gap-2.5 text-blue-800 font-black text-xs transition-all active:scale-95 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  f
                </div>
                <div className="text-left">
                  <span>Facebook</span>
                  <p className="text-[10px] text-blue-600 font-normal">Feed & Stories</p>
                </div>
              </button>

              <button
                onClick={() => shareToPlatform('twitter')}
                className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl flex items-center gap-2.5 font-black text-xs transition-all active:scale-95 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center text-xs font-bold">
                  𝕏
                </div>
                <div className="text-left">
                  <span>X (Twitter)</span>
                  <p className="text-[10px] text-slate-300 font-normal">Tweet Link</p>
                </div>
              </button>

              <button
                onClick={() => shareToPlatform('telegram')}
                className="p-3 bg-sky-50 hover:bg-sky-100 border border-sky-300 rounded-2xl flex items-center gap-2.5 text-sky-800 font-black text-xs transition-all active:scale-95 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center text-sm font-bold">
                  ✈️
                </div>
                <div className="text-left">
                  <span>Telegram</span>
                  <p className="text-[10px] text-sky-600 font-normal">Channels</p>
                </div>
              </button>
            </div>

            {/* Link Copy Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-600 font-mono truncate select-all">
                {publicAppUrl}
              </span>
              <button
                onClick={handleCopyLink}
                className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: QR CODE */}
        {activeTab === 'qr' && (
          <div className="text-center space-y-3">
            <p className="text-xs text-slate-600">
              Scan this QR code with your phone camera or tablet to open the app instantly:
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 inline-block shadow-inner">
              <img
                src={qrCodeImageUrl}
                alt="App QR Code"
                className="w-48 h-48 mx-auto rounded-xl shadow-sm"
              />
            </div>
            <p className="text-[11px] font-bold text-slate-500 font-urdu">
              موبائل کیمرے سے اسکین کر کے فوراً کھولیں
            </p>
          </div>
        )}

        {/* TAB 3: INSTALL PWA */}
        {activeTab === 'install' && (
          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 flex items-start gap-2.5">
              <Smartphone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-sky-950">Add to Home Screen (PWA):</h4>
                <p className="text-[11px] text-sky-800 mt-1">
                  You can install this app directly on Android or iPhone without needing Play Store or App Store!
                </p>
              </div>
            </div>

            <ol className="list-decimal list-inside space-y-1.5 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px]">
              <li>Open this page in Google Chrome (Android) or Safari (iPhone/iPad).</li>
              <li>Tap the browser menu button <strong>(⋮ or Share ⎋)</strong>.</li>
              <li>Select <strong>“Add to Home screen”</strong> or <strong>“Install App”</strong>.</li>
              <li>The app icon will appear on your home screen for quick daily access!</li>
            </ol>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>100% Free & Child-Safe Education</span>
          <span className="font-urdu text-amber-700 font-bold">علم اور روشنی کا سفر</span>
        </div>
      </div>
    </div>
  );
};
