"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Flame, HelpCircle } from 'lucide-react';
import banner from '@/assest/55.png'
import banner1 from '@/assest/66.png'
import banner3 from '@/assest/44.png'
import banner4 from '@/assest/33.jpeg'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function Banner() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const {data: session} = authClient.useSession()
  const user = session?.user

  // ট্রেন্ডিং র্যান্ডম প্রম্পট ট্যাগস
  const trendingTags = ['Midjourney', 'ChatGPT-4', 'Claude 3.5', 'DALL-E 3', 'Stable Diffusion', 'Neo-Retro Art'];

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    router.push(
      `/search?q=${encodeURIComponent(searchQuery.trim())}`
    );
  };

  return (
    <section 
      className="relative  w-full h-220"
      style={{
        // input_file_2.png ব্যাকগ্রাউন্ড হিসেবে ব্যবহার করা হয়েছে
        backgroundImage: `url('${banner4.src}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom'
        
      }}
    >
      {/* ১. সিটি স্কাইলাইন ব্যাকগ্রাউন্ড গ্লো (input_file_3.png) */}
      <div className='w-11/12 mx-auto h-full flex flex-col items-center justify-center'>
        <div className='mt-7'>
        <Image src={banner3} alt='city' width={600} height={400}/>
      </div>

      {/* কন্টেন্ট কন্টেইনার */}
      <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center ">
        
        {/* সুপার-টাইটেল ট্যাগ */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-xs md:text-sm text-indigo-200 font-medium tracking-wide uppercase">
            The Ultimate AI Marketplace
          </span>
        </motion.div>

        {/* মূল হেডলাইন */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-[40px] font-bold tracking-tight text-white mb-3 leading-[1.15]"
        >
          The Best Place to Collect, Buy and <br className="hidden md:inline" />
          Sell <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">Awesome AI Prompts</span> for Business
        </motion.h1>

        {/* সাব-টাইটেল / ডেসক্রিপশন */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 text-sm md:text-lg max-w-2xl mb-5 leading-relaxed"
        >
          Create, discover, bookmark, and manage top-tier AI prompts designed for ChatGPT, Midjourney, Claude, Gemini, and more. Boost your productivity instantly.
        </motion.p>

        {/* সার্চ বার সেকশন */}
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSearch}
          className="w-full max-w-2xl bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl flex items-center gap-2 mb-4 hover:border-indigo-500/50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center pl-3 flex-grow gap-3">
            <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search prompts by title, tags, or AI tools (e.g., Cyberpunk, Midjourney)..." 
              className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm md:text-base focus:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-95 flex-shrink-0"
          >
            Find Prompts
          </button>
        </motion.form>

        {/* ট্রেন্ডিং ট্যাগস */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mb-6"
        >
          <span className="text-xs text-gray-500 flex items-center gap-1 font-semibold uppercase tracking-wider mr-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" /> Trending:
          </span>
          {trendingTags.map((tag, idx) => (
            <button 
              key={idx} 
              onClick={() =>
                router.push(`/search?q=${encodeURIComponent(tag)}`)
              }
              className="text-xs text-gray-400 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              #{tag}
            </button>
          ))}
        </motion.div>

        {/* কল-টু-অ্যাকশন বাটন */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href={'/allPrompt'}>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm hover:opacity-90 shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105">
            EXPLORE MORE
          </button>
          </Link>
          {
            user?.role === "User" && <Link href={'/dashboard/users/bookmark'}>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-transparent text-indigo-300 font-semibold text-sm border border-indigo-500/40 hover:border-indigo-400 hover:bg-indigo-500/10 transition-all duration-300 hover:scale-105">
            COLLECT PROMPTS
          </button>
          </Link>
          }
        </motion.div>
      </div>
      </div>

      {/* ========================================================= */}
      {/* ২. বাম পাশের ফ্লোটিং গেম কনসোল কার্ড (input_file_0.png) */}
      {/* ========================================================= */}
      <motion.div 
        className="absolute left-6 xl:left-20 -bottom-20 w-[130px] md:w-[220px] lg:w-[260px] hidden md:block pointer-events-none drop-shadow-[0_15px_50px_rgba(244,63,94,0.15)] z-1"
        initial={{ opacity: 0, x: -100, rotate: -15 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          rotate: -5,
          y: [0, -18, 0], // আলতো করে ভাসার এনিমেশন
        }}
        transition={{
          opacity: { duration: 1 },
          x: { duration: 1 },
          rotate: { duration: 1 },
          y: {
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut"
          }
        }}
      >
        <Image 
          src={banner} 
          alt="Futuristic Game Console Card" 
          className="w-full h-auto object-contain rounded-[2rem]"
        />
      </motion.div>

      {/* ========================================================= */}
      {/* ৩. ডান পাশের ফ্লোটিং রোবটিক ফেস অরবিটাল (input_file_1.png) */}
      {/* ========================================================= */}
      <motion.div 
        className="absolute right-6 xl:right-20 top-90 w-[110px] md:w-[180px] lg:w-[220px] hidden md:block pointer-events-none drop-shadow-[0_15px_50px_rgba(6,182,212,0.15)]"
        initial={{ opacity: 0, x: 100, rotate: 15 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          rotate: 10,
          y: [0, 15, 0], // বিপরীত দিকে ভাসার এনিমেশন
        }}
        transition={{
          opacity: { duration: 1 },
          x: { duration: 1 },
          rotate: { duration: 1 },
          y: {
            repeat: Infinity,
            duration: 5.5,
            ease: "easeInOut"
          }
        }}
      >
        <Image 
          src={banner1} 
          alt="Orbital Robot Face" 
          className="w-full h-auto object-contain rounded-full"
        />
      </motion.div>
    </section>
  );
}