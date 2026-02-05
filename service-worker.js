// Service Worker for Creon Tracker PWA
// Version 1.2.0 - Improved caching and error handling

const CACHE_NAME = 'creon-tracker-v1.2.0';
const RUNTIME_CACHE = 'creon-tracker-runtime-v1.2.0';

// Files to cache on install
const urlsToCache = [
  './',
  './creon-tracker.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install event - cache critical files
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing version 1.2.0...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] Installation successful');
        return self.skipWaiting(); // Activate immediately
      })
      .catch((error) => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating version 1.2.0...');
  
  // List of current caches to keep
  const cacheWhitelist = [CACHE_NAME, RUNTIME_CACHE];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        return self.clients.claim(); // Take control immediately
      })
      .catch((error) => {
        console.error('[Service Worker] Activation failed:', error);
      })
  );
});

// Fetch event - Network First, then Cache strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // For HTML files: Network First, fall back to Cache
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the response
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                console.log('[Service Worker] Serving from cache (offline):', request.url);
                return cachedResponse;
              }
              // Return a custom offline page if available
              return caches.match('./creon-tracker.html');
            });
        })
    );
    return;
  }
  
  // For other resources: Cache First, fall back to Network
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[Service Worker] Serving from cache:', request.url);
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone and cache the response
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
            
            return response;
          })
          .catch((error) => {
            console.error('[Service Worker] Fetch failed:', error);
            // Could return a fallback response here
          });
      })
  );
});

// Handle messages from the app
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skipping waiting...');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('[Service Worker] Clearing cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: '1.2.0',
      cacheName: CACHE_NAME
    });
  }
});

// Periodic background sync (optional - for future features)
// Note: Requires user permission and limited browser support
self.addEventListener('periodicsync', (event) => {
  console.log('[Service Worker] Periodic sync:', event.tag);
  
  if (event.tag === 'check-monthly-export') {
    event.waitUntil(checkMonthlyExport());
  }
});

async function checkMonthlyExport() {
  // This could send a notification reminder for monthly export
  // Check if it's the last day of the month
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // If tomorrow is the 1st, today is the last day of the month
  if (tomorrow.getDate() === 1) {
    console.log('[Service Worker] Last day of month - export reminder');
    
    // Could send notification if permission granted
    if (Notification.permission === 'granted') {
      self.registration.showNotification('Creon Tracker', {
        body: 'Time to export your monthly data!',
        icon: './icon-192.png',
        badge: './icon-72.png',
        tag: 'monthly-export',
        requireInteraction: false,
        actions: [
          { action: 'export', title: 'Export Now' },
          { action: 'dismiss', title: 'Later' }
        ]
      });
    }
  }
}

// Push notifications (optional feature for medication reminders)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push notification received');
  
  const title = 'Creon Tracker';
  const options = {
    body: event.data ? event.data.text() : 'Time to log your medication',
    icon: './icon-192.png',
    badge: './icon-72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'log',
        title: 'Log Now',
        icon: './icon-72.png'
      },
      {
        action: 'close',
        title: 'Dismiss',
        icon: './icon-72.png'
      }
    ],
    tag: 'creon-reminder',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'log') {
    event.waitUntil(
      clients.openWindow('./creon-tracker.html#log')
    );
  } else if (event.action === 'export') {
    event.waitUntil(
      clients.openWindow('./creon-tracker.html#settings')
    );
  } else {
    // Default action (clicking notification body)
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // If app is already open, focus it
        for (const client of clientList) {
          if (client.url.includes('creon-tracker.html') && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise, open a new window
        if (clients.openWindow) {
          return clients.openWindow('./creon-tracker.html');
        }
      })
    );
  }
});

// Error handling
self.addEventListener('error', (event) => {
  console.error('[Service Worker] Error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[Service Worker] Unhandled rejection:', event.reason);
});

// Log service worker lifecycle
console.log('[Service Worker] Script loaded - Version 1.2.0');
