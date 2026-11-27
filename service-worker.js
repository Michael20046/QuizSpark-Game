const CACHE_NAME = "quizspark-shell-v51";
const APP_SHELL = [
  "./",
  "./index.html",
  "./about.html",
  "./privacy.html",
  "./terms.html",
  "./quizspark-logo.svg",
  "./quizspark-logo.png",
  "./manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key.startsWith("quizspark-shell-") && key !== CACHE_NAME)
        .map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Let search-engine files load directly from GitHub Pages, never from the app shell cache.
  if (url.pathname.endsWith("/sitemap.xml") || url.pathname.endsWith("/robots.txt")) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(async () => {
        const cachedPage = await caches.match(request, { ignoreSearch: true });
        if (cachedPage) return cachedPage;

        if (url.pathname.endsWith("/privacy.html")) {
          return (await caches.match("./privacy.html")) || Response.error();
        }
        if (url.pathname.endsWith("/terms.html")) {
          return (await caches.match("./terms.html")) || Response.error();
        }
        return (await caches.match("./index.html")) || Response.error();
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
