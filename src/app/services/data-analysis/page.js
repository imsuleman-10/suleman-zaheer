import Link from 'next/link';

export const metadata = {
  title: 'Data Analysis Services | Suleman Zaheer – Lahore, Pakistan',
  description: 'Hire Suleman Zaheer for professional Data Analysis, Business Intelligence, and Predictive Modeling in Lahore. Python, Pandas, SQL, Power BI, Tableau. Transform raw data into actionable business insights. Starting PKR 50,000.',
  keywords: [
    'Data Analyst Lahore', 'Data Analysis Services Pakistan', 'Hire Data Analyst Lahore',
    'Business Intelligence Lahore', 'Python Data Analysis Pakistan', 'Power BI Developer Lahore',
    'Tableau Developer Pakistan', 'Predictive Modeling Lahore', 'SQL Database Analyst Pakistan',
    'Data Scientist Pakistan', 'Business Growth Analytics Lahore'
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/services/data-analysis' },
  openGraph: {
    title: 'Data Analysis & Business Intelligence Services | Suleman Zaheer – Lahore',
    description: 'Professional Data Analysis and Business Intelligence services by Suleman Zaheer in Lahore. Python, Power BI, SQL, and predictive modeling for data-driven business decisions.',
    url: 'https://suleman-zaheer.vercel.app/services/data-analysis',
    siteName: 'Suleman Zaheer Official Portfolio',
    type: 'website',
    locale: 'en_PK',
    images: [{ url: '/assets/suleman-zaheer-full-stack-developer.jpg', width: 1200, height: 630, alt: 'Data Analysis Services by Suleman Zaheer – Lahore, Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Analysis & BI Services | Suleman Zaheer | Lahore',
    description: 'Professional Data Analysis and Business Intelligence by Suleman Zaheer in Lahore. Python, Power BI, SQL. Data-driven decisions.',
    images: ['/assets/suleman-zaheer-full-stack-developer.jpg'],
    creator: '@imsuleman_10',
  },
};

export default function DataAnalysisPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://suleman-zaheer.vercel.app/services/data-analysis#service',
      name: 'Data Analysis & Business Intelligence Services',
      description: 'Professional Data Analysis, Business Intelligence, and Predictive Modeling services in Lahore, Pakistan. Using Python (Pandas, NumPy, Scikit-learn), SQL, Power BI, and Tableau to transform raw business data into strategic insights.',
      url: 'https://suleman-zaheer.vercel.app/services/data-analysis',
      provider: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        url: 'https://suleman-zaheer.vercel.app',
        telephone: '+923285778715',
        email: 'samstacktechs@gmail.com',
        address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' }
      },
      serviceType: 'Data Analysis and Business Intelligence',
      areaServed: [{ '@type': 'Country', name: 'Pakistan' }, { '@type': 'Country', name: 'United States' }],
      offers: { '@type': 'Offer', priceRange: 'PKR 50,000 - PKR 200,000+', priceCurrency: 'PKR', availability: 'https://schema.org/InStock' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' },
        { '@type': 'ListItem', position: 3, name: 'Data Analysis', item: 'https://suleman-zaheer.vercel.app/services/data-analysis' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What does a Data Analyst do for a business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Data Analyst collects, cleans, and analyzes raw business data to identify patterns, trends, and anomalies. For businesses, this translates into actionable insights like identifying your highest-margin products, predicting future sales demand, optimizing supply chain costs, understanding customer churn, and making evidence-based decisions rather than intuition-based ones.'
          }
        },
        {
          '@type': 'Question',
          name: 'What tools does Suleman Zaheer use for Data Analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer uses Python (Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn) for data processing and machine learning, SQL (PostgreSQL, MySQL) for database querying, Power BI and Tableau for interactive business dashboards, and Jupyter Notebooks for exploratory data analysis and reporting.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much do Data Analysis services cost in Lahore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Data Analysis services by Suleman Zaheer start from PKR 50,000 for basic analysis and dashboard creation, and scale to PKR 200,000+ for comprehensive BI solutions with predictive modeling, automated reporting systems, and data pipeline engineering. Contact samstacktechs@gmail.com for a custom quote.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can Suleman Zaheer build Power BI dashboards for my business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Suleman Zaheer builds interactive, real-time Power BI executive dashboards that connect to your existing data sources (Excel, SQL databases, Google Sheets, ERP systems). These dashboards give business owners and managers instant visibility into sales performance, inventory levels, customer metrics, and financial KPIs.'
          }
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-gray-500 mb-10 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
        <span>/</span>
        <span className="text-primary">Data Analysis</span>
      </nav>

      <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
        Data Analysis & <span className="text-primary">Business Intelligence</span>
      </h1>
      <p className="text-gray-400 text-lg mb-10 max-w-3xl">
        Transform your raw business data into strategic competitive advantage. <strong className="text-white">Suleman Zaheer</strong> delivers Python-powered analytics, interactive Power BI dashboards, and predictive models that drive measurable business growth.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {[
          'Data Cleaning & Preprocessing', 'Exploratory Data Analysis (EDA)',
          'Power BI & Tableau Dashboards', 'Python Data Pipelines (Pandas, NumPy)',
          'Predictive Modeling (Scikit-learn)', 'Statistical Analysis & Hypothesis Testing',
          'SQL Database Optimization', 'Automated Reporting Systems'
        ].map(f => (
          <div key={f} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-primary text-lg">✓</span>
            <span className="text-gray-300 text-sm font-medium">{f}</span>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Pricing & Timeline</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div><span className="text-gray-500 text-sm">Starting Price</span><p className="text-white font-bold text-xl">PKR 50,000</p></div>
          <div><span className="text-gray-500 text-sm">Delivery Time</span><p className="text-white font-bold text-xl">1 – 4 Weeks</p></div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all">
          Hire for Data Analysis →
        </Link>
      </div>
    </div>
  );
}
