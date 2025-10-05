"use client"

import { useEffect } from "react"
import { useI18n } from "@/lib/i18n/i18n-context"
import { detectUserCountry } from "@/lib/i18n/detect-language"

export function LanguageDetector() {
  const { setLanguage } = useI18n()

  useEffect(() => {
    // Check if user has already set a language preference
    const savedLanguage = localStorage.getItem("language")

    // Only auto-detect if no preference is saved
    if (!savedLanguage) {
      detectUserCountry().then((detectedLanguage) => {
        setLanguage(detectedLanguage)
      })
    }
  }, [setLanguage])

  // This component doesn't render anything
  return null
}
