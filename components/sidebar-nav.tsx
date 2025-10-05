"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Briefcase, Mail, Book } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n/i18n-context"
import { ThemeToggle } from "./theme-toggle"

export function SidebarNav() {
  const pathname = usePathname()
  const { t } = useI18n()

  const navItems = [
    { name: t.nav.home, path: "/", icon: Home },
    { name: t.nav.about, path: "/about", icon: FileText },
    { name: t.nav.projects, path: "/projects", icon: Briefcase },
    { name: t.nav.contact, path: "/contact", icon: Mail },
    { name: t.nav.blog, path: "/blog", icon: Book },
  ]

  return (
    <nav className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.path

        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out",
              isActive
                ? "bg-[hsl(var(--active))] text-white shadow-lg shadow-[hsl(var(--active))]/50"
                : "bg-transparent border-2 border-zinc-700/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300",
            )}
          >
            <Icon className="w-5 h-5 relative z-10" />

            <span
              className={cn(
                "absolute left-0 flex items-center pl-4 pr-6 h-12 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out opacity-0 -z-10",
                "group-hover:opacity-100 group-hover:pl-14",
                isActive
                  ? "bg-[hsl(var(--active))] text-white"
                  : "bg-zinc-900/90 backdrop-blur-sm border-2 border-zinc-700/50 text-zinc-100",
              )}
            >
              {item.name}
            </span>
          </Link>
        )
      })}

      <div className="mt-4 pt-4 border-t border-zinc-700/50">
        <ThemeToggle />
      </div>
    </nav>
  )
}
