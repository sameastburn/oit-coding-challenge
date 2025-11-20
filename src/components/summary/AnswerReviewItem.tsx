import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';

interface AnswerReviewItemProps {
  questionNumber: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export function AnswerReviewItem({ 
  questionNumber, 
  question, 
  userAnswer, 
  correctAnswer, 
  isCorrect 
}: AnswerReviewItemProps) {
  return (
    <Card className={`border-2 ${isCorrect ? 'border-green-200 dark:border-green-900' : 'border-red-200 dark:border-red-900'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            {isCorrect ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <p className="font-semibold text-sm">
              Question {questionNumber}: {question}
            </p>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-muted-foreground">Your answer:</span>{' '}
                <span className={isCorrect ? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-600 dark:text-red-400 font-medium'}>
                  {userAnswer}
                </span>
              </p>
              {!isCorrect && (
                <p>
                  <span className="text-muted-foreground">Correct answer:</span>{' '}
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    {correctAnswer}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

