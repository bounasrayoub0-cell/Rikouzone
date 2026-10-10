export type ChallengeCategory = 'daily' | 'weekly';
export type ChallengeType = 'quiz' | 'exercise' | 'lesson' | 'skill';

export interface ChallengeTask {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  type: ChallengeType;
  domain: string;
  domainAr: string;
  xpReward: number;
  steps?: string[];
  actionLink?: {
    tab: string;
    label: string;
  };
  quizData?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  exerciseData?: {
    instructions: string;
    verificationCriteria: string[];
    sampleAnswer?: string;
    submissionHint?: string;
  };
}

export interface BadgeItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  iconName: string;
  requiredCondition: string;
  targetValue: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  xpBonus: number;
}

export interface XpHistoryEntry {
  id: string;
  title: string;
  xp: number;
  date: string;
  time?: string;
  type: 'daily' | 'weekly' | 'quiz' | 'exercise' | 'badge' | 'streak' | 'lesson' | 'skill';
}

export interface ChallengeUserState {
  totalXp: number;
  completedChallengeIds: string[]; // Set of completed challenge IDs across all time
  completedDailyDates: Record<string, string[]>; // { "2026-10-10": ["daily-quiz-1", "daily-exercise-1"] }
  completedWeeklyKeys: Record<string, string[]>; // { "2026-W41": ["weekly-project-sprint"] }
  streakCount: number;
  lastActiveDate: string; // YYYY-MM-DD
  unlockedBadgeIds: string[];
  history: XpHistoryEntry[];
}
