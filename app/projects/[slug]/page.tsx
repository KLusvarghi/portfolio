"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects-data.pt";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { formatProjectDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ProjectsDetailsLoading from "./loading";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const project = projectsData.projects.find((p) => p.slug === params.slug);

//   if (!project) {
//     return {
//       title: "Project Not Found",
//     };
//   }

//   return {
//     title: `${project.title} | Kauã Lusvarghi`,
//     description: project.description,
//   };
// }

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [project, setProject] = useState<Project | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    const loadProjectsData = async () => {
      const savedLocale = localStorage.getItem("locale") || "pt";

      try {
        const data = await import(`@/data/projects-data.${savedLocale}.ts`);
        const currentProject = data.default.projects.find(
          (p: Project) => p.slug === params.slug
        );
        setProject(currentProject);
      } catch (error) {
        // Fallback to Portuguese
        const data = await import(`@/data/projects-data.pt.ts`);
        const currentProject = data.default.projects.find(
          (p: Project) => p.slug === params.slug
        );
        setProject(currentProject);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjectsData();
  }, [params.slug]);

  if (isLoading) {
    return <ProjectsDetailsLoading />;
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-gradient-to-bl from-primary/20 via-background to-background overflow-hidden">
        <div className="absolute inset-0">
          {project.image ? (
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover opacity-20"
              priority
            />
          ) : (
            <PlaceholderImage
              type="project"
              title={project.title}
              className="opacity-20"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        <div className="relative container h-full flex flex-col justify-end pb-12 md:pb-16">
          <Link href="/projects">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 -ml-2 hover:bg-transparent group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />

              {t("projectsDetails.comeBack")}
            </Button>
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                {formatProjectDate(project.startDate, project.endDate)}
              </span>
              {project.categories?.map((category) => (
                <span
                  key={category}
                  className="text-sm font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground"
                >
                  {category}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              {project.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl text-pretty">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="group">
                    <ExternalLink className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    {t("projectsDetails.seeDemo")}
                  </Button>
                </Link>
              )}
              <Link
                href={`${project.github}?source=mgiovani.com`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="group bg-transparent"
                >
                  <Github className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  {t("projectsDetails.seeCode")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container pt-6 md:pt-12 md:pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Project Image */}
          {project.image && (
            <div className="mb-12 rounded-xl overflow-hidden border-2 border-border shadow-2xl">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Description */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
            <h2 className="text-3xl font-bold mb-6">
              {t("projectsDetails.aboutProject")}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {/* {project.longDescription || project.description} */}
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {t("projectsDetails.technologiesUsed")}
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
            <Link href="/projects" className="flex-1">
              <Button
                variant="outline"
                size="lg"
                className="w-full group bg-transparent"
              >
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                {t("projectsDetails.comeBack")}
              </Button>
            </Link>
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 basis-[77%]"
              >
                <Button size="lg" className="w-full group">
                  <ExternalLink className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  {t("projectsDetails.seeDemoLive")}
                </Button>
              </Link>
            )}
            <Link
              href={`${project.github}?source=mgiovani.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full group bg-transparent"
              >
                <Github className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {t("projectsDetails.seeGithub")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
