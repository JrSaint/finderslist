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
  { slug: "hashicorp-vault", name: "HashiCorp Vault", tagline: "Industry-standard secrets management for cloud infrastructure and DevOps", description: "HashiCorp Vault is the industry standard for managing secrets, encryption keys, and sensitive data in cloud infrastructure. It provides dynamic secrets, encryption as a service, identity-based access, and detailed audit logging. Used by thousands of companies managing infrastructure secrets at scale.", category: "secrets-management", tags: ["hashicorp vault", "secrets management", "devops", "cloud infrastructure", "dynamic secrets", "encryption"], url: "https://www.vaultproject.io", pricing: "freemium", featured: false, logo: "🔐", domain: "vaultproject.io" },
  { slug: "cyberark", name: "CyberArk", tagline: "Enterprise privileged access management and identity security leader", description: "CyberArk is the market leader in privileged access management (PAM), protecting the most critical credentials in enterprise environments. It secures privileged accounts, SSH keys, API keys, and service account credentials. CyberArk serves 8,000+ customers including over half the Fortune 500.", category: "identity-access", tags: ["cyberark", "pam", "privileged access", "identity security", "enterprise", "fortune 500"], url: "https://www.cyberark.com", pricing: "paid", featured: false, logo: "🏛️", domain: "cyberark.com" },
  { slug: "okta", name: "Okta", tagline: "The leading cloud identity and access management platform", description: "Okta is the leading identity-as-a-service platform providing SSO, MFA, lifecycle management, and API access management. While not a traditional password manager, it eliminates passwords through single sign-on and provides centralized identity governance for enterprises.", category: "enterprise-sso", tags: ["okta", "sso", "identity management", "mfa", "lifecycle", "zero trust"], url: "https://www.okta.com", pricing: "paid", featured: false, logo: "🔵", domain: "okta.com" },
  { slug: "nordpass-business", name: "NordPass", tagline: "Business password manager from the makers of NordVPN", description: "NordPass Business, from Nord Security, offers password management with a focus on simplicity and security. It features zero-knowledge architecture, XChaCha20 encryption, dark web monitoring, and SSO integration. Competitive pricing makes it attractive for small and mid-market businesses.", category: "individual-business", tags: ["nordpass", "nord security", "password manager", "xchacha20", "business", "affordable"], url: "https://nordpass.com/business/", pricing: "paid", featured: false, logo: "🟢", domain: "nordpass.com" },
  { slug: "doppler", name: "Doppler", tagline: "Universal secrets manager for development teams and CI/CD pipelines", description: "Doppler is a modern secrets management platform purpose-built for development teams. It syncs secrets across environments, CI/CD pipelines, and cloud platforms with a clean dashboard and CLI. Doppler replaces scattered .env files with a centralized, audited secrets platform.", category: "secrets-management", tags: ["doppler", "secrets management", "env variables", "ci/cd", "developer tools", "sync"], url: "https://www.doppler.com", pricing: "freemium", featured: false, logo: "🌀", domain: "doppler.com" },
  { slug: "1password-cli", name: "1Password CLI & Connect", tagline: "Secrets automation for CI/CD and infrastructure using 1Password", description: "1Password's CLI and Connect server extend password management to infrastructure automation. Teams can reference secrets in scripts, CI/CD pipelines, and Kubernetes without hardcoding credentials. Connect provides a REST API for self-hosted secret retrieval.", category: "secrets-management", tags: ["1password cli", "connect", "ci/cd secrets", "kubernetes", "automation", "rest api"], url: "https://developer.1password.com", pricing: "paid", featured: false, logo: "🔧", domain: "developer.1password.com" },
  { slug: "beyondtrust", name: "BeyondTrust", tagline: "Privileged access management and remote access security platform", description: "BeyondTrust provides privileged access management, privileged remote access, and endpoint privilege management. It's used by large enterprises and government agencies to secure privileged credentials and enforce least-privilege access across the organization.", category: "identity-access", tags: ["beyondtrust", "pam", "remote access", "endpoint privilege", "enterprise", "least privilege"], url: "https://www.beyondtrust.com", pricing: "paid", featured: false, logo: "🛡️", domain: "beyondtrust.com" },
  { slug: "passbolt", name: "Passbolt", tagline: "Open-source password manager designed for teams and DevOps collaboration", description: "Passbolt is an open-source, self-hosted password manager designed specifically for teams. It features end-to-end encryption, browser extensions, CLI tools, and API access. The open-source nature and self-hosting make it ideal for security-conscious organizations wanting full control.", category: "individual-business", tags: ["passbolt", "open source", "self-hosted", "team password manager", "devops", "api"], url: "https://www.passbolt.com", pricing: "freemium", featured: false, logo: "🔓", domain: "passbolt.com" },
  { slug: "enpass", name: "Enpass", tagline: "Offline-first password manager with cloud sync via your own storage", description: "Enpass is a unique password manager that stores your vault locally and syncs via your existing cloud storage (iCloud, Dropbox, Google Drive, OneDrive). This eliminates the risk of server-side breaches since Enpass never stores your data. Business plans add admin controls and user management.", category: "individual-business", tags: ["enpass", "offline", "local storage", "cloud sync", "privacy", "business"], url: "https://www.enpass.io", pricing: "paid", featured: false, logo: "📱", domain: "enpass.io" },
  { slug: "delinea", name: "Delinea", tagline: "PAM solutions for securing privileged access across the enterprise", description: "Delinea (formerly Thycotic + Centrify) provides privileged access management solutions including Secret Server for credential vaulting and Server PAM for Linux/Unix access control. The platform serves mid-market and enterprise customers needing comprehensive privileged access governance.", category: "identity-access", tags: ["delinea", "thycotic", "centrify", "pam", "secret server", "privilege governance"], url: "https://delinea.com", pricing: "paid", featured: false, logo: "🏢", domain: "delinea.com" },
];
