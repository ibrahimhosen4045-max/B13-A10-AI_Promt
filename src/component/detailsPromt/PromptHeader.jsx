"use client";

import { motion } from "framer-motion";
import { Sparkles, Eye, Copy, Bookmark, Star, Layers, Zap, ShieldCheck } from "lucide-react";

export default function PromptHeader({ prompt }) {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "N/A";

  const creatorName = prompt.creatorName || prompt.userName || "Anonymous";
  const creatorAvatar = prompt.creatorAvatar || prompt.userAvatar;

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-3xl bg-slate-900/50 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            {prompt.isPremium && (
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border border-purple-400/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Premium
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
              <Layers className="w-3 h-3" /> {prompt.category || "General"}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              <Zap className="w-3 h-3" /> {prompt.aiTool || "ChatGPT"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 capitalize">
              {prompt.difficulty || "Intermediate"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 capitalize">
              {prompt.visibility || "Public"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            {prompt.title}
          </h1>

          {/* Creator & Meta */}
          <div className="flex items-center gap-3 pt-1">
            {creatorAvatar ? (
              <img
                src={creatorAvatar}
                alt={creatorName}
                className="w-9 h-9 rounded-full object-cover border border-slate-700"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs">
                {creatorName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="text-xs font-bold text-slate-200 flex items-center gap-1">
                {creatorName}
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p className="text-[11px] text-slate-500">
                Created on {formatDate(prompt.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
          <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-center space-y-0.5">
            <span className="text-xs text-slate-500 flex items-center justify-center gap-1">
              <Eye className="w-3.5 h-3.5 text-cyan-400" /> Views
            </span>
            <p className="text-base font-extrabold text-white">{prompt.viewCount ?? 0}</p>
          </div>
          <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-center space-y-0.5">
            <span className="text-xs text-slate-500 flex items-center justify-center gap-1">
              <Copy className="w-3.5 h-3.5 text-purple-400" /> Copies
            </span>
            <p className="text-base font-extrabold text-white">{prompt.copyCount ?? 0}</p>
          </div>
          <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-center space-y-0.5">
            <span className="text-xs text-slate-500 flex items-center justify-center gap-1">
              <Bookmark className="w-3.5 h-3.5 text-emerald-400" /> Bookmarks
            </span>
            <p className="text-base font-extrabold text-white">{prompt.bookmarkCount ?? 0}</p>
          </div>
          <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-center space-y-0.5">
            <span className="text-xs text-slate-500 flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Rating
            </span>
            <p className="text-base font-extrabold text-white">
              {prompt.averageRating ? prompt.averageRating.toFixed(1) : "0.0"}
            </p>
          </div>
        </div>
      </div>

      {/* Tags */}
      {prompt.tags && prompt.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
          {prompt.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950/80 text-slate-400 border border-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}