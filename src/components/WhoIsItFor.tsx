import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Home, 
  Car, 
  GraduationCap, 
  AlertCircle 
} from 'lucide-react';

interface WhoIsItForProps {
  theme: 'dark' | 'light';
}

export const WhoIsItFor: React.FC<WhoIsItForProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const personas = [
    {
      id: 'biweekly',
      quote: "“I get paid every other Friday.”",
      description: "Paychecks that shift date while rent remains on a fixed monthly schedule mean you face a shortfall simply because of calendar mechanics.",
      icon: Calendar,
      tag: "Bi-weekly earners"
    },
    {
      id: 'rent-mismatch',
      quote: "“My rent is due before payday.”",
      description: "When rent lands on the 1st but your salary clears on the 5th, you are temporarily short—not because you lack income, but because of calendar misalignment.",
      icon: Home,
      tag: "Rent & salary mismatch"
    },
    {
      id: 'gig-work',
      quote: "“I drive for Uber / do gig work.”",
      description: "Variable daily or weekly payouts mean you can have highly unstable schedules where bill due dates overlap with low-earning periods.",
      icon: Car,
      tag: "Gig & independent workers"
    },
    {
      id: 'student',
      quote: "“I'm a student with recurring bills.”",
      description: "Managing insurance, phone, and subscription bills around semester payouts or part-time work schedules makes timing critical.",
      icon: GraduationCap,
      tag: "Students & young professionals"
    },
    {
      id: 'overdraft-fees',
      quote: "“I've paid overdraft fees just because of timing.”",
      description: "Paying an extra $35 simply because an automated electricity bill was pulled twelve hours before your paycheck arrived is a flaw in traditional banking.",
      icon: AlertCircle,
      tag: "Tired of overdraft cycles"
    }
  ];

  return (
    <div className="w-full" id="who-is-kavrol-for">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona, index) => {
          const IconComponent = persona.icon;
          return (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${
                isDark 
                  ? 'bg-zinc-900/30 border-zinc-900 hover:bg-zinc-900/40' 
                  : 'bg-zinc-50 border-zinc-100 hover:bg-zinc-50/80 shadow-sm'
              } ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div>
                {/* Icon & tag */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    isDark 
                      ? 'bg-brand-green-950/40 border-brand-green-500/20 text-brand-green-400' 
                      : 'bg-brand-green-50 border-brand-green-100 text-brand-green-700'
                  }`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${
                    isDark ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    {persona.tag}
                  </span>
                </div>

                {/* Relatable quote */}
                <h4 className={`text-lg font-display font-medium leading-relaxed tracking-tight mb-3 italic ${
                  isDark ? 'text-zinc-100' : 'text-zinc-900'
                }`}>
                  {persona.quote}
                </h4>
              </div>

              {/* Empathetic human description */}
              <p className={`text-xs leading-relaxed mt-2 ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                {persona.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
