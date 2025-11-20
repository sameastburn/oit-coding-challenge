import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  progress: number;
}

export function QuizProgress({ currentQuestion, totalQuestions, score, progress }: QuizProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <span>Score: {score}/{totalQuestions}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}

