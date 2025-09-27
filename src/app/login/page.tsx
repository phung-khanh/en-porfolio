/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useAuth } from "@/shared/lib/auth-context";
import { useTheme } from "@/shared/lib/theme-context";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = await login(username, password);

    if (success) {
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Clean minimalist card */}
        <div className="border border-gray-200 bg-white p-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-16 h-16 border border-gray-200 mx-auto mb-6 flex items-center justify-center">
              <Lock className="w-8 h-8" style={{ color: theme.text }} />
            </div>
            <h1
              className="text-3xl font-light tracking-wide mb-2"
              style={{ color: theme.text }}
            >
              Admin Login
            </h1>
            <p
              className="text-sm font-light"
              style={{ color: theme.secondary }}
            >
              Access your portfolio dashboard
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <label
                className="block text-sm font-medium tracking-wide uppercase mb-3"
                style={{ color: theme.text }}
              >
                Username or Email
              </label>
              <div className="relative">
                <User
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: theme.secondary }}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-8 pr-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors duration-300 bg-transparent"
                  style={{ color: theme.text }}
                  placeholder="Enter your username or email"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <label
                className="block text-sm font-medium tracking-wide uppercase mb-3"
                style={{ color: theme.text }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: theme.secondary }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-8 pr-12 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors duration-300 bg-transparent"
                  style={{ color: theme.text }}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:opacity-60 transition-opacity duration-300"
                  style={{ color: theme.secondary }}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 border border-red-200 bg-red-50 text-red-800 text-sm font-light"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-4 border border-black text-black font-medium tracking-wide uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a
              href="/"
              className="text-sm font-light tracking-wide uppercase hover:opacity-60 transition-opacity duration-300"
              style={{ color: theme.text }}
            >
              ← Back to Portfolio
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
