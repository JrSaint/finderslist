export type BudgetingAppCategory =
  | "envelope-budgeting"
  | "automated-tracking"
  | "couples-family"
  | "debt-payoff"
  | "investment-tracking";

export interface BudgetingAppTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: BudgetingAppCategory;
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

export const BUDGETING_APP_CATEGORIES: Record<BudgetingAppCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "envelope-budgeting": { label: "Envelope Budgeting", emoji: "✉️", description: "Allocate every dollar to a specific category using the proven envelope method.", gradient: "from-green-600/30 to-emerald-800/40" },
  "automated-tracking": { label: "Automated Tracking", emoji: "🤖", description: "Automatically sync bank accounts and categorize spending in real time.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "couples-family": { label: "Couples & Family", emoji: "👫", description: "Shared budgeting tools designed for partners and households managing money together.", gradient: "from-pink-600/30 to-rose-800/40" },
  "debt-payoff": { label: "Debt Payoff", emoji: "💪", description: "Specialized tools to accelerate debt repayment with snowball and avalanche strategies.", gradient: "from-red-600/30 to-orange-800/40" },
  "investment-tracking": { label: "Investment Tracking", emoji: "📈", description: "Monitor your portfolio, net worth, and retirement accounts alongside your budget.", gradient: "from-violet-600/30 to-purple-800/40" },
};

export const BUDGETING_APP_TOOLS: BudgetingAppTool[] = [
  // ── ENVELOPE BUDGETING ──────────────────────────────────────────────────
  {
    slug: "ynab",
    name: "YNAB",
    tagline: "Give every dollar a job and break the paycheck-to-paycheck cycle",
    description: "YNAB (You Need A Budget) is the gold standard in zero-based budgeting, built around four simple rules that help users proactively assign every dollar before spending it. The platform syncs with banks for automatic transaction imports while encouraging hands-on engagement with your money. YNAB's age-of-money metric and goal-tracking features help users build a buffer and save for future expenses systematically.",
    category: "envelope-budgeting",
    tags: ["zero-based budgeting", "envelope method", "savings goals", "bank sync", "financial planning", "debt reduction"],
    url: "https://www.ynab.com",
    pricing: "paid",
    featured: true,
    logo: "💰",
    domain: "ynab.com",
    pros: [
      "Proven four-rule methodology changes spending behavior long-term",
      "Real-time bank sync with manual entry option for accuracy",
      "Age-of-money metric shows how far ahead you are financially",
      "Excellent goal-tracking for vacations, emergencies, and large purchases",
      "Active community with free workshops and educational content",
    ],
    cons: [
      "Annual subscription of $99/year may deter budget-conscious beginners",
      "Learning curve is steeper than most automated tracking apps",
      "No investment tracking or net worth beyond linked accounts",
      "Mobile app can feel clunky for complex budget adjustments",
    ],
    useCases: [
      "Set up category goals to save $5,000 for an emergency fund over six months",
      "Use the age-of-money metric to stop living paycheck-to-paycheck within 90 days",
      "Roll with the punches by reallocating overspent dining-out dollars from clothing",
    ],
  },
  {
    slug: "goodbudget",
    name: "Goodbudget",
    tagline: "The envelope budgeting app that replaces paper envelopes",
    description: "Goodbudget brings the classic cash-envelope system into the digital age, letting couples and families share a budget across devices without bank syncing. Users manually enter transactions and allocate income into virtual envelopes, building mindful spending habits. The approach works well for people who prefer intentional tracking over automated imports.",
    category: "envelope-budgeting",
    tags: ["envelope budgeting", "manual tracking", "shared budgets", "family finance", "simple budgeting", "cash envelopes"],
    url: "https://goodbudget.com",
    pricing: "freemium",
    featured: true,
    logo: "✉️",
    domain: "goodbudget.com",
    pros: [
      "Free tier with 10 envelopes is genuinely usable for simple budgets",
      "Shared budgets sync instantly between partners on different devices",
      "Manual entry encourages mindful spending awareness",
      "No bank credentials required, reducing security concerns",
      "Simple envelope visualization makes budgeting intuitive",
    ],
    cons: [
      "No automatic bank syncing means every transaction must be entered manually",
      "Limited reporting compared to automated tracking competitors",
      "Free plan caps envelopes and transaction history",
    ],
    useCases: [
      "Share a household budget between partners so both see grocery and utility spending live",
      "Use the debt payoff envelope to track extra payments toward student loans",
      "Teach teenagers budgeting basics with a simple free-tier setup",
    ],
  },
  {
    slug: "mvelopes",
    name: "Mvelopes",
    tagline: "Digital envelope budgeting with automatic bank connections",
    description: "Mvelopes combines the discipline of envelope budgeting with automatic bank transaction imports, bridging the gap between manual and automated approaches. Users allocate income into spending categories and the app tracks how much remains in each virtual envelope as transactions flow in.",
    category: "envelope-budgeting",
    tags: ["envelope budgeting", "bank sync", "spending tracker", "budget categories", "financial planning"],
    url: "https://www.mvelopes.com",
    pricing: "paid",
    featured: false,
    logo: "📨",
    domain: "mvelopes.com",
  },
  // ── AUTOMATED TRACKING ──────────────────────────────────────────────────
  {
    slug: "mint",
    name: "Mint",
    tagline: "Free budgeting and expense tracking trusted by millions",
    description: "Mint was one of the first free personal finance aggregators, pulling together bank accounts, credit cards, loans, and investments into a single dashboard. It automatically categorizes transactions, tracks bills, and provides a credit score. While Intuit announced Mint's transition to Credit Karma in 2024, its legacy approach of automatic categorization influenced nearly every budgeting app that followed.",
    category: "automated-tracking",
    tags: ["free budgeting", "expense tracking", "bill tracking", "credit score", "automatic categorization", "financial overview"],
    url: "https://mint.intuit.com",
    pricing: "free",
    featured: true,
    logo: "🍃",
    domain: "mint.intuit.com",
    pros: [
      "Completely free with no premium tier required for core features",
      "Automatic transaction categorization across all linked accounts",
      "Built-in credit score monitoring and bill reminders",
      "Clean dashboard shows full financial picture at a glance",
    ],
    cons: [
      "Transitioning to Credit Karma, future feature set uncertain",
      "Ad-supported model means frequent credit card and loan offers",
      "Categorization accuracy requires regular manual corrections",
      "Limited budgeting methodology compared to zero-based alternatives",
    ],
    useCases: [
      "Link all bank and credit accounts to see total spending breakdown by category each month",
      "Set bill reminders to avoid late payment fees on utilities and subscriptions",
      "Monitor your credit score monthly without signing up for a separate service",
    ],
  },
  {
    slug: "monarch-money",
    name: "Monarch Money",
    tagline: "The modern all-in-one personal finance platform",
    description: "Monarch Money is a premium personal finance app that unifies budgeting, investment tracking, net worth monitoring, and collaborative household finance in a polished interface. It supports account aggregation from thousands of financial institutions and offers detailed cash flow analysis, recurring transaction detection, and customizable budget categories. Monarch has positioned itself as the go-to Mint replacement for users willing to pay for a cleaner, ad-free experience.",
    category: "automated-tracking",
    tags: ["personal finance", "net worth tracking", "investment tracking", "cash flow", "household budgeting", "financial planning"],
    url: "https://www.monarchmoney.com",
    pricing: "paid",
    featured: true,
    logo: "👑",
    domain: "monarchmoney.com",
    pros: [
      "Beautiful, modern interface with no ads or upsell clutter",
      "Combines budgeting, investments, and net worth in one platform",
      "Collaborative features let partners manage finances together",
      "Reliable account syncing with fast transaction updates",
      "Flexible budgeting that adapts to rollover and custom categories",
    ],
    cons: [
      "$14.99/month or $99.99/year subscription with no free tier",
      "Newer platform with a smaller community than established alternatives",
      "Limited integrations outside of financial account syncing",
    ],
    useCases: [
      "Track household net worth across bank accounts, 401(k)s, and real estate in one dashboard",
      "Set up a joint budget with your partner where both can categorize and review transactions",
      "Analyze recurring subscriptions to identify services you can cancel and save $200/month",
    ],
  },
  {
    slug: "pocketguard",
    name: "PocketGuard",
    tagline: "See how much you have left to spend after bills and goals",
    description: "PocketGuard simplifies budgeting by showing one number: how much you can safely spend right now. It automatically accounts for upcoming bills, savings goals, and necessities, then presents your disposable income front and center. The app connects to bank accounts and categorizes transactions without requiring users to set up detailed budgets.",
    category: "automated-tracking",
    tags: ["spending tracker", "bill tracking", "disposable income", "simple budgeting", "automatic categorization", "savings goals"],
    url: "https://pocketguard.com",
    pricing: "freemium",
    featured: false,
    logo: "🛡️",
    domain: "pocketguard.com",
  },
  {
    slug: "copilot",
    name: "Copilot",
    tagline: "Smart money tracker designed for iPhone and Mac users",
    description: "Copilot is an Apple-native personal finance app with a premium design sensibility and fast account syncing. It provides clean spending breakdowns, recurring transaction detection, and investment tracking in an interface that feels like it belongs on iOS. Copilot's strength is making financial data accessible and visually appealing without overwhelming users with budgeting methodology.",
    category: "automated-tracking",
    tags: ["iOS finance", "spending tracker", "investment tracking", "Apple native", "transaction categorization", "net worth"],
    url: "https://copilot.money",
    pricing: "paid",
    featured: false,
    logo: "🚁",
    domain: "copilot.money",
  },
  {
    slug: "simplifi",
    name: "Simplifi by Quicken",
    tagline: "Effortless budgeting and spending plan from Quicken",
    description: "Simplifi by Quicken offers a streamlined spending plan that focuses on what you can spend after accounting for bills, subscriptions, and savings goals. Built by the team behind Quicken's decades of personal finance software, it provides watchlists for specific spending categories and a clean monthly cash flow view without the complexity of traditional budgeting apps.",
    category: "automated-tracking",
    tags: ["spending plan", "bill tracking", "Quicken", "cash flow", "subscription tracking", "financial overview"],
    url: "https://www.quicken.com/simplifi",
    pricing: "paid",
    featured: false,
    logo: "🔵",
    domain: "quicken.com",
  },
  {
    slug: "wally",
    name: "Wally",
    tagline: "Your complete financial picture in one intelligent app",
    description: "Wally provides a comprehensive financial overview with support for multiple currencies, joint accounts, and international banks. It combines manual and automatic tracking with smart insights about spending patterns and savings opportunities. The app is particularly popular among users who manage finances across multiple countries.",
    category: "automated-tracking",
    tags: ["multi-currency", "international finance", "spending insights", "joint accounts", "financial overview", "global banking"],
    url: "https://wally.me",
    pricing: "freemium",
    featured: false,
    logo: "🐋",
    domain: "wally.me",
  },
  // ── COUPLES & FAMILY ────────────────────────────────────────────────────
  {
    slug: "honeydue",
    name: "Honeydue",
    tagline: "The budgeting app built for couples managing money together",
    description: "Honeydue is purpose-built for couples who want to manage shared finances while maintaining individual account privacy. Partners can choose which accounts and balances to share, split bills, set spending limits by category, and chat about finances within the app. It connects to bank accounts and provides a combined view of household spending.",
    category: "couples-family",
    tags: ["couples budgeting", "shared finances", "bill splitting", "relationship finance", "joint budgeting", "partner money"],
    url: "https://www.honeydue.com",
    pricing: "free",
    featured: false,
    logo: "🍯",
    domain: "honeydue.com",
  },
  // ── DEBT PAYOFF ─────────────────────────────────────────────────────────
  {
    slug: "everydollar",
    name: "EveryDollar",
    tagline: "Dave Ramsey's zero-based budgeting app for debt freedom",
    description: "EveryDollar is the official budgeting app from Ramsey Solutions, built around Dave Ramsey's Baby Steps methodology. It uses zero-based budgeting where every dollar of income is assigned a purpose. The free tier supports manual transaction entry while the premium tier adds bank syncing. It is particularly popular among users following the debt snowball method to eliminate debt systematically.",
    category: "debt-payoff",
    tags: ["zero-based budgeting", "debt snowball", "Dave Ramsey", "Baby Steps", "debt freedom", "financial peace"],
    url: "https://www.ramseysolutions.com/ramseyplus/everydollar",
    pricing: "freemium",
    featured: true,
    logo: "💵",
    domain: "ramseysolutions.com",
  },
  {
    slug: "tiller-money",
    name: "Tiller Money",
    tagline: "Automate your finances in Google Sheets or Excel",
    description: "Tiller Money feeds daily bank transactions directly into Google Sheets or Microsoft Excel spreadsheets, giving users complete control over their budgeting templates and financial data. Spreadsheet enthusiasts can customize every formula, chart, and category while Tiller handles the data import. Pre-built templates cover budgets, debt payoff tracking, and net worth monitoring.",
    category: "debt-payoff",
    tags: ["spreadsheet budgeting", "Google Sheets", "Excel", "custom finance", "transaction import", "financial templates"],
    url: "https://www.tillerhq.com",
    pricing: "paid",
    featured: false,
    logo: "📗",
    domain: "tillerhq.com",
  },
  {
    slug: "countabout",
    name: "CountAbout",
    tagline: "Simple personal finance with Quicken and Mint import",
    description: "CountAbout is a straightforward personal finance manager that supports automatic transaction downloads and manual entry. It stands out for its ability to import data directly from Quicken and Mint, making migration painless for users switching platforms. The interface is no-frills but covers budgeting, bill tracking, and basic reporting needs.",
    category: "debt-payoff",
    tags: ["personal finance", "Quicken import", "Mint import", "bill tracking", "simple budgeting", "transaction management"],
    url: "https://www.countabout.com",
    pricing: "paid",
    featured: false,
    logo: "🔢",
    domain: "countabout.com",
  },
  // ── INVESTMENT TRACKING ─────────────────────────────────────────────────
  {
    slug: "personal-capital",
    name: "Empower Personal Dashboard",
    tagline: "Free investment and retirement tracking with wealth management",
    description: "Empower (formerly Personal Capital) offers a free financial dashboard that excels at investment analysis, retirement planning, and net worth tracking. Its fee analyzer reveals hidden fund expenses, and the retirement planner runs Monte Carlo simulations to stress-test your savings. The free tools serve as a funnel to Empower's paid wealth management services, but the dashboard alone is incredibly valuable for investors.",
    category: "investment-tracking",
    tags: ["investment tracking", "retirement planning", "net worth", "fee analyzer", "portfolio analysis", "wealth management"],
    url: "https://www.empower.com/personal-investors",
    pricing: "freemium",
    featured: false,
    logo: "📊",
    domain: "empower.com",
  },
  {
    slug: "quicken-classic",
    name: "Quicken Classic",
    tagline: "The legacy personal finance suite for power users",
    description: "Quicken Classic is the long-running desktop personal finance application that covers budgeting, bill pay, investment tracking, rental property management, and tax preparation. It offers the deepest feature set of any consumer finance tool, though its desktop-first approach and subscription pricing model have pushed some users toward newer alternatives.",
    category: "investment-tracking",
    tags: ["personal finance", "investment tracking", "bill pay", "rental property", "tax preparation", "desktop finance"],
    url: "https://www.quicken.com",
    pricing: "paid",
    featured: false,
    logo: "🏛️",
    domain: "quicken.com",
  },
];
