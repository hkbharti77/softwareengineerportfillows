import { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Sliders } from 'lucide-react';
import type { TabType } from '../types';
import { syncConsentToBackend, type CookiePreferences } from '../services/cookieConsentService';

const STORAGE_KEY = 'hk_portfolio_cookie_consent';

export type { CookiePreferences };

interface CookieConsentBannerProps {
  onTabChange?: (tab: TabType) => void;
}

export default function CookieConsentBanner({ onTabChange }: CookieConsentBannerProps) {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [showFloatingPill, setShowFloatingPill] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const timer = setTimeout(() => setBannerVisible(true), 1200);
        return () => clearTimeout(timer);
      } else {
        setShowFloatingPill(true);
      }
    } catch {
      setBannerVisible(true);
    }
  }, []);

  const savePreferences = (
    prefs: CookiePreferences,
    status: 'all' | 'essential' | 'custom' = 'custom'
  ) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          preferences: prefs,
          timestamp: new Date().toISOString(),
          version: 'DPDP-2023-v1',
        })
      );
    } catch {
      // ignore
    }

    // Connect portfolio channel to backend cookie audit ledger
    syncConsentToBackend({
      status,
      preferences: prefs,
      channel: 'portfolio',
      source: 'portfolio_cookie_banner',
    });

    setBannerVisible(false);
    setShowFloatingPill(true);
  };

  const handleAcceptAll = () => {
    savePreferences({ necessary: true, functional: true, analytics: true, marketing: true }, 'all');
  };

  const handleNecessaryOnly = () => {
    savePreferences({ necessary: true, functional: false, analytics: false, marketing: false }, 'essential');
  };

  return (
    <>
      {/* ─── Bottom Floating Broadsheet Banner ─── */}
      {bannerVisible && (
        <aside
          role="dialog"
          aria-label="Statutory Cookie & Privacy Consent"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 bg-surface text-on-surface shadow-2xl border border-surface-variant p-space-md sm:p-space-lg animate-fade-in"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-surface-container-high border border-surface-variant/80 flex items-center justify-center shrink-0 text-primary">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary font-bold">
                  DPDP Act 2023 &amp; Statutory Notice
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
              </div>
              <h3 className="font-title-editorial text-base sm:text-lg font-serif font-bold text-on-surface">
                Privacy &amp; Cookie Consent
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                We use strictly necessary telemetry for security, CSRF protection, and dark/light theme persistence. We do{' '}
                <strong className="text-on-surface font-semibold">NOT</strong> track cross-site activity or train public AI models on your interactions.
              </p>

              <div className="flex items-center gap-2 pt-2 text-[11px] font-label-mono text-outline">
                <button
                  type="button"
                  onClick={() => onTabChange?.('privacy')}
                  className="hover:text-primary underline cursor-pointer"
                >
                  Privacy Policy Page
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => onTabChange?.('terms')}
                  className="hover:text-primary underline cursor-pointer"
                >
                  Terms of Service Page
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => onTabChange?.('cookies')}
                  className="hover:text-primary underline cursor-pointer"
                >
                  Cookie Audit
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-surface-variant/40">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 bg-primary text-on-primary font-label-technical text-xs uppercase tracking-wider font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleNecessaryOnly}
                  className="px-3 py-1.5 bg-surface-container-high text-on-surface hover:bg-inverse-surface hover:text-inverse-on-surface transition-all font-label-technical text-xs uppercase tracking-wider cursor-pointer"
                >
                  Necessary Only
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange?.('cookies')}
                  className="px-2.5 py-1.5 text-on-surface-variant hover:text-on-surface font-label-technical text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Customize on Page →</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* ─── Persistent Re-Open Floating Pill (Navigates directly to full Cookies Page) ─── */}
      {showFloatingPill && !bannerVisible && (
        <button
          type="button"
          onClick={() => onTabChange?.('cookies')}
          title="Cookie & Privacy Preferences Page"
          aria-label="Cookie & Privacy Preferences Page"
          className="fixed bottom-4 left-4 z-40 px-3 py-1.5 bg-surface-container-high/90 hover:bg-surface text-on-surface text-xs font-label-mono uppercase tracking-wider shadow-md border border-surface-variant flex items-center gap-2 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span className="hidden sm:inline">Cookie Settings</span>
        </button>
      )}
    </>
  );
}
