"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Copy,
  Bookmark,
  TrendingUp,
  BarChart3,
  Sparkles,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { authClient } from "@/lib/auth-client";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-md p-3 rounded-xl shadow-2xl">
        <p className="text-xs font-semibold text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
          {`${payload[0].name || "Total"}: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function CreatorDashboardPage() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async (email) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/creator/dashboard?email=${encodeURIComponent(email)}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch analytics (Status: ${res.status})`);
      }

      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred while fetching dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchDashboardData(session.user.email);
    } else if (!isSessionPending && !session) {
      setLoading(false);
    }
  }, [session, isSessionPending]);

  if (isSessionPending || (loading && !error)) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-200">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
          <Loader2 className="w-6 h-6 text-indigo-400 animate-spin absolute" />
        </div>
        <p className="mt-4 text-slate-400 font-medium text-sm animate-pulse">
          Loading Creator Analytics...
        </p>
      </div>
    );
  }

  if (!session && !isSessionPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center backdrop-blur-xl shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-slate-400 text-sm">
            Please log in with your creator account to access dashboard analytics.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900/60 border border-rose-500/20 rounded-3xl p-8 text-center backdrop-blur-xl shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Failed to Load Dashboard</h2>
          <p className="text-slate-400 text-sm mb-6">{error}</p>
          <button
            onClick={() => session?.user?.email && fetchDashboardData(session.user.email)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Prompts",
      value: analytics?.totalPrompts ?? 0,
      icon: FileText,
      gradient: "from-purple-500 to-indigo-500",
      bgGlow: "group-hover:shadow-purple-500/10",
      borderColor: "hover:border-purple-500/30",
    },
    {
      title: "Total Copies",
      value: analytics?.totalCopies ?? 0,
      icon: Copy,
      gradient: "from-indigo-500 to-blue-500",
      bgGlow: "group-hover:shadow-indigo-500/10",
      borderColor: "hover:border-indigo-500/30",
    },
    {
      title: "Total Bookmarks",
      value: analytics?.totalBookmarks ?? 0,
      icon: Bookmark,
      gradient: "from-violet-500 to-fuchsia-500",
      bgGlow: "group-hover:shadow-fuchsia-500/10",
      borderColor: "hover:border-fuchsia-500/30",
    },
  ];

  const growthData = analytics?.growth || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl"
        >
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Creator Overview
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Welcome back,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-fuchsia-400">
                  {session?.user?.name || "Creator"}
                </span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl">
                Track your prompt engagement, copy counts, and audience growth analytics in real time.
              </p>
            </div>

            <button
              onClick={() => session?.user?.email && fetchDashboardData(session.user.email)}
              className="self-start md:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white text-sm font-medium transition-all shadow-lg backdrop-blur-md"
            >
              <RefreshCw className="w-4 h-4" /> Refresh Stats
            </button>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800/80 ${card.borderColor} p-6 backdrop-blur-xl shadow-xl transition-all duration-300 ${card.bgGlow}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm font-medium">{card.title}</span>
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} p-0.5 shadow-lg shadow-indigo-500/10`}
                  >
                    <div className="w-full h-full bg-slate-950/80 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {card.value.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart - Prompt Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Prompt Growth</h3>
                  <p className="text-xs text-slate-400">Monthly creation momentum</p>
                </div>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="Prompts Created"
                    stroke="#818cf8"
                    strokeWidth={3}
                    dot={{ fill: "#6366f1", stroke: "#818cf8", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 7, fill: "#c084fc", stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bar Chart - Total Copies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Total Copies Analysis</h3>
                  <p className="text-xs text-slate-400">Monthly usage distribution</p>
                </div>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="total"
                    name="Monthly Activity"
                    fill="#a855f7"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Analytics Breakdown</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Detailed record of monthly creator prompt generation metrics
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/50 text-xs uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th scope="col" className="py-3 px-4 font-semibold">
                    Month
                  </th>
                  <th scope="col" className="py-3 px-4 font-semibold">
                    Prompts Generated
                  </th>
                  <th scope="col" className="py-3 px-4 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {growthData.map((row) => (
                  <tr
                    key={row.month}
                    className="hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-white">{row.month}</td>
                    <td className="py-3.5 px-4 font-semibold text-indigo-400">
                      {row.total}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}