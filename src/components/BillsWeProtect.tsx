import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Zap, 
  Droplet, 
  Flame, 
  Wifi, 
  Phone, 
  Shield, 
  Car, 
  GraduationCap, 
  Dumbbell, 
  Tv, 
  Music, 
  Disc, 
  CreditCard, 
  Landmark, 
  Layers,
  Lock,
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  Eye
} from 'lucide-react';

interface BillItem {
  name: string;
  icon: React.ComponentType<any>;
  status: 'Monitoring' | 'Protected' | 'At Risk';
}

interface BillsWeProtectProps {
  theme: 'dark' | 'light';
}

export const BillsWeProtect: React.FC<BillsWeProtectProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  // State to track accordion state on mobile
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    essentials: true,
    financial: true,
    subscriptions: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const categories = [
    {
      key: 'essentials',
      title: 'Essentials',
      subtitle: 'Critical daily living services',
      icon: Home,
      items: [
        { name: 'Rent / Mortgage', icon: Home, status: 'At Risk' },
        { name: 'Electricity', icon: Zap, status: 'Protected' },
        { name: 'Water', icon: Droplet, status: 'Monitoring' },
        { name: 'Gas', icon: Flame, status: 'Monitoring' },
        { name: 'Internet', icon: Wifi, status: 'Protected' },
        { name: 'Phone', icon: Phone, status: 'Monitoring' },
      ] as BillItem[]
    },
    {
      key: 'financial',
      title: 'Financial Obligations',
      subtitle: 'Loans, insurance & credit lines',
      icon: Landmark,
      items: [
        { name: 'Insurance', icon: Shield, status: 'Monitoring' },
        { name: 'Car Payment', icon: Car, status: 'Protected' },
        { name: 'Student Loan', icon: GraduationCap, status: 'At Risk' },
        { name: 'Credit Card Min Pay', icon: CreditCard, status: 'Monitoring' },
        { name: 'HOA Fees', icon: Landmark, status: 'Monitoring' },
      ] as BillItem[]
    },
    {
      key: 'subscriptions',
      title: 'Subscriptions',
      subtitle: 'Recreation and daily utilities',
      icon: Tv,
      items: [
        { name: 'Netflix', icon: Tv, status: 'Protected' },
        { name: 'Spotify', icon: Music, status: 'Monitoring' },
        { name: 'Apple Music', icon: Disc, status: 'Monitoring' },
        { name: 'Gym Membership', icon: Dumbbell, status: 'Protected' },
        { name: 'Other Recurring Bills', icon: Layers, status: 'Monitoring' },
      ] as BillItem[]
    }
  ];

  const getStatusBadge = (status: 'Monitoring' | 'Protected' | 'At Risk') => {
    switch (status) {
      case 'Protected':
        return (
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
            isDark 
              ? 'bg-brand-green-500/10 border-brand-green-500/30 text-brand-green-400' 
              : 'bg-brand-green-50 border-brand-green-200 text-brand-green-600'
          }`}>
            <ShieldCheck className="w-3 h-3 text-brand-green-500 animate-pulse" />
            <span>Protected</span>
          </div>
        );
      case 'At Risk':
        return (
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border bg-amber-500/10 border-amber-500/30 text-amber-500">
            <AlertTriangle className="w-3 h-3 text-amber-500" />
            <span>At Risk</span>
          </div>
        );
      case 'Monitoring':
      default:
        return (
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-medium border ${
            isDark 
              ? 'bg-zinc-900 border-zinc-800 text-zinc-400' 
              : 'bg-zinc-100 border-zinc-200 text-zinc-600'
          }`}>
            <Eye className="w-3 h-3 text-zinc-500" />
            <span>Monitoring</span>
          </div>
        );
    }
  };

  return (
    <section 
      id="section-bills-we-protect" 
      className={`py-12 px-6 relative overflow-hidden transition-all duration-500 border-b ${
        isDark ? 'bg-zinc-950/20 border-zinc-900/60' : 'bg-zinc-50/50 border-zinc-200/50'
      }`}
    >
      {/* Visual background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-green-500/2 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION TITLE & SUBTITLE */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-brand-green-500 bg-brand-green-500/10 px-3 py-1 rounded-full uppercase">
            Bill Coverage
          </span>
          <h2 className={`text-2xl sm:text-3xl font-display font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-zinc-900'
          }`}>
            All Your Monthly Bills, Covered
          </h2>
          <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed max-w-lg mx-auto`}>
            Kavrol watches all your monthly bills and subscriptions in one place, predicting timing gaps and protecting eligible payments.
          </p>
        </div>

        {/* DESKTOP VIEW: 3-Column Grouped Categories */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div 
                key={cat.key} 
                className={`p-5 rounded-3xl border flex flex-col h-full ${
                  isDark 
                    ? 'bg-zinc-900/40 border-zinc-900/80 hover:border-zinc-800' 
                    : 'bg-white border-zinc-200 shadow-sm'
                }`}
              >
                {/* Header of column */}
                <div className="flex items-center gap-3 pb-4 border-b border-zinc-500/10 mb-4">
                  <div className={`p-2 rounded-xl ${
                    isDark ? 'bg-zinc-950 text-brand-green-500' : 'bg-brand-green-50 text-brand-green-600'
                  }`}>
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-display font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                      {cat.title}
                    </h3>
                    <p className="text-[10px] text-zinc-500">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Items in column */}
                <div className="space-y-2.5 flex-1">
                  {cat.items.map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        whileHover={{ scale: 1.01, x: 2 }}
                        className={`p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                          isDark 
                            ? 'bg-zinc-950/60 border-zinc-900/40 hover:border-zinc-800 hover:bg-zinc-950/90' 
                            : 'bg-zinc-50/50 border-zinc-150 hover:border-zinc-250 hover:bg-zinc-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-1.5 rounded-lg shrink-0 ${
                            isDark ? 'bg-zinc-900 text-zinc-400' : 'bg-white text-zinc-500 border border-zinc-200'
                          }`}>
                            <ItemIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className={`text-xs font-semibold truncate ${
                            isDark ? 'text-zinc-300' : 'text-zinc-800'
                          }`}>
                            {item.name}
                          </span>
                        </div>
                        <div className="shrink-0">
                          {getStatusBadge(item.status)}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE VIEW: Accordion Groups */}
        <div className="block md:hidden space-y-3">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isOpen = openAccordions[cat.key];
            return (
              <div 
                key={cat.key}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isDark 
                    ? 'bg-zinc-900/30 border-zinc-900' 
                    : 'bg-white border-zinc-200 shadow-sm'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleAccordion(cat.key)}
                  className="w-full flex items-center justify-between p-4 focus:outline-none text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${
                      isDark ? 'bg-zinc-950 text-brand-green-500' : 'bg-brand-green-50 text-brand-green-600'
                    }`}>
                      <CatIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-display font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        {cat.title}
                      </h4>
                      <p className="text-[9px] text-zinc-500 leading-none mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-brand-green-500' : ''
                  }`} />
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="p-4 pt-0 border-t border-zinc-500/5 space-y-2">
                        {cat.items.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <div
                              key={item.name}
                              className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                                isDark 
                                  ? 'bg-zinc-950/50 border-zinc-900/60' 
                                  : 'bg-zinc-50/50 border-zinc-150'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`p-1.5 rounded-lg shrink-0 ${
                                  isDark ? 'bg-zinc-900 text-zinc-400' : 'bg-white text-zinc-500 border border-zinc-200'
                                }`}>
                                  <ItemIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className={`text-[11px] font-semibold truncate ${
                                  isDark ? 'text-zinc-300' : 'text-zinc-800'
                                }`}>
                                  {item.name}
                                </span>
                              </div>
                              <div className="shrink-0">
                                {getStatusBadge(item.status)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="text-center text-[9px] font-mono text-zinc-500 mt-6 max-w-lg mx-auto leading-relaxed">
          * Kavrol is designed for recurring bills and subscription payments that follow a predictable schedule.
        </p>
      </div>
    </section>
  );
};
