'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { blogPosts, BlogPost } from './data';
import Image from 'next/image';
import Link from 'next/link';

function BlogContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1');
  const postsPerPage = 6;

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = search === '' || 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = category === 'all' || post.category === category;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Get unique categories
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Flow, Strength & Balance</h1>
        <p className="text-xl text-gray-400 max-w-[800px] mx-auto">
          Your go-to source for practical advice, mindful movement, and healthy living.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search articles..."
            className="flex-1 px-6 py-3 rounded-full bg-black/20 border border-gray-700 focus:border-[#bca16b] focus:outline-none text-white"
            defaultValue={search}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('search', e.target.value);
              params.set('page', '1');
              window.location.search = params.toString();
            }}
          />
          <select
            className="px-6 py-3 rounded-full bg-black/20 border border-gray-700 focus:border-[#bca16b] focus:outline-none text-white"
            defaultValue={category}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('category', e.target.value);
              params.set('page', '1');
              window.location.search = params.toString();
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
        {currentPosts.map((post) => (
          <article key={post.slug} className="bg-black/20 rounded-2xl overflow-hidden">
            <div className="relative h-64">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#bca16b]">{post.category}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{post.date}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{post.readTime} min read</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
              <p className="text-gray-400 mb-6">{post.excerpt}</p>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-[#bca16b] hover:text-[#d4b87d] transition-colors"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`?page=${pageNum}${search ? `&search=${search}` : ''}${category !== 'all' ? `&category=${category}` : ''}`}
              className={`px-4 py-2 rounded-full ${
                pageNum === page
                  ? 'bg-[#bca16b] text-black'
                  : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              {pageNum}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20">Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
} 