import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    alternates: { canonical: `https://finderslist.com/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: "FindersList Editorial Team", url: "https://finderslist.com/about" },
    publisher: { "@type": "Organization", name: "FindersList", url: "https://finderslist.com", logo: { "@type": "ImageObject", url: "https://finderslist.com/FindersListLogo.png" } },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://finderslist.com/blog/${post.slug}` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://finderslist.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://finderslist.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  // Split content into paragraphs — supports ## headings and regular paragraphs
  const sections = post.content.split("\n\n");

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-slate-300 truncate">{post.title}</span>
      </nav>

      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs bg-violet-500/15 text-violet-300 border border-violet-500/25 rounded-full px-2.5 py-0.5">
            {post.category}
          </span>
          <span className="text-xs text-slate-600">{post.readingTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
        <p className="text-lg text-slate-400 leading-relaxed mb-4">{post.description}</p>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>By {post.author}</span>
          <span>·</span>
          <span>Published {post.publishedAt}</span>
          {post.updatedAt !== post.publishedAt && (
            <>
              <span>·</span>
              <span>Updated {post.updatedAt}</span>
            </>
          )}
        </div>
      </header>

      <article className="prose prose-invert prose-slate max-w-none">
        {sections.map((section, i) => {
          const trimmed = section.trim();
          if (!trimmed) return null;
          if (trimmed.startsWith("## ")) {
            return <h2 key={i} className="text-xl font-semibold text-white mt-10 mb-4">{trimmed.slice(3)}</h2>;
          }
          if (trimmed.startsWith("### ")) {
            return <h3 key={i} className="text-lg font-semibold text-white mt-8 mb-3">{trimmed.slice(4)}</h3>;
          }
          if (trimmed.startsWith("- ")) {
            const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 text-slate-300 leading-relaxed my-4">
                {items.map((item, j) => (
                  <li key={j}>{item.slice(2)}</li>
                ))}
              </ul>
            );
          }
          return <p key={i} className="text-slate-300 leading-relaxed mb-4">{trimmed}</p>;
        })}
      </article>

      {post.relatedDirectory && (
        <div className="mt-12 p-6 rounded-2xl border border-violet-500/20 bg-violet-500/5">
          <p className="text-sm text-violet-300 font-medium mb-2">Explore the tools mentioned in this article</p>
          <Link
            href={`/${post.relatedDirectory}`}
            className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-2"
          >
            Browse {post.relatedDirectory.replace(/-/g, " ")} directory →
          </Link>
        </div>
      )}

      <div className="mt-10 pt-8 border-t border-white/8">
        <Link href="/blog" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
          ← Back to all articles
        </Link>
      </div>
    </div>
  );
}
