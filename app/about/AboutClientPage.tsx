"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import type { ResumeData } from "@/data/resume-data.pt";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";


export default function AboutClientPage() {
  const [showPreviousRoles, setShowPreviousRoles] = useState(false);
  const [showPreviousEducation, setShowPreviousEducation] = useState(false);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const t = useTranslations();
  const locale = useLocale(); // Pega o locale atual: "pt" ou "en"

  useEffect(() => {
    loadResumeData(locale);
  }, [locale]);

  const loadResumeData = async (locale: string) => {
    try {
      const data = await import(`@/data/resume-data.${locale}.ts`);
      setResumeData(data.default);
    } catch (error) {
      // Fallback to Portuguese
      const data = await import(`@/data/resume-data.pt.ts`);
      setResumeData(data.default);
    }
  };

  if (!resumeData) return null;

  const currentRole = resumeData.experience[0];
  const previousRoles = resumeData.experience.slice(1);

  const currentEducation = resumeData.education[0];
  const previousEducation = resumeData.education.slice(1);

  const getValidPhotoUrl = (photoUrl: string | undefined) => {
    if (!photoUrl || photoUrl.startsWith("blob:")) {
      return "/placeholder.svg?height=400&width=320";
    }
    return photoUrl;
  };

  const photoUrl = getValidPhotoUrl(resumeData.personalInfo.photo);

  return (
    <div className="container pt-10 md:py-12">
      <div className="grid lg:gap-12 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <div>
        <ScrollReveal animation="fadeUp" delay={0.2}>
            <h1 className="text-4xl font-bold">{t("about.title")}</h1>
              </ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.3}>
            <p className="text-xl text-muted-foreground">
              {locale === "pt"
                ? "Conheça Um pouco do Kauã — um desenvolvedor full-stack habilidoso."
                : "Get to know Kauã — a skilled full-stack developer."}
            </p>
                </ScrollReveal>
          </div>

          {/* Mobile Sidebar - Keep as Card */}
          <Card className="border-2 lg:hidden">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center gap-6 mb-6 ">
        <ScrollReveal animation="fadeUp" delay={0.2}>
                <div className="flex-shrink-0">
                  <Image
                    src={photoUrl || "/placeholder.svg"}
                    alt={resumeData.personalInfo.name}
                    width={80}
                    height={60}
                    className="object-cover rounded-full"
                  />
                </div>
                </ScrollReveal>
                <div className="flex-1 min-w-0">
        <ScrollReveal animation="fadeUp" delay={0.2}>
                  <h3 className="text-xl font-bold">
                    {resumeData.personalInfo.name}
                  </h3>
                  </ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.3}>

                  <p className="text-muted-foreground text-sm">
                    {resumeData.personalInfo.title}
                  </p>
                  </ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.4}>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">
                      {resumeData.personalInfo.location}
                    </span>
                  </div>
                  </ScrollReveal>
                  <div className="flex items-center gap-4 pt-4">
        <ScrollReveal animation="fadeUp" delay={0.5}>

                    <Link
                      href={`${resumeData.personalInfo.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
        </ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.6}>


                    <Link
                      href={`${resumeData.personalInfo.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                      </ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.7}>


                    <Link
                      href={`${resumeData.personalInfo.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      >
                      <Instagram className="h-5 w-5" />
                    </Link>
                      </ScrollReveal>
                  </div>
                </div>
              </div>
              <ScrollReveal animation="fadeUp" delay={0.8}>

              <div className="space-y-2">
                <Link
                  href={resumeData.personalInfo.cv}
                  target="_blank"
                  className="block"
                >
                  <Button className="w-full">
                  {t('home.cv2')}

                  </Button>
                </Link>

                <Link href={"/contact"} className="block">
                  <Button className="w-full border bg-transparent border-zinc-600 text-zinc-800 hover:bg-zinc-300 hover:text-zinc-900 dark:border-muted-foreground dark:text-muted-foreground dark:hover:bg-muted-foreground/10 dark:hover:text-zinc-200">
                    {locale === "pt" ? "Entrar em contato" : "Get in touch"}
                  </Button>
                </Link>
              </div>
              </ScrollReveal>
            </CardContent>
          </Card>

          <ScrollReveal animation="fadeUp" delay={0.2}>
            <Card className="border-2">
              <CardContent className="px-4 py-6 md:p-8 space-y-4">
              <ScrollReveal animation="fadeUp" delay={0.4}>

                <p className="text-sm  text-muted-foreground uppercase tracking-wider">
                  {locale === "pt" ? "INTRODUÇÃO" : "INTRODUCTION"}
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fadeUp" delay={0.5}>


                <h2 className="md:hidden text-xl md:text-3xl font-bold leading-tight">
                  {locale === "pt"
                    ? "Dev apaixonado por tecnologia e inovação, em busca do próximo desafio"
                    : "Dev passionate about technology and innovation, looking for the next challenge"}
                </h2>
                    </ScrollReveal>
              <ScrollReveal animation="fadeUp" delay={0.6}>


                <h2 className="hidden md:block text-xl md:text-3xl font-bold leading-tight">
                  {locale === "pt"
                    ? "Desenvolvedor Full Stack apaixonado por tecnologia e soluções que geram impacto real"
                    : "Full Stack Developer passionate about technology and solutions that generate real impact"}
                </h2>
                    </ScrollReveal>
              <ScrollReveal animation="fadeUp" delay={0.7}>


                <p
                  className={`text-muted-foreground leading-relaxed ${
                    isIntroExpanded ? "" : "line-clamp-6 md:line-clamp-none"
                    }`}
                    >
                  {resumeData.summary[0]}
                </p>
                  </ScrollReveal>
                {!isIntroExpanded && (
              <ScrollReveal animation="fadeUp" delay={0.2}>


                  <button
                    onClick={() => setIsIntroExpanded(true)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium md:hidden"
                    >
                    {locale === "pt" ? "Continuar lendo →" : "Continue reading →"}
                  </button>
                    </ScrollReveal>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>


            <div className="space-y-6">
          <ScrollReveal animation="fadeUp" delay={0.2}>

              <h2 className="text-2xl font-bold">{t("about.career")}</h2>
          </ScrollReveal>

              {/* Current Role - Featured with gradient background */}
          <ScrollReveal animation="fadeUp" delay={0.4}>

              <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                <CardContent className="relative p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-bold">{currentRole.title}</h3>
                      <p className="text-muted-foreground">
                        {currentRole.company} • {currentRole.location}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {currentRole.period}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </ScrollReveal>

              {/* Previous Roles Toggle */}
              {previousRoles.length > 0 && (
                <div className="space-y-4">
                  <ScrollReveal animation="fadeLeft" delay={0.2}>
                    <button
                      onClick={() => setShowPreviousRoles(!showPreviousRoles)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <span>
                        {showPreviousRoles
                          ? t("about.seeLess")
                          : t("about.seeMore")}{" "}
                        {locale === "pt" ? "cargos anteriores" : "previous roles"}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          showPreviousRoles ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </ScrollReveal>


                  {/* Previous Roles - Animated collapse */}
                  <div
                    className={`space-y-4 transition-all duration-500 ease-in-out ${
                      showPreviousRoles
                        ? "opacity-100 max-h-[2000px]"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    {previousRoles.map((job, index) => (
                  <ScrollReveal animation="fadeLeft" delay={0.2}>
                      <Card
                        key={index}
                        className="relative overflow-hidden border hover:border-primary/50 hover:shadow-md transition-all duration-300"
                        style={{
                          transitionDelay: showPreviousRoles
                            ? `${index * 100}ms`
                            : "0ms",
                        }}
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-[34px] top-0 bottom-0 w-px bg-border" />
                        <CardContent className="relative p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 relative z-10">
                              <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center">
                                <Briefcase className="h-5 w-5 text-muted-foreground" />
                              </div>
                            </div>
                            <div className="flex-1 space-y-2">
                              <h3 className="text-lg font-bold">{job.title}</h3>
                              <p className="text-muted-foreground">
                                {job.company} • {job.location}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {job.period}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}
            </div>

          <ScrollReveal animation="fadeLeft" delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t("about.education")}</h2>

              {/* Current Education - Featured with gradient background */}
              <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                <CardContent className="relative p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold">
                            {currentEducation.institution}
                          </h3>
                          <p className="text-muted-foreground">
                            {currentEducation.degree}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {currentEducation.period}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-sm text-muted-foreground">
                            {currentEducation.mode === "Online"
                              ? t("about.online")
                              : currentEducation.mode === "Presencial"
                              ? t("about.inPerson")
                              : currentEducation.mode}
                          </span>
                          {currentEducation.grade && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {currentEducation.grade}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Previous Education Toggle */}

              {previousEducation.length > 0 && (
          <ScrollReveal animation="fadeLeft" delay={0.2}>
                <div className="space-y-4">
                  <button
                    onClick={() =>
                      setShowPreviousEducation(!showPreviousEducation)
                    }
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <span>
                      {showPreviousEducation
                        ? t("about.seeLess")
                        : t("about.seeMore")}{" "}
                      {locale === "pt" ? "formações" : "education"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        showPreviousEducation ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Previous Education - Animated collapse */}
                  <div
                    className={`space-y-4 transition-all duration-500 ease-in-out ${
                      showPreviousEducation
                        ? "opacity-100 max-h-[2000px]"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    {previousEducation.map((edu, index) => (
                      <ScrollReveal animation="fadeLeft" delay={0.4}>
                        <Card
                          key={index}
                          className="relative overflow-hidden border hover:border-primary/50 hover:shadow-md transition-all duration-300"
                          style={{
                            transitionDelay: showPreviousEducation
                              ? `${index * 100}ms`
                              : "0ms",
                          }}
                        >
                          {/* Timeline dot */}
                          <div className="absolute left-[34px] top-0 bottom-0 w-px bg-border" />
                          <CardContent className="relative p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center">
                                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                                </div>
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h3 className="text-lg font-bold">
                                      {edu.institution}
                                    </h3>
                                    <p className="text-muted-foreground">
                                      {edu.degree}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {edu.period}
                                    </p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <span className="text-sm text-muted-foreground">
                                      {edu.mode === "Online"
                                        ? t("about.online")
                                        : edu.mode === "Presencial"
                                        ? t("about.inPerson")
                                        : edu.mode}
                                    </span>
                                    {edu.grade && (
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {edu.grade}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
          </ScrollReveal>
              )}

            </div>
          </ScrollReveal>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t("about.skills")}</h2>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 auto-rows-min md:auto-rows-fr">


              {/* Cloud & DevOps Card - Mobile: Top Left (tall), Desktop: Top Left */}
              <ScrollReveal animation="fadeLeft" delay={0.2} className="row-span-2 sm:row-span-1 sm:col-span-1">

                <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:scale-[1.02] hover:border-green-500/50 transition-all duration-300  ">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent" />
                  <CardContent className="relative p-6 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-green-600 dark:text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          />
                        </svg>
                      </div>
                      <h3 className="font-bold text-green-600 dark:text-green-400">
                        Cloud & DevOps
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resumeData.skills.cloud.join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Quality & Testing Card - Mobile: Top Right (short), Desktop: Top Middle */}
              <ScrollReveal animation="fadeDown" delay={0.4} className="sm:col-span-1">
                <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:scale-[1.02] hover:border-red-500/50 transition-all duration-300 ">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent" />
                  <CardContent className="relative p-6 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-red-600 dark:text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 01-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="font-bold text-red-600 dark:text-red-400">
                        {locale === "pt" ? "Qualidade" : "Quality"}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resumeData.skills.quality.join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>


              {/* Main Tech Stack Card - Mobile: Middle Right (short), Desktop: Top Right */}
              <ScrollReveal animation="fadeRight" delay={0.6} className="row-span-2 sm:row-span-1 sm:col-span-1">
                <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:scale-[1.02] hover:border-[#38A7F7]/50 transition-all duration-300 ">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#38A7F7]/10 via-transparent to-transparent" />
                  <CardContent className="relative p-6 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/icons/ts.svg"}
                          alt="TS icon"
                          width={32}
                          height={32}
                          className="object-cover rounded-sm"
                        />
                        <div className="bg-zinc-200 dark:bg-zinc-300 w-8 h-8 p-1 rounded-sm flex items-center justify-center">
                          <Image
                            src={"/icons/next.svg"}
                            alt="Next icon"
                            width={32}
                            height={32}
                            className="object-cover rounded-sm"
                          />
                        </div>
                        <div className="bg-zinc-200 dark:bg-zinc-500 w-8 h-8 p-1 rounded-sm flex items-center justify-center">
                          <Image
                            src={"/icons/fastify.svg"}
                            alt="Fastify icon"
                            width={32}
                            height={32}
                            className="object-cover rounded-sm"
                          />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold">
                        {locale === "pt" ? "Stack Principal" : "Main Stack"}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {resumeData.skills.languages.slice(0, 10).join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>


              {/* Database Card - Mobile: Middle Left (short), Desktop: Bottom Right */}
              <ScrollReveal animation="fadeRight" delay={0.6}  className="sm:col-span-1 sm:order-last">
                <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:scale-[1.02] hover:border-orange-500/50 transition-all duration-300 ">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />
                  <CardContent className="relative p-6 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-orange-600 dark:text-orange-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                          />
                        </svg>
                      </div>
                      <h3 className="font-bold text-orange-600 dark:text-orange-400">
                        {locale === "pt" ? "Dados" : "Data"}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resumeData.skills.data.join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>


              {/* Architecture Card - Mobile: Bottom (wide, spans 2 cols), Desktop: Bottom Left (spans 2 cols) */}
              <ScrollReveal animation="fadeUp" delay={0.4} className="col-span-2">
                <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:scale-[1.02] hover:border-purple-500/50 transition-all duration-300 ">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent" />
                  <CardContent className="relative p-6 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-purple-600 dark:text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {locale === "pt"
                          ? "Arquitetura & Padrões"
                          : "Architecture & Patterns"}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resumeData.skills.architecture.join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* <div className=" lg:flex-col lg:sticky lg:top-0 lg:h-screen lg:py-6 lg:justify-between">
            <div className="flex flex-col items-center text-center space-y-4"> */}
          <div className="hidden lg:flex sticky top-20 flex-col">

            <div className="rounded-lg overflow-hidden mb-6">
          <ScrollReveal animation="fadeUp" delay={0.2}>
              <Image
                src={photoUrl || "/placeholder.svg"}
                alt={resumeData.personalInfo.name}
                width={300}
                height={400}
                className="object-cover w-full rounded-lg"
                />
                </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.4}>

              <div className="mt-4">
                <h3 className="text-xl font-bold">
                  {resumeData.personalInfo.name}
                </h3>
                <p className="text-md text-muted-foreground">
                  {resumeData.personalInfo.title}
                </p>
                <div className="flex gap-2 text-muted-foreground pt-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">
                    {resumeData.personalInfo.location}
                  </span>
                </div>
              </div>
                </ScrollReveal>
            </div>

          <ScrollReveal animation="fadeUp" delay={0.6}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Link
                  href={resumeData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="text-sm">LinkedIn</span>
                </Link>
                {resumeData.personalInfo.github && (
                  <Link
                    href={resumeData.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span className="text-sm">GitHub</span>
                  </Link>
                )}
                <Link
                  href={resumeData.personalInfo.instagram || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="text-sm">Instagram</span>
                </Link>
              </div>
              <div className="space-y-2">
                <Link
                  href={resumeData.personalInfo.cv}
                  target="_blank"
                  className="block"
                >
                  <Button className="w-full">
                  {t('home.cv2')}

                  </Button>
                </Link>

                <Link href={"/contact"} className="block">
                  <Button className="w-full border bg-transparent border-zinc-600 text-zinc-800 hover:bg-zinc-300 hover:text-zinc-900 dark:border-muted-foreground dark:text-muted-foreground dark:hover:bg-muted-foreground/10 dark:hover:text-zinc-200">
                    {locale === "pt" ? "Entrar em contato" : "Get in touch"}
                  </Button>
                </Link>
              </div>
            </div>
              </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
