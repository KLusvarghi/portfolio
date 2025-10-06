"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"

const getVideoData = (language: "en" | "pt") => {
  if (language === "pt") {
    return [
      {
        id: "1",
        title: "Construindo um App Full-Stack com Next.js 15",
        description:
          "Aprenda a construir uma aplicação full-stack moderna usando Next.js 15, Server Actions e TypeScript.",
        thumbnail: "/nextjs-fullstack-app-development.jpg",
        category: "Tutorial",
        duration: "15:42",
        youtubeUrl: "https://youtube.com/watch?v=example1",
      },
      {
        id: "2",
        title: "Padrões Avançados de React em 2025",
        description:
          "Explorando padrões avançados de React incluindo Server Components, Suspense e gerenciamento de estado moderno.",
        thumbnail: "/react-patterns-components.jpg",
        category: "Aprofundamento",
        duration: "22:15",
        youtubeUrl: "https://youtube.com/watch?v=example2",
      },
      {
        id: "3",
        title: "Dicas e Truques de TypeScript",
        description:
          "Melhore suas habilidades em TypeScript com essas dicas práticas para melhor segurança de tipos e DX.",
        thumbnail: "/typescript-code-editor.jpg",
        category: "Dicas",
        duration: "12:30",
        youtubeUrl: "https://youtube.com/watch?v=example3",
      },
      {
        id: "4",
        title: "Deploy na Vercel: Melhores Práticas",
        description:
          "Tudo que você precisa saber sobre fazer deploy de suas aplicações na Vercel com performance otimizada.",
        thumbnail: "/vercel-deployment-cloud.jpg",
        category: "DevOps",
        duration: "18:05",
        youtubeUrl: "https://youtube.com/watch?v=example4",
      },
    ]
  }

  return [
    {
      id: "1",
      title: "Building a Full-Stack App with Next.js 15",
      description:
        "Learn how to build a modern full-stack application using Next.js 15, Server Actions, and TypeScript.",
      thumbnail: "/nextjs-fullstack-app-development.jpg",
      category: "Tutorial",
      duration: "15:42",
      youtubeUrl: "https://youtube.com/watch?v=example1",
    },
    {
      id: "2",
      title: "Advanced React Patterns in 2025",
      description:
        "Exploring advanced React patterns including Server Components, Suspense, and modern state management.",
      thumbnail: "/react-patterns-components.jpg",
      category: "Deep Dive",
      duration: "22:15",
      youtubeUrl: "https://youtube.com/watch?v=example2",
    },
    {
      id: "3",
      title: "TypeScript Tips & Tricks",
      description: "Boost your TypeScript skills with these practical tips and tricks for better type safety and DX.",
      thumbnail: "/typescript-code-editor.jpg",
      category: "Tips & Tricks",
      duration: "12:30",
      youtubeUrl: "https://youtube.com/watch?v=example3",
    },
    {
      id: "4",
      title: "Deploying to Vercel: Best Practices",
      description: "Everything you need to know about deploying your applications to Vercel with optimal performance.",
      thumbnail: "/vercel-deployment-cloud.jpg",
      category: "DevOps",
      duration: "18:05",
      youtubeUrl: "https://youtube.com/watch?v=example4",
    },
  ]
}

export function YouTubeVideos() {
  const t = useTranslations()
  const language = t('language') as 'en' | 'pt'
  const [api, setApi] = useState<CarouselApi>()
  const [scrollProgress, setScrollProgress] = useState(0)

  const mockVideos = getVideoData(language)

  useEffect(() => {
    if (!api) {
      return
    }

    const updateProgress = () => {
      const progress = Math.max(0, Math.min(1, api.scrollProgress()))
      setScrollProgress(progress * 100)
    }

    updateProgress()
    api.on("scroll", updateProgress)
    api.on("select", updateProgress)

    return () => {
      api.off("scroll", updateProgress)
      api.off("select", updateProgress)
    }
  }, [api])

  const VideoCard = ({ video }: { video: (typeof mockVideos)[0] }) => (
    <Link href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
      <Card className="group overflow-hidden border-2 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-[#38A7F7]/50">
        <CardContent className="p-0">
          <div className="relative aspect-video w-full overflow-hidden bg-muted/50">
            <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors cursor-pointer">
              <div className="relative">
                <div className="bg-[#FF0000] rounded-2xl px-5 py-4 group-hover:bg-[#CC0000] transition-all group-hover:scale-110 shadow-lg">
                  <svg className="w-12 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-black/70 text-white border-0">
                {video.category}
              </Badge>
            </div>
            <div className="absolute bottom-3 right-3">
              <Badge variant="secondary" className="bg-black/70 text-white border-0 text-xs">
                {video.duration}
              </Badge>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2 line-clamp-2">{video.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{video.description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{t('home.latestVideos')}</h2>
        <p className="text-muted-foreground">{t('home.latestVideosDescription')}</p>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {mockVideos.map((video) => (
            <CarouselItem key={video.id} className="pl-4 basis-[85%] md:basis-[45%] lg:basis-[31%]">
              <VideoCard video={video} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex items-center justify-between gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 max-w-xs">
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-[#38A7F7] transition-all duration-150 ease-out rounded-full"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
