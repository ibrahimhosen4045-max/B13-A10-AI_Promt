// EMPTY STATE COMPONENT
 export function EmptyState({ searchQuery }) {
  if (searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl my-8">
        <ShieldAlert className="w-12 h-12 text-slate-500 mb-3" />
        <h3 className="text-lg font-bold text-white">No Prompts Match Your Search</h3>
        <p className="text-slate-400 text-sm max-w-sm mt-1">
          Try adjusting your query or filters to find saved prompts.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 sm:p-16 text-center rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl my-8 space-y-5"
    >
      <div className="p-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-xl">
        <Bookmark className="w-16 h-16 stroke-1 fill-indigo-500/10" />
      </div>

      <div className="space-y-1 max-w-md">
        <h2 className="text-2xl font-bold text-white">No Saved Prompts</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          You haven't bookmarked any prompts yet.
        </p>
      </div>

      <Link
        href="/explore"
        className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl shadow-indigo-600/25 hover:opacity-95 transition"
      >
        <Sparkles className="w-4 h-4" /> Explore Prompts
      </Link>
    </motion.div>
  );
}