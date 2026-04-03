export type PasswordManagerCategory = "team-management" | "enterprise-sso" | "secrets-management" | "identity-access" | "individual-business";

export interface PasswordManagerTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: PasswordManagerCategory;
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

export const PASSWORD_MANAGER_CATEGORIES: Record<PasswordManagerCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "team-management": { label: "Team Password Sharing", emoji: "👥", description: "Password managers built for teams with shared vaults, permissions, and auditing.", gradient: "from-slate-600/30 to-zinc-800/40" },
  "enterprise-sso": { label: "Enterprise SSO & IAM", emoji: "🔐", description: "Enterprise-grade single sign-on and identity management platforms.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "secrets-management": { label: "Secrets Management", emoji: "🔑", description: "Tools for managing API keys, tokens, and infrastructure secrets for DevOps.", gradient: "from-purple-600/30 to-violet-800/40" },
  "identity-access": { label: "Identity & Access", emoji: "🛡️", description: "Identity governance and privileged access management platforms.", gradient: "from-red-600/30 to-rose-800/40" },
  "individual-business": { label: "Individual & Small Biz", emoji: "💼", description: "Password managers for freelancers, solopreneurs, and small teams.", gradient: "from-green-600/30 to-emerald-800/40" },
};

export const PASSWORD_MANAGER_EDITORIAL = {
  title: "How to Choose the Right Business Password Manager in 2026",
  intro: `Password managers are the single most impactful security tool a business can deploy. Over 80% of data breaches involve compromised credentials, and employees reusing passwords across personal and work accounts is the primary attack vector. A business password manager eliminates this risk by generating unique, strong passwords for every account and sharing them securely across teams without anyone needing to know the actual passwords.\n\nBusiness password managers go beyond individual vaults — they provide shared team vaults with role-based permissions, admin dashboards showing password health across the organization, and audit logs for compliance. Enterprise tiers add Single Sign-On (SSO), SCIM provisioning, and integration with identity providers like Okta and Azure AD. For DevOps teams, secrets management features protect API keys, tokens, and infrastructure credentials.\n\nAdoption is the biggest challenge. The most secure password manager is useless if employees don't use it. Prioritize tools with excellent browser extensions, mobile apps, and autofill that work reliably — 1Password and Bitwarden consistently rank highest for user experience. Budget $3-8 per user per month for team plans, or $5-12+ for enterprise features.`,
  buyerGuide: [
    "User experience across platforms — the tool must work seamlessly in browsers, on mobile, and across operating systems; poor autofill or clunky interfaces lead to employees bypassing the manager entirely.",
    "Admin controls and reporting — evaluate shared vault management, role-based access, the ability to revoke access instantly when employees leave, and security dashboards showing weak or reused passwords.",
    "SSO and directory integration — enterprise teams need SAML SSO, SCIM user provisioning, and integration with identity providers like Okta, Azure AD, or Google Workspace to automate onboarding and offboarding.",
    "Security architecture — look for zero-knowledge encryption (the vendor can't access your passwords), SOC 2 Type II certification, regular third-party security audits, and transparent incident response history.",
    "Emergency access and account recovery — understand what happens if an admin loses their master password or leaves the company; business-grade tools should have recovery mechanisms that don't compromise security.",
  ],
  faq: [
    {
      question: "Is it safe to store all passwords in one place?",
      answer: "Yes, using a reputable password manager is significantly safer than the alternative — reusing passwords or storing them in spreadsheets, sticky notes, or browsers. Password managers use AES-256 encryption with zero-knowledge architecture, meaning even the vendor can't access your data. The real risk is not using one.",
    },
    {
      question: "What happens if the password manager gets hacked?",
      answer: "Reputable password managers encrypt your vault with a key derived from your master password that they never store. Even if their servers are breached, attackers get encrypted data they can't read without your master password. The 2022 LastPass breach highlighted the importance of strong master passwords and choosing vendors with robust security architectures.",
    },
    {
      question: "How do I migrate from one password manager to another?",
      answer: "Most password managers support CSV import/export and direct migration from competing products. The typical migration process involves exporting from the old tool, importing to the new one, verifying the data transferred correctly, and then deleting the old account. For businesses, plan a phased rollout team by team rather than switching everyone at once.",
    },
  ],
};

export const PASSWORD_MANAGER_TOOLS: PasswordManagerTool[] = [
  {
    slug: "1password-business",
    name: "1Password",
    tagline: "The most trusted password manager for teams and businesses",
    description: "1Password is the gold standard for business password management, trusted by 150,000+ businesses including IBM, Slack, and GitLab. It combines secure password vaults with Single Sign-On, device trust, and developer secrets management. The Watchtower feature alerts on compromised passwords, weak credentials, and unsecured websites. Custom roles, granular permissions, and detailed activity logs provide full admin control. The user experience is best-in-class across all platforms — employees actually enjoy using it, which is rare for security tools.",
    category: "team-management",
    tags: ["1password", "password manager", "team security", "sso", "watchtower", "business"],
    url: "https://1password.com",
    affiliateUrl: "https://1password.com",
    pricing: "paid",
    featured: true,
    logo: "🔒",
    domain: "1password.com",
    pros: ["Best-in-class user experience across all platforms and browsers", "Watchtower monitors for breached, weak, and reused passwords", "Developer-focused features including SSH key management and CLI", "Excellent admin controls with custom roles and activity logs", "Trusted by 150,000+ businesses with strong security track record"],
    cons: ["No free tier — only 14-day trial for business plans", "Pricing per user can add up for larger organizations ($7.99/user/mo)", "No self-hosting option — cloud-only architecture", "Advanced features like SCIM provisioning require Business plan"],
    useCases: ["Centralizing team credential management with shared vaults and permissions", "Onboarding and offboarding employees securely with admin controls", "Managing developer secrets, SSH keys, and API tokens alongside passwords"],
  },
  {
    slug: "bitwarden",
    name: "Bitwarden",
    tagline: "Open-source password manager with the best free tier and self-hosting",
    description: "Bitwarden is the leading open-source password manager, offering a generous free tier and self-hosting capability. For businesses, it provides shared vaults, user groups, directory integration, event logs, and policy enforcement. Being open-source means the code is audited regularly and security researchers can verify claims. Bitwarden's business plans start at just $4/user/month — significantly cheaper than 1Password. The trade-off is a slightly less polished UI, but functionality is comprehensive.",
    category: "team-management",
    tags: ["bitwarden", "open source", "self-hosted", "free password manager", "business", "audited"],
    url: "https://bitwarden.com",
    affiliateUrl: "https://bitwarden.com",
    pricing: "freemium",
    featured: true,
    logo: "🛡️",
    domain: "bitwarden.com",
    pros: ["Open-source with regular third-party security audits", "Self-hosting option for complete data sovereignty", "Most affordable business plan at $4/user/month", "Generous free tier for individuals", "Cross-platform with browser extensions, desktop, and mobile apps"],
    cons: ["User interface is less polished than 1Password", "Auto-fill can be inconsistent on some websites", "Self-hosting requires technical expertise to maintain", "Enterprise features like SSO require the most expensive tier"],
    useCases: ["Organizations requiring open-source and self-hosted security tools", "Budget-conscious teams needing full-featured password management", "Security-focused companies wanting auditable, transparent code"],
  },
  {
    slug: "dashlane-business",
    name: "Dashlane",
    tagline: "Business password manager with built-in VPN and dark web monitoring",
    description: "Dashlane combines password management with additional security features like dark web monitoring and a built-in VPN. For businesses, it provides admin console, group sharing, SSO integration, and detailed security scores for the organization. Dashlane's Password Health score gamifies security improvement, and the Phishing Alerts feature warns when employees visit suspected phishing sites. Pricing is competitive for mid-market companies.",
    category: "team-management",
    tags: ["dashlane", "dark web monitoring", "vpn", "phishing alerts", "password health", "business"],
    url: "https://www.dashlane.com",
    affiliateUrl: "https://www.dashlane.com",
    pricing: "paid",
    featured: true,
    logo: "🔷",
    domain: "dashlane.com",
    pros: ["Built-in dark web monitoring scans for compromised credentials", "Password Health score gamifies improving security hygiene", "Phishing Alerts warn employees about suspicious websites", "Includes VPN for added security on public networks", "Clean, intuitive interface with minimal learning curve"],
    cons: ["More expensive than Bitwarden and comparable to 1Password", "VPN feature adds cost but many businesses already have one", "No self-hosting option available", "Limited browser extension on some less common browsers"],
    useCases: ["Mid-market companies wanting password management with extra security layers", "Teams needing dark web monitoring for credential breach detection", "Organizations wanting to improve password hygiene through gamification"],
  },
  {
    slug: "keeper-business",
    name: "Keeper",
    tagline: "Enterprise password and secrets manager with zero-knowledge architecture",
    description: "Keeper is a zero-knowledge password management platform popular with highly regulated industries. It offers dark web monitoring (BreachWatch), secrets management, privileged access management, and compliance reporting. Keeper meets FedRAMP, SOC 2, ISO 27001, and HIPAA requirements. The platform is particularly strong for organizations needing granular role-based access and detailed audit trails.",
    category: "enterprise-sso",
    tags: ["keeper", "zero knowledge", "compliance", "fedramp", "privileged access", "enterprise"],
    url: "https://www.keepersecurity.com",
    affiliateUrl: "https://www.keepersecurity.com",
    pricing: "paid",
    featured: true,
    logo: "🏰",
    domain: "keepersecurity.com",
    pros: ["Zero-knowledge architecture — Keeper can never access your data", "FedRAMP authorized for government and defense contractors", "BreachWatch dark web monitoring included in business plans", "Granular role-based access with detailed audit trails", "Privileged access management (PAM) add-on for IT teams"],
    cons: ["Each add-on (BreachWatch, PAM, etc.) increases total cost", "Interface can feel dated compared to 1Password", "Setup and configuration is more complex than simpler alternatives", "Customer support response times can vary"],
    useCases: ["Government contractors requiring FedRAMP-authorized password management", "Healthcare organizations needing HIPAA-compliant credential storage", "Enterprises requiring privileged access management alongside passwords"],
  },
  {
    slug: "lastpass-business",
    name: "LastPass",
    tagline: "Widely adopted password manager rebuilding trust after major breaches",
    description: "LastPass remains one of the most widely deployed password managers with over 100,000 business customers. It offers SSO, MFA, dark web monitoring, and admin controls. However, significant security breaches in 2022-2023 damaged trust — encrypted vault data was stolen, leading many organizations to migrate away. LastPass has since invested heavily in security improvements, but the incident remains a consideration for security-conscious organizations.",
    category: "team-management",
    tags: ["lastpass", "password manager", "sso", "mfa", "business", "widely adopted"],
    url: "https://www.lastpass.com",
    pricing: "paid",
    featured: false,
    logo: "🔴",
    domain: "lastpass.com",
    pros: ["Massive installed base — familiar to many employees", "Comprehensive feature set with SSO, MFA, and dark web monitoring", "Admin console with detailed policies and reporting", "Directory integration with AD, Azure AD, and Okta", "Competitive pricing for the feature set"],
    cons: ["Major 2022-2023 security breaches significantly damaged trust", "Some encrypted vault data was exfiltrated in the breach", "Many security professionals now recommend alternatives", "Free tier was significantly restricted"],
    useCases: ["Organizations already deployed on LastPass evaluating whether to stay", "Companies needing a feature-rich, affordable password manager", "Teams requiring directory integration with existing identity providers"],
  },
  { slug: "hashicorp-vault", name: "HashiCorp Vault", tagline: "Industry-standard secrets management for cloud infrastructure and DevOps", description: "HashiCorp Vault is the industry standard for managing secrets, encryption keys, and sensitive data in cloud infrastructure. It provides dynamic secrets, encryption as a service, identity-based access, and detailed audit logging. Used by thousands of companies managing infrastructure secrets at scale.", category: "secrets-management", tags: ["hashicorp vault", "secrets management", "devops", "cloud infrastructure", "dynamic secrets", "encryption"], url: "https://www.vaultproject.io", pricing: "freemium", featured: false, logo: "🔐", domain: "vaultproject.io", pros: ["Industry standard for infrastructure secrets management", "Dynamic secrets auto-rotate and expire, eliminating stale credentials", "Encryption as a service without managing cryptographic operations directly", "Identity-based access integrates with all major identity providers", "Open-source core with enterprise features available"], cons: ["Steep learning curve — requires significant DevOps expertise", "Self-hosted management adds operational overhead", "Enterprise features require paid HashiCorp Cloud Platform", "Complex HA setup needed for production reliability"], useCases: ["DevOps team managing database credentials that rotate automatically every 24 hours", "Cloud infrastructure team centralizing secrets across AWS, GCP, and Azure", "Security team providing encryption as a service for application developers"] },
  { slug: "cyberark", name: "CyberArk", tagline: "Enterprise privileged access management and identity security leader", description: "CyberArk is the market leader in privileged access management (PAM), protecting the most critical credentials in enterprise environments. It secures privileged accounts, SSH keys, API keys, and service account credentials. CyberArk serves 8,000+ customers including over half the Fortune 500.", category: "identity-access", tags: ["cyberark", "pam", "privileged access", "identity security", "enterprise", "fortune 500"], url: "https://www.cyberark.com", pricing: "paid", featured: false, logo: "🏛️", domain: "cyberark.com", pros: ["Market leader in PAM trusted by over half the Fortune 500", "Comprehensive privileged account vaulting with session recording", "Automated credential rotation for service accounts and SSH keys", "Threat analytics detect anomalous privileged access behavior", "Extensive compliance reporting for SOX, PCI-DSS, and HIPAA"], cons: ["Enterprise pricing puts it out of reach for small businesses", "Complex deployment requires dedicated security personnel", "Implementation can take months for large environments", "User interface has a steeper learning curve than modern alternatives"], useCases: ["Enterprise securing 10,000+ privileged accounts across hybrid infrastructure", "Financial institution meeting SOX compliance for privileged access controls", "IT team recording and auditing all privileged sessions on critical servers"] },
  { slug: "okta", name: "Okta", tagline: "The leading cloud identity and access management platform", description: "Okta is the leading identity-as-a-service platform providing SSO, MFA, lifecycle management, and API access management. While not a traditional password manager, it eliminates passwords through single sign-on and provides centralized identity governance for enterprises.", category: "enterprise-sso", tags: ["okta", "sso", "identity management", "mfa", "lifecycle", "zero trust"], url: "https://www.okta.com", pricing: "paid", featured: false, logo: "🔵", domain: "okta.com", pros: ["Market leader in cloud identity with 7,000+ pre-built SSO integrations", "Eliminates password sprawl through centralized single sign-on", "Adaptive MFA adds security without frustrating users with excessive prompts", "Lifecycle management automates provisioning and deprovisioning", "Universal Directory unifies identities across cloud and on-premise systems"], cons: ["Enterprise pricing — per-user costs add up for large organizations", "Complexity requires dedicated identity management expertise", "2022 security incident raised questions about vendor trust", "Not a password manager — complements but doesn't replace one for non-SSO apps"], useCases: ["Enterprise deploying SSO across 200+ SaaS applications for 5,000 employees", "IT team automating user provisioning and deprovisioning tied to HR system events", "Organization implementing adaptive MFA that adjusts authentication based on risk signals"] },
  { slug: "nordpass-business", name: "NordPass", tagline: "Business password manager from the makers of NordVPN", description: "NordPass Business, from Nord Security, offers password management with a focus on simplicity and security. It features zero-knowledge architecture, XChaCha20 encryption, dark web monitoring, and SSO integration. Competitive pricing makes it attractive for small and mid-market businesses.", category: "individual-business", tags: ["nordpass", "nord security", "password manager", "xchacha20", "business", "affordable"], url: "https://nordpass.com/business/", pricing: "paid", featured: false, logo: "🟢", domain: "nordpass.com", pros: ["XChaCha20 encryption — considered more future-proof than AES-256", "Clean, simple interface with fast autofill across platforms", "Competitive business pricing starting well below 1Password", "Dark web monitoring scans for compromised credentials", "SSO integration available on business plans"], cons: ["Smaller market share means fewer enterprise case studies and resources", "Feature set is less comprehensive than 1Password or Keeper for business", "Admin dashboard is less mature than established business password managers", "Limited developer-focused features like secrets management"], useCases: ["Small business wanting affordable password management with modern encryption", "Team already using NordVPN wanting to stay within the Nord Security ecosystem", "Mid-market company deploying a simple password manager without enterprise complexity"] },
  { slug: "doppler", name: "Doppler", tagline: "Universal secrets manager for development teams and CI/CD pipelines", description: "Doppler is a modern secrets management platform purpose-built for development teams. It syncs secrets across environments, CI/CD pipelines, and cloud platforms with a clean dashboard and CLI. Doppler replaces scattered .env files with a centralized, audited secrets platform.", category: "secrets-management", tags: ["doppler", "secrets management", "env variables", "ci/cd", "developer tools", "sync"], url: "https://www.doppler.com", pricing: "freemium", featured: false, logo: "🌀", domain: "doppler.com", pros: ["Replaces scattered .env files with a single centralized secrets platform", "Syncs secrets across development, staging, and production environments", "Clean dashboard and CLI designed specifically for developer workflows", "Integrates with all major CI/CD tools, cloud platforms, and hosting providers", "Free tier available for small teams and personal projects"], cons: ["Focused on developer secrets — not a general-purpose password manager", "Requires team buy-in to replace existing .env file workflows", "Advanced features like RBAC require paid plans", "Smaller ecosystem than HashiCorp Vault for complex enterprise needs"], useCases: ["Development team replacing .env files with centralized, audited secrets management", "DevOps engineer syncing API keys across GitHub Actions, Vercel, and AWS", "Startup managing environment variables across 10+ microservices from one dashboard"] },
  { slug: "1password-cli", name: "1Password CLI & Connect", tagline: "Secrets automation for CI/CD and infrastructure using 1Password", description: "1Password's CLI and Connect server extend password management to infrastructure automation. Teams can reference secrets in scripts, CI/CD pipelines, and Kubernetes without hardcoding credentials. Connect provides a REST API for self-hosted secret retrieval.", category: "secrets-management", tags: ["1password cli", "connect", "ci/cd secrets", "kubernetes", "automation", "rest api"], url: "https://developer.1password.com", pricing: "paid", featured: false, logo: "🔧", domain: "developer.1password.com", pros: ["Extends 1Password's trusted vault to infrastructure and CI/CD workflows", "CLI references secrets without hardcoding them in scripts or configs", "Connect server provides self-hosted REST API for secret retrieval", "Kubernetes operator injects secrets directly into pods", "Unified platform — same vault for human passwords and machine secrets"], cons: ["Requires 1Password Business subscription — no standalone option", "Less flexible than HashiCorp Vault for complex infrastructure secrets", "Connect server requires self-hosting and maintenance", "Smaller ecosystem of integrations compared to dedicated secrets managers"], useCases: ["Team referencing 1Password vault secrets in GitHub Actions CI/CD pipelines", "DevOps engineer injecting database credentials into Kubernetes pods without hardcoding", "Developer using the CLI to load API keys into local development environments securely"] },
  { slug: "beyondtrust", name: "BeyondTrust", tagline: "Privileged access management and remote access security platform", description: "BeyondTrust provides privileged access management, privileged remote access, and endpoint privilege management. It's used by large enterprises and government agencies to secure privileged credentials and enforce least-privilege access across the organization.", category: "identity-access", tags: ["beyondtrust", "pam", "remote access", "endpoint privilege", "enterprise", "least privilege"], url: "https://www.beyondtrust.com", pricing: "paid", featured: false, logo: "🛡️", domain: "beyondtrust.com", pros: ["Comprehensive PAM covering passwords, remote access, and endpoint privileges", "Privileged remote access enables secure vendor and admin sessions", "Endpoint privilege management enforces least-privilege on workstations", "Used by government agencies with strict security requirements", "Session recording and monitoring for compliance and forensics"], cons: ["Enterprise pricing and complexity — not suited for small businesses", "Multiple products can make licensing and deployment complex", "Implementation requires dedicated security expertise", "User interface varies in polish across different product modules"], useCases: ["Government agency enforcing least-privilege access on all employee workstations", "Enterprise providing secure remote access to third-party vendors without VPN", "Security team recording and auditing all privileged admin sessions on production servers"] },
  { slug: "passbolt", name: "Passbolt", tagline: "Open-source password manager designed for teams and DevOps collaboration", description: "Passbolt is an open-source, self-hosted password manager designed specifically for teams. It features end-to-end encryption, browser extensions, CLI tools, and API access. The open-source nature and self-hosting make it ideal for security-conscious organizations wanting full control.", category: "individual-business", tags: ["passbolt", "open source", "self-hosted", "team password manager", "devops", "api"], url: "https://www.passbolt.com", pricing: "freemium", featured: false, logo: "🔓", domain: "passbolt.com", pros: ["Fully open-source with self-hosting for complete data sovereignty", "End-to-end encryption using OpenPGP standard", "API and CLI access for DevOps automation workflows", "Team-focused features including groups, sharing, and permissions", "Free Community Edition covers core password management needs"], cons: ["Self-hosting requires server administration expertise", "Browser extension-only — no native desktop or mobile apps on free tier", "Smaller community than Bitwarden for troubleshooting", "Enterprise features like LDAP integration require paid plans"], useCases: ["Security-conscious startup self-hosting team passwords on their own infrastructure", "DevOps team integrating password retrieval into deployment scripts via API", "Organization requiring open-source, auditable password management with full data control"] },
  { slug: "enpass", name: "Enpass", tagline: "Offline-first password manager with cloud sync via your own storage", description: "Enpass is a unique password manager that stores your vault locally and syncs via your existing cloud storage (iCloud, Dropbox, Google Drive, OneDrive). This eliminates the risk of server-side breaches since Enpass never stores your data. Business plans add admin controls and user management.", category: "individual-business", tags: ["enpass", "offline", "local storage", "cloud sync", "privacy", "business"], url: "https://www.enpass.io", pricing: "paid", featured: false, logo: "📱", domain: "enpass.io", pros: ["No server-side storage — vault data never touches Enpass servers", "Syncs via your own cloud storage (iCloud, Dropbox, Google Drive, OneDrive)", "One-time purchase option available — no mandatory subscription", "Cross-platform support including Linux", "Offline access with no internet dependency for vault access"], cons: ["Sync reliability depends on your chosen cloud storage service", "Business features are less developed than 1Password or Bitwarden", "Autofill can be less reliable than cloud-native competitors", "Smaller team and slower feature development cadence"], useCases: ["Privacy-focused user wanting a password manager that never stores data on third-party servers", "Team syncing vault data through their existing company Google Drive or OneDrive", "User preferring a one-time purchase over recurring subscription-based password management"] },
  { slug: "delinea", name: "Delinea", tagline: "PAM solutions for securing privileged access across the enterprise", description: "Delinea (formerly Thycotic + Centrify) provides privileged access management solutions including Secret Server for credential vaulting and Server PAM for Linux/Unix access control. The platform serves mid-market and enterprise customers needing comprehensive privileged access governance.", category: "identity-access", tags: ["delinea", "thycotic", "centrify", "pam", "secret server", "privilege governance"], url: "https://delinea.com", pricing: "paid", featured: false, logo: "🏢", domain: "delinea.com", pros: ["Secret Server provides robust credential vaulting with auto-rotation", "Server PAM controls Linux/Unix privileged access without agents", "Combined Thycotic and Centrify strengths after merger", "Cloud-native and on-premise deployment options available", "More accessible than CyberArk for mid-market organizations"], cons: ["Post-merger product integration is still ongoing", "Some overlap between legacy Thycotic and Centrify products", "Enterprise pricing requires sales engagement", "Smaller market share than CyberArk in the enterprise PAM space"], useCases: ["Mid-market company vaulting and auto-rotating privileged credentials with Secret Server", "Linux/Unix team controlling root access across 500 servers without deploying agents", "Enterprise implementing PAM that spans both Windows and Linux environments"] },
];
