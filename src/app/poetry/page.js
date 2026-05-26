import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/firebase';
import PoetryClient from './PoetryClient';
import { STATIC_POEMS } from '@/data/staticPoems';

// Re-export so any legacy imports continue to work
export { STATIC_POEMS };

export const metadata = {
  title: 'Poetry & Ghazals | Suleman Zaheer — Words of the Soul',
  description:
    'Explore a curated sanctuary of deep Urdu Ghazals, Nazms, and English poems by Suleman Zaheer. An immersive journey where silence meets expression.',
  keywords:
    'Poetry, Ghazals, Nazms, Urdu Poetry, English Poetry, Suleman Zaheer, Writer, Pakistani Poet, Urdu Shayari, اردو شاعری',
  alternates: { canonical: 'https://suleman-zaheer.web.app/poetry' },
  openGraph: {
    title: 'Poetry & Ghazals | Suleman Zaheer',
    description:
      'A curated sanctuary of deep and soulful Urdu Ghazals, Nazms, and English poems. Words that feel.',
    url: 'https://suleman-zaheer.web.app/poetry',
    siteName: 'Suleman Zaheer Portfolio',
    type: 'website',
    images: [
      {
        url: 'https://suleman-zaheer.web.app/assets/author.jpg',
        width: 1200,
        height: 1200,
        alt: 'Suleman Zaheer - Poet & Writer from Lahore',
      },
      {
        url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Poetry Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poetry & Ghazals | Suleman Zaheer',
    description: 'A curated sanctuary of deep Urdu Ghazals, Nazms, and English poems.',
    image: 'https://suleman-zaheer.web.app/assets/author.jpg',
  },
};

async function getPoems() {
  try {
    const q = query(
      collection(db, 'poems'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc')
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) return STATIC_POEMS;

    const firestorePoems = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug,
        title: data.title,
        type: data.type,
        language: data.language,
        theme: data.theme || null,
        content: data.content || null,
        coverImage: data.coverImage || null,
        tags: data.tags || [],
        romanKeywords: data.romanKeywords || '',
        featured: data.featured || false,
        views: data.views || 0,
        published: data.published || false,
        publishedAt: data.publishedAt?.toDate
          ? data.publishedAt.toDate().toISOString()
          : data.publishedAt || null,
        updatedAt: data.updatedAt?.toDate
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt || null,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : data.createdAt || null,
      };
    });

    // Merge: Firestore takes priority over static for same slug
    const firestoreSlugs = new Set(firestorePoems.map((p) => p.slug));
    const staticFallbacks = STATIC_POEMS.filter((p) => !firestoreSlugs.has(p.slug));
    return [...firestorePoems, ...staticFallbacks];
  } catch (error) {
    console.error('Firestore unreachable — serving static poetry content:', error.message);
    return STATIC_POEMS;
  }
}

export default async function PoetryPage() {
  const poems = await getPoems();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Poetry Collection — Suleman Zaheer',
    description:
      'A premium collection of Urdu Ghazals, Nazms, and English poems by Suleman Zaheer. Immersive, deep, and soulful.',
    url: 'https://suleman-zaheer.web.app/poetry',
    author: {
      '@type': 'Person',
      name: 'Suleman Zaheer',
      url: 'https://suleman-zaheer.web.app',
      image: 'https://suleman-zaheer.web.app/assets/author.jpg',
      sameAs: ['https://github.com/imsuleman-10', 'https://www.linkedin.com/in/suleman-zaheer-mughal'],
    },
    hasPart: poems.map((poem) => ({
      '@type': 'CreativeWork',
      additionalType: 'Poem',
      headline: poem.title,
      genre: poem.type,
      inLanguage: poem.language === 'Urdu' ? 'ur' : 'en',
      keywords: poem.romanKeywords || '',
      author: { 
        '@type': 'Person', 
        name: 'Suleman Zaheer',
        image: 'https://suleman-zaheer.web.app/assets/author.jpg',
      },
      url: `https://suleman-zaheer.web.app/poetry/${poem.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PoetryClient initialPoems={poems} />
    </>
  );
}
