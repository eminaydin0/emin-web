"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 6000 }),
  ]);

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      aria-label="Testimonials"
    >
      <div className="container-wide">
        <SectionHeading
          label="Testimonials"
          title="What people say"
          description="Kind words from colleagues and leaders I've had the pleasure to work with."
          align="center"
        />

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass rounded-3xl p-8 h-full flex flex-col hover:border-white/15 transition-all duration-300"
                >
                  <Quote className="h-8 w-8 text-violet-400/30 mb-4" />
                  <blockquote className="text-white/70 leading-relaxed flex-1 italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-white">{t.author}</p>
                      <p className="text-xs text-white/40">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
