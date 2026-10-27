import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function AdBanner() {
  const { t } = useLanguage();

  const iframeContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base target="_blank">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      var atOptions = {
        'key' : 'ca5ce1a3af5ba19280aa690a8812d52e',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://www.highrevenueformat.com/ca5ce1a3af5ba19280aa690a8812d52e/invoke.js"></script>
  </body>
</html>`;

  return (
    <div className="mx-auto my-4 w-full max-w-[340px] px-2 flex flex-col items-center justify-center">
      <div className="w-[320px] h-[50px] min-h-[50px] relative overflow-hidden rounded-lg border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-center justify-center">
        {/* Clean subtle placeholder behind the ad slot */}
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-zinc-500 font-mono select-none pointer-events-none opacity-60">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span>{t.common?.sponsorSpace || 'Sponsor Space'} · 320×50</span>
        </div>

        {/* Adsterra 320x50 Banner executing in dedicated document context */}
        <iframe
          title="Adsterra Banner"
          srcDoc={iframeContent}
          width={320}
          height={50}
          className="relative z-10 w-[320px] h-[50px] border-0 overflow-hidden"
          scrolling="no"
          loading="lazy"
        />
      </div>
    </div>
  );
}
