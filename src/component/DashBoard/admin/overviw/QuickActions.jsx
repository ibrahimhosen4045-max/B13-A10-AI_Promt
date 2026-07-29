"use client";

import Link from "next/link";
import { Users, Sparkles, Flag, CreditCard, UserCheck, Layers } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users, color: "text-cyan-400" },
    { label: "Manage Prompts", href: "/dashboard/admin/prompts", icon: Sparkles, color: "text-purple-400" },
    { label: "Manage Reports", href: "/dashboard/admin/reports", icon: Flag, color: "text-rose-400" },
    { label: "Manage Payments", href: "/dashboard/admin/payments", icon: CreditCard, color: "text-emerald-400" },
    { label: "Manage Creators", href: "/dashboard/admin/creators", icon: UserCheck, color: "text-amber-400" },
    { label: "Manage Categories", href: "/dashboard/admin/categories", icon: Layers, color: "text-indigo-400" },
  ];

  return (
    <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-6 shadow-xl space-y-4">
      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
        Quick Command Shortcuts
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
        {actions.map((act, i) => {
          const Icon = act.icon;
          return (
            <Link
              key={i}
              href={act.href}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40 transition-all group"
            >
              <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${act.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                {act.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}