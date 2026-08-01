"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Copy,
  Bookmark,
  Star,
  ExternalLink,
  Bot,
  Layers,
  Zap,
  FilterX,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search Query Param
  const queryParam = searchParams.get("q") || "";

  // Local Search Input state
  const [searchInput, setSearchInput] = useState(queryParam);

  // API Data States
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalFromApi, setTotalFromApi] = useState(0);

  // UI States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [pricingType, setPricingType] = useState("all"); // 'all', 'free', 'premium'

  // Update input field if URL search query changes externally
  useEffect(() => {
    setSearchInput(queryParam);
    setCurrentPage(1);
  }, [queryParam]);

  // Fetch prompts from API
  useEffect(() => {
    let isMounted = true;
    const fetchPrompts = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_URI || "";
        const url = `${baseUrl}/api/prompts/search?q=${encodeURIComponent(queryParam)}`;

        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Failed to fetch prompts (Status: ${res.status})`);
        }

        const json = await res.json();

        if (isMounted) {
          if (json.success) {
            setPrompts(json.data || []);
            setTotalFromApi(json.total || (json.data ? json.data.length : 0));
          } else {
            throw new Error(json.message || "Failed to load search results.");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Search API Error:", err);
          setError(err.message || "An unexpected error occurred.");
          setPrompts([]);
          setTotalFromApi(0);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPrompts();

    return () => {
      isMounted = false;
    };
  }, [queryParam]);

  // Handle Search Form Submission without page reloads
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`, { scroll: false });
    } else {
      router.push(`/search`, { scroll: false });
    }
  };

  // Filter & Options Data extracted dynamically or static fallback arrays
  const availableCategories = useMemo(() => {
    const cats = new Set(prompts.map((p) => p.category).filter(Boolean));
    return Array.from(cats).length > 0
      ? Array.from(cats)
      : ["Art & Design", "Marketing", "Coding", "Writing", "SEO", "Productivity"];
  }, [prompts]);

  const availableTools = useMemo(() => {
    const tools = new Set(prompts.map((p) => p.aiTool).filter(Boolean));
    return Array.from(tools).length > 0
      ? Array.from(tools)
      : ["ChatGPT", "Midjourney", "Claude", "Stable Diffusion", "DALL-E 3"];
  }, [prompts]);

  const availableDifficulties = ["Beginner", "Intermediate", "Advanced"];

  // Toggle array filters
  const toggleFilter = (item, state, setter) => {
    if (state.includes(item)) {
      setter(state.filter((i) => i !== item));
    } else {
      setter([...state, item]);
    }
    setCurrentPage(1);
  };

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedTools([]);
    setSelectedDifficulty([]);
    setPricingType("all");
    setCurrentPage(1);
  }, []);

  // Filter & Sort Logic using useMemo for high efficiency
  const filteredAndSortedPrompts = useMemo(() => {
    let result = [...prompts];

    // Filter by Category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by AI Tool
    if (selectedTools.length > 0) {
      result = result.filter((p) => selectedTools.includes(p.aiTool));
    }

    // Filter by Difficulty
    if (selectedDifficulty.length > 0) {
      result = result.filter((p) => selectedDifficulty.includes(p.difficulty));
    }

    // Filter by Pricing (Premium vs Free)
    if (pricingType === "free") {
      result = result.filter((p) => !p.isPremium && !p.price);
    } else if (pricingType === "premium") {
      result = result.filter((p) => p.isPremium || (p.price && p.price > 0));
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === "mostCopied") {
        return (b.copyCount || b.copies || 0) - (a.copyCount || a.copies || 0);
      }
      if (sortBy === "a-z") {
        return (a.title || "").localeCompare(b.title || "");
      }
      return 0;
    });

    return result;
  }, [prompts, selectedCategories, selectedTools, selectedDifficulty, pricingType, sortBy]);

  // Pagination calculation
  const totalItems = filteredAndSortedPrompts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  const paginatedPrompts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedPrompts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedPrompts, currentPage]);

  const activeFiltersCount =
    selectedCategories.length +
    selectedTools.length +
    selectedDifficulty.length +
    (pricingType !== "all" ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* TOP SECTION: Header & Search Bar */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Prompt Marketplace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
                Search Results
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {queryParam ? (
                  <>
                    Results for <span className="text-purple-300 font-semibold">"{queryParam}"</span> —{" "}
                    <span className="text-slate-200 font-mono">{totalFromApi}</span> prompts found
                  </>
                ) : (
                  <>Showing all available prompts in marketplace</>
                )}
              </p>
            </div>

            {/* Futuristic Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search prompts, tags, tools..."
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl py-3 pl-11 pr-12 text-sm text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                />
                <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput("")}
                    className="absolute right-10 text-slate-500 hover:text-slate-300 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 p-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-white transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* ACTION BAR: Mobile filter trigger & Sorting dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-sm font-medium transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-purple-400" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-purple-600 text-white rounded-full font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono">{filteredAndSortedPrompts.length}</span> items matching selected filters
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3 ml-auto">
              <label htmlFor="sort" className="text-xs font-medium text-slate-400 hidden sm:block">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="mostCopied">Most Copied</option>
                <option value="a-z">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </header>

        {/* MAIN BODY: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FILTER SIDEBAR (Desktop + Mobile Drawer) */}
          <aside
            className={`fixed lg:relative inset-0 z-50 lg:z-auto lg:block ${
              isFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            {/* Mobile backdrop */}
            <div
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            <div className="relative z-10 h-full lg:h-auto w-80 lg:w-full max-w-full bg-[#090d16] lg:bg-slate-900/30 border border-slate-800/80 rounded-none lg:rounded-3xl p-6 backdrop-blur-xl overflow-y-auto max-h-screen lg:max-h-none">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                  <h2 className="font-bold text-slate-200 text-base">Filters</h2>
                </div>
                <div className="flex items-center gap-3">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                    >
                      <FilterX className="w-3.5 h-3.5" /> Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="lg:hidden p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Filter: Access / Pricing */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Access Type
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {["all", "free", "premium"].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setPricingType(type);
                          setCurrentPage(1);
                        }}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border capitalize transition-all ${
                          pricingType === type
                            ? "bg-purple-600/20 border-purple-500 text-purple-300"
                            : "bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter: AI Tool */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-cyan-400" /> AI Tool
                  </h3>
                  <div className="space-y-2">
                    {availableTools.map((tool) => (
                      <label
                        key={tool}
                        className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer group hover:text-white"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTools.includes(tool)}
                          onChange={() => toggleFilter(tool, selectedTools, setSelectedTools)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                        />
                        <span className="text-xs group-hover:translate-x-0.5 transition-transform">
                          {tool}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter: Category */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-purple-400" /> Category
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                    {availableCategories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer group hover:text-white"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() =>
                            toggleFilter(cat, selectedCategories, setSelectedCategories)
                          }
                          className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                        />
                        <span className="text-xs group-hover:translate-x-0.5 transition-transform">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter: Difficulty */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Difficulty
                  </h3>
                  <div className="space-y-2">
                    {availableDifficulties.map((diff) => (
                      <label
                        key={diff}
                        className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer group hover:text-white"
                      >
                        <input
                          type="checkbox"
                          checked={selectedDifficulty.includes(diff)}
                          onChange={() =>
                            toggleFilter(diff, selectedDifficulty, setSelectedDifficulty)
                          }
                          className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                        />
                        <span className="text-xs group-hover:translate-x-0.5 transition-transform">
                          {diff}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RESULTS PROMPT GRID SECTION */}
          <main className="lg:col-span-3">
            {/* 1. Loading Skeleton */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))}
              </div>
            )}

            {/* 2. Error State */}
            {!loading && error && (
              <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-center">
                <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-200 mb-1">Failed to Load Prompts</h3>
                <p className="text-sm text-slate-400 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-xl text-xs font-semibold border border-red-500/30 transition-all"
                >
                  Retry Search
                </button>
              </div>
            )}

            {/* 3. Empty State */}
            {!loading && !error && paginatedPrompts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 px-6 text-center rounded-3xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-xl flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">
                  No prompts found {queryParam && `for "${queryParam}"`}
                </h3>
                <p className="text-slate-400 text-sm max-w-md mb-6">
                  We couldn't find any prompts matching your search parameters. Try adjusting your
                  filters or searching with different keywords.
                </p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/20"
                  >
                    Reset All Filters
                  </button>
                )}
              </motion.div>
            )}

            {/* 4. Prompt Card Grid */}
            {!loading && !error && paginatedPrompts.length > 0 && (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  <AnimatePresence>
                    {paginatedPrompts.map((prompt) => (
                      <PromptCard key={prompt._id || prompt.id} prompt={prompt} />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* PAGINATION CONTROLS */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 px-2">
                      {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                              currentPage === pageNum
                                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                                : "bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:bg-slate-800"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   PROMPT CARD COMPONENT
   ============================================================================ */
function PromptCard({ prompt }) {
  const [copied, setCopied] = useState(false);

  const {
    _id,
    id,
    title,
    description,
    thumbnail,
    isPremium,
    price,
    category,
    aiTool,
    difficulty,
    copyCount = 0,
    bookmarkCount = 0,
    rating = 5.0,
    creator,
  } = prompt;

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (prompt.promptText) {
      navigator.clipboard.writeText(prompt.promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cardId = _id || id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300"
    >
      <div>
        {/* Card Thumbnail Section */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title || "Prompt Thumbnail"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/40">
              <Sparkles className="w-8 h-8 text-purple-500/30" />
            </div>
          )}

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5 z-10">
            {isPremium || price > 0 ? (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-black text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                Premium
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-black text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                Free
              </span>
            )}
            {aiTool && (
              <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 text-[10px] font-semibold">
                {aiTool}
              </span>
            )}
          </div>

          {/* Quick Copy Action */}
          <button
            onClick={handleCopy}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-white hover:bg-purple-600 transition-all opacity-0 group-hover:opacity-100"
            title="Copy Prompt"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4">
          {/* Metadata Row */}
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 mb-2">
            <span className="text-purple-400 font-semibold truncate">{category || "General"}</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400 text-[10px]">
              {difficulty || "Intermediate"}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-100 text-sm line-clamp-1 group-hover:text-purple-300 transition-colors mb-1">
            {title || "Untitled Prompt"}
          </h3>

          {/* Short Description */}
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
            {description || "No detailed description provided for this prompt."}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2 text-xs text-slate-400">
        {/* Creator Info */}
        <div className="flex items-center gap-2 truncate">
          {creator?.avatar ? (
            <img src={creator.avatar} alt={creator.name} className="w-5 h-5 rounded-full object-cover" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-[9px] font-bold text-purple-300">
              {creator?.name ? creator.name[0] : "A"}
            </div>
          )}
          <span className="truncate text-slate-300 text-[11px] font-medium">
            {creator?.name || "Anonymous"}
          </span>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="flex items-center gap-1 text-[11px]">
            <Copy className="w-3 h-3 text-slate-500" />
            <span>{copyCount}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-400">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{rating}</span>
          </div>
          <Link
            href={`/prompt/${cardId}`}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white transition-colors ml-1"
            title="View Prompt"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================================
   SKELETON LOADING CARD
   ============================================================================ */
function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-3 flex flex-col justify-between animate-pulse">
      <div>
        <div className="w-full aspect-video rounded-xl bg-slate-800/60 mb-3" />
        <div className="flex justify-between mb-2">
          <div className="w-16 h-3 bg-slate-800/60 rounded" />
          <div className="w-12 h-3 bg-slate-800/60 rounded" />
        </div>
        <div className="w-3/4 h-4 bg-slate-800/80 rounded mb-2" />
        <div className="w-full h-3 bg-slate-800/40 rounded mb-1" />
        <div className="w-2/3 h-3 bg-slate-800/40 rounded mb-4" />
      </div>
      <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center">
        <div className="w-16 h-4 bg-slate-800/60 rounded-full" />
        <div className="w-12 h-4 bg-slate-800/60 rounded" />
      </div>
    </div>
  );
}