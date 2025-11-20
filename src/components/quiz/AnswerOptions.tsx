import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface AnswerOptionsProps {
  answers: string[];
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
  disabled?: boolean;
}

export function AnswerOptions({ answers, selectedAnswer, onAnswerSelect, disabled = false }: AnswerOptionsProps) {
  return (
    <RadioGroup value={selectedAnswer} onValueChange={onAnswerSelect}>
      <div className="space-y-3">
        {answers.map((answer, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 border-2 rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
            onClick={() => !disabled && onAnswerSelect(answer)}
          >
            <RadioGroupItem value={answer} id={`answer-${index}`} disabled={disabled} />
            <Label
              htmlFor={`answer-${index}`}
              className="flex-1 cursor-pointer text-base"
            >
              {answer}
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}

