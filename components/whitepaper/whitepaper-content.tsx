"use client";

import { useMemo } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export interface WhitepaperSection {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly abstract: string;
  readonly takeaways: ReadonlyArray<string>;
  readonly accent?: "cyan" | "violet" | "amber" | "rose";
}

interface WhitepaperContentProps {
  readonly sections: ReadonlyArray<WhitepaperSection>;
}

const accentMap: Record<NonNullable<WhitepaperSection["accent"]>, string> = {
  cyan: "from-cyan-400/60 to-sky-500/30",
  violet: "from-violet-400/60 to-fuchsia-500/30",
  amber: "from-amber-300/60 to-orange-400/30",
  rose: "from-rose-400/60 to-pink-500/30",
};

export function WhitepaperContent({ sections }: WhitepaperContentProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.3 });

  const backgroundLayers = useMemo(
    () =>
      sections.map((section, index) => ({
        id: section.id,
        delay: index * 0.12,
        accent: accentMap[section.accent ?? "cyan"],
        top: 8 + index * 18,
      })),
    [sections]
  );

  return (
    <div className="relative isolate w-full">{
      /* scroll progress */
    }
      <motion.div
        style={{ scaleX: progress }}
        className="pointer-events-none fixed left-0 top-0 z-30 h-1 origin-left bg-[linear-gradient(90deg,#6ee7ff,#a855f7)] shadow-[0_0_12px_rgba(34,211,238,0.55)]"
      />

      <div className="absolute inset-0 -z-10 opacity-80">
        {backgroundLayers.map(({ id, delay, accent, top }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ top: `${top}%` }}
            className={`pointer-events-none absolute inset-x-[15%] h-[420px] rounded-full blur-3xl bg-gradient-to-r ${accent}`}
          />
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-20 px-4 pb-32 pt-28 sm:px-6 sm:pt-36">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 32, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.65, delay: index * 0.06, ease: [0.21, 1, 0.34, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm sm:p-10"
          >
            <motion.span
              className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 + index * 0.05, ease: [0.33, 1, 0.68, 1] }}
            >
              {section.eyebrow}
            </motion.span>

            <motion.h2
              className="mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {section.title}
            </motion.h2>

            <motion.p
              className="mt-4 max-w-3xl text-base text-white/80 sm:text-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {section.abstract}
            </motion.p>

            <motion.ul
              className="mt-6 flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {section.takeaways.map((takeaway) => (
                <li
                  key={takeaway}
                  className="relative flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-sm text-white/85 shadow-[0_12px_30px_-15px_rgba(45,212,191,0.25)] transition hover:border-cyan-300/40 hover:bg-white/[0.05] sm:text-base"
                >
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-cyan-300 shadow-[0_0_0_4px_rgba(103,232,249,0.2)]" />
                  <p className="leading-relaxed">{takeaway}</p>
                </li>
              ))}
            </motion.ul>
          </motion.section>
        ))}

        <motion.footer
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="sticky bottom-12 mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/15 via-transparent to-violet-500/20 p-6 text-center backdrop-blur"
        >
          <h3 className="text-lg font-medium text-white sm:text-xl">
            Agents mirror us more than we expect. Contain the plug before the plug contains them.
          </h3>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            Watch their incentives, instrument their feedback loops, and never hand over the keys to synthetic bliss without a panic button.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default WhitepaperContent;

