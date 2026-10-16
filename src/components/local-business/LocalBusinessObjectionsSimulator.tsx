import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Brain,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface ObjectionScenario {
  id: string;
  merchantStatement: string;
  merchantDialect: string;
  psychologicalContext: string;
  badResponse: string;
  goodResponse: string;
  proTip: string;
}

const OBJECTION_SCENARIOS: ObjectionScenario[] = [
  {
    id: 'obj-1',
    merchantStatement: '«الإنترنت والخرائط ما كينفعونيش فهاد الحومة، الكليان ديالي كيجيو غير من الدرب»',
    merchantDialect: 'المحل يعتمد فقط على المشاة وسكان الحي المباشر ويعتقد أن الإنترنت للمواقع الكبرى فقط.',
    psychologicalContext: 'التاجر يخاف من دفع المال في شيء لا يراه ملموساً مثل لافتة المحل.',
    badResponse: '«لا راك غالط، دابا كلشي فـ Google والمستقبل ديجيتال وإلا ما درتيهاش غاتخسر!» (أسلوب هجومي ومستفز).',
    goodResponse: '«عندك الصح تماماً، الزبناء دالحي هوما الأساس. ولكن واش فراسك شحال من واحد ساكن فالحي وما عارفكش حيت ما كيدوزش من هاد الزنقة بالضبط؟ ولا شحال من عائلة جات تزور الحي وكاتقلب فالتلفون على "أحسن سناك قريب ليا"؟ الخريطة ما داروهاش للناس دالخارج، داروها باش بنادم لي حداك يلقاك بنقرة وحدة.»',
    proTip: 'وافقه أولاً لتبديد دفاعاته النفسية، ثم وجّه نظره للزبائن القريبين الذين لا يعرفون موقعه الدقيق.'
  },
  {
    id: 'obj-2',
    merchantStatement: '«السعر ديالكم غالي بزاف عليا دابا، معنديش ميزانية لهادشي»',
    merchantDialect: 'التاجر يرى السعر كتكلفة إضافية وعبء وليس كاستثمار يجلب له أرباحاً.',
    psychologicalContext: 'التاجر يتردد لأنه لم يلمس بعد العائد المالي المباشر.',
    badResponse: '«صافي نقص ليك 50% دابا غير خدم معايا» (يقلل من قيمتك ويظهرك يائساً).',
    goodResponse: '«كنفهمك تماماً. ولكن فاش كنقولو 300$ فالشهر، يعني تقريباً 10$ فاليوم. إلى جبنا ليك غير 3 زبائن جدد فاليوم جاو تغداو أو صاوبو شعرهم عندك، شحال غايدخلو ليك؟ أكثر من 30$ يومياً! يعني الخدمة كتخلص راسها من الأرباح الإضافية، ماشي من جيبك.»',
    proTip: 'حساب الرياضيات البسيطة على ورقة وقلم أمام التاجر يلغي حجة السعر فوراً.'
  },
  {
    id: 'obj-3',
    merchantStatement: '«جربت واحد الدري قبل منكم وما دار والو وضيع ليا الفلوس»',
    merchantDialect: 'تعرض لتجربة سيئة سابقة مع مستقل غير جاد أخذ منه المال ولم يقدم نتائج.',
    psychologicalContext: 'فقدان الثقة والخوف من تكرار الخديعة.',
    badResponse: '«هداك غير مبتدئ وما كيفهمش، أما أنا محترف وعندي شهادات!»',
    goodResponse: '«كنتأسف حيت سمعت هادشي، وللأسف كاينين دراري كياخدو فلوس وما كيلتزموش بحتى خدمة. أنا ما بغيتكش تثيق بيا بالهضرة: اليوم غانقد ليك الخريطة ونصور ليك واجهة المحل مجاناً، وإلا شفتي بعينيك باللي الاتصالات والمشاهدات بدات كاتطلع، عاد نهضرو فالتعامل. أنا هدفي شراكة طويلة ماشي ضربة وحدة.»',
    proTip: 'تقديم خدمة فورية مصغرة مجانية يثبت حسن نيتك ويصنع فرقاً جوهرياً بينك وبين المستقل السابق.'
  },
  {
    id: 'obj-4',
    merchantStatement: '«معنديش الوقت باش نتصور ولا نعطيكم معلومات كل نهار»',
    merchantDialect: 'مشغول جداً بإدارة عماله وتلبية طلبات الزبائن ويخاف من وجع الدماغ.',
    psychologicalContext: 'يخشى أن يتطلب التسويق جهداً إضافياً منه يرهق يومه.',
    badResponse: '«خاصك ضروري تصور ليا الفيديوهات وتصيفطهم ليا فواتساب كل صباح!»',
    goodResponse: '«هادشي علاش جيت عندك! نتا شغلك هو تهلا فالزبناء والمحل ديالك، وأنا شغلي ندير كلشي: غانجي نص ساعة فالشهر نلتقط الصور والفيديوهات، ونتا ما غادير حتى مجهود، غادي تشوف غير النتيجة والزبائن كيتصلو بيك.»',
    proTip: 'أكد له أنك ترفع عنه العبء ولا تضيف له عملاً إضافياً على الإطلاق.'
  },
  {
    id: 'obj-5',
    merchantStatement: '«ديرو ليا الخدمة فابور، وإلى دخلو زبائن جدد غانعطيكم النسبة ديالكم»',
    merchantDialect: 'يريد نقل المخاطرة كاملة على عاتقك بدون التزام مالي منه.',
    psychologicalContext: 'المتاجرة بالوعود دون تحمل مسؤولية قراره التجاري.',
    badResponse: '«واخا موافق نجربو هكا» (ستعمل شهراً كاملاً ولن يدفع لك شيئاً أو سينكر أن الزبائن جاؤوا منك).',
    goodResponse: '«كنقدر الاقتراح ديالك، ولكن أنا كنستثمر وقتي ومعداتي وجهدي اليومي، ومستحيل نعرف شحال من واحد دخل للمحل وشرى كاش. باش نكونو عادلين، نديرو شهر تجريبي بباقة مخفضة فيها الأساسيات، ومن التقرير الشهري غاتشوف بنفسك شحال دالناس اتصلو وطلبو العنوان، ومن تما كتعرف بلي كل درهم حطيتيه رجع ليك بالربح.»',
    proTip: 'لا تقبل العمل بنسبة غير موثقة مع المحلات الصغيرة أبداً؛ اقترح باقة تجريبية مدفوعة ومحددة.'
  }
];

export const LocalBusinessObjectionsSimulator: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [revealedGood, setRevealedGood] = useState<boolean>(false);

  const currentScenario = OBJECTION_SCENARIOS[selectedScenarioIndex];

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-bold text-purple-400">
          <Sparkles className="h-4 w-4" />
          <span>الأداة التفاعلية الثامنة · محاكي التفاوض وإغلاق الصفقات</span>
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
          محاكي الرد على اعتراضات التجار وأصحاب المحلات (Objections Simulator)
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          أهم مهارة تميز المحترف عن الهاوي هي القدرة على تحويل اعتراضات التردد والخوف إلى عقود سنوية ناجحة. تدرب على أكثر 5 اعتراضات تواجهك في الشارع وكيفية الرد عليها بلغة الأرباح.
        </p>

        {/* Objections Selector Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 border-t border-zinc-800/80 pt-6">
          {OBJECTION_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioIndex(idx);
                setRevealedGood(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                selectedScenarioIndex === idx
                  ? 'border-purple-500 bg-purple-500/20 text-purple-300 shadow-md shadow-purple-500/10'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              الاعتراض {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Scenario Display */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 backdrop-blur-xl space-y-6">
        {/* Merchant objection statement */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <AlertCircle className="h-4 w-4" />
            <span>ما يقوله التاجر على أرض الواقع:</span>
          </div>
          <h3 className="mt-2 text-lg sm:text-xl font-black text-white leading-relaxed">
            {currentScenario.merchantStatement}
          </h3>
          <p className="mt-2 text-xs text-zinc-400">
            <strong>الدافع الخفي:</strong> {currentScenario.psychologicalContext}
          </p>
        </div>

        {/* Bad vs Good Response breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Wrong response */}
          <div className="p-5 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
              <ThumbsDown className="h-4 w-4" />
              <span>الرد الخاطئ (يخسرك العميل فوراً):</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {currentScenario.badResponse}
            </p>
          </div>

          {/* Winning response */}
          <div className="p-5 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ThumbsUp className="h-4 w-4" />
                <span>الرد الذكي الرابح (المبني على الأرباح والأمان):</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-mono whitespace-pre-wrap">
              {currentScenario.goodResponse}
            </p>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
          <Sparkles className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 leading-relaxed">
            <strong className="text-purple-300 font-bold ml-1">تكتيك ذهبي:</strong>
            {currentScenario.proTip}
          </div>
        </div>
      </div>
    </div>
  );
};
