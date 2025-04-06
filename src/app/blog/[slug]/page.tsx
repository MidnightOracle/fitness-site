'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { blogPosts, BlogPost } from '../data';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

function BlogPostContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <p className="text-gray-400 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blog" className="text-[#bca16b] hover:text-[#d4b87d]">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  // Generate table of contents
  const toc = post.content
    .split('\n')
    .filter(line => line.startsWith('## '))
    .map(heading => ({
      text: heading.replace('## ', ''),
      id: heading.replace('## ', '').toLowerCase().replace(/\s+/g, '-')
    }));

  // Share functionality
  const { toast } = useToast();
  const sharePost = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } catch (err) {
      toast({
        title: "Share failed",
        description: "Your browser doesn&apos;t support sharing. Please copy the URL manually."
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="relative h-[400px] mb-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[#bca16b]">{post.category}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">{post.date}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">{post.readTime} min read</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8">{post.title}</h1>
        <p className="text-xl text-gray-400 mb-12">{post.excerpt}</p>
      </div>

      {/* Content and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="bg-black/20 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Table of Contents</h3>
                <ul className="space-y-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`}
                        className="text-gray-400 hover:text-[#bca16b] transition-colors"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Share Buttons */}
            <div className="bg-black/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Share this post</h3>
              <div className="flex gap-4">
                <button
                  onClick={sharePost}
                  className="bg-[#bca16b] hover:bg-[#d4b87d] text-black px-6 py-2 rounded-full transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="max-w-4xl mx-auto mt-20">
        <h2 className="text-3xl font-bold mb-12">Related Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts
            .filter(p => p.category === post.category && p.slug !== post.slug)
            .slice(0, 3)
            .map((relatedPost) => (
              <div key={relatedPost.slug}>
                <div className="mb-6">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    width={400}
                    height={300}
                    className="w-full h-[300px] object-cover rounded-2xl"
                  />
                </div>
                <h3 className="text-[#bca16b] text-2xl font-bold mb-4">{relatedPost.title}</h3>
                <p className="text-gray-400 text-lg mb-6">{relatedPost.excerpt}</p>
                <Link 
                  href={`/blog/${relatedPost.slug}`}
                  className="text-[#bca16b] hover:text-[#d4b87d]"
                >
                  Read more →
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogPostPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20">Loading...</div>}>
      <BlogPostContent />
    </Suspense>
  );
} 