import { useState } from "react";
import {
  FaLaptopCode,
  FaServer,
  FaCodeBranch,
  FaDatabase,
  FaCloudUploadAlt,
  FaMobile,
  FaCogs,
  FaShieldAlt,
} from "react-icons/fa";

// Skills data
const skillsData = [
  {
    id: "frontend",
    icon: "FaLaptopCode",
    title: "Frontend Development",
    description:
      "Expert in modern frontend technologies including React, TypeScript, Next.js, and Vue.js. Proficient in creating responsive, accessible, and performant user interfaces with advanced CSS, Tailwind, and component libraries.",
    level: 90,
  },
  {
    id: "backend",
    icon: "FaServer",
    title: "Backend Development",
    description:
      "Skilled in building scalable server-side applications using Node.js, Express.js, Python, and RESTful APIs. Experience with microservices architecture, authentication systems, and API design best practices.",
    level: 85,
  },
  {
    id: "database",
    icon: "FaDatabase",
    title: "Database Management",
    description:
      "Proficient in both SQL (MySQL, PostgreSQL) and NoSQL (MongoDB, Firebase) databases. Experience with database design, optimization, indexing, and data modeling for high-performance applications.",
    level: 80,
  },
  // {
  //   id: "mobile",
  //   icon: "FaMobile",
  //   title: "Mobile Development",
  //   description:
  //     "Experience in cross-platform mobile development using React Native and Flutter. Knowledge of mobile-first design principles, native device features, and app store deployment processes.",
  //   level: 75,
  // },
  {
    id: "devops",
    icon: "FaCloudUploadAlt",
    title: "DevOps & Cloud",
    description:
      "Proficient in cloud platforms (AWS, Google Cloud), containerization (Docker), CI/CD pipelines, and deployment automation. Experience with monitoring, logging, and infrastructure as code.",
    level: 78,
  },
  {
    id: "version-control",
    icon: "FaCodeBranch",
    title: "Version Control & Collaboration",
    description:
      "Expert in Git workflows, GitHub/GitLab, code review processes, and team collaboration. Experience with branching strategies, merge conflict resolution, and project management tools.",
    level: 95,
  },
  {
    id: "tools",
    icon: "FaCogs",
    title: "Development Tools & Workflow",
    description: "Proficient with build tools (Vite, Webpack), design tools (Figma, Adobe XD), and collaboration platforms (Slack, Jira, Notion). Focused on code quality with ESLint, Prettier, and Husky.",
    level: 88,
  },
];

// Icon mapping
const iconMap = {
  FaLaptopCode: FaLaptopCode,
  FaServer: FaServer,
  FaCodeBranch: FaCodeBranch,
  FaDatabase: FaDatabase,
  FaCloudUploadAlt: FaCloudUploadAlt,
  FaMobile: FaMobile,
  FaCogs: FaCogs,
  FaShieldAlt: FaShieldAlt,
};

const iconGradients = {
  FaLaptopCode: "from-blue-500 to-blue-600",
  FaServer: "from-green-400 to-green-500",
  FaCodeBranch: "from-yellow-400 to-yellow-500",
  FaDatabase: "from-purple-500 to-purple-600",
  FaCloudUploadAlt: "from-orange-500 to-orange-600",
  FaMobile: "from-pink-500 to-pink-600",
  FaCogs: "from-gray-400 to-gray-500",
  FaShieldAlt: "from-red-500 to-red-600",
};

function SkillCard({ skill, index, isHovered, onHover, onLeave }) {
  const IconComponent = iconMap[skill.icon];
  const iconGradient = iconGradients[skill.icon] || "from-gray-400 to-gray-500";

  return (
    <div
      className={`
        flex flex-col bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6
        shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
        cursor-pointer border border-gray-600 h-full transform group
        ${
          isHovered
            ? "ring-2 ring-blue-500 shadow-blue-500/25 scale-[1.02]"
            : ""
        }
      `}
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={onLeave}
    >
      {/* Icon Section */}
      <div className="flex justify-center mb-4">
        <div
          className={`
            p-4 rounded-full bg-gradient-to-br ${iconGradient} 
            transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
            ${isHovered ? "shadow-lg shadow-current/25" : ""}
          `}
        >
          {IconComponent && (
            <IconComponent className="text-white text-3xl" />
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-3 text-center group-hover:text-blue-300 transition-colors duration-300">
        {skill.title}
      </h3>

      {/* Description */}
      <div className="flex-1 flex flex-col">
        <p className="text-gray-300 text-sm leading-relaxed">
          {skill.description}
        </p>
      </div>
    </div>
  );
}

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSkillHover = (skillId) => {
    setHoveredSkill(skillId);
  };

  const handleSkillLeave = () => {
    setHoveredSkill(null);
  };

  // Filter skills based on search term
  const filteredSkills = skillsData.filter((skill) => {
    const matchesSearch =
      skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="w-full py-12 px-6">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            My Skills
          </h2>
          <div className="h-1 w-24 bg-blue-500 rounded-full mx-auto"></div>
          <p className="text-gray-300 mt-5 text-base max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency
            levels across various development domains.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search skills..."
                className="
                  pl-10 pr-4 py-2 w-full bg-gray-700 text-white rounded-lg 
                  border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500 transition-all duration-200
                "
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                index={index}
                isHovered={hoveredSkill === skill.id}
                onHover={handleSkillHover}
                onLeave={handleSkillLeave}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="text-gray-400 text-xl mb-4">No skills found</div>
              <div className="text-gray-500">
                Try adjusting your search terms to find what you're looking for.
              </div>
            </div>
          )}
        </div>

        {/* Skills Count */}
        {filteredSkills.length > 0 && (
          <div className="text-center mt-8 text-sm text-gray-400">
            Showing {filteredSkills.length} of {skillsData.length} skills
          </div>
        )}
      </div>
    </div>
  );
}