'use client';

import { useState } from 'react';
import { ExternalLink, Award, ChevronRight } from 'lucide-react';
import { certifications } from '@/constants/data';

// Mock blog data - you can replace this with actual blog data or API
const blogPosts = [
  {
    id: '1',
    title: 'Building Scalable Microservices with Go and PostgreSQL',
    excerpt: 'Learn how to design and implement microservices architecture that can handle thousands of concurrent users while maintaining data consistency.',
    date: '2024-12-15',
    category: 'Backend Development',
    readTime: 8,
    slug: 'scalable-microservices-go-postgresql',
    featured: true
  },
  {
    id: '2',
    title: 'My Journey from Intern to Full-Stack Engineer',
    excerpt: 'Sharing insights and lessons learned during my career progression in software engineering, from internships to leading development teams.',
    date: '2024-11-20',
    category: 'Career',
    readTime: 6,
    slug: 'journey-intern-fullstack-engineer',
    featured: true
  },
  {
    id: '3',
    title: 'Implementing Real-time Features with GraphQL Subscriptions',
    excerpt: 'A deep dive into building real-time applications using GraphQL subscriptions, WebSockets, and modern frontend frameworks.',
    date: '2024-10-10',
    category: 'Frontend Development',
    readTime: 12,
    slug: 'realtime-graphql-subscriptions',
    featured: false
  },
  {
    id: '4',
    title: 'Database Optimization Techniques for High-Traffic Applications',
    excerpt: 'Practical strategies for optimizing database performance, including indexing, query optimization, and connection pooling.',
    date: '2024-09-05',
    category: 'Database',
    readTime: 10,
    slug: 'database-optimization-techniques',
    featured: false
  }
];

export default function BlogCertificationSection() {
  const [activeTab, setActiveTab] = useState<'blog' | 'certifications'>('blog');

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
            {/* Featured Article - Mobile Responsive */}
            {blogPosts.filter(post => post.featured).length > 0 && (
              <article className="border-b border-slate-100 dark:border-slate-800 pb-16 sm:pb-20">
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4 sm:space-y-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                      {blogPosts.filter(post => post.featured)[0].title}
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                      {blogPosts.filter(post => post.featured)[0].excerpt}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium">{blogPosts.filter(post => post.featured)[0].category}</span>
                      <span className="hidden sm:inline">·</span>
                      <span>{formatDate(blogPosts.filter(post => post.featured)[0].date)}</span>
                      <span className="hidden sm:inline">·</span>
                      <span>{blogPosts.filter(post => post.featured)[0].readTime} min read</span>
                    </div>
                    
                    <a
                      href={`/blog/${blogPosts.filter(post => post.featured)[0].slug}`}
                      className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group self-start"
                    >
                      <span>Read article</span>
                      <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* All Articles - Mobile Responsive */}
            <div className="space-y-12 sm:space-y-16">
              {blogPosts.map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <a href={`/blog/${post.slug}`} className="block">
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
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {/* View All - Mobile Responsive */}
            <div className="text-center pt-8 sm:pt-12">
              <a
                href="/blog"
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
              >
                <span>View all articles</span>
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
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
    </section>
  );
}