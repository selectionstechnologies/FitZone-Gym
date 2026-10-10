import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { plans } from "../data.js";

/* ---------- Bot brain: keyword-matched intents (no backend needed) ---------- */
const intents = [
  {
    keys: ["hi", "hello", "hey", "salam", "assalam", "good morning", "good evening"],
    reply: "Hey there! 👋 Great to see you. What can I help you with today?",
    quick: ["Membership prices", "Opening hours", "Free trial"],
  },
  {
    keys: ["price", "pricing", "cost", "fee", "plan", "membership", "package", "how much", "rate"],
    reply: `We have 3 simple plans — no joining fee, cancel anytime:\n${plans
      .map((p) => `• ${p.name}: $${p.price}/mo${p.featured ? " (most popular)" : ""}`)
      .join("\n")}`,
    link: { to: "/#pricing", label: "Compare plans" },
    quick: ["Free trial", "What's in Pro?", "Personal training"],
  },
  {
    keys: ["pro plan", "in pro", "pro include", "elite", "basic"],
    reply: plans.map((p) => `${p.name} ($${p.price}/mo): ${p.features.join(", ")}.`).join("\n\n"),
    quick: ["Free trial", "Contact the team"],
  },
  {
    keys: ["hour", "open", "close", "timing", "time", "24/7", "when"],
    reply: "🕒 Our opening hours:\n• Mon – Fri: open 24 hours\n• Saturday: 6:00 AM – 10:00 PM\n• Sunday: 8:00 AM – 8:00 PM",
    quick: ["Where are you located?", "Group classes"],
  },
  {
    keys: ["where", "location", "address", "located", "direction", "map", "parking"],
    reply: "📍 We're at 123 Fitness Avenue, Gulberg III, Lahore. Free member parking is available on site.",
    link: { to: "/contact", label: "Open map" },
    quick: ["Opening hours", "Free trial"],
  },
  {
    keys: ["trial", "free", "try", "guest", "pass", "visit", "tour"],
    reply: "🎉 Every new visitor gets a FREE 7-day pass with full gym and class access. Just send us your details and we'll set it up!",
    link: { to: "/contact", label: "Claim free pass" },
    quick: ["Membership prices", "Group classes"],
  },
  {
    keys: ["class", "yoga", "hiit", "spin", "boxing", "pilates", "crossfit", "zumba", "schedule"],
    reply: "We run 60+ classes every week, including HIIT, Spin, Yoga, Boxing, Pilates and CrossFit. Unlimited classes come with the Pro and Elite plans.",
    link: { to: "/gallery", label: "See our classes" },
    quick: ["Membership prices", "Meet the coaches"],
  },
  {
    keys: ["trainer", "coach", "personal", "pt", "team", "instructor"],
    reply: "💪 Our 25+ certified coaches cover strength, HIIT, yoga, boxing, nutrition and more. Every PT package starts with a free consultation and body assessment.",
    link: { to: "/team", label: "Meet the team" },
    quick: ["Free trial", "Nutrition help"],
  },
  {
    keys: ["diet", "nutrition", "meal", "weight loss", "lose weight", "fat", "muscle", "gain"],
    reply: "Our certified nutrition coach builds realistic meal plans for fat loss or muscle gain. A custom nutrition plan is included in the Elite plan.",
    quick: ["Membership prices", "Personal training"],
  },
  {
    keys: ["beginner", "first time", "new to", "never", "start"],
    reply: "Beginners are super welcome! You'll get a free fitness assessment and a beginner-friendly plan from one of our coaches. No judgement, ever. 🙌",
    quick: ["Free trial", "Personal training"],
  },
  {
    keys: ["shower", "locker", "towel", "facility", "equipment", "machine"],
    reply: "Our 15,000 sq ft facility has premium strength & cardio equipment, free weights, a turf track, a boxing ring, plus lockers, showers and towels.",
    link: { to: "/gallery", label: "View gallery" },
  },
  {
    keys: ["contact", "phone", "call", "email", "whatsapp", "number", "talk", "human"],
    reply: "📞 +92 300 000 0000\n✉️ hello@fitzonegym.com\nOr send us a message and we'll reply within a few hours.",
    link: { to: "/contact", label: "Contact form" },
  },
  {
    keys: ["cancel", "contract", "refund", "freeze"],
    reply: "No long-term contracts — all memberships are month-to-month and you can cancel anytime from the front desk or by email.",
  },
  {
    keys: ["thank", "thanks", "great", "awesome", "cool", "nice"],
    reply: "You're welcome! 😊 Anything else I can help with?",
    quick: ["Membership prices", "Free trial"],
  },
  {
    keys: ["bye", "goodbye", "see you", "later"],
    reply: "Bye for now! Keep crushing it. 💪 See you at FitZone!",
  },
];

const fallback = {
  reply: "Hmm, I'm not sure about that one. 🤔 I can help with memberships, hours, classes, trainers or the free trial — or you can reach our team directly.",
  link: { to: "/contact", label: "Contact the team" },
  quick: ["Membership prices", "Opening hours", "Free trial"],
};

function answer(text) {
  const t = text.toLowerCase();
  let best = null, score = 0;
  for (const intent of intents) {
    const s = intent.keys.reduce((n, k) => n + (new RegExp(`\\b${k}`).test(t) ? k.length : 0), 0);
    if (s > score) { best = intent; score = s; }
  }
  return best || fallback;
}

const welcome = {
  from: "bot",
  text: "Hi! I'm Zoey, FitZone's virtual assistant. 💪 Ask me about memberships, classes, hours or our free trial.",
  quick: ["Membership prices", "Opening hours", "Free trial", "Meet the coaches"],
};

/* ---------- UI ---------- */
function BotAvatar({ size = "size-9" }) {
  return (
    <span className={`grid ${size} flex-none place-items-center rounded-full bg-brand`}>
      <img src="/favicon.svg" alt="" className="size-[70%] brightness-0 invert" />
    </span>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([welcome]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(true);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) { setUnread(false); setTimeout(() => inputRef.current?.focus(), 250); }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(timer.current); };
  }, []);

  const send = (text) => {
    const msg = text.trim();
    if (!msg || typing) return;
    setInput("");
    setMessages((m) => [...m, { from: "user", text: msg }]);
    setTyping(true);
    const res = answer(msg);
    // Delay scales with reply length so it feels natural
    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: res.reply, link: res.link, quick: res.quick }]);
    }, Math.min(500 + res.reply.length * 8, 1600));
  };

  const reset = () => { clearTimeout(timer.current); setTyping(false); setMessages([welcome]); };
  const last = messages[messages.length - 1];

  return (
    <div className="fixed bottom-5 left-5 z-[55]">
      {/* Panel */}
      <div
        role="dialog"
        aria-label="FitZone chat assistant"
        aria-hidden={!open}
        className={`absolute bottom-[4.5rem] left-0 flex h-[min(560px,calc(100dvh-7rem))] w-[min(380px,calc(100vw-2.5rem))] origin-bottom-left flex-col overflow-hidden rounded-3xl border border-line bg-bg-alt shadow-2xl shadow-black/60 transition duration-300 ease-out ${
          open ? "visible scale-100 opacity-100" : "invisible pointer-events-none translate-y-4 scale-90 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-brand px-4 py-3.5">
          <BotAvatar size="size-10" />
          <div className="flex-1 leading-tight">
            <strong className="block font-head">Zoey · FitZone</strong>
            <span className="flex items-center gap-1.5 text-xs text-white/85">
              <span className="size-2 rounded-full bg-emerald-300" /> Online — replies instantly
            </span>
          </div>
          <button onClick={reset} title="Restart chat" aria-label="Restart chat" className="grid size-8 cursor-pointer place-items-center rounded-full transition hover:bg-white/20">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" /></svg>
          </button>
          <button onClick={() => setOpen(false)} aria-label="Close chat" className="grid size-8 cursor-pointer place-items-center rounded-full text-xl transition hover:bg-white/20">&times;</button>
        </div>

        {/* Messages */}
        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5">
          {messages.map((m, i) =>
            m.from === "bot" ? (
              <div key={i} className="chat-in flex items-end gap-2">
                <BotAvatar size="size-7" />
                <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-line bg-card px-3.5 py-2.5 text-sm whitespace-pre-line">
                  {m.text}
                  {m.link && (
                    <Link to={m.link.to} onClick={() => setOpen(false)} className="mt-2 block font-semibold text-accent hover:underline">
                      {m.link.label} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div key={i} className="chat-in flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-brand px-3.5 py-2.5 text-sm">{m.text}</div>
              </div>
            )
          )}

          {typing && (
            <div className="chat-in flex items-end gap-2">
              <BotAvatar size="size-7" />
              <div className="flex gap-1 rounded-2xl rounded-bl-md border border-line bg-card px-4 py-3.5" aria-label="Zoey is typing">
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </div>
            </div>
          )}

          {!typing && last.from === "bot" && last.quick && (
            <div className="chat-in flex flex-wrap gap-2 pl-9">
              {last.quick.map((q) => (
                <button key={q} onClick={() => send(q)}
                  className="cursor-pointer rounded-full border border-accent/50 px-3 py-1.5 text-xs font-semibold text-accent transition hover:bg-accent hover:text-white">
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-line bg-bg-alt p-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            aria-label="Message"
            tabIndex={open ? 0 : -1}
            className="min-w-0 flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-sm outline-none transition focus:border-accent"
          />
          <button type="submit" disabled={!input.trim() || typing} aria-label="Send" tabIndex={open ? 0 : -1}
            className="grid size-10 flex-none cursor-pointer place-items-center rounded-full bg-brand transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100">
            <svg viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
          </button>
        </form>
      </div>

      {/* Launcher */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="relative grid size-15 cursor-pointer place-items-center rounded-full bg-brand shadow-xl shadow-accent-2/40 transition duration-300 hover:scale-110"
      >
        {!open && unread && <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />}
        <span className={`absolute transition duration-300 ${open ? "scale-0 rotate-90 opacity-0" : "scale-100 opacity-100"}`}>
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1.9-4.6A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z" /><path d="M8 11h.01M12 11h.01M16 11h.01" /></svg>
        </span>
        <span className={`absolute text-3xl leading-none transition duration-300 ${open ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`}>&times;</span>
        {!open && unread && (
          <span className="absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full border-2 border-bg bg-emerald-400 text-[10px] font-bold text-bg">1</span>
        )}
      </button>
    </div>
  );
}
