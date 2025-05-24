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
    <section id="blog-certifications" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Writing & Achievements
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Thoughts on technology, career insights, and professional milestones along my journey as a software engineer.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-20">
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-10 py-4 text-lg font-medium transition-all relative ${
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
              className={`px-10 py-4 text-lg font-medium transition-all relative ${
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

        {/* Blog Posts Tab */}
        {activeTab === 'blog' && (
          <div className="space-y-20">
            {/* Featured Article */}
            {blogPosts.filter(post => post.featured).length > 0 && (
              <article className="border-b border-slate-100 dark:border-slate-800 pb-20">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                      {blogPosts.filter(post => post.featured)[0].title}
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                      {blogPosts.filter(post => post.featured)[0].excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium">{blogPosts.filter(post => post.featured)[0].title}</span>
                      <span>·</span>
                      <span>{formatDate(blogPosts.filter(post => post.featured)[0].date)}</span>
                      <span>·</span>
                      <span>{blogPosts.filter(post => post.featured)[0].readTime} min read</span>
                    </div>
                    
                    <a
                      href={`/blog/${blogPosts.filter(post => post.featured)[0].slug}`}
                      className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                    >
                      <span>Read article</span>
                      <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* All Articles */}
            <div className="space-y-16">
              {blogPosts.map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <a href={`/blog/${post.slug}`} className="block">
                    <div className="flex items-start space-x-8">
                      <div className="flex-shrink-0 text-sm text-slate-400 dark:text-slate-600 pt-1 w-16">
                        {formatDateShort(post.date)}
                      </div>
                      
                      <div className="flex-grow space-y-3">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                          {post.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center space-x-3 text-sm text-slate-500 dark:text-slate-400">
                          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-xs">
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

            {/* View All */}
            <div className="text-center pt-12">
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

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="space-y-12">
            {certifications.map((cert) => (
              <div key={cert.id} className="border-l-2 border-blue-200 dark:border-blue-800 pl-10 pb-12 relative">
                {/* Timeline dot */}
                <div className="absolute left-0 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full transform -translate-x-1.5 mt-1"></div>
                
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {cert.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                        <Award size={16} className="text-blue-500" />
                        <span>{cert.issuer}</span>
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
                        className="flex items-center space-x-1 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-sm"
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