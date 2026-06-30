import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Lock, 
  Calendar, 
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  X,
  Play,
  Pause,
  Eye,
  Shield,
  DollarSign,
  Scale,
  Check
} from 'lucide-react';

import { Header } from './components/Header';
import { ParticleBackground } from './components/ParticleBackground';
import { WithVsWithout } from './components/WithVsWithout';
import { WhoIsItFor } from './components/WhoIsItFor';
import { WaitlistForm } from './components/WaitlistForm';
import { Footer } from './components/Footer';
import { MismatchCalendar } from './components/MismatchCalendar';
import { RepaymentFlow3D } from './components/RepaymentFlow3D';
import { BillRiskEngine } from './components/BillRiskEngine';
import { BillsWeProtect } from './components/BillsWeProtect';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { SafetyBadges } from './components/SafetyBadges';
import { LegalModal } from './components/LegalModals';

// Interactive eligibility checklist for users before they sign up
interface EligibilityChecklistProps {
  theme: 'dark' | 'light';
}

export const EligibilityChecklist: React.FC<EligibilityChecklistProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const allChecked = checked1 && checked2 && checked3;

  return (
    <div className="w-full mt-8" id="eligibility-checklist-interactive">
      <div className={`p-6 rounded-3xl border transition-all duration-300 ${
        isDark ? 'bg-zinc-950/60 border-zinc-900' : 'bg-white border-zinc-200 shadow-sm'
      }`}>
        <div className="mb-5 text-center sm:text-left">
          <span className="text-[9px] font-mono font-bold tracking-widest text-brand-green-500 uppercase">
            Can I Qualify?
          </span>
          <h4 className={`text-base font-display font-bold mt-1 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
            Interactive Eligibility Checklist
          </h4>
          <p className="text-[11px] text-zinc-500 mt-1">
            Check the boxes below to evaluate your compatibility for Kavrol's automatic protection.
          </p>
        </div>

        <div className="space-y-3">
          <label className={`flex items-start gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition-all duration-300 ${
            checked1 
              ? isDark ? 'bg-brand-green-950/5 border-brand-green-500/30' : 'bg-brand-green-50/30 border-brand-green-200'
              : isDark ? 'bg-zinc-900/10 border-zinc-900 hover:bg-zinc-900/20' : 'bg-zinc-50/50 border-zinc-150 hover:bg-zinc-50'
          }`}>
            <input 
              type="checkbox" 
              checked={checked1}
              onChange={() => setChecked1(!checked1)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 ${
              checked1 
                ? 'bg-brand-green-500 border-brand-green-500 text-zinc-950 shadow-md shadow-brand-green-500/20' 
                : isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-white'
            }`}>
              {checked1 && <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-zinc-950 font-bold text-xs">✓</motion.span>}
            </div>
            <div className="space-y-0.5">
              <span className={`text-xs font-semibold block ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                I receive regular direct deposits
              </span>
              <span className="text-[10px] text-zinc-500 leading-normal block">
                Whether from a traditional salary, gig platform (like Uber or DoorDash), or steady freelance contracts.
              </span>
            </div>
          </label>

          <label className={`flex items-start gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition-all duration-300 ${
            checked2 
              ? isDark ? 'bg-brand-green-950/5 border-brand-green-500/30' : 'bg-brand-green-50/30 border-brand-green-200'
              : isDark ? 'bg-zinc-900/10 border-zinc-900 hover:bg-zinc-900/20' : 'bg-zinc-50/50 border-zinc-150 hover:bg-zinc-50'
          }`}>
            <input 
              type="checkbox" 
              checked={checked2}
              onChange={() => setChecked2(!checked2)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 ${
              checked2 
                ? 'bg-brand-green-500 border-brand-green-500 text-zinc-950 shadow-md shadow-brand-green-500/20' 
                : isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-white'
            }`}>
              {checked2 && <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-zinc-950 font-bold text-xs">✓</motion.span>}
            </div>
            <div className="space-y-0.5">
              <span className={`text-xs font-semibold block ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                I have active recurring bills
              </span>
              <span className="text-[10px] text-zinc-500 leading-normal block">
                Predictable payments like rent, mortgage, electricity, internet, student loans, or gym memberships.
              </span>
            </div>
          </label>

          <label className={`flex items-start gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition-all duration-300 ${
            checked3 
              ? isDark ? 'bg-brand-green-950/5 border-brand-green-500/30' : 'bg-brand-green-50/30 border-brand-green-200'
              : isDark ? 'bg-zinc-900/10 border-zinc-900 hover:bg-zinc-900/20' : 'bg-zinc-50/50 border-zinc-150 hover:bg-zinc-50'
          }`}>
            <input 
              type="checkbox" 
              checked={checked3}
              onChange={() => setChecked3(!checked3)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 ${
              checked3 
                ? 'bg-brand-green-500 border-brand-green-500 text-zinc-950 shadow-md shadow-brand-green-500/20' 
                : isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-white'
            }`}>
              {checked3 && <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-zinc-950 font-bold text-xs">✓</motion.span>}
            </div>
            <div className="space-y-0.5">
              <span className={`text-xs font-semibold block ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                I want automatic, fee-free protection
              </span>
              <span className="text-[10px] text-zinc-500 leading-normal block">
                I prefer bridging timing gaps with a simple 0% interest buffer instead of paying $35 bank overdraft fees.
              </span>
            </div>
          </label>
        </div>

        <AnimatePresence>
          {allChecked && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-5 p-4 rounded-2xl bg-brand-green-500/10 border border-brand-green-500/30 text-brand-green-400 text-xs flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-5 h-5 text-brand-green-500 shrink-0" />
              <div>
                <p className="font-bold">✓ Excellent! You appear fully eligible.</p>
                <p className="text-[10px] opacity-90">Kavrol is ideal for your financial schedule. Enter your email below to reserve your priority slot.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};



// Founder letter/mission statement explaining why Kavrol was built
export const FounderMission: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <div className="w-full py-12 border-t border-zinc-800/10" id="section-our-mission">
      <div className={`p-8 rounded-3xl border relative overflow-hidden max-w-3xl mx-auto text-center ${
        isDark 
          ? 'bg-gradient-to-br from-zinc-950 to-zinc-900 border-zinc-900' 
          : 'bg-gradient-to-br from-zinc-50 to-white border-zinc-200'
      }`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-green-500/3 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-xl mx-auto">
          <span className="text-[9px] font-mono font-bold tracking-widest text-brand-green-500 uppercase">
            A Note on Our Mission
          </span>
          <h3 className={`text-xl sm:text-2xl font-display font-medium tracking-tight italic ${
            isDark ? 'text-zinc-100' : 'text-zinc-900'
          }`}>
            "Traditional banking is structured to profit when you fail. Kavrol is structured to keep you on track."
          </h3>
          <div className="w-12 h-px bg-brand-green-500/40 mx-auto my-2" />
          <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
            Standard checking accounts collect billions in overdraft and late penalties simply because of timing. If your paycheck clears twelve hours after your electric bill is auto-deducted, banks penalize you. We built Kavrol to replace this structural mismatch with a simple, fee-free bridge. We believe your bills staying on schedule is a basic human right, not a profit center.
          </p>
          <div className="pt-2">
            <p className={`text-[10px] font-mono font-bold ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>
              The Kavrol Team
            </p>
            <p className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5">
              San Francisco, California
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // Theme state: dark mode defaults to true for fintech premium cosmic feel
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('kavrol_theme');
    if (saved === 'light') return 'light';
    return 'dark';
  });

  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [isCtaMinimized, setIsCtaMinimized] = useState(false);
  const [activeScrollStep, setActiveScrollStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  // Refined navigation & legal modal states
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms'>('privacy');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoveredTooltipStep, setHoveredTooltipStep] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }

      // 1. Dynamic Step Sequence Intersection Tracker (Monitor -> Protect -> Repay -> Compare)
      const stepSections = [
        { id: 'section-prediction-engine', step: 1 },
        { id: 'section-interactive-simulator', step: 2 },
        { id: 'section-6-repayment-flow', step: 3 },
        { id: 'section-5-comparison', step: 4 }
      ];

      let foundStep: number | null = null;
      for (const s of stepSections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.15) {
            foundStep = s.step;
            break;
          }
        }
      }
      setActiveScrollStep(foundStep);

      // 2. Dynamic Header Navigation Section Tracker
      const navSections = [
        { id: 'hero-storytelling-epic', name: 'home' },
        { id: 'section-prediction-engine', name: 'how-it-works' },
        { id: 'section-upcoming-bills', name: 'coverage' },
        { id: 'section-interactive-simulator', name: 'simulator' },
        { id: 'section-5-comparison', name: 'compare' },
        { id: 'section-7-early-access', name: 'early-access' }
      ];

      let currentSec = 'home';
      let closestDist = Infinity;
      for (const sec of navSections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top - 80);
          if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= 80) {
            if (dist < closestDist) {
              closestDist = dist;
              currentSec = sec.name;
            }
          }
        }
      }
      if (window.scrollY < 250) {
        currentSec = 'home';
      }
      setActiveSection(currentSec);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero interactive visual state
  const [heroStep, setHeroStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [heroProtectionEnabled, setHeroProtectionEnabled] = useState(false);
  const [isBridgeHovered, setIsBridgeHovered] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Hero Auto-Play Story Timeline Loop Data
  const heroStepsData = [
    {
      checking: 1150,
      rentPaid: false,
      isGap: false,
      isRisk: false,
      isProtected: false,
      statusLabel: "Analyzing Cash Flow...",
      alertTitle: "Mapping your balance path",
      alertDesc: "Kavrol predicts your balance path by analyzing your recurring paycheck calendar against scheduled bill due dates.",
      alertColor: "neutral",
      feeText: "$0.00 Fee",
      bridgeLabel: "Checking Balance"
    },
    {
      checking: 1150,
      rentPaid: false,
      isGap: false,
      isRisk: false,
      isProtected: false,
      statusLabel: "Monthly Bills Approaching",
      alertTitle: "Electricity & Internet due in 2 days",
      alertDesc: "Your scheduled recurring bills of $1,500 will clear on July 3. Your current checking balance is $1,150.",
      alertColor: "neutral",
      feeText: "$0.00 Fee",
      bridgeLabel: "Bills Due"
    },
    {
      checking: 1150,
      rentPaid: false,
      isGap: true,
      isRisk: false,
      isProtected: false,
      statusLabel: "Paycheck arrives after your bills",
      alertTitle: "⚠️ Projected short gap of -$350.00",
      alertDesc: "Your bills are due, but your payday is still 7 days away. A temporary timing mismatch has emerged.",
      alertColor: "amber",
      feeText: "Needs Attention",
      bridgeLabel: "Timing Gap"
    },
    {
      checking: 1150,
      rentPaid: false,
      isGap: true,
      isRisk: true,
      isProtected: false,
      statusLabel: "⚠️ Standard Account Risk",
      alertTitle: "Overdraft fees & payment failure risk",
      alertDesc: "Standard bank accounts would bounce the payment or charge you an expensive bank overdraft fee.",
      alertColor: "red",
      feeText: "Standard Bank Penalty",
      bridgeLabel: "Overdraft Risk"
    },
    {
      checking: 1150,
      rentPaid: false,
      isGap: true,
      isRisk: false,
      isProtected: true,
      statusLabel: "🛡️ Kavrol Protection Armed",
      alertTitle: "Timing bridge activated at 0% interest",
      alertDesc: "Kavrol calculates the exact protection amount needed for your qualifying shortfall based on your regular deposit history.",
      alertColor: "green",
      feeText: "$0.00 Fee",
      bridgeLabel: "Protected"
    },
    {
      checking: 1150,
      rentPaid: true,
      isGap: false,
      isRisk: false,
      isProtected: true,
      statusLabel: "✓ Bills Paid Successfully",
      alertTitle: "Bills paid on time, zero fees",
      alertDesc: "Your bills get paid in full on July 3. You avoid overdraft fees, late penalties, and stress.",
      alertColor: "green",
      feeText: "Protected",
      bridgeLabel: "Bills Paid"
    },
    {
      checking: 2650,
      rentPaid: true,
      isGap: false,
      isRisk: false,
      isProtected: true,
      statusLabel: "💰 Paycheck Arrived",
      alertTitle: "Direct deposit restores balance",
      alertDesc: "Your paycheck of $1,500 arrives on July 10, safely restoring your checking balance.",
      alertColor: "green",
      feeText: "Protected",
      bridgeLabel: "Fully Settled"
    },
    {
      checking: 2300,
      rentPaid: true,
      isGap: false,
      isRisk: false,
      isProtected: false,
      statusLabel: "🔄 Buffer Settled Safely",
      alertTitle: "Timing buffer settled",
      alertDesc: "Kavrol automatically settles the $350.00 timing buffer from your direct deposit. No fees, no interest, no ongoing debt.",
      alertColor: "neutral",
      feeText: "Settled",
      bridgeLabel: "Bridge Closed"
    }
  ];

  const activeStep = heroStepsData[heroStep];
  const currentProtectionEnabled = isAutoPlaying ? activeStep.isProtected : heroProtectionEnabled;

  const handleToggleProtection = (val: boolean) => {
    setIsAutoPlaying(false);
    setHeroProtectionEnabled(val);
    setHeroStep(val ? 4 : 3);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setHeroStep((prev) => (prev + 1) % 8);
    }, 3500); // 3.5 seconds per state, total ~28 second loop
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    localStorage.setItem('kavrol_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Handle subtle mouse parallax on hero container
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 30;
    const y = (clientY - window.innerHeight / 2) / 30;
    setMousePosition({ x, y });
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen relative font-sans transition-all duration-500 overflow-x-hidden ${
      isDark ? 'bg-zinc-950 text-white selection:bg-brand-green-500 selection:text-zinc-950' : 'bg-white text-zinc-950 selection:bg-brand-green-100 selection:text-brand-green-800'
    }`}>
      
      {/* Scroll Progress Bar */}
      <motion.div 
        id="scroll-progress-indicator"
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-green-500 via-emerald-400 to-brand-green-500 z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Dynamic Ambient Background */}
      <ParticleBackground theme={theme} />

      {/* Background radial gradient blobs for atmospheric depth */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-green-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] right-10 w-[600px] h-[600px] bg-emerald-500/3 blur-[140px] rounded-full pointer-events-none z-0" style={{ animationDuration: '20s' }} />
      <div className="absolute bottom-[10%] left-10 w-[450px] h-[450px] bg-brand-green-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Navigation Header */}
      <Header theme={theme} setTheme={setTheme} activeSection={activeSection} />

      {/* Main Landing Journey Container */}
      <main className="relative z-10">

        {/* ================= HERO SECTION ================= */}
        <section 
          className="min-h-[calc(100vh-64px)] flex flex-col justify-center py-8 md:py-14 px-6 relative"
          onMouseMove={handleMouseMove}
          id="hero-storytelling-epic"
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Feature Pill */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-brand-green-500/10 text-brand-green-500 border border-brand-green-500/20 shadow-sm mx-auto lg:mx-0">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>KAVROL BILL PROTECTION</span>
              </div>

              {/* Display Headline */}
              <h2 className={`text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.1] ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}>
                Never miss another recurring bill{' '}
                <span className="text-brand-green-500 block mt-2 text-3xl sm:text-4xl md:text-5xl">
                  because your paycheck came too late.
                </span>
              </h2>

              {/* Human-focused Concrete Explanatory Lead */}
              <p className={`text-base md:text-lg font-medium leading-normal max-w-xl mx-auto lg:mx-0 ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                Kavrol monitors your recurring bills and subscriptions, predicts timing gaps before they happen, and may help protect eligible payments until your next paycheck arrives.
              </p>

              {/* Concrete Outcomes (No Buzzwords) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 pt-1 text-left">
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-900/40 border-zinc-900/60' : 'bg-zinc-50 border-zinc-200/50'}`}>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase">Bill Protection</p>
                  <p className="text-xs font-bold mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-brand-green-500" />
                    <span>$0 Overdrafts</span>
                  </p>
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-900/40 border-zinc-900/60' : 'bg-zinc-50 border-zinc-200/50'}`}>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase">Repayment Rate</p>
                  <p className="text-xs font-bold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-green-500" />
                    <span>0.0% Interest</span>
                  </p>
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-900/40 border-zinc-900/60' : 'bg-zinc-50 border-zinc-200/50'}`}>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase">Worry-Free Payments</p>
                  <p className="text-xs font-bold mt-1 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-brand-green-500" />
                    <span>No Late Fees</span>
                  </p>
                </div>
              </div>

              {/* Action Trigger Row */}
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => handleScrollTo('section-7-early-access')}
                  id="hero-primary-waitlist-btn"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-green-500 text-zinc-950 font-display font-bold text-sm hover:bg-brand-green-600 transition-all shadow-lg hover:shadow-brand-green-500/10 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span>Join Early Access</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScrollTo('section-interactive-simulator')}
                  id="hero-secondary-learn-btn"
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-display font-semibold text-xs border transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${
                    isDark
                      ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-300 hover:text-white'
                      : 'border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  <span>Watch Live Demo</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Interactive Card Column */}
            <div className="lg:col-span-6 flex justify-center items-center relative py-6">
              {/* Outer decorative glowing vector ring */}
              <div className="absolute w-[440px] h-[440px] rounded-full border border-brand-green-500/10 animate-spin pointer-events-none" style={{ animationDuration: '40s' }} />

              {/* 3D Parallax Perspective card container */}
              <motion.div
                className="w-full max-w-[420px] rounded-[32px] p-6 border relative overflow-hidden transition-all shadow-2xl bg-zinc-950/80"
                animate={{
                  borderColor: currentProtectionEnabled 
                    ? 'rgba(34, 197, 94, 0.35)' 
                    : isDark ? 'rgba(39, 39, 42, 0.8)' : 'rgba(228, 228, 231, 0.8)',
                  boxShadow: currentProtectionEnabled
                    ? isDark 
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(34, 197, 94, 0.18)' 
                      : '0 25px 50px -12px rgba(228, 228, 231, 0.9), 0 0 35px rgba(34, 197, 94, 0.12)'
                    : isDark
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
                      : '0 25px 50px -12px rgba(228, 228, 231, 0.4)',
                  backgroundColor: isDark 
                    ? currentProtectionEnabled ? 'rgba(9, 9, 11, 0.9)' : 'rgba(9, 9, 11, 0.8)' 
                    : currentProtectionEnabled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)'
                }}
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                  transition: hoveredCard ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
                onMouseEnter={() => setHoveredCard(true)}
                onMouseLeave={() => {
                  setHoveredCard(false);
                  setMousePosition({ x: 0, y: 0 });
                }}
              >
                {/* Ambient Visual Reward Wave (triggers on active toggle) */}
                <AnimatePresence>
                  {currentProtectionEnabled && (
                    <motion.div 
                      key="protection-glow-burst"
                      initial={{ scale: 0.1, opacity: 1 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="absolute inset-0 pointer-events-none rounded-[32px] bg-gradient-to-br from-brand-green-500/20 to-emerald-500/10 z-0"
                    />
                  )}
                </AnimatePresence>

                {/* Metallic light reflection sweep on hover */}
                <div className="absolute top-0 left-0 w-full h-[300%] bg-gradient-to-b from-transparent via-brand-green-500/5 to-transparent -translate-y-full hover:translate-y-full transition-all duration-1000 pointer-events-none" />

                {/* Card Title */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-green-500" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                      Upcoming Monthly Bills
                    </span>
                  </div>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                    isDark ? 'bg-zinc-900 text-brand-green-500 font-bold' : 'bg-brand-green-50 text-brand-green-700 font-bold'
                  }`}>
                    {isAutoPlaying ? "Live Bill Protection" : "MANUAL PLAY"}
                  </span>
                </div>

                {/* Risk Status Badge Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/40 mb-4 shadow-sm">
                  <span className="text-xs font-mono text-zinc-400">Today's Bill Status</span>
                  {(() => {
                    let badgeLabel = 'SAFE';
                    let badgeColor = 'text-brand-green-400 bg-brand-green-500/10 border-brand-green-500/20';
                    
                    if (currentProtectionEnabled) {
                      badgeLabel = 'SAFE';
                      badgeColor = 'text-brand-green-400 bg-brand-green-500/10 border-brand-green-500/20';
                    } else if (isAutoPlaying) {
                      if (activeStep.isRisk) {
                        badgeLabel = 'WILL FAIL';
                        badgeColor = 'text-red-400 bg-red-500/10 border-red-500/20';
                      } else if (activeStep.isGap) {
                        badgeLabel = 'AT RISK';
                        badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
                      }
                    } else {
                      badgeLabel = heroProtectionEnabled ? 'SAFE' : 'WILL FAIL';
                      badgeColor = heroProtectionEnabled 
                        ? 'text-brand-green-400 bg-brand-green-500/10 border-brand-green-500/20' 
                        : 'text-red-400 bg-red-500/10 border-red-500/20';
                    }

                    return (
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold tracking-wider transition-all duration-300 ${badgeColor}`}>
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
                        </span>
                        <span>{badgeLabel}</span>
                      </div>
                    );
                  })()}
                </div>

                {/* Main numbers breakdown */}
                <div className="space-y-3">
                  {/* Ledger metric row 1 */}
                  <div className="flex justify-between items-center p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/10">
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase">Checking Balance</p>
                      <motion.p 
                        key={isAutoPlaying ? `checking-${heroStep}-${activeStep.checking}` : "manual-checking"}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg font-display font-bold mt-0.5"
                      >
                        ${(isAutoPlaying ? activeStep.checking : 1150).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </motion.p>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500">
                      {isAutoPlaying && heroStep >= 6 ? "JULY 10" : "JULY 1"}
                    </span>
                  </div>

                  {/* Ledger metric row 2 */}
                  <div className="flex justify-between items-center p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/10">
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase">
                        {(isAutoPlaying ? activeStep.rentPaid : currentProtectionEnabled) ? "Monthly Bills Status" : "Upcoming Monthly Bills"}
                      </p>
                      <motion.p 
                        key={isAutoPlaying ? `rentPaid-${heroStep}-${activeStep.rentPaid}` : "manual-rent"}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-lg font-display font-bold mt-0.5 ${(isAutoPlaying ? activeStep.rentPaid : currentProtectionEnabled) ? "text-brand-green-500" : "text-red-400"}`}
                      >
                        {(isAutoPlaying ? activeStep.rentPaid : currentProtectionEnabled) ? "Bills Paid" : "$1,500.00"}
                      </motion.p>
                    </div>
                    <span className={`text-[9px] font-mono font-semibold ${(isAutoPlaying ? activeStep.rentPaid : currentProtectionEnabled) ? "text-brand-green-500" : "text-red-400"}`}>
                      {(isAutoPlaying ? activeStep.rentPaid : currentProtectionEnabled) ? "✓ JULY 3" : "JULY 3"}
                    </span>
                  </div>

                  {/* Subtle Cash Flow Pipeline Visualizer */}
                  <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                    isDark 
                      ? 'bg-zinc-900/10 border-zinc-900/60' 
                      : 'bg-zinc-50 border-zinc-200/60'
                  }`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-[10px] font-mono uppercase tracking-wider ${
                        isDark ? 'text-zinc-500' : 'text-zinc-400'
                      }`}>
                        Payment Status
                      </span>
                      <span className={`flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded transition-all duration-300 ${
                        currentProtectionEnabled 
                          ? 'text-brand-green-400 bg-brand-green-500/10' 
                          : isAutoPlaying && activeStep.isRisk
                            ? 'text-red-400 bg-red-500/10'
                            : 'text-amber-500 bg-amber-500/10'
                      }`}>
                        <span className="relative flex h-1.5 w-1.5">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            currentProtectionEnabled ? 'bg-brand-green-400' : isAutoPlaying && activeStep.isRisk ? 'bg-red-400' : 'bg-amber-400'
                          }`}></span>
                          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                            currentProtectionEnabled ? 'bg-brand-green-500' : isAutoPlaying && activeStep.isRisk ? 'bg-red-500' : 'bg-amber-500'
                          }`}></span>
                        </span>
                        <span>{isAutoPlaying ? activeStep.bridgeLabel : (currentProtectionEnabled ? 'Protected' : 'Timing Gap')}</span>
                      </span>
                    </div>

                    <div className="relative flex items-center justify-between py-2">
                      
                      {/* Node 1: Paycheck (Incoming) */}
                      <motion.div 
                        whileHover={{ 
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 500, damping: 15 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="flex flex-col items-center z-10 text-center cursor-pointer select-none"
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-500 ${
                          currentProtectionEnabled 
                            ? isDark 
                              ? 'bg-brand-green-950/40 border-brand-green-500/30 text-brand-green-400 shadow-[0_0_12px_rgba(34,197,94,0.1)]' 
                              : 'bg-brand-green-50 border-brand-green-200 text-brand-green-600 shadow-[0_0_12px_rgba(34,197,94,0.05)]'
                            : isDark
                              ? 'bg-zinc-900 border-zinc-850 text-zinc-500'
                              : 'bg-zinc-100 border-zinc-200 text-zinc-400'
                        }`}>
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <span className={`text-[9px] font-semibold mt-1.5 block ${
                          isDark ? 'text-zinc-300' : 'text-zinc-700'
                        }`}>Paycheck</span>
                        <span className="text-[8px] font-mono text-zinc-500 block mt-0.5">$1,500</span>
                      </motion.div>

                      {/* Connecting Line 1 (Paycheck to Checking) */}
                      <div className="flex-1 relative h-1 mx-2 overflow-visible">
                        {/* Thin Background Track Line */}
                        <div className={`absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 rounded-full transition-colors duration-500 ${
                          currentProtectionEnabled 
                            ? isDark ? 'bg-brand-green-950/60' : 'bg-brand-green-100'
                            : isDark ? 'bg-zinc-800' : 'bg-zinc-200'
                        }`} />

                        {/* Staggered animated flowing arrow backdrops */}
                        <div className="absolute inset-0 flex items-center justify-around text-[10px] font-bold select-none text-zinc-500/10">
                          <span>›</span>
                          <span>›</span>
                          <span>›</span>
                        </div>

                        {/* Pulsing circular marker 1 */}
                        <motion.div
                          className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-md border transition-colors duration-500 ${
                            currentProtectionEnabled
                              ? isDark 
                                ? 'bg-brand-green-500 border-brand-green-400 text-zinc-950 shadow-brand-green-500/30' 
                                : 'bg-brand-green-500 border-brand-green-400 text-white shadow-brand-green-500/20'
                              : isDark 
                                ? 'bg-zinc-700 border-zinc-650 text-zinc-400' 
                                : 'bg-zinc-300 border-zinc-250 text-zinc-600'
                          }`}
                          initial={{ left: '-5%' }}
                          animate={{
                            left: ['-5%', '105%']
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: currentProtectionEnabled ? 2.5 : 4.5,
                            ease: 'linear'
                          }}
                        >
                          <span className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                            currentProtectionEnabled ? 'bg-brand-green-400' : 'bg-zinc-400'
                          }`} style={{ animationDuration: '1.4s' }} />
                          <span className="text-[8px] font-black leading-none select-none -mt-[1px]">›</span>
                        </motion.div>

                        {/* Pulsing circular marker 2 (Staggered) */}
                        <motion.div
                          className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-md border transition-colors duration-500 ${
                            currentProtectionEnabled
                              ? isDark 
                                ? 'bg-brand-green-500 border-brand-green-400 text-zinc-950 shadow-brand-green-500/30' 
                                : 'bg-brand-green-500 border-brand-green-400 text-white shadow-brand-green-500/20'
                              : isDark 
                                ? 'bg-zinc-700 border-zinc-650 text-zinc-400' 
                                : 'bg-zinc-300 border-zinc-250 text-zinc-600'
                          }`}
                          initial={{ left: '-5%' }}
                          animate={{
                            left: ['-5%', '105%']
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: currentProtectionEnabled ? 2.5 : 4.5,
                            delay: currentProtectionEnabled ? 1.25 : 2.25,
                            ease: 'linear'
                          }}
                        >
                          <span className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                            currentProtectionEnabled ? 'bg-brand-green-400' : 'bg-zinc-400'
                          }`} style={{ animationDuration: '1.4s' }} />
                          <span className="text-[8px] font-black leading-none select-none -mt-[1px]">›</span>
                        </motion.div>
                      </div>

                      {/* Node 2: Checking / Kavrol Protection Bridge */}
                      <motion.div 
                        whileHover={{ 
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 500, damping: 15 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="flex flex-col items-center z-30 text-center relative cursor-pointer select-none"
                        onMouseEnter={() => setIsBridgeHovered(true)}
                        onMouseLeave={() => setIsBridgeHovered(false)}
                      >
                        <AnimatePresence>
                          {currentProtectionEnabled && isBridgeHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 12, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 12, scale: 0.95 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-52 p-3.5 rounded-2xl border text-left shadow-xl backdrop-blur-md z-50 transition-colors duration-300 ${
                                isDark 
                                  ? 'bg-zinc-950/95 border-brand-green-500/40 text-white shadow-brand-green-950/50' 
                                  : 'bg-white/95 border-brand-green-300 text-zinc-900 shadow-zinc-300/40'
                              }`}
                            >
                              <div className="space-y-2">
                                <div className={`flex items-center gap-1.5 border-b pb-1.5 transition-colors duration-300 ${
                                  isDark ? 'border-zinc-800' : 'border-zinc-100'
                                }`}>
                                  <ShieldCheck className="w-3.5 h-3.5 text-brand-green-500" />
                                  <span className="text-[10px] font-bold tracking-wider uppercase font-mono">Active Protection</span>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-[9px]">
                                    <span className={isDark ? 'text-zinc-400 font-medium' : 'text-zinc-500 font-medium'}>Repayment Date</span>
                                    <span className="text-brand-green-500 font-mono font-semibold">July 10</span>
                                  </div>
                                  <div className="flex justify-between items-center text-[9px]">
                                    <span className={isDark ? 'text-zinc-400 font-medium' : 'text-zinc-500 font-medium'}>Interest Rate</span>
                                    <span className="text-brand-green-500 font-mono font-semibold">0% interest</span>
                                  </div>
                                  <div className="flex justify-between items-center text-[9px]">
                                    <span className={isDark ? 'text-zinc-400 font-medium' : 'text-zinc-500 font-medium'}>Late/Overdraft Fees</span>
                                    <span className="text-brand-green-500 font-mono font-semibold">$0.00</span>
                                  </div>
                                  <div className="flex justify-between items-center text-[9px]">
                                    <span className={isDark ? 'text-zinc-400 font-medium' : 'text-zinc-500 font-medium'}>Advance Limit</span>
                                    <span className="text-brand-green-500 font-mono font-semibold">Exact Coverage Match</span>
                                  </div>
                                </div>
                                <div className={`pt-1.5 border-t text-[8.5px] leading-snug ${
                                  isDark ? 'border-zinc-800 text-zinc-500' : 'border-zinc-100 text-zinc-500'
                                }`}>
                                  Timing buffer aligns with paycheck on <span className="font-semibold text-brand-green-500">July 10</span>. Clear, zero-fee transparency.
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <motion.div 
                          animate={{
                            scale: currentProtectionEnabled ? 1.08 : 1.0,
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-500 ${
                            currentProtectionEnabled 
                              ? isDark
                                ? 'bg-brand-green-500/20 border-brand-green-500 text-brand-green-400 shadow-[0_0_15px_rgba(34,197,94,0.25)]'
                                : 'bg-brand-green-500/10 border-brand-green-500 text-brand-green-600 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                              : isDark
                                ? 'bg-zinc-900 border-zinc-800 text-zinc-400'
                                : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                          }`}
                        >
                          {currentProtectionEnabled ? (
                            <Sparkles className="w-5 h-5 text-brand-green-400 animate-pulse" />
                          ) : isAutoPlaying && activeStep.isRisk ? (
                            <span className="text-[9px] font-mono font-bold text-red-500">-$350</span>
                          ) : (
                            <span className="text-[9px] font-mono font-bold text-amber-500">-$350</span>
                          )}
                        </motion.div>
                        <span className={`text-[9px] font-bold mt-1 block ${
                          currentProtectionEnabled 
                            ? 'text-brand-green-500' 
                            : isAutoPlaying && activeStep.isRisk
                              ? 'text-red-400'
                              : isDark ? 'text-zinc-300' : 'text-zinc-700'
                        }`}>
                          {isAutoPlaying ? activeStep.bridgeLabel : (currentProtectionEnabled ? 'Protected' : 'Timing Gap')}
                        </span>
                        <span className="text-[8px] font-mono text-zinc-500 block mt-0.5">July 3</span>
                      </motion.div>

                      {/* Connecting Line 2 (Checking to Rent) */}
                      <div className="flex-1 relative h-1 mx-2 overflow-visible">
                        {/* Thin Background Track Line */}
                        <div className={`absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 rounded-full transition-colors duration-500 ${
                          currentProtectionEnabled 
                            ? isDark ? 'bg-brand-green-950/60' : 'bg-brand-green-100'
                            : isDark ? 'bg-amber-950/40' : 'bg-amber-50'
                        }`} />

                        {/* Staggered animated flowing arrow backdrops */}
                        <div className="absolute inset-0 flex items-center justify-around text-[10px] font-bold select-none text-zinc-500/10">
                          <span>›</span>
                          <span>›</span>
                          <span>›</span>
                        </div>

                        {/* Pulsing circular marker 1 */}
                        <motion.div
                          className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-md border transition-colors duration-500 ${
                            currentProtectionEnabled
                              ? isDark 
                                ? 'bg-brand-green-500 border-brand-green-400 text-zinc-950 shadow-brand-green-500/30' 
                                : 'bg-brand-green-500 border-brand-green-400 text-white shadow-brand-green-500/20'
                              : isDark 
                                ? 'bg-amber-500/40 border-amber-500/30 text-amber-500 shadow-amber-500/10' 
                                : 'bg-amber-100 border-amber-200 text-amber-700 shadow-amber-500/5'
                          }`}
                          initial={{ left: '-5%' }}
                          animate={{
                            left: ['-5%', '105%']
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: currentProtectionEnabled ? 2.5 : 5.5,
                            ease: 'linear'
                          }}
                        >
                          <span className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                            currentProtectionEnabled ? 'bg-brand-green-400' : 'bg-amber-400'
                          }`} style={{ animationDuration: currentProtectionEnabled ? '1.4s' : '2s' }} />
                          <span className="text-[8px] font-black leading-none select-none -mt-[1px]">›</span>
                        </motion.div>

                        {/* Pulsing circular marker 2 (Staggered) */}
                        <motion.div
                          className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-md border transition-colors duration-500 ${
                            currentProtectionEnabled
                              ? isDark 
                                ? 'bg-brand-green-500 border-brand-green-400 text-zinc-950 shadow-brand-green-500/30' 
                                : 'bg-brand-green-500 border-brand-green-400 text-white shadow-brand-green-500/20'
                              : isDark 
                                ? 'bg-amber-500/40 border-amber-500/30 text-amber-500 shadow-amber-500/10' 
                                : 'bg-amber-100 border-amber-200 text-amber-700 shadow-amber-500/5'
                          }`}
                          initial={{ left: '-5%' }}
                          animate={{
                            left: ['-5%', '105%']
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: currentProtectionEnabled ? 2.5 : 5.5,
                            delay: currentProtectionEnabled ? 1.25 : 2.75,
                            ease: 'linear'
                          }}
                        >
                          <span className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                            currentProtectionEnabled ? 'bg-brand-green-400' : 'bg-amber-400'
                          }`} style={{ animationDuration: currentProtectionEnabled ? '1.4s' : '2s' }} />
                          <span className="text-[8px] font-black leading-none select-none -mt-[1px]">›</span>
                        </motion.div>
                      </div>

                      {/* Node 3: Rent Paid (Destination) */}
                      <motion.div 
                        whileHover={{ 
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 500, damping: 15 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="flex flex-col items-center z-10 text-center cursor-pointer select-none"
                      >
                        <motion.div 
                          animate={{
                            scale: currentProtectionEnabled ? 1.08 : 1.0,
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-500 ${
                            currentProtectionEnabled 
                              ? isDark
                                ? 'bg-brand-green-950/40 border-brand-green-500/30 text-brand-green-400 shadow-[0_0_12px_rgba(34,197,94,0.1)]' 
                                : 'bg-brand-green-50 border-brand-green-200 text-brand-green-600 shadow-[0_0_12px_rgba(34,197,94,0.05)]'
                              : isDark
                                ? 'bg-zinc-900 border-zinc-850 text-zinc-650'
                                : 'bg-zinc-100 border-zinc-150 text-zinc-400'
                          }`}
                        >
                          {(isAutoPlaying ? activeStep.rentPaid : currentProtectionEnabled) ? (
                            <CheckCircle2 className="w-4 h-4 text-brand-green-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-500" />
                          )}
                        </motion.div>
                        <span className={`text-[9px] font-semibold mt-1.5 block ${
                          isDark ? 'text-zinc-300' : 'text-zinc-700'
                        }`}>Rent Paid</span>
                        <span className="text-[8px] font-mono text-zinc-500 block mt-0.5">
                          {isAutoPlaying && activeStep.rentPaid ? "✓ Paid" : "$1,500"}
                        </span>
                      </motion.div>

                    </div>
                  </div>

                  {/* Dynamic Gap Alert */}
                  <motion.div 
                    layout
                    animate={{
                      backgroundColor: currentProtectionEnabled 
                        ? isDark ? 'rgba(34, 197, 94, 0.12)' : 'rgba(34, 197, 94, 0.08)' 
                        : isAutoPlaying && activeStep.isRisk
                          ? isDark ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.08)'
                          : isDark ? 'rgba(245, 158, 11, 0.12)' : 'rgba(245, 158, 11, 0.08)',
                      borderColor: currentProtectionEnabled 
                        ? 'rgba(34, 197, 94, 0.35)' 
                        : isAutoPlaying && activeStep.isRisk
                          ? 'rgba(239, 68, 68, 0.25)'
                          : 'rgba(245, 158, 11, 0.25)',
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className={`p-4 rounded-2xl border transition-colors duration-500 ${
                      currentProtectionEnabled ? 'text-brand-green-500' : isAutoPlaying && activeStep.isRisk ? 'text-red-400' : 'text-amber-500'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1 overflow-hidden h-5 relative">
                      <AnimatePresence mode="wait">
                        <motion.span 
                          key={isAutoPlaying ? `statusLabel-${heroStep}-${activeStep.statusLabel}` : (currentProtectionEnabled ? 'protected' : 'shortfall')}
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -15, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="text-xs font-semibold flex items-center gap-1.5"
                        >
                          {isAutoPlaying ? (
                            <span>{activeStep.statusLabel}</span>
                          ) : currentProtectionEnabled ? (
                            '✓ Shortfalls protected'
                          ) : (
                            <>
                              <span>⚠️ Projected Gap</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsInfoModalOpen(true);
                                }}
                                className="inline-flex items-center justify-center p-0.5 rounded-full hover:bg-amber-500/20 transition-colors cursor-pointer text-amber-500 hover:text-amber-400 focus:outline-none"
                                title="Learn how Kavrol detects gaps"
                                id="projected-gap-info-btn"
                              >
                                <HelpCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </motion.span>
                      </AnimatePresence>

                      <AnimatePresence mode="wait">
                        <motion.span 
                          key={isAutoPlaying ? `feeText-${heroStep}-${activeStep.feeText}` : (currentProtectionEnabled ? 'fee-free' : 'fee-charged')}
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.85, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="text-sm font-mono font-bold"
                        >
                          {isAutoPlaying ? activeStep.feeText : (currentProtectionEnabled ? '$0.00 Fee' : '-$350.00')}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <div className="overflow-hidden relative mt-1">
                      <AnimatePresence mode="wait">
                        <motion.p 
                          key={isAutoPlaying ? `alertTitle-${heroStep}-${activeStep.alertTitle}` : (currentProtectionEnabled ? 'desc-protected' : 'desc-shortfall')}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className={`text-[10px] leading-snug ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}
                        >
                          {isAutoPlaying 
                            ? activeStep.alertDesc
                            : currentProtectionEnabled 
                              ? 'Kavrol has mapped the shortfall and applied a 0% interest timing buffer. Your rent will be paid in full on schedule.'
                              : 'Your paycheck is 9 days away. Paying your rent on July 3 threatens a $350 overdraft fee from traditional banking rules.'}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Interactive scrubbing controls */}
                  <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                    isDark ? 'bg-zinc-950/40 border-zinc-900' : 'bg-zinc-50 border-zinc-150'
                  }`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoPlaying(!isAutoPlaying);
                      }}
                      className={`p-1.5 rounded-lg transition-all focus:outline-none ${
                        isDark ? 'hover:bg-zinc-900 text-brand-green-500' : 'hover:bg-zinc-100 text-brand-green-600'
                      }`}
                      title={isAutoPlaying ? "Pause timing loop simulation" : "Start timing loop simulation"}
                    >
                      {isAutoPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                    </button>

                    <div className="flex-1 flex justify-around items-center gap-1">
                      {heroStepsData.map((step, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsAutoPlaying(false);
                            setHeroStep(idx);
                          }}
                          className={`h-2 rounded-full transition-all focus:outline-none ${
                            heroStep === idx
                              ? 'w-6 bg-brand-green-500'
                              : isDark
                                ? 'w-2 bg-zinc-800 hover:bg-zinc-700'
                                : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                          }`}
                          title={`Go to Stage ${idx + 1}: ${step.statusLabel}`}
                        />
                      ))}
                    </div>

                    <span className="text-[8px] font-mono font-bold text-brand-green-500 uppercase tracking-widest shrink-0 animate-pulse">
                      LIVE PROTECTION SIMULATION
                    </span>
                  </div>

                  {/* Switch trigger to toggle protected state */}
                  <motion.div 
                    layout
                    animate={{
                      backgroundColor: isDark 
                        ? currentProtectionEnabled ? 'rgba(34, 197, 94, 0.05)' : 'rgba(24, 24, 27, 0.5)'
                        : currentProtectionEnabled ? 'rgba(34, 197, 94, 0.03)' : 'rgba(250, 250, 250, 1)',
                      borderColor: currentProtectionEnabled 
                        ? 'rgba(34, 197, 94, 0.25)' 
                        : isDark ? 'rgba(39, 39, 42, 0.8)' : 'rgba(228, 228, 231, 1)'
                    }}
                    transition={{ duration: 0.5 }}
                    className="p-4 rounded-xl border flex items-center justify-between"
                  >
                    <div>
                      <span className={`text-xs font-semibold block transition-colors duration-500 ${
                        currentProtectionEnabled ? 'text-brand-green-500' : isDark ? 'text-white' : 'text-zinc-950'
                      }`}>
                        {currentProtectionEnabled ? 'Auto-Protection Active' : 'Enable Auto-Protection'}
                      </span>
                      <span className={`text-[10px] transition-colors duration-500 font-mono ${
                        currentProtectionEnabled ? 'text-brand-green-400/80' : 'text-zinc-500'
                      }`}>
                        {currentProtectionEnabled ? '✓ 0% interest Buffer Armed' : '0% interest • Zero Bank Fees'}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleToggleProtection(!currentProtectionEnabled)}
                      id="hero-toggle-autoprotect-switch"
                      className="focus:outline-none"
                      aria-label="Toggle Auto-Protection"
                    >
                      <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 flex items-center cursor-pointer ${
                        currentProtectionEnabled ? 'bg-brand-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-zinc-800'
                      }`}>
                        <motion.div 
                          layout
                          className="w-4 h-4 rounded-full shadow-md"
                          animate={{
                            x: currentProtectionEnabled ? 24 : 0,
                            backgroundColor: currentProtectionEnabled ? '#09090b' : '#ffffff'
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 28 }}
                        />
                      </div>
                    </button>
                  </motion.div>
                </div>

              </motion.div>
            </div>

          </div>
        </section>

        {/* ================= SECTION: WHY TIMING GAPS HAPPEN ================= */}
        <section 
          id="section-why-gaps-happen" 
          className={`py-7 px-6 relative overflow-hidden transition-all duration-300 ${
            isDark ? 'bg-zinc-950/40 border-b border-zinc-900/30' : 'bg-white border-b border-zinc-200/30 shadow-sm'
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-5">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-green-500 bg-brand-green-500/10 px-3 py-1 rounded-full uppercase">
                Why Timing Gaps Happen
              </span>
              <h2 className={`text-2xl sm:text-3xl font-display font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}>
                The Calendar vs. Reality
              </h2>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-650'} max-w-xl mx-auto leading-relaxed`}>
                Traditional banking rules operate under a strict, legacy model. We believe paying $35 simply because a payment date shifts shouldn't be your burden.
              </p>
            </div>

            {/* Relatable user personas */}
            <WhoIsItFor theme={theme} />
          </div>
        </section>

        {/* ================= SECTION: KAVROL NOTICES THE PROBLEM (PREDICTION) ================= */}
        <section 
          id="section-prediction-engine" 
          className={`py-7 px-6 border-b ${
            isDark ? 'bg-zinc-950/20 border-zinc-900/30' : 'bg-zinc-50/20 border-zinc-200/30'
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-5">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-green-500 uppercase bg-brand-green-500/10 px-3 py-1 rounded-full">
                Prediction Assistant
              </span>
              <h3 className={`text-2xl sm:text-3xl font-display font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                How Kavrol Notices the Shortfall
              </h3>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-650'} max-w-lg mx-auto leading-relaxed`}>
                By automatically reading your upcoming schedules, Kavrol warns you before timing delays cause failed payments.
              </p>
            </div>

            <BillRiskEngine theme={theme} />
          </div>
        </section>

        {/* ================= SECTION: KAVROL PROTECTS ELIGIBLE PAYMENTS (THE TIMING BRIDGE) ================= */}
        <section 
          id="section-interactive-simulator" 
          className={`py-7 px-6 border-b ${
            isDark ? 'bg-zinc-950/20 border-zinc-900/30' : 'bg-zinc-50/40 border-zinc-200/30'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <InteractiveSimulator theme={theme} />
          </div>
        </section>

        {/* ================= SECTION: BILLS WE PROTECT ================= */}
        <div id="section-upcoming-bills">
          <BillsWeProtect theme={theme} />
        </div>

        {/* ================= SECTION: PAYCHECK ARRIVES (REPAYMENT FLOW) ================= */}
        <section 
          id="section-6-repayment-flow" 
          className={`py-7 px-6 border-b ${
            isDark ? 'bg-zinc-950/10 border-zinc-900/30' : 'bg-zinc-50/20 border-zinc-200/30'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <RepaymentFlow3D theme={theme} />
          </div>
        </section>

        {/* ================= SECTION: COMPARISON (WITH VS WITHOUT) ================= */}
        <section 
          id="section-5-comparison" 
          className={`py-7 px-6 border-b ${
            isDark ? 'bg-zinc-950/20 border-zinc-900/30' : 'bg-zinc-50/40 border-zinc-200/30'
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-5">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-green-500 uppercase bg-brand-green-500/10 px-3 py-1 rounded-full">
                Benefit Contrast
              </span>
              <h3 className={`text-2xl sm:text-3xl font-display font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                We Compare Emotions, Not Just Numbers
              </h3>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-650'} max-w-lg mx-auto leading-relaxed`}>
                See how traditional overdraft anxiety contrasts with Kavrol's automatic, fee-free safety buffer.
              </p>
            </div>

            <WithVsWithout theme={theme} />
          </div>
        </section>

        {/* ================= SECTION: MISSION STATEMENT ================= */}
        <section className={`py-6 px-6 border-b ${
          isDark ? 'bg-zinc-950/10 border-zinc-900/30' : 'bg-zinc-50/20 border-zinc-200/30'
        }`}>
          <div className="max-w-7xl mx-auto">
            <FounderMission theme={theme} />
          </div>
        </section>

        {/* ================= SECTION 7: EARLY ACCESS Waitlist Form ================= */}
        <section 
          id="section-7-early-access" 
          className="py-7 px-6"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Mid-page CTA Banner */}
            <div className={`p-6 md:p-8 rounded-3xl border text-center relative overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-brand-green-500/20 shadow-2xl shadow-brand-green-950/5' 
                : 'bg-gradient-to-br from-zinc-50 to-white border-zinc-200 shadow-xl'
            }`}>
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-green-500/5 blur-[50px] rounded-full pointer-events-none" />
              <div className="relative z-10 space-y-3.5 max-w-xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-brand-green-500/10 text-brand-green-400 border border-brand-green-500/15">
                  <Sparkles className="w-3.5 h-3.5" />
                  EARLY ACCESS PROGRAM
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black tracking-tight leading-tight">
                  Protect Your Cash Flow Against Delay Stress
                </h3>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'} leading-relaxed`}>
                  Join Kavrol early to get priority access to timing prediction, automatic eligibility checks, and 0% interest paycheck protection.
                </p>
                <button
                  onClick={() => handleScrollTo('waitlist-movement-container')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-green-500 text-zinc-950 font-mono font-bold text-xs hover:bg-brand-green-400 transition-all active:scale-95 cursor-pointer shadow-lg shadow-brand-green-500/10"
                >
                  <span>Join Early Access</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Waitlist Form Component */}
            <div id="waitlist-movement-container">
              <WaitlistForm theme={theme} />
            </div>

          </div>
        </section>

      </main>

      {/* Footer Legal & Disclosures */}
      <Footer 
        theme={theme} 
        onOpenPrivacy={() => { setLegalModalType('privacy'); setLegalModalOpen(true); }}
        onOpenTerms={() => { setLegalModalType('terms'); setLegalModalOpen(true); }}
      />

      {/* Legal Privacy & Terms fullscreen modal */}
      <AnimatePresence>
        {legalModalOpen && (
          <LegalModal
            isOpen={legalModalOpen}
            onClose={() => setLegalModalOpen(false)}
            type={legalModalType}
            theme={theme}
          />
        )}
      </AnimatePresence>

      {/* Predictive Gap Detection Explanation Modal */}
      <AnimatePresence>
        {isInfoModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInfoModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/85 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className={`relative w-full max-w-md p-6 rounded-3xl border shadow-2xl z-10 ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800 text-white shadow-brand-green-950/20' 
                  : 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-300/40'
              }`}
            >
              {/* Close button */}
              <button
                onClick={() => setIsInfoModalOpen(false)}
                className={`absolute top-4 right-4 p-1.5 rounded-full hover:bg-zinc-800/10 transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-500'
                }`}
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3.5 mt-2">
                <div className={`p-2.5 rounded-2xl flex-shrink-0 ${
                  isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'
                }`}>
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold">Predictive Gap Detection</h3>
                  <p className={`text-xs mt-1 font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    How Kavrol protects your peace of mind
                  </p>
                </div>
              </div>

              <div className={`mt-5 space-y-3.5 text-xs leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                <p>
                  Traditional banking sits back and waits for you to slip up, collecting billions in overdraft and late fees. Kavrol works differently by keeping a proactive eye on your timing.
                </p>
                <p>
                  By analyzing your past deposit patterns and regular bills, our smart estimator maps your daily balance path. When we spot a bill scheduled to land before your next check is in, we flag it as a <span className="font-semibold text-amber-500">Projected Gap</span>.
                </p>
                <p>
                  With <span className="font-semibold text-brand-green-500">Auto-Protection</span> enabled, Kavrol immediately steps in to bridge that temporary buffer. We make sure your rent is paid on time, completely fee-free, with no interest and zero stress.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsInfoModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-brand-green-500 text-zinc-950 font-semibold text-xs hover:bg-brand-green-600 transition-colors active:scale-95 shadow-md"
                >
                  Got it, thanks!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Subtle sticky hint near bottom scroll */}
      <AnimatePresence>
        {showFloatingCTA && !isCtaMinimized && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.8, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ delay: 1, duration: 0.3 }}
            onClick={() => {
              const el = document.getElementById('section-7-early-access');
              if (el) {
                const yOffset = -70;
                const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="fixed bottom-6 left-6 z-45 hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-950/90 dark:bg-zinc-900/90 border border-zinc-800/40 backdrop-blur-md text-[10px] font-mono text-zinc-400 hover:text-brand-green-400 cursor-pointer shadow-md select-none transition-all hover:scale-105 active:scale-95 duration-200"
          >
            <span>Join Early Access anytime</span>
            <span className="text-brand-green-500 animate-pulse font-bold">→</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sticky CTA Button on scroll */}
      <AnimatePresence>
        {showFloatingCTA && (
          isCtaMinimized ? (
            <motion.button
              key="floating-cta-minimized"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.25, ease: [0.21, 0.6, 0.35, 1] }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsCtaMinimized(false)}
              title="Unhide Join Early Access CTA"
              className="fixed z-50 bottom-6 right-6 p-2 rounded-full bg-brand-green-500 text-zinc-950 border border-brand-green-400 shadow-[0_4px_20px_rgba(16,185,129,0.3)] cursor-pointer hover:bg-brand-green-400 flex items-center justify-center transition-all duration-300 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-950 animate-pulse" />
              <span className="absolute right-full mr-2 px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-100 text-[10px] font-sans font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-zinc-800 shadow-md">
                Unhide CTA
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="floating-cta-expanded"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.21, 0.6, 0.35, 1] }}
              className="fixed z-50 bottom-6 right-6 p-0.5 rounded-full bg-brand-green-500 text-zinc-950 border border-brand-green-400 shadow-[0_4px_20px_rgba(16,185,129,0.3)] flex items-center gap-0.5 transition-all duration-300"
            >
              {/* Main Action Part */}
              <button
                onClick={() => {
                  const el = document.getElementById('section-7-early-access');
                  if (el) {
                    const yOffset = -70;
                    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="px-2.5 py-1.5 rounded-full font-display font-bold text-[10px] flex items-center gap-1 cursor-pointer hover:bg-brand-green-400/30 transition-colors focus:outline-none text-zinc-950"
              >
                <span>Join Early Access</span>
                <Sparkles className="w-3 h-3 text-zinc-950" />
              </button>

              {/* Separator */}
              <div className="w-[1px] h-3 bg-zinc-950/20" />

              {/* Minimize / Hide Trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCtaMinimized(true);
                }}
                title="Hide CTA"
                className="p-1.5 rounded-full hover:bg-brand-green-400/30 transition-colors cursor-pointer flex items-center justify-center focus:outline-none"
              >
                <X className="w-3 h-3 text-zinc-950" />
              </button>
            </motion.div>
          )
        )}
      </AnimatePresence>

    </div>
  );
}
