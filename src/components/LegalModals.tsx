import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Shield, Lock, FileText, ChevronRight, CheckCircle, Mail, MapPin } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
  theme: 'dark' | 'light';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type, theme }) => {
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  // Define section metadata for TOC
  const privacySections = [
    { id: 'p-collect', label: '1. Information We Collect', icon: FileText },
    { id: 'p-use', label: '2. How We Use Information', icon: CheckCircle },
    { id: 'p-security', label: '3. Bank Connection Security', icon: Lock },
    { id: 'p-third-party', label: '4. Third-Party Providers', icon: Shield },
    { id: 'p-retention', label: '5. Data Retention', icon: FileText },
    { id: 'p-cookies', label: '6. Cookies & Tracking', icon: Shield },
    { id: 'p-rights', label: '7. Your User Rights', icon: CheckCircle },
    { id: 'p-contact', label: '8. Contact Legal Support', icon: Mail },
  ];

  const termsSections = [
    { id: 't-eligibility', label: '1. Eligibility & Accounts', icon: CheckCircle },
    { id: 't-responsibilities', label: '2. User Responsibilities', icon: FileText },
    { id: 't-protection', label: '3. Auto-Protection Terms', icon: Shield },
    { id: 't-repayment', label: '4. Repayment Flow', icon: Lock },
    { id: 't-availability', label: '5. Service Availability', icon: Shield },
    { id: 't-billing', label: '6. Billing Authorization', icon: Lock },
    { id: 't-disclaimers', label: '7. Platform Disclaimers', icon: FileText },
    { id: 't-liability', label: '8. Limitation of Liability', icon: Shield },
    { id: 't-termination', label: '9. Account Termination', icon: X },
  ];

  const sections = type === 'privacy' ? privacySections : termsSections;

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = containerRef.current;
      if (!scrollContainer) return;

      let currentSection = '';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust threshold to detect which section is on screen
          if (rect.top <= 180) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection || sections[0]?.id || '');
    };

    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      // Initial trigger
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isOpen, type, sections]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el && containerRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md cursor-pointer"
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className={`relative w-full h-full sm:h-[90vh] max-w-6xl rounded-none sm:rounded-3xl border flex flex-col overflow-hidden shadow-2xl ${
          isDark 
            ? 'bg-zinc-950 border-zinc-900 text-zinc-100 shadow-zinc-950/80' 
            : 'bg-white border-zinc-200 text-zinc-800 shadow-zinc-300/40'
        }`}
      >
        {/* Header bar */}
        <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
          isDark ? 'border-zinc-900 bg-zinc-950/90' : 'border-zinc-200 bg-zinc-50/50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-green-500/10 border border-brand-green-500/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-brand-green-500" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base tracking-tight">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-wider">
                Last updated: June 2026 • Legal Division
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer ${
              isDark 
                ? 'border-zinc-850 hover:bg-zinc-900 text-zinc-400 hover:text-white' 
                : 'border-zinc-200 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-950'
            }`}
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area with Split Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* LEFT SIDEBAR: Table of Contents (Desktop only) */}
          <aside className={`hidden md:block w-72 shrink-0 border-r p-6 overflow-y-auto ${
            isDark ? 'border-zinc-900 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50/20'
          }`}>
            <h4 className={`text-[10px] font-mono uppercase tracking-widest mb-4 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Document Sections
            </h4>
            <div className="space-y-1">
              {sections.map((s) => {
                const isSelected = activeSection === s.id;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      isSelected 
                        ? 'bg-brand-green-500/10 border border-brand-green-500/25 text-brand-green-400' 
                        : isDark
                          ? 'border border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                          : 'border border-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-brand-green-400' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                      <span className="truncate">{s.label}</span>
                    </div>
                    <ChevronRight className={`w-3 h-3 shrink-0 transition-transform ${
                      isSelected ? 'translate-x-0.5 text-brand-green-400' : 'text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-zinc-400'
                    }`} />
                  </button>
                );
              })}
            </div>
            
            {/* Regulatory Footer */}
            <div className={`mt-8 pt-6 border-t text-[10px] space-y-3 font-sans ${isDark ? 'border-zinc-900' : 'border-zinc-200'}`}>
              <div className="flex gap-2">
                <Lock className="w-3.5 h-3.5 text-brand-green-500 shrink-0 mt-0.5" />
                <p className="text-zinc-500 leading-relaxed">
                  Encryption standard: AES-256 bank-grade protocol is verified secure.
                </p>
              </div>
              <p className="text-[9px] text-zinc-600">
                Kavrol Technologies Inc. and its designated payment processors are compliant with state financial technology regulation and security practices.
              </p>
            </div>
          </aside>

          {/* RIGHT SIDEBAR: Scrollable Legal Content */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8 space-y-10 scroll-smooth"
          >
            {type === 'privacy' ? (
              // PRIVACY POLICY CONTENT
              <div className="max-w-3xl space-y-12">
                
                {/* Introduction */}
                <div className="space-y-4">
                  <h3 className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                    Privacy Commitment & Data Governance
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    Welcome to Kavrol. Your privacy and the safety of your bank transactions represent our absolute priority. This Privacy Policy documents how Kavrol Technologies Inc. ("Kavrol", "we", "us", or "our") handles, collects, stores, protects, and handles your financial and personal variables when using our predictive gap protection platform.
                  </p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    By establishing a connection to your financial institution via Plaid, you authorize Kavrol to securely evaluate upcoming transaction times, historical deposit calendars, and payment queues to build custom protection bridges. We never resell your credentials, transactional databases, or personal identifiers.
                  </p>
                </div>

                {/* Section 1 */}
                <section id="p-collect" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <FileText className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      1. Information We Collect
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    We gather details strictly necessary to analyze, predict, and execute timing gap protections:
                  </p>
                  <ul className={`list-disc pl-5 text-xs space-y-2.5 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    <li>
                      <strong>Direct Personal Information:</strong> Legal name, verified physical mailing address, contact email address, verified cellular telephone number, and social security numbers if requested under bank authorization constraints.
                    </li>
                    <li>
                      <strong>Read-Only Bank Connection Data:</strong> Tokenized credentials facilitated exclusively by Plaid. This covers deposit history, upcoming recurring ACH pull lines, historical payroll deposit dates, ledger balance variables, and associated bank routing variables.
                    </li>
                    <li>
                      <strong>Technical Telemetry:</strong> Device specifications, dynamic IP coordinate ranges, browser tokens, operating system, and anonymous in-app click pathways to monitor interface security.
                    </li>
                  </ul>
                </section>

                {/* Section 2 */}
                <section id="p-use" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      2. How We Use Your Information
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    Your metrics are processed using advanced automated workflows designed for the following purposes:
                  </p>
                  <ul className={`list-disc pl-5 text-xs space-y-2.5 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    <li>
                      <strong>Predictive Analysis:</strong> Matching upcoming monthly recurring bills (rent, utility, insurance) with expected paydays to spot timing gaps before they become critical.
                    </li>
                    <li>
                      <strong>Bridging Authorization:</strong> Approving and directing temporary cash flow buffers to protect eligible bills.
                    </li>
                    <li>
                      <strong>ACH Debit Settlement:</strong> Coordinating automatic, interest-free repayment settlements once direct deposits hit your ledger.
                    </li>
                    <li>
                      <strong>Fraud Prevention:</strong> Checking identity metrics against global security registries to block automated identity thefts, laundering attempts, or duplicate profiles.
                    </li>
                  </ul>
                </section>

                {/* Section 3 */}
                <section id="p-security" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <Lock className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      3. Bank Connection Security
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    We utilize enterprise-grade defensive protocols to lock down bank credentials. Kavrol:
                  </p>
                  <ul className={`list-disc pl-5 text-xs space-y-2.5 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    <li>
                      <strong>Does Not Store Bank Passwords:</strong> We connect through Plaid's secure OAuth architecture. We never see, write, or cache your online banking login credentials.
                    </li>
                    <li>
                      <strong>Read-Only Transaction Isolation:</strong> Our analysis script cannot edit, transfer, or move funds from your account unless you explicitly authorize a temporary gap bridge repayment.
                    </li>
                    <li>
                      <strong>Bank-Grade Encryption:</strong> All server transmittals are encapsulated via AES-256 standard and secure TLS 1.3 tunnels during flight and rest.
                    </li>
                  </ul>
                </section>

                {/* Section 4 */}
                <section id="p-third-party" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <Shield className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      4. Third-Party Providers
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    We connect with third-party service vendors to satisfy legal and transactional processing requirements:
                  </p>
                  <ul className={`list-disc pl-5 text-xs space-y-2 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    <li>
                      <strong>Plaid Inc.:</strong> To handle read-only transactional stream retrieval.
                    </li>
                    <li>
                      <strong>Licensed Bank Partners:</strong> Standard ACH clearinghouse banks that issue the actual digital protection transfers.
                    </li>
                    <li>
                      <strong>Verification Networks:</strong> Standard identity confirmation platforms to process cellular and SSN checks safely.
                    </li>
                  </ul>
                </section>

                {/* Section 5 */}
                <section id="p-retention" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <FileText className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      5. Data Retention
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    Personal information is archived for the duration of active account status. If you initiate account deletion:
                  </p>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    Your personal variables, cellular contacts, and tokenized Plaid sessions are scrubbed within 30 business days. Financial history transaction archives are retained exclusively under statutory bank record-keeping standards (e.g. Bank Secrecy Act requirements) or unresolved repayment cases before deletion.
                  </p>
                </section>

                {/* Section 6 */}
                <section id="p-cookies" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <Shield className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      6. Cookies & Tracking
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    We place small data identifiers called cookies on your browsing device to retain active visual layout preferences, dark or light system styles, secure active sessions, and verify security protocols during interface access. You can configure your browser to drop or decline cookie blocks, but some key sections of the Kavrol platform might cease normal operation as a result.
                  </p>
                </section>

                {/* Section 7 */}
                <section id="p-rights" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      7. Your User Rights
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    Depending on your state of residence (such as California under the CCPA/CPRA, or Virginia under the VCDPA), you are granted specific rights regarding your data:
                  </p>
                  <ul className={`list-disc pl-5 text-xs space-y-2 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    <li><strong>Right to Know & Access:</strong> Request a complete audit log of what personal data and transaction vectors have been compiled.</li>
                    <li><strong>Right to Rectify:</strong> Modify incorrect telephone, mailing, or spelling variables stored in your profile.</li>
                    <li><strong>Right to Erasure:</strong> Instruct Kavrol to permanently wipe personal data blocks, subject to regulatory transaction holds.</li>
                    <li><strong>Right to Toggle:</strong> Disable Auto-Protection sweeps and terminate connection access immediately in settings.</li>
                  </ul>
                </section>

                {/* Section 8 */}
                <section id="p-contact" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <Mail className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      8. Contact Legal Support
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    For data retrieval, legal claims, CCPA disclosures, or compliance questions, reach our secure corporate officers directly:
                  </p>
                  <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                    isDark ? 'bg-zinc-900/40 border-zinc-850' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-brand-green-500" />
                      <span>legal@kavrol.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-green-500" />
                      <span>Kavrol Technologies Inc. • Attn: Legal Division </span>
                    </div>
                  </div>
                </section>

              </div>
            ) : (
              // TERMS OF SERVICE CONTENT
              <div className="max-w-3xl space-y-12">
                
                {/* Introduction */}
                <div className="space-y-4">
                  <h3 className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                    Terms of Service & Platform Agreement
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    Welcome to the Kavrol financial technology platform. This Terms of Service agreement ("Agreement") constitutes a legally binding contract between you ("User" or "you") and Kavrol Technologies Inc. ("Kavrol", "we", "us", or "our") governing your usage of our website, mobile application, predictive balance trackers, and Auto-Protection timing gap bridges.
                  </p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    By registering an account, connecting your bank ledger via Plaid, or activating the Auto-Protection switch, you accept and agree to all parameters set forth herein. Please read this contract fully. If you do not accept these terms, you are prohibited from utilizing Kavrol.
                  </p>
                </div>

                {/* Section 1 */}
                <section id="t-eligibility" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      1. Eligibility & Accounts
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    To qualify for a Kavrol account and access any bill timing gap protections, you must:
                  </p>
                  <ul className={`list-disc pl-5 text-xs space-y-2.5 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    <li>Be an individual of at least 18 years of age residing in the United States of America.</li>
                    <li>Own a verified US checking account with active ACH capabilities, direct payroll deposits, and at least 60 days of transactional history.</li>
                    <li>Connect your banking profile securely using Plaid to authorize read-only evaluation workflows.</li>
                  </ul>
                </section>

                {/* Section 2 */}
                <section id="t-responsibilities" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <FileText className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      2. User Responsibilities
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    By establishing an active profile, you guarantee that:
                  </p>
                  <ul className={`list-disc pl-5 text-xs space-y-2.5 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    <li>You will provide accurate, truthful, and updated personal profile coordinates (legal name, address, cell phone).</li>
                    <li>You will keep your connected bank account active. You will notify us immediately if your payroll structure, payroll schedule, or receiving bank account undergoes changes.</li>
                    <li>You will not use Kavrol to intentionally misrepresent account balances, initiate fraudulent transactions, or execute systematic defaults.</li>
                  </ul>
                </section>

                {/* Section 3 */}
                <section id="t-protection" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <Shield className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      3. Auto-Protection Terms
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    Kavrol's core service is automated timing gap protection:
                  </p>
                  <ul className={`list-disc pl-5 text-xs space-y-2.5 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    <li>
                      <strong>Shortfall Advances:</strong> If our predictive engine detects an upcoming recurring monthly bill (rent, utility, insurance) that would cause an overdraft or go unpaid due to paycheck timing gaps, we may extend a temporary buffer to satisfy the payment.
                    </li>
                    <li>
                      <strong>0% Interest & Zero Fees:</strong> We do not assess ongoing interest, compound fees, hidden setup margins, late penalties, or collection charges.
                    </li>
                    <li>
                      <strong>Non-Recourse Structure:</strong> Shortfall buffers represent non-recourse financial assistance. However, failed settlements or systematic defaults will immediately suspend your eligibility for subsequent protection bridges.
                    </li>
                  </ul>
                </section>

                {/* Section 4 */}
                <section id="t-repayment" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <Lock className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      4. Repayment Flow
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    Each time Kavrol covers an eligible timing gap, you agree to the associated repayment parameters:
                  </p>
                  <ul className={`list-disc pl-5 text-xs space-y-2.5 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    <li>
                      <strong>Automatic Debit Authorization:</strong> You explicitly authorize Kavrol to execute an automated ACH debit for the exact bridged amount from your connected bank account on your next scheduled payday (or whenever a direct deposit exceeding the bridged volume hits your balance ledger).
                    </li>
                    <li>
                      <strong>Repayment Adjustments:</strong> If you anticipate a paycheck delay or change, you can contact support at least two business days prior to the payday scheduled debit to adjust the settlement calendar.
                    </li>
                  </ul>
                </section>

                {/* Section 5 */}
                <section id="t-availability" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <Shield className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      5. Service Availability
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    Kavrol attempts to secure continuous uptime, predictive monitoring, and notification pipelines. However, we cannot guarantee constant uninterrupted service. Access is subject to occasional service interruptions, banking API latency, third-party system outages (such as Plaid failures), or unexpected emergency maintenance windows.
                  </p>
                </section>

                {/* Section 6 */}
                <section id="t-billing" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <Lock className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      6. Billing Authorization (ACH)
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    By using the service, you provide your electronic signature to authorize recurring ACH debit and credit transmittals between your connected checking ledger and Kavrol's licensed banking partners. This authorization remains in full force and effect until you terminate your account and satisfy all outstanding repayment balances.
                  </p>
                </section>

                {/* Section 7 */}
                <section id="t-disclaimers" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <FileText className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      7. Platform Disclaimers
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    KAVROL IS A FINANCIAL TECHNOLOGY PLATFORM, NOT A LICENSED BANK. ALL FINANCIAL TRANSACTIONS ARE ROUTED THROUGH LICENSED PARTNER BANKS AND CREDIT ENTITIES.
                  </p>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    THE PLATFORM AND SERVICES ARE EXTENDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT RECONSTRUCTED OR EXPLICIT WARRANTIES. WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANDISABILITY, FIT FOR A SPECIFIC PURPOSE, SECURITY UPTIME, AND PREDICTIVE ZERO-ERROR ACCURACIES.
                  </p>
                </section>

                {/* Section 8 */}
                <section id="t-liability" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <Shield className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      8. Limitation of Liability
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    TO THE MAXIMUM EXTENT PERMITTED UNDER LOCAL JURISDICTION LAW, KAVROL TECHNOLOGIES INC. AND ITS BANKING REPRESENTATIVES SHALL NOT BE HELD liable FOR ANY INDIRECT, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY LOSSES (INCLUDING, BUT NOT LIMITED TO, LOSS OF FUNDS, BANK OVERDRAFT CHARGES ASSESSED BY OUTSIDE FINANCIAL BODIES, FORFEITURE OF SERVICES, INTEREST ACCUMULATION, OR PERSONAL DAMAGE STATUSES) RESULTING FROM PLATFORM UTILIZATION OR API DELAYS.
                  </p>
                </section>

                {/* Section 9 */}
                <section id="t-termination" className="space-y-4 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
                  <div className="flex items-center gap-2 text-brand-green-400">
                    <X className="w-4 h-4" />
                    <h4 className={`text-base font-display font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      9. Account Termination
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    You may request account closure at any time through our settings menu or by contacting support.
                  </p>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    Account termination requests are pending until all outstanding gap protection repayment schedules are cleared. Kavrol reserves the right to suspend, terminate, or cancel your profile eligibility at any time, with or without notice, if we identify systematic balance manipulation, ACH failures, or security violations.
                  </p>
                </section>

              </div>
            )}
          </div>
        </div>

        {/* Footer actions block */}
        <div className={`px-6 py-4 border-t flex items-center justify-end gap-3 shrink-0 ${
          isDark ? 'border-zinc-900 bg-zinc-950/80' : 'border-zinc-200 bg-zinc-50/50'
        }`}>
          <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
            Press Esc to exit reader
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-brand-green-500 text-zinc-950 hover:bg-brand-green-400 font-display font-bold text-xs transition-all cursor-pointer active:scale-95"
          >
            I Understand
          </button>
        </div>

      </motion.div>
    </div>
  );
};
