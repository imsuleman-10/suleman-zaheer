/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ NO 'output: export' — Vercel runs Next.js natively with full SSR/ISR support.
  // Removing this enables: Server Components, generateMetadata, ISR revalidation,
  // and Vercel Image Optimization — all critical for perfect SEO.
  images: {
    // ✅ Vercel Image Optimization is now active (no unoptimized: true)
    // This auto-serves WebP/AVIF, lazy loading, and correct sizes.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
