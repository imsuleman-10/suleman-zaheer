import React from 'react';
import { db } from '@/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import BlogListClient from './BlogListClient';
import { STATIC_BLOGS } from '@/data/staticBlogs';

// Re-export so any legacy imports continue to work
export { STATIC_BLOGS };



export const metadata = {
  title: 'Developer Blog | Suleman Zaheer — Full Stack Engineer',
  description: '16 in-depth technical articles on MERN Stack, Next.js, React performance, Node.js security, TypeScript, freelancing, and UI/UX — written from real project experience by Suleman Zaheer.',
  keywords: 'Web Development, MERN Stack, Next.js, React, Node.js, TypeScript, Frontend, Backend, Full Stack Developer, Freelancer, Pakistan Tech, Software Engineering, System Design',
  alternates: { canonical: 'https://suleman-zaheer.web.app/blog' },
  openGraph: {
    title: 'Developer Blog | Suleman Zaheer',
    description: '16 in-depth technical articles on MERN Stack, Next.js, React, and modern web engineering.',
    url: 'https://suleman-zaheer.web.app/blog',
    siteName: 'Suleman Zaheer Portfolio',
    type: 'website',
    images: [
      {
        url: 'https://suleman-zaheer.web.app/assets/author.jpg',
        width: 1200,
        height: 1200,
        alt: 'Suleman Zaheer - Full Stack Developer & Technical Writer',
      },
      { 
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80', 
        width: 1200, 
        height: 630,
        alt: 'Technical Blog by Suleman Zaheer'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Blog | Suleman Zaheer',
    description: '16 expert articles on MERN, Next.js, React, Node.js, TypeScript, and more.',
    image: 'https://suleman-zaheer.web.app/assets/author.jpg',
  },
};

async function getBlogs() {
  try {
    const q = query(collection(db, 'blogs'), orderBy('publishedAt', 'desc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return STATIC_BLOGS;

    const firestoreBlogs = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || '',
        content: data.content || '',
        tags: data.tags || [],
        coverImage: data.coverImage || null,
        author: data.author || 'Suleman Zaheer',
        readTime: data.readTime || '5 min read',
        category: data.category || '',
        featured: data.featured || false,
        views: data.views || 0,
        published: data.published || false,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
        publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : (data.publishedAt || null),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : null,
      };
    });

    // Merge: Firestore takes priority over static for same slug
    const firestoreSlugs = new Set(firestoreBlogs.map(b => b.slug));
    const staticFallbacks = STATIC_BLOGS.filter(b => !firestoreSlugs.has(b.slug));
    return [...firestoreBlogs, ...staticFallbacks];
  } catch (error) {
    console.error('Firestore unreachable — serving static blog content:', error.message);
    return STATIC_BLOGS;
  }
}

export default async function BlogPage() {
  const posts = await getBlogs();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Suleman Zaheer – Developer Blog',
    description: 'In-depth articles on MERN Stack, Next.js, React, Node.js, UI/UX, freelancing, and software engineering by Suleman Zaheer.',
    url: 'https://suleman-zaheer.web.app/blog',
    author: {
      '@type': 'Person',
      name: 'Suleman Zaheer',
      url: 'https://suleman-zaheer.web.app',
      image: 'https://suleman-zaheer.web.app/assets/author.jpg',
      sameAs: [
        'https://github.com/imsuleman-10',
        'https://www.linkedin.com/in/suleman-zaheer-mughal',
      ],
    },
    image: 'https://suleman-zaheer.web.app/assets/author.jpg',
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt || new Date().toISOString(),
      dateModified: post.updatedAt || post.publishedAt || new Date().toISOString(),
      author: { 
        '@type': 'Person', 
        name: 'Suleman Zaheer',
        image: 'https://suleman-zaheer.web.app/assets/author.jpg',
      },
      url: `https://suleman-zaheer.web.app/blog/${post.slug}`,
      image: {
        '@type': 'ImageObject',
        url: post.coverImage || 'https://suleman-zaheer.web.app/assets/author.jpg',
        width: 1200,
        height: 630,
      },
      keywords: post.tags?.join(', '),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogListClient initialBlogs={posts} />
    </>
  );
}
