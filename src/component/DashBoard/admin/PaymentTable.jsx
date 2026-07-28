"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  ArrowUpDown,
  CreditCard,
} from "lucide-react";

export default function PaymentTable({
  payments,
  loading,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  totalItems,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "success" || s === "completed") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" /> Success
        </span>
      );
    }
    if (s === "failed" || s === "cancelled") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <XCircle className="w-3.5 h-3.5" /> Failed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Clock className="w-3.5 h-3.5" /> Pending
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by user name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 backdrop-blur-xl transition shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 appearance-none px-4 py-3 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs sm:text-sm font-medium text-slate-200 focus:outline-none focus:border-purple-500/50 backdrop-blur-xl transition cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-slate-800/40 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : payments.length === 0 ? (
          <div className="py-16 text-center space-y-3 flex flex-col items-center">
            <div className="p-4 rounded-3xl bg-slate-800/50 border border-slate-700/50 text-cyan-400">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white">No Payment Records Found</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              We couldn't find any payments matching your current filters or search term.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">User Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Plan</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Method</th>
                  <th className="py-4 px-6">Transaction ID</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <span>Date</span>
                      <ArrowUpDown className="w-3 h-3 text-cyan-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-xs sm:text-sm">
                <AnimatePresence>
                  {payments.map((p) => (
                    <motion.tr
                      key={p._id || p.transactionId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-4 px-6 font-semibold text-slate-100 whitespace-nowrap">
                        {p.userName || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-slate-300 whitespace-nowrap">
                        {p.userEmail || "N/A"}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-semibold capitalize">
                          {p.plan || "Standard"}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-cyan-400 whitespace-nowrap">
                        {(p.currency || "$").toUpperCase()} {p.amount}
                      </td>
                      <td className="py-4 px-6 text-slate-300 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 capitalize">
                          <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                          {p.paymentMethod || "Card"}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-400 text-xs whitespace-nowrap">
                        {p.transactionId || "N/A"}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {renderStatusBadge(p.status)}
                      </td>
                      <td className="py-4 px-6 text-slate-400 text-xs whitespace-nowrap">
                        {formatDate(p.createdAt)}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && totalItems > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400">
            <span>
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-semibold text-slate-200">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}