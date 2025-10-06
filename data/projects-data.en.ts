export type Project = {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  tags: string[];
  github: string;
  demo: string | null;
  categories?: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Finance App",
    description: "A finance API to manage your personal finances.",
    image: null,
    tags: [
      "Typescript",
      "Express",
      "React",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "CI/CD",
      "Swagger",
      "Shadcn",
      "Tailwind",
      "Jest",
      "Supertest",
    ],
    categories: ["API", "Fullstack"],
    github: "https://github.com/KLusvarghi/finance-api",
    demo: null,
  },
  {
    id: 2,
    title: "Clinic Appointments",
    description: "A clinic appointments platform to manage your appointments.",
    image: null,
    tags: [
      "Typescript",
      "Next.js",
      "Drizzle",
      "PostgreSQL",
      "Docker",
      "CI/CD",
      "Shadcn",
      "Tailwind",
      "Better Auth",
      "Neon",
      "Zod",
    ],
    categories: ["Fullstack", "Server Action"],
    github: "https://github.com/KLusvarghi/clinic-appointments",
    demo: null,
  },
  {
    id: 3,
    title: "Next Saas",
    description: "A Next.js SaaS template to build your own SaaS product.",
    image: null,
    tags: [
      "Typescript",
      "Next.js",
      "Shadcn",
      "Tailwind",
      "Supabase",
      "Docker",
      "Turborepo",
      "Prisma",
      "Fastify",
      "Swagger",
      "Zod",
      "CASL",
      "Jest",
    ],
    categories: ["Fullstack", "API", "RBAC"],
    github: "https://github.com/KLusvarghi/next-saas-rbac/",
    demo: null,
  },
  {
    id: 4,
    title: "Api Swagger",
    description: "A Swagger API to manage your APIs with documentation.",
    image: null,
    tags: ["Typescript", "Express", "Swagger"],
    categories: ["API"],
    github: "https://github.com/KLusvarghi/api-swagger/",
    demo: null,
  },
  {
    id: 5,
    title: "Realtime Docs",
    description: "Real-time collaborative documents to manage your documentation.",
    image: null,
    tags: [
      "Javascript",
      "Express",
      "MongoDB",
      "Socket.io",
      "WebSocket",
      "Mongoose",
    ],
    categories: ["Fullstack", "Socket.IO"],
    github: "https://github.com/KLusvarghi/realtime-docs",
    demo: null,
  },
  {
    id: 6,
    title: "Space App",
    description: "A space application to explore the universe.",
    image: null,
    tags: ["Typescript", "Vite", "React", "Styled-Components"],
    categories: ["Frontend"],
    github: "https://github.com/KLusvarghi/realtime-docs",
    demo: null,
  },
  {
    id: 7,
    title: "Dogs",
    description: "A social network for dogs and their owners.",
    image: null,
    tags: ["Javascript", "Vite", "React", "Scss", "Testing-Library"],
    categories: ["Frontend"],
    github: "https://github.com/KLusvarghi/dogs",
    demo: "https://dogsapp-eight.vercel.app/",
  },
];

export const featuredProjects = [projects[0], projects[1], projects[2]];

const projectFilters = ["Typescript", "React", "Next.js", "Fastify", "Jest", "Docker", "Prisma", "Swagger", "Zod"];

export default {
  projects,
  featuredProjects,
  projectFilters
};
