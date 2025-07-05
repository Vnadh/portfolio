import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true, // IMPORTANT for GitHub Pages
  },
  // Replace 'your-repository-name' with your actual GitHub repository name
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',
};

export default nextConfig;
