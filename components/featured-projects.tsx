"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import projectsData from "@/data/projects-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/i18n-context";

interface FeaturedProjectsProps {
  className?: string;
  showViewAll?: boolean;
}

export function FeaturedProjects({
  className,
  showViewAll = true,
}: FeaturedProjectsProps) {
  const { featuredProjects } = projectsData;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const ProjectCard = ({
    project,
  }: {
    project: (typeof featuredProjects)[0];
  }) => (
    <Card className="group relative overflow-hidden border-2 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="relative p-0">
        <div className="aspect-video w-full overflow-hidden bg-muted/50 relative">
          {project.image ? (
            <>
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={500}
                height={300}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/0 hover:bg-black/60 transition-colors duration-300 flex items-center justify-center group/image"
                >
                  <ExternalLink className="h-12 w-12 text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 transform group-hover/image:scale-110" />
                </Link>
              )}
            </>
          ) : (
            <PlaceholderImage
              type="project"
              title={project.title}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="relative p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4 h-full">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button size="sm" className="w-full group/button">
                <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/button:scale-110" />
                {t.projects.demo}
              </Button>
            </Link>
          )}
          <Link
            href={`${project.github}?source=kaualusvarghi.vercel.app`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full group/button bg-transparent"
            >
              <Github className="mr-2 h-4 w-4 transition-transform group-hover/button:scale-110" />
              {t.projects.code}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">{t.home.featuredProjects}</h2>
          <p className="text-muted-foreground">
            {t.language === "pt"
              ? "Alguns dos meus trabalhos recentes e contribuições"
              : "Some of my recent work and contributions"}
          </p>
        </div>
        {showViewAll && (
          <Link href="/projects">
            <Button variant="default" className="group">
              {t.home.viewAllProjects}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        )}
      </div>

      <div className="md:hidden">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredProjects.map((project) => (
              <CarouselItem key={project.id}>
                <ProjectCard project={project} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center gap-2 mt-6">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
