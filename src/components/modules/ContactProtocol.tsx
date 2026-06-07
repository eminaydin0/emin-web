"use client";

import { motion } from "framer-motion";
import { Check, Copy, Download, Phone, Send, Terminal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ModuleShell } from "@/components/lab/ModuleShell";
import { MagneticButton } from "@/components/lab/MagneticButton";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/portfolio";
import { copyToClipboard } from "@/lib/utils";

const lines = [
  { cmd: true, text: "init contact_protocol" },
  { cmd: false, text: "PROTOCOL v2.1 — SECURE CHANNEL" },
  { cmd: true, text: "target --email" },
  { cmd: false, text: siteConfig.email },
  { cmd: true, text: "target --phone" },
  { cmd: false, text: siteConfig.phone },
  { cmd: true, text: "status" },
  { cmd: false, text: siteConfig.availability },
];

export function ContactProtocol() {
  const [visible, setVisible] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (visible >= lines.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 300);
    return () => clearTimeout(t);
  }, [visible]);

  const handleCopy = useCallback(async (text: string, field: string) => {
    try {
      await copyToClipboard(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch { /* noop */ }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Lab Contact — ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <ModuleShell id="protocol" moduleId="PROTOCOL" title="Contact Protocol" subtitle="Secure Transmission Terminal">
      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="hud-panel rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/15 bg-cyan-500/5">
            <Terminal className="h-4 w-4 text-cyan-400/60" />
            <span className="font-mono text-[10px] text-cyan-400/50 tracking-widest">
              TERMINAL — CONTACT_PROTOCOL
            </span>
            <div className="ml-auto flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
            </div>
          </div>
          <div className="p-6 font-mono text-sm space-y-1.5 min-h-[280px]">
            {lines.slice(0, visible).map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2">
                {line.cmd ? (
                  <span className="text-cyan-400/60 shrink-0">{">"}</span>
                ) : (
                  <span className="text-emerald-400/80 pl-4">{line.text}</span>
                )}
                {line.cmd && <span className="text-white/40">{line.text}</span>}
                {i === visible - 1 && !line.cmd && <span className="terminal-cursor" />}
              </motion.div>
            ))}
          </div>
          <div className="px-6 pb-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleCopy(siteConfig.email, "email")}
              className="font-mono text-[10px] flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-white/40 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              data-cursor="pointer"
            >
              {copied === "email" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              {siteConfig.email}
            </button>
            <button
              onClick={() => handleCopy(siteConfig.phone, "phone")}
              className="font-mono text-[10px] flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-white/40 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              data-cursor="pointer"
            >
              {copied === "phone" ? <Check className="h-3 w-3 text-emerald-400" /> : <Phone className="h-3 w-3" />}
              {siteConfig.phone}
            </button>
          </div>
          <div className="px-6 pb-6 flex items-center justify-between">
            <SocialLinks iconClassName="h-4 w-4" />
            <a
              href={siteConfig.cvUrl}
              download
              className="font-mono text-[10px] flex items-center gap-1.5 text-violet-400/60 hover:text-violet-400 transition-colors"
              data-cursor="pointer"
            >
              <Download className="h-3 w-3" /> CV.DAT
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="hud-panel rounded-2xl p-6 space-y-4">
          <p className="font-mono text-[10px] text-cyan-400/40 tracking-[0.3em] mb-2">TRANSMIT MESSAGE</p>
          <Input id="name" placeholder="Operator Name" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} required className="bg-black/40 border-cyan-500/20 font-mono text-sm" />
          <Input id="email" type="email" placeholder="Return Channel" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} required className="bg-black/40 border-cyan-500/20 font-mono text-sm" />
          <Textarea id="message" placeholder="Encrypted payload..." value={form.message} onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))} required className="bg-black/40 border-cyan-500/20 font-mono text-sm min-h-[140px]" />
          <MagneticButton type="submit">
            <Send className="h-4 w-4" /> Transmit
          </MagneticButton>
        </form>
      </div>
    </ModuleShell>
  );
}
