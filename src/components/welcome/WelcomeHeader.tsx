import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function WelcomeHeader() {
  return (
    <CardHeader className="text-center space-y-2">
      <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Trivia Trek
      </CardTitle>
      <CardDescription className="text-lg">
        Test your knowledge with questions from around the world!
      </CardDescription>
    </CardHeader>
  );
}

