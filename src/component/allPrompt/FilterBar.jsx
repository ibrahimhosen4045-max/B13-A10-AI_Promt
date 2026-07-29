"use client";

import { motion } from "framer-motion";
import { Filter, Layers, Zap, Sparkles, DollarSign } from "lucide-react";

const CATEGORIES = [
  "All",
  "Writing",
  "Coding",
  "Marketing",
  "Business",
  "Education",
  "Image Generation",
  "Productivity",
  "Other",
];

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Pro"];

const AI_TOOLS = [
  "All",
  "ChatGPT",
  "Claude",
  "Gemini",
  "Midjourney",
  "DALL-E",
  "Stable Diffusion",
  "Other",
];

const PRICING_OPTIONS = ["All", "Free", "Premium"];

export default function FilterBar({ filters, setFilters, resetFilters, activeCount }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-3xl backdrop-blur-xl shadow-xl space-y-4"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Filters {activeCount > 0 && `(${activeCount})`}
          </span>
        </div>
        {activeCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
          >
            Reset Filters
          </button>
        )}
      </div>

      <div className=" grid grid-cols-2  md:flex md:flex-col  gap-3">
        {/* Category Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" /> Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full appearance-none px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-purple-500/50 cursor-pointer backdrop-blur-md transition"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* AI Tool Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" /> AI Tool
          </label>
          <select
            value={filters.aiTool}
            onChange={(e) => handleChange("aiTool", e.target.value)}
            className="w-full appearance-none px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500/50 cursor-pointer backdrop-blur-md transition"
          >
            {AI_TOOLS.map((tool) => (
              <option key={tool} value={tool}>
                {tool}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Difficulty
          </label>
          <select
            value={filters.difficulty}
            onChange={(e) => handleChange("difficulty", e.target.value)}
            className="w-full appearance-none px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500/50 cursor-pointer backdrop-blur-md transition"
          >
            {DIFFICULTIES.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>

        {/* Pricing Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Pricing
          </label>
          <select
            value={filters.pricing}
            onChange={(e) => handleChange("pricing", e.target.value)}
            className="w-full appearance-none px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-emerald-500/50 cursor-pointer backdrop-blur-md transition"
          >
            {PRICING_OPTIONS.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}