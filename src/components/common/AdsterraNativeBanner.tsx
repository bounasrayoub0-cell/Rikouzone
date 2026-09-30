import React, { Component, useEffect, useRef, ErrorInfo, ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

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
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-gradient-to-r from-zinc-950 via-zinc-900/70 to-zinc-950 p-3 sm:p-4 backdrop-blur-md shadow-xl shadow-black/30 text-inherit">
        {/* Header label for 4:1 Native Banner */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/60 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <span className="flex items-center gap-1.5 text-amber-400/90 font-medium">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>إعلان مميز / Sponsored Partner</span>
          </span>
          <span className="rounded bg-zinc-800/80 px-2 py-0.5 text-[9px] text-zinc-400 font-mono border border-zinc-700/50">
            4:1 Native Banner
          </span>
        </div>

        {/* Ad Container Area */}
        <div className="relative w-full flex items-center justify-center min-h-[90px] sm:min-h-[110px] overflow-hidden">
          {/* Subtle background placeholder sitting behind the ad slot as an absolute sibling (NOT a child of containerRef) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center space-y-1 select-none pointer-events-none opacity-40">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>مساحة إعلانية مخصصة / Sponsor Space</span>
            </div>
            <p className="text-[10px] text-zinc-600 font-mono">
              4:1 Native Ad Format
            </p>
          </div>

          {/* Exact target container requested by user: KEEP FREE OF REACT JSX CHILDREN */}
          {/* External scripts mutate its DOM freely without React reconciliation errors */}
          <div
            id="container-fb9dcfb2b9721a8695db7a01aa84b72f"
            ref={containerRef}
            className="relative z-10 w-full flex items-center justify-center min-h-[90px] sm:min-h-[110px] transition-all overflow-hidden text-inherit"
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

