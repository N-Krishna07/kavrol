import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Link2, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Zap,
  TrendingUp,
  BrainCircuit,
  EyeOff
} from 'lucide-react';

interface BehindTheScenesProps {
  theme: 'dark' | 'light';
}

export const BehindTheScenes: React.FC<BehindTheScenesProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Secure Bank Connection",
      subtitle: "Read-only bank-grade linkage",
      description: "Connect your primary checking account instantly and securely through our read-only partner. We have zero ability to withdraw, transfer, or modify your funds. Your credentials remain fully encrypted and secure.",
      icon: Link2,
      badge: "BANK-GRADE SECURITY",
      highlight: "256-Bit SSL • Read-Only Access"
    },
    {
      id: 2,
      title: "No Credit Check Required",
      subtitle: "Zero impact on your score",
      description: "We verify eligibility solely based on consistent income deposits—not credit scores. There are absolutely no hard pulls, soft inquiries, or reports to major credit bureaus. Your credit remains completely untouched.",
      icon: EyeOff,
      badge: "NO CREDIT IMPACT",
      highlight: "Income History Based Only"
    },
    {
      id: 3,
      title: "Predictive Cash Flow Modeling",
      subtitle: "Mapping upcoming paydays & bills",
      description: "Our proprietary algorithm continuously maps your recurring billing dates against your paycheck direct deposits. The system spots potential timing shortfalls up to 10 days before they can trigger bank overdraft fees.",
      icon: BrainCircuit,
      badge: "PREDICTIVE INTELLIGENCE",
      highlight: "10-Day Proactive Analysis Window"
    },
    {
      id: 4,
      title: "Eligibility Confirmed",
      subtitle: "Instant protection activation",
      description: "Once a steady deposit pattern is identified, eligibility is validated. Your Auto-Protection timing buffer is immediately armed and ready to bridge any detected timing gaps, fee-free and interest-free.",
      icon: ShieldCheck,
      badge: "AUTO-ARMED BUFFER",
      highlight: "0% Interest • No Fees"
    }
  ];

  return (
    <div className="w-full space-y-12" id="kavrol-decision-engine">
      
      {/* Header Info Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 ${
        isDark ? 'bg-zinc-950/40 border-zinc-900/80 text-zinc-300' : 'bg-brand-green-50/50 border-brand-green-100 text-zinc-800'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-green-500/10 text-brand-green-500 border border-brand-green-500/20">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-green-500">TRUSTED INFRASTRUCTURE</p>
            <h4 className={`text-xs font-bold mt-0.5 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Transparent, Read-Only, and Under Your Control
            </h4>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center md:justify-end text-[10px] font-mono font-bold">
          <span className={`px-2.5 py-1 rounded-lg border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            🔒 256-BIT SSL
          </span>
          <span className={`px-2.5 py-1 rounded-lg border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            ✓ READ-ONLY
          </span>
          <span className={`px-2.5 py-1 rounded-lg border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            🚫 NO CREDIT CHECKS
          </span>
        </div>
      </div>

      {/* Modern Illuminated Flow list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isHovered = hoveredStep === idx;

          return (
            <motion.div
              key={step.id}
              onMouseEnter={() => setHoveredStep(idx)}
              onMouseLeave={() => setHoveredStep(null)}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isDark 
                  ? isHovered 
                    ? 'bg-zinc-900/60 border-brand-green-500/30 shadow-[0_12px_40px_rgba(34,197,94,0.06)]' 
                    : 'bg-zinc-950/40 border-zinc-900' 
                  : isHovered 
                    ? 'bg-white border-brand-green-500/30 shadow-[0_12px_40px_rgba(34,197,94,0.04)]' 
                    : 'bg-zinc-50 border-zinc-200'
              }`}
            >
              {/* Subtle ambient lighting effect when hovered */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 right-0 w-32 h-32 bg-brand-green-500/5 blur-3xl rounded-full pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <div className="space-y-4">
                {/* Step header */}
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded border ${
                    isDark 
                      ? 'bg-zinc-900 border-zinc-800 text-brand-green-400' 
                      : 'bg-brand-green-50 border-brand-green-200 text-brand-green-700'
                  }`}>
                    {step.badge}
                  </span>
                  <span className={`text-[10px] font-mono font-bold transition-colors ${isHovered ? 'text-brand-green-400' : 'text-zinc-500'}`}>
                    STEP 0{step.id}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl border transition-colors duration-300 shrink-0 ${
                    isHovered 
                      ? 'bg-brand-green-500/10 border-brand-green-500/30 text-brand-green-500' 
                      : isDark ? 'bg-zinc-900 border-zinc-855 text-zinc-400' : 'bg-white border-zinc-250 text-zinc-600 shadow-sm'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className={`text-base font-display font-bold transition-colors ${
                      isHovered ? 'text-brand-green-400' : isDark ? 'text-white' : 'text-zinc-900'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-[11px] font-mono font-semibold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                <p className={`text-xs leading-relaxed transition-colors duration-300 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-650'
                }`}>
                  {step.description}
                </p>
              </div>

              {/* Step footer highlighting trust factor */}
              <div className="mt-6 pt-4 border-t border-zinc-800/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-brand-green-500 shrink-0" />
                  {step.highlight}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                  SECURE
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
