import { getApiUrl } from './apiConfig';

export interface ContactInquestPayload {
  name: string;
  email: string;
  inquiryType: 'Full-time Role' | 'AI System Build' | 'Advisory & Consultation';
  message: string;
  ndaRequired: boolean;
  consent: boolean;
  phone?: string;
  company?: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  leadId?: string;
  duplicate?: boolean;
}

/**
 * Dispatches contact inquest to the backend lead ingestion pipeline (/api/public/contact).
 * Connects the 'portfolio' channel with deduplication, audit logging, and DPDP Act 2023 compliance.
 */
export async function submitContactInquest(payload: ContactInquestPayload): Promise<ContactSubmissionResult> {
  if (!payload.consent) {
    return {
      success: false,
      message: 'Explicit consent under India DPDP Act 2023 is mandatory before transmitting your inquest.',
    };
  }

  const endpoint = getApiUrl('/api/public/contact');

  const subject = `${payload.inquiryType} Inquest${payload.ndaRequired ? ' [Mutual NDA Requested]' : ''}`;
  const extendedMessage = payload.ndaRequired
    ? `${payload.message}\n\n---\n[STATUTORY CAVEAT]: Client requested a bilateral Mutual Non-Disclosure Agreement (NDA) prior to architecture examination.`
    : payload.message;

  const body = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone ? payload.phone.trim() : null,
    company: payload.company ? payload.company.trim() : null,
    subject,
    message: extendedMessage,
    channel: 'portfolio',
    source: 'portfolio_contact_form',
    ndaRequired: Boolean(payload.ndaRequired),
    consent: Boolean(payload.consent),
    consentVersion: 'DPDP-2023-v1',
    _hp_company: '', // Silent honeypot field against automated bot crawlers
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      return {
        success: true,
        message: data.message || 'Inquest successfully transmitted. Himanshu will respond within 24 hours.',
        leadId: data.leadId,
        duplicate: data.duplicate,
      };
    }

    return {
      success: false,
      message: data.error || 'Failed to transmit inquest. Please reach out directly to hkbharti77@gmail.com.',
    };
  } catch (err) {
    console.warn('[Contact Submission Error]:', err);
    return {
      success: false,
      message: 'Transmission network interruption. Please email hkbharti77@gmail.com directly.',
    };
  }
}
