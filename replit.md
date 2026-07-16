# Meghann Reimondo for Woodstock Town Supervisor

Campaign website for write-in candidate Meghann Reimondo (General Election, November 3, 2026).

## Stack

- **Framework**: Astro (fully static output — `output: 'static'`) with React islands
- **Styling**: Tailwind CSS
- **Deployment**: Static — build with `npm run build`, publish the `dist/` directory
- **Forms**: No server API. Configure an external endpoint via `INTEGRATIONS.formWebhook` in `src/data/site.ts` if forms need a backend.

## How to run

The configured workflow builds then serves the static site locally:

```
npm run build && npm run preview -- --port 5000
```

For dev (hot-reload): `npm run dev`

## Static deployment settings

- **Build command**: `npm run build`
- **Public/output directory**: `dist`

## Key files

- `src/data/site.ts` — site-wide content, candidate info, integrations config
- `src/lib/redirects.mjs` — legacy-URL redirect map (applied by `src/middleware.ts` in dev only; on static hosting, configure redirects at the host or via Astro's `redirects` config)
- `src/pages/` — all pages (index, about, issues, events, endorsements, volunteer, contribute, contact)
- `astro.config.mjs` — Astro configuration

## Notes

- Removed for static conversion (July 16, 2026): `server.mjs` (Express SSR server), `src/pages/api/submit-form.ts` (server form endpoint — no form was wired to it), `@astrojs/node` adapter usage.
- `TURNSTILE_SECRET_KEY` is no longer used (it belonged to the removed server form endpoint).

## User preferences
