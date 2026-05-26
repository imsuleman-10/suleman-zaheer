import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Instagram, Facebook, Heart } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const socialLinks = [
    { icon: <Github size={20} />, url: 'https://github.com/imsuleman-10', label: 'Suleman Zaheer GitHub' },
    { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/suleman-zaheer-mughal', label: 'Suleman Zaheer LinkedIn' },
    { icon: <Instagram size={20} />, url: 'https://www.instagram.com/imsuleman.10/', label: 'Suleman Zaheer Instagram' },
    { icon: <Facebook size={20} />, url: 'https://web.facebook.com/Iamsuleman.10', label: 'Suleman Zaheer Facebook' },
  ];

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10" itemScope itemType="https://schema.org/WPFooter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" title="Suleman Zaheer – Official Portfolio">
              <div className="w-12 h-12 overflow-hidden rounded-xl border border-white/10 relative">
                <Image src="/assets/suleman-zaheer-logo.png" alt="Suleman Zaheer Logo" fill className="object-cover" />
              </div>
              <span className="text-2xl font-display font-bold">
                SAM<span className="text-primary italic">.</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-4 leading-relaxed">
              I am <strong className="text-white">Suleman Zaheer</strong>, a Developer and Writer based in Lahore, Pakistan.
            </p>
            <p className="text-gray-500 text-xs mb-6 leading-relaxed">
              CS Student at UET Lahore | Shahdara Town, Lahore, Pakistan
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer Navigation">
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-400 hover:text-primary transition-colors" title="Suleman Zaheer Home">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors" title="About Suleman Zaheer">About</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-primary transition-colors" title="Suleman Zaheer Projects">Projects</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-primary transition-colors" title="Suleman Zaheer Blog">Blog</Link></li>
              <li><Link href="/cv" className="text-gray-400 hover:text-primary transition-colors" title="Suleman Zaheer CV">CV / Resume</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors" title="Contact Suleman Zaheer">Contact</Link></li>
            </ul>
          </nav>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li className="text-gray-400">Full Stack Web Development</li>
              <li className="text-gray-400">MERN Stack Solutions</li>
              <li className="text-gray-400">Next.js & React Development</li>
              <li className="text-gray-400">Laravel & PHP Development</li>
              <li className="text-gray-400">REST API Architecture</li>
              <li className="text-gray-400">UI/UX Design & Consultation</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} <strong>Suleman Zaheer</strong>. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-gray-600 hover:text-primary transition-colors text-xs font-medium">
              Admin Portal
            </Link>
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              <span>Crafted by</span>
              <span className="text-primary">Suleman Zaheer</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
