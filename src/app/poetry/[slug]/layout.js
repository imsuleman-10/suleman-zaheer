import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { STATIC_POEMS } from '../page';

export async function generateStaticParams() {
  const slugs = [];
  try {
    const q = query(collection(db, 'poems'), where('published', '==', true));
    const snapshot = await getDocs(q);
    snapshot.docs.forEach(doc => {
      const slug = doc.data().slug;
      if (slug) slugs.push({ slug });
    });
  } catch {
    // Firestore unavailable during build — use static data
  }
  STATIC_POEMS.forEach(poem => {
    if (!slugs.some(s => s.slug === poem.slug)) {
      slugs.push({ slug: poem.slug });
    }
  });
  return slugs;
}

export default function Layout({ children }) {
  return children;
}
