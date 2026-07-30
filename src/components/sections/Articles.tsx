"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { TextReveal } from "@/components/brand/TextReveal";
import { blogPosts } from "@/data/blog";

export function Articles() {
  return (
    <section id="thoughts" className="section-pad relative bg-background-soft/70">
      <div className="container-brand">
        <SectionReveal variant="clip">
          <p className="font-mono text-[12px] tracking-[0.16em] text-muted uppercase">
            Thoughts
          </p>
        </SectionReveal>
        <TextReveal
          as="h2"
          delay={0.05}
          className="mt-6 max-w-2xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-foreground"
        >
          Notes on systems, product, and craft.
        </TextReveal>

        <div className="mt-14 border-t border-border md:mt-16">
          {blogPosts.map((post, index) => (
            <SectionReveal key={post.id} delay={index * 0.04}>
              <article className="border-b border-border py-8 md:py-10">
                <Link
                  href={`/thoughts/${post.slug}`}
                  className="focus-ring group block rounded-md"
                >
                  <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted">
                    <span className="font-mono tracking-[0.1em] uppercase">
                      {post.category}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-border-strong" />
                    <span>{post.date}</span>
                    <span className="h-1 w-1 rounded-full bg-border-strong" />
                    <span>{post.readTime}</span>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-6">
                    <h3 className="max-w-2xl text-[clamp(1.35rem,2.8vw,1.85rem)] leading-[1.15] font-semibold tracking-[-0.035em] text-foreground transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <ArrowUpRight className="mt-1 hidden h-5 w-5 shrink-0 text-muted-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
                  </div>

                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted md:text-[16px]">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
