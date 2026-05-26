import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';
import AuthorPageClient from './AuthorPageClient';

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata = {
  title: 'About the Author & Researcher | Suleman Zaheer — Writer, Blogger & Academic',
  description:
    'Meet Suleman Zaheer — a multifaceted writer, Urdu/English poet, researcher, and full-stack developer from Lahore, Pakistan. Explore his literary journey, research insights, and creative vision.',
  keywords:
    'Suleman Zaheer, Author, Researcher, Blogger, Urdu Poet, English Poet, Writer Pakistan, Academic Research, Literature, Creative Writing, Lahore Pakistan',
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/author' },
  openGraph: {
    title: 'About the Author & Researcher | Suleman Zaheer',
    description:
      'Poet, blogger, researcher, and full-stack developer. A creative mind bridging technology and literature.',
    url: 'https://suleman-zaheer.vercel.app/author',
    siteName: 'Suleman Zaheer',
    type: 'profile',
    images: [
      {
        url: 'https://suleman-zaheer.vercel.app/assets/author.jpg',
        width: 1200,
        height: 1200,
        alt: 'Suleman Zaheer — Author, Poet & Researcher from Lahore, Pakistan',
      },
      {
        url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Suleman Zaheer — Author, Poet & Researcher',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About the Author & Researcher | Suleman Zaheer',
    description: 'Poet, blogger, researcher, and full-stack developer from Lahore, Pakistan.',
    image: 'https://suleman-zaheer.vercel.app/assets/author.jpg',
  },
};

// ─── Server-side data fetching ─────────────────────────────────────────────────
async function getAuthorData() {
  try {
    // Get featured poems for the author profile
    const poemsQ = query(
      collection(db, 'poems'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc')
    );
    const poemsSnap = await getDocs(poemsQ);
    const poems = poemsSnap.docs.map(d => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title,
        slug: data.slug,
        type: data.type,
        language: data.language,
        theme: data.theme,
        coverImage: data.coverImage || null,
        publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : (data.publishedAt || null),
      };
    });

    // Get blog count
    const blogsSnap = await getDocs(collection(db, 'blogs'));
    const blogCount = blogsSnap.size;

    return { poems, blogCount };
  } catch (error) {
    console.error('Author page data fetch error:', error.message);
    return { poems: [], blogCount: 0 };
  }
}

// ─── JSON-LD Schema ────────────────────────────────────────────────────────────
function buildJsonLd(poems, blogCount) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Suleman Zaheer',
    url: 'https://suleman-zaheer.vercel.app',
    image: 'https://suleman-zaheer.vercel.app/assets/author.jpg',
    sameAs: [
      'https://github.com/imsuleman-10',
      'https://www.linkedin.com/in/suleman-zaheer-mughal',
    ],
    jobTitle: 'Full Stack Developer, Author & Researcher',
    description:
      'Suleman Zaheer is a full-stack developer, Urdu/English poet, blogger, and researcher from Lahore, Pakistan. Currently pursuing BS Computer Science at UET Lahore.',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Engineering and Technology (UET) Lahore',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'PK',
    },
    knowsAbout: [
      'Web Development', 'MERN Stack', 'Next.js', 'Poetry', 'Urdu Literature',
      'Research Writing', 'Blogging', 'Software Engineering',
    ],
    numberOfItems: blogCount,
    workExample: poems.slice(0, 5).map(p => ({
      '@type': 'CreativeWork',
      additionalType: 'Poem',
      name: p.title,
      genre: p.type,
      inLanguage: p.language === 'Urdu' ? 'ur' : 'en',
      url: `https://suleman-zaheer.vercel.app/poetry/${p.slug}`,
    })),
  };
}

export default async function AuthorPage() {
  const { poems, blogCount } = await getAuthorData();
  const jsonLd = buildJsonLd(poems, blogCount);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AuthorPageClient poems={poems} blogCount={blogCount} />
    </>
  );
}
