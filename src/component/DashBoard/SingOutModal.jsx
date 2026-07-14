// "use client"
// import { AnimatePresence } from 'framer-motion';
// import React, { useState } from 'react'

// const SingOut = () => {
//     const [isLogoutOpen, setIsLogoutOpen] = useState(false);
//   return (
//     <div>
//       <AnimatePresence>
//   {isLogoutOpen && (
//     <>
//       {/* Backdrop */}
//       <motion.div
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={() => setIsLogoutOpen(false)}
//       />

//       {/* Modal */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 30 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.9, y: 30 }}
//         transition={{ duration: 0.25 }}
//         className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2"
//       >
//         <div className="rounded-2xl border border-red-500/20 bg-[#111827] p-8 shadow-2xl">
//           {/* Icon */}
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
//             <LogOut className="h-8 w-8 text-red-500" />
//           </div>

//           {/* Title */}
//           <h2 className="mt-5 text-center text-2xl font-bold text-white">
//             Sign Out
//           </h2>

//           <p className="mt-2 text-center text-gray-400">
//             Are you sure you want to sign out from your account?
//           </p>

//           {/* Buttons */}
//           <div className="mt-8 flex gap-4">
//             <button
//               onClick={() => setIsLogoutOpen(false)}
//               className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 font-medium text-gray-300 transition hover:bg-white/10"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={handleSingOut}
//               className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   )}
// </AnimatePresence>
//     </div>
//   )
// }

// export default SingOut

import React from 'react'

const SingOutModal = () => {
  return (
    <div>
      
    </div>
  )
}

export default SingOutModal
