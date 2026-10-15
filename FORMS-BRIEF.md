# Build brief: make every website form deliver into the GHL CRM (+ Woodstock Vote Express)

Written 13 Oct 2026. Election Day is Tue 3 Nov 2026. Treat as urgent; do not break the live site.

## Why this exists

Every form on meghannreimondo.com has been silently failing. server.mjs forwards /api/join,
/api/volunteer and /api/endorse to the GHL webhook URL in GHL_OPTIN_WEBHOOK_URL. That URL is
live but answers {"status":"Success: test request received"} - GHL treats it as a test and
discards the payload. The server sees HTTP 200, returns ok:true, the visitor sees a thank-you,
and nothing reaches the CRM. Zero web submissions have ever arrived.

Worse: when the env var is missing the routes return {ok:true, skipped:true}, a deliberate fake
success. That pattern must be removed everywhere.

## The new approach

Stop using the inbound webhook. Create/update contacts directly through the GHL API v2. It is
free (the inbound-webhook trigger is premium, billed per execution) and deterministic.

New env vars (added to Replit Secrets by Bryan; code must handle their absence):
- GHL_PIT          GHL Private Integration token (Bearer)
- GHL_LOCATION_ID  3OJzYPv7YJ5CCmDukuVu

## Hard rules

1. NEVER return success when the contact was not actually written to GHL.
   - GHL_PIT or GHL_LOCATION_ID missing -> 503 {ok:false,error:"not_configured"} + console.error
   - GHL returns non-2xx -> 502 {ok:false,error:"upstream_error"} + log status and body
   - fetch throws -> 500 {ok:false,error:"network_error"}
   Delete every "skipped: true" / treat-as-success branch.
2. Every front-end form must show a real, visible error when the POST fails, and offer a mailto:
   fallback to the campaign address. Never reveal the thank-you panel on a failed POST.
3. Never log or echo the token.
4. Do not restyle existing pages beyond what the change needs.

## Server work (server.mjs)

Add one shared helper and route everything through it:

  const GHL_API = 'https://services.leadconnectorhq.com';

  async function ghlUpsert({ firstName, lastName, email, phone, tags, source, note }) {
    const token = process.env.GHL_PIT;
    const locationId = process.env.GHL_LOCATION_ID;
    if (!token || !locationId) { const e = new Error('not_configured'); e.code='not_configured'; throw e; }
    const headers = {
      Authorization: 'Bearer ' + token,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const res = await fetch(GHL_API + '/contacts/upsert', {
      method: 'POST', headers,
      body: JSON.stringify({ locationId, firstName, lastName, email, phone, tags, source }),
    });
    // non-2xx -> throw with code 'upstream_error', logging status + body text
    const data = await res.json();
    const contactId = data?.contact?.id ?? data?.id;
    // Best effort: attach the full answers as a note. A failed note must NOT fail the request.
    if (contactId && note) {
      try {
        await fetch(GHL_API + '/contacts/' + contactId + '/notes', {
          method: 'POST', headers, body: JSON.stringify({ body: note }),
        });
      } catch (err) { console.error('[ghl] note failed:', err.message); }
    }
    return contactId;
  }

At least one of email or phone must be present or GHL cannot dedupe: validate and return 400.

Routes - rewrite the three that exist, add two:

  POST /api/join      source join-lander       tags: website-lead, form-join
                      (+ write-in-pledge if commitVote, + sms-opt-in if smsOptIn)
  POST /api/volunteer source volunteer-form    tags: website-lead, form-volunteer
  POST /api/survey    source community-survey  tags: website-lead, form-survey        [NEW]
  POST /api/endorse   source endorsement-form  tags: website-lead, form-endorsement
  POST /api/ride      source vote-express      tags: website-lead, form-ride, vote-express  [NEW]

The note body carries everything that is not a contact field: neighborhood, howHelp, the six
survey answers with their question text, the endorsement text and publish consent, and all ride
details. Keep ENDORSEMENT_WEBHOOK_URL as an optional extra forward if set, but the GHL upsert is
now the primary path for endorsements too.

Cap every incoming string (e.g. 2000 chars) and set a body-size limit on express.json() so a long
paste cannot blow up a note.

## Front-end work

- src/pages/survey.astro: POST JSON to /api/survey instead of INTEGRATIONS.surveyEndpoint. Keep
  the mailto: path ONLY as the failure fallback, never as the normal route.
- src/pages/join.astro, volunteer.astro, endorsements.astro: on a non-ok response show a visible
  error plus the mailto fallback; do not reveal the thank-you panel.
- src/data/site.ts INTEGRATIONS: the four empty webhook strings are now dead. Remove them or leave
  a comment saying the server talks to the GHL API directly and these are unused.

## New page: /vote-express (Woodstock Vote Express)

Meghann's own request, 13 Oct 2026, in her words:
"Our team wants to help ensure that every voter who needs assistance getting to the polls on
Election Day has a way to get there and safely return home... residents can request a ride through
what we're thinking of calling the Woodstock Vote Express. Ideally, residents would be able to
select a preferred time window on Election Day and provide their name, phone number, email address,
and polling location. Once submitted, they would receive a message letting them know that a member
of our team will be in touch to confirm their transportation arrangements. This service would be
available to everyone, regardless of who they choose to vote for. There are no political
expectations or strings attached."

The copy must carry that last point plainly: open to every voter, no strings, neighbours helping
neighbours.

Fields:
- Full name (required)
- Phone (required)
- Email (required)
- Pickup address in Woodstock (required). NOT in Meghann's list - added because you cannot collect
  someone without it. Flag this addition in your report.
- Polling location (required, select):
    Woodstock Community Center, 56 Rock City Rd (districts 1, 4, 7, 8)
    Lake Hill Firehouse (district 2)
    Zena Firehouse (districts 3, 6)
    Wittenberg Firehouse (districts 5, 9)
    I'm not sure - please help me find it
- Preferred time window on Election Day, Tue 3 Nov (required, select):
    6:00-9:00 am / 9:00 am-12:00 pm / 12:00-3:00 pm / 3:00-6:00 pm / 6:00-9:00 pm / Flexible
- Need a ride home as well? (yes/no, default yes)
- Number of passengers (default 1)
- Accessibility or mobility needs (optional free text: wheelchair, walker, help walking)
- Anything else we should know (optional)

NO SMS consent checkbox on this form. Political SMS needs a Campaign Verify token plus A2P
re-registration (about 27 days) and only 21 days remain, so texting is not available. The
confirmation copy must say a team member will be in touch BY PHONE OR EMAIL. Do not promise a text.

Success message: "Thanks - your ride request is in. A member of our team will call or email you to
confirm your pickup." Include the campaign phone 845-546-7924 for anything urgent.

Add /vote-express to the nav, link it from /how-to-vote and the homepage, and include it in the
sitemap.

## When done

Run npm run build and confirm it builds clean. Report: files changed, routes now live, and anything
you could not do. Do NOT deploy or Republish - Bryan does that once the secrets are set.
