"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { SidebarNav } from "@/components/sidebar-nav"
import { BottomNav } from "@/components/bottom-nav"
import Footer from "@/components/footer"
import { ToastProvider } from "@/components/toast-provider"
import { Suspense } from "react"
import { I18nProvider } from "@/lib/i18n/i18n-context"
import { LanguageDetector } from "@/components/language-detector"
import { ThemeProvider } from "@/lib/theme/theme-context"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider>
          <I18nProvider>
            <LanguageDetector />
            <div className="flex min-h-screen flex-col">
              <SidebarNav />
              <BottomNav />

              <Suspense>
                <main className="flex-1 md:ml-24 pb-24 md:pb-0">{children}</main>
              </Suspense>
              <Footer />
              <ToastProvider />
              <Analytics />
            </div>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
