"use client"
import { authClient } from '@/lib/auth-client'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, User, ShieldAlert, Wallet, 
  Bookmark, Shield, PlusCircle, ListOrdered, 
  Users, AlertTriangle, LogOut, Menu, X, Download,
  UserCog,
  House,
  SquareChartGantt,
  CreditCard
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import NavLink from '../NavLink'


const DashNavber = ({userDetails}) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')
    const router = useRouter()

      const session = {
    user: {
      name: userDetails?.name,
      email: userDetails?.email,
      role: userDetails?.role, // Options: 'user' | 'creator' | 'admin'
      avatar: userDetails?.image
    }
  }
  
  const user = session?.user;

     const getSidebarLinks = (role) => {
    const baseLinks = [{ id: 'overview', label: 'Overview', icon: LayoutDashboard,  href: "/dashboard" }]
    
    if (role === 'Admin') {
      return [
        ...baseLinks,
        { id: 'manage-users', label: 'Manage Users', icon: Users, href: '/dashboard/admin/managUser' },
        { id: 'manage-prompts', label: 'Manage Prompts', icon: SquareChartGantt , href: '/dashboard/admin/managPromt' },
        { id: 'payment-history', label: 'Payment History', icon: CreditCard  , href: '/dashboard/admin/paymentHistory' },
        { id: 'reports', label: 'Reported Prompts', icon: AlertTriangle, href: '/dashboard/admin/reportedPromt' },
        { id: 'my-Profile', label: 'My Profile', icon: UserCog , href: '/dashboard/profile' },
      ]
    }
    
    if (role === 'Creator') {
      return [
        ...baseLinks,
        { id: 'add-prompt', label: 'Add New Prompt', icon: PlusCircle, href: '/dashboard/creator/addPromt'},
        { id: 'my-prompts', label: 'My Prompts', icon: ListOrdered, href: '/dashboard/creator/myPromt' },
        { id: 'my-Profile', label: 'My Profile', icon: UserCog , href: '/dashboard/profile' },

      ]
    }
    
    // Default Normal User
    return [
      ...baseLinks,
      { id: 'purchased', label: 'Add New Prompt', icon: PlusCircle, href: '/dashboard/users/useAddPromt' },
      { id: 'my-prompts', label: 'My Prompts', icon: ListOrdered, href: '/dashboard/users/userMyPromt' },
      { id: 'bookmarks', label: 'My Bookmarks', icon: Bookmark, href: '/dashboard/users/bookmark' },
      { id: 'my-Profile', label: 'My Profile', icon: UserCog , href: '/dashboard/users/userProfile' },
    ]
  }

  const handleSingOut =async () => {
    await authClient.signOut()
    router.push('/')
  }

  const sidebarLinks = getSidebarLinks(user?.role)
  return (
    <div className='h-screen fixed top-0 left-0 bottom-0 z-50'>
            {/* --- SIDEBAR COMPONENT --- */}
      {/* Desktop Sidebar */}
      <aside className="h-full hidden lg:flex flex-col w-72 bg-[#0d0921]/80 backdrop-blur-xl border-r border-purple-500/10 p-6 z-30 pt-5">
      
        <div className="flex items-center gap-3 pb-8 border-b border-purple-500/10">
          <div className="p-2.5 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Promptly BD</h2>
            <span className="text-xs uppercase font-semibold text-purple-400 tracking-widest">{user?.role} panel</span>
          </div>
        </div>

        {/* User Info Capsule */}
        <div className="mt-6 p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
          <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-lg object-cover ring-2 ring-purple-500/30" />
          <div className="truncate">
            <h4 className="text-sm font-semibold truncate">{user?.name}</h4>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="mt-8 flex-1 space-y-1.5">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <NavLink href={link.href} key={link.id} >
              <button className='flex gap-2 items-centers'>
                <Icon className="w-5 h-5" />
                {link.label}
              </button>
              </NavLink>
            )
          })}
        </nav>
        <Link href={'/'}>
        <div className='pb-2 w-full'>
          <button className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all border border-transparent w-full hover:border-rose-500/20 mt-auto '><House className="w-5 h-5" />Home</button>
        </div>
        </Link>

        {/* Logout Trigger */}
        
        <button onClick={handleSingOut} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20 mt-auto">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
        
      </aside>

      {/* Mobile Menu Trigger Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0d0921]/90 backdrop-blur-md border-b border-purple-500/10 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-500" />
          <span className="font-bold text-sm uppercase tracking-wider">Dashboard ({user?.role})</span>
        </div>
        <button onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} className="p-2 text-gray-400 hover:text-white">
          {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-y-0 left-0 w-64 bg-[#0d0921] border-r border-purple-500/20 p-6 pt-20 z-30 shadow-2xl"
          >
            <nav className="space-y-2">
              {sidebarLinks.map((link) => {
                const Icon = link.icon
                const isActive = activeTab === link.id
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id)
                      setIsMobileSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-gray-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </button>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DashNavber
