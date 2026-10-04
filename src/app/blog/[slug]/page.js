import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import BlogPostClient from './BlogPostClient';
import { cache } from 'react';
import { STATIC_BLOGS as STATIC_BLOGS_ARRAY } from '@/data/staticBlogs';

// ─────────────────────────────────────────────────────────────────────────────
// Convert static blogs array → slug-keyed object for O(1) lookup
// Firestore data ALWAYS takes priority over these when available.
// ─────────────────────────────────────────────────────────────────────────────
const STATIC_BLOGS = Object.fromEntries(
  STATIC_BLOGS_ARRAY.map((blog) => [blog.slug, blog])
);



// ─────────────────────────────────────────────────────────────────────────────
// Memoized server-side data fetching — Firestore first, static fallback second
// ─────────────────────────────────────────────────────────────────────────────
const getBlog = cache(async (slug) => {
  if (!slug) return null;

  try {
    const decodedSlug = decodeURIComponent(slug);
    const q = query(collection(db, 'blogs'), where('slug', '==', decodedSlug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const data = snapshot.docs[0].data();
      const slug = data.slug || decodedSlug;
      const staticMatch = STATIC_BLOGS[slug] || {};

      return {
        id: snapshot.docs[0].id,
        slug: slug,
        title: data.title || staticMatch.title || '',
        excerpt: data.excerpt || staticMatch.excerpt || '',
        content: data.content || staticMatch.content || '',
        tags: data.tags?.length ? data.tags : (staticMatch.tags || []),
        coverImage: data.coverImage || staticMatch.coverImage || null,
        author: data.author || staticMatch.author || 'Suleman Zaheer',
        readTime: data.readTime || staticMatch.readTime || '5 min read',
        category: data.category || staticMatch.category || '',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || null),
        publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : (data.publishedAt || null),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : (data.updatedAt || null),
      };
    }
  } catch {
    // Firestore unavailable during build — fall through to static data
  }

  // Fallback to hardcoded static blog data
  return STATIC_BLOGS[slug] || null;
});

// ─────────────────────────────────────────────────────────────────────────────
// generateStaticParams — hardcoded slugs ensure build NEVER fails
// ─────────────────────────────────────────────────────────────────────────────
const KNOWN_BLOG_SLUGS = Object.keys(STATIC_BLOGS);

export async function generateStaticParams() {
  try {
    const snapshot = await getDocs(collection(db, 'blogs'));
    const firestoreSlugs = snapshot.docs.map((doc) => doc.data().slug).filter(Boolean);
    const allSlugs = [...new Set([...KNOWN_BLOG_SLUGS, ...firestoreSlugs])];
    return allSlugs.map((slug) => ({ slug }));
  } catch {
    return KNOWN_BLOG_SLUGS.map((slug) => ({ slug }));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic Metadata per blog post
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Post Not Found | Suleman Zaheer' };

  const rawTitle = `${blog.title} | Suleman Zaheer`;
  const title = rawTitle.length > 60 ? `${blog.title.substring(0, 42)}... | S. Zaheer` : rawTitle;
  const description = (blog.excerpt || '').substring(0, 160);
  
  // Focused keyword list — avoids stuffing
  const keywords = [
    ...(blog.tags || []).slice(0, 6),
    'Suleman Zaheer',
    `${blog.category || 'Software Development'} Pakistan`,
    'SAMStack Studio',
  ].join(', ');

  const canonicalUrl = `https://suleman-zaheer.vercel.app/blog/${blog.slug}`;
  const coverImg = blog.coverImage || 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg';

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalUrl },
    authors: [{ name: 'Suleman Zaheer', url: 'https://suleman-zaheer.vercel.app' }],
    creator: 'Suleman Zaheer',
    publisher: 'Suleman Zaheer',
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: blog.publishedAt || blog.createdAt,
      modifiedTime: blog.updatedAt || blog.publishedAt || blog.createdAt,
      authors: ['Suleman Zaheer'],
      section: blog.category || 'Technology',
      tags: [...(blog.tags || []), 'Suleman Zaheer', 'سلیمان ظہیر', 'Pakistan', 'SAMStack Studio'],
      images: [{ url: coverImg, width: 1200, height: 630, alt: `${blog.title} – by Suleman Zaheer` }],
      siteName: 'Suleman Zaheer – SAMStack Studio',
      locale: 'en_PK',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverImg],
      creator: '@imsuleman_10',
      site: '@imsuleman_10',
    },
    other: {
      'article:author': 'Suleman Zaheer',
      'article:publisher': 'https://suleman-zaheer.vercel.app',
      'article:section': blog.category || 'Technology',
    }
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────
export default async function Page({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return <BlogPostClient initialPost={null} />;
  }

  const plainText = blog.content ? blog.content.replace(/<[^>]*>?/gm, '') : '';
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const coverImg = blog.coverImage || 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg';
  const canonicalUrl = `https://suleman-zaheer.vercel.app/blog/${blog.slug}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#article`,
      headline: blog.title,
      alternativeHeadline: `${blog.title} – Suleman Zaheer`,
      description: blog.excerpt || '',
      articleBody: plainText.substring(0, 1000),
      wordCount,
      inLanguage: 'en-PK',
      articleSection: blog.category || 'Technology',
      datePublished: blog.publishedAt || blog.createdAt || new Date().toISOString(),
      dateModified: blog.updatedAt || blog.publishedAt || new Date().toISOString(),
      author: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        alternateName: ['سلیمان ظہیر', 'Suleman Zaheer Mughal'],
        url: 'https://suleman-zaheer.vercel.app',
        image: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-software-engineer.jpg',
        jobTitle: 'MERN, Next.js, Laravel & Flutter Developer | Data Analyst | Business Growth Partner',
        sameAs: [
          'https://github.com/imsuleman-10',
          'https://www.linkedin.com/in/suleman-zaheer-mughal',
          'https://x.com/imsuleman_10',
        ],
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://suleman-zaheer.vercel.app/#organization',
        name: 'SAMStack Studio',
        url: 'https://suleman-zaheer.vercel.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://suleman-zaheer.vercel.app/sfavicon.png',
          width: 512,
          height: 512,
        },
      },
      keywords: [
        ...(blog.tags || []),
        'Suleman Zaheer',
        blog.category || 'Technology',
        'Pakistan',
        'SAMStack Studio',
      ].join(', '),
      image: {
        '@type': 'ImageObject',
        url: coverImg,
        width: 1200,
        height: 630,
        caption: `${blog.title} – Suleman Zaheer`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      url: canonicalUrl,
      isPartOf: {
        '@type': 'Blog',
        '@id': 'https://suleman-zaheer.vercel.app/blog#blog',
        name: 'Suleman Zaheer – Developer Blog',
        publisher: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2', '.article-summary'],
      },
      copyrightHolder: {
        '@type': 'Person',
        name: 'Suleman Zaheer',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
      },
      copyrightYear: new Date(blog.publishedAt || Date.now()).getFullYear(),
      license: 'https://creativecommons.org/licenses/by-nc/4.0/',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What is this article about?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `This article, titled "${blog.title}", is written by Suleman Zaheer. It covers topics related to ${blog.category || 'Software Development'} and provides technical insights and solutions. Read the full article on SAMStack Studio's blog.`
          }
        },
        {
          '@type': 'Question',
          name: `Who wrote the article "${blog.title}"?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `The article "${blog.title}" was written by Suleman Zaheer, a MERN Stack, Next.js, Laravel, and Flutter Developer based in Lahore, Pakistan.`
          }
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app' },
        { '@type': 'ListItem', position: 2, name: 'Developer Blog', item: 'https://suleman-zaheer.vercel.app/blog' },
        { '@type': 'ListItem', position: 3, name: blog.title, item: canonicalUrl },
      ],
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogPostClient initialPost={blog} />
    </>
  );
}
