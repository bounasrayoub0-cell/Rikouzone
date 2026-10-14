import React, { useState, useMemo } from 'react';
import { 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Users, 
  DollarSign, 
  Clock, 
  HelpCircle,
  Share2,
  Building2
} from 'lucide-react';

export const MicroSaasLaunchSimulator: React.FC = () => {
  const [productTitle, setProductTitle] = useState<string>('DocuFast AI');
  const [tagline, setTagline] = useState<string>('Extract tax receipts and invoice data into clean spreadsheets in 10s');
  const [hasGifDemo, setHasGifDemo] = useState<boolean>(true);
  const [hasVideoDemo, setHasVideoDemo] = useState<boolean>(true);
  const [hasStoryComment, setHasStoryComment] = useState<boolean>(true);
  const [hasLaunchDiscount, setHasLaunchDiscount] = useState<boolean>(true);
  const [launchedAtMidnightPst, setLaunchedAtMidnightPst] = useState<boolean>(true);
  const [xThreadReady, setXThreadReady] = useState<boolean>(true);
  const [redditCommunityReady, setRedditCommunityReady] = useState<boolean>(false);
  const [subscriptionPrice, setSubscriptionPrice] = useState<number>(29);

  const simulation = useMemo(() => {
    let score = 20; // Base score
    if (hasGifDemo) score += 15;
    if (hasVideoDemo) score += 15;
    if (hasStoryComment) score += 15;
    if (hasLaunchDiscount) score += 10;
    if (launchedAtMidnightPst) score += 15;
    if (xThreadReady) score += 10;
    if (redditCommunityReady) score += 10;

    score = Math.min(100, score);

    // Projected Metrics
    let rankBadge = '#1 - #3 Product of the Day';
    let badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    let expectedUpvotes = Math.round(350 + (score / 100) * 350);
    let expectedVisitors = Math.round(expectedUpvotes * 4.8);
    let expectedSignups = Math.round(expectedVisitors * 0.12);
    let dayOnePaidUsers = Math.max(1, Math.round(expectedSignups * 0.08));
    let dayOneMrr = dayOnePaidUsers * subscriptionPrice;

    if (score < 50) {
      rankBadge = '#15+ Product of the Day';
      badgeColor = 'text-zinc-400 bg-zinc-800 border-zinc-700';
    } else if (score < 75) {
      rankBadge = 'Top 5 - 10 Product of the Day';
      badgeColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    }

    return {
      score,
      rankBadge,
      badgeColor,
      expectedUpvotes,
      expectedVisitors,
      expectedSignups,
      dayOnePaidUsers,
      dayOneMrr
    };
  }, [
    hasGifDemo,
    hasVideoDemo,
    hasStoryComment,
    hasLaunchDiscount,
    launchedAtMidnightPst,
    xThreadReady,
    redditCommunityReady,
    subscriptionPrice
  ]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      {/* Intro Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-rose-400 text-sm font-bold">
              <Rocket className="h-4 w-4" />
              <span>محاكي إطلاق Product Hunt واليوم الأول</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              محاكي حملة الإطلاق وحساب زوار ومبيعات اليوم الأول
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl">
              اختبر مدى جاهزية أصول إطلاقك لتعرف ترتيبك المتوقع بين أفضل 5 منتجات يومية على Product Hunt، وعدد الزيارات والاشتراكات الفورية في أول 24 ساعة.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Checkboxes / Input (Left / Span 7) */}
        <div className="lg:col-span-7 space-y-5 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Sparkles className="h-4 w-4 text-rose-400" />
            <span>عناصر خطة الإطلاق وتجهيز اليوم الحاسم</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium block">اسم المنتج</label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium block">سعر الاشتراك الشهري ($)</label>
              <input
                type="number"
                value={subscriptionPrice}
                onChange={(e) => setSubscriptionPrice(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-medium block">العنوان الفرعي (Tagline - أقل من 60 حرفاً)</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-zinc-300 block">عوامل قوة الحملة ورفع الترتيب:</span>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60 transition-colors cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={launchedAtMidnightPst}
                onChange={(e) => setLaunchedAtMidnightPst(e.target.checked)}
                className="accent-rose-500 h-4 w-4 rounded"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-zinc-200 block">الإطلاق في الدقيقة 12:01 صباحاً بتوقيت كاليفورنيا (PST)</span>
                <span className="text-[11px] text-zinc-500 block">يمنحك كامل فترة المنافسة الرسمية (24 ساعة كاملة) لجمع التفاعل.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60 transition-colors cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={hasGifDemo}
                onChange={(e) => setHasGifDemo(e.target.checked)}
                className="accent-rose-500 h-4 w-4 rounded"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-zinc-200 block">شعار وأيقونة بصيغة GIF متحركة تعرض الأداة في ثوانٍ</span>
                <span className="text-[11px] text-zinc-500 block">الصور المتحركة تلفت الأنظار فوراً في خلاصة المنتجات وتضاعف نسبة النقر.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60 transition-colors cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={hasVideoDemo}
                onChange={(e) => setHasVideoDemo(e.target.checked)}
                className="accent-rose-500 h-4 w-4 rounded"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-zinc-200 block">فيديو استعراضي سريع (60 ثانية) يظهر المشكلة والحل الفوري</span>
                <span className="text-[11px] text-zinc-500 block">يزيل أي غموض عن كيفية عمل الأداة ويولد ثقة احترافية سريعة.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60 transition-colors cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={hasStoryComment}
                onChange={(e) => setHasStoryComment(e.target.checked)}
                className="accent-rose-500 h-4 w-4 rounded"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-zinc-200 block">تعليق صانع (Maker Comment) شفاف يسرد قصة البناء والصعوبات</span>
                <span className="text-[11px] text-zinc-500 block">المجتمع يعشق القصص الإنسانية والمبرمجين الذين يحلون مشاكلهم بأنفسهم.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60 transition-colors cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={hasLaunchDiscount}
                onChange={(e) => setHasLaunchDiscount(e.target.checked)}
                className="accent-rose-500 h-4 w-4 rounded"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-zinc-200 block">كوبون خصم إطلاق حصري (مثال: PH50 لخصم 50% لأول 50 مشتركاً)</span>
                <span className="text-[11px] text-zinc-500 block">يحفز مجتمع المصوتين على الشراء الفوري قبل انتهاء اليوم.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60 transition-colors cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={xThreadReady}
                onChange={(e) => setXThreadReady(e.target.checked)}
                className="accent-rose-500 h-4 w-4 rounded"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-zinc-200 block">ثريد إطلاق معد مسبقاً على X/Twitter مع فيديو مدمج في أول تغريدة</span>
                <span className="text-[11px] text-zinc-500 block">يجلب مئات الزوار الإضافيين من شبكتك على وسائل التواصل.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60 transition-colors cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={redditCommunityReady}
                onChange={(e) => setRedditCommunityReady(e.target.checked)}
                className="accent-rose-500 h-4 w-4 rounded"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-zinc-200 block">مشاركة تجربة البناء على مجتمعات Reddit المستهدفة بدون ترويج رخيص</span>
                <span className="text-[11px] text-zinc-500 block">مشاركة الدروس المستفادة في r/SideProject و r/SaaS تجلب مئات المجربين الجادين.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Output Metrics (Right / Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-5 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              النتيجة التقديرية للحملة في أول 24 ساعة
            </span>

            <div className="inline-block">
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold border inline-flex items-center gap-1.5 ${simulation.badgeColor}`}>
                <Award className="h-4 w-4" />
                <span>{simulation.rankBadge}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-right">
              <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-zinc-400 block">الأصوات المتوقعة (Upvotes)</span>
                <span className="text-xl font-mono font-bold text-rose-400">▲ {simulation.expectedUpvotes}</span>
              </div>

              <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-zinc-400 block">الزيارات لموقعك</span>
                <span className="text-xl font-mono font-bold text-cyan-400">{simulation.expectedVisitors.toLocaleString()}</span>
              </div>

              <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-zinc-400 block">التسجيلات والتجارب</span>
                <span className="text-xl font-mono font-bold text-purple-400">{simulation.expectedSignups}</span>
              </div>

              <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-zinc-400 block">مشتركون مدفوعون (اليوم 1)</span>
                <span className="text-xl font-mono font-bold text-emerald-400">{simulation.dayOnePaidUsers} عميل</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-right">
              <span className="text-xs font-bold text-emerald-400 block mb-1">
                الإيراد الشهري المتكرر الجديد الناتج عن اليوم الأول:
              </span>
              <div className="text-3xl font-black text-white font-mono">
                +${simulation.dayOneMrr.toLocaleString()}
                <span className="text-xs text-zinc-400 font-normal mr-2">/ شهرياً MRR</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 text-right leading-relaxed">
              تذكر: يوم الإطلاق يمنحك الدفعة الأولية والدليل الاجتماعي، لكن الاستمرارية تتطلب التسويق اليومي والتواصل المباشر مع الشركات.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
