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
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61588301973280",
    instagram: "https://www.instagram.com/megfortownsupervisor/",
    nextdoor: "https://nextdoor.com/profile/01DcKkhRQjTmBCzZL/",
    bluesky: "https://bsky.app/profile/meghannreimondo.bsky.social",
    linkedin: "https://www.linkedin.com/in/meghann-reimondo-993b35a0/",
  }, // sameAs targets
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
// Endorsements — listed only after the endorser has confirmed permission.
export const ENDORSEMENTS = [
  {
    name: 'Camellia Lee',
    role: 'Woodstock Resident & Small Business Owner',
    date: 'July 23, 2026',
    pullQuote:
      'For all these reasons — her competence, her integrity, her warmth, and her proven ability to bring people together — I wholeheartedly endorse Meghann Reimondo for Woodstock Town Supervisor.',
    signoff: 'Sincerely,',
    signature: ['Camellia Lee', 'Woodstock Resident'],
    letter: [
      'My name is Camellia Lee, and as a Woodstock resident, I have come to know Meghann professionally as a fellow small business owner and as the bookkeeper for my businesses. Having worked with her for at least two years now, I wholeheartedly respect and trust her competency, efficiency, and kind professionalism. She listens and organizes with such care and presence, and has the ability to multitask, organize, and prioritize what is needed to get the job done in the most efficient manner.',
      'Personally, she is warm, caring, both empathic and compassionate, and listens fully with an open ear and heart. She is deeply approachable and welcoming, the kind of person people feel instantly comfortable turning to, and her caring nature comes through in every interaction, big or small.',
      "Beyond her interpersonal warmth, Meghann is a quick thinker and a genuinely great problem solver. In my experience working alongside her, she doesn't just manage details — she anticipates them, and she brings a clear, organized mind to situations that otherwise feel challenging and overwhelming.",
      "As a Woodstock resident, transparency matters deeply to me, and it's one of the reasons I trust Meghann for this role. She believes, as I do, that a Town Supervisor should be an advocate for the town. The leadership I want to see in Woodstock is strong, but also collaborative — a true community builder and bridger.",
      'For all these reasons — her competence, her integrity, her warmth, and her proven ability to bring people together — I wholeheartedly endorse Meghann Reimondo for Woodstock Town Supervisor.',
    ],
  },
  {
    name: 'Howie Lipson',
    role: 'Former Chairman, Woodstock Recreation Committee',
    date: '',
    pullQuote:
      'I will be proudly writing in Meghann Reimondo for Woodstock Town Supervisor, and I encourage others to do the same.',
    signoff: 'Sincerely,',
    signature: [
      'Howie Lipson',
      'Former Chairman, Woodstock Recreation Committee',
      'Former Director, Woodstock Summer Camp',
      'Former President, Woodstock Youth Baseball',
      'Founder and President, Woodstock Youth Basketball',
    ],
    letter: [
      'Dear Friends,',
      'I would be honored to recommend Meghann Reimondo as a write-in candidate for the office of Woodstock Town Supervisor.',
      'I have been a Woodstocker since 1974 and have held many positions serving the Town of Woodstock. Throughout those years, I have had the opportunity to work with many dedicated public servants. In her role as Town Clerk, Meghann Reimondo proudly follows in the esteemed legacy of Kathy Anderson and Jackie Earley.',
      'Meghann is knowledgeable, competent, and an exceptionally hard worker. She has demonstrated that she not only pays close attention to detail but is also a quick learner who approaches every task with professionalism and dedication. She has earned the respect of those who know her through her commitment to serving the people of Woodstock.',
      'I will be proudly writing in Meghann Reimondo for Woodstock Town Supervisor, and I encourage others to do the same.',
    ],
  },
  {
    name: 'Leigh & Greg Vande Bogart',
    role: 'Woodstock Residents',
    date: '',
    pullQuote:
      'Meghann Reimondo is the right choice for Woodstock Town Supervisor. She is an experienced, hardworking leader who combines strong management skills with a genuine commitment to serving the community.',
    signoff: 'In service,',
    signature: ['Leigh & Greg Vande Bogart'],
    letter: [
      'Meghann Reimondo is the right choice for Woodstock Town Supervisor. She is an experienced, hardworking leader who combines strong management skills with a genuine commitment to serving the community. During her time with the Town of Woodstock, she has helped make local government more welcoming, efficient, accountable, and nonpartisan.',
      "With a deep respect for Woodstock's history and a clear vision for its future, Meghann is ready to lead with integrity, humility, and dedication.",
      'On November 3rd, join us by writing in Meghann Reimondo for Woodstock Town Supervisor in the write-in section of your ballot.',
    ],
  },
] as const;

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
