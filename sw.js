/* ZO Leads · cache para abrir sin conexión. HTML network-first; recursos cache-first. */
var CACHE = 'zo-leads-site-v2';
var ASSETS = ['./','./index.html','./manifest.webmanifest','./img/icon-192.png','./img/icon-512.png','./img/icon-180.png','./img/wordmark_white.svg','./img/icon_white.svg',
  './img/top_aplicando.jpg','./img/top_mirada.jpg','./img/wordmark_cobalt.svg','./img/top_producto.jpg','./img/bottom_polish.jpg','./img/bottom_mano.jpg',
  './fonts/zo-light.woff2','./fonts/zo-book.woff2','./fonts/zo-regular.woff2','./fonts/geist-light.woff2'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var req = e.request; var url = new URL(req.url);
  if (url.origin !== location.origin) return;
  var accept = req.headers.get('accept') || '';
  var isHTML = req.mode === 'navigate' || accept.indexOf('text/html') >= 0;
  if (isHTML) {
    e.respondWith(fetch(req).then(function (resp) { var cp = resp.clone(); caches.open(CACHE).then(function (c) { c.put(req, cp); }); return resp; })
      .catch(function () { return caches.match(req).then(function (r) { return r || caches.match('./index.html'); }); }));
  } else {
    e.respondWith(caches.match(req).then(function (r) { return r || fetch(req).then(function (resp) { if (resp && resp.ok) { var cp = resp.clone(); caches.open(CACHE).then(function (c) { c.put(req, cp); }); } return resp; }); }));
  }
});
