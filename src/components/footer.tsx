"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { motion } from "framer-motion";
import { Dribbble, Heart, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const { theme, settings } = useTheme();

  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: settings.socialLinks.instagram },
    { name: "Dribbble", icon: Dribbble, url: settings.socialLinks.dribbble },
    { name: "LinkedIn", icon: Linkedin, url: settings.socialLinks.linkedin },
  ].filter((link) => link.url);

  return (
    <footer className="py-12 mt-20" style={{ backgroundColor: theme.footer }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: theme.primary }}
              />
              <span
                className="text-xl font-bold font-display"
                style={{ color: theme.text }}
              >
                {settings.siteTitle}
              </span>
            </motion.div>
            <p
              className="text-sm opacity-80 max-w-md"
              style={{ color: theme.text }}
            >
              {settings.siteDescription}
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: theme.text }}>
              Follow Me
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full transition-colors duration-200 hover:scale-110"
                    style={{
                      backgroundColor: `${theme.primary}20`,
                      color: theme.primary,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-8 pt-8 border-t border-opacity-20"
          style={{ borderColor: theme.text }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm opacity-80" style={{ color: theme.text }}>
              © 2025 {settings.siteTitle}. All rights reserved.
            </p>
            <div className="flex items-center space-x-1">
              <span
                className="text-sm opacity-80"
                style={{ color: theme.text }}
              >
                Made with
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart
                  size={16}
                  style={{ color: theme.accent }}
                  fill="currentColor"
                />
              </motion.div>
              <span
                className="text-sm opacity-80"
                style={{ color: theme.text }}
              >
                by Noel
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
