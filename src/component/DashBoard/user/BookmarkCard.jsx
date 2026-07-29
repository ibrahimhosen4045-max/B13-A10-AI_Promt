// PROMPT CARD COMPONENT
export function PromptCard({
  bookmark,
  user,
  copiedId,
  deletingId,
  onCopy,
  onRemove,
}) {
  const prompt = bookmark.prompt;
  const promptId = prompt?._id || bookmark.promptId;
  const isCopied = copiedId === promptId;
  const isDeleting = deletingId === promptId;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 backdrop-blur-xl overflow-hidden shadow-xl"
    >
      {/* Thumbnail Section */}
      <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
        {prompt.thumbnail ? (
          <img
            src={prompt.thumbnail}
            alt={prompt.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950/40 via-slate-950 to-purple-950/40 text-slate-700">
            <Sparkles className="w-12 h-12 opacity-30" />
          </div>
        )}

        {/* Overlay Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

        {/* Badges Top Row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {prompt.category && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-slate-900/80 border border-slate-700/60 text-slate-300 backdrop-blur-md">
                {prompt.category}
              </span>
            )}
            {prompt.difficulty && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800/80 border border-slate-700/50 text-indigo-300 backdrop-blur-md">
                {prompt.difficulty}
              </span>
            )}
          </div>

          {prompt.isPremium && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-amber-500 to-purple-600 text-slate-950 shadow-md">
              <Sparkles className="w-3 h-3 fill-slate-950" /> PRO
            </span>
          )}
        </div>

        {/* Remove Bookmark Action Button */}
        <button
          onClick={() => onRemove(promptId)}
          disabled={isDeleting}
          className="absolute bottom-3 right-3 p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 border border-rose-500/30 hover:border-rose-500 text-rose-400 hover:text-white backdrop-blur-md transition-all duration-200 shadow-md"
          title="Remove Bookmark"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
            {prompt.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {prompt.description}
          </p>
        </div>

        {/* Creator Info & Copy Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-2">
            {prompt.creatorImage ? (
              <img
                src={prompt.creatorImage}
                alt={prompt.creatorName || "Creator"}
                className="w-6 h-6 rounded-full object-cover border border-slate-700"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                {prompt.creatorName?.[0] || "C"}
              </div>
            )}
            <span className="text-slate-300 font-medium truncate max-w-[100px]">
              {prompt.creatorName || "Anonymous"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1" title="Copy count">
              <Zap className="w-3 h-3 text-amber-400" /> {prompt.copyCount || 0}
            </span>
            <span className="flex items-center gap-1" title="Bookmark count">
              <Bookmark className="w-3 h-3 text-indigo-400 fill-indigo-400/20" /> {prompt.bookmarkCount || 0}
            </span>
          </div>
        </div>

        {/* Created Date Footnote */}
        <div className="text-[10px] text-slate-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Saved on:{" "}
          {new Date(bookmark.createdAt || Date.now()).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 mt-auto">
          <Link
            href={`/prompt/${prompt._id || promptId}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 rounded-xl transition"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </Link>

          <button
            onClick={() => onCopy(prompt)}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition shadow-md ${
              isCopied
                ? "bg-emerald-600 text-white border border-emerald-500"
                : "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50"
            }`}
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}