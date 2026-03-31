import Link from "next/link";
import type { Metadata } from "next";
import { getAllTools, getAllCategories } from "@/lib/tools";
import { getAllMarketingTools } from "@/lib/marketing-tools";
import { getAllFinanceTools } from "@/lib/finance-tools";
import { getAllEcommerceTools } from "@/lib/ecommerce-tools";
import { getAllProductivityTools } from "@/lib/productivity-tools";
import { getAllHRTools } from "@/lib/hr-tools";
import { getAllCRMTools } from "@/lib/crm-tools";
import { getAllSecurityTools } from "@/lib/security-tools";
import { getAllWebsiteBuilderTools } from "@/lib/website-builders";
import { getAllCreatorTools } from "@/lib/creator-tools";
import { getAllDeveloperTools } from "@/lib/developer-tools";
import { getAllDesignTools } from "@/lib/design-tools";
import { getAllSupportTools } from "@/lib/support-tools";
import { getAllElearningTools } from "@/lib/elearning-tools";
import { getAllAnalyticsTools } from "@/lib/analytics-tools";
import { getAllLegalTools } from "@/lib/legal-tools";
import { getAllHostingTools } from "@/lib/hosting-tools";
import { getAllSocialMediaTools } from "@/lib/social-media-tools";
import { getAllEmailTools } from "@/lib/email-tools";
import { getAllNoCodeTools } from "@/lib/no-code-tools";
// New categories
import { getAllAppointmentSchedulingTools } from "@/lib/appointment-scheduling-software";
import { getAllAutoInsuranceTools } from "@/lib/auto-insurance";
import { getAllBudgetingAppTools } from "@/lib/budgeting-apps";
import { getAllBusinessInsuranceTools } from "@/lib/business-insurance";
import { getAllBusinessPhoneTools } from "@/lib/business-phone-systems";
import { getAllContractManagementTools } from "@/lib/contract-management-software";
import { getAllCreditCardTools } from "@/lib/credit-cards";
import { getAllCryptoExchangeTools } from "@/lib/cryptocurrency-exchanges";
import { getAllDocumentManagementTools } from "@/lib/document-management-software";
import { getAllEstatePlanningTools } from "@/lib/estate-planning-services";
import { getAllFieldServiceTools } from "@/lib/field-service-management";
import { getAllFitnessAppTools } from "@/lib/fitness-apps";
import { getAllFleetManagementTools } from "@/lib/fleet-management-software";
import { getAllHealthInsuranceTools } from "@/lib/health-insurance";
import { getAllHomeInsuranceTools } from "@/lib/home-insurance";
import { getAllHomeSecurityTools } from "@/lib/home-security-systems";
import { getAllHomeWarrantyTools } from "@/lib/home-warranty-companies";
import { getAllHotelBookingTools } from "@/lib/hotel-booking-platforms";
import { getAllInventoryManagementTools } from "@/lib/inventory-management-software";
import { getAllInvestmentPlatformTools } from "@/lib/investment-platforms";
import { getAllLifeInsuranceTools } from "@/lib/life-insurance";
import { getAllMentalHealthTools } from "@/lib/mental-health-apps";
import { getAllMovingCompanyTools } from "@/lib/moving-companies";
import { getAllOnlineDegreeTools } from "@/lib/online-degree-programs";
import { getAllOnlineTutoringTools } from "@/lib/online-tutoring-platforms";
import { getAllPersonalLoanTools } from "@/lib/personal-loans";
import { getAllPestControlTools } from "@/lib/pest-control-services";
import { getAllPOSSystemTools } from "@/lib/pos-systems";
import { getAllRoboAdvisorTools } from "@/lib/robo-advisors";
import { getAllSolarPanelTools } from "@/lib/solar-panel-companies";
import { getAllStudentLoanTools } from "@/lib/student-loans";
import { getAllSupplyChainTools } from "@/lib/supply-chain-software";
import { getAllTaxPrepTools } from "@/lib/tax-preparation-software";
import { getAllTelehealthTools } from "@/lib/telehealth-platforms";
import { getAllTestPrepTools } from "@/lib/test-prep-services";
import { getAllTravelInsuranceTools } from "@/lib/travel-insurance";
import { getAllVacationRentalTools } from "@/lib/vacation-rental-platforms";
import { getAllWarehouseManagementTools } from "@/lib/warehouse-management-software";
// High-CPC niche directories
import { getAllMortgageLenderTools } from "@/lib/mortgage-lenders";
import { getAllLLCFormationTools } from "@/lib/llc-formation-services";
import { getAllBackgroundCheckTools } from "@/lib/background-check-services";
import { getAllPaymentProcessingTools } from "@/lib/payment-processing";
import { getAllGoldIRATools } from "@/lib/gold-ira-companies";
import { getAllDebtReliefTools } from "@/lib/debt-relief-services";
import { getAllMedicalBillingTools } from "@/lib/medical-billing-software";
import { getAllERPTools } from "@/lib/erp-software";
import { getAllWorkersCompTools } from "@/lib/workers-comp-insurance";
import { getAllStructuredSettlementTools } from "@/lib/structured-settlement-companies";
import { getAllBusinessLoanTools } from "@/lib/business-loans";
import { getAllCreditRepairTools } from "@/lib/credit-repair-services";
import { getAllTaxReliefTools } from "@/lib/tax-relief-services";
import { getAllVirtualDataRoomTools } from "@/lib/virtual-data-rooms";
import { getAllIdentityTheftProtectionTools } from "@/lib/identity-theft-protection";
import { getAllPersonalInjuryTools } from "@/lib/personal-injury-lawyers";
import { getAllMesotheliomaLawyerTools } from "@/lib/mesothelioma-lawyers";
import { getAllBankruptcyLawyerTools } from "@/lib/bankruptcy-lawyers";
import { getAllDUILawyerTools } from "@/lib/dui-lawyers";
// Previously created directories missing from homepage
import { getAllAccountingTools } from "@/lib/accounting-software";
import { getAllAddictionTreatmentCenterTools } from "@/lib/addiction-treatment-centers";
import { getAllAIAgentsTools } from "@/lib/ai-agent-platforms";
import { getAllAICodingTools } from "@/lib/ai-coding-assistants";
import { getAllAIVideoTools } from "@/lib/ai-video-generators";
import { getAllATSTools } from "@/lib/applicant-tracking-systems";
import { getAllPasswordManagerTools } from "@/lib/business-password-managers";
import { getAllBusinessTaxTools } from "@/lib/business-tax-software";
import { getAllBusinessVPNTools } from "@/lib/business-vpn-software";
import { getAllEcommerceInventoryTools } from "@/lib/ecommerce-inventory-software";
import { getAllEcommercePlatformTools } from "@/lib/ecommerce-platforms";
import { getAllEndpointSecurityTools } from "@/lib/endpoint-security-software";
import { getAllExpenseManagementTools } from "@/lib/expense-management-software";
import { getAllHRISTools } from "@/lib/hris-software";
import { getAllInvoicingTools } from "@/lib/invoicing-billing-software";
import { getAllMortgageLendingTools } from "@/lib/mortgage-lending-software";
import { getAllPayrollTools } from "@/lib/payroll-software";
import { getAllProjectManagementTools } from "@/lib/project-management-software";
import { getAllRealEstateTools } from "@/lib/real-estate-software";
import { getAllSubscriptionBillingTools } from "@/lib/subscription-billing-platforms";
import { getAllTimeTrackingTools } from "@/lib/time-tracking-software";

export const metadata: Metadata = {
  title: "FindersList — Curated Software Directories",
  description: "FindersList hosts 70+ curated directories for AI tools, marketing, finance, insurance, health, education, real estate, and more. Find exactly what you're looking for.",
  alternates: { canonical: "https://finderslist.com" },
};

const directories = [
  {
    slug: "ai-tools",
    emoji: "🤖",
    name: "AI Tools",
    description: "Discover the best AI tools for writing, coding, image generation, productivity, and more.",
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    border: "border-violet-500/30 hover:border-violet-400/50",
    accentColor: "text-violet-400",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    countKey: "ai" as const,
  },
  {
    slug: "marketing-tools",
    emoji: "📈",
    name: "Marketing Tools",
    description: "The best SEO, email marketing, social media, CRM, and advertising tools in one place.",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-400/50",
    accentColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    countKey: "marketing" as const,
  },
  {
    slug: "finance-tools",
    emoji: "💰",
    name: "Finance & Accounting",
    description: "Compare accounting software, invoicing tools, payroll systems, expense trackers, and business banking.",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    border: "border-amber-500/30 hover:border-amber-400/50",
    accentColor: "text-amber-400",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    countKey: "finance" as const,
  },
  {
    slug: "ecommerce-tools",
    emoji: "🛍️",
    name: "E-commerce Tools",
    description: "Build your online store, streamline shipping, source products, and scale with the best e-commerce software.",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/50",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    countKey: "ecommerce" as const,
  },
  {
    slug: "productivity-tools",
    emoji: "⚡",
    name: "Productivity Tools",
    description: "Project management, note-taking, time tracking, automation, and AI productivity tools for teams.",
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
    border: "border-teal-500/30 hover:border-teal-400/50",
    accentColor: "text-teal-400",
    badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/25",
    countKey: "productivity" as const,
  },
  {
    slug: "hr-tools",
    emoji: "👥",
    name: "HR & Recruiting",
    description: "ATS software, HRIS platforms, payroll tools, performance management, and onboarding solutions.",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    border: "border-rose-500/30 hover:border-rose-400/50",
    accentColor: "text-rose-400",
    badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/25",
    countKey: "hr" as const,
  },
  {
    slug: "crm-tools",
    emoji: "🤝",
    name: "CRM & Sales",
    description: "CRM platforms, sales engagement tools, prospecting software, and conversation intelligence for revenue teams.",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    border: "border-sky-500/30 hover:border-sky-400/50",
    accentColor: "text-sky-400",
    badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    countKey: "crm" as const,
  },
  {
    slug: "security-tools",
    emoji: "🔒",
    name: "Security Tools",
    description: "Password managers, VPNs, endpoint protection, identity management, and compliance automation tools.",
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    border: "border-red-500/30 hover:border-red-400/50",
    accentColor: "text-red-400",
    badgeColor: "bg-red-500/15 text-red-300 border-red-500/25",
    countKey: "security" as const,
  },
  {
    slug: "website-builders",
    emoji: "🌐",
    name: "Website Builders",
    description: "No-code website builders, eCommerce platforms, CMS solutions, and landing page tools.",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    border: "border-cyan-500/30 hover:border-cyan-400/50",
    accentColor: "text-cyan-400",
    badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
    countKey: "websiteBuilders" as const,
  },
  {
    slug: "creator-tools",
    emoji: "🎬",
    name: "Creator Tools",
    description: "Video editing, podcast hosting, screen recording, live streaming, and creator monetization platforms.",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    border: "border-orange-500/30 hover:border-orange-400/50",
    accentColor: "text-orange-400",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/25",
    countKey: "creator" as const,
  },
  {
    slug: "developer-tools",
    emoji: "💻",
    name: "Developer Tools",
    description: "Version control, CI/CD, monitoring, error tracking, API testing, and issue tracking for engineering teams.",
    gradient: "from-indigo-500/20 via-violet-500/10 to-transparent",
    border: "border-indigo-500/30 hover:border-indigo-400/50",
    accentColor: "text-indigo-400",
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
    countKey: "developer" as const,
  },
  {
    slug: "design-tools",
    emoji: "🎨",
    name: "Design Tools",
    description: "UI design, graphic design, prototyping, motion design, and brand asset management tools.",
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
    border: "border-fuchsia-500/30 hover:border-fuchsia-400/50",
    accentColor: "text-fuchsia-400",
    badgeColor: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25",
    countKey: "design" as const,
  },
  {
    slug: "support-tools",
    emoji: "🎧",
    name: "Customer Support",
    description: "Help desk platforms, live chat tools, knowledge bases, customer success software, and feedback tools.",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    border: "border-green-500/30 hover:border-green-400/50",
    accentColor: "text-green-400",
    badgeColor: "bg-green-500/15 text-green-300 border-green-500/25",
    countKey: "support" as const,
  },
  {
    slug: "elearning-tools",
    emoji: "🎓",
    name: "eLearning Tools",
    description: "LMS platforms, course authoring software, virtual classrooms, and employee training solutions.",
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    border: "border-yellow-500/30 hover:border-yellow-400/50",
    accentColor: "text-yellow-400",
    badgeColor: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25",
    countKey: "elearning" as const,
  },
  {
    slug: "analytics-tools",
    emoji: "📊",
    name: "Analytics Tools",
    description: "Web analytics, product analytics, business intelligence, SEO analytics, and data pipeline tools.",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    border: "border-purple-500/30 hover:border-purple-400/50",
    accentColor: "text-purple-400",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/25",
    countKey: "analytics" as const,
  },
  {
    slug: "legal-tools",
    emoji: "⚖️",
    name: "Legal Tools",
    description: "Contract management, e-signature platforms, legal research tools, compliance automation, and IP management.",
    gradient: "from-slate-500/20 via-gray-500/10 to-transparent",
    border: "border-slate-500/30 hover:border-slate-400/50",
    accentColor: "text-slate-400",
    badgeColor: "bg-slate-500/15 text-slate-300 border-slate-500/25",
    countKey: "legal" as const,
  },
  {
    slug: "hosting-tools",
    emoji: "☁️",
    name: "Hosting & Cloud",
    description: "Cloud providers, managed WordPress hosting, VPS hosting, shared hosting, and serverless platforms.",
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    border: "border-sky-500/30 hover:border-sky-400/50",
    accentColor: "text-sky-400",
    badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    countKey: "hosting" as const,
  },
  {
    slug: "social-media-tools",
    emoji: "📱",
    name: "Social Media Tools",
    description: "Social media scheduling, analytics, monitoring, community management, and influencer marketing platforms.",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    border: "border-pink-500/30 hover:border-pink-400/50",
    accentColor: "text-pink-400",
    badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/25",
    countKey: "socialMedia" as const,
  },
  {
    slug: "email-tools",
    emoji: "✉️",
    name: "Email Marketing",
    description: "Email marketing platforms, transactional email APIs, cold email tools, deliverability, and newsletter platforms.",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/50",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    countKey: "email" as const,
  },
  {
    slug: "no-code-tools",
    emoji: "🔧",
    name: "No-Code Tools",
    description: "Automation platforms, no-code app builders, databases, AI workflow tools, and form builders.",
    gradient: "from-lime-500/20 via-green-500/10 to-transparent",
    border: "border-lime-500/30 hover:border-lime-400/50",
    accentColor: "text-lime-400",
    badgeColor: "bg-lime-500/15 text-lime-300 border-lime-500/25",
    countKey: "noCode" as const,
  },
  // — New directories —
  {
    slug: "auto-insurance",
    emoji: "🚗",
    name: "Auto Insurance",
    description: "Compare top car insurance providers, coverage options, discounts, and get the best rates.",
    gradient: "from-blue-500/20 via-sky-500/10 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/50",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    countKey: "autoInsurance" as const,
  },
  {
    slug: "health-insurance",
    emoji: "🏥",
    name: "Health Insurance",
    description: "Find the best health insurance plans, compare premiums, coverage, and provider networks.",
    gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
    border: "border-teal-500/30 hover:border-teal-400/50",
    accentColor: "text-teal-400",
    badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/25",
    countKey: "healthInsurance" as const,
  },
  {
    slug: "life-insurance",
    emoji: "🛡️",
    name: "Life Insurance",
    description: "Compare term life, whole life, and universal life insurance policies from top providers.",
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    border: "border-indigo-500/30 hover:border-indigo-400/50",
    accentColor: "text-indigo-400",
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
    countKey: "lifeInsurance" as const,
  },
  {
    slug: "home-insurance",
    emoji: "🏠",
    name: "Home Insurance",
    description: "Protect your home with the best homeowners insurance providers and coverage options.",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    border: "border-amber-500/30 hover:border-amber-400/50",
    accentColor: "text-amber-400",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    countKey: "homeInsurance" as const,
  },
  {
    slug: "business-insurance",
    emoji: "🏢",
    name: "Business Insurance",
    description: "Commercial insurance, liability coverage, workers comp, and business protection plans.",
    gradient: "from-slate-500/20 via-gray-500/10 to-transparent",
    border: "border-slate-500/30 hover:border-slate-400/50",
    accentColor: "text-slate-400",
    badgeColor: "bg-slate-500/15 text-slate-300 border-slate-500/25",
    countKey: "businessInsurance" as const,
  },
  {
    slug: "travel-insurance",
    emoji: "✈️",
    name: "Travel Insurance",
    description: "Trip cancellation, medical evacuation, and comprehensive travel protection plans.",
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    border: "border-cyan-500/30 hover:border-cyan-400/50",
    accentColor: "text-cyan-400",
    badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
    countKey: "travelInsurance" as const,
  },
  {
    slug: "credit-cards",
    emoji: "💳",
    name: "Credit Cards",
    description: "Compare rewards, cashback, travel, and business credit cards from top issuers.",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    border: "border-violet-500/30 hover:border-violet-400/50",
    accentColor: "text-violet-400",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    countKey: "creditCards" as const,
  },
  {
    slug: "personal-loans",
    emoji: "💵",
    name: "Personal Loans",
    description: "Compare personal loan rates, terms, and lenders for debt consolidation, home improvement, and more.",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    border: "border-green-500/30 hover:border-green-400/50",
    accentColor: "text-green-400",
    badgeColor: "bg-green-500/15 text-green-300 border-green-500/25",
    countKey: "personalLoans" as const,
  },
  {
    slug: "student-loans",
    emoji: "🎒",
    name: "Student Loans",
    description: "Student loan refinancing, repayment plans, and the best lenders for education financing.",
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    border: "border-yellow-500/30 hover:border-yellow-400/50",
    accentColor: "text-yellow-400",
    badgeColor: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25",
    countKey: "studentLoans" as const,
  },
  {
    slug: "investment-platforms",
    emoji: "📈",
    name: "Investment Platforms",
    description: "Stock trading, ETFs, robo-advisors, and investment platforms for every experience level.",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-400/50",
    accentColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    countKey: "investmentPlatforms" as const,
  },
  {
    slug: "cryptocurrency-exchanges",
    emoji: "₿",
    name: "Crypto Exchanges",
    description: "Buy, sell, and trade cryptocurrency on the most trusted and secure exchanges.",
    gradient: "from-orange-500/20 via-yellow-500/10 to-transparent",
    border: "border-orange-500/30 hover:border-orange-400/50",
    accentColor: "text-orange-400",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/25",
    countKey: "cryptoExchanges" as const,
  },
  {
    slug: "robo-advisors",
    emoji: "🤖",
    name: "Robo-Advisors",
    description: "Automated investment management platforms that build and manage portfolios for you.",
    gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
    border: "border-purple-500/30 hover:border-purple-400/50",
    accentColor: "text-purple-400",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/25",
    countKey: "roboAdvisors" as const,
  },
  {
    slug: "budgeting-apps",
    emoji: "💰",
    name: "Budgeting Apps",
    description: "Track spending, manage budgets, and reach your financial goals with the best budgeting apps.",
    gradient: "from-lime-500/20 via-green-500/10 to-transparent",
    border: "border-lime-500/30 hover:border-lime-400/50",
    accentColor: "text-lime-400",
    badgeColor: "bg-lime-500/15 text-lime-300 border-lime-500/25",
    countKey: "budgetingApps" as const,
  },
  {
    slug: "tax-preparation-software",
    emoji: "🧾",
    name: "Tax Preparation",
    description: "File taxes online with the best tax prep software for individuals and businesses.",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/50",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    countKey: "taxPrep" as const,
  },
  {
    slug: "estate-planning-services",
    emoji: "📜",
    name: "Estate Planning",
    description: "Online wills, trusts, and estate planning services to protect your family and assets.",
    gradient: "from-stone-500/20 via-amber-500/10 to-transparent",
    border: "border-stone-500/30 hover:border-stone-400/50",
    accentColor: "text-stone-400",
    badgeColor: "bg-stone-500/15 text-stone-300 border-stone-500/25",
    countKey: "estatePlanning" as const,
  },
  {
    slug: "telehealth-platforms",
    emoji: "👨‍⚕️",
    name: "Telehealth",
    description: "Virtual doctor visits, online therapy, and telemedicine platforms for remote healthcare.",
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
    border: "border-teal-500/30 hover:border-teal-400/50",
    accentColor: "text-teal-400",
    badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/25",
    countKey: "telehealth" as const,
  },
  {
    slug: "mental-health-apps",
    emoji: "🧠",
    name: "Mental Health Apps",
    description: "Therapy apps, meditation tools, and mental wellness platforms for better mental health.",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    border: "border-violet-500/30 hover:border-violet-400/50",
    accentColor: "text-violet-400",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    countKey: "mentalHealth" as const,
  },
  {
    slug: "fitness-apps",
    emoji: "💪",
    name: "Fitness Apps",
    description: "Workout trackers, nutrition planners, and fitness coaching apps to stay in shape.",
    gradient: "from-red-500/20 via-rose-500/10 to-transparent",
    border: "border-red-500/30 hover:border-red-400/50",
    accentColor: "text-red-400",
    badgeColor: "bg-red-500/15 text-red-300 border-red-500/25",
    countKey: "fitnessApps" as const,
  },
  {
    slug: "online-degree-programs",
    emoji: "🎓",
    name: "Online Degrees",
    description: "Accredited online degree programs from top universities for career advancement.",
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    border: "border-indigo-500/30 hover:border-indigo-400/50",
    accentColor: "text-indigo-400",
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
    countKey: "onlineDegrees" as const,
  },
  {
    slug: "online-tutoring-platforms",
    emoji: "📚",
    name: "Online Tutoring",
    description: "One-on-one tutoring, homework help, and test prep from expert online tutors.",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    border: "border-sky-500/30 hover:border-sky-400/50",
    accentColor: "text-sky-400",
    badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    countKey: "onlineTutoring" as const,
  },
  {
    slug: "test-prep-services",
    emoji: "✏️",
    name: "Test Prep",
    description: "SAT, GRE, GMAT, LSAT, and MCAT prep courses and study materials from top providers.",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    border: "border-amber-500/30 hover:border-amber-400/50",
    accentColor: "text-amber-400",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    countKey: "testPrep" as const,
  },
  {
    slug: "home-security-systems",
    emoji: "🔐",
    name: "Home Security",
    description: "Smart home security systems, cameras, alarms, and professional monitoring services.",
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    border: "border-red-500/30 hover:border-red-400/50",
    accentColor: "text-red-400",
    badgeColor: "bg-red-500/15 text-red-300 border-red-500/25",
    countKey: "homeSecurity" as const,
  },
  {
    slug: "home-warranty-companies",
    emoji: "🏡",
    name: "Home Warranties",
    description: "Protect your home appliances and systems with the best home warranty plans.",
    gradient: "from-green-500/20 via-teal-500/10 to-transparent",
    border: "border-green-500/30 hover:border-green-400/50",
    accentColor: "text-green-400",
    badgeColor: "bg-green-500/15 text-green-300 border-green-500/25",
    countKey: "homeWarranty" as const,
  },
  {
    slug: "solar-panel-companies",
    emoji: "☀️",
    name: "Solar Panels",
    description: "Top solar panel installers, financing options, and clean energy solutions for your home.",
    gradient: "from-yellow-500/20 via-orange-500/10 to-transparent",
    border: "border-yellow-500/30 hover:border-yellow-400/50",
    accentColor: "text-yellow-400",
    badgeColor: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25",
    countKey: "solarPanels" as const,
  },
  {
    slug: "pest-control-services",
    emoji: "🐛",
    name: "Pest Control",
    description: "Professional pest control services for termites, bed bugs, rodents, and more.",
    gradient: "from-lime-500/20 via-emerald-500/10 to-transparent",
    border: "border-lime-500/30 hover:border-lime-400/50",
    accentColor: "text-lime-400",
    badgeColor: "bg-lime-500/15 text-lime-300 border-lime-500/25",
    countKey: "pestControl" as const,
  },
  {
    slug: "moving-companies",
    emoji: "🚚",
    name: "Moving Companies",
    description: "Local and long-distance movers, moving containers, and relocation services.",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    border: "border-orange-500/30 hover:border-orange-400/50",
    accentColor: "text-orange-400",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/25",
    countKey: "movingCompanies" as const,
  },
  {
    slug: "hotel-booking-platforms",
    emoji: "🏨",
    name: "Hotel Booking",
    description: "Compare hotel prices, read reviews, and book accommodations worldwide.",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    border: "border-cyan-500/30 hover:border-cyan-400/50",
    accentColor: "text-cyan-400",
    badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
    countKey: "hotelBooking" as const,
  },
  {
    slug: "vacation-rental-platforms",
    emoji: "🏖️",
    name: "Vacation Rentals",
    description: "Find houses, cabins, and unique vacation stays from the best rental platforms.",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    border: "border-pink-500/30 hover:border-pink-400/50",
    accentColor: "text-pink-400",
    badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/25",
    countKey: "vacationRentals" as const,
  },
  {
    slug: "appointment-scheduling-software",
    emoji: "📅",
    name: "Appointment Scheduling",
    description: "Online booking and scheduling software for healthcare, salons, and professional services.",
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
    border: "border-fuchsia-500/30 hover:border-fuchsia-400/50",
    accentColor: "text-fuchsia-400",
    badgeColor: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25",
    countKey: "appointmentScheduling" as const,
  },
  {
    slug: "pos-systems",
    emoji: "🛒",
    name: "POS Systems",
    description: "Point-of-sale systems for retail, restaurants, and small businesses.",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-400/50",
    accentColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    countKey: "posSystems" as const,
  },
  {
    slug: "business-phone-systems",
    emoji: "📞",
    name: "Business Phone",
    description: "VoIP, cloud PBX, and business phone systems for teams of all sizes.",
    gradient: "from-sky-500/20 via-indigo-500/10 to-transparent",
    border: "border-sky-500/30 hover:border-sky-400/50",
    accentColor: "text-sky-400",
    badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    countKey: "businessPhone" as const,
  },
  {
    slug: "inventory-management-software",
    emoji: "📦",
    name: "Inventory Management",
    description: "Track stock, manage warehouses, and optimize supply chain with inventory software.",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    border: "border-amber-500/30 hover:border-amber-400/50",
    accentColor: "text-amber-400",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    countKey: "inventoryManagement" as const,
  },
  {
    slug: "fleet-management-software",
    emoji: "🚛",
    name: "Fleet Management",
    description: "GPS tracking, route optimization, and fleet maintenance software for logistics.",
    gradient: "from-slate-500/20 via-blue-500/10 to-transparent",
    border: "border-slate-500/30 hover:border-slate-400/50",
    accentColor: "text-slate-400",
    badgeColor: "bg-slate-500/15 text-slate-300 border-slate-500/25",
    countKey: "fleetManagement" as const,
  },
  {
    slug: "warehouse-management-software",
    emoji: "🏭",
    name: "Warehouse Management",
    description: "WMS software for warehouse operations, picking, packing, and shipping optimization.",
    gradient: "from-stone-500/20 via-gray-500/10 to-transparent",
    border: "border-stone-500/30 hover:border-stone-400/50",
    accentColor: "text-stone-400",
    badgeColor: "bg-stone-500/15 text-stone-300 border-stone-500/25",
    countKey: "warehouseManagement" as const,
  },
  {
    slug: "supply-chain-software",
    emoji: "🔗",
    name: "Supply Chain",
    description: "End-to-end supply chain management, procurement, and logistics optimization software.",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/50",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    countKey: "supplyChain" as const,
  },
  {
    slug: "contract-management-software",
    emoji: "📋",
    name: "Contract Management",
    description: "Create, negotiate, sign, and manage contracts with contract lifecycle management software.",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    border: "border-purple-500/30 hover:border-purple-400/50",
    accentColor: "text-purple-400",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/25",
    countKey: "contractManagement" as const,
  },
  {
    slug: "document-management-software",
    emoji: "📁",
    name: "Document Management",
    description: "Store, organize, share, and manage documents with enterprise DMS solutions.",
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    border: "border-indigo-500/30 hover:border-indigo-400/50",
    accentColor: "text-indigo-400",
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
    countKey: "documentManagement" as const,
  },
  {
    slug: "field-service-management",
    emoji: "🔧",
    name: "Field Service",
    description: "Dispatch, scheduling, and work order management for field service teams.",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    border: "border-rose-500/30 hover:border-rose-400/50",
    accentColor: "text-rose-400",
    badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/25",
    countKey: "fieldService" as const,
  },
  // — High-CPC niche directories —
  {
    slug: "mortgage-lenders",
    emoji: "🏠",
    name: "Mortgage Lenders",
    description: "Compare top mortgage lenders, rates, loan types, and find the best home financing options.",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-400/50",
    accentColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    countKey: "mortgageLenders" as const,
  },
  {
    slug: "llc-formation-services",
    emoji: "🏛️",
    name: "LLC Formation",
    description: "Start your business with the best LLC formation services, registered agents, and compliance tools.",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    border: "border-violet-500/30 hover:border-violet-400/50",
    accentColor: "text-violet-400",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    countKey: "llcFormation" as const,
  },
  {
    slug: "background-check-services",
    emoji: "🔍",
    name: "Background Checks",
    description: "Employment screening, tenant checks, and identity verification services for businesses.",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    border: "border-amber-500/30 hover:border-amber-400/50",
    accentColor: "text-amber-400",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    countKey: "backgroundChecks" as const,
  },
  {
    slug: "payment-processing",
    emoji: "💳",
    name: "Payment Processing",
    description: "Accept payments online and in-store with the best merchant services and payment gateways.",
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    border: "border-sky-500/30 hover:border-sky-400/50",
    accentColor: "text-sky-400",
    badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    countKey: "paymentProcessing" as const,
  },
  {
    slug: "gold-ira-companies",
    emoji: "🥇",
    name: "Gold IRA Companies",
    description: "Invest in precious metals with top-rated gold IRA companies and rollover specialists.",
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    border: "border-yellow-500/30 hover:border-yellow-400/50",
    accentColor: "text-yellow-400",
    badgeColor: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25",
    countKey: "goldIRA" as const,
  },
  {
    slug: "debt-relief-services",
    emoji: "💸",
    name: "Debt Relief",
    description: "Debt settlement, credit counseling, and consolidation services to get out of debt faster.",
    gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
    border: "border-teal-500/30 hover:border-teal-400/50",
    accentColor: "text-teal-400",
    badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/25",
    countKey: "debtRelief" as const,
  },
  {
    slug: "medical-billing-software",
    emoji: "🏥",
    name: "Medical Billing",
    description: "Practice management, claims processing, and revenue cycle software for healthcare providers.",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    border: "border-rose-500/30 hover:border-rose-400/50",
    accentColor: "text-rose-400",
    badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/25",
    countKey: "medicalBilling" as const,
  },
  {
    slug: "erp-software",
    emoji: "🏗️",
    name: "ERP Software",
    description: "Enterprise resource planning solutions for manufacturing, finance, HR, and supply chain.",
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    border: "border-indigo-500/30 hover:border-indigo-400/50",
    accentColor: "text-indigo-400",
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
    countKey: "erpSoftware" as const,
  },
  {
    slug: "workers-comp-insurance",
    emoji: "⚠️",
    name: "Workers Comp",
    description: "Workers compensation insurance for small businesses, construction, healthcare, and more.",
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    border: "border-orange-500/30 hover:border-orange-400/50",
    accentColor: "text-orange-400",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/25",
    countKey: "workersComp" as const,
  },
  {
    slug: "structured-settlement-companies",
    emoji: "⚖️",
    name: "Structured Settlements",
    description: "Sell structured settlements and annuities for cash with trusted settlement companies.",
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
    border: "border-fuchsia-500/30 hover:border-fuchsia-400/50",
    accentColor: "text-fuchsia-400",
    badgeColor: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25",
    countKey: "structuredSettlements" as const,
  },
  {
    slug: "business-loans",
    emoji: "🏦",
    name: "Business Loans",
    description: "Compare small business loans, SBA loans, lines of credit, and equipment financing from top lenders.",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    border: "border-green-500/30 hover:border-green-400/50",
    accentColor: "text-green-400",
    badgeColor: "bg-green-500/15 text-green-300 border-green-500/25",
    countKey: "businessLoans" as const,
  },
  {
    slug: "credit-repair-services",
    emoji: "📈",
    name: "Credit Repair",
    description: "Dispute errors, improve your credit score, and rebuild credit with the best repair services.",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    border: "border-purple-500/30 hover:border-purple-400/50",
    accentColor: "text-purple-400",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/25",
    countKey: "creditRepair" as const,
  },
  {
    slug: "tax-relief-services",
    emoji: "🏛️",
    name: "Tax Relief",
    description: "Resolve IRS tax debt with the best tax relief companies, enrolled agents, and tax attorneys.",
    gradient: "from-red-500/20 via-rose-500/10 to-transparent",
    border: "border-red-500/30 hover:border-red-400/50",
    accentColor: "text-red-400",
    badgeColor: "bg-red-500/15 text-red-300 border-red-500/25",
    countKey: "taxRelief" as const,
  },
  {
    slug: "virtual-data-rooms",
    emoji: "🔐",
    name: "Virtual Data Rooms",
    description: "Compare secure VDR platforms for M&A due diligence, fundraising, IPOs, and confidential document sharing.",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/50",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    countKey: "virtualDataRooms" as const,
  },
  {
    slug: "identity-theft-protection",
    emoji: "🛡️",
    name: "Identity Theft Protection",
    description: "Compare identity theft protection services for credit monitoring, dark web surveillance, and identity restoration.",
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    border: "border-indigo-500/30 hover:border-indigo-400/50",
    accentColor: "text-indigo-400",
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
    countKey: "identityTheftProtection" as const,
  },
  {
    slug: "personal-injury-lawyers",
    emoji: "⚖️",
    name: "Personal Injury Lawyers",
    description: "Find top personal injury attorneys for auto accidents, medical malpractice, workplace injuries, and product liability.",
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    border: "border-red-500/30 hover:border-red-400/50",
    accentColor: "text-red-400",
    badgeColor: "bg-red-500/15 text-red-300 border-red-500/25",
    countKey: "personalInjury" as const,
  },
  {
    slug: "mesothelioma-lawyers",
    emoji: "⚖️",
    name: "Mesothelioma Lawyers",
    description: "Top-rated mesothelioma and asbestos attorneys helping victims get maximum compensation.",
    gradient: "from-slate-500/20 via-zinc-500/10 to-transparent",
    border: "border-slate-500/30 hover:border-slate-400/50",
    accentColor: "text-slate-400",
    badgeColor: "bg-slate-500/15 text-slate-300 border-slate-500/25",
    countKey: "mesotheliomaLawyers" as const,
  },
  {
    slug: "bankruptcy-lawyers",
    emoji: "📋",
    name: "Bankruptcy Lawyers",
    description: "Find top bankruptcy attorneys for Chapter 7, Chapter 13, Chapter 11, debt negotiation, and asset protection.",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/50",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    countKey: "bankruptcyLawyers" as const,
  },
  {
    slug: "dui-lawyers",
    emoji: "🚔",
    name: "DUI Lawyers",
    description: "Top DUI and DWI defense attorneys for first offense, felony DUI, underage DUI, and CDL defense.",
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    border: "border-red-500/30 hover:border-red-400/50",
    accentColor: "text-red-400",
    badgeColor: "bg-red-500/15 text-red-300 border-red-500/25",
    countKey: "duiLawyers" as const,
  },
  // — Previously created directories (restored to homepage) —
  {
    slug: "accounting-software",
    emoji: "📒",
    name: "Accounting Software",
    description: "Compare accounting software for small businesses, freelancers, and enterprises.",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-400/50",
    accentColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    countKey: "accountingSoftware" as const,
  },
  {
    slug: "addiction-treatment-centers",
    emoji: "💊",
    name: "Addiction Treatment",
    description: "Find accredited addiction treatment centers for substance abuse recovery and rehab.",
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
    border: "border-teal-500/30 hover:border-teal-400/50",
    accentColor: "text-teal-400",
    badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/25",
    countKey: "addictionTreatment" as const,
  },
  {
    slug: "ai-agent-platforms",
    emoji: "🤖",
    name: "AI Agent Platforms",
    description: "Build and deploy autonomous AI agents for automation, research, and business workflows.",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    border: "border-violet-500/30 hover:border-violet-400/50",
    accentColor: "text-violet-400",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    countKey: "aiAgentPlatforms" as const,
  },
  {
    slug: "ai-coding-assistants",
    emoji: "💻",
    name: "AI Coding Assistants",
    description: "AI-powered code completion, review, and generation tools for developers.",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/50",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    countKey: "aiCodingAssistants" as const,
  },
  {
    slug: "ai-video-generators",
    emoji: "🎬",
    name: "AI Video Generators",
    description: "Create, edit, and generate videos with AI — from text-to-video to AI avatars.",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    border: "border-pink-500/30 hover:border-pink-400/50",
    accentColor: "text-pink-400",
    badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/25",
    countKey: "aiVideoGenerators" as const,
  },
  {
    slug: "applicant-tracking-systems",
    emoji: "📝",
    name: "Applicant Tracking",
    description: "ATS software to streamline hiring, track candidates, and manage recruiting pipelines.",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    border: "border-sky-500/30 hover:border-sky-400/50",
    accentColor: "text-sky-400",
    badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    countKey: "applicantTracking" as const,
  },
  {
    slug: "business-password-managers",
    emoji: "🔑",
    name: "Password Managers",
    description: "Secure business password managers for teams, enterprises, and single users.",
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    border: "border-red-500/30 hover:border-red-400/50",
    accentColor: "text-red-400",
    badgeColor: "bg-red-500/15 text-red-300 border-red-500/25",
    countKey: "passwordManagers" as const,
  },
  {
    slug: "business-tax-software",
    emoji: "🧾",
    name: "Business Tax Software",
    description: "Tax preparation and filing software built for small businesses, LLCs, and corporations.",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    border: "border-amber-500/30 hover:border-amber-400/50",
    accentColor: "text-amber-400",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    countKey: "businessTaxSoftware" as const,
  },
  {
    slug: "business-vpn-software",
    emoji: "🛡️",
    name: "Business VPN",
    description: "Secure remote access and business VPN solutions for teams and enterprises.",
    gradient: "from-slate-500/20 via-gray-500/10 to-transparent",
    border: "border-slate-500/30 hover:border-slate-400/50",
    accentColor: "text-slate-400",
    badgeColor: "bg-slate-500/15 text-slate-300 border-slate-500/25",
    countKey: "businessVPN" as const,
  },
  {
    slug: "ecommerce-inventory-software",
    emoji: "📦",
    name: "Ecommerce Inventory",
    description: "Inventory management software built for online sellers, multi-channel retailers, and 3PL.",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    border: "border-orange-500/30 hover:border-orange-400/50",
    accentColor: "text-orange-400",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/25",
    countKey: "ecommerceInventory" as const,
  },
  {
    slug: "ecommerce-platforms",
    emoji: "🛍️",
    name: "Ecommerce Platforms",
    description: "Full-featured ecommerce platforms to build, manage, and scale your online store.",
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    border: "border-indigo-500/30 hover:border-indigo-400/50",
    accentColor: "text-indigo-400",
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
    countKey: "ecommercePlatforms" as const,
  },
  {
    slug: "endpoint-security-software",
    emoji: "🖥️",
    name: "Endpoint Security",
    description: "Protect devices with endpoint detection, response, and antivirus software.",
    gradient: "from-red-500/20 via-rose-500/10 to-transparent",
    border: "border-red-500/30 hover:border-red-400/50",
    accentColor: "text-red-400",
    badgeColor: "bg-red-500/15 text-red-300 border-red-500/25",
    countKey: "endpointSecurity" as const,
  },
  {
    slug: "expense-management-software",
    emoji: "💰",
    name: "Expense Management",
    description: "Automate expense reporting, approvals, and reimbursements for businesses.",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    border: "border-green-500/30 hover:border-green-400/50",
    accentColor: "text-green-400",
    badgeColor: "bg-green-500/15 text-green-300 border-green-500/25",
    countKey: "expenseManagement" as const,
  },
  {
    slug: "hris-software",
    emoji: "👥",
    name: "HRIS Software",
    description: "Human resource information systems for employee data, benefits, and HR workflows.",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    border: "border-purple-500/30 hover:border-purple-400/50",
    accentColor: "text-purple-400",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/25",
    countKey: "hrisSoftware" as const,
  },
  {
    slug: "invoicing-billing-software",
    emoji: "🧾",
    name: "Invoicing Software",
    description: "Create invoices, track payments, and automate billing for freelancers and businesses.",
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    border: "border-cyan-500/30 hover:border-cyan-400/50",
    accentColor: "text-cyan-400",
    badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
    countKey: "invoicingSoftware" as const,
  },
  {
    slug: "mortgage-lending-software",
    emoji: "🏦",
    name: "Mortgage Software",
    description: "Loan origination, processing, and mortgage lending software for lenders and brokers.",
    gradient: "from-lime-500/20 via-green-500/10 to-transparent",
    border: "border-lime-500/30 hover:border-lime-400/50",
    accentColor: "text-lime-400",
    badgeColor: "bg-lime-500/15 text-lime-300 border-lime-500/25",
    countKey: "mortgageSoftware" as const,
  },
  {
    slug: "payroll-software",
    emoji: "💵",
    name: "Payroll Software",
    description: "Automate payroll processing, tax filing, and direct deposits for any business size.",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-400/50",
    accentColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    countKey: "payrollSoftware" as const,
  },
  {
    slug: "project-management-software",
    emoji: "📊",
    name: "Project Management",
    description: "Plan, track, and deliver projects on time with the best project management tools.",
    gradient: "from-blue-500/20 via-sky-500/10 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/50",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    countKey: "projectManagement" as const,
  },
  {
    slug: "real-estate-software",
    emoji: "🏠",
    name: "Real Estate Software",
    description: "CRM, MLS, and property management software for agents, brokers, and investors.",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    border: "border-rose-500/30 hover:border-rose-400/50",
    accentColor: "text-rose-400",
    badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/25",
    countKey: "realEstateSoftware" as const,
  },
  {
    slug: "subscription-billing-platforms",
    emoji: "🔄",
    name: "Subscription Billing",
    description: "Recurring billing, subscription management, and revenue recognition platforms.",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    border: "border-violet-500/30 hover:border-violet-400/50",
    accentColor: "text-violet-400",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    countKey: "subscriptionBilling" as const,
  },
  {
    slug: "time-tracking-software",
    emoji: "⏱️",
    name: "Time Tracking",
    description: "Track employee hours, billable time, and project costs with time tracking software.",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    border: "border-amber-500/30 hover:border-amber-400/50",
    accentColor: "text-amber-400",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    countKey: "timeTracking" as const,
  },
];

export default function HubPage() {
  const aiToolCount = getAllTools().length;
  const marketingToolCount = getAllMarketingTools().length;
  const financeToolCount = getAllFinanceTools().length;
  const ecommerceToolCount = getAllEcommerceTools().length;
  const productivityToolCount = getAllProductivityTools().length;
  const hrToolCount = getAllHRTools().length;
  const crmToolCount = getAllCRMTools().length;
  const securityToolCount = getAllSecurityTools().length;
  const websiteBuilderCount = getAllWebsiteBuilderTools().length;
  const creatorToolCount = getAllCreatorTools().length;
  const developerToolCount = getAllDeveloperTools().length;
  const designToolCount = getAllDesignTools().length;
  const supportToolCount = getAllSupportTools().length;
  const elearningToolCount = getAllElearningTools().length;
  const analyticsToolCount = getAllAnalyticsTools().length;
  const legalToolCount = getAllLegalTools().length;
  const hostingToolCount = getAllHostingTools().length;
  const socialMediaToolCount = getAllSocialMediaTools().length;
  const emailToolCount = getAllEmailTools().length;
  const noCodeToolCount = getAllNoCodeTools().length;
  // New category counts
  const appointmentSchedulingCount = getAllAppointmentSchedulingTools().length;
  const autoInsuranceCount = getAllAutoInsuranceTools().length;
  const budgetingAppsCount = getAllBudgetingAppTools().length;
  const businessInsuranceCount = getAllBusinessInsuranceTools().length;
  const businessPhoneCount = getAllBusinessPhoneTools().length;
  const contractManagementCount = getAllContractManagementTools().length;
  const creditCardsCount = getAllCreditCardTools().length;
  const cryptoExchangesCount = getAllCryptoExchangeTools().length;
  const documentManagementCount = getAllDocumentManagementTools().length;
  const estatePlanningCount = getAllEstatePlanningTools().length;
  const fieldServiceCount = getAllFieldServiceTools().length;
  const fitnessAppsCount = getAllFitnessAppTools().length;
  const fleetManagementCount = getAllFleetManagementTools().length;
  const healthInsuranceCount = getAllHealthInsuranceTools().length;
  const homeInsuranceCount = getAllHomeInsuranceTools().length;
  const homeSecurityCount = getAllHomeSecurityTools().length;
  const homeWarrantyCount = getAllHomeWarrantyTools().length;
  const hotelBookingCount = getAllHotelBookingTools().length;
  const inventoryManagementCount = getAllInventoryManagementTools().length;
  const investmentPlatformsCount = getAllInvestmentPlatformTools().length;
  const lifeInsuranceCount = getAllLifeInsuranceTools().length;
  const mentalHealthCount = getAllMentalHealthTools().length;
  const movingCompaniesCount = getAllMovingCompanyTools().length;
  const onlineDegreesCount = getAllOnlineDegreeTools().length;
  const onlineTutoringCount = getAllOnlineTutoringTools().length;
  const personalLoansCount = getAllPersonalLoanTools().length;
  const pestControlCount = getAllPestControlTools().length;
  const posSystemsCount = getAllPOSSystemTools().length;
  const roboAdvisorsCount = getAllRoboAdvisorTools().length;
  const solarPanelsCount = getAllSolarPanelTools().length;
  const studentLoansCount = getAllStudentLoanTools().length;
  const supplyChainCount = getAllSupplyChainTools().length;
  const taxPrepCount = getAllTaxPrepTools().length;
  const telehealthCount = getAllTelehealthTools().length;
  const testPrepCount = getAllTestPrepTools().length;
  const travelInsuranceCount = getAllTravelInsuranceTools().length;
  const vacationRentalsCount = getAllVacationRentalTools().length;
  const warehouseManagementCount = getAllWarehouseManagementTools().length;
  // High-CPC niche counts
  const mortgageLendersCount = getAllMortgageLenderTools().length;
  const llcFormationCount = getAllLLCFormationTools().length;
  const backgroundChecksCount = getAllBackgroundCheckTools().length;
  const paymentProcessingCount = getAllPaymentProcessingTools().length;
  const goldIRACount = getAllGoldIRATools().length;
  const debtReliefCount = getAllDebtReliefTools().length;
  const medicalBillingCount = getAllMedicalBillingTools().length;
  const erpSoftwareCount = getAllERPTools().length;
  const workersCompCount = getAllWorkersCompTools().length;
  const structuredSettlementsCount = getAllStructuredSettlementTools().length;
  const businessLoansCount = getAllBusinessLoanTools().length;
  const creditRepairCount = getAllCreditRepairTools().length;
  const taxReliefCount = getAllTaxReliefTools().length;
  const virtualDataRoomsCount = getAllVirtualDataRoomTools().length;
  const identityTheftProtectionCount = getAllIdentityTheftProtectionTools().length;
  const personalInjuryCount = getAllPersonalInjuryTools().length;
  const mesotheliomaLawyersCount = getAllMesotheliomaLawyerTools().length;
  const bankruptcyLawyersCount = getAllBankruptcyLawyerTools().length;
  const duiLawyersCount = getAllDUILawyerTools().length;
  const accountingSoftwareCount = getAllAccountingTools().length;
  const addictionTreatmentCount = getAllAddictionTreatmentCenterTools().length;
  const aiAgentPlatformsCount = getAllAIAgentsTools().length;
  const aiCodingAssistantsCount = getAllAICodingTools().length;
  const aiVideoGeneratorsCount = getAllAIVideoTools().length;
  const applicantTrackingCount = getAllATSTools().length;
  const passwordManagersCount = getAllPasswordManagerTools().length;
  const businessTaxSoftwareCount = getAllBusinessTaxTools().length;
  const businessVPNCount = getAllBusinessVPNTools().length;
  const ecommerceInventoryCount = getAllEcommerceInventoryTools().length;
  const ecommercePlatformsCount = getAllEcommercePlatformTools().length;
  const endpointSecurityCount = getAllEndpointSecurityTools().length;
  const expenseManagementCount = getAllExpenseManagementTools().length;
  const hrisSoftwareCount = getAllHRISTools().length;
  const invoicingSoftwareCount = getAllInvoicingTools().length;
  const mortgageSoftwareCount = getAllMortgageLendingTools().length;
  const payrollSoftwareCount = getAllPayrollTools().length;
  const projectManagementCount = getAllProjectManagementTools().length;
  const realEstateSoftwareCount = getAllRealEstateTools().length;
  const subscriptionBillingCount = getAllSubscriptionBillingTools().length;
  const timeTrackingCount = getAllTimeTrackingTools().length;

  const totalListings =
    aiToolCount + marketingToolCount + financeToolCount + ecommerceToolCount +
    productivityToolCount + hrToolCount + crmToolCount + securityToolCount +
    websiteBuilderCount + creatorToolCount + developerToolCount + designToolCount +
    supportToolCount + elearningToolCount + analyticsToolCount + legalToolCount +
    hostingToolCount + socialMediaToolCount + emailToolCount + noCodeToolCount +
    appointmentSchedulingCount + autoInsuranceCount + budgetingAppsCount +
    businessInsuranceCount + businessPhoneCount + contractManagementCount +
    creditCardsCount + cryptoExchangesCount + documentManagementCount +
    estatePlanningCount + fieldServiceCount + fitnessAppsCount +
    fleetManagementCount + healthInsuranceCount + homeInsuranceCount +
    homeSecurityCount + homeWarrantyCount + hotelBookingCount +
    inventoryManagementCount + investmentPlatformsCount + lifeInsuranceCount +
    mentalHealthCount + movingCompaniesCount + onlineDegreesCount +
    onlineTutoringCount + personalLoansCount + pestControlCount +
    posSystemsCount + roboAdvisorsCount + solarPanelsCount +
    studentLoansCount + supplyChainCount + taxPrepCount +
    telehealthCount + testPrepCount + travelInsuranceCount +
    vacationRentalsCount + warehouseManagementCount +
    mortgageLendersCount + llcFormationCount + backgroundChecksCount +
    paymentProcessingCount + goldIRACount + debtReliefCount +
    medicalBillingCount + erpSoftwareCount + workersCompCount +
    structuredSettlementsCount + businessLoansCount + creditRepairCount +
    taxReliefCount +
    virtualDataRoomsCount +
    identityTheftProtectionCount +
    personalInjuryCount + mesotheliomaLawyersCount +
    bankruptcyLawyersCount + duiLawyersCount +
    accountingSoftwareCount + addictionTreatmentCount + aiAgentPlatformsCount +
    aiCodingAssistantsCount + aiVideoGeneratorsCount + applicantTrackingCount +
    passwordManagersCount + businessTaxSoftwareCount + businessVPNCount +
    ecommerceInventoryCount + ecommercePlatformsCount + endpointSecurityCount +
    expenseManagementCount + hrisSoftwareCount + invoicingSoftwareCount +
    mortgageSoftwareCount + payrollSoftwareCount + projectManagementCount +
    realEstateSoftwareCount + subscriptionBillingCount + timeTrackingCount;

  const categoryCount = getAllCategories().length;

  const countMap: Record<string, number> = {
    ai: aiToolCount,
    marketing: marketingToolCount,
    finance: financeToolCount,
    ecommerce: ecommerceToolCount,
    productivity: productivityToolCount,
    hr: hrToolCount,
    crm: crmToolCount,
    security: securityToolCount,
    websiteBuilders: websiteBuilderCount,
    creator: creatorToolCount,
    developer: developerToolCount,
    design: designToolCount,
    support: supportToolCount,
    elearning: elearningToolCount,
    analytics: analyticsToolCount,
    legal: legalToolCount,
    hosting: hostingToolCount,
    socialMedia: socialMediaToolCount,
    email: emailToolCount,
    noCode: noCodeToolCount,
    appointmentScheduling: appointmentSchedulingCount,
    autoInsurance: autoInsuranceCount,
    budgetingApps: budgetingAppsCount,
    businessInsurance: businessInsuranceCount,
    businessPhone: businessPhoneCount,
    contractManagement: contractManagementCount,
    creditCards: creditCardsCount,
    cryptoExchanges: cryptoExchangesCount,
    documentManagement: documentManagementCount,
    estatePlanning: estatePlanningCount,
    fieldService: fieldServiceCount,
    fitnessApps: fitnessAppsCount,
    fleetManagement: fleetManagementCount,
    healthInsurance: healthInsuranceCount,
    homeInsurance: homeInsuranceCount,
    homeSecurity: homeSecurityCount,
    homeWarranty: homeWarrantyCount,
    hotelBooking: hotelBookingCount,
    inventoryManagement: inventoryManagementCount,
    investmentPlatforms: investmentPlatformsCount,
    lifeInsurance: lifeInsuranceCount,
    mentalHealth: mentalHealthCount,
    movingCompanies: movingCompaniesCount,
    onlineDegrees: onlineDegreesCount,
    onlineTutoring: onlineTutoringCount,
    personalLoans: personalLoansCount,
    pestControl: pestControlCount,
    posSystems: posSystemsCount,
    roboAdvisors: roboAdvisorsCount,
    solarPanels: solarPanelsCount,
    studentLoans: studentLoansCount,
    supplyChain: supplyChainCount,
    taxPrep: taxPrepCount,
    telehealth: telehealthCount,
    testPrep: testPrepCount,
    travelInsurance: travelInsuranceCount,
    vacationRentals: vacationRentalsCount,
    warehouseManagement: warehouseManagementCount,
    // High-CPC niches
    mortgageLenders: mortgageLendersCount,
    llcFormation: llcFormationCount,
    backgroundChecks: backgroundChecksCount,
    paymentProcessing: paymentProcessingCount,
    goldIRA: goldIRACount,
    debtRelief: debtReliefCount,
    medicalBilling: medicalBillingCount,
    erpSoftware: erpSoftwareCount,
    workersComp: workersCompCount,
    structuredSettlements: structuredSettlementsCount,
    businessLoans: businessLoansCount,
    creditRepair: creditRepairCount,
    taxRelief: taxReliefCount,
    virtualDataRooms: virtualDataRoomsCount,
    identityTheftProtection: identityTheftProtectionCount,
    personalInjury: personalInjuryCount,
    mesotheliomaLawyers: mesotheliomaLawyersCount,
    bankruptcyLawyers: bankruptcyLawyersCount,
    duiLawyers: duiLawyersCount,
    accountingSoftware: accountingSoftwareCount,
    addictionTreatment: addictionTreatmentCount,
    aiAgentPlatforms: aiAgentPlatformsCount,
    aiCodingAssistants: aiCodingAssistantsCount,
    aiVideoGenerators: aiVideoGeneratorsCount,
    applicantTracking: applicantTrackingCount,
    passwordManagers: passwordManagersCount,
    businessTaxSoftware: businessTaxSoftwareCount,
    businessVPN: businessVPNCount,
    ecommerceInventory: ecommerceInventoryCount,
    ecommercePlatforms: ecommercePlatformsCount,
    endpointSecurity: endpointSecurityCount,
    expenseManagement: expenseManagementCount,
    hrisSoftware: hrisSoftwareCount,
    invoicingSoftware: invoicingSoftwareCount,
    mortgageSoftware: mortgageSoftwareCount,
    payrollSoftware: payrollSoftwareCount,
    projectManagement: projectManagementCount,
    realEstateSoftware: realEstateSoftwareCount,
    subscriptionBilling: subscriptionBillingCount,
    timeTracking: timeTrackingCount,
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,40,200,0.15),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(16,185,129,0.08),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/15 border border-violet-500/25 text-3xl shadow-lg shadow-violet-500/10">
            🔍
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Finders</span>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">List</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Curated directories for the software tools that actually matter. Hand-picked, honestly reviewed, free to browse.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { value: `${totalListings}+`, label: "Listings" },
              { value: `${categoryCount + 80}+`, label: "Categories" },
              { value: `${directories.length}`, label: "Live Directories" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directories */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Browse Directories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {directories.map((dir) => {
            const listingCount = countMap[dir.countKey] ?? 0;
            return (
              <Link
                key={dir.slug}
                href={`/${dir.slug}`}
                className={`group relative flex flex-col gap-3 p-5 rounded-2xl border bg-gradient-to-br ${dir.gradient} ${dir.border} transition-all overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/2 group-hover:to-white/0 transition-all pointer-events-none rounded-2xl" />
                <div className="relative flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-xl shadow-sm">
                    {dir.emoji}
                  </div>
                  <span className={`text-xs border rounded-full px-2 py-0.5 ${dir.badgeColor}`}>
                    {listingCount}+
                  </span>
                </div>
                <div className="relative">
                  <h3 className="text-base font-semibold text-white mb-1">
                    {dir.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{dir.description}</p>
                </div>
                <div className={`relative flex items-center gap-1 text-xs ${dir.accentColor} mt-auto font-medium`}>
                  Browse directory
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/8 bg-slate-900/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-slate-500 text-sm mb-4">Know a tool that should be listed?</p>
          <Link
            href="/ai-tools/submit"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            Submit a Tool
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
