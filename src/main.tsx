import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global Error & Promise Rejection Handlers
window.addEventListener('error', (event) => {
  const msg = event.message || (event.error && event.error.message) || '';
  const filename = event.filename || '';
  if (
    msg.includes('ResizeObserver loop completed with undelivered notifications') ||
    msg.includes('ResizeObserver loop limit exceeded') ||
    msg.includes('CRM Chat') ||
    msg.includes('gyanvaniai') ||
    filename.includes('gyanvaniai') ||
    filename.includes('chat-widget')
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const msg = typeof reason === 'string' ? reason : (reason && reason.message) || '';
  const stack = (reason && reason.stack) || '';
  if (
    msg.includes('CRM Chat') ||
    msg.includes('gyanvaniai') ||
    msg.includes('ResizeObserver') ||
    (msg.includes('Failed to fetch') && (stack.includes('gyanvaniai') || stack.includes('widget') || stack.includes('_aistudio-iframe')))
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(<App />);
