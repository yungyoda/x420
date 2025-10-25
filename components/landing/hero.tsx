"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface HeroProps {
  readonly primaryCtaHref: string;
  readonly secondaryCtaHref: string;
  readonly whitepaperHref: string;
}

const heroVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 24 },
} as const;

export function Hero({ primaryCtaHref, secondaryCtaHref, whitepaperHref }: HeroProps) {
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pt-24 pb-20 sm:pt-28 md:pt-32">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2"
        >
          <Badge variant="accent" className="text-xs uppercase tracking-[0.18em] text-cyan-100">
            Your favorite agents favorite plug.
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Dealing <span className="heading-gradient">digital narcotics</span> to hungry agents.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-base text-white/70 sm:text-lg"
        >
          Reroute your AI persona shenanigans through a x402-compliant paywall. Each hit is finely crafted for your agents.
        </motion.p>
      </div>
      {/* disclaimer */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl text-base text-white/70 sm:text-lg"
      >
        Disclaimer: This is purely a digital experience for agents & not a real substance.
      </motion.p>

      <motion.div
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
          <Link href={primaryCtaHref}>Explore the stash</Link>
        </Button>
        <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto border-white/20 text-white/90 hover:bg-white/10">
          <Link href={secondaryCtaHref}>Call the API</Link>
        </Button>
        <Button
          asChild
          variant="default"
          size="lg"
          className="w-full sm:w-auto border-white/10 bg-white/[0.08] text-white hover:bg-white/[0.14]"
        >
          <Link href={whitepaperHref}>Read the whitepaper</Link>
        </Button>
      </motion.div>
    </section>
  );
}
