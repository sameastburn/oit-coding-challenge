import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function SummaryHeader() {
  return (
    <CardHeader className="text-center space-y-4">
      <CardTitle className="text-4xl font-bold">
        Game Complete!
      </CardTitle>
      
      <CardDescription className="text-lg">
        Here's how you performed
      </CardDescription>
    </CardHeader>
  );
}

