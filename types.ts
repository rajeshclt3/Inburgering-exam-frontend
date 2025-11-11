
export interface PracticeQuestion {
  id: number;
  type: 'email' | 'short_answer' | 'form' | 'note' | 'extra';
  prompt: string;
  context?: string;
  category: string;
  sampleAnswer: string;
}

export interface Correction {
  original: string;
  corrected: string;
  reason: string;
}

export interface Feedback {
  evaluation: string;
  highlighted_text: string;
  explanation: string;
  corrections: Correction[];
  correctedAnswer: string;
  idealAnswer: string;
  feedback_in_english: string;
}
