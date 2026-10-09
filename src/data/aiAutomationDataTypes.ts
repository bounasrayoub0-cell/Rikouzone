export interface AaaLesson {
  id: string;
  title: string;
  subtitle: string;
  moduleCategory: 'intro' | 'make' | 'zapier' | 'ai-integration' | 'projects' | 'troubleshooting' | 'monetization' | 'portfolio' | 'capstone';
  readTime: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  learningObjective: string;
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
  realWorldExample: {
    scenarioTitle: string;
    businessContext: string;
    beforeAutomation: string;
    afterAutomation: string;
    toolsUsed: string[];
    workflowSummary: string;
  };
  stepByStepAction: {
    stepNumber: number;
    title: string;
    action: string;
    toolsOrConfig: string;
    proTip: string;
  }[];
  commonMistakesAndFixes: {
    mistake: string;
    whyItHappens: string;
    howToFix: string;
  }[];
  summary: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface AaaSystemProject {
  id: string;
  projectNumber: number;
  title: string;
  shortSummary: string;
  businessProblem: string;
  solutionArchitecture: string;
  toolsRequired: { name: string; role: string; costNote: string }[];
  workflowDiagram: { stepNumber: number; label: string; app: string; eventType: 'trigger' | 'action' | 'filter' | 'router'; description: string }[];
  detailedSetupSteps: { step: number; title: string; instructions: string; verification: string }[];
  testingProcedure: {
    normalCase: string;
    edgeOrFailureCase: string;
    expectedResult: string;
  };
  knownLimitationsAndSafety: string[];
  clientHandoverChecklist: string[];
}

export interface AaaPortfolioProject {
  id: string;
  title: string;
  clientType: string;
  problemStatement: string;
  implementedSolution: string;
  toolsUsed: string[];
  workflowStepsSummary: string[];
  expectedImpact: { metric: string; before: string; after: string };
  anonymizedSampleData: {
    inputSample: string;
    processedSample: string;
    outputSample: string;
  };
  documentationTemplate: string;
}

export interface AaaCapstoneMilestone {
  milestoneNumber: number;
  title: string;
  objective: string;
  guidance: string;
  sampleImplementation: string;
  deliverablesChecklist: string[];
}
