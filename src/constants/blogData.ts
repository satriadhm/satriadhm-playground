// src/constants/blogData.ts
import { BlogPost } from "@/types";
import { loadAllBlogPosts, loadBlogPost, BLOG_FILES } from "@/utils/markdownReader";

// Blog posts cache
let blogPostsCache: BlogPost[] = [];
let lastLoadTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Load blog posts dengan caching
export const loadBlogPosts = async (forceReload = false): Promise<BlogPost[]> => {
  const now = Date.now();
  
  // Return cache jika masih fresh dan tidak force reload
  if (!forceReload && blogPostsCache.length > 0 && (now - lastLoadTime) < CACHE_DURATION) {
    return blogPostsCache;
  }

  try {
    console.log('Loading blog posts from markdown files...');
    const posts = await loadAllBlogPosts();
    
    blogPostsCache = posts;
    lastLoadTime = now;
    
    console.log(`Loaded ${posts.length} blog posts successfully`);
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return blogPostsCache; // Return cache on error
  }
};

// Get current cached posts (synchronous)
export const blogPosts: BlogPost[] = blogPostsCache;

// Helper functions
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

// Development helpers
export const getBlogFilesList = (): string[] => {
  return BLOG_FILES;
};

export const reloadBlogPost = async (filename: string): Promise<BlogPost | null> => {
  try {
    const post = await loadBlogPost(filename);
    
    if (post) {
      // Update cache dengan post yang baru di-load
      const index = blogPostsCache.findIndex(p => p.id === post.id);
      if (index !== -1) {
        blogPostsCache[index] = post;
      } else {
        blogPostsCache.push(post);
        // Sort again
        blogPostsCache.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    }
    
    return post;
  } catch (error) {
    console.error(`Error reloading blog post ${filename}:`, error);
    return null;
  }
};

// Initialize blog posts on module load (client-side only)
if (typeof window !== 'undefined') {
  loadBlogPosts().catch(console.error);
}