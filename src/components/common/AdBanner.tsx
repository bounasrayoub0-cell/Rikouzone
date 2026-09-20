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

  useEffect(() => {
    if (!adRef.current) return;

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

    adRef.current.appendChild(script);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={adRef}
      style={{
        width: "320px",
        height: "50px",
        margin: "16px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    />
  );
}
