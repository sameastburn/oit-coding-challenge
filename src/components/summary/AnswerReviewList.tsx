import { AnswerReviewItem } from './AnswerReviewItem';

interface Answer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface AnswerReviewListProps {
  answers: Answer[];
}

export function AnswerReviewList({ answers }: AnswerReviewListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Answer Review</h3>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {answers.map((answer, index) => (
          <AnswerReviewItem
            key={index}
            questionNumber={index + 1}
            question={answer.question}
            userAnswer={answer.userAnswer}
            correctAnswer={answer.correctAnswer}
            isCorrect={answer.isCorrect}
          />
        ))}
      </div>
    </div>
  );
}

