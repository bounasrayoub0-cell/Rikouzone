import React, { useState } from 'react';
import { 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  DollarSign, 
  ShieldCheck,
  Building2,
  Award,
  Zap,
  Globe,
  Smartphone,
  Info
} from 'lucide-react';

interface OfferCandidate {
  id: string;
  name: string;
  niche: string;
  payout: number;
  triggerType: 'SOI' | 'DOI' | 'CPI' | 'CC Submit';
  allowedGeo: string;
  allowedTraffic: string;
  restrictions: string;
  difficulty: 'سهل للمبتدئين' | 'متوسط' | 'صعب ويتطلب مهارة';
  rating: number; // out of 10
  notes: string;
}

const DEFAULT_OFFERS: OfferCandidate[] = [
  {
    id: 'offer-1',
    name: 'تطبيق إدارة المصروفات الشخصية (CPI)',
    niche: 'تطبيقات الهواتف والمالية',
    payout: 2.10,
    triggerType: 'CPI',
    allowedGeo: 'دول الخليج + شمال إفريقيا',
    allowedTraffic: 'محتوى اجتماعي، يوتيوب، مراجعات تيك توك، سيو عضوي',
    restrictions: 'يمنع الترافيك المحفز، يمنع نشر الروابط في مجموعات عشوائية',
    difficulty: 'سهل للمبتدئين',
    rating: 8.8,
    notes: 'تحويل سريع بمجرد تثبيت وفتح التطبيق، جمهور واسع يبحث عن حلول مجانية.'
  },
  {
    id: 'offer-2',
    name: 'منصة دورات برمجية مجانية (CPL SOI)',
    niche: 'التعليم والتقنية',
    payout: 4.50,
    triggerType: 'SOI',
    allowedGeo: 'عالمي (Worldwide)',
    allowedTraffic: 'مقالات مدونات، نشرات بريدية، شروحات يوتيوب',
    restrictions: 'يمنع إعلانات البحث التي تستخدم اسم المنصة (No Brand Bidding)',
    difficulty: 'سهل للمبتدئين',
    rating: 9.2,
    notes: 'الخيار الأفضل: تسجيل إيميل فقط بدون تحقق، وجمهور الطلاب مهتم دائماً.'
  },
  {
    id: 'offer-3',
    name: 'منصة استشارات واستثمار مالي (DOI Lead)',
    niche: 'الاستثمار والمالية',
    payout: 35.00,
    triggerType: 'DOI',
    allowedGeo: 'الولايات المتحدة وكندا فقط',
    allowedTraffic: 'سيو متخصص بمحركات البحث، إعلانات بحث نظيفة',
    restrictions: 'حظر تام لأي ادعاءات أرباح وهمية، اشتراط رقم هاتف حقيقي وتأكيد بريد',
    difficulty: 'صعب ويتطلب مهارة',
    rating: 7.1,
    notes: 'عمولة كبيرة ومغرية لكن نسبة التحويل منخفضة جداً وتتطلب زيارات عالية التأهيل.'
  }
];

export const CpaOfferComparator: React.FC = () => {
  const [offers, setOffers] = useState<OfferCandidate[]>(DEFAULT_OFFERS);
  const [selectedOfferId, setSelectedOfferId] = useState<string>('offer-2');

  const selectedOffer = offers.find(o => o.id === selectedOfferId) || offers[0];

  const updateOfferField = (id: string, field: keyof OfferCandidate, value: any) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-zinc-900 to-indigo-950/30 border border-zinc-800 rounded-2xl p-6 sm:p-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold font-mono">
            <Scale className="h-3.5 w-3.5" />
            <span>CPA Offer Evaluation Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            مصفوفة مقارنة عروض CPA (Offer Comparator)
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
            قارن بين 3 عروض مختلفة جنباً إلى جنب حسب نوع الإجراء، الاستهداف الجغرافي، سهولة التحويل، والقيود الصارمة لاختيار العرض الأكثر ربحية وأماناً لحملتك.
          </p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {offers.map((offer, idx) => {
          const isSelected = offer.id === selectedOfferId;
          const isWinner = offer.rating >= 9.0;

          return (
            <div
              key={offer.id}
              onClick={() => setSelectedOfferId(offer.id)}
              className={`rounded-2xl border p-5 space-y-4 transition-all cursor-pointer text-right flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-900/90 border-cyan-500 shadow-xl shadow-cyan-500/10'
                  : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs font-bold font-mono">
                    #{idx + 1}
                  </span>
                  {isWinner && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      <span>الأعلى توصية للمبتدئ</span>
                    </span>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    value={offer.name}
                    onChange={(e) => updateOfferField(offer.id, 'name', e.target.value)}
                    className="w-full bg-transparent font-bold text-sm text-white focus:outline-none focus:border-b border-cyan-500"
                  />
                  <div className="text-[11px] text-zinc-400 mt-1">{offer.niche}</div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">قيمة العمولة:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      ${offer.payout.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">نوع الإجراء:</span>
                    <span className="font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 text-[11px]">
                      {offer.triggerType}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">مستوى الصعوبة:</span>
                    <span className={`text-[11px] font-bold ${
                      offer.difficulty === 'سهل للمبتدئين' ? 'text-emerald-400' : offer.difficulty === 'متوسط' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {offer.difficulty}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div>
                    <span className="text-zinc-500 block mb-0.5 flex items-center gap-1">
                      <Globe className="h-3 w-3 text-zinc-400" />
                      <span>الدول المسموحة (Geo):</span>
                    </span>
                    <span className="text-zinc-300 font-medium">{offer.allowedGeo}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 block mb-0.5">الزيارات المسموحة:</span>
                    <span className="text-zinc-400 line-clamp-2">{offer.allowedTraffic}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 block mb-0.5">أهم القيود والمحظورات:</span>
                    <span className="text-rose-400/90 line-clamp-2">{offer.restrictions}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-zinc-400">تقييم الجدوى:</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">
                  {offer.rating} / 10
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Offer Deep Dive */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>التحليل التفصيلي للعرض المحدد: {selectedOffer.name}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-cyan-400 font-bold block flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>لماذا تختار هذا العرض؟</span>
            </span>
            <p className="text-zinc-300 leading-relaxed">
              {selectedOffer.notes}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-amber-400 font-bold block flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>أهم الاحتياطات لتجنب رفض التحويلات:</span>
            </span>
            <p className="text-zinc-400 leading-relaxed">
              تأكد من عدم مخالفة شرط ({selectedOffer.restrictions})، وقم بتصفية الزيارات مسبقاً بحيث ترسل فقط المستخدمين المهتمين من ({selectedOffer.allowedGeo}).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
