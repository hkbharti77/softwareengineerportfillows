import { useEffect, useState } from 'react';
import { X, Download, FileText, CheckCircle2, Terminal, ExternalLink, RefreshCw } from 'lucide-react';
import {
  fetchResumeMetadata,
  downloadResumeViaApi,
  getResumeViewEndpoint,
  ResumeMetadata,
} from '../services/resumeService';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerToast: (msg: string) => void;
}

export default function ResumeModal({ isOpen, onClose, onTriggerToast }: ResumeModalProps) {
  const [metadata, setMetadata] = useState<ResumeMetadata | null>(null);
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setLoadingMetadata(true);
      fetchResumeMetadata()
        .then((data) => setMetadata(data))
        .catch((err) => console.error('[ResumeModal] Failed to fetch resume metadata from API:', err))
        .finally(() => setLoadingMetadata(false));
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadResumeViaApi(onTriggerToast, metadata?.resumeFileName);
    } catch (err: any) {
      console.error('[ResumeModal] Download error:', err);
      onTriggerToast?.('Error downloading resume from API.');
    } finally {
      setDownloading(false);
    }
  };

  const viewUrl = getResumeViewEndpoint();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface text-on-surface shadow-2xl flex flex-col border border-surface-variant overflow-hidden">
        {/* Header bar */}
        <div className="px-6 py-4 bg-surface-container-high flex items-center justify-between border-b border-surface-variant">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-mono text-xs uppercase tracking-wider text-on-surface-variant block">Curated Document</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  API Synced
                </span>
              </div>
              <h3 className="font-title-editorial text-lg text-on-surface font-semibold">Himanshu Bharti — Curriculum Vitae</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-sm">
          {/* Topline summary */}
          <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-surface-variant pb-4">
            <div>
              <h2 className="text-2xl font-serif text-on-surface font-semibold">Himanshu Bharti</h2>
              <p className="font-label-mono text-xs text-primary font-bold uppercase tracking-wider mt-0.5">
                Software Development Engineer (Full Stack &amp; AI)
              </p>
            </div>
            <div className="font-label-mono text-xs text-on-surface-variant mt-2 md:mt-0 text-left md:text-right">
              <div>hkbharti77@gmail.com</div>
              <div>+91 7050047159 · New Delhi, India</div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low p-4">
            <div>
              <span className="text-[11px] font-label-mono text-on-surface-variant uppercase">E2E Voice</span>
              <div className="text-lg font-serif font-bold text-primary">&lt;600ms</div>
            </div>
            <div>
              <span className="text-[11px] font-label-mono text-on-surface-variant uppercase">Daily Requests</span>
              <div className="text-lg font-serif font-bold text-on-surface">15k+</div>
            </div>
            <div>
              <span className="text-[11px] font-label-mono text-on-surface-variant uppercase">SLA Availability</span>
              <div className="text-lg font-serif font-bold text-tertiary">99.5%</div>
            </div>
            <div>
              <span className="text-[11px] font-label-mono text-on-surface-variant uppercase">Retrieval Accuracy</span>
              <div className="text-lg font-serif font-bold text-secondary">90%+</div>
            </div>
          </div>

          {/* Systems & AI Experience */}
          <div className="space-y-4">
            <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest block">
              01 / Professional Record
            </span>

            {/* Mobiloitte Technologies */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <div>
                  <h4 className="font-title-editorial text-base font-semibold text-on-surface">
                    Software Development Engineer (Full-Stack &amp; AI)
                  </h4>
                  <span className="font-label-mono text-xs text-secondary font-bold">Mobiloitte Technologies · New Delhi, India</span>
                </div>
                <span className="font-label-mono text-xs text-primary font-bold">May 2025 — Present</span>
              </div>
              <ul className="text-on-surface-variant leading-relaxed list-disc list-inside space-y-1 text-xs pt-1">
                <li>Engineered and deployed cross-platform conversational AI bots across 5 channels (WhatsApp, Telegram, Instagram, Slack, Web Chat) using FastAPI and Hybrid RAG, reducing query latency by 30%.</li>
                <li>Architected real-time AI Voice Calling Agents and IVR Systems integrating Deepgram (STT) and ElevenLabs (TTS) over WebSockets with &lt; 600ms turnaround and 95%+ call completion rate.</li>
                <li>Built an enterprise Omnichannel Live Agent Handoff Product across 4 messaging platforms with full rich media support, cutting customer ticket resolution time by 25%.</li>
                <li>Implemented Meta WhatsApp Cloud API and Meta Embedded Signup workflows, automating 1-click WABA onboarding for 10+ enterprise client accounts.</li>
                <li>Designed tenant-isolated data architectures across PostgreSQL, MongoDB, and Redis distributed caching; containerized microservices via Docker for 15k+ daily requests with 99.5% uptime.</li>
              </ul>
              <div className="flex flex-wrap gap-1.5 pt-2 text-xs font-label-technical text-on-surface">
                <span className="px-2 py-0.5 bg-surface-container">FastAPI</span>
                <span className="px-2 py-0.5 bg-surface-container">Hybrid RAG</span>
                <span className="px-2 py-0.5 bg-surface-container">Meta WhatsApp Cloud API</span>
                <span className="px-2 py-0.5 bg-surface-container">Deepgram &amp; ElevenLabs</span>
                <span className="px-2 py-0.5 bg-surface-container">Docker</span>
                <span className="px-2 py-0.5 bg-surface-container">Redis</span>
                <span className="px-2 py-0.5 bg-surface-container">PostgreSQL</span>
              </div>
            </div>

            {/* QSpiders */}
            <div className="space-y-1 pt-3 border-t border-surface-variant/40">
              <div className="flex items-baseline justify-between">
                <div>
                  <h4 className="font-title-editorial text-base font-semibold text-on-surface">
                    Full Stack Developer Intern
                  </h4>
                  <span className="font-label-mono text-xs text-secondary font-bold">QSpiders · Noida, India</span>
                </div>
                <span className="font-label-mono text-xs text-on-surface-variant">Aug 2024 — Apr 2025</span>
              </div>
              <ul className="text-on-surface-variant leading-relaxed list-disc list-inside space-y-1 text-xs pt-1">
                <li>Developed 8+ backend RESTful APIs using Java and Spring Boot, implementing layered MVC architecture and reducing API response times by 20%.</li>
                <li>Designed and optimized normalized relational database schemas across 12+ tables in MySQL, improving complex join query execution speed by 25% through strategic indexing.</li>
                <li>Built 8+ reusable UI components and client interfaces using React and Vite with &lt; 2s page load times.</li>
                <li>Authored 30+ unit and integration test cases in JUnit and automated Postman test suites, achieving 80%+ test coverage.</li>
              </ul>
              <div className="flex flex-wrap gap-1.5 pt-2 text-xs font-label-technical text-on-surface">
                <span className="px-2 py-0.5 bg-surface-container">Java</span>
                <span className="px-2 py-0.5 bg-surface-container">Spring Boot</span>
                <span className="px-2 py-0.5 bg-surface-container">MySQL</span>
                <span className="px-2 py-0.5 bg-surface-container">React &amp; Vite</span>
                <span className="px-2 py-0.5 bg-surface-container">JUnit</span>
              </div>
            </div>
          </div>

          {/* Education Record */}
          <div className="space-y-3 pt-2">
            <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest block">
              02 / Education &amp; Academic Honors
            </span>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-surface-container border border-surface-variant/40 flex justify-between items-start">
                <div>
                  <div className="font-semibold text-on-surface">Bachelor of Technology (B.Tech) — Electronics &amp; Communication Engineering</div>
                  <div className="text-on-surface-variant">Bihar Engineering University · Bihar, India</div>
                </div>
                <div className="text-right font-label-mono">
                  <span className="text-primary font-bold">CGPA: 7.8 / 10</span>
                  <div className="text-on-surface-variant">2020 — 2024</div>
                </div>
              </div>

              <div className="p-3 bg-surface-container border border-surface-variant/40 flex justify-between items-start">
                <div>
                  <div className="font-semibold text-on-surface">Class XII (Senior Secondary) — Science (PCM)</div>
                  <div className="text-on-surface-variant">R.M. College (BSEB) · Saharsa, Bihar, India</div>
                </div>
                <div className="text-right font-label-mono">
                  <span className="text-secondary font-bold">Percentage: 68%</span>
                  <div className="text-on-surface-variant">2018 — 2020</div>
                </div>
              </div>

              <div className="p-3 bg-surface-container border border-surface-variant/40 flex justify-between items-start">
                <div>
                  <div className="font-semibold text-on-surface">Class X (Secondary School Certificate)</div>
                  <div className="text-on-surface-variant">St. Xavier’s School · Saharsa, Bihar, India</div>
                </div>
                <div className="text-right font-label-mono">
                  <span className="text-tertiary font-bold">CGPA: 9.4 / 10</span>
                  <div className="text-on-surface-variant">2018</div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2 pt-2">
            <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest block">
              03 / Digital Seals &amp; Verification
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-label-mono">
              <span className="px-3 py-1 bg-surface-container text-on-surface flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Salesforce Superbadges: Apex Specialist &amp; Process Automation
              </span>
              <span className="px-3 py-1 bg-surface-container text-on-surface flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-tertiary" /> Cisco CyberOps Associate (2024)
              </span>
              <span className="px-3 py-1 bg-surface-container text-on-surface flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> Cisco CCNAv7: Intro to Networks (2023)
              </span>
              <span className="px-3 py-1 bg-surface-container text-on-surface flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Meta Tech Provider &amp; WhatsApp Cloud API Specialist
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3.5 bg-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-surface-variant">
          {/* File Spec & Live Status */}
          <div className="flex items-center gap-2 text-xs font-label-mono text-on-surface-variant min-w-0 w-full sm:w-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-on-surface truncate max-w-[200px] sm:max-w-xs" title={metadata?.resumeFileName || 'Himanshu_Bharti_Resume.pdf'}>
              {metadata?.resumeFileName || 'Himanshu_Bharti_Resume.pdf'}
            </span>
            <span className="text-on-surface-variant/40 shrink-0">·</span>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-surface border border-surface-variant/60 rounded text-on-surface-variant shrink-0">
              {metadata?.resumeFileSize ? `${(metadata.resumeFileSize / 1024).toFixed(0)} KB` : 'PDF'}
            </span>
            <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-1.5 py-0.5 rounded shrink-0 hidden md:inline">
              Live API
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end shrink-0">
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-label-technical font-semibold uppercase tracking-wider text-on-surface hover:text-primary transition-all border border-surface-variant/80 hover:border-primary/50 bg-surface shadow-2xs whitespace-nowrap cursor-pointer"
              title="Open raw PDF document in browser"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span>Preview</span>
            </a>

            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-label-technical uppercase tracking-wider text-on-surface-variant hover:text-on-surface hover:bg-surface border border-transparent hover:border-surface-variant transition-colors whitespace-nowrap cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 bg-primary text-on-primary font-label-technical text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-all shadow-sm cursor-pointer whitespace-nowrap disabled:opacity-70"
            >
              {downloading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
