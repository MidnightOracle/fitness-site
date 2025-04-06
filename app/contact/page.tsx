'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll events to update navbar background and progress
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
      
      // Show/hide scroll to top button
      setShowScrollTop(scrollPosition > windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-black text-white">
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
        isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : 'bg-black'
      }`}>
        <div className="container mx-auto px-16 py-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#bca16b] transition-colors hover:text-[#d4b87d]">Logo</Link>
          <nav>
            <ul className="flex gap-8">
              <li><Link href="/" className="text-lg transition-colors hover:text-[#bca16b]">Home</Link></li>
              <li><Link href="/#services" className="text-lg transition-colors hover:text-[#bca16b]">Services</Link></li>
              <li><Link href="/#gallery" className="text-lg transition-colors hover:text-[#bca16b]">Gallery</Link></li>
              <li><Link href="/#blog" className="text-lg transition-colors hover:text-[#bca16b]">Blog</Link></li>
              <li><Link href="/#about" className="text-lg transition-colors hover:text-[#bca16b]">About Me</Link></li>
              <li><Link href="/contact" className="text-lg transition-colors hover:text-[#bca16b]">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[#bca16b] hover:bg-[#d4b87d] text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        ↑
      </button>

      {/* Add padding to account for fixed header */}
      <div className="pt-24">
        <section className="bg-black py-20">
          <div className="container mx-auto px-4 md:px-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left side - Form */}
              <div className="bg-[#111] p-8 rounded-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Book Your Session</h1>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-lg mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 bg-black border border-[#333] rounded-lg focus:outline-none focus:border-[#bca16b]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-lg mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 bg-black border border-[#333] rounded-lg focus:outline-none focus:border-[#bca16b]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-lg mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 bg-black border border-[#333] rounded-lg focus:outline-none focus:border-[#bca16b]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-lg mb-2">Service Interest</label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-3 bg-black border border-[#333] rounded-lg focus:outline-none focus:border-[#bca16b]"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="private">Private Training</option>
                      <option value="golf">Golf Fitness</option>
                      <option value="aqua">Aqua Training</option>
                      <option value="senior">Senior Fitness</option>
                      <option value="stretch">Therapeutic Stretch</option>
                      <option value="dance">Dance Fit</option>
                      <option value="yoga">Yoga</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-lg mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-black border border-[#333] rounded-lg focus:outline-none focus:border-[#bca16b]"
                      required
                    ></textarea>
                  </div>
                  <Button className="w-full bg-[#bca16b] hover:bg-[#d4b87d] text-black text-xl py-6 rounded-full">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Right side - Contact Info */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Get in Touch</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[#bca16b] text-xl mb-2">Phone</h3>
                    <a href="tel:+1-386-569-3781" className="text-2xl md:text-3xl font-bold hover:text-[#bca16b]">
                      +1-386-569-3781
                    </a>
                  </div>
                  <div>
                    <h3 className="text-[#bca16b] text-xl mb-2">Location</h3>
                    <p className="text-xl">Palm Coast, Florida</p>
                  </div>
                  <div>
                    <h3 className="text-[#bca16b] text-xl mb-2">Hours</h3>
                    <p className="text-xl">Monday - Friday: 6am - 8pm<br />
                    Saturday: 7am - 2pm<br />
                    Sunday: Closed</p>
                  </div>
                  <div className="relative h-[300px] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/map.jpg"
                      alt="Location map"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 