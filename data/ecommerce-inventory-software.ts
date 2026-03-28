export type EcommerceInventoryCategory = "multichannel" | "warehouse" | "order-management" | "small-business" | "dropshipping";

export interface EcommerceInventoryTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: EcommerceInventoryCategory;
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

export const ECOMMERCE_INVENTORY_CATEGORIES: Record<EcommerceInventoryCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "multichannel": { label: "Multichannel Inventory", emoji: "🔗", description: "Sync inventory across Amazon, Shopify, eBay, Walmart, and other channels.", gradient: "from-teal-600/30 to-cyan-800/40" },
  "warehouse": { label: "Warehouse Management", emoji: "🏭", description: "Full WMS systems for barcode scanning, bin locations, and pick-pack-ship.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "order-management": { label: "Order Management", emoji: "📦", description: "Centralize orders from all channels with automated routing and fulfillment.", gradient: "from-orange-600/30 to-amber-800/40" },
  "small-business": { label: "Small Business Inventory", emoji: "🏪", description: "Simple, affordable inventory tracking for small shops and startups.", gradient: "from-green-600/30 to-emerald-800/40" },
  "dropshipping": { label: "Dropshipping & 3PL", emoji: "🚚", description: "Inventory tools designed for dropshippers and third-party logistics providers.", gradient: "from-purple-600/30 to-violet-800/40" },
};

export const ECOMMERCE_INVENTORY_TOOLS: EcommerceInventoryTool[] = [
  {
    slug: "cin7",
    name: "Cin7",
    tagline: "Complete inventory and order management for multichannel commerce",
    description: "Cin7 is one of the most comprehensive inventory management platforms for multichannel sellers. It connects inventory across Amazon, Shopify, eBay, WooCommerce, BigCommerce, and B2B channels in real time. Cin7 Core handles SMB needs while Cin7 Omni serves larger operations with advanced warehouse management, EDI, and 3PL integration. The platform automates purchase orders, demand forecasting, and stock transfers between warehouses.",
    category: "multichannel",
    tags: ["cin7", "inventory management", "multichannel", "order management", "warehouse", "ecommerce"],
    url: "https://www.cin7.com",
    affiliateUrl: "https://www.cin7.com",
    pricing: "paid",
    featured: true,
    logo: "📦",
    domain: "cin7.com",
    pros: ["Connects to virtually every major sales channel and marketplace", "Two tiers (Core and Omni) scale from SMB to enterprise", "Built-in EDI for retail compliance (Walmart, Target, etc.)", "Automated purchase orders and demand forecasting", "3PL integration for outsourced fulfillment"],
    cons: ["Complex setup — implementation can take weeks", "Pricing is high for smaller businesses ($349+/mo)", "User interface can feel dated and overwhelming", "Customer support response times vary"],
    useCases: ["Multichannel sellers syncing inventory across Amazon, Shopify, and eBay", "Wholesalers needing EDI compliance for major retailers", "Growing brands managing multiple warehouses and 3PL providers"],
  },
  {
    slug: "shopify-inventory",
    name: "Shopify Inventory",
    tagline: "Built-in inventory management for Shopify merchants",
    description: "Shopify's native inventory management handles stock tracking, multi-location inventory, transfer management, and low-stock alerts for Shopify merchants. While not as feature-rich as dedicated inventory tools, it covers the basics well and is included in every Shopify plan. For merchants selling primarily through Shopify, it eliminates the need for third-party tools. Advanced users can extend it with apps from the Shopify App Store.",
    category: "small-business",
    tags: ["shopify", "inventory tracking", "ecommerce", "multi-location", "stock alerts", "built-in"],
    url: "https://www.shopify.com/manage/inventory",
    pricing: "paid",
    featured: true,
    logo: "🟢",
    domain: "shopify.com",
    pros: ["Included free with every Shopify plan — no extra cost", "Multi-location inventory tracking built in", "Seamless integration with Shopify POS and online store", "Transfer management between locations", "Extensible via 1,000+ inventory apps on Shopify App Store"],
    cons: ["Limited features compared to dedicated inventory tools", "No native multichannel sync (Amazon, eBay) without apps", "Basic reporting — lacks advanced analytics and forecasting", "Not suitable for complex warehouse operations"],
    useCases: ["Shopify merchants with straightforward inventory needs", "Small businesses managing a few locations with Shopify POS", "Starting sellers who want basic tracking without extra software costs"],
  },
  {
    slug: "linnworks",
    name: "Linnworks",
    tagline: "Multichannel commerce platform for listing, inventory, and shipping",
    description: "Linnworks is a multichannel commerce management platform that centralizes listings, inventory, orders, and shipping across 100+ channels. It automates stock sync, order routing, and shipping label generation. Linnworks excels at high-volume operations — merchants processing thousands of orders daily rely on its bulk operations and automation rules. Recently acquired by Agilitas, the platform serves 4,000+ brands globally.",
    category: "multichannel",
    tags: ["linnworks", "multichannel", "listing management", "shipping", "automation", "high volume"],
    url: "https://www.linnworks.com",
    affiliateUrl: "https://www.linnworks.com",
    pricing: "paid",
    featured: true,
    logo: "🔄",
    domain: "linnworks.com",
    pros: ["100+ marketplace and channel integrations", "Powerful automation rules for order routing and inventory updates", "Bulk operations for high-volume merchants", "Integrated shipping with rate comparison", "Strong reporting and analytics dashboard"],
    cons: ["Pricing based on order volume — gets expensive at scale", "Setup and configuration can be complex", "UK-centric — some US-specific integrations are newer", "Learning curve is steep for the full feature set"],
    useCases: ["High-volume sellers processing 1,000+ orders daily across channels", "UK and EU merchants managing multichannel commerce", "Operations teams automating order routing and shipping workflows"],
  },
  {
    slug: "skuvault",
    name: "SKUVault",
    tagline: "Cloud warehouse management system designed for ecommerce operations",
    description: "SKUVault is a cloud-based WMS built specifically for ecommerce. It provides barcode scanning, bin-level inventory tracking, quality control workflows, and pick-pack-ship optimization. SKUVault focuses on warehouse accuracy — features like quantity check and hyper-picking reduce errors and speed up fulfillment. Integrates with Shopify, Amazon, ShipStation, and major ecommerce platforms.",
    category: "warehouse",
    tags: ["skuvault", "wms", "warehouse management", "barcode scanning", "pick pack ship", "ecommerce"],
    url: "https://www.skuvault.com",
    pricing: "paid",
    featured: true,
    logo: "🏭",
    domain: "skuvault.com",
    pros: ["Purpose-built for ecommerce warehouse operations", "Barcode scanning and bin-level tracking for accuracy", "Hyper-picking and wave picking optimize fulfillment speed", "Quality control workflows catch errors before shipping", "Integrates with major ecommerce platforms and shipping tools"],
    cons: ["Overkill for small businesses with simple inventory needs", "Pricing requires contacting sales — not transparent", "Hardware requirements (scanners, printers) add to total cost", "Implementation requires dedicated onboarding time"],
    useCases: ["Ecommerce warehouses needing barcode-based inventory accuracy", "Fulfillment operations optimizing pick-pack-ship workflows", "Growing brands transitioning from spreadsheets to proper WMS"],
  },
  { slug: "ordoro", name: "Ordoro", tagline: "Inventory management and shipping for multichannel ecommerce", description: "Ordoro combines inventory management with shipping and dropshipping features. It supports multichannel sync, automated purchase orders, kitting, and batch shipping. The dropship automation feature makes it popular with businesses that combine in-house fulfillment with dropshipping.", category: "dropshipping", tags: ["ordoro", "inventory", "shipping", "dropshipping", "kitting", "multichannel"], url: "https://www.ordoro.com", pricing: "freemium", featured: false, logo: "📋", domain: "ordoro.com" },
  { slug: "fishbowl", name: "Fishbowl", tagline: "Advanced inventory management that integrates with QuickBooks", description: "Fishbowl is a powerful inventory management solution that integrates deeply with QuickBooks. It adds manufacturing, warehouse management, and advanced inventory features that QuickBooks lacks. Available as cloud (Fishbowl Online) or on-premise (Fishbowl Advanced) to suit different needs.", category: "warehouse", tags: ["fishbowl", "quickbooks integration", "manufacturing", "warehouse", "inventory", "on-premise"], url: "https://www.fishbowlinventory.com", pricing: "paid", featured: false, logo: "🐟", domain: "fishbowlinventory.com" },
  { slug: "zoho-inventory", name: "Zoho Inventory", tagline: "Affordable multichannel inventory management in the Zoho ecosystem", description: "Zoho Inventory provides multichannel inventory and order management at a competitive price point. It integrates with Shopify, Amazon, eBay, Etsy, and Zoho's own e-commerce tools. The free plan supports 50 orders/month, and paid plans start at $79/month with strong automation features.", category: "small-business", tags: ["zoho", "inventory", "affordable", "multichannel", "small business", "automation"], url: "https://www.zoho.com/inventory/", pricing: "freemium", featured: false, logo: "📒", domain: "zoho.com" },
  { slug: "inflow", name: "inFlow Inventory", tagline: "Simple, visual inventory management for small and mid-sized businesses", description: "inFlow provides intuitive inventory management with a clean, visual interface. It supports barcoding, purchase orders, sales orders, and multi-location tracking. Available as cloud or on-premise, inFlow is designed for businesses that find enterprise tools overwhelming.", category: "small-business", tags: ["inflow", "simple inventory", "visual", "purchase orders", "barcoding", "smb"], url: "https://www.inflowinventory.com", pricing: "freemium", featured: false, logo: "📊", domain: "inflowinventory.com" },
  { slug: "shipbob", name: "ShipBob", tagline: "End-to-end ecommerce fulfillment with distributed inventory management", description: "ShipBob is an ecommerce fulfillment platform that manages inventory across its network of 50+ fulfillment centers. Merchants store inventory at ShipBob's warehouses, and the platform handles picking, packing, and shipping. Distributed inventory placement reduces shipping times and costs.", category: "dropshipping", tags: ["shipbob", "fulfillment", "3pl", "distributed inventory", "ecommerce", "shipping"], url: "https://www.shipbob.com", pricing: "paid", featured: false, logo: "🚀", domain: "shipbob.com" },
  { slug: "dear-systems", name: "DEAR Systems (Cin7 Core)", tagline: "Inventory, manufacturing, and accounting in one integrated platform", description: "DEAR Systems (now Cin7 Core) combines inventory management, manufacturing, sales, purchasing, and accounting in a single platform. It handles complex scenarios like bill of materials, multi-currency, and serial/batch tracking. Popular with manufacturers and wholesalers.", category: "multichannel", tags: ["dear systems", "cin7 core", "manufacturing", "accounting", "wholesale", "batch tracking"], url: "https://dearsystems.com", pricing: "paid", featured: false, logo: "📦", domain: "dearsystems.com" },
  { slug: "sortly", name: "Sortly", tagline: "Visual inventory management app with photo-based tracking", description: "Sortly is a visual inventory management app that uses photos and QR codes for easy tracking. It's designed for simplicity — snap a photo, add details, and organize items into folders. Great for small businesses, field teams, and organizations managing physical assets or supplies.", category: "small-business", tags: ["sortly", "visual inventory", "qr codes", "photos", "simple", "asset tracking"], url: "https://www.sortly.com", pricing: "freemium", featured: false, logo: "📸", domain: "sortly.com" },
  { slug: "veeqo", name: "Veeqo", tagline: "Free shipping and inventory management platform owned by Amazon", description: "Veeqo (now owned by Amazon) provides free inventory management and shipping for multichannel sellers. It syncs inventory across Amazon, Shopify, eBay, Walmart, and more. The shipping feature includes discounted rates from major carriers. Being free and Amazon-owned makes it uniquely positioned.", category: "multichannel", tags: ["veeqo", "amazon", "free", "multichannel", "shipping", "inventory sync"], url: "https://www.veeqo.com", pricing: "free", featured: false, logo: "📮", domain: "veeqo.com" },
  { slug: "unleashed", name: "Unleashed", tagline: "Powerful inventory management for product businesses", description: "Unleashed provides detailed inventory management with batch and serial tracking, multi-warehouse support, and manufacturing (BOM) capabilities. It integrates with Xero and QuickBooks for accounting and is popular with product-based businesses in Australia, NZ, and the UK.", category: "warehouse", tags: ["unleashed", "batch tracking", "serial tracking", "manufacturing", "xero", "product business"], url: "https://www.unleashedsoftware.com", pricing: "paid", featured: false, logo: "🔓", domain: "unleashedsoftware.com" },
  { slug: "shipstation", name: "ShipStation", tagline: "Multi-carrier shipping solution with inventory tracking features", description: "ShipStation is primarily a shipping solution but includes basic inventory management — stock tracking, low-stock alerts, and multi-channel sync. It connects to 70+ selling channels and all major carriers. For merchants whose primary need is shipping with basic inventory, ShipStation covers both.", category: "order-management", tags: ["shipstation", "shipping", "multi-carrier", "inventory tracking", "order management", "labels"], url: "https://www.shipstation.com", pricing: "paid", featured: false, logo: "🚢", domain: "shipstation.com" },
  { slug: "sellbrite", name: "Sellbrite", tagline: "Simple multichannel listing and inventory sync for growing sellers", description: "Sellbrite makes it easy to list products and sync inventory across Amazon, eBay, Etsy, Walmart, and Shopify. It's designed for growing sellers who need multichannel presence without the complexity of enterprise tools. Now part of GoDaddy, it offers a free plan for up to 30 orders/month.", category: "multichannel", tags: ["sellbrite", "listing management", "multichannel sync", "godaddy", "growing sellers", "simple"], url: "https://www.sellbrite.com", pricing: "freemium", featured: false, logo: "📢", domain: "sellbrite.com" },
];
