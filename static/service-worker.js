self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
  
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll([
          '/',
          '/index.html',
          '/AppImages/windows11/SmallTile.scale-100.png',
          '/AppImages/windows11/SmallTile.scale-125.png',
          '/AppImages/windows11/SmallTile.scale-150.png',
          '/icons/icon-192x192.png', // Adicione aqui outros ícones
          '/icons/icon-512x512.png',
          // Adicione qualquer outro arquivo que deseja armazenar em cache
        ]);
      })
    );
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Retorna a resposta do cache, se disponível
        return cachedResponse || fetch(event.request);
      })
    );
  });
  