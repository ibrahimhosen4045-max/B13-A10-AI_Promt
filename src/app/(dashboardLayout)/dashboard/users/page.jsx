'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  Bookmark,
  Copy,
  Star,
  Flag,
  Crown,
  Sparkles,
  Compass,
  User,
  ArrowUpRight,
  TrendingUp,
  Calendar,
  Layers,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { authClient } from '@/lib/auth-client';

// Stagger animation container variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function UserOverviewDashboard() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Overview Data
  const fetchOverview = useCallback(async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5500/api/user/dashboard-overview?email=${encodeURIComponent(
          session.user.email
        )}`
      );


      if (!res.ok) throw new Error('Failed to fetch dashboard overview');

      const data = await res.json();

      if (data.success && data.overview) {
        setOverview(data.overview);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (err) {
      console.error(err);
      toast.error('Unable to load overview data');
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!sessionLoading) {
      fetchOverview();
    }
  }, [sessionLoading, fetchOverview]);

  const userName = session?.user?.name || 'Creator';
  const userEmail = session?.user?.email || '';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-10 font-sans selection:bg-purple-500/30">
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Loading State Skeleton */}
        {loading || sessionLoading ? (
          <DashboardSkeleton />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Top Welcome Header */}
            <motion.header
              variants={itemVariants}
              className="relative overflow-hidden rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-purple-950/20"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                      Welcome Back, {userName}
                    </h1>

                    {overview?.premium && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 backdrop-blur-md flex items-center gap-1.5 shadow-lg shadow-amber-500/5">
                        <Crown className="w-3.5 h-3.5 text-amber-400" />
                        PRO Member
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm sm:text-base">
                    Here is an overview of your AI prompt marketplace activity and usage statistics.
                  </p>
                </div>

                {overview?.joinedAt && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 border border-slate-800 px-3.5 py-2 rounded-2xl w-fit">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>
                      Joined{' '}
                      {new Date(overview.joinedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </motion.header>

            {/* Statistics Cards Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              <StatCard
                title="Saved Prompts"
                value={overview?.savedPrompts ?? 0}
                icon={Bookmark}
                gradient="from-purple-500/20 to-indigo-500/20"
                iconColor="text-purple-400"
                borderColor="border-purple-500/20"
              />

              <StatCard
                title="Copied Prompts"
                value={overview?.copiedPrompts ?? 0}
                icon={Copy}
                gradient="from-cyan-500/20 to-blue-500/20"
                iconColor="text-cyan-400"
                borderColor="border-cyan-500/20"
              />

              <StatCard
                title="Reviews Given"
                value={overview?.reviews ?? 0}
                icon={Star}
                gradient="from-amber-500/20 to-orange-500/20"
                iconColor="text-amber-400"
                borderColor="border-amber-500/20"
              />

              <StatCard
                title="Reports Submitted"
                value={overview?.reports ?? 0}
                icon={Flag}
                gradient="from-rose-500/20 to-pink-500/20"
                iconColor="text-rose-400"
                borderColor="border-rose-500/20"
              />
            </motion.div>

            {/* Middle Section: Chart & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Section */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-2 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl p-6 shadow-xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      Prompt Copy Activity
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Monthly breakdown of prompts you copied
                    </p>
                  </div>
                </div>

                {/* Recharts Area Chart */}
                <div className="h-64 sm:h-72 w-full">
                  {overview?.copyHistory && overview.copyHistory.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={overview.copyHistory}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="copyGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
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
                        <Area
                          type="monotone"
                          dataKey="copies"
                          stroke="#a855f7"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#copyGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm">
                      <TrendingUp className="w-8 h-8 mb-2 stroke-[1.5]" />
                      <span>No activity data recorded yet.</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Quick Actions Card */}
              <motion.div
                variants={itemVariants}
                className="rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    Quick Actions
                  </h2>
                  <p className="text-xs text-slate-400 mb-6">
                    Shortcuts to frequently used pages
                  </p>

                  <div className="space-y-3">
                    <QuickActionButton
                      href="/marketplace"
                      icon={Compass}
                      label="Browse Marketplace"
                      color="hover:border-purple-500/40 hover:bg-purple-500/5"
                    />

                    <QuickActionButton
                      href="/bookmarks"
                      icon={Bookmark}
                      label="My Bookmarks"
                      color="hover:border-cyan-500/40 hover:bg-cyan-500/5"
                    />

                    {!overview?.premium && (
                      <QuickActionButton
                        href="/pricing"
                        icon={Crown}
                        label="Upgrade to Premium"
                        badge="GET PRO"
                        color="hover:border-amber-500/40 hover:bg-amber-500/10 text-amber-300"
                        isHighlight
                      />
                    )}

                    <QuickActionButton
                      href="/profile"
                      icon={User}
                      label="Edit Profile"
                      color="hover:border-slate-700 hover:bg-slate-800/40"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Bookmark prompts to quickly reuse them anytime from your overview page.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// --- Stat Card Component ---
function StatCard({ title, value, icon: Icon, gradient, iconColor, borderColor }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-3xl bg-slate-900/50 border ${borderColor} backdrop-blur-xl p-6 shadow-xl flex flex-col justify-between group`}
    >
      <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${gradient} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {value.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
}

// --- Recent Bookmark Card Component ---
function BookmarkCard({ prompt }) {
  const promptId = prompt._id || prompt.id;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/80 backdrop-blur-xl overflow-hidden shadow-lg flex flex-col justify-between transition-all"
    >
      <div>
        {/* Card Thumbnail */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
          <Image
            src={prompt.thumbnail || '/api/placeholder/400/225'}
            alt={prompt.title || 'Prompt Thumbnail'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />

          {/* Category Badge */}
          {prompt.category && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-slate-950/80 text-purple-300 border border-slate-800 backdrop-blur-md">
                {prompt.category}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5">
          <h3 className="text-base font-semibold text-slate-100 line-clamp-1 group-hover:text-purple-300 transition-colors">
            {prompt.title}
          </h3>

          {prompt.createdAt && (
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Saved on{' '}
              {new Date(prompt.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        <Link
          href={`/prompt/${promptId}`}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-purple-600 hover:text-white border border-slate-700/60 hover:border-purple-500 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-sm"
        >
          View Prompt
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

// --- Quick Action Button Component ---
function QuickActionButton({ href, icon: Icon, label, badge, color, isHighlight }) {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-slate-200 text-xs font-medium transition-all ${color}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${isHighlight ? 'text-amber-400' : 'text-slate-400'}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span>{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {badge}
          </span>
        )}
        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </Link>
  );
}

// --- Custom Recharts Tooltip ---
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl p-3 shadow-2xl text-xs">
        <p className="font-semibold text-slate-300 mb-1">{label}</p>
        <p className="text-purple-400 font-bold flex items-center gap-1.5">
          <Copy className="w-3.5 h-3.5" />
          {payload[0].value} Copies
        </p>
      </div>
    );
  }
  return null;
}

// --- Dashboard Loading Skeleton ---
function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-32 rounded-3xl bg-slate-900/50 border border-slate-800/80 p-8 flex flex-col justify-center" />

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-3xl bg-slate-900/50 border border-slate-800/80 p-6 flex flex-col justify-between"
          />
        ))}
      </div>

      {/* Middle Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 rounded-3xl bg-slate-900/50 border border-slate-800/80 p-6" />
        <div className="h-80 rounded-3xl bg-slate-900/50 border border-slate-800/80 p-6" />
      </div>

      {/* Recent Prompts Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-2xl bg-slate-900/50 border border-slate-800/80 p-4"
          />
        ))}
      </div>
    </div>
  );
}