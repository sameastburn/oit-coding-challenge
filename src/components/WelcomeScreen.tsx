import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Difficulty, GameSettings } from '@/types/trivia';
import { useTriviaCategories } from '@/hooks/useTrivia';
import { WelcomeHeader } from '@/components/welcome/WelcomeHeader';
import { DifficultySelector } from '@/components/welcome/DifficultySelector';
import { CategorySelector } from '@/components/welcome/CategorySelector';
import { GameRules } from '@/components/welcome/GameRules';
import { LoadingState } from '@/components/welcome/LoadingState';
import { ErrorDisplay } from '@/components/welcome/ErrorDisplay';

interface WelcomeScreenProps {
  onStartGame: (settings: GameSettings) => void;
}

export function WelcomeScreen({ onStartGame }: WelcomeScreenProps) {
  const { categories, loading, error, refetch } = useTriviaCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');

  if (categories.length > 0 && !selectedCategory) {
    setSelectedCategory(categories[0].id.toString());
  }

  const handleStartGame = () => {
    if (!selectedCategory) return;

    const category = categories.find(cat => cat.id.toString() === selectedCategory);
    if (!category) return;

    onStartGame({
      difficulty: selectedDifficulty,
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <WelcomeHeader />

        <CardContent className="space-y-6">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorDisplay error={error} onRetry={refetch} />
          ) : (
            <>
              <div className="space-y-4">
                <DifficultySelector 
                  value={selectedDifficulty} 
                  onChange={setSelectedDifficulty} 
                />
                <CategorySelector 
                  categories={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                />
              </div>

              <GameRules />

              <Button 
                onClick={handleStartGame} 
                className="w-full h-12 text-lg font-semibold"
                disabled={!selectedCategory}
              >
                Start Game
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
