import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, 
  Landmark, 
  Shield, 
  ShieldCheck, 
  Sparkles, 
  Coins, 
  FileText, 
  Info,
  Clock,
  ArrowRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

interface RepaymentFlow3DProps {
  theme: 'dark' | 'light';
}

export const RepaymentFlow3D: React.FC<RepaymentFlow3DProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  // State for active animation phase:
  // 0: Paycheck Arrives (+$1,800 direct deposit flows)
  // 1: Automatic Settlement (-$350 branches off, rest stays)
  // 2: Balance Stabilizes (All eligible bills protected, soft ripple)
  // 3: Calm Idle
  const [phase, setPhase] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Auto-cycling phases
  useEffect(() => {
    if (isPaused) return;

    const phaseDurations = [5000, 5000, 5000, 6000]; // Duration per phase
    const timer = setTimeout(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, phaseDurations[phase]);

    return () => clearTimeout(timer);
  }, [phase, isPaused]);

  // Progressive number counter hook
  const useProgressiveValue = (target: number, duration: number = 1200) => {
    const [current, setCurrent] = useState(target);
    const startValueRef = useRef(current);
    const targetValueRef = useRef(target);

    useEffect(() => {
      startValueRef.current = current;
      targetValueRef.current = target;
      let frameId: number;
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // EaseInOutQuad
        const easeProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const nextVal = Math.floor(startValueRef.current + easeProgress * (target - startValueRef.current));
        setCurrent(nextVal);

        if (progress < 1) {
          frameId = window.requestAnimationFrame(step);
        }
      };

      frameId = window.requestAnimationFrame(step);
      return () => window.cancelAnimationFrame(frameId);
    }, [target]);

    return current;
  };

  // Determine target account balances based on active phase
  let targetCheckingBalance = 800;
  if (phase === 0) {
    targetCheckingBalance = 2600; // $800 + $1800 paycheck
  } else if (phase === 1) {
    targetCheckingBalance = 2250; // $2600 - $350 Kavrol settlement
  } else if (phase === 2 || phase === 3) {
    targetCheckingBalance = 2250; // Stabilized
  }

  const currentChecking = useProgressiveValue(targetCheckingBalance, 1500);

  // Micro-interaction tooltips config
  const nodeInfo = {
    employer: {
      title: "🏢 Employer Payroll",
      summary: "Direct deposit received.",
      details: "Your regular employer paycheck of $1,800 is processed and travels through the automated clearing house (ACH) network."
    },
    checking: {
      title: "🏦 Checking Account",
      summary: "Funds available.",
      details: "Your primary checking account balance goes from $800 to $2,600. The remaining balance ($2,250) is fully yours and stays in your control."
    },
    kavrol: {
      title: "🛡️ Kavrol Protection",
      summary: "Only the protected amount settles.",
      details: "Kavrol identifies and settles only the exact temporary timing gap of $350. No more, no less. Zero interest is charged."
    },
    protected: {
      title: "✅ Protected Balance",
      summary: "Timing gap closed.",
      details: "Your bills remain fully covered and late fees are completely avoided. The entire process returns to a secure, stable idle state."
    }
  };

  // Setup money flow particles for the dynamic pipeline animation
  const renderParticles = (type: 'green' | 'purple') => {
    const particleCount = 12;
    const color = type === 'green' ? 'bg-emerald-400' : 'bg-purple-400';
    return Array.from({ length: particleCount }).map((_, i) => {
      const delay = (i * 0.3).toFixed(1);
      const duration = (2 + Math.random() * 1.5).toFixed(1);
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: ['0%', '100%'],
            y: [0, (Math.sin(i) * 6), 0],
          }}
          transition={{
            repeat: Infinity,
            duration: Number(duration),
            delay: Number(delay),
            ease: "easeInOut",
          }}
          className={`absolute w-1.5 h-1.5 rounded-full shadow-lg pointer-events-none ${color}`}
          style={{
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      );
    });
  };

  return (
    <div className="w-full" id="repayment-ledger-flow">
      <div className={`rounded-3xl p-6 md:p-8 border transition-all duration-300 relative overflow-hidden ${
        isDark ? 'bg-zinc-900/40 border-zinc-900 shadow-2xl' : 'bg-white border-zinc-200/80 shadow-xl shadow-zinc-100/40'
      }`}>
        
        {/* Background glow accents for the premium fintech vibe */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-green-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-500/10 pb-6 relative z-10">
          <div>
            <h4 className={`text-2xl md:text-3xl font-display font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Safe, Hands-Free Settlement
            </h4>
            <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              See how money flows transparently and safely through your secure banking network.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-semibold flex items-center gap-1.5 transition-all ${
                isPaused 
                  ? 'bg-brand-green-500/10 border-brand-green-500/30 text-brand-green-400' 
                  : isDark 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' 
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPaused ? '' : 'animate-spin'}`} style={{ animationDuration: '6s' }} />
              <span>{isPaused ? 'Resume Auto-Flow' : 'Pause Stream'}</span>
            </button>
            <div className="text-[10px] font-mono px-3 py-1.5 rounded-xl bg-zinc-500/5 border border-zinc-500/10 text-zinc-400 font-semibold hidden sm:inline-block">
              Phase: <span className="text-brand-green-400 font-bold">Step {phase + 1}/4</span>
            </div>
          </div>
        </div>

        {/* Outer 3D visual workspace and phase description card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
          
          {/* LEFT 8 COLUMNS: The 3D Glassmorphism Financial Pipeline */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            {/* 3D Scene Wrapper with high perspective */}
            <div 
              className={`relative rounded-3xl p-6 md:p-10 border overflow-hidden flex flex-col justify-center min-h-[460px] ${
                isDark 
                  ? 'bg-zinc-950/90 border-zinc-800/80 shadow-inner' 
                  : 'bg-zinc-50/60 border-zinc-150 shadow-inner shadow-zinc-200/20'
              }`}
              style={{ perspective: 1400 }}
            >
              
              {/* Perspective grid lines for deep tech/mono visual aesthetic */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

              {/* Responsive pipeline container - Row on desktop, Column on mobile */}
              <div 
                className="w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 relative py-6"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(8deg) rotateY(-4deg)',
                }}
              >
                
                {/* ================= NODE 1: EMPLOYER PAYCHECK ================= */}
                <div className="relative w-full max-w-[170px] md:max-w-[145px] lg:max-w-[165px]">
                  <motion.div
                    onMouseEnter={() => { setHoveredNode('employer'); setIsPaused(true); }}
                    onMouseLeave={() => { setHoveredNode(null); setIsPaused(false); }}
                    whileHover={{ scale: 1.05, translateZ: 25, rotateY: 5 }}
                    animate={{
                      y: [0, -5, 0],
                      borderColor: phase === 0 ? 'rgba(16, 185, 129, 0.5)' : isDark ? '#27272a' : '#e4e4e7',
                      boxShadow: phase === 0
                        ? '0 20px 40px -10px rgba(16, 185, 129, 0.25), inset 0 1px 1px rgba(255,255,255,0.1)'
                        : '0 8px 16px -4px rgba(0,0,0,0.1)'
                    }}
                    transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                    className={`p-4 rounded-2xl border backdrop-blur-xl cursor-help relative flex flex-col items-center text-center transition-all duration-300 ${
                      isDark ? 'bg-zinc-900/80 text-white' : 'bg-white text-zinc-900'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Paycheck document sliding in */}
                    <AnimatePresence>
                      {phase === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -25, rotate: -15, scale: 0.8 }}
                          animate={{ opacity: 1, y: -12, rotate: 10, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.8 }}
                          className="absolute -top-7 -right-2 w-11 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex flex-col justify-between p-2 shadow-xl shadow-emerald-500/10 backdrop-blur-md pointer-events-none"
                          style={{ translateZ: 30 }}
                        >
                          <FileText className="w-5 h-5 text-emerald-400" />
                          <div className="w-full h-1 bg-emerald-500/30 rounded" />
                          <div className="w-full h-1 bg-emerald-500/20 rounded" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className={`p-3 rounded-xl mb-3 transition-colors ${
                      phase === 0 ? 'bg-emerald-500/20 text-emerald-400 shadow-inner' : 'bg-zinc-500/10 text-zinc-400'
                    }`}>
                      <Building className="w-6 h-6" />
                    </div>

                    <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 font-bold block">
                      Employer
                    </span>
                    <h5 className="text-xs font-display font-bold mt-1">
                      Direct Deposit
                    </h5>

                    <div className="mt-2 text-xs font-mono font-bold text-emerald-400">
                      +$1,800.00
                    </div>

                    <div className="mt-2.5">
                      <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        phase === 0 
                          ? 'bg-emerald-500/25 text-emerald-300 animate-pulse border border-emerald-500/20' 
                          : 'bg-zinc-500/10 text-zinc-400 border border-transparent'
                      }`}>
                        {phase === 0 ? 'Receiving...' : 'Cleared ✓'}
                      </span>
                    </div>
                  </motion.div>

                  {/* Tooltip detail block */}
                  <AnimatePresence>
                    {hoveredNode === 'employer' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-left shadow-2xl"
                      >
                        <p className="text-xs font-bold text-white">{nodeInfo.employer.title}</p>
                        <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">{nodeInfo.employer.details}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CONNECTION PIPELINE BEAM 1 */}
                <div className="relative flex-none h-12 w-1 md:h-1 md:flex-1 bg-zinc-800/80 rounded-full border border-zinc-700/20 min-h-[24px]">
                  {/* Glowing moving particles */}
                  {phase === 0 && renderParticles('green')}
                </div>

                {/* ================= NODE 2: CHECKING ACCOUNT ================= */}
                <div className="relative w-full max-w-[170px] md:max-w-[145px] lg:max-w-[165px]">
                  <motion.div
                    onMouseEnter={() => { setHoveredNode('checking'); setIsPaused(true); }}
                    onMouseLeave={() => { setHoveredNode(null); setIsPaused(false); }}
                    whileHover={{ scale: 1.05, translateZ: 25, rotateY: -2 }}
                    animate={{
                      y: [0, -5, 0],
                      borderColor: (phase === 0 || phase === 1) ? 'rgba(16, 185, 129, 0.5)' : isDark ? '#27272a' : '#e4e4e7',
                      boxShadow: (phase === 0 || phase === 1)
                        ? '0 20px 40px -10px rgba(16, 185, 129, 0.2), inset 0 1px 1px rgba(255,255,255,0.1)'
                        : '0 8px 16px -4px rgba(0,0,0,0.1)'
                    }}
                    transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.4 } }}
                    className={`p-4 rounded-2xl border backdrop-blur-xl cursor-help relative flex flex-col items-center text-center transition-all duration-300 ${
                      isDark ? 'bg-zinc-900/80 text-white' : 'bg-white text-zinc-900'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Floating premium metallic debit card */}
                    <motion.div
                      animate={{
                        y: [0, -4, 0],
                        rotateX: [15, 10, 15],
                        rotateY: [-15, -10, -15],
                        rotateZ: [-5, -8, -5]
                      }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                      className="absolute -top-7 -left-3 w-14 h-9 rounded-lg bg-gradient-to-tr from-brand-green-600 via-emerald-500 to-teal-400 border border-white/20 flex flex-col justify-between p-1.5 shadow-xl shadow-brand-green-500/20 backdrop-blur-sm pointer-events-none"
                      style={{ translateZ: 35 }}
                    >
                      <div className="w-2.5 h-1.5 rounded-sm bg-amber-400/90" />
                      <div className="flex items-center justify-between">
                        <span className="text-[4px] font-mono tracking-widest text-white/70">KAVROL</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      </div>
                    </motion.div>

                    <div className={`p-3 rounded-xl mb-3 transition-colors ${
                      (phase === 0 || phase === 1) ? 'bg-brand-green-500/20 text-brand-green-400 shadow-inner' : 'bg-zinc-500/10 text-zinc-400'
                    }`}>
                      <Landmark className="w-6 h-6" />
                    </div>

                    <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 font-bold block">
                      Ledger Account
                    </span>
                    <h5 className="text-xs font-display font-bold mt-1">
                      Checking Wallet
                    </h5>

                    {/* Progress Fill Indicator */}
                    <div className="mt-3 px-2 py-1.5 rounded-xl bg-zinc-950/40 border border-zinc-800/80 w-full relative overflow-hidden">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase block tracking-wide relative z-10">Available Balance</span>
                      <span className="text-xs font-mono font-extrabold text-brand-green-400 relative z-10 block mt-0.5">
                        ${currentChecking.toLocaleString()}
                      </span>
                      {/* Interactive glowing liquid bar inside the container */}
                      <motion.div
                        animate={{
                          height: phase === 0 ? '100%' : phase === 1 ? '75%' : '75%'
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute bottom-0 left-0 right-0 bg-brand-green-500/5 hover:bg-brand-green-500/10 pointer-events-none transition-colors border-t border-brand-green-500/10"
                      />
                    </div>

                    <div className="mt-2.5">
                      <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-zinc-500/10 text-zinc-400 font-bold">
                        Linked Secure Account
                      </span>
                    </div>
                  </motion.div>

                  {/* Tooltip detail block */}
                  <AnimatePresence>
                    {hoveredNode === 'checking' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-left shadow-2xl"
                      >
                        <p className="text-xs font-bold text-white">{nodeInfo.checking.title}</p>
                        <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">{nodeInfo.checking.details}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CONNECTION PIPELINE BEAM 2 */}
                <div className="relative flex-none h-12 w-1 md:h-1 md:flex-1 bg-zinc-800/80 rounded-full border border-zinc-700/20 min-h-[24px]">
                  {phase === 1 && renderParticles('purple')}
                  {/* Little custom settlement tag */}
                  <AnimatePresence>
                    {phase === 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded shadow-md z-20"
                      >
                        -$350.00 PROTECTION SETTLEMENT
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ================= NODE 3: KAVROL PROTECTION ================= */}
                <div className="relative w-full max-w-[170px] md:max-w-[145px] lg:max-w-[165px]">
                  <motion.div
                    onMouseEnter={() => { setHoveredNode('kavrol'); setIsPaused(true); }}
                    onMouseLeave={() => { setHoveredNode(null); setIsPaused(false); }}
                    whileHover={{ scale: 1.05, translateZ: 25, rotateY: -5 }}
                    animate={{
                      y: [0, -5, 0],
                      borderColor: phase === 1 ? 'rgba(168, 85, 247, 0.5)' : isDark ? '#27272a' : '#e4e4e7',
                      boxShadow: phase === 1
                        ? '0 20px 40px -10px rgba(168, 85, 247, 0.25), inset 0 1px 1px rgba(255,255,255,0.1)'
                        : '0 8px 16px -4px rgba(0,0,0,0.1)'
                    }}
                    transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.8 } }}
                    className={`p-4 rounded-2xl border backdrop-blur-xl cursor-help relative flex flex-col items-center text-center transition-all duration-300 ${
                      isDark ? 'bg-zinc-900/80 text-white' : 'bg-white text-zinc-900'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Floating Shield symbol */}
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                        rotate: [0, 8, 0],
                      }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      className="absolute -top-7 -right-2 w-11 h-11 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-xl backdrop-blur-md pointer-events-none animate-pulse"
                      style={{ translateZ: 30 }}
                    >
                      <Shield className="w-5 h-5" />
                    </motion.div>

                    <div className={`p-3 rounded-xl mb-3 transition-colors ${
                      phase === 1 ? 'bg-purple-500/20 text-purple-400 shadow-inner' : 'bg-zinc-500/10 text-zinc-400'
                    }`}>
                      <Shield className="w-6 h-6" />
                    </div>

                    <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 font-bold block">
                      Protection
                    </span>
                    <h5 className="text-xs font-display font-bold mt-1">
                      Kavrol Shield
                    </h5>

                    <div className="mt-2 text-xs font-mono font-bold text-purple-400">
                      -$350.00
                    </div>

                    <div className="mt-2.5">
                      <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        phase === 1 
                          ? 'bg-purple-500/25 text-purple-300 animate-pulse border border-purple-500/20' 
                          : 'bg-zinc-500/10 text-zinc-400 border border-transparent'
                      }`}>
                        {phase === 1 ? 'Settling shortfall...' : 'Settled ✓'}
                      </span>
                    </div>
                  </motion.div>

                  {/* Tooltip detail block */}
                  <AnimatePresence>
                    {hoveredNode === 'kavrol' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-left shadow-2xl"
                      >
                        <p className="text-xs font-bold text-white">{nodeInfo.kavrol.title}</p>
                        <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">{nodeInfo.kavrol.details}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CONNECTION PIPELINE BEAM 3 */}
                <div className="relative flex-none h-12 w-1 md:h-1 md:flex-1 bg-zinc-800/80 rounded-full border border-zinc-700/20 min-h-[24px]">
                  {(phase === 2 || phase === 3) && renderParticles('green')}
                </div>

                {/* ================= NODE 4: PROTECTED BALANCE ================= */}
                <div className="relative w-full max-w-[170px] md:max-w-[145px] lg:max-w-[165px]">
                  <motion.div
                    onMouseEnter={() => { setHoveredNode('protected'); setIsPaused(true); }}
                    onMouseLeave={() => { setHoveredNode(null); setIsPaused(false); }}
                    whileHover={{ scale: 1.05, translateZ: 25, rotateY: -8 }}
                    animate={{
                      y: [0, -5, 0],
                      borderColor: (phase === 2 || phase === 3) ? 'rgba(16, 185, 129, 0.5)' : isDark ? '#27272a' : '#e4e4e7',
                      boxShadow: (phase === 2 || phase === 3)
                        ? '0 20px 40px -10px rgba(16, 185, 129, 0.25), inset 0 1px 1px rgba(255,255,255,0.1)'
                        : '0 8px 16px -4px rgba(0,0,0,0.1)'
                    }}
                    transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.2 } }}
                    className={`p-4 rounded-2xl border backdrop-blur-xl cursor-help relative flex flex-col items-center text-center transition-all duration-300 ${
                      isDark ? 'bg-zinc-900/80 text-white' : 'bg-white text-zinc-900'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Ring ripples on active stable phase */}
                    <AnimatePresence>
                      {(phase === 2 || phase === 3) && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0.6 }}
                          animate={{ scale: 1.4, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
                          className="absolute inset-0 rounded-2xl border border-brand-green-500/35 pointer-events-none"
                        />
                      )}
                    </AnimatePresence>

                    <div className={`p-3 rounded-xl mb-3 transition-colors ${
                      (phase === 2 || phase === 3) ? 'bg-brand-green-500/20 text-brand-green-400 shadow-inner' : 'bg-zinc-500/10 text-zinc-400'
                    }`}>
                      <ShieldCheck className="w-6 h-6" />
                    </div>

                    <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 font-bold block">
                      Protected status
                    </span>
                    <h5 className="text-xs font-display font-bold mt-1">
                      Complete Balance
                    </h5>

                    <div className="mt-2 text-xs font-mono font-bold text-brand-green-400 flex items-center gap-1 justify-center">
                      ✓ Secured
                    </div>

                    <div className="mt-2.5">
                      <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        (phase === 2 || phase === 3) 
                          ? 'bg-brand-green-50/10 border border-brand-green-500/20 text-brand-green-400' 
                          : 'bg-zinc-500/10 text-zinc-400 border border-transparent'
                      }`}>
                        {(phase === 2 || phase === 3) ? 'Eligible bills secure' : 'Awaiting Flow'}
                      </span>
                    </div>
                  </motion.div>

                  {/* Tooltip detail block */}
                  <AnimatePresence>
                    {hoveredNode === 'protected' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-left shadow-2xl"
                      >
                        <p className="text-xs font-bold text-white">{nodeInfo.protected.title}</p>
                        <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">{nodeInfo.protected.details}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>

            {/* Bottom informational bar */}
            <div className={`p-4 rounded-2xl border text-xs flex items-center gap-3.5 ${
              isDark ? 'bg-zinc-950/40 border-zinc-900' : 'bg-zinc-50 border-zinc-150'
            }`}>
              <Info className="w-4.5 h-4.5 text-brand-green-500 shrink-0" />
              <p className={`leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                <strong>Real Timing Assurance:</strong> You instantly understand that Kavrol only settles what it temporarily protected ($350) and leaves the rest of your paycheck ($2,250) perfectly untouched in your checking account.
              </p>
            </div>
          </div>

          {/* RIGHT 4 COLUMNS: Synced Educational Milestones Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            
            <div className="space-y-4">
              <div className="text-center lg:text-left mb-2">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                  Journey Tracker
                </span>
                <h5 className={`text-base font-display font-extrabold mt-1 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  Settlement Timeline
                </h5>
              </div>

              {/* Step 1 Card: Paycheck Arrives */}
              <div
                onClick={() => { setPhase(0); setIsPaused(true); }}
                className={`p-4 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                  phase === 0 
                    ? isDark 
                      ? 'bg-zinc-900 border-brand-green-500/40 shadow-xl shadow-brand-green-500/5' 
                      : 'bg-zinc-50 border-brand-green-400 shadow-md shadow-zinc-100/50'
                    : isDark 
                      ? 'bg-zinc-950/20 border-zinc-900/60 opacity-70 hover:opacity-100 hover:border-zinc-800' 
                      : 'bg-white border-zinc-150 opacity-70 hover:opacity-100 hover:border-zinc-250'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    phase === 0 
                      ? 'bg-brand-green-500 border-brand-green-500 text-zinc-950' 
                      : phase > 0 
                        ? 'bg-brand-green-500/15 border-brand-green-500/30 text-brand-green-400'
                        : isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-100 border-zinc-200 text-zinc-500'
                  }`}>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 space-y-1 min-w-0 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase">Day 10 • 06:00 AM</span>
                      {phase === 0 && (
                        <span className="text-[8px] font-mono text-brand-green-400 font-bold flex items-center gap-1 animate-pulse">
                          ● RECEIVING
                        </span>
                      )}
                    </div>
                    <h5 className={`text-xs font-display font-extrabold ${isDark ? 'text-zinc-150' : 'text-zinc-900'}`}>
                      Paycheck Arrives
                    </h5>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-550'}`}>
                      Your direct deposit of $1,800 is safely credited to your primary checking account.
                    </p>
                    <div className="pt-2 border-t border-zinc-500/5 mt-2 flex items-center justify-between font-mono text-[9px] text-zinc-500">
                      <span>Ledger Activity</span>
                      <span className="font-bold text-xs text-emerald-500">+$1,800.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 Card: Automatic Settlement */}
              <div
                onClick={() => { setPhase(1); setIsPaused(true); }}
                className={`p-4 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                  phase === 1 
                    ? isDark 
                      ? 'bg-zinc-900 border-brand-green-500/40 shadow-xl shadow-brand-green-500/5' 
                      : 'bg-zinc-50 border-brand-green-400 shadow-md shadow-zinc-100/50'
                    : isDark 
                      ? 'bg-zinc-950/20 border-zinc-900/60 opacity-70 hover:opacity-100 hover:border-zinc-800' 
                      : 'bg-white border-zinc-150 opacity-70 hover:opacity-100 hover:border-zinc-250'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    phase === 1 
                      ? 'bg-brand-green-500 border-brand-green-500 text-zinc-950' 
                      : phase > 1 
                        ? 'bg-brand-green-500/15 border-brand-green-500/30 text-brand-green-400'
                        : isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-100 border-zinc-200 text-zinc-500'
                  }`}>
                    <Coins className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 space-y-1 min-w-0 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase">Day 10 • 08:00 AM</span>
                      {phase === 1 && (
                        <span className="text-[8px] font-mono text-purple-400 font-bold flex items-center gap-1 animate-pulse">
                          ● SETTLING
                        </span>
                      )}
                    </div>
                    <h5 className={`text-xs font-display font-extrabold ${isDark ? 'text-zinc-150' : 'text-zinc-900'}`}>
                      Automatic Settlement
                    </h5>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-550'}`}>
                      Kavrol automatically settles only the $350 protected shortfall amount, leaving the rest.
                    </p>
                    <div className="pt-2 border-t border-zinc-500/5 mt-2 flex items-center justify-between font-mono text-[9px] text-zinc-500">
                      <span>Settlement Cost</span>
                      <span className="font-bold text-xs text-purple-400">-$350.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 Card: Balance Stabilizes */}
              <div
                onClick={() => { setPhase(2); setIsPaused(true); }}
                className={`p-4 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                  phase === 2 
                    ? isDark 
                      ? 'bg-zinc-900 border-brand-green-500/40 shadow-xl shadow-brand-green-500/5' 
                      : 'bg-zinc-50 border-brand-green-400 shadow-md shadow-zinc-100/50'
                    : isDark 
                      ? 'bg-zinc-950/20 border-zinc-900/60 opacity-70 hover:opacity-100 hover:border-zinc-800' 
                      : 'bg-white border-zinc-150 opacity-70 hover:opacity-100 hover:border-zinc-250'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    phase === 2 
                      ? 'bg-brand-green-500 border-brand-green-500 text-zinc-950' 
                      : phase > 2 
                        ? 'bg-brand-green-500/15 border-brand-green-500/30 text-brand-green-400'
                        : isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-100 border-zinc-200 text-zinc-500'
                  }`}>
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 space-y-1 min-w-0 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase">Day 10 • Ongoing</span>
                      {phase === 2 && (
                        <span className="text-[8px] font-mono text-brand-green-400 font-bold flex items-center gap-1">
                          ● SECURED
                        </span>
                      )}
                    </div>
                    <h5 className={`text-xs font-display font-extrabold ${isDark ? 'text-zinc-150' : 'text-zinc-900'}`}>
                      Balance Stabilizes
                    </h5>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-550'}`}>
                      Your checking is fully settled at $2,250. The timing gap is closed with 0 fees.
                    </p>
                    <div className="pt-2 border-t border-zinc-500/5 mt-2 flex items-center justify-between font-mono text-[9px] text-zinc-500">
                      <span>Final Net Balance</span>
                      <span className="font-bold text-xs text-brand-green-400">$2,250.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 Card: Calm Idle State */}
              <div
                onClick={() => { setPhase(3); setIsPaused(true); }}
                className={`p-4 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                  phase === 3 
                    ? isDark 
                      ? 'bg-zinc-900 border-brand-green-500/40 shadow-xl shadow-brand-green-500/5' 
                      : 'bg-zinc-50 border-brand-green-400 shadow-md shadow-zinc-100/50'
                    : isDark 
                      ? 'bg-zinc-950/20 border-zinc-900/60 opacity-70 hover:opacity-100 hover:border-zinc-800' 
                      : 'bg-white border-zinc-150 opacity-70 hover:opacity-100 hover:border-zinc-250'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    phase === 3 
                      ? 'bg-brand-green-500 border-brand-green-500 text-zinc-950' 
                      : isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-100 border-zinc-200 text-zinc-500'
                  }`}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 space-y-1 min-w-0 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase">System Settled State</span>
                      {phase === 3 && (
                        <span className="text-[8px] font-mono text-brand-green-400 font-bold">CALM IDLE</span>
                      )}
                    </div>
                    <h5 className={`text-xs font-display font-extrabold ${isDark ? 'text-zinc-150' : 'text-zinc-900'}`}>
                      All Bills Protected
                    </h5>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-550'}`}>
                      The transaction pipeline settles down completely. No compound charges, no interest.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom mini assurance banner */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between text-[11px] font-mono transition-colors ${
              isDark ? 'bg-zinc-950/40 border-zinc-900 text-zinc-400' : 'bg-zinc-50 border-zinc-150 text-zinc-600'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green-500" />
                <span>Zero Interest</span>
              </div>
              <span>No rolling bills.</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
