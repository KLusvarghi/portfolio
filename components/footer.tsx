"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils";
import resumeData from "@/data/resume-data";
import { ThemeToggle } from "./theme-toggle";

export default function Footer() {
  const { language, setLanguage, t } = useI18n();

  return (
    <footer className="border-t mb-20 md:mb-0">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; Copyright · {new Date().getFullYear()} - Kauã Ortolani Lusvarghi.{" "}
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <ThemeToggle />
          {/* Language Switcher */}
          <div className="flex items-center gap-2 border border-zinc-800 rounded-lg p-1">
            <button
              onClick={() => setLanguage("en")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                language === "en"
                  ? "bg-[hsl(var(--active))] text-white"
                  : "text-muted-foreground hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-400/40 dark:hover:bg-zinc-800/50"
              )}
              aria-label="Switch to English"
            >
              <span className="text-base">🇺🇸</span>
              <span>EN</span>
            </button>
            <button
              onClick={() => setLanguage("pt")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                language === "pt"
                  ? "bg-[hsl(var(--active))] text-white"
                  : "text-muted-foreground hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-400/40 dark:hover:bg-zinc-800/50"
              )}
              aria-label="Mudar para Português"
            >
              <span className="text-base">🇧🇷</span>
              <span>PT</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href={`${resumeData.personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href={`${resumeData.personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href={`${resumeData.personalInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
