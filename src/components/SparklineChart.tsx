import React, { useMemo, useState, useRef } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, TrendingUp, Sparkles, HelpCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SparklineChartProps {
  theme: 'dark' | 'light';
  checkingBalance: number;
  billAmount: number;
}

type VolatilityProfile = 'standard' | 'gig' | 'double';

export const SparklineChart: React.FC<SparklineChartProps> = ({
  theme,
  checkingBalance,
  billAmount
}) => {
  const isDark = theme === 'dark';
  const [profile, setProfile] = useState<VolatilityProfile>('standard');
  const [hoveredPoint, setHoveredPoint] = useState<{ day: number; balance: number; x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Define SVG canvas specs
  const width = 500;
  const height = 180;
  const padding = { top: 20, right: 25, bottom: 25, left: 45 };

  // Generate deterministic 30-day timeline based on inputs and profile
  const data = useMemo(() => {
    const points: { day: number; balance: number }[] = [];
    
    // Stable daily change factors to ensure no flickering
    const dailyFluctuations = [
      15, -10, -25, 45, -15, -30, 20, -10, 35, -45, -15, // Days 1-11
      0, // Day 12 (Major Bill hits)
      -20, -15, // Days 13-14 (Lowest dip pre-payday)
      1200, -30, -10, 40, -15, -50, 10, -20, 30, -45, -25, -15, 10, -5, // Days 15-28
      -80, // Day 29 (Pre-payday dip)
      1200 // Day 30 (Payday)
    ];

    let currentBalance = checkingBalance + (billAmount * 0.3); // Scale offset so checking balance is contextual

    for (let i = 0; i < 30; i++) {
      const day = i + 1;
      
      if (day === 12) {
        // Rent or major bill hits
        currentBalance -= billAmount;
      } else {
        currentBalance += dailyFluctuations[i];
      }

      // Profile variations
      if (profile === 'gig') {
        // High frequency fluctuations simulating inconsistent invoice clearings
        currentBalance += Math.sin(day * 1.2) * 120 + Math.cos(day * 0.6) * 60;
      } else if (profile === 'double') {
        // An unexpected car or medical bill hits on Day 23
        if (day === 23) {
          currentBalance -= 480;
        }
        if (day >= 23 && day < 30) {
          currentBalance += 15; // Slow crawl
        }
      }

      points.push({ day, balance: Math.round(currentBalance) });
    }

    return points;
  }, [checkingBalance, billAmount, profile]);

  // D3 calculations for path generation
  const { pathD, areaD, points, minPoint, overdraftCount, avgBalance } = useMemo(() => {
    const xDomain = [1, 30];
    const yDomain = d3.extent(data, (d: { day: number; balance: number }) => d.balance) as [number, number];
    
    // Ensure yDomain incorporates $0 line for standard scaling and visual buffer
    const minY = Math.min(-100, yDomain[0] - 50);
    const maxY = Math.max(checkingBalance + 1200, yDomain[1] + 100);

    const xScale = d3.scaleLinear()
      .domain(xDomain)
      .range([padding.left, width - padding.right]);

    const yScale = d3.scaleLinear()
      .domain([minY, maxY])
      .range([height - padding.bottom, padding.top]);

    const lineGenerator = d3.line<{ day: number; balance: number }>()
      .x(d => xScale(d.day))
      .y(d => yScale(d.balance))
      .curve(d3.curveMonotoneX);

    const areaGenerator = d3.area<{ day: number; balance: number }>()
      .x(d => xScale(d.day))
      .y0(yScale(0)) // fill relative to $0 overdraft threshold!
      .y1(d => yScale(d.balance))
      .curve(d3.curveMonotoneX);

    const mappedPoints = data.map(d => ({
      day: d.day,
      balance: d.balance,
      x: xScale(d.day),
      y: yScale(d.balance)
    }));

    // Find absolute lowest point
    let lowest = mappedPoints[0];
    let under0 = 0;
    let sum = 0;
    
    mappedPoints.forEach(p => {
      if (p.balance < lowest.balance) {
        lowest = p;
      }
      if (p.balance < 0) {
        under0++;
      }
      sum += p.balance;
    });

    return {
      pathD: lineGenerator(data) || '',
      areaD: areaGenerator(data) || '',
      points: mappedPoints,
      minPoint: lowest,
      overdraftCount: under0,
      avgBalance: Math.round(sum / data.length)
    };
  }, [data, checkingBalance, billAmount]);

  // Handle interactive hover over SVG to find nearest day
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    
    // Convert coordinate scaling
    const scaleX = d3.scaleLinear()
      .domain([1, 30])
      .range([padding.left, width - padding.right]);

    // Find closest data point
    let closestIndex = 0;
    let minDiff = Infinity;
    
    points.forEach((p, idx) => {
      const diff = Math.abs(p.x - mouseX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    const activePoint = points[closestIndex];
    if (activePoint && mouseX >= padding.left - 10 && mouseX <= width - padding.right + 10) {
      setHoveredPoint(activePoint);
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const isOverdraftRisk = minPoint.balance < 0;

  return (
    <div className={`p-4 rounded-2xl border transition-all ${
      isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
    }`} id="d3-sparkline-volatility-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-green-500 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            30-Day Balance Volatility
          </h5>
          <p className={`text-[10px] mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            D3 simulated projection showing paycheck timing gaps and deficit vulnerability.
          </p>
        </div>

        {/* Volatility Profile Switcher */}
        <div className="flex bg-zinc-950/40 rounded-lg p-0.5 border border-zinc-800/40 self-start">
          {(['standard', 'gig', 'double'] as VolatilityProfile[]).map((p) => (
            <button
              key={p}
              onClick={() => setProfile(p)}
              className={`px-2 py-1 rounded-md text-[9px] font-mono font-bold uppercase transition-all ${
                profile === p
                  ? 'bg-brand-green-500 text-zinc-950'
                  : isDark 
                    ? 'text-zinc-500 hover:text-zinc-300' 
                    : 'text-zinc-400 hover:text-zinc-700'
              }`}
            >
              {p === 'standard' ? 'Standard' : p === 'gig' ? 'Gig Worker' : 'Unexpected Bill'}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative overflow-visible">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="overdraft-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines and background guidelines */}
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            className={isDark ? 'stroke-zinc-800' : 'stroke-zinc-200'}
            strokeWidth="1"
          />

          {/* $0 Overdraft line */}
          {(() => {
            const yZeroScale = d3.scaleLinear()
              .domain([
                Math.min(-100, (d3.min(data, (d: { day: number; balance: number }) => d.balance) ?? 0) - 50),
                Math.max(checkingBalance + 1200, (d3.max(data, (d: { day: number; balance: number }) => d.balance) ?? 0) + 100)
              ])
              .range([height - padding.bottom, padding.top]);
            const yZero = yZeroScale(0);
            
            return (
              <>
                <line
                  x1={padding.left}
                  y1={yZero}
                  x2={width - padding.right}
                  y2={yZero}
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className="opacity-60"
                />
                <text
                  x={padding.left - 5}
                  y={yZero + 3}
                  textAnchor="end"
                  fill="#ef4444"
                  className="text-[9px] font-mono font-bold"
                >
                  $0
                </text>
              </>
            );
          })()}

          {/* Sparkline Curve Area Fill */}
          <path
            d={areaD}
            fill="url(#area-gradient)"
          />

          {/* Sparkline Stroke Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Key Reference markers (Day 15 Payday, Day 12 Rent) */}
          {points.map((p, idx) => {
            if (p.day === 12 || p.day === 15 || p.day === 30) {
              return (
                <g key={idx} className="opacity-80">
                  <line
                    x1={p.x}
                    y1={padding.top}
                    x2={p.x}
                    y2={height - padding.bottom}
                    className={isDark ? 'stroke-zinc-800' : 'stroke-zinc-200'}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill={p.day === 12 ? '#ef4444' : '#22c55e'}
                    className="shadow"
                  />
                </g>
              );
            }
            return null;
          })}

          {/* Overdraft Lowest Point Highlight */}
          {isOverdraftRisk && (
            <g filter="url(#glow)">
              <circle
                cx={minPoint.x}
                cy={minPoint.y}
                r="6"
                fill="#ef4444"
                className="animate-ping opacity-40"
              />
              <circle
                cx={minPoint.x}
                cy={minPoint.y}
                r="4.5"
                fill="#ef4444"
              />
            </g>
          )}

          {/* Interactive Tooltip Hover Guideline & Data point */}
          {hoveredPoint && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1={padding.top}
                x2={hoveredPoint.x}
                y2={height - padding.bottom}
                stroke={isDark ? '#3f3f46' : '#d4d4d8'}
                strokeWidth="1"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="5"
                fill="#22c55e"
                stroke={isDark ? '#09090b' : '#ffffff'}
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* Static Axes/Labels */}
          <text
            x={padding.left}
            y={height - 8}
            fill={isDark ? '#52525b' : '#a1a1aa'}
            className="text-[8px] font-mono"
            textAnchor="start"
          >
            Day 1
          </text>
          <text
            x={points[11]?.x || width / 2}
            y={height - 8}
            fill={isDark ? '#71717a' : '#71717a'}
            className="text-[8px] font-mono font-semibold"
            textAnchor="middle"
          >
            Day 12 (Rent)
          </text>
          <text
            x={points[14]?.x || width * 0.6}
            y={height - 8}
            fill="#22c55e"
            className="text-[8px] font-mono font-semibold"
            textAnchor="middle"
          >
            Day 15 (Paycheck)
          </text>
          <text
            x={width - padding.right}
            y={height - 8}
            fill={isDark ? '#52525b' : '#a1a1aa'}
            className="text-[8px] font-mono"
            textAnchor="end"
          >
            Day 30
          </text>
        </svg>

        {/* Hover Tooltip Overlay Box */}
        <AnimatePresence>
          {hoveredPoint && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`absolute top-0 right-0 p-2 rounded-xl border font-mono text-[10px] space-y-0.5 shadow-lg ${
                isDark ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              <div className="flex justify-between gap-4">
                <span className="text-zinc-500 uppercase font-bold">Timeline:</span>
                <span>Day {hoveredPoint.day}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-zinc-500 uppercase font-bold">Balance:</span>
                <span className={hoveredPoint.balance < 0 ? 'text-red-400 font-bold' : 'text-brand-green-500 font-bold'}>
                  ${hoveredPoint.balance.toLocaleString()}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Volatility Diagnostics Checklist & Narrative */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-zinc-800/20">
        <div className="space-y-1">
          <span className={`text-[9px] font-mono uppercase tracking-wider block ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            GAP ANALYSIS REPORT
          </span>
          <div className="flex items-center gap-1.5 text-xs">
            {isOverdraftRisk ? (
              <div className="flex items-center gap-1.5 text-red-400 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Overdraft Risk: HIGH</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Buffer Protection: ACTIVE</span>
              </div>
            )}
          </div>
          <p className={`text-[10px] leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
            {isOverdraftRisk 
              ? `Your account balance dips into deficit for ${overdraftCount} days, risking $35 overdraft fees per occurrence before your payday on Day 15.`
              : `Your balance stays positive, but liquid buffer is narrow. Kavrol ensures security margins.`
            }
          </p>
        </div>

        <div className={`p-2 rounded-xl flex flex-col justify-between ${
          isDark ? 'bg-zinc-950/50' : 'bg-white border border-zinc-150'
        }`}>
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-zinc-500">Average Balance:</span>
            <span className={avgBalance < 0 ? 'text-red-400' : 'text-zinc-300'}>${avgBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-zinc-500">Lowest Balance:</span>
            <span className={minPoint.balance < 0 ? 'text-red-400 font-bold' : 'text-brand-green-400'}>
              ${minPoint.balance.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-[10px] font-mono border-t border-zinc-800/40 pt-1 mt-1">
            <span className="text-zinc-500">Kavrol protection needed:</span>
            <span className="text-brand-green-500 font-bold">${Math.max(0, -minPoint.balance + 50)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
