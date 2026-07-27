"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  LayoutDashboard, 
  LogOut, 
  User, 
  Compass, 
  Bookmark, 
  ShieldAlert,
  Flame
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import SignOutModal from './DashBoard/SingOutModal';
import toast from 'react-hot-toast';

export default function Navber() {
  const pathname = usePathname();
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const userMockData = {
    name: user?.name,
    email: user?.email,
    avatar: user?.image,
    role: user?.role,
    subscription: user?.isPremium ? "Premium" : "Free"
  };

  console.log(userMockData.subscription)

  const navLinks = [
    { name: 'Home', href: '/', isHot: false },
    { name: 'All Prompts', href: '/allPrompt', isHot: false },
    
  ]; 

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  const handleSignOut =async ()=> {
    await authClient.signOut()
    router.push('/')
    toast.success("SignOut successfully!")
  }

  return (
    <div className="relative">

      {}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#040814]/75 backdrop-blur-md border-b border-white/[0.06] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 ">
            
            {/* Logo and Website Name */}
            <div className="flex-shrink-0 flex items-center gap-2.5">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative w-10 h-10 bg-slate-950 rounded-lg flex items-center justify-center border border-white/10">
                  {/* Glowing Hexagonal Abstract SVG Logo matching the uploaded screenshot */}
                  <svg className="w-6 h-6 text-purple-400 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent uppercase font-sans">
                PROMPTLY
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.href} 
                  className="relative text-sm text-gray-300 hover:text-white font-semibold transition-colors py-2 group flex items-center gap-1"
                >
                  {link.name}
                  {link.isHot && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Desktop Authentication & Profile Actions */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-purple-500/30 text-left"
                  >
                    <div className="relative">
                      <img 
                        src={userMockData.avatar} 
                        alt="Profile" 
                        className="w-9 h-9 rounded-full object-cover border border-purple-500/30"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#040814] rounded-full" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-none">{userMockData.name}</div>
                      <span className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded mt-1 inline-block ${
                        userMockData.role === 'Admin' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        userMockData.role === 'Creator' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                        'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {userMockData.role}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-64 bg-[#0a0f1d]/95 backdrop-blur-2xl border border-white/10 p-2.5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
                      >
                        <div className="p-3 border-b border-white/5 flex flex-col">
                          <span className="text-xs text-gray-400">Signed in as</span>
                          <span className="text-sm font-bold text-white truncate">{userMockData.email}</span>
                          {userMockData.subscription === 'Premium' ? (
                            <span className="text-[10px] font-extrabold text-amber-400 mt-1 flex items-center gap-1 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 w-fit px-2 py-0.5 rounded-full">
                              ⭐ Premium Partner
                            </span>
                          ) : <span className='text-[10px] font-extrabold text-green-500 mt-1 flex items-center gap-1 uppercase tracking-widest bg-green-500/10 border border-green-500/20 w-fit px-2 py-0.5 rounded-full'> Free user</span>}
                        </div>

                        <div className="py-2">
                          <a href="#profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                            <User className="w-4 h-4 text-purple-400" /> My Profile
                          </a>
                          <Link href={"/dashboard"} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                            <LayoutDashboard className="w-4 h-4 text-indigo-400" /> {userMockData.role} Dashboard
                          </Link>
                          <a href="#saved" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                            <Bookmark className="w-4 h-4 text-cyan-400" /> Bookmarked Prompts
                          </a>
                        </div>

                        <div className="pt-2 border-t border-white/5">
                          <button onClick={handleSignOut} className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20 mt-auto">
                            <LogOut className="w-5 h-5" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href={'/login'}>
                  <button className="text-sm font-bold text-purple-300 hover:text-white px-5 py-2.5 transition-colors">
                    Login
                  </button>
                  </Link>

                  <Link href={'/register'}>
                  <button 
                   
                    className="relative group overflow-hidden px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(147,51,234,0.45)] transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10">Register Now</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 border border-white/5 focus:outline-none transition-colors"
              >
                {isOpen ? <X className="w-6 h-6 text-purple-400" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="absolute top-20 left-0 w-full bg-[#050916]/98 border-b border-white/10 backdrop-blur-3xl z-30 px-4 pt-4 pb-8 flex flex-col gap-4 shadow-2xl"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx} 
                    href={link.href} 
                    variants={linkVariants}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {link.name}
                      {link.isHot && <span className="bg-pink-500/20 text-pink-400 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-pink-500/30">Hot</span>}
                    </span>
                    <ChevronDown className="w-4 h-4 -rotate-90 text-gray-600" />
                  </Link>
                ))}
              </div>

              {user && (
                <motion.div variants={linkVariants} className="border-t border-white/5 pt-4 px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={userMockData.avatar} alt="Profile" className="w-11 h-11 rounded-full object-cover border border-purple-500/30" />
                    <div>
                      <div className="font-bold text-white text-base leading-none">{userMockData.name}</div>
                      <div className="text-xs text-gray-400 mt-1">{userMockData.email}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <a href="#dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 text-gray-300 hover:text-white">
                      <LayoutDashboard className="w-4 h-4 text-purple-400" /> Dashboard
                    </a>
                    <a href="#profile" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 text-gray-300 hover:text-white">
                      <User className="w-4 h-4 text-cyan-400" /> Profile
                    </a>
                  </div>
                </motion.div>
              )}

              <motion.div variants={linkVariants} className="border-t border-white/5 pt-4 px-4 flex flex-col gap-3">
                {user ? (
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-all border border-red-500/20"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                ) : (
                  <>
                    <Link href={'/login'}>
                    <button  
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-3.5 rounded-full bg-white/5 border border-white/10 text-purple-300 hover:text-white font-bold transition-all"
                    >
                      Login
                    </button>
                    </Link>
                    <Link href={'/register'}>
                    <button  
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold transition-all shadow-[0_0_25px_rgba(147,51,234,0.3)]"
                    >
                      Get Started
                    </button>
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}