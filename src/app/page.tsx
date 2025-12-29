"use client";
import { motion } from "framer-motion";
import { ArrowRight, Mail, NotebookPen, Sparkles, User2 } from "lucide-react";
import { PursuitsWidget } from "@/components/PursuitsWidget"; //

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
            &ldquo;In a world where ideas travel faster than consent, the law is not a cage for creativity — it is the agreement that makes creation worth the risk.&rdquo;
          </motion.h1>
          <p className="subtle max-w-2xl">
            Kayla Scullin JD, MA, MA, BA
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
              <p>I work at the intersection of art, history, and law, -drawn to the stories that objects/works/artifacts carry and the paths they take through time.  My background spans art history, archaeology, the art market, and most recently -intellectual property law.  What holds my attention the most are questions of provenance, authorship, and cultural responsibility -How meaning, ownership, and memory are protected and contested.  
                I often dissapear into research tangents or creating.</p>
            </div>
            <div className="card p-6">
              <p className="subtle mb-2">Highlights</p>
              <ul className="list-disc list-inside space-y-3">
                <li>New Enland Law · Concentrated Study: Intellectual Property Law Certificate</li>
                <li>New Enland Law · Activities and Societies: Art and Fashion Law Society. Intellectual Property Law Association.
                Study Abroad Program: Galway, Ireland · International Criminal Law and War Crimes</li>
                <li>https://www.linkedin.com/in/kaylascullin/</li>
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
                <ul className="space-y-5">
                  <li><strong>New England Law · J.D.</strong> · 2021-2025</li>
                  <li><strong>Sotheby's Institute of Art · M.A., Art Business</strong> · 2017-2018</li>
                  <li><strong>King's College London · M.A., Classical Art And Archeology</strong> · 2016-2017</li>
                  <li><strong>Pratt Institute · B.A., Art History and Cinema Studies</strong> · 2012-2015</li>
                  <li><strong>Massachusetts College of Art and Design</strong> · 2009-2011</li>
                </ul>
              </div>
              <div>
                <p className="subtle mb-1">Experience</p>
                <ul className="space-y-3">
                  <li><strong>Looted Art Restitution Project · Researcher</strong> · 2025-Present</li>
                  <li><strong>New England Law · Research Assistant</strong> · 2024-2025</li>
                  <li><strong>Institute of Contemporary Art Boston · VA Lead</strong> · 2021-2024</li>
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

              {/* ✅ Replaces your bullet list */}
              <PursuitsWidget />
            </div>

            <div className="card p-6">
              <p className="subtle mb-4">Current Interests</p>
              <p>Art Provenance</p>
              <p>Baroque, Pop Surrealism, Art Nouveau</p>
              <p>Running with my Partner or Puppy, Saoirse (She is a Carolina Husky mix)</p>
              <p>Reading, Crocheting, Baking, Tinctures, Painting: Acrylic, Oil, Watercolor, and other mediums</p>
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

            <form
              className="grid gap-3 max-w-xl"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const submitBtn = form.querySelector("button[type='submit']") as HTMLButtonElement | null;
                const data = new FormData(form);

                if (submitBtn) {
                  submitBtn.disabled = true;
                  submitBtn.textContent = "Sending…";
                }

                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: data.get("name"),
                      email: data.get("email"),
                      message: data.get("message"),
                      honey: data.get("honey"),
                    }),
                  });

                  const json = await res.json();

                  if (res.ok && json.ok) {
                    alert("Thanks! Your message was sent.");
                    form.reset();
                  } else {
                    alert(json?.error || "There was an error. Please try again.");
                  }
                } catch {
                  alert("Network error. Please try again.");
                } finally {
                  if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Send";
                  }
                }
              }}
            >
              <input
                type="text"
                name="honey"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <input
                name="name"
                className="bg-black/40 border border-zinc-800 rounded-xl px-4 py-3"
                placeholder="Your name"
                required
              />
              <input
                name="email"
                className="bg-black/40 border border-zinc-800 rounded-xl px-4 py-3"
                placeholder="Email"
                type="email"
                required
              />
              <textarea
                name="message"
                className="bg-black/40 border border-zinc-800 rounded-xl px-4 py-3"
                placeholder="Message"
                rows={5}
                required
              />
              <button type="submit" className="btn justify-center">Send</button>
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
