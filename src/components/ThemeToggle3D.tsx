import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle3D = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    // ✅ HAPUS WRAPPER DIV, langsung return label
    <label className="theme-switch-3d">
      <input 
        type="checkbox" 
        checked={isDark}
        onChange={toggleTheme}
        className="hidden"
      />
      <div className="toggle-button-3d">
        <div className="toggle-light" />
        <div className="toggle-dots" />
        <div className="toggle-characters" />
        <div className="toggle-shine" />
        <div className="toggle-shadow" />
      </div>
    </label>
  );
};

export default ThemeToggle3D;