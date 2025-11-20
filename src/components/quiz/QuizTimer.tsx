import { Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface QuizTimerProps {
  timeLeft: number;
  totalTime?: number;
}

export function QuizTimer({ timeLeft, totalTime = 30 }: QuizTimerProps) {
  const percentage = (timeLeft / totalTime) * 100;
  const isLowTime = timeLeft <= 10;
  const isCriticalTime = timeLeft <= 5;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className={`h-4 w-4 ${isCriticalTime ? 'text-red-600 animate-pulse' : isLowTime ? 'text-orange-600' : 'text-muted-foreground'}`} />
          <span className={`text-sm font-semibold ${isCriticalTime ? 'text-red-600' : isLowTime ? 'text-orange-600' : 'text-muted-foreground'}`}>
            Time: {timeLeft}s
          </span>
        </div>
      </div>
      <Progress 
        value={percentage} 
        className={`h-1.5 ${isCriticalTime ? 'bg-red-100 dark:bg-red-950' : isLowTime ? 'bg-orange-100 dark:bg-orange-950' : ''}`}
      />
    </div>
  );
}

