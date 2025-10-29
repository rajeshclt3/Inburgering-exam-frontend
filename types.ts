
export interface PracticeQuestion {
  id: number;
  type: 'email' | 'short_answer' | 'form';
  prompt: string;
  context?: string;
}

export interface Correction {
  original: string;
  corrected: string;
  reason: string;
}

export interface Feedback {
  evaluation: 'correct' | 'minor_errors' | 'major_errors' | 'off_topic';
  explanation: string;
  corrections: Correction[];
  suggestedAnswer: string;
}
