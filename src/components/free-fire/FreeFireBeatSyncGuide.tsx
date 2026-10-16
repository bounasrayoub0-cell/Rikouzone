import React, { useState } from 'react';
import { Film, Music, Zap, Sliders, Play, Copy, Check, Sparkles, Volume2, Layers, Eye } from 'lucide-react';

interface SongPreset {
  name: string;
  genre: string;
  bpm: number;
  mood: string;
  recommendedWeapons: string;
  speedCurve: string;
}

const SONG_PRESETS: SongPreset[] = [
  {
    name: 'Phonk Aggressive (Kordhell / DVRST style)',
    genre: 'Drift Phonk',
    bpm: 130,
    mood: 'حماس ناري للمونتاجات السريعة للشوتغن (M1887)',
    recommendedWeapons: 'M1887 Double Shotgun + MAG-7',
    speedCurve: 'Bullet Curve: 0.2x قبل الطلقة -> 3.0x عند لحظة الإصابة -> 1.0x'
  },
  {
    name: 'Brazilian Funk / Montagem (Automotivo)',
    genre: 'Brazilian Phonk',
    bpm: 140,
    mood: 'إيقاع سريع جداً لحركات الالتفاف 360 ولقطات الرومات الفردية',
    recommendedWeapons: 'Desert Eagle + Woodpecker One-Tap',
    speedCurve: 'Flash Curve: 0.3x -> 2.8x -> 0.8x مع وميض أبيض عند كل ضربة'
  },
  {
    name: 'Dark Trap & Heavy 808 Bass',
    genre: 'Trap / Hip-Hop',
    bpm: 110,
    mood: 'ستايل هادئ وفخم يركز على نقاوة طلقة واحدة سينمائية بطيئة',
    recommendedWeapons: 'AWM Sniper Quickscope + M500',
    speedCurve: 'Heroic Curve: 0.1x Slow-Mo طويل -> 2.0x Snap مع اهتزاز قوي'
  }
];

export const FreeFireBeatSyncGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedSong, setSelectedSong] = useState<number>(0);
  const [copiedPreset, setCopiedPreset] = useState<boolean>(false);

  const currentSong = SONG_PRESETS[selectedSong];

  const handleCopyCC = () => {
    const ccText = `🎨 إعدادات ألوان فري فاير السينمائية (CapCut CC Preset):
- السطوع (Brightness): -5
- التباين (Contrast): +15
- التشبع (Saturation): +20
- التعرض (Exposure): +5
- الحدة (Sharpen): +30 (أساسي جداً لنقاوة السكنات)
- تسليط الضوء (Highlights): -10
- الظلال (Shadows): +10
- السواد المحيطي (Vignette): +12
✨ تم التوليد عبر منصة RikouZone`;

    navigator.clipboard.writeText(ccText);
    setCopiedPreset(true);
    setTimeout(() => setCopiedPreset(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-cyan-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/30">
              <Film className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-bold text-cyan-300">
                <Sparkles className="h-3 w-3" />
                <span>دليل وهندسة المونتاج الإيقاعي على CapCut وAlight Motion</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                دليل وتايملاين مونتاج الـ Beat Sync ومنحنيات السرعة (Speed Curve)
              </h2>
            </div>
          </div>
          <button
            onClick={handleCopyCC}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2.5 text-xs font-black text-black hover:from-cyan-400 hover:to-blue-400 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            {copiedPreset ? (
              <>
                <Check className="h-4 w-4" />
                <span>تم نسخ إعدادات الألوان CC!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>نسخ إعدادات تدرج الألوان (Color Grading)</span>
              </>
            )}
          </button>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          تعلم الهندسة الدقيقة لتطابق ضربة الباس مع لحظة خروج الرصاصة الحمراء، وضبط منحنى السرعة السلس لتفادي التقطيع وتحويل لقطاتك العادية إلى عمل فني يحصد ملايين المشاهدات.
        </p>
      </div>

      {/* Interactive Step Timeline */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg">
        <h3 className="text-sm font-black text-white flex items-center gap-2 mb-4">
          <Zap className="h-4 w-4 text-cyan-400" />
          <span>المراحل الأربع لبناء لقطة ون تاب فيروسية متزامنة</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-5">
          {[
            { step: 1, title: '1. استيراد وتحديد الضربات', sub: 'Beats & Markers' },
            { step: 2, title: '2. منحنى السرعة السلس', sub: 'Speed Curve (0.3x -> 3x)' },
            { step: 3, title: '3. الاهتزاز والوميض', sub: 'Shake & White Flash' },
            { step: 4, title: '4. هندسة الصوت والألوان', sub: 'SFX Bass & CC Preset' }
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`p-3 rounded-xl text-right transition-all cursor-pointer border ${
                activeStep === item.step
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-white font-black shadow-lg shadow-cyan-500/10'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              <div className="text-xs font-bold text-cyan-400">{item.title}</div>
              <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{item.sub}</div>
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <div className="p-4 sm:p-5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 space-y-3">
          {activeStep === 1 && (
            <div>
              <h4 className="text-sm font-black text-white mb-2">المرحلة الأولى: ترويض المسار الصوتي وتوليد النقاط الصفراء</h4>
              <p className="text-xs leading-relaxed text-zinc-300">
                في CapCut، أنشئ مشروعاً رأسياً 9:16. استورد الأغنية الحماسية. اضغط على شريط الصوت واختر <span className="text-cyan-400 font-bold">Beats</span> ثم <span className="text-cyan-400 font-bold">Auto-generate</span> أو اضغط يدوياً عند كل ضربة طبلة قوية (Drop). هذه النقاط الصفراء هي التي ستلصق عندها بالضبط فريم إصابة الرأس.
              </p>
              <div className="mt-3 p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-200">
                💡 <span className="font-bold">نصيحة ذهبية:</span> كبر خط التايم لاين بإصبعيك إلى أقصى حد للتأكد من أن رأس الطلقة لا يسبق النقطة الصفراء بفريم واحد.
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <h4 className="text-sm font-black text-white mb-2">المرحلة الثانية: تطبيق منحنى السرعة المخصص (Custom Speed Curve)</h4>
              <p className="text-xs leading-relaxed text-zinc-300">
                حدد مقطع اللقطة ← Speed ← Curve ← Custom. ضع 5 نقاط تحكم:
                <br />
                • النقطة 1 (قبل القفز): سرعة 1.0x عادية
                <br />
                • النقطة 2 (أثناء سحب السلاح): اخفض السرعة إلى 0.3x لتشويق المشاهد
                <br />
                • النقطة 3 (لحظة طلقة الهيد شوت والدم الأحمر): ارفع السرعة فجأة إلى 2.5x أو 3.0x لصنع صدمة بصرية سريعة
                <br />
                • النقطة 4 و5 (بعد سقوط الخصم): أعد السرعة تدريجياً إلى 1.0x
              </p>
              <div className="mt-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-200">
                ⚡ <span className="font-bold">تفعيل التدفق الضوئي (Optical Flow):</span> اضغط على خيار "Make it smoother" واختر "Better Quality" ليصبح التبطيء بنعومة 240FPS خرافية بدون أي تقطيع.
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div>
              <h4 className="text-sm font-black text-white mb-2">المرحلة الثالثة: صدمة الاهتزاز والوميض الضوئي (Shake & Flash)</h4>
              <p className="text-xs leading-relaxed text-zinc-300">
                عند لحظة طلقة الهيد شوت، أضف تأثير الاهتزاز (Video Effects ← Nightclub ← Oblique Shake) بقوة 30 وسرعة 70 لمدة 0.2 ثانية فقط. في نفس اللحظة، أضف طبقة بيضاء (Overlay) بنمط دمج Overlay وتلاشي سريع (Fade Out) لصنع وميض خاطف يحاكي فلاش طلقة الشوتغن.
              </p>
            </div>
          )}

          {activeStep === 4 && (
            <div>
              <h4 className="text-sm font-black text-white mb-2">المرحلة الرابعة: هندسة المؤثرات الصوتية وتصحيح الألوان المتوهج</h4>
              <p className="text-xs leading-relaxed text-zinc-300">
                اكتم صوت اللقطة الأصلي المشوش، وأضف في مسار الصوت مؤثرات خارجية بجودة استوديو: صوت تلقيم السلاح (Gun Reload SFX) قبل القفز، وصوت انفجار الشوتغن الثقيل (Heavy Shotgun Bass) مع صوت رنين إصابة الرأس (Headshot Hitmarker). ثم طبق فلتر الألوان الحاد (Sharpen +30 و Saturation +20).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Preset Music Library */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg">
        <h3 className="text-sm font-black text-white flex items-center gap-2 mb-4">
          <Music className="h-4 w-4 text-cyan-400" />
          <span>أنماط الموسيقى الفيروسية الأكثر استخداماً في تريندات فري فاير</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SONG_PRESETS.map((song, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedSong(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedSong === idx
                  ? 'bg-cyan-500/10 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'bg-zinc-950/70 border-zinc-800 hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-black text-white">{song.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                  {song.bpm} BPM
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-2">{song.mood}</div>
              <div className="mt-3 pt-2 border-t border-zinc-800 text-[11px] space-y-1">
                <div className="text-cyan-300">
                  <span className="font-bold">السلاح الأنسب:</span> {song.recommendedWeapons}
                </div>
                <div className="text-zinc-400 text-[10px]">
                  <span className="font-bold text-zinc-300">المنحنى:</span> {song.speedCurve}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
