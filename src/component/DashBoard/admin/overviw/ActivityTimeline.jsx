"use client";

import { Activity, UserPlus, CheckCircle2, ShieldAlert, Crown, Flag } from "lucide-react";

export default function ActivityTimeline() {
  const activities = [
    { title: "Prompt Approved", desc: "Midjourney Cinematic Lighting", time: "5 min ago", icon: CheckCircle2, color: "text-emerald-400" },
    { title: "New User Onboarded", desc: "alex.dev@gmail.com", time: "12 min ago", icon: UserPlus, color: "text-cyan-400" },
    { title: "Premium Subscribed", desc: "PRO tier active", time: "28 min ago", icon: Crown, color: "text-amber-400" },
    { title: "Content Flagged", desc: "Prompt ID #8920 reported", time: "1 hr ago", icon: Flag, color: "text-rose-400" },
  ];

  return (
    <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          Real-Time Audit Trail
        </h3>
        <Activity className="w-4 h-4 text-cyan-400" />
      </div>

      <div className="relative pl-4 space-y-4 border-l border-slate-800/80">
        {activities.map((act, i) => {
          const Icon = act.icon;
          return (
            <div key={i} className="relative space-y-1">
              <span className="absolute -left-[21px] top-0.5 p-1 rounded-full bg-slate-900 border border-slate-800">
                <Icon className={`w-3 h-3 ${act.color}`} />
              </span>
              <p className="text-xs font-bold text-slate-200">{act.title}</p>
              <p className="text-[11px] text-slate-400">{act.desc}</p>
              <span className="text-[10px] text-slate-500 font-mono block">{act.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}