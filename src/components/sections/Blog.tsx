"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Blog() {
  return (
    <section id="blog" className="section-padding relative" aria-label="Blog">
      <div className="container-wide">
        <SectionHeading
          label="Blog"
          title="Thoughts & deep dives"
          description="Technical writing on frontend craft, performance, and design systems."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={fadeUp}
              className="glass rounded-2xl p-6 group hover:border-white/15 transition-all duration-300 cursor-pointer"
              data-cursor="pointer"
              role="link"
              tabIndex={0}
              aria-label={`Read article: ${post.title}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="accent">{post.category}</Badge>
                <span className="text-xs text-white/30">{post.date}</span>
                <span className="flex items-center gap-1 text-xs text-white/30 ml-auto">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-gradient-accent transition-all flex items-start gap-2">
                {post.title}
                <ArrowUpRight className="h-4 w-4 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="mt-3 text-sm text-white/50 leading-relaxed">
                {post.excerpt}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
