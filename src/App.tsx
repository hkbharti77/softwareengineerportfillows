import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import ScrollProgressBar from './components/ScrollProgressBar';
import WorkView from './views/WorkView';
import EngineeringView from './views/EngineeringView';
import ExperienceView from './views/ExperienceView';
import AboutView from './views/AboutView';
import type { TabType } from './types';
import { CheckCircle2, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('work');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme changes to document root class & localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Listen to OS system theme changes if user has not stored an override
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme');
      if (!stored) {
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  // Sync hash routing on mount and hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'engineering-ai' || hash === 'engineering') {
        setActiveTab('engineering');
      } else if (hash === 'experience') {
        setActiveTab('experience');
      } else if (hash === 'about') {
        setActiveTab('about');
      } else if (hash === 'contact') {
        setActiveTab('experience');
        setTimeout(() => {
          document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setActiveTab('work');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Escape key listener to exit Reading / Focus Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isReadingMode) {
        setIsReadingMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReadingMode]);

  const handleTabChange = (tab: TabType) => {
    if (tab === 'contact') {
      window.location.hash = 'contact';
      setActiveTab('experience');
      setTimeout(() => {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (tab === 'work') window.location.hash = 'work';
    else if (tab === 'engineering') window.location.hash = 'engineering-ai';
    else if (tab === 'experience') window.location.hash = 'experience';
    else if (tab === 'about') window.location.hash = 'about';

    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  return (
    <div
      className={`min-h-screen bg-surface text-on-surface flex flex-col font-body-md antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed transition-colors ${
        isReadingMode ? 'focus-reading-mode' : ''
      }`}
    >
      {/* Viewport Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenResume={() => setIsResumeOpen(true)}
        isReadingMode={isReadingMode}
        onToggleReadingMode={() => setIsReadingMode((prev) => !prev)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
      />

      {/* Main Broadside Content with smooth view transition */}
      <main className="w-full pt-20 flex-1 overflow-x-hidden">
        <div key={activeTab} className="w-full broadsheet-view-transition">
          {activeTab === 'work' && (
            <WorkView
              onTabChange={handleTabChange}
              onOpenResume={() => setIsResumeOpen(true)}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'engineering' && (
            <EngineeringView
              onTabChange={handleTabChange}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'experience' && (
            <ExperienceView
              onTabChange={handleTabChange}
              onOpenResume={() => setIsResumeOpen(true)}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'about' && (
            <AboutView
              onTabChange={handleTabChange}
              onOpenResume={() => setIsResumeOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Global Footer (hidden in Focus Reading Mode via focus-hide) */}
      <div className="focus-hide">
        <Footer
          onTabChange={handleTabChange}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </div>

      {/* Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onTriggerToast={triggerToast}
      />

      {/* Floating Focus Mode Banner / Exit Pill */}
      {isReadingMode && (
        <aside
          aria-label="Reading Mode Control"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-2.5 shadow-2xl flex items-center gap-3 font-label-mono text-xs border border-surface-variant/40 animate-fade-in"
        >
          <BookOpen className="w-4 h-4 text-secondary-container" />
          <span>Focus Mode Active · Distraction-Free Case Studies</span>
          <button
            onClick={() => setIsReadingMode(false)}
            className="ml-2 px-2.5 py-1 bg-surface-container-high text-on-surface text-[11px] font-semibold uppercase hover:bg-surface cursor-pointer"
          >
            Exit (Esc)
          </button>
        </aside>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 bg-surface-container-high border border-surface-variant text-on-surface shadow-xl flex items-center gap-3 animate-fade-in font-label-mono text-xs">
          <CheckCircle2 className="w-5 h-5 text-tertiary shrink-0" />
          <p className="flex-1 leading-snug">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}
