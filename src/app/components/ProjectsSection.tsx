'use client';

import { useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Calendar, Award, Eye } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/constants/data';

interface GitHubRepo {
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

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [showGithubRepos, setShowGithubRepos] = useState(false);
  type Project = typeof projects[number];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const featuredProjects = projects.filter(p => p.featured);

  // GitHub API integration (optional)
  const fetchGitHubRepos = async () => {
    setIsLoadingGithub(true);
    try {
      const response = await fetch('https://api.github.com/users/satriadhm/repos?sort=updated&per_page=12');
      if (response.ok) {
        const repos = await response.json();
        setGithubRepos(repos);
      }
    } catch (error) {
      console.error('Failed to fetch GitHub repos:', error);
    }
    setIsLoadingGithub(false);
  };

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
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            A collection of projects showcasing my technical skills and problem-solving abilities, 
            ranging from blockchain innovations to AR-based educational platforms and social impact solutions.
          </p>
        </div>

        {/* GitHub Integration Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setShowGithubRepos(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
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
                if (githubRepos.length === 0) {
                  fetchGitHubRepos();
                }
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center space-x-2 ${
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
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    selectedCategory === category
                      ? 'bg-slate-900 text-white shadow-sm border-slate-900 dark:bg-slate-600 dark:border-slate-600'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                  {category !== 'all' && (
                    <span className="ml-2 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">
                      {projects.filter(p => p.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Featured Projects Showcase */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {featuredProjects.slice(0, 2).map((project) => (
                <div key={project.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  {/* Project Image */}
                  {project.images && project.images.length > 0 && (
                    <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
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
                  
                  <div className="p-8 space-y-6">
                    <div className="flex items-start justify-between">
                      <span className={`px-3 py-2 rounded-lg text-sm font-medium border ${getCategoryColor(project.category)}`}>
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
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Achievements */}
                    {project.achievements && project.achievements.length > 0 && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
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
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-md border border-slate-200 dark:border-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* All Projects Grid */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
                {selectedCategory === 'all' ? 'All Projects' : `${selectedCategory} Projects`}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300 group overflow-hidden">
                    {/* Project Image */}
                    {project.images && project.images.length > 0 && (
                      <div className="relative h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                        <Image
                          src={project.images[0]}
                          alt={`${project.title} preview`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(project.category)}`}>
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
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
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

        {/* GitHub Repos */}
        {showGithubRepos && (
          <div>
            {isLoadingGithub ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto"></div>
                <p className="text-slate-600 dark:text-slate-400 mt-4">Loading GitHub repositories...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubRepos.map((repo) => (
                  <div key={repo.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300 group">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Github size={20} className="text-slate-500" />
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {repo.language || 'Repository'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-slate-500 dark:text-slate-400">
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
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
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
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 my-4">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between z-10 rounded-t-2xl">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {selectedProject.title}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium border mt-2 ${getCategoryColor(selectedProject.category)}`}>
                    {selectedProject.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-8">
                {/* Project Image */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl overflow-hidden p-4">
                    <div className="relative w-full" style={{ minHeight: '300px', maxHeight: '500px' }}>
                      <Image
                        src={selectedProject.images[0]}
                        alt={`${selectedProject.title} showcase`}
                        width={800}
                        height={400}
                        className="object-contain w-full h-full rounded-lg"
                        sizes="800px"
                        style={{ 
                          maxWidth: '100%',
                          height: 'auto',
                          maxHeight: '500px'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Project Description
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* All Achievements */}
                {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                      <Award size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                      Key Achievements
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedProject.achievements.map((achievement: string, achIndex: number) => (
                        <div key={achIndex} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-600 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white rounded-lg transition-colors font-medium"
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
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
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