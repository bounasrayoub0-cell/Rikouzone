import React, { useState, useEffect, useMemo } from 'react';
import { FileText, Sparkles, Copy, Check, RefreshCw, Clock, AlertCircle, Save, Download, HelpCircle, Layers } from 'lucide-react';

interface ScriptDraft {
  hook: string;
  problem: string;
  coreValue: string;
  proof: string;
  cta: string;
  onScreenText: string;
}

const PRESET_HOOKS = [
  {
    type: 'نفي معتقد شائع',
    text: '90% من الناس يستخدمون هذا التطبيق بطريقة خاطئة تماماً، وإليك كيف تستفيد منه صح...'
  },
  {
    type: 'سؤال محير وصادم',
    text: 'لماذا منعت الشركات الكبرى موظفيها من استخدام هذا الموقع السري؟'
  },
  {
    type: 'تحذير فوري',
    text: 'إذا كنت تشتري هذا المنتج عبر الإنترنت، توقف فوراً وشاهد هذه المعلومة...'
  },
  {
    type: 'غموض وقصة سريعة',
    text: 'في عام 1974، اختفى رجل ومعه حقيبة فيها ملايين الدولارات، والسر بدأ هنا...'
  },
  {
    type: 'توفير الوقت والمال',
    text: 'هذه الأداة المجانية وفرت علي 4 ساعات من المونتاج الشاق كل أسبوع...'
  }
];

export const FacelessTiktokHookScriptBuilder: React.FC = () => {
  const [draft, setDraft] = useState<ScriptDraft>({
    hook: 'توقف عن دفع 50 دولاراً شهرياً؛ هذا الموقع المجاني يفعل نفس الشيء بنقرة واحدة...',
    problem: 'أغلبنا يضيع ساعات طويلة كل أسبوع في تفريغ المحاضرات أو تلخيص الكتب يدوياً.',
    coreValue: 'هذا الامتداد يقرأ لك الملف كاملاً، ويستخرج أهم 5 نقاط رئيسية، ويكتب لك ملخصاً باللغة العربية الفصحى في 30 ثانية.',
    proof: 'جربت الأداة بنفسي على كتاب من 200 صفحة، وكانت النتيجة دقيقة ومبهرة بدون أي خطأ لغوي.',
    cta: 'اكتب في التعليقات اسم كتاب ترغب في تلخيصه لأرسل لك الرابط فوراً.',
    onScreenText: 'موقع سري | ملخص في 30 ثانية | مجاني 100%'
  });

  const [copied, setCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('faceless_tiktok_script_draft_v1');
      if (stored) {
        setDraft(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load draft from localStorage', e);
    }
  }, []);

  const totalWords = useMemo(() => {
    const combined = `${draft.hook} ${draft.problem} ${draft.coreValue} ${draft.proof} ${draft.cta}`;
    return combined.trim().split(/\s+/).filter(Boolean).length;
  }, [draft]);

  // ~130 words per minute => ~2.16 words per second
  const estimatedSeconds = useMemo(() => {
    return Math.max(5, Math.round(totalWords / 2.16));
  }, [totalWords]);

  const handleFieldChange = (field: keyof ScriptDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyPresetHook = (hookText: string) => {
    setDraft((prev) => ({ ...prev, hook: hookText }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem('faceless_tiktok_script_draft_v1', JSON.stringify(draft));
    setSaveStatus('تم حفظ المسودة محلياً في جهازك!');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleCopyFullScript = () => {
    const text = `📜 سكريبت فيديو TikTok كامل (المدة التقديرية: ${estimatedSeconds} ثانية | ${totalWords} كلمة)

1️⃣ الخطاف (0-3 ثوانٍ):
"${draft.hook}"

2️⃣ المدخل والمشكلة (3-8 ثوانٍ):
"${draft.problem}"

3️⃣ القيمة والمعلومة المركزة (8-20 ثانية):
"${draft.coreValue}"

4️⃣ الإثبات أو المثال الداعم (20-27 ثانية):
"${draft.proof}"

5️⃣ الـ CTA والخاتمة الطبيعية (27-30 ثانية):
"${draft.cta}"

📺 النصوص المتحركة المقترحة على الشاشة:
"${draft.onScreenText}"`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetToExample = () => {
    setDraft({
      hook: 'توقف عن دفع 50 دولاراً شهرياً؛ هذا الموقع المجاني يفعل نفس الشيء بنقرة واحدة...',
      problem: 'أغلبنا يضيع ساعات طويلة كل أسبوع في تفريغ المحاضرات أو تلخيص الكتب يدوياً.',
      coreValue: 'هذا الامتداد يقرأ لك الملف كاملاً، ويستخرج أهم 5 نقاط رئيسية، ويكتب لك ملخصاً باللغة العربية الفصحى في 30 ثانية.',
      proof: 'جربت الأداة بنفسي على كتاب من 200 صفحة، وكانت النتيجة دقيقة ومبهرة بدون أي خطأ لغوي.',
      cta: 'اكتب في التعليقات اسم كتاب ترغب في تلخيصه لأرسل لك الرابط فوراً.',
      onScreenText: 'موقع سري | ملخص في 30 ثانية | مجاني 100%'
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mb-3">
              <FileText className="h-3.5 w-3.5" />
              <span>منشئ Hook وسكريبت TikTok الاحترافي</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              هندسة السكريبت القصير وفق معادلة الـ 30 ثانية الذهبية
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              اكتب سكريبتك مقسماً إلى الأجزاء الخمسة الحيوية التي تحافظ على استبقاء المشاهدين من أول ثانية حتى الختام، مع عداد الكلمات ومؤشر الوقت التقديري ونصوص الشاشة.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap gap-3">
            <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-2xl p-3 text-center min-w-[110px]">
              <div className="text-xs text-zinc-400">عدد الكلمات</div>
              <div className="text-xl font-black text-white">{totalWords} كلمة</div>
            </div>
            <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-2xl p-3 text-center min-w-[110px]">
              <div className="text-xs text-zinc-400">المدة التقديرية</div>
              <div className={`text-xl font-black ${estimatedSeconds <= 40 ? 'text-emerald-400' : 'text-amber-400'}`}>
                ~{estimatedSeconds} ثانية
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Hooks Selector */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-300">قوالب خطافات سريعة (انقر لاختيارها كافتتاحية فوراً):</span>
          <span className="text-[11px] text-zinc-500">اختر نموذجاً لتجربته في الحقل الأول</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {PRESET_HOOKS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPresetHook(preset.text)}
              className="text-right p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all text-xs text-zinc-300 group cursor-pointer"
            >
              <div className="text-[10px] font-bold text-emerald-400 mb-1">{preset.type}</div>
              <div className="line-clamp-2 leading-relaxed">"{preset.text}"</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Script Editor Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          {/* Part 1: Hook */}
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[11px]">1</span>
                <span>الخطاف الافتتاحي (Hook · 0 إلى 3 ثوانٍ)</span>
              </label>
              <span className="text-[11px] text-zinc-500">يجب أن يمنع التمرير السريع فوراً</span>
            </div>
            <textarea
              rows={2}
              value={draft.hook}
              onChange={(e) => handleFieldChange('hook', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              placeholder="اكتب هنا جملة الافتتاح الصادمة أو السؤال المحير..."
            />
          </div>

          {/* Part 2: Problem */}
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[11px]">2</span>
                <span>المدخل وتقديم المشكلة (3 إلى 8 ثوانٍ)</span>
              </label>
              <span className="text-[11px] text-zinc-500">توضيح ألم المشاهد أو سياق الموقف</span>
            </div>
            <textarea
              rows={2}
              value={draft.problem}
              onChange={(e) => handleFieldChange('problem', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              placeholder="صف المشكلة التي يعاني منها المتابع باختصار..."
            />
          </div>

          {/* Part 3: Core Value */}
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[11px]">3</span>
                <span>القيمة أو القصة المركزة (8 إلى 20 ثانية)</span>
              </label>
              <span className="text-[11px] text-zinc-500">صلب المعلومة أو الحل دون حشو</span>
            </div>
            <textarea
              rows={3}
              value={draft.coreValue}
              onChange={(e) => handleFieldChange('coreValue', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              placeholder="اشرح الحل أو الخطوات أو المعلومة الأساسية..."
            />
          </div>

          {/* Part 4: Proof / Illustration */}
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[11px]">4</span>
                <span>الإثبات أو المثال التوضيحي (20 إلى 27 ثانية)</span>
              </label>
              <span className="text-[11px] text-zinc-500">دليل سريع، رقم، أو تجربة واقعية</span>
            </div>
            <textarea
              rows={2}
              value={draft.proof}
              onChange={(e) => handleFieldChange('proof', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              placeholder="قدم دليلاً أو مثالاً يدعم كلامك..."
            />
          </div>

          {/* Part 5: CTA */}
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-[11px]">5</span>
                <span>الخاتمة والـ Call to Action الطبيعي (27 إلى 30 ثانية)</span>
              </label>
              <span className="text-[11px] text-zinc-500">سؤال يفتح نقاشاً أو دعوة لرابط البايو</span>
            </div>
            <input
              type="text"
              value={draft.cta}
              onChange={(e) => handleFieldChange('cta', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              placeholder="اكتب هنا دعوتك الطبيعية للتفاعل أو المتابعة..."
            />
          </div>

          {/* On-Screen Text Field */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                <span>النصوص البارزة على الشاشة (On-Screen Kinetic Text)</span>
              </label>
              <span className="text-[11px] text-zinc-500">نصوص قصيرة تظهر في منتصف الشاشة</span>
            </div>
            <input
              type="text"
              value={draft.onScreenText}
              onChange={(e) => handleFieldChange('onScreenText', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              placeholder="مثال: موقع سري | أداة مجانية | قبل الحذف"
            />
          </div>
        </div>

        {/* Live Preview & Actions Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 space-y-4 sticky top-6">
            <h3 className="text-sm font-black text-white flex items-center justify-between">
              <span>معاينة السكريبت المجمع</span>
              <span className="text-[11px] text-zinc-500 font-normal">جاهز للإلقاء</span>
            </h3>

            {/* Simulated TikTok Preview Frame */}
            <div className="rounded-2xl border border-zinc-700/60 bg-black/90 p-4 space-y-3 font-sans text-xs text-zinc-300 leading-relaxed max-h-[360px] overflow-y-auto">
              <div>
                <span className="text-amber-400 font-bold block mb-1">🪝 الخطاف:</span>
                "{draft.hook}"
              </div>
              <div>
                <span className="text-cyan-400 font-bold block mb-1">⚡ المشكلة:</span>
                "{draft.problem}"
              </div>
              <div>
                <span className="text-emerald-400 font-bold block mb-1">💡 القيمة المركزة:</span>
                "{draft.coreValue}"
              </div>
              <div>
                <span className="text-purple-400 font-bold block mb-1">🔍 الإثبات:</span>
                "{draft.proof}"
              </div>
              <div>
                <span className="text-rose-400 font-bold block mb-1">📣 الـ CTA:</span>
                "{draft.cta}"
              </div>
            </div>

            {/* Timing Guidance */}
            <div className="p-3.5 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-bold text-zinc-300">
                <span>سرعة الإلقاء المقترحة:</span>
                <span className="text-cyan-400">~2 كلمة في الثانية</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {totalWords > 85 ? (
                  <span className="text-amber-400">⚠️ تنبيه: عدد الكلمات يتجاوز 85 كلمة؛ قد تحتاج لتقليم بعض الجمل لضمان بقاء الفيديو تحت 40 ثانية.</span>
                ) : (
                  <span className="text-emerald-400">✓ طول السكريبت مثالي جداً للاستبقاء ومعدل الإكمال العالي (أقل من 35 ثانية).</span>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleCopyFullScript}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'تم نسخ السكريبت كاملاً!' : 'نسخ السكريبت الكامل'}</span>
              </button>

              <button
                onClick={handleSaveDraft}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Save className="h-4 w-4 text-cyan-400" />
                <span>حفظ المسودة في المتصفح</span>
              </button>

              <button
                onClick={handleResetToExample}
                className="w-full py-2 text-center text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                استعادة النموذج التجريبي الافتراضي
              </button>

              {saveStatus && (
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-center text-xs font-bold animate-in fade-in">
                  {saveStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
