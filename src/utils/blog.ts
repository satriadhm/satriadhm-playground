// src/utils/blog.ts
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  slug: string;
  featured: boolean;
  content: string;
  author: string;
  tags: string[];
  image?: string;
}

export interface BlogMetadata {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  featured: boolean;
  author: string;
  tags: string[];
  image?: string;
}

// Simple markdown parser for basic formatting
export function parseMarkdown(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">$1</h1>')
    
    // Bold and Italic
    .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>')
    .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
    
    // Code blocks and inline code
    .replace(/```([^`]+)```/gim, '<pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm">$1</code></pre>')
    .replace(/`([^`]+)`/gim, '<code class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm font-mono">$1</code>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Lists
    .replace(/^\- (.*$)/gim, '<li class="mb-2">$1</li>')
    .replace(/(<li.*<\/li>)/gim, '<ul class="list-disc list-inside mb-4 space-y-2 text-slate-700 dark:text-slate-300">$1</ul>')
    
    // Paragraphs
    .replace(/\n\n/gim, '</p><p class="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">')
    .replace(/^(?!<[h|u|p|c])/gim, '<p class="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">')
    .replace(/(?<!>)$/gim, '</p>');
}

// Calculate reading time based on word count
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}