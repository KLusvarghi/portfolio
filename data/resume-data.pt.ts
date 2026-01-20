import { ResumeData } from "./types";

const resumeData: ResumeData = {
  personalInfo: {
    name: "Kauã Ortolani Lusvarghi",
    title: "Desenvolvedor Full Stack",
    extendedTitle:
      "Desenvolvedor Full Stack, com foco em criar soluções escaláveis que resolvam problemas reais de negócio",
    email: "kauaolusvarghi@proton.me",
    location: "Brasil, São Paulo",
    linkedin: "https://www.linkedin.com/in/kaua-lusvarghi-fullstack-dev/",
    github: "https://github.com/KLusvarghi",
    instagram: "https://www.instagram.com/lusvarghi.dev",
    cv: "https://drive.google.com/file/d/19Etov9PQKz5iDyzX-vBeMEn9XAVVj3p2/view?usp=sharing",
    phone: "+55 (13) 99198-1875",
    photo: "/images/profile.png",
    yearsOfExperience: "3 anos de foco em front-end",
    teamLeadExperience: "1 ano de experiência em back-end",
  },
  shortSummary:
    "Com 3 anos de experiência em front-end e 1 ano em back-end, acredito que tecnologia é a ferramenta para resolver problemas reais de negócio. Sou um entusiasta de novas tecnologias e dedico tempo para entender tendências que possam otimizar meu trabalho...",
  summary: [
    "Com 3 anos de experiência em front-end e 1 ano em back-end, acredito que tecnologia é a ferramenta para resolver problemas reais de negócio. Sou um entusiasta de novas tecnologias e dedico tempo para entender tendências que possam otimizar meu trabalho, com um foco especial em alavancar a Inteligência Artificial como ferramenta para acelerar o desenvolvimento. Atualmente, trabalho no desenvolvimento de plataformas SaaS multi-tenant escaláveis, onde aplico arquiteturas modernas e sistemas de inteligência de negócio que transformam dados em insights acionáveis. Busco ativamente me aprofundar no produto e entender como a tecnologia pode gerar valor real para o negócio, sempre explorando novas oportunidades para contribuir com minhas habilidades, crescer profissionalmente e trabalhar em projetos de impacto.",
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
    cloud: ["Docker", "GitHub Actions", "Vercel", "AWS (básico)", "CI/CD", "Neon", "Supabase"],
    data: ["PostgreSQL", "MySQL", "MOngoDB","Redis", "Prisma", "Drizzle ORM"],
    quality: ["Jest", "Supertest", "React Testing Library", "Vitest", "Zod", "Swagger", "JSDocs"],
  },
  experience: [
    {
      title: "Engenheiro de Software Full Stack",
      company: "X-VIA® Governo Digital",
      period: "Dez 2025 - Atual",
      location: "Remoto",
    },
    {
      title: "Engenheiro de Software Full Stack",
      company: "Freelancer",
      period: "Mar 2025 - Atual",
      location: "Remoto",
    },
    {
      title: "Engenheiro Front-end Júnior",
      company: "Mamba Digital & Método 12P",
      period: "Nov 2024 - Fev 2025",
      location: "Presencial",
    },
    {
      title: "Estagiário de TI",
      company: "Prefeitura de Praia Grande",
      period: "Mar 2022 - Fev 2023",
      location: "Presencial",
    },
  ],
  education: [
    {
      institution: "Fatec Praia Grande",
      degree: "Análise e Desenvolvimento de Sistemas",
      period: "Fev 2021 - Jun 2024",
      mode: "Presencial",
      grade: "CR: 8.42/10",
    },
    {
      institution: "Full Stack Club",
      degree: "Desenvolvimento Full Stack",
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
