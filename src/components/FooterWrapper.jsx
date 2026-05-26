"use client";
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  const isCVPage = pathname === '/cv';
  const isAdminPage = pathname === '/admin' || pathname === '/login';

  if (isCVPage || isAdminPage) return null;

  return <Footer />;
}
