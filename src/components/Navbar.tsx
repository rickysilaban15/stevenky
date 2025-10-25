// src/components/Navbar.tsx
import PillNav from './PillNav';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import ThemeToggle3D from './ThemeToggle3D';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  const navItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.portfolio'), href: '/portfolio' },
    { label: t('nav.consultation'), href: '/consultation' },
    { label: t('nav.contact'), href: '/contact' }
  ];
  
  return (
    <PillNav
      items={navItems}
      baseColor={theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'}
      pillColor="#3b82f6"
      hoveredPillTextColor="#ffffff"
      pillTextColor={theme === 'dark' ? '#ffffff' : '#000000'}
      logo="/img/logo.png"
      logoAlt="Portfolio Logo"
      customCTA={
        <div className="hidden lg:flex items-center gap-4">
          {/* LanguageSwitcher */}
          <LanguageSwitcher />
          
          {/* Theme Toggle 3D untuk Desktop */}
          <ThemeToggle3D />
          
          {/* TOMBOL MULAI PROJECT DIHAPUS DARI SINI */}
        </div>
      }
    />
  );
};

export default Navbar;