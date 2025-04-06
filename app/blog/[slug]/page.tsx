'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { blogPosts } from '../data';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    slug: string;
  };
};

// Helper function to generate table of contents
function generateTOC(content: string) {
  const headings = content.match(/<h2>(.*?)<\/h2>/g) || [];
  return headings.map(heading => heading.replace(/<\/?h2>/g, ''));
}

export default async function BlogPostPage({ params }: Props): Promise<JSX.Element> {
  const post = blogPosts.find(post => post.slug === params.slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const tableOfContents = generateTOC(post.content);

  return (
    <ClientPage post={post} relatedPosts={relatedPosts} tableOfContents={tableOfContents} />
  );
}

function ClientPage({
  post,
  relatedPosts,
  tableOfContents,
}: {
  post: any;
  relatedPosts: any[];
  tableOfContents: string[];
}) {
  const [activeHeading, setActiveHeading] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowScrollTop(scrollPosition > windowHeight);

      if (articleRef.current) {
        const headings = articleRef.current.querySelectorAll('h2');
        for (const heading of headings) {
          const { top } = heading.getBoundingClientRect();
          if (top > 0 && top < windowHeight / 2) {
            setActiveHeading(heading.textContent || '');
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(text)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        toast({
          title: 'Link copied!',
          description: 'The article URL has been copied to your clipboard.',
        });
        break;
    }
  };

  return (
    <main className="text-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-16">
            <div className="max-w-[800px]">
              <div className="flex gap-4 text-sm text-gray-300 mb-4">
                <Link
                  href={`/blog?category=${post.category}`}
                  className="bg-[#bca16b] text-black px-4 py-1 rounded-full hover:bg-[#d4b87d]"
                >
                  {post.category}
                </Link>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{post.title}</h1>
              <p className="text-xl text-gray-300">{post.excerpt}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content with Table of Contents */}
      <article className="py-20" ref={articleRef}>
        <div className="container mx-auto px-4 md:px-16">
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            <div
              className="prose prose-lg prose-invert prose-gold max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Sidebar */}
            <div className="lg:sticky lg:top-32 h-fit space-y-8">
              {tableOfContents.length > 0 && (
                <div className="bg-[#111] rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
                  <nav>
                    <ul className="space-y-2">
                      {tableOfContents.map((heading, index) => (
                        <li key={index}>
                          <a
                            href={`#${heading.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`block text-sm py-1 transition-colors ${
                              activeHeading === heading
                                ? 'text-[#bca16b]'
                                : 'text-gray-400 hover:text-[#bca16b]'
                            }`}
                          >
                            {heading}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              {/* Share Widget */}
              <div className="bg-[#111] rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Share this article</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['twitter', 'facebook', 'linkedin', 'copy'].map((platform) => (
                    <Button
                      key={platform}
                      variant="outline"
                      className="w-full border-[#bca16b] text-[#bca16b] hover:bg-[#bca16b] hover:text-black"
                      onClick={() => handleShare(platform)}
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-[#111]">
          <div className="container mx-auto px-4 md:px-16">
            <h2 className="text-3xl font-bold mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {relatedPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-[250px] rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex gap-4 text-sm text-gray-400 mb-3">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#bca16b] mb-3 group-hover:text-[#d4b87d] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-2">{post.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-[#bca16b] hover:bg-[#d4b87d] text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        ↑
      </button>
    </main>
  );
}
