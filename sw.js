const CACHE_NAME = "neonx-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./catalogo.html",
  "./src/css/style.css",
  "./src/js/main.js",
  "./src/js/catalogo.js",
  "./src/img/Headset-preto.avif",
  "./src/img/favicon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.log("Cache failed:", err);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).catch((err) => {
        console.log("Fetch failed:", err);
        return new Response("Offline", {
          status: 503,
          statusText: "Service Unavailable"
        });
      });
    }).catch((err) => {
      console.log("Cache match failed:", err);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
