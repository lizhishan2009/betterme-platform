/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.notion.so', 'images.unsplash.com'],
  },
  env: {
    NOTION_PAGE_ID: process.env.NOTION_PAGE_ID || '2f28cf1fb6ec80a7a49bc7fbab717565',
    NOTION_TOKEN: process.env.NOTION_TOKEN,
  },
};

module.exports = nextConfig;
