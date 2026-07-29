"use client";

import { Star } from "lucide-react";

export default function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-xs text-slate-500 py-4 text-center">
        No reviews yet. Be the first to review this prompt!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((rev, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-300">
                {(rev.userName || "U").charAt(0)}
              </div>
              <span className="text-xs font-bold text-slate-200">
                {rev.userName || "Anonymous"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-3 h-3 ${
                    idx < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
        </div>
      ))}
    </div>
  );
}