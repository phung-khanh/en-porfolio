"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Videos", href: "/videos" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, settings } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        isScrolled ? "backdrop-blur-xl shadow-md" : "backdrop-blur-sm"
      }`}
      style={{
        background: isScrolled
          ? "linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.05))"
          : "rgba(255,255,255,0.05)",
        borderColor: `${theme.primary}30`,
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center h-14 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: theme.primary }}
          />
          <span className="font-semibold" style={{ color: theme.text }}>
            {settings.siteTitle}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href
                  ? "font-semibold"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{ color: theme.text }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          style={{ color: theme.text }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <motion.div
          className="md:hidden flex flex-col px-4 pb-4 backdrop-blur-md"
          style={{ backgroundColor: `${theme.header}70` }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="py-2 text-sm opacity-80 hover:opacity-100"
              style={{ color: theme.text }}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
