"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import resumeData from "@/data/resume-data";
import { useI18n } from "@/lib/i18n/i18n-context";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid lg:grid-cols-[1fr_auto] items-start gap-12 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-6"
      >
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 text-zinc-400"
          >
            <MapPin className="h-4 w-4" />
            <span>{resumeData.personalInfo.location}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl font-bold tracking-tight sm:text-6xl"
          >
            {t.home.greeting} {resumeData.personalInfo.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2 text-zinc-400"
          >
            <span className="text-xl">{t.home.role}</span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-muted-foreground text-lg"
        >
          {t.home.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/about">
            <Button
              size="lg"
              className="bg-[#38A7F7] text-white hover:bg-[#2a8fd9] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {t.nav.about}
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-zinc-800 text-zinc-900 bg-white hover:bg-zinc-100 dark:border-white dark:text-white dark:bg-transparent dark:hover:bg-white/10"
            >
              {t.nav.contact}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex gap-6"
        >
          <Link
            href={`https://${resumeData.personalInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href={`https://${resumeData.personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href={`mailto:${resumeData.personalInfo.email}`}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-start justify-center lg:justify-end pt-1"
      >
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white/10">
          <Image
            src="/images/profile2.png"
            alt={resumeData.personalInfo.name}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
