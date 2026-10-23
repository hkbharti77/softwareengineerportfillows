import { useState } from 'react';
import type { TabType, VoiceStepData } from '../types';
import { ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface EngineeringViewProps {
  onTabChange: (tab: TabType) => void;
  onTriggerToast: (msg: string) => void;
}

const voiceStepData: Record<number, VoiceStepData> = {
  1: {
    step: 1,
    label: '[ 01. Ingestion & VAD ]',
    timing: 't = 0ms → 40ms',
    title: 'WebRTC Chunking & Silero VAD',
    shortDesc: 'Raw 16kHz PCM audio frames analyzed over a 30ms sliding window. Eliminates transmission of dead space and truncates dead air early.',
    badge: 'STAGE 01: SILERO_VAD',
    inspectorTitle: 'Engine Mechanism: Voice Activity Detection',
    inspectorDesc: 'Audio is received as raw PCM chunk packets over a bi-directional WebRTC Datachannel. The lightweight Silero model (ONNX Runtime) computes confidence scores every 30ms. Only frames scoring > 0.65 voice probability are pushed to Deepgram, immediately cutting compute costs and eliminating STT hallucination over background HVAC hums.',
    duration: '30.0 ms',
    latency: '< 3.2 ms',
    loss: 'Up to 15%'
  },
  2: {
    step: 2,
    label: '[ 02. Speech to Text ]',
    timing: 't = 40ms → 180ms',
    title: 'Deepgram Nova-2 Streaming STT',
    shortDesc: 'WebSocket stream emits interim and final transcription tokens with smart punctuation and domain-specific vocabulary biasing.',
    badge: 'STAGE 02: STREAMING_STT',
    inspectorTitle: 'Engine Mechanism: Deepgram Nova-2 WebSockets',
    inspectorDesc: 'Pre-filtered audio packets stream over persistent TLS WebSockets with custom domain vocabulary biasing. Nova-2 emits interim transcripts in 140ms increments. When speech pauses for 120ms, an endpoint event triggers downstream reasoning before acoustic decay finishes.',
    duration: '140.0 ms',
    latency: '~165 ms',
    loss: '0% (TCP/WSS)'
  },
  3: {
    step: 3,
    label: '[ 03. Cognitive Reasoning ]',
    timing: 't = 180ms → 320ms',
    title: 'Claude 3.5 / GPT-4o Token Pipelining',
    shortDesc: 'Immediate token yield via Server-Sent Events. First 4 words trigger TTS generation before the complete sentence has settled.',
    badge: 'STAGE 03: CLAUDE_PIPELINE',
    inspectorTitle: 'Engine Mechanism: Streaming Token Generation & Tool Routing',
    inspectorDesc: 'Anthropic Claude 3.5 Sonnet / OpenAI GPT-4o processes the conversational prompt context. We bypass full sentence completion by intercepting the first 4 tokens to begin streaming to the synthesizer. Function calls (e.g. appointment lookups) run concurrently on async tasks.',
    duration: 'Streaming SSE',
    latency: '~180 ms TTFT',
    loss: 'Strict JSON Guard'
  },
  4: {
    step: 4,
    label: '[ 04. Neural Speech Synthesis ]',
    timing: 't = 320ms → 440ms',
    title: 'ElevenLabs Turbo Stream to Audio Context',
    shortDesc: 'Chunked binary audio streamed over TLS socket directly into a Web Audio API ring buffer with millisecond-exact drift correction.',
    badge: 'STAGE 04: ELEVENLABS_TTS',
    inspectorTitle: 'Engine Mechanism: High-Precision Binary Audio Buffering',
    inspectorDesc: 'ElevenLabs Turbo v2.5 streams chunked MP3/PCM audio frames back over WebSockets. The client\'s Web Audio API dynamically buffers these chunks into an AudioBufferSourceNode with timestamp synchronization, eliminating audio popping and jitter.',
    duration: 'Continuous Chunk',
    latency: '< 120 ms chunk',
    loss: 'Ring Buffer Sync'
  }
};

export default function EngineeringView({ onTabChange, onTriggerToast }: EngineeringViewProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const currentStep = voiceStepData[activeStep] || voiceStepData[1];

  return (
    <div className="flex flex-col w-full animate-fade-in">
      {/* Top Dossier Ledger & Header */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin pt-space-lg pb-space-xl">
        <div className="flex flex-col gap-space-md">
          {/* Registry Topline */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm border-b border-surface-variant/70 pb-space-sm text-xs font-label-mono uppercase tracking-widest">
            <div className="flex items-center gap-space-sm">
              <span className="inline-block w-2 h-2 bg-secondary-container animate-pulse" />
              <span className="text-on-surface-variant">Arch-ID: HB-SYS-2025-ALPHA</span>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface font-semibold">Specification &amp; Topology</span>
            </div>
            <div className="flex items-center gap-space-md">
              <span className="font-label-technical text-on-surface-variant">Runtime Protocol: HTTP/3 + WebRTC + WSS</span>
              <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-bold">Status: Production Live</span>
            </div>
          </div>

          {/* Main Editorial Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end pt-space-md">
            <div className="lg:col-span-8 flex flex-col gap-space-xs">
              <span className="font-label-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                Technical Dossier · Volume 02
              </span>
              <h1 className="font-headline-lg text-3xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight font-serif leading-none">
                Engineering Systems &amp; AI Architecture
              </h1>
              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-3xl mt-space-xs leading-relaxed">
                Deep dive into production-grade backend services, distributed telemetry flows, real-time voice orchestration, and multi-agent systems designed with architectural rigor.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="bg-surface-container-low p-space-md flex flex-col gap-space-xs shadow-xs border border-surface-variant/40">
                <span className="font-label-mono text-xs uppercase text-on-surface-variant">Architecture Philosophy</span>
                <p className="font-body-sm text-xs text-on-surface italic leading-relaxed">
                  "Isolate non-deterministic neural inferences behind strictly typed, verifiable event buses. Treat latency as an integrity metric."
                </p>
              </div>
            </div>
          </div>

          {/* Metric Telemetry Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mt-space-lg">
            <div className="bg-surface-container p-space-md flex flex-col gap-space-xs shadow-xs border border-surface-variant/40">
              <span className="font-label-mono text-xs uppercase tracking-wider text-on-surface-variant">Deployed Workflows</span>
              <span className="font-headline-md text-3xl font-serif text-on-surface font-bold">12+</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Production AI pipelines in 24/7 service</span>
            </div>
            <div className="bg-surface-container p-space-md flex flex-col gap-space-xs shadow-xs border border-surface-variant/40">
              <span className="font-label-mono text-xs uppercase tracking-wider text-secondary">E2E Voice Roundtrip</span>
              <span className="font-headline-md text-3xl font-serif text-primary font-bold">&lt;450ms</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Barge-in responsive streaming threshold</span>
            </div>
            <div className="bg-surface-container p-space-md flex flex-col gap-space-xs shadow-xs border border-surface-variant/40">
              <span className="font-label-mono text-xs uppercase tracking-wider text-on-surface-variant">Vector Substrate</span>
              <span className="font-headline-md text-3xl font-serif text-on-surface font-bold">pgvector</span>
              <span className="font-body-sm text-xs text-on-surface-variant">HNSW indexing with cosine semantic space</span>
            </div>
            <div className="bg-surface-container p-space-md flex flex-col gap-space-xs shadow-xs border border-surface-variant/40">
              <span className="font-label-mono text-xs uppercase tracking-wider text-tertiary">Factual Grounding</span>
              <span className="font-headline-md text-3xl font-serif text-tertiary font-bold">0-Halluc.</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Typed JSON assertion &amp; circuit breakers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01: Real-Time Streaming Voice AI Pipeline Blueprint */}
      <section className="w-full bg-surface-container-low py-space-xl border-y border-surface-variant/40">
        <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin flex flex-col gap-space-lg">
          {/* Section Intro Plaque */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm pb-space-sm border-b border-surface-variant/40">
            <div>
              <div className="flex items-center gap-space-xs font-label-mono text-xs text-primary font-semibold uppercase tracking-widest">
                <span>Blueprint 01</span>
                <span>·</span>
                <span>Sub-500ms Audio Pipeline</span>
              </div>
              <h2 className="font-headline-md text-2xl sm:text-4xl font-serif text-on-surface mt-space-xs">
                Real-Time Streaming Voice AI Engine
              </h2>
            </div>
            <div className="font-label-mono text-xs text-on-surface-variant">
              PROTOCOL: WEBRTC / OPUS 16KHZ ↔ PCM STREAM
            </div>
          </div>

          {/* Stepper Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
            {/* Step Selector Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-space-sm">
              {[1, 2, 3, 4].map((num) => {
                const item = voiceStepData[num];
                const isSelected = activeStep === num;
                return (
                  <button
                    key={num}
                    onClick={() => setActiveStep(num)}
                    className={`text-left p-space-md cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-surface shadow-md border-primary'
                        : 'bg-surface-container hover:bg-surface border-surface-variant/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-label-mono text-xs uppercase font-bold ${
                          isSelected ? 'text-primary' : 'text-on-surface-variant'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="font-label-technical text-xs text-on-surface-variant">{item.timing}</span>
                    </div>
                    <h3 className="font-title-editorial text-base font-semibold text-on-surface mt-space-xs font-serif">
                      {item.title}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      {item.shortDesc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Visual Blueprint Display (7 cols) */}
            <div className="lg:col-span-7 bg-surface p-space-lg flex flex-col justify-between shadow-md border border-surface-variant/50 relative overflow-hidden">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-variant/40">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-mono text-xs uppercase text-on-surface font-semibold">Active Inspector:</span>
                  <span className="px-2 py-0.5 bg-primary-container text-on-primary-container font-label-mono text-xs font-semibold">
                    {currentStep.badge}
                  </span>
                </div>
                <span className="font-label-mono text-xs text-on-surface-variant">Buffer: 4096 Samples</span>
              </div>

              {/* Simulated Waveform & Oscilloscope Graphic */}
              <div className="my-space-md flex flex-col gap-space-md">
                <div className="bg-surface-container-high p-space-md border border-surface-variant/30">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-mono text-xs uppercase text-on-surface">Waveform Audio Buffer (16,000 Hz)</span>
                    <span className="font-label-mono text-xs text-secondary font-semibold">SNR: 28.4 dB</span>
                  </div>
                  <svg className="w-full h-24 text-primary" fill="none" viewBox="0 0 600 96">
                    <line stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.2" x1="0" x2="600" y1="48" y2="48" />
                    <line stroke="currentColor" strokeOpacity="0.1" x1="150" x2="150" y1="0" y2="96" />
                    <line stroke="currentColor" strokeOpacity="0.1" x1="300" x2="300" y1="0" y2="96" />
                    <line stroke="currentColor" strokeOpacity="0.1" x1="450" x2="450" y1="0" y2="96" />
                    <path
                      d="M0 48 Q 25 48, 40 48 T 80 48 Q 100 20, 120 70 T 150 15 T 180 82 T 210 25 T 240 68 T 270 48 T 320 48 T 360 30 T 390 65 T 420 18 T 450 78 T 480 35 T 510 55 T 550 48 L 600 48"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M80 48 Q 100 20, 120 70 T 150 15 T 180 82 T 210 25 T 240 68 T 270 48 L 270 48 L 80 48 Z"
                      fill="currentColor"
                      fillOpacity="0.08"
                    />
                    <path
                      d="M340 48 Q 360 30, 390 65 T 420 18 T 450 78 T 480 35 T 510 55 T 550 48 L 550 48 L 340 48 Z"
                      fill="currentColor"
                      fillOpacity="0.08"
                    />
                  </svg>
                </div>

                {/* Dynamic Inspector Panel */}
                <div className="bg-surface-container-low p-space-md flex flex-col gap-space-xs border border-surface-variant/40">
                  <span className="font-label-mono text-xs text-secondary uppercase tracking-wider font-semibold">
                    {currentStep.inspectorTitle}
                  </span>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface leading-relaxed">
                    {currentStep.inspectorDesc}
                  </p>
                  <div className="grid grid-cols-3 gap-space-sm pt-space-xs">
                    <div className="bg-surface p-space-xs flex flex-col border border-surface-variant/30">
                      <span className="font-label-mono text-[11px] text-on-surface-variant">Chunk Duration</span>
                      <span className="font-label-technical text-xs text-on-surface font-bold">{currentStep.duration}</span>
                    </div>
                    <div className="bg-surface p-space-xs flex flex-col border border-surface-variant/30">
                      <span className="font-label-mono text-[11px] text-on-surface-variant">Inference / TTFT</span>
                      <span className="font-label-technical text-xs text-on-surface font-bold">{currentStep.latency}</span>
                    </div>
                    <div className="bg-surface p-space-xs flex flex-col border border-surface-variant/30">
                      <span className="font-label-mono text-[11px] text-on-surface-variant">Integrity Rule</span>
                      <span className="font-label-technical text-xs text-on-surface font-bold">{currentStep.loss}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edge Case Guardrail */}
              <div className="p-space-md bg-secondary-fixed/30 border border-secondary/20 flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <AlertTriangle className="w-4 h-4 text-secondary" />
                  <span className="font-label-mono text-xs uppercase tracking-wider text-secondary font-bold">
                    Critical Engineering Edge Case: Interruption &amp; Echo Cancellation
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                  When the client begins speaking while the synthesizer is playing back audio, the client sends a synchronized{' '}
                  <code className="bg-surface px-1 py-0.5 font-label-mono text-primary border border-surface-variant/40">BARGE_IN_TRIGGER</code>{' '}
                  packet. The backend immediately flushes the ElevenLabs output buffer, transmits a silence packet to the client speaker ring, and resets the LLM inference context to branch on user priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Autonomous WhatsApp Sales & CRM Engine */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl bg-surface max-w-7xl mx-auto">
        <div className="flex flex-col gap-space-lg">
          {/* Section Intro */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm border-b border-surface-variant pb-space-sm">
            <div>
              <div className="flex items-center gap-space-xs font-label-mono text-xs text-secondary font-semibold uppercase tracking-widest">
                <span>Blueprint 02</span>
                <span>·</span>
                <span>Event-Driven Architecture</span>
              </div>
              <h2 className="font-headline-md text-2xl sm:text-4xl font-serif text-on-surface mt-space-xs">
                Autonomous WhatsApp Sales &amp; CRM Engine
              </h2>
            </div>
            <div className="font-label-mono text-xs text-on-surface-variant">
              THROUGHPUT: 1,200 REQ/SEC CONCURRENT INGESTION
            </div>
          </div>

          {/* Distributed End-to-End Topology */}
          <div className="w-full bg-surface-container-low p-space-lg shadow-xs border border-surface-variant/50">
            <span className="font-label-mono text-xs uppercase tracking-widest text-on-surface-variant block mb-space-md">
              Distributed End-to-End Topology
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-gutter">
              {/* Node 1 */}
              <div className="bg-surface p-space-md flex flex-col justify-between shadow-xs border border-surface-variant/40">
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-mono text-xs text-primary font-bold">NODE 01</span>
                    <span className="w-2 h-2 bg-primary" />
                  </div>
                  <h4 className="font-title-editorial text-sm font-serif font-bold text-on-surface">Meta Webhook</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-space-xs leading-relaxed">
                    WhatsApp Graph API delivers HMAC-SHA256 encrypted JSON payload.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs border-t border-surface-variant font-label-mono text-[11px] text-on-surface-variant">
                  Target: edge.api.v1
                </div>
              </div>

              {/* Node 2 */}
              <div className="bg-surface p-space-md flex flex-col justify-between shadow-xs border border-surface-variant/40">
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-mono text-xs text-tertiary font-bold">NODE 02</span>
                    <span className="w-2 h-2 bg-tertiary" />
                  </div>
                  <h4 className="font-title-editorial text-sm font-serif font-bold text-on-surface">Cloudflare Worker</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-space-xs leading-relaxed">
                    Validates signature header, drops replay attacks, responds 200 OK within 12ms.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs border-t border-surface-variant font-label-mono text-[11px] text-on-surface-variant">
                  Latency: ~8ms
                </div>
              </div>

              {/* Node 3 */}
              <div className="bg-surface p-space-md flex flex-col justify-between shadow-xs border border-surface-variant/40">
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-mono text-xs text-secondary font-bold">NODE 03</span>
                    <span className="w-2 h-2 bg-secondary" />
                  </div>
                  <h4 className="font-title-editorial text-sm font-serif font-bold text-on-surface">Redis BullMQ</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-space-xs leading-relaxed">
                    Persistent buffer queue with deduplication and exponential retry policies.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs border-t border-surface-variant font-label-mono text-[11px] text-on-surface-variant">
                  Concurrency: 60/core
                </div>
              </div>

              {/* Node 4 */}
              <div className="bg-surface p-space-md flex flex-col justify-between shadow-xs border border-surface-variant/40">
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-mono text-xs text-primary-container font-bold">NODE 04</span>
                    <span className="w-2 h-2 bg-primary-container" />
                  </div>
                  <h4 className="font-title-editorial text-sm font-serif font-bold text-on-surface">FastAPI Worker</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-space-xs leading-relaxed">
                    Asynchronous state orchestration, prompt compression &amp; role dispatch.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs border-t border-surface-variant font-label-mono text-[11px] text-on-surface-variant">
                  Python 3.12 + AsyncIO
                </div>
              </div>

              {/* Node 5 */}
              <div className="bg-surface p-space-md flex flex-col justify-between shadow-xs border border-surface-variant/40">
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-mono text-xs text-tertiary-container font-bold">NODE 05</span>
                    <span className="w-2 h-2 bg-tertiary-container" />
                  </div>
                  <h4 className="font-title-editorial text-sm font-serif font-bold text-on-surface">Vector Memory</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-space-xs leading-relaxed">
                    pgvector semantic search retrieving historical user interaction profiles.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs border-t border-surface-variant font-label-mono text-[11px] text-on-surface-variant">
                  PostgreSQL 16 HNSW
                </div>
              </div>

              {/* Node 6 */}
              <div className="bg-surface p-space-md flex flex-col justify-between shadow-xs border border-surface-variant/40">
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-mono text-xs text-secondary-container font-bold">NODE 06</span>
                    <span className="w-2 h-2 bg-secondary-container" />
                  </div>
                  <h4 className="font-title-editorial text-sm font-serif font-bold text-on-surface">Tool Execution</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-space-xs leading-relaxed">
                    Stripe invoicing, Google Calendar API &amp; HubSpot CRM automated updates.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs border-t border-surface-variant font-label-mono text-[11px] text-on-surface-variant">
                  Typed Tool Schemas
                </div>
              </div>
            </div>
          </div>

          {/* Deep Dive Code & Telemetry Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Code Snippet */}
            <div className="lg:col-span-7 bg-surface-container p-space-lg shadow-xs border border-surface-variant/50">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-variant mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-mono text-xs text-on-surface font-semibold">orchestrator.py</span>
                  <span className="font-label-mono text-xs text-on-surface-variant">• Dynamic Tool Execution Core</span>
                </div>
                <span className="font-label-mono text-xs text-primary font-semibold">PYTHON 3.12</span>
              </div>

              <pre className="font-label-mono text-xs leading-5 text-on-surface overflow-x-auto p-space-sm bg-surface border border-surface-variant/30">
                <code>
                  <span className="text-secondary font-bold">from</span> typing <span className="text-secondary font-bold">import</span> Annotated, TypedDict{'\n'}
                  <span className="text-secondary font-bold">from</span> pydantic <span className="text-secondary font-bold">import</span> BaseModel, Field{'\n'}
                  <span className="text-secondary font-bold">from</span> langchain_core.tools <span className="text-secondary font-bold">import</span> tool{'\n\n'}
                  <span className="text-tertiary"># Rigorous Schema Definition prevents parameter hallucination</span>{'\n'}
                  <span className="text-secondary font-bold">class</span> <span className="text-primary font-bold">InvoiceRequest</span>(BaseModel):{'\n'}
                  {'    '}client_phone: <span className="text-primary">str</span> = Field(..., description=<span className="text-tertiary">"E.164 formatted phone number"</span>){'\n'}
                  {'    '}amount_cents: <span className="text-primary">int</span> = Field(..., gt=<span className="text-secondary">0</span>, description=<span className="text-tertiary">"Amount in USD cents"</span>){'\n'}
                  {'    '}item_sku: <span className="text-primary">str</span> = Field(..., description=<span className="text-tertiary">"Validated catalogue SKU identifier"</span>){'\n'}
                  {'    '}idempotency_key: <span className="text-primary">str</span> = Field(..., description=<span className="text-tertiary">"Client-session UUIDv4"</span>){'\n\n'}
                  <span className="text-primary font-bold">@tool</span>(args_schema=InvoiceRequest){'\n'}
                  <span className="text-secondary font-bold">async def</span> <span className="text-primary-container font-bold">generate_stripe_payment_link</span>({'\n'}
                  {'    '}client_phone: <span className="text-primary">str</span>,{'\n'}
                  {'    '}amount_cents: <span className="text-primary">int</span>,{'\n'}
                  {'    '}item_sku: <span className="text-primary">str</span>,{'\n'}
                  {'    '}idempotency_key: <span className="text-primary">str</span>{'\n'}
                  ) -&gt; <span className="text-primary">dict</span>:{'\n'}
                  {'    '}<span className="text-tertiary">"""Executes atomic invoice creation with idempotency locks."""</span>{'\n'}
                  {'    '}<span className="text-secondary font-bold">async with</span> redis_pool.lock(f<span className="text-tertiary">"lock:invoice:&#123;idempotency_key&#125;"</span>, timeout=<span className="text-secondary">10</span>):{'\n'}
                  {'        '}session = <span className="text-secondary font-bold">await</span> stripe.checkout.Session.create_async({'\n'}
                  {'            '}customer_creation=<span className="text-tertiary">"always"</span>,{'\n'}
                  {'            '}payment_method_types=[<span className="text-tertiary">"card"</span>],{'\n'}
                  {'            '}line_items=[&#123;<span className="text-tertiary">"price"</span>: item_sku, <span className="text-tertiary">"quantity"</span>: <span className="text-secondary">1</span>&#125;],{'\n'}
                  {'            '}mode=<span className="text-tertiary">"payment"</span>,{'\n'}
                  {'            '}idempotency_key=idempotency_key{'\n'}
                  {'        '}){'\n'}
                  {'        '}<span className="text-secondary font-bold">await</span> audit_ledger.record_dispatch(client_phone, session.url){'\n'}
                  {'        '}<span className="text-secondary font-bold">return</span> &#123;<span className="text-tertiary">"status"</span>: <span className="text-tertiary">"READY"</span>, <span className="text-tertiary">"url"</span>: session.url&#125;
                </code>
              </pre>

              <div className="mt-space-md flex items-center justify-between font-label-mono text-xs text-on-surface-variant">
                <span>• Idempotency Guarantee: Redis Distributed Mutex</span>
                <span>Zero-Trust Validation</span>
              </div>
            </div>

            {/* System Narrative & Metrics */}
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="bg-surface-container-high p-space-md flex flex-col gap-space-xs shadow-xs border border-surface-variant/40">
                <span className="font-label-mono text-xs uppercase text-secondary font-semibold">Resilience Mechanism</span>
                <h3 className="font-headline-sm text-lg font-serif text-on-surface font-semibold">
                  Defensive Webhook Queue Ingestion
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-space-xs leading-relaxed">
                  Direct webhook calls from Meta risk dropped requests under burst loads. By terminating Webhooks at Cloudflare edge workers and writing immediately to an append-only BullMQ queue, the system achieves 99.998% uptime with zero message loss during viral traffic surges.
                </p>
              </div>

              <div className="bg-surface-container-low p-space-md flex flex-col gap-space-sm shadow-xs border border-surface-variant/40">
                <span className="font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">
                  Live Throughput Audit
                </span>
                <div className="flex items-center justify-between pb-space-xs border-b border-surface-variant text-xs">
                  <span className="font-label-technical text-on-surface">Edge Signature Auth</span>
                  <span className="font-label-mono text-tertiary font-bold">100% Passed</span>
                </div>
                <div className="flex items-center justify-between pb-space-xs border-b border-surface-variant text-xs">
                  <span className="font-label-technical text-on-surface">Worker Pool Availability</span>
                  <span className="font-label-mono text-on-surface font-bold">32 / 32 Healthy</span>
                </div>
                <div className="flex items-center justify-between pb-space-xs border-b border-surface-variant text-xs">
                  <span className="font-label-technical text-on-surface">pgvector Query Overhead</span>
                  <span className="font-label-mono text-primary font-bold">14.2 ms avg</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-label-technical text-on-surface">Tool Call Execution Success</span>
                  <span className="font-label-mono text-tertiary font-bold">99.84%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Technical Capabilities Matrix */}
      <section className="w-full bg-surface-container-low py-space-xl border-y border-surface-variant/40">
        <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm border-b border-surface-variant pb-space-sm">
            <div>
              <span className="font-label-mono text-xs text-on-surface-variant uppercase tracking-widest">
                Capabilities Grid
              </span>
              <h2 className="font-headline-md text-2xl sm:text-4xl font-serif text-on-surface mt-space-xs">
                Production Engineering Matrix
              </h2>
            </div>
            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant max-w-md">
              Structured capability domains deployed across enterprise infrastructures. Emphasizing rigor, typesafety, and verifiable execution over experimentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Domain 01 */}
            <div className="bg-surface p-space-md flex flex-col justify-between shadow-xs border border-surface-variant/40">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-xs text-primary font-bold">[ DOMAIN 01 ]</span>
                  <span className="w-3 h-3 bg-primary" />
                </div>
                <h3 className="font-headline-sm text-base font-serif font-bold text-on-surface">AI &amp; Agentic Systems</h3>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Autonomous cognitive architectures, self-correcting generation flows, and strict grounding engines.
                </p>
                <ul className="flex flex-col gap-space-xs pt-space-xs border-t border-surface-variant text-xs font-label-technical">
                  <li className="flex items-start gap-1.5">• <span>Multi-Agent Orchestration (LangGraph, DSPy)</span></li>
                  <li className="flex items-start gap-1.5">• <span>RAG Systems &amp; Semantic Hybrid Search</span></li>
                  <li className="flex items-start gap-1.5">• <span>Structured Function Calling &amp; JSON Schemas</span></li>
                  <li className="flex items-start gap-1.5">• <span>Continuous LLM Evaluation &amp; Guardrails</span></li>
                  <li className="flex items-start gap-1.5">• <span>Streaming Token Buffering Protocols</span></li>
                </ul>
              </div>
              <div className="mt-space-md pt-space-xs border-t border-surface-variant font-label-mono text-[11px] text-on-surface-variant">
                Primary: PyTorch • vLLM • LangChain
              </div>
            </div>

            {/* Domain 02 */}
            <div className="bg-surface p-space-md flex flex-col justify-between shadow-xs border border-surface-variant/40">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-xs text-secondary font-bold">[ DOMAIN 02 ]</span>
                  <span className="w-3 h-3 bg-secondary" />
                </div>
                <h3 className="font-headline-sm text-base font-serif font-bold text-on-surface">Backend &amp; Distributed Core</h3>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  High-concurrency services, event-driven streaming buses, and ACID-compliant storage layers.
                </p>
                <ul className="flex flex-col gap-space-xs pt-space-xs border-t border-surface-variant text-xs font-label-technical">
                  <li className="flex items-start gap-1.5">• <span>FastAPI (Python) &amp; Go Microservices</span></li>
                  <li className="flex items-start gap-1.5">• <span>Node.js / TypeScript Async Runtimes</span></li>
                  <li className="flex items-start gap-1.5">• <span>PostgreSQL, pgvector, Redis Cluster</span></li>
                  <li className="flex items-start gap-1.5">• <span>Kafka &amp; BullMQ Distributed Queues</span></li>
                  <li className="flex items-start gap-1.5">• <span>WebSocket &amp; gRPC RPC Frameworks</span></li>
                </ul>
              </div>
              <div className="mt-space-md pt-space-xs border-t border-surface-variant font-label-mono text-[11px] text-on-surface-variant">
                Primary: Go • Python • SQL • Redis
              </div>
            </div>

            {/* Domain 03 */}
            <div className="bg-surface p-space-md flex flex-col justify-between shadow-xs border border-surface-variant/40">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-xs text-tertiary font-bold">[ DOMAIN 03 ]</span>
                  <span className="w-3 h-3 bg-tertiary" />
                </div>
                <h3 className="font-headline-sm text-base font-serif font-bold text-on-surface">Cloud &amp; DevOps</h3>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Infrastructure as code, containerized serverless orchestration, and zero-downtime deployment pipelines.
                </p>
                <ul className="flex flex-col gap-space-xs pt-space-xs border-t border-surface-variant text-xs font-label-technical">
                  <li className="flex items-start gap-1.5">• <span>Docker Multi-Stage &amp; Kubernetes (EKS)</span></li>
                  <li className="flex items-start gap-1.5">• <span>AWS ECS, Lambda &amp; S3 Storage</span></li>
                  <li className="flex items-start gap-1.5">• <span>Cloudflare Workers Edge Compute</span></li>
                  <li className="flex items-start gap-1.5">• <span>GitHub Actions CI/CD with Test Suites</span></li>
                  <li className="flex items-start gap-1.5">• <span>Prometheus &amp; Grafana Observability</span></li>
                </ul>
              </div>
              <div className="mt-space-md pt-space-xs border-t border-surface-variant font-label-mono text-[11px] text-on-surface-variant">
                Primary: AWS • Docker • Terraform
              </div>
            </div>

            {/* Domain 04 */}
            <div className="bg-surface p-space-md flex flex-col justify-between shadow-xs border border-surface-variant/40">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-xs text-primary-container font-bold">[ DOMAIN 04 ]</span>
                  <span className="w-3 h-3 bg-primary-container" />
                </div>
                <h3 className="font-headline-sm text-base font-serif font-bold text-on-surface">Frontend &amp; Graphics</h3>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  High-frame-rate user interfaces, shader-driven WebGL experiences, and state-driven architectural design systems.
                </p>
                <ul className="flex flex-col gap-space-xs pt-space-xs border-t border-surface-variant text-xs font-label-technical">
                  <li className="flex items-start gap-1.5">• <span>Next.js App Router &amp; React Server Comp.</span></li>
                  <li className="flex items-start gap-1.5">• <span>Three.js, WebGL &amp; Custom GLSL Shaders</span></li>
                  <li className="flex items-start gap-1.5">• <span>Tailwind CSS Architectural Tokens</span></li>
                  <li className="flex items-start gap-1.5">• <span>XState Deterministic Finite State Machines</span></li>
                  <li className="flex items-start gap-1.5">• <span>Web Audio API Low-Latency Mixers</span></li>
                </ul>
              </div>
              <div className="mt-space-md pt-space-xs border-t border-surface-variant font-label-mono text-[11px] text-on-surface-variant">
                Primary: Next.js • Three.js • WebGL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04: Engineering Principles & Guardrails */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl bg-surface max-w-7xl mx-auto">
        <div className="flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm border-b border-surface-variant pb-space-sm">
            <div>
              <span className="font-label-mono text-xs text-secondary font-semibold uppercase tracking-widest">
                Architectural Principles
              </span>
              <h2 className="font-headline-md text-2xl sm:text-4xl font-serif text-on-surface mt-space-xs">
                Production Guardrails &amp; Integrity
              </h2>
            </div>
            <div className="font-label-mono text-xs text-on-surface-variant">
              STANDARD: ZERO UNAUDITED INFERENCE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch">
            {/* Pillar 1 */}
            <div className="bg-surface-container p-space-lg flex flex-col justify-between shadow-xs border border-surface-variant/40">
              <div className="flex flex-col gap-space-sm">
                <div className="w-10 h-10 bg-primary flex items-center justify-center text-on-primary font-label-mono text-xs font-bold">
                  01
                </div>
                <h3 className="font-headline-sm text-lg font-serif font-bold text-on-surface">
                  Determinism in Probabilistic Systems
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-space-xs leading-relaxed">
                  Natural language models are stochastic by definition. Production engineering demands determinism. We wrap neural predictions inside deterministic state machines (XState) and typed Pydantic assertion models. If output diverges from the strict JSON contract, the request triggers a structured retry before touching client state.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm border-t border-surface-variant text-xs">
                <span className="font-label-mono text-primary font-semibold uppercase">
                  → Pydantic &amp; Zod Schema Enforcers
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-surface-container p-space-lg flex flex-col justify-between shadow-xs border border-surface-variant/40">
              <div className="flex flex-col gap-space-sm">
                <div className="w-10 h-10 bg-tertiary flex items-center justify-center text-on-tertiary font-label-mono text-xs font-bold">
                  02
                </div>
                <h3 className="font-headline-sm text-lg font-serif font-bold text-on-surface">
                  End-to-End Tracing &amp; Observability
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-space-xs leading-relaxed">
                  Every token, prompt template, vector similarity score, and tool invocation carries a globally unique OpenTelemetry trace ID. System operators can inspect the entire causal graph from the moment an acoustic WebRTC frame enters the edge down to the precise millisecond a database transaction commits.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm border-t border-surface-variant text-xs">
                <span className="font-label-mono text-tertiary font-semibold uppercase">
                  → OpenTelemetry &amp; Langfuse Distributed Tracing
                </span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-surface-container p-space-lg flex flex-col justify-between shadow-xs border border-surface-variant/40">
              <div className="flex flex-col gap-space-sm">
                <div className="w-10 h-10 bg-secondary flex items-center justify-center text-on-secondary font-label-mono text-xs font-bold">
                  03
                </div>
                <h3 className="font-headline-sm text-lg font-serif font-bold text-on-surface">
                  Security &amp; PII Sanitization at the Edge
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-space-xs leading-relaxed">
                  User data is never forwarded directly to public model APIs. Before semantic indexing or LLM ingestion, payloads undergo regex and Named Entity Recognition (NER) masking at the edge worker tier. Sensitive identifiers (credit cards, tax numbers, phone records) are replaced with ephemeral tokens and re-hydrated only on dispatch.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm border-t border-surface-variant text-xs">
                <span className="font-label-mono text-secondary font-semibold uppercase">
                  → Edge Scrubbing &amp; Token Vaulting
                </span>
              </div>
            </div>
          </div>

          {/* Consultation Ribbon */}
          <div className="bg-surface-container-high p-space-lg flex flex-col lg:flex-row items-center justify-between gap-space-md shadow-md border border-surface-variant/50 mt-space-md">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-mono text-xs uppercase tracking-widest text-primary font-bold">
                Technical Consultation &amp; System Audits
              </span>
              <h4 className="font-title-editorial text-lg font-serif font-semibold text-on-surface">
                Require an architectural review of your enterprise AI pipeline?
              </h4>
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant max-w-2xl">
                Available for deep-dive technical evaluations, low-latency audio engine design, and multi-agent infrastructure consulting.
              </p>
            </div>
            <div className="flex items-center gap-space-sm shrink-0">
              <button
                onClick={() => onTabChange('contact')}
                className="inline-flex items-center px-5 py-3 bg-primary text-on-primary font-label-technical text-xs tracking-wider uppercase hover:bg-primary-container transition-all cursor-pointer font-semibold shadow-xs"
              >
                <span>Initiate Architecture Dialogue</span>
              </button>
              <button
                onClick={() => onTabChange('work')}
                className="inline-flex items-center px-5 py-3 bg-surface text-on-surface font-label-technical text-xs tracking-wider uppercase hover:bg-surface-variant transition-all cursor-pointer border border-surface-variant/40"
              >
                <span>Review Case Studies</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
