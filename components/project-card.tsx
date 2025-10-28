"use client";

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, ArrowRight, ArrowUpRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { useTranslations } from 'next-intl';
import { formatProjectDate } from '@/helpers/utils';
import { Project } from '@/data/types';

export function ProjectCard(project: Project) {
  const t = useTranslations();

  const maxVisibleTags = 4;
  const visibleTags = project.tags.slice(0, maxVisibleTags);
  const remainingCount = project.tags.length - maxVisibleTags;

  return (
    <Card
      key={project.id}
      // className="group overflow-hidden flex flex-col bg-white border-zinc-300  hover:border-zinc-400 dark:bg-zinc-900/50 dark:border-zinc-800/50  dark:hover:border-zinc-700/50 relative hover:scale-105 transition-transform duration-500 hover:shadow-lg"
      className="group rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30 dark:from-zinc-900/60 dark:via-zinc-900/40 dark:to-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-xl hover:border-zinc-300/50 dark:hover:border-zinc-700/50 transition-all duration-500 hover:transform hover:scale-[1.02]"
    >
      <div className="absolute top-3 right-3 z-10 bg-black/20 backdrop-blur-sm text-white dark:text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg">
        {formatProjectDate(project.startDate, project.endDate)}
      </div>

      <div className="aspect-video w-full overflow-hidden bg-zinc-900 relative">
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
            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <CardContent className="flex flex-col flex-1 p-6">
        <div className="items-start justify-between">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold mt-2">{project.title}</h2>
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group md:opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto rounded-md bg-white text-zinc-100 hover:bg-white hover:scale-110 transition-transform duration-300"
              >
                <ArrowUpRight className="h-4 w-4 m-2 flex text-zinc-900 items-center justify-center group-hover:scale-110 group-transition-transform group-duration-300 transition-transform duration-300" />
              </Link>
            )}
          </div>
          <p className="text-zinc-400 mb-4 flex-grow line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Added tags display below description */}
        <div className="flex flex-wrap gap-2 mb-6">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md  bg-zinc-200 text-zinc-600 border border-zinc-400 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
            >
              {tag}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs px-2 py-1 rounded-md bg-[#38A7F7]/10 text-[#38A7F7] border border-[#38A7F7]/80 dark:bg-[#38A7F7]/20">
              +{remainingCount}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/projects/${project.slug}`}
            rel="noopener noreferrer"
            className="flex-1 grow-[2] min-w-[50%]">
            <Button
              variant="default"
              size="sm"
              className="w-full px-2 bg-[#38A7F7] text-white hover:bg-[#2a8fd9] dark:bg-white dark:text-black dark:hover:bg-zinc-200 group/button"
            >
              <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
              {t("projects.details")}
            </Button>
          </Link>
          <Link
            href={`${project.github}?source=kaualusvarghi.vercel.app`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[30%]"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full px-2 border-zinc-300 hover:bg-zinc-100 dark:border-white/20 dark:hover:bg-white/10 group/button bg-transparent"
            >
              <Github className="mr-1 h-4 w-4 transition-transform group-hover/button:scale-110" />
              {t("projects.code")}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
