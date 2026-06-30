import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign,
  Calendar,
  Layers,
  ChevronRight,
  User,
  Activity,
  AlertCircle,
  TrendingUp,
  CreditCard,
  Sparkles,
  RefreshCw,
  Zap,
  Lock,
  Search,
  Check
} from 'lucide-react';

interface OrbitingBill {
  id: string;
  name: string;
  icon: string;
  dueDate: string;
  amount: number;
  initialStatus: string;
  color: string;
  states: string[];
  timeline: {
    date: string;
    label: string;
    amount: string;
    description: string;
    type: 'balance' | 'due' | 'applied' | 'paycheck' | 'settlement' | 'safe';
  }[];
}

export const InteractiveSimulator: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  const isDark = theme === 'dark';
  
  // State for Orbiting System
  const [hoveredBillId, setHoveredBillId] = useState<string | null>(null);
  const [activeBillIndex, setActiveBillIndex] = useState<number>(0);
  const [orbitAngle, setOrbitAngle] = useState(0);
  
  // Orbiting Bills Definitions
  const bills: OrbitingBill[] = [
    {
      id: 'rent',
      name: 'Rent Payment',
      icon: '🏠',
      dueDate: 'Jul 3',
      amount: 1500,
      initialStatus: 'Scanning...',
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400',
      states: ['Scanning...', 'Timing Gap Detected', 'Protection Preparing', 'Protected', 'Paid', 'Waiting for Payday', 'Settled'],
      timeline: [
        { date: 'July 1', label: 'Checking Balance', amount: '$450.00', description: 'Your active balance falls below upcoming rent requirement.', type: 'balance' },
        { date: 'July 3', label: 'Rent Bill Due', amount: '$1,500.00', description: 'Rent auto-deduct is requested by your leasing portal.', type: 'due' },
        { date: 'July 3', label: 'Protection Applied', amount: '+$1,050.00', description: 'Kavrol covers the shortfall gap automatically, 0% interest.', type: 'applied' },
        { date: 'July 10', label: 'Paycheck Arrives', amount: '+$2,400.00', description: 'Your regular payroll direct deposit is verified and cleared.', type: 'paycheck' },
        { date: 'July 10', label: 'Automatic Settle', amount: '-$1,050.00', description: 'The zero-fee safety bridge is settled. Stress-free recovery.', type: 'settlement' }
      ]
    },
    {
      id: 'electricity',
      name: 'Electric Bill',
      icon: '⚡',
      dueDate: 'Jul 5',
      amount: 180,
      initialStatus: 'Protected',
      color: 'from-amber-500/20 to-yellow-500/20 text-amber-400',
      states: ['Monitoring', 'Potential Gap', 'Protection Ready', 'Protected', 'Paid', 'Waiting for Payday', 'Settled'],
      timeline: [
        { date: 'July 1', label: 'Checking Balance', amount: '$120.00', description: 'Active balance is sufficient for small subscriptions, but tight for utilities.', type: 'balance' },
        { date: 'July 5', label: 'Electricity Due', amount: '$180.00', description: 'Utility provider invoices electric service.', type: 'due' },
        { date: 'July 5', label: 'Protection Applied', amount: '+$60.00', description: 'Kavrol shields payment. Zero fees, zero bank overdraft triggers.', type: 'applied' },
        { date: 'July 10', label: 'Paycheck Arrives', amount: '+$2,400.00', description: 'Your direct deposit lands safely on payday.', type: 'paycheck' },
        { date: 'July 10', label: 'Automatic Settle', amount: '-$60.00', description: 'Exact shortfall is settled cleanly. Account remains pristine.', type: 'settlement' }
      ]
    },
    {
      id: 'insurance',
      name: 'Auto Insurance',
      icon: '🛡️',
      dueDate: 'Jul 7',
      amount: 210,
      initialStatus: 'Potential Gap',
      color: 'from-rose-500/20 to-red-500/20 text-rose-400',
      states: ['Scanning...', 'Potential Gap', 'Protection Preparing', 'Protected', 'Paid', 'Waiting for Payday', 'Settled'],
      timeline: [
        { date: 'July 1', label: 'Checking Balance', amount: '$100.00', description: 'Starting funds are allocated toward critical necessities.', type: 'balance' },
        { date: 'July 7', label: 'Insurance Due', amount: '$210.00', description: 'Auto-insurance carrier initiates monthly premium charge.', type: 'due' },
        { date: 'July 7', label: 'Protection Applied', amount: '+$110.00', description: 'Kavrol provides the necessary margin to authorize payment.', type: 'applied' },
        { date: 'July 10', label: 'Paycheck Arrives', amount: '+$2,400.00', description: 'Direct deposit lands and is ready to restore your balance.', type: 'paycheck' },
        { date: 'July 10', label: 'Automatic Settle', amount: '-$110.00', description: 'Kavrol covers the bridge and recovers the exact protection sum.', type: 'settlement' }
      ]
    },
    {
      id: 'internet',
      name: 'Gigabit Internet',
      icon: '📶',
      dueDate: 'Jul 12',
      amount: 75,
      initialStatus: 'Safe',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
      states: ['Monitoring', 'Balance High', 'Safe', 'Paid Successfully'],
      timeline: [
        { date: 'July 1', label: 'Checking Balance', amount: '$200.00', description: 'Starting balance is tracked securely by Kavrol.', type: 'balance' },
        { date: 'July 10', label: 'Paycheck Arrives', amount: '+$2,400.00', description: 'Paycheck lands two days prior to bill schedule.', type: 'paycheck' },
        { date: 'July 12', label: 'Internet Due', amount: '$75.00', description: 'Internet service fee is deducted directly from cleared funds.', type: 'safe' },
        { date: 'July 12', label: 'Status: Safe', amount: 'No Gap', description: 'Kavrol stands down automatically because timing alignment is safe.', type: 'safe' }
      ]
    },
    {
      id: 'loans',
      name: 'Student Loan',
      icon: '🎓',
      dueDate: 'Jul 15',
      amount: 320,
      initialStatus: 'Monitoring',
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400',
      states: ['Monitoring', 'Checking Payday', 'Safe', 'Paid Successfully'],
      timeline: [
        { date: 'July 1', label: 'Checking Balance', amount: '$150.00', description: 'Core ledger is balanced and actively tracked.', type: 'balance' },
        { date: 'July 10', label: 'Paycheck Arrives', amount: '+$2,400.00', description: 'Direct deposit clears, fully funding the upcoming loan debit.', type: 'paycheck' },
        { date: 'July 15', label: 'Loan Due', amount: '$320.00', description: 'Student loan payment is settled cleanly from your positive balance.', type: 'safe' },
        { date: 'July 15', label: 'Status: Safe', amount: 'No Gap', description: 'No protection required. Timing is balanced perfectly.', type: 'safe' }
      ]
    },
    {
      id: 'phone',
      name: 'Cell Phone',
      icon: '📱',
      dueDate: 'Jul 9',
      amount: 95,
      initialStatus: 'Potential Gap',
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400',
      states: ['Scanning...', 'Potential Gap', 'Protection Preparing', 'Protected', 'Paid', 'Waiting for Payday', 'Settled'],
      timeline: [
        { date: 'July 1', label: 'Checking Balance', amount: '$30.00', description: 'Available funds are low due to early month billing waves.', type: 'balance' },
        { date: 'July 9', label: 'Cell Phone Due', amount: '$95.00', description: 'Mobile carrier pulls monthly plan billing.', type: 'due' },
        { date: 'July 9', label: 'Protection Applied', amount: '+$65.00', description: 'Kavrol shields connection from service disruption and overdrafts.', type: 'applied' },
        { date: 'July 10', label: 'Paycheck Arrives', amount: '+$2,400.00', description: 'Your direct deposit hits right on time.', type: 'paycheck' },
        { date: 'July 10', label: 'Automatic Settle', amount: '-$65.00', description: 'The zero-fee gap buffer settles automatically. Restoring balance.', type: 'settlement' }
      ]
    }
  ];

  // Auto-rotating loop for state of each bill card
  const [billStates, setBillStates] = useState<Record<string, string>>({
    rent: 'Scanning...',
    electricity: 'Protected',
    insurance: 'Potential Gap',
    internet: 'Safe',
    loans: 'Monitoring',
    phone: 'Potential Gap'
  });

  // Cycle states for each bill every 6.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBillStates(prev => {
        const next = { ...prev };
        
        // Rent Cycle
        const rentSeq = ['Scanning...', 'Timing Gap Detected', 'Protection Preparing', 'Protected', 'Paid', 'Waiting for Payday', 'Settled'];
        const currRentIdx = rentSeq.indexOf(prev.rent);
        next.rent = rentSeq[(currRentIdx + 1) % rentSeq.length];

        // Electricity Cycle
        const elecSeq = ['Monitoring', 'Potential Gap', 'Protection Ready', 'Protected', 'Paid', 'Waiting for Payday', 'Settled'];
        const currElecIdx = elecSeq.indexOf(prev.electricity);
        next.electricity = elecSeq[(currElecIdx + 1) % elecSeq.length];

        // Insurance Cycle
        const insSeq = ['Scanning...', 'Potential Gap', 'Protection Preparing', 'Protected', 'Paid', 'Waiting for Payday', 'Settled'];
        const currInsIdx = insSeq.indexOf(prev.insurance);
        next.insurance = insSeq[(currInsIdx + 1) % insSeq.length];

        // Phone Cycle
        const phoneSeq = ['Scanning...', 'Potential Gap', 'Protection Preparing', 'Protected', 'Paid', 'Waiting for Payday', 'Settled'];
        const currPhoneIdx = phoneSeq.indexOf(prev.phone);
        next.phone = phoneSeq[(currPhoneIdx + 1) % phoneSeq.length];

        return next;
      });
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  // Soft continuous orbiting slow rotation
  useEffect(() => {
    let animId: number;
    const rotate = () => {
      setOrbitAngle(prev => (prev + 0.08) % 360);
      animId = requestAnimationFrame(rotate);
    };
    animId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Selected/active bill to show detailed timeline (on hover, or auto-cycling if none is hovered)
  useEffect(() => {
    if (hoveredBillId) {
      const idx = bills.findIndex(b => b.id === hoveredBillId);
      if (idx !== -1) setActiveBillIndex(idx);
    }
  }, [hoveredBillId]);

  // If no hover, auto cycle active index slowly every 5 seconds to keep the screen dynamic
  useEffect(() => {
    if (hoveredBillId) return;
    const interval = setInterval(() => {
      setActiveBillIndex(prev => (prev + 1) % bills.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hoveredBillId]);

  const activeBill = bills[activeBillIndex];

  // Live Activity Feed State
  const [activityFeed, setActivityFeed] = useState([
    { time: '10:02 AM', type: 'scan', text: 'Scanning July Rent schedule', status: 'Finding paycheck...' },
    { time: '10:02 AM', type: 'verify', text: 'Checking recurring payroll connection', status: 'Verified' },
    { time: '10:03 AM', type: 'gap', text: 'Potential timing gap detected (July Rent vs Payday)', status: 'Preparing protection' },
    { time: '10:03 AM', type: 'arm', text: 'Auto-Protection armed', status: 'Waiting for bill' },
    { time: '10:04 AM', type: 'pay', text: 'Utility Bill paid successfully via Kavrol Bridge', status: 'Paid' },
  ]);

  useEffect(() => {
    const activitiesPool = [
      { type: 'scan', text: 'Scanning Auto Insurance schedule', status: 'Verifying due dates...' },
      { type: 'verify', text: 'Employer Direct Deposit verified via Plaid', status: 'Pristine history' },
      { type: 'gap', text: 'Potential timing delay detected for Gigabit Internet', status: 'Evaluating balance' },
      { type: 'arm', text: 'Protection armed for Cell Phone payment', status: 'Armed & Ready' },
      { type: 'pay', text: 'Student Loan paid successfully, overdraft fees avoided', status: 'Success' },
      { type: 'settle', text: 'Direct deposit cleared. Automatic repayment processed', status: 'Settle complete' },
      { type: 'scan', text: 'Evaluating recurring subscriptions (Spotify/Gym)', status: 'Balance high, safe' },
    ];

    const interval = setInterval(() => {
      const randomActivity = activitiesPool[Math.floor(Math.random() * activitiesPool.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      setActivityFeed(prev => [
        { time: timeStr, ...randomActivity },
        ...prev.slice(0, 4)
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-16">
      
      {/* ALWAYS WATCHING INTRO */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green-500/10 border border-brand-green-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green-400 animate-ping" />
          <span className="text-[10px] font-mono font-bold text-brand-green-400 uppercase tracking-widest">
            ALWAYS WATCHING
          </span>
        </div>
        <h2 className={`text-4xl sm:text-5xl font-display font-black tracking-tight ${
          isDark ? 'text-white' : 'text-zinc-950'
        }`}>
          Your Bills Never Stop. <br />
          <span className="text-brand-green-500">Neither Does Kavrol.</span>
        </h2>
        <p className={`text-sm leading-relaxed max-w-xl mx-auto ${
          isDark ? 'text-zinc-400' : 'text-zinc-650'
        }`}>
          Every day your checking balance changes. Bills stay fixed. Paychecks move. Kavrol continuously watches the relationship between all three. If an eligible recurring bill is predicted to arrive before enough money is available, Kavrol prepares protection before the payment is due.
        </p>
      </div>

      {/* GIANT INTERACTIVE ORBITING VISUALIZATION */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 md:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
        isDark 
          ? 'bg-zinc-950/40 border-zinc-900/80 shadow-2xl' 
          : 'bg-white border-zinc-200 shadow-xl'
      }`}>
        
        {/* Absolute Background subtle radar styling */}
        <div className="absolute inset-0 bg-radial-gradient from-brand-green-500/2 to-transparent opacity-50 pointer-events-none" />

        {/* LEFT COLUMN: THE RADIAL ORBIT (6 Cols) */}
        <div className="lg:col-span-6 flex items-center justify-center min-h-[380px] md:min-h-[440px] relative">
          
          {/* Radar Waves background */}
          <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-zinc-800/10 dark:border-zinc-800/40 pointer-events-none" />
          <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-zinc-800/10 dark:border-zinc-800/30 pointer-events-none" />
          
          {/* CENTER NODE: TODAY */}
          <div className="absolute z-20 flex flex-col items-center justify-center">
            <motion.div 
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: ['0 0 0px rgba(16, 185, 129, 0.2)', '0 0 20px rgba(16, 185, 129, 0.4)', '0 0 0px rgba(16, 185, 129, 0.2)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 rounded-full bg-zinc-950 border border-brand-green-500/50 flex flex-col items-center justify-center text-center relative"
            >
              <div className="absolute inset-0 bg-brand-green-500/5 rounded-full animate-ping pointer-events-none" />
              <Clock className="w-5 h-5 text-brand-green-500 mb-0.5" />
              <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-widest">TODAY</span>
              <span className="text-[8px] font-mono text-zinc-500">Live Scan</span>
            </motion.div>
          </div>

          {/* Orbit Nodes Container */}
          <div className="absolute w-full h-full inset-0 flex items-center justify-center pointer-events-none">
            {bills.map((bill, index) => {
              // Compute angle position based on index & live rotation angle
              const baseAngle = (index * (360 / bills.length));
              const currentAngle = (baseAngle + orbitAngle) * (Math.PI / 180);
              
              // Orbit radius
              const radius = 135; 
              const x = Math.cos(currentAngle) * radius;
              const y = Math.sin(currentAngle) * radius;

              const liveState = billStates[bill.id] || bill.initialStatus;
              const isPotentialGap = liveState === 'Potential Gap' || liveState === 'Timing Gap Detected' || liveState === 'Protection Preparing';
              const isProtected = liveState === 'Protected' || liveState === 'Paid';

              return (
                <motion.div
                  key={bill.id}
                  style={{ x, y }}
                  className="absolute pointer-events-auto"
                >
                  <motion.div
                    onMouseEnter={() => setHoveredBillId(bill.id)}
                    onMouseLeave={() => setHoveredBillId(null)}
                    className={`p-3 rounded-2xl border cursor-pointer select-none transition-all duration-300 flex items-center gap-2.5 w-[145px] hover:scale-105 active:scale-95 shadow-md ${
                      activeBillIndex === index
                        ? isDark ? 'bg-zinc-900 border-brand-green-500/80 shadow-brand-green-500/5' : 'bg-zinc-50 border-brand-green-500 shadow-lg'
                        : isDark ? 'bg-zinc-950/90 border-zinc-900/80 hover:border-zinc-800' : 'bg-white border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <span className="text-lg shrink-0">{bill.icon}</span>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className={`text-[10px] font-bold truncate ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                        {bill.name}
                      </p>
                      <div className="flex justify-between items-center text-[8px] text-zinc-500 font-mono">
                        <span>Due {bill.dueDate}</span>
                        <span className="font-semibold text-zinc-400">${bill.amount}</span>
                      </div>
                      
                      {/* Live Status indicator */}
                      <span className={`inline-block text-[8px] px-1.5 py-0.5 rounded font-medium mt-1 truncate ${
                        isPotentialGap
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : isProtected
                            ? 'bg-brand-green-500/10 text-brand-green-400 border border-brand-green-500/20'
                            : liveState === 'Safe'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {liveState}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE TIMELINE (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          
          <div className="space-y-3">
            <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
              Schedule Deep-Dive
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeBill.icon}</span>
              <h4 className={`text-xl font-display font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                {activeBill.name} Timeline
              </h4>
            </div>
            <p className="text-xs text-zinc-500">
              Hover over any orbiting bill card to freeze rotation and inspect its custom chronological protection pipeline.
            </p>
          </div>

          {/* DYNAMIC CONNECTED TIMELINE PLOTS */}
          <div className="relative pl-6 space-y-4">
            
            {/* Thread line */}
            <div className={`absolute left-2.5 top-1 bottom-1 w-[1px] ${
              isDark ? 'bg-zinc-800/60' : 'bg-zinc-200'
            }`} />

            {activeBill.timeline.map((step, idx) => {
              const isHighlight = step.type === 'applied' || step.type === 'safe';
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex items-start gap-4 relative"
                >
                  {/* Timeline bullet */}
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                    isHighlight
                      ? 'bg-brand-green-500 text-zinc-950 font-bold text-[9px]'
                      : isDark ? 'bg-zinc-900 border border-zinc-800 text-zinc-400 text-[8px]' : 'bg-zinc-100 border border-zinc-200 text-zinc-600 text-[8px]'
                  }`}>
                    {idx + 1}
                  </div>

                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className={`font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                        {step.label}
                      </span>
                      <span className={`font-mono text-[10px] ${
                        isHighlight ? 'text-brand-green-500 font-bold' : 'text-zinc-500'
                      }`}>
                        {step.amount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-zinc-500">
                      <span>{step.description}</span>
                      <span className="text-[9px] font-mono shrink-0 ml-4">{step.date}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

          </div>

          {/* BOTTOM TIMELINE RECOVERY STATUS */}
          <div className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
            isDark ? 'bg-zinc-950/60 border-zinc-900' : 'bg-zinc-50/50 border-zinc-150'
          }`}>
            <div className="space-y-0.5">
              <span className="text-[9px] font-mono text-zinc-500 uppercase block">Protection Mode</span>
              <span className={`font-bold block ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                {activeBill.amount > 500 ? 'Continuous Auto-Bridge' : 'Standard Sub Protection'}
              </span>
            </div>
            
            <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded bg-brand-green-500/10 text-brand-green-400 border border-brand-green-500/20`}>
              {activeBill.amount > 500 ? '0% Interest Buffer Armed' : 'Automated Micro-Credit'}
            </span>
          </div>

        </div>

      </div>



      {/* WHAT KAVROL WATCHES (Large Bento Grid) */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-[10px] font-mono font-bold tracking-widest text-brand-green-500 uppercase bg-brand-green-500/10 px-3 py-1 rounded-full">
            Data Ledger Scope
          </span>
          <h3 className={`text-2xl font-display font-black tracking-tight ${isDark ? 'text-white' : 'text-zinc-950'}`}>
            What Kavrol Watches
          </h3>
          <p className="text-xs text-zinc-500">
            We sync bank data with military-grade 256-bit encryption. We only read payment schedules—never storing credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Recurring Bills */}
          <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all hover:scale-[1.01] ${
            isDark ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-zinc-150 shadow-sm'
          }`}>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Recurring Bills</h4>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Continuous mapping of static overhead obligations.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Rent', 'Utilities', 'Insurance', 'Subscriptions', 'Loans'].map((tag) => (
                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Income */}
          <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all hover:scale-[1.01] ${
            isDark ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-zinc-150 shadow-sm'
          }`}>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-green-500/10 flex items-center justify-center text-brand-green-400">
                <DollarSign className="w-4 h-4" />
              </div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Income Patterns</h4>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Predictive analysis of cleared direct payroll deposits.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Direct Deposits', 'Employer Payroll', 'Gig Income', 'Regular Deposits'].map((tag) => (
                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Timing */}
          <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all hover:scale-[1.01] ${
            isDark ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-zinc-150 shadow-sm'
          }`}>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Timing Alignment</h4>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Scanning shifts and cycles of monthly obligations.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Due Dates', 'Expected Paydays', 'Recurring Patterns'].map((tag) => (
                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4: Protection */}
          <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all hover:scale-[1.01] ${
            isDark ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-zinc-150 shadow-sm'
          }`}>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Protection State</h4>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Applying automated zero-interest buffers when needed.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Potential Gap', 'Protection Needed', 'Already Protected', 'Repayment Scheduled'].map((tag) => (
                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
