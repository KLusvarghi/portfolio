export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image?: string | null;
  tags: string[];
  github: string;
  demo: string | null;
  categories?: string[];
  startDate: string; // Format: "YYYY" or "YYYY-MM"
  endDate: string | null; // null if ongoing, or "YYYY" or "YYYY-MM"
};

const projects: Project[] = [
  {
    id: 1,
    title: "Finance App",
    slug: "finance-app",
    description: "Uma API financeira para gerenciar suas finanças pessoais.",
    longDescription:
      "AI Cursor Init is a revolutionary documentation framework that integrates directly into your IDE, making documentation creation effortless and intelligent. Using advanced AI capabilities, it automatically generates comprehensive Architecture Decision Records (ADRs), system diagrams, and onboarding guides through intuitive slash commands. The framework understands your codebase context and produces documentation that's not only accurate but also maintains consistency across your entire project. Perfect for teams looking to maintain high-quality documentation without the overhead.",
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
    startDate: "2025",
    endDate: null,
  },
  {
    id: 2,
    title: "Clinic Appointments",
    slug: "clinic-appointments",
    description:
      "Uma plataforma de agendamentos médicos para gerenciar consultas.",
    longDescription: "teste",
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
    startDate: "2025",
    endDate: "2025",
  },
  {
    id: 3,
    title: "Next Saas",
    slug: "next-saas-rbac",
    description:
      "Um template SaaS em Next.js para construir seu próprio produto SaaS.",
    longDescription: "teste",
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
    startDate: "2025",
    endDate: null,
  },
  {
    id: 4,
    title: "Api Swagger",
    slug: "api-swagger",
    description: "Uma API com documentação Swagger para gerenciar suas APIs.",
    longDescription: "teste",
    image: null,
    tags: ["Typescript", "Express", "Swagger"],
    categories: ["API"],
    github: "https://github.com/KLusvarghi/api-swagger/",
    demo: null,
    startDate: "2025",
    endDate: "2025",
  },
  {
    id: 5,
    title: "Realtime Docs",
    slug: "realtime-docs",
    description:
      "Documentos colaborativos em tempo real para gerenciar sua documentação.",
    longDescription: "teste",
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
    startDate: "2025",
    endDate: "2025",
  },
  {
    id: 6,
    title: "Space App",
    slug: "space-app",
    description: "Um aplicativo espacial para explorar o universo.",
    longDescription: "teste",
    image: null,
    tags: ["Typescript", "Vite", "React", "Styled-Components"],
    categories: ["Frontend"],
    github: "https://github.com/KLusvarghi/realtime-docs",
    demo: null,
    startDate: "2024",
    endDate: "2024",
  },
  {
    id: 7,
    title: "Dogs App",
    slug: "dogs-app",
    description: "Uma rede social para cachorros e seus donos.",
    longDescription: "teste",
    image: "/projects/dogs.png",
    tags: ["Javascript", "Vite", "React", "SCSS"],
    categories: ["Frontend"],
    github: "https://github.com/KLusvarghi/dogs",
    demo: "https://dogsapp-eight.vercel.app/",
    startDate: "2023",
    endDate: "2024",
  },
];

export const featuredProjects = [projects[0], projects[1], projects[2]];

const projectFilters = [
  "Typescript",
  "React",
  "Next.js",
  "Fastify",
  "Jest",
  "Docker",
  "Prisma",
];

export default {
  projects,
  featuredProjects,
  projectFilters,
};
