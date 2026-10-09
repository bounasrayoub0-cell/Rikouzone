export interface AiContentLesson {
  id: string;
  title: string;
  subtitle: string;
  moduleCategory: 'intro' | 'basics' | 'articles' | 'scripts' | 'marketing' | 'prompt-engineering' | 'human-editing' | 'tools' | 'monetization' | 'capstone';
  readTime: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  overview: string;
  keyPoints: string[];
  detailedContent: {
    heading: string;
    paragraphs: string[];
    bulletPoints?: string[];
    calloutBox?: {
      title: string;
      text: string;
      type: 'tip' | 'warning' | 'info';
    };
  }[];
  practicalExample: {
    title: string;
    scenario: string;
    inputPrompt?: string;
    rawAiOutput?: string;
    critique?: string;
    humanPolishedOutput: string;
    whyItWorks: string;
  };
  stepByStepAction: {
    step: number;
    title: string;
    action: string;
    proTip: string;
  }[];
  importantTips: string[];
  mistakesToAvoid: string[];
  summary: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface AiContentToolItem {
  id: string;
  name: string;
  category: 'generation' | 'editing' | 'seo' | 'research' | 'workflow';
  isFreeOrFreemium: boolean;
  costLabel: string;
  bestFor: string;
  description: string;
  pros: string[];
  freeTierDetails: string;
  recommendedWorkflow: string;
}

export interface AiMonetizationService {
  id: string;
  serviceTitle: string;
  whatYouOffer: string;
  targetClient: string;
  clientNeeds: string;
  howToStart: string[];
  howToScaleOverTime: string[];
  starterPriceRange: string;
  deliverablesExample: string;
}

export interface AiContentPromptComparison {
  title: string;
  goal: string;
  weakPrompt: string;
  weakResult: string;
  weakCritique: string;
  proPrompt: string;
  proResult: string;
  proAdvantages: string[];
}

export interface CapstoneStep {
  stepNumber: number;
  stepTitle: string;
  objective: string;
  inputDescription: string;
  actionGuidance: string;
  sampleInput: string;
  sampleOutput: string;
  qualityChecklist: string[];
}
