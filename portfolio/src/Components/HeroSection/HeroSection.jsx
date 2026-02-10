import React, { useState, useEffect, useCallback } from "react";
import { Code2, Github, Linkedin, Mail } from "lucide-react";

// Import local images
import healthcareBg from "../../assets/healthcare-bg.jpg";
import tourBg from "../../assets/tour-bg.jpg";
import shelterBg from "../../assets/shelter-bg.jpg";
import portfolioBg from "../../assets/portfolio-bg.jpg";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const slides = [
    {
      image: healthcareBg,
      title: "AI Healthcare & Medical Appointment System",
      description: "Full-stack App",
    },
    {
      image: tourBg,
      title: "AI Ethiopian Tour + Cultural Concierge App",
      description: "Full-stack App",
    },
    {
      image: shelterBg,
      title: "AI Shelter Operations & Case Management System",
      description: "Frontend App",
    },
    {
      image: portfolioBg,
      title: "Personal Portfolio",
      description: "FikreWorks",
    },
  ];

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const handleButtonClick = useCallback(
    (sectionId) => {
      // Add visual feedback
      const button = document.activeElement;
      if (button) {
        button.style.transform = "scale(0.95)";
        setTimeout(() => {
          button.style.transform = "";
        }, 150);
      }
      scrollToSection(sectionId);
    },
    [scrollToSection],
  );

  const handleSocialClick = useCallback((url) => {
    // Add visual feedback
    const button = document.activeElement;
    if (button) {
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "";
      }, 150);
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  // Auto-advance slides when not hovered
  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, isHovered, slides.length]);

  // Handle keyboard navigation for arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = slides.map((slide) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [slides]);

  return (
    <section
      id="HeroSection"
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Hero Section"
    >
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90"
              aria-hidden="true"
            ></div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 md:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent ${
              index === currentSlide
                ? "bg-blue-500 w-8"
                : "bg-gray-400/50 hover:bg-gray-300 w-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
            type="button"
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-30 h-full flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="max-w-4xl w-full text-center px-4 sm:px-6 lg:px-8 py-4">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse text-white text-lg">Loading...</div>
            </div>
          )}

          {/* Project Label */}
          <div className="mb-3 sm:mb-4 inline-block px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-full border border-blue-500/50 transform transition-all duration-500 ease-in-out">
            <p className="text-blue-200 text-sm sm:text-base font-semibold leading-tight">
              {slides[currentSlide].title}
            </p>
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 drop-shadow-2xl transform transition-all duration-500 ease-in-out leading-tight">
            Fikremariam Kassa
          </h1>

          {/* Title */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 transform transition-all duration-500 ease-in-out">
            <Code2
              className="text-blue-400 drop-shadow-lg w-5 h-5 sm:w-6 sm:h-6"
              aria-hidden="true"
            />
            <h2 className="text-lg sm:text-xl md:text-2xl text-blue-300 font-semibold drop-shadow-lg leading-tight">
              Web Developer / Software Engineer (Full Stack - MERN)
            </h2>
          </div>

          {/* Value Statement */}
          <p className="text-base sm:text-lg md:text-xl text-white mb-3 max-w-2xl mx-auto drop-shadow-lg font-medium leading-snug transform transition-all duration-500 ease-in-out">
            I build responsive, user-friendly, and industry-level web
            applications.
          </p>

          {/* Current Project Description */}
          <p className="text-xs sm:text-sm text-gray-200 mb-4 sm:mb-6 italic drop-shadow-md transform transition-all duration-500 ease-in-out leading-tight">
            {slides[currentSlide].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6 transform transition-all duration-500 ease-in-out relative z-40">
            <button
              onClick={() => handleButtonClick("projects")}
              className="px-5 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-2xl hover:shadow-blue-500/50 text-center cursor-pointer text-sm sm:text-base"
              aria-label="View my projects"
              type="button"
            >
              View Projects
            </button>
            <button
              onClick={() => handleButtonClick("contact")}
              className="px-5 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/50 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-xl text-center cursor-pointer text-sm sm:text-base"
              aria-label="Contact me"
              type="button"
            >
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-2 sm:gap-3">
            <button
              onClick={() => handleSocialClick("https://github.com/Fikre-M")}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-xl"
              aria-label="GitHub profile (opens in new tab)"
              title="View my GitHub profile"
              type="button"
            >
              <Github
                className="text-white w-4 h-4 sm:w-5 sm:h-5"
                aria-hidden="true"
              />
            </button>
            <button
              onClick={() =>
                handleSocialClick(
                  "https://www.linkedin.com/in/fikremariam-k-28916062/",
                )
              }
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-xl"
              aria-label="LinkedIn profile (opens in new tab)"
              title="Connect with me on LinkedIn"
              type="button"
            >
              <Linkedin
                className="text-white w-4 h-4 sm:w-5 sm:h-5"
                aria-hidden="true"
              />
            </button>
            <button
              onClick={() => handleButtonClick("contact")}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-xl"
              aria-label="Go to contact section"
              title="Contact me"
              type="button"
            >
              <Mail
                className="text-white w-4 h-4 sm:w-5 sm:h-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}