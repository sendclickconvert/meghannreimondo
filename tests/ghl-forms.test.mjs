import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { registerForms, pollingLocations, timeWindows } from '../src/lib/ghl-forms.mjs';

const routes = ['join', 'volunteer', 'survey', 'endorse', 'ride'];
const submission = {
  firstName: 'Test', lastName: 'Person', fullName: 'Test Person',
  email: 'test@example.invalid', phone: '8455550100',
  neighborhood: 'Woodstock', howHelp: 'Canvassing', endorsement: 'Test endorsement',
  publishConsent: true, commitVote: true, smsOptIn: true, updatesOptIn: false,
  q1: 'One', q2: 'Water Quality', q3: 'Three', q4: 'Four', q5: 'Five', q6: 'Six',
  pickupAddress: 'Test address', pollingLocation: pollingLocations[0], timeWindow: timeWindows[0],
  rideHome: true, passengers: 1, accessibility: 'Walker', otherDetails: 'Test detail',
};

test('CRM form contract: never acknowledge an unsaved contact', async (t) => {
  // Stub upstream writes; no real CRM contacts are created by these tests.
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };
  const app = express();
  app.use(express.json({ limit: '32kb' }));
  registerForms(app);
  app.use((err, _req, res, _next) => res.status(err.status || 500).json({ ok: false }));
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const post = (route, body = submission) => originalFetch(url + '/api/' + route, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  try {
    delete process.env.GHL_PIT;
    delete process.env.GHL_LOCATION_ID;
    delete process.env.ENDORSEMENT_WEBHOOK_URL;
    await t.test('all five routes return 503 when unconfigured', async () => {
      globalThis.fetch = () => { throw new Error('must not call upstream'); };
      for (const route of routes) {
        const result = await post(route);
        assert.equal(result.status, 503);
        assert.deepEqual(await result.json(), { ok: false, error: 'not_configured' });
      }
    });
    process.env.GHL_PIT = 'dummy-test-token';
    process.env.GHL_LOCATION_ID = 'dummy-test-location';
    await t.test('email or phone is mandatory for every route', async () => {
      for (const route of routes) assert.equal((await post(route, { ...submission, email: '', phone: '' })).status, 400);
    });
    await t.test('upstream non-2xx returns 502 for every route', async () => {
      globalThis.fetch = async () => new Response('rejected', { status: 401 });
      for (const route of routes) {
        const result = await post(route);
        assert.equal(result.status, 502);
        assert.equal((await result.json()).ok, false);
      }
    });
    await t.test('network failures return 500 for every route', async () => {
      globalThis.fetch = async () => { throw new Error('network unavailable'); };
      for (const route of routes) {
        const result = await post(route);
        assert.equal(result.status, 500);
        assert.equal((await result.json()).error, 'network_error');
      }
    });
    await t.test('HTTP 200 without a contact ID and invalid JSON never succeed', async () => {
      for (const body of ['{"status":"Success: test request received"}', 'not json']) {
        globalThis.fetch = async () => new Response(body);
        for (const route of routes) assert.equal((await post(route)).status, 502);
      }
    });
    await t.test('successful upserts carry tags, sources and full answer notes', async () => {
      for (const route of routes) {
        const calls = [];
        globalThis.fetch = async (target, options) => {
          calls.push({ target, options, body: JSON.parse(options.body) });
          return new Response(JSON.stringify({ contact: { id: 'saved-contact' } }));
        };
        const result = await post(route, { ...submission, howHelp: 'a'.repeat(3000) });
        assert.deepEqual(await result.json(), { ok: true });
        assert.equal(calls[0].target, 'https://services.leadconnectorhq.com/contacts/upsert');
        assert.equal(calls[0].options.headers.Version, '2021-07-28');
        assert.equal(calls[0].body.locationId, 'dummy-test-location');
        assert.ok(calls[0].body.tags.includes('website-lead'));
        assert.equal(calls[1].target, 'https://services.leadconnectorhq.com/contacts/saved-contact/notes');
        if (route === 'join') {
          assert.ok(calls[0].body.tags.includes('write-in-pledge'));
          assert.ok(calls[0].body.tags.includes('sms-opt-in'));
        }
        if (route === 'volunteer') assert.ok(!calls[1].body.body.includes('a'.repeat(2001)));
        if (route === 'survey') {
          for (const value of ['What are the three most important issues', 'Which deserves the most immediate attention', 'What do you love most', 'What concerns you most', 'If you could improve', 'Is there something Town government']) {
            assert.ok(calls[1].body.body.includes(value));
          }
          assert.ok(calls[1].body.body.includes('Campaign updates opt-in: false'));
        }
        if (route === 'endorse') assert.ok(calls[1].body.body.includes('Publish consent: true'));
        if (route === 'ride') {
          assert.ok(calls[0].body.tags.includes('vote-express'));
          for (const value of ['Test address', pollingLocations[0], timeWindows[0], 'Ride home: Yes', 'Passengers: 1', 'Walker', 'Test detail']) {
            assert.ok(calls[1].body.body.includes(value));
          }
        }
      }
    });
    await t.test('note failure does not undo a confirmed contact write', async () => {
      for (const throws of [false, true]) {
        globalThis.fetch = async (target) => {
          if (target.endsWith('/notes')) {
            if (throws) throw new Error('note unavailable');
            return new Response('note rejected', { status: 500 });
          }
          return new Response('{"id":"saved-contact"}');
        };
        assert.equal((await post('join')).status, 200);
      }
    });
    await t.test('optional endorsement webhook cannot bypass or invalidate CRM write', async () => {
      process.env.ENDORSEMENT_WEBHOOK_URL = 'https://example.invalid/extra';
      const targets = [];
      globalThis.fetch = async (target) => {
        targets.push(target);
        return target.endsWith('/upsert') ? new Response('{"id":"saved-contact"}') : new Response('failed', { status: 500 });
      };
      assert.equal((await post('endorse')).status, 200);
      assert.equal(targets.at(-1), 'https://example.invalid/extra');
      globalThis.fetch = async (target) => {
        assert.ok(target.endsWith('/upsert'));
        return new Response('rejected', { status: 403 });
      };
      assert.equal((await post('endorse')).status, 502);
    });
    await t.test('required ride details and survey answers are validated', async () => {
      assert.equal((await post('ride', { ...submission, pickupAddress: '' })).status, 400);
      assert.equal((await post('ride', { ...submission, passengers: 0 })).status, 400);
      assert.equal((await post('ride', { ...submission, timeWindow: 'invalid' })).status, 400);
      assert.equal((await post('survey', { ...submission, q6: '' })).status, 400);
    });
    await t.test('oversized payloads are rejected', async () => {
      assert.equal((await post('join', { ...submission, neighborhood: 'a'.repeat(40000) })).status, 413);
    });
  } finally {
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
    await new Promise(resolve => server.close(resolve));
  }
});
