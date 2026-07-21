"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ImmersiveNav } from "@/components/experience/ImmersiveNav";
import { LazyVideo } from "@/components/ui/LazyVideo";
import type { SiteContent, Locale } from "@/types/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  pt: {
    eyebrow: "Contato · Brasil → Estados Unidos",
    title: "Vamos construir sua expansão global.",
    lead: "Do Brasil para os Estados Unidos — conte o seu projeto e desenhamos o caminho de governança, capital e presença internacional junto com você.",
    formTitle: "Fale com um especialista",
    formHint: "Resposta em até 24h úteis. Sem formulário longo, sem pressão.",
    hoursLabel: "Atendimento",
  },
  en: {
    eyebrow: "Contact · Brazil → United States",
    title: "Let's build your global expansion.",
    lead: "From Brazil to the United States — tell us about your project and we'll design the path of governance, capital, and international presence with you.",
    formTitle: "Talk to a specialist",
    formHint: "Reply within 24 business hours. No long form, no pressure.",
    hoursLabel: "Hours",
  },
} as const;

export function ImmersiveContact({ content, locale = "pt" }: { content: SiteContent; locale?: Locale }) {
  const { form, info } = content.contact;
  const t = COPY[locale];

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Looping background video */}
      <LazyVideo
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/videos/contact.mp4"
        poster="/images/contact-poster.jpg"
        eager
        aria-hidden
      />
      {/* Harmonic gradient — fades the video into the page so it never feels like a hard block */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(6,8,15,0.94) 0%, rgba(6,8,15,0.78) 38%, rgba(6,8,15,0.5) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(6,8,15,0.95) 0%, rgba(6,8,15,0.25) 22%, rgba(6,8,15,0.35) 70%, rgba(6,8,15,1) 100%)",
        }}
      />

      <ImmersiveNav content={content} locale={locale} />

      <Container className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center py-20 md:py-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* Copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne"
            >
              {t.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="text-metallic font-display mt-5 max-w-xl leading-[1.03] tracking-tight [font-size:clamp(2.2rem,4.6vw,3.8rem)]"
            >
              {t.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
              className="mt-7 max-w-md text-base leading-relaxed text-ivory/75 md:text-lg"
            >
              {t.lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
              className="mt-10 space-y-5 border-t border-white/10 pt-8"
            >
              <div className="flex flex-wrap gap-x-10 gap-y-5">
                <a href={`mailto:${info.email}`} className="group">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-champagne">E-mail</p>
                  <p className="mt-1 text-ivory transition-colors group-hover:text-champagne">{info.email}</p>
                </a>
                <a href={`tel:${info.phone.replace(/\s/g, "")}`} className="group">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-champagne">{locale === "en" ? "Phone" : "Telefone"}</p>
                  <p className="mt-1 text-ivory transition-colors group-hover:text-champagne">{info.phone}</p>
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-champagne">{t.hoursLabel}</p>
                <p className="mt-1 text-sm text-ivory/70">{info.hours}</p>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-ivory/55">{info.address}</p>
            </motion.div>
          </div>

          {/* Glass form card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="rounded-[26px] border border-white/12 bg-white/[0.06] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-10"
          >
            <h2 className="font-display text-2xl text-ivory">{t.formTitle}</h2>
            <p className="mt-2 text-sm text-ivory/55">{t.formHint}</p>

            <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={form.name} name="name" type="text" />
                <Field label={form.email} name="email" type="email" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={form.phone} name="phone" type="tel" />
                <Field label={form.company} name="company" type="text" />
              </div>
              <SelectField label={form.objective} name="objective" options={form.objectiveOptions} />
              <div>
                <label htmlFor="message" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-ivory/60">
                  {form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full resize-none border border-white/12 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-mist transition-colors focus:border-white/40 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 border border-white/25 bg-white py-4 text-sm font-medium uppercase tracking-[0.12em] text-black transition-colors hover:bg-transparent hover:text-white"
              >
                {form.submit}
                <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
              </button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-ivory/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full border border-white/12 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-mist transition-colors focus:border-white/40 focus:outline-none"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-ivory/60">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full appearance-none border border-white/12 bg-black px-4 py-3 text-sm text-ivory transition-colors focus:border-white/40 focus:outline-none"
      >
        <option value="" disabled>
          —
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
