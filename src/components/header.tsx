"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Palette, X } from "lucide-react";
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      style={{
        backgroundColor: isScrolled ? `${theme.header}90` : "transparent",
        borderBottom: isScrolled ? `1px solid ${theme.primary}20` : "none",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: theme.primary }}
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            />
            <span
              className="text-xl font-bold font-display"
              style={{ color: theme.text }}
            >
              {settings.siteTitle}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-opacity-100"
                    : "text-opacity-70 hover:text-opacity-100"
                }`}
                style={{ color: theme.text }}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: theme.primary }}
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Admin Link */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-opacity-10"
              style={{
                color: theme.primary,
                backgroundColor: `${theme.primary}10`,
              }}
            >
              <Palette size={16} />
              <span className="text-sm font-medium">Admin</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md transition-colors duration-200"
              style={{ color: theme.text }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="px-2 pt-2 pb-3 space-y-1 shadow-lg"
              style={{ backgroundColor: theme.header }}
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-opacity-100"
                      : "text-opacity-70 hover:text-opacity-100"
                  }`}
                  style={{ color: theme.text }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/admin"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                style={{ color: theme.primary }}
                onClick={() => setIsOpen(false)}
              >
                <Palette size={16} />
                <span>Admin</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
