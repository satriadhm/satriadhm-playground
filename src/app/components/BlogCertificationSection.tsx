// src/app/components/BlogCertificationSection.tsx - Cleaned up version
"use client";

import { useState, useEffect } from "react";
import {
  ExternalLink,
  Award,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { certifications } from "@/constants/data";
import {
  loadBlogPosts,
  getFeaturedPosts,
  refreshBlogCache,
} from "@/constants/blogData";
import { BlogPost } from "@/types";
import BlogPostCard from "./BlogPostCard";

export default function BlogCertificationSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"blog" | "certifications">("blog");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Load blog posts saat komponen mount
  useEffect(() => {
    const initializeBlogPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Initializing blog posts...");
        const loadedPosts = await loadBlogPosts();

        if (loadedPosts.length === 0) {
          setError(
            "No blog posts found. Make sure markdown files exist in public/blog/"
          );
        } else {
          setPosts(loadedPosts);
          setFeaturedPosts(getFeaturedPosts());
          console.log(`Successfully loaded ${loadedPosts.length} blog posts`);
        }
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setError(
          "Failed to load blog posts. Please check the console for details."
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeBlogPosts();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshStatus("idle");

    try {
      console.log("Refreshing blog posts...");

      // Refresh the cache and reload posts
      const refreshSuccess = await refreshBlogCache();

      if (refreshSuccess) {
        const loadedPosts = await loadBlogPosts(true); // Force reload
        setPosts(loadedPosts);
        setFeaturedPosts(getFeaturedPosts());
        setRefreshStatus("success");
        setError(null);
        console.log(`Successfully refreshed ${loadedPosts.length} blog posts`);
      } else {
        throw new Error("Failed to refresh blog cache");
      }
    } catch (err) {
      console.error("Error refreshing blog posts:", err);
      setRefreshStatus("error");
      setError("Failed to refresh blog posts");
    } finally {
      setIsRefreshing(false);

      // Clear status after 3 seconds
      setTimeout(() => setRefreshStatus("idle"), 3000);
    }
  };

  const handlePostClick = (post: BlogPost) => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <section
      id="blog-certifications"
      className="py-16 sm:py-24 bg-white dark:bg-slate-950"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile Responsive */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 sm:mb-8">
            Writing & Achievements
          </h2>
          <p className="text-base sm:text-xl text-slate-700 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Thoughts on technology, career insights, and professional milestones
            along my journey as a software engineer.
          </p>
        </div>

        {/* Tab Navigation - Mobile Responsive */}
        <div className="flex justify-center mb-16 sm:mb-20">
          <div className="flex border-b border-slate-200 dark:border-slate-800 w-full max-w-md">
            <button
              onClick={() => setActiveTab("blog")}
              className={`flex-1 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all relative ${
                activeTab === "blog"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              Writing
              {activeTab === "blog" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`flex-1 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all relative ${
                activeTab === "certifications"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              Achievements
              {activeTab === "certifications" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
              )}
            </button>
          </div>
        </div>

        {/* Blog Posts Tab - Mobile Responsive */}
        {activeTab === "blog" && (
          <div className="space-y-16 sm:space-y-20">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all border font-medium ${
                  isRefreshing
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 cursor-not-allowed"
                    : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                }`}
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? "animate-spin" : ""}
                />
                <span>{isRefreshing ? "Refreshing..." : "Refresh Posts"}</span>
              </button>

              {/* Status Messages */}
              {refreshStatus === "success" && (
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 text-sm">
                  <CheckCircle size={16} />
                  <span>Successfully refreshed!</span>
                </div>
              )}
              {refreshStatus === "error" && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle size={16} />
                  <span>Failed to refresh</span>
                </div>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-700 dark:text-slate-400">
                  Loading blog posts dynamically...
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                  Reading from public/blog/ directory
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="text-center py-12">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <p className="text-red-600 dark:text-red-400 mb-4 font-medium">
                  {error}
                </p>
                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-400">
                  <p>Tips to resolve this:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ensure .md files exist in public/blog/ directory</li>
                    <li>Check that files have proper frontmatter format</li>
                    <li>Verify the Next.js API route is working</li>
                  </ul>
                </div>
                <button
                  onClick={handleRefresh}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Featured Article - Mobile Responsive */}
            {!isLoading && !error && featuredPosts.length > 0 && (
              <BlogPostCard
                post={featuredPosts[0]}
                onClick={() => handlePostClick(featuredPosts[0])}
                variant="featured"
              />
            )}

            {/* All Articles - Mobile Responsive */}
            {!isLoading && !error && posts.length > 0 && (
              <div className="space-y-4 sm:space-y-6">
                {posts.map((post: BlogPost) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    onClick={() => handlePostClick(post)}
                    variant="list"
                  />
                ))}
              </div>
            )}

            {/* Empty State (when no error but no posts) */}
            {!isLoading && !error && posts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-slate-700 dark:text-slate-400 mb-4">
                  No blog posts found in the public/blog/ directory.
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  Add .md files to public/blog/ and they will appear
                  automatically!
                </p>
              </div>
            )}

            {/* Simple indicator without counts */}
            {!isLoading && !error && posts.length > 0 && (
              <div className="text-center pt-8 sm:pt-12">
                <div className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium">
                  <span>Auto-discovered from filesystem</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Certifications Tab - Mobile Responsive */}
        {activeTab === "certifications" && (
          <div className="space-y-8 sm:space-y-12">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="border-l-2 border-blue-200 dark:border-blue-800 pl-6 sm:pl-10 pb-8 sm:pb-12 relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full transform -translate-x-1.5 mt-1"></div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {cert.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-400">
                        <Award
                          size={16}
                          className="text-blue-500 flex-shrink-0"
                        />
                        <span className="text-sm sm:text-base">
                          {cert.issuer}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {cert.date}
                      </div>
                    </div>

                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-sm self-start"
                      >
                        <span>View</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>

                  {cert.credentialId && (
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded inline-block">
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}