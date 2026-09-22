// Lightweight production server for the Meghann Reimondo campaign site.
// Serves the static Astro build from dist/ and proxies /api/join to GHL
// so the webhook URL never appears in client-facing HTML or JavaScript.

import express from 'express';
import compression from 'compression';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// ── Health check ─────────────────────────────────────────────────────────
// Registered first, before compression/static middleware, so it responds
// the instant the process is listening — no filesystem or render work.
// Deploy/proxy healthchecks that hit / still work: this only short-circuits
// requests to /health, everything else falls through unchanged below.
app.get('/health', (_req, res) => res.status(200).send('ok'));

app.use(compression({ threshold: 0 }));
app.use(express.json());

// ── /api/join ─────────────────────────────────────────────────────────────
// Receives the opt-in form payload, shapes it for GHL, and forwards it.
// The webhook URL lives only in process.env — never in client HTML or JS.
app.post('/api/join', async (req, res) => {
  const webhookUrl = process.env.GHL_OPTIN_WEBHOOK_URL;

  if (!webhookUrl) {
    // No webhook configured — treat as success so the UI still works.
    console.warn('[/api/join] GHL_OPTIN_WEBHOOK_URL not set; skipping forward.');
    return res.json({ ok: true, skipped: true });
  }

  const body = req.body ?? {};

  // Shape payload per the GHL webhook field spec.
  const payload = {
    source:        'join-lander',
    firstName:     String(body.firstName  ?? '').trim(),
    lastName:      String(body.lastName   ?? '').trim(),
    email:         String(body.email      ?? '').trim(),
    phone:         String(body.phone      ?? '').trim(),
    neighborhood:  String(body.neighborhood ?? '').trim(),
    writeInPledge: body.commitVote === true || body.commitVote === 'on' || body.commitVote === 'true',
    smsConsent:    body.smsOptIn   === true || body.smsOptIn   === 'on' || body.smsOptIn   === 'true',
  };

  try {
    const ghlRes = await fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (!ghlRes.ok) {
      console.error('[/api/join] GHL returned', ghlRes.status);
      return res.status(502).json({ ok: false, error: 'upstream_error' });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('[/api/join] fetch failed:', err.message);
    return res.status(500).json({ ok: false, error: 'network_error' });
  }
});

// ── /api/volunteer ────────────────────────────────────────────────────────
// Receives volunteer sign-up submissions and forwards to GHL.
app.post('/api/volunteer', async (req, res) => {
  const webhookUrl = process.env.GHL_OPTIN_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('[/api/volunteer] GHL_OPTIN_WEBHOOK_URL not set; skipping forward.');
    return res.json({ ok: true, skipped: true });
  }

  const body = req.body ?? {};

  const payload = {
    source:    'volunteer-form',
    firstName: String(body.firstName ?? '').trim(),
    lastName:  String(body.lastName  ?? '').trim(),
    email:     String(body.email     ?? '').trim(),
    phone:     String(body.phone     ?? '').trim(),
    howHelp:   String(body.howHelp   ?? '').trim(),
  };

  try {
    const ghlRes = await fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (!ghlRes.ok) {
      console.error('[/api/volunteer] GHL returned', ghlRes.status);
      return res.status(502).json({ ok: false, error: 'upstream_error' });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('[/api/volunteer] fetch failed:', err.message);
    return res.status(500).json({ ok: false, error: 'network_error' });
  }
});

// ── /api/endorse ──────────────────────────────────────────────────────────
// Receives endorsement form submissions for campaign review.
// NEVER auto-publishes — payload is forwarded to the configured webhook only.
// The campaign manually adds approved endorsements to site.ts.
app.post('/api/endorse', async (req, res) => {
  const webhookUrl = process.env.ENDORSEMENT_WEBHOOK_URL;

  const body = req.body ?? {};
  const payload = {
    source:       'endorsement-form',
    fullName:     String(body.fullName    ?? '').trim(),
    email:        String(body.email       ?? '').trim(),
    neighborhood: String(body.neighborhood ?? '').trim(),
    endorsement:  String(body.endorsement ?? '').trim(),
    publishConsent: body.publishConsent === true || body.publishConsent === 'on' || body.publishConsent === 'true',
    submittedAt:  new Date().toISOString(),
  };

  console.log('[/api/endorse] submission received from', payload.email || '(no email)');

  if (!webhookUrl) {
    console.warn('[/api/endorse] ENDORSEMENT_WEBHOOK_URL not set — logged only, not forwarded.');
    return res.json({ ok: true, skipped: true });
  }

  try {
    const hookRes = await fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    if (!hookRes.ok) {
      console.error('[/api/endorse] webhook returned', hookRes.status);
      return res.status(502).json({ ok: false, error: 'upstream_error' });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error('[/api/endorse] fetch failed:', err.message);
    return res.status(500).json({ ok: false, error: 'network_error' });
  }
});

// ── Static files ───────────────────────────────────────────────────────────
// Serve dist/ with long-cache for hashed assets, shorter for HTML/sitemap.
app.use('/_astro', express.static(path.join(__dirname, 'dist/_astro'), {
  maxAge: '1y', immutable: true,
}));

app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '10m',
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    }
  },
}));

// SPA-style fallback — serve 404.html or root index if path not found.
app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'dist', '404.html'),
    (err) => { if (err) res.status(404).send('Not found'); });
});

// ── Start ──────────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT ?? '5000', 10);
const HOST = process.env.HOST ?? '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
