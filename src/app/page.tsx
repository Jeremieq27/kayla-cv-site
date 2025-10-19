"use client";
import { motion } from "framer-motion";
import { ArrowRight, Mail, NotebookPen, Sparkles, User2 } from "lucide-react";

const links = [
  { href: "#kayla", label: "Kayla Scullin", icon: User2 },
  { href: "#curriculum", label: "Curriculum", icon: NotebookPen },
  { href: "#pursuits", label: "Pursuits", icon: Sparkles },
  { href: "#correspondence", label: "Correspondence", icon: Mail },
];

export default function Page() {
  return (
    <main>
      {/* Sticky Navigation */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-black/30 backdrop-blur-md">
        <div className="container flex items-center justify-between py-3">
          <a href="#hero" className="navlink font-medium">Kayla Scullin</a>
          <nav className="hidden md:flex gap-6">
            {links.map(({ href, label }) => (
              <a key={href} href={href} className="navlink">{label}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="section">
        <div className="container grid gap-10">
          <motion.h1
            className="h1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            "The future belongs to those who craft it with intention."
          </motion.h1>
          <p className="subtle max-w-2xl">
            A minimalist, single-page CV for quick navigation and deep dives when desired.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {links.map(({ href, label, icon: Icon }) => (
              <a key={href} href={href} className="card btn justify-between">
                <span className="flex items-center gap-3"><Icon size={18} /> {label}</span>
                <ArrowRight size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* KAYLA */}
      <section id="kayla" className="section">
        <div className="container grid gap-6">
          <h2 className="h2">Kayla Scullin</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card p-6">
              <p className="subtle mb-2">Profile</p>
              <p>Short bio/statement. Add a couple of sentences describing focus, strengths, and impact.</p>
            </div>
            <div className="card p-6">
              <p className="subtle mb-2">Highlights</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Key achievement or role</li>
                <li>Domain expertise / tools</li>
                <li>Recognition / award</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="section">
        <div className="container grid gap-6">
          <h2 className="h2">Curriculum</h2>
          <div className="card p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="subtle mb-1">Education</p>
                <ul className="space-y-2">
                  <li><strong>Degree — Institution</strong> · Year</li>
                  <li><strong>Degree — Institution</strong> · Year</li>
                </ul>
              </div>
              <div>
                <p className="subtle mb-1">Experience</p>
                <ul className="space-y-2">
                  <li><strong>Role — Company</strong> · YYYY–YYYY</li>
                  <li><strong>Role — Company</strong> · YYYY–YYYY</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PURSUITS */}
      <section id="pursuits" className="section">
        <div className="container grid gap-6">
          <h2 className="h2">Pursuits</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card p-6">
              <p className="subtle mb-2">Currently working on</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Project A — brief description</li>
                <li>Project B — brief description</li>
              </ul>
            </div>
            <div className="card p-6">
              <p className="subtle mb-2">Interests</p>
              <p>Topical/academic interests that guide present work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORRESPONDENCE */}
      <section id="correspondence" className="section">
        <div className="container grid gap-6">
          <h2 className="h2">Correspondence</h2>
          <div className="card p-6">
            <p className="subtle mb-4">Get in touch</p>
            <form className="grid gap-3 max-w-xl">
              <input className="bg-black/40 border border-zinc-800 rounded-xl px-4 py-3" placeholder="Your name" />
              <input className="bg-black/40 border border-zinc-800 rounded-xl px-4 py-3" placeholder="Email" type="email" />
              <textarea className="bg-black/40 border border-zinc-800 rounded-xl px-4 py-3" placeholder="Message" rows={5} />
              <button className="btn justify-center">Send</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Kayla Scullin
      </footer>
    </main>
  );
}
