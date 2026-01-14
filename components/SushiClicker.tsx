
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Upgrade, ClickParticle } from '../types';
import { INITIAL_UPGRADES, getThemeForTopic } from '../constants';

interface Props {
  topic: string;
  timeLeft: number;
  onTimeEnd: () => void;
}

const SushiClicker: React.FC<Props> = ({ topic, timeLeft, onTimeEnd }) => {
  const theme = useMemo(() => getThemeForTopic(topic), [topic]);
  const [count, setCount] = useState(0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(INITIAL_UPGRADES);
  const [particles, setParticles] = useState<ClickParticle[]>([]);
  const [isClicking, setIsClicking] = useState(false);
  const particlesRef = useRef<number>(0);

  const formatTime = (ms: number) => {
    const totalSecs = Math.ceil(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateSPS = useCallback(() => {
    return upgrades
      .filter(u => u.type === 'auto')
      .reduce((acc, u) => acc + (u.value * u.owned), 0);
  }, [upgrades]);

  const calculateSPC = useCallback(() => {
    return 1 + upgrades
      .filter(u => u.type === 'click')
      .reduce((acc, u) => acc + (u.value * u.owned), 0);
  }, [upgrades]);

  // Handle auto-clicking
  useEffect(() => {
    const sps = calculateSPS();
    if (sps === 0) return;

    const interval = setInterval(() => {
      setCount(prev => prev + sps / 10);
    }, 100);

    return () => clearInterval(interval);
  }, [calculateSPS]);

  const handleClick = (e: React.MouseEvent) => {
    const spc = calculateSPC();
    setCount(prev => prev + spc);
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 100);

    // Particle effect
    const newParticle: ClickParticle = {
      id: particlesRef.current++,
      x: e.clientX,
      y: e.clientY,
      value: spc
    };
    setParticles(prev => [...prev, newParticle]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 800);
  };

  const buyUpgrade = (id: string) => {
    setUpgrades(prev => prev.map(u => {
      if (u.id === id && count >= u.cost) {
        setCount(c => c - u.cost);
        const nextCost = Math.ceil(u.baseCost * Math.pow(u.multiplier, u.owned + 1));
        return { ...u, owned: u.owned + 1, cost: nextCost };
      }
      return u;
    }));
  };

  return (
    <div className={`flex flex-col md:flex-row h-full w-full max-w-6xl mx-auto gap-8 p-4 ${theme.bgClass} animate-in fade-in zoom-in duration-500 rounded-3xl transition-colors`}>
      
      {/* Left Column: Game Status & Clicker */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 bg-white/80 backdrop-blur rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Timer UI */}
        <div className={`absolute top-6 right-6 flex items-center space-x-2 bg-slate-800 text-white px-4 py-2 rounded-full font-bold shadow-lg`}>
          <i className="fas fa-clock text-red-400"></i>
          <span>{formatTime(timeLeft)}</span>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-1">Total {theme.currencyName}</h2>
          <div className={`text-6xl font-fun font-black text-slate-800 drop-shadow-sm`}>
            {Math.floor(count).toLocaleString()}
          </div>
          <p className="text-slate-500 font-medium">
            <span className={`${theme.accentClass} font-bold`}>{calculateSPS()}</span> {theme.currencyName.toLowerCase()} / sec
          </p>
        </div>

        <div className="relative group">
          <button
            onClick={handleClick}
            className={`text-9xl transition-transform duration-75 active:scale-90 select-none ${isClicking ? 'scale-95' : 'scale-100 hover:scale-105'}`}
          >
            {theme.mainEmojis[Math.floor((count % (theme.mainEmojis.length * 5)) / 5) % theme.mainEmojis.length]}
          </button>
          
          <div className={`absolute inset-0 opacity-20 blur-3xl rounded-full -z-10 animate-pulse`} style={{ backgroundColor: 'currentColor' }}></div>
        </div>

        <div className="text-slate-400 text-sm font-semibold flex items-center gap-2">
          <i className="fas fa-mouse-pointer"></i>
          <span>Earn {theme.currencyName}! (+{calculateSPC()})</span>
        </div>

        {/* Particles */}
        {particles.map(p => (
          <div
            key={p.id}
            className="fixed pointer-events-none font-bold text-2xl z-50 float-up"
            style={{ left: p.x - 20, top: p.y - 40, color: 'currentColor' }}
          >
            +{p.value}
          </div>
        ))}
      </div>

      {/* Right Column: Shop */}
      <div className="w-full md:w-96 flex flex-col bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-6 overflow-y-auto max-h-[80vh]">
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <div className="bg-slate-100 p-2 rounded-lg">
            <i className={`fas fa-store ${theme.accentClass}`}></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800">{theme.name} Shop</h3>
        </div>

        <div className="space-y-4">
          {upgrades.map(upgrade => {
            const canAfford = count >= upgrade.cost;
            return (
              <button
                key={upgrade.id}
                onClick={() => buyUpgrade(upgrade.id)}
                disabled={!canAfford}
                className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all group ${
                  canAfford 
                    ? 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-md active:scale-[0.98]' 
                    : 'border-slate-50 bg-slate-50 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="text-3xl mr-4">{upgrade.icon}</div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800 text-sm">{upgrade.name}</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">Lv. {upgrade.owned}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">{upgrade.description}</p>
                  <div className={`flex items-center text-sm font-bold ${canAfford ? theme.accentClass : 'text-slate-400'}`}>
                    <span className="mr-1">{theme.currencyIcon}</span>
                    {upgrade.cost.toLocaleString()}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SushiClicker;
