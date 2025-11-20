import { CardTitle, CardDescription } from '@/components/ui/card';

interface QuestionDisplayProps {
  question: string;
}

export function QuestionDisplay({ question }: QuestionDisplayProps) {
  return (
    <>
      <CardTitle className="text-2xl mt-6">
        {question}
      </CardTitle>
      <CardDescription>
        Select the correct answer
      </CardDescription>
    </>
  );
}

