"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { motion } from "framer-motion";

export default function Footer() {
  const { theme, settings } = useTheme();

  return (
    <motion.footer
      className="border-t border-gray-200 py-12 bg-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <p className="text-sm font-light" style={{ color: theme.secondary }}>
            © {new Date().getFullYear()} {settings.siteTitle}. All rights
            reserved.
          </p>

          {/* Right */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@honganh.com"
              className="text-sm font-light hover:opacity-60 transition-opacity duration-300"
              style={{ color: theme.text }}
            >
              hello@honganh.com
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light hover:opacity-60 transition-opacity duration-300"
              style={{ color: theme.text }}
            >
              Instagram
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light hover:opacity-60 transition-opacity duration-300"
              style={{ color: theme.text }}
            >
              Dribbble
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
