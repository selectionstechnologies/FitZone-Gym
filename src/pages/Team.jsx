import { team, img } from "../data.js";
import { Reveal, Img, Button, Eyebrow, SectionHead, Section, PageBanner, CtaBand, CheckList, ImageWithBadge } from "../components/ui.jsx";
import { Socials } from "../components/Icons.jsx";

export default function Team() {
  return (
    <>
      <PageBanner eyebrow="Meet the experts" title="Our" accent="Team" image={img("1540497077202-7c8a3999166f", 1920)} />

      <Section>
        <SectionHead eyebrow="Certified coaches" title="The people behind" accent="your progress"
          text="Our coaches hold international certifications and bring years of hands-on experience in strength, conditioning, nutrition and wellness." />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <Reveal key={m.name} className="group overflow-hidden rounded-2xl border border-line bg-card transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40">
              <div className="relative aspect-[4/4.4] overflow-hidden bg-line">
                <Img src={`https://i.pravatar.cc/500?img=${m.avatar}`} alt={`${m.name}, ${m.role}`} className="size-full object-cover transition duration-700 group-hover:scale-105" />
                <Socials
                  only={["Facebook", "Instagram", "X"]}
                  itemClass="bg-white/15 backdrop-blur-sm"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 transition duration-300 md:translate-y-5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                />
              </div>
              <div className="px-6 pt-5 pb-6 text-center">
                <h3 className="mb-1 text-xl font-bold">{m.name}</h3>
                <div className="mb-2.5 text-sm font-semibold text-accent">{m.role}</div>
                <p className="text-sm text-muted">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section alt>
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Personal training</Eyebrow>
            <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl">Train one-on-one with <span className="text-gradient">a pro</span></h2>
            <p className="text-muted">Get a coach who knows your goals, corrects your form and keeps you accountable. Every personal training package starts with a free consultation and body assessment.</p>
            <CheckList items={["Custom programme updated every 4 weeks", "Progress tracking & monthly check-ins", "Flexible scheduling, morning to late night"]} />
            <Button to="/contact">Book a Free Consultation</Button>
          </Reveal>
          <ImageWithBadge src={img("1581009146145-b5ef050c2e1e", 1000)} alt="Coach training a member" value="98%" label="Client Satisfaction" />
        </div>
      </Section>

      <Section>
        <CtaBand title="Want to join our team?" text="We're always looking for passionate, certified coaches." button="Apply Now" />
      </Section>
    </>
  );
}
