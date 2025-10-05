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
  //   title: "Optimizing FastAPI Performance for High-Traffic Applications",
  //   excerpt:
  //     "Learn advanced techniques for optimizing FastAPI applications to handle high traffic loads, including async/await patterns, database optimizations, and caching strategies.",
  //   date: "March 15, 2023",
  //   readTime: "10 min read",
  //   image: null,
  //   slug: "optimizing-fastapi-performance",
  //   tags: ["FastAPI", "Python", "Performance", "Backend"],
  // },
  // {
  //   id: 2,
  //   title: "Building Scalable Python Microservices with FastAPI and RabbitMQ",
  //   excerpt:
  //     "A comprehensive guide to designing and implementing a scalable microservices architecture using Python, FastAPI, and message queues for reliable communication.",
  //   date: "February 8, 2023",
  //   readTime: "12 min read",
  //   image: null,
  //   slug: "scalable-python-microservices",
  //   tags: ["Microservices", "Python", "FastAPI", "RabbitMQ"],
  // },
  // {
  //   id: 3,
  //   title: "GraphQL vs REST in Python Backend Applications",
  //   excerpt:
  //     "An in-depth comparison of GraphQL and REST API approaches in Python backend applications, with real-world examples and performance considerations.",
  //   date: "January 22, 2023",
  //   readTime: "8 min read",
  //   image: null,
  //   slug: "graphql-vs-rest-python",
  //   tags: ["GraphQL", "REST API", "Python", "Backend"],
  // },
]

// Get featured blog posts (top 3)
export const featuredBlogPosts = allBlogPosts.slice(0, 3)

export default {
  allBlogPosts,
  featuredBlogPosts,
}
