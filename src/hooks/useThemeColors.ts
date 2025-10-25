import { useTheme } from '@/contexts/ThemeContext';

export const useThemeColors = () => {
  const { theme } = useTheme();
  
  return {
    isDark: theme === 'dark',
    backgroundColor: theme === 'dark' ? 'bg-black' : 'bg-white',
    textColor: theme === 'dark' ? 'text-white' : 'text-gray-900',
    borderColor: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    cardBackground: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
  };
};