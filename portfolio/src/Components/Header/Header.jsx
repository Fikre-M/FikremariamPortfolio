import { useState, useCallback, useEffect } from "react";
import Logo from "../Logo/Logo";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Social media links data
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Fikre-M",
    icon: <FaGithub className="w-5 h-5" />,
    color:
      "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/fikremariam-k-28916062/",
    icon: <FaLinkedin className="w-5 h-5" />,
    color:
      "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300",
  },
  {
    name: "Email",
    url: "mailto:fikreddu@gmail.com",
    icon: <FaEnvelope className="w-5 h-5" />,
    color:
      "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300",
  },
];

const navLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("About");

  // Track which section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest("header")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const handleNavClick = useCallback((e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(targetId);
      setIsOpen(false); // Close mobile menu after navigation
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const isActive = useCallback(
    (linkId) => activeSection === linkId,
    [activeSection]
  );

  return (
    // <header className="sticky top-0 bg-[#141F2E] shadow-md mb-4 z-50">
    <header className="fixed top-0 left-0 right-0 bg-[#141F2E] shadow-md mb-4 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        {/* <a href="#home" onClick={(e) => handleNavClick(e, "home")}>
          <div className="text-white w-32">
            <Logo />
          </div>
        </a> */}
        <a
          href="#HeroSection"
          onClick={(e) => handleNavClick(e, "HeroSection")}
        >
          <div className="text-white w-32">
            <Logo />
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 text-white text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`hover:text-blue-600 transition-colors duration-200 ${
                    isActive(link.id) ? "text-blue-600" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Media Links */}
          <div className="hidden md:flex items-center space-x-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 ${social.color}`}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={() => {
                document.documentElement.classList.toggle("dark");
              }}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
              aria-label="Toggle theme"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              // X icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden relative bg-gray-700 px-4 pb-4 shadow-md overflow-hidden">
          {/* Animated Stars Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Regular Twinkling Stars */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute text-yellow-300 opacity-60 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${8 + Math.random() * 6}px`,
                }}
              >
                ✦
              </div>
            ))}

            {/* Shooting/Tailed Stars */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`comet-${i}`}
                className="absolute text-blue-300 opacity-50 animate-bounce"
                style={{
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  fontSize: "16px",
                }}
              >
                ☄
              </div>
            ))}

            {/* Flying Stars */}
            {[...Array(4)].map((_, i) => (
              <div
                key={`flying-${i}`}
                className="absolute text-white opacity-40 animate-ping"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              >
                ⭐
              </div>
            ))}
          </div>

          {/* Navigation Menu Items */}
          <ul className="space-y-2 relative z-10">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`block py-2 text-gray-100 hover:text-blue-600 transition-colors duration-200 ${
                    isActive(link.id) ? "text-blue-600" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Media Icons for Mobile */}
          <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-600">
            {socialLinks.map((social) => (
              <a
                key={`mobile-${social.name}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 ${social.color}`}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
