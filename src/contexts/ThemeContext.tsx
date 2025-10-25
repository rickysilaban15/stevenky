import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light");
    }, 300);

    setTimeout(() => setIsTransitioning(false), 1000);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {isTransitioning && (
        <div
          className="theme-transition-overlay"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0))"
                : "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
          }}
        />
      )}
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
