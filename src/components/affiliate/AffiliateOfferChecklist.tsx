import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  RotateCcw,
  Check,
  Star
} from 'lucide-react';
import { offerCriteria } from '../../data/affiliateGuideData';

interface InteractiveChecklistProps {
  onCopyText: (text: string, label: string) => void;
}

export const InteractiveNicheChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const nicheCriteria = [
    { id: 'nc-1', title: 'المعرفة أو الشغف الحقيقي', desc: 'واش هاد المجال كيعجبك تقرا فيه أو مستعد تقضي فيه 6 أشهر بلا ما تمل؟' },
    { id: 'nc-2', title: 'وجود طلب وبحث مستمر', desc: 'تأكدتِ من وجود فيديوهات كثيرة وأسئلة في تيك توك وجوجل تريندز حول هذا المجال.' },
    { id: 'nc-3', title: 'القدرة الشرائية للجمهور', desc: 'الناس اللي مهتمين بهاد النيتش عندهم بطاقات بنكية ومستعدين يشريو لحل مشاكلهم.' },
    { id: 'nc-4', title: 'توفر برامج أفيلييت رسمية', desc: 'لقيتي على الأقل برنامجي أفيلييت موثوقين كيدعمو بلدك بمنتجات ممتازة.' },
    { id: 'nc-5', title: 'عمولات مجزية تستحق الوقت', desc: 'العمولة ليست 0.10$؛ العرض يعطيك ربحاً كافياً لتعويض مجهود صناعة المحتوى.' },
    { id: 'nc-6', title: 'سهولة صناعة المحتوى بالهاتف', desc: 'تقدر تصور مراجعات أو تسجل شاشة أو تشارك تجارب بدون الحاجة لاستوديو هائل.' },
  ];

  const toggle = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const count = Object.values(checkedItems).filter(Boolean).length;
  const percentage = Math.round((count / nicheCriteria.length) * 100);

  return (
    <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-zinc-900/60 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>قائمة تحقق تفاعلية</span>
          </div>
          <h3 className="mt-2 text-xl font-black text-white">
            اختار الـ Niche ديالك (اختبار الجاهزية)
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            دير علامة صح (✓) على المعايير اللي كيتوفرو فالنيتش اللي باغي تختار باش تضمن النجاح من البداية.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-left rtl:text-right">
            <div className="text-xs text-zinc-400 font-medium">اكتمال المعايير</div>
            <div className="text-xl font-black text-amber-400 font-mono">{count} / {nicheCriteria.length} ({percentage}%)</div>
          </div>
          {count > 0 && (
            <button
              onClick={() => setCheckedItems({})}
              className="p-2 rounded-xl border border-zinc-800 text-zinc-500 hover:text-white transition-colors"
              title="إعادة تعيين"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {nicheCriteria.map((item) => {
          const isDone = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                isDone
                  ? 'border-amber-500/50 bg-amber-500/10 text-white shadow-sm shadow-amber-500/5'
                  : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-amber-400 fill-amber-400/20" />
                ) : (
                  <Circle className="h-5 w-5 text-zinc-600" />
                )}
              </div>
              <div>
                <h4 className={`text-sm font-bold ${isDone ? 'text-amber-300' : 'text-zinc-200'}`}>
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic verdict based on score */}
      <div className="mt-6 pt-5 border-t border-zinc-800/80">
        {count >= 5 ? (
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <span className="block font-black text-sm">نيتش ممتاز ومثالي للبدء (ضوء أخضر)! 🚀</span>
              <span className="font-normal text-zinc-300">هذا التخصص يملك كافة مقومات النجاح والربحية العالية. يمكنك الانتقال مباشرة لاختيار البرامج والعروض.</span>
            </div>
          </div>
        ) : count >= 3 ? (
          <div className="flex items-center gap-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-amber-400 text-xs font-bold">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <div>
              <span className="block font-black text-sm">نيتش واعد ولكن يحتاج تدقيق (ضوء برتقالي)</span>
              <span className="font-normal text-zinc-300">تأكد من النقاط المتبقية (خاصة القدرة الشرائية ونوع العمولات) قبل استثمار وقتك بالكامل.</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl bg-zinc-900 border border-zinc-800 p-4 text-zinc-400 text-xs">
            <HelpCircle className="h-5 w-5 text-zinc-500 shrink-0" />
            <span>حدد المعايير أعلاه لمعرفة ما إذا كان مجالك جاهزاً ومربحاً للمبتدئين.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const InteractiveOfferChecklist: React.FC<InteractiveChecklistProps> = () => {
  const [offerName, setOfferName] = useState<string>('');
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setCheckedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const score = Object.values(checkedMap).filter(Boolean).length;
  const total = offerCriteria.length;
  const scorePercent = Math.round((score / total) * 100);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>فاحص العروض الشامل (Offer Evaluator)</span>
          </div>
          <h3 className="mt-2 text-xl font-black text-white">
            قائمة تدقيق العرض (Offer Checklist) قبل البدء بالترويج
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            لا تروج لأي منتج عشوائياً! اختبر العرض عبر 8 معايير صارمة لحماية وقتك وأرباحك.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-center">
            <div className="text-[10px] text-zinc-400 font-medium">درجة الجودة</div>
            <div className={`text-xl font-black font-mono ${
              score >= 7 ? 'text-emerald-400' : score >= 5 ? 'text-amber-400' : 'text-zinc-400'
            }`}>
              {score} / {total}
            </div>
          </div>
          {score > 0 && (
            <button
              onClick={() => {
                setCheckedMap({});
                setOfferName('');
              }}
              className="p-2 rounded-xl border border-zinc-800 text-zinc-500 hover:text-white"
              title="تفريغ الفاحص"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Offer Name Input */}
      <div className="mt-6">
        <label className="text-xs font-bold text-zinc-300 block mb-1.5">
          اسم المنتج أو العرض الذي تفحصه حالياً (اختياري):
        </label>
        <input
          type="text"
          value={offerName}
          onChange={(e) => setOfferName(e.target.value)}
          placeholder="مثال: استضافة Hostinger، مايك Fifine، دورة Coursera Plus..."
          className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-2.5 px-4 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* Checklist items */}
      <div className="mt-6 space-y-3">
        {offerCriteria.map((c) => {
          const isPassed = !!checkedMap[c.id];
          return (
            <div
              key={c.id}
              onClick={() => toggle(c.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 select-none ${
                isPassed
                  ? 'border-emerald-500/40 bg-emerald-500/5 text-zinc-200 shadow-sm'
                  : 'border-zinc-800/80 bg-zinc-950/70 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {isPassed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-400/20" />
                  ) : (
                    <Circle className="h-5 w-5 text-zinc-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className={`text-sm font-bold ${isPassed ? 'text-emerald-300' : 'text-zinc-200'}`}>
                      {c.title}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      c.importance === 'حرج جداً'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {c.importance}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-zinc-400">
                    {c.description}
                  </p>

                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-zinc-800/60">
                    <div className="text-emerald-400/90">
                      <span className="font-bold">المعيار المثالي: </span>
                      <span className="text-zinc-300">{c.idealStandard}</span>
                    </div>
                    <div className="text-rose-400/90">
                      <span className="font-bold">علامة الخطر (Red Flag): </span>
                      <span className="text-zinc-400">{c.redFlag}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shrink-0 hidden sm:block">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  isPassed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-900 text-zinc-500'
                }`}>
                  {isPassed ? 'مقبول ✓' : 'لم يُفحص'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Score Summary Box */}
      <div className="mt-6 pt-5 border-t border-zinc-800">
        <div className={`p-4 rounded-2xl border text-xs font-medium ${
          score >= 7 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : score >= 5
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            : 'bg-zinc-950 border-zinc-800 text-zinc-400'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            <Star className="h-4 w-4 fill-current" />
            <span>
              التقييم النهائي لعرض {offerName ? `"${offerName}"` : 'المحدد'}: ({score} من 8)
            </span>
          </div>
          {score >= 7 ? (
            <p>هذا العرض من الطراز الأول (Top-Tier Offer)! عمولة ممتازة، مدة كوكيز مناسبة، ومعدل تحويل مرتفع. ابدأ بإنشاء محتوى مخصص له فوراً.</p>
          ) : score >= 5 ? (
            <p>عرض جيد ومقبول، لكن انتبه للنقاط التي لم يجتزها (مثلاً إذا كانت مدة الكوكيز قصيرة، تأكد من استهداف مشترين مستعدين للشراء الفوري).</p>
          ) : (
            <p>عرض ضعيف أو محفوف بالمخاطر. ننصح بالبحث عن بديل آخر يقدم عمولات أعلى أو شروط قبول أسهل للمبتدئين.</p>
          )}
        </div>
      </div>
    </div>
  );
};
