import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  Globe, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Clock, 
  Target, 
  Database, 
  Server, 
  Monitor, 
  Code,
  Users,
  Repeat,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface RikouLessonIllustrationProps {
  lessonId: string;
  trackId: string;
  title: string;
  subtitle?: string;
  lessonNumber?: number;
  className?: string;
}

export const RikouLessonIllustration: React.FC<RikouLessonIllustrationProps> = ({
  lessonId,
  trackId,
  title,
  subtitle,
  lessonNumber = 1,
  className = ''
}) => {
  const { isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <figure 
      aria-label={`مخطط ورسم توضيحي تعليمي: ${title}`}
      className={`relative overflow-hidden rounded-3xl border border-amber-500/35 bg-gradient-to-b from-slate-900 via-zinc-950 to-black text-white p-4 sm:p-6 shadow-2xl shadow-amber-500/5 my-4 ${className}`}
    >
      {/* Background ambient neon lighting */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Official RikouZone Visual Header with Verified Logo */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-amber-500/50 bg-zinc-950 p-1 shrink-0 shadow-lg shadow-amber-500/10">
            <img
              src="/assets/rz-hero-badge.png"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedSvg) {
                  target.dataset.triedSvg = 'true';
                  target.src = '/assets/rz-hero-badge.svg';
                } else if (!target.dataset.triedFile) {
                  target.dataset.triedFile = 'true';
                  target.src = '/file_00000000b1d881f496a6612e6eef85ce.png';
                }
              }}
              alt="شعار منصة RikouZone"
              className="h-full w-full object-contain rounded-lg select-none"
              width={40}
              height={40}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-white font-sans tracking-tight">
                Rikou<span className="text-amber-400">Zone</span>
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ACADEMY
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium block">
              المخطط البصري التعليمي المعتمد 2026
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700/60">
            الدرس #{lessonNumber}
          </span>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40">
            {trackId === 'affiliate-marketing' ? 'التسويق بالعمولة' : trackId === 'web-development' ? 'تطوير المواقع' : 'مسار تدريبي'}
          </span>
        </div>
      </div>

      {/* Diagram Heading */}
      <div className="relative z-10 mb-4 text-center sm:text-start">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>المخطط التوضيحي للدرس: {title}</span>
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* ============================================================== */}
      {/* TOPIC-SPECIFIC VISUAL SVG / GRAPHICAL INFOGRAPHICS             */}
      {/* ============================================================== */}
      <div className="relative z-10 my-4">

        {/* 1. AFFILIATE: Lesson 1 (The Core Affiliate Revenue Loop) */}
        {lessonId === 'm1-l1' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Step 1 */}
              <div className="p-3.5 rounded-2xl border border-amber-500/40 bg-zinc-900/80 backdrop-blur-md flex flex-col justify-between relative group hover:border-amber-400 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-black font-black text-xs">1</span>
                    <Smartphone className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1">صانع المحتوى (أنت)</h4>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    تنشر فيديو أو مراجعة بالهاتف وتضع رابط التتبع المخصص لك.
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-zinc-800 text-[10px] text-amber-400 font-semibold flex items-center justify-between">
                  <span>التكلفة: 0$ مجاني</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-2xl border border-blue-500/40 bg-zinc-900/80 backdrop-blur-md flex flex-col justify-between relative group hover:border-blue-400 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500 text-white font-black text-xs">2</span>
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1">الزائر المهتم</h4>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    يشاهد المحتوى، يثق في التوصية، وينقر على رابطك الخاص.
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-zinc-800 text-[10px] text-blue-400 font-semibold flex items-center justify-between">
                  <span>تفعيل كود الكوكيز</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-2xl border border-purple-500/40 bg-zinc-900/80 backdrop-blur-md flex flex-col justify-between relative group hover:border-purple-400 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-500 text-white font-black text-xs">3</span>
                    <ShoppingBag className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1">المتجر / البائع</h4>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    يستقبل الزبون، ينفذ عملية البيع، ويشحن المنتج أو يفعل الخدمة.
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-zinc-800 text-[10px] text-purple-400 font-semibold flex items-center justify-between">
                  <span>سعر المشتري لا يتغير</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-3.5 rounded-2xl border border-emerald-500/40 bg-zinc-900/80 backdrop-blur-md flex flex-col justify-between relative group hover:border-emerald-400 transition-all shadow-lg shadow-emerald-500/10">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500 text-black font-black text-xs">4</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1">العمولة في محفظتك</h4>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    يسجل النظام البيعة تلقائياً ويحول عمولتك (10% - 50%) إلى رصيدك.
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-zinc-800 text-[10px] text-emerald-400 font-black flex items-center justify-between">
                  <span>ربح صافي مباشر 💰</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Visual Example Metric Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-emerald-500/10 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-zinc-300">
                📊 <strong>معادلة الدخل الواقعية:</strong> 100 نقرة × نسبة تحويل 3% = 3 مبيعات × عمولة 20$ = <strong>60$ ربح يومي</strong>
              </span>
              <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                1,800$ / شهر
              </span>
            </div>
          </div>
        )}

        {/* 2. AFFILIATE: Lesson 2 (Cookie Tracking Lifecycle) */}
        {lessonId === 'm1-l2' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl border border-cyan-500/30 bg-zinc-900/70 space-y-3">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>دورة حياة ملف التتبع (30-Day Cookie Lifecycle)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold block">اليوم 1 — النقرة الأولى</span>
                  <p className="text-xs text-zinc-300">الزائر يضغط على رابطك ويحفظ متصفحه كود هويتك الرقمية (Cookie ID).</p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-blue-400 font-bold block">الأيام 2 إلى 29 — التردد</span>
                  <p className="text-xs text-zinc-300">الزائر يغادر الموقع ويعود عدة مرات بدون الحاجة لإعادة النقر على رابطك.</p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/80 border border-emerald-500/30 space-y-1 bg-emerald-500/5">
                  <span className="text-[10px] text-emerald-400 font-bold block">اليوم 30 — إتمام الشراء</span>
                  <p className="text-xs text-zinc-300">يشتري الزبون، ويتعرف النظام على الكوكي ويحتسب لك العمولة كاملة!</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200">
              💡 <strong>قاعدة RikouZone الذهبية:</strong> كلما طالت مدة الكوكيز (مثلاً 30 أو 90 يوماً)، زادت أرباحك التراكمية دون جهد إضافي.
            </div>
          </div>
        )}

        {/* 3. AFFILIATE: Lesson 3 (The 4 Parties Ecosystem) */}
        {lessonId === 'm1-l3' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl border border-blue-500/30 bg-blue-500/5 space-y-1">
              <span className="text-xs font-bold text-blue-400 block">1. التاجر / البائع (Merchant)</span>
              <p className="text-[11px] text-zinc-300 leading-relaxed">صاحب السلعة أو المنصة (Amazon, Hostinger, Canva). يوفر المنتج والدعم والشحن.</p>
            </div>
            <div className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-1">
              <span className="text-xs font-bold text-amber-400 block">2. المسوق / الناشر (Affiliate)</span>
              <p className="text-[11px] text-zinc-300 leading-relaxed">أنت! تصنع المحتوى وتجلب الزيارات المستهدفة عبر التوصيات الصادقة.</p>
            </div>
            <div className="p-3.5 rounded-2xl border border-purple-500/30 bg-purple-500/5 space-y-1">
              <span className="text-xs font-bold text-purple-400 block">3. شبكة الوساطة (Network)</span>
              <p className="text-[11px] text-zinc-300 leading-relaxed">منصات تضمن التتبع وحساب الأرباح والتحويل لحسابك البنكي (CJ, Impact, ShareASale).</p>
            </div>
            <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-1">
              <span className="text-xs font-bold text-emerald-400 block">4. المشتري النهائي (Consumer)</span>
              <p className="text-[11px] text-zinc-300 leading-relaxed">الزبون الذي يشتري المنتج بنفس السعر الأصلي أو بخصم، ويسعد بالحل الذي اقترحته.</p>
            </div>
          </div>
        )}

        {/* 4. AFFILIATE: Lesson 4 (3 Commission Models) */}
        {lessonId === 'm1-l4' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-900/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">النسبة المئوية %</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">1% - 15%</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">منتجات مادية (أمازون، علي إكسبريس). بعت منتج بـ 500$ بنسبة 8% = عمولتك 40$.</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-900/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400">مبلغ ثابت (Bounty)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">50$ - 150$</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">استضافات وحسابات بنكية (Hostinger, Shopify). تحصل على 70$ على كل عميل جديد.</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 space-y-2 shadow-lg shadow-emerald-500/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">عمولة متكررة 🔄</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-200 font-mono font-bold">20% - 40% شهرياً</span>
              </div>
              <p className="text-[11px] text-zinc-200 leading-relaxed">برامج SaaS والذكاء الاصطناعي. تحصل على عمولة كل شهر ما دام العميل يدفع اشتراكه!</p>
            </div>
          </div>
        )}

        {/* 5. AFFILIATE: Lesson 7 (100% Smartphone Pipeline) */}
        {(lessonId === 'm1-l7' || lessonId === 'm1-l6' || lessonId === 'm1-l5') && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/80">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-3">
                📱 منظومة صناعة المحتوى بالهاتف فقط (بدون تكاليف):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-base sm:text-lg block mb-1">📸</span>
                  <span className="text-xs font-bold text-white block">كاميرا الهاتف</span>
                  <span className="text-[10px] text-zinc-400">تصوير بدقة 4K/60fps</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-base sm:text-lg block mb-1">✂️</span>
                  <span className="text-xs font-bold text-white block">CapCut / VN</span>
                  <span className="text-[10px] text-zinc-400">مونتاج وقص احترافي</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-base sm:text-lg block mb-1">🔗</span>
                  <span className="text-xs font-bold text-white block">Bento.me</span>
                  <span className="text-[10px] text-zinc-400">صفحة الروابط بالبايو</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-base sm:text-lg block mb-1">📈</span>
                  <span className="text-xs font-bold text-white block">تيك توك وريلز</span>
                  <span className="text-[10px] text-zinc-400">نشر مجاني واستقطاب</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. AFFILIATE: Module 2 (Niche Triad & Selection) */}
        {lessonId.startsWith('m2-') && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-500/5 space-y-3">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
                🎯 معادلة النيتش الرابح الثلاثية (The Winning Niche Formula):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-xs font-bold text-amber-400 block mb-1">1. المعرفة والشغف</span>
                  <span className="text-[11px] text-zinc-300">مجال تحب التعلم عنه وقادر على الاستمرار فيه 6 أشهر.</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-xs font-bold text-cyan-400 block mb-1">2. طلب حقيقي في السوق</span>
                  <span className="text-[11px] text-zinc-300">ناس يبحثون عنه يومياً ومستعدون للدفع لحل مشاكلهم.</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-xs font-bold text-emerald-400 block mb-1">3. عمولات مجدية</span>
                  <span className="text-[11px] text-zinc-300">عروض أفيلييت تدفع عمولة محترمة تعوض وقتك وجهدك.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. WEB DEV: Lesson 1 (Web Architecture: Client - Server - Database) */}
        {(trackId === 'web-development' || lessonId.includes('web-works')) && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl border border-cyan-500/40 bg-zinc-900/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>المخطط المعماري: كيف يعمل الويب خطوة بخطوة؟</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  HTTP/3 & REST
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* Client Node */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <Monitor className="w-5 h-5 text-cyan-400" />
                    <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/20 px-1.5 py-0.2 rounded">Client</span>
                  </div>
                  <h5 className="text-xs font-bold text-white">متصفح المستخدم</h5>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    يكتب الرابط ويرسل طلب HTTP GET، ثم يستلم HTML/CSS/JS ويرسم واجهة المستخدم.
                  </p>
                </div>

                {/* Server Node */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <Server className="w-5 h-5 text-amber-400" />
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded">Server</span>
                  </div>
                  <h5 className="text-xs font-bold text-white">خادم الويب (Cloud Node)</h5>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    يعالج الطلب، يتحقق من صلاحيات الأمان، وينفذ منطق العمل والبرمجة الخلفية.
                  </p>
                </div>

                {/* Database Node */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <Database className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded">Database</span>
                  </div>
                  <h5 className="text-xs font-bold text-white">قاعدة البيانات (SQL/NoSQL)</h5>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    تخزن الحسابات والبيانات والمنتجات بشكل آمن وتسترجعها بسرعة البرق.
                  </p>
                </div>
              </div>

              {/* Data Flow Indicator */}
              <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between text-[11px] text-zinc-300">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Code className="w-3.5 h-3.5" />
                  <span>الطلب: GET /api/lessons</span>
                </span>
                <span className="text-zinc-500 font-mono">──(20ms)──▶</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>الاستجابة: 200 OK (JSON)</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 8. GENERIC FALLBACK FOR ANY OTHER LESSON */}
        {!['m1-l1', 'm1-l2', 'm1-l3', 'm1-l4', 'm1-l5', 'm1-l6', 'm1-l7'].includes(lessonId) && 
         !lessonId.startsWith('m2-') && 
         trackId !== 'web-development' && (
          <div className="p-4 rounded-2xl border border-amber-500/30 bg-zinc-900/70 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-bold text-amber-400 block mb-1">المدخلات الأساسية</span>
                <span className="text-[11px] text-zinc-300">الأدوات والإعداد الأولي للبدء بشكل صحيح</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-bold text-blue-400 block mb-1">التطبيق العملي</span>
                <span className="text-[11px] text-zinc-300">تنفيذ الخطوات بدقة وتجنب الأخطاء الشائعة</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-bold text-emerald-400 block mb-1">المخرجات والأرباح</span>
                <span className="text-[11px] text-zinc-300">تحقيق أول عائد وتوسيع نطاق العمل</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Pro Tip & RikouZone Copyright Watermark Footer */}
      <div className="relative z-10 mt-4 pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-zinc-400">
        <div className="flex items-center gap-1.5 text-amber-300/90 text-right">
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span><strong>نصيحة RikouZone:</strong> افهم المخطط جيداً وطبق الخطوة الأولى فوراً لترسيخ المعلومة.</span>
        </div>

        <span className="font-mono text-zinc-400 shrink-0 select-none">
          RikouZone Visual Engine © 2026
        </span>
      </div>

    </figure>
  );
};
