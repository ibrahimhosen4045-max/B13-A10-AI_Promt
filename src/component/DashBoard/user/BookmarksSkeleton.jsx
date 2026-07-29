// SKELETON LOADING COMPONENT
export function BookmarksSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800/60">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-800 rounded-xl" />
            <div className="h-4 w-72 bg-slate-800/60 rounded-lg" />
          </div>
          <div className="h-10 w-40 bg-slate-800 rounded-2xl" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-slate-900/80 rounded-3xl border border-slate-800/80" />
          ))}
        </div>

        {/* Search Bar Skeleton */}
        <div className="h-16 bg-slate-900/60 rounded-3xl border border-slate-800/80" />

        {/* Prompt Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-96 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col p-4 space-y-4"
            >
              <div className="h-40 w-full bg-slate-800/80 rounded-2xl" />
              <div className="h-5 w-3/4 bg-slate-800 rounded-md" />
              <div className="h-12 w-full bg-slate-800/50 rounded-md" />
              <div className="h-8 w-full bg-slate-800/80 rounded-xl mt-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}