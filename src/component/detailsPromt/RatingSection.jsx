// src/components/prompt-details/RatingSection.jsx
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500";

export default function RatingSection({ promptId, userRating, onRatingUpdated }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(userRating || 0);

  const handleRate = async (val) => {
    try {
      setRating(val);
      const res = await fetch(`${API_BASE_URL}/api/prompt/rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId, rating: val }),
      });
      if (!res.ok) throw new Error();

      toast.success("Rating submitted.");
      onRatingUpdated(val);
    } catch {
      toast.error("Failed to submit rating.");
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
        Rate this prompt
      </label>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRate(star)}
            className="p-1 transition transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hoverRating || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-700"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}