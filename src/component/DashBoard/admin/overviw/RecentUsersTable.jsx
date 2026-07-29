"use client";

import { UserX, ShieldCheck, Crown, User } from "lucide-react";

export default function RecentUsersTable({ users = [] }) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-8 text-center space-y-3">
        <UserX className="w-8 h-8 text-slate-600 mx-auto" />
        <h4 className="text-sm font-semibold text-slate-300">No Recent Registrations</h4>
        <p className="text-xs text-slate-500">New platform users will appear here automatically.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 shadow-xl overflow-hidden space-y-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Recent User Registrations
          </h3>
          <p className="text-xs text-slate-400">Latest accounts onboarded to the platform</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Membership</th>
              <th className="py-3 px-4">Joined Date</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-xs">
            {users.map((user) => (
              <tr key={user._id || user.email} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white uppercase text-xs shrink-0 ring-2 ring-cyan-500/20">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        user.name?.charAt(0) || "U"
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-200">{user.name || "Anonymous"}</p>
                      <p className="text-[11px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 capitalize font-medium text-slate-300">
                  <span className="inline-flex items-center gap-1">
                    {user.role === "admin" ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    {user.role || "User"}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  {user.isPremium ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Crown className="w-3 h-3" /> PRO
                    </span>
                  ) : (
                    <span className="text-slate-500 font-medium">Standard</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-slate-400">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently"}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      user.isBlocked ? "bg-rose-500" : "bg-emerald-500 animate-pulse"
                    }`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}