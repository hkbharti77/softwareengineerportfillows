import { useState } from 'react';
import { Menu, X, User, BookOpen, Sun, Moon } from 'lucide-react';
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

  const navItems: { id: TabType; label: string }[] = [
    { id: 'work', label: 'Work' },
    { id: 'engineering', label: 'Engineering & AI' },
    { id: 'experience', label: 'Experience' },
    { id: 'blog', label: 'Dispatches' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: TabType) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-variant/40">
      <div className="h-20 w-full px-margin-mobile lg:px-margin flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand identity & monogram */}
        <button
          onClick={() => handleNavClick('work')}
          className="flex items-center gap-space-md text-left group cursor-pointer focus:outline-none"
        >
          {/* Architectural Monogram Icon */}
          <div className="h-9 w-9 bg-surface-container-high border border-surface-variant/80 flex items-center justify-center font-serif text-lg font-bold text-on-surface group-hover:border-primary transition-colors shadow-xs">
            <span className="tracking-tighter">HB</span>
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-space-lg">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`font-label-technical text-xs uppercase tracking-widest transition-colors py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-on-surface font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-container" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-space-sm">
          {/* Theme Mode Toggle (Sun/Moon) */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all cursor-pointer shadow-xs border border-surface-variant/40"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-secondary-container" />
            ) : (
              <Moon className="w-4 h-4 text-on-surface-variant" />
            )}
          </button>

          {/* Reading Mode Toggle */}
          <button
            onClick={onToggleReadingMode}
            title={isReadingMode ? 'Exit Reading Mode (Esc)' : 'Enter Focus / Reading Mode'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-technical text-xs tracking-wider uppercase transition-all cursor-pointer shadow-xs ${
              isReadingMode
                ? 'bg-inverse-surface text-inverse-on-surface ring-2 ring-secondary-container font-semibold'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-surface-variant/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {isReadingMode ? 'Focus On' : 'Reading Mode'}
            </span>
            {isReadingMode && (
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
            )}
          </button>

          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-surface-container-high text-on-surface font-label-technical text-xs tracking-wider uppercase hover:bg-inverse-surface hover:text-inverse-on-surface transition-all cursor-pointer shadow-xs"
          >
            Download Résumé
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-technical text-xs font-semibold tracking-wider uppercase hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer shadow-sm"
          >
            Let's Connect
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs text-on-primary">
            <User className="w-4 h-4" />
          </div>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface cursor-pointer ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface border-b border-surface-variant px-margin-mobile py-4 flex flex-col gap-3 shadow-lg animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left px-3 py-2 text-xs font-label-technical uppercase tracking-wider transition-colors ${
                activeTab === item.id
                  ? 'bg-surface-container text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-surface-variant flex flex-col gap-2">
            {/* Dark Mode in Drawer */}
            <button
              onClick={() => {
                onToggleDarkMode();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-xs font-label-technical uppercase tracking-wider bg-surface-container text-on-surface flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {isDarkMode ? <Sun className="w-4 h-4 text-secondary-container" /> : <Moon className="w-4 h-4" />}
                <span>Theme Mode</span>
              </span>
              <span className="text-on-surface-variant font-mono">
                {isDarkMode ? 'Dark (Obsidian)' : 'Light (Paper)'}
              </span>
            </button>
            <button
              onClick={() => {
                onToggleReadingMode();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-xs font-label-technical uppercase tracking-wider bg-surface-container text-on-surface flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Focus / Reading Mode</span>
              </span>
              <span className={isReadingMode ? 'text-secondary-container font-bold' : 'text-on-surface-variant'}>
                {isReadingMode ? 'Active' : 'Off'}
              </span>
            </button>
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-xs font-label-technical uppercase tracking-wider bg-surface-container-high text-on-surface cursor-pointer"
            >
              Download Résumé
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
