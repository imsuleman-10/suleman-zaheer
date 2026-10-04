import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/firebase';
import PoetryClient from './PoetryClient';
import { STATIC_POEMS } from '@/data/staticPoems';

// Re-export so any legacy imports continue to work
export { STATIC_POEMS };

export const metadata = {
  title: 'Urdu Poetry & Literature by Suleman Zaheer (سلیمان ظہیر) | Ghazals, Nazms & English Poems',
  description: 'Explore the literary works of Suleman Zaheer – where machine logic meets human emotion. A curated collection of deep Urdu Ghazals, Nazms, and English poetry. Suleman Zaheer is a software engineer, data analyst, and published poet from Lahore, Pakistan.',
  keywords: [
    'Suleman Zaheer Poetry', 'Suleman Zaheer Poet', 'سلیمان ظہیر شاعری',
    'Urdu Ghazals Online', 'Pakistani Poet Lahore', 'Modern Urdu Poetry 2025',
    'Suleman Zaheer Urdu Shayari', 'English Poems Pakistani Poet',
    'Urdu Nazms Collection', 'Suleman Zaheer Writer', 'Poet Software Engineer Pakistan',
    'Urdu Shayari Lahore', 'سلیمان ظہیر'
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/poetry' },
  openGraph: {
    title: 'Urdu Poetry & Ghazals by Suleman Zaheer | سلیمان ظہیر شاعری',
    description: 'A curated sanctuary of deep and soulful Urdu Ghazals, Nazms, and English poems by Suleman Zaheer – software engineer and poet from Lahore, Pakistan.',
    url: 'https://suleman-zaheer.vercel.app/poetry',
    siteName: 'Suleman Zaheer Portfolio',
    type: 'website',
    locale: 'en_PK',
    images: [
      {
        url: 'https://suleman-zaheer.vercel.app/assets/author.jpg',
        width: 1200,
        height: 1200,
        alt: 'Suleman Zaheer - Urdu Poet and Writer from Lahore, Pakistan',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urdu Poetry by Suleman Zaheer | سلیمان ظہیر',
    description: 'Deep Urdu Ghazals, Nazms, and English poems by Suleman Zaheer – poet and software engineer from Lahore.',
    images: ['https://suleman-zaheer.vercel.app/assets/author.jpg'],
    creator: '@imsuleman_10',
    site: '@imsuleman_10',
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

  const schemaArray = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://suleman-zaheer.vercel.app/poetry#collectionpage',
      name: 'Urdu Poetry & Literature Collection by Suleman Zaheer',
      description: 'A premium curated collection of Urdu Ghazals, Nazms, and English poems by Suleman Zaheer - software engineer and poet from Lahore, Pakistan.',
      url: 'https://suleman-zaheer.vercel.app/poetry',
      inLanguage: ['ur', 'en'],
      author: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        alternateName: 'سلیمان ظہیر',
        url: 'https://suleman-zaheer.vercel.app',
        image: 'https://suleman-zaheer.vercel.app/assets/author.jpg',
        sameAs: ['https://github.com/imsuleman-10', 'https://www.linkedin.com/in/suleman-zaheer-mughal', 'https://x.com/imsuleman_10'],
      },
      hasPart: poems.map((poem) => ({
        '@type': 'CreativeWork',
        additionalType: 'Poem',
        headline: poem.title,
        genre: poem.type,
        inLanguage: poem.language === 'Urdu' ? 'ur' : 'en',
        keywords: poem.romanKeywords || '',
        author: { '@type': 'Person', '@id': 'https://suleman-zaheer.vercel.app/#person', name: 'Suleman Zaheer' },
        url: `https://suleman-zaheer.vercel.app/poetry/${poem.slug}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Poetry', item: 'https://suleman-zaheer.vercel.app/poetry' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is the author of these Urdu poems and ghazals?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer (سلیمان ظہیر) is the author of all Urdu Ghazals, Nazms, and English poetry featured on this platform. He is a software engineer, data analyst, and published poet from Lahore, Pakistan.'
          }
        },
        {
          '@type': 'Question',
          name: 'What kind of poetry does Suleman Zaheer write?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer writes classical and modern Urdu Ghazals, deep Urdu Nazms, and philosophical English poetry. His work uniquely blends the precision of technical logic with profound human emotions, creating a distinctive voice in contemporary Urdu literature.'
          }
        },
        {
          '@type': 'Question',
          name: 'In what languages does Suleman Zaheer write poetry?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer primarily writes poetry in Urdu (اردو) in classical forms such as Ghazal and Nazm, as well as in English. His Urdu poetry resonates deeply with Pakistani literary tradition while incorporating modern themes of technology and human consciousness.'
          }
        }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArray) }}
      />

      <PoetryClient initialPoems={poems} />
    </>
  );
}
