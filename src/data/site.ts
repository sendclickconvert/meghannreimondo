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
  committee: { registeredName: "TODO", treasurer: "TODO" },
  legal: { paidForBy: "TODO" }, // renders "Paid for by <registeredName>"; footer day one
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

// ============================================================
// CONTENT TODO REGISTRY — blocked on Meghann (content pack §6 intake).
// EVERY value here is the literal string "TODO" (or an empty array for lists)
// until Meghann supplies her own materials. NOTHING is filled from news
// articles, the old clerk site (megforwoodstock.com), or any outside source —
// different office, and her supervisor platform is hers to state.
// Do NOT fill any of these without her written materials.
// ============================================================
export const CONTENT_TODO = {
  candidate_statement: 'TODO',      // Home / Bio — her own words, supervisor race
  bio_record: 'TODO',               // Bio — background, experience she wants featured
  credentials_education: 'TODO',    // Bio — verified only
  family_community: 'TODO',         // Bio — only what she wants public
  issue_1: 'TODO',                  // Issues — her actual supervisor position
  issue_2: 'TODO',
  issue_3: 'TODO',
  issue_4: 'TODO',
  issue_5: 'TODO',
  plan_of_action_1: 'TODO',         // Plan — her priorities
  plan_of_action_2: 'TODO',
  plan_of_action_3: 'TODO',
  plan_of_action_4: 'TODO',
  plan_of_action_5: 'TODO',
  endorsements: [] as string[],     // Endorsements — list + permission to publish each
  events: [] as string[],           // Media/Calendar — real dates/locations only
  outreach_video: 'TODO',           // Home — her video to Woodstock
  social_handles: {                 // Global — sameAs targets (FB / IG / NextDoor / BlueSky / LinkedIn)
    facebook: 'TODO',
    instagram: 'TODO',
    nextdoor: 'TODO',
    bluesky: 'TODO',
    linkedin: 'TODO',
  },
  committee_name: 'TODO',           // Footer / Donate — legal, see content pack §5
  contact_phone: 'TODO',            // Contact — campaign line (not a personal cell)
  contact_email: 'TODO',            // Contact — campaign line (not a personal cell)
} as const;

// Convenience re-exports used across layout/components (derive from `site`, never duplicate).
export const DEMO_MODE = site.DEMO_MODE;

// Helper: is a config value still an unfilled placeholder?
export const isTodo = (v: string | undefined | null): boolean =>
  v === undefined || v === null || v.trim() === '' || v.trim().toUpperCase() === 'TODO';

// Vendor-neutral integration plumbing (used by /api/submit-form). Empty until wired.
export const INTEGRATIONS = {
  formWebhook: '', // native fallback endpoint target for /api/submit-form
} as const;

// Primary navigation — flat, 9 pages. Write-In page is the strategic spine (built first + fullest).
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'How to Write In', href: '/how-to-vote' },
  { label: 'Meet Meghann', href: '/about' },
  { label: 'Issues', href: '/issues' },
  { label: 'Endorsements', href: '/endorsements' },
  { label: 'Events', href: '/events' },
  { label: 'Volunteer', href: '/join' },
  { label: 'Contribute', href: '/contribute' },
  { label: 'Contact', href: '/contact' },
] as const;
