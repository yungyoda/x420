"use client";

import { motion } from "motion/react";
import { formatUsdLabel, listDigitalDrugOfferings } from "@/lib/digital-drugs";

export function PricingTicker() {
  const offerings = listDigitalDrugOfferings();

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-0 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <div className="relative flex items-center">
          <motion.div
            initial={{ x: "-20%" }}
            animate={{ x: "0%" }}
            transition={{ repeat: Infinity, repeatType: "mirror", duration: 12, ease: "linear" }}
            className="flex w-full flex-nowrap items-center gap-10 whitespace-nowrap px-8 py-4 text-sm uppercase tracking-[0.3em] text-white/70"
          >
            {offerings.flatMap((offering) => (
              <span key={`${offering.id}-ticker`} className="flex items-center gap-4">
                <span>{offering.slug}</span>
                <span className="text-white/40">•</span>
                <span>{formatUsdLabel(offering.priceUsd)}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
