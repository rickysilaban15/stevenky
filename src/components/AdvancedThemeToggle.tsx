import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const AdvancedThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center justify-center p-2">
      <label className="switch cursor-pointer w-16 h-10">
        <input 
          type="checkbox" 
          checked={isDark}
          onChange={toggleTheme}
          className="hidden"
        />
        <div className={`button relative w-full h-full rounded-2xl transition-all duration-500 transform perspective-1000 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-[0_-10px_30px_rgba(59,130,246,0.3),inset_0_2px_4px_rgba(255,255,255,0.1)] rotate-x-10' 
            : 'bg-gradient-to-br from-yellow-300 via-orange-300 to-yellow-400 shadow-[0_-10px_30px_rgba(251,191,36,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)] -rotate-x-10'
        }`}>
          
          {/* Main toggle knob */}
          <div className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 w-6 h-6 rounded-full ${
            isDark 
              ? 'left-8 bg-gradient-to-b from-gray-300 to-gray-500 shadow-[0_2px_8px_rgba(0,0,0,0.3)]' 
              : 'left-2 bg-gradient-to-b from-white to-yellow-200 shadow-[0_2px_8px_rgba(251,191,36,0.5)]'
          }`}>
            {/* Knob shine */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
          </div>

          {/* Background patterns */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            {/* Stars for dark mode */}
            {isDark && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_1px,transparent_1px),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:15px_15px] opacity-60" />
            )}
            
            {/* Sun rays for light mode */}
            {!isDark && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_50%)] opacity-40" />
            )}
          </div>

          {/* Glow effect */}
          <div className={`absolute -inset-2 rounded-2xl blur-md transition-all duration-500 ${
            isDark 
              ? 'bg-blue-500/20' 
              : 'bg-yellow-400/30'
          }`} />

          {/* Border and depth */}
          <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
            isDark 
              ? 'border-gray-700/50' 
              : 'border-yellow-400/50'
          }`} />
        </div>
      </label>
    </div>
  );
};

export default AdvancedThemeToggle;