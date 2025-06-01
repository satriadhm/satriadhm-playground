// src/app/blog/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getPostBySlug, blogPosts, loadBlogPosts } from "@/constants/blogData";
import { BlogPostDetail } from "@/types";
import BlogDetailComponent from "@/app/components/BlogDetailComponent";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPostData = async () => {
      setIsLoading(true);

      try {
        // Load posts if not already loaded
        if (blogPosts.length === 0) {
          await loadBlogPosts();
        }

        // Find the post by slug
        const foundPost = getPostBySlug(slug);

        if (foundPost) {
          setPost(foundPost);

          // Get related posts from same category
          const related = blogPosts
            .filter(
              (p) => p.category === foundPost.category && p.id !== foundPost.id
            )
            .slice(0, 3);
          setRelatedPosts(related);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error loading post:", error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadPostData();
    }
  }, [slug]);

  return (
    <BlogDetailComponent
      slug={slug}
      post={isLoading ? null : post}
      relatedPosts={relatedPosts}
    />
  );
}
