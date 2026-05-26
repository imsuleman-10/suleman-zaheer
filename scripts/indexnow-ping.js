import https from 'https';

const host = 'suleman-zaheer.vercel.app';
const key = '66d27f4ee0ae43e381cbf88082fcfd01';
const keyLocation = `https://${host}/${key}.txt`;

const urls = [
  `https://${host}/`,
  `https://${host}/about`,
  `https://${host}/projects`,
  `https://${host}/blog`,
  `https://${host}/contact`,
  `https://${host}/cv`,
  `https://${host}/gallery-seo`,
  `https://${host}/poetry`,
  // Blogs
  `https://${host}/blog/scaling-mern-stack-enterprise`,
  `https://${host}/blog/nextjs-server-components-seo-blueprint`,
  `https://${host}/blog/cs-student-production-code-roadmap`,
  `https://${host}/blog/firebase-vs-supabase-2025-comparison`,
  `https://${host}/blog/tailwind-css-scalable-design-system`,
  `https://${host}/blog/land-first-international-freelance-client-pakistan`,
  `https://${host}/blog/psychology-ux-design-interfaces-users-love`,
  `https://${host}/blog/react-performance-optimization-usememo-usecallback`,
  `https://${host}/blog/building-secure-rest-apis-nodejs`,
  // Poems
  `https://${host}/poetry/%D8%B4%D8%B1%D9%8A%D9%83%D9%90-%D8%AD%D9%8A%D8%A7%D8%AA`,
  `https://${host}/poetry/dhuein-se-ji-dar-raha-hai`,
  `https://${host}/poetry/%D9%85-%D8%B3%D9%8A-%D9%85%D8%B3%D9%84%D9%83-%D9%88-%D9%85%D8%AD%D8%A8%D8%AA`,
  `https://${host}/poetry/the-coder-at-midnight`,
  `https://${host}/poetry/watan-ki-mitti`,
  `https://${host}/poetry/between-the-lines`,
  `https://${host}/poetry/khamoshi-ki-zaban`,
  `https://${host}/poetry/raat-ki-tanhai`
];

const data = JSON.stringify({
  host: host,
  key: key,
  keyLocation: keyLocation,
  urlList: urls
});

const options = {
  hostname: 'www.bing.com',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(data)
  }
};

console.log('🚀 Pinging IndexNow (Bing/Yandex) to notify about site updates...');

const req = https.request(options, (res) => {
  console.log(`📡 Status Code: ${res.statusCode}`);
  
  res.on('data', (d) => {
    process.stdout.write(d);
  });

  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log('\n✅ IndexNow Notification Sent Successfully!');
  } else {
    console.log('\n❌ IndexNow Notification Failed.');
  }
});

req.on('error', (error) => {
  console.error('\n❌ Error pinging IndexNow:', error);
});

req.write(data);
req.end();
