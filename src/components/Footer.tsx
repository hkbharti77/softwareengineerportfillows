import type { TabType } from '../types';

interface FooterProps {
  onTabChange?: (tab: TabType) => void;
  onOpenResume?: () => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xl border-t border-surface-variant/40">
      <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-xl flex flex-col gap-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          {/* Identity col */}
          <div className="md:col-span-5 flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="h-7 w-7 bg-surface-container-high border border-surface-variant/80 flex items-center justify-center font-serif text-sm font-bold text-on-surface">
                HB
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface font-serif text-xl">
                Himanshu Bharti
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md leading-relaxed">
              Architecting cognitive AI workflows, high-precision graphics computing, and refined digital experiences with physical studio realism.
            </p>
          </div>

          {/* Chronometry & Engine col */}
          <div className="md:col-span-4 flex flex-col gap-space-xs">
            <span className="font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">
              Studio Chronometry &amp; Engine
            </span>
            <div className="flex items-center gap-space-xs font-label-technical text-xs text-on-surface">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span>IST (UTC+5:30) · Available for Strategic Engagements</span>
            </div>
            <p className="font-label-mono text-xs text-on-surface-variant mt-space-xs">
              Built with Next.js, React, TypeScript &amp; WebGL
            </p>
          </div>

          {/* Network links col */}
          <div className="md:col-span-3 flex flex-col gap-space-xs">
            <span className="font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">
              Index &amp; Network
            </span>
            <div className="flex flex-wrap gap-x-space-md gap-y-space-xs font-label-technical text-xs">
              <button
                onClick={() => onTabChange?.('blog')}
                className="text-on-surface-variant hover:text-on-surface uppercase tracking-wider transition-colors cursor-pointer text-left"
              >
                Dispatches
              </button>
              <button
                onClick={() => onTabChange?.('pricing')}
                className="text-on-surface-variant hover:text-on-surface uppercase tracking-wider transition-colors cursor-pointer text-left"
              >
                Pricing
              </button>
              <a
                className="text-on-surface-variant hover:text-on-surface uppercase tracking-wider transition-colors"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                className="text-on-surface-variant hover:text-on-surface uppercase tracking-wider transition-colors"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <button
                onClick={() => onTabChange?.('contact')}
                className="text-on-surface-variant hover:text-on-surface uppercase tracking-wider transition-colors cursor-pointer text-left"
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Bottom imprint */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-space-lg border-t border-surface-variant/40 font-label-mono text-xs text-on-surface-variant">
          <p>© 2025 Himanshu Bharti. All rights reserved.</p>
          <p className="tracking-widest uppercase mt-2 sm:mt-0">Curated Broadsheet Edition · Vol. 04</p>
        </div>
      </div>
    </footer>
  );
}
