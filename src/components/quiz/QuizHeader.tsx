import { Badge } from '@/components/ui/badge';

interface QuizHeaderProps {
  categoryName: string;
  difficulty: string;
}

export function QuizHeader({ categoryName, difficulty }: QuizHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <Badge variant="secondary" className="text-sm">
        {categoryName}
      </Badge>
      <Badge variant="outline" className="text-sm capitalize">
        {difficulty}
      </Badge>
    </div>
  );
}

