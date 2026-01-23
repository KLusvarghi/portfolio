"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { detectUserCountry } from "@/lib/i18n/detect-language"

export function LanguageDetector() {
  const router = useRouter()
  const currentLocale = useLocale()

  useEffect(() => {
    // Check if user has already set a language preference
    const savedLanguage = localStorage.getItem("language")

    // Only auto-detect if no preference is saved
    if (!savedLanguage) {
      detectUserCountry().then((detectedLanguage) => {
        if (detectedLanguage !== currentLocale) {
          router.push(`/${detectedLanguage}`)
        }
      })
    }
  }, [router, currentLocale])

  // This component doesn't render anything
  return null
}
