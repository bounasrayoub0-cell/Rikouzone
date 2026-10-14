import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckSquare, Sparkles, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'consent' | 'prelaunch';
  title: string;
  detail: string;
  mandatory: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // 1. Data Consent & Privacy Checklist
  {
    id: 'c-1',
    category: 'consent',
    title: 'نص موافقة صريح بجانب زر إرسال الطلب',
    detail: 'وجود إشعار لا لبس فيه يوضح للعميل أن بياناته ستشارك مع مقاول الخدمة المعتمد في مدينته للتواصل معه بخصوص طلبه.',
    mandatory: true
  },
  {
    id: 'c-2',
    category: 'consent',
    title: 'رابط سياسة خصوصية سهل الوصول',
    detail: 'رابط في تذييل صفحة الهبوط يوضح هوية الجهة المسؤولة، كيفية حماية البيانات، والمدة الزمنية للاحتفاظ بها.',
    mandatory: true
  },
  {
    id: 'c-3',
    category: 'consent',
    title: 'حظر بيع البيانات لأطراف ثالثة خارج الغرض',
    detail: 'الالتزام التام بعدم بيع أو مشاركة رقم العميل مع شركات تسويق أو قروض أو أي جهة خارج خدمة المعاينة المطلوبة.',
    mandatory: true
  },
  {
    id: 'c-4',
    category: 'consent',
    title: 'توفير آلية بسيطة لإلغاء التواصل وحذف البيانات',
    detail: 'تضمين خيار في محادثات الواتساب أو بريد إلكتروني يتيح للعميل طلب التوقف الفوري عن الاتصال ومسح سجله.',
    mandatory: false
  },
  {
    id: 'c-5',
    category: 'consent',
    title: 'تشفير وحماية الجداول السحابية بكلمات مرور ومصادقة ثنائية',
    detail: 'حماية ملفات Google Sheets أو أنظمة CRM لمنع وصول أي شخص غير مصرح له لقائمة أرقام وعناوين العملاء.',
    mandatory: true
  },

  // 2. Pre-Launch Campaign Checklist
  {
    id: 'p-1',
    category: 'prelaunch',
    title: 'تأكيد اتفاق الشريك المحلي وجاهزية فنييه للمتابعة',
    detail: 'التأكد من أن صاحب العمل أو مسؤول المبيعات مستعد للاتصال بالعملاء خلال أقل من ساعتين ومطلع على معايير القبول.',
    mandatory: true
  },
  {
    id: 'p-2',
    category: 'prelaunch',
    title: 'فحص سرعة صفحة الهبوط وعملها على مختلف الهواتف',
    detail: 'تجربة ملء النموذج من هاتف ذكي حقيقي والتأكد من فتح الصفحة في أقل من ثانيتين وسلاسة إدخال الأرقام.',
    mandatory: true
  },
  {
    id: 'p-3',
    category: 'prelaunch',
    title: 'اختبار تدفق وصول التنبيهات الفورية (Webhook / WhatsApp)',
    detail: 'إرسال طلب تجريبي باسم "فحص تقني" والتأكد من وصول رسالة فورية إلى هاتف المقاول بالبيانات كاملة.',
    mandatory: true
  },
  {
    id: 'p-4',
    category: 'prelaunch',
    title: 'تحديد النطاق الجغرافي الدقيق في إعدادات الإعلان',
    detail: 'حصر الإعلانات الممولة في أحياء المدينة المتفق عليها فقط وتجنب الخيارات العامة التي تستنزف الميزانية خارج النطاق.',
    mandatory: true
  },
  {
    id: 'p-5',
    category: 'prelaunch',
    title: 'تفعيل خيار نية الشراء العالية (Higher Intent Form)',
    detail: 'في إعلانات Meta Lead Ads، تفعيل صفحة مراجعة البيانات قبل الإرسال لمنع النقرات العرضية وغير المقصودة.',
    mandatory: true
  },
  {
    id: 'p-6',
    category: 'prelaunch',
    title: 'تحديد سقف الميزانية الإعلانية اليومية لمنع استنزاف الرصيد',
    detail: 'بدء الحملة بميزانية يومية صغيرة (10$ - 15$) لمراقبة جودة أول 5 فرص وتعديل أي نقص قبل رفع الميزانية.',
    mandatory: true
  }
];

const STORAGE_KEY = 'rikouzone_leadgen_checklists';

export const LeadConsentChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<'consent' | 'prelaunch'>('consent');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = CHECKLIST_ITEMS.filter((item) => item.category === activeTab);
  const completedInActive = filteredItems.filter((i) => checkedIds.includes(i.id)).length;
  const progressPercent = Math.round((completedInActive / filteredItems.length) * 100);

  const resetCurrentTab = () => {
    setCheckedIds((prev) => prev.filter((id) => !filteredItems.some((i) => i.id === id)));
  };

  return (
    <div className="space-y-8 animate-fadeIn text-right" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>الدروس 7 و 14: قوائم الامتثال القانوني وفحص ما قبل الإطلاق</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          قوائم التدقيق: حماية البيانات والجاهزية الفنية للحملات
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
          تحقق من اكتمال كافة الشروط النظامية لحماية خصوصية العملاء والتوافق مع قوانين حماية البيانات الشخصية، وكذلك الإجراءات الفنية السليمة قبل إطلاق أي حملة استقطاب.
        </p>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-zinc-800/80">
          <button
            onClick={() => setActiveTab('consent')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'consent'
                ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/15'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>قائمة الموافقة القانونية وحماية البيانات (5 بنود)</span>
          </button>

          <button
            onClick={() => setActiveTab('prelaunch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'prelaunch'
                ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/15'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <CheckSquare className="h-4 w-4" />
            <span>قائمة التحقق قبل إطلاق حملة الاستقطاب (6 بنود)</span>
          </button>
        </div>
      </div>

      {/* Progress Box */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <span>مستوى إكمال بنود هذه القائمة:</span>
            <span className="text-cyan-400 font-mono font-bold">
              {completedInActive} من {filteredItems.length} ({progressPercent}%)
            </span>
          </div>
          <div className="text-[11px] text-zinc-400">
            {progressPercent === 100
              ? 'ممتاز! تم استيفاء كافة الشروط وجاهزية المنظومة عالية جداً.'
              : 'يرجى مراجعة وتأكيد البنود المتبقية قبل إطلاق الحملة أو تسليم الطلبات.'}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-32 h-2.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <button
            onClick={resetCurrentTab}
            className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className="h-3 w-3" />
            <span>إعادة تعيين</span>
          </button>
        </div>
      </div>

      {/* Checklist items list */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isDone = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isDone
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <div className="w-5 h-5 rounded-lg border border-zinc-700 hover:border-cyan-400 transition-colors" />
                )}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {item.title}
                  </h4>
                  {item.mandatory && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/20 font-mono">
                      إلزامي
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
