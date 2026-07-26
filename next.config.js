/** @type {import('next').NextConfig} */
const nextConfig = {
  // HTTP Compression (Gzip/Brotli) — reduces text payloads by ~70%
  compress: true,

  // Optimized Images — auto WebP/AVIF, lazy loading, 1yr cache
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'i.ibb.co', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'ibb.co', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'img.youtube.com', port: '', pathname: '/**' },
    ],
  },

  // HTTP Cache Headers
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/(favicon.ico|favicon.png|sfavicon.png|manifest.json|icon.png)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=3600' }],
      },
      {
        source: '/(robots.txt|sitemap.xml|sitemap-images.xml|llms.txt|llms-full.txt)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=600' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  allowedDevOrigins: ['192.168.100.10'],

  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
