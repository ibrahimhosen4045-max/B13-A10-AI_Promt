"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { CreditCard, RefreshCw } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import PaymentTable from "@/component/DashBoard/admin/PaymentTable";
import PaymentStats from "@/component/DashBoard/admin/PaymentStats";


export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters & Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch Payment Stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5500/api/admin/payment-stats`);
      const result = await res.json();
      if (res.ok && result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Stats Fetch Error:", error);
    }
  }, []);

  // Fetch Payment Records
  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5500/api/admin/payments`);
      const result = await res.json();

      if (res.ok && result.success) {
        setPayments(Array.isArray(result.data) ? result.data : []);
      } else {
        toast.error(result.message || "Failed to load payment history");
      }
    } catch (error) {
      toast.error("Error connecting to server");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchPayments();
  }, [fetchStats, fetchPayments]);

  // Client-Side Filtering
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const query = searchQuery.toLowerCase().trim();
      const name = (payment.userName || "").toLowerCase();
      const email = (payment.userEmail || "").toLowerCase();

      const matchesSearch = !query || name.includes(query) || email.includes(query);

      const status = (payment.status || "").toLowerCase();
      let matchesFilter = true;

      if (statusFilter !== "All") {
        matchesFilter = status === statusFilter.toLowerCase();
      }

      return matchesSearch && matchesFilter;
    });
  }, [payments, searchQuery, statusFilter]);

  // Pagination Slice
  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPayments, currentPage]);

  // Reset page number on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800 p-6 rounded-3xl backdrop-blur-2xl shadow-xl"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <CreditCard className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Payment History
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Track user transactions, revenue breakdowns, and subscription statuses.
            </p>
          </div>

          <button
            onClick={() => {
              fetchStats();
              fetchPayments();
              toast.success("Payment data refreshed");
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            Refresh
          </button>
        </motion.div>

        {/* Top Statistics Cards */}
        <PaymentStats stats={stats} loading={loading} />

        {/* Payment History Table & Controls */}
        <PaymentTable
          payments={paginatedPayments}
          loading={loading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredPayments.length}
        />
      </div>
    </div>
  );
}