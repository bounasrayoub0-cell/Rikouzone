import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  BarChart2, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Zap
} from 'lucide-react';

interface SmmCalculatorsAndToolsProps {
  onCopyText: (text: string, label: string) => void;
}

export const SmmCalculatorsAndTools: React.FC<SmmCalculatorsAndToolsProps> = ({ onCopyText }) => {
  // 1. Engagement Rate Calculator
  const [likes, setLikes] = useState<number>(350);
  const [comments, setComments] = useState<number>(45);
  const [shares, setShares] = useState<number>(85);
  const [saves, setSaves] = useState<number>(120);
  const [reach, setReach] = useState<number>(10000);

  const totalInteractions = (likes || 0) + (comments || 0) + (shares || 0) + (saves || 0);
  const safeReach = reach > 0 ? reach : 1;
  const engagementRate = ((totalInteractions / safeReach) * 100).toFixed(2);

  // 2. Client Retainer Pricing Calculator
  const [postCount, setPostCount] = useState<number>(16);
  const [platformsCount, setPlatformsCount] = useState<number>(2);
  const [includeCommunity, setIncludeCommunity] = useState<boolean>(true);
  const [includeAdsManagement, setIncludeAdsManagement] = useState<boolean>(false);
  const [includeMonthlyReport, setIncludeMonthlyReport] = useState<boolean>(true);

  const basePricePerPost = 25; // average $25 per crafted post
  const platformMultiplier = platformsCount === 1 ? 1 : platformsCount === 2 ? 1.4 : 1.8;
  const communityAddon = includeCommunity ? 150 : 0;
  const adsAddon = includeAdsManagement ? 250 : 0;
  const reportAddon = includeMonthlyReport ? 80 : 0;

  const estimatedMonthlyRetainer = Math.round(
    (postCount * basePricePerPost * platformMultiplier) + communityAddon + adsAddon + reportAddon
  );

  // 3. Client Monthly Report Generator
  const [clientName, setClientName] = useState('مطعم النار والزيتون');
  const [reportMonth, setReportMonth] = useState('أكتوبر 2026');
  const [reportReach, setReportReach] = useState('38,400');
  const [reportFollowers, setReportFollowers] = useState('+950');
  const [reportInquiries, setReportInquiries] = useState('42');
  const [reportTopPost, setReportTopPost] = useState('ريلز ذوبان الجبن في الفرن الخشبي');
  const [reportNextFocus, setReportNextFocus] = useState('إطلاق عروض منتصف الأسبوع وتفعيل مسار الرسائل الآلية');

  const generatedReportText = `📊 التقرير الإحصائي الشهري للعميل: ${clientName}
الفترة: ${reportMonth} | إعداد: فريق إدارة السوشيال ميديا

1. الملخص التنفيذي والأداء العام:
خلال هذا الشهر، نجحنا في تطبيق استراتيجية التركيز على الريلز البصرية عالية التفاعل وتعزيز ثقة الجمهور.
- إجمالي الوصول المستهدف (Reach): ${reportReach} حساب
- نمو المتابعين الجدد (Followers Growth): ${reportFollowers} متابع حقيقي
- الرسائل والاستفسارات البيعية المؤهلة (Qualified Inquiries): ${reportInquiries} محادثة

2. أفضل منشور أداءً:
- المنشور الأفضل: "${reportTopPost}"
- السبب: حقق أعلى معدل حفظ ومشاركة وجلب أكثر من 40% من استفسارات هذا الشهر.

3. خطة وتوصيات الشهر القادم:
- ${reportNextFocus}
- الاستمرار في وتيرة النشر الحالية ومضاعفة المحتوى الأكثر حفظاً.`;

  return (
    <div className="space-y-8">
      {/* 1. Engagement Rate Calculator */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400 border border-amber-500/20">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">حاسبة معدل التفاعل الحقيقي (Engagement Rate Calculator)</h3>
            <p className="text-xs text-zinc-400">احسب نسبة التفاعل لأي منشور أو حساب بناءً على مجموع التفاعلات والوصول الفعلي.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">الإعجابات (Likes)</label>
            <input
              type="number"
              value={likes}
              onChange={(e) => setLikes(Number(e.target.value))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">التعليقات (Comments)</label>
            <input
              type="number"
              value={comments}
              onChange={(e) => setComments(Number(e.target.value))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">المشاركات (Shares)</label>
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(Number(e.target.value))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">الحفظ (Saves)</label>
            <input
              type="number"
              value={saves}
              onChange={(e) => setSaves(Number(e.target.value))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-amber-400 mb-1">الوصول (Reach)</label>
            <input
              type="number"
              value={reach}
              onChange={(e) => setReach(Number(e.target.value))}
              className="w-full rounded-xl border border-amber-500/40 bg-zinc-950 px-3 py-2 text-xs text-amber-300 focus:border-amber-500 focus:outline-none font-bold"
            />
          </div>
        </div>

        {/* Engagement Rate Result Box */}
        <div className="mt-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-zinc-400 font-semibold">معدل التفاعل المحسوب:</div>
            <div className="text-3xl font-black text-amber-400 mt-0.5">{engagementRate}%</div>
            <div className="text-[11px] text-zinc-500 mt-1">
              مجموع التفاعلات: {totalInteractions.toLocaleString()} تفاعل على {safeReach.toLocaleString()} وصول.
            </div>
          </div>

          <div className="rounded-xl px-3.5 py-2 border text-xs font-bold shrink-0">
            {Number(engagementRate) >= 6 ? (
              <span className="text-emerald-400">🔥 أداء استثنائي وفيروسي (Viral & Exceptional)</span>
            ) : Number(engagementRate) >= 3.5 ? (
              <span className="text-amber-400">✨ أداء ممتاز وصحي فوق المتوسط العالمي (Great)</span>
            ) : Number(engagementRate) >= 1.5 ? (
              <span className="text-blue-400">👍 أداء متوسط مقبول يحتاج تحسين الخطافات (Average)</span>
            ) : (
              <span className="text-rose-400">⚠️ أداء ضعيف يحتاج لتغيير المحتوى فوراً (Needs Improvement)</span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Client Retainer & Pricing Calculator */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">حاسبة تسعير العقود الشهرية (Monthly Retainer Calculator)</h3>
            <p className="text-xs text-zinc-400">حدد نطاق العمل لحساب السعر الشهري العادل والمنطقي لعرضه على العميل بثقة.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                <span>عدد المنشورات الشهرية (Posts & Reels):</span>
                <span className="text-amber-400">{postCount} منشوراً</span>
              </div>
              <input
                type="range"
                min="8"
                max="30"
                step="2"
                value={postCount}
                onChange={(e) => setPostCount(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                <span>عدد المنصات المدارة:</span>
                <span className="text-amber-400">{platformsCount} منصات</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={platformsCount}
                onChange={(e) => setPlatformsCount(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCommunity}
                  onChange={(e) => setIncludeCommunity(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-950 text-amber-500 focus:ring-0"
                />
                <span>إدارة الردود والرسائل المباشرة DMs (+150$)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAdsManagement}
                  onChange={(e) => setIncludeAdsManagement(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-950 text-amber-500 focus:ring-0"
                />
                <span>إعداد ومتابعة الإعلانات الممولة Meta Ads (+250$)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeMonthlyReport}
                  onChange={(e) => setIncludeMonthlyReport(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-950 text-amber-500 focus:ring-0"
                />
                <span>إعداد التقرير التحليلي الشهري وجلسة المراجعة (+80$)</span>
              </label>
            </div>
          </div>

          {/* Pricing Quote Summary Box */}
          <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">السعر الشهري المقترح للباقة:</span>
              <div className="text-4xl font-black text-emerald-400 mt-1">
                ${estimatedMonthlyRetainer}
                <span className="text-xs text-zinc-500 font-normal"> / شهرياً</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                هذا السعر يغطي الجهد الاستراتيجي، التصميم، الجدولة، والخدمات المحددة ويضمن لك هامش ربح ممتاز ومستدام.
              </p>
            </div>

            <button
              onClick={() => {
                const quoteText = `📌 مقترح تسعير باقة إدارة السوشيال ميديا الشهرية:
- عدد المنشورات: ${postCount} منشوراً شهرياً
- المنصات المشمولة: ${platformsCount} منصات
- إدارة المجتمع والرسائل: ${includeCommunity ? 'نعم متضمنة' : 'غير متضمنة'}
- متابعة الحملات الإعلانية: ${includeAdsManagement ? 'نعم متضمنة' : 'غير متضمنة'}
- التقرير الشهري: ${includeMonthlyReport ? 'نعم متضمن' : 'غير متضمن'}

السعر الشهري للاشتراك: $${estimatedMonthlyRetainer} / شهرياً.`;
                onCopyText(quoteText, 'تم نسخ تفاصيل المقترح المالي بنجاح!');
              }}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-xs font-black text-black hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
            >
              <Copy className="h-4 w-4" />
              <span>نسخ مقترح التسعير للعميل</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Client Monthly Report Generator */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-400 border border-purple-500/20">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">مولّد التقرير الشهري الجاهز للعميل (Report Generator)</h3>
            <p className="text-xs text-zinc-400">املأ الأرقام السريعة لتوليد تقرير شهري منسق ومصاغ باحترافية جاهز للنسخ والإرسال.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">اسم العميل أو النشاط</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">الشهر المستهدف</label>
            <input
              type="text"
              value={reportMonth}
              onChange={(e) => setReportMonth(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">إجمالي الوصول (Reach)</label>
            <input
              type="text"
              value={reportReach}
              onChange={(e) => setReportReach(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">نمو المتابعين الجدد</label>
            <input
              type="text"
              value={reportFollowers}
              onChange={(e) => setReportFollowers(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">الرسائل والاستفسارات</label>
            <input
              type="text"
              value={reportInquiries}
              onChange={(e) => setReportInquiries(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">عنوان أفضل منشور أداءً</label>
            <input
              type="text"
              value={reportTopPost}
              onChange={(e) => setReportTopPost(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-xs font-bold text-zinc-300 mb-1">التركيز الاستراتيجي للشهر القادم</label>
          <input
            type="text"
            value={reportNextFocus}
            onChange={(e) => setReportNextFocus(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
          />
        </div>

        <div className="mt-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-400">معاينة التقرير الجاهز:</span>
            <button
              onClick={() => onCopyText(generatedReportText, 'تم نسخ التقرير الشهري بنجاح!')}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1 text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-sm"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>نسخ التقرير</span>
            </button>
          </div>
          <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed select-all">
            {generatedReportText}
          </pre>
        </div>
      </div>
    </div>
  );
};
