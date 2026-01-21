"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"

import {
  Search,
  X,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocaleData } from "@/contexts/locale-data-context";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/scroll-reveal"
import { ProjectCard } from "@/components/project-card";

export default function ProjectsPage() {
  const { resumeData, projectsData, isLoading } = useLocaleData();
  const [projectFilters, setProjectFilters] = useState<string[]>([]);
  const t = useTranslations();
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (projectsData?.projectFilters) {
      setProjectFilters(projectsData.projectFilters);
    }
  }, [projectsData]);

  const allCategories = useMemo(() => {
    if (!projectsData?.projects) return [];
    const categorySet = new Set<string>();
    projectsData.projects.forEach((project) => {
      project.categories?.forEach((cat) => categorySet.add(cat));
    });
    return Array.from(categorySet).sort();
  }, [projectsData]);

  const filteredProjects = useMemo(() => {
    if (!projectsData?.projects) return [];
    
    const filtered = projectsData.projects.filter((project) => {
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
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [projectsData, searchQuery, selectedTechs, selectedCategories, sortOrder]);

  if (isLoading || !resumeData || !projectsData) return null;
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

  if (projectsData.projects.length === 0) {
    return null;
  }

  return (
    <div className="container pt-12">
      <div>
        <ScrollReveal animation="fadeUp" delay={0.2}>

          <h1 className="text-4xl font-bold mb-4">{t("projects.title")}</h1>
        </ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.3}>

          <p className="text-xl text-muted-foreground mb-8">
            {t("projects.description")}
          </p>
        </ScrollReveal>
      </div>

      <div className="mb-6 space-y-4">
        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Left side: Technology filters + Category dropdown */}
          <div className="flex flex-wrap gap-2 items-center flex-1">
            {/* Technology filter buttons */}
            <ScrollReveal animation="fadeUp" delay={0.4}>

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
            </ScrollReveal>

            {/* Category multi-select dropdown */}
            <ScrollReveal animation="fadeUp" delay={0.5}>


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
            </ScrollReveal>


            {/* order by */}
            <ScrollReveal animation="fadeUp" delay={0.6}>

              <Select
                value={sortOrder}
                onValueChange={(value: "desc" | "asc") => setSortOrder(value)}
              >
                <SelectTrigger className="w-[180px] border-zinc-300 dark:border-zinc-700 hover:bg-[#cbcdcf] dark:hover:bg-zinc-800 bg-transparent">
                  <SelectValue
                    className="border-zinc-400 dark:border-zinc-700 text-[#444444] dark:text-[#e6e6e6] bg-transparent hover:bg-[#cbcdcf] dark:hover:bg-zinc-800"
                    placeholder={t("projects.sortBy")}
                  />
                </SelectTrigger>
                <SelectContent className="bg-zinc-300 dark:bg-zinc-900 dark:border-zinc-900">
                  <SelectItem value="desc">{t("projects.newest")}</SelectItem>
                  <SelectItem value="asc">{t("projects.oldest")}</SelectItem>
                </SelectContent>
              </Select>
            </ScrollReveal>

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
          <ScrollReveal animation="fadeUp" delay={0.7}>


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
          </ScrollReveal>

        </div>

        {/* Results count */}
        <ScrollReveal animation="fadeUp" delay={0.7}>

          <div className="text-sm text-zinc-400">
            {t("projects.showing")} {filteredProjects.length} {t("projects.of")}{" "}
            {projectsData.projects.length} {t("projects.projectsText")}
          </div>
        </ScrollReveal>

      </div>

      {/* projects container*/}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:mb-12">
        
      </div>

      <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:mb-12">
        {filteredProjects.map((project) => (
          <motion.div key={project.id} variants={staggerItem}>
            <ProjectCard key={project.id} {...project} />
          </motion.div>
        ))}
      </StaggerContainer>

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
