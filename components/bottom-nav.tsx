"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Briefcase, Mail, Book } from "lucide-react"
import { useTranslations } from 'next-intl'
import { cn } from "@/helpers/utils"

export function BottomNav() {
  const pathname = usePathname()
  const t = useTranslations()

  const navItems = [
    { name: t('nav.home'), path: "/", icon: Home },
    { name: t('nav.about'), path: "/about", icon: FileText },
    { name: t('nav.projects'), path: "/projects", icon: Briefcase },
    { name: t('nav.contact'), path: "/contact", icon: Mail },
    { name: t('nav.blog'), path: "/blog", icon: Book },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-400/50 dark:border-zinc-800/50 darK:bg-zinc-900/80 backdrop-blur-xl pb-safe">
      <div className="container max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-around gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex flex-col items-center justify-center max-[400px]:gap-0 gap-1.5 rounded-2xl transition-all duration-300 max-[400px]:min-w-[60px] min-w-[72px] py-2.5 px-3",
                  isActive
                    ? "bg-[hsl(var(--active))] text-white shadow-lg shadow-[hsl(var(--active))]/20"
                    : "text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 active:scale-95",
                )}
              >
                <Icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
                <span className={cn("text-[10px] font-medium transition-all", isActive && "font-semibold")}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
