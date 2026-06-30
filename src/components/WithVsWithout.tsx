import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, Sparkles, Frown, Smile, X, Check } from 'lucide-react';

interface WithVsWithoutProps {
  theme: 'dark' | 'light';
}

export const WithVsWithout: React.FC<WithVsWithoutProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [hoveredCard, setHoveredCard] = useState<'with' | 'without' | null>(null);

  return (
    <div className="w-full" id="with-vs-without-split-screen">
      <div className={`rounded-3xl p-6 border transition-all duration-300 ${
        isDark ? 'bg-zinc-900/40 border-zinc-900 shadow-2xl' : 'bg-zinc-50 border-zinc-200'
      }`}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-zinc-800/10 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-brand-green-500 uppercase">
              Section 5 • Structural Contrast
            </span>
            <h4 className={`text-lg font-display font-bold mt-1 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
              The Reality Check
            </h4>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-bold border border-red-500/15">
            VS. KAVROL PROTECTION
          </span>
        </div>

        {/* 2-Column Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* COLUMN 1: WITHOUT KAVROL */}
          <motion.div
            onMouseEnter={() => setHoveredCard('without')}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{ y: -3 }}
            className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
              isDark
                ? hoveredCard === 'without'
                  ? 'bg-red-950/15 border-red-500/40 shadow-[0_4px_30px_rgba(239,68,68,0.15)]'
                  : 'bg-zinc-950/40 border-zinc-850'
                : hoveredCard === 'without'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-white border-zinc-200'
            }`}
            id="comparison-without-kavrol"
          >
            {/* Top indicator bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-black text-red-500 tracking-wider">
                  STANDARD BANK HOLES
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  <Frown className="w-3 h-3" />
                  UNPROTECTED
                </span>
              </div>

              <div className="space-y-1">
                <h5 className={`text-lg font-display font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                  Without Kavrol
                </h5>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                  Traditional checking accounts ignore your real schedule, letting bills crash into low balances.
                </p>
              </div>

              {/* Danger Points */}
              <div className="space-y-3 pt-2">
                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-red-950/5 border-red-500/10' : 'bg-red-50/50 border-red-100'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <X className="w-4.5 h-4.5 text-red-400 shrink-0" />
                    <span className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      Bill Failed
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-black text-red-400">
                    ❌ BOUNCED / RETURNED
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-red-950/5 border-red-500/10' : 'bg-red-50/50 border-red-100'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4.5 h-4.5 text-red-400 shrink-0" />
                    <span className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      Overdraft Fee
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-black text-red-400">
                    -$35.00 FEE TRIGGERED
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-red-950/5 border-red-500/10' : 'bg-red-50/50 border-red-100'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-4.5 h-4.5 text-red-400 shrink-0" />
                    <span className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      Late Fee
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-black text-red-400">
                    +$50.00 FEE APPLIED
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-red-950/5 border-red-500/10' : 'bg-red-50/50 border-red-100'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <Frown className="w-4.5 h-4.5 text-red-400 shrink-0" />
                    <span className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      Overall Stress
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-black text-red-400">
                    🔴 HIGH ANXIETY
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>UNFAIR BANK HOLES</span>
              <span className="font-bold text-red-400">$85.00 IN PENALTIES</span>
            </div>
          </motion.div>

          {/* COLUMN 2: WITH KAVROL */}
          <motion.div
            onMouseEnter={() => setHoveredCard('with')}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{ y: -3 }}
            className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
              isDark
                ? hoveredCard === 'with'
                  ? 'bg-brand-green-950/15 border-brand-green-500/40 shadow-[0_4px_30px_rgba(34,197,94,0.15)]'
                  : 'bg-zinc-950/40 border-zinc-850'
                : hoveredCard === 'with'
                  ? 'bg-brand-green-50/50 border-brand-green-200'
                  : 'bg-white border-zinc-200'
            }`}
            id="comparison-with-kavrol"
          >
            {/* Top indicator bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green-500" />

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-black text-brand-green-500 tracking-wider">
                  KAVROL BILL PROTECTION
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-green-500/10 text-brand-green-400 border border-brand-green-500/20">
                  <Smile className="w-3 h-3 text-brand-green-400" />
                  PROTECTED
                </span>
              </div>

              <div className="space-y-1">
                <h5 className={`text-lg font-display font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                  With Kavrol
                </h5>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                  Kavrol automatically steps in to bridge timing delays before your bills fail, at 0% interest.
                </p>
              </div>

              {/* Secure Points */}
              <div className="space-y-3 pt-2">
                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-brand-green-950/5 border-brand-green-500/10' : 'bg-brand-green-50/30 border-brand-green-100'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4.5 h-4.5 text-brand-green-500 shrink-0" />
                    <span className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      Bill Paid
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-black text-brand-green-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-green-400 animate-spin" />
                    ✓ CONFIRMED PAID
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-brand-green-950/5 border-brand-green-500/10' : 'bg-brand-green-50/30 border-brand-green-100'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-green-500 shrink-0" />
                    <span className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      No Overdraft Fees
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-black text-brand-green-400">
                    $0.00 ZERO FEES
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-brand-green-950/5 border-brand-green-500/10' : 'bg-brand-green-50/30 border-brand-green-100'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-brand-green-500 shrink-0" />
                    <span className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      No Late Fees
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-black text-brand-green-400">
                    $0.00 NO PENALTIES
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-brand-green-950/5 border-brand-green-500/10' : 'bg-brand-green-50/30 border-brand-green-100'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <Smile className="w-4.5 h-4.5 text-brand-green-500 shrink-0" />
                    <span className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      Peace of Mind
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-black text-brand-green-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-green-400 animate-spin" />
                    ✓ CALM & EFFORTLESS
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>AUTOMATIC SAFETY BUFFER</span>
              <span className="font-bold text-brand-green-400">$0.00 TOTAL COSTS</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
