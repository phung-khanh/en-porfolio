"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const { theme, settings } = useTheme();

  return (
    <motion.footer
      className="backdrop-blur-xl border-t py-6"
      style={{
        background:
          "linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
        borderColor: `${theme.primary}30`,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        {/* Left */}
        <p className="text-sm opacity-80" style={{ color: theme.text }}>
          © {new Date().getFullYear()} {settings.siteTitle}. All rights
          reserved.
        </p>

        {/* Right */}
        <div
          className="flex items-center gap-1 text-sm opacity-80"
          style={{ color: theme.text }}
        >
          Made with
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <Heart
              size={14}
              style={{ color: theme.accent }}
              fill="currentColor"
            />
          </motion.div>
          by Noel
        </div>
      </div>
    </motion.footer>
  );
}
