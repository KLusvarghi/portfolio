import type React from "react";
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "Kauã Ortolani Lusvarghi | Senior Software Engineer",
    template: "%s | Kauã Ortolani Lusvarghi",
  },
  description:
    "Senior Software Engineer specializing in fullstack development with Typescript, React, Next, Express, Fastify, and AI.",
  keywords: [
    "Software Engineer",
    "Fullstack Developer",
    "Backend Development",
    "Frontend Development",
    "Typescript",
    "React",
    "Next",
    "Express",
    "Fastify",
    "AI",
    "Kauã Ortolani Lusvarghi",
  ],
  authors: [{ name: "Kauã Ortolani Lusvarghi" }],
  creator: "Kauã Ortolani Lusvarghi",
  openGraph: {
    type: "website",
    locale: "en_PT",
    url: "https://kaualusvarghi.vercel.app",
    title: "Kauã Ortolani Lusvarghi | Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in backend development with Python, FastAPI, and cloud solutions.",
    siteName: "Kauã Ortolani Lusvarghi Website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Kauã Ortolani Lusvarghi | Senior Software Engineer",
  //   description:
  //     "Senior Software Engineer specializing in backend development with Python, FastAPI, and cloud solutions.",
  // },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}

import "./globals.css";
