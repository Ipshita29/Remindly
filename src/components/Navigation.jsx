import React from 'react';
import { ArrowLeft, ArrowRight, CheckSquare } from 'lucide-react';

const Navigation = ({ 
  onPrevious, 
  onNext, 
  onComplete,
  currentQuestionIndex,
  totalQuestions,
  isLastQuestion,
  allQuestionsAnswered
}) => {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mt-6">
      <button
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className={`flex items-center px-4 py-2 rounded-lg border border-gray-700
                   transition-all duration-300 focus:outline-none
                   ${currentQuestionIndex === 0 
                     ? 'opacity-50 cursor-not-allowed bg-gray-800/30 text-gray-500' 
                     : 'bg-gray-800/50 text-gray-200 hover:bg-gray-700/50 hover:border-cyan-500/50 hover:text-cyan-300'}`}
      >
        <ArrowLeft size={18} className="mr-2" />
        Previous
      </button>
      
      {isLastQuestion ? (
        <button
          onClick={onComplete}
          disabled={!allQuestionsAnswered}
          className={`flex items-center px-6 py-2 rounded-lg font-medium
                     transition-all duration-300 focus:outline-none
                     ${allQuestionsAnswered 
                       ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]' 
                       : 'opacity-50 cursor-not-allowed bg-gray-700 text-gray-300'}`}
        >
          <CheckSquare size={18} className="mr-2" />
          Finish Quiz
        </button>
      ) : (
        <button
          onClick={onNext}
          className="flex items-center px-4 py-2 rounded-lg bg-gray-800/50 
                    text-gray-200 border border-gray-700 hover:bg-gray-700/50 
                    hover:border-cyan-500/50 hover:text-cyan-300
                    transition-all duration-300 focus:outline-none"
        >
          Next
          <ArrowRight size={18} className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default Navigation;