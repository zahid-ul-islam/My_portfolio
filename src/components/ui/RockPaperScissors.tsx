import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Swords, RefreshCw } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors' | null;

const CHOICES = [
  { id: 'rock', emoji: '🪨', name: 'Rock' },
  { id: 'paper', emoji: '📄', name: 'Paper' },
  { id: 'scissors', emoji: '✂️', name: 'Scissors' },
] as const;

export function RockPaperScissors() {
  const [isOpen, setIsOpen] = useState(false);
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<'win' | 'lose' | 'draw' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const playGame = (choice: Choice) => {
    if (isAnimating) return;
    
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);
    setIsAnimating(true);

    // Simulate "thinking" / shaking animation
    setTimeout(() => {
      const randomChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)].id as Choice;
      setComputerChoice(randomChoice);

      // Determine winner
      if (choice === randomChoice) {
        setResult('draw');
      } else if (
        (choice === 'rock' && randomChoice === 'scissors') ||
        (choice === 'paper' && randomChoice === 'rock') ||
        (choice === 'scissors' && randomChoice === 'paper')
      ) {
        setResult('win');
        setScore(s => ({ ...s, player: s.player + 1 }));
      } else {
        setResult('lose');
        setScore(s => ({ ...s, computer: s.computer + 1 }));
      }
      setIsAnimating(false);
    }, 1500);
  };

  const resetGame = () => {
    setScore({ player: 0, computer: 0 });
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <>
      {/* Floating Action Button - Bottom Left (Above Bug Smasher) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 z-50 p-4 rounded-full bg-gradient-to-r from-secondary to-primary text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center justify-center group"
      >
        <Swords size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute left-14 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
          RPS Duel!
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
              className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
                    <Swords size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-display">Rock, Paper, Scissors</h3>
                    <p className="text-xs text-gray-400">Man vs Machine</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Score Board */}
              <div className="flex items-center justify-between px-8 py-4 bg-black/40 border-b border-white/5">
                <div className="text-center">
                  <span className="block text-xs text-gray-500 uppercase font-bold mb-1">You</span>
                  <span className="text-3xl font-bold text-accent font-display">{score.player}</span>
                </div>
                <div className="text-gray-600 font-display font-bold italic text-xl">VS</div>
                <div className="text-center">
                  <span className="block text-xs text-gray-500 uppercase font-bold mb-1">AI</span>
                  <span className="text-3xl font-bold text-primary font-display">{score.computer}</span>
                </div>
              </div>

              {/* Arena */}
              <div className="p-8 flex flex-col items-center justify-center min-h-[250px] relative">
                <div className="flex items-center justify-between w-full max-w-sm">
                  {/* Player Side */}
                  <div className="flex flex-col items-center gap-4">
                    <motion.div 
                      animate={isAnimating ? { y: [0, -20, 0] } : {}}
                      transition={{ repeat: isAnimating ? Infinity : 0, duration: 0.4 }}
                      className="text-6xl"
                    >
                      {playerChoice ? CHOICES.find(c => c.id === playerChoice)?.emoji : '❓'}
                    </motion.div>
                    <span className="text-sm font-bold text-gray-400">You</span>
                  </div>

                  {/* Divider / Result */}
                  <div className="flex flex-col items-center justify-center w-32">
                    {isAnimating && (
                      <span className="text-sm font-bold text-secondary animate-pulse">Thinking...</span>
                    )}
                    {result === 'win' && <span className="text-2xl font-bold text-accent font-display">You Win!</span>}
                    {result === 'lose' && <span className="text-2xl font-bold text-red-500 font-display">You Lose!</span>}
                    {result === 'draw' && <span className="text-2xl font-bold text-yellow-500 font-display">Draw!</span>}
                  </div>

                  {/* Computer Side */}
                  <div className="flex flex-col items-center gap-4">
                    <motion.div 
                      animate={isAnimating ? { y: [0, -20, 0] } : {}}
                      transition={{ repeat: isAnimating ? Infinity : 0, duration: 0.4, delay: 0.1 }}
                      className="text-6xl"
                    >
                      {isAnimating ? '🤖' : computerChoice ? CHOICES.find(c => c.id === computerChoice)?.emoji : '🤖'}
                    </motion.div>
                    <span className="text-sm font-bold text-gray-400">AI</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="p-6 bg-white/5 border-t border-white/10">
                <h4 className="text-center text-sm text-gray-400 font-medium mb-4 uppercase tracking-widest">Choose Your Weapon</h4>
                <div className="flex justify-center gap-4">
                  {CHOICES.map(choice => (
                    <button
                      key={choice.id}
                      disabled={isAnimating}
                      onClick={() => playGame(choice.id as Choice)}
                      className="flex flex-col items-center gap-2 p-4 w-24 bg-black/40 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform">{choice.emoji}</span>
                      <span className="text-xs font-bold text-gray-300">{choice.name}</span>
                    </button>
                  ))}
                </div>
                
                {/* Reset Button */}
                {(score.player > 0 || score.computer > 0) && (
                  <div className="mt-6 flex justify-center">
                    <button 
                      onClick={resetGame}
                      className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw size={12} /> Reset Score
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
