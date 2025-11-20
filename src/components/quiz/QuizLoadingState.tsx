import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function QuizLoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-lg text-muted-foreground">Loading your questions...</p>
        </CardContent>
      </Card>
    </div>
  );
}

