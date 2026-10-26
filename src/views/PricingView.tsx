import { useState } from 'react';
import type { TabType, PricingTier } from '../types';
import { Check, ShieldCheck, ArrowRight, Clock, HelpCircle, ChevronDown, ChevronUp, Sparkles, Code2, Layers, Cpu } from 'lucide-react';

interface PricingViewProps {
  onTabChange: (tab: TabType) => void;
  onTriggerToast: (msg: string) => void;
  onOpenScheduleSync?: () => void;
}

const tiers: PricingTier[] = [
  {
    id: 'whatsapp-ai',
    tierNumber: 'TIER 01',
    name: 'Meta WhatsApp & AI Helpdesk Setup',
    tagline: 'Official Meta Cloud API configuration, AI RAG auto-replies, and live-agent escalation queue.',
    price: '₹24,999 / $299',
    period: 'turnkey setup',
    commitment: '5 business days delivery',
    deliverables: [
      'Official Meta WhatsApp Business Cloud API & Webhook ingress setup (FastAPI)',
      'Custom Knowledge Base RAG Assistant for automated 24/7 client inquiries',
      'Interactive quick-reply buttons and catalog list message templates',
      'Confidence-gated live human support queue and rep routing',
      'Encrypted PostgreSQL chat history storage and delivery status analytics'
    ],
    idealFor: 'Businesses needing automated 24/7 customer support and verified WhatsApp presence.',
    turnaround: '5 Business Days',
    ctaText: 'Deploy WhatsApp AI Helpdesk'
  },
  {
    id: 'voice-rag-sprint',
    tierNumber: 'TIER 02',
    name: 'AI CRM, Voice & Hybrid RAG Sprint',
    tagline: 'Full-duplex Voice AI agents, multi-format RAG pipelines, or custom CRM platform.',
    price: '₹69,999 / $850',
    period: 'per 2-week sprint',
    commitment: '2 weeks dedicated engineering',
    isPopular: true,
    deliverables: [
      'Sub-600ms AI Voice Calling Agent (Deepgram STT + ElevenLabs TTS over WebSockets)',
      'Enterprise Hybrid RAG (PDF, DOCX, XLSX parsing with FAISS vector search & cross-encoder rerank)',
      'FastAPI or Java Spring Boot microservice with Redis caching and JWT authentication',
      'Comprehensive unit and integration test suite with >80% test coverage',
      'Docker Compose deployment with multi-tenant database isolation'
    ],
    idealFor: 'Growing companies needing dedicated engineering velocity to ship mission-critical AI features.',
    turnaround: '14 Calendar Days',
    ctaText: 'Reserve Sprint Slot'
  },
  {
    id: 'enterprise-meta',
    tierNumber: 'TIER 03',
    name: 'Full Enterprise AI & Meta Tech Suite',
    tagline: 'Turnkey distributed architecture: Meta Tech Provider status, Bulk Broadcasting, and custom ERP.',
    price: 'Custom Scope',
    period: 'multi-milestone engagement',
    commitment: '4 to 8 weeks engagement',
    deliverables: [
      'End-to-end Meta Tech Provider platform with Meta Embedded Signup (1-click WABA setup)',
      'WhatsApp bulk broadcasting engine with HSM template sync and Redis token-bucket rate limiter',
      'Instagram Graph API automation (comment-to-DM triggers and story mention lead capture)',
      'Full ERP/CRM backend (Java Spring Boot / FastAPI, PostgreSQL, Redis distributed locking)',
      'Docker / Kubernetes production deployment with 99.5% uptime SLA guarantee'
    ],
    idealFor: 'Enterprises and agencies requiring high-throughput automation and official Meta Business Partner status.',
    turnaround: '4 to 8 Weeks',
    ctaText: 'Initiate Enterprise Dispatch'
  }
];

const faqs = [
  {
    q: 'How does engagement onboarding work?',
    a: 'Following an initial 20-minute architecture sync, we execute a mutual NDA and issue an engagement statement of work (SOW) with clearly defined milestones, deliverables, and acceptance criteria. Work initiates within 3 to 5 business days.'
  },
  {
    q: 'Who owns the intellectual property and code created?',
    a: 'You do — 100%. All code, architectural diagrams, schemas, and configurations created during the engagement are assigned directly to your organization upon milestone completion.'
  },
  {
    q: 'Can you work alongside our existing engineering team?',
    a: 'Yes. I regularly integrate into existing Slack/Discord channels, participate in sprint rituals, submit pull requests through your GitHub/GitLab repositories, and conduct knowledge-transfer pairing sessions.'
  },
  {
    q: 'What are your working hours and timezone availability?',
    a: 'My studio operates primarily in Indian Standard Time (IST, UTC+5:30), which provides convenient daily overlap with EMEA afternoons and US East/West Coast mornings.'
  },
  {
    q: 'What if our project requires custom scope or hybrid milestones?',
    a: 'Tiers can be tailored to match your specific timeline and scope requirements. During our scoping call, we can adjust deliverables or structure a customized multi-sprint roadmap.'
  }
];

export default function PricingView({ onTabChange, onTriggerToast, onOpenScheduleSync }: PricingViewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSelectTier = (tier: PricingTier) => {
    onTriggerToast(`Selected ${tier.name}. Navigating to contact dispatch...`);
    onTabChange('contact');
  };

  return (
    <div className="w-full flex flex-col">
      {/* Editorial Masthead */}
      <section className="w-full border-b border-surface-variant/40 bg-surface-container-low/40">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin pt-12 pb-10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-variant/40 pb-4">
            <div className="flex items-center gap-2 font-label-mono text-xs text-on-surface-variant uppercase tracking-widest">
              <span className="w-2 h-2 bg-secondary-container" />
              <span>SERVICES &amp; ENGAGEMENT ARCHITECTURE</span>
              <span>·</span>
              <span>Q2 / Q3 2026 AVAILABILITY</span>
            </div>
            <div className="font-label-mono text-xs text-tertiary">
              Limited to 2 concurrent sprint partnerships
            </div>
          </div>

          <div className="max-w-3xl">
            <h1 className="font-headline-lg text-4xl sm:text-6xl text-on-surface font-serif tracking-tight leading-tight">
              Transparent Engineering Partnerships
            </h1>
            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant mt-3 leading-relaxed">
              Predictable velocity, deterministic deliverables, and production-grade architectures designed to scale from prototype to high-throughput enterprise deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                tier.isPopular
                  ? 'bg-surface-container border-2 border-secondary-container shadow-lg'
                  : 'bg-surface-container-low border border-surface-variant/60 shadow-xs hover:shadow-md'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 bg-secondary-container text-on-secondary-container font-label-mono text-[11px] uppercase font-bold tracking-wider">
                  Recommended Velocity
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between font-label-mono text-xs text-on-surface-variant mb-2">
                  <span className="text-secondary font-bold">{tier.tierNumber}</span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-tertiary" />
                    {tier.turnaround}
                  </span>
                </div>

                <h2 className="font-headline-md text-2xl font-serif text-on-surface mb-2">
                  {tier.name}
                </h2>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-6">
                  {tier.tagline}
                </p>

                {/* Price block */}
                <div className="bg-surface-container-lowest p-4 border border-surface-variant/40 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-lg text-3xl sm:text-4xl font-serif text-on-surface font-bold">
                      {tier.price}
                    </span>
                    <span className="font-label-mono text-xs text-on-surface-variant uppercase">
                      / {tier.period}
                    </span>
                  </div>
                  <span className="font-label-mono text-[11px] text-tertiary block mt-1">
                    {tier.commitment}
                  </span>
                </div>

                {/* Deliverables list */}
                <div className="space-y-3 mb-6">
                  <span className="font-label-mono text-xs text-on-surface font-bold uppercase tracking-wider block">
                    Scope &amp; Deliverables:
                  </span>
                  <ul className="space-y-2.5 text-xs font-body-sm text-on-surface/90">
                    {tier.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                {/* Ideal For box */}
                <div className="p-3 bg-surface-container-high border border-surface-variant/40 text-[11px] font-label-mono text-on-surface-variant mb-6">
                  <span className="font-bold text-on-surface block mb-1">IDEAL FIT:</span>
                  {tier.idealFor}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectTier(tier)}
                  className={`w-full py-3.5 px-4 font-label-technical text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    tier.isPopular
                      ? 'bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary'
                      : 'bg-on-surface text-surface hover:bg-primary hover:text-on-primary'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Invariants Strip */}
      <section className="w-full bg-surface-container py-12 border-y border-surface-variant/40">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <div className="mb-8">
            <span className="font-label-mono text-xs text-secondary uppercase tracking-widest font-bold">
              OPERATIONAL INVARIANTS
            </span>
            <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface mt-1">
              Guaranteed standards on every engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface p-5 border border-surface-variant/40 shadow-xs flex flex-col gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h3 className="font-title-editorial text-base text-on-surface font-semibold">100% IP Ownership</h3>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Full intellectual property, patents, source code, and training pipelines belong solely to your organization.
              </p>
            </div>

            <div className="bg-surface p-5 border border-surface-variant/40 shadow-xs flex flex-col gap-2">
              <Code2 className="w-5 h-5 text-secondary-container" />
              <h3 className="font-title-editorial text-base text-on-surface font-semibold">Production Rigor</h3>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Deterministic typing, exhaustive automated tests, Docker multi-stage builds, and zero-compromise documentation.
              </p>
            </div>

            <div className="bg-surface p-5 border border-surface-variant/40 shadow-xs flex flex-col gap-2">
              <Layers className="w-5 h-5 text-tertiary" />
              <h3 className="font-title-editorial text-base text-on-surface font-semibold">No Black Boxes</h3>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Modular architecture with clean abstraction barriers so your in-house engineering team can maintain and extend easily.
              </p>
            </div>

            <div className="bg-surface p-5 border border-surface-variant/40 shadow-xs flex flex-col gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              <h3 className="font-title-editorial text-base text-on-surface font-semibold">Compute Economics</h3>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Engineered with token efficiency, prompt-caching, and hardware memory saturation strategies to minimize cloud costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="w-full max-w-4xl mx-auto px-margin-mobile lg:px-margin py-16">
        <div className="text-center mb-10">
          <span className="font-label-mono text-xs text-tertiary uppercase tracking-widest font-bold">
            QUESTIONS &amp; PROTOCOL
          </span>
          <h2 className="font-headline-md text-3xl font-serif text-on-surface mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-surface-container-low border border-surface-variant/50 transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-title-editorial text-base sm:text-lg text-on-surface font-semibold">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-on-surface-variant shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-on-surface-variant shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-body-md text-on-surface-variant leading-relaxed border-t border-surface-variant/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Banner */}
        <div className="mt-12 p-8 bg-inverse-surface text-inverse-on-surface text-center flex flex-col items-center gap-4 shadow-xl">
          <span className="font-label-mono text-xs text-secondary-container uppercase tracking-widest font-bold">
            DIRECT COLLABORATION
          </span>
          <h3 className="font-headline-sm text-2xl sm:text-3xl font-serif">
            Ready to scope your engineering initiative?
          </h3>
          <p className="text-sm font-body-sm text-inverse-on-surface/80 max-w-lg">
            Schedule a confidential 20-minute architecture review to discuss requirements, feasibility, and sprint scheduling.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <button
              onClick={() => onTabChange('contact')}
              className="px-6 py-3 bg-secondary-container text-on-secondary-container font-label-technical text-xs uppercase tracking-wider font-bold hover:bg-secondary transition-all cursor-pointer"
            >
              Initiate Direct Dispatch
            </button>
            <button
              onClick={() => {
                if (onOpenScheduleSync) {
                  onOpenScheduleSync();
                } else {
                  onTabChange('contact');
                }
              }}
              className="px-6 py-3 bg-transparent border border-inverse-on-surface/30 text-inverse-on-surface hover:border-secondary-container hover:text-secondary-container font-label-technical text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Schedule 20-Min Sync
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
