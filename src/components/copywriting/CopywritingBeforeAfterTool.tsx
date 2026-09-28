import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Sparkles, 
  Check, 
  RotateCcw,
  Scissors,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface CopywritingBeforeAfterToolProps {
  onCopyText?: (text: string) => void;
}

export const CopywritingBeforeAfterTool: React.FC<CopywritingBeforeAfterToolProps> = ({ onCopyText }) => {
  const [activeTab, setActiveTab] = useState<'headlines' | 'features-benefits' | 'editing-checklist'>('headlines');

  // Editing checklist state
  const [checklistState, setChecklistState] = useState<Record<number, boolean>>({});
  const [draftText, setDraftText] = useState<string>('');

  const checklistItems = [
    { id: 1, label: 'هل الرسالة واضحة تماماً وتُفهم من القراءة الأولى في أقل من 5 ثوانٍ؟' },
    { id: 2, label: 'هل الفائدة المباشرة للقارئ (Benefit) بارزة وليست مجرد مواصفة تقنية باردة؟' },
    { id: 3, label: 'هل الجمهور المستهدف محدد بدقة ويشعر أن النص يتحدث عنه شخصياً؟' },
    { id: 4, label: 'هل قمت بحذف الكلمات الزائدة وحشو العبارات الإنشائية (30% اختصار)؟' },
    { id: 5, label: 'هل الجمل قصيرة ومريحة للقراءة بصوت عالٍ دون تلعثم؟' },
    { id: 6, label: 'هل الدعوة للعمل (CTA) واضحة وتخبر القارئ بالخطوة القادمة بالضبط؟' },
    { id: 7, label: 'هل كافة الأرقام والادعاءات حقيقية وقابلة للإثبات دون مبالغات غير واقعية؟' },
    { id: 8, label: 'هل خلا النص تماماً من أي ندرة مصطنعة أو وعود سحرية كاذبة؟' }
  ];

  const checkedCount = Object.values(checklistState).filter(Boolean).length;
  const checklistScore = Math.round((checkedCount / checklistItems.length) * 100);

  const toggleChecklistItem = (id: number) => {
    setChecklistState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const headlineComparisons = [
    {
      category: 'دورات تدريبية وتعليمية',
      weakHeadline: 'دورة في مهارات العمل الحر والتسويق الإلكتروني للمبتدئين',
      weakReason: 'عام وممل ولا يحدد الفائدة ولا النتيجة ولا يعالج أي اعتراض مسبق.',
      strongHeadline: 'كيف تنتقل من مشاريع الـ 10$ المرهقة إلى عقود شهرية بـ 1500$+ كمستقل.. حتى بدون معرض أعمال ضخم',
      strongReason: 'حدد نقطة الألم (مشاريع قليلة العائد)، وضع رقماً جذاباً وممكناً، وفكك العائق الأساسي (غياب البورتفوليو).'
    },
    {
      category: 'برمجيات SaaS وإدارة الأعمال',
      weakHeadline: 'برنامجنا المحاسبي السحابي يقدم لك أحدث التقنيات لمتابعة الدخل',
      weakReason: 'يتحدث عن نفسه وعن برنامجه، والعميل لا يهتم بكلمة "تقنياتنا السحابية".',
      strongHeadline: 'أغلق حسابات متجرك الشهرية في 15 دقيقة فقط، وتخلص من رعب الإقرارات الضريبية المفاجئة',
      strongReason: 'بدأ بالنتيجة السريعة (15 دقيقة) وتفكيك الرعب الأكبر (غرامات الإقرارات الضريبية).'
    },
    {
      category: 'منتجات اللياقة البدنية والدايت',
      weakHeadline: 'خطة وجبات صحية محسوبة السعرات الحرارية لإنقاص الوزن',
      weakReason: 'مبتذل ويشعر القارئ بالحرمان والرجيم القاسي المعقد.',
      strongHeadline: 'اخسر دهون بطنك العنيدة دون التخلي عن وجبة العشاء مع عائلتك أو حساب كل غرام طعام',
      strongReason: 'يعد بالنتيجة مع الحفاظ على المتعة الاجتماعية (العشاء مع العائلة) ونفي التعب الروتيني.'
    }
  ];

  const featuresBenefitsList = [
    {
      product: 'كرسي مكتبي طبي (Ergonomic Chair)',
      feature: 'قاعدة إسفنجية بكثافة 65 كغ/م3 مع مسند فقرات ثلاثي الأبعاد.',
      advantage: 'يتكيف تلقائياً مع انحناء عمودك الفقري أثناء تغير وضعية جلوسك.',
      benefit: 'لن تشعر بآلام الظهر الحارقة التي كانت تفسد أمسياتك؛ عُد لمنزلك بنشاط كامل للعب مع أطفالك.'
    },
    {
      product: 'برنامج حماية البطاقات الرقمية RFID',
      feature: 'طبقة ألومنيوم داخلية تعزل الترددات اللاسلكية 13.56 MHz.',
      advantage: 'تحجب أجهزة المسح وقراءة البيانات الرقمية عن بعد.',
      benefit: 'تجول بحرية وأمان في أكثر مطارات ومحطات العالم ازدحاماً دون خوف من سرقة بيانات بطاقاتك البنكية.'
    },
    {
      product: 'سماعات رأس عازلة للضوضاء (ANC)',
      feature: 'ميكروفونات مزدوجة تلغي الضوضاء بتردد يصل إلى 40 ديسيبل.',
      advantage: 'تعزل ضجيج محركات الطائرات وأصوات المكاتب المفتوحة.',
      benefit: 'اصنع واحة هدوئك الخاصة في أي مكان؛ ركز في عملك وعش تجربة صوتية نقية دون أي تشتيت.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span>مختبر المقارنة والتحرير الإعلاني</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            مقارنة النصوص قبل وبعد (Before & After Optimization)
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            الفرق بين نص يحرق ميزانيتك ونص يضاعف مبيعاتك يكمن في بضع تعديلات ذكية في المنظور. استكشف الفارق بالعين المجردة، وافحص نصوصك بـ Checklist التحرير الصارم.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('headlines')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'headlines'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            مقارنة العناوين (Headlines Before/After)
          </button>
          <button
            onClick={() => setActiveTab('features-benefits')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'features-benefits'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            المواصفات مقابل الفوائد (Features vs Benefits)
          </button>
          <button
            onClick={() => setActiveTab('editing-checklist')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'editing-checklist'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            تشيك ليست التحرير (Copy Editing Checklist)
          </button>
        </div>
      </div>

      {/* TAB 1: HEADLINES */}
      {activeTab === 'headlines' && (
        <div className="space-y-6">
          {headlineComparisons.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-7 space-y-5 shadow-xl"
            >
              <div className="inline-block rounded-full bg-zinc-900 px-3 py-1 text-xs font-bold text-amber-400 border border-zinc-800">
                {item.category}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weak */}
                <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-black text-rose-400">
                    <XCircle className="h-4 w-4" />
                    <span>العنوان الضعيف الشائع (Weak):</span>
                  </div>
                  <p className="text-sm font-bold text-zinc-200 leading-relaxed">
                    "{item.weakHeadline}"
                  </p>
                  <p className="text-xs text-rose-300/80 border-t border-rose-500/20 pt-2">
                    ❌ <strong>سبب الضعف:</strong> {item.weakReason}
                  </p>
                </div>

                {/* Strong */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>العنوان المحسن عالي التحويل (High-Converting):</span>
                  </div>
                  <p className="text-sm font-bold text-white leading-relaxed">
                    "{item.strongHeadline}"
                  </p>
                  <p className="text-xs text-emerald-300/80 border-t border-emerald-500/20 pt-2">
                    ✅ <strong>سر القوة:</strong> {item.strongReason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: FEATURES VS BENEFITS */}
      {activeTab === 'features-benefits' && (
        <div className="space-y-6">
          {featuresBenefitsList.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-7 space-y-4 shadow-xl"
            >
              <h3 className="text-base font-black text-amber-400">
                المنتج: {item.product}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1.5">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    1. المواصفة (Feature):
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed font-mono">
                    {item.feature}
                  </p>
                </div>

                <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    2. الميزة التشغيلية (Advantage):
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {item.advantage}
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    3. الفائدة الحياتية (Emotional Benefit):
                  </span>
                  <p className="text-xs font-bold text-white leading-relaxed">
                    {item.benefit}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: EDITING CHECKLIST */}
      {activeTab === 'editing-checklist' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Draft Box */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Scissors className="h-4 w-4 text-amber-400" />
                  <span>محرر تدقيق النص الإعلاني (Draft Pad)</span>
                </div>
                <button
                  onClick={() => setDraftText('')}
                  className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer"
                >
                  مسح المسودة
                </button>
              </div>
              <p className="text-xs text-zinc-400">
                الصق مسودتك هنا، ثم راجعها بنداً بنداً من القائمة على اليسار لتضمن أعلى جودة قبل النشر:
              </p>
              <textarea
                rows={12}
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                placeholder="الصق نص إعلانك، صفحة هبوطك، أو إيميلك هنا للتدقيق والتحرير..."
                className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-4 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
              />
            </div>
          </div>

          {/* Checklist */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-white">
                    Checklist فحص الجودة والمصداقية (8 معايير)
                  </h3>
                  <p className="text-xs text-zinc-400">حدد البنود التي استوفاها نصك بدقة:</p>
                </div>
                <div className="text-left font-mono">
                  <span className={`text-base font-black ${checklistScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {checklistScore}%
                  </span>
                  <div className="text-[10px] text-zinc-500">{checkedCount}/8 بنود</div>
                </div>
              </div>

              <div className="space-y-2.5">
                {checklistItems.map(item => {
                  const isChecked = !!checklistState[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleChecklistItem(item.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className={`p-3 rounded-2xl border text-right transition-all flex items-start gap-3 cursor-pointer select-none ${
                        isChecked
                          ? 'border-emerald-500/50 bg-emerald-500/10 text-zinc-100'
                          : 'border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-zinc-600" />
                        )}
                      </div>
                      <span className="text-xs leading-relaxed font-medium">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {checklistScore === 100 && (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                  <span>تهانينا! نصك اجتاز كافة معايير الوضوح، الإقناع، والمصداقية الأخلاقية وجاهز للنشر بثقة.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
