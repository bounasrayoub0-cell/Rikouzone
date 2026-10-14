import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  Mail, 
  DollarSign, 
  ShieldCheck, 
  Rocket, 
  Building2,
  Users
} from 'lucide-react';

interface MicroSaasTemplateItem {
  id: string;
  title: string;
  category: 'cold-email' | 'landing-page' | 'retention' | 'launch' | 'legal';
  icon: any;
  description: string;
  content: string;
}

const TEMPLATES: MicroSaasTemplateItem[] = [
  {
    id: 'b2b-cold-email',
    title: 'قالب البريد البارد فائق التخصيص لشركات B2B (3 أسطر فقط)',
    category: 'cold-email',
    icon: Mail,
    description: 'نموذج بريد قصير جداً ومحترم لوقت المدير المستهدف يحقق معدل فتح ورد يفوق 25%.',
    content: `الموضوع: فكرة سريعة لتوفير وقت فريق [اسم الشركة] في [المهمة المحددة]

مرحباً [اسم الشخص]،

لاحظت جهودكم المميزة في [اسم الشركة أو إشارة لمنتج أو منشور نشروه مؤخراً].

أنا مبرمج ومؤسس [اسم أداتك]، وهي أداة صغيرة متخصصة تساعد [المسمى الوظيفي للجمهور] على أتمتة [المشكلة المؤلمة، مثلاً: استخراج فواتير المشتريات] في أقل من 30 ثانية بدلاً من ساعات الإدخال اليدوي.

هل تمانع لو شاركت معك رابط تجربة مجاني بدون أي بطاقة ائتمان لتجربتها مع فريقك وتبدي لي رأيك الصادق؟

تحياتي وتقديري،
[اسمك]
مؤسس [اسم أداتك] - [رابط موقعك]`
  },
  {
    id: 'landing-page-copy',
    title: 'هيكل ونصوص صفحة هبوط ذات تحويل عالٍ (High-Converting Copy)',
    category: 'landing-page',
    icon: FileText,
    description: 'النصوص والصيغ الهيكلية الكاملة من العنوان الرئيسي وحتى زر الدفع وقسم الأسئلة الشائعة.',
    content: `[القسم 1: العناوين الرئيسية في الـ HERO]
العنوان الرئيسي (H1): 
حل [المشكلة المؤلمة بالضبط] لـ [الجمهور المستهدف] في [المدة بالثواني/الدقائق] — بدون [العقبة المكروهة]
مثال: "حوّل ملفات فواتير المشتريات إلى جداول Excel متوافقة ضريبياً في 15 ثانية — بدون إدخال يدوي ممل"

العنوان الفرعي (Subheadline):
توقف عن إهدار 10 ساعات أسبوعياً في النسخ واللصق. وفر وقت فريقك المحاسبي وتجنب الأخطاء البشرية القاتلة بأداة ذكية وموثوقة بنسبة 99.8%.

زر الإجراء الرئيسي (CTA Button):
"ابدأ تجربتك المجانية في 30 ثانية — بدون بطاقة ائتمان"

[القسم 2: الألم والحل (Before & After)]
قبل [اسم أداتك]:
- إهدار ساعات يومية في مهام روتينية مكررة
- أخطاء يدوية تؤدي إلى غرامات أو مبيعات ضائعة
- برمجيات كبرى معقدة تكلف 300 دولار شهرياً وتحتوي ميزات لا تحتاجها

بعد [اسم أداتك]:
- إنجاز العمل بنقرة واحدة في ثوانٍ معدودة
- دقة متناهية وبيانات مشفرة وآمنة تماماً
- أداة متخصصة وسريعة وبسعر اشتراك عادل يبدأ من 29$/شهرياً فقط

[القسم 3: جدول الأسعار الشفاف]
باقة Starter ($29/شهرياً أو $240/سنوياً):
- 200 عملية معالجة شهرياً
- مستخدم واحد
- دعم فني عبر البريد خلال 24 ساعة
- تصدير بجميع الصيغ

باقة Pro ($69/شهرياً أو $580/سنوياً) — الأكثر شعبية:
- معالجة غير محدودة
- 5 أعضاء للفريق
- دعم فني مباشر ذو أولوية
- تكامل مع الـ Webhooks والـ API

[القسم 4: أهم 3 أسئلة شائعة (FAQ)]
س: هل أحتاج إلى إدخال بطاقة ائتمانية لبدء التجربة المجانية؟
ج: إطلاقاً! يمكنك التسجيل بضغطة زر وتجربة الأداة بالكامل لمدة 7 أيام دون أي التزام.

س: كيف يمكنني إلغاء اشتراكي إن لم يعجبني المنتج؟
ج: بضغطة زر واحدة من لوحة التحكم في أي وقت وبدون الحاجة لمراسلتنا.

س: هل بياناتنا وفواتيرنا آمنة؟
ج: نعم، يتم تشفير جميع الملفات والبيانات باستخدام بروتوكولات AES-256 المتوافقة مع معايير البنوك العالمية.`
  },
  {
    id: 'retention-cancellation-flow',
    title: 'نص تدفق الإلغاء الذكي وعرض الخصم التلقائي (Churn Reduction)',
    category: 'retention',
    icon: DollarSign,
    description: 'الرسائل النفسية والعروض التي تقدم للعميل عند ضغط زر "إلغاء الاشتراك" لإنقاذ 20% من الاشتراكات.',
    content: `[شاشة 1: رسالة التأكيد المهذبة والاستبيان الفوري]
العنوان: "نأسف جداً لرؤيتك تفكر في المغادرة، [اسم العميل]!"
النص: "ملاحظاتك تعني لنا كل شيء كمؤسس يبني هذه الأداة بيده. هل تمانع في إخبارنا بالسبب لمساعدتنا على التحسين؟"

خيارات السبب (اختر واحداً):
1. السعر مرتفع جداً مقارنة بميزانيتي الحالية
2. لا أحتاج إلى الأداة في هذا الوقت بالتحديد (مشروع موسمي)
3. واجهت صعوبة في فهم أو إعداد الأداة
4. ينقصني ميزة معينة أبحث عنها
5. أسباب أخرى

[شاشة 2: العرض البديل الذكي المخصص]

السيناريو أ: إذا اختار "السعر مرتفع":
"نحن نقدر عملك جداً ولا نريد للمال أن يكون عائقاً أمام نجاحك. 
ما رأيك في البقاء معنا بخصم 50% على الشهرين القادمين؟ ($14.50/شهر بدلاً من $29)
[زر: تطبيق الخصم والاستمرار في العمل] | [زر: إتمام الإلغاء]"

السيناريو ب: إذا اختار "لا أحتاج للأداة حالياً":
"هل تعلم أنه يمكنك تجميد اشتراكك (Pause Subscription) مؤقتاً لمدة تصل إلى 60 يوماً مجاناً؟ 
سنحتفظ بجميع بياناتك وإعداداتك وتقاريرك آمنة وجاهزة لعودتك دون أي رسوم إضافية.
[زر: تجميد الاشتراك لـ 30 يوماً] | [زر: إتمام الإلغاء]"

[شاشة 3: في حال أصر على الإلغاء]
"تم إلغاء اشتراكك بنجاح. ستظل باقتك الحالية نشطة حتى نهاية دورتك الفوترية في [تاريخ اليوم الأخير].
شكراً لك لكونك جزءاً من رحلتنا، ونتمنى أن نراك مجدداً قريباً!"`
  },
  {
    id: 'product-hunt-maker-comment',
    title: 'قالب تعليق الصانع (First Maker Comment) على Product Hunt',
    category: 'launch',
    icon: Rocket,
    description: 'التعليق الافتتاحي الملهم الذي يثبته صاحب المشروع في أعلى منشور إطلاق Product Hunt.',
    content: `Hey Product Hunt community! 👋

I'm [Your Name], solo developer and maker behind [Product Name].

Ever spent [Number of hours] struggling with [Specific Pain Point]? That was exactly my reality a few months ago while working with [Your Context/Client Story]. I tried using [Competitor A] and [Competitor B], but they were either too bloated, charged $200+/mo, or had horribly slow interfaces.

So I decided to build [Product Name] — a lightweight, laser-focused micro-SaaS that does ONE thing exceptionally well: [One sentence killer feature].

Key highlights:
⚡ Blazing fast: Solve your task in under 30 seconds
🔒 Privacy-first: Your data is encrypted and never sold
💰 Fair pricing: Built for bootstrappers and small teams, starting at just $19/mo

🎁 EXCLUSIVE PRODUCT HUNT LAUNCH OFFER:
Use promo code **PH50** at checkout for 50% OFF your first 3 months!

I'll be hanging around all day answering every single question, taking feature requests, and fixing bugs on the fly. 

Would love to hear your honest feedback and thoughts below! What feature should we build next? 👇`
  },
  {
    id: 'saas-terms-privacy-snippet',
    title: 'قالب الشروط وسياسة الخصوصية المعتمدة لـ Micro-SaaS',
    category: 'legal',
    icon: ShieldCheck,
    description: 'بنود قانونية مختصرة لحماية المبرمج الفردي وتوضيح ملكية البيانات وسياسة الاسترجاع والفوترة.',
    content: `[وثيقة شروط الخدمة لـ Micro-SaaS - ملخص البنود الأساسية]

1. نطاق الخدمة والحسابات:
يوفر [اسم الخدمة] وصولاً سحابياً عبر الاشتراكات الشهرية أو السنوية. يتحمل المشترك مسؤولية الحفاظ على سرية بيانات تسجيل دخوله واستخدامه المعتمد للخدمة بما لا يخالف القوانين السارية.

2. سياسة الفوترة والتجديد التلقائي:
يتم تجديد الاشتراكات تلقائياً في نهاية كل دورة فوترية (شهرية أو سنوية) عبر بائع السجلات الرسمي المعتمد لدينا (Lemon Squeezy / Paddle / Stripe). يمكن للعميل إلغاء الاشتراك التلقائي في أي وقت من لوحة التحكم دون فرض أي رسوم إضافية.

3. سياسة الاسترجاع المالي (Refund Policy):
نقدم ضمان استرداد الأموال بنسبة 100% خلال 14 يوماً من أول عملية شراء في حال لم تلبِ الخدمة توقعاتك أو واجهت مشكلة تقنية لم نتمكن من حلها.

4. ملكية البيانات والخصوصية:
جميع البيانات والملفات التي يرفعها العميل تظل ملكاً حصرياً له. نحن لا نقوم ببيع أو مشاركة بيانات المشتركين مع أي طرف ثالث لأغراض إعلانية، ويتم تشفير الاتصالات بالكامل بمعايير SSL/TLS و AES-256.

5. حدود المسؤولية (Limitation of Liability):
يتم تقديم الخدمة "كما هي" دون ضمانات مطلقة لعدم انقطاع الخدمة بسبب أعطال مزودي البنية التحتية السحابية الخارجية، ولا تتجاوز مسؤوليتنا المالية القصوى إجمالي ما دفعه المشترك خلال الشهر الأخير.`
  }
];

export const MicroSaasTemplatesView: React.FC<{ onCopyText: (text: string, label: string) => void }> = ({ onCopyText }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(TEMPLATES[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const activeTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  const handleCopy = () => {
    onCopyText(activeTemplate.content, 'تم نسخ القالب بنجاح!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      {/* Intro Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
            <FileText className="h-4 w-4" />
            <span>قوالب ونصوص جاهزة لمشاريع Micro-SaaS</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            مكتبة النصوص التشغيلية والتسويقية والقانونية الجاهزة للنسخ
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl">
            وفر عشرات الساعات من صياغة الإيميلات ونصوص صفحات الهبوط وتدفقات الإلغاء. قوالب مجربة ومبنية خصيصاً لمشاريع البرمجيات بالاشتراك.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar (Left / Span 4) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-zinc-400 block px-1">اختر القالب المطلوب:</span>
          {TEMPLATES.map((tpl) => {
            const Icon = tpl.icon;
            const isSelected = tpl.id === selectedTemplateId;
            return (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplateId(tpl.id)}
                className={`w-full text-right p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-white'
                    : 'border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-zinc-800 text-zinc-400'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-xs font-bold truncate">{tpl.title}</div>
                  <div className="text-[11px] text-zinc-500 line-clamp-1">{tpl.description}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Preview & Copy (Right / Span 8) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-white">{activeTemplate.title}</h3>
              <p className="text-xs text-zinc-400">{activeTemplate.description}</p>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold transition-colors shrink-0"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ القالب'}</span>
            </button>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap selection:bg-cyan-500/30 selection:text-white max-h-[550px] overflow-y-auto">
            {activeTemplate.content}
          </div>
        </div>
      </div>
    </div>
  );
};
