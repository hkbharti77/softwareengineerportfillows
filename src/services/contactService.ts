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

  const envBase = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
  const primaryEndpoint = envBase ? `${envBase}/api/public/contact` : '/api/public/contact';
  const fallbackEndpoint = 'http://localhost:5000/api/public/contact';

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
    const res = await fetch(primaryEndpoint, {
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

    // If relative endpoint returned non-200 and no custom backend base set, attempt localhost:5000 fallback
    if (!envBase && primaryEndpoint !== fallbackEndpoint) {
      const fallbackRes = await fetch(fallbackEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const fallbackData = await fallbackRes.json().catch(() => ({}));

      if (fallbackRes.ok) {
        return {
          success: true,
          message: fallbackData.message || 'Inquest successfully transmitted to studio inbox.',
          leadId: fallbackData.leadId,
          duplicate: fallbackData.duplicate,
        };
      }

      if (fallbackData.error) {
        return { success: false, message: fallbackData.error };
      }
    }

    return {
      success: false,
      message: data.error || 'Failed to transmit inquest. Please reach out directly to hkbharti77@gmail.com.',
    };
  } catch (err) {
    // If primary network request threw, attempt direct localhost:5000
    if (!envBase && primaryEndpoint !== fallbackEndpoint) {
      try {
        const fallbackRes = await fetch(fallbackEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const fallbackData = await fallbackRes.json().catch(() => ({}));

        if (fallbackRes.ok) {
          return {
            success: true,
            message: fallbackData.message || 'Inquest successfully transmitted to studio inbox.',
            leadId: fallbackData.leadId,
            duplicate: fallbackData.duplicate,
          };
        }

        if (fallbackData.error) {
          return { success: false, message: fallbackData.error };
        }
      } catch {
        // Fallback unavailable
      }
    }

    console.warn('[Contact Submission Error]:', err);
    return {
      success: false,
      message: 'Transmission network interruption. Please email hkbharti77@gmail.com directly.',
    };
  }
}
