import React, { useState, useEffect, useMemo } from 'react';
import { CheckSquare, Square, ShieldCheck, AlertCircle, RefreshCw, Sparkles, CheckCircle2, Film, Volume2, Layers, ShieldAlert } from 'lucide-react';

interface CheckItem {
  id: string;
  category: 'display' | 'audio' | 'pacing' | 'text' | 'rights';
  categoryLabel: string;
  title: string;
  description: string;
  proTip: string;
}

const CHECKLIST_ITEMS: CheckItem[] = [
  // Display & Dimensions
  {
    id: 'disp-1',
    category: 'display',
    categoryLabel: 'الأبعاد ومنطقة الأمان',
    title: 'ضبط نسبة العرض إلى الارتفاع 9:16 (1080 × 1920 عمودي)',
    description: 'تأكد من أن الفيديو مصمم رأسياً بالكامل دون وجود حواف سوداء في الأعلى والأسفل.',
    proTip: 'في CapCut، اختر Canvas ثم 9:16 كإطار أساسي قبل وضع أي مادة بصرية.'
  },
  {
    id: 'disp-2',
    category: 'display',
    categoryLabel: 'الأبعاد ومنطقة الأمان',
    title: 'احترام منطقة الأمان (TikTok UI Safe Zones)',
    description: 'ترك مسافة آمنة من الأسفل (حيث الوصف وشريط الصوت) والجانب الأيمن (أزرار التفاعل) لعدم حجب المعلومات.',
    proTip: 'ركز كل النصوص والكابشنز الحيوية في الـ 60% الوسطى من الشاشة.'
  },

  // Audio & Voice
  {
    id: 'audio-1',
    category: 'audio',
    categoryLabel: 'هندسة الصوت والموسيقى',
    title: 'نقاء التعليق الصوتي وخلوه من الصدى وضوضاء المكيف',
    description: 'الصوت نقي وواضح في المقدمة بمستوى مريح للأذن دون تشويش أو فرقعات هواء.',
    proTip: 'مرر الملف على Adobe Podcast Enhance المجاني أو خاصية Reduce Noise في CapCut.'
  },
  {
    id: 'audio-2',
    category: 'audio',
    categoryLabel: 'هندسة الصوت والموسيقى',
    title: 'موازنة مستويات الصوت (Audio Mixing Balance)',
    description: 'صوت التعليق مرتفع (-3dB تقريباً) وموسيقى الخلفية ناعمة جداً (-20dB إلى -24dB) دون تغطية على الكلمات.',
    proTip: 'استمع للفيديو بدون سماعات عبر مكبر صوت الهاتف؛ إذا واجهت صعوبة في فهم جملة واحدة، اخفض الموسيقى فوراً.'
  },

  // Pacing & Jump Cuts
  {
    id: 'pace-1',
    category: 'pacing',
    categoryLabel: 'إيقاع السرد والتقطيع',
    title: 'حذف جميع فترات الصمت والسكتات اللفظية (Jump Cuts)',
    description: 'التخلص الصارم من أي فراغ صوتي يزيد عن 0.2 ثانية بين الجمل والكلمات للحفاظ على تدفق الحديث.',
    proTip: 'كبر الخط الزمني (Timeline) وقص الفراغات بين موجات الصوت واحدة تلو الأخرى.'
  },
  {
    id: 'pace-2',
    category: 'pacing',
    categoryLabel: 'إيقاع السرد والتقطيع',
    title: 'حركة بصرية مستمرة (تغيير اللقطة أو التقريب كل 2-3 ثوانٍ)',
    description: 'عدم ترك لقطة واحدة ثابتة لأكثر من 3 ثوانٍ لتفادي شرود ذهن المشاهد وتمرير الفيديو.',
    proTip: 'استخدم تقنية الـ Punch-in (تكبير اللقطة بنسبة 10-15%) في نفس المشهد لكسر الرتابة.'
  },

  // Text & Captions
  {
    id: 'text-1',
    category: 'text',
    categoryLabel: 'النصوص والكابشنز',
    title: 'كابشنز سريعة التتابع (1 إلى 3 كلمات لكل لقطة)',
    description: 'توزيع الكلمات تزامناً مع نطقها بخط واضح عريض مع تمييز الكلمات الهامة بلون مختلف (أصفر فاقع).',
    proTip: 'استخدم ميزة Auto Captions ثم راجع الكلمات يدوياً للتأكد من عدم وجود أخطاء إملائية.'
  },
  {
    id: 'text-2',
    category: 'text',
    categoryLabel: 'النصوص والكابشنز',
    title: 'وضوح التباين اللوني (High Contrast Text)',
    description: 'إضافة ظل أسود خفيف (Shadow) أو شريط نصف شفاف خلف النصوص لضمان قراءتها فوق أي خلفية ملونة.',
    proTip: 'تجنب الخطوط الرفيعة أو المزخرفة جداً؛ خطوط مثل Cairo Bold أو TheSans هي الأسهل للقراءة السريعة.'
  },

  // Rights & Originality
  {
    id: 'right-1',
    category: 'rights',
    categoryLabel: 'الحقوق والموسيقى التجارية',
    title: 'الاعتماد على موسيقى المكتبة التجارية المعتمدة',
    description: 'تأكد من أن الموسيقى والمؤثرات الصوتية مصرح بها للاستخدام التجاري لتفادي كتم الصوت (Mute).',
    proTip: 'إذا كان حسابك تجارياً (Business)، اختر الصوت من داخل تبويب Commercial Audio في تيك توك.'
  },
  {
    id: 'right-2',
    category: 'rights',
    categoryLabel: 'الحقوق والموسيقى التجارية',
    title: 'أصالة المحتوى وخلوه من مقاطع الآخرين غير المرخصة',
    description: 'التأكد من أن اللقطات البصرية إما من تسجيل شاشتك الخاصة أو من مكتبات مجانية مرخصة (Pexels / Mixkit).',
    proTip: 'تذكر: فيديو أصلي بـ 1000 مشاهدة أفضل لحسابك من فيديو مسروق بـ 100 ألف مشاهدة يعرضك للحظر.'
  }
];

export const FacelessTiktokEditingChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('faceless_tiktok_editing_checklist_v1');
      if (stored) {
        setCheckedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load checklist state', e);
    }
  }, []);

  const handleToggle = (id: string) => {
    let next: string[];
    if (checkedIds.includes(id)) {
      next = checkedIds.filter((item) => item !== id);
    } else {
      next = [...checkedIds, id];
    }
    setCheckedIds(next);
    localStorage.setItem('faceless_tiktok_editing_checklist_v1', JSON.stringify(next));
  };

  const handleSelectAll = () => {
    const allIds = CHECKLIST_ITEMS.map((item) => item.id);
    setCheckedIds(allIds);
    localStorage.setItem('faceless_tiktok_editing_checklist_v1', JSON.stringify(allIds));
  };

  const handleReset = () => {
    setCheckedIds([]);
    localStorage.setItem('faceless_tiktok_editing_checklist_v1', JSON.stringify([]));
  };

  const progressPercent = useMemo(() => {
    return Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);
  }, [checkedIds]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return CHECKLIST_ITEMS;
    return CHECKLIST_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mb-3">
              <CheckSquare className="h-3.5 w-3.5" />
              <span>قائمة فحص المونتاج قبل التصدير والنشر (Pre-Publish Checklist)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              فحص الجودة التقنية والقانونية للفيديو القصير
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              راجع مقطعك خطوة بخطوة قبل الضغط على زر النشر: من أبعاد 9:16 ومنطقة الأمان، إلى نقاء الصوت، وتنسيق الكابشنز، وخلو المقطع من أي انتهاك لحقوق الملكية.
            </p>
          </div>

          {/* Progress Gauge */}
          <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-3xl p-4 text-center min-w-[160px] space-y-2">
            <div className="text-xs text-zinc-400 font-bold">جاهزية الفيديو للنشر</div>
            <div className="text-3xl font-black text-emerald-400">{progressPercent}%</div>
            <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-700">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-zinc-400">
              {checkedIds.length} من أصل {CHECKLIST_ITEMS.length} بنود
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            جميع البنود (10)
          </button>
          <button
            onClick={() => setActiveCategory('display')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'display'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            الأبعاد ومنطقة الأمان
          </button>
          <button
            onClick={() => setActiveCategory('audio')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'audio'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            هندسة الصوت
          </button>
          <button
            onClick={() => setActiveCategory('pacing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'pacing'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            إيقاع التقطيع
          </button>
          <button
            onClick={() => setActiveCategory('text')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'text'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            النصوص والكابشنز
          </button>
          <button
            onClick={() => setActiveCategory('rights')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'rights'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            الحقوق والموسيقى
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSelectAll}
            className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
          >
            تحديد الكل
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 text-xs font-bold transition-colors cursor-pointer"
          >
            إعادة الضبط
          </button>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isChecked = checkedIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                isChecked
                  ? 'border-emerald-500/40 bg-emerald-950/15 shadow-lg shadow-emerald-500/5'
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-emerald-400">
                    {isChecked ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Square className="h-5 w-5 text-zinc-600" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700 mb-1 inline-block">
                      {item.categoryLabel}
                    </span>
                    <h3 className={`text-sm font-bold leading-snug transition-colors ${isChecked ? 'text-emerald-300' : 'text-white'}`}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed pr-8">
                {item.description}
              </p>

              <div className="pr-8 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-300 flex items-start gap-1.5">
                <span className="text-amber-400 font-bold shrink-0">💡 نصيحة المونتاج:</span>
                <span className="text-zinc-300 leading-relaxed">{item.proTip}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Readiness Assessment Card */}
      {progressPercent === 100 ? (
        <div className="p-5 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-black text-white">فيديو جاهز 100% للنشر وفق أعلى المعايير!</div>
              <div className="text-xs text-emerald-300/90 mt-0.5">
                الفيديو يحترم مناطق الأمان، وجودة الصوت نقية، والإيقاع خالٍ من الصمت، والمواد البصرية مرخصة قانونياً.
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black text-xs font-black shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="h-4 w-4" />
              <span>معتمد للنشر</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 text-center text-xs text-zinc-400">
          أكمل تدقيق كافة البنود للحصول على اعتماد الجاهزية الكاملة (المتبقي: {CHECKLIST_ITEMS.length - checkedIds.length} بند).
        </div>
      )}
    </div>
  );
};
