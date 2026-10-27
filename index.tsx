import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Les balises SEO pré-rendues (generate-pages.js) servent aux crawlers sans JS ;
// une fois React chargé, react-helmet-async prend le relais → on les retire pour éviter les doublons.
document.querySelectorAll('[data-prerender]').forEach((el) => el.remove());

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);