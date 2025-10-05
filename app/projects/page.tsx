"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Search, X } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import projectsData from "@/data/projects-data";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";

export default function ProjectsPage() {
  const { projects } = projectsData;
  const { t } = useI18n();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => techSet.add(tag));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  const allCategories = useMemo(() => {
    const categorySet = new Set<string>();
    projects.forEach((project) => {
      project.categories?.forEach((cat) => categorySet.add(cat));
    });
    return Array.from(categorySet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Text search filter
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Technology filter
      const matchesTech =
        selectedTechs.length === 0 ||
        selectedTechs.some((tech) => project.tags.includes(tech));

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => project.categories?.includes(cat));

      return matchesSearch && matchesTech && matchesCategory;
    });
  }, [projects, searchQuery, selectedTechs, selectedCategories]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTechs([]);
    setSelectedCategories([]);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedTechs.length > 0 ||
    selectedCategories.length > 0;

  return (
    <div className="container pt-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">{t.projects.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">
          {t.projects.description}
        </p>
      </div>

      <div className="mb-8 space-y-4">
        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Left side: Technology filters + Category dropdown */}
          <div className="flex flex-wrap gap-2 items-center flex-1">
            {/* Technology filter buttons */}
            <div className="flex flex-wrap gap-2">
              {allTechs.slice(0, 6).map((tech) => (
                <Button
                  key={tech}
                  variant={selectedTechs.includes(tech) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTech(tech)}
                  className={
                    selectedTechs.includes(tech)
                      ? "bg-[#38A7F7] hover:bg-[#2a8fd9] text-white border-[#38A7F7]"
                      : "text-[#444444] dark:text-[#e6e6e6] hover:text-[#313131] dark:hover:text-[#c7c6c6] border-zinc-200 dark:border-zinc-700 hover:bg-[#cbcdcf] dark:hover:bg-zinc-800"
                  }
                >
                  {tech}
                </Button>
              ))}
            </div>

            {/* Category multi-select dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-400 dark:border-zinc-700 text-[#444444] dark:text-[#e6e6e6] bg-transparent hover:bg-[#cbcdcf] dark:hover:bg-zinc-800  "
                >
                  {t.projects.categories}
                  {selectedCategories.length > 0 && (
                    <span className="ml-2 bg-[#38A7F7] text-white rounded-full px-2 py-0.5 text-xs">
                      {selectedCategories.length}
                    </span>
                  )}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
              >
                <DropdownMenuLabel>
                  {t.projects.filterByCategory}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-300 dark:bg-zinc-800" />
                {allCategories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                    className="cursor-pointer text-[#444444] dark:text-[#e6e6e6] hover:bg-zinc-300 dark:hover:bg-zinc-900"
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear filters button */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-300 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4 mr-1" />
                {t.projects.clear}
              </Button>
            )}
          </div>

          {/* Right side: Search input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              type="text"
              placeholder={t.projects.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-zinc-300 focus-visible:ring-[#38A7F7] dark:bg-zinc-900/50 dark:border-zinc-800"
            />
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-zinc-400">
          {t.projects.showing} {filteredProjects.length} {t.projects.of}{" "}
          {projects.length} {t.projects.projectsText}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="group overflow-hidden flex flex-col bg-white border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800/50 relative"
          >
            {project.tags.length > 0 && (
              <div className="absolute top-3 right-3 z-10 bg-[#38A7F7] text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                {project.tags[0]}
              </div>
            )}

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
            <CardContent className="flex flex-col flex-grow p-6">
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <p className="text-zinc-400 mb-4 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 rounded-full px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-auto">
                {project.demo && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full bg-[#38A7F7] text-white hover:bg-[#2a8fd9] dark:bg-white dark:text-black dark:hover:bg-zinc-200 group/button"
                    >
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
                    className="w-full border-zinc-300 hover:bg-zinc-100 dark:border-white/20 dark:hover:bg-white/10 group/button bg-transparent"
                  >
                    <Github className="mr-2 h-4 w-4 transition-transform group-hover/button:scale-110" />
                    {t.projects.code}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-400 mb-4">
            {t.projects.noProjectsFound}
          </p>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 bg-transparent"
          >
            {t.projects.clearAllFilters}
          </Button>
          <div className="flex items-center justify-center mt-6">
            <Image
              src={"/images/noContent2.svg"}
              alt="No articles found"
              width={200}
              height={200}
              className="object-cover md:w-80"
            />
          </div>
        </div>
      )}
    </div>
  );
}
