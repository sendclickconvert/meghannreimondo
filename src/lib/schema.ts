// ============================================================
// CENTRALIZED JSON-LD BUILDERS — one validated graph per page.
// A political CAMPAIGN, not a company: no storefront schema, no
// rating markup, no testimonial markup, no service-area schema. Nothing
// here fabricates data — unconfirmed values stay honest placeholders.
// ============================================================

import { site, isTodo } from '../data/site';

const BASE = site.url;
const PERSON_ID = `${BASE}/#meghann`;
const ORG_ID = `${BASE}/#committee`;
const WEBSITE_ID = `${BASE}/#website`;

// Absolute canonical for a route path (leading slash, no trailing slash).
export function abs(path: string): string {
  if (path === '/') return BASE + '/';
  return BASE + (path.startsWith('/') ? path : `/${path}`);
}

// sameAs targets from social — included ONLY when a real URL is set (never while "TODO").
function sameAs(): string[] {
  return [site.social.facebook, site.social.instagram].filter(
    (v) => !isTodo(v),
  ) as string[];
}

// Committee Organization name — honest placeholder while the registered name is unknown.
function committeeName(): string {
  return isTodo(site.committee.registeredName)
    ? '[COMMITTEE NAME — TODO]'
    : site.committee.registeredName;
}

// ---- Core entity nodes (shared @id anchors, wired to each other) ----

export function personNode() {
  const sa = sameAs();
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.candidate.name,
    memberOf: { '@id': ORG_ID },
    ...(sa.length ? { sameAs: sa } : {}),
  };
}

export function committeeOrgNode() {
  const sa = sameAs();
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: committeeName(),
    url: BASE,
    member: { '@id': PERSON_ID },
    ...(sa.length ? { sameAs: sa } : {}),
  };
}

export function webSiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: BASE,
    name: `${site.candidate.name} for ${site.candidate.office}`,
    // Person is the primary entity the site is about.
    mainEntity: { '@id': PERSON_ID },
  };
}

// ---- Graph wrapper ----

export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

// ---- BreadcrumbList (interior pages) ----

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

// ---- Page-type builders ----

// Home: Person (primary) + committee Organization + WebSite. No storefront schema.
export function homeGraph() {
  return graph([personNode(), committeeOrgNode(), webSiteNode()]);
}

// Generic WebPage; optionally authored by Meghann (Person).
export function webPage(opts: {
  name: string;
  description: string;
  path: string;
  author?: boolean;
  extraNodes?: object[];
}) {
  const page = {
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    ...(opts.author ? { author: { '@id': PERSON_ID } } : {}),
  };
  const nodes: object[] = [page];
  if (opts.author) nodes.push(personNode());
  if (opts.extraNodes) nodes.push(...opts.extraNodes);
  return graph(nodes);
}

// ProfilePage (Meet Meghann) — mainEntity is the Person.
export function profilePage(opts: { name: string; description: string; path: string }) {
  return graph([
    {
      '@type': 'ProfilePage',
      name: opts.name,
      description: opts.description,
      url: abs(opts.path),
      mainEntity: { '@id': PERSON_ID },
    },
    personNode(),
    committeeOrgNode(),
  ]);
}

// HowTo (write-in mechanics). Steps are generic NY paper/optical-scan write-in facts.
export function howTo(opts: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// FAQPage — answers must be verbatim-matched to the on-page static HTML.
export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// Event node — organizer is the committee Organization. location is a Place.
export function eventNode(ev: {
  name: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  address?: string;
  url?: string;
}) {
  return {
    '@type': 'Event',
    name: ev.name,
    startDate: ev.startDate,
    ...(ev.endDate ? { endDate: ev.endDate } : {}),
    ...(ev.url ? { url: ev.url } : {}),
    location: {
      '@type': 'Place',
      name: ev.locationName,
      ...(ev.address ? { address: ev.address } : {}),
    },
    organizer: { '@type': 'Organization', '@id': ORG_ID, name: committeeName() },
  };
}
