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
  contact: { email: "meghann@meghannreimondo.com", phone: "845-684-9413" },
  domains: { primary: "meghannreimondo.com", legacy: "megforwoodstock.com" },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61588301973280",
    instagram: "https://www.instagram.com/megfortownsupervisor/",
    nextdoor: "https://nextdoor.com/profile/01DcKkhRQjTmBCzZL/",
    bluesky: "https://bsky.app/profile/meghannreimondo.bsky.social",
    linkedin: "https://www.linkedin.com/in/meghann-reimondo-993b35a0/",
    pinterest: "https://www.pinterest.com/megforwoodstock/",
    youtube: "https://www.youtube.com/@MeghannReimondo",
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
  chatWidgetId: "6ad6336dd3ae3b035c988381", // GHL live-chat widget id for /vote (Settings, Chat Widget); the widget script only loads when this is set
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
  {
    name: 'Karen Mines',
    role: 'Grogkill, NY',
    date: '',
    pullQuote:
      "Do not underestimate Meghann's dedication, intelligence and capacity to thrive in the role of Woodstock supervisor. She is the ideal person for this position.",
    signoff: '',
    signature: ['Karen Mines', 'Grogkill'],
    letter: [
      "One of the first things you notice when you meet Meghann Reimondo is her friendly disposition. But behind her genuine warmth is one of the smartest and most creative women I've ever known.",
      "Meghann and I have been friends for nearly twenty years, and during that time I've marveled at how she's grown as a woman, mother, wife, member of the school board, and leader within our community. No matter what challenge life has thrown her way she's been able to find a path forward while staying true to her values, finding creative solutions with resourcefulness, honesty and grace.",
      "Meghann is smart, genuine, loyal and unwavering in her dedication to serving every one in the community. Woodstock has been her home for decades and she's been the town clerk here for nearly a year. She understands how our beautiful town works and has innovative ideas about how to improve the quality of life and efficiency of our elected offices here.",
      "Do not underestimate Meghann's dedication, intelligence and capacity to thrive in the role of Woodstock supervisor. She is the ideal person for this position and I throw my full support behind her candidacy.",
    ],
  },
  // ---- Added 15 Oct 2026, from Meghann's email "4 More Endoresements to Add Please".
  // Nagele and Reynolds arrived as PDFs of their public Facebook posts; Rhea and
  // Saletan were in the email body. Letters are verbatim.
  {
    name: 'Marcel Nagele',
    role: '2026 Primary winner for Woodstock Town Council',
    date: '',
    pullQuote:
      "I don't believe in voting for a particular candidate because they're likely to win according to a broken political process. I vote for the person I believe is most competent to lead. I believe that person is Meghann Reimondo.",
    signoff: '',
    signature: ['Marcel Nagele', '2026 Primary winner for Woodstock Town Council'],
    letter: [
      "As the election approaches, I'm endorsing Meghann Reimondo for Town Supervisor.",
      "Meghann is someone I knew was rock solid when I first met her. As I've gotten to know her it's become increasingly clear to me she's exactly the person Woodstock needs to lead our community forward as Town Supervisor.",
      'Meghann and her husband Michael, a lineman for the power company, have been married twenty-one years. Together, they’ve raised two children, a son Max, and a daughter Mira who has special needs. Meghann is proud to be a wife and mom that holds everything together.',
      "What I've learned is Meghann began working at eight years of age doing cleanup at a beauty salon which has instilled a strong work ethic from a young age. In adulthood she managed forty-five employees, operated two businesses of her own, and did bookkeeping for several businesses which included payroll and medical billing. She's also worked for Partnership for Education in administrative roles. All of this prior to becoming 1st Deputy Town Clerk which for a time included all required responsibility of the Town Clerk. Meghann is passionate about managing people's resources, including that of her own family.",
      "Meghann has always said yes to learning, and in the time I've come to know her, due to her vast knowledge of everything, this has become abundantly clear.",
      "Not only does her experience as Deputy Town Clerk provide her with an amazing advantage toward becoming Town Supervisor, she has also managed her family's finances successfully. Since moving to Woodstock in 2007, Meghann and her husband built a beautiful home nine years ago and they've already paid off the mortgage. Other than a leased vehicle, they carry no debt and they pay their credit card balance in full each month. Together, they've worked diligently to create a safety net for Mira's well-being so after their passing Max will not be burdened with this responsibility. All of Meghann's personal financial responsibility is an example of how she'll manage the Town's finances once elected Town Supervisor.",
      "When it comes to governing our town, Meghann recognizes a Supervisor can't know the answers to everything. A Supervisor is a role of leadership and truly competent leadership assembles the best people, supports them so they can do their job, takes advisement from them and makes informed decisions. It's not about knowing all the intricacies of every single issue, it's about collaboration and teamwork with competent people to move things forward in a positive direction.",
      "Meghann's Platform is: fiscal responsibility; supporting our staff; communication and transparency; infrastructure; water and the environment.",
      'I urge you to learn more about Meghann at www.meghannreimondo.com',
      "I've been working with Meghann for many months. I've not met anyone I'm more aligned with on community matters. We each have our own distinct strengths, but we also have an amazing cross section of commonality that compliments us well and makes working together extremely easy. And we're both hard workers with extreme scrutiny for accountability, diligence, and accuracy. Oftentimes, in conversations, we defer to each other to allow the stronger of us on any topic to speak ahead of the other. This has been witnessed in Meghann's Meet and Greet's. We always listen to and explain the details to each other. Neither of us are afraid to say we're not up to speed on any topic, but our promise to our community is we always will be up to speed before passing decision. That's a type of leadership that can be difficult to find.",
      "I don't believe in voting for a particular candidate because they're likely to win according to a broken political process. I vote for the person I believe is most competent to lead. I believe that person is Meghann Reimondo.",
      "I'll be writing in Meghann Reimondo for Town Supervisor, and I'm urging you to do the same. This will allow Meghann and I to lead our community forward.",
    ],
  },
  {
    name: 'Joan Reynolds',
    role: 'Bearsville, NY',
    date: '',
    pullQuote:
      'A Town works when the people who help it run can do their jobs in a supportive, safe, and respectful environment.',
    signoff: '',
    signature: ['Joan Reynolds', 'Bearsville, NY'],
    letter: [
      "As the Town Supervisor's vote nears, I hear and read comments that our current Supervisor should be given time and support to do her job.",
      'Ironically, the time, support and respect requested be afforded to Supervisor Anula Courtis are the very things lacking in her administrative decisions and her management of Town employees.',
      'A few examples…',
      'Union members have been waiting since January to have their salaries negotiated. There has been little talk and no resolution. Employees feel ignored and disrespected, and are without anticipated pay increases.',
      "In March, The Highway Superintendent resigned out of frustration and an untenable work environment. His letter to Hudson Valley One described an administration unwilling to listen, obstructive, and uninformed; with a closed-door policy that made change unlikely. He was especially bothered by Anula's claim that he didn't understand his budget. He thought the reverse was true.",
      "The Building Dept started the year understaffed. Under Anula's leadership it was not supported, but rather, undermined when one of the two Code Enforcement Officers resigned in April. He was not replaced for 5 months until September when the other Code Enforcement Officer finally resigned. He described a work environment much like the Highway Superintendent.",
      'The Deputy Town Clerk performed all the duties of the Town Clerk and, by all accounts, was doing an excellent job. Instead of working with her, Anula chose to recruit and support a person to run against her in the Primary.',
      'The resignations continue. Nine months is sufficient to evaluate leadership.',
      'A Town works when the people who help it run can do their jobs in a supportive, safe, and respectful environment.',
      'I will be WRITING IN Meghann Reimondo for Town Supervisor on November 3rd because I believe her management skills, leadership, and work ethic will best serve Woodstock and the people who work here.',
    ],
  },
  {
    name: 'Lois Saletan',
    role: 'Shady, New York',
    date: '',
    pullQuote:
      'Meghann is the real deal. She’s a smart, radiant person of the highest personal integrity, exceedingly competent, and has the full package of financial, organizational, and interpersonal skills needed to be an effective Town Supervisor.',
    signoff: '',
    signature: ['Louie Saletan', 'Shady, New York'],
    letter: [
      'Meghann is the real deal. She’s a smart, radiant person of the highest personal integrity, exceedingly competent, and has the full package of financial, organizational, and interpersonal skills needed to be an effective Town Supervisor.',
      'She’s a great communicator and a proven public servant devoid of ego. She listens deeply to residents and connects them with the people and resources that can help them with their issues of concern. Spend a few minutes in a room with Meghann, and all these qualities in her become abundantly self-evident. Meghann is the leader we need NOW.',
    ],
  },
  // NOTE: Dawn Rhea already appears above with an earlier letter. Meghann sent a
  // SECOND letter from her on 15 Oct 2026; it is added here as its own entry.
  // Ask her whether she wants both shown or this one to replace the first.
  {
    name: 'Dawn Rhea',
    role: 'Account Clerk/Bookkeeper, Town of Woodstock',
    date: '',
    pullQuote:
      'All you need to do is speak with Meghann to see her honesty, transparency, authentic resolve, and incorruptibility. I have total clarity and conviction in my choice.',
    signoff: 'Sincerely,',
    signature: ['Dawn Rhea', 'Account Clerk/Bookkeeper', 'Town of Woodstock'],
    letter: [
      'I am proud and honored to endorse Meghann Reimondo as Write In for the Town of Woodstock Supervisor. In my personal and professional opinion, she is without a doubt the best candidate for the job.',
      "I have worked with Meghann since September 8th 2025, and she has proven her financial abilities, integrity, and dedication to the Town of Woodstock. Words cannot convey the amount of knowledge, hard work, and heart that Meghann has added to this town. She is not afraid to do the hard work, and if she doesn't have the answers, she will work diligently, ask questions, and consider all sides.",
      'All you need to do is speak with Meghann to see her honesty, transparency, authentic resolve, and incorruptibility. I have total clarity and conviction in my choice.',
      'I hope you will make the WRITE choice and Write in Meghann Reimondo for Town of Woodstock Supervisor!!',
    ],
  },
] as const;

// Forms use same-origin server routes, which write directly to the GHL API.
// No client-side webhook configuration is used.

// Primary navigation — flat, 9 pages. Write-In page is the strategic spine (built first + fullest).
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'How to Write In', href: '/how-to-vote' },
  { label: 'Meet Meghann', href: '/about' },
  { label: 'Priorities', href: '/issues' },
  { label: 'Community Survey', href: '/survey' },
  { label: 'Endorsements', href: '/endorsements' },
  { label: 'Voter Resources', href: '/how-to-vote' },
  { label: 'Events', href: '/events' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Woodstock Vote Express', href: '/vote-express' },
  { label: 'Contribute', href: '/contribute' },
  { label: 'Contact', href: '/contact' },
] as const;
