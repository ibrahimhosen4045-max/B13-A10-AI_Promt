"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Sparkles } from 'lucide-react';

export default function Loader({ message = "Booting Promptly Engine" }) {
  const [percent, setPercent] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Initializing core sandboxes...");

  // সাইবারপাঙ্ক স্টাইলের ডাইনামিক স্ট্যাটাস মেসেজ সিকোয়েন্স
  const statusLogs = [
    "Establishing secure JWT handshake...",
    "Decrypting prompt credentials...",
    "Syncing Stripe billing gateways...",
    "Compiling neural prompt vectors...",
    "Optimizing responsive viewports...",
    "Systems online. Deploying orbit..."
  ];

  useEffect(() => {
    // ০ থেকে ১০০% পর্যন্ত কাউন্টডাউন সিমুলেটর
    const progressInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // র্যান্ডম স্পিডে লোড হবে যাতে রিয়ালিস্টিক লাগে
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    // স্ট্যাটাস টেক্সটগুলো সময়ানুযায়ী পরিবর্তন করার জন্য
    const statusInterval = setInterval(() => {
      const randomStatus = statusLogs[Math.floor(Math.random() * statusLogs.length)];
      setCurrentStatus(randomStatus);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, []);

  // অরবিটের ঘূর্ণন অ্যানিমেশন
  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }
    },
    reverse: {
      rotate: -360,
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#040814] flex flex-col items-center justify-center overflow-hidden px-4 select-none">
      
      {/* Background Soft Ambient Glowing Nebula */}
      {}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Futuristic Grid Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Main Core Loader Group */}
      {}
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        
        {/* Outer Pulsing Glow Halo */}
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/10 via-pink-500/5 to-cyan-500/10 blur-xl"
        />

        {/* Orbit Ring 1 (Cyan Neon Ring with dashed borders) */}
        <motion.div
          variants={orbitVariants}
          animate="animate"
          className="absolute w-44 h-44 rounded-full border-2 border-dashed border-cyan-500/30 border-t-cyan-400"
        />

        {/* Orbit Ring 2 (Purple Neon Ring) */}
        <motion.div
          variants={orbitVariants}
          animate="reverse"
          className="absolute w-36 h-36 rounded-full border border-purple-500/40 border-b-purple-400"
        />

        {/* Core CPU Node */}
        <motion.div 
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-24 h-24 bg-[#080d1e] border-2 border-white/10 rounded-3xl flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(168,85,247,0.15)] group"
        >
          {/* Tech Corner Highlights */}
          <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-purple-400" />
          
          <Cpu className="w-8 h-8 text-cyan-400 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] animate-pulse" />
          <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest mt-1.5">{percent}%</span>
        </motion.div>

        {/* Tiny Orbiting Micro-Satelite Spheres */}
        <motion.div
          variants={orbitVariants}
          animate="animate"
          className="absolute w-full h-full"
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]" />
        </motion.div>
      </div>

      {/* Info & Micro Terminal Console Outputs */}
      {}
      <div className="max-w-xs w-full text-center flex flex-col items-center">
        
        {/* App Branding */}
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.25em] text-gray-400 uppercase">{message}</span>
        </div>

        {/* Digital Custom Loading Bar */}
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mb-4 border border-white/[0.03]">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
            style={{ width: `${percent}%` }}
            layout
          />
        </div>

        {/* Micro-Terminal Logs Simulation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStatus}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 bg-[#080d1e]/80 border border-white/[0.05] px-3.5 py-1.5 rounded-xl min-h-[36px] max-w-full shadow-lg"
          >
            <Terminal className="w-3 h-3 text-cyan-400 flex-shrink-0" />
            <code className="text-[10px] text-gray-400 font-mono text-left truncate leading-none">
              {currentStatus}
            </code>
          </motion.div>
        </AnimatePresence>

      </div>
      
    </div>
  );
}