"use client";

import { Sparkles, Eye, Copy, Bookmark } from "lucide-react";

export default function RecentPromptsTable({ prompts = [] }) {
  if (prompts.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-8 text-center space-y-3">
        <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
        <h4 className="text-sm font-semibold text-slate-300">No Prompts Submissions</h4>
        <p className="text-xs text-slate-500">Submitted community prompts will appear here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 shadow-xl overflow-hidden space-y-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Recent Prompt Submissions
          </h3>
          <p className="text-xs text-slate-400">Latest entries into the catalog</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Prompt</th>
              <th className="py-3 px-4">Creator</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Engagement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-xs">
            {prompts.map((prompt) => (
              <tr key={prompt._id || prompt.title} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slate-200 max-w-xs truncate">
                  {prompt.title}
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-medium">
                  {prompt.creatorName || "Unknown"}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {prompt.category || "General"}
                  </span>
                </td>
                <td className="py-3.5 px-4 capitalize">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      prompt.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : prompt.status === "rejected"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {prompt.status || "Pending"}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right text-slate-400">
                  <div className="flex items-center justify-end gap-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-slate-500" /> {prompt.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Copy className="w-3 h-3 text-slate-500" /> {prompt.copies || 0}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}