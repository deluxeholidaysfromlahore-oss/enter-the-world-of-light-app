import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { ShieldAlert, Lock, LogIn, ArrowLeft, KeyRound } from 'lucide-react';

interface AdminLockGateProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onNavigateHome: () => void;
  onAdminVerified?: () => void;
}

export const AdminLockGate: React.FC<AdminLockGateProps> = ({
  currentUser,
  onOpenAuth,
  onNavigateHome,
  onAdminVerified,
}) => {
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    // Emergency Admin Passcode for deluxeholidaysfromlahore
    if (passcode.trim() === '7860' || passcode.trim() === 'deluxe2026') {
      if (onAdminVerified) {
        onAdminVerified();
      }
    } else {
      setPasscodeError(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-6 sm:p-8 bg-white border border-slate-200/90 rounded-3xl shadow-sm text-center space-y-6">
      <div className="w-16 h-16 bg-slate-900 text-amber-400 rounded-3xl mx-auto flex items-center justify-center shadow-md">
        <Lock className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-full text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          Restricted Admin Access
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Admin Console &amp; Blogger Engine
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          Yeh area public visitors ke lie hidden aur locked hai. Is module ko sirf authorized owner (<span className="font-semibold text-slate-900">deluxeholidaysfromlahore@gmail.com</span>) hi access kar sakte hain.
        </p>
      </div>

      {currentUser && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600">
          Current logged in account: <span className="font-mono font-bold text-slate-900">{currentUser.email || 'Anonymous'}</span>
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onOpenAuth}
          className="w-full sm:w-auto px-5 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In as Admin</span>
        </button>

        <button
          onClick={onNavigateHome}
          className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home Screen</span>
        </button>
      </div>

      {/* Emergency / Fast Passcode for instant access */}
      <div className="pt-4 border-t border-slate-100 text-left">
        <form onSubmit={handleVerifyPasscode} className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-slate-500" />
            <span>Admin Quick PIN Unlock (Optional)</span>
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Enter PIN (e.g. 7860)"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setPasscodeError(false);
              }}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Unlock
            </button>
          </div>
          {passcodeError && (
            <p className="text-[11px] text-rose-600 font-semibold">
              Invalid PIN. Use 7860 or sign in with your admin Google account.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
