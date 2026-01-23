"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { ResumeData, Project, BlogPost } from "@/data/types";

type ProjectsData = {
  projects: Project[];
  projectFilters: string[];
};

type BlogsData = {
  posts: BlogPost[];
  postsFilters: string[];
};

type LocaleDataContextType = {
  resumeData: ResumeData | null;
  projectsData: ProjectsData | null;
  blogsData: BlogsData | null;
  isLoading: boolean;
  locale: string;
  reloadData: (newLocale?: string) => Promise<void>;
};

const LocaleDataContext = createContext<LocaleDataContextType | undefined>(undefined);

type LocaleDataProviderProps = {
  children: ReactNode;
};

export function LocaleDataProvider({ children }: LocaleDataProviderProps) {
  const [blogsData, setBlogsData] = useState<BlogsData | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locale, setLocale] = useState<string>("pt");

  const loadData = async (targetLocale?: string) => {
    setIsLoading(true);

    try {
      // Get locale from parameter or localStorage
      const currentLocale = targetLocale || localStorage.getItem("locale") || "pt";
      setLocale(currentLocale);

      // Load resume data
      const resumeModule = await import(`@/data/resume-data.${currentLocale}.ts`);
      setResumeData(resumeModule.default);

      // Load projects data
      const projectsModule = await import(`@/data/projects-data.${currentLocale}.ts`);
      setProjectsData(projectsModule.default);

      // Load blogs data
      const blogsModule = await import(`@/data/blog-data.${currentLocale}.ts`);
      setBlogsData(blogsModule.default);
    } catch (error) {
      console.error("Error loading locale data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const reloadData = async (newLocale?: string) => {
    if (newLocale) {
      localStorage.setItem("locale", newLocale);
    }
    await loadData(newLocale);
  };

  useEffect(() => {
    loadData();

    // Listen for locale changes from other components
    const handleLocaleChange = (event: CustomEvent<{ locale: string }>) => {
      loadData(event.detail.locale);
    };

    window.addEventListener("localeChange" as any, handleLocaleChange);

    return () => {
      window.removeEventListener("localeChange" as any, handleLocaleChange);
    };
  }, []);

  const value = {
    resumeData,
    projectsData,
    blogsData,
    isLoading,
    locale,
    reloadData
  };

  return (
    <LocaleDataContext.Provider value={value}>
      {children}
    </LocaleDataContext.Provider>
  );
}

// Custom hook for consuming the context
export function useLocaleData() {
  const context = useContext(LocaleDataContext);

  if (context === undefined) {
    throw new Error("useLocaleData must be used within a LocaleDataProvider");
  }

  return context;
}

// Utility function to trigger locale change event
export function triggerLocaleChange(locale: string) {
  localStorage.setItem("locale", locale);
  const event = new CustomEvent("localeChange", { detail: { locale } });
  window.dispatchEvent(event);
}
