// src/components/prompt-details/BookmarkButton.jsx
"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import toast from "react-hot-toast";

export default function BookmarkButton({ promptId, isBookmarkedInitial, onBookmarkToggle, userEmail, prompt, user }) {
  const [bookmarked, setBookmarked] = useState(isBookmarkedInitial);
  const [loading, setLoading] = useState(false);
  
  
  const handleToggle = async () => {
    try {
      if(!user?.isPremium && prompt?.isPremium){
          toast.error("Please Upgrade premium")
          return
        }
      setLoading(true);
      if (!bookmarked) {
        // Save Bookmark
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/bookmark`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ promptId, userEmail }),
        });
        if (!res.ok) throw new Error();
        setBookmarked(true);
        toast.success("Prompt saved.");
        onBookmarkToggle(1);
      } else {
        // Remove Bookmark
        const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/bookmark/${promptId}?email=${userEmail}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error();
        setBookmarked(false);
        toast.success("Bookmark removed.");
        onBookmarkToggle(-1);
      }
    } catch {
      toast.error("Failed to update bookmark.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  setBookmarked(isBookmarkedInitial);
}, [isBookmarkedInitial]);

  return (
    <button
      disabled={loading}
      onClick={handleToggle}
      className={`p-4 rounded-2xl border transition shadow-lg ${
        bookmarked
          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
      }`}
    >
      <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-emerald-400" : ""}`} />
    </button>
  );
}