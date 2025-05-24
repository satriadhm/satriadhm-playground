'use client';

import { useState } from 'react';
import { Calendar, Clock, ExternalLink, Award, User, LinkIcon } from 'lucide-react';
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

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Backend Development': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      'Frontend Development': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'Career': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      'Database': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
  };

  return (
    <section id="blog-certifications" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Blog & Certifications
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Sharing knowledge through technical writing and showcasing professional achievements 
            and certifications earned throughout my career.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === 'blog'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Blog Posts
              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">
                {blogPosts.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === 'certifications'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Certifications
              <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded-full">
                {certifications.length}
              </span>
            </button>
          </div>
        </div>

        {/* Blog Posts Tab */}
        {activeTab === 'blog' && (
          <div className="space-y-8">
            {/* Featured Posts */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {blogPosts.filter(post => post.featured).map((post) => (
                <article key={post.id} className="card p-6 card-hover group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock size={16} />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={16} />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      
                      <a
                        href={`/blog/${post.slug}`}
                        className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                      >
                        <span>Read more</span>
                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* All Posts Grid */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">All Posts</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <article key={post.id} className="card p-4 card-hover group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock size={12} />
                          <span>{post.readTime}m</span>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatDate(post.date)}</span>
                        <a
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                          Read →
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div key={cert.id} className="card p-6 card-hover group">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {cert.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <User size={14} />
                          <span>{cert.issuer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={14} />
                      <span>Issued: {cert.date}</span>
                    </div>
                    
                    {cert.credentialId && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Credential ID:</span> {cert.credentialId}
                      </div>
                    )}
                  </div>
                  
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group pt-2 border-t border-gray-200 dark:border-gray-700"
                    >
                      <LinkIcon size={16} />
                      <span>View Certificate</span>
                      <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
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