import React from "react";

const AcmeHealthLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6 text-white"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      </div>
      <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
        Acme Health
      </div>
    </div>
  );
};

export default AcmeHealthLogo;