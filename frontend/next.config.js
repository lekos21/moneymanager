/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Only use output: 'export' in production
  ...(isProd && { output: 'export' }),
  
  // Conditional environment variables based on environment
  env: {
    API_URL: isProd 
      ? 'https://moneymanager-backend-qwbwl7ldoa-oa.a.run.app' 
      : 'http://localhost:8000',
    NEXT_PUBLIC_API_URL: isProd 
      ? 'https://moneymanager-backend-qwbwl7ldoa-oa.a.run.app' 
      : 'http://localhost:8000',
  },
  
  // Add trailingSlash and cleanUrls for better routing with export
  trailingSlash: isProd,
  cleanUrls: isProd,
  
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true,
  },
}
