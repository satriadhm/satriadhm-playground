// src/app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost } from '@/types';

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

// Discover all markdown files in public/blog directory
const discoverBlogFiles = async (): Promise<string[]> => {
  try {
    const blogDir = path.join(process.cwd(), 'public', 'blog');
    const files = await fs.readdir(blogDir);
    
    // Filter only .md files
    return files.filter(file => file.endsWith('.md'));
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
};

// Load single blog post from file
const loadBlogPost = async (filename: string): Promise<BlogPost | null> => {
  try {
    const blogDir = path.join(process.cwd(), 'public', 'blog');
    const filePath = path.join(blogDir, filename);
    
    const content = await fs.readFile(filePath, 'utf8');
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

// Load all blog posts
const loadAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const blogFiles = await discoverBlogFiles();
    const posts: BlogPost[] = [];

    // Load posts concurrently
    const postPromises = blogFiles.map(filename => loadBlogPost(filename));
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

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    if (slug) {
      const blogFiles = await discoverBlogFiles();
      let foundPost: BlogPost | null = null;

      for (const filename of blogFiles) {
        const post = await loadBlogPost(filename);
        if (post && post.slug === slug) {
          foundPost = post;
          break;
        }
      }

      if (!foundPost) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(foundPost);
    } else {
      const posts = await loadAllBlogPosts();
      return NextResponse.json(posts);
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const posts = await loadAllBlogPosts();
    return NextResponse.json({ 
      message: 'Blog cache refreshed successfully',
      count: posts.length,
      posts: posts.map(p => ({ id: p.id, title: p.title, date: p.date }))
    });
  } catch (error) {
    console.error('Refresh Error:', error);
    return NextResponse.json(
      { error: 'Failed to refresh blog cache' },
      { status: 500 }
    );
  }
}