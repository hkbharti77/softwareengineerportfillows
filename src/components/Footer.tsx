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
              Software Development Engineer (Full Stack &amp; AI) specializing in production RAG systems, high-concurrency distributed backends, and Meta Cloud API ecosystems.
            </p>
          </div>

          {/* Chronometry & Engine col */}
          <div className="md:col-span-4 flex flex-col gap-space-xs">
            <span className="font-label-mono text-xs uppercase tracking-widest text-on-surface-variant">
              Studio Chronometry &amp; Engine
            </span>
            <div className="flex items-center gap-space-xs font-label-technical text-xs text-on-surface">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span>New Delhi, India (IST UTC+5:30) · Available for Strategic Roles</span>
            </div>
            <p className="font-label-mono text-xs text-on-surface-variant mt-space-xs">
              Software Development Engineer (Full Stack &amp; AI) · hkbharti77@gmail.com
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
                href="https://github.com/hkbharti77"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                className="text-on-surface-variant hover:text-on-surface uppercase tracking-wider transition-colors"
                href="https://www.linkedin.com/in/himanshu-bharti-81a5a618a"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                className="text-on-surface-variant hover:text-on-surface uppercase tracking-wider transition-colors"
                href="mailto:hkbharti77@gmail.com"
              >
                Email ↗
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

        {/* Bottom imprint with statutory legal links */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-space-lg border-t border-surface-variant/40 font-label-mono text-xs text-on-surface-variant gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>© 2025 Himanshu Bharti. All rights reserved.</p>
            <span className="text-outline-variant hidden sm:inline">·</span>
            <button
              onClick={() => onTabChange?.('privacy')}
              className="hover:text-primary underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-outline-variant">·</span>
            <button
              onClick={() => onTabChange?.('terms')}
              className="hover:text-primary underline cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-outline-variant">·</span>
            <button
              onClick={() => onTabChange?.('cookies')}
              className="hover:text-primary underline cursor-pointer"
            >
              Cookie &amp; Telemetry Policy
            </button>
          </div>
          <p className="tracking-widest uppercase">Curated Broadsheet Edition · Vol. 04</p>
        </div>
      </div>
    </footer>
  );
}
