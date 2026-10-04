import { smmModulesPart1 } from './socialMediaModulesPart1';
import { smmModulesPart2, initialCalendarItems } from './socialMediaModulesPart2';
import { smmModulesPart3, realClientProjectsData } from './socialMediaModulesPart3';
import { SmmModule, SmmLesson, RealClientProject, ContentCalendarItem, DifficultyLevel } from './socialMediaDataTypes';

export * from './socialMediaDataTypes';
export { initialCalendarItems } from './socialMediaModulesPart2';
export { realClientProjectsData } from './socialMediaModulesPart3';

export const socialMediaModules: SmmModule[] = [
  ...smmModulesPart1,
  ...smmModulesPart2,
  ...smmModulesPart3
];

export const allSmmLessons: SmmLesson[] = socialMediaModules.flatMap(m => m.lessons);

export const freelancingPackages = [
  {
    id: 'pkg-starter',
    name: 'باقة البداية (Starter)',
    price: '$350 - $450',
    billing: 'شهرياً',
    suitableFor: 'الأنشطة المحلية والمشاريع الناشئة التي تريد تواجداً رقمياً منتظماً.',
    features: [
      '12 منشوراً شهرياً (8 ريلز + 4 كاروسيل)',
      'كتابة الكابشنز والخطافات واختيار الهاشتاجات',
      'جدولة النشر التلقائي في أوقات الذروة',
      'إدارة الردود على التعليقات يومياً',
      'تقرير إحصائي شهري أساسي'
    ],
    highlight: false
  },
  {
    id: 'pkg-growth',
    name: 'باقة النمو والتفاعل (Growth)',
    price: '$650 - $850',
    billing: 'شهرياً',
    suitableFor: 'المتاجر والعيادات والمطاعم التي تهدف لمضاعفة المبيعات والرسائل.',
    features: [
      '18 منشوراً شهرياً (12 ريلز ديناميكي + 6 كاروسيل)',
      'إدارة منصتين (إنستغرام + تيك توك أو فيسبوك)',
      'إدارة مجتمع متقدمة والرد على الرسائل المباشرة DMs',
      'ستوريات تفاعلية أسبوعية (استطلاعات ومسابقات)',
      'تقرير تحليلي مفصل + مكالمة استراتيجية شهرية'
    ],
    highlight: true
  },
  {
    id: 'pkg-dominance',
    name: 'باقة السيطرة والتوسع (Dominance)',
    price: '$1,200 - $1,800',
    billing: 'شهرياً',
    suitableFor: 'الشركات والبراندات الراغبة في هيمنة تسويقية كاملة.',
    features: [
      '26 منشوراً شهرياً عبر 3 منصات متكاملة',
      'صناعة ومونتاج ريلز بجودة فائقة ونصوص متحركة',
      'إدارة كاملة للمجتمع ومحادثات الواتساب البيعية',
      'كتابة ومتابعة إعلانات Meta الممولة لتعزيز المبيعات',
      'تقارير أسبوعية + دعم مباشر واستشارات تطوير'
    ],
    highlight: false
  }
];
