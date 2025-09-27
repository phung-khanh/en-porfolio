"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const siteTitle = "Portfolio";

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
          <p className="text-sm font-light text-gray-600">
            © {new Date().getFullYear()} {siteTitle}. All rights reserved.
          </p>

          {/* Right */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@honganh.com"
              className="text-sm font-light hover:opacity-60 transition-opacity duration-300 text-gray-900"
            >
              lethihonganh.danang@gmail.com
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light hover:opacity-60 transition-opacity duration-300 text-gray-900"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light hover:opacity-60 transition-opacity duration-300 text-gray-900"
            >
              Instagram
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light hover:opacity-60 transition-opacity duration-300 text-gray-900"
            >
              Dribbble
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
