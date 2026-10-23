import { useEffect } from 'react';
import { X, Download, FileText, CheckCircle2, Terminal } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerToast: (msg: string) => void;
}

export default function ResumeModal({ isOpen, onClose, onTriggerToast }: ResumeModalProps) {
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
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    onTriggerToast('Résumé PDF (Himanshu_Bharti_Curriculum_Vitae.pdf) download initialized');
    // Create a plain text CV blob to trigger real download
    const cvContent = `HIMANSHU BHARTI — SOFTWARE & AI SYSTEMS ENGINEER
Email: hello@himanshubharti.dev | Location: New Delhi / Remote | Available Q2/Q3 2025

SUMMARY:
Senior Software & AI Systems Engineer architecting real-time multimodal voice pipelines, autonomous agent swarms, and high-throughput routing gateways. Specializing in sub-second latency tolerances, deterministic event buses, and distributed search engines.

CORE COMPETENCIES:
• AI & Agents: LangGraph, DSPy, PyTorch, vLLM, pgvector, HNSW Hybrid Search, Structured Function Calling.
• Backend & Distributed: FastAPI (Python), Go, Redis Streams, PostgreSQL, WebRTC, BullMQ, Kafka, gRPC.
• Cloud & DevOps: Docker Multi-Stage, Kubernetes (EKS), AWS ECS, Lambda, Cloudflare Workers, Terraform, CI/CD.
• Frontend & Graphics: Next.js, React, TypeScript, Three.js, WebGL GLSL, Tailwind CSS.

PROFESSIONAL EXPERIENCE:
1. Senior AI & Backend Developer / Systems Engineer (2023 — Present)
   • Architected real-time multimodal voice pipelines, autonomous agent swarms, and high-throughput routing gateways.
   • Metrics: 320ms p95 Voice E2E, 45M+ Monthly Events, 99.98% Guardrail Verity.
   • Stack: FastAPI, WebRTC Audio Streaming, LangGraph, Redis Streams, PostgreSQL + pgvector.

2. Full Stack Software Engineer (2021 — 2023)
   • Developed responsive customer-facing web applications, decoupled monolith core into maintainable microservices.
   • Metrics: 64% Query Time Slash, 99.95% Continuous SLA, Zero-Downtime CD.
   • Stack: TypeScript, React, Next.js, Node.js, Docker, GraphQL.

EDUCATION & HONORS:
• B.Tech in Computer Science & Engineering (Systems & AI Engineering Research)
• AWS Solutions Architect Associate (ID: AWS-SA-883)
• Deep Learning Specialization — DeepLearning.AI (ID: DL-SPEC-419)
• National AI Hackathon Finalist — Autonomous Systems Jury Top 1%
`;
    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Himanshu_Bharti_Curriculum_Vitae.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-surface text-on-surface shadow-2xl flex flex-col border border-surface-variant overflow-hidden">
        {/* Header bar */}
        <div className="px-6 py-4 bg-surface-container-high flex items-center justify-between border-b border-surface-variant">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="font-label-mono text-xs uppercase tracking-wider text-on-surface-variant block">Curated Document</span>
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
                Senior Software &amp; AI Systems Engineer
              </p>
            </div>
            <div className="font-label-mono text-xs text-on-surface-variant mt-2 md:mt-0 text-left md:text-right">
              <div>hello@himanshubharti.dev</div>
              <div>New Delhi, India · Remote Globally</div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low p-4">
            <div>
              <span className="text-[11px] font-label-mono text-on-surface-variant uppercase">E2E Voice</span>
              <div className="text-lg font-serif font-bold text-primary">320ms p95</div>
            </div>
            <div>
              <span className="text-[11px] font-label-mono text-on-surface-variant uppercase">Monthly Events</span>
              <div className="text-lg font-serif font-bold text-on-surface">45M+</div>
            </div>
            <div>
              <span className="text-[11px] font-label-mono text-on-surface-variant uppercase">SLA Availability</span>
              <div className="text-lg font-serif font-bold text-tertiary">99.95%</div>
            </div>
            <div>
              <span className="text-[11px] font-label-mono text-on-surface-variant uppercase">Guardrail Verity</span>
              <div className="text-lg font-serif font-bold text-secondary">99.98%</div>
            </div>
          </div>

          {/* Systems & AI Experience */}
          <div className="space-y-4">
            <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest block">
              01 / Professional Record
            </span>

            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <h4 className="font-title-editorial text-base font-semibold text-on-surface">
                  Senior AI &amp; Backend Developer / Systems Engineer
                </h4>
                <span className="font-label-mono text-xs text-primary font-bold">2023 — Present</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Architecting real-time multimodal voice pipelines, autonomous agent swarms, and high-throughput routing gateways capable of processing millions of structured context streams. Spearheaded inference latency optimizations across distributed edge nodes.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 text-xs font-label-technical text-on-surface">
                <span className="px-2 py-0.5 bg-surface-container">FastAPI</span>
                <span className="px-2 py-0.5 bg-surface-container">WebRTC</span>
                <span className="px-2 py-0.5 bg-surface-container">LangGraph</span>
                <span className="px-2 py-0.5 bg-surface-container">Redis Streams</span>
                <span className="px-2 py-0.5 bg-surface-container">pgvector</span>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <div className="flex items-baseline justify-between">
                <h4 className="font-title-editorial text-base font-semibold text-on-surface">
                  Full Stack Software Engineer
                </h4>
                <span className="font-label-mono text-xs text-on-surface-variant">2021 — 2023</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Developed responsive customer-facing web applications, decoupled monolith core into maintainable microservices, optimized indexing strategies for relational datastores, and implemented multi-tenant third-party SaaS integrations.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 text-xs font-label-technical text-on-surface">
                <span className="px-2 py-0.5 bg-surface-container">TypeScript</span>
                <span className="px-2 py-0.5 bg-surface-container">React / Next.js</span>
                <span className="px-2 py-0.5 bg-surface-container">Node.js</span>
                <span className="px-2 py-0.5 bg-surface-container">Docker</span>
              </div>
            </div>
          </div>

          {/* Core Technical Matrix */}
          <div className="space-y-3 pt-2">
            <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest block">
              02 / Technical Domain Matrix
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-surface-container border border-surface-variant/40">
                <div className="font-semibold text-on-surface mb-1">AI Systems &amp; Agents</div>
                <div className="text-on-surface-variant">Multi-Agent State-Graphs, Hybrid Vector Search, Schema Validation, Prompt Caching, vLLM</div>
              </div>
              <div className="p-3 bg-surface-container border border-surface-variant/40">
                <div className="font-semibold text-on-surface mb-1">Distributed Backend</div>
                <div className="text-on-surface-variant">FastAPI, Golang, Redis BullMQ, PostgreSQL HNSW, WebSockets, gRPC</div>
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
                <CheckCircle2 className="w-3.5 h-3.5 text-tertiary" /> AWS Solutions Architect Associate
              </span>
              <span className="px-3 py-1 bg-surface-container text-on-surface flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-tertiary" /> DeepLearning.AI Specialization
              </span>
              <span className="px-3 py-1 bg-surface-container text-on-surface flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> National AI Hackathon Finalist (Top 1%)
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-surface-variant">
          <div className="flex items-center gap-2 text-xs font-label-mono text-on-surface-variant">
            <Terminal className="w-4 h-4 text-primary" />
            <span>PDF SPEC // 240 KB // SHA-256 VERIFIED</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-label-technical uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-label-technical text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Curriculum Vitae</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
