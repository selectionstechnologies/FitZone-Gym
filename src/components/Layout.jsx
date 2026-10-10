import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { navLinks } from "../data.js";
import { Button } from "./ui.jsx";
import { Socials } from "./Icons.jsx";
import Chatbot from "./Chatbot.jsx";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls = ({ isActive }) =>
    `relative block py-3 font-head font-semibold transition md:py-1.5 md:text-[.95rem] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand after:transition-all after:duration-300 max-md:after:hidden ${
      isActive ? "text-accent md:text-white after:w-full" : "text-gray-300 hover:text-white after:w-0 hover:after:w-full"
    }`;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 h-19 transition duration-300 ${scrolled || open ? "bg-bg/95 shadow-[0_1px_0_var(--color-line)] md:backdrop-blur-md" : ""}`}>
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link to="/" className="relative z-10"><img src="/logo.svg" alt="FitZone Gym" className="h-9.5 sm:h-11.5" /></Link>

        {open && <div className="fixed inset-0 bg-black/50 md:hidden" onClick={() => setOpen(false)} />}
        <ul
          className={`flex items-center gap-8 max-md:fixed max-md:inset-y-0 max-md:right-0 max-md:w-[min(320px,85vw)] max-md:flex-col max-md:items-start max-md:gap-1 max-md:bg-bg-alt max-md:px-8 max-md:pt-24 max-md:shadow-2xl max-md:transition-transform max-md:duration-300 ${
            open ? "" : "max-md:translate-x-full"
          }`}
        >
          {navLinks.map((l) => (
            <li key={l.to} className="max-md:w-full">
              <NavLink to={l.to} end className={linkCls}>{l.label}</NavLink>
            </li>
          ))}
          <li className="max-md:mt-3"><Button to="/contact" className="px-6! py-2.5!">Join Now</Button></li>
        </ul>

        <button
          className="relative z-10 grid size-11 place-items-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`absolute h-0.5 w-6 rounded bg-white transition ${open ? "rotate-45" : "-translate-y-2"}`} />
          <span className={`absolute h-0.5 w-6 rounded bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`absolute h-0.5 w-6 rounded bg-white transition ${open ? "-rotate-45" : "translate-y-2"}`} />
        </button>
      </nav>
    </header>
  );
}

function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="border-t border-line bg-[#08090c] pt-18">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <img src="/logo.svg" alt="FitZone Gym" className="mb-4 h-11" />
          <p className="mb-4 text-muted">Train hard, live strong. Your fitness journey starts at FitZone.</p>
          <Socials />
        </div>
        <div>
          <h4 className="mb-5 font-bold">Quick Links</h4>
          <ul className="grid gap-2.5 text-muted">
            {navLinks.map((l) => <li key={l.to}><Link to={l.to} className="transition hover:text-accent">{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-5 font-bold">Opening Hours</h4>
          <ul className="grid gap-2.5 text-muted">
            <li>Mon – Fri: 24 hours</li>
            <li>Saturday: 6am – 10pm</li>
            <li>Sunday: 8am – 8pm</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-5 font-bold">Newsletter</h4>
          <p className="mb-3 text-muted">Get workout tips and exclusive offers in your inbox.</p>
          <form className="flex" onSubmit={(e) => { e.preventDefault(); e.target.reset(); setSubscribed(true); }}>
            <input
              type="email" required aria-label="Email"
              placeholder={subscribed ? "Thanks for subscribing!" : "Your email"}
              className="min-w-0 flex-1 rounded-l-xl border border-r-0 border-line bg-card px-3.5 py-3 outline-none focus:border-accent"
            />
            <button className="cursor-pointer rounded-r-xl bg-brand px-5 font-bold">Join</button>
          </form>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-wrap justify-between gap-2.5 border-t border-line px-4 py-5 text-sm text-muted sm:px-6">
        <span>&copy; {new Date().getFullYear()} FitZone Gym. All rights reserved.</span>
        <span>123 Fitness Avenue, Lahore</span>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-5 bottom-5 z-40 size-12 cursor-pointer rounded-full bg-brand text-xl shadow-2xl transition duration-300 ${show ? "opacity-100" : "pointer-events-none translate-y-5 opacity-0"}`}
    >
      &uarr;
    </button>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <BackToTop />
      <Chatbot />
    </>
  );
}
