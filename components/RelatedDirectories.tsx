import Link from "next/link";

const ALL_DIRECTORIES = [
  { slug: "ai-tools", name: "AI Tools", emoji: "🤖" },
  { slug: "marketing-tools", name: "Marketing Tools", emoji: "📈" },
  { slug: "finance-tools", name: "Finance & Accounting", emoji: "💰" },
  { slug: "ecommerce-tools", name: "E-commerce Tools", emoji: "🛍️" },
  { slug: "productivity-tools", name: "Productivity", emoji: "⚡" },
  { slug: "hr-tools", name: "HR Tools", emoji: "👥" },
  { slug: "crm-tools", name: "CRM & Sales", emoji: "🤝" },
  { slug: "security-tools", name: "Security", emoji: "🔒" },
  { slug: "developer-tools", name: "Developer Tools", emoji: "💻" },
  { slug: "design-tools", name: "Design Tools", emoji: "🎨" },
  { slug: "legal-tools", name: "Legal Tools", emoji: "⚖️" },
  { slug: "hosting-tools", name: "Hosting & Cloud", emoji: "☁️" },
  { slug: "website-builders", name: "Website Builders", emoji: "🌐" },
  { slug: "analytics-tools", name: "Analytics", emoji: "📊" },
  { slug: "budgeting-apps", name: "Budgeting Apps", emoji: "💵" },
  { slug: "auto-insurance", name: "Auto Insurance", emoji: "🚗" },
  { slug: "health-insurance", name: "Health Insurance", emoji: "🏥" },
  { slug: "home-insurance", name: "Home Insurance", emoji: "🏠" },
  { slug: "investment-platforms", name: "Investment Platforms", emoji: "📊" },
  { slug: "telehealth-platforms", name: "Telehealth", emoji: "🩺" },
];

interface RelatedDirectoriesProps {
  currentSlug: string;
}

export default function RelatedDirectories({ currentSlug }: RelatedDirectoriesProps) {
  const related = ALL_DIRECTORIES.filter((d) => d.slug !== currentSlug).slice(0, 6);

  return (
    <section className="mt-14 mb-16 border-t border-white/8 pt-10">
      <h2 className="text-lg font-semibold text-white mb-5">Explore More Directories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {related.map((dir) => (
          <Link
            key={dir.slug}
            href={`/${dir.slug}`}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/8 bg-slate-900/30 hover:bg-slate-800/50 hover:border-violet-500/30 transition-all text-center"
          >
            <span className="text-2xl">{dir.emoji}</span>
            <span className="text-xs font-medium text-slate-300">{dir.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
