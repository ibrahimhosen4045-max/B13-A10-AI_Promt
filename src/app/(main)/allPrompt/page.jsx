"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import Pagination from "@/component/allPrompt/Pagination";
import PromptGrid from "@/component/allPrompt/PromptGrid";
import SortDropdown from "@/component/allPrompt/SortDropdown";
import FilterBar from "@/component/allPrompt/FilterBar";
import SearchBar from "@/component/allPrompt/SearchBar";


const ITEMS_PER_PAGE = 6;

export default function AllPromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    aiTool: "All",
    difficulty: "All",
    pricing: "All",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Prompts from GET /api/allPromt
  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/allPromt`);
      if (!res.ok) throw new Error("Failed to fetch prompts");
      const data = await res.json();
      
      const promptList = Array.isArray(data) ? data : data.data || [];
      
      // Safety filter for approved & public prompts
      const filteredList = promptList.filter((p) => {
        const isApproved = (p.status || "").toLowerCase() === "approved";
        const isPublic = (p.visibility || "public").toLowerCase() === "public";
        return isApproved && isPublic;
      });

      setPrompts(filteredList);
    } catch (err) {
      toast.error(err.message || "Failed to load marketplace prompts");
      setPrompts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  // Reset Filters
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setFilters({
      category: "All",
      aiTool: "All",
      difficulty: "All",
      pricing: "All",
    });
    setSortBy("newest");
    setCurrentPage(1);
  }, []);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "All") count++;
    if (filters.aiTool !== "All") count++;
    if (filters.difficulty !== "All") count++;
    if (filters.pricing !== "All") count++;
    if (searchQuery.trim() !== "") count++;
    return count;
  }, [filters, searchQuery]);

  // Optimized Instant Search + Filtering + Sorting using useMemo
  const filteredAndSortedPrompts = useMemo(() => {
    let result = [...prompts];

    // 1. Instant Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const title = (p.title || "").toLowerCase();
        const creator = (p.creatorName || p.userName || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const tool = (p.aiTool || p.tool || "").toLowerCase();
        return (
          title.includes(q) ||
          creator.includes(q) ||
          cat.includes(q) ||
          tool.includes(q)
        );
      });
    }

    // 2. Category Filter
    if (filters.category !== "All") {
      result = result.filter(
        (p) => (p.category || "").toLowerCase() === filters.category.toLowerCase()
      );
    }

    // 3. AI Tool Filter
    if (filters.aiTool !== "All") {
      result = result.filter(
        (p) =>
          (p.aiTool || p.tool || "").toLowerCase() === filters.aiTool.toLowerCase()
      );
    }

    // 4. Difficulty Filter
    if (filters.difficulty !== "All") {
      result = result.filter(
        (p) =>
          (p.difficulty || "").toLowerCase() === filters.difficulty.toLowerCase()
      );
    }

    // 5. Pricing Filter
    if (filters.pricing !== "All") {
      if (filters.pricing === "Premium") {
        result = result.filter((p) => Boolean(p.isPremium));
      } else if (filters.pricing === "Free") {
        result = result.filter((p) => !p.isPremium);
      }
    }

    // 6. Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === "alphabetical") {
        return (a.title || "").localeCompare(b.title || "");
      }
      if (sortBy === "mostCopied") {
        return (b.copyCount || 0) - (a.copyCount || 0);
      }
      if (sortBy === "highestRated") {
        return (b.averageRating || 0) - (a.averageRating || 0);
      }
      return 0;
    });

    return result;
  }, [prompts, searchQuery, filters, sortBy]);

  // Pagination Slice
  const paginatedPrompts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedPrompts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedPrompts, currentPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortBy]);

  const handleViewDetails = (prompt) => {
    toast(`Viewing prompt: ${prompt.title}`);
  };

  return (
    <div className="min-h-screen pt-25 md:pt-25 lg:pt-25 bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-10 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-3xl backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> AI Marketplace
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Explore All Prompts
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Discover, copy, and learn from premium prompts optimized for ChatGPT, Claude, Midjourney, and more.
            </p>
          </div>

          <button
            onClick={() => {
              fetchPrompts();
              toast.success("Marketplace refreshed");
            }}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition shadow-lg relative z-10"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            Refresh
          </button>
        </motion.div>

        {/* Search Bar */}
        <div className="flex flex-col gap-2">
          <div className="flex-5">
            <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            />
          </div>

          <div className="flex-2 flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-slate-400">
              Found <span className="text-cyan-400 font-extrabold">{filteredAndSortedPrompts.length}</span> prompts
            </span>
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 lg:gap-7">
          {/* Filters and Sorting Toolbar */}
          <div className="flex-4 xl:flex-3">
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              activeCount={activeFilterCount}
            />  
          </div>

          {/* Main Grid */}
          <div className="flex-10 ">
            <PromptGrid
            loading={loading}
            prompts={paginatedPrompts}
            onViewDetails={handleViewDetails}
           resetFilters={resetFilters}
          />
          </div>

        </div>
        {/* Pagination */}
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredAndSortedPrompts.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}