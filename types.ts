
export type Language = 'id' | 'en';

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface BugReport {
  id: string;
  repository: string;
  issue: string;
  detectedAt: string;
  status: 'Pending' | 'Analyzing' | 'Fixing' | 'Completed' | 'Failed';
  riskLevel?: RiskLevel;
}

export interface AnalysisResult {
  rootCause: string;
  technicalSolution: string;
  fixedCode: string;
  riskAssessment: string;
  impact: string;
  riskLevel: RiskLevel;
}

export interface TranslationSchema {
  tagline: string;
  description: string;
  features: string;
  dashboard: string;
  repoHealth: string;
  recentActivity: string;
  analyzeIssue: string;
  fixCode: string;
  pullRequests: string;
  problemStatement: string;
  solution: string;
  howItWorks: string;
  architecture: string;
  loading: string;
  enterApiKey: string;
  placeholderCode: string;
  placeholderIssue: string;
  runAnalysis: string;
  risk: string;
}
