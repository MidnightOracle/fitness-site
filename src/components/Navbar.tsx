'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      setIsScrolled(scrollPosition > 50);
      setScrollProgress((scrollPosition / (docHeight - windowHeight)) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we're on a dark background page
  const isDarkBg = pathname === '/blog' || pathname.startsWith('/blog/');

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50"
        style={{ transform: 'translateZ(0)' }}
      >
        <div 
          className="h-full bg-[#bca16b] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header/Nav */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : isDarkBg ? 'bg-black' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 md:px-16 py-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#bca16b] transition-colors hover:text-[#d4b87d]">Logo</Link>
          <nav>
            <ul className="flex gap-8">
              <li>
                <Link 
                  href="/" 
                  className={`text-lg transition-colors ${
                    pathname === '/' ? 'text-[#bca16b]' : 'hover:text-[#bca16b]'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/#services" 
                  className="text-lg transition-colors hover:text-[#bca16b]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/#gallery" 
                  className="text-lg transition-colors hover:text-[#bca16b]"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className={`text-lg transition-colors ${
                    pathname === '/blog' || pathname.startsWith('/blog/') 
                      ? 'text-[#bca16b]' 
                      : 'hover:text-[#bca16b]'
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/#about" 
                  className="text-lg transition-colors hover:text-[#bca16b]"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`text-lg transition-colors ${
                    pathname === '/contact' ? 'text-[#bca16b]' : 'hover:text-[#bca16b]'
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
} 