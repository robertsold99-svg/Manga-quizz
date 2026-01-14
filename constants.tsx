
import { Upgrade } from './types';

export const GAME_DURATION_MS = 300000; // 5 minutes

export interface Theme {
  name: string;
  currencyIcon: string;
  currencyName: string;
  mainEmojis: string[];
  bgClass: string;
  accentClass: string;
}

export const THEMES: Record<string, Theme> = {
  'One Piece': {
    name: 'One Piece',
    currencyIcon: '🍖',
    currencyName: 'Meat',
    mainEmojis: ['👒', '🏴‍☠️', '🍖', '🍊', '⚔️'],
    bgClass: 'bg-blue-50',
    accentClass: 'text-yellow-600'
  },
  'Naruto': {
    name: 'Naruto',
    currencyIcon: '🍜',
    currencyName: 'Ramen',
    mainEmojis: ['🍥', '🍜', '🍃', '🧿', '🦊'],
    bgClass: 'bg-orange-50',
    accentClass: 'text-orange-600'
  },
  'One Punch Man': {
    name: 'One Punch Man',
    currencyIcon: '👊',
    currencyName: 'Punches',
    mainEmojis: ['👊', '🥚', '🦸‍♂️', '🛒', '💢'],
    bgClass: 'bg-yellow-50',
    accentClass: 'text-red-600'
  },
  'Demon Slayer': {
    name: 'Demon Slayer',
    currencyIcon: '⚔️',
    currencyName: 'Slices',
    mainEmojis: ['⚔️', '👺', '🌊', '🦋', '🐗'],
    bgClass: 'bg-purple-50',
    accentClass: 'text-indigo-600'
  },
  'Chainsaw Man': {
    name: 'Chainsaw Man',
    currencyIcon: '🪚',
    currencyName: 'Rips',
    mainEmojis: ['🪚', '🐶', '🩸', '🚬', '😈'],
    bgClass: 'bg-red-50',
    accentClass: 'text-red-700'
  },
  'Jujutsu Kaisen': {
    name: 'Jujutsu Kaisen',
    currencyIcon: '🧿',
    currencyName: 'Cursed Energy',
    mainEmojis: ['🧿', '🤞', '👹', '🐼', '🕶️'],
    bgClass: 'bg-slate-900',
    accentClass: 'text-blue-400'
  },
  'Attack on Titan': {
    name: 'Attack on Titan',
    currencyIcon: '🧱',
    currencyName: 'Freedom',
    mainEmojis: ['🧱', '🕊️', '⚔️', '🦷', '🔥'],
    bgClass: 'bg-stone-100',
    accentClass: 'text-amber-800'
  },
  'Spy x Family': {
    name: 'Spy x Family',
    currencyIcon: '🥜',
    currencyName: 'Peanuts',
    mainEmojis: ['🥜', '🔫', '🧸', '🍷', '⭐'],
    bgClass: 'bg-pink-50',
    accentClass: 'text-pink-600'
  }
};

export const DEFAULT_THEME: Theme = {
  name: 'Sushi',
  currencyIcon: '🍣',
  currencyName: 'Sushi',
  mainEmojis: ['🍣', '🍤', '🍙', '🍘', '🍥', '🥢'],
  bgClass: 'bg-slate-50',
  accentClass: 'text-red-500'
};

export const getThemeForTopic = (topic: string): Theme => {
  const key = Object.keys(THEMES).find(t => topic.toLowerCase().includes(t.toLowerCase()));
  return key ? THEMES[key] : DEFAULT_THEME;
};

export const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'basic-tool',
    name: 'Beginner Skill',
    description: '+1 per click',
    cost: 15,
    baseCost: 15,
    multiplier: 1.15,
    type: 'click',
    value: 1,
    icon: '💡',
    owned: 0
  },
  {
    id: 'apprentice',
    name: 'Apprentice',
    description: '1 per second',
    cost: 100,
    baseCost: 100,
    multiplier: 1.15,
    type: 'auto',
    value: 1,
    icon: '🌱',
    owned: 0
  },
  {
    id: 'automated-helper',
    name: 'Turbo Assistant',
    description: '5 per second',
    cost: 500,
    baseCost: 500,
    multiplier: 1.2,
    type: 'auto',
    value: 5,
    icon: '⚡',
    owned: 0
  },
  {
    id: 'master-skill',
    name: 'Master Technique',
    description: '+10 per click',
    cost: 1500,
    baseCost: 1500,
    multiplier: 1.25,
    type: 'click',
    value: 10,
    icon: '🔥',
    owned: 0
  },
  {
    id: 'elite-system',
    name: 'Ultimate Empire',
    description: '25 per second',
    cost: 3000,
    baseCost: 3000,
    multiplier: 1.3,
    type: 'auto',
    value: 25,
    icon: '👑',
    owned: 0
  },
  {
    id: 'research-lab',
    name: 'Research Lab',
    description: '70 per second',
    cost: 10000,
    baseCost: 10000,
    multiplier: 1.3,
    type: 'auto',
    value: 70,
    icon: '🧬',
    owned: 0
  },
  {
    id: 'legendary-sensei',
    name: 'Legendary Sensei',
    description: '+50 per click',
    cost: 25000,
    baseCost: 25000,
    multiplier: 1.35,
    type: 'click',
    value: 50,
    icon: '🧘',
    owned: 0
  },
  {
    id: 'global-network',
    name: 'Global Network',
    description: '200 per second',
    cost: 75000,
    baseCost: 75000,
    multiplier: 1.4,
    type: 'auto',
    value: 200,
    icon: '🌐',
    owned: 0
  },
  {
    id: 'quantum-core',
    name: 'Quantum Core',
    description: '600 per second',
    cost: 250000,
    baseCost: 250000,
    multiplier: 1.4,
    type: 'auto',
    value: 600,
    icon: '⚛️',
    owned: 0
  },
  {
    id: 'transcendent-power',
    name: 'Transcendent Power',
    description: '+500 per click',
    cost: 1000000,
    baseCost: 1000000,
    multiplier: 1.45,
    type: 'click',
    value: 500,
    icon: '✨',
    owned: 0
  },
  {
    id: 'universal-singularity',
    name: 'Universal Singularity',
    description: '2500 per second',
    cost: 5000000,
    baseCost: 5000000,
    multiplier: 1.5,
    type: 'auto',
    value: 2500,
    icon: '🌌',
    owned: 0
  }
];
