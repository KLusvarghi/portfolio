"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useTranslations, useLocale } from "next-intl";
import { useLocaleData } from "@/contexts/locale-data-context";
import { ScrollReveal, StaggerContainer } from "@/components/scroll-reveal";
import PostCard from "./PostCard";
import { motion } from "framer-motion"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogFilters, setBlogFilters] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { blogsData } = useLocaleData();

  const t = useTranslations();
  const locale = useLocale();

  if (!blogsData) return null;

  useEffect(() => {
    setBlogFilters(blogsData.postsFilters);
  }, []);

  const filteredPosts = useMemo(() => {
    return blogsData.posts.filter((post) => {
      // Text search filter
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery !== "" || selectedTags.length > 0;

  return (
    <div className="container py-12">
      <div>
        <ScrollReveal animation="fadeUp" delay={0.2}>
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
        </ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.3}>
          <p className="text-xl text-muted-foreground mb-8">
            {locale === "pt"
              ? "Pensamentos, insights e artigos técnicos."
              : "Thoughts, insights, and technical articles."}
          </p>
        </ScrollReveal>

      </div>

      <div className="mb-8 space-y-4">
        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Left side: Tag filter buttons */}
          <div className="flex flex-wrap gap-2 items-center flex-1">
            {/* Tag filter buttons */}
            <ScrollReveal animation="fadeUp" delay={0.4}>

              <div className="flex flex-wrap gap-2">
                {blogFilters.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className={
                      selectedTags.includes(tag)
                        ? "bg-[#38A7F7] hover:bg-[#2a8fd9] text-white border-[#38A7F7]"
                        : "border-zinc-700 hover:bg-zinc-800"
                    }
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </ScrollReveal>


            {/* Clear filters button */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Right side: Search input */}
          <ScrollReveal animation="fadeUp" delay={0.5}>


            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="text"
                placeholder={
                  locale === "pt" ? "Buscar postagens ..." : "Search posts..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-zinc-300 focus-visible:ring-[#38A7F7] dark:bg-zinc-900/50 dark:border-zinc-800"
              />
            </div>
          </ScrollReveal>

        </div>

        <ScrollReveal animation="fadeUp" delay={0.6}>

          {/* Results count */}
          <div className="text-sm text-zinc-400">
            {locale === "pt"
              ? `Mostrando ${filteredPosts.length} de ${blogsData.posts.length} postagens`
              : `Showing ${filteredPosts.length} of ${blogsData.posts.length} posts `}
          </div>
        </ScrollReveal>
      </div>

      <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogsData.posts &&
          blogsData.posts.length > 0 && filteredPosts.map((post) => (
            <motion.div key={post.id} variants={staggerItem}>
              <PostCard key={post.id} {...post} />
            </motion.div>
          ))}
      </StaggerContainer>

      {filteredPosts.length === 0 && blogsData.posts.length > 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-400 mb-4">
            {locale === "pt"
              ? "Nenhum postagem encontrado"
              : "No posts found matching your filters"}
          </p>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 bg-transparent"
          >
            {locale === "pt" ? "Limpar todos os filtros" : "Clear all filters"}
          </Button>
        </div>
      )}

      {filteredPosts.length === 0 && blogsData.posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-400 mb-4">
            {locale === "pt"
              ? "Nenhuma postagem encontrado"
              : "No posts found matching your filters"}
          </p>
          <div className="flex items-center justify-center">
            <Image
              src={"/images/noContent.svg"}
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
