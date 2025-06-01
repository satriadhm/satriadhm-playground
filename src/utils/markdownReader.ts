// src/utils/markdownReader.ts
import { BlogPost } from '@/types';

// Blog file registry - tambahkan file .md baru di sini
export const BLOG_FILES = [
    'null-go-sqlite3.md',
    'service-java-arch.md',

];

// Utility functions
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

// Parse frontmatter dari markdown file
const parseFrontmatter = (content: string) => {
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

// Load single blog post from file
export const loadBlogPost = async (filename: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`/blog/${filename}`);
    if (!response.ok) {
      console.warn(`Could not load blog post: ${filename}`);
      return null;
    }

    const content = await response.text();
    const { frontmatter, content: markdownContent } = parseFrontmatter(content);

    const post: BlogPost = {
      id: generateSlug(frontmatter.title ?? ''),
      slug: generateSlug(frontmatter.title ?? ''),
      title: frontmatter.title ?? '',
      excerpt: frontmatter.excerpt ?? '',
      date: frontmatter.date ?? '',
      category: frontmatter.category ?? '',
      featured: frontmatter.featured || false,
      author: frontmatter.author ?? '',
      tags: frontmatter.tags || [],
      content: markdownContent,
      readTime: calculateReadingTime(markdownContent),
      image: frontmatter.image
    };

    return post;
  } catch (error) {
    console.error(`Error loading blog post ${filename}:`, error);
    return null;
  }
};

// Load all blog posts dari file registry
export const loadAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const posts: BlogPost[] = [];

    // Load posts concurrently
    const postPromises = BLOG_FILES.map(filename => loadBlogPost(filename));
    const loadedPosts = await Promise.all(postPromises);

    // Filter out null results and add to posts array
    loadedPosts.forEach(post => {
      if (post) {
        posts.push(post);
      }
    });

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
};

// Auto-discover blog files (optional, untuk deteksi otomatis)
export const discoverBlogFiles = async (): Promise<string[]> => {
  try {
    // Karena kita tidak bisa enumerate files di browser,
    // kita perlu menggunakan registry manual di BLOG_FILES
    // Atau implementasi server-side endpoint untuk list files
    
    // Untuk sekarang, return file registry
    return BLOG_FILES;
  } catch (error) {
    console.error('Error discovering blog files:', error);
    return BLOG_FILES;
  }
};

// Validation untuk memastikan blog post memiliki frontmatter yang lengkap
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

// Template generator untuk blog post baru
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

// Helper untuk membuat file blog baru (untuk development)
export const createNewBlogFile = (title: string, content?: string) => {
  const filename = `${generateSlug(title)}.md`;
  const template = content || generateBlogTemplate(title);
  
  console.log(`To create a new blog post, save this content to public/blog/${filename}:`);
  console.log('---');
  console.log(template);
  console.log('---');
  console.log(`Don't forget to add '${filename}' to BLOG_FILES in markdownReader.ts!`);
  
  return { filename, template };
};