"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, UserCheck, Shield, ArrowRight, Sparkles, AlertCircle } from 'lucide-react'
import SecondBanner from '@/component/SecondBanner'
import { authClient } from '@/lib/auth-client'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { handleImageUpload, uploadImage } from '@/lib/UploadImage'

export default function Register() {
  const pageName = "REGISTER"
  const router = useRouter()
  
  const [imageFile, setImageFile]  = useState(null)

  const searchParem = useSearchParams()
  
    const callbackUrl = searchParem.get("callbackUrl") || "/";
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: '',
    role: '' // Default role (User / Creator) as per assignment workflow
  })

  // UI States
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('') // Clear error when typing
  }

  // Handle Submit (Simulating auth without browser alerts)
  const handleSubmit =async (e) => {
    e.preventDefault()
    
    // Basic validations
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !imageFile) {
      setError('Please fill in all the core fields.')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

   
    try {
    setIsLoading(true)
    setError('')

     const imageUrl = await uploadImage(imageFile)

    const { data, error } = await authClient.signUp.email({
        name: formData.name, // user display name
        email: formData.email, // user email address
        image: imageUrl, // User image URL (optional)
        password:formData.password,
        role: formData.role || "User" ,
        callbackURL: "/", 
    })

    if(data){
      toast.success("Register successfull")
      router.push('/')
    }

    if(error){
      toast.error(error.message)
      return;
    }

  } catch (err){
    console.log(err)
    toast.error(err.message);
  } finally {
    setTimeout(() => {
        setIsLoading(false)
    }, 1500)
  }
    
  }

  const handleGoogle = async () => {
      setIsLoading(true)
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl
      });
      if(data){
        setIsLoading(false)
      }
    }

  return (
    <div className="min-h-screen bg-[#040814] text-gray-300 font-sans overflow-hidden">
      {/* Dynamic Header Banner */}
      <SecondBanner heading={pageName} />

      {}
      <div className="relative w-full py-16 px-4 flex flex-col items-center justify-center">
        {/* Soft Radial Ambient Lights */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[110px] pointer-events-none" />

        <AnimatePresence mode="wait">
            <motion.div
              key="register-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="w-full max-w-lg bg-[#080d1e]/70 border border-white/[0.08] p-6 sm:p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Top Tech Border Highlighter */}
              <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />

              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-300 rounded-full uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" /> Create Free Account
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Join Our Space</h2>
                <p className="text-xs text-gray-400 mt-1.5">Sign up to explore, buy, and engineer top-tier AI prompts.</p>
              </div>

              {}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Username */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1.5 ml-1">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., alex_matrix"
                      className="w-full bg-[#040814]/80 border border-white/10 p-3.5 pl-11 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1.5 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g., alex.rivera@ai.com"
                      className="w-full bg-[#040814]/80 border border-white/10 p-3.5 pl-11 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Photo URL */}

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1.5 ml-1">Upload Your Photo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      id='image'
                      type="file" 
                      accept='image/*'
                      onChange={(e) => handleImageUpload(e, setImageFile)}
                      className="w-full bg-[#040814]/80 border border-white/10 p-3.5 pl-11 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Password Fields Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1.5 ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-[#040814]/80 border border-white/10 p-3.5 pl-11 pr-11 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1.5 ml-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-[#040814]/80 border border-white/10 p-3.5 pl-11 pr-11 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-2.5 ml-1">Select Your Path</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'User' }))}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-300 relative ${
                        formData.role === 'User' 
                          ? 'bg-purple-600/10 border-purple-500/40 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                          : 'bg-[#040814]/80 border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300'
                      }`}
                    >
                      <UserCheck className="w-4 h-4 mb-1 text-purple-400" />
                      <div className="text-xs font-bold">Standard User</div>
                      <span className="text-[9px] text-gray-500 block mt-0.5">Explore & Buy Prompts</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'Creator' }))}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-300 relative ${
                        formData.role === 'Creator' 
                          ? 'bg-cyan-600/10 border-cyan-500/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                          : 'bg-[#040814]/80 border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300'
                      }`}
                    >
                      <Shield className="w-4 h-4 mb-1 text-cyan-400" />
                      <div className="text-xs font-bold">Prompt Creator</div>
                      <span className="text-[9px] text-gray-500 block mt-0.5">Design & Earn Revenue</span>
                    </button>
                  </div>
                </div>

                {/* Custom Validation Error messages inside box (Never alert) */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3 flex items-center gap-2 text-xs text-red-400"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black uppercase tracking-widest hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.45)] mt-3 flex items-center justify-center gap-2 active:scale-98"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Decrypting Safe Vault...
                    </span>
                  ) : (
                    <>
                      Secure Register
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Social OAuth & login switch */}
              <div className="mt-8 border-t border-white/[0.05] pt-6 text-center">
              <div className="mb-4">
                <button
                onClick={handleGoogle}
                  type="button"
                  className="group w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-[#0b1124]/90 border border-white/10 hover:border-purple-500/30 hover:bg-[#10182d] transition-all duration-300 text-white shadow-lg"
                >
                  {/* Google Icon */}
                  {isLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></> :
                  <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-5 h-5"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.3 14.7l6.6 4.8C14.7 15.2 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.4C9.7 36.1 16.2 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.4 5.6-6.5 7.1l6.2 5.2C38.6 37.1 44 31.2 44 24c0-1.3-.1-2.3-.4-3.5z"
                    />
                  </svg>

                  <span className="text-sm font-semibold tracking-wide">
                    Continue with Google
                  </span>
                  </>
                  }
                </button>
              </div>
                <span className="text-xs text-gray-500">Already registered on orbit?</span>
                <a href="#login" className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors ml-1.5">
                  Sign In
                </a>
              </div>
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}