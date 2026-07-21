"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/home/Editorial";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { DURATION, EASE_OUT } from "@/lib/motion";
import type { Locale, SiteContent } from "@/types/content";
import { cn } from "@/lib/utils";

interface ContactPageViewProps {
  content: SiteContent;
  locale?: Locale;
}

const COPY = {
  pt: {
    formTitle: "Fale com um especialista",
    formHint: "Resposta em até 24h úteis. Sem formulário longo, sem pressão.",
    hours: "Atendimento",
    phone: "Telefone",
    mapEyebrow: "Escritório",
    mapTitle: "Orlando, Flórida",
    mapOpen: "Abrir no Google Maps",
  },
  en: {
    formTitle: "Talk to a specialist",
    formHint: "Reply within 24 business hours. No long form, no pressure.",
    hours: "Hours",
    phone: "Phone",
    mapEyebrow: "Office",
    mapTitle: "Orlando, Florida",
    mapOpen: "Open in Google Maps",
  },
} as const;

const OFFICE_ADDRESS =
  "189 South Orange Ave, Ste 1250, South Tower, Orlando, FL 32801, United States";

/** Google Business Profile — Head Oversea (share.google / Maps place) */
const MAPS_PLACE_ID = "ChIJXaNfr5p754gRXvCql6HsR8o";
const MAPS_FEATURE_ID = "0x88e77b9aaf5fa35d:0xca47eca197aaf05e";
const MAPS_EMBED =
  `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3504.8!2d-81.3786413!3d28.5406251!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${encodeURIComponent(MAPS_FEATURE_ID)}!2sHead%20Oversea!5e0!3m2!1sen!2sus!4v1!5m2!1sen!2sus`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Head Oversea")}&query_place_id=${MAPS_PLACE_ID}`;


export function ContactPageView({
  content,
  locale = "pt",
}: ContactPageViewProps) {
  const { form, info, eyebrow, title, subtitle } = content.contact;
  const t = COPY[locale];

  return (
    <main className="min-h-screen bg-black text-white" style={{ overflowX: "clip" }}>
      <Header content={content} locale={locale} surface="dark" />

      {/* Video as a top band only — not full-page background */}
      <section
        className="relative h-[min(48vh,380px)] min-h-[260px] overflow-hidden md:h-[42vh] md:min-h-[280px] md:max-h-[420px]"
        aria-label={
          locale === "en"
            ? "Contact — United States investment markets"
            : "Contato — mercados de investimento nos Estados Unidos"
        }
      >
        <ImageReveal className="absolute inset-0 min-h-full" immediate>
          <LazyVideo
            className="absolute inset-0 h-full w-full object-cover object-center"
            src="/videos/contact.mp4"
            poster="/images/contact-poster.jpg"
            eager
            aria-hidden
          />
        </ImageReveal>
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 40%, rgba(0,0,0,0.42) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
          aria-hidden
          style={{
            background:
              "linear-gradient(to top, #000 0%, transparent 100%)",
          }}
        />
      </section>

      <section className="bg-black">
        <div className="page-shell pb-24 pt-10 md:pb-32 md:pt-14">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.base, ease: EASE_OUT }}
              >
                <SectionLabel tone="light">{eyebrow}</SectionLabel>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.slow,
                  delay: 0.1,
                  ease: EASE_OUT,
                }}
                className="font-display mt-8 max-w-xl text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[1.05] text-white"
              >
                {title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.base,
                  delay: 0.2,
                  ease: EASE_OUT,
                }}
                className="body-editorial mt-7 max-w-md text-white/65"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.base,
                  delay: 0.3,
                  ease: EASE_OUT,
                }}
                className="mt-12 space-y-6 border-t border-white/15 pt-8"
              >
                <div className="flex flex-wrap gap-x-10 gap-y-5">
                  <a href={`mailto:${info.email}`} className="group">
                    <p className="label-caps text-white/40">Email</p>
                    <p className="mt-2 text-[15px] text-white/80 transition-opacity group-hover:opacity-60">
                      {info.email}
                    </p>
                  </a>
                  <a
                    href={`tel:${info.phone.replace(/\s/g, "")}`}
                    className="group"
                  >
                    <p className="label-caps text-white/40">{t.phone}</p>
                    <p className="mt-2 text-[15px] text-white/80 transition-opacity group-hover:opacity-60">
                      {info.phone}
                    </p>
                  </a>
                </div>
                <div>
                  <p className="label-caps text-white/40">{t.hours}</p>
                  <p className="mt-2 text-[14px] text-white/55">{info.hours}</p>
                </div>
                <p className="body-editorial max-w-xs text-[14px] text-white/45">
                  {info.address}
                </p>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[var(--gold)] transition-opacity hover:opacity-70"
                >
                  {t.mapOpen}
                  <span aria-hidden>→</span>
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.slow,
                delay: 0.18,
                ease: EASE_OUT,
              }}
              className="border border-white/12 bg-white/[0.04] p-7 md:p-10 lg:col-span-6 lg:col-start-7"
            >
              <h2 className="font-display text-2xl text-white">{t.formTitle}</h2>
              <p className="mt-2 text-[14px] text-white/50">{t.formHint}</p>

              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={form.name} name="name" type="text" />
                  <Field label={form.email} name="email" type="email" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={form.phone} name="phone" type="tel" />
                  <Field label={form.company} name="company" type="text" />
                </div>
                <SelectField
                  label={form.objective}
                  name="objective"
                  options={form.objectiveOptions}
                />
                <div>
                  <label
                    htmlFor="message"
                    className="label-caps mb-2 block text-white/45"
                  >
                    {form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full resize-none border border-white/15 bg-transparent px-4 py-3 text-[15px] text-white placeholder:text-white/25 transition-colors focus:border-white/40 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 border border-white/25 bg-white py-4 text-[12px] font-medium uppercase tracking-[0.14em] text-black transition-colors hover:bg-transparent hover:text-white"
                >
                  {form.submit}
                  <span
                    className="transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office map — Orlando */}
      <section className="border-t border-white/[0.08] bg-black text-white">
        <div className="page-shell py-[clamp(2.5rem,6vw,4.5rem)]">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SectionLabel tone="light">{t.mapEyebrow}</SectionLabel>
              <h2 className="font-display mt-6 text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.12]">
                {t.mapTitle}
              </h2>
              <p className="body-editorial mt-5 max-w-[32ch] text-[14px] text-white/50">
                {OFFICE_ADDRESS}
              </p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-white/70 transition-opacity hover:text-white"
              >
                {t.mapOpen}
                <span aria-hidden>→</span>
              </a>
            </div>
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-[#111] md:aspect-[21/10]">
                <iframe
                  title={`${t.mapTitle} — ${OFFICE_ADDRESS}`}
                  src={MAPS_EMBED}
                  className="absolute inset-0 h-full w-full border-0 grayscale-[30%] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer content={content} locale={locale} />
    </main>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-caps mb-2 block text-white/45">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full border border-white/15 bg-transparent px-4 py-3 text-[15px] text-white placeholder:text-white/25 transition-colors focus:border-white/40 focus:outline-none"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="label-caps mb-2 block text-white/45">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className={cn(
          "w-full appearance-none border border-white/15 bg-black/80 px-4 py-3 text-[15px] text-white transition-colors focus:border-white/40 focus:outline-none",
        )}
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
