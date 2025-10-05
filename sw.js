// sw.js - Service Worker для ЕЖАН СИСТЕМС
const CACHE_NAME = 'ezhan-pwa-v1.2';
const urlsToCache = [
  './',
  './index.html',
  './game.html',
  './about.html',
  './gallery.html',
  './manifest.html',
  
  // CSS
  './css/style-new.css',
  
  // JS
  './js/main.js',
  './js/pwa.js',
  './js/game-enhancements.js',
  './js/ezhan-simulator.js',
  './js/gallery.js',
  './js/about.js',
  './js/settings.js',
  './js/ai-exhan.js',
  './js/manifest.js',
  
  // Manifest
  './manifest.json',
  
  // Иконки
  './icons/icon-192.png',
  './icons/icon-512.png',
  
  // Изображения (основные)
  './images/face.jpg'
];

self.addEventListener('install', event => {
  console.log('🔄 Service Worker: Установка...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Кэш открыт');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('❌ Ошибка кэширования:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем кэш или делаем запрос
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('✅ Service Worker активирован');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Удаляем старый кэш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});