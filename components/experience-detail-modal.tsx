"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Briefcase, MapPin, Calendar, Code, Target, Award } from "lucide-react";
import { WorkExperience } from "@/data/types";
import { useLocale } from "next-intl";
import { BottomSheet } from "@/components/bottom-sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExperienceDetailModalProps {
  experience: WorkExperience | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Shared content component
function ExperienceContent({
  experience,
  locale,
}: {
  experience: WorkExperience;
  locale: string;
}) {
  return (
    <div className="space-y-6 px-6 pb-6">
      {/* Header Info */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{experience.title}</h2>
          <p className="text-base text-muted-foreground mt-1">
            {experience.company}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{experience.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {experience.description && (
        <div>
          <p className="text-muted-foreground leading-relaxed">
            {experience.description}
          </p>
        </div>
      )}

      <Separator />

      {/* Technologies */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">
              {locale === "pt" ? "Tecnologias" : "Technologies"}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-sm px-3 py-1"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Responsibilities */}
      {experience.responsibilities &&
        experience.responsibilities.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">
                {locale === "pt"
                  ? "Principais Responsabilidades"
                  : "Key Responsibilities"}
              </h3>
            </div>
            <ul className="space-y-2">
              {experience.responsibilities.map((responsibility, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <span className="text-primary leading-7">•</span>
                  <span className="leading-relaxed leading-7">
                    {responsibility}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Achievements */}
      {experience.achievements && experience.achievements.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">
              {locale === "pt" ? "Conquistas" : "Achievements"}
            </h3>
          </div>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <span className="text-primary leading-7">•</span>
                <span className="leading-relaxed leading-7">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ExperienceDetailModal({
  experience,
  open,
  onOpenChange,
}: ExperienceDetailModalProps) {
  const locale = useLocale();
  const isMobile = useIsMobile();

  if (!experience) return null;

  // Mobile: Use BottomSheet
  if (isMobile) {
    return (
      <BottomSheet open={open} onOpenChange={onOpenChange}>
        <ExperienceContent experience={experience} locale={locale} />
      </BottomSheet>
    );
  }

  // Desktop: Use Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto pb-10">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold">
                {experience.title}
              </DialogTitle>
              <DialogDescription className="text-base mt-1">
                {experience.company}
              </DialogDescription>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{experience.location}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Description */}
          {experience.description && (
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {experience.description}
              </p>
            </div>
          )}

          <Separator />

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">
                  {locale === "pt" ? "Tecnologias" : "Technologies"}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm px-3 py-1"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Responsibilities */}
          {experience.responsibilities &&
            experience.responsibilities.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">
                    {locale === "pt"
                      ? "Principais Responsabilidades"
                      : "Key Responsibilities"}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="text-primary leading-7">•</span>
                      <span className="leading-relaxed leading-7">
                        {responsibility}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">
                  {locale === "pt" ? "Conquistas" : "Achievements"}
                </h3>
              </div>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-primary leading-7">•</span>
                    <span className="leading-relaxed leading-7">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
