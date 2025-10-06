"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { SidebarNav } from "@/components/sidebar-nav"
import { BottomNav } from "@/components/bottom-nav"
import Footer from "@/components/footer"
import { ToastProvider } from "@/components/toast-provider"
import { Suspense, useEffect, useState } from "react"
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from "@/lib/theme/theme-context"

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
      // Get locale from cookie or default to 'pt'
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
          <NextIntlClientProvider locale={locale} messages={messages}>
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
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
