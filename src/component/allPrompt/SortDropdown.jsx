"use client";

import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "A-Z", value: "alphabetical" },
  { label: "Most Copied", value: "mostCopied" },
  { label: "Highest Rated", value: "highestRated" },
];

export default function SortDropdown({ sortBy, setSortBy }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 self-end sm:self-auto"
    >
      <span className="text-xs font-medium text-slate-400 flex items-center gap-1 whitespace-nowrap">
        <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" /> Sort by:
      </span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="appearance-none px-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500/50 cursor-pointer backdrop-blur-md transition"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </motion.div>
  );
}