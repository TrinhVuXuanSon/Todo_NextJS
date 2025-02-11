/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "219087aacfe08b3b800f3501e6d7c3b7",
    NEXT_PUBLIC_AUTH_USERNAME: "admin",
    NEXT_PUBLIC_AUTH_PASSWORD: "admin123",
  },
};

module.exports = nextConfig;
