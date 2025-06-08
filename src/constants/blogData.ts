// src/constants/blogData.ts - Updated to use dynamic API
import { BlogPost } from "@/types";

let blogPostsCache: BlogPost[] = [];
let lastLoadTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const loadBlogPosts = async (forceReload = false): Promise<BlogPost[]> => {
  const now = Date.now();
  
  if (!forceReload && blogPostsCache.length > 0 && (now - lastLoadTime) < CACHE_DURATION) {
    return blogPostsCache;
  }

  try {
    console.log('Loading blog posts from API...');
    
    const response = await fetch('/api/blog', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache'
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const posts: BlogPost[] = await response.json();
    
    blogPostsCache = posts;
    lastLoadTime = now;
    
    console.log(`Loaded ${posts.length} blog posts successfully`);
    return posts;
  } catch (error) {
    console.error('Error loading blog posts from API:', error);
    
    if (blogPostsCache.length > 0) {
      console.log('Returning cached blog posts due to API error');
      return blogPostsCache;
    }
    
    return [];
  }
};

export const blogPosts: BlogPost[] = blogPostsCache;

export const loadBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache'
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const post: BlogPost = await response.json();
    return post;
  } catch (error) {
    console.error(`Error loading blog post with slug ${slug}:`, error);
    return null;
  }
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPostsCache.filter(post => post.featured);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPostsCache.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPostsCache.filter(post => post.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(blogPostsCache.map(post => post.category)));
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPostsCache.filter(post => post.tags.includes(tag));
};

export const getAllTags = (): string[] => {
  return Array.from(new Set(blogPostsCache.flatMap(post => post.tags)));
};

export const refreshBlogCache = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      await loadBlogPosts(true);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error refreshing blog cache:', error);
    return false;
  }
};

export const getBlogStats = () => {
  return {
    totalPosts: blogPostsCache.length,
    featuredPosts: blogPostsCache.filter(post => post.featured).length,
    categories: getAllCategories().length,
    tags: getAllTags().length,
    lastUpdated: lastLoadTime ? new Date(lastLoadTime).toISOString() : null,
    cacheAge: lastLoadTime ? Date.now() - lastLoadTime : 0
  };
};

export const discoverBlogFiles = async (): Promise<string[]> => {
  try {
    return blogPostsCache.map(post => `${post.slug}.md`);
  } catch (error) {
    console.error('Error discovering blog files:', error);
    return [];
  }
};

if (typeof window !== 'undefined') {
  loadBlogPosts().catch(console.error);
}