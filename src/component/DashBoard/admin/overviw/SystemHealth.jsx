"use client";

import { Database, Server, Cpu, HardDrive, DollarSign } from "lucide-react";

export default function SystemHealth() {
  const metrics = [
    { name: "MongoDB Cluster", status: "Operational", health: 100, icon: Database, color: "text-emerald-400" },
    { name: "API Server", status: "Healthy (24ms)", health: 98, icon: Server, color: "text-cyan-400" },
    { name: "Vector Index Engine", status: "Operational", health: 100, icon: Cpu, color: "text-indigo-400" },
    { name: "Storage Bucket", status: "42% Used", health: 42, icon: HardDrive, color: "text-purple-400" },
  ];

  return (
    <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          System Infrastructure
        </h3>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          ALL SYSTEMS ONLINE
        </span>
      </div>

      <div className="space-y-3">
        {metrics.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-300 font-semibold">
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  {item.name}
                </span>
                <span className="text-slate-400 text-[11px] font-mono">{item.status}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                  style={{ width: `${item.health}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}