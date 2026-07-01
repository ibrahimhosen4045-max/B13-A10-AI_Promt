"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowLeft, Terminal, AlertTriangle, Sparkles } from 'lucide-react';

export default function NotFound() {
  
  // ব্যাকগ্রাউন্ডের ফ্লোটিং লাইট অ্যানিমেশন ভ্যারিয়েন্ট
  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.15, 0.3, 0.15],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // অরবিট বলের ভাসমান অ্যানিমেশন
  const floatVariants = {
    animate: {
      y: [0, -25, 0],
      rotate: [0, 10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#040814] text-gray-300 font-sans flex items-center justify-center relative overflow-hidden px-4">
      
      {/* Background Soft Ambient Glow Lights */}
      <motion.div 
        variants={glowVariants}
        animate="animate"
        className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-purple-600 rounded-full blur-[130px] pointer-events-none" 
      />
      <motion.div 
        variants={glowVariants}
        animate="animate"
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-600 rounded-full blur-[130px] pointer-events-none" 
      />

      {/* Decorative Star Dusts & Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-xl w-full text-center relative z-10 flex flex-col items-center">
        
        {/* Floating Robot/CyberSphere mimicking circle1.png */}
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="relative w-36 h-36 mb-8 cursor-pointer group"
        >
          {/* Outer Rotating Glowing Ring */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-spin" style={{ animationDuration: '10s' }} />
          
          {/* Inner Cyber-Core */}
          <div className="absolute inset-1.5 bg-[#080d1e] border border-white/10 rounded-full flex items-center justify-center shadow-inner">
            <Terminal className="w-12 h-12 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
          
          {/* Micro Mini Glows */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
          </span>
        </motion.div>

        {/* Dynamic 404 Glitch Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative"
        >
          <h1 className="text-8xl sm:text-9xl font-black tracking-widest text-white leading-none selection:bg-purple-500 select-none filter drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
            404
          </h1>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600/10 border border-purple-500/20 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-purple-300 flex items-center gap-1.5 whitespace-nowrap shadow-md">
            <AlertTriangle className="w-3.5 h-3.5 text-pink-500" />
            Execution Error
          </span>
        </motion.div>

        {/* Info & Description */}
        <div className="mt-8 mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-3">
            Prompt Lost in Deep Space!
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
            The AI coordinates you requested returned a <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-purple-300 font-mono text-xs">Null</code> output. It seems this page does not exist or has been modified.
          </p>
        </div>

        {/* Action Button Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Back Home CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(147,51,234,0.45)] hover:shadow-[0_0_35px_rgba(147,51,234,0.65)] flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Orbit
          </motion.button>

          {/* Explore Prompts Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '#all-prompts'}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent text-purple-300 border border-purple-500/30 hover:border-purple-400 font-extrabold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            Explore Prompts
          </motion.button>
        </div>

      </div>
    </div>
  );
}