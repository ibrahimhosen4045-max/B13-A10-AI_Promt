"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {  Cpu,  Sparkles,  Layers,  Flame,  Compass,  Terminal, Zap} from 'lucide-react';

import banner from '@/assest/55.png'; 
import './style.css'
import ai1 from '@/assest/gen1.png'
import ai2 from '@/assest/gen2.png'
import ai3 from '@/assest/gen3.png'
import ai4 from '@/assest/gen4.png'
import ai5 from '@/assest/gen5.png'
import ai6 from '@/assest/gen6.png'

export default function AboutMarketplace() {
  
  // এআই টুল সমূহের ক্লাস্টার বাটন ডাটা
  const aiTools = [
    { name: 'GPT Prompts', isLight: true, color: 'text-emerald-500', image: {ai1} },
    { name: 'Leonardo Ai', isLight: false, color: 'text-amber-400', icon: <Zap className="w-4 h-4" /> },
    { name: 'Bard Prompts', isLight: true, color: 'text-blue-500', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Midjourney', isLight: false, color: 'text-cyan-400', icon: <Compass className="w-4 h-4" /> },
    { name: 'Stable Diffusion', isLight: false, color: 'text-purple-400', icon: <Layers className="w-4 h-4" /> },
    { name: 'DALL-E Prompts', isLight: true, color: 'text-orange-500', icon: <Flame className="w-4 h-4" /> },
  ];

  const floatAnimation = {
    animate: {
      y: [0, -12, 0],
      rotate: [-1, 2, -1],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 12 }
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#040814] overflow-hidden">
      
      {}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[200px] h-[200px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-15 gap-3 lg:gap-8 items-center">
          
          {}
          <motion.div 
            className="lg:col-span-4 flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              variants={floatAnimation}
              animate="animate"
              className="relative w-[220px] md:w-[260px] aspect-[3/4] drop-shadow-[0_20px_50px_rgba(168,85,247,0.25)]"
            >
              <Image 
                src={banner} 
                alt="About Game Console Card" 
                width={700}
                height={700}
                priority
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          {}
          <motion.div 
            className="lg:col-span-5 flex flex-col gap-3 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div>
              <span className="text-xs md:text-sm font-bold tracking-widest text-pink-500 uppercase block mb-2">
                About Our Marketplace
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                The Top AI Prompts <br />
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Marketplace.</span>
              </h2>
            </div>

            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Discover and leverage high-quality engineered prompts designed to elevate your creative workflows. Explore a secure ecosystem crafted with premium AI creators.
            </p>

            {/* Statistics Row mimicking screenshot counters */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0 mt-2">
              <div className="p-4  flex flex-col justify-center items-center lg:items-start">
                <span className="text-3xl md:text-4xl font-black  gradient-text">
                  663
                </span>
                <span className="text-sm font-bold text-white uppercase tracking-widest mt-1">AI Prompts</span>
              </div>
              
              <div className="p-4  flex flex-col justify-center items-center lg:items-start">
                <span className="text-3xl md:text-4xl font-black  gradient-text">
                  50
                </span>
                <span className="text-sm font-bold text-white uppercase tracking-widest mt-1">AI Collections</span>
              </div>
            </div>
          </motion.div>

          {}
          <motion.div 
            className="lg:col-span-6 flex flex-col justify-center w-auto md:w-2xl md:mx-auto lg:w-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  mx-auto w-full">
              <div className='col-span-2 w-1/2 mx-auto'>
                <div className='flex gap-1  items-center p-2 rounded-2xl bg-white'>
                <Image src={ai1} alt='loading...' width={40} height={40}/>
                <h1 className='text-lg font-medium'>GPT Prompts</h1>
              </div>
              </div>
              <div className='flex gap-1 items-center p-2 rounded-2xl bg-white'>
                <Image src={ai2} alt='loading...' width={40} height={40}/>
                <h1 className='text-lg font-medium'>Leonardo Ai</h1>
              </div>
              <div className='flex gap-1 items-center p-2 rounded-2xl bg-white'>
                <Image src={ai3} alt='loading...' width={40} height={40}/>
                <h1 className='text-lg font-medium'>Bard Prompts</h1>
              </div>
              <div className='col-span-2 w-1/2 mx-auto'>
              <div className='flex gap-1 items-center p-2 rounded-2xl bg-white '>
                <Image src={ai4} alt='loading...' width={40} height={40}/>
                <h1 className='text-lg font-medium'>Midjourney</h1>
              </div>
              </div>
              <div className='flex gap-1 items-center p-2 rounded-2xl bg-white'>
                <Image src={ai5} alt='loading...' width={40} height={40}/>
                <h1 className='text-lg font-medium'>Stable Diffusion</h1>
              </div>
              <div className='flex gap-1 items-center p-2 rounded-2xl bg-white'>
                <Image src={ai6} alt='loading...' width={40} height={40}/>
                <h1 className='text-lg font-medium'>DALL·E Prompts</h1>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}