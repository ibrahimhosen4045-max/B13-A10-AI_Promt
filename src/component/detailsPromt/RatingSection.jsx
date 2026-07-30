// src/components/prompt-details/RatingSection.jsx
"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";


export default function RatingSection({ promptId, userRating, onRatingUpdated, userEmail,  userName }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(userRating || 0);

  useEffect(() => {
    setRating(userRating || 0);
}, [userRating]);

const handleRate = async (val) => {
  try {
    setRating(val);

    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promptId,
        userEmail,
        userName,
        rating: val,
      }),
    });

    const data = await res.json();

    console.log(res.status);
    console.log(data);

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);

    onRatingUpdated();
  } catch (error) {
    console.log(error);
    toast.error("Failed to submit rating");
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