export interface LessonItem {
  id: string;
  moduleId: string;
  number: number;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  summary: string;
  explanation: string[];
  codeExample: {
    language: string;
    filename: string;
    code: string;
  };
  practiceTask: string;
  challenge: {
    title: string;
    description: string;
    hint: string;
    solutionCode: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface MobileModule {
  id: string;
  number: number;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  description: string;
  lessons: LessonItem[];
}

export interface RealMobileProject {
  id: string;
  number: number;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  idea: string;
  planning: string[];
  uiSpecs: string[];
  architecture: string[];
  codeHighlight: {
    language: string;
    filename: string;
    code: string;
  };
  testingChecklist: string[];
  buildSteps: string[];
}

export interface MonetizationModel {
  id: string;
  title: string;
  badge: string;
  description: string;
  potentialIncome: string;
  bestFor: string;
  keySteps: string[];
  topTools: string[];
  proTip: string;
}

export interface FreelanceMobileService {
  title: string;
  priceRange: string;
  deliveryTime: string;
  targetClient: string;
  deliverables: string[];
}

// ============================================================================
// 1. MODULES AND LESSONS (13 TOPICAL CHAPTERS)
// ============================================================================

export const mobileDevelopmentModules: MobileModule[] = [
  // 1. Introduction to Mobile Development
  {
    id: 'intro',
    number: 1,
    title: 'Introduction to Mobile Development',
    level: 'beginner',
    icon: 'Smartphone',
    description: 'Android vs iOS، Native vs Cross-platform، بنية تطبيقات الجوال وكيف تتحول الفكرة إلى تطبيق حي في المتجر.',
    lessons: [
      {
        id: 'intro-ecosystem',
        moduleId: 'intro',
        number: 1,
        title: 'منظومة تطبيقات الجوال: Android مقابل iOS ومسار التطوير',
        level: 'beginner',
        duration: '15 دقيقة',
        summary: 'فهم الفروق التقنية والتجارية بين نظامي Android و iOS، وحصص السوق، ومتطلبات المطور لكل منصة.',
        explanation: [
          'نظام Android يسيطر على أكثر من 70% من الأجهزة عالمياً، بينما يمتلك iOS النسبة الأكبر في القوة الشرائية وإنفاق المستخدمين (خصوصاً في الخليج وأمريكا وأوروبا).',
          'لتطوير تطبيقات iOS تحتاج إلى بيئة عمل بنظام macOS (أو خدمات سحابية مثل Codemagic / Expo Application Services EAS) بينما Android يمكن تطويره على Windows وLinux وMac.',
          'حساب مطور Google Play يتطلب رسماً لمرة واحدة قدره 25$، بينما حساب Apple Developer يتطلب اشتراكاً سنوياً قدره 99$.',
          'مفهوم دورة حياة التطبيق (App Lifecycle): التطبيقات تمر بحالات محددة (Inactive, Active, Background, Suspended, Detached) ويجب التعامل معها للحفاظ على البطارية والذاكرة.'
        ],
        codeExample: {
          language: 'dart',
          filename: 'app_lifecycle_example.dart',
          code: `// Flutter App Lifecycle Listener Example
import 'package:flutter/material.dart';

class LifecycleWatcher extends StatefulWidget {
  const LifecycleWatcher({super.key});

  @override
  State<LifecycleWatcher> createState() => _LifecycleWatcherState();
}

class _LifecycleWatcherState extends State<LifecycleWatcher> with WidgetsBindingObserver {
  AppLifecycleState? _lastState;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    setState(() {
      _lastState = state;
    });
    // تنفيذ إجراء عند دخول التطبيق للخلفية (مثل حفظ البيانات تلقائياً)
    if (state == AppLifecycleState.paused) {
      debugPrint("التطبيق انتقل للخلفية - حفظ الحالة...");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('دورة حياة التطبيق')),
      body: Center(
        child: Text('الحالة الحالية: \${_lastState?.name ?? "نشط"}'),
      ),
    );
  }
}`
        },
        practiceTask: 'حدد فكرة تطبيق خدمي محلي تريد بناءه، وسجل على ورقة المنصة المستهدفة أولاً (Android أو iOS) بناءً على جمهور بلدك وقوتهم الشرائية.',
        challenge: {
          title: 'التعامل مع خروج التطبيق للخلفية في React Native',
          description: 'اكتب كوداً في React Native يستمع لحالة AppState ويطبع رسالة عند تحول التطبيق إلى background.',
          hint: 'استخدم AppState.addEventListener من مكتبة react-native.',
          solutionCode: `import React, { useEffect } from 'react';
import { AppState, Text, View } from 'react-native';

export default function App() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        console.log('📱 التطبيق في الخلفية - حفظ السشن');
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>مراقب حالة التطبيق في React Native</Text>
    </View>
  );
}`
        },
        quiz: {
          question: 'أي من المنصات التالية تحقق عادة أعلى عائد مالي لكل مستخدم من الاشتراكات وعمليات الشراء داخل التطبيق؟',
          options: ['نظام Android', 'نظام iOS (أجهزة Apple)', 'متجر Huawei AppGallery', 'متجر Windows Mobile'],
          correctIndex: 1,
          explanation: 'تاريخياً وإحصائياً، يميل مستخدمو iOS لإنفاق مبالغ أعلى بشكل ملحوظ على الاشتراكات وتطبيقات الإنتاجية والمشتريات الرقمية مقارنة بمستخدمي Android.'
        }
      },
      {
        id: 'intro-native-vs-cross',
        moduleId: 'intro',
        number: 2,
        title: 'Native مقابل Cross-Platform: كيف تختار مسارك؟',
        level: 'beginner',
        duration: '18 دقيقة',
        summary: 'مقارنة شاملة بين التطوير الأصيل (Swift/Kotlin) والأطر المشتركة (Flutter/React Native) وسرعة الوصول للسوق.',
        explanation: [
          'تطوير Native (الأصيل): كتابة كود مستقل لكل نظام (Swift لـ iOS و Kotlin لـ Android). يمنح أقصى أداء وتحكماً مطلقاً في عتاد الجهاز، لكنه يتطلب وقتاً مضاعفاً وميزانية تطوير أعلى.',
          'تطوير Cross-Platform (عبر المنصات): كتابة كود برمجي واحد (Single Codebase) يُترجم ويعمل على كل من Android و iOS في نفس الوقت.',
          'الشركات الناشئة (Startups) والعملاء المستقلون يفضلون في 85% من المشاريع أطر Cross-Platform لأنها توفر 50% من تكلفة ووقت التطوير والتحديث.',
          'معمارية التطبيق الحديثة تتكون من 3 طبقات رئيسية: واجهة المستخدم (Mobile UI)، الخادم وقواعد البيانات (Backend & Database)، وقنوات الاتصال (RESTful APIs / GraphQL).'
        ],
        codeExample: {
          language: 'typescript',
          filename: 'cross_platform_comparison.ts',
          code: `// Decision Matrix: متى تختار Native ومتى تختار Cross-Platform؟
interface TechChoice {
  framework: 'Flutter' | 'React Native' | 'Native iOS (Swift)' | 'Native Android (Kotlin)';
  bestFor: string;
  learningCurve: 'سهل' | 'متوسط' | 'مرتفع';
  renderEngine: string;
}

export const techMatrix: TechChoice[] = [
  {
    framework: 'Flutter',
    bestFor: 'تطبيقات عالية الجاذبية البصرية، متاجر، شركات ناشئة، سرعة قياسية في الإطلاق',
    learningCurve: 'متوسط (Dart)',
    renderEngine: 'Impeller / Skia (يرسم كل بكسل باستقلالية كاملة)'
  },
  {
    framework: 'React Native',
    bestFor: 'فرق عمل تتقن JavaScript / React، تطبيقات تحتاج تكاملاً سلساً مع واجهات الويب',
    learningCurve: 'سهل للمطورين الويب (JS/TS)',
    renderEngine: 'Native Components Bridge / Fabric'
  },
  {
    framework: 'Native iOS (Swift)',
    bestFor: 'تطبيقات الواقع المعزز (ARKit)، ألعاب ثلاثية الأبعاد، معالجة فيديو متقدمة جداً',
    learningCurve: 'مرتفع',
    renderEngine: 'UIKit / SwiftUI مباشرة'
  }
];`
        },
        practiceTask: 'راجع 5 تطبيقات مثبتة على هاتفك وابحث عما إذا كانت مطورة بـ Flutter (مثل Google Pay, Reflectly) أو React Native (مثل Instagram, Shopify, Discord).',
        challenge: {
          title: 'دالة تحديد الإطار الأنسب لمشروع العميل',
          description: 'اكتب دالة بلغة TypeScript تستقبل معايير المشروع (الميزانية، الوقت، والمنصات المطلوبة) وترجع التوصية التقنية الأنسب.',
          hint: 'تحقق مما إذا كان العميل يطلب منصة واحدة بميزانية ضخمة أو منصتين بميزانية محدودة.',
          solutionCode: `function recommendMobileStack(budget: number, platforms: ('ios' | 'android')[], needsAdvancedSensors: boolean): string {
  if (platforms.length === 1 && needsAdvancedSensors) {
    return platforms[0] === 'ios' ? 'Native iOS (Swift + SwiftUI)' : 'Native Android (Kotlin + Jetpack Compose)';
  }
  if (platforms.length > 1 && budget < 10000) {
    return 'Flutter أو React Native كود موحد لتوفير 50% من التكلفة';
  }
  return 'Flutter (أفضل توازن بين الأداء وسرعة التطوير للطرفين)';
}`
        },
        quiz: {
          question: 'ما هي الميزة الأهم لأطر العمل Cross-Platform (مثل Flutter وReact Native) للمستقلين وأصحاب المشاريع؟',
          options: [
            'القدرة على برمجة تطبيقات بدون أي كود إطلاقاً',
            'بناء ونشر تطبيق يعمل على Android وiOS من قاعدة كود برمجية واحدة',
            'إلغاء الحاجة لحساب مطور Google Play وApple Developer',
            'التطبيق لا يحتاج إلى إنترنت للعمل'
          ],
          correctIndex: 1,
          explanation: 'القيمة الكبرى هي كتابة الكود مرة واحدة وتشغيله على النظامين (Single Codebase)، مما يوفر الوقت والتكلفة ويجعل تسليم مشاريع العملاء أسرع بمرتين.'
        }
      }
    ]
  },

  // 2. Mobile Development Technologies
  {
    id: 'technologies',
    number: 2,
    title: 'Mobile Development Technologies',
    level: 'beginner',
    icon: 'Layers',
    description: 'مقارنة عملية معمقة بين Flutter و React Native و Android Native و iOS Native، ومتى تختار كل تقنية.',
    lessons: [
      {
        id: 'tech-flutter-vs-rn',
        moduleId: 'technologies',
        number: 3,
        title: 'Flutter مقابل React Native: المقارنة التقنية الشاملة',
        level: 'beginner',
        duration: '20 دقيقة',
        summary: 'فحص محرك الرسم، أداء لغة Dart مقابل JavaScript، مجتمع المطورين والمكتبات المتاحة.',
        explanation: [
          'فلاتر (Flutter) من Google يعتمد على لغة Dart ويرسم عناصره بنفسه باستخدام محرك رسومي خاص (Impeller)، ما يضمن ظهور الواجهة بنفس الشكل الدقيق 100% على أي جهاز.',
          'رياكت نيتف (React Native) من Meta يعتمد على JavaScript / TypeScript ويستخدم عناصر النظام الأصلية (Native Views)، مما يمنحه شعور النظام الأصيل بسهولة.',
          'ميزة Hot Reload متوفرة في الاثنين وتتيح لك رؤية تعديلات الكود في أقل من ثانية واحدة على الشاشة دون إعادة بناء التطبيق.',
          'توصية المسار: كلا الإطارين احترافيان ومطلوبان بشدة في سوق العمل والحر. سنعتمد في هذا المسار أمثلة عملية بـ Dart/Flutter و TypeScript/React Native لتكون جاهزاً لكل الفرص.'
        ],
        codeExample: {
          language: 'dart',
          filename: 'flutter_counter_card.dart',
          code: `// Flutter: بطاقة تفاعلية مع Hot Reload ودعم الوضعين
import 'package:flutter/material.dart';

class QuickMetricCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;

  const QuickMetricCard({
    super.key,
    required this.title,
    required this.value,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF18181B), // Zinc-900 Dark Theme
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF27272A)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Colors.amber.withOpacity(0.15),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: Colors.amber, size: 24),
          ),
          const SizedBox(width: 14),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(color: Colors.grey, fontSize: 12)),
              Text(value, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
            ],
          ),
        ],
      ),
    );
  }
}`
        },
        practiceTask: 'ثبت Flutter SDK أو Node.js + Expo على جهازك، وافتح المحاكي (Simulator أو Emulator) أو صل هاتفك الحقيقي وشغل تطبيق البداية الترحيبي.',
        challenge: {
          title: 'تحويل مكون البطاقة إلى React Native',
          description: 'اكتب نفس مكون البطاقة السابقة (Icon + Title + Value) باستخدام React Native ومكتبة StyleSheet.',
          hint: 'استخدم View و Text و flexDirection: "row".',
          solutionCode: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MetricCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Text style={{ fontSize: 18 }}>📱</Text>
      </View>
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181B',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#27272A',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    padding: 10,
    borderRadius: 12,
  },
  title: { color: '#A1A1AA', fontSize: 12 },
  value: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }
});`
        },
        quiz: {
          question: 'ما الذي يميز معمارية Flutter الرسومية عن معظم أطر العمل الأخرى؟',
          options: [
            'يعتمد على متصفح ويب داخلي (WebView) مخفي لعرض الصفحات',
            'يرسم كل عنصر وواجهة بنفسه عبر محرك رسومي خاص بكسل ببكسل',
            'لا يمكنه الاتصال بالإنترنت',
            'يعمل فقط على أجهزة سامسونج'
          ],
          correctIndex: 1,
          explanation: 'Flutter لا يستخدم عناصر النظام الأصيل عبر Bridge، بل يتحكم في كل بكسل على الشاشة عبر محرك الرسوميات الخاص به، مما يضمن أداءً سلساً بمعدل 60-120fps.'
        }
      }
    ]
  },

  // 3. Programming Fundamentals
  {
    id: 'programming-fundamentals',
    number: 3,
    title: 'Programming Fundamentals',
    level: 'beginner',
    icon: 'Terminal',
    description: 'أساسيات البرمجة لتطبيقات الموبايل: المتغيرات، الدوال، المصفوفات، الكائنات، البرمجة غير المتزامنة (Async/Await) ومعالجة الأخطاء.',
    lessons: [
      {
        id: 'prog-basics-syntax',
        moduleId: 'programming-fundamentals',
        number: 4,
        title: 'المتغيرات، الأنواع، والشروط في لغات الجوال الحديثة',
        level: 'beginner',
        duration: '18 دقيقة',
        summary: 'تعلم الأنواع المحددة (Type Safety) في Dart و TypeScript وأهميتها في منع انهيار التطبيق (App Crashes).',
        explanation: [
          'أكبر مسبب لإغلاق التطبيقات المفاجئ هو أخطاء القيمة الفارغة (Null Pointer Exceptions). أحدث لغات تطوير الجوال مثل Dart و Swift و Kotlin تعتمد نظام Sound Null Safety.',
          'الأنواع الأساسية: String للنصوص، int/double للأرقام، bool للقيم المنطقية، List للمصفوفات، و Map للبيانات المرتبطة بمفاتيح.',
          'الكلمات المفتاحية: final أو const في Dart (و const في JS) تعني أن القيمة ثابتة ولا تتغير بعد الإنشاء، وهو أمر حاسم في تحسين أداء عناصر الواجهة.',
          'دوال المعالجة: map و where (أو filter) و forEach هي أدواتك اليومية لتحويل قوائم البيانات من الخادم إلى بطاقات معروضة على شاشة الهاتف.'
        ],
        codeExample: {
          language: 'dart',
          filename: 'models_and_types.dart',
          code: `// Dart Null Safety and Data Types
class MobileProduct {
  final String id;
  final String title;
  final double price;
  final bool inStock;
  final String? discountCode; // nullable (قد يكون فارغاً)

  const MobileProduct({
    required this.id,
    required this.title,
    required this.price,
    this.inStock = true,
    this.discountCode,
  });

  // حساب السعر بعد الخصم
  double getFinalPrice() {
    if (discountCode != null && discountCode == 'SAVE20') {
      return price * 0.8;
    }
    return price;
  }
}

void main() {
  final product = MobileProduct(
    id: 'p-101',
    title: 'سماعات بلوتوث لاسلكية',
    price: 49.99,
    discountCode: 'SAVE20',
  );

  print('السعر النهائي: \${product.getFinalPrice()} دولار');
}`
        },
        practiceTask: 'اكتب كلاس أو Interface يمثل مستخدم التطبيق (User): الاسم، البريد، الصورة (nullable)، ورصيد المحفظة.',
        challenge: {
          title: 'فلترة وحساب إجمالي المنتجات في السلة',
          description: 'اكتب دالة بلغة Dart أو TypeScript تأخذ قائمة منتجات وترجع إجمالي سعر المنتجات المتوفرة في المخزن فقط.',
          hint: 'استخدم where أو filter متبوعاً بـ fold أو reduce.',
          solutionCode: `double calculateTotalInStock(List<MobileProduct> items) {
  return items
      .where((item) => item.inStock)
      .map((item) => item.getFinalPrice())
      .fold(0.0, (previous, price) => previous + price);
}`
        },
        quiz: {
          question: 'ما معنى وضع علامة الاستفهام (?) بعد نوع المتغير مثل "String? photoUrl" في Dart و TypeScript؟',
          options: [
            'أن هذا المتغير ممنوع تغييره نهائياً',
            'أن المتغير يمكن أن يحمل نصاً أو يكون فارغاً (null) بأمان دون التسبب بانهيار التطبيق',
            'أن هذا المتغير مخصص للإعلانات فقط',
            'أنه متغير تجريبي يجب حذفه قبل النشر'
          ],
          correctIndex: 1,
          explanation: 'علامة الاستفهام تعبر عن Nullable Type، أي أن المتغير قد لا يحتوي على قيمة (مثلاً مستخدم لم يرفع صورة بعد)، مما يجبر المطور على التحقق منه قبل استخدامه.'
        }
      },
      {
        id: 'prog-async-await',
        moduleId: 'programming-fundamentals',
        number: 5,
        title: 'البرمجة غير المتزامنة (Async/Await) والـ Future',
        level: 'intermediate',
        duration: '22 دقيقة',
        summary: 'كيف تجعل التطبيق سريع الاستجابة أثناء جلب البيانات من الإنترنت دون تجميد واجهة المستخدم (UI Freeze).',
        explanation: [
          'جميع عمليات جلب البيانات من الإنترنت، قراءة ملف من ذاكرة الهاتف، أو الاتصال بالبلوتوث تحتاج وقتاً. إذا قمت بها في المسار الرئيسي (Main Thread) سيتجمد التطبيق ولن يستجيب لأي لمسة.',
          'الحل هو البرمجة غير المتزامنة (Asynchronous Programming) باستخدام async و await و Futures (أو Promises في JS).',
          'استخدام كتل try / catch / finally ضروري لمعالجة انقطاع الاتصال أو فشل السيرفر وتنبيه المستخدم برسالة لطيفة بدل إغلاق التطبيق فجأة.',
          'الـ Streams (في Dart) والـ Observables تتيح لك الاستماع لبيانات تتغير باستمرار في الوقت الفعلي (مثل رسائل الشات الحية أو تحديثات الموقع الجغرافي GPS).'
        ],
        codeExample: {
          language: 'dart',
          filename: 'async_api_service.dart',
          code: `// Async Data Fetching with Robust Error Handling
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

class UserDataService {
  static const String baseUrl = 'https://jsonplaceholder.typicode.com';

  Future<Map<String, dynamic>> fetchUserProfile(int userId) async {
    try {
      final response = await http
          .get(Uri.parse('\$baseUrl/users/\$userId'))
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = jsonDecode(response.body);
        return {'success': true, 'data': data};
      } else {
        return {'success': false, 'error': 'خطأ من الخادم: \${response.statusCode}'};
      }
    } on TimeoutException {
      return {'success': false, 'error': 'انتهت مهلة الاتصال بالإنترنت'};
    } catch (e) {
      return {'success': false, 'error': 'تعذر الاتصال بالشبكة: \$e'};
    }
  }
}`
        },
        practiceTask: 'اكتب دالة محاكاة تتأخر ثانيتين باستخدام Future.delayed ثم ترجع قائمة إشعارات تجريبية.',
        challenge: {
          title: 'دالة إعادة المحاولة عند انقطاع الاتصال (Retry Mechanism)',
          description: 'اكتب دالة async تعيد محاولة طلب الرابط حتى 3 مرات قبل الاستسلام عند حدوث خطأ.',
          hint: 'استخدم حلقة for مع كتلة try/catch والتأخير ثانية بين كل محاولة.',
          solutionCode: `Future<String?> fetchWithRetry(String url, {int maxRetries = 3}) async {
  for (int attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) return response.body;
    } catch (e) {
      if (attempt == maxRetries) rethrow;
      await Future.delayed(Duration(seconds: attempt)); // Exponential backoff
    }
  }
  return null;
}`
        },
        quiz: {
          question: 'ما الفائدة المحورية لاستخدام await في تطبيقات الجوال؟',
          options: [
            'تسريع معالج الهاتف إلى الضعف',
            'انتظار نتيجة المهمة الطويلة (مثل جلب البيانات) في الخلفية دون تجميد تفاعل الشاشة مع اللمس',
            'حذف الكود القديم تلقائياً',
            'تشفير كلمات المرور في قاعدة البيانات'
          ],
          correctIndex: 1,
          explanation: 'كلمة await تجعل الكود ينتظر انتهاء العملية غير المتزامنة دون إيقاف الـ UI Thread، مما يضمن استمرار الرسوميات وتفاعل المستخدم بسلاسة فائقة.'
        }
      }
    ]
  },

  // 4. Mobile UI Development
  {
    id: 'mobile-ui',
    number: 4,
    title: 'Mobile UI Development',
    level: 'intermediate',
    icon: 'Layout',
    description: 'بناء الشاشات، التنقل (Navigation)، الأزرار، القوائم، الصور، التجاوب مع شاشات مختلفة، والوضع الليلي Dark Mode.',
    lessons: [
      {
        id: 'ui-screens-navigation',
        moduleId: 'mobile-ui',
        number: 6,
        title: 'شاشات الموبايل وهندسة التنقل (Navigation & Routes)',
        level: 'intermediate',
        duration: '22 دقيقة',
        summary: 'تعلم أنواع التنقل الأساسية: شريط التنقل السفلي (Bottom Navigation)، الدخول والخروج (Stack Navigation)، والأدراج الجانبية (Drawer).',
        explanation: [
          'معمارية التنقل (Navigation Architecture) هي العمود الفقري لتجربة المستخدم في أي تطبيق موبايل.',
          'النمط الأكثر استخداماً عالمياً هو Bottom Navigation Bar (شريط التبويبات السفلي) لسهولة وصول إبهام اليد إليه بيد واحدة على الهواتف الكبيرة.',
          'الـ Stack Navigation يعمل بمبدأ (Push / Pop): عند الضغط على منتج يتم دفعه فوق الشاشة الحالية (Push)، وعند الضغط على زر الرجوع يتم سحبه (Pop).',
          'تمرير المعاملات (Passing Arguments): كيفية إرسال معرّف العنصر (Item ID) من شاشة القائمة إلى شاشة التفاصيل لعرض بياناته الصحيحة.'
        ],
        codeExample: {
          language: 'dart',
          filename: 'navigation_bottom_stack.dart',
          code: `// Flutter Bottom Navigation Bar Example
import 'package:flutter/material.dart';

class MainNavigationHolder extends StatefulWidget {
  const MainNavigationHolder({super.key});

  @override
  State<MainNavigationHolder> createState() => _MainNavigationHolderState();
}

class _MainNavigationHolderState extends State<MainNavigationHolder> {
  int _currentIndex = 0;

  final List<Widget> _pages = const [
    Center(child: Text('🏠 شاشة البداية والمنتجات', style: TextStyle(color: Colors.white))),
    Center(child: Text('🔍 شاشة البحث والاستكشاف', style: TextStyle(color: Colors.white))),
    Center(child: Text('🛒 سلة المشتريات', style: TextStyle(color: Colors.white))),
    Center(child: Text('👤 الحساب الشخصي', style: TextStyle(color: Colors.white))),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF09090B),
      body: _pages[_currentIndex],
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: Color(0xFF27272A))),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) => setState(() => _currentIndex = index),
          backgroundColor: const Color(0xFF18181B),
          selectedItemColor: Colors.amber,
          unselectedItemColor: Colors.grey,
          type: BottomNavigationBarType.fixed,
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'الرئيسية'),
            BottomNavigationBarItem(icon: Icon(Icons.search), label: 'البحث'),
            BottomNavigationBarItem(icon: Icon(Icons.shopping_bag), label: 'السلة'),
            BottomNavigationBarItem(icon: Icon(Icons.person), label: 'حسابي'),
          ],
        ),
      ),
    );
  }
}`
        },
        practiceTask: 'اصنع شاشة انتقال بـ Navigator.push تنقل المستخدم من صفحة المنتجات لصفحة تفاصيل منتج مع تمرير اسم وسعر المنتج.',
        challenge: {
          title: 'زر الرجوع العائم مع حماية من الخروج غير المقصود',
          description: 'استخدم WillPopScope أو PopScope لتنبيه المستخدم بنافذة تأكيد عند رغبته في الخروج من التطبيق بالضغط على زر الرجوع.',
          hint: 'ارجع false إذا رفض المستخدم الخروج، أو true إذا وافق.',
          solutionCode: `PopScope(
  canPop: false,
  onPopInvoked: (didPop) async {
    if (didPop) return;
    final shouldExit = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('هل تريد الخروج؟'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('إلغاء')),
          TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('خروج')),
        ],
      ),
    );
    if (shouldExit == true) Navigator.of(context).pop();
  },
  child: const Scaffold(/* ... */),
);`
        },
        quiz: {
          question: 'ما هو المبدأ الذي تتبعه شاشات Stack Navigation عند فتح صفحة تفاصيل ثم الرجوع؟',
          options: [
            'LIFO (Last-In, First-Out): الشاشة التي تُفتح أخيراً هي أول ما يُغلق عند الرجوع',
            'FIFO (First-In, First-Out): إغلاق التطبيق بالكامل مباشرة',
            'إعادة تحميل التطبيق من متجر البرامج',
            'حذف ذاكرة التخزين المؤقت'
          ],
          correctIndex: 0,
          explanation: 'شاشات الـ Stack تعمل كمكدس ورقي، الصفحة الجديدة توضع بالأعلى (Push) وعند الضغط على رجوع يتم سحبها من الأعلى (Pop) للعودة للشاشة السابقة.'
        }
      },
      {
        id: 'ui-responsive-darkmode',
        moduleId: 'mobile-ui',
        number: 7,
        title: 'القوائم السريعة، التصميم المتجاوب، والوضع الليلي (Dark Mode)',
        level: 'intermediate',
        duration: '24 دقيقة',
        summary: 'استخدام ListView.builder لإعادة تدوير العناصر بكفاءة واستهلاك قليل للذاكرة، ودعم أحجام شاشات الهواتف والتابلت.',
        explanation: [
          'عند عرض 500 منتج، لا يجوز رسمها دفعة واحدة في الشاشة لأن ذلك سيجعل الهاتف بطيئاً جداً. نستخدم القوائم الافتراضية (ListView.builder في Flutter أو FlatList في React Native) التي ترسم فقط العناصر الظاهرة للمستخدم وتعيد تدويرها أثناء التمرير.',
          'التصميم المتجاوب (Responsive Layout): استخدام نسب الشاشة، MediaQuery، و LayoutBuilder لضبط عدد الأعمدة والمسافات بين الهواتف الصغيرة والتابلت.',
          'الوضع الليلي (Dark Theme): أصبح معياراً أساسياً لقبول التطبيقات في المتاجر؛ يساعد في توفير بطاريات شاشات OLED وراحة العينين في الإضاءة الخافتة.',
          'الاستجابة للمس: كل زر يجب أن يحتوي على رد فعل حركي (Haptic Feedback أو Ripple Effect) ليشعر المستخدم أن اللمسة تم تسجيلها بنجاح.'
        ],
        codeExample: {
          language: 'dart',
          filename: 'recycler_list_dark_theme.dart',
          code: `// ListView.builder with High Performance Recycling & Dark UI
import 'package:flutter/material.dart';

class HighPerformanceProductList extends StatelessWidget {
  final List<String> products = List.generate(100, (i) => 'منتج تجاري رقم \${i + 1}');

  HighPerformanceProductList({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF09090B),
      appBar: AppBar(
        title: const Text('قائمة المنتجات (ListView.builder)'),
        backgroundColor: const Color(0xFF18181B),
        elevation: 0,
      ),
      body: ListView.separated(
        itemCount: products.length,
        padding: const EdgeInsets.all(16),
        separatorBuilder: (ctx, i) => const SizedBox(height: 12),
        itemBuilder: (ctx, index) {
          return Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF18181B),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF27272A)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                Row(
                  children: [
                    Container(
                      width: 44,
                      height: 44,
                      decoration: BoxDecoration(
                        color: Colors.amber.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(Icons.inventory_2, color: Colors.amber),
                    ),
                    const SizedBox(width: 12),
                    Text(
                      products[index],
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.add_shopping_cart, color: Colors.amber),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('تمت إضافة \${products[index]} للسلة')),
                    );
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}`
        },
        practiceTask: 'أنشئ شاشة تعرض شبكة صور (GridView) تتحول من عمودين على شاشة الهاتف العادي إلى 4 أعمدة على شاشات التابلت باستخدام MediaQuery.',
        challenge: {
          title: 'التبديل الفوري بين Dark و Light Mode باستخدام ValueNotifier',
          description: 'اصنع مفتاح تبديل (Switch) يغير نمط التطبيق بين الداكن والفاتح في جميع الشاشات بدون إعادة تشغيل.',
          hint: 'استخدم ThemeMode و ValueListenableBuilder فوق MaterialApp.',
          solutionCode: `final ValueNotifier<ThemeMode> themeNotifier = ValueNotifier(ThemeMode.dark);

// داخل دالة البناء:
ValueListenableBuilder<ThemeMode>(
  valueListenable: themeNotifier,
  builder: (_, currentMode, __) {
    return MaterialApp(
      themeMode: currentMode,
      theme: ThemeData.light(),
      darkTheme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF09090B),
      ),
      home: Scaffold(
        appBar: AppBar(
          actions: [
            Switch(
              value: currentMode == ThemeMode.dark,
              onChanged: (isDark) => themeNotifier.value = isDark ? ThemeMode.dark : ThemeMode.light,
            )
          ],
        ),
      ),
    );
  },
);`
        },
        quiz: {
          question: 'لماذا يُفضل دائماً استخدام ListView.builder أو FlatList بدل وضع العناصر في Column داخل SingleChildScrollView؟',
          options: [
            'لأن Column لا تقبل أكثر من 5 عناصر',
            'لأن ListView.builder ترسم فقط العناصر المعروضة حالياً على الشاشة وتوفر الذاكرة والبطارية بشكل هائل',
            'لأن ListView تجعل التطبيق مجانياً',
            'لأن نظام أبل يرفض القوائم الأخرى'
          ],
          correctIndex: 1,
          explanation: 'في القوائم الطويلة، رسم 1000 عنصر دفعة واحدة يسبب تجميد التطبيق واستنزاف ذاكرة الهاتف، بينما الـ Virtualized Lists ترسم فقط ما يراه المستخدم وتعيد تدوير الحاويات.'
        }
      }
    ]
  },

  // 5. APIs & Data
  {
    id: 'apis-and-data',
    number: 5,
    title: 'APIs & Remote Data',
    level: 'intermediate',
    icon: 'UploadCloud',
    description: 'تحويل JSON، التعامل مع REST API، استدعاء GET/POST، حالات التحميل (Loading / Error States) وربط التطبيق بالسيرفر.',
    lessons: [
      {
        id: 'api-rest-get-post',
        moduleId: 'apis-and-data',
        number: 8,
        title: 'استهلاك REST APIs: طلبات GET و POST والتعامل مع JSON',
        level: 'intermediate',
        duration: '25 دقيقة',
        summary: 'بناء طبقة اتصالات احترافية (API Repository) لتحويل نصوص الـ JSON القادمة من السيرفر إلى كائنات حقيقية داخل التطبيق.',
        explanation: [
          'معظم تطبيقات الجوال هي في الحقيقة واجهة أنيقة لعرض بيانات تأتي من خادم سحابي (Backend API) عبر بروتوكول HTTPS.',
          'الطلبات الأساسية: GET لجلب البيانات، POST لإرسال بيانات جديدة (مثل إنشاء حساب أو طلب شراء)، PUT/PATCH للتعديل، و DELETE للحذف.',
          'أهمية الـ Data Models و Serialization: تحويل الخرائط (Map<String, dynamic>) القادمة من السيرفر إلى كائن مبرمج بقوة عبر دالة fromJson و toJson يمنع 90% من الأخطاء العشوائية.',
          'حالات الشاشة الثلاثة: لكل شاشة تعتمد على السيرفر 3 حالات يجب تصميمها دائماً: (1) حالة التحميل Loading Skeleton، (2) حالة الخطأ ونقص الإنترنت Error State، (3) حالة عرض البيانات الناجحة Success Data.'
        ],
        codeExample: {
          language: 'dart',
          filename: 'complete_api_client.dart',
          code: `// Complete REST API Client with JSON Model Parsing
import 'dart:convert';
import 'package:http/http.dart' as http;

class ArticleModel {
  final int id;
  final String title;
  final String category;
  final double readTime;

  ArticleModel({
    required this.id,
    required this.title,
    required this.category,
    required this.readTime,
  });

  factory ArticleModel.fromJson(Map<String, dynamic> json) {
    return ArticleModel(
      id: json['id'] as int,
      title: json['title'] as String,
      category: json['category'] ?? 'عام',
      readTime: (json['readTime'] ?? 3).toDouble(),
    );
  }
}

class MobileApiService {
  static const String endpoint = 'https://api.myproject.com/v1';

  // 1. GET Request
  Future<List<ArticleModel>> getArticles() async {
    final res = await http.get(Uri.parse('\$endpoint/articles'));
    if (res.statusCode == 200) {
      final List rawList = jsonDecode(res.body);
      return rawList.map((item) => ArticleModel.fromJson(item)).toList();
    }
    throw Exception('فشل جلب المقالات');
  }

  // 2. POST Request (إرسال بيانات جديدة)
  Future<bool> submitOrder(Map<String, dynamic> orderPayload, String token) async {
    final res = await http.post(
      Uri.parse('\$endpoint/orders'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer \$token',
      },
      body: jsonEncode(orderPayload),
    );
    return res.statusCode == 201;
  }
}`
        },
        practiceTask: 'استخدم واجهة برمجة تجريبية مجانية (مثل Rick & Morty API أو PokeAPI أو JSONPlaceholder) واعرض قائمة بالأسماء والصور في تطبيقك.',
        challenge: {
          title: 'تصميم مكون حالة فارغة وحالة إعادة المحاولة (Empty & Retry UI)',
          description: 'اصنع شاشة تحتوي على FutureBuilder يعرض مؤشر تحميل أنيق، وإذا انقطع النت يعرض زراً لإعادة المحاولة (Try Again).',
          hint: 'افحص snapshot.connectionState و snapshot.hasError داخل دالة البناء.',
          solutionCode: `FutureBuilder<List<ArticleModel>>(
  future: articlesFuture,
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const Center(child: CircularProgressIndicator(color: Colors.amber));
    }
    if (snapshot.hasError) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.wifi_off, size: 48, color: Colors.grey),
            const SizedBox(height: 12),
            const Text('تعذر الاتصال بالشبكة', style: TextStyle(color: Colors.white)),
            const SizedBox(height: 12),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: Colors.amber),
              onPressed: () => setState(() { articlesFuture = api.getArticles(); }),
              child: const Text('إعادة المحاولة', style: TextStyle(color: Colors.black)),
            ),
          ],
        ),
      );
    }
    final list = snapshot.data ?? [];
    return ListView.builder(
      itemCount: list.length,
      itemBuilder: (ctx, i) => ListTile(title: Text(list[i].title)),
    );
  },
)`
        },
        quiz: {
          question: 'أي كود حالة HTTP يشير إلى نجاح إنشاء عنصر جديد (مثل إتمام الطلب أو إنشاء الحساب بنجاح)؟',
          options: ['200 OK', '201 Created', '404 Not Found', '500 Server Error'],
          correctIndex: 1,
          explanation: 'كود 201 Created هو المعيار العالمي للـ REST API عند نجاح عملية POST وإضافة سجل جديد لقاعدة البيانات في الخادم.'
        }
      }
    ]
  },

  // 6. Authentication & User Accounts
  {
    id: 'authentication',
    number: 6,
    title: 'Authentication & User Accounts',
    level: 'intermediate',
    icon: 'Award',
    description: 'تسجيل الدخول، إنشاء الحساب، استعادة كلمة المرور، حفظ رمز الأمان (Secure Token Storage) وحماية مسارات التطبيق.',
    lessons: [
      {
        id: 'auth-jwt-secure-storage',
        moduleId: 'authentication',
        number: 9,
        title: 'نظام المصادقة الآمن: حفظ الـ JWT في التخزين المشفر للهاتف',
        level: 'intermediate',
        duration: '26 دقيقة',
        summary: 'تأمين جلسة المستخدم باستخدام flutter_secure_storage أو iOS Keychain / Android KeyStore والتحقق من تسجيل الدخول عند فتح التطبيق.',
        explanation: [
          'خطأ مبتدئين خطير: حفظ رمز تسجيل الدخول (Auth Token) في تخزين عادي غير مشفر مثل SharedPreferences أو AsyncStorage يعرض حساب المستخدم للاختراق السهل.',
          'الطريقة الاحترافية: استخدام التخزين المشفر بالنظام (iOS Keychain و Android EncryptedSharedPreferences عبر flutter_secure_storage).',
          'دورة الـ Splash Screen التلقائية: عند فتح التطبيق يتم فحص الرمز المشفر فوراً: إذا كان صالحاً ينتقل للرئيسية مباشرة، وإذا كان منتهياً أو غير موجود يفتح شاشة تسجيل الدخول.',
          'الخروج التلقائي (Auto Logout): عند استلام خطأ 401 Unauthorized من السيرفر، يجب مسح الرمز المحفوظ وتوجيه المستخدم لشاشة تسجيل الدخول لحماية حسابه.'
        ],
        codeExample: {
          language: 'dart',
          filename: 'secure_auth_manager.dart',
          code: `// Secure Authentication & Token Lifecycle Management
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureAuthManager {
  static const _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
    iOptions: IOSOptions(accessibility: KeychainAccessibility.first_unlock),
  );

  static const String _tokenKey = 'app_auth_jwt_token';
  static const String _userRoleKey = 'app_user_role';

  // حفظ رمز الدخول المشفر
  Future<void> saveSession({required String token, required String role}) async {
    await _storage.write(key: _tokenKey, value: token);
    await _storage.write(key: _userRoleKey, value: role);
  }

  // قراءة الرمز عند إقلاع التطبيق
  Future<String?> getToken() async {
    return await _storage.read(key: _tokenKey);
  }

  // تسجيل الخروج ومسح الذاكرة الحساسة
  Future<void> logout() async {
    await _storage.delete(key: _tokenKey);
    await _storage.delete(key: _userRoleKey);
  }

  // فحص هل المستخدم مسجل دخول حالياً
  Future<bool> isAuthenticated() async {
    final token = await getToken();
    return token != null && token.isNotEmpty;
  }
}`
        },
        practiceTask: 'اصنع شاشة تسجيل دخول (Login Screen) بسيطة تحتوي على حقلي بريد وكلمة مرور مع زر للتحقق من ملء البيانات قبل الإرسال.',
        challenge: {
          title: 'إضافة فحص قوة كلمة المرور في شاشة التسجيل',
          description: 'اكتب دالة تحقق أن كلمة المرور تحتوي على 8 أحرف على الأقل، حرف كبير، ورقم واحد مع إظهار شريط القوة.',
          hint: 'استخدم تعبيرات RegExp للفحص.',
          solutionCode: `bool isPasswordStrong(String password) {
  final hasMinLength = password.length >= 8;
  final hasUppercase = RegExp(r'[A-Z]').hasMatch(password);
  final hasDigits = RegExp(r'[0-9]').hasMatch(password);
  return hasMinLength && hasUppercase && hasDigits;
}`
        },
        quiz: {
          question: 'أين يجب حفظ الـ Access Token وجلسات المستخدم الحساسة على هواتف Android و iOS؟',
          options: [
            'في ملف نصي مفتوح في بطاقة الذاكرة الخارجية',
            'في التخزين المشفر الآمن للنظام (iOS Keychain و Android KeyStore)',
            'في رابط الصورة الشخصية',
            'في اسم حزمة التطبيق Package Name'
          ],
          correctIndex: 1,
          explanation: 'Keychain و KeyStore هما الطبقتان المشفرتان عتادياً وبرمجياً في هواتف أبل وأندرويد لمنع أي تطبيق خبيث آخر من سرقة جلسات وبيانات الدخول.'
        }
      }
    ]
  },

  // 7. Database & Backend
  {
    id: 'database-backend',
    number: 7,
    title: 'Database & Local Persistence',
    level: 'intermediate',
    icon: 'Compass',
    description: 'قواعد البيانات المحلية والـ Cloud: SQLite / Isar / Hive / Firebase وتخزين واسترجاع البيانات دون إنترنت (Offline First).',
    lessons: [
      {
        id: 'db-local-offline-first',
        moduleId: 'database-backend',
        number: 10,
        title: 'قواعد البيانات المحلية: SQLite و Hive للتطبيقات التي تعمل بلا إنترنت',
        level: 'intermediate',
        duration: '24 دقيقة',
        summary: 'تطبيق نمط Offline-First لجعل التطبيق يفتح فوراً ويعمل في الطائرة أو الأماكن بدون شبكة، ثم يتزامن عند عودة الاتصال.',
        explanation: [
          'المستخدمون يحذفون التطبيقات البطيئة التي تظهر شاشات تحميل بيضاء كلما انقطع النت. التطبيقات الممتازة تطبق نمط (Offline-First).',
          'قاعدة البيانات المحلية تخزن نسخة من البيانات على ذاكرة الهاتف (عبر SQLite أو NoSQL سريع مثل Hive و Isar و WatermelonDB).',
          'دورة العمليات الأربعة (CRUD): إنشاء (Create)، قراءة (Read)، تحديث (Update)، وحذف (Delete).',
          'المزامنة (Syncing Strategy): حفظ التعديلات محلياً أولاً فوراً مع علامة isPendingSync = true، وعند اتصال الجهاز بالإنترنت يتم إرسالها للخادم في الخلفية.'
        ],
        codeExample: {
          language: 'dart',
          filename: 'local_database_repository.dart',
          code: `// Fast NoSQL Local Database Example using Hive Concept
import 'package:flutter/foundation.dart';

class LocalTaskItem {
  final String id;
  final String title;
  final bool isCompleted;
  final DateTime createdAt;

  LocalTaskItem({
    required this.id,
    required this.title,
    this.isCompleted = false,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() => {
    'id': id,
    'title': title,
    'isCompleted': isCompleted ? 1 : 0,
    'createdAt': createdAt.toIso8601String(),
  };

  factory LocalTaskItem.fromMap(Map<String, dynamic> map) => LocalTaskItem(
    id: map['id'],
    title: map['title'],
    isCompleted: map['isCompleted'] == 1,
    createdAt: DateTime.parse(map['createdAt']),
  );
}

// مدير العمليات التخزينية CRUD
class TaskDatabaseManager extends ChangeNotifier {
  final List<LocalTaskItem> _tasks = [];

  List<LocalTaskItem> get tasks => List.unmodifiable(_tasks);

  void addTask(String title) {
    final newTask = LocalTaskItem(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      title: title,
      createdAt: DateTime.now(),
    );
    _tasks.insert(0, newTask);
    notifyListeners(); // تحديث فوري للشاشة
  }

  void toggleTask(String id) {
    final index = _tasks.indexWhere((t) => t.id == id);
    if (index != -1) {
      final old = _tasks[index];
      _tasks[index] = LocalTaskItem(
        id: old.id,
        title: old.title,
        isCompleted: !old.isCompleted,
        createdAt: old.createdAt,
      );
      notifyListeners();
    }
  }
}`
        },
        practiceTask: 'اصنع شاشة تتيح إضافة عنصر جديد إلى قائمة محلية مع إمكانية مسحه بالسحب يميناً (Dismissible Widget).',
        challenge: {
          title: 'تنفيذ خاصية التراجع عند الحذف (Undo Action)',
          description: 'عند مسح عنصر من القائمة، أظهر شريط SnackBar يحتوي على زر "تراجع" لإعادة العنصر لنفس مكانه إذا ندم المستخدم.',
          hint: 'احتفظ بنسخة من العنصر وموقعه الأصلي (Index) داخل دالة الحذف.',
          solutionCode: `void deleteTaskWithUndo(BuildContext context, int index, LocalTaskItem item) {
  taskManager.removeAt(index);
  ScaffoldMessenger.of(context).clearSnackBars();
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text('تم حذف "\${item.title}"'),
      action: SnackBarAction(
        label: 'تراجع',
        textColor: Colors.amber,
        onPressed: () => taskManager.insertAt(index, item),
      ),
    ),
  );
}`
        },
        quiz: {
          question: 'ما هي الفائدة الرئيسية لتطبيق نمط Offline-First في تطبيقات الجوال؟',
          options: [
            'الاستغناء عن متجر التطبيقات نهائياً',
            'إتاحة عمل التطبيق وفتح البيانات فوراً وسرعة استجابة هائلة حتى في حال غياب الاتصال بالإنترنت',
            'منع المستخدمين من أخذ سكرين شوت للشاشة',
            'تقليل حجم بطارية الهاتف'
          ],
          correctIndex: 1,
          explanation: 'تطبيقات الـ Offline-First تقرأ وتكتب في قاعدة البيانات المحلية بالهاتف أولاً، مما يجعل سرعة العرض صفر ثانية وتعمل في أي مكان دون انتظار إشارة السيرفر.'
        }
      }
    ]
  },

  // 8. Advanced Features
  {
    id: 'advanced-features',
    number: 8,
    title: 'Advanced Features & Native Device APIs',
    level: 'advanced',
    icon: 'Sparkles',
    description: 'الإشعارات الفورية (Push Notifications)، البحث السريع، رفع الصور والملفات، تحديد الموقع (GPS) وبوابات الدفع.',
    lessons: [
      {
        id: 'adv-push-notifications',
        moduleId: 'advanced-features',
        number: 11,
        title: 'الإشعارات الفورية (Push Notifications): زيادة التفاعل واستعادة المستخدمين',
        level: 'advanced',
        duration: '25 دقيقة',
        summary: 'ربط Firebase Cloud Messaging (FCM) و OneSignal لإرسال إشعارات مستهدفة للمستخدمين في الخلفية وعند إغلاق التطبيق.',
        explanation: [
          'الإشعارات الفورية هي الأداة رقم #1 لإعادة تنشيط المستخدمين وزيادة مبيعات التطبيق (Retention & Re-engagement).',
          'أنواع الإشعارات: إشعارات محلية (Local Notifications) تُجدول في الهاتف كمنبه للأدوية أو العادات، وإشعارات سحابية (Remote Push Notifications) تُرسل من السيرفر.',
          'الـ Device Token: عند موافقة المستخدم على استقبال الإشعارات، يُنشئ النظام رمزاً فريداً لجهازه يتم حفظه في قاعدة بيانات المستخدمين لديك لإرسال الإشعار إليه حصرياً.',
          'التعامل مع الضغط على الإشعار (Deep Linking): توجيه المستخدم مباشرة لشاشة الطلب أو العرض المذكور في الإشعار وليس فقط لصفحة البداية.'
        ],
        codeExample: {
          language: 'dart',
          filename: 'push_notifications_handler.dart',
          code: `// Push Notifications Payload & Foreground Listener Setup
import 'package:flutter/material.dart';

class NotificationPayloadHandler {
  // استقبال الإشعار والتوجيه للشاشة المحددة (Deep Link)
  static void handleNotificationClick(BuildContext context, Map<String, dynamic> payload) {
    final String? screenType = payload['type'];
    final String? targetId = payload['target_id'];

    if (screenType == 'order_status' && targetId != null) {
      Navigator.pushNamed(context, '/order-details', arguments: targetId);
    } else if (screenType == 'discount_offer') {
      Navigator.pushNamed(context, '/promo-landing');
    }
  }

  // نموذج رسالة إشعار فورية
  static Map<String, dynamic> samplePayload = {
    'title': '🎉 خصم 30% حصري لك اليوم!',
    'body': 'استخدم الكود RIKOU30 قبل نهاية المساء.',
    'type': 'discount_offer',
    'timestamp': DateTime.now().toIso8601String(),
  };
}`
        },
        practiceTask: 'صمم شاشة تطلب من المستخدم بلباقة تفعيل الإشعارات وتوضح له الفائدة (مثل تنبيهات الخصومات وحالة الطلب) قبل إظهار نافذة النظام المنبثقة.',
        challenge: {
          title: 'دالة جدولة إشعار تذكير يومي في ساعة محددة',
          description: 'اكتب كوداً يبرمج إشعاراً محلياً يتكرر كل يوم الساعة 8:00 مساءً لتذكير المستخدم بتسجيل مصاريفه.',
          hint: 'استخدم مكتبة flutter_local_notifications وحساب وقت الـ DateTime القادم.',
          solutionCode: `// نموذج زمني لجدولة إشعار يومي
DateTime getNextInstanceOfEightPM() {
  final now = DateTime.now();
  var scheduled = DateTime(now.year, now.month, now.day, 20, 0);
  if (scheduled.isBefore(now)) {
    scheduled = scheduled.add(const Duration(days: 1));
  }
  return scheduled;
}`
        },
        quiz: {
          question: 'ما هو الـ Device Push Token الذي يولده النظام لكل جهاز مستخدم؟',
          options: [
            'الرقم القومي لبطاقة هوية المستخدم',
            'عنوان سري فريد يرسله الخادم لـ Apple/Google لمعرفة أي هاتف محدد يجب أن تصله الرسالة',
            'كلمة مرور حساب الواي فاي',
            'كود ترويجي للخصومات'
          ],
          correctIndex: 1,
          explanation: 'الـ Token هو العنوان السحابي الخاص بهاتف المستخدم لتسليم الإشعار المخصص له دون غيره من ملايين الأجهزة الأخرى.'
        }
      }
    ]
  },

  // 10. Testing & Debugging
  {
    id: 'testing-debugging',
    number: 10,
    title: 'Testing, Debugging & Performance',
    level: 'advanced',
    icon: 'CheckSquare',
    description: 'اكتشاف الأخطاء، قراءة سجلات Crashlytics، اختبار التطبيق على أجهزة حقيقية، أمان التطبيق وتحسين استهلاك البطارية.',
    lessons: [
      {
        id: 'test-crash-performance',
        moduleId: 'testing-debugging',
        number: 12,
        title: 'فحص الأداء وتتبع الأخطاء السحابية (Crash Reporting & Memory Leaks)',
        level: 'advanced',
        duration: '22 دقيقة',
        summary: 'استخدام أدوات التنميط (Profiler)، حل مشكلة الذاكرة الزائدة، ودمج Firebase Crashlytics لرصد أخطاء المستخدمين تلقائياً.',
        explanation: [
          'لا تختبر تطبيقك على المحاكي السريع فقط؛ يجب اختباره على هاتف أندرويد منخفض المواصفات وعلى شاشات ذات النوتش والكاميرات العريضة.',
          'تسريب الذاكرة (Memory Leaks): يحدث عندما تنسى إلغاء المشتتات والـ Streams والمؤقتات (Timers) عند مغادرة الشاشة عبر dispose() فيتراكم استهلاك الرام حتى يُغلق التطبيق.',
          'تتبع الانهيار التلقائي: دمج أدوات مثل Sentry أو Firebase Crashlytics يرسل لك تقريراً تفصيلياً برقم السطر البرمجي ونوع هاتف المستخدم وإصدار نظامه لحظة حدوث أي انهيار.',
          'الأمان الصارم (Security Checklist): منع أخذ سكرين شوت للشاشات البنكية (FLAG_SECURE)، تفعيل إخفاء الكود البرمجي (ProGuard / R8 Obfuscation)، والتحقق من شهادات الـ SSL لمنع اعتراض البيانات (SSL Pinning).'
        ],
        codeExample: {
          language: 'dart',
          filename: 'dispose_cleanup_example.dart',
          code: `// Proper Memory Cleanup in State with Dispose
import 'dart:async';
import 'package:flutter/material.dart';

class SafeStockTrackerWidget extends StatefulWidget {
  const SafeStockTrackerWidget({super.key});

  @override
  State<SafeStockTrackerWidget> createState() => _SafeStockTrackerWidgetState();
}

class _SafeStockTrackerWidgetState extends State<SafeStockTrackerWidget> {
  late final TextEditingController _searchController;
  Timer? _pollingTimer;

  @override
  void initState() {
    super.initState();
    _searchController = TextEditingController();
    // مؤقت يتكرر كل 5 ثوان لتحديث الأسعار
    _pollingTimer = Timer.periodic(const Duration(seconds: 5), (timer) {
      debugPrint("تحديث الأسعار في الخلفية...");
    });
  }

  @override
  void dispose() {
    // ⚠️ تنظيف حاسم: إغلاق المؤقت والكنترولر لمنع تسريب الذاكرة (Memory Leak)
    _pollingTimer?.cancel();
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(controller: _searchController);
  }
}`
        },
        practiceTask: 'راجع شاشات تطبيقك وتأكد من أن كل Controller أو AnimationController أو Timer أو StreamSubscription تم إغلاقه داخل دالة dispose.',
        challenge: {
          title: 'التقاط ومعالجة جميع الأخطاء غير المتوقعة (Global Error Catching)',
          description: 'اكتب كوداً في دالة main يمسك بأي خطأ يحدث في شجرة الـ Widgets ويرسله إلى خدمة مراقبة الأخطاء دون إظهار شاشة الخطأ الحمراء المخيفة للمستخدم.',
          hint: 'استخدم FlutterError.onError و PlatformDispatcher.instance.onError.',
          solutionCode: `void main() {
  FlutterError.onError = (details) {
    // إرسال الخطأ لسيرفر التقارير
    debugPrint('🚨 خطأ واجهة مستخدم: \${details.exception}');
  };

  runApp(const MyApp());
}`
        },
        quiz: {
          question: 'ما الذي يحدث عند عدم استدعاء دالة dispose() للـ Controllers و Timers عند إغلاق الشاشات في تطبيقات الجوال؟',
          options: [
            'يتم ترقية حساب المطور مجاناً',
            'تسريب للذاكرة (Memory Leak) واستهلاك متزايد لبطارية ورام الهاتف قد ينتهي بإغلاق مفاجئ للتطبيق',
            'تغيير لون خط الهاتف تلقائياً',
            'لا شيء يؤثر على التطبيق إطلاقاً'
          ],
          correctIndex: 1,
          explanation: 'المتحكمات تظل حية ومستهلكة للذاكرة والمعالج في الخلفية إذا لم يتم إغلاقها، مما يجعل الهاتف ساخناً وبطيئاً ويسبب إغلاق التطبيق فجأة بواسطة نظام التشغيل (OOM Crash).'
        }
      }
    ]
  },

  // 11. Publishing Apps
  {
    id: 'publishing-apps',
    number: 11,
    title: 'Publishing to Google Play & App Store',
    level: 'advanced',
    icon: 'ExternalLink',
    description: 'إنشاء الحسابات، الأيقونات، لقطات الشاشة، وصف التطبيق وتحسين السيو (ASO)، وسياسات الخصوصية وقبول المتجر.',
    lessons: [
      {
        id: 'publish-stores-preparation',
        moduleId: 'publishing-apps',
        number: 13,
        title: 'دليل النشر والقبول في Google Play و App Store بنجاح من المرة الأولى',
        level: 'advanced',
        duration: '28 دقيقة',
        summary: 'خطوات استخراج ملفات الإصدار النهائية (.aab و .ipa)، تجهيز الأيقونات وسكرين شوتس جذابة، وتجنب أسباب الرفض الشائعة.',
        explanation: [
          'متطلبات متجر Google Play: حساب مطور (25$ مرة واحدة)، ملف Android App Bundle (.aab)، مفتاح توقيع رقمي (Release Keystore)، وتوفير اختبار مغلق (Closed Testing لـ 14 يوماً مع 12 مختبراً للحسابات الشخصية الجديدة).',
          'متطلبات متجر Apple App Store: حساب Apple Developer (99$ سنوياً)، شهادة توزيع Distribution Certificate و Provisioning Profile عبر Xcode، وبناء ملف .ipa.',
          'تصميم واجهة المتجر (ASO - App Store Optimization): الأيقونة (1024x1024)، و5 إلى 8 لقطات شاشة جذابة مع نصوص تسويقية توضح القيمة، ووصف واضح يبدأ بالحل الذي يقدمه التطبيق.',
          'أسباب الرفض الأكثر شيوعاً: عدم وجود سياسة خصوصية واضحة (Privacy Policy URL)، أزرار وهمية لا تعمل، طلب صلاحيات أذونات زائدة دون تبرير، وعدم توفير بيانات حساب تجريبي (Test Credentials) للمراجعين لفحص التطبيق.'
        ],
        codeExample: {
          language: 'bash',
          filename: 'build_commands.sh',
          code: `# 1. تنظيف المشروع القديم
flutter clean
flutter pub get

# 2. بناء حزمة أندرويد للإنتاج (Android App Bundle)
flutter build appbundle --release

# المخرج يكون في:
# build/app/outputs/bundle/release/app-release.aab

# 3. بناء نسخة الآيفون للإنتاج (iOS Archive)
flutter build ipa --release

# 4. أوامر React Native (Expo) للنشر السحابي
eas build --platform all --profile production`
        },
        practiceTask: 'صمم نموذج سياسة خصوصية قانوني لتطبيقك مجاناً عبر أداة (App Privacy Policy Generator) وضع الرابط على صفحة GitHub Pages لتكون جاهزاً للمتجر.',
        challenge: {
          title: 'قائمة التحقق الذهبية قبل الضغط على زر "Submit for Review"',
          description: 'حدد 5 عناصر حرجة إذا غاب أحدها سيرفض روبوت متجر جوجل أو مراجع متجر أبل التطبيق مباشرة.',
          hint: 'تذكر شروط الخصوصية، حذف الحساب، وحساب المراجعة التجريبي.',
          solutionCode: `/* قائمة الفحص قبل النشر:
1. رابط سياسة خصوصية فعال ومتوافق مع جمع البيانات.
2. زر حذف الحساب وبيانات المستخدم بالكامل (إلزامي في Apple).
3. بيانات تسجيل دخول تجريبية (Reviewer Credentials) للمراجع.
4. عدم استخدام أسماء أو علامات تجارية محمية بحقوق (مثل وضع شعار آبل أو جوجل داخل صور المتجر).
5. عدم طلب صلاحيات مثل الكاميرا أو الموقع الجغرافي دون رسالة شرح واضحة للمستخدم في نظام iOS (Info.plist usage descriptions).
*/`
        },
        quiz: {
          question: 'ما هي الصيغة الرسمية الحديثة المطلوبة لرفع تطبيقات الأندرويد على متجر Google Play؟',
          options: ['ملف APK قديم', 'ملف Android App Bundle (.aab)', 'ملف ZIP عادي', 'ملف PDF'],
          correctIndex: 1,
          explanation: 'جوجل بلاي اعتمد صيغة .aab رسمياً لإنشاء حزم مجزأة لكل جهاز خصيصاً، مما يقلل حجم تحميل التطبيق على هواتف المستخدمين بنسبة تصل لـ 30%.'
        }
      }
    ]
  },

  // 12. Monetization
  {
    id: 'monetization',
    number: 12,
    title: 'App Monetization & Business Models',
    level: 'advanced',
    icon: 'DollarSign',
    description: 'استراتيجيات تحويل التطبيق لدخل حقيقي: الاشتراكات (Subscriptions)، الإعلانات (AdMob)، المشتريات (IAP)، والبيع للشركات.',
    lessons: [
      {
        id: 'monetize-strategies',
        moduleId: 'monetization',
        number: 14,
        title: 'استراتيجيات الدخل: الاشتراكات المتكررة، الإعلانات، والشراء داخل التطبيق',
        level: 'advanced',
        duration: '24 دقيقة',
        summary: 'تعلم كيف تدمج نظام الاشتراكات الأسبوعية والشهرية باستخدام RevenueCat لربح دخل سلبي متكرر من مستخدمي تطبيقك.',
        explanation: [
          'الاشتراكات السنوية والشهرية (Subscriptions) هي أفضل وأعلى نموذج دخل تقيماً في عالم تطبيقات الجوال اليوم؛ مستخدم واحد يدفع 29$ سنوياً أفضل من 3,000 مشاهدة إعلان.',
          'أداة RevenueCat: هي الأداة القياسية في السوق لإدارة اشتراكات App Store و Google Play بكود موحد بسيط دون الحاجة لبناء سيرفر معقد للتحقق من الإيصالات.',
          'نموذج الـ Freemium: توفير 70% من ميزات التطبيق الأساسية مجاناً لبناء قاعدة مستخدمين ضخمة، وحجب الميزات المتقدمة (Pro / Premium) خلف جدار الدفع (Paywall).',
          'الإعلانات (Google AdMob): مناسبة للتطبيقات ذات الاستخدام اليومي المتكرر وتوفر 3 أنواع رئيسية: إعلانات البانر السفلية (Banner)، الإعلانات البينية (Interstitial)، وإعلانات المكافأة عند مشاهدة فيديو (Rewarded Ads).'
        ],
        codeExample: {
          language: 'dart',
          filename: 'paywall_integration.dart',
          code: `// RevenueCat / In-App Purchases Paywall Trigger Logic
import 'package:flutter/material.dart';

class PaywallCard extends StatelessWidget {
  final VoidCallback onPurchaseMonthly;
  final VoidCallback onPurchaseYearly;

  const PaywallCard({
    super.key,
    required this.onPurchaseMonthly,
    required this.onPurchaseYearly,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF18181B), Color(0xFF27272A)],
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.amber.withOpacity(0.5)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.workspace_premium, color: Colors.amber, size: 48),
          const SizedBox(height: 12),
          const Text(
            'قم بالترقية لحساب Pro ⭐',
            style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.black),
          ),
          const SizedBox(height: 8),
          const Text(
            'وصول غير محدود لجميع الأدوات والمزامنة السحابية وبدون إعلانات.',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey, fontSize: 13),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.amber,
              minimumSize: const Size(double.infinity, 48),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            ),
            onPressed: onPurchaseYearly,
            child: const Text('اشتراك سنوي (2.99$ / شهر) - وفر 40%', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }
}`
        },
        practiceTask: 'احسب العائد المتوقع لتطبيقك إذا حمل 1,000 شخص التطبيق واشترك 3% منهم بسعر 4.99$ شهرياً.',
        challenge: {
          title: 'دالة فحص هل المستخدم مشترك نشط حالياً',
          description: 'اكتب دالة تفحص صلاحيات المشترك لفتح الميزات المدفوعة أو إظهار نافذة الدفع.',
          hint: 'تحقق من قائمة الـ Entitlements.',
          solutionCode: `bool hasActiveProAccess(Map<String, dynamic> customerInfo) {
  final activeEntitlements = customerInfo['entitlements']?['active'] as Map?;
  return activeEntitlements != null && activeEntitlements.containsKey('pro_features');
}`
        },
        quiz: {
          question: 'ما هي النسبة المئوية المعتادة التي تقتطعها متجري Apple و Google من مبيعات التطبيقات والاشتراكات لبرنامج الشركات الصغيرة؟',
          options: ['50%', '15% (ضمن برنامج Small Business Program للمطورين ذوي الدخل تحت مليون دولار)', '0%', '80%'],
          correctIndex: 1,
          explanation: 'أبل وجوجل تقدمان برنامجاً خاصاً يقلص العمولة من 30% إلى 15% فقط للمطورين والشركات الصغيرة التي تقل إيراداتها السنوية عن مليون دولار.'
        }
      }
    ]
  },

  // 13. Mobile App Freelancing
  {
    id: 'freelancing',
    number: 13,
    title: 'Mobile App Freelancing & Clients',
    level: 'advanced',
    icon: 'Briefcase',
    description: 'تسعير المشاريع، كتابة مقترحات العمل (Proposals)، إبرام عقود الصيانة، والتواصل الاحترافي مع العملاء لتسليم مشاريع بـ $500 إلى $5,000.',
    lessons: [
      {
        id: 'freelance-client-roadmap',
        moduleId: 'freelancing',
        number: 15,
        title: 'خارطة طريق الفريلانس: تحويل أفكار الشركات المحلية إلى عقود وتطبيقات مربحة',
        level: 'advanced',
        duration: '26 دقيقة',
        summary: 'كيف تختار نيتش خدماتك، تحدد نطاق المشروع (Scope of Work)، تبرم عقد الصيانة الشهري، وتتواصل مع أصحاب الأعمال بطريقة تسد ثغراتهم.',
        explanation: [
          'الشركات لا تبحث عن مبرمج يكتب كوداً، بل تبحث عن شريك يحل مشكلة: جلب حجوزات أكثر لعيادة، تقليل المكالمات الهاتفية لمطعم، أو أتمتة مهام موظفي التوصيل.',
          'تحديد النطاق (Scope of Work): وثيقة صريحة تحدد الشاشات، بوابات الدفع، عدد لغات التطبيق، والتكاملات المطلوبة لمنع العميل من إضافة طلبات عشوائية مجانية أثناء التطوير.',
          'تسعير القيمة (Value-based Pricing): التطبيق البسيط (MVP) يتراوح بين 500$ إلى 1,500$، والتطبيق المتوسط مع خادم وقاعدة بيانات يتراوح بين 1,800$ إلى 4,500$.',
          'عقد الصيانة الشهري (Retainer): احرص دائماً بعد تسليم التطبيق على عرض خدمة الصيانة الشهرية (100$ - 300$/شهرياً) لتحديث التطبيق مع إصدارات iOS/Android الجديدة وعمل نسخ احتياطية.'
        ],
        codeExample: {
          language: 'markdown',
          filename: 'client_proposal_template.md',
          code: `# عرض عمل برمجي احترافي (Mobile App Development Proposal)

## 1. ملخص المشروع والهدف
تطوير تطبيق جوال مخصص لـ [اسم الشركة] يعمل بكفاءة على نظامي iOS و Android، بهدف تمكين زبائن الشركة من حجز المواعيد واستعراض قائمة الخدمات والدفع الإلكتروني دون الحاجة للاتصال الهاتفي.

## 2. نطاق العمل والتسليمات (Deliverables)
- تطبيق هاتف موحد (Cross-Platform) مبني بـ Flutter / React Native بأداء سلس.
- شاشات: الرئيسية، الخدمات، تفاصيل الحجز، تأكيد الدفع عبر [اسم بوابة الدفع]، وصفحة الملف الشخصي.
- لوحة تحكم سحابية مبسطة لإدارة الحجوزات والزبائن.
- رفع ونشر التطبيق على حسابات المطور الخاصة بكم على Google Play و App Store.
- ضمان صيانة وإصلاح أخطاء مجاني لمدة 30 يوماً بعد الإطلاق.

## 3. الجدول الزمني والتكلفة
- مدة التنفيذ: 4 أسابيع عمل.
- القيمة الاستثمارية: 1,800$ (مقسمة: 40% دفعة مقدمة، 30% بعد المعاينة، 30% عند النشر).`
        },
        practiceTask: 'حدد 3 أنشطة تجارية في مدينتك (مثل صالون تجميل، عيادة أسنان، أو متجر حلويات) تعتمد على واتساب لتسجيل الطلبات واقترح فكرة تطبيق مصغر يوفر وقتهم.',
        challenge: {
          title: 'صياغة رسالة تواصل باردة (Cold Outreach) لا يمكن تجاهلها',
          description: 'اكتب رسالة بريد أو رسالة لينكدإن تتواصل بها مع مدير شركة تعرض فيها حلاً عملياً لمشكلة واضحة في عملهم.',
          hint: 'ابدأ بالإشارة لنقاط ضعفهم الحالية وكيف وفر تطبيقك لشركة مشابهة 15 ساعة أسبوعياً.',
          solutionCode: `// الرسالة الجاهزة متوفرة في تبويب العمل الحر أدناه وجاهزة للنسخ بنقرة واحدة.`
        },
        quiz: {
          question: 'ما هي الطريقة الفضلى لحماية نفسك كمطور مستقل من طلبات التعديلات اللانهائية والمجانية من العميل (Scope Creep)؟',
          options: [
            'العمل بدون عقد ثقة بالعميل',
            'كتابة وثيقة نطاق عمل (Scope Document) تحدد الشاشات والمزايا بدقة وتنص على أن أي ميزة إضافية تُسعر كملحق مستقل',
            'إغلاق الهاتف بعد استلام الدفعة الأولى',
            'التوقف عن الرد على الرسائل'
          ],
          correctIndex: 1,
          explanation: 'وثيقة نطاق العمل التفصيلية تحمي الطرفين: توضح للعميل ما سيحصل عليه بالمللي، وتمنع إضافة مزايا عملاقة في منتصف الطريق دون مقابل مادي إضافي.'
        }
      }
    ]
  }
];

// ============================================================================
// 2. 7 REAL PROGRESSIVE MOBILE PROJECTS
// ============================================================================

export const realMobileProjectsList: RealMobileProject[] = [
  {
    id: 'proj-1',
    number: 1,
    title: 'تطبيق إدارة المهام الذكي (To-Do & Habit Tracker App)',
    level: 'beginner',
    category: 'Productivity',
    idea: 'تطبيق شخصي لترتيب المهام اليومية مع إمكانية تصنيفها حسب الأولوية، وإشعار يومي للتذكير، وحفظ البيانات محلياً على الهاتف.',
    planning: [
      'تحديد حالات المهمة: قيد الانتظار، مكتملة، مؤجلة، وأولويات (منخفضة، متوسطة، عاجلة).',
      'بناء واجهة إدخال سريعة بلمسة واحدة من أسفل الشاشة (Bottom Sheet).',
      'حفظ المهام في قاعدة بيانات محلية (SQLite أو SharedPreferences/Hive).',
      'إضافة تصفية للمهام حسب اليوم والفئة مع عداد إنجاز تفاعلي.'
    ],
    uiSpecs: [
      'شاشة قائمة رئيسية مع مؤشر إنجاز دائري علوي بالنسبة المئوية.',
      'زر عائم (FAB) يفتح نافذة سفلية أنيقة لإضافة المهمة وتاريخ التذكير.',
      'إمكانية سحب العنصر (Swipe to delete / complete) مع رد فعل حركي (Haptic Feedback).'
    ],
    architecture: [
      'State Management: Provider أو Riverpod أو Zustand لإدارة حالة القائمة.',
      'Local Storage: استخدام Hive أو SQLite لتخزين المهام دون الحاجة لإنترنت.',
      'Notification Service: جدولة إشعار محلي صباحي ومسائي.'
    ],
    codeHighlight: {
      language: 'dart',
      filename: 'todo_main_controller.dart',
      code: `// To-Do App Core State & Task Filtering
class TaskItem {
  final String id;
  final String title;
  final String category;
  final bool isDone;
  final DateTime dueDate;

  TaskItem({
    required this.id,
    required this.title,
    required this.category,
    this.isDone = false,
    required this.dueDate,
  });
}

class TodoNotifier extends ChangeNotifier {
  final List<TaskItem> _items = [];
  String _activeFilter = 'all';

  List<TaskItem> get filteredTasks {
    if (_activeFilter == 'pending') return _items.where((t) => !t.isDone).toList();
    if (_activeFilter == 'done') return _items.where((t) => t.isDone).toList();
    return _items;
  }

  double get completionRate => _items.isEmpty ? 0 : (_items.where((t) => t.isDone).length / _items.length);
}`
    },
    testingChecklist: [
      'إغلاق التطبيق وإعادة فتحه للتأكد من عدم فقدان المهام المخزنة.',
      'التأكد من التجاوب التام عند التمرير بسرعة عالية دون أي تقطيع (60fps).',
      'اختبار إضافة نصوص طويلة جداً والتأكد من عدم حدوث Overflow بالأصفر والأسود.'
    ],
    buildSteps: [
      'تجهيز أيقونة التطبيق بدقة 1024x1024 عبر App Icon Generator.',
      'تشغيل أمر flutter build appbundle للإنتاج واختبار ملف التثبيت على هاتف حقيقي.'
    ]
  },
  {
    id: 'proj-2',
    number: 2,
    title: 'تطبيق تدوين الملاحظات الغنية (Markdown Notes & Audio Memo App)',
    level: 'beginner',
    category: 'Utility',
    idea: 'تطبيق تدوين احترافي يدعم تنسيق النصوص (Bold, Lists, Headers)، التسجيلات الصوتية السريعة، والتصنيف بالوسوم والألوان.',
    planning: [
      'بناء محرر نصوص تفاعلي يدعم التنسيق الغني وتلوين الملاحظة.',
      'دمج ميزة البحث اللحظي بالكلمات داخل نصوص الملاحظات المخزنة.',
      'تشفير الملاحظات الحساسة بقفل البصمة أو الـ Face ID.'
    ],
    uiSpecs: [
      'شبكة ملاحظات مصفوفة (Staggered Masonry Grid) لترتيب الملاحظات بأطوال مختلفة كـ Google Keep.',
      'شريط أدوات سفلي مدمج لتلوين الخلفية وإرفاق تسجيل صوتي أو صورة.',
      'نمط قراءة خالي من التشتت (Full-screen Zen Mode).'
    ],
    architecture: [
      'Local Storage: استخدام SQLite مع Full-Text Search (FTS) لبحث فوري وفائق السرعة.',
      'Biometric Authentication: استخدام local_auth للتحقق من هوية المستخدم قبل فتح الملاحظة المحمية.'
    ],
    codeHighlight: {
      language: 'dart',
      filename: 'note_model_and_search.dart',
      code: `// Markdown Notes Model with Color Palette & Biometrics
class NoteRecord {
  final String id;
  final String title;
  final String contentMarkdown;
  final int colorHex;
  final bool isLocked;
  final DateTime updatedAt;

  NoteRecord({
    required this.id,
    required this.title,
    required this.contentMarkdown,
    this.colorHex = 0xFF18181B,
    this.isLocked = false,
    required this.updatedAt,
  });
}`
    },
    testingChecklist: [
      'تجربة البحث باللغتين العربية والإنجليزية والتأكد من دعم الـ RTL بشكل نظيف.',
      'فحص فتح ملاحظة مقفولة بالبصمة والتأكد من رفض الفتح عند فشل البصمة.'
    ],
    buildSteps: [
      'إضافة تصريح البصمة في AndroidManifest.xml و Info.plist (NSFaceIDUsageDescription).',
      'بناء وتجربة الـ APK على هاتف حقيقي يدعم البصمة.'
    ]
  },
  {
    id: 'proj-3',
    number: 3,
    title: 'تطبيق تتبع المصاريف والميزانية الشخصية (Expense & Budget Tracker)',
    level: 'intermediate',
    category: 'Finance',
    idea: 'تطبيق مالي شخصي يساعد المستخدم على تسجيل مصروفاته اليومية، رسم مخططات بيانية لتوزيع النفقات، وتنبيهه عند تجاوز حد الميزانية.',
    planning: [
      'تصنيف المصاريف: طعام، مواصلات، فواتير، ترفيه، واستثمار.',
      'رسم بياني دائري (Pie Chart) يوضح نسب الصرف شهرياً.',
      'تصدير تقرير المصاريف الشهري بصيغة ملف PDF أو Excel بنقرة واحدة.'
    ],
    uiSpecs: [
      'بطاقة علوية داكنة فخمة تعرض الرصيد الكلي المتبقي ومصروفات الشهر.',
      'مخطط بياني تفاعلي (fl_chart) يتغير حسب الشهر المحدد.',
      'لوحة أرقام سريعة ومخصصة لتسجيل المبلغ في 3 ثوان فقط.'
    ],
    architecture: [
      'Chart Engine: استخدام مكتبة fl_chart لرسم بياني عالي الأداء مع أنيميشن سلس.',
      'PDF Generation: مكتبة pdf لإنشاء تقرير مالي رسمي قابل للطباعة والمشاركة.'
    ],
    codeHighlight: {
      language: 'dart',
      filename: 'expense_calculations.dart',
      code: `// Expense Analytics & Category Breakdown Logic
class ExpenseEntry {
  final String id;
  final double amount;
  final String category;
  final DateTime date;

  ExpenseEntry({required this.id, required this.amount, required this.category, required this.date});
}

Map<String, double> calculateCategoryPercentages(List<ExpenseEntry> expenses) {
  final total = expenses.fold(0.0, (acc, item) => acc + item.amount);
  if (total == 0) return {};

  final Map<String, double> result = {};
  for (var entry in expenses) {
    result[entry.category] = (result[entry.category] ?? 0.0) + (entry.amount / total * 100);
  }
  return result;
}`
    },
    testingChecklist: [
      'التحقق من صحة جمع الكسور العشرية والعملات المختلفة دون أخطاء تقريبية.',
      'تجربة إنشاء ملف PDF ومشاركته عبر واتساب للتأكد من سلامة الخط العربي داخل التقرير.'
    ],
    buildSteps: [
      'إضافة أذونات مشاركة الملفات وحفظ التقارير على الهاتف.',
      'بناء حزمة الإنتاج وتوقيعها للرفع.'
    ]
  },
  {
    id: 'proj-4',
    number: 4,
    title: 'تطبيق متجر إلكتروني وسلة مشتريات (E-commerce Mobile App)',
    level: 'intermediate',
    category: 'E-commerce',
    idea: 'تطبيق متجر إلكتروني متكامل: استعراض المنتجات وتصنيفاتها، السلة، كوبونات الخصم، العناوين على الخريطة وبوابة دفع إلكتروني.',
    planning: [
      'ربط التطبيق بـ Backend API (أو WooCommerce / Shopify Storefront API).',
      'إدارة سلة المشتريات وتحديث الأسعار لحظياً عند تطبيق كود الخصم.',
      'دمج بوابات الدفع الشهيرة (Stripe أو Apple Pay أو بوابة دفع محلية كـ Paymob / Moyasar).'
    ],
    uiSpecs: [
      'شاشة رئيسية تحتوي على بنرات عروض متحركة (Carousel Slider).',
      'بطاقات منتجات أنيقة مع زر إضافة سريع للسلة وزر المفضلة.',
      'شاشة سلة تتضمن ملخص التكلفة، الضريبة، والشحن، وزر Checkout بارز.'
    ],
    architecture: [
      'State Management: Bloc أو Riverpod للتعامل مع حالات السلة والطلبات المعقدة.',
      'Payment Gateway SDK: دمج الـ SDK الخاص ببوابة الدفع لإجراء المعاملات الآمنة.'
    ],
    codeHighlight: {
      language: 'dart',
      filename: 'cart_state_manager.dart',
      code: `// Cart Item & Total Price with Coupon Logic
class CartItemModel {
  final String productId;
  final String title;
  final double unitPrice;
  int quantity;

  CartItemModel({required this.productId, required this.title, required this.unitPrice, this.quantity = 1});

  double get totalPrice => unitPrice * quantity;
}

class CartManager extends ChangeNotifier {
  final Map<String, CartItemModel> _cartItems = {};

  double get subtotal => _cartItems.values.fold(0.0, (acc, item) => acc + item.totalPrice);
  double get shippingFee => subtotal > 100 ? 0.0 : 15.0; // شحن مجاني فوق 100$
  double get grandTotal => subtotal + shippingFee;
}`
    },
    testingChecklist: [
      'تجربة دفع تجريبية كاملة عبر بطاقة Test Card والتأكد من إتمام الطلب وتفريغ السلة.',
      'اختبار تعديل الكميات وحذف العناصر من السلة والتأكد من التحديث اللحظي للمجاميع.'
    ],
    buildSteps: [
      'تهيئة معرفات Apple Pay و Google Pay في الحسابات الرسمية قبل البناء النهائي.'
    ]
  },
  {
    id: 'proj-5',
    number: 5,
    title: 'تطبيق حجز المواعيد والخدمات (Service & Salon Booking App)',
    level: 'intermediate',
    category: 'Booking & Services',
    idea: 'تطبيق لأصحاب الصالونات أو العيادات أو الورش لاختيار الخدمة، تحديد الموظف المفضل، واختيار التوقيت المتاح من الروزنامة وحجز الموعد.',
    planning: [
      'حساب الساعات المتاحة (Available Time Slots) وتجنب الحجز المزدوج لنفس التوقيت.',
      'إرسال إشعار تذكيري للمستخدم بالموعد قبل ساعتين من التوقيت المحدد.',
      'لوحة شاشة للعميل لمراجعة وإلغاء أو تعديل الحجوزات السابقة.'
    ],
    uiSpecs: [
      'روزنامة أفقية متجاوبة لاختيار اليوم.',
      'شبكة رقائق (Chips Grid) للأوقات المتاحة تتلون بالأخضر عند الاختيار.',
      'بطاقة ملخص الحجز مع زر تأكيد نهائي وربط مع تقويم الهاتف (Add to Calendar).'
    ],
    architecture: [
      'Calendar API: التفاعل مع تقويم الجهاز لإضافة الحجز للروزنامة الشخصية.',
      'Cloud Functions: التحقق في السيرفر لمنع أي حجز متزامن لنفس الموظف.'
    ],
    codeHighlight: {
      language: 'dart',
      filename: 'slots_generator.dart',
      code: `// Generate Available Hourly Booking Slots
List<String> generateTimeSlots({required int startHour, required int endHour, required List<String> bookedSlots}) {
  final List<String> available = [];
  for (int hour = startHour; hour < endHour; hour++) {
    final slot = '\${hour.toString().padLeft(2, '0')}:00';
    if (!bookedSlots.contains(slot)) {
      available.add(slot);
    }
  }
  return available;
}`
    },
    testingChecklist: [
      'محاولة حجز موعد محجوز مسبقاً والتأكد من إظهار رسالة تفيد بعدم التوفر.',
      'فحص إضافة الموعد لروزنامة الهاتف تلقائياً بعد نجاح الحجز.'
    ],
    buildSteps: [
      'إضافة تراخيص الروزنامة Calendar Permissions في Android و iOS.'
    ]
  },
  {
    id: 'proj-6',
    number: 6,
    title: 'تطبيق مخصص لشركة تجارية وخدمة عملاء (Business Mobile App)',
    level: 'advanced',
    category: 'B2B Solutions',
    idea: 'تطبيق B2B لشركة مقاولات أو توريد يتيح للعملاء متابعة مراحل تنفيذ مشاريعهم، الاطلاع على الفواتير، ومحادثة الدعم الفني مباشرة.',
    planning: [
      'شاشة تتبع مسار العمل بمؤشر مراحل (Timeline Progress Tracker).',
      'نظام شات مباشر وفوري بين العميل ومدير المشروع مع رفع الصور والمستندات.',
      'تنزيل وتوقيع العقود والمستندات إلكترونياً داخل التطبيق.'
    ],
    uiSpecs: [
      'شاشة رئيسية تعرض هوية الشركة مع بطاقة المشروع النشط ونسبة الإنجاز الحالية.',
      'واجهة محادثة فورية تشبه واتساب مع معاينة الصور وفيديوهات التقدم في الموقع.',
      'شاشة مستندات وفواتير مرتبة ومحفوظة للأرشفة.'
    ],
    architecture: [
      'WebSockets أو Firebase Realtime: لإرسال واستقبال رسائل المحادثة الفورية دون تأخير.',
      'Cloud Storage: لتخزين صور مراحل التنفيذ والفواتير بصيغة PDF.'
    ],
    codeHighlight: {
      language: 'dart',
      filename: 'project_timeline.dart',
      code: `// Business Project Milestone Timeline Status
enum MilestoneStatus { completed, inProgress, pending }

class ProjectMilestone {
  final String title;
  final String description;
  final MilestoneStatus status;
  final String? dateCompleted;

  ProjectMilestone({
    required this.title,
    required this.description,
    required this.status,
    this.dateCompleted,
  });
}`
    },
    testingChecklist: [
      'اختبار إرسال رسالة والتأكد من وصولها للطرف الآخر في أقل من 500 ميلي ثانية.',
      'فحص تشغيل التطبيق في وضع الصلاحيات المقيدة والتأكد من التعامل مع رفض الصلاحية بنعومة.'
    ],
    buildSteps: [
      'تجهيز التطبيق للنشر الخاص (Enterprise / Unlisted Distribution) أو عبر متاجر التطبيقات.'
    ]
  },
  {
    id: 'proj-7',
    number: 7,
    title: 'تطبيق رقمي متكامل بنظام اشتراكات (SaaS Mobile Micro-App)',
    level: 'advanced',
    category: 'SaaS & Subscriptions',
    idea: 'تطبيق منتج رقمي متكامل (مثل أداة تحسين الصور أو أداة تفريغ النصوص الصوتية) يقدم نموذج اشتراكات مدفوع أسبوعياً وشهرياً عبر RevenueCat.',
    planning: [
      'بناء وظيفة محددة فائقة الجودة والقيمة (Core Unique Value Proposition).',
      'حجب النتائج بعد أول تجربة مجانية خلف جدار دفع Paywall عالي الإقناع والتحويل.',
      'دمج تحليلات الاستخدام (Mixpanel / Amplitude) لفهم أي الميزات تقود المستخدم للاشتراك.'
    ],
    uiSpecs: [
      'تجربة إعداد مبهرة عند أول تشغيل (Interactive Onboarding) من 3 خطوات تكشف للمستخدم قيمته.',
      'جدار دفع ديناميكي (High-Converting Paywall) مع إمكانية التبديل بين خطة سنوية وشهرية وتجربة مجانية لـ 3 أيام.',
      'شاشة إدارة الحساب مع زر استعادة المشتريات (Restore Purchases) الضروري لقبول متجر أبل.'
    ],
    architecture: [
      'RevenueCat SDK: لإدارة جميع عمليات الشراء والتحقق من الفواتير سحابياً.',
      'Analytics & Deep Linking: لتعقب حملات الترويج على تيك توك وتوجيه المشتركين للعرض مباشرة.'
    ],
    codeHighlight: {
      language: 'dart',
      filename: 'saas_onboarding_and_paywall.dart',
      code: `// Paywall Trigger & Pro Status Checking
import 'package:flutter/material.dart';

class SaasPaywallManager {
  static Future<void> checkFeatureAccess({
    required BuildContext context,
    required bool isProUser,
    required VoidCallback onFeatureGranted,
  }) async {
    if (isProUser) {
      onFeatureGranted();
    } else {
      // إظهار نافذة الترقية للمستخدم
      showModalBottomSheet(
        context: context,
        isScrollControlled: true,
        backgroundColor: Colors.transparent,
        builder: (_) => Container(
          height: MediaQuery.of(context).size.height * 0.85,
          decoration: const BoxDecoration(
            color: Color(0xFF09090B),
            borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
          ),
          child: const Center(child: Text('جدار الدفع - اختر خطة الاشتراك')),
        ),
      );
    }
  }
}`
    },
    testingChecklist: [
      'فحص زر استعادة المشتريات (Restore Purchases)؛ أبل ترفض أي تطبيق اشتراكات بدون هذا الزر.',
      'اختبار الحساب التجريبي للمراجع (Sandbox Testing) للتأكد من نجاح تفعيل الاشتراك الفوري.'
    ],
    buildSteps: [
      'تجهيز عناصر الـ In-App Purchases في لوحة App Store Connect و Google Play Console.',
      'رفع نسخة الإنتاج وتقديمها للمراجعة النهائية مع فيديو توضيحي لميزات الـ Pro للمراجعين.'
    ]
  }
];

// ============================================================================
// 3. APP MONETIZATION MODELS
// ============================================================================

export const mobileMonetizationModels: MonetizationModel[] = [
  {
    id: 'sub',
    title: 'الاشتراكات المتكررة (In-App Subscriptions)',
    badge: 'الأعلى تقييماً وأرباحاً',
    description: 'دفع اشتراك أسبوعي أو شهري أو سنوي للوصول لميزات التطبيق الحصرية أو محتواه المتجدد باستمرار.',
    potentialIncome: '$1,000 - $35,000+ شهرياً بعد بناء قاعدة مشتركين',
    bestFor: 'تطبيقات الإنتاجية، تتبع العادات، الرياضة، الأدوات، والتطبيقات المعتمدة على الذكاء الاصطناعي.',
    keySteps: [
      'حدد ميزة رئيسية توفر للمستخدم وقتاً حقيقياً واجعلها مقتصرة على المشتركين.',
      'وفر فترة تجربة مجانية لـ 3 أيام (Free Trial) لتقليل حاجز الشراء الأولي.',
      'اعتمد أداة RevenueCat لإدارة اشتراكات أبل وجوجل بكود موحد.',
      'وفر خيار اشتراك سنوي بتخفيض 40% للحصول على كاش مسبق فوري.'
    ],
    topTools: ['RevenueCat', 'App Store Connect', 'Google Play Billing', 'Adapty'],
    proTip: 'المستخدمون في تطبيقات الموبايل مستعدون لدفع 19.99$ إلى 49.99$ سنوياً دون تردد إذا كانت الأداة توفر عليهم نصف ساعة أسبوعياً.'
  },
  {
    id: 'b2b-sales',
    title: 'تطوير وبيع التطبيقات للشركات والأنشطة المحلية',
    badge: 'أسرع عائد نقدي مباشر',
    description: 'برمجة تطبيقات متخصصة لشركات المقاولات، الصالونات، العيادات، والمتاجر المحلية مقابل مبالغ نقدية مقطوعة وعقود صيانة.',
    potentialIncome: '$800 - $4,500 للمشروع الواحد + $100-$300 شهرياً لكل عميل صيانة',
    bestFor: 'المطورين المستقلين الراغبين في دخل سريع ومؤكد دون انتظار نمو التحميلات على المتاجر.',
    keySteps: [
      'ابحث عن نشاط محلي يخسر زبائن بسبب اعتماده على المكالمات اليدوية.',
      'اصنع نموذج معاينة حي مصغر للتطبيق في 48 ساعة واعرضه على صاحب العمل.',
      'سعر المشروع بناءً على العائد الذي يجلبه التطبيق وليس بساعات العمل.',
      'وقع عقداً ينص على دفع 40% مقدماً وخدمة صيانة شهرية بعد التسليم.'
    ],
    topTools: ['Flutter', 'Firebase', 'WhatsApp Business API', 'Stripe'],
    proTip: 'إذا أغلقت عقود صيانة مع 10 شركات محلية بـ 150$ شهرياً، ستضمن دخلاً سلبياً أساسياً قدره 1,500$ شهرياً قبل برمجة أي سطر كود جديد.'
  },
  {
    id: 'freemium-ads',
    title: 'الإعلانات الذكية والشراء لمرة واحدة (Ads & One-Time IAP)',
    badge: 'الأسهل في البدء',
    description: 'تطبيق مجاني بالكامل يعرض إعلانات غير مزعجة (AdMob) مع خيار شراء لمرة واحدة (1.99$ - 4.99$) لإزالة الإعلانات للأبد.',
    potentialIncome: '$200 - $3,500 شهرياً بحسب عدد مرات فتح التطبيق يومياً',
    bestFor: 'الألعاب الخفيفة، الآلات الحاسبة المتخصصة، وتطبيقات الأدوات اليومية السريعة.',
    keySteps: [
      'تجنب إظهار الإعلانات في أول دقيقتين من استخدام التطبيق حتى لا يفر المستخدم.',
      'استخدم إعلانات المكافأة (Rewarded Ads): شاهد إعلاناً للحصول على ميزة مجاناً.',
      'وفر زراً واضحاً في الشاشة: "إزالة الإعلانات بـ 2.99$ للأبد".'
    ],
    topTools: ['Google AdMob', 'Unity Ads', 'AppLovin MAX'],
    proTip: 'إعلانات المكافأة (Rewarded Ads) تحقق أعلى معدل ربح لكل ألف ظهور (eCPM) وتصل لـ 15$ - 30$ في دول الخليج وأمريكا.'
  }
];

// ============================================================================
// 4. FREELANCE SERVICES & OUTREACH
// ============================================================================

export const mobileFreelanceServices: FreelanceMobileService[] = [
  {
    title: 'بناء تطبيق MVP متكامل للشركات الناشئة (Startup MVP)',
    priceRange: '$1,200 - $3,500',
    deliveryTime: '3 - 5 أسابيع',
    targetClient: 'أصحاب الأفكار والشركات الناشئة التي تبحث عن نموذج أولي لإثبات الفكرة أمام المستثمرين والزبائن.',
    deliverables: [
      'تطبيق يعمل بنعومة على هواتف iOS و Android بكود موحد.',
      'شاشات التسجيل، لوحة العميل، ونظام الإشعارات.',
      'ربط قاعدة بيانات سحابية وتجهيز ملفات النشر للمتجرين.',
      '30 يوماً من الدعم الفني وحل الأخطاء البرمجية مجاناً.'
    ]
  },
  {
    title: 'تطبيقات الحجوزات والمتاجر للأنشطة والشركات المحلية',
    priceRange: '$800 - $2,200',
    deliveryTime: '2 - 3 أسابيع',
    targetClient: 'العيادات الطبية، صالونات التجميل، مطاعم الوجبات السريعة، ومتاجر التجزئة المتخصصة.',
    deliverables: [
      'تطبيق مخصص بالهوية البصرية للنشاط التجاري.',
      'نظام حجز فوري للمواعيد وتأكيد الحجز عبر رسائل الواتساب أو الإشعارات.',
      'ربط بوابة دفع إلكترونية محلية أو دولية مع لوحة تحكم لإدارة الطلبات.',
      'فيديو شرح مدته 10 دقائق لتدريب موظفي العميل على متابعة الحجوزات.'
    ]
  },
  {
    title: 'تحويل مواقع الويب والمتاجر إلى تطبيقات جوال أصلية',
    priceRange: '$500 - $1,400',
    deliveryTime: '7 - 14 يوماً',
    targetClient: 'أصحاب المتاجر الإلكترونية على سلة أو زد أو شوبيفاي أو ووردبريس الراغبين في زيادة مبيعاتهم عبر تطبيق جوال.',
    deliverables: [
      'تطبيق سريع ومتجاوب يعكس منتجات المتجر مباشرة مع تحديث لحظي.',
      'ميزة الإشعارات الترويجية لجذب الزبائن للعروض وتخفيضات نهاية الأسبوع.',
      'شريط تنقل سفلي وواجهة تسوق مريحة بيد واحدة.',
      'النشر الرسمي على متجر Google Play و App Store.'
    ]
  }
];

export const mobileClientOutreachEmail = {
  subject: 'فكرة تطبيق تزيد حجوزات [اسم النشاط أو الصالون/العيادة] بنسبة 25% وتوفر وقت المكالمات',
  body: `مرحباً أستاذ [اسم المسؤول أو صاحب العمل]، أتمنى أن تكون بأفضل حال.

لاحظت الإقبال الممتاز والسمعة الطيبة لـ [اسم النشاط/الشركة]، ولكن لاحظت أيضاً أن عملية الحجز وتأكيد الطلبات تعتمد بشكل أساسي على الاتصالات والرسائل اليدوية، وهو ما يستهلك ساعات يومياً من موظفيكم ويتسبب أحياناً في ضياع زبائن في أوقات الذروة.

بصفتي مطور تطبيقات جوال متخصص في حلول الأنشطة الخدمية، قمت بإعداد نموذج أولي سريع (Demo Prototype) لتطبيق جوال بالهوية البصرية لشركتكم يتيح لزبائنكم:
1. استعراض الخدمات والأسعار في واجهة أنيقة باللغة العربية.
2. اختيار الموظف والموعد المتاح وحجز الخدمة في أقل من 30 ثانية.
3. استلام إشعار تلقائي على الهاتف لتذكيرهم بالموعد لتقليل حالات التخلف عن الحضور.

هل يناسبك أن أرسل لك رابط المعاينة الحية السريعة (دقيقتين فقط) لتجربتها بنفسك وتخبرني برأيك؟

مع خالص التقدير،
[اسمك]
مطور تطبيقات الجوال (Flutter & React Native)`
};
