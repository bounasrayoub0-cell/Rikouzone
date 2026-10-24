/**
 * RikouZone Educational Lesson System Types
 * 
 * Defines standard data structures for comprehensive, beginner-friendly,
 * visual, and interactive lessons across all 35 educational domains.
 */

export interface RikouGlossaryTerm {
  term: string;
  arabicName?: string;
  phonetic?: string;
  definition: string;
  example?: string;
}

export type ExerciseType = 'order_steps' | 'decision_scenario' | 'interactive_builder';

export interface OrderStepsExerciseData {
  items: {
    id: string;
    correctOrder: number;
    text: string;
    hint?: string;
  }[];
}

export interface DecisionScenarioExerciseData {
  scenario: string;
  options: {
    id: string;
    text: string;
    isOptimal: boolean;
    feedback: string;
    score: number;
  }[];
}

export interface InteractiveBuilderExerciseData {
  fields: {
    id: string;
    label: string;
    type: 'select' | 'slider';
    options?: { value: string | number; label: string; multiplier?: number }[];
    min?: number;
    max?: number;
    step?: number;
    defaultValue: string | number;
  }[];
  calculationFormula: string;
  resultLabel: string;
  unit: string;
}

export interface RikouInteractiveExercise {
  type: ExerciseType;
  title: string;
  instruction: string;
  data: OrderStepsExerciseData | DecisionScenarioExerciseData | InteractiveBuilderExerciseData;
  solutionExplanation: string;
  xpReward: number;
}

export interface RikouLessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  xpReward: number;
}

export type VisualAidType = 
  | 'funnel' 
  | 'flowchart' 
  | 'flywheel' 
  | 'hierarchy' 
  | 'architecture' 
  | 'comparison'
  | 'matrix';

export interface VisualAidNode {
  id: string;
  title: string;
  desc: string;
  icon?: string;
  accent?: 'amber' | 'emerald' | 'blue' | 'purple' | 'orange' | 'cyan' | 'rose';
  badge?: string;
}

export interface RikouVisualSpec {
  type: VisualAidType;
  title: string;
  subtitle: string;
  badgeLabel: string;
  nodes: VisualAidNode[];
  connections?: { from: string; to: string; label?: string }[];
  metrics?: { label: string; value: string; hint?: string }[];
  proTip?: string;
}

export interface RealWorldCaseStudy {
  title: string;
  scenario: string;
  stepByStep: string[];
  outcome: string;
  numbersHighlight?: string;
}

export interface PracticalAssignment {
  title: string;
  estimatedMinutes: number;
  instruction: string;
  deliverable: string;
  checklist: string[];
  xpReward: number;
}

export interface UnifiedRikouLesson {
  id: string;
  trackId: string;
  trackTitleAr: string;
  trackCategory: string;
  number: number;
  title: string;
  objective: string;
  whyItMatters: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  summary: string;
  keyTakeaways: string[];
  breakdownSteps: {
    stepNumber: number;
    title: string;
    explanation: string;
    actionTip?: string;
    icon?: string;
  }[];
  glossary?: RikouGlossaryTerm[];
  visualAid: RikouVisualSpec;
  realWorldCase: RealWorldCaseStudy;
  interactiveExercise: RikouInteractiveExercise;
  quiz: RikouLessonQuiz;
  practicalAssignment: PracticalAssignment;
  commonMistakeWarning?: string;
  faq?: { question: string; answer: string }[];
  specialFeature?: {
    type: 'code' | 'design_comparison' | 'marketing_funnel' | 'financial_table' | 'workflow';
    title: string;
    content?: string;
    language?: string;
    beforeAfter?: { before: string; after: string; note: string };
    table?: { headers: string[]; rows: string[][] };
  };
}
