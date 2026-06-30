import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface MismatchCalendarProps {
  theme: 'dark' | 'light';
}

export const MismatchCalendar: React.FC<MismatchCalendarProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [alignmentMode, setAlignmentMode] = useState<'misaligned' | 'aligned'>('misaligned');
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Define the timeline milestones
  const timelineDays = [
    {
      day: 1,
      label: 'July 1',
      title: 'Initial Balance',
      amount: '$1,150.00',
      desc: 'You start with enough buffer for daily spending, but rent is approaching.',
      status: 'neutral',
    },
    {
      day: 3,
      label: 'July 3',
      title: 'Rent Bill Due',
      amount: '-$1,500.00',
      desc: 'Your landlord initiates direct debit of $1,500.',
      status: 'critical',
    },
    {
      day: 7,
      label: 'July 4 - 9',
      title: 'The Gap Days',
      amount: 'Mismatch Area',
      desc: 'This is the timing gap. Standard accounts face overdraft penalties or failed payments.',
      status: 'critical',
    },
    {
      day: 10,
      label: 'July 10',
      title: 'Payday Arrival',
      amount: '+$1,500.00',
      desc: 'Your direct deposit arrives, but it is 7 days too late under standard bank models.',
      status: 'success',
    },
  ];

  return (
    <div className="w-full" id="mismatch-timeline-card-system">
      <motion.div
        whileHover={{ y: -2 }}
        className={`rounded-3xl p-6 border transition-all duration-300 ${
          isDark
            ? 'bg-zinc-900/40 border-zinc-800/80 shadow-2xl shadow-zinc-950/50'
            : 'bg-white border-zinc-200/80 shadow-xl shadow-zinc-200/30'
        }`}
      >
        {/* Card Header & Alignment Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold tracking-wider text-brand-green-500 uppercase">
                Interactive Timing Tool
              </span>
              <span className={`h-1.5 w-1.5 rounded-full bg-brand-green-500 animate-pulse`} />
            </div>
            <h4 className={`text-xl font-display font-bold mt-1 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
              Payday Alignment Timeline
            </h4>
            <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Select a schedule alignment to see how Kavrol resolves timing gaps.
            </p>
          </div>

          {/* Dual Toggle Slider */}
          <div className={`p-1 rounded-xl flex items-center transition-all ${
            isDark ? 'bg-zinc-950/80 border border-zinc-800' : 'bg-zinc-100 border border-zinc-200'
          }`}>
            <button
              onClick={() => setAlignmentMode('misaligned')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                alignmentMode === 'misaligned'
                  ? 'bg-red-500 text-white shadow-md'
                  : isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              Misaligned Payday
            </button>
            <button
              onClick={() => setAlignmentMode('aligned')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                alignmentMode === 'aligned'
                  ? 'bg-brand-green-500 text-zinc-950 shadow-md'
                  : isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              Aligned (Kavrol Mode)
            </button>
          </div>
        </div>

        {/* The Timeline Visualization Track */}
        <div className="relative py-12 px-2 overflow-x-auto md:overflow-x-visible">
          <div className="min-w-[600px] relative">
            {/* Horizontal connecting track line */}
            <div className={`absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 rounded-full transition-colors duration-500 ${
              alignmentMode === 'aligned'
                ? 'bg-gradient-to-r from-brand-green-500 via-emerald-400 to-brand-green-500'
                : 'bg-gradient-to-r from-zinc-700 via-red-500 to-brand-green-500'
            }`} />

            {/* Timestep Nodes */}
            <div className="flex justify-between items-center relative">
              {timelineDays.map((item, idx) => {
                const isGapDay = item.day === 7;
                const isRentDay = item.day === 3;
                const isPayday = item.day === 10;

                // Determine active state design depending on alignment mode
                let dotStyle = 'bg-zinc-800 border-zinc-700 text-zinc-400';
                let pillText = item.amount;
                let outcomeLabel = 'Neutral';

                if (alignmentMode === 'aligned') {
                  dotStyle = 'bg-brand-green-500 border-brand-green-400 text-zinc-950 shadow-[0_0_15px_rgba(34,197,94,0.3)]';
                  if (isGapDay) {
                    pillText = 'Zero Fee Protected';
                    outcomeLabel = 'Fully Covered';
                  } else if (isRentDay) {
                    pillText = 'Paid Instantly';
                    outcomeLabel = 'Rent Paid On-Time';
                  }
                } else {
                  // Misaligned mode
                  if (isGapDay) {
                    dotStyle = 'bg-red-500 border-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse';
                    pillText = 'Risk Area';
                    outcomeLabel = 'Overdraft / Late Fee Threat';
                  } else if (isRentDay) {
                    dotStyle = 'bg-amber-500 border-amber-400 text-zinc-950';
                    pillText = 'Shortfall -$350';
                    outcomeLabel = 'Pending Payday';
                  } else if (isPayday) {
                    dotStyle = 'bg-brand-green-500 border-brand-green-400 text-zinc-950';
                  }
                }

                const isHovered = hoveredDay === idx;

                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center relative z-10 w-1/4 cursor-pointer"
                    onMouseEnter={() => setHoveredDay(idx)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {/* Floating Info Tooltip on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          className={`absolute bottom-full mb-4 w-56 p-3 rounded-xl border text-left shadow-lg z-50 transition-all ${
                            isDark
                              ? 'bg-zinc-950/95 border-zinc-800 text-white'
                              : 'bg-white/95 border-zinc-200 text-zinc-900 shadow-zinc-200/50'
                          }`}
                        >
                          <p className="text-[10px] font-mono text-brand-green-500 uppercase font-semibold">
                            {item.label}
                          </p>
                          <p className="text-xs font-bold mt-1">{item.title}</p>
                          <p className={`text-[10px] mt-1 leading-normal ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Circle Node */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${dotStyle}`}
                    >
                      {isRentDay ? 'Rent' : isPayday ? 'Pay' : item.day === 1 ? 'Start' : 'Gap'}
                    </motion.div>

                    {/* Labelling */}
                    <span className={`text-[11px] font-bold mt-2.5 block ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      {item.label}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 block mt-0.5">
                      {pillText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Result Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={alignmentMode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`p-4 rounded-2xl flex items-start gap-3 mt-4 border transition-colors duration-300 ${
              alignmentMode === 'aligned'
                ? isDark ? 'bg-brand-green-950/10 border-brand-green-900/30 text-brand-green-400' : 'bg-brand-green-50 border-brand-green-100 text-brand-green-800'
                : isDark ? 'bg-red-950/10 border-red-900/30 text-red-400' : 'bg-red-50 border-red-100 text-red-800'
            }`}
          >
            {alignmentMode === 'aligned' ? (
              <CheckCircle2 className="w-5 h-5 text-brand-green-500 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            )}
            <div className="text-xs space-y-1">
              <p className="font-bold">
                {alignmentMode === 'aligned'
                  ? 'Aligned Mode: Zero Stress Timing'
                  : 'Payday Timing Mismatch: 7-Day Danger Window'}
              </p>
              <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>
                {alignmentMode === 'aligned'
                  ? 'Kavrol predictions align your paycheck seamlessly with the rent due date. No late penalties, zero bank overdraft charges, and total structural confidence.'
                  : 'Rent is due July 3, but income is locked until July 10. For 7 full days, you lack the buffer to safely pay. Banks penalize you up to $35 for this natural timeline difference.'}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
