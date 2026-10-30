import type { TabType } from '../types';
import { Scale, FileText, CheckCircle2, ShieldCheck, ArrowLeft, Printer, Calendar, Award, Globe, Briefcase } from 'lucide-react';

interface TermsViewProps {
  onTabChange: (tab: TabType) => void;
}

export default function TermsView({ onTabChange }: TermsViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col w-full animate-fade-in">
      {/* Editorial Header / Masthead */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin pt-space-lg pb-space-xl">
        <div className="flex flex-col gap-space-md border-b border-surface-variant/40 pb-space-lg">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Statutory Gazette</span>
              <span className="text-outline-variant">/</span>
              <span className="text-secondary font-bold">Terms of Service &amp; Master Engagement</span>
            </div>
            <button
              onClick={() => onTabChange('work')}
              className="inline-flex items-center gap-1.5 text-on-surface hover:text-primary transition-colors cursor-pointer font-bold tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Portfolio
            </button>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-6xl lg:text-7xl text-on-surface tracking-tight leading-none font-serif">
            Terms of Service &amp; <br className="hidden sm:inline" />
            <span className="italic font-serif text-on-surface-variant">Engineering Engagement.</span>
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed mt-2">
            Governing architectural consulting, custom software development sprints, Meta Cloud WhatsApp integrations, intellectual property transfer, and warranty covenants.
          </p>

          {/* Metadata Gazette Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 mt-2 border-t border-surface-variant/30 font-label-mono text-xs">
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">Edition Revision</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-secondary" /> 2026 Broadsheet · Vol. V
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">Governing Law</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <Globe className="w-3.5 h-3.5 text-tertiary" /> Courts of Bihar, India
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">IP Standard</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <Award className="w-3.5 h-3.5 text-primary" /> 100% Work-For-Hire Transfer
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">Contract Focus</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <Briefcase className="w-3.5 h-3.5 text-outline" /> SDE Full-Stack &amp; AI
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Legal Content Section */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin pb-space-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Sticky Sidebar Navigation (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-space-md lg:sticky lg:top-28">
            <div className="p-space-md bg-surface-container-low border border-surface-variant/40 shadow-xs flex flex-col gap-4">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Terms Quick Index
              </span>
              <nav className="flex flex-col gap-2 font-label-technical text-xs">
                <a href="#terms-1" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  1. Preamble &amp; Scope of Engagement
                </a>
                <a href="#terms-2" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  2. Meta Cloud API &amp; Messaging Policy
                </a>
                <a href="#terms-3" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  3. IP Assignment &amp; Work-For-Hire
                </a>
                <a href="#terms-4" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  4. Commercial Fees &amp; Milestones
                </a>
                <a href="#terms-5" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  5. 30-Day Defect Warranty
                </a>
                <a href="#terms-6" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  6. Mutual Non-Disclosure (NDA)
                </a>
                <a href="#terms-7" className="text-on-surface-variant hover:text-primary transition-colors py-1">
                  7. Governing Jurisdiction (New Delhi)
                </a>
              </nav>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handlePrint}
                  className="w-full py-2.5 px-3 bg-surface-container-high hover:bg-surface border border-surface-variant/60 font-label-mono text-xs text-on-surface flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-on-surface-variant" />
                  Print Official Gazetted Copy
                </button>
                <button
                  onClick={() => onTabChange('privacy')}
                  className="w-full py-2 px-3 text-center text-xs font-label-mono text-on-surface-variant hover:text-primary underline cursor-pointer"
                >
                  Review Privacy Policy →
                </button>
                <button
                  onClick={() => onTabChange('pricing')}
                  className="w-full py-2 px-3 text-center text-xs font-label-mono text-on-surface-variant hover:text-primary underline cursor-pointer"
                >
                  View Engineering Retainer Tiers →
                </button>
              </div>
            </div>

            {/* Engagement Consultation Fast Track */}
            <div className="p-space-md bg-surface-container-low border border-secondary/30 shadow-xs flex flex-col gap-2 font-label-mono text-xs">
              <span className="text-secondary font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                Commission an Architecture
              </span>
              <p className="text-on-surface font-semibold text-sm font-serif">Enterprise AI &amp; Full Stack</p>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">
                Available for technical leadership, sprint contracts, and high-concurrency systems design.
              </p>
              <button
                onClick={() => onTabChange('contact')}
                className="mt-2 py-2 px-3 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider text-center cursor-pointer hover:bg-primary-hover transition-colors"
              >
                Initiate Formal Proposal
              </button>
            </div>
          </aside>

          {/* Legal Narrative Body (8 cols) */}
          <main className="lg:col-span-8 flex flex-col gap-space-xl">
            {/* Clause 1 */}
            <article id="terms-1" className="flex flex-col gap-3 scroll-mt-28">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Clause 01 · Preamble &amp; Scope of Services
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Engineering Master Engagement
              </h2>
              <div className="space-y-3 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  These Terms of Service constitute a legally binding agreement between the client organization (&ldquo;Client&rdquo;) and <strong className="text-on-surface">Himanshu Bharti</strong> (&ldquo;Lead Software Development Engineer&rdquo;, &ldquo;Contractor&rdquo;), Software Development Engineer (Full Stack &amp; AI Systems).
                </p>
                <p>
                  Services encompass enterprise backend microservices (Java Spring Boot, Python FastAPI), sub-600ms AI voice calling pipelines (Deepgram + ElevenLabs WebSockets), custom CRM/ERP integrations, retrieval-augmented generation (RAG) vector engines, and Meta Cloud WhatsApp Business automation frameworks.
                </p>

                {/* Architecture Sync / Booking Clause */}
                <div className="p-4 bg-surface-container-low border border-surface-variant/40 space-y-2 mt-2">
                  <h4 className="font-title-editorial font-serif font-bold text-sm text-on-surface">
                    1.1 Preliminary 20-Minute Architecture Syncs &amp; Calendar Bookings
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Complimentary 20-minute architecture syncs and technical advisory appointments scheduled through this platform are exploratory engineering sessions designed solely to evaluate architectural feasibility, technical scope, and compatibility.
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Submission of a calendar request or participation in a preliminary sync does not establish an ongoing employment relationship, agency representation, or an enforceable commitment to deliver production software until a formal Statement of Work (SOW) or Retainer Agreement is executed by both parties.
                  </p>
                  <div className="pt-1 text-[11px] font-label-mono text-secondary font-semibold">
                    Statutory Notice: All booking inquest parameters are transmitted under explicit DPDP Act 2023 consent.
                  </div>
                </div>
              </div>
            </article>

            {/* Clause 2 */}
            <article id="terms-2" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Clause 02 · Meta WhatsApp Cloud API Governance
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Meta Ecosystem Compliance &amp; Anti-Spam
              </h2>
              <div className="space-y-3 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  Any automated messaging workflow engineered by Contractor utilizing Meta WhatsApp Business Platform APIs is governed strictly by Meta&apos;s Business Messaging Terms:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                    <span><strong>Explicit Opt-in Compliance:</strong> Client warrants that all customer phone numbers ingested into notification workflows have obtained verifiable opt-in under applicable regional marketing regulations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                    <span><strong>1-Click Opt-Out Enforcement:</strong> All conversation bots must provide standard &ldquo;STOP&rdquo; keywords to revoke consent. Contractor will build automated blacklisting handlers into the webhook layer.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                    <span><strong>Direct Cloud Costs:</strong> Meta conversation charges, Twilio telephony units, and LLM inference token tariffs are the direct operational responsibility of Client via their respective cloud console billings.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Clause 3 */}
            <article id="terms-3" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Clause 03 · Intellectual Property &amp; Work-for-Hire
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                100% Client Ownership Standard
              </h2>
              <div className="p-space-md bg-surface-container-high border-l-4 border-secondary space-y-3">
                <div className="flex items-center gap-2 text-secondary font-bold font-label-mono text-xs uppercase tracking-wider">
                  <Award className="w-5 h-5" />
                  Irrevocable Intellectual Property Assignment
                </div>
                <p className="text-on-surface text-sm sm:text-base font-serif italic">
                  &ldquo;Upon settlement of all milestone invoice disbursements, Contractor transfers and assigns 100% of all right, title, copyright, and patent interest in custom source code, documentation, schema definitions, and trained model weights created for Client.&rdquo;
                </p>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  Contractor retains rights solely to pre-existing open-source scaffolding, personal boilerplate modules, and the right to showcase the architectural case study in portfolio dispatches (excluding proprietary trade secrets).
                </p>
              </div>
            </article>

            {/* Clause 4 */}
            <article id="terms-4" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Clause 04 · Commercial Fees, Milestones &amp; Billing
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Structured Milestone Disbursements
              </h2>
              <div className="space-y-3 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  To ensure predictable delivery schedules and mutual alignment, all engagements follow deterministic sprint milestone schedules:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-container-low border border-surface-variant/40">
                    <span className="text-xs font-label-mono uppercase tracking-wider text-secondary font-bold block mb-1">
                      Fixed-Scope Sprints
                    </span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      50% upfront retainer prior to architecture sprint kick-off; 50% upon User Acceptance Testing (UAT) sign-off and production handover.
                    </p>
                  </div>
                  <div className="p-4 bg-surface-container-low border border-surface-variant/40">
                    <span className="text-xs font-label-mono uppercase tracking-wider text-secondary font-bold block mb-1">
                      Monthly Retainers
                    </span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Billed on the 1st of each calendar month with guaranteed developer bandwidth, sub-24h emergency SLAs, and continuous pipeline optimization.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Clause 5 */}
            <article id="terms-5" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Clause 05 · Warranty &amp; Defect Rectification
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                30-Day Production Defect Warranty
              </h2>
              <div className="space-y-3 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  Contractor guarantees that all deliverables will conform strictly to mutually agreed technical specifications, automated test suites, and API contracts.
                </p>
                <p className="text-xs sm:text-sm">
                  Following client sign-off, Contractor provides an unconditional <strong className="text-on-surface">30-day bug-fix warranty</strong> at zero additional charge for any reproducible errors, broken endpoints, or security discrepancies originating from delivered code.
                </p>
              </div>
            </article>

            {/* Clause 6 */}
            <article id="terms-6" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Clause 06 · Mutual Non-Disclosure &amp; Confidentiality
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Strict Confidentiality Covenants
              </h2>
              <div className="space-y-3 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  Both parties agree to treat all business plans, customer records, database credentials, API secrets, and proprietary architectures as strictly confidential.
                </p>
                <p className="text-xs sm:text-sm">
                  Obligations survive for a period of five (5) years following the conclusion of the engagement. Contractor signs bilateral NDAs prior to accessing production database snapshots or enterprise repositories.
                </p>

                <div className="p-3.5 bg-surface-container-high border-l-2 border-primary text-xs font-label-mono space-y-1 mt-2">
                  <span className="text-primary font-bold uppercase tracking-wider block">
                    6.1 Architecture Sync Mutual Confidentiality
                  </span>
                  <p className="text-on-surface-variant leading-relaxed">
                    Where the &ldquo;Mutual Non-Disclosure Agreement (NDA)&rdquo; election is checked during the 20-minute architecture sync booking, Contractor covenants to treat all disclosed codebase architectures, proprietary models, system topologies, and trade secrets strictly confidential under reciprocal NDA standards, restricted exclusively to assessing technical feasibility.
                  </p>
                </div>
              </div>
            </article>

            {/* Clause 7 */}
            <article id="terms-7" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Clause 07 · Governing Law &amp; Dispute Resolution
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Jurisdiction of New Delhi, India
              </h2>
              <div className="p-space-md bg-surface-container-low border border-surface-variant/40 space-y-3 text-xs sm:text-sm text-on-surface-variant">
                <p>
                  This Agreement is governed by the laws of the Republic of India. In the event of any contractual dispute, the parties agree to first seek amicable resolution through good-faith technical mediation for 30 days.
                </p>
                <div className="font-label-mono text-xs text-on-surface space-y-1 bg-surface-container-high p-3 border border-surface-variant/60">
                  <p><strong>Primary Forum:</strong> Courts of Bihar, Republic of India</p>
                  <p><strong>Registered Address:</strong> Dakbangla Chowk, Simri Bakhtiarpur, Bihar 852127, India</p>
                  <p><strong>Arbitration Body:</strong> Indian Arbitration and Conciliation Act, 1996</p>
                  <p><strong>Language of Proceedings:</strong> English</p>
                  <p><strong>Inquiry Contact:</strong> <a href="mailto:hkbharti77@gmail.com" className="text-primary underline">hkbharti77@gmail.com</a></p>
                </div>
              </div>
            </article>
          </main>
        </div>
      </section>
    </div>
  );
}
