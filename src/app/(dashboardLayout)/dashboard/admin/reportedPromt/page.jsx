"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Flag,
  Search,
  Trash2,
  Calendar,
  User,
  Mail,
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle2,
  ShieldAlert,
  Loader2,
  RefreshCw,
  X,
  Sparkles,
} from "lucide-react";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_URI}/api/admin`;

// Helper for Badge Colors based on Report Reason
const getReasonBadgeStyle = (reason) => {
  const normalized = (reason || "").toLowerCase();
  switch (normalized) {
    case "spam":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    case "copyright":
      return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "harmful":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "fake":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
};

// Helper for Status Badge Styling
const getStatusBadgeStyle = (status) => {
  const normalized = (status || "").toLowerCase();
  switch (normalized) {
    case "pending":
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    case "reviewed":
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    case "resolved":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/30";
  }
};

// Date Formatting Helper
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function ManageReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch Reports
  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reports`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setReports(data.data);
      } else {
        toast.error(data.message || "Failed to load reports");
      }
    } catch (err) {
      toast.error("Could not connect to backend server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Realtime Filtered Reports
  const filteredReports = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return reports;

    return reports.filter((item) => {
      const name = (item.userName || "").toLowerCase();
      const email = (item.userEmail || "").toLowerCase();
      const reason = (item.reason || "").toLowerCase();
      const promptId = (item.promptId || "").toLowerCase();

      return (
        name.includes(query) ||
        email.includes(query) ||
        reason.includes(query) ||
        promptId.includes(query)
      );
    });
  }, [reports, searchQuery]);

  // Calculated Statistics
  const stats = useMemo(() => {
    const total = reports.length;
    const pending = reports.filter(
      (r) => (r.status || "").toLowerCase() === "pending"
    ).length;

    const todayStr = new Date().toISOString().split("T")[0];
    const today = reports.filter((r) => {
      if (!r.createdAt) return false;
      return r.createdAt.split("T")[0] === todayStr;
    }).length;

    return { total, pending, today };
  }, [reports]);

  // Handle Delete Confirmation
  const handleDeleteReport = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/report/${deleteTarget._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Report deleted successfully");
        setReports((prev) => prev.filter((r) => r._id !== deleteTarget._id));
        setDeleteTarget(null);
      } else {
        toast.error(data.message || "Failed to delete report");
      }
    } catch (err) {
      toast.error("An error occurred while deleting");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 p-4 sm:p-6 lg:p-8 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* ==================== TOP HEADER ==================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Admin Portal
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
              Manage Reports
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Review and take action on user-submitted prompt violations.
            </p>
          </div>

          <button
            onClick={fetchReports}
            disabled={loading}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all duration-200 disabled:opacity-50 shadow-sm hover:shadow active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh Data
          </button>
        </div>

        {/* ==================== STATISTICS CARDS ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-5 shadow-lg shadow-black/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Total Reports
                </p>
                <h3 className="text-3xl font-bold mt-2 text-white">
                  {loading ? (
                    <span className="animate-pulse bg-slate-800 h-8 w-16 inline-block rounded" />
                  ) : (
                    stats.total
                  )}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Flag className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-5 shadow-lg shadow-black/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Pending Reports
                </p>
                <h3 className="text-3xl font-bold mt-2 text-amber-400">
                  {loading ? (
                    <span className="animate-pulse bg-slate-800 h-8 w-16 inline-block rounded" />
                  ) : (
                    stats.pending
                  )}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-5 shadow-lg shadow-black/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Today's Reports
                </p>
                <h3 className="text-3xl font-bold mt-2 text-indigo-400">
                  {loading ? (
                    <span className="animate-pulse bg-slate-800 h-8 w-16 inline-block rounded" />
                  ) : (
                    stats.today
                  )}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==================== SEARCH BAR ==================== */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by User Name, Email, Reason, or Prompt ID..."
            className="w-full pl-11 pr-10 py-3 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ==================== CONTENT SECTION ==================== */}
        {loading ? (
          /* LOADING SKELETON */
          <div className="space-y-4">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/30 border border-slate-800/60 p-5 animate-pulse flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-slate-800 rounded" />
                    <div className="h-3 w-48 bg-slate-800/60 rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-20 bg-slate-800 rounded-full" />
                  <div className="h-6 w-20 bg-slate-800 rounded-full" />
                  <div className="h-9 w-9 bg-slate-800 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredReports.length === 0 ? (
          /* EMPTY STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-slate-900/30 border border-slate-800/80 p-12 text-center flex flex-col items-center justify-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-500 border border-slate-700/50">
              <CheckCircle2 className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="max-w-md">
              <h3 className="text-xl font-semibold text-slate-200">
                {searchQuery ? "No matching reports found" : "All clean!"}
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                {searchQuery
                  ? `No reports match "${searchQuery}". Try searching for another keyword.`
                  : "There are currently no reports to review."}
              </p>
            </div>
          </motion.div>
        ) : (
          /* REPORTS PRESENTATION */
          <div>
            {/* DESKTOP TABLE VIEW (md and up) */}
            <div className="hidden md:block overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Reporter</th>
                    <th className="py-4 px-6">Prompt ID</th>
                    <th className="py-4 px-6">Reason</th>
                    <th className="py-4 px-6">Description</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filteredReports.map((report) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={report._id}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-inner uppercase shrink-0">
                            {report.userName ? report.userName.charAt(0) : "U"}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-200 truncate">
                              {report.userName || "Unknown User"}
                            </p>
                            <p className="text-xs text-slate-400 truncate flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-500" />
                              {report.userEmail || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700/50">
                          {report.promptId ? report.promptId.slice(-8) : "N/A"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getReasonBadgeStyle(
                            report.reason
                          )}`}
                        >
                          <AlertTriangle className="w-3 h-3" />
                          {report.reason || "Other"}
                        </span>
                      </td>
                      <td className="py-4 px-6 max-w-xs">
                        <p className="text-slate-300 text-xs truncate" title={report.description}>
                          {report.description || "No description provided."}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusBadgeStyle(
                            report.status
                          )}`}
                        >
                          {report.status || "Pending"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-400 whitespace-nowrap">
                        {formatDate(report.createdAt)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDeleteTarget(report)}
                          className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-all"
                          title="Delete Report"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD VIEW (below md) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              <AnimatePresence>
                {filteredReports.map((report) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={report._id}
                    className="rounded-2xl bg-slate-900/50 border border-slate-800 p-5 space-y-4 shadow-lg backdrop-blur-md"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-inner uppercase">
                          {report.userName ? report.userName.charAt(0) : "U"}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-100 text-sm">
                            {report.userName || "Unknown User"}
                          </h4>
                          <p className="text-xs text-slate-400">
                            {report.userEmail || "N/A"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusBadgeStyle(
                          report.status
                        )}`}
                      >
                        {report.status || "Pending"}
                      </span>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getReasonBadgeStyle(
                          report.reason
                        )}`}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        {report.reason || "Other"}
                      </span>

                      <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700/50">
                        ID: {report.promptId ? report.promptId.slice(-8) : "N/A"}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/40 text-xs text-slate-300">
                      <p className="font-medium text-slate-400 mb-1">Description:</p>
                      {report.description || "No description provided."}
                    </div>

                    {/* Footer / Actions */}
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {formatDate(report.createdAt)}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDeleteTarget(report)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium text-xs hover:bg-rose-500/20 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* ==================== DELETE CONFIRMATION MODAL ==================== */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setDeleteTarget(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">
                    Delete Report?
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Are you sure you want to permanently remove this report?
                  </p>
                </div>
              </div>

              {/* Target info preview */}
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-slate-300 font-medium">
                  Reporter:{" "}
                  <span className="text-slate-400">
                    {deleteTarget.userName || deleteTarget.userEmail}
                  </span>
                </p>
                <p className="text-slate-300 font-medium">
                  Reason:{" "}
                  <span className="text-slate-400">{deleteTarget.reason}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  disabled={isDeleting}
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isDeleting}
                  onClick={handleDeleteReport}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/20 disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}