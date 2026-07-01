"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function TopSellers() {
  // ৯ জন টপ সেলারের রিয়েলস্টিক ডাটা (ইমেজের লেআউট ম্যাচ করে)
  const sellers = [
    { id: 1, rank: "01", name: "Johan Donem", sales: "647.34 USD", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80", isVerified: true },
    { id: 2, rank: "02", name: "Amilia Smith", sales: "582.11 USD", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", isVerified: true },
    { id: 3, rank: "03", name: "Smith Lary", sales: "512.90 USD", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80", isVerified: false },
    { id: 4, rank: "04", name: "Johan Donem", sales: "499.00 USD", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", isVerified: true },
    { id: 5, rank: "05", name: "Amilia Smith", sales: "435.40 USD", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", isVerified: true },
    { id: 6, rank: "06", name: "Smith Lary", sales: "390.15 USD", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80", isVerified: false },
    { id: 7, rank: "07", name: "Johan Donem", sales: "354.80 USD", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80", isVerified: true },
    { id: 8, rank: "08", name: "Amilia Smith", sales: "310.25 USD", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80", isVerified: true },
    { id: 9, rank: "09", name: "Smith Lary", sales: "288.50 USD", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80", isVerified: false },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="relative pt-30 pb-20 px-4 sm:px-6 lg:px-8 bg-[#040814] overflow-hidden">
      {/* Background Soft Neon Light Elements */}
      <div className="absolute top-1/4 right-10 w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      {}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading with exactly matching structure */}
        <div className="mb-12 text-center lg:text-left flex flex-col items-center lg:items-start">
          <span className="text-xs font-extrabold tracking-widest text-purple-400 uppercase flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            Creative Creators
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-none">
            Top Sellers This Month
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Sellers 3x3 Responsive Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {sellers.map((seller) => (
            <motion.div
              key={seller.id}
              variants={itemVariants}
              whileHover={{ scale: 1.025, y: -4 }}
              className="relative group bg-[#080d1e]/40 border border-white/[0.06] hover:border-purple-500/30 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 backdrop-blur-md shadow-lg overflow-hidden"
            >
              {/* Decorative Tech Corners on Hover */}
              <span className="absolute top-0 right-0 w-2 h-2 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-md" />
              <span className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-md" />

              {/* Rank and Serial Indicator */}
              <div className="flex flex-col items-center justify-center border-r border-white/10 pr-4">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">SELLER</span>
                <span className="text-lg font-black text-purple-400 bg-gradient-to-br from-purple-400 to-pink-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {seller.rank}
                </span>
              </div>

              {/* Avatar Frame with custom glow boundary */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-30 group-hover:opacity-85 transition-opacity duration-300 blur-sm" />
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/20 bg-slate-900 flex-shrink-0">
                  <img 
                    src={seller.avatar} 
                    alt={seller.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {seller.isVerified && (
                  <span className="absolute bottom-0 right-0 bg-emerald-500 border-2 border-[#040814] text-white p-0.5 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>

              {/* Name & Dynamic Revenue Content details */}
              <div className="flex-grow flex flex-col justify-center">
                <h3 className="text-sm font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors flex items-center gap-1">
                  {seller.name}
                </h3>
                <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  Volume: 
                  <strong className="text-cyan-400 font-extrabold tracking-wider bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-400/10">
                    {seller.sales}
                  </strong>
                </span>
              </div>

              {/* Interactive Micro Link Icon */}
              <div className="w-8 h-8 rounded-xl bg-white/5 group-hover:bg-purple-600/10 border border-white/10 group-hover:border-purple-500/20 flex items-center justify-center transition-all duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}