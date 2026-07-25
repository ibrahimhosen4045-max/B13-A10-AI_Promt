import React from 'react'

const data = () => {
  const uploadImage = async (imageFile) => {
    const formData = new FormData()
    formData.append('image', imageFile)

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const data = await response.json()

    if (data.success) {
      return data.data.url
    }

    throw new Error('Image upload failed')
  }

  return <div />
}

export default data


// "use client"

// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { 
//   LayoutDashboard, User, ShieldAlert, Wallet, 
//   Bookmark, Shield, PlusCircle, ListOrdered, 
//   Users, AlertTriangle, LogOut, Menu, X,
//   TrendingUp, DollarSign, Eye, Download
// } from 'lucide-react'

// // Mock Data for Analytics Chart (Simple pure CSS representation to avoid dependency crash)
// const mockChartData = [
//   { month: 'Jan', value: 40 },
//   { month: 'Feb', value: 65 },
//   { month: 'Mar', value: 50 },
//   { month: 'Apr', value: 85 },
//   { month: 'May', value: 110 },
//   { month: 'Jun', value: 95 },
// ]

// const Dashboard = () => {
//   // Simulating authClient data based on your snippet
//   // In real code: 
//   // const { data: session, isPending } = authClient.useSession();
//   // Change role to 'creator' or 'admin' to test different dashboards instantly!
//   const session = {
//     user: {
//       name: "Sabbir Ahmed",
//       email: "sabbir@webdev.com",
//       role: "admin", // Options: 'user' | 'creator' | 'admin'
//       avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
//     }
//   }
  
//   const user = session?.user;
  


//   // 2. Role-Based Dynamic Stat Cards Data
//   const getStatCards = (role) => {
//     if (role === 'admin') {
//       return [
//         { label: 'Total Platform Users', value: '14,204', change: '+12% this week', icon: Users, color: 'from-blue-500 to-indigo-600' },
//         { label: 'Pending Approvals', value: '28', change: 'Action required', icon: ShieldAlert, color: 'from-amber-500 to-orange-600' },
//         { label: 'Total Platform Revenue', value: '$45,210', change: '+24% this month', icon: DollarSign, color: 'from-emerald-500 to-teal-600' },
//       ]
//     }
//     if (role === 'creator') {
//       return [
//         { label: 'Total Prompt Sales', value: '384', change: '+18% bonus target', icon: TrendingUp, color: 'from-purple-500 to-pink-600' },
//         { label: 'My Digital Wallet', value: '$2,450.80', change: 'Stripe Connected', icon: DollarSign, color: 'from-emerald-500 to-teal-600' },
//         { label: 'Total Prompt Views', value: '12.8K', change: 'Top 5% Creator', icon: Eye, color: 'from-cyan-500 to-blue-600' },
//       ]
//     }
//     // Standard User Stats
//     return [
//       { label: 'Purchased Prompts', value: '14', change: 'All active', icon: Download, color: 'from-purple-500 to-indigo-600' },
//       { label: 'Saved Bookmarks', value: '42', change: '3 updated today', icon: Bookmark, color: 'from-pink-500 to-rose-600' },
//       { label: 'Account Group', value: 'Free Tier', change: 'Limit: 3 posts max', icon: User, color: 'from-slate-600 to-slate-800' },
//     ]
//   }

//   const stats = getStatCards(user?.role)

//   return (
//     <div className=" min-h-screen md:pt-17 lg:pt-0 bg-[#0a0516] text-white flex relative overflow-hidden">
//       {/* Cyberpunk Radial Lighting Effects */}
//       <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />

//       {/* --- MAIN CONTENT WINDOW --- */}
//       <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 pt-20 lg:pt-10 overflow-y-auto">
        
//         {/* Dynamic Context Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-500/10">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-black tracking-tight capitalize">
//               Welcome Back, {user?.name.split(' ')[0]} 👋
//             </h1>
//             <p className="text-xs sm:text-sm text-gray-400 mt-1">
//               Here is what's happening with your system metrics dashboard right now.
//             </p>
//           </div>
//           <div className="flex items-center gap-2 self-start sm:self-center bg-white/5 border border-white/5 px-4 py-2 rounded-xl">
//             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Role: {user?.role} node</span>
//           </div>
//         </div>

//         {/* 3. Render Grid Metrics Stat Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
//           {stats.map((stat, idx) => {
//             const Icon = stat.icon
//             return (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="bg-[#0d0921]/50 backdrop-blur-md border border-purple-500/10 rounded-2xl p-5 relative overflow-hidden group"
//               >
//                 <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${stat.color} opacity-5 blur-xl group-hover:opacity-15 transition-opacity duration-500`} />
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
//                     <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                       {stat.value}
//                     </h3>
//                   </div>
//                   <div className={`p-3 rounded-xl bg-gradient-to-tr ${stat.color} shadow-lg`}>
//                     <Icon className="w-5 h-5 text-white" />
//                   </div>
//                 </div>
//                 <div className="mt-4 flex items-center gap-1.5 text-xs">
//                   <span className="text-emerald-400 font-medium">{stat.change}</span>
//                 </div>
//               </motion.div>
//             )
//           })}
//         </div>

//         {/* 4. Analytics & Recent Actions Multi-Grid Context */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
          
//           {/* Custom Pure CSS Interactive Mini-Chart Container (Eliminates Recharts installation failure risks) */}
//           <div className="xl:col-span-2 bg-[#0d0921]/40 backdrop-blur-md border border-purple-500/10 rounded-2xl p-6">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h3 className="font-bold text-lg">Activity Metrics Vector</h3>
//                 <p className="text-xs text-gray-400 mt-0.5">Real-time performance matrix tracking</p>
//               </div>
//               <span className="text-xs px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 font-medium">Live Stream</span>
//             </div>

//             {/* Simple Scalable Mock Chart Graphics */}
//             <div className="h-52 flex items-end justify-between gap-2 pt-4 px-2 relative border-b border-white/10">
//               {mockChartData.map((data, i) => (
//                 <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
//                   <motion.div 
//                     initial={{ height: 0 }}
//                     animate={{ height: `${data.value}%` }}
//                     transition={{ duration: 1, delay: i * 0.05 }}
//                     className="w-full max-w-[40px] bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-lg relative group-hover:from-purple-500 group-hover:to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
//                   >
//                     <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-900 text-[10px] px-2 py-0.5 rounded border border-purple-400 text-white transition-opacity whitespace-nowrap z-10">
//                       {data.value} index
//                     </div>
//                   </motion.div>
//                   <span className="text-xs text-gray-500 font-medium mb-[-24px]">{data.month}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contextual Action Items List based on Current Role */}
//           <div className="bg-[#0d0921]/40 backdrop-blur-md border border-purple-500/10 rounded-2xl p-6 flex flex-col">
//             <h3 className="font-bold text-lg mb-1">System Action Core</h3>
//             <p className="text-xs text-gray-400 mb-5">Quick configurations for {user?.role} nodes</p>
            
//             <div className="space-y-3 flex-1">
//               {user?.role === 'admin' && (
//                 <>
//                   <button className="w-full text-left p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all text-xs font-semibold text-amber-300 flex items-center justify-between">
//                     <span>Review 28 Pending Submissions</span>
//                     <ShieldAlert className="w-4 h-4" />
//                   </button>
//                   <button className="w-full text-left p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all text-xs font-semibold text-purple-300 flex items-center justify-between">
//                     <span>Open Global Platform Settlements</span>
//                     <DollarSign className="w-4 h-4" />
//                   </button>
//                 </>
//               )}
//               {user?.role === 'creator' && (
//                 <>
//                   <button className="w-full text-left p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all text-xs font-semibold text-purple-300 flex items-center justify-between">
//                     <span>Draft New AI Core Prompt</span>
//                     <PlusCircle className="w-4 h-4" />
//                   </button>
//                   <button className="w-full text-left p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all text-xs font-semibold text-cyan-300 flex items-center justify-between">
//                     <span>Configure Stripe Payout Profile</span>
//                     <Wallet className="w-4 h-4" />
//                   </button>
//                 </>
//               )}
//               {user?.role === 'user' && (
//                 <>
//                   <button className="w-full text-left p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all text-xs font-semibold text-purple-300 flex items-center justify-between">
//                     <span>Unlock Premium Subscriptions</span>
//                     <Wallet className="w-4 h-4" />
//                   </button>
//                 </>
//               )}
//             </div>
            
//             <div className="mt-4 p-3 bg-white/5 border border-white/5 rounded-xl text-[11px] text-gray-400 leading-relaxed">
//               💡 **System Notification:** All active tokens and node session data auto-refresh every 15 minutes smoothly.
//             </div>
//           </div>

//         </div>

//       </main>
//     </div>
//   )
// }

// export default Dashboard
