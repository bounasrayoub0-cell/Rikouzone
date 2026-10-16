import React, { useState } from 'react';
import {
  BarChart3,
  Sparkles,
  Copy,
  Check,
  Building,
  Calendar,
  Download,
  TrendingUp,
  Phone,
  Eye,
  Star,
  MessageCircle,
  Award
} from 'lucide-react';

export const LocalBusinessReportBuilder: React.FC = () => {
  const [businessName, setBusinessName] = useState<string>('');
  const [reportMonth, setReportMonth] = useState<string>('أكتوبر 2026');
  const [managerName, setManagerName] = useState<string>('');

  // Performance Metrics
  const [mapsViews, setMapsViews] = useState<number>(4200);
  const [directionRequests, setDirectionRequests] = useState<number>(340);
  const [phoneCalls, setPhoneCalls] = useState<number>(85);
  const [newReviews, setNewReviews] = useState<number>(14);
  const [averageRating, setAverageRating] = useState<number>(4.8);
  const [whatsappClicks, setWhatsappClicks] = useState<number>(120);

  const [keyWins, setKeyWins] = useState<string>(
    '1. تحسين تصنيف المحل ليظهر في أول 3 نتائج بحث محلي (Local 3-Pack).\n2. إضافة 15 صورة عالية الجودة للمنتجات حققت أكثر من 1,800 مشاهدة.\n3. الرد على كافة التقييمات وحل شكوى زبون وتحويل تقييمه من نجمة إلى 5 نجوم.'
  );

  const [nextMonthPlan, setNextMonthPlan] = useState<string>(
    '1. إطلاق حملة عروض خاصة بنهاية الأسبوع لاستهداف محيط 3 كم.\n2. إنتاج 4 فيديوهات قصيرة (Reels) تبرز كواليس العمل والتحضير.\n3. تفعيل بطاقة مراجعات سريعة بـ QR Code لجمع 20 تقييماً إيجابياً جديداً.'
  );

  const [copied, setCopied] = useState<boolean>(false);

  const generateReportSummary = () => {
    return `📈 التقرير الشهري لأداء الحضور الرقمي (Monthly Performance Report)
النشاط التجاري: ${businessName || 'المشروع الشريك'}
الشهر: ${reportMonth}
إعداد المستشار الرقمي: ${managerName || 'مسؤول الحساب'}

================================================
1. مؤشرات الأداء والأرقام المحققة (Key Metrics):
================================================
• مشاهدات ملف خرائط Google: ${mapsViews.toLocaleString()} مشاهدة
• طلبات معرفة المسار والاتجاهات للمحل (Directions): ${directionRequests} زائر فعلي
• المكالمات الهاتفية المباشرة من الخريطة: ${phoneCalls} مكالمة استفسار وحجز
• نقرات طلبات WhatsApp: ${whatsappClicks} محادثة
• التقييمات الإيجابية الجديدة: +${newReviews} تقييم (التقييم العام الحالي: ${averageRating} ⭐)

================================================
2. أبرز الإنجازات المحققة هذا الشهر:
================================================
${keyWins}

================================================
3. خطة العمل والأولويات للشهر القادم:
================================================
${nextMonthPlan}

------------------------------------------------
💡 الخلاصة التقديرية:
بفضل هذه التحديثات والتحسينات، زاد تدفق الزبائن الجدد للمحل بنسبة ملحوظة مقارنة بالأشهر السابقة، مما يضمن استمرار نمو المبيعات وتعزيز الثقة في منطقتنا.`;
  };

  const handleCopy = () => {
    const text = generateReportSummary();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generateReportSummary();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Monthly_Report_${businessName || 'Client'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-bold text-teal-400">
              <Sparkles className="h-4 w-4" />
              <span>الأداة التفاعلية السادسة · إثبات القيمة وتجديد الاشتراكات</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              مولد تقرير أداء العميل الشهري (Client Performance Report)
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              لا تجعل التاجر يتساءل: «ماذا قدمتم لي هذا الشهر؟». أرسل له هذا التقرير المبسط بالأرقام ليرى كيف تحولت جهودك إلى اتصالات وزيارات وزبائن حقيقيين على أرض الواقع.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-200 hover:bg-zinc-700 transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>تحميل التقرير</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500 px-4 py-2 text-xs font-black text-black hover:bg-teal-400 transition shadow-lg shadow-teal-500/20"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'تم النسخ' : 'نسخ التقرير'}</span>
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">اسم النشاط التجاري</label>
            <input
              type="text"
              placeholder="مثال: مطعم الأندلس"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">فترة التقرير</label>
            <input
              type="text"
              placeholder="مثال: أكتوبر 2026"
              value={reportMonth}
              onChange={(e) => setReportMonth(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">اسمك / اسم الوكالة</label>
            <input
              type="text"
              placeholder="مثال: أيوب ميديا"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
            <Eye className="h-4 w-4 text-sky-400" />
            <span>المشاهدات</span>
          </div>
          <input
            type="number"
            value={mapsViews}
            onChange={(e) => setMapsViews(Number(e.target.value))}
            className="mt-2 w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-2 py-1 text-sm font-black text-white text-center focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span>طلب المسار</span>
          </div>
          <input
            type="number"
            value={directionRequests}
            onChange={(e) => setDirectionRequests(Number(e.target.value))}
            className="mt-2 w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-2 py-1 text-sm font-black text-white text-center focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
            <Phone className="h-4 w-4 text-amber-400" />
            <span>الاتصالات</span>
          </div>
          <input
            type="number"
            value={phoneCalls}
            onChange={(e) => setPhoneCalls(Number(e.target.value))}
            className="mt-2 w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-2 py-1 text-sm font-black text-white text-center focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
            <MessageCircle className="h-4 w-4 text-teal-400" />
            <span>واتساب</span>
          </div>
          <input
            type="number"
            value={whatsappClicks}
            onChange={(e) => setWhatsappClicks(Number(e.target.value))}
            className="mt-2 w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-2 py-1 text-sm font-black text-white text-center focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>تقييمات جديدة</span>
          </div>
          <input
            type="number"
            value={newReviews}
            onChange={(e) => setNewReviews(Number(e.target.value))}
            className="mt-2 w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-2 py-1 text-sm font-black text-white text-center focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
            <Award className="h-4 w-4 text-purple-400" />
            <span>معدل النجوم</span>
          </div>
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            value={averageRating}
            onChange={(e) => setAverageRating(Number(e.target.value))}
            className="mt-2 w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-2 py-1 text-sm font-black text-white text-center focus:border-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Wins and Plan Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-zinc-400 mb-1.5">
            أبرز الإنجازات والانتصارات المحققة هذا الشهر
          </label>
          <textarea
            rows={4}
            value={keyWins}
            onChange={(e) => setKeyWins(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 text-xs text-white focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 mb-1.5">
            خطة العمل وأهداف الشهر القادم
          </label>
          <textarea
            rows={4}
            value={nextMonthPlan}
            onChange={(e) => setNextMonthPlan(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 text-xs text-white focus:border-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Generated Report Output */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
        <h3 className="text-base font-black text-white flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-teal-400" />
          <span>معاينة نص التقرير الشهري</span>
        </h3>

        <div className="mt-4 p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap selection:bg-teal-500 selection:text-black">
          {generateReportSummary()}
        </div>
      </div>
    </div>
  );
};
