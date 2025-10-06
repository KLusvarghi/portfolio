export type WorkExperience = {
  title: string;
  company: string;
  period: string;
  location: string;
};

export type Language = {
  name: string;
  level: string;
  certificate?: string;
};

export type Publication = {
  title: string;
  description: string;
  year: string;
  link?: string;
};

export type Education = {
  institution: string;
  degree: string;
  period: string;
  mode: "In-Person" | "Online";
  grade?: string;
};

export type ResumeData = {
  personalInfo: {
    name: string;
    title: string;
    extendedTitle: string;
    email: string;
    location: string;
    linkedin: string;
    github: string | null;
    instagram?: string;
    cv: string;
    phone?: string;
    photo?: string;
    yearsOfExperience: string;
    teamLeadExperience: string;
  };
  shortSummary: string;
  summary: string[];
  skills: {
    languages: string[];
    architecture: string[];
    cloud: string[];
    data: string[];
    quality: string[];
  };
  experience: WorkExperience[];
  education: Education[];
  hardSkills: string[];
  softSkills: string[];
  publications: Publication[];
};

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
    instagram: "https://www.instagram.com/lusvarghkaua",
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
      "JavaScript",
      "HTML5",
      "CSS3",
      "SQL",
    ],
    architecture: [
      "Clean Architecture",
      "SOLID",
      "Hexagonal Architecture",
      "TDD",
      "DDD",
      "Server Actions",
      "REST API",
    ],
    cloud: ["Docker", "GitHub Actions", "Vercel", "AWS (basic)", "CI/CD"],
    data: ["PostgreSQL", "MySQL", "MOngoDB","Redis", "Prisma", "Drizzle ORM"],
    quality: ["Jest", "Supertest", "React Testing Library", "Vitest", "Zod", "Swagger", "JSDocs"],
  },
  experience: [
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
  hardSkills: [
    "Python",
    "FastAPI",
    "SQLAlchemy",
    "Django REST",
    "TypeScript",
    "Node.js",
    "Express",
    "Clean Architecture",
    "DDD",
    "Microservices",
    "AWS",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "Redis",
    "Celery",
    "TDD",
    "Pytest",
  ],
  softSkills: [
    "Problem Solving",
    "Remote Collaboration",
    "Adaptability",
    "Critical Thinking",
    "Communication",
    "Team Leadership",
  ],
  publications: [
    {
      title: "Clinic Appointments",
      description:
        "Multi-tenant platform for integrated medical clinic management with granular permissions system.",
      year: "Jul 2025 - Present",
    },
    {
      title: "Finance App",
      description:
        "SaaS platform for personal financial control with hexagonal architecture and test coverage close to 100%.",
      year: "Aug 2025 - Present",
    },
    {
      title: "Commercial Dashboard",
      description:
        "Complete reconstruction of strategic dashboard for real-time KPI visualization.",
      year: "Nov 2024 - Feb 2025",
    },
  ],
};

export default resumeData;
