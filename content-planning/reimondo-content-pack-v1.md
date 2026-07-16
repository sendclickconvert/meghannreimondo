# Reimondo Campaign — Content Pack v1 (buildable-now layer)

**Purpose:** copy + specs that need **zero candidate input**, ready to wire into the existing bones while we wait on Meghann's materials. Everything that depends on her (bio, positions, endorsements, etc.) is listed as TODO in §6, not written.

**Build context (carries from the structure+schema spec):**
- **Write-in** campaign, Meghann Reimondo for **Woodstock Town Supervisor**, general election **Nov 3, 2026**. Opponent: incumbent Anula Courtis. (Race confirmed current as of 07/16/2026.)
- **No `LocalBusiness` schema.** Anchor entities: `Person` (Meghann) + `Organization` (committee).
- **No-fabrication rule is absolute.** Nothing below invents a position, quote, credential, or endorsement.
- Correct spelling is load-bearing everywhere: **Meghann Reimondo** (Meghann, two n's; Reimondo).

---

## 1. Site-wide write-in CTA + hero (ready to wire)

**Hero (Home):**
- Headline: **Meghann isn't on the ballot — you have to write her in.**
- Subhead: A vote for Meghann Reimondo for Woodstock Town Supervisor only counts if you write her name in and fill the oval. Here's the 10-second how-to. → [button: How to Write Her In → `/how-to-vote/`]

**Recurring CTA block (repeats on every page — the "spelled exactly right" reminder):**
> ✍️ **Write in: Meghann Reimondo** — for Woodstock Town Supervisor.
> Spell it exactly: **M-E-G-H-A-N-N  R-E-I-M-O-N-D-O**, and fill in the oval.
> [How to write her in →]

Keep this block visually consistent site-wide (the way "Schedule an Assessment" repeated on GXB), because for a write-in it's the whole ballgame, not just a conversion nudge.

---

## 2. `/how-to-vote/` — "How to Write In Meghann" (CROWN JEWEL)

**Schema:** `HowTo` + `FAQPage` (both expanded in static HTML — no accordions, per doctrine). This is the one page where the schema earns its keep: it's exactly what voice/AI answers pull for "how do I write in a candidate in Woodstock."

**Intro copy:**
Because Meghann is a write-in candidate, her name will **not** be printed on the ballot. The only way your vote for her counts is if you write her in yourself. It takes about ten extra seconds — here's exactly how, step by step.

**Steps — voting in person on a paper ballot:**
1. Sign in and get your paper ballot from the poll worker, like normal.
2. Take your ballot to the privacy booth. Vote the other races however you like.
3. Find the **Town Supervisor** contest. Beneath the printed candidate name(s) there is a **write-in space with its own oval**.
4. On the write-in line, write **Meghann Reimondo** — spelled exactly: **M-E-G-H-A-N-N  R-E-I-M-O-N-D-O**.
5. **Fill in the oval** for that write-in line completely, using the pen provided. Both parts matter — the written name *and* the filled oval.
6. Don't use an X or a checkmark, don't circle the oval, don't sign your name anywhere on the ballot, and don't fold it.
7. Carry your ballot to the scanner and insert it to cast your vote. The scanner will confirm it was counted.

**Using the accessible Ballot Marking Device (BMD):**
On the Town Supervisor screen, select **Write-In**, type **Meghann Reimondo** on the keypad, confirm the name at the top of the screen, and continue voting. A poll worker can walk you through it if you ask.

**Early voting & mail-in / absentee ballots:**
Same idea — in the Town Supervisor section, write **Meghann Reimondo** on the write-in line and fill the oval, then follow the return instructions printed on your ballot envelope.

**FAQ (visible Q&A, drives the FAQPage schema):**
- **Is Meghann on the ballot?** No. She's a **write-in** for Town Supervisor, so you have to write her name in for your vote to count.
- **What exactly do I write?** Meghann Reimondo — and spell it exactly right: M-E-G-H-A-N-N  R-E-I-M-O-N-D-O.
- **Do I have to fill in the oval too?** Yes. To be safe, always do both: write the name on the line **and** fill in the oval next to it.
- **Where is the write-in line?** In the Town Supervisor contest, below the printed candidate(s). *(See build note.)*
- **Can I still vote in every other race?** Yes — writing Meghann in for supervisor doesn't affect any of your other selections.

> **⚠️ BUILD NOTE — verify before publish (do not invent):** The steps above reflect New York's standard optical-scan write-in procedure and are accurate statewide. Confirm two Ulster-specific details against the **official Ulster County BOE sample ballot for Woodstock** once it's published: (1) the exact placement/label of the write-in line in the Town Supervisor contest, and (2) that Ulster's scanner counts the write-in with the oval filled as described. Until confirmed, keep the "Where is the write-in line" answer general as written.

---

## 3. Join Us / Volunteer (`/join/`) — ready to wire

**Copy:** Meghann's write-in campaign runs on neighbors showing up. Tell us how you can help.

**Form fields (from the estimate scope, GHL-connected):**
- Name (first / last)
- Email *(opt-in)*
- Mobile *(separate SMS-consent checkbox — see A2P note)*
- ZIP / election district
- How I can help *(multi-select):* ☐ I can take a lawn sign ☐ I can go door-to-door ☐ I can attend an event ☐ I can host an event ☐ Keep me on the email list

> **A2P note:** the SMS-consent checkbox must be **separate** from the email opt-in and **not required** to submit. BOE-sourced phone numbers are **not** texting consent — only people who check this box may be texted. This is the opt-in source that unquarantines a contact for SMS.

**Schema:** `WebPage` (conversion page, no special schema).

---

## 4. Donate (`/contribute/`) — shell ready, compliance TODO

**Copy:** Chip in to help Meghann reach every Woodstock voter before November 3. → [Stripe]

**Schema:** `WebPage`.

> **BLOCKED — do not publish live donations until confirmed:** NY campaign-finance rules require the **registered committee name**, and contribution disclaimers/limits differ for a town-office committee. Need the committee's NY BOE registration details before wiring Stripe live (contribution limit language, employer/occupation capture threshold, and the "Paid for by" attribution below). Leave as a "coming soon / contact us to contribute" shell until then.

---

## 5. "Paid for by ___" disclaimer (legal — sitewide footer)

Every page footer needs the attribution, wired to config:

> **Paid for by [COMMITTEE NAME — TODO].**

- New York requires this attribution on political communications, so **the site cannot go live without it.**
- The **clerk-race** committee was "Committee to Elect Meghann Reimondo" (per the old megforwoodstock.com). **Do not assume it carries over** — confirm the registered committee name for the **supervisor** race against her NY BOE filing. Placeholder stays until confirmed.

---

## 6. Placeholder registry — blocked on Meghann (intake)

Wire these as TODO tokens in `site.ts`; do not fill from news articles or the old clerk site (different office, and her supervisor platform is her own to state):

| Token | Page | Notes |
|---|---|---|
| `candidate_statement` | Home / Bio | Her own words, supervisor race |
| `bio_record` | Bio | Background, experience she wants featured |
| `credentials_education` | Bio | Verified only |
| `family_community` | Bio | Only what she wants public |
| `issue_1..5` | Issues | Her actual supervisor positions |
| `plan_of_action_1..5` | Plan | Her priorities |
| `endorsements[]` | Endorsements | List **+ permission to publish each** |
| `events[]` | Media/Calendar | Real dates/locations only |
| `outreach_video` | Home | Her video to Woodstock |
| `social_handles` | Global | FB / IG / NextDoor / BlueSky / LinkedIn |
| `committee_name` | Footer / Donate | Legal — see §5 |
| `contact_phone` / `contact_email` | Contact | Campaign line (not a personal cell) |

---

## Separate track (not website content): GHL voter-file import

The Ulster BOE voter-fields file is the **CRM** workstream, not site copy. Plan already set: quarantine in Meghann's sub-account, import everyone **DND for SMS/email** until they opt in through the site funnels (§3). I can turn that .txt into the actual GHL custom-field map whenever you want it — separate deliverable.
