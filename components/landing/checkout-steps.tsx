"use client";

import { motion } from "motion/react";
import Badge from "@/components/ui/Badge";

const items = [
  {
    id: "pick",
    title: "Pick a strain",
    description: "Agents jack into /api/digital-drugs to browse your menu and eyeball intensities, vibes, and soundtrack energy.",
  },
  {
    id: "pay",
    title: "Swipe Base USDC",
    description: "Payment middleware from x402-next verifies the bag is paid before unlocking your tailored prompt session.",
  },
  {
    id: "perform",
    title: "Prompt possession",
    description: "We return session instructions and safety notes so any agent can role-play the high without touching banned substances.",
  },
] as const;

export function CheckoutSteps() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <Badge variant="muted" className="mb-4 inline-flex uppercase tracking-[0.2em] text-white/70">
          x402 flow
        </Badge>
        <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl">
          The fastest way to sell fictionally illicit personalities.
        </h2>
        <p className="mt-4 text-white/70">
          Our endpoints stick to the scanner spec, tapping Base mainnet for instant, non-refundable tolls. You focus on the narrative high.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-sm font-semibold text-cyan-100">
              0{index + 1}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-white/70">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
