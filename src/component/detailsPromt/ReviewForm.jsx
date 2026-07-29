// src/components/prompt-details/ReviewForm.jsx
"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500";

export default function ReviewForm({ promptId, userRating, onReviewAdded }) {
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/api/prompt/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId, rating: userRating || 5, comment }),
      });

      if (!res.ok) throw new Error();

      toast.success("Review submitted successfully.");
      setComment("");
      onReviewAdded();
    } catch {
      toast.error("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 pt-4 border-t border-slate-800/60">
      <textarea
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your experience with this prompt..."
        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 resize-none"
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-bold text-xs text-slate-950 transition flex items-center gap-2 disabled:opacity-50"
      >
        <Send className="w-3.5 h-3.5" />
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}