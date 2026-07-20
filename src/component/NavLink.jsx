"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children, className = "" }) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-purple-600/20 to-pink-600/5 border border-purple-500/30 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      } ${className}`}
    >
      {children}
    </Link>
  );
}