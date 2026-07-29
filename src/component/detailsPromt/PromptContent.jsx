"use client";

import { Terminal } from "lucide-react";

export default function PromptContent({ description, prompt, openPremiumModal, user }) {

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Description
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/30 border border-slate-800/60 p-4 rounded-2xl backdrop-blur-md">
          {description || "No description provided."}
        </p>
      </div>

      {/* Prompt Code Block */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" /> System Prompt
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">UTF-8 Plaintext</span>
        </div>

        <div className="relative h-50 rounded-2xl bg-slate-950 border border-slate-800 p-5 overflow-hidden">

  <pre
    className={`font-mono text-xs sm:text-sm text-cyan-200/90 whitespace-pre-wrap break-words leading-relaxed transition duration-300 ${
      prompt.isPremium && !user?.isPremium
        ? "blur-md select-none pointer-events-none"
        : ""
    }`}
  >
    {prompt.content}
  </pre>

  {prompt.isPremium && !user?.isPremium && (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/50 backdrop-blur-[2px]">
      <div className="max-w-sm text-center px-6">
        <h3 className="text-xl font-bold text-white">
          🔒 Premium Prompt 
        </h3>

        <p className="mt-2 text-sm text-slate-300">
          Upgrade to Premium to unlock and copy this prompt.
        </p>

        <button
          onClick={openPremiumModal}
          className="mt-5 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-bold hover:scale-105 transition"
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  )}
</div>
      </div>
    </div>
  );
}