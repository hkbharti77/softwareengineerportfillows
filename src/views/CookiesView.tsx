import { useState, useEffect } from 'react';
import type { TabType } from '../types';
import { Cookie, ShieldCheck, Check, Sliders, ArrowLeft, Printer, Calendar, Database, EyeOff, Lock, CheckCircle2 } from 'lucide-react';
import { syncConsentToBackend, type CookiePreferences } from '../services/cookieConsentService';

const STORAGE_KEY = 'hk_portfolio_cookie_consent';

export type { CookiePreferences };

interface CookiesViewProps {
  onTabChange: (tab: TabType) => void;
  onTriggerToast?: (msg: string) => void;
}

export default function CookiesView({ onTabChange, onTriggerToast }: CookiesViewProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.preferences) return parsed.preferences;
      }
    } catch {
      // fallback
    }
    return { necessary: true, functional: true, analytics: false, marketing: false };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.preferences) {
          setPreferences(parsed.preferences);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleToggle = (cat: keyof CookiePreferences) => {
    if (cat === 'necessary') return; // Cannot toggle necessary
    setPreferences((prev) => ({ ...prev, [cat]: !prev[cat] }));
    setSavedSuccess(false);
  };

  const handleSave = () => {
    const payload = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      preferences,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }

    // Connect portfolio channel to backend cookie audit ledger
    syncConsentToBackend({
      status: 'custom',
      preferences,
      channel: 'portfolio',
      source: 'portfolio_cookies_page',
    });

    setSavedSuccess(true);
    if (onTriggerToast) {
      onTriggerToast('Cookie & Telemetry preferences successfully updated and synced.');
    }
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleAcceptAll = () => {
    const full = { necessary: true, functional: true, analytics: true, marketing: true };
    setPreferences(full);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: new Date().toISOString(), version: '1.0', preferences: full }));
    } catch {
      // ignore
    }

    // Connect portfolio channel to backend cookie audit ledger
    syncConsentToBackend({
      status: 'all',
      preferences: full,
      channel: 'portfolio',
      source: 'portfolio_cookies_page',
    });

    setSavedSuccess(true);
    if (onTriggerToast) {
      onTriggerToast('All cookie categories consented and recorded in audit ledger.');
    }
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleRejectAll = () => {
    const minimal = { necessary: true, functional: false, analytics: false, marketing: false };
    setPreferences(minimal);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: new Date().toISOString(), version: '1.0', preferences: minimal }));
    } catch {
      // ignore
    }

    // Connect portfolio channel to backend cookie audit ledger
    syncConsentToBackend({
      status: 'essential',
      preferences: minimal,
      channel: 'portfolio',
      source: 'portfolio_cookies_page',
    });

    setSavedSuccess(true);
    if (onTriggerToast) {
      onTriggerToast('Only strictly necessary cookies retained.');
    }
    setTimeout(() => setSavedSuccess(false), 4000);
  };

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
              <span className="text-secondary font-bold">Cookie Policy &amp; Storage Audit</span>
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
            Cookie Policy &amp; <br className="hidden sm:inline" />
            <span className="italic font-serif text-on-surface-variant">Local Telemetry Audit.</span>
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed mt-2">
            Disclosing browser cookies, HTML5 LocalStorage keys, zero-cross-site-fingerprinting standards, and an interactive consent management panel compliant with DPDP Act 2023 &amp; ePrivacy regulations.
          </p>

          {/* Metadata Gazette Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 mt-2 border-t border-surface-variant/30 font-label-mono text-xs">
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">Audit Cycle</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-secondary" /> October 2025 Standard
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">Tracking Model</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <EyeOff className="w-3.5 h-3.5 text-primary" /> Zero 3rd-Party Trackers
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">Storage Engine</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <Database className="w-3.5 h-3.5 text-tertiary" /> LocalStorage &amp; Session
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase text-[10px]">User Control</span>
              <span className="text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                <Sliders className="w-3.5 h-3.5 text-outline" /> Dynamic Self-Service
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Interactive Preference Center */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin pb-space-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Sidebar / Quick Links (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-space-md lg:sticky lg:top-28">
            <div className="p-space-md bg-surface-container-low border border-surface-variant/40 shadow-xs flex flex-col gap-4">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Cookie Navigation
              </span>
              <nav className="flex flex-col gap-2 font-label-technical text-xs">
                <a href="#preference-panel" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20 font-bold text-primary">
                  Interactive Preference Center ↓
                </a>
                <a href="#audit-table" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  Storage &amp; Cookie Audit Table
                </a>
                <a href="#privacy-posture" className="text-on-surface-variant hover:text-primary transition-colors py-1 border-b border-surface-variant/20">
                  Zero-Cross-Site Tracking Posture
                </a>
                <a href="#browser-controls" className="text-on-surface-variant hover:text-primary transition-colors py-1">
                  Browser-Level Eviction Controls
                </a>
              </nav>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handlePrint}
                  className="w-full py-2.5 px-3 bg-surface-container-high hover:bg-surface border border-surface-variant/60 font-label-mono text-xs text-on-surface flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-on-surface-variant" />
                  Print Cookie Audit Record
                </button>
                <button
                  onClick={() => onTabChange('privacy')}
                  className="w-full py-2 px-3 text-center text-xs font-label-mono text-on-surface-variant hover:text-primary underline cursor-pointer"
                >
                  Review Full Privacy Policy →
                </button>
                <button
                  onClick={() => onTabChange('terms')}
                  className="w-full py-2 px-3 text-center text-xs font-label-mono text-on-surface-variant hover:text-primary underline cursor-pointer"
                >
                  Review Terms of Service →
                </button>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="p-space-md bg-surface-container-low border border-primary/20 shadow-xs flex flex-col gap-2 font-label-mono text-xs">
              <span className="text-primary font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                Zero Fingerprinting Standard
              </span>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">
                We never store advertising tracking cookies or canvas fingerprinting tokens. All stored data is strictly functional to preserve your viewing aesthetics.
              </p>
            </div>
          </aside>

          {/* Main Body (8 cols) */}
          <main className="lg:col-span-8 flex flex-col gap-space-xl">
            {/* Interactive Preference Center Panel */}
            <article id="preference-panel" className="flex flex-col gap-4 scroll-mt-28 p-space-lg bg-surface-container-low border border-surface-variant/60 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-variant/40 pb-4">
                <div>
                  <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest block">
                    Interactive Control Panel
                  </span>
                  <h2 className="font-headline-md text-2xl font-serif text-on-surface mt-1">
                    Manage Your Cookie Preferences
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAcceptAll}
                    className="px-3 py-1.5 bg-primary text-on-primary font-label-mono text-xs font-bold uppercase tracking-wider hover:bg-primary-hover cursor-pointer transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-3 py-1.5 bg-surface-container-high border border-surface-variant font-label-mono text-xs text-on-surface hover:bg-surface cursor-pointer transition-colors"
                  >
                    Reject Non-Essential
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Adjust each telemetry tier to match your privacy posture. Changes take effect instantaneously across your session.
              </p>

              {/* Category 1: Strictly Necessary */}
              <div className="p-4 bg-surface border border-surface-variant/40 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-on-surface">1. Strictly Necessary Storage</span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary font-label-mono text-[10px] uppercase font-bold tracking-wider">
                      Required
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Essential for cryptographic session handshake, route navigation, and storing your consent decision. Cannot be disabled without breaking site operability.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <div className="w-10 h-6 bg-primary rounded-full p-1 cursor-not-allowed opacity-80 flex items-center justify-end">
                    <div className="w-4 h-4 bg-on-primary rounded-full" />
                  </div>
                </div>
              </div>

              {/* Category 2: Functional UI Preferences */}
              <div className="p-4 bg-surface border border-surface-variant/40 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-on-surface">2. Functional &amp; UI Preferences</span>
                    <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">
                      LocalStorage
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Remembers your Dark Mode / Light Mode choice and Focus Reading Mode activation state between visits.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <button
                    onClick={() => handleToggle('functional')}
                    className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                      preferences.functional ? 'bg-primary justify-end' : 'bg-surface-variant justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-on-primary rounded-full shadow-xs" />
                  </button>
                </div>
              </div>

              {/* Category 3: Performance & Telemetry */}
              <div className="p-4 bg-surface border border-surface-variant/40 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-on-surface">3. Performance &amp; Latency Benchmarks</span>
                    <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">
                      Aggregated
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Gathers anonymous edge CDN latency metrics and WebGL frame rates without storing personal identity or IP traces.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <button
                    onClick={() => handleToggle('analytics')}
                    className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                      preferences.analytics ? 'bg-primary justify-end' : 'bg-surface-variant justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-on-primary rounded-full shadow-xs" />
                  </button>
                </div>
              </div>

              {/* Category 4: Marketing & Meta Integrations */}
              <div className="p-4 bg-surface border border-surface-variant/40 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-on-surface">4. Meta WhatsApp &amp; Embedded Widgets</span>
                    <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">
                      Third-Party Scripts
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Controls whether external Meta Cloud WhatsApp scripts and interactive demonstration widgets are allowed to load.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <button
                    onClick={() => handleToggle('marketing')}
                    className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                      preferences.marketing ? 'bg-primary justify-end' : 'bg-surface-variant justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-on-primary rounded-full shadow-xs" />
                  </button>
                </div>
              </div>

              {/* Save Button & Confirmation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-secondary text-on-secondary font-label-mono text-xs font-bold uppercase tracking-wider hover:bg-secondary-dim cursor-pointer transition-colors shadow-xs flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save Consent Preferences
                </button>
                {savedSuccess && (
                  <span className="font-label-mono text-xs text-tertiary flex items-center gap-1.5 font-bold animate-fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    Preferences Successfully Saved to LocalStorage
                  </span>
                )}
              </div>
            </article>

            {/* Audit Table Section */}
            <article id="audit-table" className="flex flex-col gap-4 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Storage Audit · Technical Disclosures
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Exhaustive Cookie &amp; Storage Registry
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Below is the complete registry of all keys stored within your browser client during your session:
              </p>

              <div className="overflow-x-auto border border-surface-variant/40">
                <table className="w-full text-left font-label-mono text-xs">
                  <thead className="bg-surface-container-high border-b border-surface-variant/40 uppercase tracking-wider text-[11px] text-on-surface">
                    <tr>
                      <th className="p-3">Key / Cookie Name</th>
                      <th className="p-3">Storage Type</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Exact Functional Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-variant/30 text-on-surface-variant">
                    <tr className="hover:bg-surface-container-low/50">
                      <td className="p-3 text-on-surface font-bold">theme</td>
                      <td className="p-3">LocalStorage</td>
                      <td className="p-3 text-secondary font-semibold">Functional</td>
                      <td className="p-3">Persistent (1 yr)</td>
                      <td className="p-3">Saves your Dark Mode vs. Light Mode broadsheet editorial preference.</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50">
                      <td className="p-3 text-on-surface font-bold">hk_portfolio_cookie_consent</td>
                      <td className="p-3">LocalStorage</td>
                      <td className="p-3 text-primary font-semibold">Strictly Necessary</td>
                      <td className="p-3">Persistent (1 yr)</td>
                      <td className="p-3">Cryptographically stores your statutory consent selections across categories.</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50">
                      <td className="p-3 text-on-surface font-bold">hk_reading_mode</td>
                      <td className="p-3">SessionStorage</td>
                      <td className="p-3 text-secondary font-semibold">Functional</td>
                      <td className="p-3">Session Only</td>
                      <td className="p-3">Remembers distraction-free reading mode state during case study reviews.</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50">
                      <td className="p-3 text-on-surface font-bold">__cf_bm (if edge cached)</td>
                      <td className="p-3">HTTP Cookie</td>
                      <td className="p-3 text-primary font-semibold">Strictly Necessary</td>
                      <td className="p-3">30 Minutes</td>
                      <td className="p-3">Cloudflare edge bot mitigation token to shield against automated DDoS scraping.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* Zero Tracking Posture */}
            <article id="privacy-posture" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Architectural Posture
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Zero Third-Party Advertising Trackers
              </h2>
              <div className="space-y-3 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  Unlike traditional corporate websites, this engineering studio adheres to strict digital sanitation:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-surface-container-low border border-surface-variant/40">
                    <strong className="text-on-surface block mb-1">No Cross-Site Ad Beacons</strong>
                    <span>We do not embed Google AdSense, Facebook Pixel, or TikTok behavioral tracking tags.</span>
                  </div>
                  <div className="p-3 bg-surface-container-low border border-surface-variant/40">
                    <strong className="text-on-surface block mb-1">No Canvas / Audio Fingerprinting</strong>
                    <span>We do not calculate canvas hardware hashes or WebGL biometric fingerprints.</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Browser-Level Eviction Controls */}
            <article id="browser-controls" className="flex flex-col gap-3 scroll-mt-28 border-t border-surface-variant/30 pt-space-lg">
              <span className="font-label-mono text-xs text-secondary font-bold uppercase tracking-widest">
                Client-Side Controls
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-serif text-on-surface">
                Clearing Storage in Modern Browsers
              </h2>
              <div className="p-space-md bg-surface-container-low border border-surface-variant/40 space-y-3 text-xs sm:text-sm text-on-surface-variant">
                <p>
                  You can also evict all stored keys directly through your browser developer tools or settings menu:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Google Chrome &amp; Brave:</strong> Settings → Privacy &amp; Security → Site Settings → Cookies and Site Data.</li>
                  <li><strong>Mozilla Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data → Clear Data.</li>
                  <li><strong>Apple Safari:</strong> Preferences → Privacy → Manage Website Data → Remove All.</li>
                </ul>
              </div>
            </article>
          </main>
        </div>
      </section>
    </div>
  );
}
