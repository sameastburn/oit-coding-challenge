import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface SummaryControlsProps {
  onReplay: () => void;
}

export function SummaryControls({ onReplay }: SummaryControlsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <Button
        onClick={onReplay}
        className="flex-1 h-12 text-lg font-semibold"
        size="lg"
      >
        <RotateCcw className="mr-2 h-5 w-5" />
        Play Again
      </Button>
    </div>
  );
}

