import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const Question = ({ 
  question, 
  options, 
  selectedAnswer, 
  onSelectAnswer,
  questionNumber,
  totalQuestions
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setSelectedOption(selectedAnswer);
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedAnswer, question]);
  
  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    onSelectAnswer(optionIndex);
  };
  
  return (
    <div className={`w-full max-w-2xl mx-auto transition-opacity duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs text-cyan-400 font-mono">
          <span className="bg-cyan-900/30 px-2 py-1 rounded border border-cyan-500/30">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <div className="w-1/4 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500" 
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-gray-900/60 backdrop-blur-md rounded-lg border border-cyan-500/30 p-6 mb-6
                      shadow-[0_0_15px_rgba(0,255,255,0.15)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h2 className="text-xl text-white font-semibold mb-6 relative">{question}</h2>
        
        <div className="space-y-3 relative">
          {options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`flex items-center p-4 rounded-lg border transition-all duration-300 cursor-pointer
                        ${selectedOption === index 
                          ? 'border-cyan-400 bg-cyan-900/30 shadow-[0_0_10px_rgba(0,255,255,0.3)]' 
                          : 'border-gray-700 bg-gray-800/50 hover:border-cyan-500/50 hover:bg-gray-800/80'}`}
            >
              <div className="mr-3">
                {selectedOption === index ? (
                  <CheckCircle2 size={20} className="text-cyan-400" />
                ) : (
                  <Circle size={20} className="text-gray-400" />
                )}
              </div>
              <span className={`${selectedOption === index ? 'text-cyan-300' : 'text-gray-300'}`}>
                {option}
              </span>
              
              {/* Animated selection indicator */}
              {selectedOption === index && (
                <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg pointer-events-none
                             shadow-[0_0_10px_rgba(0,255,255,0.3)] animate-pulse opacity-30"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;