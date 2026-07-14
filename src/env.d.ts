/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly TURNSTILE_SITE: string;
  readonly TURNSTILE_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
