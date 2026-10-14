import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, Sparkles, HelpCircle, ExternalLink, Filter, DollarSign, Layers } from 'lucide-react';

interface StockPlatform {
  id: string;
  name: string;
  arabicName: string;
  logoColor: string;
  supportedMedia: ('photos' | 'footage' | 'audio' | 'vectors')[];
  commissionRates: {
    photos: string;
    footage: string;
    audio?: string;
  };
  licenseModels: string[];
  canSetOwnPrice: boolean;
  acceptanceDifficulty: 'سهل' | 'متوسط' | 'صارم';
  payoutThreshold: string;
  payoutMethods: string[];
  reviewSpeed: string;
  topAdvantage: string;
  insiderTip: string;
  exclusiveAvailable: boolean;
  recommendedRole: string;
}

const PLATFORMS_DATA: StockPlatform[] = [
  {
    id: 'adobe-stock',
    name: 'Adobe Stock',
    arabicName: 'أدوبي ستوك (الأقوى تجارياً)',
    logoColor: 'from-red-600 to-rose-700',
    supportedMedia: ['photos', 'footage', 'vectors'],
    commissionRates: {
      photos: '33% ثابتة',
      footage: '35% ثابتة'
    },
    licenseModels: ['Royalty-Free قياسي', 'Extended Licences', 'اشتراكات Creative Cloud'],
    canSetOwnPrice: false,
    acceptanceDifficulty: 'متوسط',
    payoutThreshold: '25$',
    payoutMethods: ['Payoneer', 'PayPal'],
    reviewSpeed: '24 إلى 72 ساعة',
    topAdvantage: 'تكامل مباشر داخل برامج Photoshop وPremiere؛ الملايين يشترون الملفات مباشرة داخل بيئة عملهم.',
    insiderTip: 'اهتم جداً بنقاء الألوان وتوازن البياض والحدة 100%؛ مراجعو أدوبي يدققون بالبيكسل.',
    exclusiveAvailable: false,
    recommendedRole: 'المنصة الأساسية الإلزامية رقم 1 لأي مصور فوتوغرافي أو منتج فيديو'
  },
  {
    id: 'shutterstock',
    name: 'Shutterstock',
    arabicName: 'شترستوك (أكبر قاعدة عملاء)',
    logoColor: 'from-orange-600 to-red-500',
    supportedMedia: ['photos', 'footage', 'audio', 'vectors'],
    commissionRates: {
      photos: '15% إلى 40% (حسب مستويات المبيعات السنوية)',
      footage: '15% إلى 40% (حسب المستويات)',
      audio: 'مستويات مبيعات متدرجة'
    },
    licenseModels: ['Royalty-Free', 'Editorial', 'Enhanced License'],
    canSetOwnPrice: false,
    acceptanceDifficulty: 'متوسط',
    payoutThreshold: '25$',
    payoutMethods: ['Payoneer', 'PayPal', 'Skrill'],
    reviewSpeed: '48 إلى 96 ساعة',
    topAdvantage: 'أضخم حجم بحث ومشاهدات في العالم؛ مبيعات سريعة للملفات ذات الأفكار العصرية.',
    insiderTip: 'تتجدد مستويات العمولة في 1 يناير من كل عام؛ لذا احرص على بناء حجم رفع كبير لتعويض البداية.',
    exclusiveAvailable: false,
    recommendedRole: 'أساسية لتحقيق مبيعات عددية مستمرة وتغذية الدخل التراكمي'
  },
  {
    id: 'pond5',
    name: 'Pond5',
    arabicName: 'بوند 5 (جنة الفيديو والمؤثرات)',
    logoColor: 'from-blue-600 to-indigo-700',
    supportedMedia: ['footage', 'audio', 'photos', 'vectors'],
    commissionRates: {
      photos: '40% إلى 50%',
      footage: '40% لغير الحصري و60% للحصري',
      audio: '35% إلى 40%'
    },
    licenseModels: ['Royalty-Free', 'Editorial', 'Custom Enterprise'],
    canSetOwnPrice: true,
    acceptanceDifficulty: 'متوسط',
    payoutThreshold: '25$',
    payoutMethods: ['Payoneer', 'PayPal', 'Check'],
    reviewSpeed: '3 إلى 7 أيام',
    topAdvantage: 'إمكانية تحديد سعر البيع بنفسك لمقاطع الفيديو والصوتيات! مقطع 4K يمكنك تسعيره بـ 79$ أو 149$.',
    insiderTip: 'المنصة الأولى عالمياً لبيع أصوات الواجهات والـ Foley ولقطات الدرون الجوية بدقة 4K.',
    exclusiveAvailable: true,
    recommendedRole: 'الأفضل لمنتجي الفيديو السينمائي ومصممي المؤثرات الصوتية والملحنين'
  },
  {
    id: 'envato-elements',
    name: 'Envato Elements / AudioJungle',
    arabicName: 'إنفاتو إيليمنتس (مملكة الحزم والصوتيات)',
    logoColor: 'from-emerald-600 to-teal-700',
    supportedMedia: ['audio', 'footage', 'photos', 'vectors'],
    commissionRates: {
      photos: 'مشاركة أرباح اشتراكات (Subscriber Share)',
      footage: 'مشاركة أرباح اشتراكات',
      audio: '50% (غير حصري) وحتى 70% (حصري على AudioJungle)'
    },
    licenseModels: ['اشتراك شهري غير محدود', 'ترخيص مشاريع فردية'],
    canSetOwnPrice: false,
    acceptanceDifficulty: 'صارم',
    payoutThreshold: '50$',
    payoutMethods: ['Payoneer', 'PayPal', 'SWIFT Transfer'],
    reviewSpeed: '5 إلى 12 يوماً',
    topAdvantage: 'حجم تحميلات هائل من مطوري المواقع والتطبيقات وصناع ألعاب الفيديو.',
    insiderTip: 'الحزم المجمعة (مثل حزمة 30 صوت UI متناسق) تحقق أرباحاً أعلى بعشرات المرات من الملف المفرد.',
    exclusiveAvailable: true,
    recommendedRole: 'المكان الأمثل لمطوري المؤثرات الصوتية الموسيقية والرسوم التوضيحية'
  },
  {
    id: 'freepik',
    name: 'Freepik Contributor',
    arabicName: 'فري بيك (الوحش الإسباني الصاعد)',
    logoColor: 'from-sky-500 to-blue-600',
    supportedMedia: ['photos', 'vectors'],
    commissionRates: {
      photos: '0.08€ إلى 0.35€ لكل تحميل (نموذج حجم ضخم)',
      footage: 'غير مدعوم حالياً للمساهمين العاديين'
    },
    licenseModels: ['اشتراكات Premium Freepik'],
    canSetOwnPrice: false,
    acceptanceDifficulty: 'سهل',
    payoutThreshold: '50€ أو 100€',
    payoutMethods: ['Payoneer', 'PayPal'],
    reviewSpeed: 'سريع (24-48 ساعة)',
    topAdvantage: 'حجم مبيعات مرعب وسرعة قبول عالية جداً للصور العصرية والفيكتور.',
    insiderTip: 'رغم أن العائد لكل تحميل منخفض، إلا أن عدد التحميلات قد يكون 10 أضعاف المنصات الأخرى.',
    exclusiveAvailable: false,
    recommendedRole: 'ممتازة لتحقيق أولى المبيعات السريعة للمصورين المبتدئين ومصممي الجرافيك'
  },
  {
    id: 'getty-istock',
    name: 'Getty Images / iStock',
    arabicName: 'غيتي إيمجز / آي ستوك (المعيار النخبوي)',
    logoColor: 'from-zinc-700 to-zinc-900',
    supportedMedia: ['photos', 'footage', 'vectors'],
    commissionRates: {
      photos: '15% (غير حصري) وتصل إلى 45% (للمساهمين الحصريين)',
      footage: '20% إلى 45%'
    },
    licenseModels: ['Royalty-Free', 'Editorial الصحفي العالمي', 'Custom Rights'],
    canSetOwnPrice: false,
    acceptanceDifficulty: 'صارم',
    payoutThreshold: '100$',
    payoutMethods: ['Payoneer', 'PayPal'],
    reviewSpeed: '7 إلى 14 يوماً',
    topAdvantage: 'المصدر المعتمد لأكبر الصحف والمجلات ووكالات الأنباء والإعلام العالمية.',
    insiderTip: 'صور الـ Editorial للأحداث السياسية والرياضية والثقافية تحظى بأعلى سعر وطلب لديهم.',
    exclusiveAvailable: true,
    recommendedRole: 'ممتازة للمصورين الصحفيين ومصوري الفعاليات الكبرى والأحداث العامة'
  }
];

export const StockPlatformsMatrix: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'photos' | 'footage' | 'audio'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>(PLATFORMS_DATA[0].id);

  const filteredPlatforms = PLATFORMS_DATA.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.supportedMedia.includes(selectedFilter as any);
  });

  const activePlatform = PLATFORMS_DATA.find((p) => p.id === selectedPlatform) || PLATFORMS_DATA[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">مصفوفة مقارنة منصات الستوك العالمية</h2>
              <p className="text-xs text-zinc-400">
                تحليل شامل لنسب العمولات، شروط القبول، طرق الدفع، وأسرار التفوق على كل منصة
              </p>
            </div>
          </div>
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
            {[
              { id: 'all', label: 'كل المنصات' },
              { id: 'photos', label: 'الصور الفوتوغرافية' },
              { id: 'footage', label: 'فيديو 4K' },
              { id: 'audio', label: 'الصوتيات وSFX' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-amber-500 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Platforms Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlatforms.map((p) => {
          const isSelected = p.id === selectedPlatform;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={`rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-500 bg-zinc-900/90 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-base text-white">{p.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    p.acceptanceDifficulty === 'سهل'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : p.acceptanceDifficulty === 'متوسط'
                      ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                      : 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                  }`}>
                    قبول: {p.acceptanceDifficulty}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                  {p.topAdvantage}
                </p>

                <div className="space-y-1.5 text-[11px] pt-3 border-t border-zinc-800/80">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">عمولة الصور:</span>
                    <span className="font-bold text-zinc-200">{p.commissionRates.photos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">عمولة الفيديو:</span>
                    <span className="font-bold text-amber-400">{p.commissionRates.footage}</span>
                  </div>
                  {p.commissionRates.audio && (
                    <div className="flex justify-between">
                      <span className="text-zinc-500">عمولة الصوت:</span>
                      <span className="font-bold text-emerald-400">{p.commissionRates.audio}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-zinc-500">تحديد سعرك بنفسك:</span>
                    <span className={`font-bold ${p.canSetOwnPrice ? 'text-emerald-400' : 'text-zinc-400'}`}>
                      {p.canSetOwnPrice ? 'نعم (متاح)' : 'تلقائي وفق المنصة'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">أدنى سحب:</span>
                    <span className="font-bold text-zinc-300">{p.payoutThreshold} عبر {p.payoutMethods[0]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-500 text-[10px]">مراجعة: {p.reviewSpeed}</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <span>عرض التفاصيل والاستراتيجية</span>
                  <span>←</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Platform Detailed Breakdown */}
      <div className="rounded-2xl border border-amber-500/30 bg-zinc-900/70 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>دليل التفوق على المنصة</span>
            </div>
            <h3 className="text-2xl font-black text-white">{activePlatform.name} ({activePlatform.arabicName})</h3>
            <p className="text-xs text-zinc-400 mt-1">{activePlatform.recommendedRole}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400">وسائل الدفع:</span>
            <div className="flex gap-1.5">
              {activePlatform.payoutMethods.map((m, idx) => (
                <span key={idx} className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-bold text-zinc-200 border border-zinc-700">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Advantage & Rules */}
          <div className="space-y-4">
            <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>الميزة التنافسية الكبرى</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activePlatform.topAdvantage}
              </p>
            </div>

            <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>نصيحة المحترفين الحصرية (Insider Tip)</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activePlatform.insiderTip}
              </p>
            </div>
          </div>

          {/* Licenses & Strategy */}
          <div className="space-y-4">
            <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-4 space-y-2">
              <span className="text-xs font-bold text-zinc-400 block mb-1">نماذج التراخيص المعتمدة:</span>
              <div className="flex flex-wrap gap-1.5">
                {activePlatform.licenseModels.map((lic, idx) => (
                  <span key={idx} className="text-[11px] font-semibold bg-zinc-900 border border-zinc-700 text-zinc-300 px-2.5 py-1 rounded-lg">
                    {lic}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4">
              <h4 className="text-xs font-bold text-amber-300 mb-1">استراتيجية العمل الموصى بها:</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                ارفع أعمالك بترخيص <strong>غير حصري (Non-Exclusive)</strong> على هذه المنصة مع Adobe Stock وShutterstock وPond5 بالتوازي. هذا يضمن تدفق مبيعات من منصات متعددة لنفس الملف دون أي قيود تعاقدية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
