import { CalculatorTool, ContentUtilityTool } from '../types';

export const calculators: CalculatorTool[] = [
  {
    id: 'youtube-earnings',
    title: 'YouTube Earnings Calculator',
    arabicTitle: 'حاسبة أرباح يوتيوب (YouTube Earnings)',
    frenchTitle: 'Calculateur de Revenus YouTube',
    category: 'monetization',
    description: 'Calculate realistic estimated ad revenue from YouTube long-form views based on RPM.',
    arabicDescription: 'حساب الأرباح المتوقعة من مشاهدات فيديوهات يوتيوب الطويلة بناءً على معدل الـ RPM والنيتش.',
    frenchDescription: 'Estimez vos revenus publicitaires YouTube en fonction de votre RPM et de vos vues.',
    inputs: [
      {
        id: 'dailyViews',
        label: 'Daily Video Views',
        arabicLabel: 'المشاهدات اليومية',
        frenchLabel: 'Vues quotidiennes',
        type: 'number',
        defaultValue: 15000,
        min: 100,
        max: 50000000,
        suffix: 'views',
        arabicHelperText: 'متوسط عدد المشاهدات التي تحصدها قناتك يومياً'
      },
      {
        id: 'rpm',
        label: 'Estimated RPM ($)',
        arabicLabel: 'الربح لكل 1000 ظهور (RPM $)',
        frenchLabel: 'RPM estimé ($)',
        type: 'number',
        defaultValue: 2.5,
        min: 0.2,
        max: 50,
        step: 0.1,
        suffix: '$',
        arabicHelperText: 'يتراوح في المحتوى العربي بين 0.8$ و 4$ حسب المجال'
      }
    ],
    calculate: (v) => {
      const views = Math.max(0, v.dailyViews || 0);
      const rpm = Math.max(0.1, v.rpm || 1);
      const daily = (views / 1000) * rpm;
      const monthly = daily * 30;
      const yearly = daily * 365;

      return [
        {
          label: 'Daily Estimated Revenue',
          arabicLabel: 'الدخل اليومي المقدر',
          frenchLabel: 'Revenu journalier estimé',
          value: `$${daily.toFixed(2)}`,
          highlight: false
        },
        {
          label: 'Monthly Estimated Revenue',
          arabicLabel: 'الدخل الشهري المقدر',
          frenchLabel: 'Revenu mensuel estimé',
          value: `$${monthly.toFixed(2)}`,
          highlight: true,
          arabicDescription: 'مبني على 30 يوماً من النشر والاستقرار'
        },
        {
          label: 'Yearly Estimated Revenue',
          arabicLabel: 'الدخل السنوي المتوقع',
          frenchLabel: 'Revenu annuel estimé',
          value: `$${yearly.toFixed(2)}`,
          highlight: false
        }
      ];
    }
  },
  {
    id: 'tiktok-earnings',
    title: 'TikTok Earnings Calculator',
    arabicTitle: 'حاسبة أرباح تيك توك (TikTok Earnings)',
    frenchTitle: 'Calculateur de Gains TikTok',
    category: 'monetization',
    description: 'Calculate TikTok Creator Rewards / beta program revenue based on qualifying qualified views.',
    arabicDescription: 'حساب أرباح برنامج مكافآت المبدعين في تيك توك بناءً على المشاهدات المؤهلة والـ RPM.',
    frenchDescription: 'Calculez les gains du programme pour la création TikTok selon vos vues qualifiées.',
    inputs: [
      {
        id: 'monthlyViews',
        label: 'Monthly Views (1min+ videos)',
        arabicLabel: 'المشاهدات الشهرية (أكثر من دقيقة)',
        frenchLabel: 'Vues mensuelles (+1 min)',
        type: 'number',
        defaultValue: 250000,
        min: 1000,
        max: 100000000,
        suffix: 'views',
        arabicHelperText: 'فقط المشاهدات على مقاطع تتجاوز مدتها دقيقة واحدة'
      },
      {
        id: 'qualifiedPercent',
        label: 'Qualified Views Ratio (%)',
        arabicLabel: 'نسبة المشاهدات المؤهلة (%)',
        frenchLabel: 'Ratio vues qualifiées (%)',
        type: 'number',
        defaultValue: 60,
        min: 10,
        max: 95,
        suffix: '%',
        arabicHelperText: 'المشاهدات من صفحة For You التي تجاوزت 5 ثوانٍ'
      },
      {
        id: 'rpm',
        label: 'Average RPM ($)',
        arabicLabel: 'معدل الـ RPM ($)',
        frenchLabel: 'RPM Moyen ($)',
        type: 'number',
        defaultValue: 0.65,
        min: 0.1,
        max: 5,
        step: 0.05,
        suffix: '$'
      }
    ],
    calculate: (v) => {
      const views = Math.max(0, v.monthlyViews || 0);
      const qualPct = Math.min(100, Math.max(5, v.qualifiedPercent || 50)) / 100;
      const rpm = Math.max(0.05, v.rpm || 0.5);
      const qualifiedViews = views * qualPct;
      const monthlyTotal = (qualifiedViews / 1000) * rpm;

      return [
        {
          label: 'Eligible Qualified Views',
          arabicLabel: 'المشاهدات المحتسبة للربح',
          frenchLabel: 'Vues qualifiées éligibles',
          value: Math.round(qualifiedViews).toLocaleString()
        },
        {
          label: 'Estimated TikTok Payout',
          arabicLabel: 'الربح الشهري الصافي المقدر',
          frenchLabel: 'Paiement mensuel estimé',
          value: `$${monthlyTotal.toFixed(2)}`,
          highlight: true
        }
      ];
    }
  },
  {
    id: 'cpm-calculator',
    title: 'CPM Calculator',
    arabicTitle: 'حاسبة التكلفة لكل ألف ظهور (CPM Calculator)',
    frenchTitle: 'Calculateur de CPM',
    category: 'advertising',
    description: 'Calculate Cost Per Mille (cost per 1,000 ad impressions) for campaigns or media buying.',
    arabicDescription: 'حساب التكلفة لكل ألف ظهور إعلاني لمعرفة كفاءة إنفاقك الإعلاني على المنصات.',
    frenchDescription: 'Calculez le coût pour mille impressions de vos campagnes publicitaires.',
    inputs: [
      {
        id: 'totalCost',
        label: 'Total Ad Spend ($)',
        arabicLabel: 'إجمالي الميزانية الإعلانية ($)',
        frenchLabel: 'Dépenses publicitaires totales ($)',
        type: 'number',
        defaultValue: 150,
        min: 1,
        suffix: '$'
      },
      {
        id: 'impressions',
        label: 'Total Impressions',
        arabicLabel: 'إجمالي مرات الظهور (Impressions)',
        frenchLabel: 'Impressions totales',
        type: 'number',
        defaultValue: 75000,
        min: 100,
        suffix: 'times'
      }
    ],
    calculate: (v) => {
      const cost = Math.max(0, v.totalCost || 0);
      const imps = Math.max(1, v.impressions || 1);
      const cpm = (cost / imps) * 1000;
      return [
        {
          label: 'Calculated CPM',
          arabicLabel: 'تكلفة الألف ظهور (CPM)',
          frenchLabel: 'CPM Calculé',
          value: `$${cpm.toFixed(2)}`,
          highlight: true
        },
        {
          label: 'Cost Per Single Impression',
          arabicLabel: 'تكلفة الظهور الواحد',
          frenchLabel: 'Coût par impression',
          value: `$${(cost / imps).toFixed(4)}`
        }
      ];
    }
  },
  {
    id: 'rpm-calculator',
    title: 'RPM Calculator',
    arabicTitle: 'حاسبة العائد لكل ألف ظهور (RPM Calculator)',
    frenchTitle: 'Calculateur de RPM',
    category: 'monetization',
    description: 'Calculate Revenue Per Mille (actual net creator earnings per 1,000 total views).',
    arabicDescription: 'حساب صافي الأرباح التي تدخل جيبك لكل 1,000 مشاهدة إجمالية بعد خصم حصة المنصة.',
    frenchDescription: 'Calculez votre revenu net par tranche de 1 000 vues réelles.',
    inputs: [
      {
        id: 'totalEarnings',
        label: 'Total Earnings ($)',
        arabicLabel: 'إجمالي الأرباح المحققة ($)',
        frenchLabel: 'Gains totaux ($)',
        type: 'number',
        defaultValue: 420,
        min: 0.1,
        suffix: '$'
      },
      {
        id: 'totalViews',
        label: 'Total Views Generated',
        arabicLabel: 'إجمالي المشاهدات التي جلبتها',
        frenchLabel: 'Vues totales générées',
        type: 'number',
        defaultValue: 180000,
        min: 100,
        suffix: 'views'
      }
    ],
    calculate: (v) => {
      const earnings = Math.max(0, v.totalEarnings || 0);
      const views = Math.max(1, v.totalViews || 1);
      const rpm = (earnings / views) * 1000;
      return [
        {
          label: 'Net RPM Rate',
          arabicLabel: 'معدل الـ RPM الصافي',
          frenchLabel: 'Taux de RPM Net',
          value: `$${rpm.toFixed(2)}`,
          highlight: true,
          arabicDescription: 'هذا ما تربحه فعلياً لكل 1000 مشاهدة على قناتك'
        }
      ];
    }
  },
  {
    id: 'ctr-calculator',
    title: 'CTR (Click-Through Rate) Calculator',
    arabicTitle: 'حاسبة نسبة النقر للظهور (CTR Calculator)',
    frenchTitle: 'Calculateur de Taux de Clic (CTR)',
    category: 'metrics',
    description: 'Measure the percentage of people who clicked your thumbnail or ad after seeing it.',
    arabicDescription: 'قياس نسبة الأشخاص الذين نقروا على صورتك المصغرة أو إعلانك بعد أن ظهر أمامهم.',
    frenchDescription: 'Mesurez le pourcentage de clics obtenus par rapport aux impressions générées.',
    inputs: [
      {
        id: 'clicks',
        label: 'Total Clicks',
        arabicLabel: 'إجمالي النقرات (Clicks)',
        frenchLabel: 'Total des clics',
        type: 'number',
        defaultValue: 3800,
        min: 0
      },
      {
        id: 'impressions',
        label: 'Total Impressions',
        arabicLabel: 'إجمالي مرات الظهور (Impressions)',
        frenchLabel: 'Impressions totales',
        type: 'number',
        defaultValue: 45000,
        min: 1
      }
    ],
    calculate: (v) => {
      const clicks = Math.max(0, v.clicks || 0);
      const imps = Math.max(1, v.impressions || 1);
      const ctr = (clicks / imps) * 100;
      let status = 'Good / جيد';
      if (ctr < 3) status = 'Needs Improvement / يحتاج تحسين الصورة المصغرة';
      else if (ctr > 8) status = 'Viral Level / ممتاز جداً ومؤهل للانتشار';

      return [
        {
          label: 'Click-Through Rate (CTR)',
          arabicLabel: 'نسبة النقر للظهور (CTR)',
          frenchLabel: 'Taux de clic (CTR)',
          value: `${ctr.toFixed(2)}%`,
          highlight: true
        },
        {
          label: 'Performance Evaluation',
          arabicLabel: 'تقييم الأداء',
          frenchLabel: 'Évaluation de la performance',
          value: status
        }
      ];
    }
  },
  {
    id: 'engagement-rate-calculator',
    title: 'Engagement Rate Calculator',
    arabicTitle: 'حاسبة معدل التفاعل (Engagement Rate)',
    frenchTitle: 'Calculateur de Taux d’Engagement',
    category: 'metrics',
    description: 'Calculate social media engagement based on likes, comments, shares, and followers.',
    arabicDescription: 'حساب النسبة الحقيقية لتفاعل المتابعين على منشوراتك لتقييم صحة حسابك وجاذبيته للرعاة.',
    frenchDescription: 'Évaluez le taux d’engagement réel de vos publications pour séduire les marques.',
    inputs: [
      {
        id: 'likes',
        label: 'Average Likes per Post',
        arabicLabel: 'متوسط الإعجابات بالمنشور',
        frenchLabel: 'Likes moyens par post',
        type: 'number',
        defaultValue: 1200,
        min: 0
      },
      {
        id: 'comments',
        label: 'Average Comments',
        arabicLabel: 'متوسط التعليقات',
        frenchLabel: 'Commentaires moyens',
        type: 'number',
        defaultValue: 180,
        min: 0
      },
      {
        id: 'shares',
        label: 'Average Shares / Saves',
        arabicLabel: 'متوسط المشاركات والحفظ',
        frenchLabel: 'Partages et enregistrements',
        type: 'number',
        defaultValue: 350,
        min: 0
      },
      {
        id: 'followers',
        label: 'Total Followers',
        arabicLabel: 'إجمالي المتابعين',
        frenchLabel: 'Total des abonnés',
        type: 'number',
        defaultValue: 25000,
        min: 10
      }
    ],
    calculate: (v) => {
      const interactions = (v.likes || 0) + (v.comments || 0) + (v.shares || 0);
      const followers = Math.max(1, v.followers || 1);
      const rate = (interactions / followers) * 100;

      return [
        {
          label: 'Engagement Rate',
          arabicLabel: 'معدل التفاعل الإجمالي',
          frenchLabel: 'Taux d’engagement',
          value: `${rate.toFixed(2)}%`,
          highlight: true,
          arabicDescription: 'المعدل الممتاز على انستغرام وتيك توك يتراوح بين 3% إلى 7%+'
        },
        {
          label: 'Total Interactions per Post',
          arabicLabel: 'مجموع التفاعلات لكل منشور',
          frenchLabel: 'Interactions totales par post',
          value: interactions.toLocaleString()
        }
      ];
    }
  },
  {
    id: 'affiliate-commission-calculator',
    title: 'Affiliate Commission Calculator',
    arabicTitle: 'حاسبة عمولة التسويق بالعمولة (Affiliate Commission)',
    frenchTitle: 'Calculateur de Commission d’Affiliation',
    category: 'ecommerce',
    description: 'Calculate net affiliate earnings from traffic, conversion rate, and commission percentage.',
    arabicDescription: 'حساب صافي الأرباح من حملات الأفيلييت بناءً على عدد الزوار ونسبة التحويل ونسبة العمولة.',
    frenchDescription: 'Calculez vos gains nets d’affiliation selon votre trafic et taux de conversion.',
    inputs: [
      {
        id: 'linkClicks',
        label: 'Monthly Link Clicks',
        arabicLabel: 'النقرات على رابطك شهرياً',
        frenchLabel: 'Clics mensuels sur vos liens',
        type: 'number',
        defaultValue: 5000,
        min: 10
      },
      {
        id: 'conversionRate',
        label: 'Conversion Rate (%)',
        arabicLabel: 'نسبة الشراء من الزوار (%)',
        frenchLabel: 'Taux de conversion (%)',
        type: 'number',
        defaultValue: 2.5,
        min: 0.1,
        max: 50,
        step: 0.1,
        suffix: '%'
      },
      {
        id: 'productPrice',
        label: 'Average Product Price ($)',
        arabicLabel: 'متوسط سعر المنتج ($)',
        frenchLabel: 'Prix moyen du produit ($)',
        type: 'number',
        defaultValue: 65,
        min: 1,
        suffix: '$'
      },
      {
        id: 'commissionRate',
        label: 'Commission Rate (%)',
        arabicLabel: 'نسبة عمولتك (%)',
        frenchLabel: 'Taux de commission (%)',
        type: 'number',
        defaultValue: 20,
        min: 1,
        max: 100,
        suffix: '%'
      }
    ],
    calculate: (v) => {
      const clicks = Math.max(0, v.linkClicks || 0);
      const cr = Math.min(100, Math.max(0.01, v.conversionRate || 1)) / 100;
      const price = Math.max(0, v.productPrice || 0);
      const commRate = Math.min(100, Math.max(0, v.commissionRate || 0)) / 100;

      const sales = Math.floor(clicks * cr);
      const totalVolume = sales * price;
      const profit = totalVolume * commRate;

      return [
        {
          label: 'Estimated Successful Orders',
          arabicLabel: 'عدد المبيعات المتوقعة',
          frenchLabel: 'Commandes estimées',
          value: sales.toLocaleString()
        },
        {
          label: 'Net Monthly Commission',
          arabicLabel: 'صافي عمولتك الشهرية',
          frenchLabel: 'Commission mensuelle nette',
          value: `$${profit.toFixed(2)}`,
          highlight: true
        }
      ];
    }
  },
  {
    id: 'monthly-income-goal-calculator',
    title: 'Monthly Income Goal Calculator',
    arabicTitle: 'حاسبة الهدف المالي الشهري (Income Goal)',
    frenchTitle: 'Calculateur d’Objectif Financier Mensuel',
    category: 'growth',
    description: 'Reverse engineer exactly how many sales, clients, or views you need to hit your target.',
    arabicDescription: 'تفكيك هدفك المالي إلى خطوات يومية ملموسة: كم مبيعة أو عميل تحتاجه شهرياً للوصول لرقمك.',
    frenchDescription: 'Déterminez précisément le volume de ventes ou clients requis pour atteindre vos objectifs.',
    inputs: [
      {
        id: 'targetIncome',
        label: 'Desired Monthly Income ($)',
        arabicLabel: 'الدخل الشهري المطلوب تحقيقه ($)',
        frenchLabel: 'Revenu mensuel cible ($)',
        type: 'number',
        defaultValue: 2500,
        min: 100,
        suffix: '$'
      },
      {
        id: 'avgRevenuePerUnit',
        label: 'Net Profit per Sale or Client ($)',
        arabicLabel: 'صافي ربحك من العميل أو المنتج ($)',
        frenchLabel: 'Profit net par vente / client ($)',
        type: 'number',
        defaultValue: 75,
        min: 1,
        suffix: '$'
      }
    ],
    calculate: (v) => {
      const target = Math.max(1, v.targetIncome || 1);
      const profitPerUnit = Math.max(0.5, v.avgRevenuePerUnit || 1);
      const unitsNeeded = Math.ceil(target / profitPerUnit);
      const dailyUnits = (unitsNeeded / 30).toFixed(1);

      return [
        {
          label: 'Total Sales / Clients Needed (Month)',
          arabicLabel: 'عدد المبيعات المطلوبة شهرياً',
          frenchLabel: 'Ventes / clients requis par mois',
          value: `${unitsNeeded} units`,
          highlight: true
        },
        {
          label: 'Daily Target Needed',
          arabicLabel: 'المعدل المطلوب يومياً',
          frenchLabel: 'Objectif quotidien',
          value: `${dailyUnits} sales / day`
        }
      ];
    }
  },
  {
    id: 'views-needed-calculator',
    title: 'Views Needed Calculator',
    arabicTitle: 'حاسبة المشاهدات المطلوبة للدخل (Views Needed)',
    frenchTitle: 'Calculateur de Vues Requises',
    category: 'growth',
    description: 'Determine total video views needed to make a specific dollar amount based on your RPM.',
    arabicDescription: 'معرفة كم مشاهدة فيديو تحتاج لتحقيق مبلغ مالي محدد بناءً على سعر الـ RPM لقناتك.',
    frenchDescription: 'Estimez le nombre de vues indispensables pour encaisser une somme définie.',
    inputs: [
      {
        id: 'desiredDollars',
        label: 'Target Earnings ($)',
        arabicLabel: 'المبلغ المستهدف كسبه ($)',
        frenchLabel: 'Gains visés ($)',
        type: 'number',
        defaultValue: 1000,
        min: 10,
        suffix: '$'
      },
      {
        id: 'channelRpm',
        label: 'Channel RPM ($)',
        arabicLabel: 'معدل الـ RPM لقناتك ($)',
        frenchLabel: 'RPM de votre chaîne ($)',
        type: 'number',
        defaultValue: 2.2,
        min: 0.1,
        step: 0.1,
        suffix: '$'
      }
    ],
    calculate: (v) => {
      const target = Math.max(1, v.desiredDollars || 1);
      const rpm = Math.max(0.05, v.channelRpm || 1);
      const viewsNeeded = Math.ceil((target / rpm) * 1000);

      return [
        {
          label: 'Total Views Required',
          arabicLabel: 'المشاهدات المطلوبة للوصول للهدف',
          frenchLabel: 'Vues totales nécessaires',
          value: viewsNeeded.toLocaleString(),
          highlight: true
        },
        {
          label: 'Daily Views Target (over 30 days)',
          arabicLabel: 'المعدل اليومي المطلوب (على 30 يوم)',
          frenchLabel: 'Vues par jour nécessaires',
          value: `${Math.ceil(viewsNeeded / 30).toLocaleString()} views / day`
        }
      ];
    }
  },
  {
    id: 'profit-margin-calculator',
    title: 'Profit Margin Calculator',
    arabicTitle: 'حاسبة هامش الربح (Profit Margin Calculator)',
    frenchTitle: 'Calculateur de Marge Bénéficiaire',
    category: 'ecommerce',
    description: 'Calculate gross profit, net profit, and profit margin percentage for any product.',
    arabicDescription: 'حساب صافي الربح وهامش الربح المئوي لأي منتج أو خدمة بعد خصم كافة التكاليف.',
    frenchDescription: 'Calculez le profit net et la marge en pourcentage de vos produits vendus.',
    inputs: [
      {
        id: 'sellingPrice',
        label: 'Selling Price ($)',
        arabicLabel: 'سعر البيع النهائي للزبون ($)',
        frenchLabel: 'Prix de vente final ($)',
        type: 'number',
        defaultValue: 49,
        min: 1,
        suffix: '$'
      },
      {
        id: 'totalCost',
        label: 'Total Cost per Unit ($)',
        arabicLabel: 'تكلفة المنتج الإجمالية (شراء + شحن + إعلانات) ($)',
        frenchLabel: 'Coût total unitaire ($)',
        type: 'number',
        defaultValue: 22,
        min: 0,
        suffix: '$'
      }
    ],
    calculate: (v) => {
      const price = Math.max(0.1, v.sellingPrice || 1);
      const cost = Math.max(0, v.totalCost || 0);
      const profit = price - cost;
      const margin = (profit / price) * 100;

      return [
        {
          label: 'Net Profit per Unit',
          arabicLabel: 'صافي الربح في كل قطعة',
          frenchLabel: 'Bénéfice net unitaire',
          value: `$${profit.toFixed(2)}`,
          highlight: true
        },
        {
          label: 'Profit Margin (%)',
          arabicLabel: 'هامش الربح المئوي',
          frenchLabel: 'Marge bénéficiaire (%)',
          value: `${margin.toFixed(1)}%`
        }
      ];
    }
  },
  {
    id: 'roas-calculator',
    title: 'ROAS (Return on Ad Spend) Calculator',
    arabicTitle: 'حاسبة العائد على الإنفاق الإعلاني (ROAS Calculator)',
    frenchTitle: 'Calculateur de ROAS',
    category: 'advertising',
    description: 'Calculate Return on Ad Spend to evaluate profitability of paid ad campaigns.',
    arabicDescription: 'معرفة مدى ربحية إعلاناتك الممولة: كم دولار مبيعات يعود عليك مقابل كل دولار تصرفه.',
    frenchDescription: 'Mesurez le retour sur vos investissements publicitaires.',
    inputs: [
      {
        id: 'revenueGenerated',
        label: 'Total Revenue from Ads ($)',
        arabicLabel: 'المبيعات الناتجة عن الإعلانات ($)',
        frenchLabel: 'Chiffre d’affaires issu des pubs ($)',
        type: 'number',
        defaultValue: 3200,
        min: 0,
        suffix: '$'
      },
      {
        id: 'adSpend',
        label: 'Total Ad Spend ($)',
        arabicLabel: 'تكلفة الإعلانات المصروفة ($)',
        frenchLabel: 'Budget publicitaire dépensé ($)',
        type: 'number',
        defaultValue: 1000,
        min: 1,
        suffix: '$'
      }
    ],
    calculate: (v) => {
      const rev = Math.max(0, v.revenueGenerated || 0);
      const spend = Math.max(1, v.adSpend || 1);
      const roas = rev / spend;
      let status = 'Profitable / رابح';
      if (roas < 1.5) status = 'Low / هامش ضعيف أو خاسر بعد التكاليف';
      else if (roas > 3.0) status = 'Excellent / ممتاز جداً (جاهز للتوسيع)';

      return [
        {
          label: 'ROAS Ratio',
          arabicLabel: 'معامل الـ ROAS',
          frenchLabel: 'Coefficient ROAS',
          value: `${roas.toFixed(2)}x`,
          highlight: true
        },
        {
          label: 'Campaign Status',
          arabicLabel: 'حالة الحملة',
          frenchLabel: 'Statut de la campagne',
          value: status
        }
      ];
    }
  },
  {
    id: 'conversion-rate-calculator',
    title: 'Conversion Rate Calculator',
    arabicTitle: 'حاسبة معدل التحويل (Conversion Rate)',
    frenchTitle: 'Calculateur de Taux de Conversion',
    category: 'metrics',
    description: 'Calculate what percentage of landing page visitors converted into paying customers or leads.',
    arabicDescription: 'حساب نسبة زوار موقعك أو متجرك الذين تحولوا إلى مشترين فعليين أو سجلوا بياناتهم.',
    frenchDescription: 'Mesurez l’efficacité de votre page de vente à convertir les visiteurs.',
    inputs: [
      {
        id: 'conversions',
        label: 'Total Conversions / Orders',
        arabicLabel: 'إجمالي الطلبات أو المشتركين',
        frenchLabel: 'Conversions / commandes',
        type: 'number',
        defaultValue: 85,
        min: 0
      },
      {
        id: 'totalVisitors',
        label: 'Total Page Visitors',
        arabicLabel: 'إجمالي زوار الصفحة',
        frenchLabel: 'Visiteurs uniques totaux',
        type: 'number',
        defaultValue: 3200,
        min: 1
      }
    ],
    calculate: (v) => {
      const conv = Math.max(0, v.conversions || 0);
      const visitors = Math.max(1, v.totalVisitors || 1);
      const rate = (conv / visitors) * 100;

      return [
        {
          label: 'Conversion Rate (CR)',
          arabicLabel: 'معدل التحويل (CR)',
          frenchLabel: 'Taux de conversion (CR)',
          value: `${rate.toFixed(2)}%`,
          highlight: true,
          arabicDescription: 'المتوسط القياسي للمتاجر الإلكترونية يتراوح بين 1.5% و 3.5%'
        }
      ];
    }
  },
  {
    id: 'follower-growth-calculator',
    title: 'Follower Growth Calculator',
    arabicTitle: 'حاسبة توقع نمو المتابعين (Follower Growth)',
    frenchTitle: 'Calculateur de Croissance d’Abonnés',
    category: 'growth',
    description: 'Project your future follower milestone based on your current daily organic growth rate.',
    arabicDescription: 'توقع متى ستصل إلى 10k أو 50k أو 100k متابع بناءً على معدل الزيادة اليومية الحالية.',
    frenchDescription: 'Projetez la date à laquelle vous atteindrez vos prochains jalons d’audience.',
    inputs: [
      {
        id: 'currentFollowers',
        label: 'Current Followers',
        arabicLabel: 'عدد المتابعين الحالي',
        frenchLabel: 'Abonnés actuels',
        type: 'number',
        defaultValue: 4500,
        min: 0
      },
      {
        id: 'dailyNewFollowers',
        label: 'Average New Followers / Day',
        arabicLabel: 'متوسط المتابعين الجدد يومياً',
        frenchLabel: 'Nouveaux abonnés par jour',
        type: 'number',
        defaultValue: 75,
        min: 1
      }
    ],
    calculate: (v) => {
      const curr = Math.max(0, v.currentFollowers || 0);
      const daily = Math.max(1, v.dailyNewFollowers || 1);
      const in30Days = curr + daily * 30;
      const in90Days = curr + daily * 90;
      const in1Year = curr + daily * 365;

      return [
        {
          label: 'Followers in 30 Days',
          arabicLabel: 'المتوقع بعد شهر (30 يوم)',
          frenchLabel: 'Abonnés dans 30 jours',
          value: in30Days.toLocaleString(),
          highlight: false
        },
        {
          label: 'Followers in 90 Days',
          arabicLabel: 'المتوقع بعد 3 أشهر (90 يوم)',
          frenchLabel: 'Abonnés dans 90 jours',
          value: in90Days.toLocaleString(),
          highlight: true
        },
        {
          label: 'Followers in 1 Year',
          arabicLabel: 'المتوقع بعد سنة كاملة',
          frenchLabel: 'Abonnés dans 1 an',
          value: in1Year.toLocaleString()
        }
      ];
    }
  },
  {
    id: 'time-to-goal-calculator',
    title: 'Time to Goal Calculator',
    arabicTitle: 'حاسبة المدة للوصول إلى الهدف (Time to Goal)',
    frenchTitle: 'Calculateur de Temps pour Atteindre un But',
    category: 'growth',
    description: 'Calculate how many days and months until you achieve a specific follower or money milestone.',
    arabicDescription: 'حساب عدد الأيام والشهور المتبقية بالضبط للوصول لرقم متابعين أو دخل محدد بدقة.',
    frenchDescription: 'Calculez le temps nécessaire pour concrétiser votre objectif chiffré.',
    inputs: [
      {
        id: 'currentNumber',
        label: 'Current Level',
        arabicLabel: 'الرقم الحالي (متابعين أو أرباح)',
        frenchLabel: 'Niveau actuel',
        type: 'number',
        defaultValue: 2200,
        min: 0
      },
      {
        id: 'targetNumber',
        label: 'Target Goal',
        arabicLabel: 'الهدف المطلوب الوصول إليه',
        frenchLabel: 'Objectif final visé',
        type: 'number',
        defaultValue: 10000,
        min: 10
      },
      {
        id: 'dailyAddition',
        label: 'Average Daily Growth Rate',
        arabicLabel: 'معدل الزيادة اليومية',
        frenchLabel: 'Progression journalière',
        type: 'number',
        defaultValue: 65,
        min: 1
      }
    ],
    calculate: (v) => {
      const current = Math.max(0, v.currentNumber || 0);
      const target = Math.max(current + 1, v.targetNumber || 1000);
      const daily = Math.max(1, v.dailyAddition || 1);

      const diff = target - current;
      const days = Math.ceil(diff / daily);
      const months = (days / 30.4).toFixed(1);

      return [
        {
          label: 'Days Required',
          arabicLabel: 'الأيام المتبقية للهدف',
          frenchLabel: 'Jours requis',
          value: `${days} Days / يوم`,
          highlight: true
        },
        {
          label: 'Estimated Months',
          arabicLabel: 'الشهور المقدرة',
          frenchLabel: 'Mois estimés',
          value: `~${months} Months / شهر`
        }
      ];
    }
  },
  {
    id: 'cpc-calculator',
    title: 'CPC (Cost Per Click) Calculator',
    arabicTitle: 'حاسبة التكلفة لكل نقرة (CPC Calculator)',
    frenchTitle: 'Calculateur de Coût par Clic (CPC)',
    category: 'advertising',
    description: 'Calculate average cost incurred per single visitor click from your advertising budget.',
    arabicDescription: 'حساب التكلفة الفعلية لكل نقرة قام بها الزبون على إعلانك.',
    frenchDescription: 'Mesurez le coût moyen par clic pour chaque visiteur envoyé sur votre lien.',
    inputs: [
      {
        id: 'totalCost',
        label: 'Total Campaign Cost ($)',
        arabicLabel: 'إجمالي الميزانية المصروفة ($)',
        frenchLabel: 'Budget dépensé ($)',
        type: 'number',
        defaultValue: 80,
        min: 1,
        suffix: '$'
      },
      {
        id: 'totalClicks',
        label: 'Total Clicks Received',
        arabicLabel: 'عدد النقرات المحققة',
        frenchLabel: 'Nombre total de clics',
        type: 'number',
        defaultValue: 420,
        min: 1
      }
    ],
    calculate: (v) => {
      const cost = Math.max(0, v.totalCost || 0);
      const clicks = Math.max(1, v.totalClicks || 1);
      const cpc = cost / clicks;

      return [
        {
          label: 'Cost Per Click (CPC)',
          arabicLabel: 'التكلفة لكل نقرة (CPC)',
          frenchLabel: 'Coût par clic moyen (CPC)',
          value: `$${cpc.toFixed(3)}`,
          highlight: true
        }
      ];
    }
  },
  {
    id: 'cpa-calculator',
    title: 'CPA (Cost Per Acquisition) Calculator',
    arabicTitle: 'حاسبة تكلفة اكتساب العميل (CPA Calculator)',
    frenchTitle: 'Calculateur de Coût par Acquisition (CPA)',
    category: 'advertising',
    description: 'Determine your true acquisition cost per new paying client or customer.',
    arabicDescription: 'حساب كم يكلفك جلب عميل حقيقي جديد يدفع لك المال بعد حساب كل التكاليف التسويقية.',
    frenchDescription: 'Déterminez le coût exact pour convertir un nouvel acheteur payant.',
    inputs: [
      {
        id: 'totalMarketingSpend',
        label: 'Total Marketing Spend ($)',
        arabicLabel: 'إجمالي المصاريف التسويقية ($)',
        frenchLabel: 'Budget marketing total ($)',
        type: 'number',
        defaultValue: 600,
        min: 1,
        suffix: '$'
      },
      {
        id: 'totalNewCustomers',
        label: 'New Paying Customers Acquired',
        arabicLabel: 'عدد العملاء الجدد المكتسبين',
        frenchLabel: 'Nouveaux clients payants',
        type: 'number',
        defaultValue: 28,
        min: 1
      }
    ],
    calculate: (v) => {
      const spend = Math.max(0, v.totalMarketingSpend || 0);
      const customers = Math.max(1, v.totalNewCustomers || 1);
      const cpa = spend / customers;

      return [
        {
          label: 'Cost Per Acquisition (CPA)',
          arabicLabel: 'تكلفة اكتساب العميل الواحد (CPA)',
          frenchLabel: 'Coût par acquisition (CPA)',
          value: `$${cpa.toFixed(2)}`,
          highlight: true,
          arabicDescription: 'يجب أن يكون أقل من صافي ربح العميل لتكون رابحاً'
        }
      ];
    }
  },
  {
    id: 'posts-required-calculator',
    title: 'Posts Required Calculator',
    arabicTitle: 'حاسبة المنشورات المطلوبة للهدف (Posts Required)',
    frenchTitle: 'Calculateur de Publications Requises',
    category: 'growth',
    description: 'Calculate how many videos or posts you must publish to hit your reach or follower targets.',
    arabicDescription: 'حساب كم فيديو أو منشور تحتاج إلى نشره بناءً على متوسط المشاهدات والمتابعين لكل فيديو.',
    frenchDescription: 'Calculez le volume de vidéos à publier pour concrétiser vos objectifs.',
    inputs: [
      {
        id: 'targetFollowers',
        label: 'Target Follower Growth',
        arabicLabel: 'عدد المتابعين المستهدف إضافتهم',
        frenchLabel: 'Croissance d’abonnés visée',
        type: 'number',
        defaultValue: 5000,
        min: 10
      },
      {
        id: 'avgFollowersPerPost',
        label: 'Average New Followers per Video',
        arabicLabel: 'متوسط المتابعين الجدد من كل فيديو',
        frenchLabel: 'Abonnés moyens par vidéo',
        type: 'number',
        defaultValue: 45,
        min: 1
      }
    ],
    calculate: (v) => {
      const target = Math.max(1, v.targetFollowers || 1);
      const perPost = Math.max(1, v.avgFollowersPerPost || 1);
      const postsNeeded = Math.ceil(target / perPost);
      const weeksAt3PerWeek = Math.ceil(postsNeeded / 3);

      return [
        {
          label: 'Total Videos / Posts Needed',
          arabicLabel: 'إجمالي الفيديوهات المطلوبة',
          frenchLabel: 'Vidéos requises au total',
          value: `${postsNeeded} Posts / منشور`,
          highlight: true
        },
        {
          label: 'Estimated Weeks (at 3 posts/week)',
          arabicLabel: 'المدة المقدرة (بمعدل 3 فيديوهات أسبوعياً)',
          frenchLabel: 'Semaines requises (à 3 posts/sem)',
          value: `${weeksAt3PerWeek} Weeks / أسبوع`
        }
      ];
    }
  }
];

export const contentUtilityTools: ContentUtilityTool[] = [
  {
    id: 'content-ideas-generator',
    title: 'Instant Content Ideas Generator',
    arabicTitle: 'مولد أفكار المحتوى الفوري',
    frenchTitle: 'Générateur d’Idées de Contenu Instantané',
    description: 'Generate fresh angles and video concepts based on your niche and target platform.',
    arabicDescription: 'توليد زوايا وأفكار محتوى مبتكرة فورية تلائم مجالك ومنصتك المستهدفة بضغطة زر.',
    frenchDescription: 'Générez des angles originaux et concepts de vidéos adaptés à votre niche.',
    iconName: 'Lightbulb'
  },
  {
    id: 'hook-generator',
    title: 'Viral Hook Generator',
    arabicTitle: 'مولد الخطافات والهوك الفيروسي (Hooks)',
    frenchTitle: 'Générateur d’Accroches Virales',
    description: 'Create high-retention opening lines that prevent viewers from scrolling past.',
    arabicDescription: 'ابتكار جمل افتتاحية صادمة تمنع المشاهد من التمرير وتجبره على إكمال الفيديو.',
    frenchDescription: 'Créez des premières secondes percutantes pour retenir l’attention des spectateurs.',
    iconName: 'Zap'
  },
  {
    id: 'title-generator',
    title: 'YouTube Title & Thumbnail Hook Generator',
    arabicTitle: 'مولد عناوين يوتيوب الجذابة',
    frenchTitle: 'Générateur de Titres YouTube Captivants',
    description: 'Formulate high-CTR psychological titles that spark irresistible curiosity.',
    arabicDescription: 'صياغة عناوين تعتمد على الفضول والمشاعر الذكية لرفع نسبة النقر للظهور.',
    frenchDescription: 'Formulez des titres à fort taux de clic basés sur la curiosité et l’émotion.',
    iconName: 'Sparkles'
  },
  {
    id: 'hashtag-generator',
    title: 'Smart Hashtag Generator',
    arabicTitle: 'مولد الهاشتاقات الذكية والترندات',
    frenchTitle: 'Générateur de Hashtags Tendances',
    description: 'Extract high-performing, niche-relevant hashtags for TikTok, Reels, and YouTube.',
    arabicDescription: 'استخراج وسوم نشطة ومتوازنة تجمع بين الترند العام والنيتش المتخصص.',
    frenchDescription: 'Extrayez des hashtags performants équilibrés entre niche et portée globale.',
    iconName: 'Hash'
  },
  {
    id: 'content-calendar',
    title: 'Weekly Content Calendar Planner',
    arabicTitle: 'مخطط جدول النشر الأسبوعي',
    frenchTitle: 'Planificateur de Calendrier Éditorial',
    description: 'Organize your weekly publishing schedule across Shorts, long videos, and carousels.',
    arabicDescription: 'تنظيم مواعيد نشرك الأسبوعية وتوزيع المحتوى بين التثقيف والترفيه والمبيعات.',
    frenchDescription: 'Planifiez vos publications de la semaine entre vidéos courtes, longues et carrousels.',
    iconName: 'Calendar'
  }
];
