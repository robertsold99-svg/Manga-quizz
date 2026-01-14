
export type Grade = 'Elementary' | 'Middle School' | 'High School' | 'University';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizData {
  topic: string;
  questions: Question[];
  grade: Grade;
}

export enum GameState {
  SETUP = 'SETUP',
  QUIZ = 'QUIZ',
  GAME = 'GAME',
  FINISHED = 'FINISHED'
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  baseCost: number;
  multiplier: number;
  type: 'click' | 'auto';
  value: number;
  icon: string;
  owned: number;
}

export interface ClickParticle {
  id: number;
  x: number;
  y: number;
  value: number;
}
