import React from 'react';
import SearchBar from './SearchBar';
import { BrainCircuit } from 'lucide-react';

const Home = ({ onStartQuiz, isLoading, error }) => {
  return (
    <div className="w-full max-w-2xl mx-auto text-center animate-fadeIn">
      <div className="mb-8">
        <div className="flex justify-center mb-3">
          <BrainCircuit size={60} className="text-cyan-400 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
          Neural Quiz
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Test your knowledge on any topic with our cyberpunk-themed quiz generator.
        </p>
      </div>
      
      <div className="bg-gray-900/60 backdrop-blur-md rounded-lg border border-cyan-500/30 p-8 mb-6 
                     shadow-[0_0_20px_rgba(0,255,255,0.15)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-fuchsia-500/5"></div>
        
        {/* Scanner effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent scanner-line"></div>
        </div>
        
        <h2 className="text-xl text-white font-semibold mb-6 relative">What topic would you like to be quizzed on?</h2>
        
        <SearchBar onSearch={onStartQuiz} isLoading={isLoading} />
        
        {error && (
          <div className="mt-4 text-red-400 text-sm bg-red-400/10 border border-red-400/30 py-2 px-3 rounded">
            {error}
          </div>
        )}
        
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
          {['JavaScript', 'Python', 'React'].map((topic) => (
            <button
              key={topic}
              onClick={() => onStartQuiz(topic)}
              className="py-2 px-3 border border-cyan-500/30 rounded bg-gray-800/50 
                         text-cyan-300 text-sm hover:bg-gray-800/80 hover:border-cyan-500/50
                         transition-all duration-300"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      
      <div className="text-gray-500 text-xs">
        <p>Powered by Neural Networks and Cybernetic Enhancement</p>
      </div>
    </div>
  );
};

export default Home;