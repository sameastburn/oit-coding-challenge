import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  correctAnswer?: string;
}

export function AnswerFeedback({ isCorrect, correctAnswer }: AnswerFeedbackProps) {
  return (
    <Alert variant={isCorrect ? "default" : "destructive"} className="border-2">
      <div className="flex items-start gap-3">
        {isCorrect ? (
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
        ) : (
          <XCircle className="h-5 w-5 mt-0.5" />
        )}
        <div className="space-y-1 flex-1">
          <AlertDescription className="font-semibold">
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </AlertDescription>
          {!isCorrect && correctAnswer && (
            <AlertDescription>
              The correct answer was: <span className="font-semibold">{correctAnswer}</span>
            </AlertDescription>
          )}
        </div>
      </div>
    </Alert>
  );
}

