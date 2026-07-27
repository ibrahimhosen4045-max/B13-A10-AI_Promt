"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  X,
  Copy,
  Check,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ViewPromptModal({
  viewingPrompt,
  setViewingPrompt,
  handleApprove,
  handleReject,
  updatingId,
}) {
  const [copiedContent, setCopiedContent] = useState(false);

  if (!viewingPrompt) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedContent(true);
    toast.success("Prompt content copied to clipboard!");
    setTimeout(() => setCopiedContent(false), 2000);
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Prompt Details</h2>
                <p className="text-xs text-slate-400">Review full content & metadata</p>
              </div>
            </div>
            <button
              onClick={() => setViewingPrompt(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
            {/* Hero / Banner Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              {viewingPrompt.thumbnail && (
                <img
                  src={viewingPrompt.thumbnail}
                  alt={viewingPrompt.title}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-700 bg-slate-900"
                />
              )}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {renderStatusBadge(viewingPrompt.status)}
                  {renderPremiumBadge(viewingPrompt.isPremium)}
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {viewingPrompt.category || "General"}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white">{viewingPrompt.title}</h3>
              </div>
            </div>

            {/* Description */}
            {viewingPrompt.description && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Description
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
                  {viewingPrompt.description}
                </p>
              </div>
            )}

            {/* Prompt Body / Code Block */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Full Prompt Content
                </h4>
                <button
                  onClick={() => copyToClipboard(viewingPrompt.content)}
                  className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-xl border border-indigo-500/20 transition"
                >
                  {copiedContent ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedContent ? "Copied" : "Copy Prompt"}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 text-xs sm:text-sm font-mono whitespace-pre-wrap break-words border border-slate-800 leading-relaxed max-h-60 overflow-y-auto">
                {viewingPrompt.content || "No prompt content specified."}
              </pre>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-950/40 rounded-2xl border border-slate-800/60 space-y-1">
                <span className="text-[11px] text-slate-400">Difficulty</span>
                <p className="text-xs font-semibold capitalize text-slate-200">
                  {viewingPrompt.difficulty || "Intermediate"}
                </p>
              </div>

              <div className="p-3 bg-slate-950/40 rounded-2xl border border-slate-800/60 space-y-1">
                <span className="text-[11px] text-slate-400">Visibility</span>
                <p className="text-xs font-semibold capitalize text-slate-200">
                  {viewingPrompt.visibility || "Public"}
                </p>
              </div>

              <div className="p-3 bg-slate-950/40 rounded-2xl border border-slate-800/60 space-y-1">
                <span className="text-[11px] text-slate-400">Created Date</span>
                <p className="text-xs font-semibold text-slate-200">
                  {formatDate(viewingPrompt.createdAt)}
                </p>
              </div>

              <div className="p-3 bg-slate-950/40 rounded-2xl border border-slate-800/60 space-y-1">
                <span className="text-[11px] text-slate-400">Copy Count</span>
                <p className="text-xs font-semibold text-slate-200">
                  {viewingPrompt.copyCount ?? 0}
                </p>
              </div>

              <div className="p-3 bg-slate-950/40 rounded-2xl border border-slate-800/60 space-y-1">
                <span className="text-[11px] text-slate-400">Bookmarks</span>
                <p className="text-xs font-semibold text-slate-200">
                  {viewingPrompt.bookmarkCount ?? 0}
                </p>
              </div>

              <div className="p-3 bg-slate-950/40 rounded-2xl border border-slate-800/60 space-y-1">
                <span className="text-[11px] text-slate-400">Rating</span>
                <p className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {viewingPrompt.averageRating ?? "0.0"} ({viewingPrompt.reviewCount ?? 0})
                </p>
              </div>
            </div>

            {/* Author Info */}
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 font-medium">Submitted by</span>
                <p className="text-xs font-bold text-slate-200">
                  {viewingPrompt.creatorName || viewingPrompt.userName || "Anonymous"}
                </p>
                <p className="text-[11px] text-slate-400">
                  {viewingPrompt.creatorEmail || viewingPrompt.userEmail || "N/A"}
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Role: {viewingPrompt.role || "User"}
              </span>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="flex items-center justify-between p-6 border-t border-slate-800 bg-slate-950/50">
            <button
              onClick={() => setViewingPrompt(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              {viewingPrompt.status?.toLowerCase() !== "approved" && (
                <button
                  onClick={() => handleApprove(viewingPrompt._id)}
                  disabled={updatingId === viewingPrompt._id}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve
                </button>
              )}

              {viewingPrompt.status?.toLowerCase() !== "rejected" && (
                <button
                  onClick={() => handleReject(viewingPrompt._id)}
                  disabled={updatingId === viewingPrompt._id}
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}