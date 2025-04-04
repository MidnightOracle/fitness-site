'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Update navbar background
      setIsScrolled(scrollPosition > 50);
      
      // Update scroll progress
      const scrolled = (scrollPosition / (docHeight - windowHeight)) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation and smooth scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Initial check for hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Set mounted to true after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if we're on a dark background page
  const isDarkBg = pathname === '/blog' || pathname.startsWith('/blog/');

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Update URL first
      window.history.pushState(null, '', `#${sectionId}`);
      // Then scroll to the element
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : isDarkBg ? 'bg-black' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 md:px-16 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-[#bca16b] transition-colors hover:text-[#d4b87d]">
              Victoria Villano Fitness
            </Link>
            <nav className="hidden md:block">
              <ul className="flex gap-8">
                <li>
                  <Link 
                    href="/" 
                    className={`text-lg font-medium transition-colors ${
                      pathname === '/' ? 'text-[#bca16b]' : 'text-white hover:text-[#bca16b]'
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#feel-good-move-better" 
                    onClick={(e) => scrollToSection(e, 'feel-good-move-better')}
                    className="text-lg font-medium text-white transition-colors hover:text-[#bca16b]"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#gallery" 
                    onClick={(e) => scrollToSection(e, 'gallery')}
                    className="text-lg font-medium text-white transition-colors hover:text-[#bca16b]"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#blog" 
                    onClick={(e) => scrollToSection(e, 'blog')}
                    className="text-lg font-medium text-white transition-colors hover:text-[#bca16b]"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#about" 
                    onClick={(e) => scrollToSection(e, 'about')}
                    className="text-lg font-medium text-white transition-colors hover:text-[#bca16b]"
                  >
                    About Me
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className={`text-lg font-medium transition-colors ${
                      pathname === '/contact' ? 'text-[#bca16b]' : 'text-white hover:text-[#bca16b]'
                    }`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
} 