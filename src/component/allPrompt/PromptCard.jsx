"use client";

import { motion } from "framer-motion";
import { Star, Copy, Bookmark, Eye, Sparkles, Layers, Zap, Unlock } from "lucide-react";
import Link from "next/link";

export default function PromptCard({ prompt, onViewDetails }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const creatorName = prompt.creatorName || prompt.userName || "Anonymous";
  const creatorAvatar = prompt.creatorAvatar || prompt.userAvatar || null;

  return (
    <motion.div
      key={prompt.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 p-5 backdrop-blur-xl shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between transition-all overflow-hidden"
    >
      {/* Subtle Glow Overlay */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="space-y-4">
        {/* Thumbnail & Badges */}
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-900">
          <img 
            src={prompt.thumbnail} 
            alt={prompt.title} 
            className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
          />
                
          {/* Creator Info overlay badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
            <img 
              src={prompt.creatorImage || prompt.userImage || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80"} 
              alt="Avatar" 
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-[10px] font-bold text-gray-200">{prompt.creatorName || prompt.userName || "@Smith Wright"}</span>
          </div>


        {prompt.isPremium && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-lg tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Premium
          </div>
        ) }
        </div>

        {/* Info and Details */}
        <div className="flex flex-col gap-2 flex-grow">
          <h3 className="text-base font-bold text-white tracking-wide group-hover:text-purple-400 transition-colors line-clamp-1">
            {prompt.title}
          </h3>
        
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
            <Layers className="w-3 h-3" /> {prompt.category || "General"}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60 capitalize">
            {prompt.difficulty || "Intermediate"}
          </span>
        </div>
        
         <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 mt-1 border-t border-white/[0.04] pt-3">
           <span className="uppercase text-[10px] bg-white/5 border border-white/5 px-2.5 py-1 rounded-full text-purple-300">
             {prompt.aiTool}
           </span>
           <div className="flex items-center gap-3">
             <span className="flex items-center gap-1 font-semibold text-amber-400">
               <Star className="w-3.5 h-3.5 fill-amber-400" />
               {prompt.averageRating ? prompt.averageRating.toFixed(1) : "0.0"}
             </span>
             <span className="flex items-center gap-1 text-slate-400">
               <Copy className="w-3.5 h-3.5 text-slate-500" />
               {prompt.copyCount ?? 0}
             </span>
             <span className="flex items-center gap-1 text-slate-400">
               <Bookmark className="w-3.5 h-3.5 text-slate-500" />
               {prompt.bookmarkCount ?? 0}
             </span>
           </div>
         </div>
        </div>

        {/* View Details Button */}
        <Link href={`/prompt/${prompt._id}`}>
        <button
          onClick={() => onViewDetails(prompt)}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 text-xs font-bold text-slate-200 hover:text-white border border-slate-700 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
        >
          <Eye className="w-4 h-4" /> View Details
        </button>
        </Link>
      </div>
    </motion.div>
  );
}