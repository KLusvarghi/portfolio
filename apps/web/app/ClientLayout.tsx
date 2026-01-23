"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { SidebarNav } from "@/components/sidebar-nav"
import { BottomNav } from "@/components/bottom-nav"
import Footer from "@/components/footer"
import { Suspense, useEffect, useState } from "react"
import { NextIntlClientProvider } from 'next-intl'
import { SkeletonTheme } from "@/components/ui/skeleton-config"
import { LocaleDataProvider } from "@/contexts/locale-data-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [locale, setLocale] = useState('pt')
  const [messages, setMessages] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    async function loadLocaleData() {
      // Get locale from localStorage or default to 'pt'
      const savedLocale = localStorage.getItem('locale') || 'pt'
      setLocale(savedLocale)

      // Load messages for the locale
      const localeMessages = await import(`../messages/${savedLocale}.json`)
      setMessages(localeMessages.default)
      setMounted(true)
    }
    loadLocaleData()
  }, [])

  // Don't render until we have the locale and messages
  if (!mounted || !messages) {
    return null
  }

  return (
    <html lang={locale} className="dark">
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider>
          <SkeletonTheme>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <LocaleDataProvider>
                <div className="flex min-h-screen flex-col">
                  <SidebarNav />
                  <BottomNav />

                  <Suspense>
                    <main className="flex-1 md:ml-24 pb-24 md:pb-0">{children}</main>
                  </Suspense>
                  <Footer />
                  {/* <ToastProvider /> */}
                  <Toaster/>
                  <Analytics />
                </div>
              </LocaleDataProvider>
            </NextIntlClientProvider>
          </SkeletonTheme>
        </ThemeProvider>
      </body>
    </html>
  )
}
