import SearchContent from "@/component/search/SearchContent";
import { Suspense } from "react";


export const metadata = {
  title: "Search AI Prompts | Prompt Marketplace",
  description: "Browse and discover top AI prompts for ChatGPT, Midjourney, Stable Diffusion, and Claude.",
};

// Top-level Suspense Boundary required for useSearchParams() in Next.js 15
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-sm text-slate-400 font-mono">Initializing Search...</p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}