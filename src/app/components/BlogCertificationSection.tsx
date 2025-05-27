/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState, useEffect } from 'react';
import { ExternalLink, Award, ChevronRight, Clock, User, Calendar, Tag, RefreshCw } from 'lucide-react';
import { certifications } from '@/constants/data';
import { loadBlogPosts, getFeaturedPosts } from '@/constants/blogData';
import { parseMarkdown } from '@/utils/blog';
import { BlogPost } from '@/types';

export default function BlogCertificationSection() {
  const [activeTab, setActiveTab] = useState<'blog' | 'certifications'>('blog');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);

  // Load blog posts saat komponen mount
  useEffect(() => {
    const initializeBlogPosts = async () => {
      setIsLoading(true);
      try {
        const loadedPosts = await loadBlogPosts();
        setPosts(loadedPosts);
        setFeaturedPosts(getFeaturedPosts());
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeBlogPosts();
  }, []);

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

  const selectedPostData = selectedPost ? posts.find((p: { id: string; }) => p.id === selectedPost) : null;

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const loadedPosts = await loadBlogPosts();
      setPosts(loadedPosts);
      setFeaturedPosts(getFeaturedPosts());
    } catch (error) {
      console.error('Error reloading blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="blog-certifications" className="py-16 sm:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile Responsive */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 sm:mb-8">
            Writing & Achievements
          </h2>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Thoughts on technology, career insights, and professional milestones along my journey as a software engineer.
          </p>
        </div>

        {/* Tab Navigation - Mobile Responsive */}
        <div className="flex justify-center mb-16 sm:mb-20">
          <div className="flex border-b border-slate-200 dark:border-slate-800 w-full max-w-md">
            <button
              onClick={() => setActiveTab('blog')}
              className={`flex-1 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all relative ${
                activeTab === 'blog'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Writing
              {activeTab === 'blog' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`flex-1 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all relative ${
                activeTab === 'certifications'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Achievements
              {activeTab === 'certifications' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
              )}
            </button>
          </div>
        </div>

        {/* Blog Posts Tab - Mobile Responsive */}
        {activeTab === 'blog' && (
          <div className="space-y-16 sm:space-y-20">
            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">Loading blog posts...</p>
              </div>
            )}

            {/* Refresh Button */}
            {!isLoading && (
              <div className="flex justify-center mb-8">
                <button
                  onClick={handleRefresh}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-200 dark:border-blue-700"
                >
                  <RefreshCw size={16} />
                  <span>Refresh Posts</span>
                </button>
              </div>
            )}

            {/* Featured Article - Mobile Responsive */}
            {!isLoading && featuredPosts.length > 0 && (
              <article className="border-b border-slate-100 dark:border-slate-800 pb-16 sm:pb-20">
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4 sm:space-y-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                      {featuredPosts[0].title}
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                      {featuredPosts[0].excerpt}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span className="font-medium">{featuredPosts[0].author}</span>
                      </div>
                      <span className="hidden sm:inline">·</span>
                      <div className="flex items-center space-x-1">
                        <Tag size={14} />
                        <span className="font-medium">{featuredPosts[0].category}</span>
                      </div>
                      <span className="hidden sm:inline">·</span>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(featuredPosts[0].date)}</span>
                      </div>
                      <span className="hidden sm:inline">·</span>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{featuredPosts[0].readTime} min read</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedPost(featuredPosts[0].id)}
                      className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group self-start"
                    >
                      <span>Read article</span>
                      <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {featuredPosts[0].tags.slice(0, 5).map((tag: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
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
            )}

            {/* All Articles - Mobile Responsive */}
            {!isLoading && (
              <div className="space-y-12 sm:space-y-16">
                {posts.map((post: { id: string | number | bigint | ((prevState: string | null) => string | null) | null | undefined; date: string; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; excerpt: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; category: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; readTime: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; author: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; tags: any[]; }) => (
                  <article key={String(post.id)} className="group cursor-pointer">
                    <button
                      onClick={() => setSelectedPost(post.id != null ? String(post.id) : null)}
                      className="block w-full text-left"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
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
                            {post.tags.slice(0, 3).map((tag: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
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
                    </button>
                  </article>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400 mb-4">No blog posts found.</p>
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* View All - Mobile Responsive */}
            {!isLoading && posts.length > 0 && (
              <div className="text-center pt-8 sm:pt-12">
                <div className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium">
                  <span>Showing {posts.length} articles</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Certifications Tab - Mobile Responsive */}
        {activeTab === 'certifications' && (
          <div className="space-y-8 sm:space-y-12">
            {certifications.map((cert) => (
              <div key={cert.id} className="border-l-2 border-blue-200 dark:border-blue-800 pl-6 sm:pl-10 pb-8 sm:pb-12 relative">
                {/* Timeline dot */}
                <div className="absolute left-0 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full transform -translate-x-1.5 mt-1"></div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {cert.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                        <Award size={16} className="text-blue-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{cert.issuer}</span>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
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
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded inline-block">
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blog Post Modal - Mobile Responsive */}
      {selectedPost && selectedPostData && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 my-2 sm:my-4">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 sm:p-6 flex items-start justify-between z-10 rounded-t-2xl">
              <div className="flex-1 min-w-0 mr-4">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {selectedPostData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <User size={14} />
                    <span>{selectedPostData.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{formatDate(selectedPostData.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{selectedPostData.readTime} min read</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedPostData.tags.map((tag: string, index: Key | null | undefined) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div 
                className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
                dangerouslySetInnerHTML={{ 
                  __html: parseMarkdown(selectedPostData.content) 
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}