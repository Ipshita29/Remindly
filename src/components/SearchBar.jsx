import React, { useState } from 'react';
import { Zap } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter a topic (e.g., JavaScript)"
            className="w-full bg-black/30 text-cyan-300 placeholder-cyan-500/50 border-2 border-cyan-500/30 
                     focus:border-cyan-400 rounded-lg px-4 py-3 pl-10 pr-14 outline-none transition-all
                     duration-300 backdrop-blur-sm focus:shadow-[0_0_15px_rgba(0,255,255,0.5)]"
            disabled={isLoading}
          />
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500
                        bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10"></div>
        </div>
        
        <Zap 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400"
        />
        
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500
                   text-black font-bold px-3 py-1 rounded hover:shadow-[0_0_10px_rgba(0,255,255,0.7)]
                   transition-all duration-300 disabled:opacity-50 text-sm"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading
            </span>
          ) : (
            'Search'
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;