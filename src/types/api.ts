// API Request Types
export interface CorrectionRequest {
  question: string;
  answer: string;
  wordCount?: string;
}

export interface GenerationRequest {
  genre: string;
  level: string;
  wordCount: string;
}

// Grammar Correction Types
export interface GrammarCorrection {
  original: string;
  corrected: string;
  reason: string;
  category: "grammar" | "spelling" | "expression";
}

export interface GrammarResponse {
  corrections: GrammarCorrection[];
  hasErrors: boolean;
}

// Scoring Types
export interface ScoringResponse {
  score: number;
  breakdown: {
    grammar: number;
    content: number;
    structure: number;
  };
  feedback: string;
}

// Logicality Types
export interface LogicalityResponse {
  isLogical: boolean;
  issues: string[];
  suggestions: string[];
}

// Example Types
export interface ExampleResponse {
  example: string;
  wordCount: number;
  keyPoints: string[];
}

// Generation Types
export interface GeneratedQuestion {
  id: string;
  question: string;
  questionWordCount: number;
  genre: string;
  level: string;
  suggestedWordCount: string;
}

export interface GenerationResponse {
  questions: GeneratedQuestion[];
}

// Error Types
export interface APIErrorResponse {
  error: string;
  statusCode: number;
  code?: string;
}