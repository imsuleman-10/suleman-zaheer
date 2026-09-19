import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { STATIC_BLOGS } from '@/data/staticBlogs';

export async function generateStaticParams() {
  const slugs = [];
  try {
    const snapshot = await getDocs(collection(db, 'blogs'));
    snapshot.docs.forEach(doc => {
      const slug = doc.data().slug;
      if (slug) slugs.push({ slug });
    });
  } catch {
    // Firestore unavailable during build — use static data
  }
  STATIC_BLOGS.forEach(blog => {
    if (!slugs.some(s => s.slug === blog.slug)) {
      slugs.push({ slug: blog.slug });
    }
  });
  return slugs;
}

export default function Layout({ children }) {
  return children;
}
