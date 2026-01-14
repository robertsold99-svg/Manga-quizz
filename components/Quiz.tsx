
import React, { useState } from 'react';
import { QuizData } from '../types';

interface Props {
  data: QuizData;
  onComplete: () => void;
}

const Quiz: React.FC<Props> = ({ data, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = data.questions[currentIndex];
  const progress = ((currentIndex) / data.questions.length) * 100;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < data.questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-8 overflow-hidden relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Topic: {data.topic}</h2>
        <span className="text-sm font-semibold text-red-500 bg-red-50 px-3 py-1 rounded-full">
          Q {currentIndex + 1} / {data.questions.length}
        </span>
      </div>

      <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-red-500 h-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-slate-700 leading-tight">
          {currentQuestion.text}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8">
        {currentQuestion.options.map((option, idx) => {
          let bgColor = 'bg-slate-50 border-slate-200 hover:border-red-300';
          if (isAnswered) {
            if (idx === currentQuestion.correctAnswerIndex) {
              bgColor = 'bg-green-100 border-green-500 text-green-800';
            } else if (idx === selectedOption) {
              bgColor = 'bg-red-100 border-red-500 text-red-800';
            } else {
              bgColor = 'bg-slate-50 border-slate-200 opacity-50';
            }
          } else if (selectedOption === idx) {
            bgColor = 'bg-red-50 border-red-500 ring-2 ring-red-500 ring-opacity-50';
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={`p-4 text-left border-2 rounded-2xl transition-all duration-200 font-medium ${bgColor}`}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm mr-4 text-slate-500 font-bold border">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${
            !isAnswered ? 'bg-slate-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 active:scale-95'
          }`}
        >
          {currentIndex === data.questions.length - 1 ? 'Unlock Game' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
