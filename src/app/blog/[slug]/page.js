import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import BlogPostClient from './BlogPostClient';
import { cache } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// HARDCODED BLOG DATA — fallback when Firestore is empty or unreachable
// Firestore data ALWAYS takes priority over these when available.
// ─────────────────────────────────────────────────────────────────────────────
const STATIC_BLOGS = {
  'scaling-mern-stack-enterprise': {
    slug: 'scaling-mern-stack-enterprise',
    title: 'Scaling MERN Stack Applications for Enterprise Architecture',
    excerpt: "A comprehensive developer's guide to transitioning from basic React & Node.js apps to high-performance, load-balanced MERN architectures. Learn how to handle thousands of concurrent users with confidence.",
    content: `<h2>The Enterprise Challenge</h2>
<p>When building applications with the MERN stack (MongoDB, Express, React, Node.js), developers often start with monolithic architectures. While this works for MVPs, it quickly falls apart under enterprise-level load. In this guide, I share the exact strategies to scale a MERN application from 100 to 50,000+ daily active users.</p>
<h2>Identifying the Bottlenecks First</h2>
<p>Before throwing money at infrastructure, profile your application. The most common bottlenecks in MERN apps are unindexed MongoDB queries causing full collection scans, blocking synchronous operations in Node.js, no caching layer, and monolithic React bundles exceeding 2MB.</p>
<h2>Database Optimization: MongoDB at Scale</h2>
<p>Run <code>db.collection.explain("executionStats")</code> on your slowest queries. If you see a <code>COLLSCAN</code> instead of <code>IXSCAN</code>, you are missing a critical index. Compound indexes on frequently filtered fields can reduce query times from seconds to milliseconds.</p>
<h2>Node.js Clustering with PM2</h2>
<p>Node.js is single-threaded, but your server has multiple CPU cores. Use PM2 cluster mode to multiply your throughput:</p>
<pre><code>pm2 start server.js -i max --name "mern-api"</code></pre>
<h2>Implementing Redis Caching</h2>
<p>Every time your API serves identical data to different users, you waste database resources. Implement Redis between your Express routes and MongoDB. Caching frequently-read data with a 300-second TTL can reduce database load by 70%.</p>
<h2>React Code Splitting</h2>
<p>Use <code>React.lazy()</code> and <code>Suspense</code> for route-level code splitting. Never ship one massive JavaScript bundle. Each route should load only the JavaScript it needs.</p>
<h2>Conclusion</h2>
<p>Scaling is a continuous discipline. Monitor with tools like Datadog, set performance budgets, and always load-test before major releases. The MERN stack handles enterprise workloads beautifully when architected correctly.</p>`,
    tags: ['System Design', 'MERN Stack', 'Node.js', 'MongoDB', 'Enterprise', 'Performance'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    author: 'Suleman Zaheer',
    createdAt: '2025-05-20T10:00:00.000Z',
    publishedAt: '2025-05-20T10:00:00.000Z',
    readTime: '8 min read',
  },
  'nextjs-server-components-seo-blueprint': {
    slug: 'nextjs-server-components-seo-blueprint',
    title: 'Next.js Server Components: The Ultimate Technical SEO Blueprint',
    excerpt: "Stop letting Client-Side Rendering ruin your search rankings. A deep technical dive into Next.js Server Components, JSON-LD schema markup, and metadata generation to build a site Google loves.",
    content: `<h2>The Hidden SEO Cost of Client-Side Rendering</h2>
<p>Single Page Applications (SPAs) built with React promised speed and interactivity — but at an SEO cost. When Googlebot visits a CSR page, it sees an almost empty HTML shell. While Google does execute JavaScript, it happens in a delayed secondary crawl, meaning your content might not be indexed for days, if ever fully.</p>
<h2>How Next.js Server Components Change Everything</h2>
<p>Server Components render on the server and send fully-formed HTML to the browser. When Googlebot crawls your page, it instantly sees the complete title, meta description, article body, and schema markup — no JavaScript execution required. This is the gold standard for SEO.</p>
<h2>Implementing generateMetadata</h2>
<p>Every dynamic page in your Next.js app should export a <code>generateMetadata</code> function. This runs server-side and injects the correct SEO meta tags for each unique piece of content:</p>
<pre><code>export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title + " | Suleman Zaheer",
    description: post.excerpt,
    keywords: post.tags.join(", "),
    openGraph: { title: post.title, type: "article" },
  };
}</code></pre>
<h2>JSON-LD Schema: Speaking Google's Language</h2>
<p>Beyond HTML meta tags, Google understands structured data in JSON-LD format. Adding a <code>BlogPosting</code> schema to your article pages dramatically increases your chances of appearing in rich snippets and featured answers.</p>
<h2>Canonical URLs</h2>
<p>Always add a canonical URL to every page. If your content is accessible at multiple URLs, Google may see them as duplicate content and penalize your rankings.</p>
<h2>Conclusion</h2>
<p>Next.js is not just a React framework — it is an SEO engine when configured correctly. Every page needs a unique title, description, relevant keywords, OpenGraph tags, and JSON-LD schema. This is the baseline for any serious web presence in 2025.</p>`,
    tags: ['Next.js', 'SEO', 'Server Components', 'Schema.org', 'Performance', 'Web Development'],
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80',
    author: 'Suleman Zaheer',
    createdAt: '2025-05-21T10:00:00.000Z',
    publishedAt: '2025-05-21T10:00:00.000Z',
    readTime: '6 min read',
  },
  'cs-student-production-code-roadmap': {
    slug: 'cs-student-production-code-roadmap',
    title: "From Academic Theory to Production Code: A CS Student's Roadmap",
    excerpt: "A raw, honest breakdown of how CS students at Pakistani universities can bridge the gap between textbook algorithms and building real-world, deployed software that employers actually want.",
    content: `<h2>The Uncomfortable Truth About CS Degrees</h2>
<p>Your computer science degree will teach you how to think algorithmically. It will not teach you how to build a production-ready web application, configure a cloud server, or work in a real development team. That gap is your responsibility to close.</p>
<h2>Year 1-2: Master the Fundamentals Deeply</h2>
<p>Don't rush to frameworks. Before touching React or Laravel, get an iron grip on data structures, algorithms, and OOP. Every interview at a serious tech company tests these. A developer who understands <em>why</em> a HashMap is O(1) is ten times more valuable than one who only knows how to use it.</p>
<h2>Year 2-3: Build Ugly Projects</h2>
<p>Start building now. Your first projects will be buggy. That is fine. Build a basic CRUD app, then build it again better. Deploy it to Firebase or Vercel. Having something live on the internet — even if imperfect — demonstrates initiative that classroom work cannot.</p>
<h2>Year 3-4: Contribute and Collaborate</h2>
<p>Join open-source projects on GitHub. Learn Git properly — branching, rebasing, pull requests. Understanding Git flow is non-negotiable in any professional developer role. Build something with a team outside of university assignments.</p>
<h2>The Portfolio Rule: Deployed or It Didn't Happen</h2>
<p>A GitHub repo with no live URL carries 20% of the weight of a deployed application. Every project you build should be accessible on the internet. Firebase Hosting, Vercel, and Railway all have generous free tiers.</p>
<h2>Conclusion</h2>
<p>Your degree gets you into the interview room. Your deployed projects get you the job. Stop watching tutorials, start building, start deploying, and start failing fast. The Pakistani IT industry is growing — but only for developers who can ship.</p>`,
    tags: ['Career Guide', 'CS Student', 'Web Development', 'Pakistan Tech', 'Software Engineering'],
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
    author: 'Suleman Zaheer',
    createdAt: '2025-05-22T10:00:00.000Z',
    publishedAt: '2025-05-22T10:00:00.000Z',
    readTime: '5 min read',
  },
  'firebase-vs-supabase-2025-comparison': {
    slug: 'firebase-vs-supabase-2025-comparison',
    title: 'Firebase vs. Supabase in 2025: Which Backend Should You Choose?',
    excerpt: "An honest, technical comparison of Firebase and Supabase for full-stack developers. We break down pricing, performance, developer experience, and real-world use cases.",
    content: `<h2>The BaaS Revolution</h2>
<p>Backend-as-a-Service platforms have fundamentally changed how solo developers and small teams build applications. Firebase (by Google) and Supabase (open-source PostgreSQL) are the two dominant players. Here is my honest take after using both in production.</p>
<h2>Firebase: Strengths and Weaknesses</h2>
<p><strong>Strengths:</strong> Firebase's real-time capabilities are unmatched. Firestore's live listeners mean your app updates instantly without polling. The free Spark tier is incredibly generous for side projects.</p>
<p><strong>Weaknesses:</strong> Firestore is NoSQL. If your data is highly relational, you will constantly fight the data model. Complex queries that are trivial in SQL require denormalization or multiple round trips in Firestore.</p>
<h2>Supabase: Strengths and Weaknesses</h2>
<p><strong>Strengths:</strong> Full power of PostgreSQL. If you know SQL — and every developer should — you can write powerful queries with joins, aggregations, and transactions impossible in Firestore. Row Level Security policies are an elegant security model.</p>
<p><strong>Weaknesses:</strong> Supabase's free tier pauses your database after 1 week of inactivity. Real-time capabilities exist but are not as battle-tested as Firebase's.</p>
<h2>My Recommendation</h2>
<p>Choose Firebase for real-time data and rapid prototyping. Choose Supabase when your data is relational or you need complex SQL queries. The worst choice is spending two weeks debating instead of building.</p>`,
    tags: ['Firebase', 'Supabase', 'Backend', 'Database', 'Architecture', 'Full Stack'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    author: 'Suleman Zaheer',
    createdAt: '2025-05-23T10:00:00.000Z',
    publishedAt: '2025-05-23T10:00:00.000Z',
    readTime: '7 min read',
  },
  'tailwind-css-scalable-design-system': {
    slug: 'tailwind-css-scalable-design-system',
    title: 'Tailwind CSS Architecture: Building a Scalable Design System',
    excerpt: "Stop writing repetitive utility classes. Learn how to architect a scalable design system using Tailwind CSS configuration, custom design tokens, and reusable component patterns.",
    content: `<h2>The Tailwind Trap Most Developers Fall Into</h2>
<p>Most developers misuse Tailwind by copy-pasting 30 classes onto every button. This leads to bloated, unmaintainable HTML. The correct approach is to use Tailwind as a design token engine — not inline styles on steroids.</p>
<h2>Step 1: Define Design Tokens in tailwind.config.js</h2>
<p>Configure your design system first — brand colors, typography scale, spacing, and border radius values. This creates a shared visual language across your entire application:</p>
<pre><code>theme: {
  extend: {
    colors: {
      primary: "#00D4AA",
      surface: "#0A0A0A",
    },
    fontFamily: {
      display: ["'Space Grotesk'", "sans-serif"],
    },
  },
}</code></pre>
<h2>Step 2: Create Component Abstractions</h2>
<p>Never repeat the same combination of utility classes across multiple files. If a button style appears in 10 places, abstract it into a React component. The component owns its styles; callers just use the component.</p>
<h2>Step 3: Strategic Use of @apply</h2>
<p>For truly global patterns like prose styles for blog content, the <code>@apply</code> directive in your global CSS is appropriate. Use it sparingly for things that cannot be encapsulated in a React component.</p>
<h2>Conclusion</h2>
<p>Tailwind is not a shortcut — it is a system. Developers who treat it as a system build beautiful, consistent, maintainable UIs. Architecture first, utilities second.</p>`,
    tags: ['Tailwind CSS', 'CSS', 'Design Systems', 'Frontend', 'UI/UX', 'React'],
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&auto=format&fit=crop&q=80',
    author: 'Suleman Zaheer',
    createdAt: '2025-05-18T10:00:00.000Z',
    publishedAt: '2025-05-18T10:00:00.000Z',
    readTime: '6 min read',
  },
  'land-first-international-freelance-client-pakistan': {
    slug: 'land-first-international-freelance-client-pakistan',
    title: 'How to Land Your First International Freelance Client from Pakistan',
    excerpt: "A practical, battle-tested guide for Pakistani developers to stop competing on price, build a premium personal brand, and consistently attract high-paying international freelance contracts.",
    content: `<h2>Why Most Pakistani Freelancers Stay Stuck at $5/Hour</h2>
<p>Most developers self-select into the low-price race. They set their rate at $10/hour out of fear, then wonder why they only attract clients looking for the cheapest option. Low prices attract bad clients. This is one of the most consistent truths in freelancing.</p>
<h2>The Value Positioning Shift</h2>
<p>Stop selling hours. Start selling outcomes. A client doesn't want "a React developer for $15/hour." They want their e-commerce conversion rate to increase by 30%. Frame your service around business outcomes instead of technical inputs.</p>
<h2>Your Portfolio is Your Most Powerful Sales Tool</h2>
<p>Before applying to a single job, build a world-class personal portfolio. An international client who finds your stunning, fast, technically impressive website has already decided they want to work with you before reading a single word. Build it with Next.js. Deploy it on Firebase. Make it fast (90+ Lighthouse score).</p>
<h2>Communication is the True Differentiator</h2>
<p>Pakistani developers are technically excellent. The gap that holds them back is professional communication. Practice writing clear, concise proposals. Respond to messages quickly. Set and meet deadlines. These behaviors — which are just professionalism — are shockingly rare on freelancing platforms.</p>
<h2>Conclusion</h2>
<p>The path from zero to $3,000/month freelance income takes 6-18 months of disciplined effort. It is achievable for any competent developer who commits to positioning as a premium service provider rather than a commodity.</p>`,
    tags: ['Freelancing', 'Career', 'Pakistan Tech', 'Business', 'Upwork'],
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    author: 'Suleman Zaheer',
    createdAt: '2025-05-15T10:00:00.000Z',
    publishedAt: '2025-05-15T10:00:00.000Z',
    readTime: '6 min read',
  },
  'psychology-ux-design-interfaces-users-love': {
    slug: 'psychology-ux-design-interfaces-users-love',
    title: 'The Psychology of UI/UX: Building Interfaces Users Actually Love',
    excerpt: "Great code is useless if users abandon your app in frustration. Understand the cognitive psychology principles behind elite UI/UX design to build applications that convert and retain users.",
    content: `<h2>Why Technically Perfect Apps Fail</h2>
<p>I have seen zero-bug applications with beautiful codebases that users hated. I have seen poorly written spaghetti code used by millions daily. The difference was entirely in the user experience. Technical excellence is the foundation; UX is the building that determines if users come back.</p>
<h2>Cognitive Load: The Enemy of Good UX</h2>
<p>Every element you add to a screen adds to the user's cognitive load. Our working memory holds approximately 7 items at once (Miller's Law). When you exceed this with complex interfaces, users feel overwhelmed and abandon. The best UX designers remove elements. Every addition must justify its existence.</p>
<h2>Fitts's Law: Making Clickable Things Actually Clickable</h2>
<p>The time to hit a target is proportional to its distance and inversely proportional to its size. In practical terms: make your primary call-to-action buttons large and centrally placed. Never put the most important button in the corner at 16px. This seems obvious yet countless apps violate it daily.</p>
<h2>Micro-Animations: The Emotional Layer</h2>
<p>Micro-animations are the difference between software that feels sterile and software that feels alive. A button that subtly depresses on click, a form field that smoothly highlights — these millisecond-length interactions provide feedback that builds trust and delight. Use Framer Motion in React to implement these without sacrificing performance.</p>
<h2>Conclusion</h2>
<p>The best developers understand they are not just writing code — they are designing experiences. The developer who combines technical excellence with UX empathy is the developer every company wants to hire.</p>`,
    tags: ['UI/UX', 'Design', 'User Psychology', 'Frontend', 'Product Design', 'React'],
    coverImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&auto=format&fit=crop&q=80',
    author: 'Suleman Zaheer',
    createdAt: '2025-05-10T10:00:00.000Z',
    publishedAt: '2025-05-10T10:00:00.000Z',
    readTime: '5 min read',
  },
  'react-performance-optimization-usememo-usecallback': {
    slug: 'react-performance-optimization-usememo-usecallback',
    title: 'React Performance Optimization: Stop Overusing useMemo and useCallback',
    excerpt: "A technical deep dive into when to use React memoization hooks, and why wrapping every function in useCallback is actually making your app slower.",
    content: `<h2>The Premature Optimization Trap</h2>
<p>Many developers discover <code>useMemo</code> and <code>useCallback</code> and immediately wrap every value and function in them. This is premature optimization, and ironically, it degrades performance. Every time you use these hooks, React has to allocate memory for the dependencies array and perform equality checks on every render.</p>
<h2>When You Actually Need useCallback</h2>
<p>You only need <code>useCallback</code> in two scenarios: First, when you are passing a function as a prop to a child component wrapped in <code>React.memo</code>. Second, when the function is used as a dependency in a <code>useEffect</code>. If neither of these apply, a standard inline function is faster and cleaner.</p>
<h2>When You Actually Need useMemo</h2>
<p><code>useMemo</code> is designed for expensive calculations. If you are filtering an array of 5,000 items, use it. If you are filtering an array of 10 items, the cost of React checking the dependencies array is higher than just running the filter again. Do not memoize cheap operations.</p>
<h2>Conclusion</h2>
<p>Write clean code first. Measure performance using the React Profiler. Only optimize components that are provably slow. In 90% of cases, the solution to React performance issues is state colocation, not memoization.</p>`,
    tags: ['React', 'Performance', 'Hooks', 'JavaScript', 'Frontend', 'Web Development'],
    coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1200&auto=format&fit=crop&q=80',
    author: 'Suleman Zaheer',
    createdAt: '2025-05-08T10:00:00.000Z',
    publishedAt: '2025-05-08T10:00:00.000Z',
    readTime: '4 min read',
  },
  'building-secure-rest-apis-nodejs': {
    slug: 'building-secure-rest-apis-nodejs',
    title: 'Building Secure REST APIs in Node.js: The 2025 Developer Guide',
    excerpt: "Security cannot be an afterthought. Learn how to architect, secure, and deploy enterprise-grade REST APIs using Node.js and Express.",
    content: `<h2>The Vulnerable API</h2>
<p>Building a REST API is easy. Building a secure REST API requires discipline. Most tutorials teach you how to return JSON from Express, but they omit critical security layers like rate limiting, helmet headers, and input sanitization.</p>
<h2>Input Validation is Non-Negotiable</h2>
<p>Never trust the client. Every piece of data in the request body, query parameters, or URL params must be validated. Use a library like Joi or Zod to create strict schemas. If the data does not match the schema, return a 400 Bad Request immediately. This prevents NoSQL injection and parameter pollution.</p>
<h2>JWT Authentication Best Practices</h2>
<p>JSON Web Tokens are powerful, but frequently misused. Do not store JWTs in <code>localStorage</code> where they are vulnerable to XSS attacks. Store them in <code>httpOnly</code> secure cookies. Ensure your tokens have a short expiration time (e.g., 15 minutes) and implement a robust refresh token rotation strategy.</p>
<h2>Conclusion</h2>
<p>API security is a multi-layered approach. Rate limit your endpoints, use Helmet to set secure HTTP headers, validate all inputs, and use secure cookies for authentication. A single compromised API can destroy a company's reputation overnight.</p>`,
    tags: ['Node.js', 'Security', 'REST API', 'Backend', 'Express', 'JWT'],
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    author: 'Suleman Zaheer',
    createdAt: '2025-05-05T10:00:00.000Z',
    publishedAt: '2025-05-05T10:00:00.000Z',
    readTime: '6 min read',
  },
};

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
      return {
        id: snapshot.docs[0].id,
        ...data,
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

  const title = `${blog.title} | Suleman Zaheer`;
  const description = blog.excerpt || '';
  const tagsStr = blog.tags ? blog.tags.join(', ') : 'Web Development, MERN Stack';

  return {
    title,
    description,
    keywords: tagsStr,
    alternates: { canonical: `https://suleman-zaheer.web.app/blog/${blog.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: blog.publishedAt || blog.createdAt,
      authors: ['Suleman Zaheer'],
      tags: blog.tags,
      images: blog.coverImage
        ? [{ url: blog.coverImage, width: 1200, height: 630, alt: blog.title }]
        : [
            { url: 'https://suleman-zaheer.web.app/assets/author.jpg', width: 1200, height: 1200, alt: 'Suleman Zaheer - Author' },
            { url: 'https://suleman-zaheer.web.app/assets/suleman-zaheer-full-stack-developer.jpg', width: 1200, height: 630 }
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: blog.coverImage
        ? [blog.coverImage]
        : ['https://suleman-zaheer.web.app/assets/author.jpg'],
    },
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || '',
    datePublished: blog.publishedAt || blog.createdAt || new Date().toISOString(),
    dateModified: blog.updatedAt || blog.publishedAt || new Date().toISOString(),
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
    publisher: {
      '@type': 'Organization',
      name: 'Suleman Zaheer',
      logo: {
        '@type': 'ImageObject',
        url: 'https://suleman-zaheer.web.app/assets/suleman-zaheer-logo.png',
        width: 400,
        height: 400,
      },
    },
    keywords: blog.tags ? blog.tags.join(', ') : '',
    image: {
      '@type': 'ImageObject',
      url: blog.coverImage || 'https://suleman-zaheer.web.app/assets/author.jpg',
      width: 1200,
      height: 630,
      alt: blog.title,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://suleman-zaheer.web.app/blog/${blog.slug}`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://suleman-zaheer.web.app',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://suleman-zaheer.web.app/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: blog.title,
          item: `https://suleman-zaheer.web.app/blog/${blog.slug}`,
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
      <BlogPostClient initialPost={blog} />
    </>
  );
}
