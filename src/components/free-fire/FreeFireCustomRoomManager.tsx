import React, { useState } from 'react';
import { Trophy, Users, Shield, Copy, Check, Sparkles, AlertTriangle, Swords, ShieldCheck, Flame, Gift } from 'lucide-react';

export const FreeFireCustomRoomManager: React.FC = () => {
  const [tournamentMode, setTournamentMode] = useState<'clash-4v4' | 'duel-1v1' | 'br-solo'>('clash-4v4');
  const [rounds, setRounds] = useState<number>(13);
  const [limitedAmmo, setLimitedAmmo] = useState<boolean>(false);
  const [gunAttributes, setGunAttributes] = useState<boolean>(false);
  const [characterSkills, setCharacterSkills] = useState<boolean>(true);
  const [grenadesAllowed, setGrenadesAllowed] = useState<boolean>(false);
  const [roofCamping, setRoofCamping] = useState<boolean>(false);
  const [prizeDiamonds, setPrizeDiamonds] = useState<number>(1000);
  const [copied, setCopied] = useState<boolean>(false);

  const generateRuleSheet = () => {
    const modeName =
      tournamentMode === 'clash-4v4'
        ? 'كلاش سكواد 4 ضد 4 (Clash Squad)'
        : tournamentMode === 'duel-1v1'
        ? 'تحدي ون تاب فردي 1 ضد 1 (1v1 One Tap Duel)'
        : 'باتل رويال النجاة الفردي (Battle Royale Solo)';

    return `🔥 لائحة قوانين وإعدادات بطولة الروم الرسمية: [${modeName}] 🔥
━━━━━━━━━━━━━━━━━━━━━━
🎮 إعدادات الروم داخل اللعبة:
• عدد الجولات: ${rounds} جولة
• الذخيرة المحدودة (Limited Ammo): ${limitedAmmo ? 'نعم (محدودة)' : 'لا (ذخيرة وجدران ثلجية غير محدودة)'}
• خصائص الأسلحة (Gun Attributes): ${gunAttributes ? 'مفعلة' : 'ملغاة تماماً (لضمان عدالة المهارة)'}
• مهارات الشخصيات: ${characterSkills ? 'مسموحة' : 'ممنوعة (لعب كلاسيكي نقي)'}

⛔ القواعد الصارمة والخطوط الحمراء:
• القنابل اليدوية والغاز: ${grenadesAllowed ? 'مسموحة' : 'ممنوعة منعاً باتاً (استخدامها = طرد فوري)'}
• الصعود فوق أسطح المباني: ${roofCamping ? 'مسموح' : 'ممنوع (المواجهة على مستوى الأرض فقط)'}
• التحالف أو الغش أو استخدام أي سكريبت: حظر نهائي من جميع بطولات القناة.

💎 الجوائز المعتمدة:
• المركز الأول: ${Math.round(prizeDiamonds * 0.7)} جوهرة فري فاير رسمية 🏆
• المركز الثاني: ${Math.round(prizeDiamonds * 0.3)} جوهرة فري فاير رسمية 🥈

✨ شروط المشاركة: الحضور في البث المباشر وتأكيد الـ UID في الشات.
منظم البطولة: مجتمع RikouZone لصناع المحتوى`;
  };

  const handleCopyRules = () => {
    navigator.clipboard.writeText(generateRuleSheet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-purple-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/30">
              <Trophy className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 px-2.5 py-0.5 text-xs font-bold text-purple-300">
                <Sparkles className="h-3 w-3" />
                <span>أداة تنظيم وتخطيط رومات التحدي التنافسية</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                منظم ومحاكي بطولات الرومات المخصصة (Custom Rooms)
              </h2>
            </div>
          </div>
          <button
            onClick={handleCopyRules}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2.5 text-xs font-black text-white hover:from-purple-400 hover:to-indigo-400 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>تم نسخ القوانين للمشاركة!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>نسخ منشور البطولة للديسكورد/الواتساب</span>
              </>
            )}
          </button>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          اضبط قواعد الروم الاحترافية، ووزع جوائز الجواهر العادلة، وولد منشور القوانين الصارمة الجاهز للنشر في سيرفر الديسكورد ومجموعات المتابعين لمنع الخلافات وضمان حماس لا ينتهي في البث.
        </p>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Mode Selector */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <label className="text-xs font-bold text-zinc-400 mb-2 block flex items-center gap-1.5">
            <Swords className="h-4 w-4 text-purple-400" />
            <span>نمط وطبيعة البطولة</span>
          </label>
          <div className="space-y-2">
            {[
              { id: 'clash-4v4', name: 'كلاش سكواد 4 ضد 4 (فرق)' },
              { id: 'duel-1v1', name: 'تحدي ون تاب فردي 1 ضد 1' },
              { id: 'br-solo', name: 'باتل رويال جماعي (48 لاعباً)' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setTournamentMode(m.id as any)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold text-right transition-all cursor-pointer ${
                  tournamentMode === m.id
                    ? 'bg-purple-600 text-white font-black shadow-md shadow-purple-600/30'
                    : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tactical Rules Switches */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 space-y-3">
          <label className="text-xs font-bold text-zinc-400 block flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-indigo-400" />
            <span>إعدادات ميكانيكا القتال</span>
          </label>

          <button
            onClick={() => setLimitedAmmo(!limitedAmmo)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-between cursor-pointer ${
              !limitedAmmo ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            <span>ذخيرة وجدران غير محدودة (Unlimited)</span>
            <span className="text-[10px] font-mono">{!limitedAmmo ? 'مفعل' : 'محدود'}</span>
          </button>

          <button
            onClick={() => setGunAttributes(!gunAttributes)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-between cursor-pointer ${
              !gunAttributes ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}
          >
            <span>إلغاء خصائص سكنات الأسلحة (Gun Attributes: NO)</span>
            <span className="text-[10px] font-mono">{!gunAttributes ? 'عادل (بدون خصائص)' : 'خصائص مفعلة'}</span>
          </button>

          <button
            onClick={() => setCharacterSkills(!characterSkills)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-between cursor-pointer ${
              characterSkills ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            <span>مهارات الشخصيات (Character Skills)</span>
            <span className="text-[10px] font-mono">{characterSkills ? 'مسموحة' : 'معطلة'}</span>
          </button>
        </div>

        {/* Fair Play & Prize Pool */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 space-y-3">
          <label className="text-xs font-bold text-zinc-400 block flex items-center gap-1.5">
            <Gift className="h-4 w-4 text-amber-400" />
            <span>مجموع جوائز الجواهر (Diamonds)</span>
          </label>

          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-zinc-300">الجواهر المرصودة:</span>
            <span className="text-base font-black text-amber-400 font-mono">
              💎 {prizeDiamonds.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min={300}
            max={5000}
            step={100}
            value={prizeDiamonds}
            onChange={(e) => setPrizeDiamonds(Number(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-zinc-950 rounded-lg cursor-pointer"
          />

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] space-y-1">
            <div className="flex justify-between text-zinc-300">
              <span>المركز الأول (70%):</span>
              <span className="font-mono text-amber-300 font-bold">{Math.round(prizeDiamonds * 0.7)} جوهرة</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>المركز الثاني (30%):</span>
              <span className="font-mono text-zinc-300 font-bold">{Math.round(prizeDiamonds * 0.3)} جوهرة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Rules Preview */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span>معاينة نص القوانين الجاهز للنشر والمشاركة</span>
          </h3>
          <span className="text-[11px] text-zinc-400">
            جاهز للنسخ إلى Discord / WhatsApp / Instagram
          </span>
        </div>
        <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap overflow-x-auto">
          {generateRuleSheet()}
        </pre>
      </div>
    </div>
  );
};
