"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { journeyTimeline } from "@/data/timeline";
import { siteConfig } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const items = timelineRef.current.querySelectorAll("[data-timeline-item]");
    gsap.fromTo(
      items,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="about" className="section-padding relative" aria-label="About">
      <div className="container-wide">
        <SectionHeading
          label="Hakkımda"
          title="Her piksele mühendislik estetiği"
          description="Tasarım vizyonu ile teknik uygulama arasındaki köprüyü kuruyor, sürdürülebilir arayüzler yaratıyorum."
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <div className="lg:hidden relative mx-auto max-w-xs mb-8">
              <div className="glow-card rounded-2xl overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={siteConfig.profileImage}
                    alt={siteConfig.name}
                    fill
                    className="object-cover grayscale"
                    sizes="300px"
                  />
                </div>
              </div>
            </div>

            <motion.p variants={fadeUp} className="text-lg text-white/55 leading-relaxed">
              Merhaba, ben <span className="text-white font-medium">{siteConfig.name}</span> —{" "}
              {siteConfig.location} merkezli bir {siteConfig.title}.
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg text-white/55 leading-relaxed">
              {siteConfig.bio}
            </motion.p>

            <motion.div variants={fadeUp} className="glow-card rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/50">
                <GraduationCap className="h-4 w-4 text-violet-400 shrink-0" />
                {siteConfig.education}
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <MapPin className="h-4 w-4 text-violet-400 shrink-0" />
                {siteConfig.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Phone className="h-4 w-4 text-violet-400 shrink-0" />
                <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Mail className="h-4 w-4 text-violet-400 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: `${siteConfig.yearsExperience}+`, label: "Yıl Deneyim" },
                { value: "19+", label: "GitHub Repo" },
                { value: "10+", label: "Proje" },
              ].map((stat) => (
                <div key={stat.label} className="glow-card rounded-2xl p-5 text-center">
                  <div className="text-3xl font-display font-bold text-gradient-accent">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div ref={timelineRef} className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-indigo-500/30 to-transparent" />
            <div className="space-y-8">
              {journeyTimeline.map((event) => (
                <div key={event.year} data-timeline-item className="relative pl-16 group">
                  <div className="absolute left-3 top-1 h-7 w-7 rounded-full border border-violet-500/30 bg-[#030308] flex items-center justify-center text-sm group-hover:border-violet-500/60 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
                    {event.icon}
                  </div>
                  <div className="glow-card rounded-2xl p-5 transition-all duration-300 group-hover:translate-x-1">
                    <span className="text-xs font-mono text-violet-400">{event.year}</span>
                    <h3 className="mt-1 text-lg font-semibold text-white">{event.title}</h3>
                    <p className="mt-2 text-sm text-white/50">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
