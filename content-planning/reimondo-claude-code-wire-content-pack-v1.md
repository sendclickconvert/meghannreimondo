# Claude Code — Reimondo Site: Wire Content Pack v1

**Paste this into a Claude Code session opened in the existing Meghann Reimondo campaign repo** (the scaffolded "bones"). Have `reimondo-content-pack-v1.md` present in the repo (root is fine) so this session can read it.

---

## Task
Wire the buildable-now content from `reimondo-content-pack-v1.md` into this repo. Do the work on a new branch `content-pack-v1`, commit in logical chunks, and push — **do not merge to main.** Leave main clean for review.

## Ground rules (read before writing any code)
- This is a **write-in** campaign site: Meghann Reimondo, Woodstock Town Supervisor, general election Nov 3 2026. It is **NOT** a local-business build.
- **Emit NO `LocalBusiness` schema anywhere.** Follow the schema map below exactly.
- **No fabrication.** Only wire the copy that is written in the content pack. Everything candidate-specific stays a **TODO token** in site config — do not fill it from your own knowledge, the web, news articles, or the old clerk site (megforwoodstock.com). Different office, her words to write.
- **Match this repo's existing conventions.** Read the current Astro structure, layout, component patterns, and config-file location first; reuse them. Don't introduce new patterns or restructure.
- All internal links **root-relative** (survive domain cutover).
- Correct spelling everywhere: **Meghann Reimondo** (two n's; Reimondo).

## Files to create / update
1. **Write-in page — crown jewel.** Route `/how-to-vote/`. Use §2 copy from the pack (intro, in-person steps, BMD version, early/mail-in version, FAQ). Emit `HowTo` + `FAQPage` JSON-LD. **FAQ questions must be visible in static HTML — no accordions.** Preserve the "⚠️ BUILD NOTE" as an HTML comment in the source so it isn't lost (Ulster sample-ballot position must be verified before publish).
2. **Write-in CTA component** (§1). Build one reusable component with the exact-spelling reminder and render it site-wide via the base layout (above the footer).
3. **Home hero** (§1). Headline + subhead + button → `/how-to-vote/`. Wire `Person` + `Organization` + `WebSite` JSON-LD on the homepage.
4. **Volunteer page** `/join/` (§3). Copy + form fields. SMS-consent checkbox is **separate** from email opt-in and **not required** to submit. GHL form embed as a TODO placeholder (embed id unknown).
5. **Donate shell** `/contribute/` (§4). "Coming soon / contact to contribute" shell only. **Do NOT wire Stripe live** — blocked on committee registration.
6. **Footer disclaimer.** "Paid for by {committee_name}" pulled from config; `committee_name` is a TODO token. Site must render the placeholder, not a blank.
7. **Config tokens.** Add every §6 placeholder to the site config (site.ts or the repo's equivalent) as clearly-labeled TODO markers. Do not fill any of them.

If a referenced page (e.g. bio, contact) doesn't exist yet, create a shell that matches repo conventions with TODO content — do not fabricate copy.

## Schema map (enforce)
- **Home:** Person + Organization + WebSite. No LocalBusiness, no AggregateRating.
- **`/how-to-vote/`:** HowTo + FAQPage.
- **Bio page (if present):** ProfilePage → Person.
- **Volunteer / Contribute / Contact:** WebPage.
- **All interior pages:** + BreadcrumbList.
- **Never** emit Review or AggregateRating anywhere.

## Finish
- `git checkout -b content-pack-v1`
- Commit in logical chunks with clear messages.
- Push the branch; open a PR or print the compare URL. **Do not touch main.**
- Print a summary: files changed, components added, and every TODO token added to config.
