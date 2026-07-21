"use client";

import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { FadeIn, TextReveal } from "@/components/motion/FadeIn";
import type { SiteContent } from "@/types/content";

interface ContactFormProps {
  content: SiteContent;
  /** Set false when the page already renders its own hero heading (e.g. immersive /contato). */
  showHeading?: boolean;
}

export function ContactForm({ content, showHeading = true }: ContactFormProps) {
  const { form, info } = content.contact;

  return (
    <Section className={showHeading ? "!pt-32 md:!pt-40" : "!py-20 md:!py-28"}>
      <Container>
        <div className="grid gap-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {showHeading && (
              <>
                <Eyebrow>{content.contact.eyebrow}</Eyebrow>
                <TextReveal
                  text={content.contact.title}
                  className="font-display text-4xl md:text-5xl font-light text-ivory"
                />
                <FadeIn delay={0.1}>
                  <p className="mt-8 text-lg leading-relaxed text-stone">
                    {content.contact.subtitle}
                  </p>
                </FadeIn>
              </>
            )}

            <FadeIn delay={0.2} className="mt-12 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-champagne-dim mb-2">
                  Atendimento
                </p>
                <p className="text-sm text-stone">{info.hours}</p>
              </div>
              <div>
                <a
                  href={`mailto:${info.email}`}
                  className="block text-ivory hover:text-champagne transition-colors"
                >
                  {info.email}
                </a>
                <a
                  href={`tel:${info.phone.replace(/\s/g, "")}`}
                  className="block mt-2 text-ivory hover:text-champagne transition-colors"
                >
                  {info.phone}
                </a>
              </div>
              <p className="text-sm text-stone leading-relaxed">{info.address}</p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <form
              className="space-y-6 border border-border bg-graphite/30 p-8 md:p-12"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={form.name} name="name" type="text" />
                <Field label={form.email} name="email" type="email" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={form.phone} name="phone" type="tel" />
                <Field label={form.company} name="company" type="text" />
              </div>
              <SelectField
                label={form.revenue}
                name="revenue"
                options={form.revenueOptions}
              />
              <SelectField
                label={form.objective}
                name="objective"
                options={form.objectiveOptions}
              />
              <div>
                <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-stone">
                  {form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-mist focus:border-champagne-dim resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-ivory py-4 text-sm font-medium uppercase tracking-widest text-obsidian transition-colors hover:bg-champagne"
              >
                {form.submit}
              </button>
            </form>
          </FadeIn>
        </div>
      </Container>
    </Section>
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
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-widest text-stone">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full border border-border bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-mist focus:border-champagne-dim"
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
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-widest text-stone">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full border border-border bg-obsidian px-4 py-3 text-sm text-ivory focus:border-champagne-dim appearance-none"
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
