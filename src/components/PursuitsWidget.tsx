"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// =====================
// Types
// =====================
type Pursuit = {
  id: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  previewImage: { src: string; alt: string };
  details: {
    overview: string;
    bullets?: string[];
    status?: string;
    nextSteps?: string[];
    links?: { label: string; href: string }[];
    gallery?: { src: string; alt: string }[];
  };
};

// =====================
// Data (edit to add projects)
// =====================
const pursuitsSeed: Pursuit[] = [
  {
    id: "Victorian Cast Iron Restoration",
    title: "Victorian Cast Iron Restoration",
    subtitle: "In progress",
    shortDescription:
      "Victorian Cast Iron Plant or Fern Stand, likely dating from the 1880s to the 1890s.",
    previewImage: {
      src: "/pursuits/castIronFernTable1.jpg",
      alt: "Cast Iron Fern Table",
    },
    details: {
      overview:
        "More in depth description",
      bullets: [
        "Dated: Approximately 1880s to the 1890s",
        "Metal: Cast Iron",
        "Manufacturer: unkown",
      ],
      nextSteps: [
        "Strip old paint",
        "Treat rust",
        "Maybe paint?",
        "Wax"
      ],
      gallery: [
        { src: "/pursuits/castIronFernTable1.jpg", alt: "Cast Iron Fern Table" }
      ],
    },
  },
];

// =====================
// Helpers
// =====================
function useLockBodyScroll(locked: boolean) {
  React.useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

// =====================
// Component
// =====================
export function PursuitsWidget({
  items = pursuitsSeed,
  heightClassName = "h-[22rem]",
}: {
  items?: Pursuit[];
  heightClassName?: string;
}) {
  const [active, setActive] = React.useState<Pursuit | null>(null);

  // ESC key closes overlay
  React.useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useLockBodyScroll(Boolean(active));

  return (
    <>
      {/* Scrollable embedded widget */}
      <div className={`overflow-auto pr-1 ${heightClassName}`}>
        <div className="space-y-3">
          {items.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="group w-full text-left"
              aria-label={`Open details for ${p.title}`}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-3 flex gap-3">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={p.previewImage.src}
                    alt={p.previewImage.alt}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-medium truncate">{p.title}</p>
                  <p className="text-sm text-white/70 line-clamp-2 mt-1">
                    {p.shortDescription}
                  </p>
                  <p className="text-xs text-white/50 mt-2 group-hover:text-white/70 transition">
                    Click to expand →
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <button
              className="absolute inset-0 bg-black/70"
              onClick={() => setActive(null)}
              aria-label="Close overlay"
            />

            {/* Panel */}
            <motion.div
              className="relative h-full overflow-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            >
              <div className="mx-auto max-w-5xl p-6">
                <div className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl overflow-hidden">
                  {/* Header */}
                  <div className="p-6 border-b border-white/10 flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold">{active.title}</h3>
                      <p className="text-white/70 mt-1">
                        {active.shortDescription}
                      </p>
                    </div>
                    <button
                      onClick={() => setActive(null)}
                      className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/10 transition"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-6">
                    <p className="text-white/70 leading-relaxed">
                      {active.details.overview}
                    </p>

                    {active.details.bullets && (
                      <ul className="list-disc list-inside text-white/70 space-y-1">
                        {active.details.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}

                    {active.details.gallery && (
                      <div className="grid sm:grid-cols-2 gap-3">
                        {active.details.gallery.map((img) => (
                          <div
                            key={img.src}
                            className="relative aspect-video rounded-2xl overflow-hidden border border-white/10"
                          >
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
