"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Instagram,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import type { ResumeData } from "@/data/resume-data.pt";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from 'next-intl';
import { ScrollReveal } from "@/components/scroll-reveal";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const t = useTranslations();

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'pt';
    loadResumeData(savedLocale);
  }, []);

  const loadResumeData = async (locale: string) => {
    try {
      const data = await import(`@/data/resume-data.${locale}.ts`);
      setResumeData(data.default);
    } catch (error) {
      // Fallback to Portuguese
      const data = await import(`@/data/resume-data.pt.ts`);
      setResumeData(data.default);
    }
  };

  if (!resumeData) return null;

  const email = resumeData?.personalInfo?.email || "kauaolusvarghi@proton.me";
  const location = resumeData?.personalInfo?.location || "Brasil, São Paulo";
  const github =
    resumeData?.personalInfo?.github || "https://github.com/KLusvarghi";
  const linkedin =
    resumeData?.personalInfo?.linkedin ||
    "https://www.linkedin.com/in/kaua-lusvarghi-fullstack-dev/";
  const instagram =
    resumeData?.personalInfo?.instagram ||
    "https://www.instagram.com/lusvarghkaua";
  const phone = resumeData?.personalInfo?.phone || "+55 (13) 99606-8207";
  const whatsappNumber = phone.replace(/\D/g, "");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success(t('contact.emailCopied'));
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error(t('contact.errorCopyingEmail'));
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto mt-12 md:mt-0">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12 text-center">
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t('contact.heading')}
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.3}>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.description')}
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {/* Email Card */}
            <ScrollReveal animation="fadeUp" delay={0.3}>
              <Card className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20 hover:border-blue-500/40 transition-colors">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-sm md:text-base">
                        {t('contact.email')}
                      </p>
                      <button
                        onClick={copyToClipboard}
                        className="text-xs md:text-sm text-zinc-400 hover:text-foreground transition-colors flex items-center gap-1 md:gap-2 group"
                      >
                        <span className="break-all">{email}</span>
                        {copied ? (
                          <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <Copy className="h-3 w-3 md:h-4 md:w-4 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.5}>

              <Card className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20 hover:border-blue-500/40 transition-colors">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-sm md:text-base">
                        {t('contact.location')}
                      </p>
                      <p className="text-xs md:text-sm text-zinc-400">
                        {location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

          </div>

          {/* WhatsApp CTA Card */}
          <ScrollReveal animation="fadeUp" delay={0.8}>

            <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20 overflow-hidden relative">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 md:w-9 md:h-9 text-white"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-bold mb-2">
                      {t('contact.whatsappHeading')}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-4">
                      {t('contact.whatsappDescription')}
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                    >
                      <Link
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('contact.whatsappButton')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>


          {/* Social Media Section */}

          <div className="text-center py-6 md:py-8">
            <ScrollReveal animation="fadeUp" delay={1}>
              <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
                {t('contact.findMeOn')}
              </p>
            </ScrollReveal>

            <div className="flex justify-center items-center gap-6 md:gap-8">
              <ScrollReveal animation="fadeUp" delay={1.2}>
                <Link
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700/50 transition-colors">
                    <Linkedin className="h-5 w-5 md:h-6 md:w-6 text-zinc-700 dark:text-zinc-400 group-hover:text-[#38A7F7] transition-colors" />
                  </div>
                  <span className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-[#38A7F7] transition-colors">
                    {t('contact.linkedin')}
                  </span>
                </Link>
              </ScrollReveal>
              <ScrollReveal animation="fadeUp" delay={1.4}>
                <Link
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700/50 transition-colors">
                    <Github className="h-5 w-5 md:h-6 md:w-6 text-zinc-700 dark:text-zinc-400 group-hover:text-[#38A7F7] transition-colors" />
                  </div>
                  <span className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-[#38A7F7] transition-colors">
                    {t('contact.github')}
                  </span>
                </Link>
              </ScrollReveal>
              <ScrollReveal animation="fadeUp" delay={1.6}>
                <Link
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700/50 transition-colors">
                    <Instagram className="h-5 w-5 md:h-6 md:w-6 text-zinc-700 dark:text-zinc-400 group-hover:text-[#38A7F7] transition-colors" />
                  </div>
                  <span className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-[#38A7F7] transition-colors">
                    {t('contact.instagram')}
                  </span>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
