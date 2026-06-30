import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { WaitlistSubmission } from '../types';

interface WaitlistSuccessScreenProps {
  submission: WaitlistSubmission;
  theme: 'dark' | 'light';
  onReturn: () => void;
}

export const WaitlistSuccessScreen: React.FC<WaitlistSuccessScreenProps> = ({
  submission,
  theme,
  onReturn,
}) => {
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full max-w-md mx-auto"
      id="waitlist-success-screen"
    >
      <div className={`p-8 rounded-3xl border relative overflow-hidden shadow-xl text-center space-y-6 ${
        isDark 
          ? 'bg-zinc-950 border-zinc-900 text-white shadow-black/40' 
          : 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-200/30'
      }`}>
        {/* Soft green ambient success glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-green-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* Subtle pulsing green checkmark */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-brand-green-500/10 flex items-center justify-center border border-brand-green-500/20 text-brand-green-500">
              <Check className="w-6 h-6" />
            </div>
            {/* Single subtle checkmark pulse ring */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-brand-green-500/30 pointer-events-none"
            />
          </div>
        </div>

        {/* Core Header and Description */}
        <div className="space-y-3">
          <h3 className={`text-xl font-display font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            You're on the Kavrol waitlist 🎉
          </h3>
          <p className={`text-sm leading-relaxed max-w-xs mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
            We’ll notify you when your access is ready.
          </p>
        </div>

        {/* Return to Home Action Button */}
        <div className="pt-2">
          <button
            onClick={onReturn}
            className="w-full py-3 rounded-xl bg-brand-green-500 text-zinc-950 font-bold text-xs hover:bg-brand-green-400 transition-all active:scale-95 shadow-md uppercase tracking-wider font-mono cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            Return to Home
          </button>
        </div>
      </div>
    </motion.div>
  );
};

