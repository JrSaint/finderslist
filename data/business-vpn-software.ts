export type BusinessVPNCategory = "ztna" | "traditional-vpn" | "sase" | "remote-access" | "site-to-site";

export interface BusinessVPNTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: BusinessVPNCategory;
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

export const BUSINESS_VPN_CATEGORIES: Record<BusinessVPNCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "ztna": { label: "Zero Trust Network Access", emoji: "🔐", description: "Modern ZTNA solutions that verify every user and device before granting access.", gradient: "from-violet-600/30 to-indigo-800/40" },
  "traditional-vpn": { label: "Traditional Business VPN", emoji: "🛡️", description: "Classic VPN solutions for secure remote connectivity to corporate networks.", gradient: "from-blue-600/30 to-slate-800/40" },
  "sase": { label: "SASE Platforms", emoji: "☁️", description: "Secure Access Service Edge combining networking and security in the cloud.", gradient: "from-cyan-600/30 to-blue-800/40" },
  "remote-access": { label: "Remote Access", emoji: "💻", description: "Solutions for secure remote desktop and application access for distributed teams.", gradient: "from-green-600/30 to-emerald-800/40" },
  "site-to-site": { label: "Site-to-Site VPN", emoji: "🌐", description: "VPN solutions connecting multiple office locations and data centers securely.", gradient: "from-orange-600/30 to-red-800/40" },
};

export const BUSINESS_VPN_TOOLS: BusinessVPNTool[] = [
  {
    slug: "cloudflare-zero-trust",
    name: "Cloudflare Zero Trust",
    tagline: "Replace your VPN with Cloudflare's Zero Trust network access platform",
    description: "Cloudflare Zero Trust (formerly Cloudflare for Teams) replaces traditional VPNs with a modern Zero Trust approach. Every request is verified based on identity, device posture, and context — no implicit trust from being 'on the network.' It includes Access (ZTNA), Gateway (DNS/HTTP filtering), Browser Isolation, and CASB. Built on Cloudflare's global edge network (300+ cities), it's one of the fastest ZTNA solutions available. The free tier supports up to 50 users, making it accessible to small businesses.",
    category: "ztna",
    tags: ["cloudflare", "zero trust", "ztna", "dns filtering", "browser isolation", "free tier"],
    url: "https://www.cloudflare.com/zero-trust/",
    pricing: "freemium",
    featured: true,
    logo: "🔶",
    domain: "cloudflare.com",
    pros: ["Free tier supports up to 50 users — exceptional for small teams", "Built on Cloudflare's global network for minimal latency", "Comprehensive platform: ZTNA, DNS filtering, browser isolation, CASB", "No hardware or appliances to manage — fully cloud-delivered", "Device posture checks ensure only compliant devices connect"],
    cons: ["Advanced features like browser isolation require paid tiers", "Configuration complexity can be steep for non-technical admins", "Ecosystem lock-in with Cloudflare's other services", "Logging and analytics are limited on the free tier"],
    useCases: ["Replacing legacy VPN with modern Zero Trust access for remote teams", "Securing SaaS application access with identity-based policies", "Small businesses needing enterprise-grade security on a free tier"],
  },
  {
    slug: "zscaler",
    name: "Zscaler",
    tagline: "The world's largest cloud security platform for Zero Trust transformation",
    description: "Zscaler is the market leader in cloud-delivered security, processing 400+ billion transactions daily. Zscaler Private Access (ZPA) replaces VPNs with application-level Zero Trust access — users connect to specific apps, never the network. Zscaler Internet Access (ZIA) provides secure web gateway, CASB, and DLP. Used by 40% of the Fortune 500, Zscaler is the enterprise standard for Zero Trust transformation. It's designed for the largest, most complex environments.",
    category: "sase",
    tags: ["zscaler", "sase", "zero trust", "cloud security", "enterprise", "fortune 500"],
    url: "https://www.zscaler.com",
    pricing: "paid",
    featured: true,
    logo: "🔵",
    domain: "zscaler.com",
    pros: ["Market leader processing 400B+ daily transactions", "True Zero Trust — users never touch the network, only specific apps", "Used by 40% of the Fortune 500 with proven scale", "Comprehensive SASE: SWG, CASB, DLP, and ZTNA in one platform", "150+ global data centers for low-latency access worldwide"],
    cons: ["Enterprise pricing — expensive for small and mid-market companies", "Complex deployment requiring professional services", "Long sales cycles and contract negotiations", "Can introduce latency for real-time applications"],
    useCases: ["Enterprise Zero Trust transformation replacing legacy VPN infrastructure", "Securing cloud application access for 10,000+ employee organizations", "Implementing comprehensive SASE architecture for global operations"],
  },
  {
    slug: "nordlayer",
    name: "NordLayer",
    tagline: "Business VPN and network access security from the makers of NordVPN",
    description: "NordLayer (from Nord Security, makers of NordVPN) provides business-grade VPN and Zero Trust network access in an easy-to-deploy package. It offers dedicated servers, site-to-site connectivity, device posture checks, and smart remote access. NordLayer stands out for its quick setup — most teams are running in under 10 minutes. Pricing starts at $8/user/month, making it accessible to SMBs. It bridges the gap between consumer VPNs and enterprise ZTNA platforms.",
    category: "traditional-vpn",
    tags: ["nordlayer", "business vpn", "nord security", "remote access", "smb", "quick setup"],
    url: "https://nordlayer.com",
    affiliateUrl: "https://nordlayer.com",
    pricing: "paid",
    featured: true,
    logo: "🟢",
    domain: "nordlayer.com",
    pros: ["Deploys in under 10 minutes with minimal IT expertise needed", "Affordable pricing starting at $8/user/month", "Combines traditional VPN with modern Zero Trust features", "30+ global server locations for fast connections", "Backed by Nord Security's proven security infrastructure"],
    cons: ["Less feature-rich than enterprise ZTNA platforms like Zscaler", "Limited advanced policy controls compared to Cloudflare Zero Trust", "Some users report speed reduction on distant server locations", "No free tier — only 14-day trial available"],
    useCases: ["SMBs needing business VPN without complex enterprise deployment", "Remote teams requiring quick, easy-to-use secure connectivity", "Companies transitioning from consumer VPN to proper business solution"],
  },
  {
    slug: "perimeter-81",
    name: "Perimeter 81",
    tagline: "Cloud-based network security platform with ZTNA and secure web gateway",
    description: "Perimeter 81 provides cloud-delivered network security combining ZTNA, firewall as a service, secure web gateway, and device posture management. Acquired by Check Point in 2023, it offers a user-friendly interface that simplifies network security for mid-market companies. The platform is known for its clean admin console and straightforward deployment.",
    category: "ztna",
    tags: ["perimeter 81", "check point", "ztna", "firewall as a service", "secure web gateway", "mid-market"],
    url: "https://www.perimeter81.com",
    pricing: "paid",
    featured: true,
    logo: "🟣",
    domain: "perimeter81.com",
    pros: ["Clean, intuitive admin console — easy for non-specialists", "Quick deployment with agent-based and agentless access options", "Now backed by Check Point's enterprise security expertise", "Combines ZTNA with FWaaS and SWG in one platform", "Good balance of features and usability for mid-market"],
    cons: ["Pricing has increased since Check Point acquisition", "Some features are still being integrated with Check Point ecosystem", "Fewer global PoPs compared to Zscaler or Cloudflare", "Customer support quality has varied during transition period"],
    useCases: ["Mid-market companies implementing Zero Trust without enterprise complexity", "IT teams wanting a unified network security platform with easy management", "Organizations migrating from traditional VPN to cloud-delivered security"],
  },
  { slug: "cisco-anyconnect", name: "Cisco Secure Client", tagline: "Enterprise VPN and endpoint security from the networking leader", description: "Cisco Secure Client (formerly AnyConnect) is one of the most widely deployed enterprise VPN solutions globally. It provides SSL/IPSec VPN connectivity, endpoint compliance, network visibility, and web security. Deeply integrated with Cisco's networking infrastructure and security portfolio.", category: "traditional-vpn", tags: ["cisco", "anyconnect", "enterprise vpn", "ssl vpn", "endpoint security", "networking"], url: "https://www.cisco.com/site/us/en/products/security/secure-client/index.html", pricing: "paid", featured: false, logo: "🔷", domain: "cisco.com" },
  { slug: "palo-alto-prisma", name: "Palo Alto Prisma Access", tagline: "Cloud-delivered SASE platform from the cybersecurity leader", description: "Prisma Access is Palo Alto Networks' SASE platform providing ZTNA, cloud SWG, FWaaS, and SD-WAN in a unified service. It leverages Palo Alto's industry-leading threat intelligence and ML-powered security. Designed for large enterprises with complex security requirements.", category: "sase", tags: ["palo alto", "prisma access", "sase", "ztna", "enterprise", "threat intelligence"], url: "https://www.paloaltonetworks.com/prisma/access", pricing: "paid", featured: false, logo: "🔴", domain: "paloaltonetworks.com" },
  { slug: "tailscale", name: "Tailscale", tagline: "Zero-config mesh VPN built on WireGuard that just works", description: "Tailscale creates a WireGuard-based mesh VPN that connects all your devices and servers with zero configuration. No port forwarding, no firewall rules, no complex setup — it just works. The mesh architecture means devices connect directly to each other for optimal performance. Free for personal use with up to 100 devices.", category: "remote-access", tags: ["tailscale", "wireguard", "mesh vpn", "zero config", "peer to peer", "developer friendly"], url: "https://tailscale.com", pricing: "freemium", featured: false, logo: "🌀", domain: "tailscale.com" },
  { slug: "twingate", name: "Twingate", tagline: "Modern Zero Trust replacement for legacy VPNs with no infrastructure changes", description: "Twingate provides Zero Trust network access that replaces VPNs without requiring infrastructure changes. It works alongside existing firewalls and NATs, making migration from legacy VPN seamless. Split tunneling is granular to the resource level, and the client is lightweight and invisible to end users.", category: "ztna", tags: ["twingate", "zero trust", "vpn replacement", "split tunneling", "lightweight", "seamless migration"], url: "https://www.twingate.com", pricing: "freemium", featured: false, logo: "🔗", domain: "twingate.com" },
  { slug: "fortinet-forticlient", name: "Fortinet FortiClient", tagline: "Endpoint security and VPN from the unified threat management leader", description: "FortiClient provides VPN connectivity, endpoint protection, and vulnerability scanning as part of Fortinet's Security Fabric. It integrates tightly with FortiGate firewalls for automated threat response. For organizations already in the Fortinet ecosystem, it provides seamless, unified security.", category: "traditional-vpn", tags: ["fortinet", "forticlient", "vpn", "endpoint protection", "fortigate", "utm"], url: "https://www.fortinet.com/products/endpoint-security/forticlient", pricing: "freemium", featured: false, logo: "🛡️", domain: "fortinet.com" },
  { slug: "openvpn-cloud", name: "OpenVPN Cloud", tagline: "Cloud-delivered VPN-as-a-service from the creators of OpenVPN", description: "OpenVPN Cloud (CloudConomy) provides VPN-as-a-service using the trusted OpenVPN protocol. It eliminates the need to manage VPN servers while providing site-to-site and remote access connectivity. Free tier includes 3 connections, and the platform supports full-mesh networking.", category: "site-to-site", tags: ["openvpn", "vpn as a service", "open source protocol", "site to site", "cloud vpn", "free tier"], url: "https://openvpn.net/cloud-vpn/", pricing: "freemium", featured: false, logo: "🔓", domain: "openvpn.net" },
  { slug: "wireguard", name: "WireGuard", tagline: "Modern, ultra-fast VPN protocol used as the foundation for many business solutions", description: "WireGuard is an open-source VPN protocol known for its simplicity, speed, and strong cryptography. With just 4,000 lines of code (vs. 100,000+ for OpenVPN), it has a smaller attack surface and is easier to audit. Many modern VPN products (Tailscale, NordLayer, etc.) are built on WireGuard.", category: "site-to-site", tags: ["wireguard", "vpn protocol", "open source", "fast", "cryptography", "lightweight"], url: "https://www.wireguard.com", pricing: "free", featured: false, logo: "🔒", domain: "wireguard.com" },
  { slug: "netskope", name: "Netskope", tagline: "Intelligent SASE platform for data-centric security", description: "Netskope provides a comprehensive SASE platform with a focus on data protection. It offers ZTNA, CASB, SWG, DLP, and digital experience management. Netskope is known for its deep inline inspection and granular policy controls for cloud application usage.", category: "sase", tags: ["netskope", "sase", "casb", "dlp", "data protection", "cloud security"], url: "https://www.netskope.com", pricing: "paid", featured: false, logo: "☁️", domain: "netskope.com" },
  { slug: "absolute-secure-access", name: "Absolute Secure Access", tagline: "Resilient Zero Trust network access with self-healing capabilities", description: "Absolute Secure Access provides ZTNA with unique self-healing endpoint technology. If the agent is tampered with or removed, it automatically reinstalls itself — ensuring persistent secure connectivity. Particularly valuable for managed devices in regulated industries.", category: "remote-access", tags: ["absolute", "ztna", "self-healing", "resilient", "endpoint", "regulated"], url: "https://www.absolute.com/solutions/secure-access/", pricing: "paid", featured: false, logo: "🔄", domain: "absolute.com" },
  { slug: "check-point-harmony", name: "Check Point Harmony Connect", tagline: "Secure internet and remote access from the firewall pioneer", description: "Harmony Connect provides cloud-delivered network security including remote access VPN, SWG, and ZTNA. As part of Check Point's comprehensive security architecture, it benefits from ThreatCloud threat intelligence analyzing 2 billion transactions daily.", category: "remote-access", tags: ["check point", "harmony connect", "remote access", "threat intelligence", "swg", "vpn"], url: "https://www.checkpoint.com/harmony/connect-sase/", pricing: "paid", featured: false, logo: "🟡", domain: "checkpoint.com" },
];
