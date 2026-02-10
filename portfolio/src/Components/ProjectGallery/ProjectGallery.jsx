import { useState, useMemo } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// DATA: replace img paths and profile links as needed
const profilesData = [
  {
    id: 4,
    img: "/images/netflix.jpg",
    name: "AI Shelter Operations & Case Management System",
    desc: "A next-generation case management system showcasing cutting-edge frontend development with advanced animations, real-time monitoring, and professional-grade user experience.",
    github: "https://github.com/Fikre-M/Netflix",
    website: "https://edu-react-movie-app.knoweledagebased.com/",
    category: "Frontend App",
  },

  {
    id: 1,
    img: "/images/evangadi_forum.jpg",
    name: "AI Healthcare & Medical Appointment System",
    desc: "AI for Health is a modern, production-ready healthcare platform that combines artificial intelligence with intuitive user experience to provide comprehensive healthcare management solutions. Built with React, TypeScript, and modern web technologies, it offers both patient and doctor interfaces with advanced AI assistance.",
    github: "https://github.com/Fikre-M/evangadi_forum",
    website: "https://evangadiforum.knoweledagebased.com/",
    category: "Full-Stack App",
  },
  {
    id: 2,
    img: "/images/apple_bootstrap.jpg",
    name: "AI Ethiopian Tour + Cultural Concierge App",
    desc: "A modern, AI-powered tourism platform for Ethiopia featuring multilingual chat, tour booking, and integrated payment processing.",
    github: "https://github.com/Fikre-M/apllee-clone",
    website: "https://startling-heliotrope-e68744.netlify.app/",
    category: "Full-Stack App",
  },

  {
    id: 3,
    img: "/images/clock_resized.jpg",
    name: "Rideshare Application",
    desc: "A modern, intelligent rideshare application built with React and powered by artificial intelligence. This platform features smart driver-passenger matching, dynamic pricing, route optimization, demand prediction, and predictive analytics.",
    github: "https://github.com/Fikre-M/DigitalClockApp",
    website: "https://clock.rohaazage.com/",
    category: "Frontend App",
  },

  {
    id: 5,
    img: "/images/fms.png",
    name: "My Portfolio",
    desc: "I built a personal portfolio website using Vite, React, and Tailwind CSS to deliver a fast, modern, and responsive platform that showcases my projects and skills. The site features a clean user interface designed to highlight my professional experience and technical expertise.",
    github: "https://github.com/Fikre-M/FP",
    website: "https://www.linkedin.com/in/fikremariam-kassa-28916062/",
    category: "portfolio",
  },
];

function SocialIcon({ href, title, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className={`flex items-center justify-center w-9 h-9 rounded-full bg-gray-900/80 hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${className}`}
    >
      {children}
    </a>
  );
}

function ProjectCard({ profile, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isImageRight = index % 2 === 0;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`
        flex flex-col md:flex-row items-center md:items-stretch gap-16 py-8 
        ${isImageRight ? "md:flex-row-reverse" : ""} 
        ${index < profilesData.length - 1 ? "mb-10 border-b border-gray-700" : ""} 
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE with icons overlaid */}
      <div className="relative flex-shrink-0 mx-auto md:mx-0">
        <div
          className={`bg-gray-700 rounded-xl w-60 h-45 flex items-center justify-center relative overflow-hidden shadow-lg transition-all duration-500 cursor-pointer ${
            isHovered
              ? "shadow-2xl -translate-y-3 scale-105 ring-2 ring-blue-500"
              : "hover:shadow-2xl hover:-translate-y-2"
          }`}
          style={{ height: "180px" }}
        >
          {!imageError ? (
            <img
              src={profile.img}
              alt={profile.name}
              className={`object-cover w-full h-full rounded-xl transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <div className="text-sm">Image not found</div>
              </div>
            </div>
          )}

          {/* Loading placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-600 animate-pulse rounded-xl flex items-center justify-center">
              <div className="text-gray-400">Loading...</div>
            </div>
          )}

          {/* ICONS overlay */}
          <div
            className={`absolute left-2 bottom-2 flex gap-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
            }`}
          >
            <SocialIcon href={profile.github} title="GitHub">
              <FaGithub className="w-5 h-5 text-white" />
            </SocialIcon>
          </div>
          <div
            className={`absolute right-2 bottom-2 flex gap-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
            }`}
          >
            <SocialIcon href={profile.website} title="Live Website">
              <FaExternalLinkAlt className="w-5 h-5 text-white" />
            </SocialIcon>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div
        className={`flex-1 bg-gray-700 rounded-2xl p-6 flex flex-col justify-center shadow-lg transition-all duration-500 cursor-pointer ${
          isHovered
            ? "shadow-2xl -translate-y-3 bg-gray-600"
            : "hover:shadow-2xl hover:-translate-y-2"
        }`}
      >
        <h3 className="text-xl font-bold text-white mb-2">{profile.name}</h3>
        <p className="text-gray-300 leading-relaxed">{profile.desc}</p>
        <div className="mt-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-200 bg-blue-600/30 rounded-full">
            {profile.category === "fullstack-app"
              ? "FullStack App"
              : profile.category === "frontend-app"
                ? "Frontend App"
                : profile.category.charAt(0).toUpperCase() +
                  profile.category.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Define categories - using display names that match the button labels
  const categories = useMemo(() => {
    return ["all", "Full Stack App", "Front-end App", "Portfolio"];
  }, []);

  // Helper function to normalize category for comparison
  const normalizeCategory = (category) => {
    if (!category) return "";
    // Convert to lowercase and remove dashes/spaces for consistent comparison
    return category.toLowerCase().replace(/[-_ ]/g, "");
  };

  // Filter profiles based on category and search term
  const filteredProfiles = useMemo(() => {
    return profilesData.filter((profile) => {
      // Category matching - normalize both for comparison
      const normalizedProfileCategory = normalizeCategory(profile.category);
      let categoryMatch = false;

      if (selectedCategory === "all") {
        categoryMatch = true;
      } else if (selectedCategory === "Full Stack App") {
        // Match both "fullstack-app" and "Full-stack App"
        categoryMatch = normalizedProfileCategory.includes("fullstack");
      } else if (selectedCategory === "Front-end App") {
        // Match both "Frontend App" and "frontend-app"
        categoryMatch = normalizedProfileCategory.includes("frontend");
      } else if (selectedCategory === "Portfolio") {
        // Match "portfolio"
        categoryMatch = normalizedProfileCategory.includes("portfolio");
      }

      // Search matching
      const searchMatch =
        searchTerm === "" ||
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.desc.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchTerm]);

  // Get display name for category badge
  const getCategoryDisplayName = (category) => {
    switch (category.toLowerCase().replace(/[-_ ]/g, "")) {
      case "fullstackapp":
      case "full-stackapp":
        return "Full-Stack App";
      case "frontendapp":
      case "front-endapp":
        return "Frontend App";
      case "portfolio":
        return "Portfolio";
      case "all":
        return "All";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  return (
    <div className="w-full min-h-screen py-10">
      <h2 className="text-center text-4xl font-bold mb-8 relative text-white w-full mt-10">
        My Projects
        <span className="block mx-auto mt-3 h-1 w-24 bg-blue-500 rounded"></span>
      </h2>

      {/* Search and Filter Controls */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 pl-10 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 w-64"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {getCategoryDisplayName(category)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl shadow-2xl p-10 w-full max-w-5xl mx-auto">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, idx) => (
            <ProjectCard key={profile.id} profile={profile} index={idx} />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">No projects found</div>
            <div className="text-gray-500">
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </div>

      {/* Project Count */}
      <div className="text-center mt-6 text-gray-400">
        Showing {filteredProfiles.length} of {profilesData.length} projects
      </div>
    </div>
  );
}