import type React from "react";
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import ClientLayout from "./ClientLayout";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'pt';
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      default: t('defaultTitle'),
      template: t('template'),
    },
    description: t('description'),
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
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: "https://kaualusvarghi.vercel.app",
      title: t('defaultTitle'),
      description: t('description'),
      siteName: t('siteName'),
    },
    alternates: {
      languages: {
        'pt-BR': 'https://kaualusvarghi.vercel.app',
        'en-US': 'https://kaualusvarghi.vercel.app',
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    generator: "v0.dev",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}

import "./globals.css";
