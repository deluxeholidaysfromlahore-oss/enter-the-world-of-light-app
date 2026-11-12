import React from 'react';
import { X, Volume2, Check, Globe, Sparkles } from 'lucide-react';
import {
  kidsAudio,
  KIDS_SUPPORTED_LANGUAGES,
  KidsVoiceLang,
} from '../../services/kidsAudio';

interface KidsLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageChanged?: (lang: KidsVoiceLang) => void;
}

export const KidsLanguageModal: React.FC<KidsLanguageModalProps> = ({
  isOpen,
  onClose,
  onLanguageChanged,
}) => {
  if (!isOpen) return null;

  const currentLang = kidsAudio.getVoiceLanguage();

  const handleSelectLanguage = (code: KidsVoiceLang) => {
    kidsAudio.setVoiceLanguage(code);
    if (onLanguageChanged) {
      onLanguageChanged(code);
    }
  };

  const handleTestVoice = (code: KidsVoiceLang, e: React.MouseEvent) => {
    e.stopPropagation();
    const config = KIDS_SUPPORTED_LANGUAGES.find((l) => l.code === code);
    if (config) {
      kidsAudio.speakWord(config.sampleGreeting, code);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border-4 border-sky-200 space-y-5 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl shadow-inner">
              🌐
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-1.5">
                <span>Select Voice Language</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs font-bold text-slate-500 font-urdu">
                آواز اور تلفظ کی زبان منتخب کریں
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-2xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Note */}
        <p className="text-xs text-slate-600 font-medium bg-sky-50 p-3 rounded-2xl border border-sky-100">
          ✨ Jab aap koi language chunenge, to tamam <strong>Animals ki aawazein</strong>,
          alfaz, ginti aur kahaniyan usi zuban ke talaffuz mein bol kar sunayi jayeingi!
        </p>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
          {KIDS_SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <div
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 shadow-sm ${
                  isSelected
                    ? 'bg-sky-500 text-white border-sky-600 ring-2 ring-sky-200 shadow-md scale-102'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className="text-sm font-black flex items-center gap-1.5">
                      <span>{lang.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div
                      className={`text-xs font-bold ${
                        isSelected ? 'text-sky-100' : 'text-slate-500'
                      }`}
                    >
                      {lang.nativeName}
                    </div>
                  </div>
                </div>

                {/* Test Voice Button */}
                <button
                  onClick={(e) => handleTestVoice(lang.code, e)}
                  title={`Listen to sample in ${lang.name}`}
                  className={`p-2 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-white/20 hover:bg-white/30 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Done Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-sm rounded-2xl shadow-md transition-all active:scale-95"
          >
            Done (مکمل)
          </button>
        </div>
      </div>
    </div>
  );
};
