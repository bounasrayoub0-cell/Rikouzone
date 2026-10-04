export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface SmmQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SmmLesson {
  id: string;
  moduleId: string;
  number: number;
  title: string;
  level: DifficultyLevel;
  duration: string;
  summary: string;
  explanation: string[];
  practicalExample: {
    title: string;
    scenario: string;
    actionTaken: string;
    result: string;
  };
  implementationSteps: string[];
  challenge: {
    title: string;
    task: string;
    deliverable: string;
  };
  template: {
    title: string;
    description: string;
    content: string;
  };
  quiz: SmmQuiz;
}

export interface SmmModule {
  id: string;
  number: number;
  title: string;
  arabicTitle: string;
  level: DifficultyLevel;
  iconName: string;
  description: string;
  lessons: SmmLesson[];
}

export interface RealClientProject {
  id: string;
  number: number;
  clientName: string;
  industry: string;
  nicheArabic: string;
  budget: string;
  timeline: string;
  clientBrief: {
    overview: string;
    goals: string[];
    challenges: string[];
    targetAudience: string;
  };
  audit: {
    score: string;
    issuesFound: string[];
    quickWins: string[];
  };
  strategy: {
    coreObjective: string;
    contentPillars: { pillar: string; percentage: string; focus: string }[];
    toneOfVoice: string;
    postingCadence: string;
  };
  contentCalendarSample: {
    day: string;
    platform: string;
    format: string;
    idea: string;
    hook: string;
    caption: string;
    cta: string;
  }[];
  contentIdeas: {
    format: string;
    title: string;
    hook: string;
    scriptOrOutline: string;
  }[];
  publishingPlan: {
    bestTimes: string[];
    frequencyPerWeek: string;
    hashtagStrategy: string;
  };
  analyticsTargets: {
    kpi: string;
    current: string;
    target: string;
  }[];
  clientReportSummary: string;
}

export interface ContentCalendarItem {
  id: string;
  day: string;
  platform: 'Instagram' | 'TikTok' | 'Facebook' | 'LinkedIn' | 'YouTube' | 'Pinterest';
  contentType: 'Reel / Short' | 'Carousel' | 'Static Post' | 'Story' | 'Thread / Article';
  idea: string;
  hook: string;
  caption: string;
  cta: string;
  status: 'Draft' | 'Ready' | 'Scheduled' | 'Published';
}
