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
import resumeData from "@/data/resume-data";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/i18n-context";

export default function ResumeClientPage() {
  const [showPreviousRoles, setShowPreviousRoles] = useState(false);
  const [showPreviousEducation, setShowPreviousEducation] = useState(false);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false)

  const { t } = useI18n();

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
      <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold">{t.about.title}</h1>
            <p className="text-xl text-muted-foreground">
              {t.language === "pt"
                ? `Conheça ${resumeData.personalInfo.name}, ${resumeData.personalInfo.title}`
                : `Meet ${resumeData.personalInfo.name}, ${resumeData.personalInfo.title}`}
            </p>
          </div>

          <Card className="border-2">
            <CardContent className="px-4 py-6 md:p-8 space-y-4">
              <p className="text-sm  text-muted-foreground uppercase tracking-wider">
                {t.language === "pt" ? "INTRODUÇÃO" : "INTRODUCTION"}
              </p>
              <h2 className="text-xl md:text-3xl font-bold leading-tight">
                {t.language === "pt"
                  ? "Desenvolvedor Full Stack apaixonado por tecnologia e soluções que geram impacto real"
                  : "Full Stack Developer passionate about technology and solutions that generate real impact"}
              </h2>
              <p
                className={`text-muted-foreground leading-relaxed ${
                  isIntroExpanded ? "" : "line-clamp-6 md:line-clamp-none"
                }`}
              >
                {resumeData.summary[0]}
              </p>
              {!isIntroExpanded && (
                <button
                  onClick={() => setIsIntroExpanded(true)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium md:hidden"
                >
                  {t.language === "pt" ? "Continuar lendo →" : "Continue reading →"}
                </button>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t.about.career}</h2>

            {/* Current Role - Featured with gradient background */}
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

            {/* Previous Roles Toggle */}
            {previousRoles.length > 0 && (
              <div className="space-y-4">
                <button
                  onClick={() => setShowPreviousRoles(!showPreviousRoles)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span>
                    {showPreviousRoles ? t.about.seeLess : t.about.seeMore}{" "}
                    {t.language === "pt"
                      ? "cargos anteriores"
                      : "previous roles"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      showPreviousRoles ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Previous Roles - Animated collapse */}
                <div
                  className={`space-y-4 transition-all duration-500 ease-in-out ${
                    showPreviousRoles
                      ? "opacity-100 max-h-[2000px]"
                      : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  {previousRoles.map((job, index) => (
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
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t.about.education}</h2>

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
                            ? t.about.online
                            : currentEducation.mode === "Presencial"
                            ? t.about.inPerson
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
              <div className="space-y-4">
                <button
                  onClick={() =>
                    setShowPreviousEducation(!showPreviousEducation)
                  }
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span>
                    {showPreviousEducation ? t.about.seeLess : t.about.seeMore}{" "}
                    {t.language === "pt" ? "formações" : "education"}
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
                                    ? t.about.online
                                    : edu.mode === "Presencial"
                                    ? t.about.inPerson
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
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t.about.skills}</h2>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 auto-rows-min md:auto-rows-fr">
              {/* Cloud & DevOps Card - Mobile: Top Left (tall), Desktop: Top Left */}
              <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:scale-[1.02] hover:border-green-500/50 transition-all duration-300 row-span-2 sm:row-span-1 sm:col-span-1">
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

              {/* Quality & Testing Card - Mobile: Top Right (short), Desktop: Top Middle */}
              <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:scale-[1.02] hover:border-red-500/50 transition-all duration-300 sm:col-span-1">
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
                      {t.language === "pt" ? "Qualidade" : "Quality"}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {resumeData.skills.quality.join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Main Tech Stack Card - Mobile: Middle Right (short), Desktop: Top Right */}
              <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:scale-[1.02] hover:border-[#38A7F7]/50 transition-all duration-300 row-span-2 sm:row-span-1 sm:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-br from-[#38A7F7]/10 via-transparent to-transparent" />
                <CardContent className="relative p-6 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-10 h-10 rounded-lg bg-[#61DAFB]/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="#61DAFB"
                            strokeWidth="1.5"
                          />
                          <ellipse
                            cx="12"
                            cy="12"
                            rx="10"
                            ry="4"
                            stroke="#61DAFB"
                            strokeWidth="1.5"
                          />
                          <ellipse
                            cx="12"
                            cy="12"
                            rx="10"
                            ry="4"
                            stroke="#61DAFB"
                            strokeWidth="1.5"
                            transform="rotate(60 12 12)"
                          />
                          <ellipse
                            cx="12"
                            cy="12"
                            rx="10"
                            ry="4"
                            stroke="#61DAFB"
                            strokeWidth="1.5"
                            transform="rotate(-60 12 12)"
                          />
                        </svg>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center">
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.023-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
                        </svg>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-[#3178C6]/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect width="24" height="24" rx="3" fill="#3178C6" />
                          <path
                            d="M13.5 16.5V18h5.25v-1.5H13.5zm-7.5 0V18h4.5v-1.5H6zm7.5-3V15h5.25v-1.5H13.5zm-7.5 0V15h4.5v-1.5H6z"
                            fill="white"
                          />
                          <path
                            d="M13.5 6v1.5h-3V6h3zm-7.5 0v1.5h4.5V6H6zm7.5 3v1.5h5.25V9H13.5zm-7.5 0v1.5h4.5V9H6z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold">
                      {t.language === "pt" ? "Stack Principal" : "Main Stack"}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {resumeData.skills.languages.slice(0, 4).join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Database Card - Mobile: Middle Left (short), Desktop: Bottom Right */}
              <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:scale-[1.02] hover:border-orange-500/50 transition-all duration-300 sm:col-span-1 sm:order-last">
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
                      {t.language === "pt" ? "Dados" : "Data"}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {resumeData.skills.data.join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Architecture Card - Mobile: Bottom (wide, spans 2 cols), Desktop: Bottom Left (spans 2 cols) */}
              <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:scale-[1.02] hover:border-purple-500/50 transition-all duration-300 col-span-2">
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
                      {t.language === "pt"
                        ? "Arquitetura & Padrões"
                        : "Architecture & Patterns"}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {resumeData.skills.architecture.join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Mobile Sidebar - Keep as Card */}
          <Card className="border-2 lg:hidden">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center gap-6 mb-6 ">
                <div className="flex-shrink-0">
                  <Image
                    src={photoUrl || "/placeholder.svg"}
                    alt={resumeData.personalInfo.name}
                    width={80}
                    height={60}
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold">
                    {resumeData.personalInfo.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {resumeData.personalInfo.title}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">
                      {resumeData.personalInfo.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <Link
                      href={`${resumeData.personalInfo.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`${resumeData.personalInfo.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`${resumeData.personalInfo.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/contact" className="block">
                <Button className="w-full">
                  {t.language === "pt" ? "Entrar em contato" : "Get in touch"}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* <div className=" lg:flex-col lg:sticky lg:top-0 lg:h-screen lg:py-6 lg:justify-between">
            <div className="flex flex-col items-center text-center space-y-4"> */}
          <div className="hidden lg:flex sticky top-20 flex-col">
            <div className="rounded-lg overflow-hidden mb-6">
              <Image
                src={photoUrl || "/placeholder.svg"}
                alt={resumeData.personalInfo.name}
                width={300}
                height={400}
                className="object-cover w-full rounded-lg"
              />
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
            </div>

            <div className="space-y-4 ">
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
                  href={resumeData.personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="text-sm">Instagram</span>
                </Link>
              </div>

              <Link href="/contact" className="block">
                <Button className="w-full">
                  {t.language === "pt" ? "Entrar em contato" : "Get in touch"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
