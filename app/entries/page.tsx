"use client";

import * as React from "react";
import { motion } from "motion/react";
import { usePaginatedEntries } from "@/hooks/usePaginatedEntries";
import EntryCard from "@/components/EntryCard";
import EntriesSortControls from "@/components/EntriesSortControls";
import LoadMoreButton from "@/components/LoadMoreButton";
import AnimatedGradientBackground from "@/components/AnimatedGradientBackground";
import Navigation from "@/components/common/Navigation";

export default function EntriesPage() {
  const { 
    entries, 
    pagination, 
    isLoading, 
    isLoadingMore, 
    hasMore, 
    loadMore, 
    changeSort, 
    currentSort 
  } = usePaginatedEntries();

  const containerVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 }
    },
    closed: {
      opacity: 0,
      transition: { staggerChildren: 0.02, staggerDirection: -1 }
    }
  } as const;

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 8 }
  } as const;

  if (isLoading) {
    return (
      <div className="relative px-4 py-10 md:py-16 min-h-screen">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Navigation />
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/70">Loading APIs...</p>
          </div>
        </div>
        <AnimatedGradientBackground />
      </div>
    );
  }

  return (
    <div className="relative px-4 py-10 md:py-16 min-h-screen">
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Navigation />
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight heading-gradient">
              All APIs
            </h1>
          </div>
          
          <EntriesSortControls
            currentSort={currentSort}
            onSortChange={changeSort}
            totalEntries={pagination?.total || 0}
          />
        </div>

        {/* Entries Grid */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="open"
          animate="open"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {entries.map((entry) => (
              <motion.div key={entry.id} variants={itemVariants}>
                <EntryCard entry={entry} />
              </motion.div>
            ))}
          </div>
          
          <LoadMoreButton
            onLoadMore={loadMore}
            isLoading={isLoadingMore}
            hasMore={hasMore}
          />
        </motion.div>
      </div>
      <AnimatedGradientBackground />
    </div>
  );
}
