"use client"

import type React from "react"
import { SkeletonTheme as ReactSkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { useTheme } from "@/contexts/theme-context";

type SkeletonThemeProps = {
  children: React.ReactNode
}

export function SkeletonTheme({ children }: SkeletonThemeProps) {
  const { theme } = useTheme()

  const isDark = theme === "dark"

  return (
    <ReactSkeletonTheme
      baseColor={isDark ? "#27272a" : "#e4e4e7"}
      highlightColor={isDark ? "#3f3f46" : "#f4f4f5"}
      borderRadius="0.5rem"
      duration={2}
    >
      {children}
    </ReactSkeletonTheme>
  )
}
