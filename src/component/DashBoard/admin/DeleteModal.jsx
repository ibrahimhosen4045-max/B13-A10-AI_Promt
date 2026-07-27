"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Loader2 } from "lucide-react";

export default function DeleteModal({
  promptToDelete,
  setPromptToDelete,
  handleDeletePrompt,
  isDeleting,
}) {
  if (!promptToDelete) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100"
        >
          <div className="flex items-center justify-between p-5 border-b border-slate-800">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-lg">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm Prompt Deletion</span>
            </div>
            <button
              onClick={() => setPromptToDelete(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-3">
            <p className="text-sm text-slate-300">
              Are you sure you want to delete{" "}
              <span className="font-bold text-white">"{promptToDelete.title}"</span>?
            </p>
            <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-500/20 p-3 rounded-xl">
              Warning: This action is permanent and will remove the prompt from the marketplace immediately.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-800 bg-slate-900/50">
            <button
              onClick={() => setPromptToDelete(null)}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDeletePrompt}
              disabled={isDeleting}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition shadow-lg shadow-rose-600/20 disabled:opacity-50"
            >
              {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
              Yes, Delete Prompt
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}