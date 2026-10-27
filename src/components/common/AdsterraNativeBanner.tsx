import React, { Component, useEffect, useRef, ErrorInfo, ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface SilentBoundaryProps {
  children: ReactNode;
}

interface SilentBoundaryState {
  hasError: boolean;
}

class SilentBoundary extends Component<SilentBoundaryProps, SilentBoundaryState> {
  state: SilentBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SilentBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Adsterra Native Banner caught isolated notice:', error.message, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const AdsterraNativeBannerInner: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loadedRef.current) return;
    loadedRef.current = true;

    try {
      // Check if script is already present
      const scriptSrc = 'https://pl31422700.profitableratecpmnetwork.com/fb9dcfb2b9721a8695db7a01aa84b72f/invoke.js';
      const existingScript = container.querySelector(`script[src*="fb9dcfb2b9721a8695db7a01aa84b72f"]`);
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = scriptSrc;
        script.onerror = () => {
          // Silently handle adblock or network loading issues
        };

        container.appendChild(script);
      }
    } catch (e) {
      console.warn('Adsterra Native Banner notice:', e);
    }

    return () => {
      // Intentionally do not clear or remove elements to prevent 3rd-party script removeChild race conditions
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 sm:my-8 px-2 sm:px-4">
      <div className="adsterra-banner-card relative overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-[#162032] p-3 sm:p-4 shadow-sm dark:shadow-xl text-inherit">
        {/* Header label for 4:1 Native Banner */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-zinc-800 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400 font-medium">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
            <span>{t.common.sponsoredPartner}</span>
          </span>
          <span className="rounded bg-slate-100 dark:bg-zinc-800/80 px-2 py-0.5 text-[9px] text-slate-600 dark:text-zinc-400 font-mono border border-slate-200 dark:border-zinc-700/50">
            4:1 Native Banner
          </span>
        </div>

        {/* Ad Container Area */}
        <div className="relative w-full flex items-center justify-center min-h-[90px] sm:min-h-[110px] overflow-hidden">
          {/* Subtle background placeholder sitting behind the ad slot as an absolute sibling (NOT a child of containerRef) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center space-y-1 select-none pointer-events-none opacity-50 dark:opacity-40">
            <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-400 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>{t.common.sponsorSpace}</span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-zinc-600 font-mono">
              4:1 Native Ad Format
            </p>
          </div>

          {/* Exact target container requested by user: KEEP FREE OF REACT JSX CHILDREN */}
          {/* External scripts mutate its DOM freely without React reconciliation errors */}
          <div
            id="container-fb9dcfb2b9721a8695db7a01aa84b72f"
            ref={containerRef}
            className="adsterra-container relative z-10 w-full flex items-center justify-center min-h-[90px] sm:min-h-[110px] transition-all overflow-hidden text-inherit"
          />
        </div>
      </div>
    </div>
  );
};

export const AdsterraNativeBanner: React.FC = () => {
  return (
    <SilentBoundary>
      <AdsterraNativeBannerInner />
    </SilentBoundary>
  );
};

