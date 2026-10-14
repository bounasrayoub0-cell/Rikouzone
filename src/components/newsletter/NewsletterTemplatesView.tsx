import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  Download, 
  Mail, 
  DollarSign, 
  ShieldCheck,
  Send,
  Building2,
  Users
} from 'lucide-react';

interface NewsletterTemplateItem {
  id: string;
  category: 'welcome' | 'sponsor-pitch' | 'media-kit' | 're-engagement' | 'referral';
  title: string;
  description: string;
  badge: string;
  content: string;
}

const TEMPLATES: NewsletterTemplateItem[] = [
  {
    id: 'welcome-email',
    category: 'welcome',
    title: 'قالب إيميل الترحيب الآلي فائق التفاعل (Welcome Email)',
    description: 'يُرسل في أول 60 ثانية من تسجيل المشترك لرفع معدل الفتح وتدريب خوارزمية Gmail على تصنيفك كصديق موثوق.',
    badge: 'معدل فتح 78%+',
    content: `عنوان الرسالة: مرحباً بك في [اسم النشرة] 👋 (وهديتك الترحيبية بالداخل)
سطر المعاينة: خطوتك الأولى لاكتشاف أهم رؤى [مجالك] كل أسبوع.

مرحباً يا [الاسم / الصديق الرائع]،

أهلاً بك في عائلة [اسم النشرة]! يسعدني جداً انضمامك لأكثر من [عدد المشتركين، مثلاً: 1,500+] قارئ ذكي يبحثون عن الزبدة الصافية وتوفير الوقت.

📌 ماذا تتوقع منا؟
كل يوم [اليوم المختار، مثلاً: ثلاثاء] في تمام الثامنة صباحاً، ستصلك رسالة قصيرة من 4 دقائق تحتوي على:
1. الفكرة الكبرى للأسبوع وخلاصة أهم التطورات.
2. 3 أدوات ذكية توفر عليك ساعات عمل.
3. زاوية تحليلية ورابط استثنائي لن تجده في السوشيال ميديا.

🎁 هديتك الترحيبية الفورية:
بما أنك أخذت خطوة الاشتراك، يمكنك تحميل [اسم الهدية، مثلاً: دليل الـ 50 أداة المجاني] من هذا الرابط المباشر:
[ضع رابط التحميل هنا]

⚠️ طلب صغير ولكنه سحري:
حتى لا تضيع أعدادنا الأسبوعية في مجلد الترويجات (Promotions) أو السبام:
• إذا كنت تستخدم Gmail: اسحب هذه الرسالة الآن إلى صندوق الوارد الرئيسي (Primary Tab).
• اضغط زر الرد (Reply) واكتب كلمة "وصلت" أو أخبرني: ما هو أكثر تحدٍ يواجهك في عملك حالياً؟ (أقرأ كل الردود شخصياً وأرد عليها).

أراك يوم [اليوم المختار] القادم!

مع فائق التحية والتقدير،
[اسمك الشخصي]
مؤسس [اسم النشرة]`
  },
  {
    id: 'sponsor-cold-pitch',
    category: 'sponsor-pitch',
    title: 'سكريبت التواصل البارد مع مدراء التسويق (Sponsor Cold Pitch)',
    description: 'رسالة مقنعة ومباشرة من 120 كلمة موجهة لمسؤولي التسويق والشراكات في شركات B2B والبرمجيات.',
    badge: 'معدل رد 32%',
    content: `عنوان الرسالة: فكرة شراكة رعاية: [اسم شركتهم] × نشرة [اسم نشرتك] ([عدد المشتركين] مشترك متفاعل)

مرحباً [اسم مدير التسويق]،

أتابع بإعجاب كيف تساعد حلولكم في [اسم منتجهم أو شركتهم] رواد الأعمال والمهنيين على [الميزة الملموسة للمنتج].

أكتب نشرة بريدية أسبوعية باسم "[اسم النشرة]" يقرأها أكثر من [عدد المشتركين، مثلاً: 3,200] من [الشريحة الوظيفية، مثلاً: مؤسسي الشركات ومدراء المنتجات والتقنيين]، بمعدل فتح فعلي يتجاوز [% نسبة الفتح، مثلاً: 47%] (أي أكثر من [عدد القراء الفعليين] قارئ يفتحون كل عدد).

نظراً لأن عدد الثلاثاء القادم مخصص لموضوع [الموضوع ذو الصلة بمنتجهم]، أعتقد أن حلولكم ستقدم فائدة مباشرة يبحث عنها جمهورنا بشغف.

سعر رعاية العدد هو [$ السعر، مثلاً: 150$] فقط، ويشمل:
• شعاركم في أعلى النشرة.
• فقرة مخصصة من 80 كلمة مع زر رابط مباشر لتجربة خدمتكم.

هل تود حجز موضع في عدد الثلاثاء القادم، أم تفضل الاطلاع على حزمة الـ 4 أعداد مع خصم 15%؟

رابط الحقيبة الإعلامية (Media Kit) والأعداد السابقة: [ضع الرابط هنا]

مع خالص التقدير،
[اسمك]
[رقم الهاتف أو حساب لينكد إن]`
  },
  {
    id: 'media-kit-rate-card',
    category: 'media-kit',
    title: 'هيكل الحقيبة الإعلامية وبطاقة الأسعار (Media Kit One-Pager)',
    description: 'الوثيقة التعريفية التي ترسلها للرعاة لتوضيح المقاييس والأسعار وطرق الحجز باحترافية تامة.',
    badge: 'المعيار الصناعي',
    content: `📄 الحقيبة الإعلامية لنشرة [اسم النشرة] (Media Kit)
نشرة أسبوعية متخصصة في [النيتش، مثلاً: أتمتة الأعمال وتقنيات الذكاء الاصطناعي]

📊 الأرقام الحيوية لجمهورنا (محدثة هذا الشهر):
• إجمالي المشتركين النشطين: [المشتركون] مشترك موثق.
• معدل الفتح الفعلي (Open Rate): [% الفتح، مثلاً: 45.2%].
• نسبة النقر إلى الفتح (CTOR): [12.8%].
• وتيرة الصدور: كل يوم [اليوم المختار] صباحاً.

👥 من هم قراؤنا؟
• 45% رواد أعمال ومؤسسو شركات ناشئة.
• 30% مدراء تقنيون ومبرمجون ومصممون.
• 25% مسوقون ومستقلون أصحاب مشاريع حرة.
(أهم الدول: السعودية، الإمارات، المغرب، مصر، وأوروبا).

💰 باقات الرعاية الإعلانية المتاحة:

1. الراعي الرئيسي (Main Headline Sponsor):
• موضع متميز في أعلى النشرة تحت الشعار مباشرة.
• شعار الشركة + عنوان مخصص + 80 إلى 100 كلمة + زر دعوة للإجراء (CTA).
• السعر للعدد الواحد: [150$]
• حزمة 4 أعداد شهرية: [500$] (توفير 100$).

2. الرابط المصنف السريع (Classified Ad):
• موضع في قسم مختارات الأسبوع.
• سطر مميز + 30 كلمة + رابط مباشر.
• السعر للعدد الواحد: [50$].

📌 سياسة النشر وشروط الرعاية:
• نحتفظ بالحق في رفض أي راعٍ لا يتناسب منتجه مع اهتمامات ومصلحة قرائنا.
• يجب إرسال النصوص والمواد الإعلانية قبل 48 ساعة من موعد الإرسال.
• رابط الحجز والدفع المباشر: [رابط Stripe أو البريد الإلكتروني]`
  },
  {
    id: 're-engagement-sunset',
    category: 're-engagement',
    title: 'إيميل إعادة التنشيط والوداع لتنظيف القائمة (Sunset Email)',
    description: 'يُرسل للمشتركين الخاملين قبل حذفهم لحماية سمعة الإرسال ورفع معدل الفتح لدى Gmail.',
    badge: 'حماية السمعة',
    content: `عنوان الرسالة: هل نمسحك من نشرة [اسم النشرة]؟ (يرجى التأكيد) 👋
سطر المعاينة: نقدر وقتك، ولا نريد إزعاج صندوق واردك إذا لم تعد مهتماً.

مرحباً يا [الاسم / الصديق]،

لاحظت أنك لم تفتح أياً من أعدادنا الأخيرة في نشرة [اسم النشرة] خلال الشهرين الماضيين.

نحن نؤمن باحترام وقتك تماماً، ولا نريد أن نكون رسالة إضافية تسبب لك زحاماً في بريدك إذا كانت اهتماماتك قد تغيرت (وهذا أمر طبيعي تماماً).

إذا كنت ترغب في الاستمرار معنا في استقبال ملخصات الأسبوع:
👉 [اضغط هنا بنقرة واحدة لتأكيد بقائك معنا في القائمة]

أما إذا كنت تفضل المغادرة:
فلا داعي لفعل أي شيء؛ سنقوم بحذف بريدك بلطف وبشكل تلقائي بعد 5 أيام من الآن لتنظيف صندوق واردك دون أي التزام.

نتمنى لك التوفيق دائماً، وشكراً لوقتك الجميل معنا!

[اسمك]
مؤسس [اسم النشرة]`
  },
  {
    id: 'referral-rewards',
    category: 'referral',
    title: 'صيغة برنامج الإحالة والمكافآت (Referral Program Copy)',
    description: 'نصوص تحفيز القراء على مشاركة النشرة مع أصدقائهم مقابل الحصول على هدايا ومكافآت رقمية.',
    badge: 'نمو فيروسي',
    content: `🎁 شارك [اسم النشرة] واحصل على مكافآت حصرية!

هل تستمتع بقراءة أعدادنا الأسبوعية؟ شارك رابط الإحالة الخاص بك مع زملائك في العمل أو على وسائل التواصل وافتح هدايا استثنائية:

• ادعُ 3 أصدقاء: احصل على [شيت شيت سري لأقوى أدوات الإنتاجية بصيغة PDF].
• ادعُ 5 أصدقاء: احصل على [قالب Notion المتكامل لإدارة المشاريع بقيمة 29$ مجاناً].
• ادعُ 15 صديقاً: احصل على [جلسة استشارية وتوجيه شخصي لمدة 30 دقيقة عبر زووم].

رابط الإحالة المخصص لك:
[رابط الإحالة الفريد الخاص بالمشترك]

نسخ الرابط بنقرة واحدة 👆 | مشاركة عبر واتساب | مشاركة عبر تويتر`
  }
];

interface NewsletterTemplatesViewProps {
  onCopyText: (text: string, label: string) => void;
}

export const NewsletterTemplatesView: React.FC<NewsletterTemplatesViewProps> = ({ onCopyText }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = TEMPLATES.filter((t) => {
    return selectedCategory === 'all' || t.category === selectedCategory;
  });

  const handleCopy = (item: NewsletterTemplateItem) => {
    onCopyText(item.content, `تم نسخ ${item.title}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
            <FileText className="w-3.5 h-3.5" />
            <span>مكتبة القوالب وسكربتات النشرات البريدية الاحترافية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            حقيبة القوالب والسكربتات التنفيذية الجاهزة
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            قوالب إيميلات ترحيبية، خطابات تواصل مع الشركات الراعية، هياكل الحقيبة الإعلامية، ورسائل تنظيف القائمة لنسخها وتطبيقها فوراً في مشروعك.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'جميع القوالب' },
          { id: 'welcome', label: 'إيميل الترحيب' },
          { id: 'sponsor-pitch', label: 'عروض الرعاة (Pitching)' },
          { id: 'media-kit', label: 'الحقيبة الإعلامية (Media Kit)' },
          { id: 're-engagement', label: 'تنظيف القائمة (Sunset)' },
          { id: 'referral', label: 'برنامج الإحالة (Referral)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTemplates.map((template) => {
          const isCopied = copiedId === template.id;
          return (
            <div
              key={template.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-7 space-y-4 hover:border-zinc-700 transition-all shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                      {template.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      {template.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(template)}
                  className="self-start sm:self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-black text-xs font-black hover:bg-emerald-400 transition-all cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95 shrink-0"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'تم النسخ بنجاح!' : 'نسخ القالب كاملاً'}</span>
                </button>
              </div>

              {/* Template Content Box */}
              <div className="relative">
                <pre className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-96">
                  {template.content}
                </pre>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
