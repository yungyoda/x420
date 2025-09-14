"use client";

import * as React from "react";
import { motion } from "motion/react";
import AnimatedGradientBackground from "@/components/AnimatedGradientBackground";
import Navigation from "@/components/common/Navigation";
import LoadMoreButton from "@/components/LoadMoreButton";
import EntryCard from "@/components/EntryCard";
import { useBazaar } from "@/hooks/useBazaar";

export default function BazaarPage() {
  const {
    services,
    total,
    isLoading,
    hasMore,
    isLoadingMore,
    loadMore,
  } = useBazaar({ limit: 8 });

  const containerVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 },
    },
    closed: {
      opacity: 0,
      transition: { staggerChildren: 0.02, staggerDirection: -1 },
    },
  } as const;

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 8 },
  } as const;

  return (
    <div className="relative px-4 py-10 md:py-16 min-h-screen">
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Navigation />

        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight heading-gradient">
              x402 Bazaar
            </h1>
          </div>
          <div className="text-white/70">{total} services</div>
        </div>

        {isLoading ? (
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/70">Loading Bazaar services...</p>
          </div>
        ) : (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="open"
            animate="open"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.map((service, idx) => (
                <motion.div key={`${service.resource}-${idx}`} variants={itemVariants}>
                  {/* Reuse EntryCard for now by mapping to entry-like shape */}
                  <EntryCard
                    entry={{
                      id: service.resource,
                      title: service.metadata?.name as string || new URL(service.resource).hostname,
                      description: service.accepts[0].description || (service.metadata?.description as string) || service.resource,
                      amount: (() => {
                        const values = service.accepts
                          .map((a) => Number(a.maxAmountRequired))
                          .filter((n) => Number.isFinite(n));
                        const min = values.length ? Math.min(...values) : 0;
                        // amounts are atomic units for USDC (6 decimals) in many cases; show in USDC if plausible
                        return (min >= 1000 ? (min / 1_000_000).toFixed(2) : String(min));
                      })(),
                      wallet: (service.accepts?.[0]?.payTo as string) || "",
                      createdAt: service.lastUpdated || new Date().toISOString(),
                      expiresAt: null,
                    }}
                    metadata={{
                      network: service.accepts?.[0]?.network,
                      assetName: (service.accepts?.[0]?.extra as any)?.name,
                    }}
                    onCardClick={() => window.open(service.resource, "_blank")}
                  />
                </motion.div>
              ))}
            </div>

            <LoadMoreButton onLoadMore={loadMore} isLoading={isLoadingMore} hasMore={hasMore} />
          </motion.div>
        )}
      </div>
      <AnimatedGradientBackground />
    </div>
  );
}


