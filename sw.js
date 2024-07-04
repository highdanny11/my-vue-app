const STATIC_NAME = 'static-3'
const cdnBaseUrl = 'https://images.unsplash.com/'

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_NAME)
      // cache.add(file path)
      // console.log('sw.js')
      cache.addAll([
        './index.js',
        // './src/main.js',
        './vite.svg',
        './src/assets/vue.svg'
      ])
    })()
  )
  self.skipWaiting()
})
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      // console.log(keys)
      Promise.allSettled(keys.map(key => key !== STATIC_NAME ? caches.delete(key) : null))
    })()
  )
  clients.claim()
})
self.addEventListener('fetch', (event) => {
  console.log(event.request.url.startsWith)
  event.respondWith(
    (async () => {
      console.log(event.request)
      // console.log(caches)
      const res = await caches.match(event.request)
      return res ? res : fetch(event.request)
    })()
  )
})