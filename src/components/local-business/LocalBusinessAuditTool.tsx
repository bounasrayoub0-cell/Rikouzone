import React, { useState, useMemo } from 'react';
import {
  MapPin,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Search,
  Building,
  Phone,
  Clock,
  Star,
  Image,
  Globe,
  Share2
} from 'lucide-react';

interface AuditCriterion {
  id: string;
  category: 'maps' | 'visuals' | 'social' | 'website';
  title: string;
  description: string;
  weight: number; // XP points or score percentage
  severity: 'critical' | 'high' | 'medium';
}

const AUDIT_CRITERIA: AuditCriterion[] = [
  // Maps & Profile
  {
    id: 'claimed_gbp',
    category: 'maps',
    title: 'المطالبة بالنشاط وتوثيقه رسمياً (Claimed & Verified)',
    description: 'الملف موثق برمز أزرق ومملوك للمحل وليس معلقاً أو متاحاً للمطالبة العامة.',
    weight: 15,
    severity: 'critical'
  },
  {
    id: 'accurate_nap',
    category: 'maps',
    title: 'دقة وتطابق بيانات NAP (الاسم، العنوان، الهاتف)',
    description: 'الاسم مطابق للافتة المحل، العنوان مع الرمز البريدي واضح، ورقم الهاتف يعمل ومتاح للاتصال.',
    weight: 12,
    severity: 'critical'
  },
  {
    id: 'primary_category',
    category: 'maps',
    title: 'التصنيف الرئيسي والتصنيفات الفرعية الدقيقة',
    description: 'اختيار التصنيف المهني الأنسب لنشاط المحل (مثلاً "مطعم برغر" وليس فقط "مطعم").',
    weight: 10,
    severity: 'high'
  },
  {
    id: 'business_hours',
    category: 'maps',
    title: 'تحديد ساعات العمل وأوقات العطل الرسمية بدقة',
    description: 'تفادي ذهاب الزبائن ليجدوا الباب مقفلاً، مع تفعيل مواعيد الإغلاق في الأعياد.',
    weight: 8,
    severity: 'high'
  },
  {
    id: 'reviews_replies',
    category: 'maps',
    title: 'معدل التقييمات والرد على التعليقات (إيجابية وسلبية)',
    description: 'التقييم أعلى من 4.2 نجوم مع ردود مهنية سريعة على كافة الشكاوى والملاحظات.',
    weight: 10,
    severity: 'high'
  },
  // Visuals
  {
    id: 'facade_photo',
    category: 'visuals',
    title: 'صورة واجهة المحل الخارجية في النهار والليل',
    description: 'تساعد الزائر والزبون على تمييز الباب والمدخل بسهولة عند الوصول بالسيارة أو مشياً.',
    weight: 8,
    severity: 'medium'
  },
  {
    id: 'products_menu_photos',
    category: 'visuals',
    title: 'صور عالية الجودة للأطباق / المنتجات / قائمة الأسعار',
    description: 'صور نظيفة بإضاءة طبيعية واضحة بدون تشويش أو قوائم غير مقروءة بالهاتف.',
    weight: 10,
    severity: 'high'
  },
  {
    id: 'interior_ambiance',
    category: 'visuals',
    title: 'صور البيئة الداخلية وفريق العمل',
    description: 'إظهار نظافة المكان، جودة الجلسات، وترحيب الطاقم لبناء الألفة والأمان.',
    weight: 7,
    severity: 'medium'
  },
  // Social & Contact
  {
    id: 'active_whatsapp',
    category: 'social',
    title: 'زر طلب وحجز عبر WhatsApp Business مباشر',
    description: 'رابط مباشر يفتح المحادثة بنقرة واحدة، مع رد ترحيبي تلقائي وقائمة خدمات.',
    weight: 10,
    severity: 'critical'
  },
  {
    id: 'recent_social_posts',
    category: 'social',
    title: 'حساب Instagram/Facebook نشط خلال آخر 10 أيام',
    description: 'منشورات وReels حديثة تثبت أن المحل يعمل ومستمر، وليست حسابات مهملة منذ أشهر.',
    weight: 5,
    severity: 'medium'
  },
  {
    id: 'simple_mobile_web',
    category: 'website',
    title: 'موقع تعريفي سريع متوافق مع الهاتف (أو رابط مجمع منظم)',
    description: 'صفحة سريعة توضح العنوان، قائمة الأسعار، أزرار الاتصال ومسار الخريطة بنقرة واحدة.',
    weight: 5,
    severity: 'medium'
  }
];

export const LocalBusinessAuditTool: React.FC = () => {
  const [businessName, setBusinessName] = useState<string>('');
  const [businessType, setBusinessType] = useState<string>('مطعم / مقهى');
  const [cityNeighborhood, setCityNeighborhood] = useState<string>('');
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<boolean>(false);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalScore = useMemo(() => {
    return AUDIT_CRITERIA.reduce((acc, curr) => {
      return checkedIds[curr.id] ? acc + curr.weight : acc;
    }, 0);
  }, [checkedIds]);

  const scoreAssessment = useMemo(() => {
    if (totalScore >= 85) {
      return {
        level: 'ممتاز وعصري',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/30',
        badge: 'حضور رقمي مكتمل',
        advice: 'النشاط جاهز للمرحلة المتقدمة: حملات إعلانية مدفوعة وتوسيع قاعدة العملاء ببرامج الولاء.'
      };
    } else if (totalScore >= 55) {
      return {
        level: 'متوسط وبه ثغرات واضحة',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30',
        badge: 'فرصة تحسين عالية (Quick Wins)',
        advice: 'النشاط يخسر عملاء يومياً بسبب تفاصيل بسيطة: صور غير واضحة، نقص الردود، أو غياب زر واتساب.'
      };
    } else {
      return {
        level: 'ضعيف أو مهمل تماماً',
        color: 'text-rose-400',
        bg: 'bg-rose-500/10 border-rose-500/30',
        badge: 'حالة إنعاش رقمي مستعجلة',
        advice: 'المحل غير مرئي للزبائن في منطقته ويفقد زبائن جدد لصالح منافسيه يومياً. فرصة ذهبية لتقديم باقة إنعاش شاملة.'
      };
    }
  }, [totalScore]);

  const missingCriticalItems = useMemo(() => {
    return AUDIT_CRITERIA.filter(
      (item) => !checkedIds[item.id] && (item.severity === 'critical' || item.severity === 'high')
    );
  }, [checkedIds]);

  const generateReportText = () => {
    const passed = AUDIT_CRITERIA.filter((i) => checkedIds[i.id]).map((i) => `✓ ${i.title}`).join('\n');
    const missing = AUDIT_CRITERIA.filter((i) => !checkedIds[i.id]).map((i) => `✗ ${i.title} (${i.description})`).join('\n');

    return `📊 تقرير الفحص والتدقيق الرقمي للنشاط التجاري
النشاط: ${businessName || 'مشروع محلي'}
النوع: ${businessType}
المدينة/الحي: ${cityNeighborhood || 'غير محدد'}
تاريخ الفحص: ${new Date().toLocaleDateString('ar-EG')}

النتيجة الإجمالية: ${totalScore} / 100 (${scoreAssessment.level})
التقييم العام: ${scoreAssessment.advice}

✅ العناصر المتوفرة:
${passed || 'لا توجد عناصر مكتملة حالياً.'}

⚠️ الثغرات المطلوب معالجتها فوراً (أولويات العمل):
${missing || 'جميع العناصر الأساسية مكتملة.'}

💡 الخطوة المقترحة:
تنفيذ حزمة تحسين سريعة (Google Maps + تصوير المنتجات + ربط WhatsApp) لاستعادة الزبائن المفقودين.`;
  };

  const handleCopyReport = () => {
    const text = generateReportText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCheckedIds({});
    setBusinessName('');
    setCityNeighborhood('');
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Tool Introduction */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400">
              <Sparkles className="h-4 w-4" />
              <span>الأداة التفاعلية الأولى · فحص وتدقيق التواجد الرقمي</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              أداة تدقيق خرائط Google والحضور المحلي (Local Audit Tool)
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              استخدم هذه القائمة أثناء زيارتك الميدانية أو فحصك لحسابات أي نشاط تجاري في مدينتك. احسب درجة الجاهزية واكشف الثغرات التي تجعل التاجر يخسر زبائنه لصالح المنافسين.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-700 transition"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>إعادة ضبط</span>
            </button>
            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-black text-black hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'تم نسخ التقرير' : 'نسخ تقرير الفحص'}</span>
            </button>
          </div>
        </div>

        {/* Business Inputs */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">
              اسم النشاط التجاري
            </label>
            <div className="relative">
              <Building className="absolute top-3 right-3 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="مثال: مطعم الأندلس، صالون النخبة..."
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 pr-9 pl-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">
              نوع النشاط
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="مطعم / مقهى">مطعم / مقهى</option>
              <option value="صالون حلاقة / مركز تجميل">صالون حلاقة / مركز تجميل</option>
              <option value="عيادة طبية / مركز أسنان">عيادة طبية / مركز أسنان</option>
              <option value="متجر ملابس / أحذية">متجر ملابس / أحذية</option>
              <option value="ورشة ميكانيك / خدمات سيارات">ورشة ميكانيك / خدمات سيارات</option>
              <option value="نادي رياضي / جيم">نادي رياضي / جيم</option>
              <option value="مخبزة / متجر حلويات">مخبزة / متجر حلويات</option>
              <option value="خدمات منزلية / سباكة / كهرباء">خدمات منزلية / سباكة / كهرباء</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">
              المدينة / الحي
            </label>
            <div className="relative">
              <MapPin className="absolute top-3 right-3 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="مثال: الدار البيضاء - حي المعاريف"
                value={cityNeighborhood}
                onChange={(e) => setCityNeighborhood(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 pr-9 pl-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Score Dashboard Card */}
      <div className={`rounded-3xl border ${scoreAssessment.bg} p-6 sm:p-8 backdrop-blur-xl transition-all`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className={`inline-block text-xs font-black uppercase tracking-wider ${scoreAssessment.color}`}>
              {scoreAssessment.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-3">
              <span>درجة الجاهزية الرقمية:</span>
              <span className={`text-3xl sm:text-4xl font-extrabold ${scoreAssessment.color}`}>
                {totalScore}%
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
              {scoreAssessment.advice}
            </p>
          </div>

          <div className="w-full sm:w-48 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80 text-center">
            <div className="text-xs text-zinc-400 font-medium">العناصر المكتملة</div>
            <div className="mt-1 text-2xl font-black text-white">
              {Object.values(checkedIds).filter(Boolean).length} / {AUDIT_CRITERIA.length}
            </div>
            <div className="mt-2 w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalScore}%` }}
              />
            </div>
          </div>
        </div>

        {missingCriticalItems.length > 0 && (
          <div className="mt-6 pt-6 border-t border-zinc-800/80">
            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>أهم الثغرات الواجب استهدافها في عرضك الأول ({missingCriticalItems.length} عناصر):</span>
            </h4>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {missingCriticalItems.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/50">
                  <XCircle className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                  <span className="font-semibold text-white">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Checklist items */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <span>بنود التدقيق الميداني والفحص التفصيلي</span>
          <span className="text-xs text-zinc-400 font-normal">
            (اضغط على كل بند يتمتع به المحل حالياً)
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {AUDIT_CRITERIA.map((criterion) => {
            const isChecked = !!checkedIds[criterion.id];
            return (
              <div
                key={criterion.id}
                onClick={() => toggleCheck(criterion.id)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-150 flex items-start gap-3.5 ${
                  isChecked
                    ? 'border-emerald-500/50 bg-emerald-500/5 shadow-md shadow-emerald-500/5'
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900/90'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-500 text-black'
                      : 'border-zinc-700 bg-zinc-800'
                  }`}
                >
                  {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-black ${isChecked ? 'text-emerald-400' : 'text-zinc-200'}`}>
                      {criterion.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                      +{criterion.weight} نقطة
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                    {criterion.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
