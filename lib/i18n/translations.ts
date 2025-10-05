export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
      blog: "Blog",
    },
    // Home page
    home: {
      greeting: "Hi, I'm",
      role: "Full Stack Developer",
      description: "Passionate about creating innovative solutions and exceptional digital experiences.",
      viewAbout: "View About",
      featuredProjects: "Featured Projects",
      viewAllProjects: "View all projects",
      latestVideos: "Latest Videos",
      latestVideosDescription: "Check out my recent content on YouTube",
    },
    // About page
    about: {
      title: "About Me",
      career: "Career",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
      seeMore: "See more",
      seeLess: "See less",
      present: "Present",
      online: "Online",
      inPerson: "In Person",
    },
    // Projects page
    projects: {
      title: "Projects",
      description: "A collection of my recent work and technical projects",
      searchPlaceholder: "Search projects...",
      allTechnologies: "All Technologies",
      categories: "Categories",
      filterByCategory: "Filter by category",
      clear: "Clear",
      showing: "Showing",
      of: "of",
      projectsText: "projects",
      demo: "Demo",
      code: "Code",
      projectsFound: "projects found",
      noProjectsFound: "No projects found matching your filters",
      clearAllFilters: "Clear all filters",
    },
    // Contact page
    contact: {
      title: "Contact",
      heading: "Let's talk?",
      description:
        "I'm always open to discuss new projects, business opportunities, partnerships, or simply exchange ideas about technology and innovation.",
      email: "Email",
      location: "Location",
      emailCopied: "Email copied to clipboard!",
      errorCopyingEmail: "Error copying email",
      whatsappHeading: "Got any questions?",
      whatsappDescription: "Send a message and talk directly with me. I respond personally!",
      whatsappButton: "CHAT ON WHATSAPP",
      findMeOn: "Or find me on:",
      linkedin: "LinkedIn",
      github: "GitHub",
      instagram: "Instagram",
      socialMedia: "Social Media",
      sendMessage: "Send Message",
    },
    // Footer
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with",
      and: "and",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      notFound: "Not found",
    },
  },
  pt: {
    // Navigation
    nav: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
      blog: "Blog",
    },
    // Home page
    home: {
      greeting: "Olá, eu sou",
      role: "Desenvolvedor Full Stack",
      description: "Apaixonado por criar soluções inovadoras e experiências digitais excepcionais.",
      viewAbout: "Ver Sobre",
      featuredProjects: "Projetos em Destaque",
      viewAllProjects: "Ver todos os projetos",
      latestVideos: "Últimos Vídeos",
      latestVideosDescription: "Confira meu conteúdo recente no YouTube",
    },
    // About page
    about: {
      title: "Sobre Mim",
      career: "Carreira",
      education: "Formação",
      skills: "Habilidades",
      languages: "Idiomas",
      seeMore: "Ver mais",
      seeLess: "Ver menos",
      present: "Presente",
      online: "Online",
      inPerson: "Presencial",
    },
    // Projects page
    projects: {
      title: "Projetos",
      description: "Uma coleção dos meus trabalhos recentes e projetos técnicos",
      searchPlaceholder: "Buscar projetos...",
      allTechnologies: "Todas as Tecnologias",
      categories: "Categorias",
      filterByCategory: "Filtrar por categoria",
      clear: "Limpar",
      showing: "Mostrando",
      of: "de",
      projectsText: "projetos",
      demo: "Demo",
      code: "Código",
      projectsFound: "projetos encontrados",
      noProjectsFound: "Nenhum projeto encontrado com seus filtros",
      clearAllFilters: "Limpar todos os filtros",
    },
    // Contact page
    contact: {
      title: "Contato",
      heading: "Vamos conversar?",
      description:
        "Estou sempre aberto para discutir novos projetos, oportunidades de negócio, parcerias, ou simplesmente trocar ideias sobre tecnologia e inovação.",
      email: "Email",
      location: "Localização",
      emailCopied: "Email copiado para a área de transferência!",
      errorCopyingEmail: "Erro ao copiar email",
      whatsappHeading: "Ficou com alguma dúvida?",
      whatsappDescription: "Envie uma mensagem e converse diretamente comigo. Respondo pessoalmente!",
      whatsappButton: "CHAMAR NO WHATSAPP",
      findMeOn: "Ou me encontre em:",
      linkedin: "LinkedIn",
      github: "GitHub",
      instagram: "Instagram",
      socialMedia: "Redes Sociais",
      sendMessage: "Enviar Mensagem",
    },
    // Footer
    footer: {
      rights: "Todos os direitos reservados.",
      builtWith: "Construído com",
      and: "e",
    },
    // Common
    common: {
      loading: "Carregando...",
      error: "Erro",
      notFound: "Não encontrado",
    },
  },
} as const

export type Language = keyof typeof translations
export type TranslationKeys = typeof translations.en
