import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="ml-2 text-muted-foreground">Loading categories...</span>
    </div>
  );
}

