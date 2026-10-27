import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Sun, Moon, Download, ArrowUpRight } from 'lucide-react';
import type { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenResume: () => void;
  isReadingMode: boolean;
  onToggleReadingMode: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({
  activeTab,
  onTabChange,
  onOpenResume,
  isReadingMode,
  onToggleReadingMode,
  isDarkMode,
  onToggleDarkMode,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'work', label: 'Work' },
    { id: 'engineering', label: 'Engineering & AI' },
    { id: 'experience', label: 'Experience' },
    { id: 'blog', label: 'Dispatches' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (tab: TabType) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-surface-variant/40 shadow-[0_1px_12px_rgba(0,0,0,0.03)] transition-colors duration-200">
        <div className="h-20 w-full px-margin-mobile lg:px-margin flex items-center justify-between max-w-7xl mx-auto gap-3 sm:gap-4">
          {/* Brand identity & architectural monogram */}
          <button
            onClick={() => handleNavClick('work')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-none shrink-0"
          >
            {/* Monogram with status beacon */}
            <div className="relative h-10 w-10 bg-surface-container-high border border-surface-variant/80 flex items-center justify-center font-serif text-lg font-bold text-on-surface group-hover:border-primary/60 transition-colors shadow-xs shrink-0">
              <span className="tracking-tighter">HB</span>
              {/* Live availability indicator */}
              <span
                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface animate-pulse"
                title="Available for Engagements"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-label-technical text-xs tracking-wider uppercase text-on-surface font-semibold group-hover:text-primary transition-colors">
                Himanshu Bharti
              </span>
              <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                Software &amp; AI
              </span>
            </div>
          </button>

          {/* Desktop Centered Navigation Dock */}
          <nav className="hidden lg:flex items-center p-1 bg-surface-container/60 dark:bg-surface-container-high/60 backdrop-blur-md rounded-full border border-surface-variant/50 shadow-xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-label-technical text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-surface dark:bg-surface-container-highest text-on-surface font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities & CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Mode Toggle (Sun/Moon) */}
            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="w-9 h-9 rounded-full bg-surface-container/80 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all cursor-pointer shadow-xs border border-surface-variant/50 flex items-center justify-center shrink-0"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-secondary-container" />
              ) : (
                <Moon className="w-4 h-4 text-on-surface-variant" />
              )}
            </button>

            {/* Reading / Focus Mode Toggle */}
            <button
              onClick={onToggleReadingMode}
              title={isReadingMode ? 'Exit Reading Mode (Esc)' : 'Enter Focus / Reading Mode'}
              className={`hidden xl:inline-flex items-center gap-1.5 h-9 px-3 rounded-full font-label-technical text-xs tracking-wider uppercase transition-all cursor-pointer shadow-xs border shrink-0 ${
                isReadingMode
                  ? 'bg-on-surface text-surface border-on-surface font-semibold ring-2 ring-secondary-container/40'
                  : 'bg-surface-container/80 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border-surface-variant/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>
                {isReadingMode ? 'Focus On' : 'Reading'}
              </span>
              {isReadingMode && (
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
              )}
            </button>

            {/* Download Résumé */}
            <button
              onClick={onOpenResume}
              className="hidden md:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-technical text-xs tracking-wider uppercase transition-all cursor-pointer shadow-xs border border-surface-variant/60 hover:border-surface-variant shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-on-surface-variant" />
              <span>Résumé</span>
            </button>

            {/* Primary Action: Let's Connect */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary font-label-technical text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-98 shrink-0"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile hamburger menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-surface-container/80 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all cursor-pointer shadow-xs border border-surface-variant/50 flex items-center justify-center shrink-0"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface/98 backdrop-blur-2xl border-t border-b border-surface-variant/60 px-margin-mobile py-4 flex flex-col gap-2.5 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto animate-drawer-down">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-2.5 text-xs font-label-technical uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-surface-container-high text-primary font-bold shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-surface-variant/60 flex flex-col gap-2">
              {/* Theme Mode Toggle in Drawer */}
              <button
                onClick={() => {
                  onToggleDarkMode();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2.5 text-xs font-label-technical uppercase tracking-wider bg-surface-container/80 hover:bg-surface-container rounded-lg text-on-surface flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  {isDarkMode ? <Sun className="w-4 h-4 text-secondary-container" /> : <Moon className="w-4 h-4 text-on-surface-variant" />}
                  <span>Theme Mode</span>
                </span>
                <span className="text-on-surface-variant font-mono text-[11px]">
                  {isDarkMode ? 'Dark' : 'Light'}
                </span>
              </button>

              {/* Reading Mode Toggle in Drawer */}
              <button
                onClick={() => {
                  onToggleReadingMode();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2.5 text-xs font-label-technical uppercase tracking-wider bg-surface-container/80 hover:bg-surface-container rounded-lg text-on-surface flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-on-surface-variant" />
                  <span>Focus / Reading Mode</span>
                </span>
                <span className={isReadingMode ? 'text-secondary-container font-bold text-[11px]' : 'text-on-surface-variant text-[11px]'}>
                  {isReadingMode ? 'Active' : 'Off'}
                </span>
              </button>

              {/* Résumé CTA */}
              <button
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2.5 text-xs font-label-technical uppercase tracking-wider bg-surface-container-high hover:bg-surface-container-highest rounded-lg text-on-surface cursor-pointer flex items-center justify-between transition-colors border border-surface-variant/50"
              >
                <span>Download Résumé</span>
                <Download className="w-3.5 h-3.5 text-on-surface-variant" />
              </button>

              {/* Let's Connect CTA */}
              <button
                onClick={() => {
                  handleNavClick('contact');
                }}
                className="text-left px-4 py-3 text-xs font-label-technical font-semibold uppercase tracking-wider bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary rounded-lg cursor-pointer flex items-center justify-between shadow-xs transition-colors"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 bg-black/40 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

