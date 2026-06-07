"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/data/case-studies";

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="section-padding relative"
      aria-label="Case Studies"
    >
      <div className="container-wide">
        <SectionHeading
          label="Case Studies"
          title="Impact in numbers"
          description="Measurable outcomes from recent engagements."
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass rounded-3xl p-8 text-center group hover:border-violet-500/20 transition-all duration-300"
            >
              <div className="font-display text-5xl font-bold text-gradient-accent">
                {study.metric}
              </div>
              <p className="text-xs text-white/40 uppercase tracking-wider mt-1">
                {study.metricLabel}
              </p>
              <h3 className="mt-6 text-lg font-semibold text-white">
                {study.title}
              </h3>
              <p className="text-sm text-violet-400/60 mt-1">{study.client}</p>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">
                {study.description}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {study.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
