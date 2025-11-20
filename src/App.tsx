import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { QuizGame } from '@/components/QuizGame';
import { SummaryScreen } from '@/components/SummaryScreen';
import type { GameScreen, GameSettings } from '@/types/trivia';

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('welcome');
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [finalAnswers, setFinalAnswers] = useState<Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>>([]);

  const handleStartGame = (settings: GameSettings) => {
    setGameSettings(settings);
    setCurrentScreen('playing');
  };

  const handleGameComplete = (
    score: number,
    answers: Array<{
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }>
  ) => {
    setFinalScore(score);
    setFinalAnswers(answers);
    setCurrentScreen('summary');
  };

  const handleReplay = () => {
    setCurrentScreen('welcome');
    setGameSettings(null);
    setFinalScore(0);
    setFinalAnswers([]);
  };

  return (
    <>
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStartGame={handleStartGame} />
      )}
      
      {currentScreen === 'playing' && gameSettings && (
        <QuizGame
          settings={gameSettings}
          onGameComplete={handleGameComplete}
        />
      )}
      
      {currentScreen === 'summary' && (
        <SummaryScreen
          score={finalScore}
          totalQuestions={finalAnswers.length}
          answers={finalAnswers}
          onReplay={handleReplay}
        />
      )}
    </>
  );
}

export default App;
