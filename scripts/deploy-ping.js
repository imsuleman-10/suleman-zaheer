/**
 * deploy-ping.js
 * Runs after every build (postbuild) to notify search engines about new content.
 *
 * How it works:
 * - IndexNow → instantly notifies Bing, Yandex, and all IndexNow-supporting engines
 * - Google discovers sitemap automatically via robots.txt (ping deprecated Jan 2024)
 *
 * This does NOT use GSC URL Inspection quota at all.
 */

import https from 'https';

const HOST = 'suleman-zaheer.vercel.app';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_KEY = '66d27f4ee0ae43e381cbf88082fcfd01';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const ALL_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/projects`,
  `https://${HOST}/blog`,
  `https://${HOST}/contact`,
  `https://${HOST}/cv`,
  `https://${HOST}/gallery-seo`,
  `https://${HOST}/poetry`,
  `https://${HOST}/author`,
  `https://${HOST}/sitemap`,
  // Blogs
  `https://${HOST}/blog/scaling-mern-stack-enterprise`,
  `https://${HOST}/blog/nextjs-server-components-seo-blueprint`,
  `https://${HOST}/blog/cs-student-production-code-roadmap`,
  `https://${HOST}/blog/firebase-vs-supabase-2025-comparison`,
  `https://${HOST}/blog/tailwind-css-scalable-design-system`,
  `https://${HOST}/blog/land-first-international-freelance-client-pakistan`,
  `https://${HOST}/blog/psychology-ux-design-interfaces-users-love`,
  `https://${HOST}/blog/react-performance-optimization-usememo-usecallback`,
  `https://${HOST}/blog/building-secure-rest-apis-nodejs`,
  // Poetry
  `https://${HOST}/poetry/%D8%B4%D8%B1%D9%8A%D9%83%D9%90-%D8%AD%D9%8A%D8%A7%D8%AA`,
  `https://${HOST}/poetry/dhuein-se-ji-dar-raha-hai`,
  `https://${HOST}/poetry/%D9%85-%D8%B3%D9%8A-%D9%85%D8%B3%D9%84%D9%83-%D9%88-%D9%85%D8%AD%D8%A8%D8%AA`,
  `https://${HOST}/poetry/the-coder-at-midnight`,
  `https://${HOST}/poetry/watan-ki-mitti`,
  `https://${HOST}/poetry/between-the-lines`,
  `https://${HOST}/poetry/khamoshi-ki-zaban`,
  `https://${HOST}/poetry/raat-ki-tanhai`,
];

function pingIndexNow() {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: ALL_URLS,
    });

    const req = https.request(
      {
        hostname: 'api.indexnow.org',
        port: 443,
        path: '/IndexNow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        const ok = res.statusCode === 200 || res.statusCode === 202;
        console.log(
          `📡 IndexNow (Bing/Yandex/etc.) → ${ok ? '✅ OK' : `⚠️  Status ${res.statusCode}`}`
        );
        resolve(res.statusCode);
      }
    );
    req.on('error', (err) => {
      console.error(`❌ IndexNow Error: ${err.message}`);
      resolve(null);
    });
    req.write(payload);
    req.end();
  });
}

(async () => {
  console.log('\n🚀 Post-deploy: Notifying search engines...');
  console.log(`   🌐 Site    : https://${HOST}`);
  console.log(`   🗺️  Sitemap : ${SITEMAP_URL}`);
  console.log(`   📋 URLs    : ${ALL_URLS.length} pages\n`);

  await pingIndexNow();

  console.log('\n📌 Google: Sitemap auto-discovered via robots.txt');
  console.log(`   Sitemap: ${SITEMAP_URL}\n`);
  console.log('✅ All done!\n');
})();
