'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';

// ✅ Service Card Component
const ServiceCard = ({ title, description, image }: { title: string; description: string; image: string }) => (
  <div className="relative group">
    <div className="overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="w-full h-[200px] object-cover"
      />
    </div>
    <div className="p-4 bg-[#bca16b] mt-0 rounded-lg">
      <h3 className="font-medium text-[18px] text-black mb-2">{title}</h3>
      <p className="text-[14px] text-black/90 leading-tight">{description}</p>
    </div>
  </div>
);

// ✅ Blog Card Component
const BlogCard = ({ image, title, excerpt }: { image: string; title: string; excerpt: string }) => (
  <Card className="overflow-hidden bg-black border-0">
    <Image
      src={image}
      alt={title}
      width={400}
      height={300}
      className="w-full h-[200px] object-cover"
    />
    <CardContent className="p-4">
      <h3 className="font-medium text-[18px] text-white mb-2">{title}</h3>
      <p className="text-[14px] text-gray-300 mb-3">{excerpt}</p>
      <Button variant="link" className="text-[#bca16b] hover:text-[#d4b87d] p-0 h-auto text-[14px]">Read more →</Button>
    </CardContent>
  </Card>
);

export default function FitnessSite() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  const services = [
    {
      title: "Yoga/Golf Fitness",
      description: "Build strength, flexibility, and balance to move better on and off the course.",
      image: "/images/yoga-golf.jpg"
    },
    {
      title: "Aqua Fitness",
      description: "A refreshing full-body workout using water resistance in a social and safe environment.",
      image: "/images/aqua-fitness.jpg"
    },
    {
      title: "Dance Fit",
      description: "Fun cardio, improve coordination and hit your mood - all while dancing to fun music!",
      image: "/images/dance-fit.jpg"
    }
  ];

  const blogPosts = [
    {
      image: "/images/nutrition.jpg",
      title: "Blog title heading will go here",
      excerpt: "Short description of the blog post will go here. Keep it brief and engaging."
    },
    {
      image: "/images/yoga.jpg",
      title: "Blog title heading will go here",
      excerpt: "Short description of the blog post will go here. Keep it brief and engaging."
    },
    {
      image: "/images/swimming.jpg",
      title: "Blog title heading will go here",
      excerpt: "Short description of the blog post will go here. Keep it brief and engaging."
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* Header/Nav */}
      <header className="flex justify-between items-center px-6 py-4">
        <div className="text-[#bca16b] text-[24px]">Logo</div>
        <nav className="hidden md:flex gap-8">
          {['Home', 'Services', 'Gallery', 'Blog', 'About Me', 'Contact'].map((item) => (
            <a key={item} href="#" className="text-[#bca16b] hover:text-[#d4b87d] text-[16px]">{item}</a>
          ))}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center">
        <Image
          src="/images/hero.jpg"
          alt="Meditation at sunset"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-[600px]">
            <h1 className="text-[48px] font-bold leading-tight mb-4">
              Empowering<br />You to a<br />Healthier,<br />Stronger Life
            </h1>
            <p className="text-[18px] text-gray-200 mb-8 max-w-[400px]">
              Join group classes or book a private session to move, feel, and live better in Palm Coast.
            </p>
            <Button className="bg-[#bca16b] hover:bg-[#d4b87d] text-black rounded-full text-[16px] px-8 py-2">
              Book a Session →
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#bca16b] py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-[32px] font-bold text-center text-black mb-12">Feel Good, Move Better</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
          
          {/* Specialized Sessions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-[#d4b87d] border-0 rounded-lg">
              <CardContent className="p-6">
                <h3 className="text-[24px] font-medium text-black mb-3">Private Training</h3>
                <p className="text-[14px] text-black/90">
                  1-on-1 sessions customized to your personal fitness goals, whether you're new to exercise, 
                  recovering from injury, looking to improve specific skills.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#d4b87d] border-0 rounded-lg">
              <CardContent className="p-6">
                <h3 className="text-[24px] font-medium text-black mb-3">Specialized Formats</h3>
                <p className="text-[14px] text-black/90">
                  Golf Fitness, Aqua Personal Training, Senior Fitness Programs - specialized training formats 
                  to help you move better and feel stronger.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-[32px] font-bold text-center mb-12">Image Gallery</h2>
          <div className="relative rounded-lg overflow-hidden">
            <div className="flex">
              <Image
                src="/images/gallery-1.jpg"
                alt="Fitness class"
                width={1200}
                height={600}
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {[0,1,2].map((dot) => (
                <button
                  key={dot}
                  className={`w-2 h-2 rounded-full ${currentSlide === dot ? 'bg-[#bca16b]' : 'bg-white/50'}`}
                  onClick={() => setCurrentSlide(dot)}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#bca16b] hover:bg-[#d4b87d] w-10 h-10 rounded-full flex items-center justify-center text-black"
            >
              ←
            </button>
            <button 
              onClick={() => setCurrentSlide(prev => Math.min(2, prev + 1))}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#bca16b] hover:bg-[#d4b87d] w-10 h-10 rounded-full flex items-center justify-center text-black"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-[32px] font-bold text-center mb-12">Flow, Strength & Balance</h2>
          <p className="text-center text-[16px] text-gray-400 mb-8">Your go-to source for practical advice, mindful movement, and healthy living.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <BlogCard key={i} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-[#bca16b]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="md:w-1/3">
              <Image
                src="/images/victoria.jpg"
                alt="Victoria"
                width={400}
                height={400}
                className="rounded-lg w-full"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-[32px] font-bold text-black mb-6">Hi, I'm Victoria</h2>
              <p className="text-[16px] text-black/90 mb-4">
                A certified personal trainer with 20+ years experience helping people move better and live healthier. 
                I specialize in creating fitness fun and accessible for everyone, regardless of age or fitness level.
              </p>
              <p className="text-[16px] text-black/90">
                My passion is empowering individuals of all ages to achieve their health journey. 
                Join me, and let's work on your fitness aspirations together!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-[32px] font-bold mb-4">Ready to get started?</h2>
          <p className="text-[16px] mb-2">Call me at</p>
          <a href="tel:+1-386-569-3781" className="text-[#bca16b] text-[24px] font-bold block hover:text-[#d4b87d]">
            +1-386-569-3781
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#bca16b]/20 py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="text-[#bca16b] text-[24px]">Logo</div>
            <nav className="flex gap-6">
              {['Home', 'Services', 'Gallery', 'Blog', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-[#bca16b] hover:text-[#d4b87d] text-[14px]">{item}</a>
              ))}
            </nav>
          </div>
          <div className="mt-8 text-center">
            <p className="text-[14px] text-gray-400">© 2024 All rights reserved. Privacy Policy | Terms & Conditions</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 