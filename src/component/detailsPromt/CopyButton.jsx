// src/components/prompt-details/CopyButton.jsx
"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import toast from "react-hot-toast";


export default function CopyButton({ prompt, currentUser, onCopySuccess, openPremiumModal }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Premium Check
    if (prompt.isPremium && (!currentUser || !currentUser.isPremium)) {
      openPremiumModal();
      return;
    }

    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      toast.success("Prompt copied to clipboard!");

      // Update Copy Count API
      fetch(`http://localhost:5500/api/prompt/copy/${prompt._id || prompt.id}`, {
        method: "PATCH",
      }).catch(() => {});

      onCopySuccess();

      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy prompt.");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`w-full py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl transition-all duration-300 ${
        copied
          ? "bg-emerald-600 text-white shadow-emerald-500/20"
          : "bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-cyan-500/20"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-5 h-5" /> Copied!
        </>
      ) : (
        <>
          {prompt.isPremium ? <Sparkles className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          Copy Prompt
        </>
      )}
    </button>
  );
}