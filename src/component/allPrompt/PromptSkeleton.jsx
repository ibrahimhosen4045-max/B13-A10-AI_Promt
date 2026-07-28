"use client";

export default function PromptSkeleton() {
  return (
    <div className="rounded-3xl bg-slate-900/40 border border-slate-800/60 p-5 space-y-4 animate-pulse backdrop-blur-xl shadow-lg">
      <div className="w-full h-44 bg-slate-800/60 rounded-2xl" />

      <div className="flex gap-2">
        <div className="h-5 w-16 bg-slate-800/80 rounded-full" />
        <div className="h-5 w-16 bg-slate-800/80 rounded-full" />
        <div className="h-5 w-20 bg-slate-800/80 rounded-full" />
      </div>

      <div className="space-y-2">
        <div className="h-5 w-3/4 bg-slate-800/90 rounded-md" />
        <div className="h-3.5 w-full bg-slate-800/60 rounded-md" />
        <div className="h-3.5 w-2/3 bg-slate-800/60 rounded-md" />
      </div>

      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-800" />
          <div className="h-3 w-20 bg-slate-800/80 rounded-md" />
        </div>
        <div className="h-3 w-12 bg-slate-800/80 rounded-md" />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="h-4 w-24 bg-slate-800/60 rounded-md" />
        <div className="h-9 w-28 bg-slate-800/90 rounded-xl" />
      </div>
    </div>
  );
}