"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import SecondBanner from '@/component/SecondBanner'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'


export default function Login() {
  const pageName = "LOGIN"
  const router = useRouter()
  const searchParem = useSearchParams()

  const callbackUrl = searchParem.get("callbackUrl") || "/";
  
  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  // UI States
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
    if (error) setError('') // Clear error message when typing
  }

  const handleSubmit =async (e) => {
    e.preventDefault()
    
    // Basic validatons
    if (!formData.email || !formData.password) {
      setError('Please fill in all the core fields.')
      return
    }

    setIsLoading(true)
    setError('')

    const { data, error } = await authClient.signIn.email({
      email: formData.email, // user email address
      password:formData.password,
      
    })

    if(data){
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
      router.push(callbackUrl)
    }

    if(error){
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
      toast.error(error.message)
      return;
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

      {/* Main Login Workspace */}
      <div className="relative w-full py-16 px-4 flex flex-col items-center justify-center">
        {/* Soft Radial Ambient Lights to match the UI scheme */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[110px] pointer-events-none" />

        <AnimatePresence mode="wait">
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="w-full max-w-md bg-[#080d1e]/70 border border-white/[0.08] p-6 sm:p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Top Tech Border Highlighter */}
              <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />

              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-300 rounded-full uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" /> Security Gateway
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Welcome Back</h2>
                <p className="text-xs text-gray-400 mt-1.5">Enter your credentials to access your prompt vault.</p>
              </div>

              {/* Form Elements */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
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

                {/* Password Input */}
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

                {/* Keep Signed In & Forgot Password */}
                <div className="flex items-center justify-between text-[11px] px-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="rounded border-white/10 bg-[#040814] text-purple-600 focus:ring-purple-500/30"
                    />
                    <span className="text-gray-400 hover:text-gray-300">Remember session</span>
                  </label>
                  <a href="#forgot" className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
                    Forgot Password?
                  </a>
                </div>

                {/* Custom Validation Error messages inside box */}
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
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black uppercase tracking-widest hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.45)] mt-2 flex items-center justify-center gap-2 active:scale-98"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating Identity...
                    </span>
                  ) : (
                    <>
                      Access Account
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Social Login Divider & Google SSO */}
              <div className="mt-6 border-t border-white/[0.05] pt-6 text-center">
              {/* Google Login Button */}
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
                <div>
                  <span className="text-xs text-gray-500">New around orbit?</span>
                  <Link href={'/register'}>
                  <button className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors ml-1.5">
                  Create Free Account
                  </button>
                  </Link>
                </div>
              </div>
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}