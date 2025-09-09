"use client";

import * as React from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  className?: string;
}

export default function LoadMoreButton({ 
  onLoadMore, 
  isLoading, 
  hasMore,
  className = "" 
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`text-center py-6 ${className}`}
      >
        <p className="text-white/60 text-sm">
          You've reached the end of the list
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`text-center py-6 ${className}`}
    >
      <Button
        onClick={onLoadMore}
        disabled={isLoading}
        variant="ghost"
        className="px-8 py-3"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Loading more...
          </div>
        ) : (
          'Load More APIs'
        )}
      </Button>
    </motion.div>
  );
}
