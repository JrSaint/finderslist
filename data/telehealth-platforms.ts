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

export const TELEHEALTH_CATEGORIES: Record<TelehealthCategory, { label: string; emoji: string; description: string; gradient: string; guide?: string }> = {
  "primary-care": { label: "Primary Care", emoji: "🩺", description: "Virtual doctor visits for general health concerns, prescriptions, and preventive care.", gradient: "from-blue-600/30 to-indigo-800/40", guide: "Primary care telehealth platforms connect you with licensed physicians for general health consultations, prescription refills, lab order reviews, and preventive care guidance. They are best for patients with non-emergency concerns who want convenient access to a doctor without visiting a clinic. Check whether the platform accepts your insurance, offers continuity of care with the same provider, and can send prescriptions to your preferred pharmacy." },
  "mental-health": { label: "Mental Health", emoji: "🧠", description: "Online therapy, psychiatry, and counseling from licensed mental health professionals.", gradient: "from-violet-600/30 to-purple-800/40", guide: "Mental health telehealth platforms provide access to licensed therapists, psychologists, and psychiatrists through video sessions, phone calls, or messaging-based therapy. They are ideal for individuals seeking therapy or medication management for conditions like anxiety, depression, and PTSD. Evaluate platforms based on therapist matching quality, session frequency options, and whether psychiatry services for medication prescribing are available alongside talk therapy." },
  "urgent-care": { label: "Urgent Care", emoji: "🚑", description: "On-demand virtual visits for non-emergency medical issues that need quick attention.", gradient: "from-red-600/30 to-rose-800/40", guide: "Urgent care telehealth platforms offer on-demand virtual visits, often with wait times under 15 minutes, for non-emergency conditions like infections, rashes, minor injuries, and cold or flu symptoms. They are best for patients who need quick medical attention outside of regular office hours or who want to avoid emergency room waits for non-critical issues. Prioritize platforms with 24/7 availability, short average wait times, and the ability to prescribe common medications immediately." },
  "specialist": { label: "Specialist Care", emoji: "👨‍⚕️", description: "Access dermatologists, endocrinologists, and other specialists via telehealth.", gradient: "from-emerald-600/30 to-teal-800/40", guide: "Specialist telehealth platforms connect patients with dermatologists, endocrinologists, cardiologists, and other specialists for virtual consultations and follow-up care. They are ideal for patients in areas with limited specialist access or those seeking a second opinion without a long wait for an in-person appointment. Verify that the platform has board-certified specialists in your needed area, accepts your insurance, and can coordinate with your primary care provider." },
  "chronic-care": { label: "Chronic Care", emoji: "💊", description: "Ongoing management for chronic conditions like diabetes, hypertension, and thyroid disorders.", gradient: "from-amber-600/30 to-orange-800/40", guide: "Chronic care telehealth platforms provide ongoing virtual management for long-term conditions like diabetes, hypertension, thyroid disorders, and weight management with regular check-ins and medication adjustments. They are best for patients who need consistent monitoring and prefer the convenience of managing their condition from home. Look for platforms that include remote monitoring device integration, care team continuity, and coordination with your existing healthcare providers." },
};

export const TELEHEALTH_EDITORIAL = {
  title: "How to Choose the Right Telehealth Platform in 2026",
  intro: `Telehealth platforms connect patients with licensed healthcare providers through video visits, phone calls, and asynchronous messaging for everything from urgent care and primary care to mental health, dermatology, and chronic condition management. Since the pandemic accelerated adoption, telehealth has become a permanent fixture of healthcare delivery, with most major insurance plans now covering virtual visits at the same rate as in-person appointments.\n\nThe telehealth landscape includes general platforms offering broad primary and urgent care (like Teladoc and MDLIVE), specialists focused on mental health (BetterHelp, Cerebral), and niche platforms for specific conditions like weight management, hormone therapy, or dermatology. Pricing models vary from per-visit fees ($50 to $100 without insurance) to monthly memberships ($15 to $100) that include a set number of visits and messaging access.\n\nWhen choosing a telehealth platform, the most important factors are provider availability in your state, insurance acceptance, and whether the platform treats your specific condition. Telehealth works exceptionally well for mental health, medication management, skin conditions, cold and flu symptoms, and chronic disease monitoring. It is less suitable for conditions requiring physical examination, lab work, or imaging, though many platforms now integrate with local labs and pharmacies to bridge these gaps.`,
  buyerGuide: [
    "Insurance and pricing -- Check whether the platform accepts your specific insurance plan, as coverage varies by state and insurer. Some platforms offer membership models that can be more affordable than copays for frequent users without insurance.",
    "Provider licensing by state -- Telehealth providers must be licensed in your state. Verify that the platform has providers available in your location, especially if you live in a rural area or a state with fewer participating doctors.",
    "Specialty coverage -- General platforms handle common conditions well, but if you need ongoing mental health care, dermatology, or chronic disease management, a specialized platform often provides better outcomes and continuity of care.",
    "Wait times and availability -- Some platforms offer on-demand visits within minutes while others require scheduling appointments days in advance. If you need quick urgent care access, prioritize platforms advertising same-day or on-demand availability.",
    "Prescription capabilities -- Most telehealth platforms can prescribe common medications and send them to your local pharmacy. However, controlled substances have stricter telehealth prescribing rules that vary by state, so verify this if relevant to your needs.",
  ],
  faq: [
    {
      question: "Does insurance cover telehealth visits?",
      answer: "Most major insurance plans, including Medicare, now cover telehealth visits for a wide range of conditions, often at the same copay as in-person visits. However, coverage varies by plan and state. Contact your insurer or check the telehealth platform's insurance verification tool before your first visit.",
    },
    {
      question: "Can telehealth doctors prescribe medications?",
      answer: "Yes, telehealth providers can prescribe most medications including antibiotics, blood pressure drugs, antidepressants, and skin treatments. Prescriptions for controlled substances like stimulants or anxiety medications have additional restrictions that vary by state and may require an in-person evaluation first.",
    },
    {
      question: "Is telehealth appropriate for mental health treatment?",
      answer: "Telehealth is one of the most effective applications for mental health care. Research consistently shows that therapy and psychiatric medication management delivered via video are as effective as in-person treatment for most conditions including depression, anxiety, PTSD, and ADHD.",
    },
  ],
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
    pros: [
      "Physicians from top-50 medical schools provide high-quality care",
      "Focus on ongoing doctor-patient relationships rather than one-off visits",
      "Handles prescriptions, lab orders, referrals, and preventive care",
      "Choose and keep the same primary care doctor across visits",
    ],
    cons: [
      "Membership model requires monthly fee even during months without visits",
      "Not designed for urgent care — visits require scheduling in advance",
      "Higher cost than on-demand platforms for occasional use",
    ],
    useCases: [
      "Patient wanting a virtual primary care relationship with a top-quality physician",
      "Person needing ongoing prescription management and regular check-ups remotely",
      "Health-conscious individual seeking preventive care through scheduled video appointments",
    ],
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
    pros: [
      "Subscription includes prescriber visits, medication delivery, and optional therapy",
      "Works with most major insurance plans to reduce out-of-pocket costs",
      "Handles prior authorizations for medications on your behalf",
      "Focus on anxiety, depression, and insomnia — the most common mental health conditions",
    ],
    cons: [
      "Past regulatory scrutiny around prescribing practices has affected reputation",
      "Cancellation process has drawn complaints from some subscribers",
      "Not suitable for severe mental health conditions requiring in-person care",
    ],
    useCases: [
      "Person with anxiety or depression wanting online psychiatry with medication management",
      "Patient needing medications delivered to their door with prescriber oversight",
      "Individual wanting to combine therapy and psychiatry in one subscription platform",
    ],
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
    pros: [
      "Multiple communication modes including text, audio, and video sessions",
      "Messaging-based therapy allows asynchronous communication between sessions",
      "Insurance accepted from many major carriers to reduce costs",
      "Both ongoing subscription and single-session options available",
    ],
    cons: [
      "Therapist quality can vary — switching therapists may be necessary",
      "Text-based therapy may feel impersonal compared to face-to-face sessions",
      "Without insurance, subscription costs can be significant monthly",
    ],
    useCases: [
      "Person who prefers text-based therapy for processing thoughts between live sessions",
      "Patient with insurance wanting online therapy covered by their plan",
      "Individual seeking flexible therapy that fits around a busy schedule",
    ],
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
    pros: [
      "Largest online therapy platform with the widest selection of therapists",
      "Matching algorithm pairs clients with therapists based on preferences and issues",
      "Weekly live sessions plus unlimited messaging included in subscription",
      "Financial aid available for qualifying users to reduce costs",
    ],
    cons: [
      "Does not accept insurance — all payments are out-of-pocket",
      "Therapists are contractors, which can affect long-term availability",
      "Monthly cost of $65-$100+ may be prohibitive without insurance reimbursement",
    ],
    useCases: [
      "Person seeking therapy for the first time who wants easy matching with a licensed therapist",
      "Individual who benefits from unlimited messaging between live sessions",
      "User needing financial aid to make therapy affordable on a limited budget",
    ],
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
    pros: [
      "Transparent upfront pricing starting as low as $26 for telehealth visits",
      "No insurance required — pay directly for exactly the care you need",
      "Covers primary care, dental, mental health, and specialist visits",
      "Ideal for uninsured or underinsured patients seeking affordable care",
    ],
    cons: [
      "Prices are out-of-pocket and cannot be submitted to insurance for reimbursement on most plans",
      "Provider availability varies by location and specialty",
      "No continuity-of-care model — each visit may be with a different provider",
    ],
    useCases: [
      "Uninsured person needing an affordable telehealth visit without insurance hassles",
      "Patient wanting to see a specialist at a transparent, pre-set price",
      "Person with a high-deductible plan seeking cheaper direct-pay care for routine issues",
    ],
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
    pros: [
      "AI symptom checker compares against billions of clinical data points before physician consultation",
      "Affordable per-visit pricing and subscription plans available",
      "AI triage helps determine urgency and appropriate care level",
      "Board-certified physicians available for virtual consultations",
    ],
    cons: [
      "AI triage may feel impersonal for patients preferring direct human interaction",
      "Not suitable for complex or chronic conditions requiring ongoing management",
      "Limited specialist access compared to full-service telehealth platforms",
    ],
    useCases: [
      "Person with symptoms wanting an AI-powered initial assessment before seeing a doctor",
      "Patient seeking affordable primary care without insurance",
      "Tech-savvy user who wants data-driven health insights alongside physician consultations",
    ],
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
    pros: [
      "Text-first approach makes visits completable during a work break",
      "AI gathers symptoms and history before connecting with a physician",
      "Efficient consultations for straightforward medical concerns",
      "Popular as an employer benefit with low per-visit cost",
    ],
    cons: [
      "Text-based format may not suit patients who prefer face-to-face video",
      "Not appropriate for conditions requiring visual examination",
      "Primarily available as an employer benefit rather than direct consumer purchase",
    ],
    useCases: [
      "Employee using an employer-provided benefit for a quick text-based medical consultation",
      "Person wanting efficient care for a UTI, cold, or skin rash via text chat",
      "Busy professional who needs a doctor consultation during a short break",
    ],
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
    pros: [
      "Discreet consultations for sensitive health topics like hair loss and sexual health",
      "Prescription medication delivered directly to your door in plain packaging",
      "Separate platforms for men (Hims) and women (Hers) with gender-specific offerings",
      "Affordable subscription pricing for ongoing treatment plans",
    ],
    cons: [
      "Focused on specific consumer health categories rather than comprehensive primary care",
      "Does not accept insurance — all payments are out-of-pocket",
      "Consultation quality varies since providers are seeing many patients daily",
    ],
    useCases: [
      "Person seeking discreet treatment for hair loss or sexual health concerns",
      "Patient wanting prescription skin care delivered monthly with provider oversight",
      "Individual looking for affordable online access to mental health medication",
    ],
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
    pros: [
      "Vertically integrated model handles consultation through medication manufacturing and delivery",
      "In-home diagnostic testing available for lab work without visiting a clinic",
      "Covers weight management, men's health, women's health, and smoking cessation",
      "Pharmacy delivery ensures medication arrives conveniently at home",
    ],
    cons: [
      "Does not accept insurance for most services",
      "Focused on specific health categories rather than comprehensive care",
      "Pricing can be higher than generic medication alternatives at a local pharmacy",
    ],
    useCases: [
      "Person wanting end-to-end care from consultation to medication delivery for weight management",
      "Patient who prefers at-home diagnostic testing over visiting a lab or clinic",
      "Individual seeking a comprehensive telehealth experience for men's or women's health needs",
    ],
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
    pros: [
      "Fast consultation process often results in a prescription within hours",
      "Streamlined for specific conditions like UTIs, cold sores, and birth control",
      "Medications can be delivered directly or sent to a local pharmacy",
      "Affordable per-visit pricing without subscription commitments",
    ],
    cons: [
      "Limited to specific treatable conditions — not a general primary care platform",
      "Consultation is typically a brief questionnaire reviewed by a doctor, not a full visit",
      "Does not accept insurance for most services",
    ],
    useCases: [
      "Person with a UTI wanting fast prescription access without an office visit",
      "Patient needing a birth control prescription renewed conveniently online",
      "Individual with a cold sore seeking quick antiviral medication delivery",
    ],
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
    pros: [
      "Unlimited virtual visits through affordable monthly membership",
      "24/7 access to board-certified doctors with no per-visit fees",
      "Membership model is especially cost-effective for frequent users",
      "Ideal for people without insurance or with high-deductible plans",
    ],
    cons: [
      "Monthly membership fee applies even during months without visits",
      "Provider continuity may be limited with rotating doctor pool",
      "Not suitable for conditions requiring in-person examination or specialist care",
    ],
    useCases: [
      "Uninsured person needing regular medical access at a predictable monthly cost",
      "Person with a high-deductible plan who wants unlimited visits without copay worries",
      "Individual with recurring minor health issues who benefits from frequent doctor access",
    ],
  },
];
