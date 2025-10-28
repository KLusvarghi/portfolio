"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { ProjectCard } from "./project-card";
import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/scroll-reveal"
import { Project } from "@/data/types";

interface FeaturedProjectsProps {
  projects: Project[];
  className?: string;
  showViewAll?: boolean;
}

export function FeaturedProjects({
  projects,
  className,
  showViewAll = true,
}: FeaturedProjectsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const t = useTranslations();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <ScrollReveal animation="fadeUp" delay={0.2}>

          <div>
            <h2 className="text-3xl font-bold mb-2">{t('home.featuredProjects')}</h2>
            <p className="text-muted-foreground">
              {t('language') === "pt"
                ? "Alguns dos meus trabalhos recentes e contribuições"
                : "Some of my recent work and contributions"}
            </p>
          </div>
        </ScrollReveal>
        {showViewAll && (
          <ScrollReveal animation="fadeUp" delay={0.4}>

            <Link href="/projects">
              <Button variant="default" className="group">
                {t('home.viewAllProjects')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </ScrollReveal>
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
            {projects.map((project) => (
              <CarouselItem key={project.id}>
                <ProjectCard {...project} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${index === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
                }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <StaggerContainer className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div key={project.id} variants={staggerItem}>
            <ProjectCard key={project.id} {...project} />
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  );
}
