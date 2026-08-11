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
  donateUrl: "https://donate.stripe.com/5kQ6oIcm1aNIeWu8rB0oM00", // [STAGING] Stripe Payment Link — account confirmed, link pending
  url: "https://meghannreimondo.com",
  DEMO_MODE: false, // LIVE — flipped 8/3 client change round (go-live approved)
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
    name: 'Dawn Rhea',
    role: "Woodstock Town Bookkeeper",
    date: '',
    pullQuote:
      'Every decision she makes is guided by one simple goal: making our town stronger, more responsive, and better than it was the day before.',
    signoff: '',
    signature: ['Dawn Rhea'],
    letter: [
      'It is both an honor and a privilege to endorse Meghann Reimondo for Town Supervisor. Over the past 10 months, I have had the pleasure of working alongside Meg in her role as First Deputy Clerk. During that time, I have witnessed firsthand her knowledge, dedication, tireless work ethic, and genuine passion for serving the Town of Woodstock.',
      'What has impressed me most is her unwavering commitment to our community and the people who call Woodstock home. Every decision she makes is guided by one simple goal: making our town stronger, more responsive, and better than it was the day before.',
      'Meg is a thoughtful and independent leader. She listens carefully, considers every perspective, and makes decisions based on facts, fairness, and what is truly in the best interest of the town — not politics or outside pressure.',
      "I have never been one to publicly comment on politics. As the Town's Bookkeeper for the past two years, I have chosen to remain focused on my work. However, I have witnessed the negativity, personal attacks, and misinformation that too often become part of political campaigns. Through it all, Meghann has consistently taken the high road. She leads with professionalism, respect, and grace.",
      'I wholeheartedly and enthusiastically endorse Meghann Reimondo for Town Supervisor.',
    ],
  },
  {
    name: 'Kristen Eberhard',
    role: 'Woodstock Resident',
    date: '',
    pullQuote:
      'A vote for Meghann is a vote for vision and heart — accessibility, accountability and transparency — a solid foundation leading Woodstock into a new chapter.',
    signoff: '',
    signature: ['Kristen Eberhard'],
    letter: [
      'I care greatly about this town and have since I first moved here 20 years ago to raise my son. Woodstock has a complex and glorious tapestry that needs to be preserved — and we stand at a threshold of much change.',
      "Meghann Reimondo gets it — which is why I support her grassroots initiative. She's inclusive, community-oriented, dedicated, trustworthy, qualified and deeply caring — the exact pillars we need in leadership. I'm happy to endorse her for Town Supervisor.",
      'A vote for Meghann is a vote for vision and heart — accessibility, accountability and transparency — a solid foundation leading Woodstock into a new chapter.',
    ],
  },
  {
    name: 'Michele Sehwerert',
    role: "Town Clerk's Office · Kingston, NY",
    date: '',
    pullQuote:
      'In my 16 plus years of service, I have seen firsthand what effective leadership looks like, and I can confidently say that Meghann embodies those qualities.',
    signoff: '',
    signature: ['Michele Sehwerert', 'Kingston, NY'],
    letter: [
      "I am proud to offer my wholehearted endorsement of Meghann Reimondo for Town Supervisor. I have had the privilege of working in the Town Clerk's Office for the past 16 and a half years, serving under four different Town Supervisors. During that time, I have learned the importance of strong leadership, teamwork, integrity, and an unwavering commitment to public service.",
      'Ten months ago marked a significant and emotional transition. During that time, Meghann Reimondo stepped into the role of Town Clerk. From her very first day, she approached the position with compassion, professionalism, and a sincere commitment to both her colleagues and the community.',
      'Since then, Meghann and I have worked closely together, building a strong and collaborative partnership. She leads with integrity, listens thoughtfully, welcomes new ideas, and approaches every challenge with professionalism and determination. Residents have often shared with me how caring, honest, knowledgeable, and approachable she is.',
      'In my 16 plus years of service, I have seen firsthand what effective leadership looks like, and I can confidently say that Meghann embodies those qualities. She has earned the trust and respect of her colleagues and possesses the vision and work ethic needed to lead Woodstock into the future.',
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
  formWebhook: '',       // legacy survey fallback endpoint
  optInEndpoint: '',     // GHL or other webhook for /join opt-in form — drop URL here when ready
  surveyEndpoint: '',    // GHL or other webhook for /survey — drop URL here when ready
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
