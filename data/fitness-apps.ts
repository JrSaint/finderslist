export type FitnessAppCategory =
  | "workout-training"
  | "running-cardio"
  | "yoga-flexibility"
  | "nutrition-diet"
  | "wearable-connected";

export interface FitnessAppTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: FitnessAppCategory;
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

export const FITNESS_APP_CATEGORIES: Record<FitnessAppCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "workout-training": { label: "Workout & Training", emoji: "💪", description: "Structured workout programs, strength training plans, and guided exercise routines.", gradient: "from-red-600/30 to-orange-800/40" },
  "running-cardio": { label: "Running & Cardio", emoji: "🏃", description: "GPS tracking, training plans, and social features for runners and cyclists.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "yoga-flexibility": { label: "Yoga & Flexibility", emoji: "🧘", description: "Yoga classes, stretching routines, and flexibility programs for all levels.", gradient: "from-teal-600/30 to-emerald-800/40" },
  "nutrition-diet": { label: "Nutrition & Diet", emoji: "🥗", description: "Calorie tracking, macro counting, meal planning, and nutritional guidance.", gradient: "from-green-600/30 to-lime-800/40" },
  "wearable-connected": { label: "Wearable Connected", emoji: "⌚", description: "Fitness platforms that sync with wearable devices for comprehensive health tracking.", gradient: "from-violet-600/30 to-purple-800/40" },
};

export const FITNESS_APP_TOOLS: FitnessAppTool[] = [
  // ── WORKOUT & TRAINING ──────────────────────────────────────────────────
  {
    slug: "peloton",
    name: "Peloton",
    tagline: "World-class fitness classes streaming live and on-demand",
    description: "Peloton offers thousands of live and on-demand fitness classes spanning cycling, running, strength, yoga, meditation, and more. While known for its connected bike and tread hardware, the Peloton App provides access to the full class library without any equipment. Instructors are charismatic professionals who build engaged communities, and the leaderboard and scheduling features create accountability. The content library grows daily with new classes across dozens of categories.",
    category: "workout-training",
    tags: ["live classes", "cycling", "strength training", "yoga", "streaming fitness", "community", "on-demand workouts"],
    url: "https://www.onepeloton.com",
    pricing: "paid",
    featured: true,
    logo: "🚴",
    domain: "onepeloton.com",
    pros: [
      "Massive library of live and on-demand classes across 10+ fitness categories",
      "World-class instructors with engaged, motivating communities",
      "App-only subscription available without purchasing hardware",
      "Leaderboard and social features create accountability and competition",
      "New classes added daily keep the content fresh and varied",
    ],
    cons: [
      "App subscription costs $12.99/month, higher than many competitors",
      "Best experience requires expensive connected hardware ($1,400+)",
      "Class-based format may not suit those who prefer self-directed workouts",
      "Strength training equipment integration is limited compared to cycling",
    ],
    useCases: [
      "Stream a 30-minute HIIT class during lunch break using just a yoga mat and the app",
      "Follow a structured 6-week strength training program with progressive overload",
      "Join a live cycling class and compete on the leaderboard with other riders worldwide",
    ],
  },
  {
    slug: "nike-training-club",
    name: "Nike Training Club",
    tagline: "Free premium workouts from world-class Nike trainers",
    description: "Nike Training Club (NTC) provides a vast library of free workouts led by Nike Master Trainers and professional athletes. Programs cover strength, endurance, mobility, and yoga with workouts ranging from 5 to 60 minutes. The app adapts recommendations based on your activity level and goals, and multi-week training plans provide structured progression. NTC made its full premium library free in 2020, making it one of the most generous free fitness apps available.",
    category: "workout-training",
    tags: ["free workouts", "Nike trainers", "strength training", "HIIT", "yoga", "training plans", "no equipment"],
    url: "https://www.nike.com/ntc-app",
    pricing: "free",
    featured: true,
    logo: "✔️",
    domain: "nike.com",
    pros: [
      "Entire premium library is completely free with no subscription required",
      "High production quality with world-class trainers and athletes",
      "Workouts available for all levels from beginner to advanced",
      "Multi-week structured programs for specific goals like strength or fat loss",
      "No-equipment workouts make it accessible anywhere without a gym",
    ],
    cons: [
      "No live class option, all content is pre-recorded",
      "Limited social and community features compared to Peloton",
      "Nutrition tracking and meal planning are not included",
      "Equipment-based workouts assume basic gear like dumbbells",
    ],
    useCases: [
      "Follow a 4-week bodyweight strength plan that requires no equipment at home",
      "Choose a quick 15-minute mobility routine to do before a morning run",
      "Start the beginner yoga program to build flexibility alongside weight training",
    ],
  },
  {
    slug: "apple-fitness-plus",
    name: "Apple Fitness+",
    tagline: "Studio-style workouts powered by your Apple Watch metrics",
    description: "Apple Fitness+ delivers studio-quality workout videos that integrate real-time metrics from Apple Watch directly on screen. Users see their heart rate, calories burned, and activity rings closing during workouts displayed on iPhone, iPad, or Apple TV. The service covers HIIT, strength, yoga, Pilates, cycling, rowing, dance, and meditation with new workouts added weekly. The Apple Watch integration creates a uniquely personalized and motivating experience.",
    category: "workout-training",
    tags: ["Apple Watch", "studio workouts", "real-time metrics", "HIIT", "strength", "yoga", "Pilates"],
    url: "https://www.apple.com/apple-fitness-plus",
    pricing: "paid",
    featured: true,
    logo: "🍎",
    domain: "apple.com",
    pros: [
      "Real-time Apple Watch metrics displayed on screen during workouts",
      "High production quality with diverse and engaging trainers",
      "Seamless integration across iPhone, iPad, and Apple TV",
      "Activity ring closing and milestone celebrations add motivation",
      "SharePlay allows working out with friends remotely",
    ],
    cons: [
      "Requires Apple Watch, excluding Android and non-Apple users entirely",
      "Monthly subscription at $9.99 or included in Apple One Premier bundle",
      "No live classes, all content is pre-recorded",
      "Workout variety is growing but smaller than Peloton's library",
    ],
    useCases: [
      "Watch your Apple Watch metrics in real-time during a 30-minute cycling workout on Apple TV",
      "Complete the Time to Walk guided walking audio series during daily walks",
      "Use SharePlay to do a HIIT workout simultaneously with a friend across the country",
    ],
  },
  {
    slug: "jefit",
    name: "JEFIT",
    tagline: "Gym workout planner and tracker with exercise database",
    description: "JEFIT is a strength training-focused app with a massive exercise database, customizable workout plans, and detailed progress tracking. The app provides animated exercise demonstrations, rest timers, and body measurement logging specifically designed for gym-goers who want to track sets, reps, and progressive overload systematically.",
    category: "workout-training",
    tags: ["gym tracker", "strength training", "exercise database", "workout planner", "progressive overload", "body measurements"],
    url: "https://www.jefit.com",
    pricing: "freemium",
    featured: false,
    logo: "🏋️",
    domain: "jefit.com",
  },
  {
    slug: "strong",
    name: "Strong",
    tagline: "The simplest way to track gym workouts and see progress",
    description: "Strong is a minimalist workout tracker designed for lifters who want to log sets, reps, and weight without unnecessary complexity. The clean interface makes it fast to record workouts in real time at the gym, and progress charts show strength gains over time. Strong supports custom routines, exercise substitutions, and Apple Watch integration.",
    category: "workout-training",
    tags: ["workout tracker", "strength training", "gym log", "minimalist", "progress charts", "Apple Watch"],
    url: "https://www.strong.app",
    pricing: "freemium",
    featured: false,
    logo: "💪",
    domain: "strong.app",
  },
  {
    slug: "freeletics",
    name: "Freeletics",
    tagline: "AI-powered bodyweight and gym training coach",
    description: "Freeletics uses artificial intelligence to create personalized training plans that adapt to your fitness level, available equipment, and progress. The AI Coach adjusts workout intensity and exercise selection based on user feedback after each session. Programs cover bodyweight training, gym workouts, and running with high-intensity interval formats designed to maximize results in minimal time.",
    category: "workout-training",
    tags: ["AI coach", "bodyweight training", "personalized plans", "HIIT", "adaptive workouts", "gym training"],
    url: "https://www.freeletics.com",
    pricing: "freemium",
    featured: false,
    logo: "🔥",
    domain: "freeletics.com",
  },
  {
    slug: "beachbody",
    name: "BODi (Beachbody)",
    tagline: "Structured home fitness programs from P90X to 21 Day Fix",
    description: "BODi (formerly Beachbody On Demand) offers structured multi-week fitness programs that have helped millions of people get in shape at home. Popular programs include P90X, Insanity, 21 Day Fix, and many more, all available for streaming. Each program provides a complete schedule with daily workouts, nutrition plans, and progress tracking over a defined period.",
    category: "workout-training",
    tags: ["home fitness", "P90X", "structured programs", "nutrition plan", "Insanity", "21 Day Fix", "streaming workouts"],
    url: "https://www.beachbodyondemand.com",
    pricing: "paid",
    featured: false,
    logo: "🏖️",
    domain: "beachbodyondemand.com",
  },
  // ── RUNNING & CARDIO ────────────────────────────────────────────────────
  {
    slug: "strava",
    name: "Strava",
    tagline: "The social network for athletes who run, ride, and swim",
    description: "Strava is the dominant social fitness platform for runners and cyclists, combining GPS activity tracking with a competitive social network. Users record runs, rides, swims, and dozens of other activities while competing on segment leaderboards, joining challenges, and following friends. Strava's social features transform solo workouts into shared experiences, and the premium tier adds training analysis, route planning, and safety features like Beacon live location sharing.",
    category: "running-cardio",
    tags: ["GPS tracking", "running", "cycling", "social fitness", "segments", "leaderboards", "training analysis"],
    url: "https://www.strava.com",
    pricing: "freemium",
    featured: true,
    logo: "🧡",
    domain: "strava.com",
    pros: [
      "Largest social network for runners and cyclists with millions of active users",
      "Segment leaderboards add competitive motivation to everyday routes",
      "Syncs with virtually every GPS watch and fitness device on the market",
      "Route discovery features help find popular running and cycling paths",
      "Beacon live location sharing adds a safety layer for solo activities",
    ],
    cons: [
      "Many analytical features locked behind the $11.99/month subscription",
      "Free tier has become increasingly limited over recent years",
      "Segment competition can encourage unsafe road behavior for KOM hunting",
      "Battery drain during GPS tracking on longer activities",
    ],
    useCases: [
      "Track your weekly running mileage and compete on local segment leaderboards",
      "Use the route builder to plan a scenic 50-mile cycling route on quiet roads",
      "Share your Beacon location with a partner during early morning solo runs",
    ],
  },
  {
    slug: "zwift",
    name: "Zwift",
    tagline: "Indoor cycling and running in a virtual world with real competition",
    description: "Zwift turns indoor cycling and treadmill running into a multiplayer virtual experience with structured workouts, racing, and social group rides. Users connect smart trainers or treadmills and ride or run through virtual worlds alongside thousands of other athletes worldwide. The gamification elements, structured training plans, and competitive racing events make indoor training engaging year-round.",
    category: "running-cardio",
    tags: ["indoor cycling", "virtual racing", "smart trainer", "treadmill running", "structured training", "multiplayer fitness"],
    url: "https://www.zwift.com",
    pricing: "paid",
    featured: false,
    logo: "🌍",
    domain: "zwift.com",
  },
  // ── YOGA & FLEXIBILITY ──────────────────────────────────────────────────
  {
    slug: "down-dog",
    name: "Down Dog",
    tagline: "A new yoga practice every time, generated just for you",
    description: "Down Dog generates a unique yoga sequence every session based on your selected level, duration, focus area, and music preference. Unlike pre-recorded class libraries, the AI-generated approach means no two practices are the same. The app covers Vinyasa, Hatha, Restorative, Yin, and Chair yoga with options for specific focus areas like hip openers, back bends, and balance. The companion apps HIIT, Barre, and 7 Minute Workout extend the platform beyond yoga.",
    category: "yoga-flexibility",
    tags: ["yoga", "AI-generated", "Vinyasa", "Hatha", "Restorative", "personalized yoga", "flexibility"],
    url: "https://www.downdogapp.com",
    pricing: "freemium",
    featured: true,
    logo: "🐕",
    domain: "downdogapp.com",
  },
  {
    slug: "alo-moves",
    name: "Alo Moves",
    tagline: "Premium yoga, fitness, and mindfulness classes from top instructors",
    description: "Alo Moves is a premium streaming platform offering yoga, Pilates, barre, HIIT, and mindfulness classes from world-renowned instructors. The beautifully produced classes are filmed in stunning locations and cover all skill levels from foundation to advanced. Alo Moves' strength is in the quality and depth of its yoga offering, with programs that progressively build toward challenging poses and flows.",
    category: "yoga-flexibility",
    tags: ["premium yoga", "Pilates", "barre", "mindfulness", "streaming fitness", "advanced yoga", "flexibility"],
    url: "https://www.alomoves.com",
    pricing: "paid",
    featured: false,
    logo: "🧘",
    domain: "alomoves.com",
  },
  // ── NUTRITION & DIET ────────────────────────────────────────────────────
  {
    slug: "myfitnesspal",
    name: "MyFitnessPal",
    tagline: "The world's largest food database for calorie and macro tracking",
    description: "MyFitnessPal is the most widely used nutrition tracking app, featuring a database of over 14 million foods with barcode scanning for easy logging. Users set calorie and macro targets, log meals, and track exercise to maintain a comprehensive view of their energy balance. The app integrates with hundreds of fitness devices and apps to offset exercise calories against food intake automatically.",
    category: "nutrition-diet",
    tags: ["calorie tracking", "macro counting", "food database", "barcode scanner", "meal logging", "nutrition", "weight management"],
    url: "https://www.myfitnesspal.com",
    pricing: "freemium",
    featured: false,
    logo: "🍽️",
    domain: "myfitnesspal.com",
  },
  // ── WEARABLE CONNECTED ──────────────────────────────────────────────────
  {
    slug: "fitbit",
    name: "Fitbit",
    tagline: "Health and fitness tracking with the iconic wearable ecosystem",
    description: "Fitbit combines wearable activity trackers with a comprehensive health app that monitors steps, heart rate, sleep, stress, and exercise. The platform includes guided workouts, mindfulness content, and health insights powered by daily data collection. Now part of Google, Fitbit continues to evolve as both a hardware and software health ecosystem.",
    category: "wearable-connected",
    tags: ["wearable fitness", "activity tracker", "heart rate", "sleep tracking", "Google", "health insights", "step counter"],
    url: "https://www.fitbit.com",
    pricing: "freemium",
    featured: false,
    logo: "⌚",
    domain: "fitbit.com",
  },
  {
    slug: "whoop",
    name: "WHOOP",
    tagline: "Performance optimization through strain, recovery, and sleep tracking",
    description: "WHOOP is a subscription-based wearable and platform focused on recovery optimization and training readiness. Unlike step-focused trackers, WHOOP monitors heart rate variability, respiratory rate, resting heart rate, and sleep quality to generate a daily recovery score. Athletes use this score to decide workout intensity, making WHOOP a performance optimization tool rather than a simple activity tracker.",
    category: "wearable-connected",
    tags: ["recovery tracking", "HRV", "strain monitoring", "sleep optimization", "performance", "athlete wearable", "training readiness"],
    url: "https://www.whoop.com",
    pricing: "paid",
    featured: false,
    logo: "🔲",
    domain: "whoop.com",
  },
];
