"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, GraduationCap, Activity } from "lucide-react";
import { ModuleShell } from "@/components/lab/ModuleShell";
import { TiltPanel } from "@/components/lab/TiltPanel";
import { siteConfig } from "@/data/portfolio";

const statusFields = [
  { label: "NAME", value: siteConfig.name, icon: null },
  { label: "ROLE", value: siteConfig.title, icon: null },
  { label: "LOCATION", value: siteConfig.location, icon: MapPin },
  { label: "STATUS", value: siteConfig.availability, icon: Activity },
  { label: "EDUCATION", value: siteConfig.education, icon: GraduationCap },
  { label: "CONTACT", value: siteConfig.email, icon: Mail },
  { label: "PHONE", value: siteConfig.phone, icon: Phone },
];

export function IdentityModule() {
  return (
    <ModuleShell id="identity" moduleId="IDENTITY" title="Operator Profile" subtitle="Identity Module">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8">
        <TiltPanel className="p-2">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020208] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-mono text-[10px] text-cyan-400/60 tracking-widest">BIOMETRIC SCAN</p>
              <p className="font-display text-2xl font-bold text-white mt-1">{siteConfig.name}</p>
            </div>
            <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[9px] text-cyan-400/40">
              <span>ID: EA-001</span>
              <span className="animate-pulse">● LIVE</span>
            </div>
          </div>
        </TiltPanel>

        <div className="space-y-3">
          {statusFields.map((field, i) => (
            <motion.div
              key={field.label}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <TiltPanel className="px-5 py-4 flex items-center gap-4">
                {field.icon && <field.icon className="h-4 w-4 text-cyan-400/50 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10px] text-cyan-400/40 tracking-[0.2em]">
                    {field.label}
                  </span>
                  <p className="text-white/80 text-sm mt-0.5 truncate">{field.value}</p>
                </div>
                <span className="font-mono text-[9px] text-white/15">OK</span>
              </TiltPanel>
            </motion.div>
          ))}

          <TiltPanel glow="violet" className="p-6 mt-4">
            <p className="font-mono text-[10px] text-violet-400/50 tracking-widest mb-3">BIO.LOG</p>
            <p className="text-white/55 leading-relaxed text-sm">{siteConfig.bio}</p>
          </TiltPanel>
        </div>
      </div>
    </ModuleShell>
  );
}
