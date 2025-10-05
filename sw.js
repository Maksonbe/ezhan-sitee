// Service Worker для ЕЖАН СИСТЕМС
const CACHE_NAME = 'ezhan-system-v1.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/manifest.html', 
    '/gallery.html',
    '/game.html',
    '/css/style-new.css',
    '/js/main.js',
    '/js/ezhan-simulator.js',
    '/js/pwa.js',
    '/js/settings.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// Установка Service Worker
self.addEventListener('install', function(event) {
    console.log('🔄 Service Worker: Установка для ЕЖАН СИСТЕМС');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('💾 Кеширование файлов Ежана');
                return cache.addAll(urlsToCache);
            })
    );
});

// Активация - очистка старых кешей
self.addEventListener('activate', function(event) {
    console.log('🚀 Service Worker: Активация');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Удаление старого кеша:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Перехват запросов
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Возвращаем кеш или делаем обычный запрос
                return response || fetch(event.request);
            })
    );
});