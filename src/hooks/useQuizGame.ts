import { useState, useCallback, useMemo, useEffect } from 'react';
import type { TriviaQuestion } from '@/types/trivia';

export interface QuizAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface UseQuizGameReturn {
  currentQuestionIndex: number;
  currentQuestion: TriviaQuestion | null;
  shuffledAnswers: string[];
  selectedAnswer: string;
  showFeedback: boolean;
  score: number;
  answers: QuizAnswer[];
  isLastQuestion: boolean;
  progress: number;
  isCorrect: boolean;
  timeLeft: number;
  setSelectedAnswer: (answer: string) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  resetGame: () => void;
}

const QUESTION_TIME_LIMIT = 30;

export function useQuizGame(questions: TriviaQuestion[]): UseQuizGameReturn {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [shouldAutoSubmit, setShouldAutoSubmit] = useState(false);

  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const currentQuestion = useMemo(() => {
    if (questions.length === 0 || currentQuestionIndex >= questions.length) {
      return null;
    }
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    if (currentQuestion) {
      const allAnswers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      setShuffledAnswers(shuffleArray(allAnswers));
      setTimeLeft(QUESTION_TIME_LIMIT);
      setShouldAutoSubmit(false);
    }
  }, [currentQuestion, shuffleArray]);

  useEffect(() => {
    if (showFeedback || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShouldAutoSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showFeedback, currentQuestion]);

  const isCorrect = useMemo(() => {
    if (!currentQuestion || !selectedAnswer) return false;
    return selectedAnswer === currentQuestion.correct_answer;
  }, [currentQuestion, selectedAnswer]);

  const progress = useMemo(() => {
    if (questions.length === 0) return 0;
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  }, [currentQuestionIndex, questions.length]);

  const isLastQuestion = useMemo(() => {
    return currentQuestionIndex >= questions.length - 1;
  }, [currentQuestionIndex, questions.length]);

  const submitAnswer = useCallback(() => {
    if (!currentQuestion) return;
    
    const newAnswer: QuizAnswer = {
      question: currentQuestion.question,
      userAnswer: selectedAnswer || 'No answer',
      correctAnswer: currentQuestion.correct_answer,
      isCorrect: selectedAnswer === currentQuestion.correct_answer,
    };

    setAnswers((prev) => [...prev, newAnswer]);
    
    if (newAnswer.isCorrect) {
      setScore((prev) => prev + 1);
    }

    setShowFeedback(true);
    setShouldAutoSubmit(false);
  }, [selectedAnswer, currentQuestion]);

  useEffect(() => {
    if (shouldAutoSubmit && !showFeedback) {
      submitAnswer();
    }
  }, [shouldAutoSubmit, showFeedback, submitAnswer]);

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswer('');
    setShowFeedback(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
  }, []);

  const resetGame = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setScore(0);
    setAnswers([]);
    setShuffledAnswers([]);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setShouldAutoSubmit(false);
  }, []);

  return {
    currentQuestionIndex,
    currentQuestion,
    shuffledAnswers,
    selectedAnswer,
    showFeedback,
    score,
    answers,
    isLastQuestion,
    progress,
    isCorrect,
    timeLeft,
    setSelectedAnswer,
    submitAnswer,
    nextQuestion,
    resetGame,
  };
}

