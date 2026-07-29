"use client";

export default function PromptDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-10 font-sans animate-pulse">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="h-64 sm:h-80 bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between" />

        {/* Content Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-slate-900/50 rounded-3xl border border-slate-800/60" />
            <div className="h-40 bg-slate-900/50 rounded-3xl border border-slate-800/60" />
            <div className="h-80 bg-slate-900/50 rounded-3xl border border-slate-800/60" />
          </div>
          <div className="space-y-6">
            <div className="h-48 bg-slate-900/50 rounded-3xl border border-slate-800/60" />
            <div className="h-64 bg-slate-900/50 rounded-3xl border border-slate-800/60" />
          </div>
        </div>
      </div>
    </div>
  );
}