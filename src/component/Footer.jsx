"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Headphones, 
  ArrowUp,
  Heart
} from 'lucide-react';


// Modern X Logo SVG Component matching standard brand Guidelines
const XLogo = () => (
  <svg className="w-4 h-4 transition-colors" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040814] text-gray-400 font-sans overflow-hidden border-t border-white/[0.06] pt-20 pb-8">
      
      {/* Background neon light indicators for tech-inspired UI depth */}
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[250px] h-[250px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          
          {}
          {/* Column 1: About Us */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-slate-950 rounded-lg flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent uppercase">
                PROMPTLY
              </span>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              At the end of the day, going forward, a new normal that has evolved generation X is on the runway heading towards a streamlined cloud solution. Discover, collect, and optimize top-tier AI prompts.
            </p>

            {/* Glowing Cyberpunk Social Media Row */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { icon: 'F', link: '#', label: 'Facebook', customColor: 'hover:text-blue-400 hover:border-blue-400/40 hover:shadow-blue-500/20' },
                { icon: <XLogo />, link: '#', label: 'X', customColor: 'hover:text-white hover:border-white/40 hover:shadow-white/10' },
                { icon: 'G+', link: '#', label: 'Google', customColor: 'hover:text-red-400 hover:border-red-400/40 hover:shadow-red-500/20' },
                { icon: 'In', link: '#', label: 'LinkedIn', customColor: 'hover:text-cyan-400 hover:border-cyan-400/40 hover:shadow-cyan-500/20' },
                { icon: 'Ig', link: '#', label: 'Instagram', customColor: 'hover:text-pink-400 hover:border-pink-400/40 hover:shadow-pink-500/20' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-[0_0_0_transparent] hover:shadow-lg ${social.customColor}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {}
          {/* Column 2: Contact Us */}
          <div className="relative rounded-2xl border border-white/[0.04] bg-[#070c1b]/40 p-6 overflow-hidden">
            {/* World Map faint vector background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-lighten bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80')" }}></div>
            
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />
              Contact Us
            </h3>

            <div className="flex flex-col gap-5 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0 animate-pulse">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest block mb-1">Customer Support</span>
                  <p className="text-sm text-gray-300 font-medium">Available 24/7 Live</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm hover:text-white transition-colors">
                <MapPin className="w-4 h-4 mt-1 text-purple-400 flex-shrink-0" />
                <p className="leading-relaxed text-gray-300">10, MC Donald Avenue, Sunset Park, Newyork</p>
              </div>

              <div className="flex items-start gap-4 text-sm hover:text-white transition-colors">
                <Phone className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                <p className="text-gray-300">+99 999 9999</p>
              </div>

              <div className="flex items-start gap-4 text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />
                <p className="text-gray-300 truncate">info@yourdomain.com</p>
              </div>
            </div>
          </div>

          {}
          {/* Column 3: Newsletter */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />
                Newsletter
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Stay Updated with our latest news and upcoming AI premium tools. We promise not to spam your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative w-full">
              <div className="relative flex items-center bg-[#070c1b]/80 border border-white/10 rounded-full p-1.5 focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/10 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address" 
                  required
                  className="w-full bg-transparent pl-4 pr-12 py-2 text-sm text-white border-none outline-none focus:ring-0 placeholder-gray-500"
                />
                <button 
                  type="submit" 
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1.5 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(147,51,234,0.45)]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {subscribed && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2"
              >
                🎉 Awesome! You have successfully subscribed to Promptly News.
              </motion.div>
            )}
          </div>

        </div>

        {}
        {/* Divider and Copyright Area */}
        <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left flex items-center gap-1.5">
            <span>Copyright © {new Date().getFullYear()}. All Rights Reserved.</span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1">Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for AI Creators.</span>
          </p>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold tracking-wider text-purple-300 hover:text-white transition-all hover:border-purple-500/30 group active:scale-95"
          >
            <span>SCROLL TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}