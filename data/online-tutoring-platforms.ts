export type OnlineTutoringCategory =
  | "k12-academic"
  | "test-prep"
  | "language"
  | "professional-skills"
  | "stem";

export interface OnlineTutoringTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: OnlineTutoringCategory;
  tags: string[];
  url: string;
  affiliateUrl?: string;
  pricing: "free" | "freemium" | "paid";
  featured: boolean;
  logo: string;
  domain?: string;
  pros?: string[];
  cons?: string[];
  useCases?: string[];
}

export const ONLINE_TUTORING_CATEGORIES: Record<OnlineTutoringCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "k12-academic": { label: "K-12 Academic", emoji: "📖", description: "One-on-one tutoring for elementary through high school students in core subjects.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "test-prep": { label: "Test Prep", emoji: "📝", description: "SAT, ACT, GRE, GMAT, and other standardized test preparation with expert tutors.", gradient: "from-amber-600/30 to-orange-800/40" },
  "language": { label: "Language Tutoring", emoji: "🌍", description: "Live tutoring sessions with native speakers and language professionals.", gradient: "from-emerald-600/30 to-teal-800/40" },
  "professional-skills": { label: "Professional Skills", emoji: "💼", description: "Tutoring in business, technology, and career-related skills for working professionals.", gradient: "from-violet-600/30 to-purple-800/40" },
  "stem": { label: "STEM", emoji: "🔬", description: "Math, science, engineering, and technology tutoring from subject matter experts.", gradient: "from-red-600/30 to-rose-800/40" },
};

export const ONLINE_TUTORING_TOOLS: OnlineTutoringTool[] = [
  // ── K-12 ACADEMIC ───────────────────────────────────────────────────────
  {
    slug: "wyzant",
    name: "Wyzant",
    tagline: "Find and book private tutors in 300+ subjects online or in person",
    description: "Wyzant is the largest marketplace for private tutoring in the United States, connecting students with over 80,000 tutors across 300+ subjects. Students browse tutor profiles, read reviews, compare hourly rates, and book sessions directly. Tutors set their own rates and availability, creating a competitive marketplace where quality and pricing vary. Wyzant supports both online video sessions and in-person meetings, and the platform handles payments, scheduling, and progress tracking.",
    category: "k12-academic",
    tags: ["private tutoring", "tutor marketplace", "300+ subjects", "in-person tutoring", "online tutoring", "hourly rates", "student reviews"],
    url: "https://www.wyzant.com",
    pricing: "paid",
    featured: true,
    logo: "👨‍🏫",
    domain: "wyzant.com",
    pros: [
      "Largest tutor marketplace with 80,000+ tutors across 300+ subjects",
      "Transparent pricing with tutor-set hourly rates and no subscription",
      "Detailed tutor profiles with student reviews and ratings",
      "Both online and in-person tutoring options available",
      "Pay-as-you-go model with no contracts or minimum commitments",
    ],
    cons: [
      "Hourly rates vary widely and experienced tutors can be expensive ($60-100+/hr)",
      "Quality varies significantly across the tutor pool",
      "Platform takes a commission that increases tutor pricing",
      "Finding the right tutor may require trial sessions with multiple candidates",
    ],
    useCases: [
      "Find a calculus tutor for weekly sessions to prepare for AP Calculus AB exam",
      "Book a single SAT prep session to get targeted help on the reading section",
      "Connect with a Spanish tutor for conversational practice before a study abroad trip",
    ],
  },
  {
    slug: "tutor-com",
    name: "Tutor.com",
    tagline: "Expert online tutoring available 24/7 through libraries and schools",
    description: "Tutor.com provides on-demand online tutoring with expert tutors available around the clock in over 250 subjects. The platform is widely available through school districts, libraries, and military installations as an institutional benefit. Students connect with a tutor within minutes for real-time help using a shared whiteboard, code editor, or essay review tool. The Princeton Review acquired Tutor.com, adding test prep expertise to the platform's academic tutoring foundation.",
    category: "k12-academic",
    tags: ["on-demand tutoring", "24/7 availability", "library access", "school districts", "Princeton Review", "whiteboard tutoring", "military benefit"],
    url: "https://www.tutor.com",
    pricing: "paid",
    featured: true,
    logo: "📘",
    domain: "tutor.com",
    pros: [
      "Available 24/7 with average connection time under 5 minutes",
      "Often free through public libraries, schools, and military programs",
      "Backed by Princeton Review with strong academic credibility",
      "Interactive whiteboard and code editor for real-time collaboration",
      "Covers 250+ subjects from elementary math to graduate-level topics",
    ],
    cons: [
      "Individual pricing is expensive without institutional access",
      "Session length may be limited depending on your access plan",
      "Cannot choose specific tutors, matched with available experts",
      "Quality varies as tutors are assigned based on availability",
    ],
    useCases: [
      "Check if your local library provides free access and get homework help tonight",
      "Connect with a tutor at 11 PM the night before a chemistry test for last-minute review",
      "Use the essay review tool to get feedback on a college application essay",
    ],
  },
  {
    slug: "varsity-tutors",
    name: "Varsity Tutors",
    tagline: "Live online tutoring with vetted expert instructors",
    description: "Varsity Tutors offers personalized one-on-one tutoring, small group classes, and self-study courses across academic subjects, test prep, and professional development. The platform's learning consultants match students with tutors based on learning style, goals, and schedule. Varsity Tutors also provides free live online classes and practice tests, making some resources accessible without a paid subscription.",
    category: "k12-academic",
    tags: ["private tutoring", "small group classes", "test prep", "learning consultant", "vetted tutors", "live classes", "adaptive learning"],
    url: "https://www.varsitytutors.com",
    pricing: "paid",
    featured: true,
    logo: "🎓",
    domain: "varsitytutors.com",
    pros: [
      "Learning consultants create personalized tutor matching",
      "Mix of one-on-one, small group, and self-study options",
      "Free live online classes available without commitment",
      "Comprehensive test prep covering SAT, ACT, GRE, GMAT, and more",
      "Vetted tutors with subject expertise and teaching experience",
    ],
    cons: [
      "Premium pricing with hourly rates often exceeding $50-80/hour",
      "Package-based pricing can require significant upfront commitment",
      "Sales process can feel high-pressure when requesting information",
      "Free classes have limited availability and large group sizes",
    ],
    useCases: [
      "Enroll in a 12-week SAT prep program with weekly one-on-one sessions",
      "Join a free live group class on AP Biology to supplement school instruction",
      "Work with a matched tutor on college essay writing over a 4-session package",
    ],
  },
  {
    slug: "chegg-tutors",
    name: "Chegg Tutors",
    tagline: "On-demand homework help and expert tutoring from Chegg",
    description: "Chegg Tutors (part of Chegg Study) provides on-demand tutoring alongside Chegg's textbook solutions, expert Q&A, and study tools. Students can connect with tutors for live sessions or submit questions for asynchronous expert answers. The integration with Chegg's broader study ecosystem makes it convenient for students already using Chegg for textbook solutions. Tutoring covers math, science, business, engineering, and humanities subjects.",
    category: "k12-academic",
    tags: ["homework help", "Chegg Study", "expert Q&A", "textbook solutions", "on-demand tutoring", "college tutoring", "study tools"],
    url: "https://www.chegg.com/tutors",
    pricing: "paid",
    featured: true,
    logo: "📙",
    domain: "chegg.com",
    pros: [
      "Integrated with Chegg's textbook solutions and study tools ecosystem",
      "On-demand access without scheduling in advance",
      "Chegg Study subscription bundles tutoring with Q&A and solutions",
      "Affordable compared to premium private tutoring services",
    ],
    cons: [
      "Tutoring quality can be inconsistent across the platform",
      "Academic integrity concerns with answer-providing features",
      "Subscription model bundles features you may not need",
      "Limited ability to build ongoing relationships with specific tutors",
    ],
    useCases: [
      "Get instant help on an organic chemistry problem set at midnight before it's due",
      "Use Chegg Study to find textbook solutions and ask follow-up questions via tutoring",
      "Schedule a 30-minute session to review linear algebra concepts before a midterm",
    ],
  },
  {
    slug: "khan-academy",
    name: "Khan Academy",
    tagline: "Free world-class education for anyone, anywhere",
    description: "Khan Academy is a nonprofit that provides completely free educational content including video lessons, practice exercises, and personalized learning dashboards across math, science, computing, history, economics, and test prep. The platform's mastery-based learning system lets students progress at their own pace, and teacher tools allow educators to assign and monitor student work. Khan Academy's SAT prep partnership with College Board makes it the official free SAT study resource.",
    category: "k12-academic",
    tags: ["free education", "video lessons", "practice exercises", "mastery learning", "SAT prep", "nonprofit", "self-paced"],
    url: "https://www.khanacademy.org",
    pricing: "free",
    featured: true,
    logo: "🌿",
    domain: "khanacademy.org",
  },
  // ── TEST PREP ───────────────────────────────────────────────────────────
  {
    slug: "preply",
    name: "Preply",
    tagline: "Find online tutors and language teachers worldwide",
    description: "Preply is a global tutoring marketplace connecting students with tutors for language learning and academic subjects via video sessions. The platform features tutors from around the world who set their own rates, and the trial lesson system lets students test compatibility before committing. Preply's strength is in language tutoring, where learners can practice with native speakers at affordable rates.",
    category: "test-prep",
    tags: ["global tutors", "language tutoring", "trial lessons", "video sessions", "native speakers", "affordable tutoring", "marketplace"],
    url: "https://preply.com",
    pricing: "paid",
    featured: false,
    logo: "🌐",
    domain: "preply.com",
  },
  {
    slug: "tutorme",
    name: "TutorMe",
    tagline: "On-demand tutoring with connection in under 30 seconds",
    description: "TutorMe provides on-demand online tutoring with the goal of connecting students with an expert in under 30 seconds. The platform covers over 300 subjects and includes a virtual classroom with video, audio, screen sharing, and a collaborative whiteboard. TutorMe is frequently offered as an institutional benefit through colleges and universities.",
    category: "test-prep",
    tags: ["instant tutoring", "30-second connection", "virtual classroom", "300+ subjects", "institutional access", "screen sharing"],
    url: "https://tutorme.com",
    pricing: "paid",
    featured: false,
    logo: "⚡",
    domain: "tutorme.com",
  },
  {
    slug: "skooli",
    name: "Skooli",
    tagline: "Online tutoring with certified teachers in a virtual classroom",
    description: "Skooli connects students with certified teachers for one-on-one online tutoring sessions. All tutors on the platform are required to hold valid teaching certifications, ensuring a baseline quality standard. The virtual classroom includes video, chat, whiteboard, and file sharing tools designed specifically for educational settings.",
    category: "test-prep",
    tags: ["certified teachers", "virtual classroom", "one-on-one tutoring", "teaching credentials", "video tutoring", "K-12"],
    url: "https://www.skooli.com",
    pricing: "paid",
    featured: false,
    logo: "🏫",
    domain: "skooli.com",
  },
  // ── LANGUAGE ────────────────────────────────────────────────────────────
  {
    slug: "revolution-prep",
    name: "Revolution Prep",
    tagline: "Private tutoring and test prep with guaranteed results",
    description: "Revolution Prep offers private one-on-one tutoring and small group classes with a focus on test preparation and academic subjects. The company guarantees score improvements on standardized tests and provides dedicated tutoring coordinators who manage the entire learning process. Their tutors are full-time employees rather than freelancers, ensuring consistent quality and training standards.",
    category: "language",
    tags: ["test prep", "score guarantee", "private tutoring", "small groups", "full-time tutors", "academic subjects", "SAT ACT"],
    url: "https://www.revolutionprep.com",
    pricing: "paid",
    featured: false,
    logo: "🔄",
    domain: "revolutionprep.com",
  },
  // ── PROFESSIONAL SKILLS ─────────────────────────────────────────────────
  {
    slug: "itutor",
    name: "iTutor",
    tagline: "Personalized online tutoring powered by smart matching",
    description: "iTutor provides personalized online tutoring services with a focus on matching students with the most suitable tutors based on learning goals, subject expertise, and scheduling needs. The platform supports a wide range of academic and professional subjects with flexible scheduling options for busy students and working professionals.",
    category: "professional-skills",
    tags: ["smart matching", "personalized tutoring", "flexible scheduling", "academic subjects", "professional tutoring", "online learning"],
    url: "https://www.itutor.com",
    pricing: "paid",
    featured: false,
    logo: "🎯",
    domain: "itutor.com",
  },
  // ── STEM ────────────────────────────────────────────────────────────────
  {
    slug: "mathway",
    name: "Mathway",
    tagline: "Instant math problem solver from basic math to calculus",
    description: "Mathway is an AI-powered math problem solver that provides step-by-step solutions to problems across basic math, pre-algebra, algebra, trigonometry, precalculus, calculus, statistics, and linear algebra. Students type or photograph a problem and Mathway shows the solution process. While not a traditional tutoring service, it serves as an always-available math help resource.",
    category: "stem",
    tags: ["math solver", "step-by-step solutions", "algebra", "calculus", "statistics", "AI math", "problem solver"],
    url: "https://www.mathway.com",
    pricing: "freemium",
    featured: false,
    logo: "🔢",
    domain: "mathway.com",
  },
  {
    slug: "brainly",
    name: "Brainly",
    tagline: "Peer-to-peer homework help and learning community",
    description: "Brainly is a peer-to-peer learning community where students ask and answer homework questions across all subjects. The platform uses a combination of community answers, expert verification, and AI to provide homework assistance. With over 350 million users globally, Brainly has one of the largest educational Q&A databases available.",
    category: "stem",
    tags: ["homework help", "peer learning", "Q&A community", "expert answers", "AI homework", "student community", "global education"],
    url: "https://brainly.com",
    pricing: "freemium",
    featured: false,
    logo: "🧠",
    domain: "brainly.com",
  },
  {
    slug: "kumon",
    name: "Kumon",
    tagline: "Self-paced math and reading mastery through daily practice",
    description: "Kumon is the world's largest after-school education program, using a worksheet-based approach to build mastery in math and reading through daily practice. The program is designed for self-pacing, allowing students to advance beyond their grade level as they demonstrate mastery. Kumon now offers both in-center and online learning options with instructor guidance.",
    category: "stem",
    tags: ["self-paced learning", "math mastery", "reading program", "daily practice", "after-school", "grade advancement", "worksheets"],
    url: "https://www.kumon.com",
    pricing: "paid",
    featured: false,
    logo: "📐",
    domain: "kumon.com",
  },
  {
    slug: "sylvan-learning",
    name: "Sylvan Learning",
    tagline: "Personalized tutoring at learning centers and online",
    description: "Sylvan Learning operates tutoring centers across the United States offering personalized academic tutoring, test prep, and STEM programs. The blended approach combines in-person instruction at local centers with online tutoring options. Sylvan's programs use proprietary curriculum and adaptive technology to create individualized learning plans.",
    category: "stem",
    tags: ["learning centers", "personalized tutoring", "test prep", "STEM programs", "adaptive technology", "in-person tutoring"],
    url: "https://www.sylvanlearning.com",
    pricing: "paid",
    featured: false,
    logo: "🌳",
    domain: "sylvanlearning.com",
  },
  {
    slug: "club-z",
    name: "Club Z",
    tagline: "In-home and online tutoring with local tutor matching",
    description: "Club Z provides in-home and online tutoring services by matching students with local tutors based on subject needs, learning style, and location. The franchise model means tutors are managed locally with personalized attention to each student's progress. Club Z covers K-12 academics, test prep, and college admissions counseling.",
    category: "stem",
    tags: ["in-home tutoring", "local tutors", "franchise tutoring", "K-12", "college admissions", "personalized matching"],
    url: "https://www.clubztutoring.com",
    pricing: "paid",
    featured: false,
    logo: "🏠",
    domain: "clubztutoring.com",
  },
];
