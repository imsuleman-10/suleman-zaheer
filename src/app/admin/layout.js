// ============================================================================
// ADMIN ROUTE SEGMENT — SERVER COMPONENT LAYOUT
// Exports noindex metadata so Google never indexes the admin dashboard.
// admin/page.js is a "use client" component and CANNOT export metadata itself —
// metadata must always come from a Server Component (layout or page).
// ============================================================================

export const metadata = {
  title: 'Admin Dashboard | Suleman Zaheer',
  description: 'Private admin dashboard. Restricted access.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }) {
  return children;
}
