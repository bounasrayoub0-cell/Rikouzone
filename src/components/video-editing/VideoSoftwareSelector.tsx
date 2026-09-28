import React, { useState } from 'react';
import { 
  Laptop, 
  Smartphone, 
  DollarSign, 
  Check, 
  Sparkles, 
  RotateCcw, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { softwareOptionsList, SoftwareOption } from '../../data/videoEditingToolsData';

interface VideoSoftwareSelectorProps {
  onCopyText?: (text: string, label: string) => void;
}

export const VideoSoftwareSelector: React.FC<VideoSoftwareSelectorProps> = ({ onCopyText }) => {
  const [device, setDevice] = useState<'mobile' | 'pc' | 'mac'>('pc');
  const [budget, setBudget] = useState<'free' | 'any'>('free');
  const [focus, setFocus] = useState<'shorts' | 'longform' | 'career'>('shorts');

  // Match recommendation
  let recommendedId = 'capcut';
  if (device === 'mobile') {
    recommendedId = 'capcut';
  } else if (device === 'mac' && budget === 'any' && focus === 'longform') {
    recommendedId = 'finalcut';
  } else if (device === 'pc' && focus === 'longform') {
    recommendedId = 'davinci';
  } else if (focus === 'career') {
    recommendedId = 'premiere';
  } else {
    recommendedId = 'capcut';
  }

  const recommendedSoftware = softwareOptionsList.find(s => s.id === recommendedId) || softwareOptionsList[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>مساعد اختيار البرنامج المناسب</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            محدد أداة المونتاج (Video Editing Software Matcher)
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            لا تضيع وقتك في حيرة البحث بين البرامج؛ حدد نوع جهازك وميزانيتك وهدفك لنقترح عليك الأداة الأنسب لتبدأ المونتاج والتطبيق الليلة دون أي تعقيد تقني أو تكلفة غير ضرورية.
          </p>
        </div>
      </div>

      {/* 3 Interactive Questions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Q1: Device */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Laptop className="h-4 w-4" />
            <span>1. ما هو جهازك المتاح حالياً؟</span>
          </div>
          <div className="space-y-2">
            {[
              { id: 'pc', label: 'كمبيوتر / لابتوب Windows' },
              { id: 'mac', label: 'حاسوب Apple Mac (M1/M2/Intel)' },
              { id: 'mobile', label: 'هاتف ذكي فقط (iPhone أو Android)' }
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setDevice(opt.id as any)}
                role="button"
                tabIndex={0}
                className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none flex items-center justify-between ${
                  device === opt.id
                    ? 'border-amber-500 bg-amber-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <span>{opt.label}</span>
                {device === opt.id && <Check className="h-4 w-4 text-amber-400" />}
              </div>
            ))}
          </div>
        </div>

        {/* Q2: Budget */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <DollarSign className="h-4 w-4" />
            <span>2. الميزانية المخصصة للبرامج:</span>
          </div>
          <div className="space-y-2">
            {[
              { id: 'free', label: 'ميزانية صفر (أريد أدوات مجانية بالكامل)' },
              { id: 'any', label: 'لا مانع من أدوات مدفوعة أو اشتراك شهري' }
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setBudget(opt.id as any)}
                role="button"
                tabIndex={0}
                className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none flex items-center justify-between ${
                  budget === opt.id
                    ? 'border-emerald-500 bg-emerald-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <span>{opt.label}</span>
                {budget === opt.id && <Check className="h-4 w-4 text-emerald-400" />}
              </div>
            ))}
          </div>
        </div>

        {/* Q3: Focus / Goal */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
            <Sparkles className="h-4 w-4" />
            <span>3. نوع الفيديوهات المستهدفة:</span>
          </div>
          <div className="space-y-2">
            {[
              { id: 'shorts', label: 'فيديوهات قصيرة (Reels, TikTok, Shorts)' },
              { id: 'longform', label: 'يوتيوب طويل وأفلام وثائقية وسينما' },
              { id: 'career', label: 'وظائف الشركات ووكالات الإعلانات' }
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setFocus(opt.id as any)}
                role="button"
                tabIndex={0}
                className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none flex items-center justify-between ${
                  focus === opt.id
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <span>{opt.label}</span>
                {focus === opt.id && <Check className="h-4 w-4 text-blue-400" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Software Card Result */}
      <div className="rounded-3xl border-2 border-amber-500/60 bg-gradient-to-b from-amber-500/10 via-zinc-950 to-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              الخيار الموصى به لك بناءً على إجاباتك:
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {recommendedSoftware.arabicName}
            </h3>
            <span className="inline-block rounded-full bg-zinc-900 px-3 py-1 text-xs font-mono text-zinc-300 border border-zinc-800 mt-1">
              الفئة: {recommendedSoftware.tier}
            </span>
          </div>

          <div className="text-xs text-zinc-400 bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl max-w-xs">
            <span className="block font-bold text-zinc-200">الأنظمة المدعومة:</span>
            <span>{recommendedSoftware.platforms.join(' • ')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-xs font-black text-emerald-400 uppercase">أبرز المميزات:</h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              {recommendedSoftware.pros.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1.5">
              <span className="text-[11px] font-bold text-zinc-400 block">المواصفات المطلوبة لتشغيله:</span>
              <p className="text-xs text-zinc-200 leading-relaxed">
                {recommendedSoftware.hardwareRequirements}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 space-y-1">
              <span className="text-[11px] font-bold text-amber-300 block">💡 طريقة التحميل والبدء:</span>
              <p className="text-xs text-zinc-200 leading-relaxed">
                {recommendedSoftware.downloadUrlDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Comparison Table for All 4 Programs */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
        <h3 className="text-base font-black text-white">مقارنة شاملة بين أشهر برامج المونتاج العالمية</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs text-zinc-300">
            <thead className="border-b border-zinc-800 text-[11px] text-zinc-400 uppercase font-bold">
              <tr>
                <th className="py-3 px-4">البرنامج</th>
                <th className="py-3 px-4">التكلفة والترخيص</th>
                <th className="py-3 px-4">منحنى التعلم</th>
                <th className="py-3 px-4">قوة تفريغ النصوص</th>
                <th className="py-3 px-4">المجال الأفضل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              <tr>
                <td className="py-3 px-4 font-bold text-amber-400">CapCut Desktop / Mobile</td>
                <td className="py-3 px-4 text-emerald-400">مجاني (نسخة Pro اختيارية)</td>
                <td className="py-3 px-4">سهل جداً (ساعة واحدة)</td>
                <td className="py-3 px-4">فائقة وسريعة جداً بالذكاء الاصطناعي</td>
                <td className="py-3 px-4">Shorts, Reels, TikTok, UGC</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-blue-400">DaVinci Resolve</td>
                <td className="py-3 px-4 text-emerald-400">مجاني بالكامل مدى الحياة</td>
                <td className="py-3 px-4">متوسط إلى متقدم</td>
                <td className="py-3 px-4">ممتازة عبر التحديثات الأخيرة</td>
                <td className="py-3 px-4">الألوان السينمائية والأفلام ويوتيوب</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-purple-400">Adobe Premiere Pro</td>
                <td className="py-3 px-4 text-amber-400">اشتراك شهري (23-35$/شهر)</td>
                <td className="py-3 px-4">متوسط</td>
                <td className="py-3 px-4">تفريغ نصوص متقدم (Text-based editing)</td>
                <td className="py-3 px-4">الشركات والوكالات والقنوات الرسمية</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-rose-400">Final Cut Pro</td>
                <td className="py-3 px-4 text-zinc-400">299$ لمرة واحدة (Mac فقط)</td>
                <td className="py-3 px-4">سهل وسريع جداً</td>
                <td className="py-3 px-4">عبر إضافات خارجية وميزات مدمجة</td>
                <td className="py-3 px-4">صناع محتوى أجهزة Mac والـ Vloggers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
