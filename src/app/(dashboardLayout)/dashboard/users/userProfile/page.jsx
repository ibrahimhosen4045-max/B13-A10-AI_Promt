"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Edit3,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Trash2,
  Bookmark,
  FileCheck,
  Clock,
  FileText,
  Loader2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import PaymentModal from "@/component/DashBoard/PaymentModal";
import EditProfileModal from "@/component/DashBoard/EditProfileModal";

export default function ProfilePage() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();

  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({ totalSubmitted: 0, approved: 0, pending: 0, saved: 0 });
  const [loading, setLoading] = useState(true);

  // Modals Visibility State
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchProfileStats = useCallback(async (email) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5500/api/user/profile-stats?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();

      if (data.success) {
        setUserData(data.user);
        setStats(data.stats);
      }
    } catch (err) {
      toast.error("Failed to load user profile metrics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      fetchProfileStats(session.user.email);
    } else if (!isSessionPending && !session) {
      setLoading(false);
    }
  }, [session, isSessionPending, fetchProfileStats]);

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully.");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(
        "http://localhost:5500/api/user-account-delet",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session?.user?.email }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Account deleted.");
        await authClient.signOut();
        window.location.href = "/";
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to delete account.");
    }
  };

  if (isSessionPending || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-200">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
        <p className="text-slate-400 text-sm animate-pulse">Loading Profile Workspace...</p>
      </div>
    );
  }

  const user = userData || session?.user;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* SECTION 1: PROFILE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="relative">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500/50 shadow-xl"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center text-indigo-400">
                    <User className="w-10 h-10" />
                  </div>
                )}
                {user?.isPremium && (
                  <div
                    className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1.5 rounded-full shadow-lg"
                    title="Premium Active"
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                  {user?.isPremium && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      PRO
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> {user?.email}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/50">
                    <Shield className="w-3 h-3 text-purple-400" /> {user?.role || "User"}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/50">
                    <Calendar className="w-3 h-3 text-indigo-400" /> Joined{" "}
                    {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 rounded-xl transition"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </motion.div>

        {/* SECTION 2: STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Prompts", val: stats.totalSubmitted, icon: FileText, color: "text-blue-400", border: "hover:border-blue-500/40" },
            { label: "Approved", val: stats.approved, icon: FileCheck, color: "text-emerald-400", border: "hover:border-emerald-500/40" },
            { label: "Pending", val: stats.pending, icon: Clock, color: "text-amber-400", border: "hover:border-amber-500/40" },
            { label: "Saved Prompts", val: stats.saved, icon: Bookmark, color: "text-purple-400", border: "hover:border-purple-500/40" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 ${item.border} transition-all backdrop-blur-xl`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-400">{item.label}</span>
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <p className="text-2xl font-bold text-white">{item.val}</p>
              </motion.div>
            );
          })}
        </div>

        {/* SECTION 3: PREMIUM MEMBERSHIP CARD */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden"
        >
          {user?.isPremium ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Premium Member
                </div>
                <h3 className="text-xl font-bold text-white mt-2">Lifetime Access Active</h3>
                <p className="text-xs text-slate-400">
                  Activated on: {new Date(user?.premiumSince).toLocaleDateString()}
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-sm">
                Unlimited Submissions Enabled
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> Lifetime Plan
                </div>
                <h3 className="text-2xl font-extrabold text-white">Unlock Unlimited Potential for $5</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited Prompt Submissions (Free capped at 3)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Complete Access to Private & Premium Market Prompts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Early Access to New Automation Tools
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setIsPayOpen(true)}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/25 hover:opacity-95 transition"
              >
                Upgrade to Premium
              </button>
            </div>
          )}
        </motion.div>

        {/* SECTION 4: DANGER ZONE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-rose-950/10 border border-rose-500/20 p-6 backdrop-blur-xl space-y-4"
        >
          <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Account Controls
          </h3>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div>
              <p className="text-sm font-semibold text-white">Session Management</p>
              <p className="text-xs text-slate-400">Sign out of your active workspace session safely.</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-xl transition"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <div className="border-t border-rose-500/10 pt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-rose-300">Permanent Removal</p>
              <p className="text-xs text-slate-400">Delete your user profile, submitted prompts, and saved history forever.</p>
            </div>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition shadow-lg shadow-rose-600/20"
            >
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </motion.div>
      </div>

      {/* MODALS */}
      <PaymentModal
        isOpen={isPayOpen}
        onClose={() => setIsPayOpen(false)}
        userEmail={session?.user?.email}
        onSuccess={(updatedUser) => setUserData(updatedUser)}
      />

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={user}
        onSuccess={(updatedUser) => setUserData(updatedUser)}
      />

      {/* Standard Tailwind Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <h2 className="text-lg font-bold text-rose-400">Confirm Account Deletion</h2>
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-300">
                Are you absolutely sure you want to delete your account? This action cannot be undone and will erase all your prompts and saved data.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-800 bg-slate-900/50">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-5 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition shadow-lg shadow-rose-600/20"
              >
                Yes, Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}