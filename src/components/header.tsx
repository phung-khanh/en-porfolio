"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Works", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`
          pointer-events-auto flex items-center justify-between px-6 py-2 rounded-full transition-all duration-500 border
          ${
            isScrolled
              ? "bg-white/40 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)] w-full max-w-2xl"
              : "bg-transparent border-transparent w-full max-w-4xl"
          }
        `}
      >
        {/* Logo Section */}
        <Link href="/" className="group relative flex items-center gap-3">
          <div className="relative w-4 h-4 flex items-center justify-center">
            {/* Chấm tròn đặc */}
            <div className="w-2.5 h-2.5 bg-[#BC002D] rounded-full group-hover:scale-0 transition-all duration-500 ease-in-out" />
            <div className="absolute inset-0 w-full h-full border border-[#BC002D] rounded-full scale-0 group-hover:scale-100 transition-all duration-500 ease-in-out" />
          </div>

          <span className="font-serif italic tracking-tighter text-xl text-neutral-900">
            honganh.
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 group overflow-hidden"
              >
                <span
                  className={`
                  relative z-10 text-[10px] uppercase tracking-[0.25em] transition-colors duration-300
                  ${isActive ? "text-[#BC002D] font-bold" : "text-neutral-500 group-hover:text-neutral-900"}
                `}
                >
                  {item.name}
                </span>

                {/* Active/Hover Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/60 rounded-full -z-0 border border-neutral-100 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <span className="absolute bottom-2 left-4 right-4 h-[1px] bg-[#BC002D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
