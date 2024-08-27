/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://127.0.0.1:3000",
    RAZORPAY_KEY: process.env.RAZORPAY_KEY
  },

  images: {
    domains: [
      'images.unsplash.com',
      's3.amazonaws.com',
      'c.amazon-adsystem.com',
      'i.ytimg.com',
      '127.0.0.1'
    ],
  },

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    });
    return config;
  },

};
