// src/app/components/BlogDetailComponent.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from "lucide-react";
import { BlogPostDetail } from "@/types";
import { parseMarkdown } from "@/utils/blog";

interface BlogDetailComponentProps {
  slug: string;
  post: BlogPostDetail | null;
  relatedPosts?: BlogPostDetail[];
}

export default function BlogDetailComponent({
  post,
  relatedPosts = [],
}: BlogDetailComponentProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(!post);

  useEffect(() => {
    if (post) {
      setIsLoading(false);
    }
  }, [post]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (!post) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("URL copied to clipboard!");
      } catch (err) {
        console.log("Error copying to clipboard:", err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-8"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-3">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Blog post not found
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <button
              onClick={() => router.push("/blog")}
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
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
          onClick={() => router.push("/blog")}
          className="inline-flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-6 sm:mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Blog</span>
        </button>

        {/* Article Header */}
        <header className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          {/* Category Badge */}
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors group self-start"
            >
              <Share2
                size={16}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Share</span>
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm flex items-center space-x-1"
              >
                <Tag size={12} />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="mb-12 sm:mb-16">
          <div
            className="prose prose-lg prose-slate dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-slate-100
              prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 dark:prose-strong:text-slate-100
              prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-slate-900 dark:prose-code:text-slate-100
              prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700 prose-pre:overflow-x-auto
              prose-ul:text-slate-700 dark:prose-ul:text-slate-300
              prose-ol:text-slate-700 dark:prose-ol:text-slate-300
              prose-li:text-slate-700 dark:prose-li:text-slate-300
              prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/20 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{
              __html: parseMarkdown(post.content),
            }}
          />
        </div>

        {/* Article Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 pt-8 sm:pt-12">
          {/* Share Section */}
          <div className="mb-8 sm:mb-12">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Share this article
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 rounded-lg transition-colors"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6 sm:mb-8">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-6 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                    onClick={() => router.push(`/blog/${relatedPost.slug}`)}
                  >
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">
                          {relatedPost.category}
                        </span>
                      </div>

                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight text-sm sm:text-base">
                        {relatedPost.title}
                      </h4>

                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>{relatedPost.readTime} min</span>
                        </div>
                        <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                          <span>Read</span>
                          <ArrowLeft size={12} className="rotate-180" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </footer>
      </article>
    </div>
  );
}
