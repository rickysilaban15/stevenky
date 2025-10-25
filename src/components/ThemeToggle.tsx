import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center justify-center">
      <label className="switch cursor-pointer">
        <input 
          type="checkbox" 
          checked={isDark}
          onChange={toggleTheme}
          className="hidden"
        />
        <div className={`button relative w-14 h-8 rounded-full transition-all duration-300 transform ${
          isDark 
            ? 'bg-gradient-to-b from-gray-800 to-gray-900 shadow-[0_-5px_15px_rgba(59,130,246,0.5)] rotate-0' 
            : 'bg-gradient-to-b from-yellow-200 to-yellow-400 shadow-[0_-5px_15px_rgba(251,191,36,0.5)] rotate-0'
        }`}>
          {/* Sun/Moon Icon */}
          <div className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
            isDark 
              ? 'left-7 text-yellow-200' 
              : 'left-1 text-orange-500'
          }`}>
            {isDark ? (
              // Moon icon for dark mode
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              // Sun icon for light mode
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </div>

          {/* Stars for dark mode */}
          {isDark && (
            <>
              <div className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse" />
              <div className="absolute top-4 left-5 w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-pulse delay-75" />
              <div className="absolute top-1 left-8 w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-pulse delay-150" />
            </>
          )}

          {/* Cloud for light mode */}
          {!isDark && (
            <div className="absolute top-2 right-2 w-3 h-2 bg-white rounded-full opacity-80" />
          )}

          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
            isDark 
              ? 'opacity-20 bg-blue-400 animate-pulse' 
              : 'opacity-10 bg-yellow-400'
          }`} />

          {/* 3D effect layers */}
          <div className={`absolute inset-0 rounded-full border transition-all duration-300 ${
            isDark 
              ? 'border-gray-600' 
              : 'border-yellow-300'
          }`} />
          
          <div className={`absolute inset-[1px] rounded-full transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-b from-gray-900 to-gray-700' 
              : 'bg-gradient-to-b from-yellow-100 to-yellow-300'
          }`} />
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;