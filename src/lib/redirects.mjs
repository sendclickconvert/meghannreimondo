// ============================================================
// SINGLE SOURCE OF TRUTH FOR URL REDIRECTS.
// Consumed by src/middleware.ts (dev / SSR) AND server.mjs (prod static),
// so behavior is identical in every runtime. Do NOT define redirects
// anywhere else (not in astro.config, not inline in pages).
// ============================================================

// Legacy-URL map. Add real old URLs here at build time (e.g. from the legacy
// megforwoodstock.com domain once its paths are known).
// Keys and values are absolute paths WITHOUT a trailing slash.
// Example (delete — this is only a pattern):
//   '/old-path': '/new-path',
export const REDIRECTS = {
  // '/legacy-path': '/new-path',
};

/**
 * Resolve a request to a SINGLE-HOP 301 target, or null if no redirect is needed.
 * Trailing-slash normalization and the map lookup happen in one pass, so a legacy
 * URL like "/old-path/" goes straight to its final target — never a chain.
 */
export function resolveRedirect(pathname, search = '') {
  // Normalize once: strip a single trailing slash (except the root "/").
  let path = pathname;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);

  // Map lookup on the normalized path -> final target in one hop.
  const mapped = REDIRECTS[path];
  if (mapped) return mapped + search;

  // Trailing-slash-only case: redirect to the normalized path (one hop).
  if (path !== pathname) return path + search;

  return null;
}
