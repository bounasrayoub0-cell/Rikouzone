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

export interface WebModule {
  id: string;
  number: number;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  description: string;
  lessons: LessonItem[];
}

export interface RealProject {
  id: string;
  number: number;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  brief: string;
  features: string[];
  planningSteps: string[];
  htmlStructure: string;
  cssHighlights: string;
  jsLogic?: string;
  testingChecklist: string[];
  deploymentSteps: string[];
}

export interface FreelanceService {
  title: string;
  priceRange: string;
  deliveryTime: string;
  description: string;
  deliverables: string[];
}

// 1. MODULES AND LESSONS
export const webDevelopmentModules: WebModule[] = [
  {
    id: 'intro',
    number: 1,
    title: 'Introduction to Web Development',
    level: 'beginner',
    icon: 'Compass',
    description: 'فهم البنية الأساسية لكيفية عمل الويب، الفرق بين اللغات، وخريطة طريق مطور الويب لعام 2026.',
    lessons: [
      {
        id: 'intro-how-web-works',
        moduleId: 'intro',
        number: 1,
        title: 'كيف يعمل الويب؟ (Client vs Server & DNS)',
        level: 'beginner',
        duration: '15 دقيقة',
        summary: 'فهم رحلة الطلب عندما يكتب المستخدم عنوان موقع في المتصفح حتى ظهور الصفحة أمامه.',
        explanation: [
          'العميل (Client): هو المتصفح (Chrome, Safari, Firefox) الذي يستخدمه الزائر لطلب صفحات الويب.',
          'الخادم (Server): هو جهاز حاسوب قوي متصل بالإنترنت 24/7 ومخزن عليه ملفات الموقع (HTML, CSS, JS, صور).',
          'نظام أسماء النطاقات (DNS): هو دليل هاتف الإنترنت الذي يحول الاسم (google.com) إلى عنوان IP رقمي (142.250.190.46).',
          'بروتوكول HTTP/HTTPS: القواعد الآمنة لنقل البيانات بين العميل والخادم. حرف الـ S يعني اتصال مشفر وآمن.'
        ],
        codeExample: {
          language: 'html',
          filename: 'index.html',
          code: `<!-- أول صفحة ويب بسيطة تفهمها المتصفحات -->
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>مرحباً بك في عالم الويب</title>
</head>
<body>
  <h1>أهلاً بك في أول موقع لك! 🚀</h1>
  <p>هذا النص أرسله الخادم وقام المتصفح بقراءته وعرضه لك.</p>
</body>
</html>`
        },
        practiceTask: 'قم بفتح متصفحك، واضغط F12 لفتح Developer Tools، ثم توجه إلى تبويب Network وأعد تحميل أي صفحة لتشاهد الطلبات المتبادلة بين المتصفح والخادم.',
        challenge: {
          title: 'تحدي استكشاف الـ HTTP Headers',
          description: 'افحص كود الحالة (Status Code) الذي يرجعه المتصفح لصفحة موجودة ولصفحة غير موجودة.',
          hint: 'الصفحة الناجحة ترجع 200 OK، والصفحة المفقودة ترجع 404 Not Found.',
          solutionCode: `// أكواد حالة HTTP الشهيرة:
// 200: نجاح الطلب (OK)
// 301: إعادة توجيه دائمة (Moved Permanently)
// 404: الصفحة غير موجودة (Not Found)
// 500: خطأ داخلي في الخادم (Internal Server Error)`
        },
        quiz: {
          question: 'ما هو الدور الأساسي لنظام الـ DNS في تصفح الإنترنت؟',
          options: [
            'تشفير كلمات المرور في الموقع',
            'تحويل اسم النطاق المقروء إلى عنوان IP رقمي يفهمه الخادم',
            'تسريع تحميل الصور على الموبايل',
            'تصميم الألوان والخطوط في الصفحة'
          ],
          correctIndex: 1,
          explanation: 'الـ DNS (Domain Name System) يعمل تماماً مثل دفتر الهاتف؛ يحول الأسماء مثل rikouzone.com إلى عنوان IP رقمي لتحديد مكان الخادم.'
        }
      },
      {
        id: 'intro-trio',
        moduleId: 'intro',
        number: 2,
        title: 'الثلاثي الأساسي: HTML vs CSS vs JavaScript',
        level: 'beginner',
        duration: '20 دقيقة',
        summary: 'فهم أدوار التقنيات الثلاث: الهيكل، والمظهر، والتفاعل والسلوك.',
        explanation: [
          'HTML (HyperText Markup Language): هي هيكل وعظام الصفحة (العناوين، الفقرات، الصور، الأزرار، النماذج).',
          'CSS (Cascading Style Sheets): هي مظهر وملابس الصفحة (الألوان، الخطوط، المسافات، التجاوب، الترتيب).',
          'JavaScript: هي عقل وحركة الصفحة (التفاعل عند النقر، التحقق من البيانات، جلب بيانات من الخادم بدون تحديث الصفحة).'
        ],
        codeExample: {
          language: 'html',
          filename: 'demo.html',
          code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <style>
    /* CSS: المظهر والستايل */
    .card {
      background: #18181b;
      color: #fff;
      padding: 24px;
      border-radius: 16px;
      border: 1px solid #27272a;
      max-width: 320px;
      text-align: center;
      font-family: system-ui, sans-serif;
    }
    .btn {
      background: #f59e0b;
      color: #000;
      border: none;
      padding: 10px 20px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <!-- HTML: الهيكل والعناصر -->
  <div class="card">
    <h2>منتج مميز</h2>
    <p id="counter-text">عدد الإعجابات: 0</p>
    <button class="btn" onclick="increaseLikes()">أعجبني ❤️</button>
  </div>

  <!-- JavaScript: التفاعل والسلوك -->
  <script>
    let count = 0;
    function increaseLikes() {
      count++;
      document.getElementById('counter-text').textContent = 'عدد الإعجابات: ' + count;
    }
  </script>

</body>
</html>`
        },
        practiceTask: 'انسخ الكود السابق وجربه في ملف محلي أو عبر موقع Codepen واضغط على الزر للتأكد من عمل العداد.',
        challenge: {
          title: 'تحدي زر إعادة التعيين (Reset)',
          description: 'أضف زراً ثانياً باللون الرمادي يعيد العداد إلى الرقم 0 عند الضغط عليه.',
          hint: 'اصنع دالة اسمها resetLikes() واجعل count = 0 ثم حدث نص العنصر.',
          solutionCode: `<!-- حل التحدي -->
<button class="btn" style="background:#52525b; color:#fff; margin-top:8px;" onclick="resetLikes()">إعادة ضبط 🔄</button>

<script>
function resetLikes() {
  count = 0;
  document.getElementById('counter-text').textContent = 'عدد الإعجابات: 0';
}
</script>`
        },
        quiz: {
          question: 'إذا أردت تغيير لون زر عند تحريك الفأرة فوقه (:hover)، ما هي التقنية المسؤولة عن ذلك؟',
          options: ['HTML', 'CSS', 'DNS', 'SQL'],
          correctIndex: 1,
          explanation: 'الـ CSS هي المسؤولة عن المظهر والتنسيق والحالات التفاعلية البصرية مثل hover و active.'
        }
      },
      {
        id: 'intro-roadmap',
        moduleId: 'intro',
        number: 3,
        title: 'مسار مطور الويب الاحترافي (Roadmap 2026)',
        level: 'beginner',
        duration: '15 دقيقة',
        summary: 'المسار التدريجي الواضح من الصفر وحتى إطلاق صفحات ومواقع تجارية جاهزة للعملاء.',
        explanation: [
          'المرحلة 1: إتقان HTML5 و CSS3 الحديثة وبناء صفحات هبوط متجاوبة بالكامل.',
          'المرحلة 2: إتقان JavaScript التفاعلية والـ DOM والـ LocalStorage والـ Fetch API.',
          'المرحلة 3: التعامل مع Git & GitHub لحفظ التحديثات وبناء معرض أعمال حي (Live Portfolio).',
          'المرحلة 4: تعلم إطار عمل حديث (مثل Tailwind CSS أو React) لنقل الإنتاجية لمستوى المحترفين.',
          'المرحلة 5: استضافة ونشر المواقع (Vercel, Netlify) وربط الدومينات وأساسيات السيو.'
        ],
        codeExample: {
          language: 'markdown',
          filename: 'ROADMAP.md',
          code: `# خريطة طريق الويب في 60 يوماً:
- الأسبوع 1-2: HTML5 + CSS3 + Flexbox + Grid
- الأسبوع 3-4: Responsive Design + إنشاء 3 صفحات هبوط
- الأسبوع 5-6: JavaScript الأساسية + DOM + APIs
- الأسبوع 7: Git, GitHub, Deployment (Vercel)
- الأسبوع 8: بناء البورتفوليو والبدء في مراسلة العملاء`
        },
        practiceTask: 'حدد هدفك: هل تريد بناء صفحات هبوط للعملاء (Landing Pages) أم مواقع شركات كاملة؟ اكتب قائمة بـ 3 مواقع يعجبك تصميمها.',
        challenge: {
          title: 'تحدي تحديد البيئة البرمجية',
          description: 'قم بتثبيت محرر الأكواد VS Code وإضافة ملحق Live Server لمعاينة صفحاتك فوراً عند الحفظ.',
          hint: 'افتح VS Code -> Extensions -> ابحث عن "Live Server" واضغط Install.',
          solutionCode: `// ملحقات موصى بها لمطور الويب:
1. Live Server (معاينة فورية في المتصفح)
2. Prettier (تنسيق تلقائي ونظيف للكود)
3. Auto Rename Tag (تعديل تلقائي لوسوم الإغلاق)`
        },
        quiz: {
          question: 'ما هو الترتيب الصحيح والمنطقي لبدء تعلم تطوير الواجهات الأمامية؟',
          options: [
            'React أولاً ثم HTML ثم CSS',
            'HTML أولاً، ثم CSS والتجاوب، ثم JavaScript',
            'قواعد البيانات SQL أولاً ثم التصميم',
            'Docker و Kubernetes ثم كتابة الكود'
          ],
          correctIndex: 1,
          explanation: 'الأساس يبدأ بفهم HTML لبناء الهيكل، ثم CSS لتنسيق المظهر والتجاوب، ثم JavaScript لإضافة الحيوية والتفاعل.'
        }
      }
    ]
  },
  {
    id: 'html',
    number: 2,
    title: 'HTML — Beginner to Advanced',
    level: 'beginner',
    icon: 'Code',
    description: 'بناء هياكل صفحات قوية، متوافقة مع معايير الوصول (Accessibility)، ومتصدرة لمحركات البحث (SEO).',
    lessons: [
      {
        id: 'html-structure',
        moduleId: 'html',
        number: 4,
        title: 'الهيكل القياسي والوسوم الدلالية (Semantic HTML)',
        level: 'beginner',
        duration: '25 دقيقة',
        summary: 'بناء صفحات نظيفة يفهمها محرك بحث Google ومساعدات القراءة بدلاً من إغراق الصفحة بـ div عشوائية.',
        explanation: [
          'الوسوم الدلالية تخبر المتصفح وجوجل بمعنى كل قسم في الصفحة.',
          '<header>: رأس الصفحة ويحتوي عادة على الشعار وقائمة الروابط.',
          '<nav>: شريط التنقل وروابط الصفحات.',
          '<main>: المحتوى الرئيسي الفريد للصفحة (يستخدم مرة واحدة فقط في الصفحة).',
          '<section> و <article>: لتنظيم الأقسام والمقالات المستقلة.',
          '<footer>: ذيل الصفحة ويحتوي على حقوق النشر وروابط الخصوصية والتواصل.'
        ],
        codeExample: {
          language: 'html',
          filename: 'semantic-page.html',
          code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="صفحة هبوط احترافية متوافقة مع محركات البحث">
  <title>وكالة الحلول الرقمية | الرئيسية</title>
</head>
<body>

  <!-- رأس الموقع والتنقل -->
  <header>
    <a href="/" class="logo">وكالة المستقبل</a>
    <nav aria-label="التنقل الرئيسي">
      <ul>
        <li><a href="#services">خدماتنا</a></li>
        <li><a href="#portfolio">أعمالنا</a></li>
        <li><a href="#contact">تواصل معنا</a></li>
      </ul>
    </nav>
  </header>

  <!-- المحتوى الرئيسي -->
  <main>
    <section id="hero">
      <h1>نبني مواقع ويب سريعة تضاعف مبيعاتك</h1>
      <p>نساعد الشركات وصناع المحتوى على تحويل الزوار إلى عملاء دائمين.</p>
      <a href="#contact" class="cta-button">ابدأ مشروعك اليوم</a>
    </section>

    <section id="services">
      <h2>ماذا نقدم لك؟</h2>
      <article>
        <h3>صفحات هبوط عالية التحويل</h3>
        <p>تصميم مخصص لمنتجك يركز على رفع نسبة المبيعات.</p>
      </article>
    </section>
  </main>

  <!-- ذيل الصفحة -->
  <footer>
    <p>&copy; 2026 وكالة المستقبل. جميع الحقوق محفوظة.</p>
  </footer>

</body>
</html>`
        },
        practiceTask: 'اكتب كود صفحة مقال شخصي باستخدام <article> و <header> و <time> وتاريخ النشر و <footer> الخاص بالكاتب.',
        challenge: {
          title: 'تحدي تحسين محركات البحث وسهولة الوصول',
          description: 'أضف وسم meta خاص بـ Open Graph لمشاركة الرابط بشكل جميل على واتساب وفيسبوك.',
          hint: 'استخدم og:title و og:description و og:image.',
          solutionCode: `<!-- وسوم المشاركة على السوشيال ميديا -->
<meta property="og:title" content="وكالة الحلول الرقمية">
<meta property="og:description" content="نبني مواقع ويب سريعة تضاعف مبيعاتك">
<meta property="og:image" content="https://example.com/preview.jpg">
<meta property="og:type" content="website">`
        },
        quiz: {
          question: 'لماذا يعتبر استخدام <header> و <main> أفضل من استخدام <div> العادية؟',
          options: [
            'لأنه يجعل الصفحة سريعة التحميل بمقدار 10 أضعاف',
            'لأنه يساعد محركات البحث وقارئات الشاشة على فهم سياق الصفحة وبنيتها بدقة',
            'لأنه يغير لون الخط تلقائياً للأزرق',
            'لأنه إلزامي وتتوقف الصفحة بدونه'
          ],
          correctIndex: 1,
          explanation: 'الوسوم الدلالية (Semantic HTML) تمنح معنى لبنية الصفحة، مما يحسن السيو (SEO) وسهولة الوصول لذوي الاحتياجات الخاصة (Accessibility).'
        }
      },
      {
        id: 'html-forms',
        moduleId: 'html',
        number: 5,
        title: 'النماذج الاحترافية وإدخال البيانات (HTML Forms & Validation)',
        level: 'beginner',
        duration: '25 دقيقة',
        summary: 'بناء نماذج اتصال وتسجيل آمنة وتفاعلية تجمع بيانات العملاء بدقة.',
        explanation: [
          'وسم <form> هو الحاوية الأساسية ويحتوي على خصائص مثل action و method.',
          'وسم <label> يرتبط مع الـ input بواسطة خاصية for و id لتسهيل النقر وقراءة الشاشة.',
          'أنواع الـ Input المتنوعة: text, email, tel, number, password, date, checkbox, radio.',
          'خصائص التحقق المدمجة: required, minlength, maxlength, pattern, placeholder.'
        ],
        codeExample: {
          language: 'html',
          filename: 'contact-form.html',
          code: `<form action="/submit" method="POST" class="contact-form">
  <h2>احصل على استشارة مجانية لمشروعك</h2>

  <!-- حقل الاسم الكامل -->
  <div class="form-group">
    <label for="user-name">الاسم الكامل *</label>
    <input 
      type="text" 
      id="user-name" 
      name="fullName" 
      required 
      minlength="3" 
      placeholder="مثال: أحمد المنصوري"
    >
  </div>

  <!-- حقل البريد الإلكتروني -->
  <div class="form-group">
    <label for="user-email">البريد الإلكتروني *</label>
    <input 
      type="email" 
      id="user-email" 
      name="email" 
      required 
      placeholder="name@example.com"
    >
  </div>

  <!-- حقل نوع الخدمة -->
  <div class="form-group">
    <label for="service-type">نوع المشروع المطلوبة</label>
    <select id="service-type" name="service">
      <option value="landing-page">صفحة هبوط تسويقية</option>
      <option value="full-website">موقع شركة كامل</option>
      <option value="redesign">إعادة تصميم موقع قديم</option>
    </select>
  </div>

  <!-- حقل الرسالة والتفاصيل -->
  <div class="form-group">
    <label for="project-details">تفاصيل فكرتك أو ميزانيتك المقترحة</label>
    <textarea 
      id="project-details" 
      name="details" 
      rows="4" 
      placeholder="أخبرنا باختصار عما تريد تحقيقه..."
    ></textarea>
  </div>

  <button type="submit">إرسال الطلب الآن 🚀</button>
</form>`
        },
        practiceTask: 'أضف حقل رقم هاتف يستقبل الأرقام فقط باستخدام type="tel" مع حقل checkbox للموافقة على شروط الاستخدام.',
        challenge: {
          title: 'تحدي الحقول المشروطة والإلزامية',
          description: 'اجعل حقل الهاتف إجبارياً وتأكد من أن زر الإرسال لا يعمل إلا إذا تم وضع علامة صح على الشروط.',
          hint: 'استخدم خاصية required على حقل checkbox وحقل الهاتف.',
          solutionCode: `<div class="form-group">
  <label for="phone">رقم الهاتف أو واتساب *</label>
  <input type="tel" id="phone" name="phone" required placeholder="+212 600-000000">
</div>

<div class="form-checkbox">
  <input type="checkbox" id="terms" name="terms" required>
  <label for="terms">أوافق على الشروط وسياسة الخصوصية *</label>
</div>`
        },
        quiz: {
          question: 'ما هي الفائدة الأساسية من ربط <label for="..."> مع <input id="...">؟',
          options: [
            'زيادة سرعة معالجة النموذج في السيرفر',
            'عند الضغط على النص يتم تفعيل الحقل تلقائياً ومساعدة قارئات الشاشة',
            'إجبار المستخدم على كتابة أحرف كبيرة فقط',
            'تلوين الحقل باللون الأخضر'
          ],
          correctIndex: 1,
          explanation: 'ربط label بالـ input عبر خاصية for مع id يحسن تجربة المستخدم (UX) وقابلية الوصول (a11y) بشكل كبير.'
        }
      }
    ]
  },
  {
    id: 'css',
    number: 3,
    title: 'CSS — Beginner to Advanced',
    level: 'beginner',
    icon: 'Palette',
    description: 'إتقان التصميم العصري، Flexbox، CSS Grid، التجاوب، المتغيرات، والحركات السلسة.',
    lessons: [
      {
        id: 'css-box-model',
        moduleId: 'css',
        number: 6,
        title: 'نموذج الصندوق (The CSS Box Model)',
        level: 'beginner',
        duration: '20 دقيقة',
        summary: 'القاعدة الذهبية التي تحكم أبعاد ومسافات كل عنصر على شاشة الويب.',
        explanation: [
          'كل عنصر في HTML هو عبارة عن صندوق مستطيل يتكون من 4 طبقات:',
          '1. Content: المحتوى الفعلي (النص، الصورة، الأيقونة).',
          '2. Padding: الفراغ الداخلي بين المحتوى والحدود (Border).',
          '3. Border: الإطار الخارجي المحيط بالعنصر.',
          '4. Margin: الفراغ الخارجي الذي يفصل العنصر عن العناصر المجاورة له.',
          'خاصية box-sizing: border-box: تجعل العرض يشمل الـ padding والـ border لتجنب تشوه التصميم.'
        ],
        codeExample: {
          language: 'css',
          filename: 'box-model.css',
          code: `/* القاعدة الإلزامية في بداية أي مشروع CSS */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* بطاقة تسعير توضح نموذج الصندوق */
.pricing-card {
  /* 1. Content size */
  width: 100%;
  max-width: 360px;

  /* 2. Padding: فراغ داخلي مريح */
  padding: 32px 24px;

  /* 3. Border: إطار أنيق مع تدرج خفيف */
  border: 1px solid #3f3f46;
  border-radius: 20px;

  /* 4. Margin: مسافة أمان تفصلها عن باقي الصفحة */
  margin: 40px auto;

  background-color: #18181b;
  color: #f4f4f5;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}`
        },
        practiceTask: 'قم بتغيير قيمة padding إلى 48px وقيمة border إلى 2px solid #f59e0b ولاحظ ثبات العرض الإجمالي بفضل border-box.',
        challenge: {
          title: 'تحدي محاذاة الصندوق في المنتصف',
          description: 'اجعل البطاقة تتوسط الشاشة أفقياً وعمودياً داخل الصفحة.',
          hint: 'اجعل الحاوية display: flex مع justify-content: center و align-items: center.',
          solutionCode: `body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #09090b;
}`
        },
        quiz: {
          question: 'إذا كان عنصر عرضه width: 300px ولديه padding: 20px وبدون استخدام border-box، كم سيكون عرضه الإجمالي على الشاشة؟',
          options: ['300px', '320px', '340px', '280px'],
          correctIndex: 2,
          explanation: 'في الوضع الافتراضي يضاف الـ padding على الجانبين (300 + 20 يمين + 20 يسار = 340px)، ولهذا نستخدم دائماً box-sizing: border-box لتفادي هذه المشكلة.'
        }
      },
      {
        id: 'css-flexbox-grid',
        moduleId: 'css',
        number: 7,
        title: 'احتراف تخطيط الصفحة: Flexbox & CSS Grid',
        level: 'intermediate',
        duration: '35 دقيقة',
        summary: 'بناء شبكات كروت وأشرطة تنقل احترافية وتوزيع العناصر في صفوف وأعمدة بكل سهولة.',
        explanation: [
          'Flexbox (أحادي البعد - 1D): مثالي لأشرطة التنقل، محاذاة الأزرار، وترتيب العناصر إما أفقياً في صف أو عمودياً.',
          'الخصائص الأساسية للـ Flex: justify-content (المحور الرئيسي)، align-items (المحور العمودي)، gap (المسافة بين العناصر).',
          'CSS Grid (ثنائي الأبعاد - 2D): مثالي لشبكات الكروت، تخطيط الصفحة الكبرى، والمعارض.',
          'التقنية السحرية في Grid: repeat(auto-fit, minmax(280px, 1fr)) تجعل الكروت متجاوبة أوتوماتيكياً دون أي Media Query!'
        ],
        codeExample: {
          language: 'css',
          filename: 'layout.css',
          code: `/* 1. Flexbox: شريط تنقل متناسق تماماً */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #09090b;
  border-bottom: 1px solid #27272a;
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
}

/* 2. CSS Grid: شبكة كروت متجاوبة تلقائياً مع حجم الشاشة */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: #18181b;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #27272a;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: #f59e0b;
}`
        },
        practiceTask: 'اصنع شبكة من 4 كروت منتجات باستخدام Grid ولاحظ كيف تتحول من 4 أعمدة في الشاشات الكبيرة إلى عمودين ثم عمود واحد على الهاتف.',
        challenge: {
          title: 'تحدي كارت مميز يمتد على عمودين',
          description: 'اجعل أول كارت في الشبكة يمتد على عمودين في الشاشات العريضة (grid-column: span 2).',
          hint: 'استخدم الكلاس المميز مع خاصية grid-column: span 2.',
          solutionCode: `@media (min-width: 768px) {
  .feature-card.featured {
    grid-column: span 2;
    background: linear-gradient(135deg, #18181b, #27272a);
    border-color: #f59e0b;
  }
}`
        },
        quiz: {
          question: 'ما هي الخاصية التي تحدد المسافة الفاصلة بين عناصر Flexbox أو Grid بدون الحاجة لـ margin؟',
          options: ['spacing', 'gap', 'margin-between', 'inner-distance'],
          correctIndex: 1,
          explanation: 'خاصية gap هي الطريقة الحديثة والقياسية لضبط المسافات بين عناصر الـ Flex و Grid بكل دقة.'
        }
      },
      {
        id: 'css-variables-animations',
        moduleId: 'css',
        number: 8,
        title: 'المتغيرات (Variables) والحركات السلسة (Transitions & Keyframes)',
        level: 'intermediate',
        duration: '25 دقيقة',
        summary: 'إدارة ألوان موقعك في مكان واحد وإضفاء لمسات تفاعلية وحركات بصرية راقية تجذب العميل.',
        explanation: [
          'متغيرات CSS (Custom Properties): تعرف باستخدام -- وتستدعى بـ var(--name) لتوحيد ألوان الموقع وخطوطه.',
          'الـ Transitions: تحول تدريجي ناعم عند مرور الفأرة (Hover) بدون قفزات مفاجئة.',
          'الـ Animations مع @keyframes: حركات مستمرة أو معقدة مثل الوميض، الظهور التدريجي (Fade In)، أو الدوران.'
        ],
        codeExample: {
          language: 'css',
          filename: 'theme-animation.css',
          code: `:root {
  /* نظام ألوان المنصة الموحد */
  --bg-primary: #09090b;
  --bg-secondary: #18181b;
  --accent-gold: #f59e0b;
  --accent-glow: rgba(245, 158, 11, 0.25);
  --text-main: #f4f4f5;
  --text-muted: #a1a1aa;
}

/* زر متوهج بحركة نابضة */
.cta-button {
  background: var(--accent-gold);
  color: #000;
  padding: 14px 28px;
  font-weight: 800;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 14px 0 var(--accent-glow);
}

.cta-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px 0 rgba(245, 158, 11, 0.5);
}

/* حركة ظهور تدريجي مع صعود */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  animation: fadeInUp 0.8s ease forwards;
}`
        },
        practiceTask: 'غير قيمة --accent-gold إلى كود لون آخر (مثل الأخضر #10b981) ولاحظ كيف تغير لون الزر والظلال بضغطة زر واحدة في الكود كله.',
        challenge: {
          title: 'تحدي حركة النبض (Pulse Animation)',
          description: 'اصنع وسم شارة "جديد 🔥" ينبض بحجم أكبر وأصغر بشكل متكرر لا نهائي.',
          hint: 'استخدم @keyframes مع transform: scale(1) و scale(1.1) مع animation: pulse 1.5s infinite.',
          solutionCode: `@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.badge-pulse {
  display: inline-block;
  background: #f59e0b;
  color: #000;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: bold;
  animation: pulse 1.8s infinite ease-in-out;
}`
        },
        quiz: {
          question: 'كيف نقوم باستدعاء متغير تم تعريفه باسم --primary-color داخل خاصية background؟',
          options: [
            'background: $primary-color;',
            'background: var(--primary-color);',
            'background: get(--primary-color);',
            'background: @primary-color;'
          ],
          correctIndex: 1,
          explanation: 'في CSS العادي نستخدم دالة var(--variable-name) لقراءة قيمة أي متغير مخصص.'
        }
      }
    ]
  },
  {
    id: 'javascript',
    number: 4,
    title: 'JavaScript — Beginner to Practical',
    level: 'intermediate',
    icon: 'Terminal',
    description: 'تحويل الصفحات الثابتة إلى تطبيقات تفاعلية حية، التحكم في الـ DOM، تخزين البيانات، والتعامل مع الـ APIs.',
    lessons: [
      {
        id: 'js-fundamentals',
        moduleId: 'javascript',
        number: 9,
        title: 'الأساسيات والتحكم في الصفحة (Variables & DOM Manipulation)',
        level: 'intermediate',
        duration: '30 دقيقة',
        summary: 'تعلم كيف تقرأ عناصر HTML وتعدل نصوصها وألوانها وتستجيب لنقرات المستخدم.',
        explanation: [
          'المتغيرات الحديثة: const للقيم الثابتة، و let للقيم القابلة للتغيير. تجنب var.',
          'تحديد العناصر في الصفحة: document.querySelector(".class") أو document.getElementById("id").',
          'تعديل المحتوى والستايل: element.textContent أو element.classList.add / toggle.',
          'الاستماع للأحداث: element.addEventListener("click", callbackFunction).'
        ],
        codeExample: {
          language: 'javascript',
          filename: 'dom-magic.js',
          code: `// 1. تحديد العناصر من الصفحة
const toggleBtn = document.querySelector('#theme-toggle');
const statusText = document.querySelector('#theme-status');
const bodyElement = document.body;

// 2. الاستماع لحدث النقر (Click Event)
toggleBtn.addEventListener('click', () => {
  // تبديل الكلاس dark-mode
  const isDark = bodyElement.classList.toggle('dark-theme');

  // تحديث النص والواجهة ديناميكياً
  if (isDark) {
    statusText.textContent = 'الوضع الليلي مفعّل 🌙';
    toggleBtn.textContent = 'تحويل للنهاري ☀️';
  } else {
    statusText.textContent = 'الوضع النهاري مفعّل ☀️';
    toggleBtn.textContent = 'تحويل لليلي 🌙';
  }
});`
        },
        practiceTask: 'اصنع قائمة مخفية (Accordion) تظهر وتختفي عند الضغط على زر العنوان باستخدام classList.toggle("hidden").',
        challenge: {
          title: 'تحدي قائمة المهام البسيطة',
          description: 'اكتب كود يقرأ القيمة من مربع نص (Input)، ويضيفها كعنصر جديد داخل وسم <ul> عند الضغط على زر إضافة.',
          hint: 'استخدم document.createElement("li") ثم appendChild.',
          solutionCode: `const input = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('#todo-list');

addBtn.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = input.value;
    list.appendChild(li);
    input.value = ''; // تفريغ الحقل
  }
});`
        },
        quiz: {
          question: 'ما هي الطريقة الموصى بها لإضافة كلاس CSS جديد لعنصر دون مسح الكلاسات القديمة؟',
          options: [
            'element.className = "new-class";',
            'element.classList.add("new-class");',
            'element.style.class = "new-class";',
            'element.setAttribute("class", "new-class");'
          ],
          correctIndex: 1,
          explanation: 'استخدام element.classList.add("name") يضيف الكلاس بأمان ودون استبدال أي كلاسات موجودة مسبقاً.'
        }
      },
      {
        id: 'js-localstorage-fetch',
        moduleId: 'javascript',
        number: 10,
        title: 'تخزين البيانات والـ APIs (LocalStorage & Fetch API)',
        level: 'advanced',
        duration: '35 دقيقة',
        summary: 'حفظ إعدادات وبيانات المستخدم في المتصفح، وجلب بيانات حية من خوادم خارجية باستخدام Async/Await.',
        explanation: [
          'الـ LocalStorage: ذاكرة تخزين مدمجة في المتصفح تحفظ البيانات حتى بعد إغلاق أو تحديث الصفحة.',
          'التعامل مع JSON: تحويل الكائنات إلى نصوص بـ JSON.stringify وقراءتها بـ JSON.parse.',
          'الـ Fetch API: أداة جلب البيانات من خادم خارجي (REST API) بصيغة JSON.',
          'الـ Async / Await مع try...catch: أسلوب عصري أنيق لكتابة كود غير متزامن بدون تعقيدات الـ Callbacks.'
        ],
        codeExample: {
          language: 'javascript',
          filename: 'api-storage.js',
          code: `// 1. حفظ واسترجاع تفضيلات المستخدم
function saveUserPreference(theme) {
  localStorage.setItem('site_theme', theme);
}

function loadUserPreference() {
  return localStorage.getItem('site_theme') || 'dark';
}

// 2. جلب بيانات حية من API خارجي بعرض جميل
async function fetchTopProjects() {
  const container = document.querySelector('#projects-container');
  container.innerHTML = '<p class="loading">جاري جلب المشاريع...</p>';

  try {
    const response = await fetch('https://api.github.com/users/github/repos?per_page=3');
    if (!response.ok) throw new Error('فشل جلب البيانات من الخادم');

    const repos = await response.json();
    
    // بناء الكروت ديناميكياً
    container.innerHTML = repos.map(repo => \`
      <div class="repo-card">
        <h3>\${repo.name}</h3>
        <p>\${repo.description || 'لا يوجد وصف'}</p>
        <span class="stars">⭐ \${repo.stargazers_count}</span>
        <a href="\${repo.html_url}" target="_blank">معاينة المشروع</a>
      </div>
    \`).join('');

  } catch (error) {
    container.innerHTML = \`<p class="error">حدث خطأ: \${error.message}</p>\`;
  }
}`
        },
        practiceTask: 'جرب حفظ رقم أو اسم مستخدم داخل LocalStorage ثم أغلق المتصفح وأعد فتحه واقرأ القيمة.',
        challenge: {
          title: 'تحدي إزالة البيانات من LocalStorage',
          description: 'اصنع زراً يقوم بمسح بيانات المستخدم المخزنة وإعادة الصفحة لحالتها الأولية.',
          hint: 'استخدم localStorage.removeItem("key") أو localStorage.clear().',
          solutionCode: `document.querySelector('#clear-btn').addEventListener('click', () => {
  localStorage.removeItem('site_theme');
  alert('تم مسح الإعدادات بنجاح!');
  location.reload();
});`
        },
        quiz: {
          question: 'ما هي الدالة المستخدمة لتحويل مصفوفة أو كائن JavaScript إلى نص يمكن تخزينه في LocalStorage؟',
          options: [
            'JSON.parse()',
            'JSON.stringify()',
            'Object.toString()',
            'localStorage.encode()'
          ],
          correctIndex: 1,
          explanation: 'دالة JSON.stringify() تحول الكائنات والمصفوفات إلى نص JSON صالح للتخزين في LocalStorage.'
        }
      }
    ]
  },
  {
    id: 'responsive',
    number: 5,
    title: 'Responsive Web Design',
    level: 'intermediate',
    icon: 'Smartphone',
    description: 'تصميم مواقع مرنة تبدو مثالية على الهواتف الذكية، الأجهزة اللوحية، والشاشات العريضة.',
    lessons: [
      {
        id: 'responsive-mobile-first',
        moduleId: 'responsive',
        number: 11,
        title: 'منهجية الموبايل أولاً وقوائم الـ Hamburger (Mobile-First & Nav)',
        level: 'intermediate',
        duration: '30 دقيقة',
        summary: 'لماذا تبدأ بالتصميم للهاتف أولاً، وكيف تنفذ قائمة تنقل متجاوبة بلمسة احترافية.',
        explanation: [
          'نهج Mobile-First: كتابة التنسيقات الأساسية للهاتف الذكي بدون Media Query، ثم توسيع العرض تدريجياً للشاشات الأكبر عبر min-width.',
          'أهم نقاط التوقف القياسية (Breakpoints): 640px (تابلت صغير)، 768px (تابلت عادي)، 1024px (لابتوب)، 1280px (شاشة عريضة).',
          'قائمة الـ Hamburger: إخفاء القائمة على الموبايل وإظهار زر الأيقونة، ثم إظهار القائمة كاملة أفقياً على الشاشات الكبيرة.'
        ],
        codeExample: {
          language: 'html',
          filename: 'responsive-nav.html',
          code: `<!-- كود شريط تنقل متجاوب بالكامل -->
<nav class="site-header">
  <div class="brand">رياكت لاب</div>

  <!-- زر القائمة للهاتف -->
  <button class="menu-toggle" id="menu-btn" aria-label="فتح القائمة">
    ☰
  </button>

  <!-- الروابط -->
  <ul class="nav-menu" id="nav-menu">
    <li><a href="#home">الرئيسية</a></li>
    <li><a href="#about">من نحن</a></li>
    <li><a href="#pricing">الأسعار</a></li>
    <li><a href="#contact" class="btn-highlight">تواصل معنا</a></li>
  </ul>
</nav>

<style>
/* 1. التنسيق الافتراضي: شاشات الهاتف */
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #09090b;
}

.menu-toggle {
  display: block;
  background: none;
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}

.nav-menu {
  display: none; /* مخفية على الهاتف افتراضياً */
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background: #18181b;
  padding: 20px;
  gap: 16px;
  list-style: none;
}

.nav-menu.active {
  display: flex; /* تظهر عند الضغط على الزر */
}

/* 2. التنسيق عند الترقية للشاشات الكبيرة (Tablet & Desktop) */
@media (min-width: 768px) {
  .menu-toggle {
    display: none; /* إخفاء زر الهامبرغر */
  }

  .nav-menu {
    display: flex !important;
    position: static;
    flex-direction: row;
    width: auto;
    background: transparent;
    padding: 0;
  }
}
</style>

<script>
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('nav-menu');
btn.addEventListener('click', () => {
  menu.classList.toggle('active');
});
</script>`
        },
        practiceTask: 'افتح الكود في المتصفح وصغر نافذة المتصفح لتشاهد كيف يختفي شريط الروابط ويظهر زر القائمة تلقائياً.',
        challenge: {
          title: 'تحدي الخطوط السائلة (Fluid Typography)',
          description: 'استخدم دالة clamp() في حجم خط العنوان ليتغير حجمه بسلاسة تامة بين 24px على الموبايل و 48px على الشاشات الكبيرة.',
          hint: 'font-size: clamp(1.5rem, 4vw, 3rem);',
          solutionCode: `h1.fluid-title {
  /* يتدرج الخط بحسب عرض الشاشة بدون أي Media Query */
  font-size: clamp(1.5rem, 5vw, 3.2rem);
  line-height: 1.2;
}`
        },
        quiz: {
          question: 'ما هي ميزة أسلوب "Mobile-First" في كتابة الـ CSS؟',
          options: [
            'يجعل الموقع يعمل على هواتف آبل فقط',
            'يجعل الكود أخف وأسرع للهواتف لأن الأنماط الأساسية لا تحتاج شروط معقدة',
            'يلغي الحاجة لصور عالية الجودة',
            'يمنع ظهور القوائم على أجهزة الكمبيوتر'
          ],
          correctIndex: 1,
          explanation: 'الـ Mobile-First يبدأ بالأبسط والأخف للأجهزة ذات المعالجات والشبكات الأضعف، ثم يضيف الزخارف تدريجياً للأجهزة الأقوى عبر min-width.'
        }
      }
    ]
  },
  {
    id: 'landing-pages',
    number: 6,
    title: 'Professional Landing Pages',
    level: 'intermediate',
    icon: 'Layout',
    description: 'تشريح وتصميم صفحات الهبوط ذات معدل التحويل المرتفع (High-Converting Landing Pages).',
    lessons: [
      {
        id: 'landing-anatomy',
        moduleId: 'landing-pages',
        number: 12,
        title: 'تشريح صفحة الهبوط الناجحة (Anatomy of High-Converting Page)',
        level: 'intermediate',
        duration: '35 دقيقة',
        summary: 'الأقسام الإلزامية في كل صفحة هبوط تبيع منتجاً أو خدمة وتجلب عملاء فعليين.',
        explanation: [
          '1. Hero Section: العنوان الجذاب، الوعد الأساسي، زر الدعوة لاتخاذ إجراء (CTA)، وصورة تعبيرية أو فيديو.',
          '2. Social Proof / Logos: شعارات عملاء أو تقييمات موثوقة لإزالة الشك فوراً.',
          '3. Problem & Solution: تحديد ألم العميل وكيف يحل منتجك هذا الألم بدقة.',
          '4. Features & Benefits: المزايا والفوائد العملية (Benefit > Feature).',
          '5. Testimonials: آراء عملاء حقيقيين بصورهم وتقييماتهم.',
          '6. Pricing Section: جدول الأسعار الشفاف والمقارنة بين الباقات مع إبراز الباقة الموصى بها.',
          '7. FAQ Accordion: الإجابة على الاعتراضات المتبقية في ذهن الزائر.',
          '8. Final Call to Action & Footer: تذكير سريع ودعوة حاسمة للحجز أو الشراء قبل مغادرة الصفحة.'
        ],
        codeExample: {
          language: 'html',
          filename: 'hero-section.html',
          code: `<!-- قسم Hero Section متكامل بمظهر فخم -->
<section class="hero-section">
  <div class="badge">🔥 المنصة رقم #1 لإطلاق أعمالك الرقمية</div>
  <h1 class="hero-heading">
    احصل على موقع يجلب لك <span class="highlight">عملاء مستعدين للشراء</span> كل أسبوع
  </h1>
  <p class="hero-subtext">
    نصمم صفحات هبوط فائقة السرعة تزيد معدل التحويل بنسبة 35%+ وتعمل بسلاسة تامة على جميع الهواتف.
  </p>

  <div class="hero-actions">
    <a href="#pricing" class="btn-primary">احجز باقتك الآن 🚀</a>
    <a href="#work" class="btn-secondary">شاهد نماذج أعمالنا 👁️</a>
  </div>

  <div class="social-proof">
    <div class="avatars">⭐⭐⭐⭐⭐</div>
    <p>ثقة أكثر من <strong>120+ رائد أعمال</strong> وصانع محتوى في 2026</p>
  </div>
</section>

<style>
.hero-section {
  text-align: center;
  padding: 80px 20px;
  max-width: 900px;
  margin: 0 auto;
}
.badge {
  display: inline-block;
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 24px;
}
.hero-heading {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  line-height: 1.15;
  color: #ffffff;
  margin-bottom: 20px;
}
.highlight {
  background: linear-gradient(135deg, #f59e0b, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-subtext {
  font-size: 1.1rem;
  color: #a1a1aa;
  max-width: 680px;
  margin: 0 auto 36px;
  line-height: 1.6;
}
.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
.btn-primary {
  background: #f59e0b;
  color: #000;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 800;
  text-decoration: none;
}
.btn-secondary {
  background: #27272a;
  color: #fff;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
}
</style>`
        },
        practiceTask: 'قم ببناء قسم أسئلة شائعة (FAQ Accordion) مكون من 3 أسئلة يجيب عن تساؤلات العميل الأكثر إلحاحاً.',
        challenge: {
          title: 'تحدي كارت السعر البارز (Featured Tier)',
          description: 'صمم جدول 3 باقات تسعير واجعل الباقة الوسطى أكبر حجماً مع شارة "الأكثر طلباً ⭐".',
          hint: 'استخدم transform: scale(1.05) مع إطار بلون ذهبي #f59e0b.',
          solutionCode: `.pricing-tier.featured {
  border: 2px solid #f59e0b;
  transform: scale(1.05);
  box-shadow: 0 25px 50px -12px rgba(245, 158, 11, 0.25);
  position: relative;
}`
        },
        quiz: {
          question: 'ما هو العنصر الأكثر أهمية في الـ Hero Section الذي يحدد ما إذا كان الزائر سيبقى أم يغادر؟',
          options: [
            'روابط حسابات السوشيال ميديا في الزاوية',
            'العنوان الرئيسي الموجه للنتيجة مع زر الدعوة لاتخاذ إجراء (Clear Value Proposition & CTA)',
            'طول شريط التمرير في المتصفح',
            'خريطة موقع جوجل مابس'
          ],
          correctIndex: 1,
          explanation: 'الزائر يقرر في أول 3 ثوانٍ؛ لذا يحتاج إلى عنوان واضح يشرح ما الذي سيجنيه، مع زر واضح ومغري للخطوة التالية.'
        }
      }
    ]
  },
  {
    id: 'ui-ux',
    number: 7,
    title: 'UI/UX for Developers',
    level: 'intermediate',
    icon: 'Sparkles',
    description: 'قواعد التباين، الهرمية البصرية، المسافات، وتجنب الأخطاء التصميمية القاتلة التي يرتكبها المبرمجون.',
    lessons: [
      {
        id: 'ui-ux-rules',
        moduleId: 'ui-ux',
        number: 13,
        title: 'قواعد التصميم النظيف لمطوري الويب (Visual Hierarchy & 8pt Grid)',
        level: 'intermediate',
        duration: '25 دقيقة',
        summary: 'كيف تجعل موقعك يبدو كعمل صممه فنان محترف حتى لو لم تكن مصمم جرافيك.',
        explanation: [
          'شبكة الـ 8 بكسل (8-Point Grid): اجعل جميع المسافات (Margins & Paddings) مضاعفات للرقم 8 (8px, 16px, 24px, 32px, 48px, 64px) لتناسق بصري مريح.',
          'الهرمية البصرية (Visual Hierarchy): استخدام أحجام وأوزان خطوط متباينة بوضوح (Bold vs Normal, Light vs Heavy) وليس مجرد تكبير الحجم.',
          'التباين وإمكانية القراءة (Contrast): التأكد من وضوح النص فوق الخلفية الداكنة بنسبة تباين لا تقل عن 4.5:1 وفقاً لمعايير WCAG.',
          'أكبر أخطاء المطورين: الأزرار الباهتة، المسافات العشوائية الضيقة، كثرة الألوان المشتتة، وعدم وجود نقطة ارتكاز بصرية واحدة واضحة.'
        ],
        codeExample: {
          language: 'css',
          filename: 'design-system.css',
          code: `/* نظام مسافات منظم مبني على قاعدة 8px */
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;

  /* هرمية الألوان الاحترافية */
  --text-headline: #ffffff; /* أبيض ناصع للعناوين الكبرى */
  --text-body: #d4d4d8;     /* رمادي فاتح مريح للقراءة الطويلة */
  --text-muted: #71717a;    /* رمادي خافت للتاريخ والملاحظات */
}

/* تنسيق متوازن للفقرات يمنع إجهاد العين */
p.readable-text {
  font-size: 1rem;
  line-height: 1.65; /* تباعد مريح للأسطر */
  color: var(--text-body);
  max-width: 65ch;   /* أقصى عرض للسطر 65 حرفاً لسهولة القراءة */
}`
        },
        practiceTask: 'راجع موقعاً بنيته مؤخراً وتأكد من أن جميع المسافات مقسومة على 8 وأن نصوص العناوين تختلف في الوزن اللوني عن نصوص الفقرات.',
        challenge: {
          title: 'تحدي تحسين تباين الزر الرئيسي',
          description: 'صمم زراً تفاعلياً يحقق أعلى درجات الوضوح على خلفية سوداء تامة #000.',
          hint: 'خلفية صفراء/عنبرية #f59e0b مع نص أسود داكن #000000.',
          solutionCode: `.high-contrast-btn {
  background-color: #f59e0b;
  color: #000000;
  font-weight: 800;
  padding: 14px 28px;
  border-radius: 10px;
  border: none;
}`
        },
        quiz: {
          question: 'لماذا ينصح بجعل أقصى عرض لفقرة النص حوالي 60 إلى 75 حرفاً (65ch)؟',
          options: [
            'لأن الشاشات لا تدعم أكثر من 70 حرفاً',
            'لأن الأسطر الطويلة جداً تصيب عين القارئ بالتشتت عند الانتقال للسطر التالي',
            'لتقليل استهلاك الإنترنت',
            'لتكبير حجم الصور المجاورة'
          ],
          correctIndex: 1,
          explanation: 'دراسات تجربة المستخدم وقابلية القراءة أثبتت أن السطر الذي يتجاوز 75 حرفاً يرهق العين ويزيد من معدل الارتداد (Bounce Rate).'
        }
      }
    ]
  },
  {
    id: 'git-github',
    number: 8,
    title: 'Git & GitHub',
    level: 'intermediate',
    icon: 'GitBranch',
    description: 'إدارة الإصدارات، حفظ الأكواد سحابياً، العمل في فروع، وبناء بورتفوليو برمجيات على GitHub.',
    lessons: [
      {
        id: 'git-workflow',
        moduleId: 'git-github',
        number: 14,
        title: 'دورة عمل Git الأساسية (Init, Commit, Push & Branches)',
        level: 'intermediate',
        duration: '30 دقيقة',
        summary: 'تعلم كيف تحفظ كل خطوة في مشروعك وتنشره على منصة GitHub دون خوف من فقدان الكود.',
        explanation: [
          'Git: نظام تتبع التغييرات (Version Control) الذي يتيح لك الرجوع لأي نقطة زمنية سابقة في كودك.',
          'GitHub: المنصة السحابية التي تستضيف مستودعاتك (Repositories) وتعتبر سيرتك الذاتية كمطور ويب.',
          'المراحل الأربع: تعديل الملفات -> Stage (git add) -> حفظ لقطة (git commit) -> رفع للسحاب (git push).',
          'الفروع (Branches): تتيح لك تطوير ميزة جديدة بشكل منفصل دون المخاطرة بتخريب النسخة الرئيسية المستقرة (main).'
        ],
        codeExample: {
          language: 'bash',
          filename: 'terminal-commands.sh',
          code: `# 1. بدء مستودع جديد في مجلد مشروعك
git init

# 2. فحص حالة الملفات المعدلة
git status

# 3. إضافة جميع الملفات للتجهيز
git add .

# 4. تسجيل لقطة حفظ مع رسالة واضحة
git commit -m "feat: إطلاق الصفحة الرئيسية متجاوبة بالكامل"

# 5. ربط المستودع المحلي بحسابك على GitHub
git branch -M main
git remote add origin https://github.com/your-username/my-portfolio.git

# 6. رفع الكود للسحابة
git push -u origin main`
        },
        practiceTask: 'قم بإنشاء حساب على GitHub، وافتح الطرفية (Terminal) في VS Code ونفذ أول Commit لمشروع بسيط وارفعه.',
        challenge: {
          title: 'تحدي إنشاء فرع تجريبي وتعديل زر',
          description: 'اصنع فرعاً جديداً باسم feature-dark-mode، عدل كوداً بداخله ثم ادمجه مع الفرع الرئيسي main.',
          hint: 'git checkout -b feature-dark-mode ثم التعديل ثم git merge.',
          solutionCode: `# إنشاء الفرع والانتقال إليه
git checkout -b feature-dark-mode

# بعد التعديل والحفظ:
git add .
git commit -m "add: إضافة كود الوضع الليلي"

# العودة للرئيسي ودمج التعديل:
git checkout main
git merge feature-dark-mode`
        },
        quiz: {
          question: 'ما هو الأمر الذي يقوم بإضافة جميع الملفات المعدلة إلى مرحلة التجهيز (Staging Area)؟',
          options: [
            'git push all',
            'git add .',
            'git commit -a',
            'git save *'
          ],
          correctIndex: 1,
          explanation: 'الأمر git add . يضيف كل الملفات الجديدة والمعدلة في المجلد الحالي لـ Staging تمهيداً لحفظها بـ commit.'
        }
      }
    ]
  },
  {
    id: 'deployment',
    number: 9,
    title: 'Deployment & Launching',
    level: 'advanced',
    icon: 'UploadCloud',
    description: 'نشر المواقع على استضافات سحابية مجانية وسريعة، ربط الدومين المخصص، وإعدادات السيو الفنية.',
    lessons: [
      {
        id: 'deployment-vercel',
        moduleId: 'deployment',
        number: 15,
        title: 'نشر الموقع في 60 ثانية على Vercel وربط الدومين المخصص',
        level: 'advanced',
        duration: '20 دقيقة',
        summary: 'كيف تطلق موقعك للعالم برابط حي وسريع ومحمي بشهادة SSL مجانية وتحديثات تلقائية.',
        explanation: [
          'Vercel & Netlify: أفضل منصات الاستضافة السحابية الحديثة للمواقع؛ تدعم النشر التلقائي بمجرد عمل git push.',
          'الشهادة الأمنية (SSL / HTTPS): تتفعل تلقائياً وبشكل مجاني لحماية بيانات الزوار وبناء الثقة.',
          'ربط الدومين المخصص (Custom Domain): ربط اسم نطاقك التجاري (مثل mybrand.com) عبر ضبط سجلات CNAME أو A Record في لوحة تحكم الدومين.',
          'أساسيات السيو الفنية بعد النشر: التأكد من وجود ملف sitemap.xml وملف robots.txt والـ Favicon وسرعة التحميل في Google PageSpeed.'
        ],
        codeExample: {
          language: 'markdown',
          filename: 'DEPLOY-GUIDE.md',
          code: `# خطوات النشر على منصة Vercel:
1. توجه إلى vercel.com وسجل دخولك بحسابك على GitHub.
2. اضغط "Add New Project" واختر مستودع موقعك.
3. اضغط "Deploy" - مبروك، موقعك حي الآن على رابط مجاني مثل my-project.vercel.app!
4. لإضافة دومين خاص: اذهب إلى Project Settings -> Domains -> أضف mybrand.com.
5. في موقع شراء الدومين (Namecheap, GoDaddy):
   - Type: CNAME | Name: @ أو www | Value: cname.vercel-dns.com`
        },
        practiceTask: 'ارفع صفحة بسيطة على مستودع GitHub، ثم اربطها بـ Vercel وشاهد كيف يتم التحديث تلقائياً فور تعديل أي سطر في الكود.',
        challenge: {
          title: 'تحدي ملف robots.txt وسرعة الموقع',
          description: 'أنشئ ملفاً باسم robots.txt يسمح لمحركات البحث بفهرسة جميع صفحات موقعك.',
          hint: 'User-agent: * متبوعاً بـ Allow: /.',
          solutionCode: `# ملف robots.txt القياسي
User-agent: *
Allow: /

Sitemap: https://mywebsite.com/sitemap.xml`
        },
        quiz: {
          question: 'ما الذي يحدث عند ربط موقعك على Vercel بمستودع GitHub وقيامك بعمل git push لكود جديد؟',
          options: [
            'يتوقف الموقع عن العمل حتى تعيد تشغيله يدوياً',
            'يقوم Vercel ببناء ونشر النسخة الجديدة تلقائياً خلال ثوانٍ وبدون انقطاع الخدمة',
            'يتم حذف الدومين الخاص',
            'تتغير كلمات مرور الموقع'
          ],
          correctIndex: 1,
          explanation: 'منصات CI/CD السحابية الحديثة تقوم بالاستماع لأي push جديد على الفرع الرئيسي وبناء وتحديث الموقع تلقائياً في ثوانٍ.'
        }
      }
    ]
  },
  {
    id: 'real-projects',
    number: 10,
    title: 'Real World Projects',
    level: 'advanced',
    icon: 'Layers',
    description: '7 مشاريع متدرجة متكاملة من التخطيط والتكويد إلى التجاوب والنشر الحي.',
    lessons: []
  }
];

// 2. REAL PROGRESSIVE PROJECTS
export const realProjectsList: RealProject[] = [
  {
    id: 'proj-1',
    number: 1,
    title: 'المشروع 1: الموقع التعريفي الشخصي (Personal Portfolio)',
    level: 'beginner',
    category: 'Portfolio / Personal Branding',
    brief: 'بناء موقع شخصي سريع وجذاب يعرف بك، يعرض مهاراتك، روابط أعمالك السابقة، وطرق التواصل المباشر معك.',
    features: [
      'قسم Hero جذاب مع صورتك وتخصصك الدقيق',
      'قسم المهارات التقنية مع أشرطة أو شارات واضحة',
      'معرض لأفضل أعمالك بروابط حية للمعاينة',
      'نموذج تواصل مباشر وروابط حساباتك المهنية',
      'تجاوب كامل على شاشات الهواتف والتابلت'
    ],
    planningSteps: [
      'رسم سكيتش ورقي بسيط لتوزيع الأقسام (Header, Hero, About, Projects, Contact)',
      'تجهيز صور الأعمال والمعلومات وسيرتك الذاتية (CV)',
      'كتابة البنية الهيكلية الكاملة باستخدام Semantic HTML5',
      'تطبيق تنسيقات CSS ونظام الألوان المتناسق والخطوط العربية الحديثة'
    ],
    htmlStructure: `<!-- هيكل المشروع 1 -->
<header class="portfolio-header">
  <nav class="container">
    <a href="#" class="logo">مطور الويب | فلان</a>
    <ul class="nav-links">
      <li><a href="#about">من أنا</a></li>
      <li><a href="#projects">مشاريعي</a></li>
      <li><a href="#contact" class="btn">تواصل معي</a></li>
    </ul>
  </nav>
</header>`,
    cssHighlights: `/* CSS Highlights */
.portfolio-header { position: sticky; top: 0; backdrop-filter: blur(10px); }
.project-card { border-radius: 16px; overflow: hidden; transition: transform 0.3s; }
.project-card:hover { transform: translateY(-8px); }`,
    testingChecklist: [
      'التأكد من وضوح النصوص على أصغر شاشة هاتف (375px)',
      'فحص عمل جميع روابط التمرير السلس السريع (Smooth Scroll)',
      'التحقق من عدم وجود أي شريط تمرير أفقي غير مرغوب فيه'
    ],
    deploymentSteps: [
      'رفع المشروع على مستودع GitHub باسم username.github.io',
      'تفعيل ميزة GitHub Pages من الإعدادات للحصول على رابط مجاني دائم'
    ]
  },
  {
    id: 'proj-2',
    number: 2,
    title: 'المشروع 2: صفحة هبوط لنشاط تجاري محلي (Local Business Landing Page)',
    level: 'beginner',
    category: 'Business / Services',
    brief: 'تصميم صفحة هبوط تسويقية لعيادة طبية، نادي رياضي، أو مقهى راقٍ، تركز على جلب اتصالات وحجوزات مباشرة.',
    features: [
      'زر اتصال فوري وواتساب ثابت (Sticky WhatsApp Button)',
      'ساعات العمل وموقع الخريطة والخدمات المتاحة',
      'قسم آراء الزبائن الحقيقيين وصور المكان',
      'نموذج حجز موعد سريع'
    ],
    planningSteps: [
      'تحديد الإجراء الأساسي المطلوب من الزائر (الاتصال أو الحجز)',
      'اختيار صور عالية الجودة وخالية من التكلف للمكان',
      'تصميم كروت الخدمات مع الأسعار الواضحة',
      'إضافة زر الواتساب العائم لسهولة التفاعل الفوري'
    ],
    htmlStructure: `<!-- زر واتساب العائم -->
<a href="https://wa.me/212600000000" class="floating-whatsapp" target="_blank" aria-label="تواصل واتساب">
  <span>💬 تواصل معنا فوراً</span>
</a>`,
    cssHighlights: `.floating-whatsapp {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #25d366;
  color: #fff;
  padding: 12px 20px;
  border-radius: 9999px;
  font-weight: bold;
  box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
  z-index: 100;
}`,
    testingChecklist: [
      'التأكد من أن زر الاتصال يفتح تطبيق الهاتف مباشرة عند الضغط عليه من الجوال',
      'التحقق من صحة رابط واتساب ورسالة الترحيب المعدة مسبقاً'
    ],
    deploymentSteps: [
      'النشر على استضافة Vercel برابط نظيف للمعاينة وعرضه على صاحب النشاط التجاري'
    ]
  },
  {
    id: 'proj-3',
    number: 3,
    title: 'المشروع 3: صفحة مبيعات لمنتج برمجي أو رقمي (SaaS Product Page)',
    level: 'intermediate',
    category: 'SaaS / Digital Product',
    brief: 'بناء صفحة هبوط فائقة الاحترافية لتطبيق رقمي أو برنامج اشتراكات مع جدول أسعار شهري وسنوي تفاعلي.',
    features: [
      'مفتاح تبديل الأسعار (Monthly vs Annual Toggle) بخصم 20%',
      'جدول مقارنة تفصيلي بين الباقات',
      'قسم تجارب المستخدمين وقائمة الأسئلة الشائعة (FAQ Accordion)',
      'شارات الثقة والضمان الذهبي لاسترداد الأموال لمدة 30 يوماً'
    ],
    planningSteps: [
      'هندسة العرض المقنع وتفكيك اعتراضات المشترين',
      'كتابة دالة JavaScript لتبديل الأسعار المعروضة فوراً عند الضغط على زر التبديل',
      'برمجة الأكورديون للأسئلة الشائعة بدون مكتبات خارجية'
    ],
    htmlStructure: `<div class="pricing-toggle">
  <span>الدفع الشهري</span>
  <input type="checkbox" id="billing-switch">
  <span>الدفع السنوي (وفر 20% 🎉)</span>
</div>`,
    cssHighlights: `.faq-item { border-bottom: 1px solid #27272a; padding: 16px 0; }
.faq-answer { display: none; padding-top: 8px; color: #a1a1aa; }
.faq-item.open .faq-answer { display: block; }`,
    jsLogic: `const toggle = document.querySelector('#billing-switch');
toggle.addEventListener('change', () => {
  const isAnnual = toggle.checked;
  document.querySelectorAll('.price-value').forEach(el => {
    el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
  });
});`,
    testingChecklist: [
      'التأكد من دقة الأرقام عند التبديل بين الباقة السنوية والشهرية',
      'التحقق من عمل الأسئلة الشائعة وسلاسة الفتح والإغلاق'
    ],
    deploymentSteps: [
      'النشر وربط نموذج التسجيل بقاعدة بيانات بسيطة أو منصة استلام الإيميلات'
    ]
  },
  {
    id: 'proj-4',
    number: 4,
    title: 'المشروع 4: مدونة وموقع محتوى تقني (Tech Blog & Articles)',
    level: 'intermediate',
    category: 'Content & Publishing',
    brief: 'موقع تدوين سريع وخفيف يركز على سهولة القراءة وتناسق الخطوط وسرعة فهرسة المقالات في جوجل.',
    features: [
      'نظام مقالات مع تصنيفات وفلترة سريعة',
      'تصميم مريح لقراءة المقالات الطويلة مع وقت القراءة المتوقع',
      'شريط بحث ديناميكي في المتصفح يبحث في العناوين فورياً',
      'مربع اشتراك في النشرة البريدية مع تحقق من صحة الإيميل'
    ],
    planningSteps: [
      'تصميم كروت المقالات بصور بارزة وتاريخ ووقت قراءة',
      'كتابة دالة تصفية المقالات في الجافاسكريبت بحسب التصنيف المختار',
      'تحسين بنية الـ Typography والمسافات لقراءة ممتعة'
    ],
    htmlStructure: `<div class="filter-tabs">
  <button class="filter-btn active" data-category="all">الكل</button>
  <button class="filter-btn" data-category="css">تصميم CSS</button>
  <button class="filter-btn" data-category="js">جافاسكريبت</button>
</div>`,
    cssHighlights: `article.post-body { font-size: 1.15rem; line-height: 1.8; color: #e4e4e7; }
article.post-body h2 { margin: 40px 0 16px; color: #f59e0b; }`,
    testingChecklist: [
      'اختبار سرعة الصفحة في Google Lighthouse والحصول على 95%+',
      'التأكد من تناسق أحجام الخطوط على شاشة الهاتف'
    ],
    deploymentSteps: [
      'النشر على Vercel مع إضافة بيانات الـ SEO المنظمة (Schema.org)'
    ]
  },
  {
    id: 'proj-5',
    number: 5,
    title: 'المشروع 5: لوحة تحكم وإحصائيات تفاعلية (Dashboard UI)',
    level: 'advanced',
    category: 'Web App / Admin Panel',
    brief: 'بناء واجهة لوحة تحكم عصرية تضم شريطاً جانبياً قابلاً للطي، كروت أرقام وإحصائيات، جدول مبيعات حديث، ومبدل الوضع الليلي.',
    features: [
      'شريط جانبي (Sidebar) متجاوب بالكامل',
      'كروت المؤشرات الرئيسية (KPIs) مع نسب الصعود الخضراء',
      'جدول طلبات يحتوي على فلترة وترتيب وتلوين لحالات الطلب',
      'حفظ خيار الوضع الليلي في LocalStorage'
    ],
    planningSteps: [
      'تخطيط الشاشة بـ CSS Grid لتقسيم المساحة بين الـ Sidebar والـ Main Content',
      'برمجة تفاعل القائمة الجانبية على الشاشات الصغيرة',
      'بناء جدول بيانات نظيف متجاوب مع التمرير الأفقي الآمن'
    ],
    htmlStructure: `<div class="dashboard-layout">
  <aside class="sidebar">...</aside>
  <main class="dashboard-main">
    <div class="kpi-grid">
      <div class="kpi-card"><h3>إجمالي المبيعات</h3><p class="value">$14,250</p></div>
    </div>
  </main>
</div>`,
    cssHighlights: `.dashboard-layout { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
@media (max-width: 900px) { .dashboard-layout { grid-template-columns: 1fr; } }`,
    testingChecklist: [
      'فحص تجاوب الجدول على شاشة الموبايل دون كسر تخطيط الصفحة',
      'التأكد من ثبات مظهر الـ Sidebar عند التمرير'
    ],
    deploymentSteps: [
      'النشر على استضافة سحابية مع رابط تجريبي للمعاينة في البورتفوليو'
    ]
  },
  {
    id: 'proj-6',
    number: 6,
    title: 'المشروع 6: تطبيق إدارة مهام ومشاريع تفاعلي (Task Manager App)',
    level: 'advanced',
    category: 'JavaScript Web Application',
    brief: 'تطبيق ويب جافاسكريبت متكامل لإدارة المهام والمشاريع، إضافة وحذف وتعديل وتصنيف، مع حفظ دائم في الذاكرة المحلية.',
    features: [
      'إضافة مهام جديدة مع تحديد الأولويات وتاريخ الإنجاز',
      'تصفية المهام: المكتملة، قيد التنفيذ، والكل',
      'تخزين كافة البيانات في LocalStorage لضمان عدم ضياعها',
      'إحصائيات إنجاز حية وشريط تقدم مئوي تفاعلي'
    ],
    planningSteps: [
      'بناء نموذج البيانات (State) كمصفوفة كائنات',
      'كتابة دوال CRUD (Create, Read, Update, Delete)',
      'تحديث الـ DOM وحفظ التغييرات تلقائياً في LocalStorage'
    ],
    htmlStructure: `<form id="task-form">
  <input type="text" id="task-title" required placeholder="اسم المهمة...">
  <select id="task-priority">
    <option value="high">عالية 🔥</option>
    <option value="normal">عادية</option>
  </select>
  <button type="submit">إضافة</button>
</form>
<ul id="tasks-container"></ul>`,
    cssHighlights: `.task-item.completed { text-decoration: line-through; opacity: 0.6; }
.priority-high { color: #ef4444; font-weight: bold; }`,
    jsLogic: `let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}`,
    testingChecklist: [
      'إضافة عدة مهام وتحديث الصفحة للتأكد من بقائها في الذاكرة',
      'اختبار حذف مهمة وتعديل حالة إنجازها'
    ],
    deploymentSteps: [
      'النشر كـ Progressive Web App جاهز للتثبيت على الهواتف'
    ]
  },
  {
    id: 'proj-7',
    number: 7,
    title: 'المشروع 7: الموقع الاحترافي الشامل للعملاء (Full Agency Website)',
    level: 'advanced',
    category: 'Full Commercial Website',
    brief: 'مشروع التخرج المتكامل: موقع شركة تسويق أو برمجيات يضم كافة الأقسام، نماذج التحقق، حركات عصرية، وشهادات إثبات.',
    features: [
      'شريط علوي متجاوب مع نافذة منبثقة (Modal) لحجز موعد',
      'معرض أعمال مصفى، حاسبة تقدير تكلفة المشروع الفورية',
      'قسم آراء عملاء دوار (Slider) تفاعلي',
      'كود نظيف تماماً ومطابق لأعلى معايير الـ SEO والـ Clean Code'
    ],
    planningSteps: [
      'وضع الهيكل الشامل لكافة صفحات وأقسام الموقع',
      'تقسيم الكود إلى ملفات منظمة وسهلة الصيانة',
      'تنفيذ اختبارات الجودة على الموبايل والتابلت والكمبيوتر',
      'إطلاق الموقع وحفظه كقطعة الماس المركزية في معرض أعمالك'
    ],
    htmlStructure: `<!-- النافذة المنبثقة لحجز استشارة -->
<div id="booking-modal" class="modal-overlay">
  <div class="modal-content">
    <button class="close-modal">&times;</button>
    <h3>احجز استشارتك المجانية</h3>
    <form id="booking-form">...</form>
  </div>
</div>`,
    cssHighlights: `.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: none; }
.modal-overlay.active { display: flex; justify-content: center; align-items: center; }`,
    testingChecklist: [
      'اختبار الموقع على متصفحات مختلفة (Chrome, Safari, Firefox)',
      'التحقق من عدم وجود أي خطأ في Console المتصفح',
      'فحص سرعة الموقع في محاكي شبكات الموبايل 4G'
    ],
    deploymentSteps: [
      'النشر على Vercel برابط دومين مخصص كامل وإضافته في السيرة الذاتية والبورتفوليو'
    ]
  }
];

// 3. FREELANCING SECTION DATA
export const freelanceServicesList: FreelanceService[] = [
  {
    title: 'تصميم وبرمجة صفحات الهبوط التسويقية (Landing Pages)',
    priceRange: '$300 - $800 للخدمة',
    deliveryTime: '3 إلى 5 أيام',
    description: 'إنشاء صفحات هبوط فائقة السرعة مخصصة لإطلاق المنتجات وحملات الإعلانات وجلب العملاء المحتملين.',
    deliverables: [
      'صفحة هبوط متجاوبة بالكامل على جميع الأجهزة',
      'ربط نموذج الاتصال بواتساب أو بريد العميل أو Google Sheets',
      'سرعة تحميل فائقة (90+ على Google PageSpeed)',
      'رفع الموقع على الاستضافة والدومين الخاص بالعميل'
    ]
  },
  {
    title: 'تطوير موقع شركة كامل (Multi-Section Business Website)',
    priceRange: '$800 - $2,500 للمشروع',
    deliveryTime: '7 إلى 14 يوماً',
    description: 'بناء موقع متكامل لشركة أو نشاط تجاري محلي يعرض كافة الخدمات وسابقة الأعمال وتسهيل الحجوزات.',
    deliverables: [
      '5 إلى 8 صفحات أو أقسام متناسقة المظهر',
      'تصميم عصري بالوضع الداكن أو الفاتح حسب هوية العميل',
      'لوحة تحكم أو نظام تعديل نصوص سهل',
      'تهيئة محركات البحث الأساسية (On-Page SEO) وربط الخريطة'
    ]
  },
  {
    title: 'إعادة تصميم وتحديث المواقع القديمة (Website Redesign & Speed)',
    priceRange: '$400 - $1,200 للمشروع',
    deliveryTime: '4 إلى 7 أيام',
    description: 'تحويل المواقع القديمة والبطيئة وغير المتجاوبة مع الهواتف إلى واجهات حديثة وسريعة المظهر.',
    deliverables: [
      'تحسين المظهر البصري ليتوافق مع ترندات 2026',
      'إصلاح مشاكل التجاوب مع شاشات الموبايل',
      'مضاعفة سرعة تحميل الصفحة مرتين إلى 3 مرات',
      'تقرير قبل وبعد يثبت التحسن في السرعة والتجربة'
    ]
  },
  {
    title: 'خدمات الصيانة والاستضافة الشهرية (Monthly Maintenance Retainer)',
    priceRange: '$50 - $150 شهرياً لكل عميل',
    deliveryTime: 'اشتراك شهري مستمر',
    description: 'دخل سلبي مستمر من خلال إدارة السيرفر وتجديد الشهادات الأمنية وعمل نسخ احتياطية وتعديلات شهرية طفيفة.',
    deliverables: [
      'استضافة الموقع ومتابعة عمله 24/7 بدون انقطاع',
      'تجديد مجاني ودائم لشهادة الأمان SSL',
      'نسخ احتياطي أسبوعي لكامل بيانات الموقع',
      'إمكانية إجراء تعديلات نصية أو صورية خفيفة شهرياً'
    ]
  }
];

export const clientOutreachEmail = {
  subject: 'فكرة سريعة لتحسين سرعة ومبيعات موقع [اسم الشركة أو الموقع الحالي] 🚀',
  body: `السلام عليكم أستاذ [اسم العميل أو المسؤول]، أتمنى أن تكون بأفضل حال.

كنت أبحث عن أفضل الشركات في مجال [مجال العميل، مثلاً: الاستشارات / الخدمات / النادي الصحي] ولفت انتباهي تميز خدماتكم وجودة ما تقدمونه!

أثناء تصفحي لموقعكم الحالي [رابط موقعهم] من هاتفي المحمول، لاحظت بضع نقاط تقنية بسيطة قد تعيق تحويل الزوار إلى عملاء:
1. بطء خفيف في تحميل الصور والعناصر الأولى على شبكات الهاتف (أكثر من 4 ثوانٍ).
2. عدم وضوح أزرار الاتصال والحجز الفوري في الشاشات الصغيرة.
3. غياب التناسق البصري الحديث الذي يليق بمكانة واسم شركتكم المرموق.

من باب اهتمامي وشغفي، قمت بإنشاء نموذج أولي تجريبي سريع (Concept Demo) لشكل الصفحة الرئيسي بعد إعادة تصميمها وتسريعها، وتجد رابط المعاينة الحية هنا:
🔗 [ضع رابط نموذجك التجريبي أو صفحة المعاينة السريعة]

النموذج يعمل بسرعة فائقة (أقل من ثانية واحدة) ومتوافق بنسبة 100% مع شاشات الهاتف لتسهيل التواصل بضغطة زر عبر واتساب.

إذا نالت الفكرة استحسانكم، يسعدني جداً ترتيب مكالمة سريعة لمدة 10 دقائق لمناقشة كيفية تسليمكم النسخة الكاملة وتطبيقها على دومينكم الحالي بسعر مرن ومناسب.

تحياتي العطرة وبالتوفيق لمشروعكم الدائم،
[اسمك الكامل]
مطور ومصمم مواقع الويب وصفحات الهبوط
معرض أعمالي: [رابط البورتفوليو الشخصي]
رقم الواتساب: [رقمك]`
};
