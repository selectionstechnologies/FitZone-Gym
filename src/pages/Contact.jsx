import { useState } from "react";
import { hours, faqs, img } from "../data.js";
import { Reveal, Button, Eyebrow, SectionHead, Section, PageBanner } from "../components/ui.jsx";
import { IconBox } from "../components/Icons.jsx";

const rules = {
  name: [(v) => v.trim().length >= 2, "Please enter your name."],
  email: [(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Please enter a valid email."],
  phone: [(v) => v.trim() === "" || /^[+\d\s()-]{7,}$/.test(v), "Please enter a valid phone number."],
  subject: [(v) => v !== "", "Please choose an option."],
  message: [(v) => v.trim().length >= 10, "Message should be at least 10 characters."],
};
const empty = { name: "", email: "", phone: "", subject: "", message: "" };
const subjects = ["Membership", "Free Trial", "Personal Training", "Group Classes", "Careers", "Other"];

const contactInfo = [
  { icon: "pin", label: "Address", value: "123 Fitness Avenue, Gulberg III, Lahore" },
  { icon: "phone", label: "Phone", value: "+92 300 000 0000", href: "tel:+923000000000" },
  { icon: "mail", label: "Email", value: "hello@fitzonegym.com", href: "mailto:hello@fitzonegym.com" },
];

function Field({ label, name, error, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-head text-sm font-semibold">{label}</label>
      {children}
      {error && <span className="mt-1.5 block text-xs text-accent-2">{error}</span>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const input = (name) =>
    `w-full rounded-xl border bg-bg px-4 py-3.5 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15 ${errors[name] ? "border-accent-2" : "border-line"}`;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name] && rules[name][0](value)) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = {};
    for (const [k, [test, msg]] of Object.entries(rules)) if (!test(form[k])) found[k] = msg;
    setErrors(found);
    if (Object.keys(found).length) return;
    setForm(empty);
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <>
      <PageBanner eyebrow="Get in touch" title="Contact" accent="Us" image={img("1574680096145-d05b474e2155", 1920)} />

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <Eyebrow>We'd love to hear from you</Eyebrow>
            <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl">Let's talk <span className="text-gradient">fitness</span></h2>
            <p className="text-muted">Questions about memberships, classes or personal training? Drop us a message or visit us — our team usually replies within a few hours.</p>
            <div className="my-8 grid gap-5">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <IconBox name={c.icon} small />
                  <div>
                    <h4 className="font-bold">{c.label}</h4>
                    {c.href ? <a href={c.href} className="text-muted hover:text-accent">{c.value}</a> : <p className="text-muted">{c.value}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-line bg-card p-7">
              <h3 className="mb-2 text-xl font-bold">Opening Hours</h3>
              <ul>
                {hours.map(([d, h]) => (
                  <li key={d} className="flex justify-between border-b border-dashed border-line py-2.5 text-muted last:border-0">
                    <span>{d}</span><span className="font-semibold text-gray-100">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="rounded-2xl border border-line bg-card p-6 sm:p-8">
            <h3 className="mb-1 text-xl font-bold">Send us a message</h3>
            <p className="mb-6 text-muted">Fill in the form and we'll get back to you shortly.</p>
            <form onSubmit={onSubmit} noValidate className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name *" name="name" error={errors.name}>
                  <input id="name" name="name" value={form.name} onChange={onChange} placeholder="John Doe" autoComplete="name" className={input("name")} />
                </Field>
                <Field label="Email *" name="email" error={errors.email}>
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="john@example.com" autoComplete="email" className={input("email")} />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone" name="phone" error={errors.phone}>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+92 300 000 0000" autoComplete="tel" className={input("phone")} />
                </Field>
                <Field label="I'm interested in *" name="subject" error={errors.subject}>
                  <select id="subject" name="subject" value={form.subject} onChange={onChange} className={input("subject")}>
                    <option value="">Select an option</option>
                    {subjects.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Message *" name="message" error={errors.message}>
                <textarea id="message" name="message" value={form.message} onChange={onChange} placeholder="Tell us about your goals..." className={`${input("message")} min-h-36 resize-y`} />
              </Field>
              {sent && (
                <div role="status" className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3.5 text-emerald-300">
                  ✓ Thanks! Your message has been sent. We'll be in touch soon.
                </div>
              )}
              <div><Button type="submit">Send Message &rarr;</Button></div>
            </form>
          </Reveal>
        </div>
      </Section>

      <Section alt>
        <Reveal className="h-100 overflow-hidden rounded-2xl border border-line">
          <iframe
            title="FitZone location" loading="lazy"
            className="size-full border-0 [filter:grayscale(1)_invert(.92)_contrast(.9)]"
            src="https://www.openstreetmap.org/export/embed.html?bbox=74.330%2C31.500%2C74.370%2C31.525&layer=mapnik&marker=31.5125%2C74.350"
          />
        </Reveal>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHead eyebrow="FAQ" title="Frequently asked" accent="questions" />
          <Reveal>
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group mb-3 rounded-xl border border-line bg-card px-5 py-4.5">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-head font-bold">
                  {q}
                  <span className="text-2xl leading-none text-accent transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3.5 text-muted">{a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
