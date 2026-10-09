export interface TemplateLesson {
  id: string;
  title: string;
  subtitle: string;
  moduleCategory: 
    | 'market-understanding' 
    | 'idea-selection' 
    | 'notion-mastery' 
    | 'canva-mastery' 
    | 'ready-products' 
    | 'pricing-platforms' 
    | 'marketing-sales' 
    | 'store-expansion'
    | 'licensing-rights';
  readTime: string;
  badge: string;
  learningObjective: string;
  simplifiedExplanation: string;
  practicalExample: string;
  numberedExecutionSteps: string[];
  keyTips: string[];
  commonMistakes: string[];
  practicalExercise: {
    title: string;
    instructions: string;
    expectedDeliverable: string;
  };
  summary: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface TemplateIdeaEvaluation {
  id: string;
  category: 'Notion' | 'Canva';
  name: string;
  targetAudience: string;
  coreProblem: string;
  solutionAndFeatures: string;
  whyHighDemand: string;
  suggestedPrice: string;
  difficultyForBeginner: 'سهل' | 'متوسط';
}

export interface TemplatePlatformDetails {
  id: string;
  name: string;
  moroccoSupportStatus: string;
  payoutMethods: string[];
  feesAndCommissions: string;
  customerPaymentMethods: string[];
  termsForNotionCanva: string;
  bestUse: string;
  pros: string[];
  cons: string[];
}
