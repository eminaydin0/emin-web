"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { blogPosts } from "@/data/blog";

export function Articles() {
  return (
    <section id="thoughts" className="section-pad bg-background">
      <div className="container-brand">
        <SectionReveal>
          <h2 className="text-center text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            Thoughts.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[19px] text-muted md:text-[21px]">
            Notes on systems, product, and craft.
          </p>
        </SectionReveal>

        <div className="mt-12 space-y-4">
          {blogPosts.map((post, i) => (
            <SectionReveal key={post.id} delay={i * 0.04}>
              <Link
                href={`/thoughts/${post.slug}`}
                className="tile focus-ring group block bg-background-soft p-7 transition-transform hover:-translate-y-0.5 md:p-8"
              >
                <p className="text-[12px] text-muted-soft">
                  {post.category} · {post.date} · {post.readTime}
                </p>
                <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent md:text-[28px]">
                  {post.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[17px] leading-snug text-muted">
                  {post.excerpt}
                </p>
                <span className="apple-link mt-4 inline-block !text-[14px]">
                  Read more ›
                </span>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
