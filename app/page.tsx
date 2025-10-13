"use client";

import { ServerHeroSection } from "@/components/server-hero-section";
import { FeaturedProjects } from "@/components/featured-projects";
// import { YouTubeVideos } from "@/components/youtube-videos";
import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import type { ResumeData } from "@/data/resume-data.pt";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const t = useTranslations();

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "pt";
    loadResumeData(savedLocale);
  }, []);

  const loadResumeData = async (locale: string) => {
    try {
      const data = await import(`@/data/resume-data.${locale}.ts`);
      setResumeData(data.default);
    } catch (error) {
      // Fallback to Portuguese
      // Não é possível carregar arquivos TypeScript diretamente de outra forma em tempo de execução no Next.js App Router,
      // pois require() e fetch() não funcionam para arquivos TS locais. O import dinâmico é a única forma suportada.
      // Alternativas seriam transformar os dados em JSON, mas para manter tipagem e lazy loading, o import dinâmico é o padrão.
      const data = await import(`@/data/resume-data.pt.ts`);
      setResumeData(data.default);
    }
  };

  if (!resumeData) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container h-full flex flex-col py-16">
        {/* Server-rendered Hero Section */}
        <ServerHeroSection />

        <ScrollReveal animation="fadeUp" delay={0.2}>
          {/* Professional Summary Section - Simplified */}
          <div className="mt-16 pt-16 border-t border-border/50 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">{t("about.title")}</h2>
            </div>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg max-w-none">
                {resumeData.shortSummary}
              </p>
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center text-primary hover:text-primary/80 group"
                >
                  <span className="underline underline-offset-4 decoration-primary/30 group-hover:decoration-primary/60 transition-colors">
                    {t("home.viewAbout")}
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={0.3}>
          {/* Featured Projects Section */}
          <div className="mt-24 w-full">
            <FeaturedProjects />
          </div>
        </ScrollReveal>

        {/*
        <ScrollReveal animation="fadeUp" delay={0.3}>
         <div className="mt-24 pt-16 border-t border-border/50 w-full">
          <YouTubeVideos />
          </div>
          </ScrollReveal>
           */}
      </div>
    </div>
  );
}
