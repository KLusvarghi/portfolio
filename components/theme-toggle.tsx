"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/lib/theme/theme-context"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out",
        "bg-transparent border-2 border-zinc-700/50 text-zinc-400",
        "hover:border-zinc-600 hover:text-zinc-300",
        "dark:border-zinc-700/50 dark:text-zinc-400",
        "dark:hover:border-zinc-600 dark:hover:text-zinc-300",
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}
