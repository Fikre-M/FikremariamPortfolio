// import React, { useState, useCallback, useMemo } from "react";
// import { useInView } from "react-intersection-observer";
// import {
//   FaLaptopCode,
//   FaServer,
//   FaCodeBranch,
//   FaDatabase,
//   FaCloudUploadAlt,
//   FaMobile,
//   FaCogs,
//   FaShieldAlt,
// } from "react-icons/fa";
// import { ChevronDown, ChevronUp, X } from "lucide-react";
// import { skills as skillsData } from "../../data/skills";
// import { Skill } from "../../types";
// import { LoadingSkeleton, EmptyState, Button, ErrorState } from "../UI";

// // Icon mapping with proper typing
// const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
//   FaLaptopCode: FaLaptopCode,
//   FaServer: FaServer,
//   FaCodeBranch: FaCodeBranch,
//   FaDatabase: FaDatabase,
//   FaCloudUploadAlt: FaCloudUploadAlt,
//   FaMobile: FaMobile,
//   FaCogs: FaCogs,
//   FaShieldAlt: FaShieldAlt,
// };

// const iconGradients: Record<string, string> = {
//   FaLaptopCode: "from-blue-500 to-blue-600",
//   FaServer: "from-green-400 to-green-500",
//   FaCodeBranch: "from-yellow-400 to-yellow-500",
//   FaDatabase: "from-purple-500 to-purple-600",
//   FaCloudUploadAlt: "from-orange-500 to-orange-600",
//   FaMobile: "from-pink-500 to-pink-600",
//   FaCogs: "from-gray-400 to-gray-500",
//   FaShieldAlt: "from-red-500 to-red-600",
// };

// interface SkillCardProps {
//   skill: Skill;
//   index: number;
//   isHovered: boolean;
//   isAnimated: boolean;
//   isExpanded: boolean;
//   onHover: (skillId: string) => void;
//   onLeave: () => void;
//   onToggleExpand: (skillId: string) => void;
// }

// interface SkillsProps {
//   skills?: Skill[];
//   loading?: boolean;
//   error?: string;
//   onRetry?: () => void;
// }

// const SkillCard: React.FC<SkillCardProps> = ({
//   skill,
//   index,
//   isHovered,
//   isAnimated,
//   isExpanded,
//   onHover,
//   onLeave,
//   onToggleExpand,
// }) => {
//   const handleMouseEnter = useCallback(() => {
//     onHover(skill.id);
//   }, [skill.id, onHover]);

//   const handleToggle = useCallback(() => {
//     onToggleExpand(skill.id);
//   }, [skill.id, onToggleExpand]);

//   // Get the icon component and styling
//   const IconComponent = iconMap[skill.icon];
//   const iconGradient = iconGradients[skill.icon] || "from-gray-400 to-gray-500";

//   return (
//     <article
//       className={`
//         flex flex-col bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-4 sm:p-6
//         shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
//         cursor-pointer border border-gray-600 h-full transform group
//         ${
//           isHovered
//             ? "ring-2 ring-blue-500 shadow-blue-500/25 scale-[1.02]"
//             : ""
//         }
//         ${isAnimated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
//       `}
//       style={{
//         transitionDelay: `${index * 50}ms`,
//       }}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={onLeave}
//       role="button"
//       tabIndex={0}
//       aria-expanded={isExpanded}
//       aria-label={`${skill.title} skill details`}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           e.preventDefault();
//           handleToggle();
//         }
//       }}
//     >
//       {/* Icon Section */}
//       <div className="flex justify-center mb-3 sm:mb-4">
//         <div
//           className={`
//             p-3 sm:p-4 rounded-full bg-gradient-to-br ${iconGradient}
//             transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
//             ${isHovered ? "shadow-lg shadow-current/25" : ""}
//           `}
//         >
//           {IconComponent && (
//             <IconComponent
//               className="text-white text-2xl sm:text-3xl"
//               aria-hidden="true"
//             />
//           )}
//         </div>
//       </div>

//       {/* Title */}
//       <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 text-center group-hover:text-blue-300 transition-colors duration-300">
//         {skill.title}
//       </h3>

//       {/* Description */}
//       <div className="flex-1 flex flex-col">
//         <p
//           className={`
//             text-gray-300 text-sm leading-relaxed transition-all duration-300
//             ${isExpanded ? "" : "line-clamp-3"}
//           `}
//         >
//           {skill.description}
//         </p>

//         {/* Expand/Collapse Button */}
//         {skill.description.length > 100 && (
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={handleToggle}
//             className="mt-2 sm:mt-3 self-start text-blue-400 hover:text-blue-300 p-0 h-auto text-sm"
//             rightIcon={
//               isExpanded ? (
//                 <ChevronUp className="w-4 h-4" />
//               ) : (
//                 <ChevronDown className="w-4 h-4" />
//               )
//             }
//           >
//             {isExpanded ? "Show less" : "Show more"}
//           </Button>
//         )}
//       </div>
//     </article>
//   );
// };

// const Skills: React.FC<SkillsProps> = ({
//   skills = skillsData,
//   loading = false,
//   error,
//   onRetry,
// }) => {
//   const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
//   const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());
//   const [searchTerm, setSearchTerm] = useState("");

//   const { ref, inView } = useInView({
//     threshold: 0.1,
//     triggerOnce: true,
//   });

//   // Handle skill interactions
//   const handleSkillHover = useCallback((skillId: string) => {
//     setHoveredSkill(skillId);
//   }, []);

//   const handleSkillLeave = useCallback(() => {
//     setHoveredSkill(null);
//   }, []);

//   const handleToggleExpand = useCallback((skillId: string) => {
//     setExpandedSkills((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(skillId)) {
//         newSet.delete(skillId);
//       } else {
//         newSet.add(skillId);
//       }
//       return newSet;
//     });
//   }, []);

//   const handleClearSearch = useCallback(() => {
//     setSearchTerm("");
//   }, []);

//   // Filter and sort skills
//   const filteredSkills = useMemo(() => {
//     let filtered = skills.filter((skill) => {
//       const matchesSearch =
//         skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         skill.description.toLowerCase().includes(searchTerm.toLowerCase());

//       return matchesSearch;
//     });

//     // Sort skills by name
//     filtered.sort((a, b) => a.title.localeCompare(b.title));

//     return filtered;
//   }, [skills, searchTerm]);

//   if (loading) {
//     return (
//       <section
//         className="w-full py-8 sm:py-12 px-4 sm:px-6"
//         aria-label="Loading skills"
//       >
//         <div className="max-w-6xl mx-auto w-full">
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
//               My Skills
//             </h2>
//             <div className="h-1 w-20 sm:w-24 bg-blue-500 rounded-full mx-auto"></div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//             {Array.from({ length: 8 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-800 rounded-xl p-4 sm:p-6 animate-pulse"
//               >
//                 <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gray-700 rounded-full mx-auto mb-4"></div>
//                 <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-3"></div>
//                 <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
//                 <div className="h-3 bg-gray-700 rounded w-5/6 mb-2"></div>
//                 <div className="h-3 bg-gray-700 rounded w-4/6"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section
//         className="w-full py-8 sm:py-12 px-4 sm:px-6"
//         aria-label="Error loading skills"
//       >
//         <div className="max-w-6xl mx-auto w-full">
//           <ErrorState
//             title="Failed to load skills"
//             message={error}
//             onRetry={onRetry}
//             className="mt-10 sm:mt-20"
//           />
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
//       ref={ref}
//       className="w-full py-8 sm:py-12 px-4 sm:px-6"
//       aria-labelledby="skills-heading"
//     >
//       <div className="max-w-6xl mx-auto w-full">
//         {/* Header */}
//         <header className="text-center mb-8 sm:mb-12">
//           <h2
//             id="skills-heading"
//             className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4"
//           >
//             My Skills
//           </h2>
//           <div
//             className="h-1 w-20 sm:w-24 bg-blue-500 rounded-full mx-auto"
//             aria-hidden="true"
//           ></div>
//           <p className="text-gray-300 mt-4 sm:mt-5 text-sm sm:text-base max-w-2xl mx-auto">
//             A comprehensive overview of my technical expertise and proficiency
//             levels across various development domains.
//           </p>
//         </header>

//         {/* Search and Filter Controls */}
//         <div className="mb-6 sm:mb-8">
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center mb-4">
//             <div className="relative w-full max-w-md">
//               <input
//                 type="search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search skills..."
//                 className="
//                   pl-10 pr-4 py-2 w-full bg-gray-700 text-white rounded-lg
//                   border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500
//                   focus:border-blue-500 transition-all duration-200 text-sm sm:text-base
//                 "
//                 aria-label="Search skills"
//               />
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//               {searchTerm && (
//                 <button
//                   type="button"
//                   onClick={handleClearSearch}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
//                   aria-label="Clear search"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Skills Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//           {filteredSkills.length > 0 ? (
//             filteredSkills.map((skill, index) => (
//               <SkillCard
//                 key={skill.id}
//                 skill={skill}
//                 index={index}
//                 isHovered={hoveredSkill === skill.id}
//                 isAnimated={inView}
//                 isExpanded={expandedSkills.has(skill.id)}
//                 onHover={handleSkillHover}
//                 onLeave={handleSkillLeave}
//                 onToggleExpand={handleToggleExpand}
//               />
//             ))
//           ) : (
//             <div className="col-span-full py-12 text-center">
//               <EmptyState
//                 variant="search"
//                 title="No skills found"
//                 message="Try adjusting your search terms or filters to find what you're looking for."
//                 actionLabel="Clear filters"
//                 onAction={handleClearSearch}
//               />
//             </div>
//           )}
//         </div>

//         {/* Skills Count */}
//         {filteredSkills.length > 0 && (
//           <div className="text-center mt-8 text-sm text-gray-400">
//             Showing {filteredSkills.length} of {skills.length} skills
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Skills;

import React, { useState, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
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
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { skills as skillsData } from "../../data/skills";
import { Skill } from "../../types";
import { EmptyState, Button, ErrorState } from "../UI";

// Icon mapping with proper typing
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaLaptopCode: FaLaptopCode,
  FaServer: FaServer,
  FaCodeBranch: FaCodeBranch,
  FaDatabase: FaDatabase,
  FaCloudUploadAlt: FaCloudUploadAlt,
  FaMobile: FaMobile,
  FaCogs: FaCogs,
  FaShieldAlt: FaShieldAlt,
};

const iconGradients: Record<string, string> = {
  FaLaptopCode: "from-blue-500 to-blue-600",
  FaServer: "from-green-400 to-green-500",
  FaCodeBranch: "from-yellow-400 to-yellow-500",
  FaDatabase: "from-purple-500 to-purple-600",
  FaCloudUploadAlt: "from-orange-500 to-orange-600",
  FaMobile: "from-pink-500 to-pink-600",
  FaCogs: "from-gray-400 to-gray-500",
  FaShieldAlt: "from-red-500 to-red-600",
};

interface SkillCardProps {
  skill: Skill;
  index: number;
  isHovered: boolean;
  isAnimated: boolean;
  isExpanded: boolean;
  onHover: (skillId: string) => void;
  onLeave: () => void;
  onToggleExpand: (skillId: string) => void;
}

interface SkillsProps {
  skills?: Skill[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  index,
  isHovered,
  isAnimated,
  isExpanded,
  onHover,
  onLeave,
  onToggleExpand,
}) => {
  const handleMouseEnter = useCallback(() => {
    onHover(skill.id);
  }, [skill.id, onHover]);

  const handleToggle = useCallback(() => {
    onToggleExpand(skill.id);
  }, [skill.id, onToggleExpand]);

  // Get the icon component and styling
  const IconComponent = iconMap[skill.icon];
  const iconGradient = iconGradients[skill.icon] || "from-gray-400 to-gray-500";

  return (
    <article
      className={`
        flex flex-col bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-4 sm:p-6
        shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
        cursor-pointer border border-gray-600 h-full transform group
        ${
          isHovered
            ? "ring-2 ring-blue-500 shadow-blue-500/25 scale-[1.02]"
            : ""
        }
        ${isAnimated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
      `}
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${skill.title} skill details`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      {/* Icon Section */}
      <div className="flex justify-center mb-3 sm:mb-4">
        <div
          className={`
            p-3 sm:p-4 rounded-full bg-gradient-to-br ${iconGradient} 
            transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
            ${isHovered ? "shadow-lg shadow-current/25" : ""}
          `}
        >
          {IconComponent && (
            <IconComponent
              className="text-white text-2xl sm:text-3xl"
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 text-center group-hover:text-blue-300 transition-colors duration-300">
        {skill.title}
      </h3>

      {/* Description */}
      <div className="flex-1 flex flex-col">
        <p
          className={`
            text-gray-300 text-sm leading-relaxed transition-all duration-300
            ${isExpanded ? "" : "line-clamp-3"}
          `}
        >
          {skill.description}
        </p>

        {/* Expand/Collapse Button */}
        {skill.description.length > 100 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            className="mt-2 sm:mt-3 self-start text-blue-400 hover:text-blue-300 p-0 h-auto text-sm"
            rightIcon={
              isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )
            }
          >
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        )}
      </div>
    </article>
  );
};

const Skills: React.FC<SkillsProps> = ({
  skills = skillsData,
  loading = false,
  error,
  onRetry,
}) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Handle skill interactions
  const handleSkillHover = useCallback((skillId: string) => {
    setHoveredSkill(skillId);
  }, []);

  const handleSkillLeave = useCallback(() => {
    setHoveredSkill(null);
  }, []);

  const handleToggleExpand = useCallback((skillId: string) => {
    setExpandedSkills((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      return newSet;
    });
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    let filtered = skills.filter((skill) => {
      const matchesSearch =
        skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    // Sort skills by name
    filtered.sort((a, b) => a.title.localeCompare(b.title));

    return filtered;
  }, [skills, searchTerm]);

  if (loading) {
    return (
      <section
        className="w-full py-8 sm:py-12 px-4 sm:px-6"
        aria-label="Loading skills"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
              My Skills
            </h2>
            <div className="h-1 w-20 sm:w-24 bg-blue-500 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-4 sm:p-6 animate-pulse"
              >
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gray-700 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-3"></div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-5/6 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-4/6"></div>
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
        className="w-full py-8 sm:py-12 px-4 sm:px-6"
        aria-label="Error loading skills"
      >
        <div className="max-w-6xl mx-auto w-full">
          <ErrorState
            title="Failed to load skills"
            message={error}
            onRetry={onRetry}
            className="mt-10 sm:mt-20"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="w-full py-8 sm:py-12 px-4 sm:px-6"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4"
          >
            My Skills
          </h2>
          <div
            className="h-1 w-20 sm:w-24 bg-blue-500 rounded-full mx-auto"
            aria-hidden="true"
          ></div>
          <p className="text-gray-300 mt-4 sm:mt-5 text-sm sm:text-base max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency
            levels across various development domains.
          </p>
        </header>

        {/* Search and Filter Controls */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center mb-4">
            <div className="relative w-full max-w-md">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search skills..."
                className="
                  pl-10 pr-4 py-2 w-full bg-gray-700 text-white rounded-lg 
                  border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500 transition-all duration-200 text-sm sm:text-base
                "
                aria-label="Search skills"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                index={index}
                isHovered={hoveredSkill === skill.id}
                isAnimated={inView}
                isExpanded={expandedSkills.has(skill.id)}
                onHover={handleSkillHover}
                onLeave={handleSkillLeave}
                onToggleExpand={handleToggleExpand}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <EmptyState
                variant="search"
                title="No skills found"
                message="Try adjusting your search terms or filters to find what you're looking for."
                actionLabel="Clear filters"
                onAction={handleClearSearch}
              />
            </div>
          )}
        </div>

        {/* Skills Count */}
        {filteredSkills.length > 0 && (
          <div className="text-center mt-8 text-sm text-gray-400">
            Showing {filteredSkills.length} of {skills.length} skills
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;