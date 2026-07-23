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
  // Confirmed 7/22/26 (content pack v2): committee filed with NYS.
  committee: { registeredName: "Friends of Meghann Reimondo", treasurer: "TODO" },
  legal: { paidForBy: "Friends of Meghann Reimondo" },
  slogan: `The "write" choice for Town Supervisor`, // her pick — warm + teaches the mechanic
  // [STAGING] campaign inbox placeholder per staged copy v1 — set up this inbox before launch; never her business email.
  contact: { email: "meghann@meghannreimondo.com", phone: "TODO" },
  domains: { primary: "meghannreimondo.com", legacy: "megforwoodstock.com" },
  social: { facebook: "TODO", instagram: "TODO" }, // sameAs targets
  brand: {
    navy: "#012566",
    red: "#D60F29",
    tagline: "Leading with Heart",
    logo: "/images/logo.webp",        // official circular badge (transparent corners)
    favicon: "/images/favicon-32.png", // derived from the badge
  },
  media: {
    heroVideo: "https://player.vimeo.com/video/1212384603", // homepage hero (vimeo.com/1212384603, public)
    headshot: "/images/meghann-reimondo-headshot", // .webp/.jpg — bio portrait + OG card; NOT a full-width hero
    communityPhoto: "/images/woodstock-cleanup-volunteers", // .webp/.jpg — homepage community band
    groupPhoto: "/images/community-lunch-volunteers", // .webp/.jpg — smaller inline placement (bio)
  },
  donateUrl: "TODO", // [STAGING] Stripe Payment Link — account confirmed, link pending
  url: "https://meghannreimondo.com",
  DEMO_MODE: true,
} as const;

// Convenience re-exports used across layout/components (derive from `site`, never duplicate).
export const DEMO_MODE = site.DEMO_MODE;

// Helper: is a config value still an unfilled placeholder?
export const isTodo = (v: string | undefined | null): boolean =>
  v === undefined || v === null || v.trim() === '' || v.trim().toUpperCase() === 'TODO';

// Vendor-neutral integration plumbing. Empty until wired to an external form service.
export const INTEGRATIONS = {
  formWebhook: '', // external form endpoint (e.g. Formspree) — site is static, no server API
} as const;

// Primary navigation — flat, 9 pages. Write-In page is the strategic spine (built first + fullest).
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'How to Write In', href: '/how-to-vote' },
  { label: 'Meet Meghann', href: '/about' },
  { label: 'Priorities', href: '/issues' },
  { label: 'Community Survey', href: '/survey' },
  { label: 'Endorsements', href: '/endorsements' },
  { label: 'Events', href: '/events' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Contribute', href: '/contribute' },
  { label: 'Contact', href: '/contact' },
] as const;
