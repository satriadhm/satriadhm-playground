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
    achievements?: string[];
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

  export interface LifeEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  type: 'travel' | 'cultural' | 'adventure' | 'music' | 'lifestyle';
  images: string[];
  rating: number;
  category: string;
  highlight?: boolean;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  created_at: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillsRadarChartProps {
  skills: Skill[];
}