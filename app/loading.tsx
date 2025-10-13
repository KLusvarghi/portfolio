import {
  HeroSkeleton,
  ProfessionalSummarySkeleton,
  ProjectCardSkeleton,
  VideoCardSkeleton,
  SectionHeaderSkeleton,
} from "@/components/loading"

export default function HomeLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container h-full flex flex-col py-16">
        <HeroSkeleton />

        <ProfessionalSummarySkeleton />

        <div className="mt-24 w-full">
          <SectionHeaderSkeleton />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-border/50 w-full">
          <SectionHeaderSkeleton />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
