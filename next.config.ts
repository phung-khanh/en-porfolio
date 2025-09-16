import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "localhost",
    ].filter(Boolean) as string[],
  },
};

export default nextConfig;
