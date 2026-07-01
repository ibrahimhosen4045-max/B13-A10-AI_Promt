"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle, Sparkles } from 'lucide-react';

export default function Testimonials() {
  // প্রফেশনাল এবং রিয়ালিস্টিক রিভিউ ডাটা (৩ জন ইউজারের রিভিউ)
  const reviews = [
    {
      id: 1,
      name: "Marcus Brody",
      role: "AI Prompt Engineer",
      rating: 5,
      comment: "Absolutely marvelous prompts! The engineering quality is outstanding. I've tested the Midjourney templates, and they saved me countless hours of manual trial-and-error.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      isVerified: true,
      tag: "Midjourney"
    },
    {
      id: 2,
      name: "Elena Rostova",
      role: "SEO & Content Director",
      rating: 5,
      comment: "These ChatGPT structures are extremely detailed. The copywriting prompt outputs are clean, high-performing, and follow proper semantic guidelines. Outstanding platform!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      isVerified: true,
      tag: "ChatGPT"
    },
    {
      id: 3,
      name: "Devon Lane",
      role: "Full Stack Developer",
      rating: 5,
      comment: "Tailwind UI Neumorphism prompt is a masterpiece. Directly integrated it into my component library. Definitely worth upgrading to the Premium subscription tier!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      isVerified: false,
      tag: "Tailwind UI"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 18 }
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#040814] overflow-hidden border-t border-white/[0.04]">
      
      {/* Background Soft Ambient Lights */}
      <div className="absolute top-1/3 left-10 w-[280px] h-[280px] bg-purple-600/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[280px] h-[280px] bg-cyan-600/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-xs font-extrabold tracking-widest text-purple-400 uppercase flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">
            What Our Creators Say
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            Read positive feedback from professional developers, prompt engineers, and visual designers using our platform.
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Testimonials 3-Column Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-[#080d1e]/50 border border-white/[0.06] hover:border-purple-500/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-md shadow-xl overflow-hidden"
            >
              {/* Top Tech Border Decor */}
              <span className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-lg" />
              <span className="absolute bottom-0 left-0 w-3 h-3 bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-lg" />

              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 text-amber-400 fill-amber-400/90 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" 
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-purple-500/20 group-hover:text-purple-400/40 transition-colors" />
                </div>

                {/* Review Message */}
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              {/* User Bio Card Info */}
              <div className="flex items-center gap-4 border-t border-white/[0.04] pt-5 mt-4">
                <div className="relative">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full object-cover border border-white/15 group-hover:border-purple-500/30 transition-all"
                  />
                  {review.isVerified && (
                    <span className="absolute -bottom-1 -right-1 bg-purple-600 border border-[#040814] text-white p-0.5 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-3 h-3 text-cyan-300 fill-cyan-400/15" />
                    </span>
                  )}
                </div>

                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-bold text-white tracking-wide truncate">
                    {review.name}
                  </h4>
                  <span className="text-xs text-gray-400 block truncate">
                    {review.role}
                  </span>
                </div>

                {/* Tag Indicator */}
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 self-center">
                  {review.tag}
                </span>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}