import React, { useState } from 'react';
import { 
  Download, 
  Settings, 
  Copy, 
  Check, 
  Sliders, 
  Smartphone, 
  Layers, 
  Info,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { exportPresetsList, ExportPreset } from '../../data/videoEditingToolsData';

interface VideoExportPresetsToolProps {
  onCopyText?: (text: string, label: string) => void;
}

export const VideoExportPresetsTool: React.FC<VideoExportPresetsToolProps> = ({ onCopyText }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>(exportPresetsList[0].platform);
  const [videoDurationSeconds, setVideoDurationSeconds] = useState<number>(45);
  const [copied, setCopied] = useState<boolean>(false);

  const activePreset = exportPresetsList.find(p => p.platform === selectedPlatform) || exportPresetsList[0];

  // Estimated file size calculation (MB) = (Bitrate in Mbps * seconds) / 8
  const estimatedBitrateNum = parseInt(activePreset.bitrate.split('-')[0]) || 16;
  const estimatedSizeMB = Math.round((estimatedBitrateNum * videoDurationSeconds) / 8);

  const handleCopySettings = () => {
    const text = `إعدادات التصدير الموصى بها لـ ${activePreset.platform}:
- النسبة والأبعاد: ${activePreset.aspectRatio} (${activePreset.resolution})
- معدل الإطارات: ${activePreset.frameRate}
- صيغة الترميز: ${activePreset.format}
- معدل البت ريت: ${activePreset.bitrate}
- إعدادات الصوت: ${activePreset.audioSettings}
- ملاحظات هامة: ${activePreset.notes}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onCopyText) onCopyText('تم نسخ إعدادات التصدير بنجاح!', 'إعدادات المونتاج');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
              <Settings className="h-3.5 w-3.5" />
              <span>حاسبة إعدادات التصدير والجودة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              أسرار التصدير فائق الوضوح (Export Settings & Safe Areas)
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              تجنب ضغط المنصات العنيف وضبابية الصورة. اختر منصتك المستهدفة واكتشف الأبعاد ومعدل الإطارات والبت ريت المثالي للحصول على فيديو كريستالي نقي على شاشات الهواتف.
            </p>
          </div>

          <button
            onClick={handleCopySettings}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-black hover:bg-amber-400 transition-all cursor-pointer shadow-md shadow-amber-500/20 shrink-0 self-start md:self-auto"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'تم النسخ!' : 'نسخ الإعدادات للبرنامج'}</span>
          </button>
        </div>

        {/* Platform Tabs */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap gap-2">
          {exportPresetsList.map(preset => (
            <button
              key={preset.platform}
              onClick={() => setSelectedPlatform(preset.platform)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedPlatform === preset.platform
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {preset.platform}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Settings Panel & Calculator */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-5">
            <h3 className="text-base font-black text-white">
              إعدادات الريندر لـ <span className="text-amber-400">{activePreset.platform}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1">
                <span className="text-[11px] font-bold text-zinc-400 block">الأبعاد والنسبة (Aspect Ratio):</span>
                <span className="text-sm font-black font-mono text-white">{activePreset.resolution}</span>
                <span className="text-xs text-amber-400 block">{activePreset.aspectRatio}</span>
              </div>

              <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1">
                <span className="text-[11px] font-bold text-zinc-400 block">معدل الإطارات (Frame Rate):</span>
                <span className="text-sm font-black font-mono text-white">{activePreset.frameRate}</span>
                <span className="text-[11px] text-zinc-400 block">30fps للكلام العادي، 60fps للحركة السريعة</span>
              </div>

              <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1">
                <span className="text-[11px] font-bold text-zinc-400 block">معدل البت ريت (Bitrate):</span>
                <span className="text-sm font-black font-mono text-emerald-400">{activePreset.bitrate}</span>
                <span className="text-[11px] text-zinc-400 block">التوازن الذهبي ضد ضغط المنصات</span>
              </div>

              <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1">
                <span className="text-[11px] font-bold text-zinc-400 block">الترميز والصيغة (Codec & Format):</span>
                <span className="text-sm font-black font-mono text-white">{activePreset.format}</span>
                <span className="text-[11px] text-zinc-400 block">{activePreset.audioSettings}</span>
              </div>
            </div>

            {/* Duration Slider & File Size Calculator */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-300">مدة الفيديو التقديرية:</span>
                <span className="text-amber-400 font-mono">{videoDurationSeconds} ثانية</span>
              </div>
              <input
                type="range"
                min="10"
                max="180"
                step="5"
                value={videoDurationSeconds}
                onChange={(e) => setVideoDurationSeconds(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/80 pt-2">
                <span>الحجم المتوقع للملف:</span>
                <span className="font-mono text-emerald-400 font-bold text-sm">~{estimatedSizeMB} MB</span>
              </div>
            </div>

            {/* Platform Specific Warning */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Info className="h-4 w-4" />
                <span>نصيحة المنصة:</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {activePreset.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Safe Area Interactive Visualizer */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[280px] sm:w-[310px] h-[550px] rounded-[40px] border-4 border-zinc-700 bg-black p-3 relative shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Safe Area Guides */}
            <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-zinc-900 border border-zinc-800 flex flex-col justify-between p-3">
              {/* Top danger zone */}
              <div className="rounded-xl border border-dashed border-rose-500/40 bg-rose-500/10 p-2 text-center text-[10px] text-rose-300">
                منطقة خطرة (شريط البحث وأزرار النظام) ⚠️
              </div>

              {/* Center Safe Zone */}
              <div className="my-auto rounded-2xl border-2 border-emerald-500/60 bg-emerald-500/10 p-4 text-center space-y-2 shadow-inner">
                <span className="text-[11px] font-black text-emerald-300 block uppercase tracking-wider">
                  ✅ المنطقة الآمنة 100% (Safe Zone)
                </span>
                <p className="text-[10px] text-zinc-300 leading-relaxed">
                  هنا توضع الترجمة (Captions) والنصوص الرئيسية والوجوه والمنتجات لتضمن رؤيتها بوضوح على كافة الهواتف.
                </p>
              </div>

              {/* Bottom & side danger zones */}
              <div className="space-y-2">
                <div className="rounded-xl border border-dashed border-rose-500/40 bg-rose-500/10 p-2 text-center text-[10px] text-rose-300">
                  منطقة خطرة (العنوان، اسم الحساب، والموسيقى) ⚠️
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
