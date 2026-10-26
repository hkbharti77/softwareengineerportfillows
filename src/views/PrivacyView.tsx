import type { TabType } from '../types';
import { ShieldCheck, Lock, FileText, CheckCircle2, Mail, ArrowLeft, Printer, Calendar, Server, Globe, Clock } from 'lucide-react';

interface PrivacyViewProps {
  onTabChange: (tab: TabType) => void;
}

export default function PrivacyView({ onTabChange }: PrivacyViewProps) {
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
              <span className="text-secondary font-bold">Data Governance &amp; Privacy Policy</span>
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
            Data Protection &amp; <br className="hidden sm:inline" />
            <span className="italic font-serif text-on-surface-variant">Privacy Policy Notice.</span>
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed mt-2">
            Governing architectural telemetry, Meta WhatsApp Business API webhook integrations, proprietary AI pipeline isolation, and user privacy rights under the Digital Personal Data Protection Act 2023 and GDPR Art. 6.
          </p>

          {/* Metadata Gazette Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 mt-2 border-t border-surface-variant/30 font-label-mono text-xs">
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">Effective Date</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-secondary" /> October 2026 · Current Edition
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">Statutory Framework</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> DPDP 2023 · GDPR Art. 6
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">Jurisdiction</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <Globe className="w-3.5 h-3.5 text-tertiary" /> New Delhi, Republic of India
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">Classification</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <Server className="w-3.5 h-3.5 text-outline" /> Public Technical Standard
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
                Policy Quick Index
              </span>
              <nav className="flex flex-col gap-2 font-label-technical text-xs">
                <a href="#section-1" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  1. Statutory Posture &amp; Preamble
                </a>
                <a href="#section-2" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  2. Scope of Ingestion &amp; Telemetry
                </a>
                <a href="#section-3" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  3. Meta Cloud API &amp; Webhooks
                </a>
                <a href="#section-4" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  4. Strict Zero-AI-Training Guarantee
                </a>
                <a href="#section-5" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  5. Storage, Retention &amp; Cryptography
                </a>
                <a href="#section-6" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  6. Statutory Rights &amp; Rectification
                </a>
                <a href="#section-7" className="text-on-surface-variant hover:text-primary transition-colors py-1">
                  7. Grievance Officer &amp; Redressal
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
                  onClick={() => onTabChange('terms')}
                  className="w-full py-2 px-3 text-center text-xs font-label-mono text-on-surface-variant hover:text-primary underline cursor-pointer"
                >
                  Review Terms of Service →
                </button>
                <button
                  onClick={() => onTabChange('cookies')}
                  className="w-full py-2 px-3 text-center text-xs font-label-mono text-on-surface-variant hover:text-primary underline cursor-pointer"
                >
                  Manage Cookie &amp; Storage Preferences →
                </button>
              </div>
            </div>

            {/* Grievance Officer Summary Card */}
            <div className="p-space-md bg-surface-container-low border border-primary/20 shadow-xs flex flex-col gap-2 font-label-mono text-xs">
              <span className="text-primary font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Data Protection Officer
              </span>
              <p className="text-on-surface font-semibold text-sm font-serif">Himanshu Bharti</p>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">
                Software Development Engineer (Full Stack &amp; AI Systems)<br />
                New Delhi, National Capital Territory of Delhi, India
              </p>
              <a
                href="mailto:hkbharti77@gmail.com"
                className="mt-2 text-primary hover:underline flex items-center gap-1.5 text-[11px] font-bold"
              >
                <Mail className="w-3.5 h-3.5" />
                hkbharti77@gmail.com
              </a>
            </div>
          </aside>

          {/* Legal Narrative Body (8 cols) */}
          <main className="lg:col-span-8 flex flex-col gap-space-xl">
            {/* Section 1 */}
            <article id="section-1" className="flex flex-col gap-3 scroll-mt-28">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Section 01 · Statutory Posture &amp; Preamble
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Architectural Commitment to Digital Privacy
              </h2>
              <div className="space-y-3 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  This Privacy Notice governs the software engineering portfolio, demonstrative architectures, Meta Cloud WhatsApp webhooks, and client inquiry pipelines owned and operated by <strong className="text-on-surface">Himanshu Bharti</strong> (&ldquo;Engineer&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), Software Development Engineer (Full Stack &amp; AI Systems).
                </p>
                <p>
                  We are deeply committed to principles of data minimization, purpose limitation, storage limitation, and cryptographic security. Whether you are reviewing technical case studies, utilizing interactive voice/RAG prototypes, commissioning software development sprints, or communicating via Meta WhatsApp Business, your digital footprint is safeguarded under the highest statutory benchmarks.
                </p>
              </div>
            </article>

            {/* Section 2 */}
            <article id="section-2" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Section 02 · Scope of Ingestion &amp; Technical Telemetry
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Information Ingested Across Systems
              </h2>
              <div className="space-y-4 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  We collect and process personal data strictly necessary to fulfill technical consultations, calendar synchronizations, and contractual engineering commitments in full compliance with the Digital Personal Data Protection (DPDP) Act 2023:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Calendar / Sync Card */}
                  <div className="p-4 bg-surface-container-low border border-primary/30 flex flex-col justify-between">
                    <div>
                      <h4 className="font-title-editorial font-serif font-bold text-sm text-on-surface mb-1 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" /> 20-Min Architecture Sync &amp; Calendar Inquests
                      </h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed mt-2">
                        Full name, corporate email address, preferred calendar date, target time window, architectural focus area (Voice AI, Distributed Microservices, Agentic Pipelines, Vector Systems), engineering brief, and bilateral NDA execution flag.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-surface-variant/30 text-[10px] font-label-mono text-primary font-semibold uppercase">
                      DPDP Act 2023 § 6 Affirmative Consent
                    </div>
                  </div>

                  {/* Direct Consultation Card */}
                  <div className="p-4 bg-surface-container-low border border-surface-variant/40 flex flex-col justify-between">
                    <div>
                      <h4 className="font-title-editorial font-serif font-bold text-sm text-on-surface mb-1 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-secondary" /> Direct Proposals &amp; Scoping
                      </h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed mt-2">
                        Organization name, technical requirements, system scale estimates, repository access credentials, and mutual non-disclosure preferences submitted through our consultation forms.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-surface-variant/30 text-[10px] font-label-mono text-secondary font-semibold uppercase">
                      Contractual Performance Basis
                    </div>
                  </div>

                  {/* Edge Telemetry Card */}
                  <div className="p-4 bg-surface-container-low border border-surface-variant/40 flex flex-col justify-between">
                    <div>
                      <h4 className="font-title-editorial font-serif font-bold text-sm text-on-surface mb-1 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-outline" /> Edge Telemetry &amp; DDoS Defense
                      </h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed mt-2">
                        Volatile HTTP headers, masked IP addresses, browser user-agents, and latency timings captured solely to optimize TLS handshakes and prevent automated scraping or attacks.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-surface-variant/30 text-[10px] font-label-mono text-outline font-semibold uppercase">
                      Security &amp; Legitimate Interest
                    </div>
                  </div>
                </div>

                {/* DPDP Act 2023 Explicit Consent Banner */}
                <div className="p-3.5 bg-surface-container-high border-l-2 border-secondary text-xs font-label-mono space-y-1">
                  <span className="text-secondary font-bold uppercase tracking-wider block">
                    Statutory Notice on Appointment Consent (DPDP Act 2023)
                  </span>
                  <p className="text-on-surface-variant leading-relaxed">
                    When submitting the 20-minute architecture sync form, your affirmative checkmark constitutes explicit consent under the Digital Personal Data Protection Act 2023. These parameters are transmitted over 256-bit TLS to our private endpoint and used solely to prepare technical talking points and generate your calendar invitation. Data is never disclosed to commercial brokers or advertising networks.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 3 */}
            <article id="section-3" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Section 03 · Meta Cloud API Ecosystem &amp; Webhooks
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Meta WhatsApp Business Governance
              </h2>
              <div className="space-y-3 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  As an engineer implementing Meta Cloud APIs, WhatsApp Business solutions, and Instagram Graph webhooks, we adhere to Meta&apos;s Developer Data Use Policy and WhatsApp Business Messaging Policies:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                    <span><strong>Explicit Opt-In:</strong> Messages dispatched through our automation endpoints require verified user opt-in. We do not engage in unsolicited promotional broadcasting.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                    <span><strong>Webhook Payload Verification:</strong> All incoming webhooks from Meta servers are verified using HMAC-SHA256 signatures with secret rotation to eliminate spoofing.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                    <span><strong>Immediate Unsubscribe:</strong> Any WhatsApp recipient replying with &ldquo;STOP&rdquo; or &ldquo;UNSUBSCRIBE&rdquo; is immediately blacklisted from automated communication within 60 seconds.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 4 */}
            <article id="section-4" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Section 04 · Absolute Non-Training AI Guarantee
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Zero Public Model Training Guarantee
              </h2>
              <div className="p-space-md bg-surface-container-high border-l-4 border-primary space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold font-label-mono text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-5 h-5" />
                  Irrevocable Architecture Standard
                </div>
                <p className="text-on-surface text-sm sm:text-base font-serif italic">
                  &ldquo;Under no circumstances are client communications, source code excerpts, architecture documents, or inquiry messages used to train, fine-tune, or adapt public machine learning foundational models (OpenAI, Anthropic, Meta LLaMA, Google DeepMind).&rdquo;
                </p>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  All demonstrative RAG pipelines use ephemeral in-memory vector storage (FAISS / Redis) with zero persistence of user prompts beyond the runtime duration of the benchmark session.
                </p>
              </div>
            </article>

            {/* Section 5 */}
            <article id="section-5" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Section 05 · Storage, Cryptography &amp; Retention
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Cryptographic Defense &amp; Data Purging
              </h2>
              <div className="space-y-3 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  Security is not an administrative afterthought; it is integrated directly into our infrastructure:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 font-label-mono text-xs">
                  <div className="p-3 bg-surface-container-low border border-surface-variant/40">
                    <span className="text-secondary font-bold block mb-1">IN TRANSIT</span>
                    <span className="text-on-surface">TLS 1.3 enforced across all API endpoints with HSTS preloading.</span>
                  </div>
                  <div className="p-3 bg-surface-container-low border border-surface-variant/40">
                    <span className="text-secondary font-bold block mb-1">AT REST</span>
                    <span className="text-on-surface">AES-256 GCM encryption on all database volumes and cloud backup targets.</span>
                  </div>
                  <div className="p-3 bg-surface-container-low border border-surface-variant/40">
                    <span className="text-secondary font-bold block mb-1">RETENTION</span>
                    <span className="text-on-surface">Consultation logs purged after 30 days unless active enterprise contract is signed.</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 6 */}
            <article id="section-6" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Section 06 · Rights of Data Principals
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Statutory Rights Under DPDP Act &amp; GDPR
              </h2>
              <div className="space-y-3 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  Under Section 11-14 of the Indian Digital Personal Data Protection Act 2023 and Articles 15-22 of the EU GDPR, you retain unconditional rights regarding your data:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 border border-surface-variant/40 bg-surface-container-low">
                    <strong className="text-on-surface block mb-1">Right to Access &amp; Summary:</strong>
                    <span>Receive a cryptographically verified JSON export of all personal information held in our records within 7 business days.</span>
                  </div>
                  <div className="p-3 border border-surface-variant/40 bg-surface-container-low">
                    <strong className="text-on-surface block mb-1">Right to Rectification:</strong>
                    <span>Request instantaneous correction of inaccurate or incomplete corporate or contact records.</span>
                  </div>
                  <div className="p-3 border border-surface-variant/40 bg-surface-container-low">
                    <strong className="text-on-surface block mb-1">Right to Erasure (&ldquo;To Be Forgotten&rdquo;):</strong>
                    <span>Permanent deletion of all communication records and telemetry associations across our infrastructure.</span>
                  </div>
                  <div className="p-3 border border-surface-variant/40 bg-surface-container-low">
                    <strong className="text-on-surface block mb-1">Right to Nominate:</strong>
                    <span>Nominate another individual to exercise data rights on your behalf in the event of incapacity.</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 7 */}
            <article id="section-7" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Section 07 · Grievance Redressal &amp; Official Inquiries
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Contact Data Protection Officer
              </h2>
              <div className="p-space-md bg-surface-container-low border border-surface-variant/40 space-y-3 text-xs sm:text-sm text-on-surface-variant">
                <p>
                  For any privacy inquiries, data subject access requests (DSAR), or compliance audits, please address your correspondence to our Data Protection Officer:
                </p>
                <div className="font-label-mono text-xs text-on-surface space-y-1 bg-surface-container-high p-3 border border-surface-variant/60">
                  <p><strong>ATTN:</strong> Himanshu Bharti (Data Protection Officer)</p>
                  <p><strong>Designation:</strong> Software Development Engineer (Full Stack &amp; AI Systems)</p>
                  <p><strong>Location:</strong> New Delhi, NCT of Delhi, 110001, Republic of India</p>
                  <p><strong>Official Inquiries:</strong> <a href="mailto:hkbharti77@gmail.com" className="text-primary underline">hkbharti77@gmail.com</a></p>
                  <p><strong>Statutory Response Latency:</strong> Within 48 business hours</p>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  If an inquiry is unresolved, residents of India may file a grievance with the Data Protection Board of India under the DPDP Act 2023. European residents may lodge an appeal with their national Data Protection Authority (DPA).
                </p>
              </div>
            </article>
          </main>
        </div>
      </section>
    </div>
  );
}
