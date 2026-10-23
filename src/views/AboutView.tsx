import type { TabType } from '../types';
import { Terminal, Cpu, Layers, Sparkles, ArrowRight, ShieldCheck, Download } from 'lucide-react';

interface AboutViewProps {
  onTabChange: (tab: TabType) => void;
  onOpenResume: () => void;
}

export default function AboutView({ onTabChange, onOpenResume }: AboutViewProps) {
  return (
    <div className="flex flex-col w-full animate-fade-in">
      {/* Editorial Header */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin pt-space-lg pb-space-xl">
        <div className="flex flex-col gap-space-md border-b border-surface-variant/40 pb-space-lg">
          <div className="flex items-center gap-space-xs font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Studio Identity · Technical Monograph</span>
            <span className="text-outline-variant">/</span>
            <span className="text-secondary font-bold">About the Engineer</span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-6xl lg:text-7xl text-on-surface tracking-tight leading-none font-serif">
            A craftsman's posture <br className="hidden sm:inline" />
            <span className="italic font-serif text-on-surface-variant">towards systems &amp; silicon.</span>
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed mt-2">
            Balancing the rigor of distributed backend computing with modern cognitive AI architectures. I build systems that treat latency as an integrity metric and interfaces with the tactile discipline of fine art.
          </p>
        </div>
      </section>

      {/* Narrative Monograph Section */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin pb-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Main Story Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Background &amp; Evolution
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                From low-level operating principles to multimodal agent swarms.
              </h2>
            </div>

            <div className="space-y-4 text-on-surface-variant text-sm sm:text-base leading-relaxed">
              <p>
                My foundation began in core computer science—studying distributed consensus, database storage engines, and operating systems concurrency. That discipline shaped how I perceive the modern AI wave: machine intelligence is only as reliable as the deterministic harness wrapped around it.
              </p>
              <p>
                Over the past several years, I have architected high-concurrency systems handling tens of millions of monthly events. When applied AI shifted from static one-shot prompts to real-time multimodal voice streaming and multi-step autonomous agent graphs, I focused on solving the hard physics of latency, jitter, and transactional verity.
              </p>
              <p>
                In production, stochastic language models cannot be granted direct, unchecked database access. By coupling LangGraph and Pydantic schema validation with Redis distributed locks, WebRTC low-latency streaming gateways, and pgvector HNSW indexing, my systems maintain sub-second responsiveness alongside zero-hallucination guarantees.
              </p>
            </div>

            {/* Core Values Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
              <div className="p-space-md bg-surface-container-low border border-surface-variant/40 shadow-xs">
                <Cpu className="w-5 h-5 text-primary mb-2" />
                <h4 className="font-title-editorial font-serif font-bold text-base text-on-surface mb-1">
                  Latency Economics
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Every millisecond of roundtrip time directly degrades human perceived naturalness. We engineer pipeline steps concurrently to shave roundtrips under 450ms.
                </p>
              </div>

              <div className="p-space-md bg-surface-container-low border border-surface-variant/40 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-tertiary mb-2" />
                <h4 className="font-title-editorial font-serif font-bold text-base text-on-surface mb-1">
                  Zero-Trust Output Guards
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Neural outputs pass through strict JSON schema parsing and cross-encoder validation before any state machine mutation or client dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Right Spec & Tooling Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Architectural Profile Card */}
            <div className="p-space-lg bg-surface-container border border-surface-variant/50 shadow-xs flex flex-col gap-space-md">
              <div className="flex items-center justify-between border-b border-surface-variant/40 pb-space-sm">
                <span className="font-label-mono text-xs uppercase tracking-widest text-on-surface font-semibold">
                  Architectural Dossier
                </span>
                <span className="font-label-mono text-xs text-primary font-bold">2025 EDITION</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-surface-variant/30">
                  <span className="font-label-mono text-on-surface-variant">NAME</span>
                  <span className="font-semibold text-on-surface">Himanshu Bharti</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-variant/30">
                  <span className="font-label-mono text-on-surface-variant">PRIMARY ROLES</span>
                  <span className="font-semibold text-on-surface">Senior AI &amp; Backend Engineer</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-variant/30">
                  <span className="font-label-mono text-on-surface-variant">CORE BASE</span>
                  <span className="font-semibold text-on-surface">New Delhi, India (IST UTC+5:30)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-variant/30">
                  <span className="font-label-mono text-on-surface-variant">DISPOSITIONS</span>
                  <span className="font-semibold text-tertiary">Select High-Impact Roles &amp; Audits</span>
                </div>
              </div>

              {/* Primary Stack Badges */}
              <div className="pt-space-xs">
                <span className="font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider block mb-2">
                  Frequently Deployed Technologies
                </span>
                <div className="flex flex-wrap gap-1.5 font-label-technical text-xs">
                  {['FastAPI', 'Python 3.12', 'Go', 'TypeScript', 'Redis Streams', 'BullMQ', 'pgvector', 'Docker', 'Kubernetes', 'WebRTC', 'LangGraph', 'Three.js', 'Tailwind CSS'].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-surface text-on-surface border border-surface-variant/40 shadow-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-space-sm border-t border-surface-variant/40 flex flex-col gap-2">
                <button
                  onClick={onOpenResume}
                  className="w-full py-2.5 px-4 bg-primary text-on-primary font-label-technical text-xs uppercase tracking-wider font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Inspect Full Curriculum Vitae</span>
                </button>
                <button
                  onClick={() => onTabChange('contact')}
                  className="w-full py-2.5 px-4 bg-surface text-on-surface font-label-technical text-xs uppercase tracking-wider hover:bg-surface-variant transition-all flex items-center justify-center gap-2 cursor-pointer border border-surface-variant/40"
                >
                  <span>Transmit Collaboration Dispatch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
