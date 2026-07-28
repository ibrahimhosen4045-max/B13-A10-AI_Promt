"use client";

import { motion } from "framer-motion";
import { FolderSearch, RotateCcw } from "lucide-react";

export default function EmptyState({ resetFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-20 px-4 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto my-12"
    >
      <div className="p-5 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
        <FolderSearch className="w-12 h-12" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-white">No prompts found</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Try changing your filters or search keywords to explore other AI prompts.
        </p>
      </div>

      <button
        onClick={resetFilters}
        className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition"
      >
        <RotateCcw className="w-4 h-4" /> Reset All Filters
      </button>
    </motion.div>
  );
}