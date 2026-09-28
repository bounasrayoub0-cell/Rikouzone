import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Film, 
  Scissors, 
  Volume2, 
  Layers,
  HelpCircle,
  Clock
} from 'lucide-react';

interface VideoBeforeAfterPlayerProps {
  onCopyText?: (text: string, label: string) => void;
}

export const VideoBeforeAfterPlayer: React.FC<VideoBeforeAfterPlayerProps> = ({ onCopyText }) => {
  const [selectedCase, setSelectedCase] = useState<number>(0);
  const [activeView, setActiveView] = useState<'side-by-side' | 'detailed'>('side-by-side');

  const cases = [
    {
      title: 'مقطع كلامي تعليمي (Educational Talking Head)',
      category: 'ريلز وإنستغرام وبناء البراند الشخصي',
      topic: 'كيف تنظم وقتك وتنجز في 4 ساعات يومياً',
      before: {
        duration: '48 ثانية (بطيء ورتيب)',
        cameraStyle: 'كاميرا واحدة ثابتة طوال الوقت، وجه شاحب بسبب إضاءة صفراء باهتة.',
        audioStyle: 'صدى غرفة واضح، صوت مكيف خافت، وسكتات صمت 2.5 ثانية بين كل فكرة.',
        visuals: 'لا توجد أي ترجمة أو صور أو لقطات B-roll. المتحدث ينظر في اتجاهات متعددة.',
        retentionRate: '22% فقط يشاهدون للنهاية'
      },
      after: {
        duration: '26 ثانية (إيقاع ناري ورشيق)',
        cameraStyle: 'تبديل ذكي بين لقطة 100% ولقطة Zoom 118% كل 5 ثوانٍ، وتصحيح كامل لألوان البشرة.',
        audioStyle: 'صوت معزول بتقنية الـ AI كاستوديو إذاعي، موسيقى Hip-hop هادئة عند -22dB، ومؤثرات Whoosh عند الانتقالات.',
        visuals: 'ترجمة كوفية صفراء ديناميكية كلمة بكلمة، لقطتان B-roll لشاشة حاسوب، ورسم بياني متحرك.',
        retentionRate: '88% نسبة إكمال ومشاهدات متضاعفة'
      },
      editingInterventions: [
        'حذف 22 ثانية من الهواء الميت والتنفس والتنحنح بواسطة الـ Jump Cuts السريعة.',
        'إضافة 3 لقطات تقريب كادر (Punch-ins) لإبراز الكلمات الحاسمة.',
        'وضع كابشنز ملونة داخل منطقة الأمان الآمنة للموبايل.',
        'تطبيق خفض الموسيقى التلقائي (Audio Ducking) لحماية وضوح نبرة الصوت.'
      ]
    },
    {
      title: 'إعلان UGC لمنتج تجارة إلكترونية (E-com Product Ad)',
      category: 'إعلانات ممولة على تيك توك وميتا',
      topic: 'وسادة ظهر طبية للموظفين (Ergonomic Cushion)',
      before: {
        duration: '55 ثانية',
        cameraStyle: 'تصوير عمودي بدون تركيز على تفاصيل المنتج، لقطات مهتزة رديئة.',
        audioStyle: 'موسيقى صاخبة تغطي على كلام الشخص، وصوت هواء الهاتف مزعج.',
        visuals: 'المتحدث يمسك الوسادة فقط دون تجربة جلوس حية أو تقييمات عملاء.',
        retentionRate: '12% معدل نقر على الإعلان ضعيف جداً'
      },
      after: {
        duration: '24 ثانية',
        cameraStyle: 'هوك أول ثانيتين يظهر ألم الظهر أثناء الجلوس، ثم لقطة مقربة فائقة الجودة للمنتج أثناء الضغط عليه.',
        audioStyle: 'صوت واضح، ومؤثرات Pop عند ظهور كود الخصم وتقييم الـ 5 نجوم.',
        visuals: 'تقييم 5 نجوم متحرك، كابشنز باللون الأخضر النيون، ولقطة جلوس مريحة مع سهم يشير لدعم الفقرات.',
        retentionRate: 'CTR ارتفع بنسبة 340% وتضاعفت مبيعات الحملة'
      },
      editingInterventions: [
        'بدء الإعلان بهوك بصري للمشكلة بدلاً من البداية باسم الشركة.',
        'تسريع لقطات فتح الصندوق بتقنية الـ Speed Ramping السينمائي.',
        'إضافة لقطة شاشة لآراء عملاء حقيقيين في الثانية 16 لبناء الثقة.',
        'خاتمة بكود خصم بارز وزر دعوة صريح للعمل (CTA).'
      ]
    },
    {
      title: 'مقطع بودكاست ملهم (Podcast Highlight Clip)',
      category: 'يوتيوب شورتس وتيك توك',
      topic: 'قصة فشل أول مشروع وكيف قاد للنجاح',
      before: {
        duration: '70 ثانية',
        cameraStyle: 'كاميرا بعيدة بزاوية واسعة غير حميمية للمتحدث والمذيع معاً.',
        audioStyle: 'صوت مسموع لكن بدون أي موسيقى تثير المشاعر أو تحرك الموقف.',
        visuals: 'لا توجد كابشنز، والمشاهد لا يعرف عن ماذا يدور الحديث إلا بعد 30 ثانية.',
        retentionRate: '18% يمررون بعد أول 4 ثوانٍ'
      },
      after: {
        duration: '38 ثانية',
        cameraStyle: 'قص الكادر ليكون عمودياً مقرباً من وجه الضيف (Face Tracking) لإبراز تعبيرات عينيه وانفعالاته.',
        audioStyle: 'موسيقى بيانو درامية ملهمة ترتفع تدريجياً، مع صمت تام لمدة ثانية واحدة في لحظة الاعتراف الصادمة.',
        visuals: 'كابشنز بيضاء بحدود سوداء بخط ضخم في المركز، تلوين كلمة "الخسارة" بالأحمر وكلمة "النهوض" بالأخضر.',
        retentionRate: 'حصد 1.4 مليون مشاهدة ومئات آلاف المشاركات'
      },
      editingInterventions: [
        'إعادة تأطير الكادر (Auto Reframe) لمتابعة وجه الضيف بلقطة سينمائية حميمية.',
        'إسقاط الموسيقى الدرامية بالضبط عند نقطة التحول في القصة.',
        'زرع حلقة مفتوحة (Open Loop) في أول 3 ثوانٍ تجبر المشاهد على انتظار النهاية.'
      ]
    }
  ];

  const currentCase = cases[selectedCase];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span>معرض المقارنة البصرية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            المونتاج قبل وبعد (Before & After Optimization)
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            شاهد كيف يحول المونتاج الذكي لقطات خام باهتة ومملة إلى أصول رقمية تخطف الأبصار، وتحقق أرقام احتفاظ ومبيعات قياسية لنفس صانع المحتوى.
          </p>
        </div>

        {/* Case selector tabs */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap gap-2">
          {cases.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCase(idx)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedCase === idx
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {c.title.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Case Details Card */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 block">{currentCase.category}</span>
            <h3 className="text-xl font-black text-white mt-0.5">{currentCase.title}</h3>
            <p className="text-xs text-zinc-400">موضوع المقطع: {currentCase.topic}</p>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before Column */}
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <div className="flex items-center gap-2 text-sm font-black text-rose-400">
                <XCircle className="h-4 w-4" />
                <span>النسخة الخام قبل المونتاج (Raw Footage)</span>
              </div>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{currentCase.before.duration}</span>
              </span>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <div>
                <strong className="text-rose-300 block mb-0.5">🎥 الكاميرا واللقطات:</strong>
                <p className="leading-relaxed text-zinc-400">{currentCase.before.cameraStyle}</p>
              </div>
              <div>
                <strong className="text-rose-300 block mb-0.5">🔊 الصوت والموسيقى:</strong>
                <p className="leading-relaxed text-zinc-400">{currentCase.before.audioStyle}</p>
              </div>
              <div>
                <strong className="text-rose-300 block mb-0.5">👁️ العناصر البصرية:</strong>
                <p className="leading-relaxed text-zinc-400">{currentCase.before.visuals}</p>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-950/80 p-3 border border-rose-500/20 text-xs font-bold text-rose-400">
              📉 النتيجة: {currentCase.before.retentionRate}
            </div>
          </div>

          {/* After Column */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2 text-sm font-black text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>النسخة الممنتجة باحتراف (High-Retention Edit)</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{currentCase.after.duration}</span>
              </span>
            </div>

            <div className="space-y-3 text-xs text-zinc-200">
              <div>
                <strong className="text-emerald-400 block mb-0.5">🎥 الكاميرا واللقطات:</strong>
                <p className="leading-relaxed">{currentCase.after.cameraStyle}</p>
              </div>
              <div>
                <strong className="text-emerald-400 block mb-0.5">🔊 الصوت والموسيقى:</strong>
                <p className="leading-relaxed">{currentCase.after.audioStyle}</p>
              </div>
              <div>
                <strong className="text-emerald-400 block mb-0.5">👁️ العناصر البصرية:</strong>
                <p className="leading-relaxed">{currentCase.after.visuals}</p>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-950/80 p-3 border border-emerald-500/20 text-xs font-bold text-emerald-300">
              🚀 النتيجة: {currentCase.after.retentionRate}
            </div>
          </div>
        </div>

        {/* Editing Breakdown Steps */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Scissors className="h-4 w-4" />
            <span>ما الذي فعله المونتير تحديداً لصنع هذا الفارق؟</span>
          </div>
          <ul className="space-y-2 text-xs text-zinc-300">
            {currentCase.editingInterventions.map((step, sIdx) => (
              <li key={sIdx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
