import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import react from '@astrojs/react';

// URL redirects are intentionally NOT defined here. They live in a single shared
// source — src/lib/redirects.mjs — consumed by src/middleware.ts (dev/SSR) and
// server.mjs (production). Add real legacy URLs there at build time.

export default defineConfig({
  site: 'https://meghannreimondo.com',
  output: 'hybrid',
  trailingSlash: 'never',
  adapter: node({ mode: 'middleware' }),
  vite: { server: { allowedHosts: true } },
  integrations: [
    tailwind(),
    react(),
    sitemap(),
  ],
});
