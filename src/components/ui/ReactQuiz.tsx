import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BrainCircuit, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "What is the Virtual DOM in React?",
    answer: "The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React uses it to batch updates and calculate the most efficient way to update the real DOM (a process called reconciliation), which vastly improves performance."
  },
  {
    id: 2,
    question: "What is the difference between useMemo and useCallback?",
    answer: "useMemo caches the result of a calculation between renders, while useCallback caches a function definition. You use useCallback to prevent recreating functions on every render, which is useful when passing callbacks to optimized child components."
  },
  {
    id: 3,
    question: "How does the useEffect cleanup function work?",
    answer: "The cleanup function (the function returned by useEffect) runs right before the component unmounts, and also right before the effect runs again on subsequent renders. It is used to clean up subscriptions, timers, or event listeners to prevent memory leaks."
  },
  {
    id: 4,
    question: "What is Prop Drilling and how do you avoid it?",
    answer: "Prop drilling is the process of passing data down through multiple layers of nested components that don't need the data themselves. It can be avoided by using React Context, Redux, Zustand, or component composition."
  },
  {
    id: 5,
    question: "What are React Server Components (RSC)?",
    answer: "React Server Components are a new paradigm where components render entirely on the server. They have zero impact on bundle size, can securely access server infrastructure (like databases) directly, and stream their HTML to the client."
  }
];

export function ReactQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === QUESTIONS.length - 1 ? 0 : prev + 1));
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? QUESTIONS.length - 1 : prev - 1));
    }, 150);
  };

  const currentQ = QUESTIONS[currentIndex];

  return (
    <>
      {/* Floating Action Button - Bottom Right */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-[#61DAFB] to-[#3178C6] text-black shadow-[0_0_20px_rgba(97,218,251,0.4)] flex items-center justify-center group"
      >
        <BrainCircuit size={24} className="group-hover:animate-pulse" />
        <span className="absolute right-14 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#61DAFB]/30 pointer-events-none">
          React Q&A
        </span>
      </motion.button>

      {/* Quiz Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-[#0a0a0a] border border-[#61DAFB]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[450px]"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#61DAFB]/20 rounded-lg text-[#61DAFB]">
                    <BrainCircuit size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-display">React Knowledge Base</h3>
                    <p className="text-xs text-gray-400">Interview Q&A Flashcards</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsOpen(false); setIsFlipped(false); setCurrentIndex(0); }}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/5">
                <motion.div 
                  className="h-full bg-[#61DAFB]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Flashcard Area */}
              <div className="flex-1 p-8 flex flex-col items-center justify-center perspective-1000">
                <div className="flex justify-between w-full mb-6 items-center">
                  <span className="text-sm font-bold text-gray-500">Card {currentIndex + 1} of {QUESTIONS.length}</span>
                  <span className="text-sm text-[#61DAFB] bg-[#61DAFB]/10 px-3 py-1 rounded-full flex items-center gap-1">
                    <Lightbulb size={14} /> Click card to flip
                  </span>
                </div>

                {/* Flip Card Container */}
                <div 
                  className="relative w-full h-[220px] cursor-pointer group"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    className="absolute inset-0 w-full h-full transform-style-3d transition-transform duration-500"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                  >
                    {/* Front: Question */}
                    <div className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-xl group-hover:bg-white/10 transition-colors">
                      <h4 className="text-xs text-[#61DAFB] uppercase tracking-widest font-bold mb-4">Question</h4>
                      <p className="text-xl md:text-2xl font-bold text-white font-display leading-tight">
                        {currentQ.question}
                      </p>
                    </div>

                    {/* Back: Answer */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#61DAFB]/10 border border-[#61DAFB]/30 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                      <h4 className="text-xs text-[#61DAFB] uppercase tracking-widest font-bold mb-4">Answer</h4>
                      <p className="text-md md:text-lg text-gray-200 leading-relaxed">
                        {currentQ.answer}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Controls */}
              <div className="p-6 bg-white/5 border-t border-white/10 flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all flex items-center gap-2 font-medium"
                >
                  <ChevronLeft size={18} /> Prev
                </button>
                <div className="flex gap-2">
                  {QUESTIONS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setIsFlipped(false); setCurrentIndex(idx); }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === currentIndex ? 'bg-[#61DAFB] scale-125' : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="p-3 text-[#61DAFB] hover:text-black hover:bg-[#61DAFB] rounded-xl transition-all flex items-center gap-2 font-medium"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
