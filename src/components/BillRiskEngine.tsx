import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'Safe' | 'At Risk' | 'Needs Protection' | 'Protected';
  reason: string;
  color: string;
}

interface BillRiskEngineProps {
  theme: 'dark' | 'light';
}

interface StatusBadgeWithTooltipProps {
  status: 'Safe' | 'At Risk' | 'Needs Protection' | 'Protected';
  isDark: boolean;
}

const StatusBadgeWithTooltip: React.FC<StatusBadgeWithTooltipProps> = ({ status, isDark }) => {
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);

  const getExplanation = (status: string) => {
    switch (status) {
      case 'Safe':
        return 'No timing mismatch—your balance or paycheck will comfortably cover this bill.';
      case 'At Risk':
        return 'Your balance is currently lower than this upcoming bill.';
      case 'Needs Protection':
        return 'Payday is after the due date. Standard billing will fail without protection.';
      case 'Protected':
        return 'Kavrol has secured a timing buffer to cover this payment cleanly with zero fees.';
      default:
        return '';
    }
  };

  const badgeContent = () => {
    switch (status) {
      case 'Safe':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>SAFE</span>
          </span>
        );
      case 'Protected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-brand-green-500/15 text-brand-green-400 border border-brand-green-500/30">
            <ShieldCheck className="w-3 h-3 text-brand-green-400" />
            <span>PROTECTED</span>
          </span>
        );
      case 'At Risk':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            <span>AT RISK</span>
          </span>
        );
      case 'Needs Protection':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertCircle className="w-3 h-3 animate-pulse" />
            <span>NEEDS PROTECTION</span>
          </span>
        );
    }
  };

  return (
    <div 
      className="relative z-20"
      onMouseEnter={() => setIsTooltipHovered(true)}
      onMouseLeave={() => setIsTooltipHovered(false)}
    >
      {badgeContent()}
      <AnimatePresence>
        {isTooltipHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute bottom-full right-0 mb-2 p-2.5 w-48 rounded-xl border shadow-xl text-[10px] font-sans leading-normal font-medium z-[100] text-center pointer-events-none ${
              isDark 
                ? 'bg-zinc-950 border-zinc-800 text-zinc-200 shadow-black/85' 
                : 'bg-white border-zinc-200 text-zinc-700 shadow-zinc-300/60'
            }`}
          >
            {getExplanation(status)}
            {/* Tooltip triangle indicator */}
            <div className={`absolute top-full right-4 -mt-[1px] w-2 h-2 rotate-45 border-r border-b ${
              isDark 
                ? 'bg-zinc-950 border-zinc-800' 
                : 'bg-white border-zinc-200'
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const BillRiskEngine: React.FC<BillRiskEngineProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [hoveredBill, setHoveredBill] = useState<string | null>(null);
  const [expandedBill, setExpandedBill] = useState<string | null>(null);

  const bills: Bill[] = [
    {
      id: '1',
      name: 'Rent',
      amount: 1500,
      dueDate: 'July 3',
      status: 'Needs Protection',
      reason: 'Your Rent is due, but your paycheck is 7 days away. Kavrol will predict this shortfall and step in to help protect the payment.',
      color: 'red',
    },
    {
      id: '2',
      name: 'Electric Bill',
      amount: 180,
      dueDate: 'July 5',
      status: 'Needs Protection',
      reason: 'A standard checking account would bounce this payment or charge an expensive bank overdraft fee because your paycheck has not arrived yet.',
      color: 'red',
    },
    {
      id: '3',
      name: 'Insurance',
      amount: 210,
      dueDate: 'July 7',
      status: 'At Risk',
      reason: 'Your balance margin is tight. Standard billing could leave your account overdrawn before your deposits clear.',
      color: 'yellow',
    },
    {
      id: '4',
      name: 'Internet',
      amount: 75,
      dueDate: 'July 12',
      status: 'Safe',
      reason: 'This bill is due after your scheduled payday. Your account will have plenty of funds to cover it automatically.',
      color: 'green',
    },
    {
      id: '5',
      name: 'Student Loan',
      amount: 350,
      dueDate: 'July 4',
      status: 'Protected',
      reason: 'Kavrol has already set aside a timing buffer to cover this payment on time. No overdraft fees, zero interest.',
      color: 'brand-green',
    }
  ];



  const renderMiniTimeline = (bill: Bill) => {
    let steps: { date: string; label: string; balance: string; status: 'ok' | 'fail' | 'warn' | 'active' }[] = [];
    
    if (bill.id === '1') {
      steps = [
        { date: 'Jul 1', label: 'Starting Balance', balance: '$1,150', status: 'ok' },
        { date: 'Jul 3', label: 'Rent Due ($1,500)', balance: '-$350', status: 'fail' },
        { date: 'Jul 10', label: 'Payday Arrives', balance: '$1,450', status: 'active' },
      ];
    } else if (bill.id === '2') {
      steps = [
        { date: 'Jul 1', label: 'Starting Balance', balance: '$1,150', status: 'ok' },
        { date: 'Jul 5', label: 'Electric Bill ($180)', balance: '-$530', status: 'fail' },
        { date: 'Jul 10', label: 'Payday Arrives', balance: '$1,270', status: 'active' },
      ];
    } else if (bill.id === '3') {
      steps = [
        { date: 'Jul 1', label: 'Starting Balance', balance: '$1,150', status: 'ok' },
        { date: 'Jul 7', label: 'Insurance Due ($210)', balance: '-$740', status: 'warn' },
        { date: 'Jul 10', label: 'Payday Arrives', balance: '$1,060', status: 'active' },
      ];
    } else if (bill.id === '4') {
      steps = [
        { date: 'Jul 10', label: 'Payday Deposited', balance: '$2,950', status: 'ok' },
        { date: 'Jul 12', label: 'Internet ($75)', balance: '$2,875', status: 'ok' },
      ];
    } else if (bill.id === '5') {
      steps = [
        { date: 'Jul 1', label: 'Balance Shortfall', balance: '-$350', status: 'fail' },
        { date: 'Jul 4', label: 'Kavrol Protected', balance: '$0', status: 'active' },
        { date: 'Jul 10', label: 'Payday Restored', balance: '$1,450', status: 'ok' },
      ];
    }

    return (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`mt-3 p-4 rounded-2xl border overflow-hidden ${
          isDark ? 'bg-zinc-950 border-zinc-850' : 'bg-white border-zinc-200'
        }`}
      >
        <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">
          Bill Due vs. Payday Timeline
        </p>
        <div className="relative flex items-center justify-between gap-1 pl-1">
          {/* Connection line */}
          <div className={`absolute top-4 left-6 right-6 h-0.5 ${isDark ? 'bg-zinc-800/60' : 'bg-zinc-100'}`} />
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center relative z-10 text-center flex-1">
              <span className="text-[8px] font-mono text-zinc-400 font-bold mb-1">{step.date}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                step.status === 'ok'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : step.status === 'fail'
                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                    : step.status === 'warn'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-brand-green-500/10 border-brand-green-500/30 text-brand-green-400'
              }`}>
                <span className="text-[9px] font-mono font-bold">{step.balance}</span>
              </div>
              <span className={`text-[8px] font-display font-semibold mt-1.5 leading-tight truncate max-w-[85px] ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full" id="bill-risk-engine-system">
      <div className={`rounded-3xl p-6 border transition-all duration-300 ${
        isDark ? 'bg-zinc-900/40 border-zinc-900 shadow-2xl' : 'bg-zinc-50 border-zinc-200'
      }`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold tracking-widest text-brand-green-500 uppercase">
                We watch your upcoming bills
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green-500"></span>
              </span>
            </div>
            <h4 className={`text-xl font-display font-bold mt-1 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
              Bills That Need Attention
            </h4>
            <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Click on any bill below to see the schedule delay analysis.
            </p>
          </div>
          <span className="text-[10px] font-mono px-3 py-1 bg-zinc-950/40 border border-zinc-900 text-zinc-400 rounded-lg select-none">
            {bills.length} BILLS MONITORED
          </span>
        </div>

        {/* List of Bills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bills.map((bill) => {
            const isExpanded = expandedBill === bill.id;
            return (
              <div
                key={bill.id}
                className="relative flex flex-col"
                onMouseEnter={() => setHoveredBill(bill.id)}
                onMouseLeave={() => setHoveredBill(null)}
                id={`bill-card-item-${bill.id}`}
              >
                <motion.div
                  onClick={() => setExpandedBill(isExpanded ? null : bill.id)}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[140px] ${
                    isDark
                      ? (hoveredBill === bill.id || isExpanded)
                        ? bill.status === 'Needs Protection'
                          ? 'bg-red-950/10 border-red-500/40 shadow-lg shadow-red-950/10'
                          : bill.status === 'At Risk'
                            ? 'bg-amber-950/10 border-amber-500/40 shadow-lg shadow-amber-950/10'
                            : 'bg-emerald-950/10 border-emerald-500/40 shadow-lg shadow-emerald-950/10'
                        : 'bg-zinc-950/40 border-zinc-850 hover:bg-zinc-950/60'
                      : (hoveredBill === bill.id || isExpanded)
                        ? bill.status === 'Needs Protection'
                          ? 'bg-red-5 border-red-200 shadow-md'
                          : bill.status === 'At Risk'
                            ? 'bg-amber-5 border-amber-200 shadow-md'
                            : 'bg-emerald-5 border-emerald-200 shadow-md'
                        : 'bg-white border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className={`text-[9px] font-mono font-bold tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      DUE {bill.dueDate.toUpperCase()}
                    </span>
                    <StatusBadgeWithTooltip status={bill.status} isDark={isDark} />
                  </div>

                  <div className="mt-4 flex justify-between items-end w-full">
                    <div className="space-y-0.5">
                      <h5 className={`text-sm font-display font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        {bill.name}
                      </h5>
                      <div className="flex items-center gap-1 text-lg font-bold font-mono">
                        <span className="text-zinc-500 text-sm font-normal">$</span>
                        <span>{bill.amount.toLocaleString()}</span>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{isExpanded ? "Hide timeline" : "Show timeline"}</span>
                    </span>
                  </div>
                </motion.div>

                {/* Expanded Micro-timeline */}
                <AnimatePresence>
                  {isExpanded && renderMiniTimeline(bill)}
                </AnimatePresence>

                {/* Hover Diagnostics Card */}
                <AnimatePresence>
                  {hoveredBill === bill.id && !isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute left-0 right-0 top-full mt-2 p-4 rounded-xl border shadow-xl z-50 pointer-events-none ${
                        isDark
                          ? bill.status === 'Needs Protection'
                            ? 'bg-zinc-950 border-red-500/40 text-red-200'
                            : bill.status === 'At Risk'
                              ? 'bg-zinc-950 border-amber-500/40 text-amber-200'
                              : 'bg-zinc-950 border-emerald-500/40 text-emerald-200'
                          : bill.status === 'Needs Protection'
                            ? 'bg-white border-red-200 text-red-900 shadow-red-200/20'
                            : bill.status === 'At Risk'
                              ? 'bg-white border-amber-200 text-amber-900 shadow-amber-200/20'
                              : 'bg-white border-emerald-200 text-emerald-900 shadow-emerald-200/20'
                      }`}
                    >
                      <div className="flex gap-2 items-start">
                        {bill.status === 'Needs Protection' ? (
                          <AlertCircle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
                        ) : bill.status === 'At Risk' ? (
                          <AlertTriangle className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-0.5" />
                        ) : (
                          <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-1">
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider">
                            SCHEDULE ANALYSIS DETAILS
                          </p>
                          <p className="text-xs leading-relaxed font-medium">
                            {bill.reason}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
