import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface RankInfo {
  rank: string;
  message: string;
  color: string;
}

interface ScoreCardProps {
  score: number;
  totalQuestions: number;
  percentage: number;
  rankInfo: RankInfo;
}

export function ScoreCard({ score, totalQuestions, percentage, rankInfo }: ScoreCardProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-8 text-center space-y-4">
      <div className="space-y-2">
        <div className="text-6xl font-bold">{score}/{totalQuestions}</div>
        <div className="text-2xl font-semibold">{percentage}%</div>
      </div>
      
      <Separator className="bg-white/20" />
      
      <div className="space-y-2">
        <Badge variant="secondary" className={`text-xl px-6 py-2 ${rankInfo.color} bg-white dark:bg-gray-800`}>
          {rankInfo.rank}
        </Badge>
        <p className="text-lg">{rankInfo.message}</p>
      </div>
    </div>
  );
}

