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
 * Gracefully handles offline states without impacting UI/UX.
 */
export async function syncConsentToBackend(payload: ConsentSyncPayload): Promise<ConsentSyncResult> {
  const envBase = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
  
  // Prefer environment-configured backend, relative path for local proxy, or default localhost:5000
  const primaryEndpoint = envBase ? `${envBase}/api/public/cookie-consent` : '/api/public/cookie-consent';
  const fallbackEndpoint = 'http://localhost:5000/api/public/cookie-consent';

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
    const res = await fetch(primaryEndpoint, {
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

    // If relative endpoint returned non-200 (e.g., when not proxied), try direct localhost:5000
    if (!envBase && primaryEndpoint !== fallbackEndpoint) {
      const fallbackRes = await fetch(fallbackEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (fallbackRes.ok) {
        const data = await fallbackRes.json();
        return { success: true, id: data.id, channel: data.channel };
      }
    }

    return { success: false, offline: true };
  } catch (err) {
    // If primary network request threw (e.g. failed relative fetch), attempt fallbackEndpoint
    if (!envBase && primaryEndpoint !== fallbackEndpoint) {
      try {
        const fallbackRes = await fetch(fallbackEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (fallbackRes.ok) {
          const data = await fallbackRes.json();
          return { success: true, id: data.id, channel: data.channel };
        }
      } catch {
        // Fallback also unavailable (backend server currently offline)
      }
    }

    // Non-blocking graceful degrade
    console.debug('[Consent Ledger] Local fallback engaged (backend unavailable):', err);
    return { success: false, offline: true };
  }
}
