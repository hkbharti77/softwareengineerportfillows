import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Import compiled or source module
import {
  redactPII,
  sanitizeUrlPath,
  updateGoogleConsent,
  trackPageView,
  trackCustomEvent,
} from '../src/services/portfolioTracking.ts';

console.log('============================================================');
console.log('🧪 PORTFOLIO TELEMETRY & CONSENT VERIFICATION SUITE');
console.log('============================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
    process.exitCode = 1;
  }
}

// ── 1. Google Consent Mode v2 in index.html ──
console.log('── 1. Google Consent Mode v2 in index.html ──');

const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

runTest('index.html sets default denied on all 4 Consent Mode v2 fields', () => {
  assert.ok(indexHtml.includes("'analytics_storage': 'denied'"), 'Missing analytics_storage default denied');
  assert.ok(indexHtml.includes("'ad_storage': 'denied'"), 'Missing ad_storage default denied');
  assert.ok(indexHtml.includes("'ad_user_data': 'denied'"), 'Missing ad_user_data default denied');
  assert.ok(indexHtml.includes("'ad_personalization': 'denied'"), 'Missing ad_personalization default denied');
  assert.ok(indexHtml.includes("'wait_for_update': 500"), 'Missing wait_for_update');
});

runTest('index.html sets send_page_view: false for SPA dynamic tracking', () => {
  assert.ok(indexHtml.includes('send_page_view: false'), 'send_page_view must be false');
});

runTest('index.html includes Telemetry Consent Lifecycle Manager with saved consent check', () => {
  assert.ok(indexHtml.includes('applyConsentState'), 'Missing applyConsentState function');
  assert.ok(indexHtml.includes("localStorage.getItem('hk_portfolio_cookie_consent')"), 'Missing storage read');
  assert.ok(indexHtml.includes("addEventListener('cookie-consent-updated'"), 'Missing consent event listener');
});

// ── 2. URL Minimization & PII Sanitization ──
console.log('\n── 2. URL Minimization & PII Sanitization ──');

runTest('sanitizeUrlPath strips unauthorized query parameters completely', () => {
  const result = sanitizeUrlPath('/', '?fbclid=IwAR3x123&gclid=Cj0KCQj&trk=contact');
  assert.equal(result, '/');
});

runTest('sanitizeUrlPath retains only safe allowlisted parameters (tab, ref, source, page)', () => {
  const result = sanitizeUrlPath('/', '?tab=engineering&ref=github&utm_source=twitter&source=portfolio');
  assert.ok(result.includes('tab=engineering'), 'Should keep tab');
  assert.ok(result.includes('ref=github'), 'Should keep ref');
  assert.ok(result.includes('source=portfolio'), 'Should keep source');
  assert.ok(!result.includes('utm_source'), 'Should drop non-allowlisted utm_source');
});

runTest('sanitizeUrlPath redacts email and phone numbers in path segments', () => {
  const result = sanitizeUrlPath('/contact/john.doe@example.com/+919876543210');
  assert.ok(!result.includes('john.doe@example.com'), 'Email must be redacted');
  assert.ok(!result.includes('+919876543210'), 'Phone must be redacted');
  assert.ok(result.includes('[redacted_email]'), 'Must have [redacted_email]');
  assert.ok(result.includes('[redacted_phone]'), 'Must have [redacted_phone]');
});

runTest('sanitizeUrlPath redacts sensitive path segments (token, auth, password)', () => {
  const result = sanitizeUrlPath('/auth/token/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
  assert.ok(!result.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'), 'JWT token must be redacted');
  assert.ok(result.includes('[redacted_sensitive]'), 'Sensitive segments must be redacted');
});

// ── 3. Dynamic Consent Updates & Event Dispatching ──
console.log('\n── 3. Dynamic Consent Updates & Event Dispatching ──');

runTest('updateGoogleConsent updates window.gtag and dispatches cookie-consent-updated event', () => {
  const gtagCalls = [];
  const eventDispatched = [];

  // Mock window and gtag
  global.window = {
    gtag: (type, action, params) => {
      gtagCalls.push({ type, action, params });
    },
    dispatchEvent: (evt) => {
      eventDispatched.push(evt);
    },
  };

  updateGoogleConsent({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: false,
  });

  assert.equal(gtagCalls.length, 1);
  assert.equal(gtagCalls[0].action, 'update');
  assert.equal(gtagCalls[0].params.analytics_storage, 'granted');
  assert.equal(gtagCalls[0].params.ad_storage, 'denied');

  assert.equal(eventDispatched.length, 1);
  assert.equal(eventDispatched[0].type, 'cookie-consent-updated');
  assert.equal(eventDispatched[0].detail.preferences.analytics, true);
});

runTest('Active consent revocation sets analytics_storage to denied', () => {
  const gtagCalls = [];
  global.window = {
    gtag: (type, action, params) => {
      gtagCalls.push({ type, action, params });
    },
    dispatchEvent: () => {},
  };

  updateGoogleConsent({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  assert.equal(gtagCalls.length, 1);
  assert.equal(gtagCalls[0].params.analytics_storage, 'denied');
  assert.equal(gtagCalls[0].params.ad_storage, 'denied');
});

// ── 4. SPA Dynamic Navigation Page View Tracking ──
console.log('\n── 4. SPA Dynamic Navigation Page View Tracking ──');

runTest('trackPageView dispatches sanitized page_view event with tab metadata', () => {
  const events = [];
  global.window = {
    location: {
      origin: 'https://hkbharti77.website',
      pathname: '/',
      search: '',
    },
    gtag: (command, eventName, params) => {
      events.push({ command, eventName, params });
    },
  };

  trackPageView('engineering');

  assert.equal(events.length, 1);
  assert.equal(events[0].command, 'event');
  assert.equal(events[0].eventName, 'page_view');
  assert.equal(events[0].params.page_path, '/engineering');
  assert.equal(events[0].params.tab_name, 'engineering');
  assert.ok(events[0].params.page_title.includes('Engineering'));
  assert.equal(events[0].params.page_location, 'https://hkbharti77.website/#engineering');
});

console.log('\n============================================================');
console.log(`TOTAL: ${passedTests}/${totalTests} Tests Passed (${totalTests - passedTests} Failed)`);
console.log('============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}

