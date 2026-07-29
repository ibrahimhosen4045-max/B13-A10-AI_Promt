"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ShieldAlert, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PremiumModal({ isOpen, onClose, promptTitle }) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-2xl overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Header */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 rounded-3xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-10 h-10" />
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-purple-500/10 border border-purple-500/20 text-purple-300">
              Premium Prompt
            </span>
            <h2 className="text-2xl font-black text-white">Unlock Unlimited Access</h2>
            <p className="text-xs sm:text-sm text-slate-400 line-clamp-1 max-w-xs">
              "{promptTitle}" is reserved for Pro members.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unlimited copying for all Premium Prompts</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Exclusive access to high-performing system prompts</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Priority access to upcoming AI workflows & features</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition"
            >
              Cancel
            </button>
            <div className="w-full">
              <Link href={'/dashboard/profile'}>
            <button
              onClick={() => {
                onClose();
              }}
              className="w-full sm:w-1/2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-purple-500/25 transition"
            >
              Upgrade Now
            </button>
            </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}