"use client"

import type { Language } from "./translations"

export function detectUserLanguage(): Language {
  // Check if we're in the browser
  if (typeof window === "undefined") {
    return "en"
  }

  // Check localStorage first
  const savedLanguage = localStorage.getItem("language") as Language
  if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
    return savedLanguage
  }

  // Check browser language
  const browserLanguage = navigator.language.toLowerCase()

  // If browser language is Portuguese (pt, pt-BR, pt-PT), return Portuguese
  if (browserLanguage.startsWith("pt")) {
    return "pt"
  }

  // Default to English
  return "en"
}

export async function detectUserCountry(): Promise<Language> {
  try {
    // Try to get user's country from IP geolocation API
    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()

    // If country is Brazil (BR) or Portugal (PT), return Portuguese
    if (data.country_code === "BR" || data.country_code === "PT") {
      return "pt"
    }

    // Otherwise return English
    return "en"
  } catch (error) {
    console.error("Failed to detect country:", error)
    // Fallback to browser language detection
    return detectUserLanguage()
  }
}
