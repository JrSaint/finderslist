export type MentalHealthCategory =
  | "therapy-counseling"
  | "meditation-mindfulness"
  | "mood-tracking"
  | "substance-recovery"
  | "crisis-support";

export interface MentalHealthTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: MentalHealthCategory;
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

export const MENTAL_HEALTH_CATEGORIES: Record<MentalHealthCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "therapy-counseling": { label: "Therapy & Counseling", emoji: "🛋️", description: "Connect with licensed therapists for professional counseling and talk therapy.", gradient: "from-violet-600/30 to-purple-800/40" },
  "meditation-mindfulness": { label: "Meditation & Mindfulness", emoji: "🧘", description: "Guided meditation, breathing exercises, and mindfulness practices for daily wellness.", gradient: "from-teal-600/30 to-emerald-800/40" },
  "mood-tracking": { label: "Mood Tracking", emoji: "📊", description: "Track emotions, identify patterns, and build self-awareness with daily check-ins.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "substance-recovery": { label: "Substance Recovery", emoji: "🌱", description: "Support tools for addiction recovery, sobriety tracking, and substance abuse treatment.", gradient: "from-amber-600/30 to-orange-800/40" },
  "crisis-support": { label: "Crisis Support", emoji: "🆘", description: "Immediate access to crisis counselors and mental health support during emergencies.", gradient: "from-red-600/30 to-rose-800/40" },
};

export const MENTAL_HEALTH_EDITORIAL = {
  title: "How to Choose the Right Mental Health App in 2026",
  intro: `Mental health apps provide accessible, affordable tools for managing anxiety, depression, stress, and other psychological concerns from the privacy of your phone. They range from full therapy platforms connecting you with licensed clinicians to self-guided programs built around cognitive behavioral therapy, meditation, and mood tracking. For the millions of people who face long wait times, high costs, or stigma barriers to traditional therapy, these apps can be a lifeline.\n\nThe mental health app market has matured significantly, and the best platforms now offer evidence-based approaches validated by clinical research. Some apps are FDA-cleared as digital therapeutics, while others serve as supplements to in-person treatment. The key is matching the right tool to your specific needs -- someone dealing with acute anxiety may benefit most from a CBT-based program, while someone focused on daily wellness might prefer a meditation and mindfulness app.\n\nWhen evaluating mental health apps, privacy deserves special attention. These platforms handle deeply sensitive personal data, so look for apps with transparent privacy policies, HIPAA compliance (for therapy platforms), and a clear commitment not to sell your data to third parties.`,
  buyerGuide: [
    "Clinical evidence and approach -- prioritize apps backed by peer-reviewed research or based on proven modalities like CBT, DBT, or mindfulness-based stress reduction rather than vague wellness claims.",
    "Therapist access vs. self-guided -- decide whether you need live sessions with a licensed professional or a self-paced program with exercises and journaling, as costs and commitment differ dramatically.",
    "Privacy and data handling -- verify the app is HIPAA-compliant (if offering therapy), read the privacy policy carefully, and confirm your data is encrypted and never sold to advertisers or data brokers.",
    "Crisis support features -- good mental health apps include safety planning tools, crisis hotline integration, and clear guidance for when self-help is not enough and professional intervention is needed.",
    "Insurance and cost structure -- some therapy apps accept insurance or offer sliding-scale pricing, while self-guided apps typically charge $10-$20/month; compare total costs including session frequency.",
  ],
  faq: [
    {
      question: "Can a mental health app replace in-person therapy?",
      answer: "For mild to moderate anxiety and depression, research shows that app-based therapy can be comparably effective to in-person sessions, especially platforms offering live video with licensed therapists. However, for severe mental illness, complex trauma, or crisis situations, in-person or intensive treatment is generally recommended. Many people use apps to supplement traditional therapy rather than replace it entirely.",
    },
    {
      question: "Are mental health apps covered by insurance?",
      answer: "Some therapy platforms like Talkspace and BetterHelp accept major insurance plans, and coverage has expanded significantly since 2020. Self-guided wellness apps are typically not covered by insurance but may be reimbursable through HSA/FSA accounts. Check with your specific insurer, as coverage varies by plan and state.",
    },
    {
      question: "How do I know if a mental health app is legitimate?",
      answer: "Look for apps that employ licensed therapists (if offering therapy), cite published clinical studies, follow HIPAA guidelines, and have transparent privacy policies. Avoid apps making grandiose cure claims or those that lack any clinical oversight. Professional endorsements from organizations like the APA or NAMI can also signal credibility.",
    },
  ],
};

export const MENTAL_HEALTH_TOOLS: MentalHealthTool[] = [
  // ── THERAPY & COUNSELING ────────────────────────────────────────────────
  {
    slug: "betterhelp",
    name: "BetterHelp",
    tagline: "The world's largest online therapy platform with 30,000+ therapists",
    description: "BetterHelp matches users with licensed therapists for weekly live sessions via video, phone, or chat, plus unlimited asynchronous messaging between appointments. The platform's matching algorithm considers therapeutic needs, preferences, and communication style to pair clients with appropriate providers. With over 30,000 licensed therapists in its network, BetterHelp covers anxiety, depression, relationship issues, trauma, grief, and many other concerns. Financial aid is available for qualifying users.",
    category: "therapy-counseling",
    tags: ["online therapy", "licensed therapists", "video therapy", "messaging therapy", "financial aid", "therapy matching", "mental health"],
    url: "https://www.betterhelp.com",
    pricing: "paid",
    featured: true,
    logo: "💚",
    domain: "betterhelp.com",
    pros: [
      "Largest therapist network with over 30,000 licensed professionals",
      "Flexible session formats including video, phone, chat, and messaging",
      "Easy therapist switching if the initial match is not ideal",
      "Financial aid program reduces costs for qualifying users",
      "Covers a comprehensive range of mental health concerns and specialties",
    ],
    cons: [
      "Not covered by most insurance plans, requiring out-of-pocket payment",
      "Subscription cost of $65-100/week may be prohibitive for some users",
      "Cannot prescribe medication; psychiatry requires a separate service",
      "Therapist quality can vary across such a large network",
    ],
    useCases: [
      "Start weekly therapy sessions for generalized anxiety with a CBT-trained therapist",
      "Message your therapist between sessions when stressful events arise at work",
      "Switch to a new therapist specializing in grief after experiencing a loss",
    ],
  },
  {
    slug: "talkspace",
    name: "Talkspace",
    tagline: "Therapy and psychiatry that fits your life and schedule",
    description: "Talkspace provides online therapy and psychiatry through text, audio, and video sessions with licensed providers. Unlike BetterHelp, Talkspace accepts insurance from many major carriers including Aetna, Cigna, and Optum, making it more affordable for insured users. The platform also offers psychiatric services with medication management, couples therapy, and teen therapy. Talkspace's enterprise partnerships make it available as an employee benefit at many large companies.",
    category: "therapy-counseling",
    tags: ["online therapy", "psychiatry", "insurance accepted", "text therapy", "couples therapy", "teen therapy", "employee benefit"],
    url: "https://www.talkspace.com",
    pricing: "paid",
    featured: true,
    logo: "💬",
    domain: "talkspace.com",
    pros: [
      "Accepts insurance from major carriers, significantly reducing out-of-pocket costs",
      "Psychiatric services available for medication management alongside therapy",
      "Couples therapy and teen therapy options expand family coverage",
      "Enterprise partnerships make it available as a free employee benefit",
    ],
    cons: [
      "Therapist response times for messaging can be slow between sessions",
      "Insurance coverage availability varies significantly by plan and state",
      "Platform navigation and session scheduling could be more intuitive",
      "Provider availability is more limited than BetterHelp's larger network",
    ],
    useCases: [
      "Use your Cigna insurance to get therapy sessions at your standard copay rate",
      "Add psychiatric medication management for depression alongside weekly therapy",
      "Enroll in couples therapy to work through communication issues with a partner",
    ],
  },
  // ── MEDITATION & MINDFULNESS ────────────────────────────────────────────
  {
    slug: "calm",
    name: "Calm",
    tagline: "The number one app for sleep, meditation, and relaxation",
    description: "Calm is the leading meditation and sleep app, offering guided meditations, sleep stories narrated by celebrities, breathing exercises, and calming music. The app covers stress reduction, focus improvement, anxiety management, and sleep quality with programs ranging from beginner to advanced. Calm's Daily Calm feature provides a new 10-minute meditation each day, building a consistent mindfulness habit.",
    category: "meditation-mindfulness",
    tags: ["meditation", "sleep stories", "breathing exercises", "stress relief", "mindfulness", "daily meditation", "relaxation"],
    url: "https://www.calm.com",
    pricing: "freemium",
    featured: true,
    logo: "🌙",
    domain: "calm.com",
    pros: [
      "Highest-rated meditation app with extensive content library",
      "Sleep stories narrated by well-known voices aid falling asleep",
      "Daily Calm feature builds a consistent 10-minute meditation habit",
      "Programs for specific needs: anxiety, focus, self-esteem, and relationships",
      "Calm for Business makes it available as an employee wellness benefit",
    ],
    cons: [
      "Premium subscription required for most content beyond basic meditations",
      "Annual pricing of $69.99 is higher than some competitors",
      "Content depth for advanced practitioners is limited",
      "Offline download capability requires premium subscription",
    ],
    useCases: [
      "Listen to a Sleep Story after a stressful day to wind down and fall asleep faster",
      "Complete the 7 Days of Calm beginner program to establish a daily meditation habit",
      "Use the 5-minute anxiety SOS meditation during a panic attack at work",
    ],
  },
  {
    slug: "headspace",
    name: "Headspace",
    tagline: "Mindfulness and meditation backed by clinical research",
    description: "Headspace is a science-backed meditation app with structured courses, guided exercises, and sleep content designed by mindfulness experts. The app's approach is rooted in clinical research, with multiple published studies demonstrating the effectiveness of its programs. Headspace offers themed courses for stress, sleep, focus, and movement, along with SOS sessions for moments of acute anxiety or anger. The animated explanations of meditation concepts make mindfulness accessible to complete beginners.",
    category: "meditation-mindfulness",
    tags: ["meditation", "mindfulness", "science-backed", "sleep", "focus", "stress management", "clinical research"],
    url: "https://www.headspace.com",
    pricing: "freemium",
    featured: true,
    logo: "🟠",
    domain: "headspace.com",
    pros: [
      "Clinically researched programs with published scientific studies",
      "Structured courses progressively build meditation skills",
      "Animated videos explain mindfulness concepts in an approachable way",
      "Focus music and movement exercises expand beyond traditional meditation",
    ],
    cons: [
      "Premium subscription required for course progression beyond basics",
      "Content library is smaller than Calm's offering",
      "Guided approach may feel too structured for experienced meditators",
      "Annual subscription at $69.99 matches premium competitors",
    ],
    useCases: [
      "Complete the Basics course to learn meditation fundamentals over 10 sessions",
      "Use the Focus music playlist during deep work sessions to maintain concentration",
      "Play the Sleepcast ambient audio to create a calming bedroom environment",
    ],
  },
  {
    slug: "woebot",
    name: "Woebot",
    tagline: "AI-powered mental health chatbot using CBT techniques",
    description: "Woebot is a mental health chatbot that uses cognitive behavioral therapy (CBT) principles to help users identify and reframe negative thought patterns. Developed by Stanford psychologists, Woebot provides daily check-ins, mood tracking, and guided exercises through conversational AI. The chatbot is available 24/7 and serves as a supplement to professional therapy rather than a replacement.",
    category: "meditation-mindfulness",
    tags: ["AI therapy", "CBT chatbot", "mood tracking", "cognitive behavioral therapy", "Stanford", "daily check-in", "mental wellness"],
    url: "https://woebothealth.com",
    pricing: "free",
    featured: false,
    logo: "🤖",
    domain: "woebothealth.com",
    pros: [
      "Completely free with no premium tier or hidden costs",
      "Available 24/7 for immediate CBT-based support without appointments",
      "Developed by Stanford psychologists with clinical research backing",
      "Daily check-ins build consistent mental health habits",
      "Conversational format feels less intimidating than formal therapy",
    ],
    cons: [
      "AI chatbot cannot replace the nuance of a human therapist",
      "Limited to CBT techniques and may not suit all therapeutic needs",
      "Responses can feel repetitive after extended use",
    ],
    useCases: [
      "Practice CBT thought-reframing exercises between scheduled therapy sessions",
      "Get immediate support for negative thought spirals at 2 AM when therapists are unavailable",
      "Use daily mood check-ins to identify recurring anxiety triggers over time",
    ],
  },
  {
    slug: "wysa",
    name: "Wysa",
    tagline: "AI mental health companion with human therapist backup",
    description: "Wysa combines an AI chatbot trained in evidence-based therapeutic techniques with optional access to human therapists. The AI penguin guides users through CBT, DBT, meditation, and breathing exercises while tracking moods and identifying patterns. For users who need more support, Wysa offers paid sessions with licensed therapists through the same platform.",
    category: "meditation-mindfulness",
    tags: ["AI companion", "CBT", "DBT", "mood tracking", "therapist access", "evidence-based", "mental wellness"],
    url: "https://www.wysa.com",
    pricing: "freemium",
    featured: false,
    logo: "🐧",
    domain: "wysa.com",
    pros: [
      "Free AI companion covers CBT, DBT, meditation, and breathing exercises",
      "Optional human therapist access within the same platform for escalation",
      "Evidence-based techniques validated through clinical research partnerships",
      "Friendly penguin interface reduces stigma and encourages engagement",
    ],
    cons: [
      "Human therapist sessions require a separate paid subscription",
      "AI responses can feel generic for complex emotional situations",
      "Limited language support compared to larger therapy platforms",
    ],
    useCases: [
      "Start with free AI-guided CBT exercises and upgrade to a human therapist when needed",
      "Use guided breathing exercises to manage acute anxiety during stressful workdays",
      "Track mood patterns over weeks to share insights with an in-person therapist",
    ],
  },
  // ── MOOD TRACKING ───────────────────────────────────────────────────────
  {
    slug: "sanvello",
    name: "Sanvello",
    tagline: "Clinically validated mental health app with insurance coverage",
    description: "Sanvello offers CBT-based tools, mood tracking, guided journeys, and peer support communities for managing stress, anxiety, and depression. The app is clinically validated and covered by many insurance plans as a digital therapeutic. Sanvello's combination of self-help tools and community support creates a comprehensive mental health ecosystem outside of traditional therapy.",
    category: "mood-tracking",
    tags: ["clinically validated", "CBT tools", "mood tracking", "peer support", "insurance covered", "digital therapeutic"],
    url: "https://www.sanvello.com",
    pricing: "freemium",
    featured: false,
    logo: "🌿",
    domain: "sanvello.com",
    pros: [
      "Clinically validated and covered by many health insurance plans",
      "Combines CBT tools, mood tracking, and peer support communities",
      "Guided journeys provide structured self-help programs for specific conditions",
      "Free tier offers meaningful functionality without requiring payment",
    ],
    cons: [
      "Insurance coverage varies and is not available in all states",
      "Peer community moderation quality can be inconsistent",
      "App updates have occasionally disrupted user progress and data",
    ],
    useCases: [
      "Use insurance-covered CBT exercises as an affordable supplement to traditional therapy",
      "Join peer support communities to connect with others managing similar anxiety challenges",
      "Complete a guided journey for workplace stress during a high-pressure project",
    ],
  },
  {
    slug: "happify",
    name: "Happify",
    tagline: "Science-based activities to overcome negative thoughts",
    description: "Happify uses positive psychology and CBT-based games and activities to help users build resilience, reduce stress, and overcome negative thinking patterns. The platform offers guided tracks for specific life situations like work stress, relationship challenges, and health concerns. Activities are designed as short interactive exercises that fit into daily routines.",
    category: "mood-tracking",
    tags: ["positive psychology", "CBT activities", "stress reduction", "resilience building", "interactive exercises", "happiness science"],
    url: "https://www.happify.com",
    pricing: "freemium",
    featured: false,
    logo: "😊",
    domain: "happify.com",
    pros: [
      "Science-based activities grounded in positive psychology and CBT research",
      "Gamified exercises make mental health practice engaging and habit-forming",
      "Guided tracks tailored to specific life situations like work stress or relationships",
      "Short interactive activities fit easily into a busy daily schedule",
    ],
    cons: [
      "Premium subscription required for full access to tracks and features",
      "Gamification style may feel trivializing for users with serious mental health concerns",
      "Content depth is limited compared to dedicated therapy platforms",
    ],
    useCases: [
      "Build daily resilience through short positive psychology exercises during lunch breaks",
      "Follow the work stress track during a demanding career transition",
      "Use gratitude and savoring activities to counteract persistent negative thinking patterns",
    ],
  },
  {
    slug: "mindshift",
    name: "MindShift",
    tagline: "Free CBT-based app for managing anxiety in daily life",
    description: "MindShift CBT is a free app developed by Anxiety Canada that provides evidence-based strategies for managing anxiety, panic, perfectionism, social anxiety, and worry. The app includes thought journals, coping cards, belief experiments, and exposure hierarchy tools grounded in cognitive behavioral therapy. It is one of the few completely free, ad-free mental health tools available.",
    category: "mood-tracking",
    tags: ["free anxiety app", "CBT tools", "Anxiety Canada", "thought journal", "coping strategies", "exposure therapy", "ad-free"],
    url: "https://www.anxietycanada.com/resources/mindshift-cbt",
    pricing: "free",
    featured: false,
    logo: "🔄",
    domain: "anxietycanada.com",
    pros: [
      "Completely free and ad-free with no premium tier or upsells",
      "Developed by Anxiety Canada with strong clinical credibility",
      "Includes thought journals, coping cards, and exposure hierarchy tools",
      "Specifically designed for anxiety disorders rather than general wellness",
      "Evidence-based CBT strategies validated by mental health professionals",
    ],
    cons: [
      "Focused exclusively on anxiety and may not address depression or other conditions",
      "Interface design is functional but less polished than commercial apps",
      "No therapist access or community support features built in",
    ],
    useCases: [
      "Build an exposure hierarchy to gradually face social anxiety triggers",
      "Use thought journals to challenge catastrophic thinking before important presentations",
      "Create coping cards for specific anxiety-inducing situations like flying or crowded spaces",
    ],
  },
  {
    slug: "moodpath",
    name: "Moodpath",
    tagline: "Depression and anxiety screening with daily emotional assessments",
    description: "Moodpath (now MindDoc) provides daily emotional health assessments that generate a clinical-grade screening report after two weeks. Users can share this report with their doctor or therapist to facilitate productive conversations about mental health. The app also offers guided exercises, psychoeducation courses, and audio content for managing symptoms between professional appointments.",
    category: "mood-tracking",
    tags: ["depression screening", "emotional assessment", "clinical report", "psychoeducation", "daily check-in", "therapist sharing"],
    url: "https://www.minddoc.com",
    pricing: "freemium",
    featured: false,
    logo: "📋",
    domain: "minddoc.com",
    pros: [
      "Generates clinical-grade screening reports shareable with healthcare providers",
      "Daily assessments build a comprehensive picture of emotional health over time",
      "Psychoeducation courses teach users about their conditions and coping strategies",
      "Bridges the gap between self-help and professional treatment effectively",
    ],
    cons: [
      "Premium subscription needed for full access to courses and audio content",
      "Screening reports require a two-week assessment period before generation",
      "App rebranding from Moodpath to MindDoc has caused some user confusion",
    ],
    useCases: [
      "Complete a two-week assessment to generate a depression screening report for your doctor",
      "Use daily emotional check-ins to monitor mood changes after starting new medication",
      "Share assessment data with a therapist to make intake sessions more productive",
    ],
  },
  {
    slug: "daylio",
    name: "Daylio",
    tagline: "Micro-diary and mood tracker that reveals emotional patterns",
    description: "Daylio is a mood tracking app that lets users log their mood and daily activities without writing a single word. The tap-to-track interface makes daily check-ins take just seconds, and over time the app reveals correlations between activities and emotional states. The statistics and calendar views help users understand what makes their days better or worse.",
    category: "mood-tracking",
    tags: ["mood tracker", "micro diary", "activity tracking", "mood patterns", "statistics", "no-writing journal", "daily check-in"],
    url: "https://daylio.net",
    pricing: "freemium",
    featured: false,
    logo: "📅",
    domain: "daylio.net",
    pros: [
      "Tap-to-track interface makes daily mood logging take only seconds",
      "Reveals correlations between activities and emotional states over time",
      "No writing required, lowering the barrier to consistent journaling",
      "Statistics and calendar views provide clear visual mood pattern insights",
      "Highly customizable mood categories and activity icons",
    ],
    cons: [
      "Premium subscription required for advanced statistics and data export",
      "Simplicity means it lacks therapeutic guidance or coping tools",
      "Activity-mood correlations are observational and not clinically validated",
    ],
    useCases: [
      "Log daily moods and activities to discover which habits correlate with better mental health",
      "Track emotional patterns across months to identify seasonal depression triggers",
      "Share mood data visualizations with a therapist to guide treatment conversations",
    ],
  },
  // ── SUBSTANCE RECOVERY ──────────────────────────────────────────────────
  {
    slug: "i-am-sober",
    name: "I Am Sober",
    tagline: "Sobriety tracker and motivational companion",
    description: "I Am Sober is a sobriety and addiction recovery tracking app that counts clean time, provides daily motivational pledges, and connects users with a supportive community. The app tracks savings from avoided substance purchases, offers milestone celebrations, and includes a daily reflection journal. It supports recovery from alcohol, drugs, smoking, and other addictive behaviors.",
    category: "substance-recovery",
    tags: ["sobriety tracker", "addiction recovery", "clean time", "daily pledge", "milestone tracking", "recovery community"],
    url: "https://iamsober.com",
    pricing: "freemium",
    featured: false,
    logo: "💪",
    domain: "iamsober.com",
    pros: [
      "Daily pledge feature reinforces commitment to sobriety each morning",
      "Tracks money saved from avoided substance purchases as tangible motivation",
      "Milestone celebrations provide positive reinforcement at key recovery markers",
      "Supportive community connects users with others on similar recovery journeys",
    ],
    cons: [
      "Premium subscription needed for advanced features and detailed statistics",
      "Community interactions are not moderated by licensed professionals",
      "Limited therapeutic content beyond tracking and motivational features",
    ],
    useCases: [
      "Take a daily sobriety pledge each morning to reinforce recovery commitment",
      "Track the financial savings from quitting alcohol to stay motivated during early recovery",
      "Celebrate milestone achievements and share progress with the recovery community",
    ],
  },
  {
    slug: "recovery-dharma",
    name: "Recovery Dharma",
    tagline: "Buddhist-inspired peer support for addiction recovery",
    description: "Recovery Dharma is a peer-led addiction recovery community that uses Buddhist practices including meditation and mindfulness as the foundation for recovery. The organization offers free online and in-person meetings, a recovery book, and meditation resources. Unlike 12-step programs, Recovery Dharma takes a secular, non-theistic approach to recovery that appeals to people seeking an alternative framework.",
    category: "substance-recovery",
    tags: ["Buddhist recovery", "peer support", "meditation", "mindfulness", "free meetings", "secular recovery", "alternative to AA"],
    url: "https://recoverydharma.org",
    pricing: "free",
    featured: false,
    logo: "☸️",
    domain: "recoverydharma.org",
    pros: [
      "Completely free with no paid tiers or membership fees",
      "Secular and non-theistic approach appeals to those uncomfortable with 12-step programs",
      "Buddhist-inspired meditation practices support both recovery and general well-being",
      "Free online meetings make participation accessible from anywhere",
    ],
    cons: [
      "Peer-led meetings lack licensed professional oversight or clinical guidance",
      "Meeting availability varies significantly by geographic region for in-person attendance",
      "Less structured program than traditional 12-step approaches may not suit everyone",
    ],
    useCases: [
      "Attend free online recovery meetings as an alternative to AA for non-religious individuals",
      "Use Buddhist meditation practices to manage cravings and build mindfulness in recovery",
      "Supplement professional addiction treatment with community peer support between sessions",
    ],
  },
  // ── CRISIS SUPPORT ──────────────────────────────────────────────────────
  {
    slug: "crisis-text-line",
    name: "Crisis Text Line",
    tagline: "Free crisis support via text message, available 24/7",
    description: "Crisis Text Line provides free, 24/7 crisis support via text message for anyone in the United States experiencing emotional distress. Trained crisis counselors respond to texts sent to 741741, offering immediate support for anxiety, depression, suicidal ideation, abuse, and other crises. The text-based format makes it accessible to people who may be unable or unwilling to make a phone call during a crisis.",
    category: "crisis-support",
    tags: ["crisis support", "text counseling", "24/7 helpline", "suicide prevention", "free support", "emergency mental health"],
    url: "https://www.crisistextline.org",
    pricing: "free",
    featured: false,
    logo: "🆘",
    domain: "crisistextline.org",
    pros: [
      "Completely free 24/7 crisis support with no eligibility requirements",
      "Text-based format is accessible for people who cannot make phone calls",
      "Trained crisis counselors provide immediate real-time support",
      "Lower barrier to reaching out compared to calling a crisis hotline",
      "Confidential and discreet communication via standard text messaging",
    ],
    cons: [
      "Wait times for a counselor can be significant during high-demand periods",
      "Text-based communication limits emotional nuance compared to voice calls",
      "Volunteer counselors are trained but not licensed mental health professionals",
    ],
    useCases: [
      "Text 741741 during a panic attack when speaking on the phone feels impossible",
      "Reach out discreetly for crisis support while in an unsafe home environment",
      "Get immediate de-escalation support during acute suicidal ideation",
    ],
  },
  {
    slug: "7-cups",
    name: "7 Cups",
    tagline: "Free emotional support from trained volunteer listeners",
    description: "7 Cups connects people experiencing emotional distress with trained volunteer listeners for free, anonymous, one-on-one chat support. The platform also offers community chat rooms, self-help guides, and affordable online therapy with licensed professionals. The volunteer listener model provides a low-barrier entry point for people who are not ready for formal therapy but need someone to talk to.",
    category: "crisis-support",
    tags: ["volunteer listeners", "free support", "anonymous chat", "emotional support", "community forums", "self-help guides", "peer support"],
    url: "https://www.7cups.com",
    pricing: "freemium",
    featured: false,
    logo: "☕",
    domain: "7cups.com",
    pros: [
      "Free anonymous chat support from trained volunteer listeners available 24/7",
      "Low barrier entry point for people not ready for formal therapy",
      "Community forums and self-help guides complement one-on-one support",
      "Affordable online therapy option available for users who want professional help",
    ],
    cons: [
      "Volunteer listener quality and training varies significantly",
      "Anonymous nature means no continuity of care between conversations",
      "Professional therapy through the platform is limited compared to dedicated providers",
      "Wait times for a listener can be long during peak hours",
    ],
    useCases: [
      "Talk anonymously to a trained listener when processing grief and not ready for therapy",
      "Join community chat rooms focused on specific issues like social anxiety or PTSD",
      "Use self-help guides to develop coping strategies while waiting for a therapy appointment",
    ],
  },
];
