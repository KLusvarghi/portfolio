export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription?: string[];
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
    longDescription: [
      "Aplicação fullstack para gerenciamento financeiro pessoal, com backend em Node.js, TypeScript e PostgreSQL e frontend em desenvolvimento utilizando React, Vite, Redux e TanStack Query. O projeto foi arquitetado aplicando arquitetura hexagonal e princípios SOLID, garantindo alta escalabilidade, manutenibilidade e testabilidade.",
      "A arquitetura prioriza desacoplamento total entre camadas (Controllers → Services → Repositories), permitindo evolução independente de cada componente e facilitando testes unitários e de integração. Implementei estratégia robusta de testes com Factories e Fixtures, atingindo alta cobertura de código via Jest e garantindo confiabilidade nas entregas. O padrão de Adapters isola dependências externas, permitindo substituições sem impacto na lógica de negócio.",
      "Em termos de segurança, a aplicação utiliza hash de senhas, validação rigorosa em múltiplas camadas com Zod (type-safe) e constraints no banco de dados para garantir integridade dos dados. O pipeline de qualidade inclui ESLint, Prettier e Husky com validação pré-commit, além de commits semânticos padronizados.",
      "O ambiente foi completamente dockerizado para facilitar onboarding e garantir consistência entre dev/test/prod. A estrutura monorepo está preparada para escalar, integrando backend, frontend web e futura versão mobile iOS.",
      "O roadmap prevê implementação de autenticação JWT, logs estruturados com Pino, observabilidade com OpenTelemetry, sistema de cache para otimização de performance em rotas críticas, e CI/CD completo com GitHub Actions para entregas automatizadas.",
    ],
    image: "/projects/financeapp.png",
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
    longDescription: [
      "Aplicação fullstack desenvolvida com Next.js 15, React 19 e TypeScript para gerenciamento de clínicas médicas com suporte a multi-tenancy, permitindo que usuários administrem múltiplas clínicas mantendo isolamento e segurança dos dados. O sistema implementa controle completo de agendamentos, assinaturas via Stripe e autenticação moderna com BetterAuth (sessões server-side).",
      "A arquitetura foi construída utilizando o App Router do Next.js, aplicando Server Actions para operações de backend e separação clara de responsabilidades entre componentes, lógica de dados (data layer) e ações do servidor. O projeto utiliza Drizzle ORM com PostgreSQL para garantir type-safety em toda a camada de persistência, validação rigorosa com Zod e React Hook Form, além de interface moderna construída com Tailwind CSS e shadcn/ui.",
      "Em termos de segurança, o sistema implementa autenticação baseada em sessões HTTP-only (ao invés de JWT), proporcionando maior proteção contra ataques XSS. A integração com Google OAuth facilita onboarding de usuários, enquanto a integração completa com Stripe (webhooks, customer portal) garante gestão segura de assinaturas e pagamentos recorrentes.",
      "O modelo multi-tenant permite que um único usuário gerencie diversas clínicas com isolamento total de dados, garantindo conformidade e privacidade. O sistema oferece observabilidade completa do fluxo de agendamentos, com confirmação manual de consultas e controle granular de permissões por clínica.",
      "Desenvolvido como projeto de estudos para aprofundar conhecimentos em arquitetura moderna de aplicações React, autenticação baseada em sessão, integrações de pagamento e design multi-tenant escalável.",
    ],
    image: "/projects/clinic.png",
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
    longDescription: [
      "Aplicação fullstack SaaS desenvolvida com Next.js e Fastify, estruturada como monorepo com TurboRepo, focada em gerenciamento de organizações, projetos e equipes com controle granular de permissões via CASL (RBAC). O projeto foi construído como laboratório de aprendizado para implementação de padrões avançados de arquitetura multi-tenant, autorização baseada em roles e injeção de dependências.",
      "A arquitetura backend utiliza Fastify com seu ecossistema de plugins nativos, proporcionando alta performance e modularidade. A API está completamente documentada com Swagger/OpenAPI, facilitando integração e manutenção. O sistema implementa RBAC completo através do CASL, permitindo definir permissões detalhadas por recurso (organizations, projects, members) com suporte a roles customizáveis (Owner, Admin, Member, Billing).",
      "O modelo multi-tenant garante isolamento total de dados entre organizações, com controle de acesso em múltiplas camadas: autenticação, autorização por role e validação de recursos. O frontend Next.js consome a API de forma type-safe, aplicando validação com Zod e renderização otimizada com Server Components.",
      "A estrutura monorepo com TurboRepo promove escalabilidade e reutilização de código entre packages (backend, frontend, shared types), com pipeline de build otimizado e cache inteligente. O projeto aplica princípios de clean code, injeção de dependências e separação de responsabilidades, facilitando testes e manutenção.",
      "Desenvolvido com foco educacional para dominar conceitos essenciais de aplicações SaaS profissionais: sistemas de permissionamento complexos, arquitetura multi-tenant escalável, documentação automática de APIs e gerenciamento de monorepos modernos — competências fundamentais para construção de produtos B2B robustos.",
    ],
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
    longDescription: [
      "API REST desenvolvida com Node.js, MongoDB e Mongoose, com foco em documentação profissional e interativa seguindo o padrão OpenAPI 3.0 via Swagger. O projeto implementa CRUD completo com toda a especificação de endpoints, schemas e respostas documentados de forma automática e acessível através de interface web.",
      "A documentação foi construída utilizando swagger-jsdoc para anotações inline no código e swagger-ui-express para renderização da interface interativa, permitindo que desenvolvedores testem endpoints diretamente no navegador sem ferramentas externas. A especificação OpenAPI garante padronização, facilitando integração com ferramentas de geração de clientes (SDKs) e testes automatizados.",
      "O ambiente foi completamente dockerizado com Docker Compose, orquestrando containers de aplicação e MongoDB com um único comando, garantindo reprodutibilidade e facilitando onboarding. A utilização de Mongoose como ODM proporciona validação de schemas no nível de aplicação, type-safety e modelagem clara de dados.",
      "O projeto demonstra boas práticas de developer experience (DX): documentação como código (mantida junto ao desenvolvimento), interface interativa para exploração de APIs, ambiente containerizado e versionamento de schemas. A abordagem adotada reduz significativamente o tempo de integração e melhora a colaboração entre times frontend/backend.",
      "Desenvolvido como laboratório para dominar documentação técnica profissional de APIs, especificação OpenAPI/Swagger, containerização e ferramentas essenciais para construção de APIs consumíveis e bem documentadas — competências fundamentais para desenvolvimento backend moderno e integração eficiente entre sistemas.",
    ],
    image: "/projects/swagger.png",
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
    longDescription: [
      "Aplicação fullstack desenvolvida com foco em comunicação bidirecional em tempo real utilizando WebSocket via Socket.io e MongoDB. O projeto implementa um editor de documentos colaborativo (estilo Google Docs), onde múltiplos usuários podem editar simultaneamente com sincronização instantânea de alterações.",
      "A arquitetura backend explora profundamente o funcionamento do protocolo WebSocket, estabelecendo conexões persistentes entre cliente e servidor para troca de mensagens bidirecionais com latência mínima. A implementação com Socket.io gerencia automaticamente reconexões, fallback para polling e broadcasting eficiente para múltiplos clientes conectados.",
      "O sistema utiliza MongoDB para persistência de documentos, aproveitando sua flexibilidade para armazenar operações de edição e sincronizar estado entre usuários. A aplicação implementa CRUD básico de documentos com atualização em tempo real, garantindo que todas as alterações sejam propagadas instantaneamente para todos os usuários ativos.",
      "O projeto demonstra compreensão prática de conceitos fundamentais de aplicações real-time: gerenciamento de conexões simultâneas, broadcasting de eventos, sincronização de estado distribuído e tratamento de desconexões/reconexões. A arquitetura baseada em eventos permite escalabilidade e facilita adição de novas funcionalidades colaborativas.",
      "Desenvolvido como projeto de estudos para dominar comunicação em tempo real, protocolos WebSocket, Socket.io e bancos NoSQL (MongoDB) — tecnologias essenciais para construção de aplicações colaborativas, chats, dashboards ao vivo e sistemas que exigem baixa latência e sincronização instantânea.",
    ],
    image: "/projects/realtimedocs.png",
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
    longDescription: [
      "Aplicação frontend desenvolvida com React, TypeScript e Vite, explorando boas práticas de componentização, estilização CSS-in-JS e arquitetura de projetos React modernos. O projeto implementa uma galeria interativa de imagens espaciais, aplicando conceitos fundamentais de composição de componentes, gerenciamento de estado e responsividade.",
      "A estilização foi construída completamente com Styled Components, demonstrando domínio de CSS-in-JS, tematização dinâmica e encapsulamento de estilos. A arquitetura de componentes segue o princípio de responsabilidade única, com componentes reutilizáveis, isolados e altamente testáveis, facilitando manutenção e escalabilidade.",
      "O projeto utiliza Vite como bundler, proporcionando Hot Module Replacement (HMR) instantâneo e builds otimizados para produção. A configuração TypeScript garante type-safety em toda a aplicação, prevenindo erros em tempo de desenvolvimento e melhorando a experiência de refatoração.",
      "A estrutura de componentes demonstra aplicação prática de padrões de composição React, como props drilling controlado, component children pattern e separação entre componentes de apresentação e containers. O código segue princípios de clean code, com nomenclatura semântica, funções puras e lógica de negócio isolada.",
      "Desenvolvido como projeto de estudos para consolidar fundamentos essenciais de frontend moderno: componentização escalável, estilização profissional com Styled Components, configuração de tooling (Vite) e boas práticas de arquitetura React — competências base para qualquer aplicação frontend robusta.",
    ],
    image: "/projects/spaceapp.png",
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
    longDescription: [
      "Aplicação frontend desenvolvida com React e CSS Modules, inspirada no Instagram e voltada para compartilhamento de fotos de cachorros. Projeto que consolidou fundamentos essenciais de React moderno, explorando componentização, custom hooks, gerenciamento de estado e otimização de performance para garantir excelente experiência do usuário (UX).",
      "A arquitetura de componentes foi estruturada seguindo princípios de reutilização e separação de responsabilidades, com hooks personalizados para abstrair lógica complexa (autenticação, requisições HTTP, validação de formulários). A aplicação utiliza React Hooks nativos (useState, useEffect, useContext, useCallback) de forma otimizada, evitando re-renderizações desnecessárias e garantindo fluidez na interface.",
      "O projeto implementa lazy loading de imagens, skeleton screens durante carregamentos e transições suaves, priorizando perceived performance e feedback visual constante ao usuário. A estilização modular com CSS Modules proporciona encapsulamento de estilos e evita conflitos de nomenclatura, mantendo o código escalável.",
      "A aplicação consome uma API REST externa com tratamento robusto de erros, loading states e fallbacks, demonstrando boas práticas de integração com backends. Testes automatizados com React Testing Library garantem confiabilidade dos componentes críticos e facilitam refatorações futuras.",
      "Desenvolvido como projeto fundamental no início da carreira para dominar React essencial, padrões de componentização, custom hooks, otimização de performance e design centrado no usuário — competências base que sustentam o desenvolvimento de aplicações frontend profissionais e escaláveis.",
    ],
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
