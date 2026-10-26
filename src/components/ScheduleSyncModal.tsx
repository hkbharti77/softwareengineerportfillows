import { useEffect, useState, type FormEvent } from 'react';
import { X, Calendar, Clock, ArrowRight, CheckCircle2, ShieldCheck, Lock, AlertCircle, RefreshCw } from 'lucide-react';
import { submitContactInquest, type ContactInquestPayload } from '../services/contactService';

interface ScheduleSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerToast: (msg: string) => void;
}

export default function ScheduleSyncModal({
  isOpen,
  onClose,
  onTriggerToast,
}: ScheduleSyncModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    preferredWindow: 'Morning IST (09:00 - 12:00)',
    preferredDate: '',
    techFocus: 'Low-Latency Voice AI & WebRTC',
    brief: '',
    ndaRequired: false,
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(2);

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    onClose();
  };

  // Auto-close popup screen after 2 seconds upon successful submission
  useEffect(() => {
    if (!isSuccess) return;

    setCountdown(2);
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    const timer = setTimeout(() => {
      handleResetAndClose();
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isSuccess]);

  // Handle modal opening/closing scroll lock and key listeners (depends ONLY on isOpen)
  useEffect(() => {
    if (isOpen) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateString = tomorrow.toISOString().split('T')[0];
      setFormData((prev) => ({
        ...prev,
        preferredDate: prev.preferredDate || dateString,
      }));
      setIsSuccess(false);
      setErrorMessage(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Please provide your name and work email.');
      return;
    }

    if (!formData.brief.trim()) {
      setErrorMessage('Please provide a brief technical context for our sync.');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('Explicit consent under India DPDP Act 2023 is mandatory.');
      return;
    }

    setIsSubmitting(true);

    const detailedMessage = `[SCHEDULED 20-MIN ARCHITECTURE SYNC REQUEST]
• Focus Domain: ${formData.techFocus}
• Preferred Date: ${formData.preferredDate || 'Earliest available'}
• Preferred Time Window: ${formData.preferredWindow}
${formData.company ? `• Organization: ${formData.company}` : ''}
${formData.phone ? `• Direct Phone: ${formData.phone}` : ''}

Architecture Brief & Discussion Goals:
${formData.brief.trim()}`;

    const payload: ContactInquestPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim() || undefined,
      phone: formData.phone.trim() || undefined,
      inquiryType: 'Advisory & Consultation',
      message: detailedMessage,
      ndaRequired: formData.ndaRequired,
      consent: formData.consent,
    };

    try {
      const res = await submitContactInquest(payload);
      if (res.success) {
        setIsSuccess(true);
        setLeadId(res.leadId || null);
        onTriggerToast('Architecture sync request dispatched directly to studio inbox.');
      } else {
        setErrorMessage(res.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      console.error('[ScheduleSyncModal] Transmission error:', err);
      setErrorMessage('Network or server error during transmission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-inverse-surface/75 backdrop-blur-md animate-fade-in overflow-hidden">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-surface text-on-surface shadow-2xl flex flex-col border border-surface-variant overflow-hidden">
        {/* Rectangular Header Bar */}
        <div className="px-6 py-4 bg-surface-container-high border-b border-surface-variant flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-secondary-container" />
            <span className="font-label-mono text-xs text-on-surface uppercase tracking-wider font-bold">
              SCHEDULE 20-MIN ARCHITECTURE SYNC
            </span>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Close scheduling modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* Success State */}
          {isSuccess ? (
            <div className="py-8 flex flex-col items-center text-center gap-5 animate-fade-in">
              <div className="w-14 h-14 bg-tertiary-fixed flex items-center justify-center border border-tertiary shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-on-tertiary-fixed" />
              </div>

              <div className="space-y-2 max-w-md">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-on-surface">
                  Architecture Sync Requested
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  Your 20-minute technical review request has been logged into the studio database. Himanshu will review your architecture brief and transmit a Google Meet calendar invitation to <strong className="text-on-surface">{formData.email}</strong> within 24 hours.
                </p>
                {leadId && (
                  <div className="pt-2 font-label-mono text-xs text-on-surface-variant">
                    Studio Reference ID: <span className="font-bold text-on-surface">{leadId}</span>
                  </div>
                )}
              </div>

              {/* Auto-Close Status Indicator */}
              <div className="flex items-center gap-2 font-label-mono text-xs text-tertiary bg-surface-container px-4 py-2 border border-surface-variant/60 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Closing window automatically in {countdown}s...</span>
              </div>

              <div className="p-4 bg-surface-container-low border border-surface-variant text-left w-full max-w-md space-y-2 text-xs font-label-mono">
                <div className="flex justify-between border-b border-surface-variant/40 pb-1.5">
                  <span className="text-on-surface-variant">Requested Window:</span>
                  <span className="text-on-surface font-semibold">{formData.preferredDate} · {formData.preferredWindow}</span>
                </div>
                <div className="flex justify-between border-b border-surface-variant/40 pb-1.5">
                  <span className="text-on-surface-variant">Focus Area:</span>
                  <span className="text-on-surface font-semibold">{formData.techFocus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Mutual NDA Status:</span>
                  <span className="text-on-surface font-semibold">{formData.ndaRequired ? 'Requested (Will be executed prior)' : 'Standard Studio Protocol'}</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="mt-2 px-6 py-2.5 bg-on-surface text-surface font-label-technical text-xs uppercase tracking-wider font-bold hover:bg-primary transition-all cursor-pointer shadow-xs"
              >
                Close Now
              </button>
            </div>
          ) : (
            /* Active Form State */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="border-b border-surface-variant/40 pb-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-on-surface font-bold leading-tight">
                  Book a 20-Minute Technical Architecture Review
                </h2>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  Direct peer-to-peer discussion on system feasibility, sub-400ms WebRTC voice pipelines, deterministic LangGraph workflows, or vector retrieval bottlenecks.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-secondary/10 border border-secondary/40 text-secondary text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-mono text-xs uppercase tracking-wider text-on-surface font-semibold">
                    Full Name <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="px-3.5 py-2.5 bg-surface-container text-xs font-label-technical text-on-surface border border-surface-variant/80 focus:outline-none focus:border-primary placeholder:text-outline"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-mono text-xs uppercase tracking-wider text-on-surface font-semibold">
                    Work Email <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="px-3.5 py-2.5 bg-surface-container text-xs font-label-technical text-on-surface border border-surface-variant/80 focus:outline-none focus:border-primary placeholder:text-outline"
                  />
                </div>
              </div>

              {/* Company & Phone (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-mono text-xs uppercase tracking-wider text-on-surface">
                    Company / Entity <span className="text-on-surface-variant text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Neural Labs"
                    className="px-3.5 py-2.5 bg-surface-container text-xs font-label-technical text-on-surface border border-surface-variant/80 focus:outline-none focus:border-primary placeholder:text-outline"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-mono text-xs uppercase tracking-wider text-on-surface">
                    Direct Phone / WhatsApp <span className="text-on-surface-variant text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="px-3.5 py-2.5 bg-surface-container text-xs font-label-technical text-on-surface border border-surface-variant/80 focus:outline-none focus:border-primary placeholder:text-outline"
                  />
                </div>
              </div>

              {/* Preferred Date & Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-mono text-xs uppercase tracking-wider text-on-surface font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-secondary-container" />
                    <span>Target Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="px-3.5 py-2.5 bg-surface-container text-xs font-label-technical text-on-surface border border-surface-variant/80 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-mono text-xs uppercase tracking-wider text-on-surface font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-secondary-container" />
                    <span>Time Slot (IST / UTC+5:30)</span>
                  </label>
                  <select
                    value={formData.preferredWindow}
                    onChange={(e) => setFormData({ ...formData, preferredWindow: e.target.value })}
                    className="px-3.5 py-2.5 bg-surface-container text-xs font-label-technical text-on-surface border border-surface-variant/80 focus:outline-none focus:border-primary"
                  >
                    <option value="Morning IST (09:00 - 12:00)">Morning IST (09:00 - 12:00)</option>
                    <option value="Afternoon IST (13:00 - 17:00)">Afternoon IST (13:00 - 17:00)</option>
                    <option value="Evening IST / US Morning (18:00 - 22:00)">Evening IST / US Morning (18:00 - 22:00)</option>
                    <option value="Flexible / Asynchronous Scheduling">Flexible / Asynchronous</option>
                  </select>
                </div>
              </div>

              {/* Technical Domain Focus */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-mono text-xs uppercase tracking-wider text-on-surface font-semibold">
                  Primary Architectural Focus
                </label>
                <select
                  value={formData.techFocus}
                  onChange={(e) => setFormData({ ...formData, techFocus: e.target.value })}
                  className="px-3.5 py-2.5 bg-surface-container text-xs font-label-technical text-on-surface border border-surface-variant/80 focus:outline-none focus:border-primary"
                >
                  <option value="Low-Latency Voice AI & WebRTC">Sub-400ms Voice AI &amp; WebRTC Audio Engine</option>
                  <option value="Multi-Agent Deterministic State Graphs">Multi-Agent Swarms &amp; LangGraph State Machines</option>
                  <option value="Hybrid Vector Retrieval & RAG">Hybrid pgvector / BM25 Dense-Sparse Search</option>
                  <option value="High-Throughput Microservices & Clean Architecture">Full-Stack Scalability &amp; Clean Architecture</option>
                  <option value="Technical Leadership / Full-Time Role Exploration">Technical Leadership / Full-Time Engineering Role</option>
                  <option value="General Engineering Advisory">General Engineering Advisory &amp; Architecture Audit</option>
                </select>
              </div>

              {/* Brief Technical Problem Statement */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-mono text-xs uppercase tracking-wider text-on-surface font-semibold">
                  Discussion Brief / Architectural Context <span className="text-secondary">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  placeholder="Outline what you are building, existing bottlenecks, throughput goals, or tech stack constraints..."
                  className="px-3.5 py-2.5 bg-surface-container text-xs font-label-technical text-on-surface border border-surface-variant/80 focus:outline-none focus:border-primary placeholder:text-outline leading-relaxed resize-none"
                />
              </div>

              {/* NDA and Statutory Consent */}
              <div className="p-3.5 bg-surface-container-low border border-surface-variant/60 space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.ndaRequired}
                    onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded-none text-primary focus:ring-0 cursor-pointer bg-surface border border-surface-variant/80 shrink-0"
                  />
                  <span className="font-label-technical text-xs text-on-surface leading-snug">
                    <span className="font-semibold">Mutual Non-Disclosure Agreement (NDA):</span> Request bilateral execution of studio NDA prior to architecture examination.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded-none text-primary focus:ring-0 cursor-pointer bg-surface border border-surface-variant/80 shrink-0"
                  />
                  <span className="font-label-technical text-xs text-on-surface leading-snug">
                    I explicitly consent to the transmission and processing of these parameters in accordance with the{' '}
                    <a
                      href="#privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary hover:underline font-semibold"
                    >
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href="#terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary hover:underline font-semibold"
                    >
                      Terms of Service
                    </a>{' '}
                    under the India Digital Personal Data Protection (DPDP) Act 2023 for calendar booking. <span className="text-secondary font-bold">*</span>
                  </span>
                </label>
              </div>

              {/* Submit Action */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 text-xs font-label-mono text-tertiary">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-bit TLS Encrypted</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-4 py-2 text-xs font-label-technical uppercase tracking-wider text-on-surface-variant hover:text-on-surface cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-container text-on-secondary-container font-label-technical text-xs uppercase tracking-wider font-bold hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Booking Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
