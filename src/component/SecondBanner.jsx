"use client"
import React from 'react'
import { motion } from 'framer-motion'
import bgImage from '@/assest/bg.jpg'
import './style.css'

const SecondBanner = ({heading}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div 
      className='w-full h-70 md:h-84 lg:h-100 xl:h-110 bg-cover bg-top relative overflow-hidden' 
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      {/* Dark tint overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className='w-full h-full flex items-center justify-center text-white relative z-10'>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='text-center space-y-4 relative top-14'
        >
          {/* Glowing Animated Headline */}
          <motion.h1 
            variants={itemVariants} 
            className='text-3xl md:text-4xl font-black tracking-wider uppercase filter drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]'
          >
            {heading}
          </motion.h1>
          
          {/* Breadcrumb Navigation */}
          <motion.h2 
            variants={itemVariants} 
            className=" text-gray-200 font-medium"
          >
            <span className='cursor-pointer hover:text-purple-400 transition-colors duration-300'>HOME</span> / {heading}
          </motion.h2>
        </motion.div>
      </div>
    </div>
  )
}

export default SecondBanner