import { Card, CardContent } from '@/components/ui/card';
import { SummaryHeader } from '@/components/summary/SummaryHeader';
import { ScoreCard } from '@/components/summary/ScoreCard';
import { AnswerReviewList } from '@/components/summary/AnswerReviewList';
import { SummaryControls } from '@/components/summary/SummaryControls';

interface RankInfo {
  rank: string;
  message: string;
  color: string;
}

interface SummaryScreenProps {
  score: number;
  totalQuestions: number;
  answers: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>;
  onReplay: () => void;
}

function getPerformanceRank(percentage: number): RankInfo {
  if (percentage >= 90) {
    return {
      rank: 'Trivia Master',
      message: 'Outstanding! You\'re a true trivia champion!',
      color: 'text-yellow-600 dark:text-yellow-400',
    };
  } else if (percentage >= 70) {
    return {
      rank: 'Trivia Pro',
      message: 'Great job! You really know your stuff!',
      color: 'text-blue-600 dark:text-blue-400',
    };
  } else if (percentage >= 50) {
    return {
      rank: 'Trivia Enthusiast',
      message: 'Good effort! Keep practicing to improve!',
      color: 'text-green-600 dark:text-green-400',
    };
  } else {
    return {
      rank: 'Trivia Novice',
      message: 'Better luck next time! Practice makes perfect!',
      color: 'text-orange-600 dark:text-orange-400',
    };
  }
}

export function SummaryScreen({ score, totalQuestions, answers, onReplay }: SummaryScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const rankInfo = getPerformanceRank(percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <SummaryHeader />

        <CardContent className="space-y-6">
          <ScoreCard 
            score={score}
            totalQuestions={totalQuestions}
            percentage={percentage}
            rankInfo={rankInfo}
          />

          <AnswerReviewList answers={answers} />

          <SummaryControls onReplay={onReplay} />
        </CardContent>
      </Card>
    </div>
  );
}
