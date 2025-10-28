"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, MapPin, FileText } from "lucide-react";
import type { ResumeData } from "@/data/resume-data.pt";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "./scroll-reveal";
import { useLocaleData } from "@/contexts/locale-data-context";

export function ServerHeroSection() {
  const { resumeData, isLoading } = useLocaleData();
  const t = useTranslations();

  

  if (isLoading || !resumeData) return null;

  return (
    <div className="grid lg:grid-cols-[1fr_auto] items-center gap-12 lg:gap-16">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <ScrollReveal animation="fadeUp" delay={0.2}>

            <div className="flex items-center gap-2 text-zinc-400">
              <MapPin className="h-4 w-4" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.3}>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              {t("home.greeting")} {resumeData.personalInfo.name}
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.4}>

            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-xl">{t("home.role")}</span>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal animation="fadeUp" delay={0.5}>

          <p className="text-muted-foreground text-lg">{t("home.description")}</p>
        </ScrollReveal>

        <div className="flex flex-wrap gap-4">
          <ScrollReveal animation="fadeUp" delay={0.5}>

            <Link href={resumeData.personalInfo.cv}>
              <Button
                size="lg"
                className="bg-popover-foreground text-popover hover:bg-[#262626] dark:hover:bg-[#dfdfdf]"
              >
                <FileText />
                {t("home.cv")}
              </Button>
            </Link>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.7}>


            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-popover-foreground/20 text-popover-foreground hover:bg-popover-foreground/10 dark:border-white/20 dark:text-white bg-transparent"
              >
                {t("nav.contact")}
              </Button>
            </Link>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fadeUp" delay={0.2}>

          <div className="flex gap-6">

            <Link
              href={`${resumeData.personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-secondary-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>


            <Link
              href={`${resumeData.personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-secondary-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>


            <Link
              href={`${resumeData.personalInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-secondary-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </ScrollReveal>

      </div>

      <ScrollReveal animation="fadeUp" delay={0.6}>
        <div className="hidden lg:flex items-start justify-center lg:justify-end pt-1">
          <div className="relative w-48 h-48 sm:w-64 sm:h-80 rounded-full overflow-hidden border-4 border-black/30 dark:border-white/10">

            <Image
              src="/images/profile.png"
              alt={resumeData.personalInfo.name}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
