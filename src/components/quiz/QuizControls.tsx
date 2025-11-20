import { Button } from '@/components/ui/button';

interface QuizControlsProps {
  showFeedback: boolean;
  selectedAnswer: string;
  isLastQuestion: boolean;
  onSubmit: () => void;
  onNext: () => void;
}

export function QuizControls({ 
  showFeedback, 
  selectedAnswer, 
  isLastQuestion, 
  onSubmit, 
  onNext 
}: QuizControlsProps) {
  return (
    <div className="flex gap-3">
      {!showFeedback ? (
        <Button
          onClick={onSubmit}
          disabled={!selectedAnswer}
          className="flex-1 h-12 text-lg font-semibold"
        >
          Submit Answer
        </Button>
      ) : (
        <Button
          onClick={onNext}
          className="flex-1 h-12 text-lg font-semibold"
        >
          {isLastQuestion ? 'View Results' : 'Next Question'}
        </Button>
      )}
    </div>
  );
}

