import { useState, type FormEvent } from 'react';
import LiveISTClock from '../components/LiveISTClock';
import type { InquestFormData, TabType } from '../types';
import { Copy, Check, Send, Download, FileText, ArrowUpRight, Bolt, Layers, Eye, ShieldCheck, Award, Terminal, AlertCircle } from 'lucide-react';
import { submitContactInquest } from '../services/contactService';

interface ExperienceViewProps {
  onTabChange: (tab: TabType) => void;
  onOpenResume: () => void;
  onTriggerToast: (msg: string) => void;
}

export default function ExperienceView({ onTabChange, onOpenResume, onTriggerToast }: ExperienceViewProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState<InquestFormData>({
    name: '',
    email: '',
    inquiryType: 'Full-time Role',
    message: '',
    ndaRequired: false,
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleCopyEmail = () => {
    const email = 'hkbharti77@gmail.com';
    navigator.clipboard?.writeText(email);
    setCopiedEmail(true);
    onTriggerToast('Email address hkbharti77@gmail.com copied to clipboard');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    if (!formState.consent) {
      setSubmissionError('Statutory consent is mandatory under India DPDP Act 2023. Please check the agreement box before transmitting.');
      onTriggerToast('Please accept statutory DPDP consent to submit.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const result = await submitContactInquest(formState);

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      setSubmissionFeedback(result.message);
      onTriggerToast(`Inquest successfully transmitted from ${formState.name}. Response within 24 hours.`);
      setFormState({
        name: '',
        email: '',
        inquiryType: 'Full-time Role',
        message: '',
        ndaRequired: false,
        consent: false,
      });
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmissionFeedback(null);
      }, 10000);
    } else {
      setSubmissionError(result.message);
      onTriggerToast(result.message);
    }
  };

  return (
    <div className="flex flex-col w-full animate-fade-in">
      {/* Section: Editorial Header & Monogram Index */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin pt-space-md pb-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-md border-b border-surface-variant/40">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">
              <span className="inline-block w-2 h-2 bg-secondary-container animate-pulse" />
              <span>Dossier / Volume 04</span>
              <span className="text-outline-variant">·</span>
              <span className="text-primary font-semibold">Curated Chronology</span>
            </div>
            <h1 className="font-display-hero text-4xl sm:text-6xl lg:text-7xl text-on-surface tracking-tight leading-none font-serif">
              Systems, Mind <br className="hidden sm:inline" />
              <span className="italic font-headline-lg text-on-surface-variant font-serif">&amp; Machine.</span>
            </h1>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <span className="font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">
              Profile Spec Sheet
            </span>
            <LiveISTClock />
          </div>
        </div>
      </section>

      {/* Section 1: About & Architectural Philosophy */}
      <section className="w-full bg-surface-container-low py-space-xl border-y border-surface-variant/40">
        <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Asymmetric Still Life Render Frame (5 cols) */}
            <div className="lg:col-span-5 relative group">
              <div className="relative bg-surface-container-high overflow-hidden shadow-xl border border-surface-variant/40">
                <img
                  className="w-full aspect-[4/5] object-cover filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
                  alt="Sculptural frosted matte glass forms and unglazed ceramic stoneware cast under warm golden sunlight"
                  src="/assets/aistudio/Image_1_b8d088d3.png"
                  onError={(e) => {
                    // Fallback to high-fashion still life CDN URL if local asset relative path needs direct fallback
                    e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuAUC0WIOk5ZIVb0_yAY05GNx5B6n1BGGnq_z1mu9LPlBNfBuavVi9Le5o3S3ETF73bNAl4q9VGIIhcImBekKW9JOhpyLuBMr9qs8fjXqE28_AIxvyrNwbvP_xdX5BeY-n3N-7x0a1jf5At2h8VaeNMeE4sG7VW7cTpKMaaK9JQm1OguOIVkmNxtd9kIE5jcNUYSCaJJGMHnTWEFGKRJToFsygaz5-7aIKi7gW51X_PiMA9GDdWCvVy62w";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent opacity-60" />

                {/* Viewport HUD Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 bg-surface/90 backdrop-blur-sm text-on-surface font-label-mono uppercase tracking-widest shadow-xs">
                    Fig. 01 / Spatial Form
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-surface/90 backdrop-blur-sm font-label-mono text-on-surface shadow-xs">
                    <span className="w-1.5 h-1.5 bg-secondary-container rounded-full" />
                    <span>RENDER ENGINE v4.2</span>
                  </div>
                </div>

                {/* Bottom Plaque Inset */}
                <div className="absolute bottom-4 left-4 right-4 p-space-md bg-surface text-on-surface shadow-md border border-surface-variant/40">
                  <div className="flex items-center justify-between font-label-mono text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                    <span>Core Medium</span>
                    <span className="text-primary font-semibold">C++ / Python / TS</span>
                  </div>
                  <p className="font-headline-sm text-base sm:text-lg font-serif text-on-surface leading-snug">
                    Materiality meets autonomous compute.
                  </p>
                </div>
              </div>

              {/* Offset Architectural Accent Block */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-36 h-28 bg-primary-container p-space-sm text-on-primary-container shadow-lg -z-0">
                <span className="font-label-mono text-[10px] uppercase tracking-widest opacity-80 block">Discipline</span>
                <span className="font-title-editorial text-sm font-serif mt-1 block font-semibold">Full-Stack &amp; AI Infra</span>
              </div>
            </div>

            {/* Narrative & Professional Credo (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-space-lg lg:pl-space-md">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-mono text-xs uppercase tracking-widest text-secondary font-bold">
                  01 / Narrative Manifesto
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-4xl lg:text-5xl font-serif text-on-surface leading-tight">
                  Engineering at the intersection of rigorous backend architecture and frontier AI models.
                </h2>
              </div>

              <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">
                I focus on turning complex computational graphs into seamless, dependable products. Modern AI capabilities only become transformative when bound to resilient distributed systems, sub-second latency tolerances, and interfaces treated with the sculptural restraint of fine print.
              </p>

              {/* Professional Credo Triad Bento */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
                <div className="p-space-md bg-surface shadow-xs hover:shadow-md transition-shadow border border-surface-variant/40">
                  <div className="w-8 h-8 bg-surface-container-high flex items-center justify-center text-primary mb-space-sm">
                    <Bolt className="w-4 h-4" />
                  </div>
                  <h3 className="font-title-editorial text-sm font-serif font-bold text-on-surface mb-1">
                    Speed with Correctness
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Low-latency execution balanced by strictly verified transactional integrity and runtime guardrails.
                  </p>
                </div>

                <div className="p-space-md bg-surface shadow-xs hover:shadow-md transition-shadow border border-surface-variant/40">
                  <div className="w-8 h-8 bg-surface-container-high flex items-center justify-center text-tertiary mb-space-sm">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="font-title-editorial text-sm font-serif font-bold text-on-surface mb-1">
                    Clean Modular Seams
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Strict domain boundaries preventing leaky abstractions between AI orchestrators and persistent storage.
                  </p>
                </div>

                <div className="p-space-md bg-surface shadow-xs hover:shadow-md transition-shadow border border-surface-variant/40">
                  <div className="w-8 h-8 bg-surface-container-high flex items-center justify-center text-secondary-container mb-space-sm">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h3 className="font-title-editorial text-sm font-serif font-bold text-on-surface mb-1">
                    Human-Centric Utility
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    System architecture designed backwards from tactile real-world human intent and studio polish.
                  </p>
                </div>
              </div>

              {/* Inline Data Visualizer: Architectural Balance Sparkline */}
              <div className="p-space-md bg-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-md shadow-inner border border-surface-variant/40">
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                  <span className="font-label-mono text-xs uppercase tracking-widest text-on-surface font-semibold">
                    Compute Distribution Quotient
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    Inference Latency vs. System Determinism
                  </span>
                </div>
                <div className="w-full sm:w-64 h-10 flex items-end gap-1.5 px-2 py-1 bg-surface border border-surface-variant/30">
                  <div className="w-full bg-primary/20 hover:bg-primary h-[35%] transition-all" title="Ingress" />
                  <div className="w-full bg-primary/40 hover:bg-primary h-[55%] transition-all" title="Vector Search" />
                  <div className="w-full bg-primary/60 hover:bg-primary h-[85%] transition-all" title="Model Inference" />
                  <div className="w-full bg-secondary-container h-[95%] transition-all" title="Synthesis" />
                  <div className="w-full bg-tertiary h-[40%] transition-all" title="Cache Egress" />
                  <div className="w-full bg-primary/30 h-[25%] transition-all" title="Audit Log" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Professional Experience & Milestones Timeline */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-sm pb-space-sm border-b border-surface-variant/40">
          <div className="flex flex-col gap-space-xs max-w-xl">
            <span className="font-label-mono text-xs uppercase tracking-widest text-secondary font-bold">
              02 / Chronological Record
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-4xl font-serif text-on-surface">
              Professional Engagements &amp; Architectural Milestones
            </h2>
          </div>
          <p className="font-label-mono text-xs text-on-surface-variant uppercase tracking-widest max-w-xs text-left md:text-right">
            Continuous progression through systems scale, applied AI, and real-time execution.
          </p>
        </div>

        {/* Timeline Grid Layout */}
        {/* Timeline Grid Layout */}
        <div className="relative flex flex-col gap-space-lg">
          {/* Vertical Rule */}
          <div className="absolute left-4 md:left-8 top-4 bottom-4 w-0.5 bg-surface-container-highest" />

          {/* Item 1: Mobiloitte Technologies */}
          <div className="relative pl-12 md:pl-20 group">
            <div className="absolute left-2.5 md:left-6.5 top-2 w-3.5 h-3.5 bg-secondary-container shadow-[0_0_0_4px_#fbf9f3] group-hover:scale-125 transition-transform" />
            <div className="p-space-lg bg-surface-container-low hover:bg-surface-container transition-colors shadow-xs border border-surface-variant/40">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-xs mb-space-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-space-xs sm:gap-space-md">
                  <span className="font-headline-sm text-lg sm:text-xl font-serif font-bold text-on-surface">
                    Software Development Engineer (Full-Stack &amp; AI)
                  </span>
                  <span className="px-2.5 py-0.5 bg-surface-container-high text-on-surface-variant font-label-mono text-xs uppercase tracking-wider self-start sm:self-auto">
                    Mobiloitte Technologies · New Delhi, India
                  </span>
                </div>
                <span className="font-label-mono text-xs text-primary font-bold tracking-widest uppercase">
                  May 2025 — Present
                </span>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant max-w-4xl mb-space-md leading-relaxed">
                Deployed cross-platform conversational AI bots across 5 channels (WhatsApp, Telegram, Instagram, Slack, Web Chat) with FastAPI and Hybrid RAG. Engineered real-time AI Voice Calling &amp; IVR systems with Deepgram (STT) and ElevenLabs (TTS) over WebSockets with &lt; 600ms latency. Implemented Meta WhatsApp Cloud API and Meta Embedded Signup onboarding for 10+ client enterprises with tenant-isolated PostgreSQL, MongoDB, and Redis caching.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs mb-space-md">
                <div className="p-space-sm bg-surface border border-surface-variant/30">
                  <span className="font-label-mono text-[11px] text-on-surface-variant block uppercase tracking-wider">Voice Turnaround</span>
                  <span className="font-title-editorial text-base font-serif font-bold text-on-surface">&lt;600ms E2E Latency</span>
                </div>
                <div className="p-space-sm bg-surface border border-surface-variant/30">
                  <span className="font-label-mono text-[11px] text-on-surface-variant block uppercase tracking-wider">Scale Ingress</span>
                  <span className="font-title-editorial text-base font-serif font-bold text-on-surface">15k+ Daily Requests</span>
                </div>
                <div className="p-space-sm bg-surface border border-surface-variant/30">
                  <span className="font-label-mono text-[11px] text-on-surface-variant block uppercase tracking-wider">System Availability</span>
                  <span className="font-title-editorial text-base font-serif font-bold text-on-surface">99.5% Continuous Uptime</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-label-technical">
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">FastAPI</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">Hybrid RAG</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">Meta Cloud WhatsApp API</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">Deepgram &amp; ElevenLabs</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">Docker &amp; Redis</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">PostgreSQL</span>
              </div>
            </div>
          </div>

          {/* Item 2: QSpiders */}
          <div className="relative pl-12 md:pl-20 group">
            <div className="absolute left-2.5 md:left-6.5 top-2 w-3.5 h-3.5 bg-secondary-container shadow-[0_0_0_4px_#fbf9f3] group-hover:scale-125 transition-transform" />
            <div className="p-space-lg bg-surface-container-low hover:bg-surface-container transition-colors shadow-xs border border-surface-variant/40">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-xs mb-space-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-space-xs sm:gap-space-md">
                  <span className="font-headline-sm text-lg sm:text-xl font-serif font-bold text-on-surface">
                    Full Stack Developer Intern
                  </span>
                  <span className="px-2.5 py-0.5 bg-surface-container-high text-on-surface-variant font-label-mono text-xs uppercase tracking-wider self-start sm:self-auto">
                    QSpiders · Noida, India
                  </span>
                </div>
                <span className="font-label-mono text-xs text-on-surface-variant tracking-widest uppercase">
                  Aug 2024 — Apr 2025
                </span>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant max-w-4xl mb-space-md leading-relaxed">
                Developed 8+ backend RESTful APIs using Java and Spring Boot with layered MVC architecture. Designed and optimized normalized relational database schemas across 12+ tables in MySQL, improving query execution speed by 25% through strategic indexing. Built reusable UI components in React and authored 30+ JUnit test suites with 80%+ coverage.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs mb-space-md">
                <div className="p-space-sm bg-surface border border-surface-variant/30">
                  <span className="font-label-mono text-[11px] text-on-surface-variant block uppercase tracking-wider">API Throughput</span>
                  <span className="font-title-editorial text-base font-serif font-bold text-on-surface">20% Response Slash</span>
                </div>
                <div className="p-space-sm bg-surface border border-surface-variant/30">
                  <span className="font-label-mono text-[11px] text-on-surface-variant block uppercase tracking-wider">SQL Indexing Gain</span>
                  <span className="font-title-editorial text-base font-serif font-bold text-on-surface">25% Query Speedup</span>
                </div>
                <div className="p-space-sm bg-surface border border-surface-variant/30">
                  <span className="font-label-mono text-[11px] text-on-surface-variant block uppercase tracking-wider">Test Integrity</span>
                  <span className="font-title-editorial text-base font-serif font-bold text-on-surface">80%+ JUnit Coverage</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-label-technical">
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">Java</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">Spring Boot</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">MySQL</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">React &amp; Vite</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">JUnit &amp; Postman</span>
              </div>
            </div>
          </div>

          {/* Item 3: Bihar Engineering University */}
          <div className="relative pl-12 md:pl-20 group">
            <div className="absolute left-2.5 md:left-6.5 top-2 w-3.5 h-3.5 bg-secondary-container shadow-[0_0_0_4px_#fbf9f3] group-hover:scale-125 transition-transform" />
            <div className="p-space-lg bg-surface-container-low hover:bg-surface-container transition-colors shadow-xs border border-surface-variant/40">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-xs mb-space-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-space-xs sm:gap-space-md">
                  <span className="font-headline-sm text-lg sm:text-xl font-serif font-bold text-on-surface">
                    B.Tech in Electronics &amp; Communication Engineering
                  </span>
                  <span className="px-2.5 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-xs uppercase tracking-wider self-start sm:self-auto">
                    Bihar Engineering University
                  </span>
                </div>
                <span className="font-label-mono text-xs text-tertiary font-bold tracking-widest uppercase">
                  2020 — 2024 (CGPA: 7.8 / 10)
                </span>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant max-w-4xl mb-space-md leading-relaxed">
                Rigorous four-year engineering curriculum focused on microprocessors, computer networks, digital communications, signal processing, and high-concurrency software architectures. Completed specialized training in Salesforce Apex &amp; Automation and Cisco cybersecurity frameworks.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-label-technical">
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">Digital Communications</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">Microprocessors</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">Computer Networks</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">C++ / Python</span>
                <span className="px-2.5 py-1 bg-surface text-on-surface uppercase tracking-wider border border-surface-variant/30">SQL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Credentials, Certifications & Recognition */}
      <section className="w-full bg-surface-container-low py-space-xl border-y border-surface-variant/40">
        <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm pb-space-sm border-b border-surface-variant/40">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-mono text-xs uppercase tracking-widest text-secondary font-bold">
                03 / Verified Registry
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-4xl font-serif text-on-surface">
                Credentials, Industry Seals &amp; Professional Certifications
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-label-mono text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Verified Industry Accreditations</span>
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Card 1 */}
            <div className="p-space-lg bg-surface shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full border border-surface-variant/40">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <span className="font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest">
                    SALESFORCE
                  </span>
                </div>
                <h3 className="font-title-editorial text-base font-serif font-bold text-on-surface mb-space-xs">
                  Trailhead Superbadges
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Apex Specialist &amp; Process Automation Specialist. Advanced backend business logic, triggers, and automated orchestration.
                </p>
              </div>
              <div className="pt-space-md mt-space-md flex items-center justify-between font-label-mono text-xs text-on-surface-variant uppercase border-t border-surface-variant/30">
                <span>Salesforce</span>
                <span className="text-tertiary font-bold">Verified 2024</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-space-lg bg-surface shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full border border-surface-variant/40">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <Award className="w-6 h-6 text-secondary" />
                  <span className="font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest">
                    CISCO CYBER
                  </span>
                </div>
                <h3 className="font-title-editorial text-base font-serif font-bold text-on-surface mb-space-xs">
                  CyberOps Associate
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Security operations, host and network-level telemetry monitoring, cryptography, threat triage, and incident response.
                </p>
              </div>
              <div className="pt-space-md mt-space-md flex items-center justify-between font-label-mono text-xs text-on-surface-variant uppercase border-t border-surface-variant/30">
                <span>Cisco Networking Academy</span>
                <span className="text-tertiary font-bold">Verified 2024</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-space-lg bg-surface shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full border border-surface-variant/40">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <Award className="w-6 h-6 text-tertiary" />
                  <span className="font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest">
                    CISCO CCNAv7
                  </span>
                </div>
                <h3 className="font-title-editorial text-base font-serif font-bold text-on-surface mb-space-xs">
                  Introduction to Networks
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  IPv4/IPv6 subnetting, transport layer protocols, Ethernet switching, routing fundamentals, and packet inspection.
                </p>
              </div>
              <div className="pt-space-md mt-space-md flex items-center justify-between font-label-mono text-xs text-on-surface-variant uppercase border-t border-surface-variant/30">
                <span>Cisco Networking Academy</span>
                <span className="text-secondary font-bold">Verified 2023</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-space-lg bg-surface shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full border border-surface-variant/40">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <Terminal className="w-6 h-6 text-primary-container" />
                  <span className="font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest">
                    META ECOSYSTEM
                  </span>
                </div>
                <h3 className="font-title-editorial text-base font-serif font-bold text-on-surface mb-space-xs">
                  Meta Tech Provider Specialist
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  WhatsApp Cloud API, Meta Embedded Signup, Instagram Graph API automation, HSM template synchronization, and rate limiting.
                </p>
              </div>
              <div className="pt-space-md mt-space-md flex items-center justify-between font-label-mono text-xs text-on-surface-variant uppercase border-t border-surface-variant/30">
                <span>Meta Partner Ecosystem</span>
                <span className="text-primary font-bold">Specialist 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Contact & Collaboration Invitation */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-7xl mx-auto" id="contact-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Invitation Manifesto, Copy Action & Chronometry (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-mono text-xs uppercase tracking-widest text-secondary font-bold">
                04 / Engage Studio
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-4xl font-serif text-on-surface leading-tight">
                Let's build something remarkable.
              </h2>
              <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-space-xs">
                Open for high-impact software engineering roles, enterprise AI systems, and Meta Ecosystem solutions.
              </p>
            </div>

            {/* Quick Copy Email Card */}
            <div className="p-space-md bg-surface-container shadow-xs flex flex-col gap-space-xs border border-surface-variant/40">
              <span className="font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">Direct Mail Dispatch</span>
              <div className="flex items-center justify-between bg-surface p-space-sm border border-surface-variant/30">
                <code className="font-label-mono text-xs sm:text-sm text-on-surface font-semibold select-all">
                  hkbharti77@gmail.com
                </code>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high text-on-surface hover:bg-inverse-surface hover:text-inverse-on-surface transition-all font-label-technical text-xs uppercase tracking-wider cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-tertiary" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Studio Chronometry */}
            <LiveISTClock showDetails={true} />

            {/* Downloadable Résumé Broadside Card */}
            <div className="p-space-md bg-surface shadow-md flex items-center justify-between border border-surface-variant/40">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-editorial text-sm font-serif font-semibold text-on-surface">Curriculum Vitae</span>
                  <span className="font-label-mono text-xs text-on-surface-variant">PDF Spec · Verified 2025 Edition</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenResume}
                className="px-space-md py-space-xs bg-primary text-on-primary font-label-technical text-xs uppercase tracking-wider hover:bg-primary-container transition-all cursor-pointer font-semibold shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>

            {/* Direct Social Networks */}
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <span className="font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">Direct Indices</span>
              <div className="flex flex-wrap gap-space-md font-label-technical text-xs">
                <a
                  className="text-on-surface hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-1"
                  href="https://www.linkedin.com/in/himanshu-bharti-81a5a618a"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  className="text-on-surface hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-1"
                  href="https://github.com/hkbharti77"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  className="text-on-surface hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-1"
                  href="mailto:hkbharti77@gmail.com"
                >
                  <span>Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Light-Themed Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-low p-space-lg lg:p-space-xl shadow-lg border border-surface-variant/40">
            <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-surface-variant/40">
              <div className="flex flex-col">
                <span className="font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">
                  Transmission Protocol
                </span>
                <span className="font-title-editorial text-lg sm:text-xl font-serif font-semibold text-on-surface">
                  Initiate Collaboration Inquest
                </span>
              </div>
              <span className="font-label-mono text-xs text-secondary-container font-bold uppercase tracking-wider">
                [ Form REF // 25-C ]
              </span>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-space-md">
              {/* Form Inputs: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase tracking-widest text-on-surface font-semibold" htmlFor="name">
                    Full Name / Entity *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-space-md py-3 bg-surface text-on-surface placeholder:text-outline placeholder:italic text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs border border-surface-variant/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase tracking-widest text-on-surface font-semibold" htmlFor="email">
                    Electronic Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="elena@atelier.studio"
                    className="w-full px-space-md py-3 bg-surface text-on-surface placeholder:text-outline placeholder:italic text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs border border-surface-variant/40"
                  />
                </div>
              </div>

              {/* Inquiry Type Radio Selector */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-mono text-xs uppercase tracking-widest text-on-surface font-semibold">
                  Engagement Architecture Classification *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(['Full-time Role', 'AI System Build', 'Advisory & Consultation'] as const).map((type) => {
                    const isChecked = formState.inquiryType === type;
                    return (
                      <label
                        key={type}
                        className={`relative flex items-center p-3 bg-surface cursor-pointer hover:bg-surface-container transition-colors shadow-xs border ${
                          isChecked ? 'border-secondary-container' : 'border-surface-variant/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="inquiry_type"
                          value={type}
                          checked={isChecked}
                          onChange={() => setFormState({ ...formState, inquiryType: type })}
                          className="sr-only"
                        />
                        <div
                          className={`w-3.5 h-3.5 mr-2 rounded-none ${
                            isChecked ? 'bg-secondary-container' : 'bg-surface-container-high'
                          } transition-all`}
                        />
                        <div className="flex flex-col">
                          <span className="font-label-technical text-xs text-on-surface font-semibold uppercase">
                            {type === 'Full-time Role' ? 'Full-Time' : type === 'AI System Build' ? 'AI System Build' : 'Advisory'}
                          </span>
                          <span className="font-label-mono text-[10px] text-on-surface-variant">
                            {type === 'Full-time Role'
                              ? 'Core Engineering Role'
                              : type === 'AI System Build'
                              ? 'Autonomous & Multimodal'
                              : 'Architecture Audit'}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Message Payload */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="font-label-mono text-xs uppercase tracking-widest text-on-surface font-semibold" htmlFor="message">
                    Brief Scope &amp; Target Horizon *
                  </label>
                  <span className="font-label-mono text-xs text-on-surface-variant">Markdown Supported</span>
                </div>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Outline project parameters, current tech stack bottlenecks, timeline projections, or team scope..."
                  className="w-full px-space-md py-3 bg-surface text-on-surface placeholder:text-outline placeholder:italic text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs border border-surface-variant/40 resize-y"
                />
              </div>

              {/* Statutory Legal & Protocol Declarations */}
              <div className="flex flex-col gap-3 pt-2">
                {/* Mandatory DPDP Act 2023 Consent Checkbox */}
                <label
                  htmlFor="privacy_consent"
                  className="flex items-start gap-3 cursor-pointer group select-none text-xs text-on-surface-variant leading-relaxed"
                >
                  <input
                    id="privacy_consent"
                    type="checkbox"
                    required
                    checked={formState.consent}
                    onChange={(e) => {
                      setFormState({ ...formState, consent: e.target.checked });
                      if (e.target.checked) setSubmissionError(null);
                    }}
                    className="mt-0.5 h-4 w-4 rounded-none text-primary focus:ring-0 cursor-pointer bg-surface border border-surface-variant/80 shrink-0"
                  />
                  <span className="flex-1">
                    I consent to the processing of my contact details in accordance with the{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTabChange('privacy');
                      }}
                      className="text-on-surface hover:text-primary underline font-medium cursor-pointer"
                    >
                      Privacy Policy
                    </button>{' '}
                    and India DPDP Act 2023. <span className="text-secondary font-bold">*</span>
                  </span>
                </label>

                {/* Optional Mutual NDA Checkbox */}
                <label
                  htmlFor="nda_ready"
                  className="flex items-start gap-3 cursor-pointer group select-none text-xs text-on-surface-variant leading-relaxed"
                >
                  <input
                    id="nda_ready"
                    type="checkbox"
                    checked={formState.ndaRequired}
                    onChange={(e) => setFormState({ ...formState, ndaRequired: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded-none text-primary focus:ring-0 cursor-pointer bg-surface border border-surface-variant/80 shrink-0"
                  />
                  <span className="flex-1">
                    Mutual Non-Disclosure Agreement (NDA) required prior to code examination or architecture handover.{' '}
                    <span className="text-on-surface-variant/60 font-mono text-[10px] uppercase tracking-wider">(Optional)</span>
                  </span>
                </label>
              </div>

              {/* Action Submission */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-md">
                <div className="flex items-center gap-2 text-on-surface-variant font-label-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                  <span>DPDP 2023 · Encrypted Dispatch to Backend</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary transition-all font-label-technical text-xs font-bold uppercase tracking-widest shadow-md flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Transmitting Inquest...' : 'Transmit Inquest'}</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Dynamic Success Notification */}
              {isSubmitted && submissionFeedback && (
                <div className="p-space-md bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-xs flex items-center gap-2.5 border border-tertiary/20 animate-fade-in shadow-xs">
                  <Check className="w-4 h-4 text-tertiary shrink-0" />
                  <span className="leading-snug">{submissionFeedback}</span>
                </div>
              )}

              {/* Error Notification */}
              {submissionError && (
                <div className="p-space-md bg-error-container text-on-error-container font-label-mono text-xs flex items-center gap-2.5 border border-error/20 animate-fade-in shadow-xs">
                  <AlertCircle className="w-4 h-4 text-error shrink-0" />
                  <span className="leading-snug">{submissionError}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
