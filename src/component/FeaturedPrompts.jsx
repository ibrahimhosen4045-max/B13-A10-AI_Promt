"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FeaturedCard from './FeaturedCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Link from 'next/link';

export default function FeaturedPrompts({ isLoggedIn = false, onRedirectToLogin }) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [promptsData, setPromptsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
  const fetchFeaturedPrompts = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/prompts/featured`
      );

      const data = await res.json();

      if (data.success) {
        setPromptsData(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchFeaturedPrompts();
}, []);


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

        {/* Prompts Cards Grid */}
{loading ? (
  <div className="flex justify-center py-20">
    <span className="text-slate-400">Loading...</span>
  </div>
) : (
  <Swiper
    modules={[Autoplay, Navigation]}
    navigation
    autoplay={{
      delay: 3500,
      disableOnInteraction: false,
    }}
    loop={promptsData.length > 4}
    spaceBetween={24}
    breakpoints={{
      0: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 4,
      },
    }}
  >
    {promptsData.map((prompt) => (
      <SwiperSlide key={prompt._id}>
        <FeaturedCard prompt={prompt} />
      </SwiperSlide>
    ))}
  </Swiper>
)}

        {/* Load More Button matching screens */}
        <div className="text-center mt-16">
          <Link href={'/allPrompt'}>
          <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs tracking-widest hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all uppercase duration-300 hover:scale-105 active:scale-95">
            View More
          </button>
          </Link>
        </div>

      </div>
    </section>
  );
}