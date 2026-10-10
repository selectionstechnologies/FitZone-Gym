import { features, programs, plans, testimonials, img } from "../data.js";
import { Reveal, Counter, Img, Button, Eyebrow, SectionHead, Section, Card, CtaBand, CheckList, ImageWithBadge } from "../components/ui.jsx";
import { IconBox } from "../components/Icons.jsx";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="flex min-h-screen items-center bg-bg-alt bg-cover bg-center pt-36 pb-20"
        style={{ backgroundImage: `linear-gradient(100deg, rgba(13,14,18,.95) 25%, rgba(13,14,18,.55) 65%, rgba(13,14,18,.3)), url(${img("1534438327276-14e5300c3a48", 1920)})` }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Welcome to FitZone</Eyebrow>
            <h1 className="mb-5 text-5xl font-black uppercase sm:text-7xl">
              Train Hard.<br /><span className="text-gradient">Live Strong.</span>
            </h1>
            <p className="max-w-lg text-lg text-gray-300">
              Modern equipment, certified coaches and high-energy classes. Whether you're just starting out or chasing a new PR, we're with you every rep of the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact" className="max-sm:flex-1">Start Free Trial &rarr;</Button>
              <Button to="/about" variant="outline" className="max-sm:flex-1">Learn More</Button>
            </div>
            <div className="mt-14 flex flex-wrap gap-7 sm:gap-11">
              {[[2500, "Active Members"], [25, "Expert Coaches"], [60, "Weekly Classes"]].map(([n, l]) => (
                <div key={l}>
                  <strong className="block font-head text-4xl font-extrabold"><Counter to={n} suffix="+" /></strong>
                  <span className="text-sm text-muted">{l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <Section>
        <SectionHead eyebrow="Why choose us" title="Everything you need to" accent="reach your goals"
          text="We built FitZone around one idea: make great training simple, motivating and accessible to everyone." />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title}>
              <IconBox name={f.icon} />
              <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
              <p className="text-muted">{f.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* About preview */}
      <Section alt>
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <ImageWithBadge src={img("1571019614242-c5c5dee9f50b", 1000)} alt="Members training at FitZone" value="10+" label="Years of Excellence" />
          <Reveal>
            <Eyebrow>About FitZone</Eyebrow>
            <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl">More than a gym — <span className="text-gradient">a community</span></h2>
            <p className="text-muted">Since 2015, FitZone has helped thousands of people get stronger, healthier and more confident. Our coaches combine science-backed programming with genuine encouragement.</p>
            <CheckList items={["Free fitness assessment & personalised plan", "Nutrition guidance from certified dietitians", "Clean, spacious facility with lockers & showers", "Friendly community events every month"]} />
            <Button to="/about">Discover Our Story</Button>
          </Reveal>
        </div>
      </Section>

      {/* Programs */}
      <Section>
        <SectionHead eyebrow="Our programs" title="Find the training" accent="that fits you" />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Reveal as="article" key={p.title} className="group relative flex min-h-96 items-end overflow-hidden rounded-2xl bg-card">
              <Img src={p.img} alt={p.title} className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-black/90" />
              <div className="relative p-7">
                <span className="mb-3 inline-block rounded-full bg-brand px-3 py-1 font-head text-[.7rem] font-bold uppercase tracking-widest">{p.tag}</span>
                <h3 className="mb-1 text-2xl font-bold">{p.title}</h3>
                <p className="text-gray-300">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" alt>
        <SectionHead eyebrow="Membership plans" title="Simple pricing," accent="no surprises" text="No joining fee. Cancel anytime." />
        <div className="grid gap-7 md:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.name} className={`relative flex flex-col text-center ${p.featured ? "border-accent! bg-gradient-to-b from-accent/10 to-card to-60%" : ""}`}>
              {p.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 font-head text-[.7rem] font-bold uppercase tracking-widest">Most Popular</span>
              )}
              <h3 className="text-xl font-bold">{p.name}</h3>
              <div className="mt-4 mb-1 font-head text-5xl font-black">${p.price}<small className="text-base font-semibold text-muted">/mo</small></div>
              <ul className="my-7 grid flex-1 gap-3 text-muted">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <Button to="/contact" variant={p.featured ? "primary" : "outline"} className="w-full">Choose {p.name}</Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHead eyebrow="Testimonials" title="What our" accent="members say" />
        <div className="grid gap-7 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="relative">
              <span className="absolute top-2 right-6 font-serif text-8xl leading-none text-accent/25">&ldquo;</span>
              <div className="mb-3 tracking-widest text-amber-400">★★★★★</div>
              <p className="text-muted">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3.5">
                <Img src={`https://i.pravatar.cc/120?img=${t.avatar}`} alt="" className="size-13 rounded-full bg-line object-cover" />
                <div>
                  <strong className="block font-head">{t.name}</strong>
                  <span className="text-sm text-muted">Member since {t.since}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-0!">
        <CtaBand title="Ready to start your journey?" text="Claim your free 7-day pass today — no commitment required." button="Get Free Pass" />
      </Section>
    </>
  );
}
