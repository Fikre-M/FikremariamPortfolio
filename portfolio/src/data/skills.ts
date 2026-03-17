import { Skill } from '../types';

export const skills: Skill[] = [
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
