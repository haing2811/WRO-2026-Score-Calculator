/* sw.js — offline-first service worker for the WRO 2026 Score Calculator.
 *
 * DEPLOY RULE: bump VERSION below with EVERY deploy. This is a static site with
 * no build step and no content hashes, so the cache name is the only mechanism
 * for invalidating cached bytes. The activate handler deletes every cache that
 * is not in KEEP, so old versions clean themselves up (this supersedes the old
 * inline unregister/cleanup script that was removed from index.html).
 *
 * All URLs are RELATIVE so the exact same file works at the site root ("/")
 * and under the portal prefix ("/wro2026-score-calculator/"). Relative URLs in
 * a service worker resolve against the SW script's own URL.
 */

const VERSION = '1';
const SHELL_CACHE = 'wro-score-v' + VERSION;   // versioned: bump every deploy
const FONTS_CACHE = 'wro-score-fonts';         // intentionally unversioned
const KEEP = [SHELL_CACHE, FONTS_CACHE];

// Small shell only (~880 KB) — precached during install.
const SHELL = [
  './',
  './index.html',
  './script.js',
  './styles.css',
  './manifest.json',
  './icon.png',
  './iconrb.png'
];

// ~9.5 MB of game mats — background-prefetched after activation so full
// offline works within seconds of the first visit.
const MATS = [
  './GameField/Elementary.png',
  './GameField/Junior.png',
  './GameField/Senior.png'
];

// --- install: precache the shell, then take over as soon as activated --------
self.addEventListener('install', function (event) {
  self.skipWaiting();                 // don't wait for all tabs to close
  event.waitUntil(precacheShell());
});

function precacheShell() {
  return caches.open(SHELL_CACHE).then(function (cache) {
    return Promise.all(SHELL.map(function (url) {
      // cache:'reload' BYPASSES the HTTP cache — critical because vercel.json
      // sends immutable 1-year caching for /GameField/, and we must never
      // precache a stale index/script/styles.
      return fetch(new Request(url, { cache: 'reload' })).then(function (res) {
        if (!res.ok) throw new Error('precach failed: ' + url + ' -> ' + res.status);
        return cache.put(url, res);
      });
    }));
  });
}

// --- activate: drop stale caches, claim clients, prefetch mats in background --
self.addEventListener('activate', function (event) {
  event.waitUntil((function () {
    return caches.keys()
      .then(function (keys) {
        // Whitelist cleanup: delete every cache not in KEEP (i.e. older
        // wro-score-v<N> versions and anything from other origins' apps).
        return Promise.all(keys.filter(function (k) {
          return KEEP.indexOf(k) === -1;
        }).map(function (k) {
          return caches.delete(k);
        }));
      })
      .then(function () { return self.clients.claim(); })  // control open pages NOW
      .then(function () { return prefetchMats(); });       // then ~9.5 MB background
  })());
});

function prefetchMats() {
  return caches.open(SHELL_CACHE).then(function (cache) {
    return Promise.all(MATS.map(function (url) {
      return cache.match(url).then(function (hit) {
        if (hit) return;                       // already cached — skip network
        return fetch(new Request(url, { cache: 'reload' })).then(function (res) {
          if (res.ok) return cache.put(url, res);
        });
      });
    }));
  }).catch(function () { /* offline during prefetch: retried on next activate */ });
}

// --- fetch: cache-first for same-origin, stale-while-revalidate for fonts -----
self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // Google Fonts CSS + woff2 (cross-origin; responses are opaque under no-cors).
  // Tiny cache so offline rendering matches online (Orbitron stays Orbitron).
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(fontsStaleWhileRevalidate(req));
    return;
  }

  // Our own shell + mats: cache-first, network fallback.
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(req));
    return;
  }
  // Any other origin: default browser behavior (do not respondWith).
});

function cacheFirst(req) {
  return caches.open(SHELL_CACHE).then(function (cache) {
    return cache.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res.ok) cache.put(req, res.clone());
        return res;
      }).catch(function (err) {
        // Offline navigation fallback: serve the app shell.
        if (req.mode === 'navigate') {
          return cache.match('./index.html').then(function (shell) {
            return shell || cache.match('./');
          }).then(function (shell) {
            if (shell) return shell;
            throw err;
          });
        }
        throw err;
      });
    });
  });
}

function fontsStaleWhileRevalidate(req) {
  return caches.open(FONTS_CACHE).then(function (cache) {
    return cache.match(req).then(function (cached) {
      // Kick the network refresh regardless; result is used only on a miss.
      var network = fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) {
          cache.put(req, res.clone()).catch(function () {});
        }
        return res;
      }).catch(function () { return undefined; });

      if (cached) return cached;      // serve cache now, refresh in background
      return network.then(function (res) {
        return res || Response.error();
      });
    });
  });
}
