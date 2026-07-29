"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import SummaryCards from "@/component/DashBoard/admin/overviw/SummaryCards";
import ChartsSection from "@/component/DashBoard/admin/overviw/ChartsSection";
import RecentUsersTable from "@/component/DashBoard/admin/overviw/RecentUsersTable";
import RecentPromptsTable from "@/component/DashBoard/admin/overviw/RecentPromptsTable";
import QuickActions from "@/component/DashBoard/admin/overviw/QuickActions";
import SystemHealth from "@/component/DashBoard/admin/overviw/SystemHealth";
import ActivityTimeline from "@/component/DashBoard/admin/overviw/ActivityTimeline";
import DashboardSkeleton from "@/component/DashBoard/admin/overviw/DashboardSkeleton";
import ErrorState from "@/component/DashBoard/admin/overviw/ErrorState";


export default function AdminOverviewPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5500/api/admin/dashboard-overview", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const result = await res.json();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        throw new Error(result.message || "Failed to load valid dashboard telemetry.");
      }
    } catch (err) {
      setError(err.message || "Unable to connect to administration service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <DashboardSkeleton />;
  if (error) return <ErrorState message={error} onRetry={fetchDashboardData} />;

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dashboard Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              System Control Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-cyan-100 to-slate-400">
            Platform Overview
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 transition-all shadow-md active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            Refresh Telemetry
          </button>
        </div>
      </div>

      {/* Grid Layout Engine */}
      <SummaryCards stats={data} />

      <ChartsSection
        monthlyUsers={data?.monthlyUsers || []}
        monthlyPrompts={data?.monthlyPrompts || []}
        approved={data?.approvedPrompts || 0}
        pending={data?.pendingPrompts || 0}
        rejected={data?.rejectedPrompts || 0}
        topCreators={data?.topCreators || []}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecentUsersTable users={data?.recentUsers || []} />
          <RecentPromptsTable prompts={data?.recentPrompts || []} />
        </div>

        <div className="space-y-8">
          <QuickActions />
          <SystemHealth />
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}