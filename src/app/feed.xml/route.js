import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://suleman-zaheer.vercel.app';
  const currentDate = new Date().toUTCString();

  const items = [
    {
      title: 'Suleman Zaheer – Official Press Release & Entity Verification',
      link: `${baseUrl}/press`,
      description: 'Official press room and media kit for Suleman Zaheer, Lead Software Engineer and Founder of SAMStack Studio in Lahore, Pakistan.',
      pubDate: 'Sat, 24 Oct 2026 12:00:00 GMT',
      guid: `${baseUrl}/press`,
    },
    {
      title: 'Universal Bio & Digital Identity – Suleman Zaheer',
      link: `${baseUrl}/bio`,
      description: 'Verified digital identity, professional credentials, and contact hub for Pakistani software engineer Suleman Zaheer.',
      pubDate: 'Sat, 24 Oct 2026 10:00:00 GMT',
      guid: `${baseUrl}/bio`,
    },
    {
      title: 'Enterprise AI Solutions & LLM Orchestration in Pakistan',
      link: `${baseUrl}/services/ai-solutions`,
      description: 'Production-grade AI solutions, RAG knowledge bases, LLM fine-tuning, and autonomous agents engineered by Suleman Zaheer.',
      pubDate: 'Fri, 23 Oct 2026 09:00:00 GMT',
      guid: `${baseUrl}/services/ai-solutions`,
    },
    {
      title: 'Python Automation, Web Scraping & Bot Development',
      link: `${baseUrl}/services/automation-development`,
      description: 'Custom Python scripts, Playwright scraping, WhatsApp bots, and automated business workflows in Lahore and nationwide.',
      pubDate: 'Thu, 22 Oct 2026 08:00:00 GMT',
      guid: `${baseUrl}/services/automation-development`,
    },
    {
      title: 'Cross-Platform Desktop Application Development (Electron.js & React)',
      link: `${baseUrl}/services/desktop-app-development`,
      description: 'Enterprise desktop software for Windows, macOS, and Linux including POS systems, inventory management, and offline databases.',
      pubDate: 'Wed, 21 Oct 2026 07:00:00 GMT',
      guid: `${baseUrl}/services/desktop-app-development`,
    },
    {
      title: 'Full-Stack Next.js & MERN Web Development',
      link: `${baseUrl}/services/nextjs-development`,
      description: 'High-performance web architecture, microservices, and SaaS platforms engineered by Suleman Zaheer.',
      pubDate: 'Tue, 20 Oct 2026 06:00:00 GMT',
      guid: `${baseUrl}/services/nextjs-development`,
    },
    {
      title: 'Cross-Platform Mobile App Development with Flutter',
      link: `${baseUrl}/services/flutter-app-development`,
      description: 'Native-feel iOS and Android mobile applications with Firebase and custom backends.',
      pubDate: 'Mon, 19 Oct 2026 05:00:00 GMT',
      guid: `${baseUrl}/services/flutter-app-development`,
    },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Suleman Zaheer – Engineering, AI &amp; Software Updates</title>
    <link>${baseUrl}</link>
    <description>Official syndicated feed of software releases, AI architecture articles, and engineering insights by Suleman Zaheer (SAMStack Studio), Lahore, Pakistan.</description>
    <language>en-PK</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>samstacktechs@gmail.com (Suleman Zaheer)</managingEditor>
    <webMaster>samstacktechs@gmail.com (Suleman Zaheer)</webMaster>
    <image>
      <url>${baseUrl}/assets/suleman-zaheer-full-stack-developer.jpg</url>
      <title>Suleman Zaheer</title>
      <link>${baseUrl}</link>
    </image>
    ${items
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <dc:creator>Suleman Zaheer</dc:creator>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate',
    },
  });
}
