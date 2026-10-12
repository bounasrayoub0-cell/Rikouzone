import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { OFFICIAL_CONTACT_EMAIL } from '../contact/ContactView';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Cookie,
  Shield,
  ShieldCheck,
  HardDrive,
  Radio,
  Sliders,
  ExternalLink,
  RefreshCw,
  Mail,
  Copy,
  Check,
  Home,
  FileText,
  Send,
  HelpCircle,
  Clock,
  Sparkles,
  Info,
  AlertCircle
} from 'lucide-react';

interface CookiePolicyViewProps {
  onNavigate: (tab: string) => void;
  onCopyText?: (text: string, label: string) => void;
}

/**
 * تاريخ آخر تحديث لوثيقة سياسة الكوكيز والإعلانات (قابل للتعديل بسهولة عند أي مراجعة مستقبلاً).
 */
export const COOKIE_POLICY_LAST_UPDATED = '11 أكتوبر 2026';

interface SectionItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  paragraphs: string[];
  keyPoints?: string[];
  note?: string;
}

interface CookieDictionary {
  badge: string;
  title: string;
  subtitle: string;
  breadcrumbHome: string;
  breadcrumbCookies: string;
  backToHome: string;
  lastUpdatedLabel: string;
  lastUpdatedValue: string;
  quickNavTitle: string;
  termsBtn: string;
  privacyBtn: string;
  contactBtn: string;
  copyEmailBtn: string;
  copiedEmailBtn: string;
  sendEmailDirectBtn: string;
  needClarificationTitle: string;
  needClarificationDesc: string;
  sections: SectionItem[];
  footerNote: string;
  disclaimerPill: string;
}

const cookieI18n: Record<string, CookieDictionary> = {
  ar: {
    badge: 'وثيقة الكوكيز والإعلانات والبيانات · RikouZone 2026',
    title: 'سياسة الكوكيز والإعلانات',
    subtitle: 'توضح هذه الصفحة بشفافية كيفية استخدام ملفات تعريف الارتباط (Cookies)، والتخزين المحلي في المتصفح (LocalStorage)، وشبكة إعلانات Adsterra، مع بيان خيارات التحكم المتاحة لك.',
    breadcrumbHome: 'الرئيسية',
    breadcrumbCookies: 'سياسة الكوكيز والإعلانات',
    backToHome: 'العودة إلى الرئيسية',
    lastUpdatedLabel: 'آخر تحديث:',
    lastUpdatedValue: '11 أكتوبر 2026',
    quickNavTitle: 'فهرس بنود السياسة',
    termsBtn: 'شروط الاستخدام',
    privacyBtn: 'سياسة الخصوصية',
    contactBtn: 'تواصل معنا',
    copyEmailBtn: 'نسخ البريد الرسمي',
    copiedEmailBtn: 'تم نسخ البريد!',
    sendEmailDirectBtn: 'إرسال بريد مباشر',
    needClarificationTitle: 'هل لديك استفسار حول ملفات الكوكيز أو الإعلانات؟',
    needClarificationDesc: 'نحن نؤمن بالشفافية الكاملة. يمكنك مراسلتنا في أي وقت عبر البريد المعتمد للاستفسار عن أي نقطة تقنية أو إعلانية في المنصة.',
    footerNote: 'تمت صياغة هذه السياسة لتوفير بيئة تعليمية واضحة وموثوقة تحترم خصوصية المتعلمين وصناع المحتوى.',
    disclaimerPill: 'وثيقة رسمية سارية',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'مقدمة عامة وهدف الوثيقة',
        summary: 'توضح هذه الوثيقة طبيعة التقنيات المستعملة داخل المنصة للإعلانات والتخزين المحلي.',
        paragraphs: [
          'أهلاً بك في منصة RikouZone. توضح هذه الوثيقة بشكل صريح وشامل كيفية تعامل المنصة مع ملفات تعريف الارتباط (Cookies)، والتقنيات التقنية المشابهة، والتخزين المحلي للبيانات في المتصفح (LocalStorage)، وكيفية عرض الإعلانات داخل الموقع.',
          'تهدف المنصة إلى تقديم تجربة تعليمية مفتوحة وتطبيقية في مجالات المهارات الرقمية وصناعة المحتوى، مع الالتزام التام بإطلاع الزوار والمتعلمين على الجوانب التقنية والإعلانية المرتبطة بزيارتهم دون أي ممارسات تضليلية أو جمع غير مبرر للبيانات.'
        ],
        keyPoints: [
          'توضيح شامل لجميع أدوات التخزين والإعلانات في المنصة.',
          'الالتزام بمبدأ الشفافية والوضوح في التعامل مع المتصفح والبيانات.',
          'ضمان بقاء المحتوى التعليمي متاحاً لجميع المستخدمين.'
        ]
      },
      {
        id: 'what-are-cookies',
        number: '02',
        title: 'ما هي ملفات تعريف الارتباط (Cookies)؟',
        summary: 'ملفات نصية صغيرة قد يتم تخزينها في جهازك لتذكر تفضيلات أو تنظيم عرض الخدمات.',
        paragraphs: [
          'ملفات تعريف الارتباط (Cookies) هي ملفات نصية أو كتل صغيرة من البيانات التي قد يقوم المتصفح بحفظها على جهاز المستخدم (حاسوب، هاتف محمول، أو جهاز لوحي) بناءً على طلب موقع الويب أو الخدمات البرمجية المستعملة أثناء التصفح.',
          'تُستخدم هذه الملفات عموماً لمساعدة المواقع على تذكر تفضيلات معينة (مثل اللغة أو حجم الخط)، أو منع تكرار ظهور عناصر معينة بشكل مزعج، أو المساعدة في قياس كفاءة الخدمات التقنية وعرض الإعلانات بطريقة منظمة.'
        ],
        keyPoints: [
          'ملفات نصية آمنة لا تقوم بتنفيذ برمجيات ضارة على جهازك.',
          'تستخدمها شبكات الإنترنت عموماً لتنظيم التصفح وتحسين تجربة المستخدم.',
          'يمكن للمستخدم حذفها أو حظرها بالكامل من إعدادات المتصفح في أي وقت.'
        ]
      },
      {
        id: 'advertising',
        number: '03',
        title: 'الإعلانات الحالية (Adsterra) وبيان Google AdSense',
        summary: 'نستخدم شبكة Adsterra لدعم تكاليف السيرفرات والتعليم المجاني؛ Google AdSense غير مفعل حالياً.',
        paragraphs: [
          'من أجل الاستمرار في توفير محتوى RikouZone التعليمي وحاسباته وأدواته مجاناً دون فرض اشتراكات مدفوعة، تعرض المنصة إعلانات رقمية مدعومة من شبكة الإعلانات الخارجية Adsterra.',
          'قد تستخدم شبكة Adsterra ملفات تعريف ارتباط تقنية أو معرفات رقمية مشابهة في متصفحك بهدف إدارة ظهور الإعلانات، وتفادي تكرار نفس الإعلان بشكل مستمر، وقياس عدد المشاهدات، ومكافحة النقرات الاحتيالية، وذلك وفقاً لسياسات الخصوصية المعتمدة لدى Adsterra.',
          'توضيح شفاف وحاسم: نؤكد بشكل لا لبس فيه أن RikouZone لا تستخدم Google AdSense حالياً كمزود إعلانات نشط على الموقع. كافة الوحدات الإعلانية النشطة داخل المنصة تُدار بواسطة شبكة Adsterra فقط.'
        ],
        keyPoints: [
          'الإعلانات تساهم في إبقاء المنصة مجانية ومتاحة للجميع.',
          'مزود الإعلانات Adsterra يعتمد على كوكيز تقنية مستقلة وفق سياساته.',
          'تأكيد صريح: لا يوجد استخدام نشط لشبكة Google AdSense على الموقع حالياً.'
        ],
        note: 'تنويه: المواقع والخدمات التي يُروَّج لها عبر الإعلانات هي مواقع خارجية مستقلة تخضع لسياسات وشروط مالكيها، ولا تقدم RikouZone أي ضمانات أو توصيات بخصوص محتواها أو منتجاتها.'
      },
      {
        id: 'user-controls',
        number: '04',
        title: 'خيارات المستخدم وإدارة ملفات تعريف الارتباط',
        summary: 'يمكنك التحكم في الكوكيز عبر إعدادات متصفحك؛ المنصة لا تحتوي على زر لإدارة الموافقة.',
        paragraphs: [
          'نظراً لأن منصة RikouZone نفسها لا تضع ملفات كوكيز تتبعية متطفلة على جهازك، فإن الموقع لا يضم نافذة منبثقة أو زراً داخلياً لإدارة موافقة الكوكيز (Cookie Consent Banner/Button).',
          'يحق للمستخدم التحكم الكامل في قبول أو رفض ملفات تعريف الارتباط من خلال إعدادات المتصفح الذي يستعمله (مثل Google Chrome، Mozilla Firefox، Apple Safari، أو Microsoft Edge). يمكنك حظر ملفات الكوكيز التابعة لأطراف ثالثة أو مسحها نهائياً.',
          'كما يمكنك استخدام برمجيات حجب الإعلانات المعتمدة في متصفحك دون أن يؤدي ذلك إلى حرمانك من الوصول إلى الدروس ومسارات التعلم والأدوات التفاعلية المتاحة في RikouZone.'
        ],
        keyPoints: [
          'التحكم يتم مباشرة عبر أدوات وإعدادات الأمان في متصفحك الشخصي.',
          'عدم وجود زر موافقة داخلي بالمنصة لأن RikouZone لا تتبعك ذاتياً.',
          'حرية تفعيل إضافات حجب الإعلانات دون تقييد الوصول للمحتوى التعليمي.'
        ]
      },
      {
        id: 'local-storage',
        number: '05',
        title: 'التخزين المحلي في المتصفح (LocalStorage) وأهميته',
        summary: 'تُحفظ نقاط XP والبروفايل والمسارات والدروس على جهازك محلياً فقط ولا تُرفع لسيرفر خارجي.',
        paragraphs: [
          'تعتمد RikouZone على تقنية التخزين المحلي في المتصفح (Web LocalStorage) لحفظ تقدمك التعليمي دون الحاجة إلى تسجيل دخول أو إنشاء حساب بكلمة مرور وقاعدة بيانات سحابية.',
          'البيانات التي تُحفظ محلياً في متصفحك تشمل: صورة الملف الشخصي الرمزية، الاسم المستعار، نقاط الخبرة (XP)، المستوى الحالي، قائمة المسارات المحفوظة (Saved Items)، التحديات والدروس التي أكملتها، وتفضيلات المظهر (داكن/فاتح) واللغة المختارة.',
          'تنبيه مهم جداً: هذه البيانات مخزنة حصرياً على جهازك نفسه. إذا قمت بمسح بيانات المتصفح (Clear Cache/Storage) أو قمت بفتح الموقع من جهاز آخر أو متصفح مختلف، فلن تنتقل هذه البيانات تلقائياً وقد تفقد تقدمك ونقاط XP المحرزة.'
        ],
        keyPoints: [
          'حفظ البروفايل، نقاط XP، والدروس محلياً فقط على جهازك (LocalStorage).',
          'عدم إرسال بيانات تقدمك إلى أي خادم خارجي أو قاعدة بيانات مركزية.',
          'تنبيه: مسح بيانات المتصفح أو تغيير الجهاز يؤدي إلى إعادة تعيين التقدم المحلي.'
        ],
        note: 'أمان البيانات المحلية: لا يمكن لأي موقع خارجي الوصول إلى بيانات RikouZone المحفوظة في LocalStorage بفضل نظام أمان المتصفح (Same-Origin Policy).'
      },
      {
        id: 'external-links',
        number: '06',
        title: 'الروابط الخارجية والمواقع المستقلة',
        summary: 'الروابط الخارجية والإعلانات تقود لمواقع تتبع سياسات كوكيز وخصوصية مستقلة عن RikouZone.',
        paragraphs: [
          'قد تحتوي صفحات RikouZone على روابط خارجية تحيل إلى أدوات رقمية، مقالات ومراجع، أو منصات عمل حرة، بالإضافة إلى الروابط التي قد تظهر داخل الإعلانات المعروضة من شبكة Adsterra.',
          'بمجرد النقر على أي رابط خارجي ومغادرة منصة RikouZone، فإنك تخضع لسياسات الاستخدام والخصوصية وملفات تعريف الارتباط الخاصة بذلك الموقع المستقل. لا تملك المنصة أي رقابة على كيفية تعامل تلك المواقع مع بياناتك أو كوكيز التصفح.'
        ],
        keyPoints: [
          'الروابط الخارجية تخضع لشروط وسياسات الخصوصية لأصحابها ومقدميها.',
          'RikouZone غير مسؤولة عن ملفات الكوكيز أو الممارسات التتبعية في المواقع الخارجية.',
          'ننصح دائماً بمراجعة سياسات أي موقع خارجي تقوم بزيارته.'
        ]
      },
      {
        id: 'updates-and-contact',
        number: '07',
        title: 'تحديثات السياسة ووسائل التواصل المعتمدة',
        summary: 'قد نقوم بتحديث هذه السياسة عند إضافة تقنيات جديدة أو مزودي إعلانات؛ البريد الرسمي متاح دائماً.',
        paragraphs: [
          'نحتفظ بالحق في تحديث وتعديل سياسة الكوكيز والإعلانات في أي وقت، لا سيما عند إضافة مزود إعلانات جديد، أو تفعيل تقنيات تقنية مستجدة، أو لمواكبة التحديثات التنظيمية والقانونية الرقمية.',
          'سيتم تحديث تاريخ «آخر تحديث» في أعلى وأسفل هذه الصفحة كلما أُجري أي تعديل جوهري. استمرار استخدامك للمنصة بعد إجراء التعديلات يعد بمثابة اطلاعك على السياسة المحدثة.',
          `إذا كان لديك أي سؤال أو استفسار أو ملاحظة بشأن ملفات تعريف الارتباط أو الإعلانات داخل RikouZone، يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني الرسمي المعتمد: ${OFFICIAL_CONTACT_EMAIL} أو عبر صفحة «اتصل بنا».`
        ],
        keyPoints: [
          'تحديث دوري وشفاف يعكس أحدث التقنيات المستخدمة في المنصة.',
          'تاريخ آخر تحديث معلن دائماً في أعلى وأسفل الصفحة.',
          `وسيلة تواصل رسمية معتمدة ومباشرة: ${OFFICIAL_CONTACT_EMAIL}`
        ]
      }
    ]
  },
  ary: {
    badge: 'وثيقة الكوكيز والإشهارات والبيانات · RikouZone 2026',
    title: 'سياسة الكوكيز والإعلانات',
    subtitle: 'كنشرحو ليك بكل وضوح كيفاش RikouZone كتخدم بملفات الكوكيز (Cookies)، والتخزين المحلي فالمتصفح (LocalStorage)، وشبكة الإعلانات Adsterra، مع الاختيارات اللي عندك باش تحكم فيها.',
    breadcrumbHome: 'الرئيسية',
    breadcrumbCookies: 'سياسة الكوكيز والإعلانات',
    backToHome: 'الرجوع للرئيسية',
    lastUpdatedLabel: 'آخر تعديل:',
    lastUpdatedValue: '11 أكتوبر 2026',
    quickNavTitle: 'فهرس بنود السياسة',
    termsBtn: 'شروط الاستخدام',
    privacyBtn: 'سياسة الخصوصية',
    contactBtn: 'تواصل معانا',
    copyEmailBtn: 'نسخ الإيميل الرسمي',
    copiedEmailBtn: 'تكوبا الإيميل!',
    sendEmailDirectBtn: 'صيفط إيميل ديريكت',
    needClarificationTitle: 'عندك شي تساؤل على الكوكيز أو الإعلانات؟',
    needClarificationDesc: 'حنا دايرين الشفافية أول حاجة. صيفط لينا وقتما بغيتي على الإيميل الرسمي وغادي نجاوبوك على أي استفسار تقني أو إشهاري.',
    footerNote: 'هاد السياسة مصوبة باش توفر بيئة تعليمية نقية وموثوقة كتحترم خصوصية المتعلمين وصناع المحتوى فالمغرب والعالم.',
    disclaimerPill: 'وثيقة رسمية سارية',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'مقدمة عامة والهدف من هاد الصفحة',
        summary: 'كنشرحو فيها التقنيات اللي كتخدم بها المنصة بالنسبة للإشهار والتخزين فالمتصفح.',
        paragraphs: [
          'مرحباً بك فمنصة RikouZone. هاد الصفحة كتوضح ليك بنيشان وبكل شفافية كيفاش كيتعاملو ملفات تعريف الارتباط (Cookies)، والتخزين فالمتصفح (LocalStorage)، وطريقة عرض الإعلانات فالموقع.',
          'الهدف ديالنا هو نعلموك مهارات رقمية وتطبيقية فصناعة المحتوى والعمل أونلاين مجاناً، مع الالتزام بأنك تكون عارف كل صغيرة وكبيرة على الجانب التقني فالتصفح ديالك بلا غش وبلا جميع بيانات بلا فايدة.'
        ],
        keyPoints: [
          'توضيح كاع أدوات التخزين والإشهار اللي فالموقع.',
          'الشفافية الكاملة فالتعامل مع المتصفح ديالك.',
          'الدروس والمسارات كتبقى مفتوحة ومجانية للجميع.'
        ]
      },
      {
        id: 'what-are-cookies',
        number: '02',
        title: 'شنو هما ملفات الكوكيز (Cookies)؟',
        summary: 'ملفات صغيورة كيحفظها المتصفح ديالك باش يعقل على الإعدادات أو ينظم الإشهارات.',
        paragraphs: [
          'ملفات الكوكيز (Cookies) هي ملفات نصية صغيرة كيقدر المتصفح ديالك يخزنها فالتلفون أو البيسي ملي كتدخل لموقع، باش تساعد السيرفر يعقل على شي حوايج محددة فالتصفح.',
          'كتستعمل عموماً باش المواقع تعقل على اللغة مثلاً، أو باش ما يتعاودش نفس الإشهار بزاف ديال المرات قدامك، وكتعاون فقياس عدد الزوار بلا ما تضر الجهاز ديالك نهائياً.'
        ],
        keyPoints: [
          'ملفات نصية عادية ما فيهاش فيروسات ولا برامج خايبة.',
          'كتستعملها أغلب المواقع فالعالم باش تنظم التصفح.',
          'تقدر تمسحها ولا تبلوكيها من إعدادات المتصفح ديالك وقتما بغيتي.'
        ]
      },
      {
        id: 'advertising',
        number: '03',
        title: 'الإعلانات الحالية (Adsterra) وحقيقة Google AdSense',
        summary: 'كنستعملو Adsterra باش نخلصو السيرفرات والتعليم يبقى فابور؛ Google AdSense ما مفعلاش دابا.',
        paragraphs: [
          'باش نخليو محتوى RikouZone فابور ومتاح للجميع بلا اشتراكات شهرية، كنعرضو إعلانات من شبكة Adsterra الخارجية.',
          'شبكة Adsterra كتقدر تستعمل كوكيز تقنية فالمتصفح باش تدير القياس ديال الإعلانات وتمنع التكرار والنقرات الوهمية، على حساب سياسة الخصوصية ديالهم.',
          'توضيح صريح: كنأكدو بكل وضوح أن منصة RikouZone ما كتستعملش Google AdSense حالياً. كاع البانيرات والإشهارات اللي كيبانو دابا مسيرين فقط من طرف Adsterra.'
        ],
        keyPoints: [
          'الإشهارات كتعاون نخليو المنصة فابور للجميع.',
          'شبكة Adsterra كتستعمل كوكيز تقنية خاصة بيها.',
          'تأكيد صريح: Google AdSense ما مفعلاش فالموقع حالياً.'
        ],
        note: 'تنبيه: المواقع اللي كيعلنو عليها راها مواقع خارجية مستقلة، وRikouZone ما كتعطيش ضمانات على المنتجات ديالهم.'
      },
      {
        id: 'user-controls',
        number: '04',
        title: 'خيارات التحكم اللي عندك فالمتصفح',
        summary: 'تقدر تحكم فكاع الكوكيز من إعدادات المتصفح ديالك؛ الموقع ما فيهش بوطونة داخلية للموافقة.',
        paragraphs: [
          'حيت RikouZone براسها ما كتحطش كوكيز ديال التجسس أو البيع والشراء فالبيانات، الموقع ما فيهش بوطونة أو بانير داخلي ديال قبول الكوكيز (Cookie Banner).',
          'التحكم كامل كيبقى فيدك نتا من إعدادات المتصفح ديالك (بحال Chrome أو Safari أو Firefox)، تقدر تمسح الكوكيز أو تبلوكي كوكيز الأطراف الثالثة.',
          'تقدر تخدم حتى بمانع الإعلانات (AdBlock) يلا بغيتي، وما غاديش تحرم من الدروس والمسارات والحاسبات ديال RikouZone.'
        ],
        keyPoints: [
          'التحكم كيكون من المتصفح ديالك ديريكت.',
          'ما كايناش بوطونة موافقة فالموقع حيت ما كنتتبعوش المستخدمين داخلياً.',
          'حرية استعمال مانع الإشهار بلا ما يتبلوكا المحتوى التعليمي.'
        ]
      },
      {
        id: 'local-storage',
        number: '05',
        title: 'التخزين المحلي فالمتصفح (LocalStorage)',
        summary: 'نقاط XP والبروفايل والمسارات والدروس كيبقاو مخزنين فجهازك فقط وما كيمشيوش لسيرفر.',
        paragraphs: [
          'منصة RikouZone كتخدم بتقنية التخزين المحلي (LocalStorage) فالمتصفح باش تسجل التقدم ديالك بلا ما تحتاج تصاوب كونط بكلمة سر ولا نسجلو إيميلك فقاعدة بيانات.',
          'البيانات اللي كتسجل فجهازك هي: تصويرة البروفايل، السمية، نقاط XP، المستوى، المسارات المحفوظة، التحديات اللي ساليتي، واللغة والمظهر (Dark/Light).',
          'رد بالك مزيان: هاد البيانات راها فجهازك بوحدو. يلا مسحتي بيانات المتصفح (Clear Cache/Storage) أو بدلتي التيليفون أو البيسي، راه غادي يرجع التقدم للصفر حيت ما كاينش حساب سحابي خارجي.'
        ],
        keyPoints: [
          'البيانات كاع مخزنة فجهازك الشخصي فقط (LocalStorage).',
          'ما كيتصيفط والو لسيرفرات خارجية أو قواعد بيانات.',
          'مسح بيانات المتصفح غادي يمسح نقاط XP والدروس المحفوظة.'
        ],
        note: 'أمان البيانات: حتى موقع آخر ما يقدر يقرأ بيانات RikouZone اللي مسجلة فالمتصفح ديالك بفضل حماية المتصفحات (Same-Origin).'
      },
      {
        id: 'external-links',
        number: '06',
        title: 'الروابط الخارجية والمواقع الأخرى',
        summary: 'الروابط اللي كتخرجك من الموقع والإعلانات كتديك لمواقع عندهم سياساتهم الخاصة.',
        paragraphs: [
          'تقدر تلقى فصفحات RikouZone روابط لمواقع خارجية، أدوات رقمية، أو لينكات ديال الإشهارات اللي كتبينها Adsterra.',
          'ملي كتكليكي وتخرج من RikouZone، كتولي خاضع لسياسة الخصوصية والكوكيز ديال داك الموقع المستقل. المنصة ديالنا ما كتحكمش فداكشي اللي كيديروه مواقع أخرى.'
        ],
        keyPoints: [
          'المواقع الخارجية مسؤولة بوحدها على السياسات ديالها.',
          'RikouZone ما عندهاش يد فكوكيز المواقع الأخرى.',
          'ديما قرا سياسة أي موقع خارجي دخلتي ليه.'
        ]
      },
      {
        id: 'updates-and-contact',
        number: '07',
        title: 'تحديث السياسة وطرق التواصل الرسمية',
        summary: 'كنبدلو السياسة يلا زدنا شي شبكة إشهار ولا تقنية جديدة، والإيميل الرسمي راه واجد لأي سؤال.',
        paragraphs: [
          'عندنا الحق نبدلو هاد السياسة يلا زدنا شي مزود إعلاني جديد أو تبدلات طريقة خدمة الموقع تقنياً أو جات قوانين جديدة.',
          'تاريخ آخر تعديل ديما كيكون باين فالفوق والتحت ديال هاد الصفحة. يلا كملتي كتصفح الموقع من بعد التعديل، كيعني أنك مطلع على هاد التحديث.',
          `يلا كان عندك أي سؤال على الكوكيز أو الإعلانات فـ RikouZone، صيفط لينا ديريكت على الإيميل الرسمي: ${OFFICIAL_CONTACT_EMAIL} أو دوز لصفحة «تواصل معانا».`
        ],
        keyPoints: [
          'تحديث مستمر وشفاف مع أي جديد تقني فالموقع.',
          'تاريخ آخر مراجعة باين فالموقع.',
          `الإيميل الرسمي للتواصل: ${OFFICIAL_CONTACT_EMAIL}`
        ]
      }
    ]
  },
  en: {
    badge: 'Cookies, Ads & Local Data Policy · RikouZone 2026',
    title: 'Cookie & Advertising Policy',
    subtitle: 'This policy explains transparently how RikouZone uses cookies, browser local storage, and the Adsterra advertising network, along with the controls available to you.',
    breadcrumbHome: 'Home',
    breadcrumbCookies: 'Cookie & Ad Policy',
    backToHome: 'Back to Home',
    lastUpdatedLabel: 'Last updated:',
    lastUpdatedValue: 'October 11, 2026',
    quickNavTitle: 'Policy Navigation',
    termsBtn: 'Terms of Use',
    privacyBtn: 'Privacy Policy',
    contactBtn: 'Contact Us',
    copyEmailBtn: 'Copy Official Email',
    copiedEmailBtn: 'Email Copied!',
    sendEmailDirectBtn: 'Send Direct Email',
    needClarificationTitle: 'Have questions about cookies or ads?',
    needClarificationDesc: 'We believe in full transparency. Feel free to reach out via our official email for any technical or advertising clarification.',
    footerNote: 'This policy is designed to maintain a transparent, safe, and learner-first environment across all RikouZone programs.',
    disclaimerPill: 'Official Active Policy',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introduction & Scope',
        summary: 'Overview of technologies used for advertising, storage, and platform operations.',
        paragraphs: [
          'Welcome to RikouZone. This document clearly and comprehensively outlines how our digital platform handles cookies, browser-level local storage (LocalStorage), and third-party advertising services.',
          'RikouZone provides accessible digital education, practical freelancing roadmaps, and content creation frameworks. We are committed to transparency regarding how web technologies interact with your device.'
        ],
        keyPoints: [
          'Clear breakdown of all storage and advertising technologies.',
          'Commitment to privacy and clarity without deceptive trackers.',
          'Educational material remains fully accessible to all learners.'
        ]
      },
      {
        id: 'what-are-cookies',
        number: '02',
        title: 'What Are Cookies?',
        summary: 'Small text files saved on your device to store preferences and manage service delivery.',
        paragraphs: [
          'Cookies are small text files or data snippets stored in your browser when you visit a website or interact with online services.',
          'They are commonly used to remember user preferences (such as language or visual theme), prevent redundant ad displays, and help service providers measure delivery efficiency.'
        ],
        keyPoints: [
          'Standard safe text files that do not execute malware on your machine.',
          'Widely used across the internet to improve user experience.',
          'Can be inspected, deleted, or blocked via your browser settings anytime.'
        ]
      },
      {
        id: 'advertising',
        number: '03',
        title: 'Current Advertising (Adsterra) & Google AdSense Notice',
        summary: 'We use Adsterra to fund free hosting; Google AdSense is currently not active on RikouZone.',
        paragraphs: [
          'To keep all educational materials, calculators, and exercises 100% free without charging subscription fees, RikouZone displays advertising from the Adsterra ad network.',
          'Adsterra may deploy technical cookies or identifiers to manage ad frequency, prevent click fraud, and evaluate delivery performance in accordance with its independent privacy policy.',
          'Clear Transparency Statement: RikouZone explicitly confirms that Google AdSense is NOT currently active on our platform. All active banners and ad displays are managed solely via Adsterra.'
        ],
        keyPoints: [
          'Advertising revenue keeps learning open and free for everyone.',
          'Adsterra uses isolated technical cookies under its own policies.',
          'Confirmed: Google AdSense is not currently active on RikouZone.'
        ],
        note: 'Notice: Third-party products or services advertised in banners are independent; RikouZone does not endorse or guarantee third-party offers.'
      },
      {
        id: 'user-controls',
        number: '04',
        title: 'User Choices & Cookie Controls',
        summary: 'Manage cookies through browser settings; no in-site consent button is present.',
        paragraphs: [
          'Because RikouZone does not deploy first-party tracking or profile-building cookies, our platform does not display an in-site cookie consent banner or button.',
          'You retain full authority to accept, decline, or delete cookies directly through your browser configuration (e.g., Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge).',
          'You may also utilize ad-blocking extensions without losing access to our educational content, calculators, or practice quizzes.'
        ],
        keyPoints: [
          'Cookie control is handled through your browser preferences.',
          'No internal consent button exists because RikouZone does not track users internally.',
          'Ad-blockers are tolerated without gating educational material.'
        ]
      },
      {
        id: 'local-storage',
        number: '05',
        title: 'Browser Local Storage (LocalStorage)',
        summary: 'Your avatar, XP, bookmarks, and completed lessons stay on your device only.',
        paragraphs: [
          'RikouZone leverages browser LocalStorage rather than centralized cloud accounts to store your learning progress smoothly without requiring passwords or personal data.',
          'Locally stored items include: profile avatar, nickname, XP points, user level, bookmarked career paths (Saved Items), completed lesson checklists, and theme/language choices.',
          'Crucial Warning: This data resides strictly on your physical device. Clearing your browser data (cache/cookies) or accessing the platform from a different device/browser will reset your local progress, as no central database sync exists.'
        ],
        keyPoints: [
          'Profile, XP, and lesson milestones stored locally on your device only.',
          'Zero transmission of your progress data to central tracking servers.',
          'Clearing browser data or switching devices resets local progress.'
        ],
        note: 'Data Isolation: Browsers enforce the Same-Origin Policy, preventing other external websites from accessing RikouZone local storage.'
      },
      {
        id: 'external-links',
        number: '06',
        title: 'External Links & Third Parties',
        summary: 'External tool links and ad landing pages are governed by their respective policies.',
        paragraphs: [
          'RikouZone contains external references to freelance platforms, tools, and learning resources, as well as links in third-party advertisements.',
          'Once you navigate away from RikouZone, the terms and cookie policies of the destination website apply. RikouZone exerts no control over external tracking practices.'
        ],
        keyPoints: [
          'External sites maintain their own independent terms and cookie policies.',
          'RikouZone is not responsible for third-party cookie practices.',
          'We recommend reviewing privacy statements on any linked service.'
        ]
      },
      {
        id: 'updates-and-contact',
        number: '07',
        title: 'Policy Updates & Official Contact',
        summary: 'Updates occur when ad partners or features change; reach out anytime via email.',
        paragraphs: [
          'We reserve the right to amend this policy if we onboard new advertising providers, adopt new browser features, or comply with evolving legal requirements.',
          'The "Last updated" date at the top and bottom of this page reflects the most recent revision. Continued use of the platform denotes acknowledgment of updates.',
          `For questions, feedback, or inquiries regarding cookies or ads, contact us directly at ${OFFICIAL_CONTACT_EMAIL} or via our Contact Us view.`
        ],
        keyPoints: [
          'Regular policy revisions matching platform capabilities.',
          'Last-updated timestamp clearly shown on the page.',
          `Official contact channel: ${OFFICIAL_CONTACT_EMAIL}`
        ]
      }
    ]
  },
  fr: {
    badge: 'Politique des cookies, annonces & stockage · RikouZone 2026',
    title: 'Politique des cookies & publicités',
    subtitle: 'Cette politique détaille en toute transparence l’usage des cookies, du stockage local du navigateur (LocalStorage) et du réseau publicitaire Adsterra, ainsi que vos options de contrôle.',
    breadcrumbHome: 'Accueil',
    breadcrumbCookies: 'Politique cookies & annonces',
    backToHome: 'Retour à l’accueil',
    lastUpdatedLabel: 'Dernière mise à jour :',
    lastUpdatedValue: '11 octobre 2026',
    quickNavTitle: 'Sommaire de la politique',
    termsBtn: "Conditions d'utilisation",
    privacyBtn: 'Politique de confidentialité',
    contactBtn: 'Contactez-nous',
    copyEmailBtn: 'Copier l’e-mail officiel',
    copiedEmailBtn: 'E-mail copié !',
    sendEmailDirectBtn: 'Envoyer un e-mail direct',
    needClarificationTitle: 'Une question sur les cookies ou annonces ?',
    needClarificationDesc: 'La transparence est notre engagement. Écrivez-nous à notre adresse officielle pour toute précision technique.',
    footerNote: 'Cette politique garantit un espace d’apprentissage transparent, sécurisé et respectueux de la vie privée.',
    disclaimerPill: 'Document officiel en vigueur',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introduction et champ d’application',
        summary: 'Présentation des technologies employées pour l’affichage des annonces et le stockage local.',
        paragraphs: [
          'Bienvenue sur RikouZone. Ce document expose clairement le fonctionnement des cookies, du stockage local (LocalStorage) et des services publicitaires sur notre plateforme.',
          'Notre mission est de rendre les compétences numériques accessibles à tous, tout en garantissant une totale clarté sur les technologies utilisées.'
        ],
        keyPoints: [
          'Explication complète des technologies de stockage et de publicité.',
          'Engagement de transparence sans traçage intrusif.',
          'Accès libre et permanent aux formations pour tous.'
        ]
      },
      {
        id: 'what-are-cookies',
        number: '02',
        title: 'Qu’est-ce qu’un cookie ?',
        summary: 'De petits fichiers texte conservés sur votre appareil pour gérer les préférences et l’affichage.',
        paragraphs: [
          'Les cookies sont de petits fichiers texte déposés sur votre terminal (ordinateur, smartphone, tablette) lors de la consultation d’un site web.',
          'Ils servent généralement à mémoriser des préférences d’affichage, à éviter la répétition d’annonces identiques et à assurer la bonne distribution des services techniques.'
        ],
        keyPoints: [
          'Fichiers texte inoffensifs ne contenant aucun code malveillant.',
          'Standards du web pour améliorer la fluidité de navigation.',
          'Modifiables, bloquables et effaçables dans votre navigateur à tout moment.'
        ]
      },
      {
        id: 'advertising',
        number: '03',
        title: 'Publicités actuelles (Adsterra) et précision Google AdSense',
        summary: 'Diffusion d’annonces via Adsterra pour financer l’hébergement ; Google AdSense n’est pas actif.',
        paragraphs: [
          'Pour maintenir l’intégralité des contenus de RikouZone en accès gratuit sans abonnement, nous diffusons des annonces via le réseau Adsterra.',
          'Adsterra peut utiliser des cookies techniques pour gérer la répétition des bannières, prévenir la fraude au clic et mesurer la performance publicitaire.',
          'Précision essentielle de transparence : RikouZone confirme expressément que Google AdSense n’est pas actif actuellement sur le site. Les bannières affichées proviennent exclusivement d’Adsterra.'
        ],
        keyPoints: [
          'Les annonces financent l’accès gratuit à toutes les formations.',
          'Adsterra gère des cookies techniques selon sa propre politique.',
          'Confirmation : Google AdSense n’est pas activé sur le site.'
        ],
        note: 'Note : Les produits et services tiers promus dans les bannières relèvent de la seule responsabilité de leurs éditeurs respectifs.'
      },
      {
        id: 'user-controls',
        number: '04',
        title: 'Vos choix et gestion des cookies',
        summary: 'Contrôlez les cookies dans les paramètres de votre navigateur ; aucun bouton de consentement interne.',
        paragraphs: [
          'RikouZone ne déposant pas de cookies de traçage interne intrusifs, la plateforme ne comporte pas de bandeau ni de bouton interne de gestion du consentement.',
          'Vous pouvez à tout moment autoriser, refuser ou supprimer les cookies directement depuis les options de votre navigateur (Chrome, Firefox, Safari, Edge).',
          'L’usage de bloqueurs de publicités est toléré et ne bloque pas l’accès à nos modules de formation.'
        ],
        keyPoints: [
          'Gestion directe via les paramètres de sécurité de votre navigateur.',
          'Pas de bouton interne car RikouZone ne trace pas les profils en interne.',
          'Bloqueurs de publicités compatibles avec la consultation des cours.'
        ]
      },
      {
        id: 'local-storage',
        number: '05',
        title: 'Stockage local du navigateur (LocalStorage)',
        summary: 'Vos points XP, avatar, favoris et progression restent sur votre appareil sans serveur central.',
        paragraphs: [
          'RikouZone utilise la mémoire locale (LocalStorage) pour sauvegarder votre progression sans exiger de compte ni de mot de passe en ligne.',
          'Sont stockés sur votre appareil : avatar, pseudo, points XP, niveau, parcours sauvegardés, cours terminés et préférences de thème/langue.',
          'Avertissement important : Ces données sont exclusivement hébergées sur votre terminal. Vider le cache du navigateur ou changer d’appareil réinitialisera votre progression.'
        ],
        keyPoints: [
          'Sauvegarde locale sur votre appareil sans synchronisation sur serveur.',
          'Aucune transmission de progression à des bases de données distantes.',
          'La suppression des données de navigation remet la progression à zéro.'
        ],
        note: 'Sécurité : Le principe Same-Origin des navigateurs empêche tout site tiers d’accéder aux données stockées par RikouZone.'
      },
      {
        id: 'external-links',
        number: '06',
        title: 'Liens externes et tiers',
        summary: 'Les liens vers des outils ou des annonces sont régis par les politiques des sites cibles.',
        paragraphs: [
          'RikouZone peut renvoyer vers des outils externes, ressources et annonces partenaires.',
          'Une fois sur un site tiers, ses propres conditions et politiques de cookies s’appliquent. RikouZone décline toute responsabilité quant aux pratiques externes.'
        ],
        keyPoints: [
          'Les sites externes appliquent leurs propres règles de confidentialité.',
          'RikouZone ne contrôle pas les cookies déposés par d’autres plateformes.',
          'Consultez les mentions légales des sites que vous visitez.'
        ]
      },
      {
        id: 'updates-and-contact',
        number: '07',
        title: 'Mises à jour et contact officiel',
        summary: 'Évolution de la politique en cas d’ajout de régies ; contact officiel disponible à tout moment.',
        paragraphs: [
          'Cette politique peut être actualisée lors de l’intégration de nouveaux partenaires publicitaires ou d’évolutions techniques.',
          'La date de dernière mise à jour est mentionnée sur cette page.',
          `Pour toute question relative aux cookies ou annonces, écrivez à ${OFFICIAL_CONTACT_EMAIL} ou utilisez notre page Contact.`
        ],
        keyPoints: [
          'Mise à jour régulière conforme aux évolutions du site.',
          'Date de révision toujours accessible.',
          `Canal officiel : ${OFFICIAL_CONTACT_EMAIL}`
        ]
      }
    ]
  },
  es: {
    badge: 'Política de cookies, anuncios y almacenamiento · RikouZone 2026',
    title: 'Política de cookies y publicidad',
    subtitle: 'Explicamos de forma transparente cómo RikouZone utiliza cookies, almacenamiento local en el navegador (LocalStorage) y la red publicitaria Adsterra, junto con tus opciones de control.',
    breadcrumbHome: 'Inicio',
    breadcrumbCookies: 'Política de cookies y anuncios',
    backToHome: 'Volver al Inicio',
    lastUpdatedLabel: 'Última actualización:',
    lastUpdatedValue: '11 de octubre de 2026',
    quickNavTitle: 'Índice de la política',
    termsBtn: 'Términos de uso',
    privacyBtn: 'Política de privacidad',
    contactBtn: 'Contáctanos',
    copyEmailBtn: 'Copiar correo oficial',
    copiedEmailBtn: '¡Correo copiado!',
    sendEmailDirectBtn: 'Enviar correo directo',
    needClarificationTitle: '¿Preguntas sobre cookies o anuncios?',
    needClarificationDesc: 'Apostamos por la total transparencia. Contáctanos por correo para cualquier consulta técnica o publicitaria.',
    footerNote: 'Esta política busca mantener un espacio formativo claro, seguro y respetuoso con la privacidad del usuario.',
    disclaimerPill: 'Documento oficial vigente',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introducción y propósito',
        summary: 'Detalles sobre las tecnologías aplicadas para la publicidad y el almacenamiento local.',
        paragraphs: [
          'Bienvenido a RikouZone. Este documento detalla cómo nuestra plataforma gestiona las cookies, el almacenamiento local en tu navegador y los servicios publicitarios externos.',
          'Nuestro objetivo es brindar educación digital práctica y gratuita, garantizando al mismo tiempo claridad sobre los procesos técnicos.'
        ],
        keyPoints: [
          'Explicación clara de almacenamiento y publicidad.',
          'Compromiso con la privacidad sin rastreo encubierto.',
          'Acceso abierto y gratuito a todo el material educativo.'
        ]
      },
      {
        id: 'what-are-cookies',
        number: '02',
        title: '¿Qué son las cookies?',
        summary: 'Archivos de texto que se guardan en tu dispositivo para recordar ajustes y gestionar contenidos.',
        paragraphs: [
          'Las cookies son pequeños archivos de texto que el navegador almacena en tu dispositivo al visitar una página web.',
          'Se utilizan habitualmente para recordar preferencias de navegación, evitar la repetición excesiva de anuncios y evaluar el rendimiento técnico de los servicios.'
        ],
        keyPoints: [
          'Archivos seguros que no ejecutan código perjudicial en tu equipo.',
          'Estándar habitual en internet para optimizar la experiencia de navegación.',
          'Se pueden consultar, bloquear o borrar desde los ajustes de tu navegador.'
        ]
      },
      {
        id: 'advertising',
        number: '03',
        title: 'Publicidad actual (Adsterra) y aviso sobre Google AdSense',
        summary: 'Mostramos anuncios mediante Adsterra para sostener los servidores; Google AdSense no está activo.',
        paragraphs: [
          'Para mantener las herramientas y cursos de RikouZone accesibles sin coste ni suscripciones, mostramos publicidad de la red Adsterra.',
          'Adsterra puede emplear cookies técnicas para gestionar la frecuencia de los anuncios, prevenir el fraude de clics y medir impresiones según su propia política.',
          'Aviso de transparencia: Confirmamos expresamente que Google AdSense NO está activo actualmente en RikouZone. La publicidad exhibida proviene exclusivamente de Adsterra.'
        ],
        keyPoints: [
          'Los anuncios sostienen la gratuidad de la plataforma formativa.',
          'Adsterra gestiona cookies técnicas de forma independiente.',
          'Confirmado: Google AdSense no se encuentra habilitado en el sitio.'
        ],
        note: 'Aviso: Los servicios y productos publicitados en los anuncios pertenecen a terceros ajenos a RikouZone.'
      },
      {
        id: 'user-controls',
        number: '04',
        title: 'Opciones del usuario y control de cookies',
        summary: 'Administra las cookies en tu navegador; no hay botón interno de consentimiento en la web.',
        paragraphs: [
          'Dado que RikouZone no instala cookies invasivas de perfilado, el sitio no incluye una ventana emergente ni botón interno de gestión de consentimiento.',
          'Tienes pleno control para autorizar, rechazar o eliminar cookies desde los ajustes de tu navegador (Chrome, Safari, Firefox, Edge).',
          'También puedes utilizar bloqueadores de publicidad sin que ello bloquee tu acceso a los cursos y calculadoras de RikouZone.'
        ],
        keyPoints: [
          'Control total desde la configuración de privacidad de tu navegador.',
          'Sin botón interno de consentimiento porque RikouZone no te rastrea internamente.',
          'Compatibilidad con bloqueadores de anuncios para acceder al contenido.'
        ]
      },
      {
        id: 'local-storage',
        number: '05',
        title: 'Almacenamiento local del navegador (LocalStorage)',
        summary: 'Tus puntos XP, avatar, rutas y progreso se guardan solo en tu dispositivo.',
        paragraphs: [
          'RikouZone utiliza LocalStorage en tu navegador para guardar tu progreso formativo sin requerir cuentas con contraseñas en servidores remotos.',
          'Los datos guardados en tu equipo abarcan: avatar, apodo, puntos XP, nivel, rutas guardadas, lecciones completadas y ajustes de idioma y tema.',
          'Advertencia crucial: Esta información permanece únicamente en tu dispositivo. Si borras los datos de navegación o cambias de terminal, tu progreso se reiniciará.'
        ],
        keyPoints: [
          'Progreso y XP guardados localmente en tu equipo sin envío a la nube.',
          'No se transfieren datos a bases de datos centrales de seguimiento.',
          'Borrar datos del navegador restablece el progreso acumulado.'
        ],
        note: 'Aislamiento: Las normas de seguridad del navegador impiden que sitios externos lean el LocalStorage de RikouZone.'
      },
      {
        id: 'external-links',
        number: '06',
        title: 'Enlaces externos y terceros',
        summary: 'Los enlaces a otras páginas o anuncios se rigen por las políticas de sus propietarios.',
        paragraphs: [
          'RikouZone incluye enlaces a herramientas digitales, recursos y páginas vinculadas a anuncios de Adsterra.',
          'Al salir de nuestra plataforma, quedas sujeto a las políticas del sitio de destino. RikouZone no tiene control sobre las prácticas externas.'
        ],
        keyPoints: [
          'Los sitios externos cuentan con sus propias condiciones y cookies.',
          'RikouZone no se responsabiliza de cookies de terceros ajenos.',
          'Recomendamos leer las políticas de privacidad de los sitios enlazados.'
        ]
      },
      {
        id: 'updates-and-contact',
        number: '07',
        title: 'Actualizaciones de la política y contacto oficial',
        summary: 'Actualizamos este texto si añadimos redes o funciones; contacto disponible vía correo.',
        paragraphs: [
          'Podemos actualizar esta política si incorporamos nuevos proveedores publicitarios o adaptamos la tecnología del sitio.',
          'La fecha de última actualización figura siempre en esta página.',
          `Para cualquier duda sobre cookies o publicidad, escríbenos a ${OFFICIAL_CONTACT_EMAIL} o visita la sección de Contacto.`
        ],
        keyPoints: [
          'Actualizaciones periódicas y transparentes.',
          'Fecha de revisión siempre visible.',
          `Canal oficial: ${OFFICIAL_CONTACT_EMAIL}`
        ]
      }
    ]
  },
  de: {
    badge: 'Cookie-, Werbe- & Speicherrichtlinie · RikouZone 2026',
    title: 'Cookie- & Werberichtlinie',
    subtitle: 'Hier erläutern wir transparent den Einsatz von Cookies, Browser-LocalStorage und dem Adsterra-Werbenetzwerk sowie Ihre Kontrollmöglichkeiten.',
    breadcrumbHome: 'Startseite',
    breadcrumbCookies: 'Cookie- & Werberichtlinie',
    backToHome: 'Zurück zur Startseite',
    lastUpdatedLabel: 'Zuletzt aktualisiert:',
    lastUpdatedValue: '11. Oktober 2026',
    quickNavTitle: 'Richtlinien-Navigation',
    termsBtn: 'Nutzungsbedingungen',
    privacyBtn: 'Datenschutzerklärung',
    contactBtn: 'Kontakt aufnehmen',
    copyEmailBtn: 'Offizielle E-Mail kopieren',
    copiedEmailBtn: 'E-Mail kopiert!',
    sendEmailDirectBtn: 'Direkte E-Mail senden',
    needClarificationTitle: 'Fragen zu Cookies oder Werbung?',
    needClarificationDesc: 'Transparenz steht an erster Stelle. Kontaktieren Sie uns gerne bei technischen Fragen per E-Mail.',
    footerNote: 'Diese Richtlinie schafft ein transparentes, sicheres und nutzerfreundliches Lernumfeld.',
    disclaimerPill: 'Offizielles Dokument',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Einführung und Geltungsbereich',
        summary: 'Überblick über Technologien für Werbung, Speicherung und Plattformbetrieb.',
        paragraphs: [
          'Willkommen bei RikouZone. Diese Richtlinie erklärt verständlich den Umgang mit Cookies, dem browserbasierten LocalStorage und externer Werbung.',
          'Unser Ziel ist frei zugängliche digitale Bildung, verbunden mit absoluter Klarheit über technische Vorgänge.'
        ],
        keyPoints: [
          'Vollständige Aufschlüsselung von Speicher- und Werbetools.',
          'Verzicht auf versteckte Tracking-Profile.',
          'Lerninhalte bleiben für alle Nutzer uneingeschränkt zugänglich.'
        ]
      },
      {
        id: 'what-are-cookies',
        number: '02',
        title: 'Was sind Cookies?',
        summary: 'Kleine Textdateien im Browser zum Speichern von Einstellungen und Ausliefern von Diensten.',
        paragraphs: [
          'Cookies sind kleine Textdateien, die beim Besuch einer Website in Ihrem Browser gespeichert werden können.',
          'Sie dienen dazu, Einstellungen wie die Sprache zu sichern, wiederholte Werbeeinblendungen zu begrenzen und technische Abläufe zu koordinieren.'
        ],
        keyPoints: [
          'Sichere Textdateien ohne schädlichen Programmcode.',
          'Web-Standard für eine reibungslose Navigation.',
          'Jederzeit über die Browser-Einstellungen einsehbar und löschbar.'
        ]
      },
      {
        id: 'advertising',
        number: '03',
        title: 'Aktuelle Werbung (Adsterra) & Hinweis zu Google AdSense',
        summary: 'Werbeeinblendungen über Adsterra zur Finanzierung; Google AdSense ist nicht aktiv.',
        paragraphs: [
          'Um alle Kurse und Rechner von RikouZone kostenfrei bereitzustellen, schalten wir Werbeanzeigen über das Adsterra-Netzwerk.',
          'Adsterra kann technische Cookies einsetzen, um Werbefrequenzen zu steuern und Betrug vorzubeugen, gemäß den dortigen Datenschutzregeln.',
          'Ausdrücklicher Transparenzhinweis: Google AdSense ist auf RikouZone derzeit NICHT aktiv. Alle aktiven Werbebanner stammen ausschließlich von Adsterra.'
        ],
        keyPoints: [
          'Werbeeinnahmen sichern den kostenfreien Zugang zu allen Inhalten.',
          'Adsterra nutzt isolierte technische Cookies nach eigenen Richtlinien.',
          'Bestätigt: Google AdSense ist auf der Plattform derzeit nicht aktiv.'
        ],
        note: 'Hinweis: Beworbene Angebote in Bannern stammen von Dritten; RikouZone übernimmt keine Gewähr für fremde Inhalte.'
      },
      {
        id: 'user-controls',
        number: '04',
        title: 'Nutzerkontrolle und Cookie-Einstellungen',
        summary: 'Steuerung über Ihre Browser-Optionen; kein internes Einwilligungs-Banner auf der Website.',
        paragraphs: [
          'Da RikouZone selbst keine invasiven Tracking-Cookies setzt, existiert kein internes Cookie-Zustimmungsbanner.',
          'Sie können Cookies jederzeit eigenständig in den Einstellungen Ihres Browsers (Chrome, Firefox, Safari, Edge) blockieren oder löschen.',
          'Auch die Nutzung von Werbeblockern ist möglich, ohne den Zugriff auf Unterrichtseinheiten zu verlieren.'
        ],
        keyPoints: [
          'Volle Kontrolle über die Datenschutzeinstellungen Ihres Browsers.',
          'Kein interner Zustimmungs-Button, da RikouZone intern kein Profiling betreibt.',
          'Werbeblocker schränken den Zugriff auf Lernmodule nicht ein.'
        ]
      },
      {
        id: 'local-storage',
        number: '05',
        title: 'Lokaler Speicher des Browsers (LocalStorage)',
        summary: 'XP-Punkte, Profilbild, Lesezeichen und Fortschritt bleiben ausschließlich auf Ihrem Gerät.',
        paragraphs: [
          'RikouZone nutzt den Browser-LocalStorage, um Lernfortschritte ohne Registrierung oder Passwörter auf Cloud-Servern zu sichern.',
          'Gespeichert werden: Avatar, Benutzername, XP-Punkte, Level, gemerkte Pfade, abgeschlossene Lektionen sowie Design- und Spracheinstellungen.',
          'Wichtiger Hinweis: Diese Daten verbleiben ausschließlich lokal auf Ihrem Endgerät. Das Löschen von Browserdaten setzt den Fortschritt zurück.'
        ],
        keyPoints: [
          'Fortschritt & XP rein lokal auf Ihrem Endgerät gesichert.',
          'Keine Übertragung an zentrale Tracking-Server.',
          'Löschen der Browserdaten setzt lokale Daten zurück.'
        ],
        note: 'Sicherheit: Die Same-Origin-Policy des Browsers schützt gespeicherte RikouZone-Daten vor fremden Websites.'
      },
      {
        id: 'external-links',
        number: '06',
        title: 'Externe Links und Drittanbieter',
        summary: 'Verlinkte Webseiten und Werbelinks unterliegen den Bestimmungen ihrer Betreiber.',
        paragraphs: [
          'RikouZone verweist auf externe Werkzeuge, Quellen und Zielseiten von Werbeanzeigen.',
          'Beim Verlassen unserer Seite gelten die Richtlinien des jeweiligen Anbieters. RikouZone hat keinen Einfluss auf fremde Datenverarbeitung.'
        ],
        keyPoints: [
          'Externe Plattformen unterliegen eigenen Bestimmungen.',
          'RikouZone haftet nicht für externe Cookie-Praktiken.',
          'Wir empfehlen die Prüfung der Richtlinien besuchter Drittseiten.'
        ]
      },
      {
        id: 'updates-and-contact',
        number: '07',
        title: 'Aktualisierungen & Offizieller Kontakt',
        summary: 'Anpassungen bei technischen Neuerungen; Anfragen jederzeit per E-Mail willkommen.',
        paragraphs: [
          'Wir behalten uns Aktualisierungen vor, falls neue Werbepartner hinzukommen oder technische Anpassungen erfolgen.',
          'Das Datum der letzten Überarbeitung wird transparent ausgewiesen.',
          `Bei Fragen zu Cookies oder Werbung wenden Sie sich an ${OFFICIAL_CONTACT_EMAIL} oder unsere Kontaktseite.`
        ],
        keyPoints: [
          'Transparente Richtlinienanpassungen bei Änderungen.',
          'Aktualisierungsdatum auf der Seite sichtbar.',
          `Offizielle Anlaufstelle: ${OFFICIAL_CONTACT_EMAIL}`
        ]
      }
    ]
  },
  it: {
    badge: 'Informativa su Cookie, Pubblicità e Dati Locali · RikouZone 2026',
    title: 'Informativa su cookie e pubblicità',
    subtitle: 'Spieghiamo in modo trasparente l’utilizzo di cookie, memoria locale del browser (LocalStorage) e della rete pubblicitaria Adsterra, con le opzioni a tua disposizione.',
    breadcrumbHome: 'Home',
    breadcrumbCookies: 'Cookie e pubblicità',
    backToHome: 'Torna alla Home',
    lastUpdatedLabel: 'Ultimo aggiornamento:',
    lastUpdatedValue: '11 ottobre 2026',
    quickNavTitle: 'Indice informativa',
    termsBtn: 'Termini di utilizzo',
    privacyBtn: 'Informativa sulla privacy',
    contactBtn: 'Contattaci',
    copyEmailBtn: 'Copia email ufficiale',
    copiedEmailBtn: 'Email copiata!',
    sendEmailDirectBtn: 'Invia email diretta',
    needClarificationTitle: 'Domande su cookie o annunci?',
    needClarificationDesc: 'La trasparenza è fondamentale. Contattaci all’indirizzo ufficiale per qualsiasi chiarimento tecnico.',
    footerNote: 'Questa informativa assicura un ambiente didattico chiaro, sicuro e rispettoso della privacy.',
    disclaimerPill: 'Documento ufficiale valido',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introduzione e finalità',
        summary: 'Panoramica delle tecnologie utilizzate per la pubblicità e la memoria locale.',
        paragraphs: [
          'Benvenuto su RikouZone. Questo documento illustra la gestione dei cookie, del LocalStorage del browser e dei circuiti pubblicitari esterni.',
          'Il nostro scopo è offrire formazione digitale gratuita con la massima trasparenza tecnica verso gli studenti.'
        ],
        keyPoints: [
          'Spiegazione dettagliata delle tecnologie di memoria e pubblicità.',
          'Impegno verso la riservatezza senza profilazione invasiva.',
          'Contenuti formativi sempre accessibili a tutti.'
        ]
      },
      {
        id: 'what-are-cookies',
        number: '02',
        title: 'Cosa sono i cookie?',
        summary: 'Piccoli file di testo salvati sul tuo dispositivo per memorizzare preferenze e gestire i servizi.',
        paragraphs: [
          'I cookie sono piccoli file di testo memorizzati nel browser sul tuo dispositivo quando visiti un sito web.',
          'Vengono usati comunemente per salvare preferenze come la lingua, regolare la frequenza delle inserzioni e monitorare il funzionamento tecnico.'
        ],
        keyPoints: [
          'File sicuri che non eseguono programmi dannosi sul dispositivo.',
          'Standard del web per migliorare l’esperienza d’uso.',
          'Modificabili, bloccabili o cancellabili dalle impostazioni del browser.'
        ]
      },
      {
        id: 'advertising',
        number: '03',
        title: 'Pubblicità attuale (Adsterra) e chiarimento Google AdSense',
        summary: 'Annunci via Adsterra per sostenere i server; Google AdSense non è attualmente attivo.',
        paragraphs: [
          'Per mantenere i corsi e gli strumenti di RikouZone gratuiti per tutti senza abbonamenti, ospitiamo annunci della rete Adsterra.',
          'Adsterra può utilizzare cookie tecnici per gestire la frequenza delle inserzioni e prevenire attività fraudolente secondo le proprie policy.',
          'Chiarimento trasparente: RikouZone conferma che Google AdSense NON è attivo sulla piattaforma. Gli annunci visibili provengono esclusivamente da Adsterra.'
        ],
        keyPoints: [
          'La pubblicità permette la gratuità di tutta la didattica.',
          'Adsterra gestisce cookie tecnici secondo le proprie informative.',
          'Confermato: Google AdSense non è attivo sul sito.'
        ],
        note: 'Nota: I beni e servizi promossi nei banner appartengono a terzi; RikouZone non offre garanzie su offerte esterne.'
      },
      {
        id: 'user-controls',
        number: '04',
        title: 'Scelte dell’utente e gestione dei cookie',
        summary: 'Gestisci i cookie tramite il tuo browser; nessun pulsante interno di consenso sul sito.',
        paragraphs: [
          'Poiché RikouZone non inserisce cookie di profilazione invasivi, il sito non presenta un banner o pulsante interno di consenso ai cookie.',
          'Puoi autorizzare, bloccare o eliminare i cookie in qualsiasi momento direttamente dalle opzioni del tuo browser (Chrome, Safari, Firefox, Edge).',
          'È consentito l’uso di ad-blocker senza limitare l’accesso ai corsi o ai calcolatori didattici.'
        ],
        keyPoints: [
          'Controllo diretto tramite le impostazioni di sicurezza del browser.',
          'Nessun pulsante interno poiché RikouZone non traccia gli utenti internamente.',
          'Piena compatibilità con strumenti di blocco pubblicitario.'
        ]
      },
      {
        id: 'local-storage',
        number: '05',
        title: 'Memoria locale del browser (LocalStorage)',
        summary: 'Punti XP, avatar, percorsi e lezioni salvate risiedono solo sul tuo dispositivo.',
        paragraphs: [
          'RikouZone utilizza il LocalStorage per salvare i progressi educativi senza richiedere account o password su server cloud.',
          'I dati archiviati comprendono: avatar, nickname, punti XP, livello, percorsi salvati, lezioni completate e preferenze di lingua e tema.',
          'Avvertenza importante: Queste informazioni risiedono solo sul tuo dispositivo. La cancellazione dei dati di navigazione azzererà il progresso.'
        ],
        keyPoints: [
          'Progressi e punti XP salvati in locale sul dispositivo.',
          'Nessun invio di dati di avanzamento a database centralizzati.',
          'Svuotare la cache del browser ripristina i progressi allo stato iniziale.'
        ],
        note: 'Sicurezza: Il meccanismo Same-Origin del browser protegge i dati locali di RikouZone dall’accesso di siti esterni.'
      },
      {
        id: 'external-links',
        number: '06',
        title: 'Link esterni e terze parti',
        summary: 'I link esterni e le pagine pubblicitarie seguono le policy dei rispettivi titolari.',
        paragraphs: [
          'RikouZone contiene link a piattaforme esterne, risorse e pagine pubblicitarie gestite da Adsterra.',
          'Uscendo dalla nostra piattaforma, si applicano le condizioni del sito di destinazione. RikouZone declina ogni responsabilità per pratiche altrui.'
        ],
        keyPoints: [
          'I siti terzi adottano proprie regole di riservatezza e cookie.',
          'RikouZone non controlla i cookie di altri siti.',
          'Consigliamo di verificare le informative dei siti esterni visitati.'
        ]
      },
      {
        id: 'updates-and-contact',
        number: '07',
        title: 'Aggiornamenti e contatti ufficiali',
        summary: 'Revisione periodica della policy; supporto sempre disponibile via email.',
        paragraphs: [
          'La presente informativa può essere modificata in occasione di nuovi accordi pubblicitari o aggiornamenti tecnici.',
          'La data dell’ultimo aggiornamento è sempre indicata su questa pagina.',
          `Per informazioni su cookie o pubblicità, scrivi a ${OFFICIAL_CONTACT_EMAIL} o visita la sezione Contatti.`
        ],
        keyPoints: [
          'Aggiornamenti puntuali e trasparenti.',
          'Data di revisione sempre in evidenza.',
          `Canale ufficiale: ${OFFICIAL_CONTACT_EMAIL}`
        ]
      }
    ]
  },
  pt: {
    badge: 'Política de Cookies, Publicidade e Dados Locais · RikouZone 2026',
    title: 'Política de cookies e publicidade',
    subtitle: 'Explicamos com transparência como a RikouZone utiliza cookies, o armazenamento local no navegador (LocalStorage) e a rede de anúncios Adsterra, com suas opções de controle.',
    breadcrumbHome: 'Início',
    breadcrumbCookies: 'Política de cookies e anúncios',
    backToHome: 'Voltar ao Início',
    lastUpdatedLabel: 'Última atualização:',
    lastUpdatedValue: '11 de outubro de 2026',
    quickNavTitle: 'Índice da política',
    termsBtn: 'Termos de uso',
    privacyBtn: 'Política de privacidade',
    contactBtn: 'Fale Conosco',
    copyEmailBtn: 'Copiar e-mail oficial',
    copiedEmailBtn: 'E-mail copiado!',
    sendEmailDirectBtn: 'Enviar e-mail direto',
    needClarificationTitle: 'Dúvidas sobre cookies ou anúncios?',
    needClarificationDesc: 'Valorizamos a transparência absoluta. Entre em contato por e-mail para esclarecer qualquer dúvida técnica.',
    footerNote: 'Esta política busca garantir uma experiência educacional segura, clara e focada no aprendizado.',
    disclaimerPill: 'Documento oficial vigente',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introdução e escopo',
        summary: 'Visão geral das tecnologias adotadas para publicidade e armazenamento no navegador.',
        paragraphs: [
          'Bem-vindo à RikouZone. Este documento detalha como lidamos com cookies, armazenamento local no navegador (LocalStorage) e redes de publicidade de terceiros.',
          'Nossa missão é oferecer capacitação digital acessível e gratuita, assegurando total clareza quanto ao funcionamento técnico da plataforma.'
        ],
        keyPoints: [
          'Detalhamento claro de armazenamento e ferramentas de anúncios.',
          'Compromisso com privacidade sem rastreamento abusivo.',
          'Acesso livre e gratuito a todo o acervo educacional.'
        ]
      },
      {
        id: 'what-are-cookies',
        number: '02',
        title: 'O que são cookies?',
        summary: 'Pequenos arquivos de texto gravados no seu dispositivo para gerenciar preferências e serviços.',
        paragraphs: [
          'Cookies são pequenos arquivos de texto armazenados no navegador do seu dispositivo quando você visita uma página na internet.',
          'Eles são utilizados para memorizar opções como o idioma, regular a frequência de anúncios e otimizar a distribuição técnica de conteúdos.'
        ],
        keyPoints: [
          'Arquivos de texto seguros que não executam códigos nocivos no aparelho.',
          'Padrão comum na internet para proporcionar melhor navegação.',
          'Podem ser consultados, bloqueados ou apagados nas preferências do navegador.'
        ]
      },
      {
        id: 'advertising',
        number: '03',
        title: 'Publicidade atual (Adsterra) e esclarecimento Google AdSense',
        summary: 'Exibição de anúncios pela Adsterra para custear servidores; Google AdSense não está ativo.',
        paragraphs: [
          'Para manter as ferramentas e trilhas de aprendizado da RikouZone gratuitas para todos sem cobrança de assinaturas, exibimos anúncios da rede Adsterra.',
          'A Adsterra pode usar cookies técnicos para evitar repetição excessiva de anúncios e prevenir fraudes, conforme sua própria política de privacidade.',
          'Aviso de transparência: Confirmamos expressamente que o Google AdSense NÃO está ativo na RikouZone no momento. Todos os banners exibidos são providos exclusivamente pela Adsterra.'
        ],
        keyPoints: [
          'A receita publicitária mantém os cursos abertos a todos gratuitamente.',
          'A Adsterra opera cookies técnicos sob diretrizes próprias.',
          'Confirmado: O Google AdSense não está habilitado no site atualmente.'
        ],
        note: 'Aviso: Produtos ou serviços exibidos em banners são de responsabilidade exclusiva dos respectivos anunciantes.'
      },
      {
        id: 'user-controls',
        number: '04',
        title: 'Escolhas do usuário e controle de cookies',
        summary: 'Gerencie cookies pelo navegador; não há botão interno de consentimento no site.',
        paragraphs: [
          'Como a RikouZone não instala cookies invasivos de rastreamento de perfil, a plataforma não conta com banner ou botão interno de consentimento de cookies.',
          'Você pode aceitar, recusar ou apagar cookies a qualquer momento nas configurações do seu navegador (Chrome, Safari, Firefox, Edge).',
          'O uso de bloqueadores de anúncios é suportado e não restringe o acesso aos módulos educacionais da RikouZone.'
        ],
        keyPoints: [
          'Gerenciamento direto nos ajustes de segurança do seu navegador.',
          'Sem botão interno de consentimento, pois a RikouZone não rastreia usuários internamente.',
          'Compatibilidade com ad-blockers para acessar os conteúdos.'
        ]
      },
      {
        id: 'local-storage',
        number: '05',
        title: 'Armazenamento local no navegador (LocalStorage)',
        summary: 'Seus pontos XP, avatar, trilhas salvas e aulas concluídas ficam apenas no seu aparelho.',
        paragraphs: [
          'A RikouZone usa o LocalStorage do navegador para salvar seu progresso educacional sem exigir contas com senhas em servidores na nuvem.',
          'Os dados gravados no seu aparelho incluem: avatar, apelido, pontos XP, nível, trilhas favoritadas, lições concluídas e preferências de tema/idioma.',
          'Aviso crucial: Essas informações ficam apenas no seu dispositivo. Ao limpar os dados do navegador ou trocar de aparelho, o progresso acumulado será reiniciado.'
        ],
        keyPoints: [
          'Progresso e XP salvos localmente sem envio a servidores centrais.',
          'Zero transmissão de dados a bancos remotos de monitoramento.',
          'Limpar os dados do navegador restaura o progresso inicial.'
        ],
        note: 'Isolamento: O princípio Same-Origin dos navegadores impede que sites externos tenham acesso aos dados da RikouZone.'
      },
      {
        id: 'external-links',
        number: '06',
        title: 'Links externos e terceiros',
        summary: 'Links para ferramentas ou anúncios direcionam para sites com políticas independentes.',
        paragraphs: [
          'A RikouZone traz links para ferramentas externas, referências e páginas vinculadas aos anúncios da Adsterra.',
          'Ao navegar para sites externos, aplicam-se as políticas próprias desses sites. A RikouZone não responde por práticas de terceiros.'
        ],
        keyPoints: [
          'Sites de terceiros operam sob suas próprias regras de privacidade.',
          'A RikouZone não administra cookies de plataformas externas.',
          'Recomendamos conferir as políticas dos sites visitados.'
        ]
      },
      {
        id: 'updates-and-contact',
        number: '07',
        title: 'Atualizações da política e contato oficial',
        summary: 'Revisão periódica ao incluir novas redes; canal oficial acessível por e-mail.',
        paragraphs: [
          'Podemos atualizar esta política ao adotar novos parceiros publicitários ou implementar ajustes tecnológicos na plataforma.',
          'A data da última revisão permanece exibida nesta página.',
          `Para dúvidas sobre cookies ou publicidade, escreva para ${OFFICIAL_CONTACT_EMAIL} ou use a página Fale Conosco.`
        ],
        keyPoints: [
          'Atualizações periódicas com total transparência.',
          'Data da última versão sempre destacada.',
          `Contato oficial: ${OFFICIAL_CONTACT_EMAIL}`
        ]
      }
    ]
  },
  zh: {
    badge: 'Cookie、广告与本地数据规范 · RikouZone 2026',
    title: 'Cookie 与广告政策',
    subtitle: '本政策向您透明说明 RikouZone 如何运用 Cookie 技术、浏览器本地存储（LocalStorage）以及 Adsterra 广告网络，并阐述您所享有的管理控制权限。',
    breadcrumbHome: '首页',
    breadcrumbCookies: 'Cookie 与广告政策',
    backToHome: '返回首页',
    lastUpdatedLabel: '最近更新：',
    lastUpdatedValue: '2026年10月11日',
    quickNavTitle: '条款内容导航',
    termsBtn: '使用条款',
    privacyBtn: '隐私政策',
    contactBtn: '联系我们',
    copyEmailBtn: '复制官方邮箱',
    copiedEmailBtn: '邮箱已复制！',
    sendEmailDirectBtn: '直接发送邮件',
    needClarificationTitle: '对 Cookie 或广告投放有任何疑问？',
    needClarificationDesc: '我们坚守透明公开原则。若您对站内技术机制或广告服务有任何疑问，欢迎随时通过官方邮箱与我们联络。',
    footerNote: '制定本政策旨在为广大学员及内容创作者构建透明、安全且注重隐私的数字化研习空间。',
    disclaimerPill: '官方现行生效文件',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: '引言与适用范围',
        summary: '全面阐述平台在广告展示、本地存储及运营支持方面的技术机制。',
        paragraphs: [
          '欢迎访问 RikouZone。本文件向您全面说明本数字平台如何处理 Cookie 技术、浏览器端本地存储（LocalStorage）以及第三方广告服务。',
          '我们致力于在全球范围内推广开放且实用的数字化技能教学与创作者实战指南，并始终秉持透明原则，向学员公开与浏览体验相关的技术细节。'
        ],
        keyPoints: [
          '清晰解析站内采用的各项存储机制与广告投放技术。',
          '严格遵循隐私优先理念，绝不进行侵入式个人画像追踪。',
          '确保所有技能课程及实用工具保持永久免费开放。'
        ]
      },
      {
        id: 'what-are-cookies',
        number: '02',
        title: '什么是 Cookie？',
        summary: '保存在您终端设备浏览器中的小型文本文件，用于记录偏好并协调技术服务。',
        paragraphs: [
          'Cookie 是当您访问网站时，由浏览器保存在您个人设备（电脑、手机或平板电脑）上的小型文本数据块。',
          '它们通常用于帮助网站记录您的界面偏好（如语言或主题设置）、控制广告出现频率以防重复打扰，以及协助统计技术访问性能。'
        ],
        keyPoints: [
          '属于标准的纯文本文件，绝不会在您的设备上执行恶意程序。',
          '现代互联网通用的基础技术，旨在提升浏览顺畅度。',
          '您可随时在浏览器设置中自主查看、拦截或清除这些数据。'
        ]
      },
      {
        id: 'advertising',
        number: '03',
        title: '当前广告服务商 (Adsterra) 与 Google AdSense 说明',
        summary: '我们通过 Adsterra 展示广告以承担服务器运营开销；目前未启用 Google AdSense。',
        paragraphs: [
          '为了能够持续向全球学员免费开放高质量的数字技能教学、实用测算工具与实战演练，RikouZone 展示由合规第三方广告网络 Adsterra 提供的数字广告。',
          'Adsterra 可能会在您的浏览器中设置独立的技术性 Cookie，用以统计曝光频次、防止虚假刷量并保障广告正常投放，具体适用 Adsterra 的隐私政策。',
          '重要透明声明：RikouZone 目前并未激活使用 Google AdSense 广告联盟，页面展示的所有广告位均由 Adsterra 独立提供与管理。'
        ],
        keyPoints: [
          '广告收益用于分担高昂的服务器与内容带宽成本，维系平台永久免费。',
          '广告服务商 Adsterra 依据其独立隐私规范管理技术性 Cookie。',
          '正式确认：本站当前未激活或集成 Google AdSense 广告。'
        ],
        note: '特别说明：广告展示所涉及的第三方商品或外部服务由相应广告主独立负责，RikouZone 不对其内容作任何商业担保。'
      },
      {
        id: 'user-controls',
        number: '04',
        title: '用户自主权与 Cookie 控制选项',
        summary: '您可通过浏览器设置自主管理 Cookie；本站未设内部同意按钮。',
        paragraphs: [
          '鉴于 RikouZone 自身绝不投放任何侵犯隐私或转售数据的追踪 Cookie，本平台并未在页面内植入浮动弹窗或 Cookie 同意管理按钮。',
          '您完全可以通过个人浏览器（如 Chrome、Firefox、Safari、Edge 等）的安全与隐私设置，随时自主允许、限制或彻底清除第三方 Cookie。',
          '您亦可自由在浏览器中启用合规的广告拦截插件（Ad-blocker），这绝不会影响您在 RikouZone 浏览教学内容或使用测算工具。'
        ],
        keyPoints: [
          '完全依托您个人浏览器的隐私保护面板进行自主管理。',
          '站内未设 Cookie 同意按钮，因 RikouZone 自身不追踪学员行为。',
          '兼容广告拦截插件，不设付费门槛阻拦学习资源。'
        ]
      },
      {
        id: 'local-storage',
        number: '05',
        title: '浏览器本地存储 (LocalStorage) 说明',
        summary: '您的经验值 (XP)、头像、收藏路径及课程进度均仅保存在本机，不上传云端。',
        paragraphs: [
          'RikouZone 采用现代浏览器的本地存储技术（Web LocalStorage）保存您的学习成就与系统设置，无需您繁琐地注册账户或将个人信息存入远程云端数据库。',
          '保存在您本机中的信息包括：头像、昵称、经验值（XP）、当前等级、已收藏路径、已完成课程清单，以及夜间模式和语言选择。',
          '至关重要的提示：以上数据均纯粹物理保存在您当前设备上。若您清理浏览器缓存数据或更换新设备，本地保存的学习成就将无法自动同步，可能会被重置。'
        ],
        keyPoints: [
          '头像、经验值及打卡进度纯物理存储于您本机设备。',
          '绝无将学习数据上传至中心追踪服务器的机制。',
          '清除浏览器网站数据或更换设备将导致本地学习进度重置。'
        ],
        note: '数据隔离安全：浏览器的同源策略（Same-Origin Policy）严格阻断任何外部网站读取 RikouZone 存放在本地的数据。'
      },
      {
        id: 'external-links',
        number: '06',
        title: '外部链接与第三方平台',
        summary: '站内引用的工具链接及广告落地页均受相应外部平台的独立政策管辖。',
        paragraphs: [
          'RikouZone 页面中包含指向外部自由职业平台、推荐实用工具的链接，以及广告网络所包含的跳转链接。',
          '一旦您点击链接离开 RikouZone，即受目标外部网站自身的使用条款与 Cookie 政策管辖。我们无法对第三方站点的隐私行为承担责任。'
        ],
        keyPoints: [
          '外部站点均独立执行其自有的隐私规范与数据条例。',
          'RikouZone 无法控制其他外部平台的 Cookie 部署机制。',
          '建议您在访问任何第三方网站时留意其相关的合规政策。'
        ]
      },
      {
        id: 'updates-and-contact',
        number: '07',
        title: '政策修订与官方联络渠道',
        summary: '平台技术调整或新增合作方时将及时修订；官方联络邮箱随时为您开放。',
        paragraphs: [
          '当引入新的技术合作方、调整广告投放机制或因合规要求发生变更时，我们保留适时修订本政策的权利。',
          '本页面顶部及底部将持续标明“最近更新”日期。在更新发布后继续使用本平台，即表明您已悉知最新修订内容。',
          `若您对本站的 Cookie、广告投放或本地存储机制存有任何疑问，请随时通过官方认证邮箱：${OFFICIAL_CONTACT_EMAIL} 与我们联络，或访问“联系我们”页面。`
        ],
        keyPoints: [
          '紧随技术演进保持透明且及时的政策更新。',
          '页面始终清晰展示最新审核修订日期。',
          `官方唯一直属联络邮箱：${OFFICIAL_CONTACT_EMAIL}`
        ]
      }
    ]
  }
};

export const CookiePolicyView: React.FC<CookiePolicyViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const { language, isRTL } = useLanguage();
  const [activeSectionId, setActiveSectionId] = useState<string>('intro');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Fallback to Arabic if not found
  const tCookie = cookieI18n[language] || cookieI18n.ar;

  const handleCopyEmail = () => {
    if (onCopyText) {
      onCopyText(OFFICIAL_CONTACT_EMAIL, tCookie.copiedEmailBtn);
    } else {
      navigator.clipboard?.writeText(OFFICIAL_CONTACT_EMAIL);
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(`cookie-section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const ChevronBackIcon = isRTL ? ChevronRight : ChevronLeft;

  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'intro':
        return <Info className="h-5 w-5 text-amber-400" />;
      case 'what-are-cookies':
        return <Cookie className="h-5 w-5 text-amber-400" />;
      case 'advertising':
        return <Radio className="h-5 w-5 text-amber-400" />;
      case 'user-controls':
        return <Sliders className="h-5 w-5 text-amber-400" />;
      case 'local-storage':
        return <HardDrive className="h-5 w-5 text-amber-400" />;
      case 'external-links':
        return <ExternalLink className="h-5 w-5 text-amber-400" />;
      case 'updates-and-contact':
        return <Mail className="h-5 w-5 text-amber-400" />;
      default:
        return <FileText className="h-5 w-5 text-amber-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 text-zinc-100" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Top Breadcrumb & Back to Home */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800/80 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-zinc-400">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <Home className="h-3.5 w-3.5" />
            <span>{tCookie.breadcrumbHome}</span>
          </button>
          <span>/</span>
          <span className="text-amber-400 font-bold">{tCookie.breadcrumbCookies}</span>
        </div>

        <button
          id="cookie-back-home-top"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 hover:border-amber-500/50 text-zinc-300 hover:text-white transition-all text-xs font-semibold cursor-pointer shadow-xs"
        >
          <ChevronBackIcon className="h-3.5 w-3.5 text-amber-400" />
          <span>{tCookie.backToHome}</span>
        </button>
      </div>

      {/* Hero Header Banner */}
      <header className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 sm:p-10 shadow-2xl mb-8">
        <div className="absolute top-0 end-0 -mt-8 -me-8 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 -mb-8 -ms-8 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-wide">
              <Cookie className="h-3.5 w-3.5" />
              <span>{tCookie.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {tCookie.title}
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {tCookie.subtitle}
            </p>

            {/* Last Updated Badge */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 px-3 py-1 rounded-lg">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-zinc-400">{tCookie.lastUpdatedLabel}</span>
                <span className="text-amber-300 font-bold">{COOKIE_POLICY_LAST_UPDATED || tCookie.lastUpdatedValue}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 px-3 py-1 rounded-lg">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">{tCookie.disclaimerPill}</span>
              </div>
            </div>
          </div>

          {/* Quick Legal Hub Links */}
          <div className="flex md:flex-col gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0">
            <button
              onClick={() => onNavigate('terms')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 hover:border-amber-400 text-zinc-200 hover:text-white transition-all text-xs font-bold cursor-pointer"
            >
              <FileText className="h-4 w-4 text-amber-400" />
              <span>{tCookie.termsBtn}</span>
            </button>
            <button
              onClick={() => onNavigate('privacy')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 hover:border-emerald-400 text-zinc-200 hover:text-white transition-all text-xs font-bold cursor-pointer"
            >
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>{tCookie.privacyBtn}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Quick Navigation Sticky Pill Index */}
      <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-950/90 p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{tCookie.quickNavTitle}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tCookie.sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                activeSectionId === sec.id
                  ? 'border-amber-500 bg-amber-500 text-black shadow-md shadow-amber-500/20 font-black'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${activeSectionId === sec.id ? 'bg-black/20 text-black' : 'text-amber-400'}`}>
                {sec.number}
              </span>
              <span>{sec.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Policy Sections Content */}
      <div className="space-y-6">
        {tCookie.sections.map((section) => (
          <section
            id={`cookie-section-${section.id}`}
            key={section.id}
            className={`rounded-2xl border p-5 sm:p-7 transition-all ${
              activeSectionId === section.id
                ? 'border-amber-500/60 bg-zinc-900/90 shadow-xl shadow-amber-500/5'
                : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/80'
            }`}
          >
            {/* Section Header */}
            <div className="flex items-start gap-3.5 pb-4 border-b border-zinc-800/70">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                {getSectionIcon(section.id)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    § {section.number}
                  </span>
                  <h2 className="text-base sm:text-xl font-bold text-white">
                    {section.title}
                  </h2>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  {section.summary}
                </p>
              </div>
            </div>

            {/* Section Paragraphs */}
            <div className="mt-4 space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Key Points Checklist */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <div className="mt-4 pt-3 border-t border-zinc-800/60">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  <span>النقاط الجوهرية / Key Points:</span>
                </h4>
                <ul className="space-y-1.5">
                  {section.keyPoints.map((point, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="text-amber-400 font-bold mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section Note */}
            {section.note && (
              <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 flex items-start gap-2.5 text-xs text-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{section.note}</span>
              </div>
            )}

            {/* Action Buttons for specific sections */}
            {section.id === 'updates-and-contact' && (
              <div className="mt-5 pt-4 border-t border-zinc-800/70 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 px-3.5 py-2 text-xs font-bold transition-all cursor-pointer active:scale-95"
                >
                  {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedEmail ? tCookie.copiedEmailBtn : tCookie.copyEmailBtn}</span>
                </button>

                <a
                  href={`mailto:${OFFICIAL_CONTACT_EMAIL}?subject=${encodeURIComponent('استفسار حول سياسة الكوكيز والإعلانات - RikouZone')}`}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black px-3.5 py-2 text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{tCookie.sendEmailDirectBtn}</span>
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
                  <span>{tCookie.contactBtn}</span>
                </button>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Help & Contact Banner */}
      <div className="mt-10 rounded-3xl border border-amber-500/25 bg-gradient-to-r from-zinc-900/90 via-zinc-950 to-zinc-900/90 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4 text-center md:text-start flex-col md:flex-row">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">
              {tCookie.needClarificationTitle}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl">
              {tCookie.needClarificationDesc}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('contact')}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black px-5 py-2.5 text-xs font-black transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            <span>{tCookie.contactBtn}</span>
          </button>
          <button
            onClick={() => onNavigate('privacy')}
            className="rounded-xl border border-zinc-700 bg-zinc-800/80 hover:border-emerald-400 hover:text-emerald-300 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-2"
          >
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>{tCookie.privacyBtn}</span>
          </button>
        </div>
      </div>

      {/* Bottom Back Button & Philosophy Note */}
      <div className="mt-8 pt-6 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <p className="text-center sm:text-start">
          {tCookie.footerNote}
        </p>

        <button
          id="cookie-back-home-bottom"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 font-bold transition-colors cursor-pointer"
        >
          <ArrowIcon className="h-3.5 w-3.5 text-amber-400" />
          <span>{tCookie.backToHome}</span>
        </button>
      </div>

    </div>
  );
};
