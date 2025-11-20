export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TriviaCategory {
  id: number;
  name: string;
}

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaAPIResponse {
  response_code: number;
  results: TriviaQuestion[];
}

export interface GameSettings {
  difficulty: Difficulty;
  categoryId: number;
  categoryName: string;
}

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  answers: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

export type GameScreen = 'welcome' | 'playing' | 'summary';

