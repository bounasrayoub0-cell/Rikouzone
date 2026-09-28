import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  HelpCircle, 
  Filter, 
  Search, 
  Clock, 
  Layers, 
  DollarSign, 
  Wrench, 
  Check, 
  Award,
  Zap,
  RotateCcw
} from 'lucide-react';
import { seoServicesComparisonList, SeoServiceComparisonItem } from '../../data/seoServicesData';

interface SeoServiceSelectorToolProps {
  onSelectService: (serviceId: string) => void;
}

export const SeoServiceSelectorTool: React.FC<SeoServiceSelectorToolProps> = ({ onSelectService }) => {
  // Quiz states
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<{
    timeAvailable: string;
    affinity: string;
    clientPreference: string;
    budgetForTools: string;
  }>({
    timeAvailable: 'medium', // 10-20 hrs/week
    affinity: 'local', // talking to local businesses
    clientPreference: 'local', // in-city
    budgetForTools: 'zero' // $0 free tools
  });

  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const calculateBestMatch = () => {
    if (answers.affinity === 'local' || answers.clientPreference === 'local') {
      return seoServicesComparisonList.find((s) => s.id === 'local-seo')!;
    }
    if (answers.affinity === 'writing') {
      return seoServicesComparisonList.find((s) => s.id === 'content-seo')!;
    }
    if (answers.affinity === 'technical') {
      return seoServicesComparisonList.find((s) => s.id === 'seo-audit')!;
    }
    return seoServicesComparisonList.find((s) => s.id === 'on-page-seo')!;
  };

  const recommendedService = calculateBestMatch();

  // Filter comparison table
  const filteredList = seoServicesComparisonList.filter((item) => {
    const matchesDifficulty =
      filterDifficulty === 'all' ||
      (filterDifficulty === 'beginner' && item.difficulty.includes('سهل')) ||
      (filterDifficulty === 'intermediate' && item.difficulty.includes('متوسط')) ||
      (filterDifficulty === 'advanced' && item.difficulty.includes('متقدم'));
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whatItIncludes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetClient.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* 1. Interactive Finder (Quiz) */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-zinc-900/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Target className="h-4 w-4" />
              <span>مكتشف الخدمة الأولى للمبتدئ (Service Matcher)</span>
            </div>
            <h3 className="mt-1 text-2xl font-black text-white">
              أين تبدأ رحلتك؟ أجب عن 4 أسئلة سريعة لاكتشاف خدمتك الأنسب للبيع
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              لا تبدأ عشوائياً! حدد ظروفك الحالية ومهاراتك وسنرشدك إلى الخدمة التي يمكنك بيعها خلال أسبوعين بدون تعقيد.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400">دقة التوصية:</span>
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-black text-amber-400 border border-amber-500/30 font-sans">
              98% توافق
            </span>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Q1: Time */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-2.5">
            <label className="text-xs font-bold text-zinc-300 block">
              1. كم ساعة تملك أسبوعياً؟
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'low', label: '5 إلى 10 ساعات (وقت محدود)' },
                { id: 'medium', label: '10 إلى 20 ساعة (وقت مريح)' },
                { id: 'high', label: '25+ ساعة (تفرغ كامل)' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setAnswers({ ...answers, timeAvailable: opt.id })}
                  className={`w-full text-right p-2.5 rounded-xl text-xs font-medium transition-all ${
                    answers.timeAvailable === opt.id
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-zinc-900/70 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q2: Affinity */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-2.5">
            <label className="text-xs font-bold text-zinc-300 block">
              2. ما الذي تفضل العمل عليه؟
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'local', label: 'مساعدة المحلات والأنشطة المحلية' },
                { id: 'technical', label: 'فحص المواقع واكتشاف الأخطاء' },
                { id: 'writing', label: 'الكتابة وإعداد محتوى المقالات' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setAnswers({ ...answers, affinity: opt.id })}
                  className={`w-full text-right p-2.5 rounded-xl text-xs font-medium transition-all ${
                    answers.affinity === opt.id
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-zinc-900/70 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q3: Client Type */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-2.5">
            <label className="text-xs font-bold text-zinc-300 block">
              3. أين تفضل البحث عن العملاء؟
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'local', label: 'في مدينتي (زيارة أو واتساب مباشر)' },
                { id: 'remote', label: 'عن بعد (لينكدإن وإيميلات باردة)' },
                { id: 'freelance', label: 'منصات العمل الحر (مستقل/Upwork)' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setAnswers({ ...answers, clientPreference: opt.id })}
                  className={`w-full text-right p-2.5 rounded-xl text-xs font-medium transition-all ${
                    answers.clientPreference === opt.id
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-zinc-900/70 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q4: Budget */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-2.5">
            <label className="text-xs font-bold text-zinc-300 block">
              4. ميزانيتك لشراء أدوات السيو:
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'zero', label: '$0 مجانية 100% (أدوات جوجل فقط)' },
                { id: 'small', label: 'حتى $30 شهرياً لأداة مساعدة' },
                { id: 'ready', label: 'مستعد للاشتراك في برامج احترافية' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setAnswers({ ...answers, budgetForTools: opt.id })}
                  className={`w-full text-right p-2.5 rounded-xl text-xs font-medium transition-all ${
                    answers.budgetForTools === opt.id
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-zinc-900/70 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Service Outcome Card */}
        <div className="rounded-2xl border border-amber-500/40 bg-zinc-950 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-500 px-2 py-0.5 text-[10px] font-black text-black uppercase">
                الخدمة الأولى الموصى بها لك:
              </span>
              <span className="text-xs font-bold text-zinc-400">
                درجة الملاءمة: {recommendedService.beginnerViabilityScore}/10 للمبتدئ
              </span>
            </div>
            <h4 className="text-xl font-black text-white">
              {recommendedService.name}
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {recommendedService.whatItIncludes}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-zinc-400">
              <span className="text-amber-400 font-bold">
                متوسط العائد المالي: {recommendedService.starterPriceRange}
              </span>
              <span>•</span>
              <span>الوقت المتوقع للتنفيذ: {recommendedService.timeRequired}</span>
            </div>
          </div>

          <button
            onClick={() => onSelectService(recommendedService.id)}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-black text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all shrink-0"
          >
            <span>عرض تفاصيل وخطة تعلم هذه الخدمة</span>
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 2. Full Comparison Table of All 10 Services */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-white">
              جدول المقارنة الشامل بين خدمات السيو العشرة
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              قارن بين صعوبة كل خدمة، الأدوات المطلوبة، والمخرجات لتفهم أين تضع مجهودك.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن خدمة..."
                className="w-44 rounded-xl border border-zinc-800 bg-zinc-950 pr-8 pl-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center rounded-xl bg-zinc-950 p-1 border border-zinc-800 text-xs font-bold">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'beginner', label: 'سهل للمبتدئ' },
                { id: 'intermediate', label: 'متوسط' },
                { id: 'advanced', label: 'متقدم' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterDifficulty(f.id)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterDifficulty === f.id
                      ? 'bg-amber-500 text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-5 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      {service.category}
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      {service.name}
                    </h4>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                      service.difficulty.includes('سهل')
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : service.difficulty.includes('متوسط')
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}
                  >
                    {service.difficulty}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {service.whatItIncludes}
                </p>

                {/* Target & Deliverables */}
                <div className="space-y-2 text-xs pt-1 border-t border-zinc-900">
                  <div>
                    <span className="font-bold text-zinc-400">من يحتاجها: </span>
                    <span className="text-zinc-300">{service.targetClient}</span>
                  </div>

                  <div>
                    <span className="font-bold text-zinc-400">المخرجات المسلمة (Deliverables):</span>
                    <ul className="mt-1 space-y-0.5 text-zinc-300 text-[11px]">
                      {service.deliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-zinc-400">الأدوات المطلوبة: </span>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {service.requiredTools.map((t, i) => (
                        <span
                          key={i}
                          className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                            t.free ? 'bg-zinc-800 text-emerald-400' : 'bg-zinc-900 text-amber-300 border border-zinc-800'
                          }`}
                        >
                          {t.name} {t.free ? '(مجاني)' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom metrics & learn button */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-zinc-400">السعر المقترح للمشروع</div>
                  <div className="text-xs font-black text-amber-400 font-mono">
                    {service.starterPriceRange}
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service.id)}
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-1.5 text-xs font-bold text-zinc-200 hover:bg-amber-500 hover:text-black hover:border-transparent transition-all"
                >
                  تفاصيل التعلم
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
