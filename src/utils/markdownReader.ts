// src/utils/markdownReader.ts - Simplified client-side only version
import { BlogPost } from '@/types';

// NOTE: File discovery is now handled by the API route
// This file now only contains client-side utilities

// Utility functions for client-side processing
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Parse frontmatter for client-side processing (if needed)
export const parseFrontmatter = (content: string) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid frontmatter format');
  }

  const [, frontmatterStr, markdownContent] = match;
  type Frontmatter = {
    title?: string;
    excerpt?: string;
    date?: string;
    category?: string;
    featured?: boolean;
    author?: string;
    tags?: string[];
    image?: string;
    [key: string]: unknown;
  };
  const frontmatter: Frontmatter = {};
  
  // Parse YAML-like frontmatter
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();
    
    if (!key || !value) return;
    
    // Handle arrays (tags)
    if (value.startsWith('[') && value.endsWith(']')) {
      frontmatter[key] = value
        .slice(1, -1)
        .split(',')
        .map(item => item.trim().replace(/['"]/g, ''));
    }
    // Handle booleans
    else if (value === 'true' || value === 'false') {
      frontmatter[key] = value === 'true';
    }
    // Handle strings (remove quotes if present)
    else {
      frontmatter[key] = value.replace(/^['"]|['"]$/g, '');
    }
  });

  return { frontmatter, content: markdownContent };
};

// Validation for blog posts
export const validateBlogPost = (post: unknown): post is BlogPost => {
  const requiredFields = ['title', 'excerpt', 'date', 'category', 'author', 'content'];

  if (typeof post !== 'object' || post === null) {
    console.warn('Blog post is not an object');
    return false;
  }

  for (const field of requiredFields) {
    if (!(field in post) || !(post as BlogPost)[field as keyof BlogPost]) {
      console.warn(`Blog post missing required field: ${field}`);
      return false;
    }
  }

  // Validate date format
  if (isNaN(Date.parse((post as BlogPost).date))) {
    console.warn(`Blog post has invalid date format: ${(post as BlogPost).date}`);
    return false;
  }

  return true;
};

// Template generator for new blog posts (development helper)
export const generateBlogTemplate = (title: string): string => {
  const slug = generateSlug(title);
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `---
title: ${title}
excerpt: Brief description of your blog post
date: ${currentDate}
category: Technology
featured: false
author: Glorious Satria
tags: [Tag1, Tag2, Tag3]
image: /images/blog/${slug}.jpg
---

# ${title}

Your blog content starts here...

## Section 1

Write your content in Markdown format.

## Section 2

More content here.

## Conclusion

Wrap up your thoughts.
`;
};

// Development helper for creating new blog files
export const createNewBlogFile = (title: string, content?: string) => {
  const filename = `${generateSlug(title)}.md`;
  const template = content || generateBlogTemplate(title);
  
  console.log(`To create a new blog post, save this content to public/blog/${filename}:`);
  console.log('---');
  console.log(template);
  console.log('---');
  console.log(`The file will be automatically discovered on next page refresh!`);
  
  return { filename, template };
};

// Client-side blog post processing utilities
export const processBlogPost = (rawPost: Partial<BlogPost>): BlogPost | null => {
  try {
    if (!rawPost.title || !rawPost.content) {
      throw new Error('Missing required fields');
    }

    const processed: BlogPost = {
      id: rawPost.id || generateSlug(rawPost.title),
      slug: rawPost.slug || generateSlug(rawPost.title),
      title: rawPost.title,
      excerpt: rawPost.excerpt || '',
      date: rawPost.date || new Date().toISOString().split('T')[0],
      category: rawPost.category || 'Uncategorized',
      featured: rawPost.featured || false,
      author: rawPost.author || 'Anonymous',
      tags: rawPost.tags || [],
      content: rawPost.content,
      readTime: rawPost.readTime || calculateReadingTime(rawPost.content),
      image: rawPost.image
    };

    return validateBlogPost(processed) ? processed : null;
  } catch (error) {
    console.error('Error processing blog post:', error);
    return null;
  }
};

// Export utility functions for use elsewhere
export {
  generateSlug,
  calculateReadingTime
};