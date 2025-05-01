import React from 'react';
import { BookOpen, Video, Workflow, ExternalLink, Redo } from 'lucide-react';

const Results = ({ score, performanceMessage, resources, onRestart, topic }) => {
  const getScoreColor = () => {
    if (score.percentage >= 80) return 'text-green-400';
    if (score.percentage >= 60) return 'text-cyan-400';
    if (score.percentage >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  // Resource type icons
  const resourceIcons = {
    'video': <Video size={18} className="text-red-400" />,
    'article': <BookOpen size={18} className="text-cyan-400" />,
    'course': <Workflow size={18} className="text-purple-400" />
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto animate-fadeIn">
      <div className="bg-gray-900/60 backdrop-blur-md rounded-lg border border-cyan-500/30 p-8 mb-8
                      shadow-[0_0_20px_rgba(0,255,255,0.15)]">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Quiz Results</h2>
        
        {/* Score section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#444"
                strokeWidth="1"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray={`${score.percentage}, 100`}
                className="animate-dasharray"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className={`text-3xl font-bold ${getScoreColor()}`}>
                {score.percentage}%
              </span>
              <span className="text-xs text-gray-400">Score</span>
            </div>
          </div>
          
          <p className="text-lg font-medium">{score.correct} out of {score.total} correct</p>
          <p className="text-cyan-300 mt-2 text-center font-medium">{performanceMessage}</p>
        </div>
        
        {/* Topic */}
        <div className="text-center mb-8">
          <span className="text-gray-400 text-sm">Quiz Topic</span>
          <p className="text-white text-xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            {topic}
          </p>
        </div>
        
        {/* Resources section */}
        <div>
          <h3 className="text-lg text-white font-semibold mb-4 border-b border-gray-700 pb-2">
            Recommended Resources
          </h3>
          
          <div className="space-y-4">
            {resources.map((resource) => (
              <a 
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-4 rounded-lg border border-gray-700 bg-gray-800/50 
                           hover:bg-gray-800 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="mr-3 mt-1">
                  {resourceIcons[resource.type]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300">
                      {resource.title}
                    </h4>
                    <ExternalLink size={16} className="text-gray-500 group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{resource.description}</p>
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300 mt-2">
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Restart button */}
      <div className="text-center">
        <button
          onClick={onRestart}
          className="flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500
                     text-black font-medium mx-auto hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]
                     transition-all duration-300"
        >
          <Redo size={18} className="mr-2" />
          Try Another Topic
        </button>
      </div>
    </div>
  );
};

export default Results;