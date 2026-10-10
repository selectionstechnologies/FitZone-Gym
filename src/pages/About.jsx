import { timeline, img } from "../data.js";
import { Reveal, Counter, Button, Eyebrow, SectionHead, Section, Card, PageBanner, CtaBand, ImageWithBadge } from "../components/ui.jsx";
import { IconBox } from "../components/Icons.jsx";

const stats = [[2500, "+", "Happy Members"], [25, "+", "Certified Coaches"], [15000, "", "Sq Ft Facility"], [10, "+", "Years Experience"]];
const values = [
  { icon: "target", title: "Our Mission", text: "To help every member become the strongest, healthiest version of themselves through expert coaching and a supportive community." },
  { icon: "eye", title: "Our Vision", text: "To be the city's most trusted fitness community — where results, wellbeing and fun go hand in hand." },
  { icon: "heart", title: "Our Values", text: "Respect, consistency and integrity. No egos, no judgement — just people helping people get better every day." },
];

export default function About() {
  return (
    <>
      <PageBanner eyebrow="Our story" title="About" accent="FitZone" image={img("1571902943202-507ec2618e8f", 1920)} />

      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <ImageWithBadge src={img("1534438327276-14e5300c3a48", 1000)} alt="FitZone gym floor" value="2015" label="Founded" />
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl">Built by athletes, <span className="text-gradient">made for everyone</span></h2>
            <p className="mb-4 text-muted">FitZone started as a small garage gym with a handful of barbells and a big dream: to create a place where anyone — beginner or pro — feels welcome and supported.</p>
            <p className="mb-8 text-muted">Today we're a 15,000 sq ft training facility with a team of 25+ certified coaches, but our mission hasn't changed. We believe fitness should be motivating, judgement-free and fun.</p>
            <Button to="/team">Meet Our Coaches</Button>
          </Reveal>
        </div>
      </Section>

      <Section alt>
        <div className="grid grid-cols-2 gap-y-10 text-center md:grid-cols-4">
          {stats.map(([n, s, l]) => (
            <Reveal key={l}>
              <strong className="text-gradient block font-head text-4xl font-black sm:text-5xl"><Counter to={n} suffix={s} /></strong>
              <span className="text-muted">{l}</span>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="What drives us" title="Our mission &" accent="values" />
        <div className="grid gap-7 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title}>
              <IconBox name={v.icon} />
              <h3 className="mb-2 text-xl font-bold">{v.title}</h3>
              <p className="text-muted">{v.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section alt>
        <SectionHead eyebrow="Our journey" title="A decade of" accent="growth" />
        <div className="relative mx-auto max-w-3xl before:absolute before:inset-y-0 before:left-[19px] before:w-0.5 before:bg-line">
          {timeline.map((t) => (
            <Reveal key={t.year} className="relative mb-9 pl-16">
              <span className="absolute top-1 left-2.5 size-5 rounded-full bg-brand ring-6 ring-bg-alt" />
              <span className="font-head text-sm font-extrabold tracking-widest text-accent">{t.year}</span>
              <h3 className="mt-1 mb-1.5 text-xl font-bold">{t.title}</h3>
              <p className="text-muted">{t.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <CtaBand title="Become part of our story" text="Your first week is free. Let's get to work." button="Join FitZone" />
      </Section>
    </>
  );
}
