export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  topic: string;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: Record<number, number>;
  quizCompleted: boolean;
}

export interface Resource {
  id: number;
  title: string;
  type: 'video' | 'article' | 'course';
  url: string;
  description: string;
}