import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  MousePointerClick, 
  Search, 
  Sparkles, 
  Copy, 
  Layers,
  HelpCircle,
  Clock,
  Eye
} from 'lucide-react';

interface SeoBeforeAfterComparatorProps {
  onCopyText: (text: string, label: string) => void;
}

export const SeoBeforeAfterComparator: React.FC<SeoBeforeAfterComparatorProps> = ({ onCopyText }) => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'before' | 'after'>('side-by-side');

  const beforeData = {
    title: 'عيادة دكتور أحمد - الصفحة الرئيسية وخدمات الأسنان',
    metaDesc: 'نحن عيادة متميزة في علاج الأسنان وتبييض الأسنان وتركيب التقويم اتصل بنا الآن للحجز والاستفسار في المغرب.',
    url: 'drahmed-clinic.ma/?p=328',
    h1: 'مرحباً بكم في موقعنا الإلكتروني',
    headings: ['خدماتنا المميزة', 'من نحن', 'تواصل معنا'],
    contentSnippet: 'نقدم لكم أفضل خدمات طب الأسنان بأحدث التقنيات وأفضل الأطباء. نسعى دائماً لراحة المريض وإسعاده.',
    images: 'IMG_48291.jpg (حجمها 3.8 ميغابايت - بدون Alt text)',
    internalLinks: 'رابط واحد: "اضغط هنا لمعرفة الأسعار"',
    faqSchema: 'غير موجودة',
    ctr: '1.2%',
    ranking: 'المركز #18 (الصفحة الثانية)',
    monthlyClicks: '38 نقرة شهرياً',
    issues: [
      'عنوان عام لا يحتوي على اسم المدينة (طنجة) ولا يحفز على النقر.',
      'رابط غير مفهوم ومليء بالرموز (?p=328) يضر السيو.',
      'وسم H1 باهت ومكرر في ملايين المواقع بدلاً من وصف الخدمة والموقع.',
      'صور ضخمة غير مضغوطة تبطئ التحميل لأكثر من 5.4 ثوانٍ.',
      'غياب الأسئلة الشائعة ومخطط البيانات المنظمة Schema.'
    ]
  };

  const afterData = {
    title: 'أفضل طبيب أسنان في طنجة | زراعة وتبييض فوري - عيادة د. أحمد',
    metaDesc: 'هل تبحث عن ابتسامة مثالية بدون ألم؟ عيادة د. أحمد بطنجة: زراعة أسنان وهوليوود سمايل بأحدث ليزر ألماني. حجز موعد فوري مع استشارة مجانية. اتصل بنا الآن!',
    url: 'drahmed-clinic.ma/dentiste-tanger',
    h1: 'عيادة د. أحمد لطب وزراعة الأسنان في طنجة (مالاباطا)',
    headings: [
      'H2: خدمات علاج وتجميل الأسنان المتطورة بطنجة',
      'H3: زراعة الأسنان الفورية بدون جراحة مؤلمة',
      'H3: تبييض الأسنان بالليزر وهوليوود سمايل',
      'H2: أسعار زراعة وتبييض الأسنان بالدرهم المغربي',
      'H2: الأسئلة الشائعة لمرضى الأسنان (FAQ مع Schema)'
    ],
    contentSnippet: 'تعتبر عيادة د. أحمد الوجهة الرائدة لزراعة وتجميل الأسنان في طنجة. نوفر لمرضانا أحدث تقنيات الليزر الألماني لضمان علاج فوري خالٍ من الألم وضمان كتابي على كافة التركيبات...',
    images: 'dr-ahmed-dental-clinic-tanger.webp (حجمها 68 كيلوبايت مع Alt: دكتور أسنان يفحص مريض في عيادة طنجة)',
    internalLinks: '3 روابط سياقية مدروسة: "شاهد نتائج زراعة الأسنان بالصور"، "جدول أسعار التبييض"، "حجز موعد عبر واتساب"',
    faqSchema: 'مضمنة بكود FAQPage Schema رسمي ومعتمد من جوجل',
    ctr: '6.8% (ارتفاع بمقدار 5.6 أضعاف!)',
    ranking: 'المركز #2 (في أول 3 نتائج!)',
    monthlyClicks: '412 نقرة شهرياً (زيادة +984%)',
    improvements: [
      'عنوان جذاب يضم الكلمة المفتاحية، اسم المدينة، وحافز الاستشارة المجانية.',
      'رابط نظيف ووصفي سهل القراءة لجوجل وللمستخدم.',
      'وسم H1 وعناوين فرعية H2/H3 تجيب مباشرة عن نية المريض.',
      'تحويل الصور لصيغة WebP خفيفة رفعت سرعة الصفحة لأقل من 1.4 ثانية.',
      'ظهور قسم الأسئلة الشائعة في نتائج بحث جوجل مع نجوم التقييم.'
    ]
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="h-4 w-4" />
            <span>دراسة حالة بصرية تفاعلية (Before & After Case Study)</span>
          </div>
          <h3 className="mt-1 text-2xl font-black text-white">
            تحسين On-Page لموقع خدمة: مقارنة عملية بين صفحة فاشلة وصفحة متصدرة
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            شاهد الفرق الحقيقي بين ما يفعله المبتدئ العشوائي وما يقدمه أخصائي السيو المحترف لنفس الصفحة.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold shrink-0">
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'side-by-side' ? 'bg-amber-500 text-black shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            جنباً إلى جنب
          </button>
          <button
            onClick={() => setViewMode('before')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'before' ? 'bg-rose-500 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            قبل التحسين (❌)
          </button>
          <button
            onClick={() => setViewMode('after')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'after' ? 'bg-emerald-500 text-black shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            بعد التحسين (✅)
          </button>
        </div>
      </div>

      {/* Metrics Impact Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-center">
          <div className="text-xs text-zinc-400 font-medium">معدل النقر (CTR)</div>
          <div className="mt-1 flex items-center justify-center gap-2 font-sans font-black">
            <span className="text-sm text-rose-400 line-through">1.2%</span>
            <ArrowLeft className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-lg text-emerald-400">6.8%</span>
          </div>
          <span className="text-[10px] text-emerald-400/80 font-bold">+466% ارتفاع</span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-center">
          <div className="text-xs text-zinc-400 font-medium">ترتيب الكلمة في جوجل</div>
          <div className="mt-1 flex items-center justify-center gap-2 font-sans font-black">
            <span className="text-sm text-rose-400 line-through">#18</span>
            <ArrowLeft className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-lg text-emerald-400">#2</span>
          </div>
          <span className="text-[10px] text-emerald-400/80 font-bold">قفز 16 مركزاً</span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-center">
          <div className="text-xs text-zinc-400 font-medium">الزيارات العضوية الشهرية</div>
          <div className="mt-1 flex items-center justify-center gap-2 font-sans font-black">
            <span className="text-sm text-rose-400 line-through">38</span>
            <ArrowLeft className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-lg text-amber-400">412</span>
          </div>
          <span className="text-[10px] text-amber-400 font-bold">+984% زيارات شراء</span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-center">
          <div className="text-xs text-zinc-400 font-medium">زمن تحميل الصفحة</div>
          <div className="mt-1 flex items-center justify-center gap-2 font-sans font-black">
            <span className="text-sm text-rose-400 line-through">5.4s</span>
            <ArrowLeft className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-lg text-emerald-400">1.4s</span>
          </div>
          <span className="text-[10px] text-emerald-400/80 font-bold">تسريع بنسبة 74%</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className={`grid gap-6 ${viewMode === 'side-by-side' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* BEFORE CARD */}
        {(viewMode === 'side-by-side' || viewMode === 'before') && (
          <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 via-zinc-950/90 to-zinc-950 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
              <div className="flex items-center gap-2 font-bold text-rose-400 text-sm">
                <XCircle className="h-5 w-5" />
                <span>قبل تحسين السيو (صفحة مهملة تخسر زبائن)</span>
              </div>
              <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-black text-rose-400 border border-rose-500/20">
                أداء ضعيف
              </span>
            </div>

            {/* Google SERP Simulator Before */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-1.5 font-sans dir-ltr text-left">
              <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                <span className="text-zinc-500">https://</span>
                <span className="text-zinc-300 font-mono text-[10px]">{beforeData.url}</span>
              </div>
              <div className="text-sm font-semibold text-blue-400 line-clamp-1 hover:underline cursor-pointer">
                {beforeData.title}
              </div>
              <div className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {beforeData.metaDesc}
              </div>
            </div>

            {/* On-Page Breakdown Before */}
            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3 space-y-1">
                <span className="font-bold text-zinc-400">وسم العنوان الرئيسي (H1 Tag):</span>
                <div className="text-zinc-200 font-mono bg-zinc-900 p-2 rounded border border-zinc-800 text-rose-300">
                  {beforeData.h1}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3 space-y-1">
                <span className="font-bold text-zinc-400">بنية العناوين الفرعية (Headings Structure):</span>
                <div className="text-zinc-300 space-y-1 text-[11px]">
                  {beforeData.headings.map((h, i) => (
                    <div key={i} className="text-zinc-400">• {h} (عناوين عامة خالية من الكلمات المفتاحية)</div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3 space-y-1">
                <span className="font-bold text-zinc-400">حالة الصور وسرعة التحميل:</span>
                <div className="text-zinc-300 text-[11px] text-rose-300">
                  {beforeData.images}
                </div>
              </div>
            </div>

            {/* List of critical flaws */}
            <div className="rounded-xl bg-rose-500/5 border border-rose-500/20 p-4 space-y-2">
              <div className="font-bold text-rose-400 text-xs">أبرز الأخطاء القاتلة في هذه الصفحة:</div>
              <ul className="space-y-1 text-xs text-zinc-300 list-disc list-inside">
                {beforeData.issues.map((issue, idx) => (
                  <li key={idx} className="leading-relaxed">{issue}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* AFTER CARD */}
        {(viewMode === 'side-by-side' || viewMode === 'after') && (
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 via-zinc-950/90 to-zinc-950 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                <CheckCircle2 className="h-5 w-5" />
                <span>بعد تحسين السيو On-Page (صفحة متصدرة تجلب مبيعات)</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-black text-emerald-400 border border-emerald-500/20">
                المركز #2 على جوجل 🚀
              </span>
            </div>

            {/* Google SERP Simulator After */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-1.5 font-sans dir-ltr text-left">
              <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                <span className="text-zinc-500">https://</span>
                <span className="text-emerald-400 font-mono text-[10px]">{afterData.url}</span>
              </div>
              <div className="text-sm font-bold text-blue-400 line-clamp-1 hover:underline cursor-pointer">
                {afterData.title}
              </div>
              <div className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                {afterData.metaDesc}
              </div>
              <div className="pt-1.5 flex items-center gap-2 text-[10px] text-amber-400">
                <span>★★★★★ 4.9 (38 تقييم حقيقي)</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400 font-mono">طنجة - حي مالاباطا</span>
              </div>
            </div>

            {/* On-Page Breakdown After */}
            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3 space-y-1">
                <span className="font-bold text-emerald-400">وسم العنوان الرئيسي (H1 Tag المحسّن):</span>
                <div className="text-white font-mono bg-zinc-900 p-2 rounded border border-emerald-500/30 text-emerald-300">
                  {afterData.h1}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3 space-y-1">
                <span className="font-bold text-emerald-400">بنية العناوين الفرعية المنطقية (H2 & H3 Hierarchy):</span>
                <div className="text-zinc-300 space-y-1 text-[11px]">
                  {afterData.headings.map((h, i) => (
                    <div key={i} className="text-zinc-200">✓ {h}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3 space-y-1">
                <span className="font-bold text-emerald-400">الصور والسرعة وكود Schema:</span>
                <div className="text-zinc-300 text-[11px]">
                  {afterData.images}
                  <div className="mt-1 text-emerald-400 font-medium">✓ {afterData.faqSchema}</div>
                </div>
              </div>
            </div>

            {/* List of key wins */}
            <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 space-y-2">
              <div className="font-bold text-emerald-400 text-xs">لماذا تصدرت هذه الصفحة وتضاعفت مكالماتها؟</div>
              <ul className="space-y-1 text-xs text-zinc-300 list-disc list-inside">
                {afterData.improvements.map((imp, idx) => (
                  <li key={idx} className="leading-relaxed">{imp}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
