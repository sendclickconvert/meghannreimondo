// Serves the static Astro build; all form contact writes use the GHL API.
import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerForms } from './src/lib/ghl-forms.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.get('/health', (_req, res) => res.status(200).send('ok'));
app.use(compression({ threshold: 0 }));
app.use(express.json({ limit: '32kb' }));
registerForms(app);
app.use((err, _req, res, next) => {
  if (err.type === 'entity.too.large') return res.status(413).json({ ok: false, error: 'payload_too_large' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ ok: false, error: 'invalid_json' });
  next(err);
});
app.use('/_astro', express.static(path.join(__dirname, 'dist/_astro'), {
  maxAge: '1y', immutable: true,
}));
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '10m',
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  },
}));
app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'dist', '404.html'),
    (err) => { if (err) res.status(404).send('Not found'); });
});
const PORT = parseInt(process.env.PORT ?? '5000', 10);
const HOST = process.env.HOST ?? '0.0.0.0';
app.listen(PORT, HOST, () => console.log(`Server listening on http://${HOST}:${PORT}`));
