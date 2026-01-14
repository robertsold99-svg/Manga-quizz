
import React, { useState } from 'react';
import { Grade } from '../types';

interface Props {
  onStart: (topic: string, grade: Grade) => void;
  isLoading: boolean;
}

const TopicSelector: React.FC<Props> = ({ onStart, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState<Grade>('High School');

  const generalSuggestions = ['Ancient History', 'Quantum Physics', 'Japanese Cuisine'];
  const mangaSuggestions = [
    'One Piece', 
    'Naruto', 
    'One Punch Man', 
    'Jujutsu Kaisen', 
    'Demon Slayer', 
    'Attack on Titan', 
    'Spy x Family', 
    'Chainsaw Man'
  ];
  const grades: Grade[] = ['Elementary', 'Middle School', 'High School', 'University'];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-xl max-w-lg w-full">
      <div className="text-6xl mb-4">📖</div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2 font-fun text-center">Manga Quiz & Clicker</h1>
      <p className="text-slate-500 text-center mb-6">
        Select your grade and a manga to start the ultimate knowledge challenge!
      </p>

      <div className="w-full space-y-6">
        {/* Grade Selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Target Difficulty (Your Grade)</label>
          <div className="grid grid-cols-2 gap-2">
            {grades.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`py-2 px-3 rounded-xl border-2 transition-all text-sm font-medium ${
                  grade === g
                    ? 'border-red-500 bg-red-50 text-red-600 shadow-sm'
                    : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                }`}
                disabled={isLoading}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-700">Enter a Topic or Manga</label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. One Punch Man..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <i className="fas fa-spinner fa-spin text-red-500"></i>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 w-full mb-1">Manga Quiz 🔥</span>
              {mangaSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setTopic(s)}
                  className="px-3 py-1 bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-100 rounded-full text-xs font-medium transition-colors"
                  disabled={isLoading}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 w-full mb-1">General Topics</span>
              {generalSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setTopic(s)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-medium transition-colors"
                  disabled={isLoading}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => onStart(topic, grade)}
          disabled={!topic || isLoading}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
            !topic || isLoading 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-red-500 hover:bg-red-600 active:scale-95'
          }`}
        >
          {isLoading ? 'Crafting Challenge...' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
};

export default TopicSelector;
