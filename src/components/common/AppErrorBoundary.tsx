import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';
import { clearAppCache, reloadApp } from '../../services/contentService';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
  isRecovering: boolean;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
    isRecovering: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unexpected memory or render condition occurred',
      isRecovering: false,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[AppErrorBoundary] Caught render exception:', error, errorInfo);
  }

  private handleRecover = async () => {
    this.setState({ isRecovering: true });
    try {
      await clearAppCache();
    } catch {}
    setTimeout(() => {
      reloadApp(true);
    }, 300);
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 sm:p-6 antialiased">
          <div className="w-full max-w-lg bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/30">
              <Zap className="w-8 h-8 fill-amber-400" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Memory &amp; Session Auto-Protection</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Browser Memory Limit Reached
              </h2>
              <p className="font-urdu text-lg sm:text-xl text-amber-200 leading-relaxed font-bold">
                براؤزر میموری کی حد پوری ہو گئی۔ ایپ کو فریش ری لوڈ کریں
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                Heavy animations, audio buffers ya browser caching ki waja se memory load ziada ho gaya tha. Neeche diye gaye button par click karein taake cache saaf ho aur app foran fast chalne lagay.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={this.handleRecover}
                disabled={this.state.isRecovering}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black rounded-2xl shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className={`w-5 h-5 ${this.state.isRecovering ? 'animate-spin' : ''}`} />
                <span>
                  {this.state.isRecovering
                    ? 'Memory Saaf Ho Rahi Hai...'
                    : 'Clear Cache & Reload App Now (ایپ ری لوڈ کریں)'}
                </span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Aapka user login aur pasandeeda data mehfooz rahega</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
