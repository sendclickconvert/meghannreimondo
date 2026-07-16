import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// URL redirects: src/lib/redirects.mjs is the single shared source, applied by
// src/middleware.ts in dev. For static hosting, configure legacy-URL redirects
// at the hosting layer (or add them to Astro's `redirects` option here).

export default defineConfig({
  site: 'https://meghannreimondo.com',
  output: 'static',
  trailingSlash: 'never',
  vite: { server: { allowedHosts: true } },
  integrations: [
    tailwind(),
    react(),
    sitemap(),
  ],
});
