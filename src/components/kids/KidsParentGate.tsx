import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, RefreshCw, KeyRound, Calculator, Clock, Lock } from 'lucide-react';
import { kidsAudio } from '../../services/kidsAudio';
import { parentalSecurity, GateMode } from '../../services/parentalSecurityService';

interface KidsParentGateProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const KidsParentGate: React.FC<KidsParentGateProps> = ({
  isOpen,
  title = 'Grown-Ups Verification (والدین کا تصدیقی گیٹ)',
  description = 'To ensure young children stay safe inside Kids Mode, please enter your parent security PIN or solve the verification puzzle.',
  onSuccess,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'pin' | 'math'>('pin');
  const [pinInput, setPinInput] = useState('');
  const [num1, setNum1] = useState(8);
  const [num2, setNum2] = useState(7);
  const [mathInput, setMathInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 8) + 6;
    const b = Math.floor(Math.random() * 7) + 5;
    setNum1(a);
    setNum2(b);
    setMathInput('');
    setErrorMsg('');
  };

  useEffect(() => {
    if (isOpen) {
      setPinInput('');
      setMathInput('');
      setErrorMsg('');
      generateProblem();

      const status = parentalSecurity.getStatus();
      if (status.gateMode === 'math') {
        setActiveTab('math');
      } else {
        setActiveTab('pin');
      }

      if (status.isLockedOut) {
        setCooldownRemaining(status.remainingCooldownSeconds);
      } else {
        setCooldownRemaining(0);
      }
    }
  }, [isOpen]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const timer = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setErrorMsg('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownRemaining]);

  if (!isOpen) return null;

  const handlePinSubmit = async (pinToTest?: string) => {
    const pin = pinToTest || pinInput;
    if (pin.length !== 4) {
      setErrorMsg('Please enter all 4 digits of your PIN.');
      return;
    }
    setIsVerifying(true);
    setErrorMsg('');

    const res = await parentalSecurity.verifyPin(pin);
    setIsVerifying(false);

    if (res.success) {
      kidsAudio.playRewardChime();
      onSuccess();
    } else {
      kidsAudio.playGentleRetrySound();
      setErrorMsg(res.message);
      setPinInput('');

      const updated = parentalSecurity.getStatus();
      if (updated.isLockedOut) {
        setCooldownRemaining(updated.remainingCooldownSeconds);
      }
    }
  };

  const handleMathSubmit = () => {
    const expected = num1 + num2;
    if (parseInt(mathInput.trim(), 10) === expected) {
      kidsAudio.playRewardChime();
      onSuccess();
    } else {
      kidsAudio.playGentleRetrySound();
      setErrorMsg('Incorrect math solution. Please try again.');
      setMathInput('');
    }
  };

  const handleKeypadPress = (val: string) => {
    if (cooldownRemaining > 0) return;

    if (activeTab === 'pin') {
      if (val === 'C') {
        setPinInput('');
        setErrorMsg('');
      } else if (val === '⌫') {
        setPinInput((prev) => prev.slice(0, -1));
      } else {
        if (pinInput.length < 4) {
          const next = pinInput + val;
          setPinInput(next);
          if (next.length === 4) {
            handlePinSubmit(next);
          }
        }
      }
    } else {
      if (val === 'C') {
        setMathInput('');
        setErrorMsg('');
      } else if (val === '⌫') {
        setMathInput((prev) => prev.slice(0, -1));
      } else {
        if (mathInput.length < 3) {
          setMathInput((prev) => prev + val);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-4 border-sky-300 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {title}
              </h3>
              <p className="text-xs text-sky-700 font-bold font-urdu">
                والدین کی تصدیق کا محفوظ دروازہ
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

        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          {description}
        </p>

        {/* Tab Selector: PIN vs Math */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-black">
          <button
            type="button"
            onClick={() => {
              setActiveTab('pin');
              setErrorMsg('');
            }}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'pin'
                ? 'bg-white text-sky-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-sky-600" />
            <span>4-Digit PIN</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('math');
              setErrorMsg('');
            }}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'math'
                ? 'bg-white text-sky-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            <span>Math Challenge</span>
          </button>
        </div>

        {/* PIN Display Mode */}
        {activeTab === 'pin' && (
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 text-center space-y-3">
            <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block">
              Enter 4-Digit Parent PIN:
            </span>
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((idx) => {
                const isFilled = pinInput.length > idx;
                return (
                  <div
                    key={idx}
                    className={`w-11 h-12 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                      isFilled
                        ? 'bg-sky-600 border-sky-700 text-white shadow-md scale-105'
                        : 'bg-white border-sky-300 text-slate-400'
                    }`}
                  >
                    {isFilled ? '●' : '—'}
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-500 font-semibold font-urdu">
              صرف والدین کے لیے مخصوص کوڈ درج کریں
            </p>
          </div>
        )}

        {/* Math Display Mode */}
        {activeTab === 'math' && (
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 text-center space-y-2">
            <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider block">
              Solve Adult Arithmetic Puzzle:
            </span>
            <div className="flex items-center justify-center gap-3 text-3xl font-black text-indigo-950">
              <span>{num1}</span>
              <span>+</span>
              <span>{num2}</span>
              <span>=</span>
              <span className="min-w-14 px-3 py-1 bg-white border-2 border-indigo-400 rounded-xl text-center shadow-inner">
                {mathInput || '?'}
              </span>
            </div>
            <button
              type="button"
              onClick={generateProblem}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 mx-auto"
            >
              <RefreshCw className="w-3 h-3" />
              <span>New Puzzle</span>
            </button>
          </div>
        )}

        {/* Cooldown or Error Message */}
        {cooldownRemaining > 0 ? (
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs font-bold flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 animate-spin text-rose-600" />
            <span>Security cooldown active. Retry in {cooldownRemaining}s</span>
          </div>
        ) : errorMsg ? (
          <p className="text-xs text-rose-600 font-bold text-center animate-shake">
            {errorMsg}
          </p>
        ) : null}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
            <button
              key={k}
              type="button"
              disabled={cooldownRemaining > 0 || isVerifying}
              onClick={() => handleKeypadPress(k)}
              className="py-3 bg-slate-50 hover:bg-sky-50 active:scale-95 disabled:opacity-40 text-slate-800 text-lg font-black rounded-xl transition-all border border-slate-200"
            >
              {k}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-2xl transition-colors"
          >
            Cancel
          </button>
          {activeTab === 'math' && (
            <button
              type="button"
              onClick={handleMathSubmit}
              disabled={!mathInput || cooldownRemaining > 0}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-xs rounded-2xl shadow-md transition-colors"
            >
              Verify Math
            </button>
          )}
          {activeTab === 'pin' && (
            <button
              type="button"
              onClick={() => handlePinSubmit()}
              disabled={pinInput.length !== 4 || cooldownRemaining > 0 || isVerifying}
              className="flex-1 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-black text-xs rounded-2xl shadow-md transition-colors"
            >
              {isVerifying ? 'Verifying...' : 'Unlock Gate'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
