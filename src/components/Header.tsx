import React, { useState } from 'react';
import { Sun, Moon, Sparkles, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme, activeSection }) => {
  const isDark = theme === 'dark';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    
    if (id === 'hero-storytelling-epic') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const el = document.getElementById(id);
    if (el) {
      // Offset for sticky header (64px)
      const yOffset = -70; 
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero-storytelling-epic', name: 'home' },
    { label: 'How It Works', id: 'section-prediction-engine', name: 'how-it-works' },
    { label: 'Coverage', id: 'section-upcoming-bills', name: 'coverage' },
    { label: 'Simulator', id: 'section-interactive-simulator', name: 'simulator' },
    { label: 'Compare', id: 'section-5-comparison', name: 'compare' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-all duration-300 ${
      isDark ? 'bg-zinc-950/80 border-zinc-900/60' : 'bg-white/80 border-zinc-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0" 
          onClick={() => handleScroll('hero-storytelling-epic')}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-green-600 to-brand-green-400 flex items-center justify-center shadow-lg shadow-brand-green-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="text-zinc-950 font-display font-black text-sm">K</span>
          </div>
          <div>
            <h1 className={`font-display font-bold text-base tracking-tight leading-none transition-colors ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}>
              Kavrol
            </h1>
            <span className="text-[9px] font-mono font-medium tracking-widest text-brand-green-500 block">
              BILL PROTECTION
            </span>
          </div>
        </div>

        {/* Navigation Items (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 px-1.5 py-1 rounded-full border border-transparent">
          {navItems.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <button
                key={item.name}
                onClick={() => handleScroll(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium font-mono transition-all duration-300 relative cursor-pointer ${
                  isActive 
                    ? isDark ? 'text-brand-green-400' : 'text-zinc-950 font-semibold'
                    : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {/* Sliding active pill indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-desktop-pill"
                    className={`absolute inset-0 rounded-full z-[-1] ${
                      isDark ? 'bg-brand-green-500/10 border border-brand-green-500/20' : 'bg-zinc-100 border border-zinc-200/40'
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions Group (Theme + Mobile Menu + CTA) */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 ${
              isDark 
                ? 'border-zinc-850 hover:bg-zinc-900 text-brand-green-500' 
                : 'border-zinc-200 hover:bg-zinc-50 text-brand-green-600'
            }`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Desktop Call To Action */}
          <button
            onClick={() => handleScroll('section-7-early-access')}
            className="hidden sm:flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-brand-green-500 text-zinc-950 hover:bg-brand-green-400 font-display font-bold text-xs transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-md shadow-brand-green-500/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Early Access</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border transition-all active:scale-95 cursor-pointer shrink-0 ${
              isDark 
                ? 'border-zinc-850 hover:bg-zinc-900 text-zinc-400 hover:text-white' 
                : 'border-zinc-200 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile / Tablet Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`lg:hidden border-t overflow-hidden ${
              isDark ? 'bg-zinc-950/95 border-zinc-900' : 'bg-white/95 border-zinc-200'
            }`}
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleScroll(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-mono font-medium flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? isDark ? 'bg-brand-green-500/10 text-brand-green-400 font-bold border-l-2 border-brand-green-500' : 'bg-zinc-100 text-zinc-950 font-bold border-l-2 border-zinc-950'
                        : isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900/50' : 'text-zinc-650 hover:text-zinc-950 hover:bg-zinc-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}

              {/* Mobile CTA (Join Early Access) */}
              <div className="pt-4 border-t border-zinc-900/10 dark:border-zinc-900/40">
                <button
                  onClick={() => handleScroll('section-7-early-access')}
                  className="w-full flex items-center justify-center gap-1.5 px-4.5 py-3 rounded-xl bg-brand-green-500 text-zinc-950 hover:bg-brand-green-400 font-display font-bold text-xs transition-all cursor-pointer shadow-md shadow-brand-green-500/10"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Join Early Access</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
