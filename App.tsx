
import React, { useState, useEffect, useRef } from 'react';
import { GameState, QuizData, Grade } from './types';
import { generateQuiz } from './services/geminiService';
import TopicSelector from './components/TopicSelector';
import Quiz from './components/Quiz';
import SushiClicker from './components/SushiClicker';
import { GAME_DURATION_MS } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SETUP);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION_MS);
  
  const timerRef = useRef<number | null>(null);

  const startQuiz = async (topic: string, grade: Grade) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateQuiz(topic, grade);
      setQuizData(data);
      setGameState(GameState.QUIZ);
    } catch (err) {
      console.error(err);
      setError("Failed to generate quiz. AI might be overstuffed with sushi! Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = () => {
    setGameState(GameState.GAME);
    setTimeLeft(GAME_DURATION_MS);
  };

  const restart = () => {
    setGameState(GameState.SETUP);
    setQuizData(null);
    setTimeLeft(GAME_DURATION_MS);
    if (timerRef.current) window.clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (gameState === GameState.GAME) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1000) {
            setGameState(GameState.FINISHED);
            if (timerRef.current) window.clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [gameState]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#ef4444_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        {gameState === GameState.SETUP && (
          <div className="w-full flex flex-col items-center">
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-xl border border-red-200 flex items-center gap-2">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}
            <TopicSelector onStart={startQuiz} isLoading={loading} />
          </div>
        )}

        {gameState === GameState.QUIZ && quizData && (
          <Quiz data={quizData} onComplete={handleQuizComplete} />
        )}

        {gameState === GameState.GAME && quizData && (
          <SushiClicker 
            topic={quizData.topic} 
            timeLeft={timeLeft} 
            onTimeEnd={() => setGameState(GameState.FINISHED)} 
          />
        )}

        {gameState === GameState.FINISHED && (
          <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-lg w-full">
            <div className="text-8xl mb-6">🏁</div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Time's Up!</h2>
            <p className="text-slate-500 mb-8 text-lg leading-relaxed">
              You've conquered the {quizData?.topic} challenge!
              <br/><span className="font-bold text-red-500">Scholar Rank Achieved!</span>
            </p>
            <button
              onClick={restart}
              className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95"
            >
              Start New Challenge
            </button>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="py-6 text-center text-slate-400 text-xs">
        <p>&copy; 2024 Scholar Clickers &bull; Themed games for every manga fan</p>
      </footer>
    </div>
  );
};

export default App;
