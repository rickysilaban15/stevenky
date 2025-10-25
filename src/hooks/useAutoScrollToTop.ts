import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAutoScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke atas dengan smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]); // Trigger setiap kali pathname berubah
};

export default useAutoScrollToTop;