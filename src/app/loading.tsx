"use client";

import { useTheme } from "@/shared/lib/theme-context";
import { motion } from "framer-motion";

export default function Loading() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 rounded-full mx-auto mb-4"
          style={{ backgroundColor: theme.primary }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.p
          className="text-lg font-medium"
          style={{ color: theme.text }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
