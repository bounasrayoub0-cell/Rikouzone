export interface DigitalProductLesson {
  id: string;
  title: string;
  subtitle: string;
  moduleCategory: 
    | 'intro' 
    | 'idea-selection' 
    | 'ebook-creation' 
    | 'practical-guides' 
    | 'packaging-design' 
    | 'pricing-platforms' 
    | 'marketing-funnels' 
    | 'scaling-retention';
  readTime: string;
  badge: string;
  overview: string;
  keyConcepts: {
    term: string;
    explanation: string;
    realExample?: string;
  }[];
  detailedSections: {
    heading: string;
    content: string;
    bulletPoints?: string[];
    proTip?: string;
    practicalExercise?: string;
  }[];
  practicalApplication: {
    title: string;
    objective: string;
    steps: string[];
    deliverable: string;
    templateOrPrompt?: string;
  };
  commonMistakesToAvoid: string[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface DigitalProductIdeaValidation {
  id: string;
  category: string;
  productType: 'E-book' | 'Practical Guide' | 'Checklist / Template' | 'Resource Toolkit';
  targetAudience: string;
  coreProblem: string;
  solutionAndPromise: string;
  validationMethod: string;
  suggestedPrice: string;
  freeToolsUsed: string[];
}

export interface DigitalProductPlatformComparison {
  id: string;
  name: string;
  arabicName: string;
  fees: string;
  payoutMethods: string[];
  payoutArabCountries: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  setupEase: 'سهل جداً (10 دقائق)' | 'متوسط (نصف ساعة)' | 'متقدم (يتطلب متجر)';
  linkNote: string;
}

export interface CapstoneProjectStep {
  stepNumber: number;
  title: string;
  description: string;
  deliverable: string;
  actionItems: string[];
  tipsForSuccess: string;
  sampleTemplate?: string;
}
