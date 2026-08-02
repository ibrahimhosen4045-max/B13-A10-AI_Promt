"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import Swal from "sweetalert2";
import image from '@/assest/ava.png'
import Image from "next/image";
import bgImage from "@/assest/shape.png"
export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        title: "Ops...",
        text: "Please enter your email address!",
        icon: "warning",
        background: "#0d111d",
        color: "#ffffff",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    // Success SweetAlert
    Swal.fire({
      title: "Subscribed Successfully!",
      text: "Thank you for subscribing to our newsletter updates.",
      icon: "success",
      background: "#0d111d",
      color: "#ffffff",
      confirmButtonColor: "#6366f1",
      customClass: {
        popup: "border border-purple-500/20 rounded-2xl backdrop-blur-xl",
      },
    });

    setEmail("");
  };

  return (
    <section className="w-full bg-[#030712] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#5332c6] via-[#6335d8] to-[#4527b1] border border-white/10  shadow-[0_0_50px_rgba(83,50,198,0.3)]" 
      >
 
        <div className="p-8 sm:p-12 md:px-16 flex flex-col-reverse lg:flex-row gap-8 items-center relative z-10" style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
          
          {/* Left Side: Content & Input Form */}
          <div className="flex-6 flex flex-col justify-center text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-wide mb-4 drop-shadow-sm">
              Don’t Miss New Prompts And Marketplace Recent Updates!
            </h2>
            
            <p className="text-purple-200/80 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
              accumsan nisi Ut ut felis congue nisl hendrerit commodo.
            </p>

            {/* Email Input Box */}
            <form onSubmit={handleSubscribe} className="w-full max-w-md">
              <div className="flex items-center bg-white rounded-full p-1.5 shadow-2xl focus-within:ring-2 focus-within:ring-purple-300 transition-all">
                <div className="pl-4 text-slate-400 flex items-center">
                  <Mail className="w-5 h-5" />
                </div>
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  className="w-full px-3 py-2 text-sm text-slate-800 bg-transparent focus:outline-none placeholder-slate-400 font-medium"
                />

                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#a855f7] via-[#8b5cf6] to-[#6366f1] hover:from-[#9333ea] hover:to-[#4f46e5] text-white font-extrabold text-xs tracking-wider uppercase px-6 sm:px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md flex-shrink-0"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Main 3D Image Container */}
          <div className="flex-3 flex items-center justify-center relative">
            {/* আপনার মেইন ইমেজের പാথ এখানে বসিয়ে দিন */}
            <Image
              src={image} 
              alt="3D Chart Illustration"
              className="w-full max-w-sm sm:max-w-md lg:max-w-none object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-105"
            />
          </div>

        </div>
      </div>
    </section>
  );
}