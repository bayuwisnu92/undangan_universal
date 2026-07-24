const CACHE_NAME = 'admin-control-v1';
const APP_ASSETS = [
  '/admin',
  '/index.html',
  '/manifest.webmanifest',
  '/asset/og-templates-pro.png',
  '/asset/og-templates-pro.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // Hanya perhatikan request untuk scope /admin
  const url = new URL(event.request.url);
  if (!url.pathname.startsWith('/admin')) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => caches.match('/index.html'))
  );
});
