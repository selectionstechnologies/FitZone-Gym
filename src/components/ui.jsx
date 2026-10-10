import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* Fades children in when scrolled into view */
export function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

/* Counts up from 0 when visible */
export function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 1600, 1);
        setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* Image with branded placeholder on error */
const placeholder = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#1a1d25"/><path d="M200 115l35 20v40l-35 20-35-20v-40z" fill="#ff6b2c" opacity=".6"/></svg>'
);
export function Img(props) {
  return <img loading="lazy" {...props} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholder; }} />;
}

const btnBase = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-head text-[.95rem] font-bold tracking-wide transition duration-300 cursor-pointer";
const variants = {
  primary: "bg-brand text-white shadow-lg shadow-accent-2/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-2/40",
  outline: "border-2 border-white/35 text-white hover:bg-white hover:text-bg",
  white: "bg-white text-accent-2 hover:-translate-y-1",
};
export function Button({ to, variant = "primary", className = "", children, ...rest }) {
  const cls = `${btnBase} ${variants[variant]} ${className}`;
  return to ? <Link to={to} className={cls}>{children}</Link> : <button className={cls} {...rest}>{children}</button>;
}

export const Eyebrow = ({ children }) => (
  <span className="mb-3.5 inline-block font-head text-xs font-bold uppercase tracking-[.2em] text-accent">{children}</span>
);

export function SectionHead({ eyebrow, title, accent, text }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl">{title} <span className="text-gradient">{accent}</span></h2>
      {text && <p className="text-muted">{text}</p>}
    </Reveal>
  );
}

export const Section = ({ id, alt, className = "", children }) => (
  <section id={id} className={`scroll-mt-19 py-18 md:py-24 ${alt ? "bg-bg-alt" : ""} ${className}`}>
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">{children}</div>
  </section>
);

export const Card = ({ className = "", children }) => (
  <Reveal className={`rounded-2xl border border-line bg-card p-8 transition duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-2xl hover:shadow-black/40 ${className}`}>
    {children}
  </Reveal>
);

export function PageBanner({ eyebrow, title, accent, image }) {
  return (
    <section
      className="bg-bg-alt bg-cover bg-center pt-44 pb-20 text-center"
      style={{ backgroundImage: `linear-gradient(rgba(13,14,18,.82), rgba(13,14,18,.92)), url(${image})` }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mb-3 text-4xl font-black uppercase sm:text-6xl">{title} <span className="text-gradient">{accent}</span></h1>
        <p className="text-muted"><Link to="/" className="text-accent">Home</Link> / {title} {accent}</p>
      </div>
    </section>
  );
}

export function CtaBand({ title, text, button, to = "/contact" }) {
  return (
    <Reveal className="flex flex-wrap items-center justify-center gap-7 rounded-3xl bg-brand px-7 py-11 text-center shadow-2xl shadow-black/40 sm:justify-between sm:px-12 sm:py-16 sm:text-left">
      <div>
        <h2 className="mb-2 text-2xl font-extrabold sm:text-4xl">{title}</h2>
        <p className="text-white/90">{text}</p>
      </div>
      <Button to={to} variant="white">{button} &rarr;</Button>
    </Reveal>
  );
}

export function CheckList({ items }) {
  return (
    <ul className="my-6 grid gap-3">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <span className="grid size-6 flex-none place-items-center rounded-full bg-accent/15 text-xs font-extrabold text-accent">✓</span>
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ImageWithBadge({ src, alt, value, label }) {
  return (
    <Reveal className="relative">
      <Img src={src} alt={alt} className="aspect-[4/3.4] w-full rounded-2xl bg-card object-cover" />
      <div className="absolute right-3 bottom-3 rounded-2xl bg-brand px-6 py-5 text-center shadow-2xl md:-right-5 md:-bottom-5">
        <strong className="block font-head text-4xl font-black leading-none">{value}</strong>
        <span className="text-sm font-semibold">{label}</span>
      </div>
    </Reveal>
  );
}
