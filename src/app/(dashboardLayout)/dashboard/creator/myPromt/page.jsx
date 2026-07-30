"use client"
import React, {  useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, 
  Trash2, 
  Globe, 
  Lock, 
  Sparkles, 
  Search, 
  Eye, 
  X, 
  Check, 
  AlertCircle,
  HelpCircle,
  Copy,
  StickyNotes,
  Clipboard,
  Star
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { Bars } from 'react-loader-spinner';
import toast from 'react-hot-toast';



export default function MyPrompts() {
  const [prompts, setPrompts] = useState([]);
const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {data: session} = authClient.useSession();
  const user = session?.user;

  useEffect(()=>{
    if(!user?.email) return;

    const getMyPromts = async ()=> {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/creator/mypromt?email=${user.email}`)

        const data = await res.json();
        setPrompts(data)
      } catch (err){
        console.log(err)
      } finally {
        setTimeout(()=>{
          setLoading(false)
        },1200)
        
      }
    }

    getMyPromts()

  },[user])

  
  // ১. ডিলিট ফাংশন (কোনো ব্রাউজার confirm অ্যালার্ট ছাড়া)
  const handleDeletePrompt =async (id, title) => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/creator/${id}?email=${user.email}`,{
        method: "DELETE"
      });
      const data = await res.json();

      if(!res.ok){
        toast.error(data.message)
        return
      }

      if(data.deletedCount > 0){
        setPrompts((prev)=> prev.filter((p)=>p._id !== id))
        toast.success(`"${title}" has been permanently deleted.`, "success");
      } 


    } catch (error){
      toast.error("Something went wrong")
      console.log(error)
      
    }
  };

  // ২. এডিট মোডাল ওপেন করার ফাংশন
  const handleOpenEditModal = (prompt) => {
    setSelectedPrompt({ ...prompt }); // Deep copy to prevent instant state changes
    setIsEditModalOpen(true);
  };

  // ৩. আপডেট সেভ করার ফাংশন
  const handleSaveUpdate = async (e) => {
    e.preventDefault()
    
    if(
      !selectedPrompt.title ||
      !selectedPrompt.description ||
      !selectedPrompt.content 
    ) {
      showToast('Please fill in all the requirment fields.', "error")
      return
    }

    try{

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/creator/${selectedPrompt._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            title: selectedPrompt.title,
            description: selectedPrompt.description,
            content: selectedPrompt.content,
            visibility: selectedPrompt.visibility,
            difficulty: selectedPrompt.difficulty,
            creatorEmail: user?.email
          })
        }
      )

      const data = await res.json()

      if(!res.ok){
        toast.error(data.message)
      }

      if(data.matchedCount > 0){
        setPrompts((prev) =>
          prev.map((prompt) =>
          prompt._id === selectedPrompt._id
          ? { ...prompt, ...selectedPrompt }
          : prompt
            )
          );

        setIsEditModalOpen(false);
        toast.success(
        `"${selectedPrompt.title}" updated successfully!`,
        "success");

      } 
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.", "error")
    }
  };

  // সার্চিং ফিল্টার
  const filteredPrompts = prompts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.aiTool.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full  relative '>

      <div className=" mt-10 lg:w-11/12 max-w-6xl mx-auto bg-[#080d1e]/80 border border-white/[0.08] p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl  overflow-hidden">
      
      {/* Top Cyberpunk Neon Border Highlight */}
      <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />


      {/* Header Info Banner Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-300 rounded-full uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" /> Workspace
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            My Prompts Database ({prompts.length})
          </h2>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            Manage your submitted prompt templates, monitor approval states, or quickly update/delete files instantly.
          </p>
        </div>

        {/* Live Search Box inside page */}
        <div className="relative w-full sm:w-64 bg-[#040814]/80 border border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-2 focus-within:border-purple-500/50 transition-all">
          <Search className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search prompt, tool..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-gray-600 focus:ring-0"
          />
        </div>
      </div>

      {/* Table Container wrapping responsive styles */}
      {loading? <div className='w-full h-50 flex items-center justify-center'>
          <Bars height="50" width="50" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div> : 
      <div className="overflow-x-auto w-full rounded-2xl border border-white/[0.05] bg-[#040814]/40">
        <table className="w-full text-left border-collapse ">
          <thead>
            <tr className="border-b border-white/[0.08] text-gray-500 text-[10px] uppercase font-bold tracking-widest bg-white/[0.01]">
              <th className="py-4.5 px-5">Prompt Cover Info</th>
              <th className="py-4.5 px-5">AI Platform</th>
              <th className="py-4.5 px-5">Visibility</th>
              <th className="py-4.5 px-5">Mod Status</th>
              <th className="py-4.5 px-5">Copies</th>
              <th className="py-4.5 px-5">Rating</th>
              <th className="py-4.5 px-5 text-right">Actions Panel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-xs">
            {filteredPrompts.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-500 font-bold uppercase tracking-wider">
                  No prompts found in your workspace database!
                </td>
              </tr>
            ) : (
              filteredPrompts.map((prompt) => (
                <tr key={prompt._id} className="group hover:bg-white/[0.01] transition-all">
                  
                  {/* Thumbnail & Title metadata */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-slate-900 shadow-md">
                        <img src={prompt.thumbnail} alt={prompt.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 max-w-[200px]">
                        <h4 className="font-extrabold text-white truncate group-hover:text-purple-300 transition-colors">{prompt.title}</h4>
                        <span className="text-[10px] text-gray-500 font-medium block mt-0.5">{prompt.createdAt}</span>
                      </div>
                    </div>
                  </td>

                  {/* AI Tool platform badge and category */}
                  <td className="py-4 px-5">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-[9px] font-black uppercase text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/15">
                        {prompt.aiTool}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">{prompt.category}</span>
                    </div>
                  </td>

                  {/* Private vs Public toggle visual badge */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 font-bold text-gray-300">
                      {prompt.visibility === 'Public' ? (
                        <>
                          <Globe className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Public</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-purple-400" />
                          <span>Private</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Mod status validation check tag */}
                  <td className="py-4 px-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      prompt.status === 'approved' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.08)]' 
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.08)]'
                    }`}>
                      {prompt.status}
                    </span>
                  </td>

                  {/* Usage telemetry indexes */}
                  <td className="h-full py-4 px-5 text-[15px]  ">
                    <div className='flex items-center gap-0.5'>
                      <Clipboard size={15} absoluteStrokeWidth  color='#26C6DA'/>
                    {prompt.copyCount}
                    </div>
                  </td>

                  {/*total rating*/}

                  <td className="h-full py-4 px-5 text-[15px]  ">
                    <div className='flex items-center gap-0.5'>
                      <Star size={15} absoluteStrokeWidth color='#FFA000'/>
                    {prompt.averageRating}
                    </div>
                  </td>

                  {/* Actions Area */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      
                      {/* Update Button */}
                      <button
                        onClick={() => handleOpenEditModal(prompt)}
                        className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:text-purple-400 hover:bg-purple-500/5 transition-all"
                        title="Update Prompt"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeletePrompt(prompt._id, prompt.title)}
                        className="p-2 rounded-xl bg-red-500/5 border border-red-500/10 hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Delete Prompt"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>}

  
         
      

    </div>

        {/* UPDATE/EDIT MODAL OVERLAY */}
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
  );
}