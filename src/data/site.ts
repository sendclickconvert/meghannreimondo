// Candidate Config — SINGLE SOURCE OF TRUTH for the Meghann Reimondo campaign site.
// This is a POLITICAL CAMPAIGN, not a company. No storefront/NAP/service-area data.
// HARD RULE: nothing is fabricated. Every unconfirmed value is the literal string "TODO".
// Confirmed values (safe to use): candidate name, office, race type "write-in",
// election date 2026-11-03, brand navy #012566 + red #D60F29, tagline "Leading with Heart",
// domains meghannreimondo.com (primary) + megforwoodstock.com (legacy).

export const site = {
  candidate: {
    name: "Meghann Reimondo",
    office: "Woodstock Town Supervisor",
    raceType: "write-in",
    electionDate: "2026-11-03",
  },
  // Committee name provided by the campaign in the /join work order (8 Aug 2026).
  // Treasurer still unconfirmed → stays TODO. CONFIRM this is the legally REGISTERED
  // committee name before launch (it renders in the site-wide "Paid for by" disclaimer + schema).
  committee: { registeredName: "Friends of Meghann Reimondo", treasurer: "TODO" },
  legal: { paidForBy: "Friends of Meghann Reimondo" }, // site-wide footer disclaimer
  contact: { email: "TODO", phone: "TODO" },
  domains: { primary: "meghannreimondo.com", legacy: "megforwoodstock.com" },
  social: { facebook: "TODO", instagram: "TODO" }, // sameAs targets
  brand: {
    navy: "#012566",
    red: "#D60F29",
    tagline: "Leading with Heart",
    logo: "/images/logo.webp",        // official circular badge (transparent corners)
    favicon: "/images/favicon-32.png", // derived from the badge
  },
  media: { heroVideo: "TODO" },
  url: "https://meghannreimondo.com",
  DEMO_MODE: true,
} as const;

// Convenience re-exports used across layout/components (derive from `site`, never duplicate).
export const DEMO_MODE = site.DEMO_MODE;

// Helper: is a config value still an unfilled placeholder?
export const isTodo = (v: string | undefined | null): boolean =>
  v === undefined || v === null || v.trim() === '' || v.trim().toUpperCase() === 'TODO';

// Vendor-neutral integration plumbing (used by /api/submit-form). Empty until wired.
export const INTEGRATIONS = {
  formWebhook: '', // native fallback endpoint target for /api/submit-form
  // /join opt-in form target. Leave '' to POST to the built-in /api/submit-form route
  // (which returns success in demo). Drop the GHL webhook URL here to POST direct — no markup change.
  optInEndpoint: '', // TODO — GHL opt-in webhook URL
  // /survey Community Survey form target. Same pattern as optInEndpoint: leave '' to POST to
  // the built-in /api/submit-form route (returns success in demo); drop the GHL webhook URL
  // here to POST direct — no markup change.
  surveyEndpoint: '', // TODO — GHL survey webhook URL
  // Exit-intent popup CTA target → the Community Survey page (src/pages/survey.astro).
  surveyPath: '/survey',
} as const;

// Primary navigation — flat, 9 pages. Write-In page is the strategic spine (built first + fullest).
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'How to Write In', href: '/how-to-vote' },
  { label: 'Meet Meghann', href: '/about' },
  { label: 'Issues', href: '/issues' },
  { label: 'Endorsements', href: '/endorsements' },
  { label: 'Events', href: '/events' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Contribute', href: '/contribute' },
  { label: 'Contact', href: '/contact' },
] as const;
