import { useEffect, useRef } from "react";

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

export default function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!adRef.current || loadedRef.current) return;
    loadedRef.current = true;

    try {
      window.atOptions = {
        key: "ca5ce1a3af5ba19280aa690a8812d52e",
        format: "iframe",
        height: 50,
        width: 320,
        params: {},
      };

      const script = document.createElement("script");
      script.src =
        "https://www.highrevenueformat.com/ca5ce1a3af5ba19280aa690a8812d52e/invoke.js";
      script.async = true;
      script.onerror = () => {
        // Silently swallow ad network load failures (e.g. adblock or CORS or iframe sandboxing)
      };

      adRef.current.appendChild(script);
    } catch {
      // Ignore ad loading failure in restricted environments
    }

    return () => {
      // Do not abruptly destroy DOM while external script might be writing to it
    };
  }, []);

  return (
    <div
      ref={adRef}
      className="mx-auto my-4 min-h-[50px] w-full max-w-[320px] flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "50px",
      }}
    />
  );
}
