import React, { useState } from 'react';
import { 
  User, 
  Target, 
  AlertCircle, 
  Sparkles, 
  Check, 
  Copy, 
  Heart, 
  ShieldAlert, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface CopywritingAvatarGeneratorProps {
  onCopyText?: (text: string) => void;
}

export const CopywritingAvatarGenerator: React.FC<CopywritingAvatarGeneratorProps> = ({ onCopyText }) => {
  const presets = [
    {
      label: 'مشتري أدوات إنتاجية / موظف مضغوط',
      name: 'سامي - موظف شركة تقنية',
      demographics: 'عمره 28-35 عاماً، يعمل عن بعد 8-10 ساعات يومياً، يعيش في مدينة مزدحمة.',
      painPoints: 'يغرق في تشتت الإشعارات وتأجيل المهام الكبرى، يعود لمنزله منهك الطاقة ويشعر بالذنب أن يومه ضاع في توافه الأمور.',
      desires: 'إنهاء مهامه المركزة في 4 ساعات نهاراً، وامتلاك وقت فراغ هادئ لعائلته وممارسة هواياته دون قلق من العمل.',
      objections: 'جربت عشرات التطبيقات المعقدة وتركتها بعد 3 أيام؛ لا أريد قضاء وقت إضافي في تعلم أداة جديدة.',
      buyingTrigger: 'أداة فورية تفرز المهام وتعمل بضغطة زر مع ضمان تجربة مجانية دون إدخال بيانات الدفع.'
    },
    {
      label: 'صاحبة متجر إلكتروني ناشئ',
      name: 'نورة - رائدة أعمال في العطور والشموع',
      demographics: 'عمرها 25-32 عاماً، بدأت متجرها عبر إنستغرام وتوسعت لمتجر سلة/زد.',
      painPoints: 'تنفق ميزانية في إعلانات سناب وتيك توك لكن الزوار يدخلون المتجر ولا يكملون الشراء؛ مبيعاتها غير مستقرة.',
      desires: 'مبيعات يومية متكررة تغطي تكاليف التسويق وتترك لها ربحاً صافياً يتيح لها التفرغ لتطوير منتجات جديدة.',
      objections: 'أسعار وكالات التسويق مبالغ فيها، وأخاف أن أدفع لكوبي رايتر دون أن يرتفع معدل التحويل الحقيقي.',
      buyingTrigger: 'كوبي رايتر يقدم تدقيقاً سريعاً مجانياً لصفحتها، ويقترح نصوصاً مبنية على تجارب عملاء واقعية مع سياسة تعديل مرنة.'
    }
  ];

  const [avatar, setAvatar] = useState(presets[0]);
  const [copied, setCopied] = useState(false);

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setAvatar(preset);
  };

  const compiledSummary = `بطاقة العميل المستهدف (Customer Persona Blueprint):
--------------------------------------------------
الاسم والوصف: ${avatar.name}
الخصائص والديموغرافيا: ${avatar.demographics}

نقاط الألم والمشاعر الحارقة (Pain Points):
${avatar.painPoints}

الحالة المستقبلية المرغوبة (Desires & Dreams):
${avatar.desires}

أكبر الاعتراضات والمخاوف قبل الشراء (Objections):
${avatar.objections}

المحفز الشرائي الحاسم (Buying Trigger & Angle):
${avatar.buyingTrigger}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledSummary);
    setCopied(true);
    if (onCopyText) onCopyText('تم نسخ بطاقة العميل المستهدف بنجاح!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
              <Target className="h-3.5 w-3.5" />
              <span>صانع بطاقة شخصية العميل</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              تشريح عقلية المشتري (Customer Avatar Generator)
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              الكتابة لـ "الجميع" تعني الكتابة لـ "لا أحد". ابنِ صورة مجسمة لعميلك المثالي، واكتشف الكلمات الدقيقة التي تدفعه للشراء قبل أن تبدأ صياغة أول إعلان.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-black hover:bg-amber-400 transition-all cursor-pointer shadow-md shadow-amber-500/20"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ ملف الـ Avatar'}</span>
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-zinc-400">نماذج جاهزة للاستلهام:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetSelect(p)}
              className="rounded-xl border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-all cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input 1: Basic Info */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <User className="h-4 w-4 text-amber-400" />
            <span>1. الهوية والبيانات الديموغرافية (Demographics)</span>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">اسم العميل والمهنة الأساسية:</label>
              <input
                type="text"
                value={avatar.name}
                onChange={(e) => setAvatar({ ...avatar, name: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">السن، بيئة العمل، ونمط الحياة اليومي:</label>
              <textarea
                rows={2}
                value={avatar.demographics}
                onChange={(e) => setAvatar({ ...avatar, demographics: e.target.value })}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Input 2: Pain Points */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <AlertCircle className="h-4 w-4 text-rose-400" />
            <span>2. نقاط الألم والمشاعر الحارقة (Pain Points)</span>
          </div>
          <p className="text-[11px] text-zinc-400">
            ما هي المشكلة التي تؤرقه في منتصف الليل؟ ماذا خسر بسبب استمرارها؟
          </p>
          <textarea
            rows={4}
            value={avatar.painPoints}
            onChange={(e) => setAvatar({ ...avatar, painPoints: e.target.value })}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Input 3: Desires */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Heart className="h-4 w-4 text-emerald-400" />
            <span>3. الحالة المرغوبة والأحلام (Desires & State)</span>
          </div>
          <p className="text-[11px] text-zinc-400">
            كيف سيبدو يومه المثالي بعد حل المشكلة؟ ما الشعور الذي يبحث عنه؟
          </p>
          <textarea
            rows={4}
            value={avatar.desires}
            onChange={(e) => setAvatar({ ...avatar, desires: e.target.value })}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Input 4: Objections */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            <span>4. الاعتراضات والمخاوف المسبقة (Objections)</span>
          </div>
          <p className="text-[11px] text-zinc-400">
            لماذا قد يتردد في الدفع؟ ما التجارب السيئة التي خاضها في الماضي؟
          </p>
          <textarea
            rows={4}
            value={avatar.objections}
            onChange={(e) => setAvatar({ ...avatar, objections: e.target.value })}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Buying Trigger Callout */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
          <Sparkles className="h-4 w-4" />
          <span>5. الزاوية والمحفز الشرائي الحاسم (Winning Angle & Trigger)</span>
        </div>
        <p className="text-xs text-zinc-400">
          ما العرض أو الضمان أو الزاوية التي ستنزع تردد هذا العميل فوراً وتدفعه لقول: "نعم أريد هذا الآن"؟
        </p>
        <textarea
          rows={3}
          value={avatar.buyingTrigger}
          onChange={(e) => setAvatar({ ...avatar, buyingTrigger: e.target.value })}
          className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
        />
      </div>
    </div>
  );
};
