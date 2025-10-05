"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Instagram, MapPin } from "lucide-react"
import resumeData from "@/data/resume-data"
import { useI18n } from "@/lib/i18n/i18n-context"

export function ServerHeroSection() {
  const { t } = useI18n()

  return (
    <div className="grid lg:grid-cols-[1fr_auto] items-start gap-12 lg:gap-16">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <MapPin className="h-4 w-4" />
            <span>{resumeData.personalInfo.location}</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            {t.home.greeting} {resumeData.personalInfo.name}
          </h1>
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-xl">{t.home.role}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-lg">{t.home.description}</p>

        <div className="flex flex-wrap gap-4">
          <Link href="/about">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 dark:bg-white dark:text-black">
              {t.nav.about}
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 dark:border-white/20 dark:text-white bg-transparent"
            >
              {t.nav.contact}
            </Button>
          </Link>
        </div>

        <div className="flex gap-6">
          <Link
            href={`https://${resumeData.personalInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href={`https://${resumeData.personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href={resumeData.personalInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>

      <div className="hidden lg:flex items-start justify-center lg:justify-end pt-1">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white/10">
          <Image
            src="/images/profile.png"
            alt={resumeData.personalInfo.name}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </div>
  )
}
