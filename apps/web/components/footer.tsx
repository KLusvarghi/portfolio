"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useTranslations } from 'next-intl';
import type { ResumeData } from "@/data/types";
import { ThemeToggle } from "./theme-toggle";
import { useState, useEffect } from "react";
import { cn } from "@/helpers/utils";

export default function Footer() {
  const t = useTranslations();
  const [locale, setLocale] = useState('pt');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'pt';
    setLocale(savedLocale);
    loadResumeData(savedLocale);
  }, []);

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

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    loadResumeData(newLocale);
    // Reload the page to apply new locale
    window.location.reload();
  };

  if (!resumeData) {
    return null;
  }

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
              onClick={() => changeLanguage("en")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                locale === "en"
                  ? "bg-[hsl(var(--active))] text-white"
                  : "text-muted-foreground hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-400/40 dark:hover:bg-zinc-800/50"
              )}
              aria-label={t('ariaLabels.switchToEnglish')}
            >
              <span className="text-base">🇺🇸</span>
              <span>EN</span>
            </button>
            <button
              onClick={() => changeLanguage("pt")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                locale === "pt"
                  ? "bg-[hsl(var(--active))] text-white"
                  : "text-muted-foreground hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-400/40 dark:hover:bg-zinc-800/50"
              )}
              aria-label={t('ariaLabels.switchToPortuguese')}
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
              <span className="sr-only">{t('ariaLabels.github')}</span>
            </Link>
            <Link
              href={`${resumeData.personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">{t('ariaLabels.linkedin')}</span>
            </Link>
            <Link
              href={`${resumeData.personalInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">{t('ariaLabels.instagram')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
