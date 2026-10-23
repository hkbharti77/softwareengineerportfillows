import { useEffect, useState } from 'react';

interface LiveISTClockProps {
  className?: string;
  showDetails?: boolean;
}

export default function LiveISTClock({ className = '', showDetails = false }: LiveISTClockProps) {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        setTimeString(formatted);
      } catch {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * 5.5));
        setTimeString(nd.toTimeString().split(' ')[0] || '12:00:00');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (showDetails) {
    return (
      <div className={`p-space-md bg-surface-container-low shadow-sm flex flex-col gap-space-sm ${className}`}>
        <div className="flex items-center justify-between">
          <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant text-xs">Live Chronometry</span>
          <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-xs uppercase tracking-wider font-semibold">
            Available for Select Engagements
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-space-xs">
          <div>
            <span className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight text-3xl font-serif">
              {timeString || '14:45:10'}
            </span>
            <span className="font-label-mono text-xs text-on-surface-variant ml-2 tracking-wider">IST (UTC+5:30)</span>
          </div>
          <span className="font-label-technical text-xs text-on-surface-variant uppercase tracking-wider">New Delhi, India</span>
        </div>
        <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
          Operating across global asynchronous workflows. Guaranteed dispatch response within 24 standard business hours.
        </p>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-none text-xs font-label-technical uppercase tracking-wider text-on-surface ${className}`}>
      <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
      <span>{timeString ? `${timeString} IST (UTC+5:30)` : 'IST (UTC+5:30)'} Active Studio</span>
    </div>
  );
}
