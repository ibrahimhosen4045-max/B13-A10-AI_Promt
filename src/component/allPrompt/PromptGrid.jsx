"use client";

import PromptCard from "./PromptCard";
import PromptSkeleton from "./PromptSkeleton";
import EmptyState from "./EmptyState";
import { AnimatePresence } from "framer-motion";

export default function PromptGrid({ loading, prompts, onViewDetails, resetFilters }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <PromptSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!prompts || prompts.length === 0) {
    return <EmptyState resetFilters={resetFilters} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
      <AnimatePresence>
        {prompts.map((prompt) => (
        <PromptCard
          key={prompt._id || prompt.id}
          prompt={prompt}
          onViewDetails={onViewDetails}
        />
      ))}
      </AnimatePresence>
    </div>
  );
}