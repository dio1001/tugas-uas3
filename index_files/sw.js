const CACHE_NAME = 'cool-cache';

//add whichever assets you want to precache here:
const PRECACHE_ASSETS = [
    'index_files/',
    'register.js',
    'profile-pic.png',
    'src/'
]

//listener for the install event - precaches our assets list on service worker install
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(toCache)
        })
        .then(self.skipWaiting())
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.match(event>request)
            })
        })
    )
})

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Hapus Cache Lama', key)
                    return caches.delete(key)
                }
            }))
        })
        .then (() => self.clients.claim())
    )
})