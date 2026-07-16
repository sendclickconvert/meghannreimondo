# Meghann Reimondo for Woodstock Town Supervisor

Campaign website for write-in candidate Meghann Reimondo (General Election, November 3, 2026).

## Stack

- **Framework**: Astro (hybrid SSR + static prerendering) with React islands
- **Styling**: Tailwind CSS
- **Server**: Express.js wrapping the Astro SSR handler
- **Spam protection**: Cloudflare Turnstile (optional — forms degrade gracefully without it)
- **Payments**: Stripe dependency present (contribute page)

## How to run

The configured workflow builds then serves the app:

```
npm run build && HOST=0.0.0.0 PORT=5000 node server.mjs
```

For dev (hot-reload, no build step needed):

```
npm run dev
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `TURNSTILE_SECRET_KEY` | Optional | Cloudflare Turnstile server-side verification for contact/volunteer forms. Forms work without it (verification is skipped). |

## Key files

- `src/data/site.ts` — site-wide content, candidate info, integrations config
- `src/lib/redirects.mjs` — URL redirect rules (shared by middleware and production server)
- `src/pages/` — all pages (index, about, issues, events, endorsements, volunteer, contribute, contact)
- `server.mjs` — production Express server
- `astro.config.mjs` — Astro configuration

## User preferences
