"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="min-h-screen bg-[#07090E] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-slate-900/60 backdrop-blur-2xl border border-rose-500/20 rounded-2xl p-8 text-center space-y-6 shadow-2xl shadow-rose-950/20"
      >
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-100">Telemetry Fetch Failed</h3>
          <p className="text-xs text-slate-400 leading-relaxed">{message}</p>
        </div>

        <button
          onClick={onRetry}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 transition-all shadow-lg shadow-rose-600/20 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Connection
        </button>
      </motion.div>
    </div>
  );
}