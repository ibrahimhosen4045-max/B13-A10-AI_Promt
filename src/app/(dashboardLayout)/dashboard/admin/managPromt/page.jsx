"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import toast from "react-hot-toast";
import StatsCards from "@/component/DashBoard/admin/StatsCards";
import FilterBar from "@/component/DashBoard/admin/FilterBar";
import PromptsTable from "@/component/DashBoard/admin/PromptsTable";
import ViewPromptModal from "@/component/DashBoard/admin/ViewPromptModal";
import DeleteModal from "@/component/DashBoard/admin/DeleteModal";


export default function ManagePromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Action states
  const [updatingId, setUpdatingId] = useState(null);
  const [promptToDelete, setPromptToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewingPrompt, setViewingPrompt] = useState(null);

  // Fetch Prompts
  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/admin/all-prompts`);
      if (!res.ok) throw new Error("Failed to fetch prompts");
      const data = await res.json();
      setPrompts(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(err.message || "Failed to load prompts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = prompts.length;
    const pending = prompts.filter((p) => p.status?.toLowerCase() === "pending").length;
    const approved = prompts.filter((p) => p.status?.toLowerCase() === "approved").length;
    const rejected = prompts.filter((p) => p.status?.toLowerCase() === "rejected").length;
    const premium = prompts.filter((p) => p.isPremium).length;

    return { total, pending, approved, rejected, premium };
  }, [prompts]);

  // Approve Prompt
  const handleApprove = async (id) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/admin/prompt/approve/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Prompt approved successfully");
        setPrompts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "Approved" } : p))
        );
        if (viewingPrompt?._id === id) {
          setViewingPrompt((prev) => ({ ...prev, status: "Approved" }));
        }
      } else {
        toast.error(data.message || "Failed to approve prompt");
      }
    } catch (err) {
      toast.error("Error approving prompt");
    } finally {
      setUpdatingId(null);
    }
  };

  // Reject Prompt
  const handleReject = async (id) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/admin/prompt/reject/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Prompt rejected successfully");
        setPrompts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "Rejected" } : p))
        );
        if (viewingPrompt?._id === id) {
          setViewingPrompt((prev) => ({ ...prev, status: "Rejected" }));
        }
      } else {
        toast.error(data.message || "Failed to reject prompt");
      }
    } catch (err) {
      toast.error("Error rejecting prompt");
    } finally {
      setUpdatingId(null);
    }
  };

  // Toggle Premium Status
  const handleTogglePremium = async (id, currentStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/admin/prompt/premium/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPremium: !currentStatus }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(
          data.message ||
            `Prompt marked as ${!currentStatus ? "Premium" : "Free"}`
        );
        setPrompts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, isPremium: !currentStatus } : p))
        );
        if (viewingPrompt?._id === id) {
          setViewingPrompt((prev) => ({ ...prev, isPremium: !currentStatus }));
        }
      } else {
        toast.error(data.message || "Failed to update premium status");
      }
    } catch (err) {
      toast.error("Error updating premium status");
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete Prompt
  const handleDeletePrompt = async () => {
    if (!promptToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/admin/prompt/${promptToDelete._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Prompt deleted successfully");
        setPrompts((prev) => prev.filter((p) => p._id !== promptToDelete._id));
        if (viewingPrompt?._id === promptToDelete._id) {
          setViewingPrompt(null);
        }
        setPromptToDelete(null);
      } else {
        toast.error(data.message || "Failed to delete prompt");
      }
    } catch (err) {
      toast.error("Error deleting prompt");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter & Search Logic
  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const query = searchQuery.toLowerCase().trim();
      const creatorName = (prompt.creatorName || prompt.userName || "").toLowerCase();
      const creatorEmail = (prompt.creatorEmail || prompt.userEmail || "").toLowerCase();
      const title = (prompt.title || "").toLowerCase();

      const matchesSearch =
        !query ||
        title.includes(query) ||
        creatorName.includes(query) ||
        creatorEmail.includes(query);

      const status = (prompt.status || "").toLowerCase();
      let matchesFilter = true;

      switch (statusFilter) {
        case "Pending":
          matchesFilter = status === "pending";
          break;
        case "Approved":
          matchesFilter = status === "approved";
          break;
        case "Rejected":
          matchesFilter = status === "rejected";
          break;
        case "Premium":
          matchesFilter = Boolean(prompt.isPremium);
          break;
        case "Free":
          matchesFilter = !prompt.isPremium;
          break;
        default:
          matchesFilter = true;
      }

      return matchesSearch && matchesFilter;
    });
  }, [prompts, searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER & TOP STATS CARDS */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl shadow-2xl"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Manage Prompts
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Review submissions, manage access levels, moderate marketplace prompt quality.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchPrompts}
                className="px-4 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition"
              >
                Refresh Data
              </button>
            </div>
          </motion.div>

          {/* STATS CARDS COMPONENT */}
          <StatsCards stats={stats} />
        </div>

        {/* SEARCH & FILTER CONTROLS COMPONENT */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* PROMPTS TABLE COMPONENT */}
        <PromptsTable
          loading={loading}
          filteredPrompts={filteredPrompts}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          setSearchQuery={setSearchQuery}
          setStatusFilter={setStatusFilter}
          setViewingPrompt={setViewingPrompt}
          handleApprove={handleApprove}
          handleReject={handleReject}
          handleTogglePremium={handleTogglePremium}
          setPromptToDelete={setPromptToDelete}
          updatingId={updatingId}
        />
      </div>

      {/* VIEW PROMPT MODAL COMPONENT */}
      <ViewPromptModal
        viewingPrompt={viewingPrompt}
        setViewingPrompt={setViewingPrompt}
        handleApprove={handleApprove}
        handleReject={handleReject}
        updatingId={updatingId}
      />

      {/* DELETE CONFIRMATION MODAL COMPONENT */}
      <DeleteModal
        promptToDelete={promptToDelete}
        setPromptToDelete={setPromptToDelete}
        handleDeletePrompt={handleDeletePrompt}
        isDeleting={isDeleting}
      />
    </div>
  );
}