import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, X, Bug, Trophy, RefreshCw, Zap } from 'lucide-react';

interface BugProps {
  id: number;
  x: number;
  y: number;
  type: 'feature' | 'bug';
}

export function MiniGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState<BugProps[]>([]);
  const [gameOver, setGameOver] = useState(false);

  // Generate random bugs
  const spawnTarget = useCallback(() => {
    if (!isPlaying) return;
    
    const newTarget: BugProps = {
      id: Date.now(),
      x: Math.random() * 85 + 5, // 5% to 90%
      y: Math.random() * 80 + 10,
      type: Math.random() > 0.8 ? 'feature' : 'bug', // 20% chance for a 'feature' (bonus points)
    };

    setTargets((prev) => [...prev, newTarget]);

    // Remove the target after a short time if not clicked
    setTimeout(() => {
      setTargets((prev) => prev.filter((t) => t.id !== newTarget.id));
    }, Math.random() * 1000 + 1000); // 1-2 seconds
  }, [isPlaying]);

  useEffect(() => {
    let spawnInterval: ReturnType<typeof setInterval>;
    let timerInterval: ReturnType<typeof setInterval>;

    if (isPlaying && timeLeft > 0) {
      spawnInterval = setInterval(spawnTarget, 600); // spawn every 600ms
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
      if (score > highScore) setHighScore(score);
    }

    return () => {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);
    };
  }, [isPlaying, timeLeft, spawnTarget, score, highScore]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
    setGameOver(false);
    setIsPlaying(true);
  };

  const smashTarget = (id: number, type: 'feature' | 'bug', e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) return;
    
    setTargets((prev) => prev.filter((t) => t.id !== id));
    setScore((prev) => prev + (type === 'feature' ? 5 : 1));
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center justify-center group"
      >
        <Gamepad2 size={24} className="group-hover:animate-spin" />
        <span className="absolute left-14 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
          Bored? Play Bug Smasher!
        </span>
      </motion.button>

      {/* Game Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <Gamepad2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-display">QA Tester: Bug Smasher</h3>
                    <p className="text-xs text-gray-400">Smash bugs, catch features!</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsOpen(false); setIsPlaying(false); }}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Game Info Bar */}
              <div className="flex items-center justify-between px-6 py-3 bg-black/40 border-b border-white/5">
                <div className="flex gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Score</span>
                    <span className="text-2xl font-bold text-accent font-display">{score}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Time</span>
                    <span className={`text-2xl font-bold font-display ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                      {timeLeft}s
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider flex items-center gap-1">
                    <Trophy size={12} /> High Score
                  </span>
                  <span className="text-xl font-bold text-secondary font-display">{highScore}</span>
                </div>
              </div>

              {/* Game Area */}
              <div 
                className="relative flex-1 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] overflow-hidden cursor-crosshair"
                onClick={() => {
                  // Penalty for clicking empty space
                  if (isPlaying && score > 0) setScore(s => Math.max(0, s - 1));
                }}
              >
                {!isPlaying && !gameOver && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <button 
                      onClick={startGame}
                      className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105 transition-transform"
                    >
                      Start Debugging
                    </button>
                  </div>
                )}

                {gameOver && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10 flex-col gap-4">
                    <h2 className="text-4xl font-display font-bold text-white mb-2">Time's Up!</h2>
                    <p className="text-xl text-gray-300">You smashed <span className="text-accent font-bold">{score}</span> bugs/features!</p>
                    {score >= highScore && score > 0 && (
                      <p className="text-secondary text-sm font-bold animate-pulse flex items-center gap-2 mb-4">
                        <Trophy size={16} /> NEW HIGH SCORE!
                      </p>
                    )}
                    <button 
                      onClick={startGame}
                      className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2 mt-4"
                    >
                      <RefreshCw size={18} /> Play Again
                    </button>
                  </div>
                )}

                <AnimatePresence>
                  {targets.map((target) => (
                    <motion.button
                      key={target.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={`absolute p-3 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 ${
                        target.type === 'feature' 
                          ? 'bg-accent/20 text-accent border border-accent/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                          : 'bg-red-500/20 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                      }`}
                      style={{ left: `${target.x}%`, top: `${target.y}%` }}
                      onClick={(e) => smashTarget(target.id, target.type, e)}
                    >
                      {target.type === 'feature' ? <Zap size={24} /> : <Bug size={24} />}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="p-3 bg-black/80 text-center text-xs text-gray-500 border-t border-white/5">
                <span className="text-red-500 font-bold">Bugs: +1</span> | <span className="text-accent font-bold">Features (Zap): +5</span> | Miss click: -1
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
