"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Shield,
  Sparkles,
  UserCheck,
  UserX,
  Trash2,
  AlertTriangle,
  Loader2,
  X,
  ChevronDown,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Action states
  const [updatingRoleId, setUpdatingRoleId] = useState(null);
  const [blockingUserId, setBlockingUserId] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    try {

      setLoading(true);

      const res = await fetch("http://localhost:5500/api/allUser/register");

      if (!res.ok) throw new Error("Failed to load users data");

      const data = await res.json();
      
      setUsers(data);
    } catch (err) {
      toast.error(err.message || "Something went wrong while fetching users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle Role Change
  const handleRoleChange = async (userId, newRole) => {
    setUpdatingRoleId(userId);
    try {
      const res = await fetch(`http://localhost:5500/api/admin/user/role/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || `Role updated to ${newRole}`);
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch (err) {
      toast.error("Error updating role");
    } finally {
      setUpdatingRoleId(null);
    }
  };

  // Handle Block / Unblock User
  const handleToggleBlock = async (userId, currentBlockedState) => {
    const nextBlockedState = !currentBlockedState;
    setBlockingUserId(userId);

    try {
      const res = await fetch(`http://localhost:5500/api/admin/user-block/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked: nextBlockedState }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || (nextBlockedState ? "User blocked" : "User unblocked"));
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u._id === userId ? { ...u, isBlocked: nextBlockedState } : u))
        );
      } else {
        toast.error(data.message || "Failed to update user status");
      }
    } catch (err) {
      toast.error("Error updating block status");
    } finally {
      setBlockingUserId(null);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`http://localhost:5500/api/admin/user-delet/${userToDelete._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      console.log(res.status)
      console.log(data)

      if (res.ok) {
        toast.success(data.message || "User and associated prompts deleted");
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userToDelete._id));
        setUserToDelete(null);
      } else {
        toast.error(data.message || "Failed to delete user");
      }
    } catch (err) {
      toast.error("Error deleting user");
    } finally {
      setIsDeleting(false);
    }
  };

  // Instant Frontend Search Filtering
  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return users;
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER & TOP STATS */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl shadow-2xl"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                <Users className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Manage Users
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Control user permissions, manage roles, and review accounts across the platform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300">
              Total Users: <span className="text-white font-bold">{users.length}</span>
            </div>
          </div>
        </motion.div>

        {/* SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="relative"
        >
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users by name or email address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 backdrop-blur-md transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        {/* MAIN TABLE CONTENT AREA */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          {loading ? (
            /* SKELETON LOADER */
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/50 animate-pulse"
                >
                  <div className="flex items-center gap-3 w-1/4">
                    <div className="w-10 h-10 rounded-full bg-slate-800" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3.5 bg-slate-800 rounded w-3/4" />
                      <div className="h-2.5 bg-slate-800/60 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-4 bg-slate-800 rounded w-1/6" />
                  <div className="h-6 bg-slate-800 rounded-full w-16" />
                  <div className="h-6 bg-slate-800 rounded-full w-16" />
                  <div className="h-8 bg-slate-800 rounded-xl w-24" />
                </div>
              ))}
            </div>
          ) : filteredUsers.length === 0 ? (
            /* EMPTY STATE */
            <div className="py-16 px-4 text-center space-y-4 flex flex-col items-center justify-center">
              <div className="p-4 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400">
                <UserX className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">No users found</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  {searchQuery
                    ? `No matching records found for "${searchQuery}". Try searching with another keyword.`
                    : "There are currently no registered users in the database."}
                </p>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl border border-indigo-500/20 transition"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            /* USER TABLE */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Avatar</th>
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Premium</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  <AnimatePresence>
                    {filteredUsers.map((user) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-800/30 transition-colors"
                      >
                        {/* Avatar */}
                        <td className="py-4 px-6">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name || "User"}
                              className="w-10 h-10 rounded-full object-cover border border-slate-700"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                              <User className="w-5 h-5" />
                            </div>
                          )}
                        </td>

                        {/* Name */}
                        <td className="py-4 px-6 font-semibold text-slate-100 whitespace-nowrap">
                          {user.name || "N/A"}
                        </td>

                        {/* Email */}
                        <td className="py-4 px-6 text-slate-400 whitespace-nowrap">
                          {user.email}
                        </td>

                        {/* Role Select Dropdown */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="relative inline-block">
                            <select
                              value={user.role || "User"}
                              disabled={updatingRoleId === user._id}
                              onChange={(e) => handleRoleChange(user._id, e.target.value)}
                              className="appearance-none bg-slate-950 border border-slate-700 hover:border-slate-600 rounded-xl px-3 py-1.5 pr-8 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer disabled:opacity-50 transition"
                            >
                              <option value="User">User</option>
                              <option value="Creator">Creator</option>
                              <option value="Admin">Admin</option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </td>

                        {/* Premium Status Badge */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          {user.isPremium ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <Sparkles className="w-3 h-3" /> Premium
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
                              Free
                            </span>
                          )}
                        </td>

                        {/* Block Status Indicator */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          {user.isBlocked ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              <UserX className="w-3 h-3" /> Blocked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <UserCheck className="w-3 h-3" /> Active
                            </span>
                          )}
                        </td>

                        {/* Actions (Block/Unblock, Delete) */}
                        <td className="py-4 px-6 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Block / Unblock Button */}
                            <button
                              onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                              disabled={blockingUserId === user._id}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
                                user.isBlocked
                                  ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                  : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30"
                              }`}
                            >
                              {blockingUserId === user._id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : user.isBlocked ? (
                                "Unblock"
                              ) : (
                                "Block"
                              )}
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => setUserToDelete(user)}
                              className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition"
                              title="Delete user account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-lg">
                <AlertTriangle className="w-5 h-5" />
                <span>Confirm User Deletion</span>
              </div>
              <button
                onClick={() => setUserToDelete(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-sm text-slate-300">
                Are you sure you want to delete{" "}
                <span className="font-bold text-white">{userToDelete.name || userToDelete.email}</span>?
              </p>
              <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-500/20 p-3 rounded-xl">
                Warning: This action is permanent. All prompts uploaded by this user will also be deleted from the database.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-800 bg-slate-900/50">
              <button
                onClick={() => setUserToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={isDeleting}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition shadow-lg shadow-rose-600/20 disabled:opacity-50"
              >
                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                Yes, Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}