// src/app/blog/[slug]/page.tsx - Updated to use dynamic API
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { loadBlogPostBySlug } from '@/constants/blogData';
import { BlogPostDetail } from '@/types';
import BlogDetailSimple from '@/app/components/BlogDetailSimple';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPostData = async () => {
      if (!slug) {
        setError('No slug provided');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`Loading blog post with slug: ${slug}`);
        const foundPost = await loadBlogPostBySlug(slug);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };

    loadPostData();
  }, [slug]);

  // Show loading state
  if (isLoading) {
    return (
      <BlogDetailSimple 
        post={null}
        isLoading={true}
      />
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen pt-16 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="space-y-6">
            <div className="text-6xl">❌</div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Error Loading Article
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BlogDetailSimple 
      post={post}
      isLoading={false}
    />
  );
}