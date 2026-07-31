"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Copy, ShieldAlert, Sparkles, Star, Bookmark, Layers, Zap } from 'lucide-react';

export default function FeaturedPrompts({ isLoggedIn = false, onRedirectToLogin }) {
  const [activeTab, setActiveTab] = useState('ALL');

  // ক্যাটাগরি ট্যাবসমূহ (হুবহু স্ক্রিনশটের মতো)
  const tabs = ['ALL', 'MIDJOURNEY', 'DALL-E', 'GPT', 'LEONARDO AI', 'BARD', 'STABLE DIFFUSION'];

  // ডেমো ডেটা যা মঙ্গোডিবি থেকে আসা ৬টি প্রম্পটের মতো কাজ করবে
  const promptsData = [
    {
      id: 1,
      title: "Scarecrow in daylight",
      price: "$ 10.00",
      aiTool: "Midjourney",
      likes: "134 Like",
      creator: "@Smith Wright",
      creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      isPremium: false
    },
    {
      id: 2,
      title: "Darklight Angel 01",
      price: "$ 15.00",
      aiTool: "DALL-E",
      likes: "134 Like",
      creator: "@Smith Wright",
      creatorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80",
      image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80",
      isPremium: true // Private (Premium) Prompt Example
    },
    {
      id: 3,
      title: "Becoming one with Nature",
      price: "$ 19.00",
      aiTool: "Leonardo AI",
      likes: "134 Like",
      creator: "@Smith Wright",
      creatorAvatar: "https://images.unsplash.com/photo-1527983359383-4758693f760c?auto=format&fit=crop&w=80&q=80",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=80",
      isPremium: false
    },
    {
      id: 4,
      title: "Twilight Fracture City",
      price: "$ 39.00",
      aiTool: "GPT prompts",
      likes: "134 Like",
      creator: "@Smith Wright",
      creatorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
      isPremium: false
    },
    {
      id: 5,
      title: "Resonate Sanctuary II",
      price: "$ 25.00",
      aiTool: "Stable Diffusion",
      likes: "134 Like",
      creator: "@Smith Wright",
      creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80",
      isPremium: true
    },
    {
      id: 6,
      title: "Super-Neumorphism #7",
      price: "$ 50.00",
      aiTool: "GPT prompts",
      likes: "134 Like",
      creator: "@Smith Wright",
      creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80",
      isPremium: false
    }
  ];

  const handleViewDetails = (prompt) => {
    if (!isLoggedIn) {
      // যদি লগইন না থাকে, তাহলে লগইন পেজে রিডাইরেক্ট করবে
      alert("Please login first to view prompt details!"); 
      if (onRedirectToLogin) onRedirectToLogin();
    } else {
      // লগইন থাকলে ডিটেইলস পেজে নিয়ে যাবে
      window.location.hash = `#prompt/${prompt.id}`;
    }
  };

  // ট্যাব অনুযায়ী ফিল্টার করা
  const filteredPrompts = activeTab === 'ALL' 
    ? promptsData 
    : promptsData.filter(p => p.aiTool.toUpperCase() === activeTab);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#040814] overflow-hidden border-t border-white/[0.04]">
      
      {/* Background radial soft lights */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading matching screencapture */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-purple-400 uppercase block mb-2">
            Discover New Items
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">
            Recent Listed Prompts
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            Explore premium and free engineered prompts compiled by world-class creators to automate your tasks and spark creativity.
          </p>
        </div>

        {/* Tab Filter Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]' 
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Prompts Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredPrompts.map((prompt) => (
              <motion.div
                key={prompt.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-[#080d1e]/50 border border-white/[0.06] p-4.5 overflow-hidden flex flex-col gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/30 transition-all duration-300"
              >
                
                {/* Product Thumbnail with Gradient Overlay */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-900">
                  <img 
                    src={prompt.image} 
                    alt={prompt.title} 
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                  />
                  
                  {/* Creator Info overlay badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                    <img 
                      src={prompt.creatorAvatar} 
                      alt="Avatar" 
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-[10px] font-bold text-gray-200">{prompt.creator}</span>
                  </div>

                  {/* Private / Premium Badge indicator */}
                  {prompt.isPremium && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-lg tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Premium
                    </div>
                  )}
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

                {/* Action CTA Button */}
                <button
                  onClick={() => handleViewDetails(prompt)}
                  className="w-full py-3 rounded-2xl bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-gray-300 hover:text-white text-xs font-bold transition-all duration-300 border border-white/5 hover:border-none uppercase tracking-wider"
                >
                  View Details
                </button>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button matching screens */}
        <div className="text-center mt-16">
          <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs tracking-widest hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all uppercase duration-300 hover:scale-105 active:scale-95">
            Load More
          </button>
        </div>

      </div>
    </section>
  );
}