"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from 'next-intl';
import { cn } from "@/helpers/utils";
import { useTheme } from "@/contexts/theme-context";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out",
        "bg-transparent border-2 border-zinc-700/50 text-zinc-400",
        "hover:border-zinc-600 hover:text-zinc-300",
        "dark:border-zinc-700/50 dark:text-zinc-400",
        "dark:hover:border-zinc-600 dark:hover:text-zinc-300",
        "group"
      )}
      aria-label={t('ariaLabels.toggleTheme')}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5 group-hover:fill-zinc-600 transition-colors" />
      )}
    </button>
  );
}
