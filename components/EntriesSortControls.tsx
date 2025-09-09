"use client";

import * as React from "react";
import { motion } from "motion/react";
import Select from "@/components/ui/Select";
import type { GetEntriesParams } from "@/lib/api";

interface EntriesSortControlsProps {
  currentSort: GetEntriesParams['sort'];
  onSortChange: (sort: GetEntriesParams['sort']) => void;
  totalEntries: number;
  className?: string;
}

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'amount_desc', label: 'Price: High to Low' },
  { value: 'amount_asc', label: 'Price: Low to High' },
] as const;

export default function EntriesSortControls({ 
  currentSort, 
  onSortChange, 
  totalEntries,
  className = "" 
}: EntriesSortControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${className}`}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-white">
          Available APIs
        </h3>
        <span className="text-sm text-white/60">
          ({totalEntries} {totalEntries === 1 ? 'entry' : 'entries'})
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm text-white/70">
          Sort by:
        </label>
        <Select
          id="sort-select"
          value={currentSort || 'newest'}
          onChange={(e) => onSortChange(e.target.value as GetEntriesParams['sort'])}
          className="min-w-[160px]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    </motion.div>
  );
}
