import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

export const AdsterraNativeBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if the script is already added in this container
    const existingScript = container.querySelector('script[src*="fb9dcfb2b9721a8695db7a01aa84b72f"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl31422700.profitableratecpmnetwork.com/fb9dcfb2b9721a8695db7a01aa84b72f/invoke.js';

      script.onload = () => {
        setAdLoaded(true);
      };
      script.onerror = (e) => {
        console.warn('Adsterra Native Banner script notice:', e);
      };

      container.appendChild(script);
    }

    // Detect if Adsterra populates content into the container
    const observer = new MutationObserver(() => {
      if (container.children.length > 1) {
        setAdLoaded(true);
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
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

        {/* Exact target container requested by user */}
        <div
          id="container-fb9dcfb2b9721a8695db7a01aa84b72f"
          ref={containerRef}
          className="w-full flex items-center justify-center min-h-[90px] sm:min-h-[110px] transition-all overflow-hidden text-inherit"
        >
          {/* Visual container indicator so it is clearly visible in the preview even if network latency or adblockers delay creative delivery */}
          {!adLoaded && (
            <div className="flex flex-col items-center justify-center p-3 text-center space-y-1 select-none">
              <div className="flex items-center gap-2 text-zinc-300 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Adsterra Native 4:1 Ad Unit</span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono">
                container-fb9dcfb2b9721a8695db7a01aa84b72f
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
