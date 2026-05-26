import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import PoemPostClient from './PoemPostClient';
import { cache } from 'react';
import { STATIC_POEMS } from '../page';

// ─────────────────────────────────────────────────────────────────────────────
// Build a static lookup map from the shared STATIC_POEMS array
// ─────────────────────────────────────────────────────────────────────────────
const STATIC_POEMS_MAP = Object.fromEntries(STATIC_POEMS.map(p => [p.slug, p]));
const KNOWN_SLUGS = STATIC_POEMS.map(p => p.slug);

// ─────────────────────────────────────────────────────────────────────────────
// Memoized server-side data fetching — Firestore first, static fallback second
// ─────────────────────────────────────────────────────────────────────────────
const getPoem = cache(async (slug) => {
  if (!slug || slug === '_placeholder') return null;

  try {
    const decodedSlug = decodeURIComponent(slug);
    const q = query(collection(db, 'poems'), where('slug', '==', decodedSlug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const data = snapshot.docs[0].data();
      return {
        id: snapshot.docs[0].id,
        ...data,
        publishedAt: data.publishedAt?.toDate
          ? data.publishedAt.toDate().toISOString()
          : data.publishedAt || null,
        updatedAt: data.updatedAt?.toDate
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt || null,
      };
    }
  } catch {
    // Firestore unavailable during build — fall through to static data
  }

  // Fallback to hardcoded static poem data
  const decodedSlug = decodeURIComponent(slug);
  return STATIC_POEMS_MAP[decodedSlug] || null;
});

// ─────────────────────────────────────────────────────────────────────────────
// generateStaticParams — hardcoded slugs ensure build NEVER fails
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  try {
    const snapshot = await getDocs(collection(db, 'poems'));
    const firestoreSlugs = snapshot.docs
      .map((doc) => doc.data().slug)
      .filter(Boolean);
    const allSlugs = [...new Set([...KNOWN_SLUGS, ...firestoreSlugs])];
    return allSlugs.map((slug) => ({ slug }));
  } catch {
    return KNOWN_SLUGS.map((slug) => ({ slug }));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic Metadata per poem
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const poem = await getPoem(slug);

  if (!poem) return { title: 'Kalam Not Found | Suleman Zaheer' };

  const keywords = [];
  if (poem.romanKeywords) keywords.push(...poem.romanKeywords.split(',').map(k => k.trim()));
  if (poem.tags) keywords.push(...poem.tags);
  if (poem.theme) keywords.push(poem.theme);
  keywords.push('Poetry', 'Ghazal', 'Urdu Poetry', 'Suleman Zaheer', 'سلیمان ظہیر');

  const desc = poem.content
    ? poem.content.substring(0, 160).replace(/\n/g, ' ') + '...'
    : 'Read this beautiful piece of poetry by Suleman Zaheer.';

  const title = `${poem.title} | Poetry by Suleman Zaheer`;

  return {
    title,
    description: desc,
    keywords: keywords.join(', '),
    alternates: { canonical: `https://suleman-zaheer.vercel.app/poetry/${poem.slug}` },
    openGraph: {
      title,
      description: desc,
      type: 'article',
      publishedTime: poem.publishedAt || new Date().toISOString(),
      authors: ['Suleman Zaheer'],
      images: [
        {
          url: 'https://suleman-zaheer.vercel.app/assets/author.jpg',
          width: 1200,
          height: 1200,
          alt: 'Suleman Zaheer - Poet & Author',
        },
        {
          url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80',
          width: 1200,
          height: 630,
          alt: poem.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      image: 'https://suleman-zaheer.vercel.app/assets/author.jpg',
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────
export default async function Page({ params }) {
  const { slug } = await params;
  const poem = await getPoem(slug);

  if (!poem) {
    return <PoemPostClient initialPoem={null} />;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    additionalType: 'Poem',
    headline: poem.title,
    text: poem.content,
    inLanguage: poem.language === 'Urdu' ? 'ur' : 'en',
    genre: poem.type,
    keywords: poem.romanKeywords || (poem.tags ? poem.tags.join(', ') : ''),
    datePublished: poem.publishedAt || new Date().toISOString(),
    dateModified: poem.updatedAt || poem.publishedAt || new Date().toISOString(),
    image: {
      '@type': 'ImageObject',
      url: 'https://suleman-zaheer.vercel.app/assets/author.jpg',
      width: 1200,
      height: 1200,
      alt: 'Suleman Zaheer - Poet & Author',
    },
    author: {
      '@type': 'Person',
      name: 'Suleman Zaheer',
      url: 'https://suleman-zaheer.vercel.app',
      image: 'https://suleman-zaheer.vercel.app/assets/author.jpg',
      sameAs: [
        'https://github.com/imsuleman-10',
        'https://www.linkedin.com/in/suleman-zaheer-mughal',
      ],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://suleman-zaheer.vercel.app/poetry/${poem.slug}`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://suleman-zaheer.vercel.app',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Poetry',
          item: 'https://suleman-zaheer.vercel.app/poetry',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: poem.title,
          item: `https://suleman-zaheer.vercel.app/poetry/${poem.slug}`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PoemPostClient initialPoem={poem} />
    </>
  );
}
