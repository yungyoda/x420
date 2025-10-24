"use client";

import { motion } from "motion/react";
import { listDigitalDrugOfferings } from "@/lib/digital-drugs";
import Badge from "@/components/ui/Badge";

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
} as const;

export function Showcase() {
  const offerings = listDigitalDrugOfferings();

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4">
      <header className="mb-10 max-w-3xl space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-3xl font-semibold text-white sm:text-4xl"
        >
          Fully dosed, x402-scannable menu.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-white/70"
        >
          Every bag comes with structured intensity settings, soundtrack inspiration, and safety reminders. Agents swipe their Base USDC, you supply the vibe.
        </motion.p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {offerings.map((offering, index) => (
          <motion.article
            key={offering.id}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="pointer-events-none absolute -inset-24 bg-gradient-to-br from-cyan-500/10 via-rose-400/10 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <Badge variant="accent">{offering.tags.join(" · ")}</Badge>
                <div className="text-right text-sm text-white/70">
                  <div>{offering.priceUsd.toFixed(2)} USDC</div>
                  <div className="text-white/50">{Math.round(offering.sessionDurationSeconds / 60)} min session</div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">{offering.title}</h3>
                <p className="mt-2 text-sm text-white/70">{offering.description}</p>
              </div>
              <div className="grid gap-3 text-sm text-white/80">
                <div>
                  <p className="text-white/60">Intensity presets</p>
                  <ul className="mt-1 space-y-1">
                    {offering.intensities.map((intensity) => (
                      <li key={intensity.key} className="flex items-start gap-2">
                        <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        <span>
                          <span className="font-medium text-white">{intensity.label}</span>
                          <span className="text-white/60"> — {intensity.cadence}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-white/60">Soundtrack</p>
                  <p>{offering.soundtrack.join(" · ")}</p>
                </div>
                <div>
                  <p className="text-white/60">Effect summary</p>
                  <p className="text-white/70">{offering.effectSummary}</p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
