import { useCallback, useEffect, useState } from "react";
import { gallery, galleryFilters, img } from "../data.js";
import { Reveal, Img, SectionHead, Section, PageBanner, CtaBand } from "../components/ui.jsx";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(null);
  const items = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback((d) => setIndex((i) => (i + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [index, close, go]);

  const current = index !== null ? items[index] : null;
  const lbBtn = "absolute grid size-12 cursor-pointer place-items-center rounded-full bg-white/10 text-2xl transition hover:bg-accent";

  return (
    <>
      <PageBanner eyebrow="Inside FitZone" title="Our" accent="Gallery" image={img("1599058917212-d750089bc07e", 1920)} />

      <Section>
        <SectionHead eyebrow="Take a look around" title="Where the" accent="magic happens"
          text="Explore our facility, classes and community moments. Tap any photo to view it full size." />

        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {galleryFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`cursor-pointer rounded-full border px-5 py-2.5 font-head text-sm font-semibold transition ${
                filter === f.id ? "border-transparent bg-brand text-white" : "border-line bg-card text-muted hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((g, i) => (
            <Reveal
              as="button"
              key={g.id}
              onClick={() => setIndex(i)}
              className="group relative mb-5 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl bg-card text-left"
            >
              <Img src={img(g.id, 700)} alt={g.title} className="w-full transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-b from-transparent to-black/85 px-4 pt-10 pb-4 font-head font-bold opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {g.title}
              </span>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0!">
        <CtaBand title="See it in person" text="Book a free tour and your first workout is on us." button="Book a Tour" />
      </Section>

      {current && (
        <div role="dialog" aria-modal="true" aria-label="Image viewer" onClick={(e) => e.target === e.currentTarget && close()}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-6">
          <button className={`${lbBtn} top-5 right-5`} aria-label="Close" onClick={close}>&times;</button>
          <button className={`${lbBtn} left-5 max-sm:bottom-18 sm:top-1/2 sm:-translate-y-1/2`} aria-label="Previous" onClick={() => go(-1)}>&#8249;</button>
          <img src={img(current.id, 1600)} alt={current.title} className="max-h-[82vh] w-auto rounded-xl shadow-2xl" />
          <button className={`${lbBtn} right-5 max-sm:bottom-18 sm:top-1/2 sm:-translate-y-1/2`} aria-label="Next" onClick={() => go(1)}>&#8250;</button>
          <div className="absolute inset-x-0 bottom-6 text-center font-head font-semibold">{current.title}</div>
        </div>
      )}
    </>
  );
}
