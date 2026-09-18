export type Language = 'ar' | 'en' | 'fr';

export type NavTab = 
  | 'home'
  | 'income'
  | 'creators'
  | 'tools'
  | 'ideas'
  | 'ai'
  | 'profile';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type CostLevel = 'free' | 'low' | 'medium' | 'high';

export interface IncomePath {
  id: string;
  title: string;
  arabicTitle: string;
  frenchTitle: string;
  category: string;
  shortDescription: string;
  arabicShortDescription: string;
  frenchShortDescription: string;
  fullDescription: string;
  arabicFullDescription: string;
  frenchFullDescription: string;
  description?: string;
  arabicDescription?: string;
  frenchDescription?: string;
  difficulty: DifficultyLevel;
  startingCost: CostLevel;
  startingCostAmount: string;
  timeToFirstIncome: string;
  arabicTimeToFirstIncome: string;
  timeToLearn?: string;
  estimatedIncomeRange: string;
  potentialMonthlyIncome?: string;
  requiredSkills: string[];
  arabicRequiredSkills?: string[];
  tools: string[];
  platforms: string[];
  stepByStep: { stepNumber: number; title: string; detail: string }[];
  pros: string[];
  cons: string[];
  realisticWarning: string;
  beginnerFriendly: boolean;
  facelessPossible: boolean;
}

export type IdeaPlatform = 
  | 'TikTok'
  | 'YouTube'
  | 'Instagram'
  | 'Facebook'
  | 'Gaming'
  | 'Free Fire'
  | 'Shorts'
  | 'Reels';

export type IdeaNiche =
  | 'Making Money Online'
  | 'AI'
  | 'Technology'
  | 'Gaming'
  | 'Free Fire'
  | 'Business'
  | 'E-commerce'
  | 'Affiliate Marketing'
  | 'Education'
  | 'Motivation'
  | 'Productivity'
  | 'Finance'
  | 'Lifestyle'
  | 'Travel'
  | 'Food'
  | 'Beauty'
  | 'Tech Reviews'
  | 'Apps'
  | 'Websites'
  | 'Freelancing'
  | 'Content Creation'
  | 'Personal Branding'
  | 'Faceless Content';

export interface ContentIdea {
  id: string;
  title: string;
  arabicTitle: string;
  frenchTitle: string;
  hook: string;
  arabicHook: string;
  frenchHook: string;
  description: string;
  arabicDescription: string;
  frenchDescription: string;
  scriptOutline: string[];
  arabicScriptOutline: string[];
  cta: string;
  arabicCta: string;
  platform: IdeaPlatform;
  niche: IdeaNiche;
  difficulty: DifficultyLevel;
  competition: 'low' | 'medium' | 'high';
  viralPotential: 'high' | 'very_high' | 'explosive';
  format: 'short' | 'long' | 'carousel' | 'stream';
  duration: string;
  facelessPossibility: boolean;
  tags: string[];
}

export interface CalculatorInputField {
  id: string;
  label: string;
  arabicLabel: string;
  frenchLabel: string;
  type: 'number';
  placeholder?: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  helperText?: string;
  arabicHelperText?: string;
}

export interface CalculatorResultField {
  label: string;
  arabicLabel: string;
  frenchLabel: string;
  value: string;
  highlight?: boolean;
  description?: string;
  arabicDescription?: string;
}

export type CalculatorResult = CalculatorResultField;

export interface CalculatorTool {
  id: string;
  title: string;
  arabicTitle: string;
  frenchTitle: string;
  category: 'monetization' | 'metrics' | 'growth' | 'ecommerce' | 'advertising';
  description: string;
  arabicDescription: string;
  frenchDescription: string;
  inputs: CalculatorInputField[];
  calculate: (values: Record<string, number>) => CalculatorResultField[];
}

export interface ContentUtilityTool {
  id: string;
  title: string;
  arabicTitle: string;
  frenchTitle: string;
  description: string;
  arabicDescription: string;
  frenchDescription: string;
  iconName: string;
}

export interface AIToolConfig {
  id: string;
  title: string;
  arabicTitle: string;
  frenchTitle: string;
  description: string;
  arabicDescription: string;
  frenchDescription: string;
  category: string;
  iconName: string;
  placeholder: string;
  arabicPlaceholder: string;
  frenchPlaceholder: string;
  fields: {
    id: string;
    label: string;
    arabicLabel: string;
    type: 'text' | 'textarea' | 'select';
    placeholder?: string;
    options?: { label: string; value: string }[];
  }[];
}

export interface UserProfile {
  name: string;
  niche: string;
  monthlyIncomeTarget: number;
  savedIncomeIds: string[];
  savedIdeaIds: string[];
  savedToolIds: string[];
  createdDate: string;
}
