'use client';

import { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Calendar, Award, Eye, X, FileText, Download } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/constants/data';
import { GitHubRepo } from '@/types';


export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [allGithubRepos, setAllGithubRepos] = useState<GitHubRepo[]>([]);
  const [filteredGithubRepos, setFilteredGithubRepos] = useState<GitHubRepo[]>([]);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [showGithubRepos, setShowGithubRepos] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);
  const reposPerPage = 9;
  type Project = typeof projects[number];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const featuredProjects = projects.filter(p => p.featured);

  // Helper function to check file type
  const getFileType = (filePath: string): 'image' | 'pdf' | 'unknown' => {
    const extension = filePath.toLowerCase().split('.').pop();
    if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(extension || '')) {
      return 'image';
    }
    if (extension === 'pdf') {
      return 'pdf';
    }
    return 'unknown';
  };

  // Helper function to get file name from path
  const getFileName = (filePath: string): string => {
    return filePath.split('/').pop() || 'Certificate';
  };

  // GitHub API integration with pagination and search
  const fetchGitHubRepos = async () => {
    setIsLoadingGithub(true);
    try {
      let allRepos: GitHubRepo[] = [];
      let page = 1;
      let hasMorePages = true;

      // Fetch all repositories with pagination
      while (hasMorePages) {
        const response = await fetch(
          `https://api.github.com/users/satriadhm/repos?sort=updated&per_page=100&page=${page}`
        );
        
        if (response.ok) {
          const repos = await response.json();
          if (repos.length === 0) {
            hasMorePages = false;
          } else {
            allRepos = [...allRepos, ...repos];
            page++;
            // GitHub API typically returns less than 100 repos per page when reaching the end
            if (repos.length < 100) {
              hasMorePages = false;
            }
          }
        } else {
          hasMorePages = false;
        }
      }

      setAllGithubRepos(allRepos);
      setTotalRepos(allRepos.length);
      setFilteredGithubRepos(allRepos);
      
      // Set initial page of repos
      const startIndex = (currentPage - 1) * reposPerPage;
      const endIndex = startIndex + reposPerPage;
      setGithubRepos(allRepos.slice(startIndex, endIndex));
      
    } catch (error) {
      console.error('Failed to fetch GitHub repos:', error);
    }
    setIsLoadingGithub(false);
  };

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching

    if (query.trim() === '') {
      setFilteredGithubRepos(allGithubRepos);
    } else {
      const filtered = allGithubRepos.filter(repo =>
        repo.name.toLowerCase().includes(query.toLowerCase()) ||
        repo.description?.toLowerCase().includes(query.toLowerCase()) ||
        repo.topics.some(topic => topic.toLowerCase().includes(query.toLowerCase())) ||
        repo.language?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredGithubRepos(filtered);
    }
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * reposPerPage;
    const endIndex = startIndex + reposPerPage;
    setGithubRepos(filteredGithubRepos.slice(startIndex, endIndex));
  };

  // Update repos when filtered repos or current page changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * reposPerPage;
    const endIndex = startIndex + reposPerPage;
    setGithubRepos(filteredGithubRepos.slice(startIndex, endIndex));
  }, [filteredGithubRepos, currentPage]);

  // Calculate pagination info
  const totalPages = Math.ceil(filteredGithubRepos.length / reposPerPage);
  const startRepo = (currentPage - 1) * reposPerPage + 1;
  const endRepo = Math.min(currentPage * reposPerPage, filteredGithubRepos.length);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Web Development': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
      'Mobile App': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
      'AR/VR': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
      'Blockchain': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
      'Social Impact': 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
      'Machine Learning': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
    };
    return colors[category] || 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800';
  };

  return (
    <section id="projects" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile Responsive */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto px-4">
            A collection of projects showcasing my technical skills and problem-solving abilities, 
            ranging from blockchain innovations to AR-based educational platforms and social impact solutions.
          </p>
        </div>

        {/* GitHub Integration Toggle - Mobile Responsive */}
        <div className="flex justify-center mb-6 sm:mb-8 px-4">
          <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-slate-200 dark:border-slate-700 w-full max-w-md">
            <button
              onClick={() => setShowGithubRepos(false)}
              className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm font-medium transition-all ${
                !showGithubRepos
                  ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Featured Projects
            </button>
            <button
              onClick={() => {
                setShowGithubRepos(true);
                if (allGithubRepos.length === 0) {
                  fetchGitHubRepos();
                }
              }}
              className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
                showGithubRepos
                  ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Github size={16} />
              <span>GitHub Repos</span>
            </button>
          </div>
        </div>

        {/* Featured Projects */}
        {!showGithubRepos && (
          <>
            {/* Category Filter - Mobile Responsive */}
            <div className="mb-8 sm:mb-12 px-4">
              {/* Mobile: Horizontal scroll */}
              <div className="overflow-x-auto pb-2">
                <div className="flex space-x-2 min-w-max">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap ${
                        selectedCategory === category
                          ? 'bg-slate-900 text-white shadow-sm border-slate-900 dark:bg-slate-600 dark:border-slate-600'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <span>
                        {category === 'all' ? 'All Projects' : category}
                      </span>
                      {category !== 'all' && (
                        <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded-full">
                          {projects.filter(p => p.category === category).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Projects Showcase - Mobile Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {featuredProjects.slice(0, 2).map((project) => (
                <div key={project.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  {/* Project Image - Mobile Responsive */}
                  {project.images && project.images.length > 0 && (
                    <div className="relative h-40 sm:h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                      <Image
                        src={project.images[0]}
                        alt={`${project.title} showcase`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  
                  <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                      <span className={`self-start px-3 py-2 rounded-lg text-sm font-medium border ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                            aria-label="View on GitHub"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                            aria-label="View live demo"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30"
                          aria-label="View details"
                        >
                          <Eye size={20} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                        {project.description}
                      </p>
                    </div>

                    {/* Achievements - Mobile Responsive */}
                    {project.achievements && project.achievements.length > 0 && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award size={16} className="text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Key Achievements</span>
                        </div>
                        <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                          {project.achievements.slice(0, 2).map((achievement, index) => (
                            <li key={index}>• {achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 sm:px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm rounded-md border border-slate-200 dark:border-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* All Projects Grid - Mobile Responsive */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 sm:mb-8 px-4">
                {selectedCategory === 'all' ? 'All Projects' : `${selectedCategory} Projects`}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300 group overflow-hidden">
                    {/* Project Image - Mobile Responsive */}
                    {project.images && project.images.length > 0 && (
                      <div className="relative h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                        <Image
                          src={project.images[0]}
                          alt={`${project.title} preview`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    
                    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                        <span className={`self-start px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                              aria-label="View on GitHub"
                            >
                              <Github size={16} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                              aria-label="View live demo"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm sm:text-base">
                          {project.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-600"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 text-slate-500 dark:text-slate-500 text-xs">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* GitHub Repos - Mobile Responsive */}
        {showGithubRepos && (
          <div>
            {isLoadingGithub ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto"></div>
                <p className="text-slate-600 dark:text-slate-400 mt-4">Loading GitHub repositories...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Search and Stats Header - Mobile Responsive */}
                <div className="flex flex-col gap-4 px-4">
                  <div className="w-full">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search repositories..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full px-4 py-3 pl-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
                    Showing {filteredGithubRepos.length > 0 ? startRepo : 0}-{endRepo} of {filteredGithubRepos.length} repositories
                    {searchQuery && (
                      <span className="block mt-1">
                        • Filtered from {totalRepos} total
                      </span>
                    )}
                  </div>
                </div>

                {/* Search Results Info - Mobile Responsive */}
                {searchQuery && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mx-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center space-x-2">
                        <svg className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">
                          Found {filteredGithubRepos.length} repositories matching &quot;{searchQuery}&quot;
                        </span>
                      </div>
                      <button
                        onClick={() => handleSearch('')}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                      >
                        Clear search
                      </button>
                    </div>
                  </div>
                )}

                {/* Repositories Grid - Mobile Responsive */}
                {filteredGithubRepos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-slate-500 dark:text-slate-400">
                      {searchQuery ? (
                        <>
                          <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <p className="text-lg font-medium">No repositories found</p>
                          <p className="mt-1">Try adjusting your search terms</p>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-medium">No repositories available</p>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {githubRepos.map((repo) => (
                      <div key={repo.id} className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300 group">
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <Github size={20} className="text-slate-500 flex-shrink-0" />
                              <span className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                {repo.language || 'Repository'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 text-sm text-slate-500 dark:text-slate-400">
                              <div className="flex items-center space-x-1">
                                <Star size={14} />
                                <span>{repo.stargazers_count}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <GitFork size={14} />
                                <span>{repo.forks_count}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm sm:text-base">
                              {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                              {repo.description || 'No description available'}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                              <Calendar size={12} />
                              <span>Updated {formatDate(repo.updated_at)}</span>
                            </div>
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm"
                            >
                              <span>View</span>
                              <ExternalLink size={14} />
                            </a>
                          </div>

                          {repo.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {repo.topics.slice(0, 3).map((topic, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-md border border-blue-200 dark:border-blue-800"
                                >
                                  {topic}
                                </span>
                              ))}
                              {repo.topics.length > 3 && (
                                <span className="px-2 py-1 text-slate-500 dark:text-slate-500 text-xs">
                                  +{repo.topics.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination - Mobile Responsive */}
                {totalPages > 1 && (
                  <div className="flex flex-col items-center gap-4 mt-8 px-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Page {currentPage} of {totalPages}
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 w-full max-w-sm">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      <div className="flex items-center space-x-1 overflow-x-auto">
                        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage <= 2) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 1) {
                            pageNum = totalPages - 2 + i;
                          } else {
                            pageNum = currentPage - 1 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                                currentPage === pageNum
                                  ? 'bg-blue-600 text-white'
                                  : 'text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Project Detail Modal - Mobile Responsive */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 my-2 sm:my-4">
              {/* Modal Header - Mobile Responsive */}
              <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 sm:p-6 flex items-start sm:items-center justify-between z-10 rounded-t-2xl">
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
                    {selectedProject.title}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium border mt-2 ${getCategoryColor(selectedProject.category)}`}>
                    {selectedProject.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content - Mobile Responsive */}
              <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                {/* Project Image */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl overflow-hidden p-3 sm:p-4">
                    <div className="relative w-full" style={{ minHeight: '200px', maxHeight: '400px' }}>
                      <Image
                        src={selectedProject.images[0]}
                        alt={`${selectedProject.title} showcase`}
                        width={800}
                        height={400}
                        className="object-contain w-full h-full rounded-lg"
                        sizes="(max-width: 768px) 100vw, 800px"
                        style={{ 
                          maxWidth: '100%',
                          height: 'auto',
                          maxHeight: '400px'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
                    Project Description
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* All Achievements */}
                {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4 flex items-center">
                      <Award size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                      Key Achievements
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {selectedProject.achievements.map((achievement: string, achIndex: number) => (
                        <div key={achIndex} className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                          <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {selectedProject.technologies.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-600 font-medium text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 🆕 CERTIFICATES SECTION - UPDATED FOR PDF SUPPORT */}
                {selectedProject.certificates && selectedProject.certificates.length > 0 && (
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4 flex items-center">
                      <Award size={18} className="mr-2 text-green-600 dark:text-green-400" />
                      Project Certificates
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {selectedProject.certificates.map((certificate: string, certIndex: number) => {
                        const fileType = getFileType(certificate);
                        const fileName = getFileName(certificate);
                        
                        return (
                          <div key={certIndex} className="group relative">
                            {/* Certificate Preview */}
                            <div className="relative aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300">
                              
                              {/* IMAGE FILE */}
                              {fileType === 'image' && (
                                <>
                                  <Image
                                    src={certificate}
                                    alt={`${selectedProject.title} Certificate ${certIndex + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                  />
                                  
                                  {/* Overlay with View Button */}
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                    <button
                                      onClick={() => window.open(certificate, '_blank')}
                                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-lg text-slate-900 dark:text-slate-100 font-medium hover:bg-white dark:hover:bg-slate-800 transform scale-90 group-hover:scale-100"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <ExternalLink size={16} />
                                        <span>View Certificate</span>
                                      </div>
                                    </button>
                                  </div>
                                </>
                              )}

                              {/* PDF FILE */}
                              {fileType === 'pdf' && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                  {/* PDF Icon */}
                                  <div className="mb-4">
                                    <FileText size={48} className="text-red-500 mx-auto" />
                                  </div>
                                  
                                  {/* PDF Info */}
                                  <div className="text-center space-y-2">
                                    <h6 className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2">
                                      {fileName}
                                    </h6>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                      PDF Document
                                    </p>
                                  </div>
                                  
                                  {/* Buttons */}
                                  <div className="mt-4 flex flex-col space-y-2 w-full">
                                    <button
                                      onClick={() => window.open(certificate, '_blank')}
                                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition-colors"
                                    >
                                      <ExternalLink size={14} />
                                      <span>View PDF</span>
                                    </button>
                                    <a
                                      href={certificate}
                                      download={fileName}
                                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs font-medium transition-colors"
                                    >
                                      <Download size={14} />
                                      <span>Download</span>
                                    </a>
                                  </div>
                                </div>
                              )}

                              {/* UNKNOWN FILE TYPE */}
                              {fileType === 'unknown' && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                  <FileText size={48} className="text-slate-500 mx-auto mb-4" />
                                  <div className="text-center space-y-2">
                                    <h6 className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2">
                                      {fileName}
                                    </h6>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                      Document
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => window.open(certificate, '_blank')}
                                    className="mt-4 flex items-center space-x-2 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md text-xs font-medium transition-colors"
                                  >
                                    <ExternalLink size={14} />
                                    <span>Open File</span>
                                  </button>
                                </div>
                              )}

                              {/* Certificate Number Badge */}
                              <div className="absolute top-2 right-2 bg-green-600/90 text-white px-2 py-1 rounded-md text-xs font-medium">
                                {fileType === 'pdf' ? 'PDF' : 'IMG'} {certIndex + 1}
                              </div>
                            </div>

                            {/* Certificate Info */}
                            <div className="mt-3 text-center">
                              <h5 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {fileType === 'pdf' ? 'PDF Certificate' : 'Certificate Image'} {certIndex + 1}
                              </h5>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                {selectedProject.title} - Official Documentation
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Download All Certificates Button */}
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => {
                          selectedProject.certificates?.forEach((cert, index) => {
                            const link = document.createElement('a');
                            link.href = cert;
                            link.download = `${selectedProject.title}-certificate-${index + 1}`;
                            link.target = '_blank';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          });
                        }}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-sm font-medium border border-green-200 dark:border-green-700"
                      >
                        <Download size={16} />
                        <span>Download All Certificates</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white rounded-lg transition-colors font-medium"
                    >
                      <Github size={20} />
                      <span>View Code</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
                    >
                      <ExternalLink size={20} />
                      <span>View Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}