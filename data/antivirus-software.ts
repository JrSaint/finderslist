export type AntivirusCategory = "consumer" | "business" | "internet-security" | "mobile" | "free";

export interface AntivirusTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: AntivirusCategory;
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

export const ANTIVIRUS_CATEGORIES: Record<AntivirusCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "consumer": { label: "Consumer Antivirus", emoji: "🛡️", description: "Full-featured antivirus suites for home users and families.", gradient: "from-green-600/30 to-emerald-800/40" },
  "business": { label: "Business Antivirus", emoji: "🏢", description: "Endpoint protection designed for businesses with centralized management.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "internet-security": { label: "Internet Security Suites", emoji: "🌐", description: "Comprehensive suites bundling antivirus with VPN, firewall, and identity protection.", gradient: "from-purple-600/30 to-violet-800/40" },
  "mobile": { label: "Mobile Security", emoji: "📱", description: "Antivirus and security apps for Android and iOS devices.", gradient: "from-orange-600/30 to-amber-800/40" },
  "free": { label: "Free Antivirus", emoji: "🆓", description: "Free antivirus options with basic malware protection.", gradient: "from-teal-600/30 to-cyan-800/40" },
};

export const ANTIVIRUS_TOOLS: AntivirusTool[] = [
  {
    slug: "norton-360",
    name: "Norton 360",
    tagline: "All-in-one security suite with antivirus, VPN, dark web monitoring, and cloud backup",
    description: "Norton 360 is one of the most comprehensive security suites available, combining antivirus, firewall, VPN, dark web monitoring, password manager, cloud backup, and identity theft protection. Norton's SONAR behavior-based detection catches zero-day threats, and the suite consistently earns top scores from independent testing labs (AV-TEST, AV-Comparatives). The LifeLock identity protection add-on provides credit monitoring, SSN alerts, and up to $1M in identity theft coverage. Norton protects over 80 million devices worldwide.",
    category: "internet-security",
    tags: ["norton 360", "antivirus", "internet security", "vpn", "dark web monitoring", "identity protection"],
    url: "https://us.norton.com",
    affiliateUrl: "https://us.norton.com",
    pricing: "paid",
    featured: true,
    logo: "🟡",
    domain: "us.norton.com",
    pros: ["Consistently top-rated by AV-TEST and AV-Comparatives labs", "All-in-one: antivirus, VPN, password manager, cloud backup, identity protection", "LifeLock identity theft coverage up to $1M", "Minimal system performance impact with smart scanning", "Dark web monitoring alerts if your info appears in breaches"],
    cons: ["Expensive at full price — $99-349/year depending on tier", "Auto-renewal at higher rates if not manually canceled", "VPN has limited server locations compared to dedicated VPN services", "Can be resource-heavy during full system scans"],
    useCases: ["Families wanting complete protection across multiple devices", "Users concerned about identity theft needing dark web monitoring", "Home users wanting antivirus bundled with VPN and backup"],
  },
  {
    slug: "bitdefender-total-security",
    name: "Bitdefender Total Security",
    tagline: "Award-winning antivirus with the best malware detection rates in the industry",
    description: "Bitdefender Total Security consistently ranks #1 in independent malware detection tests with near-perfect scores. It uses machine learning to detect unknown threats and includes anti-ransomware, web protection, privacy firewall, and vulnerability assessment. The suite covers Windows, macOS, Android, and iOS. Bitdefender's Global Protective Network processes 11 billion threat queries daily. It's the top recommendation from most independent reviewers for overall protection quality.",
    category: "consumer",
    tags: ["bitdefender", "antivirus", "malware detection", "anti-ransomware", "machine learning", "cross-platform"],
    url: "https://www.bitdefender.com",
    affiliateUrl: "https://www.bitdefender.com",
    pricing: "paid",
    featured: true,
    logo: "🔴",
    domain: "bitdefender.com",
    pros: ["#1 malware detection rates in independent lab tests consistently", "Machine learning-based threat detection catches zero-day attacks", "Minimal system impact — among the lightest antivirus suites", "Cross-platform protection for Windows, Mac, Android, and iOS", "Built-in VPN (200MB/day), password manager, and parental controls"],
    cons: ["VPN data cap is very limited on the base plan (200MB/day)", "iOS protection is limited compared to Android and Windows", "Premium features like unlimited VPN require upgrading", "Interface can be complex for non-technical users"],
    useCases: ["Users wanting the absolute best malware detection available", "Multi-device households needing cross-platform protection", "Security-conscious users who value independent lab test results"],
  },
  {
    slug: "mcafee-total-protection",
    name: "McAfee Total Protection",
    tagline: "Trusted antivirus with unlimited device coverage and identity monitoring",
    description: "McAfee Total Protection offers unlimited device coverage on its premium plans — rare in the industry where most competitors cap at 5-10 devices. It includes antivirus, VPN, identity monitoring, password manager, and a personal data cleanup tool that removes your info from data broker sites. McAfee has evolved from a basic antivirus to a comprehensive identity and privacy suite. The $100M identity theft protection guarantee adds peace of mind.",
    category: "internet-security",
    tags: ["mcafee", "antivirus", "unlimited devices", "identity monitoring", "vpn", "data cleanup"],
    url: "https://www.mcafee.com",
    affiliateUrl: "https://www.mcafee.com",
    pricing: "paid",
    featured: true,
    logo: "🔵",
    domain: "mcafee.com",
    pros: ["Unlimited device coverage on premium plans — cover your whole family", "Personal data cleanup removes your info from data broker sites", "$100M identity theft protection guarantee", "Included VPN with unlimited bandwidth", "Web protection and safe browsing across all platforms"],
    cons: ["Detection rates slightly behind Bitdefender and Norton in lab tests", "Can be resource-intensive during scans on older hardware", "Aggressive marketing for add-ons and renewals", "Auto-renewal pricing is significantly higher than introductory rates"],
    useCases: ["Large families needing unlimited device protection", "Users wanting data broker removal and identity monitoring", "Households with many devices looking for cost-effective coverage"],
  },
  {
    slug: "kaspersky",
    name: "Kaspersky",
    tagline: "Powerful antivirus with excellent malware detection but geopolitical concerns",
    description: "Kaspersky consistently achieves top marks in independent malware detection tests alongside Bitdefender. Its technology is widely respected in the cybersecurity community. However, the company's Russian origins have led to bans by the US government and some Western organizations due to national security concerns. In 2024, the US Commerce Department banned Kaspersky sales in the US. Despite the political concerns, the underlying technology remains among the most effective antivirus solutions available.",
    category: "consumer",
    tags: ["kaspersky", "antivirus", "malware detection", "internet security", "privacy", "cross-platform"],
    url: "https://www.kaspersky.com",
    pricing: "paid",
    featured: true,
    logo: "🟢",
    domain: "kaspersky.com",
    pros: ["Top-tier malware detection — consistently scores 99-100% in lab tests", "Excellent web protection and anti-phishing capabilities", "Light system footprint with fast scanning", "Strong privacy tools including webcam protection", "Affordable pricing compared to Norton and McAfee"],
    cons: ["Banned in the US by Commerce Department in 2024 due to Russian ties", "Many Western businesses and governments prohibit its use", "Geopolitical concerns may affect long-term viability in some markets", "Some features vary significantly by region"],
    useCases: ["Users in regions where Kaspersky is available wanting top detection rates", "Budget-conscious users prioritizing malware detection quality", "Technical users who trust independent lab results over geopolitical concerns"],
  },
  {
    slug: "windows-defender",
    name: "Microsoft Defender",
    tagline: "Free built-in antivirus for Windows that's now genuinely good",
    description: "Microsoft Defender (Windows Security) comes pre-installed on every Windows PC and has evolved from a weak afterthought into a genuinely capable antivirus. It now scores well in independent tests and provides real-time protection, cloud-delivered analysis, ransomware protection, and firewall management. For most home users, Defender eliminates the need for third-party antivirus software. The paid Microsoft 365 subscription adds identity theft monitoring and VPN.",
    category: "free",
    tags: ["microsoft defender", "windows security", "free antivirus", "built-in", "windows", "ransomware protection"],
    url: "https://www.microsoft.com/windows/comprehensive-security",
    pricing: "free",
    featured: true,
    logo: "🪟",
    domain: "microsoft.com",
    pros: ["Completely free and pre-installed on all Windows PCs", "Genuinely strong malware detection — competitive with paid options", "Zero impact on system resources — deeply integrated with Windows", "SmartScreen web protection in Edge browser", "Ransomware protection with controlled folder access"],
    cons: ["Protection limited to Windows — no Mac, Android, or iOS", "No VPN, password manager, or identity protection in free version", "Web protection works best in Edge, not other browsers", "Parental controls require separate Microsoft Family Safety setup"],
    useCases: ["Windows users wanting solid protection without paying for antivirus", "Budget-conscious users who primarily use one Windows device", "Users who prefer the simplicity of a built-in, set-and-forget solution"],
  },
  { slug: "avast", name: "Avast", tagline: "Popular free antivirus with solid protection and a large user base", description: "Avast Free Antivirus protects 400+ million users with real-time malware detection, web shield, email shield, and Wi-Fi network scanning. The free version provides core protection, while paid plans add ransomware shield, firewall, and VPN. Now merged with Norton (Gen Digital).", category: "free", tags: ["avast", "free antivirus", "malware protection", "web shield", "wifi scanner", "gen digital"], url: "https://www.avast.com", pricing: "freemium", featured: false, logo: "🟠", domain: "avast.com" },
  { slug: "malwarebytes", name: "Malwarebytes", tagline: "Malware removal and real-time protection known for catching what others miss", description: "Malwarebytes excels at detecting and removing malware that traditional antivirus misses. Its real-time protection uses multiple layers including behavior-based detection. Many security professionals use Malwarebytes as a second-opinion scanner alongside their primary antivirus.", category: "consumer", tags: ["malwarebytes", "malware removal", "second opinion", "behavior detection", "ransomware", "pup removal"], url: "https://www.malwarebytes.com", pricing: "freemium", featured: false, logo: "🔷", domain: "malwarebytes.com" },
  { slug: "eset-nod32", name: "ESET NOD32", tagline: "Lightweight antivirus with excellent detection and minimal resource usage", description: "ESET NOD32 is known for its extremely light system footprint while maintaining excellent detection rates. It uses advanced machine learning and cloud-based scanning. Popular with tech-savvy users who want protection without system slowdowns.", category: "consumer", tags: ["eset", "nod32", "lightweight", "machine learning", "low resource", "tech savvy"], url: "https://www.eset.com", pricing: "paid", featured: false, logo: "🟢", domain: "eset.com" },
  { slug: "trend-micro", name: "Trend Micro Maximum Security", tagline: "Security suite with excellent phishing protection and social media privacy", description: "Trend Micro Maximum Security provides strong antivirus with industry-leading anti-phishing detection, social media privacy scanning, and pay guard for safe online banking. Cross-platform support covers Windows, Mac, Android, iOS, and Chromebook.", category: "internet-security", tags: ["trend micro", "anti-phishing", "social media privacy", "pay guard", "cross-platform", "banking"], url: "https://www.trendmicro.com", pricing: "paid", featured: false, logo: "🔴", domain: "trendmicro.com" },
  { slug: "sophos-home", name: "Sophos Home", tagline: "Enterprise-grade antivirus protection made simple for home users", description: "Sophos Home brings enterprise-grade protection to consumers. It includes AI threat detection, ransomware protection, web filtering, and remote management. You can manage protection for all family members from a cloud dashboard. Powered by the same technology protecting 500,000+ businesses.", category: "consumer", tags: ["sophos", "enterprise-grade", "ai detection", "remote management", "family", "web filtering"], url: "https://home.sophos.com", pricing: "freemium", featured: false, logo: "🔵", domain: "home.sophos.com" },
  { slug: "avg", name: "AVG AntiVirus", tagline: "Free antivirus from the Avast/Norton family with solid basic protection", description: "AVG AntiVirus Free provides real-time security updates, scans for malware and performance issues, and catches malicious downloads before they reach your PC. Now part of Gen Digital (Norton/Avast), it shares the same detection engine as Avast with a different interface.", category: "free", tags: ["avg", "free antivirus", "gen digital", "real-time protection", "performance", "basic"], url: "https://www.avg.com", pricing: "freemium", featured: false, logo: "🟢", domain: "avg.com" },
  { slug: "lookout", name: "Lookout", tagline: "Mobile security platform for iOS and Android devices", description: "Lookout provides mobile threat defense for consumer and enterprise devices. It detects phishing, network threats, malicious apps, and device vulnerabilities. The platform is one of the most trusted mobile security solutions, protecting 200+ million devices.", category: "mobile", tags: ["lookout", "mobile security", "android", "ios", "phishing", "mobile threat defense"], url: "https://www.lookout.com", pricing: "freemium", featured: false, logo: "👁️", domain: "lookout.com" },
  { slug: "bitdefender-gravityzone", name: "Bitdefender GravityZone", tagline: "Enterprise endpoint protection platform with centralized cloud management", description: "GravityZone is Bitdefender's business endpoint protection platform. It provides a single console to manage security across physical, virtual, and cloud endpoints. Features include anti-malware, anti-exploit, content control, device control, and EDR capabilities.", category: "business", tags: ["bitdefender", "gravityzone", "enterprise", "endpoint protection", "edr", "centralized management"], url: "https://www.bitdefender.com/business/", pricing: "paid", featured: false, logo: "🔴", domain: "bitdefender.com" },
  { slug: "webroot", name: "Webroot", tagline: "Cloud-based antivirus that scans in seconds with tiny footprint", description: "Webroot is a cloud-based antivirus that installs in seconds, scans in under 20 seconds, and uses less than 15MB of disk space. Its cloud-first approach means threat definitions are always current without large update downloads. Now part of OpenText.", category: "consumer", tags: ["webroot", "cloud-based", "fast scan", "lightweight", "opentext", "small footprint"], url: "https://www.webroot.com", pricing: "paid", featured: false, logo: "🟢", domain: "webroot.com" },
  { slug: "norton-mobile", name: "Norton Mobile Security", tagline: "Top-rated mobile security for Android and iOS devices", description: "Norton Mobile Security provides app scanning, web protection, Wi-Fi security, and dark web monitoring for mobile devices. The Android version includes more features (app advisor, malware scan) while iOS focuses on web and network protection. Rated #1 for mobile security by multiple reviewers.", category: "mobile", tags: ["norton mobile", "mobile security", "android", "ios", "app scanning", "wifi security"], url: "https://us.norton.com/products/norton-mobile-security", pricing: "paid", featured: false, logo: "🟡", domain: "us.norton.com" },
];
