import React, { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  Volume2,
  VolumeX,
  Star,
  LogOut,
  Award,
  Sparkles,
  BookOpen,
  Heart,
  Bookmark,
  CheckCircle2,
  Bell,
  KeyRound,
  Lock,
  Calculator,
  AlertCircle,
  Check,
} from 'lucide-react';
import { kidsAudio } from '../../services/kidsAudio';
import { kidsStorage } from '../../services/kidsStorage';
import { parentalSecurity, GateMode } from '../../services/parentalSecurityService';

interface KidsParentAreaProps {
  starsCollected: number;
  screenTimeMinutes: number;
  onUpdateScreenTime: (mins: number) => void;
  onExitKidsMode: () => void;
  timeSpentMinutes: number;
  onOpenNotifications?: () => void;
}

export const KidsParentArea: React.FC<KidsParentAreaProps> = ({
  starsCollected,
  screenTimeMinutes,
  onUpdateScreenTime,
  onExitKidsMode,
  timeSpentMinutes,
  onOpenNotifications,
}) => {
  const [isMuted, setIsMuted] = useState(kidsAudio.getMuted());
  const favCount = kidsStorage.getFavorites().length;
  const savedCount = kidsStorage.getSaved().length;

  // Security PIN settings state
  const [securityStatus, setSecurityStatus] = useState(() => parentalSecurity.getStatus());
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmittingPin, setIsSubmittingPin] = useState(false);

  const handleToggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    kidsAudio.setMuted(next);
  };

  const handleGateModeChange = (mode: GateMode) => {
    parentalSecurity.setGateMode(mode);
    setSecurityStatus(parentalSecurity.getStatus());
    kidsAudio.playPopSound();
  };

  const handleOpenPinModal = () => {
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
    setPinChangeMsg(null);
    setIsPinModalOpen(true);
  };

  const handleSubmitNewPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeMsg(null);

    if (newPinInput.length !== 4 || !/^\d{4}$/.test(newPinInput)) {
      setPinChangeMsg({ type: 'error', text: 'New PIN must be exactly 4 numeric digits.' });
      return;
    }

    if (newPinInput !== confirmPinInput) {
      setPinChangeMsg({ type: 'error', text: 'New PIN and Confirm PIN do not match.' });
      return;
    }

    setIsSubmittingPin(true);
    const res = await parentalSecurity.updatePin(currentPinInput, newPinInput);
    setIsSubmittingPin(false);

    if (res.success) {
      kidsAudio.playCelebrationFanfare();
      setPinChangeMsg({ type: 'success', text: 'Parental security PIN updated successfully!' });
      setSecurityStatus(parentalSecurity.getStatus());
      setTimeout(() => {
        setIsPinModalOpen(false);
      }, 1500);
    } else {
      kidsAudio.playGentleRetrySound();
      setPinChangeMsg({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-sky-200 space-y-6 max-w-3xl mx-auto">
      {/* Header in Soft Blue */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Parents Control Dashboard
            </h2>
            <p className="text-xs font-bold text-sky-700 font-urdu">
              والدین کا محفوظ کنٹرول روم اور سیکیورٹی سیٹنگز
            </p>
          </div>
        </div>

        <button
          onClick={onExitKidsMode}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-black text-xs rounded-2xl shadow-md transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Kids Mode to Main App</span>
        </button>
      </div>

      {/* Progress & Analytics Summary in Soft Blue / Neutral */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 text-center space-y-1">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400 mx-auto" />
          <div className="text-xl sm:text-2xl font-black text-sky-950">{starsCollected}</div>
          <p className="text-[11px] font-bold text-sky-700">Stars Earned</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-center space-y-1">
          <Clock className="w-5 h-5 text-blue-600 mx-auto" />
          <div className="text-xl sm:text-2xl font-black text-blue-950">{timeSpentMinutes} mins</div>
          <p className="text-[11px] font-bold text-blue-700">Active Today</p>
        </div>

        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-center space-y-1">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 mx-auto" />
          <div className="text-xl sm:text-2xl font-black text-rose-950">{favCount}</div>
          <p className="text-[11px] font-bold text-rose-700">Favorites</p>
        </div>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
          <Bookmark className="w-5 h-5 text-emerald-600 fill-emerald-600 mx-auto" />
          <div className="text-xl sm:text-2xl font-black text-emerald-950">{savedCount}</div>
          <p className="text-[11px] font-bold text-emerald-700">Saved Items</p>
        </div>
      </div>

      {/* 🔐 PARENTAL SECURITY & PIN LOCK MANAGEMENT (ENHANCED) */}
      <div className="p-5 bg-gradient-to-br from-slate-900 to-sky-950 rounded-3xl text-white shadow-lg space-y-4 border border-sky-800">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-sky-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-inner">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
                <span>Parental Security PIN & Gate Lock</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  {securityStatus.hasCustomPin ? 'Custom PIN Active' : 'Default Security PIN'}
                </span>
              </h3>
              <p className="text-xs text-sky-300 font-urdu">
                والدین کا محفوظ پن کوڈ اور سیکیورٹی کی تصدیقی ترتیبات
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenPinModal}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 active:scale-95 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Change Security PIN</span>
          </button>
        </div>

        {/* Verification Gate Mode Selection */}
        <div className="space-y-2">
          <label className="text-xs font-black text-sky-200 flex items-center gap-1.5">
            <span>Preferred Verification Method (گیٹ تصدیق کا طریقہ منتخب کریں):</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              {
                id: 'both' as GateMode,
                label: 'PIN + Math Backup',
                desc: 'PIN with adult math recovery (Recommended)',
                icon: ShieldCheck,
              },
              {
                id: 'pin' as GateMode,
                label: '4-Digit PIN Only',
                desc: 'Strict 4-digit code verification',
                icon: KeyRound,
              },
              {
                id: 'math' as GateMode,
                label: 'Math Puzzle Only',
                desc: 'Dynamic adult arithmetic challenge',
                icon: Calculator,
              },
            ].map((m) => {
              const IconComp = m.icon;
              const isSelected = securityStatus.gateMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleGateModeChange(m.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 text-white ring-2 ring-sky-400/40'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-xs">
                    <IconComp className={`w-4 h-4 ${isSelected ? 'text-sky-300' : 'text-slate-400'}`} />
                    <span>{m.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">{m.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Security Assurance Notice */}
        <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-xs text-sky-200/90 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong className="text-white">Security Guarantee:</strong> Your Parental PIN is securely salted and cryptographically hashed in your local browser sandbox. It is never transmitted across unencrypted channels or exposed to kids.
          </p>
        </div>
      </div>

      {/* Screen Time Limiter Control */}
      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-600" />
            <h4 className="text-sm sm:text-base font-black text-slate-900">
              Daily Screen-Time Limiter (اسکرین کا وقت)
            </h4>
          </div>
          <span className="text-xs font-black text-sky-700">
            {screenTimeMinutes === 0 ? 'Unlimited' : `${screenTimeMinutes} minutes`}
          </span>
        </div>

        <p className="text-xs text-slate-600">
          When the timer expires, Kids Light World gently prompts the child to take an eye-rest break and locks with the parent gate.
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { label: '15 Mins', val: 15 },
            { label: '30 Mins', val: 30 },
            { label: '45 Mins', val: 45 },
            { label: '60 Mins', val: 60 },
            { label: 'Unlimited', val: 0 },
          ].map((opt) => (
            <button
              key={opt.val}
              onClick={() => onUpdateScreenTime(opt.val)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                screenTimeMinutes === opt.val
                  ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audio / Sound Preferences */}
      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-sky-600" />
            <h4 className="text-sm sm:text-base font-black text-slate-900">
              Audio & Speech Voice Preferences
            </h4>
          </div>

          <button
            onClick={handleToggleSound}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black border transition-colors ${
              isMuted
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isMuted ? 'Muted' : 'Sound Active'}</span>
          </button>
        </div>
        <p className="text-xs text-slate-600">
          Enables joyful chime sound effects, phonics pronunciation, and story voice narration.
        </p>
      </div>

      {/* Safety Policy & Certification */}
      <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1.5 text-xs text-sky-950">
        <div className="font-black flex items-center gap-1.5 text-sky-900">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          <span>Child Safety & Content Guarantee:</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-700">
          <li>No random internet search or uncurated external web links.</li>
          <li>No third-party behavioral trackers or advertisements.</li>
          <li>Sunny AI runs in locked kid-safe educational mode (<code>isKidsMode: true</code>).</li>
          <li>All stories promote universal moral values: kindness, courage, honesty, and empathy.</li>
        </ul>
      </div>

      {/* CHANGE PIN MODAL */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-4 border-sky-300 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Change Parent PIN</h3>
                  <p className="text-xs text-sky-700 font-urdu">والدین کا نیا پن کوڈ سیٹ کریں</p>
                </div>
              </div>
              <button
                onClick={() => setIsPinModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNewPin} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Current Parent PIN (موجودہ پن کوڈ)
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={currentPinInput}
                  onChange={(e) => setCurrentPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-center text-lg tracking-widest font-black focus:border-sky-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Initial default code: <code>1234</code>
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  New 4-Digit PIN (نیا ۴ ہندسی پن کوڈ)
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-center text-lg tracking-widest font-black focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Confirm New PIN (دوبارہ تصدیق کریں)
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={confirmPinInput}
                  onChange={(e) => setConfirmPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-center text-lg tracking-widest font-black focus:border-sky-500 focus:outline-none"
                />
              </div>

              {pinChangeMsg && (
                <div
                  className={`p-2.5 rounded-xl text-xs font-bold text-center ${
                    pinChangeMsg.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-50 text-rose-800 border border-rose-300'
                  }`}
                >
                  {pinChangeMsg.text}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPinModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPin}
                  className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md"
                >
                  {isSubmittingPin ? 'Saving...' : 'Save New PIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
