import { NextResponse } from "next/server";

// Prerender once at build time. Index changes only when data/lib files change,
// so we get a static JSON file with no per-request cost.
export const dynamic = "force-static";
export const revalidate = false;

// ─── Directory registry ──────────────────────────────────────────────────────
// path = URL slug, libName = file under @/lib, label = how the directory is
// shown to users in search results.

const DIRECTORIES: { path: string; libName: string; label: string }[] = [
  { path: "ai-tools", libName: "tools", label: "AI Tools" },
  { path: "marketing-tools", libName: "marketing-tools", label: "Marketing" },
  { path: "finance-tools", libName: "finance-tools", label: "Finance" },
  { path: "ecommerce-tools", libName: "ecommerce-tools", label: "E-Commerce" },
  { path: "productivity-tools", libName: "productivity-tools", label: "Productivity" },
  { path: "hr-tools", libName: "hr-tools", label: "HR" },
  { path: "crm-tools", libName: "crm-tools", label: "CRM" },
  { path: "security-tools", libName: "security-tools", label: "Security" },
  { path: "website-builders", libName: "website-builders", label: "Website Builders" },
  { path: "creator-tools", libName: "creator-tools", label: "Creator" },
  { path: "developer-tools", libName: "developer-tools", label: "Developer" },
  { path: "design-tools", libName: "design-tools", label: "Design" },
  { path: "support-tools", libName: "support-tools", label: "Support" },
  { path: "elearning-tools", libName: "elearning-tools", label: "E-Learning" },
  { path: "analytics-tools", libName: "analytics-tools", label: "Analytics" },
  { path: "legal-tools", libName: "legal-tools", label: "Legal Tech" },
  { path: "hosting-tools", libName: "hosting-tools", label: "Hosting" },
  { path: "social-media-tools", libName: "social-media-tools", label: "Social Media" },
  { path: "email-tools", libName: "email-tools", label: "Email" },
  { path: "no-code-tools", libName: "no-code-tools", label: "No-Code" },
  { path: "appointment-scheduling-software", libName: "appointment-scheduling-software", label: "Appointment Scheduling" },
  { path: "auto-insurance", libName: "auto-insurance", label: "Auto Insurance" },
  { path: "budgeting-apps", libName: "budgeting-apps", label: "Budgeting Apps" },
  { path: "business-insurance", libName: "business-insurance", label: "Business Insurance" },
  { path: "business-phone-systems", libName: "business-phone-systems", label: "Business Phones" },
  { path: "contract-management-software", libName: "contract-management-software", label: "Contract Management" },
  { path: "credit-cards", libName: "credit-cards", label: "Credit Cards" },
  { path: "cryptocurrency-exchanges", libName: "cryptocurrency-exchanges", label: "Crypto Exchanges" },
  { path: "document-management-software", libName: "document-management-software", label: "Document Management" },
  { path: "estate-planning-services", libName: "estate-planning-services", label: "Estate Planning" },
  { path: "field-service-management", libName: "field-service-management", label: "Field Service" },
  { path: "fitness-apps", libName: "fitness-apps", label: "Fitness Apps" },
  { path: "fleet-management-software", libName: "fleet-management-software", label: "Fleet Management" },
  { path: "health-insurance", libName: "health-insurance", label: "Health Insurance" },
  { path: "home-insurance", libName: "home-insurance", label: "Home Insurance" },
  { path: "home-security-systems", libName: "home-security-systems", label: "Home Security" },
  { path: "home-warranty-companies", libName: "home-warranty-companies", label: "Home Warranty" },
  { path: "hotel-booking-platforms", libName: "hotel-booking-platforms", label: "Hotel Booking" },
  { path: "inventory-management-software", libName: "inventory-management-software", label: "Inventory" },
  { path: "investment-platforms", libName: "investment-platforms", label: "Investing" },
  { path: "life-insurance", libName: "life-insurance", label: "Life Insurance" },
  { path: "mental-health-apps", libName: "mental-health-apps", label: "Mental Health" },
  { path: "moving-companies", libName: "moving-companies", label: "Moving Companies" },
  { path: "online-degree-programs", libName: "online-degree-programs", label: "Online Degrees" },
  { path: "online-tutoring-platforms", libName: "online-tutoring-platforms", label: "Tutoring" },
  { path: "personal-loans", libName: "personal-loans", label: "Personal Loans" },
  { path: "pest-control-services", libName: "pest-control-services", label: "Pest Control" },
  { path: "pos-systems", libName: "pos-systems", label: "POS Systems" },
  { path: "robo-advisors", libName: "robo-advisors", label: "Robo-Advisors" },
  { path: "solar-panel-companies", libName: "solar-panel-companies", label: "Solar" },
  { path: "student-loans", libName: "student-loans", label: "Student Loans" },
  { path: "supply-chain-software", libName: "supply-chain-software", label: "Supply Chain" },
  { path: "tax-preparation-software", libName: "tax-preparation-software", label: "Tax Prep" },
  { path: "telehealth-platforms", libName: "telehealth-platforms", label: "Telehealth" },
  { path: "test-prep-services", libName: "test-prep-services", label: "Test Prep" },
  { path: "travel-insurance", libName: "travel-insurance", label: "Travel Insurance" },
  { path: "vacation-rental-platforms", libName: "vacation-rental-platforms", label: "Vacation Rentals" },
  { path: "warehouse-management-software", libName: "warehouse-management-software", label: "Warehouse Mgmt" },
  { path: "mortgage-lenders", libName: "mortgage-lenders", label: "Mortgage Lenders" },
  { path: "llc-formation-services", libName: "llc-formation-services", label: "LLC Formation" },
  { path: "background-check-services", libName: "background-check-services", label: "Background Checks" },
  { path: "payment-processing", libName: "payment-processing", label: "Payment Processing" },
  { path: "gold-ira-companies", libName: "gold-ira-companies", label: "Gold IRA" },
  { path: "debt-relief-services", libName: "debt-relief-services", label: "Debt Relief" },
  { path: "medical-billing-software", libName: "medical-billing-software", label: "Medical Billing" },
  { path: "erp-software", libName: "erp-software", label: "ERP" },
  { path: "workers-comp-insurance", libName: "workers-comp-insurance", label: "Workers Comp" },
  { path: "structured-settlement-companies", libName: "structured-settlement-companies", label: "Structured Settlements" },
  { path: "business-loans", libName: "business-loans", label: "Business Loans" },
  { path: "credit-repair-services", libName: "credit-repair-services", label: "Credit Repair" },
  { path: "tax-relief-services", libName: "tax-relief-services", label: "Tax Relief" },
  { path: "identity-theft-protection", libName: "identity-theft-protection", label: "Identity Theft" },
  { path: "personal-injury-lawyers", libName: "personal-injury-lawyers", label: "Personal Injury Lawyers" },
  { path: "mesothelioma-lawyers", libName: "mesothelioma-lawyers", label: "Mesothelioma Lawyers" },
  { path: "bankruptcy-lawyers", libName: "bankruptcy-lawyers", label: "Bankruptcy Lawyers" },
  { path: "dui-lawyers", libName: "dui-lawyers", label: "DUI Lawyers" },
  { path: "accounting-software", libName: "accounting-software", label: "Accounting" },
  { path: "addiction-treatment-centers", libName: "addiction-treatment-centers", label: "Addiction Treatment" },
  { path: "ai-agent-platforms", libName: "ai-agent-platforms", label: "AI Agents" },
  { path: "ai-coding-assistants", libName: "ai-coding-assistants", label: "AI Coding" },
  { path: "ai-video-generators", libName: "ai-video-generators", label: "AI Video" },
  { path: "applicant-tracking-systems", libName: "applicant-tracking-systems", label: "ATS" },
  { path: "business-password-managers", libName: "business-password-managers", label: "Password Managers" },
  { path: "business-tax-software", libName: "business-tax-software", label: "Business Tax" },
  { path: "business-vpn-software", libName: "business-vpn-software", label: "Business VPN" },
  { path: "ecommerce-inventory-software", libName: "ecommerce-inventory-software", label: "E-Commerce Inventory" },
  { path: "ecommerce-platforms", libName: "ecommerce-platforms", label: "E-Commerce Platforms" },
  { path: "endpoint-security-software", libName: "endpoint-security-software", label: "Endpoint Security" },
  { path: "expense-management-software", libName: "expense-management-software", label: "Expense Management" },
  { path: "hris-software", libName: "hris-software", label: "HRIS" },
  { path: "invoicing-billing-software", libName: "invoicing-billing-software", label: "Invoicing" },
  { path: "mortgage-lending-software", libName: "mortgage-lending-software", label: "Mortgage Lending Software" },
  { path: "payroll-software", libName: "payroll-software", label: "Payroll" },
  { path: "project-management-software", libName: "project-management-software", label: "Project Management" },
  { path: "real-estate-software", libName: "real-estate-software", label: "Real Estate Software" },
  { path: "subscription-billing-platforms", libName: "subscription-billing-platforms", label: "Subscription Billing" },
  { path: "time-tracking-software", libName: "time-tracking-software", label: "Time Tracking" },
  { path: "virtual-data-rooms", libName: "virtual-data-rooms", label: "Virtual Data Rooms" },
  { path: "antivirus-software", libName: "antivirus-software", label: "Antivirus" },
  { path: "call-center-software", libName: "call-center-software", label: "Call Center" },
  { path: "cloud-storage-providers", libName: "cloud-storage-providers", label: "Cloud Storage" },
  { path: "divorce-lawyers", libName: "divorce-lawyers", label: "Divorce Lawyers" },
  { path: "live-chat-software", libName: "live-chat-software", label: "Live Chat" },
  { path: "marketing-automation-software", libName: "marketing-automation-software", label: "Marketing Automation" },
  { path: "seo-tools", libName: "seo-tools", label: "SEO" },
  { path: "video-conferencing-software", libName: "video-conferencing-software", label: "Video Conferencing" },
];

interface RawTool {
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  category?: string;
  tags?: string[];
}

export interface SearchIndexEntry {
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  directory: string;
  directoryLabel: string;
  tags: string[];
}

// Function names across the 108 lib files don't follow a consistent rule
// (getAllAutoInsuranceTools vs getAllERPTools vs getAllAccountingTools, etc.).
// Instead of guessing the function name, scan exports for any array whose
// elements look like a tool. This is robust to naming drift.
function extractTools(lib: Record<string, unknown>): RawTool[] {
  // 1. Prefer a *_TOOLS array export (most common pattern).
  for (const [key, val] of Object.entries(lib)) {
    if (key.endsWith("_TOOLS") && Array.isArray(val) && val.length > 0 && val[0] && typeof (val[0] as RawTool).slug === "string") {
      return val as RawTool[];
    }
  }
  // 2. Fall back to a getAll*Tools function (excluding getAll*Categories etc.).
  for (const [key, val] of Object.entries(lib)) {
    if (typeof val === "function" && key.startsWith("getAll") && key.endsWith("Tools") && !key.endsWith("Categories")) {
      try {
        const result = (val as () => unknown)();
        if (Array.isArray(result) && result.length > 0 && typeof (result[0] as RawTool).slug === "string") {
          return result as RawTool[];
        }
      } catch {
        // ignore; try next
      }
    }
  }
  return [];
}

export async function GET() {
  const index: SearchIndexEntry[] = [];

  for (const cat of DIRECTORIES) {
    try {
      const lib = await import(`@/lib/${cat.libName}`);
      const tools = extractTools(lib);
      for (const tool of tools) {
        index.push({
          slug: tool.slug,
          name: tool.name,
          tagline: tool.tagline,
          logo: tool.logo,
          directory: cat.path,
          directoryLabel: cat.label,
          tags: tool.tags ?? [],
        });
      }
    } catch {
      // Silently skip if a lib file is missing.
    }
  }

  return NextResponse.json(index, {
    headers: {
      // Long browser cache; index only changes when content does and a redeploy
      // will issue a new URL via Next.js static asset hashing.
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
