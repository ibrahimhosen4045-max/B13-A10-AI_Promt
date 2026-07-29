"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FolderX } from "lucide-react";

export default function ChartsSection({
  monthlyUsers = [],
  monthlyPrompts = [],
  approved = 0,
  pending = 0,
  rejected = 0,
  topCreators = [],
}) {
  const pieData = [
    { name: "Approved", value: approved, color: "#10b981" },
    { name: "Pending", value: pending, color: "#f59e0b" },
    { name: "Rejected", value: rejected, color: "#f43f5e" },
  ];

  const emptyGraphic = (title) => (
    <div className="h-48 flex flex-col items-center justify-center text-slate-500 space-y-2">
      <FolderX className="w-8 h-8 text-slate-600" />
      <p className="text-xs">{title}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Monthly User Growth */}
      <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-6 shadow-xl space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Monthly User Growth
          </h3>
          <p className="text-xs text-slate-400">User onboarding metric over time</p>
        </div>
        <div className="h-56 pt-2">
          {monthlyUsers.length === 0 ? (
            emptyGraphic("No monthly user telemetry available.")
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyUsers}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: "#06b6d4", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Chart 2: Monthly Prompt Upload */}
      <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-6 shadow-xl space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Monthly Prompt Submissions
          </h3>
          <p className="text-xs text-slate-400">Content generation volume trends</p>
        </div>
        <div className="h-56 pt-2">
          {monthlyPrompts.length === 0 ? (
            emptyGraphic("No prompt submission logs registered.")
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPrompts}>
                <defs>
                  <linearGradient id="promptGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#promptGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Chart 3: Prompt Status Pie */}
      <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-6 shadow-xl space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Prompt Status Distribution
          </h3>
          <p className="text-xs text-slate-400">Moderation workflow breakdown</p>
        </div>
        <div className="h-56 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 4: Top Creators Bar */}
      <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-6 shadow-xl space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Top Creator Performance
          </h3>
          <p className="text-xs text-slate-400">Highest contribution metrics</p>
        </div>
        <div className="h-56 pt-2">
          {topCreators.length === 0 ? (
            emptyGraphic("No top creator data available.")
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCreators}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="promptsCount" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}