"use client";

import { motion } from "framer-motion";
import { DollarSign, CreditCard, CheckCircle2, XCircle, Crown } from "lucide-react";

export default function PaymentStats({ stats, loading }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats?.totalRevenue),
      icon: DollarSign,
      color: "from-cyan-500/20 to-cyan-500/5",
      borderColor: "border-cyan-500/30",
      iconColor: "text-cyan-400",
      glow: "shadow-cyan-500/10",
    },
    {
      title: "Total Payments",
      value: stats?.totalPayments ?? 0,
      icon: CreditCard,
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400",
      glow: "shadow-purple-500/10",
    },
    {
      title: "Successful Payments",
      value: stats?.successfulPayments ?? 0,
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-400",
      glow: "shadow-emerald-500/10",
    },
    {
      title: "Failed Payments",
      value: stats?.failedPayments ?? 0,
      icon: XCircle,
      color: "from-rose-500/20 to-rose-500/5",
      borderColor: "border-rose-500/30",
      iconColor: "text-rose-400",
      glow: "shadow-rose-500/10",
    },
    {
      title: "Premium Users",
      value: stats?.premiumUsers ?? 0,
      icon: Crown,
      color: "from-amber-500/20 to-amber-500/5",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400",
      glow: "shadow-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.color} border ${card.borderColor} p-5 backdrop-blur-xl shadow-lg ${card.glow}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-2xl bg-slate-900/60 border ${card.borderColor}`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>

            <div className="mt-4">
              {loading ? (
                <div className="h-8 w-24 bg-slate-800/80 animate-pulse rounded-lg" />
              ) : (
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {card.value}
                </h3>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}