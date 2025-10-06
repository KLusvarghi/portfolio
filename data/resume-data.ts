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
  mode: "Presencial" | "Online";
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
    cvPt?: string;
    cvEn?: string;
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
    title: "Desenvolvedor Full Stack",
    extendedTitle:
      "Desenvolvedor Full Stack, com foco em criar soluções escaláveis que resolvam problemas reais de negócio",
    email: "kauaolusvarghi@proton.me",
    location: "Brasil, São Paulo",
    linkedin: "https://www.linkedin.com/in/kaua-lusvarghi-fullstack-dev/",
    github: "https://github.com/KLusvarghi",
    instagram: "https://www.instagram.com/lusvarghkaua",
    cvPt: "https://drive.google.com/file/d/19Etov9PQKz5iDyzX-vBeMEn9XAVVj3p2/view?usp=sharing",
    cvEn: "https://drive.google.com/file/d/1uKgpygddRZ4BtnvMZn1G1SSnbE1-W4H5/view?usp=sharing",
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
      "JavaScript",
      "Node.js",
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "SQL",
    ],
    architecture: [
      "Clean Architecture",
      "SOLID",
      "Hexagonal Architecture",
      "TDD",
      "Server Actions",
      "API REST",
    ],
    cloud: ["Docker", "GitHub Actions", "Vercel", "AWS (básico)", "CI/CD"],
    data: ["PostgreSQL", "Redis", "Prisma", "Drizzle ORM"],
    quality: ["Jest", "Supertest", "React Testing Library", "Cypress", "Zod"],
  },
  experience: [
    {
      title: "Full Stack Software Developer",
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
        "Plataforma multi-tenant para gerenciamento integrado de clínicas médicas com sistema de permissões granular.",
      year: "Jul 2025 - Atual",
    },
    {
      title: "Finance App",
      description:
        "Plataforma SaaS para controle financeiro pessoal com arquitetura hexagonal e cobertura de testes próxima a 100%.",
      year: "Ago 2025 - Atual",
    },
    {
      title: "Dashboard Comercial",
      description:
        "Reconstrução completa de dashboard estratégico para visualização de KPIs em tempo real.",
      year: "Nov 2024 - Fev 2025",
    },
  ],
};

export default resumeData;
