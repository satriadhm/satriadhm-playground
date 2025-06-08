// src/app/components/BlogDetailSimple.tsx - Fixed version with better contrast for light mode
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { BlogPostDetail } from '@/types';
import { parseMarkdown } from '@/utils/blog';

interface BlogDetailSimpleProps {
  post: BlogPostDetail | null;
  isLoading?: boolean;
}

export default function BlogDetailSimple({ post, isLoading = false }: BlogDetailSimpleProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBackClick = () => {
    router.push('/blog');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="animate-pulse space-y-8">
            {/* Back button skeleton */}
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
            
            {/* Header skeleton */}
            <div className="space-y-4">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              <div className="flex space-x-4">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
              <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-16 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="space-y-6">
            <div className="text-6xl">📄</div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Article Not Found
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-400 max-w-md mx-auto">
              The article you are looking for does not exist or has been moved.
            </p>
            <button
              onClick={handleBackClick}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              <ArrowLeft size={16} />
              <span>Back to Blog</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-slate-950">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="inline-flex items-center space-x-2 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-8 group font-medium"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </button>

        {/* Article Header */}
        <header className="mb-12 space-y-6">
          {/* Category Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-4 py-2 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-  -400 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-slate-700 dark:text-slate-400 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <User size={16} className="text-blue-500" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <Calendar size={16} className="text-green-500" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <Clock size={16} className="text-orange-500" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Article Content - CRITICAL: Apply blog-content class here */}
        <div className="mb-16">
          <div 
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: parseMarkdown(post.content) 
            }}
          />
        </div>

        {/* Article Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Published on {formatDate(post.date)}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Written by <span className="font-medium text-slate-900 dark:text-slate-100">{post.author}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBackClick}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors font-medium"
              >
                <ArrowLeft size={16} />
                <span>More Articles</span>
              </button>
              
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    // You could add a toast notification here
                  }
                }}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        </footer>

        {/* Reading Progress Indicator */}
        <div className="fixed top-16 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 z-40">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150"
            style={{
              width: `${Math.min(
                100,
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
              )}%`
            }}
          />
        </div>
      </article>
    </div>
  );
}