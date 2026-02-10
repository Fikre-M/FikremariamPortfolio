import React, { useState, useMemo, useCallback } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Search, X } from "lucide-react";
import { LoadingSkeleton, ErrorState, EmptyState, Button } from "../UI";

interface Project {
  id: number;
  img: string;
  name: string;
  desc: string;
  github: string;
  website: string;
  category: string;
  technologies?: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onImageError: (id: number) => void;
}

interface ProjectGalleryProps {
  projects?: Project[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

const defaultProjects: Project[] = [
  // Full Stack Apps
  {
    id: 1,
    img: "/images/amazon.jpg",
    name: "Amazon Clone - E-commerce Platform",
    desc: "A full-stack Amazon clone built with React, Node.js, and Firebase. This e-commerce platform includes user authentication, product listings, cart functionality, and order processing with a responsive design.",
    github: "https://github.com/Fikre-M/amazon_replica",
    website: "https://amazon-replica-fikre.netlify.app/",
    category: "Full Stack App",
    technologies: ["React", "Node.js", "Firebase", "Redux"],
  },
  {
    id: 2,
    img: "/images/evangadi_forum.jpg",
    name: "AI Ethiopian Tour + Cultural Concierge App",
    desc: "A responsive question and answer forum application built with Vite React and Node.js, featuring a MySQL database. This project provides a platform for users to engage in discussions and share ideas, showcasing a clean and intuitive design.",
    github: "https://github.com/Fikre-M/evangadi_forum",
    website: "https://evangadiforum.knoweledagebased.com/",
    category: "Full Stack App",
    technologies: ["React", "Node.js", "MySQL", "Vite"],
  },

  // Front-end Apps
  {
    id: 3,
    img: "/images/apple_bootstrap.jpg",
    name: "Apple Website Clone",
    desc: "A responsive Apple website clone built with React and Bootstrap. This project showcases a sleek and modern interface, mirroring Apple's aesthetic with clean design and smooth animations.",
    github: "https://github.com/Fikre-M/apllee-clone",
    website: "https://startling-heliotrope-e68744.netlify.app/",
    category: "Front-end App",
    technologies: ["React", "Bootstrap", "CSS3", "Responsive Design"],
  },
  {
    id: 4,
    img: "/images/clock_resized.jpg",
    name: "Digital Clock App",
    desc: "I developed an interactive Digital Clock application integrated with a chatbot using Vite and React to provide users with real-time timekeeping and conversational assistance within a single, modern web interface.",
    github: "https://github.com/Fikre-M/DigitalClockApp",
    website: "https://clock.rohaazage.com/",
    category: "Front-end App",
    technologies: ["React", "Vite", "JavaScript", "CSS"],
  },

  // Portfolio
  {
    id: 5,
    img: "/images/fms.png",
    name: "My Portfolio",
    desc: "I built a personal portfolio website using Vite, React, and Tailwind CSS to deliver a fast, modern, and responsive platform that showcases my projects and skills. The site features a clean user interface designed to highlight my professional experience and technical expertise.",
    github: "https://github.com/Fikre-M/FP",
    website: "https://www.linkedin.com/in/fikremariam-kassa-28916062/",
    category: "Portfolio",
    technologies: ["React", "Tailwind CSS", "Vite", "TypeScript"],
  },
];

const SocialIcon: React.FC<{
  href: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ href, title, children, className = "" }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className={`
        flex items-center justify-center w-9 h-9 rounded-full 
        bg-gray-900/80 hover:bg-blue-500 transition-all duration-300 
        shadow-lg hover:shadow-xl transform hover:scale-110 
        hover:ring-2 hover:ring-blue-400 hover:ring-opacity-75
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      aria-label={title}
    >
      {children}
    </a>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onImageError,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isImageRight = index % 2 === 0;

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    onImageError(project.id);
  }, [project.id, onImageError]);

  return (
    <article
      className={`
        flex flex-col md:flex-row items-center md:items-stretch gap-8 py-8 
        ${isImageRight ? "md:flex-row-reverse" : ""} 
        ${index < defaultProjects.length - 1 ? "mb-10 border-b border-gray-700" : ""} 
        transition-all duration-300 ${isHovered ? "px-4" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative flex-shrink-0 mx-auto md:mx-0">
        <div
          className={`
            bg-gray-700 rounded-xl w-60 h-45 flex items-center justify-center 
            relative overflow-hidden shadow-lg transition-all duration-500 cursor-pointer
            ${
              isHovered
                ? "shadow-2xl shadow-blue-500/25 -translate-y-3 scale-105 ring-4 ring-blue-500 ring-opacity-60"
                : "hover:shadow-2xl hover:-translate-y-2 hover:ring-2 hover:ring-blue-500 hover:ring-opacity-40"
            }
          `}
          style={{ height: "180px" }}
        >
          {!imageError ? (
            <>
              {!imageLoaded && (
                <LoadingSkeleton variant="image" className="absolute inset-0" />
              )}
              <img
                src={project.img}
                alt={`${project.name} project screenshot`}
                className={`
                  object-cover w-full h-full rounded-xl transition-all duration-500 
                  ${imageLoaded ? "opacity-100" : "opacity-0"}
                  ${isHovered ? "brightness-110" : ""}
                `}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2" aria-hidden="true">
                  📷
                </div>
                <div className="text-sm">Image not available</div>
              </div>
            </div>
          )}

          {/* Social Icons */}
          <div
            className={`
              absolute left-2 bottom-2 flex gap-2 transition-all duration-300 
              ${isHovered ? "opacity-100 scale-110" : "opacity-0 md:opacity-100"}
            `}
          >
            <SocialIcon href={project.github} title="View GitHub Repository">
              <FaGithub className="w-5 h-5 text-white" />
            </SocialIcon>
          </div>
          <div
            className={`
              absolute right-2 bottom-2 flex gap-2 transition-all duration-300 
              ${isHovered ? "opacity-100 scale-110" : "opacity-0 md:opacity-100"}
            `}
          >
            <SocialIcon href={project.website} title="Visit Live Website">
              <FaExternalLinkAlt className="w-5 h-5 text-white" />
            </SocialIcon>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        className={`
          flex-1 bg-gray-700 rounded-2xl p-6 flex flex-col justify-center 
          shadow-lg transition-all duration-500 cursor-pointer
          ${
            isHovered
              ? "shadow-2xl shadow-blue-500/25 -translate-y-3 bg-gray-600 ring-2 ring-blue-500 ring-opacity-50"
              : "hover:shadow-2xl hover:-translate-y-2 hover:ring-2 hover:ring-blue-500 hover:ring-opacity-30"
          }
        `}
      >
        <h3
          className={`
            text-xl font-bold mb-2 transition-colors duration-300 
            ${isHovered ? "text-blue-300" : "text-white"}
          `}
        >
          {project.name}
        </h3>

        <p
          className={`
            leading-relaxed mb-4 transition-colors duration-300 
            ${isHovered ? "text-gray-200" : "text-gray-300"}
          `}
        >
          {project.desc}
        </p>

        {/* Technologies */}
        {project.technologies && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 text-xs bg-gray-600 text-gray-200 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div>
          <span
            className={`
              inline-block px-3 py-1 text-xs font-semibold rounded-full 
              transition-all duration-300
              ${
                isHovered
                  ? "text-blue-100 bg-blue-500/50 ring-1 ring-blue-400"
                  : "text-blue-200 bg-blue-600/30"
              }
            `}
          >
            {project.category === "fullstack-app"
              ? "Full Stack App"
              : project.category === "frontend-app"
                ? "Front-end App"
                : project.category.charAt(0).toUpperCase() +
                  project.category.slice(1)}
          </span>
        </div>
      </div>
    </article>
  );
};

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects = defaultProjects,
  loading = false,
  error,
  onRetry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleImageError = useCallback((projectId: number) => {
    console.log(`Image failed to load for project ${projectId}`);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategory("All");
    setSearchTerm("");
  }, []);

  // Define categories based on available projects
  const categories = useMemo(() => {
    // Always include these categories in the filter
    return ["All", "Full Stack App", "Front-end App", "Portfolio"];
  }, []);

  // Get display name for category
  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case "fullstack-app":
        return "Full Stack App";
      case "frontend-app":
        return "Front-end App";
      case "portfolio":
        return "Portfolio";
      case "All":
        return "All";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  // Filter projects based on category and search term
  const filteredProjects = useMemo(() => {
    console.log("Filtering projects with:", {
      selectedCategory,
      searchTerm,
      allCategories: categories,
      projects: projects.map((p) => ({ name: p.name, category: p.category })),
    });

    const result = projects.filter((project) => {
      // Handle 'All' category
      const isAll = selectedCategory === "All" || selectedCategory === "all";
      const categoryMatch =
        isAll || getCategoryDisplayName(project.category) === selectedCategory;

      console.log(`Project '${project.name}' (${project.category}):`, {
        matchesCategory: categoryMatch,
        isAll,
        selectedCategory,
        projectCategory: project.category,
      });

      const searchMatch =
        searchTerm === "" ||
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.technologies &&
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase()),
          ));

      return categoryMatch && searchMatch;
    });

    console.log("Filtered projects:", result);
    return result;
  }, [projects, selectedCategory, searchTerm, categories]);

  if (loading) {
    return (
      <section
        className="w-full min-h-screen py-10"
        aria-label="Loading projects"
      >
        <div className="max-w-5xl mx-auto px-4">
          <LoadingSkeleton
            variant="text"
            width="w-64"
            height="h-8"
            className="mx-auto mb-8"
          />
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8">
                <LoadingSkeleton variant="image" />
                <div className="flex-1 space-y-4">
                  <LoadingSkeleton variant="text" width="w-3/4" height="h-6" />
                  <LoadingSkeleton variant="text" count={3} />
                  <LoadingSkeleton variant="button" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="w-full min-h-screen py-10"
        aria-label="Error loading projects"
      >
        <div className="max-w-5xl mx-auto px-4">
          <ErrorState
            title="Failed to load projects"
            message={error}
            onRetry={onRetry}
            className="mt-20"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen py-10" aria-label="Project gallery">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">My Projects</h2>
          <div
            className="mx-auto h-1 w-24 bg-blue-500 rounded"
            aria-hidden="true"
          />
        </header>

        {/* Search and Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* Search Input */}
            <div className="relative">
              <label htmlFor="project-search" className="sr-only">
                Search projects
              </label>
              <input
                id="project-search"
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  px-4 py-2 pl-10 pr-10 bg-gray-700 text-white rounded-lg 
                  border border-gray-600 focus:outline-none focus:border-blue-500 
                  focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-64 
                  transition-all duration-200
                "
                aria-describedby="search-help"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400 w-4 h-4"
                aria-hidden="true"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="
                    absolute right-3 top-2.5 text-gray-400 hover:text-white
                    focus:outline-none focus:text-white
                  "
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div id="search-help" className="sr-only">
                Search by project name, description, or technology
              </div>
            </div>

            {/* Category Filter */}
            <div
              className="flex gap-2 flex-wrap justify-center"
              role="group"
              aria-label="Filter by category"
            >
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-4 py-2 rounded-lg transition-all duration-200 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      ${
                        isActive
                          ? "bg-blue-500 text-white ring-2 ring-blue-400 ring-opacity-50 shadow-lg"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:ring-2 hover:ring-blue-500 hover:ring-opacity-30"
                      }
                    `}
                    aria-pressed={isActive}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "all" || searchTerm) && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-sm text-gray-400">Active filters:</span>
              {selectedCategory !== "all" && (
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {getCategoryDisplayName(selectedCategory)}
                </span>
              )}
              {searchTerm && (
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  "{searchTerm}"
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                leftIcon={<X className="w-3 h-3" />}
                className="text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <main className="bg-gray-800 rounded-2xl shadow-2xl p-10">
          {filteredProjects.length > 0 ? (
            <div className="space-y-8">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onImageError={handleImageError}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              variant={
                searchTerm || selectedCategory !== "all" ? "search" : "data"
              }
              title={
                searchTerm || selectedCategory !== "all"
                  ? "No projects found"
                  : "No projects available"
              }
              message={
                searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search terms or filters to find what you're looking for."
                  : "Projects will appear here once they are added."
              }
              actionLabel={
                searchTerm || selectedCategory !== "all"
                  ? "Clear filters"
                  : undefined
              }
              onAction={
                searchTerm || selectedCategory !== "all"
                  ? handleClearFilters
                  : undefined
              }
            />
          )}
        </main>

        {/* Project Count */}
        {filteredProjects.length > 0 && (
          <footer className="text-center mt-6 text-gray-400">
            <span className="sr-only">Results: </span>
            Showing {filteredProjects.length} of {projects.length} projects
          </footer>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;