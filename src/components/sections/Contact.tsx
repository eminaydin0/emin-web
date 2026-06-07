"use client";

import { motion } from "framer-motion";
import { Check, Copy, Download, Phone, Send, Terminal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/portfolio";
import { copyToClipboard } from "@/lib/utils";

const terminalLines = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: siteConfig.name },
  { prompt: true, text: "role --current" },
  { prompt: false, text: siteConfig.title },
  { prompt: true, text: "contact --email" },
  { prompt: false, text: siteConfig.email },
  { prompt: true, text: "contact --phone" },
  { prompt: false, text: siteConfig.phone },
  { prompt: true, text: "location" },
  { prompt: false, text: siteConfig.location },
];

export function Contact() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 350);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  const handleCopy = useCallback(async (text: string, field: string) => {
    try {
      await copyToClipboard(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolyo İletişim — ${formState.name}`);
    const body = encodeURIComponent(
      `İsim: ${formState.name}\nE-posta: ${formState.email}\n\n${formState.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative" aria-label="Contact">
      <div className="container-wide">
        <SectionHeading
          label="İletişim"
          title="Birlikte harika bir şey inşa edelim"
          description="Aklınızda bir proje mi var? Benimle iletişime geçin."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glow-card rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <Terminal className="h-4 w-4 text-white/30" />
              <span className="text-xs font-mono text-white/30">terminal — contact</span>
              <div className="ml-auto flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <span className="h-3 w-3 rounded-full bg-green-500/60" />
              </div>
            </div>
            <div className="p-6 font-mono text-sm space-y-2 min-h-[300px]">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-2"
                >
                  {line.prompt && <span className="text-violet-400 shrink-0">$</span>}
                  <span className={line.prompt ? "text-white/60" : "text-emerald-400"}>
                    {line.text}
                    {i === visibleLines - 1 && !line.prompt && (
                      <span className="terminal-cursor" />
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="px-6 pb-4 flex flex-wrap gap-2">
              <button
                onClick={() => handleCopy(siteConfig.email, "email")}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-white/50 hover:text-white hover:border-white/20 transition-all focus-ring"
                data-cursor="pointer"
              >
                {copiedField === "email" ? (
                  <><Check className="h-3 w-3 text-emerald-400" /> Kopyalandı!</>
                ) : (
                  <><Copy className="h-3 w-3" /> {siteConfig.email}</>
                )}
              </button>
              <button
                onClick={() => handleCopy(siteConfig.phone, "phone")}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-white/50 hover:text-white hover:border-white/20 transition-all focus-ring"
                data-cursor="pointer"
              >
                {copiedField === "phone" ? (
                  <><Check className="h-3 w-3 text-emerald-400" /> Kopyalandı!</>
                ) : (
                  <><Phone className="h-3 w-3" /> {siteConfig.phone}</>
                )}
              </button>
            </div>
            <div className="px-6 pb-6 flex items-center justify-between">
              <SocialLinks iconClassName="h-4 w-4" />
              <a
                href={siteConfig.cvUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs text-violet-300 hover:bg-violet-500/20 transition-all focus-ring"
                data-cursor="pointer"
              >
                <Download className="h-3 w-3" />
                CV İndir
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glow-card rounded-2xl p-6 space-y-4">
            <div>
              <label htmlFor="name" className="text-xs text-white/40 mb-1.5 block">İsim</label>
              <Input
                id="name"
                placeholder="Adınız Soyadınız"
                value={formState.name}
                onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs text-white/40 mb-1.5 block">E-posta</label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@sirket.com"
                value={formState.email}
                onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="text-xs text-white/40 mb-1.5 block">Mesaj</label>
              <Textarea
                id="message"
                placeholder="Projeniz hakkında kısaca bilgi verin..."
                value={formState.message}
                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" variant="glow" className="w-full" disabled={submitted} data-cursor="pointer">
              {submitted ? (
                <><Check className="h-4 w-4" /> E-posta Açılıyor...</>
              ) : (
                <><Send className="h-4 w-4" /> Mesaj Gönder</>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
