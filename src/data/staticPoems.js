// ─────────────────────────────────────────────────────────────────────────────
// STATIC POEM DATA — plain data file, safe to import anywhere.
// Firestore takes priority at runtime; this is the guaranteed fallback.
// ─────────────────────────────────────────────────────────────────────────────
export const STATIC_POEMS = [
  {
    id: 'static-p1',
    slug: 'شریکِ-حیات',
    title: 'شریکِ-حیات',
    content: `تجھ سے وابستہ ہے میری زندگی کا ہر لمحہ
تو ہی ہے میرے دل کا آرام، میری جان کا سکون

تیری آنکھوں میں ڈھونڈتا ہوں میں وہ چاند کی روشنی
جو میرے دل کے اندھیرے کو کر دے روشن و نگوں

تو ہے میری دنیا، تو ہے میرا آسمان
تیرے بغیر ادھورا ہے یہ میرا جہان`,
    type: 'Ghazal',
    language: 'Urdu',
    theme: 'محبت',
    tags: ['محبت', 'رومانس', 'جذبات'],
    romanKeywords: 'ishq, mohabbat, dil, pyar, romance, urdu ghazal',
    publishedAt: '2025-05-10T10:00:00.000Z',
    published: true,
    featured: true,
  },
  {
    id: 'static-p2',
    slug: 'dhuein-se-ji-dar-raha-hai',
    title: 'دھوئیں سے جی ڈر رہا ہے',
    content: `دھوئیں سے جی ڈر رہا ہے مرا
کہاں گئی وہ صبح کی تازگی

نہ چاند رہا، نہ تارے رہے
فقط رہی یہ بے بسی

یہ شہر جلتا رہا ساری رات
اور میں تکتا رہا خاموشی`,
    type: 'Nazm',
    language: 'Urdu',
    theme: 'اداسی',
    tags: ['اداسی', 'شہر', 'تنہائی'],
    romanKeywords: 'udaasi, tanhai, dard, gham, sorrow, loneliness',
    publishedAt: '2025-05-12T10:00:00.000Z',
    published: true,
    featured: false,
  },
  {
    id: 'static-p3',
    slug: 'م-سے-مسلک-و-محبت',
    title: 'م سے مسلک و محبت',
    content: `م سے مسلک بھی ہے، م سے محبت بھی
دونوں کو ساتھ لے کر چلنا فن ہے

جہاں ایمان ہو وہاں محبت بھی ضروری
یہ دو دریا ہیں جو ایک ہی سمندر میں گرتے ہیں`,
    type: 'Ghazal',
    language: 'Urdu',
    theme: 'عقیدہ',
    tags: ['ایمان', 'محبت', 'مسلک'],
    romanKeywords: 'maslak, mohabbat, iman, faith, love, urdu poetry',
    publishedAt: '2025-05-14T10:00:00.000Z',
    published: true,
    featured: false,
  },
  {
    id: 'static-p4',
    slug: 'the-coder-at-midnight',
    title: 'The Coder at Midnight',
    content: `The screen glows bright in the dark of night,
The room is quiet, the code feels right.
Typing fast to build something new,
Hoping the logic will pull me through.

Errors show up, red on the screen,
But I fix the bugs, making it clean.
When the code runs, and the app is done,
It feels like a quiet battle won.`,
    type: 'Poem',
    language: 'English',
    theme: 'Technology',
    tags: ['coding', 'developer life', 'midnight'],
    romanKeywords: 'coder, programmer, midnight, technology, English poem, developer',
    publishedAt: '2025-05-16T10:00:00.000Z',
    published: true,
    featured: false,
  },
  {
    id: 'static-p5',
    slug: 'watan-ki-mitti',
    title: 'وطن کی مٹی',
    content: `وطن کی مٹی میں ہے ایک خوشبو
جو دل میں رچ بس جاتی ہے

پردیس میں بیٹھ کر بھی
یہ یاد ستاتی ہے

یہ مٹی، یہ پانی، یہ ہوا
میری روح کو بلاتی ہے`,
    type: 'Nazm',
    language: 'Urdu',
    theme: 'وطن پرستی',
    tags: ['وطن', 'پاکستان', 'محبت'],
    romanKeywords: 'watan, pakistan, mitti, patriotism, desh, homeland',
    publishedAt: '2025-05-18T10:00:00.000Z',
    published: true,
    featured: false,
  },
  {
    id: 'static-p6',
    slug: 'between-the-lines',
    title: 'Between the Lines',
    content: `Behind every line of code I type,
There is a feeling hidden out of sight.
I love the logic, the neat clean flow,
Watching my ideas start to grow.

Others see only tech and screen,
But I see magic in the machine.
Even when errors make me wait,
I learn, I fix, and I create.`,
    type: 'Poem',
    language: 'English',
    theme: 'Philosophy',
    tags: ['poetry', 'code', 'philosophy', 'life'],
    romanKeywords: 'philosophy, life, poetry, code, duality, English poem',
    publishedAt: '2025-05-20T10:00:00.000Z',
    published: true,
    featured: true,
  },
  {
    id: 'static-p7',
    slug: 'khamoshi-ki-zaban',
    title: 'خاموشی کی زبان',
    content: `خاموشی بھی ایک زبان ہے
جو دل سے دل تک پہنچتی ہے

الفاظ کہاں کافی ہوتے ہیں
جب آنکھیں خود بولتی ہیں

یہ سکوت، یہ خاموشی
بعض اوقات سب سے اونچی آواز ہوتی ہے`,
    type: 'Ghazal',
    language: 'Urdu',
    theme: 'فلسفہ',
    tags: ['خاموشی', 'فلسفہ', 'جذبات'],
    romanKeywords: 'khamoshi, silence, philosophy, dil, zaban, urdu ghazal',
    publishedAt: '2025-05-22T10:00:00.000Z',
    published: true,
    featured: false,
  },
  {
    id: 'static-p8',
    slug: 'raat-ki-tanhai',
    title: 'رات کی تنہائی',
    content: `رات کی تنہائی میں جب سوچتا ہوں
تو یادوں کا ایک سیلاب آ جاتا ہے

وہ لمحے جو گزر گئے
وہ باتیں جو ان کہی رہ گئیں

اب صرف یہ چاند ہے ساتھی
اور دل کی یہ گہری خاموشی`,
    type: 'Nazm',
    language: 'Urdu',
    theme: 'یادیں',
    tags: ['رات', 'تنہائی', 'یادیں'],
    romanKeywords: 'raat, tanhai, yaadein, night, loneliness, memories',
    publishedAt: '2025-05-24T10:00:00.000Z',
    published: true,
    featured: false,
  },
];
