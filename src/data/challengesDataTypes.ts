export interface ChallengeTask {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly';
  type: 'quiz' | 'exercise' | 'lesson' | 'skill';
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
  isUnlocked: boolean;
  unlockedAt?: string;
  xpBonus: number;
}

export interface XpHistoryEntry {
  id: string;
  title: string;
  xp: number;
  date: string;
  type: 'daily' | 'weekly' | 'quiz' | 'exercise' | 'badge' | 'streak';
}

export interface ChallengeUserState {
  totalXp: number;
  completedChallengeIds: string[]; // Set of completed challenge IDs across all time
  completedDailyDates: Record<string, string[]>; // { "2026-10-09": ["daily-quiz-1", "daily-exercise-1"] }
  completedWeeklyKeys: Record<string, string[]>; // { "2026-W41": ["weekly-quiz-master"] }
  streakCount: number;
  lastActiveDate: string; // YYYY-MM-DD
  unlockedBadgeIds: string[];
  history: XpHistoryEntry[];
}
