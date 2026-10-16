import React, { useState, useEffect, useMemo } from 'react';
import {
  MessageSquare,
  Sparkles,
  Copy,
  Check,
  Building,
  User,
  MapPin,
  Send,
  Bookmark,
  BookmarkCheck,
  Trash2,
  Phone,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface SavedPitch {
  id: string;
  businessName: string;
  niche: string;
  channel: string;
  text: string;
  timestamp: string;
}

export const LocalBusinessOutreachGenerator: React.FC = () => {
  const [businessName, setBusinessName] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');
  const [niche, setNiche] = useState<string>('restaurant');
  const [channel, setChannel] = useState<'field' | 'whatsapp' | 'instagram' | 'phone'>('field');
  const [dialect, setDialect] = useState<'darija' | 'fusha' | 'friendly'>('darija');
  const [diagnosedProblem, setDiagnosedProblem] = useState<string>('maps_unclaimed');
  const [consultantName, setConsultantName] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Saved pitches in LocalStorage
  const [savedPitches, setSavedPitches] = useState<SavedPitch[]>(() => {
    try {
      const stored = localStorage.getItem('local_biz_saved_pitches_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('local_biz_saved_pitches_v1', JSON.stringify(savedPitches));
    } catch (e) {
      console.warn(e);
    }
  }, [savedPitches]);

  // Generated Pitch based on state
  const generatedPitch = useMemo(() => {
    const bName = businessName.trim() || 'المحل / المشروع';
    const oName = ownerName.trim() ? `سي ${ownerName}` : 'سيدي الكريم / الشاف';
    const cName = consultantName.trim() || 'أنا شاب من أبناء المنطقة متخصص في الخدمات الرقمية';

    if (channel === 'field') {
      if (dialect === 'darija') {
        return `السلام عليكم ورحمة الله، عفاك واش ممكن نتكلم مع المدير أو صاحب المحل دقيقة واحدة؟

(عند لقاء المالك):
السلام عليكم ${oName}، تبارك الله عليكم المحل ما شاء الله نقي والخدمة ديالكم ممتازة.
أنا سميتي ${cName} وساكن هنا قريب فالحي.
كنت باغي نجي عندكم البارح وقلبت عليكم فـ Google Maps، ولكن لقيت بلي الموضع ديالكم فـ الخريطة ما واضحش وفيه صور قديمة، وما كاينش نمرة التيليفون باش يعيط بنادم يحجز.

صراحة عجبني المشروع ديالكم وجاتني خسارة تضيعو زبائن كيبحثو يومياً على هاد الخدمة فهاد الحومة.
أنا مستعد نقاد ليكم الخريطة ونصور ليكم صور نقية ونربط ليكم الواتساب فالبلاصة، وباش نكسبو الثقة، بغيت ندير ليكم التدقيق الأول والتصوير مجاناً وتشوفو بعينيكم الفرق عاد نهدرو فالتعامل المستمر.

واش مسالي دابا 5 دقائق نوريك فالتلفون ديالي شنو خاصو يتبدل بالضبط؟`;
      } else if (dialect === 'fusha') {
        return `السلام عليكم ورحمة الله وبركاته، مرحباً بك ${oName}.
اسمي ${cName}، مستشار تسويق محلي وتطوير الأنشطة التجارية في المنطقة.

لاحظت خلال بحثي عن ${bName} في Google Maps أن بيانات الموقع غير مكتملة، ولا توجد صور حديثة تبرز جودة ما تقدمونه، بالإضافة لغياب زر التواصل المباشر عبر واتساب.

بما أن أكثر من 70% من الزبائن الجدد في منطقتنا يبحثون عبر هواتفهم قبل الزيارة، فهذه الثغرات تجعلكم تخسرون عملاء يومياً لصالح المنافسين القريبين.

يسعدني أن أقدم لكم فحصاً مجانياً شاملاً لمدة 10 دقائق لتوضيح كيفية تصحيح هذا التواجد ومضاعفة الزيارات المباشرة للمحل. هل يناسبكم وقت قصير غداً للحديث؟`;
      } else {
        return `صباح الخير / مساء الخير ${oName}، ما شاء الله الخدمة والاستقبال عندكم راقي جداً.
أنا ${cName}. حبيت فقط ألفت انتباهكم لفرصة حقيقية: صفحة ${bName} على الخرائط والسوشيال ميديا لا تعكس أبداً المستوى الممتاز الموجود داخل المحل.
بخطوات بسيطة وسريعة نقدر نخلي أي شخص يبحث عن خدماتكم في هذا الحي يراكم أول نتيجة ويتصل بكم فوراً.
هل تسمح لي بدقائق أريك الفارق على الهاتف؟`;
      }
    } else if (channel === 'whatsapp') {
      if (dialect === 'darija') {
        return `السلام عليكم ورحمة الله أخي ${oName}، كنتمنى تكون بألف خير.
معاك ${cName}. دزت اليوم حدا ${bName} وعجبني بزاف النشاط والخدمة ديالكم.

ولكن فاش دخلت نبحث عليكم فـ Google Maps و Instagram باش نصيفط المحل لصديق، لاحظت بلي:
1. الصور الموجودة قديمة وما عاطياش حق الجودة ديالكم.
2. ما كاينش رابط واتساب مباشر فالبروفايل باش يسهل على الزبون يطلب أو يسول على الأثمنة.
3. التقييمات كاينين بلا ردود، وهادشي كينقص من الثقة فـ Google.

وجدت ليكم تقرير تدقيق مصغر بالمجان كيوضح كيفاش نقدرو نزيدو عدد الزبائن لي كيجيوكم للمحل عبر الهاتف والخرائط.
واش ممكن نصيفطو ليك هنا فـ WhatsApp وتلقي عليه نظرة؟ شكراً لوقتك.`;
      } else {
        return `السلام عليكم ورحمة الله وبركاته ${oName}، تحياتي لفريق العمل في ${bName}.
معكم ${cName}، أخصائي في تنمية المبيعات الرقمية للمشاريع المحلية.

أثناء إجراء دراسة لنتائج البحث عن أفضل الأنشطة في منطقتكم، لفت انتباهي جودة خدماتكم، لكن لاحظت ضعفاً ملحوظاً في ظهوركم على خرائط Google وتفاعل صفحة السوشيال ميديا.

أعددت لكم تقريراً مجانياً من صفحة واحدة يوضح 3 ثغرات رئيسية تفقدكم اتصالات يومية من عملاء يبحثون عنكم بالاسم أو التخصص.
هل ترغب في أن أرسل لك التقرير للاطلاع عليه؟ كل التوفيق لكم.`;
      }
    } else if (channel === 'instagram') {
      return `مرحباً ${oName} 🙌 تبارك الله عليكم المحتوى والخدمة ديال ${bName} زوينة بزاف!
معاك ${cName} من نفس المدينة.
لاحظت بلي البروفايل ديالكم خاصو غير لمسات احترافية بسيطة (Highlights منسقة + رابط مباشر للواتساب لحجز المواعيد + تنظيم ساعات العمل فـ Google Maps) وغادي تشوفو تفاعل واتصالات أكثر من الناس دالحومة.
درت ليكم اقتراح بسيط لتحسين البروفايل مجاناً، إلا كان ممكن نصيفطو ليكم هنا وتشوفوه؟ تحياتي!`;
    } else {
      // Phone call
      return `السلام عليكم، سي ${ownerName || 'المدير المسؤول'}؟
معاك ${cName}، كنتصل بيك بخصوص ${bName}.
عارف وقتكم ثمين، غناخذ دقيقة واحدة فقط: لاحظت بلي رقم الهاتف فـ Google Maps عندكم محتاج تحديث، وبزاف ديال الزبائن كيبغيو يتصلو وما كيلقاوش وسيلة سريعة.
أنا متخصص فمساعدة المحلات المحلية فمدينتنا باش يظهرو أول نتيجة فالخريطة ويزيدو مبيعاتهم.
واش تسمح ليا ندوز عندكم غدا مع 4 العشية نتشاوفو 5 دقايق نوريك شنو نقدر نصلح ليك؟`;
    }
  }, [businessName, ownerName, niche, channel, dialect, consultantName]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePitch = () => {
    const newPitch: SavedPitch = {
      id: Date.now().toString(),
      businessName: businessName.trim() || 'مشروع محلي',
      niche,
      channel,
      text: generatedPitch,
      timestamp: new Date().toLocaleDateString('ar-EG')
    };
    setSavedPitches([newPitch, ...savedPitches]);
  };

  const handleDeleteSaved = (id: string) => {
    setSavedPitches(savedPitches.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400">
          <Sparkles className="h-4 w-4" />
          <span>الأداة التفاعلية الثانية · صيغ وتواصل مع التجار</span>
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
          مولد رسائل التواصل وعروض الزيارات الميدانية (Local Outreach Generator)
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          تجاوز الخوف من التحدث مع أصحاب المشاريع. اختر قناة التواصل واللهجة المناسبة ونوع الثغرة التي رصدتها، واحصل على نص مقنع يفتح لك الباب للاجتماع دون أن تبدو كبائع متطفل.
        </p>

        {/* Inputs */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80">
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">اسم النشاط التجاري</label>
            <input
              type="text"
              placeholder="مثال: مخبزة السلام"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">اسم المالك / المدير (اختياري)</label>
            <input
              type="text"
              placeholder="مثال: يوسف، أحمد..."
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">اسمك أو صفتك</label>
            <input
              type="text"
              placeholder="مثال: أيوب، خبير خرائط محلي"
              value={consultantName}
              onChange={(e) => setConsultantName(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">قناة التواصل المستهدفة</label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as any)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="field">نزول وزيارة ميدانية مباشرة</option>
              <option value="whatsapp">رسالة WhatsApp Business</option>
              <option value="instagram">رسالة خاصة Instagram Direct</option>
              <option value="phone">مكالمة هاتفية سريعة</option>
            </select>
          </div>
        </div>

        {/* Dialect and problem toggles */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">اللهجة والأسلوب</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDialect('darija')}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition border ${
                  dialect === 'darija'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                الدارجة المهنية
              </button>
              <button
                type="button"
                onClick={() => setDialect('fusha')}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition border ${
                  dialect === 'fusha'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                العربية الفصحى
              </button>
              <button
                type="button"
                onClick={() => setDialect('friendly')}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition border ${
                  dialect === 'friendly'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                أسلوب ودود مختصر
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">الثغرة الأساسية المكتشفة</label>
            <select
              value={diagnosedProblem}
              onChange={(e) => setDiagnosedProblem(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="maps_unclaimed">خرائط Google مهملة أو غير موثقة</option>
              <option value="no_photos">صور قديمة أو غير واضحة للأطباق/المنتجات</option>
              <option value="no_whatsapp">لا يوجد رابط WhatsApp مباشر للتواصل السريع</option>
              <option value="dead_instagram">حساب سوشيال ميديا ميت منذ أشهر</option>
              <option value="bad_reviews">تقييمات مهملة بدون ردود احترافية</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generated Pitch Result */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 backdrop-blur-xl relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <span className="text-xs font-black uppercase text-amber-400">
              النص المقترح للتواصل ({channel === 'field' ? 'ميداني' : channel === 'whatsapp' ? 'واتساب' : channel === 'instagram' ? 'انستغرام' : 'هاتف'})
            </span>
            <h3 className="text-lg font-black text-white mt-1">
              الرسالة المخصصة لـ {businessName || 'المشروع المستهدف'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSavePitch}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-xs font-bold text-zinc-200 hover:bg-zinc-700 transition"
            >
              <Bookmark className="h-3.5 w-3.5 text-amber-400" />
              <span>حفظ في المفضلة</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'تم النسخ' : 'نسخ الرسالة'}</span>
            </button>
          </div>
        </div>

        <div className="mt-5 p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-sm text-zinc-200 leading-relaxed font-mono whitespace-pre-wrap selection:bg-amber-500 selection:text-black">
          {generatedPitch}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
          <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
          <span>
            نصيحة ذهبية: لا تتحدث عن مصطلحات تقنية (SEO, Algorithms, Metadata). ركز دائماً على «الزبائن الجدد الذين يبحثون بالهاتف ولا يجدون المحل».
          </span>
        </div>
      </div>

      {/* Saved Pitches List */}
      {savedPitches.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <BookmarkCheck className="h-4 w-4 text-amber-400" />
              <span>الرسائل المحفوظة ({savedPitches.length})</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedPitches.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3 relative group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{p.businessName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500">{p.timestamp}</span>
                    <button
                      onClick={() => handleDeleteSaved(p.id)}
                      className="text-zinc-500 hover:text-rose-400 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-zinc-300 font-mono line-clamp-3 bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800/80">
                  {p.text}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(p.text);
                  }}
                  className="w-full text-center py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 text-[11px] font-bold text-zinc-200 transition"
                >
                  نسخ هذا النص
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
