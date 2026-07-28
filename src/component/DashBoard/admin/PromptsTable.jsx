"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Tag,
  Lock,
  Globe,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Trash2,
  Loader2,
  FolderOpen,
} from "lucide-react";

export default function PromptsTable({
  loading,
  filteredPrompts,
  searchQuery,
  statusFilter,
  setSearchQuery,
  setStatusFilter,
  setViewingPrompt,
  handleApprove,
  handleReject,
  handleTogglePremium,
  setPromptToDelete,
  updatingId,
}) {
    
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "approved") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" /> Approved
        </span>
      );
    }
    if (s === "rejected") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <XCircle className="w-3.5 h-3.5" /> Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Clock className="w-3.5 h-3.5" /> Pending
      </span>
    );
  };

  const renderPremiumBadge = (isPremium) => {
    if (isPremium) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Sparkles className="w-3 h-3" /> Premium
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
        Free
      </span>
    );
  };

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      {loading ? (
        /* SKELETON LOADER */
        <div className="p-6 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/50 animate-pulse"
            >
              <div className="flex items-center gap-3 w-1/4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-800/60 rounded w-1/2" />
                </div>
              </div>
              <div className="h-4 bg-slate-800 rounded w-1/6" />
              <div className="h-4 bg-slate-800 rounded w-12" />
              <div className="h-6 bg-slate-800 rounded-full w-16" />
              <div className="h-6 bg-slate-800 rounded-full w-20" />
              <div className="h-8 bg-slate-800 rounded-xl w-28" />
            </div>
          ))}
        </div>
      ) : filteredPrompts.length === 0 ? (
        /* EMPTY STATE */
        <div className="py-16 px-4 text-center space-y-4 flex flex-col items-center justify-center">
          <div className="p-5 rounded-3xl bg-slate-800/50 border border-slate-700/50 text-slate-400">
            <FolderOpen className="w-10 h-10 text-indigo-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No Prompts Found</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              {searchQuery || statusFilter !== "All"
                ? "No prompts matched your search query or filter criteria. Try adjusting your search."
                : "There are currently no prompts available in the marketplace database."}
            </p>
          </div>
          {(searchQuery || statusFilter !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
              }}
              className="px-4 py-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl border border-indigo-500/20 transition"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        /* TABLE CONTENT */
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Thumbnail</th>
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Submitted By</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Difficulty</th>
                <th className="py-4 px-6">Visibility</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              <AnimatePresence>
                {filteredPrompts.map((prompt) => {
                  const creatorName = prompt.creatorName || prompt.userName || "Anonymous";
                  const creatorEmail = prompt.creatorEmail || prompt.userEmail || "No Email";

                  return (
                    <motion.tr
                      key={prompt._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      {/* Thumbnail */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {prompt.thumbnail ? (
                          <img
                            src={prompt.thumbnail}
                            alt={prompt.title || "Prompt"}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-700 bg-slate-950"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
                            <FileText className="w-5 h-5 text-indigo-400" />
                          </div>
                        )}
                      </td>

                      {/* Title */}
                      <td className="py-4 px-6 font-semibold text-slate-100 max-w-xs truncate">
                        <span
                          className="hover:text-indigo-400 cursor-pointer transition"
                          onClick={() => setViewingPrompt(prompt)}
                        >
                          {prompt.title || "Untitled Prompt"}
                        </span>
                      </td>

                      {/* Submitted By */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-200">{creatorName}</p>
                          <p className="text-[11px] text-slate-400">{creatorEmail}</p>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          {prompt.creatorEmail && "Creator" || "User"}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 whitespace-nowrap text-slate-300 text-xs">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
                          <Tag className="w-3 h-3 text-indigo-400" />
                          {prompt.category || "General"}
                        </span>
                      </td>

                      {/* Difficulty */}
                      <td className="py-4 px-6 whitespace-nowrap text-xs text-slate-300">
                        <span className="capitalize">{prompt.difficulty || "Intermediate"}</span>
                      </td>

                      {/* Visibility */}
                      <td className="py-4 px-6 whitespace-nowrap text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          {prompt.visibility?.toLowerCase() === "private" ? (
                            <Lock className="w-3 h-3 text-rose-400" />
                          ) : (
                            <Globe className="w-3 h-3 text-emerald-400" />
                          )}
                          <span className="capitalize">{prompt.visibility || "Public"}</span>
                        </span>
                      </td>

                      {/* Premium Status */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {renderPremiumBadge(prompt.isPremium)}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {renderStatusBadge(prompt.status)}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 whitespace-nowrap text-xs text-slate-400">
                        {formatDate(prompt.createdAt)}
                      </td>

                      {/* Actions Column */}
                      <td className="py-4 px-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Modal Trigger */}
                          <button
                            onClick={() => setViewingPrompt(prompt)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Approve Button */}
                          {prompt.status?.toLowerCase() !== "approved" && (
                            <button
                              onClick={() => handleApprove(prompt._id)}
                              disabled={updatingId === prompt._id}
                              className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition disabled:opacity-50"
                              title="Approve Prompt"
                            >
                              {updatingId === prompt._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4" />
                              )}
                            </button>
                          )}

                          {/* Reject Button */}
                          {prompt.status?.toLowerCase() !== "rejected" && (
                            <button
                              onClick={() => handleReject(prompt._id)}
                              disabled={updatingId === prompt._id}
                              className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition disabled:opacity-50"
                              title="Reject Prompt"
                            >
                              {updatingId === prompt._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                            </button>
                          )}

                          {/* Premium Toggle */}
                          <button
                            onClick={() => handleTogglePremium(prompt._id, prompt.isPremium)}
                            disabled={updatingId === prompt._id}
                            className={`p-2 rounded-xl border transition disabled:opacity-50 ${
                              prompt.isPremium
                                ? "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border-purple-500/30"
                                : "bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700"
                            }`}
                            title={prompt.isPremium ? "Make Free" : "Make Premium"}
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => setPromptToDelete(prompt)}
                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition"
                            title="Delete Prompt"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}