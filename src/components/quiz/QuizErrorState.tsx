import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface QuizErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function QuizErrorState({ error, onRetry }: QuizErrorStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="py-8">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={onRetry} className="w-full mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

