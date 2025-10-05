"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ExternalLink, Search, X } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { ShareButton } from "@/components/share-button";
import { allBlogPosts } from "@/data/blog-data";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allBlogPosts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter((post) => {
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
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Thoughts, insights, and technical articles
        </p>
      </div>

      <div className="mb-8 space-y-4">
        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Left side: Tag filter buttons */}
          <div className="flex flex-wrap gap-2 items-center flex-1">
            {/* Tag filter buttons */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
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
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-zinc-300 focus-visible:ring-[#38A7F7] dark:bg-zinc-900/50 dark:border-zinc-800"
            />
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-zinc-400">
          Showing {filteredPosts.length} of {allBlogPosts.length} articles
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allBlogPosts &&
          allBlogPosts.length > 0 &&
          filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden flex flex-col bg-zinc-900/50 border-zinc-800/50"
            >
              <div className="aspect-video w-full overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={500}
                    height={300}
                    className="object-cover transition-all hover:scale-105"
                  />
                ) : (
                  <PlaceholderImage
                    type="blog"
                    title={post.title}
                    className="w-full h-full transition-all hover:scale-105"
                  />
                )}
              </div>
              <CardContent className="flex flex-col flex-grow p-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <ShareButton
                    title={post.title}
                    url={`https://mgiovani.com/blog/${post.slug}`}
                    className="ml-auto"
                  />
                </div>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-zinc-400 mb-4 flex-grow">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-zinc-800 text-zinc-300 rounded-full px-3 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-white text-black hover:bg-zinc-200"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Read Article
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {filteredPosts.length === 0 && allBlogPosts.length > 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-400 mb-4">
            No articles found matching your filters
          </p>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 bg-transparent"
          >
            Clear all filters
          </Button>
        </div>
      )}

      {filteredPosts.length === 0 && allBlogPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-400 mb-4">No articles found</p>
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
