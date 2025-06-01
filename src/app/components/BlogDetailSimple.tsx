// src/app/components/BlogDetailSimple.tsx
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

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
            <div className="space-y-3">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Article Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            The article you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Blog</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-slate-950">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Back Button */}
        <button
          onClick={() => router.push('/blog')}
          className="inline-flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </button>

        {/* Article Header */}
        <header className="mb-12 space-y-6">
          {/* Category */}
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
              {post.category}
            </span>
            {post.featured && (
              <span className="px-3 py-1 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <Calendar size={16} />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock size={16} />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="mb-12">
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-headings:font-bold
              prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 dark:prose-strong:text-slate-100
              prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700
              prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/20 prose-blockquote:pl-6 prose-blockquote:py-4"
            dangerouslySetInnerHTML={{ 
              __html: parseMarkdown(post.content) 
            }}
          />
        </div>

        {/* Simple Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Published on {formatDate(post.date)} by {post.author}
            </div>
            <button
              onClick={() => router.push('/blog')}
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm"
            >
              <ArrowLeft size={14} />
              <span>More Articles</span>
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}