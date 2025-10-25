import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            theme === "dark" 
              ? "bg-gray-800 hover:bg-gray-700 border border-gray-600" 
              : "bg-white hover:bg-gray-100 border border-gray-300"
          }`}
          aria-label="Scroll to top"
        >
          <ChevronUp className={`h-5 w-5 ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }`} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;