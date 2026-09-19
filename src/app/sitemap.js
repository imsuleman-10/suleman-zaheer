import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { STATIC_BLOGS } from '@/data/staticBlogs';
import { STATIC_POEMS } from '@/data/staticPoems';

const SITE_URL = 'https://suleman-zaheer.vercel.app';

async function fetchFirestoreDocs(collectionName, fallbackArray, slugKey = 'slug') {
  try {
    const q = query(collection(db, collectionName), orderBy('publishedAt', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return fallbackArray;
    const docs = snapshot.docs.map(doc => {
      const data = doc.data();
      const slug = data[slugKey];
      const staticMatch = fallbackArray.find(d => d[slugKey] === slug) || {};
      return {
        slug,
        publishedAt: data.publishedAt?.toDate
          ? data.publishedAt.toDate().toISOString()
          : (data.publishedAt || staticMatch.publishedAt),
      };
    });
    const slugs = new Set(docs.map(d => d.slug));
    const fallbacks = fallbackArray.filter(d => !slugs.has(d[slugKey]));
    return [...docs, ...fallbacks];
  } catch {
    return fallbackArray.map(d => ({
      slug: d[slugKey],
      publishedAt: d.publishedAt,
    }));
  }
}

export default async function sitemap() {
  const [blogs, poems] = await Promise.all([
    fetchFirestoreDocs('blogs', STATIC_BLOGS),
    fetchFirestoreDocs('poems', STATIC_POEMS),
  ]);

  const today = new Date();

  const staticPages = [
    { url: '/', priority: 1.0, changeFrequency: 'daily' },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/photos', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/projects', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/author', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/gallery-seo', priority: 0.8, changeFrequency: 'daily' },
    { url: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/poetry', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/cv', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/sitemap', priority: 0.4, changeFrequency: 'monthly' },
  ];

  const entries = staticPages.map(page => ({
    url: `${SITE_URL}${page.url}`,
    lastModified: today,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  for (const blog of blogs) {
    entries.push({
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: blog.publishedAt ? new Date(blog.publishedAt) : today,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  for (const poem of poems) {
    entries.push({
      url: `${SITE_URL}/poetry/${poem.slug}`,
      lastModified: poem.publishedAt ? new Date(poem.publishedAt) : today,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
