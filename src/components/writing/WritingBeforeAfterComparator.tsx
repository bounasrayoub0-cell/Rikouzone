import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  Sparkles, 
  Copy, 
  Check, 
  Eye, 
  HelpCircle,
  FileText,
  MousePointerClick
} from 'lucide-react';

interface WritingBeforeAfterComparatorProps {
  onCopyText: (text: string, label: string) => void;
}

export const WritingBeforeAfterComparator: React.FC<WritingBeforeAfterComparatorProps> = ({ onCopyText }) => {
  const [selectedCase, setSelectedCase] = useState<'blog-intro' | 'product-desc' | 'email-pitch'>('blog-intro');
  const [copied, setCopied] = useState<boolean>(false);

  const cases = {
    'blog-intro': {
      title: 'مقدمة مقال عن الإنتاجية وتنظيم الوقت',
      context: 'مقدمة مقال لمدونة رواد أعمال ومستقلين للحديث عن التغلب على التسويف.',
      before: {
        text: `من الجدير بالذكر والإشارة إليه في هذا العصر الرقمي الحديث والمتسارع أن إدارة الوقت تعتبر من أهم الأمور الحيوية والضرورية جداً في حياة كل إنسان يبحث عن النجاح والتميز في مسيرته المهنية والشخصية، حيث إن الكثير من الناس في مجتمعاتنا اليوم يعانون من مشكلة التسويف وتأجيل المهام بشكل كبير جداً مما يؤدي إلى ضياع أوقاتهم وفشل مشاريعهم دون تحقيق نتائج ملموسة، ولذلك فإننا في هذا المقال المتواضع سنحاول أن نسلط الضوء على بعض النصائح المفيدة في هذا الصدد.`,
        flaws: [
          'جملة افتتاحية إنشائية مملة تمتد لـ 4 أسطر دون توقف ("من الجدير بالذكر في هذا العصر الرقمي").',
          'استخدام ترادفات حشوية زائدة ("حيوية وضرورية جداً"، "المهنية والشخصية").',
          'غياب الهوك (Hook) الجذاب الذي يشد انتباه القارئ المشغول.',
          'نبرة اعتذارية ضعيفة في الختام ("مقالنا المتواضع سنحاول أن نسلط الضوء").',
          'القارئ يغادر الصفحة بعد 5 ثوانٍ لشعوره بأن المحتوى مكرر وبلا فائدة.'
        ],
        wordCount: 84,
        readability: 'رديئة ومرهقة للعين'
      },
      after: {
        text: `هل شعرت يوماً أن قائمة مهامك تزداد طولاً كلما حاولت إنجازها؟

لست وحدك؛ أكثر من 80% من رواد الأعمال يقضون 3 ساعات يومياً في مكافحة التسويف الرقمي ومشتتات الهاتف.

السر لا يكمن في العمل لـ 14 ساعة، بل في معرفة ما يجب أن تحذفه من يومك.

في هذا الدليل العملي، سنكشف لك "نظام الـ 3 مهام" الذي استخدمه أكثر من 500 مستقل لمضاعفة إنتاجيتهم دون الشعور بالإرهاق.`,
        improvements: [
          'سؤال افتتاحي ذكي يلمس ألم القارئ الحقيقي مباشرة (Pain Point Hook).',
          'إحصائية سريعة تؤكد للقارئ أن مشكلته طبيعية ولديه رفقاء في نفس المعاناة.',
          'تنسيق حديث بأسطر متباعدة (Skimmable) ومريحة للقراءة على شاشة الهاتف.',
          'وعد صريح وقابل للقياس ("نظام الـ 3 مهام" لـ 500 مستقل).',
          'لغة حية ومباشرة بدون أي حشو إنشائي.'
        ],
        wordCount: 72,
        readability: 'سلسة وجذابة تدفع للقراءة حتى النهاية'
      }
    },
    'product-desc': {
      title: 'وصف منتج لمتجر تجارة إلكترونية (سماعات عازلة للضوضاء)',
      context: 'صفحة منتج في متجر إلكتروني لبيع سماعات لاسلكية حديثة.',
      before: {
        text: `سماعة رأس لاسلكية بالبلوتوث رقم الموديل X-200. تحتوي على بطارية ليثيوم أيون 500 مللي أمبير، مع ميزة عزل الضوضاء النشط بتقنية ANC المتقدمة. وزن السماعة 240 غرام ومصنوعة من البلاستيك المقوى والجلد الصناعي. التردد من 20 هرتز إلى 20 كيلوهرتز، وتعمل بالبلوتوث إصدار 5.3. متوفرة باللون الأسود. اشتريها الآن من متجرنا.`,
        flaws: [
          'سرد أرقام ومواصفات تقنية جافة دون ربطها بحياة المشتري اليومية.',
          'الحديث عن الميزات (Features) بدلاً من الفوائد الملموسة (Benefits).',
          'انعدام المشاعر والرغبة التي تدفع المتسوق للضغط على زر الشراء.',
          'دعوة ختامية باردة ومملة ("اشتريها الآن من متجرنا").'
        ],
        wordCount: 61,
        readability: 'دليل مستخدم جاف وليس نصاً بيعياً'
      },
      after: {
        text: `انسَ ضجيج المقهى واصنع مساحة تركيزك الخاصة في ثوانٍ.

سواء كنت تعمل على مشروع عاجل في مكتب مزدحم، أو تستمتع برحلة طيران طويلة، تمنحك سماعات SoundShield عزلاً صوتياً ذكياً يلغي 98% من الضوضاء المحيطة.

لماذا ستعشق هذه السماعة؟
• هدوء فوري بضغطة زر: تقنية عزل متطورة تحجب أصوات الزحام وأحاديث الجالسين بجانبك.
• طاقة تدوم أسبوعاً كاملاً: 35 ساعة تشغيل متواصل بشحنة واحدة فقط.
• خفيفة كالهواء: وسائد أذن ميموري فوم مريحة لن تشعر بوزنها حتى بعد 8 ساعات من الاستماع.

احصل عليها اليوم مع شحن مجاني وضمان استبدال لمدة سنتين.`,
        improvements: [
          'هوك عاطفي يخاطب رغبة العميل في التركيز والهدوء (Emotion-driven Hook).',
          'تحويل الميزات التقنية إلى فوائد حسية (35 ساعة = تدوم أسبوعاً كاملاً).',
          'تنسيق نقطي بالـ Bullet points يسهل قراءته في 15 ثانية على الموبايل.',
          'إزالة مخاوف الشراء بضمان الاستبدال والشحن المجاني.'
        ],
        wordCount: 94,
        readability: 'مقنعة وتحول المتصفح العادي إلى مشترٍ حقيقي'
      }
    },
    'email-pitch': {
      title: 'رسالة بريد إلكتروني ترويجية (استشارة مجانية لمتجر)',
      context: 'إيميل مرسل لقائمة بريدية لأصحاب المتاجر لعرض جلسة تدقيق مجانية.',
      before: {
        text: `إلى من يهمه الأمر،
نحن شركة تسويق رقمي وكتابة محتوى متخصصة في مساعدة الشركات على تحسين ظهورها وأرباحها ونعمل مع الكثير من العملاء في الوطن العربي وخارجه ولدينا فريق كبير من الخبراء. نود إعلامكم بأن لدينا عرضاً رائعاً لحجز جلسة استشارية مجانية لمناقشة أداء متجركم وكيفية تطويره. يرجى مراسلتنا والرد على هذا البريد لحجز الموعد إذا كنتم مهتمين بذلك وشكراً جزيلاً.`,
        flaws: [
          'افتتاحية ميتة ("إلى من يهمه الأمر").',
          'التركيز بالكامل على "نحن ومن نحن وشركتنا" وتجاهل العميل تماماً.',
          'عدم وجود أي ميزة واضحة تشجع العميل على تضييع 30 دقيقة من وقته.',
          'دعوة غير محددة ولا رابط لحجز التقويم مباشرة.'
        ],
        wordCount: 68,
        readability: 'رسالة Spam كلاسيكية يتم حذفها فوراً'
      },
      after: {
        text: `مرحباً سارة،

أثناء تصفحي لمتجرك أمس، لاحظت أنك تقدمين منتجات رائعة للعناية بالبشرة، لكن هناك 3 تفاصيل صغيرة في صفحة الدفع قد تجعلك تفقدين 1 من كل 4 مشترين قبل إتمام الطلب!

أعددت فحصاً سريعاً لـ 3 ثغرات يمكن إصلاحها في 10 دقائق لرفع نسبة المبيعات بمتجرك.

هل يناسبك أن نتحدث في مكالمة سريعة لمدة 15 دقيقة يوم الثلاثاء القادم لنستعرضها معاً؟

يمكنك اختيار الوقت الأنسب لجدولك بضغطة واحدة هنا: [رابط Calendly المباشر].

تحياتي،
أيوب - متخصص تجربة المتسوق والمحتوى`,
        improvements: [
          'نداء شخصي بالاسم وإثبات أنك تصفحت متجرها بالتحديد.',
          'ملاحظة استباقية تقدم قيمة فورية تكشف مشكلة حقيقية في صفحة الدفع.',
          'تحديد مدة زمنية قصيرة وغير مخيفة للمكالمة (15 دقيقة فقط).',
          'رابط تقويم مباشر يزيل احتكاك تنسيق المواعيد عبر الإيميلات المتبادلة.'
        ],
        wordCount: 85,
        readability: 'شخصية، مهذبة، وتقدم فائدة حقيقية يصعب رفضها'
      }
    }
  };

  const currentCase = cases[selectedCase];

  const handleCopyCurrent = () => {
    onCopyText(currentCase.after.text, `نموذج الكتابة المحسنة: ${currentCase.title}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="h-4 w-4" />
            <span>مقارنة الكتابة الحية (Live Before & After Analysis)</span>
          </div>
          <h3 className="mt-1 text-2xl font-black text-white">
            تشريح عملي: كيف تحول نصاً ضعيفاً إلى نص احترافي مقنع؟
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            شاهد الفارق الدقيق بين الكتابة الإنشائية المبتذلة والكتابة المركزة التي تدفع القارئ لاتخاذ قرار فوري.
          </p>
        </div>

        <button
          onClick={handleCopyCurrent}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-black text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all shrink-0"
        >
          {copied ? <Check className="h-4 w-4 stroke-[3]" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'تم نسخ النص المحسّن!' : 'نسخ النص المحسّن'}</span>
        </button>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800">
        {[
          { id: 'blog-intro', label: '1. مقدمة مقال مدونة (Blog Post)' },
          { id: 'product-desc', label: '2. وصف منتج متجر (E-commerce)' },
          { id: 'email-pitch', label: '3. رسالة بريد بيعية (Email Pitch)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCase(tab.id as any)}
            className={`flex-1 min-w-[180px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              selectedCase === tab.id
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Context info */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 text-xs text-zinc-300 flex items-center justify-between">
        <div>
          <span className="font-bold text-amber-400">سياق الحالة: </span>
          <span>{currentCase.context}</span>
        </div>
        <span className="text-[11px] text-zinc-500 font-mono hidden sm:inline">
          {currentCase.title}
        </span>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* BEFORE BOX (RED) */}
        <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 via-zinc-950/90 to-zinc-950 p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <div className="flex items-center gap-2 font-bold text-rose-400 text-xs">
                <XCircle className="h-4 w-4" />
                <span>قبل التحسين (كتابة إنشائية ضعيفة)</span>
              </div>
              <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/20">
                {currentCase.before.wordCount} كلمة • {currentCase.before.readability}
              </span>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/90 p-4 font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {currentCase.before.text}
            </div>
          </div>

          <div className="rounded-xl bg-rose-500/5 border border-rose-500/20 p-4 space-y-2">
            <div className="font-bold text-rose-400 text-xs">لماذا تفشل هذه الصياغة؟</div>
            <ul className="space-y-1 text-xs text-zinc-300 list-disc list-inside">
              {currentCase.before.flaws.map((flaw, idx) => (
                <li key={idx} className="leading-relaxed">{flaw}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* AFTER BOX (GREEN) */}
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 via-zinc-950/90 to-zinc-950 p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2 font-bold text-emerald-400 text-xs">
                <CheckCircle2 className="h-4 w-4" />
                <span>بعد التحسين (كتابة احترافية جذابة)</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                {currentCase.after.wordCount} كلمة • {currentCase.after.readability}
              </span>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-zinc-900/90 p-4 font-mono text-xs text-white leading-relaxed whitespace-pre-wrap">
              {currentCase.after.text}
            </div>
          </div>

          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 space-y-2">
            <div className="font-bold text-emerald-400 text-xs">أسرار القوة في هذا النص المحسّن:</div>
            <ul className="space-y-1 text-xs text-zinc-200 list-disc list-inside">
              {currentCase.after.improvements.map((imp, idx) => (
                <li key={idx} className="leading-relaxed">{imp}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
