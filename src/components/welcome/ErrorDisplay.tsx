import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      <Button onClick={onRetry} variant="outline" className="w-full">
        Retry
      </Button>
    </div>
  );
}

