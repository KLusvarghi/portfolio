import { ResumeData } from "./types";

const resumeData: ResumeData = {
  personalInfo: {
    name: "Kauã Ortolani Lusvarghi",
    title: "Full Stack Developer",
    extendedTitle:
      "Full Stack Developer, focused on creating scalable solutions that solve real business problems",
    email: "kauaolusvarghi@proton.me",
    location: "Brazil, São Paulo",
    linkedin: "https://www.linkedin.com/in/kaua-lusvarghi-fullstack-dev/",
    github: "https://github.com/KLusvarghi",
    instagram: "https://www.instagram.com/lusvarghi.dev",
    cv: "https://drive.google.com/file/d/1uKgpygddRZ4BtnvMZn1G1SSnbE1-W4H5/view?usp=sharing",
    phone: "+55 (13) 99198-1875",
    photo: "/images/profile.png",
    yearsOfExperience: "3 years focused on front-end",
    teamLeadExperience: "1 year experience in back-end",
  },
  shortSummary:
    "With 3 years of front-end experience and 1 year in back-end, I believe technology is the tool to solve real business problems. I'm an enthusiast of new technologies and dedicate time to understand trends that can optimize my work...",
  summary: [
    "With 3 years of front-end experience and 1 year in back-end, I believe technology is the tool to solve real business problems. I'm an enthusiast of new technologies and dedicate time to understand trends that can optimize my work, with a special focus on leveraging Artificial Intelligence as a tool to accelerate development. Currently, I work on developing scalable multi-tenant SaaS platforms, where I apply modern architectures and business intelligence systems that transform data into actionable insights. I actively seek to understand the product deeply and how technology can generate real business value, always exploring new opportunities to contribute with my skills, grow professionally, and work on impactful projects.",
  ],
  skills: {
    languages: [
      "TypeScript",
      "Node.js",
      "React",
      "Next.js",
      "Express",
      "Fastify",
      "Tanstack",
      "Figma",
      "TailwindCSS",
      "Shadcn UI",
      "Radix UI",
      "HTML5",
      "JavaScript",
      "CSS3",
      "SQL",
    ],
    architecture: [
      "Clean Architecture",
      "SOLID",
      "Arquitetura Hexagonal",
      "TDD",
      "DDD",
      "Server Actions",
      "API REST",
    ],
    cloud: [
      "Docker",
      "GitHub Actions",
      "Vercel",
      "AWS (básico)",
      "CI/CD",
      "Neon",
      "Supabase",
    ],
    data: ["PostgreSQL", "MySQL", "MOngoDB", "Redis", "Prisma", "Drizzle ORM"],
    quality: [
      "Jest",
      "Supertest",
      "React Testing Library",
      "Vitest",
      "Zod",
      "Swagger",
      "JSDocs",
    ],
  },
  experience: [
    {
      title: "Full Stack Software Developer",
      company: "X-VIA® Governo Digital",
      period: "Dec 2025 - Present",
      location: "Remote",
    },
    {
      title: "Full Stack Software Developer",
      company: "Freelancer",
      period: "Mar 2025 - Present",
      location: "Remote",
    },
    {
      title: "Junior Front-end Engineer",
      company: "Mamba Digital & Método 12P",
      period: "Nov 2024 - Feb 2025",
      location: "In-Person",
    },
    {
      title: "IT Intern",
      company: "Praia Grande City Hall",
      period: "Mar 2022 - Feb 2023",
      location: "In-Person",
    },
  ],
  education: [
    {
      institution: "Fatec Praia Grande",
      degree: "Systems Analysis and Development",
      period: "Feb 2021 - Jun 2024",
      mode: "In-Person",
      grade: "GPA: 8.42/10",
    },
    {
      institution: "Full Stack Club",
      degree: "Full Stack Development",
      period: "Jun 2025 - Jun 2026",
      mode: "Online",
    },
    {
      institution: "Wise UP School",
      degree: "English for Business",
      period: "Jan 2025 - Mar 2026",
      mode: "Online",
    },
  ],
};

export default resumeData;
