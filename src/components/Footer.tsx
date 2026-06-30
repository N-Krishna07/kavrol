import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, Mail, ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FooterProps {
  theme: 'dark' | 'light';
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onOpenPrivacy, onOpenTerms }) => {
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`border-t transition-all duration-300 py-12 md:py-20 ${
      isDark ? 'bg-zinc-950 border-zinc-900/60 text-zinc-500' : 'bg-zinc-50 border-zinc-200/50 text-zinc-600'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-4">
            <div 
              className="flex items-center gap-2 cursor-pointer group select-none self-start"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-7 h-7 rounded bg-brand-green-500 flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-zinc-950 font-display font-black text-xs">K</span>
              </div>
              <span className={`font-display font-bold text-sm tracking-tight transition-colors ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                Kavrol
              </span>
            </div>
            <p className={`text-xs leading-relaxed max-w-sm ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
              Kavrol predicts when you'll be short before a bill is due. If you qualify and enable Auto Protection, Kavrol may help protect the missing amount so your bill can still be paid on time. You then repay according to the terms you accepted after your next paycheck arrives.
            </p>
          </div>

          {/* Links Column 1: Journey */}
          <div className="lg:col-span-2 space-y-4">
            <h6 className={`text-[10px] font-mono uppercase tracking-widest font-bold ${isDark ? 'text-zinc-400' : 'text-zinc-900'}`}>
              Kavrol Story
            </h6>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button 
                  onClick={() => handleScroll('hero-storytelling-epic')}
                  className={`hover:text-brand-green-500 transition-all duration-300 cursor-pointer text-left focus:outline-none hover:underline focus-visible:ring-1 focus-visible:ring-brand-green-500 py-0.5 rounded`}
                >
                  Kavrol Story
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScroll('section-why-gaps-happen')}
                  className={`hover:text-brand-green-500 transition-all duration-300 cursor-pointer text-left focus:outline-none hover:underline focus-visible:ring-1 focus-visible:ring-brand-green-500 py-0.5 rounded`}
                >
                  Why It Happens
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScroll('section-5-comparison')}
                  className={`hover:text-brand-green-500 transition-all duration-300 cursor-pointer text-left focus:outline-none hover:underline focus-visible:ring-1 focus-visible:ring-brand-green-500 py-0.5 rounded`}
                >
                  Comparison
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Legal & Security */}
          <div className="lg:col-span-2 space-y-4">
            <h6 className={`text-[10px] font-mono uppercase tracking-widest font-bold ${isDark ? 'text-zinc-400' : 'text-zinc-900'}`}>
              Trust & Safety
            </h6>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button 
                  onClick={() => handleScroll('section-why-gaps-happen')} // Scrolls to trust parameters & secure bank badges
                  className={`hover:text-brand-green-500 transition-all duration-300 cursor-pointer text-left focus:outline-none hover:underline focus-visible:ring-1 focus-visible:ring-brand-green-500 py-0.5 rounded`}
                >
                  Trust & Safety
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenPrivacy}
                  className={`hover:text-brand-green-500 transition-all duration-300 cursor-pointer text-left focus:outline-none hover:underline focus-visible:ring-1 focus-visible:ring-brand-green-500 py-0.5 rounded`}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTerms}
                  className={`hover:text-brand-green-500 transition-all duration-300 cursor-pointer text-left focus:outline-none hover:underline focus-visible:ring-1 focus-visible:ring-brand-green-500 py-0.5 rounded`}
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <a 
                  href="mailto:support@kavrol.com"
                  className={`hover:text-brand-green-500 transition-all duration-300 cursor-pointer text-left block focus:outline-none hover:underline focus-visible:ring-1 focus-visible:ring-brand-green-500 py-0.5 rounded`}
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-4 space-y-3">
            <h6 className={`text-[10px] font-mono uppercase tracking-widest font-bold ${isDark ? 'text-zinc-400' : 'text-zinc-900'}`}>
              Stay Updated
            </h6>
            <p className={`text-xs leading-relaxed max-w-sm ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
              Not ready to join the waitlist? Enter your email to receive monthly product updates and early access announcements.
            </p>

            <div className="pt-1">
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form 
                    key="newsletter-form"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    onSubmit={handleSubmit} 
                    className="flex gap-2 max-w-sm"
                  >
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input 
                        type="email" 
                        required
                        placeholder="your@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs font-sans border focus:outline-none focus:ring-1 focus:ring-brand-green-500 transition-all ${
                          isDark 
                            ? 'bg-zinc-900/60 border-zinc-850 text-white placeholder-zinc-500' 
                            : 'bg-white border-zinc-200 text-zinc-950 placeholder-zinc-400'
                        }`}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-brand-green-500 text-zinc-950 hover:bg-brand-green-400 font-mono font-bold text-xs transition-all flex items-center gap-1 shrink-0 active:scale-95 shadow-sm shadow-brand-green-500/10"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }
                    }}
                    className="p-3.5 rounded-xl bg-brand-green-500/10 border border-brand-green-500/30 text-brand-green-400 text-xs flex items-center gap-3 max-w-sm relative overflow-hidden"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-brand-green-500/10 pointer-events-none"
                      initial={{ scale: 0, opacity: 0.8 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 15,
                        delay: 0.1 
                      }}
                      className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-brand-green-500 text-zinc-950 shrink-0 shadow-sm shadow-brand-green-500/20"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="flex flex-col gap-0.5"
                    >
                      <span className="font-bold text-brand-green-400">Subscription Confirmed!</span>
                      <span className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>You're on the list for exclusive monthly updates.</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Legal disclosures block */}
        <div className={`pt-8 border-t space-y-4 text-[10px] leading-relaxed font-sans ${
          isDark ? 'border-zinc-900/60' : 'border-zinc-200'
        }`}>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-green-500 shrink-0 mt-0.5" />
            <p>
              <strong>Platform Notice:</strong> Kavrol is a financial technology platform, not a bank. All deposits, ledger settlements, and financial services are provided in collaboration with licensed banking partners. Auto-protection shortfall advances are subjected strictly to ongoing eligibility metrics, historical balance verifications, and upfront terms accepted by the user.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-brand-green-500 shrink-0 mt-0.5" />
            <p>
              <strong>Fair Settlement Statement:</strong> Kavrol provides a flat-rate timing bridge. We do not assess ongoing interest (0% interest), compounding monthly margins, late account penalties, or physical collection overheads. Bridged funds are returned seamlessly directly following your next scheduled paycheck receipt according to standard authorization parameters.
            </p>
          </div>

          {/* Copyright block */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 text-[9px] font-mono text-zinc-600">
            <span>© {new Date().getFullYear()} Kavrol Technologies Inc. All rights reserved.</span>
            <span>Handcrafted with care for financial peace of mind.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
