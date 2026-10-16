import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, DollarSign, Sparkles, ExternalLink, HelpCircle, Lock, Award } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'policy' | 'technical' | 'content';
  title: string;
  detail: string;
  officialRef: string;
  isMandatory: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'c1',
    category: 'policy',
    title: 'خلو القناة من أي محتوى معاد استخدامه (Reused Content)',
    detail: 'جميع الفيديوهات تحتوي على سرد صوتي بشري، ومونتاج مخصص، وتحليل يضيف قيمة فكرية وفنية واضحة ولا يكتفي بدمج مقاطع الآخرين.',
    officialRef: 'سياسات تحقيق الدخل في YouTube Studio',
    isMandatory: true
  },
  {
    id: 'c2',
    category: 'policy',
    title: 'عدم وجود أي إنذارات نشطة بمخالفة إرشادات المنتدى (Active Strikes)',
    detail: 'يجب أن يكون الحساب نظيفاً تماماً من الإنذارات (التحذيرات المبدئية لا تمنع التقديم، لكن الإنذارات النشطة تمنعه حتى تنتهي مدتها).',
    officialRef: 'إرشادات المنتدى وسياسات الأمان',
    isMandatory: true
  },
  {
    id: 'c3',
    category: 'technical',
    title: 'تفعيل ميزة التحقق بخطوتين (2-Step Verification)',
    detail: 'مفعلة على حساب Google المرتبط بالقناة لتأمين الحساب وحمايته من الاختراق.',
    officialRef: 'متطلبات الأمان الإلزامية لـ YPP',
    isMandatory: true
  },
  {
    id: 'c4',
    category: 'technical',
    title: 'الوصول لعتبة الساعات الصالحة (4,000 ساعة علنية أو 10M شورتس)',
    detail: 'الساعات محسوبة حصراً من الفيديوهات الطويلة العلنية (Public) في آخر 365 يوماً (ساعات الفيديوهات غير المدرجة أو المحذوفة لا تُحتسب).',
    officialRef: 'عتبة المشاهدات في برنامج شركاء يوتيوب',
    isMandatory: true
  },
  {
    id: 'c5',
    category: 'technical',
    title: 'الوصول لعتبة المشتركين (1,000 مشترك حقيقي)',
    detail: 'مشتركون حقيقيون من خلال المشاهدات الطبيعية دون شراء حسابات أو روبوتات وهمية.',
    officialRef: 'معايير الأهلية لبرنامج الشركاء',
    isMandatory: true
  },
  {
    id: 'c6',
    category: 'content',
    title: 'امتلاك حقوق التراخيص التجارية لجميع اللقطات والموسيقى',
    detail: 'الموسيقى من مكتبة يوتيوب الصوتية المجانية (YouTube Audio Library) أو منصات مرخصة تجارياً، واللقطات من Pexels أو المشاع الإبداعي الموثق.',
    officialRef: 'حقوق الطبع والنشر واستخدام المواد الخارجية',
    isMandatory: true
  },
  {
    id: 'c7',
    category: 'content',
    title: 'نظافة البيانات الوصفية وخلوها من حشو الكلمات (No Keyword Stuffing)',
    detail: 'العناوين والأوصاف تعبر بصدق عن المحتوى دون وضع قوائم عشوائية للكلمات المفتاحية في نهاية الوصف.',
    officialRef: 'سياسة البيانات الوصفية المضللة (Spam Policy)',
    isMandatory: true
  },
  {
    id: 'c8',
    category: 'technical',
    title: 'جاهزية بيانات الهوية الوطنية لحساب AdSense for YouTube',
    detail: 'امتلاك وثيقة هوية سارية (بطاقة وطنية أو جواز سفر) وعنوان بريدي حقيقي لاستلام رمز التفعيل (PIN Code) لتفعيل الحساب البنكي.',
    officialRef: 'شروط إنشاء حساب AdSense for YouTube',
    isMandatory: true
  }
];

export const FacelessMonetizationChecker: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('faceless_monetization_checklist_v1');
      return saved ? JSON.parse(saved) : ['c2', 'c3', 'c6'];
    } catch {
      return ['c2', 'c3', 'c6'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('faceless_monetization_checklist_v1', JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalCount = CHECKLIST_ITEMS.length;
  const passedCount = checkedIds.length;
  const readinessPercentage = Math.round((passedCount / totalCount) * 100);
  const isFullyReady = passedCount === totalCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-red-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 text-black shadow-lg shadow-red-500/30">
              <DollarSign className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-400">
                <ShieldCheck className="h-3 w-3" />
                <span>برنامج شركاء يوتيوب (YPP) وحساب AdSense</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                قائمة فحص تحقيق الدخل والامتثال لسياسات المحتوى
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2">
            <span className="text-xs font-bold text-zinc-400">نسبة الجاهزية للتقديم:</span>
            <span className={`text-xl font-black font-mono ${isFullyReady ? 'text-emerald-400' : 'text-amber-400'}`}>
              {readinessPercentage}%
            </span>
          </div>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          راجع البنود الثمانية الإلزامية التي يفحصها فريق مراجعة يوتيوب يدوياً قبل الموافقة على انضمام قناتك لبرنامج الشركاء وتفعيل أرباح الإعلانات، لتفادي صدمة الرفض بدعوى "المحتوى المعاد استخدامه".
        </p>
      </div>

      {/* Official Disclaimer Banner */}
      <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-200 leading-relaxed flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-amber-300 block mb-0.5">تنويه قانوني ورسمي من المنصة:</strong>
          <span>
            شروط الأهلية والسياسات خاضعة للتحديث الدوري من قبل شركة Google وYouTube وقد تختلف تفاصيلها ووسائل الدفع حسب بلد إقامتك. يُنصح دائماً بمراجعة صفحة مساعدة YouTube الرسمية (support.google.com/youtube) قبل تقديم الطلب. بلوغ الأرقام لا يضمن القبول التلقائي إلا إذا كان المحتوى مطابقاً لمعايير الجودة والأصالة.
          </span>
        </div>
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isChecked
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-zinc-300'
                  : 'bg-zinc-900/90 border-zinc-800 text-white hover:border-zinc-700'
              }`}
            >
              <div
                className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  isChecked
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                    : 'border border-zinc-700 bg-zinc-950 text-transparent'
                }`}
              >
                <CheckCircle2 className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-bold">
                    {item.category === 'policy' ? 'سياسات المحتوى' : item.category === 'technical' ? 'متطلبات تقنية' : 'أصالة الإنتاج'}
                  </span>
                  <span className={`text-[10px] font-bold ${isChecked ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isChecked ? 'مستوفى' : 'ناقص'}
                  </span>
                </div>
                <h4 className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-zinc-300' : 'text-white'}`}>
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  {item.detail}
                </p>
                <div className="mt-2 text-[10px] font-mono text-zinc-500">
                  المرجع: {item.officialRef}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Box */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-black text-white">
            {isFullyReady
              ? 'جاهزية كاملة: قناتك مستوفية لجميع معايير الجودة والأمان الرسمية 🎉'
              : 'العمل مستمر: احرص على استكمال الشروط المتبقية لضمان قبول طلبك من المرة الأولى'}
          </h4>
          <p className="text-xs text-zinc-400 mt-1">
            المراجع البشري في يوتيوب يفحص القناة للتأكد من أنها تمثل مشروعاً حقيقياً يثق فيه المعلنون.
          </p>
        </div>
        <div className="text-xs font-mono font-bold text-amber-400 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 shrink-0">
          {passedCount} من {totalCount} شروط معتمدة
        </div>
      </div>
    </div>
  );
};
