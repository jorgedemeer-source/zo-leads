/* ZO Leads · service worker. HTML y config: network-first (siempre la última
   versión si hay red, copia guardada si no). Iconos, manifest y fuentes: cache-first. */
var CACHE = 'zo-leads-v3';
var ASSETS = ['./', './index.html', './config.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-180.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var req = e.request;
  var url = new URL(req.url);
  var accept = req.headers.get('accept') || '';
  var fresh = req.mode === 'navigate' || accept.indexOf('text/html') >= 0 || /config\.js$/.test(url.pathname);
  if (fresh) {
    e.respondWith(
      fetch(req).then(function (resp) {
        var cp = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(req, cp); });
        return resp;
      }).catch(function () {
        return caches.match(req).then(function (r) { return r || caches.match('./index.html'); });
      })
    );
  } else {
    e.respondWith(
      caches.match(req).then(function (r) {
        return r || fetch(req).then(function (resp) {
          if (resp && (resp.ok || resp.type === 'opaque')) { var cp = resp.clone(); caches.open(CACHE).then(function (c) { c.put(req, cp); }); }
          return resp;
        });
      })
    );
  }
});
