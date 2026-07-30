"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  Shield,
  Calendar,
  Edit3,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Bookmark,
  FileCheck,
  Clock,
  FileText,
  Loader2,
  Copy,
  Star,
  Flag,
  Users,
  UserCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import PaymentModal from "@/component/DashBoard/PaymentModal";
import EditProfileModal from "@/component/DashBoard/EditProfileModal";

export default function ProfilePage() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();

  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Modals Visibility State
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Current active user reference
  const user = userData || session?.user;
  const role = user?.role || "User";

  // Single dynamic fetch function depending on user role
  const fetchDashboardData = useCallback(async (userEmail, userRole) => {
    if (!userEmail) return;

    try {
      setLoading(true);
      let url = "";

      if (userRole === "Creator") {
        url = `${process.env.NEXT_PUBLIC_URI}/api/creator/dashboard?email=${encodeURIComponent(userEmail)}`;
      } else if (userRole === "Admin") {
        url = `${process.env.NEXT_PUBLIC_URI}/api/admin/dashboard-overview`;
      } else {
        url = `${process.env.NEXT_PUBLIC_URI}/api/user/profile-stats?email=${encodeURIComponent(userEmail)}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch dashboard data (Status: ${res.status})`);
      }

      const data = await res.json();

      if (data.success || data.stats || data) {
        if (data.user) {
          setUserData(data.user);
        }
        setStats(data.stats || data);
      }
    } catch (err) {
      toast.error(err.message || "Failed to load dashboard metrics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      const activeRole = userData?.role || session.user.role || "User";
      fetchDashboardData(session.user.email, activeRole);
    } else if (!isSessionPending && !session) {
      setLoading(false);
    }
  }, [session, isSessionPending, fetchDashboardData]);

  const handleSignOut = useCallback(async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully.");
      window.location.href = "/login";
    } catch (err) {
      toast.error("Failed to sign out.");
    }
  }, []);

  // Compute cards dynamic array based on Role
  const cards = useMemo(() => {
    if (role === "Creator") {
      return [
        {
          label: "Total Prompts",
          val: stats.totalSubmitted ?? stats.totalPrompts ?? 0,
          icon: FileText,
          color: "text-blue-400",
          border: "hover:border-blue-500/40",
        },
        {
          label: "Approved Prompts",
          val: stats.approved ?? 0,
          icon: FileCheck,
          color: "text-emerald-400",
          border: "hover:border-emerald-500/40",
        },
        {
          label: "Pending Prompts",
          val: stats.pending ?? 0,
          icon: Clock,
          color: "text-amber-400",
          border: "hover:border-amber-500/40",
        },
        {
          label: "Total Copies",
          val: stats.totalCopies ?? stats.copies ?? 0,
          icon: Copy,
          color: "text-cyan-400",
          border: "hover:border-cyan-500/40",
        },
      ];
    }

    if (role === "Admin") {
      return [
        {
          label: "Total Users",
          val: stats.totalUsers ?? 0,
          icon: Users,
          color: "text-cyan-400",
          border: "hover:border-cyan-500/40",
        },
        {
          label: "Total Creators",
          val: stats.totalCreators ?? 0,
          icon: UserCheck,
          color: "text-purple-400",
          border: "hover:border-purple-500/40",
        },
        {
          label: "Total Prompts",
          val: stats.totalPrompts ?? 0,
          icon: FileText,
          color: "text-indigo-400",
          border: "hover:border-indigo-500/40",
        },
        {
          label: "Total Reports",
          val: stats.totalReports ?? stats.reports ?? 0,
          icon: Flag,
          color: "text-rose-400",
          border: "hover:border-rose-500/40",
        },
      ];
    }

    // Default Role = User
    return [
      {
        label: "Saved Prompts",
        val: stats.saved ?? 0,
        icon: Bookmark,
        color: "text-purple-400",
        border: "hover:border-purple-500/40",
      },
      {
        label: "Copied Prompts",
        val: stats.copies ?? 0,
        icon: Copy,
        color: "text-cyan-400",
        border: "hover:border-cyan-500/40",
      },
      {
        label: "Reviews",
        val: stats.reviews ?? 0,
        icon: Star,
        color: "text-amber-400",
        border: "hover:border-amber-500/40",
      },
      {
        label: "Reports",
        val: stats.reports ?? 0,
        icon: Flag,
        color: "text-rose-400",
        border: "hover:border-rose-500/40",
      },
    ];
  }, [role, stats]);

  console.log({
  role: session?.user?.role,
  session: session?.user,
})

  if (isSessionPending || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-200">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
        <p className="text-slate-400 text-sm animate-pulse">Loading Profile Workspace...</p>
      </div>
    );
  }

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
                    alt={user.name || "User Avatar"}
                    className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500/50 shadow-xl"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center text-indigo-400">
                    <UserIcon className="w-10 h-10" />
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
                  <h1 className="text-2xl font-bold text-white">{user?.name || "User"}</h1>
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
                    <Shield className="w-3 h-3 text-purple-400" /> {role}
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
          {cards.map((item, idx) => {
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
                  Activated on: {new Date(user?.premiumSince || Date.now()).toLocaleDateString()}
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

        {/* SECTION 4: ACCOUNT CONTROLS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-xl space-y-4"
        >
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> Account Controls
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
    </div>
  );
}