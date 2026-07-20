"use client"
import {motion, AnimatePresence } from 'framer-motion';
import { Edit3, X } from 'lucide-react';
import React, { useState } from 'react'

const UpdatePromtCardMobal = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
// ২. এডিট মোডাল ওপেন করার ফাংশন
  const handleOpenEditModal = (prompt) => {
    setSelectedPrompt({ ...prompt }); // Deep copy to prevent instant state changes
    setIsEditModalOpen(true);
  };

    // ৩. আপডেট সেভ করার ফাংশন
  const handleSaveUpdate = (e) => {
    e.preventDefault();
    if (!selectedPrompt.title || !selectedPrompt.description || !selectedPrompt.content) {
      showToast("Please fill in all the required fields.", "error");
      return;
    }

    setPrompts(prev => prev.map(p => p.id === selectedPrompt.id ? selectedPrompt : p));
    setIsEditModalOpen(false);
    showToast(`"${selectedPrompt.title}" updated successfully!`, 'success');
  };
  return (
    <div className='w-full h-screen relative'>
      <div>
        <button
          onClick={() => handleOpenEditModal(prompt)}
          className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:text-purple-400 hover:bg-purple-500/5 transition-all"
          title="Update Prompt"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      {/* UPDATE/EDIT MODAL OVERLAY */}
      
    </div>
    <AnimatePresence>
        {isEditModalOpen && selectedPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            
            {/* Modal close backdrop trigger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setIsEditModalOpen(false)}
            />

            {/* Glowing Cyberpunk Modal Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-xl bg-[#080d1e] border border-white/10 p-6 sm:p-8 rounded-3xl relative z-10 shadow-2xl overflow-hidden"
            >
              {/* Glowing Top Edge */}
              <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />
              
              <div className="flex justify-between items-center border-b border-white/[0.06] pb-4 mb-5">
                <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-purple-400" /> Update Prompt Details
                </h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveUpdate} className="flex flex-col gap-4">
                
                {/* 1. Prompt Title */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1.5 ml-1">Prompt Title *</label>
                  <input 
                    type="text" 
                    required
                    value={selectedPrompt.title}
                    onChange={(e) => setSelectedPrompt(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-[#040814]/80 border border-white/10 p-3.5 rounded-2xl text-xs text-white outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>

                {/* 2. Short Description */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1.5 ml-1">Short Description *</label>
                  <textarea 
                    required
                    rows="2"
                    value={selectedPrompt.description}
                    onChange={(e) => setSelectedPrompt(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-[#040814]/80 border border-white/10 p-3.5 rounded-2xl text-xs text-white outline-none focus:border-purple-500/50 transition-all resize-none"
                  />
                </div>

                {/* 3. Prompt Content */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1.5 ml-1">Exact Prompt Instructions Content *</label>
                  <textarea 
                    required
                    rows="4"
                    value={selectedPrompt.content}
                    onChange={(e) => setSelectedPrompt(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full bg-[#040814]/80 border border-white/10 p-3.5 rounded-2xl text-xs font-mono text-cyan-300 outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>

                {/* 4. Visibility and Difficulty row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1.5 ml-1">Visibility settings</label>
                    <select 
                      value={selectedPrompt.visibility}
                      onChange={(e) => setSelectedPrompt(prev => ({ ...prev, visibility: e.target.value }))}
                      className="w-full bg-[#040814]/80 border border-white/10 p-3 rounded-2xl text-xs text-purple-300 outline-none focus:border-purple-500/50 transition-all"
                    >
                      <option value="Public">Public Option</option>
                      <option value="Private">Private Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1.5 ml-1">Difficulty level</label>
                    <select 
                      value={selectedPrompt.difficulty}
                      onChange={(e) => setSelectedPrompt(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full bg-[#040814]/80 border border-white/10 p-3 rounded-2xl text-xs text-purple-300 outline-none focus:border-purple-500/50 transition-all"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Pro">Pro</option>
                    </select>
                  </div>
                </div>

                {/* Footer buttons row */}
                <div className="border-t border-white/[0.06] pt-5 mt-3 flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-widest shadow-lg transition-all active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UpdatePromtCardMobal
