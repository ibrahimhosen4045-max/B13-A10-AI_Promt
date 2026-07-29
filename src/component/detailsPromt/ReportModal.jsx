"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, X, Send } from "lucide-react";
import toast from "react-hot-toast";

const REPORT_REASONS = ["Spam", "Copyright", "Harmful", "Fake", "Other"];


export default function ReportModal({ isOpen,
  onClose,
  promptId,
  userEmail,
  userName }) {
  const [reason, setReason] = useState("Spam");
  const [explanation, setExplanation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch(`http://localhost:5500/api/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId,
          userEmail,
          userName,
          reason,
          description: explanation, }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Report submitted successfully.");
      onClose();
      setExplanation("");
    } catch (err) {
      toast.error(err.message || "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-rose-400">
              <Flag className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Report Prompt</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-rose-500"
              >
                {REPORT_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Explanation</label>
              <textarea
                rows={4}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Provide additional details regarding this report..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-rose-500 resize-none placeholder-slate-600"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 rounded-xl bg-slate-800 font-bold text-slate-300 hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-1/2 py-2.5 rounded-xl bg-rose-600 font-bold text-white hover:bg-rose-500 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}