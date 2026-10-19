const GHL_API = 'https://services.leadconnectorhq.com';
const text = (value) => typeof value === 'string' ? value.trim().slice(0, 2000) : '';
const checked = (value) => value === true || value === 'on' || value === 'true';
const slug = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
const failure = (code) => Object.assign(new Error(code), { code });

// Do not log credentials, including when an upstream body echoes them.
function safeBody(body) {
  const token = process.env.GHL_PIT;
  return token ? body.replaceAll(token, '[redacted]') : body;
}

export async function ghlUpsert({ firstName, lastName, email, phone, tags, source, note }) {
  const token = process.env.GHL_PIT;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) throw failure('not_configured');
  const headers = {
    Authorization: 'Bearer ' + token,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  let response;
  try {
    response = await fetch(GHL_API + '/contacts/upsert', {
      method: 'POST', headers, signal: AbortSignal.timeout(15000),
      body: JSON.stringify({ locationId, firstName, lastName, email, phone, tags, source }),
    });
  } catch { throw failure('network_error'); }
  const body = await response.text();
  if (!response.ok) {
    console.error('[ghl] upsert rejected:', response.status, safeBody(body));
    throw failure('upstream_error');
  }
  let data;
  try { data = JSON.parse(body); } catch { throw failure('upstream_error'); }
  const contactId = data?.contact?.id ?? data?.id;
  // A generic HTTP-200 acknowledgement is NOT proof that a contact was saved.
  if (typeof contactId !== 'string' || !contactId.trim()) {
    console.error('[ghl] upsert returned no contact ID');
    throw failure('upstream_error');
  }
  if (note) {
    try {
      const result = await fetch(GHL_API + '/contacts/' + encodeURIComponent(contactId) + '/notes', {
        method: 'POST', headers, signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ body: note }),
      });
      if (!result.ok) console.error('[ghl] note failed:', result.status, safeBody(await result.text()));
    } catch { console.error('[ghl] note failed: network_error'); }
  }
  return contactId;
}

const surveyQuestions = {
  q1: 'What are the three most important issues facing Woodstock today?',
  q2: 'Which deserves the most immediate attention?',
  q3: 'What do you love most about Woodstock?',
  q4: "What concerns you most about Woodstock's future?",
  q5: 'If you could improve one thing over the next four years, what would it be?',
  q6: 'Is there something Town government could do better?',
};
const sources = {
  join: ['join-lander', 'form-join'],
  volunteer: ['volunteer-form', 'form-volunteer'],
  survey: ['community-survey', 'form-survey'],
  endorse: ['endorsement-form', 'form-endorsement'],
  ride: ['vote-express', 'form-ride'],
};
export const pollingLocations = [
  'Woodstock Community Center, 56 Rock City Rd (districts 1, 4, 7, 8)',
  'Lake Hill Firehouse (district 2)',
  'Zena Firehouse (districts 3, 6)',
  'Wittenberg Firehouse (districts 5, 9)',
  "I'm not sure - please help me find it",
];
export const timeWindows = [
  '6:00-9:00 am', '9:00 am-12:00 pm', '12:00-3:00 pm',
  '3:00-6:00 pm', '6:00-9:00 pm', 'Flexible',
];

export function registerForms(app) {
  for (const [kind, [source, tag]] of Object.entries(sources)) {
    app.post('/api/' + kind, async (req, res) => {
      const raw = req.body;
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        return res.status(400).json({ ok: false, error: 'invalid_payload' });
      }
      const fields = Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, text(value)]));
      const name = fields.fullName || fields.name || '';
      const [given = '', ...rest] = name.split(/\s+/);
      const firstName = fields.firstName || given;
      const lastName = fields.lastName || rest.join(' ');
      const email = fields.email || '';
      const phone = fields.phone || '';
      if (!email && !phone) return res.status(400).json({ ok: false, error: 'contact_required' });
      const tags = ['website-lead', tag];
      const notes = [source, `Submitted: ${new Date().toISOString()}`];
      // Where the visitor came from: ?utm_source=facebook on a social link becomes a src-facebook tag and a note line.
      const utmSource = slug(fields.utm_source);
      if (utmSource) tags.push('src-' + utmSource);
      const utmLine = ['utm_source', 'utm_medium', 'utm_campaign'].map(k => (fields[k] ? `${k}: ${fields[k]}` : '')).filter(Boolean).join(' | ');
      if (utmLine) notes.push(utmLine);
      if (fields.page) notes.push(`Page: ${fields.page}`);
      if (slug(fields.page) === 'vote') tags.push('lp-vote');
      if (kind === 'join') {
        if (checked(raw.commitVote)) tags.push('write-in-pledge');
        if (checked(raw.smsOptIn)) tags.push('sms-opt-in');
        notes.push(`Neighborhood: ${fields.neighborhood || ''}`,
          `Write-in pledge: ${checked(raw.commitVote)}`, `SMS consent: ${checked(raw.smsOptIn)}`);
      }
      if (kind === 'volunteer') notes.push(`How would you like to help? ${fields.howHelp || ''}`);
      if (kind === 'survey') {
        if (Object.keys(surveyQuestions).some(key => !fields[key])) {
          return res.status(400).json({ ok: false, error: 'answers_required' });
        }
        for (const [key, question] of Object.entries(surveyQuestions)) notes.push(`${question}\n${fields[key]}`);
        notes.push(`Campaign updates opt-in: ${checked(raw.updatesOptIn)}`);
        if (checked(raw.updatesOptIn)) tags.push('survey-updates-optin');
        if (slug(fields.q2)) tags.push('survey-priority-' + slug(fields.q2));
        notes.unshift(`Survey response. Top priority: ${fields.q2}. Updates opt-in: ${checked(raw.updatesOptIn) ? 'yes' : 'no'}.`);
      }
      if (kind === 'endorse') {
        if (!name || !fields.endorsement || !checked(raw.publishConsent)) {
          return res.status(400).json({ ok: false, error: 'endorsement_and_consent_required' });
        }
        notes.push(`Neighborhood: ${fields.neighborhood || ''}`, `Endorsement: ${fields.endorsement}`,
          `Publish consent: ${checked(raw.publishConsent)}`, `SMS consent: ${checked(raw.smsOptIn)}`,
          `Email consent: ${checked(raw.emailOptIn)}`);
      }
      if (kind === 'ride') {
        const passengers = raw.passengers === undefined ? 1 : Number(raw.passengers);
        if (!name || !phone || !email || !fields.pickupAddress ||
            !pollingLocations.includes(fields.pollingLocation) || !timeWindows.includes(fields.timeWindow) ||
            !Number.isSafeInteger(passengers) || passengers < 1 ||
            (raw.rideHome !== undefined && ![true, false, 'yes', 'no'].includes(raw.rideHome))) {
          return res.status(400).json({ ok: false, error: 'ride_details_required' });
        }
        tags.push('vote-express');
        notes.push('Election Day: Tuesday, November 3, 2026', `Pickup address: ${fields.pickupAddress}`,
          `Polling location: ${fields.pollingLocation}`, `Preferred time window: ${fields.timeWindow}`,
          `Ride home: ${raw.rideHome === undefined || raw.rideHome === true || raw.rideHome === 'yes' ? 'Yes' : 'No'}`,
          `Passengers: ${passengers}`, `Accessibility or mobility needs: ${fields.accessibility || ''}`,
          `Anything else: ${fields.otherDetails || ''}`);
      }
      try {
        await ghlUpsert({ firstName, lastName, email, phone, tags, source, note: notes.join('\n\n') });
        // Optional secondary delivery must never replace the primary CRM write.
        if (kind === 'endorse' && process.env.ENDORSEMENT_WEBHOOK_URL) {
          try {
            const result = await fetch(process.env.ENDORSEMENT_WEBHOOK_URL, {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              signal: AbortSignal.timeout(10000),
              body: JSON.stringify({ ...fields, source, publishConsent: checked(raw.publishConsent) }),
            });
            if (!result.ok) console.error('[endorse] optional forward failed:', result.status);
          } catch { console.error('[endorse] optional forward failed: network_error'); }
        }
        return res.json({ ok: true });
      } catch (err) {
        const code = ['not_configured', 'upstream_error', 'network_error'].includes(err.code) ? err.code : 'network_error';
        console.error(`[${source}] ${code}`);
        return res.status({ not_configured: 503, upstream_error: 502, network_error: 500 }[code]).json({ ok: false, error: code });
      }
    });
  }
}
