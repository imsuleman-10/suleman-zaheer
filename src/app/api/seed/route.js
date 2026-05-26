import { NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { STATIC_BLOGS } from '@/data/staticBlogs';
import { STATIC_POEMS } from '@/data/staticPoems';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const blogsRef = collection(db, 'blogs');
    const poemsRef = collection(db, 'poems');

    let blogsAdded = 0;
    let poemsAdded = 0;

    // Seed Blogs
    for (const blog of STATIC_BLOGS) {
      const q = query(blogsRef, where('slug', '==', blog.slug));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        // Strip id from static data before saving to firestore
        const { id, ...blogData } = blog;
        await addDoc(blogsRef, {
          ...blogData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          views: 0,
          published: true, // Make sure published is true
        });
        blogsAdded++;
      }
    }

    // Seed Poems
    for (const poem of STATIC_POEMS) {
      const q = query(poemsRef, where('slug', '==', poem.slug));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        // Strip id from static data
        const { id, ...poemData } = poem;
        await addDoc(poemsRef, {
          ...poemData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          views: 0
        });
        poemsAdded++;
      }
    }

    return NextResponse.json({ 
      message: 'Seeding completed.',
      blogsAdded,
      poemsAdded
    });
  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

