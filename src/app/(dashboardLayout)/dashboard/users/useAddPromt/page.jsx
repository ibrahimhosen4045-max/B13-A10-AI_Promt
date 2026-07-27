"use client"
import React, { useState } from 'react';
import { 
  PlusCircle, 
  Upload, 
  Globe, 
  Lock, 
  Sparkles, 
  ImageIcon, 
  X, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { uploadImage } from '@/lib/UploadImage';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function userAddPromt() {

const { data: session } = authClient.useSession();
const user = session?.user;

// Form States
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [content, setContent] = useState("");
const [category, setCategory] = useState("");
const [aiTool, setAiTool] = useState("");
const [tags, setTags] = useState("");
const [difficulty, setDifficulty] = useState("Beginner");
const [visibility, setVisibility] = useState("Public");

// Image States
const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState("");

// Loading State
const [isSubmitting, setIsSubmitting] = useState(false);

// Image Upload Preview
const handleImageChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    toast.error("Image size must be less than 2MB.");
    return;
  }

  setImageFile(file);

  const reader = new FileReader();

  reader.onloadend = () => {
    setImagePreview(reader.result);
  };

  reader.readAsDataURL(file);
};

// Remove Image
const removeImage = () => {
  setImageFile(null);
  setImagePreview("");
};

// Submit Form
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !description || !content || !category) {
    toast.error("Please fill all required fields.");
    return;
  }

  setIsSubmitting(true);

  try {
    let imageUrl =
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80";

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const payload = {
      title,
      description,
      content,
      category,
      aiTool,
      tags: tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
      difficulty,
      thumbnail: imageUrl,
      visibility,
      copyCount: 0,
      status: "pending",

      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      userImage: user?.image,
    };

    const res = await fetch("http://localhost:5500/api/user/addPrompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    
    if(res.ok){
      toast.success("Prompt added successfully!");
      setIsSubmitting(false)
    }

    if (!res.ok) {
      setIsSubmitting(false)
      toast.error(data.message)
    }

    
    

    // Reset Form
    setTitle("");
    setDescription("");
    setContent("");
    setCategory("");
    setAiTool("");
    setTags("");
    setDifficulty("Beginner");
    setVisibility("Public");
    setImageFile(null);
    setImagePreview("");

    console.log(data);
  } catch (error) {
    console.error(error);
    toast.error(error.message || "Something went wrong!");
  } finally {
    setIsSubmitting(false);
  }
}; 

  return (
    <div className='w-full flex justify-center py-6 px-4 pt-20 lg:pt-6'>
      <div className="w-full max-w-4xl mx-auto bg-[#080d1e]/90 border border-white/[0.08] p-6 sm:p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
      
      {/* Top Cyberpunk Tech Highlight Border */}
      <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />

      {/* Header Info Block */}
      <div className="mb-8 border-b border-white/[0.06] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-300 rounded-full uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" /> Prompt Engine
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-purple-400" /> Share Your AI Prompt
        </h2>
        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
          Submit your AI prompt to the community. After admin approval, it will appear on the marketplace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Field 1: Prompt Title */}
        <div className="sm:col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-2 ml-1">Prompt Title *</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Scarecrow portrait in midday daylight"
            className="w-full bg-[#040814]/80 border border-white/10 p-4 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
          />
        </div>

        {/* Field 2: Prompt Description */}
        <div className="sm:col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-2 ml-1">Short Description *</label>
          <textarea 
            required
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a clear summary explaining what this prompt generates..."
            className="w-full bg-[#040814]/80 border border-white/10 p-4 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all resize-none"
          />
        </div>

        {/* Field 3: Prompt Content / Command */}
        <div className="sm:col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-2 ml-1">Exact Prompt Instructions Content *</label>
          <textarea 
            required
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Copy and paste the exact command string here. Use [brackets] for parameters..."
            className="w-full bg-[#040814]/80 border border-white/10 p-4 rounded-2xl text-xs font-mono text-cyan-300 placeholder-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
          />
        </div>

        {/* Field 4: Category */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-2 ml-1">Category Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#040814]/80 border border-white/10 p-4 rounded-2xl text-xs text-purple-300 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
          >
            <option value="">Select Category</option>
            <option value="Writing">Writing</option>
            <option value="Coding">Coding</option>
            <option value="Marketing">Marketing</option>
            <option value="Photography">Photography</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Field 5: Target AI Tool selection */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-2 ml-1">Target AI Tool</label>
          <select 
            value={aiTool}
            onChange={(e) => setAiTool(e.target.value)}
            className="w-full bg-[#040814]/80 border border-white/10 p-4 rounded-2xl text-xs text-purple-300 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
          >
            <option value="" >Select AI Tols</option>
            <option value="Midjourney">Midjourney</option>
            <option value="DALL-E">DALL-E 3</option>
            <option value="GPT prompts">GPT prompts (ChatGPT)</option>
            <option value="Stable Diffusion">Stable Diffusion</option>
            <option value="Leonardo AI">Leonardo AI</option>
            <option value="Claude">Claude</option>
            <option value="Gemini">Gemini</option>
            <option value="Flux">Flux</option>
            <option value="Ideogram">Ideogram</option>
            <option value="Runway">Runway</option>
            <option value="Suno">Suno</option>
            <option value="ElevenLabs">ElevenLabs</option>
            <option value="Perplexity">Perplexity</option>
          </select>
        </div>

        {/* Field 6: Tags */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-2 ml-1">Tags (Comma Separated)</label>
          <input 
            type="text" 
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., daylight, rustic, portrait"
            className="w-full bg-[#040814]/80 border border-white/10 p-4 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/50"
          />
        </div>

        {/* Field 7: Difficulty Level selection */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-2 ml-1">Difficulty level</label>
          <div className="grid grid-cols-3 gap-2">
            {['Beginner', 'Intermediate', 'Pro'].map((lvl) => { 
              const activeStyle = {
                Beginner: "bg-green-500/15 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]",
                Intermediate:'bg-yellow-500/15 border-yellow-500 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]',
                Pro:'bg-red-500/15 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]',
              }
              return(
              <button
                key={lvl}
                type="button"
                onClick={() => setDifficulty(lvl)}
                className={`py-3.5 rounded-xl border text-xs font-bold transition-all duration-300 ${
                  difficulty === lvl 
                    ? activeStyle[lvl]
                    : 'bg-[#040814]/80 border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300'
                }`}
              >
                {lvl}
              </button>
            )})}
          </div>
        </div>

        {/* Field 8: Image Upload Drag and Drop box (Interactive Preview) */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-2 ml-1">Thumbnail Preview Image</label>
          <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center bg-[#040814]/60 hover:border-purple-500/30 transition-all min-h-[140px] group overflow-hidden">
            
            {imagePreview ? (
              <div className="absolute inset-0 w-full h-full">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:text-red-400 backdrop-blur-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <ImageIcon className="w-8 h-8 text-gray-500 mb-2 group-hover:text-purple-400 transition-colors" />
                <span className="text-[10px] text-gray-400 text-center">Click or Drag image to upload prompt thumbnail</span>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>
        </div>

        {/* Submit Register Button */}
        <div className="sm:col-span-2 border-t border-white/[0.06] pt-6 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-500 animate-pulse animate-duration-1000" /> Auto marked as pending until admin approval.
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Prompt Draft <PlusCircle className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
    </div>
  );
}