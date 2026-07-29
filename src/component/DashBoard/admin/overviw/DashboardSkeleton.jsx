"use client";

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#07090E] p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center border-b border-slate-800/80 pb-6">
        <div className="space-y-2">
          <div className="h-4 w-28 bg-slate-800/60 rounded" />
          <div className="h-8 w-60 bg-slate-800 rounded-lg" />
        </div>
        <div className="h-9 w-32 bg-slate-800/80 rounded-xl" />
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-slate-900/50 border border-slate-800/60 p-5 space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 w-20 bg-slate-800 rounded" />
              <div className="h-8 w-8 bg-slate-800/80 rounded-lg" />
            </div>
            <div className="h-7 w-24 bg-slate-800 rounded-md" />
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-72 rounded-2xl bg-slate-900/50 border border-slate-800/60 p-6 space-y-4"
          >
            <div className="h-4 w-36 bg-slate-800 rounded" />
            <div className="h-52 w-full bg-slate-800/30 rounded-xl" />
          </div>
        ))}
      </div>

      {/* Tables Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-64 rounded-2xl bg-slate-900/50 border border-slate-800/60 p-6 space-y-4">
            <div className="h-4 w-40 bg-slate-800 rounded" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-10 bg-slate-800/40 rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        <div className="h-96 rounded-2xl bg-slate-900/50 border border-slate-800/60 p-6" />
      </div>
    </div>
  );
}