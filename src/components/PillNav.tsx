import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle3D from "./ThemeToggle3D";
import LanguageSwitcher from "./LanguageSwitcher";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: { label: string; href: string }[];
  activeHref?: string;
  className?: string;
  customCTA?: React.ReactNode;
}

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  customCTA,
}: PillNavProps) => {
  const [activePill, setActivePill] = useState(activeHref || "/");
  const [hoveredPill, setHoveredPill] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    setActivePill(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 shadow-md ${className}`}
        style={{
          backgroundColor:
            theme === "dark"
              ? "rgba(0,0,0,0.85)"
              : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom:
            theme === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center justify-between h-16 sm:h-20 px-4 lg:px-12">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {logo ? (
              <img
                src={logo}
                alt={logoAlt}
                className="h-9 sm:h-12 lg:h-14 xl:h-16 w-auto transition-all duration-300 hover:scale-105"
              />
            ) : (
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                Portfolio
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-100/70 dark:bg-gray-800/70 px-2 py-1 rounded-full border border-gray-300/20">
            {items.map((item) => {
              const isActive = activePill === item.href;
              const isHovered = hoveredPill === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "text-white"
                      : theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  }`}
                  onMouseEnter={() => setHoveredPill(item.href)}
                  onMouseLeave={() => setHoveredPill(null)}
                >
                  <motion.div
                    layoutId={isActive ? "active-pill" : undefined}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full z-0"
                    initial={false}
                    animate={{
                      opacity: isActive || isHovered ? 1 : 0,
                      scale: isHovered && !isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">{customCTA}</div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg z-50 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 45 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.3 }}
              className="relative w-6 h-5"
            >
              <span
                className={`absolute w-6 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full top-0 transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 top-2.5 bg-gradient-to-r from-blue-500 to-cyan-400" : ""
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full top-2.5 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full bottom-0 transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 top-2.5 bg-gradient-to-r from-blue-500 to-cyan-400" : ""
                }`}
              />
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Animated Overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-start pt-24 pb-8 px-6 bg-white dark:bg-black/95 backdrop-blur-2xl"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-full max-w-xs"
              >
                <Link
                  to={item.href}
                  className={`block w-full text-center px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                    activePill === item.href
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                      : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gray-800/70"
                      : "text-gray-800 hover:text-black hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* Controls */}
            <motion.div
              className="flex items-center gap-4 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <LanguageSwitcher />
              <ThemeToggle3D />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PillNav;
