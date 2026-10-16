import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckSquare, Sparkles, AlertCircle, RefreshCw, CheckCircle2, Mic, Eye, Lock, Radio, Coffee } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'audio' | 'video' | 'privacy' | 'alerts' | 'comfort';
  title: string;
  detail: string;
  critical?: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Audio
  {
    id: 'audio-mic-unmuted',
    category: 'audio',
    title: 'فحص إلغاء كتم الميكروفون (Unmute Check)',
    detail: 'تأكد من أن الميكروفون غير مكتوم في OBS أو على زر الميكروفون المادي في السماعة.',
    critical: true
  },
  {
    id: 'audio-game-balance',
    category: 'audio',
    title: 'موازنة صوت اللعبة مقابل صوت صوتك',
    detail: 'يجب أن يكون صوتك في المنطقة الصفراء (-10 dB) وصوت اللعبة في المنطقة الخضراء السفلية (-20 dB) ليبقى كلامك واضحاً.',
    critical: true
  },
  {
    id: 'audio-filters-active',
    category: 'audio',
    title: 'تفعيل فلاتر تنقية الصوت (RNNoise & Limiter)',
    detail: 'تأكد من عمل فلتر عزل النويز والـ Limiter عند -1.5 dB لمنع طنين المكيف والتشوه عند الصراخ.'
  },

  // Video & Sources
  {
    id: 'video-game-capture',
    category: 'video',
    title: 'التقاط اللعبة عبر Game Capture (وليس Display Capture)',
    detail: 'التقاط اللعبة حصراً يحميك من إظهار شاشة سطح المكتب في حال صغرت اللعبة بالخطأ.',
    critical: true
  },
  {
    id: 'video-camera-lighting',
    category: 'video',
    title: 'فحص إضاءة الكاميرا وتوازن البياض (Key Light)',
    detail: 'تأكد من وضوح وجهك وعدم وجود ظلال قاسية أو انعكاس ضوء الشاشة على نظارتك.'
  },
  {
    id: 'video-obs-fps',
    category: 'video',
    title: 'مراقبة استقرار الـ 60 FPS في زاوية OBS السفلية',
    detail: 'تأكد من أن استهلاك الـ CPU أقل من 20% ولا توجد إطارات مفقودة (Dropped Frames: 0.0%).'
  },

  // Privacy & Anti-Doxxing
  {
    id: 'privacy-close-sensitive',
    category: 'privacy',
    title: 'إغلاق المتصفحات الخاصة والواتساب والإيميل والبنك',
    detail: 'أغلق تماماً أي تطبيق قد يرسل إشعاراً منبثقاً يحتوي على اسمك الحقيقي، مدينتك، أو رقم هاتفك.',
    critical: true
  },
  {
    id: 'privacy-stream-delay',
    category: 'privacy',
    title: 'تفعيل تأخير البث عند اللعب التنافسي (Stream Delay)',
    detail: 'إذا كنت تلعب رانك أو بطولات، اضبط تأخير البث على 30 إلى 60 ثانية لمنع تخريب الـ Stream Snipers.'
  },

  // Alerts & Bots
  {
    id: 'alerts-bot-active',
    category: 'alerts',
    title: 'تشغيل بوت الشات (Nightbot / StreamElements)',
    detail: 'تأكد من أن البوت متصل ويمتلك صلاحية Mod، وفلتر الروابط والألفاظ البذيئة نشط.'
  },
  {
    id: 'alerts-test-alert',
    category: 'alerts',
    title: 'اختبار تنبيه المتابعة والاشتراك (Test Alert)',
    detail: 'أرسل تنبيهاً تجريبياً من لوحة التحكم للتأكد من ظهور الأنيميشن وسماع صوت التنبيه بوضوح.'
  },
  {
    id: 'alerts-chat-dock',
    category: 'alerts',
    title: 'فتح شاشة الشات المباشر على الشاشة الثانية أو الهاتف',
    detail: 'تأكد من أن رسائل الشات تتدفق أمام عينيك دون الحاجة للتبديل من نافذة اللعبة.'
  },

  // Comfort & Readiness
  {
    id: 'comfort-water',
    category: 'comfort',
    title: 'تجهيز زجاجة ماء باردة بجانبك',
    detail: 'الحديث المستمر يجفف الحلق بسرعة؛ احتفظ بالماء قريباً لتشرب كل 20 دقيقة وتحافظ على صوتك.'
  },
  {
    id: 'comfort-posture',
    category: 'comfort',
    title: 'ضبط وضعية الجلوس والظهر',
    detail: 'اضبط ارتفاع الكرسي بحيث تكون شاشتك على مستوى عينيك ومعصمك مستوياً مع المكتب لتجنب آلام المفاصل.'
  }
];

export const PreStreamChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rikou_gaming_prestream_checklist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    try {
      localStorage.setItem('rikou_gaming_prestream_checklist', JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setCheckedIds([]);
  };

  const handleCheckAll = () => {
    setCheckedIds(CHECKLIST_ITEMS.map((i) => i.id));
  };

  const totalCount = CHECKLIST_ITEMS.length;
  const completedCount = checkedIds.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const filteredItems = activeCategory === 'all'
    ? CHECKLIST_ITEMS
    : CHECKLIST_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* Header */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-zinc-900/80 to-zinc-900/50 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Radio className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>قائمة فحص الجاهزية قبل البث المباشر (Pre-Stream Audit)</span>
                <span className="rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-xs text-emerald-300 font-bold">
                  Go Live Safely
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                تأكد من سلامة الصوت، حماية خصوصيتك، وتفعيل التنبيهات قبل الضغط على زر Start Streaming لتجنب الكوارث على الهواء.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCheckAll}
              className="rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              تحديد الكل
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-rose-400 transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>إعادة ضبط</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-zinc-300">معدل جاهزية البث: {completedCount} من {totalCount} فحص مكتمل</span>
            <span className={`font-black text-sm ${progressPercent === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {progressPercent}% {progressPercent === 100 ? 'جاهز للانطلاق 🚀' : 'قيد التدقيق'}
            </span>
          </div>
          <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                progressPercent === 100 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-gradient-to-r from-amber-500 to-emerald-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'جميع الفحوصات', icon: CheckSquare },
          { id: 'audio', label: 'الصوت والميكروفون', icon: Mic },
          { id: 'video', label: 'الفيديو والكاميرا', icon: Eye },
          { id: 'privacy', label: 'الأمان والخصوصية', icon: Lock },
          { id: 'alerts', label: 'الشات والتنبيهات', icon: Radio },
          { id: 'comfort', label: 'الراحة والبيئة', icon: Coffee }
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20 font-black'
                  : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-4 rounded-2xl border p-4 transition-all cursor-pointer select-none ${
                isChecked
                  ? 'border-emerald-500/40 bg-emerald-500/5'
                  : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
              }`}
            >
              <button
                type="button"
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                  isChecked
                    ? 'border-emerald-500 bg-emerald-500 text-black shadow-md'
                    : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
                }`}
              >
                {isChecked && <CheckCircle2 className="h-4 w-4" />}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-black ${isChecked ? 'text-zinc-300 line-through' : 'text-white'}`}>
                    {item.title}
                  </span>
                  {item.critical && (
                    <span className="rounded-md bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 text-[10px] font-black text-rose-300">
                      حاسم وإلزامي
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
