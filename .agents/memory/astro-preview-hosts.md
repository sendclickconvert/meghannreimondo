---
name: Astro preview host blocking on Replit
description: Why `astro preview` 403s Replit's preview pane and the working alternative
---

Astro 4's `astro preview` (static output) does not honor `vite: { preview: { allowedHosts } }` from astro.config — Replit's rotating `*.replit.dev` preview hosts get 403 "Blocked request" no matter what is configured.

**Why:** tried both `allowedHosts: true` and explicit `['.replit.dev']`; the Vite preview server kept rejecting the host header.

**How to apply:** for local preview of the built static site, serve `dist/` with a plain static server instead (e.g. `npx serve dist -l 5000 --no-clipboard`) — no host gate, and it mirrors static hosting more faithfully. `astro dev` is unaffected (`server.allowedHosts: true` works).
