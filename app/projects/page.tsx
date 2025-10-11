"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Github,
  Search,
  X,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import type { Project } from "@/data/projects-data.pt";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatProjectDate } from "@/lib/utils";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectFilters, setProjectFilters] = useState<string[]>([]);
  const t = useTranslations();
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")


  useEffect(() => {
    const loadProjectsData = async () => {
      const savedLocale = localStorage.getItem("locale") || "pt";
      try {
        const data = await import(`@/data/projects-data.${savedLocale}.ts`);
        setProjects(data.default.projects);
        setProjectFilters(data.default.projectFilters);
      } catch (error) {
        // Fallback to Portuguese
        const data = await import(`@/data/projects-data.pt.ts`);
        setProjects(data.default.projects);
        setProjectFilters(data.default.projectFilters);
      }
    };
    loadProjectsData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    const categorySet = new Set<string>();
    projects.forEach((project) => {
      project.categories?.forEach((cat) => categorySet.add(cat));
    });
    return Array.from(categorySet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
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

    // Sort by start date
    return filtered.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime()
      const dateB = new Date(b.startDate).getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })
  }, [projects, searchQuery, selectedTechs, selectedCategories, sortOrder])
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

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="container pt-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">{t("projects.title")}</h1>
        <p className="text-xl text-muted-foreground mb-8">
          {t("projects.description")}
        </p>
      </div>

      <div className="mb-6 space-y-4">
        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Left side: Technology filters + Category dropdown */}
          <div className="flex flex-wrap gap-2 items-center flex-1">
            {/* Technology filter buttons */}
            <div className="flex flex-wrap gap-2">
              {projectFilters.map((tech) => (
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
                  className="border-zinc-400 dark:border-zinc-700 text-[#444444] dark:text-[#e6e6e6] bg-transparent hover:bg-[#cbcdcf] dark:hover:bg-zinc-800"
                >
                  {t("projects.categories")}
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
                className="w-56 bg-zinc-300 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
              >
                <DropdownMenuLabel>
                  {t("projects.filterByCategory")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-300 dark:bg-zinc-800" />
                {allCategories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                    className="cursor-pointer text-[#444444] dark:text-[#e6e6e6] dark:hover:bg-zinc-900"
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* order by */}
            <Select value={sortOrder} onValueChange={(value: "desc" | "asc") => setSortOrder(value)}>
              <SelectTrigger className="w-[180px] border-zinc-300 dark:border-zinc-700 hover:bg-[#cbcdcf] dark:hover:bg-zinc-800 bg-transparent">
                  
                  <SelectValue className="border-zinc-400 dark:border-zinc-700 text-[#444444] dark:text-[#e6e6e6] bg-transparent hover:bg-[#cbcdcf] dark:hover:bg-zinc-800" placeholder={t("projects.sortBy")}  />
              </SelectTrigger>
              <SelectContent className="bg-zinc-300 dark:bg-zinc-900 dark:border-zinc-900">
                <SelectItem value="desc">{t("projects.newest")}</SelectItem>
                <SelectItem value="asc">{t("projects.oldest")}</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear filters button */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-300 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4 mr-1" />
                {t("projects.clear")}
              </Button>
            )}
          </div>

          {/* Right side: Search input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              type="text"
              placeholder={t("projects.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-zinc-300 focus-visible:ring-[#38A7F7] dark:bg-zinc-900/50 dark:border-zinc-800"
            />
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-zinc-400">
          {t("projects.showing")} {filteredProjects.length} {t("projects.of")}{" "}
          {projects.length} {t("projects.projectsText")}
        </div>
      </div>

      {/* projects container*/}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:mb-12">
        {filteredProjects.map((project) => {
          const maxVisibleTags = 4;
          const visibleTags = project.tags.slice(0, maxVisibleTags);
          const remainingCount = project.tags.length - maxVisibleTags;

          // projects card
          return (
            <Card
              key={project.id}
              // className="group overflow-hidden flex flex-col bg-white border-zinc-300  hover:border-zinc-400 dark:bg-zinc-900/50 dark:border-zinc-800/50  dark:hover:border-zinc-700/50 relative hover:scale-105 transition-transform duration-500 hover:shadow-lg"
              className="group  
              
              rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30 dark:from-zinc-900/60 dark:via-zinc-900/40 dark:to-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-xl hover:border-zinc-300/50 dark:hover:border-zinc-700/50 transition-all duration-500 hover:transform hover:scale-[1.02]"
            >
              <div className="absolute top-3 right-3 z-10 bg-black/20 backdrop-blur-sm text-white dark:text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
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
                  <div className="flex items-center justify-between mb-2"  >
                    <h2 className="text-xl font-bold mt-2">{project.title}</h2>
                    {project.demo && (
                      <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto rounded-md bg-white text-zinc-100 hover:bg-white hover:scale-110 transition-transform duration-300"
                    >
                      <ArrowUpRight className="h-4 w-4 m-2 flex text-zinc-900 items-center justify-center group-hover:scale-110 transition-transform duration-300" />
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

                <div className="flex gap-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    rel="noopener noreferrer"
                    className="flex-1 basis-[77%] min-w-0"
                  >
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full bg-[#38A7F7] text-white hover:bg-[#2a8fd9] dark:bg-white dark:text-black dark:hover:bg-zinc-200 group/button"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                      {t("projects.details")}
                    </Button>
                  </Link>
                  <Link
                    href={`${project.github}?source=kaualusvarghi.vercel.app`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 basis-[40%] min-w-0"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-zinc-300 hover:bg-zinc-100 dark:border-white/20 dark:hover:bg-white/10 group/button bg-transparent"
                    >
                      <Github className="mr-2 h-4 w-4 transition-transform group-hover/button:scale-110" />
                      {t("projects.code")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-400 mb-4">
            {t("projects.noProjectsFound")}
          </p>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 bg-transparent"
          >
            {t("projects.clearAllFilters")}
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
