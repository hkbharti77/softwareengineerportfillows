import { getApiUrl } from './apiConfig';

export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentSyncPayload {
  status: 'all' | 'essential' | 'rejected' | 'custom';
  preferences: CookiePreferences;
  channel?: string;
  source?: string;
}

export interface ConsentSyncResult {
  success: boolean;
  id?: string;
  channel?: string;
  offline?: boolean;
}

/**
 * Dispatches cookie consent telemetry to the backend audit ledger.
 * Connects the 'portfolio' channel with DPDP Act 2023 & GDPR Art. 6 compliance tracking.
 * Base URL is resolved strictly from environment variables.
 */
export async function syncConsentToBackend(payload: ConsentSyncPayload): Promise<ConsentSyncResult> {
  const endpoint = getApiUrl('/api/public/cookie-consent');

  const body = {
    status: payload.status,
    preferences: {
      necessary: true,
      functional: Boolean(payload.preferences.functional),
      analytics: Boolean(payload.preferences.analytics),
      marketing: Boolean(payload.preferences.marketing),
    },
    channel: 'portfolio',
    source: payload.source || 'portfolio_cookie_banner',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    language: typeof navigator !== 'undefined' ? navigator.language : null,
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    pageUrl: typeof window !== 'undefined' ? window.location.href : null,
    consentVersion: '2.0',
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, id: data.id, channel: data.channel };
    }

    return { success: false, offline: true };
  } catch {
    return { success: false, offline: true };
  }
}
