import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle,
  Award
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  critical: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'cpa-chk-1',
    category: 'الاستهداف الجغرافي والأجهزة',
    title: 'تطابق الدول المستهدفة (Geo-targeting Verification)',
    desc: 'تأكدت بنسبة 100% من أن جمهوري ومصدر زياراتي يأتي من الدول المسموحة المذكورة في وصف العرض حصراً.',
    critical: true
  },
  {
    id: 'cpa-chk-2',
    category: 'الاستهداف الجغرافي والأجهزة',
    title: 'توافق نظام التشغيل والجهاز (Device Compatibility)',
    desc: 'إذا كان العرض مخصصاً لـ iOS فقط أو أندرويد أو حواسيب، قمت بضبط إعدادات التوجيه لعدم إرسال أجهزة غير مطابقة.',
    critical: true
  },
  {
    id: 'cpa-chk-3',
    category: 'الامتثال والشروط',
    title: 'مراجعة قائمة الزيارات الممنوعة (Traffic Restrictions)',
    desc: 'تأكدت من خلو طريقتي الترويجية من أي ممارسات محظورة (مثل: الترافيك المحفز Incentivized، أو إعلانات Brand Bidding، أو السبام).',
    critical: true
  },
  {
    id: 'cpa-chk-4',
    category: 'الامتثال والشروط',
    title: 'الحد الأقصى للتحويلات اليومية (Daily Cap)',
    desc: 'تحققت مما إذا كان العرض يضع حداً أقصى للتحويلات اليومية (مثلاً 50 تحويلاً/يوم)، لضمان عدم إرسال تحويلات زائدة بلا مقابل.',
    critical: false
  },
  {
    id: 'cpa-chk-5',
    category: 'الروابط والتتبع التقني',
    title: 'اختبار رابط التتبع ومعرّفات SubIDs',
    desc: 'قمت بإنشاء رابط تتبع يحتوي على SubID للمصدر (مثل subid1=youtube_review)، وجربت الضغط عليه للتأكد من وصوله لصفحة المعلن.',
    critical: true
  },
  {
    id: 'cpa-chk-6',
    category: 'الروابط والتتبع التقني',
    title: 'فهم نافذة الإسناد (Attribution Window)',
    desc: 'عرفت مدة الكوكيز أو الصلاحية المسموحة بين ضغط الزائر وإتمامه للإجراء (مثل: 24 ساعة، أو 7 أيام).',
    critical: false
  },
  {
    id: 'cpa-chk-7',
    category: 'المحتوى وصفحة الهبوط',
    title: 'خلو المحتوى من الوعود المضللة (No Misleading Claims)',
    desc: 'مراجعتي تذكر الفوائد الحقيقية للأداة/التطبيق بصدق، دون إيهام الزوار بجوائز وهمية أو مبالغات غير واقعية.',
    critical: true
  },
  {
    id: 'cpa-chk-8',
    category: 'المحتوى وصفحة الهبوط',
    title: 'إدراج تنويه الروابط التابعة (Affiliate Disclosure)',
    desc: 'أضفت جملة إفصاح واضحة في موقعي/صفحة الهبوط توضح وجود روابط تابعة لدعم المحتوى المجاني.',
    critical: true
  },
  {
    id: 'cpa-chk-9',
    category: 'المحتوى وصفحة الهبوط',
    title: 'روابط الخصوصية وشروط الاستخدام',
    desc: 'صفحة الهبوط تحتوي على روابط سياسة الخصوصية وسرعة تحميل ممتازة على شبكات الهاتف المحمول.',
    critical: false
  },
  {
    id: 'cpa-chk-10',
    category: 'الأمور المالية والسحب',
    title: 'التحقق من وسيلة السحب والحد الأدنى',
    desc: 'تأكدت من أن وسيلة سحب الأرباح (مثل Payoneer أو التحويل البنكي) والحد الأدنى للدفع مناسبان ومتاحان في بلدي.',
    critical: true
  }
];

const STORAGE_KEY = 'rikouzone_cpa_offer_checklist';

export const CpaOfferChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    setCheckedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setCheckedIds([]);
  };

  const progress = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);
  const isComplete = progress === 100;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-cyan-950/30 border border-zinc-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Pre-Launch Safety & Quality Checklist</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              قائمة التحقق من شروط العرض قبل إطلاق الزيارات
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              10 معايير أمان أساسية يجب التحقق منها بنسبة 100% قبل إرسال أول زائر لعرض CPA لضمان قبول جميع التحويلات وتجنب إغلاق الحساب في الشبكة.
            </p>
          </div>

          {/* Progress Indicator Card */}
          <div className="w-full sm:w-64 bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4.5 space-y-3 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-zinc-400">نسبة الجاهزية:</span>
              <span className={`font-mono font-bold ${isComplete ? 'text-emerald-400' : 'text-cyan-400'}`}>
                {checkedIds.length} / {CHECKLIST_ITEMS.length} ({progress}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            {isComplete ? (
              <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5 pt-0.5">
                <Award className="h-3.5 w-3.5" />
                <span>العرض جاهز وآمن للإطلاق 100%!</span>
              </div>
            ) : (
              <div className="text-[10px] text-zinc-500">
                أكمل الشروط الحرجة المميزة بعلامة التحذير أولاً.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-3">
        {CHECKLIST_ITEMS.map((item, idx) => {
          const isChecked = checkedIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 text-right ${
                isChecked
                  ? 'bg-zinc-900/40 border-emerald-500/40 text-zinc-300'
                  : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 text-white'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 shrink-0 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {isChecked ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <Circle className="h-5 w-5 text-zinc-600 hover:text-cyan-400 transition-colors" />
                )}
              </button>

              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    #{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {item.title}
                  </span>
                  {item.critical && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold">
                      شرط حرج (Critical)
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-500 mr-auto">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed pr-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>إلغاء تحديد الكل والبدء من جديد</span>
        </button>

        <span className="text-xs text-zinc-500 font-mono">
          تم الحفظ تلقائياً في المتصفح
        </span>
      </div>
    </div>
  );
};
