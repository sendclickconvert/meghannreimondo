import { handler as ssrHandler } from './dist/server/entry.mjs';
import express from 'express';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import { resolveRedirect } from './src/lib/redirects.mjs';

const app = express();

app.use(compression({ threshold: 0 }));

// Redirects — applied BEFORE static serving so prerendered pages (which bypass
// the Astro middleware in production) still get single-hop 301s. Same shared
// source as src/middleware.ts: src/lib/redirects.mjs.
app.use((req, res, next) => {
  const search = req.originalUrl.includes('?')
    ? req.originalUrl.substring(req.originalUrl.indexOf('?'))
    : '';
  const target = resolveRedirect(req.path, search);
  if (target) return res.redirect(301, target);
  next();
});

// Short cache for crawlable index files — must-revalidate, no immutable.
// Sitemaps and robots.txt change on every build; a 1-year immutable header
// would prevent Googlebot from picking up new URLs after content updates.
app.use((req, res, next) => {
  if (/^\/(sitemap[^/]*\.xml|robots\.txt)$/.test(req.path)) {
    res.set('Cache-Control', 'public, max-age=3600, must-revalidate');
    return express.static('dist/client', { redirect: false })(req, res, next);
  }
  next();
});

// Serve static assets (CSS, JS, images, fonts).
// redirect: false prevents express.static from issuing its own directory→slash
// redirect, which would conflict with the trailing-slash middleware above.
app.use(express.static('dist/client', { maxAge: '1y', immutable: true, redirect: false }));

// Serve pre-rendered Astro HTML pages.
// express.static falls through for directory paths when redirect: false.
// This layer maps /path → dist/client/path/index.html so those pages are served.
app.use((req, res, next) => {
  const indexPath = path.resolve(path.join('dist/client', req.path, 'index.html'));
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

app.use(ssrHandler);

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
