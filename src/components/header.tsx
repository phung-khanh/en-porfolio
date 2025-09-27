"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Works", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  // Static site title since we're removing theme context
  const siteTitle = "Hong Anh";

  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMounted && isScrolled
          ? "bg-white/90 backdrop-blur-sm border-b border-gray-200"
          : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center h-16 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-lg font-light tracking-wide text-gray-900">
            {siteTitle}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium tracking-wide uppercase transition-opacity duration-300 text-gray-900 ${
                pathname === item.href
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-900"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <motion.div
          className="md:hidden flex flex-col px-6 py-4 bg-white border-b border-gray-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="py-3 text-sm font-medium tracking-wide uppercase opacity-60 hover:opacity-100 transition-opacity duration-300 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
