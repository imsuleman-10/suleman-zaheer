import React, { cache } from 'react';
import { db } from '@/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export const revalidate = 3600; // ISR Revalidation

// ============================================================================
// DATA ACCESS LAYER (DAL)
// Abstracting DB logic makes testing easier and keeps the UI component pure.
// Using React cache() deduplicates requests if called in multiple places (like metadata).
// ============================================================================
const getGalleryImages = cache(async () => {
  try {
    const q = query(collection(db, 'seo_images'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('[GalleryService] Failed to fetch images:', err);
    return []; // Graceful degradation
  }
});

// ============================================================================
// DYNAMIC METADATA GENERATION
// Elite SEO: Generate metadata based on the actual content fetched.
// ============================================================================
export async function generateMetadata() {
  const images = await getGalleryImages();
  const imageCount = images.length;

  return {
    title: `Portfolio Gallery (${imageCount} Projects) | Suleman Zaheer`,
    description: `Explore ${imageCount > 0 ? imageCount + '+' : 'the complete'} portfolio images of Suleman Zaheer — creative work, web designs, UI showcases, and software architectures by a Full Stack Developer from Lahore, Pakistan.`,
    keywords: [
      "Suleman Zaheer Gallery", "Suleman Zaheer Portfolio Images",
      "Web Developer Portfolio Pakistan", "Full Stack Developer Work Showcase",
      "UI Design Portfolio Lahore", "Web Design Projects Pakistan"
    ],
    alternates: {
      canonical: 'https://suleman-zaheer.vercel.app/gallery-seo',
    },
    openGraph: {
      title: `Creative Portfolio Gallery (${imageCount} Projects) | Suleman Zaheer`,
      description: 'Explore the creative work, UI designs, and software architectures by Suleman Zaheer — Full Stack Developer from Lahore, Pakistan.',
      url: 'https://suleman-zaheer.vercel.app/gallery-seo',
      siteName: 'Suleman Zaheer – Official Portfolio',
      images: images[0]?.url ? [{ url: images[0].url, width: 1200, height: 630, alt: 'Suleman Zaheer Portfolio Gallery' }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Portfolio Gallery | Suleman Zaheer`,
      description: 'Creative work, web designs, and software projects by Suleman Zaheer.',
      images: images[0]?.url ? [images[0].url] : [],
      creator: '@imsuleman_10',
    },
  };
}

// ============================================================================
// SCHEMA GENERATOR UTILITY
// ============================================================================
const buildGallerySchema = (images) => ({
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Portfolio Image Gallery - Suleman Zaheer',
  description: 'A showcase of creative work, web designs, and projects by Suleman Zaheer.',
  url: 'https://suleman-zaheer.vercel.app/gallery-seo',
  image: images.map(img => ({
    '@type': 'ImageObject',
    url: img.url,
    name: img.title || 'Portfolio Project',
    description: img.description || 'Web development project snapshot',
    author: {
      '@type': 'Person',
      name: 'Suleman Zaheer'
    }
  }))
});

// ============================================================================
// SERVER COMPONENT (VIEW)
// ============================================================================
export default async function GallerySEO() {
  const images = await getGalleryImages();

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-primary/30">
      
      {/* Dynamic SEO JSON-LD injection */}
      {images.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGallerySchema(images)) }}
        />
      )}

      {/* Professional Header */}
      <header className="relative pt-24 pb-12 px-6 sm:px-12 border-b border-white/5 bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Creative <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A curated collection of digital experiences, software architectures, and creative web designs engineered by Suleman Zaheer.
          </p>
        </div>
      </header>

      {/* Gallery Content */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        {images.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
            <h2 className="text-2xl font-bold text-gray-300 mb-2">Gallery is empty</h2>
            <p className="text-gray-500">Currently indexing new projects. Check back soon.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {images.map((img, index) => {
              // LCP Optimization: Above-the-fold images get priority fetching
              const isAboveTheFold = index < 4; 
              
              return (
                <figure
                  key={img.id}
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 hover:border-primary/50 transition-all duration-500"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.title || 'Portfolio Image'}
                    title={img.title}
                    className="w-full h-auto object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    // Elite LCP Trick: Eager load top images, lazy load the rest
                    loading={isAboveTheFold ? "eager" : "lazy"}
                    fetchPriority={isAboveTheFold ? "high" : "auto"}
                    decoding="async"
                  />

                  <figcaption className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h2 className="text-lg font-bold text-white mb-2 leading-tight">
                      {img.title}
                    </h2>
                    <p className="text-sm text-gray-300 line-clamp-3">
                      {img.description}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
