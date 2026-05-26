// ============================================================================
// LOGIN ROUTE SEGMENT — SERVER COMPONENT LAYOUT
// Exports noindex metadata so Google never indexes the admin login page.
// login/page.js is a "use client" component and CANNOT export metadata itself —
// metadata must always come from a Server Component (layout or page).
// ============================================================================

export const metadata = {
  title: 'Admin Login | Suleman Zaheer',
  description: 'Secure admin login portal. Restricted access.',
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

export default function LoginLayout({ children }) {
  return children;
}
