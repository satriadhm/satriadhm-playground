// src/app/blog/[slug]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getPostBySlug, blogPosts, loadBlogPosts } from '@/constants/blogData';
import { BlogPostDetail } from '@/types';
import BlogDetailSimple from '@/app/components/BlogDetailSimple';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPostData = async () => {
      setIsLoading(true);
      
      try {
        // Load posts if not already loaded
        if (blogPosts.length === 0) {
          await loadBlogPosts();
        }
        
        // Find the post by slug
        const foundPost = getPostBySlug(slug);
        setPost(foundPost || null);
      } catch (error) {
        console.error('Error loading post:', error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadPostData();
    }
  }, [slug]);

  return (
    <BlogDetailSimple 
      post={post}
      isLoading={isLoading}
    />
  );
}