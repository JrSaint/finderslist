export type TelehealthCategory =
  | "primary-care"
  | "mental-health"
  | "urgent-care"
  | "specialist"
  | "chronic-care";

export interface TelehealthTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: TelehealthCategory;
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

export const TELEHEALTH_CATEGORIES: Record<TelehealthCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "primary-care": { label: "Primary Care", emoji: "🩺", description: "Virtual doctor visits for general health concerns, prescriptions, and preventive care.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "mental-health": { label: "Mental Health", emoji: "🧠", description: "Online therapy, psychiatry, and counseling from licensed mental health professionals.", gradient: "from-violet-600/30 to-purple-800/40" },
  "urgent-care": { label: "Urgent Care", emoji: "🚑", description: "On-demand virtual visits for non-emergency medical issues that need quick attention.", gradient: "from-red-600/30 to-rose-800/40" },
  "specialist": { label: "Specialist Care", emoji: "👨‍⚕️", description: "Access dermatologists, endocrinologists, and other specialists via telehealth.", gradient: "from-emerald-600/30 to-teal-800/40" },
  "chronic-care": { label: "Chronic Care", emoji: "💊", description: "Ongoing management for chronic conditions like diabetes, hypertension, and thyroid disorders.", gradient: "from-amber-600/30 to-orange-800/40" },
};

export const TELEHEALTH_TOOLS: TelehealthTool[] = [
  // ── PRIMARY CARE ────────────────────────────────────────────────────────
  {
    slug: "teladoc",
    name: "Teladoc",
    tagline: "The largest and most established telehealth platform in the US",
    description: "Teladoc is the pioneer and market leader in virtual healthcare, providing on-demand access to board-certified doctors, therapists, and specialists across all 50 states. The platform handles everything from cold and flu visits to dermatology consultations and mental health therapy. Teladoc is accepted by most major insurance plans and employer benefits programs, making it accessible to hundreds of millions of Americans. Average wait times are under 10 minutes for urgent care visits.",
    category: "primary-care",
    tags: ["virtual doctor", "telehealth", "primary care", "insurance accepted", "urgent care", "mental health", "on-demand"],
    url: "https://www.teladoc.com",
    pricing: "paid",
    featured: true,
    logo: "🩺",
    domain: "teladoc.com",
    pros: [
      "Largest telehealth network with availability in all 50 states",
      "Accepted by most major insurance plans and employer benefits",
      "Average wait time under 10 minutes for urgent care visits",
      "Comprehensive services spanning primary care, mental health, and specialty care",
      "24/7 availability including nights, weekends, and holidays",
    ],
    cons: [
      "Out-of-pocket costs can be high without insurance coverage",
      "Continuity of care can be limited with rotating provider pool",
      "Some conditions still require in-person examination",
      "Prescription limitations vary by state regulations",
    ],
    useCases: [
      "See a doctor within 10 minutes for a sinus infection and get an antibiotic prescription sent to your pharmacy",
      "Schedule a dermatology consultation by uploading photos of a skin concern",
      "Access mental health therapy through weekly video sessions with a licensed counselor",
    ],
  },
  {
    slug: "amwell",
    name: "Amwell",
    tagline: "Virtual care connecting patients with doctors and therapists",
    description: "Amwell provides virtual healthcare visits with board-certified physicians, psychiatrists, and therapists through video and phone consultations. The platform partners with major health systems and insurance carriers to offer integrated telehealth experiences. Amwell's technology also powers telehealth programs for hospitals and health plans, giving it deep infrastructure in the healthcare system beyond direct-to-consumer services.",
    category: "primary-care",
    tags: ["virtual care", "video doctor", "psychiatry", "health system partner", "insurance integrated", "telehealth platform"],
    url: "https://www.amwell.com",
    pricing: "paid",
    featured: true,
    logo: "💙",
    domain: "amwell.com",
    pros: [
      "Deep partnerships with major health systems and insurance carriers",
      "Psychiatry and therapy services available alongside primary care",
      "Insurance integration means many visits are covered at copay rates",
      "Health system partnerships allow access to your existing medical records",
    ],
    cons: [
      "Availability depends heavily on your insurance and location",
      "Direct-to-consumer pricing is higher without insurance",
      "App experience can feel clinical and less user-friendly than competitors",
      "Specialist availability varies significantly by region",
    ],
    useCases: [
      "Use your employer's insurance to see a primary care doctor for $25 copay via video",
      "Get a psychiatric evaluation and medication management through monthly virtual visits",
      "Connect with a therapist for cognitive behavioral therapy sessions from home",
    ],
  },
  {
    slug: "mdlive",
    name: "MDLive",
    tagline: "Virtual healthcare backed by Evernorth and Cigna",
    description: "MDLive, now part of Evernorth (Cigna's health services division), provides virtual urgent care, primary care, dermatology, and behavioral health services. The acquisition by Cigna has expanded MDLive's reach through one of the largest health insurance networks in the country. Board-certified doctors are available 24/7 for urgent care consultations with an average wait time under 15 minutes.",
    category: "primary-care",
    tags: ["Cigna", "Evernorth", "virtual urgent care", "dermatology", "behavioral health", "24/7 doctors", "insurance backed"],
    url: "https://www.mdlive.com",
    pricing: "paid",
    featured: true,
    logo: "🔷",
    domain: "mdlive.com",
    pros: [
      "Backed by Cigna/Evernorth with deep insurance network integration",
      "24/7 urgent care availability with short wait times",
      "Dermatology consultations with photo upload and async review",
      "Behavioral health services including psychiatry and therapy",
      "Often available at $0 copay for Cigna members",
    ],
    cons: [
      "Best value is limited to Cigna and Evernorth network members",
      "Provider continuity can be inconsistent across visits",
      "Non-insurance pricing is less competitive than newer platforms",
    ],
    useCases: [
      "Use your Cigna insurance for a $0 copay urgent care visit for a UTI or pink eye",
      "Upload skin photos for an asynchronous dermatology consultation within 24 hours",
      "Schedule ongoing therapy sessions with a licensed behavioral health provider",
    ],
  },
  {
    slug: "doctor-on-demand",
    name: "Doctor on Demand",
    tagline: "Video visits with top-rated physicians and psychiatrists",
    description: "Doctor on Demand, now part of Included Health, provides high-quality video visits with physicians, psychiatrists, and psychologists. The platform is known for its rigorous provider vetting process and focus on visit quality over volume. Visits cover urgent care, preventive health, chronic condition management, and comprehensive behavioral health services including medication management.",
    category: "primary-care",
    tags: ["video visits", "psychiatry", "physician quality", "preventive care", "chronic conditions", "Included Health"],
    url: "https://www.doctorondemand.com",
    pricing: "paid",
    featured: true,
    logo: "👨‍⚕️",
    domain: "doctorondemand.com",
    pros: [
      "Rigorous provider selection ensures high visit quality",
      "Comprehensive behavioral health including psychiatry and psychology",
      "Preventive care and chronic condition management beyond just urgent visits",
      "Now part of Included Health, expanding enterprise and insurance reach",
    ],
    cons: [
      "Higher out-of-pocket cost compared to some competitors",
      "Fewer available time slots during peak hours",
      "Transitioning under Included Health brand may cause confusion",
    ],
    useCases: [
      "Schedule a preventive health check-up with a primary care physician via video",
      "Get a psychiatric evaluation and ongoing medication management for anxiety",
      "Manage Type 2 diabetes with regular virtual check-ins and lab order coordination",
    ],
  },
  {
    slug: "plushcare",
    name: "PlushCare",
    tagline: "Virtual primary care with top-50 medical school physicians",
    description: "PlushCare provides virtual primary care from physicians who graduated from the top 50 medical schools in the country. The platform focuses on building ongoing doctor-patient relationships rather than one-off urgent care visits. PlushCare handles prescriptions, lab orders, referrals, and preventive care through scheduled video appointments with your chosen primary care doctor.",
    category: "primary-care",
    tags: ["virtual primary care", "top physicians", "ongoing care", "prescriptions", "lab orders", "preventive health"],
    url: "https://www.plushcare.com",
    pricing: "paid",
    featured: false,
    logo: "🍎",
    domain: "plushcare.com",
  },
  // ── MENTAL HEALTH ───────────────────────────────────────────────────────
  {
    slug: "cerebral",
    name: "Cerebral",
    tagline: "Online psychiatry and therapy for anxiety and depression",
    description: "Cerebral offers online psychiatry and therapy services with a focus on anxiety, depression, and insomnia. The subscription model includes monthly prescriber visits, medication delivery, and optional therapy sessions. Cerebral handles prior authorizations and works with most major insurance plans to minimize out-of-pocket costs for ongoing mental health care.",
    category: "mental-health",
    tags: ["online psychiatry", "anxiety treatment", "depression", "medication management", "therapy", "mental health subscription"],
    url: "https://www.cerebral.com",
    pricing: "paid",
    featured: true,
    logo: "🧠",
    domain: "cerebral.com",
  },
  {
    slug: "talkspace",
    name: "Talkspace",
    tagline: "Online therapy and psychiatry from licensed professionals",
    description: "Talkspace provides online therapy and psychiatry through text, audio, and video sessions with licensed therapists and psychiatric providers. The platform offers both subscription plans for ongoing care and single-session options, with insurance accepted from many major carriers. Talkspace's messaging-based therapy option allows for asynchronous communication between sessions.",
    category: "mental-health",
    tags: ["online therapy", "text therapy", "psychiatry", "insurance accepted", "licensed therapists", "messaging therapy"],
    url: "https://www.talkspace.com",
    pricing: "paid",
    featured: false,
    logo: "💬",
    domain: "talkspace.com",
  },
  {
    slug: "betterhelp",
    name: "BetterHelp",
    tagline: "The world's largest online therapy platform",
    description: "BetterHelp is the largest online therapy platform, connecting users with licensed therapists for weekly live sessions plus unlimited messaging. The matching algorithm pairs clients with therapists based on preferences, issues, and therapeutic approach. BetterHelp offers financial aid for qualifying users and covers a wide range of concerns from relationship issues to trauma processing.",
    category: "mental-health",
    tags: ["online therapy", "licensed therapists", "weekly sessions", "messaging therapy", "financial aid", "therapy matching"],
    url: "https://www.betterhelp.com",
    pricing: "paid",
    featured: false,
    logo: "💚",
    domain: "betterhelp.com",
  },
  // ── URGENT CARE ─────────────────────────────────────────────────────────
  {
    slug: "sesame-care",
    name: "Sesame Care",
    tagline: "Transparent healthcare pricing without insurance middlemen",
    description: "Sesame Care is a healthcare marketplace that connects patients directly with doctors, specialists, and labs at transparent, upfront prices without involving insurance. Visits start as low as $26 for telehealth consultations, and the platform covers primary care, dental, mental health, and specialist visits. Sesame is particularly valuable for uninsured or underinsured patients looking for affordable care.",
    category: "urgent-care",
    tags: ["transparent pricing", "no insurance needed", "affordable care", "direct pay", "marketplace", "uninsured", "telehealth"],
    url: "https://www.sesamecare.com",
    pricing: "paid",
    featured: false,
    logo: "🟡",
    domain: "sesamecare.com",
  },
  {
    slug: "k-health",
    name: "K Health",
    tagline: "AI-powered primary care with affordable doctor visits",
    description: "K Health uses artificial intelligence to triage symptoms and connect patients with board-certified doctors for virtual visits. The AI symptom checker compares your symptoms against a database of billions of clinical data points before connecting you with a physician. Virtual visits are available for $73 per consultation or through affordable subscription plans.",
    category: "urgent-care",
    tags: ["AI health", "symptom checker", "affordable doctor", "virtual visits", "clinical AI", "primary care"],
    url: "https://www.khealth.com",
    pricing: "paid",
    featured: false,
    logo: "🤖",
    domain: "khealth.com",
  },
  {
    slug: "98point6",
    name: "98point6",
    tagline: "Text-based primary care powered by AI and real doctors",
    description: "98point6 combines AI-assisted intake with board-certified physician consultations delivered primarily through text-based chat. The AI gathers symptoms and medical history before connecting the patient with a doctor, making visits efficient and often completable during a work break. The text-first approach works well for straightforward medical concerns.",
    category: "urgent-care",
    tags: ["text-based care", "AI intake", "chat doctor", "efficient visits", "primary care", "employer benefit"],
    url: "https://www.98point6.com",
    pricing: "paid",
    featured: false,
    logo: "🌡️",
    domain: "98point6.com",
  },
  // ── SPECIALIST ──────────────────────────────────────────────────────────
  {
    slug: "hims-hers",
    name: "Hims & Hers",
    tagline: "Telehealth and prescription delivery for everyday health needs",
    description: "Hims & Hers is a direct-to-consumer telehealth platform specializing in conditions people often find difficult to discuss in person, including hair loss, sexual health, skin care, and mental health. The platform combines virtual consultations with prescription medication delivery, creating a seamless experience from diagnosis to doorstep. Hims serves men and Hers serves women with gender-specific health offerings.",
    category: "specialist",
    tags: ["prescription delivery", "hair loss", "sexual health", "skin care", "mental health", "direct-to-consumer"],
    url: "https://www.forhims.com",
    pricing: "paid",
    featured: false,
    logo: "💊",
    domain: "forhims.com",
  },
  {
    slug: "ro",
    name: "Ro",
    tagline: "Patient-centric telehealth with in-home care and pharmacy delivery",
    description: "Ro is a direct-to-patient healthcare company that combines telehealth consultations with pharmacy delivery and in-home diagnostic testing. The platform covers weight management, men's health, women's health, and smoking cessation through its Roman, Rory, and Zero brands. Ro's vertically integrated model handles everything from consultation to medication manufacturing and delivery.",
    category: "specialist",
    tags: ["patient-centric", "pharmacy delivery", "weight management", "men's health", "women's health", "in-home testing"],
    url: "https://www.ro.co",
    pricing: "paid",
    featured: false,
    logo: "🏥",
    domain: "ro.co",
  },
  // ── CHRONIC CARE ────────────────────────────────────────────────────────
  {
    slug: "lemonaid-health",
    name: "Lemonaid Health",
    tagline: "Quick online doctor visits and prescription delivery",
    description: "Lemonaid Health provides fast telehealth consultations with a focus on specific conditions like UTIs, cold sores, birth control, and mental health. The streamlined process involves a brief health questionnaire followed by doctor review, often resulting in a prescription within hours. Medications can be delivered directly or sent to a local pharmacy.",
    category: "chronic-care",
    tags: ["quick consultations", "prescription delivery", "UTI treatment", "birth control", "mental health", "fast care"],
    url: "https://www.lemonaidhealth.com",
    pricing: "paid",
    featured: false,
    logo: "🍋",
    domain: "lemonaidhealth.com",
  },
  {
    slug: "healthtap",
    name: "HealthTap",
    tagline: "Affordable virtual primary care with unlimited visits",
    description: "HealthTap offers unlimited virtual primary care visits through an affordable monthly membership. The platform provides 24/7 access to board-certified doctors via video, with no per-visit fees for members. HealthTap's model makes it particularly appealing for people without insurance or those with high-deductible plans who need regular medical attention.",
    category: "chronic-care",
    tags: ["unlimited visits", "membership healthcare", "affordable care", "24/7 doctors", "no per-visit fee", "virtual primary care"],
    url: "https://www.healthtap.com",
    pricing: "paid",
    featured: false,
    logo: "❤️",
    domain: "healthtap.com",
  },
];
