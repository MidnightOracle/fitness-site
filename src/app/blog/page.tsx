'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { blogPosts, type BlogPost } from './data';

const POSTS_PER_PAGE = 9;

function BlogContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();

  // Get unique categories from blog posts
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  // Handle category from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

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
            defaultValue={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="px-6 py-3 rounded-full bg-black/20 border border-gray-700 focus:border-[#bca16b] focus:outline-none text-white"
            defaultValue={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
        {paginatedPosts.map((post) => (
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
          <Link
            href={`?page=${Math.max(currentPage - 1, 1)}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}`}
            className={`px-4 py-2 rounded-full ${
              currentPage === 1
                ? 'bg-black/20 text-white cursor-not-allowed'
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
          >
            Previous
          </Link>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`?page=${pageNum}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}`}
              className={`px-4 py-2 rounded-full ${
                pageNum === currentPage
                  ? 'bg-[#bca16b] text-black'
                  : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              {pageNum}
            </Link>
          ))}
          <Link
            href={`?page=${Math.min(currentPage + 1, totalPages)}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}`}
            className={`px-4 py-2 rounded-full ${
              currentPage === totalPages
                ? 'bg-black/20 text-white cursor-not-allowed'
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
          >
            Next
          </Link>
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