"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, MapPin, Linkedin, Github, Instagram, ChevronDown, GraduationCap } from "lucide-react"
import resumeData from "@/data/resume-data"
import { useState } from "react"

export default function ResumeClientPage() {
  const [showPreviousRoles, setShowPreviousRoles] = useState(false)
  const [showPreviousEducation, setShowPreviousEducation] = useState(false)

  const currentRole = resumeData.experience[0]
  const previousRoles = resumeData.experience.slice(1)

  const currentEducation = resumeData.education[0]
  const previousEducation = resumeData.education.slice(1)

  return (
    <div className="container py-12">
      <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold">About</h1>
            <p className="text-xl text-muted-foreground">
              Conheça {resumeData.personalInfo.name}, {resumeData.personalInfo.title}
            </p>
          </div>

          <Card className="border-2">
            <CardContent className="p-8 space-y-4">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">INTRODUCTION</p>
              <h2 className="text-3xl font-bold leading-tight">
                Desenvolvedor Full Stack apaixonado por tecnologia e soluções que geram impacto real
              </h2>
              <p className="text-muted-foreground leading-relaxed">{resumeData.summary[0]}</p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Carreira</h2>

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
                    <p className="text-sm text-muted-foreground">{currentRole.period}</p>
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
                  <span>{showPreviousRoles ? "Ocultar" : "Mostrar"} cargos anteriores</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${showPreviousRoles ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Previous Roles - Animated collapse */}
                <div
                  className={`space-y-4 transition-all duration-500 ease-in-out ${
                    showPreviousRoles ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  {previousRoles.map((job, index) => (
                    <Card
                      key={index}
                      className="relative overflow-hidden border hover:border-primary/50 hover:shadow-md transition-all duration-300"
                      style={{
                        transitionDelay: showPreviousRoles ? `${index * 100}ms` : "0ms",
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
                            <p className="text-sm text-muted-foreground">{job.period}</p>
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
            <h2 className="text-2xl font-bold">Formação</h2>

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
                        <h3 className="text-xl font-bold">{currentEducation.institution}</h3>
                        <p className="text-muted-foreground">{currentEducation.degree}</p>
                        <p className="text-sm text-muted-foreground">{currentEducation.period}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-sm text-muted-foreground">{currentEducation.mode}</span>
                        {currentEducation.grade && (
                          <p className="text-sm text-muted-foreground mt-1">{currentEducation.grade}</p>
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
                  onClick={() => setShowPreviousEducation(!showPreviousEducation)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span>{showPreviousEducation ? "Ocultar" : "Ver mais"} formações</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${showPreviousEducation ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Previous Education - Animated collapse */}
                <div
                  className={`space-y-4 transition-all duration-500 ease-in-out ${
                    showPreviousEducation ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  {previousEducation.map((edu, index) => (
                    <Card
                      key={index}
                      className="relative overflow-hidden border hover:border-primary/50 hover:shadow-md transition-all duration-300"
                      style={{
                        transitionDelay: showPreviousEducation ? `${index * 100}ms` : "0ms",
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
                                <h3 className="text-lg font-bold">{edu.institution}</h3>
                                <p className="text-muted-foreground">{edu.degree}</p>
                                <p className="text-sm text-muted-foreground">{edu.period}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <span className="text-sm text-muted-foreground">{edu.mode}</span>
                                {edu.grade && <p className="text-sm text-muted-foreground mt-1">{edu.grade}</p>}
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
            <h2 className="text-2xl font-bold">Skills</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />
                <CardContent className="relative p-6 space-y-2">
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">Linguagens & Frameworks</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {resumeData.skills.languages.join(", ")}
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent" />
                <CardContent className="relative p-6 space-y-2">
                  <h3 className="font-semibold text-purple-600 dark:text-purple-400">Arquitetura & Padrões</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {resumeData.skills.architecture.join(", ")}
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent" />
                <CardContent className="relative p-6 space-y-2">
                  <h3 className="font-semibold text-green-600 dark:text-green-400">Cloud & DevOps</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{resumeData.skills.cloud.join(", ")}</p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />
                <CardContent className="relative p-6 space-y-2">
                  <h3 className="font-semibold text-orange-600 dark:text-orange-400">Dados & Banco de Dados</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{resumeData.skills.data.join(", ")}</p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300 sm:col-span-2">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent" />
                <CardContent className="relative p-6 space-y-2">
                  <h3 className="font-semibold text-red-600 dark:text-red-400">Qualidade & Testes</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {resumeData.skills.quality.join(", ")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {resumeData.languages && resumeData.languages.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Idiomas</h2>
              <Card className="border-2">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {resumeData.languages.map((lang, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{lang.name}</h3>
                          <p className="text-sm text-muted-foreground">{lang.level}</p>
                        </div>
                        {lang.certificate && (
                          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {lang.certificate}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="sticky top-20">
            <div className="rounded-lg overflow-hidden mb-6">
              <Image
                src={resumeData.personalInfo.photo || "/images/profile.png"}
                alt={resumeData.personalInfo.name}
                width={300}
                height={400}
                className="object-cover w-full"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">{resumeData.personalInfo.name}</h3>
                <p className="text-muted-foreground">{resumeData.personalInfo.title}</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{resumeData.personalInfo.location}</span>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href={resumeData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </Link>
                {resumeData.personalInfo.github && (
                  <Link
                    href={resumeData.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span>GitHub</span>
                  </Link>
                )}
                <Link
                  href="https://www.instagram.com/kaua.lusvarghi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Instagram</span>
                </Link>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/contact">
                <Button className="w-full">Entrar em contato</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
