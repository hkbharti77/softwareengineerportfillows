import { useState } from 'react';
import HeroThreeCanvas from '../components/HeroThreeCanvas';
import type { ProjectCategory, TabType } from '../types';
import { ArrowDown, Download, ArrowRight, Calendar, Mic, Sparkles, Layers, Search, Terminal, FileCheck, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WorkViewProps {
  onTabChange: (tab: TabType) => void;
  onOpenResume: () => void;
  onTriggerToast: (msg: string) => void;
}

export default function WorkView({ onTabChange, onOpenResume, onTriggerToast }: WorkViewProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const scrollToWork = () => {
    const el = document.getElementById('selected-work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full animate-fade-in">
      {/* Top Curatorial Ticker & Context Bar */}
      <section className="focus-hide w-full px-margin-mobile lg:px-margin pt-space-lg pb-space-sm border-b-0 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">
          <div className="flex items-center gap-space-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse" />
            <span className="text-on-surface font-semibold">Active Dispatch — Portfolio Volume 04</span>
            <span className="hidden sm:inline text-outline-variant">/</span>
            <span className="hidden sm:inline">Systems Architect &amp; Applied AI</span>
          </div>
          <div className="flex items-center gap-space-md">
            <span>Location: New Delhi / Remote</span>
            <span className="text-outline-variant">·</span>
            <span className="text-tertiary font-bold">Available Q2/Q3 2025</span>
          </div>
        </div>
      </section>

      {/* Hero Section: High-Fashion Architectural Spread */}
      <section className="focus-hide w-full px-margin-mobile lg:px-margin pt-space-md pb-space-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Left Column: Typographic Broadsheet (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-space-md">
            {/* Professional Badges */}
            <div className="flex flex-wrap items-center gap-space-xs mb-space-md">
              <span className="inline-flex items-center px-3 py-1 bg-surface-container text-on-surface font-label-mono text-xs uppercase tracking-wider shadow-xs">
                [ Software Developer ]
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-xs uppercase tracking-wider shadow-xs">
                [ AI Engineer ]
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-surface-container-high text-on-surface-variant font-label-mono text-xs uppercase tracking-wider shadow-xs">
                [ Systems Builder ]
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-7xl text-on-surface tracking-tight mb-space-md leading-none font-serif">
              Building intelligent <br className="hidden sm:inline" />
              <span className="italic text-primary-container font-headline-lg font-serif">things</span> for the real world.
            </h1>

            {/* Supporting Copy */}
            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl mb-space-lg leading-relaxed">
              I’m Himanshu Bharti, a software developer working across AI systems, backend engineering, and intelligent automation. I design and build production-grade cognitive workflows, high-throughput pipelines, and tactile human-AI interfaces.
            </p>

            {/* Calls To Action & Meta */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <button
                onClick={scrollToWork}
                className="inline-flex items-center gap-space-xs px-6 py-3.5 bg-secondary-container text-on-secondary-container font-label-technical text-xs uppercase tracking-widest font-semibold shadow-md hover:bg-secondary hover:text-on-secondary transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-space-xs px-6 py-3.5 bg-inverse-surface text-inverse-on-surface font-label-technical text-xs uppercase tracking-widest font-semibold hover:bg-on-surface transition-all shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Résumé</span>
              </button>
              <div className="hidden xl:flex items-center gap-2 pl-space-md font-label-mono text-xs text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                <span>Latency-First · Scalable Backends · Distributed RAG</span>
              </div>
            </div>

            {/* Quick Spec Matrix */}
            <div className="grid grid-cols-3 gap-space-sm mt-space-xl pt-space-md bg-surface-container-low p-space-md shadow-xs border border-surface-variant/40">
              <div className="flex flex-col">
                <span className="font-label-mono text-xs text-on-surface-variant uppercase">Core Paradigm</span>
                <span className="font-title-editorial text-sm sm:text-base text-on-surface mt-1 font-semibold">
                  Autonomous Systems
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-mono text-xs text-on-surface-variant uppercase">Primary Stack</span>
                <span className="font-title-editorial text-sm sm:text-base text-on-surface mt-1 font-semibold">
                  Python · Go · TS · WebGL
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-mono text-xs text-on-surface-variant uppercase">Discipline</span>
                <span className="font-title-editorial text-sm sm:text-base text-on-surface mt-1 font-semibold">
                  Agentic Engineering
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Canvas & Lighting Studio (5 cols) */}
          <div className="lg:col-span-5 relative mt-space-lg lg:mt-0">
            <div className="relative w-full">
              {/* Offset Architectural Decorative Frame */}
              <div className="absolute -top-3 -right-3 w-full h-full bg-primary-container/10 -z-0 pointer-events-none" />
              <HeroThreeCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Statement / Manifesto Strip */}
      <section className="focus-hide w-full bg-surface-container-high py-space-lg my-space-md border-y border-surface-variant/30">
        <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-baseline">
            <div className="md:col-span-3">
              <span className="font-label-mono text-xs text-secondary uppercase tracking-widest font-bold">
                01 / PHILOSOPHY &amp; EXECUTION
              </span>
            </div>
            <div className="md:col-span-9">
              <p className="font-headline-sm text-lg sm:text-2xl text-on-surface font-serif font-normal leading-relaxed">
                “Software achieves true elegance when algorithmic rigor, ultra-low latency infrastructure, and bespoke editorial aesthetics dissolve into an effortless human extension.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Statistics / Stat Strip */}
      <section className="focus-hide w-full px-margin-mobile lg:px-margin py-space-md max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="bg-surface-container-low p-space-md flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow border border-surface-variant/40">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-mono text-xs text-on-surface-variant uppercase">SLA Reliability</span>
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-headline-lg text-4xl text-on-surface tracking-tight font-serif">99.9%</div>
              <p className="font-label-technical text-xs text-on-surface-variant uppercase mt-1">Uptime Production Architectures</p>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-md flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow border border-surface-variant/40">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-mono text-xs text-on-surface-variant uppercase">Speech Turnaround</span>
              <Mic className="w-5 h-5 text-secondary-container" />
            </div>
            <div>
              <div className="font-headline-lg text-4xl text-on-surface tracking-tight font-serif">
                &lt;480<span className="text-xl text-secondary">ms</span>
              </div>
              <p className="font-label-technical text-xs text-on-surface-variant uppercase mt-1">Full-Duplex Voice AI Pipelines</p>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-md flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow border border-surface-variant/40">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-mono text-xs text-on-surface-variant uppercase">Daily Autonomous Ops</span>
              <Activity className="w-5 h-5 text-tertiary" />
            </div>
            <div>
              <div className="font-headline-lg text-4xl text-on-surface tracking-tight font-serif">10k+</div>
              <p className="font-label-technical text-xs text-on-surface-variant uppercase mt-1">Conversational Workflows Executed</p>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-md flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow border border-surface-variant/40">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-mono text-xs text-on-surface-variant uppercase">Retrieval Precision</span>
              <Search className="w-5 h-5 text-primary-container" />
            </div>
            <div>
              <div className="font-headline-lg text-4xl text-on-surface tracking-tight font-serif">94.8%</div>
              <p className="font-label-technical text-xs text-on-surface-variant uppercase mt-1">RAG Context Re-Rank Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Filter Header */}
      <section className="w-full px-margin-mobile lg:px-margin pt-space-xl pb-space-md max-w-7xl mx-auto" id="selected-work">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-sm border-b border-surface-variant/40">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label-mono text-xs text-secondary-container uppercase tracking-widest font-bold">Catalogue / Selected Artifacts</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
            </div>
            <h2 className="font-headline-lg text-3xl sm:text-5xl text-on-surface tracking-tight font-serif">
              Selected Works &amp; Systems
            </h2>
          </div>

          {/* Segmented Interactive Filter Strip */}
          <div className="inline-flex bg-surface-container p-1 shadow-xs border border-surface-variant/40">
            {(
              [
                { id: 'all', label: 'All (03)' },
                { id: 'generative-ai', label: 'Generative AI' },
                { id: 'distributed-systems', label: 'Distributed Systems' },
                { id: 'full-stack', label: 'Full-Stack Apps' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`px-3 sm:px-4 py-2 font-label-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === btn.id
                    ? 'bg-on-surface text-surface-container-lowest shadow-xs font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work: Asymmetrical Magazine Layout */}
      <section className="w-full px-margin-mobile lg:px-margin flex flex-col gap-space-xl pb-space-xl max-w-7xl mx-auto">
        {/* PROJECT 01: OmniChannel AI CRM */}
        {(activeFilter === 'all' || activeFilter === 'generative-ai' || activeFilter === 'distributed-systems') && (
          <article className="bg-surface-container p-space-md lg:p-space-lg shadow-sm hover:shadow-md transition-all border border-surface-variant/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              {/* Project Narrative & Architecture (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-space-xs font-label-mono text-xs uppercase tracking-widest text-on-surface-variant mb-space-xs">
                    <span className="text-secondary font-bold">PROJECT 01</span>
                    <span>·</span>
                    <span className="px-2 py-0.5 bg-surface-container-high text-on-surface">AI Systems &amp; Automation</span>
                  </div>

                  <h3 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface mb-space-sm leading-tight">
                    OmniChannel AI CRM &amp; Autonomous Sales Pipeline
                  </h3>

                  <p className="font-body-md text-sm text-on-surface-variant mb-space-md leading-relaxed">
                    An enterprise-tier conversational intelligence engine capable of orchestrating full-cycle lead acquisition, dynamic tool calling, and qualification directly over WhatsApp Cloud API and web channels without human latency.
                  </p>

                  <div className="bg-surface-container-lowest p-space-md shadow-xs mb-space-md border border-surface-variant/40">
                    <span className="font-label-mono text-xs text-primary font-bold uppercase tracking-wider block mb-space-xs">
                      Systems Architecture &amp; Pipeline
                    </span>
                    <ul className="flex flex-col gap-1.5 font-label-technical text-xs text-on-surface">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary-container" />
                        <span>Backend: FastAPI with Async Redis Event Bus &amp; PostgreSQL</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary" />
                        <span>Orchestration: LangChain agentic state-graphs &amp; dynamic function routers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-tertiary" />
                        <span>Edge Connectors: WhatsApp Cloud Webhooks with retry idempotency</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Metrics Strip */}
                <div className="grid grid-cols-2 gap-space-sm pt-space-sm bg-surface-container-high p-space-sm border border-surface-variant/30">
                  <div>
                    <span className="font-label-mono text-xs text-on-surface-variant uppercase">Response Latency</span>
                    <div className="font-headline-sm text-2xl font-serif text-secondary font-semibold mt-0.5">-72%</div>
                    <span className="font-body-sm text-xs text-on-surface-variant">Instant customer engagement</span>
                  </div>
                  <div>
                    <span className="font-label-mono text-xs text-on-surface-variant uppercase">Automated Throughput</span>
                    <div className="font-headline-sm text-2xl font-serif text-primary font-semibold mt-0.5">10,000+</div>
                    <span className="font-body-sm text-xs text-on-surface-variant">Daily conversational steps</span>
                  </div>
                </div>
              </div>

              {/* Project Visual Artifact (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-space-sm">
                <div className="bg-surface-container-lowest shadow-md border border-surface-variant/50 overflow-hidden flex flex-col">
                  {/* Mockup Header */}
                  <div className="bg-surface-container-high px-4 py-3 flex items-center justify-between border-b border-surface-variant/40">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-secondary-container" />
                      <span className="w-3 h-3 rounded-full bg-primary-container" />
                      <span className="w-3 h-3 rounded-full bg-tertiary" />
                      <span className="ml-2 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">
                        app.crm-agents.internal/inspect/session-9081
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-[11px] uppercase font-semibold">
                      Agent State: ACTIVE_ROUTING
                    </span>
                  </div>

                  {/* Visual Content */}
                  <div className="p-space-md bg-surface-bright flex flex-col gap-space-md">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
                      {/* Conversation Stream */}
                      <div className="md:col-span-7 flex flex-col gap-space-xs text-xs">
                        <div className="p-3 bg-surface-container text-on-surface max-w-[85%] self-start shadow-xs border border-surface-variant/40">
                          <span className="font-label-mono text-[10px] text-outline block mb-1">CLIENT // WHATSAPP +91 98110-XXXXX</span>
                          “We need enterprise SSO integration and volume pricing for 450 seats. Can you send the pricing tier proposal?”
                        </div>
                        <div className="p-3 bg-primary text-on-primary max-w-[90%] self-end shadow-xs">
                          <span className="font-label-mono text-[10px] text-inverse-primary block mb-1">AI AGENT // FASTAPI_WORKER_04</span>
                          “Certainly. Generating an enterprise quote for 450 Okta-compatible seats under our Tier-3 agreement. Sending quote PDF via WhatsApp secure link now.”
                        </div>

                        {/* Tool Call Box */}
                        <div className="p-2.5 bg-surface-container-high font-label-mono text-xs text-on-surface-variant flex flex-col gap-1 border border-surface-variant/40">
                          <div className="flex items-center gap-2 text-tertiary font-bold">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>TOOL_CALL: generate_enterprise_quote()</span>
                          </div>
                          <div className="text-[11px] text-on-surface">
                            status: 200 OK | doc_id: "DOC-2025-450-OKTA" | latency: 312ms
                          </div>
                        </div>
                      </div>

                      {/* Sparkline chart */}
                      <div className="md:col-span-5 flex flex-col gap-space-xs bg-surface-container p-3 border border-surface-variant/40">
                        <span className="font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">
                          Pipeline Execution Velocity
                        </span>
                        <div className="h-24 w-full flex items-end pt-2">
                          <svg className="w-full h-full text-secondary-container" viewBox="0 0 200 80">
                            <polyline fill="none" points="0,65 30,58 60,62 90,40 120,44 150,22 180,18 200,8" stroke="currentColor" strokeLinecap="square" strokeWidth="3" />
                            <circle cx="90" cy="40" fill="#a04100" r="3" />
                            <circle cx="150" cy="22" fill="#a04100" r="3" />
                            <circle cx="200" cy="8" fill="#244dbb" r="4" />
                          </svg>
                        </div>
                        <div className="flex justify-between font-label-mono text-[11px] text-on-surface-variant pt-2 border-t border-surface-variant/40">
                          <span>T-0ms: Intake</span>
                          <span className="text-primary font-bold">T-340ms: Delivered</span>
                        </div>
                        <div className="mt-2 p-2 bg-surface-container-lowest text-on-surface font-label-technical text-xs border border-surface-variant/30">
                          Conversion Rate: <span className="font-bold text-secondary">+28.4%</span> over manual sales triage
                        </div>
                      </div>
                    </div>

                    {/* Architectural Image */}
                    <div className="w-full h-44 overflow-hidden relative shadow-xs border border-surface-variant/30">
                      <img
                        className="w-full h-full object-cover"
                        alt="Distributed Cloud Queue Cluster"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC19yA4VIcVFFG3KgOxa8JASFb6PiujMDIBobAdroOPXgSLbKivgveOh8xmHPCbpWXtwYuExHpk0i5rCTBEjp_RBi-X8xDAGIlYKBduG9uVzIrRnOoyzA5CwcVbSHA1_L4LF9Civ0L2j6KOTE_YQGAD-5PuQ7FgB6f7_QzZdLsdbVpY8XdQ38vmi9ax-0WtSgOZaeMPsZGAwLUwFeFi5mxpmEIesZP9hkwivpSESyeXCRF2XuyB9pL7Pw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-4">
                        <span className="font-label-mono text-xs text-inverse-on-surface tracking-widest uppercase">
                          Fig. 1.0 — Distributed Cloud Queue Cluster &amp; WhatsApp Cloud Webhook Ingestion Mesh
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* PROJECT 02: VoiceStream */}
        {(activeFilter === 'all' || activeFilter === 'generative-ai' || activeFilter === 'distributed-systems') && (
          <article className="bg-surface-container p-space-md lg:p-space-lg shadow-sm hover:shadow-md transition-all border border-surface-variant/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              {/* Visual Artifact (7 cols) */}
              <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col gap-space-sm">
                <div className="bg-surface-container-lowest shadow-md border border-surface-variant/50 overflow-hidden flex flex-col">
                  {/* Spectrogram Toolbar */}
                  <div className="bg-inverse-surface text-inverse-on-surface px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-secondary-container" />
                      <span className="font-label-mono text-xs uppercase tracking-widest">
                        VOICESTREAM // SPECTRAL LATENCY ENGINE
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-label-mono text-xs text-secondary-container">
                      <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                      <span>STREAM: 48kHz PCM OPUS</span>
                    </div>
                  </div>

                  <div className="p-space-md bg-surface-bright flex flex-col gap-space-md">
                    {/* Visual Latency Waterfall */}
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2.5 bg-surface-container shadow-xs border border-surface-variant/40 flex flex-col">
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">1. STT / WHISPER</span>
                        <span className="font-headline-sm text-lg font-serif text-on-surface mt-1 font-bold">110ms</span>
                        <span className="font-label-technical text-[10px] text-tertiary">Streaming Chunks</span>
                      </div>
                      <div className="p-2.5 bg-surface-container shadow-xs border border-surface-variant/40 flex flex-col">
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">2. CLAUDE 3.5</span>
                        <span className="font-headline-sm text-lg font-serif text-on-surface mt-1 font-bold">190ms</span>
                        <span className="font-label-technical text-[10px] text-tertiary">First-Token Emit</span>
                      </div>
                      <div className="p-2.5 bg-surface-container shadow-xs border border-surface-variant/40 flex flex-col">
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">3. ELEVENLABS</span>
                        <span className="font-headline-sm text-lg font-serif text-on-surface mt-1 font-bold">130ms</span>
                        <span className="font-label-technical text-[10px] text-tertiary">Audio Synthesized</span>
                      </div>
                      <div className="p-2.5 bg-secondary-container text-on-secondary-container shadow-xs flex flex-col">
                        <span className="font-label-mono text-[10px] uppercase font-bold">TOTAL TURN</span>
                        <span className="font-headline-sm text-lg font-serif mt-1 font-bold">430ms</span>
                        <span className="font-label-technical text-[10px]">Sub-500ms Target</span>
                      </div>
                    </div>

                    {/* Waveform graphic */}
                    <div className="bg-surface-container-high p-4 flex flex-col gap-2 border border-surface-variant/30">
                      <div className="flex items-center justify-between font-label-mono text-xs text-on-surface-variant">
                        <span>REAL-TIME FULL-DUPLEX WEBRTC BUFFER</span>
                        <span className="text-primary font-bold">JITTER: 1.2ms</span>
                      </div>
                      <div className="h-16 w-full flex items-center justify-between gap-1 overflow-hidden">
                        {[6, 12, 16, 8, 14, 20, 10, 4, 16, 18, 12, 7, 14, 5, 16, 10, 4, 18, 12, 8, 15, 6].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h * 3.5}px` }}
                            className={`w-1.5 transition-all duration-300 ${
                              i % 3 === 0
                                ? 'bg-primary'
                                : i % 3 === 1
                                ? 'bg-secondary-container'
                                : 'bg-tertiary'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Audio Engineering Console Image */}
                    <div className="w-full h-44 overflow-hidden relative shadow-xs border border-surface-variant/30">
                      <img
                        className="w-full h-full object-cover"
                        alt="Audio Engineering Gateway Benchmarking Rig"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS7TzGm9hDNbmRZM5UQ09gC2-CLGveLTFNPNDlpm3LTfDDPb_socl_yV2_DLRsJ_61UBXxPgdQH0bnQrdADR3P9T9pluDsm0uMMANogKJvxho-C_E4vt34IcqW_oy05xEK-FCF-ugUCXo9SG2dZ-WZLxOEosbH7DfVQ0Z1cVVyQpSKDYtHtdx5BuXwSaI5qey_yXWJir4B8ct06XUxt5Jq84KruRkYwHgyyIFLyP7_u_9RUZLLxfmPLw"
                      />
                      <div className="absolute bottom-2 left-2 px-3 py-1 bg-surface-container-lowest/90 font-label-mono text-xs text-on-surface shadow-xs">
                        Fig. 2.0 — WebRTC Audio Streaming Gateway Benchmarking Rig
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Narrative (5 cols) */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-space-xs font-label-mono text-xs uppercase tracking-widest text-on-surface-variant mb-space-xs">
                    <span className="text-secondary font-bold">PROJECT 02</span>
                    <span>·</span>
                    <span className="px-2 py-0.5 bg-surface-container-high text-on-surface">Systems Engineering &amp; Speech AI</span>
                  </div>

                  <h3 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface mb-space-sm leading-tight">
                    VoiceStream: Low-Latency Real-Time Voice AI Pipeline
                  </h3>

                  <p className="font-body-md text-sm text-on-surface-variant mb-space-md leading-relaxed">
                    Engineered a zero-lag speech-to-speech framework enabling seamless, non-robotic conversations between human callers and LLM agents. Features dynamic interruption detection, noise suppression, and speculative chunk execution.
                  </p>

                  <div className="bg-surface-container-lowest p-space-md shadow-xs mb-space-md border border-surface-variant/40">
                    <span className="font-label-mono text-xs text-secondary-container font-bold uppercase tracking-wider block mb-space-xs">
                      Key Technological Pillars
                    </span>
                    <ul className="flex flex-col gap-1.5 font-label-technical text-xs text-on-surface">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary-container" />
                        <span>Streaming STT: Whisper &amp; Deepgram WebSocket integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary" />
                        <span>Cognitive Brain: Claude 3.5 Sonnet with early yield token streaming</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-tertiary" />
                        <span>Audio Synthesis: ElevenLabs Flash TTS with custom chunk buffers</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-space-sm pt-space-sm bg-surface-container-high p-space-sm border border-surface-variant/30">
                  <div>
                    <span className="font-label-mono text-xs text-on-surface-variant uppercase">E2E Latency</span>
                    <div className="font-headline-sm text-2xl font-serif text-primary font-semibold mt-0.5">430ms</div>
                    <span className="font-body-sm text-xs text-on-surface-variant">Natural human conversational pace</span>
                  </div>
                  <div>
                    <span className="font-label-mono text-xs text-on-surface-variant uppercase">Interruption Recovery</span>
                    <div className="font-headline-sm text-2xl font-serif text-secondary font-semibold mt-0.5">&lt;65ms</div>
                    <span className="font-body-sm text-xs text-on-surface-variant">Instant audio packet flush</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* PROJECT 03: Enterprise RAG */}
        {(activeFilter === 'all' || activeFilter === 'distributed-systems' || activeFilter === 'full-stack') && (
          <article className="bg-surface-container p-space-md lg:p-space-lg shadow-sm hover:shadow-md transition-all border border-surface-variant/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              {/* Project Narrative (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-space-xs font-label-mono text-xs uppercase tracking-widest text-on-surface-variant mb-space-xs">
                    <span className="text-secondary font-bold">PROJECT 03</span>
                    <span>·</span>
                    <span className="px-2 py-0.5 bg-surface-container-high text-on-surface">RAG &amp; Distributed Search</span>
                  </div>

                  <h3 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface mb-space-sm leading-tight">
                    Enterprise RAG Intelligence &amp; Document Cognitive Engine
                  </h3>

                  <p className="font-body-md text-sm text-on-surface-variant mb-space-md leading-relaxed">
                    Designed a deterministic retrieval system handling millions of regulatory, legal, and financial documents with zero hallucination tolerance. Features hybrid dense-sparse vector scoring, parent-child semantic chunking, and verifiable source provenance.
                  </p>

                  <div className="bg-surface-container-lowest p-space-md shadow-xs mb-space-md border border-surface-variant/40">
                    <span className="font-label-mono text-xs text-tertiary font-bold uppercase tracking-wider block mb-space-xs">
                      Search Stack &amp; Verification
                    </span>
                    <ul className="flex flex-col gap-1.5 font-label-technical text-xs text-on-surface">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary" />
                        <span>Hybrid Index: pgvector (HNSW) + BM25 keyword inverted index</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary-container" />
                        <span>Re-ranking: Cohere Rerank v3 cross-encoder fine-tuned pipeline</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-tertiary" />
                        <span>Citation Guard: Automated claim verification &amp; source anchoring</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-space-sm pt-space-sm bg-surface-container-high p-space-sm border border-surface-variant/30">
                  <div>
                    <span className="font-label-mono text-xs text-on-surface-variant uppercase">Hallucination Delta</span>
                    <div className="font-headline-sm text-2xl font-serif text-tertiary font-semibold mt-0.5">0.02%</div>
                    <span className="font-body-sm text-xs text-on-surface-variant">Validated through claim check</span>
                  </div>
                  <div>
                    <span className="font-label-mono text-xs text-on-surface-variant uppercase">Corpus Scale</span>
                    <div className="font-headline-sm text-2xl font-serif text-on-surface font-semibold mt-0.5">2.4M+</div>
                    <span className="font-body-sm text-xs text-on-surface-variant">Indexed PDF &amp; tabular pages</span>
                  </div>
                </div>
              </div>

              {/* Visual Artifact (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-space-sm">
                <div className="bg-surface-container-lowest shadow-md border border-surface-variant/50 overflow-hidden flex flex-col">
                  {/* Inspection Nav */}
                  <div className="bg-surface-container-high px-4 py-3 flex items-center justify-between border-b border-surface-variant/40">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="font-label-mono text-xs text-on-surface uppercase tracking-wider">
                        VERIFIED CITATION ENGINE // AUDIT-LOG #512
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container font-label-mono text-[11px] uppercase font-semibold">
                      CONFIDENCE: 99.4%
                    </span>
                  </div>

                  <div className="p-space-md bg-surface-bright flex flex-col gap-space-sm">
                    {/* Split Cognitive Doc Span */}
                    <div className="p-space-sm bg-surface-container-low shadow-xs border border-surface-variant/30 flex flex-col gap-space-xs text-xs">
                      <div className="flex items-center justify-between font-label-mono text-outline text-[11px]">
                        <span>QUERY: "What are the indemnification limits for automated data pipelines under clause 14.2?"</span>
                        <span>RETRIEVAL: HYBRID_HNSW</span>
                      </div>
                      <div className="p-3 bg-surface-container-lowest font-body-sm text-on-surface leading-relaxed border border-surface-variant/30">
                        “Under Clause 14.2, the aggregate indemnification ceiling for automated data transmission failure shall not exceed{' '}
                        <span className="bg-secondary-fixed text-on-secondary-fixed px-1 font-semibold">
                          150% of the aggregate fees paid in the preceding 12 months
                        </span>, subject to verified disaster-recovery failover compliance.”
                      </div>
                      <div className="flex items-center gap-space-md font-label-mono text-[11px] text-on-surface-variant pt-1">
                        <span className="text-tertiary flex items-center gap-1 font-bold">
                          <FileCheck className="w-3.5 h-3.5" />
                          Direct Citation: SEC_10K_2024_PAGE_84.pdf
                        </span>
                        <span>Cross-Encoder Score: 0.982</span>
                      </div>
                    </div>

                    {/* Architectural Image */}
                    <div className="w-full h-48 overflow-hidden relative shadow-xs border border-surface-variant/30">
                      <img
                        className="w-full h-full object-cover"
                        alt="Modern library repository"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlUwb0TfYe1yT5TITFZThGhDDSlTgxG3YcpgirDnBuaHngsy-1rl3sj2kIF9vpcjQ4kE7Vp9YApBgAZkUZEcHk3DuWu89SAEH_PNz9BL36g97PNs9OmBX8ym4dZPmP7G1Dzj1M0rm66_BlKVav-nMxoWuIIKmh03f8rdLDHqxQrSRPaGH7GC9XVy_w4PwdIg7NeetagW8c7r77kAeobQxrLCRYPU7uoBDHnHkeiL3Td9NAJBny_AFu6Q"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-surface-dim/70 to-transparent flex items-center p-6">
                        <div className="max-w-xs bg-surface/95 backdrop-blur-md p-3 shadow-md border border-surface-variant/40">
                          <span className="font-label-mono text-xs text-secondary uppercase block mb-1 font-bold">DENSE-SPARSE RETRIEVAL</span>
                          <p className="font-body-sm text-xs text-on-surface">Sub-second rerank across multi-tenant vector namespaces with Cohere rerank models.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}
      </section>

      {/* Engineering Capabilities Matrix: Bento Grid */}
      <section className="focus-hide w-full bg-surface-container-low py-space-xl border-y border-surface-variant/40">
        <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <span className="font-label-mono text-xs text-tertiary uppercase tracking-widest font-bold">
                03 / TECHNICAL MASTERY &amp; CAPABILITIES
              </span>
              <h2 className="font-headline-md text-3xl sm:text-4xl font-serif text-on-surface tracking-tight mt-1">
                Engineered from metal to neural model.
              </h2>
            </div>
            <p className="font-body-sm text-sm text-on-surface-variant max-w-md">
              A full-stack, distributed mindset grounded in operational simplicity, deterministic APIs, and latency economics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Bento Card 1 */}
            <div className="bg-surface p-space-md shadow-xs flex flex-col justify-between border border-surface-variant/40">
              <div>
                <div className="w-10 h-10 bg-primary-container text-on-primary-container flex items-center justify-center mb-space-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-title-editorial text-lg text-on-surface font-semibold mb-space-xs font-serif">
                  Agentic Workflows &amp; LLM Systems
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-space-md">
                  Building autonomous state-graphs, deterministic function calling tools, prompt-caching strategies, and fine-tuned open-weights deployments using vLLM and Ollama.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 font-label-mono text-xs text-on-surface">
                <span className="px-2 py-1 bg-surface-container">LangChain</span>
                <span className="px-2 py-1 bg-surface-container">LlamaIndex</span>
                <span className="px-2 py-1 bg-surface-container">pgvector</span>
                <span className="px-2 py-1 bg-surface-container">Cohere</span>
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="bg-surface p-space-md shadow-xs flex flex-col justify-between border border-surface-variant/40">
              <div>
                <div className="w-10 h-10 bg-secondary-container text-on-secondary-container flex items-center justify-center mb-space-sm">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-title-editorial text-lg text-on-surface font-semibold mb-space-xs font-serif">
                  Distributed Backend &amp; Real-Time
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-space-md">
                  Designing sub-millisecond event buses, idempotent message queues, WebSockets, WebRTC streaming topologies, and high-concurrency microservices.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 font-label-mono text-xs text-on-surface">
                <span className="px-2 py-1 bg-surface-container">FastAPI</span>
                <span className="px-2 py-1 bg-surface-container">Golang</span>
                <span className="px-2 py-1 bg-surface-container">Redis Streams</span>
                <span className="px-2 py-1 bg-surface-container">PostgreSQL</span>
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="bg-surface p-space-md shadow-xs flex flex-col justify-between border border-surface-variant/40">
              <div>
                <div className="w-10 h-10 bg-tertiary text-on-tertiary flex items-center justify-center mb-space-sm">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-title-editorial text-lg text-on-surface font-semibold mb-space-xs font-serif">
                  WebGL &amp; Tactile Frontends
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-space-md">
                  Crafting spatial web experiences, hardware-accelerated 3D viewports, editorial typography hierarchy, and zero-compromise responsive design systems.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 font-label-mono text-xs text-on-surface">
                <span className="px-2 py-1 bg-surface-container">Three.js</span>
                <span className="px-2 py-1 bg-surface-container">React / Next.js</span>
                <span className="px-2 py-1 bg-surface-container">Tailwind CSS</span>
                <span className="px-2 py-1 bg-surface-container">GLSL Shaders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Invitation / Contact Callout Banner */}
      <section className="focus-hide w-full px-margin-mobile lg:px-margin py-space-xl max-w-7xl mx-auto">
        <div className="bg-inverse-surface text-inverse-on-surface p-space-lg lg:p-space-xl relative overflow-hidden shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center relative z-10">
            <div className="lg:col-span-8 flex flex-col gap-space-sm">
              <span className="font-label-mono text-xs text-secondary-container uppercase tracking-widest font-semibold">
                START AN ENGAGEMENT
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-4xl lg:text-5xl tracking-tight font-serif leading-tight">
                Have an audacious AI system or real-time architecture in mind?
              </h2>
              <p className="font-body-lg text-base text-inverse-on-surface/80 max-w-xl">
                Currently accepting select engineering collaborations, technical leadership roles, and strategic AI consulting engagements for forward-thinking products.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-space-sm justify-center">
              <button
                onClick={() => onTabChange('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-secondary-container text-on-secondary-container font-label-technical text-xs uppercase tracking-widest font-bold shadow-md hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer"
              >
                <span>Initiate Direct Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  onTriggerToast('Calendar appointment slot booking link copied: cal.com/himanshu-bharti/arch-sync');
                  navigator.clipboard?.writeText('https://cal.com/himanshu-bharti/arch-sync');
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-inverse-on-surface/30 text-inverse-on-surface hover:text-secondary-fixed hover:border-secondary-fixed font-label-technical text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule 20-Min Architecture Sync</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
