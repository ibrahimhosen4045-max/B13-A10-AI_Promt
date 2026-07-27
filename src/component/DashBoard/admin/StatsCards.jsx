"use client";

import { motion } from "framer-motion";
import { Layers, Clock, CheckCircle2, XCircle, Sparkles } from "lucide-react";

export default function StatsCards({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4"
    >
      {/* Total Prompts */}
      <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-3xl backdrop-blur-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-medium">Total Prompts</span>
          <Layers className="w-4 h-4 text-indigo-400" />
        </div>
        <p className="text-2xl font-black text-white">{stats.total}</p>
      </div>

      {/* Pending */}
      <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-3xl backdrop-blur-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-medium">Pending Review</span>
          <Clock className="w-4 h-4 text-amber-400" />
        </div>
        <p className="text-2xl font-black text-amber-400">{stats.pending}</p>
      </div>

      {/* Approved */}
      <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-3xl backdrop-blur-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-medium">Approved</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
        <p className="text-2xl font-black text-emerald-400">{stats.approved}</p>
      </div>

      {/* Rejected */}
      <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-3xl backdrop-blur-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-medium">Rejected</span>
          <XCircle className="w-4 h-4 text-rose-400" />
        </div>
        <p className="text-2xl font-black text-rose-400">{stats.rejected}</p>
      </div>

      {/* Premium */}
      <div className="col-span-2 lg:col-span-1 bg-slate-900/60 border border-slate-800/80 p-4 rounded-3xl backdrop-blur-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-medium">Premium</span>
          <Sparkles className="w-4 h-4 text-purple-400" />
        </div>
        <p className="text-2xl font-black text-purple-400">{stats.premium}</p>
      </div>
    </motion.div>
  );
}