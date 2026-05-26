// scripts/seed-blogs.mjs
// Run this script ONCE to seed all blogs into Firestore:
// node scripts/seed-blogs.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDfouPiTQCV05-uG9fSHvS9M9ZQvWgvdyI",
  authDomain: "suleman-zaheer.firebaseapp.com",
  projectId: "suleman-zaheer",
  storageBucket: "suleman-zaheer.firebasestorage.app",
  messagingSenderId: "485130497299",
  appId: "1:485130497299:web:1d5e92f607ee1430f4bee6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogs = [
  {
    title: "Scaling MERN Stack Applications for Enterprise Architecture",
    slug: "scaling-mern-stack-enterprise",
    excerpt: "A comprehensive developer's guide to transitioning from basic React & Node.js apps to high-performance, load-balanced MERN architectures. Learn how to handle thousands of concurrent users with confidence.",
    content: `<h2>The Enterprise Challenge</h2>
<p>When building applications with the MERN stack (MongoDB, Express, React, Node.js), developers often start with monolithic architectures. While this works for MVPs, it quickly falls apart under enterprise-level load. In this guide, I'll share the exact strategies I used to scale a MERN application from 100 to 50,000+ daily active users.</p>

<h2>Identifying the Bottlenecks First</h2>
<p>Before throwing money at infrastructure, identify your bottlenecks using profiling tools. The most common ones in MERN applications are:</p>
<ul>
<li><strong>Unindexed MongoDB queries</strong> causing full collection scans</li>
<li><strong>Blocking synchronous operations</strong> in Node.js event loop</li>
<li><strong>No caching layer</strong>, resulting in redundant database hits</li>
<li><strong>Monolithic React bundle</strong> exceeding 2MB, killing load time</li>
</ul>

<h2>Database Optimization: MongoDB at Scale</h2>
<p>MongoDB is incredibly powerful when used correctly. Start by running <code>db.collection.explain("executionStats")</code> on your slowest queries. If you see a <code>COLLSCAN</code> instead of <code>IXSCAN</code>, you are missing a critical index. Compound indexes on frequently filtered fields can reduce query times from seconds to milliseconds.</p>

<p>For read-heavy workloads, implement <strong>MongoDB Atlas read replicas</strong>. Route your heavy analytics queries to a secondary replica so your primary instance remains fast for user-facing requests.</p>

<h2>Node.js Clustering and PM2</h2>
<p>Node.js is single-threaded, but your server has multiple CPU cores. Use PM2's cluster mode to spawn one Node.js process per CPU core, effectively multiplying your throughput without changing a single line of application code:</p>
<pre><code>pm2 start server.js -i max --name "mern-api"</code></pre>

<h2>Implementing Redis Caching</h2>
<p>Every time your API serves the same data to different users, you are wasting database resources. Implement Redis as a caching layer between your Express.js routes and MongoDB. Cache frequently read, rarely changing data (like product listings or blog posts) with a TTL of 300 seconds. This single change can reduce database load by 70%.</p>

<h2>React Code Splitting and Lazy Loading</h2>
<p>On the frontend, use React's built-in <code>React.lazy()</code> and <code>Suspense</code> to implement route-level code splitting. Never ship one massive JavaScript bundle. Instead, each route should load only the JavaScript it needs.</p>

<h2>Conclusion</h2>
<p>Scaling is not a one-time event; it is a continuous discipline. Monitor your application with tools like New Relic or Datadog, set up performance budgets, and always test under load before major releases. The MERN stack is more than capable of handling enterprise workloads when architected correctly.</p>`,
    tags: ["System Design", "MERN Stack", "Node.js", "MongoDB", "Enterprise", "Performance"],
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    author: "Suleman Zaheer",
    views: 0
  },
  {
    title: "Next.js Server Components: The Ultimate Technical SEO Blueprint",
    slug: "nextjs-server-components-seo-blueprint",
    excerpt: "Stop letting Client-Side Rendering ruin your search rankings. A deep technical dive into Next.js Server Components, JSON-LD schema markup, and metadata generation to build a site Google loves.",
    content: `<h2>The Hidden SEO Cost of Client-Side Rendering</h2>
<p>For years, Single Page Applications (SPAs) built with React promised speed and interactivity. What they didn't advertise was the SEO tax. When a Googlebot visits a CSR page, it sees an almost empty HTML shell and a JavaScript file. While Google does execute JavaScript, it happens in a delayed secondary crawl — meaning your content might not be indexed for days, if ever fully.</p>

<h2>How Next.js Server Components Change Everything</h2>
<p>Next.js Server Components render on the server and send fully-formed HTML to the browser. When Googlebot crawls <code>/blog/my-article</code>, it instantly sees the complete title, meta description, article body, and schema markup — no JavaScript execution required. This is the gold standard for SEO.</p>

<h2>Implementing generateMetadata for Every Page</h2>
<p>Every dynamic page in your Next.js app should export a <code>generateMetadata</code> function. This function runs server-side and injects the correct SEO meta tags for each unique piece of content:</p>
<pre><code>export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title + " | Suleman Zaheer",
    description: post.excerpt,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}</code></pre>

<h2>JSON-LD Schema: Speaking Google's Language</h2>
<p>Beyond HTML meta tags, Google understands structured data in JSON-LD format. By adding a <code>BlogPosting</code> schema to your article pages, you communicate directly with Google's knowledge graph, dramatically increasing your chances of appearing in rich snippets and featured answers.</p>

<h2>The Canonical URL: Preventing Duplicate Content Penalties</h2>
<p>Always add a canonical URL to every page. If your content is accessible at multiple URLs (with and without trailing slashes, with query parameters, etc.), Google may see them as duplicate content and penalize your rankings.</p>

<h2>Conclusion</h2>
<p>Next.js is not just a React framework; it is an SEO engine when configured correctly. Every page should have a unique title, unique description, relevant keywords, OpenGraph tags, and JSON-LD schema. This is the baseline for any serious web presence in 2025.</p>`,
    tags: ["Next.js", "SEO", "Server Components", "Schema.org", "Performance", "Web Development"],
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80",
    author: "Suleman Zaheer",
    views: 0
  },
  {
    title: "From Academic Theory to Production Code: A CS Student's Roadmap",
    slug: "cs-student-production-code-roadmap",
    excerpt: "A raw, honest breakdown of how CS students at Pakistani universities can bridge the gap between textbook algorithms and building real-world, deployed software that employers actually want to hire for.",
    content: `<h2>The Uncomfortable Truth About CS Degrees</h2>
<p>Let me be direct: your computer science degree from UET, NUST, or FAST will teach you how to think algorithmically. It will not teach you how to build a production-ready web application, configure a cloud server, or work in a real development team. That gap is your responsibility to close.</p>

<h2>Year 1-2: Master the Fundamentals Deeply</h2>
<p>Don't rush to frameworks. Before you touch React or Laravel, ensure you have an iron grip on data structures, algorithms, and object-oriented programming. Every interview at a tech company will test these. A developer who understands <em>why</em> a HashMap is O(1) is worth ten times more than one who just knows how to use it.</p>

<h2>Year 2-3: Build Ugly Projects</h2>
<p>Start building. Now. Your first projects will be ugly, buggy, and embarrassing. That's perfectly fine. Build a basic CRUD app, then build it again better. Deploy it to Firebase or Vercel. Having something live on the internet — even if imperfect — demonstrates initiative that classroom work cannot.</p>

<p>Focus on the MERN stack (MongoDB, Express, React, Node.js) or Laravel + MySQL. These are the most in-demand skills in Pakistan's IT industry. The job market is clear on this.</p>

<h2>Year 3-4: Contribute and Collaborate</h2>
<p>Join open-source projects on GitHub. Even fixing typos in documentation counts. Learn Git properly — branching, rebasing, pull requests. Understanding Git flow is non-negotiable for any professional developer role.</p>

<p>Build something with a team. University group projects don't count. Find peers, build a real product, handle conflicts, divide responsibilities. This experience is invaluable.</p>

<h2>The Portfolio Rule: Deployed or It Didn't Happen</h2>
<p>A GitHub repository with a perfect README but no live URL carries 20% of the weight of a deployed application. Every project you build should be accessible on the internet. Use Firebase Hosting, Vercel, or Railway — all have generous free tiers.</p>

<h2>Conclusion</h2>
<p>Your degree is the ticket to the interview room. Your deployed projects are what get you the job. Stop watching tutorials, start building, start deploying, and start failing fast. The Pakistani IT industry is growing at an unprecedented rate — but only for developers who have proven they can ship.</p>`,
    tags: ["Career Guide", "CS Student", "Web Development", "Pakistan Tech", "Freelancing", "Software Engineering"],
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    author: "Suleman Zaheer",
    views: 0
  },
  {
    title: "Firebase vs. Supabase in 2025: Which Backend Should You Choose?",
    slug: "firebase-vs-supabase-2025-comparison",
    excerpt: "An honest, technical comparison of Firebase and Supabase for full-stack developers. We break down pricing, performance, developer experience, and real-world use cases to help you make the right choice.",
    content: `<h2>The BaaS Revolution</h2>
<p>Backend-as-a-Service (BaaS) platforms have fundamentally changed how solo developers and small teams build applications. Instead of managing servers, writing auth logic from scratch, and configuring databases, you can have a full backend running in minutes. Firebase (by Google) and Supabase (open-source PostgreSQL) are the two dominant players. Here's my honest take after using both in production.</p>

<h2>Firebase: Strengths and Weaknesses</h2>
<p><strong>Strengths:</strong> Firebase's real-time capabilities are unmatched. Firestore's live listeners mean your app updates instantly without polling. The free Spark tier is incredibly generous for side projects, and the client-side SDK is intuitive and well-documented.</p>

<p><strong>Weaknesses:</strong> Firestore is a NoSQL document database. If your data is highly relational, you will constantly fight the data model. Complex queries that are trivial in SQL require denormalization or multiple round trips in Firestore. Pricing can also escalate sharply at scale due to per-read/write charges.</p>

<h2>Supabase: Strengths and Weaknesses</h2>
<p><strong>Strengths:</strong> Supabase gives you the full power of PostgreSQL. If you know SQL — and every developer should — you can write powerful, complex queries with joins, aggregations, and transactions that are impossible in Firestore. Row Level Security (RLS) policies are an elegant security model.</p>

<p><strong>Weaknesses:</strong> Supabase's free tier pauses your database after 1 week of inactivity. Real-time capabilities exist but are not as battle-tested as Firebase's. The ecosystem and community are smaller, meaning fewer tutorials and Stack Overflow answers.</p>

<h2>My Recommendation</h2>
<p>Choose Firebase if: your app has highly dynamic, real-time data (chat apps, live dashboards, collaborative tools), or if you're building a prototype and want the fastest path to production.</p>
<p>Choose Supabase if: your data is relational, you need complex queries, or you are philosophically committed to open-source and PostgreSQL.</p>

<h2>Conclusion</h2>
<p>Both are excellent tools. The "right" choice depends entirely on your data model and product requirements. The worst choice is spending two weeks debating instead of building.</p>`,
    tags: ["Firebase", "Supabase", "Backend", "Database", "Architecture", "Full Stack"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    author: "Suleman Zaheer",
    views: 0
  },
  {
    title: "Tailwind CSS Architecture: Building a Scalable Design System",
    slug: "tailwind-css-scalable-design-system",
    excerpt: "Stop writing repetitive utility classes. Learn how to architect a truly scalable design system using Tailwind CSS configuration, custom design tokens, and reusable component patterns.",
    content: `<h2>The Tailwind Trap Most Developers Fall Into</h2>
<p>Tailwind CSS is polarizing because most developers use it wrong. They see utility classes and think it means copy-pasting 30 classes onto every button. This leads to bloated, unmaintainable HTML that makes senior developers cringe. The correct approach is to use Tailwind as a design token engine — not as inline styles on steroids.</p>

<h2>Step 1: Define Your Design Tokens in tailwind.config.js</h2>
<p>Your first step should always be configuring your design system in <code>tailwind.config.js</code>. Define your brand colors using a consistent naming convention, your typography scale, spacing scale, and border radius values. This creates a shared visual language across your entire application:</p>
<pre><code>theme: {
  extend: {
    colors: {
      primary: "#00D4AA",
      "primary-dark": "#00A884",
      surface: "#0A0A0A",
    },
    fontFamily: {
      display: ["'Space Grotesk'", "sans-serif"],
      body: ["'Inter'", "sans-serif"],
    },
  },
}</code></pre>

<h2>Step 2: Create Component Abstractions</h2>
<p>Never repeat the same combination of utility classes across multiple files. If you have a button style that appears in 10 places, abstract it into a React component. The component owns its styles; callers just use the component. This is the same principle as a CSS component class, but enforced by your component architecture.</p>

<h2>Step 3: Strategic Use of @apply for Global Patterns</h2>
<p>For truly global patterns (prose styles for blog content, form input resets, custom scrollbar styles), the <code>@apply</code> directive in your global CSS file is perfectly appropriate. Use it sparingly for things that cannot be encapsulated in a React component.</p>

<h2>Step 4: Implement Responsive Variants Systematically</h2>
<p>Define your responsive breakpoints in your config and always build mobile-first. The pattern <code>class mobile:tablet:desktop</code> should be consistent across your application. Never add responsive variants reactively — plan them from the start.</p>

<h2>Conclusion</h2>
<p>Tailwind is not a shortcut; it is a system. Developers who treat it as a system build beautiful, consistent, maintainable UIs. Those who treat it as a convenience end up with an unmaintainable mess of classes. Architecture first, utilities second.</p>`,
    tags: ["Tailwind CSS", "CSS", "Design Systems", "Frontend", "UI/UX", "React"],
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&auto=format&fit=crop&q=80",
    author: "Suleman Zaheer",
    views: 0
  },
  {
    title: "How to Land Your First International Freelance Client from Pakistan",
    slug: "land-first-international-freelance-client-pakistan",
    excerpt: "A practical, battle-tested guide for Pakistani developers to stop competing on price, build a premium personal brand, and consistently attract high-paying international freelance contracts.",
    content: `<h2>Why Most Pakistani Freelancers Stay Stuck at $5/Hour</h2>
<p>The brutal truth about the freelance market from Pakistan is that most developers self-select into the low-price race. They open an Upwork profile, set their rate at $10/hour because they're scared of rejection, and then wonder why they only get clients who are looking for the cheapest possible option. Low prices attract bad clients. This is one of the most consistent truths in freelancing.</p>

<h2>The Value Positioning Shift</h2>
<p>Stop selling hours. Start selling outcomes. A client doesn't want a "React developer for $15/hour." They want "their e-commerce conversion rate to increase by 30%." When you frame your service around business outcomes instead of technical inputs, you immediately differentiate yourself from 95% of profiles on Upwork and Fiverr.</p>

<h2>Your Portfolio is Your Most Powerful Sales Tool</h2>
<p>Before you apply to a single job, build a world-class personal portfolio. This is not optional. An international client who finds your portfolio website and sees a fast, visually stunning, technically impressive site has already decided they want to work with you before they read a single word. Your personal website is the most powerful proposal you will ever write.</p>

<p>Build it with Next.js. Deploy it on Firebase or Vercel. Make it fast (90+ Lighthouse score). Add real case studies with before/after metrics, not just screenshots.</p>

<h2>Communication is the True Differentiator</h2>
<p>Pakistani developers are technically excellent. The gap that consistently holds them back is professional English communication. Practice writing clear, concise, professional proposals. Respond to messages quickly. Set and meet deadlines. These behaviours — which are actually just professionalism — are shockingly rare on freelancing platforms and are your true competitive advantage.</p>

<h2>Platforms and Niches</h2>
<p>Don't try to be on every platform. Master one. Upwork is the highest-value platform for long-term contracts. Invest 90 days in building your Upwork profile properly before judging the platform. Pick a specific niche — "MERN Stack developer for SaaS startups" or "Next.js developer specializing in e-commerce" — and own it completely.</p>

<h2>Conclusion</h2>
<p>The path from zero to a consistent $3,000/month freelance income takes 6-18 months of disciplined effort. It is not easy, but it is completely achievable for any competent developer in Pakistan who commits to positioning themselves as a premium service provider rather than a commodity.</p>`,
    tags: ["Freelancing", "Career", "Pakistan Tech", "Business", "Upwork", "Web Development"],
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    author: "Suleman Zaheer",
    views: 0
  },
  {
    title: "The Psychology of UI/UX: Building Interfaces Users Actually Love",
    slug: "psychology-ux-design-interfaces-users-love",
    excerpt: "Great code is useless if users abandon your app in frustration. Understand the cognitive psychology principles behind elite UI/UX design to build applications that convert and retain users.",
    content: `<h2>Why Technically Perfect Apps Fail</h2>
<p>I've seen zero-bug applications with beautiful codebases that users hated. I've seen poorly written spaghetti code that millions of people used daily. The difference was entirely in the user experience. Technical excellence is the foundation; UX is the building. You need both, but only one of them determines whether users come back.</p>

<h2>Cognitive Load: The Enemy of Good UX</h2>
<p>Every element you add to a screen — every button, every label, every dropdown — adds to the user's cognitive load. Our working memory can hold approximately 7 items at once (Miller's Law). When you exceed this with complex interfaces, users feel overwhelmed and abandon the task. The best UX designers remove elements, not add them. Every addition must justify its existence.</p>

<h2>Fitts's Law: Making Clickable Things Actually Clickable</h2>
<p>Fitts's Law states that the time to hit a target is proportional to its distance and inversely proportional to its size. In practical terms: make your primary call-to-action buttons large and centrally placed. Never put the button your user needs to click in the corner of the screen at 16px. This seems obvious, yet countless apps violate it daily.</p>

<h2>Visual Hierarchy: Guiding the Eye</h2>
<p>Users don't read web pages; they scan them. Eye-tracking studies show users follow predictable patterns (F-pattern for text content, Z-pattern for visual layouts). Design with this in mind. Your most important information should be at the top-left. Your primary action should be the most visually prominent element. Color contrast, font weight, and size create hierarchy that guides users without them realizing it.</p>

<h2>Micro-Animations: The Emotional Layer</h2>
<p>Micro-animations are the difference between software that feels sterile and software that feels alive. A button that subtly depresses on click, a form field that smoothly highlights on focus, a list that animates items in — these millisecond-length interactions provide feedback that builds trust and delight. Use Framer Motion in React applications to implement these without sacrificing performance.</p>

<h2>The Dark Patterns Trap</h2>
<p>Dark patterns are UI tricks designed to manipulate users into actions they didn't intend — hidden unsubscribe buttons, pre-checked opt-in boxes, misleading pricing. They work short-term and destroy trust permanently. Build interfaces that respect your users' time and intelligence. This is both ethically right and strategically smarter — trusted products retain users.</p>

<h2>Conclusion</h2>
<p>The best developers understand that they are not just writing code; they are designing experiences. Invest in learning UX psychology. Read Nielsen Norman Group's research. Study great apps. The developer who combines technical excellence with UX empathy is the developer every company wants to hire.</p>`,
    tags: ["UI/UX", "Design", "User Psychology", "Frontend", "Product Design", "React"],
    coverImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&auto=format&fit=crop&q=80",
    author: "Suleman Zaheer",
    views: 0
  }
];

async function seedBlogs() {
  console.log('🚀 Starting blog seeding...\n');
  const blogsRef = collection(db, 'blogs');
  let seededCount = 0;
  let skippedCount = 0;

  for (const blog of blogs) {
    // Check if slug already exists
    const q = query(blogsRef, where('slug', '==', blog.slug));
    const existing = await getDocs(q);

    if (!existing.empty) {
      console.log(`⏭️  Skipping (already exists): "${blog.title}"`);
      skippedCount++;
      continue;
    }

    await addDoc(blogsRef, {
      ...blog,
      createdAt: new Date(),
      publishedAt: new Date(),
      updatedAt: new Date(),
    });
    seededCount++;
    console.log(`✅ Added: "${blog.title}"`);
  }

  console.log(`\n✨ Done! ${seededCount} blogs added, ${skippedCount} skipped.`);
  process.exit(0);
}

seedBlogs().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
