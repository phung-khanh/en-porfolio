"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-8xl mb-6 opacity-50 text-gray-800">404</div>

          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Page Not Found
          </h1>

          <p className="text-lg opacity-80 mb-8 text-gray-700">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 bg-gray-800"
              >
                <Home size={20} />
                <span>Go Home</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 border-2 text-gray-800 border-gray-800"
                style={{ backgroundColor: "transparent" }}
              >
                <ArrowLeft size={20} />
                <span>Go Back</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
