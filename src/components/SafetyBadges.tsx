import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Landmark, CheckCircle } from 'lucide-react';

interface SafetyBadgesProps {
  theme: 'dark' | 'light';
}

export const SafetyBadges: React.FC<SafetyBadgesProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const badges = [
    {
      icon: Shield,
      title: 'Plaid Secure Connection',
      desc: 'Seamless bank integration with bank-grade security protocols.',
      label: 'READ-ONLY ACCESS',
    },
    {
      icon: Key,
      title: '256-Bit AES Encryption',
      desc: 'Your financial credentials and personal data are fully encrypted.',
      label: 'MILITARY GRADE',
    },
    {
      icon: Landmark,
      title: 'FDIC-Insured Partners',
      desc: 'Our network partner banks hold funds protected up to $250,000.',
      label: 'GOVERNMENT BACKED',
    },
    {
      icon: CheckCircle,
      title: 'Zero Credit Impact',
      desc: 'No hard pulls, no credit scores required, and absolutely no credit reporting.',
      label: '0% CREDIT RISK',
    },
  ];

  return (
    <div className="w-full" id="safety-trust-badge-grid">
      <div className={`rounded-3xl p-6 border transition-all duration-300 ${
        isDark 
          ? 'bg-zinc-900/40 border-zinc-800/80 shadow-xl' 
          : 'bg-white border-zinc-200 shadow-lg shadow-zinc-200/30'
      }`}>
        {/* Title */}
        <div className="mb-6">
          <span className="text-[10px] font-mono font-bold tracking-widest text-brand-green-500 uppercase">
            TRUST & SECURITY CERTIFICATIONS
          </span>
          <h4 className={`text-base font-display font-bold mt-1 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
            Safe, Transparent, & Built for Peace of Mind
          </h4>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge, idx) => {
            const BadgeIcon = badge.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between min-h-[140px] transition-all duration-300 ${
                  isDark 
                    ? 'bg-zinc-950/80 border-zinc-900/80 hover:border-brand-green-500/25 hover:bg-zinc-950/95' 
                    : 'bg-zinc-50/50 border-zinc-200/60 hover:border-brand-green-500/20 hover:bg-zinc-50'
                }`}
              >
                <div>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${
                    isDark ? 'bg-zinc-900 text-brand-green-500 border border-zinc-800' : 'bg-zinc-100 text-brand-green-600 border border-zinc-200'
                  }`}>
                    <BadgeIcon className="w-4 h-4" />
                  </div>
                  <h5 className={`text-xs font-bold leading-snug mb-1 ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
                    {badge.title}
                  </h5>
                  <p className={`text-[10px] leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    {badge.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-dashed border-zinc-800/10 text-[8px] font-mono font-bold text-brand-green-500 tracking-wider">
                  {badge.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
