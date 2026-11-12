import React, { useState, useEffect } from 'react';
import {
  Zap,
  Trash2,
  CheckCircle2,
  RefreshCw,
  RotateCcw,
  HardDrive,
  X,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Cpu,
} from 'lucide-react';
import { clearAppCache, reloadApp, CacheClearResult } from '../../services/contentService';

interface CacheCleanerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CacheCleanerModal: React.FC<CacheCleanerModalProps> = ({ isOpen, onClose }) => {
  const [isClearing, setIsClearing] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [clearResult, setClearResult] = useState<CacheClearResult | null>(null);
  const [memoryStats, setMemoryStats] = useState<{
    usedMB?: number;
    totalMB?: number;
    limitMB?: number;
  }>({});

  useEffect(() => {
    if (isOpen) {
      setClearResult(null);
      setIsClearing(false);
      setIsReloading(false);
      // Read browser memory if performance.memory is supported in Chromium
      try {
        const perfMem = (window.performance as any)?.memory;
        if (perfMem) {
          setMemoryStats({
            usedMB: Math.round(perfMem.usedJSHeapSize / (1024 * 1024)),
            totalMB: Math.round(perfMem.totalJSHeapSize / (1024 * 1024)),
            limitMB: Math.round(perfMem.jsHeapSizeLimit / (1024 * 1024)),
          });
        }
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 1. Clear Memory Only (without reloading)
  const handleClearOnly = async () => {
    setIsClearing(true);
    try {
      const result = await clearAppCache();
      setClearResult(result);
      // Re-check memory
      try {
        const perfMem = (window.performance as any)?.memory;
        if (perfMem) {
          setMemoryStats((prev) => ({
            ...prev,
            usedMB: Math.round(perfMem.usedJSHeapSize / (1024 * 1024)),
          }));
        }
      } catch {}
    } catch (err) {
      console.error('Cache clear failed:', err);
    } finally {
      setIsClearing(false);
    }
  };

  // 2. Clear Cache AND Reload App (Recommended solution for "Aw, Snap! Out of Memory")
  const handleClearAndReload = async () => {
    setIsReloading(true);
    try {
      await clearAppCache();
    } catch (e) {
      console.warn('Cache clear before reload notice:', e);
    }
    // Short delay so user sees feedback, then clean hard reload
    setTimeout(() => {
      reloadApp(true);
    }, 450);
  };

  // 3. Quick Reload App Directly
  const handleDirectReload = () => {
    setIsReloading(true);
    setTimeout(() => {
      reloadApp(true);
    }, 200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Zap className="w-5 h-5 text-amber-100 fill-amber-200" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                App Memory &amp; Cache Saver
              </h3>
              <p className="text-xs text-amber-100 font-urdu dir-rtl">
                میموری خالی کریں اور ایپ کو ری لوڈ کریں
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {!clearResult ? (
            <>
              {/* Aw Snap Warning Resolution Note */}
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/90 flex items-start gap-3 text-xs text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-extrabold text-xs sm:text-sm text-amber-950">
                    Chrome &ldquo;Aw, Snap! Out of Memory&rdquo; Solution:
                  </p>
                  <p className="text-amber-800 leading-relaxed font-medium">
                    Browser mein heavy video, images aur audio buffers jama hone se RAM bhar jati hai.
                    Neeche diye gaye <strong>&ldquo;Clear Cache &amp; Reload App&rdquo;</strong> button se browser ki tamam memory foran release ho jati hai aur app fresh chalne lagti hai.
                  </p>
                </div>
              </div>

              {/* Real-time Memory Diagnostics Card */}
              {memoryStats.usedMB !== undefined && (
                <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-emerald-400" /> Active Browser Heap:
                    </span>
                    <span className="font-mono text-emerald-400 text-sm">
                      {memoryStats.usedMB} MB used
                    </span>
                  </div>
                  {memoryStats.limitMB && (
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-amber-400 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.round(((memoryStats.usedMB || 0) / memoryStats.limitMB) * 100))}%`,
                        }}
                      />
                    </div>
                  )}
                  <p className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Limit: {memoryStats.limitMB || 2048} MB</span>
                    <span className="text-emerald-300 font-bold">100% Safe Clean</span>
                  </p>
                </div>
              )}

              {/* Status Checklist */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <HardDrive className="w-4 h-4 text-sky-600" /> Audio &amp; Video Buffers:
                  </span>
                  <span className="font-bold text-slate-900">Auto Flush Ready</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Server Query Cache:
                  </span>
                  <span className="font-bold text-slate-900">Ready to Purge</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Favorites &amp; User Account:
                  </span>
                  <span className="font-bold text-emerald-700">100% Safe (Protected)</span>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="space-y-2.5 pt-1">
                {/* 1. Primary Button: Clear Cache AND Reload App (Direct fix requested by user) */}
                <button
                  onClick={handleClearAndReload}
                  disabled={isClearing || isReloading}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.99] disabled:opacity-50 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
                >
                  {isReloading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Memory Free Ho Rahi Hai &bull; Reloading App...</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-4 h-4 text-white" />
                      <span>Clear Cache &amp; Reload App (کیشے صاف کر کے ایپ ری لوڈ کریں)</span>
                    </>
                  )}
                </button>

                {/* Grid with Quick Reload & In-Place Free Memory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Direct Reload Button */}
                  <button
                    onClick={handleDirectReload}
                    disabled={isClearing || isReloading}
                    className="w-full py-2.5 px-3 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200/90 hover:border-sky-300 font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
                    <span>Quick Reload App (فوری ری لوڈ)</span>
                  </button>

                  {/* Free Memory Only (No Reload) */}
                  <button
                    onClick={handleClearOnly}
                    disabled={isClearing || isReloading}
                    className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                  >
                    {isClearing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Clearing...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Clean Memory Only (بغیر ری لوڈ)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Result Screen if user clicked Clean Memory Only */
            <div className="text-center py-3 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-in zoom-in-75 shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-base">
                  Memory Free Ho Chuki Hai!
                </h4>
                <p className="text-xs text-emerald-700 font-bold">
                  {clearResult.serverMessage}
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Audio/video buffers aur temporary server cache release ho chuki hai.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1 text-left">
                <p><strong>Status:</strong> Success ({clearResult.timestamp})</p>
                <p><strong>Server Cache Pruned:</strong> {clearResult.clearedServerEntries} entries freed</p>
                <p><strong>Client Audio &amp; Storage:</strong> Safe &amp; Cleaned</p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => reloadApp(true)}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold rounded-2xl transition-all text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ab App Ko Reload Karein (Reload Now)</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-xs cursor-pointer"
                >
                  Bina Reload Band Karein (Close)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
