import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Register ServiceWorker ONLY for /admin path (PWA Admin Control)
if ('serviceWorker' in navigator && window.location.pathname.startsWith('/admin')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/admin' })
      .then(reg => console.log('Admin PWA ServiceWorker registered:', reg.scope))
      .catch(err => console.warn('Admin PWA SW registration failed:', err));
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
