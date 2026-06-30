import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Send, 
  Check, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  ChevronRight,
  Clock,
  TrendingUp
} from 'lucide-react';
import { WaitlistSubmission } from '../types';
import { WaitlistSuccessScreen } from './WaitlistSuccessScreen';
import { supabase } from '../lib/supabase';

interface WaitlistFormProps {
  theme: 'dark' | 'light';
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  // Submission state
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [primaryConcern, setPrimaryConcern] = useState('Rent Payment');
  const [launchInterest, setLaunchInterest] = useState('Critical need');
  const [activeWaitlist, setActiveWaitlist] = useState<WaitlistSubmission | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Optional feedback survey states
  const [payFrequency, setPayFrequency] = useState('');
  const [mostStressfulBill, setMostStressfulBill] = useState('');
  const [overdraftExperience, setOverdraftExperience] = useState('');
  const [mismatchStory, setMismatchStory] = useState('');
  const [heardAboutUs, setHeardAboutUs] = useState('');
  const [interestReasons, setInterestReasons] = useState<string[]>([]);
  const [showOptionalFeedback, setShowOptionalFeedback] = useState(false);
  
  // Interactive UI Feedbacks
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveRegistrants, setLiveRegistrants] = useState(48194);

  // Check for existing registration on mount
  useEffect(() => {
    const saved = localStorage.getItem('kavrol_waitlist_registration');
    if (saved) {
      try {
        setActiveWaitlist(JSON.parse(saved));
      } catch (e) {
        // ignore parsing error
      }
    }

    // Tick up the live registrants counter slightly for realistic movement feel
    const interval = setInterval(() => {
      setLiveRegistrants((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Real Supabase insert with individual columns
      const { data, error: insertError } = await supabase
        .from('early_access')
        .insert([
          {
            first_name: firstName,
            email: email,
            phone: phone || null,
            payment_frequency: payFrequency || null,
            most_stressful_bill: mostStressfulBill || null,
            overdraft_experience: overdraftExperience || null,
            referral_source: heardAboutUs || null,
            story: mismatchStory || null,
            why_kavrol: interestReasons.join(', ') || null,
          },
        ])
        .select();

      if (insertError) {
        throw insertError;
      }

      const generatedId = data && data[0] && data[0].id 
        ? String(data[0].id) 
        : `KAV-${Math.floor(100000 + Math.random() * 900000)}`;

      const rank = liveRegistrants + 1;
      const submission: WaitlistSubmission = {
        id: generatedId,
        firstName,
        email,
        phone: phone || undefined,
        primaryConcern,
        launchInterest,
        rank,
        submittedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };

      localStorage.setItem('kavrol_waitlist_registration', JSON.stringify(submission));
      setActiveWaitlist(submission);
      setLiveRegistrants(rank);
    } catch (err: any) {
      console.error("🔥 FULL SUPABASE ERROR:", err);
    
      setError(
        err?.message ||
        err?.error_description ||
        JSON.stringify(err) ||
        "Unknown Supabase error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('kavrol_waitlist_registration');
    setActiveWaitlist(null);
    setFirstName('');
    setEmail('');
    setPhone('');
    setPayFrequency('');
    setMostStressfulBill('');
    setOverdraftExperience('');
    setMismatchStory('');
    setHeardAboutUs('');
    setInterestReasons([]);
    setShowOptionalFeedback(false);
    setError(null);
  };

  // On successful Early Access submission: ALWAYS render ONLY this screen
  if (activeWaitlist) {
    return (
      <WaitlistSuccessScreen
        submission={activeWaitlist}
        theme={theme}
        onReturn={handleReset}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto" id="waitlist-movement-container">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Form */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <motion.form
            key="waitlist-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleSubmit}
            id="waitlist-submission-form"
            className={`p-6 md:p-8 rounded-3xl border ${
              isDark ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-xl shadow-zinc-200/40'
            }`}
          >
            <div className="mb-6 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono mb-3 bg-brand-green-500/10 text-brand-green-400 border border-brand-green-500/20">
                <Users className="w-3.5 h-3.5 animate-pulse" />
                <span>{liveRegistrants.toLocaleString()} MEMBERS REGISTERED</span>
              </div>
              <h4 className="text-xl md:text-2xl font-display font-semibold tracking-tight">
                Check if you’re eligible in seconds
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Enter your details below to secure your early spot and check your payment protection status instantly.
              </p>
            </div>

            <div className="space-y-4">
              {/* Grid for Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      placeholder="Elizabeth"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      id="waitlist-input-firstname"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 ${
                        isDark
                          ? 'bg-zinc-900 border-zinc-800 focus:border-brand-green-500 focus:ring-brand-green-500 text-white placeholder-zinc-600'
                          : 'bg-zinc-50 border-zinc-200 focus:border-brand-green-500 focus:ring-brand-green-500 text-zinc-900 placeholder-zinc-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="elizabeth@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="waitlist-input-email"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 ${
                        isDark
                          ? 'bg-zinc-900 border-zinc-800 focus:border-brand-green-500 focus:ring-brand-green-500 text-white placeholder-zinc-600'
                          : 'bg-zinc-50 border-zinc-200 focus:border-brand-green-500 focus:ring-brand-green-500 text-zinc-900 placeholder-zinc-400'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Phone (Optional) */}
              <div>
                <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                  Mobile Number (Optional - For early SMS notification)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="waitlist-input-phone"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 ${
                      isDark
                        ? 'bg-zinc-900 border-zinc-800 focus:border-brand-green-500 focus:ring-brand-green-500 text-white placeholder-zinc-600'
                        : 'bg-zinc-50 border-zinc-200 focus:border-brand-green-500 focus:ring-brand-green-500 text-zinc-900 placeholder-zinc-400'
                    }`}
                  />
                </div>
              </div>

              {/* Optional Feedback Button toggle */}
              <div className="pt-2">
                <div className={`text-xs font-semibold font-mono mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  👉 Optional (Help us improve Kavrol)
                </div>
                <button
                  type="button"
                  onClick={() => setShowOptionalFeedback(!showOptionalFeedback)}
                  className={`text-xs font-semibold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    isDark ? 'text-brand-green-400 hover:text-brand-green-300' : 'text-brand-green-600 hover:text-brand-green-700'
                  }`}
                >
                  <span>{showOptionalFeedback ? 'Hide optional questions' : 'Show optional questions'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showOptionalFeedback ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Collapsible Feedback section */}
              <AnimatePresence>
                {showOptionalFeedback && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`space-y-4 pt-3 border-t overflow-hidden ${isDark ? 'border-zinc-900' : 'border-zinc-100'}`}
                  >
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      Your answers are private and will help us design a better product for real timing needs.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                          Payment Frequency
                        </label>
                        <select
                          value={payFrequency}
                          onChange={(e) => setPayFrequency(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all focus:outline-none focus:ring-1 ${
                            isDark
                              ? 'bg-zinc-900 border-zinc-800 focus:border-brand-green-500 text-white'
                              : 'bg-zinc-50 border-zinc-200 focus:border-brand-green-500 text-zinc-900'
                          }`}
                        >
                          <option value="">Select frequency...</option>
                          <option value="Every week">Every week</option>
                          <option value="Every two weeks">Every two weeks</option>
                          <option value="Once a month">Once a month</option>
                          <option value="Freelance/Gig/Uber">Freelance / Gig / Uber</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                          Most Stressful Bill
                        </label>
                        <select
                          value={mostStressfulBill}
                          onChange={(e) => setMostStressfulBill(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all focus:outline-none focus:ring-1 ${
                            isDark
                              ? 'bg-zinc-900 border-zinc-800 focus:border-brand-green-500 text-white'
                              : 'bg-zinc-50 border-zinc-200 focus:border-brand-green-500 text-zinc-900'
                          }`}
                        >
                          <option value="">Select bill type...</option>
                          <option value="Rent/Mortgage">Rent / Mortgage</option>
                          <option value="Car/Auto">Car / Auto</option>
                          <option value="Electric/Utilities">Electric / Utilities</option>
                          <option value="Insurance">Insurance</option>
                          <option value="Credit Cards">Credit Cards</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                        Overdraft Experience
                      </label>
                      <select
                        value={overdraftExperience}
                        onChange={(e) => setOverdraftExperience(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all focus:outline-none focus:ring-1 ${
                          isDark
                            ? 'bg-zinc-900 border-zinc-800 focus:border-brand-green-500 text-white'
                            : 'bg-zinc-50 border-zinc-200 focus:border-brand-green-500 text-zinc-900'
                        }`}
                      >
                        <option value="">Select experience...</option>
                        <option value="Yes, I have paid overdraft fees recently">Yes, I have paid overdraft fees recently</option>
                        <option value="Yes, but not recently">Yes, but not recently</option>
                        <option value="No, but I stress about it">No, but I stress about it</option>
                        <option value="No, never">No, never</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                        How did you hear about Kavrol?
                      </label>
                      <select
                        value={heardAboutUs}
                        onChange={(e) => setHeardAboutUs(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all focus:outline-none focus:ring-1 ${
                          isDark
                            ? 'bg-zinc-900 border-zinc-800 focus:border-brand-green-500 text-white'
                            : 'bg-zinc-50 border-zinc-200 focus:border-brand-green-500 text-zinc-900'
                        }`}
                      >
                        <option value="">Select an option...</option>
                        <option value="Social Media (TikTok, Instagram, Twitter)">Social Media (TikTok, Instagram, Twitter)</option>
                        <option value="Search Engine (Google, Bing)">Search Engine (Google, Bing)</option>
                        <option value="Friend / Coworker">Friend / Coworker</option>
                        <option value="News / Article / Blog">News / Article / Blog</option>
                        <option value="Podcast / YouTube video">Podcast / YouTube video</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                        Tell Us Your Story
                      </label>
                      <textarea
                        placeholder="Tell us your story about bill timing mismatches, payday timing gaps, or experiences with bank overdraft fees..."
                        rows={3}
                        value={mismatchStory}
                        onChange={(e) => setMismatchStory(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-xs transition-all focus:outline-none focus:ring-1 ${
                          isDark
                            ? 'bg-zinc-900 border-zinc-800 focus:border-brand-green-500 focus:ring-brand-green-500 text-white placeholder-zinc-600'
                            : 'bg-zinc-50 border-zinc-200 focus:border-brand-green-500 focus:ring-brand-green-500 text-zinc-900 placeholder-zinc-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-[10px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                        Why Kavrol? (Optional)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          "I've paid overdraft fees",
                          "Paycheck arrives after bills",
                          "I want better cash-flow visibility",
                          "To prevent late fees on rent",
                          "I'm curious about the product",
                          "Other"
                        ].map((option) => {
                          const isSelected = interestReasons.includes(option);
                          return (
                            <button
                              type="button"
                              key={option}
                              onClick={() => {
                                if (isSelected) {
                                  setInterestReasons(interestReasons.filter(r => r !== option));
                                } else {
                                  setInterestReasons([...interestReasons, option]);
                                }
                              }}
                              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-left border transition-all ${
                                isSelected
                                  ? 'bg-brand-green-500/10 border-brand-green-500/40 text-brand-green-400 font-semibold'
                                  : isDark
                                    ? 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                                    : 'bg-zinc-50 border-zinc-200 text-zinc-650 hover:border-zinc-300'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0 ${
                                isSelected
                                  ? 'bg-brand-green-500 border-brand-green-500 text-zinc-950'
                                  : isDark ? 'border-zinc-800' : 'border-zinc-300'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="flex-1 truncate">{option}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-500 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              id="waitlist-submit-button"
              className="w-full mt-6 py-3 rounded-xl bg-brand-green-500 text-zinc-950 font-display font-semibold text-sm hover:bg-brand-green-600 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Become an Early Member</span>
                </>
              )}
            </button>
          </motion.form>
        </div>

        {/* Right Column: Why Joining Matters */}
        <div className="md:col-span-5 flex flex-col justify-center space-y-6">
          <div className={`p-6 rounded-3xl border ${
            isDark ? 'bg-zinc-900/20 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
          }`}>
            <h5 className="font-display font-semibold text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-green-500" />
              <span>Why early membership matters</span>
            </h5>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green-500/10 flex items-center justify-center shrink-0 border border-brand-green-500/20 text-brand-green-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Be the first to know</p>
                  <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Get invited to join Kavrol before the general public as we expand our early access program.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green-500/10 flex items-center justify-center shrink-0 border border-brand-green-500/20 text-brand-green-500">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Help shape the product</p>
                  <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Share your feedback directly with us and tell us what features would help you the most.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green-500/10 flex items-center justify-center shrink-0 border border-brand-green-500/20 text-brand-green-500">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Lifetime supporter status</p>
                  <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Receive dedicated support priority and special early recognition as a founding early member.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
