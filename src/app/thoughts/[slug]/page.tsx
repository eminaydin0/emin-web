import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/data/site";

const articleBodies: Record<string, string[]> = {
  "expensive-admin-panels": [
    "Most admin panels fail the same way: they try to look powerful instead of feeling composed. Dense chrome, saturated accents, and decorative cards create noise that operators learn to ignore.",
    "Expensive software feels quiet. Hierarchy is unmistakable. Primary actions are rare and obvious. Secondary information recedes without disappearing. Spacing is used as structure, not decoration.",
    "When I design operational surfaces, I start from the decision — what must someone confirm, compare, or escalate right now? Everything else earns its place after that question is answered.",
    "Luxury in enterprise UI is not ornament. It is confidence that the product respects attention.",
  ],
  "role-based-systems": [
    "Multi-role platforms collapse when every user sees everything with filters bolted on later. Roles are not cosmetic themes — they are different jobs with different risk profiles.",
    "The better model is progressive disclosure by responsibility. An agency user should never hunt through admin vocabulary. An accountant should not inherit call-center urgency patterns.",
    "Navigation, empty states, defaults, and even table density should change with the role. Same product spine — different operational posture.",
    "That is how ERP/CRM interfaces stop feeling like shared dumpsters and start feeling like tools made for the people holding them.",
  ],
  "ai-inside-workflows": [
    "A chatbot floating in the corner is rarely a product strategy. It is a feature announcement. Operators already have a screen where the work lives — that is where assistance should appear.",
    "Inline summaries on a claims row. Suggested next actions after a status change. Anomaly highlights inside the chart the team already watches. AI should compress cognitive load at the point of decision.",
    "The interface challenge is trust: make the suggestion inspectable, reversible, and quiet until useful. If it demands a new destination, it will lose to habit.",
    "The future of AI in ops software is invisible leverage, not a new conversation tab.",
  ],
  "screens-to-product-companies": [
    "Shipping screens for clients teaches craft. Owning a product teaches judgment — what not to build, who it is for, and which constraints are actually the business.",
    "My trajectory is deliberate: dashboards, ERP/CRM systems, and AI-assisted platforms are training for company-building. Each engagement is a rehearsal for scope, reliability, and taste under pressure.",
    "Global SaaS is not a slogan. It is a standard for clarity, performance, and trust across time zones and teams you will never meet.",
    "The work ahead is less about collecting technologies and more about forming a point of view strong enough to become a company.",
  ],
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Thoughts" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const body = articleBodies[post.slug] ?? [post.excerpt];

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-[720px] px-6 pb-24 pt-28 md:px-8">
        <Link
          href="/#thoughts"
          className="focus-ring inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Thoughts
        </Link>

        <header className="mt-12 border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted">
            <span className="font-mono tracking-[0.1em] uppercase">
              {post.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span>{post.readTime}</span>
          </div>

          <h1 className="mt-6 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-foreground">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
            {post.excerpt}
          </p>

          <p className="mt-8 text-sm text-muted-soft">
            By {siteConfig.name}
          </p>
        </header>

        <div className="mt-12 space-y-7 text-[17px] leading-[1.8] text-foreground/85 md:text-[18px] md:leading-[1.85]">
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
