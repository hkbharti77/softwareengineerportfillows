import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollHeight > 0) {
            const pct = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
            setProgress(pct);
          } else {
            setProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[2.5px] z-[60] pointer-events-none overflow-hidden bg-surface-container-highest/20"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-secondary-container via-secondary to-primary transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(252,133,70,0.4)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
