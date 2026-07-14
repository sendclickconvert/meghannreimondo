import { defineMiddleware } from 'astro:middleware';
import { resolveRedirect } from './lib/redirects.mjs';

// The ONLY place redirects are applied in the Astro runtime. Definitions live in
// ./lib/redirects.mjs (shared with the production server) — single-hop 301s only.
export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const target = resolveRedirect(url.pathname, url.search);
  if (target) {
    return new Response(null, {
      status: 301,
      headers: { Location: target },
    });
  }
  return next();
});
