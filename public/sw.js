// Minimal offline shell for BatchPilot.
//
// Scope: this is intentionally NOT an offline-first cache — the app is a
// live dashboard backed by Supabase/Prisma, and caching page responses
// would serve stale student/attendance/fee data. The only job of this
// service worker is to keep a friendly "you're offline" screen available
// when navigation requests fail, instead of the browser's default offline
// error page. Static assets and API/data requests always go to the network.

const CACHE_NAME = "batchpilot-offline-shell-v1";
const OFFLINE_URL = "/offline";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(
      () => caches.match(OFFLINE_URL)
    )
  );
});
