import React, { useState } from 'react';
import { Sliders, Copy, Check, Sparkles, RefreshCw, AlertTriangle, Monitor, Wifi, Cpu, Layers, ShieldCheck, Film } from 'lucide-react';

export const ObsSettingsCalculator: React.FC = () => {
  const [uploadSpeed, setUploadSpeed] = useState<number>(12); // Mbps
  const [gpuHardware, setGpuHardware] = useState<string>('nvidia-rtx');
  const [platform, setPlatform] = useState<string>('kick');
  const [resolution, setResolution] = useState<string>('1080p');
  const [framerate, setFramerate] = useState<number>(60);
  const [gamePace, setGamePace] = useState<'fast-fps' | 'medium-rpg' | 'slow-strategy'>('fast-fps');
  const [copied, setCopied] = useState<boolean>(false);

  // Compute recommendations
  let recommendedEncoder = 'NVIDIA NVENC H.264 (new)';
  let encoderDetail = 'المشفر المادي الأقوى لكروت Nvidia RTX دون أي ضغط على المعالج.';
  if (gpuHardware === 'nvidia-gtx') {
    recommendedEncoder = 'NVIDIA NVENC H.264';
    encoderDetail = 'مشفر كروت GTX 10/16 الممتاز للعب السلس.';
  } else if (gpuHardware === 'amd') {
    recommendedEncoder = 'AMD HW H.264 (AMF)';
    encoderDetail = 'مشفر كروت AMD الحديثة بأداء مستقر.';
  } else if (gpuHardware === 'apple') {
    recommendedEncoder = 'Apple VideoToolbox H.264';
    encoderDetail = 'المشفر المدمج في معالجات Apple Silicon M-Series.';
  } else if (gpuHardware === 'cpu-only') {
    recommendedEncoder = 'x264 (Software CPU)';
    encoderDetail = 'المشفر البرمجي عبر المعالج (يستهلك طاقة كبيرة من CPU).';
  }

  // Max allowed bitrate by platform
  const maxPlatformBitrate = platform === 'twitch' ? 8000 : platform === 'kick' ? 8000 : platform === 'tiktok' ? 6000 : 15000;

  // Max safe bitrate by upload speed (70% rule)
  const safeUploadBitrate = Math.floor(uploadSpeed * 1000 * 0.7);

  // Base ideal bitrate by resolution and FPS
  let idealBitrate = 6000;
  if (resolution === '720p') {
    idealBitrate = framerate === 60 ? 4500 : 3200;
  } else if (resolution === '936p') {
    idealBitrate = framerate === 60 ? 6000 : 4500;
  } else if (resolution === '1080p') {
    idealBitrate = framerate === 60 ? (platform === 'youtube' ? 8500 : 7500) : 5500;
  } else if (resolution === '1440p') {
    idealBitrate = platform === 'youtube' ? 14000 : 8000;
  }

  if (gamePace === 'fast-fps') {
    idealBitrate = Math.round(idealBitrate * 1.1);
  }

  // Final recommended bitrate (cannot exceed platform limit, capped by safe upload)
  const finalBitrate = Math.min(idealBitrate, maxPlatformBitrate, Math.max(2500, safeUploadBitrate));

  const presetName = gpuHardware === 'cpu-only' ? 'Veryfast' : gpuHardware === 'nvidia-rtx' ? 'P5: Slow (Good Quality)' : 'P4: Medium';

  const fullConfigText = `=== إعدادات OBS STUDIO الموصى بها ===
المنصة: ${platform.toUpperCase()}
الدقة: ${resolution} بمعدل ${framerate} FPS
نوع اللعبة: ${gamePace === 'fast-fps' ? 'ألعاب حركة سريعة FPS' : 'ألعاب عادية/تكتيكية'}

[إعدادات الإخراج - Output Settings]
- الوضع: Advanced
- المشفر (Video Encoder): ${recommendedEncoder}
- معدل التحكم (Rate Control): CBR (Constant Bitrate)
- معدل البت (Bitrate): ${finalBitrate} Kbps
- الفاصل الزمني للإطارات المفتاحية (Keyframe Interval): 2s
- البريست (Preset): ${presetName}
- ملف التعريف (Profile): High
- Max B-frames: 2

[إعدادات الصوت - Audio Settings]
- معدل العينة (Sample Rate): 48 kHz
- معدل بت الصوت (Audio Bitrate): 160 Kbps
- فلاتر الميكروفون الموصى بها:
  1. Noise Suppression: RNNoise (AI-powered)
  2. Noise Gate: Open -32dB / Close -38dB
  3. Compressor: Ratio 4:1 / Attack 2ms / Release 100ms
  4. Limiter: Threshold -1.5 dB (حماية حاسمة ضد التشويه)
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullConfigText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* Header */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-zinc-900/80 to-zinc-900/50 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sliders className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>حاسبة إعدادات OBS والـ Bitrate المثالية</span>
                <span className="rounded-md bg-cyan-500/20 border border-cyan-500/30 px-2 py-0.5 text-xs text-cyan-300 font-bold">
                  Zero Drop-Frames
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                احصل على أفضل إعدادات فيديو وصوت وصورة سلسة بدون تقطيع أو بكسلة، محسوبة بدقة لسرعة النت ومواصفات كارتك.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setUploadSpeed(15);
              setGpuHardware('nvidia-rtx');
              setPlatform('kick');
              setResolution('1080p');
              setFramerate(60);
              setGamePace('fast-fps');
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all self-start sm:self-center"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>الإعدادات القياسية</span>
          </button>
        </div>
      </div>

      {/* Grid: Inputs (7 cols) vs Recommendations (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Upload Speed */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                <Wifi className="h-4 w-4 text-cyan-400" />
                <span>1. سرعة رفع الإنترنت الفعلية (Upload Speed):</span>
              </label>
              <span className="text-sm font-black text-cyan-400">{uploadSpeed} Mbps</span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              step="1"
              value={uploadSpeed}
              onChange={(e) => setUploadSpeed(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>2 Mbps (ضعيف جداً)</span>
              <span>10 Mbps (ممتاز 1080p)</span>
              <span>25+ Mbps (ألياف بصرية)</span>
            </div>
            {uploadSpeed < 6 && (
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-2.5 text-xs text-amber-300 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>سرعة الرفع لديك أقل من 6 Mbps؛ نوصي بالبث على 720p بمعدل 30 أو 60 إطاراً لمنع التقطيع.</span>
              </div>
            )}
          </div>

          {/* 2. Hardware / GPU Selection */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-purple-400" />
              <span>2. كارت الشاشة أو المعالج المستخدم للبث:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'nvidia-rtx', name: 'Nvidia RTX (20/30/40)', sub: 'NVENC New الأقوى' },
                { id: 'nvidia-gtx', name: 'Nvidia GTX (10/16)', sub: 'NVENC المستقر' },
                { id: 'amd', name: 'AMD Radeon (RX)', sub: 'AMD AMF' },
                { id: 'apple', name: 'Apple Silicon (M1/M2/M3)', sub: 'VideoToolbox' },
                { id: 'cpu-only', name: 'معالج فقط (بدون كارت)', sub: 'x264 Software' }
              ].map((gpu) => (
                <button
                  key={gpu.id}
                  onClick={() => setGpuHardware(gpu.id)}
                  className={`rounded-xl border p-2.5 text-right transition-all cursor-pointer ${
                    gpuHardware === gpu.id
                      ? 'border-purple-500 bg-purple-500/15 text-white font-bold'
                      : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className="text-xs font-black">{gpu.name}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{gpu.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Resolution & FPS */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
              <Monitor className="h-4 w-4 text-emerald-400" />
              <span>3. دقة البث ومعدل الإطارات المستهدف:</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['720p', '936p', '1080p', '1440p'].map((res) => (
                <button
                  key={res}
                  onClick={() => setResolution(res)}
                  className={`rounded-xl border py-2 text-center text-xs font-bold transition-all cursor-pointer ${
                    resolution === res
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                      : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-300 font-bold">معدل الإطارات (Framerate):</span>
              <div className="flex gap-2">
                {[30, 60].map((fps) => (
                  <button
                    key={fps}
                    onClick={() => setFramerate(fps)}
                    className={`rounded-lg px-4 py-1.5 text-xs font-black transition-all cursor-pointer ${
                      framerate === fps
                        ? 'bg-emerald-500 text-black'
                        : 'border border-zinc-800 bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {fps} FPS
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Target Platform & Game Pace */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1.5">منصة البث:</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white font-bold focus:border-cyan-500 focus:outline-none"
                >
                  <option value="kick">Kick (أقصى بت ريت 8000k)</option>
                  <option value="twitch">Twitch (أقصى بت ريت 8000k)</option>
                  <option value="youtube">YouTube (يدعم حتى 15000k+)</option>
                  <option value="tiktok">TikTok Live (أقصى بت ريت 6000k)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1.5">طبيعة حركة اللعبة:</label>
                <select
                  value={gamePace}
                  onChange={(e) => setGamePace(e.target.value as any)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white font-bold focus:border-cyan-500 focus:outline-none"
                >
                  <option value="fast-fps">حركة سريعة جداً (FPS / Battle Royale / Racing)</option>
                  <option value="medium-rpg">حركة متوسطة (GTA V, RPG, Story Games)</option>
                  <option value="slow-strategy">حركة هادئة (Strategy, Card Games, Minecraft)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Output Recommendations */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-cyan-500/15 via-zinc-900/90 to-zinc-950 p-6 shadow-xl shadow-cyan-500/10 space-y-5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 px-3 py-0.5 text-xs font-black text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>إعدادات البث المحسوبة</span>
              </span>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ الإعدادات'}</span>
              </button>
            </div>

            {/* Huge Bitrate display */}
            <div>
              <div className="text-xs text-zinc-400 font-bold">معدل البت الموصى به (Video Bitrate):</div>
              <div className="text-4xl font-black text-white mt-1 flex items-baseline gap-2">
                <span>{finalBitrate.toLocaleString()}</span>
                <span className="text-sm font-bold text-cyan-400">Kbps</span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-1">
                التحكم بالبت: <strong className="text-white">CBR</strong> · الفاصل الزمني: <strong className="text-white">2s</strong>
              </div>
            </div>

            {/* Key Specs Card */}
            <div className="space-y-3 pt-3 border-t border-zinc-800 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">المشفر (Encoder):</span>
                <span className="font-bold text-white text-left dir-ltr">{recommendedEncoder}</span>
              </div>
              <div className="text-[11px] text-zinc-500 text-right">{encoderDetail}</div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-zinc-400">دقة الإخراج الفعلية:</span>
                <span className="font-bold text-emerald-400">{resolution} @ {framerate}fps</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-400">البريست (Preset):</span>
                <span className="font-bold text-white text-left dir-ltr">{presetName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-400">معدل بت الصوت:</span>
                <span className="font-bold text-cyan-300">160 Kbps (48 kHz)</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-400">فلتر تنعيم القياس:</span>
                <span className="font-bold text-white">Lanczos (36 samples)</span>
              </div>
            </div>

            {/* Audio Filters Box */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 space-y-2">
              <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>فلاتر الميكروفون الإلزامية:</span>
              </div>
              <ul className="text-[11px] text-zinc-400 space-y-1">
                <li>• <strong className="text-zinc-200">Noise Suppression:</strong> اختر RNNoise (ذكاء اصطناعي).</li>
                <li>• <strong className="text-zinc-200">Compressor:</strong> 4:1 لتسوية علو الصوت عند الصراخ.</li>
                <li>• <strong className="text-zinc-200">Limiter:</strong> -1.5 dB (يمنع طرش أذن المشاهد نهائياً).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
