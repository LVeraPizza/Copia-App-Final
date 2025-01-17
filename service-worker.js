self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/img/',
        '/principal.html',
        '/manifest.json',
        '/index.html',
        '/contacto.html',
        '/css/styles.css',
        '/script.js',
        '/splash.js',
        '/logo_vp.png',
        '/img/eventos/logo_año_nuevo.png',

        // Agrega otros archivos que necesites en el caché
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

