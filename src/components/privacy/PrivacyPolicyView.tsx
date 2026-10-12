import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { OFFICIAL_CONTACT_EMAIL } from '../contact/ContactView';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldCheck,
  HardDrive,
  Radio,
  Bot,
  Cookie,
  Mail,
  UserCheck,
  Lock,
  RefreshCw,
  Home,
  BookOpen,
  Send,
  HelpCircle,
  Clock,
  Sparkles,
  Copy,
  Check,
  Database
} from 'lucide-react';

interface PrivacyPolicyViewProps {
  onNavigate: (tab: string) => void;
  onCopyText?: (text: string, label: string) => void;
}

/**
 * تاريخ آخر تحديث لوثيقة سياسة الخصوصية (قابل للتعديل بسهولة عند أي مراجعة مستقبلاً).
 */
export const PRIVACY_LAST_UPDATED = '11 أكتوبر 2026';

interface SectionItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  paragraphs: string[];
  keyPoints?: string[];
  note?: string;
}

interface PrivacyDictionary {
  badge: string;
  title: string;
  subtitle: string;
  breadcrumbHome: string;
  breadcrumbPrivacy: string;
  backToHome: string;
  lastUpdatedLabel: string;
  lastUpdatedValue: string;
  quickNavTitle: string;
  explorePathsBtn: string;
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

const privacyI18n: Record<string, PrivacyDictionary> = {
  ar: {
    badge: 'وثيقة حماية البيانات والخصوصية · RikouZone 2026',
    title: 'سياسة الخصوصية',
    subtitle: 'نوضح لك بشفافية تامة كيف تحمي منصة RikouZone بياناتك، ونبين استخدام التخزين المحلي في متصفحك، وشبكة إعلانات Adsterra، وتفاعلات الذكاء الاصطناعي دون جمع بيانات شخصية غير ضرورية.',
    breadcrumbHome: 'الرئيسية',
    breadcrumbPrivacy: 'سياسة الخصوصية',
    backToHome: 'العودة إلى الرئيسية',
    lastUpdatedLabel: 'آخر تحديث:',
    lastUpdatedValue: '11 أكتوبر 2026',
    quickNavTitle: 'فهرس بنود الخصوصية',
    explorePathsBtn: 'استكشاف مسارات التعلم',
    contactBtn: 'تواصل معنا',
    copyEmailBtn: 'نسخ البريد الرسمي',
    copiedEmailBtn: 'تم نسخ البريد!',
    sendEmailDirectBtn: 'إرسال بريد مباشر',
    needClarificationTitle: 'هل لديك استفسار حول خصوصيتك؟',
    needClarificationDesc: 'نحن ملتزمون بالشفافية الكاملة. يمكنك مراسلتنا في أي وقت عبر القنوات المعتمدة للاستفسار عن أي تفاصيل تتعلق ببياناتك.',
    footerNote: 'تمت صياغة سياسة الخصوصية هذه وفق مبادئ الشفافية والخصوصية أولاً (Privacy by Design) لضمان تجربة تعليمية آمنة.',
    disclaimerPill: 'وثيقة سارية ومحدثة',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'المقدمة والالتزام الصارم بالخصوصية',
        summary: 'نحترم خصوصيتك ونلتزم بعدم جمع بيانات شخصية حساسة أو استغلال خصوصية المتعلمين.',
        paragraphs: [
          'أهلاً بك في RikouZone. تشرح هذه السياسة بوضوح نوع المعلومات التي يتم التعامل معها عند زيارتك للمنصة، والغاية منها، وكيف نضمن بقاء تجربتك التعليمية آمنة وخالية من التتبع التدخلي.',
          'نؤمن بأن التعليم الرقمي يجب أن يكون متاحاً للجميع بأمان؛ لذا صُممت منصتنا لتعمل بشكل كامل دون فرض إنشاء حسابات معقدة أو جمع أرقام هواتف أو بيانات بنكية شخصية.'
        ],
        keyPoints: [
          'لا نطلب تسجيل حسابات مركزية إجبارية لتصفح المحتوى التعليمي.',
          'الالتزام بأعلى معايير الشفافية والنزاهة الرقمية.'
        ]
      },
      {
        id: 'storage',
        number: '02',
        title: 'التخزين المحلي في متصفحك (Browser LocalStorage)',
        summary: 'تفضيلاتك ومستواك وتقدمك في التعلم تُحفظ محلياً داخل جهازك فقط دون قاعدة بيانات مركزية.',
        paragraphs: [
          'تعتمد منصة RikouZone على تقنية التخزين المحلي (LocalStorage) المدمجة في متصفح الويب الخاص بك، وذلك لحفظ تجربتك وتخصيصها دون الحاجة لإرسال بياناتك إلى خوادم خارجية.',
          'يشمل التخزين المحلي: نقاط الخبرة (XP)، مستواك وتحدياتك اليومية، المسارات والأفكار المحفوظة في المفضلة، تفضيل لغة الموقع (بين اللغات الـ 9 المتاحة)، والمظهر (الوضع الداكن/الفاتح).',
          'هذه البيانات مخزنة حصرياً على جهازك؛ ويمكنك مسحها بالكامل في أي وقت عبر إعدادات متصفحك أو عبر زر مسح المحفوظات في صفحة حسابي.'
        ],
        keyPoints: [
          'حفظ محلي 100% داخل المتصفح لنقاط XP وتفضيلات المستخدم.',
          'المستخدم يملك التحكم الكامل في حذف أو تفريغ بياناته محلياً في أي لحظة.'
        ]
      },
      {
        id: 'ads',
        number: '03',
        title: 'شبكة الإعلانات الخارجية المعتمدة (Adsterra)',
        summary: 'نعرض إعلانات عبر شبكة Adsterra لتغطية تكاليف الخوادم المجانية؛ ولا نستخدم Google AdSense حالياً.',
        paragraphs: [
          'لتوفير محتوى تعليمي مجاني ومتاح للجميع، تعرض RikouZone إعلانات من خلال شبكة الإعلانات الخارجية Adsterra.',
          'توضيح هام وشفاف: منصة RikouZone لا تستخدم شبكة Google AdSense كشبكة إعلانات مفعّلة حالياً، وجميع البنرات والمساحات الإعلانية المدارة هي عبر Adsterra ومزودي الخدمة التقنية التابعين لها.',
          'قد تقوم شبكة Adsterra بجمع بيانات تقنية غير محددة للهوية، مثل عنوان بروتوكول الإنترنت التقريبي (IP)، نوع المتصفح، نظام التشغيل، أو تعيين معرفات رقمية لتحديد مدى تفاعل الزوار مع الإعلانات ومنع الاحتيال الإعلاني، وذلك وفقاً لسياسة الخصوصية الخاصة بشبكة Adsterra.'
        ],
        note: 'تنبيه الشفافية: نؤكد للمستخدمين أن Google AdSense ليس مفعلاً حالياً على المنصة، وأن الإعلانات المعروضة تُدار حصرياً عبر شبكة Adsterra وفق معاييرها الخاصة.'
      },
      {
        id: 'ai',
        number: '04',
        title: 'مساعد الذكاء الاصطناعي (Rikou AI)',
        summary: 'الأسئلة ومعالجة المحادثات تتم فورياً للأغراض التعليمية دون ربطها بهويتك الشخصية.',
        paragraphs: [
          'عند تفاعلك مع مساعد الذكاء الاصطناعي Rikou AI، يتم إرسال استفسارك أو طلب توليد الأفكار لمعالجة النص وتقديم الإجابة المطلوبة.',
          'لا نقوم بربط محادثات الذكاء الاصطناعي بهوية شخصية، ولا نستخدم استفساراتك لإنشاء ملفات استهداف إعلاني سلوكي، ولا نبيع نصوص المحادثات لأي طرف ثالث.',
          'نوصي بعدم مشاركة أي بيانات شخصية أو معلومات سرية وحساسة داخل محادثات الذكاء الاصطناعي كإجراء احترازي عام.'
        ]
      },
      {
        id: 'cookies',
        number: '05',
        title: 'ملفات تعريف الارتباط (Cookies) والتقنيات المماثلة',
        summary: 'لا تزرع RikouZone ملفات تتبع غازية؛ قد تستخدم شبكة الإعلانات ملفات تعريف تقنية مستقلة.',
        paragraphs: [
          'منصة RikouZone لا تستخدم بذاتها ملفات تعريف ارتباط تجمع بيانات سرية أو تتتبعك عبر مواقع أخرى على شبكة الإنترنت.',
          'قد تضع شبكة Adsterra أو شركاء الطرف الثالث ملفات تعريف ارتباط (Cookies) مستقلة في متصفحك لقياس فعالية الإعلانات وتفادي التكرار المفرط.',
          'يمكنك من خلال إعدادات متصفحك حظر ملفات تعريف الارتباط أو استخدام أدوات حجب الإعلانات متى شئت، مع بقاء كافة المسارات التعليمية متاحة لك.'
        ]
      },
      {
        id: 'contact-data',
        number: '06',
        title: 'البيانات عند التواصل المباشر ونماذج الرسائل',
        summary: 'البريد الإلكتروني والاسم يُستخدمان فقط للرد عليك ولن تتم مشاركتهما مع جهات تسويقية.',
        paragraphs: [
          'عندما تراسلنا عبر البريد الإلكتروني الرسمي أو تستخدم نموذج التواصل، فإننا نحتفظ باسمك وعنوان بريدك الإلكتروني ونص رسالتك فقط لغرض الرد على استفسارك وتقديم الدعم المطلوب.',
          'لا نبيع ولا نؤجر ولا نشارك عناوين البريد الإلكتروني مع أي جهات خارجية أو حملات تسويق دعائي غير مرغوب فيها.'
        ],
        keyPoints: [
          'استخدام بيانات المراسلة لأغراض الدعم الفني والرد حصراً.',
          'عدم وجود أي قوائم بريدية دعائية قسرية.'
        ]
      },
      {
        id: 'children',
        number: '07',
        title: 'حماية خصوصية اليافعين والأطفال',
        summary: 'المنصة موجهة للتعلم وتطوير المهارات العامة ولا تجمع بيانات القُصّر.',
        paragraphs: [
          'تهدف المنصة إلى التعليم وبناء المهارات الرقمية لجميع المهتمين. لا نقوم عن قصد بطلب أو جمع أي معلومات شخصية تحدد هوية الأطفال دون سن الرشد القانوني.',
          'نظراً لعدم وجود متطلب تسجيل حساب، فإن تجربة التصفح آمنة للجميع ولا تتضمن أي جمع منهجي للبيانات الشخصية.'
        ]
      },
      {
        id: 'rights',
        number: '08',
        title: 'حقوقك الرقمية والتحكم في بياناتك',
        summary: 'أنت المتحكم الأول؛ لك كامل الحق في مراجعة أو مسح ما تم تخزينه محلياً.',
        paragraphs: [
          'تمنحك RikouZone تحكماً كاملاً: فبإمكانك في أي لحظة مسح تفضيلاتك وتحدياتك المحفوظة عبر مسح ذاكرة التخزين المؤقت لمتصفحك.',
          'يحق لك التواصل معنا في أي وقت للاستفسار عن أي ممارسة تقنية نعتمدها في المنصة وطلب توضيحات إضافية.'
        ]
      },
      {
        id: 'updates',
        number: '09',
        title: 'التحديثات الدورية لسياسة الخصوصية',
        summary: 'قد تُحدث هذه السياسة لمواكبة المتطلبات التقنية والتنظيمية مع إبراز التاريخ أعلاه.',
        paragraphs: [
          'قد نقوم بمراجعة وتحديث سياسة الخصوصية هذه بصورة دورية، لتعكس أي تغييرات تطرأ على خدماتنا أو على الشركاء التقنيين.',
          'تصبح أي تحديثات سارية المفعول فور نشرها على هذه الصفحة وتحديث تاريخ المراجعة المثبت في ترويسة الصفحة.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'قنوات التواصل المعتمدة بخصوص الخصوصية',
        summary: 'طرق التواصل المباشرة لطرح أي تساؤل أو استيضاح يخص حماية بياناتك.',
        paragraphs: [
          'إذا كان لديك أي سؤال، ملاحظة، أو طلب متعلق بسياسة الخصوصية وممارسات البيانات في RikouZone، يمكنك التواصل مباشرة عبر البريد الرسمي المعتمد للمنصة أو صفحة اتصل بنا.',
          `البريد الرسمي للتواصل والدعم: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'استقبال الملاحظات المتعلقة بالخصوصية بكل اهتمام.',
          'الرد المباشر عبر القنوات الرسمية للمشروع.'
        ]
      }
    ]
  },
  ary: {
    badge: 'وثيقة حماية البيانات والخصوصية · RikouZone 2026',
    title: 'سياسة الخصوصية',
    subtitle: 'كنوضحوا ليك بكل شفافية كيفاش منصة RikouZone كتحمي الخصوصية ديالك، مع توضيح الاستعمال ديال التخزين المحلي فالمتصفح وإعلانات Adsterra بلا جمع بيانات شخصية بلا فايدة.',
    breadcrumbHome: 'الرئيسية',
    breadcrumbPrivacy: 'سياسة الخصوصية',
    backToHome: 'الرجوع للرئيسية',
    lastUpdatedLabel: 'آخر تحديث:',
    lastUpdatedValue: '11 أكتوبر 2026',
    quickNavTitle: 'أقسام سياسة الخصوصية',
    explorePathsBtn: 'استكشف مسارات التعلم',
    contactBtn: 'تواصل معانا',
    copyEmailBtn: 'نسخ الإيميل الرسمي',
    copiedEmailBtn: 'تم نسخ الإيميل!',
    sendEmailDirectBtn: 'صيفط إيميل مباشر',
    needClarificationTitle: 'عندك شي سؤال على الخصوصية ديالك؟',
    needClarificationDesc: 'حنا ملتزمين بالشفافية الكاملة وتقدر تصيفط لينا فأي وقت عبر القنوات المعتمدة باش تسول على أي حاجة.',
    footerNote: 'هاد السياسة تقادات باش تضمن بيئة تعليمية نقية، آمنة ومبنية على احترام الخصوصية أولاً.',
    disclaimerPill: 'وثيقة رسمية وسارية',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'المقدمة والالتزام بالخصوصية',
        summary: 'كنحترمو الخصوصية ديالك وما كنجمعوش معلومات شخصية حساسة.',
        paragraphs: [
          'مرحباً بيك فـ RikouZone. هاد الصفحة كتوضح ليك كيفاش كنتعاملو مع البيانات والخصوصية ملي كتصفح المنصة بكل شفافية.',
          'المنصة مصممة باش تخدم بلا ما تفرض عليك دير حساب، ولا تجمع نيميرو التيليفون ولا كودات البنكة. هدفنا هو التعلم الصافي.'
        ],
        keyPoints: [
          'ما كاينش تسجيل إجباري باش تقرا الدروس.',
          'الشفافية الكاملة واحترام خصوصية المتعلمين.'
        ]
      },
      {
        id: 'storage',
        number: '02',
        title: 'التخزين المحلي فـ المتصفح (LocalStorage)',
        summary: 'النقاط والمسارات واللغة كيبقاو مسجلين غير فالتيليفون ولا البيسي ديالك بوحدو.',
        paragraphs: [
          'RikouZone كتستعمل التخزين المحلي (LocalStorage) اللي كاين فالنافيكاتور ديالك باش تسجل ليك النتيجة والتفضيلات ديالك بلا ما نصيفطوها لشي سيرفر خارجي.',
          'المعلومات اللي كتسجل محلياً: نقاط الخبرة (XP)، المستوى والتحديات، المسارات اللي سجلتي فالمفضلة، واللغة اللي ختاريتي من بين 9 ديال اللغات، والمظهر (الوضع الليلي ولا العادي).',
          'هاد المعلومات كتبقى غير عندك فالمتصفح وتقدر تمسحها كاملة فوقنما بغيتي من إعدادات المتصفح ولا بزر المسح فصفحة الحساب.'
        ],
        keyPoints: [
          'تخزين محلي 100% داخل المتصفح لنقاط XP والمفضلة.',
          'المستخدم عندو التحكم الكامل باش يمسح هاد البيانات فـ أي وقت.'
        ]
      },
      {
        id: 'ads',
        number: '03',
        title: 'شبكة الإعلانات المعتمدة (Adsterra)',
        summary: 'كنعرضو إعلانات Adsterra باش نغطيو مصاريف السيرفر؛ وGoogle AdSense ماشي مفعّل حالياً.',
        paragraphs: [
          'باش نخليو المحتوى التعليمي مجاني للجميع، RikouZone كتعرض إعلانات من شبكة Adsterra الخارجية.',
          'توضيح صريح ومهم: المنصة ما كتستعملش شبكة Google AdSense حالياً، وكاع الإعلانات اللي كيبانو كيدوزو عبر Adsterra والشركاء ديالها.',
          'Adsterra تقدر تجمع بيانات تقنية عامة بحال نوع المتصفح، النظام، وعنوان IP التقريبي باش تمنع التكرار والاحتيال، وهادشي خاضع لسياسة الخصوصية ديال Adsterra.'
        ],
        note: 'ملاحظة واضحة: كنأكدو بلي Google AdSense ماشي مفعّل دابا فالموقع، والإعلانات مأخوذة من شبكة Adsterra بوحدها.'
      },
      {
        id: 'ai',
        number: '04',
        title: 'مساعد الذكاء الاصطناعي (Rikou AI)',
        summary: 'المحادثات كتعالج ديك الساع لغرض التعلم وبلا ما نربطوها بالهوية الشخصية ديالك.',
        paragraphs: [
          'ملي كتسول مساعد Rikou AI، السؤال كيمشي باش يرجع ليك بجواب وأفكار مفيدة فاللحظة.',
          'ما كنربطوش هاد الأسئلة بشي هوية شخصية ديالك، وما كنبيعوش المحادثات لشي طرف ثالث.',
          'من الأفضل دائماً ما تحطش معلومات شخصية وسرية داخل أي شات ديال الذكاء الاصطناعي كإجراء احتياطي.'
        ]
      },
      {
        id: 'cookies',
        number: '05',
        title: 'الكوكيز (Cookies) والتقنيات المشابهة',
        summary: 'RikouZone ما كتستعملش كوكيز ديال التتبع الغازي؛ شبكة الإعلانات كتستعمل كوكيز تقنية خاصة بيها.',
        paragraphs: [
          'الموقع ما عندوش كوكيز باش يتبعك فـ مواقع أخرى فالأنترنت.',
          'شبكة Adsterra تقدر تحط كوكيز تقنية فالمتصفح باش تحسب عدد المشاهدات وتفادي تكرار نفس الإشهار بزاف.',
          'تقدر تبلوكي الكوكيز من إعدادات المتصفح ديالك وتستعمل الموقع عادي بلا حتى مشكل.'
        ]
      },
      {
        id: 'contact-data',
        number: '06',
        title: 'البيانات ملي كتواصل معانا',
        summary: 'الإيميل والاسم كنحتاجوهم غير باش نجاوبوك على المشكل ولا الاستفسار ديالك.',
        paragraphs: [
          'ملي كتصيفط لينا إيميل ولا كتعمر فورم الاتصال، كنستعملو الإيميل والاسم ديالك غير باش نجاوبوك على السؤال ديالك.',
          'ما كنبيعوش الإيميلات وما كنصيفطوش إعلانات سبام إطلاقاً.'
        ],
        keyPoints: [
          'استعمال الإيميل للجواب والدعم الفني فقط.',
          'ما كاينينش إعلانات سبام بدون إذن.'
        ]
      },
      {
        id: 'children',
        number: '07',
        title: 'حماية خصوصية الصغار واليافعين',
        summary: 'المحتوى تعليمي ومناسب للجميع وما كنجمعو حتى معلومات على القاصرين.',
        paragraphs: [
          'المنصة كتهدف للتعلم واكتساب المهارات للجميع، وما كنطلبوش ولا كنجمعو أي معلومات شخصية على الأطفال.',
          'حيت ما كاينش حساب إجباري، التصفح آمن ونقي لكاع الناس.'
        ]
      },
      {
        id: 'rights',
        number: '08',
        title: 'الحقوق ديالك والتحكم فالبيانات',
        summary: 'أنت المتحكم الأول فـ كاع المعلومات المخزنة محلياً فالمتصفح ديالك.',
        paragraphs: [
          'عندك الحق الكامل باش تمسح التخزين المؤقت ديال المتصفح وتمسح كاع البيانات المحفوظة فوقنما بغيتي.',
          'تقدر تراسلنا فأي وقت باش تستفسر على أي حاجة كتعلق بالخصوصية فهاد الموقع.'
        ]
      },
      {
        id: 'updates',
        number: '09',
        title: 'التحديثات الدورية لهاد السياسة',
        summary: 'هاد السياسة تقدر تتحدث باش تواكب التطورات التقنية مع تحديث التاريخ الفوق.',
        paragraphs: [
          'نقدرو نديرو مراجعة وتحديث لهاد السياسة ملي كتكون شي حاجة جديدة تقنياً ولا قانونياً.',
          'أي تعديل كيولي ساري المفعول غير يتحط فهاد الصفحة مع تحديث التاريخ الفوق.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'التواصل والاستفسارات بخصوص الخصوصية',
        summary: 'القنوات الرسمية باش تطرح أي سؤال على الخصوصية وحماية بياناتك.',
        paragraphs: [
          'إلا عندك أي سؤال ولا استفسار على الخصوصية فـ RikouZone، تقدر تواصل معانا مباشرة عبر الإيميل الرسمي.',
          `الإيميل الرسمي للتواصل: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'كنجاوبو على كاع التساؤلات بكل اهتمام.',
          'تواصل رسمي ومباشر.'
        ]
      }
    ]
  },
  en: {
    badge: 'Data Protection & Privacy Policy · RikouZone 2026',
    title: 'Privacy Policy',
    subtitle: 'We explain transparently how RikouZone safeguards your privacy, utilizing browser LocalStorage for preferences, Adsterra advertising, and AI assistance without collecting unnecessary personal data.',
    breadcrumbHome: 'Home',
    breadcrumbPrivacy: 'Privacy Policy',
    backToHome: 'Back to Home',
    lastUpdatedLabel: 'Last Updated:',
    lastUpdatedValue: 'October 11, 2026',
    quickNavTitle: 'Privacy Policy Sections',
    explorePathsBtn: 'Explore Learning Paths',
    contactBtn: 'Contact Us',
    copyEmailBtn: 'Copy Official Email',
    copiedEmailBtn: 'Email Copied!',
    sendEmailDirectBtn: 'Send Direct Email',
    needClarificationTitle: 'Have Questions About Your Privacy?',
    needClarificationDesc: 'We prioritize complete transparency. You can contact us anytime through official avenues regarding your data or our policies.',
    footerNote: 'This privacy policy adheres to privacy-by-design standards to guarantee a safe educational experience.',
    disclaimerPill: 'Active & Updated Document',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introduction & Privacy Commitment',
        summary: 'We respect your privacy and never collect sensitive personal information unnecessarily.',
        paragraphs: [
          'Welcome to RikouZone. This Privacy Policy details the data practices of our platform, our educational mission, and how we keep your browsing experience secure and free from invasive profiling.',
          'Digital education should be open and accessible. RikouZone operates without mandatory account sign-ups, phone numbers, or credit card collections for accessing our public curricula.'
        ],
        keyPoints: [
          'No mandatory user registration required to access learning tracks.',
          'Strict commitment to digital transparency and learner safety.'
        ]
      },
      {
        id: 'storage',
        number: '02',
        title: 'Browser LocalStorage Practices',
        summary: 'Your XP, streak, challenges, bookmarks, and preferences are stored locally on your device only.',
        paragraphs: [
          'RikouZone leverages client-side browser LocalStorage to save your progress, customizations, and settings without transmitting them to central database servers.',
          'Items saved locally include: experience points (XP), challenge completions and streak days, bookmarked learning tracks and content ideas, language preferences (across our 9 supported languages), and dark/light UI modes.',
          'This data resides exclusively on your personal device. You can erase it at any moment via your browser settings or using the "Clear All Saved" button in your account dashboard.'
        ],
        keyPoints: [
          '100% client-side LocalStorage for XP points and preferences.',
          'Users maintain absolute control over clearing or resetting local data anytime.'
        ]
      },
      {
        id: 'ads',
        number: '03',
        title: 'Third-Party Advertising Network (Adsterra)',
        summary: 'We display ads via Adsterra to cover hosting costs; Google AdSense is not currently active.',
        paragraphs: [
          'To keep our educational content free and accessible to all, RikouZone serves advertisements through the Adsterra ad network.',
          'Transparent Notice: RikouZone does not currently utilize Google AdSense. All active display banners and advertising zones are served via Adsterra and its technical delivery providers.',
          'Adsterra may collect non-personally identifiable technical information such as approximate IP-based location, browser type, operating system, or device identifiers to serve appropriate ads and prevent click fraud, in compliance with Adsterra’s privacy policy.'
        ],
        note: 'Transparency Notice: We explicitly confirm that Google AdSense is not currently active on RikouZone. Display ads are provided exclusively by Adsterra.'
      },
      {
        id: 'ai',
        number: '04',
        title: 'Artificial Intelligence (Rikou AI)',
        summary: 'AI queries are processed transiently for learning guidance without user identity linking.',
        paragraphs: [
          'When you interact with the Rikou AI assistant, your prompt is processed in real time to generate educational guidance and content ideas.',
          'We do not link AI queries to any real-world identity, we do not build behavioral advertising profiles from your prompts, and we do not sell conversation transcripts to third parties.',
          'As a general best practice, we recommend not entering confidential personal secrets into AI prompt interfaces.'
        ]
      },
      {
        id: 'cookies',
        number: '05',
        title: 'Cookies & Tracking Technologies',
        summary: 'RikouZone does not use invasive tracking cookies; third-party ad networks handle technical ad cookies.',
        paragraphs: [
          'RikouZone itself does not set invasive tracking cookies or collect cross-site browsing histories.',
          'Third-party advertising partners such as Adsterra may place technical cookies in your browser to prevent repetitive ad displays and analyze general ad performance.',
          'You can manage or block cookies through your browser preferences or utilize ad-blocking extensions without losing access to educational materials.'
        ]
      },
      {
        id: 'contact-data',
        number: '06',
        title: 'Direct Communication Data',
        summary: 'Contact emails and messages are used exclusively for support and never shared with marketers.',
        paragraphs: [
          'When you email us or submit an inquiry, we retain your name, email address, and message solely to respond to your request and provide support.',
          'We do not sell, rent, or share user contact details with external commercial lists or marketing campaigns.'
        ],
        keyPoints: [
          'Contact details utilized strictly for customer support.',
          'Zero unsolicited promotional spam or marketing resale.'
        ]
      },
      {
        id: 'children',
        number: '07',
        title: 'Young Learners & Children’s Privacy',
        summary: 'Our content is educational and we never knowingly collect personally identifiable data from minors.',
        paragraphs: [
          'RikouZone is designed for digital skills education. We do not knowingly solicit or collect personal identification from children under the age of digital consent.',
          'With no account registration required, navigating the platform provides a safe environment for all learners.'
        ]
      },
      {
        id: 'rights',
        number: '08',
        title: 'Your Data Rights & Control',
        summary: 'You have full autonomy over your locally cached data and the right to request clarifications.',
        paragraphs: [
          'You retain full control over your experience: you can reset your local preferences, challenges, and saved items at any time by clearing your browser cache.',
          'You also have the right to contact us anytime to inquire about our privacy and data practices.'
        ]
      },
      {
        id: 'updates',
        number: '09',
        title: 'Periodic Policy Updates',
        summary: 'This policy may be amended to reflect technical or legal developments, with updated dates indicated.',
        paragraphs: [
          'We may periodically update this Privacy Policy to reflect advancements in our technical architecture, ad network relationships, or legal standards.',
          'Revisions become effective upon publication on this page with the updated timestamp at the top.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Privacy Contact & Official Inquiries',
        summary: 'Direct communication channels for privacy questions and data protection inquiries.',
        paragraphs: [
          'If you have questions, feedback, or inquiries regarding our privacy practices, please contact us directly via our official email.',
          `Official contact email: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'Attentive handling of all privacy-related questions.',
          'Direct response through official channels.'
        ]
      }
    ]
  },
  fr: {
    badge: 'Protection des données et confidentialité · RikouZone 2026',
    title: 'Politique de confidentialité',
    subtitle: 'Nous expliquons avec clarté comment RikouZone protège vos données, utilise le stockage local (LocalStorage), le réseau Adsterra et l’IA sans collecte superflue.',
    breadcrumbHome: 'Accueil',
    breadcrumbPrivacy: 'Politique de confidentialité',
    backToHome: "Retour à l'accueil",
    lastUpdatedLabel: 'Dernière mise à jour :',
    lastUpdatedValue: '11 octobre 2026',
    quickNavTitle: 'Sommaire de la confidentialité',
    explorePathsBtn: 'Explorer les parcours',
    contactBtn: 'Contactez-nous',
    copyEmailBtn: "Copier l'email officiel",
    copiedEmailBtn: 'Email copié !',
    sendEmailDirectBtn: 'Envoyer un email direct',
    needClarificationTitle: 'Une question sur votre vie privée ?',
    needClarificationDesc: 'La transparence est notre priorité. Contactez-nous pour toute question relative à la protection de vos données.',
    footerNote: 'Cette politique suit les principes de confidentialité dès la conception (Privacy by Design).',
    disclaimerPill: 'Document officiel en vigueur',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introduction et engagement de confidentialité',
        summary: 'Respect absolu de votre vie privée sans collecte de données personnelles superflues.',
        paragraphs: [
          'Bienvenue sur RikouZone. Cette politique détaille les pratiques de confidentialité appliquées lors de votre navigation.',
          "L'éducation numérique doit être accessible en toute sécurité. RikouZone fonctionne sans inscription obligatoire ni collecte de coordonnées bancaires."
        ],
        keyPoints: [
          'Aucune inscription requise pour consulter les cours.',
          'Transparence et intégrité numérique.'
        ]
      },
      {
        id: 'storage',
        number: '02',
        title: 'Stockage local dans votre navigateur (LocalStorage)',
        summary: 'Vos points XP, vos favoris et vos réglages sont stockés uniquement sur votre appareil.',
        paragraphs: [
          'RikouZone utilise la technologie LocalStorage intégrée à votre navigateur pour conserver votre progression sans passer par une base de données distante.',
          'Les éléments sauvegardés localement comprennent : vos points XP, vos séries de défis, vos parcours enregistrés, votre langue préférée (parmi nos 9 langues) et le thème visuel.',
          'Ces données restent sur votre machine. Vous pouvez les effacer à tout moment via les paramètres de votre navigateur ou le bouton de réinitialisation.'
        ],
        keyPoints: [
          'Stockage 100 % local pour les XP et préférences.',
          'Contrôle total de l’utilisateur pour vider ses données locales.'
        ]
      },
      {
        id: 'ads',
        number: '03',
        title: 'Réseau publicitaire tiers (Adsterra)',
        summary: 'Diffusion d’annonces via Adsterra pour financer nos serveurs ; Google AdSense n’est pas actif.',
        paragraphs: [
          'Pour maintenir un accès gratuit à nos formations, RikouZone affiche des annonces issues du réseau publicitaire Adsterra.',
          'Précision importante : RikouZone n’utilise pas actuellement Google AdSense. Toutes les bannières actives sont opérées par Adsterra et ses prestataires.',
          'Adsterra peut collecter des données techniques anonymisées (IP approximative, navigateur, appareil) pour éviter la fraude au clic, conformément à sa politique de confidentialité.'
        ],
        note: 'Note de transparence : Nous confirmons explicitement que Google AdSense n’est pas activé actuellement sur RikouZone. Les publicités proviennent uniquement d’Adsterra.'
      },
      {
        id: 'ai',
        number: '04',
        title: 'Assistant Rikou AI',
        summary: 'Les requêtes IA sont traitées en temps réel à des fins pédagogiques sans profilage.',
        paragraphs: [
          'Lorsque vous interagissez avec Rikou AI, vos questions sont analysées instantanément pour formuler des conseils pédagogiques.',
          'Nous n’associons pas ces échanges à votre identité personnelle et ne commercialisons pas vos discussions auprès de tiers.',
          'Il est recommandé de ne pas partager d’informations confidentielles dans les champs de saisie de l’IA.'
        ]
      },
      {
        id: 'cookies',
        number: '05',
        title: 'Cookies et technologies similaires',
        summary: 'RikouZone n’installe pas de cookies de pistage invasifs.',
        paragraphs: [
          'Notre plateforme n’utilise pas de cookies de pistage tiers pour surveiller votre navigation sur d’autres sites.',
          'Le réseau publicitaire Adsterra peut déposer des cookies techniques pour limiter la répétition publicitaire.',
          'Vous pouvez bloquer les cookies dans votre navigateur à tout moment sans restreindre l’accès aux contenus.'
        ]
      },
      {
        id: 'contact-data',
        number: '06',
        title: 'Données de contact direct',
        summary: 'Votre adresse email sert uniquement à répondre à vos demandes de support.',
        paragraphs: [
          'Lorsque vous nous écrivez, votre email et votre nom sont utilisés uniquement pour répondre à votre message.',
          'Nous ne vendons ni ne louons vos coordonnées à des régies publicitaires externes.'
        ],
        keyPoints: [
          'Usage des emails restreint à l’assistance technique.',
          'Aucun envoi de spam promotionnel.'
        ]
      },
      {
        id: 'children',
        number: '07',
        title: 'Protection des mineurs',
        summary: 'Contenus pédagogiques généraux sans collecte de données relatives aux mineurs.',
        paragraphs: [
          'RikouZone s’adresse à tous les apprenants. Nous ne collectons pas sciemment de données identifiables sur des mineurs.',
          'L’absence de compte garantit une expérience de consultation sécurisée pour tous.'
        ]
      },
      {
        id: 'rights',
        number: '08',
        title: 'Vos droits et maîtrise de vos données',
        summary: 'Autonomie totale sur vos données locales et droit à l’information.',
        paragraphs: [
          'Vous pouvez vider vos sauvegardes et réinitialiser votre progression à tout instant en vidant le cache de votre navigateur.',
          'Vous pouvez également nous écrire pour toute précision sur notre architecture.'
        ]
      },
      {
        id: 'updates',
        number: '09',
        title: 'Mises à jour de la politique',
        summary: 'Modifications périodiques selon les évolutions techniques avec date mise à jour.',
        paragraphs: [
          'Nous pouvons mettre à jour ce document pour refléter les évolutions de nos outils ou des obligations légales.',
          'Toute modification entre en vigueur dès sa publication en ligne.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Contact et référent confidentialité',
        summary: 'Canaux officiels pour poser vos questions relatives à la vie privée.',
        paragraphs: [
          'Pour toute demande relative à la confidentialité, écrivez-nous directement par email.',
          `Email officiel : ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'Prise en compte rigoureuse de vos remarques.',
          'Réponse assurée par notre équipe.'
        ]
      }
    ]
  },
  es: {
    badge: 'Protección de Datos y Privacidad · RikouZone 2026',
    title: 'Política de Privacidad',
    subtitle: 'Te explicamos con transparencia cómo RikouZone protege tu privacidad, utilizando almacenamiento local en tu navegador, la red publicitaria Adsterra y asistencia IA sin recopilar datos personales innecesarios.',
    breadcrumbHome: 'Inicio',
    breadcrumbPrivacy: 'Política de Privacidad',
    backToHome: 'Volver al Inicio',
    lastUpdatedLabel: 'Última actualización:',
    lastUpdatedValue: '11 de octubre de 2026',
    quickNavTitle: 'Índice de privacidad',
    explorePathsBtn: 'Explorar rutas de aprendizaje',
    contactBtn: 'Contáctanos',
    copyEmailBtn: 'Copiar correo oficial',
    copiedEmailBtn: '¡Correo copiado!',
    sendEmailDirectBtn: 'Enviar correo directo',
    needClarificationTitle: '¿Dudas sobre tu privacidad?',
    needClarificationDesc: 'Estamos comprometidos con la transparencia. Escríbenos en cualquier momento a través de los canales oficiales.',
    footerNote: 'Esta política de privacidad aplica principios de privacidad por diseño para una navegación segura.',
    disclaimerPill: 'Documento vigente y actualizado',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introducción y compromiso de privacidad',
        summary: 'Respetamos tu privacidad y evitamos la recogida de datos personales innecesarios.',
        paragraphs: [
          'Bienvenido a RikouZone. Aquí te explicamos con claridad cómo se gestiona la información durante tu visita.',
          'La formación digital debe ser libre y segura. Nuestra plataforma funciona sin registros obligatorios ni recopilación de datos bancarios.'
        ],
        keyPoints: [
          'Sin cuentas obligatorias para acceder a las guías formativas.',
          'Transparencia e integridad en el entorno digital.'
        ]
      },
      {
        id: 'storage',
        number: '02',
        title: 'Almacenamiento local en tu navegador (LocalStorage)',
        summary: 'Tus puntos XP, retos completados y preferencias se guardan únicamente en tu dispositivo.',
        paragraphs: [
          'RikouZone utiliza el almacenamiento local (LocalStorage) de tu navegador para guardar tu avance sin enviarlo a bases de datos remotas.',
          'Los datos guardados incluyen: puntos de experiencia (XP), retos diarios superados, rutas favoritas, idioma seleccionado (entre nuestros 9 idiomas) y modo visual.',
          'Esta información permanece en tu equipo. Puedes borrarla en cualquier momento desde la configuración de tu navegador o con el botón de limpiar guardados.'
        ],
        keyPoints: [
          'Almacenamiento 100% local en navegador para XP y preferencias.',
          'Control total del usuario para borrar sus datos locales cuando lo desee.'
        ]
      },
      {
        id: 'ads',
        number: '03',
        title: 'Red publicitaria externa (Adsterra)',
        summary: 'Mostramos anuncios a través de Adsterra para sostener los servidores; Google AdSense no está activo.',
        paragraphs: [
          'Para ofrecer contenido gratuito y accesible, RikouZone muestra anuncios mediante la red Adsterra.',
          'Aviso transparente importante: RikouZone no utiliza Google AdSense como red publicitaria activa. Todos los banners mostrados son gestionados por Adsterra.',
          'Adsterra puede procesar datos técnicos no identificables (IP aproximada, navegador, sistema) para evitar fraudes y gestionar la publicidad según sus propias políticas.'
        ],
        note: 'Nota de transparencia: Confirmamos que Google AdSense no está activo en RikouZone actualmente. Los anuncios provienen exclusivamente de Adsterra.'
      },
      {
        id: 'ai',
        number: '04',
        title: 'Asistente de Inteligencia Artificial (Rikou AI)',
        summary: 'Las consultas a la IA se procesan al instante para fines educativos sin asociarse a tu identidad.',
        paragraphs: [
          'Cuando formulas preguntas a Rikou AI, el texto se procesa en tiempo real para generar ideas y explicaciones didácticas.',
          'No vinculamos las preguntas con datos identificativos ni vendemos conversaciones a terceros.',
          'Recomendamos no incluir información personal delicada en los campos de consulta de la IA.'
        ]
      },
      {
        id: 'cookies',
        number: '05',
        title: 'Cookies y tecnologías similares',
        summary: 'RikouZone no emplea cookies de seguimiento invasivo.',
        paragraphs: [
          'Nuestra plataforma no instala cookies para rastrear tu navegación en otros sitios web.',
          'La red Adsterra puede utilizar cookies técnicas independientes para evitar la repetición publicitaria.',
          'Puedes desactivar las cookies en tu navegador sin que ello impida el acceso a nuestros contenidos educativos.'
        ]
      },
      {
        id: 'contact-data',
        number: '06',
        title: 'Datos de contacto y soporte',
        summary: 'Tu correo electrónico se utiliza exclusivamente para contestar a tus consultas.',
        paragraphs: [
          'Al contactarnos por email, guardamos tu nombre y correo sólo para responder a tu duda o incidencia.',
          'Nunca comercializamos ni compartimos tu dirección de email con empresas externas.'
        ],
        keyPoints: [
          'Uso de correos limitado al soporte al usuario.',
          'Sin publicidad invasiva no deseada.'
        ]
      },
      {
        id: 'children',
        number: '07',
        title: 'Privacidad de menores',
        summary: 'Contenido didáctico general sin recopilación de información de menores de edad.',
        paragraphs: [
          'RikouZone es un espacio formativo y no solicita intencionadamente datos identificativos de menores.',
          'La ausencia de registro garantiza un entorno de estudio seguro para cualquier público.'
        ]
      },
      {
        id: 'rights',
        number: '08',
        title: 'Tus derechos y control de datos',
        summary: 'Plena autonomía sobre tu almacenamiento local y derecho a formular preguntas.',
        paragraphs: [
          'Tienes el control absoluto: puedes borrar la memoria caché de tu navegador para restablecer tus datos en cualquier instante.',
          'Puedes escribirnos para cualquier aclaración sobre nuestras prácticas de privacidad.'
        ]
      },
      {
        id: 'updates',
        number: '09',
        title: 'Actualizaciones periódicas',
        summary: 'Esta política puede actualizarse para reflejar mejoras técnicas, indicando la fecha actualizada.',
        paragraphs: [
          'Podemos revisar esta política periódicamente para adecuarla a nuevas funcionalidades o requisitos legales.',
          'Las modificaciones entran en vigor desde su publicación en esta página.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Canales oficiales de contacto',
        summary: 'Vías directas para resolver dudas sobre el tratamiento de tus datos.',
        paragraphs: [
          'Si tienes dudas sobre nuestra política de privacidad, puedes escribirnos directamente por correo.',
          `Correo oficial de contacto: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'Atención dedicada a consultas sobre privacidad.',
          'Respuesta a través de canales oficiales.'
        ]
      }
    ]
  },
  de: {
    badge: 'Datenschutz & Privatsphäre · RikouZone 2026',
    title: 'Datenschutzerklärung',
    subtitle: 'Wir erläutern transparent, wie RikouZone Ihre Privatsphäre schützt, Browser-LocalStorage, das Adsterra-Werbenetzwerk und KI-Hilfen ohne unnötige Datenerfassung nutzt.',
    breadcrumbHome: 'Startseite',
    breadcrumbPrivacy: 'Datenschutzerklärung',
    backToHome: 'Zurück zur Startseite',
    lastUpdatedLabel: 'Zuletzt aktualisiert:',
    lastUpdatedValue: '11. Oktober 2026',
    quickNavTitle: 'Datenschutz-Abschnitte',
    explorePathsBtn: 'Lernpfade erkunden',
    contactBtn: 'Kontakt aufnehmen',
    copyEmailBtn: 'Offizielle E-Mail kopieren',
    copiedEmailBtn: 'E-Mail kopiert!',
    sendEmailDirectBtn: 'Direkte E-Mail senden',
    needClarificationTitle: 'Fragen zum Datenschutz?',
    needClarificationDesc: 'Transparenz steht bei uns an erster Stelle. Kontaktieren Sie uns gerne bei Fragen zu Ihren Daten.',
    footerNote: 'Diese Richtlinie basiert auf dem Prinzip Privacy by Design für sicheres digitales Lernen.',
    disclaimerPill: 'Gültiges Dokument',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Einleitung und Datenschutzverpflichtung',
        summary: 'Wir achten Ihre Privatsphäre und erfassen keine sensiblen Personendaten.',
        paragraphs: [
          'Willkommen bei RikouZone. Hier erfahren Sie, wie Daten beim Besuch der Plattform transparent verarbeitet werden.',
          'Digitale Bildung soll frei zugänglich sein. RikouZone funktioniert ohne Registrierungszwang oder Angabe von Zahlungsinformationen.'
        ],
        keyPoints: [
          'Kein Nutzerkonto für den Zugriff auf Lernpfade erforderlich.',
          'Hohe Standards bei digitaler Transparenz.'
        ]
      },
      {
        id: 'storage',
        number: '02',
        title: 'Lokaler Browser-Speicher (LocalStorage)',
        summary: 'Ihre XP-Punkte, Favoriten und Einstellungen verbleiben ausschließlich lokal auf Ihrem Gerät.',
        paragraphs: [
          'RikouZone nutzt den clientseitigen LocalStorage Ihres Browsers, um Fortschritte ohne Übertragung an externe Datenbanken zu speichern.',
          'Gespeichert werden: XP-Erfahrungspunkte, abgeschlossene Tages-Challenges, Lesezeichen, Sprachauswahl (unter 9 Sprachen) und Hell-/Dunkelmodus.',
          'Diese Daten verbleiben auf Ihrem Endgerät und können jederzeit über die Browser-Einstellungen gelöscht werden.'
        ],
        keyPoints: [
          '100% lokale Speicherung von XP und Einstellungen im Browser.',
          'Volle Nutzerkontrolle über das Löschen lokaler Daten.'
        ]
      },
      {
        id: 'ads',
        number: '03',
        title: 'Drittanbieter-Werbenetzwerk (Adsterra)',
        summary: 'Anzeigen werden über Adsterra ausgespielt; Google AdSense ist derzeit nicht aktiv.',
        paragraphs: [
          'Um unsere Bildungsangebote kostenlos bereitzustellen, bindet RikouZone Anzeigen des Werbenetzwerks Adsterra ein.',
          'Transparenzhinweis: RikouZone nutzt derzeit kein Google AdSense. Alle aktiven Werbebanner werden über Adsterra ausgeliefert.',
          'Adsterra verarbeitet technische Daten (ungefähre IP, Browser, Gerät) zur Betrugsprävention gemäß den dortigen Datenschutzrichtlinien.'
        ],
        note: 'Transparenz-Hinweis: Google AdSense ist auf RikouZone derzeit nicht aktiviert. Anzeigen stammen ausschließlich von Adsterra.'
      },
      {
        id: 'ai',
        number: '04',
        title: 'Künstliche Intelligenz (Rikou AI)',
        summary: 'KI-Anfragen dienen der didaktischen Unterstützung ohne Verknüpfung mit echten Identitäten.',
        paragraphs: [
          'Anfragen an Rikou AI werden in Echtzeit verarbeitet, um Lerninhalte und Ideen bereitzustellen.',
          'Anfragen werden nicht mit Personenprofilen verknüpft oder an Dritte weiterverkauft.',
          'Geben Sie bitte keine sensiblen Personendaten in KI-Eingabefelder ein.'
        ]
      },
      {
        id: 'cookies',
        number: '05',
        title: 'Cookies und ähnliche Technologien',
        summary: 'RikouZone setzt keine invasiven Tracking-Cookies ein.',
        paragraphs: [
          'RikouZone selbst verwendet keine Cookies, die Ihr Surfverhalten über fremde Websites hinweg verfolgen.',
          'Das Adsterra-Netzwerk kann technische Cookies zur Frequenzbegrenzung einsetzen.',
          'Sie können Cookies jederzeit in Ihrem Browser blockieren, ohne den Zugriff auf Lerninhalte zu verlieren.'
        ]
      },
      {
        id: 'contact-data',
        number: '06',
        title: 'Kontaktaufnahme und Support',
        summary: 'E-Mail-Adressen werden ausschließlich zur Beantwortung Ihrer Anfragen genutzt.',
        paragraphs: [
          'Wenn Sie uns schreiben, speichern wir Name und E-Mail-Adresse ausschließlich zur Bearbeitung Ihres Anliegens.',
          'Wir verkaufen oder teilen keine Kontaktdaten mit Werbetreibenden.'
        ],
        keyPoints: [
          'Nutzung ausschließlich für Supportzwecke.',
          'Kein unaufgeforderter Werbespam.'
        ]
      },
      {
        id: 'children',
        number: '07',
        title: 'Schutz von Minderjährigen',
        summary: 'Allgemeine Bildungsinhalte ohne gezielte Datenerhebung bei Minderjährigen.',
        paragraphs: [
          'RikouZone dient der Allgemeinbildung und erhebt wissentlich keine Daten von Kindern.',
          'Der Verzicht auf Registrierungen schützt die Privatsphäre junger Lernender.'
        ]
      },
      {
        id: 'rights',
        number: '08',
        title: 'Ihre Rechte und Datenkontrolle',
        summary: 'Volle Kontrolle über lokale Daten und Auskunftsrecht.',
        paragraphs: [
          'Sie können Ihren Browser-Cache jederzeit leeren, um alle lokal hinterlegten Daten vollständig zu entfernen.',
          'Bei Fragen zu unseren Verfahren können Sie sich jederzeit an uns wenden.'
        ]
      },
      {
        id: 'updates',
        number: '09',
        title: 'Regelmäßige Aktualisierungen',
        summary: 'Anpassungen an technische Neuerungen werden mit aktuellem Datum oben ausgewiesen.',
        paragraphs: [
          'Wir aktualisieren diese Erklärung bei technischen oder rechtlichen Änderungen.',
          'Änderungen gelten ab dem Veröffentlichungszeitpunkt auf dieser Website.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Offizieller Kontakt für Datenschutz',
        summary: 'Direkte Kommunikationswege bei Datenschutzfragen.',
        paragraphs: [
          'Bei Fragen zu unseren Datenschutzpraktiken schreiben Sie uns bitte direkt per E-Mail.',
          `Offizielle E-Mail-Adresse: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'Sorgfältige Bearbeitung Ihrer Anliegen.',
          'Direkte Rückmeldung über offizielle Kanäle.'
        ]
      }
    ]
  },
  it: {
    badge: 'Protezione dei Dati e Privacy · RikouZone 2026',
    title: 'Informativa sulla Privacy',
    subtitle: 'Spieghiamo in modo trasparente come RikouZone tutela la tua privacy, utilizzando la memoria locale (LocalStorage), la rete pubblicitaria Adsterra e l’IA senza raccolta superflua di dati.',
    breadcrumbHome: 'Home',
    breadcrumbPrivacy: 'Informativa sulla Privacy',
    backToHome: 'Torna alla Home',
    lastUpdatedLabel: 'Ultimo aggiornamento:',
    lastUpdatedValue: '11 ottobre 2026',
    quickNavTitle: 'Indice della Privacy',
    explorePathsBtn: 'Esplora percorsi di apprendimento',
    contactBtn: 'Contattaci',
    copyEmailBtn: 'Copia email ufficiale',
    copiedEmailBtn: 'Email copiata!',
    sendEmailDirectBtn: 'Invia email diretta',
    needClarificationTitle: 'Domande sulla tua privacy?',
    needClarificationDesc: 'La trasparenza è fondamentale. Puoi scriverci in qualsiasi momento tramite i canali ufficiali.',
    footerNote: 'Questa informativa rispetta i principi di privacy by design per una formazione serena e sicura.',
    disclaimerPill: 'Documento valido e aggiornato',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introduzione e impegno per la privacy',
        summary: 'Rispettiamo la tua privacy e non raccogliamo dati personali non necessari.',
        paragraphs: [
          'Benvenuto su RikouZone. In questa informativa descriviamo come gestiamo le informazioni durante la navigazione.',
          'L’istruzione digitale deve essere sicura e accessibile. RikouZone opera senza registrazione obbligatoria né richiesta di dati bancari.'
        ],
        keyPoints: [
          'Nessun account obbligatorio per consultare le guide didattiche.',
          'Trasparenza e correttezza verso gli utenti.'
        ]
      },
      {
        id: 'storage',
        number: '02',
        title: 'Memoria locale nel tuo browser (LocalStorage)',
        summary: 'I tuoi punti XP, i percorsi salvati e le preferenze rimangono sul tuo dispositivo.',
        paragraphs: [
          'RikouZone impiega il LocalStorage del tuo browser per salvare i tuoi progressi senza trasmetterli a database esterni.',
          'I dati conservati localmente comprendono: punti XP, sfide quotidiane, percorsi preferiti, lingua preferita (tra le 9 disponibili) e tema visivo.',
          'Questi dati rimangono sul tuo dispositivo e possono essere cancellati in qualsiasi momento tramite le impostazioni del browser.'
        ],
        keyPoints: [
          'Salvataggio 100% locale per XP e preferenze personali.',
          'Controllo completo dell’utente sull’eliminazione dei dati locali.'
        ]
      },
      {
        id: 'ads',
        number: '03',
        title: 'Rete pubblicitaria terza (Adsterra)',
        summary: 'Mostriamo annunci tramite Adsterra per sostenere i costi dei server; Google AdSense non è attivo.',
        paragraphs: [
          'Per mantenere i contenuti formativi gratuiti per tutti, RikouZone ospita annunci della rete Adsterra.',
          'Chiarimento trasparente: RikouZone non utilizza attualmente Google AdSense. Tutti gli annunci visualizzati sono gestiti tramite Adsterra.',
          'Adsterra può raccogliere dati tecnici non identificativi (IP approssimativo, browser, dispositivo) in conformità alla propria informativa.'
        ],
        note: 'Nota di trasparenza: Confermiamo che Google AdSense non è attualmente attivo su RikouZone. La pubblicità proviene unicamente da Adsterra.'
      },
      {
        id: 'ai',
        number: '04',
        title: 'Intelligenza Artificiale (Rikou AI)',
        summary: 'Le richieste all’IA sono elaborate in tempo reale senza profilazione personale.',
        paragraphs: [
          'Quando dialoghi con Rikou AI, i prompt vengono processati in tempo reale per offrire risposte formative.',
          'Non colleghiamo le conversazioni a identità reali né le cediamo a terzi.',
          'Si consiglia di non inserire dati personali riservati nelle richieste all’assistente IA.'
        ]
      },
      {
        id: 'cookies',
        number: '05',
        title: 'Cookie e tecnologie affini',
        summary: 'RikouZone non impiega cookie di profilazione invasivi.',
        paragraphs: [
          'La piattaforma non utilizza cookie per tracciare la tua navigazione su altri siti web.',
          'La rete Adsterra può impostare cookie tecnici per gestire la frequenza delle inserzioni.',
          'È possibile disabilitare i cookie nelle impostazioni del browser senza limitare l’accesso ai corsi.'
        ]
      },
      {
        id: 'contact-data',
        number: '06',
        title: 'Dati di contatto e assistenza',
        summary: 'L’indirizzo email viene impiegato solo per rispondere alle richieste di supporto.',
        paragraphs: [
          'Quando ci contatti, memorizziamo nome ed email esclusivamente per gestire la risposta alla tua richiesta.',
          'Non cediamo né vendiamo recapiti a società pubblicitarie.'
        ],
        keyPoints: [
          'Utilizzo dei contatti limitato all’assistenza tecnica.',
          'Nessun invio di comunicazioni spam indesiderate.'
        ]
      },
      {
        id: 'children',
        number: '07',
        title: 'Tutela dei minori',
        summary: 'Contenuti didattici generali senza raccolta di informazioni su minori.',
        paragraphs: [
          'RikouZone è una piattaforma divulgativa e non raccoglie consapevolmente dati identificativi di minori.',
          'L’assenza di registrazione garantisce un ambiente sicuro per qualsiasi studente.'
        ]
      },
      {
        id: 'rights',
        number: '08',
        title: 'Diritti dell’utente e controllo dei dati',
        summary: 'Totale autonomia sui dati salvati localmente.',
        paragraphs: [
          'Puoi cancellare la cache del browser per ripristinare le impostazioni e rimuovere ogni dato locale in qualsiasi momento.',
          'Puoi scriverci per qualunque chiarimento relativo alle nostre procedure.'
        ]
      },
      {
        id: 'updates',
        number: '09',
        title: 'Aggiornamenti periodici',
        summary: 'Modifiche periodiche per adeguamenti tecnici con data indicata in alto.',
        paragraphs: [
          'Questa informativa può essere aggiornata per riflettere novità tecniche o normative.',
          'Le modifiche sono efficaci a partire dalla pubblicazione su questa pagina.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Canali ufficiali per la privacy',
        summary: 'Contatti dedicati per qualsiasi dubbio sulla privacy.',
        paragraphs: [
          'Per qualunque richiesta in materia di privacy, scrivici direttamente via email.',
          `Email ufficiale: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'Riscontro dedicato a ogni richiesta sulla privacy.',
          'Canale ufficiale diretto.'
        ]
      }
    ]
  },
  pt: {
    badge: 'Proteção de Dados e Privacidade · RikouZone 2026',
    title: 'Política de Privacidade',
    subtitle: 'Explicamos com transparência como a RikouZone protege sua privacidade, utilizando LocalStorage no navegador, a rede de anúncios Adsterra e IA sem coletar dados desnecessários.',
    breadcrumbHome: 'Início',
    breadcrumbPrivacy: 'Política de Privacidade',
    backToHome: 'Voltar ao Início',
    lastUpdatedLabel: 'Última atualização:',
    lastUpdatedValue: '11 de outubro de 2026',
    quickNavTitle: 'Índice de Privacidade',
    explorePathsBtn: 'Explorar trilhas de aprendizado',
    contactBtn: 'Fale Conosco',
    copyEmailBtn: 'Copiar e-mail oficial',
    copiedEmailBtn: 'E-mail copiado!',
    sendEmailDirectBtn: 'Enviar e-mail direto',
    needClarificationTitle: 'Dúvidas sobre sua privacidade?',
    needClarificationDesc: 'Priorizamos total clareza. Você pode entrar em contato a qualquer momento por nossos canais oficiais.',
    footerNote: 'Esta política de privacidade segue os princípios de privacy by design para uma navegação segura.',
    disclaimerPill: 'Documento ativo e atualizado',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introdução e compromisso com a privacidade',
        summary: 'Respeitamos sua privacidade e não coletamos dados pessoais desnecessários.',
        paragraphs: [
          'Boas-vindas ao RikouZone. Aqui explicamos com transparência como tratamos as informações durante sua navegação.',
          'A educação digital deve ser acessível e segura. Operamos sem cadastro obrigatório e sem solicitar dados bancários.'
        ],
        keyPoints: [
          'Sem necessidade de conta para acessar as trilhas educativas.',
          'Compromisso com a transparência e integridade digital.'
        ]
      },
      {
        id: 'storage',
        number: '02',
        title: 'Armazenamento local no navegador (LocalStorage)',
        summary: 'Seus pontos de XP, desafios concluídos e preferências ficam salvos apenas no seu dispositivo.',
        paragraphs: [
          'A RikouZone usa o LocalStorage do seu navegador para salvar seu progresso sem depender de banco de dados externo.',
          'Os dados armazenados localmente incluem: pontos XP, desafios cumpridos, itens favoritados, idioma selecionado (entre os 9 idiomas disponíveis) e tema visual.',
          'Esses dados permanecem no seu aparelho. Você pode apagá-los a qualquer momento limpando os dados do navegador ou clicando no botão de limpar salvos.'
        ],
        keyPoints: [
          'Armazenamento 100% no dispositivo para XP e preferências.',
          'Controle absoluto do usuário para redefinir dados locais.'
        ]
      },
      {
        id: 'ads',
        number: '03',
        title: 'Rede de anúncios de terceiros (Adsterra)',
        summary: 'Exibimos anúncios via Adsterra para manter a plataforma gratuita; Google AdSense não está ativo.',
        paragraphs: [
          'Para manter nosso conteúdo de acesso livre, a RikouZone exibe anúncios por meio da rede Adsterra.',
          'Aviso de transparência: A RikouZone não utiliza o Google AdSense como rede ativa no momento. Todos os banners exibidos são providos pela Adsterra.',
          'A Adsterra pode processar dados técnicos não identificáveis (IP aproximado, navegador, sistema) para segurança e métricas, conforme suas diretrizes de privacidade.'
        ],
        note: 'Nota de transparência: Confirmamos expressamente que o Google AdSense não está ativo no RikouZone no momento. Os anúncios vêm exclusivamente da Adsterra.'
      },
      {
        id: 'ai',
        number: '04',
        title: 'Assistente de Inteligência Artificial (Rikou AI)',
        summary: 'As consultas de IA são processadas em tempo real para fins educativos sem identificação pessoal.',
        paragraphs: [
          'Ao utilizar o Rikou AI, as perguntas são processadas em tempo real para sugerir ideias e conteúdos educativos.',
          'Não associamos conversas a identidades reais nem vendemos transcrições a terceiros.',
          'Recomendamos não inserir informações pessoais confidenciais nas perguntas da IA.'
        ]
      },
      {
        id: 'cookies',
        number: '05',
        title: 'Cookies e tecnologias correlatas',
        summary: 'A RikouZone não utiliza cookies invasivos de rastreamento.',
        paragraphs: [
          'Não utilizamos cookies para acompanhar sua navegação em outros sites da internet.',
          'A rede Adsterra pode usar cookies técnicos para gerenciar a frequência dos anúncios.',
          'Você pode desativar cookies nas preferências do seu navegador sem perder acesso às aulas.'
        ]
      },
      {
        id: 'contact-data',
        number: '06',
        title: 'Dados de contato e suporte',
        summary: 'Seu e-mail é utilizado apenas para responder às suas solicitações de atendimento.',
        paragraphs: [
          'Quando você nos envia uma mensagem, retemos seu nome e e-mail apenas para esclarecer sua dúvida.',
          'Não comercializamos nem repassamos seus dados de contato a terceiros.'
        ],
        keyPoints: [
          'Uso restrito ao suporte ao usuário.',
          'Livre de spam e publicidade não solicitada.'
        ]
      },
      {
        id: 'children',
        number: '07',
        title: 'Privacidade de menores',
        summary: 'Conteúdo educativo geral sem coleta deliberada de dados de menores de idade.',
        paragraphs: [
          'A RikouZone tem objetivo educativo e não coleta intencionalmente dados de crianças.',
          'A dispensa de cadastro garante uma experiência segura para todo estudante.'
        ]
      },
      {
        id: 'rights',
        number: '08',
        title: 'Seus direitos e controle de dados',
        summary: 'Autonomia completa sobre seus dados armazenados localmente no navegador.',
        paragraphs: [
          'Você tem controle pleno: pode limpar os dados do navegador para apagar todas as informações salvas a qualquer instante.',
          'Fique à vontade para nos consultar sobre nossas práticas a qualquer momento.'
        ]
      },
      {
        id: 'updates',
        number: '09',
        title: 'Atualizações periódicas desta política',
        summary: 'Modificações periódicas com data atualizada no topo da página.',
        paragraphs: [
          'Podemos atualizar esta declaração conforme a evolução das ferramentas e legislações.',
          'As revisões passam a valer imediatamente após serem publicadas nesta página.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Canais oficiais de contato para privacidade',
        summary: 'Canais oficiais para tirar qualquer dúvida sobre a privacidade dos seus dados.',
        paragraphs: [
          'Para quaisquer dúvidas sobre privacidade, entre em contato direto pelo e-mail oficial.',
          `E-mail oficial: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'Atendimento solícito e dedicado a dúvidas sobre dados.',
          'Comunicação direta pelos canais do projeto.'
        ]
      }
    ]
  },
  zh: {
    badge: '数据保护与隐私权政策 · RikouZone 2026',
    title: '隐私政策',
    subtitle: '我们向您透明说明 RikouZone 如何保障您的隐私权益，阐明浏览器本地存储（LocalStorage）的应用、Adsterra 广告展示及 AI 辅助机制，绝不滥采无关个人信息。',
    breadcrumbHome: '首页',
    breadcrumbPrivacy: '隐私政策',
    backToHome: '返回首页',
    lastUpdatedLabel: '最后更新日期：',
    lastUpdatedValue: '2026年10月11日',
    quickNavTitle: '隐私政策章节导航',
    explorePathsBtn: '探索技能学习路线',
    contactBtn: '联系我们',
    copyEmailBtn: '复制官方邮箱',
    copiedEmailBtn: '邮箱已复制！',
    sendEmailDirectBtn: '直接发送邮件',
    needClarificationTitle: '对您的隐私权益有疑问？',
    needClarificationDesc: '我们坚持全面透明化原则。如有关于数据处理或平台隐私的任何疑问，欢迎随时通过官方途径与我们沟通。',
    footerNote: '本隐私政策践行从源头保障隐私（Privacy by Design）原则，为您打造纯粹安全的在线学习体验。',
    disclaimerPill: '现行有效与最新版本',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: '引言与隐私保护承诺',
        summary: '我们恪守隐私保护准则，绝不搜集无关的敏感个人数据。',
        paragraphs: [
          '欢迎访问 RikouZone。本隐私政策向您详细说明您在浏览和使用本平台时，相关数据的实际处理与防护机制。',
          '数字教育应当人人平等、安全无忧。RikouZone 无需强制注册账号，亦不收集您的电话号码或银行支付密码等敏感信息。'
        ],
        keyPoints: [
          '无需注册集中化账户即可浏览全部教学路线。',
          '坚持公开透明与网络诚信原则。'
        ]
      },
      {
        id: 'storage',
        number: '02',
        title: '浏览器本地存储机制 (LocalStorage)',
        summary: '您的经验值 XP、打卡进度、收藏夹和设置仅保存在您的个人设备本地，不存入中央数据库。',
        paragraphs: [
          'RikouZone 依托您浏览器内置的本地存储（LocalStorage）技术来记忆您的学习进度和个性化配置，无需将数据回传到云端数据库。',
          '本地记录的数据包括：经验值积分（XP）、每日挑战完成状态与连胜天数、收藏的学习路线与文案灵感、界面语言首选项（9种语言切换）以及明暗主题模式。',
          '这些数据完全保存在您的设备本地。您可随时通过清理浏览器缓存或在个人中心点击“清空收藏”来彻底重置。'
        ],
        keyPoints: [
          'XP积分与学习偏好100%保存在客户端本地存储。',
          '用户享有随时清理本地缓存与重置数据的完整自主权。'
        ]
      },
      {
        id: 'ads',
        number: '03',
        title: '第三方广告展示网络 (Adsterra)',
        summary: '我们通过 Adsterra 网络展示广告以分担服务器开销；目前未启用 Google AdSense。',
        paragraphs: [
          '为了能够持续向全球学员免费开放高质量的数字技能教学，RikouZone 通过合规的第三方广告网络 Adsterra 展示广告。',
          '重要透明声明：RikouZone 目前并未激活使用 Google AdSense 广告联盟，页面展示的所有广告位均由 Adsterra 及其技术服务商负责投放与管理。',
          'Adsterra 可能会收集非个人身份识别的技术信息（如粗略 IP 地址地理区域、浏览器类型、操作系统等），用于防范恶意刷量并保障广告正常投放，具体适用 Adsterra 的隐私政策。'
        ],
        note: '特别透明声明：我们向用户明确说明，Google AdSense 目前并未在 RikouZone 平台上激活；站内广告均由 Adsterra 独立提供。'
      },
      {
        id: 'ai',
        number: '04',
        title: '人工智能问答助手 (Rikou AI)',
        summary: 'AI 问答请求仅在交互时即时处理，不与您的真实个人身份发生关联。',
        paragraphs: [
          '当您向 Rikou AI 提问时，您的输入仅用于即时生成解题思路与创作灵感。',
          '我们不会将提问内容与您的真实身份建立画像，亦不将对话记录打包出售给任何第三方机构。',
          '我们建议您不要在 AI 交互输入框内输入涉密或敏感的个人隐私信息。'
        ]
      },
      {
        id: 'cookies',
        number: '05',
        title: 'Cookie 与同类技术说明',
        summary: 'RikouZone 自身不使用侵入式跨站追踪 Cookie。',
        paragraphs: [
          'RikouZone 平台本身不植入用于跨网站监视用户行为的侵入式追踪 Cookie。',
          '第三方广告网络 Adsterra 可能会在您的浏览器中设置独立的技术性 Cookie，用以统计曝光频次并避免相同广告过度重复展示。',
          '您可随时在浏览器设置中拦截第三方 Cookie 或启用广告拦截插件，此举不会影响您对学习教程的查阅。'
        ]
      },
      {
        id: 'contact-data',
        number: '06',
        title: '直接沟通与反馈信息',
        summary: '联系邮箱与留言仅用于回复您的咨询，绝不用于商业推销。',
        paragraphs: [
          '当您通过官方邮箱或联系表单向我们发送邮件时，我们仅在回复您的咨询及解决技术问题所必需的范围内使用您的姓名和邮箱。',
          '我们绝不会将您的联络方式出售、出租或共享给外部营销机构。'
        ],
        keyPoints: [
          '沟通信息严格限定于学员支持与反馈答复。',
          '坚决抵制任何未经许可的垃圾营销邮件。'
        ]
      },
      {
        id: 'children',
        number: '07',
        title: '未成年人保护',
        summary: '教学内容面向公众普及，无针对未成年人的信息收集。',
        paragraphs: [
          'RikouZone 致力于普惠性的数字技能教育。我们不会蓄意收集未成年人的个人可识别信息。',
          '无需注册账户的产品设计从机制上保障了所有学习者的隐私安全。'
        ]
      },
      {
        id: 'rights',
        number: '08',
        title: '数据权利与自主控制',
        summary: '您对保存在本地设备中的数据拥有最高支配权。',
        paragraphs: [
          '您拥有绝对的控制权：只要清空浏览器缓存，即可即时清除所有本地存储的偏好和数据。',
          '若您对我们的技术实现或数据保护实践有任何疑虑，欢迎随时向我们咨询。'
        ]
      },
      {
        id: 'updates',
        number: '09',
        title: '政策更新与版本修订',
        summary: '本政策可能随技术迭代适度修订，顶部将同步显示最新日期。',
        paragraphs: [
          '我们可能适时修订本隐私政策，以适配新的技术功能或法律合规标准。',
          '修订后的条款自本页面正式公布时即行生效。'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: '官方隐私咨询渠道',
        summary: '解答您在数据保护与隐私权方面任何疑问的官方受理渠道。',
        paragraphs: [
          '如果您对 RikouZone 的隐私政策或数据保护有任何建议或咨询，欢迎通过官方邮箱直接来信。',
          `官方联络与支持邮箱：${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          '认真倾听并妥善处理每一项隐私反馈。',
          '通过官方正式渠道及时回复。'
        ]
      }
    ]
  }
};

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onNavigate, onCopyText }) => {
  const { language, isRTL } = useLanguage();
  const [copied, setCopied] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('intro');

  const tPrivacy = privacyI18n[language] || privacyI18n.ar;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const BreadcrumbArrow = isRTL ? ChevronLeft : ChevronRight;

  const handleCopyEmail = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(OFFICIAL_CONTACT_EMAIL).then(() => {
          setCopied(true);
          if (onCopyText) {
            onCopyText(OFFICIAL_CONTACT_EMAIL, tPrivacy.copiedEmailBtn);
          }
          setTimeout(() => setCopied(false), 2500);
        }).catch(() => {
          fallbackCopy();
        });
      } else {
        fallbackCopy();
      }
    } catch {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    try {
      const el = document.createElement('textarea');
      el.value = OFFICIAL_CONTACT_EMAIL;
      el.style.position = 'fixed';
      el.style.top = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      if (onCopyText) {
        onCopyText(OFFICIAL_CONTACT_EMAIL, tPrivacy.copiedEmailBtn);
      }
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(`privacy-sec-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'intro':
        return <ShieldCheck className="h-5 w-5 text-emerald-400" />;
      case 'storage':
        return <HardDrive className="h-5 w-5 text-amber-400" />;
      case 'ads':
        return <Radio className="h-5 w-5 text-blue-400" />;
      case 'ai':
        return <Bot className="h-5 w-5 text-purple-400" />;
      case 'cookies':
        return <Cookie className="h-5 w-5 text-orange-400" />;
      case 'contact-data':
        return <Mail className="h-5 w-5 text-teal-400" />;
      case 'children':
        return <UserCheck className="h-5 w-5 text-indigo-400" />;
      case 'rights':
        return <Lock className="h-5 w-5 text-emerald-400" />;
      case 'updates':
        return <RefreshCw className="h-5 w-5 text-sky-400" />;
      case 'contact':
        return <Mail className="h-5 w-5 text-amber-400" />;
      default:
        return <Shield className="h-5 w-5 text-amber-400" />;
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 pb-24 lg:pb-16 text-zinc-100">
      
      {/* Top Breadcrumb & Return to Home Navigation Bar */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Home className="h-3.5 w-3.5 text-zinc-500" />
            <span>{tPrivacy.breadcrumbHome}</span>
          </button>
          <BreadcrumbArrow className="h-3 w-3 text-zinc-600" />
          <span className="text-amber-400 font-bold">{tPrivacy.breadcrumbPrivacy}</span>
        </div>

        <button
          id="privacy-back-home-top"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-bold text-zinc-300 hover:border-amber-500/40 hover:text-white hover:bg-zinc-850 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowIcon className="h-3.5 w-3.5 text-amber-400" />
          <span>{tPrivacy.backToHome}</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-zinc-900/90 via-[#0a0d0b] to-zinc-950 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -top-24 right-1/4 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Official Privacy Badge */}
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-4 font-sans">
            <div className="relative h-4 w-4 shrink-0">
              <img
                src="/file_00000000b1d881f496a6612e6eef85ce.png"
                onError={(e) => {
                  e.currentTarget.src = '/assets/rz-hero-badge.png';
                }}
                alt="RikouZone"
                className="h-full w-full object-contain"
              />
            </div>
            <span>{tPrivacy.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Rikou<span className="text-amber-400">Zone</span>
            <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-200 mt-2">
              {tPrivacy.title}
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-2xl">
            {tPrivacy.subtitle}
          </p>

          {/* Last Updated Date & Status Badge */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1 text-zinc-400">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              <span>{tPrivacy.lastUpdatedLabel}</span>
              <span className="font-semibold text-zinc-200">{tPrivacy.lastUpdatedValue}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{tPrivacy.disclaimerPill}</span>
            </div>
          </div>

          {/* Quick Header Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-black px-5 py-2.5 text-xs font-black transition-all shadow-md shadow-emerald-500/25 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <ArrowIcon className="h-4 w-4" />
              <span>{tPrivacy.backToHome}</span>
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="rounded-xl border border-zinc-700 bg-zinc-800/80 hover:border-amber-400 hover:text-amber-300 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-2"
            >
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>شروط الاستخدام</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="rounded-xl border border-zinc-700 bg-zinc-800/80 hover:border-emerald-400 hover:text-emerald-300 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-2"
            >
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>{tPrivacy.contactBtn}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Quick Navigation Chips / Table of Contents */}
      <div className="mt-8 rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-4 sm:p-5 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 mb-3 px-1">
          <BookOpen className="h-4 w-4 text-emerald-400" />
          <span>{tPrivacy.quickNavTitle}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tPrivacy.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs transition-all cursor-pointer border ${
                activeSectionId === section.id
                  ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300 font-bold shadow-xs'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <span className="text-[10px] text-emerald-400/80 font-mono font-bold">{section.number}</span>
              <span className="truncate max-w-[140px] sm:max-w-none">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* The 10 Privacy Sections */}
      <div className="mt-8 space-y-6">
        {tPrivacy.sections.map((section) => (
          <section
            key={section.id}
            id={`privacy-sec-${section.id}`}
            className="group rounded-3xl border border-zinc-800/90 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-xl transition-all hover:border-zinc-700/80 scroll-mt-20"
          >
            {/* Section Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800/60 pb-4 mb-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-inner shrink-0 group-hover:border-emerald-500/30 transition-colors">
                  {getSectionIcon(section.id)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      {section.number}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-white">
                      {section.title}
                    </h2>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400 font-medium">
                    {section.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>
                  {p}
                </p>
              ))}
            </div>

            {/* Key Bullet Points if available */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <div className="mt-5 rounded-2xl border border-zinc-800/70 bg-zinc-950/70 p-4">
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  {section.keyPoints.map((point, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Special Highlight/Warning Note if available */}
            {section.note && (
              <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs sm:text-sm text-emerald-200/90 flex items-start gap-3">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  {section.note}
                </p>
              </div>
            )}

            {/* Interactive direct actions for Section 10 (Contact) */}
            {section.id === 'contact' && (
              <div className="mt-6 pt-5 border-t border-zinc-800/60 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-mono text-emerald-300">
                  <Mail className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{OFFICIAL_CONTACT_EMAIL}</span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-bold text-white hover:border-emerald-400 hover:text-emerald-300 transition-all cursor-pointer active:scale-95"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? tPrivacy.copiedEmailBtn : tPrivacy.copyEmailBtn}</span>
                </button>

                <a
                  href={`mailto:${OFFICIAL_CONTACT_EMAIL}?subject=${encodeURIComponent('استفسار حول سياسة الخصوصية - RikouZone')}`}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-3.5 py-2 text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{tPrivacy.sendEmailDirectBtn}</span>
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{tPrivacy.contactBtn}</span>
                </button>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Help & Questions Banner */}
      <div className="mt-10 rounded-3xl border border-emerald-500/25 bg-gradient-to-r from-zinc-900/90 via-zinc-950 to-zinc-900/90 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4 text-center md:text-start flex-col md:flex-row">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">
              {tPrivacy.needClarificationTitle}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl">
              {tPrivacy.needClarificationDesc}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('contact')}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-black px-5 py-2.5 text-xs font-black transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            <span>{tPrivacy.contactBtn}</span>
          </button>
          <button
            onClick={() => onNavigate('terms')}
            className="rounded-xl border border-zinc-700 bg-zinc-800/80 hover:border-amber-400 hover:text-amber-300 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-2"
          >
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <span>شروط الاستخدام</span>
          </button>
        </div>
      </div>

      {/* Bottom Back Button & Philosophy Note */}
      <div className="mt-8 pt-6 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <p className="text-center sm:text-start">
          {tPrivacy.footerNote}
        </p>

        <button
          id="privacy-back-home-bottom"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 font-bold transition-colors cursor-pointer"
        >
          <ArrowIcon className="h-3.5 w-3.5 text-emerald-400" />
          <span>{tPrivacy.backToHome}</span>
        </button>
      </div>

    </div>
  );
};
