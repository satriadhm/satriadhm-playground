export interface Skill {
    name: string;
    level: number; // 1-5 scale
    category: 'technical' | 'soft' | 'tools';
  }
  
  export interface TechStack {
    name: string;
    icon?: string;
    proficiency: number;
  }
  
  export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    type: 'fulltime' | 'parttime' | 'internship';
    description: string[];
    technologies: string[];
    achievements?: string[];
    images?: string[];
    certificates?: string[];
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    category: string;
    featured: boolean;
    images?: string[];
  }
  
  export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readTime: number;
    slug: string;
  }
  
  export interface Certification {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    url?: string;
  }
  
  export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    linkedin: string;
    github: string;
    location: string;
    bio: string;
    profileImage?: string;
  }