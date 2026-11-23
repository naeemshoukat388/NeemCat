/* NeemCat service worker: cache the app shell so the app opens offline.
   API calls to the backend (/generate, /debug) are never cached and
   always go straight to the network. */
const CACHE = 'neemcat-v1';
const SHELL = ['/', '/index.html', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Never cache API calls — always go to the network.
  if (url.pathname === '/generate' || url.pathname.startsWith('/debug')) return;
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  // App shell: try the network first (so updates arrive), fall back to cache offline.
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request).then(hit => hit || caches.match('/index.html')))
  );
});
