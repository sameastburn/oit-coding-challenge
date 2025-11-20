import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { GameSettings } from '@/types/trivia';
import { useTriviaQuestions } from '@/hooks/useTrivia';
import { useQuizGame } from '@/hooks/useQuizGame';
import { QuizHeader } from '@/components/quiz/QuizHeader';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuizTimer } from '@/components/quiz/QuizTimer';
import { QuestionDisplay } from '@/components/quiz/QuestionDisplay';
import { AnswerOptions } from '@/components/quiz/AnswerOptions';
import { AnswerFeedback } from '@/components/quiz/AnswerFeedback';
import { QuizControls } from '@/components/quiz/QuizControls';
import { QuizLoadingState } from '@/components/quiz/QuizLoadingState';
import { QuizErrorState } from '@/components/quiz/QuizErrorState';

interface QuizGameProps {
  settings: GameSettings;
  onGameComplete: (score: number, answers: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>) => void;
}

export function QuizGame({ settings, onGameComplete }: QuizGameProps) {
  const { questions, loading, error, refetch } = useTriviaQuestions(
    10,
    settings.categoryId,
    settings.difficulty,
    true
  );

  const {
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
  } = useQuizGame(questions);

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const finalAnswers = [
        ...answers,
        {
          question: currentQuestion!.question,
          userAnswer: selectedAnswer || 'No answer',
          correctAnswer: currentQuestion!.correct_answer,
          isCorrect,
        },
      ];
      
      onGameComplete(score + (isCorrect ? 1 : 0), finalAnswers);
    } else {
      nextQuestion();
    }
  };

  if (loading) {
    return <QuizLoadingState />;
  }

  if (error) {
    return <QuizErrorState error={error} onRetry={refetch} />;
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl">
        <CardHeader>
          <QuizHeader 
            categoryName={settings.categoryName}
            difficulty={settings.difficulty}
          />
          
          <QuizProgress 
            currentQuestion={answers.length + 1}
            totalQuestions={questions.length}
            score={score}
            progress={progress}
          />

          {!showFeedback && <QuizTimer timeLeft={timeLeft} />}

          <QuestionDisplay question={currentQuestion.question} />
        </CardHeader>

        <CardContent className="space-y-6">
          {showFeedback ? (
            <AnswerFeedback 
              isCorrect={isCorrect}
              correctAnswer={!isCorrect ? currentQuestion.correct_answer : undefined}
            />
          ) : (
            <AnswerOptions 
              answers={shuffledAnswers}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={setSelectedAnswer}
              disabled={showFeedback}
            />
          )}

          <QuizControls 
            showFeedback={showFeedback}
            selectedAnswer={selectedAnswer}
            isLastQuestion={isLastQuestion}
            onSubmit={submitAnswer}
            onNext={handleNextQuestion}
          />
        </CardContent>
      </Card>
    </div>
  );
}
