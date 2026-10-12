import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { OFFICIAL_CONTACT_EMAIL } from '../contact/ContactView';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Scale,
  Compass,
  FileCheck2,
  AlertTriangle,
  Bot,
  Award,
  ExternalLink,
  RefreshCw,
  Mail,
  Copy,
  Check,
  Home,
  BookOpen,
  Send,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface TermsOfUseViewProps {
  onNavigate: (tab: string) => void;
  onCopyText?: (text: string, label: string) => void;
}

/**
 * تاريخ آخر تحديث لوثيقة شروط الاستخدام (قابل للتعديل بسهولة عند أي تحديث مستقبلي).
 */
export const TERMS_LAST_UPDATED = '11 أكتوبر 2026';

interface SectionItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  paragraphs: string[];
  keyPoints?: string[];
  note?: string;
}

interface TermsDictionary {
  badge: string;
  title: string;
  subtitle: string;
  breadcrumbHome: string;
  breadcrumbTerms: string;
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

const termsI18n: Record<string, TermsDictionary> = {
  ar: {
    badge: 'الوثيقة القانونية الرسمية · RikouZone 2026',
    title: 'شروط الاستخدام',
    subtitle: 'يرجى قراءة شروط الاستخدام بعناية قبل تصفح أو استخدام منصة RikouZone. تهدف هذه الوثيقة إلى توضيح إطار استخدام المنصة وحقوق والتزامات الجميع.',
    breadcrumbHome: 'الرئيسية',
    breadcrumbTerms: 'شروط الاستخدام',
    backToHome: 'العودة إلى الرئيسية',
    lastUpdatedLabel: 'آخر تحديث:',
    lastUpdatedValue: '11 أكتوبر 2026',
    quickNavTitle: 'فهرس أقسام الشروط',
    explorePathsBtn: 'استكشاف مسارات التعلم',
    contactBtn: 'تواصل معنا',
    copyEmailBtn: 'نسخ البريد الرسمي',
    copiedEmailBtn: 'تم نسخ البريد!',
    sendEmailDirectBtn: 'إرسال بريد مباشر',
    needClarificationTitle: 'هل لديك استفسار حول الشروط؟',
    needClarificationDesc: 'فريق RikouZone متاح للإجابة على أي تساؤل يتعلق بشروط الاستخدام أو سياسات المنصة عبر قنوات التواصل المعتمدة.',
    footerNote: 'تمت صياغة هذه الشروط لتوفير بيئة تعليمية آمنة، شفافة، ومفيدة لجميع المتعلمين وصناع المحتوى.',
    disclaimerPill: 'وثيقة رسمية سارية',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'مقدمة والموافقة على الشروط',
        summary: 'استخدامك للمنصة يعني اطلاعك الكامل وموافقتك الصريحة على هذه الشروط.',
        paragraphs: [
          'أهلاً بك في منصة RikouZone. تشكل شروط الاستخدام هذه اتفاقية قانونية وتنظيمية بينك وبين المنصة تحكم وصولك واستخدامك لكافة صفحاتنا ومساراتنا وأدواتنا.',
          'يُعد وصولك إلى الموقع أو استخدامك لأي من محتوياته إقراراً واطلاعاً على هذه الشروط وموافقة كاملة على الالتزام بها، وذلك بالقدر والحدود التي تسمح بها القوانين والأنظمة المعمول بها.',
          'إذا كنت لا توافق على هذه الشروط أو أي جزء منها، يُرجى التوقف عن استخدام المنصة وتصفح محتوياتها.'
        ],
        keyPoints: [
          'سريان الشروط على كافة الزوار والمتعلمين فور زيارة المنصة.',
          'الالتزام بالأنظمة والقوانين المعمول بها محلياً ودولياً.'
        ]
      },
      {
        id: 'nature',
        number: '02',
        title: 'طبيعة المنصة ورسالتها',
        summary: 'منصة مستقلة متخصصة في التعليم الرقمي وصناعة المحتوى وتطوير المهارات.',
        paragraphs: [
          'RikouZone هي منصة للتعليم الرقمي وصناعة المحتوى، تهدف إلى مساعدة المستخدمين والمهتمين على اكتساب المهارات الرقمية العملية، وفهم آليات صناعة المحتوى، واكتشاف مجالات العمل الحر والعمل عبر الإنترنت بأسلوب مهني ومنظم.',
          'جميع المسارات، الأدلة، الحاسبات، والمناهج التفاعلية المتوفرة على المنصة صُممت بهدف التوجيه والتدريب التعليمي، ولا تُعد نصائح استثمارية أو مالية أو قانونية ملزمة بأي شكل من الأشكال.'
        ],
        keyPoints: [
          'هدف تعليمي وتوجيهي وتدريبي خالص.',
          'التركيز على بناء المهارات العملية والتطبيق الذاتي.'
        ]
      },
      {
        id: 'use',
        number: '03',
        title: 'استعمال المنصة والاستخدام المسؤول',
        summary: 'الالتزام بالاستخدام المشروع، النزيه، والمسؤول دون الإضرار بالمنظومة.',
        paragraphs: [
          'يجب على المستخدم استعمال منصة RikouZone بطريقة قانونية، أخلاقية، ومسؤولة، متوافقاً مع الآداب العامة والأنظمة الرقمية ذات الصلة.',
          'يُحظر تماماً محاولة تعطيل خدمات الموقع، أو استغلال أي ثغرات برمجية، أو شن هجمات حرمان من الخدمة، أو الهندسة العكسية لأكواد المنصة.',
          'يُمنع استخدام أي برمجيات آلية (Bots/Scrapers) لجمع أو سحب محتوى المنصة بكميات غير معتادة، أو القيام بأي نشاط يسبب ضرراً للمنصة أو يمس بحقوق ومصالح المستخدمين الآخرين.'
        ],
        keyPoints: [
          'الاستخدام الشخصي والتعليمي المشروع فقط.',
          'حظر الهجمات السيبرانية أو الاستغلال البرمجي للثغرات.',
          'احترام تجربة باقي المستخدمين وسلامة الخوادم.'
        ]
      },
      {
        id: 'content',
        number: '04',
        title: 'المحتوى التعليمي وتنبيه النتائج المالية',
        summary: 'المحتوى مخصص للتوجيه والتعلم؛ النتائج تختلف والنجاح غير مضمون بأرقام محددة.',
        paragraphs: [
          'المحتوى التعليمي والمناهج والحاسبات التقديرية المقدمة في RikouZone مخصصة لأغراض التدريب والتوجيه العام فقط. النتائج العملية تختلف حتماً من شخص لآخر تبعاً لمقدار الجهد، الالتزام، التراكم المعرفي، والموهبة الفردية.',
          'لا تقدم منصة RikouZone أي ضمانات أو وعود قاطعة بتحقيق أرباح مالية، أو الحصول على عمل فوري، أو الوصول إلى نتائج تجارية محددة، وتؤكد المنصة رفضها التام لثقافة الوعود الوهمية بالثراء السريع.'
        ],
        note: 'تنبيه: التقديرات والأرقام الواردة في المناهج هي نماذج محاكاة استرشادية مبنية على معايير السوق ولا تشكل ضماناً للدخل.'
      },
      {
        id: 'ai',
        number: '05',
        title: 'أدوات الذكاء الاصطناعي (Rikou AI)',
        summary: 'المعلومات المقدمة عبر الذكاء الاصطناعي إرشادية وتتطلب التحقق قبل الاعتماد عليها.',
        paragraphs: [
          'توفر المنصة مساعد الذكاء الاصطناعي (Rikou AI) كأداة مساعدة للعصف الذهني، تبسيط المفاهيم، واقتراح أفكار المحتوى.',
          'قد تحتوي الإجابات والمخرجات الناتجة عن الذكاء الاصطناعي على أخطاء، عدم دقة، أو معلومات قديمة. يجب على المستخدم التحقق المستقل من أي معلومات مصيرية أو قرارات تقنية أو تجارية قبل الاعتماد عليها.',
          'لا تتحمل RikouZone أي مسؤولية عن أي قرارات أو خطوات يتم اتخاذها استناداً حصرياً إلى مخرجات الذكاء الاصطناعي.'
        ],
        keyPoints: [
          'الذكاء الاصطناعي أداة مساعدة وليس مصدراً نهائياً للمعلومات المؤكدة.',
          'مسؤولية مراجعة المخرجات تقع على عاتق المستخدم.'
        ]
      },
      {
        id: 'ip',
        number: '06',
        title: 'حقوق الملكية الفكرية',
        summary: 'حماية العلامة التجارية والمحتوى مع احترام حقوق الملكية للجهات الخارجية.',
        paragraphs: [
          'جميع الحقوق الفكرية، بما في ذلك اسم RikouZone، الشعار، الأيقونات، التصاميم، الهيكل البرمجي، والنصوص التحريرية الأصلية، هي ملكية حصرية للمنصة ومؤسسها ومحمية بموجب القوانين المنظمة للملكية الفكرية.',
          'يُسمح للمستخدمين بالاستفادة من المحتوى لأغراض التعلم الشخصي الفردي فقط. يُحظر إعادة نشر أو بيع أو استنساخ مواد المنصة تجارياً دون موافقة خطية صريحة.',
          'العلامات التجارية والأسماء وأدوات الطرف الثالث المذكورة في الدروس (مثل أدوات التصميم والمونتاج والمنصات الخارجية) هي ملك لأصحابها الشرعيين وتُذكر فقط في سياق الشرح التعليمي.'
        ]
      },
      {
        id: 'ads',
        number: '07',
        title: 'الإعلانات والروابط الخارجية',
        summary: 'الموقع قد يعرض إعلانات وروابط خارجية تخضع لشروط وسياسات أصحابها المستقلين.',
        paragraphs: [
          'قد تعرض منصة RikouZone مساحات إعلانية من مزودين خارجيين معتمدين، أو روابط تحيل إلى مواقع ومنصات وأدوات خارجية لتقديم قيمة مضافة للمتعلم.',
          'تخضع المواقع والخدمات الخارجية للشروط وسياسات الخصوصية الخاصة بأصحابها المستقلين. لا تمثل هذه الروابط أو الإعلانات مصادقة أو ضماناً من RikouZone لجودة أو سلامة منتجات وخدمات المعلنين.',
          'يتحمل المستخدم مسؤوليته الكاملة عند التفاعل مع الروابط الخارجية أو إتمام عمليات شراء خارج نطاق RikouZone.'
        ]
      },
      {
        id: 'availability',
        number: '08',
        title: 'توفر الخدمة والتعديلات المستمرة',
        summary: 'قد تتغير وظائف المنصة أو تتوقف مؤقتاً للصيانة، وتُحدث الشروط عند اللزوم.',
        paragraphs: [
          'نعمل جاهدين على ضمان استمرار عمل المنصة بكفاءة وسلاسة، إلا أن بعض الوظائف والخدمات قد تخضع لتحديثات، تعديلات، أو توقف مؤقت لأسباب تقنية أو صيانة دورية دون إشعار مسبق.',
          'تحتفظ RikouZone بحق تعديل أو تحديث شروط الاستخدام هذه في أي وقت متى دعت الحاجة. تصبح التعديلات نافذة فور نشرها على هذه الصفحة وتحديث تاريخ المراجعة في الأعلى.'
        ]
      },
      {
        id: 'liability',
        number: '09',
        title: 'حدود المسؤولية القانونية',
        summary: 'تحديد متوازن للمسؤولية دون إعفاء من الالتزامات التي لا يجيز القانون التنازل عنها.',
        paragraphs: [
          'يتم توفير خدمات ومحتويات RikouZone "كما هي" و"حسب توفرها". في أقصى حدود يسمح بها القانون المعمول به، لا تتحمل المنصة أو القائمون عليها أي مسؤولية عن أية أضرار مباشرة، غير مباشرة، عرضية، أو تبعية ناتجة عن استخدام أو عدم القدرة على استخدام الموقع.',
          'لا تسعى هذه الشروط بأي شكل من الأشكال إلى استبعاد أو تقييد أي مسؤولية قانونية لا يجيز النظام المعمول به التنازل عنها أو تقييدها قانوناً، بما في ذلك أي التزامات حتمية تفرضها التشريعات السارية.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'التواصل والاستفسارات الرسمية',
        summary: 'قنوات التواصل المعتمدة لطرح الاستفسارات حول الشروط واستخدام المنصة.',
        paragraphs: [
          'إذا كان لديك أي سؤال، استفسار قانوني، أو رغبة في استيضاح أي بند من بنود شروط الاستخدام، يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني الرسمي للمنصة أو من خلال صفحة الاتصال المخصصة.',
          `البريد الرسمي المعتمد للتواصل: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'استقبال الاستفسارات والملاحظات بصدر رحب.',
          'الرد في أقرب وقت عبر القنوات المعتمدة.'
        ]
      }
    ]
  },
  ary: {
    badge: 'الوثيقة القانونية الرسمية · RikouZone 2026',
    title: 'شروط الاستخدام',
    subtitle: 'عافاك قرا شروط الاستخدام مزيان قبل ما تستعمل منصة RikouZone. الهدف من هاد الوثيقة هو توضيح القواعد والالتزامات للجميع باش تكون تجربة واضحة ومفيدة.',
    breadcrumbHome: 'الرئيسية',
    breadcrumbTerms: 'شروط الاستخدام',
    backToHome: 'الرجوع للرئيسية',
    lastUpdatedLabel: 'آخر تحديث:',
    lastUpdatedValue: '11 أكتوبر 2026',
    quickNavTitle: 'أقسام شروط الاستخدام',
    explorePathsBtn: 'استكشف مسارات التعلم',
    contactBtn: 'تواصل معانا',
    copyEmailBtn: 'نسخ الإيميل الرسمي',
    copiedEmailBtn: 'تم نسخ الإيميل!',
    sendEmailDirectBtn: 'صيفط إيميل مباشر',
    needClarificationTitle: 'عندك شي تساؤل على الشروط؟',
    needClarificationDesc: 'فريق RikouZone ديما واجد باش يجاوبك على أي سؤال كيتعلق بالشروط ديال المنصة عبر قنوات التواصل المعتمدة.',
    footerNote: 'هاد الشروط تصاوبات باش تضمن بيئة تعليمية نقية، آمنة ومفيدة لكاع صناع المحتوى والمتعلمين.',
    disclaimerPill: 'وثيقة رسمية وسارية',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'المقدمة والموافقة على الشروط',
        summary: 'الدخول ديالك واستعمالك للمنصة كيعني راك قريتي وموافق على هاد الشروط.',
        paragraphs: [
          'مرحباً بيك فـ RikouZone. هاد الشروط ديال الاستخدام كتمثل اتفاق واضح بينك وبين المنصة باش تضبط الاستعمال ديال الصفحات والدروس والأدوات.',
          'الدخول ديالك للموقع ولا الاستعمال ديال أي حاجة فيه كيعني راك شفتي هاد الشروط وموافق تلتزم بيها بالقدر اللي كيسمح بيه القانون المعمول به.',
          'إلا ما كنتيش موافق على هاد الشروط ولا على شي جزء منها، من الأفضل توقف عن تصفح المنصة.'
        ],
        keyPoints: [
          'الشروط سارية على كاع الزوار والطلبة غير يدخلو للموقع.',
          'احترام القوانين الرقمية المعمول بها.'
        ]
      },
      {
        id: 'nature',
        number: '02',
        title: 'طبيعة المنصة والهدف ديالها',
        summary: 'منصة ديال التعليم الرقمي، صناعة المحتوى، وتطوير المهارات الحقيقية.',
        paragraphs: [
          'RikouZone منصة ديال التعليم الرقمي وصناعة المحتوى، الهدف ديالها هو تعاون الشباب والمتعلمين يكتسبو مهارات رقمية تطبيقية، يفهمو صناعة المحتوى، ويكتشفو مجالات العمل والربح عبر الإنترنت بطريقة نقية ومدروسة.',
          'كاع الدروس، المسارات، الأدلة، والحاسبات اللي فالموقع مديورين فقط للتوجيه والتعلم الذاتي، وماشي نصائح مالية ولا استثمارية ملزمة.'
        ],
        keyPoints: [
          'هدف تعليمي وتوجيهي وتطبيقي 100%.',
          'التركيز على بناء مهارة صلبة للمستقبل.'
        ]
      },
      {
        id: 'use',
        number: '03',
        title: 'استعمال المنصة والاستخدام المسؤول',
        summary: 'الاستعمال بطريقة قانونية ومسؤولة وبلا ما تضر الموقع ولا المستخدمين.',
        paragraphs: [
          'خاص المستخدم يستعمل RikouZone بطريقة قانونية ومسؤولة، مع احترام الأخلاقيات العامة.',
          'ممنوع تحاول تعطل خدمات الموقع، ولا تستغل شي ثغرة تقنية، ولا دير هجمات سيبرانية ولا تعكس الأكواد ديال المنصة.',
          'ممنوع تستعمل روبوتات باش تسحب المحتوى ولا دير أي تصرف يضر بالسيرفرات ولا يؤثر على باقي المستخدمين.'
        ],
        keyPoints: [
          'استعمال شخصي وتعليمي مشروع.',
          'ممنوع استغلال الثغرات أو محاولات الاختراق.',
          'احترام تجربة باقي الزوار.'
        ]
      },
      {
        id: 'content',
        number: '04',
        title: 'المحتوى التعليمي وتنبيه النتائج',
        summary: 'المحتوى للتوجيه والتعلم؛ النتائج كتختلف ومكاينش أرباح مضمونة.',
        paragraphs: [
          'المحتوى التعليمي والحاسبات اللي كاينين فـ RikouZone معمولين باش يوجهوك ويعلموك الأساسيات. النتائج راها كتختلف من شخص لآخر على حساب الخدمة، الصبر، والممارسة المستمرة.',
          'RikouZone ما كتضمنش ومكتعطيش أي وعود خاوية بأرباح مالية محددة ولا بالحصول على خدمة مضمونة، والمنصة ضد ثقافة الوعود الوهمية بالربح السريع.'
        ],
        note: 'تنبيه: الأرقام والاستراتيجيات اللي فالمسارات هي نماذج توضيحية واقعية وماشي ضمان لدخل مالي محدد.'
      },
      {
        id: 'ai',
        number: '05',
        title: 'الذكاء الاصطناعي (Rikou AI)',
        summary: 'الإجابات ديال الذكاء الاصطناعي للمساعدة وضروري تأكد من المعلومات قبل ما تعول عليها.',
        paragraphs: [
          'المنصة كتوفر مساعد الذكاء الاصطناعي (Rikou AI) باش يعاونك فالعصف الذهني واقتراح الأفكار وتبسيط الشرح.',
          'الإجابات اللي كيعطيها الذكاء الاصطناعي تقدر تكون فيها أخطاء ولا معلومات ماشي دقيقة، لهذا ضروري المستخدم يراجع ويتأكد من أي معلومة مهمة قبل ما يبني عليها قراراته.',
          'RikouZone ما كتحملش المسؤولية على أي قرار تاخدو بالاعتماد بوحدو على أجوبة الذكاء الاصطناعي.'
        ],
        keyPoints: [
          'الذكاء الاصطناعي أداة مساعدة وماشي مصدر معصوم من الخطأ.',
          'المستخدم هو المسؤول على التأكد من المعلومة.'
        ]
      },
      {
        id: 'ip',
        number: '06',
        title: 'حقوق الملكية الفكرية',
        summary: 'الاسم، اللوغو، والمحتوى الأصلي محميين، مع احترام أصحاب الحقوق الخارجية.',
        paragraphs: [
          'كاع الحقوق ديال اسم RikouZone، الشعار، التصاميم، الأكواد، والمحتوى الأصلي هي ملكية خاصة بالمنصة والمؤسس ديالها ومحمية قانونياً.',
          'مسموح ليك تستافد من المحتوى للتعلم الشخصي فقط، وممنوع تعاود تبيعو ولا تنشرو لغرض تجاري بلا إذن كتابي مسبق.',
          'العلامات التجارية والبرامج الخارجية اللي مذكورة فالشروحات هي ملك لأصحابها وكنذكروها فقط في السياق التعليمي.'
        ]
      },
      {
        id: 'ads',
        number: '07',
        title: 'الإعلانات والروابط الخارجية',
        summary: 'الموقع كيعرض إعلانات وروابط لمواقع خارجية كتحكمها شروط خاصة بيهم.',
        paragraphs: [
          'الموقع يقدر يعرض إعلانات من مزودين خارجيين، ولا روابط كتديك لمواقع وأدوات خارجية مفيدة للمتعلم.',
          'المواقع الخارجية كتخضع للشروط والسياسات ديال أصحابها، وRikouZone ما كتضمنش المنتجات ولا الخدمات ديال المعلنين.',
          'المستخدم كيتحمل كامل مسؤوليته ملي كيتفاعل مع شي رابط ولا إعلان خارج الموقع.'
        ]
      },
      {
        id: 'availability',
        number: '08',
        title: 'توفر الخدمة والتعديلات',
        summary: 'الموقع يقدر يتبدل ولا يتوقف مؤقتاً للصيانة، والشروط كتقدر تتحدث ملي كيكون ضروري.',
        paragraphs: [
          'كنحرصو باش الموقع يبقى خدام مزيان وبلا مشاكل، ولكن شي وظائف يقدرو يتبدلو ولا يتوقفو مؤقتاً لأسباب تقنية ولا صيانة.',
          'RikouZone كتحتفظ بالحق باش تحدث هاد الشروط فـ أي وقت عند الضرورة، والتعديلات كتسري من النهار فاش كتحط فهاد الصفحة.'
        ]
      },
      {
        id: 'liability',
        number: '09',
        title: 'حدود المسؤولية',
        summary: 'تحديد معقول للمسؤولية بلا ما نعفيو المنصة من حقوق ما كيقبلش القانون التنازل عليها.',
        paragraphs: [
          'الخدمات كتقدم كيفما هي وحسب التوفر. وفي أقصى الحدود المسموح بها قانوناً، المنصة والمشرفين عليها ما كيتحملوش مسؤولية أي أضرار غير مباشرة ناتجة عن استعمال الموقع.',
          'هاد الشروط ما كتعفيش المنصة من أي التزامات ولا حقوق قانونية للمستخدم اللي القانون ما كيسمحش بالتنازل عليها.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'التواصل والاستفسارات',
        summary: 'قنوات التواصل باش تسول على أي حاجة كتخص الشروط واستعمال المنصة.',
        paragraphs: [
          'إلا عندك أي سؤال ولا استفسار على هاد الشروط، تقدر تواصل معانا مباشرة عبر الإيميل الرسمي للمنصة ولا عبر صفحة اتصل بنا.',
          `الإيميل الرسمي المعتمد للتواصل: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'حنا واجدين نسمعو لملاحظاتك واقتراحاتك.',
          'الجواب كيكون فأقرب وقت ممكن.'
        ]
      }
    ]
  },
  en: {
    badge: 'Official Legal Document · RikouZone 2026',
    title: 'Terms of Use',
    subtitle: 'Please review these Terms of Use carefully before navigating or using RikouZone. This document outlines platform usage guidelines, user commitments, and mutual rights.',
    breadcrumbHome: 'Home',
    breadcrumbTerms: 'Terms of Use',
    backToHome: 'Back to Home',
    lastUpdatedLabel: 'Last Updated:',
    lastUpdatedValue: 'October 11, 2026',
    quickNavTitle: 'Terms Table of Contents',
    explorePathsBtn: 'Explore Learning Paths',
    contactBtn: 'Contact Us',
    copyEmailBtn: 'Copy Official Email',
    copiedEmailBtn: 'Email Copied!',
    sendEmailDirectBtn: 'Send Direct Email',
    needClarificationTitle: 'Have Questions About Our Terms?',
    needClarificationDesc: 'The RikouZone team is ready to answer any questions regarding our terms or platform policies through our official contact channels.',
    footerNote: 'These terms are established to maintain a safe, transparent, and empowering learning ecosystem for all creators and learners.',
    disclaimerPill: 'Active Official Document',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introduction & Acceptance of Terms',
        summary: 'Accessing and using RikouZone indicates your review and agreement with these terms.',
        paragraphs: [
          'Welcome to RikouZone. These Terms of Use constitute a binding legal agreement governing your access to and use of all pages, tracks, tools, and materials on the platform.',
          'By accessing or utilizing any part of RikouZone, you acknowledge that you have read, understood, and agreed to be bound by these terms to the fullest extent permitted by applicable law.',
          'If you do not agree with any provision of these terms, please refrain from using or navigating the platform.'
        ],
        keyPoints: [
          'Terms apply to all visitors and students upon accessing the site.',
          'Compliance with applicable local and international legal standards.'
        ]
      },
      {
        id: 'nature',
        number: '02',
        title: 'Nature & Mission of the Platform',
        summary: 'An independent platform dedicated to digital education, content creation, and real skills.',
        paragraphs: [
          'RikouZone is an educational platform dedicated to digital learning and content creation. Its goal is to assist learners and aspiring creators in acquiring hands-on digital skills, understanding content monetization, and discovering genuine online work opportunities.',
          'All roadmaps, guides, calculators, and interactive curricula are provided solely for educational and orientation purposes and do not constitute financial, investment, or legal advice.'
        ],
        keyPoints: [
          'Purely educational, instructional, and practical orientation.',
          'Focus on skill acquisition and autonomous learning.'
        ]
      },
      {
        id: 'use',
        number: '03',
        title: 'Acceptable & Lawful Use',
        summary: 'Commitment to ethical, lawful, and responsible platform utilization.',
        paragraphs: [
          'Users must access and use RikouZone in a lawful, ethical, and responsible manner, respecting applicable regulations and online decorum.',
          'You may not attempt to disrupt site operations, exploit software vulnerabilities, launch denial-of-service attacks, or reverse-engineer platform assets.',
          'Automated data scraping, excessive crawling bots, and any actions that degrade server performance or harm other users are strictly prohibited.'
        ],
        keyPoints: [
          'Legitimate personal and educational usage only.',
          'Strict prohibition of cyberattacks or vulnerability exploitation.',
          'Preservation of platform integrity and user experience.'
        ]
      },
      {
        id: 'content',
        number: '04',
        title: 'Educational Content & Earnings Disclaimer',
        summary: 'Content is for guidance only; individual results vary and earnings are never guaranteed.',
        paragraphs: [
          'Educational materials, benchmarks, and interactive tools are designed for instructional guidance. Individual results depend upon diligence, consistency, market variables, and personal aptitude.',
          'RikouZone makes no warranties or promises regarding guaranteed financial profit, employment, or commercial success. We firmly reject false get-rich-quick claims.'
        ],
        note: 'Notice: Income figures and calculator results are simulation models based on industry averages and do not represent a guarantee of earnings.'
      },
      {
        id: 'ai',
        number: '05',
        title: 'Artificial Intelligence (Rikou AI)',
        summary: 'AI output is assistive; users must independently verify crucial information.',
        paragraphs: [
          'RikouZone incorporates the Rikou AI assistant to aid in brainstorming, conceptual breakdown, and idea generation.',
          'Responses generated by artificial intelligence may contain inaccuracies, errors, or outdated information. Users must independently verify critical technical, legal, or commercial data before relying on it.',
          'RikouZone assumes no liability for actions taken based exclusively on AI-generated outputs.'
        ],
        keyPoints: [
          'AI is an assistive brainstorming tool, not an infallible authority.',
          'Verification of outputs remains the user’s responsibility.'
        ]
      },
      {
        id: 'ip',
        number: '06',
        title: 'Intellectual Property Rights',
        summary: 'Protection of platform brand assets while respecting third-party rights.',
        paragraphs: [
          'All intellectual property rights associated with the RikouZone brand, logo, visuals, curricula, software architecture, and original texts belong exclusively to RikouZone and its founder.',
          'Content is provided for personal, non-commercial educational use. Commercial redistribution, resale, or unauthorized reproduction is strictly prohibited.',
          'Third-party trademarks and software names referenced in learning modules belong to their respective proprietors and are mentioned strictly for educational context.'
        ]
      },
      {
        id: 'ads',
        number: '07',
        title: 'Advertisements & External Links',
        summary: 'Third-party ads and external resources are governed by their respective proprietors’ policies.',
        paragraphs: [
          'RikouZone may display advertisements from vetted external providers or include links to external platforms and tools for educational enhancement.',
          'External sites are governed by their own terms and privacy policies. RikouZone neither endorses nor warrants products or services provided by third-party advertisers.',
          'Users assume sole responsibility when interacting with external advertisements or completing external transactions.'
        ]
      },
      {
        id: 'availability',
        number: '08',
        title: 'Service Availability & Modifications',
        summary: 'Platform features may evolve or pause for maintenance; terms are updated as needed.',
        paragraphs: [
          'We endeavor to ensure uninterrupted uptime, yet platform features may undergo upgrades, modifications, or temporary maintenance windows without prior notification.',
          'RikouZone reserves the right to amend these Terms of Use whenever necessary. Modifications take effect immediately upon publication with the updated timestamp above.'
        ]
      },
      {
        id: 'liability',
        number: '09',
        title: 'Limitation of Liability',
        summary: 'A balanced limitation of liability without waiving non-disclaimable legal rights.',
        paragraphs: [
          'Platform services and contents are provided on an "as-is" and "as-available" basis. To the maximum extent permitted by governing law, RikouZone and its operators shall not be liable for indirect, incidental, or consequential damages resulting from platform use.',
          'Nothing in these terms seeks to exclude or restrict liability where such exclusion or limitation is impermissible under applicable statutory consumer protection laws.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Contact & Official Inquiries',
        summary: 'Designated channels for inquiries regarding terms and platform usage.',
        paragraphs: [
          'If you have any questions, legal inquiries, or require clarification regarding any section of these terms, please reach out through our official channels.',
          `Official contact email: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'Prompt response through designated communication avenues.',
          'Dedicated support for user questions and compliance inquiries.'
        ]
      }
    ]
  },
  fr: {
    badge: 'Document Juridique Officiel · RikouZone 2026',
    title: "Conditions d'utilisation",
    subtitle: "Veuillez lire attentivement les présentes conditions d'utilisation avant de naviguer ou d'utiliser la plateforme RikouZone. Ce document définit le cadre d'usage et les droits mutuels.",
    breadcrumbHome: 'Accueil',
    breadcrumbTerms: "Conditions d'utilisation",
    backToHome: "Retour à l'accueil",
    lastUpdatedLabel: 'Dernière mise à jour :',
    lastUpdatedValue: '11 octobre 2026',
    quickNavTitle: 'Sommaire des conditions',
    explorePathsBtn: 'Explorer les parcours',
    contactBtn: 'Contactez-nous',
    copyEmailBtn: "Copier l'email officiel",
    copiedEmailBtn: 'Email copié !',
    sendEmailDirectBtn: 'Envoyer un email direct',
    needClarificationTitle: 'Une question sur nos conditions ?',
    needClarificationDesc: "L'équipe RikouZone est à votre disposition pour clarifier toute question relative aux règles de la plateforme via nos canaux officiels.",
    footerNote: 'Ces conditions sont établies pour garantir un écosystème pédagogique sain, transparent et profitable à tous les apprenants.',
    disclaimerPill: 'Document officiel en vigueur',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: "Introduction et acceptation des conditions",
        summary: "L'utilisation de RikouZone vaut lecture et acceptation pleine et entière des présentes conditions.",
        paragraphs: [
          "Bienvenue sur RikouZone. Les présentes conditions d'utilisation constituent un accord juridique régissant votre accès et votre utilisation de l'ensemble des pages, parcours et outils de la plateforme.",
          "Votre accès au site ou l'utilisation de ses fonctionnalités implique votre acceptation sans réserve de ces conditions dans la mesure permise par les lois applicables.",
          "Si vous n'acceptez pas ces dispositions, nous vous invitons à cesser immédiatement d'utiliser la plateforme."
        ],
        keyPoints: [
          "Applicable à tout visiteur dès la consultation du site.",
          "Respect scrupuleux des lois et réglementations en vigueur."
        ]
      },
      {
        id: 'nature',
        number: '02',
        title: 'Nature et vocation de la plateforme',
        summary: "Une plateforme indépendante d'éducation digitale et de création de contenu.",
        paragraphs: [
          "RikouZone est une plateforme dédiée à l'apprentissage digital et à la création de contenu. Elle vise à accompagner les débutants dans l'acquisition de compétences réelles et la découverte des opportunités en ligne.",
          "Tous les contenus, simulateurs et méthodologies sont fournis à des fins exclusivement pédagogiques et ne constituent en aucun cas des conseils financiers ou juridiques."
        ],
        keyPoints: [
          "Vocation strictement éducative et formatrice.",
          "Accent sur le développement de compétences pérennes."
        ]
      },
      {
        id: 'use',
        number: '03',
        title: 'Utilisation responsable et licite',
        summary: "Engagement d'usage intègre sans nuire à la plateforme ni aux autres utilisateurs.",
        paragraphs: [
          "L'utilisateur s'engage à utiliser le site de façon licite, éthique et responsable.",
          "Il est formellement interdit de perturber le fonctionnement du service, d'exploiter d'éventuelles failles logicielles ou de tenter d'altérer le code source.",
          "L'utilisation de robots d'extraction massive (scraping) ou toute action risquant de surcharger les infrastructures est proscrite."
        ],
        keyPoints: [
          "Usage individuel et éducatif conforme.",
          "Interdiction des attaques et de l'exploitation de failles.",
          "Respect de la communauté des apprenants."
        ]
      },
      {
        id: 'content',
        number: '04',
        title: 'Contenu pédagogique et absence de garantie de gains',
        summary: "Contenus indicatifs ; les résultats varient et aucun gain n'est garanti.",
        paragraphs: [
          "Les informations et calculateurs proposés sont fournis à titre indicatif. Les résultats concrets dépendent de l'effort, de la pratique et des compétences de chaque individu.",
          "RikouZone ne garantit aucun revenu chiffré, promesse d'embauche ou succès commercial, et rejette toute promesse d'enrichissement facile."
        ],
        note: "Avertissement : Les estimations de revenus sont des simulations basées sur des données de marché et ne constituent pas un engagement financier."
      },
      {
        id: 'ai',
        number: '05',
        title: "Intelligence artificielle (Rikou AI)",
        summary: "Les réponses de l'IA sont une aide créative et doivent être vérifiées par l'utilisateur.",
        paragraphs: [
          "L'assistant Rikou AI est mis à disposition pour faciliter la réflexion créative et la vulgarisation des concepts.",
          "Les réponses formulées par l'IA peuvent comporter des inexactitudes ou des erreurs. L'utilisateur doit vérifier de manière indépendante toute information critique avant de s'y fier.",
          "RikouZone décline toute responsabilité quant aux décisions prises sur la seule base des suggestions de l'IA."
        ],
        keyPoints: [
          "Outil d'assistance et non source infaillible.",
          "Responsabilité de vérification incombant à l'utilisateur."
        ]
      },
      {
        id: 'ip',
        number: '06',
        title: 'Propriété intellectuelle',
        summary: 'Protection de la marque et des créations RikouZone.',
        paragraphs: [
          "L'ensemble des éléments de la plateforme (nom, logo, charte visuelle, cursus originaux et code) sont la propriété exclusive de RikouZone et de son fondateur.",
          "L'accès aux contenus est réservé à un usage privé et non commercial. Toute reproduction ou revente sans autorisation écrite est prohibée.",
          "Les marques et logiciels tiers cités dans les cours appartiennent à leurs titulaires respectifs et sont mentionnés dans un but purement éducatif."
        ]
      },
      {
        id: 'ads',
        number: '07',
        title: 'Publicités et liens externes',
        summary: 'Les services tiers sont régis par leurs propres conditions et politiques.',
        paragraphs: [
          "RikouZone peut afficher des annonces de régies publicitaires partenaires ou proposer des liens vers des outils tiers utiles à l'apprentissage.",
          "Les sites externes sont soumis à leurs propres conditions. RikouZone n'endosse ni ne garantit les produits ou services des annonceurs tiers.",
          "L'utilisateur interagit avec les sites tiers sous sa propre responsabilité."
        ]
      },
      {
        id: 'availability',
        number: '08',
        title: 'Disponibilité et mises à jour',
        summary: 'Services susceptibles dévoluer ou d’être temporairement suspendus pour maintenance.',
        paragraphs: [
          "Bien que nous veillions à la continuité du service, certaines fonctionnalités peuvent être adaptées, mises à jour ou momentanément interrompues pour maintenance technique.",
          "RikouZone se réserve le droit de modifier les présentes conditions selon l'évolution du service, avec mention de la date en tête de page."
        ]
      },
      {
        id: 'liability',
        number: '09',
        title: 'Limitation de responsabilité',
        summary: 'Encadrement raisonnable sans déroger aux droits légaux impératifs.',
        paragraphs: [
          "Les services sont fournis en l'état et selon disponibilité. Dans la limite autorisée par la loi, RikouZone ne saurait être tenue responsable des dommages indirects découlant de l'utilisation du site.",
          "Rien dans ces conditions ne saurait exclure des responsabilités dont la loi ne permet pas de s'exonérer légalement."
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Contact et échanges officiels',
        summary: 'Canaux officiels pour poser vos questions relatives aux conditions.',
        paragraphs: [
          "Pour toute question ou demande de précision concernant ces conditions d'utilisation, vous pouvez nous écrire directement par email ou via la page de contact.",
          `Adresse email officielle : ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          "Écoute attentive de vos demandes.",
          "Réponse dans les meilleurs délais."
        ]
      }
    ]
  },
  es: {
    badge: 'Documento Legal Oficial · RikouZone 2026',
    title: 'Términos de uso',
    subtitle: 'Lee atentamente estos términos de uso antes de navegar o utilizar RikouZone. Este documento establece el marco normativo y los derechos mutuos de nuestra comunidad.',
    breadcrumbHome: 'Inicio',
    breadcrumbTerms: 'Términos de uso',
    backToHome: 'Volver al Inicio',
    lastUpdatedLabel: 'Última actualización:',
    lastUpdatedValue: '11 de octubre de 2026',
    quickNavTitle: 'Índice de los términos',
    explorePathsBtn: 'Explorar rutas de aprendizaje',
    contactBtn: 'Contáctanos',
    copyEmailBtn: 'Copiar correo oficial',
    copiedEmailBtn: '¡Correo copiado!',
    sendEmailDirectBtn: 'Enviar correo directo',
    needClarificationTitle: '¿Tienes alguna duda sobre los términos?',
    needClarificationDesc: 'El equipo de RikouZone está a tu disposición para aclarar cualquier duda sobre las normas de la plataforma a través de los canales oficiales.',
    footerNote: 'Estos términos garantizan un entorno educativo honesto, seguro y transparente para todos los creadores.',
    disclaimerPill: 'Documento oficial vigente',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introducción y aceptación de los términos',
        summary: 'El uso de la plataforma implica el conocimiento y la aceptación plena de estos términos.',
        paragraphs: [
          'Bienvenido a RikouZone. Estos Términos de uso regulan tu acceso y navegación por todas las páginas, cursos y herramientas de la plataforma.',
          'Al acceder a la web o utilizar cualquiera de sus contenidos, reconoces haber leído y aceptado cumplir con estas condiciones en la medida permitida por la legislación aplicable.',
          'Si no estás de acuerdo con alguna parte de estos términos, debes abstenerte de utilizar la plataforma.'
        ],
        keyPoints: [
          'Aplicable a todos los usuarios desde el primer acceso.',
          'Cumplimiento de las normas digitales y legales vigentes.'
        ]
      },
      {
        id: 'nature',
        number: '02',
        title: 'Naturaleza y misión de la plataforma',
        summary: 'Plataforma independiente dedicada a la educación digital y habilidades prácticas.',
        paragraphs: [
          'RikouZone es un espacio formativo enfocado en la educación digital y creación de contenido. Su propósito es orientar a los usuarios para adquirir habilidades reales y conocer oportunidades en la economía digital.',
          'Todos los cursos, calculadoras y recursos interactivos tienen un fin estrictamente orientativo y educativo, y no constituyen asesoría financiera ni legal.'
        ],
        keyPoints: [
          'Fin formativo, práctico y divulgativo.',
          'Enfoque en el desarrollo de capacidades auténticas.'
        ]
      },
      {
        id: 'use',
        number: '03',
        title: 'Uso responsable y legítimo',
        summary: 'Compromiso de utilizar el sitio de forma responsable y sin causar perjuicios.',
        paragraphs: [
          'El usuario debe utilizar RikouZone de manera legal, ética y responsable, respetando a la comunidad.',
          'Queda prohibido intentar alterar el funcionamiento del sitio, explotar vulnerabilidades de seguridad o intentar descifrar el código fuente.',
          'No se permite el raspado masivo automatizado (scraping) ni cualquier actividad que sobrecargue los servidores de la plataforma.'
        ],
        keyPoints: [
          'Uso personal y pedagógico exclusivamente.',
          'Prohibición de ataques cibernéticos y abusos técnicos.',
          'Cuidado de la experiencia de los demás aprendices.'
        ]
      },
      {
        id: 'content',
        number: '04',
        title: 'Contenido educativo y aviso de resultados',
        summary: 'El contenido es orientativo; los resultados varían y no se garantizan ingresos.',
        paragraphs: [
          'Los materiales educativos y simuladores se facilitan como guía de aprendizaje. Los resultados dependen del esfuerzo individual, la práctica constante y el contexto del mercado.',
          'RikouZone no garantiza ingresos económicos determinados ni contratación inmediata, y se desmarca tajantemente de promesas engañosas de ganancias fáciles.'
        ],
        note: 'Aviso: Los cálculos de ingresos son simulaciones didácticas y no representan compromisos contractuales.'
      },
      {
        id: 'ai',
        number: '05',
        title: 'Inteligencia artificial (Rikou AI)',
        summary: 'Las respuestas de la IA son sugerencias y requieren verificación previa por parte del usuario.',
        paragraphs: [
          'RikouZone ofrece el asistente Rikou AI como herramienta de apoyo para generar ideas y facilitar el estudio.',
          'Las respuestas de la inteligencia artificial pueden contener imprecisiones o datos desactualizados. Es responsabilidad del usuario contrastar información crítica antes de actuar.',
          'RikouZone no se responsabiliza de decisiones tomadas basándose únicamente en el contenido generado por IA.'
        ],
        keyPoints: [
          'Herramienta de ayuda creativa y no fuente infalible.',
          'Responsabilidad del usuario al verificar datos esenciales.'
        ]
      },
      {
        id: 'ip',
        number: '06',
        title: 'Propiedad intelectual',
        summary: 'Protección de la marca RikouZone y respeto a los derechos de terceros.',
        paragraphs: [
          'Todos los derechos de propiedad intelectual del nombre, logo, diseños, estructura y textos originales pertenecen exclusivamente a RikouZone y a su creador.',
          'El material se suministra para uso personal y educativo. Queda prohibida la reproducción o comercialización sin autorización expresa.',
          'Las marcas y aplicaciones de terceros mencionadas en los tutoriales pertenecen a sus respectivos propietarios y se citan únicamente con fines formativos.'
        ]
      },
      {
        id: 'ads',
        number: '07',
        title: 'Publicidad y enlaces a terceros',
        summary: 'Los servicios externos están regulados por las condiciones de sus respectivos titulares.',
        paragraphs: [
          'El sitio puede mostrar anuncios de redes publicitarias externas o enlaces a herramientas de terceros de utilidad para el usuario.',
          'Las plataformas externas se rigen por sus propias políticas. RikouZone no avala ni garantiza los productos o servicios ofrecidos por terceros.',
          'El usuario asume la responsabilidad total al acceder a sitios externos.'
        ]
      },
      {
        id: 'availability',
        number: '08',
        title: 'Disponibilidad del servicio y cambios',
        summary: 'Las funciones pueden evolucionar o suspenderse temporalmente por mantenimiento.',
        paragraphs: [
          'Procuramos mantener un funcionamiento óptimo continuo, pero ciertas funciones pueden ser actualizadas o interrumpirse temporalmente por tareas de mantenimiento.',
          'RikouZone se reserva el derecho de modificar estos términos cuando sea necesario, reflejando la fecha actualizada en el encabezado.'
        ]
      },
      {
        id: 'liability',
        number: '09',
        title: 'Limitación de responsabilidad',
        summary: 'Límites justos sin renunciar a derechos legales de protección al consumidor.',
        paragraphs: [
          'Los servicios se ofrecen "tal cual" y según disponibilidad. En la medida que la ley lo permita, RikouZone no será responsable de daños indirectos derivados del uso de la plataforma.',
          'Estos términos no limitan responsabilidades que la legislación aplicable no permita renunciar o excluir por vía contractual.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Contacto y canales oficiales',
        summary: 'Canales oficiales para formular dudas sobre los términos y la plataforma.',
        paragraphs: [
          'Si tienes preguntas o necesitas aclarar cualquier punto de estos términos, puedes escribirnos por correo o a través de nuestra página de contacto.',
          `Correo electrónico oficial: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'Atención directa y cercana a la comunidad.',
          'Respuesta oportuna a través de las vías oficiales.'
        ]
      }
    ]
  },
  de: {
    badge: 'Offizielles Rechtsdokument · RikouZone 2026',
    title: 'Nutzungsbedingungen',
    subtitle: 'Bitte lesen Sie diese Nutzungsbedingungen aufmerksam durch, bevor Sie RikouZone nutzen. Dieses Dokument regelt die faire Nutzung und gegenseitige Rechte.',
    breadcrumbHome: 'Startseite',
    breadcrumbTerms: 'Nutzungsbedingungen',
    backToHome: 'Zurück zur Startseite',
    lastUpdatedLabel: 'Zuletzt aktualisiert:',
    lastUpdatedValue: '11. Oktober 2026',
    quickNavTitle: 'Inhaltsübersicht',
    explorePathsBtn: 'Lernpfade erkunden',
    contactBtn: 'Kontakt aufnehmen',
    copyEmailBtn: 'Offizielle E-Mail kopieren',
    copiedEmailBtn: 'E-Mail kopiert!',
    sendEmailDirectBtn: 'Direkte E-Mail senden',
    needClarificationTitle: 'Haben Sie Fragen zu den Bedingungen?',
    needClarificationDesc: 'Das RikouZone-Team steht Ihnen über die offiziellen Kontaktkanäle gerne für Fragen zur Verfügung.',
    footerNote: 'Diese Richtlinien schaffen ein sicheres, transparentes und faires Lernumfeld für alle Creator und Lernenden.',
    disclaimerPill: 'Gültiges Dokument',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Einleitung und Zustimmung zu den Bedingungen',
        summary: 'Die Nutzung der Plattform gilt als verbindliche Zustimmung zu diesen Bedingungen.',
        paragraphs: [
          'Willkommen bei RikouZone. Diese Nutzungsbedingungen stellen eine Vereinbarung über die Nutzung unserer Website, Lerninhalte und digitalen Tools dar.',
          'Mit dem Zugriff auf die Plattform erklären Sie sich im gesetzlich zulässigen Rahmen mit der Einhaltung dieser Bedingungen einverstanden.',
          'Wenn Sie diesen Bestimmungen nicht zustimmen, bitten wir Sie, die Nutzung der Plattform einzustellen.'
        ],
        keyPoints: [
          'Gültig für alle Besucher ab dem ersten Zugriff.',
          'Einhaltung der geltenden rechtlichen Bestimmungen.'
        ]
      },
      {
        id: 'nature',
        number: '02',
        title: 'Natur und Zweck der Plattform',
        summary: 'Eine Bildungsplattform für digitale Kompetenzen und Content Creation.',
        paragraphs: [
          'RikouZone ist eine Plattform für digitale Bildung, die Lernenden hilft, praxisnahe Fähigkeiten zu erwerben und Online-Möglichkeiten seriös zu erkunden.',
          'Alle Leitfäden und Rechner dienen ausschließlich Bildungs- und Orientierungszwecken und stellen keine Finanz- oder Rechtsberatung dar.'
        ],
        keyPoints: [
          'Reine Bildungs- und Praxisausrichtung.',
          'Fokus auf eigenständigen Kompetenzaufbau.'
        ]
      },
      {
        id: 'use',
        number: '03',
        title: 'Verantwortungsvolle und rechtmäßige Nutzung',
        summary: 'Verpflichtung zu rechtmäßigem Verhalten ohne Beeinträchtigung der Plattform.',
        paragraphs: [
          'Die Plattform darf nur für rechtmäßige und ethische Zwecke genutzt werden.',
          'Jegliche Versuche, den Dienst zu stören, Sicherheitslücken auszunutzen oder Quellcodes unbefugt zu analysieren, sind untersagt.',
          'Automatisiertes Scraping und übermäßige Bot-Zugriffe, die Serverressourcen überlasten, sind verboten.'
        ],
        keyPoints: [
          'Ausschließlich persönliche und bildungsbezogene Nutzung.',
          'Verbot von Cyberangriffen und Sicherheitsausbeutung.',
          'Schutz der Plattformintegrität.'
        ]
      },
      {
        id: 'content',
        number: '04',
        title: 'Bildungsinhalte und Ergebnishinweis',
        summary: 'Inhalte sind orientierend; Ergebnisse variieren und Einnahmen sind nicht garantiert.',
        paragraphs: [
          'Die Lerninhalte und Rechenmodelle sind didaktische Hilfsmittel. Reale Ergebnisse hängen von Fleiß, Praxis und Marktbedingungen ab.',
          'RikouZone gibt keinerlei Garantien für finanzielle Erträge oder Jobvermittlungen und distanziert sich ausdrücklich von schnellen Reichtumsversprechen.'
        ],
        note: 'Hinweis: Ertragsschätzungen sind Orientierungswerte und stellen keine verbindliche Zusage dar.'
      },
      {
        id: 'ai',
        number: '05',
        title: 'Künstliche Intelligenz (Rikou AI)',
        summary: 'KI-Antworten dienen der Unterstützung und sollten stets verifiziert werden.',
        paragraphs: [
          'Rikou AI dient der Ideenfindung und didaktischen Unterstützung.',
          'Antworten können Ungenauigkeiten oder veraltete Informationen enthalten. Nutzer sollten wichtige Daten vor einer Entscheidung unabhängig prüfen.',
          'RikouZone übernimmt keine Haftung für Handlungen, die ausschließlich auf KI-generierten Inhalten beruhen.'
        ],
        keyPoints: [
          'Unterstützendes Werkzeug, keine fehlerfreie Quelle.',
          'Prüfpflicht liegt beim Nutzer.'
        ]
      },
      {
        id: 'ip',
        number: '06',
        title: 'Geistiges Eigentum',
        summary: 'Schutz der RikouZone-Markenrechte und Respekt vor Rechten Dritter.',
        paragraphs: [
          'Alle Urheber- und Markenrechte an RikouZone, Logos, Designs und Originaltexten liegen beim Gründer und der Plattform.',
          'Die Inhalte sind ausschließlich für den persönlichen Bildungsgebrauch bestimmt. Eine kommerzielle Weiterverbreitung ist unzulässig.',
          'Erwähnte Drittanbieter-Tools gehören ihren jeweiligen Inhabern und werden nur zu Anschauungszwecken genannt.'
        ]
      },
      {
        id: 'ads',
        number: '07',
        title: 'Werbung und externe Links',
        summary: 'Externe Inhalte und Anzeigen unterliegen den Richtlinien der jeweiligen Anbieter.',
        paragraphs: [
          'RikouZone kann Anzeigen von Drittanbietern oder Links zu externen Diensten enthalten.',
          'Für externe Seiten gelten deren eigene Bedingungen. RikouZone übernimmt keine Gewähr für Angebote dritter Werbetreibender.',
          'Die Interaktion mit externen Links erfolgt auf eigene Verantwortung.'
        ]
      },
      {
        id: 'availability',
        number: '08',
        title: 'Verfügbarkeit und Änderungen',
        summary: 'Funktionen können gewartet oder angepasst werden; Bedingungen werden fortlaufend aktualisiert.',
        paragraphs: [
          'Wir bemühen uns um hohe Verfügbarkeit, behalten uns jedoch temporäre Wartungsfenster oder Funktionsanpassungen vor.',
          'RikouZone behält sich vor, diese Bedingungen bei Bedarf anzupassen; maßgeblich ist das Datum oben auf dieser Seite.'
        ]
      },
      {
        id: 'liability',
        number: '09',
        title: 'Haftungsbeschränkung',
        summary: 'Angemessene Haftungsbegrenzung unter Wahrung zwingender Verbraucherrechte.',
        paragraphs: [
          'Die Dienste werden „wie besehen“ bereitgestellt. Die Haftung für indirekte Schäden wird im gesetzlich maximal zulässigen Rahmen beschränkt.',
          'Gesetzlich unverzichtbare Verbraucherrechte bleiben von diesen Bedingungen unberührt.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Kontakt und offizielle Anfragen',
        summary: 'Offizielle Kanäle für rechtliche oder inhaltliche Rückfragen.',
        paragraphs: [
          'Bei Fragen zu diesen Bedingungen können Sie uns jederzeit direkt per E-Mail oder über die Kontaktseite kontaktieren.',
          `Offizielle E-Mail-Adresse: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'Offene Kommunikation mit unseren Nutzern.',
          'Schnelle Beantwortung aller Anfragen.'
        ]
      }
    ]
  },
  it: {
    badge: 'Documento Legale Ufficiale · RikouZone 2026',
    title: 'Termini di utilizzo',
    subtitle: 'Si prega di leggere attentamente questi termini prima di utilizzare RikouZone. Questo documento stabilisce le regole di utilizzo e i diritti reciproci.',
    breadcrumbHome: 'Home',
    breadcrumbTerms: 'Termini di utilizzo',
    backToHome: 'Torna alla Home',
    lastUpdatedLabel: 'Ultimo aggiornamento:',
    lastUpdatedValue: '11 ottobre 2026',
    quickNavTitle: 'Indice dei termini',
    explorePathsBtn: 'Esplora percorsi di apprendimento',
    contactBtn: 'Contattaci',
    copyEmailBtn: 'Copia email ufficiale',
    copiedEmailBtn: 'Email copiata!',
    sendEmailDirectBtn: 'Invia email diretta',
    needClarificationTitle: 'Hai domande sui termini?',
    needClarificationDesc: 'Il team di RikouZone è disponibile per chiarire qualsiasi dubbio tramite i canali di contatto ufficiali.',
    footerNote: 'Questi termini garantiscono un ambiente didattico trasparente e costruttivo per tutti gli utenti.',
    disclaimerPill: 'Documento ufficiale valido',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introduzione e accettazione dei termini',
        summary: "L'uso della piattaforma implica la presa visione e l'accettazione di questi termini.",
        paragraphs: [
          'Benvenuto su RikouZone. I presenti Termini di utilizzo disciplinano il tuo accesso e utilizzo delle pagine, corsi e strumenti del sito.',
          'Accedendo al sito, confermi di aver compreso e accettato di rispettare tali termini nei limiti di legge.',
          'Se non concordi con questi termini, ti invitiamo a interrompere la navigazione.'
        ],
        keyPoints: [
          'Applicabile a tutti i visitatori fin dal primo accesso.',
          'Rispetto delle normative digitali applicabili.'
        ]
      },
      {
        id: 'nature',
        number: '02',
        title: 'Natura e missione della piattaforma',
        summary: 'Piattaforma formativa autonoma per competenze digitali e creazione di contenuti.',
        paragraphs: [
          'RikouZone è una piattaforma dedicata alla formazione digitale e alla creazione di contenuti, volta ad aiutare ad acquisire competenze reali e concrete.',
          'Tutti i corsi e i calcolatori hanno natura puramente orientativa ed educativa e non rappresentano consulenze finanziarie o legali.'
        ],
        keyPoints: [
          'Finalità puramente didattiche e formative.',
          'Focus sullo sviluppo autonomo delle competenze.'
        ]
      },
      {
        id: 'use',
        number: '03',
        title: 'Utilizzo lecito e responsabile',
        summary: 'Impegno a utilizzare il servizio in modo corretto e senza arrecare danni.',
        paragraphs: [
          'L’utente deve utilizzare RikouZone in conformità con la legge e l’etica online.',
          'È vietato tentare di compromettere il funzionamento del servizio, sfruttare vulnerabilità o estrarre il codice sorgente.',
          'È proibito lo scraping automatizzato o qualsiasi azione che sovraccarichi i server della piattaforma.'
        ],
        keyPoints: [
          'Utilizzo personale e formativo consentito.',
          'Divieto di attacchi informatici o abusi tecnici.',
          'Rispetto della sicurezza della piattaforma.'
        ]
      },
      {
        id: 'content',
        number: '04',
        title: 'Contenuto didattico ed esclusione di guadagni garantiti',
        summary: 'I contenuti sono orientativi; i risultati variano e non sono previsti guadagni garantiti.',
        paragraphs: [
          'I materiali e i calcolatori sono supporti didattici. I risultati effettivi dipendono dall’impegno personale e dalle dinamiche di mercato.',
          'RikouZone non fornisce garanzie di ricavi economici certi e rigetta categoricamente facili promesse di guadagno rapido.'
        ],
        note: 'Nota: Le stime sono simulazioni basate su benchmark di settore e non costituiscono promesse contrattuali.'
      },
      {
        id: 'ai',
        number: '05',
        title: 'Intelligenza artificiale (Rikou AI)',
        summary: 'Le risposte dell’IA sono orientative e richiedono verifica da parte dell’utente.',
        paragraphs: [
          'L’assistente Rikou AI è fornito per supportare la generazione di idee e la sintesi di nozioni.',
          'Le risposte generate possono contenere imprecisioni. L’utente è tenuto a verificare autonomamente le informazioni prima di prendere decisioni operative.',
          'RikouZone non risponde di decisioni assunte unicamente sui suggerimenti dell’IA.'
        ],
        keyPoints: [
          'Strumento di supporto, non fonte infallibile.',
          'Responsabilità di verifica a carico dell’utente.'
        ]
      },
      {
        id: 'ip',
        number: '06',
        title: 'Proprietà intellettuale',
        summary: 'Tutela del brand RikouZone e rispetto dei diritti di terze parti.',
        paragraphs: [
          'Tutti i diritti di proprietà intellettuale su nome, marchio, grafiche e contenuti originali spettano esclusivamente a RikouZone e al fondatore.',
          'L’accesso è consentito per studio personale; è vietata la riproduzione commerciale non autorizzata.',
          'I marchi di terzi citati nei tutorial appartengono ai rispettivi proprietari e sono menzionati a solo scopo didattico.'
        ]
      },
      {
        id: 'ads',
        number: '07',
        title: 'Pubblicità e link esterni',
        summary: 'I servizi esterni rispondono alle condizioni dei rispettivi proprietari.',
        paragraphs: [
          'Il sito può presentare annunci pubblicitari o collegamenti a piattaforme terze utili al percorso di studio.',
          'I siti esterni rispondono alle proprie informative; RikouZone non fornisce garanzie per servizi o beni di terzi.',
          'L’interazione con link esterni avviene sotto la responsabilità dell’utente.'
        ]
      },
      {
        id: 'availability',
        number: '08',
        title: 'Disponibilità del servizio e variazioni',
        summary: 'Le funzioni possono evolvere o subire pause tecniche di manutenzione.',
        paragraphs: [
          'Ci adoperiamo per la continuità del servizio, ma alcune funzioni possono essere aggiornate o sospese per manutenzione.',
          'RikouZone si riserva il diritto di aggiornare questi termini ogni qualvolta necessario, aggiornando la data in intestazione.'
        ]
      },
      {
        id: 'liability',
        number: '09',
        title: 'Limitazione di responsabilità',
        summary: 'Limitazione ragionevole salvaguardando i diritti inderogabili dei consumatori.',
        paragraphs: [
          'I servizi sono erogati nello stato in cui si trovano. Nei limiti consentiti, RikouZone non è responsabile per danni indiretti derivanti dall’uso del sito.',
          'Non sono escluse le responsabilità che la legge non consente di derogare contrattualmente.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Contatti e comunicazioni ufficiali',
        summary: 'Canali preposti per chiarimenti e comunicazioni.',
        paragraphs: [
          'Per qualsiasi richiesta relativa a questi termini, puoi scriverci direttamente via email o mediante la pagina di contatto.',
          `Email ufficiale di riferimento: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'Apertura al dialogo con la community.',
          'Riscontro tempestivo tramite canali dedicati.'
        ]
      }
    ]
  },
  pt: {
    badge: 'Documento Legal Oficial · RikouZone 2026',
    title: 'Termos de uso',
    subtitle: 'Leia atentamente estes termos antes de navegar ou utilizar a plataforma RikouZone. Este documento estabelece as regras e os direitos mútuos.',
    breadcrumbHome: 'Início',
    breadcrumbTerms: 'Termos de uso',
    backToHome: 'Voltar ao Início',
    lastUpdatedLabel: 'Última atualização:',
    lastUpdatedValue: '11 de outubro de 2026',
    quickNavTitle: 'Índice dos termos',
    explorePathsBtn: 'Explorar trilhas de aprendizado',
    contactBtn: 'Fale Conosco',
    copyEmailBtn: 'Copiar e-mail oficial',
    copiedEmailBtn: 'E-mail copiado!',
    sendEmailDirectBtn: 'Enviar e-mail direto',
    needClarificationTitle: 'Dúvidas sobre os termos?',
    needClarificationDesc: 'A equipe RikouZone está à disposição para esclarecer qualquer dúvida sobre as diretrizes da plataforma.',
    footerNote: 'Estes termos garantem um ambiente educativo ético, seguro e transparente para todos os criadores.',
    disclaimerPill: 'Documento oficial vigente',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: 'Introdução e aceitação dos termos',
        summary: 'O uso da plataforma representa concordância plena com as presentes regras.',
        paragraphs: [
          'Boas-vindas ao RikouZone. Estes Termos de uso regem seu acesso a todas as páginas, cursos e ferramentas disponíveis na plataforma.',
          'Ao utilizar o site, você reconhece que leu, compreendeu e concordou em cumprir estes termos dentro do que a lei aplicável permite.',
          'Caso discorde de qualquer disposição, solicitamos que interrompa a navegação na plataforma.'
        ],
        keyPoints: [
          'Válido para todos os usuários a partir do primeiro acesso.',
          'Cumprimento rigoroso da legislação vigente.'
        ]
      },
      {
        id: 'nature',
        number: '02',
        title: 'Natureza e missão da plataforma',
        summary: 'Plataforma independente de capacitação digital e criação de conteúdo.',
        paragraphs: [
          'RikouZone é uma plataforma de educação digital que visa auxiliar no aprendizado de habilidades práticas e na exploração do mercado online.',
          'Todos os conteúdos e simuladores possuem finalidade unicamente educativa e não configuram aconselhamento financeiro ou jurídico.'
        ],
        keyPoints: [
          'Finalidade puramente didática e orientadora.',
          'Foco no desenvolvimento pessoal e técnico.'
        ]
      },
      {
        id: 'use',
        number: '03',
        title: 'Uso responsável e legal',
        summary: 'Compromisso de utilização ética sem prejuízo à estabilidade do site.',
        paragraphs: [
          'O usuário deve utilizar o site de forma lícita, respeitando as boas práticas digitais.',
          'É expressamente proibido tentar desestabilizar os serviços, explorar vulnerabilidades ou realizar engenharia reversa do código.',
          'São vedadas coletas automatizadas em massa (scraping) que sobrecarreguem servidores ou afetem outros usuários.'
        ],
        keyPoints: [
          'Uso estritamente pessoal e educativo.',
          'Proibição de invasões ou abuso de vulnerabilidades.',
          'Preservação da comunidade de estudantes.'
        ]
      },
      {
        id: 'content',
        number: '04',
        title: 'Conteúdo didático e aviso sobre ganhos financeiros',
        summary: 'Conteúdo orientativo; resultados são individuais e ganhos não são prometidos.',
        paragraphs: [
          'Os materiais didáticos e calculadoras são ferramentas de apoio ao estudo. Resultados concretos dependem da prática, consistência e mercado.',
          'RikouZone não garante rendimentos fixos ou empregos imediatos, rejeitando expressamente promessas ilusórias de enriquecimento rápido.'
        ],
        note: 'Aviso: Estimativas numéricas são modelos teóricos de mercado e não garantem retornos financeiros.'
      },
      {
        id: 'ai',
        number: '05',
        title: 'Inteligência artificial (Rikou AI)',
        summary: 'Respostas da IA são sugestões criativas e exigem verificação prévia.',
        paragraphs: [
          'O assistente Rikou AI é oferecido para estimular o brainstorming e o esclarecimento de dúvidas.',
          'As respostas geradas por IA podem conter imprecisões. Cabe ao usuário verificar informações importantes antes de tomar decisões práticas.',
          'RikouZone não se responsabiliza por decisões tomadas exclusivamente com base nas respostas da IA.'
        ],
        keyPoints: [
          'Ferramenta auxiliar de apoio e não fonte incontestável.',
          'Dever de conferência a cargo do usuário.'
        ]
      },
      {
        id: 'ip',
        number: '06',
        title: 'Propriedade intelectual',
        summary: 'Proteção aos ativos RikouZone e respeito a marcas terceiras.',
        paragraphs: [
          'A marca RikouZone, logotipos, materiais e conteúdos originais pertencem exclusivamente à plataforma e ao fundador.',
          'O acesso é concedido para aprendizado pessoal. É vedada a revenda ou reprodução comercial não autorizada.',
          'Marcas e softwares de terceiros citados pertencem aos respectivos titulares e são mencionados para fins didáticos.'
        ]
      },
      {
        id: 'ads',
        number: '07',
        title: 'Publicidade e links de terceiros',
        summary: 'Serviços externos obedecem às políticas dos seus respectivos proprietários.',
        paragraphs: [
          'RikouZone pode exibir anúncios de redes parceiras ou disponibilizar links para ferramentas externas de apoio.',
          'Ambientes externos possuem termos próprios. RikouZone não garante produtos ou serviços anunciados por terceiros.',
          'O usuário é o único responsável pela navegação em links externos.'
        ]
      },
      {
        id: 'availability',
        number: '08',
        title: 'Disponibilidade e alterações do serviço',
        summary: 'Recursos podem evoluir ou pausar temporariamente para manutenção.',
        paragraphs: [
          'Buscamos manter o serviço estável, porém recursos podem sofrer manutenções e ajustes sem aviso prévio.',
          'RikouZone reserva-se o direito de atualizar estes termos quando conveniente, mantendo a data visível no topo.'
        ]
      },
      {
        id: 'liability',
        number: '09',
        title: 'Limitação de responsabilidade',
        summary: 'Limites razoáveis preservando direitos legais e garantias imperativas.',
        paragraphs: [
          'Os serviços são fornecidos "como estão". Na extensão permitida pela lei, a plataforma não responde por danos indiretos relativos ao uso do site.',
          'Nada nestes termos afasta responsabilidades das quais a legislação em vigor não permita renúncia.'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: 'Contato e canais oficiais',
        summary: 'Canais oficiais para envio de dúvidas e esclarecimentos.',
        paragraphs: [
          'Para quaisquer dúvidas ou observações sobre estes termos, entre em contato pelo e-mail oficial ou pela página de contato.',
          `E-mail oficial de contato: ${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          'Atendimento solícito aos membros da comunidade.',
          'Respostas ágeis através dos meios oficiais.'
        ]
      }
    ]
  },
  zh: {
    badge: '官方正式法律文件 · RikouZone 2026',
    title: '使用条款',
    subtitle: '在浏览或使用 RikouZone 平台前，请务必仔细阅读本使用条款。本文档阐明了平台的使用准则、用户义务及各方合法权益。',
    breadcrumbHome: '首页',
    breadcrumbTerms: '使用条款',
    backToHome: '返回首页',
    lastUpdatedLabel: '最后更新日期：',
    lastUpdatedValue: '2026年10月11日',
    quickNavTitle: '条款章节导航',
    explorePathsBtn: '探索技能学习路线',
    contactBtn: '联系我们',
    copyEmailBtn: '复制官方邮箱',
    copiedEmailBtn: '邮箱已复制！',
    sendEmailDirectBtn: '直接发送邮件',
    needClarificationTitle: '对条款内容有疑问？',
    needClarificationDesc: 'RikouZone 团队随时欢迎您就平台条款、版权政策或使用规则通过官方沟通渠道与我们取得联系。',
    footerNote: '制定本条款旨在为全体创作者与学员维护一个安全、透明、注重实效的数字化成长生态。',
    disclaimerPill: '现行有效官方文本',
    sections: [
      {
        id: 'intro',
        number: '01',
        title: '前言与条款接受',
        summary: '访问并使用本平台即代表您已充分知晓并同意遵守本条款。',
        paragraphs: [
          '欢迎访问 RikouZone。本使用条款构成您与本平台之间具有法律约束力的协议，规范您对平台内所有页面、学习路线与实用工具的访问和使用。',
          '当您进入网站或使用其中任何内容时，即表明您在适用法律所允许的范围内，完全认可并同意遵守本条款的所有规定。',
          '如果您不同意本条款的任何部分，请立即停止浏览并退出使用本平台。'
        ],
        keyPoints: [
          '自首次访问平台起即对所有访客与学员生效。',
          '严格遵守所适用的本地及国际互联网相关法律法规。'
        ]
      },
      {
        id: 'nature',
        number: '02',
        title: '平台性质与教育宗旨',
        summary: '专注于数字技能教学与内容创作实践的独立教育平台。',
        paragraphs: [
          'RikouZone 是一所致力于数字技能普及与内容创作实训的在线平台，旨在帮助初学者掌握扎实的数字技能、洞察自媒体商业模式，并清晰探索真实的在线自由职业与创业机会。',
          '本平台上提供的所有学习路线、教程指南、估算测算器及实训体系仅供教学与指导参考，不构成任何形式的商业投资、法律或强制性财务建议。'
        ],
        keyPoints: [
          '纯粹的教学、实战指导与技能培训导向。',
          '注重个人技能体系与长期竞争力的沉淀。'
        ]
      },
      {
        id: 'use',
        number: '03',
        title: '合法与负责任的使用规范',
        summary: '承诺在守法合规的前提下诚实使用，不得危害平台及其他用户。',
        paragraphs: [
          '用户在使用 RikouZone 时，必须遵守法律法规与网络道德规范，秉持负责任的良善态度。',
          '严禁以任何手段尝试破坏网站的正常运行、恶意探测或利用安全漏洞、发起拒绝服务攻击，或对平台代码进行未经授权的逆向工程。',
          '严禁使用自动化爬虫工具进行非常规的高频内容采集，或进行任何可能造成服务器过载、损害平台或其他用户合法权益的行为。'
        ],
        keyPoints: [
          '仅限合法的个人学习与非商业教学用途。',
          '严令禁止网络攻击与漏洞利用。',
          '共同维护安全健康的平台运行秩序。'
        ]
      },
      {
        id: 'content',
        number: '04',
        title: '教学内容与收益免责声明',
        summary: '内容仅作启发与参考；个人成果因人而异，平台不保证任何具体经济收益。',
        paragraphs: [
          'RikouZone 提供的教学资料、行业案例与测算工具旨在帮助学员建立认知。学员的实际收获与成效因个人努力、执行力、实践积累及市场客观环境而存在差异。',
          '本平台绝不承诺任何确定性的财富回报、保底收入或就职保证，并坚决抵制任何形式的一夜暴富等虚假宣传。'
        ],
        note: '特别说明：测算工具中的预估数据与行业指标仅为教学模拟模型，不构成任何商业承诺。'
      },
      {
        id: 'ai',
        number: '05',
        title: '人工智能工具免责 (Rikou AI)',
        summary: 'AI 输出属于头脑风暴参考辅助，关键决策必须由人工二次复核。',
        paragraphs: [
          '平台内置的 Rikou AI 助手旨在辅助用户进行创意发散、概念理解和脚本思路梳理。',
          '人工智能模型生成的回答可能存在偏差、疏漏或未能及时更新的信息。用户在将其用于重大商业、技术或法律决策前，应进行独立核查。',
          'RikouZone 对仅凭 AI 回答所作出的单方面决策及其后果不承担任何法律连带责任。'
        ],
        keyPoints: [
          'AI 仅为辅助启发工具，并非绝对权威或无差错来源。',
          '独立核实与审慎采纳系用户自身的责任。'
        ]
      },
      {
        id: 'ip',
        number: '06',
        title: '知识产权与版权声明',
        summary: '切实保护 RikouZone 自主知识产权，同时充分尊重第三方权益。',
        paragraphs: [
          'RikouZone 的品牌名称、标识、设计风格、原创课程体系、前端架构及文本内容均属于平台及其创办者专属所有，受知识产权法律严格保护。',
          '学员享有用于个人学习与非营利研究的使用权利。未经书面许可，严禁擅自翻录、转售或用于商业性搬运。',
          '课程中所提及的第三方软件、平台名称与商标均归其各自合法权利人所有，提及仅用于教学说明。'
        ]
      },
      {
        id: 'ads',
        number: '07',
        title: '第三方广告与外链说明',
        summary: '平台可能展示第三方广告或外链，其服务均受各自独立政策规约。',
        paragraphs: [
          '为了保障平台良性运转，RikouZone 可能会展示来自合规第三方联盟的广告，或附带通往优质外部工具的指引链接。',
          '所有外部网站与服务均由其各自的运营方独立负责并受其独立条款约束。RikouZone 不对第三方广告主的商品质量或履约能力作担保。',
          '用户在点击外部链接或进行交易时应自行审慎评估风险。'
        ]
      },
      {
        id: 'availability',
        number: '08',
        title: '服务可用性与动态调整',
        summary: '平台功能可能因迭代维护而调整，条款内容亦将按需适时修订。',
        paragraphs: [
          '我们竭诚维护系统的平稳运行，但为进行系统优化或安全维护，部分功能可能会进行改版、升级或短暂停机，恕不另行个别通知。',
          'RikouZone 保留在必要时更新本使用条款的权利，修改后的条款一经在本页面公布即行生效，并同步更新上方日期。'
        ]
      },
      {
        id: 'liability',
        number: '09',
        title: '法律责任限制',
        summary: '在法律允许的最大范围内合理界定责任，不免除法定强制性责任。',
        paragraphs: [
          '本平台按“现状”及“现有”基础提供服务。在法律允许的最大限度内，平台方对因使用或无法使用本站导致的间接、附带或衍生性损失不承担责任。',
          '本条款绝不排斥或限制任何法律明文规定不得通过约定进行免除或限制的法定消费者权益。'
        ]
      },
      {
        id: 'contact',
        number: '10',
        title: '官方联系与咨询途径',
        summary: '针对本条款及平台使用的官方沟通受理途径。',
        paragraphs: [
          '如果您对本使用条款有任何疑问、建议或需要就特定条款获得进一步说明，欢迎随时通过官方邮箱或站内联系页面与我们取得沟通。',
          `平台官方正式沟通邮箱：${OFFICIAL_CONTACT_EMAIL}`
        ],
        keyPoints: [
          '真诚倾听每一位学习者的宝贵意见。',
          '收到来信后将通过官方途径尽快予以回复。'
        ]
      }
    ]
  }
};

export const TermsOfUseView: React.FC<TermsOfUseViewProps> = ({ onNavigate, onCopyText }) => {
  const { language, isRTL } = useLanguage();
  const [copied, setCopied] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('intro');

  const tTerms = termsI18n[language] || termsI18n.ar;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const BreadcrumbArrow = isRTL ? ChevronLeft : ChevronRight;

  const handleCopyEmail = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(OFFICIAL_CONTACT_EMAIL).then(() => {
          setCopied(true);
          if (onCopyText) {
            onCopyText(OFFICIAL_CONTACT_EMAIL, tTerms.copiedEmailBtn);
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
        onCopyText(OFFICIAL_CONTACT_EMAIL, tTerms.copiedEmailBtn);
      }
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(`terms-sec-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'intro':
        return <ShieldCheck className="h-5 w-5 text-amber-400" />;
      case 'nature':
        return <Compass className="h-5 w-5 text-emerald-400" />;
      case 'use':
        return <FileCheck2 className="h-5 w-5 text-sky-400" />;
      case 'content':
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case 'ai':
        return <Bot className="h-5 w-5 text-purple-400" />;
      case 'ip':
        return <Award className="h-5 w-5 text-indigo-400" />;
      case 'ads':
        return <ExternalLink className="h-5 w-5 text-blue-400" />;
      case 'availability':
        return <RefreshCw className="h-5 w-5 text-orange-400" />;
      case 'liability':
        return <Scale className="h-5 w-5 text-rose-400" />;
      case 'contact':
        return <Mail className="h-5 w-5 text-teal-400" />;
      default:
        return <BookOpen className="h-5 w-5 text-amber-400" />;
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
            <span>{tTerms.breadcrumbHome}</span>
          </button>
          <BreadcrumbArrow className="h-3 w-3 text-zinc-600" />
          <span className="text-amber-400 font-bold">{tTerms.breadcrumbTerms}</span>
        </div>

        <button
          id="terms-back-home-top"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-bold text-zinc-300 hover:border-amber-500/40 hover:text-white hover:bg-zinc-850 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowIcon className="h-3.5 w-3.5 text-amber-400" />
          <span>{tTerms.backToHome}</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-b from-zinc-900/90 via-[#0a0a0d] to-zinc-950 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -top-24 right-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Official Document Badge */}
          <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 mb-4 font-sans">
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
            <span>{tTerms.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Rikou<span className="text-amber-400">Zone</span>
            <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-200 mt-2">
              {tTerms.title}
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-2xl">
            {tTerms.subtitle}
          </p>

          {/* Last Updated Date & Status Badge */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1 text-zinc-400">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span>{tTerms.lastUpdatedLabel}</span>
              <span className="font-semibold text-zinc-200">{tTerms.lastUpdatedValue}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{tTerms.disclaimerPill}</span>
            </div>
          </div>

          {/* Quick Header Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black px-5 py-2.5 text-xs font-black transition-all shadow-md shadow-amber-500/25 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <ArrowIcon className="h-4 w-4" />
              <span>{tTerms.backToHome}</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="rounded-xl border border-zinc-700 bg-zinc-800/80 hover:border-amber-400 hover:text-amber-300 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-2"
            >
              <Mail className="h-4 w-4 text-amber-400" />
              <span>{tTerms.contactBtn}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Quick Navigation Chips / Table of Contents */}
      <div className="mt-8 rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-4 sm:p-5 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 mb-3 px-1">
          <BookOpen className="h-4 w-4 text-amber-400" />
          <span>{tTerms.quickNavTitle}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tTerms.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs transition-all cursor-pointer border ${
                activeSectionId === section.id
                  ? 'border-amber-500/60 bg-amber-500/15 text-amber-300 font-bold shadow-xs'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <span className="text-[10px] text-amber-400/80 font-mono font-bold">{section.number}</span>
              <span className="truncate max-w-[140px] sm:max-w-none">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* The 10 Terms Sections */}
      <div className="mt-8 space-y-6">
        {tTerms.sections.map((section) => (
          <section
            key={section.id}
            id={`terms-sec-${section.id}`}
            className="group rounded-3xl border border-zinc-800/90 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-xl transition-all hover:border-zinc-700/80 scroll-mt-20"
          >
            {/* Section Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800/60 pb-4 mb-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-inner shrink-0 group-hover:border-amber-500/30 transition-colors">
                  {getSectionIcon(section.id)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
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
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Special Highlight/Warning Note if available */}
            {section.note && (
              <div className="mt-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs sm:text-sm text-amber-200/90 flex items-start gap-3">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  {section.note}
                </p>
              </div>
            )}

            {/* Interactive direct actions for Section 10 (Contact) */}
            {section.id === 'contact' && (
              <div className="mt-6 pt-5 border-t border-zinc-800/60 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-mono text-amber-300">
                  <Mail className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{OFFICIAL_CONTACT_EMAIL}</span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-bold text-white hover:border-amber-400 hover:text-amber-300 transition-all cursor-pointer active:scale-95"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? tTerms.copiedEmailBtn : tTerms.copyEmailBtn}</span>
                </button>

                <a
                  href={`mailto:${OFFICIAL_CONTACT_EMAIL}?subject=${encodeURIComponent('استفسار حول شروط الاستخدام - RikouZone')}`}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black px-3.5 py-2 text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{tTerms.sendEmailDirectBtn}</span>
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
                  <span>{tTerms.contactBtn}</span>
                </button>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Help & Questions Banner */}
      <div className="mt-10 rounded-3xl border border-amber-500/25 bg-gradient-to-r from-zinc-900/90 via-zinc-950 to-zinc-900/90 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4 text-center md:text-start flex-col md:flex-row">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">
              {tTerms.needClarificationTitle}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl">
              {tTerms.needClarificationDesc}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('contact')}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black px-5 py-2.5 text-xs font-black transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            <span>{tTerms.contactBtn}</span>
          </button>
          <button
            onClick={() => onNavigate('income')}
            className="rounded-xl border border-zinc-700 bg-zinc-800/80 hover:border-amber-400 hover:text-amber-300 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-2"
          >
            <Compass className="h-4 w-4 text-amber-400" />
            <span>{tTerms.explorePathsBtn}</span>
          </button>
        </div>
      </div>

      {/* Bottom Back Button & Philosophy Note */}
      <div className="mt-8 pt-6 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <p className="text-center sm:text-start">
          {tTerms.footerNote}
        </p>

        <button
          id="terms-back-home-bottom"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 font-bold transition-colors cursor-pointer"
        >
          <ArrowIcon className="h-3.5 w-3.5 text-amber-400" />
          <span>{tTerms.backToHome}</span>
        </button>
      </div>

    </div>
  );
};
