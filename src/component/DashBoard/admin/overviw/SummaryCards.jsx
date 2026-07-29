"use client";

import { motion } from "framer-motion";
import {
  Users,
  Crown,
  UserCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  Bookmark,
  Copy,
  Star,
  Flag,
  DollarSign,
  GitPullRequestClosed,
} from "lucide-react";

export default function SummaryCards({ stats = {} }) {
  const cards = [
  {
    title: "Total Users",
    value: stats.totalUsers ?? 0,
    icon: Users,
    color: "from-cyan-500/10 to-blue-500/5 text-cyan-400 border-cyan-500/20",
  },
  {
    title: "Premium Users",
    value: stats.totalPremiumUsers ?? 0,
    icon: Crown,
    color: "from-amber-500/10 to-yellow-500/5 text-amber-400 border-amber-500/20",
  },
  {
    title: "Creators",
    value: stats.totalCreators ?? 0,
    icon: UserCheck,
    color: "from-purple-500/10 to-indigo-500/5 text-purple-400 border-purple-500/20",
  },
  {
    title: "Total Prompts",
    value: stats.totalPrompts ?? 0,
    icon: Sparkles,
    color: "from-cyan-500/10 to-teal-500/5 text-cyan-300 border-cyan-500/20",
  },
  {
    title: "Pending Prompts",
    value: stats.pendingPrompts ?? 0,
    icon: Clock,
    color: "from-orange-500/10 to-yellow-500/5 text-orange-400 border-orange-500/20",
  },
  {
    title: "Reports",
    value: stats.totalReports ?? 0,
    icon: Flag,
    color: "from-red-500/10 to-rose-500/5 text-red-400 border-red-500/20",
  },
  {
    title: "Rejected",
    value: stats.rejectedPrompts ?? 0,
    icon: GitPullRequestClosed   ,
    color: "from-yellow-500/10 to-amber-500/5 text-red-400 border-yellow-500/20",
  },
  {
    title: "Revenue",
    value: `${stats.totalRevenue ?? 0}`,
    icon: DollarSign,
    color: "from-emerald-500/10 to-green-500/5 text-emerald-400 border-emerald-500/20",
  },
];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -3 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} backdrop-blur-xl border p-5 shadow-lg shadow-black/40`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {card.title}
                </p>
                <h3 className="text-2xl font-black text-slate-100 tracking-tight">
                  {card.value.toLocaleString()}
                </h3>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">{card.subtitle}</span>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                {card.trend}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}