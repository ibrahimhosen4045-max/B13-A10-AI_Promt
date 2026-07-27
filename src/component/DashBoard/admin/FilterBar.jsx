"use client";

import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
    >
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by prompt title, creator name, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-10 py-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 backdrop-blur-md transition shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      <div className="relative w-full sm:w-56">
        <Filter className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full appearance-none pl-11 pr-10 py-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-sm font-medium text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 cursor-pointer backdrop-blur-md transition shadow-inner"
        >
          <option value="All">All Categories / Status</option>
          <option value="Pending">Pending Review</option>
          <option value="Approved">Approved Prompts</option>
          <option value="Rejected">Rejected Prompts</option>
          <option value="Premium">Premium Only</option>
          <option value="Free">Free Only</option>
        </select>
      </div>
    </motion.div>
  );
}