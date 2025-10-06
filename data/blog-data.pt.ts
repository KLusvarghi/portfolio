export type BlogPost = {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
  tags: string[]
  image?: string | null
}

export const allBlogPosts: BlogPost[] = [
  // {
  //   id: 1,
  //   title: "Otimizando Performance do FastAPI para Aplicações de Alto Tráfego",
  //   excerpt:
  //     "Aprenda técnicas avançadas para otimizar aplicações FastAPI para lidar com cargas de alto tráfego, incluindo padrões async/await, otimizações de banco de dados e estratégias de cache.",
  //   date: "15 de Março, 2023",
  //   readTime: "10 min de leitura",
  //   image: null,
  //   slug: "otimizando-performance-fastapi",
  //   tags: ["FastAPI", "Python", "Performance", "Backend"],
  // },
  // {
  //   id: 2,
  //   title: "Construindo Microserviços Python Escaláveis com FastAPI e RabbitMQ",
  //   excerpt:
  //     "Um guia abrangente para projetar e implementar uma arquitetura de microserviços escalável usando Python, FastAPI e filas de mensagens para comunicação confiável.",
  //   date: "8 de Fevereiro, 2023",
  //   readTime: "12 min de leitura",
  //   image: null,
  //   slug: "microservicos-python-escalaveis",
  //   tags: ["Microserviços", "Python", "FastAPI", "RabbitMQ"],
  // },
  // {
  //   id: 3,
  //   title: "GraphQL vs REST em Aplicações Backend Python",
  //   excerpt:
  //     "Uma comparação aprofundada das abordagens GraphQL e REST API em aplicações backend Python, com exemplos do mundo real e considerações de performance.",
  //   date: "22 de Janeiro, 2023",
  //   readTime: "8 min de leitura",
  //   image: null,
  //   slug: "graphql-vs-rest-python",
  //   tags: ["GraphQL", "REST API", "Python", "Backend"],
  // },
]

// Get featured blog posts (top 3)
export const featuredBlogPosts = allBlogPosts.slice(0, 3)

const blogFilters = ["Arquitetura", "DevOps", "Dicas", "AI","Recente"];

export default {
  allBlogPosts,
  featuredBlogPosts,
  blogFilters,
}
