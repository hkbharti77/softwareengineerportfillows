import type { TabType } from '../types';
import type { CookiePreferences } from './cookieConsentService';

// Allowlisted query parameters for portfolio analytics
const ALLOWED_QUERY_KEYS = new Set(['tab', 'ref', 'source', 'page']);

// PII & sensitive identifiers
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const UUID_REGEX = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;
const HEX_TOKEN_REGEX = /\b[0-9a-fA-F]{24,64}\b/g;
const PHONE_INTL_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
const PHONE_IN_REGEX = /(?:\+?91[-.\s]?)?[6-9]\d{9}\b/g;
const CARD_NUM_REGEX = /\b(?:\d{4}[-\s]?){3}\d{1,4}\b|\b\d{13,19}\b/g;
const BASE64_TOKEN_REGEX = /\b[A-Za-z0-9+/=]{28,}\b/g;

// Sensitive path keywords to prevent credential or token leaks
const SENSITIVE_PATH_KEYWORDS = /(?:password|secret|token|bearer|apikey|api_key|credential|auth|session|ssn|aadhaar|pan|license)/i;

/**
 * Redacts personal data, phone numbers, tokens, and credentials from string payloads.
 */
export function redactPII(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(EMAIL_REGEX, '[redacted_email]')
    .replace(UUID_REGEX, '[redacted_id]')
    .replace(HEX_TOKEN_REGEX, '[redacted_token]')
    .replace(BASE64_TOKEN_REGEX, '[redacted_token]')
    .replace(CARD_NUM_REGEX, '[redacted_num]')
    .replace(PHONE_INTL_REGEX, '[redacted_phone]')
    .replace(PHONE_IN_REGEX, '[redacted_phone]');
}

/**
 * Validates individual query values against strict semantic schemas
 */
function isSafeQueryValue(key: string, val: string): boolean {
  if (typeof val !== 'string' || !val) return false;
  const trimmed = val.trim();
  if (trimmed.length > 48) return false;

  if (SENSITIVE_PATH_KEYWORDS.test(trimmed)) return false;
  if (/[:;@%<>{}[\]\\^`~|]/.test(trimmed)) return false;

  switch (key) {
    case 'page':
      return /^\d{1,4}$/.test(trimmed);
    case 'tab':
    case 'ref':
    case 'source':
      return /^[a-zA-Z0-9_-]{1,48}$/.test(trimmed);
    default:
      return false;
  }
}

/**
 * Enforces strict multi-tier data minimization for portfolio URLs:
 * 1. Path segment sanitization and traversal prevention
 * 2. Strict query allowlisting with value sanitization
 * 3. Safe hash normalization
 */
export function sanitizeUrlPath(pathname: string, search = '', hash = ''): string {
  if (!pathname || typeof pathname !== 'string') pathname = '/';

  const rawSegments = pathname
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/')
    .split('/')
    .filter(Boolean);

  const cleanSegments = rawSegments.map((segment) => {
    if (SENSITIVE_PATH_KEYWORDS.test(segment)) {
      return '[redacted_sensitive]';
    }
    return redactPII(segment);
  });

  const safePathname = '/' + cleanSegments.join('/');

  let safeSearch = '';
  if (search) {
    try {
      const params = new URLSearchParams(search);
      const cleanParams = new URLSearchParams();

      for (const [key, val] of params.entries()) {
        const lowerKey = key.toLowerCase();
        if (ALLOWED_QUERY_KEYS.has(lowerKey) && isSafeQueryValue(lowerKey, val)) {
          cleanParams.set(lowerKey, redactPII(val.trim()));
        }
      }

      const qs = cleanParams.toString();
      if (qs) safeSearch = `?${qs}`;
    } catch {
      safeSearch = '';
    }
  }

  let safeHash = '';
  if (hash) {
    const rawHash = hash.replace(/^#/, '').split('?')[0];
    const cleanHash = redactPII(rawHash).replace(/[^a-zA-Z0-9_-]/g, '');
    if (cleanHash) safeHash = `#${cleanHash}`;
  }

  return `${safePathname}${safeSearch}${safeHash}`;
}

const TAB_TITLES: Record<TabType, string> = {
  work: 'Selected Works & Case Studies | Himanshu Bharti',
  engineering: 'Deep Systems & AI Engineering | Himanshu Bharti',
  experience: 'Background, Dossier & Inquest | Himanshu Bharti',
  blog: 'Engineering Dispatches & Architecture Notes | Himanshu Bharti',
  pricing: 'Advisory & Systems Build Rates | Himanshu Bharti',
  about: 'Bio & Systems Philosophy | Himanshu Bharti',
  contact: 'Schedule Technical Inquest | Himanshu Bharti',
  privacy: 'Statutory Privacy Policy | Himanshu Bharti',
  terms: 'Terms of Engineering Engagement | Himanshu Bharti',
  cookies: 'Statutory Cookie Audit & Preferences | Himanshu Bharti',
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Updates Google Consent Mode v2 signals dynamically
 */
export function updateGoogleConsent(prefs: CookiePreferences): void {
  if (typeof window === 'undefined') return;

  const hasAnalytics = Boolean(prefs.analytics);
  const hasMarketing = Boolean(prefs.marketing);

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: hasAnalytics ? 'granted' : 'denied',
      ad_storage: hasMarketing ? 'granted' : 'denied',
      ad_user_data: hasMarketing ? 'granted' : 'denied',
      ad_personalization: hasMarketing ? 'granted' : 'denied',
    });
  }

  // Dispatch custom event for widgets and page scripts
  window.dispatchEvent(
    new CustomEvent('cookie-consent-updated', {
      detail: { preferences: prefs },
    })
  );
}

/**
 * Tracks single-page application tab transitions as clean GA4 page_view events
 */
export function trackPageView(tab: TabType): void {
  if (typeof window === 'undefined') return;

  const title = TAB_TITLES[tab] || document.title;
  const canonicalPath = '/' + (tab === 'work' ? '' : tab);
  const sanitizedPath = sanitizeUrlPath(
    window.location.pathname,
    window.location.search,
    `#${tab}`
  );
  const pageLocation = `${window.location.origin}${sanitizedPath}`;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_location: pageLocation,
      page_path: canonicalPath,
      tab_name: tab,
    });
  }
}

/**
 * Tracks custom user interactions (modals, downloads, engagement) with sanitized metadata
 */
export function trackCustomEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const sanitizedParams: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      sanitizedParams[key] = redactPII(value.slice(0, 100));
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitizedParams[key] = value;
    }
  }

  window.gtag('event', eventName, sanitizedParams);
}

