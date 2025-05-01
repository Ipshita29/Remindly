import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-cyan-500/20 rounded-full"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-cyan-400 font-mono text-sm">Loading...</p>
    </div>
  );
};

export default Loader;