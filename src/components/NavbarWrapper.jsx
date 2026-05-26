"use client";
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isCVPage = pathname === '/cv';
  const isAdminPage = pathname === '/admin' || pathname === '/login';

  if (isCVPage || isAdminPage) return null;

  return <Navbar />;
}
