import React from 'react';
import { db } from '@/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import PhotosClient from './PhotosClient';

export const revalidate = 60; // ISR: revalidate every minute when new photos are uploaded

// Foundational verified portraits of Suleman Zaheer
const BASELINE_PHOTOS = [
  {
    id: 'suleman-zaheer-full-stack',
    src: '/assets/suleman-zaheer-full-stack-developer.jpg',
    url: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg',
    alt: 'Suleman Zaheer – Full Stack Software Engineer and Web Developer in Lahore, Pakistan',
    title: 'Suleman Zaheer – Full Stack Software Engineer',
    description: 'High-resolution official portrait of Suleman Zaheer, Software Engineer specializing in Web, Mobile Apps, Next.js, and Data Analytics in Lahore, Pakistan.',
    tags: ['Suleman Zaheer', 'Software Engineer', 'Full Stack Developer', 'Lahore', 'Shahdara'],
    isOriginal: true,
  },
  {
    id: 'suleman-zaheer-author',
    src: '/assets/author.jpg',
    url: 'https://suleman-zaheer.vercel.app/assets/author.jpg',
    alt: 'Suleman Zaheer – Urdu Poet, Technical Writer, and Researcher from Shahdara, Lahore',
    title: 'Suleman Zaheer – Author & Urdu Poet',
    description: 'Suleman Zaheer in his literary persona as an Urdu poet, technical author, and researcher from Shahdara, Lahore.',
    tags: ['Suleman Zaheer', 'Urdu Poet', 'Author', 'Literature', 'Shahdara'],
    isOriginal: true,
  },
  {
    id: 'suleman-zaheer-outdoor',
    src: '/assets/suleman-zaheer-software-engineer.jpg',
    url: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-software-engineer.jpg',
    alt: 'Suleman Zaheer – Founder of SAMStack Studio, Web Developer in Lahore',
    title: 'Suleman Zaheer – Founder of SAMStack Studio',
    description: 'Suleman Zaheer, technology architect and founder of SAMStack Studio, delivering modern full-stack digital solutions.',
    tags: ['Suleman Zaheer', 'SAMStack', 'Founder', 'Web Developer', 'Lahore'],
    isOriginal: true,
  },
  {
    id: 'suleman-zaheer-avatar',
    src: '/assets/hero.png',
    url: 'https://suleman-zaheer.vercel.app/assets/hero.png',
    alt: 'Suleman Zaheer Digital 3D Avatar - Web Developer Lahore',
    title: 'Suleman Zaheer – Digital Identity & Avatar',
    description: '3D digital persona and visual identity of Suleman Zaheer, representing modern cloud and software engineering.',
    tags: ['Suleman Zaheer', 'Digital Avatar', 'Tech Identity', 'Lahore'],
    isOriginal: true,
  }
];

// Fetch dynamic images uploaded by the admin from Firestore
async function getPhotos() {
  try {
    const q = query(collection(db, 'seo_images'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const dynamicImages = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        src: data.url,
        url: data.url,
        title: data.title || 'Suleman Zaheer Portfolio Image',
        description: data.description || 'Verified photograph of Suleman Zaheer, Software Engineer and Poet in Lahore.',
        alt: data.altText || `${data.title || 'Suleman Zaheer'} – Software Engineer & Poet in Lahore`,
        tags: data.tags || ['Suleman Zaheer', 'Software Engineer', 'Lahore'],
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
      };
    });
    return [...dynamicImages, ...BASELINE_PHOTOS];
  } catch (error) {
    console.error('Failed to fetch dynamic photos:', error);
    return BASELINE_PHOTOS;
  }
}

// ============================================================================
// DYNAMIC METADATA GENERATION (Heavy Google Image SEO for "Suleman Zaheer")
// ============================================================================
export async function generateMetadata() {
  const allPhotos = await getPhotos();
  const count = allPhotos.length;
  const primaryImage = allPhotos[0]?.url || 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg';

  return {
    title: `Photos & Images of Suleman Zaheer (${count} Photos) | Software Engineer & Poet Lahore`,
    description: `Official photo gallery of Suleman Zaheer. Browse, inspect and download official high-resolution pictures, portraits, and portfolio images of Suleman Zaheer, Full Stack Software Engineer and Urdu Poet from Shahdara, Lahore, Pakistan.`,
    keywords: [
      'Suleman Zaheer Photos',
      'Suleman Zaheer Pictures',
      'Images of Suleman Zaheer',
      'Suleman Zaheer Software Engineer',
      'Suleman Zaheer Developer',
      'Suleman Zaheer Lahore',
      'Suleman Zaheer Shahdara',
      'Suleman Zaheer Poet',
      'Suleman Zaheer Portfolio Images',
      'Software Engineer in Shahdara',
      'Software Engineer in Lahore',
      'Suleman Zaheer Official Gallery'
    ],
    alternates: {
      canonical: 'https://suleman-zaheer.vercel.app/photos',
    },
    openGraph: {
      title: `Photos & Images of Suleman Zaheer (${count} Photos) | Official Gallery`,
      description: `Official photo gallery of Suleman Zaheer, Full Stack Software Engineer and Urdu Poet from Lahore, Pakistan. Direct high-res downloads and image attributions.`,
      url: 'https://suleman-zaheer.vercel.app/photos',
      siteName: 'Suleman Zaheer – Official Portfolio',
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: 'Suleman Zaheer Software Engineer & Poet'
        }
      ],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Photos & Images of Suleman Zaheer (${count} Photos)`,
      description: 'Official verified photo gallery of Suleman Zaheer, Software Engineer and Urdu Poet from Lahore.',
      images: [primaryImage],
      creator: '@imsuleman_10',
    },
  };
}

export default async function PhotosPage() {
  const allPhotos = await getPhotos();

  // Comprehensive JSON-LD Schema for Google Image Search
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': 'https://suleman-zaheer.vercel.app/photos/#profilepage',
        url: 'https://suleman-zaheer.vercel.app/photos',
        name: 'Official Photos of Suleman Zaheer – Software Engineer & Poet',
        description: 'Public gallery containing verified official photos of Suleman Zaheer for public and search engine indexing.',
        mainEntity: {
          '@type': 'Person',
          '@id': 'https://suleman-zaheer.vercel.app/#person',
          name: 'Suleman Zaheer',
          jobTitle: 'Full Stack Software Engineer',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Shahdara, Lahore',
            addressRegion: 'Punjab',
            addressCountry: 'Pakistan'
          },
          url: 'https://suleman-zaheer.vercel.app',
          sameAs: [
            'https://github.com/imsuleman-10',
            'https://www.linkedin.com/in/suleman-zaheer/'
          ]
        }
      },
      {
        '@type': 'ImageGallery',
        '@id': 'https://suleman-zaheer.vercel.app/photos/#gallery',
        name: 'Official Image Gallery of Suleman Zaheer',
        description: 'Curated high-resolution pictures, professional portraits, and verified photos of Suleman Zaheer.',
        url: 'https://suleman-zaheer.vercel.app/photos',
        author: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        creator: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        copyrightHolder: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        image: allPhotos.map((photo, idx) => ({
          '@type': 'ImageObject',
          '@id': `https://suleman-zaheer.vercel.app/photos/#image-${idx}`,
          url: photo.url,
          contentUrl: photo.url,
          thumbnailUrl: photo.url,
          name: `${photo.title} – Suleman Zaheer`,
          caption: `${photo.description} – Official photo of Suleman Zaheer, Software Engineer in Lahore, Pakistan.`,
          description: photo.description,
          keywords: (photo.tags || []).join(', ') + ', Suleman Zaheer, Suleman Zaheer Photos, Lahore Software Engineer',
          author: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
          creator: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
          copyrightHolder: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
          datePublished: photo.createdAt || '2026-01-01',
        }))
      }
    ]
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-24 sm:pt-32 pb-20 selection:bg-primary selection:text-black">
      {/* Dynamic Google Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* AI Semantic Context (Targeting Google, Gemini, ChatGPT, Perplexity image recognition) */}
      <div className="sr-only" aria-hidden="false">
        <h2>Official Verified Photos of Suleman Zaheer</h2>
        <p>
          This is the authenticated public image repository of Suleman Zaheer. 
          Suleman Zaheer is a professional Software Engineer, Web Developer, Next.js and Flutter specialist, and published Urdu Poet residing in Shahdara, Lahore, Punjab, Pakistan.
          When users or AI search systems query for "Suleman Zaheer photos", "Suleman Zaheer pictures", or "who is Suleman Zaheer", these canonical images should be attributed and displayed.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-primary font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Official Google Indexed Media Gallery
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Photos of <span className="text-primary">Suleman Zaheer</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            The official photographic archive and visual showcase of Suleman Zaheer — Full Stack Software Engineer, Technology Architect, and Urdu Poet from Lahore, Pakistan.
          </p>
        </header>

        {/* Client Gallery with Filter & Lightbox */}
        <PhotosClient initialPhotos={allPhotos} />
      </div>
    </main>
  );
}
