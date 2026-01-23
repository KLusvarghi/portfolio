import Skeleton from "react-loading-skeleton"

export { ProjectCardSkeleton } from "./ProjectCardSkeleton"
export { BlogCardSkeleton } from "./BlogCardSkeleton"
export { VideoCardSkeleton } from "./VideoCardSkeleton"
export { HeroSkeleton } from "./HeroSkeleton"

export function FilterBarSkeleton() {
  return (
    <div className="mb-8 space-y-2">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center flex-1">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} width={80} height={32} borderRadius="0.375rem" />
            ))}
          </div>
          <Skeleton width={128} height={32} borderRadius="0.375rem" />
        </div>

        <Skeleton width={320} height={40} borderRadius="0.375rem" containerClassName="w-full md:w-80" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton width={192} height={40} />
        <Skeleton width={192} height={16} />
      </div>
    </div>
  )
}

export function SearchBarSkeleton() {
  return <Skeleton width={320} height={40} borderRadius="0.375rem" containerClassName="w-full md:w-80" />
}

export function SectionHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-6">
      <Skeleton width={256} height={36} />
      <Skeleton width={128} height={40} />
    </div>
  )
}

export function PageHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <Skeleton width={192} height={40} />
      <Skeleton width={384} height={24} style={{ maxWidth: '100%' }} />
    </div>
  )
}

export function ProfessionalSummarySkeleton() {
  return (
    <div className="mt-16 pt-16 border-t border-border/50 w-full">
      <div className="flex items-center gap-3 mb-6">
        <Skeleton width={36} height={36} borderRadius="0.5rem" />
        <Skeleton width={192} height={36} />
      </div>
      <div className="space-y-4">
        <Skeleton count={3} height={24} />
        <Skeleton width={128} height={20} containerClassName="mt-4" />
      </div>
    </div>
  )
}
