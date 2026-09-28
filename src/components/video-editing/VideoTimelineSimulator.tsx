import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Scissors, 
  Type, 
  Volume2, 
  Sparkles, 
  Maximize2, 
  RotateCcw,
  CheckCircle2,
  Film,
  Layers,
  Zap,
  TrendingUp,
  Sliders
} from 'lucide-react';

interface VideoTimelineSimulatorProps {
  onCopyText?: (text: string, label: string) => void;
}

export const VideoTimelineSimulator: React.FC<VideoTimelineSimulatorProps> = ({ onCopyText }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  
  // Interactive Editing Toggles
  const [cutDeadAir, setCutDeadAir] = useState<boolean>(true);
  const [enablePunchIn, setEnablePunchIn] = useState<boolean>(true);
  const [enableCaptions, setEnableCaptions] = useState<boolean>(true);
  const [enableBroll, setEnableBroll] = useState<boolean>(true);
  const [enableAudioDucking, setEnableAudioDucking] = useState<boolean>(true);
  const [enableSFX, setEnableSFX] = useState<boolean>(true);

  // Playhead simulation timer
  React.useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 30) {
            setIsPlaying(false);
            return 0;
          }
          return Number((prev + 0.5).toFixed(1));
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const retentionScore = [
    cutDeadAir && 20,
    enablePunchIn && 15,
    enableCaptions && 25,
    enableBroll && 20,
    enableAudioDucking && 10,
    enableSFX && 10
  ].filter(Boolean).reduce((a: any, b: any) => a + b, 0);

  // Determine what's showing at currentTime
  const isPunchInActive = enablePunchIn && ((currentTime >= 4 && currentTime <= 9) || (currentTime >= 18 && currentTime <= 24));
  const isBrollActive = enableBroll && ((currentTime >= 10 && currentTime <= 14) || (currentTime >= 22 && currentTime <= 26));
  
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
              <Zap className="h-3.5 w-3.5" />
              <span>محاكي التايم لاين التفاعلي</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              مختبر هندسة التايم لاين (Interactive Timeline Simulator)
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              جرّب تفعيل وتعطيل طبقات المونتاج بنفسك: تقطيع الهواء الميت، التكبير التبادلي (Punch-in Zoom)، الترجمة الحركية، طبقات الـ B-roll، وهندسة الصوت، وشاهد تأثيرها اللحظي على شاشة الهاتف ونسبة استبقاء المشاهدين.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl shrink-0">
            <div className="text-left font-mono">
              <div className="text-xs text-zinc-400">معدل البقاء المتوقع:</div>
              <div className={`text-2xl font-black ${retentionScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {retentionScore}%
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Top: Interactive Editing Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-black text-white">طبقات وأدوات المونتاج في التايم لاين</h3>
              </div>
              <span className="text-xs text-zinc-500">انقر للتبديل وتجربة الفارق</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Toggle 1: Cut Dead Air */}
              <div
                onClick={() => setCutDeadAir(!cutDeadAir)}
                role="button"
                tabIndex={0}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer select-none flex items-start gap-3 ${
                  cutDeadAir
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
                }`}
              >
                <div className="mt-1">
                  {cutDeadAir ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Scissors className="h-4 w-4 text-zinc-500" />}
                </div>
                <div>
                  <div className="text-xs font-bold">1. تقطيع الهواء الميت (Jump Cut)</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">حذف السكتات والتنفس لإبقاء الكلام متدفقاً</div>
                </div>
              </div>

              {/* Toggle 2: Punch-In Zoom */}
              <div
                onClick={() => setEnablePunchIn(!enablePunchIn)}
                role="button"
                tabIndex={0}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer select-none flex items-start gap-3 ${
                  enablePunchIn
                    ? 'border-amber-500/50 bg-amber-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
                }`}
              >
                <div className="mt-1">
                  {enablePunchIn ? <CheckCircle2 className="h-4 w-4 text-amber-400" /> : <Maximize2 className="h-4 w-4 text-zinc-500" />}
                </div>
                <div>
                  <div className="text-xs font-bold">2. تقريب الكادر (Punch-in 115%)</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">تبديل الزوم لمنع الرتابة في المشهد</div>
                </div>
              </div>

              {/* Toggle 3: Kinetic Captions */}
              <div
                onClick={() => setEnableCaptions(!enableCaptions)}
                role="button"
                tabIndex={0}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer select-none flex items-start gap-3 ${
                  enableCaptions
                    ? 'border-amber-500/50 bg-amber-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
                }`}
              >
                <div className="mt-1">
                  {enableCaptions ? <CheckCircle2 className="h-4 w-4 text-amber-400" /> : <Type className="h-4 w-4 text-zinc-500" />}
                </div>
                <div>
                  <div className="text-xs font-bold">3. الترجمة الحركية (Captions)</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">كلمات ملونة متزامنة في المنطقة الآمنة</div>
                </div>
              </div>

              {/* Toggle 4: B-roll Layers */}
              <div
                onClick={() => setEnableBroll(!enableBroll)}
                role="button"
                tabIndex={0}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer select-none flex items-start gap-3 ${
                  enableBroll
                    ? 'border-blue-500/50 bg-blue-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
                }`}
              >
                <div className="mt-1">
                  {enableBroll ? <CheckCircle2 className="h-4 w-4 text-blue-400" /> : <Film className="h-4 w-4 text-zinc-500" />}
                </div>
                <div>
                  <div className="text-xs font-bold">4. لقطات الـ B-Roll التوضيحية</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">توضيح المعنى بلقطات الشاشة ومقاطع حية</div>
                </div>
              </div>

              {/* Toggle 5: Audio Ducking */}
              <div
                onClick={() => setEnableAudioDucking(!enableAudioDucking)}
                role="button"
                tabIndex={0}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer select-none flex items-start gap-3 ${
                  enableAudioDucking
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
                }`}
              >
                <div className="mt-1">
                  {enableAudioDucking ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Volume2 className="h-4 w-4 text-zinc-500" />}
                </div>
                <div>
                  <div className="text-xs font-bold">5. خفض الموسيقى (Audio Ducking)</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">موسيقى هادئة عند -22dB لا تشوش على الصوت</div>
                </div>
              </div>

              {/* Toggle 6: Sound Effects (SFX) */}
              <div
                onClick={() => setEnableSFX(!enableSFX)}
                role="button"
                tabIndex={0}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer select-none flex items-start gap-3 ${
                  enableSFX
                    ? 'border-purple-500/50 bg-purple-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
                }`}
              >
                <div className="mt-1">
                  {enableSFX ? <CheckCircle2 className="h-4 w-4 text-purple-400" /> : <Zap className="h-4 w-4 text-zinc-500" />}
                </div>
                <div>
                  <div className="text-xs font-bold">6. المؤثرات الصوتية (Whoosh & Pop)</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">أصوات إضافية متزامنة مع الحركات البصرية</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Multi-Track Timeline Diagram */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Layers className="h-4 w-4 text-amber-400" />
                <span>مخطط مسارات التايم لاين الحية (0:00 - 0:30)</span>
              </div>
              <div className="text-xs font-mono text-amber-400 font-bold">
                الوقت: {currentTime}s / 30.0s
              </div>
            </div>

            {/* Simulated Tracks */}
            <div className="space-y-2 font-mono text-[10px]">
              {/* V2: B-Roll Track */}
              <div className="flex items-center gap-2">
                <span className="w-10 text-zinc-500 font-bold shrink-0">V2</span>
                <div className="flex-1 h-7 bg-zinc-900 rounded-lg relative overflow-hidden flex items-center px-2 border border-zinc-800">
                  {enableBroll ? (
                    <>
                      <div className="absolute left-[33%] w-[13%] h-5 bg-blue-500/30 border border-blue-500/50 rounded flex items-center justify-center text-blue-300">
                        B-Roll: Screen
                      </div>
                      <div className="absolute left-[73%] w-[13%] h-5 bg-blue-500/30 border border-blue-500/50 rounded flex items-center justify-center text-blue-300">
                        B-Roll: Demo
                      </div>
                    </>
                  ) : (
                    <span className="text-zinc-600 text-[10px]">مسار فارغ</span>
                  )}
                  {/* Playhead Indicator */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-20 transition-all duration-300"
                    style={{ left: `${(currentTime / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* T1: Captions Track */}
              <div className="flex items-center gap-2">
                <span className="w-10 text-amber-400 font-bold shrink-0">T1</span>
                <div className="flex-1 h-7 bg-zinc-900 rounded-lg relative overflow-hidden flex items-center px-2 border border-zinc-800">
                  {enableCaptions ? (
                    <div className="w-full h-5 bg-amber-500/20 border border-amber-500/40 rounded flex items-center px-3 text-amber-300">
                      Kinetic Auto-Captions (Arabic Bold)
                    </div>
                  ) : (
                    <span className="text-zinc-600 text-[10px]">بدون ترجمة</span>
                  )}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-20 transition-all duration-300"
                    style={{ left: `${(currentTime / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* V1: Main Video Track */}
              <div className="flex items-center gap-2">
                <span className="w-10 text-emerald-400 font-bold shrink-0">V1</span>
                <div className="flex-1 h-7 bg-zinc-900 rounded-lg relative overflow-hidden flex items-center px-2 border border-zinc-800">
                  <div className="w-full h-5 bg-emerald-500/20 border border-emerald-500/40 rounded flex items-center justify-between px-3 text-emerald-300">
                    <span>Main Footage {isPunchInActive ? '(Zoom 115%)' : '(Normal 100%)'}</span>
                    {cutDeadAir && <span className="text-[9px] bg-emerald-500/30 px-1 rounded">No Dead Air</span>}
                  </div>
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-20 transition-all duration-300"
                    style={{ left: `${(currentTime / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* A1: Audio Speech */}
              <div className="flex items-center gap-2">
                <span className="w-10 text-zinc-400 font-bold shrink-0">A1</span>
                <div className="flex-1 h-7 bg-zinc-900 rounded-lg relative overflow-hidden flex items-center px-2 border border-zinc-800">
                  <div className="w-full h-4 bg-zinc-800 border border-zinc-700 rounded flex items-center px-3 text-zinc-300">
                    Voice Dialogue (-6dB Cleaned)
                  </div>
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-20 transition-all duration-300"
                    style={{ left: `${(currentTime / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* A2: Background Music */}
              <div className="flex items-center gap-2">
                <span className="w-10 text-zinc-500 font-bold shrink-0">A2</span>
                <div className="flex-1 h-7 bg-zinc-900 rounded-lg relative overflow-hidden flex items-center px-2 border border-zinc-800">
                  <div className="w-full h-4 bg-zinc-800/60 border border-zinc-700/60 rounded flex items-center px-3 text-zinc-400">
                    BGM: Upbeat Hip-Hop {enableAudioDucking ? '(-22dB Ducked)' : '(-10dB Loud)'}
                  </div>
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-20 transition-all duration-300"
                    style={{ left: `${(currentTime / 30) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Playback bar */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-black hover:bg-amber-400 transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'إيقاف مؤقت' : 'تشغيل محاكاة التايم لاين'}</span>
              </button>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentTime(0);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>إعادة للصفر</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Simulated Smartphone Screen (9:16 Frame) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[280px] sm:w-[310px] h-[560px] rounded-[40px] border-4 border-zinc-700 bg-black p-3 relative shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-800 rounded-full z-30" />

            {/* Screen Content */}
            <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 flex flex-col justify-between p-4">
              
              {/* Simulated Video Frame */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {isBrollActive ? (
                  <div className="w-full h-full bg-blue-950/80 flex flex-col items-center justify-center p-4 text-center space-y-2">
                    <Film className="h-10 w-10 text-blue-400 animate-pulse" />
                    <span className="text-xs font-black text-blue-200">لقطة B-Roll توضيحية</span>
                    <span className="text-[10px] text-blue-300">تسجيل شاشة الموقع العملي</span>
                  </div>
                ) : (
                  <div 
                    className={`w-full h-full bg-gradient-to-b from-zinc-800 via-zinc-850 to-zinc-900 flex flex-col items-center justify-center transition-all duration-300 ${
                      isPunchInActive ? 'scale-125' : 'scale-100'
                    }`}
                  >
                    <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 text-xl font-black mb-2">
                      👤
                    </div>
                    <span className="text-xs font-bold text-zinc-300">المتحدث الرئيسي</span>
                    {isPunchInActive && (
                      <span className="text-[10px] text-amber-400 font-mono font-bold mt-1 bg-black/60 px-2 py-0.5 rounded">
                        Punch-in Zoom (115%)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Safe Area Overlay Guide */}
              <div className="relative z-20 flex justify-between text-[10px] text-zinc-400 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm self-start">
                <span>0:{(currentTime < 10 ? '0' : '') + Math.floor(currentTime)}</span>
                <span className="mr-2 text-amber-400 font-bold">9:16 Short</span>
              </div>

              {/* Kinetic Captions in Center Safe Zone */}
              <div className="relative z-20 my-auto text-center px-2">
                {enableCaptions ? (
                  <div className="bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl inline-block border border-zinc-700/80 shadow-2xl">
                    <span className="text-xs font-black text-white leading-relaxed">
                      هذا الشيء هو <strong className="text-amber-400 text-sm">أفضل استثمار</strong> قمت به!
                    </span>
                  </div>
                ) : (
                  <span className="text-[10px] text-zinc-600 bg-black/40 px-2 py-1 rounded">بدون ترجمة</span>
                )}
              </div>

              {/* Platform Mock UI on Right */}
              <div className="relative z-20 flex justify-between items-end pb-2">
                <div className="space-y-1 text-[11px] text-white max-w-[170px]">
                  <div className="font-bold">@creator_account</div>
                  <div className="text-[10px] text-zinc-300 line-clamp-1">كيف تضاعف إنتاجيتك في المونتاج..</div>
                </div>

                <div className="flex flex-col items-center space-y-3 text-zinc-300 text-xs">
                  <div className="flex flex-col items-center">
                    <span className="text-base">❤️</span>
                    <span className="text-[9px] font-mono">14.2K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-base">💬</span>
                    <span className="text-[9px] font-mono">340</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-base">🔄</span>
                    <span className="text-[9px] font-mono">1.1K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
