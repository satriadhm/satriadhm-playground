// src/app/components/BlogPostCard.tsx
'use client';

import { Clock, User, Calendar, Tag } from 'lucide-react';
import { BlogPost } from '@/types';

interface BlogPostCardProps {
  post: BlogPost;
  onClick: () => void;
  variant?: 'featured' | 'compact' | 'list';
}

export default function BlogPostCard({ post, onClick, variant = 'list' }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Featured variant untuk hero post
  if (variant === 'featured') {
    return (
      <article 
        className="border-b border-slate-100 dark:border-slate-800 pb-16 sm:pb-20 cursor-pointer group"
        onClick={onClick}
      >
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1">
                <User size={14} />
                <span className="font-medium">{post.author}</span>
              </div>
              <span className="hidden sm:inline">·</span>
              <div className="flex items-center space-x-1">
                <Tag size={14} />
                <span className="font-medium">{post.category}</span>
              </div>
              <span className="hidden sm:inline">·</span>
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{formatDate(post.date)}</span>
              </div>
              <span className="hidden sm:inline">·</span>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors self-start">
              <span>Read article</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 5).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-xs sm:text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  }

  // Compact variant untuk grid
  if (variant === 'compact') {
    return (
      <article 
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300 cursor-pointer group"
        onClick={onClick}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium">
              {post.category}
            </span>
            {post.featured && (
              <span className="px-2 py-1 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 rounded text-xs font-medium">
                Featured
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
            {post.title}
          </h3>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{formatDateShort(post.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{post.readTime} min</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="px-2 py-1 text-slate-500 dark:text-slate-500 text-xs">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Default list variant
  return (
    <article className="group cursor-pointer" onClick={onClick}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
        <div className="flex-shrink-0 text-sm text-slate-400 dark:text-slate-600 sm:pt-1 sm:w-16 order-2 sm:order-1">
          {formatDateShort(post.date)}
        </div>
        
        <div className="flex-grow space-y-3 order-1 sm:order-2">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
            {post.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="px-2 sm:px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-xs">
              {post.category}
            </span>
            <div className="flex items-center space-x-1">
              <Clock size={12} />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <User size={12} />
              <span>{post.author}</span>
            </div>
          </div>
          
          {/* Tags preview */}
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 text-slate-500 dark:text-slate-500 text-xs">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}