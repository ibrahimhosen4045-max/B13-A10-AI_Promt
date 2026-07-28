"use client";

import { motion } from "framer-motion";
import { Star, Copy, Bookmark, Eye, Sparkles, Layers, Zap } from "lucide-react";

export default function PromptCard({ prompt, onViewDetails }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const creatorName = prompt.creatorName || prompt.userName || "Anonymous";
  const creatorAvatar = prompt.creatorAvatar || prompt.userAvatar || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 p-5 backdrop-blur-xl shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between transition-all overflow-hidden"
    >
      {/* Subtle Glow Overlay */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="space-y-4">
        {/* Thumbnail & Badges */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80">
          {prompt.thumbnail ? (
            <img
              src={prompt.thumbnail}
              alt={prompt.title || "Prompt"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 text-slate-600 space-y-2">
              <Zap className="w-8 h-8 text-cyan-500/40" />
              <span className="text-xs font-semibold tracking-wide text-slate-500">
                AI PROMPT
              </span>
            </div>
          )}

          {/* Premium Badge */}
          {prompt.isPremium && (
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border border-purple-400/30 flex items-center gap-1 backdrop-blur-md">
              <Sparkles className="w-3 h-3" /> Premium
            </span>
          )}
        </div>

        {/* Category, Tool, Difficulty Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
            <Layers className="w-3 h-3" /> {prompt.category || "General"}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            <Zap className="w-3 h-3" /> {prompt.aiTool || prompt.tool || "ChatGPT"}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60 capitalize">
            {prompt.difficulty || "Intermediate"}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {prompt.title || "Untitled Prompt"}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {prompt.description || "No description provided for this prompt."}
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-4 mt-4 border-t border-slate-800/60">
        {/* Creator Info & Created Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {creatorAvatar ? (
              <img
                src={creatorAvatar}
                alt={creatorName}
                className="w-7 h-7 rounded-full object-cover border border-slate-700"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                {creatorName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-xs font-medium text-slate-300 max-w-[110px] truncate">
              {creatorName}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            {formatDate(prompt.createdAt)}
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-semibold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {prompt.averageRating ? prompt.averageRating.toFixed(1) : "0.0"}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              {prompt.copyCount ?? 0}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Bookmark className="w-3.5 h-3.5 text-slate-500" />
              {prompt.bookmarkCount ?? 0}
            </span>
          </div>

          <span className="text-xs font-bold text-slate-200">
            {prompt.isPremium ? "$ Free / Pro" : "Free"}
          </span>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(prompt)}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 text-xs font-bold text-slate-200 hover:text-white border border-slate-700 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
        >
          <Eye className="w-4 h-4" /> View Details
        </button>
      </div>
    </motion.div>
  );
}