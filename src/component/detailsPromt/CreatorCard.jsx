"use client";

import { ShieldCheck, Eye, Copy, Bookmark, Star } from "lucide-react";

export default function CreatorCard({ prompt }) {
  const creatorName = prompt.creatorName || prompt.userName || "Anonymous";

  return (
    <div className="sticky top-24 space-y-6">
      {/* Creator Info */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Created By
        </h3>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 text-base">
            {creatorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1">
              {creatorName}
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </h4>
            <p className="text-xs text-slate-400">Prompt Architect</p>
          </div>
        </div>
      </div>

      {/* Analytics Card */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Performance
        </h3>
        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Eye className="w-3.5 h-3.5 text-cyan-400" /> Total Views
            </span>
            <span className="font-bold text-white">{prompt.viewCount ?? 0}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Copy className="w-3.5 h-3.5 text-purple-400" /> Total Copies
            </span>
            <span className="font-bold text-white">{prompt.copyCount ?? 0}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Bookmark className="w-3.5 h-3.5 text-emerald-400" /> Saved
            </span>
            <span className="font-bold text-white">{prompt.bookmarkCount ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}