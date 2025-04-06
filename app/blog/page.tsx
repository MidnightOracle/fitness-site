'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { blogPosts, type BlogPost } from './data';

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
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
    <main className="text-white pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#111]">
        <div className="container mx-auto px-4 md:px-16">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-gray-300 mb-12">
              Discover insights, tips, and stories about fitness, health, and wellness.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-6 py-4 bg-black/50 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bca16b]"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-16">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                setSelectedCategory('');
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === ''
                  ? 'bg-[#bca16b] text-black'
                  : 'bg-black/50 text-white hover:bg-[#bca16b] hover:text-black'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#bca16b] text-black'
                    : 'bg-black/50 text-white hover:bg-[#bca16b] hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-16">
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {paginatedPosts.map((post) => (
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
                      <h2 className="text-xl font-bold text-[#bca16b] mb-3 group-hover:text-[#d4b87d] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 line-clamp-2">{post.excerpt}</p>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-20">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-black/50 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#bca16b] hover:text-black transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-[#bca16b] text-black'
                          : 'bg-black/50 text-white hover:bg-[#bca16b] hover:text-black'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-black/50 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#bca16b] hover:text-black transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">No posts found</h2>
              <p className="text-gray-400">
                Try adjusting your search or category filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 