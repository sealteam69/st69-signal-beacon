'use strict';

// Vercel Web Analytics: aggregate page views only; no terminal/audio events.
// Keep local previews offline. Vercel supplies this route after Analytics is enabled.
if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1' && location.protocol !== 'file:') {
  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.append(script);
}
